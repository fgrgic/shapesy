import { css, DefaultTheme } from 'styled-components/native';
import { SpacingType } from '../theme/types';

export function mapSizePropValueToPixels(
  value: number | SpacingType,
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

export interface SpacingMixinProps {
  marginHorizontal?: number | SpacingType;
  marginVertical?: number | SpacingType;
  marginTop?: number | SpacingType;
  marginLeft?: number | SpacingType;
  marginBottom?: number | SpacingType;
  marginRight?: number | SpacingType;
  paddingHorizontal?: number | SpacingType;
  paddingVertical?: number | SpacingType;
  paddingTop?: number | SpacingType;
  paddingLeft?: number | SpacingType;
  paddingBottom?: number | SpacingType;
  paddingRight?: number | SpacingType;
}

function mapPropsToStyles(props: SpacingMixinProps, theme: DefaultTheme) {
  return Object.entries(props)
    .filter((p) => p[0].match(/margin|padding/))
    .map(
      (p) =>
        `${p[0]
          .split(/(?=[A-Z])/)
          .map((v) => v.toLowerCase())
          .join('-')}: ${mapSizePropValueToPixels(p[1], theme)}px`
    )
    .join('\n');
}

export default css<SpacingMixinProps>`
  ${(props) => mapPropsToStyles(props, props.theme)}
`;
