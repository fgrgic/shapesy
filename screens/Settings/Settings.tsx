import React from "react";
import { Screen, Spacer, Text, View } from "../../components/ui/primitives";
import { useCustomTheme } from "../../providers/ThemeProvider";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import { Pressable } from "../../components/ui/primitives";
import { PressableProps } from "../../components/ui/primitives/Pressable/Pressable";

interface CheckedItemProps extends PressableProps {
  checked?: boolean;
  text?: string;
}

const CheckedItem = ({ checked, text, ...rest }: CheckedItemProps) => {
  const theme = useTheme();
  return (
    <Pressable
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      {...rest}
    >
      <Text>{text}</Text>
      <View
        marginRight="small"
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: theme.spacing.sizes.xlarge,
          width: theme.spacing.sizes.xlarge,
        }}
      >
        {checked && (
          <Feather
            size={theme.typography.sizes.large}
            color={theme.palette.text}
            name="check"
          />
        )}
      </View>
    </Pressable>
  );
};

const Settings = () => {
  const { themeVersion, setThemeVersion } = useCustomTheme();

  return (
    <Screen>
      <Screen.Content>
        <Spacer size="small" />
        <Text.H3>Theme</Text.H3>
        <Spacer size="xxxsmall" />
        <CheckedItem
          checked={themeVersion === "light"}
          text="Light"
          onPress={() => {
            setThemeVersion("light");
          }}
        />
        <CheckedItem
          checked={themeVersion === "dark"}
          text="Dark"
          onPress={() => {
            setThemeVersion("dark");
          }}
        />
        <CheckedItem
          checked={themeVersion === "system"}
          text="System"
          onPress={() => {
            setThemeVersion("system");
          }}
        />
      </Screen.Content>
    </Screen>
  );
};

export default Settings;
