"""Synthesises the film's original background track and transition whoosh.

Nothing is sampled, so the audio is free to use anywhere the video goes.
Usage: python3 scripts/music.py <seconds> <out-dir>
Writes music.wav and whoosh.wav into <out-dir>.
"""

import sys
import wave

import numpy as np

SR = 44100
BPM = 100
BEAT = 60 / BPM
BAR = 4 * BEAT
rng = np.random.default_rng(7)


def hz(midi):
    return 440.0 * 2 ** ((midi - 69) / 12)


# A minor → F → C → G: hopeful, a little wistful, and it never stops moving.
CHORDS = [
    {"bass": 45, "pad": [57, 60, 64, 67, 71], "arp": [69, 72, 76, 79, 83]},
    {"bass": 41, "pad": [53, 57, 60, 64, 67], "arp": [65, 69, 72, 76, 79]},
    {"bass": 48, "pad": [55, 60, 62, 64, 67], "arp": [67, 72, 74, 76, 79]},
    {"bass": 43, "pad": [55, 59, 62, 64, 69], "arp": [67, 71, 74, 76, 81]},
]
# A small bell melody over the four chords: (beat, midi, beats long)
MOTIF = [
    [(0, 76, 1.5), (1.5, 74, 0.5), (2, 72, 2)],
    [(0, 72, 1.5), (2, 69, 2)],
    [(0, 67, 1), (1, 76, 1.5), (2.5, 74, 1.5)],
    [(0, 74, 2.5), (3, 71, 1)],
]
ARP_PATTERNS = [
    [0, 2, 1, 3, 2, 4, 3, 1],
    [0, 1, 2, 3, 4, 3, 2, 1],
    [0, 2, 4, 2, 1, 3, 4, 3],
]


