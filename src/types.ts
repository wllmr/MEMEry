import { memes } from "./assets/memes/memes";

export type Matrix = [
  [Box, Box, Box, Box, Box],
  [Box, Box, Box, Box, Box],
  [Box, Box, Box, Box, Box],
  [Box, Box, Box, Box, Box],
  [Box, Box, Box, Box, Box],
  [Box, Box, Box, Box, Box]
];
export type Box = [keyof typeof memes, string, isShown: boolean];
export type Coordinates = [x: number, y: number];

export function isBox(value: unknown): value is Box {
  if (!Array.isArray(value) || value.length !== 3) {
    return false;
  }

  const [key, str, bool] = value;

  if (typeof key !== "string" || !(key in memes)) {
    return false;
  }

  if (typeof str !== "string") {
    return false;
  }

  if (typeof bool !== "boolean") {
    return false;
  }

  return true;
}

export function isMatrix(value: unknown): value is Matrix {
  if (!Array.isArray(value) || value.length !== 6) {
    console.log("1");
    return false;
  }

  for (const row of value) {
    if (!Array.isArray(row) || row.length !== 5) {
      console.log("2");
      return false;
    }
    for (const box of row) {
      if (!isBox(box)) {
        console.log("3");
        return false;
      }
    }
  }

  return true;
}
