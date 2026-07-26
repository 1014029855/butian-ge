var Jf=Object.defineProperty;var ed=(i,e,t)=>e in i?Jf(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var G=(i,e,t)=>ed(i,typeof e!="symbol"?e+"":e,t);import{M as Vo,V as re,Q as Wt,r as Bt,a as Me,G as wn,S as La,A as zr,b as Da,B as Zi,c as nr,D as xo,d as Wc,P as za,C as po,e as On,w as qc,f as Uc,L as Vc,g as td,h as nd,E as Pi,W as rd,i as id,j as sd,k as od,l as ad,m as ld,n as cd,o as ud,p as fd,q as dd,s as fl,t as hd,u as dl,v as pd,x as hl,y as gd,z as js,T as jc,F as md,H as _d,I as Qc,J as yd,K as bd}from"./detailCard-hyfERk3D.js";const vd=.5,Kc=1.5,xd=8,wd=400,Sd=.03,kd=55,Td=82.4,pl=3,Ed=.5,Cd=.28,Md=900,Pd=.035,Ad=.018,Rd=24,gl=6e3,Od=15e3,Ld=220,ml=[0,2,5,7,9,12,14,17,19,21,24],Dd=3,zd=.996,Id=2600,_l=.05,Fd=.1,Nd=.6,$d=`
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
`,Bd=`
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
</svg>`;let yl=!1,jt=null,Yn=!1,wo=0,zs=null;const bl=new Map;function Gd(i){const e=i.sampleRate,t=Math.floor(xd*e),n=i.createBuffer(1,t,e),r=n.getChannelData(0);let s=0;for(let a=0;a<t;a++){const l=Math.random()*2-1;s=(s+.02*l)/1.02,r[a]=s*3.5}const o=Math.min(Math.floor(e*.1),t>>2);for(let a=0;a<o;a++){const l=a/o;r[t-o+a]=r[t-o+a]*(1-l)+r[a]*l}return n}function Yd(i,e){const t=i.sampleRate,n=Math.floor(Dd*t),r=i.createBuffer(1,n,t),s=r.getChannelData(0),o=Math.max(2,Math.round(t/e)),a=new Float32Array(o);for(let c=0;c<o;c++)a[c]=Math.random()*2-1;let l=0;for(let c=0;c<n;c++){const u=(l+1)%o;s[c]=a[l],a[l]=zd*.5*(a[l]+a[u]),l=u}return r}function Hd(i){const e=i.createGain();e.gain.value=0,e.connect(i.destination);const t=i.createBufferSource();t.buffer=Gd(i),t.loop=!0;const n=i.createBiquadFilter();n.type="lowpass",n.frequency.value=wd;const r=i.createGain();r.gain.value=Sd,t.connect(n).connect(r).connect(e),t.start();const s=i.createBiquadFilter();s.type="lowpass",s.frequency.value=Md;const o=i.createGain();o.gain.value=Pd,s.connect(o).connect(e);const a=i.createOscillator();a.type="sine",a.frequency.value=kd,a.detune.value=-pl;const l=i.createGain();l.gain.value=Ed,a.connect(l).connect(s);const c=i.createOscillator();c.type="triangle",c.frequency.value=Td,c.detune.value=pl;const u=i.createGain();u.gain.value=Cd,c.connect(u).connect(s);const d=i.createOscillator();d.type="sine",d.frequency.value=1/Rd;const h=i.createGain();return h.gain.value=Ad,d.connect(h).connect(o.gain),a.start(),c.start(),d.start(),{ctx:i,master:e}}function Xd({ctx:i,master:e}){const t=ml[Math.floor(Math.random()*ml.length)],n=Ld*Math.pow(2,t/12);let r=bl.get(n);r||(r=Yd(i,n),bl.set(n,r));const s=i.createBufferSource();s.buffer=r;const o=i.createBiquadFilter();o.type="lowpass",o.frequency.value=Id;const a=i.createGain();a.gain.value=_l+Math.random()*(Fd-_l);const l=i.createStereoPanner();l.pan.value=(Math.random()*2-1)*Nd,s.connect(o).connect(a).connect(l).connect(e),s.onended=()=>{s.disconnect(),o.disconnect(),a.disconnect(),l.disconnect()},s.start()}function vl(i,e){const t=i.context.currentTime,n=i.gain;n.cancelScheduledValues(t),n.setValueAtTime(n.value,t),n.linearRampToValueAtTime(e,t+Kc)}function Zc(){zs!==null&&(window.clearTimeout(zs),zs=null)}function Jc(){Zc(),zs=window.setTimeout(()=>{jt&&Yn&&jt.ctx.state==="running"&&Xd(jt),Jc()},gl+Math.random()*(Od-gl))}function eu(i){i.classList.toggle("is-on",Yn);const e=Yn?"关闭环境音":"开启环境音";i.setAttribute("aria-label",e),i.setAttribute("aria-pressed",String(Yn)),i.title=e}function tu(){const i=window;return i.AudioContext??i.webkitAudioContext}async function Wd(i){if(!jt){const n=tu();if(!n)return;jt=Hd(new n)}Yn=!Yn,wo++,eu(i);const{ctx:e,master:t}=jt;if(Yn)e.state!=="running"&&await e.resume().catch(()=>{}),vl(t,vd),Jc();else{vl(t,0),Zc();const n=wo;window.setTimeout(()=>{jt&&!Yn&&n===wo&&jt.ctx.state==="running"&&jt.ctx.suspend()},(Kc+.1)*1e3)}}function qd(){if(yl||typeof document>"u")return;yl=!0;const i=document.createElement("style");i.textContent=$d,document.head.appendChild(i);const e=document.createElement("button");if(e.type="button",e.className="app-ambient-toggle",e.innerHTML=Bd,document.body.appendChild(e),!tu()){e.disabled=!0,e.setAttribute("aria-label","环境音不可用"),e.title="当前浏览器不支持 Web Audio";return}eu(e),e.addEventListener("click",()=>{Wd(e)}),document.addEventListener("visibilitychange",()=>{jt&&(document.hidden?jt.ctx.state==="running"&&jt.ctx.suspend():Yn&&jt.ctx.resume())})}const Ud=.65,Vd=new re(0,1,0),jd={ra:0,dec:80};function xl(i){return i=Me.clamp(i,0,1),i*i*(3-2*i)}function Qn(i,e){const t=new re(...Bt(i,e,1)),n=new Vo().lookAt(new re(0,0,0),t,Vd);return new Wt().setFromRotationMatrix(n)}function wl(i){if(i.gaze!=="target")return null;const e=i.target??jd;return Qn(e.ra,e.dec)}class Qs{constructor(e,t=Ud){G(this,"keys");G(this,"hold");if(e.length<2)throw new Error("CameraRig 至少需要 2 个关键帧");this.hold=Me.clamp(t,0,.95);for(const[n,r]of e.entries()){if(!(r.radius>0))throw new Error(`关键帧 ${n}：radius 必须为正`);if(!(r.fov>10&&r.fov<140))throw new Error(`关键帧 ${n}：fov 非法（${r.fov}）`);if(r.gaze!=="free"&&r.gaze!=="target")throw new Error(`关键帧 ${n}：gaze 必须为 "free" | "target"`);const s=r.enter??0;if(s<0||s>=1)throw new Error(`关键帧 ${n}：enter 必须在 [0,1)（${s}）`);if(r.hold!==void 0&&(r.hold<0||r.hold>1))throw new Error(`关键帧 ${n}：hold 必须在 [0,1]（${r.hold}）`);if(n>0&&s>0){const o=e[n-1].hold??this.hold;if(o<1)throw new Error(`关键帧 ${n}：enter > 0 要求上一章 hold = 1（当前 ${o}）`)}}this.keys=e}get count(){return this.keys.length}sample(e,t){const n=this.keys.length,r=Math.min(Math.max(Math.floor(e),0),n-1),s=Me.clamp(t,0,1),o=this.keys[r],a=this.keys[Math.min(r+1,n-1)],l=o.enter??0;if(r>0&&l>0&&s<l)return Qs.blend(this.keys[r-1],o,xl(s/l));const c=o.hold??this.hold,u=r<n-1&&c<1?xl((s-c)/(1-c)):0;return Qs.blend(o,a,u)}sampleGlobal(e){const t=this.keys.length,n=Me.clamp(e,0,t),r=Math.min(Math.floor(n),t-1);return this.sample(r,n-r)}static blend(e,t,n){var d;const r=new re(...e.dir??[0,1,0]).normalize(),s=new re(...t.dir??[0,1,0]).normalize(),o=r.lerp(s,n).normalize(),a=wl(e),l=wl(t),c=Me.lerp(e.gaze==="target"?1:0,t.gaze==="target"?1:0,n);let u=null;return c>0&&(u=a&&l?a.clone().slerp(l,n):((d=a??l)==null?void 0:d.clone())??null),{radius:Me.lerp(e.radius,t.radius,n),dir:o,fov:Me.lerp(e.fov,t.fov,n),gazeBlend:c,gazeTargetQ:u,drift:Me.lerp(e.drift??0,t.drift??0,n),orbit:Me.lerp(e.orbit?1:0,t.orbit?1:0,n)}}}const ds=.005,Qd=[{radius:ds,fov:78,gaze:"free",drift:.012},{radius:ds,fov:78,gaze:"free",hold:1},{radius:ds,fov:65,gaze:"target",target:{ra:270,dec:8},enter:.3},{radius:ds,fov:45,gaze:"target",target:{ra:175,dec:81}},{radius:3,dir:[.52,.7,.49],fov:50,gaze:"free",orbit:!0},{radius:3,dir:[.52,.7,.49],fov:50,gaze:"free",orbit:!0},{radius:3,dir:[0,.55,.84],fov:50,gaze:"free",orbit:!0},{radius:5,dir:[.52,.7,.49],fov:45,gaze:"free"}],Sl=.22,Kd=`
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
  letter-spacing: ${Sl}em;
  background: linear-gradient(160deg, #f2dd9a 15%, #c9a227 55%, #8f7019 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 0 26px rgba(201, 162, 39, 0.45));
  margin-bottom: 24px;
  /* 开屏即现：标题只随页面加载做一次入场动画，与滚动进度脱钩 */
  animation: ch1-title-in 1.5s cubic-bezier(0.2, 0.7, 0.2, 1) 0.15s both;
}
@keyframes ch1-title-in {
  from {
    opacity: 0;
    letter-spacing: 0.55em;
    filter: blur(14px) drop-shadow(0 0 26px rgba(201, 162, 39, 0.45));
    transform: translateY(26px);
  }
  to {
    opacity: 1;
    letter-spacing: ${Sl}em;
    filter: blur(0) drop-shadow(0 0 26px rgba(201, 162, 39, 0.45));
    transform: translateY(0);
  }
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
`;let kl=!1;function Zd(){if(kl||typeof document>"u")return;const i=document.createElement("style");i.dataset.ch1="",i.textContent=Kd,document.head.appendChild(i),kl=!0}function yi(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Jd(i){return i<0?0:i>1?1:i}function hs(i,e,t){const n=Jd((i-e)/(t-e));return n*n*(3-2*n)}function eh(i){Zd();const e=i.root.querySelector(".pin"),{copy:t}=i,n=document.createElement("div");n.className="ch1-stage",n.innerHTML=`
    <p class="ch1-eyebrow">${yi(t.eyebrow)}</p>
    <h1 class="ch1-title">${yi(t.title)}</h1>
    <p class="ch1-hook">${yi(t.hook)}</p>
    <div class="ch1-body">${t.body.map(d=>`<p>${yi(d)}</p>`).join("")}</div>
    ${t.seal?`<div class="ch1-seal">${yi(t.seal)}</div>`:""}
  `,e.appendChild(n);const r=document.createElement("div");r.className="ch1-cue",r.textContent="向下滚动 · 步入夜空",e.appendChild(r);const s=n.querySelector(".ch1-hook"),o=n.querySelector(".ch1-body"),a=n.querySelector(".ch1-seal");let l=-1;const c=new Map;function u(d,h,f=18){const g=c.get(d);g!==void 0&&Math.abs(g-h)<1e-4||(c.set(d,h),d.style.opacity=h.toFixed(3),d.style.transform=`translateY(${((1-h)*f).toFixed(2)}px)`)}return{enter(){i.sky.setLabelsEnabled(!1)},update(d){if(u(s,hs(d,.15,.45)),u(o,hs(d,.3,.6)),a){const f=hs(d,.45,.75),g=c.get(a);(g===void 0||Math.abs(g-f)>=1e-4)&&(c.set(a,f),a.style.opacity=f.toFixed(3),a.style.transform=`translateY(${((1-f)*10).toFixed(2)}px) scale(${(1.3-.3*f).toFixed(3)})`)}const h=.65*(1-hs(d,0,.35));(Math.abs(h-l)>=1e-4||l<0)&&(l=h,r.style.opacity=h.toFixed(3))},exit(){i.sky.setLabelsEnabled(!0)}}}const th=Object.freeze(Object.defineProperty({__proto__:null,createChapter:eh},Symbol.toStringTag,{value:"Module"}));function $n(i){if(i===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return i}function nu(i,e){i.prototype=Object.create(e.prototype),i.prototype.constructor=i,i.__proto__=e}/*!
 * GSAP 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var nn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Ji={duration:.5,overwrite:!1,delay:0},Ia,pt,De,pn=1e8,we=1/pn,jo=Math.PI*2,nh=jo/4,rh=0,ru=Math.sqrt,ih=Math.cos,sh=Math.sin,ot=function(e){return typeof e=="string"},He=function(e){return typeof e=="function"},Wn=function(e){return typeof e=="number"},Fa=function(e){return typeof e>"u"},Dn=function(e){return typeof e=="object"},It=function(e){return e!==!1},Na=function(){return typeof window<"u"},ps=function(e){return He(e)||ot(e)},iu=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},St=Array.isArray,oh=/random\([^)]+\)/g,ah=/,\s*/g,Tl=/(?:-?\.?\d|\.)+/gi,su=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Kr=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,So=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,ou=/[+-]=-?[.\d]+/,lh=/[^,'"\[\]\s]+/gi,ch=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Be,Tn,Qo,$a,rn={},Ks={},au,lu=function(e){return(Ks=ci(e,rn))&&Gt},Ba=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},es=function(e,t){return!t&&console.warn(e)},cu=function(e,t){return e&&(rn[e]=t)&&Ks&&(Ks[e]=t)||rn},ts=function(){return 0},uh={suppressEvents:!0,isStart:!0,kill:!1},Is={suppressEvents:!0,kill:!1},fh={suppressEvents:!0},Ga={},rr=[],Ko={},uu,Vt={},ko={},El=30,Fs=[],Ya="",Ha=function(e){var t=e[0],n,r;if(Dn(t)||He(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(r=Fs.length;r--&&!Fs[r].targetTest(t););n=Fs[r]}for(r=e.length;r--;)e[r]&&(e[r]._gsap||(e[r]._gsap=new Ou(e[r],n)))||e.splice(r,1);return e},Er=function(e){return e._gsap||Ha(gn(e))[0]._gsap},fu=function(e,t,n){return(n=e[t])&&He(n)?e[t]():Fa(n)&&e.getAttribute&&e.getAttribute(t)||n},Ft=function(e,t){return(e=e.split(",")).forEach(t)||e},We=function(e){return Math.round(e*1e5)/1e5||0},$e=function(e){return Math.round(e*1e7)/1e7||0},ti=function(e,t){var n=t.charAt(0),r=parseFloat(t.substr(2));return e=parseFloat(e),n==="+"?e+r:n==="-"?e-r:n==="*"?e*r:e/r},dh=function(e,t){for(var n=t.length,r=0;e.indexOf(t[r])<0&&++r<n;);return r<n},Zs=function(){var e=rr.length,t=rr.slice(0),n,r;for(Ko={},rr.length=0,n=0;n<e;n++)r=t[n],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},Xa=function(e){return!!(e._initted||e._startAt||e.add)},du=function(e,t,n,r){rr.length&&!pt&&Zs(),e.render(t,n,!!(pt&&t<0&&Xa(e))),rr.length&&!pt&&Zs()},hu=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(lh).length<2?t:ot(e)?e.trim():e},pu=function(e){return e},sn=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},hh=function(e){return function(t,n){for(var r in n)r in t||r==="duration"&&e||r==="ease"||(t[r]=n[r])}},ci=function(e,t){for(var n in t)e[n]=t[n];return e},Cl=function i(e,t){for(var n in t)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(e[n]=Dn(t[n])?i(e[n]||(e[n]={}),t[n]):t[n]);return e},Js=function(e,t){var n={},r;for(r in e)r in t||(n[r]=e[r]);return n},$i=function(e){var t=e.parent||Be,n=e.keyframes?hh(St(e.keyframes)):sn;if(It(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},ph=function(e,t){for(var n=e.length,r=n===t.length;r&&n--&&e[n]===t[n];);return n<0},gu=function(e,t,n,r,s){var o=e[r],a;if(s)for(a=t[s];o&&o[s]>a;)o=o._prev;return o?(t._next=o._next,o._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[r]=t,t._prev=o,t.parent=t._dp=e,t},go=function(e,t,n,r){n===void 0&&(n="_first"),r===void 0&&(r="_last");var s=t._prev,o=t._next;s?s._next=o:e[n]===t&&(e[n]=o),o?o._prev=s:e[r]===t&&(e[r]=s),t._next=t._prev=t.parent=null},or=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},Cr=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},gh=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},Zo=function(e,t,n,r){return e._startAt&&(pt?e._startAt.revert(Is):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,r))},mh=function i(e){return!e||e._ts&&i(e.parent)},Ml=function(e){return e._repeat?ui(e._tTime,e=e.duration()+e._rDelay)*e:0},ui=function(e,t){var n=Math.floor(e=$e(e/t));return e&&n===e?n-1:n},eo=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},mo=function(e){return e._end=$e(e._start+(e._tDur/Math.abs(e._ts||e._rts||we)||0))},_o=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=$e(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),mo(e),n._dirty||Cr(n,e)),e},mu=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=eo(e.rawTime(),t),(!t._dur||us(0,t.totalDuration(),n)-t._tTime>we)&&t.render(n,!0)),Cr(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-we}},Mn=function(e,t,n,r){return t.parent&&or(t),t._start=$e((Wn(n)?n:n||e!==Be?fn(e,n,t):e._time)+t._delay),t._end=$e(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),gu(e,t,"_first","_last",e._sort?"_start":0),Jo(t)||(e._recent=t),r||mu(e,t),e._ts<0&&_o(e,e._tTime),e},_u=function(e,t){return(rn.ScrollTrigger||Ba("scrollTrigger",t))&&rn.ScrollTrigger.create(t,e)},yu=function(e,t,n,r,s){if(qa(e,t,s),!e._initted)return 1;if(!n&&e._pt&&!pt&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&uu!==Zt.frame)return rr.push(e),e._lazy=[s,r],1},_h=function i(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||i(t))},Jo=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},yh=function(e,t,n,r){var s=e.ratio,o=t<0||!t&&(!e._start&&_h(e)&&!(!e._initted&&Jo(e))||(e._ts<0||e._dp._ts<0)&&!Jo(e))?0:1,a=e._rDelay,l=0,c,u,d;if(a&&e._repeat&&(l=us(0,e._tDur,t),u=ui(l,a),e._yoyo&&u&1&&(o=1-o),u!==ui(e._tTime,a)&&(s=1-o,e.vars.repeatRefresh&&e._initted&&e.invalidate())),o!==s||pt||r||e._zTime===we||!t&&e._zTime){if(!e._initted&&yu(e,t,r,n,l))return;for(d=e._zTime,e._zTime=t||(n?we:0),n||(n=t&&!d),e.ratio=o,e._from&&(o=1-o),e._time=0,e._tTime=l,c=e._pt;c;)c.r(o,c.d),c=c._next;t<0&&Zo(e,t,n,!0),e._onUpdate&&!n&&en(e,"onUpdate"),l&&e._repeat&&!n&&e.parent&&en(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===o&&(o&&or(e,1),!n&&!pt&&(en(e,o?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},bh=function(e,t,n){var r;if(n>t)for(r=e._first;r&&r._start<=n;){if(r.data==="isPause"&&r._start>t)return r;r=r._next}else for(r=e._last;r&&r._start>=n;){if(r.data==="isPause"&&r._start<t)return r;r=r._prev}},fi=function(e,t,n,r){var s=e._repeat,o=$e(t)||0,a=e._tTime/e._tDur;return a&&!r&&(e._time*=o/e._dur),e._dur=o,e._tDur=s?s<0?1e10:$e(o*(s+1)+e._rDelay*s):o,a>0&&!r&&_o(e,e._tTime=e._tDur*a),e.parent&&mo(e),n||Cr(e.parent,e),e},Pl=function(e){return e instanceof zt?Cr(e):fi(e,e._dur)},vh={_start:0,endTime:ts,totalDuration:ts},fn=function i(e,t,n){var r=e.labels,s=e._recent||vh,o=e.duration()>=pn?s.endTime(!1):e._dur,a,l,c;return ot(t)&&(isNaN(t)||t in r)?(l=t.charAt(0),c=t.substr(-1)==="%",a=t.indexOf("="),l==="<"||l===">"?(a>=0&&(t=t.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(a<0?s:n).totalDuration()/100:1)):a<0?(t in r||(r[t]=o),r[t]):(l=parseFloat(t.charAt(a-1)+t.substr(a+1)),c&&n&&(l=l/100*(St(n)?n[0]:n).totalDuration()),a>1?i(e,t.substr(0,a-1),n)+l:o+l)):t==null?o:+t},Bi=function(e,t,n){var r=Wn(t[1]),s=(r?2:1)+(e<2?0:1),o=t[s],a,l;if(r&&(o.duration=t[1]),o.parent=n,e){for(a=o,l=n;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=It(l.vars.inherit)&&l.parent;o.immediateRender=It(a.immediateRender),e<2?o.runBackwards=1:o.startAt=t[s-1]}return new Qe(t[0],o,t[s+1])},ur=function(e,t){return e||e===0?t(e):t},us=function(e,t,n){return n<e?e:n>t?t:n},xt=function(e,t){return!ot(e)||!(t=ch.exec(e))?"":t[1]},xh=function(e,t,n){return ur(n,function(r){return us(e,t,r)})},ea=[].slice,bu=function(e,t){return e&&Dn(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&Dn(e[0]))&&!e.nodeType&&e!==Tn},wh=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(r){var s;return ot(r)&&!t||bu(r,1)?(s=n).push.apply(s,gn(r)):n.push(r)})||n},gn=function(e,t,n){return De&&!t&&De.selector?De.selector(e):ot(e)&&!n&&(Qo||!di())?ea.call((t||$a).querySelectorAll(e),0):St(e)?wh(e,n):bu(e)?ea.call(e,0):e?[e]:[]},ta=function(e){return e=gn(e)[0]||es("Invalid scope")||{},function(t){var n=e.current||e.nativeElement||e;return gn(t,n.querySelectorAll?n:n===e?es("Invalid scope")||$a.createElement("div"):e)}},vu=function(e){return e.sort(function(){return .5-Math.random()})},xu=function(e){if(He(e))return e;var t=Dn(e)?e:{each:e},n=Mr(t.ease),r=t.from||0,s=parseFloat(t.base)||0,o={},a=r>0&&r<1,l=isNaN(r)||a,c=t.axis,u=r,d=r;return ot(r)?u=d={center:.5,edges:.5,end:1}[r]||0:!a&&l&&(u=r[0],d=r[1]),function(h,f,g){var p=(g||t).length,y=o[p],v,b,x,w,T,M,k,R,C;if(!y){if(C=t.grid==="auto"?0:(t.grid||[1,pn])[1],!C){for(k=-pn;k<(k=g[C++].getBoundingClientRect().left)&&C<p;);C<p&&C--}for(y=o[p]=[],v=l?Math.min(C,p)*u-.5:r%C,b=C===pn?0:l?p*d/C-.5:r/C|0,k=0,R=pn,M=0;M<p;M++)x=M%C-v,w=b-(M/C|0),y[M]=T=c?Math.abs(c==="y"?w:x):ru(x*x+w*w),T>k&&(k=T),T<R&&(R=T);r==="random"&&vu(y),y.max=k-R,y.min=R,y.v=p=(parseFloat(t.amount)||parseFloat(t.each)*(C>p?p-1:c?c==="y"?p/C:C:Math.max(C,p/C))||0)*(r==="edges"?-1:1),y.b=p<0?s-p:s,y.u=xt(t.amount||t.each)||0,n=n&&p<0?zh(n):n}return p=(y[h]-y.min)/y.max||0,$e(y.b+(n?n(p):p)*y.v)+y.u}},na=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(n){var r=$e(Math.round(parseFloat(n)/e)*e*t);return(r-r%1)/t+(Wn(n)?0:xt(n))}},wu=function(e,t){var n=St(e),r,s;return!n&&Dn(e)&&(r=n=e.radius||pn,e.values?(e=gn(e.values),(s=!Wn(e[0]))&&(r*=r)):e=na(e.increment)),ur(t,n?He(e)?function(o){return s=e(o),Math.abs(s-o)<=r?s:o}:function(o){for(var a=parseFloat(s?o.x:o),l=parseFloat(s?o.y:0),c=pn,u=0,d=e.length,h,f;d--;)s?(h=e[d].x-a,f=e[d].y-l,h=h*h+f*f):h=Math.abs(e[d]-a),h<c&&(c=h,u=d);return u=!r||c<=r?e[u]:o,s||u===o||Wn(o)?u:u+xt(o)}:na(e))},Su=function(e,t,n,r){return ur(St(e)?!t:n===!0?!!(n=0):!r,function(){return St(e)?e[~~(Math.random()*e.length)]:(n=n||1e-5)&&(r=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*r)/r})},Sh=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(r){return t.reduce(function(s,o){return o(s)},r)}},kh=function(e,t){return function(n){return e(parseFloat(n))+(t||xt(n))}},Th=function(e,t,n){return Tu(e,t,0,1,n)},ku=function(e,t,n){return ur(n,function(r){return e[~~t(r)]})},Eh=function i(e,t,n){var r=t-e;return St(e)?ku(e,i(0,e.length),t):ur(n,function(s){return(r+(s-e)%r)%r+e})},Ch=function i(e,t,n){var r=t-e,s=r*2;return St(e)?ku(e,i(0,e.length-1),t):ur(n,function(o){return o=(s+(o-e)%s)%s||0,e+(o>r?s-o:o)})},ns=function(e){return e.replace(oh,function(t){var n=t.indexOf("[")+1,r=t.substring(n||7,n?t.indexOf("]"):t.length-1).split(ah);return Su(n?r:+r[0],n?0:+r[1],+r[2]||1e-5)})},Tu=function(e,t,n,r,s){var o=t-e,a=r-n;return ur(s,function(l){return n+((l-e)/o*a||0)})},Mh=function i(e,t,n,r){var s=isNaN(e+t)?0:function(f){return(1-f)*e+f*t};if(!s){var o=ot(e),a={},l,c,u,d,h;if(n===!0&&(r=1)&&(n=null),o)e={p:e},t={p:t};else if(St(e)&&!St(t)){for(u=[],d=e.length,h=d-2,c=1;c<d;c++)u.push(i(e[c-1],e[c]));d--,s=function(g){g*=d;var p=Math.min(h,~~g);return u[p](g-p)},n=t}else r||(e=ci(St(e)?[]:{},e));if(!u){for(l in t)Wa.call(a,e,l,"get",t[l]);s=function(g){return ja(g,a)||(o?e.p:e)}}}return ur(n,s)},Al=function(e,t,n){var r=e.labels,s=pn,o,a,l;for(o in r)a=r[o]-t,a<0==!!n&&a&&s>(a=Math.abs(a))&&(l=o,s=a);return l},en=function(e,t,n){var r=e.vars,s=r[t],o=De,a=e._ctx,l,c,u;if(s)return l=r[t+"Params"],c=r.callbackScope||e,n&&rr.length&&Zs(),a&&(De=a),u=l?s.apply(c,l):s.call(c),De=o,u},Ai=function(e){return or(e),e.scrollTrigger&&e.scrollTrigger.kill(!!pt),e.progress()<1&&en(e,"onInterrupt"),e},Zr,Eu=[],Cu=function(e){if(e)if(e=!e.name&&e.default||e,Na()||e.headless){var t=e.name,n=He(e),r=t&&!n&&e.init?function(){this._props=[]}:e,s={init:ts,render:ja,add:Wa,kill:Wh,modifier:Xh,rawVars:0},o={targetTest:0,get:0,getSetter:Va,aliases:{},register:0};if(di(),e!==r){if(Vt[t])return;sn(r,sn(Js(e,s),o)),ci(r.prototype,ci(s,Js(e,o))),Vt[r.prop=t]=r,e.targetTest&&(Fs.push(r),Ga[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}cu(t,r),e.register&&e.register(Gt,r,Nt)}else Eu.push(e)},xe=255,Ri={aqua:[0,xe,xe],lime:[0,xe,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,xe],navy:[0,0,128],white:[xe,xe,xe],olive:[128,128,0],yellow:[xe,xe,0],orange:[xe,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[xe,0,0],pink:[xe,192,203],cyan:[0,xe,xe],transparent:[xe,xe,xe,0]},To=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*xe+.5|0},Mu=function(e,t,n){var r=e?Wn(e)?[e>>16,e>>8&xe,e&xe]:0:Ri.black,s,o,a,l,c,u,d,h,f,g;if(!r){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),Ri[e])r=Ri[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),o=e.charAt(2),a=e.charAt(3),e="#"+s+s+o+o+a+a+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return r=parseInt(e.substr(1,6),16),[r>>16,r>>8&xe,r&xe,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),r=[e>>16,e>>8&xe,e&xe]}else if(e.substr(0,3)==="hsl"){if(r=g=e.match(Tl),!t)l=+r[0]%360/360,c=+r[1]/100,u=+r[2]/100,o=u<=.5?u*(c+1):u+c-u*c,s=u*2-o,r.length>3&&(r[3]*=1),r[0]=To(l+1/3,s,o),r[1]=To(l,s,o),r[2]=To(l-1/3,s,o);else if(~e.indexOf("="))return r=e.match(su),n&&r.length<4&&(r[3]=1),r}else r=e.match(Tl)||Ri.transparent;r=r.map(Number)}return t&&!g&&(s=r[0]/xe,o=r[1]/xe,a=r[2]/xe,d=Math.max(s,o,a),h=Math.min(s,o,a),u=(d+h)/2,d===h?l=c=0:(f=d-h,c=u>.5?f/(2-d-h):f/(d+h),l=d===s?(o-a)/f+(o<a?6:0):d===o?(a-s)/f+2:(s-o)/f+4,l*=60),r[0]=~~(l+.5),r[1]=~~(c*100+.5),r[2]=~~(u*100+.5)),n&&r.length<4&&(r[3]=1),r},Pu=function(e){var t=[],n=[],r=-1;return e.split(ir).forEach(function(s){var o=s.match(Kr)||[];t.push.apply(t,o),n.push(r+=o.length+1)}),t.c=n,t},Rl=function(e,t,n){var r="",s=(e+r).match(ir),o=t?"hsla(":"rgba(",a=0,l,c,u,d;if(!s)return e;if(s=s.map(function(h){return(h=Mu(h,t,1))&&o+(t?h[0]+","+h[1]+"%,"+h[2]+"%,"+h[3]:h.join(","))+")"}),n&&(u=Pu(e),l=n.c,l.join(r)!==u.c.join(r)))for(c=e.replace(ir,"1").split(Kr),d=c.length-1;a<d;a++)r+=c[a]+(~l.indexOf(a)?s.shift()||o+"0,0,0,0)":(u.length?u:s.length?s:n).shift());if(!c)for(c=e.split(ir),d=c.length-1;a<d;a++)r+=c[a]+s[a];return r+c[d]},ir=function(){var i="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in Ri)i+="|"+e+"\\b";return new RegExp(i+")","gi")}(),Ph=/hsl[a]?\(/,Au=function(e){var t=e.join(" "),n;if(ir.lastIndex=0,ir.test(t))return n=Ph.test(t),e[1]=Rl(e[1],n),e[0]=Rl(e[0],n,Pu(e[1])),!0},rs,Zt=function(){var i=Date.now,e=500,t=33,n=i(),r=n,s=1e3/240,o=s,a=[],l,c,u,d,h,f,g=function p(y){var v=i()-r,b=y===!0,x,w,T,M;if((v>e||v<0)&&(n+=v-t),r+=v,T=r-n,x=T-o,(x>0||b)&&(M=++d.frame,h=T-d.time*1e3,d.time=T=T/1e3,o+=x+(x>=s?4:s-x),w=1),b||(l=c(p)),w)for(f=0;f<a.length;f++)a[f](T,h,M,y)};return d={time:0,frame:0,tick:function(){g(!0)},deltaRatio:function(y){return h/(1e3/(y||60))},wake:function(){au&&(!Qo&&Na()&&(Tn=Qo=window,$a=Tn.document||{},rn.gsap=Gt,(Tn.gsapVersions||(Tn.gsapVersions=[])).push(Gt.version),lu(Ks||Tn.GreenSockGlobals||!Tn.gsap&&Tn||{}),Eu.forEach(Cu)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&d.sleep(),c=u||function(y){return setTimeout(y,o-d.time*1e3+1|0)},rs=1,g(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),rs=0,c=ts},lagSmoothing:function(y,v){e=y||1/0,t=Math.min(v||33,e)},fps:function(y){s=1e3/(y||240),o=d.time*1e3+s},add:function(y,v,b){var x=v?function(w,T,M,k){y(w,T,M,k),d.remove(x)}:y;return d.remove(y),a[b?"unshift":"push"](x),di(),x},remove:function(y,v){~(v=a.indexOf(y))&&a.splice(v,1)&&f>=v&&f--},_listeners:a},d}(),di=function(){return!rs&&Zt.wake()},he={},Ah=/^[\d.\-M][\d.\-,\s]/,Rh=/["']/g,Oh=function(e){for(var t={},n=e.substr(1,e.length-3).split(":"),r=n[0],s=1,o=n.length,a,l,c;s<o;s++)l=n[s],a=s!==o-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),t[r]=isNaN(c)?c.replace(Rh,"").trim():+c,r=l.substr(a+1).trim();return t},Lh=function(e){var t=e.indexOf("(")+1,n=e.indexOf(")"),r=e.indexOf("(",t);return e.substring(t,~r&&r<n?e.indexOf(")",n+1):n)},Dh=function(e){var t=(e+"").split("("),n=he[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf("{")?[Oh(t[1])]:Lh(e).split(",").map(hu)):he._CE&&Ah.test(e)?he._CE("",e):n},zh=function(e){return function(t){return 1-e(1-t)}},Mr=function(e,t){return e&&(He(e)?e:he[e]||Dh(e))||t},Br=function(e,t,n,r){n===void 0&&(n=function(l){return 1-t(1-l)}),r===void 0&&(r=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var s={easeIn:t,easeOut:n,easeInOut:r},o;return Ft(e,function(a){he[a]=rn[a]=s,he[o=a.toLowerCase()]=n;for(var l in s)he[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=he[a+"."+l]=s[l]}),s},Ru=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},Eo=function i(e,t,n){var r=t>=1?t:1,s=(n||(e?.3:.45))/(t<1?t:1),o=s/jo*(Math.asin(1/r)||0),a=function(u){return u===1?1:r*Math.pow(2,-10*u)*sh((u-o)*s)+1},l=e==="out"?a:e==="in"?function(c){return 1-a(1-c)}:Ru(a);return s=jo/s,l.config=function(c,u){return i(e,c,u)},l},Co=function i(e,t){t===void 0&&(t=1.70158);var n=function(o){return o?--o*o*((t+1)*o+t)+1:0},r=e==="out"?n:e==="in"?function(s){return 1-n(1-s)}:Ru(n);return r.config=function(s){return i(e,s)},r};Ft("Linear,Quad,Cubic,Quart,Quint,Strong",function(i,e){var t=e<5?e+1:e;Br(i+",Power"+(t-1),e?function(n){return Math.pow(n,t)}:function(n){return n},function(n){return 1-Math.pow(1-n,t)},function(n){return n<.5?Math.pow(n*2,t)/2:1-Math.pow((1-n)*2,t)/2})});he.Linear.easeNone=he.none=he.Linear.easeIn;Br("Elastic",Eo("in"),Eo("out"),Eo());(function(i,e){var t=1/e,n=2*t,r=2.5*t,s=function(a){return a<t?i*a*a:a<n?i*Math.pow(a-1.5/e,2)+.75:a<r?i*(a-=2.25/e)*a+.9375:i*Math.pow(a-2.625/e,2)+.984375};Br("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);Br("Expo",function(i){return Math.pow(2,10*(i-1))*i+i*i*i*i*i*i*(1-i)});Br("Circ",function(i){return-(ru(1-i*i)-1)});Br("Sine",function(i){return i===1?1:-ih(i*nh)+1});Br("Back",Co("in"),Co("out"),Co());he.SteppedEase=he.steps=rn.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,r=e+(t?0:1),s=t?1:0,o=1-we;return function(a){return((r*us(0,o,a)|0)+s)*n}}};Ji.ease=he["quad.out"];Ft("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(i){return Ya+=i+","+i+"Params,"});var Ou=function(e,t){this.id=rh++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:fu,this.set=t?t.getSetter:Va},is=function(){function i(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,fi(this,+t.duration,1,1),this.data=t.data,De&&(this._ctx=De,De.data.push(this)),rs||Zt.wake()}var e=i.prototype;return e.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},e.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},e.totalDuration=function(n){return arguments.length?(this._dirty=0,fi(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(n,r){if(di(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(_o(this,n),!s._dp||s.parent||mu(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&Mn(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!r||this._initted&&Math.abs(this._zTime)===we||!this._initted&&this._dur&&n||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),du(this,n,r)),this},e.time=function(n,r){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+Ml(this))%(this._dur+this._rDelay)||(n?this._dur:0),r):this._time},e.totalProgress=function(n,r){return arguments.length?this.totalTime(this.totalDuration()*n,r):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(n,r){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+Ml(this),r):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(n,r){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,r):this._repeat?ui(this._tTime,s)+1:1},e.timeScale=function(n,r){if(!arguments.length)return this._rts===-we?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?eo(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-we?0:this._rts,this.totalTime(us(-Math.abs(this._delay),this.totalDuration(),s),r!==!1),mo(this),gh(this)},e.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(di(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==we&&(this._tTime-=we)))),this):this._ps},e.startTime=function(n){if(arguments.length){this._start=$e(n);var r=this.parent||this._dp;return r&&(r._sort||!this.parent)&&Mn(r,this,this._start-this._delay),this}return this._start},e.endTime=function(n){return this._start+(It(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(n){var r=this.parent||this._dp;return r?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?eo(r.rawTime(n),this):this._tTime:this._tTime},e.revert=function(n){n===void 0&&(n=fh);var r=pt;return pt=n,Xa(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),pt=r,this},e.globalTime=function(n){for(var r=this,s=arguments.length?n:r.rawTime();r;)s=r._start+s/(Math.abs(r._ts)||1),r=r._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},e.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,Pl(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(n){if(arguments.length){var r=this._time;return this._rDelay=n,Pl(this),r?this.time(r):this}return this._rDelay},e.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},e.seek=function(n,r){return this.totalTime(fn(this,n),It(r))},e.restart=function(n,r){return this.play().totalTime(n?-this._delay:0,It(r)),this._dur||(this._zTime=-we),this},e.play=function(n,r){return n!=null&&this.seek(n,r),this.reversed(!1).paused(!1)},e.reverse=function(n,r){return n!=null&&this.seek(n||this.totalDuration(),r),this.reversed(!0).paused(!1)},e.pause=function(n,r){return n!=null&&this.seek(n,r),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-we:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-we,this},e.isActive=function(){var n=this.parent||this._dp,r=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=r&&s<this.endTime(!0)-we)},e.eventCallback=function(n,r,s){var o=this.vars;return arguments.length>1?(r?(o[n]=r,s&&(o[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=r)):delete o[n],this):o[n]},e.then=function(n){var r=this,s=r._prom;return new Promise(function(o){var a=He(n)?n:pu,l=function(){var u=r.then;r.then=null,s&&s(),He(a)&&(a=a(r))&&(a.then||a===r)&&(r.then=u),o(a),r.then=u};r._initted&&r.totalProgress()===1&&r._ts>=0||!r._tTime&&r._ts<0?l():r._prom=l})},e.kill=function(){Ai(this)},i}();sn(is.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-we,_prom:0,_ps:!1,_rts:1});var zt=function(i){nu(e,i);function e(n,r){var s;return n===void 0&&(n={}),s=i.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=It(n.sortChildren),Be&&Mn(n.parent||Be,$n(s),r),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&_u($n(s),n.scrollTrigger),s}var t=e.prototype;return t.to=function(r,s,o){return Bi(0,arguments,this),this},t.from=function(r,s,o){return Bi(1,arguments,this),this},t.fromTo=function(r,s,o,a){return Bi(2,arguments,this),this},t.set=function(r,s,o){return s.duration=0,s.parent=this,$i(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new Qe(r,s,fn(this,o),1),this},t.call=function(r,s,o){return Mn(this,Qe.delayedCall(0,r,s),o)},t.staggerTo=function(r,s,o,a,l,c,u){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=c,o.onCompleteParams=u,o.parent=this,new Qe(r,o,fn(this,l)),this},t.staggerFrom=function(r,s,o,a,l,c,u){return o.runBackwards=1,$i(o).immediateRender=It(o.immediateRender),this.staggerTo(r,s,o,a,l,c,u)},t.staggerFromTo=function(r,s,o,a,l,c,u,d){return a.startAt=o,$i(a).immediateRender=It(a.immediateRender),this.staggerTo(r,s,a,l,c,u,d)},t.render=function(r,s,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=r<=0?0:$e(r),d=this._zTime<0!=r<0&&(this._initted||!c),h,f,g,p,y,v,b,x,w,T,M,k;if(this!==Be&&u>l&&r>=0&&(u=l),u!==this._tTime||o||d){if(a!==this._time&&c&&(u+=this._time-a,r+=this._time-a),h=u,w=this._start,x=this._ts,v=!x,d&&(c||(a=this._zTime),(r||!s)&&(this._zTime=r)),this._repeat){if(M=this._yoyo,y=c+this._rDelay,this._repeat<-1&&r<0)return this.totalTime(y*100+r,s,o);if(h=$e(u%y),u===l?(p=this._repeat,h=c):(T=$e(u/y),p=~~T,p&&p===T&&(h=c,p--),h>c&&(h=c)),T=ui(this._tTime,y),!a&&this._tTime&&T!==p&&this._tTime-T*y-this._dur<=0&&(T=p),M&&p&1&&(h=c-h,k=1),p!==T&&!this._lock){var R=M&&T&1,C=R===(M&&p&1);if(p<T&&(R=!R),a=R?0:u%c?c:u,this._lock=1,this.render(a||(k?0:$e(p*y)),s,!c)._lock=0,this._tTime=u,!s&&this.parent&&en(this,"onRepeat"),this.vars.repeatRefresh&&!k&&(this.invalidate()._lock=1,T=p),a&&a!==this._time||v!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,C&&(this._lock=2,a=R?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!k&&this.invalidate()),this._lock=0,!this._ts&&!v)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(b=bh(this,$e(a),$e(h)),b&&(u-=h-(h=b._start))),this._tTime=u,this._time=h,this._act=!!x,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=r,a=0),!a&&u&&c&&!s&&!T&&(en(this,"onStart"),this._tTime!==u))return this;if(h>=a&&r>=0)for(f=this._first;f;){if(g=f._next,(f._act||h>=f._start)&&f._ts&&b!==f){if(f.parent!==this)return this.render(r,s,o);if(f.render(f._ts>0?(h-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(h-f._start)*f._ts,s,o),h!==this._time||!this._ts&&!v){b=0,g&&(u+=this._zTime=-we);break}}f=g}else{f=this._last;for(var P=r<0?r:h;f;){if(g=f._prev,(f._act||P<=f._end)&&f._ts&&b!==f){if(f.parent!==this)return this.render(r,s,o);if(f.render(f._ts>0?(P-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(P-f._start)*f._ts,s,o||pt&&Xa(f)),h!==this._time||!this._ts&&!v){b=0,g&&(u+=this._zTime=P?-we:we);break}}f=g}}if(b&&!s&&(this.pause(),b.render(h>=a?0:-we)._zTime=h>=a?1:-1,this._ts))return this._start=w,mo(this),this.render(r,s,o);this._onUpdate&&!s&&en(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&a)&&(w===this._start||Math.abs(x)!==Math.abs(this._ts))&&(this._lock||((r||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&or(this,1),!s&&!(r<0&&!a)&&(u||a||!l)&&(en(this,u===l&&r>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(r,s){var o=this;if(Wn(s)||(s=fn(this,s,r)),!(r instanceof is)){if(St(r))return r.forEach(function(a){return o.add(a,s)}),this;if(ot(r))return this.addLabel(r,s);if(He(r))r=Qe.delayedCall(0,r);else return this}return this!==r?Mn(this,r,s):this},t.getChildren=function(r,s,o,a){r===void 0&&(r=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-pn);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof Qe?s&&l.push(c):(o&&l.push(c),r&&l.push.apply(l,c.getChildren(!0,s,o)))),c=c._next;return l},t.getById=function(r){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===r)return s[o]},t.remove=function(r){return ot(r)?this.removeLabel(r):He(r)?this.killTweensOf(r):(r.parent===this&&go(this,r),r===this._recent&&(this._recent=this._last),Cr(this))},t.totalTime=function(r,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=$e(Zt.time-(this._ts>0?r/this._ts:(this.totalDuration()-r)/-this._ts))),i.prototype.totalTime.call(this,r,s),this._forcing=0,this):this._tTime},t.addLabel=function(r,s){return this.labels[r]=fn(this,s),this},t.removeLabel=function(r){return delete this.labels[r],this},t.addPause=function(r,s,o){var a=Qe.delayedCall(0,s||ts,o);return a.data="isPause",this._hasPause=1,Mn(this,a,fn(this,r))},t.removePause=function(r){var s=this._first;for(r=fn(this,r);s;)s._start===r&&s.data==="isPause"&&or(s),s=s._next},t.killTweensOf=function(r,s,o){for(var a=this.getTweensOf(r,o),l=a.length;l--;)Kn!==a[l]&&a[l].kill(r,s);return this},t.getTweensOf=function(r,s){for(var o=[],a=gn(r),l=this._first,c=Wn(s),u;l;)l instanceof Qe?dh(l._targets,a)&&(c?(!Kn||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&o.push(l):(u=l.getTweensOf(a,s)).length&&o.push.apply(o,u),l=l._next;return o},t.tweenTo=function(r,s){s=s||{};var o=this,a=fn(o,r),l=s,c=l.startAt,u=l.onStart,d=l.onStartParams,h=l.immediateRender,f,g=Qe.to(o,sn({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale())||we,onStart:function(){if(o.pause(),!f){var y=s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale());g._dur!==y&&fi(g,y,0,1).render(g._time,!0,!0),f=1}u&&u.apply(g,d||[])}},s));return h?g.render(0):g},t.tweenFromTo=function(r,s,o){return this.tweenTo(s,sn({startAt:{time:fn(this,r)}},o))},t.recent=function(){return this._recent},t.nextLabel=function(r){return r===void 0&&(r=this._time),Al(this,fn(this,r))},t.previousLabel=function(r){return r===void 0&&(r=this._time),Al(this,fn(this,r),1)},t.currentLabel=function(r){return arguments.length?this.seek(r,!0):this.previousLabel(this._time+we)},t.shiftChildren=function(r,s,o){o===void 0&&(o=0);var a=this._first,l=this.labels,c;for(r=$e(r);a;)a._start>=o&&(a._start+=r,a._end+=r),a=a._next;if(s)for(c in l)l[c]>=o&&(l[c]+=r);return Cr(this)},t.invalidate=function(r){var s=this._first;for(this._lock=0;s;)s.invalidate(r),s=s._next;return i.prototype.invalidate.call(this,r)},t.clear=function(r){r===void 0&&(r=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),r&&(this.labels={}),Cr(this)},t.totalDuration=function(r){var s=0,o=this,a=o._last,l=pn,c,u,d;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-r:r));if(o._dirty){for(d=o.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),u=a._start,u>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,Mn(o,a,u-a._delay,1)._lock=0):l=u,u<0&&a._ts&&(s-=u,(!d&&!o._dp||d&&d.smoothChildTiming)&&(o._start+=$e(u/o._ts),o._time-=u,o._tTime-=u),o.shiftChildren(-u,!1,-1/0),l=0),a._end>s&&a._ts&&(s=a._end),a=c;fi(o,o===Be&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},e.updateRoot=function(r){if(Be._ts&&(du(Be,eo(r,Be)),uu=Zt.frame),Zt.frame>=El){El+=nn.autoSleep||120;var s=Be._first;if((!s||!s._ts)&&nn.autoSleep&&Zt._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||Zt.sleep()}}},e}(is);sn(zt.prototype,{_lock:0,_hasPause:0,_forcing:0});var Ih=function(e,t,n,r,s,o,a){var l=new Nt(this._pt,e,t,0,1,Nu,null,s),c=0,u=0,d,h,f,g,p,y,v,b;for(l.b=n,l.e=r,n+="",r+="",(v=~r.indexOf("random("))&&(r=ns(r)),o&&(b=[n,r],o(b,e,t),n=b[0],r=b[1]),h=n.match(So)||[];d=So.exec(r);)g=d[0],p=r.substring(c,d.index),f?f=(f+1)%5:p.substr(-5)==="rgba("&&(f=1),g!==h[u++]&&(y=parseFloat(h[u-1])||0,l._pt={_next:l._pt,p:p||u===1?p:",",s:y,c:g.charAt(1)==="="?ti(y,g)-y:parseFloat(g)-y,m:f&&f<4?Math.round:0},c=So.lastIndex);return l.c=c<r.length?r.substring(c,r.length):"",l.fp=a,(ou.test(r)||v)&&(l.e=0),this._pt=l,l},Wa=function(e,t,n,r,s,o,a,l,c,u){He(r)&&(r=r(s||0,e,o));var d=e[t],h=n!=="get"?n:He(d)?c?e[t.indexOf("set")||!He(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():d,f=He(d)?c?Gh:Iu:Ua,g;if(ot(r)&&(~r.indexOf("random(")&&(r=ns(r)),r.charAt(1)==="="&&(g=ti(h,r)+(xt(h)||0),(g||g===0)&&(r=g))),!u||h!==r||ra)return!isNaN(h*r)&&r!==""?(g=new Nt(this._pt,e,t,+h||0,r-(h||0),typeof d=="boolean"?Hh:Fu,0,f),c&&(g.fp=c),a&&g.modifier(a,this,e),this._pt=g):(!d&&!(t in e)&&Ba(t,r),Ih.call(this,e,t,h,r,f,l||nn.stringFilter,c))},Fh=function(e,t,n,r,s){if(He(e)&&(e=Gi(e,s,t,n,r)),!Dn(e)||e.style&&e.nodeType||St(e)||iu(e))return ot(e)?Gi(e,s,t,n,r):e;var o={},a;for(a in e)o[a]=Gi(e[a],s,t,n,r);return o},Lu=function(e,t,n,r,s,o){var a,l,c,u;if(Vt[e]&&(a=new Vt[e]).init(s,a.rawVars?t[e]:Fh(t[e],r,s,o,n),n,r,o)!==!1&&(n._pt=l=new Nt(n._pt,s,e,0,1,a.render,a,0,a.priority),n!==Zr))for(c=n._ptLookup[n._targets.indexOf(s)],u=a._props.length;u--;)c[a._props[u]]=l;return a},Kn,ra,qa=function i(e,t,n){var r=e.vars,s=r.ease,o=r.startAt,a=r.immediateRender,l=r.lazy,c=r.onUpdate,u=r.runBackwards,d=r.yoyoEase,h=r.keyframes,f=r.autoRevert,g=e._dur,p=e._startAt,y=e._targets,v=e.parent,b=v&&v.data==="nested"?v.vars.targets:y,x=e._overwrite==="auto"&&!Ia,w=e.timeline,T=r.easeReverse||d,M,k,R,C,P,B,m,z,I,X,$,F,O;if(w&&(!h||!s)&&(s="none"),e._ease=Mr(s,Ji.ease),e._rEase=T&&(Mr(T)||e._ease),e._from=!w&&!!r.runBackwards,e._from&&(e.ratio=1),!w||h&&!r.stagger){if(z=y[0]?Er(y[0]).harness:0,F=z&&r[z.prop],M=Js(r,Ga),p&&(p._zTime<0&&p.progress(1),t<0&&u&&a&&!f?p.render(-1,!0):p.revert(u&&g?Is:uh),p._lazy=0),o){if(or(e._startAt=Qe.set(y,sn({data:"isStart",overwrite:!1,parent:v,immediateRender:!0,lazy:!p&&It(l),startAt:null,delay:0,onUpdate:c&&function(){return en(e,"onUpdate")},stagger:0},o))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(pt||!a&&!f)&&e._startAt.revert(Is),a&&g&&t<=0&&n<=0){t&&(e._zTime=t);return}}else if(u&&g&&!p){if(t&&(a=!1),R=sn({overwrite:!1,data:"isFromStart",lazy:a&&!p&&It(l),immediateRender:a,stagger:0,parent:v},M),F&&(R[z.prop]=F),or(e._startAt=Qe.set(y,R)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(pt?e._startAt.revert(Is):e._startAt.render(-1,!0)),e._zTime=t,!a)i(e._startAt,we,we);else if(!t)return}for(e._pt=e._ptCache=0,l=g&&It(l)||l&&!g,k=0;k<y.length;k++){if(P=y[k],m=P._gsap||Ha(y)[k]._gsap,e._ptLookup[k]=X={},Ko[m.id]&&rr.length&&Zs(),$=b===y?k:b.indexOf(P),z&&(I=new z).init(P,F||M,e,$,b)!==!1&&(e._pt=C=new Nt(e._pt,P,I.name,0,1,I.render,I,0,I.priority),I._props.forEach(function(L){X[L]=C}),I.priority&&(B=1)),!z||F)for(R in M)Vt[R]&&(I=Lu(R,M,e,$,P,b))?I.priority&&(B=1):X[R]=C=Wa.call(e,P,R,"get",M[R],$,b,0,r.stringFilter);e._op&&e._op[k]&&e.kill(P,e._op[k]),x&&e._pt&&(Kn=e,Be.killTweensOf(P,X,e.globalTime(t)),O=!e.parent,Kn=0),e._pt&&l&&(Ko[m.id]=1)}B&&$u(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!O,h&&t<=0&&w.render(pn,!0,!0)},Nh=function(e,t,n,r,s,o,a,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],u,d,h,f;if(!c)for(c=e._ptCache[t]=[],h=e._ptLookup,f=e._targets.length;f--;){if(u=h[f][t],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==t&&u.fp!==t;)u=u._next;if(!u)return ra=1,e.vars[t]="+=0",qa(e,a),ra=0,l?es(t+" not eligible for reset. Try splitting into individual properties"):1;c.push(u)}for(f=c.length;f--;)d=c[f],u=d._pt||d,u.s=(r||r===0)&&!s?r:u.s+(r||0)+o*u.c,u.c=n-u.s,d.e&&(d.e=We(n)+xt(d.e)),d.b&&(d.b=u.s+xt(d.b))},$h=function(e,t){var n=e[0]?Er(e[0]).harness:0,r=n&&n.aliases,s,o,a,l;if(!r)return t;s=ci({},t);for(o in r)if(o in s)for(l=r[o].split(","),a=l.length;a--;)s[l[a]]=s[o];return s},Bh=function(e,t,n,r){var s=t.ease||r||"power1.inOut",o,a;if(St(t))a=n[e]||(n[e]=[]),t.forEach(function(l,c){return a.push({t:c/(t.length-1)*100,v:l,e:s})});else for(o in t)a=n[o]||(n[o]=[]),o==="ease"||a.push({t:parseFloat(e),v:t[o],e:s})},Gi=function(e,t,n,r,s){return He(e)?e.call(t,n,r,s):ot(e)&&~e.indexOf("random(")?ns(e):e},Du=Ya+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",zu={};Ft(Du+",id,stagger,delay,duration,paused,scrollTrigger",function(i){return zu[i]=1});var Qe=function(i){nu(e,i);function e(n,r,s,o){var a;typeof r=="number"&&(s.duration=r,r=s,s=null),a=i.call(this,o?r:$i(r))||this;var l=a.vars,c=l.duration,u=l.delay,d=l.immediateRender,h=l.stagger,f=l.overwrite,g=l.keyframes,p=l.defaults,y=l.scrollTrigger,v=r.parent||Be,b=(St(n)||iu(n)?Wn(n[0]):"length"in r)?[n]:gn(n),x,w,T,M,k,R,C,P;if(a._targets=b.length?Ha(b):es("GSAP target "+n+" not found. https://gsap.com",!nn.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=f,g||h||ps(c)||ps(u)){r=a.vars;var B=r.easeReverse||r.yoyoEase;if(x=a.timeline=new zt({data:"nested",defaults:p||{},targets:v&&v.data==="nested"?v.vars.targets:b}),x.kill(),x.parent=x._dp=$n(a),x._start=0,h||ps(c)||ps(u)){if(M=b.length,C=h&&xu(h),Dn(h))for(k in h)~Du.indexOf(k)&&(P||(P={}),P[k]=h[k]);for(w=0;w<M;w++)T=Js(r,zu),T.stagger=0,B&&(T.easeReverse=B),P&&ci(T,P),R=b[w],T.duration=+Gi(c,$n(a),w,R,b),T.delay=(+Gi(u,$n(a),w,R,b)||0)-a._delay,!h&&M===1&&T.delay&&(a._delay=u=T.delay,a._start+=u,T.delay=0),x.to(R,T,C?C(w,R,b):0),x._ease=he.none;x.duration()?c=u=0:a.timeline=0}else if(g){$i(sn(x.vars.defaults,{ease:"none"})),x._ease=Mr(g.ease||r.ease||"none");var m=0,z,I,X;if(St(g))g.forEach(function($){return x.to(b,$,">")}),x.duration();else{T={};for(k in g)k==="ease"||k==="easeEach"||Bh(k,g[k],T,g.easeEach);for(k in T)for(z=T[k].sort(function($,F){return $.t-F.t}),m=0,w=0;w<z.length;w++)I=z[w],X={ease:I.e,duration:(I.t-(w?z[w-1].t:0))/100*c},X[k]=I.v,x.to(b,X,m),m+=X.duration;x.duration()<c&&x.to({},{duration:c-x.duration()})}}c||a.duration(c=x.duration())}else a.timeline=0;return f===!0&&!Ia&&(Kn=$n(a),Be.killTweensOf(b),Kn=0),Mn(v,$n(a),s),r.reversed&&a.reverse(),r.paused&&a.paused(!0),(d||!c&&!g&&a._start===$e(v._time)&&It(d)&&mh($n(a))&&v.data!=="nested")&&(a._tTime=-we,a.render(Math.max(0,-u)||0)),y&&_u($n(a),y),a}var t=e.prototype;return t.render=function(r,s,o){var a=this._time,l=this._tDur,c=this._dur,u=r<0,d=r>l-we&&!u?l:r<we?0:r,h,f,g,p,y,v,b,x;if(!c)yh(this,r,s,o);else if(d!==this._tTime||!r||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(h=d,x=this.timeline,this._repeat){if(p=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(p*100+r,s,o);if(h=$e(d%p),d===l?(g=this._repeat,h=c):(y=$e(d/p),g=~~y,g&&g===y?(h=c,g--):h>c&&(h=c)),v=this._yoyo&&g&1,v&&(h=c-h),y=ui(this._tTime,p),h===a&&!o&&this._initted&&g===y)return this._tTime=d,this;g!==y&&this.vars.repeatRefresh&&!v&&!this._lock&&h!==p&&this._initted&&(this._lock=o=1,this.render($e(p*g),!0).invalidate()._lock=0)}if(!this._initted){if(yu(this,u?r:h,o,s,d))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&g!==y))return this;if(c!==this._dur)return this.render(r,s,o)}if(this._rEase){var w=h<a;if(w!==this._inv){var T=w?a:c-a;this._inv=w,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=a,this._invRecip=T?(w?-1:1)/T:0,this._invScale=w?-this.ratio:1-this.ratio,this._invEase=w?this._rEase:this._ease}this.ratio=b=this._invRatio+this._invScale*this._invEase((h-this._invTime)*this._invRecip)}else this.ratio=b=this._ease(h/c);if(this._from&&(this.ratio=b=1-b),this._tTime=d,this._time=h,!this._act&&this._ts&&(this._act=1,this._lazy=0),!a&&d&&!s&&!y&&(en(this,"onStart"),this._tTime!==d))return this;for(f=this._pt;f;)f.r(b,f.d),f=f._next;x&&x.render(r<0?r:x._dur*x._ease(h/this._dur),s,o)||this._startAt&&(this._zTime=r),this._onUpdate&&!s&&(u&&Zo(this,r,s,o),en(this,"onUpdate")),this._repeat&&g!==y&&this.vars.onRepeat&&!s&&this.parent&&en(this,"onRepeat"),(d===this._tDur||!d)&&this._tTime===d&&(u&&!this._onUpdate&&Zo(this,r,!0,!0),(r||!c)&&(d===this._tDur&&this._ts>0||!d&&this._ts<0)&&or(this,1),!s&&!(u&&!a)&&(d||a||v)&&(en(this,d===l?"onComplete":"onReverseComplete",!0),this._prom&&!(d<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(r){return(!r||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(r),i.prototype.invalidate.call(this,r)},t.resetTo=function(r,s,o,a,l){rs||Zt.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||qa(this,c),u=this._ease(c/this._dur),Nh(this,r,s,o,a,u,c,l)?this.resetTo(r,s,o,a,1):(_o(this,0),this.parent||gu(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(r,s){if(s===void 0&&(s="all"),!r&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?Ai(this):this.scrollTrigger&&this.scrollTrigger.kill(!!pt),this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(r,s,Kn&&Kn.vars.overwrite!==!0)._first||Ai(this),this.parent&&o!==this.timeline.totalDuration()&&fi(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=r?gn(r):a,c=this._ptLookup,u=this._pt,d,h,f,g,p,y,v;if((!s||s==="all")&&ph(a,l))return s==="all"&&(this._pt=0),Ai(this);for(d=this._op=this._op||[],s!=="all"&&(ot(s)&&(p={},Ft(s,function(b){return p[b]=1}),s=p),s=$h(a,s)),v=a.length;v--;)if(~l.indexOf(a[v])){h=c[v],s==="all"?(d[v]=s,g=h,f={}):(f=d[v]=d[v]||{},g=s);for(p in g)y=h&&h[p],y&&((!("kill"in y.d)||y.d.kill(p)===!0)&&go(this,y,"_pt"),delete h[p]),f!=="all"&&(f[p]=1)}return this._initted&&!this._pt&&u&&Ai(this),this},e.to=function(r,s){return new e(r,s,arguments[2])},e.from=function(r,s){return Bi(1,arguments)},e.delayedCall=function(r,s,o,a){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:r,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},e.fromTo=function(r,s,o){return Bi(2,arguments)},e.set=function(r,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(r,s)},e.killTweensOf=function(r,s,o){return Be.killTweensOf(r,s,o)},e}(is);sn(Qe.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});Ft("staggerTo,staggerFrom,staggerFromTo",function(i){Qe[i]=function(){var e=new zt,t=ea.call(arguments,0);return t.splice(i==="staggerFromTo"?5:4,0,0),e[i].apply(e,t)}});var Ua=function(e,t,n){return e[t]=n},Iu=function(e,t,n){return e[t](n)},Gh=function(e,t,n,r){return e[t](r.fp,n)},Yh=function(e,t,n){return e.setAttribute(t,n)},Va=function(e,t){return He(e[t])?Iu:Fa(e[t])&&e.setAttribute?Yh:Ua},Fu=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},Hh=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},Nu=function(e,t){var n=t._pt,r="";if(!e&&t.b)r=t.b;else if(e===1&&t.e)r=t.e;else{for(;n;)r=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+r,n=n._next;r+=t.c}t.set(t.t,t.p,r,t)},ja=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},Xh=function(e,t,n,r){for(var s=this._pt,o;s;)o=s._next,s.p===r&&s.modifier(e,t,n),s=o},Wh=function(e){for(var t=this._pt,n,r;t;)r=t._next,t.p===e&&!t.op||t.op===e?go(this,t,"_pt"):t.dep||(n=1),t=r;return!n},qh=function(e,t,n,r){r.mSet(e,t,r.m.call(r.tween,n,r.mt),r)},$u=function(e){for(var t=e._pt,n,r,s,o;t;){for(n=t._next,r=s;r&&r.pr>t.pr;)r=r._next;(t._prev=r?r._prev:o)?t._prev._next=t:s=t,(t._next=r)?r._prev=t:o=t,t=n}e._pt=s},Nt=function(){function i(t,n,r,s,o,a,l,c,u){this.t=n,this.s=s,this.c=o,this.p=r,this.r=a||Fu,this.d=l||this,this.set=c||Ua,this.pr=u||0,this._next=t,t&&(t._prev=this)}var e=i.prototype;return e.modifier=function(n,r,s){this.mSet=this.mSet||this.set,this.set=qh,this.m=n,this.mt=s,this.tween=r},i}();Ft(Ya+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(i){return Ga[i]=1});rn.TweenMax=rn.TweenLite=Qe;rn.TimelineLite=rn.TimelineMax=zt;Be=new zt({sortChildren:!1,defaults:Ji,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});nn.stringFilter=Au;var Pr=[],Ns={},Uh=[],Ol=0,Vh=0,Mo=function(e){return(Ns[e]||Uh).map(function(t){return t()})},ia=function(){var e=Date.now(),t=[];e-Ol>2&&(Mo("matchMediaInit"),Pr.forEach(function(n){var r=n.queries,s=n.conditions,o,a,l,c;for(a in r)o=Tn.matchMedia(r[a]).matches,o&&(l=1),o!==s[a]&&(s[a]=o,c=1);c&&(n.revert(),l&&t.push(n))}),Mo("matchMediaRevert"),t.forEach(function(n){return n.onMatch(n,function(r){return n.add(null,r)})}),Ol=e,Mo("matchMedia"))},Bu=function(){function i(t,n){this.selector=n&&ta(n),this.data=[],this._r=[],this.isReverted=!1,this.id=Vh++,t&&this.add(t)}var e=i.prototype;return e.add=function(n,r,s){He(n)&&(s=r,r=n,n=He);var o=this,a=function(){var c=De,u=o.selector,d;return c&&c!==o&&c.data.push(o),s&&(o.selector=ta(s)),De=o,d=r.apply(o,arguments),He(d)&&o._r.push(d),De=c,o.selector=u,o.isReverted=!1,d};return o.last=a,n===He?a(o,function(l){return o.add(null,l)}):n?o[n]=a:a},e.ignore=function(n){var r=De;De=null,n(this),De=r},e.getTweens=function(){var n=[];return this.data.forEach(function(r){return r instanceof i?n.push.apply(n,r.getTweens()):r instanceof Qe&&!(r.parent&&r.parent.data==="nested")&&n.push(r)}),n},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(n,r){var s=this;if(n?function(){for(var a=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return a.splice(a.indexOf(u),1)}));for(a.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,d){return d.g-u.g||-1/0}).forEach(function(u){return u.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof zt?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof Qe)&&c.revert&&c.revert(n);s._r.forEach(function(u){return u(n,s)}),s.isReverted=!0}():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),r)for(var o=Pr.length;o--;)Pr[o].id===this.id&&Pr.splice(o,1)},e.revert=function(n){this.kill(n||{})},i}(),jh=function(){function i(t){this.contexts=[],this.scope=t,De&&De.data.push(this)}var e=i.prototype;return e.add=function(n,r,s){Dn(n)||(n={matches:n});var o=new Bu(0,s||this.scope),a=o.conditions={},l,c,u;De&&!o.selector&&(o.selector=De.selector),this.contexts.push(o),r=o.add("onMatch",r),o.queries=n;for(c in n)c==="all"?u=1:(l=Tn.matchMedia(n[c]),l&&(Pr.indexOf(o)<0&&Pr.push(o),(a[c]=l.matches)&&(u=1),l.addListener?l.addListener(ia):l.addEventListener("change",ia)));return u&&r(o,function(d){return o.add(null,d)}),this},e.revert=function(n){this.kill(n||{})},e.kill=function(n){this.contexts.forEach(function(r){return r.kill(n,!0)})},i}(),to={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(r){return Cu(r)})},timeline:function(e){return new zt(e)},getTweensOf:function(e,t){return Be.getTweensOf(e,t)},getProperty:function(e,t,n,r){ot(e)&&(e=gn(e)[0]);var s=Er(e||{}).get,o=n?pu:hu;return n==="native"&&(n=""),e&&(t?o((Vt[t]&&Vt[t].get||s)(e,t,n,r)):function(a,l,c){return o((Vt[a]&&Vt[a].get||s)(e,a,l,c))})},quickSetter:function(e,t,n){if(e=gn(e),e.length>1){var r=e.map(function(u){return Gt.quickSetter(u,t,n)}),s=r.length;return function(u){for(var d=s;d--;)r[d](u)}}e=e[0]||{};var o=Vt[t],a=Er(e),l=a.harness&&(a.harness.aliases||{})[t]||t,c=o?function(u){var d=new o;Zr._pt=0,d.init(e,n?u+n:u,Zr,0,[e]),d.render(1,d),Zr._pt&&ja(1,Zr)}:a.set(e,l);return o?c:function(u){return c(e,l,n?u+n:u,a,1)}},quickTo:function(e,t,n){var r,s=Gt.to(e,sn((r={},r[t]="+=0.1",r.paused=!0,r.stagger=0,r),n||{})),o=function(l,c,u){return s.resetTo(t,l,c,u)};return o.tween=s,o},isTweening:function(e){return Be.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=Mr(e.ease,Ji.ease)),Cl(Ji,e||{})},config:function(e){return Cl(nn,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,r=e.plugins,s=e.defaults,o=e.extendTimeline;(r||"").split(",").forEach(function(a){return a&&!Vt[a]&&!rn[a]&&es(t+" effect requires "+a+" plugin.")}),ko[t]=function(a,l,c){return n(gn(a),sn(l||{},s),c)},o&&(zt.prototype[t]=function(a,l,c){return this.add(ko[t](a,Dn(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){he[e]=Mr(t)},parseEase:function(e,t){return arguments.length?Mr(e,t):he},getById:function(e){return Be.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new zt(e),r,s;for(n.smoothChildTiming=It(e.smoothChildTiming),Be.remove(n),n._dp=0,n._time=n._tTime=Be._time,r=Be._first;r;)s=r._next,(t||!(!r._dur&&r instanceof Qe&&r.vars.onComplete===r._targets[0]))&&Mn(n,r,r._start-r._delay),r=s;return Mn(Be,n,0),n},context:function(e,t){return e?new Bu(e,t):De},matchMedia:function(e){return new jh(e)},matchMediaRefresh:function(){return Pr.forEach(function(e){var t=e.conditions,n,r;for(r in t)t[r]&&(t[r]=!1,n=1);n&&e.revert()})||ia()},addEventListener:function(e,t){var n=Ns[e]||(Ns[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=Ns[e],r=n&&n.indexOf(t);r>=0&&n.splice(r,1)},utils:{wrap:Eh,wrapYoyo:Ch,distribute:xu,random:Su,snap:wu,normalize:Th,getUnit:xt,clamp:xh,splitColor:Mu,toArray:gn,selector:ta,mapRange:Tu,pipe:Sh,unitize:kh,interpolate:Mh,shuffle:vu},install:lu,effects:ko,ticker:Zt,updateRoot:zt.updateRoot,plugins:Vt,globalTimeline:Be,core:{PropTween:Nt,globals:cu,Tween:Qe,Timeline:zt,Animation:is,getCache:Er,_removeLinkedListItem:go,reverting:function(){return pt},context:function(e){return e&&De&&(De.data.push(e),e._ctx=De),De},suppressOverwrites:function(e){return Ia=e}}};Ft("to,from,fromTo,delayedCall,set,killTweensOf",function(i){return to[i]=Qe[i]});Zt.add(zt.updateRoot);Zr=to.to({},{duration:0});var Qh=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},Kh=function(e,t){var n=e._targets,r,s,o;for(r in t)for(s=n.length;s--;)o=e._ptLookup[s][r],o&&(o=o.d)&&(o._pt&&(o=Qh(o,r)),o&&o.modifier&&o.modifier(t[r],e,n[s],r))},Po=function(e,t){return{name:e,headless:1,rawVars:1,init:function(r,s,o){o._onInit=function(a){var l,c;if(ot(s)&&(l={},Ft(s,function(u){return l[u]=1}),s=l),t){l={};for(c in s)l[c]=t(s[c]);s=l}Kh(a,s)}}}},Gt=to.registerPlugin({name:"attr",init:function(e,t,n,r,s){var o,a,l;this.tween=n;for(o in t)l=e.getAttribute(o)||"",a=this.add(e,"setAttribute",(l||0)+"",t[o],r,s,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(e,t){for(var n=t._pt;n;)pt?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:"endArray",headless:1,init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},Po("roundProps",na),Po("modifiers"),Po("snap",wu))||to;Qe.version=zt.version=Gt.version="3.15.0";au=1;Na()&&di();he.Power0;he.Power1;he.Power2;he.Power3;he.Power4;he.Linear;he.Quad;he.Cubic;he.Quart;he.Quint;he.Strong;he.Elastic;he.Back;he.SteppedEase;he.Bounce;he.Sine;he.Expo;he.Circ;/*!
 * CSSPlugin 3.15.0
 * https://gsap.com
 *
 * Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Ll,Zn,ni,Qa,wr,Dl,Ka,Zh=function(){return typeof window<"u"},qn={},yr=180/Math.PI,ri=Math.PI/180,Yr=Math.atan2,zl=1e8,Za=/([A-Z])/g,Jh=/(left|right|width|margin|padding|x)/i,ep=/[\s,\(]\S/,Pn={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},sa=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},tp=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},np=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},rp=function(e,t){return t.set(t.t,t.p,e===1?t.e:e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},ip=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},Gu=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},Yu=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},sp=function(e,t,n){return e.style[t]=n},op=function(e,t,n){return e.style.setProperty(t,n)},ap=function(e,t,n){return e._gsap[t]=n},lp=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},cp=function(e,t,n,r,s){var o=e._gsap;o.scaleX=o.scaleY=n,o.renderTransform(s,o)},up=function(e,t,n,r,s){var o=e._gsap;o[t]=n,o.renderTransform(s,o)},Ge="transform",$t=Ge+"Origin",fp=function i(e,t){var n=this,r=this.target,s=r.style,o=r._gsap;if(e in qn&&s){if(this.tfm=this.tfm||{},e!=="transform")e=Pn[e]||e,~e.indexOf(",")?e.split(",").forEach(function(a){return n.tfm[a]=Bn(r,a)}):this.tfm[e]=o.x?o[e]:Bn(r,e),e===$t&&(this.tfm.zOrigin=o.zOrigin);else return Pn.transform.split(",").forEach(function(a){return i.call(n,a,t)});if(this.props.indexOf(Ge)>=0)return;o.svg&&(this.svgo=r.getAttribute("data-svg-origin"),this.props.push($t,t,"")),e=Ge}(s||t)&&this.props.push(e,t,s[e])},Hu=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},dp=function(){var e=this.props,t=this.target,n=t.style,r=t._gsap,s,o;for(s=0;s<e.length;s+=3)e[s+1]?e[s+1]===2?t[e[s]](e[s+2]):t[e[s]]=e[s+2]:e[s+2]?n[e[s]]=e[s+2]:n.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(Za,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)r[o]=this.tfm[o];r.svg&&(r.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),s=Ka(),(!s||!s.isStart)&&!n[Ge]&&(Hu(n),r.zOrigin&&n[$t]&&(n[$t]+=" "+r.zOrigin+"px",r.zOrigin=0,r.renderTransform()),r.uncache=1)}},Xu=function(e,t){var n={target:e,props:[],revert:dp,save:fp};return e._gsap||Gt.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(r){return n.save(r)}),n},Wu,oa=function(e,t){var n=Zn.createElementNS?Zn.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):Zn.createElement(e);return n&&n.style?n:Zn.createElement(e)},tn=function i(e,t,n){var r=getComputedStyle(e);return r[t]||r.getPropertyValue(t.replace(Za,"-$1").toLowerCase())||r.getPropertyValue(t)||!n&&i(e,hi(t)||t,1)||""},Il="O,Moz,ms,Ms,Webkit".split(","),hi=function(e,t,n){var r=t||wr,s=r.style,o=5;if(e in s&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);o--&&!(Il[o]+e in s););return o<0?null:(o===3?"ms":o>=0?Il[o]:"")+e},aa=function(){Zh()&&window.document&&(Ll=window,Zn=Ll.document,ni=Zn.documentElement,wr=oa("div")||{style:{}},oa("div"),Ge=hi(Ge),$t=Ge+"Origin",wr.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Wu=!!hi("perspective"),Ka=Gt.core.reverting,Qa=1)},Fl=function(e){var t=e.ownerSVGElement,n=oa("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),r=e.cloneNode(!0),s;r.style.display="block",n.appendChild(r),ni.appendChild(n);try{s=r.getBBox()}catch{}return n.removeChild(r),ni.removeChild(n),s},Nl=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},qu=function(e){var t,n;try{t=e.getBBox()}catch{t=Fl(e),n=1}return t&&(t.width||t.height)||n||(t=Fl(e)),t&&!t.width&&!t.x&&!t.y?{x:+Nl(e,["x","cx","x1"])||0,y:+Nl(e,["y","cy","y1"])||0,width:0,height:0}:t},Uu=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&qu(e))},ar=function(e,t){if(t){var n=e.style,r;t in qn&&t!==$t&&(t=Ge),n.removeProperty?(r=t.substr(0,2),(r==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),n.removeProperty(r==="--"?t:t.replace(Za,"-$1").toLowerCase())):n.removeAttribute(t)}},Jn=function(e,t,n,r,s,o){var a=new Nt(e._pt,t,n,0,1,o?Yu:Gu);return e._pt=a,a.b=r,a.e=s,e._props.push(n),a},$l={deg:1,rad:1,turn:1},hp={grid:1,flex:1},lr=function i(e,t,n,r){var s=parseFloat(n)||0,o=(n+"").trim().substr((s+"").length)||"px",a=wr.style,l=Jh.test(t),c=e.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),d=100,h=r==="px",f=r==="%",g,p,y,v;if(r===o||!s||$l[r]||$l[o])return s;if(o!=="px"&&!h&&(s=i(e,t,n,"px")),v=e.getCTM&&Uu(e),(f||o==="%")&&(qn[t]||~t.indexOf("adius")))return g=v?e.getBBox()[l?"width":"height"]:e[u],We(f?s/g*d:s/100*g);if(a[l?"width":"height"]=d+(h?o:r),p=r!=="rem"&&~t.indexOf("adius")||r==="em"&&e.appendChild&&!c?e:e.parentNode,v&&(p=(e.ownerSVGElement||{}).parentNode),(!p||p===Zn||!p.appendChild)&&(p=Zn.body),y=p._gsap,y&&f&&y.width&&l&&y.time===Zt.time&&!y.uncache)return We(s/y.width*d);if(f&&(t==="height"||t==="width")){var b=e.style[t];e.style[t]=d+r,g=e[u],b?e.style[t]=b:ar(e,t)}else(f||o==="%")&&!hp[tn(p,"display")]&&(a.position=tn(e,"position")),p===e&&(a.position="static"),p.appendChild(wr),g=wr[u],p.removeChild(wr),a.position="absolute";return l&&f&&(y=Er(p),y.time=Zt.time,y.width=p[u]),We(h?g*s/d:g&&s?d/g*s:0)},Bn=function(e,t,n,r){var s;return Qa||aa(),t in Pn&&t!=="transform"&&(t=Pn[t],~t.indexOf(",")&&(t=t.split(",")[0])),qn[t]&&t!=="transform"?(s=os(e,r),s=t!=="transformOrigin"?s[t]:s.svg?s.origin:ro(tn(e,$t))+" "+s.zOrigin+"px"):(s=e.style[t],(!s||s==="auto"||r||~(s+"").indexOf("calc("))&&(s=no[t]&&no[t](e,t,n)||tn(e,t)||fu(e,t)||(t==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?lr(e,t,s,n)+n:s},pp=function(e,t,n,r){if(!n||n==="none"){var s=hi(t,e,1),o=s&&tn(e,s,1);o&&o!==n?(t=s,n=o):t==="borderColor"&&(n=tn(e,"borderTopColor"))}var a=new Nt(this._pt,e.style,t,0,1,Nu),l=0,c=0,u,d,h,f,g,p,y,v,b,x,w,T;if(a.b=n,a.e=r,n+="",r+="",r.substring(0,6)==="var(--"&&(r=tn(e,r.substring(4,r.indexOf(")")))),r==="auto"&&(p=e.style[t],e.style[t]=r,r=tn(e,t)||r,p?e.style[t]=p:ar(e,t)),u=[n,r],Au(u),n=u[0],r=u[1],h=n.match(Kr)||[],T=r.match(Kr)||[],T.length){for(;d=Kr.exec(r);)y=d[0],b=r.substring(l,d.index),g?g=(g+1)%5:(b.substr(-5)==="rgba("||b.substr(-5)==="hsla(")&&(g=1),y!==(p=h[c++]||"")&&(f=parseFloat(p)||0,w=p.substr((f+"").length),y.charAt(1)==="="&&(y=ti(f,y)+w),v=parseFloat(y),x=y.substr((v+"").length),l=Kr.lastIndex-x.length,x||(x=x||nn.units[t]||w,l===r.length&&(r+=x,a.e+=x)),w!==x&&(f=lr(e,t,p,x)||0),a._pt={_next:a._pt,p:b||c===1?b:",",s:f,c:v-f,m:g&&g<4||t==="zIndex"?Math.round:0});a.c=l<r.length?r.substring(l,r.length):""}else a.r=t==="display"&&r==="none"?Yu:Gu;return ou.test(r)&&(a.e=0),this._pt=a,a},Bl={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},gp=function(e){var t=e.split(" "),n=t[0],r=t[1]||"50%";return(n==="top"||n==="bottom"||r==="left"||r==="right")&&(e=n,n=r,r=e),t[0]=Bl[n]||n,t[1]=Bl[r]||r,t.join(" ")},mp=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,r=n.style,s=t.u,o=n._gsap,a,l,c;if(s==="all"||s===!0)r.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)a=s[c],qn[a]&&(l=1,a=a==="transformOrigin"?$t:Ge),ar(n,a);l&&(ar(n,Ge),o&&(o.svg&&n.removeAttribute("transform"),r.scale=r.rotate=r.translate="none",os(n,1),o.uncache=1,Hu(r)))}},no={clearProps:function(e,t,n,r,s){if(s.data!=="isFromStart"){var o=e._pt=new Nt(e._pt,t,n,0,0,mp);return o.u=r,o.pr=-10,o.tween=s,e._props.push(n),1}}},ss=[1,0,0,1,0,0],Vu={},ju=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},Gl=function(e){var t=tn(e,Ge);return ju(t)?ss:t.substr(7).match(su).map(We)},Ja=function(e,t){var n=e._gsap||Er(e),r=e.style,s=Gl(e),o,a,l,c;return n.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?ss:s):(s===ss&&!e.offsetParent&&e!==ni&&!n.svg&&(l=r.display,r.display="block",o=e.parentNode,(!o||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,a=e.nextElementSibling,ni.appendChild(e)),s=Gl(e),l?r.display=l:ar(e,"display"),c&&(a?o.insertBefore(e,a):o?o.appendChild(e):ni.removeChild(e))),t&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},la=function(e,t,n,r,s,o){var a=e._gsap,l=s||Ja(e,!0),c=a.xOrigin||0,u=a.yOrigin||0,d=a.xOffset||0,h=a.yOffset||0,f=l[0],g=l[1],p=l[2],y=l[3],v=l[4],b=l[5],x=t.split(" "),w=parseFloat(x[0])||0,T=parseFloat(x[1])||0,M,k,R,C;n?l!==ss&&(k=f*y-g*p)&&(R=w*(y/k)+T*(-p/k)+(p*b-y*v)/k,C=w*(-g/k)+T*(f/k)-(f*b-g*v)/k,w=R,T=C):(M=qu(e),w=M.x+(~x[0].indexOf("%")?w/100*M.width:w),T=M.y+(~(x[1]||x[0]).indexOf("%")?T/100*M.height:T)),r||r!==!1&&a.smooth?(v=w-c,b=T-u,a.xOffset=d+(v*f+b*p)-v,a.yOffset=h+(v*g+b*y)-b):a.xOffset=a.yOffset=0,a.xOrigin=w,a.yOrigin=T,a.smooth=!!r,a.origin=t,a.originIsAbsolute=!!n,e.style[$t]="0px 0px",o&&(Jn(o,a,"xOrigin",c,w),Jn(o,a,"yOrigin",u,T),Jn(o,a,"xOffset",d,a.xOffset),Jn(o,a,"yOffset",h,a.yOffset)),e.setAttribute("data-svg-origin",w+" "+T)},os=function(e,t){var n=e._gsap||new Ou(e);if("x"in n&&!t&&!n.uncache)return n;var r=e.style,s=n.scaleX<0,o="px",a="deg",l=getComputedStyle(e),c=tn(e,$t)||"0",u,d,h,f,g,p,y,v,b,x,w,T,M,k,R,C,P,B,m,z,I,X,$,F,O,L,_,q,K,D,W,U;return u=d=h=p=y=v=b=x=w=0,f=g=1,n.svg=!!(e.getCTM&&Uu(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(r[Ge]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[Ge]!=="none"?l[Ge]:"")),r.scale=r.rotate=r.translate="none"),k=Ja(e,n.svg),n.svg&&(n.uncache?(O=e.getBBox(),c=n.xOrigin-O.x+"px "+(n.yOrigin-O.y)+"px",F=""):F=!t&&e.getAttribute("data-svg-origin"),la(e,F||c,!!F||n.originIsAbsolute,n.smooth!==!1,k)),T=n.xOrigin||0,M=n.yOrigin||0,k!==ss&&(B=k[0],m=k[1],z=k[2],I=k[3],u=X=k[4],d=$=k[5],k.length===6?(f=Math.sqrt(B*B+m*m),g=Math.sqrt(I*I+z*z),p=B||m?Yr(m,B)*yr:0,b=z||I?Yr(z,I)*yr+p:0,b&&(g*=Math.abs(Math.cos(b*ri))),n.svg&&(u-=T-(T*B+M*z),d-=M-(T*m+M*I))):(U=k[6],D=k[7],_=k[8],q=k[9],K=k[10],W=k[11],u=k[12],d=k[13],h=k[14],R=Yr(U,K),y=R*yr,R&&(C=Math.cos(-R),P=Math.sin(-R),F=X*C+_*P,O=$*C+q*P,L=U*C+K*P,_=X*-P+_*C,q=$*-P+q*C,K=U*-P+K*C,W=D*-P+W*C,X=F,$=O,U=L),R=Yr(-z,K),v=R*yr,R&&(C=Math.cos(-R),P=Math.sin(-R),F=B*C-_*P,O=m*C-q*P,L=z*C-K*P,W=I*P+W*C,B=F,m=O,z=L),R=Yr(m,B),p=R*yr,R&&(C=Math.cos(R),P=Math.sin(R),F=B*C+m*P,O=X*C+$*P,m=m*C-B*P,$=$*C-X*P,B=F,X=O),y&&Math.abs(y)+Math.abs(p)>359.9&&(y=p=0,v=180-v),f=We(Math.sqrt(B*B+m*m+z*z)),g=We(Math.sqrt($*$+U*U)),R=Yr(X,$),b=Math.abs(R)>2e-4?R*yr:0,w=W?1/(W<0?-W:W):0),n.svg&&(F=e.getAttribute("transform"),n.forceCSS=e.setAttribute("transform","")||!ju(tn(e,Ge)),F&&e.setAttribute("transform",F))),Math.abs(b)>90&&Math.abs(b)<270&&(s?(f*=-1,b+=p<=0?180:-180,p+=p<=0?180:-180):(g*=-1,b+=b<=0?180:-180)),t=t||n.uncache,n.x=u-((n.xPercent=u&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-u)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+o,n.y=d-((n.yPercent=d&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-d)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+o,n.z=h+o,n.scaleX=We(f),n.scaleY=We(g),n.rotation=We(p)+a,n.rotationX=We(y)+a,n.rotationY=We(v)+a,n.skewX=b+a,n.skewY=x+a,n.transformPerspective=w+o,(n.zOrigin=parseFloat(c.split(" ")[2])||!t&&n.zOrigin||0)&&(r[$t]=ro(c)),n.xOffset=n.yOffset=0,n.force3D=nn.force3D,n.renderTransform=n.svg?yp:Wu?Qu:_p,n.uncache=0,n},ro=function(e){return(e=e.split(" "))[0]+" "+e[1]},Ao=function(e,t,n){var r=xt(t);return We(parseFloat(t)+parseFloat(lr(e,"x",n+"px",r)))+r},_p=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,Qu(e,t)},pr="0deg",bi="0px",gr=") ",Qu=function(e,t){var n=t||this,r=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.z,c=n.rotation,u=n.rotationY,d=n.rotationX,h=n.skewX,f=n.skewY,g=n.scaleX,p=n.scaleY,y=n.transformPerspective,v=n.force3D,b=n.target,x=n.zOrigin,w="",T=v==="auto"&&e&&e!==1||v===!0;if(x&&(d!==pr||u!==pr)){var M=parseFloat(u)*ri,k=Math.sin(M),R=Math.cos(M),C;M=parseFloat(d)*ri,C=Math.cos(M),o=Ao(b,o,k*C*-x),a=Ao(b,a,-Math.sin(M)*-x),l=Ao(b,l,R*C*-x+x)}y!==bi&&(w+="perspective("+y+gr),(r||s)&&(w+="translate("+r+"%, "+s+"%) "),(T||o!==bi||a!==bi||l!==bi)&&(w+=l!==bi||T?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+gr),c!==pr&&(w+="rotate("+c+gr),u!==pr&&(w+="rotateY("+u+gr),d!==pr&&(w+="rotateX("+d+gr),(h!==pr||f!==pr)&&(w+="skew("+h+", "+f+gr),(g!==1||p!==1)&&(w+="scale("+g+", "+p+gr),b.style[Ge]=w||"translate(0, 0)"},yp=function(e,t){var n=t||this,r=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.rotation,c=n.skewX,u=n.skewY,d=n.scaleX,h=n.scaleY,f=n.target,g=n.xOrigin,p=n.yOrigin,y=n.xOffset,v=n.yOffset,b=n.forceCSS,x=parseFloat(o),w=parseFloat(a),T,M,k,R,C;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=ri,c*=ri,T=Math.cos(l)*d,M=Math.sin(l)*d,k=Math.sin(l-c)*-h,R=Math.cos(l-c)*h,c&&(u*=ri,C=Math.tan(c-u),C=Math.sqrt(1+C*C),k*=C,R*=C,u&&(C=Math.tan(u),C=Math.sqrt(1+C*C),T*=C,M*=C)),T=We(T),M=We(M),k=We(k),R=We(R)):(T=d,R=h,M=k=0),(x&&!~(o+"").indexOf("px")||w&&!~(a+"").indexOf("px"))&&(x=lr(f,"x",o,"px"),w=lr(f,"y",a,"px")),(g||p||y||v)&&(x=We(x+g-(g*T+p*k)+y),w=We(w+p-(g*M+p*R)+v)),(r||s)&&(C=f.getBBox(),x=We(x+r/100*C.width),w=We(w+s/100*C.height)),C="matrix("+T+","+M+","+k+","+R+","+x+","+w+")",f.setAttribute("transform",C),b&&(f.style[Ge]=C)},bp=function(e,t,n,r,s){var o=360,a=ot(s),l=parseFloat(s)*(a&&~s.indexOf("rad")?yr:1),c=l-r,u=r+c+"deg",d,h;return a&&(d=s.split("_")[1],d==="short"&&(c%=o,c!==c%(o/2)&&(c+=c<0?o:-o)),d==="cw"&&c<0?c=(c+o*zl)%o-~~(c/o)*o:d==="ccw"&&c>0&&(c=(c-o*zl)%o-~~(c/o)*o)),e._pt=h=new Nt(e._pt,t,n,r,c,tp),h.e=u,h.u="deg",e._props.push(n),h},Yl=function(e,t){for(var n in t)e[n]=t[n];return e},vp=function(e,t,n){var r=Yl({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=n.style,a,l,c,u,d,h,f,g;r.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),o[Ge]=t,a=os(n,1),ar(n,Ge),n.setAttribute("transform",c)):(c=getComputedStyle(n)[Ge],o[Ge]=t,a=os(n,1),o[Ge]=c);for(l in qn)c=r[l],u=a[l],c!==u&&s.indexOf(l)<0&&(f=xt(c),g=xt(u),d=f!==g?lr(n,l,c,g):parseFloat(c),h=parseFloat(u),e._pt=new Nt(e._pt,a,l,d,h-d,sa),e._pt.u=g||0,e._props.push(l));Yl(a,r)};Ft("padding,margin,Width,Radius",function(i,e){var t="Top",n="Right",r="Bottom",s="Left",o=(e<3?[t,n,r,s]:[t+s,t+n,r+n,r+s]).map(function(a){return e<2?i+a:"border"+a+i});no[e>1?"border"+i:i]=function(a,l,c,u,d){var h,f;if(arguments.length<4)return h=o.map(function(g){return Bn(a,g,c)}),f=h.join(" "),f.split(h[0]).length===5?h[0]:f;h=(u+"").split(" "),f={},o.forEach(function(g,p){return f[g]=h[p]=h[p]||h[(p-1)/2|0]}),a.init(l,f,d)}});var Ku={name:"css",register:aa,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,r,s){var o=this._props,a=e.style,l=n.vars.startAt,c,u,d,h,f,g,p,y,v,b,x,w,T,M,k,R,C;Qa||aa(),this.styles=this.styles||Xu(e),R=this.styles.props,this.tween=n;for(p in t)if(p!=="autoRound"&&(u=t[p],!(Vt[p]&&Lu(p,t,n,r,e,s)))){if(f=typeof u,g=no[p],f==="function"&&(u=u.call(n,r,e,s),f=typeof u),f==="string"&&~u.indexOf("random(")&&(u=ns(u)),g)g(this,e,p,u,n)&&(k=1);else if(p.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(p)+"").trim(),u+="",ir.lastIndex=0,ir.test(c)||(y=xt(c),v=xt(u),v?y!==v&&(c=lr(e,p,c,v)+v):y&&(u+=y)),this.add(a,"setProperty",c,u,r,s,0,0,p),o.push(p),R.push(p,0,a[p]);else if(f!=="undefined"){if(l&&p in l?(c=typeof l[p]=="function"?l[p].call(n,r,e,s):l[p],ot(c)&&~c.indexOf("random(")&&(c=ns(c)),xt(c+"")||c==="auto"||(c+=nn.units[p]||xt(Bn(e,p))||""),(c+"").charAt(1)==="="&&(c=Bn(e,p))):c=Bn(e,p),h=parseFloat(c),b=f==="string"&&u.charAt(1)==="="&&u.substr(0,2),b&&(u=u.substr(2)),d=parseFloat(u),p in Pn&&(p==="autoAlpha"&&(h===1&&Bn(e,"visibility")==="hidden"&&d&&(h=0),R.push("visibility",0,a.visibility),Jn(this,a,"visibility",h?"inherit":"hidden",d?"inherit":"hidden",!d)),p!=="scale"&&p!=="transform"&&(p=Pn[p],~p.indexOf(",")&&(p=p.split(",")[0]))),x=p in qn,x){if(this.styles.save(p),C=u,f==="string"&&u.substring(0,6)==="var(--"){if(u=tn(e,u.substring(4,u.indexOf(")"))),u.substring(0,5)==="calc("){var P=e.style.perspective;e.style.perspective=u,u=tn(e,"perspective"),P?e.style.perspective=P:ar(e,"perspective")}d=parseFloat(u)}if(w||(T=e._gsap,T.renderTransform&&!t.parseTransform||os(e,t.parseTransform),M=t.smoothOrigin!==!1&&T.smooth,w=this._pt=new Nt(this._pt,a,Ge,0,1,T.renderTransform,T,0,-1),w.dep=1),p==="scale")this._pt=new Nt(this._pt,T,"scaleY",T.scaleY,(b?ti(T.scaleY,b+d):d)-T.scaleY||0,sa),this._pt.u=0,o.push("scaleY",p),p+="X";else if(p==="transformOrigin"){R.push($t,0,a[$t]),u=gp(u),T.svg?la(e,u,0,M,0,this):(v=parseFloat(u.split(" ")[2])||0,v!==T.zOrigin&&Jn(this,T,"zOrigin",T.zOrigin,v),Jn(this,a,p,ro(c),ro(u)));continue}else if(p==="svgOrigin"){la(e,u,1,M,0,this);continue}else if(p in Vu){bp(this,T,p,h,b?ti(h,b+u):u);continue}else if(p==="smoothOrigin"){Jn(this,T,"smooth",T.smooth,u);continue}else if(p==="force3D"){T[p]=u;continue}else if(p==="transform"){vp(this,u,e);continue}}else p in a||(p=hi(p)||p);if(x||(d||d===0)&&(h||h===0)&&!ep.test(u)&&p in a)y=(c+"").substr((h+"").length),d||(d=0),v=xt(u)||(p in nn.units?nn.units[p]:y),y!==v&&(h=lr(e,p,c,v)),this._pt=new Nt(this._pt,x?T:a,p,h,(b?ti(h,b+d):d)-h,!x&&(v==="px"||p==="zIndex")&&t.autoRound!==!1?ip:sa),this._pt.u=v||0,x&&C!==u?(this._pt.b=c,this._pt.e=C,this._pt.r=rp):y!==v&&v!=="%"&&(this._pt.b=c,this._pt.r=np);else if(p in a)pp.call(this,e,p,c,b?b+u:u);else if(p in e)this.add(e,p,c||e[p],b?b+u:u,r,s);else if(p!=="parseTransform"){Ba(p,u);continue}x||(p in a?R.push(p,0,a[p]):typeof e[p]=="function"?R.push(p,2,e[p]()):R.push(p,1,c||e[p])),o.push(p)}}k&&$u(this)},render:function(e,t){if(t.tween._time||!Ka())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:Bn,aliases:Pn,getSetter:function(e,t,n){var r=Pn[t];return r&&r.indexOf(",")<0&&(t=r),t in qn&&t!==$t&&(e._gsap.x||Bn(e,"x"))?n&&Dl===n?t==="scale"?lp:ap:(Dl=n||{})&&(t==="scale"?cp:up):e.style&&!Fa(e.style[t])?sp:~t.indexOf("-")?op:Va(e,t)},core:{_removeProperty:ar,_getMatrix:Ja}};Gt.utils.checkPrefix=hi;Gt.core.getStyleSaver=Xu;(function(i,e,t,n){var r=Ft(i+","+e+","+t,function(s){qn[s]=1});Ft(e,function(s){nn.units[s]="deg",Vu[s]=1}),Pn[r[13]]=i+","+e,Ft(n,function(s){var o=s.split(":");Pn[o[1]]=r[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");Ft("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(i){nn.units[i]="px"});Gt.registerPlugin(Ku);var An=Gt.registerPlugin(Ku)||Gt;An.core.Tween;const xp=100,wp=.08,Sp=xp*wp,ca=1.6,kp=.9,Tp=26,Ep=1.6,Cp=.6,xr=14,Mp=2.6,Ro=.5,Pp=.1,Ap=.9,Oo=3.2,Rp=.35,Hl=.22,Xl=1.15,Op=.65,Lp=1.7,Lo=[.45,.32,.58],Do=[0,1.7,3.9],zo=[1,.8,.9],gs=new re(14,8,-90),Dp=new re(0,1,0),zp=new re(1,0,0);function pi(i){return Math.min(Math.max(i,0),1)}function Ip(i){return Math.min(Tp,Math.max(0,i)*Ep)}function Wl(i){return i<=Sp}function Fp(i,e){return ca+(i-ca)*Math.exp(-2.2*e)}function Np(i,e,t){const n=pi(i),r=pi(e);if(t<=0||n===r)return n;const s=t/Cp;return r>n?Math.min(r,n+s):Math.max(r,n-s)}function $p(i,e){return(Number.isFinite(e)?pi(e):0)*Math.sin(2*Math.PI*i/Mp)}function ql(i){return[Ro*zo[0]*Math.sin(Lo[0]*i+Do[0]),Ro*zo[1]*Math.sin(Lo[1]*i+Do[1]),Ro*zo[2]*Math.sin(Lo[2]*i+Do[2])]}function Bp(i,e=xr){if(e<=1)return 1;const t=pi(i/(e-1));return Math.pow(1-t,Lp)}function Gp(i,e=xr){if(e<=1)return Xl;const t=pi(i/(e-1));return Xl*(1-Op*t)}function Yp(){if(typeof document>"u")return null;const i=document.createElement("canvas");i.width=i.height=128;const e=i.getContext("2d"),t=e.createRadialGradient(64,64,0,64,64,64);return t.addColorStop(0,"rgba(255, 252, 240, 1)"),t.addColorStop(.25,"rgba(255, 233, 184, 0.95)"),t.addColorStop(.6,"rgba(255, 233, 184, 0.28)"),t.addColorStop(1,"rgba(255, 233, 184, 0)"),e.fillStyle=t,e.fillRect(0,0,128,128),new po(i)}const Hp=`
attribute float aSize;
attribute float aFade;
varying float vFade;
void main() {
  vFade = aFade;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = aSize * (320.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
`,Xp=`
uniform sampler2D uMap;
varying float vFade;
void main() {
  vec4 tex = texture2D(uMap, gl_PointCoord);
  gl_FragColor = vec4(tex.rgb, tex.a * vFade);
}
`,Wp=0,Ul=1,Vl=2;function qp(){const i=new wn;i.name="firefly";const e=Yp(),t=new La({map:e,transparent:!0,opacity:0,blending:zr,depthTest:!1,depthWrite:!1}),n=new Da(t);n.scale.set(Oo,Oo,1);const r=ql(0),s=new re(gs.x+r[0],gs.y+r[1],gs.z+r[2]);n.position.copy(s),n.frustumCulled=!1,n.renderOrder=9,i.add(n);const o=new Zi;o.setAttribute("position",new nr(new Float32Array(xr*3),3).setUsage(xo)),o.setAttribute("aSize",new nr(new Float32Array(xr),1).setUsage(xo)),o.setAttribute("aFade",new nr(new Float32Array(xr),1).setUsage(xo));const a=o.getAttribute("position"),l=o.getAttribute("aSize"),c=o.getAttribute("aFade"),u=new Wc({uniforms:{uMap:{value:e}},vertexShader:Hp,fragmentShader:Xp,transparent:!0,blending:zr,depthTest:!1,depthWrite:!1}),d=new za(o,u);d.frustumCulled=!1,d.renderOrder=8,i.add(d);const h=gs.clone(),f=s.clone();let g=null,p=Wp;const y=new re(1,0,0),v=new re(0,1,0);let b=ca,x=0,w=0,T=0,M=0,k=0;const R=[];let C=!1;function P($,F){mr.copy(h).sub($),(F<.001||mr.lengthSq()<1e-12)&&mr.set(1,0,0),y.copy(mr).normalize(),b=Math.max(F,.001),$.lengthSq()<1e-8?Io.set(0,1,0):Io.copy($).normalize(),v.crossVectors(y,Io),v.lengthSq()<1e-8&&v.crossVectors(y,Math.abs(y.y)<.99?Dp:zp),v.normalize(),x=0,p=Vl}function B($){if(!Number.isFinite($.x)||!Number.isFinite($.y)||!Number.isFinite($.z))return;g===null&&(g=new re),g.set($.x,$.y,$.z);const F=h.distanceTo(g);Wl(F)?P(g,F):p=Ul}function m($){k=Number.isFinite($)?pi($):0}function z($){M=$?1:0}function I($){if(C)return;const F=Number.isFinite($)?Math.min(Math.max($,0),Pp):0;if(w+=F,T=Np(T,M,F),i.visible=T>.001,g!==null&&p===Ul){mr.copy(g).sub(h);const D=mr.length();Wl(D)?P(g,D):h.addScaledVector(mr.divideScalar(D),Ip(D)*F)}g!==null&&p===Vl&&(b=Fp(b,F),x+=kp*F,h.copy(g).addScaledVector(y,Math.cos(x)*b).addScaledVector(v,Math.sin(x)*b));const O=ql(w);f.set(h.x+O[0],h.y+O[1],h.z+O[2]);const L=$p(w,k);t.opacity=Ap*(1+Rp*L)*T;const _=Oo*(1+Hl*L);n.scale.set(_,_,1),n.position.copy(f);const q=R.length<xr?new re:R.pop();q.copy(f),R.unshift(q);const K=R.length;for(let D=0;D<xr;D++){const W=R[Math.min(D,K-1)];a.setXYZ(D,W.x,W.y,W.z),c.setX(D,Bp(D)*T),l.setX(D,Gp(D)*(1+Hl*L))}a.needsUpdate=!0,c.needsUpdate=!0,l.needsUpdate=!0}function X(){C||(C=!0,i.removeFromParent(),t.dispose(),e==null||e.dispose(),o.dispose(),u.dispose())}return i.visible=!1,{group:i,flyTo:B,pulse:m,setVisible:z,update:I,dispose:X}}const mr=new re,Io=new re,el=.35,Zu=.8,Sr=.05,ii=.3,$s=5,Ju=.08,tl=["北斗","北极","天狼"],ef=4,Bs=.8,tf=20,ua="ch2-awakened",Oi=0,kn=1,fa=2;function da(i){return Math.min(Math.max(i,0),1)}function nf(i){return i<el?Oi:i<Zu?kn:fa}function Li(i){for(const e of tl)if(!i.has(e))return e;return null}function ha(i,e,t){return!i||t.has(i)?!1:e===null||i===e}const pa=[{key:"ziwei",name:"紫微"},{key:"taiwei",name:"太微"},{key:"tianshi",name:"天市"},{key:"qinglong",name:"青龙"},{key:"xuanwu",name:"玄武"},{key:"baihu",name:"白虎"},{key:"zhuque",name:"朱雀"}];function rf(i){return i.includes("紫微")?"ziwei":i.includes("太微")?"taiwei":i.includes("天市")?"tianshi":i.includes("苍龙")||i.includes("青龙")?"qinglong":i.includes("玄武")?"xuanwu":i.includes("白虎")?"baihu":i.includes("朱雀")?"zhuque":null}const sf=[.25,.5,.75,1];function Gs(i,e){if(e<=0||i<=0)return 0;const t=i/e;let n=0;for(const r of sf)t+1e-9>=r&&(n+=1);return n}function of(i){let e=0,t=0,n=0;for(const s of i){const[o,a,l]=Bt(s.ra,s.dec);e+=o,t+=a,n+=l}const r=Math.hypot(e,t,n);return r<1e-6?null:{ra:Math.atan2(n,e)*180/Math.PI,dec:Math.asin(t/r)*180/Math.PI}}function io(i,e){const[t,n,r]=Bt(i.ra,i.dec),[s,o,a]=Bt(e.ra,e.dec),l=Math.min(1,Math.max(-1,t*s+n*o+r*a));return Math.acos(l)*180/Math.PI}function ga(i,e,t){let n=null,r=1/0;for(const s of i){if(e.has(s.name))continue;const o=io(s,t);o<r&&(r=o,n=s.name)}return n}function af(i){const e=Math.min(Math.max((5.5-i)*4,0),28);return 220*Math.pow(2,e/12)}function lf(i,e=2){return i.split("，").slice(0,Math.max(1,e)).join("，")}function cf(i){if(!i)return[];try{const e=JSON.parse(i);return Array.isArray(e)?e.filter(t=>typeof t=="string"&&t.length>0):[]}catch{return[]}}function ma(i){const e=(ii-Sr)/$s,t=[];for(let s=0;s<$s;s++)t.push(da((i-(Sr+s*e))/e));const n=i<Sr?-1:Math.min(Math.floor((i-Sr)/e),$s-1),r=da((i-ii)/(el-ii));return{active:n,lines:t,finale:r}}const Fo=100,ms=.78,Up=1.6,Vp=.12,jp=[3e4,2e4,12e3,1e4],Qp=1400,jl=[{text:"北斗之宿七星明",label:"北斗",groups:["北斗"]},{text:"北极五星在其中",label:"北极",groups:["北极"]},{text:"三星中央色最深",label:"心宿",groups:["心宿"]},{text:"牛上直建三河鼓，鼓上三星号织女",label:"河鼓 · 织女",groups:["河鼓","织女"]},{text:"邱下一狼光蓬茸",label:"天狼",groups:["天狼"]}],Kp=[{ra:186,dec:56.5,ring:26},{ra:218.6,dec:76.8,ring:10},{ra:247.2,dec:-26.8,ring:8},{ra:297.7,dec:8.6,ring:8},{ra:101.3,dec:-16.7,ring:6}],Zp=(()=>{const[i,e,t]=Bt(297.7,8.6),[n,r,s]=Bt(280.5,38.7),o=i+n,a=e+r,l=t+s,c=Math.hypot(o,a,l),u=Math.atan2(l,o)*180/Math.PI,d=Math.asin(a/c)*180/Math.PI;return[Qn(186,56.5),Qn(218.6,76.8),Qn(247.2,-26.8),Qn(u,d),Qn(101.3,-16.7)]})(),Jp=["一","二","三"],e0=`
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

/* ---- 段1：竖排诗句（一句一屏，靠左侧面板；天空留给对应星官高光） ---- */
.ch2-lines { position: absolute; inset: 0; pointer-events: none; }
.ch2-line {
  position: absolute; left: 5.5vw; top: 50%;
  transform: translateY(-50%);
  display: flex; flex-direction: row-reverse; align-items: flex-start; gap: 18px;
  padding: 22px 18px;
  background: rgba(13, 13, 17, 0.55);
  border: 1px solid rgba(201, 162, 39, 0.28);
  border-radius: 8px;
  backdrop-filter: blur(4px);
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

/* ---- 段2：引路题字（底部中央小字，不拦截点击） ---- */
.ch2-caption {
  position: absolute; left: 50%; bottom: 5vh;
  transform: translate(-50%, 8px);
  font-family: var(--font-display, "Songti SC", serif);
  font-size: 15px; letter-spacing: 0.3em; text-indent: 0.3em;
  color: #fce1b6; text-shadow: 0 0 12px rgba(201, 162, 39, 0.4), 0 2px 8px rgba(13, 13, 17, 0.9);
  opacity: 0; transition: opacity 0.7s ease, transform 0.7s ease;
  pointer-events: none; white-space: nowrap;
}
.ch2-caption.on { opacity: 0.92; transform: translate(-50%, 0); }

/* ---- 段2/段3：屏幕中心准星（凝视唤醒；圆环进度由 JS 内联驱动） ---- */
.ch2-cross {
  position: absolute; left: 50%; top: 50%;
  width: 30px; height: 30px; margin: -15px 0 0 -15px;
  opacity: 0; transition: opacity 0.5s ease;
  pointer-events: none;
}
.ch2-cross.on { opacity: 0.5; }
.ch2-cross i {
  position: absolute; inset: 0;
  border: 1px solid rgba(252, 225, 182, 0.85); border-radius: 50%;
  box-shadow: 0 0 8px rgba(201, 162, 39, 0.25);
}
.ch2-cross b {
  position: absolute; left: 50%; top: 50%;
  width: 3px; height: 3px; margin: -1.5px 0 0 -1.5px;
  background: #fce1b6; border-radius: 50%;
}

/* ---- 段2：唤醒诗句飘字（描金竖排，随光上浮溶散） ---- */
.ch2-floats { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.ch2-poemfloat {
  position: absolute; left: 50%; top: 42%;
  transform: translate(-50%, -50%);
  display: flex; flex-direction: row-reverse; align-items: flex-start; gap: 12px;
  animation: ch2PoemFloat 2.4s ease-out forwards;
}
.ch2-poemfloat-text {
  writing-mode: vertical-rl;
  font-family: var(--font-display, "Songti SC", serif);
  font-size: clamp(16px, 2.6vh, 24px);
  letter-spacing: 0.28em;
  color: #fce1b6;
  text-shadow:
    0 0 16px rgba(201, 162, 39, 0.6),
    0 0 3px rgba(201, 162, 39, 0.9),
    0 2px 8px rgba(13, 13, 17, 0.9);
}
.ch2-poemfloat-from {
  writing-mode: vertical-rl;
  margin-top: 6px;
  font-size: 11px; letter-spacing: 0.3em;
  color: #c9a227;
  text-shadow: 0 1px 6px rgba(13, 13, 17, 0.9);
}
@keyframes ch2PoemFloat {
  0% { opacity: 0; transform: translate(-50%, -36%); }
  16% { opacity: 1; }
  62% { opacity: 1; }
  100% { opacity: 0; transform: translate(-50%, -130%); }
}

/* ---- 段2：引路完毕与歌成结语（居中小字/大字，各一闪而过） ---- */
.ch2-guidedone, .ch2-complete {
  position: absolute; left: 50%; top: 42%;
  transform: translate(-50%, -50%);
  font-family: var(--font-display, "Songti SC", serif);
  color: #fce1b6; pointer-events: none; opacity: 0;
  white-space: nowrap;
}
.ch2-guidedone {
  font-size: clamp(16px, 2.4vh, 20px);
  letter-spacing: 0.42em; text-indent: 0.42em;
  text-shadow: 0 0 14px rgba(201, 162, 39, 0.45);
}
.ch2-guidedone.on { animation: ch2LineLinger 3s ease forwards; }
.ch2-complete {
  top: 36%;
  font-size: clamp(24px, 4.6vh, 40px);
  letter-spacing: 0.3em; text-indent: 0.3em;
  text-shadow: 0 0 26px rgba(201, 162, 39, 0.7), 0 0 60px rgba(201, 162, 39, 0.35);
}
.ch2-complete.on { animation: ch2LineLinger 6s ease forwards; }
@keyframes ch2LineLinger {
  0% { opacity: 0; transform: translate(-50%, calc(-50% + 10px)); }
  14% { opacity: 1; transform: translate(-50%, -50%); }
  72% { opacity: 1; }
  100% { opacity: 0; transform: translate(-50%, calc(-50% - 12px)); }
}

/* ---- 段2/段3：收集卷（左下极简，描金细线；done 时收拢为纪念章） ---- */
.ch2-scroll {
  position: absolute; left: 3.2vw; bottom: 5vh;
  width: 208px;
  padding: 14px 16px 12px;
  background: rgba(13, 13, 17, 0.6);
  border: 1px solid rgba(175, 145, 95, 0.26);
  border-radius: 8px;
  backdrop-filter: blur(4px);
  opacity: 0; transform: translateY(10px);
  transition: opacity 0.6s ease, transform 0.6s ease;
  pointer-events: none;
}
.ch2-scroll.on { opacity: 1; transform: translateY(0); }
.ch2-scroll-head {
  display: flex; justify-content: space-between; align-items: baseline;
  margin-bottom: 8px;
}
.ch2-scroll-head span { font-size: 11px; letter-spacing: 0.4em; color: #af915f; }
.ch2-scroll-total {
  font-family: var(--font-display, "Songti SC", serif);
  font-size: 15px; font-weight: 400; color: #fce1b6;
}
.ch2-scroll-body { transition: opacity 0.5s ease, max-height 0.6s ease; max-height: 220px; overflow: hidden; }
.ch2-region {
  display: flex; align-items: center; gap: 8px;
  padding: 2.5px 0;
  font-size: 11.5px; color: rgba(252, 225, 182, 0.85);
}
.ch2-region span { flex: none; width: 2.4em; letter-spacing: 0.1em; }
.ch2-region-bar {
  flex: 1; height: 2px; border-radius: 1px;
  background: rgba(252, 225, 182, 0.12);
  overflow: hidden;
}
.ch2-region-bar b {
  display: block; height: 100%; width: 0%;
  background: linear-gradient(90deg, #c9a227, #e8c85a);
  transition: width 0.8s ease;
}
.ch2-region em { flex: none; font-style: normal; font-size: 10.5px; color: #af915f; min-width: 3.6em; text-align: right; }
.ch2-scroll-foot {
  display: flex; justify-content: space-between; align-items: baseline;
  margin-top: 8px; padding-top: 7px;
  border-top: 1px solid rgba(175, 145, 95, 0.18);
  font-size: 10.5px; color: rgba(252, 225, 182, 0.6); letter-spacing: 0.08em;
}
.ch2-retreat {
  pointer-events: auto;
  background: none; border: none; padding: 0;
  font-size: 10.5px; letter-spacing: 0.2em; color: rgba(175, 145, 95, 0.65);
  border-bottom: 1px solid rgba(175, 145, 95, 0.3);
  cursor: pointer;
}
.ch2-retreat:hover { color: #c9a227; border-bottom-color: rgba(201, 162, 39, 0.6); }
/* 歌成纪念章：卷轴收拢，朱砂圆章显现 */
.ch2-badge {
  display: none;
  width: 64px; height: 64px; margin: 6px auto 2px;
  border-radius: 50%;
  background: linear-gradient(150deg, #b1402f 0%, #8e2f22 100%);
  box-shadow: 0 0 18px rgba(142, 47, 34, 0.5), inset 0 0 0 2px rgba(252, 225, 182, 0.35);
  align-items: center; justify-content: center;
}
.ch2-badge i {
  font-family: var(--font-display, "Songti SC", serif);
  font-style: normal; font-size: 19px; letter-spacing: 0.12em; text-indent: 0.12em;
  color: #fce1b6; writing-mode: vertical-rl;
}
.ch2-scroll.done { width: 148px; text-align: center; }
.ch2-scroll.done .ch2-scroll-body,
.ch2-scroll.done .ch2-scroll-foot { display: none; }
.ch2-scroll.done .ch2-badge { display: flex; animation: ch2BadgeIn 0.5s cubic-bezier(0.2, 1.4, 0.4, 1) both; }
@keyframes ch2BadgeIn {
  0% { opacity: 0; transform: scale(1.8); }
  100% { opacity: 1; transform: scale(1); }
}

/* ---- 段3：自由探索面板 ---- */
.ch2-explore { left: 6vw; bottom: 10vh; max-width: 400px; }
.ch2-explore h2 {
  font-family: var(--font-display, "Songti SC", serif);
  font-size: 26px; font-weight: 400; letter-spacing: 0.14em; color: #c9a227;
  margin-bottom: 10px;
}
.ch2-explore p { font-size: 14px; line-height: 2; opacity: 0.88; }
`;let Ql=!1;function t0(){if(Ql||typeof document>"u")return;const i=document.createElement("style");i.dataset.ch2="",i.textContent=e0,document.head.appendChild(i),Ql=!0}function vn(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}let Qt=null,Yi=null;function n0(){if(typeof window>"u")return;const i=window.AudioContext??window.webkitAudioContext;i&&(Qt||(Qt=new i,Yi=Qt.createGain(),Yi.gain.value=.12,Yi.connect(Qt.destination)),Qt.state==="suspended"&&Qt.resume())}function Kl(i,e,t){if(n0(),!Qt||!Yi)return;const n=Qt.sampleRate,r=Math.max(2,Math.round(n/i)),s=Math.floor(n*e),o=Qt.createBuffer(1,s,n),a=o.getChannelData(0),l=new Float32Array(r);for(let d=0;d<r;d++)l[d]=Math.random()*2-1;let c=0;for(let d=0;d<s;d++){const h=l[c],f=l[(c+1)%r];l[c]=.996*.5*(h+f),a[d]=h*t,c=(c+1)%r}const u=Qt.createBufferSource();u.buffer=o,u.connect(Yi),u.start()}function r0(i){t0();const e=i.root.querySelector(".pin"),{copy:t}=i;function n(S,A){const Q=document.createElement(S);return Q.className=A,e.appendChild(Q),Q}const r=n("div","ch2-card ch2-title");r.innerHTML=`
    <p class="eyebrow">${vn(t.eyebrow)}</p>
    <div class="ch2-head">
      <h2>${vn(t.title)}</h2>
      ${t.seal?`<div class="seal">${vn(t.seal)}</div>`:""}
    </div>
    <p class="ch2-hook">${vn(t.hook)}</p>
    <p class="ch2-narr">${vn(t.body[0]??"")}</p>
  `;const s=n("div","ch2-lines"),o=jl.map(S=>{const A=document.createElement("div");return A.className="ch2-line",A.innerHTML=`<span class="ch2-line-text">${vn(S.text)}</span><span class="ch2-line-name">${vn(S.label)}</span>`,s.appendChild(A),A}),a=n("div","ch2-card ch2-finale");a.innerHTML=`<p class="ch2-finale-text">${vn(t.body[1]??"")}</p>`;const l=n("div","ch2-caption"),c=n("div","ch2-cross"),u=document.createElement("i");c.appendChild(u),c.appendChild(document.createElement("b"));const d=n("div","ch2-floats"),h=n("div","ch2-guidedone");h.textContent="星路已明，自去吧";const f=n("div","ch2-complete");f.textContent="三千年前的那首歌，你也唱完了";const g=n("div","ch2-scroll");g.innerHTML=`
    <div class="ch2-scroll-head"><span>唤星</span><b class="ch2-scroll-total">0 / 309</b></div>
    <div class="ch2-scroll-body"></div>
    <div class="ch2-scroll-foot">
      <span class="ch2-scroll-count">你已唤醒 0 颗</span>
      <button type="button" class="ch2-retreat">归隐</button>
    </div>
    <div class="ch2-badge"><i>歌成</i></div>
  `;const p=g.querySelector(".ch2-scroll-body"),y=g.querySelector(".ch2-scroll-total"),v=g.querySelector(".ch2-scroll-count"),b=g.querySelector(".ch2-retreat"),x=new Map;for(const S of pa){const A=document.createElement("div");A.className="ch2-region",A.innerHTML=`<span>${S.name}</span><i class="ch2-region-bar"><b></b></i><em>0/0</em>`,p.appendChild(A),x.set(S.key,{bar:A.querySelector(".ch2-region-bar b"),num:A.querySelector("em")})}const w=n("div","ch2-card ch2-explore");w.innerHTML=`
    <h2>现在，把星空交给你</h2>
    <p>${vn(t.body[2]??"")}</p>
  `;const T=n("div","atlas-hint");T.textContent="拖拽环视 · 点击或凝视沉睡的星";let M=null,k=[];const R=new Map;Promise.all([fetch(On("data/poem.json")).then(S=>S.ok?S.json():null),fetch(On("data/stars.json")).then(S=>S.ok?S.json():null),fetch(On("data/asterisms.json")).then(S=>S.ok?S.json():null)]).then(([S,A,Q])=>{if(M=S,!A||!Q)return;const pe=new Map(A.stars.map(Ce=>[Ce.hip,Ce])),Ee=[];for(const Ce of Q.asterisms){const dt=Ce.stars.map(hr=>pe.get(hr)).filter(hr=>hr!==void 0),Sn=of(dt);if(!Sn)continue;const[jf,Qf,Kf]=Bt(Sn.ra,Sn.dec,Fo);let vo=3,fs=null;for(const hr of dt)vo=Math.max(vo,io(Sn,hr)),(fs===null||hr.mag<fs)&&(fs=hr.mag);const Zf=Math.max(6,Fo*Math.tan(vo*Math.PI/180)*1.35);Ee.push({name:Ce.name,region:S!=null&&S[Ce.name]?rf(S[Ce.name].from):null,ra:Sn.ra,dec:Sn.dec,x:jf,y:Qf,z:Kf,ring:Zf,mag:fs})}k=Ee,R.clear();for(const Ce of Ee)R.set(Ce.name,Ce);ut(),C===kn&&_t()}).catch(()=>{});let C=-1,P=0;const B=new Set(Yt());let m=B.size>0&&Li(B)===null,z=0,I=0,X=null,$=0;const F=new Wt;let O=!1,L=0,_=null,q=!1,K=[],D=null,W=null,U=null,ne=null,H=null,ve=0,Se=0;const at=new Set;let ze=0,ke=!1;const V=new Wt;let ie=null,Ye="",tt=8,E=!1,Pe=null,lt=!1,gt=!1,me=!1,de=!1,Ie=!1,ct=!1,Fe=!1,_n=-2,Ae=!1;function Yt(){try{return cf(window.localStorage.getItem(ua))}catch{return[]}}function kt(){try{window.localStorage.setItem(ua,JSON.stringify([...B]))}catch{}}function Rt(){return k.length>0?k.length:i.sky.groupCount}function Un(S){const A=i.sky.groupCount;for(let Q=0;Q<A;Q++)i.sky.setGroupProgress(Q,S)}function Oe(){const S=i.sky.groupCount;for(let A=0;A<S;A++)i.sky.setGroupProgress(A,Ju);for(const A of B)i.sky.setGroupProgress(A,1)}function zn(S){lt!==S&&(lt=S,r.classList.toggle("on",S))}function Ot(S){gt!==S&&(gt=S,a.classList.toggle("on",S))}function yn(S){me!==S&&(me=S,w.classList.toggle("on",S))}function bn(S){de!==S&&(de=S,T.classList.toggle("on",S))}function Ht(S){_n!==S&&(_n=S,o.forEach((A,Q)=>A.classList.toggle("on",Q===S)))}function Xt(S){const A=S!==null;A&&(l.textContent=S),!(Ie===A&&!A)&&(Ie=A,l.classList.toggle("on",A))}function se(S){ct!==S&&(ct=S,c.classList.toggle("on",S),S||on(0))}function on(S){const A=da(S);u.style.borderColor=A>0?`rgba(201, 162, 39, ${.55+.45*A})`:"",u.style.transform=A>0?`scale(${1+.3*A})`:"",u.style.boxShadow=A>0?`0 0 ${8+10*A}px rgba(201, 162, 39, ${.3+.5*A})`:""}function mt(S){Fe!==S&&(Fe=S,g.classList.toggle("on",S))}function Lt(S,A){S.classList.remove(A),S.offsetWidth,S.classList.add(A)}function ut(){const S={ziwei:0,taiwei:0,tianshi:0,qinglong:0,xuanwu:0,baihu:0,zhuque:0},A={...S};for(const pe of k)pe.region&&(A[pe.region]+=1,B.has(pe.name)&&(S[pe.region]+=1));for(const pe of pa){const Ee=x.get(pe.key);if(!Ee)continue;const Ce=A[pe.key],dt=S[pe.key];Ee.bar.style.width=Ce>0?`${(dt/Ce*100).toFixed(1)}%`:"0%",Ee.num.textContent=`${dt}/${Ce}`}const Q=Rt();y.textContent=Q>0?`${B.size} / ${Q}`:`${B.size} / —`,v.textContent=`你已唤醒 ${B.size} 颗`}function In(){if(Pe)return Pe;const S=document.createElement("canvas");S.width=S.height=128;const A=S.getContext("2d");return A.strokeStyle="rgba(240, 205, 110, 0.95)",A.lineWidth=6,A.shadowColor="rgba(201, 162, 39, 0.9)",A.shadowBlur=14,A.beginPath(),A.arc(64,64,48,0,Math.PI*2),A.stroke(),Pe=new po(S),Pe}function Fn(S,A,Q,pe){const Ee=`${S.toFixed(1)},${A.toFixed(1)},${Q.toFixed(1)},${pe.toFixed(1)}`;if(ie&&Ye===Ee)return;ft();const Ce=new La({map:In(),transparent:!0,depthTest:!1,depthWrite:!1,opacity:.9}),dt=new Da(Ce);dt.position.set(S,A,Q),dt.scale.set(pe,pe,1),dt.renderOrder=998,i.sky.addSkyObject(dt),ie=dt,Ye=Ee,tt=pe}function ft(){ie&&(i.sky.removeSkyObject(ie),ie.material.dispose(),ie=null,Ye="")}function Nn(){ne!==null&&(clearTimeout(ne),ne=null)}function te(){for(const S of K)S.kill();K=[]}function Z(S,A){const Q={v:0},pe=An.to(Q,{v:1,duration:A,ease:"power1.out",onUpdate:()=>i.sky.setGroupProgress(S,Q.v),onComplete:()=>{K=K.filter(Ee=>Ee!==pe)}});K.push(pe)}function ue(){return ms+Vp*Math.min(z,3)}const N={v:ms};function ee(S,A){D==null||D.kill(),D=An.to(N,{v:S,duration:A,ease:"power2.out",onUpdate:()=>i.sky.setBloom({strength:N.v}),onComplete:()=>{D=null}})}function j(){D==null||D.kill(),N.v=Up,i.sky.setBloom({strength:N.v}),ee(ue(),.8)}const J={v:1};function Ue(){W==null||W.kill(),J.v=.5,i.sky.setTimeScale(.5),W=An.to(J,{v:1,delay:.4,duration:.6,ease:"power2.inOut",onUpdate:()=>i.sky.setTimeScale(J.v),onComplete:()=>{W=null}})}function fe(){W&&(W.kill(),W=null),J.v!==1&&(J.v=1,i.sky.setTimeScale(1))}function Ne(S){const A=M==null?void 0:M[S.name],Q=document.createElement("div");Q.className="ch2-poemfloat";const pe=A?lf(A.text,2):S.name,Ee=A?`《步天歌》 · ${A.from}`:"";Q.innerHTML=`<span class="ch2-poemfloat-text">${vn(pe)}</span>${Ee?`<span class="ch2-poemfloat-from">${vn(Ee)}</span>`:""}`;const Ce=qc([S.x,S.y,S.z],i.sky.camera,{width:window.innerWidth,height:window.innerHeight}),dt=Ce?Ce.x+40:window.innerWidth*.62,Sn=Ce?Ce.y:window.innerHeight*.42;Q.style.left=`${Math.min(Math.max(dt,110),window.innerWidth-110)}px`,Q.style.top=`${Math.min(Math.max(Sn,140),window.innerHeight-140)}px`,d.appendChild(Q),at.add(Q),Q.addEventListener("animationend",()=>{at.delete(Q),Q.remove()})}function nt(){at.forEach(S=>S.remove()),at.clear()}function Le(S){const A=R.get(S);if(!A||C===Oi||(Fn(A.x,A.y,A.z,A.ring),!ie))return;U==null||U.kill(),E=!0;const Q={o:0};ie.material.opacity=0,U=An.to(Q,{o:.8,duration:.9,ease:"sine.inOut",yoyo:!0,repeat:1,onUpdate:()=>{ie&&(ie.material.opacity=Q.o)},onComplete:()=>{U=null,E=!1,ft()}})}function Te(){_||(_=qp()),q||(i.sky.addSkyObject(_.group),q=!0)}function ge(){return C!==kn?null:Li(B)}function _t(){if(C!==kn)return;const S=Li(B);if(S){const A=tl.indexOf(S);Xt(`第${Jp[A]??A+1}站 · 「${S}」——跟着星使：点它，或凝视它`);const Q=R.get(S);Q&&(Te(),_.setVisible(!0),_.flyTo({x:Q.x,y:Q.y,z:Q.z}));return}Xt(null),m||(m=!0,Re())}function Re(){Lt(h,"on"),_&&(_.pulse(1),Nn(),ne=setTimeout(()=>{ne=null,_==null||_.setVisible(!1)},Qp))}function yt(S){if(!ha(S,ge(),B))return;const A=R.get(S);B.add(S),kt(),i.sky.hideDetailCard(),Ue(),Z(S,1.1),A&&(i.sky.spawnBurst({x:A.x,y:A.y,z:A.z},{count:90}),Ne(A),Kl(af(A.mag??4.5),.9,.85)),j(),_&&C===kn&&_.pulse(1),I=0,X=null,$=0,ut(),an(),_t()}function an(){const S=Gs(B.size,Rt());if(!(S<=z)){if(z=S,z>=4){Ke();return}ee(ue(),1.5),i.sky.spawnMeteors(z)}}function Ke(){ee(ue(),1.5),i.sky.spawnMeteors(8),Lt(f,"on"),g.classList.add("done"),Kl(523.25,1.4,.8)}function Ze(){B.clear(),kt(),m=!1,z=0,Nn(),h.classList.remove("on"),f.classList.remove("on"),g.classList.remove("done"),te(),ee(ms,.9),Oe(),I=0,X=null,$=0,L=0,ut(),C===kn&&_t()}b.addEventListener("click",Ze);function rt(S){if($=0,!S||C!==kn&&C!==fa)return;const A=S.info.name;ha(A,ge(),B)&&yt(A)}const ln=new re;function fr(){return i.sky.camera.getWorldDirection(ln),{ra:Math.atan2(ln.z,ln.x)*180/Math.PI,dec:Math.asin(Math.min(1,Math.max(-1,ln.y)))*180/Math.PI}}function Ve(){return C===kn||C===fa}function Xe(S){if(!Ve()||k.length===0||S<=0)return;const A=fr(),pe=ge()??ga(k,B,A),Ee=pe?R.get(pe):null;Ee&&io(A,Ee)<ef?(X!==Ee.name&&(X=Ee.name,I=0),I+=S,on(I/Bs),I>=Bs&&(on(0),yt(Ee.name))):(I>0||X!==null)&&(I=0,X=null,on(0))}function cn(S){if(!Ve()||ge()!==null||k.length===0){$=0;return}const A=i.sky.camera.quaternion;if(!O){O=!0,F.copy(A);return}if(F.angleTo(A)>4e-4){$=0,F.copy(A);return}if($+=S,$>=tf){$=0;const Q=ga(k,B,fr());Q&&Le(Q)}}function mi(S){if(!Ve()||z<1)return;const A=jp[Math.min(z,4)-1];if(L<=0){L=S+A;return}S>=L&&(L=S+A,i.sky.spawnMeteors(1))}function _i(S){ve=requestAnimationFrame(_i);const A=Se>0?Math.min((S-Se)/1e3,.1):0;if(Se=S,_&&q&&(_.update(A),C===kn&&ge()!==null)){const Q=.35+.2*Math.sin(S*.003);_.pulse(Math.min(1,Q+I/Bs*.5))}if(Xe(A),cn(A),mi(S),ie&&!E){const Q=tt*(1+.13*Math.sin(S*.0024));ie.scale.set(Q,Q,1),ie.material.opacity=.7+.3*Math.sin(S*.0024+1)}}function dr(S){S===Oi?(i.sky.setPickingEnabled(!1),i.sky.setLabelsEnabled(!0),i.sky.setHoverTipEnabled(!0),Un(0),Ae=!1,Xt(null),se(!1),mt(!1),yn(!1),bn(!1),_==null||_.setVisible(!1),ft()):S===kn?(i.sky.setPickingEnabled(!0),i.sky.setLabelsEnabled(!1),i.sky.setHoverTipEnabled(!0),zn(!1),Ht(-1),Ot(!1),yn(!1),bn(!1),ft(),Oe(),z=Gs(B.size,Rt()),i.sky.setBloom({strength:ue()}),g.classList.toggle("done",z>=4),m=Li(B)===null,ut(),mt(!0),se(!0),_t()):(i.sky.setPickingEnabled(!0),i.sky.setLabelsEnabled(!0),i.sky.setHoverTipEnabled(!0),zn(!1),Ht(-1),Ot(!1),Xt(null),_==null||_.setVisible(!1),ft(),Oe(),z=Gs(B.size,Rt()),i.sky.setBloom({strength:ue()}),g.classList.toggle("done",z>=4),ut(),mt(!0),se(!0),yn(!0),bn(!0))}function un(S){const A=ma(S);(A.finale>0||Ae)&&(Un(A.finale),Ae=A.finale>0),A.lines.forEach((pe,Ee)=>{const Ce=jl[Ee];if(!Ce)return;const dt=Math.max(A.finale,Ee===A.active?pe:pe*.15);for(const Sn of Ce.groups)i.sky.setGroupProgress(Sn,dt)}),zn(S<Sr);const Q=S>=Sr&&S<ii?A.active:-1;if(Ht(Q),Q>=0){const pe=Kp[Q];if(pe){const[Ee,Ce,dt]=Bt(pe.ra,pe.dec,Fo);Fn(Ee,Ce,dt,pe.ring)}}else ft();Ot(S>=ii)}function Vn(S){P=S;const A=nf(S);A!==C&&(C=A,dr(A)),C===Oi&&un(S)}function Gr(S){const A=C===Oi&&P>=Sr&&P<ii?ma(P).active:-1,Q=A>=0?.85:0;if(ze+=(Q-ze)*(1-Math.exp(-3*S)),ze<.01){ke&&(ke=!1,i.sky.setGazeBlend(0));return}const pe=Zp[Math.max(A,0)];ke?V.slerp(pe,1-Math.exp(-2.5*S)):(ke=!0,V.copy(pe)),i.sky.setGazeBlend(ze,V)}return{enter(){i.root.classList.add("inview"),H==null||H(),H=i.sky.onPick(rt),ve&&cancelAnimationFrame(ve),Se=0,ve=requestAnimationFrame(_i),Vn(P)},update(S){Vn(S)},frame(S){Gr(S)},exit(){i.root.classList.remove("inview"),cancelAnimationFrame(ve),ve=0,Se=0,H==null||H(),H=null,Nn(),te(),U==null||U.kill(),U=null,E=!1,fe(),D&&(D.kill(),D=null),i.sky.setBloom({strength:ms}),ft(),Pe==null||Pe.dispose(),Pe=null,_&&q&&(_.setVisible(!1),i.sky.removeSkyObject(_.group),q=!1),nt(),h.classList.remove("on"),f.classList.remove("on"),I=0,X=null,$=0,O=!1,L=0,ze=0,ke=!1,i.sky.setGazeBlend(0),i.sky.setLabelsEnabled(!0),i.sky.setHoverTipEnabled(!0),i.sky.setPickingEnabled(!1);for(const S of B)i.sky.setGroupProgress(S,1);zn(!1),Ht(-1),Ot(!1),Xt(null),se(!1),mt(!1),yn(!1),bn(!1),C=-1,Qt==null||Qt.suspend()}}}const i0=Object.freeze(Object.defineProperty({__proto__:null,CH2_GAZE_ANGLE_DEG:ef,CH2_GAZE_HOLD_S:Bs,CH2_GUIDE_STATIONS:tl,CH2_IDLE_PULSE_S:tf,CH2_REGIONS:pa,CH2_SEG1_END:el,CH2_SEG1_LINE_COUNT:$s,CH2_SEG2_END:Zu,CH2_SLEEP_DIM:Ju,CH2_STORAGE_KEY:ua,CH2_UNLOCKS:sf,ch2AngularDistanceDeg:io,ch2CanAwaken:ha,ch2Centroid:of,ch2GuideTarget:Li,ch2NearestSleeping:ga,ch2ParseAwakened:cf,ch2PluckFreq:af,ch2PoemExcerpt:lf,ch2RegionOf:rf,ch2Seg1LineStates:ma,ch2SegmentOf:nf,ch2UnlockTier:Gs,createChapter:r0},Symbol.toStringTag,{value:"Module"})),uf=Math.PI/180,s0=34.7,ff=8,Jr=355,_a=["冬至","小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪"];function o0(i){return-23.44*Math.cos(2*Math.PI*(i+10)/365.25)}function ya(i){return 90-Math.abs(s0-o0(i))}function Zl(i){return ff/Math.tan(ya(i)*uf)}function a0(i){let e=0,t=999,n=0;for(let r=0;r<_a.length;r++){const s=(Jr+r*15.22)%365;let o=i-s;o>182.5?o-=365:o<-182.5&&(o+=365),Math.abs(o)<t&&(t=Math.abs(o),e=r,n=o)}return{name:_a[e],index:e,day:(Jr+e*15.22)%365,offset:Math.round(n)}}function l0(i){const e=[31,28,31,30,31,30,31,31,30,31,30,31];let t=Math.min(Math.max(Math.round(i),1),365),n=0;for(;n<11&&t>e[n];)t-=e[n],n++;return{month:n+1,day:t}}const _s=["零","一","二","三","四","五","六","七","八","九"];function No(i){if(i<10)return _s[i];if(i<20)return"十"+(i%10?_s[i%10]:"");const e=Math.floor(i/10);return _s[e]+"十"+(i%10?_s[i%10]:"")}function Hr(i){return i-Math.floor(i)}function c0(i,e,t,n,r,s){i.beginPath(),i.moveTo(e+s,t),i.arcTo(e+n,t,e+n,t+r,s),i.arcTo(e+n,t+r,e,t+r,s),i.arcTo(e,t+r,e,t,s),i.arcTo(e,t,e+n,t,s),i.closePath()}function u0(){const i=document.createElement("canvas");i.width=64,i.height=64;const e=i.getContext("2d");if(e){const t=e.createRadialGradient(32,32,2,32,32,32);t.addColorStop(0,"rgba(252, 225, 182, 0.9)"),t.addColorStop(.3,"rgba(252, 225, 182, 0.25)"),t.addColorStop(1,"rgba(252, 225, 182, 0)"),e.fillStyle=t,e.fillRect(0,0,64,64)}return i}const Xr=8,_r=15,f0=`
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
`;let Jl=!1;function d0(){if(Jl||typeof document>"u")return;const i=document.createElement("style");i.dataset.gnomonWidget="",i.textContent=f0,document.head.appendChild(i),Jl=!0}function h0(i={}){d0();const e=document.createElement("div");e.className="gw",e.setAttribute("role","group"),e.setAttribute("aria-label","圭表测影：拖动滑杆查看一年中正午日影变化");const t=document.createElement("canvas");t.className="gw-canvas",e.appendChild(t);const n=document.createElement("div");n.className="gw-readout",n.innerHTML=`
    <div class="gw-cell"><span class="gw-k">日期</span><span class="gw-v" data-r="date">——</span></div>
    <div class="gw-cell"><span class="gw-k">节气</span><span class="gw-v" data-r="term">——</span></div>
    <div class="gw-cell"><span class="gw-k">正午影长</span><span class="gw-v" data-r="shadow">——</span></div>
    <div class="gw-cell"><span class="gw-k">太阳高度</span><span class="gw-v" data-r="alt">——</span></div>`,e.appendChild(n);const r=n.querySelector('[data-r="date"]'),s=n.querySelector('[data-r="term"]'),o=n.querySelector('[data-r="shadow"]'),a=n.querySelector('[data-r="alt"]'),l=document.createElement("div");l.className="gw-slider-wrap";const c=document.createElement("input");c.className="gw-slider",c.type="range",c.min="1",c.max="365",c.step="1",c.value=String(Jr),c.setAttribute("aria-label","一年中的第几天"),l.appendChild(c);const u=document.createElement("div");u.className="gw-marks";for(const m of["冬至","春分","夏至","秋分"]){const z=_a.indexOf(m),I=(Jr+z*15.22)%365,X=(I-1)/364,$=`calc(7px + (100% - 14px) * ${X.toFixed(4)})`,F=document.createElement("i");F.className="gw-tick",F.style.left=$,u.appendChild(F);const O=document.createElement("button");O.type="button",O.className="gw-mark"+(X<.08?" gw-mark--start":X>.92?" gw-mark--end":""),O.style.left=$,O.textContent=m,O.title=`跳至${m}（第 ${Math.round(I)} 天）`,O.addEventListener("click",()=>M(Math.round(I))),u.appendChild(O)}l.appendChild(u),e.appendChild(l);const d=t.getContext("2d");if(!d){const m=document.createElement("p");m.className="gw-fallback",m.textContent="当前浏览器无法创建绘图上下文，圭表测影演示不可用。",t.replaceWith(m)}const h=u0(),f=Array.from({length:14},(m,z)=>({rx:Hr(Math.sin(z*12.9898)*43758.5453),ry:Hr(Math.sin(z*78.233)*12543.217),len:.1+.25*Hr(Math.sin(z*3.7)*9876.543),dark:z%2===0})),g=Array.from({length:5},(m,z)=>({dx:-.3+.6*Hr(Math.sin(z*5.13)*3210.7),ry:.12+.76*Hr(Math.sin(z*9.31)*7777.7),h:.08+.12*Hr(Math.sin(z*2.17)*5555.5)}));let p=Jr,y=Jr,v=!1,b=!0,x=0,w=0,T=0;function M(m){y=Math.min(Math.max(m,1),365),k()}function k(){x||(x=requestAnimationFrame(R))}function R(){var X;x=0;const m=p,z=y-p;p=Math.abs(z)<.04?y:p+z*.2;const I=p!==m;(I||b)&&(C(),P(),b=!1),I&&((X=i.onDayChange)==null||X.call(i,p)),p!==y&&(x=requestAnimationFrame(R))}function C(){const m=Math.min(Math.max(Math.round(p),1),365),z=l0(m);r.textContent=`${z.month} 月 ${z.day} 日 · 第 ${m} 天`;const I=a0(m);s.textContent=I.offset===0?`正值【${I.name}】`:I.offset>0?`【${I.name}】后 ${I.offset} 天`:`距【${I.name}】 ${-I.offset} 天`;const X=Zl(p);let $=Math.floor(X),F=Math.round((X-$)*10);F===10&&($+=1,F=0),o.textContent=`${No($)}尺${F>0?No(F)+"寸":"整"} · ${X.toFixed(2)} 尺`,a.textContent=`${ya(p).toFixed(1)}°`,!v&&document.activeElement!==c&&(c.value=String(m))}function P(){if(!d||w<60||T<60)return;const m=d,z=w,I=T;m.clearRect(0,0,z,I);const X=m.createLinearGradient(0,0,0,I);X.addColorStop(0,"rgba(22, 38, 56, 0.5)"),X.addColorStop(.6,"rgba(13, 13, 17, 0.12)"),X.addColorStop(1,"rgba(13, 13, 17, 0.4)"),m.fillStyle=X,m.fillRect(0,0,z,I);const $=Zl(p),F=ya(p),O=Math.min(Math.max(F,6),82)*uf,L=I-62,_=Math.min((z-150)/14.2,(L-92)/8),q=ff*_,K=13.6*_,D=(z-K-110)/2+100,W=L-q,U=D+$*_,ne=D-12,H=D+K,ve=m.createRadialGradient(D-60,L,0,D-60,L,220);ve.addColorStop(0,`rgba(252, 225, 182, ${(.05+.04*Math.sin(O)).toFixed(3)})`),ve.addColorStop(1,"rgba(252, 225, 182, 0)"),m.fillStyle=ve,m.fillRect(0,L-160,z,200),m.strokeStyle="rgba(175, 145, 95, 0.35)",m.lineWidth=1,m.beginPath(),m.moveTo(14,L+_r),m.lineTo(z-14,L+_r),m.stroke();const Se=m.createLinearGradient(0,L,0,L+Xr);Se.addColorStop(0,"#3b4552"),Se.addColorStop(1,"#252d38"),m.fillStyle=Se,c0(m,ne,L,H-ne,Xr,2.5),m.fill();const at=m.createLinearGradient(0,L+Xr,0,L+_r);at.addColorStop(0,"#1a212b"),at.addColorStop(1,"#10151d"),m.fillStyle=at,m.fillRect(ne,L+Xr,H-ne,_r-Xr),m.strokeStyle="rgba(252, 225, 182, 0.14)",m.beginPath(),m.moveTo(ne+2,L+.5),m.lineTo(H-2,L+.5),m.stroke();for(const de of f){const Ie=ne+6+de.rx*(H-ne-12),ct=L+1.5+de.ry*(_r-3);m.strokeStyle=de.dark?"rgba(0, 0, 0, 0.16)":"rgba(252, 225, 182, 0.05)",m.beginPath(),m.moveTo(Ie,ct),m.lineTo(Ie+de.len*40,ct),m.stroke()}const ze=_>=26;m.lineWidth=1;for(let de=0;de<=136;de++){const Ie=de%10===0;if(!Ie&&!ze&&de%5!==0)continue;const ct=D+de*_/10;if(ct>H-1.5)break;const Fe=Ie?6:de%5===0?4:2.5;m.strokeStyle=Ie?"rgba(8, 10, 14, 0.9)":"rgba(8, 10, 14, 0.6)",m.beginPath(),m.moveTo(ct,L+1),m.lineTo(ct,L+1+Fe),m.stroke()}m.font='9px "STSong", "SimSun", "Songti SC", serif',m.fillStyle="rgba(175, 145, 95, 0.9)",m.textAlign="center",m.textBaseline="top";for(let de=0;de<=13;de++){const Ie=D+de*_;if(Ie>H-2)break;m.fillText(No(de),Ie,L+_r+4)}const ke=m.createLinearGradient(D,0,U,0);ke.addColorStop(0,"rgba(3, 5, 9, 0.78)"),ke.addColorStop(.75,"rgba(3, 5, 9, 0.55)"),ke.addColorStop(1,"rgba(3, 5, 9, 0.15)"),m.fillStyle=ke,m.fillRect(D,L+1,Math.max(U-D,1.5),Xr-1),m.strokeStyle="#c9a227",m.lineWidth=1.5,m.beginPath(),m.moveTo(U,L-4),m.lineTo(U,L+_r),m.stroke(),m.save(),m.translate(U,L-7),m.rotate(Math.PI/4),m.fillStyle="#c9a227",m.fillRect(-2.4,-2.4,4.8,4.8),m.restore();const V=Math.max(6,_*.38),ie=m.createLinearGradient(D-V/2,0,D+V/2,0);ie.addColorStop(0,"#3f2e1a"),ie.addColorStop(.35,"#a87f3d"),ie.addColorStop(.5,"#dcba68"),ie.addColorStop(.65,"#a87f3d"),ie.addColorStop(1,"#372812"),m.fillStyle=ie,m.fillRect(D-V/2,W,V,q);for(const de of g)m.fillStyle="rgba(112, 148, 126, 0.14)",m.fillRect(D+de.dx*V-.75,W+de.ry*q,1.5,de.h*q);m.fillStyle="#8a6a35",m.beginPath(),m.moveTo(D-V*.85,W),m.lineTo(D-V*.42,W-6),m.lineTo(D+V*.42,W-6),m.lineTo(D+V*.85,W),m.closePath(),m.fill(),m.strokeStyle="rgba(252, 225, 182, 0.35)",m.lineWidth=1,m.beginPath(),m.moveTo(D-V*.42,W-6),m.lineTo(D+V*.42,W-6),m.stroke();const Ye=m.createLinearGradient(0,L-11,0,L);Ye.addColorStop(0,"#5a4423"),Ye.addColorStop(1,"#2c2010"),m.fillStyle=Ye,m.beginPath(),m.moveTo(D-V*.8,L-11),m.lineTo(D+V*.8,L-11),m.lineTo(D+V*1.7,L),m.lineTo(D-V*1.7,L),m.closePath(),m.fill(),m.font='10px "STSong", "SimSun", "Songti SC", serif',m.fillStyle="rgba(201, 162, 39, 0.8)",m.textAlign="center",m.textBaseline="top";const tt=D-V/2-11;"表高八尺".split("").forEach((de,Ie)=>{m.fillText(de,tt,W+18+Ie*13)});const E=-Math.cos(O),Pe=-Math.sin(O);let lt=Math.min(170,(W-28)/Math.sin(O),(D-30)/Math.cos(O));lt=Math.max(lt,26);const gt=D+E*lt,me=W+Pe*lt;m.drawImage(h,gt-30,me-30,60,60),m.fillStyle="#fce1b6",m.beginPath(),m.arc(gt,me,8.5,0,Math.PI*2),m.fill(),m.strokeStyle="rgba(201, 162, 39, 0.75)",m.lineWidth=1,m.beginPath(),m.arc(gt,me,11.5,0,Math.PI*2),m.stroke(),m.strokeStyle="rgba(252, 225, 182, 0.4)",m.beginPath(),m.moveTo(gt-E*12,me-Pe*12),m.lineTo(D,W),m.stroke(),m.setLineDash([3,4]),m.strokeStyle="rgba(252, 225, 182, 0.22)",m.beginPath(),m.moveTo(D,W),m.lineTo(U,L),m.stroke(),m.setLineDash([])}c.addEventListener("input",()=>{const m=Number(c.value);y=m,v||(p=m),k()}),c.addEventListener("pointerdown",()=>{v=!0}),window.addEventListener("pointerup",()=>{v=!1}),window.addEventListener("pointercancel",()=>{v=!1});function B(){const m=t.clientWidth,z=t.clientHeight;if(!(m===w&&z===T)){if(w=m,T=z,d&&m>0&&z>0){const I=Math.min(window.devicePixelRatio||1,2);t.width=Math.round(m*I),t.height=Math.round(z*I),d.setTransform(I,0,0,I,0,0)}b=!0,k()}}return typeof ResizeObserver<"u"?new ResizeObserver(B).observe(t):window.addEventListener("resize",B),B(),{el:e,get day(){return p},setDayTarget:M}}const p0=`
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
`;let ec=!1;function g0(){if(ec||typeof document>"u")return;const i=document.createElement("style");i.dataset.gnomonLayout="",i.textContent=p0,document.head.appendChild(i),ec=!0}function vi(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function tc(i){return i/365*Math.PI*2}function m0(i){const e=i.root.querySelector(".pin"),{copy:t}=i,n=document.createElement("div");n.className="gnomon-layout";const r=document.createElement("div");r.className="chapter-panel",r.innerHTML=`
    <p class="eyebrow">${vi(t.eyebrow)}</p>
    <div class="chapter-head">
      <h2>${vi(t.title)}</h2>
      ${t.seal?`<div class="seal">${vi(t.seal)}</div>`:""}
    </div>
    <p class="hook">${vi(t.hook)}</p>
    ${t.body.map(a=>`<p>${vi(a)}</p>`).join("")}
  `,n.appendChild(r);let s=!1;const o=h0({onDayChange:a=>{s&&i.sky.setSkyRotation(tc(a),0)}});return n.appendChild(o.el),e.appendChild(n),g0(),{enter(){s=!0,i.root.classList.add("inview"),i.sky.setLabelsEnabled(!1),i.sky.setSkyRotation(tc(o.day),0)},update(a){const l=Math.min(Math.max(a,0),1);o.setDayTarget(1+l*364)},exit(){s=!1,i.root.classList.remove("inview"),i.sky.setLabelsEnabled(!0),i.sky.setSkyRotation(0,0)}}}const _0=Object.freeze(Object.defineProperty({__proto__:null,createChapter:m0},Symbol.toStringTag,{value:"Module"})),y0={ch1:{eyebrow:"其壹 · 序 PROLOGUE",title:"步天歌",hook:"三千年前，中国人开始给星星命名。",body:["先民把群星分作星官，各有职司。到三国陈卓汇总三家星经时，这张名单已录下二百八十三官、一千四百六十余星。","《步天歌》是把整张星表写成的长诗，一句一宿，循诗可以认星。本站以它为题，把这份名录还原成一片可以走进去的夜空。","向下滚动，步入夜空。"],seal:"步"},ch2:{eyebrow:"其贰 · 唤星之旅 THE AWAKENING",title:"唤星之旅",hook:"夜空睡着了。跟着流萤，把星星一颗颗唤回来。",body:["古人认星，靠一首歌。《步天歌》把全天星官谱成韵语，一句一宿，循诗可以认星。","三垣居中，四象环列——中国人给天空立的法。","余下的星，由你亲手唤醒。拖拽环视，点击或凝视任意一颗沉睡的星，听听它的那句诗。"],seal:"唤"},ch3:{eyebrow:"其叁 · 观象授时 THE GNOMON",title:"观象授时",hook:"一根八尺之表，一条量影之圭，就是一个王朝的天文台。",body:["正午测日影：影最长的那一天是冬至，最短的那一天是夏至。两至既定，四时均分，二十四节气由此排出。","河南登封至今立着这件仪器的放大版：元代郭守敬所建观星台，以高表测影，为《授时历》测得回归年长 365.2425 日——与三百年后的格里历相同。","所谓观象授时：历法的权威，来自对天空的测量。"],seal:"表"},ch4:{eyebrow:"其肆 · 天人之间 THE POLE STAR",title:"天人之间",hook:"全天最尊贵的星域，围着北极建了一座城。",body:["紫微垣，天上的宫城：左右两垣为墙，墙内住着皇族、帝座与百官。","天的秩序映照人的秩序——星官有名有职，如同朝廷。观星，也是观天下。"],seal:"极"},ch5:{eyebrow:"其伍 · 天球仪 THE CELESTIAL SPHERE",title:"天球仪",hook:"「浑天如鸡子，天体圆如弹丸，地如鸡中黄。」——张衡《浑天仪注》",body:["东汉张衡造浑天仪：铜球缀列星，绕轴而转，演示周天星象的起落。天，被做成一颗可以转动的球。","在这里，平面的星图重新团回天球。用你的手指转动它，像转动一件两千年前的仪器。"],seal:"球"},ch6:{eyebrow:"其陆 · 岁差 PRECESSION",title:"一万年",hook:"地轴是一支缓慢摇晃的陀螺，约两万六千年才转完一圈。",body:["东晋虞喜最先察觉：冬至点每年都在悄悄西移，约五十年退一度。他称之为「岁差」——天自为天，岁自为岁。","于是北极星也会换届：三千年前，周的天下以「帝星」（小熊座β）为北辰；今夜属于勾陈一；一万年后，织女星将接过这个位置。","拖动时间，看天极在星空中缓缓画出一个圆。"],seal:"岁"},ch7:{eyebrow:"其柒 · 东西对话 EAST MEETS WEST",title:"东西对话",hook:"同一片星空，两种秩序各自连线。",body:["中国的天狼是一颗独坐的星官，守在南方朱雀的井宿之野，主侵掠；在希腊人的图上，它是大犬座 α，猎户脚边的猎犬。","中国的织女是银河西岸的织女星官，七夕故事的主角；在西方，她是天琴座 α——俄耳甫斯的竖琴。","北斗七星在中国是帝车，运于中央、临制四方；同七颗星，在西方只是大熊的尾巴与后臀。"],seal:"会"},ch8:{eyebrow:"其捌 · 尾声 CREDITS",title:"尾声",hook:"缘起于一首旧诗，收束于一页致谢。",body:["本作品以《步天歌》为题——一卷把星官谱成韵语、便于记诵认星的旧诗。千年之后，诗里的星仍在原处，我们只是换了一种读法。","数据、开源技术与制作说明列于下方。本站为中国大学生计算机设计大赛参赛作品（信息可视化设计类）。"],seal:"跋"}},ys=[{key:"北极",groups:["北极"],title:"北极五星 · 皇族",story:"太子、帝、庶子、后宫、天枢——天皇一家，以星列位。",labels:[{text:"太子",star:"北极一"},{text:"帝",star:"北极二"},{text:"庶子",star:"北极三"},{text:"后宫",star:"北极四"},{text:"天枢",star:"北极五"}]},{key:"勾陈",groups:["勾陈"],title:"勾陈 · 后宫车马",story:"帝之后妃的车驾，形如弯钩。其中最亮的勾陈一，就是今夜的北极星。",labels:[{text:"勾陈一",star:"勾陈一"}]},{key:"帝座",groups:["天皇大帝","五帝内座"],title:"天皇大帝 · 帝座",story:"天皇大帝居中而御，五帝内座环侍在旁——天上至尊的宝座。",labels:[{text:"天皇大帝",star:"天皇大帝"}]},{key:"百官",groups:["尚书","大理","天柱"],title:"尚书 · 大理 · 天柱",story:"秘书、法官、政令——一座悬浮的朝廷。",labels:[{text:"尚书",star:"尚书一"},{text:"大理",star:"大理一"},{text:"天柱",star:"天柱一"}]},{key:"拱北",groups:[],title:"回望 · 众星拱北",story:"「譬如北辰，居其所而众星共之。」——《论语·为政》"}],nc={heading:"数据与出处",groups:[{title:"数据来源",lines:["HYG Database v4.4 · CC BY-SA-4.0 · astronexus.com","许可协议：https://creativecommons.org/licenses/by-sa/4.0/","Stellarium 项目 · 中国星空文化数据","《步天歌》 · 丹元子 · 公有领域文本"]},{title:"开源技术",lines:["three.js","GSAP / ScrollTrigger","Vite","TypeScript","Noto Serif SC（思源宋体）· SIL OFL 1.1"]},{title:"制作说明",lines:["AI 辅助设计与编码","全部内容经人工校订"]}]};function yo(i){return Math.min(Math.max(i,0),1)}function ba(i){const e=yo(i);return e*e*(3-2*e)}const Ir=.12,Ar=.92,Rr=5,as=(Ar-Ir)/Rr,nl=Ir+4*as,df=.03,hf=.45;function Ys(i){const e=yo(i);return e<Ir?0:e>=Ar?6:1+Math.min(Math.floor((e-Ir)/as),Rr-1)}function pf(i){return yo(i/Ir)}function gf(i,e){const t=Ir+e*as;return yo((i-t)/(as*hf))}function va(i){const e=ba((i-(nl-.02))/.02),t=1-ba((i-Ar)/.05);return e*t}function mf(i,e){const t=new Set;let n=0;return e.map(r=>{if(r){const o=i.find(a=>!t.has(a.hip)&&a.name===r);if(o)return t.add(o.hip),o}for(;n<i.length&&t.has(i[n].hip);)n++;const s=i[n];return s?(t.add(s.hip),n++,s):null})}const _f=[{ra:175,dec:81,radius:.35,fov:50,gazeW:.85},{ra:218.6,dec:76.8,radius:.55,fov:42,gazeW:.85},{ra:269.6,dec:86.5,radius:.55,fov:42,gazeW:.85},{ra:41.8,dec:81,radius:.55,fov:42,gazeW:.85},{ra:261.7,dec:75.5,radius:.55,fov:42,gazeW:.85},{ra:0,dec:89,radius:.55,fov:55,gazeW:.85}],so={radius:3,dir:[.52,.7,.49],fov:50},rc=100,b0=["紫微左垣","紫微右垣"],v0=["第一站","第二站","第三站","第四站","第五站"],x0="序 · 天上有座城",w0=28,ic=44,bs=60,yf=_f.map(i=>({dir:new re(...Bt(i.ra,i.dec,1)),radius:i.radius,fov:i.fov,gazeQ:Qn(i.ra,i.dec),gazeW:i.gazeW})),S0=new re(...so.dir).normalize(),xi=yf[Rr],k0=`
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
  width: ${w0}px; height: 1px;
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
`;let sc=!1;function T0(){if(sc||typeof document>"u")return;const i=document.createElement("style");i.dataset.ch4="",i.textContent=k0,document.head.appendChild(i),sc=!0}function wi(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function E0(i){T0();const e=i.root.querySelector(".pin"),{copy:t}=i,n=document.createElement("div");n.className="ch4-card ch4-opening",n.innerHTML=`
    <p class="eyebrow">${wi(t.eyebrow)}</p>
    <div class="chapter-head">
      <h2>${wi(t.title)}</h2>
      ${t.seal?`<div class="seal">${wi(t.seal)}</div>`:""}
    </div>
    <p class="ch4-opening-tag">${x0}</p>
    <p class="hook">${wi(t.hook)}</p>
    ${t.body.map(O=>`<p class="ch4-opening-body">${wi(O)}</p>`).join("")}
  `,e.appendChild(n);const r=document.createElement("div");r.className="ch4-card ch4-stop",r.innerHTML=`
    <p class="ch4-stop-tag"></p>
    <h3 class="ch4-stop-title"></h3>
    <p class="ch4-stop-story"></p>
  `,e.appendChild(r);const s=r.querySelector(".ch4-stop-tag"),o=r.querySelector(".ch4-stop-title"),a=r.querySelector(".ch4-stop-story"),l=document.createElement("div");l.className="ch4-layer";const c=[];ys.forEach((O,L)=>{(O.labels??[]).forEach((_,q)=>{const K=document.createElement("div");K.className="ch4-tag";const D=document.createElement("i");D.className="ch4-tag-dot";const W=-90+q*137.5,U=W*Math.PI/180,ne=document.createElement("i");ne.className="ch4-tag-line",ne.style.transform=`rotate(${W}deg)`;const H=document.createElement("span");H.className="ch4-tag-name",H.textContent=_.text,H.style.transform=`translate(${Math.cos(U)*ic}px, ${Math.sin(U)*ic}px) translate(-50%, -50%)`,K.append(D,ne,H),l.appendChild(K),c.push({el:K,stopIdx:L,labelIdx:q,shown:!1})})}),e.appendChild(l);let u=null;Promise.all([fetch(On("data/stars.json")).then(O=>O.ok?O.json():null),fetch(On("data/asterisms.json")).then(O=>O.ok?O.json():null)]).then(([O,L])=>{if(!O||!L)return;const _=new Map(O.stars.map(K=>[K.hip,K])),q=new Map(L.asterisms.map(K=>[K.name,K]));u=ys.map(K=>{const D=K.groups.flatMap(U=>{var ne;return(((ne=q.get(U))==null?void 0:ne.stars)??[]).map(H=>_.get(H)).filter(H=>H!==void 0)});return mf(D,(K.labels??[]).map(U=>U.star)).map(U=>{if(!U)return null;const[ne,H,ve]=Bt(U.ra,U.dec,rc);return new re(ne,H,ve)})})}).catch(()=>{});let d=!1,h=0,f=!1,g=.35,p=50;const y=new re(0,1,0),v=new Wt;let b=0,x=0,w=0,T=!1,M=-1;function k(O){T!==O&&(T=O,n.classList.toggle("on",O))}function R(O){if(M===O)return;if(M=O,O<0){r.classList.remove("on");return}const L=ys[O];L&&(s.textContent=v0[O]??`第${O+1}站`,o.textContent=L.title,a.textContent=L.story,r.classList.add("on"),r.classList.remove("swap"),r.offsetWidth,r.classList.add("swap"))}function C(O,L){O.shown!==L&&(O.shown=L,O.el.classList.toggle("on",L))}function P(){for(const O of c)C(O,!1)}function B(O){h=O;const L=Ys(O),_=pf(O);for(const q of b0)i.sky.setGroupProgress(q,_);ys.forEach((q,K)=>{const D=gf(O,K);for(const W of q.groups)i.sky.setGroupProgress(W,D)}),k(L===0),R(L>=1&&L<=Rr?L-1:L===6?Rr-1:-1)}const m=new re,z=new re;function I(O,L,_){const q=Math.cos(L),K=Math.sin(L);return _.set(O.x*q+O.z*K,O.y,-O.x*K+O.z*q)}function X(O){const L=h,_=Ys(L);let q,K,D;const W=z;let U;if(_===6){const H=ba((L-Ar)/(1-Ar));q=Me.lerp(xi.radius,so.radius,H),K=Me.lerp(xi.fov,so.fov,H),D=(1-H)*xi.gazeW,W.copy(xi.dir).lerp(S0,H).normalize(),U=xi.gazeQ}else{const H=yf[_];q=H.radius,K=H.fov,D=H.gazeW,W.copy(H.dir),U=H.gazeQ}if(!f){f=!0;const H=i.sky.camera;g=Math.max(H.position.length()/rc,.005),p=H.fov,y.copy(H.position).normalize(),y.lengthSq()<1e-8&&y.set(0,1,0),v.copy(H.quaternion),b=1}const ne=1-Math.exp(-3*O);g+=(q-g)*ne,p+=(K-p)*ne,y.lerp(W,ne).normalize(),b+=(D-b)*ne,v.slerp(U,1-Math.exp(-2.5*O)),i.sky.setRadius(g),i.sky.setPositionDir(y),i.sky.setFov(p),b<.005&&D===0?i.sky.setGazeBlend(0):i.sky.setGazeBlend(b,v)}function $(O){const L=h;L>=nl&&L<Ar?x+=df*O:va(L)===0&&(x=0);const _=x*va(L);Math.abs(_-w)>1e-6&&(w=_,i.sky.setSkyRotation(_,0))}function F(){var K;const O=Ys(h),L=O>=1&&O<=Rr?O-1:-1,_=window.innerWidth,q=window.innerHeight;for(const D of c){const W=(K=u==null?void 0:u[D.stopIdx])==null?void 0:K[D.labelIdx];if(D.stopIdx!==L||!W){C(D,!1);continue}I(W,w,m);const U=qc([m.x,m.y,m.z],i.sky.camera,{width:_,height:q});if(!U||U.x<-bs||U.x>_+bs||U.y<-bs||U.y>q+bs){C(D,!1);continue}D.el.style.left=`${U.x}px`,D.el.style.top=`${U.y}px`,C(D,!0)}}return{enter(){i.root.classList.add("inview"),d=!0,f=!1,i.sky.setLabelsEnabled(!1),B(h)},update(O){B(O)},frame(O){d&&(X(O),$(O),F())},exit(){i.root.classList.remove("inview"),d=!1,f=!1,x=0,w=0,i.sky.setSkyRotation(0,0),i.sky.setGazeBlend(0),i.sky.setLabelsEnabled(!0),k(!1),R(-1),P()}}}const C0=Object.freeze(Object.defineProperty({__proto__:null,CH4_CAM_STOPS:_f,CH4_GROW_FRAC:hf,CH4_OPENING_END:Ir,CH4_RELEASE:so,CH4_ROT_SPEED:df,CH4_ROT_START:nl,CH4_STOP_COUNT:Rr,CH4_STOP_SPAN:as,CH4_TOUR_END:Ar,ch4MatchLabels:mf,ch4RotationWeight:va,ch4SegmentOf:Ys,ch4StopGrowth:gf,ch4WallsGrowth:pf,createChapter:E0},Symbol.toStringTag,{value:"Module"})),bf=1.2,M0=90,P0=7,A0=.7,oc=.55,R0=1.5;function O0(i){return Me.clamp(1-i/bf,0,1)}function L0(i){return Math.exp(-.9*i)}const vf=new re(0,1,0),xf=new re(1,0,0);let vs;function wf(){if(vs!==void 0)return vs;if(typeof document>"u")return vs=null;const i=document.createElement("canvas");i.width=i.height=64;const e=i.getContext("2d"),t=e.createRadialGradient(32,32,0,32,32,32);return t.addColorStop(0,"rgba(255, 252, 244, 1)"),t.addColorStop(.35,"rgba(255, 240, 205, 0.85)"),t.addColorStop(1,"rgba(255, 240, 205, 0)"),e.fillStyle=t,e.fillRect(0,0,64,64),vs=new po(i)}function D0(i,e={}){const t=Math.max(1,Math.floor(e.count??M0)),n=e.speed??P0,r=e.rand??Math.random,s=new re(i.x,i.y,i.z);s.lengthSq()<1e-8&&s.set(0,1,0),s.normalize();const o=new re().crossVectors(s,Math.abs(s.y)<.99?vf:xf).normalize(),a=new re().crossVectors(s,o),l=new Float32Array(t*3),c=new Float32Array(t*3);for(let v=0;v<t;v++){l[v*3]=i.x,l[v*3+1]=i.y,l[v*3+2]=i.z;const b=n*(oc+(1-oc)*r()),x=n*A0*r(),w=r()*Math.PI*2,T=Math.cos(w)*x,M=Math.sin(w)*x;c[v*3]=s.x*b+o.x*T+a.x*M,c[v*3+1]=s.y*b+o.y*T+a.y*M,c[v*3+2]=s.z*b+o.z*T+a.z*M}const u=new Zi;u.setAttribute("position",new nr(l,3));const d=u.getAttribute("position"),h=new Uc({size:R0,sizeAttenuation:!0,map:wf()??null,color:16771512,transparent:!0,opacity:1,depthWrite:!1,blending:zr}),f=new za(u,h);f.name="burst";let g=0,p=!1;const y={object:f,update(v){if(p)return!1;if(g+=v,g>=bf)return y.dispose(),!1;const b=L0(v);for(let x=0;x<c.length;x++)c[x]*=b,l[x]+=c[x]*v;return d.needsUpdate=!0,h.opacity=O0(g),!0},dispose(){p||(p=!0,f.removeFromParent(),u.dispose(),h.dispose())}};return y}const ac=1,z0=1.5,lc=.6,I0=1.15,F0=.21,Wr=24,N0=.35,$0=1.8;function B0(i){return Math.sin(Math.PI*Math.min(1,Math.max(0,i)*1.15))}function cc(i,e,t,n){const r=Math.cos(t),s=Math.sin(t);return n.set(i.x*r+e.x*s,i.y*r+e.y*s,i.z*r+e.z*s)}function uc(i,e){const t=i()*2-1,n=i()*Math.PI*2,r=Math.sqrt(Math.max(0,1-t*t));return e.set(r*Math.cos(n),t,r*Math.sin(n))}function G0(i,e={}){const t=e.rand??Math.random,n=uc(t,new re),r=uc(t,new re),s=r.addScaledVector(n,-r.dot(n));s.lengthSq()<1e-6&&s.crossVectors(n,Math.abs(n.y)<.99?vf:xf),s.normalize();const o=lc+(I0-lc)*t(),a=ac+(z0-ac)*t(),l=N0*t(),c=new Float32Array((Wr+1)*3),u=new Float32Array((Wr+1)*3);for(let R=0;R<=Wr;R++){const C=Math.pow(1-R/Wr,.75);u[R*3]=C,u[R*3+1]=C*.92,u[R*3+2]=C*.72}const d=new Zi;d.setAttribute("position",new nr(c,3)),d.setAttribute("color",new nr(u,3));const h=d.getAttribute("position"),f=new Vc({vertexColors:!0,transparent:!0,opacity:0,depthWrite:!1,blending:zr}),g=new td(d,f),p=new Zi;p.setAttribute("position",new nr(new Float32Array(3),3));const y=p.getAttribute("position"),v=new Uc({size:$0,sizeAttenuation:!0,map:wf()??null,color:16774102,transparent:!0,opacity:0,depthWrite:!1,blending:zr}),b=new za(p,v),x=new wn;x.name="meteor",x.add(g),x.add(b),x.visible=!1;let w=0,T=!1;const M=new re,k={object:x,update(R){if(T)return!1;w+=R;const C=(w-l)/a;if(C>=1)return k.dispose(),!1;if(C<0)return!0;x.visible=!0;const P=B0(C),B=o*C;for(let m=0;m<=Wr;m++){const z=Math.max(0,B-F0*(m/Wr));cc(n,s,z,M).multiplyScalar(i),c[m*3]=M.x,c[m*3+1]=M.y,c[m*3+2]=M.z}return h.needsUpdate=!0,f.opacity=P*.9,cc(n,s,B,M).multiplyScalar(i),y.setXYZ(0,M.x,M.y,M.z),y.needsUpdate=!0,v.opacity=P,!0},dispose(){T||(T=!0,x.removeFromParent(),d.dispose(),f.dispose(),p.dispose(),v.dispose())}};return k}const ye=100,Y0=.97,H0=24,$o={strength:.78,radius:.55,threshold:.58},fc=1.2*ye,X0=5,dc=.2*Math.PI/180,hc=89*Math.PI/180,pc=.8*ye,W0=1.2*ye,q0=.4,U0=.05,V0=120,gc=.35,Si=new re(0,1,0),j0=new re(0,0,0);function Q0(i){return i=Me.clamp(i,0,1),i*i*(3-2*i)}const ho=class ho{constructor(e){G(this,"canvas");G(this,"renderer");G(this,"scene");G(this,"camera");G(this,"pipeline");G(this,"quality");G(this,"card");G(this,"labelLayerEl");G(this,"hoverNdc",null);G(this,"hoverRing");G(this,"hoverTip");G(this,"sky",null);G(this,"labels",null);G(this,"labelsShown",!1);G(this,"skyRoot",new wn);G(this,"tmpSkyMat",new Vo);G(this,"tmpSkyQ",new Wt);G(this,"tmpSkyQY",new Wt);G(this,"starPositions",null);G(this,"starList",[]);G(this,"nameByHip",new Map);G(this,"hipToAsterism",new Map);G(this,"poem",null);G(this,"pickListeners",new Set);G(this,"gazeYaw",-Math.PI/2);G(this,"gazePitch",80*Math.PI/180);G(this,"orbitQ",new Wt);G(this,"ctlRadius",1);G(this,"ctlDir",new re(0,1,0));G(this,"ctlFov",78);G(this,"ctlGazeBlend",0);G(this,"ctlGazeTargetQ",null);G(this,"ctlDrift",0);G(this,"driftAngle",0);G(this,"ctlOrbit",0);G(this,"pickingEnabled",!1);G(this,"labelsEnabled",!0);G(this,"hoverTipEnabled",!0);G(this,"blendK",0);G(this,"dragging",!1);G(this,"lastX",0);G(this,"lastY",0);G(this,"downX",0);G(this,"downY",0);G(this,"orbitVelX",0);G(this,"orbitVelY",0);G(this,"lastOrbitMoveT",0);G(this,"clock",new nd);G(this,"elapsed",0);G(this,"frameHook",null);G(this,"started",!1);G(this,"timeScale",1);G(this,"effects",[]);G(this,"gazeEuler",new Pi(0,0,0,"YXZ"));G(this,"gazeQ",new Wt);G(this,"insideQ",new Wt);G(this,"centerLookQ",new Wt);G(this,"centerLookMat",new Vo);G(this,"driftQ",new Wt);G(this,"tmpPos",new re);G(this,"resize",()=>{const e=this.tierDpr();this.renderer.setPixelRatio(e),this.renderer.setSize(window.innerWidth,window.innerHeight),this.pipeline.setSize(window.innerWidth,window.innerHeight),this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.sky&&(this.sky.starMaterial.uniforms.uPixelRatio.value=e),this.labels&&this.labels.renderer.setSize(window.innerWidth,window.innerHeight)});G(this,"frame",()=>{var s;const e=Math.min(this.clock.getDelta(),.1),t=e*this.timeScale;this.quality.update(e),(s=this.frameHook)==null||s.call(this,t),this.updateCamera(t),this.updateHover(),this.updateEffects(t);const n=this.camera.position.length(),r=this.sky;if(r&&(this.elapsed+=t,r.setTime(this.elapsed),r.starMaterial.uniforms.uDistBoost.value=hd(n,ye),r.gridMaterial.opacity=.1+.16*Me.clamp(n/ye-1,0,1),n>=ye&&!this.card.el.hidden&&this.card.hide()),this.labels){const o=this.labelsEnabled?Me.clamp((fc-n)/(fc-ye),0,1):0,a=o>.01;a!==this.labelsShown&&(this.labelsShown=a,this.labels.setVisible(a)),a&&(this.labels.renderer.domElement.style.opacity=o.toFixed(3),this.labels.update(this.camera))}this.pipeline.render(),this.labels&&this.labelsShown&&this.labels.renderer.render(this.scene,this.camera)});this.canvas=e,this.renderer=new rd({canvas:e,antialias:!0,alpha:!0}),this.renderer.setClearColor(0,0),this.scene=new id,this.scene.add(this.skyRoot),this.camera=new sd(78,1,.1,2e3),this.pipeline=od(this.renderer,this.scene,this.camera,$o),this.quality=ad(s=>{this.pipeline.setEnabled(s<2),this.pipeline.setBloom({strength:s===0?$o.strength:$o.strength*.5}),this.resize()}),this.labelLayerEl=document.createElement("div"),this.labelLayerEl.style.cssText="position:fixed;inset:0;pointer-events:none;z-index:5;",document.body.appendChild(this.labelLayerEl),this.card=ld(document.body),this.onPick(s=>{s?this.card.show(s.info,s.x,s.y):this.card.hide()});const t=document.createElement("canvas");t.width=t.height=64;const n=t.getContext("2d");n.strokeStyle="rgba(240, 205, 110, 0.95)",n.lineWidth=5,n.shadowColor="rgba(201, 162, 39, 0.9)",n.shadowBlur=8,n.beginPath(),n.arc(32,32,24,0,Math.PI*2),n.stroke();const r=new po(t);this.hoverRing=new Da(new La({map:r,transparent:!0,depthTest:!1,depthWrite:!1})),this.hoverRing.renderOrder=999,this.hoverRing.visible=!1,this.skyRoot.add(this.hoverRing),this.hoverTip=document.createElement("div"),this.hoverTip.className="sky-tooltip",this.hoverTip.style.display="none",document.body.appendChild(this.hoverTip),this.bindPointer(),window.addEventListener("resize",this.resize),this.resize()}async init(){const[e,t,n,r]=await Promise.all([cd(ye),fetch(On("data/stars.json")).then(a=>{if(!a.ok)throw new Error(`stars=${a.status}`);return a.json()}),fetch(On("data/asterisms.json")).then(a=>{if(!a.ok)throw new Error(`asterisms=${a.status}`);return a.json()}),fetch(On("data/poem.json")).then(a=>{if(!a.ok)throw new Error(`poem=${a.status}`);return a.json()})]);this.sky=e,e.starMaterial.uniforms.uPixelRatio.value=this.tierDpr(),this.skyRoot.add(e.group),this.starList=t.stars;const s=new Float32Array(this.starList.length*3),o=new Map;this.starList.forEach((a,l)=>{const[c,u,d]=Bt(a.ra,a.dec,ye);s[l*3]=c,s[l*3+1]=u,s[l*3+2]=d,o.set(a.hip,new re(c,u,d)),this.nameByHip.set(a.hip,a.name)}),this.starPositions=s,this.hipToAsterism=ud(n.asterisms),this.poem=r,this.labels=fd(this.labelLayerEl,n.asterisms,o),this.labels.renderer.setSize(window.innerWidth,window.innerHeight),this.labels.setVisible(!1),this.skyRoot.add(this.labels.group)}start(e){this.frameHook=e??null,!this.started&&(this.started=!0,this.renderer.setAnimationLoop(this.frame))}setRadius(e){this.ctlRadius=Math.max(.5,e*ye)}setPositionDir(e){e instanceof re?this.ctlDir.copy(e):this.ctlDir.set(e[0],e[1],e[2]),this.ctlDir.lengthSq()<1e-8&&this.ctlDir.set(0,1,0),this.ctlDir.normalize()}setFov(e){this.ctlFov=Me.clamp(e,10,140)}setGazeMode(e,t){if(e==="target"){const n=t??{ra:0,dec:80};this.ctlGazeTargetQ=Qn(n.ra,n.dec)}this.ctlGazeBlend=e==="target"?1:0}setGazeBlend(e,t){this.ctlGazeBlend=Me.clamp(e,0,1),t!==void 0&&(this.ctlGazeTargetQ=t)}setDrift(e){this.ctlDrift=e}setOrbitEnabled(e){this.ctlOrbit=typeof e=="number"?Me.clamp(e,0,1):e?1:0}applyCameraState(e){this.setRadius(e.radius),this.setPositionDir(e.dir),this.setFov(e.fov),this.setGazeBlend(e.gazeBlend,e.gazeTargetQ),this.setDrift(e.drift),this.setOrbitEnabled(e.orbit)}get cameraRadius(){return this.camera.position.length()}setGroupProgress(e,t){if(!this.sky)return;const n=typeof e=="number"?e:this.sky.lines.indexOf(e);this.sky.lines.setGroupProgress(n,t)}groupIndex(e){return this.sky?this.sky.lines.indexOf(e):-1}get groupCount(){return this.sky?this.sky.lines.groupCount:0}setLabelsEnabled(e){this.labelsEnabled=e}setHoverTipEnabled(e){this.hoverTipEnabled=e}setPickingEnabled(e){this.pickingEnabled=e,e||this.card.hide()}hideDetailCard(){this.card.hide()}setBloom(e){this.pipeline.setBloom(e)}setBloomEnabled(e){this.pipeline.setEnabled(e)}onPick(e){return this.pickListeners.add(e),()=>this.pickListeners.delete(e)}addSkyObject(e,t){(t==null?void 0:t.rotateWithSky)===!1?this.scene.add(e):this.skyRoot.add(e)}removeSkyObject(e){e.removeFromParent()}setSkyRotation(e=0,t=0){if(t!==0){const n=dd(t);this.tmpSkyMat.set(n[0],n[1],n[2],0,n[3],n[4],n[5],0,n[6],n[7],n[8],0,0,0,0,1),this.tmpSkyQ.setFromRotationMatrix(this.tmpSkyMat)}else this.tmpSkyQ.identity();this.tmpSkyQY.setFromAxisAngle(Si,e),this.skyRoot.quaternion.copy(this.tmpSkyQ).multiply(this.tmpSkyQY)}setTimeScale(e){this.timeScale=Number.isFinite(e)?Me.clamp(e,0,4):1}spawnBurst(e,t){this.addEffect(D0(e,t))}spawnMeteors(e){const t=Math.min(H0,Math.max(0,Math.floor(e)));for(let n=0;n<t;n++)this.addEffect(G0(ye*Y0))}addEffect(e){this.skyRoot.add(e.object),this.effects.push(e)}updateEffects(e){for(let t=this.effects.length-1;t>=0;t--)this.effects[t].update(e)||this.effects.splice(t,1)}tierDpr(){const e=this.quality.tier,t=e===0?2:e===1?1.5:1;return Math.min(window.devicePixelRatio||1,t)}applyOrbitDelta(e,t){const n=this.camera.position.clone().normalize(),r=new Wt().setFromAxisAngle(Si,-e),s=new re().crossVectors(Si,n);s.lengthSq()<1e-8?s.set(1,0,0):s.normalize();const o=new Wt().setFromAxisAngle(s,t),a=r.clone().multiply(o).multiply(this.orbitQ),l=n.clone().applyQuaternion(r).applyQuaternion(o);Math.abs(l.y)<.985?this.orbitQ.copy(a):this.orbitQ.premultiply(r)}bindPointer(){const e=this.canvas;e.addEventListener("pointerdown",t=>{this.dragging=!0,this.lastX=this.downX=t.clientX,this.lastY=this.downY=t.clientY,this.orbitVelX=this.orbitVelY=0,this.lastOrbitMoveT=performance.now(),this.hoverNdc=null,e.setPointerCapture(t.pointerId)}),e.addEventListener("pointerup",t=>{this.dragging=!1,e.releasePointerCapture(t.pointerId),performance.now()-this.lastOrbitMoveT>V0&&(this.orbitVelX=this.orbitVelY=0),Math.hypot(t.clientX-this.downX,t.clientY-this.downY)<X0&&this.handleClick(t.clientX,t.clientY)}),e.addEventListener("pointercancel",()=>{this.dragging=!1,this.orbitVelX=this.orbitVelY=0}),e.addEventListener("pointerleave",()=>{this.hoverNdc=null}),e.addEventListener("pointermove",t=>{if(!this.dragging){this.hoverNdc={x:t.clientX/window.innerWidth*2-1,y:-(t.clientY/window.innerHeight)*2+1,cx:t.clientX,cy:t.clientY};return}const n=t.clientX-this.lastX,r=t.clientY-this.lastY;this.lastX=t.clientX,this.lastY=t.clientY;const s=(1-this.blendK)*(1-this.ctlGazeBlend);s>0&&(this.gazeYaw+=n*dc*s,this.gazePitch+=r*dc*s,this.gazePitch=Me.clamp(this.gazePitch,-hc,hc));const o=this.blendK*this.ctlOrbit;if(o>0){const a=n*o*.005,l=r*o*.005;this.applyOrbitDelta(a,l);const c=performance.now(),u=Math.min((c-this.lastOrbitMoveT)/1e3,.1);this.lastOrbitMoveT=c,u>1e-4&&(this.orbitVelX+=(a/u-this.orbitVelX)*gc,this.orbitVelY+=(l/u-this.orbitVelY)*gc)}})}handleClick(e,t){if(!this.pickingEnabled||!this.sky||!this.starPositions)return;if(this.camera.position.length()>=ye){this.emitPick(null);return}const n=e/window.innerWidth*2-1,r=-(t/window.innerHeight)*2+1,s=fl(n,r,this.camera,this.starPositions,{width:window.innerWidth,height:window.innerHeight});if(!s){this.emitPick(null);return}const o=this.starList[s.index],a=this.hipToAsterism.get(o.hip);if(!a){this.emitPick(null);return}const l=this.lookupPoem(a.name);this.emitPick({info:{name:a.name,starCount:a.stars.length,stars:a.stars.map(c=>({name:this.nameByHip.get(c)??null,hip:c})),quote:l==null?void 0:l.text,quoteFrom:l==null?void 0:l.from},x:e,y:t})}lookupPoem(e){if(!this.poem)return;const t=this.poem[e];if(t)return t;const n=e.replace(/[(（][^)）]*[)）]\s*$/,"");return n!==e?this.poem[n]:void 0}emitPick(e){for(const t of this.pickListeners)t(e)}updateHover(){if(!(this.pickingEnabled&&!this.dragging&&this.hoverNdc!==null&&this.starPositions!==null&&this.camera.position.length()<ye)){this.hoverRing.visible&&(this.hoverRing.visible=!1),this.hoverTip.style.display!=="none"&&(this.hoverTip.style.display="none");return}const t=fl(this.hoverNdc.x,this.hoverNdc.y,this.camera,this.starPositions,{width:window.innerWidth,height:window.innerHeight},ho.HOVER_PICK_RADIUS_PX);if(!t){this.hoverRing.visible&&(this.hoverRing.visible=!1),this.hoverTip.style.display!=="none"&&(this.hoverTip.style.display="none");return}const n=this.starPositions;this.hoverRing.position.set(n[t.index*3],n[t.index*3+1],n[t.index*3+2]);const r=this.camera.position.distanceTo(this.hoverRing.position),s=Math.max(.5,r*.035);if(this.hoverRing.scale.set(s,s,1),this.hoverRing.visible=!0,!this.hoverTipEnabled){this.hoverTip.style.display!=="none"&&(this.hoverTip.style.display="none");return}const o=this.starList[t.index],a=this.hipToAsterism.get(o.hip),l=o.name??`HIP ${o.hip}`,c=a&&a.name!==l?`${l} · ${a.name}`:l;this.hoverTip.textContent!==c&&(this.hoverTip.textContent=c),this.hoverTip.style.left=`${this.hoverNdc.cx+16}px`,this.hoverTip.style.top=`${this.hoverNdc.cy+14}px`,this.hoverTip.style.display!=="block"&&(this.hoverTip.style.display="block")}updateCamera(e){if(!this.dragging&&(this.orbitVelX!==0||this.orbitVelY!==0)){this.applyOrbitDelta(this.orbitVelX*e,this.orbitVelY*e);const n=Math.pow(.5,e/q0);this.orbitVelX*=n,this.orbitVelY*=n,Math.hypot(this.orbitVelX,this.orbitVelY)<U0&&(this.orbitVelX=this.orbitVelY=0)}const t=this.tmpPos.copy(this.ctlDir).multiplyScalar(this.ctlRadius).applyQuaternion(this.orbitQ);this.camera.position.copy(t),this.blendK=Q0((this.ctlRadius-pc)/(W0-pc)),this.gazeEuler.set(this.gazePitch,this.gazeYaw,0),this.gazeQ.setFromEuler(this.gazeEuler),this.insideQ.copy(this.gazeQ),this.ctlGazeTargetQ&&this.ctlGazeBlend>0&&this.insideQ.slerp(this.ctlGazeTargetQ,this.ctlGazeBlend),this.ctlDrift!==0&&(this.driftAngle+=this.ctlDrift*e,this.driftQ.setFromAxisAngle(Si,this.driftAngle),this.insideQ.premultiply(this.driftQ)),this.centerLookMat.lookAt(t,j0,Si),this.centerLookQ.setFromRotationMatrix(this.centerLookMat),this.camera.quaternion.slerpQuaternions(this.insideQ,this.centerLookQ,this.blendK),this.camera.fov!==this.ctlFov&&(this.camera.fov=this.ctlFov,this.camera.updateProjectionMatrix())}};G(ho,"HOVER_PICK_RADIUS_PX",16);let xa=ho;const K0=Me.degToRad(23.44),Z0=11570494,Bo=36,J0=.15,eg=.55;function tg(i){return i=Me.clamp(i,0,1),i*i*(3-2*i)}function xs(i,e,t){const n=new gd({color:Z0,metalness:.85,roughness:.35,transparent:!0,opacity:0}),r=new wn,s=i*ye;r.add(new js(new jc(s,e*ye,12,144),n));for(let o=0;o<Bo;o++){const a=o/Bo*Math.PI*2,l=o%(Bo/4)===0,c=new js(l?t.major:t.minor,n);c.position.set(Math.cos(a)*s,Math.sin(a)*s,0),c.rotation.z=a,r.add(c)}return{local:r,material:n}}function ng(){const i=new wn;i.name="armillary-sphere";const e={minor:new dl(.012*ye,.0018*ye,.0035*ye),major:new dl(.02*ye,.0024*ye,.0045*ye)},t=xs(1.1,.006,e);t.local.rotation.x=-Math.PI/2;const n=xs(1.07,.004,e);n.local.rotation.y=Math.PI/2;const r=xs(1.05,.004,e);r.local.rotation.x=-Math.PI/2;const s=new wn;s.add(r.local);const o=xs(1.03,.0035,e);o.local.rotation.x=-Math.PI/2;const a=new wn;a.add(o.local);const l=new wn;l.rotation.x=K0,l.add(a);const c=[{built:t,inner:t.local,offsetDir:new re(0,-1,0),tumble:new Pi(.9,0,.4)},{built:n,inner:n.local,offsetDir:new re(1,.15,0),tumble:new Pi(0,.5,-1.1)},{built:r,inner:s,offsetDir:new re(0,1,.2),tumble:new Pi(-.7,.5,0)},{built:o,inner:l,offsetDir:new re(-.6,.6,.6),tumble:new Pi(.5,-.4,.8)}].map(({built:b,inner:x,offsetDir:w,tumble:T})=>{const M=new wn;return M.add(x),i.add(M),{assembly:M,material:b.material,offsetDir:w.normalize(),tumble:T,alpha:0}});i.add(new pd(16771529,.9));const u=new hl(16774109,2.4);u.position.set(1.6*ye,2.4*ye,1.2*ye),i.add(u);const d=new hl(12570879,1.1);d.position.set(-1.8*ye,-.7*ye,-1.5*ye),i.add(d);let h=0;function f(b){const x=h*b.alpha;b.material.opacity=x,b.assembly.visible=x>.002}function g(b){c.forEach((x,w)=>{const T=tg((b-w*J0)/eg);x.alpha=T;const M=1-T;x.assembly.scale.setScalar(.35+.65*T),x.assembly.position.copy(x.offsetDir).multiplyScalar(M*.5*ye),x.assembly.rotation.set(x.tumble.x*M,x.tumble.y*M,x.tumble.z*M),f(x)})}function p(b){s.rotation.y=b,a.rotation.y=b*.6}function y(b){h=Me.clamp(b,0,1);for(const x of c)f(x)}function v(){const b=new Set,x=new Set;i.traverse(w=>{const T=w;if(T.isMesh){b.add(T.geometry);const M=T.material;for(const k of Array.isArray(M)?M:[M])x.add(k)}}),b.forEach(w=>w.dispose()),x.forEach(w=>w.dispose())}return g(0),{group:i,setAssembly:g,setSpin:p,setFade:y,dispose:v}}const Go=.55,rg=.9,ig=1.2;function ki(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function sg(i){const{copy:e}=i,t=document.createElement("div");t.className="chapter-panel chapter-panel--left",t.innerHTML=`
    <p class="eyebrow">${ki(e.eyebrow)}</p>
    <div class="chapter-head">
      <h2>${ki(e.title)}</h2>
      ${e.seal?`<div class="seal">${ki(e.seal)}</div>`:""}
    </div>
    <p class="hook">${ki(e.hook)}</p>
    ${e.body.map(a=>`<p>${ki(a)}</p>`).join("")}
  `,i.root.querySelector(".pin").appendChild(t);let n=null,r=0;const s={v:0};function o(a){if(!n)return;n.setAssembly(Math.min(a/Go,1));const l=Math.max(0,(a-Go)/(1-Go));n.setSpin(l*rg)}return{enter(){i.root.classList.add("inview"),n||(n=ng(),i.sky.addSkyObject(n.group,{rotateWithSky:!1}),o(r)),An.to(s,{v:1,duration:ig,ease:"power2.out",overwrite:!0,onUpdate:()=>n==null?void 0:n.setFade(s.v)})},update(a){r=a,o(a)},exit(){i.root.classList.remove("inview"),An.killTweensOf(s),s.v=0,n&&(i.sky.removeSkyObject(n.group),n.dispose(),n=null)}}}const og=Object.freeze(Object.defineProperty({__proto__:null,createChapter:sg},Symbol.toStringTag,{value:"Module"})),kr=-1e4,oo=14e3,wa=oo-kr,ag=[{name:"帝星",years:-1e3,note:"−1000"},{name:"勾陈一",years:0,note:"今"},{name:"织女一",years:13700,note:"+13700"}],lg=[{years:kr,text:"−10000",cls:"ch6-endlab--start"},{years:0,text:"0",cls:""},{years:oo,text:"+14000",cls:"ch6-endlab--end"}],cg=2e3,ug=1.5,fg=.07,dg=`
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
`;let mc=!1;function hg(){if(mc||typeof document>"u")return;const i=document.createElement("style");i.dataset.ch6="",i.textContent=dg,document.head.appendChild(i),mc=!0}function Ti(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function ws(i){return(i-kr)/wa*100}function pg(i){const e=2e3+i;return e<=0?{era:"公元前",num:1-e}:{era:e<3e3?"公元":"公元后",num:e}}function gg(i){hg();const e=i.root.querySelector(".pin"),t=document.createElement("div");t.className="chapter-panel ch6-panel",t.innerHTML=`
    <p class="eyebrow">${Ti(i.copy.eyebrow)}</p>
    <div class="chapter-head">
      <h2>${Ti(i.copy.title)}</h2>
      ${i.copy.seal?`<div class="seal">${Ti(i.copy.seal)}</div>`:""}
    </div>
    <p class="hook">${Ti(i.copy.hook)}</p>
    ${i.copy.body.map(y=>`<p>${Ti(y)}</p>`).join("")}
  `,e.appendChild(t);const n=document.createElement("div");n.className="ch6-time";const r=[];for(let y=kr;y<=oo;y+=cg){const v=y===kr||y===0||y===oo;r.push(`<div class="ch6-tick${v?" ch6-tick--major":""}" style="left:${ws(y).toFixed(3)}%"></div>`)}const s=lg.map(y=>`<div class="ch6-endlab ${y.cls}" style="left:${ws(y.years).toFixed(3)}%">${y.text}</div>`),o=ag.map(y=>`
    <div class="ch6-mark" style="left:${ws(y.years).toFixed(3)}%">
      <span class="ch6-mark-name">${y.name}</span>
      <span class="ch6-mark-yr">${y.note}</span>
      <span class="ch6-mark-dot"></span>
    </div>`);n.innerHTML=`
    <div class="ch6-year"><span class="ch6-era">公元前</span><span class="ch6-num">8000</span><span class="ch6-suffix">年</span></div>
    <div class="ch6-ruler">
      <div class="ch6-ruler-line"></div>
      ${r.join("")}
      ${s.join("")}
      ${o.join("")}
      <div class="ch6-pointer"></div>
    </div>
  `,e.appendChild(n);const a=n.querySelector(".ch6-era"),l=n.querySelector(".ch6-num"),c=n.querySelector(".ch6-pointer");let u=null;function d(){const y=new jc(ug,fg,12,96),v=new md({color:13214247}),b=new js(y,v);return b.rotation.x=Math.PI/2,b.position.set(0,1.01*ye,0),b}let h=0,f=Number.NaN,g=Number.NaN;function p(y){i.sky.setSkyRotation(0,y);const v=Math.round(y);if(v!==f){f=v;const{era:x,num:w}=pg(v);a.textContent=x,l.textContent=String(w)}const b=Math.round(ws(y)*100)/100;b!==g&&(g=b,c.style.left=`${b}%`)}return{enter(){i.root.classList.add("inview"),u=d(),i.sky.addSkyObject(u,{rotateWithSky:!1}),p(kr+h*wa)},update(y){h=y,p(kr+y*wa)},exit(){i.root.classList.remove("inview"),i.sky.setSkyRotation(0,0),u&&(i.sky.removeSkyObject(u),u.geometry.dispose(),u.material.dispose(),u=null)}}}const mg=Object.freeze(Object.defineProperty({__proto__:null,createChapter:gg},Symbol.toStringTag,{value:"Module"})),_g=100,yg=9414856;async function _c(i){const e=await fetch(i);if(!e.ok)throw new Error(`${i} → HTTP ${e.status}`);return e.json()}async function bg(){const[i,e]=await Promise.all([_c(On("data/western.json")),_c(On("data/stars.json"))]),t=new Map;for(const l of e.stars)t.set(l.hip,Bt(l.ra,l.dec,_g));const n=[];for(const l of i.constellations)for(const[c,u]of l.lines){const d=t.get(c),h=t.get(u);!d||!h||n.push(d[0],d[1],d[2],h[0],h[1],h[2])}const r=new Zi;r.setAttribute("position",new nr(new Float32Array(n),3));const s=new Vc({color:yg,transparent:!0,opacity:0,depthWrite:!1,blending:zr}),o=new _d(r,s);o.name="western-lines",o.frustumCulled=!1;const a=new wn;return a.name="western",a.add(o),a.visible=!1,{group:a,setOpacity(l){const c=Me.clamp(l,0,1);s.opacity=c,a.visible=c>.001},dispose(){r.dispose(),s.dispose()}}}const yc=.6,vg=`
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
`;let bc=!1;function xg(){if(bc||typeof document>"u")return;const i=document.createElement("style");i.dataset.ch7="",i.textContent=vg,document.head.appendChild(i),bc=!0}function Ei(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function wg(i){return i=Me.clamp(i,0,1),i*i*(3-2*i)}function Sg(i){xg();const e=i.root.querySelector(".pin"),{copy:t}=i,n=document.createElement("div");n.className="ch7-panel",n.innerHTML=`
    <p class="eyebrow">${Ei(t.eyebrow)}</p>
    <div class="chapter-head">
      <h2>${Ei(t.title)}</h2>
      ${t.seal?`<div class="seal">${Ei(t.seal)}</div>`:""}
    </div>
    <p class="hook">${Ei(t.hook)}</p>
    ${t.body.map(g=>`<p>${Ei(g)}</p>`).join("")}
  `,e.appendChild(n);const r=document.createElement("div");r.className="ch7-compare",r.innerHTML=`
    <span class="ch7-end ch7-end--cn">中国星官</span>
    <input class="ch7-slider" type="range" min="0" max="100" step="1" value="0"
      aria-label="中西星空连线对比" />
    <span class="ch7-end ch7-end--west">西方星座</span>
  `,e.appendChild(r);const s=r.querySelector(".ch7-slider");let o=null,a=0,l=0,c=!1,u=null,d=null;function h(g){const p=i.sky.groupCount;for(let y=0;y<p;y++)i.sky.setGroupProgress(y,g)}function f(g){l=Me.clamp(g,0,1),h(1-l),o==null||o.setOpacity(l),s.value=String(Math.round(l*100))}return s.addEventListener("input",()=>{c=!0,f(Number(s.value)/100)}),{enter(){if(i.root.classList.add("inview"),i.sky.setLabelsEnabled(!1),u==null||u.kill(),u=null,d==null||d.kill(),d=null,c=!1,f(0),o)return;const g=++a;bg().then(p=>{if(g!==a){p.dispose();return}o=p,i.sky.addSkyObject(p.group),p.setOpacity(l)}).catch(p=>console.warn("[ch7] 西方星座数据加载失败：",p))},update(g){if(!c){if(g>=yc){l!==1&&f(1);return}f(wg(g/yc))}},exit(){if(i.root.classList.remove("inview"),++a,d==null||d.kill(),o){const p=o,y={v:l};d=An.to(y,{v:0,duration:.6,ease:"sine.inOut",onUpdate:()=>p.setOpacity(y.v),onComplete:()=>{i.sky.removeSkyObject(p.group),p.dispose(),o===p&&(o=null),d=null}})}u==null||u.kill();const g={v:1-l};u=An.to(g,{v:1,duration:2.4,ease:"sine.inOut",onUpdate:()=>h(g.v)}),i.sky.setLabelsEnabled(!0)}}}const kg=Object.freeze(Object.defineProperty({__proto__:null,createChapter:Sg},Symbol.toStringTag,{value:"Module"})),Tg=`
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
`;let vc=!1;function Eg(){if(vc||typeof document>"u")return;const i=document.createElement("style");i.dataset.ch8="",i.textContent=Tg,document.head.appendChild(i),vc=!0}function En(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Cg(i){return i<0?0:i>1?1:i}function Mg(i){return i.split(/(https?:\/\/\S+)/g).map(e=>/^https?:\/\//.test(e)?`<a href="${En(e)}" target="_blank" rel="noopener">${En(e)}</a>`:En(e)).join("")}function xc(i,e,t){const n=Cg((i-e)/(t-e));return n*n*(3-2*n)}function Pg(i){Eg();const e=i.root.querySelector(".pin"),{copy:t}=i,n=document.createElement("div");n.className="ch8-wrap",n.innerHTML=`
    <div class="ch8-panel">
      <p class="ch8-eyebrow">${En(t.eyebrow)}</p>
      <div class="ch8-head">
        <h2 class="ch8-title">${En(t.title)}</h2>
        ${t.seal?`<div class="ch8-seal">${En(t.seal)}</div>`:""}
      </div>
      <p class="ch8-hook">${En(t.hook)}</p>
      <div class="ch8-body">${t.body.map(l=>`<p>${En(l)}</p>`).join("")}</div>
      <div class="ch8-credits">
        <p class="ch8-credits-heading">${En(nc.heading)}</p>
        ${nc.groups.map(l=>`
          <div class="ch8-credit-group">
            <h3>${En(l.title)}</h3>
            ${l.lines.map(c=>`<p>${Mg(c)}</p>`).join("")}
          </div>`).join("")}
      </div>
    </div>
  `,e.appendChild(n);const r=n.querySelector(".ch8-panel"),s=n.querySelector(".ch8-credits");let o=-1,a=-1;return{enter(){},update(l){const c=xc(l,0,.3);(o<0||Math.abs(c-o)>=1e-4)&&(o=c,r.style.opacity=c.toFixed(3),r.style.transform=`translateY(${((1-c)*26).toFixed(2)}px)`);const u=xc(l,.12,.45);(a<0||Math.abs(u-a)>=1e-4)&&(a=u,s.style.opacity=u.toFixed(3),s.style.transform=`translateY(${((1-u)*14).toFixed(2)}px)`)},exit(){}}}const Ag=Object.freeze(Object.defineProperty({__proto__:null,createChapter:Pg},Symbol.toStringTag,{value:"Module"}));function Rg(i,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(i,n.key,n)}}function Og(i,e,t){return e&&Rg(i.prototype,e),i}/*!
 * Observer 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var ht,Hs,Jt,er,tr,si,Sf,br,oi,kf,Hn,xn,Tf,Ef=function(){return ht||typeof window<"u"&&(ht=window.gsap)&&ht.registerPlugin&&ht},Cf=1,ei=[],le=[],Ln=[],Hi=Date.now,Sa=function(e,t){return t},Lg=function(){var e=oi.core,t=e.bridge||{},n=e._scrollers,r=e._proxies;n.push.apply(n,le),r.push.apply(r,Ln),le=n,Ln=r,Sa=function(o,a){return t[o](a)}},sr=function(e,t){return~Ln.indexOf(e)&&Ln[Ln.indexOf(e)+1][t]},Xi=function(e){return!!~kf.indexOf(e)},Et=function(e,t,n,r,s){return e.addEventListener(t,n,{passive:r!==!1,capture:!!s})},Tt=function(e,t,n,r){return e.removeEventListener(t,n,!!r)},Ss="scrollLeft",ks="scrollTop",ka=function(){return Hn&&Hn.isPressed||le.cache++},ao=function(e,t){var n=function r(s){if(s||s===0){Cf&&(Jt.history.scrollRestoration="manual");var o=Hn&&Hn.isPressed;s=r.v=Math.round(s)||(Hn&&Hn.iOS?1:0),e(s),r.cacheID=le.cache,o&&Sa("ss",s)}else(t||le.cache!==r.cacheID||Sa("ref"))&&(r.cacheID=le.cache,r.v=e());return r.v+r.offset};return n.offset=0,e&&n},At={s:Ss,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:ao(function(i){return arguments.length?Jt.scrollTo(i,et.sc()):Jt.pageXOffset||er[Ss]||tr[Ss]||si[Ss]||0})},et={s:ks,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:At,sc:ao(function(i){return arguments.length?Jt.scrollTo(At.sc(),i):Jt.pageYOffset||er[ks]||tr[ks]||si[ks]||0})},Dt=function(e,t){return(t&&t._ctx&&t._ctx.selector||ht.utils.toArray)(e)[0]||(typeof e=="string"&&ht.config().nullTargetWarn!==!1?console.warn("Element not found:",e):null)},Dg=function(e,t){for(var n=t.length;n--;)if(t[n]===e||t[n].contains(e))return!0;return!1},cr=function(e,t){var n=t.s,r=t.sc;Xi(e)&&(e=er.scrollingElement||tr);var s=le.indexOf(e),o=r===et.sc?1:2;!~s&&(s=le.push(e)-1),le[s+o]||Et(e,"scroll",ka);var a=le[s+o],l=a||(le[s+o]=ao(sr(e,n),!0)||(Xi(e)?r:ao(function(c){return arguments.length?e[n]=c:e[n]})));return l.target=e,a||(l.smooth=ht.getProperty(e,"scrollBehavior")==="smooth"),l},Ta=function(e,t,n){var r=e,s=e,o=Hi(),a=o,l=t||50,c=Math.max(500,l*3),u=function(g,p){var y=Hi();p||y-o>l?(s=r,r=g,a=o,o=y):n?r+=g:r=s+(g-s)/(y-a)*(o-a)},d=function(){s=r=n?0:r,a=o=0},h=function(g){var p=a,y=s,v=Hi();return(g||g===0)&&g!==r&&u(g),o===a||v-a>c?0:(r+(n?y:-y))/((n?v:o)-p)*1e3};return{update:u,reset:d,getVelocity:h}},Ci=function(e,t){return t&&!e._gsapAllow&&e.cancelable!==!1&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},wc=function(e){var t=Math.max.apply(Math,e),n=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(n)?t:n},Mf=function(){oi=ht.core.globals().ScrollTrigger,oi&&oi.core&&Lg()},Pf=function(e){return ht=e||Ef(),!Hs&&ht&&typeof document<"u"&&document.body&&(Jt=window,er=document,tr=er.documentElement,si=er.body,kf=[Jt,er,tr,si],ht.utils.clamp,Tf=ht.core.context||function(){},br="onpointerenter"in si?"pointer":"mouse",Sf=qe.isTouch=Jt.matchMedia&&Jt.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in Jt||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,xn=qe.eventTypes=("ontouchstart"in tr?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in tr?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return Cf=0},500),Hs=1),oi||Mf(),Hs};At.op=et;le.cache=0;var qe=function(){function i(t){this.init(t)}var e=i.prototype;return e.init=function(n){Hs||Pf(ht)||console.warn("Please gsap.registerPlugin(Observer)"),oi||Mf();var r=n.tolerance,s=n.dragMinimum,o=n.type,a=n.target,l=n.lineHeight,c=n.debounce,u=n.preventDefault,d=n.onStop,h=n.onStopDelay,f=n.ignore,g=n.wheelSpeed,p=n.event,y=n.onDragStart,v=n.onDragEnd,b=n.onDrag,x=n.onPress,w=n.onRelease,T=n.onRight,M=n.onLeft,k=n.onUp,R=n.onDown,C=n.onChangeX,P=n.onChangeY,B=n.onChange,m=n.onToggleX,z=n.onToggleY,I=n.onHover,X=n.onHoverEnd,$=n.onMove,F=n.ignoreCheck,O=n.isNormalizer,L=n.onGestureStart,_=n.onGestureEnd,q=n.onWheel,K=n.onEnable,D=n.onDisable,W=n.onClick,U=n.scrollSpeed,ne=n.capture,H=n.allowClicks,ve=n.lockAxis,Se=n.onLockAxis;this.target=a=Dt(a)||tr,this.vars=n,f&&(f=ht.utils.toArray(f)),r=r||1e-9,s=s||0,g=g||1,U=U||1,o=o||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(Jt.getComputedStyle(si).lineHeight)||22);var at,ze,ke,V,ie,Ye,tt,E=this,Pe=0,lt=0,gt=n.passive||!u&&n.passive!==!1,me=cr(a,At),de=cr(a,et),Ie=me(),ct=de(),Fe=~o.indexOf("touch")&&!~o.indexOf("pointer")&&xn[0]==="pointerdown",_n=Xi(a),Ae=a.ownerDocument||er,Yt=[0,0,0],kt=[0,0,0],Rt=0,Un=function(){return Rt=Hi()},Oe=function(Z,ue){return(E.event=Z)&&f&&Dg(Z.target,f)||ue&&Fe&&Z.pointerType!=="touch"||F&&F(Z,ue)},zn=function(){E._vx.reset(),E._vy.reset(),ze.pause(),d&&d(E)},Ot=function(){var Z=E.deltaX=wc(Yt),ue=E.deltaY=wc(kt),N=Math.abs(Z)>=r,ee=Math.abs(ue)>=r;B&&(N||ee)&&B(E,Z,ue,Yt,kt),N&&(T&&E.deltaX>0&&T(E),M&&E.deltaX<0&&M(E),C&&C(E),m&&E.deltaX<0!=Pe<0&&m(E),Pe=E.deltaX,Yt[0]=Yt[1]=Yt[2]=0),ee&&(R&&E.deltaY>0&&R(E),k&&E.deltaY<0&&k(E),P&&P(E),z&&E.deltaY<0!=lt<0&&z(E),lt=E.deltaY,kt[0]=kt[1]=kt[2]=0),(V||ke)&&($&&$(E),ke&&(y&&ke===1&&y(E),b&&b(E),ke=0),V=!1),Ye&&!(Ye=!1)&&Se&&Se(E),ie&&(q(E),ie=!1),at=0},yn=function(Z,ue,N){Yt[N]+=Z,kt[N]+=ue,E._vx.update(Z),E._vy.update(ue),c?at||(at=requestAnimationFrame(Ot)):Ot()},bn=function(Z,ue){ve&&!tt&&(E.axis=tt=Math.abs(Z)>Math.abs(ue)?"x":"y",Ye=!0),tt!=="y"&&(Yt[2]+=Z,E._vx.update(Z,!0)),tt!=="x"&&(kt[2]+=ue,E._vy.update(ue,!0)),c?at||(at=requestAnimationFrame(Ot)):Ot()},Ht=function(Z){if(!Oe(Z,1)){Z=Ci(Z,u);var ue=Z.clientX,N=Z.clientY,ee=ue-E.x,j=N-E.y,J=E.isDragging;E.x=ue,E.y=N,(J||(ee||j)&&(Math.abs(E.startX-ue)>=s||Math.abs(E.startY-N)>=s))&&(ke||(ke=J?2:1),J||(E.isDragging=!0),bn(ee,j))}},Xt=E.onPress=function(te){Oe(te,1)||te&&te.button||(E.axis=tt=null,ze.pause(),E.isPressed=!0,te=Ci(te),Pe=lt=0,E.startX=E.x=te.clientX,E.startY=E.y=te.clientY,E._vx.reset(),E._vy.reset(),Et(O?a:Ae,xn[1],Ht,gt,!0),E.deltaX=E.deltaY=0,x&&x(E))},se=E.onRelease=function(te){if(!Oe(te,1)){Tt(O?a:Ae,xn[1],Ht,!0);var Z=!isNaN(E.y-E.startY),ue=E.isDragging,N=ue&&(Math.abs(E.x-E.startX)>3||Math.abs(E.y-E.startY)>3),ee=Ci(te);!N&&Z&&(E._vx.reset(),E._vy.reset(),u&&H&&ht.delayedCall(.08,function(){if(Hi()-Rt>300&&!te.defaultPrevented){if(te.target.click)te.target.click();else if(Ae.createEvent){var j=Ae.createEvent("MouseEvents");j.initMouseEvent("click",!0,!0,Jt,1,ee.screenX,ee.screenY,ee.clientX,ee.clientY,!1,!1,!1,!1,0,null),te.target.dispatchEvent(j)}}})),E.isDragging=E.isGesturing=E.isPressed=!1,d&&ue&&!O&&ze.restart(!0),ke&&Ot(),v&&ue&&v(E),w&&w(E,N)}},on=function(Z){return Z.touches&&Z.touches.length>1&&(E.isGesturing=!0)&&L(Z,E.isDragging)},mt=function(){return(E.isGesturing=!1)||_(E)},Lt=function(Z){if(!Oe(Z)){var ue=me(),N=de();yn((ue-Ie)*U,(N-ct)*U,1),Ie=ue,ct=N,d&&ze.restart(!0)}},ut=function(Z){if(!Oe(Z)){Z=Ci(Z,u),q&&(ie=!0);var ue=(Z.deltaMode===1?l:Z.deltaMode===2?Jt.innerHeight:1)*g;yn(Z.deltaX*ue,Z.deltaY*ue,0),d&&!O&&ze.restart(!0)}},In=function(Z){if(!Oe(Z)){var ue=Z.clientX,N=Z.clientY,ee=ue-E.x,j=N-E.y;E.x=ue,E.y=N,V=!0,d&&ze.restart(!0),(ee||j)&&bn(ee,j)}},Fn=function(Z){E.event=Z,I(E)},ft=function(Z){E.event=Z,X(E)},Nn=function(Z){return Oe(Z)||Ci(Z,u)&&W(E)};ze=E._dc=ht.delayedCall(h||.25,zn).pause(),E.deltaX=E.deltaY=0,E._vx=Ta(0,50,!0),E._vy=Ta(0,50,!0),E.scrollX=me,E.scrollY=de,E.isDragging=E.isGesturing=E.isPressed=!1,Tf(this),E.enable=function(te){return E.isEnabled||(Et(_n?Ae:a,"scroll",ka),o.indexOf("scroll")>=0&&Et(_n?Ae:a,"scroll",Lt,gt,ne),o.indexOf("wheel")>=0&&Et(a,"wheel",ut,gt,ne),(o.indexOf("touch")>=0&&Sf||o.indexOf("pointer")>=0)&&(Et(a,xn[0],Xt,gt,ne),Et(Ae,xn[2],se),Et(Ae,xn[3],se),H&&Et(a,"click",Un,!0,!0),W&&Et(a,"click",Nn),L&&Et(Ae,"gesturestart",on),_&&Et(Ae,"gestureend",mt),I&&Et(a,br+"enter",Fn),X&&Et(a,br+"leave",ft),$&&Et(a,br+"move",In)),E.isEnabled=!0,E.isDragging=E.isGesturing=E.isPressed=V=ke=!1,E._vx.reset(),E._vy.reset(),Ie=me(),ct=de(),te&&te.type&&Xt(te),K&&K(E)),E},E.disable=function(){E.isEnabled&&(ei.filter(function(te){return te!==E&&Xi(te.target)}).length||Tt(_n?Ae:a,"scroll",ka),E.isPressed&&(E._vx.reset(),E._vy.reset(),Tt(O?a:Ae,xn[1],Ht,!0)),Tt(_n?Ae:a,"scroll",Lt,ne),Tt(a,"wheel",ut,ne),Tt(a,xn[0],Xt,ne),Tt(Ae,xn[2],se),Tt(Ae,xn[3],se),Tt(a,"click",Un,!0),Tt(a,"click",Nn),Tt(Ae,"gesturestart",on),Tt(Ae,"gestureend",mt),Tt(a,br+"enter",Fn),Tt(a,br+"leave",ft),Tt(a,br+"move",In),E.isEnabled=E.isPressed=E.isDragging=!1,D&&D(E))},E.kill=E.revert=function(){E.disable();var te=ei.indexOf(E);te>=0&&ei.splice(te,1),Hn===E&&(Hn=0)},ei.push(E),O&&Xi(a)&&(Hn=E),E.enable(p)},Og(i,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),i}();qe.version="3.15.0";qe.create=function(i){return new qe(i)};qe.register=Pf;qe.getAll=function(){return ei.slice()};qe.getById=function(i){return ei.filter(function(e){return e.vars.id===i})[0]};Ef()&&ht.registerPlugin(qe);/*!
 * ScrollTrigger 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Y,jr,ae,be,Kt,_e,rl,lo,ls,Wi,Di,Ts,bt,bo,Ea,Mt,Sc,kc,Qr,Af,Yo,Rf,Ct,Ca,Of,Lf,jn,Ma,il,ai,sl,qi,Pa,Ho,Es=1,vt=Date.now,Xo=vt(),mn=0,zi=0,Tc=function(e,t,n){var r=Ut(e)&&(e.substr(0,6)==="clamp("||e.indexOf("max")>-1);return n["_"+t+"Clamp"]=r,r?e.substr(6,e.length-7):e},Ec=function(e,t){return t&&(!Ut(e)||e.substr(0,6)!=="clamp(")?"clamp("+e+")":e},zg=function i(){return zi&&requestAnimationFrame(i)},Cc=function(){return bo=1},Mc=function(){return bo=0},Cn=function(e){return e},Ii=function(e){return Math.round(e*1e5)/1e5||0},Df=function(){return typeof window<"u"},zf=function(){return Y||Df()&&(Y=window.gsap)&&Y.registerPlugin&&Y},Fr=function(e){return!!~rl.indexOf(e)},If=function(e){return(e==="Height"?sl:ae["inner"+e])||Kt["client"+e]||_e["client"+e]},Ff=function(e){return sr(e,"getBoundingClientRect")||(Fr(e)?function(){return Vs.width=ae.innerWidth,Vs.height=sl,Vs}:function(){return Gn(e)})},Ig=function(e,t,n){var r=n.d,s=n.d2,o=n.a;return(o=sr(e,"getBoundingClientRect"))?function(){return o()[r]}:function(){return(t?If(s):e["client"+s])||0}},Fg=function(e,t){return!t||~Ln.indexOf(e)?Ff(e):function(){return Vs}},Rn=function(e,t){var n=t.s,r=t.d2,s=t.d,o=t.a;return Math.max(0,(n="scroll"+r)&&(o=sr(e,n))?o()-Ff(e)()[s]:Fr(e)?(Kt[n]||_e[n])-If(r):e[n]-e["offset"+r])},Cs=function(e,t){for(var n=0;n<Qr.length;n+=3)(!t||~t.indexOf(Qr[n+1]))&&e(Qr[n],Qr[n+1],Qr[n+2])},Ut=function(e){return typeof e=="string"},wt=function(e){return typeof e=="function"},Fi=function(e){return typeof e=="number"},vr=function(e){return typeof e=="object"},Mi=function(e,t,n){return e&&e.progress(t?0:1)&&n&&e.pause()},qr=function(e,t,n){if(e.enabled){var r=e._ctx?e._ctx.add(function(){return t(e,n)}):t(e,n);r&&r.totalTime&&(e.callbackAnimation=r)}},Ur=Math.abs,Nf="left",$f="top",ol="right",al="bottom",Or="width",Lr="height",Ui="Right",Vi="Left",ji="Top",Qi="Bottom",je="padding",dn="margin",gi="Width",ll="Height",Je="px",hn=function(e){return ae.getComputedStyle(e.nodeType===Node.DOCUMENT_NODE?e.scrollingElement:e)},Ng=function(e){var t=hn(e).position;e.style.position=t==="absolute"||t==="fixed"?t:"relative"},Pc=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},Gn=function(e,t){var n=t&&hn(e)[Ea]!=="matrix(1, 0, 0, 1, 0, 0)"&&Y.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),r=e.getBoundingClientRect?e.getBoundingClientRect():e.scrollingElement.getBoundingClientRect();return n&&n.progress(0).kill(),r},co=function(e,t){var n=t.d2;return e["offset"+n]||e["client"+n]||0},Bf=function(e){var t=[],n=e.labels,r=e.duration(),s;for(s in n)t.push(n[s]/r);return t},$g=function(e){return function(t){return Y.utils.snap(Bf(e),t)}},cl=function(e){var t=Y.utils.snap(e),n=Array.isArray(e)&&e.slice(0).sort(function(r,s){return r-s});return n?function(r,s,o){o===void 0&&(o=.001);var a;if(!s)return t(r);if(s>0){for(r-=o,a=0;a<n.length;a++)if(n[a]>=r)return n[a];return n[a-1]}else for(a=n.length,r+=o;a--;)if(n[a]<=r)return n[a];return n[0]}:function(r,s,o){o===void 0&&(o=.001);var a=t(r);return!s||Math.abs(a-r)<o||a-r<0==s<0?a:t(s<0?r-e:r+e)}},Bg=function(e){return function(t,n){return cl(Bf(e))(t,n.direction)}},Ms=function(e,t,n,r){return n.split(",").forEach(function(s){return e(t,s,r)})},st=function(e,t,n,r,s){return e.addEventListener(t,n,{passive:!r,capture:!!s})},it=function(e,t,n,r){return e.removeEventListener(t,n,!!r)},Ps=function(e,t,n){n=n&&n.wheelHandler,n&&(e(t,"wheel",n),e(t,"touchmove",n))},Ac={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},As={toggleActions:"play",anticipatePin:0},uo={top:0,left:0,center:.5,bottom:1,right:1},Xs=function(e,t){if(Ut(e)){var n=e.indexOf("="),r=~n?+(e.charAt(n-1)+1)*parseFloat(e.substr(n+1)):0;~n&&(e.indexOf("%")>n&&(r*=t/100),e=e.substr(0,n-1)),e=r+(e in uo?uo[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)}return e},Rs=function(e,t,n,r,s,o,a,l){var c=s.startColor,u=s.endColor,d=s.fontSize,h=s.indent,f=s.fontWeight,g=be.createElement("div"),p=Fr(n)||sr(n,"pinType")==="fixed",y=e.indexOf("scroller")!==-1,v=p?_e:n.tagName==="IFRAME"?n.contentDocument.body:n,b=e.indexOf("start")!==-1,x=b?c:u,w="border-color:"+x+";font-size:"+d+";color:"+x+";font-weight:"+f+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return w+="position:"+((y||l)&&p?"fixed;":"absolute;"),(y||l||!p)&&(w+=(r===et?ol:al)+":"+(o+parseFloat(h))+"px;"),a&&(w+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),g._isStart=b,g.setAttribute("class","gsap-marker-"+e+(t?" marker-"+t:"")),g.style.cssText=w,g.innerText=t||t===0?e+"-"+t:e,v.children[0]?v.insertBefore(g,v.children[0]):v.appendChild(g),g._offset=g["offset"+r.op.d2],Ws(g,0,r,b),g},Ws=function(e,t,n,r){var s={display:"block"},o=n[r?"os2":"p2"],a=n[r?"p2":"os2"];e._isFlipped=r,s[n.a+"Percent"]=r?-100:0,s[n.a]=r?"1px":0,s["border"+o+gi]=1,s["border"+a+gi]=0,s[n.p]=t+"px",Y.set(e,s)},oe=[],Aa={},cs,Rc=function(){return vt()-mn>34&&(cs||(cs=requestAnimationFrame(Xn)))},Vr=function(){(!Ct||!Ct.isPressed||Ct.startX>_e.clientWidth)&&(le.cache++,Ct?cs||(cs=requestAnimationFrame(Xn)):Xn(),mn||$r("scrollStart"),mn=vt())},Wo=function(){Lf=ae.innerWidth,Of=ae.innerHeight},Ni=function(e){le.cache++,(e===!0||!bt&&!Rf&&!be.fullscreenElement&&!be.webkitFullscreenElement&&(!Ca||Lf!==ae.innerWidth||Math.abs(ae.innerHeight-Of)>ae.innerHeight*.25))&&lo.restart(!0)},Nr={},Gg=[],Gf=function i(){return it(ce,"scrollEnd",i)||Tr(!0)},$r=function(e){return Nr[e]&&Nr[e].map(function(t){return t()})||Gg},qt=[],Yf=function(e){for(var t=0;t<qt.length;t+=5)(!e||qt[t+4]&&qt[t+4].query===e)&&(qt[t].style.cssText=qt[t+1],qt[t].getBBox&&qt[t].setAttribute("transform",qt[t+2]||""),qt[t+3].uncache=1)},Hf=function(){return le.forEach(function(e){return wt(e)&&++e.cacheID&&(e.rec=e())})},ul=function(e,t){var n;for(Mt=0;Mt<oe.length;Mt++)n=oe[Mt],n&&(!t||n._ctx===t)&&(e?n.kill(1):n.revert(!0,!0));qi=!0,t&&Yf(t),t||$r("revert")},Xf=function(e,t){le.cache++,(t||!Pt)&&le.forEach(function(n){return wt(n)&&n.cacheID++&&(n.rec=0)}),Ut(e)&&(ae.history.scrollRestoration=il=e)},Pt,Dr=0,Oc,Yg=function(){if(Oc!==Dr){var e=Oc=Dr;requestAnimationFrame(function(){return e===Dr&&Tr(!0)})}},Wf=function(){_e.appendChild(ai),sl=!Ct&&ai.offsetHeight||ae.innerHeight,_e.removeChild(ai)},Lc=function(e){return ls(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t){return t.style.display=e?"none":"block"})},Tr=function(e,t){if(Kt=be.documentElement,_e=be.body,rl=[ae,be,Kt,_e],mn&&!e&&!qi){st(ce,"scrollEnd",Gf);return}Wf(),Pt=ce.isRefreshing=!0,qi||Hf();var n=$r("refreshInit");Af&&ce.sort(),t||ul(),le.forEach(function(r){wt(r)&&(r.smooth&&(r.target.style.scrollBehavior="auto"),r(0))}),oe.slice(0).forEach(function(r){return r.refresh()}),qi=!1,oe.forEach(function(r){if(r._subPinOffset&&r.pin){var s=r.vars.horizontal?"offsetWidth":"offsetHeight",o=r.pin[s];r.revert(!0,1),r.adjustPinSpacing(r.pin[s]-o),r.refresh()}}),Pa=1,Lc(!0),oe.forEach(function(r){var s=Rn(r.scroller,r._dir),o=r.vars.end==="max"||r._endClamp&&r.end>s,a=r._startClamp&&r.start>=s;(o||a)&&r.setPositions(a?s-1:r.start,o?Math.max(a?s:r.start+1,s):r.end,!0)}),Lc(!1),Pa=0,n.forEach(function(r){return r&&r.render&&r.render(-1)}),le.forEach(function(r){wt(r)&&(r.smooth&&requestAnimationFrame(function(){return r.target.style.scrollBehavior="smooth"}),r.rec&&r(r.rec))}),Xf(il,1),lo.pause(),Dr++,Pt=2,Xn(2),oe.forEach(function(r){return wt(r.vars.onRefresh)&&r.vars.onRefresh(r)}),Pt=ce.isRefreshing=!1,$r("refresh")},Ra=0,qs=1,Ki,Xn=function(e){if(e===2||!Pt&&!qi){ce.isUpdating=!0,Ki&&Ki.update(0);var t=oe.length,n=vt(),r=n-Xo>=50,s=t&&oe[0].scroll();if(qs=Ra>s?-1:1,Pt||(Ra=s),r&&(mn&&!bo&&n-mn>200&&(mn=0,$r("scrollEnd")),Di=Xo,Xo=n),qs<0){for(Mt=t;Mt-- >0;)oe[Mt]&&oe[Mt].update(0,r);qs=1}else for(Mt=0;Mt<t;Mt++)oe[Mt]&&oe[Mt].update(0,r);ce.isUpdating=!1}cs=0},Oa=[Nf,$f,al,ol,dn+Qi,dn+Ui,dn+ji,dn+Vi,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],Us=Oa.concat([Or,Lr,"boxSizing","max"+gi,"max"+ll,"position",dn,je,je+ji,je+Ui,je+Qi,je+Vi]),Hg=function(e,t,n){li(n);var r=e._gsap;if(r.spacerIsNative)li(r.spacerState);else if(e._gsap.swappedIn){var s=t.parentNode;s&&(s.insertBefore(e,t),s.removeChild(t))}e._gsap.swappedIn=!1},qo=function(e,t,n,r){if(!e._gsap.swappedIn){for(var s=Oa.length,o=t.style,a=e.style,l;s--;)l=Oa[s],o[l]=n[l];o.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(o.display="inline-block"),a[al]=a[ol]="auto",o.flexBasis=n.flexBasis||"auto",o.overflow="visible",o.boxSizing="border-box",o[Or]=co(e,At)+Je,o[Lr]=co(e,et)+Je,o[je]=a[dn]=a[$f]=a[Nf]="0",li(r),a[Or]=a["max"+gi]=n[Or],a[Lr]=a["max"+ll]=n[Lr],a[je]=n[je],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}},Xg=/([A-Z])/g,li=function(e){if(e){var t=e.t.style,n=e.length,r=0,s,o;for((e.t._gsap||Y.core.getCache(e.t)).uncache=1;r<n;r+=2)o=e[r+1],s=e[r],o?t[s]=o:t[s]&&t.removeProperty(s.replace(Xg,"-$1").toLowerCase())}},Os=function(e){for(var t=Us.length,n=e.style,r=[],s=0;s<t;s++)r.push(Us[s],n[Us[s]]);return r.t=e,r},Wg=function(e,t,n){for(var r=[],s=e.length,o=n?8:0,a;o<s;o+=2)a=e[o],r.push(a,a in t?t[a]:e[o+1]);return r.t=e.t,r},Vs={left:0,top:0},Dc=function(e,t,n,r,s,o,a,l,c,u,d,h,f,g){wt(e)&&(e=e(l)),Ut(e)&&e.substr(0,3)==="max"&&(e=h+(e.charAt(4)==="="?Xs("0"+e.substr(3),n):0));var p=f?f.time():0,y,v,b;if(f&&f.seek(0),isNaN(e)||(e=+e),Fi(e))f&&(e=Y.utils.mapRange(f.scrollTrigger.start,f.scrollTrigger.end,0,h,e)),a&&Ws(a,n,r,!0);else{wt(t)&&(t=t(l));var x=(e||"0").split(" "),w,T,M,k;b=Dt(t,l)||_e,w=Gn(b)||{},(!w||!w.left&&!w.top)&&hn(b).display==="none"&&(k=b.style.display,b.style.display="block",w=Gn(b),k?b.style.display=k:b.style.removeProperty("display")),T=Xs(x[0],w[r.d]),M=Xs(x[1]||"0",n),e=w[r.p]-c[r.p]-u+T+s-M,a&&Ws(a,M,r,n-M<20||a._isStart&&M>20),n-=n-M}if(g&&(l[g]=e||-.001,e<0&&(e=0)),o){var R=e+n,C=o._isStart;y="scroll"+r.d2,Ws(o,R,r,C&&R>20||!C&&(d?Math.max(_e[y],Kt[y]):o.parentNode[y])<=R+1),d&&(c=Gn(a),d&&(o.style[r.op.p]=c[r.op.p]-r.op.m-o._offset+Je))}return f&&b&&(y=Gn(b),f.seek(h),v=Gn(b),f._caScrollDist=y[r.p]-v[r.p],e=e/f._caScrollDist*h),f&&f.seek(p),f?e:Math.round(e)},qg=/(webkit|moz|length|cssText|inset)/i,zc=function(e,t,n,r){if(e.parentNode!==t){var s=e.style,o,a;if(t===_e){e._stOrig=s.cssText,a=hn(e);for(o in a)!+o&&!qg.test(o)&&a[o]&&typeof s[o]=="string"&&o!=="0"&&(s[o]=a[o]);s.top=n,s.left=r}else s.cssText=e._stOrig;Y.core.getCache(e).uncache=1,t.appendChild(e)}},qf=function(e,t,n){var r=t,s=r;return function(o){var a=Math.round(e());return a!==r&&a!==s&&Math.abs(a-r)>3&&Math.abs(a-s)>3&&(o=a,n&&n()),s=r,r=Math.round(o),r}},Ls=function(e,t,n){var r={};r[t.p]="+="+n,Y.set(e,r)},Ic=function(e,t){var n=cr(e,t),r="_scroll"+t.p2,s=function o(a,l,c,u,d){var h=o.tween,f=l.onComplete,g={};c=c||n();var p=qf(n,c,function(){h.kill(),o.tween=0});return d=u&&d||0,u=u||a-c,h&&h.kill(),l[r]=a,l.inherit=!1,l.modifiers=g,g[r]=function(){return p(c+u*h.ratio+d*h.ratio*h.ratio)},l.onUpdate=function(){le.cache++,o.tween&&Xn()},l.onComplete=function(){o.tween=0,f&&f.call(h)},h=o.tween=Y.to(e,l),h};return e[r]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},st(e,"wheel",n.wheelHandler),ce.isTouch&&st(e,"touchmove",n.wheelHandler),s},ce=function(){function i(t,n){jr||i.register(Y)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),Ma(this),this.init(t,n)}var e=i.prototype;return e.init=function(n,r){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!zi){this.update=this.refresh=this.kill=Cn;return}n=Pc(Ut(n)||Fi(n)||n.nodeType?{trigger:n}:n,As);var s=n,o=s.onUpdate,a=s.toggleClass,l=s.id,c=s.onToggle,u=s.onRefresh,d=s.scrub,h=s.trigger,f=s.pin,g=s.pinSpacing,p=s.invalidateOnRefresh,y=s.anticipatePin,v=s.onScrubComplete,b=s.onSnapComplete,x=s.once,w=s.snap,T=s.pinReparent,M=s.pinSpacer,k=s.containerAnimation,R=s.fastScrollEnd,C=s.preventOverlaps,P=n.horizontal||n.containerAnimation&&n.horizontal!==!1?At:et,B=!d&&d!==0,m=Dt(n.scroller||ae),z=Y.core.getCache(m),I=Fr(m),X=("pinType"in n?n.pinType:sr(m,"pinType")||I&&"fixed")==="fixed",$=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],F=B&&n.toggleActions.split(" "),O="markers"in n?n.markers:As.markers,L=I?0:parseFloat(hn(m)["border"+P.p2+gi])||0,_=this,q=n.onRefreshInit&&function(){return n.onRefreshInit(_)},K=Ig(m,I,P),D=Fg(m,I),W=0,U=0,ne=0,H=cr(m,P),ve,Se,at,ze,ke,V,ie,Ye,tt,E,Pe,lt,gt,me,de,Ie,ct,Fe,_n,Ae,Yt,kt,Rt,Un,Oe,zn,Ot,yn,bn,Ht,Xt,se,on,mt,Lt,ut,In,Fn,ft;if(_._startClamp=_._endClamp=!1,_._dir=P,y*=45,_.scroller=m,_.scroll=k?k.time.bind(k):H,ze=H(),_.vars=n,r=r||n.animation,"refreshPriority"in n&&(Af=1,n.refreshPriority===-9999&&(Ki=_)),z.tweenScroll=z.tweenScroll||{top:Ic(m,et),left:Ic(m,At)},_.tweenTo=ve=z.tweenScroll[P.p],_.scrubDuration=function(N){on=Fi(N)&&N,on?se?se.duration(N):se=Y.to(r,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:on,paused:!0,onComplete:function(){return v&&v(_)}}):(se&&se.progress(1).kill(),se=0)},r&&(r.vars.lazy=!1,r._initted&&!_.isReverted||r.vars.immediateRender!==!1&&n.immediateRender!==!1&&r.duration()&&r.render(0,!0,!0),_.animation=r.pause(),r.scrollTrigger=_,_.scrubDuration(d),Ht=0,l||(l=r.vars.id)),w&&((!vr(w)||w.push)&&(w={snapTo:w}),"scrollBehavior"in _e.style&&Y.set(I?[_e,Kt]:m,{scrollBehavior:"auto"}),le.forEach(function(N){return wt(N)&&N.target===(I?be.scrollingElement||Kt:m)&&(N.smooth=!1)}),at=wt(w.snapTo)?w.snapTo:w.snapTo==="labels"?$g(r):w.snapTo==="labelsDirectional"?Bg(r):w.directional!==!1?function(N,ee){return cl(w.snapTo)(N,vt()-U<500?0:ee.direction)}:Y.utils.snap(w.snapTo),mt=w.duration||{min:.1,max:2},mt=vr(mt)?Wi(mt.min,mt.max):Wi(mt,mt),Lt=Y.delayedCall(w.delay||on/2||.1,function(){var N=H(),ee=vt()-U<500,j=ve.tween;if((ee||Math.abs(_.getVelocity())<10)&&!j&&!bo&&W!==N){var J=(N-V)/me,Ue=r&&!B?r.totalProgress():J,fe=ee?0:(Ue-Xt)/(vt()-Di)*1e3||0,Ne=Y.utils.clamp(-J,1-J,Ur(fe/2)*fe/.185),nt=J+(w.inertia===!1?0:Ne),Le,Te,ge=w,_t=ge.onStart,Re=ge.onInterrupt,yt=ge.onComplete;if(Le=at(nt,_),Fi(Le)||(Le=nt),Te=Math.max(0,Math.round(V+Le*me)),N<=ie&&N>=V&&Te!==N){if(j&&!j._initted&&j.data<=Ur(Te-N))return;w.inertia===!1&&(Ne=Le-J),ve(Te,{duration:mt(Ur(Math.max(Ur(nt-Ue),Ur(Le-Ue))*.185/fe/.05||0)),ease:w.ease||"power3",data:Ur(Te-N),onInterrupt:function(){return Lt.restart(!0)&&Re&&qr(_,Re)},onComplete:function(){_.update(),W=H(),r&&!B&&(se?se.resetTo("totalProgress",Le,r._tTime/r._tDur):r.progress(Le)),Ht=Xt=r&&!B?r.totalProgress():_.progress,b&&b(_),yt&&qr(_,yt)}},N,Ne*me,Te-N-Ne*me),_t&&qr(_,_t,ve.tween)}}else _.isActive&&W!==N&&Lt.restart(!0)}).pause()),l&&(Aa[l]=_),h=_.trigger=Dt(h||f!==!0&&f),ft=h&&h._gsap&&h._gsap.stRevert,ft&&(ft=ft(_)),f=f===!0?h:Dt(f),Ut(a)&&(a={targets:h,className:a}),f&&(g===!1||g===dn||(g=!g&&f.parentNode&&f.parentNode.style&&hn(f.parentNode).display==="flex"?!1:je),_.pin=f,Se=Y.core.getCache(f),Se.spacer?de=Se.pinState:(M&&(M=Dt(M),M&&!M.nodeType&&(M=M.current||M.nativeElement),Se.spacerIsNative=!!M,M&&(Se.spacerState=Os(M))),Se.spacer=Fe=M||be.createElement("div"),Fe.classList.add("pin-spacer"),l&&Fe.classList.add("pin-spacer-"+l),Se.pinState=de=Os(f)),n.force3D!==!1&&Y.set(f,{force3D:!0}),_.spacer=Fe=Se.spacer,bn=hn(f),Un=bn[g+P.os2],Ae=Y.getProperty(f),Yt=Y.quickSetter(f,P.a,Je),qo(f,Fe,bn),ct=Os(f)),O){lt=vr(O)?Pc(O,Ac):Ac,E=Rs("scroller-start",l,m,P,lt,0),Pe=Rs("scroller-end",l,m,P,lt,0,E),_n=E["offset"+P.op.d2];var Nn=Dt(sr(m,"content")||m);Ye=this.markerStart=Rs("start",l,Nn,P,lt,_n,0,k),tt=this.markerEnd=Rs("end",l,Nn,P,lt,_n,0,k),k&&(Fn=Y.quickSetter([Ye,tt],P.a,Je)),!X&&!(Ln.length&&sr(m,"fixedMarkers")===!0)&&(Ng(I?_e:m),Y.set([E,Pe],{force3D:!0}),zn=Y.quickSetter(E,P.a,Je),yn=Y.quickSetter(Pe,P.a,Je))}if(k){var te=k.vars.onUpdate,Z=k.vars.onUpdateParams;k.eventCallback("onUpdate",function(){_.update(0,0,1),te&&te.apply(k,Z||[])})}if(_.previous=function(){return oe[oe.indexOf(_)-1]},_.next=function(){return oe[oe.indexOf(_)+1]},_.revert=function(N,ee){if(!ee)return _.kill(!0);var j=N!==!1||!_.enabled,J=bt;j!==_.isReverted&&(j&&(ut=Math.max(H(),_.scroll.rec||0),ne=_.progress,In=r&&r.progress()),Ye&&[Ye,tt,E,Pe].forEach(function(Ue){return Ue.style.display=j?"none":"block"}),j&&(bt=_,_.update(j)),f&&(!T||!_.isActive)&&(j?Hg(f,Fe,de):qo(f,Fe,hn(f),Oe)),j||_.update(j),bt=J,_.isReverted=j)},_.refresh=function(N,ee,j,J){if(!((bt||!_.enabled)&&!ee)){if(f&&N&&mn){st(i,"scrollEnd",Gf);return}!Pt&&q&&q(_),bt=_,ve.tween&&!j&&(ve.tween.kill(),ve.tween=0),se&&se.pause(),p&&r&&(r.revert({kill:!1}).invalidate(),r.getChildren?r.getChildren(!0,!0,!1).forEach(function(S){return S.vars.immediateRender&&S.render(0,!0,!0)}):r.vars.immediateRender&&r.render(0,!0,!0)),_.isReverted||_.revert(!0,!0),_._subPinOffset=!1;var Ue=K(),fe=D(),Ne=k?k.duration():Rn(m,P),nt=me<=.01||!me,Le=0,Te=J||0,ge=vr(j)?j.end:n.end,_t=n.endTrigger||h,Re=vr(j)?j.start:n.start||(n.start===0||!h?0:f?"0 0":"0 100%"),yt=_.pinnedContainer=n.pinnedContainer&&Dt(n.pinnedContainer,_),an=h&&Math.max(0,oe.indexOf(_))||0,Ke=an,Ze,rt,ln,fr,Ve,Xe,cn,mi,_i,dr,un,Vn,Gr;for(O&&vr(j)&&(Vn=Y.getProperty(E,P.p),Gr=Y.getProperty(Pe,P.p));Ke-- >0;)Xe=oe[Ke],Xe.end||Xe.refresh(0,1)||(bt=_),cn=Xe.pin,cn&&(cn===h||cn===f||cn===yt)&&!Xe.isReverted&&(dr||(dr=[]),dr.unshift(Xe),Xe.revert(!0,!0)),Xe!==oe[Ke]&&(an--,Ke--);for(wt(Re)&&(Re=Re(_)),Re=Tc(Re,"start",_),V=Dc(Re,h,Ue,P,H(),Ye,E,_,fe,L,X,Ne,k,_._startClamp&&"_startClamp")||(f?-.001:0),wt(ge)&&(ge=ge(_)),Ut(ge)&&!ge.indexOf("+=")&&(~ge.indexOf(" ")?ge=(Ut(Re)?Re.split(" ")[0]:"")+ge:(Le=Xs(ge.substr(2),Ue),ge=Ut(Re)?Re:(k?Y.utils.mapRange(0,k.duration(),k.scrollTrigger.start,k.scrollTrigger.end,V):V)+Le,_t=h)),ge=Tc(ge,"end",_),ie=Math.max(V,Dc(ge||(_t?"100% 0":Ne),_t,Ue,P,H()+Le,tt,Pe,_,fe,L,X,Ne,k,_._endClamp&&"_endClamp"))||-.001,Le=0,Ke=an;Ke--;)Xe=oe[Ke]||{},cn=Xe.pin,cn&&Xe.start-Xe._pinPush<=V&&!k&&Xe.end>0&&(Ze=Xe.end-(_._startClamp?Math.max(0,Xe.start):Xe.start),(cn===h&&Xe.start-Xe._pinPush<V||cn===yt)&&isNaN(Re)&&(Le+=Ze*(1-Xe.progress)),cn===f&&(Te+=Ze));if(V+=Le,ie+=Le,_._startClamp&&(_._startClamp+=Le),_._endClamp&&!Pt&&(_._endClamp=ie||-.001,ie=Math.min(ie,Rn(m,P))),me=ie-V||(V-=.01)&&.001,nt&&(ne=Y.utils.clamp(0,1,Y.utils.normalize(V,ie,ut))),_._pinPush=Te,Ye&&Le&&(Ze={},Ze[P.a]="+="+Le,yt&&(Ze[P.p]="-="+H()),Y.set([Ye,tt],Ze)),f&&!(Pa&&_.end>=Rn(m,P)))Ze=hn(f),fr=P===et,ln=H(),kt=parseFloat(Ae(P.a))+Te,!Ne&&ie>1&&(un=(I?be.scrollingElement||Kt:m).style,un={style:un,value:un["overflow"+P.a.toUpperCase()]},I&&hn(_e)["overflow"+P.a.toUpperCase()]!=="scroll"&&(un.style["overflow"+P.a.toUpperCase()]="scroll")),qo(f,Fe,Ze),ct=Os(f),rt=Gn(f,!0),mi=X&&cr(m,fr?At:et)(),g?(Oe=[g+P.os2,me+Te+Je],Oe.t=Fe,Ke=g===je?co(f,P)+me+Te:0,Ke&&(Oe.push(P.d,Ke+Je),Fe.style.flexBasis!=="auto"&&(Fe.style.flexBasis=Ke+Je)),li(Oe),yt&&oe.forEach(function(S){S.pin===yt&&S.vars.pinSpacing!==!1&&(S._subPinOffset=!0)}),X&&H(ut)):(Ke=co(f,P),Ke&&Fe.style.flexBasis!=="auto"&&(Fe.style.flexBasis=Ke+Je)),X&&(Ve={top:rt.top+(fr?ln-V:mi)+Je,left:rt.left+(fr?mi:ln-V)+Je,boxSizing:"border-box",position:"fixed"},Ve[Or]=Ve["max"+gi]=Math.ceil(rt.width)+Je,Ve[Lr]=Ve["max"+ll]=Math.ceil(rt.height)+Je,Ve[dn]=Ve[dn+ji]=Ve[dn+Ui]=Ve[dn+Qi]=Ve[dn+Vi]="0",Ve[je]=Ze[je],Ve[je+ji]=Ze[je+ji],Ve[je+Ui]=Ze[je+Ui],Ve[je+Qi]=Ze[je+Qi],Ve[je+Vi]=Ze[je+Vi],Ie=Wg(de,Ve,T),Pt&&H(0)),r?(_i=r._initted,Yo(1),r.render(r.duration(),!0,!0),Rt=Ae(P.a)-kt+me+Te,Ot=Math.abs(me-Rt)>1,X&&Ot&&Ie.splice(Ie.length-2,2),r.render(0,!0,!0),_i||r.invalidate(!0),r.parent||r.totalTime(r.totalTime()),Yo(0)):Rt=me,un&&(un.value?un.style["overflow"+P.a.toUpperCase()]=un.value:un.style.removeProperty("overflow-"+P.a));else if(h&&H()&&!k)for(rt=h.parentNode;rt&&rt!==_e;)rt._pinOffset&&(V-=rt._pinOffset,ie-=rt._pinOffset),rt=rt.parentNode;dr&&dr.forEach(function(S){return S.revert(!1,!0)}),_.start=V,_.end=ie,ze=ke=Pt?ut:H(),!k&&!Pt&&(ze<ut&&H(ut),_.scroll.rec=0),_.revert(!1,!0),U=vt(),Lt&&(W=-1,Lt.restart(!0)),bt=0,r&&B&&(r._initted||In)&&r.progress()!==In&&r.progress(In||0,!0).render(r.time(),!0,!0),(nt||ne!==_.progress||k||p||r&&!r._initted)&&(r&&!B&&(r._initted||ne||r.vars.immediateRender!==!1)&&r.totalProgress(k&&V<-.001&&!ne?Y.utils.normalize(V,ie,0):ne,!0),_.progress=nt||(ze-V)/me===ne?0:ne),f&&g&&(Fe._pinOffset=Math.round(_.progress*Rt)),se&&se.invalidate(),isNaN(Vn)||(Vn-=Y.getProperty(E,P.p),Gr-=Y.getProperty(Pe,P.p),Ls(E,P,Vn),Ls(Ye,P,Vn-(J||0)),Ls(Pe,P,Gr),Ls(tt,P,Gr-(J||0))),nt&&!Pt&&_.update(),u&&!Pt&&!gt&&(gt=!0,u(_),gt=!1)}},_.getVelocity=function(){return(H()-ke)/(vt()-Di)*1e3||0},_.endAnimation=function(){Mi(_.callbackAnimation),r&&(se?se.progress(1):r.paused()?B||Mi(r,_.direction<0,1):Mi(r,r.reversed()))},_.labelToScroll=function(N){return r&&r.labels&&(V||_.refresh()||V)+r.labels[N]/r.duration()*me||0},_.getTrailing=function(N){var ee=oe.indexOf(_),j=_.direction>0?oe.slice(0,ee).reverse():oe.slice(ee+1);return(Ut(N)?j.filter(function(J){return J.vars.preventOverlaps===N}):j).filter(function(J){return _.direction>0?J.end<=V:J.start>=ie})},_.update=function(N,ee,j){if(!(k&&!j&&!N)){var J=Pt===!0?ut:_.scroll(),Ue=N?0:(J-V)/me,fe=Ue<0?0:Ue>1?1:Ue||0,Ne=_.progress,nt,Le,Te,ge,_t,Re,yt,an;if(ee&&(ke=ze,ze=k?H():J,w&&(Xt=Ht,Ht=r&&!B?r.totalProgress():fe)),y&&f&&!bt&&!Es&&mn&&(!fe&&V<J+(J-ke)/(vt()-Di)*y?fe=1e-4:fe===1&&ie>J+(J-ke)/(vt()-Di)*y&&(fe=.9999)),fe!==Ne&&_.enabled){if(nt=_.isActive=!!fe&&fe<1,Le=!!Ne&&Ne<1,Re=nt!==Le,_t=Re||!!fe!=!!Ne,_.direction=fe>Ne?1:-1,_.progress=fe,_t&&!bt&&(Te=fe&&!Ne?0:fe===1?1:Ne===1?2:3,B&&(ge=!Re&&F[Te+1]!=="none"&&F[Te+1]||F[Te],an=r&&(ge==="complete"||ge==="reset"||ge in r))),C&&(Re||an)&&(an||d||!r)&&(wt(C)?C(_):_.getTrailing(C).forEach(function(ln){return ln.endAnimation()})),B||(se&&!bt&&!Es?(se._dp._time-se._start!==se._time&&se.render(se._dp._time-se._start),se.resetTo?se.resetTo("totalProgress",fe,r._tTime/r._tDur):(se.vars.totalProgress=fe,se.invalidate().restart())):r&&r.totalProgress(fe,!!(bt&&(U||N)))),f){if(N&&g&&(Fe.style[g+P.os2]=Un),!X)Yt(Ii(kt+Rt*fe));else if(_t){if(yt=!N&&fe>Ne&&ie+1>J&&J+1>=Rn(m,P),T)if(!N&&(nt||yt)){var Ke=Gn(f,!0),Ze=J-V;zc(f,_e,Ke.top+(P===et?Ze:0)+Je,Ke.left+(P===et?0:Ze)+Je)}else zc(f,Fe);li(nt||yt?Ie:ct),Ot&&fe<1&&nt||Yt(kt+(fe===1&&!yt?Rt:0))}}w&&!ve.tween&&!bt&&!Es&&Lt.restart(!0),a&&(Re||x&&fe&&(fe<1||!Ho))&&ls(a.targets).forEach(function(ln){return ln.classList[nt||x?"add":"remove"](a.className)}),o&&!B&&!N&&o(_),_t&&!bt?(B&&(an&&(ge==="complete"?r.pause().totalProgress(1):ge==="reset"?r.restart(!0).pause():ge==="restart"?r.restart(!0):r[ge]()),o&&o(_)),(Re||!Ho)&&(c&&Re&&qr(_,c),$[Te]&&qr(_,$[Te]),x&&(fe===1?_.kill(!1,1):$[Te]=0),Re||(Te=fe===1?1:3,$[Te]&&qr(_,$[Te]))),R&&!nt&&Math.abs(_.getVelocity())>(Fi(R)?R:2500)&&(Mi(_.callbackAnimation),se?se.progress(1):Mi(r,ge==="reverse"?1:!fe,1))):B&&o&&!bt&&o(_)}if(yn){var rt=k?J/k.duration()*(k._caScrollDist||0):J;zn(rt+(E._isFlipped?1:0)),yn(rt)}Fn&&Fn(-J/k.duration()*(k._caScrollDist||0))}},_.enable=function(N,ee){_.enabled||(_.enabled=!0,st(m,"resize",Ni),I||st(m,"scroll",Vr),q&&st(i,"refreshInit",q),N!==!1&&(_.progress=ne=0,ze=ke=W=H()),ee!==!1&&_.refresh())},_.getTween=function(N){return N&&ve?ve.tween:se},_.setPositions=function(N,ee,j,J){if(k){var Ue=k.scrollTrigger,fe=k.duration(),Ne=Ue.end-Ue.start;N=Ue.start+Ne*N/fe,ee=Ue.start+Ne*ee/fe}_.refresh(!1,!1,{start:Ec(N,j&&!!_._startClamp),end:Ec(ee,j&&!!_._endClamp)},J),_.update()},_.adjustPinSpacing=function(N){if(Oe&&N){var ee=Oe.indexOf(P.d)+1;Oe[ee]=parseFloat(Oe[ee])+N+Je,Oe[1]=parseFloat(Oe[1])+N+Je,li(Oe)}},_.disable=function(N,ee){if(N!==!1&&_.revert(!0,!0),_.enabled&&(_.enabled=_.isActive=!1,ee||se&&se.pause(),ut=0,Se&&(Se.uncache=1),q&&it(i,"refreshInit",q),Lt&&(Lt.pause(),ve.tween&&ve.tween.kill()&&(ve.tween=0)),!I)){for(var j=oe.length;j--;)if(oe[j].scroller===m&&oe[j]!==_)return;it(m,"resize",Ni),I||it(m,"scroll",Vr)}},_.kill=function(N,ee){_.disable(N,ee),se&&!ee&&se.kill(),l&&delete Aa[l];var j=oe.indexOf(_);j>=0&&oe.splice(j,1),j===Mt&&qs>0&&Mt--,j=0,oe.forEach(function(J){return J.scroller===_.scroller&&(j=1)}),j||Pt||(_.scroll.rec=0),r&&(r.scrollTrigger=null,N&&r.revert({kill:!1}),ee||r.kill()),Ye&&[Ye,tt,E,Pe].forEach(function(J){return J.parentNode&&J.parentNode.removeChild(J)}),Ki===_&&(Ki=0),f&&(Se&&(Se.uncache=1),j=0,oe.forEach(function(J){return J.pin===f&&j++}),j||(Se.spacer=0)),n.onKill&&n.onKill(_)},oe.push(_),_.enable(!1,!1),ft&&ft(_),r&&r.add&&!me){var ue=_.update;_.update=function(){_.update=ue,le.cache++,V||ie||_.refresh()},Y.delayedCall(.01,_.update),me=.01,V=ie=0}else _.refresh();f&&Yg()},i.register=function(n){return jr||(Y=n||zf(),Df()&&window.document&&i.enable(),jr=zi),jr},i.defaults=function(n){if(n)for(var r in n)As[r]=n[r];return As},i.disable=function(n,r){zi=0,oe.forEach(function(o){return o[r?"kill":"disable"](n)}),it(ae,"wheel",Vr),it(be,"scroll",Vr),clearInterval(Ts),it(be,"touchcancel",Cn),it(_e,"touchstart",Cn),Ms(it,be,"pointerdown,touchstart,mousedown",Cc),Ms(it,be,"pointerup,touchend,mouseup",Mc),lo.kill(),Cs(it);for(var s=0;s<le.length;s+=3)Ps(it,le[s],le[s+1]),Ps(it,le[s],le[s+2])},i.enable=function(){if(ae=window,be=document,Kt=be.documentElement,_e=be.body,Y){if(ls=Y.utils.toArray,Wi=Y.utils.clamp,Ma=Y.core.context||Cn,Yo=Y.core.suppressOverwrites||Cn,il=ae.history.scrollRestoration||"auto",Ra=ae.pageYOffset||0,Y.core.globals("ScrollTrigger",i),_e){zi=1,ai=document.createElement("div"),ai.style.height="100vh",ai.style.position="absolute",Wf(),zg(),qe.register(Y),i.isTouch=qe.isTouch,jn=qe.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),Ca=qe.isTouch===1,st(ae,"wheel",Vr),rl=[ae,be,Kt,_e],Y.matchMedia?(i.matchMedia=function(u){var d=Y.matchMedia(),h;for(h in u)d.add(h,u[h]);return d},Y.addEventListener("matchMediaInit",function(){Hf(),ul()}),Y.addEventListener("matchMediaRevert",function(){return Yf()}),Y.addEventListener("matchMedia",function(){Tr(0,1),$r("matchMedia")}),Y.matchMedia().add("(orientation: portrait)",function(){return Wo(),Wo})):console.warn("Requires GSAP 3.11.0 or later"),Wo(),st(be,"scroll",Vr);var n=_e.hasAttribute("style"),r=_e.style,s=r.borderTopStyle,o=Y.core.Animation.prototype,a,l;for(o.revert||Object.defineProperty(o,"revert",{value:function(){return this.time(-.01,!0)}}),r.borderTopStyle="solid",a=Gn(_e),et.m=Math.round(a.top+et.sc())||0,At.m=Math.round(a.left+At.sc())||0,s?r.borderTopStyle=s:r.removeProperty("border-top-style"),n||(_e.setAttribute("style",""),_e.removeAttribute("style")),Ts=setInterval(Rc,250),Y.delayedCall(.5,function(){return Es=0}),st(be,"touchcancel",Cn),st(_e,"touchstart",Cn),Ms(st,be,"pointerdown,touchstart,mousedown",Cc),Ms(st,be,"pointerup,touchend,mouseup",Mc),Ea=Y.utils.checkPrefix("transform"),Us.push(Ea),jr=vt(),lo=Y.delayedCall(.2,Tr).pause(),Qr=[be,"visibilitychange",function(){var u=ae.innerWidth,d=ae.innerHeight;be.hidden?(Sc=u,kc=d):(Sc!==u||kc!==d)&&Ni()},be,"DOMContentLoaded",Tr,ae,"load",Tr,ae,"resize",Ni],Cs(st),oe.forEach(function(u){return u.enable(0,1)}),l=0;l<le.length;l+=3)Ps(it,le[l],le[l+1]),Ps(it,le[l],le[l+2])}else if(be){var c=function u(){i.enable(),be.removeEventListener("DOMContentLoaded",u)};be.addEventListener("DOMContentLoaded",c)}}},i.config=function(n){"limitCallbacks"in n&&(Ho=!!n.limitCallbacks);var r=n.syncInterval;r&&clearInterval(Ts)||(Ts=r)&&setInterval(Rc,r),"ignoreMobileResize"in n&&(Ca=i.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(Cs(it)||Cs(st,n.autoRefreshEvents||"none"),Rf=(n.autoRefreshEvents+"").indexOf("resize")===-1)},i.scrollerProxy=function(n,r){var s=Dt(n),o=le.indexOf(s),a=Fr(s);~o&&le.splice(o,a?6:2),r&&(a?Ln.unshift(ae,r,_e,r,Kt,r):Ln.unshift(s,r))},i.clearMatchMedia=function(n){oe.forEach(function(r){return r._ctx&&r._ctx.query===n&&r._ctx.kill(!0,!0)})},i.isInViewport=function(n,r,s){var o=(Ut(n)?Dt(n):n).getBoundingClientRect(),a=o[s?Or:Lr]*r||0;return s?o.right-a>0&&o.left+a<ae.innerWidth:o.bottom-a>0&&o.top+a<ae.innerHeight},i.positionInViewport=function(n,r,s){Ut(n)&&(n=Dt(n));var o=n.getBoundingClientRect(),a=o[s?Or:Lr],l=r==null?a/2:r in uo?uo[r]*a:~r.indexOf("%")?parseFloat(r)*a/100:parseFloat(r)||0;return s?(o.left+l)/ae.innerWidth:(o.top+l)/ae.innerHeight},i.killAll=function(n){if(oe.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var r=Nr.killAll||[];Nr={},r.forEach(function(s){return s()})}},i}();ce.version="3.15.0";ce.saveStyles=function(i){return i?ls(i).forEach(function(e){if(e&&e.style){var t=qt.indexOf(e);t>=0&&qt.splice(t,5),qt.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),Y.core.getCache(e),Ma())}}):qt};ce.revert=function(i,e){return ul(!i,e)};ce.create=function(i,e){return new ce(i,e)};ce.refresh=function(i){return i?Ni(!0):(jr||ce.register())&&Tr(!0)};ce.update=function(i){return++le.cache&&Xn(i===!0?2:0)};ce.clearScrollMemory=Xf;ce.maxScroll=function(i,e){return Rn(i,e?At:et)};ce.getScrollFunc=function(i,e){return cr(Dt(i),e?At:et)};ce.getById=function(i){return Aa[i]};ce.getAll=function(){return oe.filter(function(i){return i.vars.id!=="ScrollSmoother"})};ce.isScrolling=function(){return!!mn};ce.snapDirectional=cl;ce.addEventListener=function(i,e){var t=Nr[i]||(Nr[i]=[]);~t.indexOf(e)||t.push(e)};ce.removeEventListener=function(i,e){var t=Nr[i],n=t&&t.indexOf(e);n>=0&&t.splice(n,1)};ce.batch=function(i,e){var t=[],n={},r=e.interval||.016,s=e.batchMax||1e9,o=function(c,u){var d=[],h=[],f=Y.delayedCall(r,function(){u(d,h),d=[],h=[]}).pause();return function(g){d.length||f.restart(!0),d.push(g.trigger),h.push(g),s<=d.length&&f.progress(1)}},a;for(a in e)n[a]=a.substr(0,2)==="on"&&wt(e[a])&&a!=="onRefreshInit"?o(a,e[a]):e[a];return wt(s)&&(s=s(),st(ce,"refresh",function(){return s=e.batchMax()})),ls(i).forEach(function(l){var c={};for(a in n)c[a]=n[a];c.trigger=l,t.push(ce.create(c))}),t};var Fc=function(e,t,n,r){return t>r?e(r):t<0&&e(0),n>r?(r-t)/(n-t):n<0?t/(t-n):1},Uo=function i(e,t){t===!0?e.style.removeProperty("touch-action"):e.style.touchAction=t===!0?"auto":t?"pan-"+t+(qe.isTouch?" pinch-zoom":""):"none",e===Kt&&i(_e,t)},Ds={auto:1,scroll:1},Ug=function(e){var t=e.event,n=e.target,r=e.axis,s=(t.changedTouches?t.changedTouches[0]:t).target,o=s._gsap||Y.core.getCache(s),a=vt(),l;if(!o._isScrollT||a-o._isScrollT>2e3){for(;s&&s!==_e&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(Ds[(l=hn(s)).overflowY]||Ds[l.overflowX]));)s=s.parentNode;o._isScroll=s&&s!==n&&!Fr(s)&&(Ds[(l=hn(s)).overflowY]||Ds[l.overflowX]),o._isScrollT=a}(o._isScroll||r==="x")&&(t.stopPropagation(),t._gsapAllow=!0)},Uf=function(e,t,n,r){return qe.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:r=r&&Ug,onPress:r,onDrag:r,onScroll:r,onEnable:function(){return n&&st(be,qe.eventTypes[0],$c,!1,!0)},onDisable:function(){return it(be,qe.eventTypes[0],$c,!0)}})},Vg=/(input|label|select|textarea)/i,Nc,$c=function(e){var t=Vg.test(e.target.tagName);(t||Nc)&&(e._gsapAllow=!0,Nc=t)},jg=function(e){vr(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var t=e,n=t.normalizeScrollX,r=t.momentum,s=t.allowNestedScroll,o=t.onRelease,a,l,c=Dt(e.target)||Kt,u=Y.core.globals().ScrollSmoother,d=u&&u.get(),h=jn&&(e.content&&Dt(e.content)||d&&e.content!==!1&&!d.smooth()&&d.content()),f=cr(c,et),g=cr(c,At),p=1,y=(qe.isTouch&&ae.visualViewport?ae.visualViewport.scale*ae.visualViewport.width:ae.outerWidth)/ae.innerWidth,v=0,b=wt(r)?function(){return r(a)}:function(){return r||2.8},x,w,T=Uf(c,e.type,!0,s),M=function(){return w=!1},k=Cn,R=Cn,C=function(){l=Rn(c,et),R=Wi(jn?1:0,l),n&&(k=Wi(0,Rn(c,At))),x=Dr},P=function(){h._gsap.y=Ii(parseFloat(h._gsap.y)+f.offset)+"px",h.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(h._gsap.y)+", 0, 1)",f.offset=f.cacheID=0},B=function(){if(w){requestAnimationFrame(M);var O=Ii(a.deltaY/2),L=R(f.v-O);if(h&&L!==f.v+f.offset){f.offset=L-f.v;var _=Ii((parseFloat(h&&h._gsap.y)||0)-f.offset);h.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+_+", 0, 1)",h._gsap.y=_+"px",f.cacheID=le.cache,Xn()}return!0}f.offset&&P(),w=!0},m,z,I,X,$=function(){C(),m.isActive()&&m.vars.scrollY>l&&(f()>l?m.progress(1)&&f(l):m.resetTo("scrollY",l))};return h&&Y.set(h,{y:"+=0"}),e.ignoreCheck=function(F){return jn&&F.type==="touchmove"&&B()||p>1.05&&F.type!=="touchstart"||a.isGesturing||F.touches&&F.touches.length>1},e.onPress=function(){w=!1;var F=p;p=Ii((ae.visualViewport&&ae.visualViewport.scale||1)/y),m.pause(),F!==p&&Uo(c,p>1.01?!0:n?!1:"x"),z=g(),I=f(),C(),x=Dr},e.onRelease=e.onGestureStart=function(F,O){if(f.offset&&P(),!O)X.restart(!0);else{le.cache++;var L=b(),_,q;n&&(_=g(),q=_+L*.05*-F.velocityX/.227,L*=Fc(g,_,q,Rn(c,At)),m.vars.scrollX=k(q)),_=f(),q=_+L*.05*-F.velocityY/.227,L*=Fc(f,_,q,Rn(c,et)),m.vars.scrollY=R(q),m.invalidate().duration(L).play(.01),(jn&&m.vars.scrollY>=l||_>=l-1)&&Y.to({},{onUpdate:$,duration:L})}o&&o(F)},e.onWheel=function(){m._ts&&m.pause(),vt()-v>1e3&&(x=0,v=vt())},e.onChange=function(F,O,L,_,q){if(Dr!==x&&C(),O&&n&&g(k(_[2]===O?z+(F.startX-F.x):g()+O-_[1])),L){f.offset&&P();var K=q[2]===L,D=K?I+F.startY-F.y:f()+L-q[1],W=R(D);K&&D!==W&&(I+=W-D),f(W)}(L||O)&&Xn()},e.onEnable=function(){Uo(c,n?!1:"x"),ce.addEventListener("refresh",$),st(ae,"resize",$),f.smooth&&(f.target.style.scrollBehavior="auto",f.smooth=g.smooth=!1),T.enable()},e.onDisable=function(){Uo(c,!0),it(ae,"resize",$),ce.removeEventListener("refresh",$),T.kill()},e.lockAxis=e.lockAxis!==!1,a=new qe(e),a.iOS=jn,jn&&!f()&&f(1),jn&&Y.ticker.add(Cn),X=a._dc,m=Y.to(a,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:qf(f,f(),function(){return m.pause()})},onUpdate:Xn,onComplete:X.vars.onComplete}),a};ce.sort=function(i){if(wt(i))return oe.sort(i);var e=ae.pageYOffset||0;return ce.getAll().forEach(function(t){return t._sortY=t.trigger?e+t.trigger.getBoundingClientRect().top:t.start+ae.innerHeight}),oe.sort(i||function(t,n){return(t.vars.refreshPriority||0)*-1e6+(t.vars.containerAnimation?1e6:t._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};ce.observe=function(i){return new qe(i)};ce.normalizeScroll=function(i){if(typeof i>"u")return Ct;if(i===!0&&Ct)return Ct.enable();if(i===!1){Ct&&Ct.kill(),Ct=i;return}var e=i instanceof qe?i:jg(i);return Ct&&Ct.target===e.target&&Ct.kill(),Fr(e.target)&&(Ct=e),e};ce.core={_getVelocityProp:Ta,_inputObserver:Uf,_scrollers:le,_proxies:Ln,bridge:{ss:function(){mn||$r("scrollStart"),mn=vt()},ref:function(){return bt}}};zf()&&Y.registerPlugin(ce);An.registerPlugin(ce);const Bc=Object.assign({"./chapters/ch1.ts":th,"./chapters/ch2.ts":i0,"./chapters/ch3.ts":_0,"./chapters/ch4.ts":C0,"./chapters/ch5.ts":og,"./chapters/ch6.ts":mg,"./chapters/ch7.ts":kg,"./chapters/ch8.ts":Ag}),Qg=Object.keys(Bc).map(i=>{const e=i.match(/\/(ch\d+)\.ts$/);return e?{id:e[1],num:parseInt(e[1].slice(2),10),create:Bc[i].createChapter}:null}).filter(i=>i!==null).sort((i,e)=>i.num-e.num);function Kg(i,e){const t=[],n=[];return Qg.forEach((r,s)=>{const o=document.getElementById(r.id);if(!o)throw new Error(`缺少章节容器 #${r.id}（检查 index.html）`);const a=y0[r.id];if(!a)throw new Error(`COPY 缺少 ${r.id} 文案`);const l=r.create({sky:i,root:o,copy:a,id:r.id});t.push(l),n.push(ce.create({trigger:o,start:"top top",end:"bottom bottom",scrub:!0,onEnter:()=>l.enter(),onEnterBack:()=>l.enter(),onLeave:()=>l.exit(),onLeaveBack:()=>l.exit(),onUpdate:c=>{l.update(c.progress),e(s+c.progress)}}))}),{chapters:t,triggers:n}}const fo=30,Gc=.22,Zg=`
.app-cursor-ring, .app-cursor-dot {
  position: fixed; top: 0; left: 0; z-index: 60; pointer-events: none;
  border-radius: 50%; transform: translate(-50%, -50%);
  will-change: transform;
}
.app-cursor-ring {
  width: ${fo}px; height: ${fo}px;
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
`;function Jg(i){if(window.matchMedia("(pointer: coarse)").matches)return;const e=document.createElement("style");e.textContent=Zg,document.head.appendChild(e);const t=document.createElement("div");t.className="app-cursor-ring app-cursor-hidden";const n=document.createElement("div");n.className="app-cursor-dot app-cursor-hidden",document.body.append(t,n);let r=-100,s=-100,o=-100,a=-100,l=!1,c=!1;const u=document.querySelector(".sky-tooltip");window.addEventListener("pointermove",f=>{const g=f.target===i;r=f.clientX,s=f.clientY,g!==l&&(l=g,t.classList.toggle("app-cursor-hidden",!l),n.classList.toggle("app-cursor-hidden",!l))}),window.addEventListener("pointerdown",()=>{c=!0,t.classList.add("is-down")}),window.addEventListener("pointerup",()=>{c=!1,t.classList.remove("is-down")}),document.documentElement.addEventListener("mouseleave",()=>{l=!1,t.classList.add("app-cursor-hidden"),n.classList.add("app-cursor-hidden")});let d=1;const h=()=>{o+=(r-o)*Gc,a+=(s-a)*Gc;const f=u!==null&&u.style.display==="block",g=(f?.55:1)*(c?.8:1);d+=(g-d)*.2,t.classList.toggle("is-star",f),t.style.transform=`translate(${o-fo/2}px, ${a-fo/2}px) scale(${d.toFixed(3)})`,n.style.transform=`translate(${r-2}px, ${s-2}px)`,requestAnimationFrame(h)};requestAnimationFrame(h)}const em=1.015,Yc={ra:192.8595,dec:27.1283},Hc={ra:266.405,dec:-28.9362},tm=.085,nm=.14,rm=.9,im=.6,sm=new Qc(.96,.9,.78),om=new Qc(1,.88,.68),am=`
varying vec3 vDir;
void main() {
  // 球心在原点：物体空间坐标即天球方向（随父组岁差旋转，与星点行为一致）
  vDir = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,lm=`
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
`;function cm(i){const e=new re(...Bt(Yc.ra,Yc.dec)).normalize(),t=new re(...Bt(Hc.ra,Hc.dec)),n=t.addScaledVector(e,-t.dot(e)).normalize(),r=new re().crossVectors(e,n).normalize(),s=new yd(i*em,96,64),o=new Wc({vertexShader:am,fragmentShader:lm,uniforms:{uPole:{value:e},uE0:{value:n},uE1:{value:r},uPeakAlpha:{value:tm},uWidth:{value:nm},uCenterSigma:{value:rm},uDust:{value:im},uColorBand:{value:sm},uColorCore:{value:om}},transparent:!0,depthWrite:!1,blending:zr,side:bd}),a=new js(s,o);a.name="milkyway-shell";const l=new wn;return l.name="milkyway",l.add(a),{group:l,dispose(){s.dispose(),o.dispose()}}}function Vf(){document.fullscreenEnabled&&(document.fullscreenElement?Promise.resolve(document.exitFullscreen()).catch(()=>{}):Promise.resolve(document.documentElement.requestFullscreen()).catch(()=>{}))}const um=`
.app-pager {
  position: fixed; right: 20px; bottom: 20px; z-index: 50;
  display: flex; align-items: center; gap: 10px;
  pointer-events: none; user-select: none;
  font-family: var(--font-display, "Noto Serif SC", "STSong", serif);
}
.app-pager-btn {
  pointer-events: auto;
  min-width: 44px; height: 44px; padding: 0 12px;
  border-radius: 999px;
  border: 1px solid rgba(201, 162, 39, 0.55);
  background: rgba(13, 13, 17, 0.72);
  backdrop-filter: blur(6px);
  color: #fce1b6; font-size: 22px; line-height: 1;
  cursor: pointer;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease, transform 0.1s ease;
}
.app-pager-btn:hover:not(:disabled) { border-color: #c9a227; box-shadow: 0 0 12px rgba(201, 162, 39, 0.35); }
.app-pager-btn:active:not(:disabled) { transform: scale(0.94); }
.app-pager-btn:disabled { opacity: 0.28; cursor: default; }
.app-pager-idx {
  pointer-events: none;
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid rgba(201, 162, 39, 0.35);
  background: rgba(13, 13, 17, 0.72);
  backdrop-filter: blur(6px);
  color: #c9a227;
  font-size: 13px; letter-spacing: 0.22em; white-space: nowrap;
  text-shadow: 0 0 8px rgba(201, 162, 39, 0.4);
}
@media (max-width: 640px) {
  .app-pager { right: 12px; bottom: 12px; gap: 8px; }
  .app-pager-idx { font-size: 12px; padding: 7px 10px; letter-spacing: 0.14em; }
}
`;function fm({sections:i,names:e}){const t=document.createElement("style");t.textContent=um,document.head.appendChild(t);const n=document.createElement("div");n.className="app-pager";const r=document.createElement("button");r.className="app-pager-btn",r.type="button",r.setAttribute("aria-label","上一章"),r.textContent="‹";const s=document.createElement("span");s.className="app-pager-idx";const o=document.createElement("button");if(o.className="app-pager-btn",o.type="button",o.setAttribute("aria-label","下一章"),o.textContent="›",document.fullscreenEnabled){const h=document.createElement("button");h.className="app-pager-btn",h.type="button";const f=()=>{const g=!!document.fullscreenElement;h.textContent=g?"✕":"⛶",h.setAttribute("aria-label",g?"退出全屏（F）":"进入全屏（F）")};h.addEventListener("click",Vf),document.addEventListener("fullscreenchange",f),f(),n.append(r,s,o,h)}else n.append(r,s,o);document.body.appendChild(n);const a=i.length-1;let l=0;function c(){const h=window.innerHeight,f=[];for(const g of i){const p=g.offsetTop,y=Math.max(g.offsetHeight-h,0),v=Math.round(y/h);for(let b=0;b<=v;b++)f.push(p+Math.min(b*h,y))}return f.sort((g,p)=>g-p)}function u(){s.textContent=e[l]?`${e[l]} · ${l+1}/${i.length}`:`${l+1}/${i.length}`;const h=document.documentElement.scrollHeight-window.innerHeight;r.disabled=window.scrollY<=2,o.disabled=window.scrollY>=h-2}function d(h){const f=c(),g=window.scrollY,p=2,y=h>0?f.find(v=>v>g+p)??f[f.length-1]:[...f].reverse().find(v=>v<g-p)??0;y!==void 0&&window.scrollTo({top:y,behavior:"smooth"})}return r.addEventListener("click",()=>d(-1)),o.addEventListener("click",()=>d(1)),window.addEventListener("scroll",u,{passive:!0}),u(),{setCurrent(h){const f=Math.min(Math.max(Math.round(h),0),a);f!==l&&(l=f,u())}}}const dm=3.5;function hm(){try{const i=document.createElement("canvas");return!!(i.getContext("webgl2")||i.getContext("webgl"))}catch{return!1}}function Xc(i){var n,r,s;const e=document.getElementById("fallback");e&&(e.hidden=!1);const t=document.getElementById("fallback-diag");t&&(t.textContent=`诊断信息：${i}`),(n=document.getElementById("chapters"))==null||n.setAttribute("hidden",""),(r=document.getElementById("sky-canvas"))==null||r.setAttribute("hidden",""),(s=document.getElementById("loading"))==null||s.remove()}async function pm(){const i=document.getElementById("sky-canvas");if(!i)throw new Error("缺少 #sky-canvas");const e=new xa(i);Jg(i);const t=document.getElementById("loading");try{await e.init()}catch(u){console.error(u),t&&(t.textContent="星空数据加载失败，请检查开发服务器");return}t==null||t.remove(),e.addSkyObject(cm(ye).group),qd();const n=new Qs(Qd),r=[1,2,3,4,5,6,7,8].map(u=>document.getElementById(`ch${u}`)),s=["序","星野","授时","天人","天球","岁差","对话","尾声"],o=fm({sections:r,names:s});window.addEventListener("keydown",u=>{if(u.key!=="f"&&u.key!=="F"||u.ctrlKey||u.metaKey||u.altKey)return;const d=u.target;d&&(d.tagName==="INPUT"||d.tagName==="TEXTAREA"||d.isContentEditable)||Vf()});let a=0,l=0;const{chapters:c}=Kg(e,u=>{a=u,o.setCurrent(Math.min(Math.floor(u),s.length-1))});e.start(u=>{var h,f;l+=(a-l)*(1-Math.exp(-u*dm)),e.applyCameraState(n.sampleGlobal(l));const d=Math.min(Math.max(Math.floor(l),0),c.length-1);(f=(h=c[d])==null?void 0:h.frame)==null||f.call(h,u)})}hm()?pm().catch(i=>{console.error(i),Xc(i instanceof Error?i.message:String(i))}):Xc("当前浏览器环境无法创建 WebGL 上下文（webgl2 / webgl 均不可用）");
