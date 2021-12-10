import { css, DefaultTheme } from 'styled-components/native';
import { TextSize, ThemePalettePath } from '../theme/types';

export function mapSizePropValueToPixels(
  value: number | TextSize,
  theme: DefaultTheme
) {
  let output = 0;

  if (typeof value === 'number') {
    output = theme.spacing.rem(value);
  } else if (typeof value === 'string') {
    const remValue = theme.spacing.sizes[value];
    if (!isNaN(remValue)) {
      output = remValue;
    }
  }

  return output;
}

export interface TypographyMixinProps {
  color?: ThemePalettePath;
  size?: TextSize | number;
}

export default css<TypographyMixinProps>`
  color: ${({ color, theme }) => {
    if (!color) return theme.palette.text;
    const colorParts = color.split('.');
    if (colorParts.length === 1) {
      // @ts-ignore
      return theme.palette.common[colorParts[0]];
    }
    if (colorParts.length === 2) {
      // @ts-ignore
      return theme.palette[colorParts[0]][colorParts[1]];
    }
    return theme.palette.text;
  }};

  font-size: ${({ size, theme }) =>
    size
      ? mapSizePropValueToPixels(size, theme) + 'px'
      : theme.typography.sizes.medium + 'px'};
`;
