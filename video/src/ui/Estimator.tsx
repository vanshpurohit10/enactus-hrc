import React from "react";
import { AbsoluteFill, Easing, useCurrentFrame } from "remotion";
import { MONO, SIDE } from "../theme";
import { Chip, Photo } from "./Bits";
import { lerp } from "./anim";
import { Reveal } from "./Reveal";
import { usePal } from "./Scene";
import { display } from "./Text";
import { Block } from "./templates";

/**
 * The partner panel at the foot of each project page: the section head over a photo,
 * and the site's calculator with its slider moving up to the example amount.
 */
export const Estimator: React.FC<{
  photo: string;
  eyebrow: string;
  title: string;
  lede: string;
  question: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  to: number;
  lines: (n: number) => [string, string][];
  note?: string;
  ctas: string[];
}> = ({
  photo,
  eyebrow,
  title,
  lede,
  question,
  unit,
  min,
  max,
  step,
  to,
  lines,
  note,
  ctas,
}) => {
  const frame = useCurrentFrame();
  const { pal } = usePal();
  const n =
    Math.round(
      lerp(frame, [40, 130], [min, to], Easing.bezier(0.45, 0, 0.2, 1)) / step,
    ) * step;
  const fill = (n - min) / (max - min);
  return (
    <>
      <Photo
        src={photo}
        zoom={[1.15, 1.04]}
        dur={270}
        style={{ position: "absolute", inset: 0, opacity: 0.4 }}
      />
      <AbsoluteFill
        style={{
          background: `linear-gradient(90deg, ${pal.deep} 25%, ${pal.deep}b0 100%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: SIDE,
          top: 0,
          bottom: 0,
          width: 900,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 40,
        }}
      >
        <Block
          eyebrow={eyebrow}
          title={title}
          size={104}
          width={900}
          ledeSize={33}
          lede={lede}
        />
        <div style={{ display: "flex", gap: 16 }}>
          {ctas.map((c, i) => (
            <Chip key={c} solid={i === 0} delay={50 + i * 6} size={22}>
              {c}
            </Chip>
          ))}
        </div>
      </div>
      <Reveal
        delay={20}
        x={120}
        y={0}
        style={{
          position: "absolute",
          right: SIDE,
          top: 190,
          width: 640,
          background: "#fff",
          color: pal.text,
          borderRadius: 36,
          padding: "50px 52px",
          boxShadow: "0 50px 120px -40px rgba(0,0,0,.8)",
        }}
      >
        <div
          style={{
            fontFamily: MONO,
            fontWeight: 700,
            fontSize: 24,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: pal.sea,
          }}
        >
          {question}
        </div>
        <div
          style={display(96, 900, {
            marginTop: 16,
            fontVariantNumeric: "tabular-nums",
          })}
        >
          {n} <span style={{ fontSize: 44, color: pal.mute }}>{unit}</span>
        </div>
        <div
          style={{
            position: "relative",
            height: 14,
            borderRadius: 99,
            background: "rgba(0,0,0,.1)",
            marginTop: 26,
          }}
        >
          <div
            style={{
              width: `${fill * 100}%`,
              height: "100%",
              borderRadius: 99,
              background: pal.acc,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: `${fill * 100}%`,
              top: "50%",
              width: 40,
              height: 40,
              marginLeft: -20,
              marginTop: -20,
              borderRadius: 99,
              background: "#fff",
              boxShadow: `0 0 0 6px ${pal.acc}, 0 6px 16px rgba(0,0,0,.3)`,
            }}
          />
        </div>
        <div
          style={{
            marginTop: 40,
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          {lines(n).map(([label, value]) => (
            <div
              key={label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                borderTop: "2px solid rgba(0,0,0,.08)",
                paddingTop: 18,
              }}
            >
              <span style={{ fontSize: 30, color: pal.mute }}>{label}</span>
              <span
                style={display(54, 880, { fontVariantNumeric: "tabular-nums" })}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
        {note ? (
          <div
            style={{
              fontSize: 23,
              lineHeight: 1.45,
              color: pal.mute,
              marginTop: 26,
            }}
          >
            {note}
          </div>
        ) : null}
      </Reveal>
    </>
  );
};

export const rupees = (v: number) =>
  `₹${Math.round(v).toLocaleString("en-IN")}`;
