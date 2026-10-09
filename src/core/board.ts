import Card from "./card";
import CardFactory from "./cardfactory";
import Phaser from "phaser";

export default class Board {
  cards: Card[] = [];

  private topOffset: number = 170;
  private bottomMargin: number = 40;
  constructor(
    private scene: Phaser.Scene,
    private cardFactory: CardFactory,
    private maxCardSize: number = 90,
  ) {
    this.topOffset = 170;
    this.bottomMargin = 40;
  }

  createBoard(animals: string[]) {
    const deck = [...animals, ...animals].sort(() => Math.random() - 0.5);

    // Calculate the grid layout and card size based on the number of cards and available space
    const { cols, rows } = this.calculateGrid(deck.length);
    const gap = 12;
    const { width, height } = this.scene.scale;

    const cardSize = this.calculateCardSize(
      cols,
      rows,
      gap,
      width,
      height - this.topOffset - this.bottomMargin,
    );

    const startX =
      (width - (cols * cardSize + (cols - 1) * gap)) / 2 + cardSize / 2;
    const startY = this.topOffset + cardSize / 2;

    let index = 0;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (index >= deck.length) break;

        const x = startX + c * (cardSize + gap);
        const y = startY + r * (cardSize + gap);

        const card = this.cardFactory.create(
          x,
          y,
          deck[index],
          cardSize,
          () => {
            this.onCardClick(card);
          },
        );

        this.cards.push(card);
        index++;
      }
    }
  }

  /**
   * @description calculates the optimal number of columns and rows for the card grid based on the total number of cards. It ensures that the grid is as square as possible while respecting a maximum column limit.
   * @param cardCount
   * @returns
   */
  private calculateGrid(cardCount: number): { cols: number; rows: number } {
    if (cardCount === 20) {
      return { cols: 5, rows: 5 };
    }

    const maxCols = 8;
    const cols = Math.min(maxCols, Math.ceil(Math.sqrt(cardCount * 1.6)));
    const rows = Math.ceil(cardCount / cols);
    return { cols, rows };
  }

  /**
   * @description calculates the optimal card size based on the number of columns, rows, gap between cards, and available width and height of the board.
   * It ensures that the card size does not exceed the maximum or minimum allowed sizes.
   * @param cols
   * @param rows
   * @param gap
   * @param availableWidth
   * @param availableHeight
   * @returns
   */
  private calculateCardSize(
    cols: number,
    rows: number,
    gap: number,
    availableWidth: number,
    availableHeight: number,
  ): number {
    const maxCardSize = this.maxCardSize;
    const minCardSize = 40;

    const widthPerCard = (availableWidth - (cols - 1) * gap) / cols;
    const heightPerCard = (availableHeight - (rows - 1) * gap) / rows;

    const cardSize = Math.min(widthPerCard, heightPerCard, maxCardSize);
    return Math.max(minCardSize, Math.floor(cardSize));
  }

  onCardClick: (card: Card) => void = () => {};
}
