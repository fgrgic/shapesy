import { PossibleShapes } from "./types";

const Triangle = [
  { x: 0, y: 0 },
  { x: 10, y: 20 },
  { x: 20, y: 40 },
  { x: 30, y: 60 },
  { x: 40, y: 80 },
  { x: 50, y: 100 },
  { x: 60, y: 120 },
  { x: 70, y: 140 },
  { x: 80, y: 160 },
  { x: 60, y: 160 },
  { x: 40, y: 160 },
  { x: 20, y: 160 },
  { x: 0, y: 160 },
  { x: -20, y: 160 },
  { x: -40, y: 160 },
  { x: -60, y: 160 },
  { x: -80, y: 160 },
  { x: -70, y: 140 },
  { x: -60, y: 120 },
  { x: -50, y: 100 },
  { x: -40, y: 80 },
  { x: -30, y: 60 },
  { x: -20, y: 40 },
  { x: -10, y: 20 },
  // { x: 0, y: 0 },
];

const Rectangle = [
  { x: 0, y: 0 },
  { x: 20, y: 0 },
  { x: 40, y: 0 },
  { x: 60, y: 0 },
  { x: 80, y: 0 },
  { x: 100, y: 0 },
  { x: 120, y: 0 },
  { x: 140, y: 0 },
  { x: 160, y: 0 },
  { x: 160, y: 20 },
  { x: 160, y: 40 },
  { x: 160, y: 60 },
  { x: 160, y: 80 },
  { x: 160, y: 100 },
  { x: 160, y: 120 },
  { x: 160, y: 140 },
  { x: 160, y: 160 },
  { x: 140, y: 160 },
  { x: 120, y: 160 },
  { x: 100, y: 160 },
  { x: 80, y: 160 },
  { x: 60, y: 160 },
  { x: 40, y: 160 },
  { x: 20, y: 160 },
  { x: 0, y: 160 },
  { x: -20, y: 160 },
  { x: -40, y: 160 },
  { x: -60, y: 160 },
  { x: -80, y: 160 },
  { x: -100, y: 160 },
  { x: -120, y: 160 },
  { x: -140, y: 160 },
  { x: -160, y: 160 },
  { x: -160, y: 140 },
  { x: -160, y: 120 },
  { x: -160, y: 100 },
  { x: -160, y: 80 },
  { x: -160, y: 60 },
  { x: -160, y: 40 },
  { x: -160, y: 20 },
  { x: -160, y: 0 },
  { x: -140, y: 0 },
  { x: -120, y: 0 },
  { x: -100, y: 0 },
  { x: -80, y: 0 },
  { x: -60, y: 0 },
  { x: -40, y: 0 },
  { x: -20, y: 0 },
];

const Square = [
  { x: 0, y: 0 },
  { x: 20, y: 0 },
  { x: 40, y: 0 },
  { x: 60, y: 0 },
  { x: 80, y: 0 },
  { x: 80, y: 20 },
  { x: 80, y: 40 },
  { x: 80, y: 60 },
  { x: 80, y: 80 },
  { x: 80, y: 100 },
  { x: 80, y: 120 },
  { x: 80, y: 140 },
  { x: 80, y: 160 },
  { x: 60, y: 160 },
  { x: 40, y: 160 },
  { x: 20, y: 160 },
  { x: 0, y: 160 },
  { x: -20, y: 160 },
  { x: -40, y: 160 },
  { x: -60, y: 160 },
  { x: -80, y: 160 },
  { x: -80, y: 140 },
  { x: -80, y: 120 },
  { x: -80, y: 100 },
  { x: -80, y: 80 },
  { x: -80, y: 60 },
  { x: -80, y: 40 },
  { x: -80, y: 20 },
  { x: -80, y: 0 },
  { x: -60, y: 0 },
  { x: -40, y: 0 },
  { x: -20, y: 0 },
];

const Coil = [
  { x: 10, y: -30 },
  { x: 25, y: -15 },
  { x: 40, y: -10 },
  { x: 55, y: -15 },
  { x: 70, y: -30 },
  { x: 85, y: -45 },
  { x: 90, y: -65 },
  { x: 85, y: -85 },
  { x: 70, y: -100 },
  { x: 55, y: -115 },
  { x: 40, y: -130 },
  { x: 20, y: -130 },
  { x: 0, y: -130 },
  { x: -20, y: -130 },
  { x: -35, y: -115 },
  { x: -50, y: -100 },
  { x: -65, y: -85 },
  { x: -80, y: -70 },
  { x: -80, y: -55 },
  { x: -80, y: -30 },
  { x: -80, y: -15 },
  { x: -80, y: 0 },
  { x: -65, y: 15 },
  { x: -50, y: 30 },
  { x: -35, y: 45 },
  { x: -20, y: 60 },
  { x: 0, y: 65 },
  { x: 20, y: 70 },
  { x: 40, y: 70 },
];

const Circle = [
  { x: 0, y: 0 },
  { x: 30, y: 6 },
  { x: 60, y: 20 },
  { x: 84, y: 36 },
  { x: 100, y: 60 },
  { x: 116, y: 90 },
  { x: 120, y: 120 },
  { x: 116, y: 150 },
  { x: 100, y: 180 },
  { x: 84, y: 200 },
  { x: 60, y: 220 },
  { x: 30, y: 236 },
  { x: 0, y: 240 },
  { x: -30, y: 236 },
  { x: -60, y: 220 },
  { x: -84, y: 200 },
  { x: -100, y: 180 },
  { x: -116, y: 150 },
  { x: -120, y: 120 },
  { x: -116, y: 90 },
  { x: -100, y: 60 },
  { x: -84, y: 36 },
  { x: -60, y: 20 },
  { x: -30, y: 6 },
];

// const LineHorizontal = [
//   { x: 0, y: 0 },
//   { x: 20, y: 0 },
//   { x: 40, y: 0 },
//   { x: 60, y: 0 },
//   { x: 80, y: 0 },
//   { x: 100, y: 0 },
//   { x: 120, y: 0 },
//   { x: 140, y: 0 },
//   { x: 160, y: 0 },
//   { x: 180, y: 0 },
//   { x: 200, y: 0 },
// ];

export const possibleShapes: PossibleShapes = [
  "Circle",
  "Rectangle",
  "Square",
  "Triangle",
];

export default { Triangle, Rectangle, Square, Circle };
