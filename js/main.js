import { QUESTIONS } from "./questions.js";
import {
  emptyCounts,
  addScores,
  subtractScores,
  matchRoles,
  roleMatchPercent,
  profileAxesFromCounts,
} from "./scoring.js";
import { ROLES } from "./roles.js";
import { drawPoster } from "./poster.js";

const appRoot = document.getElementById("app");
const btnQuit = document.getElementById("btn-quit");
const elToast = document.getElementById("app-toast");

const screens = {
  home: document.getElementById("screen-home"),
  quiz: document.getElementById("screen-quiz"),
  atlas: document.getElementById("screen-atlas"),
  result: document.getElementById("screen-result"),
};

const el = {
  quizProgressLabel: document.getElementById("quiz-progress-label"),
  quizProgressPct: document.getElementById("quiz-progress-pct"),
  quizProgressFill: document.getElementById("quiz-progress-fill"),
  quizProgressbar: document.getElementById("quiz-progressbar"),
  quizQuestion: document.getElementById("quiz-question"),
  quizOptions: document.getElementById("quiz-options"),
  resultTitle: document.getElementById("result-title"),
  resultSubtitle: document.getElementById("result-subtitle"),
  resultTags: document.getElementById("result-tags"),
  resultSimilarity: document.getElementById("result-similarity"),
  resultSecondary: document.getElementById("result-secondary"),
  resultBody: document.getElementById("result-body"),
  resultPros: document.getElementById("result-pros"),
  resultCons: document.getElementById("result-cons"),
  resultShare: document.getElementById("result-share"),
  resultPortrait: document.getElementById("result-portrait"),
  resultAxes: document.getElementById("result-axes"),
  sharePosterCanvas: document.getElementById("share-poster-canvas"),
  atlasList: document.getElementById("atlas-list"),
};

let counts = emptyCounts();
let questionIndex = 0;
/** 已作答题目的选项维度，长度等于当前题号（上一题及之前） */
let answerTrail = [];
let lastMatch = null;
let lastAtlasFrom = "home";
let toastTimer = 0;

function showScreen(name) {
  if (appRoot) appRoot.dataset.screen = name;
  if (btnQuit) btnQuit.hidden = name === "home";
  Object.entries(screens).forEach(([k, node]) => {
    if (!node) return;
    const active = k === name;
    node.hidden = !active;
    node.classList.toggle("screen--active", active);
  });
}

function showToast(msg, ms = 2200) {
  if (!elToast) return;
  elToast.textContent = msg;
  elToast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    elToast.hidden = true;
  }, ms);
}

function openAtlas() {
  if (!screens.result?.hidden) lastAtlasFrom = "result";
  else if (!screens.quiz?.hidden) lastAtlasFrom = "quiz";
  else lastAtlasFrom = "home";
  renderAtlasList();
  showScreen("atlas");
  window.scrollTo(0, 0);
}

function closeAtlas() {
  if (lastAtlasFrom === "result") showScreen("result");
  else if (lastAtlasFrom === "quiz") showScreen("quiz");
  else showScreen("home");
  window.scrollTo(0, 0);
}

function renderAtlasList() {
  const root = el.atlasList;
  if (!root) return;
  root.innerHTML = "";
  ROLES.forEach((r) => {
    const li = document.createElement("li");
    li.className = "atlas-item";
    li.innerHTML = `
      <div class="atlas-item__media">
        <img class="atlas-item__img" src="./pictures/${r.portraitFile}" alt="${r.name} 立绘" width="56" height="56" loading="lazy" />
      </div>
      <div class="atlas-item__text">
        <span class="atlas-item__name">${r.name}</span>
        <span class="atlas-item__line">${r.subtitle}</span>
      </div>`;
    root.appendChild(li);
  });
}

function renderQuestion() {
  const q = QUESTIONS[questionIndex];
  const total = QUESTIONS.length;
  const n = questionIndex + 1;
  const pct = Math.round((n / total) * 100);
  if (el.quizProgressLabel) el.quizProgressLabel.textContent = `PROGRESS ${n}/${total}`;
  if (el.quizProgressPct) el.quizProgressPct.textContent = `${pct}%`;
  el.quizProgressbar?.setAttribute("aria-valuenow", String(n));
  el.quizProgressbar?.setAttribute("aria-valuemax", String(total));
  el.quizProgressbar?.setAttribute("aria-valuetext", `第 ${n} 题，约 ${pct}%`);
  if (el.quizProgressFill) el.quizProgressFill.style.width = `${(n / total) * 100}%`;

  el.quizQuestion.textContent = q.question;
  el.quizOptions.innerHTML = "";
  q.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option-btn";
    btn.innerHTML = `<span class="option-key">${opt.key}.</span>${opt.text}`;
    btn.addEventListener("click", () => {
      el.quizOptions.querySelectorAll(".option-btn").forEach((b) => {
        b.disabled = true;
      });
      btn.classList.add("option-btn--selected");
      setTimeout(() => onOption(opt.scores), 200);
    });
    el.quizOptions.appendChild(btn);
  });
}

function onOption(scoreKeys) {
  addScores(counts, scoreKeys);
  answerTrail.push(scoreKeys);
  questionIndex += 1;
  if (questionIndex >= QUESTIONS.length) {
    finishQuiz();
  } else {
    renderQuestion();
  }
}

