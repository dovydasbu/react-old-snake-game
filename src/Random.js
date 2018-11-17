import { areaParams } from "./components/PlayingArea";
import { squareSize } from "./components/Snake";

export function getRandomWidth() {
  return getRandomInt(1, (areaParams.width / squareSize) - 1) * 20;
}

export function getRandomHeight() {
  return getRandomInt(1, (areaParams.height / squareSize) - 1) * 20;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}