import { IsoUtils } from './IsoUtils';

interface Cloud {
  x: number;
  y: number;
  scale: number;
  speed: number;
}

interface Pedestrian {
  progress: number;
  speed: number;
  dir: 1 | -1;
  street: 'nw' | 'ne';
  outfit: string;
  hair: string;
  hasHat?: boolean;
  hasDog?: boolean;
}

/**
 * CityEnvironment renders a charming European city street BEHIND the restaurant:
 * - Sunny sky with drifting clouds, warm sun, and distant birds
 * - Panoramic distant city skyline on the horizon
 * - City street and sidewalk located ON THE OTHER SIDE (behind the back walls)
 *   so the player can see the city street through the windows and behind the bistro
 * - Pedestrians, Victorian streetlamps, and Parisian trees strolling along the back street
 * - NO moving cars (as requested)
 * - The front and sides are 100% CLEAR so the restaurant has all the space it needs to upgrade!
 */
export class CityEnvironment {
  private clouds: Cloud[] = [];
  private pedestrians: Pedestrian[] = [];
  private birdsX = -50;
  private animTimer = 0;

  constructor() {
    this.initClouds();
    this.initPedestrians();
  }

  private initClouds() {
    this.clouds = [
      { x: 50, y: 35, scale: 1.1, speed: 10 },
      { x: 380, y: 70, scale: 0.85, speed: 7 },
      { x: 740, y: 30, scale: 1.25, speed: 12 },
      { x: 1120, y: 65, scale: 0.95, speed: 9 },
      { x: 1500, y: 45, scale: 1.15, speed: 11 },
      { x: 1840, y: 80, scale: 0.8, speed: 6 },
    ];
  }

  private initPedestrians() {
    this.pedestrians = [
      { progress: 0.2, speed: 0.04, dir: 1, street: 'nw', outfit: '#3a86ff', hair: '#f4a261', hasHat: true, hasDog: true },
      { progress: 0.7, speed: 0.035, dir: -1, street: 'nw', outfit: '#ec4899', hair: '#1f2937' },
      { progress: 0.35, speed: 0.038, dir: 1, street: 'ne', outfit: '#10b981', hair: '#d97706' },
      { progress: 0.8, speed: 0.032, dir: -1, street: 'ne', outfit: '#8b5cf6', hair: '#fde047', hasHat: true },
    ];
  }

  update(dt: number, canvasWidth: number) {
    this.animTimer += dt;

    // Drifting clouds
    for (const c of this.clouds) {
      c.x += c.speed * dt;
      if (c.x > canvasWidth + 180) {
        c.x = -180;
      }
    }

    // Distant birds
    this.birdsX += 20 * dt;
    if (this.birdsX > canvasWidth + 120) {
      this.birdsX = -120;
    }

    // Pedestrians strolling along the back street
    for (const p of this.pedestrians) {
      p.progress += p.dir * p.speed * dt;
      if (p.progress > 0.95) {
        p.progress = 0.95;
        p.dir = -1;
      } else if (p.progress < 0.05) {
        p.progress = 0.05;
        p.dir = 1;
      }
    }
  }

  /**
   * 1. Draw Pristine Sky, Radiant Sun, Fluffy Clouds, Birds, and Distant Horizon Skyline.
   */
  drawSkyAndBackground(ctx: CanvasRenderingContext2D, width: number, height: number, originX: number, originY: number) {
    ctx.save();

    // A. Sky Gradient: Bright warm cerulean to sunny horizon glow
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.65);
    skyGrad.addColorStop(0, '#38bdf8');    // Clear azure
    skyGrad.addColorStop(0.4, '#7dd3fc'); // Gentle daylight blue
    skyGrad.addColorStop(0.75, '#bae6fd'); // Atmospheric mist
    skyGrad.addColorStop(1, '#ffedd5');   // Warm golden city sunlight
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // B. Radiant Golden Sun
    const sunX = width * 0.82;
    const sunY = Math.max(45, originY - 240);
    const sunGrad = ctx.createRadialGradient(sunX, sunY, 10, sunX, sunY, 140);
    sunGrad.addColorStop(0, 'rgba(254, 240, 138, 0.9)');
    sunGrad.addColorStop(0.3, 'rgba(253, 224, 71, 0.3)');
    sunGrad.addColorStop(1, 'rgba(253, 224, 71, 0)');
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(sunX, sunY, 140, 0, Math.PI * 2);
    ctx.fill();

