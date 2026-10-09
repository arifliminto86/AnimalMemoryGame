import Phaser from "phaser";
import { config } from "./config/config";

const win = window as any;
if (!win.__phaserGame) {
  win.__phaserGame = new Phaser.Game(config);
}
