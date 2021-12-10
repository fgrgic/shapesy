import React from 'react';
import { PressableProps, Pressable, TextStyle } from 'react-native';
import { ThemePalettePath } from '../../theme/types';
import { Icon } from '@expo/vector-icons/build/createIconSet';
import { Feather } from '@expo/vector-icons';
import Border, { BorderMixinProps } from '../../mixins/Border';
import Spacing, { SpacingMixinProps } from '../../mixins/Spacing';
import BackgroundColor, {
  BackgroundColorMixinProps,
} from '../../mixins/BackgroundColor';
import styled, { useTheme } from 'styled-components/native';
import Text from '../Text';

type ButtonTone = 'neutral' | 'success' | 'warning' | 'error' | 'text';

function mapToneToColor(tone: ButtonTone): {
  bgColor: ThemePalettePath;
  textColor: ThemePalettePath;
} {
  switch (tone) {
    case 'error':
      return { bgColor: 'error.primary', textColor: 'error.text' };
    case 'warning':
      return { bgColor: 'warning.primary', textColor: 'warning.text' };
    case 'success':
      return { bgColor: 'success.primary', textColor: 'success.text' };
    case 'text':
      return { bgColor: 'whiteTransparent', textColor: 'success.text' };
    default:
      return { bgColor: 'primary.C', textColor: 'secondary.text' };
  }
}

type ExtractIcons<I> = I extends Icon<infer T, any> ? T : never;
export type FeatherIconList = ExtractIcons<typeof Feather>;

function checkIfReactElement(
  item: FeatherIconList | React.ReactElement
): item is React.ReactElement {
  return typeof item !== 'string';
}
interface ButtonProps
  extends PressableProps,
    BorderMixinProps,
    SpacingMixinProps,
    BackgroundColorMixinProps {
  children: React.ReactNode;
  bgColor?: ThemePalettePath;
  textColor?: ThemePalettePath;
  textStyle?: TextStyle;
  tone?: ButtonTone;
  icon?: FeatherIconList | React.ReactElement;
  iconColor?: ThemePalettePath;
  disabled?: boolean;
  full?: boolean;
}

const Button = ({
  children,
  bgColor: propBgColor,
  textColor: propTextColor,
  tone = 'neutral',
  paddingHorizontal = 'small',
  paddingVertical = 'small',
  ...props
}: ButtonProps) => {
  const { bgColor, textColor } =
    propBgColor || propTextColor
      ? {
          bgColor: propBgColor ?? 'secondary.C',
          textColor: propTextColor ?? 'secondary.text',
        }
      : mapToneToColor(tone);

  return (
    <StyledPressable
      bgColor={bgColor}
      textColor={textColor}
      paddingHorizontal={paddingHorizontal}
      paddingVertical={paddingVertical}
      {...props}
    >
      {typeof children === 'string' ? (
        <Text
          size='medium'
          weight={700}
          color={textColor}
          style={props.textStyle}
        >
          {children}
        </Text>
      ) : (
        { children }
      )}
    </StyledPressable>
  );
};

const StyledPressable = styled(Pressable)<ButtonProps>`
  ${Border}
  ${Spacing}
  ${BackgroundColor}
  align-items: flex-end;
`;

export default Button;
