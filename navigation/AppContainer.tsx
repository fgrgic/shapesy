import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Text } from "../components/ui/primitives";
import Home from "../screens/Home";
import Game from "../screens/Game";
import Settings from "../screens/Settings";
import { ChatScreenParams } from "./types";
import Learn from "../screens/Learn";

const MainStack = createNativeStackNavigator();

const Main = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        component={Home}
        name="Home"
        options={{ headerShown: false }}
      />
      <MainStack.Screen component={Game} name="Game" />
      <MainStack.Screen component={Learn} name="Learn" />
      <MainStack.Screen component={Settings} name="Settings" />
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
