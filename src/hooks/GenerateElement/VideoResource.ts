import { VideoResource } from 'pixi.js';
import { useCallback } from 'react';

export const useGenerateVideoResource = () => {
  const generator = useCallback(async (file: File): Promise<VideoResource> => {
    const videoElement = document.createElement('video');
    videoElement.setAttribute('preload', 'auto');
    videoElement.setAttribute('webkit-playsinline', '');
    videoElement.setAttribute('playsinline', '');
    videoElement.crossOrigin = 'anonymous';
    const refURL = URL.createObjectURL(file);
    videoElement.src = refURL;
    videoElement.loop = true;

    const resource = new VideoResource(videoElement, { autoPlay: true, autoLoad: false });

    return resource.load();
  }, []);

  return generator;
};
