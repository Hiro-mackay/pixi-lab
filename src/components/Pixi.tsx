import { Application, Texture, Sprite, BaseTexture, VideoResource, ImageResource } from 'pixi.js';
import { ChangeEventHandler } from 'react';

const loadVideoElement = async (file: File): Promise<HTMLVideoElement> => {
  const refURL = URL.createObjectURL(file);
  const element = document.createElement('video');
  element.src = refURL;
  element.crossOrigin = 'anonymous';

  return new Promise((resolve, reject) => {
    element.onloadeddata = () => {
      resolve(element);
    };
  });
};

const loadTexture = async (file: File) => {
  const ref = URL.createObjectURL(file);

  const R = new VideoResource([{ src: ref, mime: file.type }], { autoLoad: false, autoPlay: false });

  const base = new BaseTexture(R);
  const texture = Texture.from(base);

  console.log(texture);

  console.log(R.source);

  return R.load().then(() => Promise.resolve(texture));
};

const createSprite = async (file: File) => {
  try {
    const texture = await loadTexture(file);
    console.log(texture);
    return Sprite.from(texture);
  } catch (error) {
    throw error;
  }
};

const Pixi = () => {
  const app = new Application({ width: 1240, height: 720, backgroundColor: 0x333333 });

  const sleectedFile: ChangeEventHandler<HTMLInputElement> = (ev) => {
    if (ev.target.files?.length) {
      try {
        createSprite(ev.target.files[0])
          .then((sprite) => {
            app.stage.addChild(sprite);
            console.log(sprite);
          })
          .catch(console.error);
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
      <div
        ref={(node) => {
          node?.appendChild(app.view);
        }}
      ></div>
    </>
  );
};

export default Pixi;
