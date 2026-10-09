import Phaser from "phaser";

export default class Card {
  sprite: Phaser.GameObjects.Image;
  animal: string;
  flipped: boolean = false;
  matched: boolean = false;
  scene: Phaser.Scene;
  private size: number;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    animal: string,
    size: number,
    onClick: () => void,
  ) {
    this.animal = animal;
    this.scene = scene;
    this.size = size;
    this.sprite = this.scene.add
      .image(x, y, "backcard")
      .setInteractive()
      .setDisplaySize(size, size);

    this.sprite.on("pointerdown", () => {
      if (!this.flipped && !this.matched) {
        onClick();
      }
    });
  }

  flip() {
    this.flipped = true;
    if (this.sprite && !this.sprite.isDestroyed) {
      this.sprite.setTexture(this.animal).setDisplaySize(this.size, this.size);
    }
  }

  flipBack() {
    this.flipped = false;

    if (this.sprite && !this.sprite.isDestroyed) {
      this.sprite.setTexture("backcard").setDisplaySize(this.size, this.size);
    }
  }

  markMatched() {
    this.matched = true;
    this.scene.tweens.add({
      targets: this.sprite,
      scale: 1.2,
      duration: 300,
      yoyo: true,
      ease: "Back.easeOut",
      onComplete: () => {},
    });
  }
}
