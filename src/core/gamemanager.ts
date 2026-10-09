import Card from "./card";
export default class GameManager {
  private first: Card | null = null;
  private second: Card | null = null;
  private canClick = true;

  playerTurn = 1;
  player1Score = 0;
  player2Score = 0;

  constructor(
    private totalPairs: number,
    private onUpdateUI: () => void,
    private onGameOver: (winner: string) => void,
  ) {}

  handleCardClick(card: Card) {
    if (!this.canClick || card.flipped || card.matched) return;

    card.flip();

    if (!this.first) {
      this.first = card;
      return;
    }

    this.second = card;
    this.canClick = false;

    setTimeout(() => this.checkMatch(), 800);
  }

  private checkMatch() {
    if (!this.first || !this.second) return;

    if (this.first.animal === this.second.animal) {
      this.first.markMatched();
      this.second.markMatched();

      if (this.playerTurn === 1) this.player1Score++;
      else this.player2Score++;
    } else {
      this.first.flipBack();
      this.second.flipBack();
      this.playerTurn = this.playerTurn === 1 ? 2 : 1;
    }

    this.first = null;
    this.second = null;
    this.canClick = true;

    this.onUpdateUI();
    this.checkGameOver();
  }

  private checkGameOver() {
    if (this.player1Score + this.player2Score < this.totalPairs) return;

    const winner =
      this.player1Score > this.player2Score
        ? "Player 1"
        : this.player2Score > this.player1Score
          ? "Player 2"
          : "Tie";

    this.onGameOver(winner);
  }
}
