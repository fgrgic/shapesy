import { FontAwesome, Feather } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';

export default function useCachedResources() {
  const [loadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          ...Feather.font,
          'raleway-regular': require('../assets/fonts/Raleway-Regular.ttf'),
          'raleway-extralight': require('../assets/fonts/Raleway-ExtraLight.ttf'),
          'raleway-extralight-italic': require('../assets/fonts/Raleway-ExtraLightItalic.ttf'),
          'raleway-light': require('../assets/fonts/Raleway-Light.ttf'),
          'raleway-light-italic': require('../assets/fonts/Raleway-LightItalic.ttf'),
          'raleway-thin': require('../assets/fonts/Raleway-Thin.ttf'),
          'raleway-thin-italic': require('../assets/fonts/Raleway-ThinItalic.ttf'),
          'raleway-medium': require('../assets/fonts/Raleway-Medium.ttf'),
          'raleway-medium-italic': require('../assets/fonts/Raleway-MediumItalic.ttf'),
          'raleway-semibold': require('../assets/fonts/Raleway-SemiBold.ttf'),
          'raleway-semibold-italic': require('../assets/fonts/Raleway-SemiBoldItalic.ttf'),
          'raleway-bold': require('../assets/fonts/Raleway-Bold.ttf'),
          'raleway-bold-italic': require('../assets/fonts/Raleway-BoldItalic.ttf'),
          'raleway-extrabold': require('../assets/fonts/Raleway-ExtraBold.ttf'),
          'raleway-extrabold-italic': require('../assets/fonts/Raleway-ExtraBoldItalic.ttf'),
          'raleway-black': require('../assets/fonts/Raleway-Black.ttf'),
          'raleway-black-italic': require('../assets/fonts/Raleway-BlackItalic.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return loadingComplete;
}
