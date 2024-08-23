import { memes } from "./assets/memes/memes";
import { Box, Coordinates, Matrix, isMatrix } from "./types";

export class GameOfMEMEry {
  private matrix: Matrix;
  private time: number = 0;
  private picks: Coordinates[] = [];

  constructor() {
    this.matrix = this.generateMatrix();
  }

  private generateMatrix(): Matrix {
    let images = [...Object.entries(memes), ...Object.entries(memes)].map(
      (box) => [...box, false] as Box
    );
    for (let i = images.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [images[i], images[j]] = [images[j], images[i]];
    }

    const matrix: Partial<Matrix> = [];
    for (let i = 0; i < images.length; i += 5) {
      const chunk = images.slice(i, i + 5) as Matrix[number];
      matrix.push(chunk);
    }

    if (!isMatrix(matrix)) {
      throw new Error(
        "Matrix is invalid \n" + JSON.stringify(matrix, undefined, 2)
      );
    }

    return matrix;
  }

  /**
   * Play field
   */
  public get getMatrix(): Matrix {
    return this.matrix;
  }

  public get getPicks(): Coordinates[] {
    return this.picks;
  }

  /**
   * Game controls
   */
  public play(): void {}

  public pause(): void {}

  public reset(): void {}

  /**
   * Game actions
   */
  public pick(coord: Coordinates) {
    if (this.picks.length > 1) {
      return;
    }

    this.picks = [...this.picks, coord];

    if (this.picks.length === 2) {
      this.evaluatePicks();
    }
  }

  private async evaluatePicks() {
    // Pause for effect
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const pick1 = this.matrix[this.picks[0][0]][this.picks[0][1]];
    const pick2 = this.matrix[this.picks[1][0]][this.picks[0][1]];
  }
}
