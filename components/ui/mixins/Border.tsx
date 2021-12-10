import { css, DefaultTheme } from 'styled-components/native';
import { BorderRadiusSize } from '../theme/types';

export interface BorderMixinProps {
  borderRadius?: number | BorderRadiusSize;
}

export function mapSizePropValueToPixels({
  value,
  theme,
}: {
  value: number | BorderRadiusSize;
  theme: DefaultTheme;
}) {
  let output = 0;

  if (typeof value === 'number') {
    return value;
  } else if (typeof value === 'string') {
    const namedValue = theme.shape.borderRadius[value];
    if (!isNaN(namedValue)) {
      output = namedValue;
    }
  }

  return output;
}

function mapBorderRadiusPropsToStyles(
  props: BorderMixinProps,
  theme: DefaultTheme
) {
  return Object.entries(props)
    .filter((p) => p[0].toLowerCase().match(/radius/))
    .map(
      (p) =>
        `${p[0]
          .split(/(?=[A-Z])/)
          .map((v) => v.toLowerCase())
          .join('-')}: ${mapSizePropValueToPixels({ value: p[1], theme })}px`
    )
    .join('\n');
}

export default css<BorderMixinProps>`
  ${(props) => mapBorderRadiusPropsToStyles(props, props.theme)};
`;
