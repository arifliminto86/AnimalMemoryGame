import Phaser from "phaser";
import { BACKGROUND_COLOR } from "../config/colorConfig";

export default class SplashScene extends Phaser.Scene {
  buttonFontSize: number = 34;
  buttonColorText = "#fffaf0";

  constructor() {
    super("SplashScene");
  }

  create() {
    const { width, height } = this.scale;
    this.cameras.main.setBackgroundColor(BACKGROUND_COLOR);

    this.addTitle(width);
    this.addButtons(width, height);
    this.addHint(width, height);
    // playful floating animal accents
    this.addFloatingAnimals(width, height);
  }

  private addTitle(width: number) {
    this.add
      .text(width / 2, 120, "🐻  Animal", {
        fontSize: "52px",
        color: "#ffffff",
        fontStyle: "bold",
        stroke: "#ff9f43",
        strokeThickness: 10,
        shadow: this.createTextShadow(),
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, 185, "Memory Game  🐶", {
        fontSize: "52px",
        color: "#ffffff",
        fontStyle: "bold",
        stroke: "#ff9f43",
        strokeThickness: 10,
        shadow: this.createTextShadow(),
      })
      .setOrigin(0.5);
  }

  private createTextShadow() {
    return {
      color: "#ff7f50",
      blur: 0,
      fill: true,
      offsetX: 0,
      offsetY: 6,
    };
  }

  private addButtons(width: number, height: number) {
    // Add "Difficulty" button
    this.addButton(width / 2, height / 2 + 80, "Start", () => {
      this.scene.start("DifficultyScene");
    });

    // Add "About" button
    this.addButton(width / 2, height / 2 + 190, "About", () => {
      this.scene.start("AboutScene", { returnScene: "SplashScene" });
    });
  }

  private addButton(x: number, y: number, text: string, onClick: () => void) {
    const button = this.add.container(x, y);

    const buttonBg = this.add.graphics();
    buttonBg.fillStyle(text === "Start" ? 0xff8f5a : 0x7b5e57, 1);
    buttonBg.fillRoundedRect(-170, -45, 340, 90, 30);
    buttonBg.lineStyle(8, text === "Start" ? 0xffd166 : 0xf7d7a6, 1);
    buttonBg.strokeRoundedRect(-170, -45, 340, 90, 30);

    const buttonText = this.createTextButton(text);
    button.add([buttonBg, buttonText]);
    button.setSize(340, 90);
    button.setInteractive({ useHandCursor: true });
    button.on("pointerup", onClick);

    return button;
  }

  private createTextButton(text: string): Phaser.GameObjects.Text {
    return this.add
      .text(0, 0, text, {
        fontSize: `${this.buttonFontSize}px`,
        color: this.buttonColorText,
        fontStyle: "bold",
      })
      .setOrigin(0.5);
  }

  private addHint(width: number, height: number) {
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

  /**
   * @description Adds floating animal emojis to the scene for visual appeal.
   * @param width
   * @param height
   */
  private addFloatingAnimals(width: number, height: number) {
    this.addFloatingAnimal(width * 0.18, height * 0.26, "🐼");
    this.addFloatingAnimal(width * 0.8, height * 0.22, "🐰");
    this.addFloatingAnimal(width * 0.24, height * 0.7, "🦊");
    this.addFloatingAnimal(width * 0.78, height * 0.7, "🐸");
  }

  addFloatingAnimal(x: number, y: number, animal: string) {
    const floatingAnimal = this.add
      .text(x, y, animal, { fontSize: "48px" })
      .setOrigin(0.5);

    //can we add a floating animation to the animal emojis to make them float up and down?
    this.tweens.add({
      targets: floatingAnimal,
      y: y - 20,
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
  }
}
