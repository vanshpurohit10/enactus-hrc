import "./theme";
import { Composition, Folder } from "remotion";
import { FPS, HEIGHT, Main, TOTAL_FRAMES, WIDTH } from "./Main";
import { SCENES } from "./scenes";

const chapters = [...new Set(SCENES.map((s) => s.chapter))];

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
    {chapters.map((chapter) => (
      <Folder key={chapter} name={chapter}>
        {SCENES.filter((s) => s.chapter === chapter).map((s) => (
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
