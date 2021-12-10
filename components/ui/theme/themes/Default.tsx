import { DefaultTheme } from 'styled-components';
import colors from '../colors';
import rem from '../utils/rem';

export const Default: DefaultTheme = {
  meta: {
    name: 'default',
    dark: false,
  },
  typography: {
    sizes: {
      xxxsmall: rem(0.25),
      xxsmall: rem(0.5),
      xsmall: rem(0.75),
      small: rem(0.85),
      medium: rem(1),
      large: rem(1.5),
      xlarge: rem(2),
      xxlarge: rem(3),
      xxxlarge: rem(4),
    },
    rem: rem,
  },
  spacing: {
    sizes: {
      xxxsmall: rem(0.25),
      xxsmall: rem(0.5),
      xsmall: rem(0.75),
      small: rem(0.85),
      medium: rem(1),
      large: rem(1.5),
      xlarge: rem(2),
      xxlarge: rem(3),
      xxxlarge: rem(4),
    },
    rem: rem,
  },
  shape: {
    borderRadius: {
      xsmall: 2,
      small: 5,
      medium: 10,
      large: 20,
      xlarge: 40,
    },
  },
  palette: {
    common: {
      black: colors.black,
      blackTransparent: colors.blackTransparent,
      white: colors.white,
      whiteTransparent: colors.whiteTransparent,
    },
    primary: {
      A: colors.aeroGreen[200],
      B: colors.aeroGreen[300],
      C: colors.aeroGreen[400],
      D: colors.aeroGreen[500],
      E: colors.aeroGreen[700],
      text: colors.greyscale.black,
      textAlt: colors.greyscale.white,
    },
    secondary: {
      A: colors.sandyBrown[200],
      B: colors.sandyBrown[300],
      C: colors.sandyBrown[400],
      D: colors.sandyBrown[500],
      E: colors.sandyBrown[700],
      text: colors.greyscale.black,
      textAlt: colors.greyscale.white,
    },
    background: {
      A: colors.white,
      B: colors.gunmetal[50],
      C: colors.gunmetal[100],
      D: colors.gunmetal[300],
      E: colors.gunmetal[400],
      text: colors.black,
      textAlt: colors.gunmetal[500],
    },
    alpha: {
      A: colors.greyscale[50],
      B: colors.greyscale[100],
      C: colors.greyscale[400],
      D: colors.greyscale[600],
      E: colors.greyscale[800],
      text: colors.black,
      textAlt: colors.white,
    },
    success: {
      background: colors.aeroGreen[200],
      text: colors.greyscale.black,
      primary: colors.aeroGreen[500],
    },
    warning: {
      background: colors.sandyBrown[200],
      text: colors.greyscale.black,
      primary: colors.sandyBrown[500],
    },
    error: {
      background: colors.carmine[200],
      text: colors.greyscale.black,
      primary: colors.carmine[500],
    },
    text: colors.black,
  },
  colors: colors,
  statusBarStyle: 'dark',
};
