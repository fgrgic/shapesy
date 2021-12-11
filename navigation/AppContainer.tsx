import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Home from "../screens/Home";
import Game from "../screens/Game";
import Settings from "../screens/Settings";
import Learn from "../screens/Learn";
import Repeat from "../screens/Repeat";

const MainStack = createNativeStackNavigator();

const Main = () => {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen component={Home} name="Home" />
      <MainStack.Screen component={Game} name="Game" />
      <MainStack.Screen component={Learn} name="Learn" />
      <MainStack.Screen component={Settings} name="Settings" />
      <MainStack.Screen component={Repeat} name="Repeat" />
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
