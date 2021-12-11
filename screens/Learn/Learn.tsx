import React, { useState } from "react";
import { SafeAreaView, View, Alert } from "react-native";
import _ from "lodash";
import GestureDetector, {
  GesturePath,
  Cursor,
  GestureRecorder,
} from "react-native-gesture-detector";
import { Coordinate } from "react-native-gesture-detector/dist/Types";
import { useTheme } from "styled-components/native";
import * as Haptics from "expo-haptics";
import {
  View as CustomView,
  Text,
  Pressable,
  Spacer,
} from "../../components/ui/primitives";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BASE_REM } from "../../components/ui/theme/utils/rem";

const Learn = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { top, bottom } = useSafeAreaInsets();

  const _vibrate = () => {
    Haptics.selectionAsync();
  };

  const [progress, setProgress] = React.useState<number | null>(null);

  const [recorderOffset, setRecorderOffset] = React.useState<Coordinate | null>(
    null
  );
  const [detectorOffset, setDetectorOffset] = React.useState<Coordinate | null>(
    null
  );
  const [finishedGesture, setFinishedGesture] = React.useState<
    Coordinate[] | null
  >([]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.palette.background.A }}>
      <Spacer size={top / BASE_REM} />
      <CustomView
        bgColor="background.A"
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <CustomView>
          <Text.H4>Learn</Text.H4>
        </CustomView>
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
      </CustomView>
      <GestureRecorder
        onPanRelease={(gesture) => {
          setFinishedGesture(gesture);
          setDetectorOffset(recorderOffset);
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }}
      >
        {({ gesture, offset }) => {
          if (!_.isEqual(offset, recorderOffset) && offset !== null) {
            setRecorderOffset(offset);
          }

          return (
            <View
              style={{
                flex: 6,
                backgroundColor: theme.palette.background.A,
              }}
            >
              <Text>Draw:</Text>
              <GesturePath
                path={gesture.map((coordinate) => {
                  if (recorderOffset) {
                    return {
                      x: coordinate.x + recorderOffset.x,
                      y: coordinate.y + recorderOffset.y,
                    };
                  }

                  return coordinate;
                })}
                color={theme.palette.text}
                slopRadius={5}
                center={false}
              />
            </View>
          );
        }}
      </GestureRecorder>
      <GestureDetector
        onProgress={({ progress }) => {
          _vibrate();
        }}
        onPanRelease={() => setProgress(null)}
        onGestureFinish={() =>
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
        }
        gestures={{ CustomUserGesture: finishedGesture ? finishedGesture : [] }}
      >
        {({ coordinate }) => (
          <View
            style={{
              flex: 6,
              backgroundColor: theme.palette.primary.B,
            }}
          >
            <Spacer size="xxsmall" />
            <Text color="primary.text">Practice:</Text>
            {finishedGesture && (
              <GesturePath
                path={finishedGesture.map((coordinate) => {
                  if (detectorOffset) {
                    return {
                      x: coordinate.x + detectorOffset.x,
                      y: coordinate.y + detectorOffset.y,
                    };
                  }

                  return coordinate;
                })}
                color={theme.palette.primary.text}
                slopRadius={5}
                center={false}
              />
            )}
            {coordinate && <Cursor {...coordinate} />}
            <Spacer size={bottom / BASE_REM} />
          </View>
        )}
      </GestureDetector>
    </View>
  );
};

export default Learn;
