/**
 * 使用 Canvas 绘制微信传播向分享图（750×1200）
 */
export function drawPoster(canvas, role) {
  const w = canvas.width;
  const h = canvas.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // 背景
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, "#1a2744");
  g.addColorStop(0.45, "#0f1629");
  g.addColorStop(1, "#0a0f1a");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  // 装饰圆环
  ctx.save();
  ctx.strokeStyle = "rgba(201, 162, 39, 0.25)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(w / 2, 180, 120, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // 徽章方块
  ctx.fillStyle = "rgba(201, 162, 39, 0.15)";
  ctx.strokeStyle = "rgba(201, 162, 39, 0.5)";
  ctx.lineWidth = 2;
  const bx = w / 2 - 48;
  ctx.fillRect(bx, 100, 96, 96);
  ctx.strokeRect(bx, 100, 96, 96);

  ctx.fillStyle = "#c9a227";
  ctx.font = "bold 42px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("⚜", w / 2, 148);

  // 主标题
  ctx.fillStyle = "#e8eaf0";
  ctx.font = "28px 'Microsoft YaHei', 'PingFang SC', sans-serif";
  ctx.fillText("我的阿瓦隆人格角色是", w / 2, 260);

  ctx.fillStyle = "#c9a227";
  ctx.font = "bold 52px 'Microsoft YaHei', 'PingFang SC', sans-serif";
  ctx.fillText(role.name, w / 2, 340);

  // 副标题（一句话）
  ctx.fillStyle = "#b8bcc8";
  ctx.font = "26px 'Microsoft YaHei', 'PingFang SC', sans-serif";
  const sub = role.subtitle.replace(/。$/, "");
  wrapText(ctx, sub, w / 2, 420, w - 100, 36);

  // 关键词（取前 3 个）
  const kw = role.keywords.slice(0, 3);
  ctx.textAlign = "left";
  const startX = 80;
  let ky = 520;
  ctx.fillStyle = "rgba(201, 162, 39, 0.9)";
  ctx.font = "22px 'Microsoft YaHei', 'PingFang SC', sans-serif";
  kw.forEach((k, i) => {
    ctx.fillText(`· ${k}`, startX, ky + i * 40);
  });

  // 底部
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(154, 163, 181, 0.85)";
  ctx.font = "22px 'Microsoft YaHei', 'PingFang SC', sans-serif";
  ctx.fillText("12 道题，测测你在阿瓦隆里最像谁", w / 2, h - 100);

  ctx.fillStyle = "rgba(255,255,255,0.35)";
  ctx.font = "18px sans-serif";
  ctx.fillText("阿瓦隆角色人格测试", w / 2, h - 60);

  // 二维码占位框（无真实链接时作入口位）
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
