import React from 'react';
import {
  Pressable,
  TextInput as DefaultTextInput,
  TextInputProps as DefaultTextInputProps,
} from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

import BackgroundColor, {
  BackgroundColorMixinProps,
  mapNameToColor,
} from '../../mixins/BackgroundColor';
import Spacing, { SpacingMixinProps } from '../../mixins/Spacing';
import Typography, { TypographyMixinProps } from '../../mixins/Typography';
import { Default } from '../../theme/themes/Default';
import { ThemePalettePath } from '../../theme/types';
import Text from '../Text';
import View from '../View';
import { FeatherIconList } from '../Button/Button';

interface TextInputProps
  extends DefaultTextInputProps,
    BackgroundColorMixinProps,
    TypographyMixinProps,
    SpacingMixinProps {
  fontFamily?: string;
  italic?: boolean;
  label?: string;
  labelBgColor?: ThemePalettePath;
  labelTextColor?: ThemePalettePath;
  placeholderTextColor?: ThemePalettePath;
  sendButton?: boolean;
  onSend?: (text: string) => void;
  sendIcon?: FeatherIconList;
}

const TextInput = React.forwardRef<DefaultTextInput, TextInputProps>(
  (
    {
      fontFamily = 'raleway-regular',
      italic = false,
      bgColor = 'background.B',
      paddingHorizontal = 'small',
      paddingVertical = 'medium',
      label,
      labelBgColor = 'background.D',
      labelTextColor = 'white',
      autoCapitalize = 'none',
      autoCorrect = false,
      placeholderTextColor = 'primary.textAlt',
      sendButton,
      sendIcon = 'arrow-right',
      onSend,
      ...rest
    },
    ref
  ) => {
    const placeholderTColor = mapNameToColor(Default, placeholderTextColor);
    const theme = useTheme();

    return (
      <View>
        {label && (
          <Text.CopySmall
            color={labelTextColor}
            bgColor={labelBgColor}
            paddingVertical='xxxsmall'
          >
            {label}
          </Text.CopySmall>
        )}
        <View
          bgColor={bgColor}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <StyledTextInput
            ref={ref}
            style={{ flex: 1 }}
            // bgColor='background.A'
            // marginHorizontal='xxsmall'
            // marginVertical='xxsmall'
            paddingHorizontal={paddingHorizontal}
            paddingVertical={paddingVertical}
            fontFamily={fontFamily}
            italic={italic}
            autoCapitalize={autoCapitalize}
            autoCorrect={autoCorrect}
            placeholderTextColor={placeholderTColor}
            {...rest}
          />
          {sendButton && (
            <SendButtonContainer
              style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
              onPress={() => {
                if (rest.value) {
                  if (onSend) {
                    onSend(rest.value);
                  }
                }
              }}
            >
              <Feather
                name={sendIcon}
                size={theme.typography.sizes.large}
                color={theme.palette.background.textAlt}
              />
            </SendButtonContainer>
          )}
        </View>
      </View>
    );
  }
);

const SendButtonContainer = styled(Pressable)`
  background-color: ${({ theme }) => theme.palette.background.A};
  border-radius: ${({ theme }) => theme.shape.borderRadius.small}px;
  padding: ${({ theme }) => theme.spacing.sizes.xxxsmall}px;
  margin-right: ${({ theme }) => theme.spacing.sizes.medium}px;
`;
interface StyledTextInputProps
  extends BackgroundColorMixinProps,
    TypographyMixinProps,
    SpacingMixinProps {
  fontFamily: string;
  italic: boolean;
}

const StyledTextInput = styled.TextInput<StyledTextInputProps>`
  ${BackgroundColor}
  ${Typography}
  ${Spacing}
  font-family: ${({ fontFamily }) => fontFamily};
  font-style: ${({ italic }) => (italic ? 'italic' : 'normal')};
`;

export default TextInput;
