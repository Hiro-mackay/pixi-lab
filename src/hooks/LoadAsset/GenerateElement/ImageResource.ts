import { ImageResource } from 'pixi.js';
import { useCallback } from 'react';

export const useGenerateImageResource = () => {
  const generator = useCallback(async (file: File) => {
    const imageElement = document.createElement('img');
    imageElement.crossOrigin = 'anonymous';
    const refURL = URL.createObjectURL(file);
    imageElement.src = refURL;
    const resource = new ImageResource(imageElement, { autoLoad: false });
    return resource.load();
  }, []);

  return generator;
};
