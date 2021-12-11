import { DefaultTheme } from "styled-components/native";
import colors from "../colors";

import { Default as theme } from "./Default";

const DarkTheme: DefaultTheme = {
  ...theme,
  meta: {
    name: "Dark",
    dark: true,
  },
  palette: {
    ...theme.palette,
    ...theme.palette,
    primary: {
      A: colors.aeroGreen[100],
      B: colors.aeroGreen[300],
      C: colors.aeroGreen[400],
      D: colors.aeroGreen[500],
      E: colors.aeroGreen[700],
      text: colors.black,
      textAlt: colors.cream[900],
    },
    secondary: {
      A: colors.sandyBrown[100],
      B: colors.sandyBrown[300],
      C: colors.sandyBrown[400],
      D: colors.sandyBrown[500],
      E: colors.sandyBrown[700],
      text: colors.black,
      textAlt: colors.gunmetal[700],
    },
    background: {
      A: colors.gunmetal[700],
      B: colors.gunmetal[600],
      C: colors.gunmetal[500],
      D: colors.gunmetal[400],
      E: colors.black,
      text: colors.white,
      textAlt: colors.cream[100],
    },
    success: {
      background: colors.aeroGreen[400],
      text: colors.greyscale.black,
      primary: colors.aeroGreen[400],
    },
    warning: {
      background: colors.sandyBrown[100],
      text: colors.greyscale.white,
      primary: colors.sandyBrown[400],
    },
    error: {
      background: colors.carmine[100],
      text: colors.greyscale.white,
      primary: colors.carmine[400],
    },
    text: colors.white,
  },
};

export default DarkTheme;
