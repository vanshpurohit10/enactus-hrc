import { random, useCurrentFrame } from "remotion";
import { HOME, MONO, SIDE } from "../../theme";
import { prog } from "../../ui/anim";
import { Reveal } from "../../ui/Reveal";
import { Scene, usePal } from "../../ui/Scene";
import { display } from "../../ui/Text";
import { Block } from "../../ui/templates";

const R = 330;
const CX = 1450;
const CY = 540;
// Mumbai, roughly: 19°N, 73°E.
const MUMBAI = { lat: 19, lon: 73 };

const GRID = (() => {
  const pts: { lat: number; lon: number }[] = [];
  for (let lat = -80; lat <= 80; lat += 10) {
    const n = Math.max(6, Math.round(36 * Math.cos((lat * Math.PI) / 180)));
    for (let k = 0; k < n; k++) pts.push({ lat, lon: (k / n) * 360 });
  }
  return pts;
})();

const CHAPTERS = Array.from({ length: 70 }, (_, i) => ({
  lat: (random(`lat${i}`) - 0.5) * 130,
  lon: random(`lon${i}`) * 360,
}));

const project = (lat: number, lon: number, spin: number) => {
  const la = (lat * Math.PI) / 180;
  const lo = ((lon + spin) * Math.PI) / 180;
  const x = Math.cos(la) * Math.sin(lo);
  const y = Math.sin(la);
  const z = Math.cos(la) * Math.cos(lo);
  // tilt the globe a little towards the viewer
  const t = 0.35;
  const y2 = y * Math.cos(t) - z * Math.sin(t);
  const z2 = y * Math.sin(t) + z * Math.cos(t);
  return { x: CX + x * R, y: CY - y2 * R, z: z2 };
};

const Globe: React.FC = () => {
  const frame = useCurrentFrame();
  const { pal } = usePal();
  const spin = -MUMBAI.lon + 60 - frame * 0.25;
  const appear = prog(frame, 6, 40);
  const m = project(MUMBAI.lat, MUMBAI.lon, spin);
  const pulse = (frame % 50) / 50;
  return (
    <svg
      width={1920}
      height={1080}
      style={{ position: "absolute", inset: 0, opacity: appear }}
    >
      <circle
        cx={CX}
        cy={CY}
        r={R + 2}
        fill="rgba(255,255,255,.03)"
        stroke="rgba(255,255,255,.12)"
        strokeWidth={2}
      />
      {GRID.map((g, i) => {
        const p = project(g.lat, g.lon, spin);
        if (p.z < 0) return null;
        return (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={2.4}
            fill={`rgba(255,255,255,${0.12 + p.z * 0.4})`}
          />
        );
      })}
      {CHAPTERS.map((c, i) => {
        const p = project(c.lat, c.lon, spin);
        if (p.z < 0) return null;
        const on = prog(frame, 20 + i * 1.2, 14);
        return (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={5 * on}
            fill={pal.acc}
            opacity={0.35 + p.z * 0.5}
          />
        );
      })}
      {m.z > 0 ? (
        <g>
          <circle
            cx={m.x}
            cy={m.y}
            r={12 + pulse * 40}
            fill="none"
            stroke={pal.acc}
            strokeWidth={3}
            opacity={1 - pulse}
          />
          <circle cx={m.x} cy={m.y} r={12} fill={pal.acc} />
        </g>
      ) : null}
    </svg>
  );
};

export const About: React.FC = () => (
  <Scene pal={HOME} tone="ink" glow={false}>
    <Globe />
    <Reveal
      delay={40}
      style={{
        position: "absolute",
        left: CX - 230,
        top: CY + R + 34,
        width: 460,
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: MONO,
          fontWeight: 700,
          fontSize: 22,
          letterSpacing: "0.18em",
          color: HOME.muteD,
        }}
      >
        MUMBAI
      </div>
      <div style={display(44, 860, { marginTop: 8 })}>Enactus H.R. College</div>
    </Reveal>
    <div style={{ position: "absolute", left: SIDE, top: 130, width: 980 }}>
      <Block
        eyebrow="What is Enactus?"
        title="One of 1,600+ chapters worldwide."
        size={96}
        width={980}
        ledeSize={36}
        lede="Enactus, formerly Students in Free Enterprise, is a community of student, academic and business leaders using entrepreneurial action to transform lives and shape a better, more sustainable world."
      />
      <Reveal
        delay={60}
        style={{
          marginTop: 50,
          paddingLeft: 30,
          borderLeft: `5px solid ${HOME.acc}`,
        }}
      >
        <div
          style={{
            fontSize: 36,
            lineHeight: 1.4,
            color: "#fff",
            fontWeight: 500,
          }}
        >
          We believe in investing in students who take entrepreneurial action
          for others, to create a better world for us all.
        </div>
      </Reveal>
    </div>
  </Scene>
);