    // C. Gentle Distant Birds soaring in V-formation
    ctx.strokeStyle = 'rgba(71, 85, 105, 0.45)';
    ctx.lineWidth = 1.8;
    for (let b = 0; b < 4; b++) {
      const bx = this.birdsX + b * 20;
      const by = 60 + b * 8 + Math.sin(this.animTimer * 2 + b) * 3;
      ctx.beginPath();
      ctx.moveTo(bx - 6, by + 3);
      ctx.quadraticCurveTo(bx - 2, by - 3, bx, by);
      ctx.quadraticCurveTo(bx + 2, by - 3, bx + 6, by + 3);
      ctx.stroke();
    }

    // D. Soft Drifting Clouds
    for (const c of this.clouds) {
      this.drawCloud(ctx, c.x, c.y, c.scale);
    }

    // E. Panoramic Distant City Skyline on Horizon (behind the back street)
    const horizonY = Math.max(originY - 40, 120);
    this.drawDistantSkyline(ctx, width, horizonY, originX);

    ctx.restore();
  }

  private drawCloud(ctx: CanvasRenderingContext2D, x: number, y: number, scale: number) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);

    // Subtle cloud shadow
    ctx.fillStyle = 'rgba(203, 213, 225, 0.35)';
    ctx.beginPath();
    ctx.arc(-20, 6, 18, 0, Math.PI * 2);
    ctx.arc(0, 8, 24, 0, Math.PI * 2);
    ctx.arc(24, 6, 16, 0, Math.PI * 2);
    ctx.fill();

    // White cloud body
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(-20, 0, 16, 0, Math.PI * 2);
    ctx.arc(-8, -10, 20, 0, Math.PI * 2);
    ctx.arc(12, -8, 18, 0, Math.PI * 2);
    ctx.arc(26, 2, 14, 0, Math.PI * 2);
    ctx.arc(4, 4, 20, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  private drawDistantSkyline(ctx: CanvasRenderingContext2D, width: number, horizonY: number, _originX: number) {
    ctx.save();

    // 1. Far Distance Skyline Silhouette (misty lavender haze)
    ctx.fillStyle = 'rgba(148, 163, 184, 0.35)';
    let sx = -40;
    while (sx < width + 60) {
      const bW = 50 + (Math.sin(sx * 0.07) * 22 + 22);
      const bH = 75 + (Math.cos(sx * 0.05) * 35 + 35);
      const bY = horizonY - bH;
      ctx.fillRect(sx, bY, bW, bH + 20);

      const mod = Math.abs(Math.floor(sx / 85)) % 4;
      if (mod === 0) {
        ctx.beginPath();
        ctx.moveTo(sx + bW / 2, bY - 32);
        ctx.lineTo(sx + bW * 0.25, bY);
        ctx.lineTo(sx + bW * 0.75, bY);
        ctx.closePath();
        ctx.fill();
        ctx.fillRect(sx + bW / 2 - 1.5, bY - 40, 3, 10);
      } else if (mod === 2) {
        ctx.beginPath();
        ctx.arc(sx + bW / 2, bY, bW * 0.32, Math.PI, 0);
        ctx.fill();
      }

      sx += bW + 8;
    }

    // 2. Mid Distance European Mansard Roofs (soft slate)
    ctx.fillStyle = 'rgba(100, 116, 139, 0.45)';
    sx = -20;
    while (sx < width + 40) {
      const bW = 65 + (Math.cos(sx * 0.1) * 20 + 20);
      const bH = 50 + (Math.sin(sx * 0.08) * 25 + 25);
      const bY = horizonY - bH;
      ctx.fillRect(sx, bY, bW, bH + 20);

      ctx.beginPath();
      ctx.moveTo(sx - 4, bY);
      ctx.lineTo(sx + 10, bY - 18);
      ctx.lineTo(sx + bW - 10, bY - 18);
      ctx.lineTo(sx + bW + 4, bY);
      ctx.closePath();
      ctx.fill();

      ctx.fillRect(sx + 12, bY - 26, 6, 10);
      sx += bW + 12;
    }

    // 3. Boulevard Tree Canopy
    ctx.fillStyle = 'rgba(74, 222, 128, 0.55)';
    for (let tx = -30; tx < width + 50; tx += 48) {
      const treeR = 22 + (Math.sin(tx * 0.1) * 6 + 6);
      const treeY = horizonY + 8;
      ctx.beginPath();
      ctx.arc(tx, treeY, treeR, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  /**
   * 2. Draw City Street & Sidewalk on the OTHER SIDE (behind the restaurant walls).
   * Runs outside Northwest wall (col = -1..-3) and Northeast wall (row = -1..-3).
   * Drawn strictly behind walls at depth -150.
   */
  drawBackStreet(ctx: CanvasRenderingContext2D, originX: number, originY: number, gridSize: number) {
    ctx.save();
    const halfW = IsoUtils.TILE_WIDTH / 2;
    const halfH = IsoUtils.TILE_HEIGHT / 2;

    // A. Sidewalk along the back Northwest wall (col = -1, row = -1..gridSize + 2)
    // and back Northeast wall (row = -1, col = -1..gridSize + 2)
    for (let r = -2; r <= gridSize + 2; r++) {
      for (let c = -3; c <= -1; c++) {
        const pt = IsoUtils.gridToScreen(c, r, originX, originY);
        const isSidewalk = c === -1;

        ctx.beginPath();
        ctx.moveTo(pt.x, pt.y);
        ctx.lineTo(pt.x + halfW, pt.y + halfH);
        ctx.lineTo(pt.x, pt.y + IsoUtils.TILE_HEIGHT);
        ctx.lineTo(pt.x - halfW, pt.y + halfH);
        ctx.closePath();

        if (isSidewalk) {
          // Cobblestone limestone pavers
          ctx.fillStyle = (c + r) % 2 === 0 ? '#cbd5e1' : '#e2e8f0';
          ctx.fill();
          ctx.strokeStyle = 'rgba(148, 163, 184, 0.35)';
          ctx.lineWidth = 1;
          ctx.stroke();
        } else {
          // Cobblestone avenue street
          ctx.fillStyle = (c + r) % 2 === 0 ? '#64748b' : '#475569';
          ctx.fill();
          ctx.strokeStyle = 'rgba(30, 41, 59, 0.4)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    for (let c = -2; c <= gridSize + 2; c++) {
      for (let r = -3; r <= -1; r++) {
        if (c < 0 && r < 0) continue; // already drawn above
        const pt = IsoUtils.gridToScreen(c, r, originX, originY);
        const isSidewalk = r === -1;

        ctx.beginPath();
        ctx.moveTo(pt.x, pt.y);
        ctx.lineTo(pt.x + halfW, pt.y + halfH);
        ctx.lineTo(pt.x, pt.y + IsoUtils.TILE_HEIGHT);
        ctx.lineTo(pt.x - halfW, pt.y + halfH);
        ctx.closePath();

        if (isSidewalk) {
          ctx.fillStyle = (c + r) % 2 === 0 ? '#cbd5e1' : '#e2e8f0';
          ctx.fill();
          ctx.strokeStyle = 'rgba(148, 163, 184, 0.35)';
          ctx.lineWidth = 1;
          ctx.stroke();
        } else {
          ctx.fillStyle = (c + r) % 2 === 0 ? '#64748b' : '#475569';
          ctx.fill();
          ctx.strokeStyle = 'rgba(30, 41, 59, 0.4)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    // B. Victorian Streetlamps on the back street sidewalk (visible through windows & above back walls)
    const lampCoords = [
      { c: -1, r: 0 },
      { c: -1, r: Math.floor(gridSize / 2) + 1 },
      { c: 0, r: -1 },
      { c: Math.floor(gridSize / 2) + 1, r: -1 }
    ];

    for (const { c, r } of lampCoords) {
      const pt = IsoUtils.gridToScreen(c, r, originX, originY);
      this.drawStreetLamp(ctx, pt.x, pt.y + 16);
    }

    // C. Parisian Trees on the back street
    const treeCoords = [
      { c: -2, r: 2 },
      { c: -2, r: gridSize },
      { c: 2, r: -2 },
      { c: gridSize, r: -2 }
    ];

    for (const { c, r } of treeCoords) {
      const pt = IsoUtils.gridToScreen(c, r, originX, originY);
      this.drawCityTree(ctx, pt.x, pt.y + 18);
    }

    // D. Pedestrians strolling on the back street sidewalk
    for (const p of this.pedestrians) {
      let pt: { x: number; y: number };
      if (p.street === 'nw') {
        const curR = -0.5 + (gridSize + 1.5) * p.progress;
        pt = IsoUtils.gridToScreen(-1.2, curR, originX, originY);
      } else {
        const curC = -0.5 + (gridSize + 1.5) * p.progress;
        pt = IsoUtils.gridToScreen(curC, -1.2, originX, originY);
      }
      this.drawPedestrian(ctx, pt.x, pt.y, p);
    }

    ctx.restore();
  }

  private drawStreetLamp(ctx: CanvasRenderingContext2D, x: number, y: number) {
    // 1. Warm Golden Light Glow Pool
    const lightGrad = ctx.createRadialGradient(x, y, 6, x, y, 48);
    lightGrad.addColorStop(0, 'rgba(254, 240, 138, 0.4)');
    lightGrad.addColorStop(0.5, 'rgba(253, 224, 71, 0.15)');
    lightGrad.addColorStop(1, 'rgba(253, 224, 71, 0)');
    ctx.fillStyle = lightGrad;
    ctx.beginPath();
    ctx.ellipse(x, y, 48, 24, 0, 0, Math.PI * 2);
    ctx.fill();

    // 2. Cast Iron Base
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.ellipse(x, y, 7, 3.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // 3. Slender Pole
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(x - 2, y - 64, 4, 64);

    // Brass collars
    ctx.fillStyle = '#eab308';
    ctx.fillRect(x - 3, y - 20, 6, 2.5);
    ctx.fillRect(x - 3, y - 46, 6, 2.5);

    // 4. Curved Lantern Arms
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(x - 6, y - 62);
    ctx.quadraticCurveTo(x, y - 72, x + 6, y - 62);
    ctx.stroke();

    // 5. Glass Lantern & Filament
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.moveTo(x - 5, y - 78);
    ctx.lineTo(x + 5, y - 78);
    ctx.lineTo(x + 3.5, y - 64);
    ctx.lineTo(x - 3.5, y - 64);
    ctx.closePath();
    ctx.fill();

    // Cap
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.moveTo(x, y - 84);
    ctx.lineTo(x + 7, y - 78);
    ctx.lineTo(x - 7, y - 78);
    ctx.closePath();
    ctx.fill();
    ctx.fillRect(x - 1, y - 88, 2, 4);
  }

  private drawCityTree(ctx: CanvasRenderingContext2D, x: number, y: number) {
    // Tree Trunk
    ctx.fillStyle = '#5c3a21';
    ctx.fillRect(x - 3, y - 32, 6, 32);

    // Foliage Layers
    const foliageLayers = [
      { r: 22, dy: 40, color: '#15803d' },
      { r: 20, dy: 50, color: '#16a34a' },
      { r: 16, dy: 60, color: '#22c55e' },
      { r: 10, dy: 68, color: '#86efac' }
    ];

    for (const f of foliageLayers) {
      ctx.fillStyle = f.color;
      ctx.beginPath();
      ctx.arc(x, y - f.dy, f.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  private drawPedestrian(ctx: CanvasRenderingContext2D, x: number, y: number, p: Pedestrian) {
    ctx.save();
    ctx.translate(x, y);

    // Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.beginPath();
    ctx.ellipse(0, 2, 8, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Legs
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-3, -12, 3, 12);
    ctx.fillRect(1, -12, 3, 12);

    // Outfit Torso
    ctx.fillStyle = p.outfit;
    ctx.fillRect(-4.5, -24, 9, 13);

    // Head
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.arc(0, -29, 5, 0, Math.PI * 2);
    ctx.fill();

    // Hair or Hat
    if (p.hasHat) {
      ctx.fillStyle = '#78350f';
      ctx.beginPath();
      ctx.ellipse(0, -32, 8, 2.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(-4, -36, 8, 4);
    } else {
      ctx.fillStyle = p.hair;
      ctx.beginPath();
      ctx.arc(0, -31, 5.2, Math.PI, 0);
      ctx.fill();
    }

    // Little dog
    if (p.hasDog) {
      const dogX = p.dir === 1 ? -12 : 12;
      const dogY = -2;

      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, -18);
      ctx.lineTo(dogX, dogY - 4);
      ctx.stroke();

      ctx.fillStyle = '#d97706';
      ctx.beginPath();
      ctx.ellipse(dogX, dogY, 6, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(dogX + (p.dir === 1 ? 4 : -4), dogY - 3, 3.5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }
}
