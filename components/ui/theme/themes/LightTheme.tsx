import { DefaultTheme } from 'styled-components/native';

import { Default as theme } from './Default';

const LightTheme: DefaultTheme = {
  ...theme,
  meta: {
    name: 'Light',
    dark: false,
  },
};

export default LightTheme;
