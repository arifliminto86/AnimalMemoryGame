import Phaser from "phaser";
import AboutScene from "../scenes/aboutscene";
import GameScene from "../scenes/gamescene";
import SplashScene from "../scenes/splashscene";
import DifficultyScene from "../scenes/difficultyscene";

export const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "game-container",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [SplashScene, DifficultyScene, GameScene, AboutScene],
};
