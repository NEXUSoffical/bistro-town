import { GridCoord } from './IsoUtils';

export interface PathNode {
  col: number;
  row: number;
  g: number;
  h: number;
  f: number;
  parent?: PathNode;
}

export class Pathfinding {
  /**
   * Finds shortest path from start to target avoiding blocked tiles using A*
   */
  static findPath(
    start: GridCoord,
    target: GridCoord,
    isWalkable: (col: number, row: number) => boolean,
    gridSize: number
  ): GridCoord[] {
    if (start.col === target.col && start.row === target.row) return [];
    if (!isWalkable(target.col, target.row)) {
      // Find adjacent walkable tile if target is an interactive object (like stove/chair)
      const neighbors = this.getNeighbors(target, gridSize, isWalkable);
      if (neighbors.length === 0) return [];
      // Pick the neighbor closest to start
      target = neighbors.sort((a, b) => 
        (Math.abs(a.col - start.col) + Math.abs(a.row - start.row)) - 
        (Math.abs(b.col - start.col) + Math.abs(b.row - start.row))
      )[0];
    }

    const openList: PathNode[] = [];
    const closedSet = new Set<string>();

    const startNode: PathNode = {
      col: start.col,
      row: start.row,
      g: 0,
      h: this.heuristic(start, target),
      f: this.heuristic(start, target)
    };
    openList.push(startNode);

    while (openList.length > 0) {
      // Node with lowest f score
      openList.sort((a, b) => a.f - b.f);
      const current = openList.shift()!;

      if (current.col === target.col && current.row === target.row) {
        // Reconstruct path
        const path: GridCoord[] = [];
        let curr: PathNode | undefined = current;
        while (curr) {
          path.unshift({ col: curr.col, row: curr.row });
          curr = curr.parent;
        }
        // Exclude starting tile
        path.shift();
        return path;
      }

      closedSet.add(`${current.col},${current.row}`);

      const neighbors = [
        { col: current.col + 1, row: current.row },
        { col: current.col - 1, row: current.row },
        { col: current.col, row: current.row + 1 },
        { col: current.col, row: current.row - 1 }
      ];

      for (const n of neighbors) {
        if (n.col < 0 || n.row < 0 || n.col >= gridSize || n.row >= gridSize) continue;
        if (!isWalkable(n.col, n.row) && !(n.col === target.col && n.row === target.row)) continue;
        if (closedSet.has(`${n.col},${n.row}`)) continue;

        const g = current.g + 1;
        const h = this.heuristic(n, target);
        const f = g + h;

        const existing = openList.find(o => o.col === n.col && o.row === n.row);
        if (existing) {
          if (g < existing.g) {
            existing.g = g;
            existing.f = f;
            existing.parent = current;
          }
        } else {
          openList.push({ col: n.col, row: n.row, g, h, f, parent: current });
        }
      }
    }

    return []; // No path found
  }

  private static heuristic(a: GridCoord, b: GridCoord): number {
    return Math.abs(a.col - b.col) + Math.abs(a.row - b.row);
  }

  private static getNeighbors(pos: GridCoord, gridSize: number, isWalkable: (c: number, r: number) => boolean): GridCoord[] {
    const coords = [
      { col: pos.col + 1, row: pos.row },
      { col: pos.col - 1, row: pos.row },
      { col: pos.col, row: pos.row + 1 },
      { col: pos.col, row: pos.row - 1 }
    ];
    return coords.filter(c => c.col >= 0 && c.row >= 0 && c.col < gridSize && c.row < gridSize && isWalkable(c.col, c.row));
  }
}
