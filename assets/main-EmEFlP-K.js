var wd=Object.defineProperty;var Sd=(i,e,n)=>e in i?wd(i,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):i[e]=n;var X=(i,e,n)=>Sd(i,typeof e!="symbol"?e+"":e,n);import{M as aa,V as re,Q as Vt,r as Ht,a as Pe,G as kn,S as Wa,A as Gr,b as Va,B as as,c as ar,D as Do,d as lu,P as Ua,C as Eo,e as Ln,w as cu,f as uu,L as fu,g as kd,h as Td,E as Ni,W as Cd,i as Ed,j as Md,k as Pd,l as Ad,m as Rd,n as Od,o as Ld,p as Dd,q as zd,s as kl,t as Id,u as Tl,v as Nd,x as Cl,y as Fd,z as lo,T as du,F as $d,H as Gd,I as hu,J as Bd,K as Hd}from"./detailCard-hyfERk3D.js";const Yd=.5,pu=1.5,Xd=8,qd=400,Wd=.03,Vd=55,Ud=82.4,El=3,jd=.5,Qd=.28,Kd=900,Zd=.035,Jd=.018,eh=24,Ml=6e3,th=15e3,nh=220,Pl=[0,2,5,7,9,12,14,17,19,21,24],rh=3,ih=.996,sh=2600,Al=.05,oh=.1,ah=.6,lh=`
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
`,ch=`
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
</svg>`;let Rl=!1,Kt=null,Xn=!1,zo=0,Vs=null;const Ol=new Map;function uh(i){const e=i.sampleRate,n=Math.floor(Xd*e),t=i.createBuffer(1,n,e),r=t.getChannelData(0);let s=0;for(let a=0;a<n;a++){const l=Math.random()*2-1;s=(s+.02*l)/1.02,r[a]=s*3.5}const o=Math.min(Math.floor(e*.1),n>>2);for(let a=0;a<o;a++){const l=a/o;r[n-o+a]=r[n-o+a]*(1-l)+r[a]*l}return t}function fh(i,e){const n=i.sampleRate,t=Math.floor(rh*n),r=i.createBuffer(1,t,n),s=r.getChannelData(0),o=Math.max(2,Math.round(n/e)),a=new Float32Array(o);for(let c=0;c<o;c++)a[c]=Math.random()*2-1;let l=0;for(let c=0;c<t;c++){const u=(l+1)%o;s[c]=a[l],a[l]=ih*.5*(a[l]+a[u]),l=u}return r}function dh(i){const e=i.createGain();e.gain.value=0,e.connect(i.destination);const n=i.createBufferSource();n.buffer=uh(i),n.loop=!0;const t=i.createBiquadFilter();t.type="lowpass",t.frequency.value=qd;const r=i.createGain();r.gain.value=Wd,n.connect(t).connect(r).connect(e),n.start();const s=i.createBiquadFilter();s.type="lowpass",s.frequency.value=Kd;const o=i.createGain();o.gain.value=Zd,s.connect(o).connect(e);const a=i.createOscillator();a.type="sine",a.frequency.value=Vd,a.detune.value=-El;const l=i.createGain();l.gain.value=jd,a.connect(l).connect(s);const c=i.createOscillator();c.type="triangle",c.frequency.value=Ud,c.detune.value=El;const u=i.createGain();u.gain.value=Qd,c.connect(u).connect(s);const f=i.createOscillator();f.type="sine",f.frequency.value=1/eh;const h=i.createGain();return h.gain.value=Jd,f.connect(h).connect(o.gain),a.start(),c.start(),f.start(),{ctx:i,master:e}}function hh({ctx:i,master:e}){const n=Pl[Math.floor(Math.random()*Pl.length)],t=nh*Math.pow(2,n/12);let r=Ol.get(t);r||(r=fh(i,t),Ol.set(t,r));const s=i.createBufferSource();s.buffer=r;const o=i.createBiquadFilter();o.type="lowpass",o.frequency.value=sh;const a=i.createGain();a.gain.value=Al+Math.random()*(oh-Al);const l=i.createStereoPanner();l.pan.value=(Math.random()*2-1)*ah,s.connect(o).connect(a).connect(l).connect(e),s.onended=()=>{s.disconnect(),o.disconnect(),a.disconnect(),l.disconnect()},s.start()}function Ll(i,e){const n=i.context.currentTime,t=i.gain;t.cancelScheduledValues(n),t.setValueAtTime(t.value,n),t.linearRampToValueAtTime(e,n+pu)}function gu(){Vs!==null&&(window.clearTimeout(Vs),Vs=null)}function mu(){gu(),Vs=window.setTimeout(()=>{Kt&&Xn&&Kt.ctx.state==="running"&&hh(Kt),mu()},Ml+Math.random()*(th-Ml))}function _u(i){i.classList.toggle("is-on",Xn);const e=Xn?"关闭环境音":"开启环境音";i.setAttribute("aria-label",e),i.setAttribute("aria-pressed",String(Xn)),i.title=e}function yu(){const i=window;return i.AudioContext??i.webkitAudioContext}async function ph(i){if(!Kt){const t=yu();if(!t)return;Kt=dh(new t)}Xn=!Xn,zo++,_u(i);const{ctx:e,master:n}=Kt;if(Xn)e.state!=="running"&&await e.resume().catch(()=>{}),Ll(n,Yd),mu();else{Ll(n,0),gu();const t=zo;window.setTimeout(()=>{Kt&&!Xn&&t===zo&&Kt.ctx.state==="running"&&Kt.ctx.suspend()},(pu+.1)*1e3)}}function gh(){if(Rl||typeof document>"u")return;Rl=!0;const i=document.createElement("style");i.textContent=lh,document.head.appendChild(i);const e=document.createElement("button");if(e.type="button",e.className="app-ambient-toggle",e.innerHTML=ch,document.body.appendChild(e),!yu()){e.disabled=!0,e.setAttribute("aria-label","环境音不可用"),e.title="当前浏览器不支持 Web Audio";return}_u(e),e.addEventListener("click",()=>{ph(e)}),document.addEventListener("visibilitychange",()=>{Kt&&(document.hidden?Kt.ctx.state==="running"&&Kt.ctx.suspend():Xn&&Kt.ctx.resume())})}function Gn(i){if(i===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return i}function bu(i,e){i.prototype=Object.create(e.prototype),i.prototype.constructor=i,i.__proto__=e}/*!
 * GSAP 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var sn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},ls={duration:.5,overwrite:!1,delay:0},ja,pt,ze,mn=1e8,Ce=1/mn,la=Math.PI*2,mh=la/4,_h=0,vu=Math.sqrt,yh=Math.cos,bh=Math.sin,at=function(e){return typeof e=="string"},Xe=function(e){return typeof e=="function"},Un=function(e){return typeof e=="number"},Qa=function(e){return typeof e>"u"},zn=function(e){return typeof e=="object"},Ft=function(e){return e!==!1},Ka=function(){return typeof window<"u"},xs=function(e){return Xe(e)||at(e)},xu=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},kt=Array.isArray,vh=/random\([^)]+\)/g,xh=/,\s*/g,Dl=/(?:-?\.?\d|\.)+/gi,wu=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,ni=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Io=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Su=/[+-]=-?[.\d]+/,wh=/[^,'"\[\]\s]+/gi,Sh=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Be,En,ca,Za,on={},co={},ku,Tu=function(e){return(co=gi(e,on))&&Yt},Ja=function(e,n){return console.warn("Invalid property",e,"set to",n,"Missing plugin? gsap.registerPlugin()")},cs=function(e,n){return!n&&console.warn(e)},Cu=function(e,n){return e&&(on[e]=n)&&co&&(co[e]=n)||on},us=function(){return 0},kh={suppressEvents:!0,isStart:!0,kill:!1},Us={suppressEvents:!0,kill:!1},Th={suppressEvents:!0},el={},lr=[],ua={},Eu,Qt={},No={},zl=30,js=[],tl="",nl=function(e){var n=e[0],t,r;if(zn(n)||Xe(n)||(e=[e]),!(t=(n._gsap||{}).harness)){for(r=js.length;r--&&!js[r].targetTest(n););t=js[r]}for(r=e.length;r--;)e[r]&&(e[r]._gsap||(e[r]._gsap=new ju(e[r],t)))||e.splice(r,1);return e},Rr=function(e){return e._gsap||nl(_n(e))[0]._gsap},Mu=function(e,n,t){return(t=e[n])&&Xe(t)?e[n]():Qa(t)&&e.getAttribute&&e.getAttribute(n)||t},$t=function(e,n){return(e=e.split(",")).forEach(n)||e},We=function(e){return Math.round(e*1e5)/1e5||0},Ge=function(e){return Math.round(e*1e7)/1e7||0},oi=function(e,n){var t=n.charAt(0),r=parseFloat(n.substr(2));return e=parseFloat(e),t==="+"?e+r:t==="-"?e-r:t==="*"?e*r:e/r},Ch=function(e,n){for(var t=n.length,r=0;e.indexOf(n[r])<0&&++r<t;);return r<t},uo=function(){var e=lr.length,n=lr.slice(0),t,r;for(ua={},lr.length=0,t=0;t<e;t++)r=n[t],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},rl=function(e){return!!(e._initted||e._startAt||e.add)},Pu=function(e,n,t,r){lr.length&&!pt&&uo(),e.render(n,t,!!(pt&&n<0&&rl(e))),lr.length&&!pt&&uo()},Au=function(e){var n=parseFloat(e);return(n||n===0)&&(e+"").match(wh).length<2?n:at(e)?e.trim():e},Ru=function(e){return e},an=function(e,n){for(var t in n)t in e||(e[t]=n[t]);return e},Eh=function(e){return function(n,t){for(var r in t)r in n||r==="duration"&&e||r==="ease"||(n[r]=t[r])}},gi=function(e,n){for(var t in n)e[t]=n[t];return e},Il=function i(e,n){for(var t in n)t!=="__proto__"&&t!=="constructor"&&t!=="prototype"&&(e[t]=zn(n[t])?i(e[t]||(e[t]={}),n[t]):n[t]);return e},fo=function(e,n){var t={},r;for(r in e)r in n||(t[r]=e[r]);return t},Vi=function(e){var n=e.parent||Be,t=e.keyframes?Eh(kt(e.keyframes)):an;if(Ft(e.inherit))for(;n;)t(e,n.vars.defaults),n=n.parent||n._dp;return e},Mh=function(e,n){for(var t=e.length,r=t===n.length;r&&t--&&e[t]===n[t];);return t<0},Ou=function(e,n,t,r,s){var o=e[r],a;if(s)for(a=n[s];o&&o[s]>a;)o=o._prev;return o?(n._next=o._next,o._next=n):(n._next=e[t],e[t]=n),n._next?n._next._prev=n:e[r]=n,n._prev=o,n.parent=n._dp=e,n},Mo=function(e,n,t,r){t===void 0&&(t="_first"),r===void 0&&(r="_last");var s=n._prev,o=n._next;s?s._next=o:e[t]===n&&(e[t]=o),o?o._prev=s:e[r]===n&&(e[r]=s),n._next=n._prev=n.parent=null},fr=function(e,n){e.parent&&(!n||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},Or=function(e,n){if(e&&(!n||n._end>e._dur||n._start<0))for(var t=e;t;)t._dirty=1,t=t.parent;return e},Ph=function(e){for(var n=e.parent;n&&n.parent;)n._dirty=1,n.totalDuration(),n=n.parent;return e},fa=function(e,n,t,r){return e._startAt&&(pt?e._startAt.revert(Us):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(n,!0,r))},Ah=function i(e){return!e||e._ts&&i(e.parent)},Nl=function(e){return e._repeat?mi(e._tTime,e=e.duration()+e._rDelay)*e:0},mi=function(e,n){var t=Math.floor(e=Ge(e/n));return e&&t===e?t-1:t},ho=function(e,n){return(e-n._start)*n._ts+(n._ts>=0?0:n._dirty?n.totalDuration():n._tDur)},Po=function(e){return e._end=Ge(e._start+(e._tDur/Math.abs(e._ts||e._rts||Ce)||0))},Ao=function(e,n){var t=e._dp;return t&&t.smoothChildTiming&&e._ts&&(e._start=Ge(t._time-(e._ts>0?n/e._ts:((e._dirty?e.totalDuration():e._tDur)-n)/-e._ts)),Po(e),t._dirty||Or(t,e)),e},Lu=function(e,n){var t;if((n._time||!n._dur&&n._initted||n._start<e._time&&(n._dur||!n.add))&&(t=ho(e.rawTime(),n),(!n._dur||bs(0,n.totalDuration(),t)-n._tTime>Ce)&&n.render(t,!0)),Or(e,n)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(t=e;t._dp;)t.rawTime()>=0&&t.totalTime(t._tTime),t=t._dp;e._zTime=-Ce}},An=function(e,n,t,r){return n.parent&&fr(n),n._start=Ge((Un(t)?t:t||e!==Be?hn(e,t,n):e._time)+n._delay),n._end=Ge(n._start+(n.totalDuration()/Math.abs(n.timeScale())||0)),Ou(e,n,"_first","_last",e._sort?"_start":0),da(n)||(e._recent=n),r||Lu(e,n),e._ts<0&&Ao(e,e._tTime),e},Du=function(e,n){return(on.ScrollTrigger||Ja("scrollTrigger",n))&&on.ScrollTrigger.create(n,e)},zu=function(e,n,t,r,s){if(sl(e,n,s),!e._initted)return 1;if(!t&&e._pt&&!pt&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&Eu!==en.frame)return lr.push(e),e._lazy=[s,r],1},Rh=function i(e){var n=e.parent;return n&&n._ts&&n._initted&&!n._lock&&(n.rawTime()<0||i(n))},da=function(e){var n=e.data;return n==="isFromStart"||n==="isStart"},Oh=function(e,n,t,r){var s=e.ratio,o=n<0||!n&&(!e._start&&Rh(e)&&!(!e._initted&&da(e))||(e._ts<0||e._dp._ts<0)&&!da(e))?0:1,a=e._rDelay,l=0,c,u,f;if(a&&e._repeat&&(l=bs(0,e._tDur,n),u=mi(l,a),e._yoyo&&u&1&&(o=1-o),u!==mi(e._tTime,a)&&(s=1-o,e.vars.repeatRefresh&&e._initted&&e.invalidate())),o!==s||pt||r||e._zTime===Ce||!n&&e._zTime){if(!e._initted&&zu(e,n,r,t,l))return;for(f=e._zTime,e._zTime=n||(t?Ce:0),t||(t=n&&!f),e.ratio=o,e._from&&(o=1-o),e._time=0,e._tTime=l,c=e._pt;c;)c.r(o,c.d),c=c._next;n<0&&fa(e,n,t,!0),e._onUpdate&&!t&&nn(e,"onUpdate"),l&&e._repeat&&!t&&e.parent&&nn(e,"onRepeat"),(n>=e._tDur||n<0)&&e.ratio===o&&(o&&fr(e,1),!t&&!pt&&(nn(e,o?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=n)},Lh=function(e,n,t){var r;if(t>n)for(r=e._first;r&&r._start<=t;){if(r.data==="isPause"&&r._start>n)return r;r=r._next}else for(r=e._last;r&&r._start>=t;){if(r.data==="isPause"&&r._start<n)return r;r=r._prev}},_i=function(e,n,t,r){var s=e._repeat,o=Ge(n)||0,a=e._tTime/e._tDur;return a&&!r&&(e._time*=o/e._dur),e._dur=o,e._tDur=s?s<0?1e10:Ge(o*(s+1)+e._rDelay*s):o,a>0&&!r&&Ao(e,e._tTime=e._tDur*a),e.parent&&Po(e),t||Or(e.parent,e),e},Fl=function(e){return e instanceof Nt?Or(e):_i(e,e._dur)},Dh={_start:0,endTime:us,totalDuration:us},hn=function i(e,n,t){var r=e.labels,s=e._recent||Dh,o=e.duration()>=mn?s.endTime(!1):e._dur,a,l,c;return at(n)&&(isNaN(n)||n in r)?(l=n.charAt(0),c=n.substr(-1)==="%",a=n.indexOf("="),l==="<"||l===">"?(a>=0&&(n=n.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(n.substr(1))||0)*(c?(a<0?s:t).totalDuration()/100:1)):a<0?(n in r||(r[n]=o),r[n]):(l=parseFloat(n.charAt(a-1)+n.substr(a+1)),c&&t&&(l=l/100*(kt(t)?t[0]:t).totalDuration()),a>1?i(e,n.substr(0,a-1),t)+l:o+l)):n==null?o:+n},Ui=function(e,n,t){var r=Un(n[1]),s=(r?2:1)+(e<2?0:1),o=n[s],a,l;if(r&&(o.duration=n[1]),o.parent=t,e){for(a=o,l=t;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=Ft(l.vars.inherit)&&l.parent;o.immediateRender=Ft(a.immediateRender),e<2?o.runBackwards=1:o.startAt=n[s-1]}return new Ke(n[0],o,n[s+1])},gr=function(e,n){return e||e===0?n(e):n},bs=function(e,n,t){return t<e?e:t>n?n:t},xt=function(e,n){return!at(e)||!(n=Sh.exec(e))?"":n[1]},zh=function(e,n,t){return gr(t,function(r){return bs(e,n,r)})},ha=[].slice,Iu=function(e,n){return e&&zn(e)&&"length"in e&&(!n&&!e.length||e.length-1 in e&&zn(e[0]))&&!e.nodeType&&e!==En},Ih=function(e,n,t){return t===void 0&&(t=[]),e.forEach(function(r){var s;return at(r)&&!n||Iu(r,1)?(s=t).push.apply(s,_n(r)):t.push(r)})||t},_n=function(e,n,t){return ze&&!n&&ze.selector?ze.selector(e):at(e)&&!t&&(ca||!yi())?ha.call((n||Za).querySelectorAll(e),0):kt(e)?Ih(e,t):Iu(e)?ha.call(e,0):e?[e]:[]},pa=function(e){return e=_n(e)[0]||cs("Invalid scope")||{},function(n){var t=e.current||e.nativeElement||e;return _n(n,t.querySelectorAll?t:t===e?cs("Invalid scope")||Za.createElement("div"):e)}},Nu=function(e){return e.sort(function(){return .5-Math.random()})},Fu=function(e){if(Xe(e))return e;var n=zn(e)?e:{each:e},t=Lr(n.ease),r=n.from||0,s=parseFloat(n.base)||0,o={},a=r>0&&r<1,l=isNaN(r)||a,c=n.axis,u=r,f=r;return at(r)?u=f={center:.5,edges:.5,end:1}[r]||0:!a&&l&&(u=r[0],f=r[1]),function(h,d,g){var p=(g||n).length,m=o[p],v,y,x,w,S,C,k,A,E;if(!m){if(E=n.grid==="auto"?0:(n.grid||[1,mn])[1],!E){for(k=-mn;k<(k=g[E++].getBoundingClientRect().left)&&E<p;);E<p&&E--}for(m=o[p]=[],v=l?Math.min(E,p)*u-.5:r%E,y=E===mn?0:l?p*f/E-.5:r/E|0,k=0,A=mn,C=0;C<p;C++)x=C%E-v,w=y-(C/E|0),m[C]=S=c?Math.abs(c==="y"?w:x):vu(x*x+w*w),S>k&&(k=S),S<A&&(A=S);r==="random"&&Nu(m),m.max=k-A,m.min=A,m.v=p=(parseFloat(n.amount)||parseFloat(n.each)*(E>p?p-1:c?c==="y"?p/E:E:Math.max(E,p/E))||0)*(r==="edges"?-1:1),m.b=p<0?s-p:s,m.u=xt(n.amount||n.each)||0,t=t&&p<0?jh(t):t}return p=(m[h]-m.min)/m.max||0,Ge(m.b+(t?t(p):p)*m.v)+m.u}},ga=function(e){var n=Math.pow(10,((e+"").split(".")[1]||"").length);return function(t){var r=Ge(Math.round(parseFloat(t)/e)*e*n);return(r-r%1)/n+(Un(t)?0:xt(t))}},$u=function(e,n){var t=kt(e),r,s;return!t&&zn(e)&&(r=t=e.radius||mn,e.values?(e=_n(e.values),(s=!Un(e[0]))&&(r*=r)):e=ga(e.increment)),gr(n,t?Xe(e)?function(o){return s=e(o),Math.abs(s-o)<=r?s:o}:function(o){for(var a=parseFloat(s?o.x:o),l=parseFloat(s?o.y:0),c=mn,u=0,f=e.length,h,d;f--;)s?(h=e[f].x-a,d=e[f].y-l,h=h*h+d*d):h=Math.abs(e[f]-a),h<c&&(c=h,u=f);return u=!r||c<=r?e[u]:o,s||u===o||Un(o)?u:u+xt(o)}:ga(e))},Gu=function(e,n,t,r){return gr(kt(e)?!n:t===!0?!!(t=0):!r,function(){return kt(e)?e[~~(Math.random()*e.length)]:(t=t||1e-5)&&(r=t<1?Math.pow(10,(t+"").length-2):1)&&Math.floor(Math.round((e-t/2+Math.random()*(n-e+t*.99))/t)*t*r)/r})},Nh=function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];return function(r){return n.reduce(function(s,o){return o(s)},r)}},Fh=function(e,n){return function(t){return e(parseFloat(t))+(n||xt(t))}},$h=function(e,n,t){return Hu(e,n,0,1,t)},Bu=function(e,n,t){return gr(t,function(r){return e[~~n(r)]})},Gh=function i(e,n,t){var r=n-e;return kt(e)?Bu(e,i(0,e.length),n):gr(t,function(s){return(r+(s-e)%r)%r+e})},Bh=function i(e,n,t){var r=n-e,s=r*2;return kt(e)?Bu(e,i(0,e.length-1),n):gr(t,function(o){return o=(s+(o-e)%s)%s||0,e+(o>r?s-o:o)})},fs=function(e){return e.replace(vh,function(n){var t=n.indexOf("[")+1,r=n.substring(t||7,t?n.indexOf("]"):n.length-1).split(xh);return Gu(t?r:+r[0],t?0:+r[1],+r[2]||1e-5)})},Hu=function(e,n,t,r,s){var o=n-e,a=r-t;return gr(s,function(l){return t+((l-e)/o*a||0)})},Hh=function i(e,n,t,r){var s=isNaN(e+n)?0:function(d){return(1-d)*e+d*n};if(!s){var o=at(e),a={},l,c,u,f,h;if(t===!0&&(r=1)&&(t=null),o)e={p:e},n={p:n};else if(kt(e)&&!kt(n)){for(u=[],f=e.length,h=f-2,c=1;c<f;c++)u.push(i(e[c-1],e[c]));f--,s=function(g){g*=f;var p=Math.min(h,~~g);return u[p](g-p)},t=n}else r||(e=gi(kt(e)?[]:{},e));if(!u){for(l in n)il.call(a,e,l,"get",n[l]);s=function(g){return ll(g,a)||(o?e.p:e)}}}return gr(t,s)},$l=function(e,n,t){var r=e.labels,s=mn,o,a,l;for(o in r)a=r[o]-n,a<0==!!t&&a&&s>(a=Math.abs(a))&&(l=o,s=a);return l},nn=function(e,n,t){var r=e.vars,s=r[n],o=ze,a=e._ctx,l,c,u;if(s)return l=r[n+"Params"],c=r.callbackScope||e,t&&lr.length&&uo(),a&&(ze=a),u=l?s.apply(c,l):s.call(c),ze=o,u},Fi=function(e){return fr(e),e.scrollTrigger&&e.scrollTrigger.kill(!!pt),e.progress()<1&&nn(e,"onInterrupt"),e},ri,Yu=[],Xu=function(e){if(e)if(e=!e.name&&e.default||e,Ka()||e.headless){var n=e.name,t=Xe(e),r=n&&!t&&e.init?function(){this._props=[]}:e,s={init:us,render:ll,add:il,kill:sp,modifier:ip,rawVars:0},o={targetTest:0,get:0,getSetter:al,aliases:{},register:0};if(yi(),e!==r){if(Qt[n])return;an(r,an(fo(e,s),o)),gi(r.prototype,gi(s,fo(e,o))),Qt[r.prop=n]=r,e.targetTest&&(js.push(r),el[n]=1),n=(n==="css"?"CSS":n.charAt(0).toUpperCase()+n.substr(1))+"Plugin"}Cu(n,r),e.register&&e.register(Yt,r,Gt)}else Yu.push(e)},Te=255,$i={aqua:[0,Te,Te],lime:[0,Te,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Te],navy:[0,0,128],white:[Te,Te,Te],olive:[128,128,0],yellow:[Te,Te,0],orange:[Te,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Te,0,0],pink:[Te,192,203],cyan:[0,Te,Te],transparent:[Te,Te,Te,0]},Fo=function(e,n,t){return e+=e<0?1:e>1?-1:0,(e*6<1?n+(t-n)*e*6:e<.5?t:e*3<2?n+(t-n)*(2/3-e)*6:n)*Te+.5|0},qu=function(e,n,t){var r=e?Un(e)?[e>>16,e>>8&Te,e&Te]:0:$i.black,s,o,a,l,c,u,f,h,d,g;if(!r){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),$i[e])r=$i[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),o=e.charAt(2),a=e.charAt(3),e="#"+s+s+o+o+a+a+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return r=parseInt(e.substr(1,6),16),[r>>16,r>>8&Te,r&Te,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),r=[e>>16,e>>8&Te,e&Te]}else if(e.substr(0,3)==="hsl"){if(r=g=e.match(Dl),!n)l=+r[0]%360/360,c=+r[1]/100,u=+r[2]/100,o=u<=.5?u*(c+1):u+c-u*c,s=u*2-o,r.length>3&&(r[3]*=1),r[0]=Fo(l+1/3,s,o),r[1]=Fo(l,s,o),r[2]=Fo(l-1/3,s,o);else if(~e.indexOf("="))return r=e.match(wu),t&&r.length<4&&(r[3]=1),r}else r=e.match(Dl)||$i.transparent;r=r.map(Number)}return n&&!g&&(s=r[0]/Te,o=r[1]/Te,a=r[2]/Te,f=Math.max(s,o,a),h=Math.min(s,o,a),u=(f+h)/2,f===h?l=c=0:(d=f-h,c=u>.5?d/(2-f-h):d/(f+h),l=f===s?(o-a)/d+(o<a?6:0):f===o?(a-s)/d+2:(s-o)/d+4,l*=60),r[0]=~~(l+.5),r[1]=~~(c*100+.5),r[2]=~~(u*100+.5)),t&&r.length<4&&(r[3]=1),r},Wu=function(e){var n=[],t=[],r=-1;return e.split(cr).forEach(function(s){var o=s.match(ni)||[];n.push.apply(n,o),t.push(r+=o.length+1)}),n.c=t,n},Gl=function(e,n,t){var r="",s=(e+r).match(cr),o=n?"hsla(":"rgba(",a=0,l,c,u,f;if(!s)return e;if(s=s.map(function(h){return(h=qu(h,n,1))&&o+(n?h[0]+","+h[1]+"%,"+h[2]+"%,"+h[3]:h.join(","))+")"}),t&&(u=Wu(e),l=t.c,l.join(r)!==u.c.join(r)))for(c=e.replace(cr,"1").split(ni),f=c.length-1;a<f;a++)r+=c[a]+(~l.indexOf(a)?s.shift()||o+"0,0,0,0)":(u.length?u:s.length?s:t).shift());if(!c)for(c=e.split(cr),f=c.length-1;a<f;a++)r+=c[a]+s[a];return r+c[f]},cr=function(){var i="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in $i)i+="|"+e+"\\b";return new RegExp(i+")","gi")}(),Yh=/hsl[a]?\(/,Vu=function(e){var n=e.join(" "),t;if(cr.lastIndex=0,cr.test(n))return t=Yh.test(n),e[1]=Gl(e[1],t),e[0]=Gl(e[0],t,Wu(e[1])),!0},ds,en=function(){var i=Date.now,e=500,n=33,t=i(),r=t,s=1e3/240,o=s,a=[],l,c,u,f,h,d,g=function p(m){var v=i()-r,y=m===!0,x,w,S,C;if((v>e||v<0)&&(t+=v-n),r+=v,S=r-t,x=S-o,(x>0||y)&&(C=++f.frame,h=S-f.time*1e3,f.time=S=S/1e3,o+=x+(x>=s?4:s-x),w=1),y||(l=c(p)),w)for(d=0;d<a.length;d++)a[d](S,h,C,m)};return f={time:0,frame:0,tick:function(){g(!0)},deltaRatio:function(m){return h/(1e3/(m||60))},wake:function(){ku&&(!ca&&Ka()&&(En=ca=window,Za=En.document||{},on.gsap=Yt,(En.gsapVersions||(En.gsapVersions=[])).push(Yt.version),Tu(co||En.GreenSockGlobals||!En.gsap&&En||{}),Yu.forEach(Xu)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&f.sleep(),c=u||function(m){return setTimeout(m,o-f.time*1e3+1|0)},ds=1,g(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),ds=0,c=us},lagSmoothing:function(m,v){e=m||1/0,n=Math.min(v||33,e)},fps:function(m){s=1e3/(m||240),o=f.time*1e3+s},add:function(m,v,y){var x=v?function(w,S,C,k){m(w,S,C,k),f.remove(x)}:m;return f.remove(m),a[y?"unshift":"push"](x),yi(),x},remove:function(m,v){~(v=a.indexOf(m))&&a.splice(v,1)&&d>=v&&d--},_listeners:a},f}(),yi=function(){return!ds&&en.wake()},he={},Xh=/^[\d.\-M][\d.\-,\s]/,qh=/["']/g,Wh=function(e){for(var n={},t=e.substr(1,e.length-3).split(":"),r=t[0],s=1,o=t.length,a,l,c;s<o;s++)l=t[s],a=s!==o-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),n[r]=isNaN(c)?c.replace(qh,"").trim():+c,r=l.substr(a+1).trim();return n},Vh=function(e){var n=e.indexOf("(")+1,t=e.indexOf(")"),r=e.indexOf("(",n);return e.substring(n,~r&&r<t?e.indexOf(")",t+1):t)},Uh=function(e){var n=(e+"").split("("),t=he[n[0]];return t&&n.length>1&&t.config?t.config.apply(null,~e.indexOf("{")?[Wh(n[1])]:Vh(e).split(",").map(Au)):he._CE&&Xh.test(e)?he._CE("",e):t},jh=function(e){return function(n){return 1-e(1-n)}},Lr=function(e,n){return e&&(Xe(e)?e:he[e]||Uh(e))||n},qr=function(e,n,t,r){t===void 0&&(t=function(l){return 1-n(1-l)}),r===void 0&&(r=function(l){return l<.5?n(l*2)/2:1-n((1-l)*2)/2});var s={easeIn:n,easeOut:t,easeInOut:r},o;return $t(e,function(a){he[a]=on[a]=s,he[o=a.toLowerCase()]=t;for(var l in s)he[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=he[a+"."+l]=s[l]}),s},Uu=function(e){return function(n){return n<.5?(1-e(1-n*2))/2:.5+e((n-.5)*2)/2}},$o=function i(e,n,t){var r=n>=1?n:1,s=(t||(e?.3:.45))/(n<1?n:1),o=s/la*(Math.asin(1/r)||0),a=function(u){return u===1?1:r*Math.pow(2,-10*u)*bh((u-o)*s)+1},l=e==="out"?a:e==="in"?function(c){return 1-a(1-c)}:Uu(a);return s=la/s,l.config=function(c,u){return i(e,c,u)},l},Go=function i(e,n){n===void 0&&(n=1.70158);var t=function(o){return o?--o*o*((n+1)*o+n)+1:0},r=e==="out"?t:e==="in"?function(s){return 1-t(1-s)}:Uu(t);return r.config=function(s){return i(e,s)},r};$t("Linear,Quad,Cubic,Quart,Quint,Strong",function(i,e){var n=e<5?e+1:e;qr(i+",Power"+(n-1),e?function(t){return Math.pow(t,n)}:function(t){return t},function(t){return 1-Math.pow(1-t,n)},function(t){return t<.5?Math.pow(t*2,n)/2:1-Math.pow((1-t)*2,n)/2})});he.Linear.easeNone=he.none=he.Linear.easeIn;qr("Elastic",$o("in"),$o("out"),$o());(function(i,e){var n=1/e,t=2*n,r=2.5*n,s=function(a){return a<n?i*a*a:a<t?i*Math.pow(a-1.5/e,2)+.75:a<r?i*(a-=2.25/e)*a+.9375:i*Math.pow(a-2.625/e,2)+.984375};qr("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);qr("Expo",function(i){return Math.pow(2,10*(i-1))*i+i*i*i*i*i*i*(1-i)});qr("Circ",function(i){return-(vu(1-i*i)-1)});qr("Sine",function(i){return i===1?1:-yh(i*mh)+1});qr("Back",Go("in"),Go("out"),Go());he.SteppedEase=he.steps=on.SteppedEase={config:function(e,n){e===void 0&&(e=1);var t=1/e,r=e+(n?0:1),s=n?1:0,o=1-Ce;return function(a){return((r*bs(0,o,a)|0)+s)*t}}};ls.ease=he["quad.out"];$t("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(i){return tl+=i+","+i+"Params,"});var ju=function(e,n){this.id=_h++,e._gsap=this,this.target=e,this.harness=n,this.get=n?n.get:Mu,this.set=n?n.getSetter:al},hs=function(){function i(n){this.vars=n,this._delay=+n.delay||0,(this._repeat=n.repeat===1/0?-2:n.repeat||0)&&(this._rDelay=n.repeatDelay||0,this._yoyo=!!n.yoyo||!!n.yoyoEase),this._ts=1,_i(this,+n.duration,1,1),this.data=n.data,ze&&(this._ctx=ze,ze.data.push(this)),ds||en.wake()}var e=i.prototype;return e.delay=function(t){return t||t===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+t-this._delay),this._delay=t,this):this._delay},e.duration=function(t){return arguments.length?this.totalDuration(this._repeat>0?t+(t+this._rDelay)*this._repeat:t):this.totalDuration()&&this._dur},e.totalDuration=function(t){return arguments.length?(this._dirty=0,_i(this,this._repeat<0?t:(t-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(t,r){if(yi(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(Ao(this,t),!s._dp||s.parent||Lu(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&t<this._tDur||this._ts<0&&t>0||!this._tDur&&!t)&&An(this._dp,this,this._start-this._delay)}return(this._tTime!==t||!this._dur&&!r||this._initted&&Math.abs(this._zTime)===Ce||!this._initted&&this._dur&&t||!t&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=t),Pu(this,t,r)),this},e.time=function(t,r){return arguments.length?this.totalTime(Math.min(this.totalDuration(),t+Nl(this))%(this._dur+this._rDelay)||(t?this._dur:0),r):this._time},e.totalProgress=function(t,r){return arguments.length?this.totalTime(this.totalDuration()*t,r):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(t,r){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-t:t)+Nl(this),r):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(t,r){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(t-1)*s,r):this._repeat?mi(this._tTime,s)+1:1},e.timeScale=function(t,r){if(!arguments.length)return this._rts===-Ce?0:this._rts;if(this._rts===t)return this;var s=this.parent&&this._ts?ho(this.parent._time,this):this._tTime;return this._rts=+t||0,this._ts=this._ps||t===-Ce?0:this._rts,this.totalTime(bs(-Math.abs(this._delay),this.totalDuration(),s),r!==!1),Po(this),Ph(this)},e.paused=function(t){return arguments.length?(this._ps!==t&&(this._ps=t,t?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(yi(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==Ce&&(this._tTime-=Ce)))),this):this._ps},e.startTime=function(t){if(arguments.length){this._start=Ge(t);var r=this.parent||this._dp;return r&&(r._sort||!this.parent)&&An(r,this,this._start-this._delay),this}return this._start},e.endTime=function(t){return this._start+(Ft(t)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(t){var r=this.parent||this._dp;return r?t&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?ho(r.rawTime(t),this):this._tTime:this._tTime},e.revert=function(t){t===void 0&&(t=Th);var r=pt;return pt=t,rl(this)&&(this.timeline&&this.timeline.revert(t),this.totalTime(-.01,t.suppressEvents)),this.data!=="nested"&&t.kill!==!1&&this.kill(),pt=r,this},e.globalTime=function(t){for(var r=this,s=arguments.length?t:r.rawTime();r;)s=r._start+s/(Math.abs(r._ts)||1),r=r._dp;return!this.parent&&this._sat?this._sat.globalTime(t):s},e.repeat=function(t){return arguments.length?(this._repeat=t===1/0?-2:t,Fl(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(t){if(arguments.length){var r=this._time;return this._rDelay=t,Fl(this),r?this.time(r):this}return this._rDelay},e.yoyo=function(t){return arguments.length?(this._yoyo=t,this):this._yoyo},e.seek=function(t,r){return this.totalTime(hn(this,t),Ft(r))},e.restart=function(t,r){return this.play().totalTime(t?-this._delay:0,Ft(r)),this._dur||(this._zTime=-Ce),this},e.play=function(t,r){return t!=null&&this.seek(t,r),this.reversed(!1).paused(!1)},e.reverse=function(t,r){return t!=null&&this.seek(t||this.totalDuration(),r),this.reversed(!0).paused(!1)},e.pause=function(t,r){return t!=null&&this.seek(t,r),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(t){return arguments.length?(!!t!==this.reversed()&&this.timeScale(-this._rts||(t?-Ce:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-Ce,this},e.isActive=function(){var t=this.parent||this._dp,r=this._start,s;return!!(!t||this._ts&&this._initted&&t.isActive()&&(s=t.rawTime(!0))>=r&&s<this.endTime(!0)-Ce)},e.eventCallback=function(t,r,s){var o=this.vars;return arguments.length>1?(r?(o[t]=r,s&&(o[t+"Params"]=s),t==="onUpdate"&&(this._onUpdate=r)):delete o[t],this):o[t]},e.then=function(t){var r=this,s=r._prom;return new Promise(function(o){var a=Xe(t)?t:Ru,l=function(){var u=r.then;r.then=null,s&&s(),Xe(a)&&(a=a(r))&&(a.then||a===r)&&(r.then=u),o(a),r.then=u};r._initted&&r.totalProgress()===1&&r._ts>=0||!r._tTime&&r._ts<0?l():r._prom=l})},e.kill=function(){Fi(this)},i}();an(hs.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-Ce,_prom:0,_ps:!1,_rts:1});var Nt=function(i){bu(e,i);function e(t,r){var s;return t===void 0&&(t={}),s=i.call(this,t)||this,s.labels={},s.smoothChildTiming=!!t.smoothChildTiming,s.autoRemoveChildren=!!t.autoRemoveChildren,s._sort=Ft(t.sortChildren),Be&&An(t.parent||Be,Gn(s),r),t.reversed&&s.reverse(),t.paused&&s.paused(!0),t.scrollTrigger&&Du(Gn(s),t.scrollTrigger),s}var n=e.prototype;return n.to=function(r,s,o){return Ui(0,arguments,this),this},n.from=function(r,s,o){return Ui(1,arguments,this),this},n.fromTo=function(r,s,o,a){return Ui(2,arguments,this),this},n.set=function(r,s,o){return s.duration=0,s.parent=this,Vi(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new Ke(r,s,hn(this,o),1),this},n.call=function(r,s,o){return An(this,Ke.delayedCall(0,r,s),o)},n.staggerTo=function(r,s,o,a,l,c,u){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=c,o.onCompleteParams=u,o.parent=this,new Ke(r,o,hn(this,l)),this},n.staggerFrom=function(r,s,o,a,l,c,u){return o.runBackwards=1,Vi(o).immediateRender=Ft(o.immediateRender),this.staggerTo(r,s,o,a,l,c,u)},n.staggerFromTo=function(r,s,o,a,l,c,u,f){return a.startAt=o,Vi(a).immediateRender=Ft(a.immediateRender),this.staggerTo(r,s,a,l,c,u,f)},n.render=function(r,s,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=r<=0?0:Ge(r),f=this._zTime<0!=r<0&&(this._initted||!c),h,d,g,p,m,v,y,x,w,S,C,k;if(this!==Be&&u>l&&r>=0&&(u=l),u!==this._tTime||o||f){if(a!==this._time&&c&&(u+=this._time-a,r+=this._time-a),h=u,w=this._start,x=this._ts,v=!x,f&&(c||(a=this._zTime),(r||!s)&&(this._zTime=r)),this._repeat){if(C=this._yoyo,m=c+this._rDelay,this._repeat<-1&&r<0)return this.totalTime(m*100+r,s,o);if(h=Ge(u%m),u===l?(p=this._repeat,h=c):(S=Ge(u/m),p=~~S,p&&p===S&&(h=c,p--),h>c&&(h=c)),S=mi(this._tTime,m),!a&&this._tTime&&S!==p&&this._tTime-S*m-this._dur<=0&&(S=p),C&&p&1&&(h=c-h,k=1),p!==S&&!this._lock){var A=C&&S&1,E=A===(C&&p&1);if(p<S&&(A=!A),a=A?0:u%c?c:u,this._lock=1,this.render(a||(k?0:Ge(p*m)),s,!c)._lock=0,this._tTime=u,!s&&this.parent&&nn(this,"onRepeat"),this.vars.repeatRefresh&&!k&&(this.invalidate()._lock=1,S=p),a&&a!==this._time||v!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,E&&(this._lock=2,a=A?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!k&&this.invalidate()),this._lock=0,!this._ts&&!v)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(y=Lh(this,Ge(a),Ge(h)),y&&(u-=h-(h=y._start))),this._tTime=u,this._time=h,this._act=!!x,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=r,a=0),!a&&u&&c&&!s&&!S&&(nn(this,"onStart"),this._tTime!==u))return this;if(h>=a&&r>=0)for(d=this._first;d;){if(g=d._next,(d._act||h>=d._start)&&d._ts&&y!==d){if(d.parent!==this)return this.render(r,s,o);if(d.render(d._ts>0?(h-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(h-d._start)*d._ts,s,o),h!==this._time||!this._ts&&!v){y=0,g&&(u+=this._zTime=-Ce);break}}d=g}else{d=this._last;for(var P=r<0?r:h;d;){if(g=d._prev,(d._act||P<=d._end)&&d._ts&&y!==d){if(d.parent!==this)return this.render(r,s,o);if(d.render(d._ts>0?(P-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(P-d._start)*d._ts,s,o||pt&&rl(d)),h!==this._time||!this._ts&&!v){y=0,g&&(u+=this._zTime=P?-Ce:Ce);break}}d=g}}if(y&&!s&&(this.pause(),y.render(h>=a?0:-Ce)._zTime=h>=a?1:-1,this._ts))return this._start=w,Po(this),this.render(r,s,o);this._onUpdate&&!s&&nn(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&a)&&(w===this._start||Math.abs(x)!==Math.abs(this._ts))&&(this._lock||((r||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&fr(this,1),!s&&!(r<0&&!a)&&(u||a||!l)&&(nn(this,u===l&&r>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},n.add=function(r,s){var o=this;if(Un(s)||(s=hn(this,s,r)),!(r instanceof hs)){if(kt(r))return r.forEach(function(a){return o.add(a,s)}),this;if(at(r))return this.addLabel(r,s);if(Xe(r))r=Ke.delayedCall(0,r);else return this}return this!==r?An(this,r,s):this},n.getChildren=function(r,s,o,a){r===void 0&&(r=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-mn);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof Ke?s&&l.push(c):(o&&l.push(c),r&&l.push.apply(l,c.getChildren(!0,s,o)))),c=c._next;return l},n.getById=function(r){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===r)return s[o]},n.remove=function(r){return at(r)?this.removeLabel(r):Xe(r)?this.killTweensOf(r):(r.parent===this&&Mo(this,r),r===this._recent&&(this._recent=this._last),Or(this))},n.totalTime=function(r,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Ge(en.time-(this._ts>0?r/this._ts:(this.totalDuration()-r)/-this._ts))),i.prototype.totalTime.call(this,r,s),this._forcing=0,this):this._tTime},n.addLabel=function(r,s){return this.labels[r]=hn(this,s),this},n.removeLabel=function(r){return delete this.labels[r],this},n.addPause=function(r,s,o){var a=Ke.delayedCall(0,s||us,o);return a.data="isPause",this._hasPause=1,An(this,a,hn(this,r))},n.removePause=function(r){var s=this._first;for(r=hn(this,r);s;)s._start===r&&s.data==="isPause"&&fr(s),s=s._next},n.killTweensOf=function(r,s,o){for(var a=this.getTweensOf(r,o),l=a.length;l--;)tr!==a[l]&&a[l].kill(r,s);return this},n.getTweensOf=function(r,s){for(var o=[],a=_n(r),l=this._first,c=Un(s),u;l;)l instanceof Ke?Ch(l._targets,a)&&(c?(!tr||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&o.push(l):(u=l.getTweensOf(a,s)).length&&o.push.apply(o,u),l=l._next;return o},n.tweenTo=function(r,s){s=s||{};var o=this,a=hn(o,r),l=s,c=l.startAt,u=l.onStart,f=l.onStartParams,h=l.immediateRender,d,g=Ke.to(o,an({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale())||Ce,onStart:function(){if(o.pause(),!d){var m=s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale());g._dur!==m&&_i(g,m,0,1).render(g._time,!0,!0),d=1}u&&u.apply(g,f||[])}},s));return h?g.render(0):g},n.tweenFromTo=function(r,s,o){return this.tweenTo(s,an({startAt:{time:hn(this,r)}},o))},n.recent=function(){return this._recent},n.nextLabel=function(r){return r===void 0&&(r=this._time),$l(this,hn(this,r))},n.previousLabel=function(r){return r===void 0&&(r=this._time),$l(this,hn(this,r),1)},n.currentLabel=function(r){return arguments.length?this.seek(r,!0):this.previousLabel(this._time+Ce)},n.shiftChildren=function(r,s,o){o===void 0&&(o=0);var a=this._first,l=this.labels,c;for(r=Ge(r);a;)a._start>=o&&(a._start+=r,a._end+=r),a=a._next;if(s)for(c in l)l[c]>=o&&(l[c]+=r);return Or(this)},n.invalidate=function(r){var s=this._first;for(this._lock=0;s;)s.invalidate(r),s=s._next;return i.prototype.invalidate.call(this,r)},n.clear=function(r){r===void 0&&(r=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),r&&(this.labels={}),Or(this)},n.totalDuration=function(r){var s=0,o=this,a=o._last,l=mn,c,u,f;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-r:r));if(o._dirty){for(f=o.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),u=a._start,u>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,An(o,a,u-a._delay,1)._lock=0):l=u,u<0&&a._ts&&(s-=u,(!f&&!o._dp||f&&f.smoothChildTiming)&&(o._start+=Ge(u/o._ts),o._time-=u,o._tTime-=u),o.shiftChildren(-u,!1,-1/0),l=0),a._end>s&&a._ts&&(s=a._end),a=c;_i(o,o===Be&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},e.updateRoot=function(r){if(Be._ts&&(Pu(Be,ho(r,Be)),Eu=en.frame),en.frame>=zl){zl+=sn.autoSleep||120;var s=Be._first;if((!s||!s._ts)&&sn.autoSleep&&en._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||en.sleep()}}},e}(hs);an(Nt.prototype,{_lock:0,_hasPause:0,_forcing:0});var Qh=function(e,n,t,r,s,o,a){var l=new Gt(this._pt,e,n,0,1,tf,null,s),c=0,u=0,f,h,d,g,p,m,v,y;for(l.b=t,l.e=r,t+="",r+="",(v=~r.indexOf("random("))&&(r=fs(r)),o&&(y=[t,r],o(y,e,n),t=y[0],r=y[1]),h=t.match(Io)||[];f=Io.exec(r);)g=f[0],p=r.substring(c,f.index),d?d=(d+1)%5:p.substr(-5)==="rgba("&&(d=1),g!==h[u++]&&(m=parseFloat(h[u-1])||0,l._pt={_next:l._pt,p:p||u===1?p:",",s:m,c:g.charAt(1)==="="?oi(m,g)-m:parseFloat(g)-m,m:d&&d<4?Math.round:0},c=Io.lastIndex);return l.c=c<r.length?r.substring(c,r.length):"",l.fp=a,(Su.test(r)||v)&&(l.e=0),this._pt=l,l},il=function(e,n,t,r,s,o,a,l,c,u){Xe(r)&&(r=r(s||0,e,o));var f=e[n],h=t!=="get"?t:Xe(f)?c?e[n.indexOf("set")||!Xe(e["get"+n.substr(3)])?n:"get"+n.substr(3)](c):e[n]():f,d=Xe(f)?c?tp:Ju:ol,g;if(at(r)&&(~r.indexOf("random(")&&(r=fs(r)),r.charAt(1)==="="&&(g=oi(h,r)+(xt(h)||0),(g||g===0)&&(r=g))),!u||h!==r||ma)return!isNaN(h*r)&&r!==""?(g=new Gt(this._pt,e,n,+h||0,r-(h||0),typeof f=="boolean"?rp:ef,0,d),c&&(g.fp=c),a&&g.modifier(a,this,e),this._pt=g):(!f&&!(n in e)&&Ja(n,r),Qh.call(this,e,n,h,r,d,l||sn.stringFilter,c))},Kh=function(e,n,t,r,s){if(Xe(e)&&(e=ji(e,s,n,t,r)),!zn(e)||e.style&&e.nodeType||kt(e)||xu(e))return at(e)?ji(e,s,n,t,r):e;var o={},a;for(a in e)o[a]=ji(e[a],s,n,t,r);return o},Qu=function(e,n,t,r,s,o){var a,l,c,u;if(Qt[e]&&(a=new Qt[e]).init(s,a.rawVars?n[e]:Kh(n[e],r,s,o,t),t,r,o)!==!1&&(t._pt=l=new Gt(t._pt,s,e,0,1,a.render,a,0,a.priority),t!==ri))for(c=t._ptLookup[t._targets.indexOf(s)],u=a._props.length;u--;)c[a._props[u]]=l;return a},tr,ma,sl=function i(e,n,t){var r=e.vars,s=r.ease,o=r.startAt,a=r.immediateRender,l=r.lazy,c=r.onUpdate,u=r.runBackwards,f=r.yoyoEase,h=r.keyframes,d=r.autoRevert,g=e._dur,p=e._startAt,m=e._targets,v=e.parent,y=v&&v.data==="nested"?v.vars.targets:m,x=e._overwrite==="auto"&&!ja,w=e.timeline,S=r.easeReverse||f,C,k,A,E,P,$,_,z,N,B,I,F,R;if(w&&(!h||!s)&&(s="none"),e._ease=Lr(s,ls.ease),e._rEase=S&&(Lr(S)||e._ease),e._from=!w&&!!r.runBackwards,e._from&&(e.ratio=1),!w||h&&!r.stagger){if(z=m[0]?Rr(m[0]).harness:0,F=z&&r[z.prop],C=fo(r,el),p&&(p._zTime<0&&p.progress(1),n<0&&u&&a&&!d?p.render(-1,!0):p.revert(u&&g?Us:kh),p._lazy=0),o){if(fr(e._startAt=Ke.set(m,an({data:"isStart",overwrite:!1,parent:v,immediateRender:!0,lazy:!p&&Ft(l),startAt:null,delay:0,onUpdate:c&&function(){return nn(e,"onUpdate")},stagger:0},o))),e._startAt._dp=0,e._startAt._sat=e,n<0&&(pt||!a&&!d)&&e._startAt.revert(Us),a&&g&&n<=0&&t<=0){n&&(e._zTime=n);return}}else if(u&&g&&!p){if(n&&(a=!1),A=an({overwrite:!1,data:"isFromStart",lazy:a&&!p&&Ft(l),immediateRender:a,stagger:0,parent:v},C),F&&(A[z.prop]=F),fr(e._startAt=Ke.set(m,A)),e._startAt._dp=0,e._startAt._sat=e,n<0&&(pt?e._startAt.revert(Us):e._startAt.render(-1,!0)),e._zTime=n,!a)i(e._startAt,Ce,Ce);else if(!n)return}for(e._pt=e._ptCache=0,l=g&&Ft(l)||l&&!g,k=0;k<m.length;k++){if(P=m[k],_=P._gsap||nl(m)[k]._gsap,e._ptLookup[k]=B={},ua[_.id]&&lr.length&&uo(),I=y===m?k:y.indexOf(P),z&&(N=new z).init(P,F||C,e,I,y)!==!1&&(e._pt=E=new Gt(e._pt,P,N.name,0,1,N.render,N,0,N.priority),N._props.forEach(function(L){B[L]=E}),N.priority&&($=1)),!z||F)for(A in C)Qt[A]&&(N=Qu(A,C,e,I,P,y))?N.priority&&($=1):B[A]=E=il.call(e,P,A,"get",C[A],I,y,0,r.stringFilter);e._op&&e._op[k]&&e.kill(P,e._op[k]),x&&e._pt&&(tr=e,Be.killTweensOf(P,B,e.globalTime(n)),R=!e.parent,tr=0),e._pt&&l&&(ua[_.id]=1)}$&&nf(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!R,h&&n<=0&&w.render(mn,!0,!0)},Zh=function(e,n,t,r,s,o,a,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[n],u,f,h,d;if(!c)for(c=e._ptCache[n]=[],h=e._ptLookup,d=e._targets.length;d--;){if(u=h[d][n],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==n&&u.fp!==n;)u=u._next;if(!u)return ma=1,e.vars[n]="+=0",sl(e,a),ma=0,l?cs(n+" not eligible for reset. Try splitting into individual properties"):1;c.push(u)}for(d=c.length;d--;)f=c[d],u=f._pt||f,u.s=(r||r===0)&&!s?r:u.s+(r||0)+o*u.c,u.c=t-u.s,f.e&&(f.e=We(t)+xt(f.e)),f.b&&(f.b=u.s+xt(f.b))},Jh=function(e,n){var t=e[0]?Rr(e[0]).harness:0,r=t&&t.aliases,s,o,a,l;if(!r)return n;s=gi({},n);for(o in r)if(o in s)for(l=r[o].split(","),a=l.length;a--;)s[l[a]]=s[o];return s},ep=function(e,n,t,r){var s=n.ease||r||"power1.inOut",o,a;if(kt(n))a=t[e]||(t[e]=[]),n.forEach(function(l,c){return a.push({t:c/(n.length-1)*100,v:l,e:s})});else for(o in n)a=t[o]||(t[o]=[]),o==="ease"||a.push({t:parseFloat(e),v:n[o],e:s})},ji=function(e,n,t,r,s){return Xe(e)?e.call(n,t,r,s):at(e)&&~e.indexOf("random(")?fs(e):e},Ku=tl+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",Zu={};$t(Ku+",id,stagger,delay,duration,paused,scrollTrigger",function(i){return Zu[i]=1});var Ke=function(i){bu(e,i);function e(t,r,s,o){var a;typeof r=="number"&&(s.duration=r,r=s,s=null),a=i.call(this,o?r:Vi(r))||this;var l=a.vars,c=l.duration,u=l.delay,f=l.immediateRender,h=l.stagger,d=l.overwrite,g=l.keyframes,p=l.defaults,m=l.scrollTrigger,v=r.parent||Be,y=(kt(t)||xu(t)?Un(t[0]):"length"in r)?[t]:_n(t),x,w,S,C,k,A,E,P;if(a._targets=y.length?nl(y):cs("GSAP target "+t+" not found. https://gsap.com",!sn.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=d,g||h||xs(c)||xs(u)){r=a.vars;var $=r.easeReverse||r.yoyoEase;if(x=a.timeline=new Nt({data:"nested",defaults:p||{},targets:v&&v.data==="nested"?v.vars.targets:y}),x.kill(),x.parent=x._dp=Gn(a),x._start=0,h||xs(c)||xs(u)){if(C=y.length,E=h&&Fu(h),zn(h))for(k in h)~Ku.indexOf(k)&&(P||(P={}),P[k]=h[k]);for(w=0;w<C;w++)S=fo(r,Zu),S.stagger=0,$&&(S.easeReverse=$),P&&gi(S,P),A=y[w],S.duration=+ji(c,Gn(a),w,A,y),S.delay=(+ji(u,Gn(a),w,A,y)||0)-a._delay,!h&&C===1&&S.delay&&(a._delay=u=S.delay,a._start+=u,S.delay=0),x.to(A,S,E?E(w,A,y):0),x._ease=he.none;x.duration()?c=u=0:a.timeline=0}else if(g){Vi(an(x.vars.defaults,{ease:"none"})),x._ease=Lr(g.ease||r.ease||"none");var _=0,z,N,B;if(kt(g))g.forEach(function(I){return x.to(y,I,">")}),x.duration();else{S={};for(k in g)k==="ease"||k==="easeEach"||ep(k,g[k],S,g.easeEach);for(k in S)for(z=S[k].sort(function(I,F){return I.t-F.t}),_=0,w=0;w<z.length;w++)N=z[w],B={ease:N.e,duration:(N.t-(w?z[w-1].t:0))/100*c},B[k]=N.v,x.to(y,B,_),_+=B.duration;x.duration()<c&&x.to({},{duration:c-x.duration()})}}c||a.duration(c=x.duration())}else a.timeline=0;return d===!0&&!ja&&(tr=Gn(a),Be.killTweensOf(y),tr=0),An(v,Gn(a),s),r.reversed&&a.reverse(),r.paused&&a.paused(!0),(f||!c&&!g&&a._start===Ge(v._time)&&Ft(f)&&Ah(Gn(a))&&v.data!=="nested")&&(a._tTime=-Ce,a.render(Math.max(0,-u)||0)),m&&Du(Gn(a),m),a}var n=e.prototype;return n.render=function(r,s,o){var a=this._time,l=this._tDur,c=this._dur,u=r<0,f=r>l-Ce&&!u?l:r<Ce?0:r,h,d,g,p,m,v,y,x;if(!c)Oh(this,r,s,o);else if(f!==this._tTime||!r||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(h=f,x=this.timeline,this._repeat){if(p=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(p*100+r,s,o);if(h=Ge(f%p),f===l?(g=this._repeat,h=c):(m=Ge(f/p),g=~~m,g&&g===m?(h=c,g--):h>c&&(h=c)),v=this._yoyo&&g&1,v&&(h=c-h),m=mi(this._tTime,p),h===a&&!o&&this._initted&&g===m)return this._tTime=f,this;g!==m&&this.vars.repeatRefresh&&!v&&!this._lock&&h!==p&&this._initted&&(this._lock=o=1,this.render(Ge(p*g),!0).invalidate()._lock=0)}if(!this._initted){if(zu(this,u?r:h,o,s,f))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&g!==m))return this;if(c!==this._dur)return this.render(r,s,o)}if(this._rEase){var w=h<a;if(w!==this._inv){var S=w?a:c-a;this._inv=w,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=a,this._invRecip=S?(w?-1:1)/S:0,this._invScale=w?-this.ratio:1-this.ratio,this._invEase=w?this._rEase:this._ease}this.ratio=y=this._invRatio+this._invScale*this._invEase((h-this._invTime)*this._invRecip)}else this.ratio=y=this._ease(h/c);if(this._from&&(this.ratio=y=1-y),this._tTime=f,this._time=h,!this._act&&this._ts&&(this._act=1,this._lazy=0),!a&&f&&!s&&!m&&(nn(this,"onStart"),this._tTime!==f))return this;for(d=this._pt;d;)d.r(y,d.d),d=d._next;x&&x.render(r<0?r:x._dur*x._ease(h/this._dur),s,o)||this._startAt&&(this._zTime=r),this._onUpdate&&!s&&(u&&fa(this,r,s,o),nn(this,"onUpdate")),this._repeat&&g!==m&&this.vars.onRepeat&&!s&&this.parent&&nn(this,"onRepeat"),(f===this._tDur||!f)&&this._tTime===f&&(u&&!this._onUpdate&&fa(this,r,!0,!0),(r||!c)&&(f===this._tDur&&this._ts>0||!f&&this._ts<0)&&fr(this,1),!s&&!(u&&!a)&&(f||a||v)&&(nn(this,f===l?"onComplete":"onReverseComplete",!0),this._prom&&!(f<l&&this.timeScale()>0)&&this._prom()))}return this},n.targets=function(){return this._targets},n.invalidate=function(r){return(!r||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(r),i.prototype.invalidate.call(this,r)},n.resetTo=function(r,s,o,a,l){ds||en.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||sl(this,c),u=this._ease(c/this._dur),Zh(this,r,s,o,a,u,c,l)?this.resetTo(r,s,o,a,1):(Ao(this,0),this.parent||Ou(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},n.kill=function(r,s){if(s===void 0&&(s="all"),!r&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?Fi(this):this.scrollTrigger&&this.scrollTrigger.kill(!!pt),this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(r,s,tr&&tr.vars.overwrite!==!0)._first||Fi(this),this.parent&&o!==this.timeline.totalDuration()&&_i(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=r?_n(r):a,c=this._ptLookup,u=this._pt,f,h,d,g,p,m,v;if((!s||s==="all")&&Mh(a,l))return s==="all"&&(this._pt=0),Fi(this);for(f=this._op=this._op||[],s!=="all"&&(at(s)&&(p={},$t(s,function(y){return p[y]=1}),s=p),s=Jh(a,s)),v=a.length;v--;)if(~l.indexOf(a[v])){h=c[v],s==="all"?(f[v]=s,g=h,d={}):(d=f[v]=f[v]||{},g=s);for(p in g)m=h&&h[p],m&&((!("kill"in m.d)||m.d.kill(p)===!0)&&Mo(this,m,"_pt"),delete h[p]),d!=="all"&&(d[p]=1)}return this._initted&&!this._pt&&u&&Fi(this),this},e.to=function(r,s){return new e(r,s,arguments[2])},e.from=function(r,s){return Ui(1,arguments)},e.delayedCall=function(r,s,o,a){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:r,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},e.fromTo=function(r,s,o){return Ui(2,arguments)},e.set=function(r,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(r,s)},e.killTweensOf=function(r,s,o){return Be.killTweensOf(r,s,o)},e}(hs);an(Ke.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});$t("staggerTo,staggerFrom,staggerFromTo",function(i){Ke[i]=function(){var e=new Nt,n=ha.call(arguments,0);return n.splice(i==="staggerFromTo"?5:4,0,0),e[i].apply(e,n)}});var ol=function(e,n,t){return e[n]=t},Ju=function(e,n,t){return e[n](t)},tp=function(e,n,t,r){return e[n](r.fp,t)},np=function(e,n,t){return e.setAttribute(n,t)},al=function(e,n){return Xe(e[n])?Ju:Qa(e[n])&&e.setAttribute?np:ol},ef=function(e,n){return n.set(n.t,n.p,Math.round((n.s+n.c*e)*1e6)/1e6,n)},rp=function(e,n){return n.set(n.t,n.p,!!(n.s+n.c*e),n)},tf=function(e,n){var t=n._pt,r="";if(!e&&n.b)r=n.b;else if(e===1&&n.e)r=n.e;else{for(;t;)r=t.p+(t.m?t.m(t.s+t.c*e):Math.round((t.s+t.c*e)*1e4)/1e4)+r,t=t._next;r+=n.c}n.set(n.t,n.p,r,n)},ll=function(e,n){for(var t=n._pt;t;)t.r(e,t.d),t=t._next},ip=function(e,n,t,r){for(var s=this._pt,o;s;)o=s._next,s.p===r&&s.modifier(e,n,t),s=o},sp=function(e){for(var n=this._pt,t,r;n;)r=n._next,n.p===e&&!n.op||n.op===e?Mo(this,n,"_pt"):n.dep||(t=1),n=r;return!t},op=function(e,n,t,r){r.mSet(e,n,r.m.call(r.tween,t,r.mt),r)},nf=function(e){for(var n=e._pt,t,r,s,o;n;){for(t=n._next,r=s;r&&r.pr>n.pr;)r=r._next;(n._prev=r?r._prev:o)?n._prev._next=n:s=n,(n._next=r)?r._prev=n:o=n,n=t}e._pt=s},Gt=function(){function i(n,t,r,s,o,a,l,c,u){this.t=t,this.s=s,this.c=o,this.p=r,this.r=a||ef,this.d=l||this,this.set=c||ol,this.pr=u||0,this._next=n,n&&(n._prev=this)}var e=i.prototype;return e.modifier=function(t,r,s){this.mSet=this.mSet||this.set,this.set=op,this.m=t,this.mt=s,this.tween=r},i}();$t(tl+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(i){return el[i]=1});on.TweenMax=on.TweenLite=Ke;on.TimelineLite=on.TimelineMax=Nt;Be=new Nt({sortChildren:!1,defaults:ls,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});sn.stringFilter=Vu;var Dr=[],Qs={},ap=[],Bl=0,lp=0,Bo=function(e){return(Qs[e]||ap).map(function(n){return n()})},_a=function(){var e=Date.now(),n=[];e-Bl>2&&(Bo("matchMediaInit"),Dr.forEach(function(t){var r=t.queries,s=t.conditions,o,a,l,c;for(a in r)o=En.matchMedia(r[a]).matches,o&&(l=1),o!==s[a]&&(s[a]=o,c=1);c&&(t.revert(),l&&n.push(t))}),Bo("matchMediaRevert"),n.forEach(function(t){return t.onMatch(t,function(r){return t.add(null,r)})}),Bl=e,Bo("matchMedia"))},rf=function(){function i(n,t){this.selector=t&&pa(t),this.data=[],this._r=[],this.isReverted=!1,this.id=lp++,n&&this.add(n)}var e=i.prototype;return e.add=function(t,r,s){Xe(t)&&(s=r,r=t,t=Xe);var o=this,a=function(){var c=ze,u=o.selector,f;return c&&c!==o&&c.data.push(o),s&&(o.selector=pa(s)),ze=o,f=r.apply(o,arguments),Xe(f)&&o._r.push(f),ze=c,o.selector=u,o.isReverted=!1,f};return o.last=a,t===Xe?a(o,function(l){return o.add(null,l)}):t?o[t]=a:a},e.ignore=function(t){var r=ze;ze=null,t(this),ze=r},e.getTweens=function(){var t=[];return this.data.forEach(function(r){return r instanceof i?t.push.apply(t,r.getTweens()):r instanceof Ke&&!(r.parent&&r.parent.data==="nested")&&t.push(r)}),t},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(t,r){var s=this;if(t?function(){for(var a=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return a.splice(a.indexOf(u),1)}));for(a.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,f){return f.g-u.g||-1/0}).forEach(function(u){return u.t.revert(t)}),l=s.data.length;l--;)c=s.data[l],c instanceof Nt?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof Ke)&&c.revert&&c.revert(t);s._r.forEach(function(u){return u(t,s)}),s.isReverted=!0}():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),r)for(var o=Dr.length;o--;)Dr[o].id===this.id&&Dr.splice(o,1)},e.revert=function(t){this.kill(t||{})},i}(),cp=function(){function i(n){this.contexts=[],this.scope=n,ze&&ze.data.push(this)}var e=i.prototype;return e.add=function(t,r,s){zn(t)||(t={matches:t});var o=new rf(0,s||this.scope),a=o.conditions={},l,c,u;ze&&!o.selector&&(o.selector=ze.selector),this.contexts.push(o),r=o.add("onMatch",r),o.queries=t;for(c in t)c==="all"?u=1:(l=En.matchMedia(t[c]),l&&(Dr.indexOf(o)<0&&Dr.push(o),(a[c]=l.matches)&&(u=1),l.addListener?l.addListener(_a):l.addEventListener("change",_a)));return u&&r(o,function(f){return o.add(null,f)}),this},e.revert=function(t){this.kill(t||{})},e.kill=function(t){this.contexts.forEach(function(r){return r.kill(t,!0)})},i}(),po={registerPlugin:function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];n.forEach(function(r){return Xu(r)})},timeline:function(e){return new Nt(e)},getTweensOf:function(e,n){return Be.getTweensOf(e,n)},getProperty:function(e,n,t,r){at(e)&&(e=_n(e)[0]);var s=Rr(e||{}).get,o=t?Ru:Au;return t==="native"&&(t=""),e&&(n?o((Qt[n]&&Qt[n].get||s)(e,n,t,r)):function(a,l,c){return o((Qt[a]&&Qt[a].get||s)(e,a,l,c))})},quickSetter:function(e,n,t){if(e=_n(e),e.length>1){var r=e.map(function(u){return Yt.quickSetter(u,n,t)}),s=r.length;return function(u){for(var f=s;f--;)r[f](u)}}e=e[0]||{};var o=Qt[n],a=Rr(e),l=a.harness&&(a.harness.aliases||{})[n]||n,c=o?function(u){var f=new o;ri._pt=0,f.init(e,t?u+t:u,ri,0,[e]),f.render(1,f),ri._pt&&ll(1,ri)}:a.set(e,l);return o?c:function(u){return c(e,l,t?u+t:u,a,1)}},quickTo:function(e,n,t){var r,s=Yt.to(e,an((r={},r[n]="+=0.1",r.paused=!0,r.stagger=0,r),t||{})),o=function(l,c,u){return s.resetTo(n,l,c,u)};return o.tween=s,o},isTweening:function(e){return Be.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=Lr(e.ease,ls.ease)),Il(ls,e||{})},config:function(e){return Il(sn,e||{})},registerEffect:function(e){var n=e.name,t=e.effect,r=e.plugins,s=e.defaults,o=e.extendTimeline;(r||"").split(",").forEach(function(a){return a&&!Qt[a]&&!on[a]&&cs(n+" effect requires "+a+" plugin.")}),No[n]=function(a,l,c){return t(_n(a),an(l||{},s),c)},o&&(Nt.prototype[n]=function(a,l,c){return this.add(No[n](a,zn(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,n){he[e]=Lr(n)},parseEase:function(e,n){return arguments.length?Lr(e,n):he},getById:function(e){return Be.getById(e)},exportRoot:function(e,n){e===void 0&&(e={});var t=new Nt(e),r,s;for(t.smoothChildTiming=Ft(e.smoothChildTiming),Be.remove(t),t._dp=0,t._time=t._tTime=Be._time,r=Be._first;r;)s=r._next,(n||!(!r._dur&&r instanceof Ke&&r.vars.onComplete===r._targets[0]))&&An(t,r,r._start-r._delay),r=s;return An(Be,t,0),t},context:function(e,n){return e?new rf(e,n):ze},matchMedia:function(e){return new cp(e)},matchMediaRefresh:function(){return Dr.forEach(function(e){var n=e.conditions,t,r;for(r in n)n[r]&&(n[r]=!1,t=1);t&&e.revert()})||_a()},addEventListener:function(e,n){var t=Qs[e]||(Qs[e]=[]);~t.indexOf(n)||t.push(n)},removeEventListener:function(e,n){var t=Qs[e],r=t&&t.indexOf(n);r>=0&&t.splice(r,1)},utils:{wrap:Gh,wrapYoyo:Bh,distribute:Fu,random:Gu,snap:$u,normalize:$h,getUnit:xt,clamp:zh,splitColor:qu,toArray:_n,selector:pa,mapRange:Hu,pipe:Nh,unitize:Fh,interpolate:Hh,shuffle:Nu},install:Tu,effects:No,ticker:en,updateRoot:Nt.updateRoot,plugins:Qt,globalTimeline:Be,core:{PropTween:Gt,globals:Cu,Tween:Ke,Timeline:Nt,Animation:hs,getCache:Rr,_removeLinkedListItem:Mo,reverting:function(){return pt},context:function(e){return e&&ze&&(ze.data.push(e),e._ctx=ze),ze},suppressOverwrites:function(e){return ja=e}}};$t("to,from,fromTo,delayedCall,set,killTweensOf",function(i){return po[i]=Ke[i]});en.add(Nt.updateRoot);ri=po.to({},{duration:0});var up=function(e,n){for(var t=e._pt;t&&t.p!==n&&t.op!==n&&t.fp!==n;)t=t._next;return t},fp=function(e,n){var t=e._targets,r,s,o;for(r in n)for(s=t.length;s--;)o=e._ptLookup[s][r],o&&(o=o.d)&&(o._pt&&(o=up(o,r)),o&&o.modifier&&o.modifier(n[r],e,t[s],r))},Ho=function(e,n){return{name:e,headless:1,rawVars:1,init:function(r,s,o){o._onInit=function(a){var l,c;if(at(s)&&(l={},$t(s,function(u){return l[u]=1}),s=l),n){l={};for(c in s)l[c]=n(s[c]);s=l}fp(a,s)}}}},Yt=po.registerPlugin({name:"attr",init:function(e,n,t,r,s){var o,a,l;this.tween=t;for(o in n)l=e.getAttribute(o)||"",a=this.add(e,"setAttribute",(l||0)+"",n[o],r,s,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(e,n){for(var t=n._pt;t;)pt?t.set(t.t,t.p,t.b,t):t.r(e,t.d),t=t._next}},{name:"endArray",headless:1,init:function(e,n){for(var t=n.length;t--;)this.add(e,t,e[t]||0,n[t],0,0,0,0,0,1)}},Ho("roundProps",ga),Ho("modifiers"),Ho("snap",$u))||po;Ke.version=Nt.version=Yt.version="3.15.0";ku=1;Ka()&&yi();he.Power0;he.Power1;he.Power2;he.Power3;he.Power4;he.Linear;he.Quad;he.Cubic;he.Quart;he.Quint;he.Strong;he.Elastic;he.Back;he.SteppedEase;he.Bounce;he.Sine;he.Expo;he.Circ;/*!
 * CSSPlugin 3.15.0
 * https://gsap.com
 *
 * Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Hl,nr,ai,cl,Er,Yl,ul,dp=function(){return typeof window<"u"},jn={},Sr=180/Math.PI,li=Math.PI/180,Vr=Math.atan2,Xl=1e8,fl=/([A-Z])/g,hp=/(left|right|width|margin|padding|x)/i,pp=/[\s,\(]\S/,Rn={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},ya=function(e,n){return n.set(n.t,n.p,Math.round((n.s+n.c*e)*1e4)/1e4+n.u,n)},gp=function(e,n){return n.set(n.t,n.p,e===1?n.e:Math.round((n.s+n.c*e)*1e4)/1e4+n.u,n)},mp=function(e,n){return n.set(n.t,n.p,e?Math.round((n.s+n.c*e)*1e4)/1e4+n.u:n.b,n)},_p=function(e,n){return n.set(n.t,n.p,e===1?n.e:e?Math.round((n.s+n.c*e)*1e4)/1e4+n.u:n.b,n)},yp=function(e,n){var t=n.s+n.c*e;n.set(n.t,n.p,~~(t+(t<0?-.5:.5))+n.u,n)},sf=function(e,n){return n.set(n.t,n.p,e?n.e:n.b,n)},of=function(e,n){return n.set(n.t,n.p,e!==1?n.b:n.e,n)},bp=function(e,n,t){return e.style[n]=t},vp=function(e,n,t){return e.style.setProperty(n,t)},xp=function(e,n,t){return e._gsap[n]=t},wp=function(e,n,t){return e._gsap.scaleX=e._gsap.scaleY=t},Sp=function(e,n,t,r,s){var o=e._gsap;o.scaleX=o.scaleY=t,o.renderTransform(s,o)},kp=function(e,n,t,r,s){var o=e._gsap;o[n]=t,o.renderTransform(s,o)},He="transform",Bt=He+"Origin",Tp=function i(e,n){var t=this,r=this.target,s=r.style,o=r._gsap;if(e in jn&&s){if(this.tfm=this.tfm||{},e!=="transform")e=Rn[e]||e,~e.indexOf(",")?e.split(",").forEach(function(a){return t.tfm[a]=Bn(r,a)}):this.tfm[e]=o.x?o[e]:Bn(r,e),e===Bt&&(this.tfm.zOrigin=o.zOrigin);else return Rn.transform.split(",").forEach(function(a){return i.call(t,a,n)});if(this.props.indexOf(He)>=0)return;o.svg&&(this.svgo=r.getAttribute("data-svg-origin"),this.props.push(Bt,n,"")),e=He}(s||n)&&this.props.push(e,n,s[e])},af=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},Cp=function(){var e=this.props,n=this.target,t=n.style,r=n._gsap,s,o;for(s=0;s<e.length;s+=3)e[s+1]?e[s+1]===2?n[e[s]](e[s+2]):n[e[s]]=e[s+2]:e[s+2]?t[e[s]]=e[s+2]:t.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(fl,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)r[o]=this.tfm[o];r.svg&&(r.renderTransform(),n.setAttribute("data-svg-origin",this.svgo||"")),s=ul(),(!s||!s.isStart)&&!t[He]&&(af(t),r.zOrigin&&t[Bt]&&(t[Bt]+=" "+r.zOrigin+"px",r.zOrigin=0,r.renderTransform()),r.uncache=1)}},lf=function(e,n){var t={target:e,props:[],revert:Cp,save:Tp};return e._gsap||Yt.core.getCache(e),n&&e.style&&e.nodeType&&n.split(",").forEach(function(r){return t.save(r)}),t},cf,ba=function(e,n){var t=nr.createElementNS?nr.createElementNS((n||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):nr.createElement(e);return t&&t.style?t:nr.createElement(e)},rn=function i(e,n,t){var r=getComputedStyle(e);return r[n]||r.getPropertyValue(n.replace(fl,"-$1").toLowerCase())||r.getPropertyValue(n)||!t&&i(e,bi(n)||n,1)||""},ql="O,Moz,ms,Ms,Webkit".split(","),bi=function(e,n,t){var r=n||Er,s=r.style,o=5;if(e in s&&!t)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);o--&&!(ql[o]+e in s););return o<0?null:(o===3?"ms":o>=0?ql[o]:"")+e},va=function(){dp()&&window.document&&(Hl=window,nr=Hl.document,ai=nr.documentElement,Er=ba("div")||{style:{}},ba("div"),He=bi(He),Bt=He+"Origin",Er.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",cf=!!bi("perspective"),ul=Yt.core.reverting,cl=1)},Wl=function(e){var n=e.ownerSVGElement,t=ba("svg",n&&n.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),r=e.cloneNode(!0),s;r.style.display="block",t.appendChild(r),ai.appendChild(t);try{s=r.getBBox()}catch{}return t.removeChild(r),ai.removeChild(t),s},Vl=function(e,n){for(var t=n.length;t--;)if(e.hasAttribute(n[t]))return e.getAttribute(n[t])},uf=function(e){var n,t;try{n=e.getBBox()}catch{n=Wl(e),t=1}return n&&(n.width||n.height)||t||(n=Wl(e)),n&&!n.width&&!n.x&&!n.y?{x:+Vl(e,["x","cx","x1"])||0,y:+Vl(e,["y","cy","y1"])||0,width:0,height:0}:n},ff=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&uf(e))},dr=function(e,n){if(n){var t=e.style,r;n in jn&&n!==Bt&&(n=He),t.removeProperty?(r=n.substr(0,2),(r==="ms"||n.substr(0,6)==="webkit")&&(n="-"+n),t.removeProperty(r==="--"?n:n.replace(fl,"-$1").toLowerCase())):t.removeAttribute(n)}},rr=function(e,n,t,r,s,o){var a=new Gt(e._pt,n,t,0,1,o?of:sf);return e._pt=a,a.b=r,a.e=s,e._props.push(t),a},Ul={deg:1,rad:1,turn:1},Ep={grid:1,flex:1},hr=function i(e,n,t,r){var s=parseFloat(t)||0,o=(t+"").trim().substr((s+"").length)||"px",a=Er.style,l=hp.test(n),c=e.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),f=100,h=r==="px",d=r==="%",g,p,m,v;if(r===o||!s||Ul[r]||Ul[o])return s;if(o!=="px"&&!h&&(s=i(e,n,t,"px")),v=e.getCTM&&ff(e),(d||o==="%")&&(jn[n]||~n.indexOf("adius")))return g=v?e.getBBox()[l?"width":"height"]:e[u],We(d?s/g*f:s/100*g);if(a[l?"width":"height"]=f+(h?o:r),p=r!=="rem"&&~n.indexOf("adius")||r==="em"&&e.appendChild&&!c?e:e.parentNode,v&&(p=(e.ownerSVGElement||{}).parentNode),(!p||p===nr||!p.appendChild)&&(p=nr.body),m=p._gsap,m&&d&&m.width&&l&&m.time===en.time&&!m.uncache)return We(s/m.width*f);if(d&&(n==="height"||n==="width")){var y=e.style[n];e.style[n]=f+r,g=e[u],y?e.style[n]=y:dr(e,n)}else(d||o==="%")&&!Ep[rn(p,"display")]&&(a.position=rn(e,"position")),p===e&&(a.position="static"),p.appendChild(Er),g=Er[u],p.removeChild(Er),a.position="absolute";return l&&d&&(m=Rr(p),m.time=en.time,m.width=p[u]),We(h?g*s/f:g&&s?f/g*s:0)},Bn=function(e,n,t,r){var s;return cl||va(),n in Rn&&n!=="transform"&&(n=Rn[n],~n.indexOf(",")&&(n=n.split(",")[0])),jn[n]&&n!=="transform"?(s=gs(e,r),s=n!=="transformOrigin"?s[n]:s.svg?s.origin:mo(rn(e,Bt))+" "+s.zOrigin+"px"):(s=e.style[n],(!s||s==="auto"||r||~(s+"").indexOf("calc("))&&(s=go[n]&&go[n](e,n,t)||rn(e,n)||Mu(e,n)||(n==="opacity"?1:0))),t&&!~(s+"").trim().indexOf(" ")?hr(e,n,s,t)+t:s},Mp=function(e,n,t,r){if(!t||t==="none"){var s=bi(n,e,1),o=s&&rn(e,s,1);o&&o!==t?(n=s,t=o):n==="borderColor"&&(t=rn(e,"borderTopColor"))}var a=new Gt(this._pt,e.style,n,0,1,tf),l=0,c=0,u,f,h,d,g,p,m,v,y,x,w,S;if(a.b=t,a.e=r,t+="",r+="",r.substring(0,6)==="var(--"&&(r=rn(e,r.substring(4,r.indexOf(")")))),r==="auto"&&(p=e.style[n],e.style[n]=r,r=rn(e,n)||r,p?e.style[n]=p:dr(e,n)),u=[t,r],Vu(u),t=u[0],r=u[1],h=t.match(ni)||[],S=r.match(ni)||[],S.length){for(;f=ni.exec(r);)m=f[0],y=r.substring(l,f.index),g?g=(g+1)%5:(y.substr(-5)==="rgba("||y.substr(-5)==="hsla(")&&(g=1),m!==(p=h[c++]||"")&&(d=parseFloat(p)||0,w=p.substr((d+"").length),m.charAt(1)==="="&&(m=oi(d,m)+w),v=parseFloat(m),x=m.substr((v+"").length),l=ni.lastIndex-x.length,x||(x=x||sn.units[n]||w,l===r.length&&(r+=x,a.e+=x)),w!==x&&(d=hr(e,n,p,x)||0),a._pt={_next:a._pt,p:y||c===1?y:",",s:d,c:v-d,m:g&&g<4||n==="zIndex"?Math.round:0});a.c=l<r.length?r.substring(l,r.length):""}else a.r=n==="display"&&r==="none"?of:sf;return Su.test(r)&&(a.e=0),this._pt=a,a},jl={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},Pp=function(e){var n=e.split(" "),t=n[0],r=n[1]||"50%";return(t==="top"||t==="bottom"||r==="left"||r==="right")&&(e=t,t=r,r=e),n[0]=jl[t]||t,n[1]=jl[r]||r,n.join(" ")},Ap=function(e,n){if(n.tween&&n.tween._time===n.tween._dur){var t=n.t,r=t.style,s=n.u,o=t._gsap,a,l,c;if(s==="all"||s===!0)r.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)a=s[c],jn[a]&&(l=1,a=a==="transformOrigin"?Bt:He),dr(t,a);l&&(dr(t,He),o&&(o.svg&&t.removeAttribute("transform"),r.scale=r.rotate=r.translate="none",gs(t,1),o.uncache=1,af(r)))}},go={clearProps:function(e,n,t,r,s){if(s.data!=="isFromStart"){var o=e._pt=new Gt(e._pt,n,t,0,0,Ap);return o.u=r,o.pr=-10,o.tween=s,e._props.push(t),1}}},ps=[1,0,0,1,0,0],df={},hf=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},Ql=function(e){var n=rn(e,He);return hf(n)?ps:n.substr(7).match(wu).map(We)},dl=function(e,n){var t=e._gsap||Rr(e),r=e.style,s=Ql(e),o,a,l,c;return t.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?ps:s):(s===ps&&!e.offsetParent&&e!==ai&&!t.svg&&(l=r.display,r.display="block",o=e.parentNode,(!o||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,a=e.nextElementSibling,ai.appendChild(e)),s=Ql(e),l?r.display=l:dr(e,"display"),c&&(a?o.insertBefore(e,a):o?o.appendChild(e):ai.removeChild(e))),n&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},xa=function(e,n,t,r,s,o){var a=e._gsap,l=s||dl(e,!0),c=a.xOrigin||0,u=a.yOrigin||0,f=a.xOffset||0,h=a.yOffset||0,d=l[0],g=l[1],p=l[2],m=l[3],v=l[4],y=l[5],x=n.split(" "),w=parseFloat(x[0])||0,S=parseFloat(x[1])||0,C,k,A,E;t?l!==ps&&(k=d*m-g*p)&&(A=w*(m/k)+S*(-p/k)+(p*y-m*v)/k,E=w*(-g/k)+S*(d/k)-(d*y-g*v)/k,w=A,S=E):(C=uf(e),w=C.x+(~x[0].indexOf("%")?w/100*C.width:w),S=C.y+(~(x[1]||x[0]).indexOf("%")?S/100*C.height:S)),r||r!==!1&&a.smooth?(v=w-c,y=S-u,a.xOffset=f+(v*d+y*p)-v,a.yOffset=h+(v*g+y*m)-y):a.xOffset=a.yOffset=0,a.xOrigin=w,a.yOrigin=S,a.smooth=!!r,a.origin=n,a.originIsAbsolute=!!t,e.style[Bt]="0px 0px",o&&(rr(o,a,"xOrigin",c,w),rr(o,a,"yOrigin",u,S),rr(o,a,"xOffset",f,a.xOffset),rr(o,a,"yOffset",h,a.yOffset)),e.setAttribute("data-svg-origin",w+" "+S)},gs=function(e,n){var t=e._gsap||new ju(e);if("x"in t&&!n&&!t.uncache)return t;var r=e.style,s=t.scaleX<0,o="px",a="deg",l=getComputedStyle(e),c=rn(e,Bt)||"0",u,f,h,d,g,p,m,v,y,x,w,S,C,k,A,E,P,$,_,z,N,B,I,F,R,L,b,H,U,D,Y,V;return u=f=h=p=m=v=y=x=w=0,d=g=1,t.svg=!!(e.getCTM&&ff(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(r[He]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[He]!=="none"?l[He]:"")),r.scale=r.rotate=r.translate="none"),k=dl(e,t.svg),t.svg&&(t.uncache?(R=e.getBBox(),c=t.xOrigin-R.x+"px "+(t.yOrigin-R.y)+"px",F=""):F=!n&&e.getAttribute("data-svg-origin"),xa(e,F||c,!!F||t.originIsAbsolute,t.smooth!==!1,k)),S=t.xOrigin||0,C=t.yOrigin||0,k!==ps&&($=k[0],_=k[1],z=k[2],N=k[3],u=B=k[4],f=I=k[5],k.length===6?(d=Math.sqrt($*$+_*_),g=Math.sqrt(N*N+z*z),p=$||_?Vr(_,$)*Sr:0,y=z||N?Vr(z,N)*Sr+p:0,y&&(g*=Math.abs(Math.cos(y*li))),t.svg&&(u-=S-(S*$+C*z),f-=C-(S*_+C*N))):(V=k[6],D=k[7],b=k[8],H=k[9],U=k[10],Y=k[11],u=k[12],f=k[13],h=k[14],A=Vr(V,U),m=A*Sr,A&&(E=Math.cos(-A),P=Math.sin(-A),F=B*E+b*P,R=I*E+H*P,L=V*E+U*P,b=B*-P+b*E,H=I*-P+H*E,U=V*-P+U*E,Y=D*-P+Y*E,B=F,I=R,V=L),A=Vr(-z,U),v=A*Sr,A&&(E=Math.cos(-A),P=Math.sin(-A),F=$*E-b*P,R=_*E-H*P,L=z*E-U*P,Y=N*P+Y*E,$=F,_=R,z=L),A=Vr(_,$),p=A*Sr,A&&(E=Math.cos(A),P=Math.sin(A),F=$*E+_*P,R=B*E+I*P,_=_*E-$*P,I=I*E-B*P,$=F,B=R),m&&Math.abs(m)+Math.abs(p)>359.9&&(m=p=0,v=180-v),d=We(Math.sqrt($*$+_*_+z*z)),g=We(Math.sqrt(I*I+V*V)),A=Vr(B,I),y=Math.abs(A)>2e-4?A*Sr:0,w=Y?1/(Y<0?-Y:Y):0),t.svg&&(F=e.getAttribute("transform"),t.forceCSS=e.setAttribute("transform","")||!hf(rn(e,He)),F&&e.setAttribute("transform",F))),Math.abs(y)>90&&Math.abs(y)<270&&(s?(d*=-1,y+=p<=0?180:-180,p+=p<=0?180:-180):(g*=-1,y+=y<=0?180:-180)),n=n||t.uncache,t.x=u-((t.xPercent=u&&(!n&&t.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-u)?-50:0)))?e.offsetWidth*t.xPercent/100:0)+o,t.y=f-((t.yPercent=f&&(!n&&t.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-f)?-50:0)))?e.offsetHeight*t.yPercent/100:0)+o,t.z=h+o,t.scaleX=We(d),t.scaleY=We(g),t.rotation=We(p)+a,t.rotationX=We(m)+a,t.rotationY=We(v)+a,t.skewX=y+a,t.skewY=x+a,t.transformPerspective=w+o,(t.zOrigin=parseFloat(c.split(" ")[2])||!n&&t.zOrigin||0)&&(r[Bt]=mo(c)),t.xOffset=t.yOffset=0,t.force3D=sn.force3D,t.renderTransform=t.svg?Op:cf?pf:Rp,t.uncache=0,t},mo=function(e){return(e=e.split(" "))[0]+" "+e[1]},Yo=function(e,n,t){var r=xt(n);return We(parseFloat(n)+parseFloat(hr(e,"x",t+"px",r)))+r},Rp=function(e,n){n.z="0px",n.rotationY=n.rotationX="0deg",n.force3D=0,pf(e,n)},br="0deg",Ti="0px",vr=") ",pf=function(e,n){var t=n||this,r=t.xPercent,s=t.yPercent,o=t.x,a=t.y,l=t.z,c=t.rotation,u=t.rotationY,f=t.rotationX,h=t.skewX,d=t.skewY,g=t.scaleX,p=t.scaleY,m=t.transformPerspective,v=t.force3D,y=t.target,x=t.zOrigin,w="",S=v==="auto"&&e&&e!==1||v===!0;if(x&&(f!==br||u!==br)){var C=parseFloat(u)*li,k=Math.sin(C),A=Math.cos(C),E;C=parseFloat(f)*li,E=Math.cos(C),o=Yo(y,o,k*E*-x),a=Yo(y,a,-Math.sin(C)*-x),l=Yo(y,l,A*E*-x+x)}m!==Ti&&(w+="perspective("+m+vr),(r||s)&&(w+="translate("+r+"%, "+s+"%) "),(S||o!==Ti||a!==Ti||l!==Ti)&&(w+=l!==Ti||S?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+vr),c!==br&&(w+="rotate("+c+vr),u!==br&&(w+="rotateY("+u+vr),f!==br&&(w+="rotateX("+f+vr),(h!==br||d!==br)&&(w+="skew("+h+", "+d+vr),(g!==1||p!==1)&&(w+="scale("+g+", "+p+vr),y.style[He]=w||"translate(0, 0)"},Op=function(e,n){var t=n||this,r=t.xPercent,s=t.yPercent,o=t.x,a=t.y,l=t.rotation,c=t.skewX,u=t.skewY,f=t.scaleX,h=t.scaleY,d=t.target,g=t.xOrigin,p=t.yOrigin,m=t.xOffset,v=t.yOffset,y=t.forceCSS,x=parseFloat(o),w=parseFloat(a),S,C,k,A,E;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=li,c*=li,S=Math.cos(l)*f,C=Math.sin(l)*f,k=Math.sin(l-c)*-h,A=Math.cos(l-c)*h,c&&(u*=li,E=Math.tan(c-u),E=Math.sqrt(1+E*E),k*=E,A*=E,u&&(E=Math.tan(u),E=Math.sqrt(1+E*E),S*=E,C*=E)),S=We(S),C=We(C),k=We(k),A=We(A)):(S=f,A=h,C=k=0),(x&&!~(o+"").indexOf("px")||w&&!~(a+"").indexOf("px"))&&(x=hr(d,"x",o,"px"),w=hr(d,"y",a,"px")),(g||p||m||v)&&(x=We(x+g-(g*S+p*k)+m),w=We(w+p-(g*C+p*A)+v)),(r||s)&&(E=d.getBBox(),x=We(x+r/100*E.width),w=We(w+s/100*E.height)),E="matrix("+S+","+C+","+k+","+A+","+x+","+w+")",d.setAttribute("transform",E),y&&(d.style[He]=E)},Lp=function(e,n,t,r,s){var o=360,a=at(s),l=parseFloat(s)*(a&&~s.indexOf("rad")?Sr:1),c=l-r,u=r+c+"deg",f,h;return a&&(f=s.split("_")[1],f==="short"&&(c%=o,c!==c%(o/2)&&(c+=c<0?o:-o)),f==="cw"&&c<0?c=(c+o*Xl)%o-~~(c/o)*o:f==="ccw"&&c>0&&(c=(c-o*Xl)%o-~~(c/o)*o)),e._pt=h=new Gt(e._pt,n,t,r,c,gp),h.e=u,h.u="deg",e._props.push(t),h},Kl=function(e,n){for(var t in n)e[t]=n[t];return e},Dp=function(e,n,t){var r=Kl({},t._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=t.style,a,l,c,u,f,h,d,g;r.svg?(c=t.getAttribute("transform"),t.setAttribute("transform",""),o[He]=n,a=gs(t,1),dr(t,He),t.setAttribute("transform",c)):(c=getComputedStyle(t)[He],o[He]=n,a=gs(t,1),o[He]=c);for(l in jn)c=r[l],u=a[l],c!==u&&s.indexOf(l)<0&&(d=xt(c),g=xt(u),f=d!==g?hr(t,l,c,g):parseFloat(c),h=parseFloat(u),e._pt=new Gt(e._pt,a,l,f,h-f,ya),e._pt.u=g||0,e._props.push(l));Kl(a,r)};$t("padding,margin,Width,Radius",function(i,e){var n="Top",t="Right",r="Bottom",s="Left",o=(e<3?[n,t,r,s]:[n+s,n+t,r+t,r+s]).map(function(a){return e<2?i+a:"border"+a+i});go[e>1?"border"+i:i]=function(a,l,c,u,f){var h,d;if(arguments.length<4)return h=o.map(function(g){return Bn(a,g,c)}),d=h.join(" "),d.split(h[0]).length===5?h[0]:d;h=(u+"").split(" "),d={},o.forEach(function(g,p){return d[g]=h[p]=h[p]||h[(p-1)/2|0]}),a.init(l,d,f)}});var gf={name:"css",register:va,targetTest:function(e){return e.style&&e.nodeType},init:function(e,n,t,r,s){var o=this._props,a=e.style,l=t.vars.startAt,c,u,f,h,d,g,p,m,v,y,x,w,S,C,k,A,E;cl||va(),this.styles=this.styles||lf(e),A=this.styles.props,this.tween=t;for(p in n)if(p!=="autoRound"&&(u=n[p],!(Qt[p]&&Qu(p,n,t,r,e,s)))){if(d=typeof u,g=go[p],d==="function"&&(u=u.call(t,r,e,s),d=typeof u),d==="string"&&~u.indexOf("random(")&&(u=fs(u)),g)g(this,e,p,u,t)&&(k=1);else if(p.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(p)+"").trim(),u+="",cr.lastIndex=0,cr.test(c)||(m=xt(c),v=xt(u),v?m!==v&&(c=hr(e,p,c,v)+v):m&&(u+=m)),this.add(a,"setProperty",c,u,r,s,0,0,p),o.push(p),A.push(p,0,a[p]);else if(d!=="undefined"){if(l&&p in l?(c=typeof l[p]=="function"?l[p].call(t,r,e,s):l[p],at(c)&&~c.indexOf("random(")&&(c=fs(c)),xt(c+"")||c==="auto"||(c+=sn.units[p]||xt(Bn(e,p))||""),(c+"").charAt(1)==="="&&(c=Bn(e,p))):c=Bn(e,p),h=parseFloat(c),y=d==="string"&&u.charAt(1)==="="&&u.substr(0,2),y&&(u=u.substr(2)),f=parseFloat(u),p in Rn&&(p==="autoAlpha"&&(h===1&&Bn(e,"visibility")==="hidden"&&f&&(h=0),A.push("visibility",0,a.visibility),rr(this,a,"visibility",h?"inherit":"hidden",f?"inherit":"hidden",!f)),p!=="scale"&&p!=="transform"&&(p=Rn[p],~p.indexOf(",")&&(p=p.split(",")[0]))),x=p in jn,x){if(this.styles.save(p),E=u,d==="string"&&u.substring(0,6)==="var(--"){if(u=rn(e,u.substring(4,u.indexOf(")"))),u.substring(0,5)==="calc("){var P=e.style.perspective;e.style.perspective=u,u=rn(e,"perspective"),P?e.style.perspective=P:dr(e,"perspective")}f=parseFloat(u)}if(w||(S=e._gsap,S.renderTransform&&!n.parseTransform||gs(e,n.parseTransform),C=n.smoothOrigin!==!1&&S.smooth,w=this._pt=new Gt(this._pt,a,He,0,1,S.renderTransform,S,0,-1),w.dep=1),p==="scale")this._pt=new Gt(this._pt,S,"scaleY",S.scaleY,(y?oi(S.scaleY,y+f):f)-S.scaleY||0,ya),this._pt.u=0,o.push("scaleY",p),p+="X";else if(p==="transformOrigin"){A.push(Bt,0,a[Bt]),u=Pp(u),S.svg?xa(e,u,0,C,0,this):(v=parseFloat(u.split(" ")[2])||0,v!==S.zOrigin&&rr(this,S,"zOrigin",S.zOrigin,v),rr(this,a,p,mo(c),mo(u)));continue}else if(p==="svgOrigin"){xa(e,u,1,C,0,this);continue}else if(p in df){Lp(this,S,p,h,y?oi(h,y+u):u);continue}else if(p==="smoothOrigin"){rr(this,S,"smooth",S.smooth,u);continue}else if(p==="force3D"){S[p]=u;continue}else if(p==="transform"){Dp(this,u,e);continue}}else p in a||(p=bi(p)||p);if(x||(f||f===0)&&(h||h===0)&&!pp.test(u)&&p in a)m=(c+"").substr((h+"").length),f||(f=0),v=xt(u)||(p in sn.units?sn.units[p]:m),m!==v&&(h=hr(e,p,c,v)),this._pt=new Gt(this._pt,x?S:a,p,h,(y?oi(h,y+f):f)-h,!x&&(v==="px"||p==="zIndex")&&n.autoRound!==!1?yp:ya),this._pt.u=v||0,x&&E!==u?(this._pt.b=c,this._pt.e=E,this._pt.r=_p):m!==v&&v!=="%"&&(this._pt.b=c,this._pt.r=mp);else if(p in a)Mp.call(this,e,p,c,y?y+u:u);else if(p in e)this.add(e,p,c||e[p],y?y+u:u,r,s);else if(p!=="parseTransform"){Ja(p,u);continue}x||(p in a?A.push(p,0,a[p]):typeof e[p]=="function"?A.push(p,2,e[p]()):A.push(p,1,c||e[p])),o.push(p)}}k&&nf(this)},render:function(e,n){if(n.tween._time||!ul())for(var t=n._pt;t;)t.r(e,t.d),t=t._next;else n.styles.revert()},get:Bn,aliases:Rn,getSetter:function(e,n,t){var r=Rn[n];return r&&r.indexOf(",")<0&&(n=r),n in jn&&n!==Bt&&(e._gsap.x||Bn(e,"x"))?t&&Yl===t?n==="scale"?wp:xp:(Yl=t||{})&&(n==="scale"?Sp:kp):e.style&&!Qa(e.style[n])?bp:~n.indexOf("-")?vp:al(e,n)},core:{_removeProperty:dr,_getMatrix:dl}};Yt.utils.checkPrefix=bi;Yt.core.getStyleSaver=lf;(function(i,e,n,t){var r=$t(i+","+e+","+n,function(s){jn[s]=1});$t(e,function(s){sn.units[s]="deg",df[s]=1}),Rn[r[13]]=i+","+e,$t(t,function(s){var o=s.split(":");Rn[o[1]]=r[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");$t("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(i){sn.units[i]="px"});Yt.registerPlugin(gf);var St=Yt.registerPlugin(gf)||Yt;St.core.Tween;/*!
 * paths 3.15.0
 * https://gsap.com
 *
 * Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var zp=/[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,Ip=/[\+\-]?\d*\.?\d+e[\+\-]?\d+/ig,Np=Math.PI/180,ws=Math.sin,Ss=Math.cos,Qi=Math.abs,Ci=Math.sqrt,Fp=function(e){return typeof e=="number"},Zl=1e5,Zn=function(e){return Math.round(e*Zl)/Zl||0},Jl=function(e){return e.closed=Math.abs(e[0]-e[e.length-2])<.001&&Math.abs(e[1]-e[e.length-1])<.001};function $p(i,e,n,t,r,s,o){for(var a=i.length,l,c,u,f,h;--a>-1;)for(l=i[a],c=l.length,u=0;u<c;u+=2)f=l[u],h=l[u+1],l[u]=f*e+h*t+s,l[u+1]=f*n+h*r+o;return i._dirty=1,i}function Gp(i,e,n,t,r,s,o,a,l){if(!(i===a&&e===l)){n=Qi(n),t=Qi(t);var c=r%360*Np,u=Ss(c),f=ws(c),h=Math.PI,d=h*2,g=(i-a)/2,p=(e-l)/2,m=u*g+f*p,v=-f*g+u*p,y=m*m,x=v*v,w=y/(n*n)+x/(t*t);w>1&&(n=Ci(w)*n,t=Ci(w)*t);var S=n*n,C=t*t,k=(S*C-S*x-C*y)/(S*x+C*y);k<0&&(k=0);var A=(s===o?-1:1)*Ci(k),E=A*(n*v/t),P=A*-(t*m/n),$=(i+a)/2,_=(e+l)/2,z=$+(u*E-f*P),N=_+(f*E+u*P),B=(m-E)/n,I=(v-P)/t,F=(-m-E)/n,R=(-v-P)/t,L=B*B+I*I,b=(I<0?-1:1)*Math.acos(B/Ci(L)),H=(B*R-I*F<0?-1:1)*Math.acos((B*F+I*R)/Ci(L*(F*F+R*R)));isNaN(H)&&(H=h),!o&&H>0?H-=d:o&&H<0&&(H+=d),b%=d,H%=d;var U=Math.ceil(Qi(H)/(d/4)),D=[],Y=H/U,V=4/3*ws(Y/2)/(1+Ss(Y/2)),te=u*n,q=f*n,_e=f*-t,Se=u*t,me;for(me=0;me<U;me++)r=b+me*Y,m=Ss(r),v=ws(r),B=Ss(r+=Y),I=ws(r),D.push(m-V*v,v+V*m,B+V*I,I-V*B,B,I);for(me=0;me<D.length;me+=2)m=D[me],v=D[me+1],D[me]=m*te+v*_e+z,D[me+1]=m*q+v*Se+N;return D[me-2]=a,D[me-1]=l,D}}function Bp(i){var e=(i+"").replace(Ip,function(E){var P=+E;return P<1e-4&&P>-1e-4?0:P}).match(zp)||[],n=[],t=0,r=0,s=2/3,o=e.length,a=0,l="ERROR: malformed path: "+i,c,u,f,h,d,g,p,m,v,y,x,w,S,C,k,A=function(P,$,_,z){y=(_-P)/3,x=(z-$)/3,p.push(P+y,$+x,_-y,z-x,_,z)};if(!i||!isNaN(e[0])||isNaN(e[1]))return console.log(l),n;for(c=0;c<o;c++)if(S=d,isNaN(e[c])?(d=e[c].toUpperCase(),g=d!==e[c]):c--,f=+e[c+1],h=+e[c+2],g&&(f+=t,h+=r),c||(m=f,v=h),d==="M")p&&(p.length<8?n.length-=1:a+=p.length,Jl(p)),t=m=f,r=v=h,p=[f,h],n.push(p),c+=2,d="L";else if(d==="C")p||(p=[0,0]),g||(t=r=0),p.push(f,h,t+e[c+3]*1,r+e[c+4]*1,t+=e[c+5]*1,r+=e[c+6]*1),c+=6;else if(d==="S")y=t,x=r,(S==="C"||S==="S")&&(y+=t-p[p.length-4],x+=r-p[p.length-3]),g||(t=r=0),p.push(y,x,f,h,t+=e[c+3]*1,r+=e[c+4]*1),c+=4;else if(d==="Q")y=t+(f-t)*s,x=r+(h-r)*s,g||(t=r=0),t+=e[c+3]*1,r+=e[c+4]*1,p.push(y,x,t+(f-t)*s,r+(h-r)*s,t,r),c+=4;else if(d==="T")y=t-p[p.length-4],x=r-p[p.length-3],p.push(t+y,r+x,f+(t+y*1.5-f)*s,h+(r+x*1.5-h)*s,t=f,r=h),c+=2;else if(d==="H")A(t,r,t=f,r),c+=1;else if(d==="V")A(t,r,t,r=f+(g?r-t:0)),c+=1;else if(d==="L"||d==="Z")d==="Z"&&(f=m,h=v,p.closed=!0),(d==="L"||Qi(t-f)>.5||Qi(r-h)>.5)&&(A(t,r,f,h),d==="L"&&(c+=2)),t=f,r=h;else if(d==="A"){if(C=e[c+4],k=e[c+5],y=e[c+6],x=e[c+7],u=7,C.length>1&&(C.length<3?(x=y,y=k,u--):(x=k,y=C.substr(2),u-=2),k=C.charAt(1),C=C.charAt(0)),w=Gp(t,r,+e[c+1],+e[c+2],+e[c+3],+C,+k,(g?t:0)+y*1,(g?r:0)+x*1),c+=u,w)for(u=0;u<w.length;u++)p.push(w[u]);t=p[p.length-2],r=p[p.length-1]}else console.log(l);return c=p.length,c<6?(n.pop(),c=0):Jl(p),n.totalPoints=a+c,n}function Hp(i){Fp(i[0])&&(i=[i]);var e="",n=i.length,t,r,s,o;for(r=0;r<n;r++){for(o=i[r],e+="M"+Zn(o[0])+","+Zn(o[1])+" C",t=o.length,s=2;s<t;s++)e+=Zn(o[s++])+","+Zn(o[s++])+" "+Zn(o[s++])+","+Zn(o[s++])+" "+Zn(o[s++])+","+Zn(o[s])+" ";o.closed&&(e+="z")}return e}/*!
 * CustomEase 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var It,mf,_f=function(){return It||typeof window<"u"&&(It=window.gsap)&&It.registerPlugin&&It},ec=function(){It=_f(),It?(It.registerEase("_CE",wi.create),mf=1):console.warn("Please gsap.registerPlugin(CustomEase)")},Yp=1e20,ks=function(e){return~~(e*1e3+(e<0?-.5:.5))/1e3},Xp=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/gi,qp=/[cLlsSaAhHvVtTqQ]/g,Wp=function(e){var n=e.length,t=Yp,r;for(r=1;r<n;r+=6)+e[r]<t&&(t=+e[r]);return t},Vp=function(e,n,t){!t&&t!==0&&(t=Math.max(+e[e.length-1],+e[1]));var r=+e[0]*-1,s=-t,o=e.length,a=1/(+e[o-2]+r),l=-n||(Math.abs(+e[o-1]-+e[1])<.01*(+e[o-2]-+e[0])?Wp(e)+s:+e[o-1]+s),c;for(l?l=1/l:l=-a,c=0;c<o;c+=2)e[c]=(+e[c]+r)*a,e[c+1]=(+e[c+1]+s)*l},Up=function i(e,n,t,r,s,o,a,l,c,u,f){var h=(e+t)/2,d=(n+r)/2,g=(t+s)/2,p=(r+o)/2,m=(s+a)/2,v=(o+l)/2,y=(h+g)/2,x=(d+p)/2,w=(g+m)/2,S=(p+v)/2,C=(y+w)/2,k=(x+S)/2,A=a-e,E=l-n,P=Math.abs((t-a)*E-(r-l)*A),$=Math.abs((s-a)*E-(o-l)*A),_;return u||(u=[{x:e,y:n},{x:a,y:l}],f=1),u.splice(f||u.length-1,0,{x:C,y:k}),(P+$)*(P+$)>c*(A*A+E*E)&&(_=u.length,i(e,n,h,d,y,x,C,k,c,u,f),i(C,k,w,S,m,v,a,l,c,u,f+1+(u.length-_))),u},wi=function(){function i(n,t,r){mf||ec(),this.id=n,this.setData(t,r)}var e=i.prototype;return e.setData=function(t,r){r=r||{},t=t||"0,0,1,1";var s=t.match(Xp),o=1,a=[],l=[],c=r.precision||1,u=c<=1,f,h,d,g,p,m,v,y,x;if(this.data=t,(qp.test(t)||~t.indexOf("M")&&t.indexOf("C")<0)&&(s=Bp(t)[0]),f=s.length,f===4)s.unshift(0,0),s.push(1,1),f=8;else if((f-2)%6)throw"Invalid CustomEase";for((+s[0]!=0||+s[f-2]!=1)&&Vp(s,r.height,r.originY),this.segment=s,g=2;g<f;g+=6)h={x:+s[g-2],y:+s[g-1]},d={x:+s[g+4],y:+s[g+5]},a.push(h,d),Up(h.x,h.y,+s[g],+s[g+1],+s[g+2],+s[g+3],d.x,d.y,1/(c*2e5),a,a.length-1);for(f=a.length,g=0;g<f;g++)v=a[g],y=a[g-1]||v,(v.x>y.x||y.y!==v.y&&y.x===v.x||v===y)&&v.x<=1?(y.cx=v.x-y.x,y.cy=v.y-y.y,y.n=v,y.nx=v.x,u&&g>1&&Math.abs(y.cy/y.cx-a[g-2].cy/a[g-2].cx)>2&&(u=0),y.cx<o&&(y.cx?o=y.cx:(y.cx=.001,g===f-1&&(y.x-=.001,o=Math.min(o,.001),u=0)))):(a.splice(g--,1),f--);if(f=1/o+1|0,p=1/f,m=0,v=a[0],u){for(g=0;g<f;g++)x=g*p,v.nx<x&&(v=a[++m]),h=v.y+(x-v.x)/v.cx*v.cy,l[g]={x,cx:p,y:h,cy:0,nx:9},g&&(l[g-1].cy=h-l[g-1].y);m=a[a.length-1],l[f-1].cy=m.y-h,l[f-1].cx=m.x-l[l.length-1].x}else{for(g=0;g<f;g++)v.nx<g*p&&(v=a[++m]),l[g]=v;m<a.length-1&&(l[g-1]=a[a.length-2])}return this.ease=function(w){var S=l[w*f|0]||l[f-1];return S.nx<w&&(S=S.n),S.y+(w-S.x)/S.cx*S.cy},this.ease.custom=this,this.id&&It&&It.registerEase(this.id,this.ease),this},e.getSVGData=function(t){return i.getSVGData(this,t)},i.create=function(t,r,s){return new i(t,r,s).ease},i.register=function(t){It=t,ec()},i.get=function(t){return It.parseEase(t)},i.getSVGData=function(t,r){r=r||{};var s=r.width||100,o=r.height||100,a=r.x||0,l=(r.y||0)+o,c=It.utils.toArray(r.path)[0],u,f,h,d,g,p,m,v,y,x;if(r.invert&&(o=-o,l=0),typeof t=="string"&&(t=It.parseEase(t)),t.custom&&(t=t.custom),t instanceof i)u=Hp($p([t.segment.slice(0)],s,0,0,-o,a,l));else{for(u=[a,l],m=Math.max(5,(r.precision||1)*200),d=1/m,m+=2,v=5/m,y=ks(a+d*s),x=ks(l+t(d)*-o),f=(x-l)/(y-a),h=2;h<m;h++)g=ks(a+h*d*s),p=ks(l+t(h*d)*-o),(Math.abs((p-x)/(g-y)-f)>v||h===m-1)&&(u.push(y,x),f=(p-x)/(g-y)),y=g,x=p;u="M"+u.join(",")}return c&&c.setAttribute("d",u),u},i}();wi.version="3.15.0";wi.headless=!0;_f()&&It.registerPlugin(wi);St.registerPlugin(wi);wi.create("brHop","0.9, 0, 0.1, 1");const jp=4,Qp=.5,yf=.55,Ks=.055,Kp=`
.br-overlay { position: fixed; inset: 0; z-index: 90; pointer-events: none; visibility: hidden; }
.br-blocks { position: absolute; inset: 0; display: flex; }
.br-block {
  flex: 1 1 25%; height: 100%;
  background: linear-gradient(180deg, #101826 0%, #0d0d11 100%);
  border-right: 1px solid rgba(201, 162, 39, 0.18);
  transform: scaleX(0);
  transform-origin: left center;
  will-change: transform;
}
.br-block:last-child { border-right: none; }
.br-label {
  position: absolute; left: 50%; top: 50%;
  transform: translate(-50%, -50%);
  display: flex; overflow: hidden;
  font-family: var(--font-display, "Noto Serif SC", "STSong", serif);
  font-size: clamp(34px, 5.2vw, 64px);
  letter-spacing: 0.3em; text-indent: 0.3em;
  color: #c9a227;
  text-shadow: 0 0 22px rgba(201, 162, 39, 0.5);
  white-space: nowrap;
}
.br-char { display: inline-block; will-change: transform; }
`;let Hn=null,ir=[],qn=null,ci=!1;function bf(){if(Hn)return;const i=document.createElement("style");i.textContent=Kp,document.head.appendChild(i),Hn=document.createElement("div"),Hn.className="br-overlay";const e=document.createElement("div");e.className="br-blocks",ir=[];for(let n=0;n<jp;n++){const t=document.createElement("div");t.className="br-block",e.appendChild(t),ir.push(t)}qn=document.createElement("div"),qn.className="br-label",Hn.append(e,qn),document.body.appendChild(Hn)}function vf(i){if(qn){qn.innerHTML="";for(const e of i){const n=document.createElement("span");n.className="br-char",n.textContent=e===" "?" ":e,qn.appendChild(n)}St.set(qn.children,{y:"115%"})}}function xf(){return qn?Array.from(qn.children):[]}function Zp(i,e){if(bf(),ci)return Promise.resolve();ci=!0,vf(i);const n=xf();return Hn.style.visibility="visible",new Promise(t=>{St.timeline({onComplete:()=>{Hn.style.visibility="hidden",ci=!1,t()}}).set(ir,{transformOrigin:"left center"}).to(ir,{scaleX:1,duration:Qp,ease:"brHop",stagger:Ks},0).to(n,{y:"0%",duration:.45,ease:"brHop",stagger:.035},`-=${Ks*1.5}`).add(()=>e(),"+=0.12").to(n,{y:"-115%",duration:.32,ease:"power2.in",stagger:.02},"+=0.18").set(ir,{transformOrigin:"right center"}).to(ir,{scaleX:0,duration:yf,ease:"brHop",stagger:Ks},"-=0.05")})}function Jp(i){if(bf(),ci)return Promise.resolve();ci=!0,vf(i);const e=xf();return Hn.style.visibility="visible",St.set(ir,{scaleX:1,transformOrigin:"right center"}),new Promise(n=>{St.timeline({onComplete:()=>{Hn.style.visibility="hidden",ci=!1,n()}}).to(e,{y:"0%",duration:.5,ease:"brHop",stagger:.04},.1).to(e,{y:"-115%",duration:.32,ease:"power2.in",stagger:.02},"+=0.6").to(ir,{scaleX:0,duration:yf,ease:"brHop",stagger:Ks},"-=0.05")})}function e0(i){if(!i.dataset.brSplit){i.dataset.brSplit="1";const e=i.textContent??"";i.textContent="",i.style.overflow="hidden";for(const n of e){const t=document.createElement("span");t.className="br-char",t.style.display="inline-block",t.textContent=n===" "?" ":n,i.appendChild(t)}}St.fromTo(i.children,{y:"115%"},{y:"0%",duration:.55,ease:"brHop",stagger:.028,overwrite:"auto"})}const t0=.65,n0=new re(0,1,0),r0={ra:0,dec:80};function tc(i){return i=Pe.clamp(i,0,1),i*i*(3-2*i)}function er(i,e){const n=new re(...Ht(i,e,1)),t=new aa().lookAt(new re(0,0,0),n,n0);return new Vt().setFromRotationMatrix(t)}function nc(i){if(i.gaze!=="target")return null;const e=i.target??r0;return er(e.ra,e.dec)}class _o{constructor(e,n=t0){X(this,"keys");X(this,"hold");if(e.length<2)throw new Error("CameraRig 至少需要 2 个关键帧");this.hold=Pe.clamp(n,0,.95);for(const[t,r]of e.entries()){if(!(r.radius>0))throw new Error(`关键帧 ${t}：radius 必须为正`);if(!(r.fov>10&&r.fov<140))throw new Error(`关键帧 ${t}：fov 非法（${r.fov}）`);if(r.gaze!=="free"&&r.gaze!=="target")throw new Error(`关键帧 ${t}：gaze 必须为 "free" | "target"`);const s=r.enter??0;if(s<0||s>=1)throw new Error(`关键帧 ${t}：enter 必须在 [0,1)（${s}）`);if(r.hold!==void 0&&(r.hold<0||r.hold>1))throw new Error(`关键帧 ${t}：hold 必须在 [0,1]（${r.hold}）`);if(t>0&&s>0){const o=e[t-1].hold??this.hold;if(o<1)throw new Error(`关键帧 ${t}：enter > 0 要求上一章 hold = 1（当前 ${o}）`)}}this.keys=e}get count(){return this.keys.length}sample(e,n){const t=this.keys.length,r=Math.min(Math.max(Math.floor(e),0),t-1),s=Pe.clamp(n,0,1),o=this.keys[r],a=this.keys[Math.min(r+1,t-1)],l=o.enter??0;if(r>0&&l>0&&s<l)return _o.blend(this.keys[r-1],o,tc(s/l));const c=o.hold??this.hold,u=r<t-1&&c<1?tc((s-c)/(1-c)):0;return _o.blend(o,a,u)}sampleGlobal(e){const n=this.keys.length,t=Pe.clamp(e,0,n),r=Math.min(Math.floor(t),n-1);return this.sample(r,t-r)}static blend(e,n,t){var f;const r=new re(...e.dir??[0,1,0]).normalize(),s=new re(...n.dir??[0,1,0]).normalize(),o=r.lerp(s,t).normalize(),a=nc(e),l=nc(n),c=Pe.lerp(e.gaze==="target"?1:0,n.gaze==="target"?1:0,t);let u=null;return c>0&&(u=a&&l?a.clone().slerp(l,t):((f=a??l)==null?void 0:f.clone())??null),{radius:Pe.lerp(e.radius,n.radius,t),dir:o,fov:Pe.lerp(e.fov,n.fov,t),gazeBlend:c,gazeTargetQ:u,drift:Pe.lerp(e.drift??0,n.drift??0,t),orbit:Pe.lerp(e.orbit?1:0,n.orbit?1:0,t)}}}const Ts=.005,i0=[{radius:Ts,fov:78,gaze:"free",drift:.012},{radius:Ts,fov:78,gaze:"free",hold:1},{radius:Ts,fov:65,gaze:"target",target:{ra:270,dec:8},enter:.3},{radius:Ts,fov:45,gaze:"target",target:{ra:175,dec:81}},{radius:3,dir:[.52,.7,.49],fov:50,gaze:"free",orbit:!0},{radius:3,dir:[.52,.7,.49],fov:50,gaze:"free",orbit:!0},{radius:3,dir:[0,.55,.84],fov:50,gaze:"free",orbit:!0},{radius:5,dir:[.52,.7,.49],fov:45,gaze:"free"}],rc=.22,s0=`
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
  letter-spacing: ${rc}em;
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
    letter-spacing: ${rc}em;
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
`;let ic=!1;function o0(){if(ic||typeof document>"u")return;const i=document.createElement("style");i.dataset.ch1="",i.textContent=s0,document.head.appendChild(i),ic=!0}function Ei(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function a0(i){return i<0?0:i>1?1:i}function Cs(i,e,n){const t=a0((i-e)/(n-e));return t*t*(3-2*t)}function l0(i){o0();const e=i.root.querySelector(".pin"),{copy:n}=i,t=document.createElement("div");t.className="ch1-stage",t.innerHTML=`
    <p class="ch1-eyebrow">${Ei(n.eyebrow)}</p>
    <h1 class="ch1-title">${Ei(n.title)}</h1>
    <p class="ch1-hook">${Ei(n.hook)}</p>
    <div class="ch1-body">${n.body.map(f=>`<p>${Ei(f)}</p>`).join("")}</div>
    ${n.seal?`<div class="ch1-seal">${Ei(n.seal)}</div>`:""}
  `,e.appendChild(t);const r=document.createElement("div");r.className="ch1-cue",r.textContent="向下滚动 · 步入夜空",e.appendChild(r);const s=t.querySelector(".ch1-hook"),o=t.querySelector(".ch1-body"),a=t.querySelector(".ch1-seal");let l=-1;const c=new Map;function u(f,h,d=18){const g=c.get(f);g!==void 0&&Math.abs(g-h)<1e-4||(c.set(f,h),f.style.opacity=h.toFixed(3),f.style.transform=`translateY(${((1-h)*d).toFixed(2)}px)`)}return{enter(){i.sky.setLabelsEnabled(!1)},update(f){if(u(s,Cs(f,.15,.45)),u(o,Cs(f,.3,.6)),a){const d=Cs(f,.45,.75),g=c.get(a);(g===void 0||Math.abs(g-d)>=1e-4)&&(c.set(a,d),a.style.opacity=d.toFixed(3),a.style.transform=`translateY(${((1-d)*10).toFixed(2)}px) scale(${(1.3-.3*d).toFixed(3)})`)}const h=.65*(1-Cs(f,0,.35));(Math.abs(h-l)>=1e-4||l<0)&&(l=h,r.style.opacity=h.toFixed(3))},exit(){i.sky.setLabelsEnabled(!0)}}}const c0=Object.freeze(Object.defineProperty({__proto__:null,createChapter:l0},Symbol.toStringTag,{value:"Module"})),u0=100,f0=.08,d0=u0*f0,wa=1.6,h0=.9,p0=26,g0=1.6,m0=.6,Cr=14,_0=2.6,Xo=.5,y0=.1,b0=.9,qo=3.2,v0=.35,sc=.22,oc=1.15,x0=.65,w0=1.7,Wo=[.45,.32,.58],Vo=[0,1.7,3.9],Uo=[1,.8,.9],Es=new re(14,8,-90),S0=new re(0,1,0),k0=new re(1,0,0);function vi(i){return Math.min(Math.max(i,0),1)}function T0(i){return Math.min(p0,Math.max(0,i)*g0)}function ac(i){return i<=d0}function C0(i,e){return wa+(i-wa)*Math.exp(-2.2*e)}function E0(i,e,n){const t=vi(i),r=vi(e);if(n<=0||t===r)return t;const s=n/m0;return r>t?Math.min(r,t+s):Math.max(r,t-s)}function M0(i,e){return(Number.isFinite(e)?vi(e):0)*Math.sin(2*Math.PI*i/_0)}function lc(i){return[Xo*Uo[0]*Math.sin(Wo[0]*i+Vo[0]),Xo*Uo[1]*Math.sin(Wo[1]*i+Vo[1]),Xo*Uo[2]*Math.sin(Wo[2]*i+Vo[2])]}function P0(i,e=Cr){if(e<=1)return 1;const n=vi(i/(e-1));return Math.pow(1-n,w0)}function A0(i,e=Cr){if(e<=1)return oc;const n=vi(i/(e-1));return oc*(1-x0*n)}function R0(){if(typeof document>"u")return null;const i=document.createElement("canvas");i.width=i.height=128;const e=i.getContext("2d"),n=e.createRadialGradient(64,64,0,64,64,64);return n.addColorStop(0,"rgba(255, 252, 240, 1)"),n.addColorStop(.25,"rgba(255, 233, 184, 0.95)"),n.addColorStop(.6,"rgba(255, 233, 184, 0.28)"),n.addColorStop(1,"rgba(255, 233, 184, 0)"),e.fillStyle=n,e.fillRect(0,0,128,128),new Eo(i)}const O0=`
attribute float aSize;
attribute float aFade;
varying float vFade;
void main() {
  vFade = aFade;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = aSize * (320.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
`,L0=`
uniform sampler2D uMap;
varying float vFade;
void main() {
  vec4 tex = texture2D(uMap, gl_PointCoord);
  gl_FragColor = vec4(tex.rgb, tex.a * vFade);
}
`,D0=0,cc=1,uc=2;function z0(){const i=new kn;i.name="firefly";const e=R0(),n=new Wa({map:e,transparent:!0,opacity:0,blending:Gr,depthTest:!1,depthWrite:!1}),t=new Va(n);t.scale.set(qo,qo,1);const r=lc(0),s=new re(Es.x+r[0],Es.y+r[1],Es.z+r[2]);t.position.copy(s),t.frustumCulled=!1,t.renderOrder=9,i.add(t);const o=new as;o.setAttribute("position",new ar(new Float32Array(Cr*3),3).setUsage(Do)),o.setAttribute("aSize",new ar(new Float32Array(Cr),1).setUsage(Do)),o.setAttribute("aFade",new ar(new Float32Array(Cr),1).setUsage(Do));const a=o.getAttribute("position"),l=o.getAttribute("aSize"),c=o.getAttribute("aFade"),u=new lu({uniforms:{uMap:{value:e}},vertexShader:O0,fragmentShader:L0,transparent:!0,blending:Gr,depthTest:!1,depthWrite:!1}),f=new Ua(o,u);f.frustumCulled=!1,f.renderOrder=8,i.add(f);const h=Es.clone(),d=s.clone();let g=null,p=D0;const m=new re(1,0,0),v=new re(0,1,0);let y=wa,x=0,w=0,S=0,C=0,k=0;const A=[];let E=!1;function P(I,F){xr.copy(h).sub(I),(F<.001||xr.lengthSq()<1e-12)&&xr.set(1,0,0),m.copy(xr).normalize(),y=Math.max(F,.001),I.lengthSq()<1e-8?jo.set(0,1,0):jo.copy(I).normalize(),v.crossVectors(m,jo),v.lengthSq()<1e-8&&v.crossVectors(m,Math.abs(m.y)<.99?S0:k0),v.normalize(),x=0,p=uc}function $(I){if(!Number.isFinite(I.x)||!Number.isFinite(I.y)||!Number.isFinite(I.z))return;g===null&&(g=new re),g.set(I.x,I.y,I.z);const F=h.distanceTo(g);ac(F)?P(g,F):p=cc}function _(I){k=Number.isFinite(I)?vi(I):0}function z(I){C=I?1:0}function N(I){if(E)return;const F=Number.isFinite(I)?Math.min(Math.max(I,0),y0):0;if(w+=F,S=E0(S,C,F),i.visible=S>.001,g!==null&&p===cc){xr.copy(g).sub(h);const D=xr.length();ac(D)?P(g,D):h.addScaledVector(xr.divideScalar(D),T0(D)*F)}g!==null&&p===uc&&(y=C0(y,F),x+=h0*F,h.copy(g).addScaledVector(m,Math.cos(x)*y).addScaledVector(v,Math.sin(x)*y));const R=lc(w);d.set(h.x+R[0],h.y+R[1],h.z+R[2]);const L=M0(w,k);n.opacity=b0*(1+v0*L)*S;const b=qo*(1+sc*L);t.scale.set(b,b,1),t.position.copy(d);const H=A.length<Cr?new re:A.pop();H.copy(d),A.unshift(H);const U=A.length;for(let D=0;D<Cr;D++){const Y=A[Math.min(D,U-1)];a.setXYZ(D,Y.x,Y.y,Y.z),c.setX(D,P0(D)*S),l.setX(D,A0(D)*(1+sc*L))}a.needsUpdate=!0,c.needsUpdate=!0,l.needsUpdate=!0}function B(){E||(E=!0,i.removeFromParent(),n.dispose(),e==null||e.dispose(),o.dispose(),u.dispose())}return i.visible=!1,{group:i,flyTo:$,pulse:_,setVisible:z,update:N,dispose:B}}const xr=new re,jo=new re,hl=.35,wf=.8,Mr=.05,ui=.3,Zs=5,Sf=.08,pl=["北斗","北极","天狼"],kf=4,Js=.8,I0=10,Tf=20,Sa="ch2-awakened",Gi=0,Cn=1,ka=2;function Ta(i){return Math.min(Math.max(i,0),1)}function Cf(i){return i<hl?Gi:i<wf?Cn:ka}function Bi(i){for(const e of pl)if(!i.has(e))return e;return null}function Ca(i,e,n){return!i||n.has(i)?!1:e===null||i===e}const Ea=[{key:"ziwei",name:"紫微"},{key:"taiwei",name:"太微"},{key:"tianshi",name:"天市"},{key:"qinglong",name:"青龙"},{key:"xuanwu",name:"玄武"},{key:"baihu",name:"白虎"},{key:"zhuque",name:"朱雀"}];function Ef(i){return i.includes("紫微")?"ziwei":i.includes("太微")?"taiwei":i.includes("天市")?"tianshi":i.includes("苍龙")||i.includes("青龙")?"qinglong":i.includes("玄武")?"xuanwu":i.includes("白虎")?"baihu":i.includes("朱雀")?"zhuque":null}const Mf=[.25,.5,.75,1];function eo(i,e){if(e<=0||i<=0)return 0;const n=i/e;let t=0;for(const r of Mf)n+1e-9>=r&&(t+=1);return t}function Pf(i){let e=0,n=0,t=0;for(const s of i){const[o,a,l]=Ht(s.ra,s.dec);e+=o,n+=a,t+=l}const r=Math.hypot(e,n,t);return r<1e-6?null:{ra:Math.atan2(t,e)*180/Math.PI,dec:Math.asin(n/r)*180/Math.PI}}function yo(i,e){const[n,t,r]=Ht(i.ra,i.dec),[s,o,a]=Ht(e.ra,e.dec),l=Math.min(1,Math.max(-1,n*s+t*o+r*a));return Math.acos(l)*180/Math.PI}function Ma(i,e,n){let t=null,r=1/0;for(const s of i){if(e.has(s.name))continue;const o=yo(s,n);o<r&&(r=o,t=s.name)}return t}function Af(i){const e=Math.min(Math.max((5.5-i)*4,0),28);return 220*Math.pow(2,e/12)}function Rf(i,e=2){return i.split("，").slice(0,Math.max(1,e)).join("，")}function Of(i){if(!i)return[];try{const e=JSON.parse(i);return Array.isArray(e)?e.filter(n=>typeof n=="string"&&n.length>0):[]}catch{return[]}}function Pa(i){const e=(ui-Mr)/Zs,n=[];for(let s=0;s<Zs;s++)n.push(Ta((i-(Mr+s*e))/e));const t=i<Mr?-1:Math.min(Math.floor((i-Mr)/e),Zs-1),r=Ta((i-ui)/(hl-ui));return{active:t,lines:n,finale:r}}const Qo=100,Ms=.78,N0=1.6,F0=.12,$0=[3e4,2e4,12e3,1e4],G0=1400,fc=[{text:"北斗之宿七星明",label:"北斗",groups:["北斗"]},{text:"北极五星在其中",label:"北极",groups:["北极"]},{text:"三星中央色最深",label:"心宿",groups:["心宿"]},{text:"牛上直建三河鼓，鼓上三星号织女",label:"河鼓 · 织女",groups:["河鼓","织女"]},{text:"邱下一狼光蓬茸",label:"天狼",groups:["天狼"]}],B0=[{ra:186,dec:56.5,ring:26},{ra:218.6,dec:76.8,ring:10},{ra:247.2,dec:-26.8,ring:8},{ra:297.7,dec:8.6,ring:8},{ra:101.3,dec:-16.7,ring:6}],H0=(()=>{const[i,e,n]=Ht(297.7,8.6),[t,r,s]=Ht(280.5,38.7),o=i+t,a=e+r,l=n+s,c=Math.hypot(o,a,l),u=Math.atan2(l,o)*180/Math.PI,f=Math.asin(a/c)*180/Math.PI;return[er(186,56.5),er(218.6,76.8),er(247.2,-26.8),er(u,f),er(101.3,-16.7)]})(),Y0=["一","二","三"],X0=`
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
`;let dc=!1;function q0(){if(dc||typeof document>"u")return;const i=document.createElement("style");i.dataset.ch2="",i.textContent=X0,document.head.appendChild(i),dc=!0}function wn(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}let Zt=null,Ki=null;function W0(){if(typeof window>"u")return;const i=window.AudioContext??window.webkitAudioContext;i&&(Zt||(Zt=new i,Ki=Zt.createGain(),Ki.gain.value=.12,Ki.connect(Zt.destination)),Zt.state==="suspended"&&Zt.resume())}function hc(i,e,n){if(W0(),!Zt||!Ki)return;const t=Zt.sampleRate,r=Math.max(2,Math.round(t/i)),s=Math.floor(t*e),o=Zt.createBuffer(1,s,t),a=o.getChannelData(0),l=new Float32Array(r);for(let f=0;f<r;f++)l[f]=Math.random()*2-1;let c=0;for(let f=0;f<s;f++){const h=l[c],d=l[(c+1)%r];l[c]=.996*.5*(h+d),a[f]=h*n,c=(c+1)%r}const u=Zt.createBufferSource();u.buffer=o,u.connect(Ki),u.start()}function V0(i){q0();const e=i.root.querySelector(".pin"),{copy:n}=i;function t(T,O){const K=document.createElement(T);return K.className=O,e.appendChild(K),K}const r=t("div","ch2-card ch2-title");r.innerHTML=`
    <p class="eyebrow">${wn(n.eyebrow)}</p>
    <div class="ch2-head">
      <h2>${wn(n.title)}</h2>
      ${n.seal?`<div class="seal">${wn(n.seal)}</div>`:""}
    </div>
    <p class="ch2-hook">${wn(n.hook)}</p>
    <p class="ch2-narr">${wn(n.body[0]??"")}</p>
  `;const s=t("div","ch2-lines"),o=fc.map(T=>{const O=document.createElement("div");return O.className="ch2-line",O.innerHTML=`<span class="ch2-line-text">${wn(T.text)}</span><span class="ch2-line-name">${wn(T.label)}</span>`,s.appendChild(O),O}),a=t("div","ch2-card ch2-finale");a.innerHTML=`<p class="ch2-finale-text">${wn(n.body[1]??"")}</p>`;const l=t("div","ch2-caption"),c=t("div","ch2-cross"),u=document.createElement("i");c.appendChild(u),c.appendChild(document.createElement("b"));const f=t("div","ch2-floats"),h=t("div","ch2-guidedone");h.textContent="星路已明，自去吧";const d=t("div","ch2-complete");d.textContent="三千年前的那首歌，你也唱完了";const g=t("div","ch2-scroll");g.innerHTML=`
    <div class="ch2-scroll-head"><span>唤星</span><b class="ch2-scroll-total">0 / 309</b></div>
    <div class="ch2-scroll-body"></div>
    <div class="ch2-scroll-foot">
      <span class="ch2-scroll-count">你已唤醒 0 颗</span>
      <button type="button" class="ch2-retreat">归隐</button>
    </div>
    <div class="ch2-badge"><i>歌成</i></div>
  `;const p=g.querySelector(".ch2-scroll-body"),m=g.querySelector(".ch2-scroll-total"),v=g.querySelector(".ch2-scroll-count"),y=g.querySelector(".ch2-retreat"),x=new Map;for(const T of Ea){const O=document.createElement("div");O.className="ch2-region",O.innerHTML=`<span>${T.name}</span><i class="ch2-region-bar"><b></b></i><em>0/0</em>`,p.appendChild(O),x.set(T.key,{bar:O.querySelector(".ch2-region-bar b"),num:O.querySelector("em")})}const w=t("div","ch2-card ch2-explore");w.innerHTML=`
    <h2>现在，把星空交给你</h2>
    <p>${wn(n.body[2]??"")}</p>
  `;const S=t("div","atlas-hint");S.textContent="拖拽环视 · 点击或凝视沉睡的星";let C=null,k=[];const A=new Map;Promise.all([fetch(Ln("data/poem.json")).then(T=>T.ok?T.json():null),fetch(Ln("data/stars.json")).then(T=>T.ok?T.json():null),fetch(Ln("data/asterisms.json")).then(T=>T.ok?T.json():null)]).then(([T,O,K])=>{if(C=T,!O||!K)return;const pe=new Map(O.stars.map(xe=>[xe.hip,xe])),ke=[];for(const xe of K.asterisms){const dt=xe.stars.map(yr=>pe.get(yr)).filter(yr=>yr!==void 0),Tn=Pf(dt);if(!Tn)continue;const[yd,bd,vd]=Ht(Tn.ra,Tn.dec,Qo);let Lo=3,vs=null;for(const yr of dt)Lo=Math.max(Lo,yo(Tn,yr)),(vs===null||yr.mag<vs)&&(vs=yr.mag);const xd=Math.max(6,Qo*Math.tan(Lo*Math.PI/180)*1.35);ke.push({name:xe.name,region:T!=null&&T[xe.name]?Ef(T[xe.name].from):null,ra:Tn.ra,dec:Tn.dec,x:yd,y:bd,z:vd,ring:xd,mag:vs})}k=ke,A.clear();for(const xe of ke)A.set(xe.name,xe);ut(),E===Cn&&_t()}).catch(()=>{});let E=-1,P=0;const $=new Set(Xt());let _=$.size>0&&Bi($)===null,z=0,N=0,B=null,I=0;const F=new Vt;let R=!1,L=0,b=null,H=!1,U=[],D=null,Y=null,V=null,te=null,q=null,_e=0,Se=0;const me=new Set;let Ie=0,Ee=!1;const j=new Vt;let ie=null,Ye="",nt=8,M=!1,Ae=null,lt=!1,gt=!1,ye=!1,de=!1,Ne=!1,ct=!1,Fe=!1,bn=-2,Re=!1;function Xt(){try{return Of(window.localStorage.getItem(Sa))}catch{return[]}}function Tt(){try{window.localStorage.setItem(Sa,JSON.stringify([...$]))}catch{}}function Ot(){return k.length>0?k.length:i.sky.groupCount}function Qn(T){const O=i.sky.groupCount;for(let K=0;K<O;K++)i.sky.setGroupProgress(K,T)}function Le(){const T=i.sky.groupCount;for(let O=0;O<T;O++)i.sky.setGroupProgress(O,Sf);for(const O of $)i.sky.setGroupProgress(O,1)}function In(T){lt!==T&&(lt=T,r.classList.toggle("on",T))}function Lt(T){gt!==T&&(gt=T,a.classList.toggle("on",T))}function vn(T){ye!==T&&(ye=T,w.classList.toggle("on",T))}function xn(T){de!==T&&(de=T,S.classList.toggle("on",T))}function qt(T){bn!==T&&(bn=T,o.forEach((O,K)=>O.classList.toggle("on",K===T)))}function Wt(T){const O=T!==null;O&&(l.textContent=T),!(Ne===O&&!O)&&(Ne=O,l.classList.toggle("on",O))}function se(T){ct!==T&&(ct=T,c.classList.toggle("on",T),T||ln(0))}function ln(T){const O=Ta(T);u.style.borderColor=O>0?`rgba(201, 162, 39, ${.55+.45*O})`:"",u.style.transform=O>0?`scale(${1+.3*O})`:"",u.style.boxShadow=O>0?`0 0 ${8+10*O}px rgba(201, 162, 39, ${.3+.5*O})`:""}function mt(T){Fe!==T&&(Fe=T,g.classList.toggle("on",T))}function Dt(T,O){T.classList.remove(O),T.offsetWidth,T.classList.add(O)}function ut(){const T={ziwei:0,taiwei:0,tianshi:0,qinglong:0,xuanwu:0,baihu:0,zhuque:0},O={...T};for(const pe of k)pe.region&&(O[pe.region]+=1,$.has(pe.name)&&(T[pe.region]+=1));for(const pe of Ea){const ke=x.get(pe.key);if(!ke)continue;const xe=O[pe.key],dt=T[pe.key];ke.bar.style.width=xe>0?`${(dt/xe*100).toFixed(1)}%`:"0%",ke.num.textContent=`${dt}/${xe}`}const K=Ot();m.textContent=K>0?`${$.size} / ${K}`:`${$.size} / —`,v.textContent=`你已唤醒 ${$.size} 颗`}function Nn(){if(Ae)return Ae;const T=document.createElement("canvas");T.width=T.height=128;const O=T.getContext("2d");return O.strokeStyle="rgba(240, 205, 110, 0.95)",O.lineWidth=6,O.shadowColor="rgba(201, 162, 39, 0.9)",O.shadowBlur=14,O.beginPath(),O.arc(64,64,48,0,Math.PI*2),O.stroke(),Ae=new Eo(T),Ae}function Fn(T,O,K,pe){const ke=`${T.toFixed(1)},${O.toFixed(1)},${K.toFixed(1)},${pe.toFixed(1)}`;if(ie&&Ye===ke)return;ft();const xe=new Wa({map:Nn(),transparent:!0,depthTest:!1,depthWrite:!1,opacity:.9}),dt=new Va(xe);dt.position.set(T,O,K),dt.scale.set(pe,pe,1),dt.renderOrder=998,i.sky.addSkyObject(dt),ie=dt,Ye=ke,nt=pe}function ft(){ie&&(i.sky.removeSkyObject(ie),ie.material.dispose(),ie=null,Ye="")}function $n(){te!==null&&(clearTimeout(te),te=null)}function ne(){for(const T of U)T.kill();U=[]}function Z(T,O){const K={v:0},pe=St.to(K,{v:1,duration:O,ease:"power1.out",onUpdate:()=>i.sky.setGroupProgress(T,K.v),onComplete:()=>{U=U.filter(ke=>ke!==pe)}});U.push(pe)}function ue(){return Ms+F0*Math.min(z,3)}const G={v:Ms};function ee(T,O){D==null||D.kill(),D=St.to(G,{v:T,duration:O,ease:"power2.out",onUpdate:()=>i.sky.setBloom({strength:G.v}),onComplete:()=>{D=null}})}function Q(){D==null||D.kill(),G.v=N0,i.sky.setBloom({strength:G.v}),ee(ue(),.8)}const J={v:1};function Ue(){Y==null||Y.kill(),J.v=.5,i.sky.setTimeScale(.5),Y=St.to(J,{v:1,delay:.4,duration:.6,ease:"power2.inOut",onUpdate:()=>i.sky.setTimeScale(J.v),onComplete:()=>{Y=null}})}function fe(){Y&&(Y.kill(),Y=null),J.v!==1&&(J.v=1,i.sky.setTimeScale(1))}function $e(T){const O=C==null?void 0:C[T.name],K=document.createElement("div");K.className="ch2-poemfloat";const pe=O?Rf(O.text,2):T.name,ke=O?`《步天歌》 · ${O.from}`:"";K.innerHTML=`<span class="ch2-poemfloat-text">${wn(pe)}</span>${ke?`<span class="ch2-poemfloat-from">${wn(ke)}</span>`:""}`;const xe=cu([T.x,T.y,T.z],i.sky.camera,{width:window.innerWidth,height:window.innerHeight}),dt=xe?xe.x+40:window.innerWidth*.62,Tn=xe?xe.y:window.innerHeight*.42;K.style.left=`${Math.min(Math.max(dt,110),window.innerWidth-110)}px`,K.style.top=`${Math.min(Math.max(Tn,140),window.innerHeight-140)}px`,f.appendChild(K),me.add(K),K.addEventListener("animationend",()=>{me.delete(K),K.remove()})}function rt(){me.forEach(T=>T.remove()),me.clear()}function De(T){const O=A.get(T);if(!O||E===Gi||(Fn(O.x,O.y,O.z,O.ring),!ie))return;V==null||V.kill(),M=!0;const K={o:0};ie.material.opacity=0,V=St.to(K,{o:.8,duration:.9,ease:"sine.inOut",yoyo:!0,repeat:1,onUpdate:()=>{ie&&(ie.material.opacity=K.o)},onComplete:()=>{V=null,M=!1,ft()}})}function Me(){b||(b=z0()),H||(i.sky.addSkyObject(b.group),H=!0)}function ge(){return E!==Cn?null:Bi($)}function _t(){if(E!==Cn)return;const T=Bi($);if(T){const O=pl.indexOf(T);Wt(`第${Y0[O]??O+1}站 · 「${T}」——跟着星使：点它，或凝视它`);const K=A.get(T);K&&(Me(),b.setVisible(!0),b.flyTo({x:K.x,y:K.y,z:K.z}));return}Wt(null),_||(_=!0,Oe())}function Oe(){Dt(h,"on"),b&&(b.pulse(1),$n(),te=setTimeout(()=>{te=null,b==null||b.setVisible(!1)},G0))}function yt(T){if(!Ca(T,ge(),$))return;const O=A.get(T);$.add(T),Tt(),i.sky.hideDetailCard(),Ue(),Z(T,1.1),O&&(i.sky.spawnBurst({x:O.x,y:O.y,z:O.z},{count:90}),$e(O),hc(Af(O.mag??4.5),.9,.85)),Q(),b&&E===Cn&&b.pulse(1),N=0,B=null,I=0,ut(),cn(),_t()}function cn(){const T=eo($.size,Ot());if(!(T<=z)){if(z=T,z>=4){Ze();return}ee(ue(),1.5),i.sky.spawnMeteors(z)}}function Ze(){ee(ue(),1.5),i.sky.spawnMeteors(8),Dt(d,"on"),g.classList.add("done"),hc(523.25,1.4,.8)}function Je(){$.clear(),Tt(),_=!1,z=0,$n(),h.classList.remove("on"),d.classList.remove("on"),g.classList.remove("done"),ne(),ee(Ms,.9),Le(),N=0,B=null,I=0,L=0,ut(),E===Cn&&_t()}y.addEventListener("click",Je);function it(T){if(I=0,!T||E!==Cn&&E!==ka)return;const O=T.info.name;Ca(O,ge(),$)&&yt(O)}const un=new re;function mr(){return i.sky.camera.getWorldDirection(un),{ra:Math.atan2(un.z,un.x)*180/Math.PI,dec:Math.asin(Math.min(1,Math.max(-1,un.y)))*180/Math.PI}}function je(){return E===Cn||E===ka}function qe(T){if(!je()||k.length===0||T<=0)return;const O=mr(),pe=ge()??Ma(k,$,O),ke=pe?A.get(pe):null,xe=ke?yo(O,ke):1/0;se(ke!==null&&xe<I0),ke&&xe<kf?(B!==ke.name&&(B=ke.name,N=0),N+=T,ln(N/Js),N>=Js&&(ln(0),yt(ke.name))):(N>0||B!==null)&&(N=0,B=null,ln(0))}function fn(T){if(!je()||ge()!==null||k.length===0){I=0;return}const O=i.sky.camera.quaternion;if(!R){R=!0,F.copy(O);return}if(F.angleTo(O)>4e-4){I=0,F.copy(O);return}if(I+=T,I>=Tf){I=0;const K=Ma(k,$,mr());K&&De(K)}}function Si(T){if(!je()||z<1)return;const O=$0[Math.min(z,4)-1];if(L<=0){L=T+O;return}T>=L&&(L=T+O,i.sky.spawnMeteors(1))}function ki(T){_e=requestAnimationFrame(ki);const O=Se>0?Math.min((T-Se)/1e3,.1):0;if(Se=T,b&&H&&(b.update(O),E===Cn&&ge()!==null)){const K=.35+.2*Math.sin(T*.003);b.pulse(Math.min(1,K+N/Js*.5))}if(qe(O),fn(O),Si(T),ie&&!M){const K=nt*(1+.13*Math.sin(T*.0024));ie.scale.set(K,K,1),ie.material.opacity=.7+.3*Math.sin(T*.0024+1)}}function _r(T){T===Gi?(i.sky.setPickingEnabled(!1),i.sky.setLabelsEnabled(!0),i.sky.setHoverTipEnabled(!0),Qn(0),Re=!1,Wt(null),se(!1),mt(!1),vn(!1),xn(!1),b==null||b.setVisible(!1),ft()):T===Cn?(i.sky.setPickingEnabled(!0),i.sky.setLabelsEnabled(!1),i.sky.setHoverTipEnabled(!0),In(!1),qt(-1),Lt(!1),vn(!1),xn(!1),ft(),Le(),z=eo($.size,Ot()),i.sky.setBloom({strength:ue()}),g.classList.toggle("done",z>=4),_=Bi($)===null,ut(),mt(!0),_t()):(i.sky.setPickingEnabled(!0),i.sky.setLabelsEnabled(!0),i.sky.setHoverTipEnabled(!0),In(!1),qt(-1),Lt(!1),Wt(null),b==null||b.setVisible(!1),ft(),Le(),z=eo($.size,Ot()),i.sky.setBloom({strength:ue()}),g.classList.toggle("done",z>=4),ut(),mt(!0),vn(!0),xn(!0))}function dn(T){const O=Pa(T);(O.finale>0||Re)&&(Qn(O.finale),Re=O.finale>0),O.lines.forEach((pe,ke)=>{const xe=fc[ke];if(!xe)return;const dt=Math.max(O.finale,ke===O.active?pe:pe*.15);for(const Tn of xe.groups)i.sky.setGroupProgress(Tn,dt)}),In(T<Mr);const K=T>=Mr&&T<ui?O.active:-1;if(qt(K),K>=0){const pe=B0[K];if(pe){const[ke,xe,dt]=Ht(pe.ra,pe.dec,Qo);Fn(ke,xe,dt,pe.ring)}}else ft();Lt(T>=ui)}function Kn(T){P=T;const O=Cf(T);O!==E&&(E=O,_r(O)),E===Gi&&dn(T)}function Wr(T){const O=E===Gi&&P>=Mr&&P<ui?Pa(P).active:-1,K=O>=0?.85:0;if(Ie+=(K-Ie)*(1-Math.exp(-3*T)),Ie<.01){Ee&&(Ee=!1,i.sky.setGazeBlend(0));return}const pe=H0[Math.max(O,0)];Ee?j.slerp(pe,1-Math.exp(-2.5*T)):(Ee=!0,j.copy(pe)),i.sky.setGazeBlend(Ie,j)}return{enter(){i.root.classList.add("inview"),q==null||q(),q=i.sky.onPick(it),_e&&cancelAnimationFrame(_e),Se=0,_e=requestAnimationFrame(ki),Kn(P)},update(T){Kn(T)},frame(T){Wr(T)},exit(){i.root.classList.remove("inview"),cancelAnimationFrame(_e),_e=0,Se=0,q==null||q(),q=null,$n(),ne(),V==null||V.kill(),V=null,M=!1,fe(),D&&(D.kill(),D=null),i.sky.setBloom({strength:Ms}),ft(),Ae==null||Ae.dispose(),Ae=null,b&&H&&(b.setVisible(!1),i.sky.removeSkyObject(b.group),H=!1),rt(),h.classList.remove("on"),d.classList.remove("on"),N=0,B=null,I=0,R=!1,L=0,Ie=0,Ee=!1,i.sky.setGazeBlend(0),i.sky.setLabelsEnabled(!0),i.sky.setHoverTipEnabled(!0),i.sky.setPickingEnabled(!1);for(const T of $)i.sky.setGroupProgress(T,1);In(!1),qt(-1),Lt(!1),Wt(null),se(!1),mt(!1),vn(!1),xn(!1),E=-1,Zt==null||Zt.suspend()}}}const U0=Object.freeze(Object.defineProperty({__proto__:null,CH2_GAZE_ANGLE_DEG:kf,CH2_GAZE_HOLD_S:Js,CH2_GUIDE_STATIONS:pl,CH2_IDLE_PULSE_S:Tf,CH2_REGIONS:Ea,CH2_SEG1_END:hl,CH2_SEG1_LINE_COUNT:Zs,CH2_SEG2_END:wf,CH2_SLEEP_DIM:Sf,CH2_STORAGE_KEY:Sa,CH2_UNLOCKS:Mf,ch2AngularDistanceDeg:yo,ch2CanAwaken:Ca,ch2Centroid:Pf,ch2GuideTarget:Bi,ch2NearestSleeping:Ma,ch2ParseAwakened:Of,ch2PluckFreq:Af,ch2PoemExcerpt:Rf,ch2RegionOf:Ef,ch2Seg1LineStates:Pa,ch2SegmentOf:Cf,ch2UnlockTier:eo,createChapter:V0},Symbol.toStringTag,{value:"Module"})),Lf=Math.PI/180,j0=34.7,Df=8,ii=355,Aa=["冬至","小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪"];function Q0(i){return-23.44*Math.cos(2*Math.PI*(i+10)/365.25)}function Ra(i){return 90-Math.abs(j0-Q0(i))}function pc(i){return Df/Math.tan(Ra(i)*Lf)}function K0(i){let e=0,n=999,t=0;for(let r=0;r<Aa.length;r++){const s=(ii+r*15.22)%365;let o=i-s;o>182.5?o-=365:o<-182.5&&(o+=365),Math.abs(o)<n&&(n=Math.abs(o),e=r,t=o)}return{name:Aa[e],index:e,day:(ii+e*15.22)%365,offset:Math.round(t)}}function Z0(i){const e=[31,28,31,30,31,30,31,31,30,31,30,31];let n=Math.min(Math.max(Math.round(i),1),365),t=0;for(;t<11&&n>e[t];)n-=e[t],t++;return{month:t+1,day:n}}const Ps=["零","一","二","三","四","五","六","七","八","九"];function Ko(i){if(i<10)return Ps[i];if(i<20)return"十"+(i%10?Ps[i%10]:"");const e=Math.floor(i/10);return Ps[e]+"十"+(i%10?Ps[i%10]:"")}function Ur(i){return i-Math.floor(i)}function J0(i,e,n,t,r,s){i.beginPath(),i.moveTo(e+s,n),i.arcTo(e+t,n,e+t,n+r,s),i.arcTo(e+t,n+r,e,n+r,s),i.arcTo(e,n+r,e,n,s),i.arcTo(e,n,e+t,n,s),i.closePath()}function eg(){const i=document.createElement("canvas");i.width=64,i.height=64;const e=i.getContext("2d");if(e){const n=e.createRadialGradient(32,32,2,32,32,32);n.addColorStop(0,"rgba(252, 225, 182, 0.9)"),n.addColorStop(.3,"rgba(252, 225, 182, 0.25)"),n.addColorStop(1,"rgba(252, 225, 182, 0)"),e.fillStyle=n,e.fillRect(0,0,64,64)}return i}const jr=8,wr=15,tg=`
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
`;let gc=!1;function ng(){if(gc||typeof document>"u")return;const i=document.createElement("style");i.dataset.gnomonWidget="",i.textContent=tg,document.head.appendChild(i),gc=!0}function rg(i={}){ng();const e=document.createElement("div");e.className="gw",e.setAttribute("role","group"),e.setAttribute("aria-label","圭表测影：拖动滑杆查看一年中正午日影变化");const n=document.createElement("canvas");n.className="gw-canvas",e.appendChild(n);const t=document.createElement("div");t.className="gw-readout",t.innerHTML=`
    <div class="gw-cell"><span class="gw-k">日期</span><span class="gw-v" data-r="date">——</span></div>
    <div class="gw-cell"><span class="gw-k">节气</span><span class="gw-v" data-r="term">——</span></div>
    <div class="gw-cell"><span class="gw-k">正午影长</span><span class="gw-v" data-r="shadow">——</span></div>
    <div class="gw-cell"><span class="gw-k">太阳高度</span><span class="gw-v" data-r="alt">——</span></div>`,e.appendChild(t);const r=t.querySelector('[data-r="date"]'),s=t.querySelector('[data-r="term"]'),o=t.querySelector('[data-r="shadow"]'),a=t.querySelector('[data-r="alt"]'),l=document.createElement("div");l.className="gw-slider-wrap";const c=document.createElement("input");c.className="gw-slider",c.type="range",c.min="1",c.max="365",c.step="1",c.value=String(ii),c.setAttribute("aria-label","一年中的第几天"),l.appendChild(c);const u=document.createElement("div");u.className="gw-marks";for(const _ of["冬至","春分","夏至","秋分"]){const z=Aa.indexOf(_),N=(ii+z*15.22)%365,B=(N-1)/364,I=`calc(7px + (100% - 14px) * ${B.toFixed(4)})`,F=document.createElement("i");F.className="gw-tick",F.style.left=I,u.appendChild(F);const R=document.createElement("button");R.type="button",R.className="gw-mark"+(B<.08?" gw-mark--start":B>.92?" gw-mark--end":""),R.style.left=I,R.textContent=_,R.title=`跳至${_}（第 ${Math.round(N)} 天）`,R.addEventListener("click",()=>C(Math.round(N))),u.appendChild(R)}l.appendChild(u),e.appendChild(l);const f=n.getContext("2d");if(!f){const _=document.createElement("p");_.className="gw-fallback",_.textContent="当前浏览器无法创建绘图上下文，圭表测影演示不可用。",n.replaceWith(_)}const h=eg(),d=Array.from({length:14},(_,z)=>({rx:Ur(Math.sin(z*12.9898)*43758.5453),ry:Ur(Math.sin(z*78.233)*12543.217),len:.1+.25*Ur(Math.sin(z*3.7)*9876.543),dark:z%2===0})),g=Array.from({length:5},(_,z)=>({dx:-.3+.6*Ur(Math.sin(z*5.13)*3210.7),ry:.12+.76*Ur(Math.sin(z*9.31)*7777.7),h:.08+.12*Ur(Math.sin(z*2.17)*5555.5)}));let p=ii,m=ii,v=!1,y=!0,x=0,w=0,S=0;function C(_){m=Math.min(Math.max(_,1),365),k()}function k(){x||(x=requestAnimationFrame(A))}function A(){var B;x=0;const _=p,z=m-p;p=Math.abs(z)<.04?m:p+z*.2;const N=p!==_;(N||y)&&(E(),P(),y=!1),N&&((B=i.onDayChange)==null||B.call(i,p)),p!==m&&(x=requestAnimationFrame(A))}function E(){const _=Math.min(Math.max(Math.round(p),1),365),z=Z0(_);r.textContent=`${z.month} 月 ${z.day} 日 · 第 ${_} 天`;const N=K0(_);s.textContent=N.offset===0?`正值【${N.name}】`:N.offset>0?`【${N.name}】后 ${N.offset} 天`:`距【${N.name}】 ${-N.offset} 天`;const B=pc(p);let I=Math.floor(B),F=Math.round((B-I)*10);F===10&&(I+=1,F=0),o.textContent=`${Ko(I)}尺${F>0?Ko(F)+"寸":"整"} · ${B.toFixed(2)} 尺`,a.textContent=`${Ra(p).toFixed(1)}°`,!v&&document.activeElement!==c&&(c.value=String(_))}function P(){if(!f||w<60||S<60)return;const _=f,z=w,N=S;_.clearRect(0,0,z,N);const B=_.createLinearGradient(0,0,0,N);B.addColorStop(0,"rgba(22, 38, 56, 0.5)"),B.addColorStop(.6,"rgba(13, 13, 17, 0.12)"),B.addColorStop(1,"rgba(13, 13, 17, 0.4)"),_.fillStyle=B,_.fillRect(0,0,z,N);const I=pc(p),F=Ra(p),R=Math.min(Math.max(F,6),82)*Lf,L=N-62,b=Math.min((z-150)/14.2,(L-92)/8),H=Df*b,U=13.6*b,D=(z-U-110)/2+100,Y=L-H,V=D+I*b,te=D-12,q=D+U,_e=_.createRadialGradient(D-60,L,0,D-60,L,220);_e.addColorStop(0,`rgba(252, 225, 182, ${(.05+.04*Math.sin(R)).toFixed(3)})`),_e.addColorStop(1,"rgba(252, 225, 182, 0)"),_.fillStyle=_e,_.fillRect(0,L-160,z,200),_.strokeStyle="rgba(175, 145, 95, 0.35)",_.lineWidth=1,_.beginPath(),_.moveTo(14,L+wr),_.lineTo(z-14,L+wr),_.stroke();const Se=_.createLinearGradient(0,L,0,L+jr);Se.addColorStop(0,"#3b4552"),Se.addColorStop(1,"#252d38"),_.fillStyle=Se,J0(_,te,L,q-te,jr,2.5),_.fill();const me=_.createLinearGradient(0,L+jr,0,L+wr);me.addColorStop(0,"#1a212b"),me.addColorStop(1,"#10151d"),_.fillStyle=me,_.fillRect(te,L+jr,q-te,wr-jr),_.strokeStyle="rgba(252, 225, 182, 0.14)",_.beginPath(),_.moveTo(te+2,L+.5),_.lineTo(q-2,L+.5),_.stroke();for(const de of d){const Ne=te+6+de.rx*(q-te-12),ct=L+1.5+de.ry*(wr-3);_.strokeStyle=de.dark?"rgba(0, 0, 0, 0.16)":"rgba(252, 225, 182, 0.05)",_.beginPath(),_.moveTo(Ne,ct),_.lineTo(Ne+de.len*40,ct),_.stroke()}const Ie=b>=26;_.lineWidth=1;for(let de=0;de<=136;de++){const Ne=de%10===0;if(!Ne&&!Ie&&de%5!==0)continue;const ct=D+de*b/10;if(ct>q-1.5)break;const Fe=Ne?6:de%5===0?4:2.5;_.strokeStyle=Ne?"rgba(8, 10, 14, 0.9)":"rgba(8, 10, 14, 0.6)",_.beginPath(),_.moveTo(ct,L+1),_.lineTo(ct,L+1+Fe),_.stroke()}_.font='9px "STSong", "SimSun", "Songti SC", serif',_.fillStyle="rgba(175, 145, 95, 0.9)",_.textAlign="center",_.textBaseline="top";for(let de=0;de<=13;de++){const Ne=D+de*b;if(Ne>q-2)break;_.fillText(Ko(de),Ne,L+wr+4)}const Ee=_.createLinearGradient(D,0,V,0);Ee.addColorStop(0,"rgba(3, 5, 9, 0.78)"),Ee.addColorStop(.75,"rgba(3, 5, 9, 0.55)"),Ee.addColorStop(1,"rgba(3, 5, 9, 0.15)"),_.fillStyle=Ee,_.fillRect(D,L+1,Math.max(V-D,1.5),jr-1),_.strokeStyle="#c9a227",_.lineWidth=1.5,_.beginPath(),_.moveTo(V,L-4),_.lineTo(V,L+wr),_.stroke(),_.save(),_.translate(V,L-7),_.rotate(Math.PI/4),_.fillStyle="#c9a227",_.fillRect(-2.4,-2.4,4.8,4.8),_.restore();const j=Math.max(6,b*.38),ie=_.createLinearGradient(D-j/2,0,D+j/2,0);ie.addColorStop(0,"#3f2e1a"),ie.addColorStop(.35,"#a87f3d"),ie.addColorStop(.5,"#dcba68"),ie.addColorStop(.65,"#a87f3d"),ie.addColorStop(1,"#372812"),_.fillStyle=ie,_.fillRect(D-j/2,Y,j,H);for(const de of g)_.fillStyle="rgba(112, 148, 126, 0.14)",_.fillRect(D+de.dx*j-.75,Y+de.ry*H,1.5,de.h*H);_.fillStyle="#8a6a35",_.beginPath(),_.moveTo(D-j*.85,Y),_.lineTo(D-j*.42,Y-6),_.lineTo(D+j*.42,Y-6),_.lineTo(D+j*.85,Y),_.closePath(),_.fill(),_.strokeStyle="rgba(252, 225, 182, 0.35)",_.lineWidth=1,_.beginPath(),_.moveTo(D-j*.42,Y-6),_.lineTo(D+j*.42,Y-6),_.stroke();const Ye=_.createLinearGradient(0,L-11,0,L);Ye.addColorStop(0,"#5a4423"),Ye.addColorStop(1,"#2c2010"),_.fillStyle=Ye,_.beginPath(),_.moveTo(D-j*.8,L-11),_.lineTo(D+j*.8,L-11),_.lineTo(D+j*1.7,L),_.lineTo(D-j*1.7,L),_.closePath(),_.fill(),_.font='10px "STSong", "SimSun", "Songti SC", serif',_.fillStyle="rgba(201, 162, 39, 0.8)",_.textAlign="center",_.textBaseline="top";const nt=D-j/2-11;"表高八尺".split("").forEach((de,Ne)=>{_.fillText(de,nt,Y+18+Ne*13)});const M=-Math.cos(R),Ae=-Math.sin(R);let lt=Math.min(170,(Y-28)/Math.sin(R),(D-30)/Math.cos(R));lt=Math.max(lt,26);const gt=D+M*lt,ye=Y+Ae*lt;_.drawImage(h,gt-30,ye-30,60,60),_.fillStyle="#fce1b6",_.beginPath(),_.arc(gt,ye,8.5,0,Math.PI*2),_.fill(),_.strokeStyle="rgba(201, 162, 39, 0.75)",_.lineWidth=1,_.beginPath(),_.arc(gt,ye,11.5,0,Math.PI*2),_.stroke(),_.strokeStyle="rgba(252, 225, 182, 0.4)",_.beginPath(),_.moveTo(gt-M*12,ye-Ae*12),_.lineTo(D,Y),_.stroke(),_.setLineDash([3,4]),_.strokeStyle="rgba(252, 225, 182, 0.22)",_.beginPath(),_.moveTo(D,Y),_.lineTo(V,L),_.stroke(),_.setLineDash([])}c.addEventListener("input",()=>{const _=Number(c.value);m=_,v||(p=_),k()}),c.addEventListener("pointerdown",()=>{v=!0}),window.addEventListener("pointerup",()=>{v=!1}),window.addEventListener("pointercancel",()=>{v=!1});function $(){const _=n.clientWidth,z=n.clientHeight;if(!(_===w&&z===S)){if(w=_,S=z,f&&_>0&&z>0){const N=Math.min(window.devicePixelRatio||1,2);n.width=Math.round(_*N),n.height=Math.round(z*N),f.setTransform(N,0,0,N,0,0)}y=!0,k()}}return typeof ResizeObserver<"u"?new ResizeObserver($).observe(n):window.addEventListener("resize",$),$(),{el:e,get day(){return p},setDayTarget:C}}const ig=`
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
`;let mc=!1;function sg(){if(mc||typeof document>"u")return;const i=document.createElement("style");i.dataset.gnomonLayout="",i.textContent=ig,document.head.appendChild(i),mc=!0}function Mi(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function _c(i){return i/365*Math.PI*2}function og(i){const e=i.root.querySelector(".pin"),{copy:n}=i,t=document.createElement("div");t.className="gnomon-layout";const r=document.createElement("div");r.className="chapter-panel",r.innerHTML=`
    <p class="eyebrow">${Mi(n.eyebrow)}</p>
    <div class="chapter-head">
      <h2>${Mi(n.title)}</h2>
      ${n.seal?`<div class="seal">${Mi(n.seal)}</div>`:""}
    </div>
    <p class="hook">${Mi(n.hook)}</p>
    ${n.body.map(a=>`<p>${Mi(a)}</p>`).join("")}
  `,t.appendChild(r);let s=!1;const o=rg({onDayChange:a=>{s&&i.sky.setSkyRotation(_c(a),0)}});return t.appendChild(o.el),e.appendChild(t),sg(),{enter(){s=!0,i.root.classList.add("inview"),i.sky.setLabelsEnabled(!1),i.sky.setSkyRotation(_c(o.day),0)},update(a){const l=Math.min(Math.max(a,0),1);o.setDayTarget(1+l*364)},exit(){s=!1,i.root.classList.remove("inview"),i.sky.setLabelsEnabled(!0),i.sky.setSkyRotation(0,0)}}}const ag=Object.freeze(Object.defineProperty({__proto__:null,createChapter:og},Symbol.toStringTag,{value:"Module"})),lg={ch1:{eyebrow:"其壹 · 序 PROLOGUE",title:"步天歌",hook:"三千年前，中国人开始给星星命名。",body:["先民把群星分作星官，各有职司。到三国陈卓汇总三家星经时，这张名单已录下二百八十三官、一千四百六十余星。","《步天歌》是把整张星表写成的长诗，一句一宿，循诗可以认星。本站以它为题，把这份名录还原成一片可以走进去的夜空。","向下滚动，步入夜空。"],seal:"步"},ch2:{eyebrow:"其贰 · 唤星之旅 THE AWAKENING",title:"唤星之旅",hook:"夜空睡着了。跟着流萤，把星星一颗颗唤回来。",body:["古人认星，靠一首歌。《步天歌》把全天星官谱成韵语，一句一宿，循诗可以认星。","三垣居中，四象环列——中国人给天空立的法。","余下的星，由你亲手唤醒。拖拽环视，点击或凝视任意一颗沉睡的星，听听它的那句诗。"],seal:"唤"},ch3:{eyebrow:"其叁 · 观象授时 THE GNOMON",title:"观象授时",hook:"一根八尺之表，一条量影之圭，就是一个王朝的天文台。",body:["正午测日影：影最长的那一天是冬至，最短的那一天是夏至。两至既定，四时均分，二十四节气由此排出。","河南登封至今立着这件仪器的放大版：元代郭守敬所建观星台，以高表测影，为《授时历》测得回归年长 365.2425 日——与三百年后的格里历相同。","所谓观象授时：历法的权威，来自对天空的测量。"],seal:"表"},ch4:{eyebrow:"其肆 · 天人之间 THE POLE STAR",title:"天人之间",hook:"全天最尊贵的星域，围着北极建了一座城。",body:["紫微垣，天上的宫城：左右两垣为墙，墙内住着皇族、帝座与百官。","天的秩序映照人的秩序——星官有名有职，如同朝廷。观星，也是观天下。"],seal:"极"},ch5:{eyebrow:"其伍 · 天球仪 THE CELESTIAL SPHERE",title:"天球仪",hook:"「浑天如鸡子，天体圆如弹丸，地如鸡中黄。」——张衡《浑天仪注》",body:["东汉张衡造浑天仪：铜球缀列星，绕轴而转，演示周天星象的起落。天，被做成一颗可以转动的球。","在这里，平面的星图重新团回天球。用你的手指转动它，像转动一件两千年前的仪器。"],seal:"球"},ch6:{eyebrow:"其陆 · 岁差 PRECESSION",title:"一万年",hook:"地轴是一支缓慢摇晃的陀螺，约两万六千年才转完一圈。",body:["东晋虞喜最先察觉：冬至点每年都在悄悄西移，约五十年退一度。他称之为「岁差」——天自为天，岁自为岁。","于是北极星也会换届：三千年前，周的天下以「帝星」（小熊座β）为北辰；今夜属于勾陈一；一万年后，织女星将接过这个位置。","拖动时间，看天极在星空中缓缓画出一个圆。"],seal:"岁"},ch7:{eyebrow:"其柒 · 东西对话 EAST MEETS WEST",title:"东西对话",hook:"同一片星空，两种秩序各自连线。",body:["中国的天狼是一颗独坐的星官，守在南方朱雀的井宿之野，主侵掠；在希腊人的图上，它是大犬座 α，猎户脚边的猎犬。","中国的织女是银河西岸的织女星官，七夕故事的主角；在西方，她是天琴座 α——俄耳甫斯的竖琴。","北斗七星在中国是帝车，运于中央、临制四方；同七颗星，在西方只是大熊的尾巴与后臀。"],seal:"会"},ch8:{eyebrow:"其捌 · 尾声 CREDITS",title:"尾声",hook:"缘起于一首旧诗，收束于一页致谢。",body:["本作品以《步天歌》为题——一卷把星官谱成韵语、便于记诵认星的旧诗。千年之后，诗里的星仍在原处，我们只是换了一种读法。","数据、开源技术与制作说明列于下方。本站为中国大学生计算机设计大赛参赛作品（信息可视化设计类）。"],seal:"跋"}},As=[{key:"北极",groups:["北极"],title:"北极五星 · 皇族",story:"太子、帝、庶子、后宫、天枢——天皇一家，以星列位。",labels:[{text:"太子",star:"北极一"},{text:"帝",star:"北极二"},{text:"庶子",star:"北极三"},{text:"后宫",star:"北极四"},{text:"天枢",star:"北极五"}]},{key:"勾陈",groups:["勾陈"],title:"勾陈 · 后宫车马",story:"帝之后妃的车驾，形如弯钩。其中最亮的勾陈一，就是今夜的北极星。",labels:[{text:"勾陈一",star:"勾陈一"}]},{key:"帝座",groups:["天皇大帝","五帝内座"],title:"天皇大帝 · 帝座",story:"天皇大帝居中而御，五帝内座环侍在旁——天上至尊的宝座。",labels:[{text:"天皇大帝",star:"天皇大帝"}]},{key:"百官",groups:["尚书","大理","天柱"],title:"尚书 · 大理 · 天柱",story:"秘书、法官、政令——一座悬浮的朝廷。",labels:[{text:"尚书",star:"尚书一"},{text:"大理",star:"大理一"},{text:"天柱",star:"天柱一"}]},{key:"拱北",groups:[],title:"回望 · 众星拱北",story:"「譬如北辰，居其所而众星共之。」——《论语·为政》"}],yc={heading:"数据与出处",groups:[{title:"数据来源",lines:["HYG Database v4.4 · CC BY-SA-4.0 · astronexus.com","许可协议：https://creativecommons.org/licenses/by-sa/4.0/","Stellarium 项目 · 中国星空文化数据","《步天歌》 · 丹元子 · 公有领域文本"]},{title:"开源技术",lines:["three.js","GSAP / ScrollTrigger","Vite","TypeScript","Noto Serif SC（思源宋体）· SIL OFL 1.1"]},{title:"制作说明",lines:["AI 辅助设计与编码","全部内容经人工校订"]}]};function Ro(i){return Math.min(Math.max(i,0),1)}function Oa(i){const e=Ro(i);return e*e*(3-2*e)}const Br=.12,zr=.92,Ir=5,ms=(zr-Br)/Ir,gl=Br+4*ms,zf=.03,If=.45;function to(i){const e=Ro(i);return e<Br?0:e>=zr?6:1+Math.min(Math.floor((e-Br)/ms),Ir-1)}function Nf(i){return Ro(i/Br)}function Ff(i,e){const n=Br+e*ms;return Ro((i-n)/(ms*If))}function La(i){const e=Oa((i-(gl-.02))/.02),n=1-Oa((i-zr)/.05);return e*n}function $f(i,e){const n=new Set;let t=0;return e.map(r=>{if(r){const o=i.find(a=>!n.has(a.hip)&&a.name===r);if(o)return n.add(o.hip),o}for(;t<i.length&&n.has(i[t].hip);)t++;const s=i[t];return s?(n.add(s.hip),t++,s):null})}const Gf=[{ra:175,dec:81,radius:.35,fov:50,gazeW:.85},{ra:218.6,dec:76.8,radius:.55,fov:42,gazeW:.85},{ra:269.6,dec:86.5,radius:.55,fov:42,gazeW:.85},{ra:41.8,dec:81,radius:.55,fov:42,gazeW:.85},{ra:261.7,dec:75.5,radius:.55,fov:42,gazeW:.85},{ra:0,dec:89,radius:.55,fov:55,gazeW:.85}],bo={radius:3,dir:[.52,.7,.49],fov:50},bc=100,cg=["紫微左垣","紫微右垣"],ug=["第一站","第二站","第三站","第四站","第五站"],fg="序 · 天上有座城",dg=28,vc=44,Rs=60,Bf=Gf.map(i=>({dir:new re(...Ht(i.ra,i.dec,1)),radius:i.radius,fov:i.fov,gazeQ:er(i.ra,i.dec),gazeW:i.gazeW})),hg=new re(...bo.dir).normalize(),Pi=Bf[Ir],pg=`
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
  width: ${dg}px; height: 1px;
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
`;let xc=!1;function gg(){if(xc||typeof document>"u")return;const i=document.createElement("style");i.dataset.ch4="",i.textContent=pg,document.head.appendChild(i),xc=!0}function Ai(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function mg(i){gg();const e=i.root.querySelector(".pin"),{copy:n}=i,t=document.createElement("div");t.className="ch4-card ch4-opening",t.innerHTML=`
    <p class="eyebrow">${Ai(n.eyebrow)}</p>
    <div class="chapter-head">
      <h2>${Ai(n.title)}</h2>
      ${n.seal?`<div class="seal">${Ai(n.seal)}</div>`:""}
    </div>
    <p class="ch4-opening-tag">${fg}</p>
    <p class="hook">${Ai(n.hook)}</p>
    ${n.body.map(R=>`<p class="ch4-opening-body">${Ai(R)}</p>`).join("")}
  `,e.appendChild(t);const r=document.createElement("div");r.className="ch4-card ch4-stop",r.innerHTML=`
    <p class="ch4-stop-tag"></p>
    <h3 class="ch4-stop-title"></h3>
    <p class="ch4-stop-story"></p>
  `,e.appendChild(r);const s=r.querySelector(".ch4-stop-tag"),o=r.querySelector(".ch4-stop-title"),a=r.querySelector(".ch4-stop-story"),l=document.createElement("div");l.className="ch4-layer";const c=[];As.forEach((R,L)=>{(R.labels??[]).forEach((b,H)=>{const U=document.createElement("div");U.className="ch4-tag";const D=document.createElement("i");D.className="ch4-tag-dot";const Y=-90+H*137.5,V=Y*Math.PI/180,te=document.createElement("i");te.className="ch4-tag-line",te.style.transform=`rotate(${Y}deg)`;const q=document.createElement("span");q.className="ch4-tag-name",q.textContent=b.text,q.style.transform=`translate(${Math.cos(V)*vc}px, ${Math.sin(V)*vc}px) translate(-50%, -50%)`,U.append(D,te,q),l.appendChild(U),c.push({el:U,stopIdx:L,labelIdx:H,shown:!1})})}),e.appendChild(l);let u=null;Promise.all([fetch(Ln("data/stars.json")).then(R=>R.ok?R.json():null),fetch(Ln("data/asterisms.json")).then(R=>R.ok?R.json():null)]).then(([R,L])=>{if(!R||!L)return;const b=new Map(R.stars.map(U=>[U.hip,U])),H=new Map(L.asterisms.map(U=>[U.name,U]));u=As.map(U=>{const D=U.groups.flatMap(V=>{var te;return(((te=H.get(V))==null?void 0:te.stars)??[]).map(q=>b.get(q)).filter(q=>q!==void 0)});return $f(D,(U.labels??[]).map(V=>V.star)).map(V=>{if(!V)return null;const[te,q,_e]=Ht(V.ra,V.dec,bc);return new re(te,q,_e)})})}).catch(()=>{});let f=!1,h=0,d=!1,g=.35,p=50;const m=new re(0,1,0),v=new Vt;let y=0,x=0,w=0,S=!1,C=-1;function k(R){S!==R&&(S=R,t.classList.toggle("on",R))}function A(R){if(C===R)return;if(C=R,R<0){r.classList.remove("on");return}const L=As[R];L&&(s.textContent=ug[R]??`第${R+1}站`,o.textContent=L.title,a.textContent=L.story,r.classList.add("on"),r.classList.remove("swap"),r.offsetWidth,r.classList.add("swap"))}function E(R,L){R.shown!==L&&(R.shown=L,R.el.classList.toggle("on",L))}function P(){for(const R of c)E(R,!1)}function $(R){h=R;const L=to(R),b=Nf(R);for(const H of cg)i.sky.setGroupProgress(H,b);As.forEach((H,U)=>{const D=Ff(R,U);for(const Y of H.groups)i.sky.setGroupProgress(Y,D)}),k(L===0),A(L>=1&&L<=Ir?L-1:L===6?Ir-1:-1)}const _=new re,z=new re;function N(R,L,b){const H=Math.cos(L),U=Math.sin(L);return b.set(R.x*H+R.z*U,R.y,-R.x*U+R.z*H)}function B(R){const L=h,b=to(L);let H,U,D;const Y=z;let V;if(b===6){const q=Oa((L-zr)/(1-zr));H=Pe.lerp(Pi.radius,bo.radius,q),U=Pe.lerp(Pi.fov,bo.fov,q),D=(1-q)*Pi.gazeW,Y.copy(Pi.dir).lerp(hg,q).normalize(),V=Pi.gazeQ}else{const q=Bf[b];H=q.radius,U=q.fov,D=q.gazeW,Y.copy(q.dir),V=q.gazeQ}if(!d){d=!0;const q=i.sky.camera;g=Math.max(q.position.length()/bc,.005),p=q.fov,m.copy(q.position).normalize(),m.lengthSq()<1e-8&&m.set(0,1,0),v.copy(q.quaternion),y=1}const te=1-Math.exp(-3*R);g+=(H-g)*te,p+=(U-p)*te,m.lerp(Y,te).normalize(),y+=(D-y)*te,v.slerp(V,1-Math.exp(-2.5*R)),i.sky.setRadius(g),i.sky.setPositionDir(m),i.sky.setFov(p),y<.005&&D===0?i.sky.setGazeBlend(0):i.sky.setGazeBlend(y,v)}function I(R){const L=h;L>=gl&&L<zr?x+=zf*R:La(L)===0&&(x=0);const b=x*La(L);Math.abs(b-w)>1e-6&&(w=b,i.sky.setSkyRotation(b,0))}function F(){var U;const R=to(h),L=R>=1&&R<=Ir?R-1:-1,b=window.innerWidth,H=window.innerHeight;for(const D of c){const Y=(U=u==null?void 0:u[D.stopIdx])==null?void 0:U[D.labelIdx];if(D.stopIdx!==L||!Y){E(D,!1);continue}N(Y,w,_);const V=cu([_.x,_.y,_.z],i.sky.camera,{width:b,height:H});if(!V||V.x<-Rs||V.x>b+Rs||V.y<-Rs||V.y>H+Rs){E(D,!1);continue}D.el.style.left=`${V.x}px`,D.el.style.top=`${V.y}px`,E(D,!0)}}return{enter(){i.root.classList.add("inview"),f=!0,d=!1,i.sky.setLabelsEnabled(!1),$(h)},update(R){$(R)},frame(R){f&&(B(R),I(R),F())},exit(){i.root.classList.remove("inview"),f=!1,d=!1,x=0,w=0,i.sky.setSkyRotation(0,0),i.sky.setGazeBlend(0),i.sky.setLabelsEnabled(!0),k(!1),A(-1),P()}}}const _g=Object.freeze(Object.defineProperty({__proto__:null,CH4_CAM_STOPS:Gf,CH4_GROW_FRAC:If,CH4_OPENING_END:Br,CH4_RELEASE:bo,CH4_ROT_SPEED:zf,CH4_ROT_START:gl,CH4_STOP_COUNT:Ir,CH4_STOP_SPAN:ms,CH4_TOUR_END:zr,ch4MatchLabels:$f,ch4RotationWeight:La,ch4SegmentOf:to,ch4StopGrowth:Ff,ch4WallsGrowth:Nf,createChapter:mg},Symbol.toStringTag,{value:"Module"})),Hf=1.2,yg=90,bg=7,vg=.7,wc=.55,xg=1.5;function wg(i){return Pe.clamp(1-i/Hf,0,1)}function Sg(i){return Math.exp(-.9*i)}const Yf=new re(0,1,0),Xf=new re(1,0,0);let Os;function qf(){if(Os!==void 0)return Os;if(typeof document>"u")return Os=null;const i=document.createElement("canvas");i.width=i.height=64;const e=i.getContext("2d"),n=e.createRadialGradient(32,32,0,32,32,32);return n.addColorStop(0,"rgba(255, 252, 244, 1)"),n.addColorStop(.35,"rgba(255, 240, 205, 0.85)"),n.addColorStop(1,"rgba(255, 240, 205, 0)"),e.fillStyle=n,e.fillRect(0,0,64,64),Os=new Eo(i)}function kg(i,e={}){const n=Math.max(1,Math.floor(e.count??yg)),t=e.speed??bg,r=e.rand??Math.random,s=new re(i.x,i.y,i.z);s.lengthSq()<1e-8&&s.set(0,1,0),s.normalize();const o=new re().crossVectors(s,Math.abs(s.y)<.99?Yf:Xf).normalize(),a=new re().crossVectors(s,o),l=new Float32Array(n*3),c=new Float32Array(n*3);for(let v=0;v<n;v++){l[v*3]=i.x,l[v*3+1]=i.y,l[v*3+2]=i.z;const y=t*(wc+(1-wc)*r()),x=t*vg*r(),w=r()*Math.PI*2,S=Math.cos(w)*x,C=Math.sin(w)*x;c[v*3]=s.x*y+o.x*S+a.x*C,c[v*3+1]=s.y*y+o.y*S+a.y*C,c[v*3+2]=s.z*y+o.z*S+a.z*C}const u=new as;u.setAttribute("position",new ar(l,3));const f=u.getAttribute("position"),h=new uu({size:xg,sizeAttenuation:!0,map:qf()??null,color:16771512,transparent:!0,opacity:1,depthWrite:!1,blending:Gr}),d=new Ua(u,h);d.name="burst";let g=0,p=!1;const m={object:d,update(v){if(p)return!1;if(g+=v,g>=Hf)return m.dispose(),!1;const y=Sg(v);for(let x=0;x<c.length;x++)c[x]*=y,l[x]+=c[x]*v;return f.needsUpdate=!0,h.opacity=wg(g),!0},dispose(){p||(p=!0,d.removeFromParent(),u.dispose(),h.dispose())}};return m}const Sc=1,Tg=1.5,kc=.6,Cg=1.15,Eg=.21,Qr=24,Mg=.35,Pg=1.8;function Ag(i){return Math.sin(Math.PI*Math.min(1,Math.max(0,i)*1.15))}function Tc(i,e,n,t){const r=Math.cos(n),s=Math.sin(n);return t.set(i.x*r+e.x*s,i.y*r+e.y*s,i.z*r+e.z*s)}function Cc(i,e){const n=i()*2-1,t=i()*Math.PI*2,r=Math.sqrt(Math.max(0,1-n*n));return e.set(r*Math.cos(t),n,r*Math.sin(t))}function Rg(i,e={}){const n=e.rand??Math.random,t=Cc(n,new re),r=Cc(n,new re),s=r.addScaledVector(t,-r.dot(t));s.lengthSq()<1e-6&&s.crossVectors(t,Math.abs(t.y)<.99?Yf:Xf),s.normalize();const o=kc+(Cg-kc)*n(),a=Sc+(Tg-Sc)*n(),l=Mg*n(),c=new Float32Array((Qr+1)*3),u=new Float32Array((Qr+1)*3);for(let A=0;A<=Qr;A++){const E=Math.pow(1-A/Qr,.75);u[A*3]=E,u[A*3+1]=E*.92,u[A*3+2]=E*.72}const f=new as;f.setAttribute("position",new ar(c,3)),f.setAttribute("color",new ar(u,3));const h=f.getAttribute("position"),d=new fu({vertexColors:!0,transparent:!0,opacity:0,depthWrite:!1,blending:Gr}),g=new kd(f,d),p=new as;p.setAttribute("position",new ar(new Float32Array(3),3));const m=p.getAttribute("position"),v=new uu({size:Pg,sizeAttenuation:!0,map:qf()??null,color:16774102,transparent:!0,opacity:0,depthWrite:!1,blending:Gr}),y=new Ua(p,v),x=new kn;x.name="meteor",x.add(g),x.add(y),x.visible=!1;let w=0,S=!1;const C=new re,k={object:x,update(A){if(S)return!1;w+=A;const E=(w-l)/a;if(E>=1)return k.dispose(),!1;if(E<0)return!0;x.visible=!0;const P=Ag(E),$=o*E;for(let _=0;_<=Qr;_++){const z=Math.max(0,$-Eg*(_/Qr));Tc(t,s,z,C).multiplyScalar(i),c[_*3]=C.x,c[_*3+1]=C.y,c[_*3+2]=C.z}return h.needsUpdate=!0,d.opacity=P*.9,Tc(t,s,$,C).multiplyScalar(i),m.setXYZ(0,C.x,C.y,C.z),m.needsUpdate=!0,v.opacity=P,!0},dispose(){S||(S=!0,x.removeFromParent(),f.dispose(),d.dispose(),p.dispose(),v.dispose())}};return k}const ve=100,Og=.97,Lg=24,Zo={strength:.78,radius:.55,threshold:.58},Ec=1.2*ve,Dg=5,Mc=.2*Math.PI/180,Pc=89*Math.PI/180,Ac=.8*ve,zg=1.2*ve,Ig=.4,Ng=.05,Fg=120,Rc=.35,Ri=new re(0,1,0),$g=new re(0,0,0);function Gg(i){return i=Pe.clamp(i,0,1),i*i*(3-2*i)}const Co=class Co{constructor(e){X(this,"canvas");X(this,"renderer");X(this,"scene");X(this,"camera");X(this,"pipeline");X(this,"quality");X(this,"card");X(this,"labelLayerEl");X(this,"hoverNdc",null);X(this,"hoverRing");X(this,"hoverTip");X(this,"sky",null);X(this,"labels",null);X(this,"labelsShown",!1);X(this,"skyRoot",new kn);X(this,"tmpSkyMat",new aa);X(this,"tmpSkyQ",new Vt);X(this,"tmpSkyQY",new Vt);X(this,"starPositions",null);X(this,"starList",[]);X(this,"nameByHip",new Map);X(this,"hipToAsterism",new Map);X(this,"poem",null);X(this,"pickListeners",new Set);X(this,"gazeYaw",-Math.PI/2);X(this,"gazePitch",80*Math.PI/180);X(this,"orbitQ",new Vt);X(this,"ctlRadius",1);X(this,"ctlDir",new re(0,1,0));X(this,"ctlFov",78);X(this,"ctlGazeBlend",0);X(this,"ctlGazeTargetQ",null);X(this,"ctlDrift",0);X(this,"driftAngle",0);X(this,"ctlOrbit",0);X(this,"pickingEnabled",!1);X(this,"labelsEnabled",!0);X(this,"hoverTipEnabled",!0);X(this,"blendK",0);X(this,"dragging",!1);X(this,"lastX",0);X(this,"lastY",0);X(this,"downX",0);X(this,"downY",0);X(this,"orbitVelX",0);X(this,"orbitVelY",0);X(this,"lastOrbitMoveT",0);X(this,"clock",new Td);X(this,"elapsed",0);X(this,"frameHook",null);X(this,"started",!1);X(this,"timeScale",1);X(this,"effects",[]);X(this,"gazeEuler",new Ni(0,0,0,"YXZ"));X(this,"gazeQ",new Vt);X(this,"insideQ",new Vt);X(this,"centerLookQ",new Vt);X(this,"centerLookMat",new aa);X(this,"driftQ",new Vt);X(this,"tmpPos",new re);X(this,"resize",()=>{const e=this.tierDpr();this.renderer.setPixelRatio(e),this.renderer.setSize(window.innerWidth,window.innerHeight),this.pipeline.setSize(window.innerWidth,window.innerHeight),this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.sky&&(this.sky.starMaterial.uniforms.uPixelRatio.value=e),this.labels&&this.labels.renderer.setSize(window.innerWidth,window.innerHeight)});X(this,"frame",()=>{var s;const e=Math.min(this.clock.getDelta(),.1),n=e*this.timeScale;this.quality.update(e),(s=this.frameHook)==null||s.call(this,n),this.updateCamera(n),this.updateHover(),this.updateEffects(n);const t=this.camera.position.length(),r=this.sky;if(r&&(this.elapsed+=n,r.setTime(this.elapsed),r.starMaterial.uniforms.uDistBoost.value=Id(t,ve),r.gridMaterial.opacity=.1+.16*Pe.clamp(t/ve-1,0,1),t>=ve&&!this.card.el.hidden&&this.card.hide()),this.labels){const o=this.labelsEnabled?Pe.clamp((Ec-t)/(Ec-ve),0,1):0,a=o>.01;a!==this.labelsShown&&(this.labelsShown=a,this.labels.setVisible(a)),a&&(this.labels.renderer.domElement.style.opacity=o.toFixed(3),this.labels.update(this.camera))}this.pipeline.render(),this.labels&&this.labelsShown&&this.labels.renderer.render(this.scene,this.camera)});this.canvas=e,this.renderer=new Cd({canvas:e,antialias:!0,alpha:!0}),this.renderer.setClearColor(0,0),this.scene=new Ed,this.scene.add(this.skyRoot),this.camera=new Md(78,1,.1,2e3),this.pipeline=Pd(this.renderer,this.scene,this.camera,Zo),this.quality=Ad(s=>{this.pipeline.setEnabled(s<2),this.pipeline.setBloom({strength:s===0?Zo.strength:Zo.strength*.5}),this.resize()}),this.labelLayerEl=document.createElement("div"),this.labelLayerEl.style.cssText="position:fixed;inset:0;pointer-events:none;z-index:5;",document.body.appendChild(this.labelLayerEl),this.card=Rd(document.body),this.onPick(s=>{s?this.card.show(s.info,s.x,s.y):this.card.hide()});const n=document.createElement("canvas");n.width=n.height=64;const t=n.getContext("2d");t.strokeStyle="rgba(240, 205, 110, 0.95)",t.lineWidth=5,t.shadowColor="rgba(201, 162, 39, 0.9)",t.shadowBlur=8,t.beginPath(),t.arc(32,32,24,0,Math.PI*2),t.stroke();const r=new Eo(n);this.hoverRing=new Va(new Wa({map:r,transparent:!0,depthTest:!1,depthWrite:!1})),this.hoverRing.renderOrder=999,this.hoverRing.visible=!1,this.skyRoot.add(this.hoverRing),this.hoverTip=document.createElement("div"),this.hoverTip.className="sky-tooltip",this.hoverTip.style.display="none",document.body.appendChild(this.hoverTip),this.bindPointer(),window.addEventListener("resize",this.resize),this.resize()}async init(){const[e,n,t,r]=await Promise.all([Od(ve),fetch(Ln("data/stars.json")).then(a=>{if(!a.ok)throw new Error(`stars=${a.status}`);return a.json()}),fetch(Ln("data/asterisms.json")).then(a=>{if(!a.ok)throw new Error(`asterisms=${a.status}`);return a.json()}),fetch(Ln("data/poem.json")).then(a=>{if(!a.ok)throw new Error(`poem=${a.status}`);return a.json()})]);this.sky=e,e.starMaterial.uniforms.uPixelRatio.value=this.tierDpr(),this.skyRoot.add(e.group),this.starList=n.stars;const s=new Float32Array(this.starList.length*3),o=new Map;this.starList.forEach((a,l)=>{const[c,u,f]=Ht(a.ra,a.dec,ve);s[l*3]=c,s[l*3+1]=u,s[l*3+2]=f,o.set(a.hip,new re(c,u,f)),this.nameByHip.set(a.hip,a.name)}),this.starPositions=s,this.hipToAsterism=Ld(t.asterisms),this.poem=r,this.labels=Dd(this.labelLayerEl,t.asterisms,o),this.labels.renderer.setSize(window.innerWidth,window.innerHeight),this.labels.setVisible(!1),this.skyRoot.add(this.labels.group)}start(e){this.frameHook=e??null,!this.started&&(this.started=!0,this.renderer.setAnimationLoop(this.frame))}setRadius(e){this.ctlRadius=Math.max(.5,e*ve)}setPositionDir(e){e instanceof re?this.ctlDir.copy(e):this.ctlDir.set(e[0],e[1],e[2]),this.ctlDir.lengthSq()<1e-8&&this.ctlDir.set(0,1,0),this.ctlDir.normalize()}setFov(e){this.ctlFov=Pe.clamp(e,10,140)}setGazeMode(e,n){if(e==="target"){const t=n??{ra:0,dec:80};this.ctlGazeTargetQ=er(t.ra,t.dec)}this.ctlGazeBlend=e==="target"?1:0}setGazeBlend(e,n){this.ctlGazeBlend=Pe.clamp(e,0,1),n!==void 0&&(this.ctlGazeTargetQ=n)}setDrift(e){this.ctlDrift=e}setOrbitEnabled(e){this.ctlOrbit=typeof e=="number"?Pe.clamp(e,0,1):e?1:0}applyCameraState(e){this.setRadius(e.radius),this.setPositionDir(e.dir),this.setFov(e.fov),this.setGazeBlend(e.gazeBlend,e.gazeTargetQ),this.setDrift(e.drift),this.setOrbitEnabled(e.orbit)}get cameraRadius(){return this.camera.position.length()}setGroupProgress(e,n){if(!this.sky)return;const t=typeof e=="number"?e:this.sky.lines.indexOf(e);this.sky.lines.setGroupProgress(t,n)}groupIndex(e){return this.sky?this.sky.lines.indexOf(e):-1}get groupCount(){return this.sky?this.sky.lines.groupCount:0}setLabelsEnabled(e){this.labelsEnabled=e}setHoverTipEnabled(e){this.hoverTipEnabled=e}setPickingEnabled(e){this.pickingEnabled=e,e||this.card.hide()}hideDetailCard(){this.card.hide()}setBloom(e){this.pipeline.setBloom(e)}setBloomEnabled(e){this.pipeline.setEnabled(e)}onPick(e){return this.pickListeners.add(e),()=>this.pickListeners.delete(e)}addSkyObject(e,n){(n==null?void 0:n.rotateWithSky)===!1?this.scene.add(e):this.skyRoot.add(e)}removeSkyObject(e){e.removeFromParent()}setSkyRotation(e=0,n=0){if(n!==0){const t=zd(n);this.tmpSkyMat.set(t[0],t[1],t[2],0,t[3],t[4],t[5],0,t[6],t[7],t[8],0,0,0,0,1),this.tmpSkyQ.setFromRotationMatrix(this.tmpSkyMat)}else this.tmpSkyQ.identity();this.tmpSkyQY.setFromAxisAngle(Ri,e),this.skyRoot.quaternion.copy(this.tmpSkyQ).multiply(this.tmpSkyQY)}setTimeScale(e){this.timeScale=Number.isFinite(e)?Pe.clamp(e,0,4):1}spawnBurst(e,n){this.addEffect(kg(e,n))}spawnMeteors(e){const n=Math.min(Lg,Math.max(0,Math.floor(e)));for(let t=0;t<n;t++)this.addEffect(Rg(ve*Og))}addEffect(e){this.skyRoot.add(e.object),this.effects.push(e)}updateEffects(e){for(let n=this.effects.length-1;n>=0;n--)this.effects[n].update(e)||this.effects.splice(n,1)}tierDpr(){const e=this.quality.tier,n=e===0?2:e===1?1.5:1;return Math.min(window.devicePixelRatio||1,n)}applyOrbitDelta(e,n){const t=this.camera.position.clone().normalize(),r=new Vt().setFromAxisAngle(Ri,-e),s=new re().crossVectors(Ri,t);s.lengthSq()<1e-8?s.set(1,0,0):s.normalize();const o=new Vt().setFromAxisAngle(s,n),a=r.clone().multiply(o).multiply(this.orbitQ),l=t.clone().applyQuaternion(r).applyQuaternion(o);Math.abs(l.y)<.985?this.orbitQ.copy(a):this.orbitQ.premultiply(r)}bindPointer(){const e=this.canvas;e.addEventListener("pointerdown",n=>{this.dragging=!0,this.lastX=this.downX=n.clientX,this.lastY=this.downY=n.clientY,this.orbitVelX=this.orbitVelY=0,this.lastOrbitMoveT=performance.now(),this.hoverNdc=null,e.setPointerCapture(n.pointerId)}),e.addEventListener("pointerup",n=>{this.dragging=!1,e.releasePointerCapture(n.pointerId),performance.now()-this.lastOrbitMoveT>Fg&&(this.orbitVelX=this.orbitVelY=0),Math.hypot(n.clientX-this.downX,n.clientY-this.downY)<Dg&&this.handleClick(n.clientX,n.clientY)}),e.addEventListener("pointercancel",()=>{this.dragging=!1,this.orbitVelX=this.orbitVelY=0}),e.addEventListener("pointerleave",()=>{this.hoverNdc=null}),e.addEventListener("pointermove",n=>{if(!this.dragging){this.hoverNdc={x:n.clientX/window.innerWidth*2-1,y:-(n.clientY/window.innerHeight)*2+1,cx:n.clientX,cy:n.clientY};return}const t=n.clientX-this.lastX,r=n.clientY-this.lastY;this.lastX=n.clientX,this.lastY=n.clientY;const s=(1-this.blendK)*(1-this.ctlGazeBlend);s>0&&(this.gazeYaw+=t*Mc*s,this.gazePitch+=r*Mc*s,this.gazePitch=Pe.clamp(this.gazePitch,-Pc,Pc));const o=this.blendK*this.ctlOrbit;if(o>0){const a=t*o*.005,l=r*o*.005;this.applyOrbitDelta(a,l);const c=performance.now(),u=Math.min((c-this.lastOrbitMoveT)/1e3,.1);this.lastOrbitMoveT=c,u>1e-4&&(this.orbitVelX+=(a/u-this.orbitVelX)*Rc,this.orbitVelY+=(l/u-this.orbitVelY)*Rc)}})}handleClick(e,n){if(!this.pickingEnabled||!this.sky||!this.starPositions)return;if(this.camera.position.length()>=ve){this.emitPick(null);return}const t=e/window.innerWidth*2-1,r=-(n/window.innerHeight)*2+1,s=kl(t,r,this.camera,this.starPositions,{width:window.innerWidth,height:window.innerHeight});if(!s){this.emitPick(null);return}const o=this.starList[s.index],a=this.hipToAsterism.get(o.hip);if(!a){this.emitPick(null);return}const l=this.lookupPoem(a.name);this.emitPick({info:{name:a.name,starCount:a.stars.length,stars:a.stars.map(c=>({name:this.nameByHip.get(c)??null,hip:c})),quote:l==null?void 0:l.text,quoteFrom:l==null?void 0:l.from},x:e,y:n})}lookupPoem(e){if(!this.poem)return;const n=this.poem[e];if(n)return n;const t=e.replace(/[(（][^)）]*[)）]\s*$/,"");return t!==e?this.poem[t]:void 0}emitPick(e){for(const n of this.pickListeners)n(e)}updateHover(){if(!(this.pickingEnabled&&!this.dragging&&this.hoverNdc!==null&&this.starPositions!==null&&this.camera.position.length()<ve)){this.hoverRing.visible&&(this.hoverRing.visible=!1),this.hoverTip.style.display!=="none"&&(this.hoverTip.style.display="none");return}const n=kl(this.hoverNdc.x,this.hoverNdc.y,this.camera,this.starPositions,{width:window.innerWidth,height:window.innerHeight},Co.HOVER_PICK_RADIUS_PX);if(!n){this.hoverRing.visible&&(this.hoverRing.visible=!1),this.hoverTip.style.display!=="none"&&(this.hoverTip.style.display="none");return}const t=this.starPositions;this.hoverRing.position.set(t[n.index*3],t[n.index*3+1],t[n.index*3+2]);const r=this.camera.position.distanceTo(this.hoverRing.position),s=Math.max(.5,r*.035);if(this.hoverRing.scale.set(s,s,1),this.hoverRing.visible=!0,!this.hoverTipEnabled){this.hoverTip.style.display!=="none"&&(this.hoverTip.style.display="none");return}const o=this.starList[n.index],a=this.hipToAsterism.get(o.hip),l=o.name??`HIP ${o.hip}`,c=a&&a.name!==l?`${l} · ${a.name}`:l;this.hoverTip.textContent!==c&&(this.hoverTip.textContent=c),this.hoverTip.style.left=`${this.hoverNdc.cx+16}px`,this.hoverTip.style.top=`${this.hoverNdc.cy+14}px`,this.hoverTip.style.display!=="block"&&(this.hoverTip.style.display="block")}updateCamera(e){if(!this.dragging&&(this.orbitVelX!==0||this.orbitVelY!==0)){this.applyOrbitDelta(this.orbitVelX*e,this.orbitVelY*e);const t=Math.pow(.5,e/Ig);this.orbitVelX*=t,this.orbitVelY*=t,Math.hypot(this.orbitVelX,this.orbitVelY)<Ng&&(this.orbitVelX=this.orbitVelY=0)}const n=this.tmpPos.copy(this.ctlDir).multiplyScalar(this.ctlRadius).applyQuaternion(this.orbitQ);this.camera.position.copy(n),this.blendK=Gg((this.ctlRadius-Ac)/(zg-Ac)),this.gazeEuler.set(this.gazePitch,this.gazeYaw,0),this.gazeQ.setFromEuler(this.gazeEuler),this.insideQ.copy(this.gazeQ),this.ctlGazeTargetQ&&this.ctlGazeBlend>0&&this.insideQ.slerp(this.ctlGazeTargetQ,this.ctlGazeBlend),this.ctlDrift!==0&&(this.driftAngle+=this.ctlDrift*e,this.driftQ.setFromAxisAngle(Ri,this.driftAngle),this.insideQ.premultiply(this.driftQ)),this.centerLookMat.lookAt(n,$g,Ri),this.centerLookQ.setFromRotationMatrix(this.centerLookMat),this.camera.quaternion.slerpQuaternions(this.insideQ,this.centerLookQ,this.blendK),this.camera.fov!==this.ctlFov&&(this.camera.fov=this.ctlFov,this.camera.updateProjectionMatrix())}};X(Co,"HOVER_PICK_RADIUS_PX",16);let Da=Co;const Bg=Pe.degToRad(23.44),Hg=11570494,Jo=36,Yg=.15,Xg=.55;function qg(i){return i=Pe.clamp(i,0,1),i*i*(3-2*i)}function Ls(i,e,n){const t=new Fd({color:Hg,metalness:.85,roughness:.35,transparent:!0,opacity:0}),r=new kn,s=i*ve;r.add(new lo(new du(s,e*ve,12,144),t));for(let o=0;o<Jo;o++){const a=o/Jo*Math.PI*2,l=o%(Jo/4)===0,c=new lo(l?n.major:n.minor,t);c.position.set(Math.cos(a)*s,Math.sin(a)*s,0),c.rotation.z=a,r.add(c)}return{local:r,material:t}}function Wg(){const i=new kn;i.name="armillary-sphere";const e={minor:new Tl(.012*ve,.0018*ve,.0035*ve),major:new Tl(.02*ve,.0024*ve,.0045*ve)},n=Ls(1.1,.006,e);n.local.rotation.x=-Math.PI/2;const t=Ls(1.07,.004,e);t.local.rotation.y=Math.PI/2;const r=Ls(1.05,.004,e);r.local.rotation.x=-Math.PI/2;const s=new kn;s.add(r.local);const o=Ls(1.03,.0035,e);o.local.rotation.x=-Math.PI/2;const a=new kn;a.add(o.local);const l=new kn;l.rotation.x=Bg,l.add(a);const c=[{built:n,inner:n.local,offsetDir:new re(0,-1,0),tumble:new Ni(.9,0,.4)},{built:t,inner:t.local,offsetDir:new re(1,.15,0),tumble:new Ni(0,.5,-1.1)},{built:r,inner:s,offsetDir:new re(0,1,.2),tumble:new Ni(-.7,.5,0)},{built:o,inner:l,offsetDir:new re(-.6,.6,.6),tumble:new Ni(.5,-.4,.8)}].map(({built:y,inner:x,offsetDir:w,tumble:S})=>{const C=new kn;return C.add(x),i.add(C),{assembly:C,material:y.material,offsetDir:w.normalize(),tumble:S,alpha:0}});i.add(new Nd(16771529,.9));const u=new Cl(16774109,2.4);u.position.set(1.6*ve,2.4*ve,1.2*ve),i.add(u);const f=new Cl(12570879,1.1);f.position.set(-1.8*ve,-.7*ve,-1.5*ve),i.add(f);let h=0;function d(y){const x=h*y.alpha;y.material.opacity=x,y.assembly.visible=x>.002}function g(y){c.forEach((x,w)=>{const S=qg((y-w*Yg)/Xg);x.alpha=S;const C=1-S;x.assembly.scale.setScalar(.35+.65*S),x.assembly.position.copy(x.offsetDir).multiplyScalar(C*.5*ve),x.assembly.rotation.set(x.tumble.x*C,x.tumble.y*C,x.tumble.z*C),d(x)})}function p(y){s.rotation.y=y,a.rotation.y=y*.6}function m(y){h=Pe.clamp(y,0,1);for(const x of c)d(x)}function v(){const y=new Set,x=new Set;i.traverse(w=>{const S=w;if(S.isMesh){y.add(S.geometry);const C=S.material;for(const k of Array.isArray(C)?C:[C])x.add(k)}}),y.forEach(w=>w.dispose()),x.forEach(w=>w.dispose())}return g(0),{group:i,setAssembly:g,setSpin:p,setFade:m,dispose:v}}const ea=.55,Vg=.9,Ug=1.2;function Oi(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function jg(i){const{copy:e}=i,n=document.createElement("div");n.className="chapter-panel chapter-panel--left",n.innerHTML=`
    <p class="eyebrow">${Oi(e.eyebrow)}</p>
    <div class="chapter-head">
      <h2>${Oi(e.title)}</h2>
      ${e.seal?`<div class="seal">${Oi(e.seal)}</div>`:""}
    </div>
    <p class="hook">${Oi(e.hook)}</p>
    ${e.body.map(a=>`<p>${Oi(a)}</p>`).join("")}
  `,i.root.querySelector(".pin").appendChild(n);let t=null,r=0;const s={v:0};function o(a){if(!t)return;t.setAssembly(Math.min(a/ea,1));const l=Math.max(0,(a-ea)/(1-ea));t.setSpin(l*Vg)}return{enter(){i.root.classList.add("inview"),t||(t=Wg(),i.sky.addSkyObject(t.group,{rotateWithSky:!1}),o(r)),St.to(s,{v:1,duration:Ug,ease:"power2.out",overwrite:!0,onUpdate:()=>t==null?void 0:t.setFade(s.v)})},update(a){r=a,o(a)},exit(){i.root.classList.remove("inview"),St.killTweensOf(s),s.v=0,t&&(i.sky.removeSkyObject(t.group),t.dispose(),t=null)}}}const Qg=Object.freeze(Object.defineProperty({__proto__:null,createChapter:jg},Symbol.toStringTag,{value:"Module"})),Pr=-1e4,vo=14e3,za=vo-Pr,Kg=[{name:"帝星",years:-1e3,note:"−1000"},{name:"勾陈一",years:0,note:"今"},{name:"织女一",years:13700,note:"+13700"}],Zg=[{years:Pr,text:"−10000",cls:"ch6-endlab--start"},{years:0,text:"0",cls:""},{years:vo,text:"+14000",cls:"ch6-endlab--end"}],Jg=2e3,em=1.5,tm=.07,nm=`
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
`;let Oc=!1;function rm(){if(Oc||typeof document>"u")return;const i=document.createElement("style");i.dataset.ch6="",i.textContent=nm,document.head.appendChild(i),Oc=!0}function Li(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Ds(i){return(i-Pr)/za*100}function im(i){const e=2e3+i;return e<=0?{era:"公元前",num:1-e}:{era:e<3e3?"公元":"公元后",num:e}}function sm(i){rm();const e=i.root.querySelector(".pin"),n=document.createElement("div");n.className="chapter-panel ch6-panel",n.innerHTML=`
    <p class="eyebrow">${Li(i.copy.eyebrow)}</p>
    <div class="chapter-head">
      <h2>${Li(i.copy.title)}</h2>
      ${i.copy.seal?`<div class="seal">${Li(i.copy.seal)}</div>`:""}
    </div>
    <p class="hook">${Li(i.copy.hook)}</p>
    ${i.copy.body.map(m=>`<p>${Li(m)}</p>`).join("")}
  `,e.appendChild(n);const t=document.createElement("div");t.className="ch6-time";const r=[];for(let m=Pr;m<=vo;m+=Jg){const v=m===Pr||m===0||m===vo;r.push(`<div class="ch6-tick${v?" ch6-tick--major":""}" style="left:${Ds(m).toFixed(3)}%"></div>`)}const s=Zg.map(m=>`<div class="ch6-endlab ${m.cls}" style="left:${Ds(m.years).toFixed(3)}%">${m.text}</div>`),o=Kg.map(m=>`
    <div class="ch6-mark" style="left:${Ds(m.years).toFixed(3)}%">
      <span class="ch6-mark-name">${m.name}</span>
      <span class="ch6-mark-yr">${m.note}</span>
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
  `,e.appendChild(t);const a=t.querySelector(".ch6-era"),l=t.querySelector(".ch6-num"),c=t.querySelector(".ch6-pointer");let u=null;function f(){const m=new du(em,tm,12,96),v=new $d({color:13214247}),y=new lo(m,v);return y.rotation.x=Math.PI/2,y.position.set(0,1.01*ve,0),y}let h=0,d=Number.NaN,g=Number.NaN;function p(m){i.sky.setSkyRotation(0,m);const v=Math.round(m);if(v!==d){d=v;const{era:x,num:w}=im(v);a.textContent=x,l.textContent=String(w)}const y=Math.round(Ds(m)*100)/100;y!==g&&(g=y,c.style.left=`${y}%`)}return{enter(){i.root.classList.add("inview"),u=f(),i.sky.addSkyObject(u,{rotateWithSky:!1}),p(Pr+h*za)},update(m){h=m,p(Pr+m*za)},exit(){i.root.classList.remove("inview"),i.sky.setSkyRotation(0,0),u&&(i.sky.removeSkyObject(u),u.geometry.dispose(),u.material.dispose(),u=null)}}}const om=Object.freeze(Object.defineProperty({__proto__:null,createChapter:sm},Symbol.toStringTag,{value:"Module"})),am=100,lm=9414856;async function Lc(i){const e=await fetch(i);if(!e.ok)throw new Error(`${i} → HTTP ${e.status}`);return e.json()}async function cm(){const[i,e]=await Promise.all([Lc(Ln("data/western.json")),Lc(Ln("data/stars.json"))]),n=new Map;for(const l of e.stars)n.set(l.hip,Ht(l.ra,l.dec,am));const t=[];for(const l of i.constellations)for(const[c,u]of l.lines){const f=n.get(c),h=n.get(u);!f||!h||t.push(f[0],f[1],f[2],h[0],h[1],h[2])}const r=new as;r.setAttribute("position",new ar(new Float32Array(t),3));const s=new fu({color:lm,transparent:!0,opacity:0,depthWrite:!1,blending:Gr}),o=new Gd(r,s);o.name="western-lines",o.frustumCulled=!1;const a=new kn;return a.name="western",a.add(o),a.visible=!1,{group:a,setOpacity(l){const c=Pe.clamp(l,0,1);s.opacity=c,a.visible=c>.001},dispose(){r.dispose(),s.dispose()}}}const Dc=.6,um=`
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
`;let zc=!1;function fm(){if(zc||typeof document>"u")return;const i=document.createElement("style");i.dataset.ch7="",i.textContent=um,document.head.appendChild(i),zc=!0}function Di(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function dm(i){return i=Pe.clamp(i,0,1),i*i*(3-2*i)}function hm(i){fm();const e=i.root.querySelector(".pin"),{copy:n}=i,t=document.createElement("div");t.className="ch7-panel",t.innerHTML=`
    <p class="eyebrow">${Di(n.eyebrow)}</p>
    <div class="chapter-head">
      <h2>${Di(n.title)}</h2>
      ${n.seal?`<div class="seal">${Di(n.seal)}</div>`:""}
    </div>
    <p class="hook">${Di(n.hook)}</p>
    ${n.body.map(g=>`<p>${Di(g)}</p>`).join("")}
  `,e.appendChild(t);const r=document.createElement("div");r.className="ch7-compare",r.innerHTML=`
    <span class="ch7-end ch7-end--cn">中国星官</span>
    <input class="ch7-slider" type="range" min="0" max="100" step="1" value="0"
      aria-label="中西星空连线对比" />
    <span class="ch7-end ch7-end--west">西方星座</span>
  `,e.appendChild(r);const s=r.querySelector(".ch7-slider");let o=null,a=0,l=0,c=!1,u=null,f=null;function h(g){const p=i.sky.groupCount;for(let m=0;m<p;m++)i.sky.setGroupProgress(m,g)}function d(g){l=Pe.clamp(g,0,1),h(1-l),o==null||o.setOpacity(l),s.value=String(Math.round(l*100))}return s.addEventListener("input",()=>{c=!0,d(Number(s.value)/100)}),{enter(){if(i.root.classList.add("inview"),i.sky.setLabelsEnabled(!1),u==null||u.kill(),u=null,f==null||f.kill(),f=null,c=!1,d(0),o)return;const g=++a;cm().then(p=>{if(g!==a){p.dispose();return}o=p,i.sky.addSkyObject(p.group),p.setOpacity(l)}).catch(p=>console.warn("[ch7] 西方星座数据加载失败：",p))},update(g){if(!c){if(g>=Dc){l!==1&&d(1);return}d(dm(g/Dc))}},exit(){if(i.root.classList.remove("inview"),++a,f==null||f.kill(),o){const p=o,m={v:l};f=St.to(m,{v:0,duration:.6,ease:"sine.inOut",onUpdate:()=>p.setOpacity(m.v),onComplete:()=>{i.sky.removeSkyObject(p.group),p.dispose(),o===p&&(o=null),f=null}})}u==null||u.kill();const g={v:1-l};u=St.to(g,{v:1,duration:2.4,ease:"sine.inOut",onUpdate:()=>h(g.v)}),i.sky.setLabelsEnabled(!0)}}}const pm=Object.freeze(Object.defineProperty({__proto__:null,createChapter:hm},Symbol.toStringTag,{value:"Module"})),gm=`
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
`;let Ic=!1;function mm(){if(Ic||typeof document>"u")return;const i=document.createElement("style");i.dataset.ch8="",i.textContent=gm,document.head.appendChild(i),Ic=!0}function Mn(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function _m(i){return i<0?0:i>1?1:i}function ym(i){return i.split(/(https?:\/\/\S+)/g).map(e=>/^https?:\/\//.test(e)?`<a href="${Mn(e)}" target="_blank" rel="noopener">${Mn(e)}</a>`:Mn(e)).join("")}function Nc(i,e,n){const t=_m((i-e)/(n-e));return t*t*(3-2*t)}function bm(i){mm();const e=i.root.querySelector(".pin"),{copy:n}=i,t=document.createElement("div");t.className="ch8-wrap",t.innerHTML=`
    <div class="ch8-panel">
      <p class="ch8-eyebrow">${Mn(n.eyebrow)}</p>
      <div class="ch8-head">
        <h2 class="ch8-title">${Mn(n.title)}</h2>
        ${n.seal?`<div class="ch8-seal">${Mn(n.seal)}</div>`:""}
      </div>
      <p class="ch8-hook">${Mn(n.hook)}</p>
      <div class="ch8-body">${n.body.map(l=>`<p>${Mn(l)}</p>`).join("")}</div>
      <div class="ch8-credits">
        <p class="ch8-credits-heading">${Mn(yc.heading)}</p>
        ${yc.groups.map(l=>`
          <div class="ch8-credit-group">
            <h3>${Mn(l.title)}</h3>
            ${l.lines.map(c=>`<p>${ym(c)}</p>`).join("")}
          </div>`).join("")}
      </div>
    </div>
  `,e.appendChild(t);const r=t.querySelector(".ch8-panel"),s=t.querySelector(".ch8-credits");let o=-1,a=-1;return{enter(){},update(l){const c=Nc(l,0,.3);(o<0||Math.abs(c-o)>=1e-4)&&(o=c,r.style.opacity=c.toFixed(3),r.style.transform=`translateY(${((1-c)*26).toFixed(2)}px)`);const u=Nc(l,.12,.45);(a<0||Math.abs(u-a)>=1e-4)&&(a=u,s.style.opacity=u.toFixed(3),s.style.transform=`translateY(${((1-u)*14).toFixed(2)}px)`)},exit(){}}}const vm=Object.freeze(Object.defineProperty({__proto__:null,createChapter:bm},Symbol.toStringTag,{value:"Module"}));function xm(i,e){for(var n=0;n<e.length;n++){var t=e[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(i,t.key,t)}}function wm(i,e,n){return e&&xm(i.prototype,e),i}/*!
 * Observer 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var ht,no,tn,sr,or,fi,Wf,kr,di,Vf,Wn,Sn,Uf,jf=function(){return ht||typeof window<"u"&&(ht=window.gsap)&&ht.registerPlugin&&ht},Qf=1,si=[],le=[],Dn=[],Zi=Date.now,Ia=function(e,n){return n},Sm=function(){var e=di.core,n=e.bridge||{},t=e._scrollers,r=e._proxies;t.push.apply(t,le),r.push.apply(r,Dn),le=t,Dn=r,Ia=function(o,a){return n[o](a)}},ur=function(e,n){return~Dn.indexOf(e)&&Dn[Dn.indexOf(e)+1][n]},Ji=function(e){return!!~Vf.indexOf(e)},Et=function(e,n,t,r,s){return e.addEventListener(n,t,{passive:r!==!1,capture:!!s})},Ct=function(e,n,t,r){return e.removeEventListener(n,t,!!r)},zs="scrollLeft",Is="scrollTop",Na=function(){return Wn&&Wn.isPressed||le.cache++},xo=function(e,n){var t=function r(s){if(s||s===0){Qf&&(tn.history.scrollRestoration="manual");var o=Wn&&Wn.isPressed;s=r.v=Math.round(s)||(Wn&&Wn.iOS?1:0),e(s),r.cacheID=le.cache,o&&Ia("ss",s)}else(n||le.cache!==r.cacheID||Ia("ref"))&&(r.cacheID=le.cache,r.v=e());return r.v+r.offset};return t.offset=0,e&&t},Rt={s:zs,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:xo(function(i){return arguments.length?tn.scrollTo(i,tt.sc()):tn.pageXOffset||sr[zs]||or[zs]||fi[zs]||0})},tt={s:Is,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:Rt,sc:xo(function(i){return arguments.length?tn.scrollTo(Rt.sc(),i):tn.pageYOffset||sr[Is]||or[Is]||fi[Is]||0})},zt=function(e,n){return(n&&n._ctx&&n._ctx.selector||ht.utils.toArray)(e)[0]||(typeof e=="string"&&ht.config().nullTargetWarn!==!1?console.warn("Element not found:",e):null)},km=function(e,n){for(var t=n.length;t--;)if(n[t]===e||n[t].contains(e))return!0;return!1},pr=function(e,n){var t=n.s,r=n.sc;Ji(e)&&(e=sr.scrollingElement||or);var s=le.indexOf(e),o=r===tt.sc?1:2;!~s&&(s=le.push(e)-1),le[s+o]||Et(e,"scroll",Na);var a=le[s+o],l=a||(le[s+o]=xo(ur(e,t),!0)||(Ji(e)?r:xo(function(c){return arguments.length?e[t]=c:e[t]})));return l.target=e,a||(l.smooth=ht.getProperty(e,"scrollBehavior")==="smooth"),l},Fa=function(e,n,t){var r=e,s=e,o=Zi(),a=o,l=n||50,c=Math.max(500,l*3),u=function(g,p){var m=Zi();p||m-o>l?(s=r,r=g,a=o,o=m):t?r+=g:r=s+(g-s)/(m-a)*(o-a)},f=function(){s=r=t?0:r,a=o=0},h=function(g){var p=a,m=s,v=Zi();return(g||g===0)&&g!==r&&u(g),o===a||v-a>c?0:(r+(t?m:-m))/((t?v:o)-p)*1e3};return{update:u,reset:f,getVelocity:h}},zi=function(e,n){return n&&!e._gsapAllow&&e.cancelable!==!1&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},Fc=function(e){var n=Math.max.apply(Math,e),t=Math.min.apply(Math,e);return Math.abs(n)>=Math.abs(t)?n:t},Kf=function(){di=ht.core.globals().ScrollTrigger,di&&di.core&&Sm()},Zf=function(e){return ht=e||jf(),!no&&ht&&typeof document<"u"&&document.body&&(tn=window,sr=document,or=sr.documentElement,fi=sr.body,Vf=[tn,sr,or,fi],ht.utils.clamp,Uf=ht.core.context||function(){},kr="onpointerenter"in fi?"pointer":"mouse",Wf=Ve.isTouch=tn.matchMedia&&tn.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in tn||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,Sn=Ve.eventTypes=("ontouchstart"in or?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in or?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return Qf=0},500),no=1),di||Kf(),no};Rt.op=tt;le.cache=0;var Ve=function(){function i(n){this.init(n)}var e=i.prototype;return e.init=function(t){no||Zf(ht)||console.warn("Please gsap.registerPlugin(Observer)"),di||Kf();var r=t.tolerance,s=t.dragMinimum,o=t.type,a=t.target,l=t.lineHeight,c=t.debounce,u=t.preventDefault,f=t.onStop,h=t.onStopDelay,d=t.ignore,g=t.wheelSpeed,p=t.event,m=t.onDragStart,v=t.onDragEnd,y=t.onDrag,x=t.onPress,w=t.onRelease,S=t.onRight,C=t.onLeft,k=t.onUp,A=t.onDown,E=t.onChangeX,P=t.onChangeY,$=t.onChange,_=t.onToggleX,z=t.onToggleY,N=t.onHover,B=t.onHoverEnd,I=t.onMove,F=t.ignoreCheck,R=t.isNormalizer,L=t.onGestureStart,b=t.onGestureEnd,H=t.onWheel,U=t.onEnable,D=t.onDisable,Y=t.onClick,V=t.scrollSpeed,te=t.capture,q=t.allowClicks,_e=t.lockAxis,Se=t.onLockAxis;this.target=a=zt(a)||or,this.vars=t,d&&(d=ht.utils.toArray(d)),r=r||1e-9,s=s||0,g=g||1,V=V||1,o=o||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(tn.getComputedStyle(fi).lineHeight)||22);var me,Ie,Ee,j,ie,Ye,nt,M=this,Ae=0,lt=0,gt=t.passive||!u&&t.passive!==!1,ye=pr(a,Rt),de=pr(a,tt),Ne=ye(),ct=de(),Fe=~o.indexOf("touch")&&!~o.indexOf("pointer")&&Sn[0]==="pointerdown",bn=Ji(a),Re=a.ownerDocument||sr,Xt=[0,0,0],Tt=[0,0,0],Ot=0,Qn=function(){return Ot=Zi()},Le=function(Z,ue){return(M.event=Z)&&d&&km(Z.target,d)||ue&&Fe&&Z.pointerType!=="touch"||F&&F(Z,ue)},In=function(){M._vx.reset(),M._vy.reset(),Ie.pause(),f&&f(M)},Lt=function(){var Z=M.deltaX=Fc(Xt),ue=M.deltaY=Fc(Tt),G=Math.abs(Z)>=r,ee=Math.abs(ue)>=r;$&&(G||ee)&&$(M,Z,ue,Xt,Tt),G&&(S&&M.deltaX>0&&S(M),C&&M.deltaX<0&&C(M),E&&E(M),_&&M.deltaX<0!=Ae<0&&_(M),Ae=M.deltaX,Xt[0]=Xt[1]=Xt[2]=0),ee&&(A&&M.deltaY>0&&A(M),k&&M.deltaY<0&&k(M),P&&P(M),z&&M.deltaY<0!=lt<0&&z(M),lt=M.deltaY,Tt[0]=Tt[1]=Tt[2]=0),(j||Ee)&&(I&&I(M),Ee&&(m&&Ee===1&&m(M),y&&y(M),Ee=0),j=!1),Ye&&!(Ye=!1)&&Se&&Se(M),ie&&(H(M),ie=!1),me=0},vn=function(Z,ue,G){Xt[G]+=Z,Tt[G]+=ue,M._vx.update(Z),M._vy.update(ue),c?me||(me=requestAnimationFrame(Lt)):Lt()},xn=function(Z,ue){_e&&!nt&&(M.axis=nt=Math.abs(Z)>Math.abs(ue)?"x":"y",Ye=!0),nt!=="y"&&(Xt[2]+=Z,M._vx.update(Z,!0)),nt!=="x"&&(Tt[2]+=ue,M._vy.update(ue,!0)),c?me||(me=requestAnimationFrame(Lt)):Lt()},qt=function(Z){if(!Le(Z,1)){Z=zi(Z,u);var ue=Z.clientX,G=Z.clientY,ee=ue-M.x,Q=G-M.y,J=M.isDragging;M.x=ue,M.y=G,(J||(ee||Q)&&(Math.abs(M.startX-ue)>=s||Math.abs(M.startY-G)>=s))&&(Ee||(Ee=J?2:1),J||(M.isDragging=!0),xn(ee,Q))}},Wt=M.onPress=function(ne){Le(ne,1)||ne&&ne.button||(M.axis=nt=null,Ie.pause(),M.isPressed=!0,ne=zi(ne),Ae=lt=0,M.startX=M.x=ne.clientX,M.startY=M.y=ne.clientY,M._vx.reset(),M._vy.reset(),Et(R?a:Re,Sn[1],qt,gt,!0),M.deltaX=M.deltaY=0,x&&x(M))},se=M.onRelease=function(ne){if(!Le(ne,1)){Ct(R?a:Re,Sn[1],qt,!0);var Z=!isNaN(M.y-M.startY),ue=M.isDragging,G=ue&&(Math.abs(M.x-M.startX)>3||Math.abs(M.y-M.startY)>3),ee=zi(ne);!G&&Z&&(M._vx.reset(),M._vy.reset(),u&&q&&ht.delayedCall(.08,function(){if(Zi()-Ot>300&&!ne.defaultPrevented){if(ne.target.click)ne.target.click();else if(Re.createEvent){var Q=Re.createEvent("MouseEvents");Q.initMouseEvent("click",!0,!0,tn,1,ee.screenX,ee.screenY,ee.clientX,ee.clientY,!1,!1,!1,!1,0,null),ne.target.dispatchEvent(Q)}}})),M.isDragging=M.isGesturing=M.isPressed=!1,f&&ue&&!R&&Ie.restart(!0),Ee&&Lt(),v&&ue&&v(M),w&&w(M,G)}},ln=function(Z){return Z.touches&&Z.touches.length>1&&(M.isGesturing=!0)&&L(Z,M.isDragging)},mt=function(){return(M.isGesturing=!1)||b(M)},Dt=function(Z){if(!Le(Z)){var ue=ye(),G=de();vn((ue-Ne)*V,(G-ct)*V,1),Ne=ue,ct=G,f&&Ie.restart(!0)}},ut=function(Z){if(!Le(Z)){Z=zi(Z,u),H&&(ie=!0);var ue=(Z.deltaMode===1?l:Z.deltaMode===2?tn.innerHeight:1)*g;vn(Z.deltaX*ue,Z.deltaY*ue,0),f&&!R&&Ie.restart(!0)}},Nn=function(Z){if(!Le(Z)){var ue=Z.clientX,G=Z.clientY,ee=ue-M.x,Q=G-M.y;M.x=ue,M.y=G,j=!0,f&&Ie.restart(!0),(ee||Q)&&xn(ee,Q)}},Fn=function(Z){M.event=Z,N(M)},ft=function(Z){M.event=Z,B(M)},$n=function(Z){return Le(Z)||zi(Z,u)&&Y(M)};Ie=M._dc=ht.delayedCall(h||.25,In).pause(),M.deltaX=M.deltaY=0,M._vx=Fa(0,50,!0),M._vy=Fa(0,50,!0),M.scrollX=ye,M.scrollY=de,M.isDragging=M.isGesturing=M.isPressed=!1,Uf(this),M.enable=function(ne){return M.isEnabled||(Et(bn?Re:a,"scroll",Na),o.indexOf("scroll")>=0&&Et(bn?Re:a,"scroll",Dt,gt,te),o.indexOf("wheel")>=0&&Et(a,"wheel",ut,gt,te),(o.indexOf("touch")>=0&&Wf||o.indexOf("pointer")>=0)&&(Et(a,Sn[0],Wt,gt,te),Et(Re,Sn[2],se),Et(Re,Sn[3],se),q&&Et(a,"click",Qn,!0,!0),Y&&Et(a,"click",$n),L&&Et(Re,"gesturestart",ln),b&&Et(Re,"gestureend",mt),N&&Et(a,kr+"enter",Fn),B&&Et(a,kr+"leave",ft),I&&Et(a,kr+"move",Nn)),M.isEnabled=!0,M.isDragging=M.isGesturing=M.isPressed=j=Ee=!1,M._vx.reset(),M._vy.reset(),Ne=ye(),ct=de(),ne&&ne.type&&Wt(ne),U&&U(M)),M},M.disable=function(){M.isEnabled&&(si.filter(function(ne){return ne!==M&&Ji(ne.target)}).length||Ct(bn?Re:a,"scroll",Na),M.isPressed&&(M._vx.reset(),M._vy.reset(),Ct(R?a:Re,Sn[1],qt,!0)),Ct(bn?Re:a,"scroll",Dt,te),Ct(a,"wheel",ut,te),Ct(a,Sn[0],Wt,te),Ct(Re,Sn[2],se),Ct(Re,Sn[3],se),Ct(a,"click",Qn,!0),Ct(a,"click",$n),Ct(Re,"gesturestart",ln),Ct(Re,"gestureend",mt),Ct(a,kr+"enter",Fn),Ct(a,kr+"leave",ft),Ct(a,kr+"move",Nn),M.isEnabled=M.isPressed=M.isDragging=!1,D&&D(M))},M.kill=M.revert=function(){M.disable();var ne=si.indexOf(M);ne>=0&&si.splice(ne,1),Wn===M&&(Wn=0)},si.push(M),R&&Ji(a)&&(Wn=M),M.enable(p)},wm(i,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),i}();Ve.version="3.15.0";Ve.create=function(i){return new Ve(i)};Ve.register=Zf;Ve.getAll=function(){return si.slice()};Ve.getById=function(i){return si.filter(function(e){return e.vars.id===i})[0]};jf()&&ht.registerPlugin(Ve);/*!
 * ScrollTrigger 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var W,ei,ae,we,Jt,be,ml,wo,_s,es,Hi,Ns,bt,Oo,$a,Pt,$c,Gc,ti,Jf,ta,ed,Mt,Ga,td,nd,Jn,Ba,_l,hi,yl,ts,Ha,na,Fs=1,vt=Date.now,ra=vt(),yn=0,Yi=0,Bc=function(e,n,t){var r=jt(e)&&(e.substr(0,6)==="clamp("||e.indexOf("max")>-1);return t["_"+n+"Clamp"]=r,r?e.substr(6,e.length-7):e},Hc=function(e,n){return n&&(!jt(e)||e.substr(0,6)!=="clamp(")?"clamp("+e+")":e},Tm=function i(){return Yi&&requestAnimationFrame(i)},Yc=function(){return Oo=1},Xc=function(){return Oo=0},Pn=function(e){return e},Xi=function(e){return Math.round(e*1e5)/1e5||0},rd=function(){return typeof window<"u"},id=function(){return W||rd()&&(W=window.gsap)&&W.registerPlugin&&W},Hr=function(e){return!!~ml.indexOf(e)},sd=function(e){return(e==="Height"?yl:ae["inner"+e])||Jt["client"+e]||be["client"+e]},od=function(e){return ur(e,"getBoundingClientRect")||(Hr(e)?function(){return ao.width=ae.innerWidth,ao.height=yl,ao}:function(){return Yn(e)})},Cm=function(e,n,t){var r=t.d,s=t.d2,o=t.a;return(o=ur(e,"getBoundingClientRect"))?function(){return o()[r]}:function(){return(n?sd(s):e["client"+s])||0}},Em=function(e,n){return!n||~Dn.indexOf(e)?od(e):function(){return ao}},On=function(e,n){var t=n.s,r=n.d2,s=n.d,o=n.a;return Math.max(0,(t="scroll"+r)&&(o=ur(e,t))?o()-od(e)()[s]:Hr(e)?(Jt[t]||be[t])-sd(r):e[t]-e["offset"+r])},$s=function(e,n){for(var t=0;t<ti.length;t+=3)(!n||~n.indexOf(ti[t+1]))&&e(ti[t],ti[t+1],ti[t+2])},jt=function(e){return typeof e=="string"},wt=function(e){return typeof e=="function"},qi=function(e){return typeof e=="number"},Tr=function(e){return typeof e=="object"},Ii=function(e,n,t){return e&&e.progress(n?0:1)&&t&&e.pause()},Kr=function(e,n,t){if(e.enabled){var r=e._ctx?e._ctx.add(function(){return n(e,t)}):n(e,t);r&&r.totalTime&&(e.callbackAnimation=r)}},Zr=Math.abs,ad="left",ld="top",bl="right",vl="bottom",Nr="width",Fr="height",ns="Right",rs="Left",is="Top",ss="Bottom",Qe="padding",pn="margin",xi="Width",xl="Height",et="px",gn=function(e){return ae.getComputedStyle(e.nodeType===Node.DOCUMENT_NODE?e.scrollingElement:e)},Mm=function(e){var n=gn(e).position;e.style.position=n==="absolute"||n==="fixed"?n:"relative"},qc=function(e,n){for(var t in n)t in e||(e[t]=n[t]);return e},Yn=function(e,n){var t=n&&gn(e)[$a]!=="matrix(1, 0, 0, 1, 0, 0)"&&W.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),r=e.getBoundingClientRect?e.getBoundingClientRect():e.scrollingElement.getBoundingClientRect();return t&&t.progress(0).kill(),r},So=function(e,n){var t=n.d2;return e["offset"+t]||e["client"+t]||0},cd=function(e){var n=[],t=e.labels,r=e.duration(),s;for(s in t)n.push(t[s]/r);return n},Pm=function(e){return function(n){return W.utils.snap(cd(e),n)}},wl=function(e){var n=W.utils.snap(e),t=Array.isArray(e)&&e.slice(0).sort(function(r,s){return r-s});return t?function(r,s,o){o===void 0&&(o=.001);var a;if(!s)return n(r);if(s>0){for(r-=o,a=0;a<t.length;a++)if(t[a]>=r)return t[a];return t[a-1]}else for(a=t.length,r+=o;a--;)if(t[a]<=r)return t[a];return t[0]}:function(r,s,o){o===void 0&&(o=.001);var a=n(r);return!s||Math.abs(a-r)<o||a-r<0==s<0?a:n(s<0?r-e:r+e)}},Am=function(e){return function(n,t){return wl(cd(e))(n,t.direction)}},Gs=function(e,n,t,r){return t.split(",").forEach(function(s){return e(n,s,r)})},ot=function(e,n,t,r,s){return e.addEventListener(n,t,{passive:!r,capture:!!s})},st=function(e,n,t,r){return e.removeEventListener(n,t,!!r)},Bs=function(e,n,t){t=t&&t.wheelHandler,t&&(e(n,"wheel",t),e(n,"touchmove",t))},Wc={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},Hs={toggleActions:"play",anticipatePin:0},ko={top:0,left:0,center:.5,bottom:1,right:1},ro=function(e,n){if(jt(e)){var t=e.indexOf("="),r=~t?+(e.charAt(t-1)+1)*parseFloat(e.substr(t+1)):0;~t&&(e.indexOf("%")>t&&(r*=n/100),e=e.substr(0,t-1)),e=r+(e in ko?ko[e]*n:~e.indexOf("%")?parseFloat(e)*n/100:parseFloat(e)||0)}return e},Ys=function(e,n,t,r,s,o,a,l){var c=s.startColor,u=s.endColor,f=s.fontSize,h=s.indent,d=s.fontWeight,g=we.createElement("div"),p=Hr(t)||ur(t,"pinType")==="fixed",m=e.indexOf("scroller")!==-1,v=p?be:t.tagName==="IFRAME"?t.contentDocument.body:t,y=e.indexOf("start")!==-1,x=y?c:u,w="border-color:"+x+";font-size:"+f+";color:"+x+";font-weight:"+d+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return w+="position:"+((m||l)&&p?"fixed;":"absolute;"),(m||l||!p)&&(w+=(r===tt?bl:vl)+":"+(o+parseFloat(h))+"px;"),a&&(w+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),g._isStart=y,g.setAttribute("class","gsap-marker-"+e+(n?" marker-"+n:"")),g.style.cssText=w,g.innerText=n||n===0?e+"-"+n:e,v.children[0]?v.insertBefore(g,v.children[0]):v.appendChild(g),g._offset=g["offset"+r.op.d2],io(g,0,r,y),g},io=function(e,n,t,r){var s={display:"block"},o=t[r?"os2":"p2"],a=t[r?"p2":"os2"];e._isFlipped=r,s[t.a+"Percent"]=r?-100:0,s[t.a]=r?"1px":0,s["border"+o+xi]=1,s["border"+a+xi]=0,s[t.p]=n+"px",W.set(e,s)},oe=[],Ya={},ys,Vc=function(){return vt()-yn>34&&(ys||(ys=requestAnimationFrame(Vn)))},Jr=function(){(!Mt||!Mt.isPressed||Mt.startX>be.clientWidth)&&(le.cache++,Mt?ys||(ys=requestAnimationFrame(Vn)):Vn(),yn||Xr("scrollStart"),yn=vt())},ia=function(){nd=ae.innerWidth,td=ae.innerHeight},Wi=function(e){le.cache++,(e===!0||!bt&&!ed&&!we.fullscreenElement&&!we.webkitFullscreenElement&&(!Ga||nd!==ae.innerWidth||Math.abs(ae.innerHeight-td)>ae.innerHeight*.25))&&wo.restart(!0)},Yr={},Rm=[],ud=function i(){return st(ce,"scrollEnd",i)||Ar(!0)},Xr=function(e){return Yr[e]&&Yr[e].map(function(n){return n()})||Rm},Ut=[],fd=function(e){for(var n=0;n<Ut.length;n+=5)(!e||Ut[n+4]&&Ut[n+4].query===e)&&(Ut[n].style.cssText=Ut[n+1],Ut[n].getBBox&&Ut[n].setAttribute("transform",Ut[n+2]||""),Ut[n+3].uncache=1)},dd=function(){return le.forEach(function(e){return wt(e)&&++e.cacheID&&(e.rec=e())})},Sl=function(e,n){var t;for(Pt=0;Pt<oe.length;Pt++)t=oe[Pt],t&&(!n||t._ctx===n)&&(e?t.kill(1):t.revert(!0,!0));ts=!0,n&&fd(n),n||Xr("revert")},hd=function(e,n){le.cache++,(n||!At)&&le.forEach(function(t){return wt(t)&&t.cacheID++&&(t.rec=0)}),jt(e)&&(ae.history.scrollRestoration=_l=e)},At,$r=0,Uc,Om=function(){if(Uc!==$r){var e=Uc=$r;requestAnimationFrame(function(){return e===$r&&Ar(!0)})}},pd=function(){be.appendChild(hi),yl=!Mt&&hi.offsetHeight||ae.innerHeight,be.removeChild(hi)},jc=function(e){return _s(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(n){return n.style.display=e?"none":"block"})},Ar=function(e,n){if(Jt=we.documentElement,be=we.body,ml=[ae,we,Jt,be],yn&&!e&&!ts){ot(ce,"scrollEnd",ud);return}pd(),At=ce.isRefreshing=!0,ts||dd();var t=Xr("refreshInit");Jf&&ce.sort(),n||Sl(),le.forEach(function(r){wt(r)&&(r.smooth&&(r.target.style.scrollBehavior="auto"),r(0))}),oe.slice(0).forEach(function(r){return r.refresh()}),ts=!1,oe.forEach(function(r){if(r._subPinOffset&&r.pin){var s=r.vars.horizontal?"offsetWidth":"offsetHeight",o=r.pin[s];r.revert(!0,1),r.adjustPinSpacing(r.pin[s]-o),r.refresh()}}),Ha=1,jc(!0),oe.forEach(function(r){var s=On(r.scroller,r._dir),o=r.vars.end==="max"||r._endClamp&&r.end>s,a=r._startClamp&&r.start>=s;(o||a)&&r.setPositions(a?s-1:r.start,o?Math.max(a?s:r.start+1,s):r.end,!0)}),jc(!1),Ha=0,t.forEach(function(r){return r&&r.render&&r.render(-1)}),le.forEach(function(r){wt(r)&&(r.smooth&&requestAnimationFrame(function(){return r.target.style.scrollBehavior="smooth"}),r.rec&&r(r.rec))}),hd(_l,1),wo.pause(),$r++,At=2,Vn(2),oe.forEach(function(r){return wt(r.vars.onRefresh)&&r.vars.onRefresh(r)}),At=ce.isRefreshing=!1,Xr("refresh")},Xa=0,so=1,os,Vn=function(e){if(e===2||!At&&!ts){ce.isUpdating=!0,os&&os.update(0);var n=oe.length,t=vt(),r=t-ra>=50,s=n&&oe[0].scroll();if(so=Xa>s?-1:1,At||(Xa=s),r&&(yn&&!Oo&&t-yn>200&&(yn=0,Xr("scrollEnd")),Hi=ra,ra=t),so<0){for(Pt=n;Pt-- >0;)oe[Pt]&&oe[Pt].update(0,r);so=1}else for(Pt=0;Pt<n;Pt++)oe[Pt]&&oe[Pt].update(0,r);ce.isUpdating=!1}ys=0},qa=[ad,ld,vl,bl,pn+ss,pn+ns,pn+is,pn+rs,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],oo=qa.concat([Nr,Fr,"boxSizing","max"+xi,"max"+xl,"position",pn,Qe,Qe+is,Qe+ns,Qe+ss,Qe+rs]),Lm=function(e,n,t){pi(t);var r=e._gsap;if(r.spacerIsNative)pi(r.spacerState);else if(e._gsap.swappedIn){var s=n.parentNode;s&&(s.insertBefore(e,n),s.removeChild(n))}e._gsap.swappedIn=!1},sa=function(e,n,t,r){if(!e._gsap.swappedIn){for(var s=qa.length,o=n.style,a=e.style,l;s--;)l=qa[s],o[l]=t[l];o.position=t.position==="absolute"?"absolute":"relative",t.display==="inline"&&(o.display="inline-block"),a[vl]=a[bl]="auto",o.flexBasis=t.flexBasis||"auto",o.overflow="visible",o.boxSizing="border-box",o[Nr]=So(e,Rt)+et,o[Fr]=So(e,tt)+et,o[Qe]=a[pn]=a[ld]=a[ad]="0",pi(r),a[Nr]=a["max"+xi]=t[Nr],a[Fr]=a["max"+xl]=t[Fr],a[Qe]=t[Qe],e.parentNode!==n&&(e.parentNode.insertBefore(n,e),n.appendChild(e)),e._gsap.swappedIn=!0}},Dm=/([A-Z])/g,pi=function(e){if(e){var n=e.t.style,t=e.length,r=0,s,o;for((e.t._gsap||W.core.getCache(e.t)).uncache=1;r<t;r+=2)o=e[r+1],s=e[r],o?n[s]=o:n[s]&&n.removeProperty(s.replace(Dm,"-$1").toLowerCase())}},Xs=function(e){for(var n=oo.length,t=e.style,r=[],s=0;s<n;s++)r.push(oo[s],t[oo[s]]);return r.t=e,r},zm=function(e,n,t){for(var r=[],s=e.length,o=t?8:0,a;o<s;o+=2)a=e[o],r.push(a,a in n?n[a]:e[o+1]);return r.t=e.t,r},ao={left:0,top:0},Qc=function(e,n,t,r,s,o,a,l,c,u,f,h,d,g){wt(e)&&(e=e(l)),jt(e)&&e.substr(0,3)==="max"&&(e=h+(e.charAt(4)==="="?ro("0"+e.substr(3),t):0));var p=d?d.time():0,m,v,y;if(d&&d.seek(0),isNaN(e)||(e=+e),qi(e))d&&(e=W.utils.mapRange(d.scrollTrigger.start,d.scrollTrigger.end,0,h,e)),a&&io(a,t,r,!0);else{wt(n)&&(n=n(l));var x=(e||"0").split(" "),w,S,C,k;y=zt(n,l)||be,w=Yn(y)||{},(!w||!w.left&&!w.top)&&gn(y).display==="none"&&(k=y.style.display,y.style.display="block",w=Yn(y),k?y.style.display=k:y.style.removeProperty("display")),S=ro(x[0],w[r.d]),C=ro(x[1]||"0",t),e=w[r.p]-c[r.p]-u+S+s-C,a&&io(a,C,r,t-C<20||a._isStart&&C>20),t-=t-C}if(g&&(l[g]=e||-.001,e<0&&(e=0)),o){var A=e+t,E=o._isStart;m="scroll"+r.d2,io(o,A,r,E&&A>20||!E&&(f?Math.max(be[m],Jt[m]):o.parentNode[m])<=A+1),f&&(c=Yn(a),f&&(o.style[r.op.p]=c[r.op.p]-r.op.m-o._offset+et))}return d&&y&&(m=Yn(y),d.seek(h),v=Yn(y),d._caScrollDist=m[r.p]-v[r.p],e=e/d._caScrollDist*h),d&&d.seek(p),d?e:Math.round(e)},Im=/(webkit|moz|length|cssText|inset)/i,Kc=function(e,n,t,r){if(e.parentNode!==n){var s=e.style,o,a;if(n===be){e._stOrig=s.cssText,a=gn(e);for(o in a)!+o&&!Im.test(o)&&a[o]&&typeof s[o]=="string"&&o!=="0"&&(s[o]=a[o]);s.top=t,s.left=r}else s.cssText=e._stOrig;W.core.getCache(e).uncache=1,n.appendChild(e)}},gd=function(e,n,t){var r=n,s=r;return function(o){var a=Math.round(e());return a!==r&&a!==s&&Math.abs(a-r)>3&&Math.abs(a-s)>3&&(o=a,t&&t()),s=r,r=Math.round(o),r}},qs=function(e,n,t){var r={};r[n.p]="+="+t,W.set(e,r)},Zc=function(e,n){var t=pr(e,n),r="_scroll"+n.p2,s=function o(a,l,c,u,f){var h=o.tween,d=l.onComplete,g={};c=c||t();var p=gd(t,c,function(){h.kill(),o.tween=0});return f=u&&f||0,u=u||a-c,h&&h.kill(),l[r]=a,l.inherit=!1,l.modifiers=g,g[r]=function(){return p(c+u*h.ratio+f*h.ratio*h.ratio)},l.onUpdate=function(){le.cache++,o.tween&&Vn()},l.onComplete=function(){o.tween=0,d&&d.call(h)},h=o.tween=W.to(e,l),h};return e[r]=t,t.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},ot(e,"wheel",t.wheelHandler),ce.isTouch&&ot(e,"touchmove",t.wheelHandler),s},ce=function(){function i(n,t){ei||i.register(W)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),Ba(this),this.init(n,t)}var e=i.prototype;return e.init=function(t,r){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!Yi){this.update=this.refresh=this.kill=Pn;return}t=qc(jt(t)||qi(t)||t.nodeType?{trigger:t}:t,Hs);var s=t,o=s.onUpdate,a=s.toggleClass,l=s.id,c=s.onToggle,u=s.onRefresh,f=s.scrub,h=s.trigger,d=s.pin,g=s.pinSpacing,p=s.invalidateOnRefresh,m=s.anticipatePin,v=s.onScrubComplete,y=s.onSnapComplete,x=s.once,w=s.snap,S=s.pinReparent,C=s.pinSpacer,k=s.containerAnimation,A=s.fastScrollEnd,E=s.preventOverlaps,P=t.horizontal||t.containerAnimation&&t.horizontal!==!1?Rt:tt,$=!f&&f!==0,_=zt(t.scroller||ae),z=W.core.getCache(_),N=Hr(_),B=("pinType"in t?t.pinType:ur(_,"pinType")||N&&"fixed")==="fixed",I=[t.onEnter,t.onLeave,t.onEnterBack,t.onLeaveBack],F=$&&t.toggleActions.split(" "),R="markers"in t?t.markers:Hs.markers,L=N?0:parseFloat(gn(_)["border"+P.p2+xi])||0,b=this,H=t.onRefreshInit&&function(){return t.onRefreshInit(b)},U=Cm(_,N,P),D=Em(_,N),Y=0,V=0,te=0,q=pr(_,P),_e,Se,me,Ie,Ee,j,ie,Ye,nt,M,Ae,lt,gt,ye,de,Ne,ct,Fe,bn,Re,Xt,Tt,Ot,Qn,Le,In,Lt,vn,xn,qt,Wt,se,ln,mt,Dt,ut,Nn,Fn,ft;if(b._startClamp=b._endClamp=!1,b._dir=P,m*=45,b.scroller=_,b.scroll=k?k.time.bind(k):q,Ie=q(),b.vars=t,r=r||t.animation,"refreshPriority"in t&&(Jf=1,t.refreshPriority===-9999&&(os=b)),z.tweenScroll=z.tweenScroll||{top:Zc(_,tt),left:Zc(_,Rt)},b.tweenTo=_e=z.tweenScroll[P.p],b.scrubDuration=function(G){ln=qi(G)&&G,ln?se?se.duration(G):se=W.to(r,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:ln,paused:!0,onComplete:function(){return v&&v(b)}}):(se&&se.progress(1).kill(),se=0)},r&&(r.vars.lazy=!1,r._initted&&!b.isReverted||r.vars.immediateRender!==!1&&t.immediateRender!==!1&&r.duration()&&r.render(0,!0,!0),b.animation=r.pause(),r.scrollTrigger=b,b.scrubDuration(f),qt=0,l||(l=r.vars.id)),w&&((!Tr(w)||w.push)&&(w={snapTo:w}),"scrollBehavior"in be.style&&W.set(N?[be,Jt]:_,{scrollBehavior:"auto"}),le.forEach(function(G){return wt(G)&&G.target===(N?we.scrollingElement||Jt:_)&&(G.smooth=!1)}),me=wt(w.snapTo)?w.snapTo:w.snapTo==="labels"?Pm(r):w.snapTo==="labelsDirectional"?Am(r):w.directional!==!1?function(G,ee){return wl(w.snapTo)(G,vt()-V<500?0:ee.direction)}:W.utils.snap(w.snapTo),mt=w.duration||{min:.1,max:2},mt=Tr(mt)?es(mt.min,mt.max):es(mt,mt),Dt=W.delayedCall(w.delay||ln/2||.1,function(){var G=q(),ee=vt()-V<500,Q=_e.tween;if((ee||Math.abs(b.getVelocity())<10)&&!Q&&!Oo&&Y!==G){var J=(G-j)/ye,Ue=r&&!$?r.totalProgress():J,fe=ee?0:(Ue-Wt)/(vt()-Hi)*1e3||0,$e=W.utils.clamp(-J,1-J,Zr(fe/2)*fe/.185),rt=J+(w.inertia===!1?0:$e),De,Me,ge=w,_t=ge.onStart,Oe=ge.onInterrupt,yt=ge.onComplete;if(De=me(rt,b),qi(De)||(De=rt),Me=Math.max(0,Math.round(j+De*ye)),G<=ie&&G>=j&&Me!==G){if(Q&&!Q._initted&&Q.data<=Zr(Me-G))return;w.inertia===!1&&($e=De-J),_e(Me,{duration:mt(Zr(Math.max(Zr(rt-Ue),Zr(De-Ue))*.185/fe/.05||0)),ease:w.ease||"power3",data:Zr(Me-G),onInterrupt:function(){return Dt.restart(!0)&&Oe&&Kr(b,Oe)},onComplete:function(){b.update(),Y=q(),r&&!$&&(se?se.resetTo("totalProgress",De,r._tTime/r._tDur):r.progress(De)),qt=Wt=r&&!$?r.totalProgress():b.progress,y&&y(b),yt&&Kr(b,yt)}},G,$e*ye,Me-G-$e*ye),_t&&Kr(b,_t,_e.tween)}}else b.isActive&&Y!==G&&Dt.restart(!0)}).pause()),l&&(Ya[l]=b),h=b.trigger=zt(h||d!==!0&&d),ft=h&&h._gsap&&h._gsap.stRevert,ft&&(ft=ft(b)),d=d===!0?h:zt(d),jt(a)&&(a={targets:h,className:a}),d&&(g===!1||g===pn||(g=!g&&d.parentNode&&d.parentNode.style&&gn(d.parentNode).display==="flex"?!1:Qe),b.pin=d,Se=W.core.getCache(d),Se.spacer?de=Se.pinState:(C&&(C=zt(C),C&&!C.nodeType&&(C=C.current||C.nativeElement),Se.spacerIsNative=!!C,C&&(Se.spacerState=Xs(C))),Se.spacer=Fe=C||we.createElement("div"),Fe.classList.add("pin-spacer"),l&&Fe.classList.add("pin-spacer-"+l),Se.pinState=de=Xs(d)),t.force3D!==!1&&W.set(d,{force3D:!0}),b.spacer=Fe=Se.spacer,xn=gn(d),Qn=xn[g+P.os2],Re=W.getProperty(d),Xt=W.quickSetter(d,P.a,et),sa(d,Fe,xn),ct=Xs(d)),R){lt=Tr(R)?qc(R,Wc):Wc,M=Ys("scroller-start",l,_,P,lt,0),Ae=Ys("scroller-end",l,_,P,lt,0,M),bn=M["offset"+P.op.d2];var $n=zt(ur(_,"content")||_);Ye=this.markerStart=Ys("start",l,$n,P,lt,bn,0,k),nt=this.markerEnd=Ys("end",l,$n,P,lt,bn,0,k),k&&(Fn=W.quickSetter([Ye,nt],P.a,et)),!B&&!(Dn.length&&ur(_,"fixedMarkers")===!0)&&(Mm(N?be:_),W.set([M,Ae],{force3D:!0}),In=W.quickSetter(M,P.a,et),vn=W.quickSetter(Ae,P.a,et))}if(k){var ne=k.vars.onUpdate,Z=k.vars.onUpdateParams;k.eventCallback("onUpdate",function(){b.update(0,0,1),ne&&ne.apply(k,Z||[])})}if(b.previous=function(){return oe[oe.indexOf(b)-1]},b.next=function(){return oe[oe.indexOf(b)+1]},b.revert=function(G,ee){if(!ee)return b.kill(!0);var Q=G!==!1||!b.enabled,J=bt;Q!==b.isReverted&&(Q&&(ut=Math.max(q(),b.scroll.rec||0),te=b.progress,Nn=r&&r.progress()),Ye&&[Ye,nt,M,Ae].forEach(function(Ue){return Ue.style.display=Q?"none":"block"}),Q&&(bt=b,b.update(Q)),d&&(!S||!b.isActive)&&(Q?Lm(d,Fe,de):sa(d,Fe,gn(d),Le)),Q||b.update(Q),bt=J,b.isReverted=Q)},b.refresh=function(G,ee,Q,J){if(!((bt||!b.enabled)&&!ee)){if(d&&G&&yn){ot(i,"scrollEnd",ud);return}!At&&H&&H(b),bt=b,_e.tween&&!Q&&(_e.tween.kill(),_e.tween=0),se&&se.pause(),p&&r&&(r.revert({kill:!1}).invalidate(),r.getChildren?r.getChildren(!0,!0,!1).forEach(function(T){return T.vars.immediateRender&&T.render(0,!0,!0)}):r.vars.immediateRender&&r.render(0,!0,!0)),b.isReverted||b.revert(!0,!0),b._subPinOffset=!1;var Ue=U(),fe=D(),$e=k?k.duration():On(_,P),rt=ye<=.01||!ye,De=0,Me=J||0,ge=Tr(Q)?Q.end:t.end,_t=t.endTrigger||h,Oe=Tr(Q)?Q.start:t.start||(t.start===0||!h?0:d?"0 0":"0 100%"),yt=b.pinnedContainer=t.pinnedContainer&&zt(t.pinnedContainer,b),cn=h&&Math.max(0,oe.indexOf(b))||0,Ze=cn,Je,it,un,mr,je,qe,fn,Si,ki,_r,dn,Kn,Wr;for(R&&Tr(Q)&&(Kn=W.getProperty(M,P.p),Wr=W.getProperty(Ae,P.p));Ze-- >0;)qe=oe[Ze],qe.end||qe.refresh(0,1)||(bt=b),fn=qe.pin,fn&&(fn===h||fn===d||fn===yt)&&!qe.isReverted&&(_r||(_r=[]),_r.unshift(qe),qe.revert(!0,!0)),qe!==oe[Ze]&&(cn--,Ze--);for(wt(Oe)&&(Oe=Oe(b)),Oe=Bc(Oe,"start",b),j=Qc(Oe,h,Ue,P,q(),Ye,M,b,fe,L,B,$e,k,b._startClamp&&"_startClamp")||(d?-.001:0),wt(ge)&&(ge=ge(b)),jt(ge)&&!ge.indexOf("+=")&&(~ge.indexOf(" ")?ge=(jt(Oe)?Oe.split(" ")[0]:"")+ge:(De=ro(ge.substr(2),Ue),ge=jt(Oe)?Oe:(k?W.utils.mapRange(0,k.duration(),k.scrollTrigger.start,k.scrollTrigger.end,j):j)+De,_t=h)),ge=Bc(ge,"end",b),ie=Math.max(j,Qc(ge||(_t?"100% 0":$e),_t,Ue,P,q()+De,nt,Ae,b,fe,L,B,$e,k,b._endClamp&&"_endClamp"))||-.001,De=0,Ze=cn;Ze--;)qe=oe[Ze]||{},fn=qe.pin,fn&&qe.start-qe._pinPush<=j&&!k&&qe.end>0&&(Je=qe.end-(b._startClamp?Math.max(0,qe.start):qe.start),(fn===h&&qe.start-qe._pinPush<j||fn===yt)&&isNaN(Oe)&&(De+=Je*(1-qe.progress)),fn===d&&(Me+=Je));if(j+=De,ie+=De,b._startClamp&&(b._startClamp+=De),b._endClamp&&!At&&(b._endClamp=ie||-.001,ie=Math.min(ie,On(_,P))),ye=ie-j||(j-=.01)&&.001,rt&&(te=W.utils.clamp(0,1,W.utils.normalize(j,ie,ut))),b._pinPush=Me,Ye&&De&&(Je={},Je[P.a]="+="+De,yt&&(Je[P.p]="-="+q()),W.set([Ye,nt],Je)),d&&!(Ha&&b.end>=On(_,P)))Je=gn(d),mr=P===tt,un=q(),Tt=parseFloat(Re(P.a))+Me,!$e&&ie>1&&(dn=(N?we.scrollingElement||Jt:_).style,dn={style:dn,value:dn["overflow"+P.a.toUpperCase()]},N&&gn(be)["overflow"+P.a.toUpperCase()]!=="scroll"&&(dn.style["overflow"+P.a.toUpperCase()]="scroll")),sa(d,Fe,Je),ct=Xs(d),it=Yn(d,!0),Si=B&&pr(_,mr?Rt:tt)(),g?(Le=[g+P.os2,ye+Me+et],Le.t=Fe,Ze=g===Qe?So(d,P)+ye+Me:0,Ze&&(Le.push(P.d,Ze+et),Fe.style.flexBasis!=="auto"&&(Fe.style.flexBasis=Ze+et)),pi(Le),yt&&oe.forEach(function(T){T.pin===yt&&T.vars.pinSpacing!==!1&&(T._subPinOffset=!0)}),B&&q(ut)):(Ze=So(d,P),Ze&&Fe.style.flexBasis!=="auto"&&(Fe.style.flexBasis=Ze+et)),B&&(je={top:it.top+(mr?un-j:Si)+et,left:it.left+(mr?Si:un-j)+et,boxSizing:"border-box",position:"fixed"},je[Nr]=je["max"+xi]=Math.ceil(it.width)+et,je[Fr]=je["max"+xl]=Math.ceil(it.height)+et,je[pn]=je[pn+is]=je[pn+ns]=je[pn+ss]=je[pn+rs]="0",je[Qe]=Je[Qe],je[Qe+is]=Je[Qe+is],je[Qe+ns]=Je[Qe+ns],je[Qe+ss]=Je[Qe+ss],je[Qe+rs]=Je[Qe+rs],Ne=zm(de,je,S),At&&q(0)),r?(ki=r._initted,ta(1),r.render(r.duration(),!0,!0),Ot=Re(P.a)-Tt+ye+Me,Lt=Math.abs(ye-Ot)>1,B&&Lt&&Ne.splice(Ne.length-2,2),r.render(0,!0,!0),ki||r.invalidate(!0),r.parent||r.totalTime(r.totalTime()),ta(0)):Ot=ye,dn&&(dn.value?dn.style["overflow"+P.a.toUpperCase()]=dn.value:dn.style.removeProperty("overflow-"+P.a));else if(h&&q()&&!k)for(it=h.parentNode;it&&it!==be;)it._pinOffset&&(j-=it._pinOffset,ie-=it._pinOffset),it=it.parentNode;_r&&_r.forEach(function(T){return T.revert(!1,!0)}),b.start=j,b.end=ie,Ie=Ee=At?ut:q(),!k&&!At&&(Ie<ut&&q(ut),b.scroll.rec=0),b.revert(!1,!0),V=vt(),Dt&&(Y=-1,Dt.restart(!0)),bt=0,r&&$&&(r._initted||Nn)&&r.progress()!==Nn&&r.progress(Nn||0,!0).render(r.time(),!0,!0),(rt||te!==b.progress||k||p||r&&!r._initted)&&(r&&!$&&(r._initted||te||r.vars.immediateRender!==!1)&&r.totalProgress(k&&j<-.001&&!te?W.utils.normalize(j,ie,0):te,!0),b.progress=rt||(Ie-j)/ye===te?0:te),d&&g&&(Fe._pinOffset=Math.round(b.progress*Ot)),se&&se.invalidate(),isNaN(Kn)||(Kn-=W.getProperty(M,P.p),Wr-=W.getProperty(Ae,P.p),qs(M,P,Kn),qs(Ye,P,Kn-(J||0)),qs(Ae,P,Wr),qs(nt,P,Wr-(J||0))),rt&&!At&&b.update(),u&&!At&&!gt&&(gt=!0,u(b),gt=!1)}},b.getVelocity=function(){return(q()-Ee)/(vt()-Hi)*1e3||0},b.endAnimation=function(){Ii(b.callbackAnimation),r&&(se?se.progress(1):r.paused()?$||Ii(r,b.direction<0,1):Ii(r,r.reversed()))},b.labelToScroll=function(G){return r&&r.labels&&(j||b.refresh()||j)+r.labels[G]/r.duration()*ye||0},b.getTrailing=function(G){var ee=oe.indexOf(b),Q=b.direction>0?oe.slice(0,ee).reverse():oe.slice(ee+1);return(jt(G)?Q.filter(function(J){return J.vars.preventOverlaps===G}):Q).filter(function(J){return b.direction>0?J.end<=j:J.start>=ie})},b.update=function(G,ee,Q){if(!(k&&!Q&&!G)){var J=At===!0?ut:b.scroll(),Ue=G?0:(J-j)/ye,fe=Ue<0?0:Ue>1?1:Ue||0,$e=b.progress,rt,De,Me,ge,_t,Oe,yt,cn;if(ee&&(Ee=Ie,Ie=k?q():J,w&&(Wt=qt,qt=r&&!$?r.totalProgress():fe)),m&&d&&!bt&&!Fs&&yn&&(!fe&&j<J+(J-Ee)/(vt()-Hi)*m?fe=1e-4:fe===1&&ie>J+(J-Ee)/(vt()-Hi)*m&&(fe=.9999)),fe!==$e&&b.enabled){if(rt=b.isActive=!!fe&&fe<1,De=!!$e&&$e<1,Oe=rt!==De,_t=Oe||!!fe!=!!$e,b.direction=fe>$e?1:-1,b.progress=fe,_t&&!bt&&(Me=fe&&!$e?0:fe===1?1:$e===1?2:3,$&&(ge=!Oe&&F[Me+1]!=="none"&&F[Me+1]||F[Me],cn=r&&(ge==="complete"||ge==="reset"||ge in r))),E&&(Oe||cn)&&(cn||f||!r)&&(wt(E)?E(b):b.getTrailing(E).forEach(function(un){return un.endAnimation()})),$||(se&&!bt&&!Fs?(se._dp._time-se._start!==se._time&&se.render(se._dp._time-se._start),se.resetTo?se.resetTo("totalProgress",fe,r._tTime/r._tDur):(se.vars.totalProgress=fe,se.invalidate().restart())):r&&r.totalProgress(fe,!!(bt&&(V||G)))),d){if(G&&g&&(Fe.style[g+P.os2]=Qn),!B)Xt(Xi(Tt+Ot*fe));else if(_t){if(yt=!G&&fe>$e&&ie+1>J&&J+1>=On(_,P),S)if(!G&&(rt||yt)){var Ze=Yn(d,!0),Je=J-j;Kc(d,be,Ze.top+(P===tt?Je:0)+et,Ze.left+(P===tt?0:Je)+et)}else Kc(d,Fe);pi(rt||yt?Ne:ct),Lt&&fe<1&&rt||Xt(Tt+(fe===1&&!yt?Ot:0))}}w&&!_e.tween&&!bt&&!Fs&&Dt.restart(!0),a&&(Oe||x&&fe&&(fe<1||!na))&&_s(a.targets).forEach(function(un){return un.classList[rt||x?"add":"remove"](a.className)}),o&&!$&&!G&&o(b),_t&&!bt?($&&(cn&&(ge==="complete"?r.pause().totalProgress(1):ge==="reset"?r.restart(!0).pause():ge==="restart"?r.restart(!0):r[ge]()),o&&o(b)),(Oe||!na)&&(c&&Oe&&Kr(b,c),I[Me]&&Kr(b,I[Me]),x&&(fe===1?b.kill(!1,1):I[Me]=0),Oe||(Me=fe===1?1:3,I[Me]&&Kr(b,I[Me]))),A&&!rt&&Math.abs(b.getVelocity())>(qi(A)?A:2500)&&(Ii(b.callbackAnimation),se?se.progress(1):Ii(r,ge==="reverse"?1:!fe,1))):$&&o&&!bt&&o(b)}if(vn){var it=k?J/k.duration()*(k._caScrollDist||0):J;In(it+(M._isFlipped?1:0)),vn(it)}Fn&&Fn(-J/k.duration()*(k._caScrollDist||0))}},b.enable=function(G,ee){b.enabled||(b.enabled=!0,ot(_,"resize",Wi),N||ot(_,"scroll",Jr),H&&ot(i,"refreshInit",H),G!==!1&&(b.progress=te=0,Ie=Ee=Y=q()),ee!==!1&&b.refresh())},b.getTween=function(G){return G&&_e?_e.tween:se},b.setPositions=function(G,ee,Q,J){if(k){var Ue=k.scrollTrigger,fe=k.duration(),$e=Ue.end-Ue.start;G=Ue.start+$e*G/fe,ee=Ue.start+$e*ee/fe}b.refresh(!1,!1,{start:Hc(G,Q&&!!b._startClamp),end:Hc(ee,Q&&!!b._endClamp)},J),b.update()},b.adjustPinSpacing=function(G){if(Le&&G){var ee=Le.indexOf(P.d)+1;Le[ee]=parseFloat(Le[ee])+G+et,Le[1]=parseFloat(Le[1])+G+et,pi(Le)}},b.disable=function(G,ee){if(G!==!1&&b.revert(!0,!0),b.enabled&&(b.enabled=b.isActive=!1,ee||se&&se.pause(),ut=0,Se&&(Se.uncache=1),H&&st(i,"refreshInit",H),Dt&&(Dt.pause(),_e.tween&&_e.tween.kill()&&(_e.tween=0)),!N)){for(var Q=oe.length;Q--;)if(oe[Q].scroller===_&&oe[Q]!==b)return;st(_,"resize",Wi),N||st(_,"scroll",Jr)}},b.kill=function(G,ee){b.disable(G,ee),se&&!ee&&se.kill(),l&&delete Ya[l];var Q=oe.indexOf(b);Q>=0&&oe.splice(Q,1),Q===Pt&&so>0&&Pt--,Q=0,oe.forEach(function(J){return J.scroller===b.scroller&&(Q=1)}),Q||At||(b.scroll.rec=0),r&&(r.scrollTrigger=null,G&&r.revert({kill:!1}),ee||r.kill()),Ye&&[Ye,nt,M,Ae].forEach(function(J){return J.parentNode&&J.parentNode.removeChild(J)}),os===b&&(os=0),d&&(Se&&(Se.uncache=1),Q=0,oe.forEach(function(J){return J.pin===d&&Q++}),Q||(Se.spacer=0)),t.onKill&&t.onKill(b)},oe.push(b),b.enable(!1,!1),ft&&ft(b),r&&r.add&&!ye){var ue=b.update;b.update=function(){b.update=ue,le.cache++,j||ie||b.refresh()},W.delayedCall(.01,b.update),ye=.01,j=ie=0}else b.refresh();d&&Om()},i.register=function(t){return ei||(W=t||id(),rd()&&window.document&&i.enable(),ei=Yi),ei},i.defaults=function(t){if(t)for(var r in t)Hs[r]=t[r];return Hs},i.disable=function(t,r){Yi=0,oe.forEach(function(o){return o[r?"kill":"disable"](t)}),st(ae,"wheel",Jr),st(we,"scroll",Jr),clearInterval(Ns),st(we,"touchcancel",Pn),st(be,"touchstart",Pn),Gs(st,we,"pointerdown,touchstart,mousedown",Yc),Gs(st,we,"pointerup,touchend,mouseup",Xc),wo.kill(),$s(st);for(var s=0;s<le.length;s+=3)Bs(st,le[s],le[s+1]),Bs(st,le[s],le[s+2])},i.enable=function(){if(ae=window,we=document,Jt=we.documentElement,be=we.body,W){if(_s=W.utils.toArray,es=W.utils.clamp,Ba=W.core.context||Pn,ta=W.core.suppressOverwrites||Pn,_l=ae.history.scrollRestoration||"auto",Xa=ae.pageYOffset||0,W.core.globals("ScrollTrigger",i),be){Yi=1,hi=document.createElement("div"),hi.style.height="100vh",hi.style.position="absolute",pd(),Tm(),Ve.register(W),i.isTouch=Ve.isTouch,Jn=Ve.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),Ga=Ve.isTouch===1,ot(ae,"wheel",Jr),ml=[ae,we,Jt,be],W.matchMedia?(i.matchMedia=function(u){var f=W.matchMedia(),h;for(h in u)f.add(h,u[h]);return f},W.addEventListener("matchMediaInit",function(){dd(),Sl()}),W.addEventListener("matchMediaRevert",function(){return fd()}),W.addEventListener("matchMedia",function(){Ar(0,1),Xr("matchMedia")}),W.matchMedia().add("(orientation: portrait)",function(){return ia(),ia})):console.warn("Requires GSAP 3.11.0 or later"),ia(),ot(we,"scroll",Jr);var t=be.hasAttribute("style"),r=be.style,s=r.borderTopStyle,o=W.core.Animation.prototype,a,l;for(o.revert||Object.defineProperty(o,"revert",{value:function(){return this.time(-.01,!0)}}),r.borderTopStyle="solid",a=Yn(be),tt.m=Math.round(a.top+tt.sc())||0,Rt.m=Math.round(a.left+Rt.sc())||0,s?r.borderTopStyle=s:r.removeProperty("border-top-style"),t||(be.setAttribute("style",""),be.removeAttribute("style")),Ns=setInterval(Vc,250),W.delayedCall(.5,function(){return Fs=0}),ot(we,"touchcancel",Pn),ot(be,"touchstart",Pn),Gs(ot,we,"pointerdown,touchstart,mousedown",Yc),Gs(ot,we,"pointerup,touchend,mouseup",Xc),$a=W.utils.checkPrefix("transform"),oo.push($a),ei=vt(),wo=W.delayedCall(.2,Ar).pause(),ti=[we,"visibilitychange",function(){var u=ae.innerWidth,f=ae.innerHeight;we.hidden?($c=u,Gc=f):($c!==u||Gc!==f)&&Wi()},we,"DOMContentLoaded",Ar,ae,"load",Ar,ae,"resize",Wi],$s(ot),oe.forEach(function(u){return u.enable(0,1)}),l=0;l<le.length;l+=3)Bs(st,le[l],le[l+1]),Bs(st,le[l],le[l+2])}else if(we){var c=function u(){i.enable(),we.removeEventListener("DOMContentLoaded",u)};we.addEventListener("DOMContentLoaded",c)}}},i.config=function(t){"limitCallbacks"in t&&(na=!!t.limitCallbacks);var r=t.syncInterval;r&&clearInterval(Ns)||(Ns=r)&&setInterval(Vc,r),"ignoreMobileResize"in t&&(Ga=i.isTouch===1&&t.ignoreMobileResize),"autoRefreshEvents"in t&&($s(st)||$s(ot,t.autoRefreshEvents||"none"),ed=(t.autoRefreshEvents+"").indexOf("resize")===-1)},i.scrollerProxy=function(t,r){var s=zt(t),o=le.indexOf(s),a=Hr(s);~o&&le.splice(o,a?6:2),r&&(a?Dn.unshift(ae,r,be,r,Jt,r):Dn.unshift(s,r))},i.clearMatchMedia=function(t){oe.forEach(function(r){return r._ctx&&r._ctx.query===t&&r._ctx.kill(!0,!0)})},i.isInViewport=function(t,r,s){var o=(jt(t)?zt(t):t).getBoundingClientRect(),a=o[s?Nr:Fr]*r||0;return s?o.right-a>0&&o.left+a<ae.innerWidth:o.bottom-a>0&&o.top+a<ae.innerHeight},i.positionInViewport=function(t,r,s){jt(t)&&(t=zt(t));var o=t.getBoundingClientRect(),a=o[s?Nr:Fr],l=r==null?a/2:r in ko?ko[r]*a:~r.indexOf("%")?parseFloat(r)*a/100:parseFloat(r)||0;return s?(o.left+l)/ae.innerWidth:(o.top+l)/ae.innerHeight},i.killAll=function(t){if(oe.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),t!==!0){var r=Yr.killAll||[];Yr={},r.forEach(function(s){return s()})}},i}();ce.version="3.15.0";ce.saveStyles=function(i){return i?_s(i).forEach(function(e){if(e&&e.style){var n=Ut.indexOf(e);n>=0&&Ut.splice(n,5),Ut.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),W.core.getCache(e),Ba())}}):Ut};ce.revert=function(i,e){return Sl(!i,e)};ce.create=function(i,e){return new ce(i,e)};ce.refresh=function(i){return i?Wi(!0):(ei||ce.register())&&Ar(!0)};ce.update=function(i){return++le.cache&&Vn(i===!0?2:0)};ce.clearScrollMemory=hd;ce.maxScroll=function(i,e){return On(i,e?Rt:tt)};ce.getScrollFunc=function(i,e){return pr(zt(i),e?Rt:tt)};ce.getById=function(i){return Ya[i]};ce.getAll=function(){return oe.filter(function(i){return i.vars.id!=="ScrollSmoother"})};ce.isScrolling=function(){return!!yn};ce.snapDirectional=wl;ce.addEventListener=function(i,e){var n=Yr[i]||(Yr[i]=[]);~n.indexOf(e)||n.push(e)};ce.removeEventListener=function(i,e){var n=Yr[i],t=n&&n.indexOf(e);t>=0&&n.splice(t,1)};ce.batch=function(i,e){var n=[],t={},r=e.interval||.016,s=e.batchMax||1e9,o=function(c,u){var f=[],h=[],d=W.delayedCall(r,function(){u(f,h),f=[],h=[]}).pause();return function(g){f.length||d.restart(!0),f.push(g.trigger),h.push(g),s<=f.length&&d.progress(1)}},a;for(a in e)t[a]=a.substr(0,2)==="on"&&wt(e[a])&&a!=="onRefreshInit"?o(a,e[a]):e[a];return wt(s)&&(s=s(),ot(ce,"refresh",function(){return s=e.batchMax()})),_s(i).forEach(function(l){var c={};for(a in t)c[a]=t[a];c.trigger=l,n.push(ce.create(c))}),n};var Jc=function(e,n,t,r){return n>r?e(r):n<0&&e(0),t>r?(r-n)/(t-n):t<0?n/(n-t):1},oa=function i(e,n){n===!0?e.style.removeProperty("touch-action"):e.style.touchAction=n===!0?"auto":n?"pan-"+n+(Ve.isTouch?" pinch-zoom":""):"none",e===Jt&&i(be,n)},Ws={auto:1,scroll:1},Nm=function(e){var n=e.event,t=e.target,r=e.axis,s=(n.changedTouches?n.changedTouches[0]:n).target,o=s._gsap||W.core.getCache(s),a=vt(),l;if(!o._isScrollT||a-o._isScrollT>2e3){for(;s&&s!==be&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(Ws[(l=gn(s)).overflowY]||Ws[l.overflowX]));)s=s.parentNode;o._isScroll=s&&s!==t&&!Hr(s)&&(Ws[(l=gn(s)).overflowY]||Ws[l.overflowX]),o._isScrollT=a}(o._isScroll||r==="x")&&(n.stopPropagation(),n._gsapAllow=!0)},md=function(e,n,t,r){return Ve.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:n,onWheel:r=r&&Nm,onPress:r,onDrag:r,onScroll:r,onEnable:function(){return t&&ot(we,Ve.eventTypes[0],tu,!1,!0)},onDisable:function(){return st(we,Ve.eventTypes[0],tu,!0)}})},Fm=/(input|label|select|textarea)/i,eu,tu=function(e){var n=Fm.test(e.target.tagName);(n||eu)&&(e._gsapAllow=!0,eu=n)},$m=function(e){Tr(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var n=e,t=n.normalizeScrollX,r=n.momentum,s=n.allowNestedScroll,o=n.onRelease,a,l,c=zt(e.target)||Jt,u=W.core.globals().ScrollSmoother,f=u&&u.get(),h=Jn&&(e.content&&zt(e.content)||f&&e.content!==!1&&!f.smooth()&&f.content()),d=pr(c,tt),g=pr(c,Rt),p=1,m=(Ve.isTouch&&ae.visualViewport?ae.visualViewport.scale*ae.visualViewport.width:ae.outerWidth)/ae.innerWidth,v=0,y=wt(r)?function(){return r(a)}:function(){return r||2.8},x,w,S=md(c,e.type,!0,s),C=function(){return w=!1},k=Pn,A=Pn,E=function(){l=On(c,tt),A=es(Jn?1:0,l),t&&(k=es(0,On(c,Rt))),x=$r},P=function(){h._gsap.y=Xi(parseFloat(h._gsap.y)+d.offset)+"px",h.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(h._gsap.y)+", 0, 1)",d.offset=d.cacheID=0},$=function(){if(w){requestAnimationFrame(C);var R=Xi(a.deltaY/2),L=A(d.v-R);if(h&&L!==d.v+d.offset){d.offset=L-d.v;var b=Xi((parseFloat(h&&h._gsap.y)||0)-d.offset);h.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+b+", 0, 1)",h._gsap.y=b+"px",d.cacheID=le.cache,Vn()}return!0}d.offset&&P(),w=!0},_,z,N,B,I=function(){E(),_.isActive()&&_.vars.scrollY>l&&(d()>l?_.progress(1)&&d(l):_.resetTo("scrollY",l))};return h&&W.set(h,{y:"+=0"}),e.ignoreCheck=function(F){return Jn&&F.type==="touchmove"&&$()||p>1.05&&F.type!=="touchstart"||a.isGesturing||F.touches&&F.touches.length>1},e.onPress=function(){w=!1;var F=p;p=Xi((ae.visualViewport&&ae.visualViewport.scale||1)/m),_.pause(),F!==p&&oa(c,p>1.01?!0:t?!1:"x"),z=g(),N=d(),E(),x=$r},e.onRelease=e.onGestureStart=function(F,R){if(d.offset&&P(),!R)B.restart(!0);else{le.cache++;var L=y(),b,H;t&&(b=g(),H=b+L*.05*-F.velocityX/.227,L*=Jc(g,b,H,On(c,Rt)),_.vars.scrollX=k(H)),b=d(),H=b+L*.05*-F.velocityY/.227,L*=Jc(d,b,H,On(c,tt)),_.vars.scrollY=A(H),_.invalidate().duration(L).play(.01),(Jn&&_.vars.scrollY>=l||b>=l-1)&&W.to({},{onUpdate:I,duration:L})}o&&o(F)},e.onWheel=function(){_._ts&&_.pause(),vt()-v>1e3&&(x=0,v=vt())},e.onChange=function(F,R,L,b,H){if($r!==x&&E(),R&&t&&g(k(b[2]===R?z+(F.startX-F.x):g()+R-b[1])),L){d.offset&&P();var U=H[2]===L,D=U?N+F.startY-F.y:d()+L-H[1],Y=A(D);U&&D!==Y&&(N+=Y-D),d(Y)}(L||R)&&Vn()},e.onEnable=function(){oa(c,t?!1:"x"),ce.addEventListener("refresh",I),ot(ae,"resize",I),d.smooth&&(d.target.style.scrollBehavior="auto",d.smooth=g.smooth=!1),S.enable()},e.onDisable=function(){oa(c,!0),st(ae,"resize",I),ce.removeEventListener("refresh",I),S.kill()},e.lockAxis=e.lockAxis!==!1,a=new Ve(e),a.iOS=Jn,Jn&&!d()&&d(1),Jn&&W.ticker.add(Pn),B=a._dc,_=W.to(a,{ease:"power4",paused:!0,inherit:!1,scrollX:t?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:gd(d,d(),function(){return _.pause()})},onUpdate:Vn,onComplete:B.vars.onComplete}),a};ce.sort=function(i){if(wt(i))return oe.sort(i);var e=ae.pageYOffset||0;return ce.getAll().forEach(function(n){return n._sortY=n.trigger?e+n.trigger.getBoundingClientRect().top:n.start+ae.innerHeight}),oe.sort(i||function(n,t){return(n.vars.refreshPriority||0)*-1e6+(n.vars.containerAnimation?1e6:n._sortY)-((t.vars.containerAnimation?1e6:t._sortY)+(t.vars.refreshPriority||0)*-1e6)})};ce.observe=function(i){return new Ve(i)};ce.normalizeScroll=function(i){if(typeof i>"u")return Mt;if(i===!0&&Mt)return Mt.enable();if(i===!1){Mt&&Mt.kill(),Mt=i;return}var e=i instanceof Ve?i:$m(i);return Mt&&Mt.target===e.target&&Mt.kill(),Hr(e.target)&&(Mt=e),e};ce.core={_getVelocityProp:Fa,_inputObserver:md,_scrollers:le,_proxies:Dn,bridge:{ss:function(){yn||Xr("scrollStart"),yn=vt()},ref:function(){return bt}}};id()&&W.registerPlugin(ce);St.registerPlugin(ce);function nu(i){i.querySelectorAll(".chapter-panel h2, .atlas-panel h2").forEach(e=>e0(e))}const ru=Object.assign({"./chapters/ch1.ts":c0,"./chapters/ch2.ts":U0,"./chapters/ch3.ts":ag,"./chapters/ch4.ts":_g,"./chapters/ch5.ts":Qg,"./chapters/ch6.ts":om,"./chapters/ch7.ts":pm,"./chapters/ch8.ts":vm}),Gm=Object.keys(ru).map(i=>{const e=i.match(/\/(ch\d+)\.ts$/);return e?{id:e[1],num:parseInt(e[1].slice(2),10),create:ru[i].createChapter}:null}).filter(i=>i!==null).sort((i,e)=>i.num-e.num);function Bm(i,e){const n=[],t=[];return Gm.forEach((r,s)=>{const o=document.getElementById(r.id);if(!o)throw new Error(`缺少章节容器 #${r.id}（检查 index.html）`);const a=lg[r.id];if(!a)throw new Error(`COPY 缺少 ${r.id} 文案`);const l=r.create({sky:i,root:o,copy:a,id:r.id});n.push(l),t.push(ce.create({trigger:o,start:"top top",end:"bottom bottom",scrub:!0,onEnter:()=>{l.enter(),nu(o)},onEnterBack:()=>{l.enter(),nu(o)},onLeave:()=>l.exit(),onLeaveBack:()=>l.exit(),onUpdate:c=>{l.update(c.progress),e(s+c.progress)}}))}),{chapters:n,triggers:t}}const To=30,iu=.22,Hm=`
.app-cursor-ring, .app-cursor-dot {
  position: fixed; top: 0; left: 0; z-index: 60; pointer-events: none;
  border-radius: 50%; transform: translate(-50%, -50%);
  will-change: transform;
}
.app-cursor-ring {
  width: ${To}px; height: ${To}px;
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
`;function Ym(i){if(window.matchMedia("(pointer: coarse)").matches)return;const e=document.createElement("style");e.textContent=Hm,document.head.appendChild(e);const n=document.createElement("div");n.className="app-cursor-ring app-cursor-hidden";const t=document.createElement("div");t.className="app-cursor-dot app-cursor-hidden",document.body.append(n,t);let r=-100,s=-100,o=-100,a=-100,l=!1,c=!1;const u=document.querySelector(".sky-tooltip");window.addEventListener("pointermove",d=>{const g=d.target===i;r=d.clientX,s=d.clientY,g!==l&&(l=g,n.classList.toggle("app-cursor-hidden",!l),t.classList.toggle("app-cursor-hidden",!l))}),window.addEventListener("pointerdown",()=>{c=!0,n.classList.add("is-down")}),window.addEventListener("pointerup",()=>{c=!1,n.classList.remove("is-down")}),document.documentElement.addEventListener("mouseleave",()=>{l=!1,n.classList.add("app-cursor-hidden"),t.classList.add("app-cursor-hidden")});let f=1;const h=()=>{o+=(r-o)*iu,a+=(s-a)*iu;const d=u!==null&&u.style.display==="block",g=(d?.55:1)*(c?.8:1);f+=(g-f)*.2,n.classList.toggle("is-star",d),n.style.transform=`translate(${o-To/2}px, ${a-To/2}px) scale(${f.toFixed(3)})`,t.style.transform=`translate(${r-2}px, ${s-2}px)`,requestAnimationFrame(h)};requestAnimationFrame(h)}const Xm=1.015,su={ra:192.8595,dec:27.1283},ou={ra:266.405,dec:-28.9362},qm=.085,Wm=.14,Vm=.9,Um=.6,jm=new hu(.96,.9,.78),Qm=new hu(1,.88,.68),Km=`
varying vec3 vDir;
void main() {
  // 球心在原点：物体空间坐标即天球方向（随父组岁差旋转，与星点行为一致）
  vDir = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,Zm=`
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
`;function Jm(i){const e=new re(...Ht(su.ra,su.dec)).normalize(),n=new re(...Ht(ou.ra,ou.dec)),t=n.addScaledVector(e,-n.dot(e)).normalize(),r=new re().crossVectors(e,t).normalize(),s=new Bd(i*Xm,96,64),o=new lu({vertexShader:Km,fragmentShader:Zm,uniforms:{uPole:{value:e},uE0:{value:t},uE1:{value:r},uPeakAlpha:{value:qm},uWidth:{value:Wm},uCenterSigma:{value:Vm},uDust:{value:Um},uColorBand:{value:jm},uColorCore:{value:Qm}},transparent:!0,depthWrite:!1,blending:Gr,side:Hd}),a=new lo(s,o);a.name="milkyway-shell";const l=new kn;return l.name="milkyway",l.add(a),{group:l,dispose(){s.dispose(),o.dispose()}}}function _d(){document.fullscreenEnabled&&(document.fullscreenElement?Promise.resolve(document.exitFullscreen()).catch(()=>{}):Promise.resolve(document.documentElement.requestFullscreen()).catch(()=>{}))}const e1=`
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
`;function t1({sections:i,names:e}){const n=document.createElement("style");n.textContent=e1,document.head.appendChild(n);const t=document.createElement("div");t.className="app-pager";const r=document.createElement("button");r.className="app-pager-btn",r.type="button",r.setAttribute("aria-label","上一章"),r.textContent="‹";const s=document.createElement("span");s.className="app-pager-idx";const o=document.createElement("button");if(o.className="app-pager-btn",o.type="button",o.setAttribute("aria-label","下一章"),o.textContent="›",document.fullscreenEnabled){const h=document.createElement("button");h.className="app-pager-btn",h.type="button";const d=()=>{const g=!!document.fullscreenElement;h.textContent=g?"✕":"⛶",h.setAttribute("aria-label",g?"退出全屏（F）":"进入全屏（F）")};h.addEventListener("click",_d),document.addEventListener("fullscreenchange",d),d(),t.append(r,s,o,h)}else t.append(r,s,o);document.body.appendChild(t);const a=i.length-1;let l=0;function c(){const h=window.innerHeight,d=[];for(const g of i){const p=g.offsetTop,m=Math.max(g.offsetHeight-h,0),v=Math.round(m/h);for(let y=0;y<=v;y++)d.push(p+Math.min(y*h,m))}return d.sort((g,p)=>g-p)}function u(){s.textContent=e[l]?`${e[l]} · ${l+1}/${i.length}`:`${l+1}/${i.length}`;const h=document.documentElement.scrollHeight-window.innerHeight;r.disabled=window.scrollY<=2,o.disabled=window.scrollY>=h-2}function f(h){var x,w,S;const d=c(),g=window.scrollY,p=2,m=h>0?d.find(C=>C>g+p)??d[d.length-1]:[...d].reverse().find(C=>C<g-p)??0;if(m===void 0)return;let v=0;for(let C=0;C<i.length;C++)i[C].offsetTop<=m+p&&(v=C);const y=((S=(w=(x=i[v])==null?void 0:x.querySelector("h1, h2"))==null?void 0:w.textContent)==null?void 0:S.trim())||e[v]||"";Zp(y,()=>window.scrollTo({top:m,behavior:"instant"}))}return r.addEventListener("click",()=>f(-1)),o.addEventListener("click",()=>f(1)),window.addEventListener("scroll",u,{passive:!0}),u(),{setCurrent(h){const d=Math.min(Math.max(Math.round(h),0),a);d!==l&&(l=d,u())}}}const n1=3.5;function r1(){try{const i=document.createElement("canvas");return!!(i.getContext("webgl2")||i.getContext("webgl"))}catch{return!1}}function au(i){var t,r,s;const e=document.getElementById("fallback");e&&(e.hidden=!1);const n=document.getElementById("fallback-diag");n&&(n.textContent=`诊断信息：${i}`),(t=document.getElementById("chapters"))==null||t.setAttribute("hidden",""),(r=document.getElementById("sky-canvas"))==null||r.setAttribute("hidden",""),(s=document.getElementById("loading"))==null||s.remove()}async function i1(){const i=document.getElementById("sky-canvas");if(!i)throw new Error("缺少 #sky-canvas");const e=new Da(i);Ym(i);const n=document.getElementById("loading");try{await e.init()}catch(u){console.error(u),n&&(n.textContent="星空数据加载失败，请检查开发服务器");return}n==null||n.remove(),e.addSkyObject(Jm(ve).group),gh(),Jp("步天歌");const t=new _o(i0),r=[1,2,3,4,5,6,7,8].map(u=>document.getElementById(`ch${u}`)),s=["序","星野","授时","天人","天球","岁差","对话","尾声"],o=t1({sections:r,names:s});window.addEventListener("keydown",u=>{if(u.key!=="f"&&u.key!=="F"||u.ctrlKey||u.metaKey||u.altKey)return;const f=u.target;f&&(f.tagName==="INPUT"||f.tagName==="TEXTAREA"||f.isContentEditable)||_d()});let a=0,l=0;const{chapters:c}=Bm(e,u=>{a=u,o.setCurrent(Math.min(Math.floor(u),s.length-1))});e.start(u=>{var h,d;l+=(a-l)*(1-Math.exp(-u*n1)),e.applyCameraState(t.sampleGlobal(l));const f=Math.min(Math.max(Math.floor(l),0),c.length-1);(d=(h=c[f])==null?void 0:h.frame)==null||d.call(h,u)})}r1()?i1().catch(i=>{console.error(i),au(i instanceof Error?i.message:String(i))}):au("当前浏览器环境无法创建 WebGL 上下文（webgl2 / webgl 均不可用）");
