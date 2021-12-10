import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text } from 'react-native';
import { useCustomTheme } from '../providers/ThemeProvider';
import AppContainer from './AppContainer';

const Loader = () => {
  const [loadingFinished, setLoadingFinished] = React.useState(true);

  const { themeLoaded } = useCustomTheme();

  React.useEffect(() => {
    if (themeLoaded) setLoadingFinished(true);
  }, [themeLoaded]);

  if (!loadingFinished) return null;

  return (
    <>
      <AppContainer />
      <StatusBar />
    </>
  );
};

export default Loader;
