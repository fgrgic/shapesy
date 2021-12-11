import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends MainStackParamList {}
  }
}

export interface ChatScreenParams {
  roomName: string;
}
export interface MainStackParamList {
  Home: undefined;
  Game: undefined;
  Learn: undefined;
  Settings: undefined;
  Repeat: undefined;
}
