import { AbsoluteFill, Easing, random, useCurrentFrame } from "remotion";
import { MONO, SANCHAY, SIDE } from "../../theme";
import { Chip, Photo } from "../../ui/Bits";
import { lerp, prog } from "../../ui/anim";
import { Reveal } from "../../ui/Reveal";
import { Scene } from "../../ui/Scene";
import { Eyebrow, display } from "../../ui/Text";
import { Block, Cards } from "../../ui/templates";

export const Traceability: React.FC = () => (
  <Scene pal={SANCHAY} tone="sand">
    <Cards
      eyebrow="Traceability"
      title="Every kilo, on record."
      size={100}
      lede="A plastic credit is only worth something if you can prove the plastic was really recovered. So we keep a paper trail for every batch, from the shoreline to the recycler."
      cardH={470}
      cardTitle={42}
      cards={[
        {
          k: "01",
          title: "Photo at the shore",
          text: "Each collection is photographed on site with a GPS location and time stamp.",
        },
        {
          k: "02",
          title: "Weighed and logged",
          text: "Bags are weighed and entered against a batch, with the site, the date and the crew who worked it.",
        },
        {
          k: "03",
          title: "Sorted and handed over",
          text: "The batch is segregated by type and handed to our recycling partner, who confirms what they received.",
        },
        {
          k: "04",
          title: "Credits with proof",
          text: "A company's credits are linked to real batches, so they can see the photos and weights behind every rupee.",
        },
      ]}
    />
  </Scene>
);

const CHECKS = [
  "Checking GPS stamp…",
  "Weighing & logging…",
  "Matching sort record…",
  "Confirming handover…",
  "Issuing credits…",
];
const STEPS = [
  "Photographed at the shore",
  "Weighed & logged",
  "Sorted by plastic type",
  "Handed to recycling partner",
  "Credits issued with proof",
];

// The site's sample batch record: a cursor presses Verify and the button fills, naming each check.
export const BatchRecord: React.FC = () => {
  const frame = useCurrentFrame();
  const press = 70;
  const k = prog(frame, press + 6, 100, Easing.linear);
  const done = frame > press + 106;
  const kg = 182.4 * (1 - Math.pow(1 - Math.min(1, k * 1.6), 3));
  const cursor = lerp(
    frame,
    [30, press - 6],
    [0, 1],
    Easing.bezier(0.65, 0, 0.35, 1),
  );
  const squeeze = frame >= press - 4 && frame <= press + 4 ? 0.86 : 1;
  const label = done
    ? "Batch verified ✓"
    : frame < press + 6
      ? "Verify batch"
      : CHECKS[Math.min(4, Math.floor(k * 5))];
  const row = (a: string, b: React.ReactNode) => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        borderTop: "2px solid rgba(255,255,255,.1)",
        padding: "16px 0",
        fontSize: 28,
      }}
    >
      <span style={{ color: SANCHAY.muteD }}>{a}</span>
      <span style={{ fontWeight: 600 }}>{b}</span>
    </div>
  );
  return (
    <Scene pal={SANCHAY} tone="deep">
      <div
        style={{
          position: "absolute",
          left: SIDE,
          top: 110,
          right: SIDE,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Eyebrow>Traceability · batch record</Eyebrow>
        <Chip size={20} delay={6}>
          Sample
        </Chip>
      </div>
      <Reveal
        delay={0}
        y={60}
        style={{
          position: "absolute",
          left: SIDE,
          right: SIDE,
          top: 190,
          height: 720,
          borderRadius: 36,
          overflow: "hidden",
          display: "flex",
          background: SANCHAY.ink,
          boxShadow: done
            ? `0 0 0 3px ${SANCHAY.acc2}, 0 0 80px ${SANCHAY.acc2}55`
            : "inset 0 0 0 2px rgba(255,255,255,.1)",
        }}
      >
        <div style={{ width: 720, position: "relative", flex: "none" }}>
          <Photo
            src="shoreline-mahim.jpg"
            zoom={[1.1, 1.0]}
            dur={300}
            style={{ position: "absolute", inset: 0 }}
          />
          <div
            style={{
              position: "absolute",
              left: 28,
              top: 28,
              padding: "14px 22px",
              borderRadius: 99,
              background: SANCHAY.acc2,
              color: SANCHAY.deep,
              fontFamily: MONO,
              fontWeight: 700,
              fontSize: 22,
              opacity: prog(frame, 20, 16),
            }}
          >
            GPS + time stamp ✓
          </div>
        </div>
        <div
          style={{
            flex: 1,
            padding: "46px 56px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontFamily: MONO,
              fontWeight: 700,
              fontSize: 24,
              letterSpacing: "0.16em",
              color: SANCHAY.acc2,
            }}
          >
            BATCH RECORD
          </div>
          <div
            style={display(64, 880, {
              fontFamily: MONO,
              letterSpacing: "0.02em",
              margin: "12px 0 18px",
              fontStretch: "100%",
            })}
          >
            SAN · MHM · 0001
          </div>
          {row("Site", "Mahim Causeway")}
          {row("Crew", "4 collectors · 1 supervisor")}
          {row(
            "Weight",
            <span style={{ fontVariantNumeric: "tabular-nums" }}>
              {kg.toFixed(1)} kg
            </span>,
          )}
          {row("Partner", "Yashlok Welfare Fdn.")}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px 26px",
              marginTop: 18,
            }}
          >
            {STEPS.map((s, i) => {
              const ok = k * 5 > i + 0.85 || done;
              return (
                <span
                  key={s}
                  style={{
                    fontSize: 23,
                    color: ok ? "#fff" : SANCHAY.muteD,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <span
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 99,
                      display: "grid",
                      placeItems: "center",
                      fontSize: 16,
                      background: ok ? SANCHAY.acc2 : "rgba(255,255,255,.1)",
                      color: SANCHAY.deep,
                    }}
                  >
                    {ok ? "✓" : ""}
                  </span>
                  {s}
                </span>
              );
            })}
          </div>
          <div
            style={{
              position: "relative",
              marginTop: "auto",
              height: 84,
              borderRadius: 99,
              overflow: "hidden",
              background: "rgba(255,255,255,.08)",
              boxShadow: "inset 0 0 0 2px rgba(255,255,255,.18)",
              scale: `${frame >= press - 4 && frame <= press + 4 ? 0.97 : 1}`,
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                width: `${(done ? 1 : k) * 100}%`,
                background: SANCHAY.acc,
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "grid",
                placeItems: "center",
                fontFamily: MONO,
                fontWeight: 700,
                fontSize: 28,
                letterSpacing: "0.06em",
                color: k > 0.5 || done ? SANCHAY.accInk : "#fff",
              }}
            >
              {label}
            </div>
          </div>
        </div>
        <svg
          width={46}
          height={46}
          viewBox="0 0 24 24"
          style={{
            position: "absolute",
            left: 1500 - cursor * 250,
            top: 400 + cursor * 225,
            scale: `${squeeze}`,
            opacity:
              frame < 28 ? 0 : done ? 1 - prog(frame, press + 110, 12) : 1,
            filter: "drop-shadow(0 4px 8px rgba(0,0,0,.5))",
          }}
        >
          <path
            d="M5 2l14 9-6 1.5L16 20l-3 1.5-3-7.5L5 18z"
            fill="#fff"
            stroke="#000"
            strokeWidth={1}
          />
        </svg>
      </Reveal>
      <div
        style={{
          position: "absolute",
          left: SIDE,
          bottom: 80,
          fontSize: 24,
          color: SANCHAY.muteD,
          opacity: prog(frame, 30, 20),
        }}
      >
        This is a sample showing what a batch record holds. The weight here is
        for illustration.
      </div>
    </Scene>
  );
};

