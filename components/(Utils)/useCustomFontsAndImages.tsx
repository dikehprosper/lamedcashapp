/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {useState, useEffect} from "react";
import * as Font from "expo-font";
import {Image} from "react-native";

const useCustomFontsAndImages = (fontPaths: any, imagePaths: any) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAssets = async () => {
      try {
        // Load fonts
        await Font.loadAsync(fontPaths);

        // Preload images

        // const promises = imagePaths.map((path: any) => Image.prefetch(path));
        // await Promise.all(promises);

        // Set loaded to true when both fonts and images are loaded
        setLoaded(true);
      } catch (err: any) {
        setError(err);
      }
    };

    loadAssets();
  }, [fontPaths, imagePaths]);

  return [loaded, error];
};

export default useCustomFontsAndImages;
