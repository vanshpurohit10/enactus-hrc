import React, { useId } from "react";
import { AbsoluteFill, Easing, Sequence, useCurrentFrame } from "remotion";
import { DISPLAY, MONO, SIDE, TOP } from "../theme";
import { lerp, prog } from "./anim";
import { Chip, Counter, Kinetic, Marquee, Photo, cardStyle } from "./Bits";
import { Reveal } from "./Reveal";
import { usePal } from "./Scene";
import { Eyebrow, Lede, Words, display } from "./Text";

/** Eyebrow, headline and lede, stacked: the site's section head. */
export const Block: React.FC<{
  eyebrow?: string;
  title: string;
  size?: number;
  lede?: React.ReactNode;
  ledeSize?: number;
  delay?: number;
  width?: number;
  style?: React.CSSProperties;
}> = ({
  eyebrow,
  title,
  size = 110,
  lede,
  ledeSize = 40,
  delay = 0,
  width = 1500,
  style,
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: 34,
      width,
      ...style,
    }}
  >
    {eyebrow ? <Eyebrow delay={delay}>{eyebrow}</Eyebrow> : null}
    <Words delay={delay + 6} style={display(size)}>
      {title}
    </Words>
    {lede ? (
      <Lede
        delay={delay + 22}
        size={ledeSize}
        style={{ maxWidth: Math.min(width, 1400) }}
      >
        {lede}
      </Lede>
    ) : null}
  </div>
);

/** The round accent seal from the top of each page, with its text running around the rim. */
export const Seal: React.FC<{
  ring: string;
  big: string;
  small: string;
  delay?: number;
  style?: React.CSSProperties;
}> = ({ ring, big, small, delay = 60, style }) => {
  const frame = useCurrentFrame();
  const { pal } = usePal();
  const id = "seal" + useId().replace(/[^a-zA-Z0-9]/g, "");
  const p = prog(frame, delay, 34, Easing.spring({ damping: 11, mass: 0.7 }));
  const size = Math.min(112, 290 / (big.length * 0.8));
  return (
    <div
      style={{
        position: "absolute",
        right: SIDE,
        top: TOP + 10,
        width: 340,
        height: 340,
        scale: `${p}`,
        rotate: `${(1 - p) * -50}deg`,
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: pal.acc,
          boxShadow: `0 30px 90px -20px ${pal.acc}aa`,
        }}
      />
      <svg
        viewBox="0 0 340 340"
        style={{ position: "absolute", inset: 0, rotate: `${frame * 0.5}deg` }}
      >
        <defs>
          <path
            id={id}
            d="M170,170 m-138,0 a138,138 0 1,1 276,0 a138,138 0 1,1 -276,0"
          />
        </defs>
        <text
          textLength={2 * Math.PI * 138 - 4}
          lengthAdjust="spacing"
          style={{
            fontFamily: MONO,
            fontWeight: 700,
            fontSize: 19,
            fill: pal.accInk,
            textTransform: "uppercase",
          }}
        >
          <textPath href={`#${id}`}>{`${ring} · ${ring} · `}</textPath>
        </text>
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          placeContent: "center",
          justifyItems: "center",
          textAlign: "center",
          color: pal.accInk,
        }}
      >
        <div
          style={display(size, 900, {
            fontStretch: "125%",
            letterSpacing: "-0.04em",
          })}
        >
          {big}
        </div>
        <div
          style={{
            fontFamily: MONO,
            fontWeight: 700,
            fontSize: 19,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginTop: 12,
            maxWidth: 200,
            lineHeight: 1.3,
          }}
        >
          {small}
        </div>
      </div>
    </div>
  );
};

