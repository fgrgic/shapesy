import { DefaultTheme } from 'styled-components';

import { default as theme } from './DarkTheme';
import colors from '../colors';

const OledTheme: DefaultTheme = {
  ...theme,
  meta: {
    name: 'Dark Oled',
    dark: true,
  },
  palette: {
    ...theme.palette,
    background: {
      ...theme.palette.background,
      A: colors.black,
      B: colors.gunmetal[700],
      C: colors.gunmetal[600],
      D: colors.gunmetal[500],
      E: colors.gunmetal[400],
    },
  },
};

export default OledTheme;
