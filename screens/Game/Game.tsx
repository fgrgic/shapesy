import React from "react";
import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeConsumer, useTheme } from "styled-components/native";
import { Spacer, Text, View } from "../../components/ui/primitives";
import { BASE_REM } from "../../components/ui/theme/utils/rem";
import { possibleShapes } from "../../gestures";
import { GestureName, PossibleShapes } from "../../gestures/types";
import ShapeDetector from "./components/ShapeDetector";
import * as Haptics from "expo-haptics";

const ONE_SECOND = 1000;

interface Props {}

const Game = (props: Props) => {
  const { top } = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const theme = useTheme();

  const _correctShape = () => {
    setShapeGuessed(true);
    setCurrentShape(_getRandomShape());
    setTimeout(() => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }, 0.3 * ONE_SECOND);
  };

  const _wrongShape = () => {
    setShapeGuessFail(true);
    setTimeout(() => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }, 0.3 * ONE_SECOND);
  };

  const _getRandomShape = (): GestureName => {
    let shape: GestureName;
    do {
      shape = possibleShapes[Math.floor(Math.random() * possibleShapes.length)];
    } while (shape === currentShape);
    return shape;
  };

  const _vibrate = (progress: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const [currentShape, setCurrentShape] = React.useState(_getRandomShape());
  const [shapeGuessed, setShapeGuessed] = React.useState(false);
  const [shapeGuessFail, setShapeGuessFail] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(30);

  React.useEffect(() => {
    const timeout = setTimeout(() => setShapeGuessed(false), 2 * ONE_SECOND);

    return () => clearTimeout(timeout);
  }, [shapeGuessed]);

  React.useEffect(() => {
    const timeout = setTimeout(() => setShapeGuessFail(false), 2 * ONE_SECOND);
    return () => clearTimeout(timeout);
  }, [shapeGuessFail]);

  let timer: NodeJS.Timer;
  React.useEffect(() => {
    timer = setInterval(() => {
      setTimeLeft((timeLeft) => (timeLeft > 0 ? timeLeft - 1 : timeLeft));
    }, ONE_SECOND);

    return () => clearInterval(timer);
  }, []);

  React.useEffect(() => {
    if (timeLeft <= 0) {
      console.warn("GAME OVER");
      clearInterval(timer);
    }
  }, [timeLeft]);

  return (
    <View
      bgColor={shapeGuessed ? "primary.D" : "background.B"}
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
            top: top + theme.spacing.sizes.xxxlarge,
          }}
        >
          <Text.H3 color="success.text">Good Job!</Text.H3>
        </View>
      )}
      <Spacer size={top / BASE_REM} />
      <View>
        <Text.H4>{currentShape}</Text.H4>
        <Text.H4>Time Left: {timeLeft}/30</Text.H4>
      </View>
      <ShapeDetector
        bgColor="whiteTransparent"
        shape={currentShape}
        onGestureSuccess={() => _correctShape()}
        onGestureFail={() => _wrongShape()}
        onProgress={(progress) => _vibrate(progress)}
      />
    </View>
  );
};

export default Game;