/** A dark band along the bottom with a label and a sliding list of names. */
export const Strip: React.FC<{
  label: string;
  items: string[];
  delay?: number;
}> = ({ label, items, delay = 80 }) => {
  const frame = useCurrentFrame();
  const { pal } = usePal();
  const p = prog(frame, delay, 30);
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 124,
        display: "flex",
        alignItems: "center",
        background: `${pal.deep}e6`,
        borderTop: "1.5px solid rgba(255,255,255,.14)",
        opacity: p,
        translate: `0 ${(1 - p) * 124}px`,
      }}
    >
      <div
        style={{
          padding: `0 44px 0 ${SIDE}px`,
          fontFamily: MONO,
          fontWeight: 700,
          fontSize: 22,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: pal.acc,
          whiteSpace: "nowrap",
          height: "100%",
          display: "flex",
          alignItems: "center",
          background: pal.deep,
          zIndex: 1,
        }}
      >
        {label}
      </div>
      <Marquee
        items={items}
        style={{ flex: 1 }}
        itemStyle={{
          fontFamily: DISPLAY,
          fontWeight: 700,
          fontStretch: "110%",
          fontSize: 34,
          color: "#fff",
        }}
      />
    </div>
  );
};

/** The full-bleed photo opening of each page of the site. */
export const Hero: React.FC<{
  photo: string;
  position?: string;
  eyebrow: string;
  title: string;
  titleSize?: number;
  lede: string;
  seal: [string, string, string];
  stripLabel: string;
  strip: string[];
  note?: string;
}> = ({
  photo,
  position,
  eyebrow,
  title,
  titleSize = 132,
  lede,
  seal,
  stripLabel,
  strip,
  note,
}) => {
  const { pal } = usePal();
  return (
    <>
      <Photo
        src={photo}
        position={position}
        zoom={[1.2, 1.04]}
        dur={300}
        style={{ position: "absolute", inset: 0 }}
      />
      <AbsoluteFill
        style={{
          background: `linear-gradient(90deg, ${pal.deep}f5 0%, ${pal.deep}c8 44%, ${pal.deep}40 100%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background: `linear-gradient(0deg, ${pal.deep} 0%, ${pal.deep}00 40%)`,
        }}
      />
      <div style={{ position: "absolute", left: SIDE, top: 150, width: 1240 }}>
        <Eyebrow delay={6}>{eyebrow}</Eyebrow>
        <Words
          delay={12}
          style={display(titleSize, 860, { marginTop: 36, color: "#fff" })}
        >
          {title}
        </Words>
        <Lede
          delay={46}
          style={{
            marginTop: 40,
            maxWidth: 1100,
            color: "rgba(255,255,255,.84)",
          }}
        >
          {lede}
        </Lede>
        {note ? (
          <Reveal delay={70} style={{ marginTop: 40 }}>
            <Chip solid size={24}>
              {note}
            </Chip>
          </Reveal>
        ) : null}
      </div>
      <Seal ring={seal[0]} big={seal[1]} small={seal[2]} />
      <Strip label={stripLabel} items={strip} />
    </>
  );
};

export type Stat = {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  text: string;
};

/** A headline and four counters, like each page's numbers band. */
export const Stats: React.FC<{
  eyebrow?: string;
  title: string;
  lede: string;
  stats: Stat[];
}> = ({ eyebrow, title, lede, stats }) => {
  const { pal, dark, mute } = usePal();
  return (
    <AbsoluteFill
      style={{ padding: `${TOP}px ${SIDE}px`, justifyContent: "space-between" }}
    >
      <Block
        eyebrow={eyebrow}
        title={title}
        size={100}
        lede={lede}
        ledeSize={38}
      />
      <div style={{ display: "flex", gap: 30 }}>
        {stats.map((s, i) => (
          <Reveal
            key={i}
            delay={34 + i * 8}
            y={70}
            style={{ flex: 1, minWidth: 0 }}
          >
            <div
              style={cardStyle(dark, {
                padding: "38px 36px 40px",
                height: 410,
                display: "flex",
                flexDirection: "column",
              })}
            >
              <div
                style={display(84, 880, {
                  fontStretch: "100%",
                  whiteSpace: "nowrap",
                })}
              >
                {s.prefix}
                <Counter to={s.to} decimals={s.decimals} delay={40 + i * 8} />
                <span
                  style={{
                    color: dark ? pal.acc : pal.accDeep,
                    fontSize: 46,
                    marginLeft: 6,
                  }}
                >
                  {s.suffix}
                </span>
              </div>
              <div
                style={{
                  height: 4,
                  width: 64,
                  background: pal.acc,
                  borderRadius: 4,
                  margin: "28px 0 24px",
                }}
              />
              <div style={display(38, 760, { lineHeight: 1.1 })}>{s.label}</div>
              <div
                style={{
                  fontSize: 28,
                  lineHeight: 1.4,
                  color: mute,
                  marginTop: 14,
                }}
              >
                {s.text}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </AbsoluteFill>
  );
};

/** Big stacked words with one row repeating as a sliding band. */
export const Shout: React.FC<{
  eyebrow: string;
  rows: string[];
  band: number;
  caption: string;
}> = ({ eyebrow, rows, band, caption }) => {
  const frame = useCurrentFrame();
  const { pal, fg } = usePal();
  return (
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", gap: 6 }}
    >
      <Eyebrow delay={0} style={{ marginBottom: 40 }}>
        {eyebrow}
      </Eyebrow>
      {rows.map((row, i) => {
        if (i === band) {
          return (
            <div
              key={i}
              style={{ width: "100%", opacity: prog(frame, 6 + i * 7, 20) }}
            >
              <Kinetic
                word={row}
                size={200}
                speed={9}
                outline
                color={pal.acc}
              />
            </div>
          );
        }
        const p = prog(frame, 6 + i * 7, 30);
        const last = i === rows.length - 1;
        return (
          <div
            key={i}
            style={{
              fontFamily: DISPLAY,
              fontWeight: 900,
              fontStretch: "125%",
              fontSize: 200,
              lineHeight: 1,
              letterSpacing: "-0.035em",
              color: last ? pal.acc : fg,
              translate: `${(1 - p) * (i % 2 ? 1400 : -1400)}px 0`,
              whiteSpace: "nowrap",
            }}
          >
            {row}
          </div>
        );
      })}
      <Lede delay={50} size={38} style={{ marginTop: 46, textAlign: "center" }}>
        {caption}
      </Lede>
    </AbsoluteFill>
  );
};

export type Moment = {
  date: string;
  title: string;
  text: string;
  tag?: string;
};

/** A journey told a few moments at a time, down a filling line. */
export const Timeline: React.FC<{
  eyebrow: string;
  title: string;
  pages: Moment[][];
  pageDur: number;
}> = ({ eyebrow, title, pages, pageDur }) => {
  const frame = useCurrentFrame();
  const { pal, line, mute } = usePal();
  const total = pages.length * pageDur;
  const page = Math.min(pages.length - 1, Math.floor(frame / pageDur));
  const fill = lerp(frame, [10, total - 10], [0.04, 1], Easing.linear);
  const lineX = 790;
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: SIDE, top: TOP, width: 540 }}>
        <Block eyebrow={eyebrow} title={title} size={78} width={540} />
        <Reveal
          delay={30}
          style={{
            marginTop: 60,
            display: "flex",
            alignItems: "baseline",
            gap: 18,
          }}
        >
          <span
            style={display(110, 900, {
              color: pal.acc,
              fontVariantNumeric: "tabular-nums",
            })}
          >
            {String(page + 1).padStart(2, "0")}
          </span>
          <span
            style={{
              fontFamily: MONO,
              fontWeight: 700,
              fontSize: 30,
              color: mute,
            }}
          >
            / {String(pages.length).padStart(2, "0")}
          </span>
        </Reveal>
      </div>
      <div
        style={{
          position: "absolute",
          left: lineX,
          top: 120,
          bottom: 120,
          width: 4,
          background: line,
          borderRadius: 4,
        }}
      >
        <div
          style={{
            width: "100%",
            height: `${fill * 100}%`,
            background: pal.acc,
            borderRadius: 4,
          }}
        />
      </div>
      {pages.map((moments, pi) => (
        <Sequence
          key={pi}
          from={pi * pageDur}
          durationInFrames={pageDur}
          layout="none"
        >
          <TimelinePage
            moments={moments}
            last={pi === pages.length - 1}
            dur={pageDur}
            lineX={lineX}
          />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

const TimelinePage: React.FC<{
  moments: Moment[];
  last: boolean;
  dur: number;
  lineX: number;
}> = ({ moments, last, dur, lineX }) => {
  const frame = useCurrentFrame();
  const { pal, mute } = usePal();
  return (
    <div
      style={{
        position: "absolute",
        left: lineX - 14,
        right: SIDE - 20,
        top: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 50,
      }}
    >
      {moments.map((m, i) => {
        const p = prog(frame, 4 + i * 7, 26);
        const out = last
          ? 0
          : prog(frame, dur - 14, 12, Easing.in(Easing.cubic));
        return (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 50,
              opacity: p * (1 - out),
              translate: `${(1 - p) * 80}px ${out * -40}px`,
            }}
          >
            <span
              style={{
                width: 32,
                height: 32,
                marginTop: 4,
                borderRadius: 999,
                background: pal.acc,
                boxShadow: `0 0 0 8px ${pal.acc}33`,
                flex: "none",
                scale: `${p}`,
              }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <span
                  style={{
                    fontFamily: MONO,
                    fontWeight: 700,
                    fontSize: 25,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: pal.acc,
                  }}
                >
                  {m.date}
                </span>
                {m.tag ? (
                  <Chip size={17} delay={10 + i * 7}>
                    {m.tag}
                  </Chip>
                ) : null}
              </div>
              <div style={display(48, 780, { lineHeight: 1.05 })}>
                {m.title}
              </div>
              <div
                style={{
                  fontSize: 29,
                  lineHeight: 1.42,
                  color: mute,
                  maxWidth: 900,
                }}
              >
                {m.text}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/** Cards that slide past one at a time, the active one in full light. */
export const Track: React.FC<{
  count: number;
  cardW: number;
  gap?: number;
  hold: number;
  move?: number;
  lead?: number;
  left?: number;
  top?: number;
  height: number;
  render: (k: number, focus: number) => React.ReactNode;
}> = ({
  count,
  cardW,
  gap = 48,
  hold,
  move = 22,
  lead = 0,
  left = SIDE,
  top = 300,
  height,
  render,
}) => {
  const frame = useCurrentFrame();
  const t = frame - lead;
  let idx = 0;
  for (let k = 0; k < count - 1; k++) {
    const start = (k + 1) * hold + k * move;
    idx += prog(t, start, move, Easing.bezier(0.65, 0, 0.35, 1));
  }
  const enter = prog(frame, 0, 34);
  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        height,
        display: "flex",
        gap,
        translate: `${-idx * (cardW + gap) + (1 - enter) * 600}px 0`,
        opacity: enter,
      }}
    >
      {Array.from({ length: count }, (_, k) => {
        const focus = Math.max(0, 1 - Math.abs(k - idx));
        return (
          <div
            key={k}
            style={{
              width: cardW,
              height,
              flex: "none",
              opacity: 0.38 + 0.62 * focus,
              scale: `${0.94 + 0.06 * focus}`,
            }}
          >
            {render(k, focus)}
          </div>
        );
      })}
    </div>
  );
};

/** Columns of photos drifting in opposite directions, with the section head over them. */
export const Collage: React.FC<{
  eyebrow: string;
  title: string;
  lede?: string;
  photos: string[];
}> = ({ eyebrow, title, lede, photos }) => {
  const frame = useCurrentFrame();
  const { pal } = usePal();
  const cols = [0, 1, 2].map((c) => photos.filter((_, i) => i % 3 === c));
  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 900,
          right: -40,
          top: -200,
          bottom: -200,
          display: "flex",
          gap: 26,
          rotate: "-4deg",
        }}
      >
        {cols.map((col, c) => {
          const list = [...col, ...col, ...col];
          const dir = c % 2 ? 1 : -1;
          return (
            <div
              key={c}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 26,
                translate: `0 ${(dir > 0 ? -900 : -200) + dir * frame * 1.6}px`,
              }}
            >
              {list.map((src, i) => (
                <Photo
                  key={i}
                  src={src}
                  zoom={[1.06, 1.06]}
                  style={{ height: 470, borderRadius: 28, flex: "none" }}
                />
              ))}
            </div>
          );
        })}
      </div>
      <AbsoluteFill
        style={{
          background: `linear-gradient(90deg, ${pal.deep} 0%, ${pal.deep} 44%, ${pal.deep}00 64%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: SIDE,
          top: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Block
          eyebrow={eyebrow}
          title={title}
          size={100}
          lede={lede}
          ledeSize={34}
          width={720}
        />
      </div>
    </AbsoluteFill>
  );
};

export type CardDef = {
  k: string;
  title: string;
  text: string;
  icon?: React.ReactNode;
};

/** A section head over a row of cards. */
export const Cards: React.FC<{
  eyebrow?: string;
  title: string;
  size?: number;
  lede?: string;
  cards: CardDef[];
  cardH?: number;
  cardTitle?: number;
}> = ({
  eyebrow,
  title,
  size = 100,
  lede,
  cards,
  cardH = 420,
  cardTitle = 46,
}) => {
  const { pal, dark, mute } = usePal();
  return (
    <AbsoluteFill
      style={{ padding: `${TOP}px ${SIDE}px`, justifyContent: "space-between" }}
    >
      <Block
        eyebrow={eyebrow}
        title={title}
        size={size}
        lede={lede}
        ledeSize={36}
      />
      <div style={{ display: "flex", gap: 32 }}>
        {cards.map((c, i) => (
          <Reveal key={i} delay={30 + i * 9} y={80} style={{ flex: 1 }}>
            <div
              style={cardStyle(dark, {
                padding: "42px 42px",
                height: cardH,
                display: "flex",
                flexDirection: "column",
                gap: 20,
              })}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontFamily: MONO,
                    fontWeight: 700,
                    fontSize: 23,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: dark ? pal.acc : pal.sea,
                  }}
                >
                  {c.k}
                </span>
                {c.icon}
              </div>
              <div style={display(cardTitle, 780, { lineHeight: 1.08 })}>
                {c.title}
              </div>
              {c.text ? (
                <div style={{ fontSize: 30, lineHeight: 1.42, color: mute }}>
                  {c.text}
                </div>
              ) : null}
            </div>
          </Reveal>
        ))}
      </div>
    </AbsoluteFill>
  );
};

/** A closing line from the team, set large. */
export const Quote: React.FC<{ text: string; by: string }> = ({ text, by }) => {
  const { pal, mute } = usePal();
  return (
    <AbsoluteFill
      style={{ padding: `0 ${SIDE + 60}px`, justifyContent: "center" }}
    >
      <Reveal
        delay={0}
        y={0}
        scale={0.4}
        style={{
          ...display(320, 900),
          color: pal.acc,
          height: 170,
          marginBottom: 10,
        }}
      >
        “
      </Reveal>
      <Words
        delay={8}
        stagger={2}
        style={display(80, 720, {
          fontStretch: "100%",
          lineHeight: 1.12,
          letterSpacing: "-0.015em",
        })}
      >
        {text}
      </Words>
      <Reveal
        delay={50}
        style={{
          marginTop: 56,
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <span
          style={{ width: 70, height: 4, background: pal.acc, borderRadius: 4 }}
        />
        <span
          style={{
            fontFamily: MONO,
            fontWeight: 700,
            fontSize: 27,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: mute,
          }}
        >
          {by}
        </span>
      </Reveal>
    </AbsoluteFill>
  );
};

/** A chapter opener: a huge number, a kicker and the chapter's line. */
export const Chapter: React.FC<{
  n: string;
  kicker: string;
  title: string;
  photo?: string;
}> = ({ n, kicker, title, photo }) => {
  const frame = useCurrentFrame();
  const { pal } = usePal();
  return (
    <AbsoluteFill>
      {photo ? (
        <>
          <Photo
            src={photo}
            zoom={[1.12, 1.0]}
            dur={150}
            style={{ position: "absolute", inset: 0, opacity: 0.32 }}
          />
          <AbsoluteFill
            style={{
              background: `linear-gradient(90deg, ${pal.deep} 10%, ${pal.deep}55 100%)`,
            }}
          />
        </>
      ) : null}
      <div
        style={{
          position: "absolute",
          right: SIDE - 30,
          bottom: 40,
          ...display(500, 900, {
            fontStretch: "125%",
            letterSpacing: "-0.06em",
          }),
          color: "transparent",
          WebkitTextStroke: `3px ${pal.acc}`,
          opacity: prog(frame, 0, 30) * 0.5,
          translate: `${lerp(frame, [0, 150], [80, 0], Easing.linear)}px 0`,
        }}
      >
        {n}
      </div>
      <div
        style={{
          position: "absolute",
          left: SIDE,
          top: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Block eyebrow={kicker} title={title} size={140} width={1150} />
      </div>
    </AbsoluteFill>
  );
};
