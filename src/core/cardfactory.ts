import Card from "./card";
import Phaser from "phaser";

export default class CardFactory {
  constructor(private scene: Phaser.Scene) {}

  create(
    x: number,
    y: number,
    animal: string,
    size: number,
    onClick: () => void,
  ) {
    return new Card(this.scene, x, y, animal, size, onClick);
  }
}
