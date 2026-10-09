import Phaser from "phaser";

export class BaseScene extends Phaser.Scene {
  animals = [
    "cat",
    "dog",
    "cow",
    "sheep",
    "duck",
    "elephant",
    "tiger",
    "chicken",
    "rabbit",
    "monkey",
    "rat",
    "horse",
    "snake",
    "bear",
    "panda",
    "pig",
    "kangaroo",
    "crocodile",
    "koala",
    "gorilla",
  ];
  constructor(key: string) {
    super(key);
  }

  preload() {
    this.load.image("backcard", "assets/backcard.png");

    this.animals.forEach((a) => this.load.image(a, `assets/animals/${a}.png`));
  }
}
