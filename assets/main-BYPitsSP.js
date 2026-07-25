var Nu=Object.defineProperty;var Fu=(s,e,t)=>e in s?Nu(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var G=(s,e,t)=>Fu(s,typeof e!="symbol"?e+"":e,t);import{M as ho,V as xe,Q as Ut,r as sn,a as Me,S as jl,b as Ul,C as Ql,w as Bu,G as Cn,c as Gu,E as fi,W as Hu,d as Yu,P as qu,e as Wu,f as Xu,g as Vu,l as ju,h as Uu,i as Qu,p as Ku,j as wa,k as Zu,B as Sa,A as Ju,D as ka,m as ef,n as Ss,T as Kl,o as tf,q as nf,s as rf,L as sf,t as Zl,u as of,v as Jl,x as af,y as lf,z as cf}from"./detailCard-Df9QdKXr.js";const uf=.5,ec=1.5,ff=8,hf=400,df=.03,pf=55,gf=82.4,Ta=3,_f=.5,mf=.28,yf=900,bf=.035,vf=.018,xf=24,Ca=6e3,wf=15e3,Sf=220,Ea=[0,2,5,7,9,12,14,17,19,21,24],kf=3,Tf=.996,Cf=2600,Ma=.05,Ef=.1,Mf=.6,Pf=`
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
`,Of=`
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
</svg>`;let Pa=!1,$t=null,Mn=!1,Vs=0,us=null;const Oa=new Map;function Af(s){const e=s.sampleRate,t=Math.floor(ff*e),n=s.createBuffer(1,t,e),r=n.getChannelData(0);let i=0;for(let a=0;a<t;a++){const l=Math.random()*2-1;i=(i+.02*l)/1.02,r[a]=i*3.5}const o=Math.min(Math.floor(e*.1),t>>2);for(let a=0;a<o;a++){const l=a/o;r[t-o+a]=r[t-o+a]*(1-l)+r[a]*l}return n}function Rf(s,e){const t=s.sampleRate,n=Math.floor(kf*t),r=s.createBuffer(1,n,t),i=r.getChannelData(0),o=Math.max(2,Math.round(t/e)),a=new Float32Array(o);for(let c=0;c<o;c++)a[c]=Math.random()*2-1;let l=0;for(let c=0;c<n;c++){const u=(l+1)%o;i[c]=a[l],a[l]=Tf*.5*(a[l]+a[u]),l=u}return r}function Df(s){const e=s.createGain();e.gain.value=0,e.connect(s.destination);const t=s.createBufferSource();t.buffer=Af(s),t.loop=!0;const n=s.createBiquadFilter();n.type="lowpass",n.frequency.value=hf;const r=s.createGain();r.gain.value=df,t.connect(n).connect(r).connect(e),t.start();const i=s.createBiquadFilter();i.type="lowpass",i.frequency.value=yf;const o=s.createGain();o.gain.value=bf,i.connect(o).connect(e);const a=s.createOscillator();a.type="sine",a.frequency.value=pf,a.detune.value=-Ta;const l=s.createGain();l.gain.value=_f,a.connect(l).connect(i);const c=s.createOscillator();c.type="triangle",c.frequency.value=gf,c.detune.value=Ta;const u=s.createGain();u.gain.value=mf,c.connect(u).connect(i);const d=s.createOscillator();d.type="sine",d.frequency.value=1/xf;const p=s.createGain();return p.gain.value=vf,d.connect(p).connect(o.gain),a.start(),c.start(),d.start(),{ctx:s,master:e}}function Lf({ctx:s,master:e}){const t=Ea[Math.floor(Math.random()*Ea.length)],n=Sf*Math.pow(2,t/12);let r=Oa.get(n);r||(r=Rf(s,n),Oa.set(n,r));const i=s.createBufferSource();i.buffer=r;const o=s.createBiquadFilter();o.type="lowpass",o.frequency.value=Cf;const a=s.createGain();a.gain.value=Ma+Math.random()*(Ef-Ma);const l=s.createStereoPanner();l.pan.value=(Math.random()*2-1)*Mf,i.connect(o).connect(a).connect(l).connect(e),i.onended=()=>{i.disconnect(),o.disconnect(),a.disconnect(),l.disconnect()},i.start()}function Aa(s,e){const t=s.context.currentTime,n=s.gain;n.cancelScheduledValues(t),n.setValueAtTime(n.value,t),n.linearRampToValueAtTime(e,t+ec)}function tc(){us!==null&&(window.clearTimeout(us),us=null)}function nc(){tc(),us=window.setTimeout(()=>{$t&&Mn&&$t.ctx.state==="running"&&Lf($t),nc()},Ca+Math.random()*(wf-Ca))}function rc(s){s.classList.toggle("is-on",Mn);const e=Mn?"关闭环境音":"开启环境音";s.setAttribute("aria-label",e),s.setAttribute("aria-pressed",String(Mn)),s.title=e}function ic(){const s=window;return s.AudioContext??s.webkitAudioContext}async function zf(s){if(!$t){const n=ic();if(!n)return;$t=Df(new n)}Mn=!Mn,Vs++,rc(s);const{ctx:e,master:t}=$t;if(Mn)e.state!=="running"&&await e.resume().catch(()=>{}),Aa(t,uf),nc();else{Aa(t,0),tc();const n=Vs;window.setTimeout(()=>{$t&&!Mn&&n===Vs&&$t.ctx.state==="running"&&$t.ctx.suspend()},(ec+.1)*1e3)}}function If(){if(Pa||typeof document>"u")return;Pa=!0;const s=document.createElement("style");s.textContent=Pf,document.head.appendChild(s);const e=document.createElement("button");if(e.type="button",e.className="app-ambient-toggle",e.innerHTML=Of,document.body.appendChild(e),!ic()){e.disabled=!0,e.setAttribute("aria-label","环境音不可用"),e.title="当前浏览器不支持 Web Audio";return}rc(e),e.addEventListener("click",()=>{zf(e)}),document.addEventListener("visibilitychange",()=>{$t&&(document.hidden?$t.ctx.state==="running"&&$t.ctx.suspend():Mn&&$t.ctx.resume())})}const $f=.65,Nf=new xe(0,1,0),Ff={ra:0,dec:80};function Ra(s){return s=Me.clamp(s,0,1),s*s*(3-2*s)}function Nn(s,e){const t=new xe(...sn(s,e,1)),n=new ho().lookAt(new xe(0,0,0),t,Nf);return new Ut().setFromRotationMatrix(n)}function Da(s){if(s.gaze!=="target")return null;const e=s.target??Ff;return Nn(e.ra,e.dec)}class ks{constructor(e,t=$f){G(this,"keys");G(this,"hold");if(e.length<2)throw new Error("CameraRig 至少需要 2 个关键帧");this.hold=Me.clamp(t,0,.95);for(const[n,r]of e.entries()){if(!(r.radius>0))throw new Error(`关键帧 ${n}：radius 必须为正`);if(!(r.fov>10&&r.fov<140))throw new Error(`关键帧 ${n}：fov 非法（${r.fov}）`);if(r.gaze!=="free"&&r.gaze!=="target")throw new Error(`关键帧 ${n}：gaze 必须为 "free" | "target"`);const i=r.enter??0;if(i<0||i>=1)throw new Error(`关键帧 ${n}：enter 必须在 [0,1)（${i}）`);if(r.hold!==void 0&&(r.hold<0||r.hold>1))throw new Error(`关键帧 ${n}：hold 必须在 [0,1]（${r.hold}）`);if(n>0&&i>0){const o=e[n-1].hold??this.hold;if(o<1)throw new Error(`关键帧 ${n}：enter > 0 要求上一章 hold = 1（当前 ${o}）`)}}this.keys=e}get count(){return this.keys.length}sample(e,t){const n=this.keys.length,r=Math.min(Math.max(Math.floor(e),0),n-1),i=Me.clamp(t,0,1),o=this.keys[r],a=this.keys[Math.min(r+1,n-1)],l=o.enter??0;if(r>0&&l>0&&i<l)return ks.blend(this.keys[r-1],o,Ra(i/l));const c=o.hold??this.hold,u=r<n-1&&c<1?Ra((i-c)/(1-c)):0;return ks.blend(o,a,u)}sampleGlobal(e){const t=this.keys.length,n=Me.clamp(e,0,t),r=Math.min(Math.floor(n),t-1);return this.sample(r,n-r)}static blend(e,t,n){var d;const r=new xe(...e.dir??[0,1,0]).normalize(),i=new xe(...t.dir??[0,1,0]).normalize(),o=r.lerp(i,n).normalize(),a=Da(e),l=Da(t),c=Me.lerp(e.gaze==="target"?1:0,t.gaze==="target"?1:0,n);let u=null;return c>0&&(u=a&&l?a.clone().slerp(l,n):((d=a??l)==null?void 0:d.clone())??null),{radius:Me.lerp(e.radius,t.radius,n),dir:o,fov:Me.lerp(e.fov,t.fov,n),gazeBlend:c,gazeTargetQ:u,drift:Me.lerp(e.drift??0,t.drift??0,n),orbit:Me.lerp(e.orbit?1:0,t.orbit?1:0,n)}}}const Wi=.005,Bf=[{radius:Wi,fov:78,gaze:"free",drift:.012},{radius:Wi,fov:78,gaze:"free",hold:1},{radius:Wi,fov:65,gaze:"target",target:{ra:270,dec:8},enter:.3},{radius:Wi,fov:45,gaze:"target",target:{ra:175,dec:81}},{radius:3,dir:[.52,.7,.49],fov:50,gaze:"free",orbit:!0},{radius:3,dir:[.52,.7,.49],fov:50,gaze:"free",orbit:!0},{radius:3,dir:[0,.55,.84],fov:50,gaze:"free",orbit:!0},{radius:5,dir:[.52,.7,.49],fov:45,gaze:"free"}],Gf=.6,sc=.22,La=.55,Hf=14,Yf=`
.ch1-stage {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  user-select: none;
  padding: 0 6vw;
}
.ch1-eyebrow {
  font-size: 11px;
  letter-spacing: 0.42em;
  color: #fce1b6;
  opacity: 0.55;
  margin-bottom: 20px;
  text-transform: uppercase;
}
.ch1-title {
  font-family: "STSong", "SimSun", "Songti SC", serif;
  font-size: clamp(56px, 9vw, 110px);
  font-weight: 700;
  letter-spacing: ${sc}em;
  background: linear-gradient(160deg, #f2dd9a 15%, #c9a227 55%, #8f7019 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  opacity: 0;
  margin-bottom: 24px;
  will-change: opacity, letter-spacing, filter, transform;
}
.ch1-hook {
  font-size: 17px;
  letter-spacing: 0.2em;
  line-height: 2;
  color: #fce1b6;
  max-width: 34em;
  margin-bottom: 14px;
  opacity: 0;
}
.ch1-body {
  max-width: 34em;
  opacity: 0;
}
.ch1-body p {
  font-size: 15px;
  line-height: 2;
  letter-spacing: 0.06em;
  color: #fce1b6;
  opacity: 0.88;
}
.ch1-seal {
  margin-top: 32px;
  width: 46px;
  height: 46px;
  border-radius: 4px;
  background: linear-gradient(150deg, #b1402f 0%, #8e2f22 100%);
  color: #f6e8d8;
  font-family: "STSong", "SimSun", "Songti SC", serif;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(142, 47, 34, 0.45), inset 0 0 6px rgba(0, 0, 0, 0.25);
  opacity: 0;
}
.ch1-cue {
  position: absolute;
  bottom: 36px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  letter-spacing: 0.3em;
  color: #fce1b6;
  white-space: nowrap;
  opacity: 0;
  animation: ch1-cue-float 2.4s ease-in-out infinite;
}
@keyframes ch1-cue-float {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(8px); }
}
`;let za=!1;function qf(){if(za||typeof document>"u")return;const s=document.createElement("style");s.dataset.ch1="",s.textContent=Yf,document.head.appendChild(s),za=!0}function Jr(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Wf(s){return s<0?0:s>1?1:s}function ei(s,e,t){const n=Wf((s-e)/(t-e));return n*n*(3-2*n)}function Xf(s){qf();const e=s.root.querySelector(".pin"),{copy:t}=s,n=document.createElement("div");n.className="ch1-stage",n.innerHTML=`
    <p class="ch1-eyebrow">${Jr(t.eyebrow)}</p>
    <h1 class="ch1-title">${Jr(t.title)}</h1>
    <p class="ch1-hook">${Jr(t.hook)}</p>
    <div class="ch1-body">${t.body.map(g=>`<p>${Jr(g)}</p>`).join("")}</div>
    ${t.seal?`<div class="ch1-seal">${Jr(t.seal)}</div>`:""}
  `,e.appendChild(n);const r=document.createElement("div");r.className="ch1-cue",r.textContent="向下滚动 · 步入夜空",e.appendChild(r);const i=n.querySelector(".ch1-title"),o=n.querySelector(".ch1-hook"),a=n.querySelector(".ch1-body"),l=n.querySelector(".ch1-seal");let c=-1,u=-1;const d=new Map;function p(g){Math.abs(g-c)<1e-4||(c=g,i.style.opacity=g.toFixed(3),i.style.letterSpacing=(La-(La-sc)*g).toFixed(3)+"em",i.style.filter=`blur(${((1-g)*Hf).toFixed(2)}px) drop-shadow(0 0 26px rgba(201, 162, 39, 0.45))`,i.style.transform=`translateY(${((1-g)*26).toFixed(2)}px)`)}function f(g,h,m=18){const S=d.get(g);S!==void 0&&Math.abs(S-h)<1e-4||(d.set(g,h),g.style.opacity=h.toFixed(3),g.style.transform=`translateY(${((1-h)*m).toFixed(2)}px)`)}return{enter(){s.sky.setLabelsEnabled(!1)},update(g){if(p(ei(g,0,Gf)),f(o,ei(g,.15,.45)),f(a,ei(g,.3,.6)),l){const m=ei(g,.45,.75),S=d.get(l);(S===void 0||Math.abs(S-m)>=1e-4)&&(d.set(l,m),l.style.opacity=m.toFixed(3),l.style.transform=`translateY(${((1-m)*10).toFixed(2)}px) scale(${(1.3-.3*m).toFixed(3)})`)}const h=.65*(1-ei(g,0,.35));(Math.abs(h-u)>=1e-4||u<0)&&(u=h,r.style.opacity=h.toFixed(3))},exit(){s.sky.setLabelsEnabled(!0)}}}const Vf=Object.freeze(Object.defineProperty({__proto__:null,createChapter:Xf},Symbol.toStringTag,{value:"Module"}));function kn(s){if(s===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return s}function oc(s,e){s.prototype=Object.create(e.prototype),s.prototype.constructor=s,s.__proto__=e}/*!
 * GSAP 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Yt={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Ai={duration:.5,overwrite:!1,delay:0},Vo,it,Pe,Zt=1e8,be=1/Zt,po=Math.PI*2,jf=po/4,Uf=0,ac=Math.sqrt,Qf=Math.cos,Kf=Math.sin,et=function(e){return typeof e=="string"},Ne=function(e){return typeof e=="function"},An=function(e){return typeof e=="number"},jo=function(e){return typeof e>"u"},yn=function(e){return typeof e=="object"},Et=function(e){return e!==!1},Uo=function(){return typeof window<"u"},Xi=function(e){return Ne(e)||et(e)},lc=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},pt=Array.isArray,Zf=/random\([^)]+\)/g,Jf=/,\s*/g,Ia=/(?:-?\.?\d|\.)+/gi,cc=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Dr=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,js=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,uc=/[+-]=-?[.\d]+/,eh=/[^,'"\[\]\s]+/gi,th=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Le,fn,go,Qo,qt={},Ts={},fc,hc=function(e){return(Ts=Wr(e,qt))&&At},Ko=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},Ri=function(e,t){return!t&&console.warn(e)},dc=function(e,t){return e&&(qt[e]=t)&&Ts&&(Ts[e]=t)||qt},Di=function(){return 0},nh={suppressEvents:!0,isStart:!0,kill:!1},fs={suppressEvents:!0,kill:!1},rh={suppressEvents:!0},Zo={},qn=[],_o={},pc,It={},Us={},$a=30,hs=[],Jo="",ea=function(e){var t=e[0],n,r;if(yn(t)||Ne(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(r=hs.length;r--&&!hs[r].targetTest(t););n=hs[r]}for(r=e.length;r--;)e[r]&&(e[r]._gsap||(e[r]._gsap=new Ic(e[r],n)))||e.splice(r,1);return e},ur=function(e){return e._gsap||ea(Jt(e))[0]._gsap},gc=function(e,t,n){return(n=e[t])&&Ne(n)?e[t]():jo(n)&&e.getAttribute&&e.getAttribute(t)||n},Mt=function(e,t){return(e=e.split(",")).forEach(t)||e},Be=function(e){return Math.round(e*1e5)/1e5||0},De=function(e){return Math.round(e*1e7)/1e7||0},$r=function(e,t){var n=t.charAt(0),r=parseFloat(t.substr(2));return e=parseFloat(e),n==="+"?e+r:n==="-"?e-r:n==="*"?e*r:e/r},ih=function(e,t){for(var n=t.length,r=0;e.indexOf(t[r])<0&&++r<n;);return r<n},Cs=function(){var e=qn.length,t=qn.slice(0),n,r;for(_o={},qn.length=0,n=0;n<e;n++)r=t[n],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},ta=function(e){return!!(e._initted||e._startAt||e.add)},_c=function(e,t,n,r){qn.length&&!it&&Cs(),e.render(t,n,!!(it&&t<0&&ta(e))),qn.length&&!it&&Cs()},mc=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(eh).length<2?t:et(e)?e.trim():e},yc=function(e){return e},Wt=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},sh=function(e){return function(t,n){for(var r in n)r in t||r==="duration"&&e||r==="ease"||(t[r]=n[r])}},Wr=function(e,t){for(var n in t)e[n]=t[n];return e},Na=function s(e,t){for(var n in t)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(e[n]=yn(t[n])?s(e[n]||(e[n]={}),t[n]):t[n]);return e},Es=function(e,t){var n={},r;for(r in e)r in t||(n[r]=e[r]);return n},bi=function(e){var t=e.parent||Le,n=e.keyframes?sh(pt(e.keyframes)):Wt;if(Et(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},oh=function(e,t){for(var n=e.length,r=n===t.length;r&&n--&&e[n]===t[n];);return n<0},bc=function(e,t,n,r,i){var o=e[r],a;if(i)for(a=t[i];o&&o[i]>a;)o=o._prev;return o?(t._next=o._next,o._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[r]=t,t._prev=o,t.parent=t._dp=e,t},Gs=function(e,t,n,r){n===void 0&&(n="_first"),r===void 0&&(r="_last");var i=t._prev,o=t._next;i?i._next=o:e[n]===t&&(e[n]=o),o?o._prev=i:e[r]===t&&(e[r]=i),t._next=t._prev=t.parent=null},Vn=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},fr=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},ah=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},mo=function(e,t,n,r){return e._startAt&&(it?e._startAt.revert(fs):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,r))},lh=function s(e){return!e||e._ts&&s(e.parent)},Fa=function(e){return e._repeat?Xr(e._tTime,e=e.duration()+e._rDelay)*e:0},Xr=function(e,t){var n=Math.floor(e=De(e/t));return e&&n===e?n-1:n},Ms=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},Hs=function(e){return e._end=De(e._start+(e._tDur/Math.abs(e._ts||e._rts||be)||0))},Ys=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=De(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),Hs(e),n._dirty||fr(n,e)),e},vc=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=Ms(e.rawTime(),t),(!t._dur||Hi(0,t.totalDuration(),n)-t._tTime>be)&&t.render(n,!0)),fr(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-be}},pn=function(e,t,n,r){return t.parent&&Vn(t),t._start=De((An(n)?n:n||e!==Le?jt(e,n,t):e._time)+t._delay),t._end=De(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),bc(e,t,"_first","_last",e._sort?"_start":0),yo(t)||(e._recent=t),r||vc(e,t),e._ts<0&&Ys(e,e._tTime),e},xc=function(e,t){return(qt.ScrollTrigger||Ko("scrollTrigger",t))&&qt.ScrollTrigger.create(t,e)},wc=function(e,t,n,r,i){if(ra(e,t,i),!e._initted)return 1;if(!n&&e._pt&&!it&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&pc!==Ft.frame)return qn.push(e),e._lazy=[i,r],1},ch=function s(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||s(t))},yo=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},uh=function(e,t,n,r){var i=e.ratio,o=t<0||!t&&(!e._start&&ch(e)&&!(!e._initted&&yo(e))||(e._ts<0||e._dp._ts<0)&&!yo(e))?0:1,a=e._rDelay,l=0,c,u,d;if(a&&e._repeat&&(l=Hi(0,e._tDur,t),u=Xr(l,a),e._yoyo&&u&1&&(o=1-o),u!==Xr(e._tTime,a)&&(i=1-o,e.vars.repeatRefresh&&e._initted&&e.invalidate())),o!==i||it||r||e._zTime===be||!t&&e._zTime){if(!e._initted&&wc(e,t,r,n,l))return;for(d=e._zTime,e._zTime=t||(n?be:0),n||(n=t&&!d),e.ratio=o,e._from&&(o=1-o),e._time=0,e._tTime=l,c=e._pt;c;)c.r(o,c.d),c=c._next;t<0&&mo(e,t,n,!0),e._onUpdate&&!n&&Gt(e,"onUpdate"),l&&e._repeat&&!n&&e.parent&&Gt(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===o&&(o&&Vn(e,1),!n&&!it&&(Gt(e,o?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},fh=function(e,t,n){var r;if(n>t)for(r=e._first;r&&r._start<=n;){if(r.data==="isPause"&&r._start>t)return r;r=r._next}else for(r=e._last;r&&r._start>=n;){if(r.data==="isPause"&&r._start<t)return r;r=r._prev}},Vr=function(e,t,n,r){var i=e._repeat,o=De(t)||0,a=e._tTime/e._tDur;return a&&!r&&(e._time*=o/e._dur),e._dur=o,e._tDur=i?i<0?1e10:De(o*(i+1)+e._rDelay*i):o,a>0&&!r&&Ys(e,e._tTime=e._tDur*a),e.parent&&Hs(e),n||fr(e.parent,e),e},Ba=function(e){return e instanceof Ct?fr(e):Vr(e,e._dur)},hh={_start:0,endTime:Di,totalDuration:Di},jt=function s(e,t,n){var r=e.labels,i=e._recent||hh,o=e.duration()>=Zt?i.endTime(!1):e._dur,a,l,c;return et(t)&&(isNaN(t)||t in r)?(l=t.charAt(0),c=t.substr(-1)==="%",a=t.indexOf("="),l==="<"||l===">"?(a>=0&&(t=t.replace(/=/,"")),(l==="<"?i._start:i.endTime(i._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(a<0?i:n).totalDuration()/100:1)):a<0?(t in r||(r[t]=o),r[t]):(l=parseFloat(t.charAt(a-1)+t.substr(a+1)),c&&n&&(l=l/100*(pt(n)?n[0]:n).totalDuration()),a>1?s(e,t.substr(0,a-1),n)+l:o+l)):t==null?o:+t},vi=function(e,t,n){var r=An(t[1]),i=(r?2:1)+(e<2?0:1),o=t[i],a,l;if(r&&(o.duration=t[1]),o.parent=n,e){for(a=o,l=n;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=Et(l.vars.inherit)&&l.parent;o.immediateRender=Et(a.immediateRender),e<2?o.runBackwards=1:o.startAt=t[i-1]}return new We(t[0],o,t[i+1])},Zn=function(e,t){return e||e===0?t(e):t},Hi=function(e,t,n){return n<e?e:n>t?t:n},ht=function(e,t){return!et(e)||!(t=th.exec(e))?"":t[1]},dh=function(e,t,n){return Zn(n,function(r){return Hi(e,t,r)})},bo=[].slice,Sc=function(e,t){return e&&yn(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&yn(e[0]))&&!e.nodeType&&e!==fn},ph=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(r){var i;return et(r)&&!t||Sc(r,1)?(i=n).push.apply(i,Jt(r)):n.push(r)})||n},Jt=function(e,t,n){return Pe&&!t&&Pe.selector?Pe.selector(e):et(e)&&!n&&(go||!jr())?bo.call((t||Qo).querySelectorAll(e),0):pt(e)?ph(e,n):Sc(e)?bo.call(e,0):e?[e]:[]},vo=function(e){return e=Jt(e)[0]||Ri("Invalid scope")||{},function(t){var n=e.current||e.nativeElement||e;return Jt(t,n.querySelectorAll?n:n===e?Ri("Invalid scope")||Qo.createElement("div"):e)}},kc=function(e){return e.sort(function(){return .5-Math.random()})},Tc=function(e){if(Ne(e))return e;var t=yn(e)?e:{each:e},n=hr(t.ease),r=t.from||0,i=parseFloat(t.base)||0,o={},a=r>0&&r<1,l=isNaN(r)||a,c=t.axis,u=r,d=r;return et(r)?u=d={center:.5,edges:.5,end:1}[r]||0:!a&&l&&(u=r[0],d=r[1]),function(p,f,g){var h=(g||t).length,m=o[h],S,b,x,v,w,O,T,R,C;if(!m){if(C=t.grid==="auto"?0:(t.grid||[1,Zt])[1],!C){for(T=-Zt;T<(T=g[C++].getBoundingClientRect().left)&&C<h;);C<h&&C--}for(m=o[h]=[],S=l?Math.min(C,h)*u-.5:r%C,b=C===Zt?0:l?h*d/C-.5:r/C|0,T=0,R=Zt,O=0;O<h;O++)x=O%C-S,v=b-(O/C|0),m[O]=w=c?Math.abs(c==="y"?v:x):ac(x*x+v*v),w>T&&(T=w),w<R&&(R=w);r==="random"&&kc(m),m.max=T-R,m.min=R,m.v=h=(parseFloat(t.amount)||parseFloat(t.each)*(C>h?h-1:c?c==="y"?h/C:C:Math.max(C,h/C))||0)*(r==="edges"?-1:1),m.b=h<0?i-h:i,m.u=ht(t.amount||t.each)||0,n=n&&h<0?Eh(n):n}return h=(m[p]-m.min)/m.max||0,De(m.b+(n?n(h):h)*m.v)+m.u}},xo=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(n){var r=De(Math.round(parseFloat(n)/e)*e*t);return(r-r%1)/t+(An(n)?0:ht(n))}},Cc=function(e,t){var n=pt(e),r,i;return!n&&yn(e)&&(r=n=e.radius||Zt,e.values?(e=Jt(e.values),(i=!An(e[0]))&&(r*=r)):e=xo(e.increment)),Zn(t,n?Ne(e)?function(o){return i=e(o),Math.abs(i-o)<=r?i:o}:function(o){for(var a=parseFloat(i?o.x:o),l=parseFloat(i?o.y:0),c=Zt,u=0,d=e.length,p,f;d--;)i?(p=e[d].x-a,f=e[d].y-l,p=p*p+f*f):p=Math.abs(e[d]-a),p<c&&(c=p,u=d);return u=!r||c<=r?e[u]:o,i||u===o||An(o)?u:u+ht(o)}:xo(e))},Ec=function(e,t,n,r){return Zn(pt(e)?!t:n===!0?!!(n=0):!r,function(){return pt(e)?e[~~(Math.random()*e.length)]:(n=n||1e-5)&&(r=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*r)/r})},gh=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(r){return t.reduce(function(i,o){return o(i)},r)}},_h=function(e,t){return function(n){return e(parseFloat(n))+(t||ht(n))}},mh=function(e,t,n){return Pc(e,t,0,1,n)},Mc=function(e,t,n){return Zn(n,function(r){return e[~~t(r)]})},yh=function s(e,t,n){var r=t-e;return pt(e)?Mc(e,s(0,e.length),t):Zn(n,function(i){return(r+(i-e)%r)%r+e})},bh=function s(e,t,n){var r=t-e,i=r*2;return pt(e)?Mc(e,s(0,e.length-1),t):Zn(n,function(o){return o=(i+(o-e)%i)%i||0,e+(o>r?i-o:o)})},Li=function(e){return e.replace(Zf,function(t){var n=t.indexOf("[")+1,r=t.substring(n||7,n?t.indexOf("]"):t.length-1).split(Jf);return Ec(n?r:+r[0],n?0:+r[1],+r[2]||1e-5)})},Pc=function(e,t,n,r,i){var o=t-e,a=r-n;return Zn(i,function(l){return n+((l-e)/o*a||0)})},vh=function s(e,t,n,r){var i=isNaN(e+t)?0:function(f){return(1-f)*e+f*t};if(!i){var o=et(e),a={},l,c,u,d,p;if(n===!0&&(r=1)&&(n=null),o)e={p:e},t={p:t};else if(pt(e)&&!pt(t)){for(u=[],d=e.length,p=d-2,c=1;c<d;c++)u.push(s(e[c-1],e[c]));d--,i=function(g){g*=d;var h=Math.min(p,~~g);return u[h](g-h)},n=t}else r||(e=Wr(pt(e)?[]:{},e));if(!u){for(l in t)na.call(a,e,l,"get",t[l]);i=function(g){return oa(g,a)||(o?e.p:e)}}}return Zn(n,i)},Ga=function(e,t,n){var r=e.labels,i=Zt,o,a,l;for(o in r)a=r[o]-t,a<0==!!n&&a&&i>(a=Math.abs(a))&&(l=o,i=a);return l},Gt=function(e,t,n){var r=e.vars,i=r[t],o=Pe,a=e._ctx,l,c,u;if(i)return l=r[t+"Params"],c=r.callbackScope||e,n&&qn.length&&Cs(),a&&(Pe=a),u=l?i.apply(c,l):i.call(c),Pe=o,u},hi=function(e){return Vn(e),e.scrollTrigger&&e.scrollTrigger.kill(!!it),e.progress()<1&&Gt(e,"onInterrupt"),e},Lr,Oc=[],Ac=function(e){if(e)if(e=!e.name&&e.default||e,Uo()||e.headless){var t=e.name,n=Ne(e),r=t&&!n&&e.init?function(){this._props=[]}:e,i={init:Di,render:oa,add:na,kill:$h,modifier:Ih,rawVars:0},o={targetTest:0,get:0,getSetter:sa,aliases:{},register:0};if(jr(),e!==r){if(It[t])return;Wt(r,Wt(Es(e,i),o)),Wr(r.prototype,Wr(i,Es(e,o))),It[r.prop=t]=r,e.targetTest&&(hs.push(r),Zo[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}dc(t,r),e.register&&e.register(At,r,Pt)}else Oc.push(e)},ye=255,di={aqua:[0,ye,ye],lime:[0,ye,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,ye],navy:[0,0,128],white:[ye,ye,ye],olive:[128,128,0],yellow:[ye,ye,0],orange:[ye,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[ye,0,0],pink:[ye,192,203],cyan:[0,ye,ye],transparent:[ye,ye,ye,0]},Qs=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*ye+.5|0},Rc=function(e,t,n){var r=e?An(e)?[e>>16,e>>8&ye,e&ye]:0:di.black,i,o,a,l,c,u,d,p,f,g;if(!r){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),di[e])r=di[e];else if(e.charAt(0)==="#"){if(e.length<6&&(i=e.charAt(1),o=e.charAt(2),a=e.charAt(3),e="#"+i+i+o+o+a+a+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return r=parseInt(e.substr(1,6),16),[r>>16,r>>8&ye,r&ye,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),r=[e>>16,e>>8&ye,e&ye]}else if(e.substr(0,3)==="hsl"){if(r=g=e.match(Ia),!t)l=+r[0]%360/360,c=+r[1]/100,u=+r[2]/100,o=u<=.5?u*(c+1):u+c-u*c,i=u*2-o,r.length>3&&(r[3]*=1),r[0]=Qs(l+1/3,i,o),r[1]=Qs(l,i,o),r[2]=Qs(l-1/3,i,o);else if(~e.indexOf("="))return r=e.match(cc),n&&r.length<4&&(r[3]=1),r}else r=e.match(Ia)||di.transparent;r=r.map(Number)}return t&&!g&&(i=r[0]/ye,o=r[1]/ye,a=r[2]/ye,d=Math.max(i,o,a),p=Math.min(i,o,a),u=(d+p)/2,d===p?l=c=0:(f=d-p,c=u>.5?f/(2-d-p):f/(d+p),l=d===i?(o-a)/f+(o<a?6:0):d===o?(a-i)/f+2:(i-o)/f+4,l*=60),r[0]=~~(l+.5),r[1]=~~(c*100+.5),r[2]=~~(u*100+.5)),n&&r.length<4&&(r[3]=1),r},Dc=function(e){var t=[],n=[],r=-1;return e.split(Wn).forEach(function(i){var o=i.match(Dr)||[];t.push.apply(t,o),n.push(r+=o.length+1)}),t.c=n,t},Ha=function(e,t,n){var r="",i=(e+r).match(Wn),o=t?"hsla(":"rgba(",a=0,l,c,u,d;if(!i)return e;if(i=i.map(function(p){return(p=Rc(p,t,1))&&o+(t?p[0]+","+p[1]+"%,"+p[2]+"%,"+p[3]:p.join(","))+")"}),n&&(u=Dc(e),l=n.c,l.join(r)!==u.c.join(r)))for(c=e.replace(Wn,"1").split(Dr),d=c.length-1;a<d;a++)r+=c[a]+(~l.indexOf(a)?i.shift()||o+"0,0,0,0)":(u.length?u:i.length?i:n).shift());if(!c)for(c=e.split(Wn),d=c.length-1;a<d;a++)r+=c[a]+i[a];return r+c[d]},Wn=function(){var s="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in di)s+="|"+e+"\\b";return new RegExp(s+")","gi")}(),xh=/hsl[a]?\(/,Lc=function(e){var t=e.join(" "),n;if(Wn.lastIndex=0,Wn.test(t))return n=xh.test(t),e[1]=Ha(e[1],n),e[0]=Ha(e[0],n,Dc(e[1])),!0},zi,Ft=function(){var s=Date.now,e=500,t=33,n=s(),r=n,i=1e3/240,o=i,a=[],l,c,u,d,p,f,g=function h(m){var S=s()-r,b=m===!0,x,v,w,O;if((S>e||S<0)&&(n+=S-t),r+=S,w=r-n,x=w-o,(x>0||b)&&(O=++d.frame,p=w-d.time*1e3,d.time=w=w/1e3,o+=x+(x>=i?4:i-x),v=1),b||(l=c(h)),v)for(f=0;f<a.length;f++)a[f](w,p,O,m)};return d={time:0,frame:0,tick:function(){g(!0)},deltaRatio:function(m){return p/(1e3/(m||60))},wake:function(){fc&&(!go&&Uo()&&(fn=go=window,Qo=fn.document||{},qt.gsap=At,(fn.gsapVersions||(fn.gsapVersions=[])).push(At.version),hc(Ts||fn.GreenSockGlobals||!fn.gsap&&fn||{}),Oc.forEach(Ac)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&d.sleep(),c=u||function(m){return setTimeout(m,o-d.time*1e3+1|0)},zi=1,g(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),zi=0,c=Di},lagSmoothing:function(m,S){e=m||1/0,t=Math.min(S||33,e)},fps:function(m){i=1e3/(m||240),o=d.time*1e3+i},add:function(m,S,b){var x=S?function(v,w,O,T){m(v,w,O,T),d.remove(x)}:m;return d.remove(m),a[b?"unshift":"push"](x),jr(),x},remove:function(m,S){~(S=a.indexOf(m))&&a.splice(S,1)&&f>=S&&f--},_listeners:a},d}(),jr=function(){return!zi&&Ft.wake()},ce={},wh=/^[\d.\-M][\d.\-,\s]/,Sh=/["']/g,kh=function(e){for(var t={},n=e.substr(1,e.length-3).split(":"),r=n[0],i=1,o=n.length,a,l,c;i<o;i++)l=n[i],a=i!==o-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),t[r]=isNaN(c)?c.replace(Sh,"").trim():+c,r=l.substr(a+1).trim();return t},Th=function(e){var t=e.indexOf("(")+1,n=e.indexOf(")"),r=e.indexOf("(",t);return e.substring(t,~r&&r<n?e.indexOf(")",n+1):n)},Ch=function(e){var t=(e+"").split("("),n=ce[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf("{")?[kh(t[1])]:Th(e).split(",").map(mc)):ce._CE&&wh.test(e)?ce._CE("",e):n},Eh=function(e){return function(t){return 1-e(1-t)}},hr=function(e,t){return e&&(Ne(e)?e:ce[e]||Ch(e))||t},Sr=function(e,t,n,r){n===void 0&&(n=function(l){return 1-t(1-l)}),r===void 0&&(r=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var i={easeIn:t,easeOut:n,easeInOut:r},o;return Mt(e,function(a){ce[a]=qt[a]=i,ce[o=a.toLowerCase()]=n;for(var l in i)ce[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=ce[a+"."+l]=i[l]}),i},zc=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},Ks=function s(e,t,n){var r=t>=1?t:1,i=(n||(e?.3:.45))/(t<1?t:1),o=i/po*(Math.asin(1/r)||0),a=function(u){return u===1?1:r*Math.pow(2,-10*u)*Kf((u-o)*i)+1},l=e==="out"?a:e==="in"?function(c){return 1-a(1-c)}:zc(a);return i=po/i,l.config=function(c,u){return s(e,c,u)},l},Zs=function s(e,t){t===void 0&&(t=1.70158);var n=function(o){return o?--o*o*((t+1)*o+t)+1:0},r=e==="out"?n:e==="in"?function(i){return 1-n(1-i)}:zc(n);return r.config=function(i){return s(e,i)},r};Mt("Linear,Quad,Cubic,Quart,Quint,Strong",function(s,e){var t=e<5?e+1:e;Sr(s+",Power"+(t-1),e?function(n){return Math.pow(n,t)}:function(n){return n},function(n){return 1-Math.pow(1-n,t)},function(n){return n<.5?Math.pow(n*2,t)/2:1-Math.pow((1-n)*2,t)/2})});ce.Linear.easeNone=ce.none=ce.Linear.easeIn;Sr("Elastic",Ks("in"),Ks("out"),Ks());(function(s,e){var t=1/e,n=2*t,r=2.5*t,i=function(a){return a<t?s*a*a:a<n?s*Math.pow(a-1.5/e,2)+.75:a<r?s*(a-=2.25/e)*a+.9375:s*Math.pow(a-2.625/e,2)+.984375};Sr("Bounce",function(o){return 1-i(1-o)},i)})(7.5625,2.75);Sr("Expo",function(s){return Math.pow(2,10*(s-1))*s+s*s*s*s*s*s*(1-s)});Sr("Circ",function(s){return-(ac(1-s*s)-1)});Sr("Sine",function(s){return s===1?1:-Qf(s*jf)+1});Sr("Back",Zs("in"),Zs("out"),Zs());ce.SteppedEase=ce.steps=qt.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,r=e+(t?0:1),i=t?1:0,o=1-be;return function(a){return((r*Hi(0,o,a)|0)+i)*n}}};Ai.ease=ce["quad.out"];Mt("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(s){return Jo+=s+","+s+"Params,"});var Ic=function(e,t){this.id=Uf++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:gc,this.set=t?t.getSetter:sa},Ii=function(){function s(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,Vr(this,+t.duration,1,1),this.data=t.data,Pe&&(this._ctx=Pe,Pe.data.push(this)),zi||Ft.wake()}var e=s.prototype;return e.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},e.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},e.totalDuration=function(n){return arguments.length?(this._dirty=0,Vr(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(n,r){if(jr(),!arguments.length)return this._tTime;var i=this._dp;if(i&&i.smoothChildTiming&&this._ts){for(Ys(this,n),!i._dp||i.parent||vc(i,this);i&&i.parent;)i.parent._time!==i._start+(i._ts>=0?i._tTime/i._ts:(i.totalDuration()-i._tTime)/-i._ts)&&i.totalTime(i._tTime,!0),i=i.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&pn(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!r||this._initted&&Math.abs(this._zTime)===be||!this._initted&&this._dur&&n||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),_c(this,n,r)),this},e.time=function(n,r){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+Fa(this))%(this._dur+this._rDelay)||(n?this._dur:0),r):this._time},e.totalProgress=function(n,r){return arguments.length?this.totalTime(this.totalDuration()*n,r):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(n,r){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+Fa(this),r):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(n,r){var i=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*i,r):this._repeat?Xr(this._tTime,i)+1:1},e.timeScale=function(n,r){if(!arguments.length)return this._rts===-be?0:this._rts;if(this._rts===n)return this;var i=this.parent&&this._ts?Ms(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-be?0:this._rts,this.totalTime(Hi(-Math.abs(this._delay),this.totalDuration(),i),r!==!1),Hs(this),ah(this)},e.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(jr(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==be&&(this._tTime-=be)))),this):this._ps},e.startTime=function(n){if(arguments.length){this._start=De(n);var r=this.parent||this._dp;return r&&(r._sort||!this.parent)&&pn(r,this,this._start-this._delay),this}return this._start},e.endTime=function(n){return this._start+(Et(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(n){var r=this.parent||this._dp;return r?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Ms(r.rawTime(n),this):this._tTime:this._tTime},e.revert=function(n){n===void 0&&(n=rh);var r=it;return it=n,ta(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),it=r,this},e.globalTime=function(n){for(var r=this,i=arguments.length?n:r.rawTime();r;)i=r._start+i/(Math.abs(r._ts)||1),r=r._dp;return!this.parent&&this._sat?this._sat.globalTime(n):i},e.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,Ba(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(n){if(arguments.length){var r=this._time;return this._rDelay=n,Ba(this),r?this.time(r):this}return this._rDelay},e.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},e.seek=function(n,r){return this.totalTime(jt(this,n),Et(r))},e.restart=function(n,r){return this.play().totalTime(n?-this._delay:0,Et(r)),this._dur||(this._zTime=-be),this},e.play=function(n,r){return n!=null&&this.seek(n,r),this.reversed(!1).paused(!1)},e.reverse=function(n,r){return n!=null&&this.seek(n||this.totalDuration(),r),this.reversed(!0).paused(!1)},e.pause=function(n,r){return n!=null&&this.seek(n,r),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-be:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-be,this},e.isActive=function(){var n=this.parent||this._dp,r=this._start,i;return!!(!n||this._ts&&this._initted&&n.isActive()&&(i=n.rawTime(!0))>=r&&i<this.endTime(!0)-be)},e.eventCallback=function(n,r,i){var o=this.vars;return arguments.length>1?(r?(o[n]=r,i&&(o[n+"Params"]=i),n==="onUpdate"&&(this._onUpdate=r)):delete o[n],this):o[n]},e.then=function(n){var r=this,i=r._prom;return new Promise(function(o){var a=Ne(n)?n:yc,l=function(){var u=r.then;r.then=null,i&&i(),Ne(a)&&(a=a(r))&&(a.then||a===r)&&(r.then=u),o(a),r.then=u};r._initted&&r.totalProgress()===1&&r._ts>=0||!r._tTime&&r._ts<0?l():r._prom=l})},e.kill=function(){hi(this)},s}();Wt(Ii.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-be,_prom:0,_ps:!1,_rts:1});var Ct=function(s){oc(e,s);function e(n,r){var i;return n===void 0&&(n={}),i=s.call(this,n)||this,i.labels={},i.smoothChildTiming=!!n.smoothChildTiming,i.autoRemoveChildren=!!n.autoRemoveChildren,i._sort=Et(n.sortChildren),Le&&pn(n.parent||Le,kn(i),r),n.reversed&&i.reverse(),n.paused&&i.paused(!0),n.scrollTrigger&&xc(kn(i),n.scrollTrigger),i}var t=e.prototype;return t.to=function(r,i,o){return vi(0,arguments,this),this},t.from=function(r,i,o){return vi(1,arguments,this),this},t.fromTo=function(r,i,o,a){return vi(2,arguments,this),this},t.set=function(r,i,o){return i.duration=0,i.parent=this,bi(i).repeatDelay||(i.repeat=0),i.immediateRender=!!i.immediateRender,new We(r,i,jt(this,o),1),this},t.call=function(r,i,o){return pn(this,We.delayedCall(0,r,i),o)},t.staggerTo=function(r,i,o,a,l,c,u){return o.duration=i,o.stagger=o.stagger||a,o.onComplete=c,o.onCompleteParams=u,o.parent=this,new We(r,o,jt(this,l)),this},t.staggerFrom=function(r,i,o,a,l,c,u){return o.runBackwards=1,bi(o).immediateRender=Et(o.immediateRender),this.staggerTo(r,i,o,a,l,c,u)},t.staggerFromTo=function(r,i,o,a,l,c,u,d){return a.startAt=o,bi(a).immediateRender=Et(a.immediateRender),this.staggerTo(r,i,a,l,c,u,d)},t.render=function(r,i,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=r<=0?0:De(r),d=this._zTime<0!=r<0&&(this._initted||!c),p,f,g,h,m,S,b,x,v,w,O,T;if(this!==Le&&u>l&&r>=0&&(u=l),u!==this._tTime||o||d){if(a!==this._time&&c&&(u+=this._time-a,r+=this._time-a),p=u,v=this._start,x=this._ts,S=!x,d&&(c||(a=this._zTime),(r||!i)&&(this._zTime=r)),this._repeat){if(O=this._yoyo,m=c+this._rDelay,this._repeat<-1&&r<0)return this.totalTime(m*100+r,i,o);if(p=De(u%m),u===l?(h=this._repeat,p=c):(w=De(u/m),h=~~w,h&&h===w&&(p=c,h--),p>c&&(p=c)),w=Xr(this._tTime,m),!a&&this._tTime&&w!==h&&this._tTime-w*m-this._dur<=0&&(w=h),O&&h&1&&(p=c-p,T=1),h!==w&&!this._lock){var R=O&&w&1,C=R===(O&&h&1);if(h<w&&(R=!R),a=R?0:u%c?c:u,this._lock=1,this.render(a||(T?0:De(h*m)),i,!c)._lock=0,this._tTime=u,!i&&this.parent&&Gt(this,"onRepeat"),this.vars.repeatRefresh&&!T&&(this.invalidate()._lock=1,w=h),a&&a!==this._time||S!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,C&&(this._lock=2,a=R?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!T&&this.invalidate()),this._lock=0,!this._ts&&!S)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(b=fh(this,De(a),De(p)),b&&(u-=p-(p=b._start))),this._tTime=u,this._time=p,this._act=!!x,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=r,a=0),!a&&u&&c&&!i&&!w&&(Gt(this,"onStart"),this._tTime!==u))return this;if(p>=a&&r>=0)for(f=this._first;f;){if(g=f._next,(f._act||p>=f._start)&&f._ts&&b!==f){if(f.parent!==this)return this.render(r,i,o);if(f.render(f._ts>0?(p-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(p-f._start)*f._ts,i,o),p!==this._time||!this._ts&&!S){b=0,g&&(u+=this._zTime=-be);break}}f=g}else{f=this._last;for(var A=r<0?r:p;f;){if(g=f._prev,(f._act||A<=f._end)&&f._ts&&b!==f){if(f.parent!==this)return this.render(r,i,o);if(f.render(f._ts>0?(A-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(A-f._start)*f._ts,i,o||it&&ta(f)),p!==this._time||!this._ts&&!S){b=0,g&&(u+=this._zTime=A?-be:be);break}}f=g}}if(b&&!i&&(this.pause(),b.render(p>=a?0:-be)._zTime=p>=a?1:-1,this._ts))return this._start=v,Hs(this),this.render(r,i,o);this._onUpdate&&!i&&Gt(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&a)&&(v===this._start||Math.abs(x)!==Math.abs(this._ts))&&(this._lock||((r||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&Vn(this,1),!i&&!(r<0&&!a)&&(u||a||!l)&&(Gt(this,u===l&&r>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(r,i){var o=this;if(An(i)||(i=jt(this,i,r)),!(r instanceof Ii)){if(pt(r))return r.forEach(function(a){return o.add(a,i)}),this;if(et(r))return this.addLabel(r,i);if(Ne(r))r=We.delayedCall(0,r);else return this}return this!==r?pn(this,r,i):this},t.getChildren=function(r,i,o,a){r===void 0&&(r=!0),i===void 0&&(i=!0),o===void 0&&(o=!0),a===void 0&&(a=-Zt);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof We?i&&l.push(c):(o&&l.push(c),r&&l.push.apply(l,c.getChildren(!0,i,o)))),c=c._next;return l},t.getById=function(r){for(var i=this.getChildren(1,1,1),o=i.length;o--;)if(i[o].vars.id===r)return i[o]},t.remove=function(r){return et(r)?this.removeLabel(r):Ne(r)?this.killTweensOf(r):(r.parent===this&&Gs(this,r),r===this._recent&&(this._recent=this._last),fr(this))},t.totalTime=function(r,i){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=De(Ft.time-(this._ts>0?r/this._ts:(this.totalDuration()-r)/-this._ts))),s.prototype.totalTime.call(this,r,i),this._forcing=0,this):this._tTime},t.addLabel=function(r,i){return this.labels[r]=jt(this,i),this},t.removeLabel=function(r){return delete this.labels[r],this},t.addPause=function(r,i,o){var a=We.delayedCall(0,i||Di,o);return a.data="isPause",this._hasPause=1,pn(this,a,jt(this,r))},t.removePause=function(r){var i=this._first;for(r=jt(this,r);i;)i._start===r&&i.data==="isPause"&&Vn(i),i=i._next},t.killTweensOf=function(r,i,o){for(var a=this.getTweensOf(r,o),l=a.length;l--;)Fn!==a[l]&&a[l].kill(r,i);return this},t.getTweensOf=function(r,i){for(var o=[],a=Jt(r),l=this._first,c=An(i),u;l;)l instanceof We?ih(l._targets,a)&&(c?(!Fn||l._initted&&l._ts)&&l.globalTime(0)<=i&&l.globalTime(l.totalDuration())>i:!i||l.isActive())&&o.push(l):(u=l.getTweensOf(a,i)).length&&o.push.apply(o,u),l=l._next;return o},t.tweenTo=function(r,i){i=i||{};var o=this,a=jt(o,r),l=i,c=l.startAt,u=l.onStart,d=l.onStartParams,p=l.immediateRender,f,g=We.to(o,Wt({ease:i.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:i.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale())||be,onStart:function(){if(o.pause(),!f){var m=i.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale());g._dur!==m&&Vr(g,m,0,1).render(g._time,!0,!0),f=1}u&&u.apply(g,d||[])}},i));return p?g.render(0):g},t.tweenFromTo=function(r,i,o){return this.tweenTo(i,Wt({startAt:{time:jt(this,r)}},o))},t.recent=function(){return this._recent},t.nextLabel=function(r){return r===void 0&&(r=this._time),Ga(this,jt(this,r))},t.previousLabel=function(r){return r===void 0&&(r=this._time),Ga(this,jt(this,r),1)},t.currentLabel=function(r){return arguments.length?this.seek(r,!0):this.previousLabel(this._time+be)},t.shiftChildren=function(r,i,o){o===void 0&&(o=0);var a=this._first,l=this.labels,c;for(r=De(r);a;)a._start>=o&&(a._start+=r,a._end+=r),a=a._next;if(i)for(c in l)l[c]>=o&&(l[c]+=r);return fr(this)},t.invalidate=function(r){var i=this._first;for(this._lock=0;i;)i.invalidate(r),i=i._next;return s.prototype.invalidate.call(this,r)},t.clear=function(r){r===void 0&&(r=!0);for(var i=this._first,o;i;)o=i._next,this.remove(i),i=o;return this._dp&&(this._time=this._tTime=this._pTime=0),r&&(this.labels={}),fr(this)},t.totalDuration=function(r){var i=0,o=this,a=o._last,l=Zt,c,u,d;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-r:r));if(o._dirty){for(d=o.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),u=a._start,u>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,pn(o,a,u-a._delay,1)._lock=0):l=u,u<0&&a._ts&&(i-=u,(!d&&!o._dp||d&&d.smoothChildTiming)&&(o._start+=De(u/o._ts),o._time-=u,o._tTime-=u),o.shiftChildren(-u,!1,-1/0),l=0),a._end>i&&a._ts&&(i=a._end),a=c;Vr(o,o===Le&&o._time>i?o._time:i,1,1),o._dirty=0}return o._tDur},e.updateRoot=function(r){if(Le._ts&&(_c(Le,Ms(r,Le)),pc=Ft.frame),Ft.frame>=$a){$a+=Yt.autoSleep||120;var i=Le._first;if((!i||!i._ts)&&Yt.autoSleep&&Ft._listeners.length<2){for(;i&&!i._ts;)i=i._next;i||Ft.sleep()}}},e}(Ii);Wt(Ct.prototype,{_lock:0,_hasPause:0,_forcing:0});var Mh=function(e,t,n,r,i,o,a){var l=new Pt(this._pt,e,t,0,1,Hc,null,i),c=0,u=0,d,p,f,g,h,m,S,b;for(l.b=n,l.e=r,n+="",r+="",(S=~r.indexOf("random("))&&(r=Li(r)),o&&(b=[n,r],o(b,e,t),n=b[0],r=b[1]),p=n.match(js)||[];d=js.exec(r);)g=d[0],h=r.substring(c,d.index),f?f=(f+1)%5:h.substr(-5)==="rgba("&&(f=1),g!==p[u++]&&(m=parseFloat(p[u-1])||0,l._pt={_next:l._pt,p:h||u===1?h:",",s:m,c:g.charAt(1)==="="?$r(m,g)-m:parseFloat(g)-m,m:f&&f<4?Math.round:0},c=js.lastIndex);return l.c=c<r.length?r.substring(c,r.length):"",l.fp=a,(uc.test(r)||S)&&(l.e=0),this._pt=l,l},na=function(e,t,n,r,i,o,a,l,c,u){Ne(r)&&(r=r(i||0,e,o));var d=e[t],p=n!=="get"?n:Ne(d)?c?e[t.indexOf("set")||!Ne(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():d,f=Ne(d)?c?Dh:Bc:ia,g;if(et(r)&&(~r.indexOf("random(")&&(r=Li(r)),r.charAt(1)==="="&&(g=$r(p,r)+(ht(p)||0),(g||g===0)&&(r=g))),!u||p!==r||wo)return!isNaN(p*r)&&r!==""?(g=new Pt(this._pt,e,t,+p||0,r-(p||0),typeof d=="boolean"?zh:Gc,0,f),c&&(g.fp=c),a&&g.modifier(a,this,e),this._pt=g):(!d&&!(t in e)&&Ko(t,r),Mh.call(this,e,t,p,r,f,l||Yt.stringFilter,c))},Ph=function(e,t,n,r,i){if(Ne(e)&&(e=xi(e,i,t,n,r)),!yn(e)||e.style&&e.nodeType||pt(e)||lc(e))return et(e)?xi(e,i,t,n,r):e;var o={},a;for(a in e)o[a]=xi(e[a],i,t,n,r);return o},$c=function(e,t,n,r,i,o){var a,l,c,u;if(It[e]&&(a=new It[e]).init(i,a.rawVars?t[e]:Ph(t[e],r,i,o,n),n,r,o)!==!1&&(n._pt=l=new Pt(n._pt,i,e,0,1,a.render,a,0,a.priority),n!==Lr))for(c=n._ptLookup[n._targets.indexOf(i)],u=a._props.length;u--;)c[a._props[u]]=l;return a},Fn,wo,ra=function s(e,t,n){var r=e.vars,i=r.ease,o=r.startAt,a=r.immediateRender,l=r.lazy,c=r.onUpdate,u=r.runBackwards,d=r.yoyoEase,p=r.keyframes,f=r.autoRevert,g=e._dur,h=e._startAt,m=e._targets,S=e.parent,b=S&&S.data==="nested"?S.vars.targets:m,x=e._overwrite==="auto"&&!Vo,v=e.timeline,w=r.easeReverse||d,O,T,R,C,A,U,_,$,L,H,X,N,P;if(v&&(!p||!i)&&(i="none"),e._ease=hr(i,Ai.ease),e._rEase=w&&(hr(w)||e._ease),e._from=!v&&!!r.runBackwards,e._from&&(e.ratio=1),!v||p&&!r.stagger){if($=m[0]?ur(m[0]).harness:0,N=$&&r[$.prop],O=Es(r,Zo),h&&(h._zTime<0&&h.progress(1),t<0&&u&&a&&!f?h.render(-1,!0):h.revert(u&&g?fs:nh),h._lazy=0),o){if(Vn(e._startAt=We.set(m,Wt({data:"isStart",overwrite:!1,parent:S,immediateRender:!0,lazy:!h&&Et(l),startAt:null,delay:0,onUpdate:c&&function(){return Gt(e,"onUpdate")},stagger:0},o))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(it||!a&&!f)&&e._startAt.revert(fs),a&&g&&t<=0&&n<=0){t&&(e._zTime=t);return}}else if(u&&g&&!h){if(t&&(a=!1),R=Wt({overwrite:!1,data:"isFromStart",lazy:a&&!h&&Et(l),immediateRender:a,stagger:0,parent:S},O),N&&(R[$.prop]=N),Vn(e._startAt=We.set(m,R)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(it?e._startAt.revert(fs):e._startAt.render(-1,!0)),e._zTime=t,!a)s(e._startAt,be,be);else if(!t)return}for(e._pt=e._ptCache=0,l=g&&Et(l)||l&&!g,T=0;T<m.length;T++){if(A=m[T],_=A._gsap||ea(m)[T]._gsap,e._ptLookup[T]=H={},_o[_.id]&&qn.length&&Cs(),X=b===m?T:b.indexOf(A),$&&(L=new $).init(A,N||O,e,X,b)!==!1&&(e._pt=C=new Pt(e._pt,A,L.name,0,1,L.render,L,0,L.priority),L._props.forEach(function(D){H[D]=C}),L.priority&&(U=1)),!$||N)for(R in O)It[R]&&(L=$c(R,O,e,X,A,b))?L.priority&&(U=1):H[R]=C=na.call(e,A,R,"get",O[R],X,b,0,r.stringFilter);e._op&&e._op[T]&&e.kill(A,e._op[T]),x&&e._pt&&(Fn=e,Le.killTweensOf(A,H,e.globalTime(t)),P=!e.parent,Fn=0),e._pt&&l&&(_o[_.id]=1)}U&&Yc(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!P,p&&t<=0&&v.render(Zt,!0,!0)},Oh=function(e,t,n,r,i,o,a,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],u,d,p,f;if(!c)for(c=e._ptCache[t]=[],p=e._ptLookup,f=e._targets.length;f--;){if(u=p[f][t],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==t&&u.fp!==t;)u=u._next;if(!u)return wo=1,e.vars[t]="+=0",ra(e,a),wo=0,l?Ri(t+" not eligible for reset. Try splitting into individual properties"):1;c.push(u)}for(f=c.length;f--;)d=c[f],u=d._pt||d,u.s=(r||r===0)&&!i?r:u.s+(r||0)+o*u.c,u.c=n-u.s,d.e&&(d.e=Be(n)+ht(d.e)),d.b&&(d.b=u.s+ht(d.b))},Ah=function(e,t){var n=e[0]?ur(e[0]).harness:0,r=n&&n.aliases,i,o,a,l;if(!r)return t;i=Wr({},t);for(o in r)if(o in i)for(l=r[o].split(","),a=l.length;a--;)i[l[a]]=i[o];return i},Rh=function(e,t,n,r){var i=t.ease||r||"power1.inOut",o,a;if(pt(t))a=n[e]||(n[e]=[]),t.forEach(function(l,c){return a.push({t:c/(t.length-1)*100,v:l,e:i})});else for(o in t)a=n[o]||(n[o]=[]),o==="ease"||a.push({t:parseFloat(e),v:t[o],e:i})},xi=function(e,t,n,r,i){return Ne(e)?e.call(t,n,r,i):et(e)&&~e.indexOf("random(")?Li(e):e},Nc=Jo+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",Fc={};Mt(Nc+",id,stagger,delay,duration,paused,scrollTrigger",function(s){return Fc[s]=1});var We=function(s){oc(e,s);function e(n,r,i,o){var a;typeof r=="number"&&(i.duration=r,r=i,i=null),a=s.call(this,o?r:bi(r))||this;var l=a.vars,c=l.duration,u=l.delay,d=l.immediateRender,p=l.stagger,f=l.overwrite,g=l.keyframes,h=l.defaults,m=l.scrollTrigger,S=r.parent||Le,b=(pt(n)||lc(n)?An(n[0]):"length"in r)?[n]:Jt(n),x,v,w,O,T,R,C,A;if(a._targets=b.length?ea(b):Ri("GSAP target "+n+" not found. https://gsap.com",!Yt.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=f,g||p||Xi(c)||Xi(u)){r=a.vars;var U=r.easeReverse||r.yoyoEase;if(x=a.timeline=new Ct({data:"nested",defaults:h||{},targets:S&&S.data==="nested"?S.vars.targets:b}),x.kill(),x.parent=x._dp=kn(a),x._start=0,p||Xi(c)||Xi(u)){if(O=b.length,C=p&&Tc(p),yn(p))for(T in p)~Nc.indexOf(T)&&(A||(A={}),A[T]=p[T]);for(v=0;v<O;v++)w=Es(r,Fc),w.stagger=0,U&&(w.easeReverse=U),A&&Wr(w,A),R=b[v],w.duration=+xi(c,kn(a),v,R,b),w.delay=(+xi(u,kn(a),v,R,b)||0)-a._delay,!p&&O===1&&w.delay&&(a._delay=u=w.delay,a._start+=u,w.delay=0),x.to(R,w,C?C(v,R,b):0),x._ease=ce.none;x.duration()?c=u=0:a.timeline=0}else if(g){bi(Wt(x.vars.defaults,{ease:"none"})),x._ease=hr(g.ease||r.ease||"none");var _=0,$,L,H;if(pt(g))g.forEach(function(X){return x.to(b,X,">")}),x.duration();else{w={};for(T in g)T==="ease"||T==="easeEach"||Rh(T,g[T],w,g.easeEach);for(T in w)for($=w[T].sort(function(X,N){return X.t-N.t}),_=0,v=0;v<$.length;v++)L=$[v],H={ease:L.e,duration:(L.t-(v?$[v-1].t:0))/100*c},H[T]=L.v,x.to(b,H,_),_+=H.duration;x.duration()<c&&x.to({},{duration:c-x.duration()})}}c||a.duration(c=x.duration())}else a.timeline=0;return f===!0&&!Vo&&(Fn=kn(a),Le.killTweensOf(b),Fn=0),pn(S,kn(a),i),r.reversed&&a.reverse(),r.paused&&a.paused(!0),(d||!c&&!g&&a._start===De(S._time)&&Et(d)&&lh(kn(a))&&S.data!=="nested")&&(a._tTime=-be,a.render(Math.max(0,-u)||0)),m&&xc(kn(a),m),a}var t=e.prototype;return t.render=function(r,i,o){var a=this._time,l=this._tDur,c=this._dur,u=r<0,d=r>l-be&&!u?l:r<be?0:r,p,f,g,h,m,S,b,x;if(!c)uh(this,r,i,o);else if(d!==this._tTime||!r||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(p=d,x=this.timeline,this._repeat){if(h=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(h*100+r,i,o);if(p=De(d%h),d===l?(g=this._repeat,p=c):(m=De(d/h),g=~~m,g&&g===m?(p=c,g--):p>c&&(p=c)),S=this._yoyo&&g&1,S&&(p=c-p),m=Xr(this._tTime,h),p===a&&!o&&this._initted&&g===m)return this._tTime=d,this;g!==m&&this.vars.repeatRefresh&&!S&&!this._lock&&p!==h&&this._initted&&(this._lock=o=1,this.render(De(h*g),!0).invalidate()._lock=0)}if(!this._initted){if(wc(this,u?r:p,o,i,d))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&g!==m))return this;if(c!==this._dur)return this.render(r,i,o)}if(this._rEase){var v=p<a;if(v!==this._inv){var w=v?a:c-a;this._inv=v,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=a,this._invRecip=w?(v?-1:1)/w:0,this._invScale=v?-this.ratio:1-this.ratio,this._invEase=v?this._rEase:this._ease}this.ratio=b=this._invRatio+this._invScale*this._invEase((p-this._invTime)*this._invRecip)}else this.ratio=b=this._ease(p/c);if(this._from&&(this.ratio=b=1-b),this._tTime=d,this._time=p,!this._act&&this._ts&&(this._act=1,this._lazy=0),!a&&d&&!i&&!m&&(Gt(this,"onStart"),this._tTime!==d))return this;for(f=this._pt;f;)f.r(b,f.d),f=f._next;x&&x.render(r<0?r:x._dur*x._ease(p/this._dur),i,o)||this._startAt&&(this._zTime=r),this._onUpdate&&!i&&(u&&mo(this,r,i,o),Gt(this,"onUpdate")),this._repeat&&g!==m&&this.vars.onRepeat&&!i&&this.parent&&Gt(this,"onRepeat"),(d===this._tDur||!d)&&this._tTime===d&&(u&&!this._onUpdate&&mo(this,r,!0,!0),(r||!c)&&(d===this._tDur&&this._ts>0||!d&&this._ts<0)&&Vn(this,1),!i&&!(u&&!a)&&(d||a||S)&&(Gt(this,d===l?"onComplete":"onReverseComplete",!0),this._prom&&!(d<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(r){return(!r||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(r),s.prototype.invalidate.call(this,r)},t.resetTo=function(r,i,o,a,l){zi||Ft.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||ra(this,c),u=this._ease(c/this._dur),Oh(this,r,i,o,a,u,c,l)?this.resetTo(r,i,o,a,1):(Ys(this,0),this.parent||bc(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(r,i){if(i===void 0&&(i="all"),!r&&(!i||i==="all"))return this._lazy=this._pt=0,this.parent?hi(this):this.scrollTrigger&&this.scrollTrigger.kill(!!it),this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(r,i,Fn&&Fn.vars.overwrite!==!0)._first||hi(this),this.parent&&o!==this.timeline.totalDuration()&&Vr(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=r?Jt(r):a,c=this._ptLookup,u=this._pt,d,p,f,g,h,m,S;if((!i||i==="all")&&oh(a,l))return i==="all"&&(this._pt=0),hi(this);for(d=this._op=this._op||[],i!=="all"&&(et(i)&&(h={},Mt(i,function(b){return h[b]=1}),i=h),i=Ah(a,i)),S=a.length;S--;)if(~l.indexOf(a[S])){p=c[S],i==="all"?(d[S]=i,g=p,f={}):(f=d[S]=d[S]||{},g=i);for(h in g)m=p&&p[h],m&&((!("kill"in m.d)||m.d.kill(h)===!0)&&Gs(this,m,"_pt"),delete p[h]),f!=="all"&&(f[h]=1)}return this._initted&&!this._pt&&u&&hi(this),this},e.to=function(r,i){return new e(r,i,arguments[2])},e.from=function(r,i){return vi(1,arguments)},e.delayedCall=function(r,i,o,a){return new e(i,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:r,onComplete:i,onReverseComplete:i,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},e.fromTo=function(r,i,o){return vi(2,arguments)},e.set=function(r,i){return i.duration=0,i.repeatDelay||(i.repeat=0),new e(r,i)},e.killTweensOf=function(r,i,o){return Le.killTweensOf(r,i,o)},e}(Ii);Wt(We.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});Mt("staggerTo,staggerFrom,staggerFromTo",function(s){We[s]=function(){var e=new Ct,t=bo.call(arguments,0);return t.splice(s==="staggerFromTo"?5:4,0,0),e[s].apply(e,t)}});var ia=function(e,t,n){return e[t]=n},Bc=function(e,t,n){return e[t](n)},Dh=function(e,t,n,r){return e[t](r.fp,n)},Lh=function(e,t,n){return e.setAttribute(t,n)},sa=function(e,t){return Ne(e[t])?Bc:jo(e[t])&&e.setAttribute?Lh:ia},Gc=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},zh=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},Hc=function(e,t){var n=t._pt,r="";if(!e&&t.b)r=t.b;else if(e===1&&t.e)r=t.e;else{for(;n;)r=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+r,n=n._next;r+=t.c}t.set(t.t,t.p,r,t)},oa=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},Ih=function(e,t,n,r){for(var i=this._pt,o;i;)o=i._next,i.p===r&&i.modifier(e,t,n),i=o},$h=function(e){for(var t=this._pt,n,r;t;)r=t._next,t.p===e&&!t.op||t.op===e?Gs(this,t,"_pt"):t.dep||(n=1),t=r;return!n},Nh=function(e,t,n,r){r.mSet(e,t,r.m.call(r.tween,n,r.mt),r)},Yc=function(e){for(var t=e._pt,n,r,i,o;t;){for(n=t._next,r=i;r&&r.pr>t.pr;)r=r._next;(t._prev=r?r._prev:o)?t._prev._next=t:i=t,(t._next=r)?r._prev=t:o=t,t=n}e._pt=i},Pt=function(){function s(t,n,r,i,o,a,l,c,u){this.t=n,this.s=i,this.c=o,this.p=r,this.r=a||Gc,this.d=l||this,this.set=c||ia,this.pr=u||0,this._next=t,t&&(t._prev=this)}var e=s.prototype;return e.modifier=function(n,r,i){this.mSet=this.mSet||this.set,this.set=Nh,this.m=n,this.mt=i,this.tween=r},s}();Mt(Jo+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(s){return Zo[s]=1});qt.TweenMax=qt.TweenLite=We;qt.TimelineLite=qt.TimelineMax=Ct;Le=new Ct({sortChildren:!1,defaults:Ai,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Yt.stringFilter=Lc;var dr=[],ds={},Fh=[],Ya=0,Bh=0,Js=function(e){return(ds[e]||Fh).map(function(t){return t()})},So=function(){var e=Date.now(),t=[];e-Ya>2&&(Js("matchMediaInit"),dr.forEach(function(n){var r=n.queries,i=n.conditions,o,a,l,c;for(a in r)o=fn.matchMedia(r[a]).matches,o&&(l=1),o!==i[a]&&(i[a]=o,c=1);c&&(n.revert(),l&&t.push(n))}),Js("matchMediaRevert"),t.forEach(function(n){return n.onMatch(n,function(r){return n.add(null,r)})}),Ya=e,Js("matchMedia"))},qc=function(){function s(t,n){this.selector=n&&vo(n),this.data=[],this._r=[],this.isReverted=!1,this.id=Bh++,t&&this.add(t)}var e=s.prototype;return e.add=function(n,r,i){Ne(n)&&(i=r,r=n,n=Ne);var o=this,a=function(){var c=Pe,u=o.selector,d;return c&&c!==o&&c.data.push(o),i&&(o.selector=vo(i)),Pe=o,d=r.apply(o,arguments),Ne(d)&&o._r.push(d),Pe=c,o.selector=u,o.isReverted=!1,d};return o.last=a,n===Ne?a(o,function(l){return o.add(null,l)}):n?o[n]=a:a},e.ignore=function(n){var r=Pe;Pe=null,n(this),Pe=r},e.getTweens=function(){var n=[];return this.data.forEach(function(r){return r instanceof s?n.push.apply(n,r.getTweens()):r instanceof We&&!(r.parent&&r.parent.data==="nested")&&n.push(r)}),n},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(n,r){var i=this;if(n?function(){for(var a=i.getTweens(),l=i.data.length,c;l--;)c=i.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return a.splice(a.indexOf(u),1)}));for(a.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,d){return d.g-u.g||-1/0}).forEach(function(u){return u.t.revert(n)}),l=i.data.length;l--;)c=i.data[l],c instanceof Ct?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof We)&&c.revert&&c.revert(n);i._r.forEach(function(u){return u(n,i)}),i.isReverted=!0}():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),r)for(var o=dr.length;o--;)dr[o].id===this.id&&dr.splice(o,1)},e.revert=function(n){this.kill(n||{})},s}(),Gh=function(){function s(t){this.contexts=[],this.scope=t,Pe&&Pe.data.push(this)}var e=s.prototype;return e.add=function(n,r,i){yn(n)||(n={matches:n});var o=new qc(0,i||this.scope),a=o.conditions={},l,c,u;Pe&&!o.selector&&(o.selector=Pe.selector),this.contexts.push(o),r=o.add("onMatch",r),o.queries=n;for(c in n)c==="all"?u=1:(l=fn.matchMedia(n[c]),l&&(dr.indexOf(o)<0&&dr.push(o),(a[c]=l.matches)&&(u=1),l.addListener?l.addListener(So):l.addEventListener("change",So)));return u&&r(o,function(d){return o.add(null,d)}),this},e.revert=function(n){this.kill(n||{})},e.kill=function(n){this.contexts.forEach(function(r){return r.kill(n,!0)})},s}(),Ps={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(r){return Ac(r)})},timeline:function(e){return new Ct(e)},getTweensOf:function(e,t){return Le.getTweensOf(e,t)},getProperty:function(e,t,n,r){et(e)&&(e=Jt(e)[0]);var i=ur(e||{}).get,o=n?yc:mc;return n==="native"&&(n=""),e&&(t?o((It[t]&&It[t].get||i)(e,t,n,r)):function(a,l,c){return o((It[a]&&It[a].get||i)(e,a,l,c))})},quickSetter:function(e,t,n){if(e=Jt(e),e.length>1){var r=e.map(function(u){return At.quickSetter(u,t,n)}),i=r.length;return function(u){for(var d=i;d--;)r[d](u)}}e=e[0]||{};var o=It[t],a=ur(e),l=a.harness&&(a.harness.aliases||{})[t]||t,c=o?function(u){var d=new o;Lr._pt=0,d.init(e,n?u+n:u,Lr,0,[e]),d.render(1,d),Lr._pt&&oa(1,Lr)}:a.set(e,l);return o?c:function(u){return c(e,l,n?u+n:u,a,1)}},quickTo:function(e,t,n){var r,i=At.to(e,Wt((r={},r[t]="+=0.1",r.paused=!0,r.stagger=0,r),n||{})),o=function(l,c,u){return i.resetTo(t,l,c,u)};return o.tween=i,o},isTweening:function(e){return Le.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=hr(e.ease,Ai.ease)),Na(Ai,e||{})},config:function(e){return Na(Yt,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,r=e.plugins,i=e.defaults,o=e.extendTimeline;(r||"").split(",").forEach(function(a){return a&&!It[a]&&!qt[a]&&Ri(t+" effect requires "+a+" plugin.")}),Us[t]=function(a,l,c){return n(Jt(a),Wt(l||{},i),c)},o&&(Ct.prototype[t]=function(a,l,c){return this.add(Us[t](a,yn(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){ce[e]=hr(t)},parseEase:function(e,t){return arguments.length?hr(e,t):ce},getById:function(e){return Le.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new Ct(e),r,i;for(n.smoothChildTiming=Et(e.smoothChildTiming),Le.remove(n),n._dp=0,n._time=n._tTime=Le._time,r=Le._first;r;)i=r._next,(t||!(!r._dur&&r instanceof We&&r.vars.onComplete===r._targets[0]))&&pn(n,r,r._start-r._delay),r=i;return pn(Le,n,0),n},context:function(e,t){return e?new qc(e,t):Pe},matchMedia:function(e){return new Gh(e)},matchMediaRefresh:function(){return dr.forEach(function(e){var t=e.conditions,n,r;for(r in t)t[r]&&(t[r]=!1,n=1);n&&e.revert()})||So()},addEventListener:function(e,t){var n=ds[e]||(ds[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=ds[e],r=n&&n.indexOf(t);r>=0&&n.splice(r,1)},utils:{wrap:yh,wrapYoyo:bh,distribute:Tc,random:Ec,snap:Cc,normalize:mh,getUnit:ht,clamp:dh,splitColor:Rc,toArray:Jt,selector:vo,mapRange:Pc,pipe:gh,unitize:_h,interpolate:vh,shuffle:kc},install:hc,effects:Us,ticker:Ft,updateRoot:Ct.updateRoot,plugins:It,globalTimeline:Le,core:{PropTween:Pt,globals:dc,Tween:We,Timeline:Ct,Animation:Ii,getCache:ur,_removeLinkedListItem:Gs,reverting:function(){return it},context:function(e){return e&&Pe&&(Pe.data.push(e),e._ctx=Pe),Pe},suppressOverwrites:function(e){return Vo=e}}};Mt("to,from,fromTo,delayedCall,set,killTweensOf",function(s){return Ps[s]=We[s]});Ft.add(Ct.updateRoot);Lr=Ps.to({},{duration:0});var Hh=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},Yh=function(e,t){var n=e._targets,r,i,o;for(r in t)for(i=n.length;i--;)o=e._ptLookup[i][r],o&&(o=o.d)&&(o._pt&&(o=Hh(o,r)),o&&o.modifier&&o.modifier(t[r],e,n[i],r))},eo=function(e,t){return{name:e,headless:1,rawVars:1,init:function(r,i,o){o._onInit=function(a){var l,c;if(et(i)&&(l={},Mt(i,function(u){return l[u]=1}),i=l),t){l={};for(c in i)l[c]=t(i[c]);i=l}Yh(a,i)}}}},At=Ps.registerPlugin({name:"attr",init:function(e,t,n,r,i){var o,a,l;this.tween=n;for(o in t)l=e.getAttribute(o)||"",a=this.add(e,"setAttribute",(l||0)+"",t[o],r,i,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(e,t){for(var n=t._pt;n;)it?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:"endArray",headless:1,init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},eo("roundProps",xo),eo("modifiers"),eo("snap",Cc))||Ps;We.version=Ct.version=At.version="3.15.0";fc=1;Uo()&&jr();ce.Power0;ce.Power1;ce.Power2;ce.Power3;ce.Power4;ce.Linear;ce.Quad;ce.Cubic;ce.Quart;ce.Quint;ce.Strong;ce.Elastic;ce.Back;ce.SteppedEase;ce.Bounce;ce.Sine;ce.Expo;ce.Circ;/*!
 * CSSPlugin 3.15.0
 * https://gsap.com
 *
 * Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var qa,Bn,Nr,aa,or,Wa,la,qh=function(){return typeof window<"u"},Rn={},rr=180/Math.PI,Fr=Math.PI/180,Tr=Math.atan2,Xa=1e8,ca=/([A-Z])/g,Wh=/(left|right|width|margin|padding|x)/i,Xh=/[\s,\(]\S/,gn={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},ko=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},Vh=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},jh=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},Uh=function(e,t){return t.set(t.t,t.p,e===1?t.e:e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},Qh=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},Wc=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},Xc=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},Kh=function(e,t,n){return e.style[t]=n},Zh=function(e,t,n){return e.style.setProperty(t,n)},Jh=function(e,t,n){return e._gsap[t]=n},ed=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},td=function(e,t,n,r,i){var o=e._gsap;o.scaleX=o.scaleY=n,o.renderTransform(i,o)},nd=function(e,t,n,r,i){var o=e._gsap;o[t]=n,o.renderTransform(i,o)},ze="transform",Ot=ze+"Origin",rd=function s(e,t){var n=this,r=this.target,i=r.style,o=r._gsap;if(e in Rn&&i){if(this.tfm=this.tfm||{},e!=="transform")e=gn[e]||e,~e.indexOf(",")?e.split(",").forEach(function(a){return n.tfm[a]=Tn(r,a)}):this.tfm[e]=o.x?o[e]:Tn(r,e),e===Ot&&(this.tfm.zOrigin=o.zOrigin);else return gn.transform.split(",").forEach(function(a){return s.call(n,a,t)});if(this.props.indexOf(ze)>=0)return;o.svg&&(this.svgo=r.getAttribute("data-svg-origin"),this.props.push(Ot,t,"")),e=ze}(i||t)&&this.props.push(e,t,i[e])},Vc=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},id=function(){var e=this.props,t=this.target,n=t.style,r=t._gsap,i,o;for(i=0;i<e.length;i+=3)e[i+1]?e[i+1]===2?t[e[i]](e[i+2]):t[e[i]]=e[i+2]:e[i+2]?n[e[i]]=e[i+2]:n.removeProperty(e[i].substr(0,2)==="--"?e[i]:e[i].replace(ca,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)r[o]=this.tfm[o];r.svg&&(r.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),i=la(),(!i||!i.isStart)&&!n[ze]&&(Vc(n),r.zOrigin&&n[Ot]&&(n[Ot]+=" "+r.zOrigin+"px",r.zOrigin=0,r.renderTransform()),r.uncache=1)}},jc=function(e,t){var n={target:e,props:[],revert:id,save:rd};return e._gsap||At.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(r){return n.save(r)}),n},Uc,To=function(e,t){var n=Bn.createElementNS?Bn.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):Bn.createElement(e);return n&&n.style?n:Bn.createElement(e)},Ht=function s(e,t,n){var r=getComputedStyle(e);return r[t]||r.getPropertyValue(t.replace(ca,"-$1").toLowerCase())||r.getPropertyValue(t)||!n&&s(e,Ur(t)||t,1)||""},Va="O,Moz,ms,Ms,Webkit".split(","),Ur=function(e,t,n){var r=t||or,i=r.style,o=5;if(e in i&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);o--&&!(Va[o]+e in i););return o<0?null:(o===3?"ms":o>=0?Va[o]:"")+e},Co=function(){qh()&&window.document&&(qa=window,Bn=qa.document,Nr=Bn.documentElement,or=To("div")||{style:{}},To("div"),ze=Ur(ze),Ot=ze+"Origin",or.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Uc=!!Ur("perspective"),la=At.core.reverting,aa=1)},ja=function(e){var t=e.ownerSVGElement,n=To("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),r=e.cloneNode(!0),i;r.style.display="block",n.appendChild(r),Nr.appendChild(n);try{i=r.getBBox()}catch{}return n.removeChild(r),Nr.removeChild(n),i},Ua=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},Qc=function(e){var t,n;try{t=e.getBBox()}catch{t=ja(e),n=1}return t&&(t.width||t.height)||n||(t=ja(e)),t&&!t.width&&!t.x&&!t.y?{x:+Ua(e,["x","cx","x1"])||0,y:+Ua(e,["y","cy","y1"])||0,width:0,height:0}:t},Kc=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&Qc(e))},jn=function(e,t){if(t){var n=e.style,r;t in Rn&&t!==Ot&&(t=ze),n.removeProperty?(r=t.substr(0,2),(r==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),n.removeProperty(r==="--"?t:t.replace(ca,"-$1").toLowerCase())):n.removeAttribute(t)}},Gn=function(e,t,n,r,i,o){var a=new Pt(e._pt,t,n,0,1,o?Xc:Wc);return e._pt=a,a.b=r,a.e=i,e._props.push(n),a},Qa={deg:1,rad:1,turn:1},sd={grid:1,flex:1},Un=function s(e,t,n,r){var i=parseFloat(n)||0,o=(n+"").trim().substr((i+"").length)||"px",a=or.style,l=Wh.test(t),c=e.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),d=100,p=r==="px",f=r==="%",g,h,m,S;if(r===o||!i||Qa[r]||Qa[o])return i;if(o!=="px"&&!p&&(i=s(e,t,n,"px")),S=e.getCTM&&Kc(e),(f||o==="%")&&(Rn[t]||~t.indexOf("adius")))return g=S?e.getBBox()[l?"width":"height"]:e[u],Be(f?i/g*d:i/100*g);if(a[l?"width":"height"]=d+(p?o:r),h=r!=="rem"&&~t.indexOf("adius")||r==="em"&&e.appendChild&&!c?e:e.parentNode,S&&(h=(e.ownerSVGElement||{}).parentNode),(!h||h===Bn||!h.appendChild)&&(h=Bn.body),m=h._gsap,m&&f&&m.width&&l&&m.time===Ft.time&&!m.uncache)return Be(i/m.width*d);if(f&&(t==="height"||t==="width")){var b=e.style[t];e.style[t]=d+r,g=e[u],b?e.style[t]=b:jn(e,t)}else(f||o==="%")&&!sd[Ht(h,"display")]&&(a.position=Ht(e,"position")),h===e&&(a.position="static"),h.appendChild(or),g=or[u],h.removeChild(or),a.position="absolute";return l&&f&&(m=ur(h),m.time=Ft.time,m.width=h[u]),Be(p?g*i/d:g&&i?d/g*i:0)},Tn=function(e,t,n,r){var i;return aa||Co(),t in gn&&t!=="transform"&&(t=gn[t],~t.indexOf(",")&&(t=t.split(",")[0])),Rn[t]&&t!=="transform"?(i=Ni(e,r),i=t!=="transformOrigin"?i[t]:i.svg?i.origin:As(Ht(e,Ot))+" "+i.zOrigin+"px"):(i=e.style[t],(!i||i==="auto"||r||~(i+"").indexOf("calc("))&&(i=Os[t]&&Os[t](e,t,n)||Ht(e,t)||gc(e,t)||(t==="opacity"?1:0))),n&&!~(i+"").trim().indexOf(" ")?Un(e,t,i,n)+n:i},od=function(e,t,n,r){if(!n||n==="none"){var i=Ur(t,e,1),o=i&&Ht(e,i,1);o&&o!==n?(t=i,n=o):t==="borderColor"&&(n=Ht(e,"borderTopColor"))}var a=new Pt(this._pt,e.style,t,0,1,Hc),l=0,c=0,u,d,p,f,g,h,m,S,b,x,v,w;if(a.b=n,a.e=r,n+="",r+="",r.substring(0,6)==="var(--"&&(r=Ht(e,r.substring(4,r.indexOf(")")))),r==="auto"&&(h=e.style[t],e.style[t]=r,r=Ht(e,t)||r,h?e.style[t]=h:jn(e,t)),u=[n,r],Lc(u),n=u[0],r=u[1],p=n.match(Dr)||[],w=r.match(Dr)||[],w.length){for(;d=Dr.exec(r);)m=d[0],b=r.substring(l,d.index),g?g=(g+1)%5:(b.substr(-5)==="rgba("||b.substr(-5)==="hsla(")&&(g=1),m!==(h=p[c++]||"")&&(f=parseFloat(h)||0,v=h.substr((f+"").length),m.charAt(1)==="="&&(m=$r(f,m)+v),S=parseFloat(m),x=m.substr((S+"").length),l=Dr.lastIndex-x.length,x||(x=x||Yt.units[t]||v,l===r.length&&(r+=x,a.e+=x)),v!==x&&(f=Un(e,t,h,x)||0),a._pt={_next:a._pt,p:b||c===1?b:",",s:f,c:S-f,m:g&&g<4||t==="zIndex"?Math.round:0});a.c=l<r.length?r.substring(l,r.length):""}else a.r=t==="display"&&r==="none"?Xc:Wc;return uc.test(r)&&(a.e=0),this._pt=a,a},Ka={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},ad=function(e){var t=e.split(" "),n=t[0],r=t[1]||"50%";return(n==="top"||n==="bottom"||r==="left"||r==="right")&&(e=n,n=r,r=e),t[0]=Ka[n]||n,t[1]=Ka[r]||r,t.join(" ")},ld=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,r=n.style,i=t.u,o=n._gsap,a,l,c;if(i==="all"||i===!0)r.cssText="",l=1;else for(i=i.split(","),c=i.length;--c>-1;)a=i[c],Rn[a]&&(l=1,a=a==="transformOrigin"?Ot:ze),jn(n,a);l&&(jn(n,ze),o&&(o.svg&&n.removeAttribute("transform"),r.scale=r.rotate=r.translate="none",Ni(n,1),o.uncache=1,Vc(r)))}},Os={clearProps:function(e,t,n,r,i){if(i.data!=="isFromStart"){var o=e._pt=new Pt(e._pt,t,n,0,0,ld);return o.u=r,o.pr=-10,o.tween=i,e._props.push(n),1}}},$i=[1,0,0,1,0,0],Zc={},Jc=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},Za=function(e){var t=Ht(e,ze);return Jc(t)?$i:t.substr(7).match(cc).map(Be)},ua=function(e,t){var n=e._gsap||ur(e),r=e.style,i=Za(e),o,a,l,c;return n.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,i=[l.a,l.b,l.c,l.d,l.e,l.f],i.join(",")==="1,0,0,1,0,0"?$i:i):(i===$i&&!e.offsetParent&&e!==Nr&&!n.svg&&(l=r.display,r.display="block",o=e.parentNode,(!o||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,a=e.nextElementSibling,Nr.appendChild(e)),i=Za(e),l?r.display=l:jn(e,"display"),c&&(a?o.insertBefore(e,a):o?o.appendChild(e):Nr.removeChild(e))),t&&i.length>6?[i[0],i[1],i[4],i[5],i[12],i[13]]:i)},Eo=function(e,t,n,r,i,o){var a=e._gsap,l=i||ua(e,!0),c=a.xOrigin||0,u=a.yOrigin||0,d=a.xOffset||0,p=a.yOffset||0,f=l[0],g=l[1],h=l[2],m=l[3],S=l[4],b=l[5],x=t.split(" "),v=parseFloat(x[0])||0,w=parseFloat(x[1])||0,O,T,R,C;n?l!==$i&&(T=f*m-g*h)&&(R=v*(m/T)+w*(-h/T)+(h*b-m*S)/T,C=v*(-g/T)+w*(f/T)-(f*b-g*S)/T,v=R,w=C):(O=Qc(e),v=O.x+(~x[0].indexOf("%")?v/100*O.width:v),w=O.y+(~(x[1]||x[0]).indexOf("%")?w/100*O.height:w)),r||r!==!1&&a.smooth?(S=v-c,b=w-u,a.xOffset=d+(S*f+b*h)-S,a.yOffset=p+(S*g+b*m)-b):a.xOffset=a.yOffset=0,a.xOrigin=v,a.yOrigin=w,a.smooth=!!r,a.origin=t,a.originIsAbsolute=!!n,e.style[Ot]="0px 0px",o&&(Gn(o,a,"xOrigin",c,v),Gn(o,a,"yOrigin",u,w),Gn(o,a,"xOffset",d,a.xOffset),Gn(o,a,"yOffset",p,a.yOffset)),e.setAttribute("data-svg-origin",v+" "+w)},Ni=function(e,t){var n=e._gsap||new Ic(e);if("x"in n&&!t&&!n.uncache)return n;var r=e.style,i=n.scaleX<0,o="px",a="deg",l=getComputedStyle(e),c=Ht(e,Ot)||"0",u,d,p,f,g,h,m,S,b,x,v,w,O,T,R,C,A,U,_,$,L,H,X,N,P,D,y,Q,j,F,K,W;return u=d=p=h=m=S=b=x=v=0,f=g=1,n.svg=!!(e.getCTM&&Kc(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(r[ze]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[ze]!=="none"?l[ze]:"")),r.scale=r.rotate=r.translate="none"),T=ua(e,n.svg),n.svg&&(n.uncache?(P=e.getBBox(),c=n.xOrigin-P.x+"px "+(n.yOrigin-P.y)+"px",N=""):N=!t&&e.getAttribute("data-svg-origin"),Eo(e,N||c,!!N||n.originIsAbsolute,n.smooth!==!1,T)),w=n.xOrigin||0,O=n.yOrigin||0,T!==$i&&(U=T[0],_=T[1],$=T[2],L=T[3],u=H=T[4],d=X=T[5],T.length===6?(f=Math.sqrt(U*U+_*_),g=Math.sqrt(L*L+$*$),h=U||_?Tr(_,U)*rr:0,b=$||L?Tr($,L)*rr+h:0,b&&(g*=Math.abs(Math.cos(b*Fr))),n.svg&&(u-=w-(w*U+O*$),d-=O-(w*_+O*L))):(W=T[6],F=T[7],y=T[8],Q=T[9],j=T[10],K=T[11],u=T[12],d=T[13],p=T[14],R=Tr(W,j),m=R*rr,R&&(C=Math.cos(-R),A=Math.sin(-R),N=H*C+y*A,P=X*C+Q*A,D=W*C+j*A,y=H*-A+y*C,Q=X*-A+Q*C,j=W*-A+j*C,K=F*-A+K*C,H=N,X=P,W=D),R=Tr(-$,j),S=R*rr,R&&(C=Math.cos(-R),A=Math.sin(-R),N=U*C-y*A,P=_*C-Q*A,D=$*C-j*A,K=L*A+K*C,U=N,_=P,$=D),R=Tr(_,U),h=R*rr,R&&(C=Math.cos(R),A=Math.sin(R),N=U*C+_*A,P=H*C+X*A,_=_*C-U*A,X=X*C-H*A,U=N,H=P),m&&Math.abs(m)+Math.abs(h)>359.9&&(m=h=0,S=180-S),f=Be(Math.sqrt(U*U+_*_+$*$)),g=Be(Math.sqrt(X*X+W*W)),R=Tr(H,X),b=Math.abs(R)>2e-4?R*rr:0,v=K?1/(K<0?-K:K):0),n.svg&&(N=e.getAttribute("transform"),n.forceCSS=e.setAttribute("transform","")||!Jc(Ht(e,ze)),N&&e.setAttribute("transform",N))),Math.abs(b)>90&&Math.abs(b)<270&&(i?(f*=-1,b+=h<=0?180:-180,h+=h<=0?180:-180):(g*=-1,b+=b<=0?180:-180)),t=t||n.uncache,n.x=u-((n.xPercent=u&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-u)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+o,n.y=d-((n.yPercent=d&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-d)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+o,n.z=p+o,n.scaleX=Be(f),n.scaleY=Be(g),n.rotation=Be(h)+a,n.rotationX=Be(m)+a,n.rotationY=Be(S)+a,n.skewX=b+a,n.skewY=x+a,n.transformPerspective=v+o,(n.zOrigin=parseFloat(c.split(" ")[2])||!t&&n.zOrigin||0)&&(r[Ot]=As(c)),n.xOffset=n.yOffset=0,n.force3D=Yt.force3D,n.renderTransform=n.svg?ud:Uc?eu:cd,n.uncache=0,n},As=function(e){return(e=e.split(" "))[0]+" "+e[1]},to=function(e,t,n){var r=ht(t);return Be(parseFloat(t)+parseFloat(Un(e,"x",n+"px",r)))+r},cd=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,eu(e,t)},er="0deg",ti="0px",tr=") ",eu=function(e,t){var n=t||this,r=n.xPercent,i=n.yPercent,o=n.x,a=n.y,l=n.z,c=n.rotation,u=n.rotationY,d=n.rotationX,p=n.skewX,f=n.skewY,g=n.scaleX,h=n.scaleY,m=n.transformPerspective,S=n.force3D,b=n.target,x=n.zOrigin,v="",w=S==="auto"&&e&&e!==1||S===!0;if(x&&(d!==er||u!==er)){var O=parseFloat(u)*Fr,T=Math.sin(O),R=Math.cos(O),C;O=parseFloat(d)*Fr,C=Math.cos(O),o=to(b,o,T*C*-x),a=to(b,a,-Math.sin(O)*-x),l=to(b,l,R*C*-x+x)}m!==ti&&(v+="perspective("+m+tr),(r||i)&&(v+="translate("+r+"%, "+i+"%) "),(w||o!==ti||a!==ti||l!==ti)&&(v+=l!==ti||w?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+tr),c!==er&&(v+="rotate("+c+tr),u!==er&&(v+="rotateY("+u+tr),d!==er&&(v+="rotateX("+d+tr),(p!==er||f!==er)&&(v+="skew("+p+", "+f+tr),(g!==1||h!==1)&&(v+="scale("+g+", "+h+tr),b.style[ze]=v||"translate(0, 0)"},ud=function(e,t){var n=t||this,r=n.xPercent,i=n.yPercent,o=n.x,a=n.y,l=n.rotation,c=n.skewX,u=n.skewY,d=n.scaleX,p=n.scaleY,f=n.target,g=n.xOrigin,h=n.yOrigin,m=n.xOffset,S=n.yOffset,b=n.forceCSS,x=parseFloat(o),v=parseFloat(a),w,O,T,R,C;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=Fr,c*=Fr,w=Math.cos(l)*d,O=Math.sin(l)*d,T=Math.sin(l-c)*-p,R=Math.cos(l-c)*p,c&&(u*=Fr,C=Math.tan(c-u),C=Math.sqrt(1+C*C),T*=C,R*=C,u&&(C=Math.tan(u),C=Math.sqrt(1+C*C),w*=C,O*=C)),w=Be(w),O=Be(O),T=Be(T),R=Be(R)):(w=d,R=p,O=T=0),(x&&!~(o+"").indexOf("px")||v&&!~(a+"").indexOf("px"))&&(x=Un(f,"x",o,"px"),v=Un(f,"y",a,"px")),(g||h||m||S)&&(x=Be(x+g-(g*w+h*T)+m),v=Be(v+h-(g*O+h*R)+S)),(r||i)&&(C=f.getBBox(),x=Be(x+r/100*C.width),v=Be(v+i/100*C.height)),C="matrix("+w+","+O+","+T+","+R+","+x+","+v+")",f.setAttribute("transform",C),b&&(f.style[ze]=C)},fd=function(e,t,n,r,i){var o=360,a=et(i),l=parseFloat(i)*(a&&~i.indexOf("rad")?rr:1),c=l-r,u=r+c+"deg",d,p;return a&&(d=i.split("_")[1],d==="short"&&(c%=o,c!==c%(o/2)&&(c+=c<0?o:-o)),d==="cw"&&c<0?c=(c+o*Xa)%o-~~(c/o)*o:d==="ccw"&&c>0&&(c=(c-o*Xa)%o-~~(c/o)*o)),e._pt=p=new Pt(e._pt,t,n,r,c,Vh),p.e=u,p.u="deg",e._props.push(n),p},Ja=function(e,t){for(var n in t)e[n]=t[n];return e},hd=function(e,t,n){var r=Ja({},n._gsap),i="perspective,force3D,transformOrigin,svgOrigin",o=n.style,a,l,c,u,d,p,f,g;r.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),o[ze]=t,a=Ni(n,1),jn(n,ze),n.setAttribute("transform",c)):(c=getComputedStyle(n)[ze],o[ze]=t,a=Ni(n,1),o[ze]=c);for(l in Rn)c=r[l],u=a[l],c!==u&&i.indexOf(l)<0&&(f=ht(c),g=ht(u),d=f!==g?Un(n,l,c,g):parseFloat(c),p=parseFloat(u),e._pt=new Pt(e._pt,a,l,d,p-d,ko),e._pt.u=g||0,e._props.push(l));Ja(a,r)};Mt("padding,margin,Width,Radius",function(s,e){var t="Top",n="Right",r="Bottom",i="Left",o=(e<3?[t,n,r,i]:[t+i,t+n,r+n,r+i]).map(function(a){return e<2?s+a:"border"+a+s});Os[e>1?"border"+s:s]=function(a,l,c,u,d){var p,f;if(arguments.length<4)return p=o.map(function(g){return Tn(a,g,c)}),f=p.join(" "),f.split(p[0]).length===5?p[0]:f;p=(u+"").split(" "),f={},o.forEach(function(g,h){return f[g]=p[h]=p[h]||p[(h-1)/2|0]}),a.init(l,f,d)}});var tu={name:"css",register:Co,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,r,i){var o=this._props,a=e.style,l=n.vars.startAt,c,u,d,p,f,g,h,m,S,b,x,v,w,O,T,R,C;aa||Co(),this.styles=this.styles||jc(e),R=this.styles.props,this.tween=n;for(h in t)if(h!=="autoRound"&&(u=t[h],!(It[h]&&$c(h,t,n,r,e,i)))){if(f=typeof u,g=Os[h],f==="function"&&(u=u.call(n,r,e,i),f=typeof u),f==="string"&&~u.indexOf("random(")&&(u=Li(u)),g)g(this,e,h,u,n)&&(T=1);else if(h.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(h)+"").trim(),u+="",Wn.lastIndex=0,Wn.test(c)||(m=ht(c),S=ht(u),S?m!==S&&(c=Un(e,h,c,S)+S):m&&(u+=m)),this.add(a,"setProperty",c,u,r,i,0,0,h),o.push(h),R.push(h,0,a[h]);else if(f!=="undefined"){if(l&&h in l?(c=typeof l[h]=="function"?l[h].call(n,r,e,i):l[h],et(c)&&~c.indexOf("random(")&&(c=Li(c)),ht(c+"")||c==="auto"||(c+=Yt.units[h]||ht(Tn(e,h))||""),(c+"").charAt(1)==="="&&(c=Tn(e,h))):c=Tn(e,h),p=parseFloat(c),b=f==="string"&&u.charAt(1)==="="&&u.substr(0,2),b&&(u=u.substr(2)),d=parseFloat(u),h in gn&&(h==="autoAlpha"&&(p===1&&Tn(e,"visibility")==="hidden"&&d&&(p=0),R.push("visibility",0,a.visibility),Gn(this,a,"visibility",p?"inherit":"hidden",d?"inherit":"hidden",!d)),h!=="scale"&&h!=="transform"&&(h=gn[h],~h.indexOf(",")&&(h=h.split(",")[0]))),x=h in Rn,x){if(this.styles.save(h),C=u,f==="string"&&u.substring(0,6)==="var(--"){if(u=Ht(e,u.substring(4,u.indexOf(")"))),u.substring(0,5)==="calc("){var A=e.style.perspective;e.style.perspective=u,u=Ht(e,"perspective"),A?e.style.perspective=A:jn(e,"perspective")}d=parseFloat(u)}if(v||(w=e._gsap,w.renderTransform&&!t.parseTransform||Ni(e,t.parseTransform),O=t.smoothOrigin!==!1&&w.smooth,v=this._pt=new Pt(this._pt,a,ze,0,1,w.renderTransform,w,0,-1),v.dep=1),h==="scale")this._pt=new Pt(this._pt,w,"scaleY",w.scaleY,(b?$r(w.scaleY,b+d):d)-w.scaleY||0,ko),this._pt.u=0,o.push("scaleY",h),h+="X";else if(h==="transformOrigin"){R.push(Ot,0,a[Ot]),u=ad(u),w.svg?Eo(e,u,0,O,0,this):(S=parseFloat(u.split(" ")[2])||0,S!==w.zOrigin&&Gn(this,w,"zOrigin",w.zOrigin,S),Gn(this,a,h,As(c),As(u)));continue}else if(h==="svgOrigin"){Eo(e,u,1,O,0,this);continue}else if(h in Zc){fd(this,w,h,p,b?$r(p,b+u):u);continue}else if(h==="smoothOrigin"){Gn(this,w,"smooth",w.smooth,u);continue}else if(h==="force3D"){w[h]=u;continue}else if(h==="transform"){hd(this,u,e);continue}}else h in a||(h=Ur(h)||h);if(x||(d||d===0)&&(p||p===0)&&!Xh.test(u)&&h in a)m=(c+"").substr((p+"").length),d||(d=0),S=ht(u)||(h in Yt.units?Yt.units[h]:m),m!==S&&(p=Un(e,h,c,S)),this._pt=new Pt(this._pt,x?w:a,h,p,(b?$r(p,b+d):d)-p,!x&&(S==="px"||h==="zIndex")&&t.autoRound!==!1?Qh:ko),this._pt.u=S||0,x&&C!==u?(this._pt.b=c,this._pt.e=C,this._pt.r=Uh):m!==S&&S!=="%"&&(this._pt.b=c,this._pt.r=jh);else if(h in a)od.call(this,e,h,c,b?b+u:u);else if(h in e)this.add(e,h,c||e[h],b?b+u:u,r,i);else if(h!=="parseTransform"){Ko(h,u);continue}x||(h in a?R.push(h,0,a[h]):typeof e[h]=="function"?R.push(h,2,e[h]()):R.push(h,1,c||e[h])),o.push(h)}}T&&Yc(this)},render:function(e,t){if(t.tween._time||!la())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:Tn,aliases:gn,getSetter:function(e,t,n){var r=gn[t];return r&&r.indexOf(",")<0&&(t=r),t in Rn&&t!==Ot&&(e._gsap.x||Tn(e,"x"))?n&&Wa===n?t==="scale"?ed:Jh:(Wa=n||{})&&(t==="scale"?td:nd):e.style&&!jo(e.style[t])?Kh:~t.indexOf("-")?Zh:sa(e,t)},core:{_removeProperty:jn,_getMatrix:ua}};At.utils.checkPrefix=Ur;At.core.getStyleSaver=jc;(function(s,e,t,n){var r=Mt(s+","+e+","+t,function(i){Rn[i]=1});Mt(e,function(i){Yt.units[i]="deg",Zc[i]=1}),gn[r[13]]=s+","+e,Mt(n,function(i){var o=i.split(":");gn[o[1]]=r[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");Mt("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(s){Yt.units[s]="px"});At.registerPlugin(tu);var Qn=At.registerPlugin(tu)||At;Qn.core.Tween;const dd={ch1:{eyebrow:"其壹 · 序 PROLOGUE",title:"步天歌",hook:"三千年前，中国人开始给星星命名。",body:["先民把群星分作星官，各有职司。到三国陈卓汇总三家星经时，这张名单已录下二百八十三官、一千四百六十余星。","《步天歌》是把整张星表写成的长诗，一句一宿，循诗可以认星。本站以它为题，把这份名录还原成一片可以走进去的夜空。","向下滚动，步入夜空。"],seal:"步"},ch2:{eyebrow:"其贰 · 星野漫游 THE ATLAS",title:"星野漫游",hook:"循着一首千年前的歌，把星星一颗颗认出来。",body:["古人认星，靠一首歌。《步天歌》把全天星官谱成韵语，一句一宿，循诗可以认星。","三垣居中，四象环列——中国人给天空立的法。","拖拽环视，点击任意一颗星，看看它属于哪一位星官。"],seal:"野"},ch3:{eyebrow:"其叁 · 观象授时 THE GNOMON",title:"观象授时",hook:"一根八尺之表，一条量影之圭，就是一个王朝的天文台。",body:["正午测日影：影最长的那一天是冬至，最短的那一天是夏至。两至既定，四时均分，二十四节气由此排出。","河南登封至今立着这件仪器的放大版：元代郭守敬所建观星台，以高表测影，为《授时历》测得回归年长 365.2425 日——与三百年后的格里历相同。","所谓观象授时：历法的权威，来自对天空的测量。"],seal:"表"},ch4:{eyebrow:"其肆 · 天人之间 THE POLE STAR",title:"天人之间",hook:"全天最尊贵的星域，围着北极建了一座城。",body:["紫微垣，天上的宫城：左右两垣为墙，墙内住着皇族、帝座与百官。","天的秩序映照人的秩序——星官有名有职，如同朝廷。观星，也是观天下。"],seal:"极"},ch5:{eyebrow:"其伍 · 天球仪 THE CELESTIAL SPHERE",title:"天球仪",hook:"「浑天如鸡子，天体圆如弹丸，地如鸡中黄。」——张衡《浑天仪注》",body:["东汉张衡造浑天仪：铜球缀列星，绕轴而转，演示周天星象的起落。天，被做成一颗可以转动的球。","在这里，平面的星图重新团回天球。用你的手指转动它，像转动一件两千年前的仪器。"],seal:"球"},ch6:{eyebrow:"其陆 · 岁差 PRECESSION",title:"一万年",hook:"地轴是一支缓慢摇晃的陀螺，约两万六千年才转完一圈。",body:["东晋虞喜最先察觉：冬至点每年都在悄悄西移，约五十年退一度。他称之为「岁差」——天自为天，岁自为岁。","于是北极星也会换届：三千年前，周的天下以「帝星」（小熊座β）为北辰；今夜属于勾陈一；一万年后，织女星将接过这个位置。","拖动时间，看天极在星空中缓缓画出一个圆。"],seal:"岁"},ch7:{eyebrow:"其柒 · 东西对话 EAST MEETS WEST",title:"东西对话",hook:"同一片星空，两种秩序各自连线。",body:["中国的天狼是一颗独坐的星官，守在南方朱雀的井宿之野，主侵掠；在希腊人的图上，它是大犬座 α，猎户脚边的猎犬。","中国的织女是银河西岸的织女星官，七夕故事的主角；在西方，她是天琴座 α——俄耳甫斯的竖琴。","北斗七星在中国是帝车，运于中央、临制四方；同七颗星，在西方只是大熊的尾巴与后臀。"],seal:"会"},ch8:{eyebrow:"其捌 · 尾声 CREDITS",title:"尾声",hook:"缘起于一首旧诗，收束于一页致谢。",body:["本作品以《步天歌》为题——一卷把星官谱成韵语、便于记诵认星的旧诗。千年之后，诗里的星仍在原处，我们只是换了一种读法。","数据、开源技术与制作说明列于下方。本站为中国大学生计算机设计大赛参赛作品（信息可视化设计类）。"],seal:"跋"}},Ke=[{key:"北斗",target:"北斗",hint:"找到那把勺子——七颗星连成的斗，就挂在北天。",plain:"北斗七星：天帝的车驾，斗柄所指，即是四方与四时。"},{key:"勾陈",target:"勾陈",hint:"找到今夜的正北极——紫微垣中，北极星所在的那一组。",plain:"勾陈六星形如钩，勾陈一就是当代北极星。"},{key:"天狼",target:"天狼",hint:"找到全天最亮的星——南方低空，耀眼夺目的那一颗。",plain:"天狼是全天第一亮星，在井宿之野独坐，古人以它主侵掠。"},{key:"织女",target:"织女",hint:"找到织女——银河西岸，与牵牛隔河相望的亮星。",plain:"织女三星，七夕故事的主角，一万年后将继任北极星。"}],Vi=[{key:"北极",groups:["北极"],title:"北极五星 · 皇族",story:"太子、帝、庶子、后宫、天枢——天皇一家，以星列位。",labels:[{text:"太子",star:"北极一"},{text:"帝",star:"北极二"},{text:"庶子",star:"北极三"},{text:"后宫",star:"北极四"},{text:"天枢",star:"北极五"}]},{key:"勾陈",groups:["勾陈"],title:"勾陈 · 后宫车马",story:"帝之后妃的车驾，形如弯钩。其中最亮的勾陈一，就是今夜的北极星。",labels:[{text:"勾陈一",star:"勾陈一"}]},{key:"帝座",groups:["天皇大帝","五帝内座"],title:"天皇大帝 · 帝座",story:"天皇大帝居中而御，五帝内座环侍在旁——天上至尊的宝座。",labels:[{text:"天皇大帝",star:"天皇大帝"}]},{key:"百官",groups:["尚书","大理","天柱"],title:"尚书 · 大理 · 天柱",story:"秘书、法官、政令——一座悬浮的朝廷。",labels:[{text:"尚书",star:"尚书一"},{text:"大理",star:"大理一"},{text:"天柱",star:"天柱一"}]},{key:"拱北",groups:[],title:"回望 · 众星拱北",story:"「譬如北辰，居其所而众星共之。」——《论语·为政》"}],el={heading:"数据与出处",groups:[{title:"数据来源",lines:["HYG Database v4.4 · CC BY-SA-4.0 · astronexus.com","许可协议：https://creativecommons.org/licenses/by-sa/4.0/","Stellarium 项目 · 中国星空文化数据","《步天歌》 · 丹元子 · 公有领域文本"]},{title:"开源技术",lines:["three.js","GSAP / ScrollTrigger","Vite","TypeScript","Noto Serif SC（思源宋体）· SIL OFL 1.1"]},{title:"制作说明",lines:["AI 辅助设计与编码","全部内容经人工校订"]}]},fa=.35,nu=.8,ar=.05,Br=.3,ps=5,Rs=20,gs=0,In=1,Mo=2;function tl(s){return Math.min(Math.max(s,0),1)}function ru(s){return s<fa?gs:s<nu?In:Mo}function Po(s,e){return s>=2||e>=Rs?2:s>=1?1:0}function Oo(s){const e=(Br-ar)/ps,t=[];for(let i=0;i<ps;i++)t.push(tl((s-(ar+i*e))/e));const n=s<ar?-1:Math.min(Math.floor((s-ar)/e),ps-1),r=tl((s-Br)/(fa-Br));return{active:n,lines:t,finale:r}}const nl=100,rl=.78,pd=1.6,gd=1200,_d=3e3,il=[{text:"北斗之宿七星明",label:"北斗",groups:["北斗"]},{text:"北极五星在其中",label:"北极",groups:["北极"]},{text:"三星中央色最深",label:"心宿",groups:["心宿"]},{text:"牛上直建三河鼓，鼓上三星号织女",label:"河鼓 · 织女",groups:["河鼓","织女"]},{text:"邱下一狼光蓬茸",label:"天狼",groups:["天狼"]}],md=(()=>{const[s,e,t]=sn(297.7,8.6),[n,r,i]=sn(280.5,38.7),o=s+n,a=e+r,l=t+i,c=Math.hypot(o,a,l),u=Math.atan2(l,o)*180/Math.PI,d=Math.asin(a/c)*180/Math.PI;return[Nn(186,56.5),Nn(218.6,76.8),Nn(247.2,-26.8),Nn(u,d),Nn(101.3,-16.7)]})(),sl={北斗:{ra:186,dec:56.5,ring:26},勾陈:{ra:269.6,dec:86.5,ring:12},天狼:{ra:101.3,dec:-16.7,ring:6},织女:{ra:280.5,dec:38.7,ring:8},北极:{ra:218.6,dec:76.8,ring:10},心宿:{ra:247.2,dec:-26.8,ring:8},河鼓:{ra:297.7,dec:8.6,ring:8}},yd=["其一","其二","其三","其四"],bd=`
.ch2-card {
  position: absolute;
  max-width: 440px;
  background: rgba(13, 13, 17, 0.72);
  border: 1px solid rgba(175, 145, 95, 0.28);
  border-radius: 10px;
  padding: 22px 26px;
  backdrop-filter: blur(4px);
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.6s ease, transform 0.6s ease;
  pointer-events: none;
}
.ch2-card::before {
  content: "";
  position: absolute;
  inset: 4px;
  border: 1px solid rgba(201, 162, 39, 0.22);
  border-radius: 7px;
  pointer-events: none;
}
.ch2-card.on { opacity: 1; transform: translateY(0); }

/* ---- 段1：标题/旁白与点题句（居中） ---- */
.ch2-title, .ch2-finale {
  left: 50%; top: 50%;
  transform: translate(-50%, calc(-50% + 16px));
  text-align: center;
}
.ch2-title.on, .ch2-finale.on { transform: translate(-50%, -50%); }
.ch2-title { width: min(470px, 86vw); }
.ch2-finale { width: min(540px, 86vw); }
.ch2-title h2 {
  font-family: var(--font-display, "Songti SC", serif);
  font-size: 34px; font-weight: 400; letter-spacing: 0.14em; color: #c9a227;
}
.ch2-head { display: flex; align-items: flex-start; justify-content: center; gap: 14px; margin-bottom: 12px; }
.ch2-hook { font-size: 15px; line-height: 2; color: #fce1b6; }
.ch2-narr { font-size: 13px; line-height: 2; opacity: 0.8; margin-top: 6px; }
.ch2-finale-text {
  font-family: var(--font-display, "Songti SC", serif);
  font-size: clamp(17px, 2.4vh, 22px);
  letter-spacing: 0.12em; line-height: 2.1; color: #fce1b6;
}

/* ---- 段1：竖排诗句（一句一屏，居中大字） ---- */
.ch2-lines { position: absolute; inset: 0; pointer-events: none; }
.ch2-line {
  position: absolute; left: 50%; top: 46%;
  transform: translate(-50%, -50%);
  display: flex; flex-direction: row-reverse; align-items: flex-start; gap: 20px;
  opacity: 0; transition: opacity 0.7s ease;
}
.ch2-line.on { opacity: 1; }
.ch2-line-text {
  writing-mode: vertical-rl;
  font-family: var(--font-display, "Songti SC", serif);
  font-size: clamp(20px, 3.4vh, 34px);
  letter-spacing: 0.3em;
  color: #fce1b6;
  text-shadow: 0 0 18px rgba(201, 162, 39, 0.35), 0 2px 10px rgba(13, 13, 17, 0.9);
}
.ch2-line-name {
  writing-mode: vertical-rl;
  margin-top: 8px;
  font-size: 13px; letter-spacing: 0.42em;
  color: #c9a227;
  border: 1px solid rgba(201, 162, 39, 0.4); border-radius: 4px;
  padding: 12px 5px;
  background: rgba(13, 13, 17, 0.5);
}

/* ---- 段2：题目卡（底部中央，卡面不拦截点击，仅「跳过」可点） ---- */
.ch2-quest {
  left: 50%; bottom: 4.5vh;
  width: min(470px, 88vw);
  transform: translate(-50%, 16px);
}
.ch2-quest.on { transform: translate(-50%, 0); }
.ch2-quest.swap { animation: ch2QuestIn 0.45s ease; }
@keyframes ch2QuestIn {
  from { opacity: 0; transform: translate(-50%, 10px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}
.ch2-quest-meta { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px; }
.ch2-quest-no { font-size: 11px; letter-spacing: 0.42em; color: #fce1b6; opacity: 0.55; }
.ch2-skip {
  pointer-events: auto;
  background: none; border: none; padding: 2px 4px;
  font-size: 12px; letter-spacing: 0.2em; color: #af915f;
  border-bottom: 1px solid rgba(175, 145, 95, 0.4);
  cursor: pointer;
}
.ch2-skip:hover { color: #c9a227; border-bottom-color: rgba(201, 162, 39, 0.7); }
.ch2-quest-hint { font-size: 15px; line-height: 1.9; color: #f6e8d8; }
.ch2-quest-verse { display: none; }
.ch2-verse-text {
  font-family: var(--font-display, "Songti SC", serif);
  font-size: 15px; line-height: 2; color: #fce1b6;
}
.ch2-verse-from { font-size: 12px; letter-spacing: 0.14em; color: #c9a227; margin-top: 6px; }
.ch2-verse-plain { font-size: 13px; line-height: 1.9; opacity: 0.85; margin-top: 8px; }
.ch2-quest-done {
  display: none;
  font-family: var(--font-display, "Songti SC", serif);
  font-size: 16px; letter-spacing: 0.2em; color: #c9a227;
  text-align: center; padding: 6px 0 2px;
}
.ch2-quest.mode-verse .ch2-quest-hint { display: none; }
.ch2-quest.mode-verse .ch2-quest-verse { display: block; }
.ch2-quest.mode-verse .ch2-skip,
.ch2-quest.mode-done .ch2-skip { visibility: hidden; }
.ch2-quest.mode-done .ch2-quest-hint { display: none; }
.ch2-quest.mode-done .ch2-quest-done { display: block; }

/* ---- 段2：方向箭头（屏幕边缘指向目标） ---- */
.ch2-arrow {
  position: absolute; left: 0; top: 0;
  width: 40px; height: 40px;
  margin: -20px 0 0 -20px;
  opacity: 0; transition: opacity 0.4s ease;
  pointer-events: none;
  filter: drop-shadow(0 0 10px rgba(201, 162, 39, 0.55));
}
.ch2-arrow.on { opacity: 1; }
.ch2-arrow i {
  display: block; width: 100%; height: 100%;
  background: linear-gradient(135deg, #fce1b6, #c9a227);
  clip-path: polygon(100% 50%, 20% 0, 42% 50%, 20% 100%);
  animation: ch2ArrowPulse 1.2s ease-in-out infinite;
}
@keyframes ch2ArrowPulse { 0%, 100% { opacity: 0.8; } 50% { opacity: 1; } }

/* ---- 段3：自由探索面板 ---- */
.ch2-explore { left: 6vw; bottom: 10vh; max-width: 400px; }
.ch2-explore h2 {
  font-family: var(--font-display, "Songti SC", serif);
  font-size: 26px; font-weight: 400; letter-spacing: 0.14em; color: #c9a227;
  margin-bottom: 10px;
}
.ch2-explore p { font-size: 14px; line-height: 2; opacity: 0.88; }
.ch2-recap { margin-top: 10px; font-size: 12px; letter-spacing: 0.12em; color: #fce1b6; opacity: 0.7; }
`;let ol=!1;function vd(){if(ol||typeof document>"u")return;const s=document.createElement("style");s.dataset.ch2="",s.textContent=bd,document.head.appendChild(s),ol=!0}function un(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function xd(s){vd();const e=s.root.querySelector(".pin"),{copy:t}=s;function n(E,M){const I=document.createElement(E);return I.className=M,e.appendChild(I),I}const r=n("div","ch2-card ch2-title");r.innerHTML=`
    <p class="eyebrow">${un(t.eyebrow)}</p>
    <div class="ch2-head">
      <h2>${un(t.title)}</h2>
      ${t.seal?`<div class="seal">${un(t.seal)}</div>`:""}
    </div>
    <p class="ch2-hook">${un(t.hook)}</p>
    <p class="ch2-narr">${un(t.body[0]??"")}</p>
  `;const i=n("div","ch2-lines"),o=il.map(E=>{const M=document.createElement("div");return M.className="ch2-line",M.innerHTML=`<span class="ch2-line-text">${un(E.text)}</span><span class="ch2-line-name">${un(E.label)}</span>`,i.appendChild(M),M}),a=n("div","ch2-card ch2-finale");a.innerHTML=`<p class="ch2-finale-text">${un(t.body[1]??"")}</p>`;const l=n("div","ch2-card ch2-quest");l.innerHTML=`
    <div class="ch2-quest-meta"><span class="ch2-quest-no"></span><button type="button" class="ch2-skip">跳过</button></div>
    <p class="ch2-quest-hint"></p>
    <div class="ch2-quest-verse">
      <p class="ch2-verse-text"></p>
      <p class="ch2-verse-from"></p>
      <p class="ch2-verse-plain"></p>
    </div>
    <p class="ch2-quest-done">星空已全部为你点亮</p>
  `;const c=l.querySelector(".ch2-quest-no"),u=l.querySelector(".ch2-quest-hint"),d=l.querySelector(".ch2-verse-text"),p=l.querySelector(".ch2-verse-from"),f=l.querySelector(".ch2-verse-plain"),g=l.querySelector(".ch2-skip"),h=n("div","ch2-card ch2-explore");h.innerHTML=`
    <h2>现在，把星空交给你</h2>
    <p>${un(t.body[2]??"")}</p>
    <p class="ch2-recap">你已经认出了 ${Ke.map(E=>un(E.key)).join(" · ")}</p>
  `;const m=n("div","atlas-hint");m.textContent="拖拽环视 · 点击星点查看星官";const S=n("div","ch2-arrow");S.appendChild(document.createElement("i"));let b=null;fetch("/data/poem.json").then(E=>E.ok?E.json():null).then(E=>{b=E,A==="verse"&&fe()}).catch(()=>{});let x=-1,v=0,w=0;const O=Ke.map(()=>!1);let T=0,R=0,C="asking",A="hidden",U=null,_=null,$=null,L=null,H=null,X=null,N=0,P=0,D=!1;const y=new Ut;let Q=!1,j=null,F="",K=8,W=null,te=!1,q=!1,Se=!1,Oe=!1,gt=-2,Fe=!1;function we(E){const M=s.sky.groupCount;for(let I=0;I<M;I++)s.sky.setGroupProgress(I,E)}function V(E){te!==E&&(te=E,r.classList.toggle("on",E))}function ue(E){q!==E&&(q=E,a.classList.toggle("on",E))}function Ae(E){Se!==E&&(Se=E,h.classList.toggle("on",E))}function He(E){Oe!==E&&(Oe=E,m.classList.toggle("on",E))}function k(E){gt!==E&&(gt=E,o.forEach((M,I)=>M.classList.toggle("on",I===E)))}function Ye(E){Q!==E&&(Q=E,S.classList.toggle("on",E),E||(S.style.opacity=""))}function ke(E){A=E,l.classList.toggle("on",E!=="hidden"),l.classList.toggle("mode-verse",E==="verse"),l.classList.toggle("mode-done",E==="done"),E!=="hidden"&&(l.classList.remove("swap"),l.offsetWidth,l.classList.add("swap"))}function st(){const E=Ke[w];E&&(c.textContent=`寻星 · ${yd[w]??`第${w+1}题`}`,u.textContent=E.hint,ke("ask"))}function fe(){const E=Ke[w];if(!E)return;const M=b==null?void 0:b[E.target];d.textContent=(M==null?void 0:M.text)??"……",p.textContent=M?`《步天歌》 · ${M.from}`:"《步天歌》",f.textContent=E.plain}function le(){fe(),ke("verse")}function Ie(){if(W)return W;const E=document.createElement("canvas");E.width=E.height=128;const M=E.getContext("2d");return M.strokeStyle="rgba(240, 205, 110, 0.95)",M.lineWidth=6,M.shadowColor="rgba(201, 162, 39, 0.9)",M.shadowBlur=14,M.beginPath(),M.arc(64,64,48,0,Math.PI*2),M.stroke(),W=new Ql(E),W}function ot(E){const M=sl[E];if(!M||j&&F===E)return;Te();const I=new jl({map:Ie(),transparent:!0,depthTest:!1,depthWrite:!1,opacity:.9}),J=new Ul(I),[z,Z,Y]=sn(M.ra,M.dec,nl);J.position.set(z,Z,Y),J.scale.set(M.ring,M.ring,1),J.renderOrder=998,s.sky.addSkyObject(J),j=J,F=E,K=M.ring}function Te(){j&&(s.sky.removeSkyObject(j),j.material.dispose(),j=null,F="")}function at(){const E=x===In&&C==="asking",M=Ke[w];Ye(E&&R>=1),E&&R>=2&&M?ot(M.target):Te()}function _e(){U!==null&&(clearTimeout(U),U=null)}function _t(){_e(),U=setTimeout(()=>{U=null,x===In&&C==="asking"&&(R=Po(T,Rs),at())},Rs*1e3)}function Ue(){_!==null&&(clearTimeout(_),_=null)}function Xt(){$!==null&&(clearTimeout($),$=null)}function Dn(E,M){L==null||L.kill();const I={v:0};L=Qn.to(I,{v:1,duration:M,ease:"power1.out",onUpdate:()=>s.sky.setGroupProgress(E,I.v)})}function $e(){H==null||H.kill();const E={v:pd};s.sky.setBloom({strength:E.v}),H=Qn.to(E,{v:rl,duration:.8,ease:"power2.out",onUpdate:()=>s.sky.setBloom({strength:E.v}),onComplete:()=>{H=null}})}function kr(){const E=Ke[w];C="asking",T=0,R=0,E&&s.sky.setGroupProgress(E.target,0),st(),at(),x===In&&_t()}function tn(){const E=Ke[w];!E||C!=="asking"||(C="revealed",O[w]=!0,_e(),R=0,at(),Dn(E.target,1.1),$e(),le(),Ue(),_=setTimeout(()=>{_=null,bn()},gd))}function bn(){if(Ue(),w+=1,w>=Ke.length){w=Ke.length,C="done",ke("done");return}kr()}function vn(){if(C!=="revealed")return;Ue();const E=Ke[w];E&&s.sky.setGroupProgress(E.target,1),L==null||L.kill(),L=null,w+=1,T=0,R=0,w>=Ke.length?(w=Ke.length,C="done"):C="asking"}function on(){if(x!==In||C!=="asking")return;const E=Ke[w];E&&(O[w]=!0,_e(),R=0,Dn(E.target,.6),bn())}function xn(){_e(),Ue(),Ke.forEach((E,M)=>{O[M]||(s.sky.setGroupProgress(E.target,1),O[M]=!0)}),w=Ke.length,C="done",R=0,at(),ke("done"),Xt(),$=setTimeout(()=>{$=null,C==="done"&&x===Mo&&ke("hidden")},_d)}function re(){we(1),Ke.forEach((E,M)=>{C!=="done"&&M===w&&s.sky.setGroupProgress(E.target,0)}),C==="done"?ke("done"):C==="revealed"?le():st(),at(),C==="asking"&&_t()}function wn(E){if(x!==In||C!=="asking"||!E)return;_t();const M=Ke[w];M&&(E.info.name===M.target?tn():(T+=1,R=Po(T,0),at()))}g.addEventListener("click",on);const mt=new xe;function Rt(){const E=Ke[w],M=E?sl[E.target]:void 0;if(!M){Ye(!1);return}const[I,J,z]=sn(M.ra,M.dec,nl),Z=s.sky.camera,Y=Z.matrixWorldInverse.elements,ee=Y[2]*I+Y[6]*J+Y[10]*z+Y[14];mt.set(I,J,z).project(Z);let Ce=mt.x,ne=mt.y;const Ee=ee>0;if(Ee&&(Ce=-Ce,ne=-ne),!Ee&&Math.abs(Ce)<=.92&&Math.abs(ne)<=.92){S.style.opacity="0";return}S.style.opacity="";const Qe=Math.atan2(-ne,Ce)*180/Math.PI,me=48,ve=Math.min(Math.max((Ce+1)/2*window.innerWidth,me),window.innerWidth-me),de=Math.min(Math.max((1-ne)/2*window.innerHeight,me),window.innerHeight-me);S.style.left=`${ve}px`,S.style.top=`${de}px`,S.style.transform=`rotate(${Qe}deg)`}function kt(E){if(N=requestAnimationFrame(kt),Q&&Rt(),j){const M=K*(1+.13*Math.sin(E*.0024));j.scale.set(M,M,1),j.material.opacity=.7+.3*Math.sin(E*.0024+1)}}function Sn(E,M){M===In&&(_e(),C!=="revealed"&&(L==null||L.kill(),L=null),vn()),E===gs?(s.sky.setPickingEnabled(!1),s.sky.setLabelsEnabled(!0),s.sky.setHoverTipEnabled(!0),we(0),Fe=!1,ke("hidden"),Ae(!1),He(!1),at()):E===In?(s.sky.setPickingEnabled(!0),s.sky.setLabelsEnabled(!1),s.sky.setHoverTipEnabled(!1),V(!1),k(-1),ue(!1),Ae(!1),He(!1),re()):(s.sky.setPickingEnabled(!0),s.sky.setLabelsEnabled(!0),s.sky.setHoverTipEnabled(!0),V(!1),k(-1),ue(!1),C!=="done"?xn():ke("hidden"),Ae(!0),He(!0))}function Ln(E){const M=Oo(E);(M.finale>0||Fe)&&(we(M.finale),Fe=M.finale>0),M.lines.forEach((I,J)=>{const z=il[J];if(z)for(const Z of z.groups)s.sky.setGroupProgress(Z,I)}),V(E<ar),k(E>=ar&&E<Br?M.active:-1),ue(E>=Br)}function Vt(E){v=E;const M=ru(E);if(M!==x){const I=x;x=M,Sn(M,I)}x===gs?Ln(E):x===Mo&&we(1)}return{enter(){s.root.classList.add("inview"),s.sky.setLabelsEnabled(!0),X==null||X(),X=s.sky.onPick(wn),N&&cancelAnimationFrame(N),N=requestAnimationFrame(kt),Vt(v)},update(E){Vt(E)},frame(E){const M=x===gs&&v>=ar&&v<Br?Oo(v).active:-1,I=M>=0?.85:0;if(P+=(I-P)*(1-Math.exp(-3*E)),P<.01){D&&(D=!1,s.sky.setGazeBlend(0));return}const J=md[Math.max(M,0)];D?y.slerp(J,1-Math.exp(-2.5*E)):(D=!0,y.copy(J)),s.sky.setGazeBlend(P,y)},exit(){s.root.classList.remove("inview"),cancelAnimationFrame(N),N=0,X==null||X(),X=null,_e(),Ue(),Xt(),vn(),L==null||L.kill(),L=null,H&&(H.kill(),H=null,s.sky.setBloom({strength:rl})),Te(),W==null||W.dispose(),W=null,Ye(!1),P=0,D=!1,s.sky.setGazeBlend(0),s.sky.setLabelsEnabled(!0),s.sky.setHoverTipEnabled(!0),s.sky.setPickingEnabled(!1),V(!1),k(-1),ue(!1),ke("hidden"),Ae(!1),He(!1),x=-1}}}const wd=Object.freeze(Object.defineProperty({__proto__:null,CH2_IDLE_HINT_SECONDS:Rs,CH2_SEG1_END:fa,CH2_SEG1_LINE_COUNT:ps,CH2_SEG2_END:nu,ch2HintLevel:Po,ch2Seg1LineStates:Oo,ch2SegmentOf:ru,createChapter:xd},Symbol.toStringTag,{value:"Module"})),iu=Math.PI/180,Sd=34.7,su=8,zr=355,Ao=["冬至","小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪"];function kd(s){return-23.44*Math.cos(2*Math.PI*(s+10)/365.25)}function Ro(s){return 90-Math.abs(Sd-kd(s))}function al(s){return su/Math.tan(Ro(s)*iu)}function Td(s){let e=0,t=999,n=0;for(let r=0;r<Ao.length;r++){const i=(zr+r*15.22)%365;let o=s-i;o>182.5?o-=365:o<-182.5&&(o+=365),Math.abs(o)<t&&(t=Math.abs(o),e=r,n=o)}return{name:Ao[e],index:e,day:(zr+e*15.22)%365,offset:Math.round(n)}}function Cd(s){const e=[31,28,31,30,31,30,31,31,30,31,30,31];let t=Math.min(Math.max(Math.round(s),1),365),n=0;for(;n<11&&t>e[n];)t-=e[n],n++;return{month:n+1,day:t}}const ji=["零","一","二","三","四","五","六","七","八","九"];function no(s){if(s<10)return ji[s];if(s<20)return"十"+(s%10?ji[s%10]:"");const e=Math.floor(s/10);return ji[e]+"十"+(s%10?ji[s%10]:"")}function Cr(s){return s-Math.floor(s)}function Ed(s,e,t,n,r,i){s.beginPath(),s.moveTo(e+i,t),s.arcTo(e+n,t,e+n,t+r,i),s.arcTo(e+n,t+r,e,t+r,i),s.arcTo(e,t+r,e,t,i),s.arcTo(e,t,e+n,t,i),s.closePath()}function Md(){const s=document.createElement("canvas");s.width=64,s.height=64;const e=s.getContext("2d");if(e){const t=e.createRadialGradient(32,32,2,32,32,32);t.addColorStop(0,"rgba(252, 225, 182, 0.9)"),t.addColorStop(.3,"rgba(252, 225, 182, 0.25)"),t.addColorStop(1,"rgba(252, 225, 182, 0)"),e.fillStyle=t,e.fillRect(0,0,64,64)}return s}const Er=8,nr=15,Pd=`
.gw {
  width: min(560px, 44vw);
  background: rgba(13, 13, 17, 0.72);
  border: 1px solid rgba(175, 145, 95, 0.28);
  border-radius: 10px;
  padding: 16px 18px 10px;
  backdrop-filter: blur(4px);
  pointer-events: auto;
  opacity: 0;
  transform: translateY(26px);
  transition: opacity 0.9s var(--ease-sig) 0.12s, transform 0.9s var(--ease-sig) 0.12s;
}
.chapter.inview .gw { opacity: 1; transform: none; }
.gw-canvas { display: block; width: 100%; height: 300px; }
.gw-readout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px 18px;
  margin: 10px 2px 12px;
}
.gw-cell { display: flex; align-items: baseline; gap: 8px; min-width: 0; }
.gw-k { flex: none; font-size: 11px; letter-spacing: 0.2em; color: rgba(175, 145, 95, 0.85); }
.gw-v {
  font-family: var(--font-display);
  font-size: 14px;
  letter-spacing: 0.06em;
  color: #fce1b6;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.gw-slider-wrap { position: relative; padding: 0 2px; }
.gw-slider {
  -webkit-appearance: none;
  appearance: none;
  display: block;
  width: 100%;
  height: 22px;
  margin: 0;
  background: transparent;
  cursor: pointer;
}
.gw-slider:focus-visible { outline: 1px solid rgba(201, 162, 39, 0.6); outline-offset: 2px; }
.gw-slider::-webkit-slider-runnable-track {
  height: 2px;
  background: linear-gradient(90deg, rgba(175, 145, 95, 0.25), rgba(201, 162, 39, 0.65), rgba(175, 145, 95, 0.25));
}
.gw-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 14px;
  height: 14px;
  margin-top: -6px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #fce1b6, #c9a227 60%, #8a6f2c);
  border: 1px solid rgba(252, 225, 182, 0.7);
  box-shadow: 0 0 10px rgba(201, 162, 39, 0.55);
}
.gw-slider::-moz-range-track { height: 2px; background: rgba(175, 145, 95, 0.45); }
.gw-slider::-moz-range-thumb {
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #c9a227;
  border: 1px solid rgba(252, 225, 182, 0.7);
  box-shadow: 0 0 10px rgba(201, 162, 39, 0.55);
}
.gw-marks { position: relative; height: 30px; margin-top: 1px; }
.gw-tick {
  position: absolute;
  top: 0;
  width: 1px;
  height: 6px;
  background: rgba(175, 145, 95, 0.55);
  transform: translateX(-50%);
}
.gw-mark {
  position: absolute;
  top: 8px;
  transform: translateX(-50%);
  background: none;
  border: none;
  padding: 2px 3px;
  font-family: var(--font-body);
  font-size: 10px;
  letter-spacing: 0.14em;
  color: rgba(252, 225, 182, 0.6);
  cursor: pointer;
}
.gw-mark:hover, .gw-mark:focus-visible {
  color: #fce1b6;
  outline: none;
  text-shadow: 0 0 8px rgba(252, 225, 182, 0.4);
}
.gw-mark--start { transform: none; }
.gw-mark--end { transform: translateX(-100%); }
.gw-fallback { font-size: 13px; color: rgba(252, 225, 182, 0.7); padding: 24px 8px; text-align: center; }
@media (max-width: 960px) {
  .gw { padding: 12px 14px 8px; }
  .gw-canvas { height: 230px; }
  .gw-readout { margin: 8px 0 10px; }
  .gw-v { font-size: 13px; }
}
`;let ll=!1;function Od(){if(ll||typeof document>"u")return;const s=document.createElement("style");s.dataset.gnomonWidget="",s.textContent=Pd,document.head.appendChild(s),ll=!0}function Ad(s={}){Od();const e=document.createElement("div");e.className="gw",e.setAttribute("role","group"),e.setAttribute("aria-label","圭表测影：拖动滑杆查看一年中正午日影变化");const t=document.createElement("canvas");t.className="gw-canvas",e.appendChild(t);const n=document.createElement("div");n.className="gw-readout",n.innerHTML=`
    <div class="gw-cell"><span class="gw-k">日期</span><span class="gw-v" data-r="date">——</span></div>
    <div class="gw-cell"><span class="gw-k">节气</span><span class="gw-v" data-r="term">——</span></div>
    <div class="gw-cell"><span class="gw-k">正午影长</span><span class="gw-v" data-r="shadow">——</span></div>
    <div class="gw-cell"><span class="gw-k">太阳高度</span><span class="gw-v" data-r="alt">——</span></div>`,e.appendChild(n);const r=n.querySelector('[data-r="date"]'),i=n.querySelector('[data-r="term"]'),o=n.querySelector('[data-r="shadow"]'),a=n.querySelector('[data-r="alt"]'),l=document.createElement("div");l.className="gw-slider-wrap";const c=document.createElement("input");c.className="gw-slider",c.type="range",c.min="1",c.max="365",c.step="1",c.value=String(zr),c.setAttribute("aria-label","一年中的第几天"),l.appendChild(c);const u=document.createElement("div");u.className="gw-marks";for(const _ of["冬至","春分","夏至","秋分"]){const $=Ao.indexOf(_),L=(zr+$*15.22)%365,H=(L-1)/364,X=`calc(7px + (100% - 14px) * ${H.toFixed(4)})`,N=document.createElement("i");N.className="gw-tick",N.style.left=X,u.appendChild(N);const P=document.createElement("button");P.type="button",P.className="gw-mark"+(H<.08?" gw-mark--start":H>.92?" gw-mark--end":""),P.style.left=X,P.textContent=_,P.title=`跳至${_}（第 ${Math.round(L)} 天）`,P.addEventListener("click",()=>O(Math.round(L))),u.appendChild(P)}l.appendChild(u),e.appendChild(l);const d=t.getContext("2d");if(!d){const _=document.createElement("p");_.className="gw-fallback",_.textContent="当前浏览器无法创建绘图上下文，圭表测影演示不可用。",t.replaceWith(_)}const p=Md(),f=Array.from({length:14},(_,$)=>({rx:Cr(Math.sin($*12.9898)*43758.5453),ry:Cr(Math.sin($*78.233)*12543.217),len:.1+.25*Cr(Math.sin($*3.7)*9876.543),dark:$%2===0})),g=Array.from({length:5},(_,$)=>({dx:-.3+.6*Cr(Math.sin($*5.13)*3210.7),ry:.12+.76*Cr(Math.sin($*9.31)*7777.7),h:.08+.12*Cr(Math.sin($*2.17)*5555.5)}));let h=zr,m=zr,S=!1,b=!0,x=0,v=0,w=0;function O(_){m=Math.min(Math.max(_,1),365),T()}function T(){x||(x=requestAnimationFrame(R))}function R(){var H;x=0;const _=h,$=m-h;h=Math.abs($)<.04?m:h+$*.2;const L=h!==_;(L||b)&&(C(),A(),b=!1),L&&((H=s.onDayChange)==null||H.call(s,h)),h!==m&&(x=requestAnimationFrame(R))}function C(){const _=Math.min(Math.max(Math.round(h),1),365),$=Cd(_);r.textContent=`${$.month} 月 ${$.day} 日 · 第 ${_} 天`;const L=Td(_);i.textContent=L.offset===0?`正值【${L.name}】`:L.offset>0?`【${L.name}】后 ${L.offset} 天`:`距【${L.name}】 ${-L.offset} 天`;const H=al(h);let X=Math.floor(H),N=Math.round((H-X)*10);N===10&&(X+=1,N=0),o.textContent=`${no(X)}尺${N>0?no(N)+"寸":"整"} · ${H.toFixed(2)} 尺`,a.textContent=`${Ro(h).toFixed(1)}°`,!S&&document.activeElement!==c&&(c.value=String(_))}function A(){if(!d||v<60||w<60)return;const _=d,$=v,L=w;_.clearRect(0,0,$,L);const H=_.createLinearGradient(0,0,0,L);H.addColorStop(0,"rgba(22, 38, 56, 0.5)"),H.addColorStop(.6,"rgba(13, 13, 17, 0.12)"),H.addColorStop(1,"rgba(13, 13, 17, 0.4)"),_.fillStyle=H,_.fillRect(0,0,$,L);const X=al(h),N=Ro(h),P=Math.min(Math.max(N,6),82)*iu,D=L-62,y=Math.min(($-150)/14.2,(D-92)/8),Q=su*y,j=13.6*y,F=($-j-110)/2+100,K=D-Q,W=F+X*y,te=F-12,q=F+j,Se=_.createRadialGradient(F-60,D,0,F-60,D,220);Se.addColorStop(0,`rgba(252, 225, 182, ${(.05+.04*Math.sin(P)).toFixed(3)})`),Se.addColorStop(1,"rgba(252, 225, 182, 0)"),_.fillStyle=Se,_.fillRect(0,D-160,$,200),_.strokeStyle="rgba(175, 145, 95, 0.35)",_.lineWidth=1,_.beginPath(),_.moveTo(14,D+nr),_.lineTo($-14,D+nr),_.stroke();const Oe=_.createLinearGradient(0,D,0,D+Er);Oe.addColorStop(0,"#3b4552"),Oe.addColorStop(1,"#252d38"),_.fillStyle=Oe,Ed(_,te,D,q-te,Er,2.5),_.fill();const gt=_.createLinearGradient(0,D+Er,0,D+nr);gt.addColorStop(0,"#1a212b"),gt.addColorStop(1,"#10151d"),_.fillStyle=gt,_.fillRect(te,D+Er,q-te,nr-Er),_.strokeStyle="rgba(252, 225, 182, 0.14)",_.beginPath(),_.moveTo(te+2,D+.5),_.lineTo(q-2,D+.5),_.stroke();for(const le of f){const Ie=te+6+le.rx*(q-te-12),ot=D+1.5+le.ry*(nr-3);_.strokeStyle=le.dark?"rgba(0, 0, 0, 0.16)":"rgba(252, 225, 182, 0.05)",_.beginPath(),_.moveTo(Ie,ot),_.lineTo(Ie+le.len*40,ot),_.stroke()}const Fe=y>=26;_.lineWidth=1;for(let le=0;le<=136;le++){const Ie=le%10===0;if(!Ie&&!Fe&&le%5!==0)continue;const ot=F+le*y/10;if(ot>q-1.5)break;const Te=Ie?6:le%5===0?4:2.5;_.strokeStyle=Ie?"rgba(8, 10, 14, 0.9)":"rgba(8, 10, 14, 0.6)",_.beginPath(),_.moveTo(ot,D+1),_.lineTo(ot,D+1+Te),_.stroke()}_.font='9px "STSong", "SimSun", "Songti SC", serif',_.fillStyle="rgba(175, 145, 95, 0.9)",_.textAlign="center",_.textBaseline="top";for(let le=0;le<=13;le++){const Ie=F+le*y;if(Ie>q-2)break;_.fillText(no(le),Ie,D+nr+4)}const we=_.createLinearGradient(F,0,W,0);we.addColorStop(0,"rgba(3, 5, 9, 0.78)"),we.addColorStop(.75,"rgba(3, 5, 9, 0.55)"),we.addColorStop(1,"rgba(3, 5, 9, 0.15)"),_.fillStyle=we,_.fillRect(F,D+1,Math.max(W-F,1.5),Er-1),_.strokeStyle="#c9a227",_.lineWidth=1.5,_.beginPath(),_.moveTo(W,D-4),_.lineTo(W,D+nr),_.stroke(),_.save(),_.translate(W,D-7),_.rotate(Math.PI/4),_.fillStyle="#c9a227",_.fillRect(-2.4,-2.4,4.8,4.8),_.restore();const V=Math.max(6,y*.38),ue=_.createLinearGradient(F-V/2,0,F+V/2,0);ue.addColorStop(0,"#3f2e1a"),ue.addColorStop(.35,"#a87f3d"),ue.addColorStop(.5,"#dcba68"),ue.addColorStop(.65,"#a87f3d"),ue.addColorStop(1,"#372812"),_.fillStyle=ue,_.fillRect(F-V/2,K,V,Q);for(const le of g)_.fillStyle="rgba(112, 148, 126, 0.14)",_.fillRect(F+le.dx*V-.75,K+le.ry*Q,1.5,le.h*Q);_.fillStyle="#8a6a35",_.beginPath(),_.moveTo(F-V*.85,K),_.lineTo(F-V*.42,K-6),_.lineTo(F+V*.42,K-6),_.lineTo(F+V*.85,K),_.closePath(),_.fill(),_.strokeStyle="rgba(252, 225, 182, 0.35)",_.lineWidth=1,_.beginPath(),_.moveTo(F-V*.42,K-6),_.lineTo(F+V*.42,K-6),_.stroke();const Ae=_.createLinearGradient(0,D-11,0,D);Ae.addColorStop(0,"#5a4423"),Ae.addColorStop(1,"#2c2010"),_.fillStyle=Ae,_.beginPath(),_.moveTo(F-V*.8,D-11),_.lineTo(F+V*.8,D-11),_.lineTo(F+V*1.7,D),_.lineTo(F-V*1.7,D),_.closePath(),_.fill(),_.font='10px "STSong", "SimSun", "Songti SC", serif',_.fillStyle="rgba(201, 162, 39, 0.8)",_.textAlign="center",_.textBaseline="top";const He=F-V/2-11;"表高八尺".split("").forEach((le,Ie)=>{_.fillText(le,He,K+18+Ie*13)});const k=-Math.cos(P),Ye=-Math.sin(P);let ke=Math.min(170,(K-28)/Math.sin(P),(F-30)/Math.cos(P));ke=Math.max(ke,26);const st=F+k*ke,fe=K+Ye*ke;_.drawImage(p,st-30,fe-30,60,60),_.fillStyle="#fce1b6",_.beginPath(),_.arc(st,fe,8.5,0,Math.PI*2),_.fill(),_.strokeStyle="rgba(201, 162, 39, 0.75)",_.lineWidth=1,_.beginPath(),_.arc(st,fe,11.5,0,Math.PI*2),_.stroke(),_.strokeStyle="rgba(252, 225, 182, 0.4)",_.beginPath(),_.moveTo(st-k*12,fe-Ye*12),_.lineTo(F,K),_.stroke(),_.setLineDash([3,4]),_.strokeStyle="rgba(252, 225, 182, 0.22)",_.beginPath(),_.moveTo(F,K),_.lineTo(W,D),_.stroke(),_.setLineDash([])}c.addEventListener("input",()=>{const _=Number(c.value);m=_,S||(h=_),T()}),c.addEventListener("pointerdown",()=>{S=!0}),window.addEventListener("pointerup",()=>{S=!1}),window.addEventListener("pointercancel",()=>{S=!1});function U(){const _=t.clientWidth,$=t.clientHeight;if(!(_===v&&$===w)){if(v=_,w=$,d&&_>0&&$>0){const L=Math.min(window.devicePixelRatio||1,2);t.width=Math.round(_*L),t.height=Math.round($*L),d.setTransform(L,0,0,L,0,0)}b=!0,T()}}return typeof ResizeObserver<"u"?new ResizeObserver(U).observe(t):window.addEventListener("resize",U),U(),{el:e,get day(){return h},setDayTarget:O}}const Rd=`
.gnomon-layout {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3vw;
  padding: 0 6vw;
}
.gnomon-layout .chapter-panel {
  position: static;
  flex: 0 1 380px;
}
@media (max-width: 960px) {
  .gnomon-layout {
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    gap: 2vh;
    padding: 0 5vw;
  }
  .gnomon-layout .chapter-panel { flex: none; max-width: none; padding: 16px 18px; }
  .gnomon-layout .chapter-panel h2 { font-size: 24px; }
  .gnomon-layout .chapter-panel p { font-size: 13px; line-height: 1.8; }
  .gnomon-layout .gw { width: 100%; }
}
`;let cl=!1;function Dd(){if(cl||typeof document>"u")return;const s=document.createElement("style");s.dataset.gnomonLayout="",s.textContent=Rd,document.head.appendChild(s),cl=!0}function ni(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function ul(s){return s/365*Math.PI*2}function Ld(s){const e=s.root.querySelector(".pin"),{copy:t}=s,n=document.createElement("div");n.className="gnomon-layout";const r=document.createElement("div");r.className="chapter-panel",r.innerHTML=`
    <p class="eyebrow">${ni(t.eyebrow)}</p>
    <div class="chapter-head">
      <h2>${ni(t.title)}</h2>
      ${t.seal?`<div class="seal">${ni(t.seal)}</div>`:""}
    </div>
    <p class="hook">${ni(t.hook)}</p>
    ${t.body.map(a=>`<p>${ni(a)}</p>`).join("")}
  `,n.appendChild(r);let i=!1;const o=Ad({onDayChange:a=>{i&&s.sky.setSkyRotation(ul(a),0)}});return n.appendChild(o.el),e.appendChild(n),Dd(),{enter(){i=!0,s.root.classList.add("inview"),s.sky.setLabelsEnabled(!1),s.sky.setSkyRotation(ul(o.day),0)},update(a){const l=Math.min(Math.max(a,0),1);o.setDayTarget(1+l*364)},exit(){i=!1,s.root.classList.remove("inview"),s.sky.setLabelsEnabled(!0),s.sky.setSkyRotation(0,0)}}}const zd=Object.freeze(Object.defineProperty({__proto__:null,createChapter:Ld},Symbol.toStringTag,{value:"Module"}));function qs(s){return Math.min(Math.max(s,0),1)}function Do(s){const e=qs(s);return e*e*(3-2*e)}const br=.12,pr=.92,gr=5,Fi=(pr-br)/gr,ha=br+4*Fi,ou=.03,au=.45;function _s(s){const e=qs(s);return e<br?0:e>=pr?6:1+Math.min(Math.floor((e-br)/Fi),gr-1)}function lu(s){return qs(s/br)}function cu(s,e){const t=br+e*Fi;return qs((s-t)/(Fi*au))}function Lo(s){const e=Do((s-(ha-.02))/.02),t=1-Do((s-pr)/.05);return e*t}function uu(s,e){const t=new Set;let n=0;return e.map(r=>{if(r){const o=s.find(a=>!t.has(a.hip)&&a.name===r);if(o)return t.add(o.hip),o}for(;n<s.length&&t.has(s[n].hip);)n++;const i=s[n];return i?(t.add(i.hip),n++,i):null})}const fu=[{ra:175,dec:81,radius:.35,fov:50,gazeW:.85},{ra:218.6,dec:76.8,radius:.55,fov:42,gazeW:.85},{ra:269.6,dec:86.5,radius:.55,fov:42,gazeW:.85},{ra:41.8,dec:81,radius:.55,fov:42,gazeW:.85},{ra:261.7,dec:75.5,radius:.55,fov:42,gazeW:.85},{ra:0,dec:89,radius:.55,fov:55,gazeW:.85}],Ds={radius:3,dir:[.52,.7,.49],fov:50},fl=100,Id=["紫微左垣","紫微右垣"],$d=["第一站","第二站","第三站","第四站","第五站"],Nd="序 · 天上有座城",Fd=28,hl=44,Ui=60,hu=fu.map(s=>({dir:new xe(...sn(s.ra,s.dec,1)),radius:s.radius,fov:s.fov,gazeQ:Nn(s.ra,s.dec),gazeW:s.gazeW})),Bd=new xe(...Ds.dir).normalize(),ri=hu[gr],Gd=`
.ch4-layer { position: absolute; inset: 0; pointer-events: none; }

/* ---- 贴星标签：小圆点 + 短引导线 + 星名（位置每帧投影写入 left/top） ---- */
.ch4-tag {
  position: absolute;
  left: 0; top: 0;
  opacity: 0;
  transform: scale(0.5);
  transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.ch4-tag.on { opacity: 1; transform: scale(1); }
.ch4-tag-dot {
  position: absolute;
  left: 0; top: 0;
  width: 7px; height: 7px;
  margin: -3.5px 0 0 -3.5px;
  border-radius: 50%;
  background: #fce1b6;
  box-shadow: 0 0 8px rgba(252, 225, 182, 0.9), 0 0 2px #ffffff;
}
.ch4-tag-line {
  position: absolute;
  left: 0; top: 0;
  width: ${Fd}px; height: 1px;
  background: linear-gradient(90deg, rgba(201, 162, 39, 0.9), rgba(201, 162, 39, 0.12));
  transform-origin: 0 50%;
}
.ch4-tag-name {
  position: absolute;
  left: 0; top: 0;
  white-space: nowrap;
  font-family: var(--font-display, "Songti SC", serif);
  font-size: 15px;
  letter-spacing: 0.24em;
  color: #c9a227;
  text-shadow: 0 1px 8px rgba(13, 13, 17, 0.9);
}

/* ---- 卡片基座（描金双细线对齐 app.css 的 .chapter-panel） ---- */
.ch4-card {
  position: absolute;
  max-width: 460px;
  background: rgba(13, 13, 17, 0.72);
  border: 1px solid rgba(175, 145, 95, 0.28);
  border-radius: 10px;
  padding: 22px 26px;
  backdrop-filter: blur(4px);
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.6s ease, transform 0.6s ease;
  pointer-events: none;
}
.ch4-card::before {
  content: "";
  position: absolute;
  inset: 4px;
  border: 1px solid rgba(201, 162, 39, 0.22);
  border-radius: 7px;
  pointer-events: none;
}
.ch4-card.on { opacity: 1; transform: translateY(0); }

/* ---- 开场卡（居中） ---- */
.ch4-opening {
  left: 50%; top: 50%;
  width: min(500px, 86vw);
  text-align: center;
  transform: translate(-50%, calc(-50% + 16px));
}
.ch4-opening.on { transform: translate(-50%, -50%); }
.ch4-opening h2 {
  font-family: var(--font-display, "Songti SC", serif);
  font-size: 34px; font-weight: 400; letter-spacing: 0.14em; color: #c9a227;
}
.ch4-opening .chapter-head { justify-content: center; margin-bottom: 6px; }
.ch4-opening-tag {
  font-family: var(--font-display, "Songti SC", serif);
  font-size: 17px; letter-spacing: 0.32em; color: #fce1b6;
  margin-bottom: 10px;
}
.ch4-opening .hook { font-size: 15px; line-height: 2; color: #fce1b6; margin-bottom: 6px; }
.ch4-opening-body { font-size: 13px; line-height: 2; opacity: 0.8; }

/* ---- 站点卡（底部中央，换站翻页） ---- */
.ch4-stop {
  left: 50%; bottom: 4.5vh;
  width: min(470px, 88vw);
  transform: translate(-50%, 16px);
}
.ch4-stop.on { transform: translate(-50%, 0); }
.ch4-stop.swap { animation: ch4StopIn 0.45s ease; }
@keyframes ch4StopIn {
  from { opacity: 0; transform: translate(-50%, 10px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}
.ch4-stop-tag {
  font-size: 11px; letter-spacing: 0.42em; color: #fce1b6; opacity: 0.55;
  margin-bottom: 8px;
}
.ch4-stop-title {
  font-family: var(--font-display, "Songti SC", serif);
  font-size: 22px; font-weight: 400; letter-spacing: 0.14em; color: #c9a227;
  margin-bottom: 8px;
}
.ch4-stop-story { font-size: 14px; line-height: 1.9; color: #f6e8d8; }
`;let dl=!1;function Hd(){if(dl||typeof document>"u")return;const s=document.createElement("style");s.dataset.ch4="",s.textContent=Gd,document.head.appendChild(s),dl=!0}function ii(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Yd(s){Hd();const e=s.root.querySelector(".pin"),{copy:t}=s,n=document.createElement("div");n.className="ch4-card ch4-opening",n.innerHTML=`
    <p class="eyebrow">${ii(t.eyebrow)}</p>
    <div class="chapter-head">
      <h2>${ii(t.title)}</h2>
      ${t.seal?`<div class="seal">${ii(t.seal)}</div>`:""}
    </div>
    <p class="ch4-opening-tag">${Nd}</p>
    <p class="hook">${ii(t.hook)}</p>
    ${t.body.map(P=>`<p class="ch4-opening-body">${ii(P)}</p>`).join("")}
  `,e.appendChild(n);const r=document.createElement("div");r.className="ch4-card ch4-stop",r.innerHTML=`
    <p class="ch4-stop-tag"></p>
    <h3 class="ch4-stop-title"></h3>
    <p class="ch4-stop-story"></p>
  `,e.appendChild(r);const i=r.querySelector(".ch4-stop-tag"),o=r.querySelector(".ch4-stop-title"),a=r.querySelector(".ch4-stop-story"),l=document.createElement("div");l.className="ch4-layer";const c=[];Vi.forEach((P,D)=>{(P.labels??[]).forEach((y,Q)=>{const j=document.createElement("div");j.className="ch4-tag";const F=document.createElement("i");F.className="ch4-tag-dot";const K=-90+Q*137.5,W=K*Math.PI/180,te=document.createElement("i");te.className="ch4-tag-line",te.style.transform=`rotate(${K}deg)`;const q=document.createElement("span");q.className="ch4-tag-name",q.textContent=y.text,q.style.transform=`translate(${Math.cos(W)*hl}px, ${Math.sin(W)*hl}px) translate(-50%, -50%)`,j.append(F,te,q),l.appendChild(j),c.push({el:j,stopIdx:D,labelIdx:Q,shown:!1})})}),e.appendChild(l);let u=null;Promise.all([fetch("/data/stars.json").then(P=>P.ok?P.json():null),fetch("/data/asterisms.json").then(P=>P.ok?P.json():null)]).then(([P,D])=>{if(!P||!D)return;const y=new Map(P.stars.map(j=>[j.hip,j])),Q=new Map(D.asterisms.map(j=>[j.name,j]));u=Vi.map(j=>{const F=j.groups.flatMap(W=>{var te;return(((te=Q.get(W))==null?void 0:te.stars)??[]).map(q=>y.get(q)).filter(q=>q!==void 0)});return uu(F,(j.labels??[]).map(W=>W.star)).map(W=>{if(!W)return null;const[te,q,Se]=sn(W.ra,W.dec,fl);return new xe(te,q,Se)})})}).catch(()=>{});let d=!1,p=0,f=!1,g=.35,h=50;const m=new xe(0,1,0),S=new Ut;let b=0,x=0,v=0,w=!1,O=-1;function T(P){w!==P&&(w=P,n.classList.toggle("on",P))}function R(P){if(O===P)return;if(O=P,P<0){r.classList.remove("on");return}const D=Vi[P];D&&(i.textContent=$d[P]??`第${P+1}站`,o.textContent=D.title,a.textContent=D.story,r.classList.add("on"),r.classList.remove("swap"),r.offsetWidth,r.classList.add("swap"))}function C(P,D){P.shown!==D&&(P.shown=D,P.el.classList.toggle("on",D))}function A(){for(const P of c)C(P,!1)}function U(P){p=P;const D=_s(P),y=lu(P);for(const Q of Id)s.sky.setGroupProgress(Q,y);Vi.forEach((Q,j)=>{const F=cu(P,j);for(const K of Q.groups)s.sky.setGroupProgress(K,F)}),T(D===0),R(D>=1&&D<=gr?D-1:D===6?gr-1:-1)}const _=new xe,$=new xe;function L(P,D,y){const Q=Math.cos(D),j=Math.sin(D);return y.set(P.x*Q+P.z*j,P.y,-P.x*j+P.z*Q)}function H(P){const D=p,y=_s(D);let Q,j,F;const K=$;let W;if(y===6){const q=Do((D-pr)/(1-pr));Q=Me.lerp(ri.radius,Ds.radius,q),j=Me.lerp(ri.fov,Ds.fov,q),F=(1-q)*ri.gazeW,K.copy(ri.dir).lerp(Bd,q).normalize(),W=ri.gazeQ}else{const q=hu[y];Q=q.radius,j=q.fov,F=q.gazeW,K.copy(q.dir),W=q.gazeQ}if(!f){f=!0;const q=s.sky.camera;g=Math.max(q.position.length()/fl,.005),h=q.fov,m.copy(q.position).normalize(),m.lengthSq()<1e-8&&m.set(0,1,0),S.copy(q.quaternion),b=1}const te=1-Math.exp(-3*P);g+=(Q-g)*te,h+=(j-h)*te,m.lerp(K,te).normalize(),b+=(F-b)*te,S.slerp(W,1-Math.exp(-2.5*P)),s.sky.setRadius(g),s.sky.setPositionDir(m),s.sky.setFov(h),b<.005&&F===0?s.sky.setGazeBlend(0):s.sky.setGazeBlend(b,S)}function X(P){const D=p;D>=ha&&D<pr?x+=ou*P:Lo(D)===0&&(x=0);const y=x*Lo(D);Math.abs(y-v)>1e-6&&(v=y,s.sky.setSkyRotation(y,0))}function N(){var j;const P=_s(p),D=P>=1&&P<=gr?P-1:-1,y=window.innerWidth,Q=window.innerHeight;for(const F of c){const K=(j=u==null?void 0:u[F.stopIdx])==null?void 0:j[F.labelIdx];if(F.stopIdx!==D||!K){C(F,!1);continue}L(K,v,_);const W=Bu([_.x,_.y,_.z],s.sky.camera,{width:y,height:Q});if(!W||W.x<-Ui||W.x>y+Ui||W.y<-Ui||W.y>Q+Ui){C(F,!1);continue}F.el.style.left=`${W.x}px`,F.el.style.top=`${W.y}px`,C(F,!0)}}return{enter(){s.root.classList.add("inview"),d=!0,f=!1,s.sky.setLabelsEnabled(!1),U(p)},update(P){U(P)},frame(P){d&&(H(P),X(P),N())},exit(){s.root.classList.remove("inview"),d=!1,f=!1,x=0,v=0,s.sky.setSkyRotation(0,0),s.sky.setGazeBlend(0),s.sky.setLabelsEnabled(!0),T(!1),R(-1),A()}}}const qd=Object.freeze(Object.defineProperty({__proto__:null,CH4_CAM_STOPS:fu,CH4_GROW_FRAC:au,CH4_OPENING_END:br,CH4_RELEASE:Ds,CH4_ROT_SPEED:ou,CH4_ROT_START:ha,CH4_STOP_COUNT:gr,CH4_STOP_SPAN:Fi,CH4_TOUR_END:pr,ch4MatchLabels:uu,ch4RotationWeight:Lo,ch4SegmentOf:_s,ch4StopGrowth:cu,ch4WallsGrowth:lu,createChapter:Yd},Symbol.toStringTag,{value:"Module"})),ge=100,ro={strength:.78,radius:.55,threshold:.58},pl=1.2*ge,Wd=5,gl=.2*Math.PI/180,_l=89*Math.PI/180,ml=.8*ge,Xd=1.2*ge,Vd=.4,jd=.05,Ud=120,yl=.35,si=new xe(0,1,0),Qd=new xe(0,0,0);function Kd(s){return s=Me.clamp(s,0,1),s*s*(3-2*s)}const Bs=class Bs{constructor(e){G(this,"canvas");G(this,"renderer");G(this,"scene");G(this,"camera");G(this,"pipeline");G(this,"quality");G(this,"card");G(this,"labelLayerEl");G(this,"hoverNdc",null);G(this,"hoverRing");G(this,"hoverTip");G(this,"sky",null);G(this,"labels",null);G(this,"labelsShown",!1);G(this,"skyRoot",new Cn);G(this,"tmpSkyMat",new ho);G(this,"tmpSkyQ",new Ut);G(this,"tmpSkyQY",new Ut);G(this,"starPositions",null);G(this,"starList",[]);G(this,"nameByHip",new Map);G(this,"hipToAsterism",new Map);G(this,"poem",null);G(this,"pickListeners",new Set);G(this,"gazeYaw",-Math.PI/2);G(this,"gazePitch",80*Math.PI/180);G(this,"orbitQ",new Ut);G(this,"ctlRadius",1);G(this,"ctlDir",new xe(0,1,0));G(this,"ctlFov",78);G(this,"ctlGazeBlend",0);G(this,"ctlGazeTargetQ",null);G(this,"ctlDrift",0);G(this,"driftAngle",0);G(this,"ctlOrbit",0);G(this,"pickingEnabled",!1);G(this,"labelsEnabled",!0);G(this,"hoverTipEnabled",!0);G(this,"blendK",0);G(this,"dragging",!1);G(this,"lastX",0);G(this,"lastY",0);G(this,"downX",0);G(this,"downY",0);G(this,"orbitVelX",0);G(this,"orbitVelY",0);G(this,"lastOrbitMoveT",0);G(this,"clock",new Gu);G(this,"elapsed",0);G(this,"frameHook",null);G(this,"started",!1);G(this,"gazeEuler",new fi(0,0,0,"YXZ"));G(this,"gazeQ",new Ut);G(this,"insideQ",new Ut);G(this,"centerLookQ",new Ut);G(this,"centerLookMat",new ho);G(this,"driftQ",new Ut);G(this,"tmpPos",new xe);G(this,"resize",()=>{const e=this.tierDpr();this.renderer.setPixelRatio(e),this.renderer.setSize(window.innerWidth,window.innerHeight),this.pipeline.setSize(window.innerWidth,window.innerHeight),this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.sky&&(this.sky.starMaterial.uniforms.uPixelRatio.value=e),this.labels&&this.labels.renderer.setSize(window.innerWidth,window.innerHeight)});G(this,"frame",()=>{var r;const e=Math.min(this.clock.getDelta(),.1);this.quality.update(e),(r=this.frameHook)==null||r.call(this,e),this.updateCamera(e),this.updateHover();const t=this.camera.position.length(),n=this.sky;if(n&&(this.elapsed+=e,n.setTime(this.elapsed),n.starMaterial.uniforms.uDistBoost.value=Zu(t,ge),n.gridMaterial.opacity=.1+.16*Me.clamp(t/ge-1,0,1),t>=ge&&!this.card.el.hidden&&this.card.hide()),this.labels){const i=this.labelsEnabled?Me.clamp((pl-t)/(pl-ge),0,1):0,o=i>.01;o!==this.labelsShown&&(this.labelsShown=o,this.labels.setVisible(o)),o&&(this.labels.renderer.domElement.style.opacity=i.toFixed(3),this.labels.update(this.camera))}this.pipeline.render(),this.labels&&this.labelsShown&&this.labels.renderer.render(this.scene,this.camera)});this.canvas=e,this.renderer=new Hu({canvas:e,antialias:!0,alpha:!0}),this.renderer.setClearColor(0,0),this.scene=new Yu,this.scene.add(this.skyRoot),this.camera=new qu(78,1,.1,2e3),this.pipeline=Wu(this.renderer,this.scene,this.camera,ro),this.quality=Xu(i=>{this.pipeline.setEnabled(i<2),this.pipeline.setBloom({strength:i===0?ro.strength:ro.strength*.5}),this.resize()}),this.labelLayerEl=document.createElement("div"),this.labelLayerEl.style.cssText="position:fixed;inset:0;pointer-events:none;z-index:5;",document.body.appendChild(this.labelLayerEl),this.card=Vu(document.body),this.onPick(i=>{i?this.card.show(i.info,i.x,i.y):this.card.hide()});const t=document.createElement("canvas");t.width=t.height=64;const n=t.getContext("2d");n.strokeStyle="rgba(240, 205, 110, 0.95)",n.lineWidth=5,n.shadowColor="rgba(201, 162, 39, 0.9)",n.shadowBlur=8,n.beginPath(),n.arc(32,32,24,0,Math.PI*2),n.stroke();const r=new Ql(t);this.hoverRing=new Ul(new jl({map:r,transparent:!0,depthTest:!1,depthWrite:!1})),this.hoverRing.renderOrder=999,this.hoverRing.visible=!1,this.skyRoot.add(this.hoverRing),this.hoverTip=document.createElement("div"),this.hoverTip.className="sky-tooltip",this.hoverTip.style.display="none",document.body.appendChild(this.hoverTip),this.bindPointer(),window.addEventListener("resize",this.resize),this.resize()}async init(){const[e,t,n,r]=await Promise.all([ju(ge),fetch("/data/stars.json").then(a=>{if(!a.ok)throw new Error(`stars=${a.status}`);return a.json()}),fetch("/data/asterisms.json").then(a=>{if(!a.ok)throw new Error(`asterisms=${a.status}`);return a.json()}),fetch("/data/poem.json").then(a=>{if(!a.ok)throw new Error(`poem=${a.status}`);return a.json()})]);this.sky=e,e.starMaterial.uniforms.uPixelRatio.value=this.tierDpr(),this.skyRoot.add(e.group),this.starList=t.stars;const i=new Float32Array(this.starList.length*3),o=new Map;this.starList.forEach((a,l)=>{const[c,u,d]=sn(a.ra,a.dec,ge);i[l*3]=c,i[l*3+1]=u,i[l*3+2]=d,o.set(a.hip,new xe(c,u,d)),this.nameByHip.set(a.hip,a.name)}),this.starPositions=i,this.hipToAsterism=Uu(n.asterisms),this.poem=r,this.labels=Qu(this.labelLayerEl,n.asterisms,o),this.labels.renderer.setSize(window.innerWidth,window.innerHeight),this.labels.setVisible(!1),this.skyRoot.add(this.labels.group)}start(e){this.frameHook=e??null,!this.started&&(this.started=!0,this.renderer.setAnimationLoop(this.frame))}setRadius(e){this.ctlRadius=Math.max(.5,e*ge)}setPositionDir(e){e instanceof xe?this.ctlDir.copy(e):this.ctlDir.set(e[0],e[1],e[2]),this.ctlDir.lengthSq()<1e-8&&this.ctlDir.set(0,1,0),this.ctlDir.normalize()}setFov(e){this.ctlFov=Me.clamp(e,10,140)}setGazeMode(e,t){if(e==="target"){const n=t??{ra:0,dec:80};this.ctlGazeTargetQ=Nn(n.ra,n.dec)}this.ctlGazeBlend=e==="target"?1:0}setGazeBlend(e,t){this.ctlGazeBlend=Me.clamp(e,0,1),t!==void 0&&(this.ctlGazeTargetQ=t)}setDrift(e){this.ctlDrift=e}setOrbitEnabled(e){this.ctlOrbit=typeof e=="number"?Me.clamp(e,0,1):e?1:0}applyCameraState(e){this.setRadius(e.radius),this.setPositionDir(e.dir),this.setFov(e.fov),this.setGazeBlend(e.gazeBlend,e.gazeTargetQ),this.setDrift(e.drift),this.setOrbitEnabled(e.orbit)}get cameraRadius(){return this.camera.position.length()}setGroupProgress(e,t){if(!this.sky)return;const n=typeof e=="number"?e:this.sky.lines.indexOf(e);this.sky.lines.setGroupProgress(n,t)}groupIndex(e){return this.sky?this.sky.lines.indexOf(e):-1}get groupCount(){return this.sky?this.sky.lines.groupCount:0}setLabelsEnabled(e){this.labelsEnabled=e}setHoverTipEnabled(e){this.hoverTipEnabled=e}setPickingEnabled(e){this.pickingEnabled=e,e||this.card.hide()}hideDetailCard(){this.card.hide()}setBloom(e){this.pipeline.setBloom(e)}setBloomEnabled(e){this.pipeline.setEnabled(e)}onPick(e){return this.pickListeners.add(e),()=>this.pickListeners.delete(e)}addSkyObject(e,t){(t==null?void 0:t.rotateWithSky)===!1?this.scene.add(e):this.skyRoot.add(e)}removeSkyObject(e){e.removeFromParent()}setSkyRotation(e=0,t=0){if(t!==0){const n=Ku(t);this.tmpSkyMat.set(n[0],n[1],n[2],0,n[3],n[4],n[5],0,n[6],n[7],n[8],0,0,0,0,1),this.tmpSkyQ.setFromRotationMatrix(this.tmpSkyMat)}else this.tmpSkyQ.identity();this.tmpSkyQY.setFromAxisAngle(si,e),this.skyRoot.quaternion.copy(this.tmpSkyQ).multiply(this.tmpSkyQY)}tierDpr(){const e=this.quality.tier,t=e===0?2:e===1?1.5:1;return Math.min(window.devicePixelRatio||1,t)}applyOrbitDelta(e,t){const n=this.camera.position.clone().normalize(),r=new Ut().setFromAxisAngle(si,-e),i=new xe().crossVectors(si,n);i.lengthSq()<1e-8?i.set(1,0,0):i.normalize();const o=new Ut().setFromAxisAngle(i,t),a=r.clone().multiply(o).multiply(this.orbitQ),l=n.clone().applyQuaternion(r).applyQuaternion(o);Math.abs(l.y)<.985?this.orbitQ.copy(a):this.orbitQ.premultiply(r)}bindPointer(){const e=this.canvas;e.addEventListener("pointerdown",t=>{this.dragging=!0,this.lastX=this.downX=t.clientX,this.lastY=this.downY=t.clientY,this.orbitVelX=this.orbitVelY=0,this.lastOrbitMoveT=performance.now(),this.hoverNdc=null,e.setPointerCapture(t.pointerId)}),e.addEventListener("pointerup",t=>{this.dragging=!1,e.releasePointerCapture(t.pointerId),performance.now()-this.lastOrbitMoveT>Ud&&(this.orbitVelX=this.orbitVelY=0),Math.hypot(t.clientX-this.downX,t.clientY-this.downY)<Wd&&this.handleClick(t.clientX,t.clientY)}),e.addEventListener("pointercancel",()=>{this.dragging=!1,this.orbitVelX=this.orbitVelY=0}),e.addEventListener("pointerleave",()=>{this.hoverNdc=null}),e.addEventListener("pointermove",t=>{if(!this.dragging){this.hoverNdc={x:t.clientX/window.innerWidth*2-1,y:-(t.clientY/window.innerHeight)*2+1,cx:t.clientX,cy:t.clientY};return}const n=t.clientX-this.lastX,r=t.clientY-this.lastY;this.lastX=t.clientX,this.lastY=t.clientY;const i=(1-this.blendK)*(1-this.ctlGazeBlend);i>0&&(this.gazeYaw+=n*gl*i,this.gazePitch+=r*gl*i,this.gazePitch=Me.clamp(this.gazePitch,-_l,_l));const o=this.blendK*this.ctlOrbit;if(o>0){const a=n*o*.005,l=r*o*.005;this.applyOrbitDelta(a,l);const c=performance.now(),u=Math.min((c-this.lastOrbitMoveT)/1e3,.1);this.lastOrbitMoveT=c,u>1e-4&&(this.orbitVelX+=(a/u-this.orbitVelX)*yl,this.orbitVelY+=(l/u-this.orbitVelY)*yl)}})}handleClick(e,t){if(!this.pickingEnabled||!this.sky||!this.starPositions)return;if(this.camera.position.length()>=ge){this.emitPick(null);return}const n=e/window.innerWidth*2-1,r=-(t/window.innerHeight)*2+1,i=wa(n,r,this.camera,this.starPositions,{width:window.innerWidth,height:window.innerHeight});if(!i){this.emitPick(null);return}const o=this.starList[i.index],a=this.hipToAsterism.get(o.hip);if(!a){this.emitPick(null);return}const l=this.lookupPoem(a.name);this.emitPick({info:{name:a.name,starCount:a.stars.length,stars:a.stars.map(c=>({name:this.nameByHip.get(c)??null,hip:c})),quote:l==null?void 0:l.text,quoteFrom:l==null?void 0:l.from},x:e,y:t})}lookupPoem(e){if(!this.poem)return;const t=this.poem[e];if(t)return t;const n=e.replace(/[(（][^)）]*[)）]\s*$/,"");return n!==e?this.poem[n]:void 0}emitPick(e){for(const t of this.pickListeners)t(e)}updateHover(){if(!(this.pickingEnabled&&!this.dragging&&this.hoverNdc!==null&&this.starPositions!==null&&this.camera.position.length()<ge)){this.hoverRing.visible&&(this.hoverRing.visible=!1),this.hoverTip.style.display!=="none"&&(this.hoverTip.style.display="none");return}const t=wa(this.hoverNdc.x,this.hoverNdc.y,this.camera,this.starPositions,{width:window.innerWidth,height:window.innerHeight},Bs.HOVER_PICK_RADIUS_PX);if(!t){this.hoverRing.visible&&(this.hoverRing.visible=!1),this.hoverTip.style.display!=="none"&&(this.hoverTip.style.display="none");return}const n=this.starPositions;this.hoverRing.position.set(n[t.index*3],n[t.index*3+1],n[t.index*3+2]);const r=this.camera.position.distanceTo(this.hoverRing.position),i=Math.max(.5,r*.035);if(this.hoverRing.scale.set(i,i,1),this.hoverRing.visible=!0,!this.hoverTipEnabled){this.hoverTip.style.display!=="none"&&(this.hoverTip.style.display="none");return}const o=this.starList[t.index],a=this.hipToAsterism.get(o.hip),l=o.name??`HIP ${o.hip}`,c=a&&a.name!==l?`${l} · ${a.name}`:l;this.hoverTip.textContent!==c&&(this.hoverTip.textContent=c),this.hoverTip.style.left=`${this.hoverNdc.cx+16}px`,this.hoverTip.style.top=`${this.hoverNdc.cy+14}px`,this.hoverTip.style.display!=="block"&&(this.hoverTip.style.display="block")}updateCamera(e){if(!this.dragging&&(this.orbitVelX!==0||this.orbitVelY!==0)){this.applyOrbitDelta(this.orbitVelX*e,this.orbitVelY*e);const n=Math.pow(.5,e/Vd);this.orbitVelX*=n,this.orbitVelY*=n,Math.hypot(this.orbitVelX,this.orbitVelY)<jd&&(this.orbitVelX=this.orbitVelY=0)}const t=this.tmpPos.copy(this.ctlDir).multiplyScalar(this.ctlRadius).applyQuaternion(this.orbitQ);this.camera.position.copy(t),this.blendK=Kd((this.ctlRadius-ml)/(Xd-ml)),this.gazeEuler.set(this.gazePitch,this.gazeYaw,0),this.gazeQ.setFromEuler(this.gazeEuler),this.insideQ.copy(this.gazeQ),this.ctlGazeTargetQ&&this.ctlGazeBlend>0&&this.insideQ.slerp(this.ctlGazeTargetQ,this.ctlGazeBlend),this.ctlDrift!==0&&(this.driftAngle+=this.ctlDrift*e,this.driftQ.setFromAxisAngle(si,this.driftAngle),this.insideQ.premultiply(this.driftQ)),this.centerLookMat.lookAt(t,Qd,si),this.centerLookQ.setFromRotationMatrix(this.centerLookMat),this.camera.quaternion.slerpQuaternions(this.insideQ,this.centerLookQ,this.blendK),this.camera.fov!==this.ctlFov&&(this.camera.fov=this.ctlFov,this.camera.updateProjectionMatrix())}};G(Bs,"HOVER_PICK_RADIUS_PX",16);let zo=Bs;const Zd=Me.degToRad(23.44),Jd=11570494,io=36,ep=.15,tp=.55;function np(s){return s=Me.clamp(s,0,1),s*s*(3-2*s)}function Qi(s,e,t){const n=new ef({color:Jd,metalness:.85,roughness:.35,transparent:!0,opacity:0}),r=new Cn,i=s*ge;r.add(new Ss(new Kl(i,e*ge,12,144),n));for(let o=0;o<io;o++){const a=o/io*Math.PI*2,l=o%(io/4)===0,c=new Ss(l?t.major:t.minor,n);c.position.set(Math.cos(a)*i,Math.sin(a)*i,0),c.rotation.z=a,r.add(c)}return{local:r,material:n}}function rp(){const s=new Cn;s.name="armillary-sphere";const e={minor:new Sa(.012*ge,.0018*ge,.0035*ge),major:new Sa(.02*ge,.0024*ge,.0045*ge)},t=Qi(1.1,.006,e);t.local.rotation.x=-Math.PI/2;const n=Qi(1.07,.004,e);n.local.rotation.y=Math.PI/2;const r=Qi(1.05,.004,e);r.local.rotation.x=-Math.PI/2;const i=new Cn;i.add(r.local);const o=Qi(1.03,.0035,e);o.local.rotation.x=-Math.PI/2;const a=new Cn;a.add(o.local);const l=new Cn;l.rotation.x=Zd,l.add(a);const c=[{built:t,inner:t.local,offsetDir:new xe(0,-1,0),tumble:new fi(.9,0,.4)},{built:n,inner:n.local,offsetDir:new xe(1,.15,0),tumble:new fi(0,.5,-1.1)},{built:r,inner:i,offsetDir:new xe(0,1,.2),tumble:new fi(-.7,.5,0)},{built:o,inner:l,offsetDir:new xe(-.6,.6,.6),tumble:new fi(.5,-.4,.8)}].map(({built:b,inner:x,offsetDir:v,tumble:w})=>{const O=new Cn;return O.add(x),s.add(O),{assembly:O,material:b.material,offsetDir:v.normalize(),tumble:w,alpha:0}});s.add(new Ju(16771529,.9));const u=new ka(16774109,2.4);u.position.set(1.6*ge,2.4*ge,1.2*ge),s.add(u);const d=new ka(12570879,1.1);d.position.set(-1.8*ge,-.7*ge,-1.5*ge),s.add(d);let p=0;function f(b){const x=p*b.alpha;b.material.opacity=x,b.assembly.visible=x>.002}function g(b){c.forEach((x,v)=>{const w=np((b-v*ep)/tp);x.alpha=w;const O=1-w;x.assembly.scale.setScalar(.35+.65*w),x.assembly.position.copy(x.offsetDir).multiplyScalar(O*.5*ge),x.assembly.rotation.set(x.tumble.x*O,x.tumble.y*O,x.tumble.z*O),f(x)})}function h(b){i.rotation.y=b,a.rotation.y=b*.6}function m(b){p=Me.clamp(b,0,1);for(const x of c)f(x)}function S(){const b=new Set,x=new Set;s.traverse(v=>{const w=v;if(w.isMesh){b.add(w.geometry);const O=w.material;for(const T of Array.isArray(O)?O:[O])x.add(T)}}),b.forEach(v=>v.dispose()),x.forEach(v=>v.dispose())}return g(0),{group:s,setAssembly:g,setSpin:h,setFade:m,dispose:S}}const so=.55,ip=.9,sp=1.2;function oi(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function op(s){const{copy:e}=s,t=document.createElement("div");t.className="chapter-panel chapter-panel--left",t.innerHTML=`
    <p class="eyebrow">${oi(e.eyebrow)}</p>
    <div class="chapter-head">
      <h2>${oi(e.title)}</h2>
      ${e.seal?`<div class="seal">${oi(e.seal)}</div>`:""}
    </div>
    <p class="hook">${oi(e.hook)}</p>
    ${e.body.map(a=>`<p>${oi(a)}</p>`).join("")}
  `,s.root.querySelector(".pin").appendChild(t);let n=null,r=0;const i={v:0};function o(a){if(!n)return;n.setAssembly(Math.min(a/so,1));const l=Math.max(0,(a-so)/(1-so));n.setSpin(l*ip)}return{enter(){s.root.classList.add("inview"),n||(n=rp(),s.sky.addSkyObject(n.group,{rotateWithSky:!1}),o(r)),Qn.to(i,{v:1,duration:sp,ease:"power2.out",overwrite:!0,onUpdate:()=>n==null?void 0:n.setFade(i.v)})},update(a){r=a,o(a)},exit(){s.root.classList.remove("inview"),Qn.killTweensOf(i),i.v=0,n&&(s.sky.removeSkyObject(n.group),n.dispose(),n=null)}}}const ap=Object.freeze(Object.defineProperty({__proto__:null,createChapter:op},Symbol.toStringTag,{value:"Module"})),lr=-1e4,Ls=14e3,Io=Ls-lr,lp=[{name:"帝星",years:-1e3,note:"−1000"},{name:"勾陈一",years:0,note:"今"},{name:"织女一",years:13700,note:"+13700"}],cp=[{years:lr,text:"−10000",cls:"ch6-endlab--start"},{years:0,text:"0",cls:""},{years:Ls,text:"+14000",cls:"ch6-endlab--end"}],up=2e3,fp=1.5,hp=.07,dp=`
.ch6-panel { left: 6vw; top: 8vh; bottom: auto; }
.ch6-time {
  position: absolute;
  left: 50%;
  bottom: 6vh;
  transform: translateX(-50%);
  width: min(76vw, 880px);
  text-align: center;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.9s var(--ease-sig, ease);
}
.chapter.inview .ch6-time { opacity: 1; }
.ch6-year {
  font-family: var(--font-display, "STSong", "SimSun", serif);
  color: var(--gold, #c9a227);
  font-size: clamp(30px, 4.6vw, 58px);
  letter-spacing: 0.1em;
  text-shadow: 0 0 26px rgba(201, 162, 39, 0.35);
  margin-bottom: 20px;
  white-space: nowrap;
}
.ch6-year .ch6-era,
.ch6-year .ch6-suffix {
  font-size: 0.42em;
  color: var(--cream, #fce1b6);
  opacity: 0.85;
  letter-spacing: 0.28em;
}
.ch6-year .ch6-era { display: inline-block; min-width: 3.2em; text-align: right; margin-right: 0.6em; }
.ch6-year .ch6-suffix { margin-left: 0.5em; }
.ch6-year .ch6-num {
  display: inline-block;
  min-width: 4.6ch;
  text-align: center;
  font-variant-numeric: tabular-nums;
}
.ch6-ruler { position: relative; height: 64px; }
.ch6-ruler-line {
  position: absolute;
  left: 0; right: 0; top: 34px;
  height: 1px;
  background: linear-gradient(90deg, rgba(175, 145, 95, 0.15), rgba(175, 145, 95, 0.75), rgba(175, 145, 95, 0.15));
}
.ch6-tick {
  position: absolute;
  top: 31px; width: 1px; height: 7px;
  background: rgba(175, 145, 95, 0.4);
}
.ch6-tick--major {
  top: 28px; height: 13px;
  background: rgba(201, 162, 39, 0.7);
}
.ch6-endlab {
  position: absolute;
  top: 46px;
  transform: translateX(-50%);
  font-size: 11px;
  letter-spacing: 0.08em;
  color: var(--gold-dim, #af915f);
  font-variant-numeric: tabular-nums;
}
.ch6-endlab--start { transform: none; }
.ch6-endlab--end { transform: translateX(-100%); }
.ch6-mark { position: absolute; top: 0; transform: translateX(-50%); text-align: center; }
.ch6-mark .ch6-mark-name {
  display: block;
  font-family: var(--font-display, "STSong", "SimSun", serif);
  font-size: 14px;
  letter-spacing: 0.22em;
  color: var(--cream, #fce1b6);
  white-space: nowrap;
}
.ch6-mark .ch6-mark-yr {
  display: block;
  margin-top: 1px;
  font-size: 10px;
  letter-spacing: 0.1em;
  color: var(--gold-dim, #af915f);
  font-variant-numeric: tabular-nums;
}
.ch6-mark .ch6-mark-dot {
  position: absolute;
  left: 50%; top: 31px;
  width: 7px; height: 7px;
  margin-left: -3.5px;
  border-radius: 50%;
  background: var(--cream, #fce1b6);
  box-shadow: 0 0 8px rgba(252, 225, 182, 0.8);
}
.ch6-pointer {
  position: absolute;
  top: 23px; left: 0;
  width: 0; height: 0;
  transform: translateX(-50%);
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 10px solid var(--gold, #c9a227);
  filter: drop-shadow(0 0 6px rgba(201, 162, 39, 0.9));
}
`;let bl=!1;function pp(){if(bl||typeof document>"u")return;const s=document.createElement("style");s.dataset.ch6="",s.textContent=dp,document.head.appendChild(s),bl=!0}function ai(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Ki(s){return(s-lr)/Io*100}function gp(s){const e=2e3+s;return e<=0?{era:"公元前",num:1-e}:{era:e<3e3?"公元":"公元后",num:e}}function _p(s){pp();const e=s.root.querySelector(".pin"),t=document.createElement("div");t.className="chapter-panel ch6-panel",t.innerHTML=`
    <p class="eyebrow">${ai(s.copy.eyebrow)}</p>
    <div class="chapter-head">
      <h2>${ai(s.copy.title)}</h2>
      ${s.copy.seal?`<div class="seal">${ai(s.copy.seal)}</div>`:""}
    </div>
    <p class="hook">${ai(s.copy.hook)}</p>
    ${s.copy.body.map(m=>`<p>${ai(m)}</p>`).join("")}
  `,e.appendChild(t);const n=document.createElement("div");n.className="ch6-time";const r=[];for(let m=lr;m<=Ls;m+=up){const S=m===lr||m===0||m===Ls;r.push(`<div class="ch6-tick${S?" ch6-tick--major":""}" style="left:${Ki(m).toFixed(3)}%"></div>`)}const i=cp.map(m=>`<div class="ch6-endlab ${m.cls}" style="left:${Ki(m.years).toFixed(3)}%">${m.text}</div>`),o=lp.map(m=>`
    <div class="ch6-mark" style="left:${Ki(m.years).toFixed(3)}%">
      <span class="ch6-mark-name">${m.name}</span>
      <span class="ch6-mark-yr">${m.note}</span>
      <span class="ch6-mark-dot"></span>
    </div>`);n.innerHTML=`
    <div class="ch6-year"><span class="ch6-era">公元前</span><span class="ch6-num">8000</span><span class="ch6-suffix">年</span></div>
    <div class="ch6-ruler">
      <div class="ch6-ruler-line"></div>
      ${r.join("")}
      ${i.join("")}
      ${o.join("")}
      <div class="ch6-pointer"></div>
    </div>
  `,e.appendChild(n);const a=n.querySelector(".ch6-era"),l=n.querySelector(".ch6-num"),c=n.querySelector(".ch6-pointer");let u=null;function d(){const m=new Kl(fp,hp,12,96),S=new tf({color:13214247}),b=new Ss(m,S);return b.rotation.x=Math.PI/2,b.position.set(0,1.01*ge,0),b}let p=0,f=Number.NaN,g=Number.NaN;function h(m){s.sky.setSkyRotation(0,m);const S=Math.round(m);if(S!==f){f=S;const{era:x,num:v}=gp(S);a.textContent=x,l.textContent=String(v)}const b=Math.round(Ki(m)*100)/100;b!==g&&(g=b,c.style.left=`${b}%`)}return{enter(){s.root.classList.add("inview"),u=d(),s.sky.addSkyObject(u,{rotateWithSky:!1}),h(lr+p*Io)},update(m){p=m,h(lr+m*Io)},exit(){s.root.classList.remove("inview"),s.sky.setSkyRotation(0,0),u&&(s.sky.removeSkyObject(u),u.geometry.dispose(),u.material.dispose(),u=null)}}}const mp=Object.freeze(Object.defineProperty({__proto__:null,createChapter:_p},Symbol.toStringTag,{value:"Module"})),yp=100,bp=9414856;async function vl(s){const e=await fetch(s);if(!e.ok)throw new Error(`${s} → HTTP ${e.status}`);return e.json()}async function vp(){const[s,e]=await Promise.all([vl("/data/western.json"),vl("/data/stars.json")]),t=new Map;for(const l of e.stars)t.set(l.hip,sn(l.ra,l.dec,yp));const n=[];for(const l of s.constellations)for(const[c,u]of l.lines){const d=t.get(c),p=t.get(u);!d||!p||n.push(d[0],d[1],d[2],p[0],p[1],p[2])}const r=new nf;r.setAttribute("position",new rf(new Float32Array(n),3));const i=new sf({color:bp,transparent:!0,opacity:0,depthWrite:!1,blending:Zl}),o=new of(r,i);o.name="western-lines",o.frustumCulled=!1;const a=new Cn;return a.name="western",a.add(o),a.visible=!1,{group:a,setOpacity(l){const c=Me.clamp(l,0,1);i.opacity=c,a.visible=c>.001},dispose(){r.dispose(),i.dispose()}}}const xl=.6,xp=`
.ch7-panel {
  position: absolute;
  left: 6vw;
  top: 10vh;
  max-width: 420px;
  background: rgba(13, 13, 17, 0.72);
  border: 1px solid rgba(175, 145, 95, 0.28);
  border-radius: 10px;
  padding: 22px 24px;
  backdrop-filter: blur(4px);
  opacity: 0;
  transform: translateY(26px);
  transition: opacity 0.9s var(--ease-sig, cubic-bezier(0.8, 0, 0.55, 0.94)),
    transform 0.9s var(--ease-sig, cubic-bezier(0.8, 0, 0.55, 0.94));
}
.inview .ch7-panel { opacity: 1; transform: translateY(0); }
.ch7-panel h2 {
  font-family: var(--font-display, "STSong", "SimSun", "Songti SC", serif);
  font-size: 30px;
  font-weight: 400;
  letter-spacing: 0.14em;
  color: var(--gold, #c9a227);
  margin-bottom: 12px;
}
.ch7-panel p { font-size: 15px; line-height: 2; opacity: 0.88; }
.ch7-panel .hook { margin-bottom: 6px; }

.ch7-compare {
  position: absolute;
  left: 50%;
  bottom: 7vh;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 14px 22px;
  background: rgba(13, 13, 17, 0.72);
  border: 1px solid rgba(175, 145, 95, 0.28);
  border-radius: 999px;
  backdrop-filter: blur(4px);
  pointer-events: auto; /* .chapter 层默认 pointer-events:none，滑杆需要交互 */
  opacity: 0;
  transition: opacity 0.9s var(--ease-sig, cubic-bezier(0.8, 0, 0.55, 0.94));
}
.inview .ch7-compare { opacity: 1; }
.ch7-end { font-size: 12px; letter-spacing: 0.28em; white-space: nowrap; user-select: none; }
.ch7-end--cn { color: var(--gold, #c9a227); }
.ch7-end--west { color: #8fa8c8; }
.ch7-slider {
  -webkit-appearance: none;
  appearance: none;
  width: min(320px, 42vw);
  height: 2px;
  border-radius: 1px;
  background: linear-gradient(90deg, var(--gold, #c9a227), #8fa8c8);
  outline: none;
  cursor: pointer;
}
.ch7-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--cream, #fce1b6);
  border: 1px solid rgba(13, 13, 17, 0.9);
  box-shadow: 0 0 8px rgba(252, 225, 182, 0.45);
}
.ch7-slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--cream, #fce1b6);
  border: 1px solid rgba(13, 13, 17, 0.9);
  box-shadow: 0 0 8px rgba(252, 225, 182, 0.45);
}

@media (max-width: 860px) {
  .ch7-panel { left: 5vw; right: 5vw; max-width: none; }
  .ch7-compare { gap: 10px; padding: 12px 16px; }
  .ch7-end { letter-spacing: 0.14em; }
}
`;let wl=!1;function wp(){if(wl||typeof document>"u")return;const s=document.createElement("style");s.dataset.ch7="",s.textContent=xp,document.head.appendChild(s),wl=!0}function li(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Sp(s){return s=Me.clamp(s,0,1),s*s*(3-2*s)}function kp(s){wp();const e=s.root.querySelector(".pin"),{copy:t}=s,n=document.createElement("div");n.className="ch7-panel",n.innerHTML=`
    <p class="eyebrow">${li(t.eyebrow)}</p>
    <div class="chapter-head">
      <h2>${li(t.title)}</h2>
      ${t.seal?`<div class="seal">${li(t.seal)}</div>`:""}
    </div>
    <p class="hook">${li(t.hook)}</p>
    ${t.body.map(g=>`<p>${li(g)}</p>`).join("")}
  `,e.appendChild(n);const r=document.createElement("div");r.className="ch7-compare",r.innerHTML=`
    <span class="ch7-end ch7-end--cn">中国星官</span>
    <input class="ch7-slider" type="range" min="0" max="100" step="1" value="0"
      aria-label="中西星空连线对比" />
    <span class="ch7-end ch7-end--west">西方星座</span>
  `,e.appendChild(r);const i=r.querySelector(".ch7-slider");let o=null,a=0,l=0,c=!1,u=null,d=null;function p(g){const h=s.sky.groupCount;for(let m=0;m<h;m++)s.sky.setGroupProgress(m,g)}function f(g){l=Me.clamp(g,0,1),p(1-l),o==null||o.setOpacity(l),i.value=String(Math.round(l*100))}return i.addEventListener("input",()=>{c=!0,f(Number(i.value)/100)}),{enter(){if(s.root.classList.add("inview"),s.sky.setLabelsEnabled(!1),u==null||u.kill(),u=null,d==null||d.kill(),d=null,c=!1,f(0),o)return;const g=++a;vp().then(h=>{if(g!==a){h.dispose();return}o=h,s.sky.addSkyObject(h.group),h.setOpacity(l)}).catch(h=>console.warn("[ch7] 西方星座数据加载失败：",h))},update(g){if(!c){if(g>=xl){l!==1&&f(1);return}f(Sp(g/xl))}},exit(){if(s.root.classList.remove("inview"),++a,d==null||d.kill(),o){const h=o,m={v:l};d=Qn.to(m,{v:0,duration:.6,ease:"sine.inOut",onUpdate:()=>h.setOpacity(m.v),onComplete:()=>{s.sky.removeSkyObject(h.group),h.dispose(),o===h&&(o=null),d=null}})}u==null||u.kill();const g={v:1-l};u=Qn.to(g,{v:1,duration:2.4,ease:"sine.inOut",onUpdate:()=>p(g.v)}),s.sky.setLabelsEnabled(!0)}}}const Tp=Object.freeze(Object.defineProperty({__proto__:null,createChapter:kp},Symbol.toStringTag,{value:"Module"})),Cp=`
.ch8-wrap {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7vh 6vw;
}
.ch8-panel {
  width: 100%;
  max-width: 34em;
  max-height: 86vh;
  overflow: hidden;
  background: rgba(13, 13, 17, 0.72);
  border: 1px solid rgba(175, 145, 95, 0.28);
  border-radius: 10px;
  padding: 30px 34px;
  backdrop-filter: blur(4px);
  text-align: center;
  opacity: 0;
}
.ch8-eyebrow {
  font-size: 11px;
  letter-spacing: 0.42em;
  color: #fce1b6;
  opacity: 0.55;
  margin-bottom: 12px;
  text-transform: uppercase;
}
.ch8-head {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 14px;
  margin-bottom: 12px;
}
.ch8-title {
  font-family: "STSong", "SimSun", "Songti SC", serif;
  font-size: 30px;
  font-weight: 400;
  letter-spacing: 0.14em;
  color: #c9a227;
}
.ch8-seal {
  flex: none;
  width: 44px;
  height: 44px;
  border-radius: 4px;
  background: linear-gradient(150deg, #b1402f 0%, #8e2f22 100%);
  color: #f6e8d8;
  font-family: "STSong", "SimSun", "Songti SC", serif;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(142, 47, 34, 0.45), inset 0 0 6px rgba(0, 0, 0, 0.25);
  user-select: none;
}
.ch8-hook {
  font-size: 15px;
  line-height: 2;
  letter-spacing: 0.08em;
  color: #fce1b6;
  opacity: 0.9;
  margin-bottom: 8px;
}
.ch8-body p {
  font-size: 15px;
  line-height: 2;
  letter-spacing: 0.06em;
  color: #fce1b6;
  opacity: 0.88;
}
.ch8-credits {
  margin-top: 20px;
  padding-top: 18px;
  border-top: 1px solid rgba(175, 145, 95, 0.22);
  opacity: 0;
}
.ch8-credits-heading {
  font-size: 12px;
  letter-spacing: 0.34em;
  color: #af915f;
}
.ch8-credit-group {
  margin-top: 12px;
}
.ch8-credit-group h3 {
  font-family: "STSong", "SimSun", "Songti SC", serif;
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.2em;
  color: #c9a227;
}
.ch8-credit-group p {
  font-size: 13px;
  line-height: 2;
  letter-spacing: 0.05em;
  color: #fce1b6;
  opacity: 0.82;
}
.ch8-credit-group a {
  color: #c9a227;
  text-decoration: underline;
  text-underline-offset: 3px;
  word-break: break-all;
  pointer-events: auto; /* .chapter 层 pointer-events:none，链接需单独放开 */
}
.ch8-credit-group a:hover { color: #ffffff; }
`;let Sl=!1;function Ep(){if(Sl||typeof document>"u")return;const s=document.createElement("style");s.dataset.ch8="",s.textContent=Cp,document.head.appendChild(s),Sl=!0}function hn(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Mp(s){return s<0?0:s>1?1:s}function Pp(s){return s.split(/(https?:\/\/\S+)/g).map(e=>/^https?:\/\//.test(e)?`<a href="${hn(e)}" target="_blank" rel="noopener">${hn(e)}</a>`:hn(e)).join("")}function kl(s,e,t){const n=Mp((s-e)/(t-e));return n*n*(3-2*n)}function Op(s){Ep();const e=s.root.querySelector(".pin"),{copy:t}=s,n=document.createElement("div");n.className="ch8-wrap",n.innerHTML=`
    <div class="ch8-panel">
      <p class="ch8-eyebrow">${hn(t.eyebrow)}</p>
      <div class="ch8-head">
        <h2 class="ch8-title">${hn(t.title)}</h2>
        ${t.seal?`<div class="ch8-seal">${hn(t.seal)}</div>`:""}
      </div>
      <p class="ch8-hook">${hn(t.hook)}</p>
      <div class="ch8-body">${t.body.map(l=>`<p>${hn(l)}</p>`).join("")}</div>
      <div class="ch8-credits">
        <p class="ch8-credits-heading">${hn(el.heading)}</p>
        ${el.groups.map(l=>`
          <div class="ch8-credit-group">
            <h3>${hn(l.title)}</h3>
            ${l.lines.map(c=>`<p>${Pp(c)}</p>`).join("")}
          </div>`).join("")}
      </div>
    </div>
  `,e.appendChild(n);const r=n.querySelector(".ch8-panel"),i=n.querySelector(".ch8-credits");let o=-1,a=-1;return{enter(){},update(l){const c=kl(l,0,.3);(o<0||Math.abs(c-o)>=1e-4)&&(o=c,r.style.opacity=c.toFixed(3),r.style.transform=`translateY(${((1-c)*26).toFixed(2)}px)`);const u=kl(l,.12,.45);(a<0||Math.abs(u-a)>=1e-4)&&(a=u,i.style.opacity=u.toFixed(3),i.style.transform=`translateY(${((1-u)*14).toFixed(2)}px)`)},exit(){}}}const Ap=Object.freeze(Object.defineProperty({__proto__:null,createChapter:Op},Symbol.toStringTag,{value:"Module"}));function Rp(s,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(s,n.key,n)}}function Dp(s,e,t){return e&&Rp(s.prototype,e),s}/*!
 * Observer 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var rt,ms,Bt,Hn,Yn,Gr,du,ir,Hr,pu,Pn,rn,gu,_u=function(){return rt||typeof window<"u"&&(rt=window.gsap)&&rt.registerPlugin&&rt},mu=1,Ir=[],oe=[],mn=[],wi=Date.now,$o=function(e,t){return t},Lp=function(){var e=Hr.core,t=e.bridge||{},n=e._scrollers,r=e._proxies;n.push.apply(n,oe),r.push.apply(r,mn),oe=n,mn=r,$o=function(o,a){return t[o](a)}},Xn=function(e,t){return~mn.indexOf(e)&&mn[mn.indexOf(e)+1][t]},Si=function(e){return!!~pu.indexOf(e)},bt=function(e,t,n,r,i){return e.addEventListener(t,n,{passive:r!==!1,capture:!!i})},yt=function(e,t,n,r){return e.removeEventListener(t,n,!!r)},Zi="scrollLeft",Ji="scrollTop",No=function(){return Pn&&Pn.isPressed||oe.cache++},zs=function(e,t){var n=function r(i){if(i||i===0){mu&&(Bt.history.scrollRestoration="manual");var o=Pn&&Pn.isPressed;i=r.v=Math.round(i)||(Pn&&Pn.iOS?1:0),e(i),r.cacheID=oe.cache,o&&$o("ss",i)}else(t||oe.cache!==r.cacheID||$o("ref"))&&(r.cacheID=oe.cache,r.v=e());return r.v+r.offset};return n.offset=0,e&&n},St={s:Zi,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:zs(function(s){return arguments.length?Bt.scrollTo(s,je.sc()):Bt.pageXOffset||Hn[Zi]||Yn[Zi]||Gr[Zi]||0})},je={s:Ji,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:St,sc:zs(function(s){return arguments.length?Bt.scrollTo(St.sc(),s):Bt.pageYOffset||Hn[Ji]||Yn[Ji]||Gr[Ji]||0})},Tt=function(e,t){return(t&&t._ctx&&t._ctx.selector||rt.utils.toArray)(e)[0]||(typeof e=="string"&&rt.config().nullTargetWarn!==!1?console.warn("Element not found:",e):null)},zp=function(e,t){for(var n=t.length;n--;)if(t[n]===e||t[n].contains(e))return!0;return!1},Kn=function(e,t){var n=t.s,r=t.sc;Si(e)&&(e=Hn.scrollingElement||Yn);var i=oe.indexOf(e),o=r===je.sc?1:2;!~i&&(i=oe.push(e)-1),oe[i+o]||bt(e,"scroll",No);var a=oe[i+o],l=a||(oe[i+o]=zs(Xn(e,n),!0)||(Si(e)?r:zs(function(c){return arguments.length?e[n]=c:e[n]})));return l.target=e,a||(l.smooth=rt.getProperty(e,"scrollBehavior")==="smooth"),l},Fo=function(e,t,n){var r=e,i=e,o=wi(),a=o,l=t||50,c=Math.max(500,l*3),u=function(g,h){var m=wi();h||m-o>l?(i=r,r=g,a=o,o=m):n?r+=g:r=i+(g-i)/(m-a)*(o-a)},d=function(){i=r=n?0:r,a=o=0},p=function(g){var h=a,m=i,S=wi();return(g||g===0)&&g!==r&&u(g),o===a||S-a>c?0:(r+(n?m:-m))/((n?S:o)-h)*1e3};return{update:u,reset:d,getVelocity:p}},ci=function(e,t){return t&&!e._gsapAllow&&e.cancelable!==!1&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},Tl=function(e){var t=Math.max.apply(Math,e),n=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(n)?t:n},yu=function(){Hr=rt.core.globals().ScrollTrigger,Hr&&Hr.core&&Lp()},bu=function(e){return rt=e||_u(),!ms&&rt&&typeof document<"u"&&document.body&&(Bt=window,Hn=document,Yn=Hn.documentElement,Gr=Hn.body,pu=[Bt,Hn,Yn,Gr],rt.utils.clamp,gu=rt.core.context||function(){},ir="onpointerenter"in Gr?"pointer":"mouse",du=Ge.isTouch=Bt.matchMedia&&Bt.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in Bt||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,rn=Ge.eventTypes=("ontouchstart"in Yn?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in Yn?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return mu=0},500),ms=1),Hr||yu(),ms};St.op=je;oe.cache=0;var Ge=function(){function s(t){this.init(t)}var e=s.prototype;return e.init=function(n){ms||bu(rt)||console.warn("Please gsap.registerPlugin(Observer)"),Hr||yu();var r=n.tolerance,i=n.dragMinimum,o=n.type,a=n.target,l=n.lineHeight,c=n.debounce,u=n.preventDefault,d=n.onStop,p=n.onStopDelay,f=n.ignore,g=n.wheelSpeed,h=n.event,m=n.onDragStart,S=n.onDragEnd,b=n.onDrag,x=n.onPress,v=n.onRelease,w=n.onRight,O=n.onLeft,T=n.onUp,R=n.onDown,C=n.onChangeX,A=n.onChangeY,U=n.onChange,_=n.onToggleX,$=n.onToggleY,L=n.onHover,H=n.onHoverEnd,X=n.onMove,N=n.ignoreCheck,P=n.isNormalizer,D=n.onGestureStart,y=n.onGestureEnd,Q=n.onWheel,j=n.onEnable,F=n.onDisable,K=n.onClick,W=n.scrollSpeed,te=n.capture,q=n.allowClicks,Se=n.lockAxis,Oe=n.onLockAxis;this.target=a=Tt(a)||Yn,this.vars=n,f&&(f=rt.utils.toArray(f)),r=r||1e-9,i=i||0,g=g||1,W=W||1,o=o||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(Bt.getComputedStyle(Gr).lineHeight)||22);var gt,Fe,we,V,ue,Ae,He,k=this,Ye=0,ke=0,st=n.passive||!u&&n.passive!==!1,fe=Kn(a,St),le=Kn(a,je),Ie=fe(),ot=le(),Te=~o.indexOf("touch")&&!~o.indexOf("pointer")&&rn[0]==="pointerdown",at=Si(a),_e=a.ownerDocument||Hn,_t=[0,0,0],Ue=[0,0,0],Xt=0,Dn=function(){return Xt=wi()},$e=function(I,J){return(k.event=I)&&f&&zp(I.target,f)||J&&Te&&I.pointerType!=="touch"||N&&N(I,J)},kr=function(){k._vx.reset(),k._vy.reset(),Fe.pause(),d&&d(k)},tn=function(){var I=k.deltaX=Tl(_t),J=k.deltaY=Tl(Ue),z=Math.abs(I)>=r,Z=Math.abs(J)>=r;U&&(z||Z)&&U(k,I,J,_t,Ue),z&&(w&&k.deltaX>0&&w(k),O&&k.deltaX<0&&O(k),C&&C(k),_&&k.deltaX<0!=Ye<0&&_(k),Ye=k.deltaX,_t[0]=_t[1]=_t[2]=0),Z&&(R&&k.deltaY>0&&R(k),T&&k.deltaY<0&&T(k),A&&A(k),$&&k.deltaY<0!=ke<0&&$(k),ke=k.deltaY,Ue[0]=Ue[1]=Ue[2]=0),(V||we)&&(X&&X(k),we&&(m&&we===1&&m(k),b&&b(k),we=0),V=!1),Ae&&!(Ae=!1)&&Oe&&Oe(k),ue&&(Q(k),ue=!1),gt=0},bn=function(I,J,z){_t[z]+=I,Ue[z]+=J,k._vx.update(I),k._vy.update(J),c?gt||(gt=requestAnimationFrame(tn)):tn()},vn=function(I,J){Se&&!He&&(k.axis=He=Math.abs(I)>Math.abs(J)?"x":"y",Ae=!0),He!=="y"&&(_t[2]+=I,k._vx.update(I,!0)),He!=="x"&&(Ue[2]+=J,k._vy.update(J,!0)),c?gt||(gt=requestAnimationFrame(tn)):tn()},on=function(I){if(!$e(I,1)){I=ci(I,u);var J=I.clientX,z=I.clientY,Z=J-k.x,Y=z-k.y,ee=k.isDragging;k.x=J,k.y=z,(ee||(Z||Y)&&(Math.abs(k.startX-J)>=i||Math.abs(k.startY-z)>=i))&&(we||(we=ee?2:1),ee||(k.isDragging=!0),vn(Z,Y))}},xn=k.onPress=function(M){$e(M,1)||M&&M.button||(k.axis=He=null,Fe.pause(),k.isPressed=!0,M=ci(M),Ye=ke=0,k.startX=k.x=M.clientX,k.startY=k.y=M.clientY,k._vx.reset(),k._vy.reset(),bt(P?a:_e,rn[1],on,st,!0),k.deltaX=k.deltaY=0,x&&x(k))},re=k.onRelease=function(M){if(!$e(M,1)){yt(P?a:_e,rn[1],on,!0);var I=!isNaN(k.y-k.startY),J=k.isDragging,z=J&&(Math.abs(k.x-k.startX)>3||Math.abs(k.y-k.startY)>3),Z=ci(M);!z&&I&&(k._vx.reset(),k._vy.reset(),u&&q&&rt.delayedCall(.08,function(){if(wi()-Xt>300&&!M.defaultPrevented){if(M.target.click)M.target.click();else if(_e.createEvent){var Y=_e.createEvent("MouseEvents");Y.initMouseEvent("click",!0,!0,Bt,1,Z.screenX,Z.screenY,Z.clientX,Z.clientY,!1,!1,!1,!1,0,null),M.target.dispatchEvent(Y)}}})),k.isDragging=k.isGesturing=k.isPressed=!1,d&&J&&!P&&Fe.restart(!0),we&&tn(),S&&J&&S(k),v&&v(k,z)}},wn=function(I){return I.touches&&I.touches.length>1&&(k.isGesturing=!0)&&D(I,k.isDragging)},mt=function(){return(k.isGesturing=!1)||y(k)},Rt=function(I){if(!$e(I)){var J=fe(),z=le();bn((J-Ie)*W,(z-ot)*W,1),Ie=J,ot=z,d&&Fe.restart(!0)}},kt=function(I){if(!$e(I)){I=ci(I,u),Q&&(ue=!0);var J=(I.deltaMode===1?l:I.deltaMode===2?Bt.innerHeight:1)*g;bn(I.deltaX*J,I.deltaY*J,0),d&&!P&&Fe.restart(!0)}},Sn=function(I){if(!$e(I)){var J=I.clientX,z=I.clientY,Z=J-k.x,Y=z-k.y;k.x=J,k.y=z,V=!0,d&&Fe.restart(!0),(Z||Y)&&vn(Z,Y)}},Ln=function(I){k.event=I,L(k)},Vt=function(I){k.event=I,H(k)},E=function(I){return $e(I)||ci(I,u)&&K(k)};Fe=k._dc=rt.delayedCall(p||.25,kr).pause(),k.deltaX=k.deltaY=0,k._vx=Fo(0,50,!0),k._vy=Fo(0,50,!0),k.scrollX=fe,k.scrollY=le,k.isDragging=k.isGesturing=k.isPressed=!1,gu(this),k.enable=function(M){return k.isEnabled||(bt(at?_e:a,"scroll",No),o.indexOf("scroll")>=0&&bt(at?_e:a,"scroll",Rt,st,te),o.indexOf("wheel")>=0&&bt(a,"wheel",kt,st,te),(o.indexOf("touch")>=0&&du||o.indexOf("pointer")>=0)&&(bt(a,rn[0],xn,st,te),bt(_e,rn[2],re),bt(_e,rn[3],re),q&&bt(a,"click",Dn,!0,!0),K&&bt(a,"click",E),D&&bt(_e,"gesturestart",wn),y&&bt(_e,"gestureend",mt),L&&bt(a,ir+"enter",Ln),H&&bt(a,ir+"leave",Vt),X&&bt(a,ir+"move",Sn)),k.isEnabled=!0,k.isDragging=k.isGesturing=k.isPressed=V=we=!1,k._vx.reset(),k._vy.reset(),Ie=fe(),ot=le(),M&&M.type&&xn(M),j&&j(k)),k},k.disable=function(){k.isEnabled&&(Ir.filter(function(M){return M!==k&&Si(M.target)}).length||yt(at?_e:a,"scroll",No),k.isPressed&&(k._vx.reset(),k._vy.reset(),yt(P?a:_e,rn[1],on,!0)),yt(at?_e:a,"scroll",Rt,te),yt(a,"wheel",kt,te),yt(a,rn[0],xn,te),yt(_e,rn[2],re),yt(_e,rn[3],re),yt(a,"click",Dn,!0),yt(a,"click",E),yt(_e,"gesturestart",wn),yt(_e,"gestureend",mt),yt(a,ir+"enter",Ln),yt(a,ir+"leave",Vt),yt(a,ir+"move",Sn),k.isEnabled=k.isPressed=k.isDragging=!1,F&&F(k))},k.kill=k.revert=function(){k.disable();var M=Ir.indexOf(k);M>=0&&Ir.splice(M,1),Pn===k&&(Pn=0)},Ir.push(k),P&&Si(a)&&(Pn=k),k.enable(h)},Dp(s,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),s}();Ge.version="3.15.0";Ge.create=function(s){return new Ge(s)};Ge.register=bu;Ge.getAll=function(){return Ir.slice()};Ge.getById=function(s){return Ir.filter(function(e){return e.vars.id===s})[0]};_u()&&rt.registerPlugin(Ge);/*!
 * ScrollTrigger 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var B,Ar,se,pe,Nt,he,da,Is,Bi,ki,pi,es,ut,Ws,Bo,xt,Cl,El,Rr,vu,oo,xu,vt,Go,wu,Su,$n,Ho,pa,Yr,ga,Ti,Yo,ao,ts=1,ft=Date.now,lo=ft(),en=0,gi=0,Ml=function(e,t,n){var r=zt(e)&&(e.substr(0,6)==="clamp("||e.indexOf("max")>-1);return n["_"+t+"Clamp"]=r,r?e.substr(6,e.length-7):e},Pl=function(e,t){return t&&(!zt(e)||e.substr(0,6)!=="clamp(")?"clamp("+e+")":e},Ip=function s(){return gi&&requestAnimationFrame(s)},Ol=function(){return Ws=1},Al=function(){return Ws=0},dn=function(e){return e},_i=function(e){return Math.round(e*1e5)/1e5||0},ku=function(){return typeof window<"u"},Tu=function(){return B||ku()&&(B=window.gsap)&&B.registerPlugin&&B},vr=function(e){return!!~da.indexOf(e)},Cu=function(e){return(e==="Height"?ga:se["inner"+e])||Nt["client"+e]||he["client"+e]},Eu=function(e){return Xn(e,"getBoundingClientRect")||(vr(e)?function(){return ws.width=se.innerWidth,ws.height=ga,ws}:function(){return En(e)})},$p=function(e,t,n){var r=n.d,i=n.d2,o=n.a;return(o=Xn(e,"getBoundingClientRect"))?function(){return o()[r]}:function(){return(t?Cu(i):e["client"+i])||0}},Np=function(e,t){return!t||~mn.indexOf(e)?Eu(e):function(){return ws}},_n=function(e,t){var n=t.s,r=t.d2,i=t.d,o=t.a;return Math.max(0,(n="scroll"+r)&&(o=Xn(e,n))?o()-Eu(e)()[i]:vr(e)?(Nt[n]||he[n])-Cu(r):e[n]-e["offset"+r])},ns=function(e,t){for(var n=0;n<Rr.length;n+=3)(!t||~t.indexOf(Rr[n+1]))&&e(Rr[n],Rr[n+1],Rr[n+2])},zt=function(e){return typeof e=="string"},dt=function(e){return typeof e=="function"},mi=function(e){return typeof e=="number"},sr=function(e){return typeof e=="object"},ui=function(e,t,n){return e&&e.progress(t?0:1)&&n&&e.pause()},Mr=function(e,t,n){if(e.enabled){var r=e._ctx?e._ctx.add(function(){return t(e,n)}):t(e,n);r&&r.totalTime&&(e.callbackAnimation=r)}},Pr=Math.abs,Mu="left",Pu="top",_a="right",ma="bottom",_r="width",mr="height",Ci="Right",Ei="Left",Mi="Top",Pi="Bottom",qe="padding",Qt="margin",Qr="Width",ya="Height",Ve="px",Kt=function(e){return se.getComputedStyle(e.nodeType===Node.DOCUMENT_NODE?e.scrollingElement:e)},Fp=function(e){var t=Kt(e).position;e.style.position=t==="absolute"||t==="fixed"?t:"relative"},Rl=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},En=function(e,t){var n=t&&Kt(e)[Bo]!=="matrix(1, 0, 0, 1, 0, 0)"&&B.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),r=e.getBoundingClientRect?e.getBoundingClientRect():e.scrollingElement.getBoundingClientRect();return n&&n.progress(0).kill(),r},$s=function(e,t){var n=t.d2;return e["offset"+n]||e["client"+n]||0},Ou=function(e){var t=[],n=e.labels,r=e.duration(),i;for(i in n)t.push(n[i]/r);return t},Bp=function(e){return function(t){return B.utils.snap(Ou(e),t)}},ba=function(e){var t=B.utils.snap(e),n=Array.isArray(e)&&e.slice(0).sort(function(r,i){return r-i});return n?function(r,i,o){o===void 0&&(o=.001);var a;if(!i)return t(r);if(i>0){for(r-=o,a=0;a<n.length;a++)if(n[a]>=r)return n[a];return n[a-1]}else for(a=n.length,r+=o;a--;)if(n[a]<=r)return n[a];return n[0]}:function(r,i,o){o===void 0&&(o=.001);var a=t(r);return!i||Math.abs(a-r)<o||a-r<0==i<0?a:t(i<0?r-e:r+e)}},Gp=function(e){return function(t,n){return ba(Ou(e))(t,n.direction)}},rs=function(e,t,n,r){return n.split(",").forEach(function(i){return e(t,i,r)})},Je=function(e,t,n,r,i){return e.addEventListener(t,n,{passive:!r,capture:!!i})},Ze=function(e,t,n,r){return e.removeEventListener(t,n,!!r)},is=function(e,t,n){n=n&&n.wheelHandler,n&&(e(t,"wheel",n),e(t,"touchmove",n))},Dl={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},ss={toggleActions:"play",anticipatePin:0},Ns={top:0,left:0,center:.5,bottom:1,right:1},ys=function(e,t){if(zt(e)){var n=e.indexOf("="),r=~n?+(e.charAt(n-1)+1)*parseFloat(e.substr(n+1)):0;~n&&(e.indexOf("%")>n&&(r*=t/100),e=e.substr(0,n-1)),e=r+(e in Ns?Ns[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)}return e},os=function(e,t,n,r,i,o,a,l){var c=i.startColor,u=i.endColor,d=i.fontSize,p=i.indent,f=i.fontWeight,g=pe.createElement("div"),h=vr(n)||Xn(n,"pinType")==="fixed",m=e.indexOf("scroller")!==-1,S=h?he:n.tagName==="IFRAME"?n.contentDocument.body:n,b=e.indexOf("start")!==-1,x=b?c:u,v="border-color:"+x+";font-size:"+d+";color:"+x+";font-weight:"+f+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return v+="position:"+((m||l)&&h?"fixed;":"absolute;"),(m||l||!h)&&(v+=(r===je?_a:ma)+":"+(o+parseFloat(p))+"px;"),a&&(v+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),g._isStart=b,g.setAttribute("class","gsap-marker-"+e+(t?" marker-"+t:"")),g.style.cssText=v,g.innerText=t||t===0?e+"-"+t:e,S.children[0]?S.insertBefore(g,S.children[0]):S.appendChild(g),g._offset=g["offset"+r.op.d2],bs(g,0,r,b),g},bs=function(e,t,n,r){var i={display:"block"},o=n[r?"os2":"p2"],a=n[r?"p2":"os2"];e._isFlipped=r,i[n.a+"Percent"]=r?-100:0,i[n.a]=r?"1px":0,i["border"+o+Qr]=1,i["border"+a+Qr]=0,i[n.p]=t+"px",B.set(e,i)},ie=[],qo={},Gi,Ll=function(){return ft()-en>34&&(Gi||(Gi=requestAnimationFrame(On)))},Or=function(){(!vt||!vt.isPressed||vt.startX>he.clientWidth)&&(oe.cache++,vt?Gi||(Gi=requestAnimationFrame(On)):On(),en||wr("scrollStart"),en=ft())},co=function(){Su=se.innerWidth,wu=se.innerHeight},yi=function(e){oe.cache++,(e===!0||!ut&&!xu&&!pe.fullscreenElement&&!pe.webkitFullscreenElement&&(!Go||Su!==se.innerWidth||Math.abs(se.innerHeight-wu)>se.innerHeight*.25))&&Is.restart(!0)},xr={},Hp=[],Au=function s(){return Ze(ae,"scrollEnd",s)||cr(!0)},wr=function(e){return xr[e]&&xr[e].map(function(t){return t()})||Hp},Lt=[],Ru=function(e){for(var t=0;t<Lt.length;t+=5)(!e||Lt[t+4]&&Lt[t+4].query===e)&&(Lt[t].style.cssText=Lt[t+1],Lt[t].getBBox&&Lt[t].setAttribute("transform",Lt[t+2]||""),Lt[t+3].uncache=1)},Du=function(){return oe.forEach(function(e){return dt(e)&&++e.cacheID&&(e.rec=e())})},va=function(e,t){var n;for(xt=0;xt<ie.length;xt++)n=ie[xt],n&&(!t||n._ctx===t)&&(e?n.kill(1):n.revert(!0,!0));Ti=!0,t&&Ru(t),t||wr("revert")},Lu=function(e,t){oe.cache++,(t||!wt)&&oe.forEach(function(n){return dt(n)&&n.cacheID++&&(n.rec=0)}),zt(e)&&(se.history.scrollRestoration=pa=e)},wt,yr=0,zl,Yp=function(){if(zl!==yr){var e=zl=yr;requestAnimationFrame(function(){return e===yr&&cr(!0)})}},zu=function(){he.appendChild(Yr),ga=!vt&&Yr.offsetHeight||se.innerHeight,he.removeChild(Yr)},Il=function(e){return Bi(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t){return t.style.display=e?"none":"block"})},cr=function(e,t){if(Nt=pe.documentElement,he=pe.body,da=[se,pe,Nt,he],en&&!e&&!Ti){Je(ae,"scrollEnd",Au);return}zu(),wt=ae.isRefreshing=!0,Ti||Du();var n=wr("refreshInit");vu&&ae.sort(),t||va(),oe.forEach(function(r){dt(r)&&(r.smooth&&(r.target.style.scrollBehavior="auto"),r(0))}),ie.slice(0).forEach(function(r){return r.refresh()}),Ti=!1,ie.forEach(function(r){if(r._subPinOffset&&r.pin){var i=r.vars.horizontal?"offsetWidth":"offsetHeight",o=r.pin[i];r.revert(!0,1),r.adjustPinSpacing(r.pin[i]-o),r.refresh()}}),Yo=1,Il(!0),ie.forEach(function(r){var i=_n(r.scroller,r._dir),o=r.vars.end==="max"||r._endClamp&&r.end>i,a=r._startClamp&&r.start>=i;(o||a)&&r.setPositions(a?i-1:r.start,o?Math.max(a?i:r.start+1,i):r.end,!0)}),Il(!1),Yo=0,n.forEach(function(r){return r&&r.render&&r.render(-1)}),oe.forEach(function(r){dt(r)&&(r.smooth&&requestAnimationFrame(function(){return r.target.style.scrollBehavior="smooth"}),r.rec&&r(r.rec))}),Lu(pa,1),Is.pause(),yr++,wt=2,On(2),ie.forEach(function(r){return dt(r.vars.onRefresh)&&r.vars.onRefresh(r)}),wt=ae.isRefreshing=!1,wr("refresh")},Wo=0,vs=1,Oi,On=function(e){if(e===2||!wt&&!Ti){ae.isUpdating=!0,Oi&&Oi.update(0);var t=ie.length,n=ft(),r=n-lo>=50,i=t&&ie[0].scroll();if(vs=Wo>i?-1:1,wt||(Wo=i),r&&(en&&!Ws&&n-en>200&&(en=0,wr("scrollEnd")),pi=lo,lo=n),vs<0){for(xt=t;xt-- >0;)ie[xt]&&ie[xt].update(0,r);vs=1}else for(xt=0;xt<t;xt++)ie[xt]&&ie[xt].update(0,r);ae.isUpdating=!1}Gi=0},Xo=[Mu,Pu,ma,_a,Qt+Pi,Qt+Ci,Qt+Mi,Qt+Ei,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],xs=Xo.concat([_r,mr,"boxSizing","max"+Qr,"max"+ya,"position",Qt,qe,qe+Mi,qe+Ci,qe+Pi,qe+Ei]),qp=function(e,t,n){qr(n);var r=e._gsap;if(r.spacerIsNative)qr(r.spacerState);else if(e._gsap.swappedIn){var i=t.parentNode;i&&(i.insertBefore(e,t),i.removeChild(t))}e._gsap.swappedIn=!1},uo=function(e,t,n,r){if(!e._gsap.swappedIn){for(var i=Xo.length,o=t.style,a=e.style,l;i--;)l=Xo[i],o[l]=n[l];o.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(o.display="inline-block"),a[ma]=a[_a]="auto",o.flexBasis=n.flexBasis||"auto",o.overflow="visible",o.boxSizing="border-box",o[_r]=$s(e,St)+Ve,o[mr]=$s(e,je)+Ve,o[qe]=a[Qt]=a[Pu]=a[Mu]="0",qr(r),a[_r]=a["max"+Qr]=n[_r],a[mr]=a["max"+ya]=n[mr],a[qe]=n[qe],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}},Wp=/([A-Z])/g,qr=function(e){if(e){var t=e.t.style,n=e.length,r=0,i,o;for((e.t._gsap||B.core.getCache(e.t)).uncache=1;r<n;r+=2)o=e[r+1],i=e[r],o?t[i]=o:t[i]&&t.removeProperty(i.replace(Wp,"-$1").toLowerCase())}},as=function(e){for(var t=xs.length,n=e.style,r=[],i=0;i<t;i++)r.push(xs[i],n[xs[i]]);return r.t=e,r},Xp=function(e,t,n){for(var r=[],i=e.length,o=n?8:0,a;o<i;o+=2)a=e[o],r.push(a,a in t?t[a]:e[o+1]);return r.t=e.t,r},ws={left:0,top:0},$l=function(e,t,n,r,i,o,a,l,c,u,d,p,f,g){dt(e)&&(e=e(l)),zt(e)&&e.substr(0,3)==="max"&&(e=p+(e.charAt(4)==="="?ys("0"+e.substr(3),n):0));var h=f?f.time():0,m,S,b;if(f&&f.seek(0),isNaN(e)||(e=+e),mi(e))f&&(e=B.utils.mapRange(f.scrollTrigger.start,f.scrollTrigger.end,0,p,e)),a&&bs(a,n,r,!0);else{dt(t)&&(t=t(l));var x=(e||"0").split(" "),v,w,O,T;b=Tt(t,l)||he,v=En(b)||{},(!v||!v.left&&!v.top)&&Kt(b).display==="none"&&(T=b.style.display,b.style.display="block",v=En(b),T?b.style.display=T:b.style.removeProperty("display")),w=ys(x[0],v[r.d]),O=ys(x[1]||"0",n),e=v[r.p]-c[r.p]-u+w+i-O,a&&bs(a,O,r,n-O<20||a._isStart&&O>20),n-=n-O}if(g&&(l[g]=e||-.001,e<0&&(e=0)),o){var R=e+n,C=o._isStart;m="scroll"+r.d2,bs(o,R,r,C&&R>20||!C&&(d?Math.max(he[m],Nt[m]):o.parentNode[m])<=R+1),d&&(c=En(a),d&&(o.style[r.op.p]=c[r.op.p]-r.op.m-o._offset+Ve))}return f&&b&&(m=En(b),f.seek(p),S=En(b),f._caScrollDist=m[r.p]-S[r.p],e=e/f._caScrollDist*p),f&&f.seek(h),f?e:Math.round(e)},Vp=/(webkit|moz|length|cssText|inset)/i,Nl=function(e,t,n,r){if(e.parentNode!==t){var i=e.style,o,a;if(t===he){e._stOrig=i.cssText,a=Kt(e);for(o in a)!+o&&!Vp.test(o)&&a[o]&&typeof i[o]=="string"&&o!=="0"&&(i[o]=a[o]);i.top=n,i.left=r}else i.cssText=e._stOrig;B.core.getCache(e).uncache=1,t.appendChild(e)}},Iu=function(e,t,n){var r=t,i=r;return function(o){var a=Math.round(e());return a!==r&&a!==i&&Math.abs(a-r)>3&&Math.abs(a-i)>3&&(o=a,n&&n()),i=r,r=Math.round(o),r}},ls=function(e,t,n){var r={};r[t.p]="+="+n,B.set(e,r)},Fl=function(e,t){var n=Kn(e,t),r="_scroll"+t.p2,i=function o(a,l,c,u,d){var p=o.tween,f=l.onComplete,g={};c=c||n();var h=Iu(n,c,function(){p.kill(),o.tween=0});return d=u&&d||0,u=u||a-c,p&&p.kill(),l[r]=a,l.inherit=!1,l.modifiers=g,g[r]=function(){return h(c+u*p.ratio+d*p.ratio*p.ratio)},l.onUpdate=function(){oe.cache++,o.tween&&On()},l.onComplete=function(){o.tween=0,f&&f.call(p)},p=o.tween=B.to(e,l),p};return e[r]=n,n.wheelHandler=function(){return i.tween&&i.tween.kill()&&(i.tween=0)},Je(e,"wheel",n.wheelHandler),ae.isTouch&&Je(e,"touchmove",n.wheelHandler),i},ae=function(){function s(t,n){Ar||s.register(B)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),Ho(this),this.init(t,n)}var e=s.prototype;return e.init=function(n,r){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!gi){this.update=this.refresh=this.kill=dn;return}n=Rl(zt(n)||mi(n)||n.nodeType?{trigger:n}:n,ss);var i=n,o=i.onUpdate,a=i.toggleClass,l=i.id,c=i.onToggle,u=i.onRefresh,d=i.scrub,p=i.trigger,f=i.pin,g=i.pinSpacing,h=i.invalidateOnRefresh,m=i.anticipatePin,S=i.onScrubComplete,b=i.onSnapComplete,x=i.once,v=i.snap,w=i.pinReparent,O=i.pinSpacer,T=i.containerAnimation,R=i.fastScrollEnd,C=i.preventOverlaps,A=n.horizontal||n.containerAnimation&&n.horizontal!==!1?St:je,U=!d&&d!==0,_=Tt(n.scroller||se),$=B.core.getCache(_),L=vr(_),H=("pinType"in n?n.pinType:Xn(_,"pinType")||L&&"fixed")==="fixed",X=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],N=U&&n.toggleActions.split(" "),P="markers"in n?n.markers:ss.markers,D=L?0:parseFloat(Kt(_)["border"+A.p2+Qr])||0,y=this,Q=n.onRefreshInit&&function(){return n.onRefreshInit(y)},j=$p(_,L,A),F=Np(_,L),K=0,W=0,te=0,q=Kn(_,A),Se,Oe,gt,Fe,we,V,ue,Ae,He,k,Ye,ke,st,fe,le,Ie,ot,Te,at,_e,_t,Ue,Xt,Dn,$e,kr,tn,bn,vn,on,xn,re,wn,mt,Rt,kt,Sn,Ln,Vt;if(y._startClamp=y._endClamp=!1,y._dir=A,m*=45,y.scroller=_,y.scroll=T?T.time.bind(T):q,Fe=q(),y.vars=n,r=r||n.animation,"refreshPriority"in n&&(vu=1,n.refreshPriority===-9999&&(Oi=y)),$.tweenScroll=$.tweenScroll||{top:Fl(_,je),left:Fl(_,St)},y.tweenTo=Se=$.tweenScroll[A.p],y.scrubDuration=function(z){wn=mi(z)&&z,wn?re?re.duration(z):re=B.to(r,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:wn,paused:!0,onComplete:function(){return S&&S(y)}}):(re&&re.progress(1).kill(),re=0)},r&&(r.vars.lazy=!1,r._initted&&!y.isReverted||r.vars.immediateRender!==!1&&n.immediateRender!==!1&&r.duration()&&r.render(0,!0,!0),y.animation=r.pause(),r.scrollTrigger=y,y.scrubDuration(d),on=0,l||(l=r.vars.id)),v&&((!sr(v)||v.push)&&(v={snapTo:v}),"scrollBehavior"in he.style&&B.set(L?[he,Nt]:_,{scrollBehavior:"auto"}),oe.forEach(function(z){return dt(z)&&z.target===(L?pe.scrollingElement||Nt:_)&&(z.smooth=!1)}),gt=dt(v.snapTo)?v.snapTo:v.snapTo==="labels"?Bp(r):v.snapTo==="labelsDirectional"?Gp(r):v.directional!==!1?function(z,Z){return ba(v.snapTo)(z,ft()-W<500?0:Z.direction)}:B.utils.snap(v.snapTo),mt=v.duration||{min:.1,max:2},mt=sr(mt)?ki(mt.min,mt.max):ki(mt,mt),Rt=B.delayedCall(v.delay||wn/2||.1,function(){var z=q(),Z=ft()-W<500,Y=Se.tween;if((Z||Math.abs(y.getVelocity())<10)&&!Y&&!Ws&&K!==z){var ee=(z-V)/fe,Ce=r&&!U?r.totalProgress():ee,ne=Z?0:(Ce-xn)/(ft()-pi)*1e3||0,Ee=B.utils.clamp(-ee,1-ee,Pr(ne/2)*ne/.185),Qe=ee+(v.inertia===!1?0:Ee),me,ve,de=v,nn=de.onStart,Re=de.onInterrupt,Dt=de.onComplete;if(me=gt(Qe,y),mi(me)||(me=Qe),ve=Math.max(0,Math.round(V+me*fe)),z<=ue&&z>=V&&ve!==z){if(Y&&!Y._initted&&Y.data<=Pr(ve-z))return;v.inertia===!1&&(Ee=me-ee),Se(ve,{duration:mt(Pr(Math.max(Pr(Qe-Ce),Pr(me-Ce))*.185/ne/.05||0)),ease:v.ease||"power3",data:Pr(ve-z),onInterrupt:function(){return Rt.restart(!0)&&Re&&Mr(y,Re)},onComplete:function(){y.update(),K=q(),r&&!U&&(re?re.resetTo("totalProgress",me,r._tTime/r._tDur):r.progress(me)),on=xn=r&&!U?r.totalProgress():y.progress,b&&b(y),Dt&&Mr(y,Dt)}},z,Ee*fe,ve-z-Ee*fe),nn&&Mr(y,nn,Se.tween)}}else y.isActive&&K!==z&&Rt.restart(!0)}).pause()),l&&(qo[l]=y),p=y.trigger=Tt(p||f!==!0&&f),Vt=p&&p._gsap&&p._gsap.stRevert,Vt&&(Vt=Vt(y)),f=f===!0?p:Tt(f),zt(a)&&(a={targets:p,className:a}),f&&(g===!1||g===Qt||(g=!g&&f.parentNode&&f.parentNode.style&&Kt(f.parentNode).display==="flex"?!1:qe),y.pin=f,Oe=B.core.getCache(f),Oe.spacer?le=Oe.pinState:(O&&(O=Tt(O),O&&!O.nodeType&&(O=O.current||O.nativeElement),Oe.spacerIsNative=!!O,O&&(Oe.spacerState=as(O))),Oe.spacer=Te=O||pe.createElement("div"),Te.classList.add("pin-spacer"),l&&Te.classList.add("pin-spacer-"+l),Oe.pinState=le=as(f)),n.force3D!==!1&&B.set(f,{force3D:!0}),y.spacer=Te=Oe.spacer,vn=Kt(f),Dn=vn[g+A.os2],_e=B.getProperty(f),_t=B.quickSetter(f,A.a,Ve),uo(f,Te,vn),ot=as(f)),P){ke=sr(P)?Rl(P,Dl):Dl,k=os("scroller-start",l,_,A,ke,0),Ye=os("scroller-end",l,_,A,ke,0,k),at=k["offset"+A.op.d2];var E=Tt(Xn(_,"content")||_);Ae=this.markerStart=os("start",l,E,A,ke,at,0,T),He=this.markerEnd=os("end",l,E,A,ke,at,0,T),T&&(Ln=B.quickSetter([Ae,He],A.a,Ve)),!H&&!(mn.length&&Xn(_,"fixedMarkers")===!0)&&(Fp(L?he:_),B.set([k,Ye],{force3D:!0}),kr=B.quickSetter(k,A.a,Ve),bn=B.quickSetter(Ye,A.a,Ve))}if(T){var M=T.vars.onUpdate,I=T.vars.onUpdateParams;T.eventCallback("onUpdate",function(){y.update(0,0,1),M&&M.apply(T,I||[])})}if(y.previous=function(){return ie[ie.indexOf(y)-1]},y.next=function(){return ie[ie.indexOf(y)+1]},y.revert=function(z,Z){if(!Z)return y.kill(!0);var Y=z!==!1||!y.enabled,ee=ut;Y!==y.isReverted&&(Y&&(kt=Math.max(q(),y.scroll.rec||0),te=y.progress,Sn=r&&r.progress()),Ae&&[Ae,He,k,Ye].forEach(function(Ce){return Ce.style.display=Y?"none":"block"}),Y&&(ut=y,y.update(Y)),f&&(!w||!y.isActive)&&(Y?qp(f,Te,le):uo(f,Te,Kt(f),$e)),Y||y.update(Y),ut=ee,y.isReverted=Y)},y.refresh=function(z,Z,Y,ee){if(!((ut||!y.enabled)&&!Z)){if(f&&z&&en){Je(s,"scrollEnd",Au);return}!wt&&Q&&Q(y),ut=y,Se.tween&&!Y&&(Se.tween.kill(),Se.tween=0),re&&re.pause(),h&&r&&(r.revert({kill:!1}).invalidate(),r.getChildren?r.getChildren(!0,!0,!1).forEach(function(zn){return zn.vars.immediateRender&&zn.render(0,!0,!0)}):r.vars.immediateRender&&r.render(0,!0,!0)),y.isReverted||y.revert(!0,!0),y._subPinOffset=!1;var Ce=j(),ne=F(),Ee=T?T.duration():_n(_,A),Qe=fe<=.01||!fe,me=0,ve=ee||0,de=sr(Y)?Y.end:n.end,nn=n.endTrigger||p,Re=sr(Y)?Y.start:n.start||(n.start===0||!p?0:f?"0 0":"0 100%"),Dt=y.pinnedContainer=n.pinnedContainer&&Tt(n.pinnedContainer,y),an=p&&Math.max(0,ie.indexOf(y))||0,tt=an,nt,lt,Jn,Yi,ct,Xe,ln,Xs,xa,Kr,cn,Zr,qi;for(P&&sr(Y)&&(Zr=B.getProperty(k,A.p),qi=B.getProperty(Ye,A.p));tt-- >0;)Xe=ie[tt],Xe.end||Xe.refresh(0,1)||(ut=y),ln=Xe.pin,ln&&(ln===p||ln===f||ln===Dt)&&!Xe.isReverted&&(Kr||(Kr=[]),Kr.unshift(Xe),Xe.revert(!0,!0)),Xe!==ie[tt]&&(an--,tt--);for(dt(Re)&&(Re=Re(y)),Re=Ml(Re,"start",y),V=$l(Re,p,Ce,A,q(),Ae,k,y,ne,D,H,Ee,T,y._startClamp&&"_startClamp")||(f?-.001:0),dt(de)&&(de=de(y)),zt(de)&&!de.indexOf("+=")&&(~de.indexOf(" ")?de=(zt(Re)?Re.split(" ")[0]:"")+de:(me=ys(de.substr(2),Ce),de=zt(Re)?Re:(T?B.utils.mapRange(0,T.duration(),T.scrollTrigger.start,T.scrollTrigger.end,V):V)+me,nn=p)),de=Ml(de,"end",y),ue=Math.max(V,$l(de||(nn?"100% 0":Ee),nn,Ce,A,q()+me,He,Ye,y,ne,D,H,Ee,T,y._endClamp&&"_endClamp"))||-.001,me=0,tt=an;tt--;)Xe=ie[tt]||{},ln=Xe.pin,ln&&Xe.start-Xe._pinPush<=V&&!T&&Xe.end>0&&(nt=Xe.end-(y._startClamp?Math.max(0,Xe.start):Xe.start),(ln===p&&Xe.start-Xe._pinPush<V||ln===Dt)&&isNaN(Re)&&(me+=nt*(1-Xe.progress)),ln===f&&(ve+=nt));if(V+=me,ue+=me,y._startClamp&&(y._startClamp+=me),y._endClamp&&!wt&&(y._endClamp=ue||-.001,ue=Math.min(ue,_n(_,A))),fe=ue-V||(V-=.01)&&.001,Qe&&(te=B.utils.clamp(0,1,B.utils.normalize(V,ue,kt))),y._pinPush=ve,Ae&&me&&(nt={},nt[A.a]="+="+me,Dt&&(nt[A.p]="-="+q()),B.set([Ae,He],nt)),f&&!(Yo&&y.end>=_n(_,A)))nt=Kt(f),Yi=A===je,Jn=q(),Ue=parseFloat(_e(A.a))+ve,!Ee&&ue>1&&(cn=(L?pe.scrollingElement||Nt:_).style,cn={style:cn,value:cn["overflow"+A.a.toUpperCase()]},L&&Kt(he)["overflow"+A.a.toUpperCase()]!=="scroll"&&(cn.style["overflow"+A.a.toUpperCase()]="scroll")),uo(f,Te,nt),ot=as(f),lt=En(f,!0),Xs=H&&Kn(_,Yi?St:je)(),g?($e=[g+A.os2,fe+ve+Ve],$e.t=Te,tt=g===qe?$s(f,A)+fe+ve:0,tt&&($e.push(A.d,tt+Ve),Te.style.flexBasis!=="auto"&&(Te.style.flexBasis=tt+Ve)),qr($e),Dt&&ie.forEach(function(zn){zn.pin===Dt&&zn.vars.pinSpacing!==!1&&(zn._subPinOffset=!0)}),H&&q(kt)):(tt=$s(f,A),tt&&Te.style.flexBasis!=="auto"&&(Te.style.flexBasis=tt+Ve)),H&&(ct={top:lt.top+(Yi?Jn-V:Xs)+Ve,left:lt.left+(Yi?Xs:Jn-V)+Ve,boxSizing:"border-box",position:"fixed"},ct[_r]=ct["max"+Qr]=Math.ceil(lt.width)+Ve,ct[mr]=ct["max"+ya]=Math.ceil(lt.height)+Ve,ct[Qt]=ct[Qt+Mi]=ct[Qt+Ci]=ct[Qt+Pi]=ct[Qt+Ei]="0",ct[qe]=nt[qe],ct[qe+Mi]=nt[qe+Mi],ct[qe+Ci]=nt[qe+Ci],ct[qe+Pi]=nt[qe+Pi],ct[qe+Ei]=nt[qe+Ei],Ie=Xp(le,ct,w),wt&&q(0)),r?(xa=r._initted,oo(1),r.render(r.duration(),!0,!0),Xt=_e(A.a)-Ue+fe+ve,tn=Math.abs(fe-Xt)>1,H&&tn&&Ie.splice(Ie.length-2,2),r.render(0,!0,!0),xa||r.invalidate(!0),r.parent||r.totalTime(r.totalTime()),oo(0)):Xt=fe,cn&&(cn.value?cn.style["overflow"+A.a.toUpperCase()]=cn.value:cn.style.removeProperty("overflow-"+A.a));else if(p&&q()&&!T)for(lt=p.parentNode;lt&&lt!==he;)lt._pinOffset&&(V-=lt._pinOffset,ue-=lt._pinOffset),lt=lt.parentNode;Kr&&Kr.forEach(function(zn){return zn.revert(!1,!0)}),y.start=V,y.end=ue,Fe=we=wt?kt:q(),!T&&!wt&&(Fe<kt&&q(kt),y.scroll.rec=0),y.revert(!1,!0),W=ft(),Rt&&(K=-1,Rt.restart(!0)),ut=0,r&&U&&(r._initted||Sn)&&r.progress()!==Sn&&r.progress(Sn||0,!0).render(r.time(),!0,!0),(Qe||te!==y.progress||T||h||r&&!r._initted)&&(r&&!U&&(r._initted||te||r.vars.immediateRender!==!1)&&r.totalProgress(T&&V<-.001&&!te?B.utils.normalize(V,ue,0):te,!0),y.progress=Qe||(Fe-V)/fe===te?0:te),f&&g&&(Te._pinOffset=Math.round(y.progress*Xt)),re&&re.invalidate(),isNaN(Zr)||(Zr-=B.getProperty(k,A.p),qi-=B.getProperty(Ye,A.p),ls(k,A,Zr),ls(Ae,A,Zr-(ee||0)),ls(Ye,A,qi),ls(He,A,qi-(ee||0))),Qe&&!wt&&y.update(),u&&!wt&&!st&&(st=!0,u(y),st=!1)}},y.getVelocity=function(){return(q()-we)/(ft()-pi)*1e3||0},y.endAnimation=function(){ui(y.callbackAnimation),r&&(re?re.progress(1):r.paused()?U||ui(r,y.direction<0,1):ui(r,r.reversed()))},y.labelToScroll=function(z){return r&&r.labels&&(V||y.refresh()||V)+r.labels[z]/r.duration()*fe||0},y.getTrailing=function(z){var Z=ie.indexOf(y),Y=y.direction>0?ie.slice(0,Z).reverse():ie.slice(Z+1);return(zt(z)?Y.filter(function(ee){return ee.vars.preventOverlaps===z}):Y).filter(function(ee){return y.direction>0?ee.end<=V:ee.start>=ue})},y.update=function(z,Z,Y){if(!(T&&!Y&&!z)){var ee=wt===!0?kt:y.scroll(),Ce=z?0:(ee-V)/fe,ne=Ce<0?0:Ce>1?1:Ce||0,Ee=y.progress,Qe,me,ve,de,nn,Re,Dt,an;if(Z&&(we=Fe,Fe=T?q():ee,v&&(xn=on,on=r&&!U?r.totalProgress():ne)),m&&f&&!ut&&!ts&&en&&(!ne&&V<ee+(ee-we)/(ft()-pi)*m?ne=1e-4:ne===1&&ue>ee+(ee-we)/(ft()-pi)*m&&(ne=.9999)),ne!==Ee&&y.enabled){if(Qe=y.isActive=!!ne&&ne<1,me=!!Ee&&Ee<1,Re=Qe!==me,nn=Re||!!ne!=!!Ee,y.direction=ne>Ee?1:-1,y.progress=ne,nn&&!ut&&(ve=ne&&!Ee?0:ne===1?1:Ee===1?2:3,U&&(de=!Re&&N[ve+1]!=="none"&&N[ve+1]||N[ve],an=r&&(de==="complete"||de==="reset"||de in r))),C&&(Re||an)&&(an||d||!r)&&(dt(C)?C(y):y.getTrailing(C).forEach(function(Jn){return Jn.endAnimation()})),U||(re&&!ut&&!ts?(re._dp._time-re._start!==re._time&&re.render(re._dp._time-re._start),re.resetTo?re.resetTo("totalProgress",ne,r._tTime/r._tDur):(re.vars.totalProgress=ne,re.invalidate().restart())):r&&r.totalProgress(ne,!!(ut&&(W||z)))),f){if(z&&g&&(Te.style[g+A.os2]=Dn),!H)_t(_i(Ue+Xt*ne));else if(nn){if(Dt=!z&&ne>Ee&&ue+1>ee&&ee+1>=_n(_,A),w)if(!z&&(Qe||Dt)){var tt=En(f,!0),nt=ee-V;Nl(f,he,tt.top+(A===je?nt:0)+Ve,tt.left+(A===je?0:nt)+Ve)}else Nl(f,Te);qr(Qe||Dt?Ie:ot),tn&&ne<1&&Qe||_t(Ue+(ne===1&&!Dt?Xt:0))}}v&&!Se.tween&&!ut&&!ts&&Rt.restart(!0),a&&(Re||x&&ne&&(ne<1||!ao))&&Bi(a.targets).forEach(function(Jn){return Jn.classList[Qe||x?"add":"remove"](a.className)}),o&&!U&&!z&&o(y),nn&&!ut?(U&&(an&&(de==="complete"?r.pause().totalProgress(1):de==="reset"?r.restart(!0).pause():de==="restart"?r.restart(!0):r[de]()),o&&o(y)),(Re||!ao)&&(c&&Re&&Mr(y,c),X[ve]&&Mr(y,X[ve]),x&&(ne===1?y.kill(!1,1):X[ve]=0),Re||(ve=ne===1?1:3,X[ve]&&Mr(y,X[ve]))),R&&!Qe&&Math.abs(y.getVelocity())>(mi(R)?R:2500)&&(ui(y.callbackAnimation),re?re.progress(1):ui(r,de==="reverse"?1:!ne,1))):U&&o&&!ut&&o(y)}if(bn){var lt=T?ee/T.duration()*(T._caScrollDist||0):ee;kr(lt+(k._isFlipped?1:0)),bn(lt)}Ln&&Ln(-ee/T.duration()*(T._caScrollDist||0))}},y.enable=function(z,Z){y.enabled||(y.enabled=!0,Je(_,"resize",yi),L||Je(_,"scroll",Or),Q&&Je(s,"refreshInit",Q),z!==!1&&(y.progress=te=0,Fe=we=K=q()),Z!==!1&&y.refresh())},y.getTween=function(z){return z&&Se?Se.tween:re},y.setPositions=function(z,Z,Y,ee){if(T){var Ce=T.scrollTrigger,ne=T.duration(),Ee=Ce.end-Ce.start;z=Ce.start+Ee*z/ne,Z=Ce.start+Ee*Z/ne}y.refresh(!1,!1,{start:Pl(z,Y&&!!y._startClamp),end:Pl(Z,Y&&!!y._endClamp)},ee),y.update()},y.adjustPinSpacing=function(z){if($e&&z){var Z=$e.indexOf(A.d)+1;$e[Z]=parseFloat($e[Z])+z+Ve,$e[1]=parseFloat($e[1])+z+Ve,qr($e)}},y.disable=function(z,Z){if(z!==!1&&y.revert(!0,!0),y.enabled&&(y.enabled=y.isActive=!1,Z||re&&re.pause(),kt=0,Oe&&(Oe.uncache=1),Q&&Ze(s,"refreshInit",Q),Rt&&(Rt.pause(),Se.tween&&Se.tween.kill()&&(Se.tween=0)),!L)){for(var Y=ie.length;Y--;)if(ie[Y].scroller===_&&ie[Y]!==y)return;Ze(_,"resize",yi),L||Ze(_,"scroll",Or)}},y.kill=function(z,Z){y.disable(z,Z),re&&!Z&&re.kill(),l&&delete qo[l];var Y=ie.indexOf(y);Y>=0&&ie.splice(Y,1),Y===xt&&vs>0&&xt--,Y=0,ie.forEach(function(ee){return ee.scroller===y.scroller&&(Y=1)}),Y||wt||(y.scroll.rec=0),r&&(r.scrollTrigger=null,z&&r.revert({kill:!1}),Z||r.kill()),Ae&&[Ae,He,k,Ye].forEach(function(ee){return ee.parentNode&&ee.parentNode.removeChild(ee)}),Oi===y&&(Oi=0),f&&(Oe&&(Oe.uncache=1),Y=0,ie.forEach(function(ee){return ee.pin===f&&Y++}),Y||(Oe.spacer=0)),n.onKill&&n.onKill(y)},ie.push(y),y.enable(!1,!1),Vt&&Vt(y),r&&r.add&&!fe){var J=y.update;y.update=function(){y.update=J,oe.cache++,V||ue||y.refresh()},B.delayedCall(.01,y.update),fe=.01,V=ue=0}else y.refresh();f&&Yp()},s.register=function(n){return Ar||(B=n||Tu(),ku()&&window.document&&s.enable(),Ar=gi),Ar},s.defaults=function(n){if(n)for(var r in n)ss[r]=n[r];return ss},s.disable=function(n,r){gi=0,ie.forEach(function(o){return o[r?"kill":"disable"](n)}),Ze(se,"wheel",Or),Ze(pe,"scroll",Or),clearInterval(es),Ze(pe,"touchcancel",dn),Ze(he,"touchstart",dn),rs(Ze,pe,"pointerdown,touchstart,mousedown",Ol),rs(Ze,pe,"pointerup,touchend,mouseup",Al),Is.kill(),ns(Ze);for(var i=0;i<oe.length;i+=3)is(Ze,oe[i],oe[i+1]),is(Ze,oe[i],oe[i+2])},s.enable=function(){if(se=window,pe=document,Nt=pe.documentElement,he=pe.body,B){if(Bi=B.utils.toArray,ki=B.utils.clamp,Ho=B.core.context||dn,oo=B.core.suppressOverwrites||dn,pa=se.history.scrollRestoration||"auto",Wo=se.pageYOffset||0,B.core.globals("ScrollTrigger",s),he){gi=1,Yr=document.createElement("div"),Yr.style.height="100vh",Yr.style.position="absolute",zu(),Ip(),Ge.register(B),s.isTouch=Ge.isTouch,$n=Ge.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),Go=Ge.isTouch===1,Je(se,"wheel",Or),da=[se,pe,Nt,he],B.matchMedia?(s.matchMedia=function(u){var d=B.matchMedia(),p;for(p in u)d.add(p,u[p]);return d},B.addEventListener("matchMediaInit",function(){Du(),va()}),B.addEventListener("matchMediaRevert",function(){return Ru()}),B.addEventListener("matchMedia",function(){cr(0,1),wr("matchMedia")}),B.matchMedia().add("(orientation: portrait)",function(){return co(),co})):console.warn("Requires GSAP 3.11.0 or later"),co(),Je(pe,"scroll",Or);var n=he.hasAttribute("style"),r=he.style,i=r.borderTopStyle,o=B.core.Animation.prototype,a,l;for(o.revert||Object.defineProperty(o,"revert",{value:function(){return this.time(-.01,!0)}}),r.borderTopStyle="solid",a=En(he),je.m=Math.round(a.top+je.sc())||0,St.m=Math.round(a.left+St.sc())||0,i?r.borderTopStyle=i:r.removeProperty("border-top-style"),n||(he.setAttribute("style",""),he.removeAttribute("style")),es=setInterval(Ll,250),B.delayedCall(.5,function(){return ts=0}),Je(pe,"touchcancel",dn),Je(he,"touchstart",dn),rs(Je,pe,"pointerdown,touchstart,mousedown",Ol),rs(Je,pe,"pointerup,touchend,mouseup",Al),Bo=B.utils.checkPrefix("transform"),xs.push(Bo),Ar=ft(),Is=B.delayedCall(.2,cr).pause(),Rr=[pe,"visibilitychange",function(){var u=se.innerWidth,d=se.innerHeight;pe.hidden?(Cl=u,El=d):(Cl!==u||El!==d)&&yi()},pe,"DOMContentLoaded",cr,se,"load",cr,se,"resize",yi],ns(Je),ie.forEach(function(u){return u.enable(0,1)}),l=0;l<oe.length;l+=3)is(Ze,oe[l],oe[l+1]),is(Ze,oe[l],oe[l+2])}else if(pe){var c=function u(){s.enable(),pe.removeEventListener("DOMContentLoaded",u)};pe.addEventListener("DOMContentLoaded",c)}}},s.config=function(n){"limitCallbacks"in n&&(ao=!!n.limitCallbacks);var r=n.syncInterval;r&&clearInterval(es)||(es=r)&&setInterval(Ll,r),"ignoreMobileResize"in n&&(Go=s.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(ns(Ze)||ns(Je,n.autoRefreshEvents||"none"),xu=(n.autoRefreshEvents+"").indexOf("resize")===-1)},s.scrollerProxy=function(n,r){var i=Tt(n),o=oe.indexOf(i),a=vr(i);~o&&oe.splice(o,a?6:2),r&&(a?mn.unshift(se,r,he,r,Nt,r):mn.unshift(i,r))},s.clearMatchMedia=function(n){ie.forEach(function(r){return r._ctx&&r._ctx.query===n&&r._ctx.kill(!0,!0)})},s.isInViewport=function(n,r,i){var o=(zt(n)?Tt(n):n).getBoundingClientRect(),a=o[i?_r:mr]*r||0;return i?o.right-a>0&&o.left+a<se.innerWidth:o.bottom-a>0&&o.top+a<se.innerHeight},s.positionInViewport=function(n,r,i){zt(n)&&(n=Tt(n));var o=n.getBoundingClientRect(),a=o[i?_r:mr],l=r==null?a/2:r in Ns?Ns[r]*a:~r.indexOf("%")?parseFloat(r)*a/100:parseFloat(r)||0;return i?(o.left+l)/se.innerWidth:(o.top+l)/se.innerHeight},s.killAll=function(n){if(ie.slice(0).forEach(function(i){return i.vars.id!=="ScrollSmoother"&&i.kill()}),n!==!0){var r=xr.killAll||[];xr={},r.forEach(function(i){return i()})}},s}();ae.version="3.15.0";ae.saveStyles=function(s){return s?Bi(s).forEach(function(e){if(e&&e.style){var t=Lt.indexOf(e);t>=0&&Lt.splice(t,5),Lt.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),B.core.getCache(e),Ho())}}):Lt};ae.revert=function(s,e){return va(!s,e)};ae.create=function(s,e){return new ae(s,e)};ae.refresh=function(s){return s?yi(!0):(Ar||ae.register())&&cr(!0)};ae.update=function(s){return++oe.cache&&On(s===!0?2:0)};ae.clearScrollMemory=Lu;ae.maxScroll=function(s,e){return _n(s,e?St:je)};ae.getScrollFunc=function(s,e){return Kn(Tt(s),e?St:je)};ae.getById=function(s){return qo[s]};ae.getAll=function(){return ie.filter(function(s){return s.vars.id!=="ScrollSmoother"})};ae.isScrolling=function(){return!!en};ae.snapDirectional=ba;ae.addEventListener=function(s,e){var t=xr[s]||(xr[s]=[]);~t.indexOf(e)||t.push(e)};ae.removeEventListener=function(s,e){var t=xr[s],n=t&&t.indexOf(e);n>=0&&t.splice(n,1)};ae.batch=function(s,e){var t=[],n={},r=e.interval||.016,i=e.batchMax||1e9,o=function(c,u){var d=[],p=[],f=B.delayedCall(r,function(){u(d,p),d=[],p=[]}).pause();return function(g){d.length||f.restart(!0),d.push(g.trigger),p.push(g),i<=d.length&&f.progress(1)}},a;for(a in e)n[a]=a.substr(0,2)==="on"&&dt(e[a])&&a!=="onRefreshInit"?o(a,e[a]):e[a];return dt(i)&&(i=i(),Je(ae,"refresh",function(){return i=e.batchMax()})),Bi(s).forEach(function(l){var c={};for(a in n)c[a]=n[a];c.trigger=l,t.push(ae.create(c))}),t};var Bl=function(e,t,n,r){return t>r?e(r):t<0&&e(0),n>r?(r-t)/(n-t):n<0?t/(t-n):1},fo=function s(e,t){t===!0?e.style.removeProperty("touch-action"):e.style.touchAction=t===!0?"auto":t?"pan-"+t+(Ge.isTouch?" pinch-zoom":""):"none",e===Nt&&s(he,t)},cs={auto:1,scroll:1},jp=function(e){var t=e.event,n=e.target,r=e.axis,i=(t.changedTouches?t.changedTouches[0]:t).target,o=i._gsap||B.core.getCache(i),a=ft(),l;if(!o._isScrollT||a-o._isScrollT>2e3){for(;i&&i!==he&&(i.scrollHeight<=i.clientHeight&&i.scrollWidth<=i.clientWidth||!(cs[(l=Kt(i)).overflowY]||cs[l.overflowX]));)i=i.parentNode;o._isScroll=i&&i!==n&&!vr(i)&&(cs[(l=Kt(i)).overflowY]||cs[l.overflowX]),o._isScrollT=a}(o._isScroll||r==="x")&&(t.stopPropagation(),t._gsapAllow=!0)},$u=function(e,t,n,r){return Ge.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:r=r&&jp,onPress:r,onDrag:r,onScroll:r,onEnable:function(){return n&&Je(pe,Ge.eventTypes[0],Hl,!1,!0)},onDisable:function(){return Ze(pe,Ge.eventTypes[0],Hl,!0)}})},Up=/(input|label|select|textarea)/i,Gl,Hl=function(e){var t=Up.test(e.target.tagName);(t||Gl)&&(e._gsapAllow=!0,Gl=t)},Qp=function(e){sr(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var t=e,n=t.normalizeScrollX,r=t.momentum,i=t.allowNestedScroll,o=t.onRelease,a,l,c=Tt(e.target)||Nt,u=B.core.globals().ScrollSmoother,d=u&&u.get(),p=$n&&(e.content&&Tt(e.content)||d&&e.content!==!1&&!d.smooth()&&d.content()),f=Kn(c,je),g=Kn(c,St),h=1,m=(Ge.isTouch&&se.visualViewport?se.visualViewport.scale*se.visualViewport.width:se.outerWidth)/se.innerWidth,S=0,b=dt(r)?function(){return r(a)}:function(){return r||2.8},x,v,w=$u(c,e.type,!0,i),O=function(){return v=!1},T=dn,R=dn,C=function(){l=_n(c,je),R=ki($n?1:0,l),n&&(T=ki(0,_n(c,St))),x=yr},A=function(){p._gsap.y=_i(parseFloat(p._gsap.y)+f.offset)+"px",p.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(p._gsap.y)+", 0, 1)",f.offset=f.cacheID=0},U=function(){if(v){requestAnimationFrame(O);var P=_i(a.deltaY/2),D=R(f.v-P);if(p&&D!==f.v+f.offset){f.offset=D-f.v;var y=_i((parseFloat(p&&p._gsap.y)||0)-f.offset);p.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+y+", 0, 1)",p._gsap.y=y+"px",f.cacheID=oe.cache,On()}return!0}f.offset&&A(),v=!0},_,$,L,H,X=function(){C(),_.isActive()&&_.vars.scrollY>l&&(f()>l?_.progress(1)&&f(l):_.resetTo("scrollY",l))};return p&&B.set(p,{y:"+=0"}),e.ignoreCheck=function(N){return $n&&N.type==="touchmove"&&U()||h>1.05&&N.type!=="touchstart"||a.isGesturing||N.touches&&N.touches.length>1},e.onPress=function(){v=!1;var N=h;h=_i((se.visualViewport&&se.visualViewport.scale||1)/m),_.pause(),N!==h&&fo(c,h>1.01?!0:n?!1:"x"),$=g(),L=f(),C(),x=yr},e.onRelease=e.onGestureStart=function(N,P){if(f.offset&&A(),!P)H.restart(!0);else{oe.cache++;var D=b(),y,Q;n&&(y=g(),Q=y+D*.05*-N.velocityX/.227,D*=Bl(g,y,Q,_n(c,St)),_.vars.scrollX=T(Q)),y=f(),Q=y+D*.05*-N.velocityY/.227,D*=Bl(f,y,Q,_n(c,je)),_.vars.scrollY=R(Q),_.invalidate().duration(D).play(.01),($n&&_.vars.scrollY>=l||y>=l-1)&&B.to({},{onUpdate:X,duration:D})}o&&o(N)},e.onWheel=function(){_._ts&&_.pause(),ft()-S>1e3&&(x=0,S=ft())},e.onChange=function(N,P,D,y,Q){if(yr!==x&&C(),P&&n&&g(T(y[2]===P?$+(N.startX-N.x):g()+P-y[1])),D){f.offset&&A();var j=Q[2]===D,F=j?L+N.startY-N.y:f()+D-Q[1],K=R(F);j&&F!==K&&(L+=K-F),f(K)}(D||P)&&On()},e.onEnable=function(){fo(c,n?!1:"x"),ae.addEventListener("refresh",X),Je(se,"resize",X),f.smooth&&(f.target.style.scrollBehavior="auto",f.smooth=g.smooth=!1),w.enable()},e.onDisable=function(){fo(c,!0),Ze(se,"resize",X),ae.removeEventListener("refresh",X),w.kill()},e.lockAxis=e.lockAxis!==!1,a=new Ge(e),a.iOS=$n,$n&&!f()&&f(1),$n&&B.ticker.add(dn),H=a._dc,_=B.to(a,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:Iu(f,f(),function(){return _.pause()})},onUpdate:On,onComplete:H.vars.onComplete}),a};ae.sort=function(s){if(dt(s))return ie.sort(s);var e=se.pageYOffset||0;return ae.getAll().forEach(function(t){return t._sortY=t.trigger?e+t.trigger.getBoundingClientRect().top:t.start+se.innerHeight}),ie.sort(s||function(t,n){return(t.vars.refreshPriority||0)*-1e6+(t.vars.containerAnimation?1e6:t._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};ae.observe=function(s){return new Ge(s)};ae.normalizeScroll=function(s){if(typeof s>"u")return vt;if(s===!0&&vt)return vt.enable();if(s===!1){vt&&vt.kill(),vt=s;return}var e=s instanceof Ge?s:Qp(s);return vt&&vt.target===e.target&&vt.kill(),vr(e.target)&&(vt=e),e};ae.core={_getVelocityProp:Fo,_inputObserver:$u,_scrollers:oe,_proxies:mn,bridge:{ss:function(){en||wr("scrollStart"),en=ft()},ref:function(){return ut}}};Tu()&&B.registerPlugin(ae);Qn.registerPlugin(ae);const Yl=Object.assign({"./chapters/ch1.ts":Vf,"./chapters/ch2.ts":wd,"./chapters/ch3.ts":zd,"./chapters/ch4.ts":qd,"./chapters/ch5.ts":ap,"./chapters/ch6.ts":mp,"./chapters/ch7.ts":Tp,"./chapters/ch8.ts":Ap}),Kp=Object.keys(Yl).map(s=>{const e=s.match(/\/(ch\d+)\.ts$/);return e?{id:e[1],num:parseInt(e[1].slice(2),10),create:Yl[s].createChapter}:null}).filter(s=>s!==null).sort((s,e)=>s.num-e.num);function Zp(s,e){const t=[],n=[];return Kp.forEach((r,i)=>{const o=document.getElementById(r.id);if(!o)throw new Error(`缺少章节容器 #${r.id}（检查 index.html）`);const a=dd[r.id];if(!a)throw new Error(`COPY 缺少 ${r.id} 文案`);const l=r.create({sky:s,root:o,copy:a,id:r.id});t.push(l),n.push(ae.create({trigger:o,start:"top top",end:"bottom bottom",scrub:!0,onEnter:()=>l.enter(),onEnterBack:()=>l.enter(),onLeave:()=>l.exit(),onLeaveBack:()=>l.exit(),onUpdate:c=>{l.update(c.progress),e(i+c.progress)}}))}),{chapters:t,triggers:n}}const Fs=30,ql=.22,Jp=`
.app-cursor-ring, .app-cursor-dot {
  position: fixed; top: 0; left: 0; z-index: 60; pointer-events: none;
  border-radius: 50%; transform: translate(-50%, -50%);
  will-change: transform;
}
.app-cursor-ring {
  width: ${Fs}px; height: ${Fs}px;
  border: 1px solid rgba(201, 162, 39, 0.75);
  box-shadow: 0 0 12px rgba(201, 162, 39, 0.28), inset 0 0 8px rgba(201, 162, 39, 0.12);
  transition: border-color 0.18s ease-out, box-shadow 0.18s ease-out, opacity 0.25s ease-out;
}
.app-cursor-dot {
  width: 4px; height: 4px;
  background: #f2dd9a;
  box-shadow: 0 0 6px rgba(242, 221, 154, 0.9);
  transition: opacity 0.25s ease-out;
}
.app-cursor-ring.is-star {
  border-color: rgba(242, 221, 154, 0.95);
  box-shadow: 0 0 18px rgba(201, 162, 39, 0.55), inset 0 0 10px rgba(242, 221, 154, 0.25);
}
.app-cursor-ring.is-down { opacity: 0.45; }
.app-cursor-hidden { opacity: 0 !important; }
`;function e0(s){if(window.matchMedia("(pointer: coarse)").matches)return;const e=document.createElement("style");e.textContent=Jp,document.head.appendChild(e);const t=document.createElement("div");t.className="app-cursor-ring app-cursor-hidden";const n=document.createElement("div");n.className="app-cursor-dot app-cursor-hidden",document.body.append(t,n);let r=-100,i=-100,o=-100,a=-100,l=!1,c=!1;const u=document.querySelector(".sky-tooltip");window.addEventListener("pointermove",f=>{const g=f.target===s;r=f.clientX,i=f.clientY,g!==l&&(l=g,t.classList.toggle("app-cursor-hidden",!l),n.classList.toggle("app-cursor-hidden",!l))}),window.addEventListener("pointerdown",()=>{c=!0,t.classList.add("is-down")}),window.addEventListener("pointerup",()=>{c=!1,t.classList.remove("is-down")}),document.documentElement.addEventListener("mouseleave",()=>{l=!1,t.classList.add("app-cursor-hidden"),n.classList.add("app-cursor-hidden")});let d=1;const p=()=>{o+=(r-o)*ql,a+=(i-a)*ql;const f=u!==null&&u.style.display==="block",g=(f?.55:1)*(c?.8:1);d+=(g-d)*.2,t.classList.toggle("is-star",f),t.style.transform=`translate(${o-Fs/2}px, ${a-Fs/2}px) scale(${d.toFixed(3)})`,n.style.transform=`translate(${r-2}px, ${i-2}px)`,requestAnimationFrame(p)};requestAnimationFrame(p)}const t0=1.015,Wl={ra:192.8595,dec:27.1283},Xl={ra:266.405,dec:-28.9362},n0=.085,r0=.14,i0=.9,s0=.6,o0=new Jl(.96,.9,.78),a0=new Jl(1,.88,.68),l0=`
varying vec3 vDir;
void main() {
  // 球心在原点：物体空间坐标即天球方向（随父组岁差旋转，与星点行为一致）
  vDir = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,c0=`
uniform vec3 uPole;         // 银河北极方向（单位向量）
uniform vec3 uE0;           // 银道面内指向银心的基向量
uniform vec3 uE1;           // 银道面内与 uE0 正交的基向量（「银经 +90°」，镜像约定见文件头）
uniform float uPeakAlpha;   // 全带峰值透明度
uniform float uWidth;       // 基础半宽高斯 σ（弧度）
uniform float uCenterSigma; // 银心经度增亮高斯 σ（弧度）
uniform float uDust;        // 暗尘埃带最大挖除比例
uniform vec3 uColorBand;
uniform vec3 uColorCore;
varying vec3 vDir;

// Hash without Sine（David Hoskins）：三维点 → [0,1)，避免 sin 在大输入下的精度条纹
float hash13(vec3 p) {
  p = fract(p * 0.1031);
  p += dot(p, p.zyx + 31.32);
  return fract((p.x + p.y) * p.z);
}

// 三维值噪声：对方向向量的缩放采样天然球面无接缝
float vnoise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  vec3 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash13(i + vec3(0.0, 0.0, 0.0)), hash13(i + vec3(1.0, 0.0, 0.0)), u.x),
        mix(hash13(i + vec3(0.0, 1.0, 0.0)), hash13(i + vec3(1.0, 1.0, 0.0)), u.x), u.y),
    mix(mix(hash13(i + vec3(0.0, 0.0, 1.0)), hash13(i + vec3(1.0, 0.0, 1.0)), u.x),
        mix(hash13(i + vec3(0.0, 1.0, 1.0)), hash13(i + vec3(1.0, 1.0, 1.0)), u.x), u.y),
    u.z);
}

// fbm：5 octaves，lacunarity 2.02，gain 0.5；每倍频平移去轴向相关。范围约 0~0.97，均值 ~0.48
float fbm(vec3 p) {
  float s = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    s += a * vnoise(p);
    p = p * 2.02 + vec3(19.19, 7.13, 4.7);
    a *= 0.5;
  }
  return s;
}

// 一维高斯（不用 pow：GLSL pow 对负底数行为未定义）
float gauss(float x, float sigma) {
  float t = x / sigma;
  return exp(-0.5 * t * t);
}

void main() {
  vec3 d = normalize(vDir);
  float gp = clamp(dot(d, uPole), -1.0, 1.0);
  float lat = asin(gp);                          // 银纬（弧度，0 = 银道面）
  float x0 = dot(d, uE0);
  float x1 = dot(d, uE1);
  float lon = atan(x1, x0);                      // 银经（-π~π，0 = 银心）

  // 银心方向增亮：lon=0 高斯隆起，反银心保留 45% 基底
  float center = gauss(lon, uCenterSigma);

  // 各向异性采样域：银纬方向采样距离 ×2.8 → 噪声沿银道面拉伸成缕
  vec3 q = (uE0 * x0 + uE1 * x1) + uPole * (gp * 2.8);
  float n1 = fbm(q * 2.3);                       // 大尺度云气团块
  float n2 = fbm(q * 6.1 + vec3(13.7));          // 纤维细节

  // 带宽：银心附近放宽最多 45%，再被大尺度噪声扰动，带缘不整齐
  float w = uWidth * (1.0 + 0.45 * center) * (0.8 + 0.4 * n1);
  float band = gauss(lat, w);
  float longAmp = 0.45 + 0.55 * center;

  // 团块化：保留 35% 均匀基底，噪声阈值切出絮状结构
  float clump = smoothstep(0.30, 0.78, n1 * 0.62 + n2 * 0.38);
  float glow = band * longAmp * (0.35 + 0.65 * clump);

  // 暗尘埃带：在中线附近乘性挖除辉光（加色混合下等效减色，见文件头）
  float dustN = fbm(q * 8.3 + vec3(29.1));
  float lane = gauss(lat + 0.025 * cos(lon), uWidth * 0.22);
  float dustMask = 0.5 + 0.5 * cos(lon - 0.35);  // 银心一侧强，反银心消失
  glow *= 1.0 - uDust * lane * dustMask * smoothstep(0.42, 0.72, dustN);

  vec3 col = mix(uColorBand, uColorCore, center * band);
  gl_FragColor = vec4(col, glow * uPeakAlpha);
}
`;function u0(s){const e=new xe(...sn(Wl.ra,Wl.dec)).normalize(),t=new xe(...sn(Xl.ra,Xl.dec)),n=t.addScaledVector(e,-t.dot(e)).normalize(),r=new xe().crossVectors(e,n).normalize(),i=new af(s*t0,96,64),o=new lf({vertexShader:l0,fragmentShader:c0,uniforms:{uPole:{value:e},uE0:{value:n},uE1:{value:r},uPeakAlpha:{value:n0},uWidth:{value:r0},uCenterSigma:{value:i0},uDust:{value:s0},uColorBand:{value:o0},uColorCore:{value:a0}},transparent:!0,depthWrite:!1,blending:Zl,side:cf}),a=new Ss(i,o);a.name="milkyway-shell";const l=new Cn;return l.name="milkyway",l.add(a),{group:l,dispose(){i.dispose(),o.dispose()}}}const f0=3.5;function h0(){try{const s=document.createElement("canvas");return!!(s.getContext("webgl2")||s.getContext("webgl"))}catch{return!1}}function Vl(s){var n,r,i;const e=document.getElementById("fallback");e&&(e.hidden=!1);const t=document.getElementById("fallback-diag");t&&(t.textContent=`诊断信息：${s}`),(n=document.getElementById("chapters"))==null||n.setAttribute("hidden",""),(r=document.getElementById("sky-canvas"))==null||r.setAttribute("hidden",""),(i=document.getElementById("loading"))==null||i.remove()}async function d0(){const s=document.getElementById("sky-canvas");if(!s)throw new Error("缺少 #sky-canvas");const e=new zo(s);e0(s);const t=document.getElementById("loading");try{await e.init()}catch(a){console.error(a),t&&(t.textContent="星空数据加载失败，请检查开发服务器");return}t==null||t.remove(),e.addSkyObject(u0(ge).group),If();const n=new ks(Bf);let r=0,i=0;const{chapters:o}=Zp(e,a=>{r=a});e.start(a=>{var c,u;i+=(r-i)*(1-Math.exp(-a*f0)),e.applyCameraState(n.sampleGlobal(i));const l=Math.min(Math.max(Math.floor(i),0),o.length-1);(u=(c=o[l])==null?void 0:c.frame)==null||u.call(c,a)})}h0()?d0().catch(s=>{console.error(s),Vl(s instanceof Error?s.message:String(s))}):Vl("当前浏览器环境无法创建 WebGL 上下文（webgl2 / webgl 均不可用）");
