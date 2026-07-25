/**
 * 夜空环境音（P3）：全程序化合成，零音频素材、零版权问题。默认静音，
 * 由左下角悬浮开关手动开启；样式模块内注入（.app-ambient-*），不改 app.css。
 *
 * 合成器结构（全部声部汇入 masterGain → destination；master 目标增益 0.5）：
 *   a) 底床：8s 循环棕色噪声（程序生成 AudioBuffer，尾端向开头 100ms 交叉淡化
 *      消除循环点台阶）→ BiquadFilter lowpass 400Hz → GainNode 0.03；
 *   b) 铺底：55Hz 正弦（detune -3¢，电平 0.5）与 82.4Hz 三角（detune +3¢，电平 0.28）
 *      → lowpass 900Hz → padGain（基础 0.035，由周期 24s 的正弦 LFO ±0.018 呼吸）；
 *   c) 点缀：每 6~15s 随机一记 Karplus-Strong 拨弦——噪声激励的延迟线经
 *      0.996 阻尼低通反馈，天然指数衰减；音高取 D 宫五声（A/B/D/E/F#，
 *      A3=220Hz 起、跨两个八度的 11 个音级）→ lowpass 2600Hz
 *      → 增益 0.05~0.1（随机）→ 声像 ±0.6（随机）。
 *
 * 交互：首次点击才创建 AudioContext（浏览器自动播放策略），此后点击在
 * 静音/恢复间切换，主增益 1.5s 线性淡入淡出；淡出完成后 suspend 省电。
 * document.visibilitychange：页面隐藏即 suspend，回来时若曾开启则 resume。
 * 全部音量宁轻勿响。
 */

/* ------------------------------ 参数 ------------------------------ */

const MASTER_TARGET = 0.5; // 主增益目标值
const FADE_SECONDS = 1.5; // 开关淡入淡出时长

const NOISE_SECONDS = 8; // 棕色噪声循环长度
const NOISE_LP_HZ = 400; // 底床低通（300~500Hz 区间）
const NOISE_GAIN = 0.03; // 底床增益（0.02~0.04 区间）

const PAD_FREQ_A = 55; // 铺底基频一（A1 正弦）
const PAD_FREQ_B = 82.4; // 铺底基频二（E2 三角）
const PAD_DETUNE_CENTS = 3; // 微失谐 ±3 音分
const PAD_LEVEL_A = 0.5;
const PAD_LEVEL_B = 0.28;
const PAD_LP_HZ = 900; // 柔化三角波谐波
const PAD_BASE_GAIN = 0.035;
const PAD_LFO_DEPTH = 0.018; // 呼吸幅度（padGain 在 0.017~0.053 间起伏）
const PAD_LFO_PERIOD = 24; // 呼吸周期（秒，>20s）

const PLUCK_GAP_MIN_MS = 6000; // 点缀间隔 6~15s
const PLUCK_GAP_MAX_MS = 15000;
const PLUCK_BASE_HZ = 220; // A3
/** D 宫五声音级（相对 A 的半音数）：A B D E F#，跨两个八度 */
const PLUCK_SEMITONES = [0, 2, 5, 7, 9, 12, 14, 17, 19, 21, 24];
const PLUCK_SECONDS = 3; // 拨弦采样长度
const PLUCK_DAMPING = 0.996; // K-S 反馈阻尼（越接近 1 衰减越慢）
const PLUCK_LP_HZ = 2600;
const PLUCK_GAIN_MIN = 0.05;
const PLUCK_GAIN_MAX = 0.1;
const PLUCK_PAN = 0.6; // 随机声像范围

/* ------------------------------ 样式 ------------------------------ */

const CSS = `
.app-ambient-toggle {
  position: fixed; left: 20px; bottom: 20px; z-index: 50; pointer-events: auto;
  width: 40px; height: 40px; padding: 0; border-radius: 50%;
  border: 1px solid rgba(201, 162, 39, 0.8);
  background: rgba(13, 13, 17, 0.72);
  color: #fce1b6;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
  transition: border-color 0.3s ease, box-shadow 0.4s ease, opacity 0.3s ease;
}
.app-ambient-toggle:hover {
  border-color: #fce1b6;
  box-shadow: 0 0 12px rgba(201, 162, 39, 0.35);
}
.app-ambient-toggle:focus-visible { outline: 1px solid #fce1b6; outline-offset: 3px; }
.app-ambient-toggle.is-on {
  box-shadow: 0 0 14px rgba(201, 162, 39, 0.5), inset 0 0 8px rgba(201, 162, 39, 0.2);
}
.app-ambient-toggle:disabled { opacity: 0.35; cursor: default; box-shadow: none; }
.app-ambient-toggle svg { display: block; }
.app-ambient-toggle .amb-waves { display: none; }
.app-ambient-toggle.is-on .amb-waves { display: block; }
.app-ambient-toggle.is-on .amb-mute { display: none; }
`;

