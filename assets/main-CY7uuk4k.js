var wd=Object.defineProperty;var Sd=(i,e,t)=>e in i?wd(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var B=(i,e,t)=>Sd(i,typeof e!="symbol"?e+"":e,t);import{M as Sa,V as ge,Q as Ft,r as vn,a as Ne,d as Bn,S as Yu,b as Wu,C as al,w as kd,B as _o,c as Ki,P as Xu,A as ds,e as Uu,L as Vu,f as Td,G as In,g as Cd,E as Gi,W as Ed,h as Md,i as Pd,j as Ad,k as Rd,l as Od,m as zd,n as Ld,o as Dd,p as Id,q as fc,s as Nd,t as hc,u as $d,D as dc,v as Fd,x as yo,T as ju,y as Bd,z as Gd,F as Qu,H as qd,I as Hd,J as Yd}from"./detailCard-Dn8OxMoq.js";const Wd=.5,Ku=1.5,Xd=8,Ud=400,Vd=.03,jd=55,Qd=82.4,pc=3,Kd=.5,Zd=.28,Jd=900,ep=.035,tp=.018,np=24,gc=6e3,rp=15e3,ip=220,mc=[0,2,5,7,9,12,14,17,19,21,24],sp=3,op=.996,ap=2600,_c=.05,lp=.1,cp=.6,up=`
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
`,fp=`
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
</svg>`;let yc=!1,tn=null,Qn=!1,na=0,no=null;const bc=new Map;function hp(i){const e=i.sampleRate,t=Math.floor(Xd*e),n=i.createBuffer(1,t,e),r=n.getChannelData(0);let s=0;for(let a=0;a<t;a++){const l=Math.random()*2-1;s=(s+.02*l)/1.02,r[a]=s*3.5}const o=Math.min(Math.floor(e*.1),t>>2);for(let a=0;a<o;a++){const l=a/o;r[t-o+a]=r[t-o+a]*(1-l)+r[a]*l}return n}function dp(i,e){const t=i.sampleRate,n=Math.floor(sp*t),r=i.createBuffer(1,n,t),s=r.getChannelData(0),o=Math.max(2,Math.round(t/e)),a=new Float32Array(o);for(let c=0;c<o;c++)a[c]=Math.random()*2-1;let l=0;for(let c=0;c<n;c++){const u=(l+1)%o;s[c]=a[l],a[l]=op*.5*(a[l]+a[u]),l=u}return r}function pp(i){const e=i.createGain();e.gain.value=0,e.connect(i.destination);const t=i.createBufferSource();t.buffer=hp(i),t.loop=!0;const n=i.createBiquadFilter();n.type="lowpass",n.frequency.value=Ud;const r=i.createGain();r.gain.value=Vd,t.connect(n).connect(r).connect(e),t.start();const s=i.createBiquadFilter();s.type="lowpass",s.frequency.value=Jd;const o=i.createGain();o.gain.value=ep,s.connect(o).connect(e);const a=i.createOscillator();a.type="sine",a.frequency.value=jd,a.detune.value=-pc;const l=i.createGain();l.gain.value=Kd,a.connect(l).connect(s);const c=i.createOscillator();c.type="triangle",c.frequency.value=Qd,c.detune.value=pc;const u=i.createGain();u.gain.value=Zd,c.connect(u).connect(s);const h=i.createOscillator();h.type="sine",h.frequency.value=1/np;const d=i.createGain();return d.gain.value=tp,h.connect(d).connect(o.gain),a.start(),c.start(),h.start(),{ctx:i,master:e}}function gp({ctx:i,master:e}){const t=mc[Math.floor(Math.random()*mc.length)],n=ip*Math.pow(2,t/12);let r=bc.get(n);r||(r=dp(i,n),bc.set(n,r));const s=i.createBufferSource();s.buffer=r;const o=i.createBiquadFilter();o.type="lowpass",o.frequency.value=ap;const a=i.createGain();a.gain.value=_c+Math.random()*(lp-_c);const l=i.createStereoPanner();l.pan.value=(Math.random()*2-1)*cp,s.connect(o).connect(a).connect(l).connect(e),s.onended=()=>{s.disconnect(),o.disconnect(),a.disconnect(),l.disconnect()},s.start()}function vc(i,e){const t=i.context.currentTime,n=i.gain;n.cancelScheduledValues(t),n.setValueAtTime(n.value,t),n.linearRampToValueAtTime(e,t+Ku)}function Zu(){no!==null&&(window.clearTimeout(no),no=null)}function Ju(){Zu(),no=window.setTimeout(()=>{tn&&Qn&&tn.ctx.state==="running"&&gp(tn),Ju()},gc+Math.random()*(rp-gc))}function ef(i){i.classList.toggle("is-on",Qn);const e=Qn?"关闭环境音":"开启环境音";i.setAttribute("aria-label",e),i.setAttribute("aria-pressed",String(Qn)),i.title=e}function tf(){const i=window;return i.AudioContext??i.webkitAudioContext}async function mp(i){if(!tn){const n=tf();if(!n)return;tn=pp(new n)}Qn=!Qn,na++,ef(i);const{ctx:e,master:t}=tn;if(Qn)e.state!=="running"&&await e.resume().catch(()=>{}),vc(t,Wd),Ju();else{vc(t,0),Zu();const n=na;window.setTimeout(()=>{tn&&!Qn&&n===na&&tn.ctx.state==="running"&&tn.ctx.suspend()},(Ku+.1)*1e3)}}function _p(){if(yc||typeof document>"u")return;yc=!0;const i=document.createElement("style");i.textContent=up,document.head.appendChild(i);const e=document.createElement("button");if(e.type="button",e.className="app-ambient-toggle",e.innerHTML=fp,document.body.appendChild(e),!tf()){e.disabled=!0,e.setAttribute("aria-label","环境音不可用"),e.title="当前浏览器不支持 Web Audio";return}ef(e),e.addEventListener("click",()=>{mp(e)}),document.addEventListener("visibilitychange",()=>{tn&&(document.hidden?tn.ctx.state==="running"&&tn.ctx.suspend():Qn&&tn.ctx.resume())})}const yp=.65,bp=new ge(0,1,0),vp={ra:0,dec:80};function xc(i){return i=Ne.clamp(i,0,1),i*i*(3-2*i)}function Vn(i,e){const t=new ge(...vn(i,e,1)),n=new Sa().lookAt(new ge(0,0,0),t,bp);return new Ft().setFromRotationMatrix(n)}function wc(i){if(i.gaze!=="target")return null;const e=i.target??vp;return Vn(e.ra,e.dec)}class bo{constructor(e,t=yp){B(this,"keys");B(this,"hold");if(e.length<2)throw new Error("CameraRig 至少需要 2 个关键帧");this.hold=Ne.clamp(t,0,.95);for(const[n,r]of e.entries()){if(!(r.radius>0))throw new Error(`关键帧 ${n}：radius 必须为正`);if(!(r.fov>10&&r.fov<140))throw new Error(`关键帧 ${n}：fov 非法（${r.fov}）`);if(r.gaze!=="free"&&r.gaze!=="target")throw new Error(`关键帧 ${n}：gaze 必须为 "free" | "target"`);const s=r.enter??0;if(s<0||s>=1)throw new Error(`关键帧 ${n}：enter 必须在 [0,1)（${s}）`);if(r.hold!==void 0&&(r.hold<0||r.hold>1))throw new Error(`关键帧 ${n}：hold 必须在 [0,1]（${r.hold}）`);if(n>0&&s>0){const o=e[n-1].hold??this.hold;if(o<1)throw new Error(`关键帧 ${n}：enter > 0 要求上一章 hold = 1（当前 ${o}）`)}}this.keys=e}get count(){return this.keys.length}sample(e,t){const n=this.keys.length,r=Math.min(Math.max(Math.floor(e),0),n-1),s=Ne.clamp(t,0,1),o=this.keys[r],a=this.keys[Math.min(r+1,n-1)],l=o.enter??0;if(r>0&&l>0&&s<l)return bo.blend(this.keys[r-1],o,xc(s/l));const c=o.hold??this.hold,u=r<n-1&&c<1?xc((s-c)/(1-c)):0;return bo.blend(o,a,u)}sampleGlobal(e){const t=this.keys.length,n=Ne.clamp(e,0,t),r=Math.min(Math.floor(n),t-1);return this.sample(r,n-r)}static blend(e,t,n){var h;const r=new ge(...e.dir??[0,1,0]).normalize(),s=new ge(...t.dir??[0,1,0]).normalize(),o=r.lerp(s,n).normalize(),a=wc(e),l=wc(t),c=Ne.lerp(e.gaze==="target"?1:0,t.gaze==="target"?1:0,n);let u=null;return c>0&&(u=a&&l?a.clone().slerp(l,n):((h=a??l)==null?void 0:h.clone())??null),{radius:Ne.lerp(e.radius,t.radius,n),dir:o,fov:Ne.lerp(e.fov,t.fov,n),gazeBlend:c,gazeTargetQ:u,drift:Ne.lerp(e.drift??0,t.drift??0,n),orbit:Ne.lerp(e.orbit?1:0,t.orbit?1:0,n)}}}const Ls=.005,xp=[{radius:Ls,fov:78,gaze:"free",drift:.012},{radius:Ls,fov:78,gaze:"free",hold:1},{radius:Ls,fov:65,gaze:"target",target:{ra:270,dec:8},enter:.3},{radius:Ls,fov:45,gaze:"target",target:{ra:175,dec:81}},{radius:3,dir:[.52,.7,.49],fov:50,gaze:"free",orbit:!0},{radius:3,dir:[.52,.7,.49],fov:50,gaze:"free",orbit:!0},{radius:3,dir:[0,.55,.84],fov:50,gaze:"free",orbit:!0},{radius:5,dir:[.52,.7,.49],fov:45,gaze:"free"}],Sc=.22,wp=`
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
  letter-spacing: ${Sc}em;
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
    letter-spacing: ${Sc}em;
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
`;let kc=!1;function Sp(){if(kc||typeof document>"u")return;const i=document.createElement("style");i.dataset.ch1="",i.textContent=wp,document.head.appendChild(i),kc=!0}function Ai(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function kp(i){return i<0?0:i>1?1:i}function Ds(i,e,t){const n=kp((i-e)/(t-e));return n*n*(3-2*n)}function Tp(i){Sp();const e=i.root.querySelector(".pin"),{copy:t}=i,n=document.createElement("div");n.className="ch1-stage",n.innerHTML=`
    <p class="ch1-eyebrow">${Ai(t.eyebrow)}</p>
    <h1 class="ch1-title">${Ai(t.title)}</h1>
    <p class="ch1-hook">${Ai(t.hook)}</p>
    <div class="ch1-body">${t.body.map(h=>`<p>${Ai(h)}</p>`).join("")}</div>
    ${t.seal?`<div class="ch1-seal">${Ai(t.seal)}</div>`:""}
  `,e.appendChild(n);const r=document.createElement("div");r.className="ch1-cue",r.textContent="向下滚动 · 步入夜空",e.appendChild(r);const s=n.querySelector(".ch1-hook"),o=n.querySelector(".ch1-body"),a=n.querySelector(".ch1-seal");let l=-1;const c=new Map;function u(h,d,f=18){const m=c.get(h);m!==void 0&&Math.abs(m-d)<1e-4||(c.set(h,d),h.style.opacity=d.toFixed(3),h.style.transform=`translateY(${((1-d)*f).toFixed(2)}px)`)}return{enter(){i.sky.setLabelsEnabled(!1)},update(h){if(u(s,Ds(h,.15,.45)),u(o,Ds(h,.3,.6)),a){const f=Ds(h,.45,.75),m=c.get(a);(m===void 0||Math.abs(m-f)>=1e-4)&&(c.set(a,f),a.style.opacity=f.toFixed(3),a.style.transform=`translateY(${((1-f)*10).toFixed(2)}px) scale(${(1.3-.3*f).toFixed(3)})`)}const d=.65*(1-Ds(h,0,.35));(Math.abs(d-l)>=1e-4||l<0)&&(l=d,r.style.opacity=d.toFixed(3))},exit(){i.sky.setLabelsEnabled(!0)}}}const Cp=Object.freeze(Object.defineProperty({__proto__:null,createChapter:Tp},Symbol.toStringTag,{value:"Module"}));function Xn(i){if(i===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return i}function nf(i,e){i.prototype=Object.create(e.prototype),i.prototype.constructor=i,i.__proto__=e}/*!
 * GSAP 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var cn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},ps={duration:.5,overwrite:!1,delay:0},ll,vt,qe,yn=1e8,Re=1/yn,ka=Math.PI*2,Ep=ka/4,Mp=0,rf=Math.sqrt,Pp=Math.cos,Ap=Math.sin,yt=function(e){return typeof e=="string"},nt=function(e){return typeof e=="function"},Jn=function(e){return typeof e=="number"},cl=function(e){return typeof e>"u"},qn=function(e){return typeof e=="object"},qt=function(e){return e!==!1},ul=function(){return typeof window<"u"},Is=function(e){return nt(e)||yt(e)},sf=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},Tt=Array.isArray,Rp=/random\([^)]+\)/g,Op=/,\s*/g,Tc=/(?:-?\.?\d|\.)+/gi,of=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,li=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,ra=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,af=/[+-]=-?[.\d]+/,zp=/[^,'"\[\]\s]+/gi,Lp=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Ke,zn,Ta,fl,un={},vo={},lf,cf=function(e){return(vo=vi(e,un))&&Xt},hl=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},gs=function(e,t){return!t&&console.warn(e)},uf=function(e,t){return e&&(un[e]=t)&&vo&&(vo[e]=t)||un},ms=function(){return 0},Dp={suppressEvents:!0,isStart:!0,kill:!1},ro={suppressEvents:!0,kill:!1},Ip={suppressEvents:!0},dl={},ur=[],Ca={},ff,en={},ia={},Cc=30,io=[],pl="",gl=function(e){var t=e[0],n,r;if(qn(t)||nt(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(r=io.length;r--&&!io[r].targetTest(t););n=io[r]}for(r=e.length;r--;)e[r]&&(e[r]._gsap||(e[r]._gsap=new zf(e[r],n)))||e.splice(r,1);return e},zr=function(e){return e._gsap||gl(bn(e))[0]._gsap},hf=function(e,t,n){return(n=e[t])&&nt(n)?e[t]():cl(n)&&e.getAttribute&&e.getAttribute(t)||n},Ht=function(e,t){return(e=e.split(",")).forEach(t)||e},st=function(e){return Math.round(e*1e5)/1e5||0},Qe=function(e){return Math.round(e*1e7)/1e7||0},hi=function(e,t){var n=t.charAt(0),r=parseFloat(t.substr(2));return e=parseFloat(e),n==="+"?e+r:n==="-"?e-r:n==="*"?e*r:e/r},Np=function(e,t){for(var n=t.length,r=0;e.indexOf(t[r])<0&&++r<n;);return r<n},xo=function(){var e=ur.length,t=ur.slice(0),n,r;for(Ca={},ur.length=0,n=0;n<e;n++)r=t[n],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},ml=function(e){return!!(e._initted||e._startAt||e.add)},df=function(e,t,n,r){ur.length&&!vt&&xo(),e.render(t,n,!!(vt&&t<0&&ml(e))),ur.length&&!vt&&xo()},pf=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(zp).length<2?t:yt(e)?e.trim():e},gf=function(e){return e},fn=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},$p=function(e){return function(t,n){for(var r in n)r in t||r==="duration"&&e||r==="ease"||(t[r]=n[r])}},vi=function(e,t){for(var n in t)e[n]=t[n];return e},Ec=function i(e,t){for(var n in t)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(e[n]=qn(t[n])?i(e[n]||(e[n]={}),t[n]):t[n]);return e},wo=function(e,t){var n={},r;for(r in e)r in t||(n[r]=e[r]);return n},Zi=function(e){var t=e.parent||Ke,n=e.keyframes?$p(Tt(e.keyframes)):fn;if(qt(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},Fp=function(e,t){for(var n=e.length,r=n===t.length;r&&n--&&e[n]===t[n];);return n<0},mf=function(e,t,n,r,s){var o=e[r],a;if(s)for(a=t[s];o&&o[s]>a;)o=o._prev;return o?(t._next=o._next,o._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[r]=t,t._prev=o,t.parent=t._dp=e,t},Io=function(e,t,n,r){n===void 0&&(n="_first"),r===void 0&&(r="_last");var s=t._prev,o=t._next;s?s._next=o:e[n]===t&&(e[n]=o),o?o._prev=s:e[r]===t&&(e[r]=s),t._next=t._prev=t.parent=null},dr=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},Lr=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},Bp=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},Ea=function(e,t,n,r){return e._startAt&&(vt?e._startAt.revert(ro):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,r))},Gp=function i(e){return!e||e._ts&&i(e.parent)},Mc=function(e){return e._repeat?xi(e._tTime,e=e.duration()+e._rDelay)*e:0},xi=function(e,t){var n=Math.floor(e=Qe(e/t));return e&&n===e?n-1:n},So=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},No=function(e){return e._end=Qe(e._start+(e._tDur/Math.abs(e._ts||e._rts||Re)||0))},$o=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=Qe(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),No(e),n._dirty||Lr(n,e)),e},_f=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=So(e.rawTime(),t),(!t._dur||Ts(0,t.totalDuration(),n)-t._tTime>Re)&&t.render(n,!0)),Lr(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-Re}},Nn=function(e,t,n,r){return t.parent&&dr(t),t._start=Qe((Jn(n)?n:n||e!==Ke?gn(e,n,t):e._time)+t._delay),t._end=Qe(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),mf(e,t,"_first","_last",e._sort?"_start":0),Ma(t)||(e._recent=t),r||_f(e,t),e._ts<0&&$o(e,e._tTime),e},yf=function(e,t){return(un.ScrollTrigger||hl("scrollTrigger",t))&&un.ScrollTrigger.create(t,e)},bf=function(e,t,n,r,s){if(yl(e,t,s),!e._initted)return 1;if(!n&&e._pt&&!vt&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&ff!==sn.frame)return ur.push(e),e._lazy=[s,r],1},qp=function i(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||i(t))},Ma=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},Hp=function(e,t,n,r){var s=e.ratio,o=t<0||!t&&(!e._start&&qp(e)&&!(!e._initted&&Ma(e))||(e._ts<0||e._dp._ts<0)&&!Ma(e))?0:1,a=e._rDelay,l=0,c,u,h;if(a&&e._repeat&&(l=Ts(0,e._tDur,t),u=xi(l,a),e._yoyo&&u&1&&(o=1-o),u!==xi(e._tTime,a)&&(s=1-o,e.vars.repeatRefresh&&e._initted&&e.invalidate())),o!==s||vt||r||e._zTime===Re||!t&&e._zTime){if(!e._initted&&bf(e,t,r,n,l))return;for(h=e._zTime,e._zTime=t||(n?Re:0),n||(n=t&&!h),e.ratio=o,e._from&&(o=1-o),e._time=0,e._tTime=l,c=e._pt;c;)c.r(o,c.d),c=c._next;t<0&&Ea(e,t,n,!0),e._onUpdate&&!n&&an(e,"onUpdate"),l&&e._repeat&&!n&&e.parent&&an(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===o&&(o&&dr(e,1),!n&&!vt&&(an(e,o?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},Yp=function(e,t,n){var r;if(n>t)for(r=e._first;r&&r._start<=n;){if(r.data==="isPause"&&r._start>t)return r;r=r._next}else for(r=e._last;r&&r._start>=n;){if(r.data==="isPause"&&r._start<t)return r;r=r._prev}},wi=function(e,t,n,r){var s=e._repeat,o=Qe(t)||0,a=e._tTime/e._tDur;return a&&!r&&(e._time*=o/e._dur),e._dur=o,e._tDur=s?s<0?1e10:Qe(o*(s+1)+e._rDelay*s):o,a>0&&!r&&$o(e,e._tTime=e._tDur*a),e.parent&&No(e),n||Lr(e.parent,e),e},Pc=function(e){return e instanceof Gt?Lr(e):wi(e,e._dur)},Wp={_start:0,endTime:ms,totalDuration:ms},gn=function i(e,t,n){var r=e.labels,s=e._recent||Wp,o=e.duration()>=yn?s.endTime(!1):e._dur,a,l,c;return yt(t)&&(isNaN(t)||t in r)?(l=t.charAt(0),c=t.substr(-1)==="%",a=t.indexOf("="),l==="<"||l===">"?(a>=0&&(t=t.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(a<0?s:n).totalDuration()/100:1)):a<0?(t in r||(r[t]=o),r[t]):(l=parseFloat(t.charAt(a-1)+t.substr(a+1)),c&&n&&(l=l/100*(Tt(n)?n[0]:n).totalDuration()),a>1?i(e,t.substr(0,a-1),n)+l:o+l)):t==null?o:+t},Ji=function(e,t,n){var r=Jn(t[1]),s=(r?2:1)+(e<2?0:1),o=t[s],a,l;if(r&&(o.duration=t[1]),o.parent=n,e){for(a=o,l=n;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=qt(l.vars.inherit)&&l.parent;o.immediateRender=qt(a.immediateRender),e<2?o.runBackwards=1:o.startAt=t[s-1]}return new ut(t[0],o,t[s+1])},_r=function(e,t){return e||e===0?t(e):t},Ts=function(e,t,n){return n<e?e:n>t?t:n},St=function(e,t){return!yt(e)||!(t=Lp.exec(e))?"":t[1]},Xp=function(e,t,n){return _r(n,function(r){return Ts(e,t,r)})},Pa=[].slice,vf=function(e,t){return e&&qn(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&qn(e[0]))&&!e.nodeType&&e!==zn},Up=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(r){var s;return yt(r)&&!t||vf(r,1)?(s=n).push.apply(s,bn(r)):n.push(r)})||n},bn=function(e,t,n){return qe&&!t&&qe.selector?qe.selector(e):yt(e)&&!n&&(Ta||!Si())?Pa.call((t||fl).querySelectorAll(e),0):Tt(e)?Up(e,n):vf(e)?Pa.call(e,0):e?[e]:[]},Aa=function(e){return e=bn(e)[0]||gs("Invalid scope")||{},function(t){var n=e.current||e.nativeElement||e;return bn(t,n.querySelectorAll?n:n===e?gs("Invalid scope")||fl.createElement("div"):e)}},xf=function(e){return e.sort(function(){return .5-Math.random()})},wf=function(e){if(nt(e))return e;var t=qn(e)?e:{each:e},n=Dr(t.ease),r=t.from||0,s=parseFloat(t.base)||0,o={},a=r>0&&r<1,l=isNaN(r)||a,c=t.axis,u=r,h=r;return yt(r)?u=h={center:.5,edges:.5,end:1}[r]||0:!a&&l&&(u=r[0],h=r[1]),function(d,f,m){var p=(m||t).length,y=o[p],w,x,S,k,C,M,E,O,P;if(!y){if(P=t.grid==="auto"?0:(t.grid||[1,yn])[1],!P){for(E=-yn;E<(E=m[P++].getBoundingClientRect().left)&&P<p;);P<p&&P--}for(y=o[p]=[],w=l?Math.min(P,p)*u-.5:r%P,x=P===yn?0:l?p*h/P-.5:r/P|0,E=0,O=yn,M=0;M<p;M++)S=M%P-w,k=x-(M/P|0),y[M]=C=c?Math.abs(c==="y"?k:S):rf(S*S+k*k),C>E&&(E=C),C<O&&(O=C);r==="random"&&xf(y),y.max=E-O,y.min=O,y.v=p=(parseFloat(t.amount)||parseFloat(t.each)*(P>p?p-1:c?c==="y"?p/P:P:Math.max(P,p/P))||0)*(r==="edges"?-1:1),y.b=p<0?s-p:s,y.u=St(t.amount||t.each)||0,n=n&&p<0?o0(n):n}return p=(y[d]-y.min)/y.max||0,Qe(y.b+(n?n(p):p)*y.v)+y.u}},Ra=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(n){var r=Qe(Math.round(parseFloat(n)/e)*e*t);return(r-r%1)/t+(Jn(n)?0:St(n))}},Sf=function(e,t){var n=Tt(e),r,s;return!n&&qn(e)&&(r=n=e.radius||yn,e.values?(e=bn(e.values),(s=!Jn(e[0]))&&(r*=r)):e=Ra(e.increment)),_r(t,n?nt(e)?function(o){return s=e(o),Math.abs(s-o)<=r?s:o}:function(o){for(var a=parseFloat(s?o.x:o),l=parseFloat(s?o.y:0),c=yn,u=0,h=e.length,d,f;h--;)s?(d=e[h].x-a,f=e[h].y-l,d=d*d+f*f):d=Math.abs(e[h]-a),d<c&&(c=d,u=h);return u=!r||c<=r?e[u]:o,s||u===o||Jn(o)?u:u+St(o)}:Ra(e))},kf=function(e,t,n,r){return _r(Tt(e)?!t:n===!0?!!(n=0):!r,function(){return Tt(e)?e[~~(Math.random()*e.length)]:(n=n||1e-5)&&(r=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*r)/r})},Vp=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(r){return t.reduce(function(s,o){return o(s)},r)}},jp=function(e,t){return function(n){return e(parseFloat(n))+(t||St(n))}},Qp=function(e,t,n){return Cf(e,t,0,1,n)},Tf=function(e,t,n){return _r(n,function(r){return e[~~t(r)]})},Kp=function i(e,t,n){var r=t-e;return Tt(e)?Tf(e,i(0,e.length),t):_r(n,function(s){return(r+(s-e)%r)%r+e})},Zp=function i(e,t,n){var r=t-e,s=r*2;return Tt(e)?Tf(e,i(0,e.length-1),t):_r(n,function(o){return o=(s+(o-e)%s)%s||0,e+(o>r?s-o:o)})},_s=function(e){return e.replace(Rp,function(t){var n=t.indexOf("[")+1,r=t.substring(n||7,n?t.indexOf("]"):t.length-1).split(Op);return kf(n?r:+r[0],n?0:+r[1],+r[2]||1e-5)})},Cf=function(e,t,n,r,s){var o=t-e,a=r-n;return _r(s,function(l){return n+((l-e)/o*a||0)})},Jp=function i(e,t,n,r){var s=isNaN(e+t)?0:function(f){return(1-f)*e+f*t};if(!s){var o=yt(e),a={},l,c,u,h,d;if(n===!0&&(r=1)&&(n=null),o)e={p:e},t={p:t};else if(Tt(e)&&!Tt(t)){for(u=[],h=e.length,d=h-2,c=1;c<h;c++)u.push(i(e[c-1],e[c]));h--,s=function(m){m*=h;var p=Math.min(d,~~m);return u[p](m-p)},n=t}else r||(e=vi(Tt(e)?[]:{},e));if(!u){for(l in t)_l.call(a,e,l,"get",t[l]);s=function(m){return xl(m,a)||(o?e.p:e)}}}return _r(n,s)},Ac=function(e,t,n){var r=e.labels,s=yn,o,a,l;for(o in r)a=r[o]-t,a<0==!!n&&a&&s>(a=Math.abs(a))&&(l=o,s=a);return l},an=function(e,t,n){var r=e.vars,s=r[t],o=qe,a=e._ctx,l,c,u;if(s)return l=r[t+"Params"],c=r.callbackScope||e,n&&ur.length&&xo(),a&&(qe=a),u=l?s.apply(c,l):s.call(c),qe=o,u},qi=function(e){return dr(e),e.scrollTrigger&&e.scrollTrigger.kill(!!vt),e.progress()<1&&an(e,"onInterrupt"),e},ci,Ef=[],Mf=function(e){if(e)if(e=!e.name&&e.default||e,ul()||e.headless){var t=e.name,n=nt(e),r=t&&!n&&e.init?function(){this._props=[]}:e,s={init:ms,render:xl,add:_l,kill:m0,modifier:g0,rawVars:0},o={targetTest:0,get:0,getSetter:vl,aliases:{},register:0};if(Si(),e!==r){if(en[t])return;fn(r,fn(wo(e,s),o)),vi(r.prototype,vi(s,wo(e,o))),en[r.prop=t]=r,e.targetTest&&(io.push(r),dl[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}uf(t,r),e.register&&e.register(Xt,r,Yt)}else Ef.push(e)},Ae=255,Hi={aqua:[0,Ae,Ae],lime:[0,Ae,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Ae],navy:[0,0,128],white:[Ae,Ae,Ae],olive:[128,128,0],yellow:[Ae,Ae,0],orange:[Ae,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Ae,0,0],pink:[Ae,192,203],cyan:[0,Ae,Ae],transparent:[Ae,Ae,Ae,0]},sa=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*Ae+.5|0},Pf=function(e,t,n){var r=e?Jn(e)?[e>>16,e>>8&Ae,e&Ae]:0:Hi.black,s,o,a,l,c,u,h,d,f,m;if(!r){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),Hi[e])r=Hi[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),o=e.charAt(2),a=e.charAt(3),e="#"+s+s+o+o+a+a+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return r=parseInt(e.substr(1,6),16),[r>>16,r>>8&Ae,r&Ae,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),r=[e>>16,e>>8&Ae,e&Ae]}else if(e.substr(0,3)==="hsl"){if(r=m=e.match(Tc),!t)l=+r[0]%360/360,c=+r[1]/100,u=+r[2]/100,o=u<=.5?u*(c+1):u+c-u*c,s=u*2-o,r.length>3&&(r[3]*=1),r[0]=sa(l+1/3,s,o),r[1]=sa(l,s,o),r[2]=sa(l-1/3,s,o);else if(~e.indexOf("="))return r=e.match(of),n&&r.length<4&&(r[3]=1),r}else r=e.match(Tc)||Hi.transparent;r=r.map(Number)}return t&&!m&&(s=r[0]/Ae,o=r[1]/Ae,a=r[2]/Ae,h=Math.max(s,o,a),d=Math.min(s,o,a),u=(h+d)/2,h===d?l=c=0:(f=h-d,c=u>.5?f/(2-h-d):f/(h+d),l=h===s?(o-a)/f+(o<a?6:0):h===o?(a-s)/f+2:(s-o)/f+4,l*=60),r[0]=~~(l+.5),r[1]=~~(c*100+.5),r[2]=~~(u*100+.5)),n&&r.length<4&&(r[3]=1),r},Af=function(e){var t=[],n=[],r=-1;return e.split(fr).forEach(function(s){var o=s.match(li)||[];t.push.apply(t,o),n.push(r+=o.length+1)}),t.c=n,t},Rc=function(e,t,n){var r="",s=(e+r).match(fr),o=t?"hsla(":"rgba(",a=0,l,c,u,h;if(!s)return e;if(s=s.map(function(d){return(d=Pf(d,t,1))&&o+(t?d[0]+","+d[1]+"%,"+d[2]+"%,"+d[3]:d.join(","))+")"}),n&&(u=Af(e),l=n.c,l.join(r)!==u.c.join(r)))for(c=e.replace(fr,"1").split(li),h=c.length-1;a<h;a++)r+=c[a]+(~l.indexOf(a)?s.shift()||o+"0,0,0,0)":(u.length?u:s.length?s:n).shift());if(!c)for(c=e.split(fr),h=c.length-1;a<h;a++)r+=c[a]+s[a];return r+c[h]},fr=function(){var i="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in Hi)i+="|"+e+"\\b";return new RegExp(i+")","gi")}(),e0=/hsl[a]?\(/,Rf=function(e){var t=e.join(" "),n;if(fr.lastIndex=0,fr.test(t))return n=e0.test(t),e[1]=Rc(e[1],n),e[0]=Rc(e[0],n,Af(e[1])),!0},ys,sn=function(){var i=Date.now,e=500,t=33,n=i(),r=n,s=1e3/240,o=s,a=[],l,c,u,h,d,f,m=function p(y){var w=i()-r,x=y===!0,S,k,C,M;if((w>e||w<0)&&(n+=w-t),r+=w,C=r-n,S=C-o,(S>0||x)&&(M=++h.frame,d=C-h.time*1e3,h.time=C=C/1e3,o+=S+(S>=s?4:s-S),k=1),x||(l=c(p)),k)for(f=0;f<a.length;f++)a[f](C,d,M,y)};return h={time:0,frame:0,tick:function(){m(!0)},deltaRatio:function(y){return d/(1e3/(y||60))},wake:function(){lf&&(!Ta&&ul()&&(zn=Ta=window,fl=zn.document||{},un.gsap=Xt,(zn.gsapVersions||(zn.gsapVersions=[])).push(Xt.version),cf(vo||zn.GreenSockGlobals||!zn.gsap&&zn||{}),Ef.forEach(Mf)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&h.sleep(),c=u||function(y){return setTimeout(y,o-h.time*1e3+1|0)},ys=1,m(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),ys=0,c=ms},lagSmoothing:function(y,w){e=y||1/0,t=Math.min(w||33,e)},fps:function(y){s=1e3/(y||240),o=h.time*1e3+s},add:function(y,w,x){var S=w?function(k,C,M,E){y(k,C,M,E),h.remove(S)}:y;return h.remove(y),a[x?"unshift":"push"](S),Si(),S},remove:function(y,w){~(w=a.indexOf(y))&&a.splice(w,1)&&f>=w&&f--},_listeners:a},h}(),Si=function(){return!ys&&sn.wake()},me={},t0=/^[\d.\-M][\d.\-,\s]/,n0=/["']/g,r0=function(e){for(var t={},n=e.substr(1,e.length-3).split(":"),r=n[0],s=1,o=n.length,a,l,c;s<o;s++)l=n[s],a=s!==o-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),t[r]=isNaN(c)?c.replace(n0,"").trim():+c,r=l.substr(a+1).trim();return t},i0=function(e){var t=e.indexOf("(")+1,n=e.indexOf(")"),r=e.indexOf("(",t);return e.substring(t,~r&&r<n?e.indexOf(")",n+1):n)},s0=function(e){var t=(e+"").split("("),n=me[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf("{")?[r0(t[1])]:i0(e).split(",").map(pf)):me._CE&&t0.test(e)?me._CE("",e):n},o0=function(e){return function(t){return 1-e(1-t)}},Dr=function(e,t){return e&&(nt(e)?e:me[e]||s0(e))||t},Xr=function(e,t,n,r){n===void 0&&(n=function(l){return 1-t(1-l)}),r===void 0&&(r=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var s={easeIn:t,easeOut:n,easeInOut:r},o;return Ht(e,function(a){me[a]=un[a]=s,me[o=a.toLowerCase()]=n;for(var l in s)me[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=me[a+"."+l]=s[l]}),s},Of=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},oa=function i(e,t,n){var r=t>=1?t:1,s=(n||(e?.3:.45))/(t<1?t:1),o=s/ka*(Math.asin(1/r)||0),a=function(u){return u===1?1:r*Math.pow(2,-10*u)*Ap((u-o)*s)+1},l=e==="out"?a:e==="in"?function(c){return 1-a(1-c)}:Of(a);return s=ka/s,l.config=function(c,u){return i(e,c,u)},l},aa=function i(e,t){t===void 0&&(t=1.70158);var n=function(o){return o?--o*o*((t+1)*o+t)+1:0},r=e==="out"?n:e==="in"?function(s){return 1-n(1-s)}:Of(n);return r.config=function(s){return i(e,s)},r};Ht("Linear,Quad,Cubic,Quart,Quint,Strong",function(i,e){var t=e<5?e+1:e;Xr(i+",Power"+(t-1),e?function(n){return Math.pow(n,t)}:function(n){return n},function(n){return 1-Math.pow(1-n,t)},function(n){return n<.5?Math.pow(n*2,t)/2:1-Math.pow((1-n)*2,t)/2})});me.Linear.easeNone=me.none=me.Linear.easeIn;Xr("Elastic",oa("in"),oa("out"),oa());(function(i,e){var t=1/e,n=2*t,r=2.5*t,s=function(a){return a<t?i*a*a:a<n?i*Math.pow(a-1.5/e,2)+.75:a<r?i*(a-=2.25/e)*a+.9375:i*Math.pow(a-2.625/e,2)+.984375};Xr("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);Xr("Expo",function(i){return Math.pow(2,10*(i-1))*i+i*i*i*i*i*i*(1-i)});Xr("Circ",function(i){return-(rf(1-i*i)-1)});Xr("Sine",function(i){return i===1?1:-Pp(i*Ep)+1});Xr("Back",aa("in"),aa("out"),aa());me.SteppedEase=me.steps=un.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,r=e+(t?0:1),s=t?1:0,o=1-Re;return function(a){return((r*Ts(0,o,a)|0)+s)*n}}};ps.ease=me["quad.out"];Ht("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(i){return pl+=i+","+i+"Params,"});var zf=function(e,t){this.id=Mp++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:hf,this.set=t?t.getSetter:vl},bs=function(){function i(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,wi(this,+t.duration,1,1),this.data=t.data,qe&&(this._ctx=qe,qe.data.push(this)),ys||sn.wake()}var e=i.prototype;return e.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},e.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},e.totalDuration=function(n){return arguments.length?(this._dirty=0,wi(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(n,r){if(Si(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for($o(this,n),!s._dp||s.parent||_f(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&Nn(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!r||this._initted&&Math.abs(this._zTime)===Re||!this._initted&&this._dur&&n||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),df(this,n,r)),this},e.time=function(n,r){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+Mc(this))%(this._dur+this._rDelay)||(n?this._dur:0),r):this._time},e.totalProgress=function(n,r){return arguments.length?this.totalTime(this.totalDuration()*n,r):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(n,r){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+Mc(this),r):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(n,r){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,r):this._repeat?xi(this._tTime,s)+1:1},e.timeScale=function(n,r){if(!arguments.length)return this._rts===-Re?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?So(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-Re?0:this._rts,this.totalTime(Ts(-Math.abs(this._delay),this.totalDuration(),s),r!==!1),No(this),Bp(this)},e.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Si(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==Re&&(this._tTime-=Re)))),this):this._ps},e.startTime=function(n){if(arguments.length){this._start=Qe(n);var r=this.parent||this._dp;return r&&(r._sort||!this.parent)&&Nn(r,this,this._start-this._delay),this}return this._start},e.endTime=function(n){return this._start+(qt(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(n){var r=this.parent||this._dp;return r?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?So(r.rawTime(n),this):this._tTime:this._tTime},e.revert=function(n){n===void 0&&(n=Ip);var r=vt;return vt=n,ml(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),vt=r,this},e.globalTime=function(n){for(var r=this,s=arguments.length?n:r.rawTime();r;)s=r._start+s/(Math.abs(r._ts)||1),r=r._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},e.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,Pc(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(n){if(arguments.length){var r=this._time;return this._rDelay=n,Pc(this),r?this.time(r):this}return this._rDelay},e.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},e.seek=function(n,r){return this.totalTime(gn(this,n),qt(r))},e.restart=function(n,r){return this.play().totalTime(n?-this._delay:0,qt(r)),this._dur||(this._zTime=-Re),this},e.play=function(n,r){return n!=null&&this.seek(n,r),this.reversed(!1).paused(!1)},e.reverse=function(n,r){return n!=null&&this.seek(n||this.totalDuration(),r),this.reversed(!0).paused(!1)},e.pause=function(n,r){return n!=null&&this.seek(n,r),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-Re:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-Re,this},e.isActive=function(){var n=this.parent||this._dp,r=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=r&&s<this.endTime(!0)-Re)},e.eventCallback=function(n,r,s){var o=this.vars;return arguments.length>1?(r?(o[n]=r,s&&(o[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=r)):delete o[n],this):o[n]},e.then=function(n){var r=this,s=r._prom;return new Promise(function(o){var a=nt(n)?n:gf,l=function(){var u=r.then;r.then=null,s&&s(),nt(a)&&(a=a(r))&&(a.then||a===r)&&(r.then=u),o(a),r.then=u};r._initted&&r.totalProgress()===1&&r._ts>=0||!r._tTime&&r._ts<0?l():r._prom=l})},e.kill=function(){qi(this)},i}();fn(bs.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-Re,_prom:0,_ps:!1,_rts:1});var Gt=function(i){nf(e,i);function e(n,r){var s;return n===void 0&&(n={}),s=i.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=qt(n.sortChildren),Ke&&Nn(n.parent||Ke,Xn(s),r),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&yf(Xn(s),n.scrollTrigger),s}var t=e.prototype;return t.to=function(r,s,o){return Ji(0,arguments,this),this},t.from=function(r,s,o){return Ji(1,arguments,this),this},t.fromTo=function(r,s,o,a){return Ji(2,arguments,this),this},t.set=function(r,s,o){return s.duration=0,s.parent=this,Zi(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new ut(r,s,gn(this,o),1),this},t.call=function(r,s,o){return Nn(this,ut.delayedCall(0,r,s),o)},t.staggerTo=function(r,s,o,a,l,c,u){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=c,o.onCompleteParams=u,o.parent=this,new ut(r,o,gn(this,l)),this},t.staggerFrom=function(r,s,o,a,l,c,u){return o.runBackwards=1,Zi(o).immediateRender=qt(o.immediateRender),this.staggerTo(r,s,o,a,l,c,u)},t.staggerFromTo=function(r,s,o,a,l,c,u,h){return a.startAt=o,Zi(a).immediateRender=qt(a.immediateRender),this.staggerTo(r,s,a,l,c,u,h)},t.render=function(r,s,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=r<=0?0:Qe(r),h=this._zTime<0!=r<0&&(this._initted||!c),d,f,m,p,y,w,x,S,k,C,M,E;if(this!==Ke&&u>l&&r>=0&&(u=l),u!==this._tTime||o||h){if(a!==this._time&&c&&(u+=this._time-a,r+=this._time-a),d=u,k=this._start,S=this._ts,w=!S,h&&(c||(a=this._zTime),(r||!s)&&(this._zTime=r)),this._repeat){if(M=this._yoyo,y=c+this._rDelay,this._repeat<-1&&r<0)return this.totalTime(y*100+r,s,o);if(d=Qe(u%y),u===l?(p=this._repeat,d=c):(C=Qe(u/y),p=~~C,p&&p===C&&(d=c,p--),d>c&&(d=c)),C=xi(this._tTime,y),!a&&this._tTime&&C!==p&&this._tTime-C*y-this._dur<=0&&(C=p),M&&p&1&&(d=c-d,E=1),p!==C&&!this._lock){var O=M&&C&1,P=O===(M&&p&1);if(p<C&&(O=!O),a=O?0:u%c?c:u,this._lock=1,this.render(a||(E?0:Qe(p*y)),s,!c)._lock=0,this._tTime=u,!s&&this.parent&&an(this,"onRepeat"),this.vars.repeatRefresh&&!E&&(this.invalidate()._lock=1,C=p),a&&a!==this._time||w!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,P&&(this._lock=2,a=O?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!E&&this.invalidate()),this._lock=0,!this._ts&&!w)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(x=Yp(this,Qe(a),Qe(d)),x&&(u-=d-(d=x._start))),this._tTime=u,this._time=d,this._act=!!S,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=r,a=0),!a&&u&&c&&!s&&!C&&(an(this,"onStart"),this._tTime!==u))return this;if(d>=a&&r>=0)for(f=this._first;f;){if(m=f._next,(f._act||d>=f._start)&&f._ts&&x!==f){if(f.parent!==this)return this.render(r,s,o);if(f.render(f._ts>0?(d-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(d-f._start)*f._ts,s,o),d!==this._time||!this._ts&&!w){x=0,m&&(u+=this._zTime=-Re);break}}f=m}else{f=this._last;for(var A=r<0?r:d;f;){if(m=f._prev,(f._act||A<=f._end)&&f._ts&&x!==f){if(f.parent!==this)return this.render(r,s,o);if(f.render(f._ts>0?(A-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(A-f._start)*f._ts,s,o||vt&&ml(f)),d!==this._time||!this._ts&&!w){x=0,m&&(u+=this._zTime=A?-Re:Re);break}}f=m}}if(x&&!s&&(this.pause(),x.render(d>=a?0:-Re)._zTime=d>=a?1:-1,this._ts))return this._start=k,No(this),this.render(r,s,o);this._onUpdate&&!s&&an(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&a)&&(k===this._start||Math.abs(S)!==Math.abs(this._ts))&&(this._lock||((r||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&dr(this,1),!s&&!(r<0&&!a)&&(u||a||!l)&&(an(this,u===l&&r>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(r,s){var o=this;if(Jn(s)||(s=gn(this,s,r)),!(r instanceof bs)){if(Tt(r))return r.forEach(function(a){return o.add(a,s)}),this;if(yt(r))return this.addLabel(r,s);if(nt(r))r=ut.delayedCall(0,r);else return this}return this!==r?Nn(this,r,s):this},t.getChildren=function(r,s,o,a){r===void 0&&(r=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-yn);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof ut?s&&l.push(c):(o&&l.push(c),r&&l.push.apply(l,c.getChildren(!0,s,o)))),c=c._next;return l},t.getById=function(r){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===r)return s[o]},t.remove=function(r){return yt(r)?this.removeLabel(r):nt(r)?this.killTweensOf(r):(r.parent===this&&Io(this,r),r===this._recent&&(this._recent=this._last),Lr(this))},t.totalTime=function(r,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Qe(sn.time-(this._ts>0?r/this._ts:(this.totalDuration()-r)/-this._ts))),i.prototype.totalTime.call(this,r,s),this._forcing=0,this):this._tTime},t.addLabel=function(r,s){return this.labels[r]=gn(this,s),this},t.removeLabel=function(r){return delete this.labels[r],this},t.addPause=function(r,s,o){var a=ut.delayedCall(0,s||ms,o);return a.data="isPause",this._hasPause=1,Nn(this,a,gn(this,r))},t.removePause=function(r){var s=this._first;for(r=gn(this,r);s;)s._start===r&&s.data==="isPause"&&dr(s),s=s._next},t.killTweensOf=function(r,s,o){for(var a=this.getTweensOf(r,o),l=a.length;l--;)sr!==a[l]&&a[l].kill(r,s);return this},t.getTweensOf=function(r,s){for(var o=[],a=bn(r),l=this._first,c=Jn(s),u;l;)l instanceof ut?Np(l._targets,a)&&(c?(!sr||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&o.push(l):(u=l.getTweensOf(a,s)).length&&o.push.apply(o,u),l=l._next;return o},t.tweenTo=function(r,s){s=s||{};var o=this,a=gn(o,r),l=s,c=l.startAt,u=l.onStart,h=l.onStartParams,d=l.immediateRender,f,m=ut.to(o,fn({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale())||Re,onStart:function(){if(o.pause(),!f){var y=s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale());m._dur!==y&&wi(m,y,0,1).render(m._time,!0,!0),f=1}u&&u.apply(m,h||[])}},s));return d?m.render(0):m},t.tweenFromTo=function(r,s,o){return this.tweenTo(s,fn({startAt:{time:gn(this,r)}},o))},t.recent=function(){return this._recent},t.nextLabel=function(r){return r===void 0&&(r=this._time),Ac(this,gn(this,r))},t.previousLabel=function(r){return r===void 0&&(r=this._time),Ac(this,gn(this,r),1)},t.currentLabel=function(r){return arguments.length?this.seek(r,!0):this.previousLabel(this._time+Re)},t.shiftChildren=function(r,s,o){o===void 0&&(o=0);var a=this._first,l=this.labels,c;for(r=Qe(r);a;)a._start>=o&&(a._start+=r,a._end+=r),a=a._next;if(s)for(c in l)l[c]>=o&&(l[c]+=r);return Lr(this)},t.invalidate=function(r){var s=this._first;for(this._lock=0;s;)s.invalidate(r),s=s._next;return i.prototype.invalidate.call(this,r)},t.clear=function(r){r===void 0&&(r=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),r&&(this.labels={}),Lr(this)},t.totalDuration=function(r){var s=0,o=this,a=o._last,l=yn,c,u,h;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-r:r));if(o._dirty){for(h=o.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),u=a._start,u>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,Nn(o,a,u-a._delay,1)._lock=0):l=u,u<0&&a._ts&&(s-=u,(!h&&!o._dp||h&&h.smoothChildTiming)&&(o._start+=Qe(u/o._ts),o._time-=u,o._tTime-=u),o.shiftChildren(-u,!1,-1/0),l=0),a._end>s&&a._ts&&(s=a._end),a=c;wi(o,o===Ke&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},e.updateRoot=function(r){if(Ke._ts&&(df(Ke,So(r,Ke)),ff=sn.frame),sn.frame>=Cc){Cc+=cn.autoSleep||120;var s=Ke._first;if((!s||!s._ts)&&cn.autoSleep&&sn._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||sn.sleep()}}},e}(bs);fn(Gt.prototype,{_lock:0,_hasPause:0,_forcing:0});var a0=function(e,t,n,r,s,o,a){var l=new Yt(this._pt,e,t,0,1,Ff,null,s),c=0,u=0,h,d,f,m,p,y,w,x;for(l.b=n,l.e=r,n+="",r+="",(w=~r.indexOf("random("))&&(r=_s(r)),o&&(x=[n,r],o(x,e,t),n=x[0],r=x[1]),d=n.match(ra)||[];h=ra.exec(r);)m=h[0],p=r.substring(c,h.index),f?f=(f+1)%5:p.substr(-5)==="rgba("&&(f=1),m!==d[u++]&&(y=parseFloat(d[u-1])||0,l._pt={_next:l._pt,p:p||u===1?p:",",s:y,c:m.charAt(1)==="="?hi(y,m)-y:parseFloat(m)-y,m:f&&f<4?Math.round:0},c=ra.lastIndex);return l.c=c<r.length?r.substring(c,r.length):"",l.fp=a,(af.test(r)||w)&&(l.e=0),this._pt=l,l},_l=function(e,t,n,r,s,o,a,l,c,u){nt(r)&&(r=r(s||0,e,o));var h=e[t],d=n!=="get"?n:nt(h)?c?e[t.indexOf("set")||!nt(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():h,f=nt(h)?c?h0:Nf:bl,m;if(yt(r)&&(~r.indexOf("random(")&&(r=_s(r)),r.charAt(1)==="="&&(m=hi(d,r)+(St(d)||0),(m||m===0)&&(r=m))),!u||d!==r||Oa)return!isNaN(d*r)&&r!==""?(m=new Yt(this._pt,e,t,+d||0,r-(d||0),typeof h=="boolean"?p0:$f,0,f),c&&(m.fp=c),a&&m.modifier(a,this,e),this._pt=m):(!h&&!(t in e)&&hl(t,r),a0.call(this,e,t,d,r,f,l||cn.stringFilter,c))},l0=function(e,t,n,r,s){if(nt(e)&&(e=es(e,s,t,n,r)),!qn(e)||e.style&&e.nodeType||Tt(e)||sf(e))return yt(e)?es(e,s,t,n,r):e;var o={},a;for(a in e)o[a]=es(e[a],s,t,n,r);return o},Lf=function(e,t,n,r,s,o){var a,l,c,u;if(en[e]&&(a=new en[e]).init(s,a.rawVars?t[e]:l0(t[e],r,s,o,n),n,r,o)!==!1&&(n._pt=l=new Yt(n._pt,s,e,0,1,a.render,a,0,a.priority),n!==ci))for(c=n._ptLookup[n._targets.indexOf(s)],u=a._props.length;u--;)c[a._props[u]]=l;return a},sr,Oa,yl=function i(e,t,n){var r=e.vars,s=r.ease,o=r.startAt,a=r.immediateRender,l=r.lazy,c=r.onUpdate,u=r.runBackwards,h=r.yoyoEase,d=r.keyframes,f=r.autoRevert,m=e._dur,p=e._startAt,y=e._targets,w=e.parent,x=w&&w.data==="nested"?w.vars.targets:y,S=e._overwrite==="auto"&&!ll,k=e.timeline,C=r.easeReverse||h,M,E,O,P,A,Q,_,F,$,U,ne,H,R;if(k&&(!d||!s)&&(s="none"),e._ease=Dr(s,ps.ease),e._rEase=C&&(Dr(C)||e._ease),e._from=!k&&!!r.runBackwards,e._from&&(e.ratio=1),!k||d&&!r.stagger){if(F=y[0]?zr(y[0]).harness:0,H=F&&r[F.prop],M=wo(r,dl),p&&(p._zTime<0&&p.progress(1),t<0&&u&&a&&!f?p.render(-1,!0):p.revert(u&&m?ro:Dp),p._lazy=0),o){if(dr(e._startAt=ut.set(y,fn({data:"isStart",overwrite:!1,parent:w,immediateRender:!0,lazy:!p&&qt(l),startAt:null,delay:0,onUpdate:c&&function(){return an(e,"onUpdate")},stagger:0},o))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(vt||!a&&!f)&&e._startAt.revert(ro),a&&m&&t<=0&&n<=0){t&&(e._zTime=t);return}}else if(u&&m&&!p){if(t&&(a=!1),O=fn({overwrite:!1,data:"isFromStart",lazy:a&&!p&&qt(l),immediateRender:a,stagger:0,parent:w},M),H&&(O[F.prop]=H),dr(e._startAt=ut.set(y,O)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(vt?e._startAt.revert(ro):e._startAt.render(-1,!0)),e._zTime=t,!a)i(e._startAt,Re,Re);else if(!t)return}for(e._pt=e._ptCache=0,l=m&&qt(l)||l&&!m,E=0;E<y.length;E++){if(A=y[E],_=A._gsap||gl(y)[E]._gsap,e._ptLookup[E]=U={},Ca[_.id]&&ur.length&&xo(),ne=x===y?E:x.indexOf(A),F&&($=new F).init(A,H||M,e,ne,x)!==!1&&(e._pt=P=new Yt(e._pt,A,$.name,0,1,$.render,$,0,$.priority),$._props.forEach(function(z){U[z]=P}),$.priority&&(Q=1)),!F||H)for(O in M)en[O]&&($=Lf(O,M,e,ne,A,x))?$.priority&&(Q=1):U[O]=P=_l.call(e,A,O,"get",M[O],ne,x,0,r.stringFilter);e._op&&e._op[E]&&e.kill(A,e._op[E]),S&&e._pt&&(sr=e,Ke.killTweensOf(A,U,e.globalTime(t)),R=!e.parent,sr=0),e._pt&&l&&(Ca[_.id]=1)}Q&&Bf(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!R,d&&t<=0&&k.render(yn,!0,!0)},c0=function(e,t,n,r,s,o,a,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],u,h,d,f;if(!c)for(c=e._ptCache[t]=[],d=e._ptLookup,f=e._targets.length;f--;){if(u=d[f][t],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==t&&u.fp!==t;)u=u._next;if(!u)return Oa=1,e.vars[t]="+=0",yl(e,a),Oa=0,l?gs(t+" not eligible for reset. Try splitting into individual properties"):1;c.push(u)}for(f=c.length;f--;)h=c[f],u=h._pt||h,u.s=(r||r===0)&&!s?r:u.s+(r||0)+o*u.c,u.c=n-u.s,h.e&&(h.e=st(n)+St(h.e)),h.b&&(h.b=u.s+St(h.b))},u0=function(e,t){var n=e[0]?zr(e[0]).harness:0,r=n&&n.aliases,s,o,a,l;if(!r)return t;s=vi({},t);for(o in r)if(o in s)for(l=r[o].split(","),a=l.length;a--;)s[l[a]]=s[o];return s},f0=function(e,t,n,r){var s=t.ease||r||"power1.inOut",o,a;if(Tt(t))a=n[e]||(n[e]=[]),t.forEach(function(l,c){return a.push({t:c/(t.length-1)*100,v:l,e:s})});else for(o in t)a=n[o]||(n[o]=[]),o==="ease"||a.push({t:parseFloat(e),v:t[o],e:s})},es=function(e,t,n,r,s){return nt(e)?e.call(t,n,r,s):yt(e)&&~e.indexOf("random(")?_s(e):e},Df=pl+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",If={};Ht(Df+",id,stagger,delay,duration,paused,scrollTrigger",function(i){return If[i]=1});var ut=function(i){nf(e,i);function e(n,r,s,o){var a;typeof r=="number"&&(s.duration=r,r=s,s=null),a=i.call(this,o?r:Zi(r))||this;var l=a.vars,c=l.duration,u=l.delay,h=l.immediateRender,d=l.stagger,f=l.overwrite,m=l.keyframes,p=l.defaults,y=l.scrollTrigger,w=r.parent||Ke,x=(Tt(n)||sf(n)?Jn(n[0]):"length"in r)?[n]:bn(n),S,k,C,M,E,O,P,A;if(a._targets=x.length?gl(x):gs("GSAP target "+n+" not found. https://gsap.com",!cn.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=f,m||d||Is(c)||Is(u)){r=a.vars;var Q=r.easeReverse||r.yoyoEase;if(S=a.timeline=new Gt({data:"nested",defaults:p||{},targets:w&&w.data==="nested"?w.vars.targets:x}),S.kill(),S.parent=S._dp=Xn(a),S._start=0,d||Is(c)||Is(u)){if(M=x.length,P=d&&wf(d),qn(d))for(E in d)~Df.indexOf(E)&&(A||(A={}),A[E]=d[E]);for(k=0;k<M;k++)C=wo(r,If),C.stagger=0,Q&&(C.easeReverse=Q),A&&vi(C,A),O=x[k],C.duration=+es(c,Xn(a),k,O,x),C.delay=(+es(u,Xn(a),k,O,x)||0)-a._delay,!d&&M===1&&C.delay&&(a._delay=u=C.delay,a._start+=u,C.delay=0),S.to(O,C,P?P(k,O,x):0),S._ease=me.none;S.duration()?c=u=0:a.timeline=0}else if(m){Zi(fn(S.vars.defaults,{ease:"none"})),S._ease=Dr(m.ease||r.ease||"none");var _=0,F,$,U;if(Tt(m))m.forEach(function(ne){return S.to(x,ne,">")}),S.duration();else{C={};for(E in m)E==="ease"||E==="easeEach"||f0(E,m[E],C,m.easeEach);for(E in C)for(F=C[E].sort(function(ne,H){return ne.t-H.t}),_=0,k=0;k<F.length;k++)$=F[k],U={ease:$.e,duration:($.t-(k?F[k-1].t:0))/100*c},U[E]=$.v,S.to(x,U,_),_+=U.duration;S.duration()<c&&S.to({},{duration:c-S.duration()})}}c||a.duration(c=S.duration())}else a.timeline=0;return f===!0&&!ll&&(sr=Xn(a),Ke.killTweensOf(x),sr=0),Nn(w,Xn(a),s),r.reversed&&a.reverse(),r.paused&&a.paused(!0),(h||!c&&!m&&a._start===Qe(w._time)&&qt(h)&&Gp(Xn(a))&&w.data!=="nested")&&(a._tTime=-Re,a.render(Math.max(0,-u)||0)),y&&yf(Xn(a),y),a}var t=e.prototype;return t.render=function(r,s,o){var a=this._time,l=this._tDur,c=this._dur,u=r<0,h=r>l-Re&&!u?l:r<Re?0:r,d,f,m,p,y,w,x,S;if(!c)Hp(this,r,s,o);else if(h!==this._tTime||!r||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(d=h,S=this.timeline,this._repeat){if(p=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(p*100+r,s,o);if(d=Qe(h%p),h===l?(m=this._repeat,d=c):(y=Qe(h/p),m=~~y,m&&m===y?(d=c,m--):d>c&&(d=c)),w=this._yoyo&&m&1,w&&(d=c-d),y=xi(this._tTime,p),d===a&&!o&&this._initted&&m===y)return this._tTime=h,this;m!==y&&this.vars.repeatRefresh&&!w&&!this._lock&&d!==p&&this._initted&&(this._lock=o=1,this.render(Qe(p*m),!0).invalidate()._lock=0)}if(!this._initted){if(bf(this,u?r:d,o,s,h))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&m!==y))return this;if(c!==this._dur)return this.render(r,s,o)}if(this._rEase){var k=d<a;if(k!==this._inv){var C=k?a:c-a;this._inv=k,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=a,this._invRecip=C?(k?-1:1)/C:0,this._invScale=k?-this.ratio:1-this.ratio,this._invEase=k?this._rEase:this._ease}this.ratio=x=this._invRatio+this._invScale*this._invEase((d-this._invTime)*this._invRecip)}else this.ratio=x=this._ease(d/c);if(this._from&&(this.ratio=x=1-x),this._tTime=h,this._time=d,!this._act&&this._ts&&(this._act=1,this._lazy=0),!a&&h&&!s&&!y&&(an(this,"onStart"),this._tTime!==h))return this;for(f=this._pt;f;)f.r(x,f.d),f=f._next;S&&S.render(r<0?r:S._dur*S._ease(d/this._dur),s,o)||this._startAt&&(this._zTime=r),this._onUpdate&&!s&&(u&&Ea(this,r,s,o),an(this,"onUpdate")),this._repeat&&m!==y&&this.vars.onRepeat&&!s&&this.parent&&an(this,"onRepeat"),(h===this._tDur||!h)&&this._tTime===h&&(u&&!this._onUpdate&&Ea(this,r,!0,!0),(r||!c)&&(h===this._tDur&&this._ts>0||!h&&this._ts<0)&&dr(this,1),!s&&!(u&&!a)&&(h||a||w)&&(an(this,h===l?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(r){return(!r||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(r),i.prototype.invalidate.call(this,r)},t.resetTo=function(r,s,o,a,l){ys||sn.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||yl(this,c),u=this._ease(c/this._dur),c0(this,r,s,o,a,u,c,l)?this.resetTo(r,s,o,a,1):($o(this,0),this.parent||mf(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(r,s){if(s===void 0&&(s="all"),!r&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?qi(this):this.scrollTrigger&&this.scrollTrigger.kill(!!vt),this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(r,s,sr&&sr.vars.overwrite!==!0)._first||qi(this),this.parent&&o!==this.timeline.totalDuration()&&wi(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=r?bn(r):a,c=this._ptLookup,u=this._pt,h,d,f,m,p,y,w;if((!s||s==="all")&&Fp(a,l))return s==="all"&&(this._pt=0),qi(this);for(h=this._op=this._op||[],s!=="all"&&(yt(s)&&(p={},Ht(s,function(x){return p[x]=1}),s=p),s=u0(a,s)),w=a.length;w--;)if(~l.indexOf(a[w])){d=c[w],s==="all"?(h[w]=s,m=d,f={}):(f=h[w]=h[w]||{},m=s);for(p in m)y=d&&d[p],y&&((!("kill"in y.d)||y.d.kill(p)===!0)&&Io(this,y,"_pt"),delete d[p]),f!=="all"&&(f[p]=1)}return this._initted&&!this._pt&&u&&qi(this),this},e.to=function(r,s){return new e(r,s,arguments[2])},e.from=function(r,s){return Ji(1,arguments)},e.delayedCall=function(r,s,o,a){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:r,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},e.fromTo=function(r,s,o){return Ji(2,arguments)},e.set=function(r,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(r,s)},e.killTweensOf=function(r,s,o){return Ke.killTweensOf(r,s,o)},e}(bs);fn(ut.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});Ht("staggerTo,staggerFrom,staggerFromTo",function(i){ut[i]=function(){var e=new Gt,t=Pa.call(arguments,0);return t.splice(i==="staggerFromTo"?5:4,0,0),e[i].apply(e,t)}});var bl=function(e,t,n){return e[t]=n},Nf=function(e,t,n){return e[t](n)},h0=function(e,t,n,r){return e[t](r.fp,n)},d0=function(e,t,n){return e.setAttribute(t,n)},vl=function(e,t){return nt(e[t])?Nf:cl(e[t])&&e.setAttribute?d0:bl},$f=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},p0=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},Ff=function(e,t){var n=t._pt,r="";if(!e&&t.b)r=t.b;else if(e===1&&t.e)r=t.e;else{for(;n;)r=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+r,n=n._next;r+=t.c}t.set(t.t,t.p,r,t)},xl=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},g0=function(e,t,n,r){for(var s=this._pt,o;s;)o=s._next,s.p===r&&s.modifier(e,t,n),s=o},m0=function(e){for(var t=this._pt,n,r;t;)r=t._next,t.p===e&&!t.op||t.op===e?Io(this,t,"_pt"):t.dep||(n=1),t=r;return!n},_0=function(e,t,n,r){r.mSet(e,t,r.m.call(r.tween,n,r.mt),r)},Bf=function(e){for(var t=e._pt,n,r,s,o;t;){for(n=t._next,r=s;r&&r.pr>t.pr;)r=r._next;(t._prev=r?r._prev:o)?t._prev._next=t:s=t,(t._next=r)?r._prev=t:o=t,t=n}e._pt=s},Yt=function(){function i(t,n,r,s,o,a,l,c,u){this.t=n,this.s=s,this.c=o,this.p=r,this.r=a||$f,this.d=l||this,this.set=c||bl,this.pr=u||0,this._next=t,t&&(t._prev=this)}var e=i.prototype;return e.modifier=function(n,r,s){this.mSet=this.mSet||this.set,this.set=_0,this.m=n,this.mt=s,this.tween=r},i}();Ht(pl+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(i){return dl[i]=1});un.TweenMax=un.TweenLite=ut;un.TimelineLite=un.TimelineMax=Gt;Ke=new Gt({sortChildren:!1,defaults:ps,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});cn.stringFilter=Rf;var Ir=[],so={},y0=[],Oc=0,b0=0,la=function(e){return(so[e]||y0).map(function(t){return t()})},za=function(){var e=Date.now(),t=[];e-Oc>2&&(la("matchMediaInit"),Ir.forEach(function(n){var r=n.queries,s=n.conditions,o,a,l,c;for(a in r)o=zn.matchMedia(r[a]).matches,o&&(l=1),o!==s[a]&&(s[a]=o,c=1);c&&(n.revert(),l&&t.push(n))}),la("matchMediaRevert"),t.forEach(function(n){return n.onMatch(n,function(r){return n.add(null,r)})}),Oc=e,la("matchMedia"))},Gf=function(){function i(t,n){this.selector=n&&Aa(n),this.data=[],this._r=[],this.isReverted=!1,this.id=b0++,t&&this.add(t)}var e=i.prototype;return e.add=function(n,r,s){nt(n)&&(s=r,r=n,n=nt);var o=this,a=function(){var c=qe,u=o.selector,h;return c&&c!==o&&c.data.push(o),s&&(o.selector=Aa(s)),qe=o,h=r.apply(o,arguments),nt(h)&&o._r.push(h),qe=c,o.selector=u,o.isReverted=!1,h};return o.last=a,n===nt?a(o,function(l){return o.add(null,l)}):n?o[n]=a:a},e.ignore=function(n){var r=qe;qe=null,n(this),qe=r},e.getTweens=function(){var n=[];return this.data.forEach(function(r){return r instanceof i?n.push.apply(n,r.getTweens()):r instanceof ut&&!(r.parent&&r.parent.data==="nested")&&n.push(r)}),n},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(n,r){var s=this;if(n?function(){for(var a=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return a.splice(a.indexOf(u),1)}));for(a.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,h){return h.g-u.g||-1/0}).forEach(function(u){return u.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof Gt?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof ut)&&c.revert&&c.revert(n);s._r.forEach(function(u){return u(n,s)}),s.isReverted=!0}():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),r)for(var o=Ir.length;o--;)Ir[o].id===this.id&&Ir.splice(o,1)},e.revert=function(n){this.kill(n||{})},i}(),v0=function(){function i(t){this.contexts=[],this.scope=t,qe&&qe.data.push(this)}var e=i.prototype;return e.add=function(n,r,s){qn(n)||(n={matches:n});var o=new Gf(0,s||this.scope),a=o.conditions={},l,c,u;qe&&!o.selector&&(o.selector=qe.selector),this.contexts.push(o),r=o.add("onMatch",r),o.queries=n;for(c in n)c==="all"?u=1:(l=zn.matchMedia(n[c]),l&&(Ir.indexOf(o)<0&&Ir.push(o),(a[c]=l.matches)&&(u=1),l.addListener?l.addListener(za):l.addEventListener("change",za)));return u&&r(o,function(h){return o.add(null,h)}),this},e.revert=function(n){this.kill(n||{})},e.kill=function(n){this.contexts.forEach(function(r){return r.kill(n,!0)})},i}(),ko={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(r){return Mf(r)})},timeline:function(e){return new Gt(e)},getTweensOf:function(e,t){return Ke.getTweensOf(e,t)},getProperty:function(e,t,n,r){yt(e)&&(e=bn(e)[0]);var s=zr(e||{}).get,o=n?gf:pf;return n==="native"&&(n=""),e&&(t?o((en[t]&&en[t].get||s)(e,t,n,r)):function(a,l,c){return o((en[a]&&en[a].get||s)(e,a,l,c))})},quickSetter:function(e,t,n){if(e=bn(e),e.length>1){var r=e.map(function(u){return Xt.quickSetter(u,t,n)}),s=r.length;return function(u){for(var h=s;h--;)r[h](u)}}e=e[0]||{};var o=en[t],a=zr(e),l=a.harness&&(a.harness.aliases||{})[t]||t,c=o?function(u){var h=new o;ci._pt=0,h.init(e,n?u+n:u,ci,0,[e]),h.render(1,h),ci._pt&&xl(1,ci)}:a.set(e,l);return o?c:function(u){return c(e,l,n?u+n:u,a,1)}},quickTo:function(e,t,n){var r,s=Xt.to(e,fn((r={},r[t]="+=0.1",r.paused=!0,r.stagger=0,r),n||{})),o=function(l,c,u){return s.resetTo(t,l,c,u)};return o.tween=s,o},isTweening:function(e){return Ke.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=Dr(e.ease,ps.ease)),Ec(ps,e||{})},config:function(e){return Ec(cn,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,r=e.plugins,s=e.defaults,o=e.extendTimeline;(r||"").split(",").forEach(function(a){return a&&!en[a]&&!un[a]&&gs(t+" effect requires "+a+" plugin.")}),ia[t]=function(a,l,c){return n(bn(a),fn(l||{},s),c)},o&&(Gt.prototype[t]=function(a,l,c){return this.add(ia[t](a,qn(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){me[e]=Dr(t)},parseEase:function(e,t){return arguments.length?Dr(e,t):me},getById:function(e){return Ke.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new Gt(e),r,s;for(n.smoothChildTiming=qt(e.smoothChildTiming),Ke.remove(n),n._dp=0,n._time=n._tTime=Ke._time,r=Ke._first;r;)s=r._next,(t||!(!r._dur&&r instanceof ut&&r.vars.onComplete===r._targets[0]))&&Nn(n,r,r._start-r._delay),r=s;return Nn(Ke,n,0),n},context:function(e,t){return e?new Gf(e,t):qe},matchMedia:function(e){return new v0(e)},matchMediaRefresh:function(){return Ir.forEach(function(e){var t=e.conditions,n,r;for(r in t)t[r]&&(t[r]=!1,n=1);n&&e.revert()})||za()},addEventListener:function(e,t){var n=so[e]||(so[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=so[e],r=n&&n.indexOf(t);r>=0&&n.splice(r,1)},utils:{wrap:Kp,wrapYoyo:Zp,distribute:wf,random:kf,snap:Sf,normalize:Qp,getUnit:St,clamp:Xp,splitColor:Pf,toArray:bn,selector:Aa,mapRange:Cf,pipe:Vp,unitize:jp,interpolate:Jp,shuffle:xf},install:cf,effects:ia,ticker:sn,updateRoot:Gt.updateRoot,plugins:en,globalTimeline:Ke,core:{PropTween:Yt,globals:uf,Tween:ut,Timeline:Gt,Animation:bs,getCache:zr,_removeLinkedListItem:Io,reverting:function(){return vt},context:function(e){return e&&qe&&(qe.data.push(e),e._ctx=qe),qe},suppressOverwrites:function(e){return ll=e}}};Ht("to,from,fromTo,delayedCall,set,killTweensOf",function(i){return ko[i]=ut[i]});sn.add(Gt.updateRoot);ci=ko.to({},{duration:0});var x0=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},w0=function(e,t){var n=e._targets,r,s,o;for(r in t)for(s=n.length;s--;)o=e._ptLookup[s][r],o&&(o=o.d)&&(o._pt&&(o=x0(o,r)),o&&o.modifier&&o.modifier(t[r],e,n[s],r))},ca=function(e,t){return{name:e,headless:1,rawVars:1,init:function(r,s,o){o._onInit=function(a){var l,c;if(yt(s)&&(l={},Ht(s,function(u){return l[u]=1}),s=l),t){l={};for(c in s)l[c]=t(s[c]);s=l}w0(a,s)}}}},Xt=ko.registerPlugin({name:"attr",init:function(e,t,n,r,s){var o,a,l;this.tween=n;for(o in t)l=e.getAttribute(o)||"",a=this.add(e,"setAttribute",(l||0)+"",t[o],r,s,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(e,t){for(var n=t._pt;n;)vt?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:"endArray",headless:1,init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},ca("roundProps",Ra),ca("modifiers"),ca("snap",Sf))||ko;ut.version=Gt.version=Xt.version="3.15.0";lf=1;ul()&&Si();me.Power0;me.Power1;me.Power2;me.Power3;me.Power4;me.Linear;me.Quad;me.Cubic;me.Quart;me.Quint;me.Strong;me.Elastic;me.Back;me.SteppedEase;me.Bounce;me.Sine;me.Expo;me.Circ;/*!
 * CSSPlugin 3.15.0
 * https://gsap.com
 *
 * Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var zc,or,di,wl,Pr,Lc,Sl,S0=function(){return typeof window<"u"},er={},Cr=180/Math.PI,pi=Math.PI/180,Jr=Math.atan2,Dc=1e8,kl=/([A-Z])/g,k0=/(left|right|width|margin|padding|x)/i,T0=/[\s,\(]\S/,$n={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},La=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},C0=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},E0=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},M0=function(e,t){return t.set(t.t,t.p,e===1?t.e:e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},P0=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},qf=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},Hf=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},A0=function(e,t,n){return e.style[t]=n},R0=function(e,t,n){return e.style.setProperty(t,n)},O0=function(e,t,n){return e._gsap[t]=n},z0=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},L0=function(e,t,n,r,s){var o=e._gsap;o.scaleX=o.scaleY=n,o.renderTransform(s,o)},D0=function(e,t,n,r,s){var o=e._gsap;o[t]=n,o.renderTransform(s,o)},Ze="transform",Wt=Ze+"Origin",I0=function i(e,t){var n=this,r=this.target,s=r.style,o=r._gsap;if(e in er&&s){if(this.tfm=this.tfm||{},e!=="transform")e=$n[e]||e,~e.indexOf(",")?e.split(",").forEach(function(a){return n.tfm[a]=Un(r,a)}):this.tfm[e]=o.x?o[e]:Un(r,e),e===Wt&&(this.tfm.zOrigin=o.zOrigin);else return $n.transform.split(",").forEach(function(a){return i.call(n,a,t)});if(this.props.indexOf(Ze)>=0)return;o.svg&&(this.svgo=r.getAttribute("data-svg-origin"),this.props.push(Wt,t,"")),e=Ze}(s||t)&&this.props.push(e,t,s[e])},Yf=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},N0=function(){var e=this.props,t=this.target,n=t.style,r=t._gsap,s,o;for(s=0;s<e.length;s+=3)e[s+1]?e[s+1]===2?t[e[s]](e[s+2]):t[e[s]]=e[s+2]:e[s+2]?n[e[s]]=e[s+2]:n.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(kl,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)r[o]=this.tfm[o];r.svg&&(r.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),s=Sl(),(!s||!s.isStart)&&!n[Ze]&&(Yf(n),r.zOrigin&&n[Wt]&&(n[Wt]+=" "+r.zOrigin+"px",r.zOrigin=0,r.renderTransform()),r.uncache=1)}},Wf=function(e,t){var n={target:e,props:[],revert:N0,save:I0};return e._gsap||Xt.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(r){return n.save(r)}),n},Xf,Da=function(e,t){var n=or.createElementNS?or.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):or.createElement(e);return n&&n.style?n:or.createElement(e)},ln=function i(e,t,n){var r=getComputedStyle(e);return r[t]||r.getPropertyValue(t.replace(kl,"-$1").toLowerCase())||r.getPropertyValue(t)||!n&&i(e,ki(t)||t,1)||""},Ic="O,Moz,ms,Ms,Webkit".split(","),ki=function(e,t,n){var r=t||Pr,s=r.style,o=5;if(e in s&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);o--&&!(Ic[o]+e in s););return o<0?null:(o===3?"ms":o>=0?Ic[o]:"")+e},Ia=function(){S0()&&window.document&&(zc=window,or=zc.document,di=or.documentElement,Pr=Da("div")||{style:{}},Da("div"),Ze=ki(Ze),Wt=Ze+"Origin",Pr.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Xf=!!ki("perspective"),Sl=Xt.core.reverting,wl=1)},Nc=function(e){var t=e.ownerSVGElement,n=Da("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),r=e.cloneNode(!0),s;r.style.display="block",n.appendChild(r),di.appendChild(n);try{s=r.getBBox()}catch{}return n.removeChild(r),di.removeChild(n),s},$c=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},Uf=function(e){var t,n;try{t=e.getBBox()}catch{t=Nc(e),n=1}return t&&(t.width||t.height)||n||(t=Nc(e)),t&&!t.width&&!t.x&&!t.y?{x:+$c(e,["x","cx","x1"])||0,y:+$c(e,["y","cy","y1"])||0,width:0,height:0}:t},Vf=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&Uf(e))},pr=function(e,t){if(t){var n=e.style,r;t in er&&t!==Wt&&(t=Ze),n.removeProperty?(r=t.substr(0,2),(r==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),n.removeProperty(r==="--"?t:t.replace(kl,"-$1").toLowerCase())):n.removeAttribute(t)}},ar=function(e,t,n,r,s,o){var a=new Yt(e._pt,t,n,0,1,o?Hf:qf);return e._pt=a,a.b=r,a.e=s,e._props.push(n),a},Fc={deg:1,rad:1,turn:1},$0={grid:1,flex:1},gr=function i(e,t,n,r){var s=parseFloat(n)||0,o=(n+"").trim().substr((s+"").length)||"px",a=Pr.style,l=k0.test(t),c=e.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),h=100,d=r==="px",f=r==="%",m,p,y,w;if(r===o||!s||Fc[r]||Fc[o])return s;if(o!=="px"&&!d&&(s=i(e,t,n,"px")),w=e.getCTM&&Vf(e),(f||o==="%")&&(er[t]||~t.indexOf("adius")))return m=w?e.getBBox()[l?"width":"height"]:e[u],st(f?s/m*h:s/100*m);if(a[l?"width":"height"]=h+(d?o:r),p=r!=="rem"&&~t.indexOf("adius")||r==="em"&&e.appendChild&&!c?e:e.parentNode,w&&(p=(e.ownerSVGElement||{}).parentNode),(!p||p===or||!p.appendChild)&&(p=or.body),y=p._gsap,y&&f&&y.width&&l&&y.time===sn.time&&!y.uncache)return st(s/y.width*h);if(f&&(t==="height"||t==="width")){var x=e.style[t];e.style[t]=h+r,m=e[u],x?e.style[t]=x:pr(e,t)}else(f||o==="%")&&!$0[ln(p,"display")]&&(a.position=ln(e,"position")),p===e&&(a.position="static"),p.appendChild(Pr),m=Pr[u],p.removeChild(Pr),a.position="absolute";return l&&f&&(y=zr(p),y.time=sn.time,y.width=p[u]),st(d?m*s/h:m&&s?h/m*s:0)},Un=function(e,t,n,r){var s;return wl||Ia(),t in $n&&t!=="transform"&&(t=$n[t],~t.indexOf(",")&&(t=t.split(",")[0])),er[t]&&t!=="transform"?(s=xs(e,r),s=t!=="transformOrigin"?s[t]:s.svg?s.origin:Co(ln(e,Wt))+" "+s.zOrigin+"px"):(s=e.style[t],(!s||s==="auto"||r||~(s+"").indexOf("calc("))&&(s=To[t]&&To[t](e,t,n)||ln(e,t)||hf(e,t)||(t==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?gr(e,t,s,n)+n:s},F0=function(e,t,n,r){if(!n||n==="none"){var s=ki(t,e,1),o=s&&ln(e,s,1);o&&o!==n?(t=s,n=o):t==="borderColor"&&(n=ln(e,"borderTopColor"))}var a=new Yt(this._pt,e.style,t,0,1,Ff),l=0,c=0,u,h,d,f,m,p,y,w,x,S,k,C;if(a.b=n,a.e=r,n+="",r+="",r.substring(0,6)==="var(--"&&(r=ln(e,r.substring(4,r.indexOf(")")))),r==="auto"&&(p=e.style[t],e.style[t]=r,r=ln(e,t)||r,p?e.style[t]=p:pr(e,t)),u=[n,r],Rf(u),n=u[0],r=u[1],d=n.match(li)||[],C=r.match(li)||[],C.length){for(;h=li.exec(r);)y=h[0],x=r.substring(l,h.index),m?m=(m+1)%5:(x.substr(-5)==="rgba("||x.substr(-5)==="hsla(")&&(m=1),y!==(p=d[c++]||"")&&(f=parseFloat(p)||0,k=p.substr((f+"").length),y.charAt(1)==="="&&(y=hi(f,y)+k),w=parseFloat(y),S=y.substr((w+"").length),l=li.lastIndex-S.length,S||(S=S||cn.units[t]||k,l===r.length&&(r+=S,a.e+=S)),k!==S&&(f=gr(e,t,p,S)||0),a._pt={_next:a._pt,p:x||c===1?x:",",s:f,c:w-f,m:m&&m<4||t==="zIndex"?Math.round:0});a.c=l<r.length?r.substring(l,r.length):""}else a.r=t==="display"&&r==="none"?Hf:qf;return af.test(r)&&(a.e=0),this._pt=a,a},Bc={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},B0=function(e){var t=e.split(" "),n=t[0],r=t[1]||"50%";return(n==="top"||n==="bottom"||r==="left"||r==="right")&&(e=n,n=r,r=e),t[0]=Bc[n]||n,t[1]=Bc[r]||r,t.join(" ")},G0=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,r=n.style,s=t.u,o=n._gsap,a,l,c;if(s==="all"||s===!0)r.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)a=s[c],er[a]&&(l=1,a=a==="transformOrigin"?Wt:Ze),pr(n,a);l&&(pr(n,Ze),o&&(o.svg&&n.removeAttribute("transform"),r.scale=r.rotate=r.translate="none",xs(n,1),o.uncache=1,Yf(r)))}},To={clearProps:function(e,t,n,r,s){if(s.data!=="isFromStart"){var o=e._pt=new Yt(e._pt,t,n,0,0,G0);return o.u=r,o.pr=-10,o.tween=s,e._props.push(n),1}}},vs=[1,0,0,1,0,0],jf={},Qf=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},Gc=function(e){var t=ln(e,Ze);return Qf(t)?vs:t.substr(7).match(of).map(st)},Tl=function(e,t){var n=e._gsap||zr(e),r=e.style,s=Gc(e),o,a,l,c;return n.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?vs:s):(s===vs&&!e.offsetParent&&e!==di&&!n.svg&&(l=r.display,r.display="block",o=e.parentNode,(!o||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,a=e.nextElementSibling,di.appendChild(e)),s=Gc(e),l?r.display=l:pr(e,"display"),c&&(a?o.insertBefore(e,a):o?o.appendChild(e):di.removeChild(e))),t&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},Na=function(e,t,n,r,s,o){var a=e._gsap,l=s||Tl(e,!0),c=a.xOrigin||0,u=a.yOrigin||0,h=a.xOffset||0,d=a.yOffset||0,f=l[0],m=l[1],p=l[2],y=l[3],w=l[4],x=l[5],S=t.split(" "),k=parseFloat(S[0])||0,C=parseFloat(S[1])||0,M,E,O,P;n?l!==vs&&(E=f*y-m*p)&&(O=k*(y/E)+C*(-p/E)+(p*x-y*w)/E,P=k*(-m/E)+C*(f/E)-(f*x-m*w)/E,k=O,C=P):(M=Uf(e),k=M.x+(~S[0].indexOf("%")?k/100*M.width:k),C=M.y+(~(S[1]||S[0]).indexOf("%")?C/100*M.height:C)),r||r!==!1&&a.smooth?(w=k-c,x=C-u,a.xOffset=h+(w*f+x*p)-w,a.yOffset=d+(w*m+x*y)-x):a.xOffset=a.yOffset=0,a.xOrigin=k,a.yOrigin=C,a.smooth=!!r,a.origin=t,a.originIsAbsolute=!!n,e.style[Wt]="0px 0px",o&&(ar(o,a,"xOrigin",c,k),ar(o,a,"yOrigin",u,C),ar(o,a,"xOffset",h,a.xOffset),ar(o,a,"yOffset",d,a.yOffset)),e.setAttribute("data-svg-origin",k+" "+C)},xs=function(e,t){var n=e._gsap||new zf(e);if("x"in n&&!t&&!n.uncache)return n;var r=e.style,s=n.scaleX<0,o="px",a="deg",l=getComputedStyle(e),c=ln(e,Wt)||"0",u,h,d,f,m,p,y,w,x,S,k,C,M,E,O,P,A,Q,_,F,$,U,ne,H,R,z,b,J,ee,G,V,te;return u=h=d=p=y=w=x=S=k=0,f=m=1,n.svg=!!(e.getCTM&&Vf(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(r[Ze]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[Ze]!=="none"?l[Ze]:"")),r.scale=r.rotate=r.translate="none"),E=Tl(e,n.svg),n.svg&&(n.uncache?(R=e.getBBox(),c=n.xOrigin-R.x+"px "+(n.yOrigin-R.y)+"px",H=""):H=!t&&e.getAttribute("data-svg-origin"),Na(e,H||c,!!H||n.originIsAbsolute,n.smooth!==!1,E)),C=n.xOrigin||0,M=n.yOrigin||0,E!==vs&&(Q=E[0],_=E[1],F=E[2],$=E[3],u=U=E[4],h=ne=E[5],E.length===6?(f=Math.sqrt(Q*Q+_*_),m=Math.sqrt($*$+F*F),p=Q||_?Jr(_,Q)*Cr:0,x=F||$?Jr(F,$)*Cr+p:0,x&&(m*=Math.abs(Math.cos(x*pi))),n.svg&&(u-=C-(C*Q+M*F),h-=M-(C*_+M*$))):(te=E[6],G=E[7],b=E[8],J=E[9],ee=E[10],V=E[11],u=E[12],h=E[13],d=E[14],O=Jr(te,ee),y=O*Cr,O&&(P=Math.cos(-O),A=Math.sin(-O),H=U*P+b*A,R=ne*P+J*A,z=te*P+ee*A,b=U*-A+b*P,J=ne*-A+J*P,ee=te*-A+ee*P,V=G*-A+V*P,U=H,ne=R,te=z),O=Jr(-F,ee),w=O*Cr,O&&(P=Math.cos(-O),A=Math.sin(-O),H=Q*P-b*A,R=_*P-J*A,z=F*P-ee*A,V=$*A+V*P,Q=H,_=R,F=z),O=Jr(_,Q),p=O*Cr,O&&(P=Math.cos(O),A=Math.sin(O),H=Q*P+_*A,R=U*P+ne*A,_=_*P-Q*A,ne=ne*P-U*A,Q=H,U=R),y&&Math.abs(y)+Math.abs(p)>359.9&&(y=p=0,w=180-w),f=st(Math.sqrt(Q*Q+_*_+F*F)),m=st(Math.sqrt(ne*ne+te*te)),O=Jr(U,ne),x=Math.abs(O)>2e-4?O*Cr:0,k=V?1/(V<0?-V:V):0),n.svg&&(H=e.getAttribute("transform"),n.forceCSS=e.setAttribute("transform","")||!Qf(ln(e,Ze)),H&&e.setAttribute("transform",H))),Math.abs(x)>90&&Math.abs(x)<270&&(s?(f*=-1,x+=p<=0?180:-180,p+=p<=0?180:-180):(m*=-1,x+=x<=0?180:-180)),t=t||n.uncache,n.x=u-((n.xPercent=u&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-u)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+o,n.y=h-((n.yPercent=h&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-h)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+o,n.z=d+o,n.scaleX=st(f),n.scaleY=st(m),n.rotation=st(p)+a,n.rotationX=st(y)+a,n.rotationY=st(w)+a,n.skewX=x+a,n.skewY=S+a,n.transformPerspective=k+o,(n.zOrigin=parseFloat(c.split(" ")[2])||!t&&n.zOrigin||0)&&(r[Wt]=Co(c)),n.xOffset=n.yOffset=0,n.force3D=cn.force3D,n.renderTransform=n.svg?H0:Xf?Kf:q0,n.uncache=0,n},Co=function(e){return(e=e.split(" "))[0]+" "+e[1]},ua=function(e,t,n){var r=St(t);return st(parseFloat(t)+parseFloat(gr(e,"x",n+"px",r)))+r},q0=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,Kf(e,t)},Sr="0deg",Ri="0px",kr=") ",Kf=function(e,t){var n=t||this,r=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.z,c=n.rotation,u=n.rotationY,h=n.rotationX,d=n.skewX,f=n.skewY,m=n.scaleX,p=n.scaleY,y=n.transformPerspective,w=n.force3D,x=n.target,S=n.zOrigin,k="",C=w==="auto"&&e&&e!==1||w===!0;if(S&&(h!==Sr||u!==Sr)){var M=parseFloat(u)*pi,E=Math.sin(M),O=Math.cos(M),P;M=parseFloat(h)*pi,P=Math.cos(M),o=ua(x,o,E*P*-S),a=ua(x,a,-Math.sin(M)*-S),l=ua(x,l,O*P*-S+S)}y!==Ri&&(k+="perspective("+y+kr),(r||s)&&(k+="translate("+r+"%, "+s+"%) "),(C||o!==Ri||a!==Ri||l!==Ri)&&(k+=l!==Ri||C?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+kr),c!==Sr&&(k+="rotate("+c+kr),u!==Sr&&(k+="rotateY("+u+kr),h!==Sr&&(k+="rotateX("+h+kr),(d!==Sr||f!==Sr)&&(k+="skew("+d+", "+f+kr),(m!==1||p!==1)&&(k+="scale("+m+", "+p+kr),x.style[Ze]=k||"translate(0, 0)"},H0=function(e,t){var n=t||this,r=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.rotation,c=n.skewX,u=n.skewY,h=n.scaleX,d=n.scaleY,f=n.target,m=n.xOrigin,p=n.yOrigin,y=n.xOffset,w=n.yOffset,x=n.forceCSS,S=parseFloat(o),k=parseFloat(a),C,M,E,O,P;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=pi,c*=pi,C=Math.cos(l)*h,M=Math.sin(l)*h,E=Math.sin(l-c)*-d,O=Math.cos(l-c)*d,c&&(u*=pi,P=Math.tan(c-u),P=Math.sqrt(1+P*P),E*=P,O*=P,u&&(P=Math.tan(u),P=Math.sqrt(1+P*P),C*=P,M*=P)),C=st(C),M=st(M),E=st(E),O=st(O)):(C=h,O=d,M=E=0),(S&&!~(o+"").indexOf("px")||k&&!~(a+"").indexOf("px"))&&(S=gr(f,"x",o,"px"),k=gr(f,"y",a,"px")),(m||p||y||w)&&(S=st(S+m-(m*C+p*E)+y),k=st(k+p-(m*M+p*O)+w)),(r||s)&&(P=f.getBBox(),S=st(S+r/100*P.width),k=st(k+s/100*P.height)),P="matrix("+C+","+M+","+E+","+O+","+S+","+k+")",f.setAttribute("transform",P),x&&(f.style[Ze]=P)},Y0=function(e,t,n,r,s){var o=360,a=yt(s),l=parseFloat(s)*(a&&~s.indexOf("rad")?Cr:1),c=l-r,u=r+c+"deg",h,d;return a&&(h=s.split("_")[1],h==="short"&&(c%=o,c!==c%(o/2)&&(c+=c<0?o:-o)),h==="cw"&&c<0?c=(c+o*Dc)%o-~~(c/o)*o:h==="ccw"&&c>0&&(c=(c-o*Dc)%o-~~(c/o)*o)),e._pt=d=new Yt(e._pt,t,n,r,c,C0),d.e=u,d.u="deg",e._props.push(n),d},qc=function(e,t){for(var n in t)e[n]=t[n];return e},W0=function(e,t,n){var r=qc({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=n.style,a,l,c,u,h,d,f,m;r.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),o[Ze]=t,a=xs(n,1),pr(n,Ze),n.setAttribute("transform",c)):(c=getComputedStyle(n)[Ze],o[Ze]=t,a=xs(n,1),o[Ze]=c);for(l in er)c=r[l],u=a[l],c!==u&&s.indexOf(l)<0&&(f=St(c),m=St(u),h=f!==m?gr(n,l,c,m):parseFloat(c),d=parseFloat(u),e._pt=new Yt(e._pt,a,l,h,d-h,La),e._pt.u=m||0,e._props.push(l));qc(a,r)};Ht("padding,margin,Width,Radius",function(i,e){var t="Top",n="Right",r="Bottom",s="Left",o=(e<3?[t,n,r,s]:[t+s,t+n,r+n,r+s]).map(function(a){return e<2?i+a:"border"+a+i});To[e>1?"border"+i:i]=function(a,l,c,u,h){var d,f;if(arguments.length<4)return d=o.map(function(m){return Un(a,m,c)}),f=d.join(" "),f.split(d[0]).length===5?d[0]:f;d=(u+"").split(" "),f={},o.forEach(function(m,p){return f[m]=d[p]=d[p]||d[(p-1)/2|0]}),a.init(l,f,h)}});var Zf={name:"css",register:Ia,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,r,s){var o=this._props,a=e.style,l=n.vars.startAt,c,u,h,d,f,m,p,y,w,x,S,k,C,M,E,O,P;wl||Ia(),this.styles=this.styles||Wf(e),O=this.styles.props,this.tween=n;for(p in t)if(p!=="autoRound"&&(u=t[p],!(en[p]&&Lf(p,t,n,r,e,s)))){if(f=typeof u,m=To[p],f==="function"&&(u=u.call(n,r,e,s),f=typeof u),f==="string"&&~u.indexOf("random(")&&(u=_s(u)),m)m(this,e,p,u,n)&&(E=1);else if(p.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(p)+"").trim(),u+="",fr.lastIndex=0,fr.test(c)||(y=St(c),w=St(u),w?y!==w&&(c=gr(e,p,c,w)+w):y&&(u+=y)),this.add(a,"setProperty",c,u,r,s,0,0,p),o.push(p),O.push(p,0,a[p]);else if(f!=="undefined"){if(l&&p in l?(c=typeof l[p]=="function"?l[p].call(n,r,e,s):l[p],yt(c)&&~c.indexOf("random(")&&(c=_s(c)),St(c+"")||c==="auto"||(c+=cn.units[p]||St(Un(e,p))||""),(c+"").charAt(1)==="="&&(c=Un(e,p))):c=Un(e,p),d=parseFloat(c),x=f==="string"&&u.charAt(1)==="="&&u.substr(0,2),x&&(u=u.substr(2)),h=parseFloat(u),p in $n&&(p==="autoAlpha"&&(d===1&&Un(e,"visibility")==="hidden"&&h&&(d=0),O.push("visibility",0,a.visibility),ar(this,a,"visibility",d?"inherit":"hidden",h?"inherit":"hidden",!h)),p!=="scale"&&p!=="transform"&&(p=$n[p],~p.indexOf(",")&&(p=p.split(",")[0]))),S=p in er,S){if(this.styles.save(p),P=u,f==="string"&&u.substring(0,6)==="var(--"){if(u=ln(e,u.substring(4,u.indexOf(")"))),u.substring(0,5)==="calc("){var A=e.style.perspective;e.style.perspective=u,u=ln(e,"perspective"),A?e.style.perspective=A:pr(e,"perspective")}h=parseFloat(u)}if(k||(C=e._gsap,C.renderTransform&&!t.parseTransform||xs(e,t.parseTransform),M=t.smoothOrigin!==!1&&C.smooth,k=this._pt=new Yt(this._pt,a,Ze,0,1,C.renderTransform,C,0,-1),k.dep=1),p==="scale")this._pt=new Yt(this._pt,C,"scaleY",C.scaleY,(x?hi(C.scaleY,x+h):h)-C.scaleY||0,La),this._pt.u=0,o.push("scaleY",p),p+="X";else if(p==="transformOrigin"){O.push(Wt,0,a[Wt]),u=B0(u),C.svg?Na(e,u,0,M,0,this):(w=parseFloat(u.split(" ")[2])||0,w!==C.zOrigin&&ar(this,C,"zOrigin",C.zOrigin,w),ar(this,a,p,Co(c),Co(u)));continue}else if(p==="svgOrigin"){Na(e,u,1,M,0,this);continue}else if(p in jf){Y0(this,C,p,d,x?hi(d,x+u):u);continue}else if(p==="smoothOrigin"){ar(this,C,"smooth",C.smooth,u);continue}else if(p==="force3D"){C[p]=u;continue}else if(p==="transform"){W0(this,u,e);continue}}else p in a||(p=ki(p)||p);if(S||(h||h===0)&&(d||d===0)&&!T0.test(u)&&p in a)y=(c+"").substr((d+"").length),h||(h=0),w=St(u)||(p in cn.units?cn.units[p]:y),y!==w&&(d=gr(e,p,c,w)),this._pt=new Yt(this._pt,S?C:a,p,d,(x?hi(d,x+h):h)-d,!S&&(w==="px"||p==="zIndex")&&t.autoRound!==!1?P0:La),this._pt.u=w||0,S&&P!==u?(this._pt.b=c,this._pt.e=P,this._pt.r=M0):y!==w&&w!=="%"&&(this._pt.b=c,this._pt.r=E0);else if(p in a)F0.call(this,e,p,c,x?x+u:u);else if(p in e)this.add(e,p,c||e[p],x?x+u:u,r,s);else if(p!=="parseTransform"){hl(p,u);continue}S||(p in a?O.push(p,0,a[p]):typeof e[p]=="function"?O.push(p,2,e[p]()):O.push(p,1,c||e[p])),o.push(p)}}E&&Bf(this)},render:function(e,t){if(t.tween._time||!Sl())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:Un,aliases:$n,getSetter:function(e,t,n){var r=$n[t];return r&&r.indexOf(",")<0&&(t=r),t in er&&t!==Wt&&(e._gsap.x||Un(e,"x"))?n&&Lc===n?t==="scale"?z0:O0:(Lc=n||{})&&(t==="scale"?L0:D0):e.style&&!cl(e.style[t])?A0:~t.indexOf("-")?R0:vl(e,t)},core:{_removeProperty:pr,_getMatrix:Tl}};Xt.utils.checkPrefix=ki;Xt.core.getStyleSaver=Wf;(function(i,e,t,n){var r=Ht(i+","+e+","+t,function(s){er[s]=1});Ht(e,function(s){cn.units[s]="deg",jf[s]=1}),$n[r[13]]=i+","+e,Ht(n,function(s){var o=s.split(":");$n[o[1]]=r[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");Ht("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(i){cn.units[i]="px"});Xt.registerPlugin(Zf);var Mn=Xt.registerPlugin(Zf)||Xt;Mn.core.Tween;const X0={ch1:{eyebrow:"其壹 · 序 PROLOGUE",title:"步天歌",hook:"三千年前，中国人开始给星星命名。",body:["先民把群星分作星官，各有职司。到三国陈卓汇总三家星经时，这张名单已录下二百八十三官、一千四百六十余星。","《步天歌》是把整张星表写成的长诗，一句一宿，循诗可以认星。本站以它为题，把这份名录还原成一片可以走进去的夜空。","向下滚动，步入夜空。"],seal:"步"},ch2:{eyebrow:"其贰 · 星野漫游 THE ATLAS",title:"星野漫游",hook:"循着一首千年前的歌，把星星一颗颗认出来。",body:["古人认星，靠一首歌。《步天歌》把全天星官谱成韵语，一句一宿，循诗可以认星。","三垣居中，四象环列——中国人给天空立的法。","拖拽环视，点击任意一颗星，看看它属于哪一位星官。"],seal:"野"},ch3:{eyebrow:"其叁 · 观象授时 THE GNOMON",title:"观象授时",hook:"一根八尺之表，一条量影之圭，就是一个王朝的天文台。",body:["正午测日影：影最长的那一天是冬至，最短的那一天是夏至。两至既定，四时均分，二十四节气由此排出。","河南登封至今立着这件仪器的放大版：元代郭守敬所建观星台，以高表测影，为《授时历》测得回归年长 365.2425 日——与三百年后的格里历相同。","所谓观象授时：历法的权威，来自对天空的测量。"],seal:"表"},ch4:{eyebrow:"其肆 · 天人之间 THE POLE STAR",title:"天人之间",hook:"全天最尊贵的星域，围着北极建了一座城。",body:["紫微垣，天上的宫城：左右两垣为墙，墙内住着皇族、帝座与百官。","天的秩序映照人的秩序——星官有名有职，如同朝廷。观星，也是观天下。"],seal:"极"},ch5:{eyebrow:"其伍 · 天球仪 THE CELESTIAL SPHERE",title:"天球仪",hook:"「浑天如鸡子，天体圆如弹丸，地如鸡中黄。」——张衡《浑天仪注》",body:["东汉张衡造浑天仪：铜球缀列星，绕轴而转，演示周天星象的起落。天，被做成一颗可以转动的球。","在这里，平面的星图重新团回天球。用你的手指转动它，像转动一件两千年前的仪器。"],seal:"球"},ch6:{eyebrow:"其陆 · 岁差 PRECESSION",title:"一万年",hook:"地轴是一支缓慢摇晃的陀螺，约两万六千年才转完一圈。",body:["东晋虞喜最先察觉：冬至点每年都在悄悄西移，约五十年退一度。他称之为「岁差」——天自为天，岁自为岁。","于是北极星也会换届：三千年前，周的天下以「帝星」（小熊座β）为北辰；今夜属于勾陈一；一万年后，织女星将接过这个位置。","拖动时间，看天极在星空中缓缓画出一个圆。"],seal:"岁"},ch7:{eyebrow:"其柒 · 东西对话 EAST MEETS WEST",title:"东西对话",hook:"同一片星空，两种秩序各自连线。",body:["中国的天狼是一颗独坐的星官，守在南方朱雀的井宿之野，主侵掠；在希腊人的图上，它是大犬座 α，猎户脚边的猎犬。","中国的织女是银河西岸的织女星官，七夕故事的主角；在西方，她是天琴座 α——俄耳甫斯的竖琴。","北斗七星在中国是帝车，运于中央、临制四方；同七颗星，在西方只是大熊的尾巴与后臀。"],seal:"会"},ch8:{eyebrow:"其捌 · 尾声 CREDITS",title:"尾声",hook:"缘起于一首旧诗，收束于一页致谢。",body:["本作品以《步天歌》为题——一卷把星官谱成韵语、便于记诵认星的旧诗。千年之后，诗里的星仍在原处，我们只是换了一种读法。","数据、开源技术与制作说明列于下方。本站为中国大学生计算机设计大赛参赛作品（信息可视化设计类）。"],seal:"跋"}},Ti=[{key:"北斗",type:"seek",target:"北斗",hint:"找到那把勺子——七颗星连成的斗，就挂在北天。",hintWrong:"先面朝北：七颗星连成的长勺，勺口两颗星永远指向北极星。",plain:"北斗七星：天帝的车驾，斗柄所指，即是四方与四时。",story:"「斗为帝车，运于中央，临制四乡」——斗柄东指，天下皆春。"},{key:"天狼",type:"seek",target:"天狼",hint:"找到全天最亮的星——南方低空，耀眼夺目的那一颗。",hintWrong:"自参宿腰带向东南找：全天最亮、白得晃眼的那一颗，不会是别的星。",plain:"天狼是全天第一亮星，在井宿之野独坐，古人以它主侵掠。",story:"天狼主侵掠；苏轼「会挽雕弓如满月，西北望，射天狼」，射的正是它。"},{key:"勾陈",type:"flash",target:"勾陈",hint:"只看一瞬——记住紫微垣中、今夜北极星所在的那一组，它随即隐去。",hintWrong:"先定北极星——正北方、独自不动的那颗；钩形六星就环在它身侧。",plain:"勾陈六星形如钩，勾陈一就是当代北极星。",story:"勾陈是帝之后妃的车驾；其最亮者勾陈一，今夜正坐在天的北极点上。"},{key:"北极",type:"choice",target:"北极",hint:"「北极」——四句之中，哪一句说的是它？",hintWrong:"《步天歌》开篇写紫微垣：认准「北极五星在其中」——北斗、勾陈各是另一官。",options:["「中元北極紫微宮，北極五星在其中」","「北斗之宿七星明，第一主帝名樞精」","帝之后妃的车驾，形如弯钩，其最亮的一颗是今夜北极星。","天帝的车驾：斗柄所指，即是四方与四时。"],answer:0,plain:"北极五星：太子、帝、庶子、后宫、天枢——天皇一家，以星列位。",story:"「为政以德，譬如北辰，居其所而众星共之」——《论语》里的北辰，就是这一官。"},{key:"织女",type:"seek",target:"织女",hint:"找到织女——银河西岸，与牵牛隔河相望的亮星。",hintWrong:"先找银河：河西岸最亮的青白色星才是织女——河东岸的是河鼓。",plain:"织女三星，七夕故事的主角，一万年后将继任北极星。",story:"七夕乞巧夜，女子对月穿针，拜的正是银河西岸这位织女。"},{key:"河鼓",type:"flash",target:"河鼓",hint:"只看一瞬——记住银河东岸的牵牛三星，它随即隐去。",hintWrong:"看银河东岸：三颗星排成一线、中间最亮，像挑着一副担子。",plain:"河鼓三星即牵牛，与织女隔河相望，七夕的故事由此而来。",story:"《诗经》已有「睆彼牵牛」之句——河鼓即牵牛，七夕的故事由它而起。"},{key:"昴宿",type:"choice",target:"昴宿",hint:"「昴宿」——四句之中，哪一句说的是它？",hintWrong:"关键在「七星一聚」：昴宿是一群挤作一团的星，不是排成一线的三星。",options:["「牛上直建三河鼓，鼓上三星號織女」","「七星一聚實不少，阿西月東各一星」","「三星中央色最深，下有積卒共十二」","银河西岸的亮星官，七夕故事的主角。"],answer:1,plain:"昴宿七星聚作一团，即西方白虎的昴星团，民间呼为七姊妹。",story:"七星一聚，民间唤作七姊妹；《天官书》称之为髦头，占胡人边事。"},{key:"心宿",type:"seek",target:"心宿",hint:"找到苍龙之心——东方三星相依，中央那颗最红，名叫大火。",hintWrong:"在东方苍龙的中段找：三颗星相依，中央那颗明显发红。",plain:"心宿三星：中央「大火」色最红，古人观大火以候寒暑。",story:"《诗经》「七月流火」的大火就在此宿——观大火，所以授农时。"},{key:"北落师门",type:"flash",target:"北落师门",hint:"只看一瞬——记住南方孤悬的那颗亮星，它随即隐去。",hintWrong:"朝秋夜南天最空旷处看：四周无伴、独自发亮的那一颗即是。",plain:"北落师门：羽林军南门外独守的亮星，秋夜南天最醒目的一颗。",story:"北落师门是羽林军的南门，一门孤悬南天，古人以它候兵事。"},{key:"老人",type:"choice",target:"老人",hint:"「老人」——四句之中，哪一句说的是它？",hintWrong:"认准「南极」与「寿」：弓矢射狼都属井宿诸官，「春秋出入壽無窮」才是老人。",options:["「左畔九個彎弧弓，一矢擬射頑狼胸」","「邱下一狼光蓬茸」","羽林军南门之外，一颗独守的亮星。","「有個老人南極中，春秋出入壽無窮」"],answer:3,plain:"老人星：南极仙翁，南天第二亮星，古人以它主寿安。",story:"老人星见则天下寿安，秦汉起便立祠祝祭——它就是南极仙翁。"},{key:"参宿",type:"name",target:"参宿",hint:"天空中高亮的这一组，是哪一位星官？",hintWrong:"先数腰带：三颗星斜排成一线，上下各两星作肩与足——这是参宿。",options:["参宿","心宿","斗宿","毕宿"],answer:0,plain:"参宿七星：白虎之躯，腰带三星成一线，冬夜最惹眼的星群。",story:"参宿七星即西方的猎户；腰间三星成一线，「参」的本义就是三。"},{key:"轩辕",type:"name",target:"轩辕",hint:"天空中高亮的这一组，是哪一位星官？",hintWrong:"找那条龙：朱雀背上十七星连绵成弧的才是轩辕，不是短促的柳、张。",options:["轩辕","翼宿","柳宿","天纪"],answer:0,plain:"轩辕十七星：蜿蜒如黄龙，横陈于南方朱雀之上。",story:"轩辕以黄帝之号为名，十七星蜿蜒如龙，是南方最绵长的一官。"}],U0=[{name:"探花",min:3e4},{name:"进士",min:24e3},{name:"贡士",min:18e3},{name:"举人",min:12e3},{name:"秀才",min:6e3},{name:"童生",min:0}],V0={探花:["众星已为故友。","三垣四象，如数家珍——这一夜，步天歌是唱给你听的。"],进士:["星野已熟，偶有一二疏漏。","再认几夜，满天皆可呼名。"],贡士:["大半星官，已能相认。","余下几位多在边角，要多走几步才遇得见。"],举人:["名星已识，星官的职司还生。","把答错的几位再认一遍，便是进益。"],秀才:["已入门径：几组名星之外，尚有整片星野。","先从北斗与织女认起，路就顺了。"],童生:["莫急，抬头多看几夜。","星星不走，等你认它。"]},Ns=[{key:"北极",groups:["北极"],title:"北极五星 · 皇族",story:"太子、帝、庶子、后宫、天枢——天皇一家，以星列位。",labels:[{text:"太子",star:"北极一"},{text:"帝",star:"北极二"},{text:"庶子",star:"北极三"},{text:"后宫",star:"北极四"},{text:"天枢",star:"北极五"}]},{key:"勾陈",groups:["勾陈"],title:"勾陈 · 后宫车马",story:"帝之后妃的车驾，形如弯钩。其中最亮的勾陈一，就是今夜的北极星。",labels:[{text:"勾陈一",star:"勾陈一"}]},{key:"帝座",groups:["天皇大帝","五帝内座"],title:"天皇大帝 · 帝座",story:"天皇大帝居中而御，五帝内座环侍在旁——天上至尊的宝座。",labels:[{text:"天皇大帝",star:"天皇大帝"}]},{key:"百官",groups:["尚书","大理","天柱"],title:"尚书 · 大理 · 天柱",story:"秘书、法官、政令——一座悬浮的朝廷。",labels:[{text:"尚书",star:"尚书一"},{text:"大理",star:"大理一"},{text:"天柱",star:"天柱一"}]},{key:"拱北",groups:[],title:"回望 · 众星拱北",story:"「譬如北辰，居其所而众星共之。」——《论语·为政》"}],Hc={heading:"数据与出处",groups:[{title:"数据来源",lines:["HYG Database v4.4 · CC BY-SA-4.0 · astronexus.com","许可协议：https://creativecommons.org/licenses/by-sa/4.0/","Stellarium 项目 · 中国星空文化数据","《步天歌》 · 丹元子 · 公有领域文本"]},{title:"开源技术",lines:["three.js","GSAP / ScrollTrigger","Vite","TypeScript","Noto Serif SC（思源宋体）· SIL OFL 1.1"]},{title:"制作说明",lines:["AI 辅助设计与编码","全部内容经人工校订"]}]},Cl=.35,Jf=.8,Ar=.05,gi=.3,oo=5,eh=Ti.some(i=>i.type==="blitz"),j0=Ti.length+(eh?0:1),$a=3,El=12,th=8,nh=5,Ml=4,Fo=2e4,Bo=12e3,ao=0,pn=1,Yi=2;function Eo(i){return Math.min(Math.max(i,0),1)}function rh(i){return i<Cl?ao:i<Jf?pn:Yi}function ih(i,e){return i>=2||e<=Ml?2:i>=1?1:0}function sh(i){return i<nh?El:th}function ts(i){return i<=1?1:i===2?1.5:i===3?2:3}function Fa(i,e){return Math.round(1e3*ts(i))*(e?2:1)}function oh(i){return i>=Fo?"甲":i>=Bo?"乙":"丙"}const lo=3,ns=["北斗","天狼","织女"];function ht(i){const e=i.type;return e==="flash"||e==="choice"||e==="name"||e==="blitz"?e:"seek"}function Ba(i){const e=i.targets;return Array.isArray(e)&&e.length>0&&e.every(t=>typeof t=="string"&&t.length>0)?e.slice():ns.slice()}const Q0=(()=>{const i=Ti.find(t=>t.target===ns[0]);return{key:"闪电快答",type:"blitz",target:ns[0]??"北斗",hint:"三道寻星小题连发，每题只有三秒——北斗、天狼、织女，看你的了。",hintWrong:(i==null?void 0:i.hintWrong)??"先认准方向再出手。",plain:"北斗、天狼、织女——三秒一题，连指三官。",story:(i==null?void 0:i.story)??"",targets:ns.slice()}})();function Ga(){return eh?Ti:[...Ti,Q0]}const qa=[{name:"童生",min:0},{name:"秀才",min:4e3},{name:"举人",min:8e3},{name:"贡士",min:Bo},{name:"进士",min:16e3},{name:"探花",min:Fo}];function ah(i){if(!Array.isArray(i))return[];const e=[];for(const t of i){if(!t||typeof t!="object")continue;const n=t.name,r=t.min;typeof n=="string"&&n.length>0&&typeof r=="number"&&Number.isFinite(r)&&e.push({name:n,min:r})}return e.sort((t,n)=>t.min-n.min),e}function lh(i,e){if(e.length===0)return"";let t=e[0];for(const n of e)if(i>=n.min)t=n;else break;return t.name}function ch(i){return i<-.3?"O":i<0?"B":i<.3?"A":i<.6?"F":i<.8?"G":i<1.4?"K":"M"}function uh(i){let e=null;for(const t of i)(!e||t.mag<e.mag)&&(e=t);return e}function fh(i){if(!i)return"";const e=[`视星等 ${i.mag}`];return i.ci!==null&&e.push(`光谱 ${ch(i.ci)} 型`),i.dist!==null&&e.push(`约 ${i.dist} 光年`),e.join(" · ")}function Ha(i,e){const t=i.slice();for(let n=t.length-1;n>0;n--){const r=Math.floor(e()*(n+1)),s=t[n];t[n]=t[r],t[r]=s}return t}function Ya(i){const e=(gi-Ar)/oo,t=[];for(let s=0;s<oo;s++)t.push(Eo((i-(Ar+s*e))/e));const n=i<Ar?-1:Math.min(Math.floor((i-Ar)/e),oo-1),r=Eo((i-gi)/(Cl-gi));return{active:n,lines:t,finale:r}}const fa=100,$s=.78,K0=1.6,Z0=1.35,J0=1e4,eg=1500,tg=1200,ng=4500,Yc="ch2-xunxingling-best",Wc="ch2-xunxingling-rank",Xc="ch2-xunxingling-rounds",rg=15*Math.PI/180,ig=1.4,sg=.5,Uc=[{text:"北斗之宿七星明",label:"北斗",groups:["北斗"]},{text:"北极五星在其中",label:"北极",groups:["北极"]},{text:"三星中央色最深",label:"心宿",groups:["心宿"]},{text:"牛上直建三河鼓，鼓上三星号织女",label:"河鼓 · 织女",groups:["河鼓","织女"]},{text:"邱下一狼光蓬茸",label:"天狼",groups:["天狼"]}],og=["北斗","北极","心宿","河鼓","天狼"],ag=(()=>{const[i,e,t]=vn(297.7,8.6),[n,r,s]=vn(280.5,38.7),o=i+n,a=e+r,l=t+s,c=Math.hypot(o,a,l),u=Math.atan2(l,o)*180/Math.PI,h=Math.asin(a/c)*180/Math.PI;return[Vn(186,56.5),Vn(218.6,76.8),Vn(247.2,-26.8),Vn(u,h),Vn(101.3,-16.7)]})(),Wi={北斗:{ra:186,dec:56.5,ring:26},勾陈:{ra:269.6,dec:86.5,ring:12},天狼:{ra:101.3,dec:-16.7,ring:6},织女:{ra:280.5,dec:38.7,ring:8},北极:{ra:218.6,dec:76.8,ring:10},心宿:{ra:247.2,dec:-26.8,ring:8},河鼓:{ra:297.7,dec:8.6,ring:8},昴宿:{ra:56.6,dec:24.2,ring:10},北落师门:{ra:344.4,dec:-29.6,ring:5},老人:{ra:96,dec:-52.7,ring:5},参宿:{ra:84,dec:-1.1,ring:20},轩辕:{ra:146.9,dec:24.5,ring:34}},lg=["一","二","三","四","五","六","七","八","九","十"],Vc={seek:"寻星",flash:"闪现",choice:"四选一",name:"点星",blitz:"闪电"},cg={甲:"仰观天文，俯察地理——这片星野，你已得了古人真传。",乙:"星野渐熟。再循一遍歌，全天星官皆可指认。",丙:"莫急。抬头多看几夜，星星自会认你。"},ug=`
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

/* ---- 段2 结算卡加厚：卷轴展开（scaleY 12%→100%）+ 落印纸震 ---- */
.ch2-quest.unfold {
  transform-origin: 50% 0;
  animation:
    ch2ScrollOpen 0.65s cubic-bezier(0.22, 0.9, 0.3, 1) both,
    ch2Shake 0.3s ease-out 0.8s both;
}
@keyframes ch2ScrollOpen {
  0% { opacity: 0; transform: translate(-50%, 10px) scaleY(0.12); }
  60% { opacity: 1; }
  100% { opacity: 1; transform: translate(-50%, 0) scaleY(1); }
}
@keyframes ch2Shake {
  0%, 100% { transform: translate(-50%, 0) scaleY(1); }
  25% { transform: translate(-50%, 2px) scaleY(1); }
  50% { transform: translate(-50%, -1px) scaleY(1); }
  75% { transform: translate(-50%, 1px) scaleY(1); }
}

/* ---- 段2 结算卡加厚：段位朱砂大印（评级大字 + 段位名，0.25s 落印） ---- */
.ch2-stamp {
  display: none;
  position: absolute; right: 16px; top: 14px;
  width: 92px; height: 92px;
  flex-direction: column; align-items: center; justify-content: center;
  border-radius: 10px;
  background: linear-gradient(150deg, #b1402f 0%, #8e2f22 100%);
  box-shadow: 0 0 18px rgba(142, 47, 34, 0.5), inset 0 0 0 2px rgba(252, 225, 182, 0.35);
  color: #fce1b6;
  transform: rotate(-8deg);
  opacity: 0;
  pointer-events: none;
}
.ch2-quest.mode-result .ch2-stamp {
  display: flex;
  animation: ch2SealStamp 0.25s cubic-bezier(0.2, 1.5, 0.4, 1) 0.55s both;
}
@keyframes ch2SealStamp {
  0% { opacity: 0; transform: rotate(-8deg) scale(2.4); }
  100% { opacity: 1; transform: rotate(-8deg) scale(1); }
}
.ch2-stamp b {
  font-family: var(--font-display, "Songti SC", serif);
  font-size: 40px; font-weight: 400; line-height: 1;
  text-shadow: 0 1px 2px rgba(13, 13, 17, 0.5);
}
.ch2-stamp span {
  margin-top: 8px;
  font-family: var(--font-display, "Songti SC", serif);
  font-size: 15px; letter-spacing: 0.3em; text-indent: 0.3em;
}
.ch2-result-rank { margin-top: 6px; font-size: 12.5px; letter-spacing: 0.14em; color: #fce1b6; }
.ch2-result-rank b { color: #c9a227; font-weight: 400; }

/* ---- 段2 结算卡加厚：错题回顾（星官名 + hintWrong 一句） ---- */
.ch2-wrong { margin-top: 10px; max-height: 108px; overflow-y: auto; text-align: left; }
.ch2-wrong h4 {
  font-size: 11px; font-weight: 400; letter-spacing: 0.3em; text-indent: 0.3em;
  color: #af915f; text-align: center; margin-bottom: 6px;
}
.ch2-wrong ul { margin: 0; padding: 0; }
.ch2-wrong li {
  list-style: none;
  font-size: 12.5px; line-height: 1.8; color: rgba(246, 232, 216, 0.85);
}
.ch2-wrong li b { color: #c9a227; font-weight: 400; margin-right: 8px; }

/* ---- 段2 翻页卡加厚：档案行（视星等 · 光谱 · 光年） ---- */
.ch2-verse-arch { font-size: 12px; letter-spacing: 0.12em; color: #af915f; margin-top: 8px; }
`;let jc=!1;function fg(){if(jc||typeof document>"u")return;const i=document.createElement("style");i.dataset.ch2="",i.textContent=ug,document.head.appendChild(i),jc=!0}function $t(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}let nn=null,rs=null;function hg(){if(typeof window>"u")return;const i=window.AudioContext??window.webkitAudioContext;i&&(nn||(nn=new i,rs=nn.createGain(),rs.gain.value=.12,rs.connect(nn.destination)),nn.state==="suspended"&&nn.resume())}function Go(i,e,t){if(hg(),!nn||!rs)return;const n=nn.sampleRate,r=Math.max(2,Math.round(n/i)),s=Math.floor(n*e),o=nn.createBuffer(1,s,n),a=o.getChannelData(0),l=new Float32Array(r);for(let h=0;h<r;h++)l[h]=Math.random()*2-1;let c=0;for(let h=0;h<s;h++){const d=l[c],f=l[(c+1)%r];l[c]=.996*.5*(d+f),a[h]=d*t,c=(c+1)%r}const u=nn.createBufferSource();u.buffer=o,u.connect(rs),u.start()}function Qc(){Go(880,.9,.9)}function Kc(){Go(1174.7,.7,.8)}function dg(){Go(220,.5,.75)}function ha(){Go(164.8,1.1,1)}function pg(i){fg();const e=i.root.querySelector(".pin"),{copy:t}=i;function n(g,v){const I=document.createElement(g);return I.className=v,e.appendChild(I),I}const r=n("div","ch2-card ch2-title");r.innerHTML=`
    <p class="eyebrow">${$t(t.eyebrow)}</p>
    <div class="ch2-head">
      <h2>${$t(t.title)}</h2>
      ${t.seal?`<div class="seal">${$t(t.seal)}</div>`:""}
    </div>
    <p class="ch2-hook">${$t(t.hook)}</p>
    <p class="ch2-narr">${$t(t.body[0]??"")}</p>
  `;const s=n("div","ch2-lines"),o=Uc.map(g=>{const v=document.createElement("div");return v.className="ch2-line",v.innerHTML=`<span class="ch2-line-text">${$t(g.text)}</span><span class="ch2-line-name">${$t(g.label)}</span>`,s.appendChild(v),v}),a=n("div","ch2-card ch2-finale");a.innerHTML=`<p class="ch2-finale-text">${$t(t.body[1]??"")}</p>`;const l=n("div","ch2-hud");l.innerHTML=`
    <div class="ch2-hearts"><i></i><i></i><i></i></div>
    <div class="ch2-hud-item ch2-hud-score"><label>得分</label><b>0</b></div>
    <div class="ch2-hud-item ch2-hud-combo"><label>连击</label><b>×1</b></div>
  `;const c=Array.from(l.querySelectorAll(".ch2-hearts i")),u=l.querySelector(".ch2-hud-score b"),h=l.querySelector(".ch2-hud-combo"),d=l.querySelector(".ch2-hud-combo b"),f=n("div","ch2-card ch2-quest");f.innerHTML=`
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
      <p class="ch2-verse-arch"></p>
      <p class="ch2-verse-plain"></p>
    </div>
    <div class="ch2-result">
      <div class="ch2-stamp"><b class="ch2-stamp-grade">丙</b><span class="ch2-stamp-rank">童生</span></div>
      <h3>寻星令 · 结算</h3>
      <p class="ch2-result-grade">丙</p>
      <p class="ch2-result-score">总分<b>0</b></p>
      <p class="ch2-result-line"></p>
      <p class="ch2-result-rank"></p>
      <p class="ch2-result-th"></p>
      <p class="ch2-result-note"></p>
      <div class="ch2-wrong"><h4>错题回顾</h4><ul></ul></div>
      <p class="ch2-result-best"></p>
      <div class="ch2-result-btns">
        <button type="button" class="ch2-btn ch2-btn-gold ch2-again">再来一局</button>
        <button type="button" class="ch2-btn ch2-btn-ghost ch2-goto-explore">进入星野</button>
      </div>
    </div>
  `;const m=f.querySelector(".ch2-timer i"),p=f.querySelector(".ch2-quest-no"),y=f.querySelector(".ch2-quest-type"),w=f.querySelector(".ch2-quest-hint"),x=f.querySelector(".ch2-options"),S=f.querySelector(".ch2-verse-text"),k=f.querySelector(".ch2-verse-from"),C=f.querySelector(".ch2-verse-arch"),M=f.querySelector(".ch2-verse-plain"),E=f.querySelector(".ch2-stamp-grade"),O=f.querySelector(".ch2-stamp-rank"),P=f.querySelector(".ch2-result-grade"),A=f.querySelector(".ch2-result-score b"),Q=f.querySelector(".ch2-result-line"),_=f.querySelector(".ch2-result-rank"),F=f.querySelector(".ch2-result-th"),$=f.querySelector(".ch2-result-note"),U=f.querySelector(".ch2-wrong"),ne=f.querySelector(".ch2-wrong ul"),H=f.querySelector(".ch2-result-best"),R=f.querySelector(".ch2-skip"),z=f.querySelector(".ch2-again"),b=f.querySelector(".ch2-goto-explore"),J=n("div","ch2-floats"),ee=n("div","ch2-redflash"),G=n("div","ch2-meteor"),V=n("div","ch2-rain-title");V.textContent="星雨";const te=n("div","ch2-card ch2-explore");te.innerHTML=`
    <h2>现在，把星空交给你</h2>
    <p>${$t(t.body[2]??"")}</p>
    <p class="ch2-recap">你已经认出了 ${Ti.map(g=>$t(g.key)).join(" · ")}</p>
  `;const ie=n("div","atlas-hint");ie.textContent="拖拽环视 · 点击星点查看星官";const Y=n("div","ch2-arrow");Y.appendChild(document.createElement("i"));let Oe=null;fetch(Bn("data/poem.json")).then(g=>g.ok?g.json():null).then(g=>{Oe=g,Et==="verse"&&Xo()}).catch(()=>{});let He={};Promise.all([fetch(Bn("data/stars.json")).then(g=>g.ok?g.json():null),fetch(Bn("data/asterisms.json")).then(g=>g.ok?g.json():null)]).then(([g,v])=>{if(!g||!v)return;const I=new Map(g.stars.map(Ve=>[Ve.hip,Ve])),le={};for(const Ve of v.asterisms){const je=Ve.stars.map(lt=>I.get(lt)).filter(lt=>lt!==void 0);le[Ve.name]=fh(uh(je))}He=le,Et==="verse"&&Xo()}).catch(()=>{});let be=-1,Ye=0,K=Ga(),L=0,pe=K.map(()=>!1),Ee=$a,ze=0,T=0,rt=0,it=0,$e=0,X="asking";const ue=[];let _e=[],Te=0,Le=0,Ut=0,De=!1,We=!1,Ct=[];const It=new Set;let Hn=!1,ve=El*1e3,Xe=ve,Fe=0,wn=!1,Pn=0,hn=0,Sn=!1,se=!1,kn=!1,at=!1,gt=null,Et="hidden",Vt=null,dn=null,Mt=null,Tn=null,re=null,N=null,oe=null,D=null,j=null,W=null,Z=null,Be=0;const ae=new Set;let Me=0,Je=!1;const Ie=new Ft;let ye=-1;const xe=new Ft,jt=new Ft().setFromAxisAngle(new ge(0,1,0),rg);let Pe=!1,Ce=null,Nt="",et=8,Ue=!1,Ge=null,An=!1,yr=!1,ft=!1,tt=!1,Qt=!1,Ur=-2,Vr=!1,Rn="";function Pt(g){const v=i.sky.groupCount;for(let I=0;I<v;I++)i.sky.setGroupProgress(I,g)}function On(g){An!==g&&(An=g,r.classList.toggle("on",g))}function Yn(g){yr!==g&&(yr=g,a.classList.toggle("on",g))}function Kt(g){ft!==g&&(ft=g,te.classList.toggle("on",g))}function Cs(g){tt!==g&&(tt=g,ie.classList.toggle("on",g))}function Es(g){Qt!==g&&(Qt=g,l.classList.toggle("on",g))}function Ms(g){Ur!==g&&(Ur=g,o.forEach((v,I)=>v.classList.toggle("on",I===g)))}function Ps(g){Pe!==g&&(Pe=g,Y.classList.toggle("on",g),g||(Y.style.opacity=""))}function jr(g,v){g.classList.remove(v),g.offsetWidth,g.classList.add(v)}function Yo(g){return`×${Number.isInteger(g)?g:g.toFixed(1)}`}function Cn(){u.textContent=String(ze);const g=K[L],v=X==="asking"&&!!g&&ht(g)==="blitz";d.textContent=v?`闪电 ${Yo(ts(Le+1))}`:at?`${Yo(ts(T+1))} · 星雨双倍`:Yo(ts(T+1)),h.classList.toggle("rain",at),c.forEach((I,le)=>I.classList.toggle("off",le>=Ee))}function Wo(g){const v=(Eo(g)*100).toFixed(1);if(v===Rn)return;Rn=v,m.style.width=`${v}%`;const I=Math.round(8+34*Eo(g));m.style.background=`linear-gradient(90deg, hsl(${I} 62% 52%), hsl(${I} 70% 62%))`}function Wn(g){Et=g,f.classList.toggle("on",g!=="hidden"),f.classList.toggle("mode-verse",g==="verse"),f.classList.toggle("mode-result",g==="result"),f.classList.toggle("mode-choice",g==="choice"),g==="result"?jr(f,"unfold"):(f.classList.remove("unfold"),g!=="hidden"&&(f.classList.remove("swap"),f.offsetWidth,f.classList.add("swap")))}function $l(){p.textContent=`寻星令 · 其${lg[L]??L+1} / ${K.length}`;const g=K[L];y.textContent=g?Vc[g.type]??Vc[ht(g)]:""}function Fl(){const g=K[L];g&&($l(),ht(g)==="blitz"?Bl():w.textContent=g.hint,Wn("ask"))}function Bl(){const g=_e[Te];w.textContent=g?`第 ${Te+1} / ${_e.length} 题 · 找到「${g}」——快！`:"……"}function Gl(){var I;const g=K[L];if(!g)return;const v=ht(g);if(!(v!=="choice"&&v!=="name")){$l(),w.textContent=g.hint,x.innerHTML="";for(const le of Ct){const Ve=(I=g.options)==null?void 0:I[le];if(Ve===void 0)continue;const je=document.createElement("button");je.type="button",je.className="ch2-opt",je.textContent=Ve,It.has(le)?(je.classList.add("wrong"),je.disabled=!0):je.addEventListener("click",()=>dd(le,je)),x.appendChild(je)}Wn("choice")}}function Xo(){const g=K[L];if(!g)return;const v=Oe==null?void 0:Oe[g.target];S.textContent=(v==null?void 0:v.text)??"……",k.textContent=v?`《步天歌》 · ${v.from}`:"《步天歌》",C.textContent=He[g.target]??"",M.textContent=g.story??g.plain}function ql(){Xo(),Wn("verse")}function Kh(g){const v=Math.round(g/1e3),I=Math.floor(v/60);return I>0?`${I}分${v%60}秒`:`${v}秒`}function Hl(){const g=oh(ze),v=nd(),I=lh(ze,v)||qa[0].name;P.textContent=g,E.textContent=g,O.textContent=I,A.textContent=String(ze);const le=wn?Math.max(0,hn-Pn):0;Q.textContent=`用时 ${Kh(le)} · 答对 ${rt} / ${K.length}`,F.textContent=`甲 ≥ ${Fo} · 乙 ≥ ${Bo} · 丙 未及乙等`;const Ve=V0[I];$.textContent=Ve&&Ve.length>0?Ve.join(""):cg[g];let je=0,lt="";try{je=Number(window.localStorage.getItem(Xc)??0)||0,lt=window.localStorage.getItem(Wc)??""}catch{}if(!se){se=!0,je+=1,Zl(v,I)>=Zl(v,lt)&&(lt=I);try{window.localStorage.setItem(Xc,String(je)),window.localStorage.setItem(Wc,lt)}catch{}}lt||(lt=I),_.innerHTML=`段位 <b>${$t(I)}</b> · 第 ${je} 局 · 史上段位 <b>${$t(lt)}</b>`,ue.length===0?U.style.display="none":(U.style.display="",ne.innerHTML=ue.map(Pi=>`<li><b>${$t(Pi.name)}</b>${$t(Pi.note)}</li>`).join(""));let wr=0;try{wr=Number(window.localStorage.getItem(Yc)??0)||0}catch{}const nr=ze>wr;if(!Sn&&(Sn=!0,nr))try{window.localStorage.setItem(Yc,String(ze))}catch{}const rr=Math.max(wr,ze);H.innerHTML=nr?`刷新纪录 <b>${rr}</b><span class="ch2-best-badge">史上最佳</span>`:`史上最佳 <b>${rr}</b>`,kn||(kn=!0,jo(),re=setTimeout(()=>{re=null,dg()},800))}function Zh(){if(Ge)return Ge;const g=document.createElement("canvas");g.width=g.height=128;const v=g.getContext("2d");return v.strokeStyle="rgba(240, 205, 110, 0.95)",v.lineWidth=6,v.shadowColor="rgba(201, 162, 39, 0.9)",v.shadowBlur=14,v.beginPath(),v.arc(64,64,48,0,Math.PI*2),v.stroke(),Ge=new al(g),Ge}function Uo(g){const v=Wi[g];if(!v||Ce&&Nt===g)return;Qr();const I=new Yu({map:Zh(),transparent:!0,depthTest:!1,depthWrite:!1,opacity:.9}),le=new Wu(I),[Ve,je,lt]=vn(v.ra,v.dec,fa);le.position.set(Ve,je,lt),le.scale.set(v.ring,v.ring,1),le.renderOrder=998,i.sky.addSkyObject(le),Ce=le,Nt=g,et=v.ring}function Qr(){Ce&&(i.sky.removeSkyObject(Ce),Ce.material.dispose(),Ce=null,Nt="")}function br(){const g=K[L],v=g?ht(g):"seek",I=v==="seek"||v==="flash",le=be===pn&&X==="asking"&&!!g;Ps(le&&I&&$e>=1),le&&(I&&$e>=2||v==="name")&&g?Uo(g.target):Ue||Qr()}function Yl(){Vt!==null&&(clearTimeout(Vt),Vt=null)}function vr(){dn!==null&&(clearTimeout(dn),dn=null)}function Vo(){Mt!==null&&(clearTimeout(Mt),Mt=null)}function Wl(){gt!==null&&(clearTimeout(gt),gt=null)}function Kr(){Tn!==null&&(clearTimeout(Tn),Tn=null)}function jo(){re!==null&&(clearTimeout(re),re=null)}function Xl(){X==="asking"&&Fe>0&&(Xe=Math.max(0,Fe-performance.now()),Fe=0)}function As(g,v){N==null||N.kill();const I={v:0};N=Mn.to(I,{v:1,duration:v,ease:"power1.out",onUpdate:()=>i.sky.setGroupProgress(g,I.v)})}const Rs={v:$s};function Qo(g,v){D==null||D.kill(),D=Mn.to(Rs,{v:g,duration:v,ease:"power2.out",onUpdate:()=>i.sky.setBloom({strength:Rs.v}),onComplete:()=>{D=null}})}function Ul(){at||(D==null||D.kill(),Rs.v=K0,i.sky.setBloom({strength:Rs.v}),Qo($s,.8))}function Vl(g){if(Uo(g),!Ce)return;j==null||j.kill(),Ue=!0;const v={s:et,o:.95};Ce.material.opacity=.95,j=Mn.to(v,{s:et*2.4,o:0,duration:.75,ease:"power2.out",onUpdate:()=>{Ce&&(Ce.scale.set(v.s,v.s,1),Ce.material.opacity=v.o)},onComplete:()=>{j=null,Ue=!1,Qr()}})}function Ko(g){const v=document.createElement("span");v.className="ch2-float",v.textContent=g,J.appendChild(v),ae.add(v),v.addEventListener("animationend",()=>{ae.delete(v),v.remove()})}function jl(){ae.forEach(g=>g.remove()),ae.clear()}function Jh(){at=!0,Wl(),gt=setTimeout(()=>{gt=null,Ei()},J0),Qo(Z0,.6),jr(V,"on"),jr(G,"on"),i.sky.spawnMeteors(6),Cn()}function Ei(){!at&&gt===null||(at=!1,Wl(),V.classList.remove("on"),Qo($s,.9),Cn())}function Ql(g){const v=Wi[g];if(!v)return;const[I,le,Ve]=vn(v.ra,v.dec,fa);i.sky.spawnBurst({x:I,y:le,z:Ve},{count:100})}const Mi={v:1};function ed(){W==null||W.kill(),Mi.v=.5,i.sky.setTimeScale(.5),W=Mn.to(Mi,{v:1,delay:.4,duration:.6,ease:"power2.inOut",onUpdate:()=>i.sky.setTimeScale(Mi.v),onComplete:()=>{W=null}})}function Kl(){W&&(W.kill(),W=null),Mi.v!==1&&(Mi.v=1,i.sky.setTimeScale(1))}function td(g){const v=Wi[g];if(!v){ye=-1;return}xe.copy(Vn(v.ra,v.dec)).premultiply(jt),ye=0}function xr(){ye<0||(ye=-1,i.sky.setGazeBlend(0))}function T1(g){return g}function Zo(g,v){ue.some(I=>I.name===g)||ue.push({name:g,note:v})}function nd(){const g=ah(U0);return g.length>0?g:qa}function Zl(g,v){return g.findIndex(I=>I.name===v)}function Jo(){const g=K[L],v=g?ht(g):"seek";it=0,$e=0,Hn=!1,It.clear(),Kr(),We=!1,v==="blitz"&&g&&(_e=Ba(g),Te=0,Le=0,Ut=0,De=!1),Ct=(v==="choice"||v==="name")&&g?Ha((g.options??[]).map((I,le)=>le),Math.random):[],ve=(v==="blitz"?lo:sh(L))*1e3,Xe=ve,Fe=0}function Jl(){if(be!==pn||X!=="asking")return;const g=K[L];if(!g)return;const v=ht(g);if(v==="blitz"){ec();return}i.sky.setGroupProgress(g.target,v==="name"?1:0),Fe=performance.now()+Xe,Rn="",Wo(Xe/ve),v==="flash"&&!Hn&&sd(g)}function ec(){const g=_e[Te];g&&(i.sky.setGroupProgress(g,0),ve=lo*1e3,(Xe<=0||Xe>ve)&&(Xe=ve),Fe=performance.now()+Xe,Rn="",Wo(Xe/ve))}function rd(){if(!K[L]||X!=="asking"||We)return;const v=_e[Te];if(!v)return;Fe=0,Xe=0,Le+=1,Ut+=1,De=!0;const I=Fa(Le,at);ze+=I,As(v,.5),Ul(),Vl(v),Ql(v),Ko(`+${I}`),Qc(),Te+=1,Cn(),ea(300)}function tc(){const g=K[L];if(!g||X!=="asking"||We)return;const v=_e[Te];Fe=0,Xe=0,Le=0,v&&Zo(v,g.hintWrong??g.plain),jr(ee,"on"),ha(),Te+=1,Cn(),ea(450)}function ea(g){Kr(),We=!0,Tn=setTimeout(()=>{if(Tn=null,We=!1,Te>=_e.length){id();return}Xe=lo*1e3,ec(),Bl()},g)}function id(){pe[L]=De;const g=_e.length>0&&Ut===_e.length;g&&(rt+=1),Ko(`闪电快答 ${Ut} / ${_e.length}`),g&&Kc(),Os()}function sd(g){i.sky.setGroupProgress(g.target,1),Yl(),Vt=setTimeout(()=>{Vt=null,Hn=!0,oe==null||oe.kill();const v={v:1};oe=Mn.to(v,{v:0,duration:.5,ease:"power1.in",onUpdate:()=>i.sky.setGroupProgress(g.target,v.v),onComplete:()=>{oe=null}})},eg)}function tr(){Yl(),oe==null||oe.kill(),oe=null}function od(){const g=K[L];if(!g){Zr();return}X="asking",Jo();const v=ht(g);v==="choice"||v==="name"?Gl():Fl(),v==="seek"||v==="flash"?td(g.target):xr(),br(),Jl(),Cn()}function nc(){const g=K[L];if(!g||X!=="asking")return;X="revealed",xr(),pe[L]=!0,Fe=0,Xe=0,tr(),T+=1,rt+=1;const v=Fa(T,at);ze+=v,it=0,$e=0,br(),ht(g)==="name"?i.sky.setGroupProgress(g.target,1):As(g.target,1.1),Ul(),Vl(g.target),Ql(g.target),ed(),Ko(`+${v}`),T>=2?Kc():Qc(),T>0&&T%5===0&&Jh(),Cn(),ql(),vr(),dn=setTimeout(()=>{dn=null,Os()},tg)}function rc(g){if(X==="asking"&&(Ee=Math.max(0,Ee-1),T=0,g==="pick"&&(it+=1,$e=ih(it,Xe/1e3),br()),jr(ee,"on"),ha(),Cn(),Ee<=0)){const v=K[L];v&&Zo(v.target,v.hintWrong??v.plain),Zr()}}function ad(){if(be!==pn||X!=="asking")return;const g=K[L];if(g){if(ht(g)==="blitz"){tc();return}if(Fe=0,Xe=0,tr(),i.sky.setGroupProgress(g.target,0),Zo(g.target,g.hintWrong??g.plain),Ee=Math.max(0,Ee-1),T=0,jr(ee,"on"),ha(),Cn(),Ee<=0){Zr();return}Os()}}function Os(){if(vr(),L+=1,L>=K.length){Zr();return}od()}function ic(){if(X!=="revealed")return;vr();const g=K[L];g&&i.sky.setGroupProgress(g.target,1),N==null||N.kill(),N=null,L+=1,it=0,$e=0,L>=K.length?(X="asking",Zr()):(X="asking",Jo())}function ld(){if(be!==pn||X!=="asking")return;const g=K[L];if(g){if(xr(),ht(g)==="blitz"){if(We)return;const v=_e[Te];Fe=0,Xe=0,v&&(De=!0,As(v,.5)),Te+=1,ea(200);return}pe[L]=!0,Fe=0,tr(),$e=0,ht(g)==="name"?i.sky.setGroupProgress(g.target,1):As(g.target,.6),Os()}}function Zr(){X!=="over"&&(X="over",xr(),Kr(),We=!1,Fe=0,Xe=0,vr(),tr(),N==null||N.kill(),N=null,Ei(),it=0,$e=0,br(),hn=performance.now(),Hl(),Wn("result"),Cn(),be===Yi&&sc())}function cd(){vr(),tr(),K.forEach((g,v)=>{if(!pe[v]){if(ht(g)==="blitz")for(const I of Ba(g))i.sky.setGroupProgress(I,1);else i.sky.setGroupProgress(g.target,1);pe[v]=!0}}),L=K.length,Zr()}function sc(){Vo(),Mt=setTimeout(()=>{Mt=null,X==="over"&&be===Yi&&Wn("hidden")},ng)}function oc(){vr(),Vo(),tr(),Kr(),jo(),Ei(),Kl(),xr(),N==null||N.kill(),N=null,jl(),ee.classList.remove("on"),K=Ha(Ga(),Math.random),L=0,pe=K.map(()=>!1),Ee=$a,ze=0,T=0,rt=0,X="asking",ue.length=0,We=!1,wn=!1,Pn=0,hn=0,Sn=!1,se=!1,kn=!1,Jo(),$e=0,Qr(),Ps(!1),Cn()}function ac(g){const v=i.root,I=v.getBoundingClientRect().top+window.scrollY,le=Math.max(0,v.offsetHeight-window.innerHeight);window.scrollTo({top:I+le*g,behavior:"smooth"})}function ud(){X==="over"&&(oc(),be===pn?lc():ac(.5))}function fd(){if(be===Yi){Wn("hidden");return}ac(.995)}function lc(){if(wn||(wn=!0,Pn=performance.now()),Pt(1),X!=="over"){const g=K[L];if(g){const v=ht(g);if(v==="blitz"){const I=_e[Te];I&&i.sky.setGroupProgress(I,0)}else v!=="name"&&i.sky.setGroupProgress(g.target,0)}}if(X==="over")Hl(),Wn("result");else if(X==="revealed")ql();else{const g=K[L],v=g?ht(g):"seek";v==="choice"||v==="name"?Gl():Fl()}br(),Jl(),Cn()}function hd(g){if(be!==pn||X!=="asking"||!g)return;const v=K[L];if(!v)return;const I=ht(v);if(!(I==="choice"||I==="name")){if(I==="blitz"){if(We)return;g.info.name===_e[Te]?rd():tc();return}g.info.name===v.target?nc():rc("pick")}}function dd(g,v){if(be!==pn||X!=="asking")return;const I=K[L];if(!I)return;const le=ht(I);le!=="choice"&&le!=="name"||It.has(g)||(g===I.answer?nc():(It.add(g),v.classList.add("wrong"),v.disabled=!0,rc("option")))}R.addEventListener("click",ld),z.addEventListener("click",ud),b.addEventListener("click",fd);const ta=new ge;function pd(){const g=K[L],v=g?Wi[g.target]:void 0;if(!v){Ps(!1);return}const[I,le,Ve]=vn(v.ra,v.dec,fa),je=i.sky.camera,lt=je.matrixWorldInverse.elements,wr=lt[2]*I+lt[6]*le+lt[10]*Ve+lt[14];ta.set(I,le,Ve).project(je);let nr=ta.x,rr=ta.y;const Pi=wr>0;if(Pi&&(nr=-nr,rr=-rr),!Pi&&Math.abs(nr)<=.92&&Math.abs(rr)<=.92){Y.style.opacity="0";return}Y.style.opacity="";const bd=Math.atan2(-rr,nr)*180/Math.PI,zs=48,vd=Math.min(Math.max((nr+1)/2*window.innerWidth,zs),window.innerWidth-zs),xd=Math.min(Math.max((1-rr)/2*window.innerHeight,zs),window.innerHeight-zs);Y.style.left=`${vd}px`,Y.style.top=`${xd}px`,Y.style.transform=`rotate(${bd}deg)`}function cc(g){if(Be=requestAnimationFrame(cc),Fe>0&&be===pn&&X==="asking"){const v=Fe-g;if(v<=0)ad();else{Xe=v,Wo(v/ve);const I=K[L],le=I?ht(I):"seek";(le==="seek"||le==="flash")&&$e<2&&v<=Ml*1e3&&($e=2,br())}}if(Pe&&pd(),Ce&&!Ue){const v=et*(1+.13*Math.sin(g*.0024));Ce.scale.set(v,v,1),Ce.material.opacity=.7+.3*Math.sin(g*.0024+1)}}function gd(g,v){v===pn&&(Xl(),tr(),Kr(),We=!1,xr(),Ei(),X!=="revealed"&&(N==null||N.kill(),N=null),ic()),g===ao?(i.sky.setPickingEnabled(!1),i.sky.setLabelsEnabled(!0),i.sky.setHoverTipEnabled(!0),Pt(0),Vr=!1,Wn("hidden"),Kt(!1),Cs(!1),Es(!1),br()):g===pn?(i.sky.setPickingEnabled(!0),i.sky.setLabelsEnabled(!1),i.sky.setHoverTipEnabled(!1),On(!1),Ms(-1),Yn(!1),Kt(!1),Cs(!1),Es(!0),lc()):(i.sky.setPickingEnabled(!0),i.sky.setLabelsEnabled(!0),i.sky.setHoverTipEnabled(!0),On(!1),Ms(-1),Yn(!1),Es(!1),X!=="over"?cd():sc(),Kt(!0),Cs(!0))}function md(g){const v=Ya(g);(v.finale>0||Vr)&&(Pt(v.finale),Vr=v.finale>0),v.lines.forEach((le,Ve)=>{const je=Uc[Ve];if(!je)return;const lt=Math.max(v.finale,Ve===v.active?le:le*.15);for(const wr of je.groups)i.sky.setGroupProgress(wr,lt)}),On(g<Ar);const I=g>=Ar&&g<gi?v.active:-1;Ms(I),I>=0?Uo(og[I]??""):Qr(),Yn(g>=gi)}function uc(g){Ye=g;const v=rh(g);if(v!==be){const I=be;be=v,gd(v,I)}be===ao?md(g):be===Yi&&Pt(1)}function _d(g){const v=be===ao&&Ye>=Ar&&Ye<gi?Ya(Ye).active:-1,I=v>=0?.85:0;if(Me+=(I-Me)*(1-Math.exp(-3*g)),Me<.01){Je&&(Je=!1,i.sky.setGazeBlend(0));return}const le=ag[Math.max(v,0)];Je?Ie.slerp(le,1-Math.exp(-2.5*g)):(Je=!0,Ie.copy(le)),i.sky.setGazeBlend(Me,Ie)}function yd(g){if(ye<0)return;if(be!==pn||X!=="asking"){xr();return}ye+=g;const v=1-ye/ig;if(v<=0){ye=-1,i.sky.setGazeBlend(0);return}i.sky.setGazeBlend(sg*v,xe)}return oc(),{enter(){i.root.classList.add("inview"),Z==null||Z(),Z=i.sky.onPick(hd),Be&&cancelAnimationFrame(Be),Be=requestAnimationFrame(cc),uc(Ye)},update(g){uc(g)},frame(g){_d(g),yd(g)},exit(){i.root.classList.remove("inview"),cancelAnimationFrame(Be),Be=0,Z==null||Z(),Z=null,Xl(),tr(),vr(),Vo(),Kr(),We=!1,jo(),ic(),N==null||N.kill(),N=null,Kl(),Ei(),D&&(D.kill(),D=null,i.sky.setBloom({strength:$s})),j==null||j.kill(),j=null,Ue=!1,Qr(),Ge==null||Ge.dispose(),Ge=null,Ps(!1),jl(),ee.classList.remove("on"),G.classList.remove("on"),V.classList.remove("on"),Me=0,Je=!1,ye=-1,i.sky.setGazeBlend(0),i.sky.setLabelsEnabled(!0),i.sky.setHoverTipEnabled(!0),i.sky.setPickingEnabled(!1),On(!1),Ms(-1),Yn(!1),Wn("hidden"),Kt(!1),Cs(!1),Es(!1),be=-1,nn==null||nn.suspend()}}}const gg=Object.freeze(Object.defineProperty({__proto__:null,CH2_BLITZ_DEFAULT_TARGETS:ns,CH2_BLITZ_SECONDS:lo,CH2_GRADE_JIA:Fo,CH2_GRADE_YI:Bo,CH2_MAX_HEARTS:$a,CH2_RANKS_FALLBACK:qa,CH2_ROUND_SIZE:j0,CH2_SEG1_END:Cl,CH2_SEG1_LINE_COUNT:oo,CH2_SEG2_END:Jf,CH2_TIME_LIMIT_EARLY_COUNT:nh,CH2_TIME_LIMIT_EARLY_S:El,CH2_TIME_LIMIT_LATE_S:th,CH2_URGENT_HINT_SECONDS:Ml,TARGET_DIRS:Wi,ch2ArchiveLine:fh,ch2BlitzTargets:Ba,ch2Brightest:uh,ch2BuildDeck:Ga,ch2ComboMultiplier:ts,ch2Grade:oh,ch2HintLevel:ih,ch2NormalizeRanks:ah,ch2QuestKind:ht,ch2RankOf:lh,ch2ScoreFor:Fa,ch2Seg1LineStates:Ya,ch2SegmentOf:rh,ch2Shuffle:Ha,ch2SpectralClass:ch,ch2TimeLimit:sh,createChapter:pg},Symbol.toStringTag,{value:"Module"})),hh=Math.PI/180,mg=34.7,dh=8,ui=355,Wa=["冬至","小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪"];function _g(i){return-23.44*Math.cos(2*Math.PI*(i+10)/365.25)}function Xa(i){return 90-Math.abs(mg-_g(i))}function Zc(i){return dh/Math.tan(Xa(i)*hh)}function yg(i){let e=0,t=999,n=0;for(let r=0;r<Wa.length;r++){const s=(ui+r*15.22)%365;let o=i-s;o>182.5?o-=365:o<-182.5&&(o+=365),Math.abs(o)<t&&(t=Math.abs(o),e=r,n=o)}return{name:Wa[e],index:e,day:(ui+e*15.22)%365,offset:Math.round(n)}}function bg(i){const e=[31,28,31,30,31,30,31,31,30,31,30,31];let t=Math.min(Math.max(Math.round(i),1),365),n=0;for(;n<11&&t>e[n];)t-=e[n],n++;return{month:n+1,day:t}}const Fs=["零","一","二","三","四","五","六","七","八","九"];function da(i){if(i<10)return Fs[i];if(i<20)return"十"+(i%10?Fs[i%10]:"");const e=Math.floor(i/10);return Fs[e]+"十"+(i%10?Fs[i%10]:"")}function ei(i){return i-Math.floor(i)}function vg(i,e,t,n,r,s){i.beginPath(),i.moveTo(e+s,t),i.arcTo(e+n,t,e+n,t+r,s),i.arcTo(e+n,t+r,e,t+r,s),i.arcTo(e,t+r,e,t,s),i.arcTo(e,t,e+n,t,s),i.closePath()}function xg(){const i=document.createElement("canvas");i.width=64,i.height=64;const e=i.getContext("2d");if(e){const t=e.createRadialGradient(32,32,2,32,32,32);t.addColorStop(0,"rgba(252, 225, 182, 0.9)"),t.addColorStop(.3,"rgba(252, 225, 182, 0.25)"),t.addColorStop(1,"rgba(252, 225, 182, 0)"),e.fillStyle=t,e.fillRect(0,0,64,64)}return i}const ti=8,Tr=15,wg=`
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
`;let Jc=!1;function Sg(){if(Jc||typeof document>"u")return;const i=document.createElement("style");i.dataset.gnomonWidget="",i.textContent=wg,document.head.appendChild(i),Jc=!0}function kg(i={}){Sg();const e=document.createElement("div");e.className="gw",e.setAttribute("role","group"),e.setAttribute("aria-label","圭表测影：拖动滑杆查看一年中正午日影变化");const t=document.createElement("canvas");t.className="gw-canvas",e.appendChild(t);const n=document.createElement("div");n.className="gw-readout",n.innerHTML=`
    <div class="gw-cell"><span class="gw-k">日期</span><span class="gw-v" data-r="date">——</span></div>
    <div class="gw-cell"><span class="gw-k">节气</span><span class="gw-v" data-r="term">——</span></div>
    <div class="gw-cell"><span class="gw-k">正午影长</span><span class="gw-v" data-r="shadow">——</span></div>
    <div class="gw-cell"><span class="gw-k">太阳高度</span><span class="gw-v" data-r="alt">——</span></div>`,e.appendChild(n);const r=n.querySelector('[data-r="date"]'),s=n.querySelector('[data-r="term"]'),o=n.querySelector('[data-r="shadow"]'),a=n.querySelector('[data-r="alt"]'),l=document.createElement("div");l.className="gw-slider-wrap";const c=document.createElement("input");c.className="gw-slider",c.type="range",c.min="1",c.max="365",c.step="1",c.value=String(ui),c.setAttribute("aria-label","一年中的第几天"),l.appendChild(c);const u=document.createElement("div");u.className="gw-marks";for(const _ of["冬至","春分","夏至","秋分"]){const F=Wa.indexOf(_),$=(ui+F*15.22)%365,U=($-1)/364,ne=`calc(7px + (100% - 14px) * ${U.toFixed(4)})`,H=document.createElement("i");H.className="gw-tick",H.style.left=ne,u.appendChild(H);const R=document.createElement("button");R.type="button",R.className="gw-mark"+(U<.08?" gw-mark--start":U>.92?" gw-mark--end":""),R.style.left=ne,R.textContent=_,R.title=`跳至${_}（第 ${Math.round($)} 天）`,R.addEventListener("click",()=>M(Math.round($))),u.appendChild(R)}l.appendChild(u),e.appendChild(l);const h=t.getContext("2d");if(!h){const _=document.createElement("p");_.className="gw-fallback",_.textContent="当前浏览器无法创建绘图上下文，圭表测影演示不可用。",t.replaceWith(_)}const d=xg(),f=Array.from({length:14},(_,F)=>({rx:ei(Math.sin(F*12.9898)*43758.5453),ry:ei(Math.sin(F*78.233)*12543.217),len:.1+.25*ei(Math.sin(F*3.7)*9876.543),dark:F%2===0})),m=Array.from({length:5},(_,F)=>({dx:-.3+.6*ei(Math.sin(F*5.13)*3210.7),ry:.12+.76*ei(Math.sin(F*9.31)*7777.7),h:.08+.12*ei(Math.sin(F*2.17)*5555.5)}));let p=ui,y=ui,w=!1,x=!0,S=0,k=0,C=0;function M(_){y=Math.min(Math.max(_,1),365),E()}function E(){S||(S=requestAnimationFrame(O))}function O(){var U;S=0;const _=p,F=y-p;p=Math.abs(F)<.04?y:p+F*.2;const $=p!==_;($||x)&&(P(),A(),x=!1),$&&((U=i.onDayChange)==null||U.call(i,p)),p!==y&&(S=requestAnimationFrame(O))}function P(){const _=Math.min(Math.max(Math.round(p),1),365),F=bg(_);r.textContent=`${F.month} 月 ${F.day} 日 · 第 ${_} 天`;const $=yg(_);s.textContent=$.offset===0?`正值【${$.name}】`:$.offset>0?`【${$.name}】后 ${$.offset} 天`:`距【${$.name}】 ${-$.offset} 天`;const U=Zc(p);let ne=Math.floor(U),H=Math.round((U-ne)*10);H===10&&(ne+=1,H=0),o.textContent=`${da(ne)}尺${H>0?da(H)+"寸":"整"} · ${U.toFixed(2)} 尺`,a.textContent=`${Xa(p).toFixed(1)}°`,!w&&document.activeElement!==c&&(c.value=String(_))}function A(){if(!h||k<60||C<60)return;const _=h,F=k,$=C;_.clearRect(0,0,F,$);const U=_.createLinearGradient(0,0,0,$);U.addColorStop(0,"rgba(22, 38, 56, 0.5)"),U.addColorStop(.6,"rgba(13, 13, 17, 0.12)"),U.addColorStop(1,"rgba(13, 13, 17, 0.4)"),_.fillStyle=U,_.fillRect(0,0,F,$);const ne=Zc(p),H=Xa(p),R=Math.min(Math.max(H,6),82)*hh,z=$-62,b=Math.min((F-150)/14.2,(z-92)/8),J=dh*b,ee=13.6*b,G=(F-ee-110)/2+100,V=z-J,te=G+ne*b,ie=G-12,Y=G+ee,Oe=_.createRadialGradient(G-60,z,0,G-60,z,220);Oe.addColorStop(0,`rgba(252, 225, 182, ${(.05+.04*Math.sin(R)).toFixed(3)})`),Oe.addColorStop(1,"rgba(252, 225, 182, 0)"),_.fillStyle=Oe,_.fillRect(0,z-160,F,200),_.strokeStyle="rgba(175, 145, 95, 0.35)",_.lineWidth=1,_.beginPath(),_.moveTo(14,z+Tr),_.lineTo(F-14,z+Tr),_.stroke();const He=_.createLinearGradient(0,z,0,z+ti);He.addColorStop(0,"#3b4552"),He.addColorStop(1,"#252d38"),_.fillStyle=He,vg(_,ie,z,Y-ie,ti,2.5),_.fill();const be=_.createLinearGradient(0,z+ti,0,z+Tr);be.addColorStop(0,"#1a212b"),be.addColorStop(1,"#10151d"),_.fillStyle=be,_.fillRect(ie,z+ti,Y-ie,Tr-ti),_.strokeStyle="rgba(252, 225, 182, 0.14)",_.beginPath(),_.moveTo(ie+2,z+.5),_.lineTo(Y-2,z+.5),_.stroke();for(const ue of f){const _e=ie+6+ue.rx*(Y-ie-12),Te=z+1.5+ue.ry*(Tr-3);_.strokeStyle=ue.dark?"rgba(0, 0, 0, 0.16)":"rgba(252, 225, 182, 0.05)",_.beginPath(),_.moveTo(_e,Te),_.lineTo(_e+ue.len*40,Te),_.stroke()}const Ye=b>=26;_.lineWidth=1;for(let ue=0;ue<=136;ue++){const _e=ue%10===0;if(!_e&&!Ye&&ue%5!==0)continue;const Te=G+ue*b/10;if(Te>Y-1.5)break;const Le=_e?6:ue%5===0?4:2.5;_.strokeStyle=_e?"rgba(8, 10, 14, 0.9)":"rgba(8, 10, 14, 0.6)",_.beginPath(),_.moveTo(Te,z+1),_.lineTo(Te,z+1+Le),_.stroke()}_.font='9px "STSong", "SimSun", "Songti SC", serif',_.fillStyle="rgba(175, 145, 95, 0.9)",_.textAlign="center",_.textBaseline="top";for(let ue=0;ue<=13;ue++){const _e=G+ue*b;if(_e>Y-2)break;_.fillText(da(ue),_e,z+Tr+4)}const K=_.createLinearGradient(G,0,te,0);K.addColorStop(0,"rgba(3, 5, 9, 0.78)"),K.addColorStop(.75,"rgba(3, 5, 9, 0.55)"),K.addColorStop(1,"rgba(3, 5, 9, 0.15)"),_.fillStyle=K,_.fillRect(G,z+1,Math.max(te-G,1.5),ti-1),_.strokeStyle="#c9a227",_.lineWidth=1.5,_.beginPath(),_.moveTo(te,z-4),_.lineTo(te,z+Tr),_.stroke(),_.save(),_.translate(te,z-7),_.rotate(Math.PI/4),_.fillStyle="#c9a227",_.fillRect(-2.4,-2.4,4.8,4.8),_.restore();const L=Math.max(6,b*.38),pe=_.createLinearGradient(G-L/2,0,G+L/2,0);pe.addColorStop(0,"#3f2e1a"),pe.addColorStop(.35,"#a87f3d"),pe.addColorStop(.5,"#dcba68"),pe.addColorStop(.65,"#a87f3d"),pe.addColorStop(1,"#372812"),_.fillStyle=pe,_.fillRect(G-L/2,V,L,J);for(const ue of m)_.fillStyle="rgba(112, 148, 126, 0.14)",_.fillRect(G+ue.dx*L-.75,V+ue.ry*J,1.5,ue.h*J);_.fillStyle="#8a6a35",_.beginPath(),_.moveTo(G-L*.85,V),_.lineTo(G-L*.42,V-6),_.lineTo(G+L*.42,V-6),_.lineTo(G+L*.85,V),_.closePath(),_.fill(),_.strokeStyle="rgba(252, 225, 182, 0.35)",_.lineWidth=1,_.beginPath(),_.moveTo(G-L*.42,V-6),_.lineTo(G+L*.42,V-6),_.stroke();const Ee=_.createLinearGradient(0,z-11,0,z);Ee.addColorStop(0,"#5a4423"),Ee.addColorStop(1,"#2c2010"),_.fillStyle=Ee,_.beginPath(),_.moveTo(G-L*.8,z-11),_.lineTo(G+L*.8,z-11),_.lineTo(G+L*1.7,z),_.lineTo(G-L*1.7,z),_.closePath(),_.fill(),_.font='10px "STSong", "SimSun", "Songti SC", serif',_.fillStyle="rgba(201, 162, 39, 0.8)",_.textAlign="center",_.textBaseline="top";const ze=G-L/2-11;"表高八尺".split("").forEach((ue,_e)=>{_.fillText(ue,ze,V+18+_e*13)});const T=-Math.cos(R),rt=-Math.sin(R);let it=Math.min(170,(V-28)/Math.sin(R),(G-30)/Math.cos(R));it=Math.max(it,26);const $e=G+T*it,X=V+rt*it;_.drawImage(d,$e-30,X-30,60,60),_.fillStyle="#fce1b6",_.beginPath(),_.arc($e,X,8.5,0,Math.PI*2),_.fill(),_.strokeStyle="rgba(201, 162, 39, 0.75)",_.lineWidth=1,_.beginPath(),_.arc($e,X,11.5,0,Math.PI*2),_.stroke(),_.strokeStyle="rgba(252, 225, 182, 0.4)",_.beginPath(),_.moveTo($e-T*12,X-rt*12),_.lineTo(G,V),_.stroke(),_.setLineDash([3,4]),_.strokeStyle="rgba(252, 225, 182, 0.22)",_.beginPath(),_.moveTo(G,V),_.lineTo(te,z),_.stroke(),_.setLineDash([])}c.addEventListener("input",()=>{const _=Number(c.value);y=_,w||(p=_),E()}),c.addEventListener("pointerdown",()=>{w=!0}),window.addEventListener("pointerup",()=>{w=!1}),window.addEventListener("pointercancel",()=>{w=!1});function Q(){const _=t.clientWidth,F=t.clientHeight;if(!(_===k&&F===C)){if(k=_,C=F,h&&_>0&&F>0){const $=Math.min(window.devicePixelRatio||1,2);t.width=Math.round(_*$),t.height=Math.round(F*$),h.setTransform($,0,0,$,0,0)}x=!0,E()}}return typeof ResizeObserver<"u"?new ResizeObserver(Q).observe(t):window.addEventListener("resize",Q),Q(),{el:e,get day(){return p},setDayTarget:M}}const Tg=`
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
`;let eu=!1;function Cg(){if(eu||typeof document>"u")return;const i=document.createElement("style");i.dataset.gnomonLayout="",i.textContent=Tg,document.head.appendChild(i),eu=!0}function Oi(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function tu(i){return i/365*Math.PI*2}function Eg(i){const e=i.root.querySelector(".pin"),{copy:t}=i,n=document.createElement("div");n.className="gnomon-layout";const r=document.createElement("div");r.className="chapter-panel",r.innerHTML=`
    <p class="eyebrow">${Oi(t.eyebrow)}</p>
    <div class="chapter-head">
      <h2>${Oi(t.title)}</h2>
      ${t.seal?`<div class="seal">${Oi(t.seal)}</div>`:""}
    </div>
    <p class="hook">${Oi(t.hook)}</p>
    ${t.body.map(a=>`<p>${Oi(a)}</p>`).join("")}
  `,n.appendChild(r);let s=!1;const o=kg({onDayChange:a=>{s&&i.sky.setSkyRotation(tu(a),0)}});return n.appendChild(o.el),e.appendChild(n),Cg(),{enter(){s=!0,i.root.classList.add("inview"),i.sky.setLabelsEnabled(!1),i.sky.setSkyRotation(tu(o.day),0)},update(a){const l=Math.min(Math.max(a,0),1);o.setDayTarget(1+l*364)},exit(){s=!1,i.root.classList.remove("inview"),i.sky.setLabelsEnabled(!0),i.sky.setSkyRotation(0,0)}}}const Mg=Object.freeze(Object.defineProperty({__proto__:null,createChapter:Eg},Symbol.toStringTag,{value:"Module"}));function qo(i){return Math.min(Math.max(i,0),1)}function Ua(i){const e=qo(i);return e*e*(3-2*e)}const qr=.12,Nr=.92,$r=5,ws=(Nr-qr)/$r,Pl=qr+4*ws,ph=.03,gh=.45;function co(i){const e=qo(i);return e<qr?0:e>=Nr?6:1+Math.min(Math.floor((e-qr)/ws),$r-1)}function mh(i){return qo(i/qr)}function _h(i,e){const t=qr+e*ws;return qo((i-t)/(ws*gh))}function Va(i){const e=Ua((i-(Pl-.02))/.02),t=1-Ua((i-Nr)/.05);return e*t}function yh(i,e){const t=new Set;let n=0;return e.map(r=>{if(r){const o=i.find(a=>!t.has(a.hip)&&a.name===r);if(o)return t.add(o.hip),o}for(;n<i.length&&t.has(i[n].hip);)n++;const s=i[n];return s?(t.add(s.hip),n++,s):null})}const bh=[{ra:175,dec:81,radius:.35,fov:50,gazeW:.85},{ra:218.6,dec:76.8,radius:.55,fov:42,gazeW:.85},{ra:269.6,dec:86.5,radius:.55,fov:42,gazeW:.85},{ra:41.8,dec:81,radius:.55,fov:42,gazeW:.85},{ra:261.7,dec:75.5,radius:.55,fov:42,gazeW:.85},{ra:0,dec:89,radius:.55,fov:55,gazeW:.85}],Mo={radius:3,dir:[.52,.7,.49],fov:50},nu=100,Pg=["紫微左垣","紫微右垣"],Ag=["第一站","第二站","第三站","第四站","第五站"],Rg="序 · 天上有座城",Og=28,ru=44,Bs=60,vh=bh.map(i=>({dir:new ge(...vn(i.ra,i.dec,1)),radius:i.radius,fov:i.fov,gazeQ:Vn(i.ra,i.dec),gazeW:i.gazeW})),zg=new ge(...Mo.dir).normalize(),zi=vh[$r],Lg=`
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
  width: ${Og}px; height: 1px;
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
`;let iu=!1;function Dg(){if(iu||typeof document>"u")return;const i=document.createElement("style");i.dataset.ch4="",i.textContent=Lg,document.head.appendChild(i),iu=!0}function Li(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Ig(i){Dg();const e=i.root.querySelector(".pin"),{copy:t}=i,n=document.createElement("div");n.className="ch4-card ch4-opening",n.innerHTML=`
    <p class="eyebrow">${Li(t.eyebrow)}</p>
    <div class="chapter-head">
      <h2>${Li(t.title)}</h2>
      ${t.seal?`<div class="seal">${Li(t.seal)}</div>`:""}
    </div>
    <p class="ch4-opening-tag">${Rg}</p>
    <p class="hook">${Li(t.hook)}</p>
    ${t.body.map(R=>`<p class="ch4-opening-body">${Li(R)}</p>`).join("")}
  `,e.appendChild(n);const r=document.createElement("div");r.className="ch4-card ch4-stop",r.innerHTML=`
    <p class="ch4-stop-tag"></p>
    <h3 class="ch4-stop-title"></h3>
    <p class="ch4-stop-story"></p>
  `,e.appendChild(r);const s=r.querySelector(".ch4-stop-tag"),o=r.querySelector(".ch4-stop-title"),a=r.querySelector(".ch4-stop-story"),l=document.createElement("div");l.className="ch4-layer";const c=[];Ns.forEach((R,z)=>{(R.labels??[]).forEach((b,J)=>{const ee=document.createElement("div");ee.className="ch4-tag";const G=document.createElement("i");G.className="ch4-tag-dot";const V=-90+J*137.5,te=V*Math.PI/180,ie=document.createElement("i");ie.className="ch4-tag-line",ie.style.transform=`rotate(${V}deg)`;const Y=document.createElement("span");Y.className="ch4-tag-name",Y.textContent=b.text,Y.style.transform=`translate(${Math.cos(te)*ru}px, ${Math.sin(te)*ru}px) translate(-50%, -50%)`,ee.append(G,ie,Y),l.appendChild(ee),c.push({el:ee,stopIdx:z,labelIdx:J,shown:!1})})}),e.appendChild(l);let u=null;Promise.all([fetch(Bn("data/stars.json")).then(R=>R.ok?R.json():null),fetch(Bn("data/asterisms.json")).then(R=>R.ok?R.json():null)]).then(([R,z])=>{if(!R||!z)return;const b=new Map(R.stars.map(ee=>[ee.hip,ee])),J=new Map(z.asterisms.map(ee=>[ee.name,ee]));u=Ns.map(ee=>{const G=ee.groups.flatMap(te=>{var ie;return(((ie=J.get(te))==null?void 0:ie.stars)??[]).map(Y=>b.get(Y)).filter(Y=>Y!==void 0)});return yh(G,(ee.labels??[]).map(te=>te.star)).map(te=>{if(!te)return null;const[ie,Y,Oe]=vn(te.ra,te.dec,nu);return new ge(ie,Y,Oe)})})}).catch(()=>{});let h=!1,d=0,f=!1,m=.35,p=50;const y=new ge(0,1,0),w=new Ft;let x=0,S=0,k=0,C=!1,M=-1;function E(R){C!==R&&(C=R,n.classList.toggle("on",R))}function O(R){if(M===R)return;if(M=R,R<0){r.classList.remove("on");return}const z=Ns[R];z&&(s.textContent=Ag[R]??`第${R+1}站`,o.textContent=z.title,a.textContent=z.story,r.classList.add("on"),r.classList.remove("swap"),r.offsetWidth,r.classList.add("swap"))}function P(R,z){R.shown!==z&&(R.shown=z,R.el.classList.toggle("on",z))}function A(){for(const R of c)P(R,!1)}function Q(R){d=R;const z=co(R),b=mh(R);for(const J of Pg)i.sky.setGroupProgress(J,b);Ns.forEach((J,ee)=>{const G=_h(R,ee);for(const V of J.groups)i.sky.setGroupProgress(V,G)}),E(z===0),O(z>=1&&z<=$r?z-1:z===6?$r-1:-1)}const _=new ge,F=new ge;function $(R,z,b){const J=Math.cos(z),ee=Math.sin(z);return b.set(R.x*J+R.z*ee,R.y,-R.x*ee+R.z*J)}function U(R){const z=d,b=co(z);let J,ee,G;const V=F;let te;if(b===6){const Y=Ua((z-Nr)/(1-Nr));J=Ne.lerp(zi.radius,Mo.radius,Y),ee=Ne.lerp(zi.fov,Mo.fov,Y),G=(1-Y)*zi.gazeW,V.copy(zi.dir).lerp(zg,Y).normalize(),te=zi.gazeQ}else{const Y=vh[b];J=Y.radius,ee=Y.fov,G=Y.gazeW,V.copy(Y.dir),te=Y.gazeQ}if(!f){f=!0;const Y=i.sky.camera;m=Math.max(Y.position.length()/nu,.005),p=Y.fov,y.copy(Y.position).normalize(),y.lengthSq()<1e-8&&y.set(0,1,0),w.copy(Y.quaternion),x=1}const ie=1-Math.exp(-3*R);m+=(J-m)*ie,p+=(ee-p)*ie,y.lerp(V,ie).normalize(),x+=(G-x)*ie,w.slerp(te,1-Math.exp(-2.5*R)),i.sky.setRadius(m),i.sky.setPositionDir(y),i.sky.setFov(p),x<.005&&G===0?i.sky.setGazeBlend(0):i.sky.setGazeBlend(x,w)}function ne(R){const z=d;z>=Pl&&z<Nr?S+=ph*R:Va(z)===0&&(S=0);const b=S*Va(z);Math.abs(b-k)>1e-6&&(k=b,i.sky.setSkyRotation(b,0))}function H(){var ee;const R=co(d),z=R>=1&&R<=$r?R-1:-1,b=window.innerWidth,J=window.innerHeight;for(const G of c){const V=(ee=u==null?void 0:u[G.stopIdx])==null?void 0:ee[G.labelIdx];if(G.stopIdx!==z||!V){P(G,!1);continue}$(V,k,_);const te=kd([_.x,_.y,_.z],i.sky.camera,{width:b,height:J});if(!te||te.x<-Bs||te.x>b+Bs||te.y<-Bs||te.y>J+Bs){P(G,!1);continue}G.el.style.left=`${te.x}px`,G.el.style.top=`${te.y}px`,P(G,!0)}}return{enter(){i.root.classList.add("inview"),h=!0,f=!1,i.sky.setLabelsEnabled(!1),Q(d)},update(R){Q(R)},frame(R){h&&(U(R),ne(R),H())},exit(){i.root.classList.remove("inview"),h=!1,f=!1,S=0,k=0,i.sky.setSkyRotation(0,0),i.sky.setGazeBlend(0),i.sky.setLabelsEnabled(!0),E(!1),O(-1),A()}}}const Ng=Object.freeze(Object.defineProperty({__proto__:null,CH4_CAM_STOPS:bh,CH4_GROW_FRAC:gh,CH4_OPENING_END:qr,CH4_RELEASE:Mo,CH4_ROT_SPEED:ph,CH4_ROT_START:Pl,CH4_STOP_COUNT:$r,CH4_STOP_SPAN:ws,CH4_TOUR_END:Nr,ch4MatchLabels:yh,ch4RotationWeight:Va,ch4SegmentOf:co,ch4StopGrowth:_h,ch4WallsGrowth:mh,createChapter:Ig},Symbol.toStringTag,{value:"Module"})),xh=1.2,$g=90,Fg=7,Bg=.7,su=.55,Gg=1.5;function qg(i){return Ne.clamp(1-i/xh,0,1)}function Hg(i){return Math.exp(-.9*i)}const wh=new ge(0,1,0),Sh=new ge(1,0,0);let Gs;function kh(){if(Gs!==void 0)return Gs;if(typeof document>"u")return Gs=null;const i=document.createElement("canvas");i.width=i.height=64;const e=i.getContext("2d"),t=e.createRadialGradient(32,32,0,32,32,32);return t.addColorStop(0,"rgba(255, 252, 244, 1)"),t.addColorStop(.35,"rgba(255, 240, 205, 0.85)"),t.addColorStop(1,"rgba(255, 240, 205, 0)"),e.fillStyle=t,e.fillRect(0,0,64,64),Gs=new al(i)}function Yg(i,e={}){const t=Math.max(1,Math.floor(e.count??$g)),n=e.speed??Fg,r=e.rand??Math.random,s=new ge(i.x,i.y,i.z);s.lengthSq()<1e-8&&s.set(0,1,0),s.normalize();const o=new ge().crossVectors(s,Math.abs(s.y)<.99?wh:Sh).normalize(),a=new ge().crossVectors(s,o),l=new Float32Array(t*3),c=new Float32Array(t*3);for(let w=0;w<t;w++){l[w*3]=i.x,l[w*3+1]=i.y,l[w*3+2]=i.z;const x=n*(su+(1-su)*r()),S=n*Bg*r(),k=r()*Math.PI*2,C=Math.cos(k)*S,M=Math.sin(k)*S;c[w*3]=s.x*x+o.x*C+a.x*M,c[w*3+1]=s.y*x+o.y*C+a.y*M,c[w*3+2]=s.z*x+o.z*C+a.z*M}const u=new _o;u.setAttribute("position",new Ki(l,3));const h=u.getAttribute("position"),d=new Xu({size:Gg,sizeAttenuation:!0,map:kh()??null,color:16771512,transparent:!0,opacity:1,depthWrite:!1,blending:ds}),f=new Uu(u,d);f.name="burst";let m=0,p=!1;const y={object:f,update(w){if(p)return!1;if(m+=w,m>=xh)return y.dispose(),!1;const x=Hg(w);for(let S=0;S<c.length;S++)c[S]*=x,l[S]+=c[S]*w;return h.needsUpdate=!0,d.opacity=qg(m),!0},dispose(){p||(p=!0,f.removeFromParent(),u.dispose(),d.dispose())}};return y}const ou=1,Wg=1.5,au=.6,Xg=1.15,Ug=.21,ni=24,Vg=.35,jg=1.8;function Qg(i){return Math.sin(Math.PI*Math.min(1,Math.max(0,i)*1.15))}function lu(i,e,t,n){const r=Math.cos(t),s=Math.sin(t);return n.set(i.x*r+e.x*s,i.y*r+e.y*s,i.z*r+e.z*s)}function cu(i,e){const t=i()*2-1,n=i()*Math.PI*2,r=Math.sqrt(Math.max(0,1-t*t));return e.set(r*Math.cos(n),t,r*Math.sin(n))}function Kg(i,e={}){const t=e.rand??Math.random,n=cu(t,new ge),r=cu(t,new ge),s=r.addScaledVector(n,-r.dot(n));s.lengthSq()<1e-6&&s.crossVectors(n,Math.abs(n.y)<.99?wh:Sh),s.normalize();const o=au+(Xg-au)*t(),a=ou+(Wg-ou)*t(),l=Vg*t(),c=new Float32Array((ni+1)*3),u=new Float32Array((ni+1)*3);for(let O=0;O<=ni;O++){const P=Math.pow(1-O/ni,.75);u[O*3]=P,u[O*3+1]=P*.92,u[O*3+2]=P*.72}const h=new _o;h.setAttribute("position",new Ki(c,3)),h.setAttribute("color",new Ki(u,3));const d=h.getAttribute("position"),f=new Vu({vertexColors:!0,transparent:!0,opacity:0,depthWrite:!1,blending:ds}),m=new Td(h,f),p=new _o;p.setAttribute("position",new Ki(new Float32Array(3),3));const y=p.getAttribute("position"),w=new Xu({size:jg,sizeAttenuation:!0,map:kh()??null,color:16774102,transparent:!0,opacity:0,depthWrite:!1,blending:ds}),x=new Uu(p,w),S=new In;S.name="meteor",S.add(m),S.add(x),S.visible=!1;let k=0,C=!1;const M=new ge,E={object:S,update(O){if(C)return!1;k+=O;const P=(k-l)/a;if(P>=1)return E.dispose(),!1;if(P<0)return!0;S.visible=!0;const A=Qg(P),Q=o*P;for(let _=0;_<=ni;_++){const F=Math.max(0,Q-Ug*(_/ni));lu(n,s,F,M).multiplyScalar(i),c[_*3]=M.x,c[_*3+1]=M.y,c[_*3+2]=M.z}return d.needsUpdate=!0,f.opacity=A*.9,lu(n,s,Q,M).multiplyScalar(i),y.setXYZ(0,M.x,M.y,M.z),y.needsUpdate=!0,w.opacity=A,!0},dispose(){C||(C=!0,S.removeFromParent(),h.dispose(),f.dispose(),p.dispose(),w.dispose())}};return E}const Se=100,Zg=.97,Jg=24,pa={strength:.78,radius:.55,threshold:.58},uu=1.2*Se,em=5,fu=.2*Math.PI/180,hu=89*Math.PI/180,du=.8*Se,tm=1.2*Se,nm=.4,rm=.05,im=120,pu=.35,Di=new ge(0,1,0),sm=new ge(0,0,0);function om(i){return i=Ne.clamp(i,0,1),i*i*(3-2*i)}const Do=class Do{constructor(e){B(this,"canvas");B(this,"renderer");B(this,"scene");B(this,"camera");B(this,"pipeline");B(this,"quality");B(this,"card");B(this,"labelLayerEl");B(this,"hoverNdc",null);B(this,"hoverRing");B(this,"hoverTip");B(this,"sky",null);B(this,"labels",null);B(this,"labelsShown",!1);B(this,"skyRoot",new In);B(this,"tmpSkyMat",new Sa);B(this,"tmpSkyQ",new Ft);B(this,"tmpSkyQY",new Ft);B(this,"starPositions",null);B(this,"starList",[]);B(this,"nameByHip",new Map);B(this,"hipToAsterism",new Map);B(this,"poem",null);B(this,"pickListeners",new Set);B(this,"gazeYaw",-Math.PI/2);B(this,"gazePitch",80*Math.PI/180);B(this,"orbitQ",new Ft);B(this,"ctlRadius",1);B(this,"ctlDir",new ge(0,1,0));B(this,"ctlFov",78);B(this,"ctlGazeBlend",0);B(this,"ctlGazeTargetQ",null);B(this,"ctlDrift",0);B(this,"driftAngle",0);B(this,"ctlOrbit",0);B(this,"pickingEnabled",!1);B(this,"labelsEnabled",!0);B(this,"hoverTipEnabled",!0);B(this,"blendK",0);B(this,"dragging",!1);B(this,"lastX",0);B(this,"lastY",0);B(this,"downX",0);B(this,"downY",0);B(this,"orbitVelX",0);B(this,"orbitVelY",0);B(this,"lastOrbitMoveT",0);B(this,"clock",new Cd);B(this,"elapsed",0);B(this,"frameHook",null);B(this,"started",!1);B(this,"timeScale",1);B(this,"effects",[]);B(this,"gazeEuler",new Gi(0,0,0,"YXZ"));B(this,"gazeQ",new Ft);B(this,"insideQ",new Ft);B(this,"centerLookQ",new Ft);B(this,"centerLookMat",new Sa);B(this,"driftQ",new Ft);B(this,"tmpPos",new ge);B(this,"resize",()=>{const e=this.tierDpr();this.renderer.setPixelRatio(e),this.renderer.setSize(window.innerWidth,window.innerHeight),this.pipeline.setSize(window.innerWidth,window.innerHeight),this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.sky&&(this.sky.starMaterial.uniforms.uPixelRatio.value=e),this.labels&&this.labels.renderer.setSize(window.innerWidth,window.innerHeight)});B(this,"frame",()=>{var s;const e=Math.min(this.clock.getDelta(),.1),t=e*this.timeScale;this.quality.update(e),(s=this.frameHook)==null||s.call(this,t),this.updateCamera(t),this.updateHover(),this.updateEffects(t);const n=this.camera.position.length(),r=this.sky;if(r&&(this.elapsed+=t,r.setTime(this.elapsed),r.starMaterial.uniforms.uDistBoost.value=Nd(n,Se),r.gridMaterial.opacity=.1+.16*Ne.clamp(n/Se-1,0,1),n>=Se&&!this.card.el.hidden&&this.card.hide()),this.labels){const o=this.labelsEnabled?Ne.clamp((uu-n)/(uu-Se),0,1):0,a=o>.01;a!==this.labelsShown&&(this.labelsShown=a,this.labels.setVisible(a)),a&&(this.labels.renderer.domElement.style.opacity=o.toFixed(3),this.labels.update(this.camera))}this.pipeline.render(),this.labels&&this.labelsShown&&this.labels.renderer.render(this.scene,this.camera)});this.canvas=e,this.renderer=new Ed({canvas:e,antialias:!0,alpha:!0}),this.renderer.setClearColor(0,0),this.scene=new Md,this.scene.add(this.skyRoot),this.camera=new Pd(78,1,.1,2e3),this.pipeline=Ad(this.renderer,this.scene,this.camera,pa),this.quality=Rd(s=>{this.pipeline.setEnabled(s<2),this.pipeline.setBloom({strength:s===0?pa.strength:pa.strength*.5}),this.resize()}),this.labelLayerEl=document.createElement("div"),this.labelLayerEl.style.cssText="position:fixed;inset:0;pointer-events:none;z-index:5;",document.body.appendChild(this.labelLayerEl),this.card=Od(document.body),this.onPick(s=>{s?this.card.show(s.info,s.x,s.y):this.card.hide()});const t=document.createElement("canvas");t.width=t.height=64;const n=t.getContext("2d");n.strokeStyle="rgba(240, 205, 110, 0.95)",n.lineWidth=5,n.shadowColor="rgba(201, 162, 39, 0.9)",n.shadowBlur=8,n.beginPath(),n.arc(32,32,24,0,Math.PI*2),n.stroke();const r=new al(t);this.hoverRing=new Wu(new Yu({map:r,transparent:!0,depthTest:!1,depthWrite:!1})),this.hoverRing.renderOrder=999,this.hoverRing.visible=!1,this.skyRoot.add(this.hoverRing),this.hoverTip=document.createElement("div"),this.hoverTip.className="sky-tooltip",this.hoverTip.style.display="none",document.body.appendChild(this.hoverTip),this.bindPointer(),window.addEventListener("resize",this.resize),this.resize()}async init(){const[e,t,n,r]=await Promise.all([zd(Se),fetch(Bn("data/stars.json")).then(a=>{if(!a.ok)throw new Error(`stars=${a.status}`);return a.json()}),fetch(Bn("data/asterisms.json")).then(a=>{if(!a.ok)throw new Error(`asterisms=${a.status}`);return a.json()}),fetch(Bn("data/poem.json")).then(a=>{if(!a.ok)throw new Error(`poem=${a.status}`);return a.json()})]);this.sky=e,e.starMaterial.uniforms.uPixelRatio.value=this.tierDpr(),this.skyRoot.add(e.group),this.starList=t.stars;const s=new Float32Array(this.starList.length*3),o=new Map;this.starList.forEach((a,l)=>{const[c,u,h]=vn(a.ra,a.dec,Se);s[l*3]=c,s[l*3+1]=u,s[l*3+2]=h,o.set(a.hip,new ge(c,u,h)),this.nameByHip.set(a.hip,a.name)}),this.starPositions=s,this.hipToAsterism=Ld(n.asterisms),this.poem=r,this.labels=Dd(this.labelLayerEl,n.asterisms,o),this.labels.renderer.setSize(window.innerWidth,window.innerHeight),this.labels.setVisible(!1),this.skyRoot.add(this.labels.group)}start(e){this.frameHook=e??null,!this.started&&(this.started=!0,this.renderer.setAnimationLoop(this.frame))}setRadius(e){this.ctlRadius=Math.max(.5,e*Se)}setPositionDir(e){e instanceof ge?this.ctlDir.copy(e):this.ctlDir.set(e[0],e[1],e[2]),this.ctlDir.lengthSq()<1e-8&&this.ctlDir.set(0,1,0),this.ctlDir.normalize()}setFov(e){this.ctlFov=Ne.clamp(e,10,140)}setGazeMode(e,t){if(e==="target"){const n=t??{ra:0,dec:80};this.ctlGazeTargetQ=Vn(n.ra,n.dec)}this.ctlGazeBlend=e==="target"?1:0}setGazeBlend(e,t){this.ctlGazeBlend=Ne.clamp(e,0,1),t!==void 0&&(this.ctlGazeTargetQ=t)}setDrift(e){this.ctlDrift=e}setOrbitEnabled(e){this.ctlOrbit=typeof e=="number"?Ne.clamp(e,0,1):e?1:0}applyCameraState(e){this.setRadius(e.radius),this.setPositionDir(e.dir),this.setFov(e.fov),this.setGazeBlend(e.gazeBlend,e.gazeTargetQ),this.setDrift(e.drift),this.setOrbitEnabled(e.orbit)}get cameraRadius(){return this.camera.position.length()}setGroupProgress(e,t){if(!this.sky)return;const n=typeof e=="number"?e:this.sky.lines.indexOf(e);this.sky.lines.setGroupProgress(n,t)}groupIndex(e){return this.sky?this.sky.lines.indexOf(e):-1}get groupCount(){return this.sky?this.sky.lines.groupCount:0}setLabelsEnabled(e){this.labelsEnabled=e}setHoverTipEnabled(e){this.hoverTipEnabled=e}setPickingEnabled(e){this.pickingEnabled=e,e||this.card.hide()}hideDetailCard(){this.card.hide()}setBloom(e){this.pipeline.setBloom(e)}setBloomEnabled(e){this.pipeline.setEnabled(e)}onPick(e){return this.pickListeners.add(e),()=>this.pickListeners.delete(e)}addSkyObject(e,t){(t==null?void 0:t.rotateWithSky)===!1?this.scene.add(e):this.skyRoot.add(e)}removeSkyObject(e){e.removeFromParent()}setSkyRotation(e=0,t=0){if(t!==0){const n=Id(t);this.tmpSkyMat.set(n[0],n[1],n[2],0,n[3],n[4],n[5],0,n[6],n[7],n[8],0,0,0,0,1),this.tmpSkyQ.setFromRotationMatrix(this.tmpSkyMat)}else this.tmpSkyQ.identity();this.tmpSkyQY.setFromAxisAngle(Di,e),this.skyRoot.quaternion.copy(this.tmpSkyQ).multiply(this.tmpSkyQY)}setTimeScale(e){this.timeScale=Number.isFinite(e)?Ne.clamp(e,0,4):1}spawnBurst(e,t){this.addEffect(Yg(e,t))}spawnMeteors(e){const t=Math.min(Jg,Math.max(0,Math.floor(e)));for(let n=0;n<t;n++)this.addEffect(Kg(Se*Zg))}addEffect(e){this.skyRoot.add(e.object),this.effects.push(e)}updateEffects(e){for(let t=this.effects.length-1;t>=0;t--)this.effects[t].update(e)||this.effects.splice(t,1)}tierDpr(){const e=this.quality.tier,t=e===0?2:e===1?1.5:1;return Math.min(window.devicePixelRatio||1,t)}applyOrbitDelta(e,t){const n=this.camera.position.clone().normalize(),r=new Ft().setFromAxisAngle(Di,-e),s=new ge().crossVectors(Di,n);s.lengthSq()<1e-8?s.set(1,0,0):s.normalize();const o=new Ft().setFromAxisAngle(s,t),a=r.clone().multiply(o).multiply(this.orbitQ),l=n.clone().applyQuaternion(r).applyQuaternion(o);Math.abs(l.y)<.985?this.orbitQ.copy(a):this.orbitQ.premultiply(r)}bindPointer(){const e=this.canvas;e.addEventListener("pointerdown",t=>{this.dragging=!0,this.lastX=this.downX=t.clientX,this.lastY=this.downY=t.clientY,this.orbitVelX=this.orbitVelY=0,this.lastOrbitMoveT=performance.now(),this.hoverNdc=null,e.setPointerCapture(t.pointerId)}),e.addEventListener("pointerup",t=>{this.dragging=!1,e.releasePointerCapture(t.pointerId),performance.now()-this.lastOrbitMoveT>im&&(this.orbitVelX=this.orbitVelY=0),Math.hypot(t.clientX-this.downX,t.clientY-this.downY)<em&&this.handleClick(t.clientX,t.clientY)}),e.addEventListener("pointercancel",()=>{this.dragging=!1,this.orbitVelX=this.orbitVelY=0}),e.addEventListener("pointerleave",()=>{this.hoverNdc=null}),e.addEventListener("pointermove",t=>{if(!this.dragging){this.hoverNdc={x:t.clientX/window.innerWidth*2-1,y:-(t.clientY/window.innerHeight)*2+1,cx:t.clientX,cy:t.clientY};return}const n=t.clientX-this.lastX,r=t.clientY-this.lastY;this.lastX=t.clientX,this.lastY=t.clientY;const s=(1-this.blendK)*(1-this.ctlGazeBlend);s>0&&(this.gazeYaw+=n*fu*s,this.gazePitch+=r*fu*s,this.gazePitch=Ne.clamp(this.gazePitch,-hu,hu));const o=this.blendK*this.ctlOrbit;if(o>0){const a=n*o*.005,l=r*o*.005;this.applyOrbitDelta(a,l);const c=performance.now(),u=Math.min((c-this.lastOrbitMoveT)/1e3,.1);this.lastOrbitMoveT=c,u>1e-4&&(this.orbitVelX+=(a/u-this.orbitVelX)*pu,this.orbitVelY+=(l/u-this.orbitVelY)*pu)}})}handleClick(e,t){if(!this.pickingEnabled||!this.sky||!this.starPositions)return;if(this.camera.position.length()>=Se){this.emitPick(null);return}const n=e/window.innerWidth*2-1,r=-(t/window.innerHeight)*2+1,s=fc(n,r,this.camera,this.starPositions,{width:window.innerWidth,height:window.innerHeight});if(!s){this.emitPick(null);return}const o=this.starList[s.index],a=this.hipToAsterism.get(o.hip);if(!a){this.emitPick(null);return}const l=this.lookupPoem(a.name);this.emitPick({info:{name:a.name,starCount:a.stars.length,stars:a.stars.map(c=>({name:this.nameByHip.get(c)??null,hip:c})),quote:l==null?void 0:l.text,quoteFrom:l==null?void 0:l.from},x:e,y:t})}lookupPoem(e){if(!this.poem)return;const t=this.poem[e];if(t)return t;const n=e.replace(/[(（][^)）]*[)）]\s*$/,"");return n!==e?this.poem[n]:void 0}emitPick(e){for(const t of this.pickListeners)t(e)}updateHover(){if(!(this.pickingEnabled&&!this.dragging&&this.hoverNdc!==null&&this.starPositions!==null&&this.camera.position.length()<Se)){this.hoverRing.visible&&(this.hoverRing.visible=!1),this.hoverTip.style.display!=="none"&&(this.hoverTip.style.display="none");return}const t=fc(this.hoverNdc.x,this.hoverNdc.y,this.camera,this.starPositions,{width:window.innerWidth,height:window.innerHeight},Do.HOVER_PICK_RADIUS_PX);if(!t){this.hoverRing.visible&&(this.hoverRing.visible=!1),this.hoverTip.style.display!=="none"&&(this.hoverTip.style.display="none");return}const n=this.starPositions;this.hoverRing.position.set(n[t.index*3],n[t.index*3+1],n[t.index*3+2]);const r=this.camera.position.distanceTo(this.hoverRing.position),s=Math.max(.5,r*.035);if(this.hoverRing.scale.set(s,s,1),this.hoverRing.visible=!0,!this.hoverTipEnabled){this.hoverTip.style.display!=="none"&&(this.hoverTip.style.display="none");return}const o=this.starList[t.index],a=this.hipToAsterism.get(o.hip),l=o.name??`HIP ${o.hip}`,c=a&&a.name!==l?`${l} · ${a.name}`:l;this.hoverTip.textContent!==c&&(this.hoverTip.textContent=c),this.hoverTip.style.left=`${this.hoverNdc.cx+16}px`,this.hoverTip.style.top=`${this.hoverNdc.cy+14}px`,this.hoverTip.style.display!=="block"&&(this.hoverTip.style.display="block")}updateCamera(e){if(!this.dragging&&(this.orbitVelX!==0||this.orbitVelY!==0)){this.applyOrbitDelta(this.orbitVelX*e,this.orbitVelY*e);const n=Math.pow(.5,e/nm);this.orbitVelX*=n,this.orbitVelY*=n,Math.hypot(this.orbitVelX,this.orbitVelY)<rm&&(this.orbitVelX=this.orbitVelY=0)}const t=this.tmpPos.copy(this.ctlDir).multiplyScalar(this.ctlRadius).applyQuaternion(this.orbitQ);this.camera.position.copy(t),this.blendK=om((this.ctlRadius-du)/(tm-du)),this.gazeEuler.set(this.gazePitch,this.gazeYaw,0),this.gazeQ.setFromEuler(this.gazeEuler),this.insideQ.copy(this.gazeQ),this.ctlGazeTargetQ&&this.ctlGazeBlend>0&&this.insideQ.slerp(this.ctlGazeTargetQ,this.ctlGazeBlend),this.ctlDrift!==0&&(this.driftAngle+=this.ctlDrift*e,this.driftQ.setFromAxisAngle(Di,this.driftAngle),this.insideQ.premultiply(this.driftQ)),this.centerLookMat.lookAt(t,sm,Di),this.centerLookQ.setFromRotationMatrix(this.centerLookMat),this.camera.quaternion.slerpQuaternions(this.insideQ,this.centerLookQ,this.blendK),this.camera.fov!==this.ctlFov&&(this.camera.fov=this.ctlFov,this.camera.updateProjectionMatrix())}};B(Do,"HOVER_PICK_RADIUS_PX",16);let ja=Do;const am=Ne.degToRad(23.44),lm=11570494,ga=36,cm=.15,um=.55;function fm(i){return i=Ne.clamp(i,0,1),i*i*(3-2*i)}function qs(i,e,t){const n=new Fd({color:lm,metalness:.85,roughness:.35,transparent:!0,opacity:0}),r=new In,s=i*Se;r.add(new yo(new ju(s,e*Se,12,144),n));for(let o=0;o<ga;o++){const a=o/ga*Math.PI*2,l=o%(ga/4)===0,c=new yo(l?t.major:t.minor,n);c.position.set(Math.cos(a)*s,Math.sin(a)*s,0),c.rotation.z=a,r.add(c)}return{local:r,material:n}}function hm(){const i=new In;i.name="armillary-sphere";const e={minor:new hc(.012*Se,.0018*Se,.0035*Se),major:new hc(.02*Se,.0024*Se,.0045*Se)},t=qs(1.1,.006,e);t.local.rotation.x=-Math.PI/2;const n=qs(1.07,.004,e);n.local.rotation.y=Math.PI/2;const r=qs(1.05,.004,e);r.local.rotation.x=-Math.PI/2;const s=new In;s.add(r.local);const o=qs(1.03,.0035,e);o.local.rotation.x=-Math.PI/2;const a=new In;a.add(o.local);const l=new In;l.rotation.x=am,l.add(a);const c=[{built:t,inner:t.local,offsetDir:new ge(0,-1,0),tumble:new Gi(.9,0,.4)},{built:n,inner:n.local,offsetDir:new ge(1,.15,0),tumble:new Gi(0,.5,-1.1)},{built:r,inner:s,offsetDir:new ge(0,1,.2),tumble:new Gi(-.7,.5,0)},{built:o,inner:l,offsetDir:new ge(-.6,.6,.6),tumble:new Gi(.5,-.4,.8)}].map(({built:x,inner:S,offsetDir:k,tumble:C})=>{const M=new In;return M.add(S),i.add(M),{assembly:M,material:x.material,offsetDir:k.normalize(),tumble:C,alpha:0}});i.add(new $d(16771529,.9));const u=new dc(16774109,2.4);u.position.set(1.6*Se,2.4*Se,1.2*Se),i.add(u);const h=new dc(12570879,1.1);h.position.set(-1.8*Se,-.7*Se,-1.5*Se),i.add(h);let d=0;function f(x){const S=d*x.alpha;x.material.opacity=S,x.assembly.visible=S>.002}function m(x){c.forEach((S,k)=>{const C=fm((x-k*cm)/um);S.alpha=C;const M=1-C;S.assembly.scale.setScalar(.35+.65*C),S.assembly.position.copy(S.offsetDir).multiplyScalar(M*.5*Se),S.assembly.rotation.set(S.tumble.x*M,S.tumble.y*M,S.tumble.z*M),f(S)})}function p(x){s.rotation.y=x,a.rotation.y=x*.6}function y(x){d=Ne.clamp(x,0,1);for(const S of c)f(S)}function w(){const x=new Set,S=new Set;i.traverse(k=>{const C=k;if(C.isMesh){x.add(C.geometry);const M=C.material;for(const E of Array.isArray(M)?M:[M])S.add(E)}}),x.forEach(k=>k.dispose()),S.forEach(k=>k.dispose())}return m(0),{group:i,setAssembly:m,setSpin:p,setFade:y,dispose:w}}const ma=.55,dm=.9,pm=1.2;function Ii(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function gm(i){const{copy:e}=i,t=document.createElement("div");t.className="chapter-panel chapter-panel--left",t.innerHTML=`
    <p class="eyebrow">${Ii(e.eyebrow)}</p>
    <div class="chapter-head">
      <h2>${Ii(e.title)}</h2>
      ${e.seal?`<div class="seal">${Ii(e.seal)}</div>`:""}
    </div>
    <p class="hook">${Ii(e.hook)}</p>
    ${e.body.map(a=>`<p>${Ii(a)}</p>`).join("")}
  `,i.root.querySelector(".pin").appendChild(t);let n=null,r=0;const s={v:0};function o(a){if(!n)return;n.setAssembly(Math.min(a/ma,1));const l=Math.max(0,(a-ma)/(1-ma));n.setSpin(l*dm)}return{enter(){i.root.classList.add("inview"),n||(n=hm(),i.sky.addSkyObject(n.group,{rotateWithSky:!1}),o(r)),Mn.to(s,{v:1,duration:pm,ease:"power2.out",overwrite:!0,onUpdate:()=>n==null?void 0:n.setFade(s.v)})},update(a){r=a,o(a)},exit(){i.root.classList.remove("inview"),Mn.killTweensOf(s),s.v=0,n&&(i.sky.removeSkyObject(n.group),n.dispose(),n=null)}}}const mm=Object.freeze(Object.defineProperty({__proto__:null,createChapter:gm},Symbol.toStringTag,{value:"Module"})),Rr=-1e4,Po=14e3,Qa=Po-Rr,_m=[{name:"帝星",years:-1e3,note:"−1000"},{name:"勾陈一",years:0,note:"今"},{name:"织女一",years:13700,note:"+13700"}],ym=[{years:Rr,text:"−10000",cls:"ch6-endlab--start"},{years:0,text:"0",cls:""},{years:Po,text:"+14000",cls:"ch6-endlab--end"}],bm=2e3,vm=1.5,xm=.07,wm=`
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
`;let gu=!1;function Sm(){if(gu||typeof document>"u")return;const i=document.createElement("style");i.dataset.ch6="",i.textContent=wm,document.head.appendChild(i),gu=!0}function Ni(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Hs(i){return(i-Rr)/Qa*100}function km(i){const e=2e3+i;return e<=0?{era:"公元前",num:1-e}:{era:e<3e3?"公元":"公元后",num:e}}function Tm(i){Sm();const e=i.root.querySelector(".pin"),t=document.createElement("div");t.className="chapter-panel ch6-panel",t.innerHTML=`
    <p class="eyebrow">${Ni(i.copy.eyebrow)}</p>
    <div class="chapter-head">
      <h2>${Ni(i.copy.title)}</h2>
      ${i.copy.seal?`<div class="seal">${Ni(i.copy.seal)}</div>`:""}
    </div>
    <p class="hook">${Ni(i.copy.hook)}</p>
    ${i.copy.body.map(y=>`<p>${Ni(y)}</p>`).join("")}
  `,e.appendChild(t);const n=document.createElement("div");n.className="ch6-time";const r=[];for(let y=Rr;y<=Po;y+=bm){const w=y===Rr||y===0||y===Po;r.push(`<div class="ch6-tick${w?" ch6-tick--major":""}" style="left:${Hs(y).toFixed(3)}%"></div>`)}const s=ym.map(y=>`<div class="ch6-endlab ${y.cls}" style="left:${Hs(y.years).toFixed(3)}%">${y.text}</div>`),o=_m.map(y=>`
    <div class="ch6-mark" style="left:${Hs(y.years).toFixed(3)}%">
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
  `,e.appendChild(n);const a=n.querySelector(".ch6-era"),l=n.querySelector(".ch6-num"),c=n.querySelector(".ch6-pointer");let u=null;function h(){const y=new ju(vm,xm,12,96),w=new Bd({color:13214247}),x=new yo(y,w);return x.rotation.x=Math.PI/2,x.position.set(0,1.01*Se,0),x}let d=0,f=Number.NaN,m=Number.NaN;function p(y){i.sky.setSkyRotation(0,y);const w=Math.round(y);if(w!==f){f=w;const{era:S,num:k}=km(w);a.textContent=S,l.textContent=String(k)}const x=Math.round(Hs(y)*100)/100;x!==m&&(m=x,c.style.left=`${x}%`)}return{enter(){i.root.classList.add("inview"),u=h(),i.sky.addSkyObject(u,{rotateWithSky:!1}),p(Rr+d*Qa)},update(y){d=y,p(Rr+y*Qa)},exit(){i.root.classList.remove("inview"),i.sky.setSkyRotation(0,0),u&&(i.sky.removeSkyObject(u),u.geometry.dispose(),u.material.dispose(),u=null)}}}const Cm=Object.freeze(Object.defineProperty({__proto__:null,createChapter:Tm},Symbol.toStringTag,{value:"Module"})),Em=100,Mm=9414856;async function mu(i){const e=await fetch(i);if(!e.ok)throw new Error(`${i} → HTTP ${e.status}`);return e.json()}async function Pm(){const[i,e]=await Promise.all([mu(Bn("data/western.json")),mu(Bn("data/stars.json"))]),t=new Map;for(const l of e.stars)t.set(l.hip,vn(l.ra,l.dec,Em));const n=[];for(const l of i.constellations)for(const[c,u]of l.lines){const h=t.get(c),d=t.get(u);!h||!d||n.push(h[0],h[1],h[2],d[0],d[1],d[2])}const r=new _o;r.setAttribute("position",new Ki(new Float32Array(n),3));const s=new Vu({color:Mm,transparent:!0,opacity:0,depthWrite:!1,blending:ds}),o=new Gd(r,s);o.name="western-lines",o.frustumCulled=!1;const a=new In;return a.name="western",a.add(o),a.visible=!1,{group:a,setOpacity(l){const c=Ne.clamp(l,0,1);s.opacity=c,a.visible=c>.001},dispose(){r.dispose(),s.dispose()}}}const _u=.6,Am=`
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
`;let yu=!1;function Rm(){if(yu||typeof document>"u")return;const i=document.createElement("style");i.dataset.ch7="",i.textContent=Am,document.head.appendChild(i),yu=!0}function $i(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Om(i){return i=Ne.clamp(i,0,1),i*i*(3-2*i)}function zm(i){Rm();const e=i.root.querySelector(".pin"),{copy:t}=i,n=document.createElement("div");n.className="ch7-panel",n.innerHTML=`
    <p class="eyebrow">${$i(t.eyebrow)}</p>
    <div class="chapter-head">
      <h2>${$i(t.title)}</h2>
      ${t.seal?`<div class="seal">${$i(t.seal)}</div>`:""}
    </div>
    <p class="hook">${$i(t.hook)}</p>
    ${t.body.map(m=>`<p>${$i(m)}</p>`).join("")}
  `,e.appendChild(n);const r=document.createElement("div");r.className="ch7-compare",r.innerHTML=`
    <span class="ch7-end ch7-end--cn">中国星官</span>
    <input class="ch7-slider" type="range" min="0" max="100" step="1" value="0"
      aria-label="中西星空连线对比" />
    <span class="ch7-end ch7-end--west">西方星座</span>
  `,e.appendChild(r);const s=r.querySelector(".ch7-slider");let o=null,a=0,l=0,c=!1,u=null,h=null;function d(m){const p=i.sky.groupCount;for(let y=0;y<p;y++)i.sky.setGroupProgress(y,m)}function f(m){l=Ne.clamp(m,0,1),d(1-l),o==null||o.setOpacity(l),s.value=String(Math.round(l*100))}return s.addEventListener("input",()=>{c=!0,f(Number(s.value)/100)}),{enter(){if(i.root.classList.add("inview"),i.sky.setLabelsEnabled(!1),u==null||u.kill(),u=null,h==null||h.kill(),h=null,c=!1,f(0),o)return;const m=++a;Pm().then(p=>{if(m!==a){p.dispose();return}o=p,i.sky.addSkyObject(p.group),p.setOpacity(l)}).catch(p=>console.warn("[ch7] 西方星座数据加载失败：",p))},update(m){if(!c){if(m>=_u){l!==1&&f(1);return}f(Om(m/_u))}},exit(){if(i.root.classList.remove("inview"),++a,h==null||h.kill(),o){const p=o,y={v:l};h=Mn.to(y,{v:0,duration:.6,ease:"sine.inOut",onUpdate:()=>p.setOpacity(y.v),onComplete:()=>{i.sky.removeSkyObject(p.group),p.dispose(),o===p&&(o=null),h=null}})}u==null||u.kill();const m={v:1-l};u=Mn.to(m,{v:1,duration:2.4,ease:"sine.inOut",onUpdate:()=>d(m.v)}),i.sky.setLabelsEnabled(!0)}}}const Lm=Object.freeze(Object.defineProperty({__proto__:null,createChapter:zm},Symbol.toStringTag,{value:"Module"})),Dm=`
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
`;let bu=!1;function Im(){if(bu||typeof document>"u")return;const i=document.createElement("style");i.dataset.ch8="",i.textContent=Dm,document.head.appendChild(i),bu=!0}function Ln(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Nm(i){return i<0?0:i>1?1:i}function $m(i){return i.split(/(https?:\/\/\S+)/g).map(e=>/^https?:\/\//.test(e)?`<a href="${Ln(e)}" target="_blank" rel="noopener">${Ln(e)}</a>`:Ln(e)).join("")}function vu(i,e,t){const n=Nm((i-e)/(t-e));return n*n*(3-2*n)}function Fm(i){Im();const e=i.root.querySelector(".pin"),{copy:t}=i,n=document.createElement("div");n.className="ch8-wrap",n.innerHTML=`
    <div class="ch8-panel">
      <p class="ch8-eyebrow">${Ln(t.eyebrow)}</p>
      <div class="ch8-head">
        <h2 class="ch8-title">${Ln(t.title)}</h2>
        ${t.seal?`<div class="ch8-seal">${Ln(t.seal)}</div>`:""}
      </div>
      <p class="ch8-hook">${Ln(t.hook)}</p>
      <div class="ch8-body">${t.body.map(l=>`<p>${Ln(l)}</p>`).join("")}</div>
      <div class="ch8-credits">
        <p class="ch8-credits-heading">${Ln(Hc.heading)}</p>
        ${Hc.groups.map(l=>`
          <div class="ch8-credit-group">
            <h3>${Ln(l.title)}</h3>
            ${l.lines.map(c=>`<p>${$m(c)}</p>`).join("")}
          </div>`).join("")}
      </div>
    </div>
  `,e.appendChild(n);const r=n.querySelector(".ch8-panel"),s=n.querySelector(".ch8-credits");let o=-1,a=-1;return{enter(){},update(l){const c=vu(l,0,.3);(o<0||Math.abs(c-o)>=1e-4)&&(o=c,r.style.opacity=c.toFixed(3),r.style.transform=`translateY(${((1-c)*26).toFixed(2)}px)`);const u=vu(l,.12,.45);(a<0||Math.abs(u-a)>=1e-4)&&(a=u,s.style.opacity=u.toFixed(3),s.style.transform=`translateY(${((1-u)*14).toFixed(2)}px)`)},exit(){}}}const Bm=Object.freeze(Object.defineProperty({__proto__:null,createChapter:Fm},Symbol.toStringTag,{value:"Module"}));function Gm(i,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(i,n.key,n)}}function qm(i,e,t){return e&&Gm(i.prototype,e),i}/*!
 * Observer 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var bt,uo,on,lr,cr,mi,Th,Er,_i,Ch,Kn,En,Eh,Mh=function(){return bt||typeof window<"u"&&(bt=window.gsap)&&bt.registerPlugin&&bt},Ph=1,fi=[],he=[],Gn=[],is=Date.now,Ka=function(e,t){return t},Hm=function(){var e=_i.core,t=e.bridge||{},n=e._scrollers,r=e._proxies;n.push.apply(n,he),r.push.apply(r,Gn),he=n,Gn=r,Ka=function(o,a){return t[o](a)}},hr=function(e,t){return~Gn.indexOf(e)&&Gn[Gn.indexOf(e)+1][t]},ss=function(e){return!!~Ch.indexOf(e)},Rt=function(e,t,n,r,s){return e.addEventListener(t,n,{passive:r!==!1,capture:!!s})},At=function(e,t,n,r){return e.removeEventListener(t,n,!!r)},Ys="scrollLeft",Ws="scrollTop",Za=function(){return Kn&&Kn.isPressed||he.cache++},Ao=function(e,t){var n=function r(s){if(s||s===0){Ph&&(on.history.scrollRestoration="manual");var o=Kn&&Kn.isPressed;s=r.v=Math.round(s)||(Kn&&Kn.iOS?1:0),e(s),r.cacheID=he.cache,o&&Ka("ss",s)}else(t||he.cache!==r.cacheID||Ka("ref"))&&(r.cacheID=he.cache,r.v=e());return r.v+r.offset};return n.offset=0,e&&n},Dt={s:Ys,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:Ao(function(i){return arguments.length?on.scrollTo(i,pt.sc()):on.pageXOffset||lr[Ys]||cr[Ys]||mi[Ys]||0})},pt={s:Ws,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:Dt,sc:Ao(function(i){return arguments.length?on.scrollTo(Dt.sc(),i):on.pageYOffset||lr[Ws]||cr[Ws]||mi[Ws]||0})},Bt=function(e,t){return(t&&t._ctx&&t._ctx.selector||bt.utils.toArray)(e)[0]||(typeof e=="string"&&bt.config().nullTargetWarn!==!1?console.warn("Element not found:",e):null)},Ym=function(e,t){for(var n=t.length;n--;)if(t[n]===e||t[n].contains(e))return!0;return!1},mr=function(e,t){var n=t.s,r=t.sc;ss(e)&&(e=lr.scrollingElement||cr);var s=he.indexOf(e),o=r===pt.sc?1:2;!~s&&(s=he.push(e)-1),he[s+o]||Rt(e,"scroll",Za);var a=he[s+o],l=a||(he[s+o]=Ao(hr(e,n),!0)||(ss(e)?r:Ao(function(c){return arguments.length?e[n]=c:e[n]})));return l.target=e,a||(l.smooth=bt.getProperty(e,"scrollBehavior")==="smooth"),l},Ja=function(e,t,n){var r=e,s=e,o=is(),a=o,l=t||50,c=Math.max(500,l*3),u=function(m,p){var y=is();p||y-o>l?(s=r,r=m,a=o,o=y):n?r+=m:r=s+(m-s)/(y-a)*(o-a)},h=function(){s=r=n?0:r,a=o=0},d=function(m){var p=a,y=s,w=is();return(m||m===0)&&m!==r&&u(m),o===a||w-a>c?0:(r+(n?y:-y))/((n?w:o)-p)*1e3};return{update:u,reset:h,getVelocity:d}},Fi=function(e,t){return t&&!e._gsapAllow&&e.cancelable!==!1&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},xu=function(e){var t=Math.max.apply(Math,e),n=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(n)?t:n},Ah=function(){_i=bt.core.globals().ScrollTrigger,_i&&_i.core&&Hm()},Rh=function(e){return bt=e||Mh(),!uo&&bt&&typeof document<"u"&&document.body&&(on=window,lr=document,cr=lr.documentElement,mi=lr.body,Ch=[on,lr,cr,mi],bt.utils.clamp,Eh=bt.core.context||function(){},Er="onpointerenter"in mi?"pointer":"mouse",Th=ot.isTouch=on.matchMedia&&on.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in on||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,En=ot.eventTypes=("ontouchstart"in cr?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in cr?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return Ph=0},500),uo=1),_i||Ah(),uo};Dt.op=pt;he.cache=0;var ot=function(){function i(t){this.init(t)}var e=i.prototype;return e.init=function(n){uo||Rh(bt)||console.warn("Please gsap.registerPlugin(Observer)"),_i||Ah();var r=n.tolerance,s=n.dragMinimum,o=n.type,a=n.target,l=n.lineHeight,c=n.debounce,u=n.preventDefault,h=n.onStop,d=n.onStopDelay,f=n.ignore,m=n.wheelSpeed,p=n.event,y=n.onDragStart,w=n.onDragEnd,x=n.onDrag,S=n.onPress,k=n.onRelease,C=n.onRight,M=n.onLeft,E=n.onUp,O=n.onDown,P=n.onChangeX,A=n.onChangeY,Q=n.onChange,_=n.onToggleX,F=n.onToggleY,$=n.onHover,U=n.onHoverEnd,ne=n.onMove,H=n.ignoreCheck,R=n.isNormalizer,z=n.onGestureStart,b=n.onGestureEnd,J=n.onWheel,ee=n.onEnable,G=n.onDisable,V=n.onClick,te=n.scrollSpeed,ie=n.capture,Y=n.allowClicks,Oe=n.lockAxis,He=n.onLockAxis;this.target=a=Bt(a)||cr,this.vars=n,f&&(f=bt.utils.toArray(f)),r=r||1e-9,s=s||0,m=m||1,te=te||1,o=o||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(on.getComputedStyle(mi).lineHeight)||22);var be,Ye,K,L,pe,Ee,ze,T=this,rt=0,it=0,$e=n.passive||!u&&n.passive!==!1,X=mr(a,Dt),ue=mr(a,pt),_e=X(),Te=ue(),Le=~o.indexOf("touch")&&!~o.indexOf("pointer")&&En[0]==="pointerdown",Ut=ss(a),De=a.ownerDocument||lr,We=[0,0,0],Ct=[0,0,0],It=0,Hn=function(){return It=is()},ve=function(N,oe){return(T.event=N)&&f&&Ym(N.target,f)||oe&&Le&&N.pointerType!=="touch"||H&&H(N,oe)},Xe=function(){T._vx.reset(),T._vy.reset(),Ye.pause(),h&&h(T)},Fe=function(){var N=T.deltaX=xu(We),oe=T.deltaY=xu(Ct),D=Math.abs(N)>=r,j=Math.abs(oe)>=r;Q&&(D||j)&&Q(T,N,oe,We,Ct),D&&(C&&T.deltaX>0&&C(T),M&&T.deltaX<0&&M(T),P&&P(T),_&&T.deltaX<0!=rt<0&&_(T),rt=T.deltaX,We[0]=We[1]=We[2]=0),j&&(O&&T.deltaY>0&&O(T),E&&T.deltaY<0&&E(T),A&&A(T),F&&T.deltaY<0!=it<0&&F(T),it=T.deltaY,Ct[0]=Ct[1]=Ct[2]=0),(L||K)&&(ne&&ne(T),K&&(y&&K===1&&y(T),x&&x(T),K=0),L=!1),Ee&&!(Ee=!1)&&He&&He(T),pe&&(J(T),pe=!1),be=0},wn=function(N,oe,D){We[D]+=N,Ct[D]+=oe,T._vx.update(N),T._vy.update(oe),c?be||(be=requestAnimationFrame(Fe)):Fe()},Pn=function(N,oe){Oe&&!ze&&(T.axis=ze=Math.abs(N)>Math.abs(oe)?"x":"y",Ee=!0),ze!=="y"&&(We[2]+=N,T._vx.update(N,!0)),ze!=="x"&&(Ct[2]+=oe,T._vy.update(oe,!0)),c?be||(be=requestAnimationFrame(Fe)):Fe()},hn=function(N){if(!ve(N,1)){N=Fi(N,u);var oe=N.clientX,D=N.clientY,j=oe-T.x,W=D-T.y,Z=T.isDragging;T.x=oe,T.y=D,(Z||(j||W)&&(Math.abs(T.startX-oe)>=s||Math.abs(T.startY-D)>=s))&&(K||(K=Z?2:1),Z||(T.isDragging=!0),Pn(j,W))}},Sn=T.onPress=function(re){ve(re,1)||re&&re.button||(T.axis=ze=null,Ye.pause(),T.isPressed=!0,re=Fi(re),rt=it=0,T.startX=T.x=re.clientX,T.startY=T.y=re.clientY,T._vx.reset(),T._vy.reset(),Rt(R?a:De,En[1],hn,$e,!0),T.deltaX=T.deltaY=0,S&&S(T))},se=T.onRelease=function(re){if(!ve(re,1)){At(R?a:De,En[1],hn,!0);var N=!isNaN(T.y-T.startY),oe=T.isDragging,D=oe&&(Math.abs(T.x-T.startX)>3||Math.abs(T.y-T.startY)>3),j=Fi(re);!D&&N&&(T._vx.reset(),T._vy.reset(),u&&Y&&bt.delayedCall(.08,function(){if(is()-It>300&&!re.defaultPrevented){if(re.target.click)re.target.click();else if(De.createEvent){var W=De.createEvent("MouseEvents");W.initMouseEvent("click",!0,!0,on,1,j.screenX,j.screenY,j.clientX,j.clientY,!1,!1,!1,!1,0,null),re.target.dispatchEvent(W)}}})),T.isDragging=T.isGesturing=T.isPressed=!1,h&&oe&&!R&&Ye.restart(!0),K&&Fe(),w&&oe&&w(T),k&&k(T,D)}},kn=function(N){return N.touches&&N.touches.length>1&&(T.isGesturing=!0)&&z(N,T.isDragging)},at=function(){return(T.isGesturing=!1)||b(T)},gt=function(N){if(!ve(N)){var oe=X(),D=ue();wn((oe-_e)*te,(D-Te)*te,1),_e=oe,Te=D,h&&Ye.restart(!0)}},Et=function(N){if(!ve(N)){N=Fi(N,u),J&&(pe=!0);var oe=(N.deltaMode===1?l:N.deltaMode===2?on.innerHeight:1)*m;wn(N.deltaX*oe,N.deltaY*oe,0),h&&!R&&Ye.restart(!0)}},Vt=function(N){if(!ve(N)){var oe=N.clientX,D=N.clientY,j=oe-T.x,W=D-T.y;T.x=oe,T.y=D,L=!0,h&&Ye.restart(!0),(j||W)&&Pn(j,W)}},dn=function(N){T.event=N,$(T)},Mt=function(N){T.event=N,U(T)},Tn=function(N){return ve(N)||Fi(N,u)&&V(T)};Ye=T._dc=bt.delayedCall(d||.25,Xe).pause(),T.deltaX=T.deltaY=0,T._vx=Ja(0,50,!0),T._vy=Ja(0,50,!0),T.scrollX=X,T.scrollY=ue,T.isDragging=T.isGesturing=T.isPressed=!1,Eh(this),T.enable=function(re){return T.isEnabled||(Rt(Ut?De:a,"scroll",Za),o.indexOf("scroll")>=0&&Rt(Ut?De:a,"scroll",gt,$e,ie),o.indexOf("wheel")>=0&&Rt(a,"wheel",Et,$e,ie),(o.indexOf("touch")>=0&&Th||o.indexOf("pointer")>=0)&&(Rt(a,En[0],Sn,$e,ie),Rt(De,En[2],se),Rt(De,En[3],se),Y&&Rt(a,"click",Hn,!0,!0),V&&Rt(a,"click",Tn),z&&Rt(De,"gesturestart",kn),b&&Rt(De,"gestureend",at),$&&Rt(a,Er+"enter",dn),U&&Rt(a,Er+"leave",Mt),ne&&Rt(a,Er+"move",Vt)),T.isEnabled=!0,T.isDragging=T.isGesturing=T.isPressed=L=K=!1,T._vx.reset(),T._vy.reset(),_e=X(),Te=ue(),re&&re.type&&Sn(re),ee&&ee(T)),T},T.disable=function(){T.isEnabled&&(fi.filter(function(re){return re!==T&&ss(re.target)}).length||At(Ut?De:a,"scroll",Za),T.isPressed&&(T._vx.reset(),T._vy.reset(),At(R?a:De,En[1],hn,!0)),At(Ut?De:a,"scroll",gt,ie),At(a,"wheel",Et,ie),At(a,En[0],Sn,ie),At(De,En[2],se),At(De,En[3],se),At(a,"click",Hn,!0),At(a,"click",Tn),At(De,"gesturestart",kn),At(De,"gestureend",at),At(a,Er+"enter",dn),At(a,Er+"leave",Mt),At(a,Er+"move",Vt),T.isEnabled=T.isPressed=T.isDragging=!1,G&&G(T))},T.kill=T.revert=function(){T.disable();var re=fi.indexOf(T);re>=0&&fi.splice(re,1),Kn===T&&(Kn=0)},fi.push(T),R&&ss(a)&&(Kn=T),T.enable(p)},qm(i,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),i}();ot.version="3.15.0";ot.create=function(i){return new ot(i)};ot.register=Rh;ot.getAll=function(){return fi.slice()};ot.getById=function(i){return fi.filter(function(e){return e.vars.id===i})[0]};Mh()&&bt.registerPlugin(ot);/*!
 * ScrollTrigger 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var q,oi,fe,ke,rn,we,Al,Ro,Ss,os,Xi,Xs,xt,Ho,el,zt,wu,Su,ai,Oh,_a,zh,Ot,tl,Lh,Dh,ir,nl,Rl,yi,Ol,as,rl,ya,Us=1,wt=Date.now,ba=wt(),xn=0,Ui=0,ku=function(e,t,n){var r=Jt(e)&&(e.substr(0,6)==="clamp("||e.indexOf("max")>-1);return n["_"+t+"Clamp"]=r,r?e.substr(6,e.length-7):e},Tu=function(e,t){return t&&(!Jt(e)||e.substr(0,6)!=="clamp(")?"clamp("+e+")":e},Wm=function i(){return Ui&&requestAnimationFrame(i)},Cu=function(){return Ho=1},Eu=function(){return Ho=0},Dn=function(e){return e},Vi=function(e){return Math.round(e*1e5)/1e5||0},Ih=function(){return typeof window<"u"},Nh=function(){return q||Ih()&&(q=window.gsap)&&q.registerPlugin&&q},Hr=function(e){return!!~Al.indexOf(e)},$h=function(e){return(e==="Height"?Ol:fe["inner"+e])||rn["client"+e]||we["client"+e]},Fh=function(e){return hr(e,"getBoundingClientRect")||(Hr(e)?function(){return mo.width=fe.innerWidth,mo.height=Ol,mo}:function(){return jn(e)})},Xm=function(e,t,n){var r=n.d,s=n.d2,o=n.a;return(o=hr(e,"getBoundingClientRect"))?function(){return o()[r]}:function(){return(t?$h(s):e["client"+s])||0}},Um=function(e,t){return!t||~Gn.indexOf(e)?Fh(e):function(){return mo}},Fn=function(e,t){var n=t.s,r=t.d2,s=t.d,o=t.a;return Math.max(0,(n="scroll"+r)&&(o=hr(e,n))?o()-Fh(e)()[s]:Hr(e)?(rn[n]||we[n])-$h(r):e[n]-e["offset"+r])},Vs=function(e,t){for(var n=0;n<ai.length;n+=3)(!t||~t.indexOf(ai[n+1]))&&e(ai[n],ai[n+1],ai[n+2])},Jt=function(e){return typeof e=="string"},kt=function(e){return typeof e=="function"},ji=function(e){return typeof e=="number"},Mr=function(e){return typeof e=="object"},Bi=function(e,t,n){return e&&e.progress(t?0:1)&&n&&e.pause()},ri=function(e,t,n){if(e.enabled){var r=e._ctx?e._ctx.add(function(){return t(e,n)}):t(e,n);r&&r.totalTime&&(e.callbackAnimation=r)}},ii=Math.abs,Bh="left",Gh="top",zl="right",Ll="bottom",Fr="width",Br="height",ls="Right",cs="Left",us="Top",fs="Bottom",ct="padding",mn="margin",Ci="Width",Dl="Height",dt="px",_n=function(e){return fe.getComputedStyle(e.nodeType===Node.DOCUMENT_NODE?e.scrollingElement:e)},Vm=function(e){var t=_n(e).position;e.style.position=t==="absolute"||t==="fixed"?t:"relative"},Mu=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},jn=function(e,t){var n=t&&_n(e)[el]!=="matrix(1, 0, 0, 1, 0, 0)"&&q.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),r=e.getBoundingClientRect?e.getBoundingClientRect():e.scrollingElement.getBoundingClientRect();return n&&n.progress(0).kill(),r},Oo=function(e,t){var n=t.d2;return e["offset"+n]||e["client"+n]||0},qh=function(e){var t=[],n=e.labels,r=e.duration(),s;for(s in n)t.push(n[s]/r);return t},jm=function(e){return function(t){return q.utils.snap(qh(e),t)}},Il=function(e){var t=q.utils.snap(e),n=Array.isArray(e)&&e.slice(0).sort(function(r,s){return r-s});return n?function(r,s,o){o===void 0&&(o=.001);var a;if(!s)return t(r);if(s>0){for(r-=o,a=0;a<n.length;a++)if(n[a]>=r)return n[a];return n[a-1]}else for(a=n.length,r+=o;a--;)if(n[a]<=r)return n[a];return n[0]}:function(r,s,o){o===void 0&&(o=.001);var a=t(r);return!s||Math.abs(a-r)<o||a-r<0==s<0?a:t(s<0?r-e:r+e)}},Qm=function(e){return function(t,n){return Il(qh(e))(t,n.direction)}},js=function(e,t,n,r){return n.split(",").forEach(function(s){return e(t,s,r)})},_t=function(e,t,n,r,s){return e.addEventListener(t,n,{passive:!r,capture:!!s})},mt=function(e,t,n,r){return e.removeEventListener(t,n,!!r)},Qs=function(e,t,n){n=n&&n.wheelHandler,n&&(e(t,"wheel",n),e(t,"touchmove",n))},Pu={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},Ks={toggleActions:"play",anticipatePin:0},zo={top:0,left:0,center:.5,bottom:1,right:1},fo=function(e,t){if(Jt(e)){var n=e.indexOf("="),r=~n?+(e.charAt(n-1)+1)*parseFloat(e.substr(n+1)):0;~n&&(e.indexOf("%")>n&&(r*=t/100),e=e.substr(0,n-1)),e=r+(e in zo?zo[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)}return e},Zs=function(e,t,n,r,s,o,a,l){var c=s.startColor,u=s.endColor,h=s.fontSize,d=s.indent,f=s.fontWeight,m=ke.createElement("div"),p=Hr(n)||hr(n,"pinType")==="fixed",y=e.indexOf("scroller")!==-1,w=p?we:n.tagName==="IFRAME"?n.contentDocument.body:n,x=e.indexOf("start")!==-1,S=x?c:u,k="border-color:"+S+";font-size:"+h+";color:"+S+";font-weight:"+f+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return k+="position:"+((y||l)&&p?"fixed;":"absolute;"),(y||l||!p)&&(k+=(r===pt?zl:Ll)+":"+(o+parseFloat(d))+"px;"),a&&(k+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),m._isStart=x,m.setAttribute("class","gsap-marker-"+e+(t?" marker-"+t:"")),m.style.cssText=k,m.innerText=t||t===0?e+"-"+t:e,w.children[0]?w.insertBefore(m,w.children[0]):w.appendChild(m),m._offset=m["offset"+r.op.d2],ho(m,0,r,x),m},ho=function(e,t,n,r){var s={display:"block"},o=n[r?"os2":"p2"],a=n[r?"p2":"os2"];e._isFlipped=r,s[n.a+"Percent"]=r?-100:0,s[n.a]=r?"1px":0,s["border"+o+Ci]=1,s["border"+a+Ci]=0,s[n.p]=t+"px",q.set(e,s)},ce=[],il={},ks,Au=function(){return wt()-xn>34&&(ks||(ks=requestAnimationFrame(Zn)))},si=function(){(!Ot||!Ot.isPressed||Ot.startX>we.clientWidth)&&(he.cache++,Ot?ks||(ks=requestAnimationFrame(Zn)):Zn(),xn||Wr("scrollStart"),xn=wt())},va=function(){Dh=fe.innerWidth,Lh=fe.innerHeight},Qi=function(e){he.cache++,(e===!0||!xt&&!zh&&!ke.fullscreenElement&&!ke.webkitFullscreenElement&&(!tl||Dh!==fe.innerWidth||Math.abs(fe.innerHeight-Lh)>fe.innerHeight*.25))&&Ro.restart(!0)},Yr={},Km=[],Hh=function i(){return mt(de,"scrollEnd",i)||Or(!0)},Wr=function(e){return Yr[e]&&Yr[e].map(function(t){return t()})||Km},Zt=[],Yh=function(e){for(var t=0;t<Zt.length;t+=5)(!e||Zt[t+4]&&Zt[t+4].query===e)&&(Zt[t].style.cssText=Zt[t+1],Zt[t].getBBox&&Zt[t].setAttribute("transform",Zt[t+2]||""),Zt[t+3].uncache=1)},Wh=function(){return he.forEach(function(e){return kt(e)&&++e.cacheID&&(e.rec=e())})},Nl=function(e,t){var n;for(zt=0;zt<ce.length;zt++)n=ce[zt],n&&(!t||n._ctx===t)&&(e?n.kill(1):n.revert(!0,!0));as=!0,t&&Yh(t),t||Wr("revert")},Xh=function(e,t){he.cache++,(t||!Lt)&&he.forEach(function(n){return kt(n)&&n.cacheID++&&(n.rec=0)}),Jt(e)&&(fe.history.scrollRestoration=Rl=e)},Lt,Gr=0,Ru,Zm=function(){if(Ru!==Gr){var e=Ru=Gr;requestAnimationFrame(function(){return e===Gr&&Or(!0)})}},Uh=function(){we.appendChild(yi),Ol=!Ot&&yi.offsetHeight||fe.innerHeight,we.removeChild(yi)},Ou=function(e){return Ss(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t){return t.style.display=e?"none":"block"})},Or=function(e,t){if(rn=ke.documentElement,we=ke.body,Al=[fe,ke,rn,we],xn&&!e&&!as){_t(de,"scrollEnd",Hh);return}Uh(),Lt=de.isRefreshing=!0,as||Wh();var n=Wr("refreshInit");Oh&&de.sort(),t||Nl(),he.forEach(function(r){kt(r)&&(r.smooth&&(r.target.style.scrollBehavior="auto"),r(0))}),ce.slice(0).forEach(function(r){return r.refresh()}),as=!1,ce.forEach(function(r){if(r._subPinOffset&&r.pin){var s=r.vars.horizontal?"offsetWidth":"offsetHeight",o=r.pin[s];r.revert(!0,1),r.adjustPinSpacing(r.pin[s]-o),r.refresh()}}),rl=1,Ou(!0),ce.forEach(function(r){var s=Fn(r.scroller,r._dir),o=r.vars.end==="max"||r._endClamp&&r.end>s,a=r._startClamp&&r.start>=s;(o||a)&&r.setPositions(a?s-1:r.start,o?Math.max(a?s:r.start+1,s):r.end,!0)}),Ou(!1),rl=0,n.forEach(function(r){return r&&r.render&&r.render(-1)}),he.forEach(function(r){kt(r)&&(r.smooth&&requestAnimationFrame(function(){return r.target.style.scrollBehavior="smooth"}),r.rec&&r(r.rec))}),Xh(Rl,1),Ro.pause(),Gr++,Lt=2,Zn(2),ce.forEach(function(r){return kt(r.vars.onRefresh)&&r.vars.onRefresh(r)}),Lt=de.isRefreshing=!1,Wr("refresh")},sl=0,po=1,hs,Zn=function(e){if(e===2||!Lt&&!as){de.isUpdating=!0,hs&&hs.update(0);var t=ce.length,n=wt(),r=n-ba>=50,s=t&&ce[0].scroll();if(po=sl>s?-1:1,Lt||(sl=s),r&&(xn&&!Ho&&n-xn>200&&(xn=0,Wr("scrollEnd")),Xi=ba,ba=n),po<0){for(zt=t;zt-- >0;)ce[zt]&&ce[zt].update(0,r);po=1}else for(zt=0;zt<t;zt++)ce[zt]&&ce[zt].update(0,r);de.isUpdating=!1}ks=0},ol=[Bh,Gh,Ll,zl,mn+fs,mn+ls,mn+us,mn+cs,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],go=ol.concat([Fr,Br,"boxSizing","max"+Ci,"max"+Dl,"position",mn,ct,ct+us,ct+ls,ct+fs,ct+cs]),Jm=function(e,t,n){bi(n);var r=e._gsap;if(r.spacerIsNative)bi(r.spacerState);else if(e._gsap.swappedIn){var s=t.parentNode;s&&(s.insertBefore(e,t),s.removeChild(t))}e._gsap.swappedIn=!1},xa=function(e,t,n,r){if(!e._gsap.swappedIn){for(var s=ol.length,o=t.style,a=e.style,l;s--;)l=ol[s],o[l]=n[l];o.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(o.display="inline-block"),a[Ll]=a[zl]="auto",o.flexBasis=n.flexBasis||"auto",o.overflow="visible",o.boxSizing="border-box",o[Fr]=Oo(e,Dt)+dt,o[Br]=Oo(e,pt)+dt,o[ct]=a[mn]=a[Gh]=a[Bh]="0",bi(r),a[Fr]=a["max"+Ci]=n[Fr],a[Br]=a["max"+Dl]=n[Br],a[ct]=n[ct],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}},e1=/([A-Z])/g,bi=function(e){if(e){var t=e.t.style,n=e.length,r=0,s,o;for((e.t._gsap||q.core.getCache(e.t)).uncache=1;r<n;r+=2)o=e[r+1],s=e[r],o?t[s]=o:t[s]&&t.removeProperty(s.replace(e1,"-$1").toLowerCase())}},Js=function(e){for(var t=go.length,n=e.style,r=[],s=0;s<t;s++)r.push(go[s],n[go[s]]);return r.t=e,r},t1=function(e,t,n){for(var r=[],s=e.length,o=n?8:0,a;o<s;o+=2)a=e[o],r.push(a,a in t?t[a]:e[o+1]);return r.t=e.t,r},mo={left:0,top:0},zu=function(e,t,n,r,s,o,a,l,c,u,h,d,f,m){kt(e)&&(e=e(l)),Jt(e)&&e.substr(0,3)==="max"&&(e=d+(e.charAt(4)==="="?fo("0"+e.substr(3),n):0));var p=f?f.time():0,y,w,x;if(f&&f.seek(0),isNaN(e)||(e=+e),ji(e))f&&(e=q.utils.mapRange(f.scrollTrigger.start,f.scrollTrigger.end,0,d,e)),a&&ho(a,n,r,!0);else{kt(t)&&(t=t(l));var S=(e||"0").split(" "),k,C,M,E;x=Bt(t,l)||we,k=jn(x)||{},(!k||!k.left&&!k.top)&&_n(x).display==="none"&&(E=x.style.display,x.style.display="block",k=jn(x),E?x.style.display=E:x.style.removeProperty("display")),C=fo(S[0],k[r.d]),M=fo(S[1]||"0",n),e=k[r.p]-c[r.p]-u+C+s-M,a&&ho(a,M,r,n-M<20||a._isStart&&M>20),n-=n-M}if(m&&(l[m]=e||-.001,e<0&&(e=0)),o){var O=e+n,P=o._isStart;y="scroll"+r.d2,ho(o,O,r,P&&O>20||!P&&(h?Math.max(we[y],rn[y]):o.parentNode[y])<=O+1),h&&(c=jn(a),h&&(o.style[r.op.p]=c[r.op.p]-r.op.m-o._offset+dt))}return f&&x&&(y=jn(x),f.seek(d),w=jn(x),f._caScrollDist=y[r.p]-w[r.p],e=e/f._caScrollDist*d),f&&f.seek(p),f?e:Math.round(e)},n1=/(webkit|moz|length|cssText|inset)/i,Lu=function(e,t,n,r){if(e.parentNode!==t){var s=e.style,o,a;if(t===we){e._stOrig=s.cssText,a=_n(e);for(o in a)!+o&&!n1.test(o)&&a[o]&&typeof s[o]=="string"&&o!=="0"&&(s[o]=a[o]);s.top=n,s.left=r}else s.cssText=e._stOrig;q.core.getCache(e).uncache=1,t.appendChild(e)}},Vh=function(e,t,n){var r=t,s=r;return function(o){var a=Math.round(e());return a!==r&&a!==s&&Math.abs(a-r)>3&&Math.abs(a-s)>3&&(o=a,n&&n()),s=r,r=Math.round(o),r}},eo=function(e,t,n){var r={};r[t.p]="+="+n,q.set(e,r)},Du=function(e,t){var n=mr(e,t),r="_scroll"+t.p2,s=function o(a,l,c,u,h){var d=o.tween,f=l.onComplete,m={};c=c||n();var p=Vh(n,c,function(){d.kill(),o.tween=0});return h=u&&h||0,u=u||a-c,d&&d.kill(),l[r]=a,l.inherit=!1,l.modifiers=m,m[r]=function(){return p(c+u*d.ratio+h*d.ratio*d.ratio)},l.onUpdate=function(){he.cache++,o.tween&&Zn()},l.onComplete=function(){o.tween=0,f&&f.call(d)},d=o.tween=q.to(e,l),d};return e[r]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},_t(e,"wheel",n.wheelHandler),de.isTouch&&_t(e,"touchmove",n.wheelHandler),s},de=function(){function i(t,n){oi||i.register(q)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),nl(this),this.init(t,n)}var e=i.prototype;return e.init=function(n,r){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!Ui){this.update=this.refresh=this.kill=Dn;return}n=Mu(Jt(n)||ji(n)||n.nodeType?{trigger:n}:n,Ks);var s=n,o=s.onUpdate,a=s.toggleClass,l=s.id,c=s.onToggle,u=s.onRefresh,h=s.scrub,d=s.trigger,f=s.pin,m=s.pinSpacing,p=s.invalidateOnRefresh,y=s.anticipatePin,w=s.onScrubComplete,x=s.onSnapComplete,S=s.once,k=s.snap,C=s.pinReparent,M=s.pinSpacer,E=s.containerAnimation,O=s.fastScrollEnd,P=s.preventOverlaps,A=n.horizontal||n.containerAnimation&&n.horizontal!==!1?Dt:pt,Q=!h&&h!==0,_=Bt(n.scroller||fe),F=q.core.getCache(_),$=Hr(_),U=("pinType"in n?n.pinType:hr(_,"pinType")||$&&"fixed")==="fixed",ne=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],H=Q&&n.toggleActions.split(" "),R="markers"in n?n.markers:Ks.markers,z=$?0:parseFloat(_n(_)["border"+A.p2+Ci])||0,b=this,J=n.onRefreshInit&&function(){return n.onRefreshInit(b)},ee=Xm(_,$,A),G=Um(_,$),V=0,te=0,ie=0,Y=mr(_,A),Oe,He,be,Ye,K,L,pe,Ee,ze,T,rt,it,$e,X,ue,_e,Te,Le,Ut,De,We,Ct,It,Hn,ve,Xe,Fe,wn,Pn,hn,Sn,se,kn,at,gt,Et,Vt,dn,Mt;if(b._startClamp=b._endClamp=!1,b._dir=A,y*=45,b.scroller=_,b.scroll=E?E.time.bind(E):Y,Ye=Y(),b.vars=n,r=r||n.animation,"refreshPriority"in n&&(Oh=1,n.refreshPriority===-9999&&(hs=b)),F.tweenScroll=F.tweenScroll||{top:Du(_,pt),left:Du(_,Dt)},b.tweenTo=Oe=F.tweenScroll[A.p],b.scrubDuration=function(D){kn=ji(D)&&D,kn?se?se.duration(D):se=q.to(r,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:kn,paused:!0,onComplete:function(){return w&&w(b)}}):(se&&se.progress(1).kill(),se=0)},r&&(r.vars.lazy=!1,r._initted&&!b.isReverted||r.vars.immediateRender!==!1&&n.immediateRender!==!1&&r.duration()&&r.render(0,!0,!0),b.animation=r.pause(),r.scrollTrigger=b,b.scrubDuration(h),hn=0,l||(l=r.vars.id)),k&&((!Mr(k)||k.push)&&(k={snapTo:k}),"scrollBehavior"in we.style&&q.set($?[we,rn]:_,{scrollBehavior:"auto"}),he.forEach(function(D){return kt(D)&&D.target===($?ke.scrollingElement||rn:_)&&(D.smooth=!1)}),be=kt(k.snapTo)?k.snapTo:k.snapTo==="labels"?jm(r):k.snapTo==="labelsDirectional"?Qm(r):k.directional!==!1?function(D,j){return Il(k.snapTo)(D,wt()-te<500?0:j.direction)}:q.utils.snap(k.snapTo),at=k.duration||{min:.1,max:2},at=Mr(at)?os(at.min,at.max):os(at,at),gt=q.delayedCall(k.delay||kn/2||.1,function(){var D=Y(),j=wt()-te<500,W=Oe.tween;if((j||Math.abs(b.getVelocity())<10)&&!W&&!Ho&&V!==D){var Z=(D-L)/X,Be=r&&!Q?r.totalProgress():Z,ae=j?0:(Be-Sn)/(wt()-Xi)*1e3||0,Me=q.utils.clamp(-Z,1-Z,ii(ae/2)*ae/.185),Je=Z+(k.inertia===!1?0:Me),Ie,ye,xe=k,jt=xe.onStart,Pe=xe.onInterrupt,Ce=xe.onComplete;if(Ie=be(Je,b),ji(Ie)||(Ie=Je),ye=Math.max(0,Math.round(L+Ie*X)),D<=pe&&D>=L&&ye!==D){if(W&&!W._initted&&W.data<=ii(ye-D))return;k.inertia===!1&&(Me=Ie-Z),Oe(ye,{duration:at(ii(Math.max(ii(Je-Be),ii(Ie-Be))*.185/ae/.05||0)),ease:k.ease||"power3",data:ii(ye-D),onInterrupt:function(){return gt.restart(!0)&&Pe&&ri(b,Pe)},onComplete:function(){b.update(),V=Y(),r&&!Q&&(se?se.resetTo("totalProgress",Ie,r._tTime/r._tDur):r.progress(Ie)),hn=Sn=r&&!Q?r.totalProgress():b.progress,x&&x(b),Ce&&ri(b,Ce)}},D,Me*X,ye-D-Me*X),jt&&ri(b,jt,Oe.tween)}}else b.isActive&&V!==D&&gt.restart(!0)}).pause()),l&&(il[l]=b),d=b.trigger=Bt(d||f!==!0&&f),Mt=d&&d._gsap&&d._gsap.stRevert,Mt&&(Mt=Mt(b)),f=f===!0?d:Bt(f),Jt(a)&&(a={targets:d,className:a}),f&&(m===!1||m===mn||(m=!m&&f.parentNode&&f.parentNode.style&&_n(f.parentNode).display==="flex"?!1:ct),b.pin=f,He=q.core.getCache(f),He.spacer?ue=He.pinState:(M&&(M=Bt(M),M&&!M.nodeType&&(M=M.current||M.nativeElement),He.spacerIsNative=!!M,M&&(He.spacerState=Js(M))),He.spacer=Le=M||ke.createElement("div"),Le.classList.add("pin-spacer"),l&&Le.classList.add("pin-spacer-"+l),He.pinState=ue=Js(f)),n.force3D!==!1&&q.set(f,{force3D:!0}),b.spacer=Le=He.spacer,Pn=_n(f),Hn=Pn[m+A.os2],De=q.getProperty(f),We=q.quickSetter(f,A.a,dt),xa(f,Le,Pn),Te=Js(f)),R){it=Mr(R)?Mu(R,Pu):Pu,T=Zs("scroller-start",l,_,A,it,0),rt=Zs("scroller-end",l,_,A,it,0,T),Ut=T["offset"+A.op.d2];var Tn=Bt(hr(_,"content")||_);Ee=this.markerStart=Zs("start",l,Tn,A,it,Ut,0,E),ze=this.markerEnd=Zs("end",l,Tn,A,it,Ut,0,E),E&&(dn=q.quickSetter([Ee,ze],A.a,dt)),!U&&!(Gn.length&&hr(_,"fixedMarkers")===!0)&&(Vm($?we:_),q.set([T,rt],{force3D:!0}),Xe=q.quickSetter(T,A.a,dt),wn=q.quickSetter(rt,A.a,dt))}if(E){var re=E.vars.onUpdate,N=E.vars.onUpdateParams;E.eventCallback("onUpdate",function(){b.update(0,0,1),re&&re.apply(E,N||[])})}if(b.previous=function(){return ce[ce.indexOf(b)-1]},b.next=function(){return ce[ce.indexOf(b)+1]},b.revert=function(D,j){if(!j)return b.kill(!0);var W=D!==!1||!b.enabled,Z=xt;W!==b.isReverted&&(W&&(Et=Math.max(Y(),b.scroll.rec||0),ie=b.progress,Vt=r&&r.progress()),Ee&&[Ee,ze,T,rt].forEach(function(Be){return Be.style.display=W?"none":"block"}),W&&(xt=b,b.update(W)),f&&(!C||!b.isActive)&&(W?Jm(f,Le,ue):xa(f,Le,_n(f),ve)),W||b.update(W),xt=Z,b.isReverted=W)},b.refresh=function(D,j,W,Z){if(!((xt||!b.enabled)&&!j)){if(f&&D&&xn){_t(i,"scrollEnd",Hh);return}!Lt&&J&&J(b),xt=b,Oe.tween&&!W&&(Oe.tween.kill(),Oe.tween=0),se&&se.pause(),p&&r&&(r.revert({kill:!1}).invalidate(),r.getChildren?r.getChildren(!0,!0,!1).forEach(function(Kt){return Kt.vars.immediateRender&&Kt.render(0,!0,!0)}):r.vars.immediateRender&&r.render(0,!0,!0)),b.isReverted||b.revert(!0,!0),b._subPinOffset=!1;var Be=ee(),ae=G(),Me=E?E.duration():Fn(_,A),Je=X<=.01||!X,Ie=0,ye=Z||0,xe=Mr(W)?W.end:n.end,jt=n.endTrigger||d,Pe=Mr(W)?W.start:n.start||(n.start===0||!d?0:f?"0 0":"0 100%"),Ce=b.pinnedContainer=n.pinnedContainer&&Bt(n.pinnedContainer,b),Nt=d&&Math.max(0,ce.indexOf(b))||0,et=Nt,Ue,Ge,An,yr,ft,tt,Qt,Ur,Vr,Rn,Pt,On,Yn;for(R&&Mr(W)&&(On=q.getProperty(T,A.p),Yn=q.getProperty(rt,A.p));et-- >0;)tt=ce[et],tt.end||tt.refresh(0,1)||(xt=b),Qt=tt.pin,Qt&&(Qt===d||Qt===f||Qt===Ce)&&!tt.isReverted&&(Rn||(Rn=[]),Rn.unshift(tt),tt.revert(!0,!0)),tt!==ce[et]&&(Nt--,et--);for(kt(Pe)&&(Pe=Pe(b)),Pe=ku(Pe,"start",b),L=zu(Pe,d,Be,A,Y(),Ee,T,b,ae,z,U,Me,E,b._startClamp&&"_startClamp")||(f?-.001:0),kt(xe)&&(xe=xe(b)),Jt(xe)&&!xe.indexOf("+=")&&(~xe.indexOf(" ")?xe=(Jt(Pe)?Pe.split(" ")[0]:"")+xe:(Ie=fo(xe.substr(2),Be),xe=Jt(Pe)?Pe:(E?q.utils.mapRange(0,E.duration(),E.scrollTrigger.start,E.scrollTrigger.end,L):L)+Ie,jt=d)),xe=ku(xe,"end",b),pe=Math.max(L,zu(xe||(jt?"100% 0":Me),jt,Be,A,Y()+Ie,ze,rt,b,ae,z,U,Me,E,b._endClamp&&"_endClamp"))||-.001,Ie=0,et=Nt;et--;)tt=ce[et]||{},Qt=tt.pin,Qt&&tt.start-tt._pinPush<=L&&!E&&tt.end>0&&(Ue=tt.end-(b._startClamp?Math.max(0,tt.start):tt.start),(Qt===d&&tt.start-tt._pinPush<L||Qt===Ce)&&isNaN(Pe)&&(Ie+=Ue*(1-tt.progress)),Qt===f&&(ye+=Ue));if(L+=Ie,pe+=Ie,b._startClamp&&(b._startClamp+=Ie),b._endClamp&&!Lt&&(b._endClamp=pe||-.001,pe=Math.min(pe,Fn(_,A))),X=pe-L||(L-=.01)&&.001,Je&&(ie=q.utils.clamp(0,1,q.utils.normalize(L,pe,Et))),b._pinPush=ye,Ee&&Ie&&(Ue={},Ue[A.a]="+="+Ie,Ce&&(Ue[A.p]="-="+Y()),q.set([Ee,ze],Ue)),f&&!(rl&&b.end>=Fn(_,A)))Ue=_n(f),yr=A===pt,An=Y(),Ct=parseFloat(De(A.a))+ye,!Me&&pe>1&&(Pt=($?ke.scrollingElement||rn:_).style,Pt={style:Pt,value:Pt["overflow"+A.a.toUpperCase()]},$&&_n(we)["overflow"+A.a.toUpperCase()]!=="scroll"&&(Pt.style["overflow"+A.a.toUpperCase()]="scroll")),xa(f,Le,Ue),Te=Js(f),Ge=jn(f,!0),Ur=U&&mr(_,yr?Dt:pt)(),m?(ve=[m+A.os2,X+ye+dt],ve.t=Le,et=m===ct?Oo(f,A)+X+ye:0,et&&(ve.push(A.d,et+dt),Le.style.flexBasis!=="auto"&&(Le.style.flexBasis=et+dt)),bi(ve),Ce&&ce.forEach(function(Kt){Kt.pin===Ce&&Kt.vars.pinSpacing!==!1&&(Kt._subPinOffset=!0)}),U&&Y(Et)):(et=Oo(f,A),et&&Le.style.flexBasis!=="auto"&&(Le.style.flexBasis=et+dt)),U&&(ft={top:Ge.top+(yr?An-L:Ur)+dt,left:Ge.left+(yr?Ur:An-L)+dt,boxSizing:"border-box",position:"fixed"},ft[Fr]=ft["max"+Ci]=Math.ceil(Ge.width)+dt,ft[Br]=ft["max"+Dl]=Math.ceil(Ge.height)+dt,ft[mn]=ft[mn+us]=ft[mn+ls]=ft[mn+fs]=ft[mn+cs]="0",ft[ct]=Ue[ct],ft[ct+us]=Ue[ct+us],ft[ct+ls]=Ue[ct+ls],ft[ct+fs]=Ue[ct+fs],ft[ct+cs]=Ue[ct+cs],_e=t1(ue,ft,C),Lt&&Y(0)),r?(Vr=r._initted,_a(1),r.render(r.duration(),!0,!0),It=De(A.a)-Ct+X+ye,Fe=Math.abs(X-It)>1,U&&Fe&&_e.splice(_e.length-2,2),r.render(0,!0,!0),Vr||r.invalidate(!0),r.parent||r.totalTime(r.totalTime()),_a(0)):It=X,Pt&&(Pt.value?Pt.style["overflow"+A.a.toUpperCase()]=Pt.value:Pt.style.removeProperty("overflow-"+A.a));else if(d&&Y()&&!E)for(Ge=d.parentNode;Ge&&Ge!==we;)Ge._pinOffset&&(L-=Ge._pinOffset,pe-=Ge._pinOffset),Ge=Ge.parentNode;Rn&&Rn.forEach(function(Kt){return Kt.revert(!1,!0)}),b.start=L,b.end=pe,Ye=K=Lt?Et:Y(),!E&&!Lt&&(Ye<Et&&Y(Et),b.scroll.rec=0),b.revert(!1,!0),te=wt(),gt&&(V=-1,gt.restart(!0)),xt=0,r&&Q&&(r._initted||Vt)&&r.progress()!==Vt&&r.progress(Vt||0,!0).render(r.time(),!0,!0),(Je||ie!==b.progress||E||p||r&&!r._initted)&&(r&&!Q&&(r._initted||ie||r.vars.immediateRender!==!1)&&r.totalProgress(E&&L<-.001&&!ie?q.utils.normalize(L,pe,0):ie,!0),b.progress=Je||(Ye-L)/X===ie?0:ie),f&&m&&(Le._pinOffset=Math.round(b.progress*It)),se&&se.invalidate(),isNaN(On)||(On-=q.getProperty(T,A.p),Yn-=q.getProperty(rt,A.p),eo(T,A,On),eo(Ee,A,On-(Z||0)),eo(rt,A,Yn),eo(ze,A,Yn-(Z||0))),Je&&!Lt&&b.update(),u&&!Lt&&!$e&&($e=!0,u(b),$e=!1)}},b.getVelocity=function(){return(Y()-K)/(wt()-Xi)*1e3||0},b.endAnimation=function(){Bi(b.callbackAnimation),r&&(se?se.progress(1):r.paused()?Q||Bi(r,b.direction<0,1):Bi(r,r.reversed()))},b.labelToScroll=function(D){return r&&r.labels&&(L||b.refresh()||L)+r.labels[D]/r.duration()*X||0},b.getTrailing=function(D){var j=ce.indexOf(b),W=b.direction>0?ce.slice(0,j).reverse():ce.slice(j+1);return(Jt(D)?W.filter(function(Z){return Z.vars.preventOverlaps===D}):W).filter(function(Z){return b.direction>0?Z.end<=L:Z.start>=pe})},b.update=function(D,j,W){if(!(E&&!W&&!D)){var Z=Lt===!0?Et:b.scroll(),Be=D?0:(Z-L)/X,ae=Be<0?0:Be>1?1:Be||0,Me=b.progress,Je,Ie,ye,xe,jt,Pe,Ce,Nt;if(j&&(K=Ye,Ye=E?Y():Z,k&&(Sn=hn,hn=r&&!Q?r.totalProgress():ae)),y&&f&&!xt&&!Us&&xn&&(!ae&&L<Z+(Z-K)/(wt()-Xi)*y?ae=1e-4:ae===1&&pe>Z+(Z-K)/(wt()-Xi)*y&&(ae=.9999)),ae!==Me&&b.enabled){if(Je=b.isActive=!!ae&&ae<1,Ie=!!Me&&Me<1,Pe=Je!==Ie,jt=Pe||!!ae!=!!Me,b.direction=ae>Me?1:-1,b.progress=ae,jt&&!xt&&(ye=ae&&!Me?0:ae===1?1:Me===1?2:3,Q&&(xe=!Pe&&H[ye+1]!=="none"&&H[ye+1]||H[ye],Nt=r&&(xe==="complete"||xe==="reset"||xe in r))),P&&(Pe||Nt)&&(Nt||h||!r)&&(kt(P)?P(b):b.getTrailing(P).forEach(function(An){return An.endAnimation()})),Q||(se&&!xt&&!Us?(se._dp._time-se._start!==se._time&&se.render(se._dp._time-se._start),se.resetTo?se.resetTo("totalProgress",ae,r._tTime/r._tDur):(se.vars.totalProgress=ae,se.invalidate().restart())):r&&r.totalProgress(ae,!!(xt&&(te||D)))),f){if(D&&m&&(Le.style[m+A.os2]=Hn),!U)We(Vi(Ct+It*ae));else if(jt){if(Ce=!D&&ae>Me&&pe+1>Z&&Z+1>=Fn(_,A),C)if(!D&&(Je||Ce)){var et=jn(f,!0),Ue=Z-L;Lu(f,we,et.top+(A===pt?Ue:0)+dt,et.left+(A===pt?0:Ue)+dt)}else Lu(f,Le);bi(Je||Ce?_e:Te),Fe&&ae<1&&Je||We(Ct+(ae===1&&!Ce?It:0))}}k&&!Oe.tween&&!xt&&!Us&&gt.restart(!0),a&&(Pe||S&&ae&&(ae<1||!ya))&&Ss(a.targets).forEach(function(An){return An.classList[Je||S?"add":"remove"](a.className)}),o&&!Q&&!D&&o(b),jt&&!xt?(Q&&(Nt&&(xe==="complete"?r.pause().totalProgress(1):xe==="reset"?r.restart(!0).pause():xe==="restart"?r.restart(!0):r[xe]()),o&&o(b)),(Pe||!ya)&&(c&&Pe&&ri(b,c),ne[ye]&&ri(b,ne[ye]),S&&(ae===1?b.kill(!1,1):ne[ye]=0),Pe||(ye=ae===1?1:3,ne[ye]&&ri(b,ne[ye]))),O&&!Je&&Math.abs(b.getVelocity())>(ji(O)?O:2500)&&(Bi(b.callbackAnimation),se?se.progress(1):Bi(r,xe==="reverse"?1:!ae,1))):Q&&o&&!xt&&o(b)}if(wn){var Ge=E?Z/E.duration()*(E._caScrollDist||0):Z;Xe(Ge+(T._isFlipped?1:0)),wn(Ge)}dn&&dn(-Z/E.duration()*(E._caScrollDist||0))}},b.enable=function(D,j){b.enabled||(b.enabled=!0,_t(_,"resize",Qi),$||_t(_,"scroll",si),J&&_t(i,"refreshInit",J),D!==!1&&(b.progress=ie=0,Ye=K=V=Y()),j!==!1&&b.refresh())},b.getTween=function(D){return D&&Oe?Oe.tween:se},b.setPositions=function(D,j,W,Z){if(E){var Be=E.scrollTrigger,ae=E.duration(),Me=Be.end-Be.start;D=Be.start+Me*D/ae,j=Be.start+Me*j/ae}b.refresh(!1,!1,{start:Tu(D,W&&!!b._startClamp),end:Tu(j,W&&!!b._endClamp)},Z),b.update()},b.adjustPinSpacing=function(D){if(ve&&D){var j=ve.indexOf(A.d)+1;ve[j]=parseFloat(ve[j])+D+dt,ve[1]=parseFloat(ve[1])+D+dt,bi(ve)}},b.disable=function(D,j){if(D!==!1&&b.revert(!0,!0),b.enabled&&(b.enabled=b.isActive=!1,j||se&&se.pause(),Et=0,He&&(He.uncache=1),J&&mt(i,"refreshInit",J),gt&&(gt.pause(),Oe.tween&&Oe.tween.kill()&&(Oe.tween=0)),!$)){for(var W=ce.length;W--;)if(ce[W].scroller===_&&ce[W]!==b)return;mt(_,"resize",Qi),$||mt(_,"scroll",si)}},b.kill=function(D,j){b.disable(D,j),se&&!j&&se.kill(),l&&delete il[l];var W=ce.indexOf(b);W>=0&&ce.splice(W,1),W===zt&&po>0&&zt--,W=0,ce.forEach(function(Z){return Z.scroller===b.scroller&&(W=1)}),W||Lt||(b.scroll.rec=0),r&&(r.scrollTrigger=null,D&&r.revert({kill:!1}),j||r.kill()),Ee&&[Ee,ze,T,rt].forEach(function(Z){return Z.parentNode&&Z.parentNode.removeChild(Z)}),hs===b&&(hs=0),f&&(He&&(He.uncache=1),W=0,ce.forEach(function(Z){return Z.pin===f&&W++}),W||(He.spacer=0)),n.onKill&&n.onKill(b)},ce.push(b),b.enable(!1,!1),Mt&&Mt(b),r&&r.add&&!X){var oe=b.update;b.update=function(){b.update=oe,he.cache++,L||pe||b.refresh()},q.delayedCall(.01,b.update),X=.01,L=pe=0}else b.refresh();f&&Zm()},i.register=function(n){return oi||(q=n||Nh(),Ih()&&window.document&&i.enable(),oi=Ui),oi},i.defaults=function(n){if(n)for(var r in n)Ks[r]=n[r];return Ks},i.disable=function(n,r){Ui=0,ce.forEach(function(o){return o[r?"kill":"disable"](n)}),mt(fe,"wheel",si),mt(ke,"scroll",si),clearInterval(Xs),mt(ke,"touchcancel",Dn),mt(we,"touchstart",Dn),js(mt,ke,"pointerdown,touchstart,mousedown",Cu),js(mt,ke,"pointerup,touchend,mouseup",Eu),Ro.kill(),Vs(mt);for(var s=0;s<he.length;s+=3)Qs(mt,he[s],he[s+1]),Qs(mt,he[s],he[s+2])},i.enable=function(){if(fe=window,ke=document,rn=ke.documentElement,we=ke.body,q){if(Ss=q.utils.toArray,os=q.utils.clamp,nl=q.core.context||Dn,_a=q.core.suppressOverwrites||Dn,Rl=fe.history.scrollRestoration||"auto",sl=fe.pageYOffset||0,q.core.globals("ScrollTrigger",i),we){Ui=1,yi=document.createElement("div"),yi.style.height="100vh",yi.style.position="absolute",Uh(),Wm(),ot.register(q),i.isTouch=ot.isTouch,ir=ot.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),tl=ot.isTouch===1,_t(fe,"wheel",si),Al=[fe,ke,rn,we],q.matchMedia?(i.matchMedia=function(u){var h=q.matchMedia(),d;for(d in u)h.add(d,u[d]);return h},q.addEventListener("matchMediaInit",function(){Wh(),Nl()}),q.addEventListener("matchMediaRevert",function(){return Yh()}),q.addEventListener("matchMedia",function(){Or(0,1),Wr("matchMedia")}),q.matchMedia().add("(orientation: portrait)",function(){return va(),va})):console.warn("Requires GSAP 3.11.0 or later"),va(),_t(ke,"scroll",si);var n=we.hasAttribute("style"),r=we.style,s=r.borderTopStyle,o=q.core.Animation.prototype,a,l;for(o.revert||Object.defineProperty(o,"revert",{value:function(){return this.time(-.01,!0)}}),r.borderTopStyle="solid",a=jn(we),pt.m=Math.round(a.top+pt.sc())||0,Dt.m=Math.round(a.left+Dt.sc())||0,s?r.borderTopStyle=s:r.removeProperty("border-top-style"),n||(we.setAttribute("style",""),we.removeAttribute("style")),Xs=setInterval(Au,250),q.delayedCall(.5,function(){return Us=0}),_t(ke,"touchcancel",Dn),_t(we,"touchstart",Dn),js(_t,ke,"pointerdown,touchstart,mousedown",Cu),js(_t,ke,"pointerup,touchend,mouseup",Eu),el=q.utils.checkPrefix("transform"),go.push(el),oi=wt(),Ro=q.delayedCall(.2,Or).pause(),ai=[ke,"visibilitychange",function(){var u=fe.innerWidth,h=fe.innerHeight;ke.hidden?(wu=u,Su=h):(wu!==u||Su!==h)&&Qi()},ke,"DOMContentLoaded",Or,fe,"load",Or,fe,"resize",Qi],Vs(_t),ce.forEach(function(u){return u.enable(0,1)}),l=0;l<he.length;l+=3)Qs(mt,he[l],he[l+1]),Qs(mt,he[l],he[l+2])}else if(ke){var c=function u(){i.enable(),ke.removeEventListener("DOMContentLoaded",u)};ke.addEventListener("DOMContentLoaded",c)}}},i.config=function(n){"limitCallbacks"in n&&(ya=!!n.limitCallbacks);var r=n.syncInterval;r&&clearInterval(Xs)||(Xs=r)&&setInterval(Au,r),"ignoreMobileResize"in n&&(tl=i.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(Vs(mt)||Vs(_t,n.autoRefreshEvents||"none"),zh=(n.autoRefreshEvents+"").indexOf("resize")===-1)},i.scrollerProxy=function(n,r){var s=Bt(n),o=he.indexOf(s),a=Hr(s);~o&&he.splice(o,a?6:2),r&&(a?Gn.unshift(fe,r,we,r,rn,r):Gn.unshift(s,r))},i.clearMatchMedia=function(n){ce.forEach(function(r){return r._ctx&&r._ctx.query===n&&r._ctx.kill(!0,!0)})},i.isInViewport=function(n,r,s){var o=(Jt(n)?Bt(n):n).getBoundingClientRect(),a=o[s?Fr:Br]*r||0;return s?o.right-a>0&&o.left+a<fe.innerWidth:o.bottom-a>0&&o.top+a<fe.innerHeight},i.positionInViewport=function(n,r,s){Jt(n)&&(n=Bt(n));var o=n.getBoundingClientRect(),a=o[s?Fr:Br],l=r==null?a/2:r in zo?zo[r]*a:~r.indexOf("%")?parseFloat(r)*a/100:parseFloat(r)||0;return s?(o.left+l)/fe.innerWidth:(o.top+l)/fe.innerHeight},i.killAll=function(n){if(ce.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var r=Yr.killAll||[];Yr={},r.forEach(function(s){return s()})}},i}();de.version="3.15.0";de.saveStyles=function(i){return i?Ss(i).forEach(function(e){if(e&&e.style){var t=Zt.indexOf(e);t>=0&&Zt.splice(t,5),Zt.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),q.core.getCache(e),nl())}}):Zt};de.revert=function(i,e){return Nl(!i,e)};de.create=function(i,e){return new de(i,e)};de.refresh=function(i){return i?Qi(!0):(oi||de.register())&&Or(!0)};de.update=function(i){return++he.cache&&Zn(i===!0?2:0)};de.clearScrollMemory=Xh;de.maxScroll=function(i,e){return Fn(i,e?Dt:pt)};de.getScrollFunc=function(i,e){return mr(Bt(i),e?Dt:pt)};de.getById=function(i){return il[i]};de.getAll=function(){return ce.filter(function(i){return i.vars.id!=="ScrollSmoother"})};de.isScrolling=function(){return!!xn};de.snapDirectional=Il;de.addEventListener=function(i,e){var t=Yr[i]||(Yr[i]=[]);~t.indexOf(e)||t.push(e)};de.removeEventListener=function(i,e){var t=Yr[i],n=t&&t.indexOf(e);n>=0&&t.splice(n,1)};de.batch=function(i,e){var t=[],n={},r=e.interval||.016,s=e.batchMax||1e9,o=function(c,u){var h=[],d=[],f=q.delayedCall(r,function(){u(h,d),h=[],d=[]}).pause();return function(m){h.length||f.restart(!0),h.push(m.trigger),d.push(m),s<=h.length&&f.progress(1)}},a;for(a in e)n[a]=a.substr(0,2)==="on"&&kt(e[a])&&a!=="onRefreshInit"?o(a,e[a]):e[a];return kt(s)&&(s=s(),_t(de,"refresh",function(){return s=e.batchMax()})),Ss(i).forEach(function(l){var c={};for(a in n)c[a]=n[a];c.trigger=l,t.push(de.create(c))}),t};var Iu=function(e,t,n,r){return t>r?e(r):t<0&&e(0),n>r?(r-t)/(n-t):n<0?t/(t-n):1},wa=function i(e,t){t===!0?e.style.removeProperty("touch-action"):e.style.touchAction=t===!0?"auto":t?"pan-"+t+(ot.isTouch?" pinch-zoom":""):"none",e===rn&&i(we,t)},to={auto:1,scroll:1},r1=function(e){var t=e.event,n=e.target,r=e.axis,s=(t.changedTouches?t.changedTouches[0]:t).target,o=s._gsap||q.core.getCache(s),a=wt(),l;if(!o._isScrollT||a-o._isScrollT>2e3){for(;s&&s!==we&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(to[(l=_n(s)).overflowY]||to[l.overflowX]));)s=s.parentNode;o._isScroll=s&&s!==n&&!Hr(s)&&(to[(l=_n(s)).overflowY]||to[l.overflowX]),o._isScrollT=a}(o._isScroll||r==="x")&&(t.stopPropagation(),t._gsapAllow=!0)},jh=function(e,t,n,r){return ot.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:r=r&&r1,onPress:r,onDrag:r,onScroll:r,onEnable:function(){return n&&_t(ke,ot.eventTypes[0],$u,!1,!0)},onDisable:function(){return mt(ke,ot.eventTypes[0],$u,!0)}})},i1=/(input|label|select|textarea)/i,Nu,$u=function(e){var t=i1.test(e.target.tagName);(t||Nu)&&(e._gsapAllow=!0,Nu=t)},s1=function(e){Mr(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var t=e,n=t.normalizeScrollX,r=t.momentum,s=t.allowNestedScroll,o=t.onRelease,a,l,c=Bt(e.target)||rn,u=q.core.globals().ScrollSmoother,h=u&&u.get(),d=ir&&(e.content&&Bt(e.content)||h&&e.content!==!1&&!h.smooth()&&h.content()),f=mr(c,pt),m=mr(c,Dt),p=1,y=(ot.isTouch&&fe.visualViewport?fe.visualViewport.scale*fe.visualViewport.width:fe.outerWidth)/fe.innerWidth,w=0,x=kt(r)?function(){return r(a)}:function(){return r||2.8},S,k,C=jh(c,e.type,!0,s),M=function(){return k=!1},E=Dn,O=Dn,P=function(){l=Fn(c,pt),O=os(ir?1:0,l),n&&(E=os(0,Fn(c,Dt))),S=Gr},A=function(){d._gsap.y=Vi(parseFloat(d._gsap.y)+f.offset)+"px",d.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(d._gsap.y)+", 0, 1)",f.offset=f.cacheID=0},Q=function(){if(k){requestAnimationFrame(M);var R=Vi(a.deltaY/2),z=O(f.v-R);if(d&&z!==f.v+f.offset){f.offset=z-f.v;var b=Vi((parseFloat(d&&d._gsap.y)||0)-f.offset);d.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+b+", 0, 1)",d._gsap.y=b+"px",f.cacheID=he.cache,Zn()}return!0}f.offset&&A(),k=!0},_,F,$,U,ne=function(){P(),_.isActive()&&_.vars.scrollY>l&&(f()>l?_.progress(1)&&f(l):_.resetTo("scrollY",l))};return d&&q.set(d,{y:"+=0"}),e.ignoreCheck=function(H){return ir&&H.type==="touchmove"&&Q()||p>1.05&&H.type!=="touchstart"||a.isGesturing||H.touches&&H.touches.length>1},e.onPress=function(){k=!1;var H=p;p=Vi((fe.visualViewport&&fe.visualViewport.scale||1)/y),_.pause(),H!==p&&wa(c,p>1.01?!0:n?!1:"x"),F=m(),$=f(),P(),S=Gr},e.onRelease=e.onGestureStart=function(H,R){if(f.offset&&A(),!R)U.restart(!0);else{he.cache++;var z=x(),b,J;n&&(b=m(),J=b+z*.05*-H.velocityX/.227,z*=Iu(m,b,J,Fn(c,Dt)),_.vars.scrollX=E(J)),b=f(),J=b+z*.05*-H.velocityY/.227,z*=Iu(f,b,J,Fn(c,pt)),_.vars.scrollY=O(J),_.invalidate().duration(z).play(.01),(ir&&_.vars.scrollY>=l||b>=l-1)&&q.to({},{onUpdate:ne,duration:z})}o&&o(H)},e.onWheel=function(){_._ts&&_.pause(),wt()-w>1e3&&(S=0,w=wt())},e.onChange=function(H,R,z,b,J){if(Gr!==S&&P(),R&&n&&m(E(b[2]===R?F+(H.startX-H.x):m()+R-b[1])),z){f.offset&&A();var ee=J[2]===z,G=ee?$+H.startY-H.y:f()+z-J[1],V=O(G);ee&&G!==V&&($+=V-G),f(V)}(z||R)&&Zn()},e.onEnable=function(){wa(c,n?!1:"x"),de.addEventListener("refresh",ne),_t(fe,"resize",ne),f.smooth&&(f.target.style.scrollBehavior="auto",f.smooth=m.smooth=!1),C.enable()},e.onDisable=function(){wa(c,!0),mt(fe,"resize",ne),de.removeEventListener("refresh",ne),C.kill()},e.lockAxis=e.lockAxis!==!1,a=new ot(e),a.iOS=ir,ir&&!f()&&f(1),ir&&q.ticker.add(Dn),U=a._dc,_=q.to(a,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:Vh(f,f(),function(){return _.pause()})},onUpdate:Zn,onComplete:U.vars.onComplete}),a};de.sort=function(i){if(kt(i))return ce.sort(i);var e=fe.pageYOffset||0;return de.getAll().forEach(function(t){return t._sortY=t.trigger?e+t.trigger.getBoundingClientRect().top:t.start+fe.innerHeight}),ce.sort(i||function(t,n){return(t.vars.refreshPriority||0)*-1e6+(t.vars.containerAnimation?1e6:t._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};de.observe=function(i){return new ot(i)};de.normalizeScroll=function(i){if(typeof i>"u")return Ot;if(i===!0&&Ot)return Ot.enable();if(i===!1){Ot&&Ot.kill(),Ot=i;return}var e=i instanceof ot?i:s1(i);return Ot&&Ot.target===e.target&&Ot.kill(),Hr(e.target)&&(Ot=e),e};de.core={_getVelocityProp:Ja,_inputObserver:jh,_scrollers:he,_proxies:Gn,bridge:{ss:function(){xn||Wr("scrollStart"),xn=wt()},ref:function(){return xt}}};Nh()&&q.registerPlugin(de);Mn.registerPlugin(de);const Fu=Object.assign({"./chapters/ch1.ts":Cp,"./chapters/ch2.ts":gg,"./chapters/ch3.ts":Mg,"./chapters/ch4.ts":Ng,"./chapters/ch5.ts":mm,"./chapters/ch6.ts":Cm,"./chapters/ch7.ts":Lm,"./chapters/ch8.ts":Bm}),o1=Object.keys(Fu).map(i=>{const e=i.match(/\/(ch\d+)\.ts$/);return e?{id:e[1],num:parseInt(e[1].slice(2),10),create:Fu[i].createChapter}:null}).filter(i=>i!==null).sort((i,e)=>i.num-e.num);function a1(i,e){const t=[],n=[];return o1.forEach((r,s)=>{const o=document.getElementById(r.id);if(!o)throw new Error(`缺少章节容器 #${r.id}（检查 index.html）`);const a=X0[r.id];if(!a)throw new Error(`COPY 缺少 ${r.id} 文案`);const l=r.create({sky:i,root:o,copy:a,id:r.id});t.push(l),n.push(de.create({trigger:o,start:"top top",end:"bottom bottom",scrub:!0,onEnter:()=>l.enter(),onEnterBack:()=>l.enter(),onLeave:()=>l.exit(),onLeaveBack:()=>l.exit(),onUpdate:c=>{l.update(c.progress),e(s+c.progress)}}))}),{chapters:t,triggers:n}}const Lo=30,Bu=.22,l1=`
.app-cursor-ring, .app-cursor-dot {
  position: fixed; top: 0; left: 0; z-index: 60; pointer-events: none;
  border-radius: 50%; transform: translate(-50%, -50%);
  will-change: transform;
}
.app-cursor-ring {
  width: ${Lo}px; height: ${Lo}px;
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
`;function c1(i){if(window.matchMedia("(pointer: coarse)").matches)return;const e=document.createElement("style");e.textContent=l1,document.head.appendChild(e);const t=document.createElement("div");t.className="app-cursor-ring app-cursor-hidden";const n=document.createElement("div");n.className="app-cursor-dot app-cursor-hidden",document.body.append(t,n);let r=-100,s=-100,o=-100,a=-100,l=!1,c=!1;const u=document.querySelector(".sky-tooltip");window.addEventListener("pointermove",f=>{const m=f.target===i;r=f.clientX,s=f.clientY,m!==l&&(l=m,t.classList.toggle("app-cursor-hidden",!l),n.classList.toggle("app-cursor-hidden",!l))}),window.addEventListener("pointerdown",()=>{c=!0,t.classList.add("is-down")}),window.addEventListener("pointerup",()=>{c=!1,t.classList.remove("is-down")}),document.documentElement.addEventListener("mouseleave",()=>{l=!1,t.classList.add("app-cursor-hidden"),n.classList.add("app-cursor-hidden")});let h=1;const d=()=>{o+=(r-o)*Bu,a+=(s-a)*Bu;const f=u!==null&&u.style.display==="block",m=(f?.55:1)*(c?.8:1);h+=(m-h)*.2,t.classList.toggle("is-star",f),t.style.transform=`translate(${o-Lo/2}px, ${a-Lo/2}px) scale(${h.toFixed(3)})`,n.style.transform=`translate(${r-2}px, ${s-2}px)`,requestAnimationFrame(d)};requestAnimationFrame(d)}const u1=1.015,Gu={ra:192.8595,dec:27.1283},qu={ra:266.405,dec:-28.9362},f1=.085,h1=.14,d1=.9,p1=.6,g1=new Qu(.96,.9,.78),m1=new Qu(1,.88,.68),_1=`
varying vec3 vDir;
void main() {
  // 球心在原点：物体空间坐标即天球方向（随父组岁差旋转，与星点行为一致）
  vDir = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,y1=`
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
`;function b1(i){const e=new ge(...vn(Gu.ra,Gu.dec)).normalize(),t=new ge(...vn(qu.ra,qu.dec)),n=t.addScaledVector(e,-t.dot(e)).normalize(),r=new ge().crossVectors(e,n).normalize(),s=new qd(i*u1,96,64),o=new Hd({vertexShader:_1,fragmentShader:y1,uniforms:{uPole:{value:e},uE0:{value:n},uE1:{value:r},uPeakAlpha:{value:f1},uWidth:{value:h1},uCenterSigma:{value:d1},uDust:{value:p1},uColorBand:{value:g1},uColorCore:{value:m1}},transparent:!0,depthWrite:!1,blending:ds,side:Yd}),a=new yo(s,o);a.name="milkyway-shell";const l=new In;return l.name="milkyway",l.add(a),{group:l,dispose(){s.dispose(),o.dispose()}}}function Qh(){document.fullscreenEnabled&&(document.fullscreenElement?Promise.resolve(document.exitFullscreen()).catch(()=>{}):Promise.resolve(document.documentElement.requestFullscreen()).catch(()=>{}))}const v1=`
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
`;function x1({sections:i,names:e}){const t=document.createElement("style");t.textContent=v1,document.head.appendChild(t);const n=document.createElement("div");n.className="app-pager";const r=document.createElement("button");r.className="app-pager-btn",r.type="button",r.setAttribute("aria-label","上一章"),r.textContent="‹";const s=document.createElement("span");s.className="app-pager-idx";const o=document.createElement("button");if(o.className="app-pager-btn",o.type="button",o.setAttribute("aria-label","下一章"),o.textContent="›",document.fullscreenEnabled){const d=document.createElement("button");d.className="app-pager-btn",d.type="button";const f=()=>{const m=!!document.fullscreenElement;d.textContent=m?"✕":"⛶",d.setAttribute("aria-label",m?"退出全屏（F）":"进入全屏（F）")};d.addEventListener("click",Qh),document.addEventListener("fullscreenchange",f),f(),n.append(r,s,o,d)}else n.append(r,s,o);document.body.appendChild(n);const a=i.length-1;let l=0;function c(){const d=window.innerHeight,f=[];for(const m of i){const p=m.offsetTop,y=Math.max(m.offsetHeight-d,0),w=Math.round(y/d);for(let x=0;x<=w;x++)f.push(p+Math.min(x*d,y))}return f.sort((m,p)=>m-p)}function u(){s.textContent=e[l]?`${e[l]} · ${l+1}/${i.length}`:`${l+1}/${i.length}`;const d=document.documentElement.scrollHeight-window.innerHeight;r.disabled=window.scrollY<=2,o.disabled=window.scrollY>=d-2}function h(d){const f=c(),m=window.scrollY,p=2,y=d>0?f.find(w=>w>m+p)??f[f.length-1]:[...f].reverse().find(w=>w<m-p)??0;y!==void 0&&window.scrollTo({top:y,behavior:"smooth"})}return r.addEventListener("click",()=>h(-1)),o.addEventListener("click",()=>h(1)),window.addEventListener("scroll",u,{passive:!0}),u(),{setCurrent(d){const f=Math.min(Math.max(Math.round(d),0),a);f!==l&&(l=f,u())}}}const w1=3.5;function S1(){try{const i=document.createElement("canvas");return!!(i.getContext("webgl2")||i.getContext("webgl"))}catch{return!1}}function Hu(i){var n,r,s;const e=document.getElementById("fallback");e&&(e.hidden=!1);const t=document.getElementById("fallback-diag");t&&(t.textContent=`诊断信息：${i}`),(n=document.getElementById("chapters"))==null||n.setAttribute("hidden",""),(r=document.getElementById("sky-canvas"))==null||r.setAttribute("hidden",""),(s=document.getElementById("loading"))==null||s.remove()}async function k1(){const i=document.getElementById("sky-canvas");if(!i)throw new Error("缺少 #sky-canvas");const e=new ja(i);c1(i);const t=document.getElementById("loading");try{await e.init()}catch(u){console.error(u),t&&(t.textContent="星空数据加载失败，请检查开发服务器");return}t==null||t.remove(),e.addSkyObject(b1(Se).group),_p();const n=new bo(xp),r=[1,2,3,4,5,6,7,8].map(u=>document.getElementById(`ch${u}`)),s=["序","星野","授时","天人","天球","岁差","对话","尾声"],o=x1({sections:r,names:s});window.addEventListener("keydown",u=>{if(u.key!=="f"&&u.key!=="F"||u.ctrlKey||u.metaKey||u.altKey)return;const h=u.target;h&&(h.tagName==="INPUT"||h.tagName==="TEXTAREA"||h.isContentEditable)||Qh()});let a=0,l=0;const{chapters:c}=a1(e,u=>{a=u,o.setCurrent(Math.min(Math.floor(u),s.length-1))});e.start(u=>{var d,f;l+=(a-l)*(1-Math.exp(-u*w1)),e.applyCameraState(n.sampleGlobal(l));const h=Math.min(Math.max(Math.floor(l),0),c.length-1);(f=(d=c[h])==null?void 0:d.frame)==null||f.call(d,u)})}S1()?k1().catch(i=>{console.error(i),Hu(i instanceof Error?i.message:String(i))}):Hu("当前浏览器环境无法创建 WebGL 上下文（webgl2 / webgl 均不可用）");
