import Phaser from "phaser";
import { ACTIVE, IDLE } from "../config/colorConfig";

const restartButtonYPosition = 70;
const playerYPosition = 65; // Y position for both players' UI elements
const player1XPosition = 120; // Adjusted X position for Player 1's UI elements
const player2XPosition = 800; // Adjusted X position for Player 2's UI elements

export default class TurnUI {
  private p1Bg!: Phaser.GameObjects.Rectangle;
  private p2Bg!: Phaser.GameObjects.Rectangle;
  private p1Score!: Phaser.GameObjects.Text;
  private p2Score!: Phaser.GameObjects.Text;
  private p1Tag!: Phaser.GameObjects.Text;
  private p2Tag!: Phaser.GameObjects.Text;

  private tweenP1!: Phaser.Tweens.Tween;
  private tweenP2!: Phaser.Tweens.Tween;

  constructor(private scene: Phaser.Scene) {}

  create(onRestart: () => void, onBackToMenu: () => void) {
    this.createScoreboard();
    this.createAnimationWhenTurnChanges();
    this.createRestartButton(onRestart);
    this.createBackToMenuButton(onBackToMenu);
  }

  /**
   * @description Create restart button at the bottom of the scene.
   */
  private createRestartButton(onRestart: () => void) {
    const restartBg = this.scene.add
      .rectangle(350, restartButtonYPosition, 180, 50, 0x333333)
      .setOrigin(0.5)
      .setInteractive();
    this.scene.add
      .text(350, restartButtonYPosition, "RESTART", {
        fontSize: "20px",
        color: "#fff",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    restartBg.on("pointerdown", onRestart);
    restartBg.on("pointerover", () => restartBg.setFillStyle(0x555555));
    restartBg.on("pointerout", () => restartBg.setFillStyle(0x333333));
  }

  /**
   * @description Create back-to-menu button at the bottom of the scene.
   */
  private createBackToMenuButton(onBackToMenu: () => void) {
    const menuBg = this.scene.add
      .rectangle(560, restartButtonYPosition, 180, 50, 0x333333)
      .setOrigin(0.5)
      .setInteractive();
    this.scene.add
      .text(560, restartButtonYPosition, "MENU", {
        fontSize: "20px",
        color: "#fff",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    menuBg.on("pointerdown", onBackToMenu);
    menuBg.on("pointerover", () => menuBg.setFillStyle(0x555555));
    menuBg.on("pointerout", () => menuBg.setFillStyle(0x333333));
  }

  private createAnimationWhenTurnChanges() {
    // Pulse animation for player 1
    this.tweenP1 = this.scene.tweens.add({
      targets: this.p1Bg,
      scale: { from: 1, to: 1.25 },
      duration: 600,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
      pause: true, // Start paused; will be resumed when it's player 1's turn
    });

    // Pulse animation for player 2
    this.tweenP2 = this.scene.tweens.add({
      targets: this.p2Bg,
      scale: { from: 1, to: 1.25 },
      duration: 600,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
      pause: true, // Start paused; will be resumed when it's player 2's turn
    });
  }

  /**
   * @description create score board for both players on the top of the scene.
   */
  private createScoreboard() {
    this.p1Bg = this.scene.add
      .rectangle(player1XPosition, playerYPosition, 200, 100, IDLE)
      .setOrigin(0.5);
    this.scene.add
      .text(player1XPosition, 30, "PLAYER 1", {
        fontSize: "18px",
        color: "#fff",
        fontStyle: "bold",
      })
      .setOrigin(0.5);
    this.p1Score = this.scene.add
      .text(player1XPosition, playerYPosition, "0", {
        fontSize: "30px",
        color: "#fff",
        fontStyle: "bold",
      })
      .setOrigin(0.5);
    this.p1Tag = this.scene.add
      .text(player1XPosition, 100, "YOUR TURN", {
        fontSize: "13px",
        color: "#111",
        fontStyle: "bold",
      })
      .setOrigin(0.5)
      .setVisible(false);

    this.p2Bg = this.scene.add
      .rectangle(player2XPosition, playerYPosition, 200, 100, IDLE)
      .setOrigin(0.5);
    this.scene.add
      .text(player2XPosition, 30, "PLAYER 2", {
        fontSize: "18px",
        color: "#fff",
        fontStyle: "bold",
      })
      .setOrigin(0.5);
    this.p2Score = this.scene.add
      .text(player2XPosition, playerYPosition, "0", {
        fontSize: "30px",
        color: "#fff",
        fontStyle: "bold",
      })
      .setOrigin(0.5);
    this.p2Tag = this.scene.add
      .text(player2XPosition, 100, "YOUR TURN", {
        fontSize: "13px",
        color: "#111",
        fontStyle: "bold",
      })
      .setOrigin(0.5)
      .setVisible(false);
  }

  update(turn: number, p1: number, p2: number) {
    this.p1Score.setText(`${p1}`);
    this.p2Score.setText(`${p2}`);

    if (turn === 1) {
      this.p1Bg.setFillStyle(ACTIVE);
      this.p1Tag.setVisible(true);
      this.tweenP1.resume();

      this.p2Bg.setFillStyle(IDLE);
      this.p2Tag.setVisible(false);
      this.tweenP2.pause();
    } else if (turn === 2) {
      this.p2Bg.setFillStyle(ACTIVE);
      this.p2Tag.setVisible(true);
      this.tweenP2.resume();

      this.p1Bg.setFillStyle(IDLE);
      this.p1Tag.setVisible(false);
      this.tweenP1.pause();
    }
  }

  showGameOver(
    winner: string,
    onRestart: () => void,
    onBackToMenu: () => void,
  ) {
    // dim overlay
    this.scene.add.rectangle(420, 420, 860, 860, 0x000000, 0.6).setOrigin(0.5);

    this.scene.add
      .text(420, 360, winner === "Tie" ? "It's a Tie!" : `${winner} Wins!`, {
        fontSize: "52px",
        color: "#ffffff",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    // restart button background
    const btnBg = this.scene.add
      .rectangle(420, 460, 220, 60, 0xe8a020)
      .setOrigin(0.5)
      .setInteractive();
    this.scene.add
      .text(420, 460, "PLAY AGAIN", {
        fontSize: "24px",
        color: "#111",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    btnBg.on("pointerdown", onRestart);
    btnBg.on("pointerover", () => btnBg.setFillStyle(0xffbf40));
    btnBg.on("pointerout", () => btnBg.setFillStyle(0xe8a020));

    // back-to-menu button background
    const menuBtnBg = this.scene.add
      .rectangle(420, 540, 220, 60, 0x333333)
      .setOrigin(0.5)
      .setInteractive();
    this.scene.add
      .text(420, 540, "BACK TO MENU", {
        fontSize: "22px",
        color: "#fff",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    menuBtnBg.on("pointerdown", onBackToMenu);
    menuBtnBg.on("pointerover", () => menuBtnBg.setFillStyle(0x555555));
    menuBtnBg.on("pointerout", () => menuBtnBg.setFillStyle(0x333333));
  }
}
