/**
 * 使用 Canvas 绘制微信传播向分享图（750×1200）
 * 异步加载角色立绘（./pictures/ 下与 portraitFile 对应）
 */

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("image load failed"));
    img.src = src;
  });
}

/** 圆形裁剪 + cover 铺满 */
function drawPortraitCircle(ctx, img, cx, cy, diameter) {
  const r = diameter / 2;
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.clip();
  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;
  const scale = Math.max(diameter / iw, diameter / ih);
  const dw = iw * scale;
  const dh = ih * scale;
  ctx.drawImage(img, cx - dw / 2, cy - dh / 2, dw, dh);
  ctx.restore();

  ctx.beginPath();
  ctx.arc(cx, cy, r + 2, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(201, 162, 39, 0.55)";
  ctx.lineWidth = 3;
  ctx.stroke();
}

export async function drawPoster(canvas, role) {
  const w = canvas.width;
  const h = canvas.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, "#1a2744");
  g.addColorStop(0.45, "#0f1629");
  g.addColorStop(1, "#0a0f1a");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = "rgba(201, 162, 39, 0.22)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(w / 2, 195, 118, 0, Math.PI * 2);
  ctx.stroke();

  const cx = w / 2;
  const cy = 200;
  const portraitPath = `./pictures/${role.portraitFile}`;

  try {
    const img = await loadImage(portraitPath);
    drawPortraitCircle(ctx, img, cx, cy, 176);
  } catch {
    ctx.fillStyle = "rgba(201, 162, 39, 0.15)";
    ctx.strokeStyle = "rgba(201, 162, 39, 0.5)";
    ctx.lineWidth = 2;
    const bx = cx - 48;
    ctx.fillRect(bx, cy - 48, 96, 96);
    ctx.strokeRect(bx, cy - 48, 96, 96);
    ctx.fillStyle = "#c9a227";
    ctx.font = "bold 42px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("⚜", cx, cy);
  }

  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";

  ctx.fillStyle = "#e8eaf0";
  ctx.font = "28px 'Microsoft YaHei', 'PingFang SC', sans-serif";
  ctx.fillText("我的阿瓦隆人格角色是", w / 2, 330);

  ctx.fillStyle = "#c9a227";
  ctx.font = "bold 52px 'Microsoft YaHei', 'PingFang SC', sans-serif";
  ctx.fillText(role.name, w / 2, 400);

  ctx.fillStyle = "#b8bcc8";
  ctx.font = "26px 'Microsoft YaHei', 'PingFang SC', sans-serif";
  const sub = role.subtitle.replace(/。$/, "");
  wrapText(ctx, sub, w / 2, 450, w - 100, 36);

  const kw = role.keywords.slice(0, 3);
  ctx.textAlign = "left";
  const startX = 80;
  let ky = 560;
  ctx.fillStyle = "rgba(201, 162, 39, 0.9)";
  ctx.font = "22px 'Microsoft YaHei', 'PingFang SC', sans-serif";
  kw.forEach((k, i) => {
    ctx.fillText(`· ${k}`, startX, ky + i * 40);
  });

  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(154, 163, 181, 0.85)";
  ctx.font = "22px 'Microsoft YaHei', 'PingFang SC', sans-serif";
  ctx.fillText("12 道题，测测你在阿瓦隆里最像谁", w / 2, h - 100);

  ctx.fillStyle = "rgba(255,255,255,0.35)";
  ctx.font = "18px sans-serif";
  ctx.fillText("阿瓦隆角色人格测试", w / 2, h - 60);

  const qw = 140;
  const qx = w / 2 - qw / 2;
  const qy = h - 220;
  ctx.strokeStyle = "rgba(201, 162, 39, 0.4)";
  ctx.setLineDash([6, 4]);
  ctx.strokeRect(qx, qy, qw, qw);
  ctx.setLineDash([]);
  ctx.fillStyle = "rgba(154, 163, 181, 0.7)";
  ctx.font = "16px 'Microsoft YaHei', sans-serif";
  ctx.fillText("入口", w / 2, qy + qw / 2 - 8);
  ctx.fillText("二维码", w / 2, qy + qw / 2 + 14);
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  ctx.textAlign = "center";
  const chars = text.split("");
  let line = "";
  let cy = y;
  for (let i = 0; i < chars.length; i++) {
    const test = line + chars[i];
    const m = ctx.measureText(test);
    if (m.width > maxWidth && line.length > 0) {
      ctx.fillText(line, x, cy);
      line = chars[i];
      cy += lineHeight;
    } else {
      line = test;
    }
  }
  if (line) ctx.fillText(line, x, cy);
}
