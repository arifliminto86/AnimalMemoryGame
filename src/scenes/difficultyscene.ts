import Phaser from "phaser";
import { BACKGROUND_COLOR } from "../config/colorConfig";
export default class DifficultyScene extends Phaser.Scene {
  constructor() {
    super("DifficultyScene");
  }

  create() {
    const { width, height } = this.scale;

    this.cameras.main.setBackgroundColor(BACKGROUND_COLOR);

    this.add
      .text(width / 2, 100, "Choose Difficulty", {
        fontSize: "48px",
        color: "#ffffff",
        fontStyle: "bold",
        stroke: "#ff9f43",
        strokeThickness: 10,
        shadow: {
          color: "#ff7f50",
          blur: 0,
          fill: true,
          offsetX: 0,
          offsetY: 6,
        },
      })
      .setOrigin(0.5);

    const options: { label: string; pairCount: number }[] = [
      { label: "Easy (10)", pairCount: 10 },
      { label: "Medium (15)", pairCount: 15 },
      { label: "Hard (20)", pairCount: 20 },
    ];

    const spacing = 130;
    const startY = height / 2 - spacing;

    options.forEach((option, index) => {
      this.createDifficultyButton(
        width / 2,
        startY + index * spacing,
        option.label,
        option.pairCount,
      );
    });

    const aboutButton = this.add
      .text(width / 2, height - 80, "About", {
        fontSize: "22px",
        color: "#fffaf0",
        fontStyle: "bold",
        backgroundColor: "#7b5e57",
        padding: { x: 18, y: 10 },
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    aboutButton.on("pointerup", () => {
      this.scene.start("AboutScene", { returnScene: "DifficultyScene" });
    });

    const hint = this.add
      .text(width / 2, height - 40, "Best played in landscape mode", {
        fontSize: "18px",
        color: "#8a4d1f",
        fontStyle: "bold",
        backgroundColor: "#fff3c4",
        padding: { x: 16, y: 8 },
      })
      .setOrigin(0.5);

    hint.setDepth(10);
  }

  createDifficultyButton(
    x: number,
    y: number,
    label: string,
    pairCount: number,
  ) {
    const button = this.add.container(x, y);

    const buttonBg = this.add.graphics();
    buttonBg.fillStyle(0xff8f5a, 1);
    buttonBg.fillRoundedRect(-170, -45, 340, 90, 30);
    buttonBg.lineStyle(8, 0xffd166, 1);
    buttonBg.strokeRoundedRect(-170, -45, 340, 90, 30);

    const buttonText = this.add
      .text(0, 0, label, {
        fontSize: "32px",
        color: "#fffaf0",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    button.add([buttonBg, buttonText]);
    button.setSize(340, 90);
    button.setInteractive({ useHandCursor: true });

    button.on("pointerup", () => {
      this.scene.start("GameScene", { pairCount });
    });

    return button;
  }
}
