import React from "react";
import { ViewProps as DefaultViewProps } from "react-native";
import styled from "styled-components/native";
import Spacing, { SpacingMixinProps } from "../../mixins/Spacing";
import BackgroundColor, {
  BackgroundColorMixinProps,
} from "../../mixins/BackgroundColor";
import Border, { BorderMixinProps } from "../../mixins/Border";

interface ViewProps
  extends BackgroundColorMixinProps,
    SpacingMixinProps,
    BorderMixinProps,
    DefaultViewProps {
  children?: React.ReactNode;
}

const View = ({ children, ...rest }: ViewProps) => {
  return <StyledView {...rest}>{children}</StyledView>;
};

const StyledView = styled.View`
  ${Spacing}
  ${BackgroundColor}
  ${Border}
`;

export default View;
