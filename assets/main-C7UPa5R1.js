var nh=Object.defineProperty;var rh=(i,e,n)=>e in i?nh(i,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):i[e]=n;var H=(i,e,n)=>rh(i,typeof e!="symbol"?e+"":e,n);import{M as Bo,V as Oe,Q as gn,r as kn,a as $e,d as nr,S as Fc,b as Bc,C as Gc,w as ih,G as Fn,c as sh,E as Ci,W as oh,e as ah,P as lh,f as ch,g as uh,h as fh,l as hh,i as dh,j as ph,p as gh,k as dl,m as mh,B as pl,A as _h,D as gl,n as bh,o as Ys,T as Hc,q as yh,s as vh,t as xh,L as wh,u as qc,v as Sh,x as Yc,y as kh,z as Th,F as Ch}from"./detailCard-86iU6Ipn.js";const Eh=.5,Xc=1.5,Mh=8,Ph=400,Ah=.03,Rh=55,Oh=82.4,ml=3,Lh=.5,Dh=.28,zh=900,Ih=.035,$h=.018,Nh=24,_l=6e3,Fh=15e3,Bh=220,bl=[0,2,5,7,9,12,14,17,19,21,24],Gh=3,Hh=.996,qh=2600,yl=.05,Yh=.1,Xh=.6,Wh=`
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
`,Uh=`
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
</svg>`;let vl=!1,en=null,Gn=!1,xo=0,Rs=null;const xl=new Map;function Vh(i){const e=i.sampleRate,n=Math.floor(Mh*e),t=i.createBuffer(1,n,e),r=t.getChannelData(0);let s=0;for(let a=0;a<n;a++){const l=Math.random()*2-1;s=(s+.02*l)/1.02,r[a]=s*3.5}const o=Math.min(Math.floor(e*.1),n>>2);for(let a=0;a<o;a++){const l=a/o;r[n-o+a]=r[n-o+a]*(1-l)+r[a]*l}return t}function jh(i,e){const n=i.sampleRate,t=Math.floor(Gh*n),r=i.createBuffer(1,t,n),s=r.getChannelData(0),o=Math.max(2,Math.round(n/e)),a=new Float32Array(o);for(let c=0;c<o;c++)a[c]=Math.random()*2-1;let l=0;for(let c=0;c<t;c++){const u=(l+1)%o;s[c]=a[l],a[l]=Hh*.5*(a[l]+a[u]),l=u}return r}function Qh(i){const e=i.createGain();e.gain.value=0,e.connect(i.destination);const n=i.createBufferSource();n.buffer=Vh(i),n.loop=!0;const t=i.createBiquadFilter();t.type="lowpass",t.frequency.value=Ph;const r=i.createGain();r.gain.value=Ah,n.connect(t).connect(r).connect(e),n.start();const s=i.createBiquadFilter();s.type="lowpass",s.frequency.value=zh;const o=i.createGain();o.gain.value=Ih,s.connect(o).connect(e);const a=i.createOscillator();a.type="sine",a.frequency.value=Rh,a.detune.value=-ml;const l=i.createGain();l.gain.value=Lh,a.connect(l).connect(s);const c=i.createOscillator();c.type="triangle",c.frequency.value=Oh,c.detune.value=ml;const u=i.createGain();u.gain.value=Dh,c.connect(u).connect(s);const h=i.createOscillator();h.type="sine",h.frequency.value=1/Nh;const d=i.createGain();return d.gain.value=$h,h.connect(d).connect(o.gain),a.start(),c.start(),h.start(),{ctx:i,master:e}}function Kh({ctx:i,master:e}){const n=bl[Math.floor(Math.random()*bl.length)],t=Bh*Math.pow(2,n/12);let r=xl.get(t);r||(r=jh(i,t),xl.set(t,r));const s=i.createBufferSource();s.buffer=r;const o=i.createBiquadFilter();o.type="lowpass",o.frequency.value=qh;const a=i.createGain();a.gain.value=yl+Math.random()*(Yh-yl);const l=i.createStereoPanner();l.pan.value=(Math.random()*2-1)*Xh,s.connect(o).connect(a).connect(l).connect(e),s.onended=()=>{s.disconnect(),o.disconnect(),a.disconnect(),l.disconnect()},s.start()}function wl(i,e){const n=i.context.currentTime,t=i.gain;t.cancelScheduledValues(n),t.setValueAtTime(t.value,n),t.linearRampToValueAtTime(e,n+Xc)}function Wc(){Rs!==null&&(window.clearTimeout(Rs),Rs=null)}function Uc(){Wc(),Rs=window.setTimeout(()=>{en&&Gn&&en.ctx.state==="running"&&Kh(en),Uc()},_l+Math.random()*(Fh-_l))}function Vc(i){i.classList.toggle("is-on",Gn);const e=Gn?"关闭环境音":"开启环境音";i.setAttribute("aria-label",e),i.setAttribute("aria-pressed",String(Gn)),i.title=e}function jc(){const i=window;return i.AudioContext??i.webkitAudioContext}async function Zh(i){if(!en){const t=jc();if(!t)return;en=Qh(new t)}Gn=!Gn,xo++,Vc(i);const{ctx:e,master:n}=en;if(Gn)e.state!=="running"&&await e.resume().catch(()=>{}),wl(n,Eh),Uc();else{wl(n,0),Wc();const t=xo;window.setTimeout(()=>{en&&!Gn&&t===xo&&en.ctx.state==="running"&&en.ctx.suspend()},(Xc+.1)*1e3)}}function Jh(){if(vl||typeof document>"u")return;vl=!0;const i=document.createElement("style");i.textContent=Wh,document.head.appendChild(i);const e=document.createElement("button");if(e.type="button",e.className="app-ambient-toggle",e.innerHTML=Uh,document.body.appendChild(e),!jc()){e.disabled=!0,e.setAttribute("aria-label","环境音不可用"),e.title="当前浏览器不支持 Web Audio";return}Vc(e),e.addEventListener("click",()=>{Zh(e)}),document.addEventListener("visibilitychange",()=>{en&&(document.hidden?en.ctx.state==="running"&&en.ctx.suspend():Gn&&en.ctx.resume())})}const ed=.65,td=new Oe(0,1,0),nd={ra:0,dec:80};function Sl(i){return i=$e.clamp(i,0,1),i*i*(3-2*i)}function Qn(i,e){const n=new Oe(...kn(i,e,1)),t=new Bo().lookAt(new Oe(0,0,0),n,td);return new gn().setFromRotationMatrix(t)}function kl(i){if(i.gaze!=="target")return null;const e=i.target??nd;return Qn(e.ra,e.dec)}class Xs{constructor(e,n=ed){H(this,"keys");H(this,"hold");if(e.length<2)throw new Error("CameraRig 至少需要 2 个关键帧");this.hold=$e.clamp(n,0,.95);for(const[t,r]of e.entries()){if(!(r.radius>0))throw new Error(`关键帧 ${t}：radius 必须为正`);if(!(r.fov>10&&r.fov<140))throw new Error(`关键帧 ${t}：fov 非法（${r.fov}）`);if(r.gaze!=="free"&&r.gaze!=="target")throw new Error(`关键帧 ${t}：gaze 必须为 "free" | "target"`);const s=r.enter??0;if(s<0||s>=1)throw new Error(`关键帧 ${t}：enter 必须在 [0,1)（${s}）`);if(r.hold!==void 0&&(r.hold<0||r.hold>1))throw new Error(`关键帧 ${t}：hold 必须在 [0,1]（${r.hold}）`);if(t>0&&s>0){const o=e[t-1].hold??this.hold;if(o<1)throw new Error(`关键帧 ${t}：enter > 0 要求上一章 hold = 1（当前 ${o}）`)}}this.keys=e}get count(){return this.keys.length}sample(e,n){const t=this.keys.length,r=Math.min(Math.max(Math.floor(e),0),t-1),s=$e.clamp(n,0,1),o=this.keys[r],a=this.keys[Math.min(r+1,t-1)],l=o.enter??0;if(r>0&&l>0&&s<l)return Xs.blend(this.keys[r-1],o,Sl(s/l));const c=o.hold??this.hold,u=r<t-1&&c<1?Sl((s-c)/(1-c)):0;return Xs.blend(o,a,u)}sampleGlobal(e){const n=this.keys.length,t=$e.clamp(e,0,n),r=Math.min(Math.floor(t),n-1);return this.sample(r,t-r)}static blend(e,n,t){var h;const r=new Oe(...e.dir??[0,1,0]).normalize(),s=new Oe(...n.dir??[0,1,0]).normalize(),o=r.lerp(s,t).normalize(),a=kl(e),l=kl(n),c=$e.lerp(e.gaze==="target"?1:0,n.gaze==="target"?1:0,t);let u=null;return c>0&&(u=a&&l?a.clone().slerp(l,t):((h=a??l)==null?void 0:h.clone())??null),{radius:$e.lerp(e.radius,n.radius,t),dir:o,fov:$e.lerp(e.fov,n.fov,t),gazeBlend:c,gazeTargetQ:u,drift:$e.lerp(e.drift??0,n.drift??0,t),orbit:$e.lerp(e.orbit?1:0,n.orbit?1:0,t)}}}const cs=.005,rd=[{radius:cs,fov:78,gaze:"free",drift:.012},{radius:cs,fov:78,gaze:"free",hold:1},{radius:cs,fov:65,gaze:"target",target:{ra:270,dec:8},enter:.3},{radius:cs,fov:45,gaze:"target",target:{ra:175,dec:81}},{radius:3,dir:[.52,.7,.49],fov:50,gaze:"free",orbit:!0},{radius:3,dir:[.52,.7,.49],fov:50,gaze:"free",orbit:!0},{radius:3,dir:[0,.55,.84],fov:50,gaze:"free",orbit:!0},{radius:5,dir:[.52,.7,.49],fov:45,gaze:"free"}],Tl=.22,id=`
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
  letter-spacing: ${Tl}em;
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
    letter-spacing: ${Tl}em;
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
`;let Cl=!1;function sd(){if(Cl||typeof document>"u")return;const i=document.createElement("style");i.dataset.ch1="",i.textContent=id,document.head.appendChild(i),Cl=!0}function gi(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function od(i){return i<0?0:i>1?1:i}function us(i,e,n){const t=od((i-e)/(n-e));return t*t*(3-2*t)}function ad(i){sd();const e=i.root.querySelector(".pin"),{copy:n}=i,t=document.createElement("div");t.className="ch1-stage",t.innerHTML=`
    <p class="ch1-eyebrow">${gi(n.eyebrow)}</p>
    <h1 class="ch1-title">${gi(n.title)}</h1>
    <p class="ch1-hook">${gi(n.hook)}</p>
    <div class="ch1-body">${n.body.map(h=>`<p>${gi(h)}</p>`).join("")}</div>
    ${n.seal?`<div class="ch1-seal">${gi(n.seal)}</div>`:""}
  `,e.appendChild(t);const r=document.createElement("div");r.className="ch1-cue",r.textContent="向下滚动 · 步入夜空",e.appendChild(r);const s=t.querySelector(".ch1-hook"),o=t.querySelector(".ch1-body"),a=t.querySelector(".ch1-seal");let l=-1;const c=new Map;function u(h,d,f=18){const g=c.get(h);g!==void 0&&Math.abs(g-d)<1e-4||(c.set(h,d),h.style.opacity=d.toFixed(3),h.style.transform=`translateY(${((1-d)*f).toFixed(2)}px)`)}return{enter(){i.sky.setLabelsEnabled(!1)},update(h){if(u(s,us(h,.15,.45)),u(o,us(h,.3,.6)),a){const f=us(h,.45,.75),g=c.get(a);(g===void 0||Math.abs(g-f)>=1e-4)&&(c.set(a,f),a.style.opacity=f.toFixed(3),a.style.transform=`translateY(${((1-f)*10).toFixed(2)}px) scale(${(1.3-.3*f).toFixed(3)})`)}const d=.65*(1-us(h,0,.35));(Math.abs(d-l)>=1e-4||l<0)&&(l=d,r.style.opacity=d.toFixed(3))},exit(){i.sky.setLabelsEnabled(!0)}}}const ld=Object.freeze(Object.defineProperty({__proto__:null,createChapter:ad},Symbol.toStringTag,{value:"Module"}));function $n(i){if(i===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return i}function Qc(i,e){i.prototype=Object.create(e.prototype),i.prototype.constructor=i,i.__proto__=e}/*!
 * GSAP 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var ln={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Vi={duration:.5,overwrite:!1,delay:0},va,yt,Ne,bn=1e8,Pe=1/bn,Go=Math.PI*2,cd=Go/4,ud=0,Kc=Math.sqrt,fd=Math.cos,hd=Math.sin,gt=function(e){return typeof e=="string"},Ue=function(e){return typeof e=="function"},Yn=function(e){return typeof e=="number"},xa=function(e){return typeof e>"u"},zn=function(e){return typeof e=="object"},Ht=function(e){return e!==!1},wa=function(){return typeof window<"u"},fs=function(e){return Ue(e)||gt(e)},Zc=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},Mt=Array.isArray,dd=/random\([^)]+\)/g,pd=/,\s*/g,El=/(?:-?\.?\d|\.)+/gi,Jc=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Vr=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,wo=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,eu=/[+-]=-?[.\d]+/,gd=/[^,'"\[\]\s]+/gi,md=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Ge,En,Ho,Sa,cn={},Ws={},tu,nu=function(e){return(Ws=oi(e,cn))&&Wt},ka=function(e,n){return console.warn("Invalid property",e,"set to",n,"Missing plugin? gsap.registerPlugin()")},ji=function(e,n){return!n&&console.warn(e)},ru=function(e,n){return e&&(cn[e]=n)&&Ws&&(Ws[e]=n)||cn},Qi=function(){return 0},_d={suppressEvents:!0,isStart:!0,kill:!1},Os={suppressEvents:!0,kill:!1},bd={suppressEvents:!0},Ta={},rr=[],qo={},iu,Jt={},So={},Ml=30,Ls=[],Ca="",Ea=function(e){var n=e[0],t,r;if(zn(n)||Ue(n)||(e=[e]),!(t=(n._gsap||{}).harness)){for(r=Ls.length;r--&&!Ls[r].targetTest(n););t=Ls[r]}for(r=e.length;r--;)e[r]&&(e[r]._gsap||(e[r]._gsap=new Cu(e[r],t)))||e.splice(r,1);return e},kr=function(e){return e._gsap||Ea(yn(e))[0]._gsap},su=function(e,n,t){return(t=e[n])&&Ue(t)?e[n]():xa(t)&&e.getAttribute&&e.getAttribute(n)||t},qt=function(e,n){return(e=e.split(",")).forEach(n)||e},Ke=function(e){return Math.round(e*1e5)/1e5||0},Be=function(e){return Math.round(e*1e7)/1e7||0},Zr=function(e,n){var t=n.charAt(0),r=parseFloat(n.substr(2));return e=parseFloat(e),t==="+"?e+r:t==="-"?e-r:t==="*"?e*r:e/r},yd=function(e,n){for(var t=n.length,r=0;e.indexOf(n[r])<0&&++r<t;);return r<t},Us=function(){var e=rr.length,n=rr.slice(0),t,r;for(qo={},rr.length=0,t=0;t<e;t++)r=n[t],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},Ma=function(e){return!!(e._initted||e._startAt||e.add)},ou=function(e,n,t,r){rr.length&&!yt&&Us(),e.render(n,t,!!(yt&&n<0&&Ma(e))),rr.length&&!yt&&Us()},au=function(e){var n=parseFloat(e);return(n||n===0)&&(e+"").match(gd).length<2?n:gt(e)?e.trim():e},lu=function(e){return e},un=function(e,n){for(var t in n)t in e||(e[t]=n[t]);return e},vd=function(e){return function(n,t){for(var r in t)r in n||r==="duration"&&e||r==="ease"||(n[r]=t[r])}},oi=function(e,n){for(var t in n)e[t]=n[t];return e},Pl=function i(e,n){for(var t in n)t!=="__proto__"&&t!=="constructor"&&t!=="prototype"&&(e[t]=zn(n[t])?i(e[t]||(e[t]={}),n[t]):n[t]);return e},Vs=function(e,n){var t={},r;for(r in e)r in n||(t[r]=e[r]);return t},zi=function(e){var n=e.parent||Ge,t=e.keyframes?vd(Mt(e.keyframes)):un;if(Ht(e.inherit))for(;n;)t(e,n.vars.defaults),n=n.parent||n._dp;return e},xd=function(e,n){for(var t=e.length,r=t===n.length;r&&t--&&e[t]===n[t];);return t<0},cu=function(e,n,t,r,s){var o=e[r],a;if(s)for(a=n[s];o&&o[s]>a;)o=o._prev;return o?(n._next=o._next,o._next=n):(n._next=e[t],e[t]=n),n._next?n._next._prev=n:e[r]=n,n._prev=o,n.parent=n._dp=e,n},co=function(e,n,t,r){t===void 0&&(t="_first"),r===void 0&&(r="_last");var s=n._prev,o=n._next;s?s._next=o:e[t]===n&&(e[t]=o),o?o._prev=s:e[r]===n&&(e[r]=s),n._next=n._prev=n.parent=null},or=function(e,n){e.parent&&(!n||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},Tr=function(e,n){if(e&&(!n||n._end>e._dur||n._start<0))for(var t=e;t;)t._dirty=1,t=t.parent;return e},wd=function(e){for(var n=e.parent;n&&n.parent;)n._dirty=1,n.totalDuration(),n=n.parent;return e},Yo=function(e,n,t,r){return e._startAt&&(yt?e._startAt.revert(Os):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(n,!0,r))},Sd=function i(e){return!e||e._ts&&i(e.parent)},Al=function(e){return e._repeat?ai(e._tTime,e=e.duration()+e._rDelay)*e:0},ai=function(e,n){var t=Math.floor(e=Be(e/n));return e&&t===e?t-1:t},js=function(e,n){return(e-n._start)*n._ts+(n._ts>=0?0:n._dirty?n.totalDuration():n._tDur)},uo=function(e){return e._end=Be(e._start+(e._tDur/Math.abs(e._ts||e._rts||Pe)||0))},fo=function(e,n){var t=e._dp;return t&&t.smoothChildTiming&&e._ts&&(e._start=Be(t._time-(e._ts>0?n/e._ts:((e._dirty?e.totalDuration():e._tDur)-n)/-e._ts)),uo(e),t._dirty||Tr(t,e)),e},uu=function(e,n){var t;if((n._time||!n._dur&&n._initted||n._start<e._time&&(n._dur||!n.add))&&(t=js(e.rawTime(),n),(!n._dur||ss(0,n.totalDuration(),t)-n._tTime>Pe)&&n.render(t,!0)),Tr(e,n)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(t=e;t._dp;)t.rawTime()>=0&&t.totalTime(t._tTime),t=t._dp;e._zTime=-Pe}},An=function(e,n,t,r){return n.parent&&or(n),n._start=Be((Yn(t)?t:t||e!==Ge?pn(e,t,n):e._time)+n._delay),n._end=Be(n._start+(n.totalDuration()/Math.abs(n.timeScale())||0)),cu(e,n,"_first","_last",e._sort?"_start":0),Xo(n)||(e._recent=n),r||uu(e,n),e._ts<0&&fo(e,e._tTime),e},fu=function(e,n){return(cn.ScrollTrigger||ka("scrollTrigger",n))&&cn.ScrollTrigger.create(n,e)},hu=function(e,n,t,r,s){if(Aa(e,n,s),!e._initted)return 1;if(!t&&e._pt&&!yt&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&iu!==rn.frame)return rr.push(e),e._lazy=[s,r],1},kd=function i(e){var n=e.parent;return n&&n._ts&&n._initted&&!n._lock&&(n.rawTime()<0||i(n))},Xo=function(e){var n=e.data;return n==="isFromStart"||n==="isStart"},Td=function(e,n,t,r){var s=e.ratio,o=n<0||!n&&(!e._start&&kd(e)&&!(!e._initted&&Xo(e))||(e._ts<0||e._dp._ts<0)&&!Xo(e))?0:1,a=e._rDelay,l=0,c,u,h;if(a&&e._repeat&&(l=ss(0,e._tDur,n),u=ai(l,a),e._yoyo&&u&1&&(o=1-o),u!==ai(e._tTime,a)&&(s=1-o,e.vars.repeatRefresh&&e._initted&&e.invalidate())),o!==s||yt||r||e._zTime===Pe||!n&&e._zTime){if(!e._initted&&hu(e,n,r,t,l))return;for(h=e._zTime,e._zTime=n||(t?Pe:0),t||(t=n&&!h),e.ratio=o,e._from&&(o=1-o),e._time=0,e._tTime=l,c=e._pt;c;)c.r(o,c.d),c=c._next;n<0&&Yo(e,n,t,!0),e._onUpdate&&!t&&on(e,"onUpdate"),l&&e._repeat&&!t&&e.parent&&on(e,"onRepeat"),(n>=e._tDur||n<0)&&e.ratio===o&&(o&&or(e,1),!t&&!yt&&(on(e,o?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=n)},Cd=function(e,n,t){var r;if(t>n)for(r=e._first;r&&r._start<=t;){if(r.data==="isPause"&&r._start>n)return r;r=r._next}else for(r=e._last;r&&r._start>=t;){if(r.data==="isPause"&&r._start<n)return r;r=r._prev}},li=function(e,n,t,r){var s=e._repeat,o=Be(n)||0,a=e._tTime/e._tDur;return a&&!r&&(e._time*=o/e._dur),e._dur=o,e._tDur=s?s<0?1e10:Be(o*(s+1)+e._rDelay*s):o,a>0&&!r&&fo(e,e._tTime=e._tDur*a),e.parent&&uo(e),t||Tr(e.parent,e),e},Rl=function(e){return e instanceof Gt?Tr(e):li(e,e._dur)},Ed={_start:0,endTime:Qi,totalDuration:Qi},pn=function i(e,n,t){var r=e.labels,s=e._recent||Ed,o=e.duration()>=bn?s.endTime(!1):e._dur,a,l,c;return gt(n)&&(isNaN(n)||n in r)?(l=n.charAt(0),c=n.substr(-1)==="%",a=n.indexOf("="),l==="<"||l===">"?(a>=0&&(n=n.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(n.substr(1))||0)*(c?(a<0?s:t).totalDuration()/100:1)):a<0?(n in r||(r[n]=o),r[n]):(l=parseFloat(n.charAt(a-1)+n.substr(a+1)),c&&t&&(l=l/100*(Mt(t)?t[0]:t).totalDuration()),a>1?i(e,n.substr(0,a-1),t)+l:o+l)):n==null?o:+n},Ii=function(e,n,t){var r=Yn(n[1]),s=(r?2:1)+(e<2?0:1),o=n[s],a,l;if(r&&(o.duration=n[1]),o.parent=t,e){for(a=o,l=t;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=Ht(l.vars.inherit)&&l.parent;o.immediateRender=Ht(a.immediateRender),e<2?o.runBackwards=1:o.startAt=n[s-1]}return new rt(n[0],o,n[s+1])},ur=function(e,n){return e||e===0?n(e):n},ss=function(e,n,t){return t<e?e:t>n?n:t},Ct=function(e,n){return!gt(e)||!(n=md.exec(e))?"":n[1]},Md=function(e,n,t){return ur(t,function(r){return ss(e,n,r)})},Wo=[].slice,du=function(e,n){return e&&zn(e)&&"length"in e&&(!n&&!e.length||e.length-1 in e&&zn(e[0]))&&!e.nodeType&&e!==En},Pd=function(e,n,t){return t===void 0&&(t=[]),e.forEach(function(r){var s;return gt(r)&&!n||du(r,1)?(s=t).push.apply(s,yn(r)):t.push(r)})||t},yn=function(e,n,t){return Ne&&!n&&Ne.selector?Ne.selector(e):gt(e)&&!t&&(Ho||!ci())?Wo.call((n||Sa).querySelectorAll(e),0):Mt(e)?Pd(e,t):du(e)?Wo.call(e,0):e?[e]:[]},Uo=function(e){return e=yn(e)[0]||ji("Invalid scope")||{},function(n){var t=e.current||e.nativeElement||e;return yn(n,t.querySelectorAll?t:t===e?ji("Invalid scope")||Sa.createElement("div"):e)}},pu=function(e){return e.sort(function(){return .5-Math.random()})},gu=function(e){if(Ue(e))return e;var n=zn(e)?e:{each:e},t=Cr(n.ease),r=n.from||0,s=parseFloat(n.base)||0,o={},a=r>0&&r<1,l=isNaN(r)||a,c=n.axis,u=r,h=r;return gt(r)?u=h={center:.5,edges:.5,end:1}[r]||0:!a&&l&&(u=r[0],h=r[1]),function(d,f,g){var p=(g||n).length,_=o[p],w,v,k,x,C,A,T,L,R;if(!_){if(R=n.grid==="auto"?0:(n.grid||[1,bn])[1],!R){for(T=-bn;T<(T=g[R++].getBoundingClientRect().left)&&R<p;);R<p&&R--}for(_=o[p]=[],w=l?Math.min(R,p)*u-.5:r%R,v=R===bn?0:l?p*h/R-.5:r/R|0,T=0,L=bn,A=0;A<p;A++)k=A%R-w,x=v-(A/R|0),_[A]=C=c?Math.abs(c==="y"?x:k):Kc(k*k+x*x),C>T&&(T=C),C<L&&(L=C);r==="random"&&pu(_),_.max=T-L,_.min=L,_.v=p=(parseFloat(n.amount)||parseFloat(n.each)*(R>p?p-1:c?c==="y"?p/R:R:Math.max(R,p/R))||0)*(r==="edges"?-1:1),_.b=p<0?s-p:s,_.u=Ct(n.amount||n.each)||0,t=t&&p<0?Hd(t):t}return p=(_[d]-_.min)/_.max||0,Be(_.b+(t?t(p):p)*_.v)+_.u}},Vo=function(e){var n=Math.pow(10,((e+"").split(".")[1]||"").length);return function(t){var r=Be(Math.round(parseFloat(t)/e)*e*n);return(r-r%1)/n+(Yn(t)?0:Ct(t))}},mu=function(e,n){var t=Mt(e),r,s;return!t&&zn(e)&&(r=t=e.radius||bn,e.values?(e=yn(e.values),(s=!Yn(e[0]))&&(r*=r)):e=Vo(e.increment)),ur(n,t?Ue(e)?function(o){return s=e(o),Math.abs(s-o)<=r?s:o}:function(o){for(var a=parseFloat(s?o.x:o),l=parseFloat(s?o.y:0),c=bn,u=0,h=e.length,d,f;h--;)s?(d=e[h].x-a,f=e[h].y-l,d=d*d+f*f):d=Math.abs(e[h]-a),d<c&&(c=d,u=h);return u=!r||c<=r?e[u]:o,s||u===o||Yn(o)?u:u+Ct(o)}:Vo(e))},_u=function(e,n,t,r){return ur(Mt(e)?!n:t===!0?!!(t=0):!r,function(){return Mt(e)?e[~~(Math.random()*e.length)]:(t=t||1e-5)&&(r=t<1?Math.pow(10,(t+"").length-2):1)&&Math.floor(Math.round((e-t/2+Math.random()*(n-e+t*.99))/t)*t*r)/r})},Ad=function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];return function(r){return n.reduce(function(s,o){return o(s)},r)}},Rd=function(e,n){return function(t){return e(parseFloat(t))+(n||Ct(t))}},Od=function(e,n,t){return yu(e,n,0,1,t)},bu=function(e,n,t){return ur(t,function(r){return e[~~n(r)]})},Ld=function i(e,n,t){var r=n-e;return Mt(e)?bu(e,i(0,e.length),n):ur(t,function(s){return(r+(s-e)%r)%r+e})},Dd=function i(e,n,t){var r=n-e,s=r*2;return Mt(e)?bu(e,i(0,e.length-1),n):ur(t,function(o){return o=(s+(o-e)%s)%s||0,e+(o>r?s-o:o)})},Ki=function(e){return e.replace(dd,function(n){var t=n.indexOf("[")+1,r=n.substring(t||7,t?n.indexOf("]"):n.length-1).split(pd);return _u(t?r:+r[0],t?0:+r[1],+r[2]||1e-5)})},yu=function(e,n,t,r,s){var o=n-e,a=r-t;return ur(s,function(l){return t+((l-e)/o*a||0)})},zd=function i(e,n,t,r){var s=isNaN(e+n)?0:function(f){return(1-f)*e+f*n};if(!s){var o=gt(e),a={},l,c,u,h,d;if(t===!0&&(r=1)&&(t=null),o)e={p:e},n={p:n};else if(Mt(e)&&!Mt(n)){for(u=[],h=e.length,d=h-2,c=1;c<h;c++)u.push(i(e[c-1],e[c]));h--,s=function(g){g*=h;var p=Math.min(d,~~g);return u[p](g-p)},t=n}else r||(e=oi(Mt(e)?[]:{},e));if(!u){for(l in n)Pa.call(a,e,l,"get",n[l]);s=function(g){return La(g,a)||(o?e.p:e)}}}return ur(t,s)},Ol=function(e,n,t){var r=e.labels,s=bn,o,a,l;for(o in r)a=r[o]-n,a<0==!!t&&a&&s>(a=Math.abs(a))&&(l=o,s=a);return l},on=function(e,n,t){var r=e.vars,s=r[n],o=Ne,a=e._ctx,l,c,u;if(s)return l=r[n+"Params"],c=r.callbackScope||e,t&&rr.length&&Us(),a&&(Ne=a),u=l?s.apply(c,l):s.call(c),Ne=o,u},Ei=function(e){return or(e),e.scrollTrigger&&e.scrollTrigger.kill(!!yt),e.progress()<1&&on(e,"onInterrupt"),e},jr,vu=[],xu=function(e){if(e)if(e=!e.name&&e.default||e,wa()||e.headless){var n=e.name,t=Ue(e),r=n&&!t&&e.init?function(){this._props=[]}:e,s={init:Qi,render:La,add:Pa,kill:Zd,modifier:Kd,rawVars:0},o={targetTest:0,get:0,getSetter:Oa,aliases:{},register:0};if(ci(),e!==r){if(Jt[n])return;un(r,un(Vs(e,s),o)),oi(r.prototype,oi(s,Vs(e,o))),Jt[r.prop=n]=r,e.targetTest&&(Ls.push(r),Ta[n]=1),n=(n==="css"?"CSS":n.charAt(0).toUpperCase()+n.substr(1))+"Plugin"}ru(n,r),e.register&&e.register(Wt,r,Yt)}else vu.push(e)},Me=255,Mi={aqua:[0,Me,Me],lime:[0,Me,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Me],navy:[0,0,128],white:[Me,Me,Me],olive:[128,128,0],yellow:[Me,Me,0],orange:[Me,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Me,0,0],pink:[Me,192,203],cyan:[0,Me,Me],transparent:[Me,Me,Me,0]},ko=function(e,n,t){return e+=e<0?1:e>1?-1:0,(e*6<1?n+(t-n)*e*6:e<.5?t:e*3<2?n+(t-n)*(2/3-e)*6:n)*Me+.5|0},wu=function(e,n,t){var r=e?Yn(e)?[e>>16,e>>8&Me,e&Me]:0:Mi.black,s,o,a,l,c,u,h,d,f,g;if(!r){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),Mi[e])r=Mi[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),o=e.charAt(2),a=e.charAt(3),e="#"+s+s+o+o+a+a+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return r=parseInt(e.substr(1,6),16),[r>>16,r>>8&Me,r&Me,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),r=[e>>16,e>>8&Me,e&Me]}else if(e.substr(0,3)==="hsl"){if(r=g=e.match(El),!n)l=+r[0]%360/360,c=+r[1]/100,u=+r[2]/100,o=u<=.5?u*(c+1):u+c-u*c,s=u*2-o,r.length>3&&(r[3]*=1),r[0]=ko(l+1/3,s,o),r[1]=ko(l,s,o),r[2]=ko(l-1/3,s,o);else if(~e.indexOf("="))return r=e.match(Jc),t&&r.length<4&&(r[3]=1),r}else r=e.match(El)||Mi.transparent;r=r.map(Number)}return n&&!g&&(s=r[0]/Me,o=r[1]/Me,a=r[2]/Me,h=Math.max(s,o,a),d=Math.min(s,o,a),u=(h+d)/2,h===d?l=c=0:(f=h-d,c=u>.5?f/(2-h-d):f/(h+d),l=h===s?(o-a)/f+(o<a?6:0):h===o?(a-s)/f+2:(s-o)/f+4,l*=60),r[0]=~~(l+.5),r[1]=~~(c*100+.5),r[2]=~~(u*100+.5)),t&&r.length<4&&(r[3]=1),r},Su=function(e){var n=[],t=[],r=-1;return e.split(ir).forEach(function(s){var o=s.match(Vr)||[];n.push.apply(n,o),t.push(r+=o.length+1)}),n.c=t,n},Ll=function(e,n,t){var r="",s=(e+r).match(ir),o=n?"hsla(":"rgba(",a=0,l,c,u,h;if(!s)return e;if(s=s.map(function(d){return(d=wu(d,n,1))&&o+(n?d[0]+","+d[1]+"%,"+d[2]+"%,"+d[3]:d.join(","))+")"}),t&&(u=Su(e),l=t.c,l.join(r)!==u.c.join(r)))for(c=e.replace(ir,"1").split(Vr),h=c.length-1;a<h;a++)r+=c[a]+(~l.indexOf(a)?s.shift()||o+"0,0,0,0)":(u.length?u:s.length?s:t).shift());if(!c)for(c=e.split(ir),h=c.length-1;a<h;a++)r+=c[a]+s[a];return r+c[h]},ir=function(){var i="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in Mi)i+="|"+e+"\\b";return new RegExp(i+")","gi")}(),Id=/hsl[a]?\(/,ku=function(e){var n=e.join(" "),t;if(ir.lastIndex=0,ir.test(n))return t=Id.test(n),e[1]=Ll(e[1],t),e[0]=Ll(e[0],t,Su(e[1])),!0},Zi,rn=function(){var i=Date.now,e=500,n=33,t=i(),r=t,s=1e3/240,o=s,a=[],l,c,u,h,d,f,g=function p(_){var w=i()-r,v=_===!0,k,x,C,A;if((w>e||w<0)&&(t+=w-n),r+=w,C=r-t,k=C-o,(k>0||v)&&(A=++h.frame,d=C-h.time*1e3,h.time=C=C/1e3,o+=k+(k>=s?4:s-k),x=1),v||(l=c(p)),x)for(f=0;f<a.length;f++)a[f](C,d,A,_)};return h={time:0,frame:0,tick:function(){g(!0)},deltaRatio:function(_){return d/(1e3/(_||60))},wake:function(){tu&&(!Ho&&wa()&&(En=Ho=window,Sa=En.document||{},cn.gsap=Wt,(En.gsapVersions||(En.gsapVersions=[])).push(Wt.version),nu(Ws||En.GreenSockGlobals||!En.gsap&&En||{}),vu.forEach(xu)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&h.sleep(),c=u||function(_){return setTimeout(_,o-h.time*1e3+1|0)},Zi=1,g(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),Zi=0,c=Qi},lagSmoothing:function(_,w){e=_||1/0,n=Math.min(w||33,e)},fps:function(_){s=1e3/(_||240),o=h.time*1e3+s},add:function(_,w,v){var k=w?function(x,C,A,T){_(x,C,A,T),h.remove(k)}:_;return h.remove(_),a[v?"unshift":"push"](k),ci(),k},remove:function(_,w){~(w=a.indexOf(_))&&a.splice(w,1)&&f>=w&&f--},_listeners:a},h}(),ci=function(){return!Zi&&rn.wake()},fe={},$d=/^[\d.\-M][\d.\-,\s]/,Nd=/["']/g,Fd=function(e){for(var n={},t=e.substr(1,e.length-3).split(":"),r=t[0],s=1,o=t.length,a,l,c;s<o;s++)l=t[s],a=s!==o-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),n[r]=isNaN(c)?c.replace(Nd,"").trim():+c,r=l.substr(a+1).trim();return n},Bd=function(e){var n=e.indexOf("(")+1,t=e.indexOf(")"),r=e.indexOf("(",n);return e.substring(n,~r&&r<t?e.indexOf(")",t+1):t)},Gd=function(e){var n=(e+"").split("("),t=fe[n[0]];return t&&n.length>1&&t.config?t.config.apply(null,~e.indexOf("{")?[Fd(n[1])]:Bd(e).split(",").map(au)):fe._CE&&$d.test(e)?fe._CE("",e):t},Hd=function(e){return function(n){return 1-e(1-n)}},Cr=function(e,n){return e&&(Ue(e)?e:fe[e]||Gd(e))||n},$r=function(e,n,t,r){t===void 0&&(t=function(l){return 1-n(1-l)}),r===void 0&&(r=function(l){return l<.5?n(l*2)/2:1-n((1-l)*2)/2});var s={easeIn:n,easeOut:t,easeInOut:r},o;return qt(e,function(a){fe[a]=cn[a]=s,fe[o=a.toLowerCase()]=t;for(var l in s)fe[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=fe[a+"."+l]=s[l]}),s},Tu=function(e){return function(n){return n<.5?(1-e(1-n*2))/2:.5+e((n-.5)*2)/2}},To=function i(e,n,t){var r=n>=1?n:1,s=(t||(e?.3:.45))/(n<1?n:1),o=s/Go*(Math.asin(1/r)||0),a=function(u){return u===1?1:r*Math.pow(2,-10*u)*hd((u-o)*s)+1},l=e==="out"?a:e==="in"?function(c){return 1-a(1-c)}:Tu(a);return s=Go/s,l.config=function(c,u){return i(e,c,u)},l},Co=function i(e,n){n===void 0&&(n=1.70158);var t=function(o){return o?--o*o*((n+1)*o+n)+1:0},r=e==="out"?t:e==="in"?function(s){return 1-t(1-s)}:Tu(t);return r.config=function(s){return i(e,s)},r};qt("Linear,Quad,Cubic,Quart,Quint,Strong",function(i,e){var n=e<5?e+1:e;$r(i+",Power"+(n-1),e?function(t){return Math.pow(t,n)}:function(t){return t},function(t){return 1-Math.pow(1-t,n)},function(t){return t<.5?Math.pow(t*2,n)/2:1-Math.pow((1-t)*2,n)/2})});fe.Linear.easeNone=fe.none=fe.Linear.easeIn;$r("Elastic",To("in"),To("out"),To());(function(i,e){var n=1/e,t=2*n,r=2.5*n,s=function(a){return a<n?i*a*a:a<t?i*Math.pow(a-1.5/e,2)+.75:a<r?i*(a-=2.25/e)*a+.9375:i*Math.pow(a-2.625/e,2)+.984375};$r("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);$r("Expo",function(i){return Math.pow(2,10*(i-1))*i+i*i*i*i*i*i*(1-i)});$r("Circ",function(i){return-(Kc(1-i*i)-1)});$r("Sine",function(i){return i===1?1:-fd(i*cd)+1});$r("Back",Co("in"),Co("out"),Co());fe.SteppedEase=fe.steps=cn.SteppedEase={config:function(e,n){e===void 0&&(e=1);var t=1/e,r=e+(n?0:1),s=n?1:0,o=1-Pe;return function(a){return((r*ss(0,o,a)|0)+s)*t}}};Vi.ease=fe["quad.out"];qt("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(i){return Ca+=i+","+i+"Params,"});var Cu=function(e,n){this.id=ud++,e._gsap=this,this.target=e,this.harness=n,this.get=n?n.get:su,this.set=n?n.getSetter:Oa},Ji=function(){function i(n){this.vars=n,this._delay=+n.delay||0,(this._repeat=n.repeat===1/0?-2:n.repeat||0)&&(this._rDelay=n.repeatDelay||0,this._yoyo=!!n.yoyo||!!n.yoyoEase),this._ts=1,li(this,+n.duration,1,1),this.data=n.data,Ne&&(this._ctx=Ne,Ne.data.push(this)),Zi||rn.wake()}var e=i.prototype;return e.delay=function(t){return t||t===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+t-this._delay),this._delay=t,this):this._delay},e.duration=function(t){return arguments.length?this.totalDuration(this._repeat>0?t+(t+this._rDelay)*this._repeat:t):this.totalDuration()&&this._dur},e.totalDuration=function(t){return arguments.length?(this._dirty=0,li(this,this._repeat<0?t:(t-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(t,r){if(ci(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(fo(this,t),!s._dp||s.parent||uu(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&t<this._tDur||this._ts<0&&t>0||!this._tDur&&!t)&&An(this._dp,this,this._start-this._delay)}return(this._tTime!==t||!this._dur&&!r||this._initted&&Math.abs(this._zTime)===Pe||!this._initted&&this._dur&&t||!t&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=t),ou(this,t,r)),this},e.time=function(t,r){return arguments.length?this.totalTime(Math.min(this.totalDuration(),t+Al(this))%(this._dur+this._rDelay)||(t?this._dur:0),r):this._time},e.totalProgress=function(t,r){return arguments.length?this.totalTime(this.totalDuration()*t,r):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(t,r){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-t:t)+Al(this),r):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(t,r){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(t-1)*s,r):this._repeat?ai(this._tTime,s)+1:1},e.timeScale=function(t,r){if(!arguments.length)return this._rts===-Pe?0:this._rts;if(this._rts===t)return this;var s=this.parent&&this._ts?js(this.parent._time,this):this._tTime;return this._rts=+t||0,this._ts=this._ps||t===-Pe?0:this._rts,this.totalTime(ss(-Math.abs(this._delay),this.totalDuration(),s),r!==!1),uo(this),wd(this)},e.paused=function(t){return arguments.length?(this._ps!==t&&(this._ps=t,t?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(ci(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==Pe&&(this._tTime-=Pe)))),this):this._ps},e.startTime=function(t){if(arguments.length){this._start=Be(t);var r=this.parent||this._dp;return r&&(r._sort||!this.parent)&&An(r,this,this._start-this._delay),this}return this._start},e.endTime=function(t){return this._start+(Ht(t)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(t){var r=this.parent||this._dp;return r?t&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?js(r.rawTime(t),this):this._tTime:this._tTime},e.revert=function(t){t===void 0&&(t=bd);var r=yt;return yt=t,Ma(this)&&(this.timeline&&this.timeline.revert(t),this.totalTime(-.01,t.suppressEvents)),this.data!=="nested"&&t.kill!==!1&&this.kill(),yt=r,this},e.globalTime=function(t){for(var r=this,s=arguments.length?t:r.rawTime();r;)s=r._start+s/(Math.abs(r._ts)||1),r=r._dp;return!this.parent&&this._sat?this._sat.globalTime(t):s},e.repeat=function(t){return arguments.length?(this._repeat=t===1/0?-2:t,Rl(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(t){if(arguments.length){var r=this._time;return this._rDelay=t,Rl(this),r?this.time(r):this}return this._rDelay},e.yoyo=function(t){return arguments.length?(this._yoyo=t,this):this._yoyo},e.seek=function(t,r){return this.totalTime(pn(this,t),Ht(r))},e.restart=function(t,r){return this.play().totalTime(t?-this._delay:0,Ht(r)),this._dur||(this._zTime=-Pe),this},e.play=function(t,r){return t!=null&&this.seek(t,r),this.reversed(!1).paused(!1)},e.reverse=function(t,r){return t!=null&&this.seek(t||this.totalDuration(),r),this.reversed(!0).paused(!1)},e.pause=function(t,r){return t!=null&&this.seek(t,r),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(t){return arguments.length?(!!t!==this.reversed()&&this.timeScale(-this._rts||(t?-Pe:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-Pe,this},e.isActive=function(){var t=this.parent||this._dp,r=this._start,s;return!!(!t||this._ts&&this._initted&&t.isActive()&&(s=t.rawTime(!0))>=r&&s<this.endTime(!0)-Pe)},e.eventCallback=function(t,r,s){var o=this.vars;return arguments.length>1?(r?(o[t]=r,s&&(o[t+"Params"]=s),t==="onUpdate"&&(this._onUpdate=r)):delete o[t],this):o[t]},e.then=function(t){var r=this,s=r._prom;return new Promise(function(o){var a=Ue(t)?t:lu,l=function(){var u=r.then;r.then=null,s&&s(),Ue(a)&&(a=a(r))&&(a.then||a===r)&&(r.then=u),o(a),r.then=u};r._initted&&r.totalProgress()===1&&r._ts>=0||!r._tTime&&r._ts<0?l():r._prom=l})},e.kill=function(){Ei(this)},i}();un(Ji.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-Pe,_prom:0,_ps:!1,_rts:1});var Gt=function(i){Qc(e,i);function e(t,r){var s;return t===void 0&&(t={}),s=i.call(this,t)||this,s.labels={},s.smoothChildTiming=!!t.smoothChildTiming,s.autoRemoveChildren=!!t.autoRemoveChildren,s._sort=Ht(t.sortChildren),Ge&&An(t.parent||Ge,$n(s),r),t.reversed&&s.reverse(),t.paused&&s.paused(!0),t.scrollTrigger&&fu($n(s),t.scrollTrigger),s}var n=e.prototype;return n.to=function(r,s,o){return Ii(0,arguments,this),this},n.from=function(r,s,o){return Ii(1,arguments,this),this},n.fromTo=function(r,s,o,a){return Ii(2,arguments,this),this},n.set=function(r,s,o){return s.duration=0,s.parent=this,zi(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new rt(r,s,pn(this,o),1),this},n.call=function(r,s,o){return An(this,rt.delayedCall(0,r,s),o)},n.staggerTo=function(r,s,o,a,l,c,u){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=c,o.onCompleteParams=u,o.parent=this,new rt(r,o,pn(this,l)),this},n.staggerFrom=function(r,s,o,a,l,c,u){return o.runBackwards=1,zi(o).immediateRender=Ht(o.immediateRender),this.staggerTo(r,s,o,a,l,c,u)},n.staggerFromTo=function(r,s,o,a,l,c,u,h){return a.startAt=o,zi(a).immediateRender=Ht(a.immediateRender),this.staggerTo(r,s,a,l,c,u,h)},n.render=function(r,s,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=r<=0?0:Be(r),h=this._zTime<0!=r<0&&(this._initted||!c),d,f,g,p,_,w,v,k,x,C,A,T;if(this!==Ge&&u>l&&r>=0&&(u=l),u!==this._tTime||o||h){if(a!==this._time&&c&&(u+=this._time-a,r+=this._time-a),d=u,x=this._start,k=this._ts,w=!k,h&&(c||(a=this._zTime),(r||!s)&&(this._zTime=r)),this._repeat){if(A=this._yoyo,_=c+this._rDelay,this._repeat<-1&&r<0)return this.totalTime(_*100+r,s,o);if(d=Be(u%_),u===l?(p=this._repeat,d=c):(C=Be(u/_),p=~~C,p&&p===C&&(d=c,p--),d>c&&(d=c)),C=ai(this._tTime,_),!a&&this._tTime&&C!==p&&this._tTime-C*_-this._dur<=0&&(C=p),A&&p&1&&(d=c-d,T=1),p!==C&&!this._lock){var L=A&&C&1,R=L===(A&&p&1);if(p<C&&(L=!L),a=L?0:u%c?c:u,this._lock=1,this.render(a||(T?0:Be(p*_)),s,!c)._lock=0,this._tTime=u,!s&&this.parent&&on(this,"onRepeat"),this.vars.repeatRefresh&&!T&&(this.invalidate()._lock=1,C=p),a&&a!==this._time||w!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,R&&(this._lock=2,a=L?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!T&&this.invalidate()),this._lock=0,!this._ts&&!w)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(v=Cd(this,Be(a),Be(d)),v&&(u-=d-(d=v._start))),this._tTime=u,this._time=d,this._act=!!k,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=r,a=0),!a&&u&&c&&!s&&!C&&(on(this,"onStart"),this._tTime!==u))return this;if(d>=a&&r>=0)for(f=this._first;f;){if(g=f._next,(f._act||d>=f._start)&&f._ts&&v!==f){if(f.parent!==this)return this.render(r,s,o);if(f.render(f._ts>0?(d-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(d-f._start)*f._ts,s,o),d!==this._time||!this._ts&&!w){v=0,g&&(u+=this._zTime=-Pe);break}}f=g}else{f=this._last;for(var P=r<0?r:d;f;){if(g=f._prev,(f._act||P<=f._end)&&f._ts&&v!==f){if(f.parent!==this)return this.render(r,s,o);if(f.render(f._ts>0?(P-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(P-f._start)*f._ts,s,o||yt&&Ma(f)),d!==this._time||!this._ts&&!w){v=0,g&&(u+=this._zTime=P?-Pe:Pe);break}}f=g}}if(v&&!s&&(this.pause(),v.render(d>=a?0:-Pe)._zTime=d>=a?1:-1,this._ts))return this._start=x,uo(this),this.render(r,s,o);this._onUpdate&&!s&&on(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&a)&&(x===this._start||Math.abs(k)!==Math.abs(this._ts))&&(this._lock||((r||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&or(this,1),!s&&!(r<0&&!a)&&(u||a||!l)&&(on(this,u===l&&r>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},n.add=function(r,s){var o=this;if(Yn(s)||(s=pn(this,s,r)),!(r instanceof Ji)){if(Mt(r))return r.forEach(function(a){return o.add(a,s)}),this;if(gt(r))return this.addLabel(r,s);if(Ue(r))r=rt.delayedCall(0,r);else return this}return this!==r?An(this,r,s):this},n.getChildren=function(r,s,o,a){r===void 0&&(r=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-bn);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof rt?s&&l.push(c):(o&&l.push(c),r&&l.push.apply(l,c.getChildren(!0,s,o)))),c=c._next;return l},n.getById=function(r){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===r)return s[o]},n.remove=function(r){return gt(r)?this.removeLabel(r):Ue(r)?this.killTweensOf(r):(r.parent===this&&co(this,r),r===this._recent&&(this._recent=this._last),Tr(this))},n.totalTime=function(r,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Be(rn.time-(this._ts>0?r/this._ts:(this.totalDuration()-r)/-this._ts))),i.prototype.totalTime.call(this,r,s),this._forcing=0,this):this._tTime},n.addLabel=function(r,s){return this.labels[r]=pn(this,s),this},n.removeLabel=function(r){return delete this.labels[r],this},n.addPause=function(r,s,o){var a=rt.delayedCall(0,s||Qi,o);return a.data="isPause",this._hasPause=1,An(this,a,pn(this,r))},n.removePause=function(r){var s=this._first;for(r=pn(this,r);s;)s._start===r&&s.data==="isPause"&&or(s),s=s._next},n.killTweensOf=function(r,s,o){for(var a=this.getTweensOf(r,o),l=a.length;l--;)Kn!==a[l]&&a[l].kill(r,s);return this},n.getTweensOf=function(r,s){for(var o=[],a=yn(r),l=this._first,c=Yn(s),u;l;)l instanceof rt?yd(l._targets,a)&&(c?(!Kn||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&o.push(l):(u=l.getTweensOf(a,s)).length&&o.push.apply(o,u),l=l._next;return o},n.tweenTo=function(r,s){s=s||{};var o=this,a=pn(o,r),l=s,c=l.startAt,u=l.onStart,h=l.onStartParams,d=l.immediateRender,f,g=rt.to(o,un({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale())||Pe,onStart:function(){if(o.pause(),!f){var _=s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale());g._dur!==_&&li(g,_,0,1).render(g._time,!0,!0),f=1}u&&u.apply(g,h||[])}},s));return d?g.render(0):g},n.tweenFromTo=function(r,s,o){return this.tweenTo(s,un({startAt:{time:pn(this,r)}},o))},n.recent=function(){return this._recent},n.nextLabel=function(r){return r===void 0&&(r=this._time),Ol(this,pn(this,r))},n.previousLabel=function(r){return r===void 0&&(r=this._time),Ol(this,pn(this,r),1)},n.currentLabel=function(r){return arguments.length?this.seek(r,!0):this.previousLabel(this._time+Pe)},n.shiftChildren=function(r,s,o){o===void 0&&(o=0);var a=this._first,l=this.labels,c;for(r=Be(r);a;)a._start>=o&&(a._start+=r,a._end+=r),a=a._next;if(s)for(c in l)l[c]>=o&&(l[c]+=r);return Tr(this)},n.invalidate=function(r){var s=this._first;for(this._lock=0;s;)s.invalidate(r),s=s._next;return i.prototype.invalidate.call(this,r)},n.clear=function(r){r===void 0&&(r=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),r&&(this.labels={}),Tr(this)},n.totalDuration=function(r){var s=0,o=this,a=o._last,l=bn,c,u,h;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-r:r));if(o._dirty){for(h=o.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),u=a._start,u>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,An(o,a,u-a._delay,1)._lock=0):l=u,u<0&&a._ts&&(s-=u,(!h&&!o._dp||h&&h.smoothChildTiming)&&(o._start+=Be(u/o._ts),o._time-=u,o._tTime-=u),o.shiftChildren(-u,!1,-1/0),l=0),a._end>s&&a._ts&&(s=a._end),a=c;li(o,o===Ge&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},e.updateRoot=function(r){if(Ge._ts&&(ou(Ge,js(r,Ge)),iu=rn.frame),rn.frame>=Ml){Ml+=ln.autoSleep||120;var s=Ge._first;if((!s||!s._ts)&&ln.autoSleep&&rn._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||rn.sleep()}}},e}(Ji);un(Gt.prototype,{_lock:0,_hasPause:0,_forcing:0});var qd=function(e,n,t,r,s,o,a){var l=new Yt(this._pt,e,n,0,1,Ou,null,s),c=0,u=0,h,d,f,g,p,_,w,v;for(l.b=t,l.e=r,t+="",r+="",(w=~r.indexOf("random("))&&(r=Ki(r)),o&&(v=[t,r],o(v,e,n),t=v[0],r=v[1]),d=t.match(wo)||[];h=wo.exec(r);)g=h[0],p=r.substring(c,h.index),f?f=(f+1)%5:p.substr(-5)==="rgba("&&(f=1),g!==d[u++]&&(_=parseFloat(d[u-1])||0,l._pt={_next:l._pt,p:p||u===1?p:",",s:_,c:g.charAt(1)==="="?Zr(_,g)-_:parseFloat(g)-_,m:f&&f<4?Math.round:0},c=wo.lastIndex);return l.c=c<r.length?r.substring(c,r.length):"",l.fp=a,(eu.test(r)||w)&&(l.e=0),this._pt=l,l},Pa=function(e,n,t,r,s,o,a,l,c,u){Ue(r)&&(r=r(s||0,e,o));var h=e[n],d=t!=="get"?t:Ue(h)?c?e[n.indexOf("set")||!Ue(e["get"+n.substr(3)])?n:"get"+n.substr(3)](c):e[n]():h,f=Ue(h)?c?Vd:Au:Ra,g;if(gt(r)&&(~r.indexOf("random(")&&(r=Ki(r)),r.charAt(1)==="="&&(g=Zr(d,r)+(Ct(d)||0),(g||g===0)&&(r=g))),!u||d!==r||jo)return!isNaN(d*r)&&r!==""?(g=new Yt(this._pt,e,n,+d||0,r-(d||0),typeof h=="boolean"?Qd:Ru,0,f),c&&(g.fp=c),a&&g.modifier(a,this,e),this._pt=g):(!h&&!(n in e)&&ka(n,r),qd.call(this,e,n,d,r,f,l||ln.stringFilter,c))},Yd=function(e,n,t,r,s){if(Ue(e)&&(e=$i(e,s,n,t,r)),!zn(e)||e.style&&e.nodeType||Mt(e)||Zc(e))return gt(e)?$i(e,s,n,t,r):e;var o={},a;for(a in e)o[a]=$i(e[a],s,n,t,r);return o},Eu=function(e,n,t,r,s,o){var a,l,c,u;if(Jt[e]&&(a=new Jt[e]).init(s,a.rawVars?n[e]:Yd(n[e],r,s,o,t),t,r,o)!==!1&&(t._pt=l=new Yt(t._pt,s,e,0,1,a.render,a,0,a.priority),t!==jr))for(c=t._ptLookup[t._targets.indexOf(s)],u=a._props.length;u--;)c[a._props[u]]=l;return a},Kn,jo,Aa=function i(e,n,t){var r=e.vars,s=r.ease,o=r.startAt,a=r.immediateRender,l=r.lazy,c=r.onUpdate,u=r.runBackwards,h=r.yoyoEase,d=r.keyframes,f=r.autoRevert,g=e._dur,p=e._startAt,_=e._targets,w=e.parent,v=w&&w.data==="nested"?w.vars.targets:_,k=e._overwrite==="auto"&&!va,x=e.timeline,C=r.easeReverse||h,A,T,L,R,P,J,m,F,$,V,K,B,M;if(x&&(!d||!s)&&(s="none"),e._ease=Cr(s,Vi.ease),e._rEase=C&&(Cr(C)||e._ease),e._from=!x&&!!r.runBackwards,e._from&&(e.ratio=1),!x||d&&!r.stagger){if(F=_[0]?kr(_[0]).harness:0,B=F&&r[F.prop],A=Vs(r,Ta),p&&(p._zTime<0&&p.progress(1),n<0&&u&&a&&!f?p.render(-1,!0):p.revert(u&&g?Os:_d),p._lazy=0),o){if(or(e._startAt=rt.set(_,un({data:"isStart",overwrite:!1,parent:w,immediateRender:!0,lazy:!p&&Ht(l),startAt:null,delay:0,onUpdate:c&&function(){return on(e,"onUpdate")},stagger:0},o))),e._startAt._dp=0,e._startAt._sat=e,n<0&&(yt||!a&&!f)&&e._startAt.revert(Os),a&&g&&n<=0&&t<=0){n&&(e._zTime=n);return}}else if(u&&g&&!p){if(n&&(a=!1),L=un({overwrite:!1,data:"isFromStart",lazy:a&&!p&&Ht(l),immediateRender:a,stagger:0,parent:w},A),B&&(L[F.prop]=B),or(e._startAt=rt.set(_,L)),e._startAt._dp=0,e._startAt._sat=e,n<0&&(yt?e._startAt.revert(Os):e._startAt.render(-1,!0)),e._zTime=n,!a)i(e._startAt,Pe,Pe);else if(!n)return}for(e._pt=e._ptCache=0,l=g&&Ht(l)||l&&!g,T=0;T<_.length;T++){if(P=_[T],m=P._gsap||Ea(_)[T]._gsap,e._ptLookup[T]=V={},qo[m.id]&&rr.length&&Us(),K=v===_?T:v.indexOf(P),F&&($=new F).init(P,B||A,e,K,v)!==!1&&(e._pt=R=new Yt(e._pt,P,$.name,0,1,$.render,$,0,$.priority),$._props.forEach(function(O){V[O]=R}),$.priority&&(J=1)),!F||B)for(L in A)Jt[L]&&($=Eu(L,A,e,K,P,v))?$.priority&&(J=1):V[L]=R=Pa.call(e,P,L,"get",A[L],K,v,0,r.stringFilter);e._op&&e._op[T]&&e.kill(P,e._op[T]),k&&e._pt&&(Kn=e,Ge.killTweensOf(P,V,e.globalTime(n)),M=!e.parent,Kn=0),e._pt&&l&&(qo[m.id]=1)}J&&Lu(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!M,d&&n<=0&&x.render(bn,!0,!0)},Xd=function(e,n,t,r,s,o,a,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[n],u,h,d,f;if(!c)for(c=e._ptCache[n]=[],d=e._ptLookup,f=e._targets.length;f--;){if(u=d[f][n],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==n&&u.fp!==n;)u=u._next;if(!u)return jo=1,e.vars[n]="+=0",Aa(e,a),jo=0,l?ji(n+" not eligible for reset. Try splitting into individual properties"):1;c.push(u)}for(f=c.length;f--;)h=c[f],u=h._pt||h,u.s=(r||r===0)&&!s?r:u.s+(r||0)+o*u.c,u.c=t-u.s,h.e&&(h.e=Ke(t)+Ct(h.e)),h.b&&(h.b=u.s+Ct(h.b))},Wd=function(e,n){var t=e[0]?kr(e[0]).harness:0,r=t&&t.aliases,s,o,a,l;if(!r)return n;s=oi({},n);for(o in r)if(o in s)for(l=r[o].split(","),a=l.length;a--;)s[l[a]]=s[o];return s},Ud=function(e,n,t,r){var s=n.ease||r||"power1.inOut",o,a;if(Mt(n))a=t[e]||(t[e]=[]),n.forEach(function(l,c){return a.push({t:c/(n.length-1)*100,v:l,e:s})});else for(o in n)a=t[o]||(t[o]=[]),o==="ease"||a.push({t:parseFloat(e),v:n[o],e:s})},$i=function(e,n,t,r,s){return Ue(e)?e.call(n,t,r,s):gt(e)&&~e.indexOf("random(")?Ki(e):e},Mu=Ca+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",Pu={};qt(Mu+",id,stagger,delay,duration,paused,scrollTrigger",function(i){return Pu[i]=1});var rt=function(i){Qc(e,i);function e(t,r,s,o){var a;typeof r=="number"&&(s.duration=r,r=s,s=null),a=i.call(this,o?r:zi(r))||this;var l=a.vars,c=l.duration,u=l.delay,h=l.immediateRender,d=l.stagger,f=l.overwrite,g=l.keyframes,p=l.defaults,_=l.scrollTrigger,w=r.parent||Ge,v=(Mt(t)||Zc(t)?Yn(t[0]):"length"in r)?[t]:yn(t),k,x,C,A,T,L,R,P;if(a._targets=v.length?Ea(v):ji("GSAP target "+t+" not found. https://gsap.com",!ln.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=f,g||d||fs(c)||fs(u)){r=a.vars;var J=r.easeReverse||r.yoyoEase;if(k=a.timeline=new Gt({data:"nested",defaults:p||{},targets:w&&w.data==="nested"?w.vars.targets:v}),k.kill(),k.parent=k._dp=$n(a),k._start=0,d||fs(c)||fs(u)){if(A=v.length,R=d&&gu(d),zn(d))for(T in d)~Mu.indexOf(T)&&(P||(P={}),P[T]=d[T]);for(x=0;x<A;x++)C=Vs(r,Pu),C.stagger=0,J&&(C.easeReverse=J),P&&oi(C,P),L=v[x],C.duration=+$i(c,$n(a),x,L,v),C.delay=(+$i(u,$n(a),x,L,v)||0)-a._delay,!d&&A===1&&C.delay&&(a._delay=u=C.delay,a._start+=u,C.delay=0),k.to(L,C,R?R(x,L,v):0),k._ease=fe.none;k.duration()?c=u=0:a.timeline=0}else if(g){zi(un(k.vars.defaults,{ease:"none"})),k._ease=Cr(g.ease||r.ease||"none");var m=0,F,$,V;if(Mt(g))g.forEach(function(K){return k.to(v,K,">")}),k.duration();else{C={};for(T in g)T==="ease"||T==="easeEach"||Ud(T,g[T],C,g.easeEach);for(T in C)for(F=C[T].sort(function(K,B){return K.t-B.t}),m=0,x=0;x<F.length;x++)$=F[x],V={ease:$.e,duration:($.t-(x?F[x-1].t:0))/100*c},V[T]=$.v,k.to(v,V,m),m+=V.duration;k.duration()<c&&k.to({},{duration:c-k.duration()})}}c||a.duration(c=k.duration())}else a.timeline=0;return f===!0&&!va&&(Kn=$n(a),Ge.killTweensOf(v),Kn=0),An(w,$n(a),s),r.reversed&&a.reverse(),r.paused&&a.paused(!0),(h||!c&&!g&&a._start===Be(w._time)&&Ht(h)&&Sd($n(a))&&w.data!=="nested")&&(a._tTime=-Pe,a.render(Math.max(0,-u)||0)),_&&fu($n(a),_),a}var n=e.prototype;return n.render=function(r,s,o){var a=this._time,l=this._tDur,c=this._dur,u=r<0,h=r>l-Pe&&!u?l:r<Pe?0:r,d,f,g,p,_,w,v,k;if(!c)Td(this,r,s,o);else if(h!==this._tTime||!r||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(d=h,k=this.timeline,this._repeat){if(p=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(p*100+r,s,o);if(d=Be(h%p),h===l?(g=this._repeat,d=c):(_=Be(h/p),g=~~_,g&&g===_?(d=c,g--):d>c&&(d=c)),w=this._yoyo&&g&1,w&&(d=c-d),_=ai(this._tTime,p),d===a&&!o&&this._initted&&g===_)return this._tTime=h,this;g!==_&&this.vars.repeatRefresh&&!w&&!this._lock&&d!==p&&this._initted&&(this._lock=o=1,this.render(Be(p*g),!0).invalidate()._lock=0)}if(!this._initted){if(hu(this,u?r:d,o,s,h))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&g!==_))return this;if(c!==this._dur)return this.render(r,s,o)}if(this._rEase){var x=d<a;if(x!==this._inv){var C=x?a:c-a;this._inv=x,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=a,this._invRecip=C?(x?-1:1)/C:0,this._invScale=x?-this.ratio:1-this.ratio,this._invEase=x?this._rEase:this._ease}this.ratio=v=this._invRatio+this._invScale*this._invEase((d-this._invTime)*this._invRecip)}else this.ratio=v=this._ease(d/c);if(this._from&&(this.ratio=v=1-v),this._tTime=h,this._time=d,!this._act&&this._ts&&(this._act=1,this._lazy=0),!a&&h&&!s&&!_&&(on(this,"onStart"),this._tTime!==h))return this;for(f=this._pt;f;)f.r(v,f.d),f=f._next;k&&k.render(r<0?r:k._dur*k._ease(d/this._dur),s,o)||this._startAt&&(this._zTime=r),this._onUpdate&&!s&&(u&&Yo(this,r,s,o),on(this,"onUpdate")),this._repeat&&g!==_&&this.vars.onRepeat&&!s&&this.parent&&on(this,"onRepeat"),(h===this._tDur||!h)&&this._tTime===h&&(u&&!this._onUpdate&&Yo(this,r,!0,!0),(r||!c)&&(h===this._tDur&&this._ts>0||!h&&this._ts<0)&&or(this,1),!s&&!(u&&!a)&&(h||a||w)&&(on(this,h===l?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom()))}return this},n.targets=function(){return this._targets},n.invalidate=function(r){return(!r||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(r),i.prototype.invalidate.call(this,r)},n.resetTo=function(r,s,o,a,l){Zi||rn.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||Aa(this,c),u=this._ease(c/this._dur),Xd(this,r,s,o,a,u,c,l)?this.resetTo(r,s,o,a,1):(fo(this,0),this.parent||cu(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},n.kill=function(r,s){if(s===void 0&&(s="all"),!r&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?Ei(this):this.scrollTrigger&&this.scrollTrigger.kill(!!yt),this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(r,s,Kn&&Kn.vars.overwrite!==!0)._first||Ei(this),this.parent&&o!==this.timeline.totalDuration()&&li(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=r?yn(r):a,c=this._ptLookup,u=this._pt,h,d,f,g,p,_,w;if((!s||s==="all")&&xd(a,l))return s==="all"&&(this._pt=0),Ei(this);for(h=this._op=this._op||[],s!=="all"&&(gt(s)&&(p={},qt(s,function(v){return p[v]=1}),s=p),s=Wd(a,s)),w=a.length;w--;)if(~l.indexOf(a[w])){d=c[w],s==="all"?(h[w]=s,g=d,f={}):(f=h[w]=h[w]||{},g=s);for(p in g)_=d&&d[p],_&&((!("kill"in _.d)||_.d.kill(p)===!0)&&co(this,_,"_pt"),delete d[p]),f!=="all"&&(f[p]=1)}return this._initted&&!this._pt&&u&&Ei(this),this},e.to=function(r,s){return new e(r,s,arguments[2])},e.from=function(r,s){return Ii(1,arguments)},e.delayedCall=function(r,s,o,a){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:r,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},e.fromTo=function(r,s,o){return Ii(2,arguments)},e.set=function(r,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(r,s)},e.killTweensOf=function(r,s,o){return Ge.killTweensOf(r,s,o)},e}(Ji);un(rt.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});qt("staggerTo,staggerFrom,staggerFromTo",function(i){rt[i]=function(){var e=new Gt,n=Wo.call(arguments,0);return n.splice(i==="staggerFromTo"?5:4,0,0),e[i].apply(e,n)}});var Ra=function(e,n,t){return e[n]=t},Au=function(e,n,t){return e[n](t)},Vd=function(e,n,t,r){return e[n](r.fp,t)},jd=function(e,n,t){return e.setAttribute(n,t)},Oa=function(e,n){return Ue(e[n])?Au:xa(e[n])&&e.setAttribute?jd:Ra},Ru=function(e,n){return n.set(n.t,n.p,Math.round((n.s+n.c*e)*1e6)/1e6,n)},Qd=function(e,n){return n.set(n.t,n.p,!!(n.s+n.c*e),n)},Ou=function(e,n){var t=n._pt,r="";if(!e&&n.b)r=n.b;else if(e===1&&n.e)r=n.e;else{for(;t;)r=t.p+(t.m?t.m(t.s+t.c*e):Math.round((t.s+t.c*e)*1e4)/1e4)+r,t=t._next;r+=n.c}n.set(n.t,n.p,r,n)},La=function(e,n){for(var t=n._pt;t;)t.r(e,t.d),t=t._next},Kd=function(e,n,t,r){for(var s=this._pt,o;s;)o=s._next,s.p===r&&s.modifier(e,n,t),s=o},Zd=function(e){for(var n=this._pt,t,r;n;)r=n._next,n.p===e&&!n.op||n.op===e?co(this,n,"_pt"):n.dep||(t=1),n=r;return!t},Jd=function(e,n,t,r){r.mSet(e,n,r.m.call(r.tween,t,r.mt),r)},Lu=function(e){for(var n=e._pt,t,r,s,o;n;){for(t=n._next,r=s;r&&r.pr>n.pr;)r=r._next;(n._prev=r?r._prev:o)?n._prev._next=n:s=n,(n._next=r)?r._prev=n:o=n,n=t}e._pt=s},Yt=function(){function i(n,t,r,s,o,a,l,c,u){this.t=t,this.s=s,this.c=o,this.p=r,this.r=a||Ru,this.d=l||this,this.set=c||Ra,this.pr=u||0,this._next=n,n&&(n._prev=this)}var e=i.prototype;return e.modifier=function(t,r,s){this.mSet=this.mSet||this.set,this.set=Jd,this.m=t,this.mt=s,this.tween=r},i}();qt(Ca+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(i){return Ta[i]=1});cn.TweenMax=cn.TweenLite=rt;cn.TimelineLite=cn.TimelineMax=Gt;Ge=new Gt({sortChildren:!1,defaults:Vi,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});ln.stringFilter=ku;var Er=[],Ds={},ep=[],Dl=0,tp=0,Eo=function(e){return(Ds[e]||ep).map(function(n){return n()})},Qo=function(){var e=Date.now(),n=[];e-Dl>2&&(Eo("matchMediaInit"),Er.forEach(function(t){var r=t.queries,s=t.conditions,o,a,l,c;for(a in r)o=En.matchMedia(r[a]).matches,o&&(l=1),o!==s[a]&&(s[a]=o,c=1);c&&(t.revert(),l&&n.push(t))}),Eo("matchMediaRevert"),n.forEach(function(t){return t.onMatch(t,function(r){return t.add(null,r)})}),Dl=e,Eo("matchMedia"))},Du=function(){function i(n,t){this.selector=t&&Uo(t),this.data=[],this._r=[],this.isReverted=!1,this.id=tp++,n&&this.add(n)}var e=i.prototype;return e.add=function(t,r,s){Ue(t)&&(s=r,r=t,t=Ue);var o=this,a=function(){var c=Ne,u=o.selector,h;return c&&c!==o&&c.data.push(o),s&&(o.selector=Uo(s)),Ne=o,h=r.apply(o,arguments),Ue(h)&&o._r.push(h),Ne=c,o.selector=u,o.isReverted=!1,h};return o.last=a,t===Ue?a(o,function(l){return o.add(null,l)}):t?o[t]=a:a},e.ignore=function(t){var r=Ne;Ne=null,t(this),Ne=r},e.getTweens=function(){var t=[];return this.data.forEach(function(r){return r instanceof i?t.push.apply(t,r.getTweens()):r instanceof rt&&!(r.parent&&r.parent.data==="nested")&&t.push(r)}),t},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(t,r){var s=this;if(t?function(){for(var a=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return a.splice(a.indexOf(u),1)}));for(a.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,h){return h.g-u.g||-1/0}).forEach(function(u){return u.t.revert(t)}),l=s.data.length;l--;)c=s.data[l],c instanceof Gt?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof rt)&&c.revert&&c.revert(t);s._r.forEach(function(u){return u(t,s)}),s.isReverted=!0}():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),r)for(var o=Er.length;o--;)Er[o].id===this.id&&Er.splice(o,1)},e.revert=function(t){this.kill(t||{})},i}(),np=function(){function i(n){this.contexts=[],this.scope=n,Ne&&Ne.data.push(this)}var e=i.prototype;return e.add=function(t,r,s){zn(t)||(t={matches:t});var o=new Du(0,s||this.scope),a=o.conditions={},l,c,u;Ne&&!o.selector&&(o.selector=Ne.selector),this.contexts.push(o),r=o.add("onMatch",r),o.queries=t;for(c in t)c==="all"?u=1:(l=En.matchMedia(t[c]),l&&(Er.indexOf(o)<0&&Er.push(o),(a[c]=l.matches)&&(u=1),l.addListener?l.addListener(Qo):l.addEventListener("change",Qo)));return u&&r(o,function(h){return o.add(null,h)}),this},e.revert=function(t){this.kill(t||{})},e.kill=function(t){this.contexts.forEach(function(r){return r.kill(t,!0)})},i}(),Qs={registerPlugin:function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];n.forEach(function(r){return xu(r)})},timeline:function(e){return new Gt(e)},getTweensOf:function(e,n){return Ge.getTweensOf(e,n)},getProperty:function(e,n,t,r){gt(e)&&(e=yn(e)[0]);var s=kr(e||{}).get,o=t?lu:au;return t==="native"&&(t=""),e&&(n?o((Jt[n]&&Jt[n].get||s)(e,n,t,r)):function(a,l,c){return o((Jt[a]&&Jt[a].get||s)(e,a,l,c))})},quickSetter:function(e,n,t){if(e=yn(e),e.length>1){var r=e.map(function(u){return Wt.quickSetter(u,n,t)}),s=r.length;return function(u){for(var h=s;h--;)r[h](u)}}e=e[0]||{};var o=Jt[n],a=kr(e),l=a.harness&&(a.harness.aliases||{})[n]||n,c=o?function(u){var h=new o;jr._pt=0,h.init(e,t?u+t:u,jr,0,[e]),h.render(1,h),jr._pt&&La(1,jr)}:a.set(e,l);return o?c:function(u){return c(e,l,t?u+t:u,a,1)}},quickTo:function(e,n,t){var r,s=Wt.to(e,un((r={},r[n]="+=0.1",r.paused=!0,r.stagger=0,r),t||{})),o=function(l,c,u){return s.resetTo(n,l,c,u)};return o.tween=s,o},isTweening:function(e){return Ge.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=Cr(e.ease,Vi.ease)),Pl(Vi,e||{})},config:function(e){return Pl(ln,e||{})},registerEffect:function(e){var n=e.name,t=e.effect,r=e.plugins,s=e.defaults,o=e.extendTimeline;(r||"").split(",").forEach(function(a){return a&&!Jt[a]&&!cn[a]&&ji(n+" effect requires "+a+" plugin.")}),So[n]=function(a,l,c){return t(yn(a),un(l||{},s),c)},o&&(Gt.prototype[n]=function(a,l,c){return this.add(So[n](a,zn(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,n){fe[e]=Cr(n)},parseEase:function(e,n){return arguments.length?Cr(e,n):fe},getById:function(e){return Ge.getById(e)},exportRoot:function(e,n){e===void 0&&(e={});var t=new Gt(e),r,s;for(t.smoothChildTiming=Ht(e.smoothChildTiming),Ge.remove(t),t._dp=0,t._time=t._tTime=Ge._time,r=Ge._first;r;)s=r._next,(n||!(!r._dur&&r instanceof rt&&r.vars.onComplete===r._targets[0]))&&An(t,r,r._start-r._delay),r=s;return An(Ge,t,0),t},context:function(e,n){return e?new Du(e,n):Ne},matchMedia:function(e){return new np(e)},matchMediaRefresh:function(){return Er.forEach(function(e){var n=e.conditions,t,r;for(r in n)n[r]&&(n[r]=!1,t=1);t&&e.revert()})||Qo()},addEventListener:function(e,n){var t=Ds[e]||(Ds[e]=[]);~t.indexOf(n)||t.push(n)},removeEventListener:function(e,n){var t=Ds[e],r=t&&t.indexOf(n);r>=0&&t.splice(r,1)},utils:{wrap:Ld,wrapYoyo:Dd,distribute:gu,random:_u,snap:mu,normalize:Od,getUnit:Ct,clamp:Md,splitColor:wu,toArray:yn,selector:Uo,mapRange:yu,pipe:Ad,unitize:Rd,interpolate:zd,shuffle:pu},install:nu,effects:So,ticker:rn,updateRoot:Gt.updateRoot,plugins:Jt,globalTimeline:Ge,core:{PropTween:Yt,globals:ru,Tween:rt,Timeline:Gt,Animation:Ji,getCache:kr,_removeLinkedListItem:co,reverting:function(){return yt},context:function(e){return e&&Ne&&(Ne.data.push(e),e._ctx=Ne),Ne},suppressOverwrites:function(e){return va=e}}};qt("to,from,fromTo,delayedCall,set,killTweensOf",function(i){return Qs[i]=rt[i]});rn.add(Gt.updateRoot);jr=Qs.to({},{duration:0});var rp=function(e,n){for(var t=e._pt;t&&t.p!==n&&t.op!==n&&t.fp!==n;)t=t._next;return t},ip=function(e,n){var t=e._targets,r,s,o;for(r in n)for(s=t.length;s--;)o=e._ptLookup[s][r],o&&(o=o.d)&&(o._pt&&(o=rp(o,r)),o&&o.modifier&&o.modifier(n[r],e,t[s],r))},Mo=function(e,n){return{name:e,headless:1,rawVars:1,init:function(r,s,o){o._onInit=function(a){var l,c;if(gt(s)&&(l={},qt(s,function(u){return l[u]=1}),s=l),n){l={};for(c in s)l[c]=n(s[c]);s=l}ip(a,s)}}}},Wt=Qs.registerPlugin({name:"attr",init:function(e,n,t,r,s){var o,a,l;this.tween=t;for(o in n)l=e.getAttribute(o)||"",a=this.add(e,"setAttribute",(l||0)+"",n[o],r,s,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(e,n){for(var t=n._pt;t;)yt?t.set(t.t,t.p,t.b,t):t.r(e,t.d),t=t._next}},{name:"endArray",headless:1,init:function(e,n){for(var t=n.length;t--;)this.add(e,t,e[t]||0,n[t],0,0,0,0,0,1)}},Mo("roundProps",Vo),Mo("modifiers"),Mo("snap",mu))||Qs;rt.version=Gt.version=Wt.version="3.15.0";tu=1;wa()&&ci();fe.Power0;fe.Power1;fe.Power2;fe.Power3;fe.Power4;fe.Linear;fe.Quad;fe.Cubic;fe.Quart;fe.Quint;fe.Strong;fe.Elastic;fe.Back;fe.SteppedEase;fe.Bounce;fe.Sine;fe.Expo;fe.Circ;/*!
 * CSSPlugin 3.15.0
 * https://gsap.com
 *
 * Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var zl,Zn,Jr,Da,vr,Il,za,sp=function(){return typeof window<"u"},Xn={},_r=180/Math.PI,ei=Math.PI/180,Br=Math.atan2,$l=1e8,Ia=/([A-Z])/g,op=/(left|right|width|margin|padding|x)/i,ap=/[\s,\(]\S/,Rn={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Ko=function(e,n){return n.set(n.t,n.p,Math.round((n.s+n.c*e)*1e4)/1e4+n.u,n)},lp=function(e,n){return n.set(n.t,n.p,e===1?n.e:Math.round((n.s+n.c*e)*1e4)/1e4+n.u,n)},cp=function(e,n){return n.set(n.t,n.p,e?Math.round((n.s+n.c*e)*1e4)/1e4+n.u:n.b,n)},up=function(e,n){return n.set(n.t,n.p,e===1?n.e:e?Math.round((n.s+n.c*e)*1e4)/1e4+n.u:n.b,n)},fp=function(e,n){var t=n.s+n.c*e;n.set(n.t,n.p,~~(t+(t<0?-.5:.5))+n.u,n)},zu=function(e,n){return n.set(n.t,n.p,e?n.e:n.b,n)},Iu=function(e,n){return n.set(n.t,n.p,e!==1?n.b:n.e,n)},hp=function(e,n,t){return e.style[n]=t},dp=function(e,n,t){return e.style.setProperty(n,t)},pp=function(e,n,t){return e._gsap[n]=t},gp=function(e,n,t){return e._gsap.scaleX=e._gsap.scaleY=t},mp=function(e,n,t,r,s){var o=e._gsap;o.scaleX=o.scaleY=t,o.renderTransform(s,o)},_p=function(e,n,t,r,s){var o=e._gsap;o[n]=t,o.renderTransform(s,o)},He="transform",Xt=He+"Origin",bp=function i(e,n){var t=this,r=this.target,s=r.style,o=r._gsap;if(e in Xn&&s){if(this.tfm=this.tfm||{},e!=="transform")e=Rn[e]||e,~e.indexOf(",")?e.split(",").forEach(function(a){return t.tfm[a]=Nn(r,a)}):this.tfm[e]=o.x?o[e]:Nn(r,e),e===Xt&&(this.tfm.zOrigin=o.zOrigin);else return Rn.transform.split(",").forEach(function(a){return i.call(t,a,n)});if(this.props.indexOf(He)>=0)return;o.svg&&(this.svgo=r.getAttribute("data-svg-origin"),this.props.push(Xt,n,"")),e=He}(s||n)&&this.props.push(e,n,s[e])},$u=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},yp=function(){var e=this.props,n=this.target,t=n.style,r=n._gsap,s,o;for(s=0;s<e.length;s+=3)e[s+1]?e[s+1]===2?n[e[s]](e[s+2]):n[e[s]]=e[s+2]:e[s+2]?t[e[s]]=e[s+2]:t.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(Ia,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)r[o]=this.tfm[o];r.svg&&(r.renderTransform(),n.setAttribute("data-svg-origin",this.svgo||"")),s=za(),(!s||!s.isStart)&&!t[He]&&($u(t),r.zOrigin&&t[Xt]&&(t[Xt]+=" "+r.zOrigin+"px",r.zOrigin=0,r.renderTransform()),r.uncache=1)}},Nu=function(e,n){var t={target:e,props:[],revert:yp,save:bp};return e._gsap||Wt.core.getCache(e),n&&e.style&&e.nodeType&&n.split(",").forEach(function(r){return t.save(r)}),t},Fu,Zo=function(e,n){var t=Zn.createElementNS?Zn.createElementNS((n||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):Zn.createElement(e);return t&&t.style?t:Zn.createElement(e)},an=function i(e,n,t){var r=getComputedStyle(e);return r[n]||r.getPropertyValue(n.replace(Ia,"-$1").toLowerCase())||r.getPropertyValue(n)||!t&&i(e,ui(n)||n,1)||""},Nl="O,Moz,ms,Ms,Webkit".split(","),ui=function(e,n,t){var r=n||vr,s=r.style,o=5;if(e in s&&!t)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);o--&&!(Nl[o]+e in s););return o<0?null:(o===3?"ms":o>=0?Nl[o]:"")+e},Jo=function(){sp()&&window.document&&(zl=window,Zn=zl.document,Jr=Zn.documentElement,vr=Zo("div")||{style:{}},Zo("div"),He=ui(He),Xt=He+"Origin",vr.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Fu=!!ui("perspective"),za=Wt.core.reverting,Da=1)},Fl=function(e){var n=e.ownerSVGElement,t=Zo("svg",n&&n.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),r=e.cloneNode(!0),s;r.style.display="block",t.appendChild(r),Jr.appendChild(t);try{s=r.getBBox()}catch{}return t.removeChild(r),Jr.removeChild(t),s},Bl=function(e,n){for(var t=n.length;t--;)if(e.hasAttribute(n[t]))return e.getAttribute(n[t])},Bu=function(e){var n,t;try{n=e.getBBox()}catch{n=Fl(e),t=1}return n&&(n.width||n.height)||t||(n=Fl(e)),n&&!n.width&&!n.x&&!n.y?{x:+Bl(e,["x","cx","x1"])||0,y:+Bl(e,["y","cy","y1"])||0,width:0,height:0}:n},Gu=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&Bu(e))},ar=function(e,n){if(n){var t=e.style,r;n in Xn&&n!==Xt&&(n=He),t.removeProperty?(r=n.substr(0,2),(r==="ms"||n.substr(0,6)==="webkit")&&(n="-"+n),t.removeProperty(r==="--"?n:n.replace(Ia,"-$1").toLowerCase())):t.removeAttribute(n)}},Jn=function(e,n,t,r,s,o){var a=new Yt(e._pt,n,t,0,1,o?Iu:zu);return e._pt=a,a.b=r,a.e=s,e._props.push(t),a},Gl={deg:1,rad:1,turn:1},vp={grid:1,flex:1},lr=function i(e,n,t,r){var s=parseFloat(t)||0,o=(t+"").trim().substr((s+"").length)||"px",a=vr.style,l=op.test(n),c=e.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),h=100,d=r==="px",f=r==="%",g,p,_,w;if(r===o||!s||Gl[r]||Gl[o])return s;if(o!=="px"&&!d&&(s=i(e,n,t,"px")),w=e.getCTM&&Gu(e),(f||o==="%")&&(Xn[n]||~n.indexOf("adius")))return g=w?e.getBBox()[l?"width":"height"]:e[u],Ke(f?s/g*h:s/100*g);if(a[l?"width":"height"]=h+(d?o:r),p=r!=="rem"&&~n.indexOf("adius")||r==="em"&&e.appendChild&&!c?e:e.parentNode,w&&(p=(e.ownerSVGElement||{}).parentNode),(!p||p===Zn||!p.appendChild)&&(p=Zn.body),_=p._gsap,_&&f&&_.width&&l&&_.time===rn.time&&!_.uncache)return Ke(s/_.width*h);if(f&&(n==="height"||n==="width")){var v=e.style[n];e.style[n]=h+r,g=e[u],v?e.style[n]=v:ar(e,n)}else(f||o==="%")&&!vp[an(p,"display")]&&(a.position=an(e,"position")),p===e&&(a.position="static"),p.appendChild(vr),g=vr[u],p.removeChild(vr),a.position="absolute";return l&&f&&(_=kr(p),_.time=rn.time,_.width=p[u]),Ke(d?g*s/h:g&&s?h/g*s:0)},Nn=function(e,n,t,r){var s;return Da||Jo(),n in Rn&&n!=="transform"&&(n=Rn[n],~n.indexOf(",")&&(n=n.split(",")[0])),Xn[n]&&n!=="transform"?(s=ts(e,r),s=n!=="transformOrigin"?s[n]:s.svg?s.origin:Zs(an(e,Xt))+" "+s.zOrigin+"px"):(s=e.style[n],(!s||s==="auto"||r||~(s+"").indexOf("calc("))&&(s=Ks[n]&&Ks[n](e,n,t)||an(e,n)||su(e,n)||(n==="opacity"?1:0))),t&&!~(s+"").trim().indexOf(" ")?lr(e,n,s,t)+t:s},xp=function(e,n,t,r){if(!t||t==="none"){var s=ui(n,e,1),o=s&&an(e,s,1);o&&o!==t?(n=s,t=o):n==="borderColor"&&(t=an(e,"borderTopColor"))}var a=new Yt(this._pt,e.style,n,0,1,Ou),l=0,c=0,u,h,d,f,g,p,_,w,v,k,x,C;if(a.b=t,a.e=r,t+="",r+="",r.substring(0,6)==="var(--"&&(r=an(e,r.substring(4,r.indexOf(")")))),r==="auto"&&(p=e.style[n],e.style[n]=r,r=an(e,n)||r,p?e.style[n]=p:ar(e,n)),u=[t,r],ku(u),t=u[0],r=u[1],d=t.match(Vr)||[],C=r.match(Vr)||[],C.length){for(;h=Vr.exec(r);)_=h[0],v=r.substring(l,h.index),g?g=(g+1)%5:(v.substr(-5)==="rgba("||v.substr(-5)==="hsla(")&&(g=1),_!==(p=d[c++]||"")&&(f=parseFloat(p)||0,x=p.substr((f+"").length),_.charAt(1)==="="&&(_=Zr(f,_)+x),w=parseFloat(_),k=_.substr((w+"").length),l=Vr.lastIndex-k.length,k||(k=k||ln.units[n]||x,l===r.length&&(r+=k,a.e+=k)),x!==k&&(f=lr(e,n,p,k)||0),a._pt={_next:a._pt,p:v||c===1?v:",",s:f,c:w-f,m:g&&g<4||n==="zIndex"?Math.round:0});a.c=l<r.length?r.substring(l,r.length):""}else a.r=n==="display"&&r==="none"?Iu:zu;return eu.test(r)&&(a.e=0),this._pt=a,a},Hl={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},wp=function(e){var n=e.split(" "),t=n[0],r=n[1]||"50%";return(t==="top"||t==="bottom"||r==="left"||r==="right")&&(e=t,t=r,r=e),n[0]=Hl[t]||t,n[1]=Hl[r]||r,n.join(" ")},Sp=function(e,n){if(n.tween&&n.tween._time===n.tween._dur){var t=n.t,r=t.style,s=n.u,o=t._gsap,a,l,c;if(s==="all"||s===!0)r.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)a=s[c],Xn[a]&&(l=1,a=a==="transformOrigin"?Xt:He),ar(t,a);l&&(ar(t,He),o&&(o.svg&&t.removeAttribute("transform"),r.scale=r.rotate=r.translate="none",ts(t,1),o.uncache=1,$u(r)))}},Ks={clearProps:function(e,n,t,r,s){if(s.data!=="isFromStart"){var o=e._pt=new Yt(e._pt,n,t,0,0,Sp);return o.u=r,o.pr=-10,o.tween=s,e._props.push(t),1}}},es=[1,0,0,1,0,0],Hu={},qu=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},ql=function(e){var n=an(e,He);return qu(n)?es:n.substr(7).match(Jc).map(Ke)},$a=function(e,n){var t=e._gsap||kr(e),r=e.style,s=ql(e),o,a,l,c;return t.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?es:s):(s===es&&!e.offsetParent&&e!==Jr&&!t.svg&&(l=r.display,r.display="block",o=e.parentNode,(!o||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,a=e.nextElementSibling,Jr.appendChild(e)),s=ql(e),l?r.display=l:ar(e,"display"),c&&(a?o.insertBefore(e,a):o?o.appendChild(e):Jr.removeChild(e))),n&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},ea=function(e,n,t,r,s,o){var a=e._gsap,l=s||$a(e,!0),c=a.xOrigin||0,u=a.yOrigin||0,h=a.xOffset||0,d=a.yOffset||0,f=l[0],g=l[1],p=l[2],_=l[3],w=l[4],v=l[5],k=n.split(" "),x=parseFloat(k[0])||0,C=parseFloat(k[1])||0,A,T,L,R;t?l!==es&&(T=f*_-g*p)&&(L=x*(_/T)+C*(-p/T)+(p*v-_*w)/T,R=x*(-g/T)+C*(f/T)-(f*v-g*w)/T,x=L,C=R):(A=Bu(e),x=A.x+(~k[0].indexOf("%")?x/100*A.width:x),C=A.y+(~(k[1]||k[0]).indexOf("%")?C/100*A.height:C)),r||r!==!1&&a.smooth?(w=x-c,v=C-u,a.xOffset=h+(w*f+v*p)-w,a.yOffset=d+(w*g+v*_)-v):a.xOffset=a.yOffset=0,a.xOrigin=x,a.yOrigin=C,a.smooth=!!r,a.origin=n,a.originIsAbsolute=!!t,e.style[Xt]="0px 0px",o&&(Jn(o,a,"xOrigin",c,x),Jn(o,a,"yOrigin",u,C),Jn(o,a,"xOffset",h,a.xOffset),Jn(o,a,"yOffset",d,a.yOffset)),e.setAttribute("data-svg-origin",x+" "+C)},ts=function(e,n){var t=e._gsap||new Cu(e);if("x"in t&&!n&&!t.uncache)return t;var r=e.style,s=t.scaleX<0,o="px",a="deg",l=getComputedStyle(e),c=an(e,Xt)||"0",u,h,d,f,g,p,_,w,v,k,x,C,A,T,L,R,P,J,m,F,$,V,K,B,M,O,b,X,ee,D,U,I;return u=h=d=p=_=w=v=k=x=0,f=g=1,t.svg=!!(e.getCTM&&Gu(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(r[He]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[He]!=="none"?l[He]:"")),r.scale=r.rotate=r.translate="none"),T=$a(e,t.svg),t.svg&&(t.uncache?(M=e.getBBox(),c=t.xOrigin-M.x+"px "+(t.yOrigin-M.y)+"px",B=""):B=!n&&e.getAttribute("data-svg-origin"),ea(e,B||c,!!B||t.originIsAbsolute,t.smooth!==!1,T)),C=t.xOrigin||0,A=t.yOrigin||0,T!==es&&(J=T[0],m=T[1],F=T[2],$=T[3],u=V=T[4],h=K=T[5],T.length===6?(f=Math.sqrt(J*J+m*m),g=Math.sqrt($*$+F*F),p=J||m?Br(m,J)*_r:0,v=F||$?Br(F,$)*_r+p:0,v&&(g*=Math.abs(Math.cos(v*ei))),t.svg&&(u-=C-(C*J+A*F),h-=A-(C*m+A*$))):(I=T[6],D=T[7],b=T[8],X=T[9],ee=T[10],U=T[11],u=T[12],h=T[13],d=T[14],L=Br(I,ee),_=L*_r,L&&(R=Math.cos(-L),P=Math.sin(-L),B=V*R+b*P,M=K*R+X*P,O=I*R+ee*P,b=V*-P+b*R,X=K*-P+X*R,ee=I*-P+ee*R,U=D*-P+U*R,V=B,K=M,I=O),L=Br(-F,ee),w=L*_r,L&&(R=Math.cos(-L),P=Math.sin(-L),B=J*R-b*P,M=m*R-X*P,O=F*R-ee*P,U=$*P+U*R,J=B,m=M,F=O),L=Br(m,J),p=L*_r,L&&(R=Math.cos(L),P=Math.sin(L),B=J*R+m*P,M=V*R+K*P,m=m*R-J*P,K=K*R-V*P,J=B,V=M),_&&Math.abs(_)+Math.abs(p)>359.9&&(_=p=0,w=180-w),f=Ke(Math.sqrt(J*J+m*m+F*F)),g=Ke(Math.sqrt(K*K+I*I)),L=Br(V,K),v=Math.abs(L)>2e-4?L*_r:0,x=U?1/(U<0?-U:U):0),t.svg&&(B=e.getAttribute("transform"),t.forceCSS=e.setAttribute("transform","")||!qu(an(e,He)),B&&e.setAttribute("transform",B))),Math.abs(v)>90&&Math.abs(v)<270&&(s?(f*=-1,v+=p<=0?180:-180,p+=p<=0?180:-180):(g*=-1,v+=v<=0?180:-180)),n=n||t.uncache,t.x=u-((t.xPercent=u&&(!n&&t.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-u)?-50:0)))?e.offsetWidth*t.xPercent/100:0)+o,t.y=h-((t.yPercent=h&&(!n&&t.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-h)?-50:0)))?e.offsetHeight*t.yPercent/100:0)+o,t.z=d+o,t.scaleX=Ke(f),t.scaleY=Ke(g),t.rotation=Ke(p)+a,t.rotationX=Ke(_)+a,t.rotationY=Ke(w)+a,t.skewX=v+a,t.skewY=k+a,t.transformPerspective=x+o,(t.zOrigin=parseFloat(c.split(" ")[2])||!n&&t.zOrigin||0)&&(r[Xt]=Zs(c)),t.xOffset=t.yOffset=0,t.force3D=ln.force3D,t.renderTransform=t.svg?Tp:Fu?Yu:kp,t.uncache=0,t},Zs=function(e){return(e=e.split(" "))[0]+" "+e[1]},Po=function(e,n,t){var r=Ct(n);return Ke(parseFloat(n)+parseFloat(lr(e,"x",t+"px",r)))+r},kp=function(e,n){n.z="0px",n.rotationY=n.rotationX="0deg",n.force3D=0,Yu(e,n)},pr="0deg",mi="0px",gr=") ",Yu=function(e,n){var t=n||this,r=t.xPercent,s=t.yPercent,o=t.x,a=t.y,l=t.z,c=t.rotation,u=t.rotationY,h=t.rotationX,d=t.skewX,f=t.skewY,g=t.scaleX,p=t.scaleY,_=t.transformPerspective,w=t.force3D,v=t.target,k=t.zOrigin,x="",C=w==="auto"&&e&&e!==1||w===!0;if(k&&(h!==pr||u!==pr)){var A=parseFloat(u)*ei,T=Math.sin(A),L=Math.cos(A),R;A=parseFloat(h)*ei,R=Math.cos(A),o=Po(v,o,T*R*-k),a=Po(v,a,-Math.sin(A)*-k),l=Po(v,l,L*R*-k+k)}_!==mi&&(x+="perspective("+_+gr),(r||s)&&(x+="translate("+r+"%, "+s+"%) "),(C||o!==mi||a!==mi||l!==mi)&&(x+=l!==mi||C?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+gr),c!==pr&&(x+="rotate("+c+gr),u!==pr&&(x+="rotateY("+u+gr),h!==pr&&(x+="rotateX("+h+gr),(d!==pr||f!==pr)&&(x+="skew("+d+", "+f+gr),(g!==1||p!==1)&&(x+="scale("+g+", "+p+gr),v.style[He]=x||"translate(0, 0)"},Tp=function(e,n){var t=n||this,r=t.xPercent,s=t.yPercent,o=t.x,a=t.y,l=t.rotation,c=t.skewX,u=t.skewY,h=t.scaleX,d=t.scaleY,f=t.target,g=t.xOrigin,p=t.yOrigin,_=t.xOffset,w=t.yOffset,v=t.forceCSS,k=parseFloat(o),x=parseFloat(a),C,A,T,L,R;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=ei,c*=ei,C=Math.cos(l)*h,A=Math.sin(l)*h,T=Math.sin(l-c)*-d,L=Math.cos(l-c)*d,c&&(u*=ei,R=Math.tan(c-u),R=Math.sqrt(1+R*R),T*=R,L*=R,u&&(R=Math.tan(u),R=Math.sqrt(1+R*R),C*=R,A*=R)),C=Ke(C),A=Ke(A),T=Ke(T),L=Ke(L)):(C=h,L=d,A=T=0),(k&&!~(o+"").indexOf("px")||x&&!~(a+"").indexOf("px"))&&(k=lr(f,"x",o,"px"),x=lr(f,"y",a,"px")),(g||p||_||w)&&(k=Ke(k+g-(g*C+p*T)+_),x=Ke(x+p-(g*A+p*L)+w)),(r||s)&&(R=f.getBBox(),k=Ke(k+r/100*R.width),x=Ke(x+s/100*R.height)),R="matrix("+C+","+A+","+T+","+L+","+k+","+x+")",f.setAttribute("transform",R),v&&(f.style[He]=R)},Cp=function(e,n,t,r,s){var o=360,a=gt(s),l=parseFloat(s)*(a&&~s.indexOf("rad")?_r:1),c=l-r,u=r+c+"deg",h,d;return a&&(h=s.split("_")[1],h==="short"&&(c%=o,c!==c%(o/2)&&(c+=c<0?o:-o)),h==="cw"&&c<0?c=(c+o*$l)%o-~~(c/o)*o:h==="ccw"&&c>0&&(c=(c-o*$l)%o-~~(c/o)*o)),e._pt=d=new Yt(e._pt,n,t,r,c,lp),d.e=u,d.u="deg",e._props.push(t),d},Yl=function(e,n){for(var t in n)e[t]=n[t];return e},Ep=function(e,n,t){var r=Yl({},t._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=t.style,a,l,c,u,h,d,f,g;r.svg?(c=t.getAttribute("transform"),t.setAttribute("transform",""),o[He]=n,a=ts(t,1),ar(t,He),t.setAttribute("transform",c)):(c=getComputedStyle(t)[He],o[He]=n,a=ts(t,1),o[He]=c);for(l in Xn)c=r[l],u=a[l],c!==u&&s.indexOf(l)<0&&(f=Ct(c),g=Ct(u),h=f!==g?lr(t,l,c,g):parseFloat(c),d=parseFloat(u),e._pt=new Yt(e._pt,a,l,h,d-h,Ko),e._pt.u=g||0,e._props.push(l));Yl(a,r)};qt("padding,margin,Width,Radius",function(i,e){var n="Top",t="Right",r="Bottom",s="Left",o=(e<3?[n,t,r,s]:[n+s,n+t,r+t,r+s]).map(function(a){return e<2?i+a:"border"+a+i});Ks[e>1?"border"+i:i]=function(a,l,c,u,h){var d,f;if(arguments.length<4)return d=o.map(function(g){return Nn(a,g,c)}),f=d.join(" "),f.split(d[0]).length===5?d[0]:f;d=(u+"").split(" "),f={},o.forEach(function(g,p){return f[g]=d[p]=d[p]||d[(p-1)/2|0]}),a.init(l,f,h)}});var Xu={name:"css",register:Jo,targetTest:function(e){return e.style&&e.nodeType},init:function(e,n,t,r,s){var o=this._props,a=e.style,l=t.vars.startAt,c,u,h,d,f,g,p,_,w,v,k,x,C,A,T,L,R;Da||Jo(),this.styles=this.styles||Nu(e),L=this.styles.props,this.tween=t;for(p in n)if(p!=="autoRound"&&(u=n[p],!(Jt[p]&&Eu(p,n,t,r,e,s)))){if(f=typeof u,g=Ks[p],f==="function"&&(u=u.call(t,r,e,s),f=typeof u),f==="string"&&~u.indexOf("random(")&&(u=Ki(u)),g)g(this,e,p,u,t)&&(T=1);else if(p.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(p)+"").trim(),u+="",ir.lastIndex=0,ir.test(c)||(_=Ct(c),w=Ct(u),w?_!==w&&(c=lr(e,p,c,w)+w):_&&(u+=_)),this.add(a,"setProperty",c,u,r,s,0,0,p),o.push(p),L.push(p,0,a[p]);else if(f!=="undefined"){if(l&&p in l?(c=typeof l[p]=="function"?l[p].call(t,r,e,s):l[p],gt(c)&&~c.indexOf("random(")&&(c=Ki(c)),Ct(c+"")||c==="auto"||(c+=ln.units[p]||Ct(Nn(e,p))||""),(c+"").charAt(1)==="="&&(c=Nn(e,p))):c=Nn(e,p),d=parseFloat(c),v=f==="string"&&u.charAt(1)==="="&&u.substr(0,2),v&&(u=u.substr(2)),h=parseFloat(u),p in Rn&&(p==="autoAlpha"&&(d===1&&Nn(e,"visibility")==="hidden"&&h&&(d=0),L.push("visibility",0,a.visibility),Jn(this,a,"visibility",d?"inherit":"hidden",h?"inherit":"hidden",!h)),p!=="scale"&&p!=="transform"&&(p=Rn[p],~p.indexOf(",")&&(p=p.split(",")[0]))),k=p in Xn,k){if(this.styles.save(p),R=u,f==="string"&&u.substring(0,6)==="var(--"){if(u=an(e,u.substring(4,u.indexOf(")"))),u.substring(0,5)==="calc("){var P=e.style.perspective;e.style.perspective=u,u=an(e,"perspective"),P?e.style.perspective=P:ar(e,"perspective")}h=parseFloat(u)}if(x||(C=e._gsap,C.renderTransform&&!n.parseTransform||ts(e,n.parseTransform),A=n.smoothOrigin!==!1&&C.smooth,x=this._pt=new Yt(this._pt,a,He,0,1,C.renderTransform,C,0,-1),x.dep=1),p==="scale")this._pt=new Yt(this._pt,C,"scaleY",C.scaleY,(v?Zr(C.scaleY,v+h):h)-C.scaleY||0,Ko),this._pt.u=0,o.push("scaleY",p),p+="X";else if(p==="transformOrigin"){L.push(Xt,0,a[Xt]),u=wp(u),C.svg?ea(e,u,0,A,0,this):(w=parseFloat(u.split(" ")[2])||0,w!==C.zOrigin&&Jn(this,C,"zOrigin",C.zOrigin,w),Jn(this,a,p,Zs(c),Zs(u)));continue}else if(p==="svgOrigin"){ea(e,u,1,A,0,this);continue}else if(p in Hu){Cp(this,C,p,d,v?Zr(d,v+u):u);continue}else if(p==="smoothOrigin"){Jn(this,C,"smooth",C.smooth,u);continue}else if(p==="force3D"){C[p]=u;continue}else if(p==="transform"){Ep(this,u,e);continue}}else p in a||(p=ui(p)||p);if(k||(h||h===0)&&(d||d===0)&&!ap.test(u)&&p in a)_=(c+"").substr((d+"").length),h||(h=0),w=Ct(u)||(p in ln.units?ln.units[p]:_),_!==w&&(d=lr(e,p,c,w)),this._pt=new Yt(this._pt,k?C:a,p,d,(v?Zr(d,v+h):h)-d,!k&&(w==="px"||p==="zIndex")&&n.autoRound!==!1?fp:Ko),this._pt.u=w||0,k&&R!==u?(this._pt.b=c,this._pt.e=R,this._pt.r=up):_!==w&&w!=="%"&&(this._pt.b=c,this._pt.r=cp);else if(p in a)xp.call(this,e,p,c,v?v+u:u);else if(p in e)this.add(e,p,c||e[p],v?v+u:u,r,s);else if(p!=="parseTransform"){ka(p,u);continue}k||(p in a?L.push(p,0,a[p]):typeof e[p]=="function"?L.push(p,2,e[p]()):L.push(p,1,c||e[p])),o.push(p)}}T&&Lu(this)},render:function(e,n){if(n.tween._time||!za())for(var t=n._pt;t;)t.r(e,t.d),t=t._next;else n.styles.revert()},get:Nn,aliases:Rn,getSetter:function(e,n,t){var r=Rn[n];return r&&r.indexOf(",")<0&&(n=r),n in Xn&&n!==Xt&&(e._gsap.x||Nn(e,"x"))?t&&Il===t?n==="scale"?gp:pp:(Il=t||{})&&(n==="scale"?mp:_p):e.style&&!xa(e.style[n])?hp:~n.indexOf("-")?dp:Oa(e,n)},core:{_removeProperty:ar,_getMatrix:$a}};Wt.utils.checkPrefix=ui;Wt.core.getStyleSaver=Nu;(function(i,e,n,t){var r=qt(i+","+e+","+n,function(s){Xn[s]=1});qt(e,function(s){ln.units[s]="deg",Hu[s]=1}),Rn[r[13]]=i+","+e,qt(t,function(s){var o=s.split(":");Rn[o[1]]=r[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");qt("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(i){ln.units[i]="px"});Wt.registerPlugin(Xu);var On=Wt.registerPlugin(Xu)||Wt;On.core.Tween;const Mp={ch1:{eyebrow:"其壹 · 序 PROLOGUE",title:"步天歌",hook:"三千年前，中国人开始给星星命名。",body:["先民把群星分作星官，各有职司。到三国陈卓汇总三家星经时，这张名单已录下二百八十三官、一千四百六十余星。","《步天歌》是把整张星表写成的长诗，一句一宿，循诗可以认星。本站以它为题，把这份名录还原成一片可以走进去的夜空。","向下滚动，步入夜空。"],seal:"步"},ch2:{eyebrow:"其贰 · 星野漫游 THE ATLAS",title:"星野漫游",hook:"循着一首千年前的歌，把星星一颗颗认出来。",body:["古人认星，靠一首歌。《步天歌》把全天星官谱成韵语，一句一宿，循诗可以认星。","三垣居中，四象环列——中国人给天空立的法。","拖拽环视，点击任意一颗星，看看它属于哪一位星官。"],seal:"野"},ch3:{eyebrow:"其叁 · 观象授时 THE GNOMON",title:"观象授时",hook:"一根八尺之表，一条量影之圭，就是一个王朝的天文台。",body:["正午测日影：影最长的那一天是冬至，最短的那一天是夏至。两至既定，四时均分，二十四节气由此排出。","河南登封至今立着这件仪器的放大版：元代郭守敬所建观星台，以高表测影，为《授时历》测得回归年长 365.2425 日——与三百年后的格里历相同。","所谓观象授时：历法的权威，来自对天空的测量。"],seal:"表"},ch4:{eyebrow:"其肆 · 天人之间 THE POLE STAR",title:"天人之间",hook:"全天最尊贵的星域，围着北极建了一座城。",body:["紫微垣，天上的宫城：左右两垣为墙，墙内住着皇族、帝座与百官。","天的秩序映照人的秩序——星官有名有职，如同朝廷。观星，也是观天下。"],seal:"极"},ch5:{eyebrow:"其伍 · 天球仪 THE CELESTIAL SPHERE",title:"天球仪",hook:"「浑天如鸡子，天体圆如弹丸，地如鸡中黄。」——张衡《浑天仪注》",body:["东汉张衡造浑天仪：铜球缀列星，绕轴而转，演示周天星象的起落。天，被做成一颗可以转动的球。","在这里，平面的星图重新团回天球。用你的手指转动它，像转动一件两千年前的仪器。"],seal:"球"},ch6:{eyebrow:"其陆 · 岁差 PRECESSION",title:"一万年",hook:"地轴是一支缓慢摇晃的陀螺，约两万六千年才转完一圈。",body:["东晋虞喜最先察觉：冬至点每年都在悄悄西移，约五十年退一度。他称之为「岁差」——天自为天，岁自为岁。","于是北极星也会换届：三千年前，周的天下以「帝星」（小熊座β）为北辰；今夜属于勾陈一；一万年后，织女星将接过这个位置。","拖动时间，看天极在星空中缓缓画出一个圆。"],seal:"岁"},ch7:{eyebrow:"其柒 · 东西对话 EAST MEETS WEST",title:"东西对话",hook:"同一片星空，两种秩序各自连线。",body:["中国的天狼是一颗独坐的星官，守在南方朱雀的井宿之野，主侵掠；在希腊人的图上，它是大犬座 α，猎户脚边的猎犬。","中国的织女是银河西岸的织女星官，七夕故事的主角；在西方，她是天琴座 α——俄耳甫斯的竖琴。","北斗七星在中国是帝车，运于中央、临制四方；同七颗星，在西方只是大熊的尾巴与后臀。"],seal:"会"},ch8:{eyebrow:"其捌 · 尾声 CREDITS",title:"尾声",hook:"缘起于一首旧诗，收束于一页致谢。",body:["本作品以《步天歌》为题——一卷把星官谱成韵语、便于记诵认星的旧诗。千年之后，诗里的星仍在原处，我们只是换了一种读法。","数据、开源技术与制作说明列于下方。本站为中国大学生计算机设计大赛参赛作品（信息可视化设计类）。"],seal:"跋"}},hs=[{key:"北斗",type:"seek",target:"北斗",hint:"找到那把勺子——七颗星连成的斗，就挂在北天。",plain:"北斗七星：天帝的车驾，斗柄所指，即是四方与四时。"},{key:"天狼",type:"seek",target:"天狼",hint:"找到全天最亮的星——南方低空，耀眼夺目的那一颗。",plain:"天狼是全天第一亮星，在井宿之野独坐，古人以它主侵掠。"},{key:"勾陈",type:"flash",target:"勾陈",hint:"只看一瞬——记住紫微垣中、今夜北极星所在的那一组，它随即隐去。",plain:"勾陈六星形如钩，勾陈一就是当代北极星。"},{key:"北极",type:"choice",target:"北极",hint:"「北极」——四句之中，哪一句说的是它？",options:["「中元北極紫微宮，北極五星在其中」","「北斗之宿七星明，第一主帝名樞精」","帝之后妃的车驾，形如弯钩，其最亮的一颗是今夜北极星。","天帝的车驾：斗柄所指，即是四方与四时。"],answer:0,plain:"北极五星：太子、帝、庶子、后宫、天枢——天皇一家，以星列位。"},{key:"织女",type:"seek",target:"织女",hint:"找到织女——银河西岸，与牵牛隔河相望的亮星。",plain:"织女三星，七夕故事的主角，一万年后将继任北极星。"},{key:"河鼓",type:"flash",target:"河鼓",hint:"只看一瞬——记住银河东岸的牵牛三星，它随即隐去。",plain:"河鼓三星即牵牛，与织女隔河相望，七夕的故事由此而来。"},{key:"昴宿",type:"choice",target:"昴宿",hint:"「昴宿」——四句之中，哪一句说的是它？",options:["「牛上直建三河鼓，鼓上三星號織女」","「七星一聚實不少，阿西月東各一星」","「三星中央色最深，下有積卒共十二」","银河西岸的亮星官，七夕故事的主角。"],answer:1,plain:"昴宿七星聚作一团，即西方白虎的昴星团，民间呼为七姊妹。"},{key:"心宿",type:"seek",target:"心宿",hint:"找到苍龙之心——东方三星相依，中央那颗最红，名叫大火。",plain:"心宿三星：中央「大火」色最红，古人观大火以候寒暑。"},{key:"北落师门",type:"flash",target:"北落师门",hint:"只看一瞬——记住南方孤悬的那颗亮星，它随即隐去。",plain:"北落师门：羽林军南门外独守的亮星，秋夜南天最醒目的一颗。"},{key:"老人",type:"choice",target:"老人",hint:"「老人」——四句之中，哪一句说的是它？",options:["「左畔九個彎弧弓，一矢擬射頑狼胸」","「邱下一狼光蓬茸」","羽林军南门之外，一颗独守的亮星。","「有個老人南極中，春秋出入壽無窮」"],answer:3,plain:"老人星：南极仙翁，南天第二亮星，古人以它主寿安。"}],ds=[{key:"北极",groups:["北极"],title:"北极五星 · 皇族",story:"太子、帝、庶子、后宫、天枢——天皇一家，以星列位。",labels:[{text:"太子",star:"北极一"},{text:"帝",star:"北极二"},{text:"庶子",star:"北极三"},{text:"后宫",star:"北极四"},{text:"天枢",star:"北极五"}]},{key:"勾陈",groups:["勾陈"],title:"勾陈 · 后宫车马",story:"帝之后妃的车驾，形如弯钩。其中最亮的勾陈一，就是今夜的北极星。",labels:[{text:"勾陈一",star:"勾陈一"}]},{key:"帝座",groups:["天皇大帝","五帝内座"],title:"天皇大帝 · 帝座",story:"天皇大帝居中而御，五帝内座环侍在旁——天上至尊的宝座。",labels:[{text:"天皇大帝",star:"天皇大帝"}]},{key:"百官",groups:["尚书","大理","天柱"],title:"尚书 · 大理 · 天柱",story:"秘书、法官、政令——一座悬浮的朝廷。",labels:[{text:"尚书",star:"尚书一"},{text:"大理",star:"大理一"},{text:"天柱",star:"天柱一"}]},{key:"拱北",groups:[],title:"回望 · 众星拱北",story:"「譬如北辰，居其所而众星共之。」——《论语·为政》"}],Xl={heading:"数据与出处",groups:[{title:"数据来源",lines:["HYG Database v4.4 · CC BY-SA-4.0 · astronexus.com","许可协议：https://creativecommons.org/licenses/by-sa/4.0/","Stellarium 项目 · 中国星空文化数据","《步天歌》 · 丹元子 · 公有领域文本"]},{title:"开源技术",lines:["three.js","GSAP / ScrollTrigger","Vite","TypeScript","Noto Serif SC（思源宋体）· SIL OFL 1.1"]},{title:"制作说明",lines:["AI 辅助设计与编码","全部内容经人工校订"]}]},Na=.35,Wu=.8,xr=.05,ti=.3,zs=5,Uu=10,ta=3,Fa=12,Vu=8,Ba=4,Ga=2e4,Ha=12e3,Is=0,wn=1,Pi=2;function Js(i){return Math.min(Math.max(i,0),1)}function ju(i){return i<Na?Is:i<Wu?wn:Pi}function Qu(i,e){return i>=2||e<=Ba?2:i>=1?1:0}function Ku(i){return i<Uu/2?Fa:Vu}function eo(i){return i<=1?1:i===2?1.5:i===3?2:3}function Zu(i,e){return Math.round(1e3*eo(i))*(e?2:1)}function Ju(i){return i>=Ga?"甲":i>=Ha?"乙":"丙"}function na(i,e){const n=i.slice();for(let t=n.length-1;t>0;t--){const r=Math.floor(e()*(t+1)),s=n[t];n[t]=n[r],n[r]=s}return n}function ra(i){const e=(ti-xr)/zs,n=[];for(let s=0;s<zs;s++)n.push(Js((i-(xr+s*e))/e));const t=i<xr?-1:Math.min(Math.floor((i-xr)/e),zs-1),r=Js((i-ti)/(Na-ti));return{active:t,lines:n,finale:r}}const Wl=100,ps=.78,Pp=1.6,Ap=1.35,Rp=1e4,Op=1500,Lp=1200,Dp=4500,Ul="ch2-xunxingling-best",Vl=[{text:"北斗之宿七星明",label:"北斗",groups:["北斗"]},{text:"北极五星在其中",label:"北极",groups:["北极"]},{text:"三星中央色最深",label:"心宿",groups:["心宿"]},{text:"牛上直建三河鼓，鼓上三星号织女",label:"河鼓 · 织女",groups:["河鼓","织女"]},{text:"邱下一狼光蓬茸",label:"天狼",groups:["天狼"]}],zp=["北斗","北极","心宿","河鼓","天狼"],Ip=(()=>{const[i,e,n]=kn(297.7,8.6),[t,r,s]=kn(280.5,38.7),o=i+t,a=e+r,l=n+s,c=Math.hypot(o,a,l),u=Math.atan2(l,o)*180/Math.PI,h=Math.asin(a/c)*180/Math.PI;return[Qn(186,56.5),Qn(218.6,76.8),Qn(247.2,-26.8),Qn(u,h),Qn(101.3,-16.7)]})(),jl={北斗:{ra:186,dec:56.5,ring:26},勾陈:{ra:269.6,dec:86.5,ring:12},天狼:{ra:101.3,dec:-16.7,ring:6},织女:{ra:280.5,dec:38.7,ring:8},北极:{ra:218.6,dec:76.8,ring:10},心宿:{ra:247.2,dec:-26.8,ring:8},河鼓:{ra:297.7,dec:8.6,ring:8},昴宿:{ra:56.6,dec:24.2,ring:10},北落师门:{ra:344.4,dec:-29.6,ring:5},老人:{ra:96,dec:-52.7,ring:5}},$p=["一","二","三","四","五","六","七","八","九","十"],Np={seek:"寻星",flash:"闪现",choice:"四选一"},Fp={甲:"仰观天文，俯察地理——这片星野，你已得了古人真传。",乙:"星野渐熟。再循一遍歌，全天星官皆可指认。",丙:"莫急。抬头多看几夜，星星自会认你。"},Bp=`
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

/* ---- 段2 寻星令：HUD（右上描金小件，不拦截点击） ---- */
.ch2-hud {
  position: absolute; right: 3.2vw; top: 4.5vh;
  display: flex; flex-direction: column; align-items: flex-end; gap: 8px;
  opacity: 0; transition: opacity 0.5s ease;
  pointer-events: none;
}
.ch2-hud.on { opacity: 1; }
.ch2-hearts { display: flex; gap: 6px; padding: 2px; }
.ch2-hearts i {
  width: 14px; height: 14px; border-radius: 3px;
  background: linear-gradient(150deg, #b1402f 0%, #8e2f22 100%);
  box-shadow: 0 0 8px rgba(142, 47, 34, 0.55), inset 0 0 3px rgba(0, 0, 0, 0.3);
  transition: opacity 0.3s ease, transform 0.3s ease, background 0.3s ease;
}
.ch2-hearts i.off {
  background: none;
  border: 1px solid rgba(142, 47, 34, 0.55);
  box-shadow: none;
  opacity: 0.45; transform: scale(0.85);
}
.ch2-hud-item {
  display: flex; align-items: baseline; gap: 8px;
  padding: 4px 10px;
  background: rgba(13, 13, 17, 0.55);
  border: 1px solid rgba(175, 145, 95, 0.28); border-radius: 6px;
  backdrop-filter: blur(3px);
}
.ch2-hud-item label { font-size: 10px; letter-spacing: 0.3em; color: #af915f; }
.ch2-hud-item b {
  font-family: var(--font-display, "Songti SC", serif);
  font-size: 16px; font-weight: 400; color: #fce1b6;
}
.ch2-hud-combo.rain b { color: #c9a227; text-shadow: 0 0 10px rgba(201, 162, 39, 0.65); }

/* ---- 段2：题目卡（底部中央，卡面不拦截点击，仅跳过/选项/按钮可点） ---- */
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
.ch2-timer {
  position: absolute; top: 0; left: 12px; right: 12px; height: 3px;
  border-radius: 2px; background: rgba(252, 225, 182, 0.12);
  overflow: hidden; transition: opacity 0.4s ease;
}
.ch2-timer i { display: block; height: 100%; width: 100%; background: linear-gradient(90deg, #c9a227, #e8c85a); }
.ch2-quest.mode-verse .ch2-timer,
.ch2-quest.mode-result .ch2-timer { opacity: 0; }
.ch2-quest-meta { display: flex; justify-content: space-between; align-items: center; gap: 10px; margin-bottom: 8px; }
.ch2-quest-no { flex: 1; font-size: 11px; letter-spacing: 0.42em; color: #fce1b6; opacity: 0.55; }
.ch2-quest-type {
  flex: none;
  font-size: 11px; letter-spacing: 0.3em; text-indent: 0.3em; color: #c9a227;
  border: 1px solid rgba(201, 162, 39, 0.35); border-radius: 4px;
  padding: 2px 6px;
}
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
.ch2-quest.mode-verse .ch2-quest-hint { display: none; }
.ch2-quest.mode-verse .ch2-quest-verse { display: block; }
.ch2-quest.mode-verse .ch2-skip { visibility: hidden; }

/* ---- 段2：四选一选项（可点） ---- */
.ch2-options { display: none; flex-direction: column; gap: 8px; margin-top: 12px; }
.ch2-quest.mode-choice .ch2-options { display: flex; }
.ch2-opt {
  pointer-events: auto;
  text-align: left;
  background: rgba(252, 225, 182, 0.05);
  border: 1px solid rgba(175, 145, 95, 0.35); border-radius: 6px;
  padding: 9px 12px;
  font-family: var(--font-body, "PingFang SC", sans-serif);
  font-size: 13.5px; line-height: 1.7; color: #f6e8d8;
  cursor: pointer;
  transition: border-color 0.25s ease, background 0.25s ease, transform 0.15s ease;
}
.ch2-opt:hover:not(:disabled) {
  border-color: rgba(201, 162, 39, 0.75);
  background: rgba(201, 162, 39, 0.1);
  transform: translateX(2px);
}
.ch2-opt.wrong {
  border-color: rgba(142, 47, 34, 0.8);
  background: rgba(142, 47, 34, 0.12);
  color: rgba(246, 232, 216, 0.4);
  cursor: default;
}

/* ---- 段2：结算卡 ---- */
.ch2-result { display: none; text-align: center; }
.ch2-quest.mode-result .ch2-result { display: block; }
.ch2-quest.mode-result .ch2-quest-meta,
.ch2-quest.mode-result .ch2-quest-hint,
.ch2-quest.mode-result .ch2-options { display: none; }
.ch2-result h3 {
  font-family: var(--font-display, "Songti SC", serif);
  font-size: 15px; font-weight: 400; letter-spacing: 0.4em; text-indent: 0.4em;
  color: #fce1b6; opacity: 0.85; margin-bottom: 10px;
}
.ch2-result-grade {
  font-family: var(--font-display, "Songti SC", serif);
  font-size: 44px; line-height: 1.1; color: #c9a227;
  text-shadow: 0 0 22px rgba(201, 162, 39, 0.4);
}
.ch2-result-score { margin-top: 2px; font-size: 13px; letter-spacing: 0.2em; color: #fce1b6; }
.ch2-result-score b {
  font-family: var(--font-display, "Songti SC", serif);
  font-size: 26px; font-weight: 400; margin-left: 6px;
}
.ch2-result-line { margin-top: 6px; font-size: 12.5px; letter-spacing: 0.14em; opacity: 0.85; }
.ch2-result-th { margin-top: 4px; font-size: 11px; letter-spacing: 0.12em; color: #af915f; }
.ch2-result-note { margin-top: 8px; font-size: 13px; line-height: 1.9; color: #f6e8d8; }
.ch2-result-best { margin-top: 8px; font-size: 12.5px; letter-spacing: 0.14em; color: #fce1b6; }
.ch2-result-best b { color: #c9a227; font-weight: 400; }
.ch2-best-badge {
  display: inline-block; margin-left: 8px; padding: 2px 8px; border-radius: 4px;
  font-size: 11px; letter-spacing: 0.2em; color: #f6e8d8;
  background: linear-gradient(150deg, #b1402f 0%, #8e2f22 100%);
  box-shadow: 0 0 12px rgba(142, 47, 34, 0.5);
}
.ch2-result-btns { margin-top: 14px; display: flex; justify-content: center; gap: 12px; }
.ch2-btn {
  pointer-events: auto;
  font-family: var(--font-body, "PingFang SC", sans-serif);
  font-size: 13px; letter-spacing: 0.24em; text-indent: 0.12em;
  padding: 8px 18px; border-radius: 6px; cursor: pointer;
  transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease;
}
.ch2-btn-gold { background: rgba(201, 162, 39, 0.14); border: 1px solid rgba(201, 162, 39, 0.6); color: #fce1b6; }
.ch2-btn-gold:hover { background: rgba(201, 162, 39, 0.28); box-shadow: 0 0 16px rgba(201, 162, 39, 0.35); }
.ch2-btn-ghost { background: none; border: 1px solid rgba(175, 145, 95, 0.4); color: #af915f; }
.ch2-btn-ghost:hover { color: #fce1b6; border-color: rgba(201, 162, 39, 0.6); }

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

/* ---- 段2：答对分数飘字（上浮消散） ---- */
.ch2-floats { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.ch2-float {
  position: absolute; left: 50%; bottom: 26vh;
  transform: translateX(-50%);
  font-family: var(--font-display, "Songti SC", serif);
  font-size: 26px; color: #e8c85a;
  text-shadow: 0 0 14px rgba(201, 162, 39, 0.65), 0 2px 8px rgba(13, 13, 17, 0.9);
  animation: ch2FloatUp 1.15s ease-out forwards;
}
@keyframes ch2FloatUp {
  0% { opacity: 0; transform: translate(-50%, 10px) scale(0.85); }
  18% { opacity: 1; transform: translate(-50%, 0) scale(1.06); }
  100% { opacity: 0; transform: translate(-50%, -72px) scale(1); }
}

/* ---- 段2：答错四角红闪（0.3s） ---- */
.ch2-redflash {
  position: absolute; inset: 0; pointer-events: none; opacity: 0;
  background:
    radial-gradient(42vw 42vh at 0% 0%, rgba(142, 47, 34, 0.5), transparent 70%),
    radial-gradient(42vw 42vh at 100% 0%, rgba(142, 47, 34, 0.5), transparent 70%),
    radial-gradient(42vw 42vh at 0% 100%, rgba(142, 47, 34, 0.5), transparent 70%),
    radial-gradient(42vw 42vh at 100% 100%, rgba(142, 47, 34, 0.5), transparent 70%);
}
.ch2-redflash.on { animation: ch2Red 0.3s ease-out; }
@keyframes ch2Red { 0% { opacity: 0; } 25% { opacity: 1; } 100% { opacity: 0; } }

/* ---- 段2：星雨（流星 + 大字） ---- */
.ch2-meteor {
  position: absolute; top: 12vh; left: 78vw;
  width: 180px; height: 2px;
  background: linear-gradient(90deg, rgba(252, 225, 182, 0.95), transparent);
  transform: rotate(-32deg); transform-origin: left center;
  filter: drop-shadow(0 0 6px rgba(252, 225, 182, 0.8));
  opacity: 0; pointer-events: none;
}
.ch2-meteor.on { animation: ch2Meteor 1.15s cubic-bezier(0.3, 0.6, 0.6, 1) forwards; }
@keyframes ch2Meteor {
  0% { opacity: 0; transform: rotate(-32deg) translateX(0); }
  8% { opacity: 1; }
  100% { opacity: 0; transform: rotate(-32deg) translateX(-70vw); }
}
.ch2-rain-title {
  position: absolute; left: 50%; top: 34vh;
  transform: translate(-50%, -50%);
  font-family: var(--font-display, "Songti SC", serif);
  font-size: clamp(40px, 7vh, 64px);
  letter-spacing: 0.5em; text-indent: 0.5em; color: #fce1b6;
  text-shadow: 0 0 30px rgba(201, 162, 39, 0.75), 0 0 60px rgba(201, 162, 39, 0.4);
  opacity: 0; pointer-events: none;
}
.ch2-rain-title.on { animation: ch2RainTitle 2.2s ease forwards; }
@keyframes ch2RainTitle {
  0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
  15% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  70% { opacity: 1; }
  100% { opacity: 0; transform: translate(-50%, -56%) scale(1.04); }
}

/* ---- 段3：自由探索面板 ---- */
.ch2-explore { left: 6vw; bottom: 10vh; max-width: 400px; }
.ch2-explore h2 {
  font-family: var(--font-display, "Songti SC", serif);
  font-size: 26px; font-weight: 400; letter-spacing: 0.14em; color: #c9a227;
  margin-bottom: 10px;
}
.ch2-explore p { font-size: 14px; line-height: 2; opacity: 0.88; }
.ch2-recap { margin-top: 10px; font-size: 12px; letter-spacing: 0.12em; color: #fce1b6; opacity: 0.7; }
`;let Ql=!1;function Gp(){if(Ql||typeof document>"u")return;const i=document.createElement("style");i.dataset.ch2="",i.textContent=Bp,document.head.appendChild(i),Ql=!0}function Cn(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}let tn=null,Ni=null;function Hp(){if(typeof window>"u")return;const i=window.AudioContext??window.webkitAudioContext;i&&(tn||(tn=new i,Ni=tn.createGain(),Ni.gain.value=.12,Ni.connect(tn.destination)),tn.state==="suspended"&&tn.resume())}function ef(i,e,n){if(Hp(),!tn||!Ni)return;const t=tn.sampleRate,r=Math.max(2,Math.round(t/i)),s=Math.floor(t*e),o=tn.createBuffer(1,s,t),a=o.getChannelData(0),l=new Float32Array(r);for(let h=0;h<r;h++)l[h]=Math.random()*2-1;let c=0;for(let h=0;h<s;h++){const d=l[c],f=l[(c+1)%r];l[c]=.996*.5*(d+f),a[h]=d*n,c=(c+1)%r}const u=tn.createBufferSource();u.buffer=o,u.connect(Ni),u.start()}function qp(){ef(880,.9,.9)}function Kl(){ef(164.8,1.1,1)}function Yp(i){Gp();const e=i.root.querySelector(".pin"),{copy:n}=i;function t(y,E){const Z=document.createElement(y);return Z.className=E,e.appendChild(Z),Z}const r=t("div","ch2-card ch2-title");r.innerHTML=`
    <p class="eyebrow">${Cn(n.eyebrow)}</p>
    <div class="ch2-head">
      <h2>${Cn(n.title)}</h2>
      ${n.seal?`<div class="seal">${Cn(n.seal)}</div>`:""}
    </div>
    <p class="ch2-hook">${Cn(n.hook)}</p>
    <p class="ch2-narr">${Cn(n.body[0]??"")}</p>
  `;const s=t("div","ch2-lines"),o=Vl.map(y=>{const E=document.createElement("div");return E.className="ch2-line",E.innerHTML=`<span class="ch2-line-text">${Cn(y.text)}</span><span class="ch2-line-name">${Cn(y.label)}</span>`,s.appendChild(E),E}),a=t("div","ch2-card ch2-finale");a.innerHTML=`<p class="ch2-finale-text">${Cn(n.body[1]??"")}</p>`;const l=t("div","ch2-hud");l.innerHTML=`
    <div class="ch2-hearts"><i></i><i></i><i></i></div>
    <div class="ch2-hud-item ch2-hud-score"><label>得分</label><b>0</b></div>
    <div class="ch2-hud-item ch2-hud-combo"><label>连击</label><b>×1</b></div>
  `;const c=Array.from(l.querySelectorAll(".ch2-hearts i")),u=l.querySelector(".ch2-hud-score b"),h=l.querySelector(".ch2-hud-combo"),d=l.querySelector(".ch2-hud-combo b"),f=t("div","ch2-card ch2-quest");f.innerHTML=`
    <div class="ch2-timer"><i></i></div>
    <div class="ch2-quest-meta">
      <span class="ch2-quest-no"></span>
      <span class="ch2-quest-type"></span>
      <button type="button" class="ch2-skip">跳过</button>
    </div>
    <p class="ch2-quest-hint"></p>
    <div class="ch2-options"></div>
    <div class="ch2-quest-verse">
      <p class="ch2-verse-text"></p>
      <p class="ch2-verse-from"></p>
      <p class="ch2-verse-plain"></p>
    </div>
    <div class="ch2-result">
      <h3>寻星令 · 结算</h3>
      <p class="ch2-result-grade">丙</p>
      <p class="ch2-result-score">总分<b>0</b></p>
      <p class="ch2-result-line"></p>
      <p class="ch2-result-th"></p>
      <p class="ch2-result-note"></p>
      <p class="ch2-result-best"></p>
      <div class="ch2-result-btns">
        <button type="button" class="ch2-btn ch2-btn-gold ch2-again">再来一局</button>
        <button type="button" class="ch2-btn ch2-btn-ghost ch2-goto-explore">进入星野</button>
      </div>
    </div>
  `;const g=f.querySelector(".ch2-timer i"),p=f.querySelector(".ch2-quest-no"),_=f.querySelector(".ch2-quest-type"),w=f.querySelector(".ch2-quest-hint"),v=f.querySelector(".ch2-options"),k=f.querySelector(".ch2-verse-text"),x=f.querySelector(".ch2-verse-from"),C=f.querySelector(".ch2-verse-plain"),A=f.querySelector(".ch2-result-grade"),T=f.querySelector(".ch2-result-score b"),L=f.querySelector(".ch2-result-line"),R=f.querySelector(".ch2-result-th"),P=f.querySelector(".ch2-result-note"),J=f.querySelector(".ch2-result-best"),m=f.querySelector(".ch2-skip"),F=f.querySelector(".ch2-again"),$=f.querySelector(".ch2-goto-explore"),V=t("div","ch2-floats"),K=t("div","ch2-redflash"),B=t("div","ch2-meteor"),M=t("div","ch2-rain-title");M.textContent="星雨";const O=t("div","ch2-card ch2-explore");O.innerHTML=`
    <h2>现在，把星空交给你</h2>
    <p>${Cn(n.body[2]??"")}</p>
    <p class="ch2-recap">你已经认出了 ${hs.map(y=>Cn(y.key)).join(" · ")}</p>
  `;const b=t("div","atlas-hint");b.textContent="拖拽环视 · 点击星点查看星官";const X=t("div","ch2-arrow");X.appendChild(document.createElement("i"));let ee=null;fetch(nr("data/poem.json")).then(y=>y.ok?y.json():null).then(y=>{ee=y,Ie==="verse"&&ot()}).catch(()=>{});let D=-1,U=0,I=hs,N=0,Y=hs.map(()=>!1),ge=ta,ye=0,qe=0,Ve=0,Te=0,q=0,j="asking",je=[];const Je=new Set;let S=!1,Ye=Fa*1e3,De=Ye,Le=0,de=!1,ue=0,ze=0,ut=!1,Se=!1,Pt=null,Ie="hidden",mt=null,ft=null,At=null,me=null,_e=null,vt=null,it=null,Rt=null,Ut=0;const Vt=new Set;let jt=0,ie=!1;const xn=new gn;let Ot=!1,Ae=null,Lt="",fn=8,hn=!1,ht=null,Wn=!1,re=!1,Q=!1,he=!1,z=!1,ne=-2,W=!1,te="";function Fe(y){const E=i.sky.groupCount;for(let Z=0;Z<E;Z++)i.sky.setGroupProgress(Z,y)}function se(y){Wn!==y&&(Wn=y,r.classList.toggle("on",y))}function Re(y){re!==y&&(re=y,a.classList.toggle("on",y))}function Qe(y){Q!==y&&(Q=y,O.classList.toggle("on",y))}function Ce(y){he!==y&&(he=y,b.classList.toggle("on",y))}function ve(y){z!==y&&(z=y,l.classList.toggle("on",y))}function pe(y){ne!==y&&(ne=y,o.forEach((E,Z)=>E.classList.toggle("on",Z===y)))}function xt(y){Ot!==y&&(Ot=y,X.classList.toggle("on",y),y||(X.style.opacity=""))}function ke(y,E){y.classList.remove(E),y.offsetWidth,y.classList.add(E)}function wt(y){return`×${Number.isInteger(y)?y:y.toFixed(1)}`}function et(){u.textContent=String(ye),d.textContent=Se?`${wt(eo(qe+1))} · 星雨双倍`:wt(eo(qe+1)),h.classList.toggle("rain",Se),c.forEach((y,E)=>y.classList.toggle("off",E>=ge))}function tt(y){const E=(Js(y)*100).toFixed(1);if(E===te)return;te=E,g.style.width=`${E}%`;const Z=Math.round(8+34*Js(y));g.style.background=`linear-gradient(90deg, hsl(${Z} 62% 52%), hsl(${Z} 70% 62%))`}function Ee(y){Ie=y,f.classList.toggle("on",y!=="hidden"),f.classList.toggle("mode-verse",y==="verse"),f.classList.toggle("mode-result",y==="result"),f.classList.toggle("mode-choice",y==="choice"),y!=="hidden"&&(f.classList.remove("swap"),f.offsetWidth,f.classList.add("swap"))}function st(){p.textContent=`寻星令 · 其${$p[N]??N+1} / ${I.length}`;const y=I[N];_.textContent=y?Np[y.type]:""}function Tn(){const y=I[N];y&&(st(),w.textContent=y.hint,Ee("ask"))}function fr(){var E;const y=I[N];if(!(!y||y.type!=="choice")){st(),w.textContent=y.hint,v.innerHTML="";for(const Z of je){const We=(E=y.options)==null?void 0:E[Z];if(We===void 0)continue;const at=document.createElement("button");at.type="button",at.className="ch2-opt",at.textContent=We,Je.has(Z)?(at.classList.add("wrong"),at.disabled=!0):at.addEventListener("click",()=>jf(Z,at)),v.appendChild(at)}Ee("choice")}}function ot(){const y=I[N];if(!y)return;const E=ee==null?void 0:ee[y.target];k.textContent=(E==null?void 0:E.text)??"……",x.textContent=E?`《步天歌》 · ${E.from}`:"《步天歌》",C.textContent=y.plain}function Xe(){ot(),Ee("verse")}function dn(y){const E=Math.round(y/1e3),Z=Math.floor(E/60);return Z>0?`${Z}分${E%60}秒`:`${E}秒`}function Nr(){const y=Ju(ye);A.textContent=y,T.textContent=String(ye);const E=de?Math.max(0,ze-ue):0;L.textContent=`用时 ${dn(E)} · 答对 ${Ve} / ${I.length}`,R.textContent=`甲 ≥ ${Ga} · 乙 ≥ ${Ha} · 丙 未及乙等`,P.textContent=Fp[y];let Z=0;try{Z=Number(window.localStorage.getItem(Ul)??0)||0}catch{}const We=ye>Z;if(!ut&&(ut=!0,We))try{window.localStorage.setItem(Ul,String(ye))}catch{}const at=Math.max(Z,ye);J.innerHTML=We?`刷新纪录 <b>${at}</b><span class="ch2-best-badge">史上最佳</span>`:`史上最佳 <b>${at}</b>`}function os(){if(ht)return ht;const y=document.createElement("canvas");y.width=y.height=128;const E=y.getContext("2d");return E.strokeStyle="rgba(240, 205, 110, 0.95)",E.lineWidth=6,E.shadowColor="rgba(201, 162, 39, 0.9)",E.shadowBlur=14,E.beginPath(),E.arc(64,64,48,0,Math.PI*2),E.stroke(),ht=new Gc(y),ht}function In(y){const E=jl[y];if(!E||Ae&&Lt===y)return;_t();const Z=new Fc({map:os(),transparent:!0,depthTest:!1,depthWrite:!1,opacity:.9}),We=new Bc(Z),[at,dr,Vn]=kn(E.ra,E.dec,Wl);We.position.set(at,dr,Vn),We.scale.set(E.ring,E.ring,1),We.renderOrder=998,i.sky.addSkyObject(We),Ae=We,Lt=y,fn=E.ring}function _t(){Ae&&(i.sky.removeSkyObject(Ae),Ae.material.dispose(),Ae=null,Lt="")}function Qt(){const y=I[N],E=D===wn&&j==="asking"&&!!y&&y.type!=="choice";xt(E&&q>=1),E&&q>=2&&y?In(y.target):hn||_t()}function hr(){mt!==null&&(clearTimeout(mt),mt=null)}function St(){ft!==null&&(clearTimeout(ft),ft=null)}function go(){At!==null&&(clearTimeout(At),At=null)}function Za(){Pt!==null&&(clearTimeout(Pt),Pt=null)}function Ja(){j==="asking"&&Le>0&&(De=Math.max(0,Le-performance.now()),Le=0)}function el(y,E){me==null||me.kill();const Z={v:0};me=On.to(Z,{v:1,duration:E,ease:"power1.out",onUpdate:()=>i.sky.setGroupProgress(y,Z.v)})}const as={v:ps};function mo(y,E){vt==null||vt.kill(),vt=On.to(as,{v:y,duration:E,ease:"power2.out",onUpdate:()=>i.sky.setBloom({strength:as.v}),onComplete:()=>{vt=null}})}function $f(){Se||(vt==null||vt.kill(),as.v=Pp,i.sky.setBloom({strength:as.v}),mo(ps,.8))}function Nf(y){if(In(y),!Ae)return;it==null||it.kill(),hn=!0;const E={s:fn,o:.95};Ae.material.opacity=.95,it=On.to(E,{s:fn*2.4,o:0,duration:.75,ease:"power2.out",onUpdate:()=>{Ae&&(Ae.scale.set(E.s,E.s,1),Ae.material.opacity=E.o)},onComplete:()=>{it=null,hn=!1,_t()}})}function Ff(y){const E=document.createElement("span");E.className="ch2-float",E.textContent=y,V.appendChild(E),Vt.add(E),E.addEventListener("animationend",()=>{Vt.delete(E),E.remove()})}function tl(){Vt.forEach(y=>y.remove()),Vt.clear()}function Bf(){Se=!0,Za(),Pt=setTimeout(()=>{Pt=null,hi()},Rp),mo(Ap,.6),ke(M,"on"),ke(B,"on"),et()}function hi(){!Se&&Pt===null||(Se=!1,Za(),M.classList.remove("on"),mo(ps,.9),et())}function _o(){const y=I[N];Te=0,q=0,S=!1,Je.clear(),je=(y==null?void 0:y.type)==="choice"?na((y.options??[]).map((E,Z)=>Z),Math.random):[],Ye=Ku(N)*1e3,De=Ye,Le=0}function nl(){if(D!==wn||j!=="asking")return;const y=I[N];y&&(i.sky.setGroupProgress(y.target,0),Le=performance.now()+De,te="",tt(De/Ye),y.type==="flash"&&!S&&Gf(y))}function Gf(y){i.sky.setGroupProgress(y.target,1),hr(),mt=setTimeout(()=>{mt=null,S=!0,_e==null||_e.kill();const E={v:1};_e=On.to(E,{v:0,duration:.5,ease:"power1.in",onUpdate:()=>i.sky.setGroupProgress(y.target,E.v),onComplete:()=>{_e=null}})},Op)}function Un(){hr(),_e==null||_e.kill(),_e=null}function Hf(){const y=I[N];if(!y){Fr();return}j="asking",_o(),y.type==="choice"?fr():Tn(),Qt(),nl(),et()}function rl(){const y=I[N];if(!y||j!=="asking")return;j="revealed",Y[N]=!0,Le=0,De=0,Un(),qe+=1,Ve+=1;const E=Zu(qe,Se);ye+=E,Te=0,q=0,Qt(),el(y.target,1.1),$f(),Nf(y.target),Ff(`+${E}`),qp(),qe>0&&qe%5===0&&Bf(),et(),Xe(),St(),ft=setTimeout(()=>{ft=null,bo()},Lp)}function il(y){j==="asking"&&(ge=Math.max(0,ge-1),qe=0,y==="pick"&&(Te+=1,q=Qu(Te,De/1e3),Qt()),ke(K,"on"),Kl(),et(),ge<=0&&Fr())}function qf(){if(D!==wn||j!=="asking")return;const y=I[N];if(Le=0,De=0,Un(),y&&i.sky.setGroupProgress(y.target,0),ge=Math.max(0,ge-1),qe=0,ke(K,"on"),Kl(),et(),ge<=0){Fr();return}bo()}function bo(){if(St(),N+=1,N>=I.length){Fr();return}Hf()}function sl(){if(j!=="revealed")return;St();const y=I[N];y&&i.sky.setGroupProgress(y.target,1),me==null||me.kill(),me=null,N+=1,Te=0,q=0,N>=I.length?(j="asking",Fr()):(j="asking",_o())}function Yf(){if(D!==wn||j!=="asking")return;const y=I[N];y&&(Y[N]=!0,Le=0,Un(),q=0,el(y.target,.6),bo())}function Fr(){j!=="over"&&(j="over",Le=0,De=0,St(),Un(),me==null||me.kill(),me=null,hi(),Te=0,q=0,Qt(),ze=performance.now(),Nr(),Ee("result"),et(),D===Pi&&ol())}function Xf(){St(),Un(),I.forEach((y,E)=>{Y[E]||(i.sky.setGroupProgress(y.target,1),Y[E]=!0)}),N=I.length,Fr()}function ol(){go(),At=setTimeout(()=>{At=null,j==="over"&&D===Pi&&Ee("hidden")},Dp)}function al(){St(),go(),Un(),hi(),me==null||me.kill(),me=null,tl(),K.classList.remove("on"),I=na(hs,Math.random),N=0,Y=I.map(()=>!1),ge=ta,ye=0,qe=0,Ve=0,j="asking",de=!1,ue=0,ze=0,ut=!1,_o(),q=0,_t(),xt(!1),et()}function ll(y){const E=i.root,Z=E.getBoundingClientRect().top+window.scrollY,We=Math.max(0,E.offsetHeight-window.innerHeight);window.scrollTo({top:Z+We*y,behavior:"smooth"})}function Wf(){j==="over"&&(al(),D===wn?cl():ll(.5))}function Uf(){if(D===Pi){Ee("hidden");return}ll(.995)}function cl(){if(de||(de=!0,ue=performance.now()),Fe(1),j!=="over"){const y=I[N];y&&i.sky.setGroupProgress(y.target,0)}if(j==="over")Nr(),Ee("result");else if(j==="revealed")Xe();else{const y=I[N];(y==null?void 0:y.type)==="choice"?fr():Tn()}Qt(),nl(),et()}function Vf(y){if(D!==wn||j!=="asking"||!y)return;const E=I[N];!E||E.type==="choice"||(y.info.name===E.target?rl():il("pick"))}function jf(y,E){if(D!==wn||j!=="asking")return;const Z=I[N];!Z||Z.type!=="choice"||Je.has(y)||(y===Z.answer?rl():(Je.add(y),E.classList.add("wrong"),E.disabled=!0,il("option")))}m.addEventListener("click",Yf),F.addEventListener("click",Wf),$.addEventListener("click",Uf);const yo=new Oe;function Qf(){const y=I[N],E=y?jl[y.target]:void 0;if(!E){xt(!1);return}const[Z,We,at]=kn(E.ra,E.dec,Wl),dr=i.sky.camera,Vn=dr.matrixWorldInverse.elements,vo=Vn[2]*Z+Vn[6]*We+Vn[10]*at+Vn[14];yo.set(Z,We,at).project(dr);let di=yo.x,pi=yo.y;const hl=vo>0;if(hl&&(di=-di,pi=-pi),!hl&&Math.abs(di)<=.92&&Math.abs(pi)<=.92){X.style.opacity="0";return}X.style.opacity="";const Jf=Math.atan2(-pi,di)*180/Math.PI,ls=48,eh=Math.min(Math.max((di+1)/2*window.innerWidth,ls),window.innerWidth-ls),th=Math.min(Math.max((1-pi)/2*window.innerHeight,ls),window.innerHeight-ls);X.style.left=`${eh}px`,X.style.top=`${th}px`,X.style.transform=`rotate(${Jf}deg)`}function ul(y){if(Ut=requestAnimationFrame(ul),Le>0&&D===wn&&j==="asking"){const E=Le-y;if(E<=0)qf();else{De=E,tt(E/Ye);const Z=I[N];Z&&Z.type!=="choice"&&q<2&&E<=Ba*1e3&&(q=2,Qt())}}if(Ot&&Qf(),Ae&&!hn){const E=fn*(1+.13*Math.sin(y*.0024));Ae.scale.set(E,E,1),Ae.material.opacity=.7+.3*Math.sin(y*.0024+1)}}function Kf(y,E){E===wn&&(Ja(),Un(),hi(),j!=="revealed"&&(me==null||me.kill(),me=null),sl()),y===Is?(i.sky.setPickingEnabled(!1),i.sky.setLabelsEnabled(!0),i.sky.setHoverTipEnabled(!0),Fe(0),W=!1,Ee("hidden"),Qe(!1),Ce(!1),ve(!1),Qt()):y===wn?(i.sky.setPickingEnabled(!0),i.sky.setLabelsEnabled(!1),i.sky.setHoverTipEnabled(!1),se(!1),pe(-1),Re(!1),Qe(!1),Ce(!1),ve(!0),cl()):(i.sky.setPickingEnabled(!0),i.sky.setLabelsEnabled(!0),i.sky.setHoverTipEnabled(!0),se(!1),pe(-1),Re(!1),ve(!1),j!=="over"?Xf():ol(),Qe(!0),Ce(!0))}function Zf(y){const E=ra(y);(E.finale>0||W)&&(Fe(E.finale),W=E.finale>0),E.lines.forEach((We,at)=>{const dr=Vl[at];if(!dr)return;const Vn=Math.max(E.finale,at===E.active?We:We*.15);for(const vo of dr.groups)i.sky.setGroupProgress(vo,Vn)}),se(y<xr);const Z=y>=xr&&y<ti?E.active:-1;pe(Z),Z>=0?In(zp[Z]??""):_t(),Re(y>=ti)}function fl(y){U=y;const E=ju(y);if(E!==D){const Z=D;D=E,Kf(E,Z)}D===Is?Zf(y):D===Pi&&Fe(1)}return al(),{enter(){i.root.classList.add("inview"),Rt==null||Rt(),Rt=i.sky.onPick(Vf),Ut&&cancelAnimationFrame(Ut),Ut=requestAnimationFrame(ul),fl(U)},update(y){fl(y)},frame(y){const E=D===Is&&U>=xr&&U<ti?ra(U).active:-1,Z=E>=0?.85:0;if(jt+=(Z-jt)*(1-Math.exp(-3*y)),jt<.01){ie&&(ie=!1,i.sky.setGazeBlend(0));return}const We=Ip[Math.max(E,0)];ie?xn.slerp(We,1-Math.exp(-2.5*y)):(ie=!0,xn.copy(We)),i.sky.setGazeBlend(jt,xn)},exit(){i.root.classList.remove("inview"),cancelAnimationFrame(Ut),Ut=0,Rt==null||Rt(),Rt=null,Ja(),Un(),St(),go(),sl(),me==null||me.kill(),me=null,hi(),vt&&(vt.kill(),vt=null,i.sky.setBloom({strength:ps})),it==null||it.kill(),it=null,hn=!1,_t(),ht==null||ht.dispose(),ht=null,xt(!1),tl(),K.classList.remove("on"),B.classList.remove("on"),M.classList.remove("on"),jt=0,ie=!1,i.sky.setGazeBlend(0),i.sky.setLabelsEnabled(!0),i.sky.setHoverTipEnabled(!0),i.sky.setPickingEnabled(!1),se(!1),pe(-1),Re(!1),Ee("hidden"),Qe(!1),Ce(!1),ve(!1),D=-1,tn==null||tn.suspend()}}}const Xp=Object.freeze(Object.defineProperty({__proto__:null,CH2_GRADE_JIA:Ga,CH2_GRADE_YI:Ha,CH2_MAX_HEARTS:ta,CH2_ROUND_SIZE:Uu,CH2_SEG1_END:Na,CH2_SEG1_LINE_COUNT:zs,CH2_SEG2_END:Wu,CH2_TIME_LIMIT_EARLY_S:Fa,CH2_TIME_LIMIT_LATE_S:Vu,CH2_URGENT_HINT_SECONDS:Ba,ch2ComboMultiplier:eo,ch2Grade:Ju,ch2HintLevel:Qu,ch2ScoreFor:Zu,ch2Seg1LineStates:ra,ch2SegmentOf:ju,ch2Shuffle:na,ch2TimeLimit:Ku,createChapter:Yp},Symbol.toStringTag,{value:"Module"})),tf=Math.PI/180,Wp=34.7,nf=8,Qr=355,ia=["冬至","小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪"];function Up(i){return-23.44*Math.cos(2*Math.PI*(i+10)/365.25)}function sa(i){return 90-Math.abs(Wp-Up(i))}function Zl(i){return nf/Math.tan(sa(i)*tf)}function Vp(i){let e=0,n=999,t=0;for(let r=0;r<ia.length;r++){const s=(Qr+r*15.22)%365;let o=i-s;o>182.5?o-=365:o<-182.5&&(o+=365),Math.abs(o)<n&&(n=Math.abs(o),e=r,t=o)}return{name:ia[e],index:e,day:(Qr+e*15.22)%365,offset:Math.round(t)}}function jp(i){const e=[31,28,31,30,31,30,31,31,30,31,30,31];let n=Math.min(Math.max(Math.round(i),1),365),t=0;for(;t<11&&n>e[t];)n-=e[t],t++;return{month:t+1,day:n}}const gs=["零","一","二","三","四","五","六","七","八","九"];function Ao(i){if(i<10)return gs[i];if(i<20)return"十"+(i%10?gs[i%10]:"");const e=Math.floor(i/10);return gs[e]+"十"+(i%10?gs[i%10]:"")}function Gr(i){return i-Math.floor(i)}function Qp(i,e,n,t,r,s){i.beginPath(),i.moveTo(e+s,n),i.arcTo(e+t,n,e+t,n+r,s),i.arcTo(e+t,n+r,e,n+r,s),i.arcTo(e,n+r,e,n,s),i.arcTo(e,n,e+t,n,s),i.closePath()}function Kp(){const i=document.createElement("canvas");i.width=64,i.height=64;const e=i.getContext("2d");if(e){const n=e.createRadialGradient(32,32,2,32,32,32);n.addColorStop(0,"rgba(252, 225, 182, 0.9)"),n.addColorStop(.3,"rgba(252, 225, 182, 0.25)"),n.addColorStop(1,"rgba(252, 225, 182, 0)"),e.fillStyle=n,e.fillRect(0,0,64,64)}return i}const Hr=8,mr=15,Zp=`
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
`;let Jl=!1;function Jp(){if(Jl||typeof document>"u")return;const i=document.createElement("style");i.dataset.gnomonWidget="",i.textContent=Zp,document.head.appendChild(i),Jl=!0}function e0(i={}){Jp();const e=document.createElement("div");e.className="gw",e.setAttribute("role","group"),e.setAttribute("aria-label","圭表测影：拖动滑杆查看一年中正午日影变化");const n=document.createElement("canvas");n.className="gw-canvas",e.appendChild(n);const t=document.createElement("div");t.className="gw-readout",t.innerHTML=`
    <div class="gw-cell"><span class="gw-k">日期</span><span class="gw-v" data-r="date">——</span></div>
    <div class="gw-cell"><span class="gw-k">节气</span><span class="gw-v" data-r="term">——</span></div>
    <div class="gw-cell"><span class="gw-k">正午影长</span><span class="gw-v" data-r="shadow">——</span></div>
    <div class="gw-cell"><span class="gw-k">太阳高度</span><span class="gw-v" data-r="alt">——</span></div>`,e.appendChild(t);const r=t.querySelector('[data-r="date"]'),s=t.querySelector('[data-r="term"]'),o=t.querySelector('[data-r="shadow"]'),a=t.querySelector('[data-r="alt"]'),l=document.createElement("div");l.className="gw-slider-wrap";const c=document.createElement("input");c.className="gw-slider",c.type="range",c.min="1",c.max="365",c.step="1",c.value=String(Qr),c.setAttribute("aria-label","一年中的第几天"),l.appendChild(c);const u=document.createElement("div");u.className="gw-marks";for(const m of["冬至","春分","夏至","秋分"]){const F=ia.indexOf(m),$=(Qr+F*15.22)%365,V=($-1)/364,K=`calc(7px + (100% - 14px) * ${V.toFixed(4)})`,B=document.createElement("i");B.className="gw-tick",B.style.left=K,u.appendChild(B);const M=document.createElement("button");M.type="button",M.className="gw-mark"+(V<.08?" gw-mark--start":V>.92?" gw-mark--end":""),M.style.left=K,M.textContent=m,M.title=`跳至${m}（第 ${Math.round($)} 天）`,M.addEventListener("click",()=>A(Math.round($))),u.appendChild(M)}l.appendChild(u),e.appendChild(l);const h=n.getContext("2d");if(!h){const m=document.createElement("p");m.className="gw-fallback",m.textContent="当前浏览器无法创建绘图上下文，圭表测影演示不可用。",n.replaceWith(m)}const d=Kp(),f=Array.from({length:14},(m,F)=>({rx:Gr(Math.sin(F*12.9898)*43758.5453),ry:Gr(Math.sin(F*78.233)*12543.217),len:.1+.25*Gr(Math.sin(F*3.7)*9876.543),dark:F%2===0})),g=Array.from({length:5},(m,F)=>({dx:-.3+.6*Gr(Math.sin(F*5.13)*3210.7),ry:.12+.76*Gr(Math.sin(F*9.31)*7777.7),h:.08+.12*Gr(Math.sin(F*2.17)*5555.5)}));let p=Qr,_=Qr,w=!1,v=!0,k=0,x=0,C=0;function A(m){_=Math.min(Math.max(m,1),365),T()}function T(){k||(k=requestAnimationFrame(L))}function L(){var V;k=0;const m=p,F=_-p;p=Math.abs(F)<.04?_:p+F*.2;const $=p!==m;($||v)&&(R(),P(),v=!1),$&&((V=i.onDayChange)==null||V.call(i,p)),p!==_&&(k=requestAnimationFrame(L))}function R(){const m=Math.min(Math.max(Math.round(p),1),365),F=jp(m);r.textContent=`${F.month} 月 ${F.day} 日 · 第 ${m} 天`;const $=Vp(m);s.textContent=$.offset===0?`正值【${$.name}】`:$.offset>0?`【${$.name}】后 ${$.offset} 天`:`距【${$.name}】 ${-$.offset} 天`;const V=Zl(p);let K=Math.floor(V),B=Math.round((V-K)*10);B===10&&(K+=1,B=0),o.textContent=`${Ao(K)}尺${B>0?Ao(B)+"寸":"整"} · ${V.toFixed(2)} 尺`,a.textContent=`${sa(p).toFixed(1)}°`,!w&&document.activeElement!==c&&(c.value=String(m))}function P(){if(!h||x<60||C<60)return;const m=h,F=x,$=C;m.clearRect(0,0,F,$);const V=m.createLinearGradient(0,0,0,$);V.addColorStop(0,"rgba(22, 38, 56, 0.5)"),V.addColorStop(.6,"rgba(13, 13, 17, 0.12)"),V.addColorStop(1,"rgba(13, 13, 17, 0.4)"),m.fillStyle=V,m.fillRect(0,0,F,$);const K=Zl(p),B=sa(p),M=Math.min(Math.max(B,6),82)*tf,O=$-62,b=Math.min((F-150)/14.2,(O-92)/8),X=nf*b,ee=13.6*b,D=(F-ee-110)/2+100,U=O-X,I=D+K*b,N=D-12,Y=D+ee,ge=m.createRadialGradient(D-60,O,0,D-60,O,220);ge.addColorStop(0,`rgba(252, 225, 182, ${(.05+.04*Math.sin(M)).toFixed(3)})`),ge.addColorStop(1,"rgba(252, 225, 182, 0)"),m.fillStyle=ge,m.fillRect(0,O-160,F,200),m.strokeStyle="rgba(175, 145, 95, 0.35)",m.lineWidth=1,m.beginPath(),m.moveTo(14,O+mr),m.lineTo(F-14,O+mr),m.stroke();const ye=m.createLinearGradient(0,O,0,O+Hr);ye.addColorStop(0,"#3b4552"),ye.addColorStop(1,"#252d38"),m.fillStyle=ye,Qp(m,N,O,Y-N,Hr,2.5),m.fill();const qe=m.createLinearGradient(0,O+Hr,0,O+mr);qe.addColorStop(0,"#1a212b"),qe.addColorStop(1,"#10151d"),m.fillStyle=qe,m.fillRect(N,O+Hr,Y-N,mr-Hr),m.strokeStyle="rgba(252, 225, 182, 0.14)",m.beginPath(),m.moveTo(N+2,O+.5),m.lineTo(Y-2,O+.5),m.stroke();for(const ue of f){const ze=N+6+ue.rx*(Y-N-12),ut=O+1.5+ue.ry*(mr-3);m.strokeStyle=ue.dark?"rgba(0, 0, 0, 0.16)":"rgba(252, 225, 182, 0.05)",m.beginPath(),m.moveTo(ze,ut),m.lineTo(ze+ue.len*40,ut),m.stroke()}const Ve=b>=26;m.lineWidth=1;for(let ue=0;ue<=136;ue++){const ze=ue%10===0;if(!ze&&!Ve&&ue%5!==0)continue;const ut=D+ue*b/10;if(ut>Y-1.5)break;const Se=ze?6:ue%5===0?4:2.5;m.strokeStyle=ze?"rgba(8, 10, 14, 0.9)":"rgba(8, 10, 14, 0.6)",m.beginPath(),m.moveTo(ut,O+1),m.lineTo(ut,O+1+Se),m.stroke()}m.font='9px "STSong", "SimSun", "Songti SC", serif',m.fillStyle="rgba(175, 145, 95, 0.9)",m.textAlign="center",m.textBaseline="top";for(let ue=0;ue<=13;ue++){const ze=D+ue*b;if(ze>Y-2)break;m.fillText(Ao(ue),ze,O+mr+4)}const Te=m.createLinearGradient(D,0,I,0);Te.addColorStop(0,"rgba(3, 5, 9, 0.78)"),Te.addColorStop(.75,"rgba(3, 5, 9, 0.55)"),Te.addColorStop(1,"rgba(3, 5, 9, 0.15)"),m.fillStyle=Te,m.fillRect(D,O+1,Math.max(I-D,1.5),Hr-1),m.strokeStyle="#c9a227",m.lineWidth=1.5,m.beginPath(),m.moveTo(I,O-4),m.lineTo(I,O+mr),m.stroke(),m.save(),m.translate(I,O-7),m.rotate(Math.PI/4),m.fillStyle="#c9a227",m.fillRect(-2.4,-2.4,4.8,4.8),m.restore();const q=Math.max(6,b*.38),j=m.createLinearGradient(D-q/2,0,D+q/2,0);j.addColorStop(0,"#3f2e1a"),j.addColorStop(.35,"#a87f3d"),j.addColorStop(.5,"#dcba68"),j.addColorStop(.65,"#a87f3d"),j.addColorStop(1,"#372812"),m.fillStyle=j,m.fillRect(D-q/2,U,q,X);for(const ue of g)m.fillStyle="rgba(112, 148, 126, 0.14)",m.fillRect(D+ue.dx*q-.75,U+ue.ry*X,1.5,ue.h*X);m.fillStyle="#8a6a35",m.beginPath(),m.moveTo(D-q*.85,U),m.lineTo(D-q*.42,U-6),m.lineTo(D+q*.42,U-6),m.lineTo(D+q*.85,U),m.closePath(),m.fill(),m.strokeStyle="rgba(252, 225, 182, 0.35)",m.lineWidth=1,m.beginPath(),m.moveTo(D-q*.42,U-6),m.lineTo(D+q*.42,U-6),m.stroke();const je=m.createLinearGradient(0,O-11,0,O);je.addColorStop(0,"#5a4423"),je.addColorStop(1,"#2c2010"),m.fillStyle=je,m.beginPath(),m.moveTo(D-q*.8,O-11),m.lineTo(D+q*.8,O-11),m.lineTo(D+q*1.7,O),m.lineTo(D-q*1.7,O),m.closePath(),m.fill(),m.font='10px "STSong", "SimSun", "Songti SC", serif',m.fillStyle="rgba(201, 162, 39, 0.8)",m.textAlign="center",m.textBaseline="top";const Je=D-q/2-11;"表高八尺".split("").forEach((ue,ze)=>{m.fillText(ue,Je,U+18+ze*13)});const S=-Math.cos(M),Ye=-Math.sin(M);let De=Math.min(170,(U-28)/Math.sin(M),(D-30)/Math.cos(M));De=Math.max(De,26);const Le=D+S*De,de=U+Ye*De;m.drawImage(d,Le-30,de-30,60,60),m.fillStyle="#fce1b6",m.beginPath(),m.arc(Le,de,8.5,0,Math.PI*2),m.fill(),m.strokeStyle="rgba(201, 162, 39, 0.75)",m.lineWidth=1,m.beginPath(),m.arc(Le,de,11.5,0,Math.PI*2),m.stroke(),m.strokeStyle="rgba(252, 225, 182, 0.4)",m.beginPath(),m.moveTo(Le-S*12,de-Ye*12),m.lineTo(D,U),m.stroke(),m.setLineDash([3,4]),m.strokeStyle="rgba(252, 225, 182, 0.22)",m.beginPath(),m.moveTo(D,U),m.lineTo(I,O),m.stroke(),m.setLineDash([])}c.addEventListener("input",()=>{const m=Number(c.value);_=m,w||(p=m),T()}),c.addEventListener("pointerdown",()=>{w=!0}),window.addEventListener("pointerup",()=>{w=!1}),window.addEventListener("pointercancel",()=>{w=!1});function J(){const m=n.clientWidth,F=n.clientHeight;if(!(m===x&&F===C)){if(x=m,C=F,h&&m>0&&F>0){const $=Math.min(window.devicePixelRatio||1,2);n.width=Math.round(m*$),n.height=Math.round(F*$),h.setTransform($,0,0,$,0,0)}v=!0,T()}}return typeof ResizeObserver<"u"?new ResizeObserver(J).observe(n):window.addEventListener("resize",J),J(),{el:e,get day(){return p},setDayTarget:A}}const t0=`
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
`;let ec=!1;function n0(){if(ec||typeof document>"u")return;const i=document.createElement("style");i.dataset.gnomonLayout="",i.textContent=t0,document.head.appendChild(i),ec=!0}function _i(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function tc(i){return i/365*Math.PI*2}function r0(i){const e=i.root.querySelector(".pin"),{copy:n}=i,t=document.createElement("div");t.className="gnomon-layout";const r=document.createElement("div");r.className="chapter-panel",r.innerHTML=`
    <p class="eyebrow">${_i(n.eyebrow)}</p>
    <div class="chapter-head">
      <h2>${_i(n.title)}</h2>
      ${n.seal?`<div class="seal">${_i(n.seal)}</div>`:""}
    </div>
    <p class="hook">${_i(n.hook)}</p>
    ${n.body.map(a=>`<p>${_i(a)}</p>`).join("")}
  `,t.appendChild(r);let s=!1;const o=e0({onDayChange:a=>{s&&i.sky.setSkyRotation(tc(a),0)}});return t.appendChild(o.el),e.appendChild(t),n0(),{enter(){s=!0,i.root.classList.add("inview"),i.sky.setLabelsEnabled(!1),i.sky.setSkyRotation(tc(o.day),0)},update(a){const l=Math.min(Math.max(a,0),1);o.setDayTarget(1+l*364)},exit(){s=!1,i.root.classList.remove("inview"),i.sky.setLabelsEnabled(!0),i.sky.setSkyRotation(0,0)}}}const i0=Object.freeze(Object.defineProperty({__proto__:null,createChapter:r0},Symbol.toStringTag,{value:"Module"}));function ho(i){return Math.min(Math.max(i,0),1)}function oa(i){const e=ho(i);return e*e*(3-2*e)}const Lr=.12,Mr=.92,Pr=5,ns=(Mr-Lr)/Pr,qa=Lr+4*ns,rf=.03,sf=.45;function $s(i){const e=ho(i);return e<Lr?0:e>=Mr?6:1+Math.min(Math.floor((e-Lr)/ns),Pr-1)}function of(i){return ho(i/Lr)}function af(i,e){const n=Lr+e*ns;return ho((i-n)/(ns*sf))}function aa(i){const e=oa((i-(qa-.02))/.02),n=1-oa((i-Mr)/.05);return e*n}function lf(i,e){const n=new Set;let t=0;return e.map(r=>{if(r){const o=i.find(a=>!n.has(a.hip)&&a.name===r);if(o)return n.add(o.hip),o}for(;t<i.length&&n.has(i[t].hip);)t++;const s=i[t];return s?(n.add(s.hip),t++,s):null})}const cf=[{ra:175,dec:81,radius:.35,fov:50,gazeW:.85},{ra:218.6,dec:76.8,radius:.55,fov:42,gazeW:.85},{ra:269.6,dec:86.5,radius:.55,fov:42,gazeW:.85},{ra:41.8,dec:81,radius:.55,fov:42,gazeW:.85},{ra:261.7,dec:75.5,radius:.55,fov:42,gazeW:.85},{ra:0,dec:89,radius:.55,fov:55,gazeW:.85}],to={radius:3,dir:[.52,.7,.49],fov:50},nc=100,s0=["紫微左垣","紫微右垣"],o0=["第一站","第二站","第三站","第四站","第五站"],a0="序 · 天上有座城",l0=28,rc=44,ms=60,uf=cf.map(i=>({dir:new Oe(...kn(i.ra,i.dec,1)),radius:i.radius,fov:i.fov,gazeQ:Qn(i.ra,i.dec),gazeW:i.gazeW})),c0=new Oe(...to.dir).normalize(),bi=uf[Pr],u0=`
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
  width: ${l0}px; height: 1px;
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
`;let ic=!1;function f0(){if(ic||typeof document>"u")return;const i=document.createElement("style");i.dataset.ch4="",i.textContent=u0,document.head.appendChild(i),ic=!0}function yi(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function h0(i){f0();const e=i.root.querySelector(".pin"),{copy:n}=i,t=document.createElement("div");t.className="ch4-card ch4-opening",t.innerHTML=`
    <p class="eyebrow">${yi(n.eyebrow)}</p>
    <div class="chapter-head">
      <h2>${yi(n.title)}</h2>
      ${n.seal?`<div class="seal">${yi(n.seal)}</div>`:""}
    </div>
    <p class="ch4-opening-tag">${a0}</p>
    <p class="hook">${yi(n.hook)}</p>
    ${n.body.map(M=>`<p class="ch4-opening-body">${yi(M)}</p>`).join("")}
  `,e.appendChild(t);const r=document.createElement("div");r.className="ch4-card ch4-stop",r.innerHTML=`
    <p class="ch4-stop-tag"></p>
    <h3 class="ch4-stop-title"></h3>
    <p class="ch4-stop-story"></p>
  `,e.appendChild(r);const s=r.querySelector(".ch4-stop-tag"),o=r.querySelector(".ch4-stop-title"),a=r.querySelector(".ch4-stop-story"),l=document.createElement("div");l.className="ch4-layer";const c=[];ds.forEach((M,O)=>{(M.labels??[]).forEach((b,X)=>{const ee=document.createElement("div");ee.className="ch4-tag";const D=document.createElement("i");D.className="ch4-tag-dot";const U=-90+X*137.5,I=U*Math.PI/180,N=document.createElement("i");N.className="ch4-tag-line",N.style.transform=`rotate(${U}deg)`;const Y=document.createElement("span");Y.className="ch4-tag-name",Y.textContent=b.text,Y.style.transform=`translate(${Math.cos(I)*rc}px, ${Math.sin(I)*rc}px) translate(-50%, -50%)`,ee.append(D,N,Y),l.appendChild(ee),c.push({el:ee,stopIdx:O,labelIdx:X,shown:!1})})}),e.appendChild(l);let u=null;Promise.all([fetch(nr("data/stars.json")).then(M=>M.ok?M.json():null),fetch(nr("data/asterisms.json")).then(M=>M.ok?M.json():null)]).then(([M,O])=>{if(!M||!O)return;const b=new Map(M.stars.map(ee=>[ee.hip,ee])),X=new Map(O.asterisms.map(ee=>[ee.name,ee]));u=ds.map(ee=>{const D=ee.groups.flatMap(I=>{var N;return(((N=X.get(I))==null?void 0:N.stars)??[]).map(Y=>b.get(Y)).filter(Y=>Y!==void 0)});return lf(D,(ee.labels??[]).map(I=>I.star)).map(I=>{if(!I)return null;const[N,Y,ge]=kn(I.ra,I.dec,nc);return new Oe(N,Y,ge)})})}).catch(()=>{});let h=!1,d=0,f=!1,g=.35,p=50;const _=new Oe(0,1,0),w=new gn;let v=0,k=0,x=0,C=!1,A=-1;function T(M){C!==M&&(C=M,t.classList.toggle("on",M))}function L(M){if(A===M)return;if(A=M,M<0){r.classList.remove("on");return}const O=ds[M];O&&(s.textContent=o0[M]??`第${M+1}站`,o.textContent=O.title,a.textContent=O.story,r.classList.add("on"),r.classList.remove("swap"),r.offsetWidth,r.classList.add("swap"))}function R(M,O){M.shown!==O&&(M.shown=O,M.el.classList.toggle("on",O))}function P(){for(const M of c)R(M,!1)}function J(M){d=M;const O=$s(M),b=of(M);for(const X of s0)i.sky.setGroupProgress(X,b);ds.forEach((X,ee)=>{const D=af(M,ee);for(const U of X.groups)i.sky.setGroupProgress(U,D)}),T(O===0),L(O>=1&&O<=Pr?O-1:O===6?Pr-1:-1)}const m=new Oe,F=new Oe;function $(M,O,b){const X=Math.cos(O),ee=Math.sin(O);return b.set(M.x*X+M.z*ee,M.y,-M.x*ee+M.z*X)}function V(M){const O=d,b=$s(O);let X,ee,D;const U=F;let I;if(b===6){const Y=oa((O-Mr)/(1-Mr));X=$e.lerp(bi.radius,to.radius,Y),ee=$e.lerp(bi.fov,to.fov,Y),D=(1-Y)*bi.gazeW,U.copy(bi.dir).lerp(c0,Y).normalize(),I=bi.gazeQ}else{const Y=uf[b];X=Y.radius,ee=Y.fov,D=Y.gazeW,U.copy(Y.dir),I=Y.gazeQ}if(!f){f=!0;const Y=i.sky.camera;g=Math.max(Y.position.length()/nc,.005),p=Y.fov,_.copy(Y.position).normalize(),_.lengthSq()<1e-8&&_.set(0,1,0),w.copy(Y.quaternion),v=1}const N=1-Math.exp(-3*M);g+=(X-g)*N,p+=(ee-p)*N,_.lerp(U,N).normalize(),v+=(D-v)*N,w.slerp(I,1-Math.exp(-2.5*M)),i.sky.setRadius(g),i.sky.setPositionDir(_),i.sky.setFov(p),v<.005&&D===0?i.sky.setGazeBlend(0):i.sky.setGazeBlend(v,w)}function K(M){const O=d;O>=qa&&O<Mr?k+=rf*M:aa(O)===0&&(k=0);const b=k*aa(O);Math.abs(b-x)>1e-6&&(x=b,i.sky.setSkyRotation(b,0))}function B(){var ee;const M=$s(d),O=M>=1&&M<=Pr?M-1:-1,b=window.innerWidth,X=window.innerHeight;for(const D of c){const U=(ee=u==null?void 0:u[D.stopIdx])==null?void 0:ee[D.labelIdx];if(D.stopIdx!==O||!U){R(D,!1);continue}$(U,x,m);const I=ih([m.x,m.y,m.z],i.sky.camera,{width:b,height:X});if(!I||I.x<-ms||I.x>b+ms||I.y<-ms||I.y>X+ms){R(D,!1);continue}D.el.style.left=`${I.x}px`,D.el.style.top=`${I.y}px`,R(D,!0)}}return{enter(){i.root.classList.add("inview"),h=!0,f=!1,i.sky.setLabelsEnabled(!1),J(d)},update(M){J(M)},frame(M){h&&(V(M),K(M),B())},exit(){i.root.classList.remove("inview"),h=!1,f=!1,k=0,x=0,i.sky.setSkyRotation(0,0),i.sky.setGazeBlend(0),i.sky.setLabelsEnabled(!0),T(!1),L(-1),P()}}}const d0=Object.freeze(Object.defineProperty({__proto__:null,CH4_CAM_STOPS:cf,CH4_GROW_FRAC:sf,CH4_OPENING_END:Lr,CH4_RELEASE:to,CH4_ROT_SPEED:rf,CH4_ROT_START:qa,CH4_STOP_COUNT:Pr,CH4_STOP_SPAN:ns,CH4_TOUR_END:Mr,ch4MatchLabels:lf,ch4RotationWeight:aa,ch4SegmentOf:$s,ch4StopGrowth:af,ch4WallsGrowth:of,createChapter:h0},Symbol.toStringTag,{value:"Module"})),we=100,Ro={strength:.78,radius:.55,threshold:.58},sc=1.2*we,p0=5,oc=.2*Math.PI/180,ac=89*Math.PI/180,lc=.8*we,g0=1.2*we,m0=.4,_0=.05,b0=120,cc=.35,vi=new Oe(0,1,0),y0=new Oe(0,0,0);function v0(i){return i=$e.clamp(i,0,1),i*i*(3-2*i)}const lo=class lo{constructor(e){H(this,"canvas");H(this,"renderer");H(this,"scene");H(this,"camera");H(this,"pipeline");H(this,"quality");H(this,"card");H(this,"labelLayerEl");H(this,"hoverNdc",null);H(this,"hoverRing");H(this,"hoverTip");H(this,"sky",null);H(this,"labels",null);H(this,"labelsShown",!1);H(this,"skyRoot",new Fn);H(this,"tmpSkyMat",new Bo);H(this,"tmpSkyQ",new gn);H(this,"tmpSkyQY",new gn);H(this,"starPositions",null);H(this,"starList",[]);H(this,"nameByHip",new Map);H(this,"hipToAsterism",new Map);H(this,"poem",null);H(this,"pickListeners",new Set);H(this,"gazeYaw",-Math.PI/2);H(this,"gazePitch",80*Math.PI/180);H(this,"orbitQ",new gn);H(this,"ctlRadius",1);H(this,"ctlDir",new Oe(0,1,0));H(this,"ctlFov",78);H(this,"ctlGazeBlend",0);H(this,"ctlGazeTargetQ",null);H(this,"ctlDrift",0);H(this,"driftAngle",0);H(this,"ctlOrbit",0);H(this,"pickingEnabled",!1);H(this,"labelsEnabled",!0);H(this,"hoverTipEnabled",!0);H(this,"blendK",0);H(this,"dragging",!1);H(this,"lastX",0);H(this,"lastY",0);H(this,"downX",0);H(this,"downY",0);H(this,"orbitVelX",0);H(this,"orbitVelY",0);H(this,"lastOrbitMoveT",0);H(this,"clock",new sh);H(this,"elapsed",0);H(this,"frameHook",null);H(this,"started",!1);H(this,"gazeEuler",new Ci(0,0,0,"YXZ"));H(this,"gazeQ",new gn);H(this,"insideQ",new gn);H(this,"centerLookQ",new gn);H(this,"centerLookMat",new Bo);H(this,"driftQ",new gn);H(this,"tmpPos",new Oe);H(this,"resize",()=>{const e=this.tierDpr();this.renderer.setPixelRatio(e),this.renderer.setSize(window.innerWidth,window.innerHeight),this.pipeline.setSize(window.innerWidth,window.innerHeight),this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.sky&&(this.sky.starMaterial.uniforms.uPixelRatio.value=e),this.labels&&this.labels.renderer.setSize(window.innerWidth,window.innerHeight)});H(this,"frame",()=>{var r;const e=Math.min(this.clock.getDelta(),.1);this.quality.update(e),(r=this.frameHook)==null||r.call(this,e),this.updateCamera(e),this.updateHover();const n=this.camera.position.length(),t=this.sky;if(t&&(this.elapsed+=e,t.setTime(this.elapsed),t.starMaterial.uniforms.uDistBoost.value=mh(n,we),t.gridMaterial.opacity=.1+.16*$e.clamp(n/we-1,0,1),n>=we&&!this.card.el.hidden&&this.card.hide()),this.labels){const s=this.labelsEnabled?$e.clamp((sc-n)/(sc-we),0,1):0,o=s>.01;o!==this.labelsShown&&(this.labelsShown=o,this.labels.setVisible(o)),o&&(this.labels.renderer.domElement.style.opacity=s.toFixed(3),this.labels.update(this.camera))}this.pipeline.render(),this.labels&&this.labelsShown&&this.labels.renderer.render(this.scene,this.camera)});this.canvas=e,this.renderer=new oh({canvas:e,antialias:!0,alpha:!0}),this.renderer.setClearColor(0,0),this.scene=new ah,this.scene.add(this.skyRoot),this.camera=new lh(78,1,.1,2e3),this.pipeline=ch(this.renderer,this.scene,this.camera,Ro),this.quality=uh(s=>{this.pipeline.setEnabled(s<2),this.pipeline.setBloom({strength:s===0?Ro.strength:Ro.strength*.5}),this.resize()}),this.labelLayerEl=document.createElement("div"),this.labelLayerEl.style.cssText="position:fixed;inset:0;pointer-events:none;z-index:5;",document.body.appendChild(this.labelLayerEl),this.card=fh(document.body),this.onPick(s=>{s?this.card.show(s.info,s.x,s.y):this.card.hide()});const n=document.createElement("canvas");n.width=n.height=64;const t=n.getContext("2d");t.strokeStyle="rgba(240, 205, 110, 0.95)",t.lineWidth=5,t.shadowColor="rgba(201, 162, 39, 0.9)",t.shadowBlur=8,t.beginPath(),t.arc(32,32,24,0,Math.PI*2),t.stroke();const r=new Gc(n);this.hoverRing=new Bc(new Fc({map:r,transparent:!0,depthTest:!1,depthWrite:!1})),this.hoverRing.renderOrder=999,this.hoverRing.visible=!1,this.skyRoot.add(this.hoverRing),this.hoverTip=document.createElement("div"),this.hoverTip.className="sky-tooltip",this.hoverTip.style.display="none",document.body.appendChild(this.hoverTip),this.bindPointer(),window.addEventListener("resize",this.resize),this.resize()}async init(){const[e,n,t,r]=await Promise.all([hh(we),fetch(nr("data/stars.json")).then(a=>{if(!a.ok)throw new Error(`stars=${a.status}`);return a.json()}),fetch(nr("data/asterisms.json")).then(a=>{if(!a.ok)throw new Error(`asterisms=${a.status}`);return a.json()}),fetch(nr("data/poem.json")).then(a=>{if(!a.ok)throw new Error(`poem=${a.status}`);return a.json()})]);this.sky=e,e.starMaterial.uniforms.uPixelRatio.value=this.tierDpr(),this.skyRoot.add(e.group),this.starList=n.stars;const s=new Float32Array(this.starList.length*3),o=new Map;this.starList.forEach((a,l)=>{const[c,u,h]=kn(a.ra,a.dec,we);s[l*3]=c,s[l*3+1]=u,s[l*3+2]=h,o.set(a.hip,new Oe(c,u,h)),this.nameByHip.set(a.hip,a.name)}),this.starPositions=s,this.hipToAsterism=dh(t.asterisms),this.poem=r,this.labels=ph(this.labelLayerEl,t.asterisms,o),this.labels.renderer.setSize(window.innerWidth,window.innerHeight),this.labels.setVisible(!1),this.skyRoot.add(this.labels.group)}start(e){this.frameHook=e??null,!this.started&&(this.started=!0,this.renderer.setAnimationLoop(this.frame))}setRadius(e){this.ctlRadius=Math.max(.5,e*we)}setPositionDir(e){e instanceof Oe?this.ctlDir.copy(e):this.ctlDir.set(e[0],e[1],e[2]),this.ctlDir.lengthSq()<1e-8&&this.ctlDir.set(0,1,0),this.ctlDir.normalize()}setFov(e){this.ctlFov=$e.clamp(e,10,140)}setGazeMode(e,n){if(e==="target"){const t=n??{ra:0,dec:80};this.ctlGazeTargetQ=Qn(t.ra,t.dec)}this.ctlGazeBlend=e==="target"?1:0}setGazeBlend(e,n){this.ctlGazeBlend=$e.clamp(e,0,1),n!==void 0&&(this.ctlGazeTargetQ=n)}setDrift(e){this.ctlDrift=e}setOrbitEnabled(e){this.ctlOrbit=typeof e=="number"?$e.clamp(e,0,1):e?1:0}applyCameraState(e){this.setRadius(e.radius),this.setPositionDir(e.dir),this.setFov(e.fov),this.setGazeBlend(e.gazeBlend,e.gazeTargetQ),this.setDrift(e.drift),this.setOrbitEnabled(e.orbit)}get cameraRadius(){return this.camera.position.length()}setGroupProgress(e,n){if(!this.sky)return;const t=typeof e=="number"?e:this.sky.lines.indexOf(e);this.sky.lines.setGroupProgress(t,n)}groupIndex(e){return this.sky?this.sky.lines.indexOf(e):-1}get groupCount(){return this.sky?this.sky.lines.groupCount:0}setLabelsEnabled(e){this.labelsEnabled=e}setHoverTipEnabled(e){this.hoverTipEnabled=e}setPickingEnabled(e){this.pickingEnabled=e,e||this.card.hide()}hideDetailCard(){this.card.hide()}setBloom(e){this.pipeline.setBloom(e)}setBloomEnabled(e){this.pipeline.setEnabled(e)}onPick(e){return this.pickListeners.add(e),()=>this.pickListeners.delete(e)}addSkyObject(e,n){(n==null?void 0:n.rotateWithSky)===!1?this.scene.add(e):this.skyRoot.add(e)}removeSkyObject(e){e.removeFromParent()}setSkyRotation(e=0,n=0){if(n!==0){const t=gh(n);this.tmpSkyMat.set(t[0],t[1],t[2],0,t[3],t[4],t[5],0,t[6],t[7],t[8],0,0,0,0,1),this.tmpSkyQ.setFromRotationMatrix(this.tmpSkyMat)}else this.tmpSkyQ.identity();this.tmpSkyQY.setFromAxisAngle(vi,e),this.skyRoot.quaternion.copy(this.tmpSkyQ).multiply(this.tmpSkyQY)}tierDpr(){const e=this.quality.tier,n=e===0?2:e===1?1.5:1;return Math.min(window.devicePixelRatio||1,n)}applyOrbitDelta(e,n){const t=this.camera.position.clone().normalize(),r=new gn().setFromAxisAngle(vi,-e),s=new Oe().crossVectors(vi,t);s.lengthSq()<1e-8?s.set(1,0,0):s.normalize();const o=new gn().setFromAxisAngle(s,n),a=r.clone().multiply(o).multiply(this.orbitQ),l=t.clone().applyQuaternion(r).applyQuaternion(o);Math.abs(l.y)<.985?this.orbitQ.copy(a):this.orbitQ.premultiply(r)}bindPointer(){const e=this.canvas;e.addEventListener("pointerdown",n=>{this.dragging=!0,this.lastX=this.downX=n.clientX,this.lastY=this.downY=n.clientY,this.orbitVelX=this.orbitVelY=0,this.lastOrbitMoveT=performance.now(),this.hoverNdc=null,e.setPointerCapture(n.pointerId)}),e.addEventListener("pointerup",n=>{this.dragging=!1,e.releasePointerCapture(n.pointerId),performance.now()-this.lastOrbitMoveT>b0&&(this.orbitVelX=this.orbitVelY=0),Math.hypot(n.clientX-this.downX,n.clientY-this.downY)<p0&&this.handleClick(n.clientX,n.clientY)}),e.addEventListener("pointercancel",()=>{this.dragging=!1,this.orbitVelX=this.orbitVelY=0}),e.addEventListener("pointerleave",()=>{this.hoverNdc=null}),e.addEventListener("pointermove",n=>{if(!this.dragging){this.hoverNdc={x:n.clientX/window.innerWidth*2-1,y:-(n.clientY/window.innerHeight)*2+1,cx:n.clientX,cy:n.clientY};return}const t=n.clientX-this.lastX,r=n.clientY-this.lastY;this.lastX=n.clientX,this.lastY=n.clientY;const s=(1-this.blendK)*(1-this.ctlGazeBlend);s>0&&(this.gazeYaw+=t*oc*s,this.gazePitch+=r*oc*s,this.gazePitch=$e.clamp(this.gazePitch,-ac,ac));const o=this.blendK*this.ctlOrbit;if(o>0){const a=t*o*.005,l=r*o*.005;this.applyOrbitDelta(a,l);const c=performance.now(),u=Math.min((c-this.lastOrbitMoveT)/1e3,.1);this.lastOrbitMoveT=c,u>1e-4&&(this.orbitVelX+=(a/u-this.orbitVelX)*cc,this.orbitVelY+=(l/u-this.orbitVelY)*cc)}})}handleClick(e,n){if(!this.pickingEnabled||!this.sky||!this.starPositions)return;if(this.camera.position.length()>=we){this.emitPick(null);return}const t=e/window.innerWidth*2-1,r=-(n/window.innerHeight)*2+1,s=dl(t,r,this.camera,this.starPositions,{width:window.innerWidth,height:window.innerHeight});if(!s){this.emitPick(null);return}const o=this.starList[s.index],a=this.hipToAsterism.get(o.hip);if(!a){this.emitPick(null);return}const l=this.lookupPoem(a.name);this.emitPick({info:{name:a.name,starCount:a.stars.length,stars:a.stars.map(c=>({name:this.nameByHip.get(c)??null,hip:c})),quote:l==null?void 0:l.text,quoteFrom:l==null?void 0:l.from},x:e,y:n})}lookupPoem(e){if(!this.poem)return;const n=this.poem[e];if(n)return n;const t=e.replace(/[(（][^)）]*[)）]\s*$/,"");return t!==e?this.poem[t]:void 0}emitPick(e){for(const n of this.pickListeners)n(e)}updateHover(){if(!(this.pickingEnabled&&!this.dragging&&this.hoverNdc!==null&&this.starPositions!==null&&this.camera.position.length()<we)){this.hoverRing.visible&&(this.hoverRing.visible=!1),this.hoverTip.style.display!=="none"&&(this.hoverTip.style.display="none");return}const n=dl(this.hoverNdc.x,this.hoverNdc.y,this.camera,this.starPositions,{width:window.innerWidth,height:window.innerHeight},lo.HOVER_PICK_RADIUS_PX);if(!n){this.hoverRing.visible&&(this.hoverRing.visible=!1),this.hoverTip.style.display!=="none"&&(this.hoverTip.style.display="none");return}const t=this.starPositions;this.hoverRing.position.set(t[n.index*3],t[n.index*3+1],t[n.index*3+2]);const r=this.camera.position.distanceTo(this.hoverRing.position),s=Math.max(.5,r*.035);if(this.hoverRing.scale.set(s,s,1),this.hoverRing.visible=!0,!this.hoverTipEnabled){this.hoverTip.style.display!=="none"&&(this.hoverTip.style.display="none");return}const o=this.starList[n.index],a=this.hipToAsterism.get(o.hip),l=o.name??`HIP ${o.hip}`,c=a&&a.name!==l?`${l} · ${a.name}`:l;this.hoverTip.textContent!==c&&(this.hoverTip.textContent=c),this.hoverTip.style.left=`${this.hoverNdc.cx+16}px`,this.hoverTip.style.top=`${this.hoverNdc.cy+14}px`,this.hoverTip.style.display!=="block"&&(this.hoverTip.style.display="block")}updateCamera(e){if(!this.dragging&&(this.orbitVelX!==0||this.orbitVelY!==0)){this.applyOrbitDelta(this.orbitVelX*e,this.orbitVelY*e);const t=Math.pow(.5,e/m0);this.orbitVelX*=t,this.orbitVelY*=t,Math.hypot(this.orbitVelX,this.orbitVelY)<_0&&(this.orbitVelX=this.orbitVelY=0)}const n=this.tmpPos.copy(this.ctlDir).multiplyScalar(this.ctlRadius).applyQuaternion(this.orbitQ);this.camera.position.copy(n),this.blendK=v0((this.ctlRadius-lc)/(g0-lc)),this.gazeEuler.set(this.gazePitch,this.gazeYaw,0),this.gazeQ.setFromEuler(this.gazeEuler),this.insideQ.copy(this.gazeQ),this.ctlGazeTargetQ&&this.ctlGazeBlend>0&&this.insideQ.slerp(this.ctlGazeTargetQ,this.ctlGazeBlend),this.ctlDrift!==0&&(this.driftAngle+=this.ctlDrift*e,this.driftQ.setFromAxisAngle(vi,this.driftAngle),this.insideQ.premultiply(this.driftQ)),this.centerLookMat.lookAt(n,y0,vi),this.centerLookQ.setFromRotationMatrix(this.centerLookMat),this.camera.quaternion.slerpQuaternions(this.insideQ,this.centerLookQ,this.blendK),this.camera.fov!==this.ctlFov&&(this.camera.fov=this.ctlFov,this.camera.updateProjectionMatrix())}};H(lo,"HOVER_PICK_RADIUS_PX",16);let la=lo;const x0=$e.degToRad(23.44),w0=11570494,Oo=36,S0=.15,k0=.55;function T0(i){return i=$e.clamp(i,0,1),i*i*(3-2*i)}function _s(i,e,n){const t=new bh({color:w0,metalness:.85,roughness:.35,transparent:!0,opacity:0}),r=new Fn,s=i*we;r.add(new Ys(new Hc(s,e*we,12,144),t));for(let o=0;o<Oo;o++){const a=o/Oo*Math.PI*2,l=o%(Oo/4)===0,c=new Ys(l?n.major:n.minor,t);c.position.set(Math.cos(a)*s,Math.sin(a)*s,0),c.rotation.z=a,r.add(c)}return{local:r,material:t}}function C0(){const i=new Fn;i.name="armillary-sphere";const e={minor:new pl(.012*we,.0018*we,.0035*we),major:new pl(.02*we,.0024*we,.0045*we)},n=_s(1.1,.006,e);n.local.rotation.x=-Math.PI/2;const t=_s(1.07,.004,e);t.local.rotation.y=Math.PI/2;const r=_s(1.05,.004,e);r.local.rotation.x=-Math.PI/2;const s=new Fn;s.add(r.local);const o=_s(1.03,.0035,e);o.local.rotation.x=-Math.PI/2;const a=new Fn;a.add(o.local);const l=new Fn;l.rotation.x=x0,l.add(a);const c=[{built:n,inner:n.local,offsetDir:new Oe(0,-1,0),tumble:new Ci(.9,0,.4)},{built:t,inner:t.local,offsetDir:new Oe(1,.15,0),tumble:new Ci(0,.5,-1.1)},{built:r,inner:s,offsetDir:new Oe(0,1,.2),tumble:new Ci(-.7,.5,0)},{built:o,inner:l,offsetDir:new Oe(-.6,.6,.6),tumble:new Ci(.5,-.4,.8)}].map(({built:v,inner:k,offsetDir:x,tumble:C})=>{const A=new Fn;return A.add(k),i.add(A),{assembly:A,material:v.material,offsetDir:x.normalize(),tumble:C,alpha:0}});i.add(new _h(16771529,.9));const u=new gl(16774109,2.4);u.position.set(1.6*we,2.4*we,1.2*we),i.add(u);const h=new gl(12570879,1.1);h.position.set(-1.8*we,-.7*we,-1.5*we),i.add(h);let d=0;function f(v){const k=d*v.alpha;v.material.opacity=k,v.assembly.visible=k>.002}function g(v){c.forEach((k,x)=>{const C=T0((v-x*S0)/k0);k.alpha=C;const A=1-C;k.assembly.scale.setScalar(.35+.65*C),k.assembly.position.copy(k.offsetDir).multiplyScalar(A*.5*we),k.assembly.rotation.set(k.tumble.x*A,k.tumble.y*A,k.tumble.z*A),f(k)})}function p(v){s.rotation.y=v,a.rotation.y=v*.6}function _(v){d=$e.clamp(v,0,1);for(const k of c)f(k)}function w(){const v=new Set,k=new Set;i.traverse(x=>{const C=x;if(C.isMesh){v.add(C.geometry);const A=C.material;for(const T of Array.isArray(A)?A:[A])k.add(T)}}),v.forEach(x=>x.dispose()),k.forEach(x=>x.dispose())}return g(0),{group:i,setAssembly:g,setSpin:p,setFade:_,dispose:w}}const Lo=.55,E0=.9,M0=1.2;function xi(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function P0(i){const{copy:e}=i,n=document.createElement("div");n.className="chapter-panel chapter-panel--left",n.innerHTML=`
    <p class="eyebrow">${xi(e.eyebrow)}</p>
    <div class="chapter-head">
      <h2>${xi(e.title)}</h2>
      ${e.seal?`<div class="seal">${xi(e.seal)}</div>`:""}
    </div>
    <p class="hook">${xi(e.hook)}</p>
    ${e.body.map(a=>`<p>${xi(a)}</p>`).join("")}
  `,i.root.querySelector(".pin").appendChild(n);let t=null,r=0;const s={v:0};function o(a){if(!t)return;t.setAssembly(Math.min(a/Lo,1));const l=Math.max(0,(a-Lo)/(1-Lo));t.setSpin(l*E0)}return{enter(){i.root.classList.add("inview"),t||(t=C0(),i.sky.addSkyObject(t.group,{rotateWithSky:!1}),o(r)),On.to(s,{v:1,duration:M0,ease:"power2.out",overwrite:!0,onUpdate:()=>t==null?void 0:t.setFade(s.v)})},update(a){r=a,o(a)},exit(){i.root.classList.remove("inview"),On.killTweensOf(s),s.v=0,t&&(i.sky.removeSkyObject(t.group),t.dispose(),t=null)}}}const A0=Object.freeze(Object.defineProperty({__proto__:null,createChapter:P0},Symbol.toStringTag,{value:"Module"})),wr=-1e4,no=14e3,ca=no-wr,R0=[{name:"帝星",years:-1e3,note:"−1000"},{name:"勾陈一",years:0,note:"今"},{name:"织女一",years:13700,note:"+13700"}],O0=[{years:wr,text:"−10000",cls:"ch6-endlab--start"},{years:0,text:"0",cls:""},{years:no,text:"+14000",cls:"ch6-endlab--end"}],L0=2e3,D0=1.5,z0=.07,I0=`
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
`;let uc=!1;function $0(){if(uc||typeof document>"u")return;const i=document.createElement("style");i.dataset.ch6="",i.textContent=I0,document.head.appendChild(i),uc=!0}function wi(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function bs(i){return(i-wr)/ca*100}function N0(i){const e=2e3+i;return e<=0?{era:"公元前",num:1-e}:{era:e<3e3?"公元":"公元后",num:e}}function F0(i){$0();const e=i.root.querySelector(".pin"),n=document.createElement("div");n.className="chapter-panel ch6-panel",n.innerHTML=`
    <p class="eyebrow">${wi(i.copy.eyebrow)}</p>
    <div class="chapter-head">
      <h2>${wi(i.copy.title)}</h2>
      ${i.copy.seal?`<div class="seal">${wi(i.copy.seal)}</div>`:""}
    </div>
    <p class="hook">${wi(i.copy.hook)}</p>
    ${i.copy.body.map(_=>`<p>${wi(_)}</p>`).join("")}
  `,e.appendChild(n);const t=document.createElement("div");t.className="ch6-time";const r=[];for(let _=wr;_<=no;_+=L0){const w=_===wr||_===0||_===no;r.push(`<div class="ch6-tick${w?" ch6-tick--major":""}" style="left:${bs(_).toFixed(3)}%"></div>`)}const s=O0.map(_=>`<div class="ch6-endlab ${_.cls}" style="left:${bs(_.years).toFixed(3)}%">${_.text}</div>`),o=R0.map(_=>`
    <div class="ch6-mark" style="left:${bs(_.years).toFixed(3)}%">
      <span class="ch6-mark-name">${_.name}</span>
      <span class="ch6-mark-yr">${_.note}</span>
      <span class="ch6-mark-dot"></span>
    </div>`);t.innerHTML=`
    <div class="ch6-year"><span class="ch6-era">公元前</span><span class="ch6-num">8000</span><span class="ch6-suffix">年</span></div>
    <div class="ch6-ruler">
      <div class="ch6-ruler-line"></div>
      ${r.join("")}
      ${s.join("")}
      ${o.join("")}
      <div class="ch6-pointer"></div>
    </div>
  `,e.appendChild(t);const a=t.querySelector(".ch6-era"),l=t.querySelector(".ch6-num"),c=t.querySelector(".ch6-pointer");let u=null;function h(){const _=new Hc(D0,z0,12,96),w=new yh({color:13214247}),v=new Ys(_,w);return v.rotation.x=Math.PI/2,v.position.set(0,1.01*we,0),v}let d=0,f=Number.NaN,g=Number.NaN;function p(_){i.sky.setSkyRotation(0,_);const w=Math.round(_);if(w!==f){f=w;const{era:k,num:x}=N0(w);a.textContent=k,l.textContent=String(x)}const v=Math.round(bs(_)*100)/100;v!==g&&(g=v,c.style.left=`${v}%`)}return{enter(){i.root.classList.add("inview"),u=h(),i.sky.addSkyObject(u,{rotateWithSky:!1}),p(wr+d*ca)},update(_){d=_,p(wr+_*ca)},exit(){i.root.classList.remove("inview"),i.sky.setSkyRotation(0,0),u&&(i.sky.removeSkyObject(u),u.geometry.dispose(),u.material.dispose(),u=null)}}}const B0=Object.freeze(Object.defineProperty({__proto__:null,createChapter:F0},Symbol.toStringTag,{value:"Module"})),G0=100,H0=9414856;async function fc(i){const e=await fetch(i);if(!e.ok)throw new Error(`${i} → HTTP ${e.status}`);return e.json()}async function q0(){const[i,e]=await Promise.all([fc(nr("data/western.json")),fc(nr("data/stars.json"))]),n=new Map;for(const l of e.stars)n.set(l.hip,kn(l.ra,l.dec,G0));const t=[];for(const l of i.constellations)for(const[c,u]of l.lines){const h=n.get(c),d=n.get(u);!h||!d||t.push(h[0],h[1],h[2],d[0],d[1],d[2])}const r=new vh;r.setAttribute("position",new xh(new Float32Array(t),3));const s=new wh({color:H0,transparent:!0,opacity:0,depthWrite:!1,blending:qc}),o=new Sh(r,s);o.name="western-lines",o.frustumCulled=!1;const a=new Fn;return a.name="western",a.add(o),a.visible=!1,{group:a,setOpacity(l){const c=$e.clamp(l,0,1);s.opacity=c,a.visible=c>.001},dispose(){r.dispose(),s.dispose()}}}const hc=.6,Y0=`
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
`;let dc=!1;function X0(){if(dc||typeof document>"u")return;const i=document.createElement("style");i.dataset.ch7="",i.textContent=Y0,document.head.appendChild(i),dc=!0}function Si(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function W0(i){return i=$e.clamp(i,0,1),i*i*(3-2*i)}function U0(i){X0();const e=i.root.querySelector(".pin"),{copy:n}=i,t=document.createElement("div");t.className="ch7-panel",t.innerHTML=`
    <p class="eyebrow">${Si(n.eyebrow)}</p>
    <div class="chapter-head">
      <h2>${Si(n.title)}</h2>
      ${n.seal?`<div class="seal">${Si(n.seal)}</div>`:""}
    </div>
    <p class="hook">${Si(n.hook)}</p>
    ${n.body.map(g=>`<p>${Si(g)}</p>`).join("")}
  `,e.appendChild(t);const r=document.createElement("div");r.className="ch7-compare",r.innerHTML=`
    <span class="ch7-end ch7-end--cn">中国星官</span>
    <input class="ch7-slider" type="range" min="0" max="100" step="1" value="0"
      aria-label="中西星空连线对比" />
    <span class="ch7-end ch7-end--west">西方星座</span>
  `,e.appendChild(r);const s=r.querySelector(".ch7-slider");let o=null,a=0,l=0,c=!1,u=null,h=null;function d(g){const p=i.sky.groupCount;for(let _=0;_<p;_++)i.sky.setGroupProgress(_,g)}function f(g){l=$e.clamp(g,0,1),d(1-l),o==null||o.setOpacity(l),s.value=String(Math.round(l*100))}return s.addEventListener("input",()=>{c=!0,f(Number(s.value)/100)}),{enter(){if(i.root.classList.add("inview"),i.sky.setLabelsEnabled(!1),u==null||u.kill(),u=null,h==null||h.kill(),h=null,c=!1,f(0),o)return;const g=++a;q0().then(p=>{if(g!==a){p.dispose();return}o=p,i.sky.addSkyObject(p.group),p.setOpacity(l)}).catch(p=>console.warn("[ch7] 西方星座数据加载失败：",p))},update(g){if(!c){if(g>=hc){l!==1&&f(1);return}f(W0(g/hc))}},exit(){if(i.root.classList.remove("inview"),++a,h==null||h.kill(),o){const p=o,_={v:l};h=On.to(_,{v:0,duration:.6,ease:"sine.inOut",onUpdate:()=>p.setOpacity(_.v),onComplete:()=>{i.sky.removeSkyObject(p.group),p.dispose(),o===p&&(o=null),h=null}})}u==null||u.kill();const g={v:1-l};u=On.to(g,{v:1,duration:2.4,ease:"sine.inOut",onUpdate:()=>d(g.v)}),i.sky.setLabelsEnabled(!0)}}}const V0=Object.freeze(Object.defineProperty({__proto__:null,createChapter:U0},Symbol.toStringTag,{value:"Module"})),j0=`
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
`;let pc=!1;function Q0(){if(pc||typeof document>"u")return;const i=document.createElement("style");i.dataset.ch8="",i.textContent=j0,document.head.appendChild(i),pc=!0}function Mn(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function K0(i){return i<0?0:i>1?1:i}function Z0(i){return i.split(/(https?:\/\/\S+)/g).map(e=>/^https?:\/\//.test(e)?`<a href="${Mn(e)}" target="_blank" rel="noopener">${Mn(e)}</a>`:Mn(e)).join("")}function gc(i,e,n){const t=K0((i-e)/(n-e));return t*t*(3-2*t)}function J0(i){Q0();const e=i.root.querySelector(".pin"),{copy:n}=i,t=document.createElement("div");t.className="ch8-wrap",t.innerHTML=`
    <div class="ch8-panel">
      <p class="ch8-eyebrow">${Mn(n.eyebrow)}</p>
      <div class="ch8-head">
        <h2 class="ch8-title">${Mn(n.title)}</h2>
        ${n.seal?`<div class="ch8-seal">${Mn(n.seal)}</div>`:""}
      </div>
      <p class="ch8-hook">${Mn(n.hook)}</p>
      <div class="ch8-body">${n.body.map(l=>`<p>${Mn(l)}</p>`).join("")}</div>
      <div class="ch8-credits">
        <p class="ch8-credits-heading">${Mn(Xl.heading)}</p>
        ${Xl.groups.map(l=>`
          <div class="ch8-credit-group">
            <h3>${Mn(l.title)}</h3>
            ${l.lines.map(c=>`<p>${Z0(c)}</p>`).join("")}
          </div>`).join("")}
      </div>
    </div>
  `,e.appendChild(t);const r=t.querySelector(".ch8-panel"),s=t.querySelector(".ch8-credits");let o=-1,a=-1;return{enter(){},update(l){const c=gc(l,0,.3);(o<0||Math.abs(c-o)>=1e-4)&&(o=c,r.style.opacity=c.toFixed(3),r.style.transform=`translateY(${((1-c)*26).toFixed(2)}px)`);const u=gc(l,.12,.45);(a<0||Math.abs(u-a)>=1e-4)&&(a=u,s.style.opacity=u.toFixed(3),s.style.transform=`translateY(${((1-u)*14).toFixed(2)}px)`)},exit(){}}}const eg=Object.freeze(Object.defineProperty({__proto__:null,createChapter:J0},Symbol.toStringTag,{value:"Module"}));function tg(i,e){for(var n=0;n<e.length;n++){var t=e[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(i,t.key,t)}}function ng(i,e,n){return e&&tg(i.prototype,e),i}/*!
 * Observer 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var bt,Ns,sn,er,tr,ni,ff,br,ri,hf,Hn,Sn,df,pf=function(){return bt||typeof window<"u"&&(bt=window.gsap)&&bt.registerPlugin&&bt},gf=1,Kr=[],le=[],Dn=[],Fi=Date.now,ua=function(e,n){return n},rg=function(){var e=ri.core,n=e.bridge||{},t=e._scrollers,r=e._proxies;t.push.apply(t,le),r.push.apply(r,Dn),le=t,Dn=r,ua=function(o,a){return n[o](a)}},sr=function(e,n){return~Dn.indexOf(e)&&Dn[Dn.indexOf(e)+1][n]},Bi=function(e){return!!~hf.indexOf(e)},zt=function(e,n,t,r,s){return e.addEventListener(n,t,{passive:r!==!1,capture:!!s})},Dt=function(e,n,t,r){return e.removeEventListener(n,t,!!r)},ys="scrollLeft",vs="scrollTop",fa=function(){return Hn&&Hn.isPressed||le.cache++},ro=function(e,n){var t=function r(s){if(s||s===0){gf&&(sn.history.scrollRestoration="manual");var o=Hn&&Hn.isPressed;s=r.v=Math.round(s)||(Hn&&Hn.iOS?1:0),e(s),r.cacheID=le.cache,o&&ua("ss",s)}else(n||le.cache!==r.cacheID||ua("ref"))&&(r.cacheID=le.cache,r.v=e());return r.v+r.offset};return t.offset=0,e&&t},Ft={s:ys,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:ro(function(i){return arguments.length?sn.scrollTo(i,ct.sc()):sn.pageXOffset||er[ys]||tr[ys]||ni[ys]||0})},ct={s:vs,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:Ft,sc:ro(function(i){return arguments.length?sn.scrollTo(Ft.sc(),i):sn.pageYOffset||er[vs]||tr[vs]||ni[vs]||0})},Bt=function(e,n){return(n&&n._ctx&&n._ctx.selector||bt.utils.toArray)(e)[0]||(typeof e=="string"&&bt.config().nullTargetWarn!==!1?console.warn("Element not found:",e):null)},ig=function(e,n){for(var t=n.length;t--;)if(n[t]===e||n[t].contains(e))return!0;return!1},cr=function(e,n){var t=n.s,r=n.sc;Bi(e)&&(e=er.scrollingElement||tr);var s=le.indexOf(e),o=r===ct.sc?1:2;!~s&&(s=le.push(e)-1),le[s+o]||zt(e,"scroll",fa);var a=le[s+o],l=a||(le[s+o]=ro(sr(e,t),!0)||(Bi(e)?r:ro(function(c){return arguments.length?e[t]=c:e[t]})));return l.target=e,a||(l.smooth=bt.getProperty(e,"scrollBehavior")==="smooth"),l},ha=function(e,n,t){var r=e,s=e,o=Fi(),a=o,l=n||50,c=Math.max(500,l*3),u=function(g,p){var _=Fi();p||_-o>l?(s=r,r=g,a=o,o=_):t?r+=g:r=s+(g-s)/(_-a)*(o-a)},h=function(){s=r=t?0:r,a=o=0},d=function(g){var p=a,_=s,w=Fi();return(g||g===0)&&g!==r&&u(g),o===a||w-a>c?0:(r+(t?_:-_))/((t?w:o)-p)*1e3};return{update:u,reset:h,getVelocity:d}},ki=function(e,n){return n&&!e._gsapAllow&&e.cancelable!==!1&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},mc=function(e){var n=Math.max.apply(Math,e),t=Math.min.apply(Math,e);return Math.abs(n)>=Math.abs(t)?n:t},mf=function(){ri=bt.core.globals().ScrollTrigger,ri&&ri.core&&rg()},_f=function(e){return bt=e||pf(),!Ns&&bt&&typeof document<"u"&&document.body&&(sn=window,er=document,tr=er.documentElement,ni=er.body,hf=[sn,er,tr,ni],bt.utils.clamp,df=bt.core.context||function(){},br="onpointerenter"in ni?"pointer":"mouse",ff=Ze.isTouch=sn.matchMedia&&sn.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in sn||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,Sn=Ze.eventTypes=("ontouchstart"in tr?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in tr?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return gf=0},500),Ns=1),ri||mf(),Ns};Ft.op=ct;le.cache=0;var Ze=function(){function i(n){this.init(n)}var e=i.prototype;return e.init=function(t){Ns||_f(bt)||console.warn("Please gsap.registerPlugin(Observer)"),ri||mf();var r=t.tolerance,s=t.dragMinimum,o=t.type,a=t.target,l=t.lineHeight,c=t.debounce,u=t.preventDefault,h=t.onStop,d=t.onStopDelay,f=t.ignore,g=t.wheelSpeed,p=t.event,_=t.onDragStart,w=t.onDragEnd,v=t.onDrag,k=t.onPress,x=t.onRelease,C=t.onRight,A=t.onLeft,T=t.onUp,L=t.onDown,R=t.onChangeX,P=t.onChangeY,J=t.onChange,m=t.onToggleX,F=t.onToggleY,$=t.onHover,V=t.onHoverEnd,K=t.onMove,B=t.ignoreCheck,M=t.isNormalizer,O=t.onGestureStart,b=t.onGestureEnd,X=t.onWheel,ee=t.onEnable,D=t.onDisable,U=t.onClick,I=t.scrollSpeed,N=t.capture,Y=t.allowClicks,ge=t.lockAxis,ye=t.onLockAxis;this.target=a=Bt(a)||tr,this.vars=t,f&&(f=bt.utils.toArray(f)),r=r||1e-9,s=s||0,g=g||1,I=I||1,o=o||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(sn.getComputedStyle(ni).lineHeight)||22);var qe,Ve,Te,q,j,je,Je,S=this,Ye=0,De=0,Le=t.passive||!u&&t.passive!==!1,de=cr(a,Ft),ue=cr(a,ct),ze=de(),ut=ue(),Se=~o.indexOf("touch")&&!~o.indexOf("pointer")&&Sn[0]==="pointerdown",Pt=Bi(a),Ie=a.ownerDocument||er,mt=[0,0,0],ft=[0,0,0],At=0,me=function(){return At=Fi()},_e=function(Q,he){return(S.event=Q)&&f&&ig(Q.target,f)||he&&Se&&Q.pointerType!=="touch"||B&&B(Q,he)},vt=function(){S._vx.reset(),S._vy.reset(),Ve.pause(),h&&h(S)},it=function(){var Q=S.deltaX=mc(mt),he=S.deltaY=mc(ft),z=Math.abs(Q)>=r,ne=Math.abs(he)>=r;J&&(z||ne)&&J(S,Q,he,mt,ft),z&&(C&&S.deltaX>0&&C(S),A&&S.deltaX<0&&A(S),R&&R(S),m&&S.deltaX<0!=Ye<0&&m(S),Ye=S.deltaX,mt[0]=mt[1]=mt[2]=0),ne&&(L&&S.deltaY>0&&L(S),T&&S.deltaY<0&&T(S),P&&P(S),F&&S.deltaY<0!=De<0&&F(S),De=S.deltaY,ft[0]=ft[1]=ft[2]=0),(q||Te)&&(K&&K(S),Te&&(_&&Te===1&&_(S),v&&v(S),Te=0),q=!1),je&&!(je=!1)&&ye&&ye(S),j&&(X(S),j=!1),qe=0},Rt=function(Q,he,z){mt[z]+=Q,ft[z]+=he,S._vx.update(Q),S._vy.update(he),c?qe||(qe=requestAnimationFrame(it)):it()},Ut=function(Q,he){ge&&!Je&&(S.axis=Je=Math.abs(Q)>Math.abs(he)?"x":"y",je=!0),Je!=="y"&&(mt[2]+=Q,S._vx.update(Q,!0)),Je!=="x"&&(ft[2]+=he,S._vy.update(he,!0)),c?qe||(qe=requestAnimationFrame(it)):it()},Vt=function(Q){if(!_e(Q,1)){Q=ki(Q,u);var he=Q.clientX,z=Q.clientY,ne=he-S.x,W=z-S.y,te=S.isDragging;S.x=he,S.y=z,(te||(ne||W)&&(Math.abs(S.startX-he)>=s||Math.abs(S.startY-z)>=s))&&(Te||(Te=te?2:1),te||(S.isDragging=!0),Ut(ne,W))}},jt=S.onPress=function(re){_e(re,1)||re&&re.button||(S.axis=Je=null,Ve.pause(),S.isPressed=!0,re=ki(re),Ye=De=0,S.startX=S.x=re.clientX,S.startY=S.y=re.clientY,S._vx.reset(),S._vy.reset(),zt(M?a:Ie,Sn[1],Vt,Le,!0),S.deltaX=S.deltaY=0,k&&k(S))},ie=S.onRelease=function(re){if(!_e(re,1)){Dt(M?a:Ie,Sn[1],Vt,!0);var Q=!isNaN(S.y-S.startY),he=S.isDragging,z=he&&(Math.abs(S.x-S.startX)>3||Math.abs(S.y-S.startY)>3),ne=ki(re);!z&&Q&&(S._vx.reset(),S._vy.reset(),u&&Y&&bt.delayedCall(.08,function(){if(Fi()-At>300&&!re.defaultPrevented){if(re.target.click)re.target.click();else if(Ie.createEvent){var W=Ie.createEvent("MouseEvents");W.initMouseEvent("click",!0,!0,sn,1,ne.screenX,ne.screenY,ne.clientX,ne.clientY,!1,!1,!1,!1,0,null),re.target.dispatchEvent(W)}}})),S.isDragging=S.isGesturing=S.isPressed=!1,h&&he&&!M&&Ve.restart(!0),Te&&it(),w&&he&&w(S),x&&x(S,z)}},xn=function(Q){return Q.touches&&Q.touches.length>1&&(S.isGesturing=!0)&&O(Q,S.isDragging)},Ot=function(){return(S.isGesturing=!1)||b(S)},Ae=function(Q){if(!_e(Q)){var he=de(),z=ue();Rt((he-ze)*I,(z-ut)*I,1),ze=he,ut=z,h&&Ve.restart(!0)}},Lt=function(Q){if(!_e(Q)){Q=ki(Q,u),X&&(j=!0);var he=(Q.deltaMode===1?l:Q.deltaMode===2?sn.innerHeight:1)*g;Rt(Q.deltaX*he,Q.deltaY*he,0),h&&!M&&Ve.restart(!0)}},fn=function(Q){if(!_e(Q)){var he=Q.clientX,z=Q.clientY,ne=he-S.x,W=z-S.y;S.x=he,S.y=z,q=!0,h&&Ve.restart(!0),(ne||W)&&Ut(ne,W)}},hn=function(Q){S.event=Q,$(S)},ht=function(Q){S.event=Q,V(S)},Wn=function(Q){return _e(Q)||ki(Q,u)&&U(S)};Ve=S._dc=bt.delayedCall(d||.25,vt).pause(),S.deltaX=S.deltaY=0,S._vx=ha(0,50,!0),S._vy=ha(0,50,!0),S.scrollX=de,S.scrollY=ue,S.isDragging=S.isGesturing=S.isPressed=!1,df(this),S.enable=function(re){return S.isEnabled||(zt(Pt?Ie:a,"scroll",fa),o.indexOf("scroll")>=0&&zt(Pt?Ie:a,"scroll",Ae,Le,N),o.indexOf("wheel")>=0&&zt(a,"wheel",Lt,Le,N),(o.indexOf("touch")>=0&&ff||o.indexOf("pointer")>=0)&&(zt(a,Sn[0],jt,Le,N),zt(Ie,Sn[2],ie),zt(Ie,Sn[3],ie),Y&&zt(a,"click",me,!0,!0),U&&zt(a,"click",Wn),O&&zt(Ie,"gesturestart",xn),b&&zt(Ie,"gestureend",Ot),$&&zt(a,br+"enter",hn),V&&zt(a,br+"leave",ht),K&&zt(a,br+"move",fn)),S.isEnabled=!0,S.isDragging=S.isGesturing=S.isPressed=q=Te=!1,S._vx.reset(),S._vy.reset(),ze=de(),ut=ue(),re&&re.type&&jt(re),ee&&ee(S)),S},S.disable=function(){S.isEnabled&&(Kr.filter(function(re){return re!==S&&Bi(re.target)}).length||Dt(Pt?Ie:a,"scroll",fa),S.isPressed&&(S._vx.reset(),S._vy.reset(),Dt(M?a:Ie,Sn[1],Vt,!0)),Dt(Pt?Ie:a,"scroll",Ae,N),Dt(a,"wheel",Lt,N),Dt(a,Sn[0],jt,N),Dt(Ie,Sn[2],ie),Dt(Ie,Sn[3],ie),Dt(a,"click",me,!0),Dt(a,"click",Wn),Dt(Ie,"gesturestart",xn),Dt(Ie,"gestureend",Ot),Dt(a,br+"enter",hn),Dt(a,br+"leave",ht),Dt(a,br+"move",fn),S.isEnabled=S.isPressed=S.isDragging=!1,D&&D(S))},S.kill=S.revert=function(){S.disable();var re=Kr.indexOf(S);re>=0&&Kr.splice(re,1),Hn===S&&(Hn=0)},Kr.push(S),M&&Bi(a)&&(Hn=S),S.enable(p)},ng(i,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),i}();Ze.version="3.15.0";Ze.create=function(i){return new Ze(i)};Ze.register=_f;Ze.getAll=function(){return Kr.slice()};Ze.getById=function(i){return Kr.filter(function(e){return e.vars.id===i})[0]};pf()&&bt.registerPlugin(Ze);/*!
 * ScrollTrigger 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var G,Wr,ae,xe,nn,be,Ya,io,rs,Gi,Ai,xs,kt,po,da,$t,_c,bc,Ur,bf,Do,yf,It,pa,vf,xf,jn,ga,Xa,ii,Wa,Hi,ma,zo,ws=1,Tt=Date.now,Io=Tt(),vn=0,Ri=0,yc=function(e,n,t){var r=Zt(e)&&(e.substr(0,6)==="clamp("||e.indexOf("max")>-1);return t["_"+n+"Clamp"]=r,r?e.substr(6,e.length-7):e},vc=function(e,n){return n&&(!Zt(e)||e.substr(0,6)!=="clamp(")?"clamp("+e+")":e},sg=function i(){return Ri&&requestAnimationFrame(i)},xc=function(){return po=1},wc=function(){return po=0},Pn=function(e){return e},Oi=function(e){return Math.round(e*1e5)/1e5||0},wf=function(){return typeof window<"u"},Sf=function(){return G||wf()&&(G=window.gsap)&&G.registerPlugin&&G},Dr=function(e){return!!~Ya.indexOf(e)},kf=function(e){return(e==="Height"?Wa:ae["inner"+e])||nn["client"+e]||be["client"+e]},Tf=function(e){return sr(e,"getBoundingClientRect")||(Dr(e)?function(){return qs.width=ae.innerWidth,qs.height=Wa,qs}:function(){return Bn(e)})},og=function(e,n,t){var r=t.d,s=t.d2,o=t.a;return(o=sr(e,"getBoundingClientRect"))?function(){return o()[r]}:function(){return(n?kf(s):e["client"+s])||0}},ag=function(e,n){return!n||~Dn.indexOf(e)?Tf(e):function(){return qs}},Ln=function(e,n){var t=n.s,r=n.d2,s=n.d,o=n.a;return Math.max(0,(t="scroll"+r)&&(o=sr(e,t))?o()-Tf(e)()[s]:Dr(e)?(nn[t]||be[t])-kf(r):e[t]-e["offset"+r])},Ss=function(e,n){for(var t=0;t<Ur.length;t+=3)(!n||~n.indexOf(Ur[t+1]))&&e(Ur[t],Ur[t+1],Ur[t+2])},Zt=function(e){return typeof e=="string"},Et=function(e){return typeof e=="function"},Li=function(e){return typeof e=="number"},yr=function(e){return typeof e=="object"},Ti=function(e,n,t){return e&&e.progress(n?0:1)&&t&&e.pause()},qr=function(e,n,t){if(e.enabled){var r=e._ctx?e._ctx.add(function(){return n(e,t)}):n(e,t);r&&r.totalTime&&(e.callbackAnimation=r)}},Yr=Math.abs,Cf="left",Ef="top",Ua="right",Va="bottom",Ar="width",Rr="height",qi="Right",Yi="Left",Xi="Top",Wi="Bottom",nt="padding",mn="margin",fi="Width",ja="Height",lt="px",_n=function(e){return ae.getComputedStyle(e.nodeType===Node.DOCUMENT_NODE?e.scrollingElement:e)},lg=function(e){var n=_n(e).position;e.style.position=n==="absolute"||n==="fixed"?n:"relative"},Sc=function(e,n){for(var t in n)t in e||(e[t]=n[t]);return e},Bn=function(e,n){var t=n&&_n(e)[da]!=="matrix(1, 0, 0, 1, 0, 0)"&&G.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),r=e.getBoundingClientRect?e.getBoundingClientRect():e.scrollingElement.getBoundingClientRect();return t&&t.progress(0).kill(),r},so=function(e,n){var t=n.d2;return e["offset"+t]||e["client"+t]||0},Mf=function(e){var n=[],t=e.labels,r=e.duration(),s;for(s in t)n.push(t[s]/r);return n},cg=function(e){return function(n){return G.utils.snap(Mf(e),n)}},Qa=function(e){var n=G.utils.snap(e),t=Array.isArray(e)&&e.slice(0).sort(function(r,s){return r-s});return t?function(r,s,o){o===void 0&&(o=.001);var a;if(!s)return n(r);if(s>0){for(r-=o,a=0;a<t.length;a++)if(t[a]>=r)return t[a];return t[a-1]}else for(a=t.length,r+=o;a--;)if(t[a]<=r)return t[a];return t[0]}:function(r,s,o){o===void 0&&(o=.001);var a=n(r);return!s||Math.abs(a-r)<o||a-r<0==s<0?a:n(s<0?r-e:r+e)}},ug=function(e){return function(n,t){return Qa(Mf(e))(n,t.direction)}},ks=function(e,n,t,r){return t.split(",").forEach(function(s){return e(n,s,r)})},pt=function(e,n,t,r,s){return e.addEventListener(n,t,{passive:!r,capture:!!s})},dt=function(e,n,t,r){return e.removeEventListener(n,t,!!r)},Ts=function(e,n,t){t=t&&t.wheelHandler,t&&(e(n,"wheel",t),e(n,"touchmove",t))},kc={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},Cs={toggleActions:"play",anticipatePin:0},oo={top:0,left:0,center:.5,bottom:1,right:1},Fs=function(e,n){if(Zt(e)){var t=e.indexOf("="),r=~t?+(e.charAt(t-1)+1)*parseFloat(e.substr(t+1)):0;~t&&(e.indexOf("%")>t&&(r*=n/100),e=e.substr(0,t-1)),e=r+(e in oo?oo[e]*n:~e.indexOf("%")?parseFloat(e)*n/100:parseFloat(e)||0)}return e},Es=function(e,n,t,r,s,o,a,l){var c=s.startColor,u=s.endColor,h=s.fontSize,d=s.indent,f=s.fontWeight,g=xe.createElement("div"),p=Dr(t)||sr(t,"pinType")==="fixed",_=e.indexOf("scroller")!==-1,w=p?be:t.tagName==="IFRAME"?t.contentDocument.body:t,v=e.indexOf("start")!==-1,k=v?c:u,x="border-color:"+k+";font-size:"+h+";color:"+k+";font-weight:"+f+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return x+="position:"+((_||l)&&p?"fixed;":"absolute;"),(_||l||!p)&&(x+=(r===ct?Ua:Va)+":"+(o+parseFloat(d))+"px;"),a&&(x+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),g._isStart=v,g.setAttribute("class","gsap-marker-"+e+(n?" marker-"+n:"")),g.style.cssText=x,g.innerText=n||n===0?e+"-"+n:e,w.children[0]?w.insertBefore(g,w.children[0]):w.appendChild(g),g._offset=g["offset"+r.op.d2],Bs(g,0,r,v),g},Bs=function(e,n,t,r){var s={display:"block"},o=t[r?"os2":"p2"],a=t[r?"p2":"os2"];e._isFlipped=r,s[t.a+"Percent"]=r?-100:0,s[t.a]=r?"1px":0,s["border"+o+fi]=1,s["border"+a+fi]=0,s[t.p]=n+"px",G.set(e,s)},oe=[],_a={},is,Tc=function(){return Tt()-vn>34&&(is||(is=requestAnimationFrame(qn)))},Xr=function(){(!It||!It.isPressed||It.startX>be.clientWidth)&&(le.cache++,It?is||(is=requestAnimationFrame(qn)):qn(),vn||Ir("scrollStart"),vn=Tt())},$o=function(){xf=ae.innerWidth,vf=ae.innerHeight},Di=function(e){le.cache++,(e===!0||!kt&&!yf&&!xe.fullscreenElement&&!xe.webkitFullscreenElement&&(!pa||xf!==ae.innerWidth||Math.abs(ae.innerHeight-vf)>ae.innerHeight*.25))&&io.restart(!0)},zr={},fg=[],Pf=function i(){return dt(ce,"scrollEnd",i)||Sr(!0)},Ir=function(e){return zr[e]&&zr[e].map(function(n){return n()})||fg},Kt=[],Af=function(e){for(var n=0;n<Kt.length;n+=5)(!e||Kt[n+4]&&Kt[n+4].query===e)&&(Kt[n].style.cssText=Kt[n+1],Kt[n].getBBox&&Kt[n].setAttribute("transform",Kt[n+2]||""),Kt[n+3].uncache=1)},Rf=function(){return le.forEach(function(e){return Et(e)&&++e.cacheID&&(e.rec=e())})},Ka=function(e,n){var t;for($t=0;$t<oe.length;$t++)t=oe[$t],t&&(!n||t._ctx===n)&&(e?t.kill(1):t.revert(!0,!0));Hi=!0,n&&Af(n),n||Ir("revert")},Of=function(e,n){le.cache++,(n||!Nt)&&le.forEach(function(t){return Et(t)&&t.cacheID++&&(t.rec=0)}),Zt(e)&&(ae.history.scrollRestoration=Xa=e)},Nt,Or=0,Cc,hg=function(){if(Cc!==Or){var e=Cc=Or;requestAnimationFrame(function(){return e===Or&&Sr(!0)})}},Lf=function(){be.appendChild(ii),Wa=!It&&ii.offsetHeight||ae.innerHeight,be.removeChild(ii)},Ec=function(e){return rs(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(n){return n.style.display=e?"none":"block"})},Sr=function(e,n){if(nn=xe.documentElement,be=xe.body,Ya=[ae,xe,nn,be],vn&&!e&&!Hi){pt(ce,"scrollEnd",Pf);return}Lf(),Nt=ce.isRefreshing=!0,Hi||Rf();var t=Ir("refreshInit");bf&&ce.sort(),n||Ka(),le.forEach(function(r){Et(r)&&(r.smooth&&(r.target.style.scrollBehavior="auto"),r(0))}),oe.slice(0).forEach(function(r){return r.refresh()}),Hi=!1,oe.forEach(function(r){if(r._subPinOffset&&r.pin){var s=r.vars.horizontal?"offsetWidth":"offsetHeight",o=r.pin[s];r.revert(!0,1),r.adjustPinSpacing(r.pin[s]-o),r.refresh()}}),ma=1,Ec(!0),oe.forEach(function(r){var s=Ln(r.scroller,r._dir),o=r.vars.end==="max"||r._endClamp&&r.end>s,a=r._startClamp&&r.start>=s;(o||a)&&r.setPositions(a?s-1:r.start,o?Math.max(a?s:r.start+1,s):r.end,!0)}),Ec(!1),ma=0,t.forEach(function(r){return r&&r.render&&r.render(-1)}),le.forEach(function(r){Et(r)&&(r.smooth&&requestAnimationFrame(function(){return r.target.style.scrollBehavior="smooth"}),r.rec&&r(r.rec))}),Of(Xa,1),io.pause(),Or++,Nt=2,qn(2),oe.forEach(function(r){return Et(r.vars.onRefresh)&&r.vars.onRefresh(r)}),Nt=ce.isRefreshing=!1,Ir("refresh")},ba=0,Gs=1,Ui,qn=function(e){if(e===2||!Nt&&!Hi){ce.isUpdating=!0,Ui&&Ui.update(0);var n=oe.length,t=Tt(),r=t-Io>=50,s=n&&oe[0].scroll();if(Gs=ba>s?-1:1,Nt||(ba=s),r&&(vn&&!po&&t-vn>200&&(vn=0,Ir("scrollEnd")),Ai=Io,Io=t),Gs<0){for($t=n;$t-- >0;)oe[$t]&&oe[$t].update(0,r);Gs=1}else for($t=0;$t<n;$t++)oe[$t]&&oe[$t].update(0,r);ce.isUpdating=!1}is=0},ya=[Cf,Ef,Va,Ua,mn+Wi,mn+qi,mn+Xi,mn+Yi,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],Hs=ya.concat([Ar,Rr,"boxSizing","max"+fi,"max"+ja,"position",mn,nt,nt+Xi,nt+qi,nt+Wi,nt+Yi]),dg=function(e,n,t){si(t);var r=e._gsap;if(r.spacerIsNative)si(r.spacerState);else if(e._gsap.swappedIn){var s=n.parentNode;s&&(s.insertBefore(e,n),s.removeChild(n))}e._gsap.swappedIn=!1},No=function(e,n,t,r){if(!e._gsap.swappedIn){for(var s=ya.length,o=n.style,a=e.style,l;s--;)l=ya[s],o[l]=t[l];o.position=t.position==="absolute"?"absolute":"relative",t.display==="inline"&&(o.display="inline-block"),a[Va]=a[Ua]="auto",o.flexBasis=t.flexBasis||"auto",o.overflow="visible",o.boxSizing="border-box",o[Ar]=so(e,Ft)+lt,o[Rr]=so(e,ct)+lt,o[nt]=a[mn]=a[Ef]=a[Cf]="0",si(r),a[Ar]=a["max"+fi]=t[Ar],a[Rr]=a["max"+ja]=t[Rr],a[nt]=t[nt],e.parentNode!==n&&(e.parentNode.insertBefore(n,e),n.appendChild(e)),e._gsap.swappedIn=!0}},pg=/([A-Z])/g,si=function(e){if(e){var n=e.t.style,t=e.length,r=0,s,o;for((e.t._gsap||G.core.getCache(e.t)).uncache=1;r<t;r+=2)o=e[r+1],s=e[r],o?n[s]=o:n[s]&&n.removeProperty(s.replace(pg,"-$1").toLowerCase())}},Ms=function(e){for(var n=Hs.length,t=e.style,r=[],s=0;s<n;s++)r.push(Hs[s],t[Hs[s]]);return r.t=e,r},gg=function(e,n,t){for(var r=[],s=e.length,o=t?8:0,a;o<s;o+=2)a=e[o],r.push(a,a in n?n[a]:e[o+1]);return r.t=e.t,r},qs={left:0,top:0},Mc=function(e,n,t,r,s,o,a,l,c,u,h,d,f,g){Et(e)&&(e=e(l)),Zt(e)&&e.substr(0,3)==="max"&&(e=d+(e.charAt(4)==="="?Fs("0"+e.substr(3),t):0));var p=f?f.time():0,_,w,v;if(f&&f.seek(0),isNaN(e)||(e=+e),Li(e))f&&(e=G.utils.mapRange(f.scrollTrigger.start,f.scrollTrigger.end,0,d,e)),a&&Bs(a,t,r,!0);else{Et(n)&&(n=n(l));var k=(e||"0").split(" "),x,C,A,T;v=Bt(n,l)||be,x=Bn(v)||{},(!x||!x.left&&!x.top)&&_n(v).display==="none"&&(T=v.style.display,v.style.display="block",x=Bn(v),T?v.style.display=T:v.style.removeProperty("display")),C=Fs(k[0],x[r.d]),A=Fs(k[1]||"0",t),e=x[r.p]-c[r.p]-u+C+s-A,a&&Bs(a,A,r,t-A<20||a._isStart&&A>20),t-=t-A}if(g&&(l[g]=e||-.001,e<0&&(e=0)),o){var L=e+t,R=o._isStart;_="scroll"+r.d2,Bs(o,L,r,R&&L>20||!R&&(h?Math.max(be[_],nn[_]):o.parentNode[_])<=L+1),h&&(c=Bn(a),h&&(o.style[r.op.p]=c[r.op.p]-r.op.m-o._offset+lt))}return f&&v&&(_=Bn(v),f.seek(d),w=Bn(v),f._caScrollDist=_[r.p]-w[r.p],e=e/f._caScrollDist*d),f&&f.seek(p),f?e:Math.round(e)},mg=/(webkit|moz|length|cssText|inset)/i,Pc=function(e,n,t,r){if(e.parentNode!==n){var s=e.style,o,a;if(n===be){e._stOrig=s.cssText,a=_n(e);for(o in a)!+o&&!mg.test(o)&&a[o]&&typeof s[o]=="string"&&o!=="0"&&(s[o]=a[o]);s.top=t,s.left=r}else s.cssText=e._stOrig;G.core.getCache(e).uncache=1,n.appendChild(e)}},Df=function(e,n,t){var r=n,s=r;return function(o){var a=Math.round(e());return a!==r&&a!==s&&Math.abs(a-r)>3&&Math.abs(a-s)>3&&(o=a,t&&t()),s=r,r=Math.round(o),r}},Ps=function(e,n,t){var r={};r[n.p]="+="+t,G.set(e,r)},Ac=function(e,n){var t=cr(e,n),r="_scroll"+n.p2,s=function o(a,l,c,u,h){var d=o.tween,f=l.onComplete,g={};c=c||t();var p=Df(t,c,function(){d.kill(),o.tween=0});return h=u&&h||0,u=u||a-c,d&&d.kill(),l[r]=a,l.inherit=!1,l.modifiers=g,g[r]=function(){return p(c+u*d.ratio+h*d.ratio*d.ratio)},l.onUpdate=function(){le.cache++,o.tween&&qn()},l.onComplete=function(){o.tween=0,f&&f.call(d)},d=o.tween=G.to(e,l),d};return e[r]=t,t.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},pt(e,"wheel",t.wheelHandler),ce.isTouch&&pt(e,"touchmove",t.wheelHandler),s},ce=function(){function i(n,t){Wr||i.register(G)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),ga(this),this.init(n,t)}var e=i.prototype;return e.init=function(t,r){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!Ri){this.update=this.refresh=this.kill=Pn;return}t=Sc(Zt(t)||Li(t)||t.nodeType?{trigger:t}:t,Cs);var s=t,o=s.onUpdate,a=s.toggleClass,l=s.id,c=s.onToggle,u=s.onRefresh,h=s.scrub,d=s.trigger,f=s.pin,g=s.pinSpacing,p=s.invalidateOnRefresh,_=s.anticipatePin,w=s.onScrubComplete,v=s.onSnapComplete,k=s.once,x=s.snap,C=s.pinReparent,A=s.pinSpacer,T=s.containerAnimation,L=s.fastScrollEnd,R=s.preventOverlaps,P=t.horizontal||t.containerAnimation&&t.horizontal!==!1?Ft:ct,J=!h&&h!==0,m=Bt(t.scroller||ae),F=G.core.getCache(m),$=Dr(m),V=("pinType"in t?t.pinType:sr(m,"pinType")||$&&"fixed")==="fixed",K=[t.onEnter,t.onLeave,t.onEnterBack,t.onLeaveBack],B=J&&t.toggleActions.split(" "),M="markers"in t?t.markers:Cs.markers,O=$?0:parseFloat(_n(m)["border"+P.p2+fi])||0,b=this,X=t.onRefreshInit&&function(){return t.onRefreshInit(b)},ee=og(m,$,P),D=ag(m,$),U=0,I=0,N=0,Y=cr(m,P),ge,ye,qe,Ve,Te,q,j,je,Je,S,Ye,De,Le,de,ue,ze,ut,Se,Pt,Ie,mt,ft,At,me,_e,vt,it,Rt,Ut,Vt,jt,ie,xn,Ot,Ae,Lt,fn,hn,ht;if(b._startClamp=b._endClamp=!1,b._dir=P,_*=45,b.scroller=m,b.scroll=T?T.time.bind(T):Y,Ve=Y(),b.vars=t,r=r||t.animation,"refreshPriority"in t&&(bf=1,t.refreshPriority===-9999&&(Ui=b)),F.tweenScroll=F.tweenScroll||{top:Ac(m,ct),left:Ac(m,Ft)},b.tweenTo=ge=F.tweenScroll[P.p],b.scrubDuration=function(z){xn=Li(z)&&z,xn?ie?ie.duration(z):ie=G.to(r,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:xn,paused:!0,onComplete:function(){return w&&w(b)}}):(ie&&ie.progress(1).kill(),ie=0)},r&&(r.vars.lazy=!1,r._initted&&!b.isReverted||r.vars.immediateRender!==!1&&t.immediateRender!==!1&&r.duration()&&r.render(0,!0,!0),b.animation=r.pause(),r.scrollTrigger=b,b.scrubDuration(h),Vt=0,l||(l=r.vars.id)),x&&((!yr(x)||x.push)&&(x={snapTo:x}),"scrollBehavior"in be.style&&G.set($?[be,nn]:m,{scrollBehavior:"auto"}),le.forEach(function(z){return Et(z)&&z.target===($?xe.scrollingElement||nn:m)&&(z.smooth=!1)}),qe=Et(x.snapTo)?x.snapTo:x.snapTo==="labels"?cg(r):x.snapTo==="labelsDirectional"?ug(r):x.directional!==!1?function(z,ne){return Qa(x.snapTo)(z,Tt()-I<500?0:ne.direction)}:G.utils.snap(x.snapTo),Ot=x.duration||{min:.1,max:2},Ot=yr(Ot)?Gi(Ot.min,Ot.max):Gi(Ot,Ot),Ae=G.delayedCall(x.delay||xn/2||.1,function(){var z=Y(),ne=Tt()-I<500,W=ge.tween;if((ne||Math.abs(b.getVelocity())<10)&&!W&&!po&&U!==z){var te=(z-q)/de,Fe=r&&!J?r.totalProgress():te,se=ne?0:(Fe-jt)/(Tt()-Ai)*1e3||0,Re=G.utils.clamp(-te,1-te,Yr(se/2)*se/.185),Qe=te+(x.inertia===!1?0:Re),Ce,ve,pe=x,xt=pe.onStart,ke=pe.onInterrupt,wt=pe.onComplete;if(Ce=qe(Qe,b),Li(Ce)||(Ce=Qe),ve=Math.max(0,Math.round(q+Ce*de)),z<=j&&z>=q&&ve!==z){if(W&&!W._initted&&W.data<=Yr(ve-z))return;x.inertia===!1&&(Re=Ce-te),ge(ve,{duration:Ot(Yr(Math.max(Yr(Qe-Fe),Yr(Ce-Fe))*.185/se/.05||0)),ease:x.ease||"power3",data:Yr(ve-z),onInterrupt:function(){return Ae.restart(!0)&&ke&&qr(b,ke)},onComplete:function(){b.update(),U=Y(),r&&!J&&(ie?ie.resetTo("totalProgress",Ce,r._tTime/r._tDur):r.progress(Ce)),Vt=jt=r&&!J?r.totalProgress():b.progress,v&&v(b),wt&&qr(b,wt)}},z,Re*de,ve-z-Re*de),xt&&qr(b,xt,ge.tween)}}else b.isActive&&U!==z&&Ae.restart(!0)}).pause()),l&&(_a[l]=b),d=b.trigger=Bt(d||f!==!0&&f),ht=d&&d._gsap&&d._gsap.stRevert,ht&&(ht=ht(b)),f=f===!0?d:Bt(f),Zt(a)&&(a={targets:d,className:a}),f&&(g===!1||g===mn||(g=!g&&f.parentNode&&f.parentNode.style&&_n(f.parentNode).display==="flex"?!1:nt),b.pin=f,ye=G.core.getCache(f),ye.spacer?ue=ye.pinState:(A&&(A=Bt(A),A&&!A.nodeType&&(A=A.current||A.nativeElement),ye.spacerIsNative=!!A,A&&(ye.spacerState=Ms(A))),ye.spacer=Se=A||xe.createElement("div"),Se.classList.add("pin-spacer"),l&&Se.classList.add("pin-spacer-"+l),ye.pinState=ue=Ms(f)),t.force3D!==!1&&G.set(f,{force3D:!0}),b.spacer=Se=ye.spacer,Ut=_n(f),me=Ut[g+P.os2],Ie=G.getProperty(f),mt=G.quickSetter(f,P.a,lt),No(f,Se,Ut),ut=Ms(f)),M){De=yr(M)?Sc(M,kc):kc,S=Es("scroller-start",l,m,P,De,0),Ye=Es("scroller-end",l,m,P,De,0,S),Pt=S["offset"+P.op.d2];var Wn=Bt(sr(m,"content")||m);je=this.markerStart=Es("start",l,Wn,P,De,Pt,0,T),Je=this.markerEnd=Es("end",l,Wn,P,De,Pt,0,T),T&&(hn=G.quickSetter([je,Je],P.a,lt)),!V&&!(Dn.length&&sr(m,"fixedMarkers")===!0)&&(lg($?be:m),G.set([S,Ye],{force3D:!0}),vt=G.quickSetter(S,P.a,lt),Rt=G.quickSetter(Ye,P.a,lt))}if(T){var re=T.vars.onUpdate,Q=T.vars.onUpdateParams;T.eventCallback("onUpdate",function(){b.update(0,0,1),re&&re.apply(T,Q||[])})}if(b.previous=function(){return oe[oe.indexOf(b)-1]},b.next=function(){return oe[oe.indexOf(b)+1]},b.revert=function(z,ne){if(!ne)return b.kill(!0);var W=z!==!1||!b.enabled,te=kt;W!==b.isReverted&&(W&&(Lt=Math.max(Y(),b.scroll.rec||0),N=b.progress,fn=r&&r.progress()),je&&[je,Je,S,Ye].forEach(function(Fe){return Fe.style.display=W?"none":"block"}),W&&(kt=b,b.update(W)),f&&(!C||!b.isActive)&&(W?dg(f,Se,ue):No(f,Se,_n(f),_e)),W||b.update(W),kt=te,b.isReverted=W)},b.refresh=function(z,ne,W,te){if(!((kt||!b.enabled)&&!ne)){if(f&&z&&vn){pt(i,"scrollEnd",Pf);return}!Nt&&X&&X(b),kt=b,ge.tween&&!W&&(ge.tween.kill(),ge.tween=0),ie&&ie.pause(),p&&r&&(r.revert({kill:!1}).invalidate(),r.getChildren?r.getChildren(!0,!0,!1).forEach(function(St){return St.vars.immediateRender&&St.render(0,!0,!0)}):r.vars.immediateRender&&r.render(0,!0,!0)),b.isReverted||b.revert(!0,!0),b._subPinOffset=!1;var Fe=ee(),se=D(),Re=T?T.duration():Ln(m,P),Qe=de<=.01||!de,Ce=0,ve=te||0,pe=yr(W)?W.end:t.end,xt=t.endTrigger||d,ke=yr(W)?W.start:t.start||(t.start===0||!d?0:f?"0 0":"0 100%"),wt=b.pinnedContainer=t.pinnedContainer&&Bt(t.pinnedContainer,b),et=d&&Math.max(0,oe.indexOf(b))||0,tt=et,Ee,st,Tn,fr,ot,Xe,dn,Nr,os,In,_t,Qt,hr;for(M&&yr(W)&&(Qt=G.getProperty(S,P.p),hr=G.getProperty(Ye,P.p));tt-- >0;)Xe=oe[tt],Xe.end||Xe.refresh(0,1)||(kt=b),dn=Xe.pin,dn&&(dn===d||dn===f||dn===wt)&&!Xe.isReverted&&(In||(In=[]),In.unshift(Xe),Xe.revert(!0,!0)),Xe!==oe[tt]&&(et--,tt--);for(Et(ke)&&(ke=ke(b)),ke=yc(ke,"start",b),q=Mc(ke,d,Fe,P,Y(),je,S,b,se,O,V,Re,T,b._startClamp&&"_startClamp")||(f?-.001:0),Et(pe)&&(pe=pe(b)),Zt(pe)&&!pe.indexOf("+=")&&(~pe.indexOf(" ")?pe=(Zt(ke)?ke.split(" ")[0]:"")+pe:(Ce=Fs(pe.substr(2),Fe),pe=Zt(ke)?ke:(T?G.utils.mapRange(0,T.duration(),T.scrollTrigger.start,T.scrollTrigger.end,q):q)+Ce,xt=d)),pe=yc(pe,"end",b),j=Math.max(q,Mc(pe||(xt?"100% 0":Re),xt,Fe,P,Y()+Ce,Je,Ye,b,se,O,V,Re,T,b._endClamp&&"_endClamp"))||-.001,Ce=0,tt=et;tt--;)Xe=oe[tt]||{},dn=Xe.pin,dn&&Xe.start-Xe._pinPush<=q&&!T&&Xe.end>0&&(Ee=Xe.end-(b._startClamp?Math.max(0,Xe.start):Xe.start),(dn===d&&Xe.start-Xe._pinPush<q||dn===wt)&&isNaN(ke)&&(Ce+=Ee*(1-Xe.progress)),dn===f&&(ve+=Ee));if(q+=Ce,j+=Ce,b._startClamp&&(b._startClamp+=Ce),b._endClamp&&!Nt&&(b._endClamp=j||-.001,j=Math.min(j,Ln(m,P))),de=j-q||(q-=.01)&&.001,Qe&&(N=G.utils.clamp(0,1,G.utils.normalize(q,j,Lt))),b._pinPush=ve,je&&Ce&&(Ee={},Ee[P.a]="+="+Ce,wt&&(Ee[P.p]="-="+Y()),G.set([je,Je],Ee)),f&&!(ma&&b.end>=Ln(m,P)))Ee=_n(f),fr=P===ct,Tn=Y(),ft=parseFloat(Ie(P.a))+ve,!Re&&j>1&&(_t=($?xe.scrollingElement||nn:m).style,_t={style:_t,value:_t["overflow"+P.a.toUpperCase()]},$&&_n(be)["overflow"+P.a.toUpperCase()]!=="scroll"&&(_t.style["overflow"+P.a.toUpperCase()]="scroll")),No(f,Se,Ee),ut=Ms(f),st=Bn(f,!0),Nr=V&&cr(m,fr?Ft:ct)(),g?(_e=[g+P.os2,de+ve+lt],_e.t=Se,tt=g===nt?so(f,P)+de+ve:0,tt&&(_e.push(P.d,tt+lt),Se.style.flexBasis!=="auto"&&(Se.style.flexBasis=tt+lt)),si(_e),wt&&oe.forEach(function(St){St.pin===wt&&St.vars.pinSpacing!==!1&&(St._subPinOffset=!0)}),V&&Y(Lt)):(tt=so(f,P),tt&&Se.style.flexBasis!=="auto"&&(Se.style.flexBasis=tt+lt)),V&&(ot={top:st.top+(fr?Tn-q:Nr)+lt,left:st.left+(fr?Nr:Tn-q)+lt,boxSizing:"border-box",position:"fixed"},ot[Ar]=ot["max"+fi]=Math.ceil(st.width)+lt,ot[Rr]=ot["max"+ja]=Math.ceil(st.height)+lt,ot[mn]=ot[mn+Xi]=ot[mn+qi]=ot[mn+Wi]=ot[mn+Yi]="0",ot[nt]=Ee[nt],ot[nt+Xi]=Ee[nt+Xi],ot[nt+qi]=Ee[nt+qi],ot[nt+Wi]=Ee[nt+Wi],ot[nt+Yi]=Ee[nt+Yi],ze=gg(ue,ot,C),Nt&&Y(0)),r?(os=r._initted,Do(1),r.render(r.duration(),!0,!0),At=Ie(P.a)-ft+de+ve,it=Math.abs(de-At)>1,V&&it&&ze.splice(ze.length-2,2),r.render(0,!0,!0),os||r.invalidate(!0),r.parent||r.totalTime(r.totalTime()),Do(0)):At=de,_t&&(_t.value?_t.style["overflow"+P.a.toUpperCase()]=_t.value:_t.style.removeProperty("overflow-"+P.a));else if(d&&Y()&&!T)for(st=d.parentNode;st&&st!==be;)st._pinOffset&&(q-=st._pinOffset,j-=st._pinOffset),st=st.parentNode;In&&In.forEach(function(St){return St.revert(!1,!0)}),b.start=q,b.end=j,Ve=Te=Nt?Lt:Y(),!T&&!Nt&&(Ve<Lt&&Y(Lt),b.scroll.rec=0),b.revert(!1,!0),I=Tt(),Ae&&(U=-1,Ae.restart(!0)),kt=0,r&&J&&(r._initted||fn)&&r.progress()!==fn&&r.progress(fn||0,!0).render(r.time(),!0,!0),(Qe||N!==b.progress||T||p||r&&!r._initted)&&(r&&!J&&(r._initted||N||r.vars.immediateRender!==!1)&&r.totalProgress(T&&q<-.001&&!N?G.utils.normalize(q,j,0):N,!0),b.progress=Qe||(Ve-q)/de===N?0:N),f&&g&&(Se._pinOffset=Math.round(b.progress*At)),ie&&ie.invalidate(),isNaN(Qt)||(Qt-=G.getProperty(S,P.p),hr-=G.getProperty(Ye,P.p),Ps(S,P,Qt),Ps(je,P,Qt-(te||0)),Ps(Ye,P,hr),Ps(Je,P,hr-(te||0))),Qe&&!Nt&&b.update(),u&&!Nt&&!Le&&(Le=!0,u(b),Le=!1)}},b.getVelocity=function(){return(Y()-Te)/(Tt()-Ai)*1e3||0},b.endAnimation=function(){Ti(b.callbackAnimation),r&&(ie?ie.progress(1):r.paused()?J||Ti(r,b.direction<0,1):Ti(r,r.reversed()))},b.labelToScroll=function(z){return r&&r.labels&&(q||b.refresh()||q)+r.labels[z]/r.duration()*de||0},b.getTrailing=function(z){var ne=oe.indexOf(b),W=b.direction>0?oe.slice(0,ne).reverse():oe.slice(ne+1);return(Zt(z)?W.filter(function(te){return te.vars.preventOverlaps===z}):W).filter(function(te){return b.direction>0?te.end<=q:te.start>=j})},b.update=function(z,ne,W){if(!(T&&!W&&!z)){var te=Nt===!0?Lt:b.scroll(),Fe=z?0:(te-q)/de,se=Fe<0?0:Fe>1?1:Fe||0,Re=b.progress,Qe,Ce,ve,pe,xt,ke,wt,et;if(ne&&(Te=Ve,Ve=T?Y():te,x&&(jt=Vt,Vt=r&&!J?r.totalProgress():se)),_&&f&&!kt&&!ws&&vn&&(!se&&q<te+(te-Te)/(Tt()-Ai)*_?se=1e-4:se===1&&j>te+(te-Te)/(Tt()-Ai)*_&&(se=.9999)),se!==Re&&b.enabled){if(Qe=b.isActive=!!se&&se<1,Ce=!!Re&&Re<1,ke=Qe!==Ce,xt=ke||!!se!=!!Re,b.direction=se>Re?1:-1,b.progress=se,xt&&!kt&&(ve=se&&!Re?0:se===1?1:Re===1?2:3,J&&(pe=!ke&&B[ve+1]!=="none"&&B[ve+1]||B[ve],et=r&&(pe==="complete"||pe==="reset"||pe in r))),R&&(ke||et)&&(et||h||!r)&&(Et(R)?R(b):b.getTrailing(R).forEach(function(Tn){return Tn.endAnimation()})),J||(ie&&!kt&&!ws?(ie._dp._time-ie._start!==ie._time&&ie.render(ie._dp._time-ie._start),ie.resetTo?ie.resetTo("totalProgress",se,r._tTime/r._tDur):(ie.vars.totalProgress=se,ie.invalidate().restart())):r&&r.totalProgress(se,!!(kt&&(I||z)))),f){if(z&&g&&(Se.style[g+P.os2]=me),!V)mt(Oi(ft+At*se));else if(xt){if(wt=!z&&se>Re&&j+1>te&&te+1>=Ln(m,P),C)if(!z&&(Qe||wt)){var tt=Bn(f,!0),Ee=te-q;Pc(f,be,tt.top+(P===ct?Ee:0)+lt,tt.left+(P===ct?0:Ee)+lt)}else Pc(f,Se);si(Qe||wt?ze:ut),it&&se<1&&Qe||mt(ft+(se===1&&!wt?At:0))}}x&&!ge.tween&&!kt&&!ws&&Ae.restart(!0),a&&(ke||k&&se&&(se<1||!zo))&&rs(a.targets).forEach(function(Tn){return Tn.classList[Qe||k?"add":"remove"](a.className)}),o&&!J&&!z&&o(b),xt&&!kt?(J&&(et&&(pe==="complete"?r.pause().totalProgress(1):pe==="reset"?r.restart(!0).pause():pe==="restart"?r.restart(!0):r[pe]()),o&&o(b)),(ke||!zo)&&(c&&ke&&qr(b,c),K[ve]&&qr(b,K[ve]),k&&(se===1?b.kill(!1,1):K[ve]=0),ke||(ve=se===1?1:3,K[ve]&&qr(b,K[ve]))),L&&!Qe&&Math.abs(b.getVelocity())>(Li(L)?L:2500)&&(Ti(b.callbackAnimation),ie?ie.progress(1):Ti(r,pe==="reverse"?1:!se,1))):J&&o&&!kt&&o(b)}if(Rt){var st=T?te/T.duration()*(T._caScrollDist||0):te;vt(st+(S._isFlipped?1:0)),Rt(st)}hn&&hn(-te/T.duration()*(T._caScrollDist||0))}},b.enable=function(z,ne){b.enabled||(b.enabled=!0,pt(m,"resize",Di),$||pt(m,"scroll",Xr),X&&pt(i,"refreshInit",X),z!==!1&&(b.progress=N=0,Ve=Te=U=Y()),ne!==!1&&b.refresh())},b.getTween=function(z){return z&&ge?ge.tween:ie},b.setPositions=function(z,ne,W,te){if(T){var Fe=T.scrollTrigger,se=T.duration(),Re=Fe.end-Fe.start;z=Fe.start+Re*z/se,ne=Fe.start+Re*ne/se}b.refresh(!1,!1,{start:vc(z,W&&!!b._startClamp),end:vc(ne,W&&!!b._endClamp)},te),b.update()},b.adjustPinSpacing=function(z){if(_e&&z){var ne=_e.indexOf(P.d)+1;_e[ne]=parseFloat(_e[ne])+z+lt,_e[1]=parseFloat(_e[1])+z+lt,si(_e)}},b.disable=function(z,ne){if(z!==!1&&b.revert(!0,!0),b.enabled&&(b.enabled=b.isActive=!1,ne||ie&&ie.pause(),Lt=0,ye&&(ye.uncache=1),X&&dt(i,"refreshInit",X),Ae&&(Ae.pause(),ge.tween&&ge.tween.kill()&&(ge.tween=0)),!$)){for(var W=oe.length;W--;)if(oe[W].scroller===m&&oe[W]!==b)return;dt(m,"resize",Di),$||dt(m,"scroll",Xr)}},b.kill=function(z,ne){b.disable(z,ne),ie&&!ne&&ie.kill(),l&&delete _a[l];var W=oe.indexOf(b);W>=0&&oe.splice(W,1),W===$t&&Gs>0&&$t--,W=0,oe.forEach(function(te){return te.scroller===b.scroller&&(W=1)}),W||Nt||(b.scroll.rec=0),r&&(r.scrollTrigger=null,z&&r.revert({kill:!1}),ne||r.kill()),je&&[je,Je,S,Ye].forEach(function(te){return te.parentNode&&te.parentNode.removeChild(te)}),Ui===b&&(Ui=0),f&&(ye&&(ye.uncache=1),W=0,oe.forEach(function(te){return te.pin===f&&W++}),W||(ye.spacer=0)),t.onKill&&t.onKill(b)},oe.push(b),b.enable(!1,!1),ht&&ht(b),r&&r.add&&!de){var he=b.update;b.update=function(){b.update=he,le.cache++,q||j||b.refresh()},G.delayedCall(.01,b.update),de=.01,q=j=0}else b.refresh();f&&hg()},i.register=function(t){return Wr||(G=t||Sf(),wf()&&window.document&&i.enable(),Wr=Ri),Wr},i.defaults=function(t){if(t)for(var r in t)Cs[r]=t[r];return Cs},i.disable=function(t,r){Ri=0,oe.forEach(function(o){return o[r?"kill":"disable"](t)}),dt(ae,"wheel",Xr),dt(xe,"scroll",Xr),clearInterval(xs),dt(xe,"touchcancel",Pn),dt(be,"touchstart",Pn),ks(dt,xe,"pointerdown,touchstart,mousedown",xc),ks(dt,xe,"pointerup,touchend,mouseup",wc),io.kill(),Ss(dt);for(var s=0;s<le.length;s+=3)Ts(dt,le[s],le[s+1]),Ts(dt,le[s],le[s+2])},i.enable=function(){if(ae=window,xe=document,nn=xe.documentElement,be=xe.body,G){if(rs=G.utils.toArray,Gi=G.utils.clamp,ga=G.core.context||Pn,Do=G.core.suppressOverwrites||Pn,Xa=ae.history.scrollRestoration||"auto",ba=ae.pageYOffset||0,G.core.globals("ScrollTrigger",i),be){Ri=1,ii=document.createElement("div"),ii.style.height="100vh",ii.style.position="absolute",Lf(),sg(),Ze.register(G),i.isTouch=Ze.isTouch,jn=Ze.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),pa=Ze.isTouch===1,pt(ae,"wheel",Xr),Ya=[ae,xe,nn,be],G.matchMedia?(i.matchMedia=function(u){var h=G.matchMedia(),d;for(d in u)h.add(d,u[d]);return h},G.addEventListener("matchMediaInit",function(){Rf(),Ka()}),G.addEventListener("matchMediaRevert",function(){return Af()}),G.addEventListener("matchMedia",function(){Sr(0,1),Ir("matchMedia")}),G.matchMedia().add("(orientation: portrait)",function(){return $o(),$o})):console.warn("Requires GSAP 3.11.0 or later"),$o(),pt(xe,"scroll",Xr);var t=be.hasAttribute("style"),r=be.style,s=r.borderTopStyle,o=G.core.Animation.prototype,a,l;for(o.revert||Object.defineProperty(o,"revert",{value:function(){return this.time(-.01,!0)}}),r.borderTopStyle="solid",a=Bn(be),ct.m=Math.round(a.top+ct.sc())||0,Ft.m=Math.round(a.left+Ft.sc())||0,s?r.borderTopStyle=s:r.removeProperty("border-top-style"),t||(be.setAttribute("style",""),be.removeAttribute("style")),xs=setInterval(Tc,250),G.delayedCall(.5,function(){return ws=0}),pt(xe,"touchcancel",Pn),pt(be,"touchstart",Pn),ks(pt,xe,"pointerdown,touchstart,mousedown",xc),ks(pt,xe,"pointerup,touchend,mouseup",wc),da=G.utils.checkPrefix("transform"),Hs.push(da),Wr=Tt(),io=G.delayedCall(.2,Sr).pause(),Ur=[xe,"visibilitychange",function(){var u=ae.innerWidth,h=ae.innerHeight;xe.hidden?(_c=u,bc=h):(_c!==u||bc!==h)&&Di()},xe,"DOMContentLoaded",Sr,ae,"load",Sr,ae,"resize",Di],Ss(pt),oe.forEach(function(u){return u.enable(0,1)}),l=0;l<le.length;l+=3)Ts(dt,le[l],le[l+1]),Ts(dt,le[l],le[l+2])}else if(xe){var c=function u(){i.enable(),xe.removeEventListener("DOMContentLoaded",u)};xe.addEventListener("DOMContentLoaded",c)}}},i.config=function(t){"limitCallbacks"in t&&(zo=!!t.limitCallbacks);var r=t.syncInterval;r&&clearInterval(xs)||(xs=r)&&setInterval(Tc,r),"ignoreMobileResize"in t&&(pa=i.isTouch===1&&t.ignoreMobileResize),"autoRefreshEvents"in t&&(Ss(dt)||Ss(pt,t.autoRefreshEvents||"none"),yf=(t.autoRefreshEvents+"").indexOf("resize")===-1)},i.scrollerProxy=function(t,r){var s=Bt(t),o=le.indexOf(s),a=Dr(s);~o&&le.splice(o,a?6:2),r&&(a?Dn.unshift(ae,r,be,r,nn,r):Dn.unshift(s,r))},i.clearMatchMedia=function(t){oe.forEach(function(r){return r._ctx&&r._ctx.query===t&&r._ctx.kill(!0,!0)})},i.isInViewport=function(t,r,s){var o=(Zt(t)?Bt(t):t).getBoundingClientRect(),a=o[s?Ar:Rr]*r||0;return s?o.right-a>0&&o.left+a<ae.innerWidth:o.bottom-a>0&&o.top+a<ae.innerHeight},i.positionInViewport=function(t,r,s){Zt(t)&&(t=Bt(t));var o=t.getBoundingClientRect(),a=o[s?Ar:Rr],l=r==null?a/2:r in oo?oo[r]*a:~r.indexOf("%")?parseFloat(r)*a/100:parseFloat(r)||0;return s?(o.left+l)/ae.innerWidth:(o.top+l)/ae.innerHeight},i.killAll=function(t){if(oe.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),t!==!0){var r=zr.killAll||[];zr={},r.forEach(function(s){return s()})}},i}();ce.version="3.15.0";ce.saveStyles=function(i){return i?rs(i).forEach(function(e){if(e&&e.style){var n=Kt.indexOf(e);n>=0&&Kt.splice(n,5),Kt.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),G.core.getCache(e),ga())}}):Kt};ce.revert=function(i,e){return Ka(!i,e)};ce.create=function(i,e){return new ce(i,e)};ce.refresh=function(i){return i?Di(!0):(Wr||ce.register())&&Sr(!0)};ce.update=function(i){return++le.cache&&qn(i===!0?2:0)};ce.clearScrollMemory=Of;ce.maxScroll=function(i,e){return Ln(i,e?Ft:ct)};ce.getScrollFunc=function(i,e){return cr(Bt(i),e?Ft:ct)};ce.getById=function(i){return _a[i]};ce.getAll=function(){return oe.filter(function(i){return i.vars.id!=="ScrollSmoother"})};ce.isScrolling=function(){return!!vn};ce.snapDirectional=Qa;ce.addEventListener=function(i,e){var n=zr[i]||(zr[i]=[]);~n.indexOf(e)||n.push(e)};ce.removeEventListener=function(i,e){var n=zr[i],t=n&&n.indexOf(e);t>=0&&n.splice(t,1)};ce.batch=function(i,e){var n=[],t={},r=e.interval||.016,s=e.batchMax||1e9,o=function(c,u){var h=[],d=[],f=G.delayedCall(r,function(){u(h,d),h=[],d=[]}).pause();return function(g){h.length||f.restart(!0),h.push(g.trigger),d.push(g),s<=h.length&&f.progress(1)}},a;for(a in e)t[a]=a.substr(0,2)==="on"&&Et(e[a])&&a!=="onRefreshInit"?o(a,e[a]):e[a];return Et(s)&&(s=s(),pt(ce,"refresh",function(){return s=e.batchMax()})),rs(i).forEach(function(l){var c={};for(a in t)c[a]=t[a];c.trigger=l,n.push(ce.create(c))}),n};var Rc=function(e,n,t,r){return n>r?e(r):n<0&&e(0),t>r?(r-n)/(t-n):t<0?n/(n-t):1},Fo=function i(e,n){n===!0?e.style.removeProperty("touch-action"):e.style.touchAction=n===!0?"auto":n?"pan-"+n+(Ze.isTouch?" pinch-zoom":""):"none",e===nn&&i(be,n)},As={auto:1,scroll:1},_g=function(e){var n=e.event,t=e.target,r=e.axis,s=(n.changedTouches?n.changedTouches[0]:n).target,o=s._gsap||G.core.getCache(s),a=Tt(),l;if(!o._isScrollT||a-o._isScrollT>2e3){for(;s&&s!==be&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(As[(l=_n(s)).overflowY]||As[l.overflowX]));)s=s.parentNode;o._isScroll=s&&s!==t&&!Dr(s)&&(As[(l=_n(s)).overflowY]||As[l.overflowX]),o._isScrollT=a}(o._isScroll||r==="x")&&(n.stopPropagation(),n._gsapAllow=!0)},zf=function(e,n,t,r){return Ze.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:n,onWheel:r=r&&_g,onPress:r,onDrag:r,onScroll:r,onEnable:function(){return t&&pt(xe,Ze.eventTypes[0],Lc,!1,!0)},onDisable:function(){return dt(xe,Ze.eventTypes[0],Lc,!0)}})},bg=/(input|label|select|textarea)/i,Oc,Lc=function(e){var n=bg.test(e.target.tagName);(n||Oc)&&(e._gsapAllow=!0,Oc=n)},yg=function(e){yr(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var n=e,t=n.normalizeScrollX,r=n.momentum,s=n.allowNestedScroll,o=n.onRelease,a,l,c=Bt(e.target)||nn,u=G.core.globals().ScrollSmoother,h=u&&u.get(),d=jn&&(e.content&&Bt(e.content)||h&&e.content!==!1&&!h.smooth()&&h.content()),f=cr(c,ct),g=cr(c,Ft),p=1,_=(Ze.isTouch&&ae.visualViewport?ae.visualViewport.scale*ae.visualViewport.width:ae.outerWidth)/ae.innerWidth,w=0,v=Et(r)?function(){return r(a)}:function(){return r||2.8},k,x,C=zf(c,e.type,!0,s),A=function(){return x=!1},T=Pn,L=Pn,R=function(){l=Ln(c,ct),L=Gi(jn?1:0,l),t&&(T=Gi(0,Ln(c,Ft))),k=Or},P=function(){d._gsap.y=Oi(parseFloat(d._gsap.y)+f.offset)+"px",d.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(d._gsap.y)+", 0, 1)",f.offset=f.cacheID=0},J=function(){if(x){requestAnimationFrame(A);var M=Oi(a.deltaY/2),O=L(f.v-M);if(d&&O!==f.v+f.offset){f.offset=O-f.v;var b=Oi((parseFloat(d&&d._gsap.y)||0)-f.offset);d.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+b+", 0, 1)",d._gsap.y=b+"px",f.cacheID=le.cache,qn()}return!0}f.offset&&P(),x=!0},m,F,$,V,K=function(){R(),m.isActive()&&m.vars.scrollY>l&&(f()>l?m.progress(1)&&f(l):m.resetTo("scrollY",l))};return d&&G.set(d,{y:"+=0"}),e.ignoreCheck=function(B){return jn&&B.type==="touchmove"&&J()||p>1.05&&B.type!=="touchstart"||a.isGesturing||B.touches&&B.touches.length>1},e.onPress=function(){x=!1;var B=p;p=Oi((ae.visualViewport&&ae.visualViewport.scale||1)/_),m.pause(),B!==p&&Fo(c,p>1.01?!0:t?!1:"x"),F=g(),$=f(),R(),k=Or},e.onRelease=e.onGestureStart=function(B,M){if(f.offset&&P(),!M)V.restart(!0);else{le.cache++;var O=v(),b,X;t&&(b=g(),X=b+O*.05*-B.velocityX/.227,O*=Rc(g,b,X,Ln(c,Ft)),m.vars.scrollX=T(X)),b=f(),X=b+O*.05*-B.velocityY/.227,O*=Rc(f,b,X,Ln(c,ct)),m.vars.scrollY=L(X),m.invalidate().duration(O).play(.01),(jn&&m.vars.scrollY>=l||b>=l-1)&&G.to({},{onUpdate:K,duration:O})}o&&o(B)},e.onWheel=function(){m._ts&&m.pause(),Tt()-w>1e3&&(k=0,w=Tt())},e.onChange=function(B,M,O,b,X){if(Or!==k&&R(),M&&t&&g(T(b[2]===M?F+(B.startX-B.x):g()+M-b[1])),O){f.offset&&P();var ee=X[2]===O,D=ee?$+B.startY-B.y:f()+O-X[1],U=L(D);ee&&D!==U&&($+=U-D),f(U)}(O||M)&&qn()},e.onEnable=function(){Fo(c,t?!1:"x"),ce.addEventListener("refresh",K),pt(ae,"resize",K),f.smooth&&(f.target.style.scrollBehavior="auto",f.smooth=g.smooth=!1),C.enable()},e.onDisable=function(){Fo(c,!0),dt(ae,"resize",K),ce.removeEventListener("refresh",K),C.kill()},e.lockAxis=e.lockAxis!==!1,a=new Ze(e),a.iOS=jn,jn&&!f()&&f(1),jn&&G.ticker.add(Pn),V=a._dc,m=G.to(a,{ease:"power4",paused:!0,inherit:!1,scrollX:t?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:Df(f,f(),function(){return m.pause()})},onUpdate:qn,onComplete:V.vars.onComplete}),a};ce.sort=function(i){if(Et(i))return oe.sort(i);var e=ae.pageYOffset||0;return ce.getAll().forEach(function(n){return n._sortY=n.trigger?e+n.trigger.getBoundingClientRect().top:n.start+ae.innerHeight}),oe.sort(i||function(n,t){return(n.vars.refreshPriority||0)*-1e6+(n.vars.containerAnimation?1e6:n._sortY)-((t.vars.containerAnimation?1e6:t._sortY)+(t.vars.refreshPriority||0)*-1e6)})};ce.observe=function(i){return new Ze(i)};ce.normalizeScroll=function(i){if(typeof i>"u")return It;if(i===!0&&It)return It.enable();if(i===!1){It&&It.kill(),It=i;return}var e=i instanceof Ze?i:yg(i);return It&&It.target===e.target&&It.kill(),Dr(e.target)&&(It=e),e};ce.core={_getVelocityProp:ha,_inputObserver:zf,_scrollers:le,_proxies:Dn,bridge:{ss:function(){vn||Ir("scrollStart"),vn=Tt()},ref:function(){return kt}}};Sf()&&G.registerPlugin(ce);On.registerPlugin(ce);const Dc=Object.assign({"./chapters/ch1.ts":ld,"./chapters/ch2.ts":Xp,"./chapters/ch3.ts":i0,"./chapters/ch4.ts":d0,"./chapters/ch5.ts":A0,"./chapters/ch6.ts":B0,"./chapters/ch7.ts":V0,"./chapters/ch8.ts":eg}),vg=Object.keys(Dc).map(i=>{const e=i.match(/\/(ch\d+)\.ts$/);return e?{id:e[1],num:parseInt(e[1].slice(2),10),create:Dc[i].createChapter}:null}).filter(i=>i!==null).sort((i,e)=>i.num-e.num);function xg(i,e){const n=[],t=[];return vg.forEach((r,s)=>{const o=document.getElementById(r.id);if(!o)throw new Error(`缺少章节容器 #${r.id}（检查 index.html）`);const a=Mp[r.id];if(!a)throw new Error(`COPY 缺少 ${r.id} 文案`);const l=r.create({sky:i,root:o,copy:a,id:r.id});n.push(l),t.push(ce.create({trigger:o,start:"top top",end:"bottom bottom",scrub:!0,onEnter:()=>l.enter(),onEnterBack:()=>l.enter(),onLeave:()=>l.exit(),onLeaveBack:()=>l.exit(),onUpdate:c=>{l.update(c.progress),e(s+c.progress)}}))}),{chapters:n,triggers:t}}const ao=30,zc=.22,wg=`
.app-cursor-ring, .app-cursor-dot {
  position: fixed; top: 0; left: 0; z-index: 60; pointer-events: none;
  border-radius: 50%; transform: translate(-50%, -50%);
  will-change: transform;
}
.app-cursor-ring {
  width: ${ao}px; height: ${ao}px;
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
`;function Sg(i){if(window.matchMedia("(pointer: coarse)").matches)return;const e=document.createElement("style");e.textContent=wg,document.head.appendChild(e);const n=document.createElement("div");n.className="app-cursor-ring app-cursor-hidden";const t=document.createElement("div");t.className="app-cursor-dot app-cursor-hidden",document.body.append(n,t);let r=-100,s=-100,o=-100,a=-100,l=!1,c=!1;const u=document.querySelector(".sky-tooltip");window.addEventListener("pointermove",f=>{const g=f.target===i;r=f.clientX,s=f.clientY,g!==l&&(l=g,n.classList.toggle("app-cursor-hidden",!l),t.classList.toggle("app-cursor-hidden",!l))}),window.addEventListener("pointerdown",()=>{c=!0,n.classList.add("is-down")}),window.addEventListener("pointerup",()=>{c=!1,n.classList.remove("is-down")}),document.documentElement.addEventListener("mouseleave",()=>{l=!1,n.classList.add("app-cursor-hidden"),t.classList.add("app-cursor-hidden")});let h=1;const d=()=>{o+=(r-o)*zc,a+=(s-a)*zc;const f=u!==null&&u.style.display==="block",g=(f?.55:1)*(c?.8:1);h+=(g-h)*.2,n.classList.toggle("is-star",f),n.style.transform=`translate(${o-ao/2}px, ${a-ao/2}px) scale(${h.toFixed(3)})`,t.style.transform=`translate(${r-2}px, ${s-2}px)`,requestAnimationFrame(d)};requestAnimationFrame(d)}const kg=1.015,Ic={ra:192.8595,dec:27.1283},$c={ra:266.405,dec:-28.9362},Tg=.085,Cg=.14,Eg=.9,Mg=.6,Pg=new Yc(.96,.9,.78),Ag=new Yc(1,.88,.68),Rg=`
varying vec3 vDir;
void main() {
  // 球心在原点：物体空间坐标即天球方向（随父组岁差旋转，与星点行为一致）
  vDir = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,Og=`
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
`;function Lg(i){const e=new Oe(...kn(Ic.ra,Ic.dec)).normalize(),n=new Oe(...kn($c.ra,$c.dec)),t=n.addScaledVector(e,-n.dot(e)).normalize(),r=new Oe().crossVectors(e,t).normalize(),s=new kh(i*kg,96,64),o=new Th({vertexShader:Rg,fragmentShader:Og,uniforms:{uPole:{value:e},uE0:{value:t},uE1:{value:r},uPeakAlpha:{value:Tg},uWidth:{value:Cg},uCenterSigma:{value:Eg},uDust:{value:Mg},uColorBand:{value:Pg},uColorCore:{value:Ag}},transparent:!0,depthWrite:!1,blending:qc,side:Ch}),a=new Ys(s,o);a.name="milkyway-shell";const l=new Fn;return l.name="milkyway",l.add(a),{group:l,dispose(){s.dispose(),o.dispose()}}}function If(){document.fullscreenEnabled&&(document.fullscreenElement?Promise.resolve(document.exitFullscreen()).catch(()=>{}):Promise.resolve(document.documentElement.requestFullscreen()).catch(()=>{}))}const Dg=`
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
`;function zg({sections:i,names:e}){const n=document.createElement("style");n.textContent=Dg,document.head.appendChild(n);const t=document.createElement("div");t.className="app-pager";const r=document.createElement("button");r.className="app-pager-btn",r.type="button",r.setAttribute("aria-label","上一章"),r.textContent="‹";const s=document.createElement("span");s.className="app-pager-idx";const o=document.createElement("button");if(o.className="app-pager-btn",o.type="button",o.setAttribute("aria-label","下一章"),o.textContent="›",document.fullscreenEnabled){const d=document.createElement("button");d.className="app-pager-btn",d.type="button";const f=()=>{const g=!!document.fullscreenElement;d.textContent=g?"✕":"⛶",d.setAttribute("aria-label",g?"退出全屏（F）":"进入全屏（F）")};d.addEventListener("click",If),document.addEventListener("fullscreenchange",f),f(),t.append(r,s,o,d)}else t.append(r,s,o);document.body.appendChild(t);const a=i.length-1;let l=0;function c(){const d=window.innerHeight,f=[];for(const g of i){const p=g.offsetTop,_=Math.max(g.offsetHeight-d,0),w=Math.round(_/d);for(let v=0;v<=w;v++)f.push(p+Math.min(v*d,_))}return f.sort((g,p)=>g-p)}function u(){s.textContent=e[l]?`${e[l]} · ${l+1}/${i.length}`:`${l+1}/${i.length}`;const d=document.documentElement.scrollHeight-window.innerHeight;r.disabled=window.scrollY<=2,o.disabled=window.scrollY>=d-2}function h(d){const f=c(),g=window.scrollY,p=2,_=d>0?f.find(w=>w>g+p)??f[f.length-1]:[...f].reverse().find(w=>w<g-p)??0;_!==void 0&&window.scrollTo({top:_,behavior:"smooth"})}return r.addEventListener("click",()=>h(-1)),o.addEventListener("click",()=>h(1)),window.addEventListener("scroll",u,{passive:!0}),u(),{setCurrent(d){const f=Math.min(Math.max(Math.round(d),0),a);f!==l&&(l=f,u())}}}const Ig=3.5;function $g(){try{const i=document.createElement("canvas");return!!(i.getContext("webgl2")||i.getContext("webgl"))}catch{return!1}}function Nc(i){var t,r,s;const e=document.getElementById("fallback");e&&(e.hidden=!1);const n=document.getElementById("fallback-diag");n&&(n.textContent=`诊断信息：${i}`),(t=document.getElementById("chapters"))==null||t.setAttribute("hidden",""),(r=document.getElementById("sky-canvas"))==null||r.setAttribute("hidden",""),(s=document.getElementById("loading"))==null||s.remove()}async function Ng(){const i=document.getElementById("sky-canvas");if(!i)throw new Error("缺少 #sky-canvas");const e=new la(i);Sg(i);const n=document.getElementById("loading");try{await e.init()}catch(u){console.error(u),n&&(n.textContent="星空数据加载失败，请检查开发服务器");return}n==null||n.remove(),e.addSkyObject(Lg(we).group),Jh();const t=new Xs(rd),r=[1,2,3,4,5,6,7,8].map(u=>document.getElementById(`ch${u}`)),s=["序","星野","授时","天人","天球","岁差","对话","尾声"],o=zg({sections:r,names:s});window.addEventListener("keydown",u=>{if(u.key!=="f"&&u.key!=="F"||u.ctrlKey||u.metaKey||u.altKey)return;const h=u.target;h&&(h.tagName==="INPUT"||h.tagName==="TEXTAREA"||h.isContentEditable)||If()});let a=0,l=0;const{chapters:c}=xg(e,u=>{a=u,o.setCurrent(Math.min(Math.floor(u),s.length-1))});e.start(u=>{var d,f;l+=(a-l)*(1-Math.exp(-u*Ig)),e.applyCameraState(t.sampleGlobal(l));const h=Math.min(Math.max(Math.floor(l),0),c.length-1);(f=(d=c[h])==null?void 0:d.frame)==null||f.call(d,u)})}$g()?Ng().catch(i=>{console.error(i),Nc(i instanceof Error?i.message:String(i))}):Nc("当前浏览器环境无法创建 WebGL 上下文（webgl2 / webgl 均不可用）");
