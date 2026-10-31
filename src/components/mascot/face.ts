import * as THREE from 'three';
import type { Mood } from './types';

const W = 832;
const H = 448;

/** Draws the visor face (eyes + mouth) onto a canvas used as a texture. */
export class FaceRenderer {
  readonly texture: THREE.CanvasTexture;
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private lastKey = '';

  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = W;
    this.canvas.height = H;
    const ctx = this.canvas.getContext('2d');
    if (!ctx) throw new Error('2D canvas is not available');
    this.ctx = ctx;
    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.colorSpace = THREE.SRGBColorSpace;
    this.texture.anisotropy = 4;
  }

  private rr(x: number, y: number, w: number, h: number, r: number): void {
    const c = this.ctx;
    const rad = Math.min(r, w / 2, h / 2);
    c.beginPath();
    c.moveTo(x + rad, y);
    c.arcTo(x + w, y, x + w, y + h, rad);
    c.arcTo(x + w, y + h, x, y + h, rad);
    c.arcTo(x, y + h, x, y, rad);
    c.arcTo(x, y, x + w, y, rad);
    c.closePath();
  }

  draw(lx: number, ly: number, lid: number, mood: Mood, t: number): void {
    const key = `${mood}|${lx.toFixed(2)}|${ly.toFixed(2)}|${lid.toFixed(2)}|${mood === 'sleep' ? Math.floor(t * 20) : 0}`;
    if (key === this.lastKey) return;
    this.lastKey = key;

    const fx = this.ctx;
    fx.clearRect(0, 0, W, H);
    this.rr(4, 4, W - 8, H - 8, 200);
    const bg = fx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#201813');
    bg.addColorStop(1, '#050403');
    fx.fillStyle = bg;
    fx.fill();

    fx.save();
    this.rr(4, 4, W - 8, H - 8, 200);
    fx.clip();

    const cy = H * 0.44;
    const gold = fx.createLinearGradient(0, cy - 90, 0, cy + 90);
    gold.addColorStop(0, '#ffe6b8');
    gold.addColorStop(1, '#d2a463');
    fx.shadowColor = 'rgba(240,190,110,.9)';
    fx.shadowBlur = 38;
    fx.fillStyle = gold;
    fx.strokeStyle = '#f0c987';
    fx.lineCap = 'round';

    for (const s of [-1, 1]) {
      const cx = W / 2 + s * 172 + lx * 34;
      const ey = cy + ly * 22;
      if (mood === 'happy') {
        fx.lineWidth = 34;
        fx.beginPath();
        fx.arc(cx, ey + 34, 58, Math.PI * 1.1, Math.PI * 1.9);
        fx.stroke();
      } else if (mood === 'sleep') {
        fx.lineWidth = 28;
        fx.beginPath();
        fx.arc(cx, ey - 18, 56, Math.PI * 0.14, Math.PI * 0.86);
        fx.stroke();
      } else if (mood === 'wow') {
        fx.beginPath();
        fx.arc(cx, ey, 68, 0, 7);
        fx.fill();
        fx.shadowBlur = 0;
        fx.fillStyle = '#120d09';
        fx.beginPath();
        fx.arc(cx + lx * 20, ey + ly * 14, 24, 0, 7);
        fx.fill();
        fx.shadowBlur = 38;
        fx.fillStyle = gold;
      } else {
        const h = Math.max(10, 172 * lid);
        this.rr(cx - 52, ey - h / 2, 104, h, 52);
        fx.fill();
      }
    }

    fx.shadowBlur = 22;
    fx.strokeStyle = '#e8c07c';
    fx.fillStyle = '#e8c07c';
    const mx = W / 2 + lx * 18;
    if (mood === 'happy') {
      fx.beginPath();
      fx.arc(mx, cy + 122, 44, 0, Math.PI);
      fx.closePath();
      fx.fill();
    } else if (mood === 'wow') {
      fx.lineWidth = 12;
      fx.beginPath();
      fx.arc(mx, cy + 140, 20, 0, 7);
      fx.stroke();
    } else if (mood === 'sleep') {
      fx.lineWidth = 12;
      fx.beginPath();
      fx.moveTo(mx - 24, cy + 138);
      fx.lineTo(mx + 24, cy + 138);
      fx.stroke();
      fx.shadowBlur = 14;
      fx.globalAlpha = 0.55 + 0.4 * Math.sin(t * 2);
      fx.font = 'italic 700 64px Georgia, serif';
      fx.fillText('z', W - 215, 120 - 8 * Math.sin(t * 1.3));
      fx.font = 'italic 700 40px Georgia, serif';
      fx.fillText('z', W - 160, 76 - 6 * Math.sin(t * 1.3 + 1));
      fx.globalAlpha = 1;
    } else {
      fx.lineWidth = 14;
      fx.beginPath();
      fx.arc(mx, cy + 112, 36, Math.PI * 0.14, Math.PI * 0.86);
      fx.stroke();
    }

    fx.shadowBlur = 0;
    const gloss = fx.createLinearGradient(0, 0, W * 0.6, H * 0.95);
    gloss.addColorStop(0, 'rgba(255,255,255,.17)');
    gloss.addColorStop(0.34, 'rgba(255,255,255,.04)');
    gloss.addColorStop(0.35, 'rgba(255,255,255,0)');
    fx.fillStyle = gloss;
    fx.fillRect(0, 0, W, H);
    fx.restore();

    this.rr(4, 4, W - 8, H - 8, 200);
    fx.lineWidth = 5;
    fx.strokeStyle = 'rgba(207,169,107,.75)';
    fx.stroke();
    this.texture.needsUpdate = true;
  }

  dispose(): void {
    this.texture.dispose();
  }
}

