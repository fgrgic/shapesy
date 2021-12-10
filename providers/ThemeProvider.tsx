import React, { Dispatch, SetStateAction } from "react";
import rem from "../components/ui/theme/utils/rem";
import {
  LIGHT_THEME,
  DARK_THEME,
  SYSTEM_THEME,
} from "../utils/storage/storageKeys";
import { saveItem, loadItem } from "../utils/storage";
import {
  useTheme,
  ThemeProvider as DefaultThemeProvider,
} from "styled-components/native";
import { useColorScheme } from "react-native";
import LightTheme from "../components/ui/theme/themes/LightTheme";
import DarkTheme from "../components/ui/theme/themes/DarkTheme";
import { StatusBar } from "expo-status-bar";
import { DefaultTheme } from "styled-components";

export type ThemeVersion = "system" | "dark" | "light";

interface ThemeContext {
  theme?: DefaultTheme | null;
  lightTheme?: DefaultTheme | null;
  darkTheme?: DefaultTheme | null;
  setDarkTheme: Dispatch<SetStateAction<typeof DarkTheme>>;
  setLightTheme: Dispatch<SetStateAction<typeof LightTheme>>;
  setTheme: Dispatch<SetStateAction<typeof LightTheme>>;
  themeVersion: ThemeVersion | null;
  setThemeVersion: React.Dispatch<React.SetStateAction<ThemeVersion>>;
  themeLoaded?: boolean;
}

const initialContext: ThemeContext = {
  theme: null,
  lightTheme: null,
  darkTheme: null,
  themeVersion: null,
  setTheme: () => {},
  setThemeVersion: () => {},
  setLightTheme: () => {},
  setDarkTheme: () => {},
};

const ThemeContext = React.createContext<ThemeContext>(initialContext);

interface Props {
  children?: React.ReactNode;
}

const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = React.useState(LightTheme);
  const [lightTheme, setLightTheme] = React.useState(LightTheme);
  const [darkTheme, setDarkTheme] = React.useState(DarkTheme);
  const [themeLoaded, setThemeLoaded] = React.useState(false);
  const colorScheme = useColorScheme();
  const [themeVersion, setThemeVersion] =
    React.useState<ThemeVersion>("system");

  const handleSaveLight = async () => {
    if (!lightTheme || !themeLoaded) return;
    await saveItem(LIGHT_THEME, lightTheme);
  };

  const handleSaveDark = async () => {
    if (!darkTheme || !themeLoaded) return;
    await saveItem(DARK_THEME, darkTheme);
  };

  const handleSaveThemeVersion = async () => {
    if (!themeVersion || !themeLoaded) return;
    await saveItem(SYSTEM_THEME, themeVersion);
  };

  const handleLoad = async () => {
    const storageLightTheme = await loadItem(LIGHT_THEME);
    const storageDarkTheme = await loadItem(DARK_THEME);
    const storageThemeVersion = await loadItem(SYSTEM_THEME);
    if (storageLightTheme) {
      const lightJSON = JSON.parse(storageLightTheme);
      lightJSON.spacing.rem = (number: number) => rem(number);
      lightJSON.typography.rem = (number: number) => rem(number);
      setLightTheme(lightJSON);
    }
    if (storageDarkTheme) {
      const darkJSON = JSON.parse(storageDarkTheme);
      darkJSON.spacing.rem = (number: number) => rem(number);
      darkJSON.typography.rem = (number: number) => rem(number);
      setDarkTheme(darkJSON);
    }
    if (storageThemeVersion) {
      setThemeVersion(JSON.parse(storageThemeVersion));
    }
    setThemeLoaded(true);
  };

  React.useEffect(() => {
    handleSaveLight();
  }, [lightTheme]);

  React.useEffect(() => {
    handleSaveDark();
  }, [darkTheme]);

  React.useEffect(() => {
    if (!themeLoaded) return;
    if (themeVersion === "system") {
      if (colorScheme === "dark") {
        setTheme(darkTheme);
      } else {
        setTheme(lightTheme);
      }
    }
  }, [colorScheme, themeLoaded, darkTheme, lightTheme]);

  React.useEffect(() => {
    if (themeVersion === "light") {
      setTheme(lightTheme);
    }
    handleSaveLight();
  }, [lightTheme]);

  React.useEffect(() => {
    if (themeVersion === "dark") {
      setTheme(darkTheme);
    }
    handleSaveDark();
  }, [darkTheme]);

  React.useEffect(() => {
    if (themeVersion === "dark") {
      setTheme(darkTheme);
    }
    if (themeVersion === "light") {
      setTheme(lightTheme);
    }
    if (themeVersion === "system") {
      if (colorScheme === "dark") {
        setTheme(darkTheme);
      } else {
        setTheme(lightTheme);
      }
    }
    handleSaveThemeVersion();
  }, [themeVersion]);

  React.useEffect(() => {
    handleLoad();
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        setTheme,
        setThemeVersion,
        themeVersion,
        setDarkTheme,
        setLightTheme,
        lightTheme,
        darkTheme,
        themeLoaded,
      }}
    >
      <DefaultThemeProvider theme={theme}>
        <StatusBar style={theme.statusBarStyle} />
        {children}
      </DefaultThemeProvider>
    </ThemeContext.Provider>
  );
};

const useCustomTheme = () => React.useContext(ThemeContext);

export { ThemeProvider, useCustomTheme };
