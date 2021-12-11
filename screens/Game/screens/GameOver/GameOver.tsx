import { useNavigation, RouteProp } from "@react-navigation/native";
import React from "react";
import { Route } from "react-native";
import {
  Button,
  Pressable,
  Screen,
  Spacer,
  Text,
  View,
} from "../../../../components/ui/primitives";

interface Props {
  route: RouteProp<any>;
}

const GameOver = ({ route }: Props) => {
  const navigation = useNavigation();
  return (
    <Screen>
      <Screen.Content>
        <Spacer size="xlarge" />
        <Text.H2>Congratulations!</Text.H2>
        <Spacer size="large" />
        <View
          bgColor="primary.D"
          borderRadius="medium"
          marginHorizontal="medium"
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <Spacer size="large" />
          <Text.H5>Your score:</Text.H5>
          <Text.H1>{route.params?.score}</Text.H1>
          <Spacer size="large" />
        </View>
        <Spacer size="medium" />
        <Pressable
          bgColor="background.B"
          marginHorizontal="medium"
          paddingVertical="large"
          borderRadius="medium"
          onPress={() => navigation.canGoBack() && navigation.goBack()}
          style={{ alignItems: "center" }}
        >
          <Text.H5>Try Again</Text.H5>
        </Pressable>
        <Pressable
          marginHorizontal="medium"
          paddingVertical="large"
          borderRadius="medium"
          onPress={() => navigation.navigate("Home")}
          style={{ alignItems: "center" }}
        >
          <Text.H5 paddingHorizontal={0}>Return to Home Screen</Text.H5>
        </Pressable>
      </Screen.Content>
    </Screen>
  );
};

export default GameOver;
