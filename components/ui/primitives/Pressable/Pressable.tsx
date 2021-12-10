import React from "react";
import {
  View,
  Text,
  Pressable as DefaultPressable,
  PressableProps as DefaultPressableProps,
} from "react-native";
import * as Haptics from "expo-haptics";

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

export interface PressableProps extends DefaultPressableProps {
  haptics?: HapticType;
  disableHaptics?: boolean;
}

const Pressable = ({
  haptics = "light",
  disableHaptics = false,
  ...rest
}: PressableProps) => {
  return (
    <DefaultPressable
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

export default Pressable;
