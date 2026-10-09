import GameManager from "../core/gamemanager";
import TurnUI from "../ui/turnui";
import { BaseScene } from "./basescene";
import Board from "../core/board";
import CardFactory from "../core/cardfactory";
import { BACKGROUND_COLOR } from "../config/colorConfig";

export default class GameScene extends BaseScene {
  private board!: Board;
  private manager!: GameManager;
  private ui!: TurnUI;
  private pairCount = 20;

  constructor() {
    super("GameScene");
  }

  preload() {
    super.preload();
  }

  init(data: { pairCount: number }) {
    if (data.pairCount) {
      this.pairCount = data.pairCount;
    } else {
      this.pairCount = this.animals.length;
    }
  }

  create() {
    this.cameras.main.setBackgroundColor(BACKGROUND_COLOR);
    const animals = this.animals.slice(0, this.pairCount);

    const factory = new CardFactory(this);
    const cardSize = this.setCardSize(animals.length);
    this.board = new Board(this, factory, cardSize);

    this.manager = new GameManager(
      animals.length,
      () =>
        this.ui.update(
          this.manager.playerTurn,
          this.manager.player1Score,
          this.manager.player2Score,
        ),
      (winner) =>
        this.ui.showGameOver(
          winner,
          () => this.scene.restart(),
          () => this.scene.start("SplashScene"),
        ),
    );

    this.board.onCardClick = (card) => this.manager.handleCardClick(card);

    this.board.createBoard(animals);

    this.ui = new TurnUI(this);
    this.ui.create(
      () => this.scene.restart(), //function implementation for restart button
      () => this.scene.start("SplashScene"), //function implementation for back to menu button
    );
    this.ui.update(1, 0, 0);
  }

  /**
   * Set Card size based on the number of pairs and available space
   * @param pairCount
   */
  setCardSize(pairCount: number): number {
    if (pairCount <= 10) {
      return 250;
    } else if (pairCount <= 15) {
      return 120;
    } else {
      return 90;
    }
  }
}