/** 扬声器双态图标：默认「静音叉」，.is-on 时切换为「声波」 */
const ICON_SVG = `
<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
     stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5H4z"/>
  <g class="amb-waves">
    <path d="M15.5 9.2a4 4 0 0 1 0 5.6"/>
    <path d="M18 6.6a7.6 7.6 0 0 1 0 10.8"/>
  </g>
  <g class="amb-mute">
    <path d="M15.5 9.5l5 5"/>
    <path d="M20.5 9.5l-5 5"/>
  </g>
</svg>`;

/* ------------------------------ 状态 ------------------------------ */

interface AmbientRig {
  ctx: AudioContext;
  master: GainNode;
}

let initialized = false;
let rig: AmbientRig | null = null; // 首次点击前为 null（不创建 AudioContext）
let enabled = false;
let fadeToken = 0; // 淡出后延迟 suspend 的竞态令牌
let pluckTimer: number | null = null;
const pluckCache = new Map<number, AudioBuffer>(); // 按音高缓存 K-S 采样

/* --------------------------- 程序合成声部 --------------------------- */

/** 棕色噪声（泄漏积分白噪声），尾端向开头交叉淡化使循环无缝 */
function createBrownNoise(ctx: AudioContext): AudioBuffer {
  const sr = ctx.sampleRate;
  const len = Math.floor(NOISE_SECONDS * sr);
  const buf = ctx.createBuffer(1, len, sr);
  const data = buf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < len; i++) {
    const white = Math.random() * 2 - 1;
    last = (last + 0.02 * white) / 1.02;
    data[i] = last * 3.5; // 补偿泄漏积分的电平损失
  }
  const fade = Math.min(Math.floor(sr * 0.1), len >> 2);
  for (let j = 0; j < fade; j++) {
    const t = j / fade;
    data[len - fade + j] = data[len - fade + j] * (1 - t) + data[j] * t;
  }
  return buf;
}

/** Karplus-Strong 拨弦：噪声激励的延迟线经阻尼低通反馈，呈指数衰减 */
function createPluckBuffer(ctx: AudioContext, freq: number): AudioBuffer {
  const sr = ctx.sampleRate;
  const len = Math.floor(PLUCK_SECONDS * sr);
  const buf = ctx.createBuffer(1, len, sr);
  const out = buf.getChannelData(0);
  const period = Math.max(2, Math.round(sr / freq));
  const line = new Float32Array(period);
  for (let i = 0; i < period; i++) line[i] = Math.random() * 2 - 1;
  let idx = 0;
  for (let i = 0; i < len; i++) {
    const next = (idx + 1) % period;
    out[i] = line[idx];
    line[idx] = PLUCK_DAMPING * 0.5 * (line[idx] + line[next]);
    idx = next;
  }
  return buf;
}

/** 建图：三层声部 → masterGain(0) → destination，常驻节点在此一次性启动 */
function buildRig(ctx: AudioContext): AmbientRig {
  const master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);

  // a) 底床：循环棕色噪声 → 低通 → 极低增益
  const noise = ctx.createBufferSource();
  noise.buffer = createBrownNoise(ctx);
  noise.loop = true;
  const noiseLp = ctx.createBiquadFilter();
  noiseLp.type = "lowpass";
  noiseLp.frequency.value = NOISE_LP_HZ;
  const noiseGain = ctx.createGain();
  noiseGain.gain.value = NOISE_GAIN;
  noise.connect(noiseLp).connect(noiseGain).connect(master);
  noise.start();

  // b) 铺底：微失谐双振荡器 → 低通 → 呼吸增益
  const padLp = ctx.createBiquadFilter();
  padLp.type = "lowpass";
  padLp.frequency.value = PAD_LP_HZ;
  const padGain = ctx.createGain();
  padGain.gain.value = PAD_BASE_GAIN;
  padLp.connect(padGain).connect(master);

  const oscA = ctx.createOscillator();
  oscA.type = "sine";
  oscA.frequency.value = PAD_FREQ_A;
  oscA.detune.value = -PAD_DETUNE_CENTS;
  const gainA = ctx.createGain();
  gainA.gain.value = PAD_LEVEL_A;
  oscA.connect(gainA).connect(padLp);

  const oscB = ctx.createOscillator();
  oscB.type = "triangle";
  oscB.frequency.value = PAD_FREQ_B;
  oscB.detune.value = PAD_DETUNE_CENTS;
  const gainB = ctx.createGain();
  gainB.gain.value = PAD_LEVEL_B;
  oscB.connect(gainB).connect(padLp);

  const lfo = ctx.createOscillator();
  lfo.type = "sine";
  lfo.frequency.value = 1 / PAD_LFO_PERIOD;
  const lfoDepth = ctx.createGain();
  lfoDepth.gain.value = PAD_LFO_DEPTH;
  lfo.connect(lfoDepth).connect(padGain.gain); // 音频率调制增益 → 呼吸

  oscA.start();
  oscB.start();
  lfo.start();

  return { ctx, master };
}

