/**
 * 分享图 Canvas：上 — 立绘/名称/短文案/接近度；下 — 网址 + 二维码
 * 高度随内容收束，避免底部大块留白。
 */

const QR_PATH = "./pictures/QRcode.png";
const POSTER_W = 750;
/** 人格区与底部区分界线（像素），须大于上半区可能占据的最大 y */
const DIVIDER_Y = 470;

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("image load failed"));
    img.src = src;
  });
}

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
  ctx.strokeStyle = "rgba(200, 140, 90, 0.6)";
  ctx.lineWidth = 3;
  ctx.stroke();
}

/** 居中多行，最多 maxLines 行；未写完则末行以 … 收束。 */
function drawWrappedLines(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
  ctx.textAlign = "center";
  if (!text || maxLines < 1) return y;
  const chars = text.split("");
  const lines = [];
  let i = 0;
  while (i < chars.length && lines.length < maxLines) {
    let line = "";
    while (i < chars.length) {
      const t = line + chars[i];
      if (ctx.measureText(t).width > maxWidth && line) break;
      line = t;
      i += 1;
    }
    lines.push(line);
  }
  if (i < chars.length && lines.length) {
    let last = lines[lines.length - 1];
    while (last.length > 0 && ctx.measureText(last + "…").width > maxWidth) {
      last = last.slice(0, -1);
    }
    lines[lines.length - 1] = last + "…";
  }
  let cy = y;
  for (const ln of lines) {
    if (ln) {
      ctx.fillText(ln, x, cy);
      cy += lineHeight;
    }
  }
  return cy;
}

/**
 * @param {object} extra
 * @param {number} extra.matchPercent
 */
export async function drawPoster(canvas, role, extra = {}) {
  const matchPercent = extra.matchPercent ?? 0;
  const w = POSTER_W;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const dividerY = DIVIDER_Y;
  const yVisit = dividerY + 32;
  const yDomain = yVisit + 36;
  const qrY = yDomain + 32;
  const pad = 6;
  const qrSize = 160;
  const qrBlockBottom = qrY + qrSize + pad * 2;
  const footerY = qrBlockBottom + 28;
  const h = Math.max(600, Math.ceil(footerY + 32));

  canvas.width = w;
  canvas.height = h;

  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, "#1a1235");
  g.addColorStop(0.42, "#120c24");
  g.addColorStop(1, "#090613");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  /* 下半区略深 */
  ctx.fillStyle = "rgba(0, 0, 0, 0.16)";
  ctx.fillRect(0, dividerY, w, h - dividerY);

  ctx.strokeStyle = "rgba(180, 162, 255, 0.24)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, dividerY);
  ctx.lineTo(w, dividerY);
  ctx.stroke();

  /* ——— 上：人格信息（在 dividerY 上方留边距） ——— */
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";

  ctx.fillStyle = "rgba(220, 206, 255, 0.8)";
  ctx.font = "22px 'Microsoft YaHei', 'PingFang SC', sans-serif";
  ctx.fillText("我的阿瓦隆人格", w / 2, 46);

  const cx = w / 2;
  const cy = 150;
  const diam = 142;
  const portraitPath = `./pictures/${role.portraitFile}`;

  try {
    const pImg = await loadImage(portraitPath);
    drawPortraitCircle(ctx, pImg, cx, cy, diam);
  } catch {
    ctx.fillStyle = "rgba(120, 40, 50, 0.25)";
    ctx.strokeStyle = "rgba(200, 90, 100, 0.45)";
    ctx.lineWidth = 2;
    const s = 72;
    ctx.fillRect(cx - s / 2, cy - s / 2, s, s);
    ctx.strokeRect(cx - s / 2, cy - s / 2, s, s);
    ctx.fillStyle = "#c9a85c";
    ctx.font = "bold 40px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("⚜", cx, cy);
    ctx.textBaseline = "alphabetic";
  }

  ctx.textAlign = "center";

  ctx.fillStyle = "#ffd98f";
  ctx.font = "bold 44px 'Microsoft YaHei', 'PingFang SC', sans-serif";
  ctx.fillText(role.name, w / 2, 256);

  ctx.fillStyle = "#b6afd9";
  ctx.font = "21px 'Microsoft YaHei', 'PingFang SC', sans-serif";
  const sub = (role.subtitle || "").replace(/。$/, "");
  let afterSub = drawWrappedLines(ctx, sub, w / 2, 288, w - 72, 28, 2);

  const matchY = Math.max(afterSub + 18, 352);
  ctx.fillStyle = "rgba(255, 214, 139, 0.96)";
  ctx.font = "20px 'Microsoft YaHei', 'PingFang SC', sans-serif";
  ctx.fillText(`气质接近度 ${matchPercent}%`, w / 2, matchY);

  const blurbStart = matchY + 32;
  const blurb = (role.shareShort || "").trim().split("\n").join("");
  ctx.fillStyle = "#a9b8e6";
  ctx.font = "19px 'Microsoft YaHei', 'PingFang SC', sans-serif";
  if (blurb) {
    drawWrappedLines(ctx, blurb, w / 2, blurbStart, w - 64, 30, 2);
  }

  /* ——— 下：网址 + 二维码 ——— */
  ctx.fillStyle = "rgba(210, 200, 255, 0.62)";
  ctx.font = "18px 'Microsoft YaHei', 'PingFang SC', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("访问测试", w / 2, yVisit);

  ctx.fillStyle = "#ffd98f";
  ctx.font = "28px 'Microsoft YaHei', 'PingFang SC', sans-serif";
  ctx.fillText("avalontest.cn", w / 2, yDomain);

  const qrX = w / 2 - qrSize / 2;

  try {
    const qr = await loadImage(QR_PATH);
    ctx.save();
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    const rb = 10;
    const qx0 = qrX - pad;
    const qy0 = qrY - pad;
    const qw = qrSize + pad * 2;
    const qh = qrSize + pad * 2;
    ctx.moveTo(qx0 + rb, qy0);
    ctx.lineTo(qx0 + qw - rb, qy0);
    ctx.quadraticCurveTo(qx0 + qw, qy0, qx0 + qw, qy0 + rb);
    ctx.lineTo(qx0 + qw, qy0 + qh - rb);
    ctx.quadraticCurveTo(qx0 + qw, qy0 + qh, qx0 + qw - rb, qy0 + qh);
    ctx.lineTo(qx0 + rb, qy0 + qh);
    ctx.quadraticCurveTo(qx0, qy0 + qh, qx0, qy0 + qh - rb);
    ctx.lineTo(qx0, qy0 + rb);
    ctx.quadraticCurveTo(qx0, qy0, qx0 + rb, qy0);
    ctx.closePath();
    ctx.fill();
    ctx.drawImage(qr, qrX, qrY, qrSize, qrSize);
    ctx.restore();
  } catch {
    ctx.strokeStyle = "rgba(200, 90, 100, 0.45)";
    ctx.setLineDash([6, 4]);
    ctx.strokeRect(qrX, qrY, qrSize, qrSize);
    ctx.setLineDash([]);
    ctx.fillStyle = "rgba(154, 163, 181, 0.8)";
    ctx.font = "16px 'Microsoft YaHei', sans-serif";
    ctx.fillText("二维码", w / 2, qrY + qrSize * 0.5);
  }

  ctx.fillStyle = "rgba(228, 222, 255, 0.46)";
  ctx.font = "16px 'Microsoft YaHei', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("阿瓦隆角色人格测试", w / 2, footerY);
}
