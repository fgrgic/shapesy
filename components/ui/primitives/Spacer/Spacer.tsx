import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from 'styled-components/native';
import { SpacingType } from '../../theme/types';

interface SpacerProps {
  size?: SpacingType | number;
}

const Spacer = ({ size = 'medium' }: SpacerProps) => {
  const theme = useTheme();
  const height =
    typeof size === 'number'
      ? theme.spacing.rem(size)
      : theme.spacing.sizes[size];

  return <View style={{ height }} />;
};

export default Spacer;
