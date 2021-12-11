import React from "react";
import { View, Text, Alert } from "react-native";
import GestureDetector, {
  Cursor,
  GesturePath,
} from "react-native-gesture-detector";
import { Screen } from "../../components/ui/primitives";
import gestures from "../../gestures";

interface Props {}

const Learn = (props: Props) => {
  const [progress, setProgress] = React.useState<number | null>(null);
  const [gesture, setGesture] = React.useState<string | null>(null);

  const [requiredGesture, setRequiredGesture] = React.useState("Triangle");

  return (
    <View style={{ flex: 1 }}>
      <GestureDetector
        onGestureFinish={(gesture) =>
          // Alert.alert(`Gesture ${gesture} finished!`)
          console.warn("finished: ", gesture)
        }
        onProgress={({ gesture, progress }) => {
          setProgress(progress);
          setGesture(gesture);
        }}
        onPanRelease={() => {
          setProgress(null);
          setGesture(null);
        }}
        gestures={gestures}
      >
        {({ coordinate }) => (
          <View
            style={{
              backgroundColor: "#faa",
              flex: 6,
            }}
          >
            <GesturePath
              center
              path={gestures.Square}
              color="#ff0000"
              slopRadius={5}
            />
            {coordinate && <Cursor {...coordinate} />}
          </View>
        )}
      </GestureDetector>
      <View style={{ flex: 1 }}>
        <Text>Gesture: {gesture}</Text>
        <Text>Progress: {progress}</Text>
      </View>
    </View>
  );
};

export default Learn;
