import { StatusBarStyle } from 'expo-status-bar';
import colors from './colors';

/**
 * Theme
 */
export interface ITheme {
  meta: IThemeMeta;
  typography: {
    sizes: ISizes;
    rem: (number: number) => number;
  };
  shape: {
    borderRadius: IBorderRadiusSizes;
  };
  spacing: { sizes: ISizes; rem: (number: number) => number };
  palette: IPalette;
  colors: typeof colors;
  statusBarStyle: StatusBarStyle;
}

export interface IThemeMeta {
  name: string;
  dark: boolean;
}

export interface IPalette {
  common: {
    black: string;
    blackTransparent: string;
    white: string;
    whiteTransparent: string;
  };
  primary: IPaletteColor;
  secondary: IPaletteColor;
  background: IPaletteColor;
  alpha: IPaletteColor;

  success: IPaletteFunction;
  warning: IPaletteFunction;
  error: IPaletteFunction;

  text: string;
}

export interface IPaletteColor {
  A: string;
  B: string;
  C: string;
  D: string;
  E: string;
  text: string;
  textAlt: string;
}

export interface IPaletteFunction {
  background: string;
  text: string;
  primary: string;
}

export interface ISizes {
  xxxsmall: number;
  xxsmall: number;
  xsmall: number;
  small: number;
  medium: number;
  large: number;
  xlarge: number;
  xxlarge: number;
  xxxlarge: number;
}

export interface IBorderRadiusSizes {
  xsmall: number;
  small: number;
  medium: number;
  large: number;
  xlarge: number;
}

/**
 * Spacing
 */
export type SpacingType =
  | 'xxxsmall'
  | 'xxsmall'
  | 'xsmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'xlarge'
  | 'xxlarge'
  | 'xxxlarge';

/**
 * Typography
 */
export type TextSize =
  | 'xxxsmall'
  | 'xxsmall'
  | 'xsmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'xlarge'
  | 'xxlarge'
  | 'xxxlarge';

/**
 * Colors
 */
export type ColorType = 'primary' | 'secondary' | 'background' | 'alpha';
export type ColorTypeFunctional = 'success' | 'error' | 'warning';
export type TextColor = 'text';
export type CommonKeys =
  | 'white'
  | 'whiteTransparent'
  | 'black'
  | 'blackTransparent';
export type ColorKey = 'A' | 'B' | 'C' | 'D' | 'E' | 'text' | 'textAlt';
export type ColorKeyFunctional = 'background' | 'primary' | 'text';

type Path<T extends ColorType | ColorTypeFunctional | TextColor | CommonKeys> =
  T extends ColorType
    ? `${T}.${ColorKey}`
    : T extends ColorTypeFunctional
    ? `${T}.${ColorKeyFunctional}`
    : T extends TextColor
    ? `${T}`
    : T extends CommonKeys
    ? `common.${T}`
    : never;

export type PalettePath = Path<ColorType>;
export type FunctionalPath = Path<ColorTypeFunctional>;
export type TextPath = Path<TextColor>;
export type CommonPath = Path<CommonKeys>;
export type ThemePalettePath =
  | PalettePath
  | FunctionalPath
  | TextPath
  | CommonKeys;

/**
 * Border Radius
 */
export type BorderRadiusSize =
  | 'xsmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'xlarge';
