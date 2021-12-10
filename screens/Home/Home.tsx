import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MenuButton from "../../components/MenuButton";
import { Screen, View } from "../../components/ui/primitives";
import { BASE_REM } from "../../components/ui/theme/utils/rem";

interface Props {}

const Home = (props: Props) => {
  const navigation = useNavigation();

  const { top, bottom } = useSafeAreaInsets();

  return (
    <Screen>
      <View style={{ flex: 1 }}>
        <MenuButton
          text="Play"
          onPress={() => navigation.navigate("Game")}
          topSpacer={top / BASE_REM}
          style={{ flex: 3 }}
        />
        <MenuButton
          text="Learn"
          bgColor="secondary.C"
          style={{ flex: 3 }}
          onPress={() => navigation.navigate("Learn")}
        />
        <MenuButton
          text="Settings"
          bgColor="background.B"
          style={{ flex: 1 }}
          bottomSpacer={bottom / BASE_REM}
          onPress={() => navigation.navigate("Settings")}
        />
      </View>
    </Screen>
  );
};

export default Home;
