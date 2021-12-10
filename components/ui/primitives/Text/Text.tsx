import React from 'react';
import {
  View,
  Text as DefaultText,
  TextProps as DefaultTextProps,
} from 'react-native';
import styled from 'styled-components/native';
import BackgroundColor, {
  BackgroundColorMixinProps,
} from '../../mixins/BackgroundColor';
import Spacing, { SpacingMixinProps } from '../../mixins/Spacing';
import Typography, { TypographyMixinProps } from '../../mixins/Typography';

type TextWeight =
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900
  | 'light'
  | 'regular'
  | 'bold'
  | 'black';
interface TextProps
  extends DefaultTextProps,
    SpacingMixinProps,
    TypographyMixinProps,
    BackgroundColorMixinProps {
  children?: React.ReactNode;
  weight?: TextWeight;
  italic?: boolean;
  fontFamily?: string;
}

const Text = ({
  children,
  weight = 'regular',
  italic = false,
  paddingHorizontal = 'medium',
  fontFamily: propFontFamily,
  ...rest
}: TextProps) => {
  const fontFamily = () => {
    if (propFontFamily) return propFontFamily;

    let nameBuilder = 'raleway';

    switch (weight) {
      case 100:
        nameBuilder += '-thin';
        break;
      case 200:
      case 'light':
        nameBuilder += '-extralight';
        break;
      case 300:
        nameBuilder += '-light';
        break;
      case 400:
      case 'regular':
        nameBuilder += '-regular';
        break;
      case 500:
        nameBuilder += '-medium';
        break;
      case 600:
        nameBuilder += '-semibold';
        break;
      case 700:
      case 'bold':
        nameBuilder += '-bold';
        break;
      case 800:
        nameBuilder += '-extrabold';
        break;
      case 900:
      case 'black':
        nameBuilder += '-black';
        break;
    }

    if (italic) {
      nameBuilder += '-italic';
    }

    return nameBuilder;
  };

  return (
    <StyledText
      italic={italic}
      fontFamily={fontFamily()}
      paddingHorizontal={paddingHorizontal}
      {...rest}
    >
      {children}
    </StyledText>
  );
};

interface StyledTextProps extends TextProps {
  fontFamily: string;
  italic: boolean;
}

const StyledText = styled.Text<StyledTextProps>`
  ${Spacing}
  ${BackgroundColor}
  ${Typography}
  font-family: ${({ fontFamily }) => fontFamily};
  font-style: ${({ italic }) => (italic ? 'italic' : 'normal')};
`;

Text.H1 = (props: TextProps) => <Text weight={800} size='xxlarge' {...props} />;
Text.H2 = (props: TextProps) => <Text weight={700} size='xlarge' {...props} />;
Text.H3 = (props: TextProps) => <Text weight={600} size='large' {...props} />;
Text.H4 = (props: TextProps) => <Text weight={500} size='large' {...props} />;
Text.H5 = (props: TextProps) => <Text weight={500} size='medium' {...props} />;
Text.H6 = (props: TextProps) => <Text weight={600} size='small' {...props} />;
Text.Copy = (props: TextProps) => (
  <Text weight={400} size='medium' {...props} />
);
Text.CopySmall = (props: TextProps) => (
  <Text weight={400} size='small' {...props} />
);

Text.Title = (props: TextProps) => (
  <Text weight='bold' size='large' {...props} />
);

export default Text;
