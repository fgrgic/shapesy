import React from "react";
import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeConsumer, useTheme } from "styled-components/native";
import { Pressable, Spacer, Text, View } from "../../components/ui/primitives";
import { BASE_REM } from "../../components/ui/theme/utils/rem";
import { possibleShapes } from "../../gestures";
import { GestureName, PossibleShapes } from "../../gestures/types";
import ShapeDetector from "./components/ShapeDetector";
import * as Haptics from "expo-haptics";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

const ONE_SECOND = 1000;
const GAME_LENGTH = 30;

const Game = () => {
  const { top, bottom } = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const theme = useTheme();
  const navigation = useNavigation();
  let timer: NodeJS.Timer;

  const _correctShape = () => {
    setShapeGuessed(true);
    setCurrentShape(_getRandomShape());
    setGuessed((guessed) => guessed + 1);
    // setTimeout(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    // }, 0.3 * ONE_SECOND);
  };

  const _wrongShape = () => {
    setShapeGuessFail(true);
    // setTimeout(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    // }, 0.3 * ONE_SECOND);
  };

  const _getRandomShape = (): GestureName => {
    let shape: GestureName;
    do {
      shape = possibleShapes[Math.floor(Math.random() * possibleShapes.length)];
    } while (shape === currentShape);
    return shape;
  };

  const _vibrate = () => {
    Haptics.selectionAsync();
  };

  const _reset = () => {
    timer = setInterval(() => {
      setTimeLeft((timeLeft) => (timeLeft > 0 ? timeLeft - 1 : timeLeft));
    }, ONE_SECOND);
    setTimeLeft(GAME_LENGTH);
    setGuessed(0);
  };

  const [currentShape, setCurrentShape] = React.useState(_getRandomShape());
  const [shapeGuessed, setShapeGuessed] = React.useState(false);
  const [shapeGuessFail, setShapeGuessFail] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(GAME_LENGTH);
  const [guessed, setGuessed] = React.useState(0);

  React.useEffect(() => {
    const timeout = setTimeout(() => setShapeGuessed(false), ONE_SECOND);

    return () => clearTimeout(timeout);
  }, [shapeGuessed]);

  React.useEffect(() => {
    const timeout = setTimeout(() => setShapeGuessFail(false), ONE_SECOND);
    return () => clearTimeout(timeout);
  }, [shapeGuessFail]);

  React.useEffect(() => {
    const unsubscribeFocus = navigation.addListener("focus", () => {
      _reset();
    });

    const unsubscribeBlur = navigation.addListener("blur", () => {
      clearInterval(timer);
    });

    return () => {
      clearInterval(timer);
      unsubscribeFocus;
      unsubscribeBlur;
    };
  }, []);

  React.useEffect(() => {
    if (timeLeft <= 0) {
      navigation.navigate("GameOver", { score: guessed });
      clearInterval(timer);
    }
  }, [timeLeft]);

  return (
    <View
      bgColor={shapeGuessed ? "primary.D" : "background.A"}
      style={{ flex: 1 }}
    >
      {shapeGuessed && (
        <View
          bgColor="primary.B"
          paddingVertical="large"
          style={{
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            width: width,
            left: 0,
            zIndex: 20,
            bottom: bottom + theme.spacing.sizes.xxxlarge,
          }}
        >
          <Text.H3 color="success.text">Good Job!</Text.H3>
        </View>
      )}
      <Spacer size={top / BASE_REM} />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text.H3>{currentShape}</Text.H3>
          <Text.H4>{timeLeft}</Text.H4>
        </View>
        <Pressable
          marginRight="small"
          onPress={() => navigation.navigate("Home")}
        >
          <Feather
            name="log-out"
            size={theme.typography.sizes.large}
            color={theme.palette.error.primary}
          />
        </Pressable>
      </View>
      <ShapeDetector
        bgColor="whiteTransparent"
        shape={currentShape}
        onGestureSuccess={() => _correctShape()}
        onGestureFail={() => _wrongShape()}
        onProgress={(progress) => _vibrate()}
      />
      <Spacer size={bottom / BASE_REM + 10} />
    </View>
  );
};

export default Game;
