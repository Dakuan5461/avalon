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

/** 与海报、分享统一的测试入口 */
const TEST_SITE_URL = "https://avalontest.cn/";

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
  resultPortrait: document.getElementById("result-portrait"),
  resultAxes: document.getElementById("result-axes"),
  sharePosterCanvas: document.getElementById("share-poster-canvas"),
  atlasList: document.getElementById("atlas-list"),
};

let counts = emptyCounts();
let questionIndex = 0;
/** 已作答题目的 scores 分值表，长度等于当前题号（上一题及之前） */
let answerTrail = [];
let lastMatch = null;
/** 结果页「复制文案」的完整内容（不展示在页面上） */
let lastCopyShareText = "";
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

/**
 * 含「阿瓦隆人格测试」与网址，供页面展示/复制/系统分享共用。
 * @param {{ name: string, shareShort?: string }} primary
 */
function buildFullShareText(primary) {
  if (!primary) return "";
  const short = (primary.shareShort || "").trim();
  const lines = [`【阿瓦隆人格测试】我的结果：「${primary.name}」`];
  if (short) lines.push(short);
  lines.push(`来测一测：${TEST_SITE_URL}`);
  return lines.join("\n");
}

/**
 * 在「用户点击」的同步阶段执行，兼容 iOS/微信等环境下异步 clipboard 不可用的问题。
 * @param {string} text
 * @returns {boolean}
 */
function tryExecCommandCopy(text) {
  if (!text) return false;
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "readonly");
  ta.setAttribute("aria-hidden", "true");
  Object.assign(ta.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "2px",
    height: "2px",
    margin: "0",
    padding: "0",
    border: "none",
    outline: "none",
    boxShadow: "none",
    background: "transparent",
    opacity: "0",
    fontSize: "16px",
  });
  document.body.appendChild(ta);
  ta.focus();
  if (ta.setSelectionRange) {
    ta.select();
    ta.setSelectionRange(0, text.length);
  } else {
    ta.select();
  }
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    /* 忽略 */
  }
  document.body.removeChild(ta);
  return ok;
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
      setTimeout(() => onOption(opt.scores ?? {}), 200);
    });
    el.quizOptions.appendChild(btn);
  });
}

function onOption(scoreDelta) {
  addScores(counts, scoreDelta);
  answerTrail.push(scoreDelta);
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
    const v = axis.value;
    let meta;
    if (v === 50) {
      meta = "居中";
    } else if (v > 50) {
      meta = `${v}% 偏${axis.rightLabel}`;
    } else {
      const leftDominance = 100 - v;
      meta = `${leftDominance}% 偏${axis.leftLabel}`;
    }
    const row = document.createElement("div");
    row.className = "axis";
    row.innerHTML = `
      <div class="axis__labels"><span>${axis.leftLabel}</span><span>${axis.rightLabel}</span></div>
      <div class="axis__track" role="presentation">
        <span class="axis__fill" style="width:${v}%"></span>
        <span class="axis__tick" style="left:${v}%"></span>
      </div>
      <p class="axis__meta">${meta}</p>
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
  lastCopyShareText = buildFullShareText(primary);
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
  lastCopyShareText = "";
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

document.getElementById("btn-copy-share")?.addEventListener("click", () => {
  const t = lastCopyShareText.trim();
  if (!t) return;
  if (tryExecCommandCopy(t)) {
    showToast("已复制到剪贴板");
    return;
  }
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard
      .writeText(t)
      .then(() => {
        showToast("已复制到剪贴板");
      })
      .catch(() => {
        showToast("无法自动复制，可改用「下载图片」或截图分享");
      });
    return;
  }
  showToast("无法完成自动复制。请用「下载图片」分享海报，或长截图本页。");
});

function downloadSharePng() {
  const canvas = el.sharePosterCanvas;
  if (!canvas || !lastMatch) return;
  const name = (lastMatch.primary?.name ?? "结果").replace(/[\\/:*?"<>|]/g, "_");
  const filename = `阿瓦隆人格-${name}.png`;

  const doneOk = () => showToast("已保存");
  const doneFail = (detail) => {
    console.error(detail);
    showToast("无法保存图片。请用 HTTP 方式打开本页（勿用本机 file 直接打开）或使用截图", 4000);
  };

  const triggerDownload = (href) => {
    const link = document.createElement("a");
    link.href = href;
    link.download = filename;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (typeof canvas.toBlob === "function") {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          try {
            triggerDownload(canvas.toDataURL("image/png", 1.0));
            doneOk();
          } catch (e) {
            doneFail(e);
          }
          return;
        }
        const url = URL.createObjectURL(blob);
        try {
          triggerDownload(url);
          doneOk();
        } catch (e) {
          doneFail(e);
        } finally {
          setTimeout(() => URL.revokeObjectURL(url), 1500);
        }
      },
      "image/png",
      1.0
    );
  } else {
    try {
      triggerDownload(canvas.toDataURL("image/png", 1.0));
      doneOk();
    } catch (e) {
      doneFail(e);
    }
  }
}

document.getElementById("btn-download-share")?.addEventListener("click", () => {
  downloadSharePng();
});

renderAtlasList();
showScreen("home");
