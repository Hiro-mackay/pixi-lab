import { Application } from 'pixi.js';
import { useDrawText } from '../hooks/useDrawText';
import { Viewer } from './Viewer';

const Encoder = () => {
  const app = new Application({
    width: 1240,
    height: 720,
    backgroundColor: 0x333333
  });

  const textContents = useDrawText(app);

  app.ticker.add((delta) => {
    textContents.forEach((text) => {
      text.rotation += 0.01 * delta;
    });
  });

  return <Viewer app={app} />;
};

export default Encoder;
