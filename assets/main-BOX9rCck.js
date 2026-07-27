var If=Object.defineProperty;var Nf=(r,t,n)=>t in r?If(r,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):r[t]=n;var R=(r,t,n)=>Nf(r,typeof t!="symbol"?t+"":t,n);import{M as fa,V as it,Q as Ve,r as Ge,a as Pt,G as En,S as Ka,A as Wi,b as Za,B as hs,c as ci,D as $o,d as _u,P as Ja,C as Oo,e as zn,w as yu,f as bu,L as vu,g as Ff,h as $f,E as Hr,W as Bf,i as Hf,j as Gf,k as Yf,l as Wf,m as Xf,n as qf,o as Vf,p as Uf,q as jf,s as Pl,t as Qf,u as Al,v as Kf,x as Rl,y as Zf,z as po,T as wu,F as Jf,H as td,I as xu,J as ed,K as nd}from"./detailCard-hyfERk3D.js";const id=.5,Su=1.5,rd=8,sd=400,od=.03,ad=55,ld=82.4,Ol=3,cd=.5,ud=.28,hd=900,fd=.035,dd=.018,pd=24,Ll=6e3,gd=15e3,md=220,zl=[0,2,5,7,9,12,14,17,19,21,24],_d=3,yd=.996,bd=2600,Dl=.05,vd=.1,wd=.6,xd=`
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
`,Sd=`
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
</svg>`;let Il=!1,Ke=null,Xn=!1,Bo=0,Js=null;const Nl=new Map;function Td(r){const t=r.sampleRate,n=Math.floor(rd*t),e=r.createBuffer(1,n,t),i=e.getChannelData(0);let s=0;for(let a=0;a<n;a++){const l=Math.random()*2-1;s=(s+.02*l)/1.02,i[a]=s*3.5}const o=Math.min(Math.floor(t*.1),n>>2);for(let a=0;a<o;a++){const l=a/o;i[n-o+a]=i[n-o+a]*(1-l)+i[a]*l}return e}function kd(r,t){const n=r.sampleRate,e=Math.floor(_d*n),i=r.createBuffer(1,e,n),s=i.getChannelData(0),o=Math.max(2,Math.round(n/t)),a=new Float32Array(o);for(let c=0;c<o;c++)a[c]=Math.random()*2-1;let l=0;for(let c=0;c<e;c++){const u=(l+1)%o;s[c]=a[l],a[l]=yd*.5*(a[l]+a[u]),l=u}return i}function Ed(r){const t=r.createGain();t.gain.value=0,t.connect(r.destination);const n=r.createBufferSource();n.buffer=Td(r),n.loop=!0;const e=r.createBiquadFilter();e.type="lowpass",e.frequency.value=sd;const i=r.createGain();i.gain.value=od,n.connect(e).connect(i).connect(t),n.start();const s=r.createBiquadFilter();s.type="lowpass",s.frequency.value=hd;const o=r.createGain();o.gain.value=fd,s.connect(o).connect(t);const a=r.createOscillator();a.type="sine",a.frequency.value=ad,a.detune.value=-Ol;const l=r.createGain();l.gain.value=cd,a.connect(l).connect(s);const c=r.createOscillator();c.type="triangle",c.frequency.value=ld,c.detune.value=Ol;const u=r.createGain();u.gain.value=ud,c.connect(u).connect(s);const h=r.createOscillator();h.type="sine",h.frequency.value=1/pd;const f=r.createGain();return f.gain.value=dd,h.connect(f).connect(o.gain),a.start(),c.start(),h.start(),{ctx:r,master:t}}function Cd({ctx:r,master:t}){const n=zl[Math.floor(Math.random()*zl.length)],e=md*Math.pow(2,n/12);let i=Nl.get(e);i||(i=kd(r,e),Nl.set(e,i));const s=r.createBufferSource();s.buffer=i;const o=r.createBiquadFilter();o.type="lowpass",o.frequency.value=bd;const a=r.createGain();a.gain.value=Dl+Math.random()*(vd-Dl);const l=r.createStereoPanner();l.pan.value=(Math.random()*2-1)*wd,s.connect(o).connect(a).connect(l).connect(t),s.onended=()=>{s.disconnect(),o.disconnect(),a.disconnect(),l.disconnect()},s.start()}function Fl(r,t){const n=r.context.currentTime,e=r.gain;e.cancelScheduledValues(n),e.setValueAtTime(e.value,n),e.linearRampToValueAtTime(t,n+Su)}function Tu(){Js!==null&&(window.clearTimeout(Js),Js=null)}function ku(){Tu(),Js=window.setTimeout(()=>{Ke&&Xn&&Ke.ctx.state==="running"&&Cd(Ke),ku()},Ll+Math.random()*(gd-Ll))}function Eu(r){r.classList.toggle("is-on",Xn);const t=Xn?"关闭环境音":"开启环境音";r.setAttribute("aria-label",t),r.setAttribute("aria-pressed",String(Xn)),r.title=t}function Cu(){const r=window;return r.AudioContext??r.webkitAudioContext}async function Md(r){if(!Ke){const e=Cu();if(!e)return;Ke=Ed(new e)}Xn=!Xn,Bo++,Eu(r);const{ctx:t,master:n}=Ke;if(Xn)t.state!=="running"&&await t.resume().catch(()=>{}),Fl(n,id),ku();else{Fl(n,0),Tu();const e=Bo;window.setTimeout(()=>{Ke&&!Xn&&e===Bo&&Ke.ctx.state==="running"&&Ke.ctx.suspend()},(Su+.1)*1e3)}}function Pd(){if(Il||typeof document>"u")return;Il=!0;const r=document.createElement("style");r.textContent=xd,document.head.appendChild(r);const t=document.createElement("button");if(t.type="button",t.className="app-ambient-toggle",t.innerHTML=Sd,document.body.appendChild(t),!Cu()){t.disabled=!0,t.setAttribute("aria-label","环境音不可用"),t.title="当前浏览器不支持 Web Audio";return}Eu(t),t.addEventListener("click",()=>{Md(t)}),document.addEventListener("visibilitychange",()=>{Ke&&(document.hidden?Ke.ctx.state==="running"&&Ke.ctx.suspend():Xn&&Ke.ctx.resume())})}function Hn(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function Mu(r,t){r.prototype=Object.create(t.prototype),r.prototype.constructor=r,r.__proto__=t}/*!
 * GSAP 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var sn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},fs={duration:.5,overwrite:!1,delay:0},tl,ge,Dt,mn=1e8,Et=1/mn,da=Math.PI*2,Ad=da/4,Rd=0,Pu=Math.sqrt,Od=Math.cos,Ld=Math.sin,le=function(t){return typeof t=="string"},Wt=function(t){return typeof t=="function"},jn=function(t){return typeof t=="number"},el=function(t){return typeof t>"u"},In=function(t){return typeof t=="object"},Fe=function(t){return t!==!1},nl=function(){return typeof window<"u"},ks=function(t){return Wt(t)||le(t)},Au=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},Te=Array.isArray,zd=/random\([^)]+\)/g,Dd=/,\s*/g,$l=/(?:-?\.?\d|\.)+/gi,Ru=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,ar=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Ho=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Ou=/[+-]=-?[.\d]+/,Id=/[^,'"\[\]\s]+/gi,Nd=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Ht,Pn,pa,il,on={},go={},Lu,zu=function(t){return(go=vr(t,on))&&Ye},rl=function(t,n){return console.warn("Invalid property",t,"set to",n,"Missing plugin? gsap.registerPlugin()")},ds=function(t,n){return!n&&console.warn(t)},Du=function(t,n){return t&&(on[t]=n)&&go&&(go[t]=n)||on},ps=function(){return 0},Fd={suppressEvents:!0,isStart:!0,kill:!1},to={suppressEvents:!0,kill:!1},$d={suppressEvents:!0},sl={},ui=[],ga={},Iu,Qe={},Go={},Bl=30,eo=[],ol="",al=function(t){var n=t[0],e,i;if(In(n)||Wt(n)||(t=[t]),!(e=(n._gsap||{}).harness)){for(i=eo.length;i--&&!eo[i].targetTest(n););e=eo[i]}for(i=t.length;i--;)t[i]&&(t[i]._gsap||(t[i]._gsap=new rh(t[i],e)))||t.splice(i,1);return t},Di=function(t){return t._gsap||al(_n(t))[0]._gsap},Nu=function(t,n,e){return(e=t[n])&&Wt(e)?t[n]():el(e)&&t.getAttribute&&t.getAttribute(n)||e},$e=function(t,n){return(t=t.split(",")).forEach(n)||t},qt=function(t){return Math.round(t*1e5)/1e5||0},Bt=function(t){return Math.round(t*1e7)/1e7||0},hr=function(t,n){var e=n.charAt(0),i=parseFloat(n.substr(2));return t=parseFloat(t),e==="+"?t+i:e==="-"?t-i:e==="*"?t*i:t/i},Bd=function(t,n){for(var e=n.length,i=0;t.indexOf(n[i])<0&&++i<e;);return i<e},mo=function(){var t=ui.length,n=ui.slice(0),e,i;for(ga={},ui.length=0,e=0;e<t;e++)i=n[e],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},ll=function(t){return!!(t._initted||t._startAt||t.add)},Fu=function(t,n,e,i){ui.length&&!ge&&mo(),t.render(n,e,!!(ge&&n<0&&ll(t))),ui.length&&!ge&&mo()},$u=function(t){var n=parseFloat(t);return(n||n===0)&&(t+"").match(Id).length<2?n:le(t)?t.trim():t},Bu=function(t){return t},an=function(t,n){for(var e in n)e in t||(t[e]=n[e]);return t},Hd=function(t){return function(n,e){for(var i in e)i in n||i==="duration"&&t||i==="ease"||(n[i]=e[i])}},vr=function(t,n){for(var e in n)t[e]=n[e];return t},Hl=function r(t,n){for(var e in n)e!=="__proto__"&&e!=="constructor"&&e!=="prototype"&&(t[e]=In(n[e])?r(t[e]||(t[e]={}),n[e]):n[e]);return t},_o=function(t,n){var e={},i;for(i in t)i in n||(e[i]=t[i]);return e},Kr=function(t){var n=t.parent||Ht,e=t.keyframes?Hd(Te(t.keyframes)):an;if(Fe(t.inherit))for(;n;)e(t,n.vars.defaults),n=n.parent||n._dp;return t},Gd=function(t,n){for(var e=t.length,i=e===n.length;i&&e--&&t[e]===n[e];);return e<0},Hu=function(t,n,e,i,s){var o=t[i],a;if(s)for(a=n[s];o&&o[s]>a;)o=o._prev;return o?(n._next=o._next,o._next=n):(n._next=t[e],t[e]=n),n._next?n._next._prev=n:t[i]=n,n._prev=o,n.parent=n._dp=t,n},Lo=function(t,n,e,i){e===void 0&&(e="_first"),i===void 0&&(i="_last");var s=n._prev,o=n._next;s?s._next=o:t[e]===n&&(t[e]=o),o?o._prev=s:t[i]===n&&(t[i]=s),n._next=n._prev=n.parent=null},pi=function(t,n){t.parent&&(!n||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t._act=0},Ii=function(t,n){if(t&&(!n||n._end>t._dur||n._start<0))for(var e=t;e;)e._dirty=1,e=e.parent;return t},Yd=function(t){for(var n=t.parent;n&&n.parent;)n._dirty=1,n.totalDuration(),n=n.parent;return t},ma=function(t,n,e,i){return t._startAt&&(ge?t._startAt.revert(to):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(n,!0,i))},Wd=function r(t){return!t||t._ts&&r(t.parent)},Gl=function(t){return t._repeat?wr(t._tTime,t=t.duration()+t._rDelay)*t:0},wr=function(t,n){var e=Math.floor(t=Bt(t/n));return t&&e===t?e-1:e},yo=function(t,n){return(t-n._start)*n._ts+(n._ts>=0?0:n._dirty?n.totalDuration():n._tDur)},zo=function(t){return t._end=Bt(t._start+(t._tDur/Math.abs(t._ts||t._rts||Et)||0))},Do=function(t,n){var e=t._dp;return e&&e.smoothChildTiming&&t._ts&&(t._start=Bt(e._time-(t._ts>0?n/t._ts:((t._dirty?t.totalDuration():t._tDur)-n)/-t._ts)),zo(t),e._dirty||Ii(e,t)),t},Gu=function(t,n){var e;if((n._time||!n._dur&&n._initted||n._start<t._time&&(n._dur||!n.add))&&(e=yo(t.rawTime(),n),(!n._dur||Ss(0,n.totalDuration(),e)-n._tTime>Et)&&n.render(e,!0)),Ii(t,n)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(e=t;e._dp;)e.rawTime()>=0&&e.totalTime(e._tTime),e=e._dp;t._zTime=-Et}},Rn=function(t,n,e,i){return n.parent&&pi(n),n._start=Bt((jn(e)?e:e||t!==Ht?dn(t,e,n):t._time)+n._delay),n._end=Bt(n._start+(n.totalDuration()/Math.abs(n.timeScale())||0)),Hu(t,n,"_first","_last",t._sort?"_start":0),_a(n)||(t._recent=n),i||Gu(t,n),t._ts<0&&Do(t,t._tTime),t},Yu=function(t,n){return(on.ScrollTrigger||rl("scrollTrigger",n))&&on.ScrollTrigger.create(n,t)},Wu=function(t,n,e,i,s){if(ul(t,n,s),!t._initted)return 1;if(!e&&t._pt&&!ge&&(t._dur&&t.vars.lazy!==!1||!t._dur&&t.vars.lazy)&&Iu!==tn.frame)return ui.push(t),t._lazy=[s,i],1},Xd=function r(t){var n=t.parent;return n&&n._ts&&n._initted&&!n._lock&&(n.rawTime()<0||r(n))},_a=function(t){var n=t.data;return n==="isFromStart"||n==="isStart"},qd=function(t,n,e,i){var s=t.ratio,o=n<0||!n&&(!t._start&&Xd(t)&&!(!t._initted&&_a(t))||(t._ts<0||t._dp._ts<0)&&!_a(t))?0:1,a=t._rDelay,l=0,c,u,h;if(a&&t._repeat&&(l=Ss(0,t._tDur,n),u=wr(l,a),t._yoyo&&u&1&&(o=1-o),u!==wr(t._tTime,a)&&(s=1-o,t.vars.repeatRefresh&&t._initted&&t.invalidate())),o!==s||ge||i||t._zTime===Et||!n&&t._zTime){if(!t._initted&&Wu(t,n,i,e,l))return;for(h=t._zTime,t._zTime=n||(e?Et:0),e||(e=n&&!h),t.ratio=o,t._from&&(o=1-o),t._time=0,t._tTime=l,c=t._pt;c;)c.r(o,c.d),c=c._next;n<0&&ma(t,n,e,!0),t._onUpdate&&!e&&nn(t,"onUpdate"),l&&t._repeat&&!e&&t.parent&&nn(t,"onRepeat"),(n>=t._tDur||n<0)&&t.ratio===o&&(o&&pi(t,1),!e&&!ge&&(nn(t,o?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=n)},Vd=function(t,n,e){var i;if(e>n)for(i=t._first;i&&i._start<=e;){if(i.data==="isPause"&&i._start>n)return i;i=i._next}else for(i=t._last;i&&i._start>=e;){if(i.data==="isPause"&&i._start<n)return i;i=i._prev}},xr=function(t,n,e,i){var s=t._repeat,o=Bt(n)||0,a=t._tTime/t._tDur;return a&&!i&&(t._time*=o/t._dur),t._dur=o,t._tDur=s?s<0?1e10:Bt(o*(s+1)+t._rDelay*s):o,a>0&&!i&&Do(t,t._tTime=t._tDur*a),t.parent&&zo(t),e||Ii(t.parent,t),t},Yl=function(t){return t instanceof Ne?Ii(t):xr(t,t._dur)},Ud={_start:0,endTime:ps,totalDuration:ps},dn=function r(t,n,e){var i=t.labels,s=t._recent||Ud,o=t.duration()>=mn?s.endTime(!1):t._dur,a,l,c;return le(n)&&(isNaN(n)||n in i)?(l=n.charAt(0),c=n.substr(-1)==="%",a=n.indexOf("="),l==="<"||l===">"?(a>=0&&(n=n.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(n.substr(1))||0)*(c?(a<0?s:e).totalDuration()/100:1)):a<0?(n in i||(i[n]=o),i[n]):(l=parseFloat(n.charAt(a-1)+n.substr(a+1)),c&&e&&(l=l/100*(Te(e)?e[0]:e).totalDuration()),a>1?r(t,n.substr(0,a-1),e)+l:o+l)):n==null?o:+n},Zr=function(t,n,e){var i=jn(n[1]),s=(i?2:1)+(t<2?0:1),o=n[s],a,l;if(i&&(o.duration=n[1]),o.parent=e,t){for(a=o,l=e;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=Fe(l.vars.inherit)&&l.parent;o.immediateRender=Fe(a.immediateRender),t<2?o.runBackwards=1:o.startAt=n[s-1]}return new Zt(n[0],o,n[s+1])},yi=function(t,n){return t||t===0?n(t):n},Ss=function(t,n,e){return e<t?t:e>n?n:e},xe=function(t,n){return!le(t)||!(n=Nd.exec(t))?"":n[1]},jd=function(t,n,e){return yi(e,function(i){return Ss(t,n,i)})},ya=[].slice,Xu=function(t,n){return t&&In(t)&&"length"in t&&(!n&&!t.length||t.length-1 in t&&In(t[0]))&&!t.nodeType&&t!==Pn},Qd=function(t,n,e){return e===void 0&&(e=[]),t.forEach(function(i){var s;return le(i)&&!n||Xu(i,1)?(s=e).push.apply(s,_n(i)):e.push(i)})||e},_n=function(t,n,e){return Dt&&!n&&Dt.selector?Dt.selector(t):le(t)&&!e&&(pa||!Sr())?ya.call((n||il).querySelectorAll(t),0):Te(t)?Qd(t,e):Xu(t)?ya.call(t,0):t?[t]:[]},ba=function(t){return t=_n(t)[0]||ds("Invalid scope")||{},function(n){var e=t.current||t.nativeElement||t;return _n(n,e.querySelectorAll?e:e===t?ds("Invalid scope")||il.createElement("div"):t)}},qu=function(t){return t.sort(function(){return .5-Math.random()})},Vu=function(t){if(Wt(t))return t;var n=In(t)?t:{each:t},e=Ni(n.ease),i=n.from||0,s=parseFloat(n.base)||0,o={},a=i>0&&i<1,l=isNaN(i)||a,c=n.axis,u=i,h=i;return le(i)?u=h={center:.5,edges:.5,end:1}[i]||0:!a&&l&&(u=i[0],h=i[1]),function(f,d,p){var g=(p||n).length,m=o[g],v,_,w,x,S,k,T,A,C;if(!m){if(C=n.grid==="auto"?0:(n.grid||[1,mn])[1],!C){for(T=-mn;T<(T=p[C++].getBoundingClientRect().left)&&C<g;);C<g&&C--}for(m=o[g]=[],v=l?Math.min(C,g)*u-.5:i%C,_=C===mn?0:l?g*h/C-.5:i/C|0,T=0,A=mn,k=0;k<g;k++)w=k%C-v,x=_-(k/C|0),m[k]=S=c?Math.abs(c==="y"?x:w):Pu(w*w+x*x),S>T&&(T=S),S<A&&(A=S);i==="random"&&qu(m),m.max=T-A,m.min=A,m.v=g=(parseFloat(n.amount)||parseFloat(n.each)*(C>g?g-1:c?c==="y"?g/C:C:Math.max(C,g/C))||0)*(i==="edges"?-1:1),m.b=g<0?s-g:s,m.u=xe(n.amount||n.each)||0,e=e&&g<0?cp(e):e}return g=(m[f]-m.min)/m.max||0,Bt(m.b+(e?e(g):g)*m.v)+m.u}},va=function(t){var n=Math.pow(10,((t+"").split(".")[1]||"").length);return function(e){var i=Bt(Math.round(parseFloat(e)/t)*t*n);return(i-i%1)/n+(jn(e)?0:xe(e))}},Uu=function(t,n){var e=Te(t),i,s;return!e&&In(t)&&(i=e=t.radius||mn,t.values?(t=_n(t.values),(s=!jn(t[0]))&&(i*=i)):t=va(t.increment)),yi(n,e?Wt(t)?function(o){return s=t(o),Math.abs(s-o)<=i?s:o}:function(o){for(var a=parseFloat(s?o.x:o),l=parseFloat(s?o.y:0),c=mn,u=0,h=t.length,f,d;h--;)s?(f=t[h].x-a,d=t[h].y-l,f=f*f+d*d):f=Math.abs(t[h]-a),f<c&&(c=f,u=h);return u=!i||c<=i?t[u]:o,s||u===o||jn(o)?u:u+xe(o)}:va(t))},ju=function(t,n,e,i){return yi(Te(t)?!n:e===!0?!!(e=0):!i,function(){return Te(t)?t[~~(Math.random()*t.length)]:(e=e||1e-5)&&(i=e<1?Math.pow(10,(e+"").length-2):1)&&Math.floor(Math.round((t-e/2+Math.random()*(n-t+e*.99))/e)*e*i)/i})},Kd=function(){for(var t=arguments.length,n=new Array(t),e=0;e<t;e++)n[e]=arguments[e];return function(i){return n.reduce(function(s,o){return o(s)},i)}},Zd=function(t,n){return function(e){return t(parseFloat(e))+(n||xe(e))}},Jd=function(t,n,e){return Ku(t,n,0,1,e)},Qu=function(t,n,e){return yi(e,function(i){return t[~~n(i)]})},tp=function r(t,n,e){var i=n-t;return Te(t)?Qu(t,r(0,t.length),n):yi(e,function(s){return(i+(s-t)%i)%i+t})},ep=function r(t,n,e){var i=n-t,s=i*2;return Te(t)?Qu(t,r(0,t.length-1),n):yi(e,function(o){return o=(s+(o-t)%s)%s||0,t+(o>i?s-o:o)})},gs=function(t){return t.replace(zd,function(n){var e=n.indexOf("[")+1,i=n.substring(e||7,e?n.indexOf("]"):n.length-1).split(Dd);return ju(e?i:+i[0],e?0:+i[1],+i[2]||1e-5)})},Ku=function(t,n,e,i,s){var o=n-t,a=i-e;return yi(s,function(l){return e+((l-t)/o*a||0)})},np=function r(t,n,e,i){var s=isNaN(t+n)?0:function(d){return(1-d)*t+d*n};if(!s){var o=le(t),a={},l,c,u,h,f;if(e===!0&&(i=1)&&(e=null),o)t={p:t},n={p:n};else if(Te(t)&&!Te(n)){for(u=[],h=t.length,f=h-2,c=1;c<h;c++)u.push(r(t[c-1],t[c]));h--,s=function(p){p*=h;var g=Math.min(f,~~p);return u[g](p-g)},e=n}else i||(t=vr(Te(t)?[]:{},t));if(!u){for(l in n)cl.call(a,t,l,"get",n[l]);s=function(p){return dl(p,a)||(o?t.p:t)}}}return yi(e,s)},Wl=function(t,n,e){var i=t.labels,s=mn,o,a,l;for(o in i)a=i[o]-n,a<0==!!e&&a&&s>(a=Math.abs(a))&&(l=o,s=a);return l},nn=function(t,n,e){var i=t.vars,s=i[n],o=Dt,a=t._ctx,l,c,u;if(s)return l=i[n+"Params"],c=i.callbackScope||t,e&&ui.length&&mo(),a&&(Dt=a),u=l?s.apply(c,l):s.call(c),Dt=o,u},Gr=function(t){return pi(t),t.scrollTrigger&&t.scrollTrigger.kill(!!ge),t.progress()<1&&nn(t,"onInterrupt"),t},lr,Zu=[],Ju=function(t){if(t)if(t=!t.name&&t.default||t,nl()||t.headless){var n=t.name,e=Wt(t),i=n&&!e&&t.init?function(){this._props=[]}:t,s={init:ps,render:dl,add:cl,kill:bp,modifier:yp,rawVars:0},o={targetTest:0,get:0,getSetter:fl,aliases:{},register:0};if(Sr(),t!==i){if(Qe[n])return;an(i,an(_o(t,s),o)),vr(i.prototype,vr(s,_o(t,o))),Qe[i.prop=n]=i,t.targetTest&&(eo.push(i),sl[n]=1),n=(n==="css"?"CSS":n.charAt(0).toUpperCase()+n.substr(1))+"Plugin"}Du(n,i),t.register&&t.register(Ye,i,Be)}else Zu.push(t)},kt=255,Yr={aqua:[0,kt,kt],lime:[0,kt,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,kt],navy:[0,0,128],white:[kt,kt,kt],olive:[128,128,0],yellow:[kt,kt,0],orange:[kt,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[kt,0,0],pink:[kt,192,203],cyan:[0,kt,kt],transparent:[kt,kt,kt,0]},Yo=function(t,n,e){return t+=t<0?1:t>1?-1:0,(t*6<1?n+(e-n)*t*6:t<.5?e:t*3<2?n+(e-n)*(2/3-t)*6:n)*kt+.5|0},th=function(t,n,e){var i=t?jn(t)?[t>>16,t>>8&kt,t&kt]:0:Yr.black,s,o,a,l,c,u,h,f,d,p;if(!i){if(t.substr(-1)===","&&(t=t.substr(0,t.length-1)),Yr[t])i=Yr[t];else if(t.charAt(0)==="#"){if(t.length<6&&(s=t.charAt(1),o=t.charAt(2),a=t.charAt(3),t="#"+s+s+o+o+a+a+(t.length===5?t.charAt(4)+t.charAt(4):"")),t.length===9)return i=parseInt(t.substr(1,6),16),[i>>16,i>>8&kt,i&kt,parseInt(t.substr(7),16)/255];t=parseInt(t.substr(1),16),i=[t>>16,t>>8&kt,t&kt]}else if(t.substr(0,3)==="hsl"){if(i=p=t.match($l),!n)l=+i[0]%360/360,c=+i[1]/100,u=+i[2]/100,o=u<=.5?u*(c+1):u+c-u*c,s=u*2-o,i.length>3&&(i[3]*=1),i[0]=Yo(l+1/3,s,o),i[1]=Yo(l,s,o),i[2]=Yo(l-1/3,s,o);else if(~t.indexOf("="))return i=t.match(Ru),e&&i.length<4&&(i[3]=1),i}else i=t.match($l)||Yr.transparent;i=i.map(Number)}return n&&!p&&(s=i[0]/kt,o=i[1]/kt,a=i[2]/kt,h=Math.max(s,o,a),f=Math.min(s,o,a),u=(h+f)/2,h===f?l=c=0:(d=h-f,c=u>.5?d/(2-h-f):d/(h+f),l=h===s?(o-a)/d+(o<a?6:0):h===o?(a-s)/d+2:(s-o)/d+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(u*100+.5)),e&&i.length<4&&(i[3]=1),i},eh=function(t){var n=[],e=[],i=-1;return t.split(hi).forEach(function(s){var o=s.match(ar)||[];n.push.apply(n,o),e.push(i+=o.length+1)}),n.c=e,n},Xl=function(t,n,e){var i="",s=(t+i).match(hi),o=n?"hsla(":"rgba(",a=0,l,c,u,h;if(!s)return t;if(s=s.map(function(f){return(f=th(f,n,1))&&o+(n?f[0]+","+f[1]+"%,"+f[2]+"%,"+f[3]:f.join(","))+")"}),e&&(u=eh(t),l=e.c,l.join(i)!==u.c.join(i)))for(c=t.replace(hi,"1").split(ar),h=c.length-1;a<h;a++)i+=c[a]+(~l.indexOf(a)?s.shift()||o+"0,0,0,0)":(u.length?u:s.length?s:e).shift());if(!c)for(c=t.split(hi),h=c.length-1;a<h;a++)i+=c[a]+s[a];return i+c[h]},hi=function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",t;for(t in Yr)r+="|"+t+"\\b";return new RegExp(r+")","gi")}(),ip=/hsl[a]?\(/,nh=function(t){var n=t.join(" "),e;if(hi.lastIndex=0,hi.test(n))return e=ip.test(n),t[1]=Xl(t[1],e),t[0]=Xl(t[0],e,eh(t[1])),!0},ms,tn=function(){var r=Date.now,t=500,n=33,e=r(),i=e,s=1e3/240,o=s,a=[],l,c,u,h,f,d,p=function g(m){var v=r()-i,_=m===!0,w,x,S,k;if((v>t||v<0)&&(e+=v-n),i+=v,S=i-e,w=S-o,(w>0||_)&&(k=++h.frame,f=S-h.time*1e3,h.time=S=S/1e3,o+=w+(w>=s?4:s-w),x=1),_||(l=c(g)),x)for(d=0;d<a.length;d++)a[d](S,f,k,m)};return h={time:0,frame:0,tick:function(){p(!0)},deltaRatio:function(m){return f/(1e3/(m||60))},wake:function(){Lu&&(!pa&&nl()&&(Pn=pa=window,il=Pn.document||{},on.gsap=Ye,(Pn.gsapVersions||(Pn.gsapVersions=[])).push(Ye.version),zu(go||Pn.GreenSockGlobals||!Pn.gsap&&Pn||{}),Zu.forEach(Ju)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&h.sleep(),c=u||function(m){return setTimeout(m,o-h.time*1e3+1|0)},ms=1,p(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),ms=0,c=ps},lagSmoothing:function(m,v){t=m||1/0,n=Math.min(v||33,t)},fps:function(m){s=1e3/(m||240),o=h.time*1e3+s},add:function(m,v,_){var w=v?function(x,S,k,T){m(x,S,k,T),h.remove(w)}:m;return h.remove(m),a[_?"unshift":"push"](w),Sr(),w},remove:function(m,v){~(v=a.indexOf(m))&&a.splice(v,1)&&d>=v&&d--},_listeners:a},h}(),Sr=function(){return!ms&&tn.wake()},dt={},rp=/^[\d.\-M][\d.\-,\s]/,sp=/["']/g,op=function(t){for(var n={},e=t.substr(1,t.length-3).split(":"),i=e[0],s=1,o=e.length,a,l,c;s<o;s++)l=e[s],a=s!==o-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),n[i]=isNaN(c)?c.replace(sp,"").trim():+c,i=l.substr(a+1).trim();return n},ap=function(t){var n=t.indexOf("(")+1,e=t.indexOf(")"),i=t.indexOf("(",n);return t.substring(n,~i&&i<e?t.indexOf(")",e+1):e)},lp=function(t){var n=(t+"").split("("),e=dt[n[0]];return e&&n.length>1&&e.config?e.config.apply(null,~t.indexOf("{")?[op(n[1])]:ap(t).split(",").map($u)):dt._CE&&rp.test(t)?dt._CE("",t):e},cp=function(t){return function(n){return 1-t(1-n)}},Ni=function(t,n){return t&&(Wt(t)?t:dt[t]||lp(t))||n},ji=function(t,n,e,i){e===void 0&&(e=function(l){return 1-n(1-l)}),i===void 0&&(i=function(l){return l<.5?n(l*2)/2:1-n((1-l)*2)/2});var s={easeIn:n,easeOut:e,easeInOut:i},o;return $e(t,function(a){dt[a]=on[a]=s,dt[o=a.toLowerCase()]=e;for(var l in s)dt[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=dt[a+"."+l]=s[l]}),s},ih=function(t){return function(n){return n<.5?(1-t(1-n*2))/2:.5+t((n-.5)*2)/2}},Wo=function r(t,n,e){var i=n>=1?n:1,s=(e||(t?.3:.45))/(n<1?n:1),o=s/da*(Math.asin(1/i)||0),a=function(u){return u===1?1:i*Math.pow(2,-10*u)*Ld((u-o)*s)+1},l=t==="out"?a:t==="in"?function(c){return 1-a(1-c)}:ih(a);return s=da/s,l.config=function(c,u){return r(t,c,u)},l},Xo=function r(t,n){n===void 0&&(n=1.70158);var e=function(o){return o?--o*o*((n+1)*o+n)+1:0},i=t==="out"?e:t==="in"?function(s){return 1-e(1-s)}:ih(e);return i.config=function(s){return r(t,s)},i};$e("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,t){var n=t<5?t+1:t;ji(r+",Power"+(n-1),t?function(e){return Math.pow(e,n)}:function(e){return e},function(e){return 1-Math.pow(1-e,n)},function(e){return e<.5?Math.pow(e*2,n)/2:1-Math.pow((1-e)*2,n)/2})});dt.Linear.easeNone=dt.none=dt.Linear.easeIn;ji("Elastic",Wo("in"),Wo("out"),Wo());(function(r,t){var n=1/t,e=2*n,i=2.5*n,s=function(a){return a<n?r*a*a:a<e?r*Math.pow(a-1.5/t,2)+.75:a<i?r*(a-=2.25/t)*a+.9375:r*Math.pow(a-2.625/t,2)+.984375};ji("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);ji("Expo",function(r){return Math.pow(2,10*(r-1))*r+r*r*r*r*r*r*(1-r)});ji("Circ",function(r){return-(Pu(1-r*r)-1)});ji("Sine",function(r){return r===1?1:-Od(r*Ad)+1});ji("Back",Xo("in"),Xo("out"),Xo());dt.SteppedEase=dt.steps=on.SteppedEase={config:function(t,n){t===void 0&&(t=1);var e=1/t,i=t+(n?0:1),s=n?1:0,o=1-Et;return function(a){return((i*Ss(0,o,a)|0)+s)*e}}};fs.ease=dt["quad.out"];$e("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return ol+=r+","+r+"Params,"});var rh=function(t,n){this.id=Rd++,t._gsap=this,this.target=t,this.harness=n,this.get=n?n.get:Nu,this.set=n?n.getSetter:fl},_s=function(){function r(n){this.vars=n,this._delay=+n.delay||0,(this._repeat=n.repeat===1/0?-2:n.repeat||0)&&(this._rDelay=n.repeatDelay||0,this._yoyo=!!n.yoyo||!!n.yoyoEase),this._ts=1,xr(this,+n.duration,1,1),this.data=n.data,Dt&&(this._ctx=Dt,Dt.data.push(this)),ms||tn.wake()}var t=r.prototype;return t.delay=function(e){return e||e===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+e-this._delay),this._delay=e,this):this._delay},t.duration=function(e){return arguments.length?this.totalDuration(this._repeat>0?e+(e+this._rDelay)*this._repeat:e):this.totalDuration()&&this._dur},t.totalDuration=function(e){return arguments.length?(this._dirty=0,xr(this,this._repeat<0?e:(e-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(e,i){if(Sr(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(Do(this,e),!s._dp||s.parent||Gu(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&e<this._tDur||this._ts<0&&e>0||!this._tDur&&!e)&&Rn(this._dp,this,this._start-this._delay)}return(this._tTime!==e||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===Et||!this._initted&&this._dur&&e||!e&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=e),Fu(this,e,i)),this},t.time=function(e,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),e+Gl(this))%(this._dur+this._rDelay)||(e?this._dur:0),i):this._time},t.totalProgress=function(e,i){return arguments.length?this.totalTime(this.totalDuration()*e,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(e,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-e:e)+Gl(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},t.iteration=function(e,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(e-1)*s,i):this._repeat?wr(this._tTime,s)+1:1},t.timeScale=function(e,i){if(!arguments.length)return this._rts===-Et?0:this._rts;if(this._rts===e)return this;var s=this.parent&&this._ts?yo(this.parent._time,this):this._tTime;return this._rts=+e||0,this._ts=this._ps||e===-Et?0:this._rts,this.totalTime(Ss(-Math.abs(this._delay),this.totalDuration(),s),i!==!1),zo(this),Yd(this)},t.paused=function(e){return arguments.length?(this._ps!==e&&(this._ps=e,e?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Sr(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==Et&&(this._tTime-=Et)))),this):this._ps},t.startTime=function(e){if(arguments.length){this._start=Bt(e);var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&Rn(i,this,this._start-this._delay),this}return this._start},t.endTime=function(e){return this._start+(Fe(e)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(e){var i=this.parent||this._dp;return i?e&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?yo(i.rawTime(e),this):this._tTime:this._tTime},t.revert=function(e){e===void 0&&(e=$d);var i=ge;return ge=e,ll(this)&&(this.timeline&&this.timeline.revert(e),this.totalTime(-.01,e.suppressEvents)),this.data!=="nested"&&e.kill!==!1&&this.kill(),ge=i,this},t.globalTime=function(e){for(var i=this,s=arguments.length?e:i.rawTime();i;)s=i._start+s/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(e):s},t.repeat=function(e){return arguments.length?(this._repeat=e===1/0?-2:e,Yl(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(e){if(arguments.length){var i=this._time;return this._rDelay=e,Yl(this),i?this.time(i):this}return this._rDelay},t.yoyo=function(e){return arguments.length?(this._yoyo=e,this):this._yoyo},t.seek=function(e,i){return this.totalTime(dn(this,e),Fe(i))},t.restart=function(e,i){return this.play().totalTime(e?-this._delay:0,Fe(i)),this._dur||(this._zTime=-Et),this},t.play=function(e,i){return e!=null&&this.seek(e,i),this.reversed(!1).paused(!1)},t.reverse=function(e,i){return e!=null&&this.seek(e||this.totalDuration(),i),this.reversed(!0).paused(!1)},t.pause=function(e,i){return e!=null&&this.seek(e,i),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(e){return arguments.length?(!!e!==this.reversed()&&this.timeScale(-this._rts||(e?-Et:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-Et,this},t.isActive=function(){var e=this.parent||this._dp,i=this._start,s;return!!(!e||this._ts&&this._initted&&e.isActive()&&(s=e.rawTime(!0))>=i&&s<this.endTime(!0)-Et)},t.eventCallback=function(e,i,s){var o=this.vars;return arguments.length>1?(i?(o[e]=i,s&&(o[e+"Params"]=s),e==="onUpdate"&&(this._onUpdate=i)):delete o[e],this):o[e]},t.then=function(e){var i=this,s=i._prom;return new Promise(function(o){var a=Wt(e)?e:Bu,l=function(){var u=i.then;i.then=null,s&&s(),Wt(a)&&(a=a(i))&&(a.then||a===i)&&(i.then=u),o(a),i.then=u};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?l():i._prom=l})},t.kill=function(){Gr(this)},r}();an(_s.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-Et,_prom:0,_ps:!1,_rts:1});var Ne=function(r){Mu(t,r);function t(e,i){var s;return e===void 0&&(e={}),s=r.call(this,e)||this,s.labels={},s.smoothChildTiming=!!e.smoothChildTiming,s.autoRemoveChildren=!!e.autoRemoveChildren,s._sort=Fe(e.sortChildren),Ht&&Rn(e.parent||Ht,Hn(s),i),e.reversed&&s.reverse(),e.paused&&s.paused(!0),e.scrollTrigger&&Yu(Hn(s),e.scrollTrigger),s}var n=t.prototype;return n.to=function(i,s,o){return Zr(0,arguments,this),this},n.from=function(i,s,o){return Zr(1,arguments,this),this},n.fromTo=function(i,s,o,a){return Zr(2,arguments,this),this},n.set=function(i,s,o){return s.duration=0,s.parent=this,Kr(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new Zt(i,s,dn(this,o),1),this},n.call=function(i,s,o){return Rn(this,Zt.delayedCall(0,i,s),o)},n.staggerTo=function(i,s,o,a,l,c,u){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=c,o.onCompleteParams=u,o.parent=this,new Zt(i,o,dn(this,l)),this},n.staggerFrom=function(i,s,o,a,l,c,u){return o.runBackwards=1,Kr(o).immediateRender=Fe(o.immediateRender),this.staggerTo(i,s,o,a,l,c,u)},n.staggerFromTo=function(i,s,o,a,l,c,u,h){return a.startAt=o,Kr(a).immediateRender=Fe(a.immediateRender),this.staggerTo(i,s,a,l,c,u,h)},n.render=function(i,s,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=i<=0?0:Bt(i),h=this._zTime<0!=i<0&&(this._initted||!c),f,d,p,g,m,v,_,w,x,S,k,T;if(this!==Ht&&u>l&&i>=0&&(u=l),u!==this._tTime||o||h){if(a!==this._time&&c&&(u+=this._time-a,i+=this._time-a),f=u,x=this._start,w=this._ts,v=!w,h&&(c||(a=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(k=this._yoyo,m=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(m*100+i,s,o);if(f=Bt(u%m),u===l?(g=this._repeat,f=c):(S=Bt(u/m),g=~~S,g&&g===S&&(f=c,g--),f>c&&(f=c)),S=wr(this._tTime,m),!a&&this._tTime&&S!==g&&this._tTime-S*m-this._dur<=0&&(S=g),k&&g&1&&(f=c-f,T=1),g!==S&&!this._lock){var A=k&&S&1,C=A===(k&&g&1);if(g<S&&(A=!A),a=A?0:u%c?c:u,this._lock=1,this.render(a||(T?0:Bt(g*m)),s,!c)._lock=0,this._tTime=u,!s&&this.parent&&nn(this,"onRepeat"),this.vars.repeatRefresh&&!T&&(this.invalidate()._lock=1,S=g),a&&a!==this._time||v!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,C&&(this._lock=2,a=A?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!T&&this.invalidate()),this._lock=0,!this._ts&&!v)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(_=Vd(this,Bt(a),Bt(f)),_&&(u-=f-(f=_._start))),this._tTime=u,this._time=f,this._act=!!w,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,a=0),!a&&u&&c&&!s&&!S&&(nn(this,"onStart"),this._tTime!==u))return this;if(f>=a&&i>=0)for(d=this._first;d;){if(p=d._next,(d._act||f>=d._start)&&d._ts&&_!==d){if(d.parent!==this)return this.render(i,s,o);if(d.render(d._ts>0?(f-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(f-d._start)*d._ts,s,o),f!==this._time||!this._ts&&!v){_=0,p&&(u+=this._zTime=-Et);break}}d=p}else{d=this._last;for(var P=i<0?i:f;d;){if(p=d._prev,(d._act||P<=d._end)&&d._ts&&_!==d){if(d.parent!==this)return this.render(i,s,o);if(d.render(d._ts>0?(P-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(P-d._start)*d._ts,s,o||ge&&ll(d)),f!==this._time||!this._ts&&!v){_=0,p&&(u+=this._zTime=P?-Et:Et);break}}d=p}}if(_&&!s&&(this.pause(),_.render(f>=a?0:-Et)._zTime=f>=a?1:-1,this._ts))return this._start=x,zo(this),this.render(i,s,o);this._onUpdate&&!s&&nn(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&a)&&(x===this._start||Math.abs(w)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&pi(this,1),!s&&!(i<0&&!a)&&(u||a||!l)&&(nn(this,u===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},n.add=function(i,s){var o=this;if(jn(s)||(s=dn(this,s,i)),!(i instanceof _s)){if(Te(i))return i.forEach(function(a){return o.add(a,s)}),this;if(le(i))return this.addLabel(i,s);if(Wt(i))i=Zt.delayedCall(0,i);else return this}return this!==i?Rn(this,i,s):this},n.getChildren=function(i,s,o,a){i===void 0&&(i=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-mn);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof Zt?s&&l.push(c):(o&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,s,o)))),c=c._next;return l},n.getById=function(i){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===i)return s[o]},n.remove=function(i){return le(i)?this.removeLabel(i):Wt(i)?this.killTweensOf(i):(i.parent===this&&Lo(this,i),i===this._recent&&(this._recent=this._last),Ii(this))},n.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Bt(tn.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},n.addLabel=function(i,s){return this.labels[i]=dn(this,s),this},n.removeLabel=function(i){return delete this.labels[i],this},n.addPause=function(i,s,o){var a=Zt.delayedCall(0,s||ps,o);return a.data="isPause",this._hasPause=1,Rn(this,a,dn(this,i))},n.removePause=function(i){var s=this._first;for(i=dn(this,i);s;)s._start===i&&s.data==="isPause"&&pi(s),s=s._next},n.killTweensOf=function(i,s,o){for(var a=this.getTweensOf(i,o),l=a.length;l--;)ii!==a[l]&&a[l].kill(i,s);return this},n.getTweensOf=function(i,s){for(var o=[],a=_n(i),l=this._first,c=jn(s),u;l;)l instanceof Zt?Bd(l._targets,a)&&(c?(!ii||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&o.push(l):(u=l.getTweensOf(a,s)).length&&o.push.apply(o,u),l=l._next;return o},n.tweenTo=function(i,s){s=s||{};var o=this,a=dn(o,i),l=s,c=l.startAt,u=l.onStart,h=l.onStartParams,f=l.immediateRender,d,p=Zt.to(o,an({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale())||Et,onStart:function(){if(o.pause(),!d){var m=s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale());p._dur!==m&&xr(p,m,0,1).render(p._time,!0,!0),d=1}u&&u.apply(p,h||[])}},s));return f?p.render(0):p},n.tweenFromTo=function(i,s,o){return this.tweenTo(s,an({startAt:{time:dn(this,i)}},o))},n.recent=function(){return this._recent},n.nextLabel=function(i){return i===void 0&&(i=this._time),Wl(this,dn(this,i))},n.previousLabel=function(i){return i===void 0&&(i=this._time),Wl(this,dn(this,i),1)},n.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+Et)},n.shiftChildren=function(i,s,o){o===void 0&&(o=0);var a=this._first,l=this.labels,c;for(i=Bt(i);a;)a._start>=o&&(a._start+=i,a._end+=i),a=a._next;if(s)for(c in l)l[c]>=o&&(l[c]+=i);return Ii(this)},n.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return r.prototype.invalidate.call(this,i)},n.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),Ii(this)},n.totalDuration=function(i){var s=0,o=this,a=o._last,l=mn,c,u,h;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-i:i));if(o._dirty){for(h=o.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),u=a._start,u>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,Rn(o,a,u-a._delay,1)._lock=0):l=u,u<0&&a._ts&&(s-=u,(!h&&!o._dp||h&&h.smoothChildTiming)&&(o._start+=Bt(u/o._ts),o._time-=u,o._tTime-=u),o.shiftChildren(-u,!1,-1/0),l=0),a._end>s&&a._ts&&(s=a._end),a=c;xr(o,o===Ht&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},t.updateRoot=function(i){if(Ht._ts&&(Fu(Ht,yo(i,Ht)),Iu=tn.frame),tn.frame>=Bl){Bl+=sn.autoSleep||120;var s=Ht._first;if((!s||!s._ts)&&sn.autoSleep&&tn._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||tn.sleep()}}},t}(_s);an(Ne.prototype,{_lock:0,_hasPause:0,_forcing:0});var up=function(t,n,e,i,s,o,a){var l=new Be(this._pt,t,n,0,1,uh,null,s),c=0,u=0,h,f,d,p,g,m,v,_;for(l.b=e,l.e=i,e+="",i+="",(v=~i.indexOf("random("))&&(i=gs(i)),o&&(_=[e,i],o(_,t,n),e=_[0],i=_[1]),f=e.match(Ho)||[];h=Ho.exec(i);)p=h[0],g=i.substring(c,h.index),d?d=(d+1)%5:g.substr(-5)==="rgba("&&(d=1),p!==f[u++]&&(m=parseFloat(f[u-1])||0,l._pt={_next:l._pt,p:g||u===1?g:",",s:m,c:p.charAt(1)==="="?hr(m,p)-m:parseFloat(p)-m,m:d&&d<4?Math.round:0},c=Ho.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=a,(Ou.test(i)||v)&&(l.e=0),this._pt=l,l},cl=function(t,n,e,i,s,o,a,l,c,u){Wt(i)&&(i=i(s||0,t,o));var h=t[n],f=e!=="get"?e:Wt(h)?c?t[n.indexOf("set")||!Wt(t["get"+n.substr(3)])?n:"get"+n.substr(3)](c):t[n]():h,d=Wt(h)?c?gp:lh:hl,p;if(le(i)&&(~i.indexOf("random(")&&(i=gs(i)),i.charAt(1)==="="&&(p=hr(f,i)+(xe(f)||0),(p||p===0)&&(i=p))),!u||f!==i||wa)return!isNaN(f*i)&&i!==""?(p=new Be(this._pt,t,n,+f||0,i-(f||0),typeof h=="boolean"?_p:ch,0,d),c&&(p.fp=c),a&&p.modifier(a,this,t),this._pt=p):(!h&&!(n in t)&&rl(n,i),up.call(this,t,n,f,i,d,l||sn.stringFilter,c))},hp=function(t,n,e,i,s){if(Wt(t)&&(t=Jr(t,s,n,e,i)),!In(t)||t.style&&t.nodeType||Te(t)||Au(t))return le(t)?Jr(t,s,n,e,i):t;var o={},a;for(a in t)o[a]=Jr(t[a],s,n,e,i);return o},sh=function(t,n,e,i,s,o){var a,l,c,u;if(Qe[t]&&(a=new Qe[t]).init(s,a.rawVars?n[t]:hp(n[t],i,s,o,e),e,i,o)!==!1&&(e._pt=l=new Be(e._pt,s,t,0,1,a.render,a,0,a.priority),e!==lr))for(c=e._ptLookup[e._targets.indexOf(s)],u=a._props.length;u--;)c[a._props[u]]=l;return a},ii,wa,ul=function r(t,n,e){var i=t.vars,s=i.ease,o=i.startAt,a=i.immediateRender,l=i.lazy,c=i.onUpdate,u=i.runBackwards,h=i.yoyoEase,f=i.keyframes,d=i.autoRevert,p=t._dur,g=t._startAt,m=t._targets,v=t.parent,_=v&&v.data==="nested"?v.vars.targets:m,w=t._overwrite==="auto"&&!tl,x=t.timeline,S=i.easeReverse||h,k,T,A,C,P,B,y,I,F,G,N,$,O;if(x&&(!f||!s)&&(s="none"),t._ease=Ni(s,fs.ease),t._rEase=S&&(Ni(S)||t._ease),t._from=!x&&!!i.runBackwards,t._from&&(t.ratio=1),!x||f&&!i.stagger){if(I=m[0]?Di(m[0]).harness:0,$=I&&i[I.prop],k=_o(i,sl),g&&(g._zTime<0&&g.progress(1),n<0&&u&&a&&!d?g.render(-1,!0):g.revert(u&&p?to:Fd),g._lazy=0),o){if(pi(t._startAt=Zt.set(m,an({data:"isStart",overwrite:!1,parent:v,immediateRender:!0,lazy:!g&&Fe(l),startAt:null,delay:0,onUpdate:c&&function(){return nn(t,"onUpdate")},stagger:0},o))),t._startAt._dp=0,t._startAt._sat=t,n<0&&(ge||!a&&!d)&&t._startAt.revert(to),a&&p&&n<=0&&e<=0){n&&(t._zTime=n);return}}else if(u&&p&&!g){if(n&&(a=!1),A=an({overwrite:!1,data:"isFromStart",lazy:a&&!g&&Fe(l),immediateRender:a,stagger:0,parent:v},k),$&&(A[I.prop]=$),pi(t._startAt=Zt.set(m,A)),t._startAt._dp=0,t._startAt._sat=t,n<0&&(ge?t._startAt.revert(to):t._startAt.render(-1,!0)),t._zTime=n,!a)r(t._startAt,Et,Et);else if(!n)return}for(t._pt=t._ptCache=0,l=p&&Fe(l)||l&&!p,T=0;T<m.length;T++){if(P=m[T],y=P._gsap||al(m)[T]._gsap,t._ptLookup[T]=G={},ga[y.id]&&ui.length&&mo(),N=_===m?T:_.indexOf(P),I&&(F=new I).init(P,$||k,t,N,_)!==!1&&(t._pt=C=new Be(t._pt,P,F.name,0,1,F.render,F,0,F.priority),F._props.forEach(function(z){G[z]=C}),F.priority&&(B=1)),!I||$)for(A in k)Qe[A]&&(F=sh(A,k,t,N,P,_))?F.priority&&(B=1):G[A]=C=cl.call(t,P,A,"get",k[A],N,_,0,i.stringFilter);t._op&&t._op[T]&&t.kill(P,t._op[T]),w&&t._pt&&(ii=t,Ht.killTweensOf(P,G,t.globalTime(n)),O=!t.parent,ii=0),t._pt&&l&&(ga[y.id]=1)}B&&hh(t),t._onInit&&t._onInit(t)}t._onUpdate=c,t._initted=(!t._op||t._pt)&&!O,f&&n<=0&&x.render(mn,!0,!0)},fp=function(t,n,e,i,s,o,a,l){var c=(t._pt&&t._ptCache||(t._ptCache={}))[n],u,h,f,d;if(!c)for(c=t._ptCache[n]=[],f=t._ptLookup,d=t._targets.length;d--;){if(u=f[d][n],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==n&&u.fp!==n;)u=u._next;if(!u)return wa=1,t.vars[n]="+=0",ul(t,a),wa=0,l?ds(n+" not eligible for reset. Try splitting into individual properties"):1;c.push(u)}for(d=c.length;d--;)h=c[d],u=h._pt||h,u.s=(i||i===0)&&!s?i:u.s+(i||0)+o*u.c,u.c=e-u.s,h.e&&(h.e=qt(e)+xe(h.e)),h.b&&(h.b=u.s+xe(h.b))},dp=function(t,n){var e=t[0]?Di(t[0]).harness:0,i=e&&e.aliases,s,o,a,l;if(!i)return n;s=vr({},n);for(o in i)if(o in s)for(l=i[o].split(","),a=l.length;a--;)s[l[a]]=s[o];return s},pp=function(t,n,e,i){var s=n.ease||i||"power1.inOut",o,a;if(Te(n))a=e[t]||(e[t]=[]),n.forEach(function(l,c){return a.push({t:c/(n.length-1)*100,v:l,e:s})});else for(o in n)a=e[o]||(e[o]=[]),o==="ease"||a.push({t:parseFloat(t),v:n[o],e:s})},Jr=function(t,n,e,i,s){return Wt(t)?t.call(n,e,i,s):le(t)&&~t.indexOf("random(")?gs(t):t},oh=ol+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",ah={};$e(oh+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return ah[r]=1});var Zt=function(r){Mu(t,r);function t(e,i,s,o){var a;typeof i=="number"&&(s.duration=i,i=s,s=null),a=r.call(this,o?i:Kr(i))||this;var l=a.vars,c=l.duration,u=l.delay,h=l.immediateRender,f=l.stagger,d=l.overwrite,p=l.keyframes,g=l.defaults,m=l.scrollTrigger,v=i.parent||Ht,_=(Te(e)||Au(e)?jn(e[0]):"length"in i)?[e]:_n(e),w,x,S,k,T,A,C,P;if(a._targets=_.length?al(_):ds("GSAP target "+e+" not found. https://gsap.com",!sn.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=d,p||f||ks(c)||ks(u)){i=a.vars;var B=i.easeReverse||i.yoyoEase;if(w=a.timeline=new Ne({data:"nested",defaults:g||{},targets:v&&v.data==="nested"?v.vars.targets:_}),w.kill(),w.parent=w._dp=Hn(a),w._start=0,f||ks(c)||ks(u)){if(k=_.length,C=f&&Vu(f),In(f))for(T in f)~oh.indexOf(T)&&(P||(P={}),P[T]=f[T]);for(x=0;x<k;x++)S=_o(i,ah),S.stagger=0,B&&(S.easeReverse=B),P&&vr(S,P),A=_[x],S.duration=+Jr(c,Hn(a),x,A,_),S.delay=(+Jr(u,Hn(a),x,A,_)||0)-a._delay,!f&&k===1&&S.delay&&(a._delay=u=S.delay,a._start+=u,S.delay=0),w.to(A,S,C?C(x,A,_):0),w._ease=dt.none;w.duration()?c=u=0:a.timeline=0}else if(p){Kr(an(w.vars.defaults,{ease:"none"})),w._ease=Ni(p.ease||i.ease||"none");var y=0,I,F,G;if(Te(p))p.forEach(function(N){return w.to(_,N,">")}),w.duration();else{S={};for(T in p)T==="ease"||T==="easeEach"||pp(T,p[T],S,p.easeEach);for(T in S)for(I=S[T].sort(function(N,$){return N.t-$.t}),y=0,x=0;x<I.length;x++)F=I[x],G={ease:F.e,duration:(F.t-(x?I[x-1].t:0))/100*c},G[T]=F.v,w.to(_,G,y),y+=G.duration;w.duration()<c&&w.to({},{duration:c-w.duration()})}}c||a.duration(c=w.duration())}else a.timeline=0;return d===!0&&!tl&&(ii=Hn(a),Ht.killTweensOf(_),ii=0),Rn(v,Hn(a),s),i.reversed&&a.reverse(),i.paused&&a.paused(!0),(h||!c&&!p&&a._start===Bt(v._time)&&Fe(h)&&Wd(Hn(a))&&v.data!=="nested")&&(a._tTime=-Et,a.render(Math.max(0,-u)||0)),m&&Yu(Hn(a),m),a}var n=t.prototype;return n.render=function(i,s,o){var a=this._time,l=this._tDur,c=this._dur,u=i<0,h=i>l-Et&&!u?l:i<Et?0:i,f,d,p,g,m,v,_,w;if(!c)qd(this,i,s,o);else if(h!==this._tTime||!i||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(f=h,w=this.timeline,this._repeat){if(g=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(g*100+i,s,o);if(f=Bt(h%g),h===l?(p=this._repeat,f=c):(m=Bt(h/g),p=~~m,p&&p===m?(f=c,p--):f>c&&(f=c)),v=this._yoyo&&p&1,v&&(f=c-f),m=wr(this._tTime,g),f===a&&!o&&this._initted&&p===m)return this._tTime=h,this;p!==m&&this.vars.repeatRefresh&&!v&&!this._lock&&f!==g&&this._initted&&(this._lock=o=1,this.render(Bt(g*p),!0).invalidate()._lock=0)}if(!this._initted){if(Wu(this,u?i:f,o,s,h))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&p!==m))return this;if(c!==this._dur)return this.render(i,s,o)}if(this._rEase){var x=f<a;if(x!==this._inv){var S=x?a:c-a;this._inv=x,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=a,this._invRecip=S?(x?-1:1)/S:0,this._invScale=x?-this.ratio:1-this.ratio,this._invEase=x?this._rEase:this._ease}this.ratio=_=this._invRatio+this._invScale*this._invEase((f-this._invTime)*this._invRecip)}else this.ratio=_=this._ease(f/c);if(this._from&&(this.ratio=_=1-_),this._tTime=h,this._time=f,!this._act&&this._ts&&(this._act=1,this._lazy=0),!a&&h&&!s&&!m&&(nn(this,"onStart"),this._tTime!==h))return this;for(d=this._pt;d;)d.r(_,d.d),d=d._next;w&&w.render(i<0?i:w._dur*w._ease(f/this._dur),s,o)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(u&&ma(this,i,s,o),nn(this,"onUpdate")),this._repeat&&p!==m&&this.vars.onRepeat&&!s&&this.parent&&nn(this,"onRepeat"),(h===this._tDur||!h)&&this._tTime===h&&(u&&!this._onUpdate&&ma(this,i,!0,!0),(i||!c)&&(h===this._tDur&&this._ts>0||!h&&this._ts<0)&&pi(this,1),!s&&!(u&&!a)&&(h||a||v)&&(nn(this,h===l?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom()))}return this},n.targets=function(){return this._targets},n.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},n.resetTo=function(i,s,o,a,l){ms||tn.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||ul(this,c),u=this._ease(c/this._dur),fp(this,i,s,o,a,u,c,l)?this.resetTo(i,s,o,a,1):(Do(this,0),this.parent||Hu(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},n.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?Gr(this):this.scrollTrigger&&this.scrollTrigger.kill(!!ge),this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,ii&&ii.vars.overwrite!==!0)._first||Gr(this),this.parent&&o!==this.timeline.totalDuration()&&xr(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=i?_n(i):a,c=this._ptLookup,u=this._pt,h,f,d,p,g,m,v;if((!s||s==="all")&&Gd(a,l))return s==="all"&&(this._pt=0),Gr(this);for(h=this._op=this._op||[],s!=="all"&&(le(s)&&(g={},$e(s,function(_){return g[_]=1}),s=g),s=dp(a,s)),v=a.length;v--;)if(~l.indexOf(a[v])){f=c[v],s==="all"?(h[v]=s,p=f,d={}):(d=h[v]=h[v]||{},p=s);for(g in p)m=f&&f[g],m&&((!("kill"in m.d)||m.d.kill(g)===!0)&&Lo(this,m,"_pt"),delete f[g]),d!=="all"&&(d[g]=1)}return this._initted&&!this._pt&&u&&Gr(this),this},t.to=function(i,s){return new t(i,s,arguments[2])},t.from=function(i,s){return Zr(1,arguments)},t.delayedCall=function(i,s,o,a){return new t(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},t.fromTo=function(i,s,o){return Zr(2,arguments)},t.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new t(i,s)},t.killTweensOf=function(i,s,o){return Ht.killTweensOf(i,s,o)},t}(_s);an(Zt.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});$e("staggerTo,staggerFrom,staggerFromTo",function(r){Zt[r]=function(){var t=new Ne,n=ya.call(arguments,0);return n.splice(r==="staggerFromTo"?5:4,0,0),t[r].apply(t,n)}});var hl=function(t,n,e){return t[n]=e},lh=function(t,n,e){return t[n](e)},gp=function(t,n,e,i){return t[n](i.fp,e)},mp=function(t,n,e){return t.setAttribute(n,e)},fl=function(t,n){return Wt(t[n])?lh:el(t[n])&&t.setAttribute?mp:hl},ch=function(t,n){return n.set(n.t,n.p,Math.round((n.s+n.c*t)*1e6)/1e6,n)},_p=function(t,n){return n.set(n.t,n.p,!!(n.s+n.c*t),n)},uh=function(t,n){var e=n._pt,i="";if(!t&&n.b)i=n.b;else if(t===1&&n.e)i=n.e;else{for(;e;)i=e.p+(e.m?e.m(e.s+e.c*t):Math.round((e.s+e.c*t)*1e4)/1e4)+i,e=e._next;i+=n.c}n.set(n.t,n.p,i,n)},dl=function(t,n){for(var e=n._pt;e;)e.r(t,e.d),e=e._next},yp=function(t,n,e,i){for(var s=this._pt,o;s;)o=s._next,s.p===i&&s.modifier(t,n,e),s=o},bp=function(t){for(var n=this._pt,e,i;n;)i=n._next,n.p===t&&!n.op||n.op===t?Lo(this,n,"_pt"):n.dep||(e=1),n=i;return!e},vp=function(t,n,e,i){i.mSet(t,n,i.m.call(i.tween,e,i.mt),i)},hh=function(t){for(var n=t._pt,e,i,s,o;n;){for(e=n._next,i=s;i&&i.pr>n.pr;)i=i._next;(n._prev=i?i._prev:o)?n._prev._next=n:s=n,(n._next=i)?i._prev=n:o=n,n=e}t._pt=s},Be=function(){function r(n,e,i,s,o,a,l,c,u){this.t=e,this.s=s,this.c=o,this.p=i,this.r=a||ch,this.d=l||this,this.set=c||hl,this.pr=u||0,this._next=n,n&&(n._prev=this)}var t=r.prototype;return t.modifier=function(e,i,s){this.mSet=this.mSet||this.set,this.set=vp,this.m=e,this.mt=s,this.tween=i},r}();$e(ol+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(r){return sl[r]=1});on.TweenMax=on.TweenLite=Zt;on.TimelineLite=on.TimelineMax=Ne;Ht=new Ne({sortChildren:!1,defaults:fs,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});sn.stringFilter=nh;var Fi=[],no={},wp=[],ql=0,xp=0,qo=function(t){return(no[t]||wp).map(function(n){return n()})},xa=function(){var t=Date.now(),n=[];t-ql>2&&(qo("matchMediaInit"),Fi.forEach(function(e){var i=e.queries,s=e.conditions,o,a,l,c;for(a in i)o=Pn.matchMedia(i[a]).matches,o&&(l=1),o!==s[a]&&(s[a]=o,c=1);c&&(e.revert(),l&&n.push(e))}),qo("matchMediaRevert"),n.forEach(function(e){return e.onMatch(e,function(i){return e.add(null,i)})}),ql=t,qo("matchMedia"))},fh=function(){function r(n,e){this.selector=e&&ba(e),this.data=[],this._r=[],this.isReverted=!1,this.id=xp++,n&&this.add(n)}var t=r.prototype;return t.add=function(e,i,s){Wt(e)&&(s=i,i=e,e=Wt);var o=this,a=function(){var c=Dt,u=o.selector,h;return c&&c!==o&&c.data.push(o),s&&(o.selector=ba(s)),Dt=o,h=i.apply(o,arguments),Wt(h)&&o._r.push(h),Dt=c,o.selector=u,o.isReverted=!1,h};return o.last=a,e===Wt?a(o,function(l){return o.add(null,l)}):e?o[e]=a:a},t.ignore=function(e){var i=Dt;Dt=null,e(this),Dt=i},t.getTweens=function(){var e=[];return this.data.forEach(function(i){return i instanceof r?e.push.apply(e,i.getTweens()):i instanceof Zt&&!(i.parent&&i.parent.data==="nested")&&e.push(i)}),e},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(e,i){var s=this;if(e?function(){for(var a=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return a.splice(a.indexOf(u),1)}));for(a.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,h){return h.g-u.g||-1/0}).forEach(function(u){return u.t.revert(e)}),l=s.data.length;l--;)c=s.data[l],c instanceof Ne?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof Zt)&&c.revert&&c.revert(e);s._r.forEach(function(u){return u(e,s)}),s.isReverted=!0}():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),i)for(var o=Fi.length;o--;)Fi[o].id===this.id&&Fi.splice(o,1)},t.revert=function(e){this.kill(e||{})},r}(),Sp=function(){function r(n){this.contexts=[],this.scope=n,Dt&&Dt.data.push(this)}var t=r.prototype;return t.add=function(e,i,s){In(e)||(e={matches:e});var o=new fh(0,s||this.scope),a=o.conditions={},l,c,u;Dt&&!o.selector&&(o.selector=Dt.selector),this.contexts.push(o),i=o.add("onMatch",i),o.queries=e;for(c in e)c==="all"?u=1:(l=Pn.matchMedia(e[c]),l&&(Fi.indexOf(o)<0&&Fi.push(o),(a[c]=l.matches)&&(u=1),l.addListener?l.addListener(xa):l.addEventListener("change",xa)));return u&&i(o,function(h){return o.add(null,h)}),this},t.revert=function(e){this.kill(e||{})},t.kill=function(e){this.contexts.forEach(function(i){return i.kill(e,!0)})},r}(),bo={registerPlugin:function(){for(var t=arguments.length,n=new Array(t),e=0;e<t;e++)n[e]=arguments[e];n.forEach(function(i){return Ju(i)})},timeline:function(t){return new Ne(t)},getTweensOf:function(t,n){return Ht.getTweensOf(t,n)},getProperty:function(t,n,e,i){le(t)&&(t=_n(t)[0]);var s=Di(t||{}).get,o=e?Bu:$u;return e==="native"&&(e=""),t&&(n?o((Qe[n]&&Qe[n].get||s)(t,n,e,i)):function(a,l,c){return o((Qe[a]&&Qe[a].get||s)(t,a,l,c))})},quickSetter:function(t,n,e){if(t=_n(t),t.length>1){var i=t.map(function(u){return Ye.quickSetter(u,n,e)}),s=i.length;return function(u){for(var h=s;h--;)i[h](u)}}t=t[0]||{};var o=Qe[n],a=Di(t),l=a.harness&&(a.harness.aliases||{})[n]||n,c=o?function(u){var h=new o;lr._pt=0,h.init(t,e?u+e:u,lr,0,[t]),h.render(1,h),lr._pt&&dl(1,lr)}:a.set(t,l);return o?c:function(u){return c(t,l,e?u+e:u,a,1)}},quickTo:function(t,n,e){var i,s=Ye.to(t,an((i={},i[n]="+=0.1",i.paused=!0,i.stagger=0,i),e||{})),o=function(l,c,u){return s.resetTo(n,l,c,u)};return o.tween=s,o},isTweening:function(t){return Ht.getTweensOf(t,!0).length>0},defaults:function(t){return t&&t.ease&&(t.ease=Ni(t.ease,fs.ease)),Hl(fs,t||{})},config:function(t){return Hl(sn,t||{})},registerEffect:function(t){var n=t.name,e=t.effect,i=t.plugins,s=t.defaults,o=t.extendTimeline;(i||"").split(",").forEach(function(a){return a&&!Qe[a]&&!on[a]&&ds(n+" effect requires "+a+" plugin.")}),Go[n]=function(a,l,c){return e(_n(a),an(l||{},s),c)},o&&(Ne.prototype[n]=function(a,l,c){return this.add(Go[n](a,In(l)?l:(c=l)&&{},this),c)})},registerEase:function(t,n){dt[t]=Ni(n)},parseEase:function(t,n){return arguments.length?Ni(t,n):dt},getById:function(t){return Ht.getById(t)},exportRoot:function(t,n){t===void 0&&(t={});var e=new Ne(t),i,s;for(e.smoothChildTiming=Fe(t.smoothChildTiming),Ht.remove(e),e._dp=0,e._time=e._tTime=Ht._time,i=Ht._first;i;)s=i._next,(n||!(!i._dur&&i instanceof Zt&&i.vars.onComplete===i._targets[0]))&&Rn(e,i,i._start-i._delay),i=s;return Rn(Ht,e,0),e},context:function(t,n){return t?new fh(t,n):Dt},matchMedia:function(t){return new Sp(t)},matchMediaRefresh:function(){return Fi.forEach(function(t){var n=t.conditions,e,i;for(i in n)n[i]&&(n[i]=!1,e=1);e&&t.revert()})||xa()},addEventListener:function(t,n){var e=no[t]||(no[t]=[]);~e.indexOf(n)||e.push(n)},removeEventListener:function(t,n){var e=no[t],i=e&&e.indexOf(n);i>=0&&e.splice(i,1)},utils:{wrap:tp,wrapYoyo:ep,distribute:Vu,random:ju,snap:Uu,normalize:Jd,getUnit:xe,clamp:jd,splitColor:th,toArray:_n,selector:ba,mapRange:Ku,pipe:Kd,unitize:Zd,interpolate:np,shuffle:qu},install:zu,effects:Go,ticker:tn,updateRoot:Ne.updateRoot,plugins:Qe,globalTimeline:Ht,core:{PropTween:Be,globals:Du,Tween:Zt,Timeline:Ne,Animation:_s,getCache:Di,_removeLinkedListItem:Lo,reverting:function(){return ge},context:function(t){return t&&Dt&&(Dt.data.push(t),t._ctx=Dt),Dt},suppressOverwrites:function(t){return tl=t}}};$e("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return bo[r]=Zt[r]});tn.add(Ne.updateRoot);lr=bo.to({},{duration:0});var Tp=function(t,n){for(var e=t._pt;e&&e.p!==n&&e.op!==n&&e.fp!==n;)e=e._next;return e},kp=function(t,n){var e=t._targets,i,s,o;for(i in n)for(s=e.length;s--;)o=t._ptLookup[s][i],o&&(o=o.d)&&(o._pt&&(o=Tp(o,i)),o&&o.modifier&&o.modifier(n[i],t,e[s],i))},Vo=function(t,n){return{name:t,headless:1,rawVars:1,init:function(i,s,o){o._onInit=function(a){var l,c;if(le(s)&&(l={},$e(s,function(u){return l[u]=1}),s=l),n){l={};for(c in s)l[c]=n(s[c]);s=l}kp(a,s)}}}},Ye=bo.registerPlugin({name:"attr",init:function(t,n,e,i,s){var o,a,l;this.tween=e;for(o in n)l=t.getAttribute(o)||"",a=this.add(t,"setAttribute",(l||0)+"",n[o],i,s,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(t,n){for(var e=n._pt;e;)ge?e.set(e.t,e.p,e.b,e):e.r(t,e.d),e=e._next}},{name:"endArray",headless:1,init:function(t,n){for(var e=n.length;e--;)this.add(t,e,t[e]||0,n[e],0,0,0,0,0,1)}},Vo("roundProps",va),Vo("modifiers"),Vo("snap",Uu))||bo;Zt.version=Ne.version=Ye.version="3.15.0";Lu=1;nl()&&Sr();dt.Power0;dt.Power1;dt.Power2;dt.Power3;dt.Power4;dt.Linear;dt.Quad;dt.Cubic;dt.Quart;dt.Quint;dt.Strong;dt.Elastic;dt.Back;dt.SteppedEase;dt.Bounce;dt.Sine;dt.Expo;dt.Circ;/*!
 * CSSPlugin 3.15.0
 * https://gsap.com
 *
 * Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Vl,ri,fr,pl,Ri,Ul,gl,Ep=function(){return typeof window<"u"},Qn={},Ci=180/Math.PI,dr=Math.PI/180,Zi=Math.atan2,jl=1e8,ml=/([A-Z])/g,Cp=/(left|right|width|margin|padding|x)/i,Mp=/[\s,\(]\S/,On={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Sa=function(t,n){return n.set(n.t,n.p,Math.round((n.s+n.c*t)*1e4)/1e4+n.u,n)},Pp=function(t,n){return n.set(n.t,n.p,t===1?n.e:Math.round((n.s+n.c*t)*1e4)/1e4+n.u,n)},Ap=function(t,n){return n.set(n.t,n.p,t?Math.round((n.s+n.c*t)*1e4)/1e4+n.u:n.b,n)},Rp=function(t,n){return n.set(n.t,n.p,t===1?n.e:t?Math.round((n.s+n.c*t)*1e4)/1e4+n.u:n.b,n)},Op=function(t,n){var e=n.s+n.c*t;n.set(n.t,n.p,~~(e+(e<0?-.5:.5))+n.u,n)},dh=function(t,n){return n.set(n.t,n.p,t?n.e:n.b,n)},ph=function(t,n){return n.set(n.t,n.p,t!==1?n.b:n.e,n)},Lp=function(t,n,e){return t.style[n]=e},zp=function(t,n,e){return t.style.setProperty(n,e)},Dp=function(t,n,e){return t._gsap[n]=e},Ip=function(t,n,e){return t._gsap.scaleX=t._gsap.scaleY=e},Np=function(t,n,e,i,s){var o=t._gsap;o.scaleX=o.scaleY=e,o.renderTransform(s,o)},Fp=function(t,n,e,i,s){var o=t._gsap;o[n]=e,o.renderTransform(s,o)},Gt="transform",He=Gt+"Origin",$p=function r(t,n){var e=this,i=this.target,s=i.style,o=i._gsap;if(t in Qn&&s){if(this.tfm=this.tfm||{},t!=="transform")t=On[t]||t,~t.indexOf(",")?t.split(",").forEach(function(a){return e.tfm[a]=Gn(i,a)}):this.tfm[t]=o.x?o[t]:Gn(i,t),t===He&&(this.tfm.zOrigin=o.zOrigin);else return On.transform.split(",").forEach(function(a){return r.call(e,a,n)});if(this.props.indexOf(Gt)>=0)return;o.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(He,n,"")),t=Gt}(s||n)&&this.props.push(t,n,s[t])},gh=function(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))},Bp=function(){var t=this.props,n=this.target,e=n.style,i=n._gsap,s,o;for(s=0;s<t.length;s+=3)t[s+1]?t[s+1]===2?n[t[s]](t[s+2]):n[t[s]]=t[s+2]:t[s+2]?e[t[s]]=t[s+2]:e.removeProperty(t[s].substr(0,2)==="--"?t[s]:t[s].replace(ml,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)i[o]=this.tfm[o];i.svg&&(i.renderTransform(),n.setAttribute("data-svg-origin",this.svgo||"")),s=gl(),(!s||!s.isStart)&&!e[Gt]&&(gh(e),i.zOrigin&&e[He]&&(e[He]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},mh=function(t,n){var e={target:t,props:[],revert:Bp,save:$p};return t._gsap||Ye.core.getCache(t),n&&t.style&&t.nodeType&&n.split(",").forEach(function(i){return e.save(i)}),e},_h,Ta=function(t,n){var e=ri.createElementNS?ri.createElementNS((n||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):ri.createElement(t);return e&&e.style?e:ri.createElement(t)},rn=function r(t,n,e){var i=getComputedStyle(t);return i[n]||i.getPropertyValue(n.replace(ml,"-$1").toLowerCase())||i.getPropertyValue(n)||!e&&r(t,Tr(n)||n,1)||""},Ql="O,Moz,ms,Ms,Webkit".split(","),Tr=function(t,n,e){var i=n||Ri,s=i.style,o=5;if(t in s&&!e)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);o--&&!(Ql[o]+t in s););return o<0?null:(o===3?"ms":o>=0?Ql[o]:"")+t},ka=function(){Ep()&&window.document&&(Vl=window,ri=Vl.document,fr=ri.documentElement,Ri=Ta("div")||{style:{}},Ta("div"),Gt=Tr(Gt),He=Gt+"Origin",Ri.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",_h=!!Tr("perspective"),gl=Ye.core.reverting,pl=1)},Kl=function(t){var n=t.ownerSVGElement,e=Ta("svg",n&&n.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=t.cloneNode(!0),s;i.style.display="block",e.appendChild(i),fr.appendChild(e);try{s=i.getBBox()}catch{}return e.removeChild(i),fr.removeChild(e),s},Zl=function(t,n){for(var e=n.length;e--;)if(t.hasAttribute(n[e]))return t.getAttribute(n[e])},yh=function(t){var n,e;try{n=t.getBBox()}catch{n=Kl(t),e=1}return n&&(n.width||n.height)||e||(n=Kl(t)),n&&!n.width&&!n.x&&!n.y?{x:+Zl(t,["x","cx","x1"])||0,y:+Zl(t,["y","cy","y1"])||0,width:0,height:0}:n},bh=function(t){return!!(t.getCTM&&(!t.parentNode||t.ownerSVGElement)&&yh(t))},gi=function(t,n){if(n){var e=t.style,i;n in Qn&&n!==He&&(n=Gt),e.removeProperty?(i=n.substr(0,2),(i==="ms"||n.substr(0,6)==="webkit")&&(n="-"+n),e.removeProperty(i==="--"?n:n.replace(ml,"-$1").toLowerCase())):e.removeAttribute(n)}},si=function(t,n,e,i,s,o){var a=new Be(t._pt,n,e,0,1,o?ph:dh);return t._pt=a,a.b=i,a.e=s,t._props.push(e),a},Jl={deg:1,rad:1,turn:1},Hp={grid:1,flex:1},mi=function r(t,n,e,i){var s=parseFloat(e)||0,o=(e+"").trim().substr((s+"").length)||"px",a=Ri.style,l=Cp.test(n),c=t.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),h=100,f=i==="px",d=i==="%",p,g,m,v;if(i===o||!s||Jl[i]||Jl[o])return s;if(o!=="px"&&!f&&(s=r(t,n,e,"px")),v=t.getCTM&&bh(t),(d||o==="%")&&(Qn[n]||~n.indexOf("adius")))return p=v?t.getBBox()[l?"width":"height"]:t[u],qt(d?s/p*h:s/100*p);if(a[l?"width":"height"]=h+(f?o:i),g=i!=="rem"&&~n.indexOf("adius")||i==="em"&&t.appendChild&&!c?t:t.parentNode,v&&(g=(t.ownerSVGElement||{}).parentNode),(!g||g===ri||!g.appendChild)&&(g=ri.body),m=g._gsap,m&&d&&m.width&&l&&m.time===tn.time&&!m.uncache)return qt(s/m.width*h);if(d&&(n==="height"||n==="width")){var _=t.style[n];t.style[n]=h+i,p=t[u],_?t.style[n]=_:gi(t,n)}else(d||o==="%")&&!Hp[rn(g,"display")]&&(a.position=rn(t,"position")),g===t&&(a.position="static"),g.appendChild(Ri),p=Ri[u],g.removeChild(Ri),a.position="absolute";return l&&d&&(m=Di(g),m.time=tn.time,m.width=g[u]),qt(f?p*s/h:p&&s?h/p*s:0)},Gn=function(t,n,e,i){var s;return pl||ka(),n in On&&n!=="transform"&&(n=On[n],~n.indexOf(",")&&(n=n.split(",")[0])),Qn[n]&&n!=="transform"?(s=bs(t,i),s=n!=="transformOrigin"?s[n]:s.svg?s.origin:wo(rn(t,He))+" "+s.zOrigin+"px"):(s=t.style[n],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=vo[n]&&vo[n](t,n,e)||rn(t,n)||Nu(t,n)||(n==="opacity"?1:0))),e&&!~(s+"").trim().indexOf(" ")?mi(t,n,s,e)+e:s},Gp=function(t,n,e,i){if(!e||e==="none"){var s=Tr(n,t,1),o=s&&rn(t,s,1);o&&o!==e?(n=s,e=o):n==="borderColor"&&(e=rn(t,"borderTopColor"))}var a=new Be(this._pt,t.style,n,0,1,uh),l=0,c=0,u,h,f,d,p,g,m,v,_,w,x,S;if(a.b=e,a.e=i,e+="",i+="",i.substring(0,6)==="var(--"&&(i=rn(t,i.substring(4,i.indexOf(")")))),i==="auto"&&(g=t.style[n],t.style[n]=i,i=rn(t,n)||i,g?t.style[n]=g:gi(t,n)),u=[e,i],nh(u),e=u[0],i=u[1],f=e.match(ar)||[],S=i.match(ar)||[],S.length){for(;h=ar.exec(i);)m=h[0],_=i.substring(l,h.index),p?p=(p+1)%5:(_.substr(-5)==="rgba("||_.substr(-5)==="hsla(")&&(p=1),m!==(g=f[c++]||"")&&(d=parseFloat(g)||0,x=g.substr((d+"").length),m.charAt(1)==="="&&(m=hr(d,m)+x),v=parseFloat(m),w=m.substr((v+"").length),l=ar.lastIndex-w.length,w||(w=w||sn.units[n]||x,l===i.length&&(i+=w,a.e+=w)),x!==w&&(d=mi(t,n,g,w)||0),a._pt={_next:a._pt,p:_||c===1?_:",",s:d,c:v-d,m:p&&p<4||n==="zIndex"?Math.round:0});a.c=l<i.length?i.substring(l,i.length):""}else a.r=n==="display"&&i==="none"?ph:dh;return Ou.test(i)&&(a.e=0),this._pt=a,a},tc={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},Yp=function(t){var n=t.split(" "),e=n[0],i=n[1]||"50%";return(e==="top"||e==="bottom"||i==="left"||i==="right")&&(t=e,e=i,i=t),n[0]=tc[e]||e,n[1]=tc[i]||i,n.join(" ")},Wp=function(t,n){if(n.tween&&n.tween._time===n.tween._dur){var e=n.t,i=e.style,s=n.u,o=e._gsap,a,l,c;if(s==="all"||s===!0)i.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)a=s[c],Qn[a]&&(l=1,a=a==="transformOrigin"?He:Gt),gi(e,a);l&&(gi(e,Gt),o&&(o.svg&&e.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",bs(e,1),o.uncache=1,gh(i)))}},vo={clearProps:function(t,n,e,i,s){if(s.data!=="isFromStart"){var o=t._pt=new Be(t._pt,n,e,0,0,Wp);return o.u=i,o.pr=-10,o.tween=s,t._props.push(e),1}}},ys=[1,0,0,1,0,0],vh={},wh=function(t){return t==="matrix(1, 0, 0, 1, 0, 0)"||t==="none"||!t},ec=function(t){var n=rn(t,Gt);return wh(n)?ys:n.substr(7).match(Ru).map(qt)},_l=function(t,n){var e=t._gsap||Di(t),i=t.style,s=ec(t),o,a,l,c;return e.svg&&t.getAttribute("transform")?(l=t.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?ys:s):(s===ys&&!t.offsetParent&&t!==fr&&!e.svg&&(l=i.display,i.display="block",o=t.parentNode,(!o||!t.offsetParent&&!t.getBoundingClientRect().width)&&(c=1,a=t.nextElementSibling,fr.appendChild(t)),s=ec(t),l?i.display=l:gi(t,"display"),c&&(a?o.insertBefore(t,a):o?o.appendChild(t):fr.removeChild(t))),n&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},Ea=function(t,n,e,i,s,o){var a=t._gsap,l=s||_l(t,!0),c=a.xOrigin||0,u=a.yOrigin||0,h=a.xOffset||0,f=a.yOffset||0,d=l[0],p=l[1],g=l[2],m=l[3],v=l[4],_=l[5],w=n.split(" "),x=parseFloat(w[0])||0,S=parseFloat(w[1])||0,k,T,A,C;e?l!==ys&&(T=d*m-p*g)&&(A=x*(m/T)+S*(-g/T)+(g*_-m*v)/T,C=x*(-p/T)+S*(d/T)-(d*_-p*v)/T,x=A,S=C):(k=yh(t),x=k.x+(~w[0].indexOf("%")?x/100*k.width:x),S=k.y+(~(w[1]||w[0]).indexOf("%")?S/100*k.height:S)),i||i!==!1&&a.smooth?(v=x-c,_=S-u,a.xOffset=h+(v*d+_*g)-v,a.yOffset=f+(v*p+_*m)-_):a.xOffset=a.yOffset=0,a.xOrigin=x,a.yOrigin=S,a.smooth=!!i,a.origin=n,a.originIsAbsolute=!!e,t.style[He]="0px 0px",o&&(si(o,a,"xOrigin",c,x),si(o,a,"yOrigin",u,S),si(o,a,"xOffset",h,a.xOffset),si(o,a,"yOffset",f,a.yOffset)),t.setAttribute("data-svg-origin",x+" "+S)},bs=function(t,n){var e=t._gsap||new rh(t);if("x"in e&&!n&&!e.uncache)return e;var i=t.style,s=e.scaleX<0,o="px",a="deg",l=getComputedStyle(t),c=rn(t,He)||"0",u,h,f,d,p,g,m,v,_,w,x,S,k,T,A,C,P,B,y,I,F,G,N,$,O,z,b,Y,U,D,W,V;return u=h=f=g=m=v=_=w=x=0,d=p=1,e.svg=!!(t.getCTM&&bh(t)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[Gt]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[Gt]!=="none"?l[Gt]:"")),i.scale=i.rotate=i.translate="none"),T=_l(t,e.svg),e.svg&&(e.uncache?(O=t.getBBox(),c=e.xOrigin-O.x+"px "+(e.yOrigin-O.y)+"px",$=""):$=!n&&t.getAttribute("data-svg-origin"),Ea(t,$||c,!!$||e.originIsAbsolute,e.smooth!==!1,T)),S=e.xOrigin||0,k=e.yOrigin||0,T!==ys&&(B=T[0],y=T[1],I=T[2],F=T[3],u=G=T[4],h=N=T[5],T.length===6?(d=Math.sqrt(B*B+y*y),p=Math.sqrt(F*F+I*I),g=B||y?Zi(y,B)*Ci:0,_=I||F?Zi(I,F)*Ci+g:0,_&&(p*=Math.abs(Math.cos(_*dr))),e.svg&&(u-=S-(S*B+k*I),h-=k-(S*y+k*F))):(V=T[6],D=T[7],b=T[8],Y=T[9],U=T[10],W=T[11],u=T[12],h=T[13],f=T[14],A=Zi(V,U),m=A*Ci,A&&(C=Math.cos(-A),P=Math.sin(-A),$=G*C+b*P,O=N*C+Y*P,z=V*C+U*P,b=G*-P+b*C,Y=N*-P+Y*C,U=V*-P+U*C,W=D*-P+W*C,G=$,N=O,V=z),A=Zi(-I,U),v=A*Ci,A&&(C=Math.cos(-A),P=Math.sin(-A),$=B*C-b*P,O=y*C-Y*P,z=I*C-U*P,W=F*P+W*C,B=$,y=O,I=z),A=Zi(y,B),g=A*Ci,A&&(C=Math.cos(A),P=Math.sin(A),$=B*C+y*P,O=G*C+N*P,y=y*C-B*P,N=N*C-G*P,B=$,G=O),m&&Math.abs(m)+Math.abs(g)>359.9&&(m=g=0,v=180-v),d=qt(Math.sqrt(B*B+y*y+I*I)),p=qt(Math.sqrt(N*N+V*V)),A=Zi(G,N),_=Math.abs(A)>2e-4?A*Ci:0,x=W?1/(W<0?-W:W):0),e.svg&&($=t.getAttribute("transform"),e.forceCSS=t.setAttribute("transform","")||!wh(rn(t,Gt)),$&&t.setAttribute("transform",$))),Math.abs(_)>90&&Math.abs(_)<270&&(s?(d*=-1,_+=g<=0?180:-180,g+=g<=0?180:-180):(p*=-1,_+=_<=0?180:-180)),n=n||e.uncache,e.x=u-((e.xPercent=u&&(!n&&e.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-u)?-50:0)))?t.offsetWidth*e.xPercent/100:0)+o,e.y=h-((e.yPercent=h&&(!n&&e.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-h)?-50:0)))?t.offsetHeight*e.yPercent/100:0)+o,e.z=f+o,e.scaleX=qt(d),e.scaleY=qt(p),e.rotation=qt(g)+a,e.rotationX=qt(m)+a,e.rotationY=qt(v)+a,e.skewX=_+a,e.skewY=w+a,e.transformPerspective=x+o,(e.zOrigin=parseFloat(c.split(" ")[2])||!n&&e.zOrigin||0)&&(i[He]=wo(c)),e.xOffset=e.yOffset=0,e.force3D=sn.force3D,e.renderTransform=e.svg?qp:_h?xh:Xp,e.uncache=0,e},wo=function(t){return(t=t.split(" "))[0]+" "+t[1]},Uo=function(t,n,e){var i=xe(n);return qt(parseFloat(n)+parseFloat(mi(t,"x",e+"px",i)))+i},Xp=function(t,n){n.z="0px",n.rotationY=n.rotationX="0deg",n.force3D=0,xh(t,n)},xi="0deg",Pr="0px",Si=") ",xh=function(t,n){var e=n||this,i=e.xPercent,s=e.yPercent,o=e.x,a=e.y,l=e.z,c=e.rotation,u=e.rotationY,h=e.rotationX,f=e.skewX,d=e.skewY,p=e.scaleX,g=e.scaleY,m=e.transformPerspective,v=e.force3D,_=e.target,w=e.zOrigin,x="",S=v==="auto"&&t&&t!==1||v===!0;if(w&&(h!==xi||u!==xi)){var k=parseFloat(u)*dr,T=Math.sin(k),A=Math.cos(k),C;k=parseFloat(h)*dr,C=Math.cos(k),o=Uo(_,o,T*C*-w),a=Uo(_,a,-Math.sin(k)*-w),l=Uo(_,l,A*C*-w+w)}m!==Pr&&(x+="perspective("+m+Si),(i||s)&&(x+="translate("+i+"%, "+s+"%) "),(S||o!==Pr||a!==Pr||l!==Pr)&&(x+=l!==Pr||S?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+Si),c!==xi&&(x+="rotate("+c+Si),u!==xi&&(x+="rotateY("+u+Si),h!==xi&&(x+="rotateX("+h+Si),(f!==xi||d!==xi)&&(x+="skew("+f+", "+d+Si),(p!==1||g!==1)&&(x+="scale("+p+", "+g+Si),_.style[Gt]=x||"translate(0, 0)"},qp=function(t,n){var e=n||this,i=e.xPercent,s=e.yPercent,o=e.x,a=e.y,l=e.rotation,c=e.skewX,u=e.skewY,h=e.scaleX,f=e.scaleY,d=e.target,p=e.xOrigin,g=e.yOrigin,m=e.xOffset,v=e.yOffset,_=e.forceCSS,w=parseFloat(o),x=parseFloat(a),S,k,T,A,C;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=dr,c*=dr,S=Math.cos(l)*h,k=Math.sin(l)*h,T=Math.sin(l-c)*-f,A=Math.cos(l-c)*f,c&&(u*=dr,C=Math.tan(c-u),C=Math.sqrt(1+C*C),T*=C,A*=C,u&&(C=Math.tan(u),C=Math.sqrt(1+C*C),S*=C,k*=C)),S=qt(S),k=qt(k),T=qt(T),A=qt(A)):(S=h,A=f,k=T=0),(w&&!~(o+"").indexOf("px")||x&&!~(a+"").indexOf("px"))&&(w=mi(d,"x",o,"px"),x=mi(d,"y",a,"px")),(p||g||m||v)&&(w=qt(w+p-(p*S+g*T)+m),x=qt(x+g-(p*k+g*A)+v)),(i||s)&&(C=d.getBBox(),w=qt(w+i/100*C.width),x=qt(x+s/100*C.height)),C="matrix("+S+","+k+","+T+","+A+","+w+","+x+")",d.setAttribute("transform",C),_&&(d.style[Gt]=C)},Vp=function(t,n,e,i,s){var o=360,a=le(s),l=parseFloat(s)*(a&&~s.indexOf("rad")?Ci:1),c=l-i,u=i+c+"deg",h,f;return a&&(h=s.split("_")[1],h==="short"&&(c%=o,c!==c%(o/2)&&(c+=c<0?o:-o)),h==="cw"&&c<0?c=(c+o*jl)%o-~~(c/o)*o:h==="ccw"&&c>0&&(c=(c-o*jl)%o-~~(c/o)*o)),t._pt=f=new Be(t._pt,n,e,i,c,Pp),f.e=u,f.u="deg",t._props.push(e),f},nc=function(t,n){for(var e in n)t[e]=n[e];return t},Up=function(t,n,e){var i=nc({},e._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=e.style,a,l,c,u,h,f,d,p;i.svg?(c=e.getAttribute("transform"),e.setAttribute("transform",""),o[Gt]=n,a=bs(e,1),gi(e,Gt),e.setAttribute("transform",c)):(c=getComputedStyle(e)[Gt],o[Gt]=n,a=bs(e,1),o[Gt]=c);for(l in Qn)c=i[l],u=a[l],c!==u&&s.indexOf(l)<0&&(d=xe(c),p=xe(u),h=d!==p?mi(e,l,c,p):parseFloat(c),f=parseFloat(u),t._pt=new Be(t._pt,a,l,h,f-h,Sa),t._pt.u=p||0,t._props.push(l));nc(a,i)};$e("padding,margin,Width,Radius",function(r,t){var n="Top",e="Right",i="Bottom",s="Left",o=(t<3?[n,e,i,s]:[n+s,n+e,i+e,i+s]).map(function(a){return t<2?r+a:"border"+a+r});vo[t>1?"border"+r:r]=function(a,l,c,u,h){var f,d;if(arguments.length<4)return f=o.map(function(p){return Gn(a,p,c)}),d=f.join(" "),d.split(f[0]).length===5?f[0]:d;f=(u+"").split(" "),d={},o.forEach(function(p,g){return d[p]=f[g]=f[g]||f[(g-1)/2|0]}),a.init(l,d,h)}});var Sh={name:"css",register:ka,targetTest:function(t){return t.style&&t.nodeType},init:function(t,n,e,i,s){var o=this._props,a=t.style,l=e.vars.startAt,c,u,h,f,d,p,g,m,v,_,w,x,S,k,T,A,C;pl||ka(),this.styles=this.styles||mh(t),A=this.styles.props,this.tween=e;for(g in n)if(g!=="autoRound"&&(u=n[g],!(Qe[g]&&sh(g,n,e,i,t,s)))){if(d=typeof u,p=vo[g],d==="function"&&(u=u.call(e,i,t,s),d=typeof u),d==="string"&&~u.indexOf("random(")&&(u=gs(u)),p)p(this,t,g,u,e)&&(T=1);else if(g.substr(0,2)==="--")c=(getComputedStyle(t).getPropertyValue(g)+"").trim(),u+="",hi.lastIndex=0,hi.test(c)||(m=xe(c),v=xe(u),v?m!==v&&(c=mi(t,g,c,v)+v):m&&(u+=m)),this.add(a,"setProperty",c,u,i,s,0,0,g),o.push(g),A.push(g,0,a[g]);else if(d!=="undefined"){if(l&&g in l?(c=typeof l[g]=="function"?l[g].call(e,i,t,s):l[g],le(c)&&~c.indexOf("random(")&&(c=gs(c)),xe(c+"")||c==="auto"||(c+=sn.units[g]||xe(Gn(t,g))||""),(c+"").charAt(1)==="="&&(c=Gn(t,g))):c=Gn(t,g),f=parseFloat(c),_=d==="string"&&u.charAt(1)==="="&&u.substr(0,2),_&&(u=u.substr(2)),h=parseFloat(u),g in On&&(g==="autoAlpha"&&(f===1&&Gn(t,"visibility")==="hidden"&&h&&(f=0),A.push("visibility",0,a.visibility),si(this,a,"visibility",f?"inherit":"hidden",h?"inherit":"hidden",!h)),g!=="scale"&&g!=="transform"&&(g=On[g],~g.indexOf(",")&&(g=g.split(",")[0]))),w=g in Qn,w){if(this.styles.save(g),C=u,d==="string"&&u.substring(0,6)==="var(--"){if(u=rn(t,u.substring(4,u.indexOf(")"))),u.substring(0,5)==="calc("){var P=t.style.perspective;t.style.perspective=u,u=rn(t,"perspective"),P?t.style.perspective=P:gi(t,"perspective")}h=parseFloat(u)}if(x||(S=t._gsap,S.renderTransform&&!n.parseTransform||bs(t,n.parseTransform),k=n.smoothOrigin!==!1&&S.smooth,x=this._pt=new Be(this._pt,a,Gt,0,1,S.renderTransform,S,0,-1),x.dep=1),g==="scale")this._pt=new Be(this._pt,S,"scaleY",S.scaleY,(_?hr(S.scaleY,_+h):h)-S.scaleY||0,Sa),this._pt.u=0,o.push("scaleY",g),g+="X";else if(g==="transformOrigin"){A.push(He,0,a[He]),u=Yp(u),S.svg?Ea(t,u,0,k,0,this):(v=parseFloat(u.split(" ")[2])||0,v!==S.zOrigin&&si(this,S,"zOrigin",S.zOrigin,v),si(this,a,g,wo(c),wo(u)));continue}else if(g==="svgOrigin"){Ea(t,u,1,k,0,this);continue}else if(g in vh){Vp(this,S,g,f,_?hr(f,_+u):u);continue}else if(g==="smoothOrigin"){si(this,S,"smooth",S.smooth,u);continue}else if(g==="force3D"){S[g]=u;continue}else if(g==="transform"){Up(this,u,t);continue}}else g in a||(g=Tr(g)||g);if(w||(h||h===0)&&(f||f===0)&&!Mp.test(u)&&g in a)m=(c+"").substr((f+"").length),h||(h=0),v=xe(u)||(g in sn.units?sn.units[g]:m),m!==v&&(f=mi(t,g,c,v)),this._pt=new Be(this._pt,w?S:a,g,f,(_?hr(f,_+h):h)-f,!w&&(v==="px"||g==="zIndex")&&n.autoRound!==!1?Op:Sa),this._pt.u=v||0,w&&C!==u?(this._pt.b=c,this._pt.e=C,this._pt.r=Rp):m!==v&&v!=="%"&&(this._pt.b=c,this._pt.r=Ap);else if(g in a)Gp.call(this,t,g,c,_?_+u:u);else if(g in t)this.add(t,g,c||t[g],_?_+u:u,i,s);else if(g!=="parseTransform"){rl(g,u);continue}w||(g in a?A.push(g,0,a[g]):typeof t[g]=="function"?A.push(g,2,t[g]()):A.push(g,1,c||t[g])),o.push(g)}}T&&hh(this)},render:function(t,n){if(n.tween._time||!gl())for(var e=n._pt;e;)e.r(t,e.d),e=e._next;else n.styles.revert()},get:Gn,aliases:On,getSetter:function(t,n,e){var i=On[n];return i&&i.indexOf(",")<0&&(n=i),n in Qn&&n!==He&&(t._gsap.x||Gn(t,"x"))?e&&Ul===e?n==="scale"?Ip:Dp:(Ul=e||{})&&(n==="scale"?Np:Fp):t.style&&!el(t.style[n])?Lp:~n.indexOf("-")?zp:fl(t,n)},core:{_removeProperty:gi,_getMatrix:_l}};Ye.utils.checkPrefix=Tr;Ye.core.getStyleSaver=mh;(function(r,t,n,e){var i=$e(r+","+t+","+n,function(s){Qn[s]=1});$e(t,function(s){sn.units[s]="deg",vh[s]=1}),On[i[13]]=r+","+t,$e(e,function(s){var o=s.split(":");On[o[1]]=i[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");$e("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){sn.units[r]="px"});Ye.registerPlugin(Sh);var Vt=Ye.registerPlugin(Sh)||Ye;Vt.core.Tween;/*!
 * paths 3.15.0
 * https://gsap.com
 *
 * Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var jp=/[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,Qp=/[\+\-]?\d*\.?\d+e[\+\-]?\d+/ig,Kp=Math.PI/180,Es=Math.sin,Cs=Math.cos,ts=Math.abs,Ar=Math.sqrt,Zp=function(t){return typeof t=="number"},ic=1e5,Jn=function(t){return Math.round(t*ic)/ic||0},rc=function(t){return t.closed=Math.abs(t[0]-t[t.length-2])<.001&&Math.abs(t[1]-t[t.length-1])<.001};function Jp(r,t,n,e,i,s,o){for(var a=r.length,l,c,u,h,f;--a>-1;)for(l=r[a],c=l.length,u=0;u<c;u+=2)h=l[u],f=l[u+1],l[u]=h*t+f*e+s,l[u+1]=h*n+f*i+o;return r._dirty=1,r}function t0(r,t,n,e,i,s,o,a,l){if(!(r===a&&t===l)){n=ts(n),e=ts(e);var c=i%360*Kp,u=Cs(c),h=Es(c),f=Math.PI,d=f*2,p=(r-a)/2,g=(t-l)/2,m=u*p+h*g,v=-h*p+u*g,_=m*m,w=v*v,x=_/(n*n)+w/(e*e);x>1&&(n=Ar(x)*n,e=Ar(x)*e);var S=n*n,k=e*e,T=(S*k-S*w-k*_)/(S*w+k*_);T<0&&(T=0);var A=(s===o?-1:1)*Ar(T),C=A*(n*v/e),P=A*-(e*m/n),B=(r+a)/2,y=(t+l)/2,I=B+(u*C-h*P),F=y+(h*C+u*P),G=(m-C)/n,N=(v-P)/e,$=(-m-C)/n,O=(-v-P)/e,z=G*G+N*N,b=(N<0?-1:1)*Math.acos(G/Ar(z)),Y=(G*O-N*$<0?-1:1)*Math.acos((G*$+N*O)/Ar(z*($*$+O*O)));isNaN(Y)&&(Y=f),!o&&Y>0?Y-=d:o&&Y<0&&(Y+=d),b%=d,Y%=d;var U=Math.ceil(ts(Y)/(d/4)),D=[],W=Y/U,V=4/3*Es(W/2)/(1+Cs(W/2)),et=u*n,X=h*n,_t=h*-e,St=u*e,mt;for(mt=0;mt<U;mt++)i=b+mt*W,m=Cs(i),v=Es(i),G=Cs(i+=W),N=Es(i),D.push(m-V*v,v+V*m,G+V*N,N-V*G,G,N);for(mt=0;mt<D.length;mt+=2)m=D[mt],v=D[mt+1],D[mt]=m*et+v*_t+I,D[mt+1]=m*X+v*St+F;return D[mt-2]=a,D[mt-1]=l,D}}function e0(r){var t=(r+"").replace(Qp,function(C){var P=+C;return P<1e-4&&P>-1e-4?0:P}).match(jp)||[],n=[],e=0,i=0,s=2/3,o=t.length,a=0,l="ERROR: malformed path: "+r,c,u,h,f,d,p,g,m,v,_,w,x,S,k,T,A=function(P,B,y,I){_=(y-P)/3,w=(I-B)/3,g.push(P+_,B+w,y-_,I-w,y,I)};if(!r||!isNaN(t[0])||isNaN(t[1]))return console.log(l),n;for(c=0;c<o;c++)if(S=d,isNaN(t[c])?(d=t[c].toUpperCase(),p=d!==t[c]):c--,h=+t[c+1],f=+t[c+2],p&&(h+=e,f+=i),c||(m=h,v=f),d==="M")g&&(g.length<8?n.length-=1:a+=g.length,rc(g)),e=m=h,i=v=f,g=[h,f],n.push(g),c+=2,d="L";else if(d==="C")g||(g=[0,0]),p||(e=i=0),g.push(h,f,e+t[c+3]*1,i+t[c+4]*1,e+=t[c+5]*1,i+=t[c+6]*1),c+=6;else if(d==="S")_=e,w=i,(S==="C"||S==="S")&&(_+=e-g[g.length-4],w+=i-g[g.length-3]),p||(e=i=0),g.push(_,w,h,f,e+=t[c+3]*1,i+=t[c+4]*1),c+=4;else if(d==="Q")_=e+(h-e)*s,w=i+(f-i)*s,p||(e=i=0),e+=t[c+3]*1,i+=t[c+4]*1,g.push(_,w,e+(h-e)*s,i+(f-i)*s,e,i),c+=4;else if(d==="T")_=e-g[g.length-4],w=i-g[g.length-3],g.push(e+_,i+w,h+(e+_*1.5-h)*s,f+(i+w*1.5-f)*s,e=h,i=f),c+=2;else if(d==="H")A(e,i,e=h,i),c+=1;else if(d==="V")A(e,i,e,i=h+(p?i-e:0)),c+=1;else if(d==="L"||d==="Z")d==="Z"&&(h=m,f=v,g.closed=!0),(d==="L"||ts(e-h)>.5||ts(i-f)>.5)&&(A(e,i,h,f),d==="L"&&(c+=2)),e=h,i=f;else if(d==="A"){if(k=t[c+4],T=t[c+5],_=t[c+6],w=t[c+7],u=7,k.length>1&&(k.length<3?(w=_,_=T,u--):(w=T,_=k.substr(2),u-=2),T=k.charAt(1),k=k.charAt(0)),x=t0(e,i,+t[c+1],+t[c+2],+t[c+3],+k,+T,(p?e:0)+_*1,(p?i:0)+w*1),c+=u,x)for(u=0;u<x.length;u++)g.push(x[u]);e=g[g.length-2],i=g[g.length-1]}else console.log(l);return c=g.length,c<6?(n.pop(),c=0):rc(g),n.totalPoints=a+c,n}function n0(r){Zp(r[0])&&(r=[r]);var t="",n=r.length,e,i,s,o;for(i=0;i<n;i++){for(o=r[i],t+="M"+Jn(o[0])+","+Jn(o[1])+" C",e=o.length,s=2;s<e;s++)t+=Jn(o[s++])+","+Jn(o[s++])+" "+Jn(o[s++])+","+Jn(o[s++])+" "+Jn(o[s++])+","+Jn(o[s])+" ";o.closed&&(t+="z")}return t}/*!
 * CustomEase 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Ie,Th,kh=function(){return Ie||typeof window<"u"&&(Ie=window.gsap)&&Ie.registerPlugin&&Ie},sc=function(){Ie=kh(),Ie?(Ie.registerEase("_CE",Qi.create),Th=1):console.warn("Please gsap.registerPlugin(CustomEase)")},i0=1e20,Ms=function(t){return~~(t*1e3+(t<0?-.5:.5))/1e3},r0=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/gi,s0=/[cLlsSaAhHvVtTqQ]/g,o0=function(t){var n=t.length,e=i0,i;for(i=1;i<n;i+=6)+t[i]<e&&(e=+t[i]);return e},a0=function(t,n,e){!e&&e!==0&&(e=Math.max(+t[t.length-1],+t[1]));var i=+t[0]*-1,s=-e,o=t.length,a=1/(+t[o-2]+i),l=-n||(Math.abs(+t[o-1]-+t[1])<.01*(+t[o-2]-+t[0])?o0(t)+s:+t[o-1]+s),c;for(l?l=1/l:l=-a,c=0;c<o;c+=2)t[c]=(+t[c]+i)*a,t[c+1]=(+t[c+1]+s)*l},l0=function r(t,n,e,i,s,o,a,l,c,u,h){var f=(t+e)/2,d=(n+i)/2,p=(e+s)/2,g=(i+o)/2,m=(s+a)/2,v=(o+l)/2,_=(f+p)/2,w=(d+g)/2,x=(p+m)/2,S=(g+v)/2,k=(_+x)/2,T=(w+S)/2,A=a-t,C=l-n,P=Math.abs((e-a)*C-(i-l)*A),B=Math.abs((s-a)*C-(o-l)*A),y;return u||(u=[{x:t,y:n},{x:a,y:l}],h=1),u.splice(h||u.length-1,0,{x:k,y:T}),(P+B)*(P+B)>c*(A*A+C*C)&&(y=u.length,r(t,n,f,d,_,w,k,T,c,u,h),r(k,T,x,S,m,v,a,l,c,u,h+1+(u.length-y))),u},Qi=function(){function r(n,e,i){Th||sc(),this.id=n,this.setData(e,i)}var t=r.prototype;return t.setData=function(e,i){i=i||{},e=e||"0,0,1,1";var s=e.match(r0),o=1,a=[],l=[],c=i.precision||1,u=c<=1,h,f,d,p,g,m,v,_,w;if(this.data=e,(s0.test(e)||~e.indexOf("M")&&e.indexOf("C")<0)&&(s=e0(e)[0]),h=s.length,h===4)s.unshift(0,0),s.push(1,1),h=8;else if((h-2)%6)throw"Invalid CustomEase";for((+s[0]!=0||+s[h-2]!=1)&&a0(s,i.height,i.originY),this.segment=s,p=2;p<h;p+=6)f={x:+s[p-2],y:+s[p-1]},d={x:+s[p+4],y:+s[p+5]},a.push(f,d),l0(f.x,f.y,+s[p],+s[p+1],+s[p+2],+s[p+3],d.x,d.y,1/(c*2e5),a,a.length-1);for(h=a.length,p=0;p<h;p++)v=a[p],_=a[p-1]||v,(v.x>_.x||_.y!==v.y&&_.x===v.x||v===_)&&v.x<=1?(_.cx=v.x-_.x,_.cy=v.y-_.y,_.n=v,_.nx=v.x,u&&p>1&&Math.abs(_.cy/_.cx-a[p-2].cy/a[p-2].cx)>2&&(u=0),_.cx<o&&(_.cx?o=_.cx:(_.cx=.001,p===h-1&&(_.x-=.001,o=Math.min(o,.001),u=0)))):(a.splice(p--,1),h--);if(h=1/o+1|0,g=1/h,m=0,v=a[0],u){for(p=0;p<h;p++)w=p*g,v.nx<w&&(v=a[++m]),f=v.y+(w-v.x)/v.cx*v.cy,l[p]={x:w,cx:g,y:f,cy:0,nx:9},p&&(l[p-1].cy=f-l[p-1].y);m=a[a.length-1],l[h-1].cy=m.y-f,l[h-1].cx=m.x-l[l.length-1].x}else{for(p=0;p<h;p++)v.nx<p*g&&(v=a[++m]),l[p]=v;m<a.length-1&&(l[p-1]=a[a.length-2])}return this.ease=function(x){var S=l[x*h|0]||l[h-1];return S.nx<x&&(S=S.n),S.y+(x-S.x)/S.cx*S.cy},this.ease.custom=this,this.id&&Ie&&Ie.registerEase(this.id,this.ease),this},t.getSVGData=function(e){return r.getSVGData(this,e)},r.create=function(e,i,s){return new r(e,i,s).ease},r.register=function(e){Ie=e,sc()},r.get=function(e){return Ie.parseEase(e)},r.getSVGData=function(e,i){i=i||{};var s=i.width||100,o=i.height||100,a=i.x||0,l=(i.y||0)+o,c=Ie.utils.toArray(i.path)[0],u,h,f,d,p,g,m,v,_,w;if(i.invert&&(o=-o,l=0),typeof e=="string"&&(e=Ie.parseEase(e)),e.custom&&(e=e.custom),e instanceof r)u=n0(Jp([e.segment.slice(0)],s,0,0,-o,a,l));else{for(u=[a,l],m=Math.max(5,(i.precision||1)*200),d=1/m,m+=2,v=5/m,_=Ms(a+d*s),w=Ms(l+e(d)*-o),h=(w-l)/(_-a),f=2;f<m;f++)p=Ms(a+f*d*s),g=Ms(l+e(f*d)*-o),(Math.abs((g-w)/(p-_)-h)>v||f===m-1)&&(u.push(_,w),h=(g-w)/(p-_)),_=p,w=g;u="M"+u.join(",")}return c&&c.setAttribute("d",u),u},r}();Qi.version="3.15.0";Qi.headless=!0;kh()&&Ie.registerPlugin(Qi);Vt.registerPlugin(Qi);Qi.create("oaIn","0.69, 0, 0, 1");Qi.create("oaDim","0.35, 0.35, 0, 1");const c0=4,u0=[.75,.9,1.05,1.2],Eh=[1.5,1.35,1.2,1.05],h0=1.2,Ch=1.5,f0=1.3,Ps=1.45,d0=`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E")`,p0=`
.br-overlay { position: fixed; inset: 0; z-index: 90; pointer-events: none; visibility: hidden; }
.br-dim { position: absolute; inset: 0; background: #0a0d18; opacity: 0; will-change: opacity; }
.br-blocks { position: absolute; inset: 0; display: flex; flex-direction: column; }
.br-block {
  display: block; width: 100%; height: 25%;
  background: #f1eade;
  box-shadow: 0 0 0 1px #f1eade; /* 原站手法：消去横条间的子像素缝隙 */
  transform: scaleX(0);
  transform-origin: left center;
  will-change: transform;
}
.br-block::before {
  content: ""; position: absolute; inset: 0;
  background-image: ${d0};
  opacity: 0.045; mix-blend-mode: multiply;
}
.br-label {
  position: absolute; left: 50%; top: 50%;
  transform: translate(-50%, -50%);
  display: flex; overflow: hidden;
  padding: 0.08em 0; /* 给撇捺留出行高内的呼吸位 */
  font-family: var(--font-display, "Noto Serif SC", "STSong", serif);
  font-weight: 600;
  font-size: clamp(40px, 7vw, 96px);
  letter-spacing: 0.3em; text-indent: 0.3em;
  color: #1a1720;
  white-space: nowrap;
}
.br-char { display: inline-block; will-change: transform; }
`;let Yn=null,fi=null,As=null,oi=[],qn=null,pr=!1;function Mh(){if(Yn)return;const r=document.createElement("style");r.textContent=p0,document.head.appendChild(r),Yn=document.createElement("div"),Yn.className="br-overlay",fi=document.createElement("div"),fi.className="br-dim",As=document.createElement("div"),As.className="br-blocks",oi=[];for(let t=0;t<c0;t++){const n=document.createElement("div");n.className="br-block",As.appendChild(n),oi.push(n)}qn=document.createElement("div"),qn.className="br-label",Yn.append(fi,As,qn),document.body.appendChild(Yn)}function Ph(r){if(qn){qn.innerHTML="";for(const t of r){const n=document.createElement("span");n.className="br-char",n.textContent=t===" "?" ":t,qn.appendChild(n)}Vt.set(qn.children,{y:"110%"})}}function Ah(){return qn?Array.from(qn.children):[]}let Ti=null;function Rh(){try{Ti??(Ti=new AudioContext),Ti.state==="suspended"&&Ti.resume();const r=Ti.currentTime,t=Ti.createOscillator(),n=Ti.createGain();t.type="sine",t.frequency.setValueAtTime(110,r),t.frequency.exponentialRampToValueAtTime(65,r+.55),n.gain.setValueAtTime(1e-4,r),n.gain.exponentialRampToValueAtTime(.06,r+.06),n.gain.exponentialRampToValueAtTime(1e-4,r+.6),t.connect(n).connect(Ti.destination),t.start(r),t.stop(r+.62)}catch{}}function Oh(){const r=document.getElementById("sky-canvas");r&&Vt.fromTo(r,{scale:1.015,opacity:.55},{scale:1,opacity:1,duration:1,ease:"power2.out",overwrite:"auto"})}function g0(r,t){if(Mh(),pr)return Promise.resolve();pr=!0,Ph(r);const n=Ah();return Yn.style.visibility="visible",Rh(),new Promise(e=>{Vt.timeline({onComplete:()=>{Yn.style.visibility="hidden",pr=!1,e()}}).set(oi,{transformOrigin:"left center",scaleX:0}).set(fi,{opacity:0}).to(fi,{opacity:1,duration:h0,ease:"oaDim"},0).to(oi,{scaleX:1,duration:s=>u0[s]??1.2,ease:"oaIn"},0).to(n,{y:"0%",duration:s=>.75+s*.12,ease:"oaIn"},.05).add(()=>{t(),Oh()},f0).to(n,{y:"110%",duration:s=>.85+s*.1,ease:"oaIn"},Ps).set(oi,{transformOrigin:"right center"},Ps).to(oi,{scaleX:0,duration:s=>Eh[s]??1.05,ease:"oaIn"},Ps).to(fi,{opacity:0,duration:Ch,ease:"oaDim"},Ps)})}function m0(r){if(Mh(),pr)return Promise.resolve();pr=!0,Ph(r);const t=Ah();return Yn.style.visibility="visible",Vt.set(fi,{opacity:1}),Vt.set(oi,{scaleX:1,transformOrigin:"right center"}),new Promise(n=>{Vt.timeline({onComplete:()=>{Yn.style.visibility="hidden",pr=!1,n()}}).to(t,{y:"0%",duration:i=>.75+i*.12,ease:"oaIn"},.35).to(t,{y:"110%",duration:i=>.85+i*.1,ease:"oaIn"},"+=1.15").add(()=>{Oh(),Rh()},"<").to(oi,{scaleX:0,duration:i=>Eh[i]??1.05,ease:"oaIn"},"<").to(fi,{opacity:0,duration:Ch,ease:"oaDim"},"<")})}function _0(r){if(!r.dataset.brSplit){r.dataset.brSplit="1";const t=r.textContent??"";r.textContent="",r.style.overflow="hidden";for(const n of t){const e=document.createElement("span");e.className="br-char",e.style.display="inline-block",e.textContent=n===" "?" ":n,r.appendChild(e)}}Vt.fromTo(r.children,{y:"110%"},{y:"0%",duration:.75,ease:"oaIn",stagger:.05,overwrite:"auto"})}const y0=.65,b0=new it(0,1,0),v0={ra:0,dec:80};function oc(r){return r=Pt.clamp(r,0,1),r*r*(3-2*r)}function ni(r,t){const n=new it(...Ge(r,t,1)),e=new fa().lookAt(new it(0,0,0),n,b0);return new Ve().setFromRotationMatrix(e)}function ac(r){if(r.gaze!=="target")return null;const t=r.target??v0;return ni(t.ra,t.dec)}class xo{constructor(t,n=y0){R(this,"keys");R(this,"hold");if(t.length<2)throw new Error("CameraRig 至少需要 2 个关键帧");this.hold=Pt.clamp(n,0,.95);for(const[e,i]of t.entries()){if(!(i.radius>0))throw new Error(`关键帧 ${e}：radius 必须为正`);if(!(i.fov>10&&i.fov<140))throw new Error(`关键帧 ${e}：fov 非法（${i.fov}）`);if(i.gaze!=="free"&&i.gaze!=="target")throw new Error(`关键帧 ${e}：gaze 必须为 "free" | "target"`);const s=i.enter??0;if(s<0||s>=1)throw new Error(`关键帧 ${e}：enter 必须在 [0,1)（${s}）`);if(i.hold!==void 0&&(i.hold<0||i.hold>1))throw new Error(`关键帧 ${e}：hold 必须在 [0,1]（${i.hold}）`);if(e>0&&s>0){const o=t[e-1].hold??this.hold;if(o<1)throw new Error(`关键帧 ${e}：enter > 0 要求上一章 hold = 1（当前 ${o}）`)}}this.keys=t}get count(){return this.keys.length}sample(t,n){const e=this.keys.length,i=Math.min(Math.max(Math.floor(t),0),e-1),s=Pt.clamp(n,0,1),o=this.keys[i],a=this.keys[Math.min(i+1,e-1)],l=o.enter??0;if(i>0&&l>0&&s<l)return xo.blend(this.keys[i-1],o,oc(s/l));const c=o.hold??this.hold,u=i<e-1&&c<1?oc((s-c)/(1-c)):0;return xo.blend(o,a,u)}sampleGlobal(t){const n=this.keys.length,e=Pt.clamp(t,0,n),i=Math.min(Math.floor(e),n-1);return this.sample(i,e-i)}static blend(t,n,e){var h;const i=new it(...t.dir??[0,1,0]).normalize(),s=new it(...n.dir??[0,1,0]).normalize(),o=i.lerp(s,e).normalize(),a=ac(t),l=ac(n),c=Pt.lerp(t.gaze==="target"?1:0,n.gaze==="target"?1:0,e);let u=null;return c>0&&(u=a&&l?a.clone().slerp(l,e):((h=a??l)==null?void 0:h.clone())??null),{radius:Pt.lerp(t.radius,n.radius,e),dir:o,fov:Pt.lerp(t.fov,n.fov,e),gazeBlend:c,gazeTargetQ:u,drift:Pt.lerp(t.drift??0,n.drift??0,e),orbit:Pt.lerp(t.orbit?1:0,n.orbit?1:0,e)}}}const Rs=.005,w0=[{radius:Rs,fov:78,gaze:"free",drift:.012},{radius:Rs,fov:78,gaze:"free",hold:1},{radius:Rs,fov:65,gaze:"target",target:{ra:270,dec:8},enter:.3},{radius:Rs,fov:45,gaze:"target",target:{ra:175,dec:81}},{radius:3,dir:[.52,.7,.49],fov:50,gaze:"free",orbit:!0},{radius:3,dir:[.52,.7,.49],fov:50,gaze:"free",orbit:!0},{radius:3,dir:[0,.55,.84],fov:50,gaze:"free",orbit:!0},{radius:5,dir:[.52,.7,.49],fov:45,gaze:"free"}],lc=.22,x0=`
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
  letter-spacing: ${lc}em;
  /* 鎏金：宽幅渐变 + background-size 放大两倍，入场后缓慢流动（金属呼吸感） */
  background: linear-gradient(160deg, #f2dd9a 12%, #c9a227 38%, #8f7019 52%, #c9a227 66%, #f2dd9a 88%);
  background-size: 240% 240%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 0 26px rgba(201, 162, 39, 0.45));
  margin-bottom: 18px;
  /* 开屏即现：标题只随页面加载做一次入场动画，与滚动进度脱钩；
     入场完毕后鎏金开始缓慢流动 */
  animation:
    ch1-title-in 1.5s cubic-bezier(0.2, 0.7, 0.2, 1) 0.15s both,
    ch1-sheen 12s ease-in-out 1.8s infinite alternate;
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
    letter-spacing: ${lc}em;
    filter: blur(0) drop-shadow(0 0 26px rgba(201, 162, 39, 0.45));
    transform: translateY(0);
  }
}
@keyframes ch1-sheen {
  from { background-position: 0% 30%; }
  to { background-position: 100% 70%; }
}
/* 英文副标：标题下的衬线小字（editorial 题签） */
.ch1-sub-en {
  font-family: "Times New Roman", "Noto Serif SC", serif;
  font-size: clamp(10px, 1vw, 13px);
  letter-spacing: 0.52em;
  text-indent: 0.52em;
  color: #af915f;
  opacity: 0;
  animation: ch1-sub-en-in 1.2s cubic-bezier(0.2, 0.7, 0.2, 1) 1.0s both;
  margin-bottom: 22px;
  text-transform: uppercase;
}
@keyframes ch1-sub-en-in {
  from { opacity: 0; letter-spacing: 0.9em; text-indent: 0.9em; }
  to { opacity: 0.9; letter-spacing: 0.52em; text-indent: 0.52em; }
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
/* 滚动指引：下方一条渐隐金线 + 光点往复滑落 */
.ch1-cue::before {
  content: "";
  position: absolute;
  left: 50%;
  top: calc(100% + 10px);
  width: 1px;
  height: 46px;
  background: linear-gradient(180deg, rgba(201, 162, 39, 0.5), rgba(201, 162, 39, 0.06));
  transform: translateX(-50%);
}
.ch1-cue::after {
  content: "";
  position: absolute;
  left: 50%;
  top: calc(100% + 10px);
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: #f2dd9a;
  box-shadow: 0 0 6px rgba(242, 221, 154, 0.9);
  transform: translateX(-50%);
  animation: ch1-cue-drop 2.2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes ch1-cue-drop {
  0% { transform: translateX(-50%) translateY(0); opacity: 0; }
  18% { opacity: 1; }
  82% { opacity: 1; }
  100% { transform: translateX(-50%) translateY(42px); opacity: 0; }
}
`;let cc=!1;function S0(){if(cc||typeof document>"u")return;const r=document.createElement("style");r.dataset.ch1="",r.textContent=x0,document.head.appendChild(r),cc=!0}function Rr(r){return r.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function T0(r){return r<0?0:r>1?1:r}function Os(r,t,n){const e=T0((r-t)/(n-t));return e*e*(3-2*e)}function k0(r){S0();const t=r.root.querySelector(".pin"),{copy:n}=r,e=document.createElement("div");e.className="ch1-stage",e.innerHTML=`
    <p class="ch1-eyebrow">${Rr(n.eyebrow)}</p>
    <h1 class="ch1-title">${Rr(n.title)}</h1>
    <p class="ch1-sub-en">A Star Atlas of Three Thousand Years</p>
    <p class="ch1-hook">${Rr(n.hook)}</p>
    <div class="ch1-body">${n.body.map(h=>`<p>${Rr(h)}</p>`).join("")}</div>
    ${n.seal?`<div class="ch1-seal">${Rr(n.seal)}</div>`:""}
  `,t.appendChild(e);const i=document.createElement("div");i.className="ch1-cue",i.textContent="向下滚动 · 步入夜空",t.appendChild(i);const s=e.querySelector(".ch1-hook"),o=e.querySelector(".ch1-body"),a=e.querySelector(".ch1-seal");let l=-1;const c=new Map;function u(h,f,d=18){const p=c.get(h);p!==void 0&&Math.abs(p-f)<1e-4||(c.set(h,f),h.style.opacity=f.toFixed(3),h.style.transform=`translateY(${((1-f)*d).toFixed(2)}px)`)}return{enter(){r.sky.setLabelsEnabled(!1)},update(h){if(u(s,Os(h,.15,.45)),u(o,Os(h,.3,.6)),a){const d=Os(h,.45,.75),p=c.get(a);(p===void 0||Math.abs(p-d)>=1e-4)&&(c.set(a,d),a.style.opacity=d.toFixed(3),a.style.transform=`translateY(${((1-d)*10).toFixed(2)}px) scale(${(1.3-.3*d).toFixed(3)})`)}const f=.65*(1-Os(h,0,.35));(Math.abs(f-l)>=1e-4||l<0)&&(l=f,i.style.opacity=f.toFixed(3))},exit(){r.sky.setLabelsEnabled(!0)}}}const E0=Object.freeze(Object.defineProperty({__proto__:null,createChapter:k0},Symbol.toStringTag,{value:"Module"})),C0=100,M0=.08,P0=C0*M0,Ca=1.6,A0=.9,R0=26,O0=1.6,L0=.6,Ai=14,z0=2.6,jo=.5,D0=.1,I0=.9,Qo=3.2,N0=.35,uc=.22,hc=1.15,F0=.65,$0=1.7,Ko=[.45,.32,.58],Zo=[0,1.7,3.9],Jo=[1,.8,.9],Ls=new it(14,8,-90),B0=new it(0,1,0),H0=new it(1,0,0);function kr(r){return Math.min(Math.max(r,0),1)}function G0(r){return Math.min(R0,Math.max(0,r)*O0)}function fc(r){return r<=P0}function Y0(r,t){return Ca+(r-Ca)*Math.exp(-2.2*t)}function W0(r,t,n){const e=kr(r),i=kr(t);if(n<=0||e===i)return e;const s=n/L0;return i>e?Math.min(i,e+s):Math.max(i,e-s)}function X0(r,t){return(Number.isFinite(t)?kr(t):0)*Math.sin(2*Math.PI*r/z0)}function dc(r){return[jo*Jo[0]*Math.sin(Ko[0]*r+Zo[0]),jo*Jo[1]*Math.sin(Ko[1]*r+Zo[1]),jo*Jo[2]*Math.sin(Ko[2]*r+Zo[2])]}function q0(r,t=Ai){if(t<=1)return 1;const n=kr(r/(t-1));return Math.pow(1-n,$0)}function V0(r,t=Ai){if(t<=1)return hc;const n=kr(r/(t-1));return hc*(1-F0*n)}function U0(){if(typeof document>"u")return null;const r=document.createElement("canvas");r.width=r.height=128;const t=r.getContext("2d"),n=t.createRadialGradient(64,64,0,64,64,64);return n.addColorStop(0,"rgba(255, 252, 240, 1)"),n.addColorStop(.25,"rgba(255, 233, 184, 0.95)"),n.addColorStop(.6,"rgba(255, 233, 184, 0.28)"),n.addColorStop(1,"rgba(255, 233, 184, 0)"),t.fillStyle=n,t.fillRect(0,0,128,128),new Oo(r)}const j0=`
attribute float aSize;
attribute float aFade;
varying float vFade;
void main() {
  vFade = aFade;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = aSize * (320.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
`,Q0=`
uniform sampler2D uMap;
varying float vFade;
void main() {
  vec4 tex = texture2D(uMap, gl_PointCoord);
  gl_FragColor = vec4(tex.rgb, tex.a * vFade);
}
`,K0=0,pc=1,gc=2;function Z0(){const r=new En;r.name="firefly";const t=U0(),n=new Ka({map:t,transparent:!0,opacity:0,blending:Wi,depthTest:!1,depthWrite:!1}),e=new Za(n);e.scale.set(Qo,Qo,1);const i=dc(0),s=new it(Ls.x+i[0],Ls.y+i[1],Ls.z+i[2]);e.position.copy(s),e.frustumCulled=!1,e.renderOrder=9,r.add(e);const o=new hs;o.setAttribute("position",new ci(new Float32Array(Ai*3),3).setUsage($o)),o.setAttribute("aSize",new ci(new Float32Array(Ai),1).setUsage($o)),o.setAttribute("aFade",new ci(new Float32Array(Ai),1).setUsage($o));const a=o.getAttribute("position"),l=o.getAttribute("aSize"),c=o.getAttribute("aFade"),u=new _u({uniforms:{uMap:{value:t}},vertexShader:j0,fragmentShader:Q0,transparent:!0,blending:Wi,depthTest:!1,depthWrite:!1}),h=new Ja(o,u);h.frustumCulled=!1,h.renderOrder=8,r.add(h);const f=Ls.clone(),d=s.clone();let p=null,g=K0;const m=new it(1,0,0),v=new it(0,1,0);let _=Ca,w=0,x=0,S=0,k=0,T=0;const A=[];let C=!1;function P(N,$){ki.copy(f).sub(N),($<.001||ki.lengthSq()<1e-12)&&ki.set(1,0,0),m.copy(ki).normalize(),_=Math.max($,.001),N.lengthSq()<1e-8?ta.set(0,1,0):ta.copy(N).normalize(),v.crossVectors(m,ta),v.lengthSq()<1e-8&&v.crossVectors(m,Math.abs(m.y)<.99?B0:H0),v.normalize(),w=0,g=gc}function B(N){if(!Number.isFinite(N.x)||!Number.isFinite(N.y)||!Number.isFinite(N.z))return;p===null&&(p=new it),p.set(N.x,N.y,N.z);const $=f.distanceTo(p);fc($)?P(p,$):g=pc}function y(N){T=Number.isFinite(N)?kr(N):0}function I(N){k=N?1:0}function F(N){if(C)return;const $=Number.isFinite(N)?Math.min(Math.max(N,0),D0):0;if(x+=$,S=W0(S,k,$),r.visible=S>.001,p!==null&&g===pc){ki.copy(p).sub(f);const D=ki.length();fc(D)?P(p,D):f.addScaledVector(ki.divideScalar(D),G0(D)*$)}p!==null&&g===gc&&(_=Y0(_,$),w+=A0*$,f.copy(p).addScaledVector(m,Math.cos(w)*_).addScaledVector(v,Math.sin(w)*_));const O=dc(x);d.set(f.x+O[0],f.y+O[1],f.z+O[2]);const z=X0(x,T);n.opacity=I0*(1+N0*z)*S;const b=Qo*(1+uc*z);e.scale.set(b,b,1),e.position.copy(d);const Y=A.length<Ai?new it:A.pop();Y.copy(d),A.unshift(Y);const U=A.length;for(let D=0;D<Ai;D++){const W=A[Math.min(D,U-1)];a.setXYZ(D,W.x,W.y,W.z),c.setX(D,q0(D)*S),l.setX(D,V0(D)*(1+uc*z))}a.needsUpdate=!0,c.needsUpdate=!0,l.needsUpdate=!0}function G(){C||(C=!0,r.removeFromParent(),n.dispose(),t==null||t.dispose(),o.dispose(),u.dispose())}return r.visible=!1,{group:r,flyTo:B,pulse:y,setVisible:I,update:F,dispose:G}}const ki=new it,ta=new it,yl=.35,Lh=.8,Oi=.05,gr=.3,io=5,zh=.08,bl=["北斗","北极","天狼"],Dh=4,ro=.8,J0=10,Ih=20,Ma="ch2-awakened",Wr=0,Mn=1,Pa=2;function Aa(r){return Math.min(Math.max(r,0),1)}function Nh(r){return r<yl?Wr:r<Lh?Mn:Pa}function Xr(r){for(const t of bl)if(!r.has(t))return t;return null}function Ra(r,t,n){return!r||n.has(r)?!1:t===null||r===t}const Oa=[{key:"ziwei",name:"紫微"},{key:"taiwei",name:"太微"},{key:"tianshi",name:"天市"},{key:"qinglong",name:"青龙"},{key:"xuanwu",name:"玄武"},{key:"baihu",name:"白虎"},{key:"zhuque",name:"朱雀"}];function Fh(r){return r.includes("紫微")?"ziwei":r.includes("太微")?"taiwei":r.includes("天市")?"tianshi":r.includes("苍龙")||r.includes("青龙")?"qinglong":r.includes("玄武")?"xuanwu":r.includes("白虎")?"baihu":r.includes("朱雀")?"zhuque":null}const $h=[.25,.5,.75,1];function so(r,t){if(t<=0||r<=0)return 0;const n=r/t;let e=0;for(const i of $h)n+1e-9>=i&&(e+=1);return e}function Bh(r){let t=0,n=0,e=0;for(const s of r){const[o,a,l]=Ge(s.ra,s.dec);t+=o,n+=a,e+=l}const i=Math.hypot(t,n,e);return i<1e-6?null:{ra:Math.atan2(e,t)*180/Math.PI,dec:Math.asin(n/i)*180/Math.PI}}function So(r,t){const[n,e,i]=Ge(r.ra,r.dec),[s,o,a]=Ge(t.ra,t.dec),l=Math.min(1,Math.max(-1,n*s+e*o+i*a));return Math.acos(l)*180/Math.PI}function La(r,t,n){let e=null,i=1/0;for(const s of r){if(t.has(s.name))continue;const o=So(s,n);o<i&&(i=o,e=s.name)}return e}function Hh(r){const t=Math.min(Math.max((5.5-r)*4,0),28);return 220*Math.pow(2,t/12)}function Gh(r,t=2){return r.split("，").slice(0,Math.max(1,t)).join("，")}function Yh(r){if(!r)return[];try{const t=JSON.parse(r);return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}catch{return[]}}function za(r){const t=(gr-Oi)/io,n=[];for(let s=0;s<io;s++)n.push(Aa((r-(Oi+s*t))/t));const e=r<Oi?-1:Math.min(Math.floor((r-Oi)/t),io-1),i=Aa((r-gr)/(yl-gr));return{active:e,lines:n,finale:i}}const ea=100,zs=.78,tg=1.6,eg=.12,ng=[3e4,2e4,12e3,1e4],ig=1400,mc=[{text:"北斗之宿七星明",label:"北斗",groups:["北斗"]},{text:"北极五星在其中",label:"北极",groups:["北极"]},{text:"三星中央色最深",label:"心宿",groups:["心宿"]},{text:"牛上直建三河鼓，鼓上三星号织女",label:"河鼓 · 织女",groups:["河鼓","织女"]},{text:"邱下一狼光蓬茸",label:"天狼",groups:["天狼"]}],rg=[{ra:186,dec:56.5,ring:26},{ra:218.6,dec:76.8,ring:10},{ra:247.2,dec:-26.8,ring:8},{ra:297.7,dec:8.6,ring:8},{ra:101.3,dec:-16.7,ring:6}],sg=(()=>{const[r,t,n]=Ge(297.7,8.6),[e,i,s]=Ge(280.5,38.7),o=r+e,a=t+i,l=n+s,c=Math.hypot(o,a,l),u=Math.atan2(l,o)*180/Math.PI,h=Math.asin(a/c)*180/Math.PI;return[ni(186,56.5),ni(218.6,76.8),ni(247.2,-26.8),ni(u,h),ni(101.3,-16.7)]})(),og=["一","二","三"],ag=`
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
  animation: ch2PoemFloat 5.6s ease-out forwards;
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
  8% { opacity: 1; }
  75% { opacity: 1; }
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

/* ---- 段2/段3：收集卷（左上极简，描金细线；避开左下环境音开关与探索面板；done 时收拢为纪念章） ---- */
.ch2-scroll {
  position: absolute; left: 3.2vw; top: 5vh;
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
`;let _c=!1;function lg(){if(_c||typeof document>"u")return;const r=document.createElement("style");r.dataset.ch2="",r.textContent=ag,document.head.appendChild(r),_c=!0}function xn(r){return r.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}let Ze=null,es=null;function cg(){if(typeof window>"u")return;const r=window.AudioContext??window.webkitAudioContext;r&&(Ze||(Ze=new r,es=Ze.createGain(),es.gain.value=.12,es.connect(Ze.destination)),Ze.state==="suspended"&&Ze.resume())}function yc(r,t,n){if(cg(),!Ze||!es)return;const e=Ze.sampleRate,i=Math.max(2,Math.round(e/r)),s=Math.floor(e*t),o=Ze.createBuffer(1,s,e),a=o.getChannelData(0),l=new Float32Array(i);for(let h=0;h<i;h++)l[h]=Math.random()*2-1;let c=0;for(let h=0;h<s;h++){const f=l[c],d=l[(c+1)%i];l[c]=.996*.5*(f+d),a[h]=f*n,c=(c+1)%i}const u=Ze.createBufferSource();u.buffer=o,u.connect(es),u.start()}function ug(r){lg();const t=r.root.querySelector(".pin"),{copy:n}=r;function e(E,L){const K=document.createElement(E);return K.className=L,t.appendChild(K),K}const i=e("div","ch2-card ch2-title");i.innerHTML=`
    <p class="eyebrow">${xn(n.eyebrow)}</p>
    <div class="ch2-head">
      <h2>${xn(n.title)}</h2>
      ${n.seal?`<div class="seal">${xn(n.seal)}</div>`:""}
    </div>
    <p class="ch2-hook">${xn(n.hook)}</p>
    <p class="ch2-narr">${xn(n.body[0]??"")}</p>
  `;const s=e("div","ch2-lines"),o=mc.map(E=>{const L=document.createElement("div");return L.className="ch2-line",L.innerHTML=`<span class="ch2-line-text">${xn(E.text)}</span><span class="ch2-line-name">${xn(E.label)}</span>`,s.appendChild(L),L}),a=e("div","ch2-card ch2-finale");a.innerHTML=`<p class="ch2-finale-text">${xn(n.body[1]??"")}</p>`;const l=e("div","ch2-caption"),c=e("div","ch2-cross"),u=document.createElement("i");c.appendChild(u),c.appendChild(document.createElement("b"));const h=e("div","ch2-floats"),f=e("div","ch2-guidedone");f.textContent="星路已明，自去吧";const d=e("div","ch2-complete");d.textContent="三千年前的那首歌，你也唱完了";const p=e("div","ch2-scroll");p.innerHTML=`
    <div class="ch2-scroll-head"><span>唤星</span><b class="ch2-scroll-total">0 / 309</b></div>
    <div class="ch2-scroll-body"></div>
    <div class="ch2-scroll-foot">
      <span class="ch2-scroll-count">你已唤醒 0 颗</span>
      <button type="button" class="ch2-retreat">归隐</button>
    </div>
    <div class="ch2-badge"><i>歌成</i></div>
  `;const g=p.querySelector(".ch2-scroll-body"),m=p.querySelector(".ch2-scroll-total"),v=p.querySelector(".ch2-scroll-count"),_=p.querySelector(".ch2-retreat"),w=new Map;for(const E of Oa){const L=document.createElement("div");L.className="ch2-region",L.innerHTML=`<span>${E.name}</span><i class="ch2-region-bar"><b></b></i><em>0/0</em>`,g.appendChild(L),w.set(E.key,{bar:L.querySelector(".ch2-region-bar b"),num:L.querySelector("em")})}const x=e("div","ch2-card ch2-explore");x.innerHTML=`
    <h2>现在，把星空交给你</h2>
    <p>${xn(n.body[2]??"")}</p>
  `;const S=e("div","atlas-hint");S.textContent="拖拽环视 · 点击或凝视沉睡的星";let k=null,T=[];const A=new Map;Promise.all([fetch(zn("data/poem.json")).then(E=>E.ok?E.json():null),fetch(zn("data/stars.json")).then(E=>E.ok?E.json():null),fetch(zn("data/asterisms.json")).then(E=>E.ok?E.json():null)]).then(([E,L,K])=>{if(k=E,!L||!K)return;const pt=new Map(L.stars.map(wt=>[wt.hip,wt])),Tt=[];for(const wt of K.asterisms){const de=wt.stars.map(wi=>pt.get(wi)).filter(wi=>wi!==void 0),Cn=Bh(de);if(!Cn)continue;const[Of,Lf,zf]=Ge(Cn.ra,Cn.dec,ea);let Fo=3,Ts=null;for(const wi of de)Fo=Math.max(Fo,So(Cn,wi)),(Ts===null||wi.mag<Ts)&&(Ts=wi.mag);const Df=Math.max(6,ea*Math.tan(Fo*Math.PI/180)*1.35);Tt.push({name:wt.name,region:E!=null&&E[wt.name]?Fh(E[wt.name].from):null,ra:Cn.ra,dec:Cn.dec,x:Of,y:Lf,z:zf,ring:Df,mag:Ts})}T=Tt,A.clear();for(const wt of Tt)A.set(wt.name,wt);he(),C===Mn&&ye()}).catch(()=>{});let C=-1,P=0;const B=new Set(We());let y=B.size>0&&Xr(B)===null,I=0,F=0,G=null,N=0;const $=new Ve;let O=!1,z=0,b=null,Y=!1,U=[],D=null,W=null,V=null,et=null,X=null,_t=0,St=0;const mt=new Set;let It=0,Ct=!1;const j=new Ve;let rt=null,Yt="",ie=8,M=!1,At=null,ce=!1,me=!1,yt=!1,ft=!1,Nt=!1,ue=!1,Ft=!1,bn=-2,Rt=!1;function We(){try{return Yh(window.localStorage.getItem(Ma))}catch{return[]}}function ke(){try{window.localStorage.setItem(Ma,JSON.stringify([...B]))}catch{}}function Oe(){return T.length>0?T.length:r.sky.groupCount}function Kn(E){const L=r.sky.groupCount;for(let K=0;K<L;K++)r.sky.setGroupProgress(K,E)}function Lt(){const E=r.sky.groupCount;for(let L=0;L<E;L++)r.sky.setGroupProgress(L,zh);for(const L of B)r.sky.setGroupProgress(L,1)}function Nn(E){ce!==E&&(ce=E,i.classList.toggle("on",E))}function Le(E){me!==E&&(me=E,a.classList.toggle("on",E))}function vn(E){yt!==E&&(yt=E,x.classList.toggle("on",E))}function wn(E){ft!==E&&(ft=E,S.classList.toggle("on",E))}function Xe(E){bn!==E&&(bn=E,o.forEach((L,K)=>L.classList.toggle("on",K===E)))}function qe(E){const L=E!==null;L&&(l.textContent=E),!(Nt===L&&!L)&&(Nt=L,l.classList.toggle("on",L))}function st(E){ue!==E&&(ue=E,c.classList.toggle("on",E),E||ln(0))}function ln(E){const L=Aa(E);u.style.borderColor=L>0?`rgba(201, 162, 39, ${.55+.45*L})`:"",u.style.transform=L>0?`scale(${1+.3*L})`:"",u.style.boxShadow=L>0?`0 0 ${8+10*L}px rgba(201, 162, 39, ${.3+.5*L})`:""}function _e(E){Ft!==E&&(Ft=E,p.classList.toggle("on",E))}function ze(E,L){E.classList.remove(L),E.offsetWidth,E.classList.add(L)}function he(){const E={ziwei:0,taiwei:0,tianshi:0,qinglong:0,xuanwu:0,baihu:0,zhuque:0},L={...E};for(const pt of T)pt.region&&(L[pt.region]+=1,B.has(pt.name)&&(E[pt.region]+=1));for(const pt of Oa){const Tt=w.get(pt.key);if(!Tt)continue;const wt=L[pt.key],de=E[pt.key];Tt.bar.style.width=wt>0?`${(de/wt*100).toFixed(1)}%`:"0%",Tt.num.textContent=`${de}/${wt}`}const K=Oe();m.textContent=K>0?`${B.size} / ${K}`:`${B.size} / —`,v.textContent=`你已唤醒 ${B.size} 颗`}function Fn(){if(At)return At;const E=document.createElement("canvas");E.width=E.height=128;const L=E.getContext("2d");return L.strokeStyle="rgba(240, 205, 110, 0.95)",L.lineWidth=6,L.shadowColor="rgba(201, 162, 39, 0.9)",L.shadowBlur=14,L.beginPath(),L.arc(64,64,48,0,Math.PI*2),L.stroke(),At=new Oo(E),At}function $n(E,L,K,pt){const Tt=`${E.toFixed(1)},${L.toFixed(1)},${K.toFixed(1)},${pt.toFixed(1)}`;if(rt&&Yt===Tt)return;fe();const wt=new Ka({map:Fn(),transparent:!0,depthTest:!1,depthWrite:!1,opacity:.9}),de=new Za(wt);de.position.set(E,L,K),de.scale.set(pt,pt,1),de.renderOrder=998,r.sky.addSkyObject(de),rt=de,Yt=Tt,ie=pt}function fe(){rt&&(r.sky.removeSkyObject(rt),rt.material.dispose(),rt=null,Yt="")}function Bn(){et!==null&&(clearTimeout(et),et=null)}function nt(){for(const E of U)E.kill();U=[]}function Z(E,L){const K={v:0},pt=Vt.to(K,{v:1,duration:L,ease:"power1.out",onUpdate:()=>r.sky.setGroupProgress(E,K.v),onComplete:()=>{U=U.filter(Tt=>Tt!==pt)}});U.push(pt)}function ut(){return zs+eg*Math.min(I,3)}const H={v:zs};function tt(E,L){D==null||D.kill(),D=Vt.to(H,{v:E,duration:L,ease:"power2.out",onUpdate:()=>r.sky.setBloom({strength:H.v}),onComplete:()=>{D=null}})}function Q(){D==null||D.kill(),H.v=tg,r.sky.setBloom({strength:H.v}),tt(ut(),.8)}const J={v:1};function jt(){W==null||W.kill(),J.v=.5,r.sky.setTimeScale(.5),W=Vt.to(J,{v:1,delay:.4,duration:.6,ease:"power2.inOut",onUpdate:()=>r.sky.setTimeScale(J.v),onComplete:()=>{W=null}})}function ht(){W&&(W.kill(),W=null),J.v!==1&&(J.v=1,r.sky.setTimeScale(1))}function $t(E){const L=k==null?void 0:k[E.name],K=document.createElement("div");K.className="ch2-poemfloat";const pt=L?Gh(L.text,2):E.name,Tt=L?`《步天歌》 · ${L.from}`:"";K.innerHTML=`<span class="ch2-poemfloat-text">${xn(pt)}</span>${Tt?`<span class="ch2-poemfloat-from">${xn(Tt)}</span>`:""}`;const wt=yu([E.x,E.y,E.z],r.sky.camera,{width:window.innerWidth,height:window.innerHeight}),de=wt?wt.x+40:window.innerWidth*.62,Cn=wt?wt.y:window.innerHeight*.42;K.style.left=`${Math.min(Math.max(de,110),window.innerWidth-110)}px`,K.style.top=`${Math.min(Math.max(Cn,140),window.innerHeight-140)}px`,h.appendChild(K),mt.add(K),K.addEventListener("animationend",()=>{mt.delete(K),K.remove()})}function re(){mt.forEach(E=>E.remove()),mt.clear()}function zt(E){const L=A.get(E);if(!L||C===Wr||($n(L.x,L.y,L.z,L.ring),!rt))return;V==null||V.kill(),M=!0;const K={o:0};rt.material.opacity=0,V=Vt.to(K,{o:.8,duration:.9,ease:"sine.inOut",yoyo:!0,repeat:1,onUpdate:()=>{rt&&(rt.material.opacity=K.o)},onComplete:()=>{V=null,M=!1,fe()}})}function Mt(){b||(b=Z0()),Y||(r.sky.addSkyObject(b.group),Y=!0)}function gt(){return C!==Mn?null:Xr(B)}function ye(){if(C!==Mn)return;const E=Xr(B);if(E){const L=bl.indexOf(E);qe(`第${og[L]??L+1}站 · 「${E}」——跟着星使：点它，或凝视它`);const K=A.get(E);K&&(Mt(),b.setVisible(!0),b.flyTo({x:K.x,y:K.y,z:K.z}));return}qe(null),y||(y=!0,Ot())}function Ot(){ze(f,"on"),b&&(b.pulse(1),Bn(),et=setTimeout(()=>{et=null,b==null||b.setVisible(!1)},ig))}function be(E){if(!Ra(E,gt(),B))return;const L=A.get(E);B.add(E),ke(),r.sky.hideDetailCard(),jt(),Z(E,1.1),L&&(r.sky.spawnBurst({x:L.x,y:L.y,z:L.z},{count:90}),$t(L),yc(Hh(L.mag??4.5),.9,.85)),Q(),b&&C===Mn&&b.pulse(1),F=0,G=null,N=0,he(),cn(),ye()}function cn(){const E=so(B.size,Oe());if(!(E<=I)){if(I=E,I>=4){Jt();return}tt(ut(),1.5),r.sky.spawnMeteors(I)}}function Jt(){tt(ut(),1.5),r.sky.spawnMeteors(8),ze(d,"on"),p.classList.add("done"),yc(523.25,1.4,.8)}function te(){B.clear(),ke(),y=!1,I=0,Bn(),f.classList.remove("on"),d.classList.remove("on"),p.classList.remove("done"),nt(),tt(zs,.9),Lt(),F=0,G=null,N=0,z=0,he(),C===Mn&&ye()}_.addEventListener("click",te);function se(E){if(N=0,!E||C!==Mn&&C!==Pa)return;const L=E.info.name;Ra(L,gt(),B)&&be(L)}const un=new it;function bi(){return r.sky.camera.getWorldDirection(un),{ra:Math.atan2(un.z,un.x)*180/Math.PI,dec:Math.asin(Math.min(1,Math.max(-1,un.y)))*180/Math.PI}}function Qt(){return C===Mn||C===Pa}function Xt(E){if(!Qt()||T.length===0||E<=0)return;const L=bi(),pt=gt()??La(T,B,L),Tt=pt?A.get(pt):null,wt=Tt?So(L,Tt):1/0;st(Tt!==null&&wt<J0),Tt&&wt<Dh?(G!==Tt.name&&(G=Tt.name,F=0),F+=E,ln(F/ro),F>=ro&&(ln(0),be(Tt.name))):(F>0||G!==null)&&(F=0,G=null,ln(0))}function hn(E){if(!Qt()||gt()!==null||T.length===0){N=0;return}const L=r.sky.camera.quaternion;if(!O){O=!0,$.copy(L);return}if($.angleTo(L)>4e-4){N=0,$.copy(L);return}if(N+=E,N>=Ih){N=0;const K=La(T,B,bi());K&&zt(K)}}function Cr(E){if(!Qt()||I<1)return;const L=ng[Math.min(I,4)-1];if(z<=0){z=E+L;return}E>=z&&(z=E+L,r.sky.spawnMeteors(1))}function Mr(E){_t=requestAnimationFrame(Mr);const L=St>0?Math.min((E-St)/1e3,.1):0;if(St=E,b&&Y&&(b.update(L),C===Mn&&gt()!==null)){const K=.35+.2*Math.sin(E*.003);b.pulse(Math.min(1,K+F/ro*.5))}if(Xt(L),hn(L),Cr(E),rt&&!M){const K=ie*(1+.13*Math.sin(E*.0024));rt.scale.set(K,K,1),rt.material.opacity=.7+.3*Math.sin(E*.0024+1)}}function vi(E){E===Wr?(r.sky.setPickingEnabled(!1),r.sky.setLabelsEnabled(!0),r.sky.setHoverTipEnabled(!0),Kn(0),Rt=!1,qe(null),st(!1),_e(!1),vn(!1),wn(!1),b==null||b.setVisible(!1),fe()):E===Mn?(r.sky.setPickingEnabled(!0),r.sky.setLabelsEnabled(!1),r.sky.setHoverTipEnabled(!0),Nn(!1),Xe(-1),Le(!1),vn(!1),wn(!1),fe(),Lt(),I=so(B.size,Oe()),r.sky.setBloom({strength:ut()}),p.classList.toggle("done",I>=4),y=Xr(B)===null,he(),_e(!0),ye()):(r.sky.setPickingEnabled(!0),r.sky.setLabelsEnabled(!0),r.sky.setHoverTipEnabled(!0),Nn(!1),Xe(-1),Le(!1),qe(null),b==null||b.setVisible(!1),fe(),Lt(),I=so(B.size,Oe()),r.sky.setBloom({strength:ut()}),p.classList.toggle("done",I>=4),he(),_e(!0),vn(!0),wn(!0))}function fn(E){const L=za(E);(L.finale>0||Rt)&&(Kn(L.finale),Rt=L.finale>0),L.lines.forEach((pt,Tt)=>{const wt=mc[Tt];if(!wt)return;const de=Math.max(L.finale,Tt===L.active?pt:pt*.15);for(const Cn of wt.groups)r.sky.setGroupProgress(Cn,de)}),Nn(E<Oi);const K=E>=Oi&&E<gr?L.active:-1;if(Xe(K),K>=0){const pt=rg[K];if(pt){const[Tt,wt,de]=Ge(pt.ra,pt.dec,ea);$n(Tt,wt,de,pt.ring)}}else fe();Le(E>=gr)}function Zn(E){P=E;const L=Nh(E);L!==C&&(C=L,vi(L)),C===Wr&&fn(E)}function Ki(E){const L=C===Wr&&P>=Oi&&P<gr?za(P).active:-1,K=L>=0?.85:0;if(It+=(K-It)*(1-Math.exp(-3*E)),It<.01){Ct&&(Ct=!1,r.sky.setGazeBlend(0));return}const pt=sg[Math.max(L,0)];Ct?j.slerp(pt,1-Math.exp(-2.5*E)):(Ct=!0,j.copy(pt)),r.sky.setGazeBlend(It,j)}return{enter(){r.root.classList.add("inview"),X==null||X(),X=r.sky.onPick(se),_t&&cancelAnimationFrame(_t),St=0,_t=requestAnimationFrame(Mr),Zn(P)},update(E){Zn(E)},frame(E){Ki(E)},exit(){r.root.classList.remove("inview"),cancelAnimationFrame(_t),_t=0,St=0,X==null||X(),X=null,Bn(),nt(),V==null||V.kill(),V=null,M=!1,ht(),D&&(D.kill(),D=null),r.sky.setBloom({strength:zs}),fe(),At==null||At.dispose(),At=null,b&&Y&&(b.setVisible(!1),r.sky.removeSkyObject(b.group),Y=!1),re(),f.classList.remove("on"),d.classList.remove("on"),F=0,G=null,N=0,O=!1,z=0,It=0,Ct=!1,r.sky.setGazeBlend(0),r.sky.setLabelsEnabled(!0),r.sky.setHoverTipEnabled(!0),r.sky.setPickingEnabled(!1);for(const E of B)r.sky.setGroupProgress(E,1);Nn(!1),Xe(-1),Le(!1),qe(null),st(!1),_e(!1),vn(!1),wn(!1),C=-1,Ze==null||Ze.suspend()}}}const hg=Object.freeze(Object.defineProperty({__proto__:null,CH2_GAZE_ANGLE_DEG:Dh,CH2_GAZE_HOLD_S:ro,CH2_GUIDE_STATIONS:bl,CH2_IDLE_PULSE_S:Ih,CH2_REGIONS:Oa,CH2_SEG1_END:yl,CH2_SEG1_LINE_COUNT:io,CH2_SEG2_END:Lh,CH2_SLEEP_DIM:zh,CH2_STORAGE_KEY:Ma,CH2_UNLOCKS:$h,ch2AngularDistanceDeg:So,ch2CanAwaken:Ra,ch2Centroid:Bh,ch2GuideTarget:Xr,ch2NearestSleeping:La,ch2ParseAwakened:Yh,ch2PluckFreq:Hh,ch2PoemExcerpt:Gh,ch2RegionOf:Fh,ch2Seg1LineStates:za,ch2SegmentOf:Nh,ch2UnlockTier:so,createChapter:ug},Symbol.toStringTag,{value:"Module"})),Wh=Math.PI/180,fg=34.7,Xh=8,cr=355,Da=["冬至","小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪"];function dg(r){return-23.44*Math.cos(2*Math.PI*(r+10)/365.25)}function Ia(r){return 90-Math.abs(fg-dg(r))}function bc(r){return Xh/Math.tan(Ia(r)*Wh)}function pg(r){let t=0,n=999,e=0;for(let i=0;i<Da.length;i++){const s=(cr+i*15.22)%365;let o=r-s;o>182.5?o-=365:o<-182.5&&(o+=365),Math.abs(o)<n&&(n=Math.abs(o),t=i,e=o)}return{name:Da[t],index:t,day:(cr+t*15.22)%365,offset:Math.round(e)}}function gg(r){const t=[31,28,31,30,31,30,31,31,30,31,30,31];let n=Math.min(Math.max(Math.round(r),1),365),e=0;for(;e<11&&n>t[e];)n-=t[e],e++;return{month:e+1,day:n}}const Ds=["零","一","二","三","四","五","六","七","八","九"];function na(r){if(r<10)return Ds[r];if(r<20)return"十"+(r%10?Ds[r%10]:"");const t=Math.floor(r/10);return Ds[t]+"十"+(r%10?Ds[r%10]:"")}function Ji(r){return r-Math.floor(r)}function mg(r,t,n,e,i,s){r.beginPath(),r.moveTo(t+s,n),r.arcTo(t+e,n,t+e,n+i,s),r.arcTo(t+e,n+i,t,n+i,s),r.arcTo(t,n+i,t,n,s),r.arcTo(t,n,t+e,n,s),r.closePath()}function _g(){const r=document.createElement("canvas");r.width=64,r.height=64;const t=r.getContext("2d");if(t){const n=t.createRadialGradient(32,32,2,32,32,32);n.addColorStop(0,"rgba(252, 225, 182, 0.9)"),n.addColorStop(.3,"rgba(252, 225, 182, 0.25)"),n.addColorStop(1,"rgba(252, 225, 182, 0)"),t.fillStyle=n,t.fillRect(0,0,64,64)}return r}const tr=8,Ei=15,yg=`
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
`;let vc=!1;function bg(){if(vc||typeof document>"u")return;const r=document.createElement("style");r.dataset.gnomonWidget="",r.textContent=yg,document.head.appendChild(r),vc=!0}function vg(r={}){bg();const t=document.createElement("div");t.className="gw",t.setAttribute("role","group"),t.setAttribute("aria-label","圭表测影：拖动滑杆查看一年中正午日影变化");const n=document.createElement("canvas");n.className="gw-canvas",t.appendChild(n);const e=document.createElement("div");e.className="gw-readout",e.innerHTML=`
    <div class="gw-cell"><span class="gw-k">日期</span><span class="gw-v" data-r="date">——</span></div>
    <div class="gw-cell"><span class="gw-k">节气</span><span class="gw-v" data-r="term">——</span></div>
    <div class="gw-cell"><span class="gw-k">正午影长</span><span class="gw-v" data-r="shadow">——</span></div>
    <div class="gw-cell"><span class="gw-k">太阳高度</span><span class="gw-v" data-r="alt">——</span></div>`,t.appendChild(e);const i=e.querySelector('[data-r="date"]'),s=e.querySelector('[data-r="term"]'),o=e.querySelector('[data-r="shadow"]'),a=e.querySelector('[data-r="alt"]'),l=document.createElement("div");l.className="gw-slider-wrap";const c=document.createElement("input");c.className="gw-slider",c.type="range",c.min="1",c.max="365",c.step="1",c.value=String(cr),c.setAttribute("aria-label","一年中的第几天"),l.appendChild(c);const u=document.createElement("div");u.className="gw-marks";for(const y of["冬至","春分","夏至","秋分"]){const I=Da.indexOf(y),F=(cr+I*15.22)%365,G=(F-1)/364,N=`calc(7px + (100% - 14px) * ${G.toFixed(4)})`,$=document.createElement("i");$.className="gw-tick",$.style.left=N,u.appendChild($);const O=document.createElement("button");O.type="button",O.className="gw-mark"+(G<.08?" gw-mark--start":G>.92?" gw-mark--end":""),O.style.left=N,O.textContent=y,O.title=`跳至${y}（第 ${Math.round(F)} 天）`,O.addEventListener("click",()=>k(Math.round(F))),u.appendChild(O)}l.appendChild(u),t.appendChild(l);const h=n.getContext("2d");if(!h){const y=document.createElement("p");y.className="gw-fallback",y.textContent="当前浏览器无法创建绘图上下文，圭表测影演示不可用。",n.replaceWith(y)}const f=_g(),d=Array.from({length:14},(y,I)=>({rx:Ji(Math.sin(I*12.9898)*43758.5453),ry:Ji(Math.sin(I*78.233)*12543.217),len:.1+.25*Ji(Math.sin(I*3.7)*9876.543),dark:I%2===0})),p=Array.from({length:5},(y,I)=>({dx:-.3+.6*Ji(Math.sin(I*5.13)*3210.7),ry:.12+.76*Ji(Math.sin(I*9.31)*7777.7),h:.08+.12*Ji(Math.sin(I*2.17)*5555.5)}));let g=cr,m=cr,v=!1,_=!0,w=0,x=0,S=0;function k(y){m=Math.min(Math.max(y,1),365),T()}function T(){w||(w=requestAnimationFrame(A))}function A(){var G;w=0;const y=g,I=m-g;g=Math.abs(I)<.04?m:g+I*.2;const F=g!==y;(F||_)&&(C(),P(),_=!1),F&&((G=r.onDayChange)==null||G.call(r,g)),g!==m&&(w=requestAnimationFrame(A))}function C(){const y=Math.min(Math.max(Math.round(g),1),365),I=gg(y);i.textContent=`${I.month} 月 ${I.day} 日 · 第 ${y} 天`;const F=pg(y);s.textContent=F.offset===0?`正值【${F.name}】`:F.offset>0?`【${F.name}】后 ${F.offset} 天`:`距【${F.name}】 ${-F.offset} 天`;const G=bc(g);let N=Math.floor(G),$=Math.round((G-N)*10);$===10&&(N+=1,$=0),o.textContent=`${na(N)}尺${$>0?na($)+"寸":"整"} · ${G.toFixed(2)} 尺`,a.textContent=`${Ia(g).toFixed(1)}°`,!v&&document.activeElement!==c&&(c.value=String(y))}function P(){if(!h||x<60||S<60)return;const y=h,I=x,F=S;y.clearRect(0,0,I,F);const G=y.createLinearGradient(0,0,0,F);G.addColorStop(0,"rgba(22, 38, 56, 0.5)"),G.addColorStop(.6,"rgba(13, 13, 17, 0.12)"),G.addColorStop(1,"rgba(13, 13, 17, 0.4)"),y.fillStyle=G,y.fillRect(0,0,I,F);const N=bc(g),$=Ia(g),O=Math.min(Math.max($,6),82)*Wh,z=F-62,b=Math.min((I-150)/14.2,(z-92)/8),Y=Xh*b,U=13.6*b,D=(I-U-110)/2+100,W=z-Y,V=D+N*b,et=D-12,X=D+U,_t=y.createRadialGradient(D-60,z,0,D-60,z,220);_t.addColorStop(0,`rgba(252, 225, 182, ${(.05+.04*Math.sin(O)).toFixed(3)})`),_t.addColorStop(1,"rgba(252, 225, 182, 0)"),y.fillStyle=_t,y.fillRect(0,z-160,I,200),y.strokeStyle="rgba(175, 145, 95, 0.35)",y.lineWidth=1,y.beginPath(),y.moveTo(14,z+Ei),y.lineTo(I-14,z+Ei),y.stroke();const St=y.createLinearGradient(0,z,0,z+tr);St.addColorStop(0,"#3b4552"),St.addColorStop(1,"#252d38"),y.fillStyle=St,mg(y,et,z,X-et,tr,2.5),y.fill();const mt=y.createLinearGradient(0,z+tr,0,z+Ei);mt.addColorStop(0,"#1a212b"),mt.addColorStop(1,"#10151d"),y.fillStyle=mt,y.fillRect(et,z+tr,X-et,Ei-tr),y.strokeStyle="rgba(252, 225, 182, 0.14)",y.beginPath(),y.moveTo(et+2,z+.5),y.lineTo(X-2,z+.5),y.stroke();for(const ft of d){const Nt=et+6+ft.rx*(X-et-12),ue=z+1.5+ft.ry*(Ei-3);y.strokeStyle=ft.dark?"rgba(0, 0, 0, 0.16)":"rgba(252, 225, 182, 0.05)",y.beginPath(),y.moveTo(Nt,ue),y.lineTo(Nt+ft.len*40,ue),y.stroke()}const It=b>=26;y.lineWidth=1;for(let ft=0;ft<=136;ft++){const Nt=ft%10===0;if(!Nt&&!It&&ft%5!==0)continue;const ue=D+ft*b/10;if(ue>X-1.5)break;const Ft=Nt?6:ft%5===0?4:2.5;y.strokeStyle=Nt?"rgba(8, 10, 14, 0.9)":"rgba(8, 10, 14, 0.6)",y.beginPath(),y.moveTo(ue,z+1),y.lineTo(ue,z+1+Ft),y.stroke()}y.font='9px "STSong", "SimSun", "Songti SC", serif',y.fillStyle="rgba(175, 145, 95, 0.9)",y.textAlign="center",y.textBaseline="top";for(let ft=0;ft<=13;ft++){const Nt=D+ft*b;if(Nt>X-2)break;y.fillText(na(ft),Nt,z+Ei+4)}const Ct=y.createLinearGradient(D,0,V,0);Ct.addColorStop(0,"rgba(3, 5, 9, 0.78)"),Ct.addColorStop(.75,"rgba(3, 5, 9, 0.55)"),Ct.addColorStop(1,"rgba(3, 5, 9, 0.15)"),y.fillStyle=Ct,y.fillRect(D,z+1,Math.max(V-D,1.5),tr-1),y.strokeStyle="#c9a227",y.lineWidth=1.5,y.beginPath(),y.moveTo(V,z-4),y.lineTo(V,z+Ei),y.stroke(),y.save(),y.translate(V,z-7),y.rotate(Math.PI/4),y.fillStyle="#c9a227",y.fillRect(-2.4,-2.4,4.8,4.8),y.restore();const j=Math.max(6,b*.38),rt=y.createLinearGradient(D-j/2,0,D+j/2,0);rt.addColorStop(0,"#3f2e1a"),rt.addColorStop(.35,"#a87f3d"),rt.addColorStop(.5,"#dcba68"),rt.addColorStop(.65,"#a87f3d"),rt.addColorStop(1,"#372812"),y.fillStyle=rt,y.fillRect(D-j/2,W,j,Y);for(const ft of p)y.fillStyle="rgba(112, 148, 126, 0.14)",y.fillRect(D+ft.dx*j-.75,W+ft.ry*Y,1.5,ft.h*Y);y.fillStyle="#8a6a35",y.beginPath(),y.moveTo(D-j*.85,W),y.lineTo(D-j*.42,W-6),y.lineTo(D+j*.42,W-6),y.lineTo(D+j*.85,W),y.closePath(),y.fill(),y.strokeStyle="rgba(252, 225, 182, 0.35)",y.lineWidth=1,y.beginPath(),y.moveTo(D-j*.42,W-6),y.lineTo(D+j*.42,W-6),y.stroke();const Yt=y.createLinearGradient(0,z-11,0,z);Yt.addColorStop(0,"#5a4423"),Yt.addColorStop(1,"#2c2010"),y.fillStyle=Yt,y.beginPath(),y.moveTo(D-j*.8,z-11),y.lineTo(D+j*.8,z-11),y.lineTo(D+j*1.7,z),y.lineTo(D-j*1.7,z),y.closePath(),y.fill(),y.font='10px "STSong", "SimSun", "Songti SC", serif',y.fillStyle="rgba(201, 162, 39, 0.8)",y.textAlign="center",y.textBaseline="top";const ie=D-j/2-11;"表高八尺".split("").forEach((ft,Nt)=>{y.fillText(ft,ie,W+18+Nt*13)});const M=-Math.cos(O),At=-Math.sin(O);let ce=Math.min(170,(W-28)/Math.sin(O),(D-30)/Math.cos(O));ce=Math.max(ce,26);const me=D+M*ce,yt=W+At*ce;y.drawImage(f,me-30,yt-30,60,60),y.fillStyle="#fce1b6",y.beginPath(),y.arc(me,yt,8.5,0,Math.PI*2),y.fill(),y.strokeStyle="rgba(201, 162, 39, 0.75)",y.lineWidth=1,y.beginPath(),y.arc(me,yt,11.5,0,Math.PI*2),y.stroke(),y.strokeStyle="rgba(252, 225, 182, 0.4)",y.beginPath(),y.moveTo(me-M*12,yt-At*12),y.lineTo(D,W),y.stroke(),y.setLineDash([3,4]),y.strokeStyle="rgba(252, 225, 182, 0.22)",y.beginPath(),y.moveTo(D,W),y.lineTo(V,z),y.stroke(),y.setLineDash([])}c.addEventListener("input",()=>{const y=Number(c.value);m=y,v||(g=y),T()}),c.addEventListener("pointerdown",()=>{v=!0}),window.addEventListener("pointerup",()=>{v=!1}),window.addEventListener("pointercancel",()=>{v=!1});function B(){const y=n.clientWidth,I=n.clientHeight;if(!(y===x&&I===S)){if(x=y,S=I,h&&y>0&&I>0){const F=Math.min(window.devicePixelRatio||1,2);n.width=Math.round(y*F),n.height=Math.round(I*F),h.setTransform(F,0,0,F,0,0)}_=!0,T()}}return typeof ResizeObserver<"u"?new ResizeObserver(B).observe(n):window.addEventListener("resize",B),B(),{el:t,get day(){return g},setDayTarget:k}}const wg=`
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
`;let wc=!1;function xg(){if(wc||typeof document>"u")return;const r=document.createElement("style");r.dataset.gnomonLayout="",r.textContent=wg,document.head.appendChild(r),wc=!0}function Or(r){return r.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function xc(r){return r/365*Math.PI*2}function Sg(r){const t=r.root.querySelector(".pin"),{copy:n}=r,e=document.createElement("div");e.className="gnomon-layout";const i=document.createElement("div");i.className="chapter-panel",i.innerHTML=`
    <p class="eyebrow">${Or(n.eyebrow)}</p>
    <div class="chapter-head">
      <h2>${Or(n.title)}</h2>
      ${n.seal?`<div class="seal">${Or(n.seal)}</div>`:""}
    </div>
    <p class="hook">${Or(n.hook)}</p>
    ${n.body.map(a=>`<p>${Or(a)}</p>`).join("")}
  `,e.appendChild(i);let s=!1;const o=vg({onDayChange:a=>{s&&r.sky.setSkyRotation(xc(a),0)}});return e.appendChild(o.el),t.appendChild(e),xg(),{enter(){s=!0,r.root.classList.add("inview"),r.sky.setLabelsEnabled(!1),r.sky.setSkyRotation(xc(o.day),0)},update(a){const l=Math.min(Math.max(a,0),1);o.setDayTarget(1+l*364)},exit(){s=!1,r.root.classList.remove("inview"),r.sky.setLabelsEnabled(!0),r.sky.setSkyRotation(0,0)}}}const Tg=Object.freeze(Object.defineProperty({__proto__:null,createChapter:Sg},Symbol.toStringTag,{value:"Module"})),kg={ch1:{eyebrow:"其壹 · 序 PROLOGUE",title:"步天歌",hook:"三千年前，中国人开始给星星命名。",body:["先民把群星分作星官，各有职司。到三国陈卓汇总三家星经时，这张名单已录下二百八十三官、一千四百六十余星。","《步天歌》是把整张星表写成的长诗，一句一宿，循诗可以认星。本站以它为题，把这份名录还原成一片可以走进去的夜空。","向下滚动，步入夜空。"],seal:"步"},ch2:{eyebrow:"其贰 · 唤星之旅 THE AWAKENING",title:"唤星之旅",hook:"夜空睡着了。跟着流萤，把星星一颗颗唤回来。",body:["古人认星，靠一首歌。《步天歌》把全天星官谱成韵语，一句一宿，循诗可以认星。","三垣居中，四象环列——中国人给天空立的法。","余下的星，由你亲手唤醒。拖拽环视，点击或凝视任意一颗沉睡的星，听听它的那句诗。"],seal:"唤"},ch3:{eyebrow:"其叁 · 观象授时 THE GNOMON",title:"观象授时",hook:"一根八尺之表，一条量影之圭，就是一个王朝的天文台。",body:["正午测日影：影最长的那一天是冬至，最短的那一天是夏至。两至既定，四时均分，二十四节气由此排出。","河南登封至今立着这件仪器的放大版：元代郭守敬所建观星台，以高表测影，为《授时历》测得回归年长 365.2425 日——与三百年后的格里历相同。","所谓观象授时：历法的权威，来自对天空的测量。"],seal:"表"},ch4:{eyebrow:"其肆 · 天人之间 THE POLE STAR",title:"天人之间",hook:"全天最尊贵的星域，围着北极建了一座城。",body:["紫微垣，天上的宫城：左右两垣为墙，墙内住着皇族、帝座与百官。","天的秩序映照人的秩序——星官有名有职，如同朝廷。观星，也是观天下。"],seal:"极"},ch5:{eyebrow:"其伍 · 天球仪 THE CELESTIAL SPHERE",title:"天球仪",hook:"「浑天如鸡子，天体圆如弹丸，地如鸡中黄。」——张衡《浑天仪注》",body:["东汉张衡造浑天仪：铜球缀列星，绕轴而转，演示周天星象的起落。天，被做成一颗可以转动的球。","在这里，平面的星图重新团回天球。用你的手指转动它，像转动一件两千年前的仪器。"],seal:"球"},ch6:{eyebrow:"其陆 · 岁差 PRECESSION",title:"一万年",hook:"地轴是一支缓慢摇晃的陀螺，约两万六千年才转完一圈。",body:["东晋虞喜最先察觉：冬至点每年都在悄悄西移，约五十年退一度。他称之为「岁差」——天自为天，岁自为岁。","于是北极星也会换届：三千年前，周的天下以「帝星」（小熊座β）为北辰；今夜属于勾陈一；一万年后，织女星将接过这个位置。","拖动时间，看天极在星空中缓缓画出一个圆。"],seal:"岁"},ch7:{eyebrow:"其柒 · 东西对话 EAST MEETS WEST",title:"东西对话",hook:"同一片星空，两种秩序各自连线。",body:["中国的天狼是一颗独坐的星官，守在南方朱雀的井宿之野，主侵掠；在希腊人的图上，它是大犬座 α，猎户脚边的猎犬。","中国的织女是银河西岸的织女星官，七夕故事的主角；在西方，她是天琴座 α——俄耳甫斯的竖琴。","北斗七星在中国是帝车，运于中央、临制四方；同七颗星，在西方只是大熊的尾巴与后臀。"],seal:"会"},ch8:{eyebrow:"其捌 · 尾声 CREDITS",title:"尾声",hook:"缘起于一首旧诗，收束于一页致谢。",body:["本作品以《步天歌》为题——一卷把星官谱成韵语、便于记诵认星的旧诗。","数据、开源技术与制作说明列于下方。本站为中国大学生计算机设计大赛参赛作品（信息可视化设计类）。","千年之后，诗里的星仍在原处，我们只是换了一种读法。"],seal:"跋"}},Is=[{key:"北极",groups:["北极"],title:"北极五星 · 皇族",story:"太子、帝、庶子、后宫、天枢——天皇一家，以星列位。",labels:[{text:"太子",star:"北极一"},{text:"帝",star:"北极二"},{text:"庶子",star:"北极三"},{text:"后宫",star:"北极四"},{text:"天枢",star:"北极五"}]},{key:"勾陈",groups:["勾陈"],title:"勾陈 · 后宫车马",story:"帝之后妃的车驾，形如弯钩。其中最亮的勾陈一，就是今夜的北极星。",labels:[{text:"勾陈一",star:"勾陈一"}]},{key:"帝座",groups:["天皇大帝","五帝内座"],title:"天皇大帝 · 帝座",story:"天皇大帝居中而御，五帝内座环侍在旁——天上至尊的宝座。",labels:[{text:"天皇大帝",star:"天皇大帝"}]},{key:"百官",groups:["尚书","大理","天柱"],title:"尚书 · 大理 · 天柱",story:"秘书、法官、政令——一座悬浮的朝廷。",labels:[{text:"尚书",star:"尚书一"},{text:"大理",star:"大理一"},{text:"天柱",star:"天柱一"}]},{key:"拱北",groups:[],title:"回望 · 众星拱北",story:"「譬如北辰，居其所而众星共之。」——《论语·为政》"}],Sc={heading:"数据与出处",groups:[{title:"数据来源",lines:["HYG Database v4.4 · CC BY-SA-4.0 · astronexus.com","许可协议：https://creativecommons.org/licenses/by-sa/4.0/","Stellarium 项目 · 中国星空文化数据","《步天歌》 · 丹元子 · 公有领域文本"]},{title:"开源技术",lines:["three.js","GSAP / ScrollTrigger","Vite","TypeScript","Noto Serif SC（思源宋体）· SIL OFL 1.1"]},{title:"制作说明",lines:["AI 辅助设计与编码","全部内容经人工校订"]}]};function Io(r){return Math.min(Math.max(r,0),1)}function Na(r){const t=Io(r);return t*t*(3-2*t)}const Xi=.12,$i=.92,Bi=5,vs=($i-Xi)/Bi,vl=Xi+4*vs,qh=.03,Vh=.45;function oo(r){const t=Io(r);return t<Xi?0:t>=$i?6:1+Math.min(Math.floor((t-Xi)/vs),Bi-1)}function Uh(r){return Io(r/Xi)}function jh(r,t){const n=Xi+t*vs;return Io((r-n)/(vs*Vh))}function Fa(r){const t=Na((r-(vl-.02))/.02),n=1-Na((r-$i)/.05);return t*n}function Qh(r,t){const n=new Set;let e=0;return t.map(i=>{if(i){const o=r.find(a=>!n.has(a.hip)&&a.name===i);if(o)return n.add(o.hip),o}for(;e<r.length&&n.has(r[e].hip);)e++;const s=r[e];return s?(n.add(s.hip),e++,s):null})}const Kh=[{ra:175,dec:81,radius:.35,fov:50,gazeW:.85},{ra:218.6,dec:76.8,radius:.55,fov:42,gazeW:.85},{ra:269.6,dec:86.5,radius:.55,fov:42,gazeW:.85},{ra:41.8,dec:81,radius:.55,fov:42,gazeW:.85},{ra:261.7,dec:75.5,radius:.55,fov:42,gazeW:.85},{ra:0,dec:89,radius:.55,fov:55,gazeW:.85}],To={radius:3,dir:[.52,.7,.49],fov:50},Tc=100,Eg=["紫微左垣","紫微右垣"],Cg=["第一站","第二站","第三站","第四站","第五站"],Mg="序 · 天上有座城",Pg=28,kc=44,Ns=60,Zh=Kh.map(r=>({dir:new it(...Ge(r.ra,r.dec,1)),radius:r.radius,fov:r.fov,gazeQ:ni(r.ra,r.dec),gazeW:r.gazeW})),Ag=new it(...To.dir).normalize(),Lr=Zh[Bi],Rg=`
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
  width: ${Pg}px; height: 1px;
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
`;let Ec=!1;function Og(){if(Ec||typeof document>"u")return;const r=document.createElement("style");r.dataset.ch4="",r.textContent=Rg,document.head.appendChild(r),Ec=!0}function zr(r){return r.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Lg(r){Og();const t=r.root.querySelector(".pin"),{copy:n}=r,e=document.createElement("div");e.className="ch4-card ch4-opening",e.innerHTML=`
    <p class="eyebrow">${zr(n.eyebrow)}</p>
    <div class="chapter-head">
      <h2>${zr(n.title)}</h2>
      ${n.seal?`<div class="seal">${zr(n.seal)}</div>`:""}
    </div>
    <p class="ch4-opening-tag">${Mg}</p>
    <p class="hook">${zr(n.hook)}</p>
    ${n.body.map(O=>`<p class="ch4-opening-body">${zr(O)}</p>`).join("")}
  `,t.appendChild(e);const i=document.createElement("div");i.className="ch4-card ch4-stop",i.innerHTML=`
    <p class="ch4-stop-tag"></p>
    <h3 class="ch4-stop-title"></h3>
    <p class="ch4-stop-story"></p>
  `,t.appendChild(i);const s=i.querySelector(".ch4-stop-tag"),o=i.querySelector(".ch4-stop-title"),a=i.querySelector(".ch4-stop-story"),l=document.createElement("div");l.className="ch4-layer";const c=[];Is.forEach((O,z)=>{(O.labels??[]).forEach((b,Y)=>{const U=document.createElement("div");U.className="ch4-tag";const D=document.createElement("i");D.className="ch4-tag-dot";const W=-90+Y*137.5,V=W*Math.PI/180,et=document.createElement("i");et.className="ch4-tag-line",et.style.transform=`rotate(${W}deg)`;const X=document.createElement("span");X.className="ch4-tag-name",X.textContent=b.text,X.style.transform=`translate(${Math.cos(V)*kc}px, ${Math.sin(V)*kc}px) translate(-50%, -50%)`,U.append(D,et,X),l.appendChild(U),c.push({el:U,stopIdx:z,labelIdx:Y,shown:!1})})}),t.appendChild(l);let u=null;Promise.all([fetch(zn("data/stars.json")).then(O=>O.ok?O.json():null),fetch(zn("data/asterisms.json")).then(O=>O.ok?O.json():null)]).then(([O,z])=>{if(!O||!z)return;const b=new Map(O.stars.map(U=>[U.hip,U])),Y=new Map(z.asterisms.map(U=>[U.name,U]));u=Is.map(U=>{const D=U.groups.flatMap(V=>{var et;return(((et=Y.get(V))==null?void 0:et.stars)??[]).map(X=>b.get(X)).filter(X=>X!==void 0)});return Qh(D,(U.labels??[]).map(V=>V.star)).map(V=>{if(!V)return null;const[et,X,_t]=Ge(V.ra,V.dec,Tc);return new it(et,X,_t)})})}).catch(()=>{});let h=!1,f=0,d=!1,p=.35,g=50;const m=new it(0,1,0),v=new Ve;let _=0,w=0,x=0,S=!1,k=-1;function T(O){S!==O&&(S=O,e.classList.toggle("on",O))}function A(O){if(k===O)return;if(k=O,O<0){i.classList.remove("on");return}const z=Is[O];z&&(s.textContent=Cg[O]??`第${O+1}站`,o.textContent=z.title,a.textContent=z.story,i.classList.add("on"),i.classList.remove("swap"),i.offsetWidth,i.classList.add("swap"))}function C(O,z){O.shown!==z&&(O.shown=z,O.el.classList.toggle("on",z))}function P(){for(const O of c)C(O,!1)}function B(O){f=O;const z=oo(O),b=Uh(O);for(const Y of Eg)r.sky.setGroupProgress(Y,b);Is.forEach((Y,U)=>{const D=jh(O,U);for(const W of Y.groups)r.sky.setGroupProgress(W,D)}),T(z===0),A(z>=1&&z<=Bi?z-1:z===6?Bi-1:-1)}const y=new it,I=new it;function F(O,z,b){const Y=Math.cos(z),U=Math.sin(z);return b.set(O.x*Y+O.z*U,O.y,-O.x*U+O.z*Y)}function G(O){const z=f,b=oo(z);let Y,U,D;const W=I;let V;if(b===6){const X=Na((z-$i)/(1-$i));Y=Pt.lerp(Lr.radius,To.radius,X),U=Pt.lerp(Lr.fov,To.fov,X),D=(1-X)*Lr.gazeW,W.copy(Lr.dir).lerp(Ag,X).normalize(),V=Lr.gazeQ}else{const X=Zh[b];Y=X.radius,U=X.fov,D=X.gazeW,W.copy(X.dir),V=X.gazeQ}if(!d){d=!0;const X=r.sky.camera;p=Math.max(X.position.length()/Tc,.005),g=X.fov,m.copy(X.position).normalize(),m.lengthSq()<1e-8&&m.set(0,1,0),v.copy(X.quaternion),_=1}const et=1-Math.exp(-3*O);p+=(Y-p)*et,g+=(U-g)*et,m.lerp(W,et).normalize(),_+=(D-_)*et,v.slerp(V,1-Math.exp(-2.5*O)),r.sky.setRadius(p),r.sky.setPositionDir(m),r.sky.setFov(g),_<.005&&D===0?r.sky.setGazeBlend(0):r.sky.setGazeBlend(_,v)}function N(O){const z=f;z>=vl&&z<$i?w+=qh*O:Fa(z)===0&&(w=0);const b=w*Fa(z);Math.abs(b-x)>1e-6&&(x=b,r.sky.setSkyRotation(b,0))}function $(){var U;const O=oo(f),z=O>=1&&O<=Bi?O-1:-1,b=window.innerWidth,Y=window.innerHeight;for(const D of c){const W=(U=u==null?void 0:u[D.stopIdx])==null?void 0:U[D.labelIdx];if(D.stopIdx!==z||!W){C(D,!1);continue}F(W,x,y);const V=yu([y.x,y.y,y.z],r.sky.camera,{width:b,height:Y});if(!V||V.x<-Ns||V.x>b+Ns||V.y<-Ns||V.y>Y+Ns){C(D,!1);continue}D.el.style.left=`${V.x}px`,D.el.style.top=`${V.y}px`,C(D,!0)}}return{enter(){r.root.classList.add("inview"),h=!0,d=!1,r.sky.setLabelsEnabled(!1),B(f)},update(O){B(O)},frame(O){h&&(G(O),N(O),$())},exit(){r.root.classList.remove("inview"),h=!1,d=!1,w=0,x=0,r.sky.setSkyRotation(0,0),r.sky.setGazeBlend(0),r.sky.setLabelsEnabled(!0),T(!1),A(-1),P()}}}const zg=Object.freeze(Object.defineProperty({__proto__:null,CH4_CAM_STOPS:Kh,CH4_GROW_FRAC:Vh,CH4_OPENING_END:Xi,CH4_RELEASE:To,CH4_ROT_SPEED:qh,CH4_ROT_START:vl,CH4_STOP_COUNT:Bi,CH4_STOP_SPAN:vs,CH4_TOUR_END:$i,ch4MatchLabels:Qh,ch4RotationWeight:Fa,ch4SegmentOf:oo,ch4StopGrowth:jh,ch4WallsGrowth:Uh,createChapter:Lg},Symbol.toStringTag,{value:"Module"})),Jh=1.2,Dg=90,Ig=7,Ng=.7,Cc=.55,Fg=1.5;function $g(r){return Pt.clamp(1-r/Jh,0,1)}function Bg(r){return Math.exp(-.9*r)}const tf=new it(0,1,0),ef=new it(1,0,0);let Fs;function nf(){if(Fs!==void 0)return Fs;if(typeof document>"u")return Fs=null;const r=document.createElement("canvas");r.width=r.height=64;const t=r.getContext("2d"),n=t.createRadialGradient(32,32,0,32,32,32);return n.addColorStop(0,"rgba(255, 252, 244, 1)"),n.addColorStop(.35,"rgba(255, 240, 205, 0.85)"),n.addColorStop(1,"rgba(255, 240, 205, 0)"),t.fillStyle=n,t.fillRect(0,0,64,64),Fs=new Oo(r)}function Hg(r,t={}){const n=Math.max(1,Math.floor(t.count??Dg)),e=t.speed??Ig,i=t.rand??Math.random,s=new it(r.x,r.y,r.z);s.lengthSq()<1e-8&&s.set(0,1,0),s.normalize();const o=new it().crossVectors(s,Math.abs(s.y)<.99?tf:ef).normalize(),a=new it().crossVectors(s,o),l=new Float32Array(n*3),c=new Float32Array(n*3);for(let v=0;v<n;v++){l[v*3]=r.x,l[v*3+1]=r.y,l[v*3+2]=r.z;const _=e*(Cc+(1-Cc)*i()),w=e*Ng*i(),x=i()*Math.PI*2,S=Math.cos(x)*w,k=Math.sin(x)*w;c[v*3]=s.x*_+o.x*S+a.x*k,c[v*3+1]=s.y*_+o.y*S+a.y*k,c[v*3+2]=s.z*_+o.z*S+a.z*k}const u=new hs;u.setAttribute("position",new ci(l,3));const h=u.getAttribute("position"),f=new bu({size:Fg,sizeAttenuation:!0,map:nf()??null,color:16771512,transparent:!0,opacity:1,depthWrite:!1,blending:Wi}),d=new Ja(u,f);d.name="burst";let p=0,g=!1;const m={object:d,update(v){if(g)return!1;if(p+=v,p>=Jh)return m.dispose(),!1;const _=Bg(v);for(let w=0;w<c.length;w++)c[w]*=_,l[w]+=c[w]*v;return h.needsUpdate=!0,f.opacity=$g(p),!0},dispose(){g||(g=!0,d.removeFromParent(),u.dispose(),f.dispose())}};return m}const Mc=1,Gg=1.5,Pc=.6,Yg=1.15,Wg=.21,er=24,Xg=.35,qg=1.8;function Vg(r){return Math.sin(Math.PI*Math.min(1,Math.max(0,r)*1.15))}function Ac(r,t,n,e){const i=Math.cos(n),s=Math.sin(n);return e.set(r.x*i+t.x*s,r.y*i+t.y*s,r.z*i+t.z*s)}function Rc(r,t){const n=r()*2-1,e=r()*Math.PI*2,i=Math.sqrt(Math.max(0,1-n*n));return t.set(i*Math.cos(e),n,i*Math.sin(e))}function Ug(r,t={}){const n=t.rand??Math.random,e=Rc(n,new it),i=Rc(n,new it),s=i.addScaledVector(e,-i.dot(e));s.lengthSq()<1e-6&&s.crossVectors(e,Math.abs(e.y)<.99?tf:ef),s.normalize();const o=Pc+(Yg-Pc)*n(),a=Mc+(Gg-Mc)*n(),l=Xg*n(),c=new Float32Array((er+1)*3),u=new Float32Array((er+1)*3);for(let A=0;A<=er;A++){const C=Math.pow(1-A/er,.75);u[A*3]=C,u[A*3+1]=C*.92,u[A*3+2]=C*.72}const h=new hs;h.setAttribute("position",new ci(c,3)),h.setAttribute("color",new ci(u,3));const f=h.getAttribute("position"),d=new vu({vertexColors:!0,transparent:!0,opacity:0,depthWrite:!1,blending:Wi}),p=new Ff(h,d),g=new hs;g.setAttribute("position",new ci(new Float32Array(3),3));const m=g.getAttribute("position"),v=new bu({size:qg,sizeAttenuation:!0,map:nf()??null,color:16774102,transparent:!0,opacity:0,depthWrite:!1,blending:Wi}),_=new Ja(g,v),w=new En;w.name="meteor",w.add(p),w.add(_),w.visible=!1;let x=0,S=!1;const k=new it,T={object:w,update(A){if(S)return!1;x+=A;const C=(x-l)/a;if(C>=1)return T.dispose(),!1;if(C<0)return!0;w.visible=!0;const P=Vg(C),B=o*C;for(let y=0;y<=er;y++){const I=Math.max(0,B-Wg*(y/er));Ac(e,s,I,k).multiplyScalar(r),c[y*3]=k.x,c[y*3+1]=k.y,c[y*3+2]=k.z}return f.needsUpdate=!0,d.opacity=P*.9,Ac(e,s,B,k).multiplyScalar(r),m.setXYZ(0,k.x,k.y,k.z),m.needsUpdate=!0,v.opacity=P,!0},dispose(){S||(S=!0,w.removeFromParent(),h.dispose(),d.dispose(),g.dispose(),v.dispose())}};return T}const vt=100,jg=.97,Qg=24,ia={strength:.78,radius:.55,threshold:.58},Oc=1.2*vt,Kg=5,Lc=.2*Math.PI/180,zc=89*Math.PI/180,Dc=.8*vt,Zg=1.2*vt,Jg=.4,tm=.05,em=120,Ic=.35,Dr=new it(0,1,0),nm=new it(0,0,0);function im(r){return r=Pt.clamp(r,0,1),r*r*(3-2*r)}const Ro=class Ro{constructor(t){R(this,"canvas");R(this,"renderer");R(this,"scene");R(this,"camera");R(this,"pipeline");R(this,"quality");R(this,"card");R(this,"labelLayerEl");R(this,"hoverNdc",null);R(this,"hoverRing");R(this,"hoverTip");R(this,"sky",null);R(this,"labels",null);R(this,"labelsShown",!1);R(this,"skyRoot",new En);R(this,"tmpSkyMat",new fa);R(this,"tmpSkyQ",new Ve);R(this,"tmpSkyQY",new Ve);R(this,"starPositions",null);R(this,"starList",[]);R(this,"nameByHip",new Map);R(this,"hipToAsterism",new Map);R(this,"poem",null);R(this,"pickListeners",new Set);R(this,"gazeYaw",-Math.PI/2);R(this,"gazePitch",80*Math.PI/180);R(this,"orbitQ",new Ve);R(this,"ctlRadius",1);R(this,"ctlDir",new it(0,1,0));R(this,"ctlFov",78);R(this,"ctlGazeBlend",0);R(this,"ctlGazeTargetQ",null);R(this,"ctlDrift",0);R(this,"driftAngle",0);R(this,"ctlOrbit",0);R(this,"pickingEnabled",!1);R(this,"labelsEnabled",!0);R(this,"hoverTipEnabled",!0);R(this,"blendK",0);R(this,"dragging",!1);R(this,"lastX",0);R(this,"lastY",0);R(this,"downX",0);R(this,"downY",0);R(this,"orbitVelX",0);R(this,"orbitVelY",0);R(this,"lastOrbitMoveT",0);R(this,"clock",new $f);R(this,"elapsed",0);R(this,"frameHook",null);R(this,"started",!1);R(this,"timeScale",1);R(this,"effects",[]);R(this,"gazeEuler",new Hr(0,0,0,"YXZ"));R(this,"gazeQ",new Ve);R(this,"insideQ",new Ve);R(this,"centerLookQ",new Ve);R(this,"centerLookMat",new fa);R(this,"driftQ",new Ve);R(this,"tmpPos",new it);R(this,"resize",()=>{const t=this.tierDpr();this.renderer.setPixelRatio(t),this.renderer.setSize(window.innerWidth,window.innerHeight),this.pipeline.setSize(window.innerWidth,window.innerHeight),this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.sky&&(this.sky.starMaterial.uniforms.uPixelRatio.value=t),this.labels&&this.labels.renderer.setSize(window.innerWidth,window.innerHeight)});R(this,"frame",()=>{var s;const t=Math.min(this.clock.getDelta(),.1),n=t*this.timeScale;this.quality.update(t),(s=this.frameHook)==null||s.call(this,n),this.updateCamera(n),this.updateHover(),this.updateEffects(n);const e=this.camera.position.length(),i=this.sky;if(i&&(this.elapsed+=n,i.setTime(this.elapsed),i.starMaterial.uniforms.uDistBoost.value=Qf(e,vt),i.gridMaterial.opacity=.1+.16*Pt.clamp(e/vt-1,0,1),e>=vt&&!this.card.el.hidden&&this.card.hide()),this.labels){const o=this.labelsEnabled?Pt.clamp((Oc-e)/(Oc-vt),0,1):0,a=o>.01;a!==this.labelsShown&&(this.labelsShown=a,this.labels.setVisible(a)),a&&(this.labels.renderer.domElement.style.opacity=o.toFixed(3),this.labels.update(this.camera))}this.pipeline.render(),this.labels&&this.labelsShown&&this.labels.renderer.render(this.scene,this.camera)});this.canvas=t,this.renderer=new Bf({canvas:t,antialias:!0,alpha:!0}),this.renderer.setClearColor(0,0),this.scene=new Hf,this.scene.add(this.skyRoot),this.camera=new Gf(78,1,.1,2e3),this.pipeline=Yf(this.renderer,this.scene,this.camera,ia),this.quality=Wf(s=>{this.pipeline.setEnabled(s<2),this.pipeline.setBloom({strength:s===0?ia.strength:ia.strength*.5}),this.resize()}),this.labelLayerEl=document.createElement("div"),this.labelLayerEl.style.cssText="position:fixed;inset:0;pointer-events:none;z-index:5;",document.body.appendChild(this.labelLayerEl),this.card=Xf(document.body),this.onPick(s=>{s?this.card.show(s.info,s.x,s.y):this.card.hide()});const n=document.createElement("canvas");n.width=n.height=64;const e=n.getContext("2d");e.strokeStyle="rgba(240, 205, 110, 0.95)",e.lineWidth=5,e.shadowColor="rgba(201, 162, 39, 0.9)",e.shadowBlur=8,e.beginPath(),e.arc(32,32,24,0,Math.PI*2),e.stroke();const i=new Oo(n);this.hoverRing=new Za(new Ka({map:i,transparent:!0,depthTest:!1,depthWrite:!1})),this.hoverRing.renderOrder=999,this.hoverRing.visible=!1,this.skyRoot.add(this.hoverRing),this.hoverTip=document.createElement("div"),this.hoverTip.className="sky-tooltip",this.hoverTip.style.display="none",document.body.appendChild(this.hoverTip),this.bindPointer(),window.addEventListener("resize",this.resize),this.resize()}async init(){const[t,n,e,i]=await Promise.all([qf(vt),fetch(zn("data/stars.json")).then(a=>{if(!a.ok)throw new Error(`stars=${a.status}`);return a.json()}),fetch(zn("data/asterisms.json")).then(a=>{if(!a.ok)throw new Error(`asterisms=${a.status}`);return a.json()}),fetch(zn("data/poem.json")).then(a=>{if(!a.ok)throw new Error(`poem=${a.status}`);return a.json()})]);this.sky=t,t.starMaterial.uniforms.uPixelRatio.value=this.tierDpr(),this.skyRoot.add(t.group),this.starList=n.stars;const s=new Float32Array(this.starList.length*3),o=new Map;this.starList.forEach((a,l)=>{const[c,u,h]=Ge(a.ra,a.dec,vt);s[l*3]=c,s[l*3+1]=u,s[l*3+2]=h,o.set(a.hip,new it(c,u,h)),this.nameByHip.set(a.hip,a.name)}),this.starPositions=s,this.hipToAsterism=Vf(e.asterisms),this.poem=i,this.labels=Uf(this.labelLayerEl,e.asterisms,o),this.labels.renderer.setSize(window.innerWidth,window.innerHeight),this.labels.setVisible(!1),this.skyRoot.add(this.labels.group)}start(t){this.frameHook=t??null,!this.started&&(this.started=!0,this.renderer.setAnimationLoop(this.frame))}setRadius(t){this.ctlRadius=Math.max(.5,t*vt)}setPositionDir(t){t instanceof it?this.ctlDir.copy(t):this.ctlDir.set(t[0],t[1],t[2]),this.ctlDir.lengthSq()<1e-8&&this.ctlDir.set(0,1,0),this.ctlDir.normalize()}setFov(t){this.ctlFov=Pt.clamp(t,10,140)}setGazeMode(t,n){if(t==="target"){const e=n??{ra:0,dec:80};this.ctlGazeTargetQ=ni(e.ra,e.dec)}this.ctlGazeBlend=t==="target"?1:0}setGazeBlend(t,n){this.ctlGazeBlend=Pt.clamp(t,0,1),n!==void 0&&(this.ctlGazeTargetQ=n)}setDrift(t){this.ctlDrift=t}setOrbitEnabled(t){this.ctlOrbit=typeof t=="number"?Pt.clamp(t,0,1):t?1:0}applyCameraState(t){this.setRadius(t.radius),this.setPositionDir(t.dir),this.setFov(t.fov),this.setGazeBlend(t.gazeBlend,t.gazeTargetQ),this.setDrift(t.drift),this.setOrbitEnabled(t.orbit)}get cameraRadius(){return this.camera.position.length()}setGroupProgress(t,n){if(!this.sky)return;const e=typeof t=="number"?t:this.sky.lines.indexOf(t);this.sky.lines.setGroupProgress(e,n)}groupIndex(t){return this.sky?this.sky.lines.indexOf(t):-1}get groupCount(){return this.sky?this.sky.lines.groupCount:0}setLabelsEnabled(t){this.labelsEnabled=t}setHoverTipEnabled(t){this.hoverTipEnabled=t}setPickingEnabled(t){this.pickingEnabled=t,t||this.card.hide()}hideDetailCard(){this.card.hide()}setBloom(t){this.pipeline.setBloom(t)}setBloomEnabled(t){this.pipeline.setEnabled(t)}onPick(t){return this.pickListeners.add(t),()=>this.pickListeners.delete(t)}addSkyObject(t,n){(n==null?void 0:n.rotateWithSky)===!1?this.scene.add(t):this.skyRoot.add(t)}removeSkyObject(t){t.removeFromParent()}setSkyRotation(t=0,n=0){if(n!==0){const e=jf(n);this.tmpSkyMat.set(e[0],e[1],e[2],0,e[3],e[4],e[5],0,e[6],e[7],e[8],0,0,0,0,1),this.tmpSkyQ.setFromRotationMatrix(this.tmpSkyMat)}else this.tmpSkyQ.identity();this.tmpSkyQY.setFromAxisAngle(Dr,t),this.skyRoot.quaternion.copy(this.tmpSkyQ).multiply(this.tmpSkyQY)}setTimeScale(t){this.timeScale=Number.isFinite(t)?Pt.clamp(t,0,4):1}spawnBurst(t,n){this.addEffect(Hg(t,n))}spawnMeteors(t){const n=Math.min(Qg,Math.max(0,Math.floor(t)));for(let e=0;e<n;e++)this.addEffect(Ug(vt*jg))}addEffect(t){this.skyRoot.add(t.object),this.effects.push(t)}updateEffects(t){for(let n=this.effects.length-1;n>=0;n--)this.effects[n].update(t)||this.effects.splice(n,1)}tierDpr(){const t=this.quality.tier,n=t===0?2:t===1?1.5:1;return Math.min(window.devicePixelRatio||1,n)}applyOrbitDelta(t,n){const e=this.camera.position.clone().normalize(),i=new Ve().setFromAxisAngle(Dr,-t),s=new it().crossVectors(Dr,e);s.lengthSq()<1e-8?s.set(1,0,0):s.normalize();const o=new Ve().setFromAxisAngle(s,n),a=i.clone().multiply(o).multiply(this.orbitQ),l=e.clone().applyQuaternion(i).applyQuaternion(o);Math.abs(l.y)<.985?this.orbitQ.copy(a):this.orbitQ.premultiply(i)}bindPointer(){const t=this.canvas;t.addEventListener("pointerdown",n=>{this.dragging=!0,this.lastX=this.downX=n.clientX,this.lastY=this.downY=n.clientY,this.orbitVelX=this.orbitVelY=0,this.lastOrbitMoveT=performance.now(),this.hoverNdc=null,t.setPointerCapture(n.pointerId)}),t.addEventListener("pointerup",n=>{this.dragging=!1,t.releasePointerCapture(n.pointerId),performance.now()-this.lastOrbitMoveT>em&&(this.orbitVelX=this.orbitVelY=0),Math.hypot(n.clientX-this.downX,n.clientY-this.downY)<Kg&&this.handleClick(n.clientX,n.clientY)}),t.addEventListener("pointercancel",()=>{this.dragging=!1,this.orbitVelX=this.orbitVelY=0}),t.addEventListener("pointerleave",()=>{this.hoverNdc=null}),t.addEventListener("pointermove",n=>{if(!this.dragging){this.hoverNdc={x:n.clientX/window.innerWidth*2-1,y:-(n.clientY/window.innerHeight)*2+1,cx:n.clientX,cy:n.clientY};return}const e=n.clientX-this.lastX,i=n.clientY-this.lastY;this.lastX=n.clientX,this.lastY=n.clientY;const s=(1-this.blendK)*(1-this.ctlGazeBlend);s>0&&(this.gazeYaw+=e*Lc*s,this.gazePitch+=i*Lc*s,this.gazePitch=Pt.clamp(this.gazePitch,-zc,zc));const o=this.blendK*this.ctlOrbit;if(o>0){const a=e*o*.005,l=i*o*.005;this.applyOrbitDelta(a,l);const c=performance.now(),u=Math.min((c-this.lastOrbitMoveT)/1e3,.1);this.lastOrbitMoveT=c,u>1e-4&&(this.orbitVelX+=(a/u-this.orbitVelX)*Ic,this.orbitVelY+=(l/u-this.orbitVelY)*Ic)}})}handleClick(t,n){if(!this.pickingEnabled||!this.sky||!this.starPositions)return;if(this.camera.position.length()>=vt){this.emitPick(null);return}const e=t/window.innerWidth*2-1,i=-(n/window.innerHeight)*2+1,s=Pl(e,i,this.camera,this.starPositions,{width:window.innerWidth,height:window.innerHeight});if(!s){this.emitPick(null);return}const o=this.starList[s.index],a=this.hipToAsterism.get(o.hip);if(!a){this.emitPick(null);return}const l=this.lookupPoem(a.name);this.emitPick({info:{name:a.name,starCount:a.stars.length,stars:a.stars.map(c=>({name:this.nameByHip.get(c)??null,hip:c})),quote:l==null?void 0:l.text,quoteFrom:l==null?void 0:l.from},x:t,y:n})}lookupPoem(t){if(!this.poem)return;const n=this.poem[t];if(n)return n;const e=t.replace(/[(（][^)）]*[)）]\s*$/,"");return e!==t?this.poem[e]:void 0}emitPick(t){for(const n of this.pickListeners)n(t)}updateHover(){if(!(this.pickingEnabled&&!this.dragging&&this.hoverNdc!==null&&this.starPositions!==null&&this.camera.position.length()<vt)){this.hoverRing.visible&&(this.hoverRing.visible=!1),this.hoverTip.style.display!=="none"&&(this.hoverTip.style.display="none");return}const n=Pl(this.hoverNdc.x,this.hoverNdc.y,this.camera,this.starPositions,{width:window.innerWidth,height:window.innerHeight},Ro.HOVER_PICK_RADIUS_PX);if(!n){this.hoverRing.visible&&(this.hoverRing.visible=!1),this.hoverTip.style.display!=="none"&&(this.hoverTip.style.display="none");return}const e=this.starPositions;this.hoverRing.position.set(e[n.index*3],e[n.index*3+1],e[n.index*3+2]);const i=this.camera.position.distanceTo(this.hoverRing.position),s=Math.max(.5,i*.035);if(this.hoverRing.scale.set(s,s,1),this.hoverRing.visible=!0,!this.hoverTipEnabled){this.hoverTip.style.display!=="none"&&(this.hoverTip.style.display="none");return}const o=this.starList[n.index],a=this.hipToAsterism.get(o.hip),l=o.name??`HIP ${o.hip}`,c=a&&a.name!==l?`${l} · ${a.name}`:l;this.hoverTip.textContent!==c&&(this.hoverTip.textContent=c),this.hoverTip.style.left=`${this.hoverNdc.cx+16}px`,this.hoverTip.style.top=`${this.hoverNdc.cy+14}px`,this.hoverTip.style.display!=="block"&&(this.hoverTip.style.display="block")}updateCamera(t){if(!this.dragging&&(this.orbitVelX!==0||this.orbitVelY!==0)){this.applyOrbitDelta(this.orbitVelX*t,this.orbitVelY*t);const e=Math.pow(.5,t/Jg);this.orbitVelX*=e,this.orbitVelY*=e,Math.hypot(this.orbitVelX,this.orbitVelY)<tm&&(this.orbitVelX=this.orbitVelY=0)}const n=this.tmpPos.copy(this.ctlDir).multiplyScalar(this.ctlRadius).applyQuaternion(this.orbitQ);this.camera.position.copy(n),this.blendK=im((this.ctlRadius-Dc)/(Zg-Dc)),this.gazeEuler.set(this.gazePitch,this.gazeYaw,0),this.gazeQ.setFromEuler(this.gazeEuler),this.insideQ.copy(this.gazeQ),this.ctlGazeTargetQ&&this.ctlGazeBlend>0&&this.insideQ.slerp(this.ctlGazeTargetQ,this.ctlGazeBlend),this.ctlDrift!==0&&(this.driftAngle+=this.ctlDrift*t,this.driftQ.setFromAxisAngle(Dr,this.driftAngle),this.insideQ.premultiply(this.driftQ)),this.centerLookMat.lookAt(n,nm,Dr),this.centerLookQ.setFromRotationMatrix(this.centerLookMat),this.camera.quaternion.slerpQuaternions(this.insideQ,this.centerLookQ,this.blendK),this.camera.fov!==this.ctlFov&&(this.camera.fov=this.ctlFov,this.camera.updateProjectionMatrix())}};R(Ro,"HOVER_PICK_RADIUS_PX",16);let $a=Ro;const rm=Pt.degToRad(23.44),sm=11570494,ra=36,om=.15,am=.55;function lm(r){return r=Pt.clamp(r,0,1),r*r*(3-2*r)}function $s(r,t,n){const e=new Zf({color:sm,metalness:.85,roughness:.35,transparent:!0,opacity:0}),i=new En,s=r*vt;i.add(new po(new wu(s,t*vt,12,144),e));for(let o=0;o<ra;o++){const a=o/ra*Math.PI*2,l=o%(ra/4)===0,c=new po(l?n.major:n.minor,e);c.position.set(Math.cos(a)*s,Math.sin(a)*s,0),c.rotation.z=a,i.add(c)}return{local:i,material:e}}function cm(){const r=new En;r.name="armillary-sphere";const t={minor:new Al(.012*vt,.0018*vt,.0035*vt),major:new Al(.02*vt,.0024*vt,.0045*vt)},n=$s(1.1,.006,t);n.local.rotation.x=-Math.PI/2;const e=$s(1.07,.004,t);e.local.rotation.y=Math.PI/2;const i=$s(1.05,.004,t);i.local.rotation.x=-Math.PI/2;const s=new En;s.add(i.local);const o=$s(1.03,.0035,t);o.local.rotation.x=-Math.PI/2;const a=new En;a.add(o.local);const l=new En;l.rotation.x=rm,l.add(a);const c=[{built:n,inner:n.local,offsetDir:new it(0,-1,0),tumble:new Hr(.9,0,.4)},{built:e,inner:e.local,offsetDir:new it(1,.15,0),tumble:new Hr(0,.5,-1.1)},{built:i,inner:s,offsetDir:new it(0,1,.2),tumble:new Hr(-.7,.5,0)},{built:o,inner:l,offsetDir:new it(-.6,.6,.6),tumble:new Hr(.5,-.4,.8)}].map(({built:_,inner:w,offsetDir:x,tumble:S})=>{const k=new En;return k.add(w),r.add(k),{assembly:k,material:_.material,offsetDir:x.normalize(),tumble:S,alpha:0}});r.add(new Kf(16771529,.9));const u=new Rl(16774109,2.4);u.position.set(1.6*vt,2.4*vt,1.2*vt),r.add(u);const h=new Rl(12570879,1.1);h.position.set(-1.8*vt,-.7*vt,-1.5*vt),r.add(h);let f=0;function d(_){const w=f*_.alpha;_.material.opacity=w,_.assembly.visible=w>.002}function p(_){c.forEach((w,x)=>{const S=lm((_-x*om)/am);w.alpha=S;const k=1-S;w.assembly.scale.setScalar(.35+.65*S),w.assembly.position.copy(w.offsetDir).multiplyScalar(k*.5*vt),w.assembly.rotation.set(w.tumble.x*k,w.tumble.y*k,w.tumble.z*k),d(w)})}function g(_){s.rotation.y=_,a.rotation.y=_*.6}function m(_){f=Pt.clamp(_,0,1);for(const w of c)d(w)}function v(){const _=new Set,w=new Set;r.traverse(x=>{const S=x;if(S.isMesh){_.add(S.geometry);const k=S.material;for(const T of Array.isArray(k)?k:[k])w.add(T)}}),_.forEach(x=>x.dispose()),w.forEach(x=>x.dispose())}return p(0),{group:r,setAssembly:p,setSpin:g,setFade:m,dispose:v}}const sa=.55,um=.9,hm=1.2;function Ir(r){return r.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function fm(r){const{copy:t}=r,n=document.createElement("div");n.className="chapter-panel chapter-panel--left",n.innerHTML=`
    <p class="eyebrow">${Ir(t.eyebrow)}</p>
    <div class="chapter-head">
      <h2>${Ir(t.title)}</h2>
      ${t.seal?`<div class="seal">${Ir(t.seal)}</div>`:""}
    </div>
    <p class="hook">${Ir(t.hook)}</p>
    ${t.body.map(a=>`<p>${Ir(a)}</p>`).join("")}
  `,r.root.querySelector(".pin").appendChild(n);let e=null,i=0;const s={v:0};function o(a){if(!e)return;e.setAssembly(Math.min(a/sa,1));const l=Math.max(0,(a-sa)/(1-sa));e.setSpin(l*um)}return{enter(){r.root.classList.add("inview"),e||(e=cm(),r.sky.addSkyObject(e.group,{rotateWithSky:!1}),o(i)),Vt.to(s,{v:1,duration:hm,ease:"power2.out",overwrite:!0,onUpdate:()=>e==null?void 0:e.setFade(s.v)})},update(a){i=a,o(a)},exit(){r.root.classList.remove("inview"),Vt.killTweensOf(s),s.v=0,e&&(r.sky.removeSkyObject(e.group),e.dispose(),e=null)}}}const dm=Object.freeze(Object.defineProperty({__proto__:null,createChapter:fm},Symbol.toStringTag,{value:"Module"})),Li=-1e4,ko=14e3,Ba=ko-Li,pm=[{name:"帝星",years:-1e3,note:"−1000"},{name:"勾陈一",years:0,note:"今"},{name:"织女一",years:13700,note:"+13700"}],gm=[{years:Li,text:"−10000",cls:"ch6-endlab--start"},{years:0,text:"0",cls:""},{years:ko,text:"+14000",cls:"ch6-endlab--end"}],mm=2e3,_m=1.5,ym=.07,bm=`
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
`;let Nc=!1;function vm(){if(Nc||typeof document>"u")return;const r=document.createElement("style");r.dataset.ch6="",r.textContent=bm,document.head.appendChild(r),Nc=!0}function Nr(r){return r.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Bs(r){return(r-Li)/Ba*100}function wm(r){const t=2e3+r;return t<=0?{era:"公元前",num:1-t}:{era:t<3e3?"公元":"公元后",num:t}}function xm(r){vm();const t=r.root.querySelector(".pin"),n=document.createElement("div");n.className="chapter-panel ch6-panel",n.innerHTML=`
    <p class="eyebrow">${Nr(r.copy.eyebrow)}</p>
    <div class="chapter-head">
      <h2>${Nr(r.copy.title)}</h2>
      ${r.copy.seal?`<div class="seal">${Nr(r.copy.seal)}</div>`:""}
    </div>
    <p class="hook">${Nr(r.copy.hook)}</p>
    ${r.copy.body.map(m=>`<p>${Nr(m)}</p>`).join("")}
  `,t.appendChild(n);const e=document.createElement("div");e.className="ch6-time";const i=[];for(let m=Li;m<=ko;m+=mm){const v=m===Li||m===0||m===ko;i.push(`<div class="ch6-tick${v?" ch6-tick--major":""}" style="left:${Bs(m).toFixed(3)}%"></div>`)}const s=gm.map(m=>`<div class="ch6-endlab ${m.cls}" style="left:${Bs(m.years).toFixed(3)}%">${m.text}</div>`),o=pm.map(m=>`
    <div class="ch6-mark" style="left:${Bs(m.years).toFixed(3)}%">
      <span class="ch6-mark-name">${m.name}</span>
      <span class="ch6-mark-yr">${m.note}</span>
      <span class="ch6-mark-dot"></span>
    </div>`);e.innerHTML=`
    <div class="ch6-year"><span class="ch6-era">公元前</span><span class="ch6-num">8000</span><span class="ch6-suffix">年</span></div>
    <div class="ch6-ruler">
      <div class="ch6-ruler-line"></div>
      ${i.join("")}
      ${s.join("")}
      ${o.join("")}
      <div class="ch6-pointer"></div>
    </div>
  `,t.appendChild(e);const a=e.querySelector(".ch6-era"),l=e.querySelector(".ch6-num"),c=e.querySelector(".ch6-pointer");let u=null;function h(){const m=new wu(_m,ym,12,96),v=new Jf({color:13214247}),_=new po(m,v);return _.rotation.x=Math.PI/2,_.position.set(0,1.01*vt,0),_}let f=0,d=Number.NaN,p=Number.NaN;function g(m){r.sky.setSkyRotation(0,m);const v=Math.round(m);if(v!==d){d=v;const{era:w,num:x}=wm(v);a.textContent=w,l.textContent=String(x)}const _=Math.round(Bs(m)*100)/100;_!==p&&(p=_,c.style.left=`${_}%`)}return{enter(){r.root.classList.add("inview"),u=h(),r.sky.addSkyObject(u,{rotateWithSky:!1}),g(Li+f*Ba)},update(m){f=m,g(Li+m*Ba)},exit(){r.root.classList.remove("inview"),r.sky.setSkyRotation(0,0),u&&(r.sky.removeSkyObject(u),u.geometry.dispose(),u.material.dispose(),u=null)}}}const Sm=Object.freeze(Object.defineProperty({__proto__:null,createChapter:xm},Symbol.toStringTag,{value:"Module"})),Tm=100,km=9414856;async function Fc(r){const t=await fetch(r);if(!t.ok)throw new Error(`${r} → HTTP ${t.status}`);return t.json()}async function Em(){const[r,t]=await Promise.all([Fc(zn("data/western.json")),Fc(zn("data/stars.json"))]),n=new Map;for(const l of t.stars)n.set(l.hip,Ge(l.ra,l.dec,Tm));const e=[];for(const l of r.constellations)for(const[c,u]of l.lines){const h=n.get(c),f=n.get(u);!h||!f||e.push(h[0],h[1],h[2],f[0],f[1],f[2])}const i=new hs;i.setAttribute("position",new ci(new Float32Array(e),3));const s=new vu({color:km,transparent:!0,opacity:0,depthWrite:!1,blending:Wi}),o=new td(i,s);o.name="western-lines",o.frustumCulled=!1;const a=new En;return a.name="western",a.add(o),a.visible=!1,{group:a,setOpacity(l){const c=Pt.clamp(l,0,1);s.opacity=c,a.visible=c>.001},dispose(){i.dispose(),s.dispose()}}}const $c=.6,Cm=`
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
`;let Bc=!1;function Mm(){if(Bc||typeof document>"u")return;const r=document.createElement("style");r.dataset.ch7="",r.textContent=Cm,document.head.appendChild(r),Bc=!0}function Fr(r){return r.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Pm(r){return r=Pt.clamp(r,0,1),r*r*(3-2*r)}function Am(r){Mm();const t=r.root.querySelector(".pin"),{copy:n}=r,e=document.createElement("div");e.className="ch7-panel",e.innerHTML=`
    <p class="eyebrow">${Fr(n.eyebrow)}</p>
    <div class="chapter-head">
      <h2>${Fr(n.title)}</h2>
      ${n.seal?`<div class="seal">${Fr(n.seal)}</div>`:""}
    </div>
    <p class="hook">${Fr(n.hook)}</p>
    ${n.body.map(p=>`<p>${Fr(p)}</p>`).join("")}
  `,t.appendChild(e);const i=document.createElement("div");i.className="ch7-compare",i.innerHTML=`
    <span class="ch7-end ch7-end--cn">中国星官</span>
    <input class="ch7-slider" type="range" min="0" max="100" step="1" value="0"
      aria-label="中西星空连线对比" />
    <span class="ch7-end ch7-end--west">西方星座</span>
  `,t.appendChild(i);const s=i.querySelector(".ch7-slider");let o=null,a=0,l=0,c=!1,u=null,h=null;function f(p){const g=r.sky.groupCount;for(let m=0;m<g;m++)r.sky.setGroupProgress(m,p)}function d(p){l=Pt.clamp(p,0,1),f(1-l),o==null||o.setOpacity(l),s.value=String(Math.round(l*100))}return s.addEventListener("input",()=>{c=!0,d(Number(s.value)/100)}),{enter(){if(r.root.classList.add("inview"),r.sky.setLabelsEnabled(!1),u==null||u.kill(),u=null,h==null||h.kill(),h=null,c=!1,d(0),o)return;const p=++a;Em().then(g=>{if(p!==a){g.dispose();return}o=g,r.sky.addSkyObject(g.group),g.setOpacity(l)}).catch(g=>console.warn("[ch7] 西方星座数据加载失败：",g))},update(p){if(!c){if(p>=$c){l!==1&&d(1);return}d(Pm(p/$c))}},exit(){if(r.root.classList.remove("inview"),++a,h==null||h.kill(),o){const g=o,m={v:l};h=Vt.to(m,{v:0,duration:.6,ease:"sine.inOut",onUpdate:()=>g.setOpacity(m.v),onComplete:()=>{r.sky.removeSkyObject(g.group),g.dispose(),o===g&&(o=null),h=null}})}u==null||u.kill();const p={v:1-l};u=Vt.to(p,{v:1,duration:2.4,ease:"sine.inOut",onUpdate:()=>f(p.v)}),r.sky.setLabelsEnabled(!0)}}}const Rm=Object.freeze(Object.defineProperty({__proto__:null,createChapter:Am},Symbol.toStringTag,{value:"Module"})),Om=`
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
  max-width: 1060px;
  max-height: 88vh;
  overflow: hidden;
  background: rgba(13, 13, 17, 0.6);
  border: 1px solid rgba(175, 145, 95, 0.28);
  border-radius: 12px;
  padding: 40px 48px;
  backdrop-filter: blur(8px);
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
  font-size: clamp(38px, 4.2vw, 52px);
  font-weight: 400;
  letter-spacing: 0.1em;
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
/* 结语：全章情绪落点，大字号宋体淡金 */
.ch8-body p.ch8-coda {
  margin-top: 20px;
  font-family: "STSong", "SimSun", "Songti SC", serif;
  font-size: clamp(19px, 2.3vw, 27px);
  letter-spacing: 0.14em;
  line-height: 1.8;
  color: #c9a227;
  opacity: 0.95;
}
.ch8-credits {
  margin-top: 26px;
  padding-top: 22px;
  border-top: 1px solid rgba(175, 145, 95, 0.22);
  opacity: 0;
}
.ch8-credits-heading {
  font-size: 12px;
  letter-spacing: 0.34em;
  color: #af915f;
}
/* 三栏致谢（editorial 分栏；窄屏单栏） */
.ch8-credit-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 16px;
  text-align: left;
}
.ch8-credit-group {
  border-top: 1px solid rgba(201, 162, 39, 0.3);
  padding-top: 12px;
}
.ch8-credit-group h3 {
  font-family: "STSong", "SimSun", "Songti SC", serif;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.24em;
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
@media (max-width: 760px) {
  .ch8-panel { padding: 26px 22px; }
  .ch8-credit-grid { grid-template-columns: 1fr; gap: 18px; text-align: center; }
}
`;let Hc=!1;function Lm(){if(Hc||typeof document>"u")return;const r=document.createElement("style");r.dataset.ch8="",r.textContent=Om,document.head.appendChild(r),Hc=!0}function Tn(r){return r.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function zm(r){return r<0?0:r>1?1:r}function Dm(r){return r.split(/(https?:\/\/\S+)/g).map(t=>/^https?:\/\//.test(t)?`<a href="${Tn(t)}" target="_blank" rel="noopener">${Tn(t)}</a>`:Tn(t)).join("")}function Gc(r,t,n){const e=zm((r-t)/(n-t));return e*e*(3-2*e)}function Im(r){Lm();const t=r.root.querySelector(".pin"),{copy:n}=r,e=document.createElement("div");e.className="ch8-wrap",e.innerHTML=`
    <div class="ch8-panel">
      <p class="ch8-eyebrow">${Tn(n.eyebrow)}</p>
      <div class="ch8-head">
        <h2 class="ch8-title">${Tn(n.title)}</h2>
        ${n.seal?`<div class="ch8-seal">${Tn(n.seal)}</div>`:""}
      </div>
      <p class="ch8-hook">${Tn(n.hook)}</p>
      <div class="ch8-body">${n.body.map((l,c)=>c===n.body.length-1?`<p class="ch8-coda">${Tn(l)}</p>`:`<p>${Tn(l)}</p>`).join("")}</div>
      <div class="ch8-credits">
        <p class="ch8-credits-heading">${Tn(Sc.heading)}</p>
        <div class="ch8-credit-grid">
        ${Sc.groups.map(l=>`
          <div class="ch8-credit-group">
            <h3>${Tn(l.title)}</h3>
            ${l.lines.map(c=>`<p>${Dm(c)}</p>`).join("")}
          </div>`).join("")}
        </div>
      </div>
    </div>
  `,t.appendChild(e);const i=e.querySelector(".ch8-panel"),s=e.querySelector(".ch8-credits");let o=-1,a=-1;return{enter(){},update(l){const c=Gc(l,0,.3);(o<0||Math.abs(c-o)>=1e-4)&&(o=c,i.style.opacity=c.toFixed(3),i.style.transform=`translateY(${((1-c)*26).toFixed(2)}px)`);const u=Gc(l,.12,.45);(a<0||Math.abs(u-a)>=1e-4)&&(a=u,s.style.opacity=u.toFixed(3),s.style.transform=`translateY(${((1-u)*14).toFixed(2)}px)`)},exit(){}}}const Nm=Object.freeze(Object.defineProperty({__proto__:null,createChapter:Im},Symbol.toStringTag,{value:"Module"}));function Fm(r,t){for(var n=0;n<t.length;n++){var e=t[n];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(r,e.key,e)}}function $m(r,t,n){return t&&Fm(r.prototype,t),r}/*!
 * Observer 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var pe,ao,en,ai,li,mr,rf,Mi,_r,sf,Vn,Sn,of,af=function(){return pe||typeof window<"u"&&(pe=window.gsap)&&pe.registerPlugin&&pe},lf=1,ur=[],ct=[],Dn=[],ns=Date.now,Ha=function(t,n){return n},Bm=function(){var t=_r.core,n=t.bridge||{},e=t._scrollers,i=t._proxies;e.push.apply(e,ct),i.push.apply(i,Dn),ct=e,Dn=i,Ha=function(o,a){return n[o](a)}},di=function(t,n){return~Dn.indexOf(t)&&Dn[Dn.indexOf(t)+1][n]},is=function(t){return!!~sf.indexOf(t)},Ce=function(t,n,e,i,s){return t.addEventListener(n,e,{passive:i!==!1,capture:!!s})},Ee=function(t,n,e,i){return t.removeEventListener(n,e,!!i)},Hs="scrollLeft",Gs="scrollTop",Ga=function(){return Vn&&Vn.isPressed||ct.cache++},Eo=function(t,n){var e=function i(s){if(s||s===0){lf&&(en.history.scrollRestoration="manual");var o=Vn&&Vn.isPressed;s=i.v=Math.round(s)||(Vn&&Vn.iOS?1:0),t(s),i.cacheID=ct.cache,o&&Ha("ss",s)}else(n||ct.cache!==i.cacheID||Ha("ref"))&&(i.cacheID=ct.cache,i.v=t());return i.v+i.offset};return e.offset=0,t&&e},Re={s:Hs,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:Eo(function(r){return arguments.length?en.scrollTo(r,ne.sc()):en.pageXOffset||ai[Hs]||li[Hs]||mr[Hs]||0})},ne={s:Gs,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:Re,sc:Eo(function(r){return arguments.length?en.scrollTo(Re.sc(),r):en.pageYOffset||ai[Gs]||li[Gs]||mr[Gs]||0})},De=function(t,n){return(n&&n._ctx&&n._ctx.selector||pe.utils.toArray)(t)[0]||(typeof t=="string"&&pe.config().nullTargetWarn!==!1?console.warn("Element not found:",t):null)},Hm=function(t,n){for(var e=n.length;e--;)if(n[e]===t||n[e].contains(t))return!0;return!1},_i=function(t,n){var e=n.s,i=n.sc;is(t)&&(t=ai.scrollingElement||li);var s=ct.indexOf(t),o=i===ne.sc?1:2;!~s&&(s=ct.push(t)-1),ct[s+o]||Ce(t,"scroll",Ga);var a=ct[s+o],l=a||(ct[s+o]=Eo(di(t,e),!0)||(is(t)?i:Eo(function(c){return arguments.length?t[e]=c:t[e]})));return l.target=t,a||(l.smooth=pe.getProperty(t,"scrollBehavior")==="smooth"),l},Ya=function(t,n,e){var i=t,s=t,o=ns(),a=o,l=n||50,c=Math.max(500,l*3),u=function(p,g){var m=ns();g||m-o>l?(s=i,i=p,a=o,o=m):e?i+=p:i=s+(p-s)/(m-a)*(o-a)},h=function(){s=i=e?0:i,a=o=0},f=function(p){var g=a,m=s,v=ns();return(p||p===0)&&p!==i&&u(p),o===a||v-a>c?0:(i+(e?m:-m))/((e?v:o)-g)*1e3};return{update:u,reset:h,getVelocity:f}},$r=function(t,n){return n&&!t._gsapAllow&&t.cancelable!==!1&&t.preventDefault(),t.changedTouches?t.changedTouches[0]:t},Yc=function(t){var n=Math.max.apply(Math,t),e=Math.min.apply(Math,t);return Math.abs(n)>=Math.abs(e)?n:e},cf=function(){_r=pe.core.globals().ScrollTrigger,_r&&_r.core&&Bm()},uf=function(t){return pe=t||af(),!ao&&pe&&typeof document<"u"&&document.body&&(en=window,ai=document,li=ai.documentElement,mr=ai.body,sf=[en,ai,li,mr],pe.utils.clamp,of=pe.core.context||function(){},Mi="onpointerenter"in mr?"pointer":"mouse",rf=Ut.isTouch=en.matchMedia&&en.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in en||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,Sn=Ut.eventTypes=("ontouchstart"in li?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in li?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return lf=0},500),ao=1),_r||cf(),ao};Re.op=ne;ct.cache=0;var Ut=function(){function r(n){this.init(n)}var t=r.prototype;return t.init=function(e){ao||uf(pe)||console.warn("Please gsap.registerPlugin(Observer)"),_r||cf();var i=e.tolerance,s=e.dragMinimum,o=e.type,a=e.target,l=e.lineHeight,c=e.debounce,u=e.preventDefault,h=e.onStop,f=e.onStopDelay,d=e.ignore,p=e.wheelSpeed,g=e.event,m=e.onDragStart,v=e.onDragEnd,_=e.onDrag,w=e.onPress,x=e.onRelease,S=e.onRight,k=e.onLeft,T=e.onUp,A=e.onDown,C=e.onChangeX,P=e.onChangeY,B=e.onChange,y=e.onToggleX,I=e.onToggleY,F=e.onHover,G=e.onHoverEnd,N=e.onMove,$=e.ignoreCheck,O=e.isNormalizer,z=e.onGestureStart,b=e.onGestureEnd,Y=e.onWheel,U=e.onEnable,D=e.onDisable,W=e.onClick,V=e.scrollSpeed,et=e.capture,X=e.allowClicks,_t=e.lockAxis,St=e.onLockAxis;this.target=a=De(a)||li,this.vars=e,d&&(d=pe.utils.toArray(d)),i=i||1e-9,s=s||0,p=p||1,V=V||1,o=o||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(en.getComputedStyle(mr).lineHeight)||22);var mt,It,Ct,j,rt,Yt,ie,M=this,At=0,ce=0,me=e.passive||!u&&e.passive!==!1,yt=_i(a,Re),ft=_i(a,ne),Nt=yt(),ue=ft(),Ft=~o.indexOf("touch")&&!~o.indexOf("pointer")&&Sn[0]==="pointerdown",bn=is(a),Rt=a.ownerDocument||ai,We=[0,0,0],ke=[0,0,0],Oe=0,Kn=function(){return Oe=ns()},Lt=function(Z,ut){return(M.event=Z)&&d&&Hm(Z.target,d)||ut&&Ft&&Z.pointerType!=="touch"||$&&$(Z,ut)},Nn=function(){M._vx.reset(),M._vy.reset(),It.pause(),h&&h(M)},Le=function(){var Z=M.deltaX=Yc(We),ut=M.deltaY=Yc(ke),H=Math.abs(Z)>=i,tt=Math.abs(ut)>=i;B&&(H||tt)&&B(M,Z,ut,We,ke),H&&(S&&M.deltaX>0&&S(M),k&&M.deltaX<0&&k(M),C&&C(M),y&&M.deltaX<0!=At<0&&y(M),At=M.deltaX,We[0]=We[1]=We[2]=0),tt&&(A&&M.deltaY>0&&A(M),T&&M.deltaY<0&&T(M),P&&P(M),I&&M.deltaY<0!=ce<0&&I(M),ce=M.deltaY,ke[0]=ke[1]=ke[2]=0),(j||Ct)&&(N&&N(M),Ct&&(m&&Ct===1&&m(M),_&&_(M),Ct=0),j=!1),Yt&&!(Yt=!1)&&St&&St(M),rt&&(Y(M),rt=!1),mt=0},vn=function(Z,ut,H){We[H]+=Z,ke[H]+=ut,M._vx.update(Z),M._vy.update(ut),c?mt||(mt=requestAnimationFrame(Le)):Le()},wn=function(Z,ut){_t&&!ie&&(M.axis=ie=Math.abs(Z)>Math.abs(ut)?"x":"y",Yt=!0),ie!=="y"&&(We[2]+=Z,M._vx.update(Z,!0)),ie!=="x"&&(ke[2]+=ut,M._vy.update(ut,!0)),c?mt||(mt=requestAnimationFrame(Le)):Le()},Xe=function(Z){if(!Lt(Z,1)){Z=$r(Z,u);var ut=Z.clientX,H=Z.clientY,tt=ut-M.x,Q=H-M.y,J=M.isDragging;M.x=ut,M.y=H,(J||(tt||Q)&&(Math.abs(M.startX-ut)>=s||Math.abs(M.startY-H)>=s))&&(Ct||(Ct=J?2:1),J||(M.isDragging=!0),wn(tt,Q))}},qe=M.onPress=function(nt){Lt(nt,1)||nt&&nt.button||(M.axis=ie=null,It.pause(),M.isPressed=!0,nt=$r(nt),At=ce=0,M.startX=M.x=nt.clientX,M.startY=M.y=nt.clientY,M._vx.reset(),M._vy.reset(),Ce(O?a:Rt,Sn[1],Xe,me,!0),M.deltaX=M.deltaY=0,w&&w(M))},st=M.onRelease=function(nt){if(!Lt(nt,1)){Ee(O?a:Rt,Sn[1],Xe,!0);var Z=!isNaN(M.y-M.startY),ut=M.isDragging,H=ut&&(Math.abs(M.x-M.startX)>3||Math.abs(M.y-M.startY)>3),tt=$r(nt);!H&&Z&&(M._vx.reset(),M._vy.reset(),u&&X&&pe.delayedCall(.08,function(){if(ns()-Oe>300&&!nt.defaultPrevented){if(nt.target.click)nt.target.click();else if(Rt.createEvent){var Q=Rt.createEvent("MouseEvents");Q.initMouseEvent("click",!0,!0,en,1,tt.screenX,tt.screenY,tt.clientX,tt.clientY,!1,!1,!1,!1,0,null),nt.target.dispatchEvent(Q)}}})),M.isDragging=M.isGesturing=M.isPressed=!1,h&&ut&&!O&&It.restart(!0),Ct&&Le(),v&&ut&&v(M),x&&x(M,H)}},ln=function(Z){return Z.touches&&Z.touches.length>1&&(M.isGesturing=!0)&&z(Z,M.isDragging)},_e=function(){return(M.isGesturing=!1)||b(M)},ze=function(Z){if(!Lt(Z)){var ut=yt(),H=ft();vn((ut-Nt)*V,(H-ue)*V,1),Nt=ut,ue=H,h&&It.restart(!0)}},he=function(Z){if(!Lt(Z)){Z=$r(Z,u),Y&&(rt=!0);var ut=(Z.deltaMode===1?l:Z.deltaMode===2?en.innerHeight:1)*p;vn(Z.deltaX*ut,Z.deltaY*ut,0),h&&!O&&It.restart(!0)}},Fn=function(Z){if(!Lt(Z)){var ut=Z.clientX,H=Z.clientY,tt=ut-M.x,Q=H-M.y;M.x=ut,M.y=H,j=!0,h&&It.restart(!0),(tt||Q)&&wn(tt,Q)}},$n=function(Z){M.event=Z,F(M)},fe=function(Z){M.event=Z,G(M)},Bn=function(Z){return Lt(Z)||$r(Z,u)&&W(M)};It=M._dc=pe.delayedCall(f||.25,Nn).pause(),M.deltaX=M.deltaY=0,M._vx=Ya(0,50,!0),M._vy=Ya(0,50,!0),M.scrollX=yt,M.scrollY=ft,M.isDragging=M.isGesturing=M.isPressed=!1,of(this),M.enable=function(nt){return M.isEnabled||(Ce(bn?Rt:a,"scroll",Ga),o.indexOf("scroll")>=0&&Ce(bn?Rt:a,"scroll",ze,me,et),o.indexOf("wheel")>=0&&Ce(a,"wheel",he,me,et),(o.indexOf("touch")>=0&&rf||o.indexOf("pointer")>=0)&&(Ce(a,Sn[0],qe,me,et),Ce(Rt,Sn[2],st),Ce(Rt,Sn[3],st),X&&Ce(a,"click",Kn,!0,!0),W&&Ce(a,"click",Bn),z&&Ce(Rt,"gesturestart",ln),b&&Ce(Rt,"gestureend",_e),F&&Ce(a,Mi+"enter",$n),G&&Ce(a,Mi+"leave",fe),N&&Ce(a,Mi+"move",Fn)),M.isEnabled=!0,M.isDragging=M.isGesturing=M.isPressed=j=Ct=!1,M._vx.reset(),M._vy.reset(),Nt=yt(),ue=ft(),nt&&nt.type&&qe(nt),U&&U(M)),M},M.disable=function(){M.isEnabled&&(ur.filter(function(nt){return nt!==M&&is(nt.target)}).length||Ee(bn?Rt:a,"scroll",Ga),M.isPressed&&(M._vx.reset(),M._vy.reset(),Ee(O?a:Rt,Sn[1],Xe,!0)),Ee(bn?Rt:a,"scroll",ze,et),Ee(a,"wheel",he,et),Ee(a,Sn[0],qe,et),Ee(Rt,Sn[2],st),Ee(Rt,Sn[3],st),Ee(a,"click",Kn,!0),Ee(a,"click",Bn),Ee(Rt,"gesturestart",ln),Ee(Rt,"gestureend",_e),Ee(a,Mi+"enter",$n),Ee(a,Mi+"leave",fe),Ee(a,Mi+"move",Fn),M.isEnabled=M.isPressed=M.isDragging=!1,D&&D(M))},M.kill=M.revert=function(){M.disable();var nt=ur.indexOf(M);nt>=0&&ur.splice(nt,1),Vn===M&&(Vn=0)},ur.push(M),O&&is(a)&&(Vn=M),M.enable(g)},$m(r,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),r}();Ut.version="3.15.0";Ut.create=function(r){return new Ut(r)};Ut.register=uf;Ut.getAll=function(){return ur.slice()};Ut.getById=function(r){return ur.filter(function(t){return t.vars.id===r})[0]};af()&&pe.registerPlugin(Ut);/*!
 * ScrollTrigger 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var q,sr,lt,xt,Je,bt,wl,Co,ws,rs,qr,Ys,ve,No,Wa,Pe,Wc,Xc,or,hf,oa,ff,Me,Xa,df,pf,ei,qa,xl,yr,Sl,ss,Va,aa,Ws=1,we=Date.now,la=we(),yn=0,Vr=0,qc=function(t,n,e){var i=je(t)&&(t.substr(0,6)==="clamp("||t.indexOf("max")>-1);return e["_"+n+"Clamp"]=i,i?t.substr(6,t.length-7):t},Vc=function(t,n){return n&&(!je(t)||t.substr(0,6)!=="clamp(")?"clamp("+t+")":t},Gm=function r(){return Vr&&requestAnimationFrame(r)},Uc=function(){return No=1},jc=function(){return No=0},An=function(t){return t},Ur=function(t){return Math.round(t*1e5)/1e5||0},gf=function(){return typeof window<"u"},mf=function(){return q||gf()&&(q=window.gsap)&&q.registerPlugin&&q},qi=function(t){return!!~wl.indexOf(t)},_f=function(t){return(t==="Height"?Sl:lt["inner"+t])||Je["client"+t]||bt["client"+t]},yf=function(t){return di(t,"getBoundingClientRect")||(qi(t)?function(){return fo.width=lt.innerWidth,fo.height=Sl,fo}:function(){return Wn(t)})},Ym=function(t,n,e){var i=e.d,s=e.d2,o=e.a;return(o=di(t,"getBoundingClientRect"))?function(){return o()[i]}:function(){return(n?_f(s):t["client"+s])||0}},Wm=function(t,n){return!n||~Dn.indexOf(t)?yf(t):function(){return fo}},Ln=function(t,n){var e=n.s,i=n.d2,s=n.d,o=n.a;return Math.max(0,(e="scroll"+i)&&(o=di(t,e))?o()-yf(t)()[s]:qi(t)?(Je[e]||bt[e])-_f(i):t[e]-t["offset"+i])},Xs=function(t,n){for(var e=0;e<or.length;e+=3)(!n||~n.indexOf(or[e+1]))&&t(or[e],or[e+1],or[e+2])},je=function(t){return typeof t=="string"},Se=function(t){return typeof t=="function"},jr=function(t){return typeof t=="number"},Pi=function(t){return typeof t=="object"},Br=function(t,n,e){return t&&t.progress(n?0:1)&&e&&t.pause()},nr=function(t,n,e){if(t.enabled){var i=t._ctx?t._ctx.add(function(){return n(t,e)}):n(t,e);i&&i.totalTime&&(t.callbackAnimation=i)}},ir=Math.abs,bf="left",vf="top",Tl="right",kl="bottom",Hi="width",Gi="height",os="Right",as="Left",ls="Top",cs="Bottom",Kt="padding",pn="margin",Er="Width",El="Height",ee="px",gn=function(t){return lt.getComputedStyle(t.nodeType===Node.DOCUMENT_NODE?t.scrollingElement:t)},Xm=function(t){var n=gn(t).position;t.style.position=n==="absolute"||n==="fixed"?n:"relative"},Qc=function(t,n){for(var e in n)e in t||(t[e]=n[e]);return t},Wn=function(t,n){var e=n&&gn(t)[Wa]!=="matrix(1, 0, 0, 1, 0, 0)"&&q.to(t,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),i=t.getBoundingClientRect?t.getBoundingClientRect():t.scrollingElement.getBoundingClientRect();return e&&e.progress(0).kill(),i},Mo=function(t,n){var e=n.d2;return t["offset"+e]||t["client"+e]||0},wf=function(t){var n=[],e=t.labels,i=t.duration(),s;for(s in e)n.push(e[s]/i);return n},qm=function(t){return function(n){return q.utils.snap(wf(t),n)}},Cl=function(t){var n=q.utils.snap(t),e=Array.isArray(t)&&t.slice(0).sort(function(i,s){return i-s});return e?function(i,s,o){o===void 0&&(o=.001);var a;if(!s)return n(i);if(s>0){for(i-=o,a=0;a<e.length;a++)if(e[a]>=i)return e[a];return e[a-1]}else for(a=e.length,i+=o;a--;)if(e[a]<=i)return e[a];return e[0]}:function(i,s,o){o===void 0&&(o=.001);var a=n(i);return!s||Math.abs(a-i)<o||a-i<0==s<0?a:n(s<0?i-t:i+t)}},Vm=function(t){return function(n,e){return Cl(wf(t))(n,e.direction)}},qs=function(t,n,e,i){return e.split(",").forEach(function(s){return t(n,s,i)})},ae=function(t,n,e,i,s){return t.addEventListener(n,e,{passive:!i,capture:!!s})},oe=function(t,n,e,i){return t.removeEventListener(n,e,!!i)},Vs=function(t,n,e){e=e&&e.wheelHandler,e&&(t(n,"wheel",e),t(n,"touchmove",e))},Kc={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},Us={toggleActions:"play",anticipatePin:0},Po={top:0,left:0,center:.5,bottom:1,right:1},lo=function(t,n){if(je(t)){var e=t.indexOf("="),i=~e?+(t.charAt(e-1)+1)*parseFloat(t.substr(e+1)):0;~e&&(t.indexOf("%")>e&&(i*=n/100),t=t.substr(0,e-1)),t=i+(t in Po?Po[t]*n:~t.indexOf("%")?parseFloat(t)*n/100:parseFloat(t)||0)}return t},js=function(t,n,e,i,s,o,a,l){var c=s.startColor,u=s.endColor,h=s.fontSize,f=s.indent,d=s.fontWeight,p=xt.createElement("div"),g=qi(e)||di(e,"pinType")==="fixed",m=t.indexOf("scroller")!==-1,v=g?bt:e.tagName==="IFRAME"?e.contentDocument.body:e,_=t.indexOf("start")!==-1,w=_?c:u,x="border-color:"+w+";font-size:"+h+";color:"+w+";font-weight:"+d+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return x+="position:"+((m||l)&&g?"fixed;":"absolute;"),(m||l||!g)&&(x+=(i===ne?Tl:kl)+":"+(o+parseFloat(f))+"px;"),a&&(x+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),p._isStart=_,p.setAttribute("class","gsap-marker-"+t+(n?" marker-"+n:"")),p.style.cssText=x,p.innerText=n||n===0?t+"-"+n:t,v.children[0]?v.insertBefore(p,v.children[0]):v.appendChild(p),p._offset=p["offset"+i.op.d2],co(p,0,i,_),p},co=function(t,n,e,i){var s={display:"block"},o=e[i?"os2":"p2"],a=e[i?"p2":"os2"];t._isFlipped=i,s[e.a+"Percent"]=i?-100:0,s[e.a]=i?"1px":0,s["border"+o+Er]=1,s["border"+a+Er]=0,s[e.p]=n+"px",q.set(t,s)},at=[],Ua={},xs,Zc=function(){return we()-yn>34&&(xs||(xs=requestAnimationFrame(Un)))},rr=function(){(!Me||!Me.isPressed||Me.startX>bt.clientWidth)&&(ct.cache++,Me?xs||(xs=requestAnimationFrame(Un)):Un(),yn||Ui("scrollStart"),yn=we())},ca=function(){pf=lt.innerWidth,df=lt.innerHeight},Qr=function(t){ct.cache++,(t===!0||!ve&&!ff&&!xt.fullscreenElement&&!xt.webkitFullscreenElement&&(!Xa||pf!==lt.innerWidth||Math.abs(lt.innerHeight-df)>lt.innerHeight*.25))&&Co.restart(!0)},Vi={},Um=[],xf=function r(){return oe(ot,"scrollEnd",r)||zi(!0)},Ui=function(t){return Vi[t]&&Vi[t].map(function(n){return n()})||Um},Ue=[],Sf=function(t){for(var n=0;n<Ue.length;n+=5)(!t||Ue[n+4]&&Ue[n+4].query===t)&&(Ue[n].style.cssText=Ue[n+1],Ue[n].getBBox&&Ue[n].setAttribute("transform",Ue[n+2]||""),Ue[n+3].uncache=1)},Tf=function(){return ct.forEach(function(t){return Se(t)&&++t.cacheID&&(t.rec=t())})},Ml=function(t,n){var e;for(Pe=0;Pe<at.length;Pe++)e=at[Pe],e&&(!n||e._ctx===n)&&(t?e.kill(1):e.revert(!0,!0));ss=!0,n&&Sf(n),n||Ui("revert")},kf=function(t,n){ct.cache++,(n||!Ae)&&ct.forEach(function(e){return Se(e)&&e.cacheID++&&(e.rec=0)}),je(t)&&(lt.history.scrollRestoration=xl=t)},Ae,Yi=0,Jc,jm=function(){if(Jc!==Yi){var t=Jc=Yi;requestAnimationFrame(function(){return t===Yi&&zi(!0)})}},Ef=function(){bt.appendChild(yr),Sl=!Me&&yr.offsetHeight||lt.innerHeight,bt.removeChild(yr)},tu=function(t){return ws(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(n){return n.style.display=t?"none":"block"})},zi=function(t,n){if(Je=xt.documentElement,bt=xt.body,wl=[lt,xt,Je,bt],yn&&!t&&!ss){ae(ot,"scrollEnd",xf);return}Ef(),Ae=ot.isRefreshing=!0,ss||Tf();var e=Ui("refreshInit");hf&&ot.sort(),n||Ml(),ct.forEach(function(i){Se(i)&&(i.smooth&&(i.target.style.scrollBehavior="auto"),i(0))}),at.slice(0).forEach(function(i){return i.refresh()}),ss=!1,at.forEach(function(i){if(i._subPinOffset&&i.pin){var s=i.vars.horizontal?"offsetWidth":"offsetHeight",o=i.pin[s];i.revert(!0,1),i.adjustPinSpacing(i.pin[s]-o),i.refresh()}}),Va=1,tu(!0),at.forEach(function(i){var s=Ln(i.scroller,i._dir),o=i.vars.end==="max"||i._endClamp&&i.end>s,a=i._startClamp&&i.start>=s;(o||a)&&i.setPositions(a?s-1:i.start,o?Math.max(a?s:i.start+1,s):i.end,!0)}),tu(!1),Va=0,e.forEach(function(i){return i&&i.render&&i.render(-1)}),ct.forEach(function(i){Se(i)&&(i.smooth&&requestAnimationFrame(function(){return i.target.style.scrollBehavior="smooth"}),i.rec&&i(i.rec))}),kf(xl,1),Co.pause(),Yi++,Ae=2,Un(2),at.forEach(function(i){return Se(i.vars.onRefresh)&&i.vars.onRefresh(i)}),Ae=ot.isRefreshing=!1,Ui("refresh")},ja=0,uo=1,us,Un=function(t){if(t===2||!Ae&&!ss){ot.isUpdating=!0,us&&us.update(0);var n=at.length,e=we(),i=e-la>=50,s=n&&at[0].scroll();if(uo=ja>s?-1:1,Ae||(ja=s),i&&(yn&&!No&&e-yn>200&&(yn=0,Ui("scrollEnd")),qr=la,la=e),uo<0){for(Pe=n;Pe-- >0;)at[Pe]&&at[Pe].update(0,i);uo=1}else for(Pe=0;Pe<n;Pe++)at[Pe]&&at[Pe].update(0,i);ot.isUpdating=!1}xs=0},Qa=[bf,vf,kl,Tl,pn+cs,pn+os,pn+ls,pn+as,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],ho=Qa.concat([Hi,Gi,"boxSizing","max"+Er,"max"+El,"position",pn,Kt,Kt+ls,Kt+os,Kt+cs,Kt+as]),Qm=function(t,n,e){br(e);var i=t._gsap;if(i.spacerIsNative)br(i.spacerState);else if(t._gsap.swappedIn){var s=n.parentNode;s&&(s.insertBefore(t,n),s.removeChild(n))}t._gsap.swappedIn=!1},ua=function(t,n,e,i){if(!t._gsap.swappedIn){for(var s=Qa.length,o=n.style,a=t.style,l;s--;)l=Qa[s],o[l]=e[l];o.position=e.position==="absolute"?"absolute":"relative",e.display==="inline"&&(o.display="inline-block"),a[kl]=a[Tl]="auto",o.flexBasis=e.flexBasis||"auto",o.overflow="visible",o.boxSizing="border-box",o[Hi]=Mo(t,Re)+ee,o[Gi]=Mo(t,ne)+ee,o[Kt]=a[pn]=a[vf]=a[bf]="0",br(i),a[Hi]=a["max"+Er]=e[Hi],a[Gi]=a["max"+El]=e[Gi],a[Kt]=e[Kt],t.parentNode!==n&&(t.parentNode.insertBefore(n,t),n.appendChild(t)),t._gsap.swappedIn=!0}},Km=/([A-Z])/g,br=function(t){if(t){var n=t.t.style,e=t.length,i=0,s,o;for((t.t._gsap||q.core.getCache(t.t)).uncache=1;i<e;i+=2)o=t[i+1],s=t[i],o?n[s]=o:n[s]&&n.removeProperty(s.replace(Km,"-$1").toLowerCase())}},Qs=function(t){for(var n=ho.length,e=t.style,i=[],s=0;s<n;s++)i.push(ho[s],e[ho[s]]);return i.t=t,i},Zm=function(t,n,e){for(var i=[],s=t.length,o=e?8:0,a;o<s;o+=2)a=t[o],i.push(a,a in n?n[a]:t[o+1]);return i.t=t.t,i},fo={left:0,top:0},eu=function(t,n,e,i,s,o,a,l,c,u,h,f,d,p){Se(t)&&(t=t(l)),je(t)&&t.substr(0,3)==="max"&&(t=f+(t.charAt(4)==="="?lo("0"+t.substr(3),e):0));var g=d?d.time():0,m,v,_;if(d&&d.seek(0),isNaN(t)||(t=+t),jr(t))d&&(t=q.utils.mapRange(d.scrollTrigger.start,d.scrollTrigger.end,0,f,t)),a&&co(a,e,i,!0);else{Se(n)&&(n=n(l));var w=(t||"0").split(" "),x,S,k,T;_=De(n,l)||bt,x=Wn(_)||{},(!x||!x.left&&!x.top)&&gn(_).display==="none"&&(T=_.style.display,_.style.display="block",x=Wn(_),T?_.style.display=T:_.style.removeProperty("display")),S=lo(w[0],x[i.d]),k=lo(w[1]||"0",e),t=x[i.p]-c[i.p]-u+S+s-k,a&&co(a,k,i,e-k<20||a._isStart&&k>20),e-=e-k}if(p&&(l[p]=t||-.001,t<0&&(t=0)),o){var A=t+e,C=o._isStart;m="scroll"+i.d2,co(o,A,i,C&&A>20||!C&&(h?Math.max(bt[m],Je[m]):o.parentNode[m])<=A+1),h&&(c=Wn(a),h&&(o.style[i.op.p]=c[i.op.p]-i.op.m-o._offset+ee))}return d&&_&&(m=Wn(_),d.seek(f),v=Wn(_),d._caScrollDist=m[i.p]-v[i.p],t=t/d._caScrollDist*f),d&&d.seek(g),d?t:Math.round(t)},Jm=/(webkit|moz|length|cssText|inset)/i,nu=function(t,n,e,i){if(t.parentNode!==n){var s=t.style,o,a;if(n===bt){t._stOrig=s.cssText,a=gn(t);for(o in a)!+o&&!Jm.test(o)&&a[o]&&typeof s[o]=="string"&&o!=="0"&&(s[o]=a[o]);s.top=e,s.left=i}else s.cssText=t._stOrig;q.core.getCache(t).uncache=1,n.appendChild(t)}},Cf=function(t,n,e){var i=n,s=i;return function(o){var a=Math.round(t());return a!==i&&a!==s&&Math.abs(a-i)>3&&Math.abs(a-s)>3&&(o=a,e&&e()),s=i,i=Math.round(o),i}},Ks=function(t,n,e){var i={};i[n.p]="+="+e,q.set(t,i)},iu=function(t,n){var e=_i(t,n),i="_scroll"+n.p2,s=function o(a,l,c,u,h){var f=o.tween,d=l.onComplete,p={};c=c||e();var g=Cf(e,c,function(){f.kill(),o.tween=0});return h=u&&h||0,u=u||a-c,f&&f.kill(),l[i]=a,l.inherit=!1,l.modifiers=p,p[i]=function(){return g(c+u*f.ratio+h*f.ratio*f.ratio)},l.onUpdate=function(){ct.cache++,o.tween&&Un()},l.onComplete=function(){o.tween=0,d&&d.call(f)},f=o.tween=q.to(t,l),f};return t[i]=e,e.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},ae(t,"wheel",e.wheelHandler),ot.isTouch&&ae(t,"touchmove",e.wheelHandler),s},ot=function(){function r(n,e){sr||r.register(q)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),qa(this),this.init(n,e)}var t=r.prototype;return t.init=function(e,i){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!Vr){this.update=this.refresh=this.kill=An;return}e=Qc(je(e)||jr(e)||e.nodeType?{trigger:e}:e,Us);var s=e,o=s.onUpdate,a=s.toggleClass,l=s.id,c=s.onToggle,u=s.onRefresh,h=s.scrub,f=s.trigger,d=s.pin,p=s.pinSpacing,g=s.invalidateOnRefresh,m=s.anticipatePin,v=s.onScrubComplete,_=s.onSnapComplete,w=s.once,x=s.snap,S=s.pinReparent,k=s.pinSpacer,T=s.containerAnimation,A=s.fastScrollEnd,C=s.preventOverlaps,P=e.horizontal||e.containerAnimation&&e.horizontal!==!1?Re:ne,B=!h&&h!==0,y=De(e.scroller||lt),I=q.core.getCache(y),F=qi(y),G=("pinType"in e?e.pinType:di(y,"pinType")||F&&"fixed")==="fixed",N=[e.onEnter,e.onLeave,e.onEnterBack,e.onLeaveBack],$=B&&e.toggleActions.split(" "),O="markers"in e?e.markers:Us.markers,z=F?0:parseFloat(gn(y)["border"+P.p2+Er])||0,b=this,Y=e.onRefreshInit&&function(){return e.onRefreshInit(b)},U=Ym(y,F,P),D=Wm(y,F),W=0,V=0,et=0,X=_i(y,P),_t,St,mt,It,Ct,j,rt,Yt,ie,M,At,ce,me,yt,ft,Nt,ue,Ft,bn,Rt,We,ke,Oe,Kn,Lt,Nn,Le,vn,wn,Xe,qe,st,ln,_e,ze,he,Fn,$n,fe;if(b._startClamp=b._endClamp=!1,b._dir=P,m*=45,b.scroller=y,b.scroll=T?T.time.bind(T):X,It=X(),b.vars=e,i=i||e.animation,"refreshPriority"in e&&(hf=1,e.refreshPriority===-9999&&(us=b)),I.tweenScroll=I.tweenScroll||{top:iu(y,ne),left:iu(y,Re)},b.tweenTo=_t=I.tweenScroll[P.p],b.scrubDuration=function(H){ln=jr(H)&&H,ln?st?st.duration(H):st=q.to(i,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:ln,paused:!0,onComplete:function(){return v&&v(b)}}):(st&&st.progress(1).kill(),st=0)},i&&(i.vars.lazy=!1,i._initted&&!b.isReverted||i.vars.immediateRender!==!1&&e.immediateRender!==!1&&i.duration()&&i.render(0,!0,!0),b.animation=i.pause(),i.scrollTrigger=b,b.scrubDuration(h),Xe=0,l||(l=i.vars.id)),x&&((!Pi(x)||x.push)&&(x={snapTo:x}),"scrollBehavior"in bt.style&&q.set(F?[bt,Je]:y,{scrollBehavior:"auto"}),ct.forEach(function(H){return Se(H)&&H.target===(F?xt.scrollingElement||Je:y)&&(H.smooth=!1)}),mt=Se(x.snapTo)?x.snapTo:x.snapTo==="labels"?qm(i):x.snapTo==="labelsDirectional"?Vm(i):x.directional!==!1?function(H,tt){return Cl(x.snapTo)(H,we()-V<500?0:tt.direction)}:q.utils.snap(x.snapTo),_e=x.duration||{min:.1,max:2},_e=Pi(_e)?rs(_e.min,_e.max):rs(_e,_e),ze=q.delayedCall(x.delay||ln/2||.1,function(){var H=X(),tt=we()-V<500,Q=_t.tween;if((tt||Math.abs(b.getVelocity())<10)&&!Q&&!No&&W!==H){var J=(H-j)/yt,jt=i&&!B?i.totalProgress():J,ht=tt?0:(jt-qe)/(we()-qr)*1e3||0,$t=q.utils.clamp(-J,1-J,ir(ht/2)*ht/.185),re=J+(x.inertia===!1?0:$t),zt,Mt,gt=x,ye=gt.onStart,Ot=gt.onInterrupt,be=gt.onComplete;if(zt=mt(re,b),jr(zt)||(zt=re),Mt=Math.max(0,Math.round(j+zt*yt)),H<=rt&&H>=j&&Mt!==H){if(Q&&!Q._initted&&Q.data<=ir(Mt-H))return;x.inertia===!1&&($t=zt-J),_t(Mt,{duration:_e(ir(Math.max(ir(re-jt),ir(zt-jt))*.185/ht/.05||0)),ease:x.ease||"power3",data:ir(Mt-H),onInterrupt:function(){return ze.restart(!0)&&Ot&&nr(b,Ot)},onComplete:function(){b.update(),W=X(),i&&!B&&(st?st.resetTo("totalProgress",zt,i._tTime/i._tDur):i.progress(zt)),Xe=qe=i&&!B?i.totalProgress():b.progress,_&&_(b),be&&nr(b,be)}},H,$t*yt,Mt-H-$t*yt),ye&&nr(b,ye,_t.tween)}}else b.isActive&&W!==H&&ze.restart(!0)}).pause()),l&&(Ua[l]=b),f=b.trigger=De(f||d!==!0&&d),fe=f&&f._gsap&&f._gsap.stRevert,fe&&(fe=fe(b)),d=d===!0?f:De(d),je(a)&&(a={targets:f,className:a}),d&&(p===!1||p===pn||(p=!p&&d.parentNode&&d.parentNode.style&&gn(d.parentNode).display==="flex"?!1:Kt),b.pin=d,St=q.core.getCache(d),St.spacer?ft=St.pinState:(k&&(k=De(k),k&&!k.nodeType&&(k=k.current||k.nativeElement),St.spacerIsNative=!!k,k&&(St.spacerState=Qs(k))),St.spacer=Ft=k||xt.createElement("div"),Ft.classList.add("pin-spacer"),l&&Ft.classList.add("pin-spacer-"+l),St.pinState=ft=Qs(d)),e.force3D!==!1&&q.set(d,{force3D:!0}),b.spacer=Ft=St.spacer,wn=gn(d),Kn=wn[p+P.os2],Rt=q.getProperty(d),We=q.quickSetter(d,P.a,ee),ua(d,Ft,wn),ue=Qs(d)),O){ce=Pi(O)?Qc(O,Kc):Kc,M=js("scroller-start",l,y,P,ce,0),At=js("scroller-end",l,y,P,ce,0,M),bn=M["offset"+P.op.d2];var Bn=De(di(y,"content")||y);Yt=this.markerStart=js("start",l,Bn,P,ce,bn,0,T),ie=this.markerEnd=js("end",l,Bn,P,ce,bn,0,T),T&&($n=q.quickSetter([Yt,ie],P.a,ee)),!G&&!(Dn.length&&di(y,"fixedMarkers")===!0)&&(Xm(F?bt:y),q.set([M,At],{force3D:!0}),Nn=q.quickSetter(M,P.a,ee),vn=q.quickSetter(At,P.a,ee))}if(T){var nt=T.vars.onUpdate,Z=T.vars.onUpdateParams;T.eventCallback("onUpdate",function(){b.update(0,0,1),nt&&nt.apply(T,Z||[])})}if(b.previous=function(){return at[at.indexOf(b)-1]},b.next=function(){return at[at.indexOf(b)+1]},b.revert=function(H,tt){if(!tt)return b.kill(!0);var Q=H!==!1||!b.enabled,J=ve;Q!==b.isReverted&&(Q&&(he=Math.max(X(),b.scroll.rec||0),et=b.progress,Fn=i&&i.progress()),Yt&&[Yt,ie,M,At].forEach(function(jt){return jt.style.display=Q?"none":"block"}),Q&&(ve=b,b.update(Q)),d&&(!S||!b.isActive)&&(Q?Qm(d,Ft,ft):ua(d,Ft,gn(d),Lt)),Q||b.update(Q),ve=J,b.isReverted=Q)},b.refresh=function(H,tt,Q,J){if(!((ve||!b.enabled)&&!tt)){if(d&&H&&yn){ae(r,"scrollEnd",xf);return}!Ae&&Y&&Y(b),ve=b,_t.tween&&!Q&&(_t.tween.kill(),_t.tween=0),st&&st.pause(),g&&i&&(i.revert({kill:!1}).invalidate(),i.getChildren?i.getChildren(!0,!0,!1).forEach(function(E){return E.vars.immediateRender&&E.render(0,!0,!0)}):i.vars.immediateRender&&i.render(0,!0,!0)),b.isReverted||b.revert(!0,!0),b._subPinOffset=!1;var jt=U(),ht=D(),$t=T?T.duration():Ln(y,P),re=yt<=.01||!yt,zt=0,Mt=J||0,gt=Pi(Q)?Q.end:e.end,ye=e.endTrigger||f,Ot=Pi(Q)?Q.start:e.start||(e.start===0||!f?0:d?"0 0":"0 100%"),be=b.pinnedContainer=e.pinnedContainer&&De(e.pinnedContainer,b),cn=f&&Math.max(0,at.indexOf(b))||0,Jt=cn,te,se,un,bi,Qt,Xt,hn,Cr,Mr,vi,fn,Zn,Ki;for(O&&Pi(Q)&&(Zn=q.getProperty(M,P.p),Ki=q.getProperty(At,P.p));Jt-- >0;)Xt=at[Jt],Xt.end||Xt.refresh(0,1)||(ve=b),hn=Xt.pin,hn&&(hn===f||hn===d||hn===be)&&!Xt.isReverted&&(vi||(vi=[]),vi.unshift(Xt),Xt.revert(!0,!0)),Xt!==at[Jt]&&(cn--,Jt--);for(Se(Ot)&&(Ot=Ot(b)),Ot=qc(Ot,"start",b),j=eu(Ot,f,jt,P,X(),Yt,M,b,ht,z,G,$t,T,b._startClamp&&"_startClamp")||(d?-.001:0),Se(gt)&&(gt=gt(b)),je(gt)&&!gt.indexOf("+=")&&(~gt.indexOf(" ")?gt=(je(Ot)?Ot.split(" ")[0]:"")+gt:(zt=lo(gt.substr(2),jt),gt=je(Ot)?Ot:(T?q.utils.mapRange(0,T.duration(),T.scrollTrigger.start,T.scrollTrigger.end,j):j)+zt,ye=f)),gt=qc(gt,"end",b),rt=Math.max(j,eu(gt||(ye?"100% 0":$t),ye,jt,P,X()+zt,ie,At,b,ht,z,G,$t,T,b._endClamp&&"_endClamp"))||-.001,zt=0,Jt=cn;Jt--;)Xt=at[Jt]||{},hn=Xt.pin,hn&&Xt.start-Xt._pinPush<=j&&!T&&Xt.end>0&&(te=Xt.end-(b._startClamp?Math.max(0,Xt.start):Xt.start),(hn===f&&Xt.start-Xt._pinPush<j||hn===be)&&isNaN(Ot)&&(zt+=te*(1-Xt.progress)),hn===d&&(Mt+=te));if(j+=zt,rt+=zt,b._startClamp&&(b._startClamp+=zt),b._endClamp&&!Ae&&(b._endClamp=rt||-.001,rt=Math.min(rt,Ln(y,P))),yt=rt-j||(j-=.01)&&.001,re&&(et=q.utils.clamp(0,1,q.utils.normalize(j,rt,he))),b._pinPush=Mt,Yt&&zt&&(te={},te[P.a]="+="+zt,be&&(te[P.p]="-="+X()),q.set([Yt,ie],te)),d&&!(Va&&b.end>=Ln(y,P)))te=gn(d),bi=P===ne,un=X(),ke=parseFloat(Rt(P.a))+Mt,!$t&&rt>1&&(fn=(F?xt.scrollingElement||Je:y).style,fn={style:fn,value:fn["overflow"+P.a.toUpperCase()]},F&&gn(bt)["overflow"+P.a.toUpperCase()]!=="scroll"&&(fn.style["overflow"+P.a.toUpperCase()]="scroll")),ua(d,Ft,te),ue=Qs(d),se=Wn(d,!0),Cr=G&&_i(y,bi?Re:ne)(),p?(Lt=[p+P.os2,yt+Mt+ee],Lt.t=Ft,Jt=p===Kt?Mo(d,P)+yt+Mt:0,Jt&&(Lt.push(P.d,Jt+ee),Ft.style.flexBasis!=="auto"&&(Ft.style.flexBasis=Jt+ee)),br(Lt),be&&at.forEach(function(E){E.pin===be&&E.vars.pinSpacing!==!1&&(E._subPinOffset=!0)}),G&&X(he)):(Jt=Mo(d,P),Jt&&Ft.style.flexBasis!=="auto"&&(Ft.style.flexBasis=Jt+ee)),G&&(Qt={top:se.top+(bi?un-j:Cr)+ee,left:se.left+(bi?Cr:un-j)+ee,boxSizing:"border-box",position:"fixed"},Qt[Hi]=Qt["max"+Er]=Math.ceil(se.width)+ee,Qt[Gi]=Qt["max"+El]=Math.ceil(se.height)+ee,Qt[pn]=Qt[pn+ls]=Qt[pn+os]=Qt[pn+cs]=Qt[pn+as]="0",Qt[Kt]=te[Kt],Qt[Kt+ls]=te[Kt+ls],Qt[Kt+os]=te[Kt+os],Qt[Kt+cs]=te[Kt+cs],Qt[Kt+as]=te[Kt+as],Nt=Zm(ft,Qt,S),Ae&&X(0)),i?(Mr=i._initted,oa(1),i.render(i.duration(),!0,!0),Oe=Rt(P.a)-ke+yt+Mt,Le=Math.abs(yt-Oe)>1,G&&Le&&Nt.splice(Nt.length-2,2),i.render(0,!0,!0),Mr||i.invalidate(!0),i.parent||i.totalTime(i.totalTime()),oa(0)):Oe=yt,fn&&(fn.value?fn.style["overflow"+P.a.toUpperCase()]=fn.value:fn.style.removeProperty("overflow-"+P.a));else if(f&&X()&&!T)for(se=f.parentNode;se&&se!==bt;)se._pinOffset&&(j-=se._pinOffset,rt-=se._pinOffset),se=se.parentNode;vi&&vi.forEach(function(E){return E.revert(!1,!0)}),b.start=j,b.end=rt,It=Ct=Ae?he:X(),!T&&!Ae&&(It<he&&X(he),b.scroll.rec=0),b.revert(!1,!0),V=we(),ze&&(W=-1,ze.restart(!0)),ve=0,i&&B&&(i._initted||Fn)&&i.progress()!==Fn&&i.progress(Fn||0,!0).render(i.time(),!0,!0),(re||et!==b.progress||T||g||i&&!i._initted)&&(i&&!B&&(i._initted||et||i.vars.immediateRender!==!1)&&i.totalProgress(T&&j<-.001&&!et?q.utils.normalize(j,rt,0):et,!0),b.progress=re||(It-j)/yt===et?0:et),d&&p&&(Ft._pinOffset=Math.round(b.progress*Oe)),st&&st.invalidate(),isNaN(Zn)||(Zn-=q.getProperty(M,P.p),Ki-=q.getProperty(At,P.p),Ks(M,P,Zn),Ks(Yt,P,Zn-(J||0)),Ks(At,P,Ki),Ks(ie,P,Ki-(J||0))),re&&!Ae&&b.update(),u&&!Ae&&!me&&(me=!0,u(b),me=!1)}},b.getVelocity=function(){return(X()-Ct)/(we()-qr)*1e3||0},b.endAnimation=function(){Br(b.callbackAnimation),i&&(st?st.progress(1):i.paused()?B||Br(i,b.direction<0,1):Br(i,i.reversed()))},b.labelToScroll=function(H){return i&&i.labels&&(j||b.refresh()||j)+i.labels[H]/i.duration()*yt||0},b.getTrailing=function(H){var tt=at.indexOf(b),Q=b.direction>0?at.slice(0,tt).reverse():at.slice(tt+1);return(je(H)?Q.filter(function(J){return J.vars.preventOverlaps===H}):Q).filter(function(J){return b.direction>0?J.end<=j:J.start>=rt})},b.update=function(H,tt,Q){if(!(T&&!Q&&!H)){var J=Ae===!0?he:b.scroll(),jt=H?0:(J-j)/yt,ht=jt<0?0:jt>1?1:jt||0,$t=b.progress,re,zt,Mt,gt,ye,Ot,be,cn;if(tt&&(Ct=It,It=T?X():J,x&&(qe=Xe,Xe=i&&!B?i.totalProgress():ht)),m&&d&&!ve&&!Ws&&yn&&(!ht&&j<J+(J-Ct)/(we()-qr)*m?ht=1e-4:ht===1&&rt>J+(J-Ct)/(we()-qr)*m&&(ht=.9999)),ht!==$t&&b.enabled){if(re=b.isActive=!!ht&&ht<1,zt=!!$t&&$t<1,Ot=re!==zt,ye=Ot||!!ht!=!!$t,b.direction=ht>$t?1:-1,b.progress=ht,ye&&!ve&&(Mt=ht&&!$t?0:ht===1?1:$t===1?2:3,B&&(gt=!Ot&&$[Mt+1]!=="none"&&$[Mt+1]||$[Mt],cn=i&&(gt==="complete"||gt==="reset"||gt in i))),C&&(Ot||cn)&&(cn||h||!i)&&(Se(C)?C(b):b.getTrailing(C).forEach(function(un){return un.endAnimation()})),B||(st&&!ve&&!Ws?(st._dp._time-st._start!==st._time&&st.render(st._dp._time-st._start),st.resetTo?st.resetTo("totalProgress",ht,i._tTime/i._tDur):(st.vars.totalProgress=ht,st.invalidate().restart())):i&&i.totalProgress(ht,!!(ve&&(V||H)))),d){if(H&&p&&(Ft.style[p+P.os2]=Kn),!G)We(Ur(ke+Oe*ht));else if(ye){if(be=!H&&ht>$t&&rt+1>J&&J+1>=Ln(y,P),S)if(!H&&(re||be)){var Jt=Wn(d,!0),te=J-j;nu(d,bt,Jt.top+(P===ne?te:0)+ee,Jt.left+(P===ne?0:te)+ee)}else nu(d,Ft);br(re||be?Nt:ue),Le&&ht<1&&re||We(ke+(ht===1&&!be?Oe:0))}}x&&!_t.tween&&!ve&&!Ws&&ze.restart(!0),a&&(Ot||w&&ht&&(ht<1||!aa))&&ws(a.targets).forEach(function(un){return un.classList[re||w?"add":"remove"](a.className)}),o&&!B&&!H&&o(b),ye&&!ve?(B&&(cn&&(gt==="complete"?i.pause().totalProgress(1):gt==="reset"?i.restart(!0).pause():gt==="restart"?i.restart(!0):i[gt]()),o&&o(b)),(Ot||!aa)&&(c&&Ot&&nr(b,c),N[Mt]&&nr(b,N[Mt]),w&&(ht===1?b.kill(!1,1):N[Mt]=0),Ot||(Mt=ht===1?1:3,N[Mt]&&nr(b,N[Mt]))),A&&!re&&Math.abs(b.getVelocity())>(jr(A)?A:2500)&&(Br(b.callbackAnimation),st?st.progress(1):Br(i,gt==="reverse"?1:!ht,1))):B&&o&&!ve&&o(b)}if(vn){var se=T?J/T.duration()*(T._caScrollDist||0):J;Nn(se+(M._isFlipped?1:0)),vn(se)}$n&&$n(-J/T.duration()*(T._caScrollDist||0))}},b.enable=function(H,tt){b.enabled||(b.enabled=!0,ae(y,"resize",Qr),F||ae(y,"scroll",rr),Y&&ae(r,"refreshInit",Y),H!==!1&&(b.progress=et=0,It=Ct=W=X()),tt!==!1&&b.refresh())},b.getTween=function(H){return H&&_t?_t.tween:st},b.setPositions=function(H,tt,Q,J){if(T){var jt=T.scrollTrigger,ht=T.duration(),$t=jt.end-jt.start;H=jt.start+$t*H/ht,tt=jt.start+$t*tt/ht}b.refresh(!1,!1,{start:Vc(H,Q&&!!b._startClamp),end:Vc(tt,Q&&!!b._endClamp)},J),b.update()},b.adjustPinSpacing=function(H){if(Lt&&H){var tt=Lt.indexOf(P.d)+1;Lt[tt]=parseFloat(Lt[tt])+H+ee,Lt[1]=parseFloat(Lt[1])+H+ee,br(Lt)}},b.disable=function(H,tt){if(H!==!1&&b.revert(!0,!0),b.enabled&&(b.enabled=b.isActive=!1,tt||st&&st.pause(),he=0,St&&(St.uncache=1),Y&&oe(r,"refreshInit",Y),ze&&(ze.pause(),_t.tween&&_t.tween.kill()&&(_t.tween=0)),!F)){for(var Q=at.length;Q--;)if(at[Q].scroller===y&&at[Q]!==b)return;oe(y,"resize",Qr),F||oe(y,"scroll",rr)}},b.kill=function(H,tt){b.disable(H,tt),st&&!tt&&st.kill(),l&&delete Ua[l];var Q=at.indexOf(b);Q>=0&&at.splice(Q,1),Q===Pe&&uo>0&&Pe--,Q=0,at.forEach(function(J){return J.scroller===b.scroller&&(Q=1)}),Q||Ae||(b.scroll.rec=0),i&&(i.scrollTrigger=null,H&&i.revert({kill:!1}),tt||i.kill()),Yt&&[Yt,ie,M,At].forEach(function(J){return J.parentNode&&J.parentNode.removeChild(J)}),us===b&&(us=0),d&&(St&&(St.uncache=1),Q=0,at.forEach(function(J){return J.pin===d&&Q++}),Q||(St.spacer=0)),e.onKill&&e.onKill(b)},at.push(b),b.enable(!1,!1),fe&&fe(b),i&&i.add&&!yt){var ut=b.update;b.update=function(){b.update=ut,ct.cache++,j||rt||b.refresh()},q.delayedCall(.01,b.update),yt=.01,j=rt=0}else b.refresh();d&&jm()},r.register=function(e){return sr||(q=e||mf(),gf()&&window.document&&r.enable(),sr=Vr),sr},r.defaults=function(e){if(e)for(var i in e)Us[i]=e[i];return Us},r.disable=function(e,i){Vr=0,at.forEach(function(o){return o[i?"kill":"disable"](e)}),oe(lt,"wheel",rr),oe(xt,"scroll",rr),clearInterval(Ys),oe(xt,"touchcancel",An),oe(bt,"touchstart",An),qs(oe,xt,"pointerdown,touchstart,mousedown",Uc),qs(oe,xt,"pointerup,touchend,mouseup",jc),Co.kill(),Xs(oe);for(var s=0;s<ct.length;s+=3)Vs(oe,ct[s],ct[s+1]),Vs(oe,ct[s],ct[s+2])},r.enable=function(){if(lt=window,xt=document,Je=xt.documentElement,bt=xt.body,q){if(ws=q.utils.toArray,rs=q.utils.clamp,qa=q.core.context||An,oa=q.core.suppressOverwrites||An,xl=lt.history.scrollRestoration||"auto",ja=lt.pageYOffset||0,q.core.globals("ScrollTrigger",r),bt){Vr=1,yr=document.createElement("div"),yr.style.height="100vh",yr.style.position="absolute",Ef(),Gm(),Ut.register(q),r.isTouch=Ut.isTouch,ei=Ut.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),Xa=Ut.isTouch===1,ae(lt,"wheel",rr),wl=[lt,xt,Je,bt],q.matchMedia?(r.matchMedia=function(u){var h=q.matchMedia(),f;for(f in u)h.add(f,u[f]);return h},q.addEventListener("matchMediaInit",function(){Tf(),Ml()}),q.addEventListener("matchMediaRevert",function(){return Sf()}),q.addEventListener("matchMedia",function(){zi(0,1),Ui("matchMedia")}),q.matchMedia().add("(orientation: portrait)",function(){return ca(),ca})):console.warn("Requires GSAP 3.11.0 or later"),ca(),ae(xt,"scroll",rr);var e=bt.hasAttribute("style"),i=bt.style,s=i.borderTopStyle,o=q.core.Animation.prototype,a,l;for(o.revert||Object.defineProperty(o,"revert",{value:function(){return this.time(-.01,!0)}}),i.borderTopStyle="solid",a=Wn(bt),ne.m=Math.round(a.top+ne.sc())||0,Re.m=Math.round(a.left+Re.sc())||0,s?i.borderTopStyle=s:i.removeProperty("border-top-style"),e||(bt.setAttribute("style",""),bt.removeAttribute("style")),Ys=setInterval(Zc,250),q.delayedCall(.5,function(){return Ws=0}),ae(xt,"touchcancel",An),ae(bt,"touchstart",An),qs(ae,xt,"pointerdown,touchstart,mousedown",Uc),qs(ae,xt,"pointerup,touchend,mouseup",jc),Wa=q.utils.checkPrefix("transform"),ho.push(Wa),sr=we(),Co=q.delayedCall(.2,zi).pause(),or=[xt,"visibilitychange",function(){var u=lt.innerWidth,h=lt.innerHeight;xt.hidden?(Wc=u,Xc=h):(Wc!==u||Xc!==h)&&Qr()},xt,"DOMContentLoaded",zi,lt,"load",zi,lt,"resize",Qr],Xs(ae),at.forEach(function(u){return u.enable(0,1)}),l=0;l<ct.length;l+=3)Vs(oe,ct[l],ct[l+1]),Vs(oe,ct[l],ct[l+2])}else if(xt){var c=function u(){r.enable(),xt.removeEventListener("DOMContentLoaded",u)};xt.addEventListener("DOMContentLoaded",c)}}},r.config=function(e){"limitCallbacks"in e&&(aa=!!e.limitCallbacks);var i=e.syncInterval;i&&clearInterval(Ys)||(Ys=i)&&setInterval(Zc,i),"ignoreMobileResize"in e&&(Xa=r.isTouch===1&&e.ignoreMobileResize),"autoRefreshEvents"in e&&(Xs(oe)||Xs(ae,e.autoRefreshEvents||"none"),ff=(e.autoRefreshEvents+"").indexOf("resize")===-1)},r.scrollerProxy=function(e,i){var s=De(e),o=ct.indexOf(s),a=qi(s);~o&&ct.splice(o,a?6:2),i&&(a?Dn.unshift(lt,i,bt,i,Je,i):Dn.unshift(s,i))},r.clearMatchMedia=function(e){at.forEach(function(i){return i._ctx&&i._ctx.query===e&&i._ctx.kill(!0,!0)})},r.isInViewport=function(e,i,s){var o=(je(e)?De(e):e).getBoundingClientRect(),a=o[s?Hi:Gi]*i||0;return s?o.right-a>0&&o.left+a<lt.innerWidth:o.bottom-a>0&&o.top+a<lt.innerHeight},r.positionInViewport=function(e,i,s){je(e)&&(e=De(e));var o=e.getBoundingClientRect(),a=o[s?Hi:Gi],l=i==null?a/2:i in Po?Po[i]*a:~i.indexOf("%")?parseFloat(i)*a/100:parseFloat(i)||0;return s?(o.left+l)/lt.innerWidth:(o.top+l)/lt.innerHeight},r.killAll=function(e){if(at.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),e!==!0){var i=Vi.killAll||[];Vi={},i.forEach(function(s){return s()})}},r}();ot.version="3.15.0";ot.saveStyles=function(r){return r?ws(r).forEach(function(t){if(t&&t.style){var n=Ue.indexOf(t);n>=0&&Ue.splice(n,5),Ue.push(t,t.style.cssText,t.getBBox&&t.getAttribute("transform"),q.core.getCache(t),qa())}}):Ue};ot.revert=function(r,t){return Ml(!r,t)};ot.create=function(r,t){return new ot(r,t)};ot.refresh=function(r){return r?Qr(!0):(sr||ot.register())&&zi(!0)};ot.update=function(r){return++ct.cache&&Un(r===!0?2:0)};ot.clearScrollMemory=kf;ot.maxScroll=function(r,t){return Ln(r,t?Re:ne)};ot.getScrollFunc=function(r,t){return _i(De(r),t?Re:ne)};ot.getById=function(r){return Ua[r]};ot.getAll=function(){return at.filter(function(r){return r.vars.id!=="ScrollSmoother"})};ot.isScrolling=function(){return!!yn};ot.snapDirectional=Cl;ot.addEventListener=function(r,t){var n=Vi[r]||(Vi[r]=[]);~n.indexOf(t)||n.push(t)};ot.removeEventListener=function(r,t){var n=Vi[r],e=n&&n.indexOf(t);e>=0&&n.splice(e,1)};ot.batch=function(r,t){var n=[],e={},i=t.interval||.016,s=t.batchMax||1e9,o=function(c,u){var h=[],f=[],d=q.delayedCall(i,function(){u(h,f),h=[],f=[]}).pause();return function(p){h.length||d.restart(!0),h.push(p.trigger),f.push(p),s<=h.length&&d.progress(1)}},a;for(a in t)e[a]=a.substr(0,2)==="on"&&Se(t[a])&&a!=="onRefreshInit"?o(a,t[a]):t[a];return Se(s)&&(s=s(),ae(ot,"refresh",function(){return s=t.batchMax()})),ws(r).forEach(function(l){var c={};for(a in e)c[a]=e[a];c.trigger=l,n.push(ot.create(c))}),n};var ru=function(t,n,e,i){return n>i?t(i):n<0&&t(0),e>i?(i-n)/(e-n):e<0?n/(n-e):1},ha=function r(t,n){n===!0?t.style.removeProperty("touch-action"):t.style.touchAction=n===!0?"auto":n?"pan-"+n+(Ut.isTouch?" pinch-zoom":""):"none",t===Je&&r(bt,n)},Zs={auto:1,scroll:1},t1=function(t){var n=t.event,e=t.target,i=t.axis,s=(n.changedTouches?n.changedTouches[0]:n).target,o=s._gsap||q.core.getCache(s),a=we(),l;if(!o._isScrollT||a-o._isScrollT>2e3){for(;s&&s!==bt&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(Zs[(l=gn(s)).overflowY]||Zs[l.overflowX]));)s=s.parentNode;o._isScroll=s&&s!==e&&!qi(s)&&(Zs[(l=gn(s)).overflowY]||Zs[l.overflowX]),o._isScrollT=a}(o._isScroll||i==="x")&&(n.stopPropagation(),n._gsapAllow=!0)},Mf=function(t,n,e,i){return Ut.create({target:t,capture:!0,debounce:!1,lockAxis:!0,type:n,onWheel:i=i&&t1,onPress:i,onDrag:i,onScroll:i,onEnable:function(){return e&&ae(xt,Ut.eventTypes[0],ou,!1,!0)},onDisable:function(){return oe(xt,Ut.eventTypes[0],ou,!0)}})},e1=/(input|label|select|textarea)/i,su,ou=function(t){var n=e1.test(t.target.tagName);(n||su)&&(t._gsapAllow=!0,su=n)},n1=function(t){Pi(t)||(t={}),t.preventDefault=t.isNormalizer=t.allowClicks=!0,t.type||(t.type="wheel,touch"),t.debounce=!!t.debounce,t.id=t.id||"normalizer";var n=t,e=n.normalizeScrollX,i=n.momentum,s=n.allowNestedScroll,o=n.onRelease,a,l,c=De(t.target)||Je,u=q.core.globals().ScrollSmoother,h=u&&u.get(),f=ei&&(t.content&&De(t.content)||h&&t.content!==!1&&!h.smooth()&&h.content()),d=_i(c,ne),p=_i(c,Re),g=1,m=(Ut.isTouch&&lt.visualViewport?lt.visualViewport.scale*lt.visualViewport.width:lt.outerWidth)/lt.innerWidth,v=0,_=Se(i)?function(){return i(a)}:function(){return i||2.8},w,x,S=Mf(c,t.type,!0,s),k=function(){return x=!1},T=An,A=An,C=function(){l=Ln(c,ne),A=rs(ei?1:0,l),e&&(T=rs(0,Ln(c,Re))),w=Yi},P=function(){f._gsap.y=Ur(parseFloat(f._gsap.y)+d.offset)+"px",f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(f._gsap.y)+", 0, 1)",d.offset=d.cacheID=0},B=function(){if(x){requestAnimationFrame(k);var O=Ur(a.deltaY/2),z=A(d.v-O);if(f&&z!==d.v+d.offset){d.offset=z-d.v;var b=Ur((parseFloat(f&&f._gsap.y)||0)-d.offset);f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+b+", 0, 1)",f._gsap.y=b+"px",d.cacheID=ct.cache,Un()}return!0}d.offset&&P(),x=!0},y,I,F,G,N=function(){C(),y.isActive()&&y.vars.scrollY>l&&(d()>l?y.progress(1)&&d(l):y.resetTo("scrollY",l))};return f&&q.set(f,{y:"+=0"}),t.ignoreCheck=function($){return ei&&$.type==="touchmove"&&B()||g>1.05&&$.type!=="touchstart"||a.isGesturing||$.touches&&$.touches.length>1},t.onPress=function(){x=!1;var $=g;g=Ur((lt.visualViewport&&lt.visualViewport.scale||1)/m),y.pause(),$!==g&&ha(c,g>1.01?!0:e?!1:"x"),I=p(),F=d(),C(),w=Yi},t.onRelease=t.onGestureStart=function($,O){if(d.offset&&P(),!O)G.restart(!0);else{ct.cache++;var z=_(),b,Y;e&&(b=p(),Y=b+z*.05*-$.velocityX/.227,z*=ru(p,b,Y,Ln(c,Re)),y.vars.scrollX=T(Y)),b=d(),Y=b+z*.05*-$.velocityY/.227,z*=ru(d,b,Y,Ln(c,ne)),y.vars.scrollY=A(Y),y.invalidate().duration(z).play(.01),(ei&&y.vars.scrollY>=l||b>=l-1)&&q.to({},{onUpdate:N,duration:z})}o&&o($)},t.onWheel=function(){y._ts&&y.pause(),we()-v>1e3&&(w=0,v=we())},t.onChange=function($,O,z,b,Y){if(Yi!==w&&C(),O&&e&&p(T(b[2]===O?I+($.startX-$.x):p()+O-b[1])),z){d.offset&&P();var U=Y[2]===z,D=U?F+$.startY-$.y:d()+z-Y[1],W=A(D);U&&D!==W&&(F+=W-D),d(W)}(z||O)&&Un()},t.onEnable=function(){ha(c,e?!1:"x"),ot.addEventListener("refresh",N),ae(lt,"resize",N),d.smooth&&(d.target.style.scrollBehavior="auto",d.smooth=p.smooth=!1),S.enable()},t.onDisable=function(){ha(c,!0),oe(lt,"resize",N),ot.removeEventListener("refresh",N),S.kill()},t.lockAxis=t.lockAxis!==!1,a=new Ut(t),a.iOS=ei,ei&&!d()&&d(1),ei&&q.ticker.add(An),G=a._dc,y=q.to(a,{ease:"power4",paused:!0,inherit:!1,scrollX:e?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:Cf(d,d(),function(){return y.pause()})},onUpdate:Un,onComplete:G.vars.onComplete}),a};ot.sort=function(r){if(Se(r))return at.sort(r);var t=lt.pageYOffset||0;return ot.getAll().forEach(function(n){return n._sortY=n.trigger?t+n.trigger.getBoundingClientRect().top:n.start+lt.innerHeight}),at.sort(r||function(n,e){return(n.vars.refreshPriority||0)*-1e6+(n.vars.containerAnimation?1e6:n._sortY)-((e.vars.containerAnimation?1e6:e._sortY)+(e.vars.refreshPriority||0)*-1e6)})};ot.observe=function(r){return new Ut(r)};ot.normalizeScroll=function(r){if(typeof r>"u")return Me;if(r===!0&&Me)return Me.enable();if(r===!1){Me&&Me.kill(),Me=r;return}var t=r instanceof Ut?r:n1(r);return Me&&Me.target===t.target&&Me.kill(),qi(t.target)&&(Me=t),t};ot.core={_getVelocityProp:Ya,_inputObserver:Mf,_scrollers:ct,_proxies:Dn,bridge:{ss:function(){yn||Ui("scrollStart"),yn=we()},ref:function(){return ve}}};mf()&&q.registerPlugin(ot);Vt.registerPlugin(ot);function au(r){r.querySelectorAll(".chapter-panel h2, .atlas-panel h2").forEach(t=>_0(t))}const lu=Object.assign({"./chapters/ch1.ts":E0,"./chapters/ch2.ts":hg,"./chapters/ch3.ts":Tg,"./chapters/ch4.ts":zg,"./chapters/ch5.ts":dm,"./chapters/ch6.ts":Sm,"./chapters/ch7.ts":Rm,"./chapters/ch8.ts":Nm}),i1=Object.keys(lu).map(r=>{const t=r.match(/\/(ch\d+)\.ts$/);return t?{id:t[1],num:parseInt(t[1].slice(2),10),create:lu[r].createChapter}:null}).filter(r=>r!==null).sort((r,t)=>r.num-t.num);function r1(r,t){const n=[],e=[];return i1.forEach((i,s)=>{const o=document.getElementById(i.id);if(!o)throw new Error(`缺少章节容器 #${i.id}（检查 index.html）`);const a=kg[i.id];if(!a)throw new Error(`COPY 缺少 ${i.id} 文案`);const l=i.create({sky:r,root:o,copy:a,id:i.id});n.push(l),e.push(ot.create({trigger:o,start:"top top",end:"bottom bottom",scrub:!0,onEnter:()=>{l.enter(),au(o)},onEnterBack:()=>{l.enter(),au(o)},onLeave:()=>l.exit(),onLeaveBack:()=>l.exit(),onUpdate:c=>{l.update(c.progress),t(s+c.progress)}}))}),{chapters:n,triggers:e}}const Ao=30,cu=.22,s1=`
.app-cursor-ring, .app-cursor-dot {
  position: fixed; top: 0; left: 0; z-index: 60; pointer-events: none;
  border-radius: 50%; transform: translate(-50%, -50%);
  will-change: transform;
}
.app-cursor-ring {
  width: ${Ao}px; height: ${Ao}px;
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
`;function o1(r){if(window.matchMedia("(pointer: coarse)").matches)return;const t=document.createElement("style");t.textContent=s1,document.head.appendChild(t);const n=document.createElement("div");n.className="app-cursor-ring app-cursor-hidden";const e=document.createElement("div");e.className="app-cursor-dot app-cursor-hidden",document.body.append(n,e);let i=-100,s=-100,o=-100,a=-100,l=!1,c=!1;const u=document.querySelector(".sky-tooltip");window.addEventListener("pointermove",d=>{const p=d.target===r;i=d.clientX,s=d.clientY,p!==l&&(l=p,n.classList.toggle("app-cursor-hidden",!l),e.classList.toggle("app-cursor-hidden",!l))}),window.addEventListener("pointerdown",()=>{c=!0,n.classList.add("is-down")}),window.addEventListener("pointerup",()=>{c=!1,n.classList.remove("is-down")}),document.documentElement.addEventListener("mouseleave",()=>{l=!1,n.classList.add("app-cursor-hidden"),e.classList.add("app-cursor-hidden")});let h=1;const f=()=>{o+=(i-o)*cu,a+=(s-a)*cu;const d=u!==null&&u.style.display==="block",p=(d?.55:1)*(c?.8:1);h+=(p-h)*.2,n.classList.toggle("is-star",d),n.style.transform=`translate(${o-Ao/2}px, ${a-Ao/2}px) scale(${h.toFixed(3)})`,e.style.transform=`translate(${i-2}px, ${s-2}px)`,requestAnimationFrame(f)};requestAnimationFrame(f)}const a1=1.015,uu={ra:192.8595,dec:27.1283},hu={ra:266.405,dec:-28.9362},l1=.085,c1=.14,u1=.9,h1=.6,f1=new xu(.96,.9,.78),d1=new xu(1,.88,.68),p1=`
varying vec3 vDir;
void main() {
  // 球心在原点：物体空间坐标即天球方向（随父组岁差旋转，与星点行为一致）
  vDir = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,g1=`
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
`;function m1(r){const t=new it(...Ge(uu.ra,uu.dec)).normalize(),n=new it(...Ge(hu.ra,hu.dec)),e=n.addScaledVector(t,-n.dot(t)).normalize(),i=new it().crossVectors(t,e).normalize(),s=new ed(r*a1,96,64),o=new _u({vertexShader:p1,fragmentShader:g1,uniforms:{uPole:{value:t},uE0:{value:e},uE1:{value:i},uPeakAlpha:{value:l1},uWidth:{value:c1},uCenterSigma:{value:u1},uDust:{value:h1},uColorBand:{value:f1},uColorCore:{value:d1}},transparent:!0,depthWrite:!1,blending:Wi,side:nd}),a=new po(s,o);a.name="milkyway-shell";const l=new En;return l.name="milkyway",l.add(a),{group:l,dispose(){s.dispose(),o.dispose()}}}var fu="1.3.25";function Pf(r,t,n){return Math.max(r,Math.min(t,n))}function _1(r,t,n){return(1-n)*r+n*t}function y1(r,t,n,e){return _1(r,t,1-Math.exp(-n*e))}function b1(r,t){return(r%t+t)%t}var v1=class{constructor(){R(this,"isRunning",!1);R(this,"value",0);R(this,"from",0);R(this,"to",0);R(this,"currentTime",0);R(this,"lerp");R(this,"duration");R(this,"easing");R(this,"onUpdate")}advance(r){var n;if(!this.isRunning)return;let t=!1;if(this.duration&&this.easing){this.currentTime+=r;const e=Pf(0,this.currentTime/this.duration,1);t=e>=1;const i=t?1:this.easing(e);this.value=this.from+(this.to-this.from)*i}else this.lerp?(this.value=y1(this.value,this.to,this.lerp*60,r),Math.round(this.value)===Math.round(this.to)&&(this.value=this.to,t=!0)):(this.value=this.to,t=!0);t&&this.stop(),(n=this.onUpdate)==null||n.call(this,this.value,t)}stop(){this.isRunning=!1}fromTo(r,t,{lerp:n,duration:e,easing:i,onStart:s,onUpdate:o}){this.from=this.value=r,this.to=t,this.lerp=n,this.duration=e,this.easing=i,this.currentTime=0,this.isRunning=!0,s==null||s(),this.onUpdate=o}};function w1(r,t){let n;return function(...e){clearTimeout(n),n=setTimeout(()=>{n=void 0,r.apply(this,e)},t)}}var x1=class{constructor(r,t,{autoResize:n=!0,debounce:e=250}={}){R(this,"width",0);R(this,"height",0);R(this,"scrollHeight",0);R(this,"scrollWidth",0);R(this,"debouncedResize");R(this,"wrapperResizeObserver");R(this,"contentResizeObserver");R(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});R(this,"onWrapperResize",()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});R(this,"onContentResize",()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=r,this.content=t,n&&(this.debouncedResize=w1(this.resize,e),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){var r,t;(r=this.wrapperResizeObserver)==null||r.disconnect(),(t=this.contentResizeObserver)==null||t.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},Af=class{constructor(){R(this,"events",{})}emit(r,...t){var e;const n=this.events[r]||[];for(let i=0,s=n.length;i<s;i++)(e=n[i])==null||e.call(n,...t)}on(r,t){return this.events[r]?this.events[r].push(t):this.events[r]=[t],()=>{var n;this.events[r]=(n=this.events[r])==null?void 0:n.filter(e=>t!==e)}}off(r,t){var n;this.events[r]=(n=this.events[r])==null?void 0:n.filter(e=>t!==e)}destroy(){this.events={}}};const S1=100/6,ti={passive:!1};function du(r,t){return r===1?S1:r===2?t:1}var T1=class{constructor(r,t={wheelMultiplier:1,touchMultiplier:1}){R(this,"touchStart",{x:0,y:0});R(this,"lastDelta",{x:0,y:0});R(this,"window",{width:0,height:0});R(this,"emitter",new Af);R(this,"onTouchStart",r=>{const{clientX:t,clientY:n}=r.targetTouches?r.targetTouches[0]:r;this.touchStart.x=t,this.touchStart.y=n,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:r})});R(this,"onTouchMove",r=>{const{clientX:t,clientY:n}=r.targetTouches?r.targetTouches[0]:r,e=-(t-this.touchStart.x)*this.options.touchMultiplier,i=-(n-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=t,this.touchStart.y=n,this.lastDelta={x:e,y:i},this.emitter.emit("scroll",{deltaX:e,deltaY:i,event:r})});R(this,"onTouchEnd",r=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:r})});R(this,"onWheel",r=>{let{deltaX:t,deltaY:n,deltaMode:e}=r;const i=du(e,this.window.width),s=du(e,this.window.height);t*=i,n*=s,t*=this.options.wheelMultiplier,n*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:t,deltaY:n,event:r})});R(this,"onWindowResize",()=>{this.window={width:window.innerWidth,height:window.innerHeight}});this.element=r,this.options=t,window.addEventListener("resize",this.onWindowResize),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,ti),this.element.addEventListener("touchstart",this.onTouchStart,ti),this.element.addEventListener("touchmove",this.onTouchMove,ti),this.element.addEventListener("touchend",this.onTouchEnd,ti)}on(r,t){return this.emitter.on(r,t)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize),this.element.removeEventListener("wheel",this.onWheel,ti),this.element.removeEventListener("touchstart",this.onTouchStart,ti),this.element.removeEventListener("touchmove",this.onTouchMove,ti),this.element.removeEventListener("touchend",this.onTouchEnd,ti)}};const pu=r=>Math.min(1,1.001-2**(-10*r));var k1=class{constructor({wrapper:r=window,content:t=document.documentElement,eventsTarget:n=r,smoothWheel:e=!0,syncTouch:i=!1,syncTouchLerp:s=.075,touchInertiaExponent:o=1.7,duration:a,easing:l,lerp:c=.1,infinite:u=!1,orientation:h="vertical",gestureOrientation:f=h==="horizontal"?"both":"vertical",touchMultiplier:d=1,wheelMultiplier:p=1,autoResize:g=!0,prevent:m,virtualScroll:v,overscroll:_=!0,autoRaf:w=!1,anchors:x=!1,autoToggle:S=!1,allowNestedScroll:k=!1,__experimental__naiveDimensions:T=!1,naiveDimensions:A=T,stopInertiaOnNavigate:C=!1}={}){R(this,"_isScrolling",!1);R(this,"_isStopped",!1);R(this,"_isLocked",!1);R(this,"_preventNextNativeScrollEvent",!1);R(this,"_resetVelocityTimeout",null);R(this,"_rafId",null);R(this,"_isDraggingSelection",!1);R(this,"isTouching");R(this,"isIos");R(this,"time",0);R(this,"userData",{});R(this,"lastVelocity",0);R(this,"velocity",0);R(this,"direction",0);R(this,"options");R(this,"targetScroll");R(this,"animatedScroll");R(this,"animate",new v1);R(this,"emitter",new Af);R(this,"dimensions");R(this,"virtualScroll");R(this,"onScrollEnd",r=>{r instanceof CustomEvent||(this.isScrolling==="smooth"||this.isScrolling===!1)&&r.stopPropagation()});R(this,"dispatchScrollendEvent",()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))});R(this,"onTransitionEnd",r=>{var t;(t=r.propertyName)!=null&&t.includes("overflow")&&r.target===this.rootElement&&this.checkOverflow()});R(this,"onClick",r=>{const t=r.composedPath().filter(e=>e instanceof HTMLAnchorElement&&e.href).map(e=>new URL(e.href)),n=new URL(window.location.href);if(this.options.anchors){const e=t.find(i=>n.host===i.host&&n.pathname===i.pathname&&i.hash);if(e){const i=typeof this.options.anchors=="object"&&this.options.anchors?this.options.anchors:void 0,s=decodeURIComponent(e.hash);this.scrollTo(s,i);return}}if(this.options.stopInertiaOnNavigate&&t.some(e=>n.host===e.host&&n.pathname!==e.pathname)){this.reset();return}});R(this,"onPointerDown",r=>{r.button===1&&this.reset()});R(this,"onVirtualScroll",r=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(r)===!1)return;const{deltaX:t,deltaY:n,event:e}=r;if(this.emitter.emit("virtual-scroll",{deltaX:t,deltaY:n,event:e}),e.ctrlKey||e.lenisStopPropagation)return;const i=e.type.includes("touch"),s=e.type.includes("wheel");if(i&&this.isIos&&(e.type==="touchstart"&&(this._isDraggingSelection=this.isTouchOnSelectionHandle(e)),this._isDraggingSelection)){e.type==="touchend"&&(this._isDraggingSelection=!1);return}this.isTouching=e.type==="touchstart"||e.type==="touchmove";const o=t===0&&n===0;if(this.options.syncTouch&&i&&e.type==="touchstart"&&o&&!this.isStopped&&!this.isLocked){this.reset();return}const a=this.options.gestureOrientation==="vertical"&&n===0||this.options.gestureOrientation==="horizontal"&&t===0;if(o||a)return;let l=e.composedPath();l=l.slice(0,l.indexOf(this.rootElement));const c=this.options.prevent,u=Math.abs(t)>=Math.abs(n)?"horizontal":"vertical";if(l.find(p=>{var g,m,v,_,w;return p instanceof HTMLElement&&(typeof c=="function"&&(c==null?void 0:c(p))||((g=p.hasAttribute)==null?void 0:g.call(p,"data-lenis-prevent"))||u==="vertical"&&((m=p.hasAttribute)==null?void 0:m.call(p,"data-lenis-prevent-vertical"))||u==="horizontal"&&((v=p.hasAttribute)==null?void 0:v.call(p,"data-lenis-prevent-horizontal"))||i&&((_=p.hasAttribute)==null?void 0:_.call(p,"data-lenis-prevent-touch"))||s&&((w=p.hasAttribute)==null?void 0:w.call(p,"data-lenis-prevent-wheel"))||this.options.allowNestedScroll&&this.hasNestedScroll(p,{deltaX:t,deltaY:n}))}))return;if(this.isStopped||this.isLocked){e.cancelable&&e.preventDefault();return}if(!(this.options.syncTouch&&i||this.options.smoothWheel&&s)){this.isScrolling="native",this.animate.stop(),e.lenisStopPropagation=!0;return}let h=n;this.options.gestureOrientation==="both"?h=Math.abs(n)>Math.abs(t)?n:t:this.options.gestureOrientation==="horizontal"&&(h=t),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&this.limit>0&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&n>0||this.animatedScroll===this.limit&&n<0))&&(e.lenisStopPropagation=!0),e.cancelable&&e.preventDefault();const f=i&&this.options.syncTouch,d=i&&e.type==="touchend";d&&(h=Math.sign(h)*Math.abs(this.velocity)**this.options.touchInertiaExponent),this.scrollTo(this.targetScroll+h,{programmatic:!1,...f?{lerp:d?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})});R(this,"onNativeScroll",()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){const r=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-r,this.direction=Math.sign(this.animatedScroll-r),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}});R(this,"raf",r=>{const t=r-(this.time||r);this.time=r,this.animate.advance(t*.001),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))});window.lenisVersion=fu,window.lenis||(window.lenis={}),window.lenis.version=fu,h==="horizontal"&&(window.lenis.horizontal=!0),i===!0&&(window.lenis.touch=!0),this.isIos=/(iPad|iPhone|iPod)/g.test(navigator.userAgent),(!r||r===document.documentElement)&&(r=window),typeof a=="number"&&typeof l!="function"?l=pu:typeof l=="function"&&typeof a!="number"&&(a=1),this.options={wrapper:r,content:t,eventsTarget:n,smoothWheel:e,syncTouch:i,syncTouchLerp:s,touchInertiaExponent:o,duration:a,easing:l,lerp:c,infinite:u,gestureOrientation:f,orientation:h,touchMultiplier:d,wheelMultiplier:p,autoResize:g,prevent:m,virtualScroll:v,overscroll:_,autoRaf:w,anchors:x,autoToggle:S,allowNestedScroll:k,naiveDimensions:A,stopInertiaOnNavigate:C},this.dimensions=new x1(r,t,{autoResize:g}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.addEventListener("click",this.onClick),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown),this.virtualScroll=new T1(n,{touchMultiplier:d,wheelMultiplier:p}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoToggle&&(this.checkOverflow(),this.rootElement.addEventListener("transitionend",this.onTransitionEnd)),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.removeEventListener("click",this.onClick),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this._rafId&&cancelAnimationFrame(this._rafId)}on(r,t){return this.emitter.on(r,t)}off(r,t){return this.emitter.off(r,t)}get overflow(){const r=this.isHorizontal?"overflow-x":"overflow-y";return getComputedStyle(this.rootElement)[r]}checkOverflow(){["hidden","clip"].includes(this.overflow)?this.internalStop():this.internalStart()}setScroll(r){this.isHorizontal?this.options.wrapper.scrollTo({left:r,behavior:"instant"}):this.options.wrapper.scrollTo({top:r,behavior:"instant"})}isTouchOnSelectionHandle(r){const t=window.getSelection();if(!t||t.isCollapsed||t.rangeCount===0)return!1;const n=r.targetTouches[0]??r.changedTouches[0];if(!n)return!1;const e=t.getRangeAt(0).getClientRects();if(e.length===0)return!1;const i=e[0],s=e[e.length-1],o=40,a=Math.hypot(n.clientX-i.left,n.clientY-i.top)<=o,l=Math.hypot(n.clientX-s.right,n.clientY-s.bottom)<=o;return a||l}resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){if(this.isStopped){if(this.options.autoToggle){this.rootElement.style.removeProperty("overflow");return}this.internalStart()}}internalStart(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){if(!this.isStopped){if(this.options.autoToggle){this.rootElement.style.setProperty("overflow","clip");return}this.internalStop()}}internalStop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}scrollTo(r,{offset:t=0,immediate:n=!1,lock:e=!1,programmatic:i=!0,lerp:s=i?this.options.lerp:void 0,duration:o=i?this.options.duration:void 0,easing:a=i?this.options.easing:void 0,onStart:l,onComplete:c,force:u=!1,userData:h}={}){if((this.isStopped||this.isLocked)&&!u)return;let f=r,d=t;if(typeof f=="string"&&["top","left","start","#"].includes(f))f=0;else if(typeof f=="string"&&["bottom","right","end"].includes(f))f=this.limit;else{let p=null;if(typeof f=="string"?(p=f.startsWith("#")?document.getElementById(f.slice(1)):document.querySelector(f),p||(f==="#top"?f=0:console.warn("Lenis: Target not found",f))):f instanceof HTMLElement&&(f!=null&&f.nodeType)&&(p=f),p){if(this.options.wrapper!==window){const x=this.rootElement.getBoundingClientRect();d-=this.isHorizontal?x.left:x.top}const g=p.getBoundingClientRect(),m=getComputedStyle(p),v=this.isHorizontal?Number.parseFloat(m.scrollMarginLeft):Number.parseFloat(m.scrollMarginTop),_=getComputedStyle(this.rootElement),w=this.isHorizontal?Number.parseFloat(_.scrollPaddingLeft):Number.parseFloat(_.scrollPaddingTop);f=(this.isHorizontal?g.left:g.top)+this.animatedScroll-(Number.isNaN(v)?0:v)-(Number.isNaN(w)?0:w)}}if(typeof f=="number"){if(f+=d,this.options.infinite){if(i){this.targetScroll=this.animatedScroll=this.scroll;const p=f-this.animatedScroll;p>this.limit/2?f-=this.limit:p<-this.limit/2&&(f+=this.limit)}}else f=Pf(0,f,this.limit);if(f===this.targetScroll){l==null||l(this),c==null||c(this);return}if(this.userData=h??{},n){this.animatedScroll=this.targetScroll=f,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),c==null||c(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}i||(this.targetScroll=f),typeof o=="number"&&typeof a!="function"?a=pu:typeof a=="function"&&typeof o!="number"&&(o=1),this.animate.fromTo(this.animatedScroll,f,{duration:o,easing:a,lerp:s,onStart:()=>{e&&(this.isLocked=!0),this.isScrolling="smooth",l==null||l(this)},onUpdate:(p,g)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=p-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=p,this.setScroll(this.scroll),i&&(this.targetScroll=p),g||this.emit(),g&&(this.reset(),this.emit(),c==null||c(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}hasNestedScroll(r,{deltaX:t,deltaY:n}){const e=Date.now();r._lenis||(r._lenis={});const i=r._lenis;let s,o,a,l,c,u,h,f,d,p;if(e-(i.time??0)>2e3){i.time=Date.now();const k=window.getComputedStyle(r);if(i.computedStyle=k,s=["auto","overlay","scroll"].includes(k.overflowX),o=["auto","overlay","scroll"].includes(k.overflowY),c=["auto"].includes(k.overscrollBehaviorX),u=["auto"].includes(k.overscrollBehaviorY),i.hasOverflowX=s,i.hasOverflowY=o,!(s||o))return!1;h=r.scrollWidth,f=r.scrollHeight,d=r.clientWidth,p=r.clientHeight,a=h>d,l=f>p,i.isScrollableX=a,i.isScrollableY=l,i.scrollWidth=h,i.scrollHeight=f,i.clientWidth=d,i.clientHeight=p,i.hasOverscrollBehaviorX=c,i.hasOverscrollBehaviorY=u}else a=i.isScrollableX,l=i.isScrollableY,s=i.hasOverflowX,o=i.hasOverflowY,h=i.scrollWidth,f=i.scrollHeight,d=i.clientWidth,p=i.clientHeight,c=i.hasOverscrollBehaviorX,u=i.hasOverscrollBehaviorY;if(!(s&&a||o&&l))return!1;const g=Math.abs(t)>=Math.abs(n)?"horizontal":"vertical";let m,v,_,w,x,S;if(g==="horizontal")m=Math.round(r.scrollLeft),v=h-d,_=t,w=s,x=a,S=c;else if(g==="vertical")m=Math.round(r.scrollTop),v=f-p,_=n,w=o,x=l,S=u;else return!1;return!S&&(m>=v||m<=0)?!0:(_>0?m<v:m>0)&&w&&x}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){const r=this.options.wrapper;return this.isHorizontal?r.scrollX??r.scrollLeft:r.scrollY??r.scrollTop}get scroll(){return this.options.infinite?b1(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(r){this._isScrolling!==r&&(this._isScrolling=r,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(r){this._isStopped!==r&&(this._isStopped=r,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(r){this._isLocked!==r&&(this._isLocked=r,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get className(){let r="lenis";return this.options.autoToggle&&(r+=" lenis-autoToggle"),this.isStopped&&(r+=" lenis-stopped"),this.isLocked&&(r+=" lenis-locked"),this.isScrolling&&(r+=" lenis-scrolling"),this.isScrolling==="smooth"&&(r+=" lenis-smooth"),r}updateClassName(){this.cleanUpClassName(),this.className.split(" ").forEach(r=>{this.rootElement.classList.add(r)})}cleanUpClassName(){for(const r of Array.from(this.rootElement.classList))(r==="lenis"||r.startsWith("lenis-"))&&this.rootElement.classList.remove(r)}};Vt.registerPlugin(ot);let kn=null;function E1(){kn||(kn=new k1({lerp:.1,smoothWheel:!0,wheelMultiplier:1}),kn.on("scroll",()=>ot.update()),Vt.ticker.add(r=>{kn==null||kn.raf(r*1e3)}),Vt.ticker.lagSmoothing(0))}function C1(r,t=!1){kn?kn.scrollTo(r,{immediate:t}):window.scrollTo({top:r,behavior:t?"instant":"smooth"})}function gu(r){kn&&(r?kn.stop():kn.start())}function Rf(){document.fullscreenEnabled&&(document.fullscreenElement?Promise.resolve(document.exitFullscreen()).catch(()=>{}):Promise.resolve(document.documentElement.requestFullscreen()).catch(()=>{}))}const M1=`
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
`;function P1({sections:r,names:t}){const n=document.createElement("style");n.textContent=M1,document.head.appendChild(n);const e=document.createElement("div");e.className="app-pager";const i=document.createElement("button");i.className="app-pager-btn",i.type="button",i.setAttribute("aria-label","上一章"),i.textContent="‹";const s=document.createElement("span");s.className="app-pager-idx";const o=document.createElement("button");if(o.className="app-pager-btn",o.type="button",o.setAttribute("aria-label","下一章"),o.textContent="›",document.fullscreenEnabled){const f=document.createElement("button");f.className="app-pager-btn",f.type="button";const d=()=>{const p=!!document.fullscreenElement;f.textContent=p?"✕":"⛶",f.setAttribute("aria-label",p?"退出全屏（F）":"进入全屏（F）")};f.addEventListener("click",Rf),document.addEventListener("fullscreenchange",d),d(),e.append(i,s,o,f)}else e.append(i,s,o);document.body.appendChild(e);const a=r.length-1;let l=0;function c(){const f=window.innerHeight,d=[];for(const p of r){const g=p.offsetTop,m=Math.max(p.offsetHeight-f,0),v=Math.round(m/f);for(let _=0;_<=v;_++)d.push(g+Math.min(_*f,m))}return d.sort((p,g)=>p-g)}function u(){s.textContent=t[l]?`${t[l]} · ${l+1}/${r.length}`:`${l+1}/${r.length}`;const f=document.documentElement.scrollHeight-window.innerHeight;i.disabled=window.scrollY<=2,o.disabled=window.scrollY>=f-2}function h(f){var w,x,S;const d=c(),p=window.scrollY,g=2,m=f>0?d.find(k=>k>p+g)??d[d.length-1]:[...d].reverse().find(k=>k<p-g)??0;if(m===void 0)return;let v=0;for(let k=0;k<r.length;k++)r[k].offsetTop<=m+g&&(v=k);const _=((S=(x=(w=r[v])==null?void 0:w.querySelector("h1, h2"))==null?void 0:x.textContent)==null?void 0:S.trim())||t[v]||"";gu(!0),g0(_,()=>C1(m,!0)).finally(()=>gu(!1))}return i.addEventListener("click",()=>h(-1)),o.addEventListener("click",()=>h(1)),window.addEventListener("scroll",u,{passive:!0}),u(),{setCurrent(f){const d=Math.min(Math.max(Math.round(f),0),a);d!==l&&(l=d,u())}}}const A1=3.5;function R1(){try{const r=document.createElement("canvas");return!!(r.getContext("webgl2")||r.getContext("webgl"))}catch{return!1}}function mu(r){var e,i,s;const t=document.getElementById("fallback");t&&(t.hidden=!1);const n=document.getElementById("fallback-diag");n&&(n.textContent=`诊断信息：${r}`),(e=document.getElementById("chapters"))==null||e.setAttribute("hidden",""),(i=document.getElementById("sky-canvas"))==null||i.setAttribute("hidden",""),(s=document.getElementById("loading"))==null||s.remove()}async function O1(){const r=document.getElementById("sky-canvas");if(!r)throw new Error("缺少 #sky-canvas");const t=new $a(r);o1(r);const n=document.getElementById("loading");try{await t.init()}catch(u){console.error(u),n&&(n.textContent="星空数据加载失败，请检查开发服务器");return}n==null||n.remove(),E1(),t.addSkyObject(m1(vt).group),Pd(),m0("步天歌");const e=new xo(w0),i=[1,2,3,4,5,6,7,8].map(u=>document.getElementById(`ch${u}`)),s=["序","星野","授时","天人","天球","岁差","对话","尾声"],o=P1({sections:i,names:s});window.addEventListener("keydown",u=>{if(u.key!=="f"&&u.key!=="F"||u.ctrlKey||u.metaKey||u.altKey)return;const h=u.target;h&&(h.tagName==="INPUT"||h.tagName==="TEXTAREA"||h.isContentEditable)||Rf()});let a=0,l=0;const{chapters:c}=r1(t,u=>{a=u,o.setCurrent(Math.min(Math.floor(u),s.length-1))});t.start(u=>{var f,d;l+=(a-l)*(1-Math.exp(-u*A1)),t.applyCameraState(e.sampleGlobal(l));const h=Math.min(Math.max(Math.floor(l),0),c.length-1);(d=(f=c[h])==null?void 0:f.frame)==null||d.call(f,u)})}R1()?O1().catch(r=>{console.error(r),mu(r instanceof Error?r.message:String(r))}):mu("当前浏览器环境无法创建 WebGL 上下文（webgl2 / webgl 均不可用）");
