import { Application } from 'pixi.js';

type Props = {
  app: Application;
};

export const Viewer = ({ app }: Props) => {
  return (
    <div
      ref={(node) => {
        node?.appendChild(app.view);
      }}
    ></div>
  );
};
