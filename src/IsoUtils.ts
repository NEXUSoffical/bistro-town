export interface GridCoord {
  col: number;
  row: number;
}

export interface ScreenCoord {
  x: number;
  y: number;
}

/**
 * Standard 2:1 Isometric Projection Math
 * Tile Width = 64px, Tile Height = 32px
 */
export class IsoUtils {
  static readonly TILE_WIDTH = 84;
  static readonly TILE_HEIGHT = 42;

  /**
   * Converts grid (col, row) coordinates to screen (x, y) coordinates.
   */
  static gridToScreen(col: number, row: number, originX: number, originY: number): ScreenCoord {
    return {
      x: originX + (col - row) * (this.TILE_WIDTH / 2),
      y: originY + (col + row) * (this.TILE_HEIGHT / 2)
    };
  }

  /**
   * Converts screen (x, y) coordinates back to grid (col, row).
   */
  static screenToGrid(screenX: number, screenY: number, originX: number, originY: number): GridCoord {
    const dx = screenX - originX;
    const dy = screenY - originY;
    const col = Math.floor((dx / (this.TILE_WIDTH / 2) + dy / (this.TILE_HEIGHT / 2)) / 2);
    const row = Math.floor((dy / (this.TILE_HEIGHT / 2) - dx / (this.TILE_WIDTH / 2)) / 2);
    return { col, row };
  }

  /**
   * Depth sorting key: objects further down/right on the grid are rendered in front.
   */
  static getDepth(col: number, row: number, layerOffset = 0): number {
    return (col + row) * 100 + layerOffset;
  }
}