// A made-up pattern in the shape of a QR code, drawn module by module.
const N = 25;
const finder = (r: number, c: number) => {
  const inBox = (r0: number, c0: number) =>
    r >= r0 && r < r0 + 7 && c >= c0 && c < c0 + 7;
  for (const [r0, c0] of [
    [0, 0],
    [0, N - 7],
    [N - 7, 0],
  ]) {
    if (inBox(r0, c0)) {
      const rr = r - r0;
      const cc = c - c0;
      const ring = rr === 0 || rr === 6 || cc === 0 || cc === 6;
      const core = rr >= 2 && rr <= 4 && cc >= 2 && cc <= 4;
      return ring || core ? 1 : 0;
    }
  }
  return -1;
};

const Qr: React.FC = () => {
  const frame = useCurrentFrame();
  const scan = (frame % 60) / 60;
  const cells = [];
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const f = finder(r, c);
      const on = f === -1 ? random(`q${r}-${c}`) > 0.52 : f === 1;
      if (!on) continue;
      const appear = prog(frame, 10 + (r + c) * 0.9, 10);
      cells.push(
        <rect
          key={`${r}-${c}`}
          x={c * 20}
          y={r * 20}
          width={20}
          height={20}
          fill={SANCHAY.deep}
          opacity={appear}
        />,
      );
    }
  }
  return (
    <div
      style={{
        position: "relative",
        width: 560,
        height: 560,
        background: "#fff",
        borderRadius: 30,
        padding: 30,
      }}
    >
      <svg viewBox={`0 0 ${N * 20} ${N * 20}`} width={500} height={500}>
        {cells}
      </svg>
      <div
        style={{
          position: "absolute",
          left: 20,
          right: 20,
          top: 30 + scan * 500,
          height: 4,
          background: SANCHAY.acc2,
          boxShadow: `0 0 24px 6px ${SANCHAY.acc2}`,
          opacity: prog(frame, 60, 10),
        }}
      />
    </div>
  );
};

export const QrNext: React.FC = () => (
  <Scene pal={SANCHAY} tone="ink">
    <Photo
      src="ifat-india-2025.jpg"
      zoom={[1.15, 1.02]}
      dur={240}
      style={{
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
        width: 720,
        opacity: 0.45,
      }}
    />
    <AbsoluteFill
      style={{
        background: `linear-gradient(90deg, ${SANCHAY.ink} 55%, ${SANCHAY.ink}00 100%)`,
      }}
    />
    <div style={{ position: "absolute", right: SIDE + 60, top: 260 }}>
      <Reveal delay={4} y={40} scale={0.85}>
        <Qr />
      </Reveal>
    </div>
    <AbsoluteFill style={{ justifyContent: "center", paddingLeft: SIDE }}>
      <Block
        eyebrow="Next"
        title="A QR code on every *bag.*"
        size={110}
        width={900}
        ledeSize={36}
        lede="At IFAT India 2025 we explored QR-based waste tracking. We're working towards tagging each bag, so anyone can scan it and see its journey."
      />
    </AbsoluteFill>
  </Scene>
);
