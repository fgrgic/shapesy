import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import React from "react";
import Home from "../screens/Home";
import Game from "../screens/Game";
import Settings from "../screens/Settings";
import Learn from "../screens/Learn";
import Repeat from "../screens/Repeat";
import GameOver from "../screens/Game/screens/GameOver";
import { GameOverScreenParams } from "./types";
import Pressable from "../components/ui/primitives/Pressable";
import { Text } from "../components/ui/primitives";

const MainStack = createNativeStackNavigator();

// type GameOverScreenNavigationProp = NativeStackNavigationProp<
//   GameOverScreenParams,
//   'score'
// >;

const Main = () => {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen component={Home} name="Home" />
      <MainStack.Screen component={Game} name="Game" />
      <MainStack.Screen component={Learn} name="Learn" />
      <MainStack.Screen component={Settings} name="Settings" />
      <MainStack.Screen component={Repeat} name="Repeat" />
      <MainStack.Screen
        component={GameOver}
        name="GameOver"
        options={{
          presentation: "modal",
          // headerShown: true,
          // title: "Time's up!",
        }}
      />
    </MainStack.Navigator>
  );
};

function AppContainer() {
  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  );
}

export default AppContainer;
