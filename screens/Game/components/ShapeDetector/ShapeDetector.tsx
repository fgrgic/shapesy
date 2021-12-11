import React from "react";
import GestureDetector, {
  Cursor,
  GesturePath,
} from "react-native-gesture-detector";
import { useTheme } from "styled-components/native";
import { View, Text } from "react-native";
import { View as CustomView } from "../../../../components/ui/primitives";
// import { Text, View } from "../../../../components/ui/primitives";
import gestures from "../../../../gestures";
import { GestureName } from "../../../../gestures/types";
import { ThemePalettePath } from "../../../../components/ui/theme/types";

interface ShapeDetectorProps {
  shape: GestureName;
  onProgress?: (progress: number) => void;
  onGesture?: (gestureName: string) => void;
  onGestureFinish?: (gestureName: string) => void;
  onGestureSuccess?: (gestureName: string) => void;
  onGestureFail?: (gestureName: string) => void;
  bgColor?: ThemePalettePath;
}

const ShapeDetector = ({
  shape,
  onProgress,
  onGesture,
  onGestureFinish,
  onGestureSuccess,
  onGestureFail,
  bgColor = "background.B",
}: ShapeDetectorProps) => {
  const theme = useTheme();

  const [progress, setProgress] = React.useState<number | null>(null);
  const [gesture, setGesture] = React.useState<string | null>(null);

  return (
    <CustomView style={{ flex: 1 }} bgColor={bgColor}>
      <GestureDetector
        onPanRelease={() => {
          setProgress(null);
          setGesture(null);
        }}
        onProgress={({ gesture: newGesture, progress: newProgress }) => {
          if (gesture !== newGesture && gesture && onGesture) {
            onGesture(newGesture);
          }
          if (progress !== newProgress && progress && onProgress) {
            if (shape === gesture) {
              onProgress(progress);
            }
          }
          setProgress(newProgress);
          setGesture(newGesture);
        }}
        onGestureFinish={() => {
          if (onGestureFinish && gesture) {
            onGestureFinish(gesture);
          }
          if (gesture && onGestureSuccess && shape === gesture) {
            onGestureSuccess(gesture);
          }
          if (gesture && onGestureFail && shape !== gesture) {
            onGestureFail(gesture);
          }
        }}
        gestures={gestures}
      >
        {({ coordinate }) => (
          <View style={{ flex: 6 }}>
            <GesturePath
              center
              path={gestures[shape]}
              color={theme.palette.primary.E}
              slopRadius={5}
            />
            {coordinate && <Cursor {...coordinate} />}
          </View>
        )}
      </GestureDetector>
    </CustomView>
  );
};

export default ShapeDetector;
