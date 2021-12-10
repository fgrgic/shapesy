import React from "react";
import { Omit, ViewStyle } from "react-native";
import styled from "styled-components/native";
import BackgroundColor, {
  BackgroundColorMixinProps,
} from "../ui/mixins/BackgroundColor";
import Border, { BorderMixinProps } from "../ui/mixins/Border";
import Spacing, { SpacingMixinProps } from "../ui/mixins/Spacing";
import { Spacer, Text, View } from "../ui/primitives";
import Pressable from "../ui/primitives/Pressable";
import { PressableProps } from "../ui/primitives/Pressable/Pressable";
import { SpacingType, ThemePalettePath } from "../ui/theme/types";

interface MenuButtonProps
  extends PressableProps,
    BorderMixinProps,
    SpacingMixinProps,
    BackgroundColorMixinProps {
  text: string;
  textColor?: ThemePalettePath;
  topSpacer?: SpacingType | number;
  bottomSpacer?: SpacingType | number;
}

const MenuButton = ({
  text,
  textColor = "primary.text",
  topSpacer,
  bottomSpacer,
  ...rest
}: MenuButtonProps) => {
  const [pressed, setPressed] = React.useState(false);

  return (
    <BigButton
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      pressed={pressed}
      bgColor={rest.bgColor ? rest.bgColor : "primary.C"}
      {...rest}
    >
      {topSpacer && <Spacer size={topSpacer} />}
      <Text.H1 color={textColor}>{text}</Text.H1>
      {bottomSpacer && <Spacer size={bottomSpacer} />}
    </BigButton>
  );
};

interface BigButtonProps extends Omit<MenuButtonProps, "text" | "textColor"> {
  pressed?: boolean;
}

const BigButton = styled(Pressable)<BigButtonProps>`
  ${Border}
  ${Spacing}
  ${BackgroundColor}
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.sizes.xxxlarge}px;
  opacity: ${({ pressed }) => (pressed ? 0.7 : 1)};
`;

export default MenuButton;
