import { css, DefaultTheme } from 'styled-components/native';
import { ThemePalettePath } from '../theme/types';

export interface BackgroundColorMixinProps {
  bgColor?: ThemePalettePath;
}

export function mapNameToColor(
  theme: DefaultTheme,
  colorName?: ThemePalettePath
): string {
  if (!colorName) return 'transparent';
  const color = colorName.split('.');
  if (color.length === 1) {
    // @ts-ignore
    return theme.palette.common[color[0]];
  }
  if (color.length === 2) {
    // @ts-ignore
    return theme.palette[color[0]][color[1]];
  }
  return 'transparent';
}

export default css<BackgroundColorMixinProps>`
  background-color: ${({ bgColor, theme }) => mapNameToColor(theme, bgColor)};
`;
