import React from 'react';
import {
  View,
  Text,
  ScrollViewProps,
  ViewStyle,
  ViewProps,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled, { css, DefaultTheme, useTheme } from 'styled-components/native';
import BackgroundColor, {
  BackgroundColorMixinProps,
  mapNameToColor,
} from '../../mixins/BackgroundColor';
import { ThemePalettePath } from '../../theme/types';

type ScreenType = React.FC<ScreenProps> & {
  /**
   * Default content container. Allows pull to refresh feature
   * by passing a callback function to the `refetch` prop.
   */
  Content: typeof ScreenContent;
  /**
   * Container for having fixed footers on a screen.
   * If used with the `button` prop. the button will extend down to fill "unsafe" areas on larger phones.
   */
  Footer: typeof ScreenFooter;
};

const Screen: ScreenType = ({
  children,
  topInset = false,
  bgColor,
  ...restProps
}) => {
  const insets = useSafeAreaInsets();

  return (
    <ScreenContainer
      topInset={topInset ? insets.top : undefined}
      bgColor={bgColor}
      {...restProps}
    >
      {children}
    </ScreenContainer>
  );
};

export function getBottomInset(inset: number | null, theme: DefaultTheme) {
  if (inset === null) {
    return 0;
  }
  if (inset > 0) {
    return inset;
  }
  return theme.spacing.sizes.medium;
}

interface ScreenContainerProps {
  topInset?: number;
  bgColor?: ThemePalettePath;
}

const ScreenContainer = styled.View<ScreenContainerProps>`
  ${(props) => (props.topInset ? `padding-top: ${props.topInset}px;` : ``)}
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
  background-color: ${({ theme, bgColor }) =>
    bgColor ? mapNameToColor(theme, bgColor) : theme.palette.background.A};
`;

interface ScreenProps {
  bottomInset?: number | boolean;
  topInset?: number | boolean;
  bgColor?: ThemePalettePath;
}

export interface ScreenContentProps extends ScrollViewProps {
  children?: React.ReactNode;
  ref?: React.MutableRefObject<any>;
  bottomInset?: boolean;
}

const ScreenContent = React.forwardRef<ScrollView, ScreenContentProps>(
  (
    { children, bottomInset = true, ...restProps },
    ref // for refreshing to add later
  ) => {
    const insets = useSafeAreaInsets();
    const [refreshing, setRefreshing] = React.useState(false);
    const theme = useTheme();

    return (
      <StyledScrollView
        ref={ref}
        style={{ paddingBottom: bottomInset ? theme.spacing.sizes.medium : 0 }}
        {...restProps}
      >
        {children}
      </StyledScrollView>
    );
  }
);

const StyledScrollView = styled.ScrollView`
  flex: 1;
  flex-grow: 1;
  ${BackgroundColor}
`;

const StickyFooterMixin = css`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

interface StyledFooterProps extends ViewProps, BackgroundColorMixinProps {
  bottomInset: number | null;
  sticky?: boolean;
}

const StyledScreenFooter = styled.View<StyledFooterProps>`
  ${BackgroundColor}
  padding-bottom: ${({ bottomInset, theme }) =>
    getBottomInset(bottomInset, theme)}px;
  ${({ sticky }) => (sticky ? StickyFooterMixin : undefined)}
`;

interface ScreenFooterProps
  extends Omit<StyledFooterProps, 'bottomInset'>,
    BackgroundColorMixinProps {
  bottomInset?: boolean;
}

const ScreenFooter: React.FC<ScreenFooterProps> = ({
  bottomInset,
  ...restProps
}) => {
  const insets = useSafeAreaInsets();

  return (
    <StyledScreenFooter
      bottomInset={bottomInset ? insets.bottom : null}
      {...restProps}
    ></StyledScreenFooter>
  );
};

Screen.Content = ScreenContent;
Screen.Footer = ScreenFooter;

export default Screen;
