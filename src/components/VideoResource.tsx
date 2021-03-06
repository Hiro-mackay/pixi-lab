import { Application, Sprite, BaseTexture } from 'pixi.js';
import { ChangeEventHandler } from 'react';
import { useGenerateVideoResource } from '../hooks/GenerateElement/VideoResource';
import { Viewer } from './Viewer';

let position = 0;

const Component = () => {
  const app = new Application({ width: 1240, height: 720, backgroundColor: 0x333333 });
  const videoResourceGenerator = useGenerateVideoResource();

  const sleectedFile: ChangeEventHandler<HTMLInputElement> = async (ev) => {
    if (ev.target.files?.length) {
      try {
        const resource = await videoResourceGenerator(ev.target.files[0]);
        const baseTexture = new BaseTexture(resource);
        const sprite = Sprite.from(baseTexture);
        sprite.position.set(position, position);
        position += 200;
        app.stage.addChild(sprite);
        ev.target.value = '';
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