/** c) 点缀：一记随机音高的 K-S 拨弦，一次性节点，onended 后自清理 */
function playPluck({ ctx, master }: AmbientRig): void {
  const semi = PLUCK_SEMITONES[Math.floor(Math.random() * PLUCK_SEMITONES.length)];
  const freq = PLUCK_BASE_HZ * Math.pow(2, semi / 12);
  let buf = pluckCache.get(freq);
  if (!buf) {
    buf = createPluckBuffer(ctx, freq);
    pluckCache.set(freq, buf);
  }
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = PLUCK_LP_HZ;
  const gain = ctx.createGain();
  gain.gain.value = PLUCK_GAIN_MIN + Math.random() * (PLUCK_GAIN_MAX - PLUCK_GAIN_MIN);
  const pan = ctx.createStereoPanner();
  pan.pan.value = (Math.random() * 2 - 1) * PLUCK_PAN;
  src.connect(lp).connect(gain).connect(pan).connect(master);
  src.onended = () => {
    src.disconnect();
    lp.disconnect();
    gain.disconnect();
    pan.disconnect();
  };
  src.start();
}

/* ------------------------------ 控制 ------------------------------ */

/** 主增益 1.5s 线性淡入/淡出 */
function fadeMaster(master: GainNode, to: number): void {
  const now = master.context.currentTime;
  const param = master.gain;
  param.cancelScheduledValues(now);
  param.setValueAtTime(param.value, now);
  param.linearRampToValueAtTime(to, now + FADE_SECONDS);
}

function stopPluckTimer(): void {
  if (pluckTimer !== null) {
    window.clearTimeout(pluckTimer);
    pluckTimer = null;
  }
}

/** 6~15s 随机间隔自我续排；暂停/关闭时只跳过发声，不重排 */
function schedulePluck(): void {
  stopPluckTimer();
  pluckTimer = window.setTimeout(
    () => {
      if (rig && enabled && rig.ctx.state === "running") playPluck(rig);
      schedulePluck();
    },
    PLUCK_GAP_MIN_MS + Math.random() * (PLUCK_GAP_MAX_MS - PLUCK_GAP_MIN_MS),
  );
}

function updateButton(btn: HTMLButtonElement): void {
  btn.classList.toggle("is-on", enabled);
  const label = enabled ? "关闭环境音" : "开启环境音";
  btn.setAttribute("aria-label", label);
  btn.setAttribute("aria-pressed", String(enabled));
  btn.title = label;
}

/** 取 AudioContext 构造函数（含旧 Safari webkit 前缀）；不支持时返回 undefined */
function audioContextCtor(): typeof AudioContext | undefined {
  const w = window as unknown as {
    AudioContext?: typeof AudioContext;
    webkitAudioContext?: typeof AudioContext;
  };
  return w.AudioContext ?? w.webkitAudioContext;
}

async function toggle(btn: HTMLButtonElement): Promise<void> {
  if (!rig) {
    const Ctor = audioContextCtor();
    if (!Ctor) return;
    rig = buildRig(new Ctor()); // 首次点击才创建（自动播放策略）
  }
  enabled = !enabled;
  fadeToken++;
  updateButton(btn);
  const { ctx, master } = rig;
  if (enabled) {
    if (ctx.state !== "running") await ctx.resume().catch(() => undefined);
    fadeMaster(master, MASTER_TARGET);
    schedulePluck();
  } else {
    fadeMaster(master, 0);
    stopPluckTimer();
    // 淡出结束后 suspend 省电；期间若重新开启则由令牌作废本次 suspend
    const token = fadeToken;
    window.setTimeout(() => {
      if (rig && !enabled && token === fadeToken && rig.ctx.state === "running") {
        void rig.ctx.suspend();
      }
    }, (FADE_SECONDS + 0.1) * 1000);
  }
}

/* ------------------------------ 入口 ------------------------------ */

/** 幂等：注入样式与左下角悬浮开关；不创建任何音频节点（等首次点击） */
export function initAmbient(): void {
  if (initialized || typeof document === "undefined") return;
  initialized = true;

  const style = document.createElement("style");
  style.textContent = CSS;
  document.head.appendChild(style);

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "app-ambient-toggle";
  btn.innerHTML = ICON_SVG;
  document.body.appendChild(btn);

  if (!audioContextCtor()) {
    btn.disabled = true;
    btn.setAttribute("aria-label", "环境音不可用");
    btn.title = "当前浏览器不支持 Web Audio";
    return;
  }
  updateButton(btn); // 初始：关 → 「开启环境音」
  btn.addEventListener("click", () => {
    void toggle(btn);
  });

  // 页面隐藏即静音挂起；回来时若曾开启则恢复
  document.addEventListener("visibilitychange", () => {
    if (!rig) return;
    if (document.hidden) {
      if (rig.ctx.state === "running") void rig.ctx.suspend();
    } else if (enabled) {
      void rig.ctx.resume();
    }
  });
}
