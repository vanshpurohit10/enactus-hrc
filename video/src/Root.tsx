import "./theme";
import { Composition, Folder } from "remotion";
import {
  FPS,
  HEIGHT,
  Main,
  SHORT_FRAMES,
  Short,
  TOTAL_FRAMES,
  WIDTH,
} from "./Main";
import { SCENES, SHORT_SCENES } from "./scenes";

// Each scene once, at its full-film length, plus the scenes only the short cut uses.
const ALL = [
  ...SCENES,
  ...SHORT_SCENES.filter((s) => !SCENES.some((f) => f.id === s.id)),
];
const chapters = [...new Set(ALL.map((s) => s.chapter))].sort();

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="EnactusHRC"
      component={Main}
      width={WIDTH}
      height={HEIGHT}
      fps={FPS}
      durationInFrames={TOTAL_FRAMES}
    />
    <Composition
      id="EnactusHRC-3min"
      component={Short}
      width={WIDTH}
      height={HEIGHT}
      fps={FPS}
      durationInFrames={SHORT_FRAMES}
    />
    {chapters.map((chapter) => (
      <Folder key={chapter} name={chapter}>
        {ALL.filter((s) => s.chapter === chapter).map((s) => (
          <Composition
            key={s.id}
            id={s.id}
            component={s.component}
            width={WIDTH}
            height={HEIGHT}
            fps={FPS}
            durationInFrames={Math.round(s.seconds * FPS)}
          />
        ))}
      </Folder>
    ))}
  </>
);
