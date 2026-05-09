"use client";

import { useEffect, useRef } from "react";

export default function XrayAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 620,
      H = 340;

    function noise(x: number, y: number, scale = 1) {
      const s = scale;
      return (
        (Math.sin(x * s * 7.3 + y * s * 13.7) * 0.5 +
          Math.sin(x * s * 3.1 + y * s * 5.9) * 0.3 +
          Math.sin(x * s * 17.1 + y * s * 2.3) * 0.2) *
          0.5 +
        0.5
      );
    }

    function drawTooth(
      tx: number,
      ty: number,
      tw: number,
      th: number,
      brightness: number,
      crowned = false,
      cavity = false,
    ) {
      ctx!.save();
      const grd = ctx!.createLinearGradient(tx, ty, tx + tw, ty + th);
      const b = brightness;
      grd.addColorStop(
        0,
        `rgba(${Math.floor(b * 0.82)},${Math.floor(b * 0.82)},${Math.floor(b * 0.85)},1)`,
      );
      grd.addColorStop(0.35, `rgba(${b},${b},${b},1)`);
      grd.addColorStop(
        0.65,
        `rgba(${Math.floor(b * 0.95)},${Math.floor(b * 0.95)},${Math.floor(b * 0.95)},1)`,
      );
      grd.addColorStop(
        1,
        `rgba(${Math.floor(b * 0.75)},${Math.floor(b * 0.75)},${Math.floor(b * 0.78)},1)`,
      );
      ctx!.fillStyle = grd;
      ctx!.beginPath();
      ctx!.roundRect(tx, ty, tw, th, [3, 3, 2, 2]);
      ctx!.fill();

      const lineG = ctx!.createLinearGradient(tx, ty, tx, ty + th);
      lineG.addColorStop(
        0,
        `rgba(${Math.floor(b * 0.55)},${Math.floor(b * 0.55)},${Math.floor(b * 0.55)},0.9)`,
      );
      lineG.addColorStop(
        1,
        `rgba(${Math.floor(b * 0.45)},${Math.floor(b * 0.45)},${Math.floor(b * 0.45)},0.6)`,
      );
      ctx!.strokeStyle = lineG;
      ctx!.lineWidth = 0.7;
      ctx!.beginPath();
      ctx!.moveTo(tx, ty);
      ctx!.lineTo(tx, ty + th);
      ctx!.stroke();
      ctx!.beginPath();
      ctx!.moveTo(tx + tw, ty);
      ctx!.lineTo(tx + tw, ty + th);
      ctx!.stroke();

      ctx!.strokeStyle = `rgba(${Math.floor(b * 0.5)},${Math.floor(b * 0.5)},${Math.floor(b * 0.5)},0.5)`;
      ctx!.lineWidth = 0.5;
      ctx!.beginPath();
      ctx!.moveTo(tx, ty + th);
      ctx!.lineTo(tx + tw, ty + th);
      ctx!.stroke();

      if (cavity) {
        ctx!.fillStyle = "rgba(0,0,0,0.55)";
        ctx!.beginPath();
        ctx!.ellipse(
          tx + tw * 0.5,
          ty + th * 0.3,
          tw * 0.22,
          th * 0.14,
          0,
          0,
          Math.PI * 2,
        );
        ctx!.fill();
        ctx!.fillStyle = "rgba(20,20,20,0.3)";
        ctx!.beginPath();
        ctx!.ellipse(
          tx + tw * 0.5,
          ty + th * 0.3,
          tw * 0.32,
          th * 0.2,
          0,
          0,
          Math.PI * 2,
        );
        ctx!.fill();
      }
      ctx!.restore();
    }

    function drawRoot(
      rx: number,
      ry: number,
      rw: number,
      rh: number,
      brightness: number,
      count = 1,
    ) {
      ctx!.save();
      const b = brightness;
      if (count === 1) {
        const g = ctx!.createLinearGradient(rx, ry, rx + rw, ry + rh);
        g.addColorStop(
          0,
          `rgba(${Math.floor(b * 0.65)},${Math.floor(b * 0.65)},${Math.floor(b * 0.65)},0.9)`,
        );
        g.addColorStop(
          0.5,
          `rgba(${Math.floor(b * 0.75)},${Math.floor(b * 0.75)},${Math.floor(b * 0.75)},0.85)`,
        );
        g.addColorStop(
          1,
          `rgba(${Math.floor(b * 0.45)},${Math.floor(b * 0.45)},${Math.floor(b * 0.45)},0.5)`,
        );
        ctx!.fillStyle = g;
        ctx!.beginPath();
        ctx!.moveTo(rx, ry);
        ctx!.lineTo(rx + rw, ry);
        ctx!.quadraticCurveTo(
          rx + rw * 0.8,
          ry + rh * 0.7,
          rx + rw * 0.5,
          ry + rh,
        );
        ctx!.quadraticCurveTo(rx + rw * 0.2, ry + rh * 0.7, rx, ry);
        ctx!.fill();
      } else {
        for (let i = 0; i < count; i++) {
          const ox = rx + i * (rw / count);
          const ow = rw / count - 1;
          const g = ctx!.createLinearGradient(ox, ry, ox + ow, ry + rh);
          g.addColorStop(
            0,
            `rgba(${Math.floor(b * 0.65)},${Math.floor(b * 0.65)},${Math.floor(b * 0.65)},0.85)`,
          );
          g.addColorStop(
            1,
            `rgba(${Math.floor(b * 0.4)},${Math.floor(b * 0.4)},${Math.floor(b * 0.4)},0.4)`,
          );
          ctx!.fillStyle = g;
          ctx!.beginPath();
          ctx!.moveTo(ox, ry);
          ctx!.lineTo(ox + ow, ry);
          ctx!.quadraticCurveTo(
            ox + ow * 0.7,
            ry + rh * 0.7,
            ox + ow * 0.5,
            ry + rh,
          );
          ctx!.quadraticCurveTo(ox + ow * 0.3, ry + rh * 0.7, ox, ry);
          ctx!.fill();
        }
      }
      ctx!.restore();
    }

    function drawJawBone() {
      ctx!.save();
      const upperG = ctx!.createRadialGradient(310, 155, 60, 310, 155, 260);
      upperG.addColorStop(0, "rgba(55,52,48,0)");
      upperG.addColorStop(0.6, "rgba(38,36,32,0.4)");
      upperG.addColorStop(1, "rgba(22,20,18,0.7)");
      ctx!.fillStyle = upperG;
      ctx!.beginPath();
      ctx!.ellipse(310, 155, 255, 110, 0, 0, Math.PI * 2);
      ctx!.fill();

      ctx!.strokeStyle = "rgba(70,65,58,0.5)";
      ctx!.lineWidth = 2.5;
      ctx!.beginPath();
      ctx!.ellipse(310, 155, 248, 102, 0, 0, Math.PI * 2);
      ctx!.stroke();
      ctx!.restore();
    }

    function drawBackground() {
      ctx!.fillStyle = "#000";
      ctx!.fillRect(0, 0, W, H);

      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x += 3) {
          const n = noise(x, y, 0.018);
          const dist = Math.hypot(x - 310, y - 155) / 290;
          const fade = Math.max(0, 1 - dist * 1.1);
          const v = Math.floor(n * 28 * fade);
          if (v > 2) {
            ctx!.fillStyle = `rgb(${v},${v},${Math.floor(v * 1.05)})`;
            ctx!.fillRect(x, y, 3, 1);
          }
        }
      }
    }

    function drawFilmBorder() {
      ctx!.save();
      ctx!.strokeStyle = "rgba(80,75,68,0.6)";
      ctx!.lineWidth = 1;
      ctx!.strokeRect(4, 4, W - 8, H - 8);
      ctx!.strokeStyle = "rgba(60,57,52,0.4)";
      ctx!.lineWidth = 0.5;
      ctx!.strokeRect(7, 7, W - 14, H - 14);

      ctx!.fillStyle = "rgba(120,115,105,0.25)";
      ctx!.font = "8px monospace";
      ctx!.fillText("PANORAMIC  |  FULL ARCH  |  30kV", 20, H - 12);
      ctx!.fillText("DentAssist AI  •  AUTO SCAN", W - 180, H - 12);
      ctx!.fillText("L", 16, H / 2);
      ctx!.fillText("R", W - 22, H / 2);

      for (let i = 0; i < 8; i++) {
        const x = 20 + (i * (W - 40)) / 7;
        ctx!.fillStyle = "rgba(100,95,85,0.3)";
        ctx!.fillRect(x, H - 8, 6, 4);
      }
      ctx!.restore();
    }

    const upperTeeth = [
      { x: 52, y: 115, w: 21, h: 36, b: 168, roots: 3, rl: 44, cavity: false },
      { x: 77, y: 108, w: 19, h: 34, b: 172, roots: 3, rl: 40, cavity: false },
      { x: 100, y: 101, w: 18, h: 33, b: 176, roots: 3, rl: 38, cavity: false },
      { x: 122, y: 96, w: 15, h: 30, b: 180, roots: 2, rl: 34, cavity: false },
      { x: 141, y: 91, w: 14, h: 29, b: 183, roots: 2, rl: 32, cavity: false },
      { x: 159, y: 87, w: 13, h: 34, b: 186, roots: 1, rl: 36, cavity: false },
      { x: 176, y: 82, w: 14, h: 37, b: 190, roots: 1, rl: 38, cavity: false },
      { x: 194, y: 79, w: 16, h: 40, b: 194, roots: 1, rl: 42, cavity: true },
      { x: 214, y: 79, w: 16, h: 40, b: 194, roots: 1, rl: 42, cavity: false },
      { x: 232, y: 82, w: 14, h: 37, b: 190, roots: 1, rl: 38, cavity: false },
      { x: 250, y: 87, w: 13, h: 34, b: 186, roots: 1, rl: 36, cavity: false },
      { x: 267, y: 91, w: 14, h: 29, b: 183, roots: 2, rl: 32, cavity: false },
      { x: 285, y: 96, w: 15, h: 30, b: 180, roots: 2, rl: 34, cavity: false },
      { x: 305, y: 101, w: 18, h: 33, b: 176, roots: 3, rl: 38, cavity: false },
      { x: 327, y: 108, w: 19, h: 34, b: 172, roots: 3, rl: 40, cavity: false },
      { x: 350, y: 115, w: 21, h: 36, b: 168, roots: 3, rl: 44, cavity: false },
    ];

    const lowerTeeth = [
      { x: 55, y: 186, w: 21, h: 34, b: 165, roots: 3, rl: 42 },
      { x: 80, y: 190, w: 19, h: 32, b: 168, roots: 3, rl: 38 },
      { x: 103, y: 193, w: 18, h: 31, b: 172, roots: 2, rl: 36 },
      { x: 125, y: 196, w: 15, h: 28, b: 176, roots: 2, rl: 32 },
      { x: 144, y: 198, w: 14, h: 27, b: 179, roots: 1, rl: 30 },
      { x: 162, y: 199, w: 13, h: 30, b: 182, roots: 1, rl: 32 },
      { x: 179, y: 200, w: 12, h: 30, b: 185, roots: 1, rl: 30 },
      { x: 195, y: 201, w: 11, h: 28, b: 188, roots: 1, rl: 28 },
      { x: 210, y: 201, w: 11, h: 28, b: 188, roots: 1, rl: 28 },
      { x: 225, y: 200, w: 12, h: 30, b: 185, roots: 1, rl: 30 },
      { x: 241, y: 199, w: 13, h: 30, b: 182, roots: 1, rl: 32 },
      { x: 258, y: 198, w: 14, h: 27, b: 179, roots: 1, rl: 30 },
      { x: 276, y: 196, w: 15, h: 28, b: 176, roots: 2, rl: 32 },
      { x: 295, y: 193, w: 18, h: 31, b: 172, roots: 2, rl: 36 },
      { x: 317, y: 190, w: 19, h: 32, b: 168, roots: 3, rl: 38 },
      { x: 340, y: 186, w: 21, h: 34, b: 165, roots: 3, rl: 42 },
    ];

    function render() {
      drawBackground();
      drawJawBone();

      upperTeeth.forEach((t) => {
        drawRoot(t.x + 1, t.y - t.rl, t.w - 2, t.rl, t.b, t.roots);
      });

      lowerTeeth.forEach((t) => {
        drawRoot(
          t.x + 1,
          t.y + t.h,
          t.w - 2,
          t.rl,
          t.b,
          t.roots === 3 ? 2 : t.roots,
        );
      });

      upperTeeth.forEach((t) => {
        drawTooth(t.x, t.y, t.w, t.h, t.b, false, t.cavity || false);
      });

      lowerTeeth.forEach((t) => {
        drawTooth(t.x, t.y, t.w, t.h, t.b);
      });

      ctx!.save();
      ctx!.strokeStyle = "rgba(90,85,75,0.55)";
      ctx!.lineWidth = 1.5;
      ctx!.setLineDash([]);
      ctx!.beginPath();
      ctx!.moveTo(52, 152);
      ctx!.quadraticCurveTo(222, 60, 372, 152);
      ctx!.stroke();
      ctx!.beginPath();
      ctx!.moveTo(55, 186);
      ctx!.quadraticCurveTo(222, 270, 362, 186);
      ctx!.stroke();
      ctx!.restore();

      ctx!.save();
      ctx!.strokeStyle = "rgba(120,115,100,0.25)";
      ctx!.lineWidth = 10;
      ctx!.beginPath();
      ctx!.ellipse(212, 168, 168, 80, 0, 0, Math.PI * 2);
      ctx!.stroke();
      ctx!.restore();

      ctx!.save();
      ctx!.strokeStyle = "rgba(170,30,30,0.7)";
      ctx!.lineWidth = 1.5;
      ctx!.setLineDash([3, 2]);
      const ct = upperTeeth[7];
      ctx!.strokeRect(ct.x - 2, ct.y - 2, ct.w + 4, ct.h + 4);
      ctx!.setLineDash([]);

      ctx!.fillStyle = "rgba(200,30,30,0.85)";
      ctx!.beginPath();
      ctx!.roundRect(ct.x + ct.w + 4, ct.y - 2, 42, 14, 3);
      ctx!.fill();
      ctx!.fillStyle = "#fff";
      ctx!.font = "bold 7px monospace";
      ctx!.fillText("CAVITY", ct.x + ct.w + 8, ct.y + 8);
      ctx!.restore();

      ctx!.save();
      ctx!.strokeStyle = "rgba(60,180,120,0.6)";
      ctx!.lineWidth = 0.8;
      ctx!.setLineDash([2, 2]);
      upperTeeth.forEach((t, i) => {
        if (i !== 7) {
          ctx!.strokeRect(t.x - 1, t.y - 1, t.w + 2, t.h + 2);
        }
      });
      lowerTeeth.forEach((t) => {
        ctx!.strokeRect(t.x - 1, t.y - 1, t.w + 2, t.h + 2);
      });
      ctx!.setLineDash([]);
      ctx!.restore();

      ctx!.save();
      ctx!.fillStyle = "rgba(60,180,120,0.75)";
      ctx!.beginPath();
      ctx!.roundRect(W - 100, 10, 90, 14, 3);
      ctx!.fill();
      ctx!.fillStyle = "#fff";
      ctx!.font = "bold 7px monospace";
      ctx!.fillText("31 HEALTHY", W - 96, 20);

      ctx!.fillStyle = "rgba(200,30,30,0.75)";
      ctx!.beginPath();
      ctx!.roundRect(W - 100, 28, 90, 14, 3);
      ctx!.fill();
      ctx!.fillStyle = "#fff";
      ctx!.fillText("1 FLAGGED", W - 96, 38);
      ctx!.restore();

      ctx!.save();
      ctx!.fillStyle = "rgba(120,115,100,0.4)";
      ctx!.font = "7px monospace";
      ctx!.fillText("UPPER JAW", 10, 78);
      ctx!.fillText("LOWER JAW", 10, 222);
      ctx!.restore();

      // Tooth numbers
      ctx!.save();
      ctx!.font = "7px monospace";
      ctx!.fillStyle = "rgba(130,125,110,0.5)";
      const upperNums = [
        "16",
        "15",
        "14",
        "13",
        "12",
        "11",
        "10",
        "9",
        "8",
        "7",
        "6",
        "5",
        "4",
        "3",
        "2",
        "1",
      ];
      const lowerNums = [
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
        "32",
      ];
      upperTeeth.forEach((t, i) => {
        ctx!.fillText(upperNums[i], t.x + t.w / 2 - 5, 22);
      });
      lowerTeeth.forEach((t, i) => {
        ctx!.fillText(lowerNums[i], t.x + t.w / 2 - 5, H - 14);
      });
      ctx!.restore();

      drawFilmBorder();

      ctx!.save();
      ctx!.fillStyle = "rgba(0,0,0,0.18)";
      for (let y = 0; y < H; y += 2) {
        ctx!.fillRect(0, y, W, 1);
      }

      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x += 4) {
          if (Math.random() < 0.003) {
            const g = Math.floor(Math.random() * 60 + 160);
            ctx!.fillStyle = `rgba(${g},${g},${g},${Math.random() * 0.15})`;
            ctx!.fillRect(x, y, 2, 1);
          }
        }
      }
      ctx!.restore();
    }

    render();
  }, []);

  return (
    <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black shadow-2xl">
      {/* animated scan line */}
      <div className="absolute inset-x-0 h-[2px] bg-blue-400/40 animate-scan z-10 pointer-events-none" />
      <canvas
        ref={canvasRef}
        width={620}
        height={340}
        className="w-full h-auto block"
      />

      {/* overlay gloss */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
    </div>
  );
}
