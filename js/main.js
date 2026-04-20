import { QUESTIONS } from "./questions.js";
import {
  emptyCounts,
  addScores,
  subtractScores,
  matchRoles,
  entertainmentMatchPercent,
} from "./scoring.js";
import { drawPoster } from "./poster.js";

const screens = {
  home: document.getElementById("screen-home"),
  quiz: document.getElementById("screen-quiz"),
  result: document.getElementById("screen-result"),
  poster: document.getElementById("screen-poster"),
};

const el = {
  quizProgress: document.getElementById("quiz-progress"),
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
  posterCanvas: document.getElementById("poster-canvas"),
};

let counts = emptyCounts();
let questionIndex = 0;
/** 已作答题目的选项维度，长度等于当前题号（上一题及之前） */
let answerTrail = [];
let lastMatch = null;

function showScreen(name) {
  Object.entries(screens).forEach(([k, node]) => {
    if (!node) return;
    const active = k === name;
    node.hidden = !active;
    node.classList.toggle("screen--active", active);
  });
}

function renderQuestion() {
  const q = QUESTIONS[questionIndex];
  const total = QUESTIONS.length;
  const n = questionIndex + 1;
  el.quizProgress.textContent = `${n} / ${total}`;
  el.quizProgressbar.setAttribute("aria-valuenow", String(n));
  el.quizProgressbar.setAttribute("aria-valuemax", String(total));
  el.quizProgressFill.style.width = `${(n / total) * 100}%`;

  el.quizQuestion.textContent = q.question;
  el.quizOptions.innerHTML = "";
  q.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option-btn";
    btn.innerHTML = `<span class="option-key">${opt.key}.</span>${opt.text}`;
    btn.addEventListener("click", () => onOption(opt.scores));
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

function finishQuiz() {
  lastMatch = matchRoles(counts);
  const { primary, secondary, ranked } = lastMatch;
  const pct = entertainmentMatchPercent(ranked);

  el.resultTitle.textContent = primary.title;
  el.resultSubtitle.textContent = primary.subtitle;
  el.resultTags.innerHTML = "";
  primary.keywords.forEach((k) => {
    const span = document.createElement("span");
    span.className = "tag";
    span.textContent = k;
    el.resultTags.appendChild(span);
  });

  el.resultSimilarity.textContent = `你的风格约 ${pct}% 接近「${primary.name}」气质（娱乐向参考）`;
  if (secondary && secondary.name !== primary.name) {
    el.resultSecondary.textContent = `你也有一点：${secondary.name}（次要接近）`;
  } else {
    el.resultSecondary.textContent = "";
  }

  el.resultBody.textContent = primary.body;
  fillList(el.resultPros, primary.pros);
  fillList(el.resultCons, primary.cons);
  el.resultShare.textContent = primary.shareShort;

  if (el.resultPortrait) {
    el.resultPortrait.src = `./pictures/${primary.portraitFile}`;
    el.resultPortrait.alt = `${primary.name}角色形象`;
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

document.getElementById("btn-start")?.addEventListener("click", () => {
  resetQuiz();
  renderQuestion();
  showScreen("quiz");
  window.scrollTo(0, 0);
});

document.getElementById("btn-retry")?.addEventListener("click", () => {
  resetQuiz();
  renderQuestion();
  showScreen("quiz");
  window.scrollTo(0, 0);
});

document.getElementById("btn-quiz-back")?.addEventListener("click", goQuizBack);

document.getElementById("btn-poster")?.addEventListener("click", async () => {
  if (!lastMatch || !el.posterCanvas) return;
  await drawPoster(el.posterCanvas, lastMatch.primary);
  showScreen("poster");
  window.scrollTo(0, 0);
});

document.getElementById("btn-back-result")?.addEventListener("click", () => {
  showScreen("result");
  window.scrollTo(0, 0);
});

document.getElementById("btn-download")?.addEventListener("click", () => {
  const canvas = el.posterCanvas;
  if (!canvas) return;
  const link = document.createElement("a");
  link.download = `阿瓦隆人格-${lastMatch?.primary?.name ?? "结果"}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
});

showScreen("home");
