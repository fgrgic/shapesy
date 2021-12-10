import React, { FunctionComponent, useState } from 'react';
import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  LayoutChangeEvent,
  Platform,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface KeyboardSafeViewProps extends KeyboardAvoidingViewProps {
  insetCorrection?: boolean;
}
const KeyboardSafeView: FunctionComponent<KeyboardSafeViewProps> = ({
  insetCorrection = true,
  children,
  ...rest
}) => {
  const { height: fullHeight } = useWindowDimensions();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const [offset, setOffset] = useState(0);
  const correctionPx = insetCorrection ? bottomInset && bottomInset - 16 : 0;
  const onLayout = ({
    nativeEvent: {
      layout: { height },
    },
  }: LayoutChangeEvent) => setOffset(fullHeight - height - correctionPx);
  return (
    <View onLayout={onLayout} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.select({ ios: offset })}
        behavior={Platform.select({ ios: 'padding' })}
        {...rest}
      >
        {children}
      </KeyboardAvoidingView>
    </View>
  );
};

export default KeyboardSafeView;
