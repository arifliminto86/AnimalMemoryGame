import Phaser from "phaser";
import { BACKGROUND_COLOR } from "../config/colorConfig";

export default class AboutScene extends Phaser.Scene {
  private returnScene: string = "SplashScene";

  constructor() {
    super("AboutScene");
  }

  init(data: { returnScene?: string }) {
    if (data?.returnScene) {
      this.returnScene = data.returnScene;
    }
  }

  create() {
    const { width, height } = this.scale;
    this.cameras.main.setBackgroundColor(BACKGROUND_COLOR);

    this.add
      .text(width / 2, 90, "About the Game", {
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

    const description = [
      "🐾 Animal Memory is a matching game where you flip cards and find pairs.",
      "Choose a difficulty, uncover the animal tiles, and beat the board.",
      "Each matched pair brings you closer to a perfect memory run.",
    ].join("\n");

    this.add
      .text(width / 2, height / 2 - 100, description, {
        fontSize: "26px",
        color: "#3d2c22",
        fontStyle: "bold",
        align: "center",
        lineSpacing: 8,
        wordWrap: { width: width * 0.72 },
      })
      .setOrigin(0.5);

    this.createBackButton(width / 2, height - 250);

    this.add
      .text(width / 2, height - 150, "Developed by A Liminto", {
        fontSize: "20px",
        color: "#3d2c22",
        fontStyle: "bold",
      })
      .setOrigin(0.5);
  }

  private createBackButton(x: number, y: number) {
    const backButton = this.add.container(x, y);

    const buttonBg = this.add.graphics();
    buttonBg.fillStyle(0xff8f5a, 1);
    buttonBg.fillRoundedRect(-170, -40, 340, 80, 25);
    buttonBg.lineStyle(8, 0xffd166, 1);
    buttonBg.strokeRoundedRect(-170, -40, 340, 80, 25);

    const buttonText = this.add
      .text(0, 0, "Back", {
        fontSize: "30px",
        color: "#fffaf0",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    backButton.add([buttonBg, buttonText]);
    backButton.setSize(340, 80);
    backButton.setInteractive({ useHandCursor: true });

    backButton.on("pointerup", () => {
      this.scene.start(this.returnScene);
    });
  }
}
