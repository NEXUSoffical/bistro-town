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
   * 1. Draw Pristine Sky, Radiant Sun, Fluffy Clouds, Birds, and Precision Isometric Horizon Meadow.
   */
  drawSkyAndBackground(t: CanvasRenderingContext2D, width: number, height: number, originX: number, originY: number) {
    t.save();
    const getIsoHorizon = (x: number) => {
      const dist = x - originX;
      const peak = Math.max(25, (originY - 110) - 65);
      return peak + Math.sqrt(dist * dist + 1200) * 0.5;
    };
    const skyGrad = t.createLinearGradient(0, 0, 0, Math.max(originY - 40, 120));
    skyGrad.addColorStop(0, "#0284c7");
    skyGrad.addColorStop(0.35, "#38bdf8");
    skyGrad.addColorStop(0.7, "#7dd3fc");
    skyGrad.addColorStop(0.9, "#bae6fd");
    skyGrad.addColorStop(1, "#fef08a");
    t.fillStyle = skyGrad;
    t.beginPath();
    t.moveTo(0, 0);
    t.lineTo(width, 0);
    t.lineTo(width, getIsoHorizon(width) + 20);
    for (let x = width; x >= 0; x -= 15) {
      t.lineTo(x, getIsoHorizon(x));
    }
    t.closePath();
    t.fill();

    const sunX = width * 0.82;
    const sunY = Math.max(40, originY - 240);
    const sunGrad = t.createRadialGradient(sunX, sunY, 8, sunX, sunY, 140);
    sunGrad.addColorStop(0, "rgba(254, 240, 138, 0.98)");
    sunGrad.addColorStop(0.25, "rgba(253, 224, 71, 0.4)");
    sunGrad.addColorStop(0.6, "rgba(253, 224, 71, 0.12)");
    sunGrad.addColorStop(1, "rgba(253, 224, 71, 0)");
    t.fillStyle = sunGrad;
    t.beginPath();
    t.arc(sunX, sunY, 140, 0, Math.PI * 2);
    t.fill();

    t.strokeStyle = "rgba(51, 65, 85, 0.5)";
    t.lineWidth = 1.8;
    for (let h = 0; h < 4; h++) {
      const p = this.birdsX + h * 22;
      const m = 50 + h * 7 + Math.sin(this.animTimer * 2.2 + h) * 3.5;
      t.beginPath();
      t.moveTo(p - 6, m + 3);
      t.quadraticCurveTo(p - 2, m - 3, p, m);
      t.quadraticCurveTo(p + 2, m - 3, p + 6, m + 3);
      t.stroke();
    }
    for (const h of this.clouds) {
      this.drawCloud(t, h.x, h.y, h.scale);
    }

    const meadowGrad = t.createLinearGradient(0, Math.max(20, originY - 180), 0, height);
    meadowGrad.addColorStop(0, "#48bb78");
    meadowGrad.addColorStop(0.18, "#38a169");
    meadowGrad.addColorStop(0.58, "#2f855a");
    meadowGrad.addColorStop(1, "#1e4d35");
    t.fillStyle = meadowGrad;
    t.beginPath();
    t.moveTo(0, height);
    for (let x = 0; x <= width + 15; x += 15) {
      t.lineTo(x, getIsoHorizon(x) - 1);
    }
    t.lineTo(width, height);
    t.closePath();
    t.fill();

    t.strokeStyle = "rgba(34, 84, 61, 0.55)";
    t.lineWidth = 2;
    t.beginPath();
    for (let x = 0; x <= width + 15; x += 15) {
      if (x === 0) t.moveTo(x, getIsoHorizon(x));
      else t.lineTo(x, getIsoHorizon(x));
    }
    t.stroke();
    t.restore();
  }

  drawDistantSkyline(_ctx: CanvasRenderingContext2D, _width: number, _horizonY: number, _originX: number) {
    // Skyline disabled per user request for pure meadow horizon
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


  /**
   * 2. Draw Meadow Surroundings & Stepping Stones (behind restaurant walls).
   */
  drawBackStreet(t: CanvasRenderingContext2D, originX: number, originY: number, gridSize: number) {
    t.save();
    const wallTop = IsoUtils.gridToScreen(0, 0, originX, originY);

    // Stepping stones path
    const pathPoints = [
      { x: wallTop.x + 36, y: wallTop.y - 6, rx: 11, ry: 6 },
      { x: wallTop.x + 44, y: wallTop.y - 18, rx: 12, ry: 6.5 },
      { x: wallTop.x + 40, y: wallTop.y - 30, rx: 11.5, ry: 6 },
      { x: wallTop.x + 52, y: wallTop.y - 42, rx: 13, ry: 7 },
      { x: wallTop.x + 64, y: wallTop.y - 56, rx: 12.5, ry: 6.8 },
      { x: wallTop.x + 58, y: wallTop.y - 70, rx: 14, ry: 7.5 },
      { x: wallTop.x + 70, y: wallTop.y - 86, rx: 13, ry: 7 },
      { x: wallTop.x + 78, y: wallTop.y - 102, rx: 15, ry: 8 },
      { x: wallTop.x + 88, y: wallTop.y - 120, rx: 16, ry: 8.5 }
    ];
    pathPoints.forEach(pt => {
      t.fillStyle = "rgba(12, 38, 22, 0.38)";
      t.beginPath();
      t.ellipse(pt.x + 1, pt.y + 2.5, pt.rx + 2, pt.ry + 1.5, 0, 0, Math.PI * 2);
      t.fill();
      t.fillStyle = "#94a3b8";
      t.beginPath();
      t.ellipse(pt.x, pt.y + 1.5, pt.rx, pt.ry, 0, 0, Math.PI * 2);
      t.fill();
      t.fillStyle = "#e2e8f0";
      t.beginPath();
      t.ellipse(pt.x, pt.y, pt.rx, pt.ry, 0, 0, Math.PI * 2);
      t.fill();
      t.strokeStyle = "#64748b";
      t.lineWidth = 1.2;
      t.stroke();
      t.fillStyle = "rgba(255, 255, 255, 0.65)";
      t.beginPath();
      t.ellipse(pt.x - pt.rx * 0.25, pt.y - pt.ry * 0.25, pt.rx * 0.5, pt.ry * 0.4, 0, 0, Math.PI * 2);
      t.fill();
    });

    // Decorative flowers, grass tufts, clovers
    const decorSeeds = [
      { dx: -220, dy: -80, t: "tuft" },
      { dx: -280, dy: 30, t: "daisy" },
      { dx: -160, dy: 120, t: "buttercup" },
      { dx: -110, dy: -130, t: "tuft" },
      { dx: -340, dy: -50, t: "clover" },
      { dx: -210, dy: 200, t: "pink_clover" },
      { dx: 160, dy: -150, t: "buttercup" },
      { dx: 230, dy: -90, t: "tuft" },
      { dx: 280, dy: 30, t: "clover" },
      { dx: 200, dy: 110, t: "daisy" },
      { dx: 320, dy: -130, t: "tuft" },
      { dx: 110, dy: 200, t: "buttercup" },
      { dx: -80, dy: 260, t: "tuft" },
      { dx: 50, dy: 280, t: "daisy" },
      { dx: 240, dy: 220, t: "clover" },
      { dx: -280, dy: 240, t: "tuft" }
    ];
    decorSeeds.forEach(item => {
      const gx = originX + item.dx;
      const gy = originY + item.dy;
      if (item.t === "tuft") {
        const sway = Math.sin(this.animTimer * 2.4 + (item.dx + item.dy) * 0.02) * 1.8;
        t.strokeStyle = "#1b4332";
        t.lineWidth = 1.5;
        t.beginPath();
        t.moveTo(gx - 5, gy);
        t.quadraticCurveTo(gx - 7 + sway, gy - 7, gx - 9 + sway * 1.3, gy - 9);
        t.moveTo(gx - 1, gy);
        t.quadraticCurveTo(gx - 1 + sway, gy - 9, gx + sway * 1.2, gy - 12);
        t.moveTo(gx + 3, gy);
        t.quadraticCurveTo(gx + 5 + sway, gy - 8, gx + 7 + sway * 1.2, gy - 9);
        t.stroke();
        t.strokeStyle = "#4ade80";
        t.lineWidth = 1;
        t.beginPath();
        t.moveTo(gx - 1, gy - 4);
        t.quadraticCurveTo(gx - 1 + sway, gy - 9, gx + sway * 1.2, gy - 12);
        t.stroke();
      } else if (item.t === "clover") {
        t.fillStyle = "#1b4332";
        t.beginPath();
        t.arc(gx, gy, 4.5, 0, Math.PI * 2);
        t.fill();
        t.fillStyle = "#2d6a4f";
        t.beginPath();
        t.arc(gx - 2.5, gy - 2.5, 2.4, 0, Math.PI * 2);
        t.arc(gx + 2.5, gy - 2.5, 2.4, 0, Math.PI * 2);
        t.arc(gx, gy + 1.5, 2.4, 0, Math.PI * 2);
        t.fill();
      } else if (item.t === "pink_clover") {
        t.fillStyle = "#1b4332";
        t.beginPath();
        t.arc(gx, gy, 4.5, 0, Math.PI * 2);
        t.fill();
        t.fillStyle = "#2d6a4f";
        t.beginPath();
        t.arc(gx - 2, gy - 2, 2, 0, Math.PI * 2);
        t.arc(gx + 2, gy - 2, 2, 0, Math.PI * 2);
        t.arc(gx, gy + 1.5, 2, 0, Math.PI * 2);
        t.fill();
        t.fillStyle = "#f472b6";
        t.beginPath();
        t.arc(gx, gy - 4, 2.5, 0, Math.PI * 2);
        t.arc(gx - 1.5, gy - 5.5, 1.8, 0, Math.PI * 2);
        t.arc(gx + 1.5, gy - 5.5, 1.8, 0, Math.PI * 2);
        t.fill();
      } else if (item.t === "buttercup") {
        t.fillStyle = "#15803d";
        t.beginPath();
        t.arc(gx, gy, 3.5, 0, Math.PI * 2);
        t.fill();
        t.fillStyle = "#facc15";
        t.beginPath();
        t.arc(gx, gy - 3, 2.8, 0, Math.PI * 2);
        t.fill();
        t.fillStyle = "#ca8a04";
        t.beginPath();
        t.arc(gx, gy - 3, 1.1, 0, Math.PI * 2);
        t.fill();
      } else {
        t.fillStyle = "#15803d";
        t.beginPath();
        t.arc(gx, gy, 3.5, 0, Math.PI * 2);
        t.fill();
        t.fillStyle = "#ffffff";
        for (let p = 0; p < 5; p++) {
          const ang = p * (Math.PI * 2 / 5);
          t.beginPath();
          t.arc(gx + Math.cos(ang) * 2.6, gy - 3 + Math.sin(ang) * 2.6, 1.4, 0, Math.PI * 2);
          t.fill();
        }
        t.fillStyle = "#facc15";
        t.beginPath();
        t.arc(gx, gy - 3, 1.4, 0, Math.PI * 2);
        t.fill();
      }
    });

    for (const r of this.pedestrians) {
      let pt: { x: number; y: number };
      if (r.street === "nw") {
        const h = -1.5 + (gridSize + 1.5) * r.progress;
        pt = IsoUtils.gridToScreen(-1.5, h, originX, originY);
      } else {
        const h = -1.5 + (gridSize + 1.5) * r.progress;
        pt = IsoUtils.gridToScreen(h, -1.5, originX, originY);
      }
      this.drawPedestrian(t, pt.x, pt.y, r);
    }
    t.restore();
  }

  drawCityTree(_ctx: CanvasRenderingContext2D, _x: number, _y: number) {
    // Trees removed per user request
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
