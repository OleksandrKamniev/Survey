import { useEffect } from 'react';

export const useBackground = (isInformScreen: boolean) => {
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--background',
      isInformScreen
        ? 'linear-gradient(to bottom, #4A3D8D, #6939A1)'
        : '#FFF0F0',
    );
  }, [isInformScreen]);
};
