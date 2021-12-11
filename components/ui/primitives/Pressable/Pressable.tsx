import React from "react";
import {
  View,
  Text,
  Pressable as DefaultPressable,
  PressableProps as DefaultPressableProps,
  BackgroundPropType,
} from "react-native";
import * as Haptics from "expo-haptics";
import BackgroundColor, {
  BackgroundColorMixinProps,
} from "../../mixins/BackgroundColor";
import Spacing, { SpacingMixinProps } from "../../mixins/Spacing";
import Border, { BorderMixinProps } from "../../mixins/Border";
import styled from "styled-components/native";
import Typography, { TypographyMixinProps } from "../../mixins/Typography";

export type HapticImpactType = "light" | "medium" | "heavy";
export type HapticFeedbackType = "success" | "error" | "warning";
export type HapticSelectionType = "selection";

export type HapticType =
  | HapticFeedbackType
  | HapticImpactType
  | HapticSelectionType;

async function _impact(type: HapticType) {
  switch (type) {
    case "light":
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      break;
    case "medium":
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      break;
    case "heavy":
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      break;
    case "success":
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      break;
    case "error":
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      break;
    case "warning":
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      break;
    case "selection":
      Haptics.selectionAsync();
      break;
  }
}

export interface PressableProps
  extends DefaultPressableProps,
    BackgroundColorMixinProps,
    SpacingMixinProps,
    BorderMixinProps {
  haptics?: HapticType;
  disableHaptics?: boolean;
}

const Pressable = ({
  haptics = "light",
  disableHaptics = false,
  ...rest
}: PressableProps) => {
  return (
    <StyledPressable
      {...rest}
      onPress={(e) => {
        if (!disableHaptics) {
          _impact(haptics);
        }
        rest.onPress && rest.onPress(e);
      }}
    />
  );
};

const StyledPressable = styled(DefaultPressable)<PressableProps>`
  ${BackgroundColor}
  ${Spacing}
  ${Border}
`;

export default Pressable;
