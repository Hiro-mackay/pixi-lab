import { Application, Sprite, BaseTexture } from 'pixi.js';
import { ChangeEventHandler } from 'react';
import { useGenerateVideoResource } from '../hooks/LoadAsset/GenerateElement/VideoResource';
import { Viewer } from './Viewer';

const Component = () => {
  const app = new Application({ width: 1240, height: 720, backgroundColor: 0x333333 });
  const videoResourceGenerator = useGenerateVideoResource();

  const sleectedFile: ChangeEventHandler<HTMLInputElement> = async (ev) => {
    if (ev.target.files?.length) {
      try {
        const resource = await videoResourceGenerator(ev.target.files[0]);
        // const imageResource = await imageResourceGenerator(ev.target.files[0])
        const baseTexture = new BaseTexture(resource);
        const sprite = Sprite.from(baseTexture);
        app.stage.addChild(sprite);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <div>
        <input type="file" onChange={sleectedFile} />
      </div>
      <Viewer app={app} />
    </>
  );
};

export default Component;
