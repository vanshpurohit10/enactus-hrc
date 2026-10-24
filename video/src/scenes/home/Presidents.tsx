import { Easing, useCurrentFrame } from "remotion";
import { HOME, MONO, SIDE } from "../../theme";
import { Photo } from "../../ui/Bits";
import { prog } from "../../ui/anim";
import { Scene } from "../../ui/Scene";
import { Eyebrow, Lede, Words, display } from "../../ui/Text";

const President: React.FC<{
  n: string;
  name: string;
  line: string;
  text: string;
  photo: string;
}> = ({ n, name, line, text, photo }) => {
  const frame = useCurrentFrame();
  const p = prog(frame, 0, 40, Easing.bezier(0.16, 1, 0.3, 1));
  return (
    <Scene pal={HOME} tone="deep">
      <div
        style={{
          position: "absolute",
          left: SIDE,
          top: 110,
          width: 690,
          height: 860,
          borderRadius: 36,
          overflow: "hidden",
          boxShadow: `0 40px 120px -40px ${HOME.acc}66`,
          rotate: `${(1 - p) * -6}deg`,
          translate: `${(1 - p) * -200}px 0`,
          opacity: p,
        }}
      >
        <Photo
          src={photo}
          zoom={[1.12, 1.0]}
          dur={240}
          position="50% 30%"
          style={{ position: "absolute", inset: 0 }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 960,
          right: SIDE,
          top: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 30,
        }}
      >
        <Eyebrow delay={6}>Meet the leadership</Eyebrow>
        <div
          style={{
            fontFamily: MONO,
            fontWeight: 700,
            fontSize: 30,
            letterSpacing: "0.2em",
            color: HOME.muteD,
            opacity: prog(frame, 10, 20),
          }}
        >
          PRESIDENT · {n}
        </div>
        <Words delay={14} style={display(116, 880)}>
          {name}
        </Words>
        <Words
          delay={30}
          stagger={2}
          style={display(50, 720, { color: HOME.acc, lineHeight: 1.1 })}
        >
          {line}
        </Words>
        <Lede delay={44} size={36}>
          {text}
        </Lede>
      </div>
    </Scene>
  );
};

export const PresidentOne: React.FC = () => (
  <President
    n="01"
    name="Vaishnavi Chaturvedi"
    line="The President behind the vision"
    text="Keeping the vision clear while bringing together people, projects and possibilities, and turning what we want to achieve into a direction the whole team can move towards."
    photo="president-vaishnavi-chaturvedi.jpg"
  />
);

export const PresidentTwo: React.FC = () => (
  <President
    n="02"
    name="Bhavika Jhawar"
    line="The President behind the team"
    text="A team this big needs someone who sees the people behind the work. From ideas to challenges, keeping everyone connected, motivated and moving forward together."
    photo="president-bhavika-jhawar.jpg"
  />
);