def section(bar, total_bars):
    """Which layers play in a bar: a soft intro, grooves with breathers, a quiet outro."""
    if bar < 8:
        return {"drums": False, "clap": False, "bass": bar >= 4, "lead": False, "arp": 0}
    if bar >= total_bars - 8:
        return {"drums": False, "clap": False, "bass": bar < total_bars - 4, "lead": False, "arp": 1}
    cycle = (bar - 8) % 40
    if cycle >= 36:  # a four-bar breather every forty bars
        return {"drums": False, "clap": False, "bass": False, "lead": False, "arp": 2}
    part_b = ((bar - 8) // 40) % 2 == 1
    return {
        "drums": True,
        "clap": part_b or cycle >= 16,
        "bass": True,
        "lead": part_b and cycle % 16 >= 8,
        "arp": 1 if part_b else 0,
    }


def env_adsr(n, a, r, sustain_level=1.0):
    t = np.arange(n) / SR
    e = np.minimum(1, t / max(a, 1e-4)) * sustain_level
    tail = np.clip((n / SR - t) / max(r, 1e-4), 0, 1)
    return e * tail


def add(buf, start_s, sig, gain=1.0, pan=0.0):
    i = int(start_s * SR)
    if i < 0:
        sig, i = sig[-i:], 0
    if i >= buf.shape[1]:
        return
    sig = sig[: buf.shape[1] - i]
    left = np.cos((pan + 1) * np.pi / 4)
    right = np.sin((pan + 1) * np.pi / 4)
    buf[0, i : i + len(sig)] += sig * gain * left
    buf[1, i : i + len(sig)] += sig * gain * right


def pad_note(f, dur):
    n = int(dur * SR)
    t = np.arange(n) / SR
    out = np.zeros(n, dtype=np.float32)
    for detune in (-0.006, 0.0, 0.0065):
        ff = f * (1 + detune)
        phase = rng.uniform(0, 2 * np.pi)
        for h in range(1, 9):
            if ff * h > 6000:
                break
            out += (np.sin(2 * np.pi * ff * h * t + phase * h) * (1 / h) * np.exp(-h / 3.2)).astype(np.float32)
    return out * env_adsr(n, 0.9, 1.1)


def pluck(f, dur=0.9):
    n = int(dur * SR)
    t = np.arange(n) / SR
    out = np.zeros(n, dtype=np.float32)
    for h in range(1, 7):
        out += (np.sin(2 * np.pi * f * h * t) * (0.8 ** h) * np.exp(-t * (4 + 3 * h))).astype(np.float32)
    return out * np.minimum(1, t / 0.004)


def bell(f, dur):
    n = int((dur + 1.2) * SR)
    t = np.arange(n) / SR
    out = np.sin(2 * np.pi * f * t) * np.exp(-t * 2.2)
    out += 0.35 * np.sin(2 * np.pi * f * 3.01 * t) * np.exp(-t * 4.5)
    out += 0.15 * np.sin(2 * np.pi * f * 5.4 * t) * np.exp(-t * 7)
    return (out * np.minimum(1, t / 0.006)).astype(np.float32)


def bass_note(f, dur):
    n = int(dur * SR)
    t = np.arange(n) / SR
    s = np.sin(2 * np.pi * f * t) + 0.25 * np.sin(2 * np.pi * 2 * f * t)
    s = np.tanh(1.6 * s) / np.tanh(1.6)
    return (s * env_adsr(n, 0.01, 0.12) * np.exp(-t * 1.2)).astype(np.float32)


def kick():
    n = int(0.42 * SR)
    t = np.arange(n) / SR
    f = 46 + 70 * np.exp(-t * 28)
    phase = 2 * np.pi * np.cumsum(f) / SR
    s = np.sin(phase) * np.exp(-t * 7.5)
    s[:120] += rng.normal(0, 0.25, 120) * np.linspace(1, 0, 120)
    return s.astype(np.float32)


def clap():
    n = int(0.3 * SR)
    t = np.arange(n) / SR
    noise = np.diff(rng.normal(0, 1, n + 1))
    e = np.exp(-t * 18) + 0.6 * np.exp(-np.maximum(0, t - 0.012) * 22) * (t > 0.012)
    body = 0.4 * np.sin(2 * np.pi * 190 * t) * np.exp(-t * 30)
    return ((noise * 0.5 * e) + body).astype(np.float32)


def hat(open_=False):
    n = int((0.12 if open_ else 0.045) * SR)
    t = np.arange(n) / SR
    noise = np.diff(rng.normal(0, 1, n + 1))
    return (noise * np.exp(-t * (30 if open_ else 90)) * 0.2).astype(np.float32)


def reverb(x, seconds=2.4, mix=0.32):
    """Convolution with a decaying noise tail, done with FFTs in overlap-add blocks."""
    n_ir = int(seconds * SR)
    t = np.arange(n_ir) / SR
    out = np.zeros_like(x)
    for ch in range(2):
        ir = rng.normal(0, 1, n_ir) * np.exp(-t * 3.2)
        ir[: int(0.02 * SR)] *= np.linspace(0, 1, int(0.02 * SR))
        ir /= np.sqrt(np.sum(ir ** 2))
        block = 1 << 19
        size = 1 << int(np.ceil(np.log2(block + n_ir)))
        IR = np.fft.rfft(ir, size)
        wet = np.zeros(x.shape[1] + n_ir, dtype=np.float32)
        for i in range(0, x.shape[1], block):
            seg = x[ch, i : i + block]
            y = np.fft.irfft(np.fft.rfft(seg, size) * IR, size)[: len(seg) + n_ir]
            wet[i : i + len(y)] += y.astype(np.float32)
        out[ch] = wet[: x.shape[1]]
    return x * (1 - mix) + out * mix * 1.6


def music(seconds):
    n = int(seconds * SR)
    total_bars = int(np.ceil(seconds / BAR))
    tonal = np.zeros((2, n), dtype=np.float32)
    low = np.zeros((2, n), dtype=np.float32)
    drums = np.zeros((2, n), dtype=np.float32)
    duck = np.ones(n, dtype=np.float32)
    k, c = kick(), clap()
    duck_shape = 1 - 0.38 * np.exp(-np.arange(int(0.3 * SR)) / SR * 12)

    for bar in range(total_bars):
        t0 = bar * BAR
        chord = CHORDS[bar % 4]
        sec = section(bar, total_bars)
        for i, m in enumerate(chord["pad"]):
            add(tonal, t0 - 0.15, pad_note(hz(m), BAR + 1.0), 0.05, pan=(i - 2) * 0.3)
        pattern = ARP_PATTERNS[sec["arp"]]
        for step in range(8):
            m = chord["arp"][pattern[step]]
            add(tonal, t0 + step * BEAT / 2, pluck(hz(m)), 0.14 if step % 2 == 0 else 0.1, pan=0.35 if step % 2 else -0.35)
        if sec["lead"]:
            for beat, m, dur in MOTIF[bar % 4]:
                add(tonal, t0 + beat * BEAT, bell(hz(m), dur * BEAT), 0.12, pan=0.1)
        if sec["bass"]:
            f = hz(chord["bass"])
            for beat, dur in ((0, 1.4), (1.5, 0.45), (2, 0.9), (3, 0.45), (3.5, 0.45)):
                add(low, t0 + beat * BEAT, bass_note(f, dur * BEAT), 0.3)
        if sec["drums"]:
            for beat in (0, 2):
                add(drums, t0 + beat * BEAT, k, 0.55)
                i = int((t0 + beat * BEAT) * SR)
                j = min(n, i + len(duck_shape))
                duck[i:j] = np.minimum(duck[i:j], duck_shape[: j - i])
            if sec["clap"]:
                for beat in (1, 3):
                    add(drums, t0 + beat * BEAT, c, 0.3, pan=0.05)
            for step in range(8):
                add(drums, t0 + step * BEAT / 2, hat(open_=step == 7), 0.22 if step % 2 else 0.12, pan=0.25)

    tonal = reverb(tonal)
    mix = tonal * duck + low * duck + drums
    fade_in = np.minimum(1, np.arange(n) / (2.0 * SR))
    fade_out = np.minimum(1, (n - np.arange(n)) / (6.0 * SR))
    mix *= fade_in * fade_out
    mix = np.tanh(mix * 1.3) / np.tanh(1.3)
    return mix / np.max(np.abs(mix)) * 0.89


def whoosh():
    dur = 0.9
    n = int(dur * SR)
    noise = rng.normal(0, 1, n + 2048)
    out = np.zeros(n + 2048)
    hop, size = 256, 2048
    win = np.hanning(size)
    freqs = np.fft.rfftfreq(size, 1 / SR)
    for i in range(0, n, hop):
        p = i / n
        centre = 300 + 2600 * np.sin(np.pi * min(1, p * 1.15)) ** 1.5
        mask = np.exp(-0.5 * ((freqs - centre) / (centre * 0.55)) ** 2)
        seg = np.fft.irfft(np.fft.rfft(noise[i : i + size] * win) * mask, size)
        out[i : i + size] += seg * win
    out = out[:n]
    t = np.arange(n) / SR
    env = np.sin(np.pi * np.clip(t / dur, 0, 1)) ** 2.2
    out *= env
    out /= np.max(np.abs(out))
    stereo = np.stack([out * np.linspace(1, 0.55, n), out * np.linspace(0.55, 1, n)])
    return stereo * 0.8


def write(path, x):
    pcm = (np.clip(x, -1, 1) * 32767).astype("<i2").T.copy()
    with wave.open(path, "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())


if __name__ == "__main__":
    seconds, out = float(sys.argv[1]), sys.argv[2]
    write(f"{out}/whoosh.wav", whoosh())
    write(f"{out}/music.wav", music(seconds))