function renderAxisList(axes) {
  if (!el.resultAxes) return;
  el.resultAxes.innerHTML = "";
  axes.forEach((axis) => {
    const lean =
      axis.value === 50
        ? "居中"
        : axis.value > 50
          ? `偏${axis.rightLabel}`
          : `偏${axis.leftLabel}`;
    const row = document.createElement("div");
    row.className = "axis";
    row.innerHTML = `
      <div class="axis__labels"><span>${axis.leftLabel}</span><span>${axis.rightLabel}</span></div>
      <div class="axis__track" role="presentation">
        <span class="axis__fill" style="width:${axis.value}%"></span>
        <span class="axis__tick" style="left:${axis.value}%"></span>
      </div>
      <p class="axis__meta">${axis.value}% ${lean}</p>
    `;
    el.resultAxes.appendChild(row);
  });
}

function goQuizBack() {
  if (questionIndex === 0) {
    resetQuiz();
    showScreen("home");
    window.scrollTo(0, 0);
    return;
  }
  const last = answerTrail.pop();
  if (last) subtractScores(counts, last);
  questionIndex -= 1;
  renderQuestion();
  window.scrollTo(0, 0);
}

async function finishQuiz() {
  lastMatch = matchRoles(counts);
  const { primary, secondary } = lastMatch;
  const primaryPct = roleMatchPercent(counts, primary);

  el.resultTitle.textContent = primary.title;
  el.resultSubtitle.textContent = primary.subtitle;
  el.resultTags.innerHTML = "";
  primary.keywords.forEach((k) => {
    const span = document.createElement("span");
    span.className = "tag";
    span.textContent = k;
    el.resultTags.appendChild(span);
  });

  el.resultSimilarity.textContent = `与「${primary.name}」气质接近度约 ${primaryPct}%`;
  if (secondary && secondary.name !== primary.name) {
    const secPct = roleMatchPercent(counts, secondary);
    el.resultSecondary.textContent = `与「${secondary.name}」次要接近度约 ${secPct}%`;
  } else {
    el.resultSecondary.textContent = "";
  }

  el.resultBody.textContent = primary.body;
  fillList(el.resultPros, primary.pros);
  fillList(el.resultCons, primary.cons);
  el.resultShare.textContent = primary.shareShort;
  renderAxisList(profileAxesFromCounts(counts));

  if (el.resultPortrait) {
    el.resultPortrait.src = `./pictures/${primary.portraitFile}`;
    el.resultPortrait.alt = `${primary.name}角色形象`;
  }

  if (el.sharePosterCanvas) {
    await drawPoster(el.sharePosterCanvas, primary, {
      matchPercent: roleMatchPercent(counts, primary),
    });
  }

  showScreen("result");
  window.scrollTo(0, 0);
}

function fillList(ul, items) {
  ul.innerHTML = "";
  items.forEach((t) => {
    const li = document.createElement("li");
    li.textContent = t;
    ul.appendChild(li);
  });
}

function resetQuiz() {
  counts = emptyCounts();
  questionIndex = 0;
  answerTrail = [];
  lastMatch = null;
}

document.getElementById("link-home")?.addEventListener("click", () => {
  resetQuiz();
  showScreen("home");
  window.scrollTo(0, 0);
});

document.getElementById("btn-start")?.addEventListener("click", () => {
  resetQuiz();
  renderQuestion();
  showScreen("quiz");
  window.scrollTo(0, 0);
});

document.getElementById("btn-atlas")?.addEventListener("click", () => {
  openAtlas();
});

document.getElementById("btn-atlas-back")?.addEventListener("click", () => {
  closeAtlas();
});

btnQuit?.addEventListener("click", () => {
  resetQuiz();
  showScreen("home");
  window.scrollTo(0, 0);
});

document.getElementById("btn-retry")?.addEventListener("click", () => {
  resetQuiz();
  renderQuestion();
  showScreen("quiz");
  window.scrollTo(0, 0);
});

document.getElementById("btn-quiz-back")?.addEventListener("click", goQuizBack);

function getSharePayload() {
  const p = lastMatch?.primary;
  if (!p) return { title: "阿瓦隆角色人格", text: "" };
  return {
    title: `我的阿瓦隆人格：${p.name}`,
    text: p.shareShort,
  };
}

document.getElementById("btn-copy-share")?.addEventListener("click", async () => {
  const t = el.resultShare?.textContent?.trim() ?? "";
  if (!t) return;
  try {
    await navigator.clipboard.writeText(t);
    showToast("已复制到剪贴板");
  } catch {
    showToast("复制失败，请长按文案手动复制");
  }
});

document.getElementById("btn-native-share")?.addEventListener("click", async () => {
  const { title, text } = getSharePayload();
  if (navigator.share) {
    try {
      await navigator.share({ title, text });
      return;
    } catch (e) {
      if (e && e.name === "AbortError") return;
    }
  }
  try {
    await navigator.clipboard.writeText(`${title}\n\n${text}`.trim());
    showToast("已复制（当前环境无法直接调起系统分享）");
  } catch {
    showToast("请使用复制按钮");
  }
});

function downloadSharePng() {
  const canvas = el.sharePosterCanvas;
  if (!canvas || !lastMatch) return;
  const name = lastMatch.primary?.name ?? "结果";
  const link = document.createElement("a");
  link.download = `阿瓦隆人格-${name}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
  showToast("已保存");
}

document.getElementById("btn-download-share")?.addEventListener("click", () => {
  downloadSharePng();
});

renderAtlasList();
showScreen("home");
