var Md=Object.defineProperty;var Pd=(i,e,n)=>e in i?Md(i,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):i[e]=n;var X=(i,e,n)=>Pd(i,typeof e!="symbol"?e+"":e,n);import{M as ua,V as re,Q as Wt,r as Yt,a as Pe,G as kn,S as ja,A as Yr,b as Qa,B as cs,c as ar,D as No,d as fu,P as Ka,C as Ao,e as Ln,w as du,f as hu,L as pu,g as Ad,h as Rd,E as $i,W as Od,i as Ld,j as Dd,k as zd,l as Id,m as Nd,n as Fd,o as $d,p as Gd,q as Bd,s as Cl,t as Yd,u as Ml,v as Hd,x as Pl,y as Xd,z as fo,T as gu,F as qd,H as Vd,I as mu,J as Wd,K as Ud}from"./detailCard-hyfERk3D.js";const jd=.5,_u=1.5,Qd=8,Kd=400,Zd=.03,Jd=55,eh=82.4,Al=3,th=.5,nh=.28,rh=900,ih=.035,sh=.018,oh=24,Rl=6e3,ah=15e3,lh=220,Ol=[0,2,5,7,9,12,14,17,19,21,24],ch=3,uh=.996,fh=2600,Ll=.05,dh=.1,hh=.6,ph=`
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
`,gh=`
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
</svg>`;let Dl=!1,Kt=null,Xn=!1,Fo=0,Ks=null;const zl=new Map;function mh(i){const e=i.sampleRate,n=Math.floor(Qd*e),t=i.createBuffer(1,n,e),r=t.getChannelData(0);let s=0;for(let a=0;a<n;a++){const l=Math.random()*2-1;s=(s+.02*l)/1.02,r[a]=s*3.5}const o=Math.min(Math.floor(e*.1),n>>2);for(let a=0;a<o;a++){const l=a/o;r[n-o+a]=r[n-o+a]*(1-l)+r[a]*l}return t}function _h(i,e){const n=i.sampleRate,t=Math.floor(ch*n),r=i.createBuffer(1,t,n),s=r.getChannelData(0),o=Math.max(2,Math.round(n/e)),a=new Float32Array(o);for(let c=0;c<o;c++)a[c]=Math.random()*2-1;let l=0;for(let c=0;c<t;c++){const u=(l+1)%o;s[c]=a[l],a[l]=uh*.5*(a[l]+a[u]),l=u}return r}function yh(i){const e=i.createGain();e.gain.value=0,e.connect(i.destination);const n=i.createBufferSource();n.buffer=mh(i),n.loop=!0;const t=i.createBiquadFilter();t.type="lowpass",t.frequency.value=Kd;const r=i.createGain();r.gain.value=Zd,n.connect(t).connect(r).connect(e),n.start();const s=i.createBiquadFilter();s.type="lowpass",s.frequency.value=rh;const o=i.createGain();o.gain.value=ih,s.connect(o).connect(e);const a=i.createOscillator();a.type="sine",a.frequency.value=Jd,a.detune.value=-Al;const l=i.createGain();l.gain.value=th,a.connect(l).connect(s);const c=i.createOscillator();c.type="triangle",c.frequency.value=eh,c.detune.value=Al;const u=i.createGain();u.gain.value=nh,c.connect(u).connect(s);const f=i.createOscillator();f.type="sine",f.frequency.value=1/oh;const h=i.createGain();return h.gain.value=sh,f.connect(h).connect(o.gain),a.start(),c.start(),f.start(),{ctx:i,master:e}}function bh({ctx:i,master:e}){const n=Ol[Math.floor(Math.random()*Ol.length)],t=lh*Math.pow(2,n/12);let r=zl.get(t);r||(r=_h(i,t),zl.set(t,r));const s=i.createBufferSource();s.buffer=r;const o=i.createBiquadFilter();o.type="lowpass",o.frequency.value=fh;const a=i.createGain();a.gain.value=Ll+Math.random()*(dh-Ll);const l=i.createStereoPanner();l.pan.value=(Math.random()*2-1)*hh,s.connect(o).connect(a).connect(l).connect(e),s.onended=()=>{s.disconnect(),o.disconnect(),a.disconnect(),l.disconnect()},s.start()}function Il(i,e){const n=i.context.currentTime,t=i.gain;t.cancelScheduledValues(n),t.setValueAtTime(t.value,n),t.linearRampToValueAtTime(e,n+_u)}function yu(){Ks!==null&&(window.clearTimeout(Ks),Ks=null)}function bu(){yu(),Ks=window.setTimeout(()=>{Kt&&Xn&&Kt.ctx.state==="running"&&bh(Kt),bu()},Rl+Math.random()*(ah-Rl))}function vu(i){i.classList.toggle("is-on",Xn);const e=Xn?"关闭环境音":"开启环境音";i.setAttribute("aria-label",e),i.setAttribute("aria-pressed",String(Xn)),i.title=e}function xu(){const i=window;return i.AudioContext??i.webkitAudioContext}async function vh(i){if(!Kt){const t=xu();if(!t)return;Kt=yh(new t)}Xn=!Xn,Fo++,vu(i);const{ctx:e,master:n}=Kt;if(Xn)e.state!=="running"&&await e.resume().catch(()=>{}),Il(n,jd),bu();else{Il(n,0),yu();const t=Fo;window.setTimeout(()=>{Kt&&!Xn&&t===Fo&&Kt.ctx.state==="running"&&Kt.ctx.suspend()},(_u+.1)*1e3)}}function xh(){if(Dl||typeof document>"u")return;Dl=!0;const i=document.createElement("style");i.textContent=ph,document.head.appendChild(i);const e=document.createElement("button");if(e.type="button",e.className="app-ambient-toggle",e.innerHTML=gh,document.body.appendChild(e),!xu()){e.disabled=!0,e.setAttribute("aria-label","环境音不可用"),e.title="当前浏览器不支持 Web Audio";return}vu(e),e.addEventListener("click",()=>{vh(e)}),document.addEventListener("visibilitychange",()=>{Kt&&(document.hidden?Kt.ctx.state==="running"&&Kt.ctx.suspend():Xn&&Kt.ctx.resume())})}function Gn(i){if(i===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return i}function wu(i,e){i.prototype=Object.create(e.prototype),i.prototype.constructor=i,i.__proto__=e}/*!
 * GSAP 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var sn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},us={duration:.5,overwrite:!1,delay:0},Za,gt,ze,mn=1e8,Ee=1/mn,fa=Math.PI*2,wh=fa/4,Sh=0,Su=Math.sqrt,kh=Math.cos,Th=Math.sin,lt=function(e){return typeof e=="string"},Xe=function(e){return typeof e=="function"},Un=function(e){return typeof e=="number"},Ja=function(e){return typeof e>"u"},zn=function(e){return typeof e=="object"},Ft=function(e){return e!==!1},el=function(){return typeof window<"u"},Ss=function(e){return Xe(e)||lt(e)},ku=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},kt=Array.isArray,Eh=/random\([^)]+\)/g,Ch=/,\s*/g,Nl=/(?:-?\.?\d|\.)+/gi,Tu=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,si=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,$o=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Eu=/[+-]=-?[.\d]+/,Mh=/[^,'"\[\]\s]+/gi,Ph=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Be,Cn,da,tl,on={},ho={},Cu,Mu=function(e){return(ho=yi(e,on))&&Ht},nl=function(e,n){return console.warn("Invalid property",e,"set to",n,"Missing plugin? gsap.registerPlugin()")},fs=function(e,n){return!n&&console.warn(e)},Pu=function(e,n){return e&&(on[e]=n)&&ho&&(ho[e]=n)||on},ds=function(){return 0},Ah={suppressEvents:!0,isStart:!0,kill:!1},Zs={suppressEvents:!0,kill:!1},Rh={suppressEvents:!0},rl={},lr=[],ha={},Au,Qt={},Go={},Fl=30,Js=[],il="",sl=function(e){var n=e[0],t,r;if(zn(n)||Xe(n)||(e=[e]),!(t=(n._gsap||{}).harness)){for(r=Js.length;r--&&!Js[r].targetTest(n););t=Js[r]}for(r=e.length;r--;)e[r]&&(e[r]._gsap||(e[r]._gsap=new Zu(e[r],t)))||e.splice(r,1);return e},Lr=function(e){return e._gsap||sl(_n(e))[0]._gsap},Ru=function(e,n,t){return(t=e[n])&&Xe(t)?e[n]():Ja(t)&&e.getAttribute&&e.getAttribute(n)||t},$t=function(e,n){return(e=e.split(",")).forEach(n)||e},Ve=function(e){return Math.round(e*1e5)/1e5||0},Ge=function(e){return Math.round(e*1e7)/1e7||0},ci=function(e,n){var t=n.charAt(0),r=parseFloat(n.substr(2));return e=parseFloat(e),t==="+"?e+r:t==="-"?e-r:t==="*"?e*r:e/r},Oh=function(e,n){for(var t=n.length,r=0;e.indexOf(n[r])<0&&++r<t;);return r<t},po=function(){var e=lr.length,n=lr.slice(0),t,r;for(ha={},lr.length=0,t=0;t<e;t++)r=n[t],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},ol=function(e){return!!(e._initted||e._startAt||e.add)},Ou=function(e,n,t,r){lr.length&&!gt&&po(),e.render(n,t,!!(gt&&n<0&&ol(e))),lr.length&&!gt&&po()},Lu=function(e){var n=parseFloat(e);return(n||n===0)&&(e+"").match(Mh).length<2?n:lt(e)?e.trim():e},Du=function(e){return e},an=function(e,n){for(var t in n)t in e||(e[t]=n[t]);return e},Lh=function(e){return function(n,t){for(var r in t)r in n||r==="duration"&&e||r==="ease"||(n[r]=t[r])}},yi=function(e,n){for(var t in n)e[t]=n[t];return e},$l=function i(e,n){for(var t in n)t!=="__proto__"&&t!=="constructor"&&t!=="prototype"&&(e[t]=zn(n[t])?i(e[t]||(e[t]={}),n[t]):n[t]);return e},go=function(e,n){var t={},r;for(r in e)r in n||(t[r]=e[r]);return t},ji=function(e){var n=e.parent||Be,t=e.keyframes?Lh(kt(e.keyframes)):an;if(Ft(e.inherit))for(;n;)t(e,n.vars.defaults),n=n.parent||n._dp;return e},Dh=function(e,n){for(var t=e.length,r=t===n.length;r&&t--&&e[t]===n[t];);return t<0},zu=function(e,n,t,r,s){var o=e[r],a;if(s)for(a=n[s];o&&o[s]>a;)o=o._prev;return o?(n._next=o._next,o._next=n):(n._next=e[t],e[t]=n),n._next?n._next._prev=n:e[r]=n,n._prev=o,n.parent=n._dp=e,n},Ro=function(e,n,t,r){t===void 0&&(t="_first"),r===void 0&&(r="_last");var s=n._prev,o=n._next;s?s._next=o:e[t]===n&&(e[t]=o),o?o._prev=s:e[r]===n&&(e[r]=s),n._next=n._prev=n.parent=null},dr=function(e,n){e.parent&&(!n||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},Dr=function(e,n){if(e&&(!n||n._end>e._dur||n._start<0))for(var t=e;t;)t._dirty=1,t=t.parent;return e},zh=function(e){for(var n=e.parent;n&&n.parent;)n._dirty=1,n.totalDuration(),n=n.parent;return e},pa=function(e,n,t,r){return e._startAt&&(gt?e._startAt.revert(Zs):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(n,!0,r))},Ih=function i(e){return!e||e._ts&&i(e.parent)},Gl=function(e){return e._repeat?bi(e._tTime,e=e.duration()+e._rDelay)*e:0},bi=function(e,n){var t=Math.floor(e=Ge(e/n));return e&&t===e?t-1:t},mo=function(e,n){return(e-n._start)*n._ts+(n._ts>=0?0:n._dirty?n.totalDuration():n._tDur)},Oo=function(e){return e._end=Ge(e._start+(e._tDur/Math.abs(e._ts||e._rts||Ee)||0))},Lo=function(e,n){var t=e._dp;return t&&t.smoothChildTiming&&e._ts&&(e._start=Ge(t._time-(e._ts>0?n/e._ts:((e._dirty?e.totalDuration():e._tDur)-n)/-e._ts)),Oo(e),t._dirty||Dr(t,e)),e},Iu=function(e,n){var t;if((n._time||!n._dur&&n._initted||n._start<e._time&&(n._dur||!n.add))&&(t=mo(e.rawTime(),n),(!n._dur||xs(0,n.totalDuration(),t)-n._tTime>Ee)&&n.render(t,!0)),Dr(e,n)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(t=e;t._dp;)t.rawTime()>=0&&t.totalTime(t._tTime),t=t._dp;e._zTime=-Ee}},An=function(e,n,t,r){return n.parent&&dr(n),n._start=Ge((Un(t)?t:t||e!==Be?hn(e,t,n):e._time)+n._delay),n._end=Ge(n._start+(n.totalDuration()/Math.abs(n.timeScale())||0)),zu(e,n,"_first","_last",e._sort?"_start":0),ga(n)||(e._recent=n),r||Iu(e,n),e._ts<0&&Lo(e,e._tTime),e},Nu=function(e,n){return(on.ScrollTrigger||nl("scrollTrigger",n))&&on.ScrollTrigger.create(n,e)},Fu=function(e,n,t,r,s){if(ll(e,n,s),!e._initted)return 1;if(!t&&e._pt&&!gt&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&Au!==en.frame)return lr.push(e),e._lazy=[s,r],1},Nh=function i(e){var n=e.parent;return n&&n._ts&&n._initted&&!n._lock&&(n.rawTime()<0||i(n))},ga=function(e){var n=e.data;return n==="isFromStart"||n==="isStart"},Fh=function(e,n,t,r){var s=e.ratio,o=n<0||!n&&(!e._start&&Nh(e)&&!(!e._initted&&ga(e))||(e._ts<0||e._dp._ts<0)&&!ga(e))?0:1,a=e._rDelay,l=0,c,u,f;if(a&&e._repeat&&(l=xs(0,e._tDur,n),u=bi(l,a),e._yoyo&&u&1&&(o=1-o),u!==bi(e._tTime,a)&&(s=1-o,e.vars.repeatRefresh&&e._initted&&e.invalidate())),o!==s||gt||r||e._zTime===Ee||!n&&e._zTime){if(!e._initted&&Fu(e,n,r,t,l))return;for(f=e._zTime,e._zTime=n||(t?Ee:0),t||(t=n&&!f),e.ratio=o,e._from&&(o=1-o),e._time=0,e._tTime=l,c=e._pt;c;)c.r(o,c.d),c=c._next;n<0&&pa(e,n,t,!0),e._onUpdate&&!t&&nn(e,"onUpdate"),l&&e._repeat&&!t&&e.parent&&nn(e,"onRepeat"),(n>=e._tDur||n<0)&&e.ratio===o&&(o&&dr(e,1),!t&&!gt&&(nn(e,o?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=n)},$h=function(e,n,t){var r;if(t>n)for(r=e._first;r&&r._start<=t;){if(r.data==="isPause"&&r._start>n)return r;r=r._next}else for(r=e._last;r&&r._start>=t;){if(r.data==="isPause"&&r._start<n)return r;r=r._prev}},vi=function(e,n,t,r){var s=e._repeat,o=Ge(n)||0,a=e._tTime/e._tDur;return a&&!r&&(e._time*=o/e._dur),e._dur=o,e._tDur=s?s<0?1e10:Ge(o*(s+1)+e._rDelay*s):o,a>0&&!r&&Lo(e,e._tTime=e._tDur*a),e.parent&&Oo(e),t||Dr(e.parent,e),e},Bl=function(e){return e instanceof Nt?Dr(e):vi(e,e._dur)},Gh={_start:0,endTime:ds,totalDuration:ds},hn=function i(e,n,t){var r=e.labels,s=e._recent||Gh,o=e.duration()>=mn?s.endTime(!1):e._dur,a,l,c;return lt(n)&&(isNaN(n)||n in r)?(l=n.charAt(0),c=n.substr(-1)==="%",a=n.indexOf("="),l==="<"||l===">"?(a>=0&&(n=n.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(n.substr(1))||0)*(c?(a<0?s:t).totalDuration()/100:1)):a<0?(n in r||(r[n]=o),r[n]):(l=parseFloat(n.charAt(a-1)+n.substr(a+1)),c&&t&&(l=l/100*(kt(t)?t[0]:t).totalDuration()),a>1?i(e,n.substr(0,a-1),t)+l:o+l)):n==null?o:+n},Qi=function(e,n,t){var r=Un(n[1]),s=(r?2:1)+(e<2?0:1),o=n[s],a,l;if(r&&(o.duration=n[1]),o.parent=t,e){for(a=o,l=t;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=Ft(l.vars.inherit)&&l.parent;o.immediateRender=Ft(a.immediateRender),e<2?o.runBackwards=1:o.startAt=n[s-1]}return new Ke(n[0],o,n[s+1])},mr=function(e,n){return e||e===0?n(e):n},xs=function(e,n,t){return t<e?e:t>n?n:t},wt=function(e,n){return!lt(e)||!(n=Ph.exec(e))?"":n[1]},Bh=function(e,n,t){return mr(t,function(r){return xs(e,n,r)})},ma=[].slice,$u=function(e,n){return e&&zn(e)&&"length"in e&&(!n&&!e.length||e.length-1 in e&&zn(e[0]))&&!e.nodeType&&e!==Cn},Yh=function(e,n,t){return t===void 0&&(t=[]),e.forEach(function(r){var s;return lt(r)&&!n||$u(r,1)?(s=t).push.apply(s,_n(r)):t.push(r)})||t},_n=function(e,n,t){return ze&&!n&&ze.selector?ze.selector(e):lt(e)&&!t&&(da||!xi())?ma.call((n||tl).querySelectorAll(e),0):kt(e)?Yh(e,t):$u(e)?ma.call(e,0):e?[e]:[]},_a=function(e){return e=_n(e)[0]||fs("Invalid scope")||{},function(n){var t=e.current||e.nativeElement||e;return _n(n,t.querySelectorAll?t:t===e?fs("Invalid scope")||tl.createElement("div"):e)}},Gu=function(e){return e.sort(function(){return .5-Math.random()})},Bu=function(e){if(Xe(e))return e;var n=zn(e)?e:{each:e},t=zr(n.ease),r=n.from||0,s=parseFloat(n.base)||0,o={},a=r>0&&r<1,l=isNaN(r)||a,c=n.axis,u=r,f=r;return lt(r)?u=f={center:.5,edges:.5,end:1}[r]||0:!a&&l&&(u=r[0],f=r[1]),function(h,d,g){var p=(g||n).length,m=o[p],v,y,x,w,S,E,k,A,C;if(!m){if(C=n.grid==="auto"?0:(n.grid||[1,mn])[1],!C){for(k=-mn;k<(k=g[C++].getBoundingClientRect().left)&&C<p;);C<p&&C--}for(m=o[p]=[],v=l?Math.min(C,p)*u-.5:r%C,y=C===mn?0:l?p*f/C-.5:r/C|0,k=0,A=mn,E=0;E<p;E++)x=E%C-v,w=y-(E/C|0),m[E]=S=c?Math.abs(c==="y"?w:x):Su(x*x+w*w),S>k&&(k=S),S<A&&(A=S);r==="random"&&Gu(m),m.max=k-A,m.min=A,m.v=p=(parseFloat(n.amount)||parseFloat(n.each)*(C>p?p-1:c?c==="y"?p/C:C:Math.max(C,p/C))||0)*(r==="edges"?-1:1),m.b=p<0?s-p:s,m.u=wt(n.amount||n.each)||0,t=t&&p<0?tp(t):t}return p=(m[h]-m.min)/m.max||0,Ge(m.b+(t?t(p):p)*m.v)+m.u}},ya=function(e){var n=Math.pow(10,((e+"").split(".")[1]||"").length);return function(t){var r=Ge(Math.round(parseFloat(t)/e)*e*n);return(r-r%1)/n+(Un(t)?0:wt(t))}},Yu=function(e,n){var t=kt(e),r,s;return!t&&zn(e)&&(r=t=e.radius||mn,e.values?(e=_n(e.values),(s=!Un(e[0]))&&(r*=r)):e=ya(e.increment)),mr(n,t?Xe(e)?function(o){return s=e(o),Math.abs(s-o)<=r?s:o}:function(o){for(var a=parseFloat(s?o.x:o),l=parseFloat(s?o.y:0),c=mn,u=0,f=e.length,h,d;f--;)s?(h=e[f].x-a,d=e[f].y-l,h=h*h+d*d):h=Math.abs(e[f]-a),h<c&&(c=h,u=f);return u=!r||c<=r?e[u]:o,s||u===o||Un(o)?u:u+wt(o)}:ya(e))},Hu=function(e,n,t,r){return mr(kt(e)?!n:t===!0?!!(t=0):!r,function(){return kt(e)?e[~~(Math.random()*e.length)]:(t=t||1e-5)&&(r=t<1?Math.pow(10,(t+"").length-2):1)&&Math.floor(Math.round((e-t/2+Math.random()*(n-e+t*.99))/t)*t*r)/r})},Hh=function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];return function(r){return n.reduce(function(s,o){return o(s)},r)}},Xh=function(e,n){return function(t){return e(parseFloat(t))+(n||wt(t))}},qh=function(e,n,t){return qu(e,n,0,1,t)},Xu=function(e,n,t){return mr(t,function(r){return e[~~n(r)]})},Vh=function i(e,n,t){var r=n-e;return kt(e)?Xu(e,i(0,e.length),n):mr(t,function(s){return(r+(s-e)%r)%r+e})},Wh=function i(e,n,t){var r=n-e,s=r*2;return kt(e)?Xu(e,i(0,e.length-1),n):mr(t,function(o){return o=(s+(o-e)%s)%s||0,e+(o>r?s-o:o)})},hs=function(e){return e.replace(Eh,function(n){var t=n.indexOf("[")+1,r=n.substring(t||7,t?n.indexOf("]"):n.length-1).split(Ch);return Hu(t?r:+r[0],t?0:+r[1],+r[2]||1e-5)})},qu=function(e,n,t,r,s){var o=n-e,a=r-t;return mr(s,function(l){return t+((l-e)/o*a||0)})},Uh=function i(e,n,t,r){var s=isNaN(e+n)?0:function(d){return(1-d)*e+d*n};if(!s){var o=lt(e),a={},l,c,u,f,h;if(t===!0&&(r=1)&&(t=null),o)e={p:e},n={p:n};else if(kt(e)&&!kt(n)){for(u=[],f=e.length,h=f-2,c=1;c<f;c++)u.push(i(e[c-1],e[c]));f--,s=function(g){g*=f;var p=Math.min(h,~~g);return u[p](g-p)},t=n}else r||(e=yi(kt(e)?[]:{},e));if(!u){for(l in n)al.call(a,e,l,"get",n[l]);s=function(g){return fl(g,a)||(o?e.p:e)}}}return mr(t,s)},Yl=function(e,n,t){var r=e.labels,s=mn,o,a,l;for(o in r)a=r[o]-n,a<0==!!t&&a&&s>(a=Math.abs(a))&&(l=o,s=a);return l},nn=function(e,n,t){var r=e.vars,s=r[n],o=ze,a=e._ctx,l,c,u;if(s)return l=r[n+"Params"],c=r.callbackScope||e,t&&lr.length&&po(),a&&(ze=a),u=l?s.apply(c,l):s.call(c),ze=o,u},Gi=function(e){return dr(e),e.scrollTrigger&&e.scrollTrigger.kill(!!gt),e.progress()<1&&nn(e,"onInterrupt"),e},oi,Vu=[],Wu=function(e){if(e)if(e=!e.name&&e.default||e,el()||e.headless){var n=e.name,t=Xe(e),r=n&&!t&&e.init?function(){this._props=[]}:e,s={init:ds,render:fl,add:al,kill:fp,modifier:up,rawVars:0},o={targetTest:0,get:0,getSetter:ul,aliases:{},register:0};if(xi(),e!==r){if(Qt[n])return;an(r,an(go(e,s),o)),yi(r.prototype,yi(s,go(e,o))),Qt[r.prop=n]=r,e.targetTest&&(Js.push(r),rl[n]=1),n=(n==="css"?"CSS":n.charAt(0).toUpperCase()+n.substr(1))+"Plugin"}Pu(n,r),e.register&&e.register(Ht,r,Gt)}else Vu.push(e)},Te=255,Bi={aqua:[0,Te,Te],lime:[0,Te,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Te],navy:[0,0,128],white:[Te,Te,Te],olive:[128,128,0],yellow:[Te,Te,0],orange:[Te,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Te,0,0],pink:[Te,192,203],cyan:[0,Te,Te],transparent:[Te,Te,Te,0]},Bo=function(e,n,t){return e+=e<0?1:e>1?-1:0,(e*6<1?n+(t-n)*e*6:e<.5?t:e*3<2?n+(t-n)*(2/3-e)*6:n)*Te+.5|0},Uu=function(e,n,t){var r=e?Un(e)?[e>>16,e>>8&Te,e&Te]:0:Bi.black,s,o,a,l,c,u,f,h,d,g;if(!r){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),Bi[e])r=Bi[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),o=e.charAt(2),a=e.charAt(3),e="#"+s+s+o+o+a+a+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return r=parseInt(e.substr(1,6),16),[r>>16,r>>8&Te,r&Te,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),r=[e>>16,e>>8&Te,e&Te]}else if(e.substr(0,3)==="hsl"){if(r=g=e.match(Nl),!n)l=+r[0]%360/360,c=+r[1]/100,u=+r[2]/100,o=u<=.5?u*(c+1):u+c-u*c,s=u*2-o,r.length>3&&(r[3]*=1),r[0]=Bo(l+1/3,s,o),r[1]=Bo(l,s,o),r[2]=Bo(l-1/3,s,o);else if(~e.indexOf("="))return r=e.match(Tu),t&&r.length<4&&(r[3]=1),r}else r=e.match(Nl)||Bi.transparent;r=r.map(Number)}return n&&!g&&(s=r[0]/Te,o=r[1]/Te,a=r[2]/Te,f=Math.max(s,o,a),h=Math.min(s,o,a),u=(f+h)/2,f===h?l=c=0:(d=f-h,c=u>.5?d/(2-f-h):d/(f+h),l=f===s?(o-a)/d+(o<a?6:0):f===o?(a-s)/d+2:(s-o)/d+4,l*=60),r[0]=~~(l+.5),r[1]=~~(c*100+.5),r[2]=~~(u*100+.5)),t&&r.length<4&&(r[3]=1),r},ju=function(e){var n=[],t=[],r=-1;return e.split(cr).forEach(function(s){var o=s.match(si)||[];n.push.apply(n,o),t.push(r+=o.length+1)}),n.c=t,n},Hl=function(e,n,t){var r="",s=(e+r).match(cr),o=n?"hsla(":"rgba(",a=0,l,c,u,f;if(!s)return e;if(s=s.map(function(h){return(h=Uu(h,n,1))&&o+(n?h[0]+","+h[1]+"%,"+h[2]+"%,"+h[3]:h.join(","))+")"}),t&&(u=ju(e),l=t.c,l.join(r)!==u.c.join(r)))for(c=e.replace(cr,"1").split(si),f=c.length-1;a<f;a++)r+=c[a]+(~l.indexOf(a)?s.shift()||o+"0,0,0,0)":(u.length?u:s.length?s:t).shift());if(!c)for(c=e.split(cr),f=c.length-1;a<f;a++)r+=c[a]+s[a];return r+c[f]},cr=function(){var i="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in Bi)i+="|"+e+"\\b";return new RegExp(i+")","gi")}(),jh=/hsl[a]?\(/,Qu=function(e){var n=e.join(" "),t;if(cr.lastIndex=0,cr.test(n))return t=jh.test(n),e[1]=Hl(e[1],t),e[0]=Hl(e[0],t,ju(e[1])),!0},ps,en=function(){var i=Date.now,e=500,n=33,t=i(),r=t,s=1e3/240,o=s,a=[],l,c,u,f,h,d,g=function p(m){var v=i()-r,y=m===!0,x,w,S,E;if((v>e||v<0)&&(t+=v-n),r+=v,S=r-t,x=S-o,(x>0||y)&&(E=++f.frame,h=S-f.time*1e3,f.time=S=S/1e3,o+=x+(x>=s?4:s-x),w=1),y||(l=c(p)),w)for(d=0;d<a.length;d++)a[d](S,h,E,m)};return f={time:0,frame:0,tick:function(){g(!0)},deltaRatio:function(m){return h/(1e3/(m||60))},wake:function(){Cu&&(!da&&el()&&(Cn=da=window,tl=Cn.document||{},on.gsap=Ht,(Cn.gsapVersions||(Cn.gsapVersions=[])).push(Ht.version),Mu(ho||Cn.GreenSockGlobals||!Cn.gsap&&Cn||{}),Vu.forEach(Wu)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&f.sleep(),c=u||function(m){return setTimeout(m,o-f.time*1e3+1|0)},ps=1,g(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),ps=0,c=ds},lagSmoothing:function(m,v){e=m||1/0,n=Math.min(v||33,e)},fps:function(m){s=1e3/(m||240),o=f.time*1e3+s},add:function(m,v,y){var x=v?function(w,S,E,k){m(w,S,E,k),f.remove(x)}:m;return f.remove(m),a[y?"unshift":"push"](x),xi(),x},remove:function(m,v){~(v=a.indexOf(m))&&a.splice(v,1)&&d>=v&&d--},_listeners:a},f}(),xi=function(){return!ps&&en.wake()},he={},Qh=/^[\d.\-M][\d.\-,\s]/,Kh=/["']/g,Zh=function(e){for(var n={},t=e.substr(1,e.length-3).split(":"),r=t[0],s=1,o=t.length,a,l,c;s<o;s++)l=t[s],a=s!==o-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),n[r]=isNaN(c)?c.replace(Kh,"").trim():+c,r=l.substr(a+1).trim();return n},Jh=function(e){var n=e.indexOf("(")+1,t=e.indexOf(")"),r=e.indexOf("(",n);return e.substring(n,~r&&r<t?e.indexOf(")",t+1):t)},ep=function(e){var n=(e+"").split("("),t=he[n[0]];return t&&n.length>1&&t.config?t.config.apply(null,~e.indexOf("{")?[Zh(n[1])]:Jh(e).split(",").map(Lu)):he._CE&&Qh.test(e)?he._CE("",e):t},tp=function(e){return function(n){return 1-e(1-n)}},zr=function(e,n){return e&&(Xe(e)?e:he[e]||ep(e))||n},Wr=function(e,n,t,r){t===void 0&&(t=function(l){return 1-n(1-l)}),r===void 0&&(r=function(l){return l<.5?n(l*2)/2:1-n((1-l)*2)/2});var s={easeIn:n,easeOut:t,easeInOut:r},o;return $t(e,function(a){he[a]=on[a]=s,he[o=a.toLowerCase()]=t;for(var l in s)he[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=he[a+"."+l]=s[l]}),s},Ku=function(e){return function(n){return n<.5?(1-e(1-n*2))/2:.5+e((n-.5)*2)/2}},Yo=function i(e,n,t){var r=n>=1?n:1,s=(t||(e?.3:.45))/(n<1?n:1),o=s/fa*(Math.asin(1/r)||0),a=function(u){return u===1?1:r*Math.pow(2,-10*u)*Th((u-o)*s)+1},l=e==="out"?a:e==="in"?function(c){return 1-a(1-c)}:Ku(a);return s=fa/s,l.config=function(c,u){return i(e,c,u)},l},Ho=function i(e,n){n===void 0&&(n=1.70158);var t=function(o){return o?--o*o*((n+1)*o+n)+1:0},r=e==="out"?t:e==="in"?function(s){return 1-t(1-s)}:Ku(t);return r.config=function(s){return i(e,s)},r};$t("Linear,Quad,Cubic,Quart,Quint,Strong",function(i,e){var n=e<5?e+1:e;Wr(i+",Power"+(n-1),e?function(t){return Math.pow(t,n)}:function(t){return t},function(t){return 1-Math.pow(1-t,n)},function(t){return t<.5?Math.pow(t*2,n)/2:1-Math.pow((1-t)*2,n)/2})});he.Linear.easeNone=he.none=he.Linear.easeIn;Wr("Elastic",Yo("in"),Yo("out"),Yo());(function(i,e){var n=1/e,t=2*n,r=2.5*n,s=function(a){return a<n?i*a*a:a<t?i*Math.pow(a-1.5/e,2)+.75:a<r?i*(a-=2.25/e)*a+.9375:i*Math.pow(a-2.625/e,2)+.984375};Wr("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);Wr("Expo",function(i){return Math.pow(2,10*(i-1))*i+i*i*i*i*i*i*(1-i)});Wr("Circ",function(i){return-(Su(1-i*i)-1)});Wr("Sine",function(i){return i===1?1:-kh(i*wh)+1});Wr("Back",Ho("in"),Ho("out"),Ho());he.SteppedEase=he.steps=on.SteppedEase={config:function(e,n){e===void 0&&(e=1);var t=1/e,r=e+(n?0:1),s=n?1:0,o=1-Ee;return function(a){return((r*xs(0,o,a)|0)+s)*t}}};us.ease=he["quad.out"];$t("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(i){return il+=i+","+i+"Params,"});var Zu=function(e,n){this.id=Sh++,e._gsap=this,this.target=e,this.harness=n,this.get=n?n.get:Ru,this.set=n?n.getSetter:ul},gs=function(){function i(n){this.vars=n,this._delay=+n.delay||0,(this._repeat=n.repeat===1/0?-2:n.repeat||0)&&(this._rDelay=n.repeatDelay||0,this._yoyo=!!n.yoyo||!!n.yoyoEase),this._ts=1,vi(this,+n.duration,1,1),this.data=n.data,ze&&(this._ctx=ze,ze.data.push(this)),ps||en.wake()}var e=i.prototype;return e.delay=function(t){return t||t===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+t-this._delay),this._delay=t,this):this._delay},e.duration=function(t){return arguments.length?this.totalDuration(this._repeat>0?t+(t+this._rDelay)*this._repeat:t):this.totalDuration()&&this._dur},e.totalDuration=function(t){return arguments.length?(this._dirty=0,vi(this,this._repeat<0?t:(t-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(t,r){if(xi(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(Lo(this,t),!s._dp||s.parent||Iu(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&t<this._tDur||this._ts<0&&t>0||!this._tDur&&!t)&&An(this._dp,this,this._start-this._delay)}return(this._tTime!==t||!this._dur&&!r||this._initted&&Math.abs(this._zTime)===Ee||!this._initted&&this._dur&&t||!t&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=t),Ou(this,t,r)),this},e.time=function(t,r){return arguments.length?this.totalTime(Math.min(this.totalDuration(),t+Gl(this))%(this._dur+this._rDelay)||(t?this._dur:0),r):this._time},e.totalProgress=function(t,r){return arguments.length?this.totalTime(this.totalDuration()*t,r):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(t,r){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-t:t)+Gl(this),r):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(t,r){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(t-1)*s,r):this._repeat?bi(this._tTime,s)+1:1},e.timeScale=function(t,r){if(!arguments.length)return this._rts===-Ee?0:this._rts;if(this._rts===t)return this;var s=this.parent&&this._ts?mo(this.parent._time,this):this._tTime;return this._rts=+t||0,this._ts=this._ps||t===-Ee?0:this._rts,this.totalTime(xs(-Math.abs(this._delay),this.totalDuration(),s),r!==!1),Oo(this),zh(this)},e.paused=function(t){return arguments.length?(this._ps!==t&&(this._ps=t,t?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(xi(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==Ee&&(this._tTime-=Ee)))),this):this._ps},e.startTime=function(t){if(arguments.length){this._start=Ge(t);var r=this.parent||this._dp;return r&&(r._sort||!this.parent)&&An(r,this,this._start-this._delay),this}return this._start},e.endTime=function(t){return this._start+(Ft(t)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(t){var r=this.parent||this._dp;return r?t&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?mo(r.rawTime(t),this):this._tTime:this._tTime},e.revert=function(t){t===void 0&&(t=Rh);var r=gt;return gt=t,ol(this)&&(this.timeline&&this.timeline.revert(t),this.totalTime(-.01,t.suppressEvents)),this.data!=="nested"&&t.kill!==!1&&this.kill(),gt=r,this},e.globalTime=function(t){for(var r=this,s=arguments.length?t:r.rawTime();r;)s=r._start+s/(Math.abs(r._ts)||1),r=r._dp;return!this.parent&&this._sat?this._sat.globalTime(t):s},e.repeat=function(t){return arguments.length?(this._repeat=t===1/0?-2:t,Bl(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(t){if(arguments.length){var r=this._time;return this._rDelay=t,Bl(this),r?this.time(r):this}return this._rDelay},e.yoyo=function(t){return arguments.length?(this._yoyo=t,this):this._yoyo},e.seek=function(t,r){return this.totalTime(hn(this,t),Ft(r))},e.restart=function(t,r){return this.play().totalTime(t?-this._delay:0,Ft(r)),this._dur||(this._zTime=-Ee),this},e.play=function(t,r){return t!=null&&this.seek(t,r),this.reversed(!1).paused(!1)},e.reverse=function(t,r){return t!=null&&this.seek(t||this.totalDuration(),r),this.reversed(!0).paused(!1)},e.pause=function(t,r){return t!=null&&this.seek(t,r),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(t){return arguments.length?(!!t!==this.reversed()&&this.timeScale(-this._rts||(t?-Ee:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-Ee,this},e.isActive=function(){var t=this.parent||this._dp,r=this._start,s;return!!(!t||this._ts&&this._initted&&t.isActive()&&(s=t.rawTime(!0))>=r&&s<this.endTime(!0)-Ee)},e.eventCallback=function(t,r,s){var o=this.vars;return arguments.length>1?(r?(o[t]=r,s&&(o[t+"Params"]=s),t==="onUpdate"&&(this._onUpdate=r)):delete o[t],this):o[t]},e.then=function(t){var r=this,s=r._prom;return new Promise(function(o){var a=Xe(t)?t:Du,l=function(){var u=r.then;r.then=null,s&&s(),Xe(a)&&(a=a(r))&&(a.then||a===r)&&(r.then=u),o(a),r.then=u};r._initted&&r.totalProgress()===1&&r._ts>=0||!r._tTime&&r._ts<0?l():r._prom=l})},e.kill=function(){Gi(this)},i}();an(gs.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-Ee,_prom:0,_ps:!1,_rts:1});var Nt=function(i){wu(e,i);function e(t,r){var s;return t===void 0&&(t={}),s=i.call(this,t)||this,s.labels={},s.smoothChildTiming=!!t.smoothChildTiming,s.autoRemoveChildren=!!t.autoRemoveChildren,s._sort=Ft(t.sortChildren),Be&&An(t.parent||Be,Gn(s),r),t.reversed&&s.reverse(),t.paused&&s.paused(!0),t.scrollTrigger&&Nu(Gn(s),t.scrollTrigger),s}var n=e.prototype;return n.to=function(r,s,o){return Qi(0,arguments,this),this},n.from=function(r,s,o){return Qi(1,arguments,this),this},n.fromTo=function(r,s,o,a){return Qi(2,arguments,this),this},n.set=function(r,s,o){return s.duration=0,s.parent=this,ji(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new Ke(r,s,hn(this,o),1),this},n.call=function(r,s,o){return An(this,Ke.delayedCall(0,r,s),o)},n.staggerTo=function(r,s,o,a,l,c,u){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=c,o.onCompleteParams=u,o.parent=this,new Ke(r,o,hn(this,l)),this},n.staggerFrom=function(r,s,o,a,l,c,u){return o.runBackwards=1,ji(o).immediateRender=Ft(o.immediateRender),this.staggerTo(r,s,o,a,l,c,u)},n.staggerFromTo=function(r,s,o,a,l,c,u,f){return a.startAt=o,ji(a).immediateRender=Ft(a.immediateRender),this.staggerTo(r,s,a,l,c,u,f)},n.render=function(r,s,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=r<=0?0:Ge(r),f=this._zTime<0!=r<0&&(this._initted||!c),h,d,g,p,m,v,y,x,w,S,E,k;if(this!==Be&&u>l&&r>=0&&(u=l),u!==this._tTime||o||f){if(a!==this._time&&c&&(u+=this._time-a,r+=this._time-a),h=u,w=this._start,x=this._ts,v=!x,f&&(c||(a=this._zTime),(r||!s)&&(this._zTime=r)),this._repeat){if(E=this._yoyo,m=c+this._rDelay,this._repeat<-1&&r<0)return this.totalTime(m*100+r,s,o);if(h=Ge(u%m),u===l?(p=this._repeat,h=c):(S=Ge(u/m),p=~~S,p&&p===S&&(h=c,p--),h>c&&(h=c)),S=bi(this._tTime,m),!a&&this._tTime&&S!==p&&this._tTime-S*m-this._dur<=0&&(S=p),E&&p&1&&(h=c-h,k=1),p!==S&&!this._lock){var A=E&&S&1,C=A===(E&&p&1);if(p<S&&(A=!A),a=A?0:u%c?c:u,this._lock=1,this.render(a||(k?0:Ge(p*m)),s,!c)._lock=0,this._tTime=u,!s&&this.parent&&nn(this,"onRepeat"),this.vars.repeatRefresh&&!k&&(this.invalidate()._lock=1,S=p),a&&a!==this._time||v!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,C&&(this._lock=2,a=A?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!k&&this.invalidate()),this._lock=0,!this._ts&&!v)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(y=$h(this,Ge(a),Ge(h)),y&&(u-=h-(h=y._start))),this._tTime=u,this._time=h,this._act=!!x,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=r,a=0),!a&&u&&c&&!s&&!S&&(nn(this,"onStart"),this._tTime!==u))return this;if(h>=a&&r>=0)for(d=this._first;d;){if(g=d._next,(d._act||h>=d._start)&&d._ts&&y!==d){if(d.parent!==this)return this.render(r,s,o);if(d.render(d._ts>0?(h-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(h-d._start)*d._ts,s,o),h!==this._time||!this._ts&&!v){y=0,g&&(u+=this._zTime=-Ee);break}}d=g}else{d=this._last;for(var P=r<0?r:h;d;){if(g=d._prev,(d._act||P<=d._end)&&d._ts&&y!==d){if(d.parent!==this)return this.render(r,s,o);if(d.render(d._ts>0?(P-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(P-d._start)*d._ts,s,o||gt&&ol(d)),h!==this._time||!this._ts&&!v){y=0,g&&(u+=this._zTime=P?-Ee:Ee);break}}d=g}}if(y&&!s&&(this.pause(),y.render(h>=a?0:-Ee)._zTime=h>=a?1:-1,this._ts))return this._start=w,Oo(this),this.render(r,s,o);this._onUpdate&&!s&&nn(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&a)&&(w===this._start||Math.abs(x)!==Math.abs(this._ts))&&(this._lock||((r||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&dr(this,1),!s&&!(r<0&&!a)&&(u||a||!l)&&(nn(this,u===l&&r>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},n.add=function(r,s){var o=this;if(Un(s)||(s=hn(this,s,r)),!(r instanceof gs)){if(kt(r))return r.forEach(function(a){return o.add(a,s)}),this;if(lt(r))return this.addLabel(r,s);if(Xe(r))r=Ke.delayedCall(0,r);else return this}return this!==r?An(this,r,s):this},n.getChildren=function(r,s,o,a){r===void 0&&(r=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-mn);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof Ke?s&&l.push(c):(o&&l.push(c),r&&l.push.apply(l,c.getChildren(!0,s,o)))),c=c._next;return l},n.getById=function(r){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===r)return s[o]},n.remove=function(r){return lt(r)?this.removeLabel(r):Xe(r)?this.killTweensOf(r):(r.parent===this&&Ro(this,r),r===this._recent&&(this._recent=this._last),Dr(this))},n.totalTime=function(r,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Ge(en.time-(this._ts>0?r/this._ts:(this.totalDuration()-r)/-this._ts))),i.prototype.totalTime.call(this,r,s),this._forcing=0,this):this._tTime},n.addLabel=function(r,s){return this.labels[r]=hn(this,s),this},n.removeLabel=function(r){return delete this.labels[r],this},n.addPause=function(r,s,o){var a=Ke.delayedCall(0,s||ds,o);return a.data="isPause",this._hasPause=1,An(this,a,hn(this,r))},n.removePause=function(r){var s=this._first;for(r=hn(this,r);s;)s._start===r&&s.data==="isPause"&&dr(s),s=s._next},n.killTweensOf=function(r,s,o){for(var a=this.getTweensOf(r,o),l=a.length;l--;)tr!==a[l]&&a[l].kill(r,s);return this},n.getTweensOf=function(r,s){for(var o=[],a=_n(r),l=this._first,c=Un(s),u;l;)l instanceof Ke?Oh(l._targets,a)&&(c?(!tr||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&o.push(l):(u=l.getTweensOf(a,s)).length&&o.push.apply(o,u),l=l._next;return o},n.tweenTo=function(r,s){s=s||{};var o=this,a=hn(o,r),l=s,c=l.startAt,u=l.onStart,f=l.onStartParams,h=l.immediateRender,d,g=Ke.to(o,an({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale())||Ee,onStart:function(){if(o.pause(),!d){var m=s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale());g._dur!==m&&vi(g,m,0,1).render(g._time,!0,!0),d=1}u&&u.apply(g,f||[])}},s));return h?g.render(0):g},n.tweenFromTo=function(r,s,o){return this.tweenTo(s,an({startAt:{time:hn(this,r)}},o))},n.recent=function(){return this._recent},n.nextLabel=function(r){return r===void 0&&(r=this._time),Yl(this,hn(this,r))},n.previousLabel=function(r){return r===void 0&&(r=this._time),Yl(this,hn(this,r),1)},n.currentLabel=function(r){return arguments.length?this.seek(r,!0):this.previousLabel(this._time+Ee)},n.shiftChildren=function(r,s,o){o===void 0&&(o=0);var a=this._first,l=this.labels,c;for(r=Ge(r);a;)a._start>=o&&(a._start+=r,a._end+=r),a=a._next;if(s)for(c in l)l[c]>=o&&(l[c]+=r);return Dr(this)},n.invalidate=function(r){var s=this._first;for(this._lock=0;s;)s.invalidate(r),s=s._next;return i.prototype.invalidate.call(this,r)},n.clear=function(r){r===void 0&&(r=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),r&&(this.labels={}),Dr(this)},n.totalDuration=function(r){var s=0,o=this,a=o._last,l=mn,c,u,f;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-r:r));if(o._dirty){for(f=o.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),u=a._start,u>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,An(o,a,u-a._delay,1)._lock=0):l=u,u<0&&a._ts&&(s-=u,(!f&&!o._dp||f&&f.smoothChildTiming)&&(o._start+=Ge(u/o._ts),o._time-=u,o._tTime-=u),o.shiftChildren(-u,!1,-1/0),l=0),a._end>s&&a._ts&&(s=a._end),a=c;vi(o,o===Be&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},e.updateRoot=function(r){if(Be._ts&&(Ou(Be,mo(r,Be)),Au=en.frame),en.frame>=Fl){Fl+=sn.autoSleep||120;var s=Be._first;if((!s||!s._ts)&&sn.autoSleep&&en._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||en.sleep()}}},e}(gs);an(Nt.prototype,{_lock:0,_hasPause:0,_forcing:0});var np=function(e,n,t,r,s,o,a){var l=new Gt(this._pt,e,n,0,1,sf,null,s),c=0,u=0,f,h,d,g,p,m,v,y;for(l.b=t,l.e=r,t+="",r+="",(v=~r.indexOf("random("))&&(r=hs(r)),o&&(y=[t,r],o(y,e,n),t=y[0],r=y[1]),h=t.match($o)||[];f=$o.exec(r);)g=f[0],p=r.substring(c,f.index),d?d=(d+1)%5:p.substr(-5)==="rgba("&&(d=1),g!==h[u++]&&(m=parseFloat(h[u-1])||0,l._pt={_next:l._pt,p:p||u===1?p:",",s:m,c:g.charAt(1)==="="?ci(m,g)-m:parseFloat(g)-m,m:d&&d<4?Math.round:0},c=$o.lastIndex);return l.c=c<r.length?r.substring(c,r.length):"",l.fp=a,(Eu.test(r)||v)&&(l.e=0),this._pt=l,l},al=function(e,n,t,r,s,o,a,l,c,u){Xe(r)&&(r=r(s||0,e,o));var f=e[n],h=t!=="get"?t:Xe(f)?c?e[n.indexOf("set")||!Xe(e["get"+n.substr(3)])?n:"get"+n.substr(3)](c):e[n]():f,d=Xe(f)?c?ap:nf:cl,g;if(lt(r)&&(~r.indexOf("random(")&&(r=hs(r)),r.charAt(1)==="="&&(g=ci(h,r)+(wt(h)||0),(g||g===0)&&(r=g))),!u||h!==r||ba)return!isNaN(h*r)&&r!==""?(g=new Gt(this._pt,e,n,+h||0,r-(h||0),typeof f=="boolean"?cp:rf,0,d),c&&(g.fp=c),a&&g.modifier(a,this,e),this._pt=g):(!f&&!(n in e)&&nl(n,r),np.call(this,e,n,h,r,d,l||sn.stringFilter,c))},rp=function(e,n,t,r,s){if(Xe(e)&&(e=Ki(e,s,n,t,r)),!zn(e)||e.style&&e.nodeType||kt(e)||ku(e))return lt(e)?Ki(e,s,n,t,r):e;var o={},a;for(a in e)o[a]=Ki(e[a],s,n,t,r);return o},Ju=function(e,n,t,r,s,o){var a,l,c,u;if(Qt[e]&&(a=new Qt[e]).init(s,a.rawVars?n[e]:rp(n[e],r,s,o,t),t,r,o)!==!1&&(t._pt=l=new Gt(t._pt,s,e,0,1,a.render,a,0,a.priority),t!==oi))for(c=t._ptLookup[t._targets.indexOf(s)],u=a._props.length;u--;)c[a._props[u]]=l;return a},tr,ba,ll=function i(e,n,t){var r=e.vars,s=r.ease,o=r.startAt,a=r.immediateRender,l=r.lazy,c=r.onUpdate,u=r.runBackwards,f=r.yoyoEase,h=r.keyframes,d=r.autoRevert,g=e._dur,p=e._startAt,m=e._targets,v=e.parent,y=v&&v.data==="nested"?v.vars.targets:m,x=e._overwrite==="auto"&&!Za,w=e.timeline,S=r.easeReverse||f,E,k,A,C,P,$,_,z,N,B,I,F,R;if(w&&(!h||!s)&&(s="none"),e._ease=zr(s,us.ease),e._rEase=S&&(zr(S)||e._ease),e._from=!w&&!!r.runBackwards,e._from&&(e.ratio=1),!w||h&&!r.stagger){if(z=m[0]?Lr(m[0]).harness:0,F=z&&r[z.prop],E=go(r,rl),p&&(p._zTime<0&&p.progress(1),n<0&&u&&a&&!d?p.render(-1,!0):p.revert(u&&g?Zs:Ah),p._lazy=0),o){if(dr(e._startAt=Ke.set(m,an({data:"isStart",overwrite:!1,parent:v,immediateRender:!0,lazy:!p&&Ft(l),startAt:null,delay:0,onUpdate:c&&function(){return nn(e,"onUpdate")},stagger:0},o))),e._startAt._dp=0,e._startAt._sat=e,n<0&&(gt||!a&&!d)&&e._startAt.revert(Zs),a&&g&&n<=0&&t<=0){n&&(e._zTime=n);return}}else if(u&&g&&!p){if(n&&(a=!1),A=an({overwrite:!1,data:"isFromStart",lazy:a&&!p&&Ft(l),immediateRender:a,stagger:0,parent:v},E),F&&(A[z.prop]=F),dr(e._startAt=Ke.set(m,A)),e._startAt._dp=0,e._startAt._sat=e,n<0&&(gt?e._startAt.revert(Zs):e._startAt.render(-1,!0)),e._zTime=n,!a)i(e._startAt,Ee,Ee);else if(!n)return}for(e._pt=e._ptCache=0,l=g&&Ft(l)||l&&!g,k=0;k<m.length;k++){if(P=m[k],_=P._gsap||sl(m)[k]._gsap,e._ptLookup[k]=B={},ha[_.id]&&lr.length&&po(),I=y===m?k:y.indexOf(P),z&&(N=new z).init(P,F||E,e,I,y)!==!1&&(e._pt=C=new Gt(e._pt,P,N.name,0,1,N.render,N,0,N.priority),N._props.forEach(function(L){B[L]=C}),N.priority&&($=1)),!z||F)for(A in E)Qt[A]&&(N=Ju(A,E,e,I,P,y))?N.priority&&($=1):B[A]=C=al.call(e,P,A,"get",E[A],I,y,0,r.stringFilter);e._op&&e._op[k]&&e.kill(P,e._op[k]),x&&e._pt&&(tr=e,Be.killTweensOf(P,B,e.globalTime(n)),R=!e.parent,tr=0),e._pt&&l&&(ha[_.id]=1)}$&&of(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!R,h&&n<=0&&w.render(mn,!0,!0)},ip=function(e,n,t,r,s,o,a,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[n],u,f,h,d;if(!c)for(c=e._ptCache[n]=[],h=e._ptLookup,d=e._targets.length;d--;){if(u=h[d][n],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==n&&u.fp!==n;)u=u._next;if(!u)return ba=1,e.vars[n]="+=0",ll(e,a),ba=0,l?fs(n+" not eligible for reset. Try splitting into individual properties"):1;c.push(u)}for(d=c.length;d--;)f=c[d],u=f._pt||f,u.s=(r||r===0)&&!s?r:u.s+(r||0)+o*u.c,u.c=t-u.s,f.e&&(f.e=Ve(t)+wt(f.e)),f.b&&(f.b=u.s+wt(f.b))},sp=function(e,n){var t=e[0]?Lr(e[0]).harness:0,r=t&&t.aliases,s,o,a,l;if(!r)return n;s=yi({},n);for(o in r)if(o in s)for(l=r[o].split(","),a=l.length;a--;)s[l[a]]=s[o];return s},op=function(e,n,t,r){var s=n.ease||r||"power1.inOut",o,a;if(kt(n))a=t[e]||(t[e]=[]),n.forEach(function(l,c){return a.push({t:c/(n.length-1)*100,v:l,e:s})});else for(o in n)a=t[o]||(t[o]=[]),o==="ease"||a.push({t:parseFloat(e),v:n[o],e:s})},Ki=function(e,n,t,r,s){return Xe(e)?e.call(n,t,r,s):lt(e)&&~e.indexOf("random(")?hs(e):e},ef=il+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",tf={};$t(ef+",id,stagger,delay,duration,paused,scrollTrigger",function(i){return tf[i]=1});var Ke=function(i){wu(e,i);function e(t,r,s,o){var a;typeof r=="number"&&(s.duration=r,r=s,s=null),a=i.call(this,o?r:ji(r))||this;var l=a.vars,c=l.duration,u=l.delay,f=l.immediateRender,h=l.stagger,d=l.overwrite,g=l.keyframes,p=l.defaults,m=l.scrollTrigger,v=r.parent||Be,y=(kt(t)||ku(t)?Un(t[0]):"length"in r)?[t]:_n(t),x,w,S,E,k,A,C,P;if(a._targets=y.length?sl(y):fs("GSAP target "+t+" not found. https://gsap.com",!sn.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=d,g||h||Ss(c)||Ss(u)){r=a.vars;var $=r.easeReverse||r.yoyoEase;if(x=a.timeline=new Nt({data:"nested",defaults:p||{},targets:v&&v.data==="nested"?v.vars.targets:y}),x.kill(),x.parent=x._dp=Gn(a),x._start=0,h||Ss(c)||Ss(u)){if(E=y.length,C=h&&Bu(h),zn(h))for(k in h)~ef.indexOf(k)&&(P||(P={}),P[k]=h[k]);for(w=0;w<E;w++)S=go(r,tf),S.stagger=0,$&&(S.easeReverse=$),P&&yi(S,P),A=y[w],S.duration=+Ki(c,Gn(a),w,A,y),S.delay=(+Ki(u,Gn(a),w,A,y)||0)-a._delay,!h&&E===1&&S.delay&&(a._delay=u=S.delay,a._start+=u,S.delay=0),x.to(A,S,C?C(w,A,y):0),x._ease=he.none;x.duration()?c=u=0:a.timeline=0}else if(g){ji(an(x.vars.defaults,{ease:"none"})),x._ease=zr(g.ease||r.ease||"none");var _=0,z,N,B;if(kt(g))g.forEach(function(I){return x.to(y,I,">")}),x.duration();else{S={};for(k in g)k==="ease"||k==="easeEach"||op(k,g[k],S,g.easeEach);for(k in S)for(z=S[k].sort(function(I,F){return I.t-F.t}),_=0,w=0;w<z.length;w++)N=z[w],B={ease:N.e,duration:(N.t-(w?z[w-1].t:0))/100*c},B[k]=N.v,x.to(y,B,_),_+=B.duration;x.duration()<c&&x.to({},{duration:c-x.duration()})}}c||a.duration(c=x.duration())}else a.timeline=0;return d===!0&&!Za&&(tr=Gn(a),Be.killTweensOf(y),tr=0),An(v,Gn(a),s),r.reversed&&a.reverse(),r.paused&&a.paused(!0),(f||!c&&!g&&a._start===Ge(v._time)&&Ft(f)&&Ih(Gn(a))&&v.data!=="nested")&&(a._tTime=-Ee,a.render(Math.max(0,-u)||0)),m&&Nu(Gn(a),m),a}var n=e.prototype;return n.render=function(r,s,o){var a=this._time,l=this._tDur,c=this._dur,u=r<0,f=r>l-Ee&&!u?l:r<Ee?0:r,h,d,g,p,m,v,y,x;if(!c)Fh(this,r,s,o);else if(f!==this._tTime||!r||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(h=f,x=this.timeline,this._repeat){if(p=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(p*100+r,s,o);if(h=Ge(f%p),f===l?(g=this._repeat,h=c):(m=Ge(f/p),g=~~m,g&&g===m?(h=c,g--):h>c&&(h=c)),v=this._yoyo&&g&1,v&&(h=c-h),m=bi(this._tTime,p),h===a&&!o&&this._initted&&g===m)return this._tTime=f,this;g!==m&&this.vars.repeatRefresh&&!v&&!this._lock&&h!==p&&this._initted&&(this._lock=o=1,this.render(Ge(p*g),!0).invalidate()._lock=0)}if(!this._initted){if(Fu(this,u?r:h,o,s,f))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&g!==m))return this;if(c!==this._dur)return this.render(r,s,o)}if(this._rEase){var w=h<a;if(w!==this._inv){var S=w?a:c-a;this._inv=w,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=a,this._invRecip=S?(w?-1:1)/S:0,this._invScale=w?-this.ratio:1-this.ratio,this._invEase=w?this._rEase:this._ease}this.ratio=y=this._invRatio+this._invScale*this._invEase((h-this._invTime)*this._invRecip)}else this.ratio=y=this._ease(h/c);if(this._from&&(this.ratio=y=1-y),this._tTime=f,this._time=h,!this._act&&this._ts&&(this._act=1,this._lazy=0),!a&&f&&!s&&!m&&(nn(this,"onStart"),this._tTime!==f))return this;for(d=this._pt;d;)d.r(y,d.d),d=d._next;x&&x.render(r<0?r:x._dur*x._ease(h/this._dur),s,o)||this._startAt&&(this._zTime=r),this._onUpdate&&!s&&(u&&pa(this,r,s,o),nn(this,"onUpdate")),this._repeat&&g!==m&&this.vars.onRepeat&&!s&&this.parent&&nn(this,"onRepeat"),(f===this._tDur||!f)&&this._tTime===f&&(u&&!this._onUpdate&&pa(this,r,!0,!0),(r||!c)&&(f===this._tDur&&this._ts>0||!f&&this._ts<0)&&dr(this,1),!s&&!(u&&!a)&&(f||a||v)&&(nn(this,f===l?"onComplete":"onReverseComplete",!0),this._prom&&!(f<l&&this.timeScale()>0)&&this._prom()))}return this},n.targets=function(){return this._targets},n.invalidate=function(r){return(!r||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(r),i.prototype.invalidate.call(this,r)},n.resetTo=function(r,s,o,a,l){ps||en.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||ll(this,c),u=this._ease(c/this._dur),ip(this,r,s,o,a,u,c,l)?this.resetTo(r,s,o,a,1):(Lo(this,0),this.parent||zu(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},n.kill=function(r,s){if(s===void 0&&(s="all"),!r&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?Gi(this):this.scrollTrigger&&this.scrollTrigger.kill(!!gt),this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(r,s,tr&&tr.vars.overwrite!==!0)._first||Gi(this),this.parent&&o!==this.timeline.totalDuration()&&vi(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=r?_n(r):a,c=this._ptLookup,u=this._pt,f,h,d,g,p,m,v;if((!s||s==="all")&&Dh(a,l))return s==="all"&&(this._pt=0),Gi(this);for(f=this._op=this._op||[],s!=="all"&&(lt(s)&&(p={},$t(s,function(y){return p[y]=1}),s=p),s=sp(a,s)),v=a.length;v--;)if(~l.indexOf(a[v])){h=c[v],s==="all"?(f[v]=s,g=h,d={}):(d=f[v]=f[v]||{},g=s);for(p in g)m=h&&h[p],m&&((!("kill"in m.d)||m.d.kill(p)===!0)&&Ro(this,m,"_pt"),delete h[p]),d!=="all"&&(d[p]=1)}return this._initted&&!this._pt&&u&&Gi(this),this},e.to=function(r,s){return new e(r,s,arguments[2])},e.from=function(r,s){return Qi(1,arguments)},e.delayedCall=function(r,s,o,a){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:r,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},e.fromTo=function(r,s,o){return Qi(2,arguments)},e.set=function(r,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(r,s)},e.killTweensOf=function(r,s,o){return Be.killTweensOf(r,s,o)},e}(gs);an(Ke.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});$t("staggerTo,staggerFrom,staggerFromTo",function(i){Ke[i]=function(){var e=new Nt,n=ma.call(arguments,0);return n.splice(i==="staggerFromTo"?5:4,0,0),e[i].apply(e,n)}});var cl=function(e,n,t){return e[n]=t},nf=function(e,n,t){return e[n](t)},ap=function(e,n,t,r){return e[n](r.fp,t)},lp=function(e,n,t){return e.setAttribute(n,t)},ul=function(e,n){return Xe(e[n])?nf:Ja(e[n])&&e.setAttribute?lp:cl},rf=function(e,n){return n.set(n.t,n.p,Math.round((n.s+n.c*e)*1e6)/1e6,n)},cp=function(e,n){return n.set(n.t,n.p,!!(n.s+n.c*e),n)},sf=function(e,n){var t=n._pt,r="";if(!e&&n.b)r=n.b;else if(e===1&&n.e)r=n.e;else{for(;t;)r=t.p+(t.m?t.m(t.s+t.c*e):Math.round((t.s+t.c*e)*1e4)/1e4)+r,t=t._next;r+=n.c}n.set(n.t,n.p,r,n)},fl=function(e,n){for(var t=n._pt;t;)t.r(e,t.d),t=t._next},up=function(e,n,t,r){for(var s=this._pt,o;s;)o=s._next,s.p===r&&s.modifier(e,n,t),s=o},fp=function(e){for(var n=this._pt,t,r;n;)r=n._next,n.p===e&&!n.op||n.op===e?Ro(this,n,"_pt"):n.dep||(t=1),n=r;return!t},dp=function(e,n,t,r){r.mSet(e,n,r.m.call(r.tween,t,r.mt),r)},of=function(e){for(var n=e._pt,t,r,s,o;n;){for(t=n._next,r=s;r&&r.pr>n.pr;)r=r._next;(n._prev=r?r._prev:o)?n._prev._next=n:s=n,(n._next=r)?r._prev=n:o=n,n=t}e._pt=s},Gt=function(){function i(n,t,r,s,o,a,l,c,u){this.t=t,this.s=s,this.c=o,this.p=r,this.r=a||rf,this.d=l||this,this.set=c||cl,this.pr=u||0,this._next=n,n&&(n._prev=this)}var e=i.prototype;return e.modifier=function(t,r,s){this.mSet=this.mSet||this.set,this.set=dp,this.m=t,this.mt=s,this.tween=r},i}();$t(il+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(i){return rl[i]=1});on.TweenMax=on.TweenLite=Ke;on.TimelineLite=on.TimelineMax=Nt;Be=new Nt({sortChildren:!1,defaults:us,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});sn.stringFilter=Qu;var Ir=[],eo={},hp=[],Xl=0,pp=0,Xo=function(e){return(eo[e]||hp).map(function(n){return n()})},va=function(){var e=Date.now(),n=[];e-Xl>2&&(Xo("matchMediaInit"),Ir.forEach(function(t){var r=t.queries,s=t.conditions,o,a,l,c;for(a in r)o=Cn.matchMedia(r[a]).matches,o&&(l=1),o!==s[a]&&(s[a]=o,c=1);c&&(t.revert(),l&&n.push(t))}),Xo("matchMediaRevert"),n.forEach(function(t){return t.onMatch(t,function(r){return t.add(null,r)})}),Xl=e,Xo("matchMedia"))},af=function(){function i(n,t){this.selector=t&&_a(t),this.data=[],this._r=[],this.isReverted=!1,this.id=pp++,n&&this.add(n)}var e=i.prototype;return e.add=function(t,r,s){Xe(t)&&(s=r,r=t,t=Xe);var o=this,a=function(){var c=ze,u=o.selector,f;return c&&c!==o&&c.data.push(o),s&&(o.selector=_a(s)),ze=o,f=r.apply(o,arguments),Xe(f)&&o._r.push(f),ze=c,o.selector=u,o.isReverted=!1,f};return o.last=a,t===Xe?a(o,function(l){return o.add(null,l)}):t?o[t]=a:a},e.ignore=function(t){var r=ze;ze=null,t(this),ze=r},e.getTweens=function(){var t=[];return this.data.forEach(function(r){return r instanceof i?t.push.apply(t,r.getTweens()):r instanceof Ke&&!(r.parent&&r.parent.data==="nested")&&t.push(r)}),t},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(t,r){var s=this;if(t?function(){for(var a=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return a.splice(a.indexOf(u),1)}));for(a.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,f){return f.g-u.g||-1/0}).forEach(function(u){return u.t.revert(t)}),l=s.data.length;l--;)c=s.data[l],c instanceof Nt?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof Ke)&&c.revert&&c.revert(t);s._r.forEach(function(u){return u(t,s)}),s.isReverted=!0}():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),r)for(var o=Ir.length;o--;)Ir[o].id===this.id&&Ir.splice(o,1)},e.revert=function(t){this.kill(t||{})},i}(),gp=function(){function i(n){this.contexts=[],this.scope=n,ze&&ze.data.push(this)}var e=i.prototype;return e.add=function(t,r,s){zn(t)||(t={matches:t});var o=new af(0,s||this.scope),a=o.conditions={},l,c,u;ze&&!o.selector&&(o.selector=ze.selector),this.contexts.push(o),r=o.add("onMatch",r),o.queries=t;for(c in t)c==="all"?u=1:(l=Cn.matchMedia(t[c]),l&&(Ir.indexOf(o)<0&&Ir.push(o),(a[c]=l.matches)&&(u=1),l.addListener?l.addListener(va):l.addEventListener("change",va)));return u&&r(o,function(f){return o.add(null,f)}),this},e.revert=function(t){this.kill(t||{})},e.kill=function(t){this.contexts.forEach(function(r){return r.kill(t,!0)})},i}(),_o={registerPlugin:function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];n.forEach(function(r){return Wu(r)})},timeline:function(e){return new Nt(e)},getTweensOf:function(e,n){return Be.getTweensOf(e,n)},getProperty:function(e,n,t,r){lt(e)&&(e=_n(e)[0]);var s=Lr(e||{}).get,o=t?Du:Lu;return t==="native"&&(t=""),e&&(n?o((Qt[n]&&Qt[n].get||s)(e,n,t,r)):function(a,l,c){return o((Qt[a]&&Qt[a].get||s)(e,a,l,c))})},quickSetter:function(e,n,t){if(e=_n(e),e.length>1){var r=e.map(function(u){return Ht.quickSetter(u,n,t)}),s=r.length;return function(u){for(var f=s;f--;)r[f](u)}}e=e[0]||{};var o=Qt[n],a=Lr(e),l=a.harness&&(a.harness.aliases||{})[n]||n,c=o?function(u){var f=new o;oi._pt=0,f.init(e,t?u+t:u,oi,0,[e]),f.render(1,f),oi._pt&&fl(1,oi)}:a.set(e,l);return o?c:function(u){return c(e,l,t?u+t:u,a,1)}},quickTo:function(e,n,t){var r,s=Ht.to(e,an((r={},r[n]="+=0.1",r.paused=!0,r.stagger=0,r),t||{})),o=function(l,c,u){return s.resetTo(n,l,c,u)};return o.tween=s,o},isTweening:function(e){return Be.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=zr(e.ease,us.ease)),$l(us,e||{})},config:function(e){return $l(sn,e||{})},registerEffect:function(e){var n=e.name,t=e.effect,r=e.plugins,s=e.defaults,o=e.extendTimeline;(r||"").split(",").forEach(function(a){return a&&!Qt[a]&&!on[a]&&fs(n+" effect requires "+a+" plugin.")}),Go[n]=function(a,l,c){return t(_n(a),an(l||{},s),c)},o&&(Nt.prototype[n]=function(a,l,c){return this.add(Go[n](a,zn(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,n){he[e]=zr(n)},parseEase:function(e,n){return arguments.length?zr(e,n):he},getById:function(e){return Be.getById(e)},exportRoot:function(e,n){e===void 0&&(e={});var t=new Nt(e),r,s;for(t.smoothChildTiming=Ft(e.smoothChildTiming),Be.remove(t),t._dp=0,t._time=t._tTime=Be._time,r=Be._first;r;)s=r._next,(n||!(!r._dur&&r instanceof Ke&&r.vars.onComplete===r._targets[0]))&&An(t,r,r._start-r._delay),r=s;return An(Be,t,0),t},context:function(e,n){return e?new af(e,n):ze},matchMedia:function(e){return new gp(e)},matchMediaRefresh:function(){return Ir.forEach(function(e){var n=e.conditions,t,r;for(r in n)n[r]&&(n[r]=!1,t=1);t&&e.revert()})||va()},addEventListener:function(e,n){var t=eo[e]||(eo[e]=[]);~t.indexOf(n)||t.push(n)},removeEventListener:function(e,n){var t=eo[e],r=t&&t.indexOf(n);r>=0&&t.splice(r,1)},utils:{wrap:Vh,wrapYoyo:Wh,distribute:Bu,random:Hu,snap:Yu,normalize:qh,getUnit:wt,clamp:Bh,splitColor:Uu,toArray:_n,selector:_a,mapRange:qu,pipe:Hh,unitize:Xh,interpolate:Uh,shuffle:Gu},install:Mu,effects:Go,ticker:en,updateRoot:Nt.updateRoot,plugins:Qt,globalTimeline:Be,core:{PropTween:Gt,globals:Pu,Tween:Ke,Timeline:Nt,Animation:gs,getCache:Lr,_removeLinkedListItem:Ro,reverting:function(){return gt},context:function(e){return e&&ze&&(ze.data.push(e),e._ctx=ze),ze},suppressOverwrites:function(e){return Za=e}}};$t("to,from,fromTo,delayedCall,set,killTweensOf",function(i){return _o[i]=Ke[i]});en.add(Nt.updateRoot);oi=_o.to({},{duration:0});var mp=function(e,n){for(var t=e._pt;t&&t.p!==n&&t.op!==n&&t.fp!==n;)t=t._next;return t},_p=function(e,n){var t=e._targets,r,s,o;for(r in n)for(s=t.length;s--;)o=e._ptLookup[s][r],o&&(o=o.d)&&(o._pt&&(o=mp(o,r)),o&&o.modifier&&o.modifier(n[r],e,t[s],r))},qo=function(e,n){return{name:e,headless:1,rawVars:1,init:function(r,s,o){o._onInit=function(a){var l,c;if(lt(s)&&(l={},$t(s,function(u){return l[u]=1}),s=l),n){l={};for(c in s)l[c]=n(s[c]);s=l}_p(a,s)}}}},Ht=_o.registerPlugin({name:"attr",init:function(e,n,t,r,s){var o,a,l;this.tween=t;for(o in n)l=e.getAttribute(o)||"",a=this.add(e,"setAttribute",(l||0)+"",n[o],r,s,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(e,n){for(var t=n._pt;t;)gt?t.set(t.t,t.p,t.b,t):t.r(e,t.d),t=t._next}},{name:"endArray",headless:1,init:function(e,n){for(var t=n.length;t--;)this.add(e,t,e[t]||0,n[t],0,0,0,0,0,1)}},qo("roundProps",ya),qo("modifiers"),qo("snap",Yu))||_o;Ke.version=Nt.version=Ht.version="3.15.0";Cu=1;el()&&xi();he.Power0;he.Power1;he.Power2;he.Power3;he.Power4;he.Linear;he.Quad;he.Cubic;he.Quart;he.Quint;he.Strong;he.Elastic;he.Back;he.SteppedEase;he.Bounce;he.Sine;he.Expo;he.Circ;/*!
 * CSSPlugin 3.15.0
 * https://gsap.com
 *
 * Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var ql,nr,ui,dl,Pr,Vl,hl,yp=function(){return typeof window<"u"},jn={},Tr=180/Math.PI,fi=Math.PI/180,Qr=Math.atan2,Wl=1e8,pl=/([A-Z])/g,bp=/(left|right|width|margin|padding|x)/i,vp=/[\s,\(]\S/,Rn={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},xa=function(e,n){return n.set(n.t,n.p,Math.round((n.s+n.c*e)*1e4)/1e4+n.u,n)},xp=function(e,n){return n.set(n.t,n.p,e===1?n.e:Math.round((n.s+n.c*e)*1e4)/1e4+n.u,n)},wp=function(e,n){return n.set(n.t,n.p,e?Math.round((n.s+n.c*e)*1e4)/1e4+n.u:n.b,n)},Sp=function(e,n){return n.set(n.t,n.p,e===1?n.e:e?Math.round((n.s+n.c*e)*1e4)/1e4+n.u:n.b,n)},kp=function(e,n){var t=n.s+n.c*e;n.set(n.t,n.p,~~(t+(t<0?-.5:.5))+n.u,n)},lf=function(e,n){return n.set(n.t,n.p,e?n.e:n.b,n)},cf=function(e,n){return n.set(n.t,n.p,e!==1?n.b:n.e,n)},Tp=function(e,n,t){return e.style[n]=t},Ep=function(e,n,t){return e.style.setProperty(n,t)},Cp=function(e,n,t){return e._gsap[n]=t},Mp=function(e,n,t){return e._gsap.scaleX=e._gsap.scaleY=t},Pp=function(e,n,t,r,s){var o=e._gsap;o.scaleX=o.scaleY=t,o.renderTransform(s,o)},Ap=function(e,n,t,r,s){var o=e._gsap;o[n]=t,o.renderTransform(s,o)},Ye="transform",Bt=Ye+"Origin",Rp=function i(e,n){var t=this,r=this.target,s=r.style,o=r._gsap;if(e in jn&&s){if(this.tfm=this.tfm||{},e!=="transform")e=Rn[e]||e,~e.indexOf(",")?e.split(",").forEach(function(a){return t.tfm[a]=Bn(r,a)}):this.tfm[e]=o.x?o[e]:Bn(r,e),e===Bt&&(this.tfm.zOrigin=o.zOrigin);else return Rn.transform.split(",").forEach(function(a){return i.call(t,a,n)});if(this.props.indexOf(Ye)>=0)return;o.svg&&(this.svgo=r.getAttribute("data-svg-origin"),this.props.push(Bt,n,"")),e=Ye}(s||n)&&this.props.push(e,n,s[e])},uf=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},Op=function(){var e=this.props,n=this.target,t=n.style,r=n._gsap,s,o;for(s=0;s<e.length;s+=3)e[s+1]?e[s+1]===2?n[e[s]](e[s+2]):n[e[s]]=e[s+2]:e[s+2]?t[e[s]]=e[s+2]:t.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(pl,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)r[o]=this.tfm[o];r.svg&&(r.renderTransform(),n.setAttribute("data-svg-origin",this.svgo||"")),s=hl(),(!s||!s.isStart)&&!t[Ye]&&(uf(t),r.zOrigin&&t[Bt]&&(t[Bt]+=" "+r.zOrigin+"px",r.zOrigin=0,r.renderTransform()),r.uncache=1)}},ff=function(e,n){var t={target:e,props:[],revert:Op,save:Rp};return e._gsap||Ht.core.getCache(e),n&&e.style&&e.nodeType&&n.split(",").forEach(function(r){return t.save(r)}),t},df,wa=function(e,n){var t=nr.createElementNS?nr.createElementNS((n||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):nr.createElement(e);return t&&t.style?t:nr.createElement(e)},rn=function i(e,n,t){var r=getComputedStyle(e);return r[n]||r.getPropertyValue(n.replace(pl,"-$1").toLowerCase())||r.getPropertyValue(n)||!t&&i(e,wi(n)||n,1)||""},Ul="O,Moz,ms,Ms,Webkit".split(","),wi=function(e,n,t){var r=n||Pr,s=r.style,o=5;if(e in s&&!t)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);o--&&!(Ul[o]+e in s););return o<0?null:(o===3?"ms":o>=0?Ul[o]:"")+e},Sa=function(){yp()&&window.document&&(ql=window,nr=ql.document,ui=nr.documentElement,Pr=wa("div")||{style:{}},wa("div"),Ye=wi(Ye),Bt=Ye+"Origin",Pr.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",df=!!wi("perspective"),hl=Ht.core.reverting,dl=1)},jl=function(e){var n=e.ownerSVGElement,t=wa("svg",n&&n.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),r=e.cloneNode(!0),s;r.style.display="block",t.appendChild(r),ui.appendChild(t);try{s=r.getBBox()}catch{}return t.removeChild(r),ui.removeChild(t),s},Ql=function(e,n){for(var t=n.length;t--;)if(e.hasAttribute(n[t]))return e.getAttribute(n[t])},hf=function(e){var n,t;try{n=e.getBBox()}catch{n=jl(e),t=1}return n&&(n.width||n.height)||t||(n=jl(e)),n&&!n.width&&!n.x&&!n.y?{x:+Ql(e,["x","cx","x1"])||0,y:+Ql(e,["y","cy","y1"])||0,width:0,height:0}:n},pf=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&hf(e))},hr=function(e,n){if(n){var t=e.style,r;n in jn&&n!==Bt&&(n=Ye),t.removeProperty?(r=n.substr(0,2),(r==="ms"||n.substr(0,6)==="webkit")&&(n="-"+n),t.removeProperty(r==="--"?n:n.replace(pl,"-$1").toLowerCase())):t.removeAttribute(n)}},rr=function(e,n,t,r,s,o){var a=new Gt(e._pt,n,t,0,1,o?cf:lf);return e._pt=a,a.b=r,a.e=s,e._props.push(t),a},Kl={deg:1,rad:1,turn:1},Lp={grid:1,flex:1},pr=function i(e,n,t,r){var s=parseFloat(t)||0,o=(t+"").trim().substr((s+"").length)||"px",a=Pr.style,l=bp.test(n),c=e.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),f=100,h=r==="px",d=r==="%",g,p,m,v;if(r===o||!s||Kl[r]||Kl[o])return s;if(o!=="px"&&!h&&(s=i(e,n,t,"px")),v=e.getCTM&&pf(e),(d||o==="%")&&(jn[n]||~n.indexOf("adius")))return g=v?e.getBBox()[l?"width":"height"]:e[u],Ve(d?s/g*f:s/100*g);if(a[l?"width":"height"]=f+(h?o:r),p=r!=="rem"&&~n.indexOf("adius")||r==="em"&&e.appendChild&&!c?e:e.parentNode,v&&(p=(e.ownerSVGElement||{}).parentNode),(!p||p===nr||!p.appendChild)&&(p=nr.body),m=p._gsap,m&&d&&m.width&&l&&m.time===en.time&&!m.uncache)return Ve(s/m.width*f);if(d&&(n==="height"||n==="width")){var y=e.style[n];e.style[n]=f+r,g=e[u],y?e.style[n]=y:hr(e,n)}else(d||o==="%")&&!Lp[rn(p,"display")]&&(a.position=rn(e,"position")),p===e&&(a.position="static"),p.appendChild(Pr),g=Pr[u],p.removeChild(Pr),a.position="absolute";return l&&d&&(m=Lr(p),m.time=en.time,m.width=p[u]),Ve(h?g*s/f:g&&s?f/g*s:0)},Bn=function(e,n,t,r){var s;return dl||Sa(),n in Rn&&n!=="transform"&&(n=Rn[n],~n.indexOf(",")&&(n=n.split(",")[0])),jn[n]&&n!=="transform"?(s=_s(e,r),s=n!=="transformOrigin"?s[n]:s.svg?s.origin:bo(rn(e,Bt))+" "+s.zOrigin+"px"):(s=e.style[n],(!s||s==="auto"||r||~(s+"").indexOf("calc("))&&(s=yo[n]&&yo[n](e,n,t)||rn(e,n)||Ru(e,n)||(n==="opacity"?1:0))),t&&!~(s+"").trim().indexOf(" ")?pr(e,n,s,t)+t:s},Dp=function(e,n,t,r){if(!t||t==="none"){var s=wi(n,e,1),o=s&&rn(e,s,1);o&&o!==t?(n=s,t=o):n==="borderColor"&&(t=rn(e,"borderTopColor"))}var a=new Gt(this._pt,e.style,n,0,1,sf),l=0,c=0,u,f,h,d,g,p,m,v,y,x,w,S;if(a.b=t,a.e=r,t+="",r+="",r.substring(0,6)==="var(--"&&(r=rn(e,r.substring(4,r.indexOf(")")))),r==="auto"&&(p=e.style[n],e.style[n]=r,r=rn(e,n)||r,p?e.style[n]=p:hr(e,n)),u=[t,r],Qu(u),t=u[0],r=u[1],h=t.match(si)||[],S=r.match(si)||[],S.length){for(;f=si.exec(r);)m=f[0],y=r.substring(l,f.index),g?g=(g+1)%5:(y.substr(-5)==="rgba("||y.substr(-5)==="hsla(")&&(g=1),m!==(p=h[c++]||"")&&(d=parseFloat(p)||0,w=p.substr((d+"").length),m.charAt(1)==="="&&(m=ci(d,m)+w),v=parseFloat(m),x=m.substr((v+"").length),l=si.lastIndex-x.length,x||(x=x||sn.units[n]||w,l===r.length&&(r+=x,a.e+=x)),w!==x&&(d=pr(e,n,p,x)||0),a._pt={_next:a._pt,p:y||c===1?y:",",s:d,c:v-d,m:g&&g<4||n==="zIndex"?Math.round:0});a.c=l<r.length?r.substring(l,r.length):""}else a.r=n==="display"&&r==="none"?cf:lf;return Eu.test(r)&&(a.e=0),this._pt=a,a},Zl={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},zp=function(e){var n=e.split(" "),t=n[0],r=n[1]||"50%";return(t==="top"||t==="bottom"||r==="left"||r==="right")&&(e=t,t=r,r=e),n[0]=Zl[t]||t,n[1]=Zl[r]||r,n.join(" ")},Ip=function(e,n){if(n.tween&&n.tween._time===n.tween._dur){var t=n.t,r=t.style,s=n.u,o=t._gsap,a,l,c;if(s==="all"||s===!0)r.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)a=s[c],jn[a]&&(l=1,a=a==="transformOrigin"?Bt:Ye),hr(t,a);l&&(hr(t,Ye),o&&(o.svg&&t.removeAttribute("transform"),r.scale=r.rotate=r.translate="none",_s(t,1),o.uncache=1,uf(r)))}},yo={clearProps:function(e,n,t,r,s){if(s.data!=="isFromStart"){var o=e._pt=new Gt(e._pt,n,t,0,0,Ip);return o.u=r,o.pr=-10,o.tween=s,e._props.push(t),1}}},ms=[1,0,0,1,0,0],gf={},mf=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},Jl=function(e){var n=rn(e,Ye);return mf(n)?ms:n.substr(7).match(Tu).map(Ve)},gl=function(e,n){var t=e._gsap||Lr(e),r=e.style,s=Jl(e),o,a,l,c;return t.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?ms:s):(s===ms&&!e.offsetParent&&e!==ui&&!t.svg&&(l=r.display,r.display="block",o=e.parentNode,(!o||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,a=e.nextElementSibling,ui.appendChild(e)),s=Jl(e),l?r.display=l:hr(e,"display"),c&&(a?o.insertBefore(e,a):o?o.appendChild(e):ui.removeChild(e))),n&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},ka=function(e,n,t,r,s,o){var a=e._gsap,l=s||gl(e,!0),c=a.xOrigin||0,u=a.yOrigin||0,f=a.xOffset||0,h=a.yOffset||0,d=l[0],g=l[1],p=l[2],m=l[3],v=l[4],y=l[5],x=n.split(" "),w=parseFloat(x[0])||0,S=parseFloat(x[1])||0,E,k,A,C;t?l!==ms&&(k=d*m-g*p)&&(A=w*(m/k)+S*(-p/k)+(p*y-m*v)/k,C=w*(-g/k)+S*(d/k)-(d*y-g*v)/k,w=A,S=C):(E=hf(e),w=E.x+(~x[0].indexOf("%")?w/100*E.width:w),S=E.y+(~(x[1]||x[0]).indexOf("%")?S/100*E.height:S)),r||r!==!1&&a.smooth?(v=w-c,y=S-u,a.xOffset=f+(v*d+y*p)-v,a.yOffset=h+(v*g+y*m)-y):a.xOffset=a.yOffset=0,a.xOrigin=w,a.yOrigin=S,a.smooth=!!r,a.origin=n,a.originIsAbsolute=!!t,e.style[Bt]="0px 0px",o&&(rr(o,a,"xOrigin",c,w),rr(o,a,"yOrigin",u,S),rr(o,a,"xOffset",f,a.xOffset),rr(o,a,"yOffset",h,a.yOffset)),e.setAttribute("data-svg-origin",w+" "+S)},_s=function(e,n){var t=e._gsap||new Zu(e);if("x"in t&&!n&&!t.uncache)return t;var r=e.style,s=t.scaleX<0,o="px",a="deg",l=getComputedStyle(e),c=rn(e,Bt)||"0",u,f,h,d,g,p,m,v,y,x,w,S,E,k,A,C,P,$,_,z,N,B,I,F,R,L,b,Y,U,D,H,W;return u=f=h=p=m=v=y=x=w=0,d=g=1,t.svg=!!(e.getCTM&&pf(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(r[Ye]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[Ye]!=="none"?l[Ye]:"")),r.scale=r.rotate=r.translate="none"),k=gl(e,t.svg),t.svg&&(t.uncache?(R=e.getBBox(),c=t.xOrigin-R.x+"px "+(t.yOrigin-R.y)+"px",F=""):F=!n&&e.getAttribute("data-svg-origin"),ka(e,F||c,!!F||t.originIsAbsolute,t.smooth!==!1,k)),S=t.xOrigin||0,E=t.yOrigin||0,k!==ms&&($=k[0],_=k[1],z=k[2],N=k[3],u=B=k[4],f=I=k[5],k.length===6?(d=Math.sqrt($*$+_*_),g=Math.sqrt(N*N+z*z),p=$||_?Qr(_,$)*Tr:0,y=z||N?Qr(z,N)*Tr+p:0,y&&(g*=Math.abs(Math.cos(y*fi))),t.svg&&(u-=S-(S*$+E*z),f-=E-(S*_+E*N))):(W=k[6],D=k[7],b=k[8],Y=k[9],U=k[10],H=k[11],u=k[12],f=k[13],h=k[14],A=Qr(W,U),m=A*Tr,A&&(C=Math.cos(-A),P=Math.sin(-A),F=B*C+b*P,R=I*C+Y*P,L=W*C+U*P,b=B*-P+b*C,Y=I*-P+Y*C,U=W*-P+U*C,H=D*-P+H*C,B=F,I=R,W=L),A=Qr(-z,U),v=A*Tr,A&&(C=Math.cos(-A),P=Math.sin(-A),F=$*C-b*P,R=_*C-Y*P,L=z*C-U*P,H=N*P+H*C,$=F,_=R,z=L),A=Qr(_,$),p=A*Tr,A&&(C=Math.cos(A),P=Math.sin(A),F=$*C+_*P,R=B*C+I*P,_=_*C-$*P,I=I*C-B*P,$=F,B=R),m&&Math.abs(m)+Math.abs(p)>359.9&&(m=p=0,v=180-v),d=Ve(Math.sqrt($*$+_*_+z*z)),g=Ve(Math.sqrt(I*I+W*W)),A=Qr(B,I),y=Math.abs(A)>2e-4?A*Tr:0,w=H?1/(H<0?-H:H):0),t.svg&&(F=e.getAttribute("transform"),t.forceCSS=e.setAttribute("transform","")||!mf(rn(e,Ye)),F&&e.setAttribute("transform",F))),Math.abs(y)>90&&Math.abs(y)<270&&(s?(d*=-1,y+=p<=0?180:-180,p+=p<=0?180:-180):(g*=-1,y+=y<=0?180:-180)),n=n||t.uncache,t.x=u-((t.xPercent=u&&(!n&&t.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-u)?-50:0)))?e.offsetWidth*t.xPercent/100:0)+o,t.y=f-((t.yPercent=f&&(!n&&t.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-f)?-50:0)))?e.offsetHeight*t.yPercent/100:0)+o,t.z=h+o,t.scaleX=Ve(d),t.scaleY=Ve(g),t.rotation=Ve(p)+a,t.rotationX=Ve(m)+a,t.rotationY=Ve(v)+a,t.skewX=y+a,t.skewY=x+a,t.transformPerspective=w+o,(t.zOrigin=parseFloat(c.split(" ")[2])||!n&&t.zOrigin||0)&&(r[Bt]=bo(c)),t.xOffset=t.yOffset=0,t.force3D=sn.force3D,t.renderTransform=t.svg?Fp:df?_f:Np,t.uncache=0,t},bo=function(e){return(e=e.split(" "))[0]+" "+e[1]},Vo=function(e,n,t){var r=wt(n);return Ve(parseFloat(n)+parseFloat(pr(e,"x",t+"px",r)))+r},Np=function(e,n){n.z="0px",n.rotationY=n.rotationX="0deg",n.force3D=0,_f(e,n)},vr="0deg",Ci="0px",xr=") ",_f=function(e,n){var t=n||this,r=t.xPercent,s=t.yPercent,o=t.x,a=t.y,l=t.z,c=t.rotation,u=t.rotationY,f=t.rotationX,h=t.skewX,d=t.skewY,g=t.scaleX,p=t.scaleY,m=t.transformPerspective,v=t.force3D,y=t.target,x=t.zOrigin,w="",S=v==="auto"&&e&&e!==1||v===!0;if(x&&(f!==vr||u!==vr)){var E=parseFloat(u)*fi,k=Math.sin(E),A=Math.cos(E),C;E=parseFloat(f)*fi,C=Math.cos(E),o=Vo(y,o,k*C*-x),a=Vo(y,a,-Math.sin(E)*-x),l=Vo(y,l,A*C*-x+x)}m!==Ci&&(w+="perspective("+m+xr),(r||s)&&(w+="translate("+r+"%, "+s+"%) "),(S||o!==Ci||a!==Ci||l!==Ci)&&(w+=l!==Ci||S?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+xr),c!==vr&&(w+="rotate("+c+xr),u!==vr&&(w+="rotateY("+u+xr),f!==vr&&(w+="rotateX("+f+xr),(h!==vr||d!==vr)&&(w+="skew("+h+", "+d+xr),(g!==1||p!==1)&&(w+="scale("+g+", "+p+xr),y.style[Ye]=w||"translate(0, 0)"},Fp=function(e,n){var t=n||this,r=t.xPercent,s=t.yPercent,o=t.x,a=t.y,l=t.rotation,c=t.skewX,u=t.skewY,f=t.scaleX,h=t.scaleY,d=t.target,g=t.xOrigin,p=t.yOrigin,m=t.xOffset,v=t.yOffset,y=t.forceCSS,x=parseFloat(o),w=parseFloat(a),S,E,k,A,C;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=fi,c*=fi,S=Math.cos(l)*f,E=Math.sin(l)*f,k=Math.sin(l-c)*-h,A=Math.cos(l-c)*h,c&&(u*=fi,C=Math.tan(c-u),C=Math.sqrt(1+C*C),k*=C,A*=C,u&&(C=Math.tan(u),C=Math.sqrt(1+C*C),S*=C,E*=C)),S=Ve(S),E=Ve(E),k=Ve(k),A=Ve(A)):(S=f,A=h,E=k=0),(x&&!~(o+"").indexOf("px")||w&&!~(a+"").indexOf("px"))&&(x=pr(d,"x",o,"px"),w=pr(d,"y",a,"px")),(g||p||m||v)&&(x=Ve(x+g-(g*S+p*k)+m),w=Ve(w+p-(g*E+p*A)+v)),(r||s)&&(C=d.getBBox(),x=Ve(x+r/100*C.width),w=Ve(w+s/100*C.height)),C="matrix("+S+","+E+","+k+","+A+","+x+","+w+")",d.setAttribute("transform",C),y&&(d.style[Ye]=C)},$p=function(e,n,t,r,s){var o=360,a=lt(s),l=parseFloat(s)*(a&&~s.indexOf("rad")?Tr:1),c=l-r,u=r+c+"deg",f,h;return a&&(f=s.split("_")[1],f==="short"&&(c%=o,c!==c%(o/2)&&(c+=c<0?o:-o)),f==="cw"&&c<0?c=(c+o*Wl)%o-~~(c/o)*o:f==="ccw"&&c>0&&(c=(c-o*Wl)%o-~~(c/o)*o)),e._pt=h=new Gt(e._pt,n,t,r,c,xp),h.e=u,h.u="deg",e._props.push(t),h},ec=function(e,n){for(var t in n)e[t]=n[t];return e},Gp=function(e,n,t){var r=ec({},t._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=t.style,a,l,c,u,f,h,d,g;r.svg?(c=t.getAttribute("transform"),t.setAttribute("transform",""),o[Ye]=n,a=_s(t,1),hr(t,Ye),t.setAttribute("transform",c)):(c=getComputedStyle(t)[Ye],o[Ye]=n,a=_s(t,1),o[Ye]=c);for(l in jn)c=r[l],u=a[l],c!==u&&s.indexOf(l)<0&&(d=wt(c),g=wt(u),f=d!==g?pr(t,l,c,g):parseFloat(c),h=parseFloat(u),e._pt=new Gt(e._pt,a,l,f,h-f,xa),e._pt.u=g||0,e._props.push(l));ec(a,r)};$t("padding,margin,Width,Radius",function(i,e){var n="Top",t="Right",r="Bottom",s="Left",o=(e<3?[n,t,r,s]:[n+s,n+t,r+t,r+s]).map(function(a){return e<2?i+a:"border"+a+i});yo[e>1?"border"+i:i]=function(a,l,c,u,f){var h,d;if(arguments.length<4)return h=o.map(function(g){return Bn(a,g,c)}),d=h.join(" "),d.split(h[0]).length===5?h[0]:d;h=(u+"").split(" "),d={},o.forEach(function(g,p){return d[g]=h[p]=h[p]||h[(p-1)/2|0]}),a.init(l,d,f)}});var yf={name:"css",register:Sa,targetTest:function(e){return e.style&&e.nodeType},init:function(e,n,t,r,s){var o=this._props,a=e.style,l=t.vars.startAt,c,u,f,h,d,g,p,m,v,y,x,w,S,E,k,A,C;dl||Sa(),this.styles=this.styles||ff(e),A=this.styles.props,this.tween=t;for(p in n)if(p!=="autoRound"&&(u=n[p],!(Qt[p]&&Ju(p,n,t,r,e,s)))){if(d=typeof u,g=yo[p],d==="function"&&(u=u.call(t,r,e,s),d=typeof u),d==="string"&&~u.indexOf("random(")&&(u=hs(u)),g)g(this,e,p,u,t)&&(k=1);else if(p.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(p)+"").trim(),u+="",cr.lastIndex=0,cr.test(c)||(m=wt(c),v=wt(u),v?m!==v&&(c=pr(e,p,c,v)+v):m&&(u+=m)),this.add(a,"setProperty",c,u,r,s,0,0,p),o.push(p),A.push(p,0,a[p]);else if(d!=="undefined"){if(l&&p in l?(c=typeof l[p]=="function"?l[p].call(t,r,e,s):l[p],lt(c)&&~c.indexOf("random(")&&(c=hs(c)),wt(c+"")||c==="auto"||(c+=sn.units[p]||wt(Bn(e,p))||""),(c+"").charAt(1)==="="&&(c=Bn(e,p))):c=Bn(e,p),h=parseFloat(c),y=d==="string"&&u.charAt(1)==="="&&u.substr(0,2),y&&(u=u.substr(2)),f=parseFloat(u),p in Rn&&(p==="autoAlpha"&&(h===1&&Bn(e,"visibility")==="hidden"&&f&&(h=0),A.push("visibility",0,a.visibility),rr(this,a,"visibility",h?"inherit":"hidden",f?"inherit":"hidden",!f)),p!=="scale"&&p!=="transform"&&(p=Rn[p],~p.indexOf(",")&&(p=p.split(",")[0]))),x=p in jn,x){if(this.styles.save(p),C=u,d==="string"&&u.substring(0,6)==="var(--"){if(u=rn(e,u.substring(4,u.indexOf(")"))),u.substring(0,5)==="calc("){var P=e.style.perspective;e.style.perspective=u,u=rn(e,"perspective"),P?e.style.perspective=P:hr(e,"perspective")}f=parseFloat(u)}if(w||(S=e._gsap,S.renderTransform&&!n.parseTransform||_s(e,n.parseTransform),E=n.smoothOrigin!==!1&&S.smooth,w=this._pt=new Gt(this._pt,a,Ye,0,1,S.renderTransform,S,0,-1),w.dep=1),p==="scale")this._pt=new Gt(this._pt,S,"scaleY",S.scaleY,(y?ci(S.scaleY,y+f):f)-S.scaleY||0,xa),this._pt.u=0,o.push("scaleY",p),p+="X";else if(p==="transformOrigin"){A.push(Bt,0,a[Bt]),u=zp(u),S.svg?ka(e,u,0,E,0,this):(v=parseFloat(u.split(" ")[2])||0,v!==S.zOrigin&&rr(this,S,"zOrigin",S.zOrigin,v),rr(this,a,p,bo(c),bo(u)));continue}else if(p==="svgOrigin"){ka(e,u,1,E,0,this);continue}else if(p in gf){$p(this,S,p,h,y?ci(h,y+u):u);continue}else if(p==="smoothOrigin"){rr(this,S,"smooth",S.smooth,u);continue}else if(p==="force3D"){S[p]=u;continue}else if(p==="transform"){Gp(this,u,e);continue}}else p in a||(p=wi(p)||p);if(x||(f||f===0)&&(h||h===0)&&!vp.test(u)&&p in a)m=(c+"").substr((h+"").length),f||(f=0),v=wt(u)||(p in sn.units?sn.units[p]:m),m!==v&&(h=pr(e,p,c,v)),this._pt=new Gt(this._pt,x?S:a,p,h,(y?ci(h,y+f):f)-h,!x&&(v==="px"||p==="zIndex")&&n.autoRound!==!1?kp:xa),this._pt.u=v||0,x&&C!==u?(this._pt.b=c,this._pt.e=C,this._pt.r=Sp):m!==v&&v!=="%"&&(this._pt.b=c,this._pt.r=wp);else if(p in a)Dp.call(this,e,p,c,y?y+u:u);else if(p in e)this.add(e,p,c||e[p],y?y+u:u,r,s);else if(p!=="parseTransform"){nl(p,u);continue}x||(p in a?A.push(p,0,a[p]):typeof e[p]=="function"?A.push(p,2,e[p]()):A.push(p,1,c||e[p])),o.push(p)}}k&&of(this)},render:function(e,n){if(n.tween._time||!hl())for(var t=n._pt;t;)t.r(e,t.d),t=t._next;else n.styles.revert()},get:Bn,aliases:Rn,getSetter:function(e,n,t){var r=Rn[n];return r&&r.indexOf(",")<0&&(n=r),n in jn&&n!==Bt&&(e._gsap.x||Bn(e,"x"))?t&&Vl===t?n==="scale"?Mp:Cp:(Vl=t||{})&&(n==="scale"?Pp:Ap):e.style&&!Ja(e.style[n])?Tp:~n.indexOf("-")?Ep:ul(e,n)},core:{_removeProperty:hr,_getMatrix:gl}};Ht.utils.checkPrefix=wi;Ht.core.getStyleSaver=ff;(function(i,e,n,t){var r=$t(i+","+e+","+n,function(s){jn[s]=1});$t(e,function(s){sn.units[s]="deg",gf[s]=1}),Rn[r[13]]=i+","+e,$t(t,function(s){var o=s.split(":");Rn[o[1]]=r[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");$t("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(i){sn.units[i]="px"});Ht.registerPlugin(yf);var at=Ht.registerPlugin(yf)||Ht;at.core.Tween;/*!
 * paths 3.15.0
 * https://gsap.com
 *
 * Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Bp=/[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,Yp=/[\+\-]?\d*\.?\d+e[\+\-]?\d+/ig,Hp=Math.PI/180,ks=Math.sin,Ts=Math.cos,Zi=Math.abs,Mi=Math.sqrt,Xp=function(e){return typeof e=="number"},tc=1e5,Zn=function(e){return Math.round(e*tc)/tc||0},nc=function(e){return e.closed=Math.abs(e[0]-e[e.length-2])<.001&&Math.abs(e[1]-e[e.length-1])<.001};function qp(i,e,n,t,r,s,o){for(var a=i.length,l,c,u,f,h;--a>-1;)for(l=i[a],c=l.length,u=0;u<c;u+=2)f=l[u],h=l[u+1],l[u]=f*e+h*t+s,l[u+1]=f*n+h*r+o;return i._dirty=1,i}function Vp(i,e,n,t,r,s,o,a,l){if(!(i===a&&e===l)){n=Zi(n),t=Zi(t);var c=r%360*Hp,u=Ts(c),f=ks(c),h=Math.PI,d=h*2,g=(i-a)/2,p=(e-l)/2,m=u*g+f*p,v=-f*g+u*p,y=m*m,x=v*v,w=y/(n*n)+x/(t*t);w>1&&(n=Mi(w)*n,t=Mi(w)*t);var S=n*n,E=t*t,k=(S*E-S*x-E*y)/(S*x+E*y);k<0&&(k=0);var A=(s===o?-1:1)*Mi(k),C=A*(n*v/t),P=A*-(t*m/n),$=(i+a)/2,_=(e+l)/2,z=$+(u*C-f*P),N=_+(f*C+u*P),B=(m-C)/n,I=(v-P)/t,F=(-m-C)/n,R=(-v-P)/t,L=B*B+I*I,b=(I<0?-1:1)*Math.acos(B/Mi(L)),Y=(B*R-I*F<0?-1:1)*Math.acos((B*F+I*R)/Mi(L*(F*F+R*R)));isNaN(Y)&&(Y=h),!o&&Y>0?Y-=d:o&&Y<0&&(Y+=d),b%=d,Y%=d;var U=Math.ceil(Zi(Y)/(d/4)),D=[],H=Y/U,W=4/3*ks(H/2)/(1+Ts(H/2)),te=u*n,q=f*n,_e=f*-t,Se=u*t,me;for(me=0;me<U;me++)r=b+me*H,m=Ts(r),v=ks(r),B=Ts(r+=H),I=ks(r),D.push(m-W*v,v+W*m,B+W*I,I-W*B,B,I);for(me=0;me<D.length;me+=2)m=D[me],v=D[me+1],D[me]=m*te+v*_e+z,D[me+1]=m*q+v*Se+N;return D[me-2]=a,D[me-1]=l,D}}function Wp(i){var e=(i+"").replace(Yp,function(C){var P=+C;return P<1e-4&&P>-1e-4?0:P}).match(Bp)||[],n=[],t=0,r=0,s=2/3,o=e.length,a=0,l="ERROR: malformed path: "+i,c,u,f,h,d,g,p,m,v,y,x,w,S,E,k,A=function(P,$,_,z){y=(_-P)/3,x=(z-$)/3,p.push(P+y,$+x,_-y,z-x,_,z)};if(!i||!isNaN(e[0])||isNaN(e[1]))return console.log(l),n;for(c=0;c<o;c++)if(S=d,isNaN(e[c])?(d=e[c].toUpperCase(),g=d!==e[c]):c--,f=+e[c+1],h=+e[c+2],g&&(f+=t,h+=r),c||(m=f,v=h),d==="M")p&&(p.length<8?n.length-=1:a+=p.length,nc(p)),t=m=f,r=v=h,p=[f,h],n.push(p),c+=2,d="L";else if(d==="C")p||(p=[0,0]),g||(t=r=0),p.push(f,h,t+e[c+3]*1,r+e[c+4]*1,t+=e[c+5]*1,r+=e[c+6]*1),c+=6;else if(d==="S")y=t,x=r,(S==="C"||S==="S")&&(y+=t-p[p.length-4],x+=r-p[p.length-3]),g||(t=r=0),p.push(y,x,f,h,t+=e[c+3]*1,r+=e[c+4]*1),c+=4;else if(d==="Q")y=t+(f-t)*s,x=r+(h-r)*s,g||(t=r=0),t+=e[c+3]*1,r+=e[c+4]*1,p.push(y,x,t+(f-t)*s,r+(h-r)*s,t,r),c+=4;else if(d==="T")y=t-p[p.length-4],x=r-p[p.length-3],p.push(t+y,r+x,f+(t+y*1.5-f)*s,h+(r+x*1.5-h)*s,t=f,r=h),c+=2;else if(d==="H")A(t,r,t=f,r),c+=1;else if(d==="V")A(t,r,t,r=f+(g?r-t:0)),c+=1;else if(d==="L"||d==="Z")d==="Z"&&(f=m,h=v,p.closed=!0),(d==="L"||Zi(t-f)>.5||Zi(r-h)>.5)&&(A(t,r,f,h),d==="L"&&(c+=2)),t=f,r=h;else if(d==="A"){if(E=e[c+4],k=e[c+5],y=e[c+6],x=e[c+7],u=7,E.length>1&&(E.length<3?(x=y,y=k,u--):(x=k,y=E.substr(2),u-=2),k=E.charAt(1),E=E.charAt(0)),w=Vp(t,r,+e[c+1],+e[c+2],+e[c+3],+E,+k,(g?t:0)+y*1,(g?r:0)+x*1),c+=u,w)for(u=0;u<w.length;u++)p.push(w[u]);t=p[p.length-2],r=p[p.length-1]}else console.log(l);return c=p.length,c<6?(n.pop(),c=0):nc(p),n.totalPoints=a+c,n}function Up(i){Xp(i[0])&&(i=[i]);var e="",n=i.length,t,r,s,o;for(r=0;r<n;r++){for(o=i[r],e+="M"+Zn(o[0])+","+Zn(o[1])+" C",t=o.length,s=2;s<t;s++)e+=Zn(o[s++])+","+Zn(o[s++])+" "+Zn(o[s++])+","+Zn(o[s++])+" "+Zn(o[s++])+","+Zn(o[s])+" ";o.closed&&(e+="z")}return e}/*!
 * CustomEase 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var It,bf,vf=function(){return It||typeof window<"u"&&(It=window.gsap)&&It.registerPlugin&&It},rc=function(){It=vf(),It?(It.registerEase("_CE",Ur.create),bf=1):console.warn("Please gsap.registerPlugin(CustomEase)")},jp=1e20,Es=function(e){return~~(e*1e3+(e<0?-.5:.5))/1e3},Qp=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/gi,Kp=/[cLlsSaAhHvVtTqQ]/g,Zp=function(e){var n=e.length,t=jp,r;for(r=1;r<n;r+=6)+e[r]<t&&(t=+e[r]);return t},Jp=function(e,n,t){!t&&t!==0&&(t=Math.max(+e[e.length-1],+e[1]));var r=+e[0]*-1,s=-t,o=e.length,a=1/(+e[o-2]+r),l=-n||(Math.abs(+e[o-1]-+e[1])<.01*(+e[o-2]-+e[0])?Zp(e)+s:+e[o-1]+s),c;for(l?l=1/l:l=-a,c=0;c<o;c+=2)e[c]=(+e[c]+r)*a,e[c+1]=(+e[c+1]+s)*l},e0=function i(e,n,t,r,s,o,a,l,c,u,f){var h=(e+t)/2,d=(n+r)/2,g=(t+s)/2,p=(r+o)/2,m=(s+a)/2,v=(o+l)/2,y=(h+g)/2,x=(d+p)/2,w=(g+m)/2,S=(p+v)/2,E=(y+w)/2,k=(x+S)/2,A=a-e,C=l-n,P=Math.abs((t-a)*C-(r-l)*A),$=Math.abs((s-a)*C-(o-l)*A),_;return u||(u=[{x:e,y:n},{x:a,y:l}],f=1),u.splice(f||u.length-1,0,{x:E,y:k}),(P+$)*(P+$)>c*(A*A+C*C)&&(_=u.length,i(e,n,h,d,y,x,E,k,c,u,f),i(E,k,w,S,m,v,a,l,c,u,f+1+(u.length-_))),u},Ur=function(){function i(n,t,r){bf||rc(),this.id=n,this.setData(t,r)}var e=i.prototype;return e.setData=function(t,r){r=r||{},t=t||"0,0,1,1";var s=t.match(Qp),o=1,a=[],l=[],c=r.precision||1,u=c<=1,f,h,d,g,p,m,v,y,x;if(this.data=t,(Kp.test(t)||~t.indexOf("M")&&t.indexOf("C")<0)&&(s=Wp(t)[0]),f=s.length,f===4)s.unshift(0,0),s.push(1,1),f=8;else if((f-2)%6)throw"Invalid CustomEase";for((+s[0]!=0||+s[f-2]!=1)&&Jp(s,r.height,r.originY),this.segment=s,g=2;g<f;g+=6)h={x:+s[g-2],y:+s[g-1]},d={x:+s[g+4],y:+s[g+5]},a.push(h,d),e0(h.x,h.y,+s[g],+s[g+1],+s[g+2],+s[g+3],d.x,d.y,1/(c*2e5),a,a.length-1);for(f=a.length,g=0;g<f;g++)v=a[g],y=a[g-1]||v,(v.x>y.x||y.y!==v.y&&y.x===v.x||v===y)&&v.x<=1?(y.cx=v.x-y.x,y.cy=v.y-y.y,y.n=v,y.nx=v.x,u&&g>1&&Math.abs(y.cy/y.cx-a[g-2].cy/a[g-2].cx)>2&&(u=0),y.cx<o&&(y.cx?o=y.cx:(y.cx=.001,g===f-1&&(y.x-=.001,o=Math.min(o,.001),u=0)))):(a.splice(g--,1),f--);if(f=1/o+1|0,p=1/f,m=0,v=a[0],u){for(g=0;g<f;g++)x=g*p,v.nx<x&&(v=a[++m]),h=v.y+(x-v.x)/v.cx*v.cy,l[g]={x,cx:p,y:h,cy:0,nx:9},g&&(l[g-1].cy=h-l[g-1].y);m=a[a.length-1],l[f-1].cy=m.y-h,l[f-1].cx=m.x-l[l.length-1].x}else{for(g=0;g<f;g++)v.nx<g*p&&(v=a[++m]),l[g]=v;m<a.length-1&&(l[g-1]=a[a.length-2])}return this.ease=function(w){var S=l[w*f|0]||l[f-1];return S.nx<w&&(S=S.n),S.y+(w-S.x)/S.cx*S.cy},this.ease.custom=this,this.id&&It&&It.registerEase(this.id,this.ease),this},e.getSVGData=function(t){return i.getSVGData(this,t)},i.create=function(t,r,s){return new i(t,r,s).ease},i.register=function(t){It=t,rc()},i.get=function(t){return It.parseEase(t)},i.getSVGData=function(t,r){r=r||{};var s=r.width||100,o=r.height||100,a=r.x||0,l=(r.y||0)+o,c=It.utils.toArray(r.path)[0],u,f,h,d,g,p,m,v,y,x;if(r.invert&&(o=-o,l=0),typeof t=="string"&&(t=It.parseEase(t)),t.custom&&(t=t.custom),t instanceof i)u=Up(qp([t.segment.slice(0)],s,0,0,-o,a,l));else{for(u=[a,l],m=Math.max(5,(r.precision||1)*200),d=1/m,m+=2,v=5/m,y=Es(a+d*s),x=Es(l+t(d)*-o),f=(x-l)/(y-a),h=2;h<m;h++)g=Es(a+h*d*s),p=Es(l+t(h*d)*-o),(Math.abs((p-x)/(g-y)-f)>v||h===m-1)&&(u.push(y,x),f=(p-x)/(g-y)),y=g,x=p;u="M"+u.join(",")}return c&&c.setAttribute("d",u),u},i}();Ur.version="3.15.0";Ur.headless=!0;vf()&&It.registerPlugin(Ur);at.registerPlugin(Ur);Ur.create("oaIn","0.69, 0, 0, 1");Ur.create("oaDim","0.35, 0.35, 0, 1");const t0=4,n0=[.75,.9,1.05,1.2],xf=[1.5,1.35,1.2,1.05],r0=1.2,wf=1.5,i0=1.3,Cs=1.45,s0=`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E")`,o0=`
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
  background-image: ${s0};
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
`;let Yn=null,ur=null,Ms=null,ir=[],qn=null,di=!1;function Sf(){if(Yn)return;const i=document.createElement("style");i.textContent=o0,document.head.appendChild(i),Yn=document.createElement("div"),Yn.className="br-overlay",ur=document.createElement("div"),ur.className="br-dim",Ms=document.createElement("div"),Ms.className="br-blocks",ir=[];for(let e=0;e<t0;e++){const n=document.createElement("div");n.className="br-block",Ms.appendChild(n),ir.push(n)}qn=document.createElement("div"),qn.className="br-label",Yn.append(ur,Ms,qn),document.body.appendChild(Yn)}function kf(i){if(qn){qn.innerHTML="";for(const e of i){const n=document.createElement("span");n.className="br-char",n.textContent=e===" "?" ":e,qn.appendChild(n)}at.set(qn.children,{y:"110%"})}}function Tf(){return qn?Array.from(qn.children):[]}let wr=null;function Ef(){try{wr??(wr=new AudioContext),wr.state==="suspended"&&wr.resume();const i=wr.currentTime,e=wr.createOscillator(),n=wr.createGain();e.type="sine",e.frequency.setValueAtTime(110,i),e.frequency.exponentialRampToValueAtTime(65,i+.55),n.gain.setValueAtTime(1e-4,i),n.gain.exponentialRampToValueAtTime(.06,i+.06),n.gain.exponentialRampToValueAtTime(1e-4,i+.6),e.connect(n).connect(wr.destination),e.start(i),e.stop(i+.62)}catch{}}function Cf(){const i=document.getElementById("sky-canvas");i&&at.fromTo(i,{scale:1.015,opacity:.55},{scale:1,opacity:1,duration:1,ease:"power2.out",overwrite:"auto"})}function a0(i,e){if(Sf(),di)return Promise.resolve();di=!0,kf(i);const n=Tf();return Yn.style.visibility="visible",Ef(),new Promise(t=>{at.timeline({onComplete:()=>{Yn.style.visibility="hidden",di=!1,t()}}).set(ir,{transformOrigin:"left center",scaleX:0}).set(ur,{opacity:0}).to(ur,{opacity:1,duration:r0,ease:"oaDim"},0).to(ir,{scaleX:1,duration:s=>n0[s]??1.2,ease:"oaIn"},0).to(n,{y:"0%",duration:s=>.75+s*.12,ease:"oaIn"},.05).add(()=>{e(),Cf()},i0).to(n,{y:"110%",duration:s=>.85+s*.1,ease:"oaIn"},Cs).set(ir,{transformOrigin:"right center"},Cs).to(ir,{scaleX:0,duration:s=>xf[s]??1.05,ease:"oaIn"},Cs).to(ur,{opacity:0,duration:wf,ease:"oaDim"},Cs)})}function l0(i){if(Sf(),di)return Promise.resolve();di=!0,kf(i);const e=Tf();return Yn.style.visibility="visible",at.set(ur,{opacity:1}),at.set(ir,{scaleX:1,transformOrigin:"right center"}),new Promise(n=>{at.timeline({onComplete:()=>{Yn.style.visibility="hidden",di=!1,n()}}).to(e,{y:"0%",duration:r=>.75+r*.12,ease:"oaIn"},.35).to(e,{y:"110%",duration:r=>.85+r*.1,ease:"oaIn"},"+=1.15").add(()=>{Cf(),Ef()},"<").to(ir,{scaleX:0,duration:r=>xf[r]??1.05,ease:"oaIn"},"<").to(ur,{opacity:0,duration:wf,ease:"oaDim"},"<")})}function c0(i){if(!i.dataset.brSplit){i.dataset.brSplit="1";const e=i.textContent??"";i.textContent="",i.style.overflow="hidden";for(const n of e){const t=document.createElement("span");t.className="br-char",t.style.display="inline-block",t.textContent=n===" "?" ":n,i.appendChild(t)}}at.fromTo(i.children,{y:"110%"},{y:"0%",duration:.75,ease:"oaIn",stagger:.05,overwrite:"auto"})}const u0=.65,f0=new re(0,1,0),d0={ra:0,dec:80};function ic(i){return i=Pe.clamp(i,0,1),i*i*(3-2*i)}function er(i,e){const n=new re(...Yt(i,e,1)),t=new ua().lookAt(new re(0,0,0),n,f0);return new Wt().setFromRotationMatrix(t)}function sc(i){if(i.gaze!=="target")return null;const e=i.target??d0;return er(e.ra,e.dec)}class vo{constructor(e,n=u0){X(this,"keys");X(this,"hold");if(e.length<2)throw new Error("CameraRig 至少需要 2 个关键帧");this.hold=Pe.clamp(n,0,.95);for(const[t,r]of e.entries()){if(!(r.radius>0))throw new Error(`关键帧 ${t}：radius 必须为正`);if(!(r.fov>10&&r.fov<140))throw new Error(`关键帧 ${t}：fov 非法（${r.fov}）`);if(r.gaze!=="free"&&r.gaze!=="target")throw new Error(`关键帧 ${t}：gaze 必须为 "free" | "target"`);const s=r.enter??0;if(s<0||s>=1)throw new Error(`关键帧 ${t}：enter 必须在 [0,1)（${s}）`);if(r.hold!==void 0&&(r.hold<0||r.hold>1))throw new Error(`关键帧 ${t}：hold 必须在 [0,1]（${r.hold}）`);if(t>0&&s>0){const o=e[t-1].hold??this.hold;if(o<1)throw new Error(`关键帧 ${t}：enter > 0 要求上一章 hold = 1（当前 ${o}）`)}}this.keys=e}get count(){return this.keys.length}sample(e,n){const t=this.keys.length,r=Math.min(Math.max(Math.floor(e),0),t-1),s=Pe.clamp(n,0,1),o=this.keys[r],a=this.keys[Math.min(r+1,t-1)],l=o.enter??0;if(r>0&&l>0&&s<l)return vo.blend(this.keys[r-1],o,ic(s/l));const c=o.hold??this.hold,u=r<t-1&&c<1?ic((s-c)/(1-c)):0;return vo.blend(o,a,u)}sampleGlobal(e){const n=this.keys.length,t=Pe.clamp(e,0,n),r=Math.min(Math.floor(t),n-1);return this.sample(r,t-r)}static blend(e,n,t){var f;const r=new re(...e.dir??[0,1,0]).normalize(),s=new re(...n.dir??[0,1,0]).normalize(),o=r.lerp(s,t).normalize(),a=sc(e),l=sc(n),c=Pe.lerp(e.gaze==="target"?1:0,n.gaze==="target"?1:0,t);let u=null;return c>0&&(u=a&&l?a.clone().slerp(l,t):((f=a??l)==null?void 0:f.clone())??null),{radius:Pe.lerp(e.radius,n.radius,t),dir:o,fov:Pe.lerp(e.fov,n.fov,t),gazeBlend:c,gazeTargetQ:u,drift:Pe.lerp(e.drift??0,n.drift??0,t),orbit:Pe.lerp(e.orbit?1:0,n.orbit?1:0,t)}}}const Ps=.005,h0=[{radius:Ps,fov:78,gaze:"free",drift:.012},{radius:Ps,fov:78,gaze:"free",hold:1},{radius:Ps,fov:65,gaze:"target",target:{ra:270,dec:8},enter:.3},{radius:Ps,fov:45,gaze:"target",target:{ra:175,dec:81}},{radius:3,dir:[.52,.7,.49],fov:50,gaze:"free",orbit:!0},{radius:3,dir:[.52,.7,.49],fov:50,gaze:"free",orbit:!0},{radius:3,dir:[0,.55,.84],fov:50,gaze:"free",orbit:!0},{radius:5,dir:[.52,.7,.49],fov:45,gaze:"free"}],oc=.22,p0=`
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
  letter-spacing: ${oc}em;
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
    letter-spacing: ${oc}em;
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
`;let ac=!1;function g0(){if(ac||typeof document>"u")return;const i=document.createElement("style");i.dataset.ch1="",i.textContent=p0,document.head.appendChild(i),ac=!0}function Pi(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function m0(i){return i<0?0:i>1?1:i}function As(i,e,n){const t=m0((i-e)/(n-e));return t*t*(3-2*t)}function _0(i){g0();const e=i.root.querySelector(".pin"),{copy:n}=i,t=document.createElement("div");t.className="ch1-stage",t.innerHTML=`
    <p class="ch1-eyebrow">${Pi(n.eyebrow)}</p>
    <h1 class="ch1-title">${Pi(n.title)}</h1>
    <p class="ch1-hook">${Pi(n.hook)}</p>
    <div class="ch1-body">${n.body.map(f=>`<p>${Pi(f)}</p>`).join("")}</div>
    ${n.seal?`<div class="ch1-seal">${Pi(n.seal)}</div>`:""}
  `,e.appendChild(t);const r=document.createElement("div");r.className="ch1-cue",r.textContent="向下滚动 · 步入夜空",e.appendChild(r);const s=t.querySelector(".ch1-hook"),o=t.querySelector(".ch1-body"),a=t.querySelector(".ch1-seal");let l=-1;const c=new Map;function u(f,h,d=18){const g=c.get(f);g!==void 0&&Math.abs(g-h)<1e-4||(c.set(f,h),f.style.opacity=h.toFixed(3),f.style.transform=`translateY(${((1-h)*d).toFixed(2)}px)`)}return{enter(){i.sky.setLabelsEnabled(!1)},update(f){if(u(s,As(f,.15,.45)),u(o,As(f,.3,.6)),a){const d=As(f,.45,.75),g=c.get(a);(g===void 0||Math.abs(g-d)>=1e-4)&&(c.set(a,d),a.style.opacity=d.toFixed(3),a.style.transform=`translateY(${((1-d)*10).toFixed(2)}px) scale(${(1.3-.3*d).toFixed(3)})`)}const h=.65*(1-As(f,0,.35));(Math.abs(h-l)>=1e-4||l<0)&&(l=h,r.style.opacity=h.toFixed(3))},exit(){i.sky.setLabelsEnabled(!0)}}}const y0=Object.freeze(Object.defineProperty({__proto__:null,createChapter:_0},Symbol.toStringTag,{value:"Module"})),b0=100,v0=.08,x0=b0*v0,Ta=1.6,w0=.9,S0=26,k0=1.6,T0=.6,Mr=14,E0=2.6,Wo=.5,C0=.1,M0=.9,Uo=3.2,P0=.35,lc=.22,cc=1.15,A0=.65,R0=1.7,jo=[.45,.32,.58],Qo=[0,1.7,3.9],Ko=[1,.8,.9],Rs=new re(14,8,-90),O0=new re(0,1,0),L0=new re(1,0,0);function Si(i){return Math.min(Math.max(i,0),1)}function D0(i){return Math.min(S0,Math.max(0,i)*k0)}function uc(i){return i<=x0}function z0(i,e){return Ta+(i-Ta)*Math.exp(-2.2*e)}function I0(i,e,n){const t=Si(i),r=Si(e);if(n<=0||t===r)return t;const s=n/T0;return r>t?Math.min(r,t+s):Math.max(r,t-s)}function N0(i,e){return(Number.isFinite(e)?Si(e):0)*Math.sin(2*Math.PI*i/E0)}function fc(i){return[Wo*Ko[0]*Math.sin(jo[0]*i+Qo[0]),Wo*Ko[1]*Math.sin(jo[1]*i+Qo[1]),Wo*Ko[2]*Math.sin(jo[2]*i+Qo[2])]}function F0(i,e=Mr){if(e<=1)return 1;const n=Si(i/(e-1));return Math.pow(1-n,R0)}function $0(i,e=Mr){if(e<=1)return cc;const n=Si(i/(e-1));return cc*(1-A0*n)}function G0(){if(typeof document>"u")return null;const i=document.createElement("canvas");i.width=i.height=128;const e=i.getContext("2d"),n=e.createRadialGradient(64,64,0,64,64,64);return n.addColorStop(0,"rgba(255, 252, 240, 1)"),n.addColorStop(.25,"rgba(255, 233, 184, 0.95)"),n.addColorStop(.6,"rgba(255, 233, 184, 0.28)"),n.addColorStop(1,"rgba(255, 233, 184, 0)"),e.fillStyle=n,e.fillRect(0,0,128,128),new Ao(i)}const B0=`
attribute float aSize;
attribute float aFade;
varying float vFade;
void main() {
  vFade = aFade;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = aSize * (320.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
`,Y0=`
uniform sampler2D uMap;
varying float vFade;
void main() {
  vec4 tex = texture2D(uMap, gl_PointCoord);
  gl_FragColor = vec4(tex.rgb, tex.a * vFade);
}
`,H0=0,dc=1,hc=2;function X0(){const i=new kn;i.name="firefly";const e=G0(),n=new ja({map:e,transparent:!0,opacity:0,blending:Yr,depthTest:!1,depthWrite:!1}),t=new Qa(n);t.scale.set(Uo,Uo,1);const r=fc(0),s=new re(Rs.x+r[0],Rs.y+r[1],Rs.z+r[2]);t.position.copy(s),t.frustumCulled=!1,t.renderOrder=9,i.add(t);const o=new cs;o.setAttribute("position",new ar(new Float32Array(Mr*3),3).setUsage(No)),o.setAttribute("aSize",new ar(new Float32Array(Mr),1).setUsage(No)),o.setAttribute("aFade",new ar(new Float32Array(Mr),1).setUsage(No));const a=o.getAttribute("position"),l=o.getAttribute("aSize"),c=o.getAttribute("aFade"),u=new fu({uniforms:{uMap:{value:e}},vertexShader:B0,fragmentShader:Y0,transparent:!0,blending:Yr,depthTest:!1,depthWrite:!1}),f=new Ka(o,u);f.frustumCulled=!1,f.renderOrder=8,i.add(f);const h=Rs.clone(),d=s.clone();let g=null,p=H0;const m=new re(1,0,0),v=new re(0,1,0);let y=Ta,x=0,w=0,S=0,E=0,k=0;const A=[];let C=!1;function P(I,F){Sr.copy(h).sub(I),(F<.001||Sr.lengthSq()<1e-12)&&Sr.set(1,0,0),m.copy(Sr).normalize(),y=Math.max(F,.001),I.lengthSq()<1e-8?Zo.set(0,1,0):Zo.copy(I).normalize(),v.crossVectors(m,Zo),v.lengthSq()<1e-8&&v.crossVectors(m,Math.abs(m.y)<.99?O0:L0),v.normalize(),x=0,p=hc}function $(I){if(!Number.isFinite(I.x)||!Number.isFinite(I.y)||!Number.isFinite(I.z))return;g===null&&(g=new re),g.set(I.x,I.y,I.z);const F=h.distanceTo(g);uc(F)?P(g,F):p=dc}function _(I){k=Number.isFinite(I)?Si(I):0}function z(I){E=I?1:0}function N(I){if(C)return;const F=Number.isFinite(I)?Math.min(Math.max(I,0),C0):0;if(w+=F,S=I0(S,E,F),i.visible=S>.001,g!==null&&p===dc){Sr.copy(g).sub(h);const D=Sr.length();uc(D)?P(g,D):h.addScaledVector(Sr.divideScalar(D),D0(D)*F)}g!==null&&p===hc&&(y=z0(y,F),x+=w0*F,h.copy(g).addScaledVector(m,Math.cos(x)*y).addScaledVector(v,Math.sin(x)*y));const R=fc(w);d.set(h.x+R[0],h.y+R[1],h.z+R[2]);const L=N0(w,k);n.opacity=M0*(1+P0*L)*S;const b=Uo*(1+lc*L);t.scale.set(b,b,1),t.position.copy(d);const Y=A.length<Mr?new re:A.pop();Y.copy(d),A.unshift(Y);const U=A.length;for(let D=0;D<Mr;D++){const H=A[Math.min(D,U-1)];a.setXYZ(D,H.x,H.y,H.z),c.setX(D,F0(D)*S),l.setX(D,$0(D)*(1+lc*L))}a.needsUpdate=!0,c.needsUpdate=!0,l.needsUpdate=!0}function B(){C||(C=!0,i.removeFromParent(),n.dispose(),e==null||e.dispose(),o.dispose(),u.dispose())}return i.visible=!1,{group:i,flyTo:$,pulse:_,setVisible:z,update:N,dispose:B}}const Sr=new re,Zo=new re,ml=.35,Mf=.8,Ar=.05,hi=.3,to=5,Pf=.08,_l=["北斗","北极","天狼"],Af=4,no=.8,q0=10,Rf=20,Ea="ch2-awakened",Yi=0,En=1,Ca=2;function Ma(i){return Math.min(Math.max(i,0),1)}function Of(i){return i<ml?Yi:i<Mf?En:Ca}function Hi(i){for(const e of _l)if(!i.has(e))return e;return null}function Pa(i,e,n){return!i||n.has(i)?!1:e===null||i===e}const Aa=[{key:"ziwei",name:"紫微"},{key:"taiwei",name:"太微"},{key:"tianshi",name:"天市"},{key:"qinglong",name:"青龙"},{key:"xuanwu",name:"玄武"},{key:"baihu",name:"白虎"},{key:"zhuque",name:"朱雀"}];function Lf(i){return i.includes("紫微")?"ziwei":i.includes("太微")?"taiwei":i.includes("天市")?"tianshi":i.includes("苍龙")||i.includes("青龙")?"qinglong":i.includes("玄武")?"xuanwu":i.includes("白虎")?"baihu":i.includes("朱雀")?"zhuque":null}const Df=[.25,.5,.75,1];function ro(i,e){if(e<=0||i<=0)return 0;const n=i/e;let t=0;for(const r of Df)n+1e-9>=r&&(t+=1);return t}function zf(i){let e=0,n=0,t=0;for(const s of i){const[o,a,l]=Yt(s.ra,s.dec);e+=o,n+=a,t+=l}const r=Math.hypot(e,n,t);return r<1e-6?null:{ra:Math.atan2(t,e)*180/Math.PI,dec:Math.asin(n/r)*180/Math.PI}}function xo(i,e){const[n,t,r]=Yt(i.ra,i.dec),[s,o,a]=Yt(e.ra,e.dec),l=Math.min(1,Math.max(-1,n*s+t*o+r*a));return Math.acos(l)*180/Math.PI}function Ra(i,e,n){let t=null,r=1/0;for(const s of i){if(e.has(s.name))continue;const o=xo(s,n);o<r&&(r=o,t=s.name)}return t}function If(i){const e=Math.min(Math.max((5.5-i)*4,0),28);return 220*Math.pow(2,e/12)}function Nf(i,e=2){return i.split("，").slice(0,Math.max(1,e)).join("，")}function Ff(i){if(!i)return[];try{const e=JSON.parse(i);return Array.isArray(e)?e.filter(n=>typeof n=="string"&&n.length>0):[]}catch{return[]}}function Oa(i){const e=(hi-Ar)/to,n=[];for(let s=0;s<to;s++)n.push(Ma((i-(Ar+s*e))/e));const t=i<Ar?-1:Math.min(Math.floor((i-Ar)/e),to-1),r=Ma((i-hi)/(ml-hi));return{active:t,lines:n,finale:r}}const Jo=100,Os=.78,V0=1.6,W0=.12,U0=[3e4,2e4,12e3,1e4],j0=1400,pc=[{text:"北斗之宿七星明",label:"北斗",groups:["北斗"]},{text:"北极五星在其中",label:"北极",groups:["北极"]},{text:"三星中央色最深",label:"心宿",groups:["心宿"]},{text:"牛上直建三河鼓，鼓上三星号织女",label:"河鼓 · 织女",groups:["河鼓","织女"]},{text:"邱下一狼光蓬茸",label:"天狼",groups:["天狼"]}],Q0=[{ra:186,dec:56.5,ring:26},{ra:218.6,dec:76.8,ring:10},{ra:247.2,dec:-26.8,ring:8},{ra:297.7,dec:8.6,ring:8},{ra:101.3,dec:-16.7,ring:6}],K0=(()=>{const[i,e,n]=Yt(297.7,8.6),[t,r,s]=Yt(280.5,38.7),o=i+t,a=e+r,l=n+s,c=Math.hypot(o,a,l),u=Math.atan2(l,o)*180/Math.PI,f=Math.asin(a/c)*180/Math.PI;return[er(186,56.5),er(218.6,76.8),er(247.2,-26.8),er(u,f),er(101.3,-16.7)]})(),Z0=["一","二","三"],J0=`
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
`;let gc=!1;function eg(){if(gc||typeof document>"u")return;const i=document.createElement("style");i.dataset.ch2="",i.textContent=J0,document.head.appendChild(i),gc=!0}function wn(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}let Zt=null,Ji=null;function tg(){if(typeof window>"u")return;const i=window.AudioContext??window.webkitAudioContext;i&&(Zt||(Zt=new i,Ji=Zt.createGain(),Ji.gain.value=.12,Ji.connect(Zt.destination)),Zt.state==="suspended"&&Zt.resume())}function mc(i,e,n){if(tg(),!Zt||!Ji)return;const t=Zt.sampleRate,r=Math.max(2,Math.round(t/i)),s=Math.floor(t*e),o=Zt.createBuffer(1,s,t),a=o.getChannelData(0),l=new Float32Array(r);for(let f=0;f<r;f++)l[f]=Math.random()*2-1;let c=0;for(let f=0;f<s;f++){const h=l[c],d=l[(c+1)%r];l[c]=.996*.5*(h+d),a[f]=h*n,c=(c+1)%r}const u=Zt.createBufferSource();u.buffer=o,u.connect(Ji),u.start()}function ng(i){eg();const e=i.root.querySelector(".pin"),{copy:n}=i;function t(T,O){const K=document.createElement(T);return K.className=O,e.appendChild(K),K}const r=t("div","ch2-card ch2-title");r.innerHTML=`
    <p class="eyebrow">${wn(n.eyebrow)}</p>
    <div class="ch2-head">
      <h2>${wn(n.title)}</h2>
      ${n.seal?`<div class="seal">${wn(n.seal)}</div>`:""}
    </div>
    <p class="ch2-hook">${wn(n.hook)}</p>
    <p class="ch2-narr">${wn(n.body[0]??"")}</p>
  `;const s=t("div","ch2-lines"),o=pc.map(T=>{const O=document.createElement("div");return O.className="ch2-line",O.innerHTML=`<span class="ch2-line-text">${wn(T.text)}</span><span class="ch2-line-name">${wn(T.label)}</span>`,s.appendChild(O),O}),a=t("div","ch2-card ch2-finale");a.innerHTML=`<p class="ch2-finale-text">${wn(n.body[1]??"")}</p>`;const l=t("div","ch2-caption"),c=t("div","ch2-cross"),u=document.createElement("i");c.appendChild(u),c.appendChild(document.createElement("b"));const f=t("div","ch2-floats"),h=t("div","ch2-guidedone");h.textContent="星路已明，自去吧";const d=t("div","ch2-complete");d.textContent="三千年前的那首歌，你也唱完了";const g=t("div","ch2-scroll");g.innerHTML=`
    <div class="ch2-scroll-head"><span>唤星</span><b class="ch2-scroll-total">0 / 309</b></div>
    <div class="ch2-scroll-body"></div>
    <div class="ch2-scroll-foot">
      <span class="ch2-scroll-count">你已唤醒 0 颗</span>
      <button type="button" class="ch2-retreat">归隐</button>
    </div>
    <div class="ch2-badge"><i>歌成</i></div>
  `;const p=g.querySelector(".ch2-scroll-body"),m=g.querySelector(".ch2-scroll-total"),v=g.querySelector(".ch2-scroll-count"),y=g.querySelector(".ch2-retreat"),x=new Map;for(const T of Aa){const O=document.createElement("div");O.className="ch2-region",O.innerHTML=`<span>${T.name}</span><i class="ch2-region-bar"><b></b></i><em>0/0</em>`,p.appendChild(O),x.set(T.key,{bar:O.querySelector(".ch2-region-bar b"),num:O.querySelector("em")})}const w=t("div","ch2-card ch2-explore");w.innerHTML=`
    <h2>现在，把星空交给你</h2>
    <p>${wn(n.body[2]??"")}</p>
  `;const S=t("div","atlas-hint");S.textContent="拖拽环视 · 点击或凝视沉睡的星";let E=null,k=[];const A=new Map;Promise.all([fetch(Ln("data/poem.json")).then(T=>T.ok?T.json():null),fetch(Ln("data/stars.json")).then(T=>T.ok?T.json():null),fetch(Ln("data/asterisms.json")).then(T=>T.ok?T.json():null)]).then(([T,O,K])=>{if(E=T,!O||!K)return;const pe=new Map(O.stars.map(xe=>[xe.hip,xe])),ke=[];for(const xe of K.asterisms){const ht=xe.stars.map(br=>pe.get(br)).filter(br=>br!==void 0),Tn=zf(ht);if(!Tn)continue;const[kd,Td,Ed]=Yt(Tn.ra,Tn.dec,Jo);let Io=3,ws=null;for(const br of ht)Io=Math.max(Io,xo(Tn,br)),(ws===null||br.mag<ws)&&(ws=br.mag);const Cd=Math.max(6,Jo*Math.tan(Io*Math.PI/180)*1.35);ke.push({name:xe.name,region:T!=null&&T[xe.name]?Lf(T[xe.name].from):null,ra:Tn.ra,dec:Tn.dec,x:kd,y:Td,z:Ed,ring:Cd,mag:ws})}k=ke,A.clear();for(const xe of ke)A.set(xe.name,xe);ft(),C===En&&yt()}).catch(()=>{});let C=-1,P=0;const $=new Set(Xt());let _=$.size>0&&Hi($)===null,z=0,N=0,B=null,I=0;const F=new Wt;let R=!1,L=0,b=null,Y=!1,U=[],D=null,H=null,W=null,te=null,q=null,_e=0,Se=0;const me=new Set;let Ie=0,Ce=!1;const j=new Wt;let ie=null,He="",nt=8,M=!1,Ae=null,ct=!1,mt=!1,ye=!1,de=!1,Ne=!1,ut=!1,Fe=!1,bn=-2,Re=!1;function Xt(){try{return Ff(window.localStorage.getItem(Ea))}catch{return[]}}function Tt(){try{window.localStorage.setItem(Ea,JSON.stringify([...$]))}catch{}}function Ot(){return k.length>0?k.length:i.sky.groupCount}function Qn(T){const O=i.sky.groupCount;for(let K=0;K<O;K++)i.sky.setGroupProgress(K,T)}function Le(){const T=i.sky.groupCount;for(let O=0;O<T;O++)i.sky.setGroupProgress(O,Pf);for(const O of $)i.sky.setGroupProgress(O,1)}function In(T){ct!==T&&(ct=T,r.classList.toggle("on",T))}function Lt(T){mt!==T&&(mt=T,a.classList.toggle("on",T))}function vn(T){ye!==T&&(ye=T,w.classList.toggle("on",T))}function xn(T){de!==T&&(de=T,S.classList.toggle("on",T))}function qt(T){bn!==T&&(bn=T,o.forEach((O,K)=>O.classList.toggle("on",K===T)))}function Vt(T){const O=T!==null;O&&(l.textContent=T),!(Ne===O&&!O)&&(Ne=O,l.classList.toggle("on",O))}function se(T){ut!==T&&(ut=T,c.classList.toggle("on",T),T||ln(0))}function ln(T){const O=Ma(T);u.style.borderColor=O>0?`rgba(201, 162, 39, ${.55+.45*O})`:"",u.style.transform=O>0?`scale(${1+.3*O})`:"",u.style.boxShadow=O>0?`0 0 ${8+10*O}px rgba(201, 162, 39, ${.3+.5*O})`:""}function _t(T){Fe!==T&&(Fe=T,g.classList.toggle("on",T))}function Dt(T,O){T.classList.remove(O),T.offsetWidth,T.classList.add(O)}function ft(){const T={ziwei:0,taiwei:0,tianshi:0,qinglong:0,xuanwu:0,baihu:0,zhuque:0},O={...T};for(const pe of k)pe.region&&(O[pe.region]+=1,$.has(pe.name)&&(T[pe.region]+=1));for(const pe of Aa){const ke=x.get(pe.key);if(!ke)continue;const xe=O[pe.key],ht=T[pe.key];ke.bar.style.width=xe>0?`${(ht/xe*100).toFixed(1)}%`:"0%",ke.num.textContent=`${ht}/${xe}`}const K=Ot();m.textContent=K>0?`${$.size} / ${K}`:`${$.size} / —`,v.textContent=`你已唤醒 ${$.size} 颗`}function Nn(){if(Ae)return Ae;const T=document.createElement("canvas");T.width=T.height=128;const O=T.getContext("2d");return O.strokeStyle="rgba(240, 205, 110, 0.95)",O.lineWidth=6,O.shadowColor="rgba(201, 162, 39, 0.9)",O.shadowBlur=14,O.beginPath(),O.arc(64,64,48,0,Math.PI*2),O.stroke(),Ae=new Ao(T),Ae}function Fn(T,O,K,pe){const ke=`${T.toFixed(1)},${O.toFixed(1)},${K.toFixed(1)},${pe.toFixed(1)}`;if(ie&&He===ke)return;dt();const xe=new ja({map:Nn(),transparent:!0,depthTest:!1,depthWrite:!1,opacity:.9}),ht=new Qa(xe);ht.position.set(T,O,K),ht.scale.set(pe,pe,1),ht.renderOrder=998,i.sky.addSkyObject(ht),ie=ht,He=ke,nt=pe}function dt(){ie&&(i.sky.removeSkyObject(ie),ie.material.dispose(),ie=null,He="")}function $n(){te!==null&&(clearTimeout(te),te=null)}function ne(){for(const T of U)T.kill();U=[]}function Z(T,O){const K={v:0},pe=at.to(K,{v:1,duration:O,ease:"power1.out",onUpdate:()=>i.sky.setGroupProgress(T,K.v),onComplete:()=>{U=U.filter(ke=>ke!==pe)}});U.push(pe)}function ue(){return Os+W0*Math.min(z,3)}const G={v:Os};function ee(T,O){D==null||D.kill(),D=at.to(G,{v:T,duration:O,ease:"power2.out",onUpdate:()=>i.sky.setBloom({strength:G.v}),onComplete:()=>{D=null}})}function Q(){D==null||D.kill(),G.v=V0,i.sky.setBloom({strength:G.v}),ee(ue(),.8)}const J={v:1};function Ue(){H==null||H.kill(),J.v=.5,i.sky.setTimeScale(.5),H=at.to(J,{v:1,delay:.4,duration:.6,ease:"power2.inOut",onUpdate:()=>i.sky.setTimeScale(J.v),onComplete:()=>{H=null}})}function fe(){H&&(H.kill(),H=null),J.v!==1&&(J.v=1,i.sky.setTimeScale(1))}function $e(T){const O=E==null?void 0:E[T.name],K=document.createElement("div");K.className="ch2-poemfloat";const pe=O?Nf(O.text,2):T.name,ke=O?`《步天歌》 · ${O.from}`:"";K.innerHTML=`<span class="ch2-poemfloat-text">${wn(pe)}</span>${ke?`<span class="ch2-poemfloat-from">${wn(ke)}</span>`:""}`;const xe=du([T.x,T.y,T.z],i.sky.camera,{width:window.innerWidth,height:window.innerHeight}),ht=xe?xe.x+40:window.innerWidth*.62,Tn=xe?xe.y:window.innerHeight*.42;K.style.left=`${Math.min(Math.max(ht,110),window.innerWidth-110)}px`,K.style.top=`${Math.min(Math.max(Tn,140),window.innerHeight-140)}px`,f.appendChild(K),me.add(K),K.addEventListener("animationend",()=>{me.delete(K),K.remove()})}function rt(){me.forEach(T=>T.remove()),me.clear()}function De(T){const O=A.get(T);if(!O||C===Yi||(Fn(O.x,O.y,O.z,O.ring),!ie))return;W==null||W.kill(),M=!0;const K={o:0};ie.material.opacity=0,W=at.to(K,{o:.8,duration:.9,ease:"sine.inOut",yoyo:!0,repeat:1,onUpdate:()=>{ie&&(ie.material.opacity=K.o)},onComplete:()=>{W=null,M=!1,dt()}})}function Me(){b||(b=X0()),Y||(i.sky.addSkyObject(b.group),Y=!0)}function ge(){return C!==En?null:Hi($)}function yt(){if(C!==En)return;const T=Hi($);if(T){const O=_l.indexOf(T);Vt(`第${Z0[O]??O+1}站 · 「${T}」——跟着星使：点它，或凝视它`);const K=A.get(T);K&&(Me(),b.setVisible(!0),b.flyTo({x:K.x,y:K.y,z:K.z}));return}Vt(null),_||(_=!0,Oe())}function Oe(){Dt(h,"on"),b&&(b.pulse(1),$n(),te=setTimeout(()=>{te=null,b==null||b.setVisible(!1)},j0))}function bt(T){if(!Pa(T,ge(),$))return;const O=A.get(T);$.add(T),Tt(),i.sky.hideDetailCard(),Ue(),Z(T,1.1),O&&(i.sky.spawnBurst({x:O.x,y:O.y,z:O.z},{count:90}),$e(O),mc(If(O.mag??4.5),.9,.85)),Q(),b&&C===En&&b.pulse(1),N=0,B=null,I=0,ft(),cn(),yt()}function cn(){const T=ro($.size,Ot());if(!(T<=z)){if(z=T,z>=4){Ze();return}ee(ue(),1.5),i.sky.spawnMeteors(z)}}function Ze(){ee(ue(),1.5),i.sky.spawnMeteors(8),Dt(d,"on"),g.classList.add("done"),mc(523.25,1.4,.8)}function Je(){$.clear(),Tt(),_=!1,z=0,$n(),h.classList.remove("on"),d.classList.remove("on"),g.classList.remove("done"),ne(),ee(Os,.9),Le(),N=0,B=null,I=0,L=0,ft(),C===En&&yt()}y.addEventListener("click",Je);function it(T){if(I=0,!T||C!==En&&C!==Ca)return;const O=T.info.name;Pa(O,ge(),$)&&bt(O)}const un=new re;function _r(){return i.sky.camera.getWorldDirection(un),{ra:Math.atan2(un.z,un.x)*180/Math.PI,dec:Math.asin(Math.min(1,Math.max(-1,un.y)))*180/Math.PI}}function je(){return C===En||C===Ca}function qe(T){if(!je()||k.length===0||T<=0)return;const O=_r(),pe=ge()??Ra(k,$,O),ke=pe?A.get(pe):null,xe=ke?xo(O,ke):1/0;se(ke!==null&&xe<q0),ke&&xe<Af?(B!==ke.name&&(B=ke.name,N=0),N+=T,ln(N/no),N>=no&&(ln(0),bt(ke.name))):(N>0||B!==null)&&(N=0,B=null,ln(0))}function fn(T){if(!je()||ge()!==null||k.length===0){I=0;return}const O=i.sky.camera.quaternion;if(!R){R=!0,F.copy(O);return}if(F.angleTo(O)>4e-4){I=0,F.copy(O);return}if(I+=T,I>=Rf){I=0;const K=Ra(k,$,_r());K&&De(K)}}function Ti(T){if(!je()||z<1)return;const O=U0[Math.min(z,4)-1];if(L<=0){L=T+O;return}T>=L&&(L=T+O,i.sky.spawnMeteors(1))}function Ei(T){_e=requestAnimationFrame(Ei);const O=Se>0?Math.min((T-Se)/1e3,.1):0;if(Se=T,b&&Y&&(b.update(O),C===En&&ge()!==null)){const K=.35+.2*Math.sin(T*.003);b.pulse(Math.min(1,K+N/no*.5))}if(qe(O),fn(O),Ti(T),ie&&!M){const K=nt*(1+.13*Math.sin(T*.0024));ie.scale.set(K,K,1),ie.material.opacity=.7+.3*Math.sin(T*.0024+1)}}function yr(T){T===Yi?(i.sky.setPickingEnabled(!1),i.sky.setLabelsEnabled(!0),i.sky.setHoverTipEnabled(!0),Qn(0),Re=!1,Vt(null),se(!1),_t(!1),vn(!1),xn(!1),b==null||b.setVisible(!1),dt()):T===En?(i.sky.setPickingEnabled(!0),i.sky.setLabelsEnabled(!1),i.sky.setHoverTipEnabled(!0),In(!1),qt(-1),Lt(!1),vn(!1),xn(!1),dt(),Le(),z=ro($.size,Ot()),i.sky.setBloom({strength:ue()}),g.classList.toggle("done",z>=4),_=Hi($)===null,ft(),_t(!0),yt()):(i.sky.setPickingEnabled(!0),i.sky.setLabelsEnabled(!0),i.sky.setHoverTipEnabled(!0),In(!1),qt(-1),Lt(!1),Vt(null),b==null||b.setVisible(!1),dt(),Le(),z=ro($.size,Ot()),i.sky.setBloom({strength:ue()}),g.classList.toggle("done",z>=4),ft(),_t(!0),vn(!0),xn(!0))}function dn(T){const O=Oa(T);(O.finale>0||Re)&&(Qn(O.finale),Re=O.finale>0),O.lines.forEach((pe,ke)=>{const xe=pc[ke];if(!xe)return;const ht=Math.max(O.finale,ke===O.active?pe:pe*.15);for(const Tn of xe.groups)i.sky.setGroupProgress(Tn,ht)}),In(T<Ar);const K=T>=Ar&&T<hi?O.active:-1;if(qt(K),K>=0){const pe=Q0[K];if(pe){const[ke,xe,ht]=Yt(pe.ra,pe.dec,Jo);Fn(ke,xe,ht,pe.ring)}}else dt();Lt(T>=hi)}function Kn(T){P=T;const O=Of(T);O!==C&&(C=O,yr(O)),C===Yi&&dn(T)}function jr(T){const O=C===Yi&&P>=Ar&&P<hi?Oa(P).active:-1,K=O>=0?.85:0;if(Ie+=(K-Ie)*(1-Math.exp(-3*T)),Ie<.01){Ce&&(Ce=!1,i.sky.setGazeBlend(0));return}const pe=K0[Math.max(O,0)];Ce?j.slerp(pe,1-Math.exp(-2.5*T)):(Ce=!0,j.copy(pe)),i.sky.setGazeBlend(Ie,j)}return{enter(){i.root.classList.add("inview"),q==null||q(),q=i.sky.onPick(it),_e&&cancelAnimationFrame(_e),Se=0,_e=requestAnimationFrame(Ei),Kn(P)},update(T){Kn(T)},frame(T){jr(T)},exit(){i.root.classList.remove("inview"),cancelAnimationFrame(_e),_e=0,Se=0,q==null||q(),q=null,$n(),ne(),W==null||W.kill(),W=null,M=!1,fe(),D&&(D.kill(),D=null),i.sky.setBloom({strength:Os}),dt(),Ae==null||Ae.dispose(),Ae=null,b&&Y&&(b.setVisible(!1),i.sky.removeSkyObject(b.group),Y=!1),rt(),h.classList.remove("on"),d.classList.remove("on"),N=0,B=null,I=0,R=!1,L=0,Ie=0,Ce=!1,i.sky.setGazeBlend(0),i.sky.setLabelsEnabled(!0),i.sky.setHoverTipEnabled(!0),i.sky.setPickingEnabled(!1);for(const T of $)i.sky.setGroupProgress(T,1);In(!1),qt(-1),Lt(!1),Vt(null),se(!1),_t(!1),vn(!1),xn(!1),C=-1,Zt==null||Zt.suspend()}}}const rg=Object.freeze(Object.defineProperty({__proto__:null,CH2_GAZE_ANGLE_DEG:Af,CH2_GAZE_HOLD_S:no,CH2_GUIDE_STATIONS:_l,CH2_IDLE_PULSE_S:Rf,CH2_REGIONS:Aa,CH2_SEG1_END:ml,CH2_SEG1_LINE_COUNT:to,CH2_SEG2_END:Mf,CH2_SLEEP_DIM:Pf,CH2_STORAGE_KEY:Ea,CH2_UNLOCKS:Df,ch2AngularDistanceDeg:xo,ch2CanAwaken:Pa,ch2Centroid:zf,ch2GuideTarget:Hi,ch2NearestSleeping:Ra,ch2ParseAwakened:Ff,ch2PluckFreq:If,ch2PoemExcerpt:Nf,ch2RegionOf:Lf,ch2Seg1LineStates:Oa,ch2SegmentOf:Of,ch2UnlockTier:ro,createChapter:ng},Symbol.toStringTag,{value:"Module"})),$f=Math.PI/180,ig=34.7,Gf=8,ai=355,La=["冬至","小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪"];function sg(i){return-23.44*Math.cos(2*Math.PI*(i+10)/365.25)}function Da(i){return 90-Math.abs(ig-sg(i))}function _c(i){return Gf/Math.tan(Da(i)*$f)}function og(i){let e=0,n=999,t=0;for(let r=0;r<La.length;r++){const s=(ai+r*15.22)%365;let o=i-s;o>182.5?o-=365:o<-182.5&&(o+=365),Math.abs(o)<n&&(n=Math.abs(o),e=r,t=o)}return{name:La[e],index:e,day:(ai+e*15.22)%365,offset:Math.round(t)}}function ag(i){const e=[31,28,31,30,31,30,31,31,30,31,30,31];let n=Math.min(Math.max(Math.round(i),1),365),t=0;for(;t<11&&n>e[t];)n-=e[t],t++;return{month:t+1,day:n}}const Ls=["零","一","二","三","四","五","六","七","八","九"];function ea(i){if(i<10)return Ls[i];if(i<20)return"十"+(i%10?Ls[i%10]:"");const e=Math.floor(i/10);return Ls[e]+"十"+(i%10?Ls[i%10]:"")}function Kr(i){return i-Math.floor(i)}function lg(i,e,n,t,r,s){i.beginPath(),i.moveTo(e+s,n),i.arcTo(e+t,n,e+t,n+r,s),i.arcTo(e+t,n+r,e,n+r,s),i.arcTo(e,n+r,e,n,s),i.arcTo(e,n,e+t,n,s),i.closePath()}function cg(){const i=document.createElement("canvas");i.width=64,i.height=64;const e=i.getContext("2d");if(e){const n=e.createRadialGradient(32,32,2,32,32,32);n.addColorStop(0,"rgba(252, 225, 182, 0.9)"),n.addColorStop(.3,"rgba(252, 225, 182, 0.25)"),n.addColorStop(1,"rgba(252, 225, 182, 0)"),e.fillStyle=n,e.fillRect(0,0,64,64)}return i}const Zr=8,kr=15,ug=`
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
`;let yc=!1;function fg(){if(yc||typeof document>"u")return;const i=document.createElement("style");i.dataset.gnomonWidget="",i.textContent=ug,document.head.appendChild(i),yc=!0}function dg(i={}){fg();const e=document.createElement("div");e.className="gw",e.setAttribute("role","group"),e.setAttribute("aria-label","圭表测影：拖动滑杆查看一年中正午日影变化");const n=document.createElement("canvas");n.className="gw-canvas",e.appendChild(n);const t=document.createElement("div");t.className="gw-readout",t.innerHTML=`
    <div class="gw-cell"><span class="gw-k">日期</span><span class="gw-v" data-r="date">——</span></div>
    <div class="gw-cell"><span class="gw-k">节气</span><span class="gw-v" data-r="term">——</span></div>
    <div class="gw-cell"><span class="gw-k">正午影长</span><span class="gw-v" data-r="shadow">——</span></div>
    <div class="gw-cell"><span class="gw-k">太阳高度</span><span class="gw-v" data-r="alt">——</span></div>`,e.appendChild(t);const r=t.querySelector('[data-r="date"]'),s=t.querySelector('[data-r="term"]'),o=t.querySelector('[data-r="shadow"]'),a=t.querySelector('[data-r="alt"]'),l=document.createElement("div");l.className="gw-slider-wrap";const c=document.createElement("input");c.className="gw-slider",c.type="range",c.min="1",c.max="365",c.step="1",c.value=String(ai),c.setAttribute("aria-label","一年中的第几天"),l.appendChild(c);const u=document.createElement("div");u.className="gw-marks";for(const _ of["冬至","春分","夏至","秋分"]){const z=La.indexOf(_),N=(ai+z*15.22)%365,B=(N-1)/364,I=`calc(7px + (100% - 14px) * ${B.toFixed(4)})`,F=document.createElement("i");F.className="gw-tick",F.style.left=I,u.appendChild(F);const R=document.createElement("button");R.type="button",R.className="gw-mark"+(B<.08?" gw-mark--start":B>.92?" gw-mark--end":""),R.style.left=I,R.textContent=_,R.title=`跳至${_}（第 ${Math.round(N)} 天）`,R.addEventListener("click",()=>E(Math.round(N))),u.appendChild(R)}l.appendChild(u),e.appendChild(l);const f=n.getContext("2d");if(!f){const _=document.createElement("p");_.className="gw-fallback",_.textContent="当前浏览器无法创建绘图上下文，圭表测影演示不可用。",n.replaceWith(_)}const h=cg(),d=Array.from({length:14},(_,z)=>({rx:Kr(Math.sin(z*12.9898)*43758.5453),ry:Kr(Math.sin(z*78.233)*12543.217),len:.1+.25*Kr(Math.sin(z*3.7)*9876.543),dark:z%2===0})),g=Array.from({length:5},(_,z)=>({dx:-.3+.6*Kr(Math.sin(z*5.13)*3210.7),ry:.12+.76*Kr(Math.sin(z*9.31)*7777.7),h:.08+.12*Kr(Math.sin(z*2.17)*5555.5)}));let p=ai,m=ai,v=!1,y=!0,x=0,w=0,S=0;function E(_){m=Math.min(Math.max(_,1),365),k()}function k(){x||(x=requestAnimationFrame(A))}function A(){var B;x=0;const _=p,z=m-p;p=Math.abs(z)<.04?m:p+z*.2;const N=p!==_;(N||y)&&(C(),P(),y=!1),N&&((B=i.onDayChange)==null||B.call(i,p)),p!==m&&(x=requestAnimationFrame(A))}function C(){const _=Math.min(Math.max(Math.round(p),1),365),z=ag(_);r.textContent=`${z.month} 月 ${z.day} 日 · 第 ${_} 天`;const N=og(_);s.textContent=N.offset===0?`正值【${N.name}】`:N.offset>0?`【${N.name}】后 ${N.offset} 天`:`距【${N.name}】 ${-N.offset} 天`;const B=_c(p);let I=Math.floor(B),F=Math.round((B-I)*10);F===10&&(I+=1,F=0),o.textContent=`${ea(I)}尺${F>0?ea(F)+"寸":"整"} · ${B.toFixed(2)} 尺`,a.textContent=`${Da(p).toFixed(1)}°`,!v&&document.activeElement!==c&&(c.value=String(_))}function P(){if(!f||w<60||S<60)return;const _=f,z=w,N=S;_.clearRect(0,0,z,N);const B=_.createLinearGradient(0,0,0,N);B.addColorStop(0,"rgba(22, 38, 56, 0.5)"),B.addColorStop(.6,"rgba(13, 13, 17, 0.12)"),B.addColorStop(1,"rgba(13, 13, 17, 0.4)"),_.fillStyle=B,_.fillRect(0,0,z,N);const I=_c(p),F=Da(p),R=Math.min(Math.max(F,6),82)*$f,L=N-62,b=Math.min((z-150)/14.2,(L-92)/8),Y=Gf*b,U=13.6*b,D=(z-U-110)/2+100,H=L-Y,W=D+I*b,te=D-12,q=D+U,_e=_.createRadialGradient(D-60,L,0,D-60,L,220);_e.addColorStop(0,`rgba(252, 225, 182, ${(.05+.04*Math.sin(R)).toFixed(3)})`),_e.addColorStop(1,"rgba(252, 225, 182, 0)"),_.fillStyle=_e,_.fillRect(0,L-160,z,200),_.strokeStyle="rgba(175, 145, 95, 0.35)",_.lineWidth=1,_.beginPath(),_.moveTo(14,L+kr),_.lineTo(z-14,L+kr),_.stroke();const Se=_.createLinearGradient(0,L,0,L+Zr);Se.addColorStop(0,"#3b4552"),Se.addColorStop(1,"#252d38"),_.fillStyle=Se,lg(_,te,L,q-te,Zr,2.5),_.fill();const me=_.createLinearGradient(0,L+Zr,0,L+kr);me.addColorStop(0,"#1a212b"),me.addColorStop(1,"#10151d"),_.fillStyle=me,_.fillRect(te,L+Zr,q-te,kr-Zr),_.strokeStyle="rgba(252, 225, 182, 0.14)",_.beginPath(),_.moveTo(te+2,L+.5),_.lineTo(q-2,L+.5),_.stroke();for(const de of d){const Ne=te+6+de.rx*(q-te-12),ut=L+1.5+de.ry*(kr-3);_.strokeStyle=de.dark?"rgba(0, 0, 0, 0.16)":"rgba(252, 225, 182, 0.05)",_.beginPath(),_.moveTo(Ne,ut),_.lineTo(Ne+de.len*40,ut),_.stroke()}const Ie=b>=26;_.lineWidth=1;for(let de=0;de<=136;de++){const Ne=de%10===0;if(!Ne&&!Ie&&de%5!==0)continue;const ut=D+de*b/10;if(ut>q-1.5)break;const Fe=Ne?6:de%5===0?4:2.5;_.strokeStyle=Ne?"rgba(8, 10, 14, 0.9)":"rgba(8, 10, 14, 0.6)",_.beginPath(),_.moveTo(ut,L+1),_.lineTo(ut,L+1+Fe),_.stroke()}_.font='9px "STSong", "SimSun", "Songti SC", serif',_.fillStyle="rgba(175, 145, 95, 0.9)",_.textAlign="center",_.textBaseline="top";for(let de=0;de<=13;de++){const Ne=D+de*b;if(Ne>q-2)break;_.fillText(ea(de),Ne,L+kr+4)}const Ce=_.createLinearGradient(D,0,W,0);Ce.addColorStop(0,"rgba(3, 5, 9, 0.78)"),Ce.addColorStop(.75,"rgba(3, 5, 9, 0.55)"),Ce.addColorStop(1,"rgba(3, 5, 9, 0.15)"),_.fillStyle=Ce,_.fillRect(D,L+1,Math.max(W-D,1.5),Zr-1),_.strokeStyle="#c9a227",_.lineWidth=1.5,_.beginPath(),_.moveTo(W,L-4),_.lineTo(W,L+kr),_.stroke(),_.save(),_.translate(W,L-7),_.rotate(Math.PI/4),_.fillStyle="#c9a227",_.fillRect(-2.4,-2.4,4.8,4.8),_.restore();const j=Math.max(6,b*.38),ie=_.createLinearGradient(D-j/2,0,D+j/2,0);ie.addColorStop(0,"#3f2e1a"),ie.addColorStop(.35,"#a87f3d"),ie.addColorStop(.5,"#dcba68"),ie.addColorStop(.65,"#a87f3d"),ie.addColorStop(1,"#372812"),_.fillStyle=ie,_.fillRect(D-j/2,H,j,Y);for(const de of g)_.fillStyle="rgba(112, 148, 126, 0.14)",_.fillRect(D+de.dx*j-.75,H+de.ry*Y,1.5,de.h*Y);_.fillStyle="#8a6a35",_.beginPath(),_.moveTo(D-j*.85,H),_.lineTo(D-j*.42,H-6),_.lineTo(D+j*.42,H-6),_.lineTo(D+j*.85,H),_.closePath(),_.fill(),_.strokeStyle="rgba(252, 225, 182, 0.35)",_.lineWidth=1,_.beginPath(),_.moveTo(D-j*.42,H-6),_.lineTo(D+j*.42,H-6),_.stroke();const He=_.createLinearGradient(0,L-11,0,L);He.addColorStop(0,"#5a4423"),He.addColorStop(1,"#2c2010"),_.fillStyle=He,_.beginPath(),_.moveTo(D-j*.8,L-11),_.lineTo(D+j*.8,L-11),_.lineTo(D+j*1.7,L),_.lineTo(D-j*1.7,L),_.closePath(),_.fill(),_.font='10px "STSong", "SimSun", "Songti SC", serif',_.fillStyle="rgba(201, 162, 39, 0.8)",_.textAlign="center",_.textBaseline="top";const nt=D-j/2-11;"表高八尺".split("").forEach((de,Ne)=>{_.fillText(de,nt,H+18+Ne*13)});const M=-Math.cos(R),Ae=-Math.sin(R);let ct=Math.min(170,(H-28)/Math.sin(R),(D-30)/Math.cos(R));ct=Math.max(ct,26);const mt=D+M*ct,ye=H+Ae*ct;_.drawImage(h,mt-30,ye-30,60,60),_.fillStyle="#fce1b6",_.beginPath(),_.arc(mt,ye,8.5,0,Math.PI*2),_.fill(),_.strokeStyle="rgba(201, 162, 39, 0.75)",_.lineWidth=1,_.beginPath(),_.arc(mt,ye,11.5,0,Math.PI*2),_.stroke(),_.strokeStyle="rgba(252, 225, 182, 0.4)",_.beginPath(),_.moveTo(mt-M*12,ye-Ae*12),_.lineTo(D,H),_.stroke(),_.setLineDash([3,4]),_.strokeStyle="rgba(252, 225, 182, 0.22)",_.beginPath(),_.moveTo(D,H),_.lineTo(W,L),_.stroke(),_.setLineDash([])}c.addEventListener("input",()=>{const _=Number(c.value);m=_,v||(p=_),k()}),c.addEventListener("pointerdown",()=>{v=!0}),window.addEventListener("pointerup",()=>{v=!1}),window.addEventListener("pointercancel",()=>{v=!1});function $(){const _=n.clientWidth,z=n.clientHeight;if(!(_===w&&z===S)){if(w=_,S=z,f&&_>0&&z>0){const N=Math.min(window.devicePixelRatio||1,2);n.width=Math.round(_*N),n.height=Math.round(z*N),f.setTransform(N,0,0,N,0,0)}y=!0,k()}}return typeof ResizeObserver<"u"?new ResizeObserver($).observe(n):window.addEventListener("resize",$),$(),{el:e,get day(){return p},setDayTarget:E}}const hg=`
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
`;let bc=!1;function pg(){if(bc||typeof document>"u")return;const i=document.createElement("style");i.dataset.gnomonLayout="",i.textContent=hg,document.head.appendChild(i),bc=!0}function Ai(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function vc(i){return i/365*Math.PI*2}function gg(i){const e=i.root.querySelector(".pin"),{copy:n}=i,t=document.createElement("div");t.className="gnomon-layout";const r=document.createElement("div");r.className="chapter-panel",r.innerHTML=`
    <p class="eyebrow">${Ai(n.eyebrow)}</p>
    <div class="chapter-head">
      <h2>${Ai(n.title)}</h2>
      ${n.seal?`<div class="seal">${Ai(n.seal)}</div>`:""}
    </div>
    <p class="hook">${Ai(n.hook)}</p>
    ${n.body.map(a=>`<p>${Ai(a)}</p>`).join("")}
  `,t.appendChild(r);let s=!1;const o=dg({onDayChange:a=>{s&&i.sky.setSkyRotation(vc(a),0)}});return t.appendChild(o.el),e.appendChild(t),pg(),{enter(){s=!0,i.root.classList.add("inview"),i.sky.setLabelsEnabled(!1),i.sky.setSkyRotation(vc(o.day),0)},update(a){const l=Math.min(Math.max(a,0),1);o.setDayTarget(1+l*364)},exit(){s=!1,i.root.classList.remove("inview"),i.sky.setLabelsEnabled(!0),i.sky.setSkyRotation(0,0)}}}const mg=Object.freeze(Object.defineProperty({__proto__:null,createChapter:gg},Symbol.toStringTag,{value:"Module"})),_g={ch1:{eyebrow:"其壹 · 序 PROLOGUE",title:"步天歌",hook:"三千年前，中国人开始给星星命名。",body:["先民把群星分作星官，各有职司。到三国陈卓汇总三家星经时，这张名单已录下二百八十三官、一千四百六十余星。","《步天歌》是把整张星表写成的长诗，一句一宿，循诗可以认星。本站以它为题，把这份名录还原成一片可以走进去的夜空。","向下滚动，步入夜空。"],seal:"步"},ch2:{eyebrow:"其贰 · 唤星之旅 THE AWAKENING",title:"唤星之旅",hook:"夜空睡着了。跟着流萤，把星星一颗颗唤回来。",body:["古人认星，靠一首歌。《步天歌》把全天星官谱成韵语，一句一宿，循诗可以认星。","三垣居中，四象环列——中国人给天空立的法。","余下的星，由你亲手唤醒。拖拽环视，点击或凝视任意一颗沉睡的星，听听它的那句诗。"],seal:"唤"},ch3:{eyebrow:"其叁 · 观象授时 THE GNOMON",title:"观象授时",hook:"一根八尺之表，一条量影之圭，就是一个王朝的天文台。",body:["正午测日影：影最长的那一天是冬至，最短的那一天是夏至。两至既定，四时均分，二十四节气由此排出。","河南登封至今立着这件仪器的放大版：元代郭守敬所建观星台，以高表测影，为《授时历》测得回归年长 365.2425 日——与三百年后的格里历相同。","所谓观象授时：历法的权威，来自对天空的测量。"],seal:"表"},ch4:{eyebrow:"其肆 · 天人之间 THE POLE STAR",title:"天人之间",hook:"全天最尊贵的星域，围着北极建了一座城。",body:["紫微垣，天上的宫城：左右两垣为墙，墙内住着皇族、帝座与百官。","天的秩序映照人的秩序——星官有名有职，如同朝廷。观星，也是观天下。"],seal:"极"},ch5:{eyebrow:"其伍 · 天球仪 THE CELESTIAL SPHERE",title:"天球仪",hook:"「浑天如鸡子，天体圆如弹丸，地如鸡中黄。」——张衡《浑天仪注》",body:["东汉张衡造浑天仪：铜球缀列星，绕轴而转，演示周天星象的起落。天，被做成一颗可以转动的球。","在这里，平面的星图重新团回天球。用你的手指转动它，像转动一件两千年前的仪器。"],seal:"球"},ch6:{eyebrow:"其陆 · 岁差 PRECESSION",title:"一万年",hook:"地轴是一支缓慢摇晃的陀螺，约两万六千年才转完一圈。",body:["东晋虞喜最先察觉：冬至点每年都在悄悄西移，约五十年退一度。他称之为「岁差」——天自为天，岁自为岁。","于是北极星也会换届：三千年前，周的天下以「帝星」（小熊座β）为北辰；今夜属于勾陈一；一万年后，织女星将接过这个位置。","拖动时间，看天极在星空中缓缓画出一个圆。"],seal:"岁"},ch7:{eyebrow:"其柒 · 东西对话 EAST MEETS WEST",title:"东西对话",hook:"同一片星空，两种秩序各自连线。",body:["中国的天狼是一颗独坐的星官，守在南方朱雀的井宿之野，主侵掠；在希腊人的图上，它是大犬座 α，猎户脚边的猎犬。","中国的织女是银河西岸的织女星官，七夕故事的主角；在西方，她是天琴座 α——俄耳甫斯的竖琴。","北斗七星在中国是帝车，运于中央、临制四方；同七颗星，在西方只是大熊的尾巴与后臀。"],seal:"会"},ch8:{eyebrow:"其捌 · 尾声 CREDITS",title:"尾声",hook:"缘起于一首旧诗，收束于一页致谢。",body:["本作品以《步天歌》为题——一卷把星官谱成韵语、便于记诵认星的旧诗。千年之后，诗里的星仍在原处，我们只是换了一种读法。","数据、开源技术与制作说明列于下方。本站为中国大学生计算机设计大赛参赛作品（信息可视化设计类）。"],seal:"跋"}},Ds=[{key:"北极",groups:["北极"],title:"北极五星 · 皇族",story:"太子、帝、庶子、后宫、天枢——天皇一家，以星列位。",labels:[{text:"太子",star:"北极一"},{text:"帝",star:"北极二"},{text:"庶子",star:"北极三"},{text:"后宫",star:"北极四"},{text:"天枢",star:"北极五"}]},{key:"勾陈",groups:["勾陈"],title:"勾陈 · 后宫车马",story:"帝之后妃的车驾，形如弯钩。其中最亮的勾陈一，就是今夜的北极星。",labels:[{text:"勾陈一",star:"勾陈一"}]},{key:"帝座",groups:["天皇大帝","五帝内座"],title:"天皇大帝 · 帝座",story:"天皇大帝居中而御，五帝内座环侍在旁——天上至尊的宝座。",labels:[{text:"天皇大帝",star:"天皇大帝"}]},{key:"百官",groups:["尚书","大理","天柱"],title:"尚书 · 大理 · 天柱",story:"秘书、法官、政令——一座悬浮的朝廷。",labels:[{text:"尚书",star:"尚书一"},{text:"大理",star:"大理一"},{text:"天柱",star:"天柱一"}]},{key:"拱北",groups:[],title:"回望 · 众星拱北",story:"「譬如北辰，居其所而众星共之。」——《论语·为政》"}],xc={heading:"数据与出处",groups:[{title:"数据来源",lines:["HYG Database v4.4 · CC BY-SA-4.0 · astronexus.com","许可协议：https://creativecommons.org/licenses/by-sa/4.0/","Stellarium 项目 · 中国星空文化数据","《步天歌》 · 丹元子 · 公有领域文本"]},{title:"开源技术",lines:["three.js","GSAP / ScrollTrigger","Vite","TypeScript","Noto Serif SC（思源宋体）· SIL OFL 1.1"]},{title:"制作说明",lines:["AI 辅助设计与编码","全部内容经人工校订"]}]};function Do(i){return Math.min(Math.max(i,0),1)}function za(i){const e=Do(i);return e*e*(3-2*e)}const Hr=.12,Nr=.92,Fr=5,ys=(Nr-Hr)/Fr,yl=Hr+4*ys,Bf=.03,Yf=.45;function io(i){const e=Do(i);return e<Hr?0:e>=Nr?6:1+Math.min(Math.floor((e-Hr)/ys),Fr-1)}function Hf(i){return Do(i/Hr)}function Xf(i,e){const n=Hr+e*ys;return Do((i-n)/(ys*Yf))}function Ia(i){const e=za((i-(yl-.02))/.02),n=1-za((i-Nr)/.05);return e*n}function qf(i,e){const n=new Set;let t=0;return e.map(r=>{if(r){const o=i.find(a=>!n.has(a.hip)&&a.name===r);if(o)return n.add(o.hip),o}for(;t<i.length&&n.has(i[t].hip);)t++;const s=i[t];return s?(n.add(s.hip),t++,s):null})}const Vf=[{ra:175,dec:81,radius:.35,fov:50,gazeW:.85},{ra:218.6,dec:76.8,radius:.55,fov:42,gazeW:.85},{ra:269.6,dec:86.5,radius:.55,fov:42,gazeW:.85},{ra:41.8,dec:81,radius:.55,fov:42,gazeW:.85},{ra:261.7,dec:75.5,radius:.55,fov:42,gazeW:.85},{ra:0,dec:89,radius:.55,fov:55,gazeW:.85}],wo={radius:3,dir:[.52,.7,.49],fov:50},wc=100,yg=["紫微左垣","紫微右垣"],bg=["第一站","第二站","第三站","第四站","第五站"],vg="序 · 天上有座城",xg=28,Sc=44,zs=60,Wf=Vf.map(i=>({dir:new re(...Yt(i.ra,i.dec,1)),radius:i.radius,fov:i.fov,gazeQ:er(i.ra,i.dec),gazeW:i.gazeW})),wg=new re(...wo.dir).normalize(),Ri=Wf[Fr],Sg=`
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
  width: ${xg}px; height: 1px;
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
`;let kc=!1;function kg(){if(kc||typeof document>"u")return;const i=document.createElement("style");i.dataset.ch4="",i.textContent=Sg,document.head.appendChild(i),kc=!0}function Oi(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Tg(i){kg();const e=i.root.querySelector(".pin"),{copy:n}=i,t=document.createElement("div");t.className="ch4-card ch4-opening",t.innerHTML=`
    <p class="eyebrow">${Oi(n.eyebrow)}</p>
    <div class="chapter-head">
      <h2>${Oi(n.title)}</h2>
      ${n.seal?`<div class="seal">${Oi(n.seal)}</div>`:""}
    </div>
    <p class="ch4-opening-tag">${vg}</p>
    <p class="hook">${Oi(n.hook)}</p>
    ${n.body.map(R=>`<p class="ch4-opening-body">${Oi(R)}</p>`).join("")}
  `,e.appendChild(t);const r=document.createElement("div");r.className="ch4-card ch4-stop",r.innerHTML=`
    <p class="ch4-stop-tag"></p>
    <h3 class="ch4-stop-title"></h3>
    <p class="ch4-stop-story"></p>
  `,e.appendChild(r);const s=r.querySelector(".ch4-stop-tag"),o=r.querySelector(".ch4-stop-title"),a=r.querySelector(".ch4-stop-story"),l=document.createElement("div");l.className="ch4-layer";const c=[];Ds.forEach((R,L)=>{(R.labels??[]).forEach((b,Y)=>{const U=document.createElement("div");U.className="ch4-tag";const D=document.createElement("i");D.className="ch4-tag-dot";const H=-90+Y*137.5,W=H*Math.PI/180,te=document.createElement("i");te.className="ch4-tag-line",te.style.transform=`rotate(${H}deg)`;const q=document.createElement("span");q.className="ch4-tag-name",q.textContent=b.text,q.style.transform=`translate(${Math.cos(W)*Sc}px, ${Math.sin(W)*Sc}px) translate(-50%, -50%)`,U.append(D,te,q),l.appendChild(U),c.push({el:U,stopIdx:L,labelIdx:Y,shown:!1})})}),e.appendChild(l);let u=null;Promise.all([fetch(Ln("data/stars.json")).then(R=>R.ok?R.json():null),fetch(Ln("data/asterisms.json")).then(R=>R.ok?R.json():null)]).then(([R,L])=>{if(!R||!L)return;const b=new Map(R.stars.map(U=>[U.hip,U])),Y=new Map(L.asterisms.map(U=>[U.name,U]));u=Ds.map(U=>{const D=U.groups.flatMap(W=>{var te;return(((te=Y.get(W))==null?void 0:te.stars)??[]).map(q=>b.get(q)).filter(q=>q!==void 0)});return qf(D,(U.labels??[]).map(W=>W.star)).map(W=>{if(!W)return null;const[te,q,_e]=Yt(W.ra,W.dec,wc);return new re(te,q,_e)})})}).catch(()=>{});let f=!1,h=0,d=!1,g=.35,p=50;const m=new re(0,1,0),v=new Wt;let y=0,x=0,w=0,S=!1,E=-1;function k(R){S!==R&&(S=R,t.classList.toggle("on",R))}function A(R){if(E===R)return;if(E=R,R<0){r.classList.remove("on");return}const L=Ds[R];L&&(s.textContent=bg[R]??`第${R+1}站`,o.textContent=L.title,a.textContent=L.story,r.classList.add("on"),r.classList.remove("swap"),r.offsetWidth,r.classList.add("swap"))}function C(R,L){R.shown!==L&&(R.shown=L,R.el.classList.toggle("on",L))}function P(){for(const R of c)C(R,!1)}function $(R){h=R;const L=io(R),b=Hf(R);for(const Y of yg)i.sky.setGroupProgress(Y,b);Ds.forEach((Y,U)=>{const D=Xf(R,U);for(const H of Y.groups)i.sky.setGroupProgress(H,D)}),k(L===0),A(L>=1&&L<=Fr?L-1:L===6?Fr-1:-1)}const _=new re,z=new re;function N(R,L,b){const Y=Math.cos(L),U=Math.sin(L);return b.set(R.x*Y+R.z*U,R.y,-R.x*U+R.z*Y)}function B(R){const L=h,b=io(L);let Y,U,D;const H=z;let W;if(b===6){const q=za((L-Nr)/(1-Nr));Y=Pe.lerp(Ri.radius,wo.radius,q),U=Pe.lerp(Ri.fov,wo.fov,q),D=(1-q)*Ri.gazeW,H.copy(Ri.dir).lerp(wg,q).normalize(),W=Ri.gazeQ}else{const q=Wf[b];Y=q.radius,U=q.fov,D=q.gazeW,H.copy(q.dir),W=q.gazeQ}if(!d){d=!0;const q=i.sky.camera;g=Math.max(q.position.length()/wc,.005),p=q.fov,m.copy(q.position).normalize(),m.lengthSq()<1e-8&&m.set(0,1,0),v.copy(q.quaternion),y=1}const te=1-Math.exp(-3*R);g+=(Y-g)*te,p+=(U-p)*te,m.lerp(H,te).normalize(),y+=(D-y)*te,v.slerp(W,1-Math.exp(-2.5*R)),i.sky.setRadius(g),i.sky.setPositionDir(m),i.sky.setFov(p),y<.005&&D===0?i.sky.setGazeBlend(0):i.sky.setGazeBlend(y,v)}function I(R){const L=h;L>=yl&&L<Nr?x+=Bf*R:Ia(L)===0&&(x=0);const b=x*Ia(L);Math.abs(b-w)>1e-6&&(w=b,i.sky.setSkyRotation(b,0))}function F(){var U;const R=io(h),L=R>=1&&R<=Fr?R-1:-1,b=window.innerWidth,Y=window.innerHeight;for(const D of c){const H=(U=u==null?void 0:u[D.stopIdx])==null?void 0:U[D.labelIdx];if(D.stopIdx!==L||!H){C(D,!1);continue}N(H,w,_);const W=du([_.x,_.y,_.z],i.sky.camera,{width:b,height:Y});if(!W||W.x<-zs||W.x>b+zs||W.y<-zs||W.y>Y+zs){C(D,!1);continue}D.el.style.left=`${W.x}px`,D.el.style.top=`${W.y}px`,C(D,!0)}}return{enter(){i.root.classList.add("inview"),f=!0,d=!1,i.sky.setLabelsEnabled(!1),$(h)},update(R){$(R)},frame(R){f&&(B(R),I(R),F())},exit(){i.root.classList.remove("inview"),f=!1,d=!1,x=0,w=0,i.sky.setSkyRotation(0,0),i.sky.setGazeBlend(0),i.sky.setLabelsEnabled(!0),k(!1),A(-1),P()}}}const Eg=Object.freeze(Object.defineProperty({__proto__:null,CH4_CAM_STOPS:Vf,CH4_GROW_FRAC:Yf,CH4_OPENING_END:Hr,CH4_RELEASE:wo,CH4_ROT_SPEED:Bf,CH4_ROT_START:yl,CH4_STOP_COUNT:Fr,CH4_STOP_SPAN:ys,CH4_TOUR_END:Nr,ch4MatchLabels:qf,ch4RotationWeight:Ia,ch4SegmentOf:io,ch4StopGrowth:Xf,ch4WallsGrowth:Hf,createChapter:Tg},Symbol.toStringTag,{value:"Module"})),Uf=1.2,Cg=90,Mg=7,Pg=.7,Tc=.55,Ag=1.5;function Rg(i){return Pe.clamp(1-i/Uf,0,1)}function Og(i){return Math.exp(-.9*i)}const jf=new re(0,1,0),Qf=new re(1,0,0);let Is;function Kf(){if(Is!==void 0)return Is;if(typeof document>"u")return Is=null;const i=document.createElement("canvas");i.width=i.height=64;const e=i.getContext("2d"),n=e.createRadialGradient(32,32,0,32,32,32);return n.addColorStop(0,"rgba(255, 252, 244, 1)"),n.addColorStop(.35,"rgba(255, 240, 205, 0.85)"),n.addColorStop(1,"rgba(255, 240, 205, 0)"),e.fillStyle=n,e.fillRect(0,0,64,64),Is=new Ao(i)}function Lg(i,e={}){const n=Math.max(1,Math.floor(e.count??Cg)),t=e.speed??Mg,r=e.rand??Math.random,s=new re(i.x,i.y,i.z);s.lengthSq()<1e-8&&s.set(0,1,0),s.normalize();const o=new re().crossVectors(s,Math.abs(s.y)<.99?jf:Qf).normalize(),a=new re().crossVectors(s,o),l=new Float32Array(n*3),c=new Float32Array(n*3);for(let v=0;v<n;v++){l[v*3]=i.x,l[v*3+1]=i.y,l[v*3+2]=i.z;const y=t*(Tc+(1-Tc)*r()),x=t*Pg*r(),w=r()*Math.PI*2,S=Math.cos(w)*x,E=Math.sin(w)*x;c[v*3]=s.x*y+o.x*S+a.x*E,c[v*3+1]=s.y*y+o.y*S+a.y*E,c[v*3+2]=s.z*y+o.z*S+a.z*E}const u=new cs;u.setAttribute("position",new ar(l,3));const f=u.getAttribute("position"),h=new hu({size:Ag,sizeAttenuation:!0,map:Kf()??null,color:16771512,transparent:!0,opacity:1,depthWrite:!1,blending:Yr}),d=new Ka(u,h);d.name="burst";let g=0,p=!1;const m={object:d,update(v){if(p)return!1;if(g+=v,g>=Uf)return m.dispose(),!1;const y=Og(v);for(let x=0;x<c.length;x++)c[x]*=y,l[x]+=c[x]*v;return f.needsUpdate=!0,h.opacity=Rg(g),!0},dispose(){p||(p=!0,d.removeFromParent(),u.dispose(),h.dispose())}};return m}const Ec=1,Dg=1.5,Cc=.6,zg=1.15,Ig=.21,Jr=24,Ng=.35,Fg=1.8;function $g(i){return Math.sin(Math.PI*Math.min(1,Math.max(0,i)*1.15))}function Mc(i,e,n,t){const r=Math.cos(n),s=Math.sin(n);return t.set(i.x*r+e.x*s,i.y*r+e.y*s,i.z*r+e.z*s)}function Pc(i,e){const n=i()*2-1,t=i()*Math.PI*2,r=Math.sqrt(Math.max(0,1-n*n));return e.set(r*Math.cos(t),n,r*Math.sin(t))}function Gg(i,e={}){const n=e.rand??Math.random,t=Pc(n,new re),r=Pc(n,new re),s=r.addScaledVector(t,-r.dot(t));s.lengthSq()<1e-6&&s.crossVectors(t,Math.abs(t.y)<.99?jf:Qf),s.normalize();const o=Cc+(zg-Cc)*n(),a=Ec+(Dg-Ec)*n(),l=Ng*n(),c=new Float32Array((Jr+1)*3),u=new Float32Array((Jr+1)*3);for(let A=0;A<=Jr;A++){const C=Math.pow(1-A/Jr,.75);u[A*3]=C,u[A*3+1]=C*.92,u[A*3+2]=C*.72}const f=new cs;f.setAttribute("position",new ar(c,3)),f.setAttribute("color",new ar(u,3));const h=f.getAttribute("position"),d=new pu({vertexColors:!0,transparent:!0,opacity:0,depthWrite:!1,blending:Yr}),g=new Ad(f,d),p=new cs;p.setAttribute("position",new ar(new Float32Array(3),3));const m=p.getAttribute("position"),v=new hu({size:Fg,sizeAttenuation:!0,map:Kf()??null,color:16774102,transparent:!0,opacity:0,depthWrite:!1,blending:Yr}),y=new Ka(p,v),x=new kn;x.name="meteor",x.add(g),x.add(y),x.visible=!1;let w=0,S=!1;const E=new re,k={object:x,update(A){if(S)return!1;w+=A;const C=(w-l)/a;if(C>=1)return k.dispose(),!1;if(C<0)return!0;x.visible=!0;const P=$g(C),$=o*C;for(let _=0;_<=Jr;_++){const z=Math.max(0,$-Ig*(_/Jr));Mc(t,s,z,E).multiplyScalar(i),c[_*3]=E.x,c[_*3+1]=E.y,c[_*3+2]=E.z}return h.needsUpdate=!0,d.opacity=P*.9,Mc(t,s,$,E).multiplyScalar(i),m.setXYZ(0,E.x,E.y,E.z),m.needsUpdate=!0,v.opacity=P,!0},dispose(){S||(S=!0,x.removeFromParent(),f.dispose(),d.dispose(),p.dispose(),v.dispose())}};return k}const ve=100,Bg=.97,Yg=24,ta={strength:.78,radius:.55,threshold:.58},Ac=1.2*ve,Hg=5,Rc=.2*Math.PI/180,Oc=89*Math.PI/180,Lc=.8*ve,Xg=1.2*ve,qg=.4,Vg=.05,Wg=120,Dc=.35,Li=new re(0,1,0),Ug=new re(0,0,0);function jg(i){return i=Pe.clamp(i,0,1),i*i*(3-2*i)}const Po=class Po{constructor(e){X(this,"canvas");X(this,"renderer");X(this,"scene");X(this,"camera");X(this,"pipeline");X(this,"quality");X(this,"card");X(this,"labelLayerEl");X(this,"hoverNdc",null);X(this,"hoverRing");X(this,"hoverTip");X(this,"sky",null);X(this,"labels",null);X(this,"labelsShown",!1);X(this,"skyRoot",new kn);X(this,"tmpSkyMat",new ua);X(this,"tmpSkyQ",new Wt);X(this,"tmpSkyQY",new Wt);X(this,"starPositions",null);X(this,"starList",[]);X(this,"nameByHip",new Map);X(this,"hipToAsterism",new Map);X(this,"poem",null);X(this,"pickListeners",new Set);X(this,"gazeYaw",-Math.PI/2);X(this,"gazePitch",80*Math.PI/180);X(this,"orbitQ",new Wt);X(this,"ctlRadius",1);X(this,"ctlDir",new re(0,1,0));X(this,"ctlFov",78);X(this,"ctlGazeBlend",0);X(this,"ctlGazeTargetQ",null);X(this,"ctlDrift",0);X(this,"driftAngle",0);X(this,"ctlOrbit",0);X(this,"pickingEnabled",!1);X(this,"labelsEnabled",!0);X(this,"hoverTipEnabled",!0);X(this,"blendK",0);X(this,"dragging",!1);X(this,"lastX",0);X(this,"lastY",0);X(this,"downX",0);X(this,"downY",0);X(this,"orbitVelX",0);X(this,"orbitVelY",0);X(this,"lastOrbitMoveT",0);X(this,"clock",new Rd);X(this,"elapsed",0);X(this,"frameHook",null);X(this,"started",!1);X(this,"timeScale",1);X(this,"effects",[]);X(this,"gazeEuler",new $i(0,0,0,"YXZ"));X(this,"gazeQ",new Wt);X(this,"insideQ",new Wt);X(this,"centerLookQ",new Wt);X(this,"centerLookMat",new ua);X(this,"driftQ",new Wt);X(this,"tmpPos",new re);X(this,"resize",()=>{const e=this.tierDpr();this.renderer.setPixelRatio(e),this.renderer.setSize(window.innerWidth,window.innerHeight),this.pipeline.setSize(window.innerWidth,window.innerHeight),this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.sky&&(this.sky.starMaterial.uniforms.uPixelRatio.value=e),this.labels&&this.labels.renderer.setSize(window.innerWidth,window.innerHeight)});X(this,"frame",()=>{var s;const e=Math.min(this.clock.getDelta(),.1),n=e*this.timeScale;this.quality.update(e),(s=this.frameHook)==null||s.call(this,n),this.updateCamera(n),this.updateHover(),this.updateEffects(n);const t=this.camera.position.length(),r=this.sky;if(r&&(this.elapsed+=n,r.setTime(this.elapsed),r.starMaterial.uniforms.uDistBoost.value=Yd(t,ve),r.gridMaterial.opacity=.1+.16*Pe.clamp(t/ve-1,0,1),t>=ve&&!this.card.el.hidden&&this.card.hide()),this.labels){const o=this.labelsEnabled?Pe.clamp((Ac-t)/(Ac-ve),0,1):0,a=o>.01;a!==this.labelsShown&&(this.labelsShown=a,this.labels.setVisible(a)),a&&(this.labels.renderer.domElement.style.opacity=o.toFixed(3),this.labels.update(this.camera))}this.pipeline.render(),this.labels&&this.labelsShown&&this.labels.renderer.render(this.scene,this.camera)});this.canvas=e,this.renderer=new Od({canvas:e,antialias:!0,alpha:!0}),this.renderer.setClearColor(0,0),this.scene=new Ld,this.scene.add(this.skyRoot),this.camera=new Dd(78,1,.1,2e3),this.pipeline=zd(this.renderer,this.scene,this.camera,ta),this.quality=Id(s=>{this.pipeline.setEnabled(s<2),this.pipeline.setBloom({strength:s===0?ta.strength:ta.strength*.5}),this.resize()}),this.labelLayerEl=document.createElement("div"),this.labelLayerEl.style.cssText="position:fixed;inset:0;pointer-events:none;z-index:5;",document.body.appendChild(this.labelLayerEl),this.card=Nd(document.body),this.onPick(s=>{s?this.card.show(s.info,s.x,s.y):this.card.hide()});const n=document.createElement("canvas");n.width=n.height=64;const t=n.getContext("2d");t.strokeStyle="rgba(240, 205, 110, 0.95)",t.lineWidth=5,t.shadowColor="rgba(201, 162, 39, 0.9)",t.shadowBlur=8,t.beginPath(),t.arc(32,32,24,0,Math.PI*2),t.stroke();const r=new Ao(n);this.hoverRing=new Qa(new ja({map:r,transparent:!0,depthTest:!1,depthWrite:!1})),this.hoverRing.renderOrder=999,this.hoverRing.visible=!1,this.skyRoot.add(this.hoverRing),this.hoverTip=document.createElement("div"),this.hoverTip.className="sky-tooltip",this.hoverTip.style.display="none",document.body.appendChild(this.hoverTip),this.bindPointer(),window.addEventListener("resize",this.resize),this.resize()}async init(){const[e,n,t,r]=await Promise.all([Fd(ve),fetch(Ln("data/stars.json")).then(a=>{if(!a.ok)throw new Error(`stars=${a.status}`);return a.json()}),fetch(Ln("data/asterisms.json")).then(a=>{if(!a.ok)throw new Error(`asterisms=${a.status}`);return a.json()}),fetch(Ln("data/poem.json")).then(a=>{if(!a.ok)throw new Error(`poem=${a.status}`);return a.json()})]);this.sky=e,e.starMaterial.uniforms.uPixelRatio.value=this.tierDpr(),this.skyRoot.add(e.group),this.starList=n.stars;const s=new Float32Array(this.starList.length*3),o=new Map;this.starList.forEach((a,l)=>{const[c,u,f]=Yt(a.ra,a.dec,ve);s[l*3]=c,s[l*3+1]=u,s[l*3+2]=f,o.set(a.hip,new re(c,u,f)),this.nameByHip.set(a.hip,a.name)}),this.starPositions=s,this.hipToAsterism=$d(t.asterisms),this.poem=r,this.labels=Gd(this.labelLayerEl,t.asterisms,o),this.labels.renderer.setSize(window.innerWidth,window.innerHeight),this.labels.setVisible(!1),this.skyRoot.add(this.labels.group)}start(e){this.frameHook=e??null,!this.started&&(this.started=!0,this.renderer.setAnimationLoop(this.frame))}setRadius(e){this.ctlRadius=Math.max(.5,e*ve)}setPositionDir(e){e instanceof re?this.ctlDir.copy(e):this.ctlDir.set(e[0],e[1],e[2]),this.ctlDir.lengthSq()<1e-8&&this.ctlDir.set(0,1,0),this.ctlDir.normalize()}setFov(e){this.ctlFov=Pe.clamp(e,10,140)}setGazeMode(e,n){if(e==="target"){const t=n??{ra:0,dec:80};this.ctlGazeTargetQ=er(t.ra,t.dec)}this.ctlGazeBlend=e==="target"?1:0}setGazeBlend(e,n){this.ctlGazeBlend=Pe.clamp(e,0,1),n!==void 0&&(this.ctlGazeTargetQ=n)}setDrift(e){this.ctlDrift=e}setOrbitEnabled(e){this.ctlOrbit=typeof e=="number"?Pe.clamp(e,0,1):e?1:0}applyCameraState(e){this.setRadius(e.radius),this.setPositionDir(e.dir),this.setFov(e.fov),this.setGazeBlend(e.gazeBlend,e.gazeTargetQ),this.setDrift(e.drift),this.setOrbitEnabled(e.orbit)}get cameraRadius(){return this.camera.position.length()}setGroupProgress(e,n){if(!this.sky)return;const t=typeof e=="number"?e:this.sky.lines.indexOf(e);this.sky.lines.setGroupProgress(t,n)}groupIndex(e){return this.sky?this.sky.lines.indexOf(e):-1}get groupCount(){return this.sky?this.sky.lines.groupCount:0}setLabelsEnabled(e){this.labelsEnabled=e}setHoverTipEnabled(e){this.hoverTipEnabled=e}setPickingEnabled(e){this.pickingEnabled=e,e||this.card.hide()}hideDetailCard(){this.card.hide()}setBloom(e){this.pipeline.setBloom(e)}setBloomEnabled(e){this.pipeline.setEnabled(e)}onPick(e){return this.pickListeners.add(e),()=>this.pickListeners.delete(e)}addSkyObject(e,n){(n==null?void 0:n.rotateWithSky)===!1?this.scene.add(e):this.skyRoot.add(e)}removeSkyObject(e){e.removeFromParent()}setSkyRotation(e=0,n=0){if(n!==0){const t=Bd(n);this.tmpSkyMat.set(t[0],t[1],t[2],0,t[3],t[4],t[5],0,t[6],t[7],t[8],0,0,0,0,1),this.tmpSkyQ.setFromRotationMatrix(this.tmpSkyMat)}else this.tmpSkyQ.identity();this.tmpSkyQY.setFromAxisAngle(Li,e),this.skyRoot.quaternion.copy(this.tmpSkyQ).multiply(this.tmpSkyQY)}setTimeScale(e){this.timeScale=Number.isFinite(e)?Pe.clamp(e,0,4):1}spawnBurst(e,n){this.addEffect(Lg(e,n))}spawnMeteors(e){const n=Math.min(Yg,Math.max(0,Math.floor(e)));for(let t=0;t<n;t++)this.addEffect(Gg(ve*Bg))}addEffect(e){this.skyRoot.add(e.object),this.effects.push(e)}updateEffects(e){for(let n=this.effects.length-1;n>=0;n--)this.effects[n].update(e)||this.effects.splice(n,1)}tierDpr(){const e=this.quality.tier,n=e===0?2:e===1?1.5:1;return Math.min(window.devicePixelRatio||1,n)}applyOrbitDelta(e,n){const t=this.camera.position.clone().normalize(),r=new Wt().setFromAxisAngle(Li,-e),s=new re().crossVectors(Li,t);s.lengthSq()<1e-8?s.set(1,0,0):s.normalize();const o=new Wt().setFromAxisAngle(s,n),a=r.clone().multiply(o).multiply(this.orbitQ),l=t.clone().applyQuaternion(r).applyQuaternion(o);Math.abs(l.y)<.985?this.orbitQ.copy(a):this.orbitQ.premultiply(r)}bindPointer(){const e=this.canvas;e.addEventListener("pointerdown",n=>{this.dragging=!0,this.lastX=this.downX=n.clientX,this.lastY=this.downY=n.clientY,this.orbitVelX=this.orbitVelY=0,this.lastOrbitMoveT=performance.now(),this.hoverNdc=null,e.setPointerCapture(n.pointerId)}),e.addEventListener("pointerup",n=>{this.dragging=!1,e.releasePointerCapture(n.pointerId),performance.now()-this.lastOrbitMoveT>Wg&&(this.orbitVelX=this.orbitVelY=0),Math.hypot(n.clientX-this.downX,n.clientY-this.downY)<Hg&&this.handleClick(n.clientX,n.clientY)}),e.addEventListener("pointercancel",()=>{this.dragging=!1,this.orbitVelX=this.orbitVelY=0}),e.addEventListener("pointerleave",()=>{this.hoverNdc=null}),e.addEventListener("pointermove",n=>{if(!this.dragging){this.hoverNdc={x:n.clientX/window.innerWidth*2-1,y:-(n.clientY/window.innerHeight)*2+1,cx:n.clientX,cy:n.clientY};return}const t=n.clientX-this.lastX,r=n.clientY-this.lastY;this.lastX=n.clientX,this.lastY=n.clientY;const s=(1-this.blendK)*(1-this.ctlGazeBlend);s>0&&(this.gazeYaw+=t*Rc*s,this.gazePitch+=r*Rc*s,this.gazePitch=Pe.clamp(this.gazePitch,-Oc,Oc));const o=this.blendK*this.ctlOrbit;if(o>0){const a=t*o*.005,l=r*o*.005;this.applyOrbitDelta(a,l);const c=performance.now(),u=Math.min((c-this.lastOrbitMoveT)/1e3,.1);this.lastOrbitMoveT=c,u>1e-4&&(this.orbitVelX+=(a/u-this.orbitVelX)*Dc,this.orbitVelY+=(l/u-this.orbitVelY)*Dc)}})}handleClick(e,n){if(!this.pickingEnabled||!this.sky||!this.starPositions)return;if(this.camera.position.length()>=ve){this.emitPick(null);return}const t=e/window.innerWidth*2-1,r=-(n/window.innerHeight)*2+1,s=Cl(t,r,this.camera,this.starPositions,{width:window.innerWidth,height:window.innerHeight});if(!s){this.emitPick(null);return}const o=this.starList[s.index],a=this.hipToAsterism.get(o.hip);if(!a){this.emitPick(null);return}const l=this.lookupPoem(a.name);this.emitPick({info:{name:a.name,starCount:a.stars.length,stars:a.stars.map(c=>({name:this.nameByHip.get(c)??null,hip:c})),quote:l==null?void 0:l.text,quoteFrom:l==null?void 0:l.from},x:e,y:n})}lookupPoem(e){if(!this.poem)return;const n=this.poem[e];if(n)return n;const t=e.replace(/[(（][^)）]*[)）]\s*$/,"");return t!==e?this.poem[t]:void 0}emitPick(e){for(const n of this.pickListeners)n(e)}updateHover(){if(!(this.pickingEnabled&&!this.dragging&&this.hoverNdc!==null&&this.starPositions!==null&&this.camera.position.length()<ve)){this.hoverRing.visible&&(this.hoverRing.visible=!1),this.hoverTip.style.display!=="none"&&(this.hoverTip.style.display="none");return}const n=Cl(this.hoverNdc.x,this.hoverNdc.y,this.camera,this.starPositions,{width:window.innerWidth,height:window.innerHeight},Po.HOVER_PICK_RADIUS_PX);if(!n){this.hoverRing.visible&&(this.hoverRing.visible=!1),this.hoverTip.style.display!=="none"&&(this.hoverTip.style.display="none");return}const t=this.starPositions;this.hoverRing.position.set(t[n.index*3],t[n.index*3+1],t[n.index*3+2]);const r=this.camera.position.distanceTo(this.hoverRing.position),s=Math.max(.5,r*.035);if(this.hoverRing.scale.set(s,s,1),this.hoverRing.visible=!0,!this.hoverTipEnabled){this.hoverTip.style.display!=="none"&&(this.hoverTip.style.display="none");return}const o=this.starList[n.index],a=this.hipToAsterism.get(o.hip),l=o.name??`HIP ${o.hip}`,c=a&&a.name!==l?`${l} · ${a.name}`:l;this.hoverTip.textContent!==c&&(this.hoverTip.textContent=c),this.hoverTip.style.left=`${this.hoverNdc.cx+16}px`,this.hoverTip.style.top=`${this.hoverNdc.cy+14}px`,this.hoverTip.style.display!=="block"&&(this.hoverTip.style.display="block")}updateCamera(e){if(!this.dragging&&(this.orbitVelX!==0||this.orbitVelY!==0)){this.applyOrbitDelta(this.orbitVelX*e,this.orbitVelY*e);const t=Math.pow(.5,e/qg);this.orbitVelX*=t,this.orbitVelY*=t,Math.hypot(this.orbitVelX,this.orbitVelY)<Vg&&(this.orbitVelX=this.orbitVelY=0)}const n=this.tmpPos.copy(this.ctlDir).multiplyScalar(this.ctlRadius).applyQuaternion(this.orbitQ);this.camera.position.copy(n),this.blendK=jg((this.ctlRadius-Lc)/(Xg-Lc)),this.gazeEuler.set(this.gazePitch,this.gazeYaw,0),this.gazeQ.setFromEuler(this.gazeEuler),this.insideQ.copy(this.gazeQ),this.ctlGazeTargetQ&&this.ctlGazeBlend>0&&this.insideQ.slerp(this.ctlGazeTargetQ,this.ctlGazeBlend),this.ctlDrift!==0&&(this.driftAngle+=this.ctlDrift*e,this.driftQ.setFromAxisAngle(Li,this.driftAngle),this.insideQ.premultiply(this.driftQ)),this.centerLookMat.lookAt(n,Ug,Li),this.centerLookQ.setFromRotationMatrix(this.centerLookMat),this.camera.quaternion.slerpQuaternions(this.insideQ,this.centerLookQ,this.blendK),this.camera.fov!==this.ctlFov&&(this.camera.fov=this.ctlFov,this.camera.updateProjectionMatrix())}};X(Po,"HOVER_PICK_RADIUS_PX",16);let Na=Po;const Qg=Pe.degToRad(23.44),Kg=11570494,na=36,Zg=.15,Jg=.55;function em(i){return i=Pe.clamp(i,0,1),i*i*(3-2*i)}function Ns(i,e,n){const t=new Xd({color:Kg,metalness:.85,roughness:.35,transparent:!0,opacity:0}),r=new kn,s=i*ve;r.add(new fo(new gu(s,e*ve,12,144),t));for(let o=0;o<na;o++){const a=o/na*Math.PI*2,l=o%(na/4)===0,c=new fo(l?n.major:n.minor,t);c.position.set(Math.cos(a)*s,Math.sin(a)*s,0),c.rotation.z=a,r.add(c)}return{local:r,material:t}}function tm(){const i=new kn;i.name="armillary-sphere";const e={minor:new Ml(.012*ve,.0018*ve,.0035*ve),major:new Ml(.02*ve,.0024*ve,.0045*ve)},n=Ns(1.1,.006,e);n.local.rotation.x=-Math.PI/2;const t=Ns(1.07,.004,e);t.local.rotation.y=Math.PI/2;const r=Ns(1.05,.004,e);r.local.rotation.x=-Math.PI/2;const s=new kn;s.add(r.local);const o=Ns(1.03,.0035,e);o.local.rotation.x=-Math.PI/2;const a=new kn;a.add(o.local);const l=new kn;l.rotation.x=Qg,l.add(a);const c=[{built:n,inner:n.local,offsetDir:new re(0,-1,0),tumble:new $i(.9,0,.4)},{built:t,inner:t.local,offsetDir:new re(1,.15,0),tumble:new $i(0,.5,-1.1)},{built:r,inner:s,offsetDir:new re(0,1,.2),tumble:new $i(-.7,.5,0)},{built:o,inner:l,offsetDir:new re(-.6,.6,.6),tumble:new $i(.5,-.4,.8)}].map(({built:y,inner:x,offsetDir:w,tumble:S})=>{const E=new kn;return E.add(x),i.add(E),{assembly:E,material:y.material,offsetDir:w.normalize(),tumble:S,alpha:0}});i.add(new Hd(16771529,.9));const u=new Pl(16774109,2.4);u.position.set(1.6*ve,2.4*ve,1.2*ve),i.add(u);const f=new Pl(12570879,1.1);f.position.set(-1.8*ve,-.7*ve,-1.5*ve),i.add(f);let h=0;function d(y){const x=h*y.alpha;y.material.opacity=x,y.assembly.visible=x>.002}function g(y){c.forEach((x,w)=>{const S=em((y-w*Zg)/Jg);x.alpha=S;const E=1-S;x.assembly.scale.setScalar(.35+.65*S),x.assembly.position.copy(x.offsetDir).multiplyScalar(E*.5*ve),x.assembly.rotation.set(x.tumble.x*E,x.tumble.y*E,x.tumble.z*E),d(x)})}function p(y){s.rotation.y=y,a.rotation.y=y*.6}function m(y){h=Pe.clamp(y,0,1);for(const x of c)d(x)}function v(){const y=new Set,x=new Set;i.traverse(w=>{const S=w;if(S.isMesh){y.add(S.geometry);const E=S.material;for(const k of Array.isArray(E)?E:[E])x.add(k)}}),y.forEach(w=>w.dispose()),x.forEach(w=>w.dispose())}return g(0),{group:i,setAssembly:g,setSpin:p,setFade:m,dispose:v}}const ra=.55,nm=.9,rm=1.2;function Di(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function im(i){const{copy:e}=i,n=document.createElement("div");n.className="chapter-panel chapter-panel--left",n.innerHTML=`
    <p class="eyebrow">${Di(e.eyebrow)}</p>
    <div class="chapter-head">
      <h2>${Di(e.title)}</h2>
      ${e.seal?`<div class="seal">${Di(e.seal)}</div>`:""}
    </div>
    <p class="hook">${Di(e.hook)}</p>
    ${e.body.map(a=>`<p>${Di(a)}</p>`).join("")}
  `,i.root.querySelector(".pin").appendChild(n);let t=null,r=0;const s={v:0};function o(a){if(!t)return;t.setAssembly(Math.min(a/ra,1));const l=Math.max(0,(a-ra)/(1-ra));t.setSpin(l*nm)}return{enter(){i.root.classList.add("inview"),t||(t=tm(),i.sky.addSkyObject(t.group,{rotateWithSky:!1}),o(r)),at.to(s,{v:1,duration:rm,ease:"power2.out",overwrite:!0,onUpdate:()=>t==null?void 0:t.setFade(s.v)})},update(a){r=a,o(a)},exit(){i.root.classList.remove("inview"),at.killTweensOf(s),s.v=0,t&&(i.sky.removeSkyObject(t.group),t.dispose(),t=null)}}}const sm=Object.freeze(Object.defineProperty({__proto__:null,createChapter:im},Symbol.toStringTag,{value:"Module"})),Rr=-1e4,So=14e3,Fa=So-Rr,om=[{name:"帝星",years:-1e3,note:"−1000"},{name:"勾陈一",years:0,note:"今"},{name:"织女一",years:13700,note:"+13700"}],am=[{years:Rr,text:"−10000",cls:"ch6-endlab--start"},{years:0,text:"0",cls:""},{years:So,text:"+14000",cls:"ch6-endlab--end"}],lm=2e3,cm=1.5,um=.07,fm=`
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
`;let zc=!1;function dm(){if(zc||typeof document>"u")return;const i=document.createElement("style");i.dataset.ch6="",i.textContent=fm,document.head.appendChild(i),zc=!0}function zi(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Fs(i){return(i-Rr)/Fa*100}function hm(i){const e=2e3+i;return e<=0?{era:"公元前",num:1-e}:{era:e<3e3?"公元":"公元后",num:e}}function pm(i){dm();const e=i.root.querySelector(".pin"),n=document.createElement("div");n.className="chapter-panel ch6-panel",n.innerHTML=`
    <p class="eyebrow">${zi(i.copy.eyebrow)}</p>
    <div class="chapter-head">
      <h2>${zi(i.copy.title)}</h2>
      ${i.copy.seal?`<div class="seal">${zi(i.copy.seal)}</div>`:""}
    </div>
    <p class="hook">${zi(i.copy.hook)}</p>
    ${i.copy.body.map(m=>`<p>${zi(m)}</p>`).join("")}
  `,e.appendChild(n);const t=document.createElement("div");t.className="ch6-time";const r=[];for(let m=Rr;m<=So;m+=lm){const v=m===Rr||m===0||m===So;r.push(`<div class="ch6-tick${v?" ch6-tick--major":""}" style="left:${Fs(m).toFixed(3)}%"></div>`)}const s=am.map(m=>`<div class="ch6-endlab ${m.cls}" style="left:${Fs(m.years).toFixed(3)}%">${m.text}</div>`),o=om.map(m=>`
    <div class="ch6-mark" style="left:${Fs(m.years).toFixed(3)}%">
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
  `,e.appendChild(t);const a=t.querySelector(".ch6-era"),l=t.querySelector(".ch6-num"),c=t.querySelector(".ch6-pointer");let u=null;function f(){const m=new gu(cm,um,12,96),v=new qd({color:13214247}),y=new fo(m,v);return y.rotation.x=Math.PI/2,y.position.set(0,1.01*ve,0),y}let h=0,d=Number.NaN,g=Number.NaN;function p(m){i.sky.setSkyRotation(0,m);const v=Math.round(m);if(v!==d){d=v;const{era:x,num:w}=hm(v);a.textContent=x,l.textContent=String(w)}const y=Math.round(Fs(m)*100)/100;y!==g&&(g=y,c.style.left=`${y}%`)}return{enter(){i.root.classList.add("inview"),u=f(),i.sky.addSkyObject(u,{rotateWithSky:!1}),p(Rr+h*Fa)},update(m){h=m,p(Rr+m*Fa)},exit(){i.root.classList.remove("inview"),i.sky.setSkyRotation(0,0),u&&(i.sky.removeSkyObject(u),u.geometry.dispose(),u.material.dispose(),u=null)}}}const gm=Object.freeze(Object.defineProperty({__proto__:null,createChapter:pm},Symbol.toStringTag,{value:"Module"})),mm=100,_m=9414856;async function Ic(i){const e=await fetch(i);if(!e.ok)throw new Error(`${i} → HTTP ${e.status}`);return e.json()}async function ym(){const[i,e]=await Promise.all([Ic(Ln("data/western.json")),Ic(Ln("data/stars.json"))]),n=new Map;for(const l of e.stars)n.set(l.hip,Yt(l.ra,l.dec,mm));const t=[];for(const l of i.constellations)for(const[c,u]of l.lines){const f=n.get(c),h=n.get(u);!f||!h||t.push(f[0],f[1],f[2],h[0],h[1],h[2])}const r=new cs;r.setAttribute("position",new ar(new Float32Array(t),3));const s=new pu({color:_m,transparent:!0,opacity:0,depthWrite:!1,blending:Yr}),o=new Vd(r,s);o.name="western-lines",o.frustumCulled=!1;const a=new kn;return a.name="western",a.add(o),a.visible=!1,{group:a,setOpacity(l){const c=Pe.clamp(l,0,1);s.opacity=c,a.visible=c>.001},dispose(){r.dispose(),s.dispose()}}}const Nc=.6,bm=`
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
`;let Fc=!1;function vm(){if(Fc||typeof document>"u")return;const i=document.createElement("style");i.dataset.ch7="",i.textContent=bm,document.head.appendChild(i),Fc=!0}function Ii(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function xm(i){return i=Pe.clamp(i,0,1),i*i*(3-2*i)}function wm(i){vm();const e=i.root.querySelector(".pin"),{copy:n}=i,t=document.createElement("div");t.className="ch7-panel",t.innerHTML=`
    <p class="eyebrow">${Ii(n.eyebrow)}</p>
    <div class="chapter-head">
      <h2>${Ii(n.title)}</h2>
      ${n.seal?`<div class="seal">${Ii(n.seal)}</div>`:""}
    </div>
    <p class="hook">${Ii(n.hook)}</p>
    ${n.body.map(g=>`<p>${Ii(g)}</p>`).join("")}
  `,e.appendChild(t);const r=document.createElement("div");r.className="ch7-compare",r.innerHTML=`
    <span class="ch7-end ch7-end--cn">中国星官</span>
    <input class="ch7-slider" type="range" min="0" max="100" step="1" value="0"
      aria-label="中西星空连线对比" />
    <span class="ch7-end ch7-end--west">西方星座</span>
  `,e.appendChild(r);const s=r.querySelector(".ch7-slider");let o=null,a=0,l=0,c=!1,u=null,f=null;function h(g){const p=i.sky.groupCount;for(let m=0;m<p;m++)i.sky.setGroupProgress(m,g)}function d(g){l=Pe.clamp(g,0,1),h(1-l),o==null||o.setOpacity(l),s.value=String(Math.round(l*100))}return s.addEventListener("input",()=>{c=!0,d(Number(s.value)/100)}),{enter(){if(i.root.classList.add("inview"),i.sky.setLabelsEnabled(!1),u==null||u.kill(),u=null,f==null||f.kill(),f=null,c=!1,d(0),o)return;const g=++a;ym().then(p=>{if(g!==a){p.dispose();return}o=p,i.sky.addSkyObject(p.group),p.setOpacity(l)}).catch(p=>console.warn("[ch7] 西方星座数据加载失败：",p))},update(g){if(!c){if(g>=Nc){l!==1&&d(1);return}d(xm(g/Nc))}},exit(){if(i.root.classList.remove("inview"),++a,f==null||f.kill(),o){const p=o,m={v:l};f=at.to(m,{v:0,duration:.6,ease:"sine.inOut",onUpdate:()=>p.setOpacity(m.v),onComplete:()=>{i.sky.removeSkyObject(p.group),p.dispose(),o===p&&(o=null),f=null}})}u==null||u.kill();const g={v:1-l};u=at.to(g,{v:1,duration:2.4,ease:"sine.inOut",onUpdate:()=>h(g.v)}),i.sky.setLabelsEnabled(!0)}}}const Sm=Object.freeze(Object.defineProperty({__proto__:null,createChapter:wm},Symbol.toStringTag,{value:"Module"})),km=`
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
`;let $c=!1;function Tm(){if($c||typeof document>"u")return;const i=document.createElement("style");i.dataset.ch8="",i.textContent=km,document.head.appendChild(i),$c=!0}function Mn(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Em(i){return i<0?0:i>1?1:i}function Cm(i){return i.split(/(https?:\/\/\S+)/g).map(e=>/^https?:\/\//.test(e)?`<a href="${Mn(e)}" target="_blank" rel="noopener">${Mn(e)}</a>`:Mn(e)).join("")}function Gc(i,e,n){const t=Em((i-e)/(n-e));return t*t*(3-2*t)}function Mm(i){Tm();const e=i.root.querySelector(".pin"),{copy:n}=i,t=document.createElement("div");t.className="ch8-wrap",t.innerHTML=`
    <div class="ch8-panel">
      <p class="ch8-eyebrow">${Mn(n.eyebrow)}</p>
      <div class="ch8-head">
        <h2 class="ch8-title">${Mn(n.title)}</h2>
        ${n.seal?`<div class="ch8-seal">${Mn(n.seal)}</div>`:""}
      </div>
      <p class="ch8-hook">${Mn(n.hook)}</p>
      <div class="ch8-body">${n.body.map(l=>`<p>${Mn(l)}</p>`).join("")}</div>
      <div class="ch8-credits">
        <p class="ch8-credits-heading">${Mn(xc.heading)}</p>
        ${xc.groups.map(l=>`
          <div class="ch8-credit-group">
            <h3>${Mn(l.title)}</h3>
            ${l.lines.map(c=>`<p>${Cm(c)}</p>`).join("")}
          </div>`).join("")}
      </div>
    </div>
  `,e.appendChild(t);const r=t.querySelector(".ch8-panel"),s=t.querySelector(".ch8-credits");let o=-1,a=-1;return{enter(){},update(l){const c=Gc(l,0,.3);(o<0||Math.abs(c-o)>=1e-4)&&(o=c,r.style.opacity=c.toFixed(3),r.style.transform=`translateY(${((1-c)*26).toFixed(2)}px)`);const u=Gc(l,.12,.45);(a<0||Math.abs(u-a)>=1e-4)&&(a=u,s.style.opacity=u.toFixed(3),s.style.transform=`translateY(${((1-u)*14).toFixed(2)}px)`)},exit(){}}}const Pm=Object.freeze(Object.defineProperty({__proto__:null,createChapter:Mm},Symbol.toStringTag,{value:"Module"}));function Am(i,e){for(var n=0;n<e.length;n++){var t=e[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(i,t.key,t)}}function Rm(i,e,n){return e&&Am(i.prototype,e),i}/*!
 * Observer 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var pt,so,tn,sr,or,pi,Zf,Er,gi,Jf,Vn,Sn,ed,td=function(){return pt||typeof window<"u"&&(pt=window.gsap)&&pt.registerPlugin&&pt},nd=1,li=[],le=[],Dn=[],es=Date.now,$a=function(e,n){return n},Om=function(){var e=gi.core,n=e.bridge||{},t=e._scrollers,r=e._proxies;t.push.apply(t,le),r.push.apply(r,Dn),le=t,Dn=r,$a=function(o,a){return n[o](a)}},fr=function(e,n){return~Dn.indexOf(e)&&Dn[Dn.indexOf(e)+1][n]},ts=function(e){return!!~Jf.indexOf(e)},Ct=function(e,n,t,r,s){return e.addEventListener(n,t,{passive:r!==!1,capture:!!s})},Et=function(e,n,t,r){return e.removeEventListener(n,t,!!r)},$s="scrollLeft",Gs="scrollTop",Ga=function(){return Vn&&Vn.isPressed||le.cache++},ko=function(e,n){var t=function r(s){if(s||s===0){nd&&(tn.history.scrollRestoration="manual");var o=Vn&&Vn.isPressed;s=r.v=Math.round(s)||(Vn&&Vn.iOS?1:0),e(s),r.cacheID=le.cache,o&&$a("ss",s)}else(n||le.cache!==r.cacheID||$a("ref"))&&(r.cacheID=le.cache,r.v=e());return r.v+r.offset};return t.offset=0,e&&t},Rt={s:$s,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:ko(function(i){return arguments.length?tn.scrollTo(i,tt.sc()):tn.pageXOffset||sr[$s]||or[$s]||pi[$s]||0})},tt={s:Gs,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:Rt,sc:ko(function(i){return arguments.length?tn.scrollTo(Rt.sc(),i):tn.pageYOffset||sr[Gs]||or[Gs]||pi[Gs]||0})},zt=function(e,n){return(n&&n._ctx&&n._ctx.selector||pt.utils.toArray)(e)[0]||(typeof e=="string"&&pt.config().nullTargetWarn!==!1?console.warn("Element not found:",e):null)},Lm=function(e,n){for(var t=n.length;t--;)if(n[t]===e||n[t].contains(e))return!0;return!1},gr=function(e,n){var t=n.s,r=n.sc;ts(e)&&(e=sr.scrollingElement||or);var s=le.indexOf(e),o=r===tt.sc?1:2;!~s&&(s=le.push(e)-1),le[s+o]||Ct(e,"scroll",Ga);var a=le[s+o],l=a||(le[s+o]=ko(fr(e,t),!0)||(ts(e)?r:ko(function(c){return arguments.length?e[t]=c:e[t]})));return l.target=e,a||(l.smooth=pt.getProperty(e,"scrollBehavior")==="smooth"),l},Ba=function(e,n,t){var r=e,s=e,o=es(),a=o,l=n||50,c=Math.max(500,l*3),u=function(g,p){var m=es();p||m-o>l?(s=r,r=g,a=o,o=m):t?r+=g:r=s+(g-s)/(m-a)*(o-a)},f=function(){s=r=t?0:r,a=o=0},h=function(g){var p=a,m=s,v=es();return(g||g===0)&&g!==r&&u(g),o===a||v-a>c?0:(r+(t?m:-m))/((t?v:o)-p)*1e3};return{update:u,reset:f,getVelocity:h}},Ni=function(e,n){return n&&!e._gsapAllow&&e.cancelable!==!1&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},Bc=function(e){var n=Math.max.apply(Math,e),t=Math.min.apply(Math,e);return Math.abs(n)>=Math.abs(t)?n:t},rd=function(){gi=pt.core.globals().ScrollTrigger,gi&&gi.core&&Om()},id=function(e){return pt=e||td(),!so&&pt&&typeof document<"u"&&document.body&&(tn=window,sr=document,or=sr.documentElement,pi=sr.body,Jf=[tn,sr,or,pi],pt.utils.clamp,ed=pt.core.context||function(){},Er="onpointerenter"in pi?"pointer":"mouse",Zf=We.isTouch=tn.matchMedia&&tn.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in tn||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,Sn=We.eventTypes=("ontouchstart"in or?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in or?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return nd=0},500),so=1),gi||rd(),so};Rt.op=tt;le.cache=0;var We=function(){function i(n){this.init(n)}var e=i.prototype;return e.init=function(t){so||id(pt)||console.warn("Please gsap.registerPlugin(Observer)"),gi||rd();var r=t.tolerance,s=t.dragMinimum,o=t.type,a=t.target,l=t.lineHeight,c=t.debounce,u=t.preventDefault,f=t.onStop,h=t.onStopDelay,d=t.ignore,g=t.wheelSpeed,p=t.event,m=t.onDragStart,v=t.onDragEnd,y=t.onDrag,x=t.onPress,w=t.onRelease,S=t.onRight,E=t.onLeft,k=t.onUp,A=t.onDown,C=t.onChangeX,P=t.onChangeY,$=t.onChange,_=t.onToggleX,z=t.onToggleY,N=t.onHover,B=t.onHoverEnd,I=t.onMove,F=t.ignoreCheck,R=t.isNormalizer,L=t.onGestureStart,b=t.onGestureEnd,Y=t.onWheel,U=t.onEnable,D=t.onDisable,H=t.onClick,W=t.scrollSpeed,te=t.capture,q=t.allowClicks,_e=t.lockAxis,Se=t.onLockAxis;this.target=a=zt(a)||or,this.vars=t,d&&(d=pt.utils.toArray(d)),r=r||1e-9,s=s||0,g=g||1,W=W||1,o=o||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(tn.getComputedStyle(pi).lineHeight)||22);var me,Ie,Ce,j,ie,He,nt,M=this,Ae=0,ct=0,mt=t.passive||!u&&t.passive!==!1,ye=gr(a,Rt),de=gr(a,tt),Ne=ye(),ut=de(),Fe=~o.indexOf("touch")&&!~o.indexOf("pointer")&&Sn[0]==="pointerdown",bn=ts(a),Re=a.ownerDocument||sr,Xt=[0,0,0],Tt=[0,0,0],Ot=0,Qn=function(){return Ot=es()},Le=function(Z,ue){return(M.event=Z)&&d&&Lm(Z.target,d)||ue&&Fe&&Z.pointerType!=="touch"||F&&F(Z,ue)},In=function(){M._vx.reset(),M._vy.reset(),Ie.pause(),f&&f(M)},Lt=function(){var Z=M.deltaX=Bc(Xt),ue=M.deltaY=Bc(Tt),G=Math.abs(Z)>=r,ee=Math.abs(ue)>=r;$&&(G||ee)&&$(M,Z,ue,Xt,Tt),G&&(S&&M.deltaX>0&&S(M),E&&M.deltaX<0&&E(M),C&&C(M),_&&M.deltaX<0!=Ae<0&&_(M),Ae=M.deltaX,Xt[0]=Xt[1]=Xt[2]=0),ee&&(A&&M.deltaY>0&&A(M),k&&M.deltaY<0&&k(M),P&&P(M),z&&M.deltaY<0!=ct<0&&z(M),ct=M.deltaY,Tt[0]=Tt[1]=Tt[2]=0),(j||Ce)&&(I&&I(M),Ce&&(m&&Ce===1&&m(M),y&&y(M),Ce=0),j=!1),He&&!(He=!1)&&Se&&Se(M),ie&&(Y(M),ie=!1),me=0},vn=function(Z,ue,G){Xt[G]+=Z,Tt[G]+=ue,M._vx.update(Z),M._vy.update(ue),c?me||(me=requestAnimationFrame(Lt)):Lt()},xn=function(Z,ue){_e&&!nt&&(M.axis=nt=Math.abs(Z)>Math.abs(ue)?"x":"y",He=!0),nt!=="y"&&(Xt[2]+=Z,M._vx.update(Z,!0)),nt!=="x"&&(Tt[2]+=ue,M._vy.update(ue,!0)),c?me||(me=requestAnimationFrame(Lt)):Lt()},qt=function(Z){if(!Le(Z,1)){Z=Ni(Z,u);var ue=Z.clientX,G=Z.clientY,ee=ue-M.x,Q=G-M.y,J=M.isDragging;M.x=ue,M.y=G,(J||(ee||Q)&&(Math.abs(M.startX-ue)>=s||Math.abs(M.startY-G)>=s))&&(Ce||(Ce=J?2:1),J||(M.isDragging=!0),xn(ee,Q))}},Vt=M.onPress=function(ne){Le(ne,1)||ne&&ne.button||(M.axis=nt=null,Ie.pause(),M.isPressed=!0,ne=Ni(ne),Ae=ct=0,M.startX=M.x=ne.clientX,M.startY=M.y=ne.clientY,M._vx.reset(),M._vy.reset(),Ct(R?a:Re,Sn[1],qt,mt,!0),M.deltaX=M.deltaY=0,x&&x(M))},se=M.onRelease=function(ne){if(!Le(ne,1)){Et(R?a:Re,Sn[1],qt,!0);var Z=!isNaN(M.y-M.startY),ue=M.isDragging,G=ue&&(Math.abs(M.x-M.startX)>3||Math.abs(M.y-M.startY)>3),ee=Ni(ne);!G&&Z&&(M._vx.reset(),M._vy.reset(),u&&q&&pt.delayedCall(.08,function(){if(es()-Ot>300&&!ne.defaultPrevented){if(ne.target.click)ne.target.click();else if(Re.createEvent){var Q=Re.createEvent("MouseEvents");Q.initMouseEvent("click",!0,!0,tn,1,ee.screenX,ee.screenY,ee.clientX,ee.clientY,!1,!1,!1,!1,0,null),ne.target.dispatchEvent(Q)}}})),M.isDragging=M.isGesturing=M.isPressed=!1,f&&ue&&!R&&Ie.restart(!0),Ce&&Lt(),v&&ue&&v(M),w&&w(M,G)}},ln=function(Z){return Z.touches&&Z.touches.length>1&&(M.isGesturing=!0)&&L(Z,M.isDragging)},_t=function(){return(M.isGesturing=!1)||b(M)},Dt=function(Z){if(!Le(Z)){var ue=ye(),G=de();vn((ue-Ne)*W,(G-ut)*W,1),Ne=ue,ut=G,f&&Ie.restart(!0)}},ft=function(Z){if(!Le(Z)){Z=Ni(Z,u),Y&&(ie=!0);var ue=(Z.deltaMode===1?l:Z.deltaMode===2?tn.innerHeight:1)*g;vn(Z.deltaX*ue,Z.deltaY*ue,0),f&&!R&&Ie.restart(!0)}},Nn=function(Z){if(!Le(Z)){var ue=Z.clientX,G=Z.clientY,ee=ue-M.x,Q=G-M.y;M.x=ue,M.y=G,j=!0,f&&Ie.restart(!0),(ee||Q)&&xn(ee,Q)}},Fn=function(Z){M.event=Z,N(M)},dt=function(Z){M.event=Z,B(M)},$n=function(Z){return Le(Z)||Ni(Z,u)&&H(M)};Ie=M._dc=pt.delayedCall(h||.25,In).pause(),M.deltaX=M.deltaY=0,M._vx=Ba(0,50,!0),M._vy=Ba(0,50,!0),M.scrollX=ye,M.scrollY=de,M.isDragging=M.isGesturing=M.isPressed=!1,ed(this),M.enable=function(ne){return M.isEnabled||(Ct(bn?Re:a,"scroll",Ga),o.indexOf("scroll")>=0&&Ct(bn?Re:a,"scroll",Dt,mt,te),o.indexOf("wheel")>=0&&Ct(a,"wheel",ft,mt,te),(o.indexOf("touch")>=0&&Zf||o.indexOf("pointer")>=0)&&(Ct(a,Sn[0],Vt,mt,te),Ct(Re,Sn[2],se),Ct(Re,Sn[3],se),q&&Ct(a,"click",Qn,!0,!0),H&&Ct(a,"click",$n),L&&Ct(Re,"gesturestart",ln),b&&Ct(Re,"gestureend",_t),N&&Ct(a,Er+"enter",Fn),B&&Ct(a,Er+"leave",dt),I&&Ct(a,Er+"move",Nn)),M.isEnabled=!0,M.isDragging=M.isGesturing=M.isPressed=j=Ce=!1,M._vx.reset(),M._vy.reset(),Ne=ye(),ut=de(),ne&&ne.type&&Vt(ne),U&&U(M)),M},M.disable=function(){M.isEnabled&&(li.filter(function(ne){return ne!==M&&ts(ne.target)}).length||Et(bn?Re:a,"scroll",Ga),M.isPressed&&(M._vx.reset(),M._vy.reset(),Et(R?a:Re,Sn[1],qt,!0)),Et(bn?Re:a,"scroll",Dt,te),Et(a,"wheel",ft,te),Et(a,Sn[0],Vt,te),Et(Re,Sn[2],se),Et(Re,Sn[3],se),Et(a,"click",Qn,!0),Et(a,"click",$n),Et(Re,"gesturestart",ln),Et(Re,"gestureend",_t),Et(a,Er+"enter",Fn),Et(a,Er+"leave",dt),Et(a,Er+"move",Nn),M.isEnabled=M.isPressed=M.isDragging=!1,D&&D(M))},M.kill=M.revert=function(){M.disable();var ne=li.indexOf(M);ne>=0&&li.splice(ne,1),Vn===M&&(Vn=0)},li.push(M),R&&ts(a)&&(Vn=M),M.enable(p)},Rm(i,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),i}();We.version="3.15.0";We.create=function(i){return new We(i)};We.register=id;We.getAll=function(){return li.slice()};We.getById=function(i){return li.filter(function(e){return e.vars.id===i})[0]};td()&&pt.registerPlugin(We);/*!
 * ScrollTrigger 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var V,ri,ae,we,Jt,be,bl,To,bs,ns,Xi,Bs,vt,zo,Ya,Pt,Yc,Hc,ii,sd,ia,od,Mt,Ha,ad,ld,Jn,Xa,vl,mi,xl,rs,qa,sa,Ys=1,xt=Date.now,oa=xt(),yn=0,qi=0,Xc=function(e,n,t){var r=jt(e)&&(e.substr(0,6)==="clamp("||e.indexOf("max")>-1);return t["_"+n+"Clamp"]=r,r?e.substr(6,e.length-7):e},qc=function(e,n){return n&&(!jt(e)||e.substr(0,6)!=="clamp(")?"clamp("+e+")":e},Dm=function i(){return qi&&requestAnimationFrame(i)},Vc=function(){return zo=1},Wc=function(){return zo=0},Pn=function(e){return e},Vi=function(e){return Math.round(e*1e5)/1e5||0},cd=function(){return typeof window<"u"},ud=function(){return V||cd()&&(V=window.gsap)&&V.registerPlugin&&V},Xr=function(e){return!!~bl.indexOf(e)},fd=function(e){return(e==="Height"?xl:ae["inner"+e])||Jt["client"+e]||be["client"+e]},dd=function(e){return fr(e,"getBoundingClientRect")||(Xr(e)?function(){return uo.width=ae.innerWidth,uo.height=xl,uo}:function(){return Hn(e)})},zm=function(e,n,t){var r=t.d,s=t.d2,o=t.a;return(o=fr(e,"getBoundingClientRect"))?function(){return o()[r]}:function(){return(n?fd(s):e["client"+s])||0}},Im=function(e,n){return!n||~Dn.indexOf(e)?dd(e):function(){return uo}},On=function(e,n){var t=n.s,r=n.d2,s=n.d,o=n.a;return Math.max(0,(t="scroll"+r)&&(o=fr(e,t))?o()-dd(e)()[s]:Xr(e)?(Jt[t]||be[t])-fd(r):e[t]-e["offset"+r])},Hs=function(e,n){for(var t=0;t<ii.length;t+=3)(!n||~n.indexOf(ii[t+1]))&&e(ii[t],ii[t+1],ii[t+2])},jt=function(e){return typeof e=="string"},St=function(e){return typeof e=="function"},Wi=function(e){return typeof e=="number"},Cr=function(e){return typeof e=="object"},Fi=function(e,n,t){return e&&e.progress(n?0:1)&&t&&e.pause()},ei=function(e,n,t){if(e.enabled){var r=e._ctx?e._ctx.add(function(){return n(e,t)}):n(e,t);r&&r.totalTime&&(e.callbackAnimation=r)}},ti=Math.abs,hd="left",pd="top",wl="right",Sl="bottom",$r="width",Gr="height",is="Right",ss="Left",os="Top",as="Bottom",Qe="padding",pn="margin",ki="Width",kl="Height",et="px",gn=function(e){return ae.getComputedStyle(e.nodeType===Node.DOCUMENT_NODE?e.scrollingElement:e)},Nm=function(e){var n=gn(e).position;e.style.position=n==="absolute"||n==="fixed"?n:"relative"},Uc=function(e,n){for(var t in n)t in e||(e[t]=n[t]);return e},Hn=function(e,n){var t=n&&gn(e)[Ya]!=="matrix(1, 0, 0, 1, 0, 0)"&&V.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),r=e.getBoundingClientRect?e.getBoundingClientRect():e.scrollingElement.getBoundingClientRect();return t&&t.progress(0).kill(),r},Eo=function(e,n){var t=n.d2;return e["offset"+t]||e["client"+t]||0},gd=function(e){var n=[],t=e.labels,r=e.duration(),s;for(s in t)n.push(t[s]/r);return n},Fm=function(e){return function(n){return V.utils.snap(gd(e),n)}},Tl=function(e){var n=V.utils.snap(e),t=Array.isArray(e)&&e.slice(0).sort(function(r,s){return r-s});return t?function(r,s,o){o===void 0&&(o=.001);var a;if(!s)return n(r);if(s>0){for(r-=o,a=0;a<t.length;a++)if(t[a]>=r)return t[a];return t[a-1]}else for(a=t.length,r+=o;a--;)if(t[a]<=r)return t[a];return t[0]}:function(r,s,o){o===void 0&&(o=.001);var a=n(r);return!s||Math.abs(a-r)<o||a-r<0==s<0?a:n(s<0?r-e:r+e)}},$m=function(e){return function(n,t){return Tl(gd(e))(n,t.direction)}},Xs=function(e,n,t,r){return t.split(",").forEach(function(s){return e(n,s,r)})},ot=function(e,n,t,r,s){return e.addEventListener(n,t,{passive:!r,capture:!!s})},st=function(e,n,t,r){return e.removeEventListener(n,t,!!r)},qs=function(e,n,t){t=t&&t.wheelHandler,t&&(e(n,"wheel",t),e(n,"touchmove",t))},jc={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},Vs={toggleActions:"play",anticipatePin:0},Co={top:0,left:0,center:.5,bottom:1,right:1},oo=function(e,n){if(jt(e)){var t=e.indexOf("="),r=~t?+(e.charAt(t-1)+1)*parseFloat(e.substr(t+1)):0;~t&&(e.indexOf("%")>t&&(r*=n/100),e=e.substr(0,t-1)),e=r+(e in Co?Co[e]*n:~e.indexOf("%")?parseFloat(e)*n/100:parseFloat(e)||0)}return e},Ws=function(e,n,t,r,s,o,a,l){var c=s.startColor,u=s.endColor,f=s.fontSize,h=s.indent,d=s.fontWeight,g=we.createElement("div"),p=Xr(t)||fr(t,"pinType")==="fixed",m=e.indexOf("scroller")!==-1,v=p?be:t.tagName==="IFRAME"?t.contentDocument.body:t,y=e.indexOf("start")!==-1,x=y?c:u,w="border-color:"+x+";font-size:"+f+";color:"+x+";font-weight:"+d+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return w+="position:"+((m||l)&&p?"fixed;":"absolute;"),(m||l||!p)&&(w+=(r===tt?wl:Sl)+":"+(o+parseFloat(h))+"px;"),a&&(w+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),g._isStart=y,g.setAttribute("class","gsap-marker-"+e+(n?" marker-"+n:"")),g.style.cssText=w,g.innerText=n||n===0?e+"-"+n:e,v.children[0]?v.insertBefore(g,v.children[0]):v.appendChild(g),g._offset=g["offset"+r.op.d2],ao(g,0,r,y),g},ao=function(e,n,t,r){var s={display:"block"},o=t[r?"os2":"p2"],a=t[r?"p2":"os2"];e._isFlipped=r,s[t.a+"Percent"]=r?-100:0,s[t.a]=r?"1px":0,s["border"+o+ki]=1,s["border"+a+ki]=0,s[t.p]=n+"px",V.set(e,s)},oe=[],Va={},vs,Qc=function(){return xt()-yn>34&&(vs||(vs=requestAnimationFrame(Wn)))},ni=function(){(!Mt||!Mt.isPressed||Mt.startX>be.clientWidth)&&(le.cache++,Mt?vs||(vs=requestAnimationFrame(Wn)):Wn(),yn||Vr("scrollStart"),yn=xt())},aa=function(){ld=ae.innerWidth,ad=ae.innerHeight},Ui=function(e){le.cache++,(e===!0||!vt&&!od&&!we.fullscreenElement&&!we.webkitFullscreenElement&&(!Ha||ld!==ae.innerWidth||Math.abs(ae.innerHeight-ad)>ae.innerHeight*.25))&&To.restart(!0)},qr={},Gm=[],md=function i(){return st(ce,"scrollEnd",i)||Or(!0)},Vr=function(e){return qr[e]&&qr[e].map(function(n){return n()})||Gm},Ut=[],_d=function(e){for(var n=0;n<Ut.length;n+=5)(!e||Ut[n+4]&&Ut[n+4].query===e)&&(Ut[n].style.cssText=Ut[n+1],Ut[n].getBBox&&Ut[n].setAttribute("transform",Ut[n+2]||""),Ut[n+3].uncache=1)},yd=function(){return le.forEach(function(e){return St(e)&&++e.cacheID&&(e.rec=e())})},El=function(e,n){var t;for(Pt=0;Pt<oe.length;Pt++)t=oe[Pt],t&&(!n||t._ctx===n)&&(e?t.kill(1):t.revert(!0,!0));rs=!0,n&&_d(n),n||Vr("revert")},bd=function(e,n){le.cache++,(n||!At)&&le.forEach(function(t){return St(t)&&t.cacheID++&&(t.rec=0)}),jt(e)&&(ae.history.scrollRestoration=vl=e)},At,Br=0,Kc,Bm=function(){if(Kc!==Br){var e=Kc=Br;requestAnimationFrame(function(){return e===Br&&Or(!0)})}},vd=function(){be.appendChild(mi),xl=!Mt&&mi.offsetHeight||ae.innerHeight,be.removeChild(mi)},Zc=function(e){return bs(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(n){return n.style.display=e?"none":"block"})},Or=function(e,n){if(Jt=we.documentElement,be=we.body,bl=[ae,we,Jt,be],yn&&!e&&!rs){ot(ce,"scrollEnd",md);return}vd(),At=ce.isRefreshing=!0,rs||yd();var t=Vr("refreshInit");sd&&ce.sort(),n||El(),le.forEach(function(r){St(r)&&(r.smooth&&(r.target.style.scrollBehavior="auto"),r(0))}),oe.slice(0).forEach(function(r){return r.refresh()}),rs=!1,oe.forEach(function(r){if(r._subPinOffset&&r.pin){var s=r.vars.horizontal?"offsetWidth":"offsetHeight",o=r.pin[s];r.revert(!0,1),r.adjustPinSpacing(r.pin[s]-o),r.refresh()}}),qa=1,Zc(!0),oe.forEach(function(r){var s=On(r.scroller,r._dir),o=r.vars.end==="max"||r._endClamp&&r.end>s,a=r._startClamp&&r.start>=s;(o||a)&&r.setPositions(a?s-1:r.start,o?Math.max(a?s:r.start+1,s):r.end,!0)}),Zc(!1),qa=0,t.forEach(function(r){return r&&r.render&&r.render(-1)}),le.forEach(function(r){St(r)&&(r.smooth&&requestAnimationFrame(function(){return r.target.style.scrollBehavior="smooth"}),r.rec&&r(r.rec))}),bd(vl,1),To.pause(),Br++,At=2,Wn(2),oe.forEach(function(r){return St(r.vars.onRefresh)&&r.vars.onRefresh(r)}),At=ce.isRefreshing=!1,Vr("refresh")},Wa=0,lo=1,ls,Wn=function(e){if(e===2||!At&&!rs){ce.isUpdating=!0,ls&&ls.update(0);var n=oe.length,t=xt(),r=t-oa>=50,s=n&&oe[0].scroll();if(lo=Wa>s?-1:1,At||(Wa=s),r&&(yn&&!zo&&t-yn>200&&(yn=0,Vr("scrollEnd")),Xi=oa,oa=t),lo<0){for(Pt=n;Pt-- >0;)oe[Pt]&&oe[Pt].update(0,r);lo=1}else for(Pt=0;Pt<n;Pt++)oe[Pt]&&oe[Pt].update(0,r);ce.isUpdating=!1}vs=0},Ua=[hd,pd,Sl,wl,pn+as,pn+is,pn+os,pn+ss,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],co=Ua.concat([$r,Gr,"boxSizing","max"+ki,"max"+kl,"position",pn,Qe,Qe+os,Qe+is,Qe+as,Qe+ss]),Ym=function(e,n,t){_i(t);var r=e._gsap;if(r.spacerIsNative)_i(r.spacerState);else if(e._gsap.swappedIn){var s=n.parentNode;s&&(s.insertBefore(e,n),s.removeChild(n))}e._gsap.swappedIn=!1},la=function(e,n,t,r){if(!e._gsap.swappedIn){for(var s=Ua.length,o=n.style,a=e.style,l;s--;)l=Ua[s],o[l]=t[l];o.position=t.position==="absolute"?"absolute":"relative",t.display==="inline"&&(o.display="inline-block"),a[Sl]=a[wl]="auto",o.flexBasis=t.flexBasis||"auto",o.overflow="visible",o.boxSizing="border-box",o[$r]=Eo(e,Rt)+et,o[Gr]=Eo(e,tt)+et,o[Qe]=a[pn]=a[pd]=a[hd]="0",_i(r),a[$r]=a["max"+ki]=t[$r],a[Gr]=a["max"+kl]=t[Gr],a[Qe]=t[Qe],e.parentNode!==n&&(e.parentNode.insertBefore(n,e),n.appendChild(e)),e._gsap.swappedIn=!0}},Hm=/([A-Z])/g,_i=function(e){if(e){var n=e.t.style,t=e.length,r=0,s,o;for((e.t._gsap||V.core.getCache(e.t)).uncache=1;r<t;r+=2)o=e[r+1],s=e[r],o?n[s]=o:n[s]&&n.removeProperty(s.replace(Hm,"-$1").toLowerCase())}},Us=function(e){for(var n=co.length,t=e.style,r=[],s=0;s<n;s++)r.push(co[s],t[co[s]]);return r.t=e,r},Xm=function(e,n,t){for(var r=[],s=e.length,o=t?8:0,a;o<s;o+=2)a=e[o],r.push(a,a in n?n[a]:e[o+1]);return r.t=e.t,r},uo={left:0,top:0},Jc=function(e,n,t,r,s,o,a,l,c,u,f,h,d,g){St(e)&&(e=e(l)),jt(e)&&e.substr(0,3)==="max"&&(e=h+(e.charAt(4)==="="?oo("0"+e.substr(3),t):0));var p=d?d.time():0,m,v,y;if(d&&d.seek(0),isNaN(e)||(e=+e),Wi(e))d&&(e=V.utils.mapRange(d.scrollTrigger.start,d.scrollTrigger.end,0,h,e)),a&&ao(a,t,r,!0);else{St(n)&&(n=n(l));var x=(e||"0").split(" "),w,S,E,k;y=zt(n,l)||be,w=Hn(y)||{},(!w||!w.left&&!w.top)&&gn(y).display==="none"&&(k=y.style.display,y.style.display="block",w=Hn(y),k?y.style.display=k:y.style.removeProperty("display")),S=oo(x[0],w[r.d]),E=oo(x[1]||"0",t),e=w[r.p]-c[r.p]-u+S+s-E,a&&ao(a,E,r,t-E<20||a._isStart&&E>20),t-=t-E}if(g&&(l[g]=e||-.001,e<0&&(e=0)),o){var A=e+t,C=o._isStart;m="scroll"+r.d2,ao(o,A,r,C&&A>20||!C&&(f?Math.max(be[m],Jt[m]):o.parentNode[m])<=A+1),f&&(c=Hn(a),f&&(o.style[r.op.p]=c[r.op.p]-r.op.m-o._offset+et))}return d&&y&&(m=Hn(y),d.seek(h),v=Hn(y),d._caScrollDist=m[r.p]-v[r.p],e=e/d._caScrollDist*h),d&&d.seek(p),d?e:Math.round(e)},qm=/(webkit|moz|length|cssText|inset)/i,eu=function(e,n,t,r){if(e.parentNode!==n){var s=e.style,o,a;if(n===be){e._stOrig=s.cssText,a=gn(e);for(o in a)!+o&&!qm.test(o)&&a[o]&&typeof s[o]=="string"&&o!=="0"&&(s[o]=a[o]);s.top=t,s.left=r}else s.cssText=e._stOrig;V.core.getCache(e).uncache=1,n.appendChild(e)}},xd=function(e,n,t){var r=n,s=r;return function(o){var a=Math.round(e());return a!==r&&a!==s&&Math.abs(a-r)>3&&Math.abs(a-s)>3&&(o=a,t&&t()),s=r,r=Math.round(o),r}},js=function(e,n,t){var r={};r[n.p]="+="+t,V.set(e,r)},tu=function(e,n){var t=gr(e,n),r="_scroll"+n.p2,s=function o(a,l,c,u,f){var h=o.tween,d=l.onComplete,g={};c=c||t();var p=xd(t,c,function(){h.kill(),o.tween=0});return f=u&&f||0,u=u||a-c,h&&h.kill(),l[r]=a,l.inherit=!1,l.modifiers=g,g[r]=function(){return p(c+u*h.ratio+f*h.ratio*h.ratio)},l.onUpdate=function(){le.cache++,o.tween&&Wn()},l.onComplete=function(){o.tween=0,d&&d.call(h)},h=o.tween=V.to(e,l),h};return e[r]=t,t.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},ot(e,"wheel",t.wheelHandler),ce.isTouch&&ot(e,"touchmove",t.wheelHandler),s},ce=function(){function i(n,t){ri||i.register(V)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),Xa(this),this.init(n,t)}var e=i.prototype;return e.init=function(t,r){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!qi){this.update=this.refresh=this.kill=Pn;return}t=Uc(jt(t)||Wi(t)||t.nodeType?{trigger:t}:t,Vs);var s=t,o=s.onUpdate,a=s.toggleClass,l=s.id,c=s.onToggle,u=s.onRefresh,f=s.scrub,h=s.trigger,d=s.pin,g=s.pinSpacing,p=s.invalidateOnRefresh,m=s.anticipatePin,v=s.onScrubComplete,y=s.onSnapComplete,x=s.once,w=s.snap,S=s.pinReparent,E=s.pinSpacer,k=s.containerAnimation,A=s.fastScrollEnd,C=s.preventOverlaps,P=t.horizontal||t.containerAnimation&&t.horizontal!==!1?Rt:tt,$=!f&&f!==0,_=zt(t.scroller||ae),z=V.core.getCache(_),N=Xr(_),B=("pinType"in t?t.pinType:fr(_,"pinType")||N&&"fixed")==="fixed",I=[t.onEnter,t.onLeave,t.onEnterBack,t.onLeaveBack],F=$&&t.toggleActions.split(" "),R="markers"in t?t.markers:Vs.markers,L=N?0:parseFloat(gn(_)["border"+P.p2+ki])||0,b=this,Y=t.onRefreshInit&&function(){return t.onRefreshInit(b)},U=zm(_,N,P),D=Im(_,N),H=0,W=0,te=0,q=gr(_,P),_e,Se,me,Ie,Ce,j,ie,He,nt,M,Ae,ct,mt,ye,de,Ne,ut,Fe,bn,Re,Xt,Tt,Ot,Qn,Le,In,Lt,vn,xn,qt,Vt,se,ln,_t,Dt,ft,Nn,Fn,dt;if(b._startClamp=b._endClamp=!1,b._dir=P,m*=45,b.scroller=_,b.scroll=k?k.time.bind(k):q,Ie=q(),b.vars=t,r=r||t.animation,"refreshPriority"in t&&(sd=1,t.refreshPriority===-9999&&(ls=b)),z.tweenScroll=z.tweenScroll||{top:tu(_,tt),left:tu(_,Rt)},b.tweenTo=_e=z.tweenScroll[P.p],b.scrubDuration=function(G){ln=Wi(G)&&G,ln?se?se.duration(G):se=V.to(r,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:ln,paused:!0,onComplete:function(){return v&&v(b)}}):(se&&se.progress(1).kill(),se=0)},r&&(r.vars.lazy=!1,r._initted&&!b.isReverted||r.vars.immediateRender!==!1&&t.immediateRender!==!1&&r.duration()&&r.render(0,!0,!0),b.animation=r.pause(),r.scrollTrigger=b,b.scrubDuration(f),qt=0,l||(l=r.vars.id)),w&&((!Cr(w)||w.push)&&(w={snapTo:w}),"scrollBehavior"in be.style&&V.set(N?[be,Jt]:_,{scrollBehavior:"auto"}),le.forEach(function(G){return St(G)&&G.target===(N?we.scrollingElement||Jt:_)&&(G.smooth=!1)}),me=St(w.snapTo)?w.snapTo:w.snapTo==="labels"?Fm(r):w.snapTo==="labelsDirectional"?$m(r):w.directional!==!1?function(G,ee){return Tl(w.snapTo)(G,xt()-W<500?0:ee.direction)}:V.utils.snap(w.snapTo),_t=w.duration||{min:.1,max:2},_t=Cr(_t)?ns(_t.min,_t.max):ns(_t,_t),Dt=V.delayedCall(w.delay||ln/2||.1,function(){var G=q(),ee=xt()-W<500,Q=_e.tween;if((ee||Math.abs(b.getVelocity())<10)&&!Q&&!zo&&H!==G){var J=(G-j)/ye,Ue=r&&!$?r.totalProgress():J,fe=ee?0:(Ue-Vt)/(xt()-Xi)*1e3||0,$e=V.utils.clamp(-J,1-J,ti(fe/2)*fe/.185),rt=J+(w.inertia===!1?0:$e),De,Me,ge=w,yt=ge.onStart,Oe=ge.onInterrupt,bt=ge.onComplete;if(De=me(rt,b),Wi(De)||(De=rt),Me=Math.max(0,Math.round(j+De*ye)),G<=ie&&G>=j&&Me!==G){if(Q&&!Q._initted&&Q.data<=ti(Me-G))return;w.inertia===!1&&($e=De-J),_e(Me,{duration:_t(ti(Math.max(ti(rt-Ue),ti(De-Ue))*.185/fe/.05||0)),ease:w.ease||"power3",data:ti(Me-G),onInterrupt:function(){return Dt.restart(!0)&&Oe&&ei(b,Oe)},onComplete:function(){b.update(),H=q(),r&&!$&&(se?se.resetTo("totalProgress",De,r._tTime/r._tDur):r.progress(De)),qt=Vt=r&&!$?r.totalProgress():b.progress,y&&y(b),bt&&ei(b,bt)}},G,$e*ye,Me-G-$e*ye),yt&&ei(b,yt,_e.tween)}}else b.isActive&&H!==G&&Dt.restart(!0)}).pause()),l&&(Va[l]=b),h=b.trigger=zt(h||d!==!0&&d),dt=h&&h._gsap&&h._gsap.stRevert,dt&&(dt=dt(b)),d=d===!0?h:zt(d),jt(a)&&(a={targets:h,className:a}),d&&(g===!1||g===pn||(g=!g&&d.parentNode&&d.parentNode.style&&gn(d.parentNode).display==="flex"?!1:Qe),b.pin=d,Se=V.core.getCache(d),Se.spacer?de=Se.pinState:(E&&(E=zt(E),E&&!E.nodeType&&(E=E.current||E.nativeElement),Se.spacerIsNative=!!E,E&&(Se.spacerState=Us(E))),Se.spacer=Fe=E||we.createElement("div"),Fe.classList.add("pin-spacer"),l&&Fe.classList.add("pin-spacer-"+l),Se.pinState=de=Us(d)),t.force3D!==!1&&V.set(d,{force3D:!0}),b.spacer=Fe=Se.spacer,xn=gn(d),Qn=xn[g+P.os2],Re=V.getProperty(d),Xt=V.quickSetter(d,P.a,et),la(d,Fe,xn),ut=Us(d)),R){ct=Cr(R)?Uc(R,jc):jc,M=Ws("scroller-start",l,_,P,ct,0),Ae=Ws("scroller-end",l,_,P,ct,0,M),bn=M["offset"+P.op.d2];var $n=zt(fr(_,"content")||_);He=this.markerStart=Ws("start",l,$n,P,ct,bn,0,k),nt=this.markerEnd=Ws("end",l,$n,P,ct,bn,0,k),k&&(Fn=V.quickSetter([He,nt],P.a,et)),!B&&!(Dn.length&&fr(_,"fixedMarkers")===!0)&&(Nm(N?be:_),V.set([M,Ae],{force3D:!0}),In=V.quickSetter(M,P.a,et),vn=V.quickSetter(Ae,P.a,et))}if(k){var ne=k.vars.onUpdate,Z=k.vars.onUpdateParams;k.eventCallback("onUpdate",function(){b.update(0,0,1),ne&&ne.apply(k,Z||[])})}if(b.previous=function(){return oe[oe.indexOf(b)-1]},b.next=function(){return oe[oe.indexOf(b)+1]},b.revert=function(G,ee){if(!ee)return b.kill(!0);var Q=G!==!1||!b.enabled,J=vt;Q!==b.isReverted&&(Q&&(ft=Math.max(q(),b.scroll.rec||0),te=b.progress,Nn=r&&r.progress()),He&&[He,nt,M,Ae].forEach(function(Ue){return Ue.style.display=Q?"none":"block"}),Q&&(vt=b,b.update(Q)),d&&(!S||!b.isActive)&&(Q?Ym(d,Fe,de):la(d,Fe,gn(d),Le)),Q||b.update(Q),vt=J,b.isReverted=Q)},b.refresh=function(G,ee,Q,J){if(!((vt||!b.enabled)&&!ee)){if(d&&G&&yn){ot(i,"scrollEnd",md);return}!At&&Y&&Y(b),vt=b,_e.tween&&!Q&&(_e.tween.kill(),_e.tween=0),se&&se.pause(),p&&r&&(r.revert({kill:!1}).invalidate(),r.getChildren?r.getChildren(!0,!0,!1).forEach(function(T){return T.vars.immediateRender&&T.render(0,!0,!0)}):r.vars.immediateRender&&r.render(0,!0,!0)),b.isReverted||b.revert(!0,!0),b._subPinOffset=!1;var Ue=U(),fe=D(),$e=k?k.duration():On(_,P),rt=ye<=.01||!ye,De=0,Me=J||0,ge=Cr(Q)?Q.end:t.end,yt=t.endTrigger||h,Oe=Cr(Q)?Q.start:t.start||(t.start===0||!h?0:d?"0 0":"0 100%"),bt=b.pinnedContainer=t.pinnedContainer&&zt(t.pinnedContainer,b),cn=h&&Math.max(0,oe.indexOf(b))||0,Ze=cn,Je,it,un,_r,je,qe,fn,Ti,Ei,yr,dn,Kn,jr;for(R&&Cr(Q)&&(Kn=V.getProperty(M,P.p),jr=V.getProperty(Ae,P.p));Ze-- >0;)qe=oe[Ze],qe.end||qe.refresh(0,1)||(vt=b),fn=qe.pin,fn&&(fn===h||fn===d||fn===bt)&&!qe.isReverted&&(yr||(yr=[]),yr.unshift(qe),qe.revert(!0,!0)),qe!==oe[Ze]&&(cn--,Ze--);for(St(Oe)&&(Oe=Oe(b)),Oe=Xc(Oe,"start",b),j=Jc(Oe,h,Ue,P,q(),He,M,b,fe,L,B,$e,k,b._startClamp&&"_startClamp")||(d?-.001:0),St(ge)&&(ge=ge(b)),jt(ge)&&!ge.indexOf("+=")&&(~ge.indexOf(" ")?ge=(jt(Oe)?Oe.split(" ")[0]:"")+ge:(De=oo(ge.substr(2),Ue),ge=jt(Oe)?Oe:(k?V.utils.mapRange(0,k.duration(),k.scrollTrigger.start,k.scrollTrigger.end,j):j)+De,yt=h)),ge=Xc(ge,"end",b),ie=Math.max(j,Jc(ge||(yt?"100% 0":$e),yt,Ue,P,q()+De,nt,Ae,b,fe,L,B,$e,k,b._endClamp&&"_endClamp"))||-.001,De=0,Ze=cn;Ze--;)qe=oe[Ze]||{},fn=qe.pin,fn&&qe.start-qe._pinPush<=j&&!k&&qe.end>0&&(Je=qe.end-(b._startClamp?Math.max(0,qe.start):qe.start),(fn===h&&qe.start-qe._pinPush<j||fn===bt)&&isNaN(Oe)&&(De+=Je*(1-qe.progress)),fn===d&&(Me+=Je));if(j+=De,ie+=De,b._startClamp&&(b._startClamp+=De),b._endClamp&&!At&&(b._endClamp=ie||-.001,ie=Math.min(ie,On(_,P))),ye=ie-j||(j-=.01)&&.001,rt&&(te=V.utils.clamp(0,1,V.utils.normalize(j,ie,ft))),b._pinPush=Me,He&&De&&(Je={},Je[P.a]="+="+De,bt&&(Je[P.p]="-="+q()),V.set([He,nt],Je)),d&&!(qa&&b.end>=On(_,P)))Je=gn(d),_r=P===tt,un=q(),Tt=parseFloat(Re(P.a))+Me,!$e&&ie>1&&(dn=(N?we.scrollingElement||Jt:_).style,dn={style:dn,value:dn["overflow"+P.a.toUpperCase()]},N&&gn(be)["overflow"+P.a.toUpperCase()]!=="scroll"&&(dn.style["overflow"+P.a.toUpperCase()]="scroll")),la(d,Fe,Je),ut=Us(d),it=Hn(d,!0),Ti=B&&gr(_,_r?Rt:tt)(),g?(Le=[g+P.os2,ye+Me+et],Le.t=Fe,Ze=g===Qe?Eo(d,P)+ye+Me:0,Ze&&(Le.push(P.d,Ze+et),Fe.style.flexBasis!=="auto"&&(Fe.style.flexBasis=Ze+et)),_i(Le),bt&&oe.forEach(function(T){T.pin===bt&&T.vars.pinSpacing!==!1&&(T._subPinOffset=!0)}),B&&q(ft)):(Ze=Eo(d,P),Ze&&Fe.style.flexBasis!=="auto"&&(Fe.style.flexBasis=Ze+et)),B&&(je={top:it.top+(_r?un-j:Ti)+et,left:it.left+(_r?Ti:un-j)+et,boxSizing:"border-box",position:"fixed"},je[$r]=je["max"+ki]=Math.ceil(it.width)+et,je[Gr]=je["max"+kl]=Math.ceil(it.height)+et,je[pn]=je[pn+os]=je[pn+is]=je[pn+as]=je[pn+ss]="0",je[Qe]=Je[Qe],je[Qe+os]=Je[Qe+os],je[Qe+is]=Je[Qe+is],je[Qe+as]=Je[Qe+as],je[Qe+ss]=Je[Qe+ss],Ne=Xm(de,je,S),At&&q(0)),r?(Ei=r._initted,ia(1),r.render(r.duration(),!0,!0),Ot=Re(P.a)-Tt+ye+Me,Lt=Math.abs(ye-Ot)>1,B&&Lt&&Ne.splice(Ne.length-2,2),r.render(0,!0,!0),Ei||r.invalidate(!0),r.parent||r.totalTime(r.totalTime()),ia(0)):Ot=ye,dn&&(dn.value?dn.style["overflow"+P.a.toUpperCase()]=dn.value:dn.style.removeProperty("overflow-"+P.a));else if(h&&q()&&!k)for(it=h.parentNode;it&&it!==be;)it._pinOffset&&(j-=it._pinOffset,ie-=it._pinOffset),it=it.parentNode;yr&&yr.forEach(function(T){return T.revert(!1,!0)}),b.start=j,b.end=ie,Ie=Ce=At?ft:q(),!k&&!At&&(Ie<ft&&q(ft),b.scroll.rec=0),b.revert(!1,!0),W=xt(),Dt&&(H=-1,Dt.restart(!0)),vt=0,r&&$&&(r._initted||Nn)&&r.progress()!==Nn&&r.progress(Nn||0,!0).render(r.time(),!0,!0),(rt||te!==b.progress||k||p||r&&!r._initted)&&(r&&!$&&(r._initted||te||r.vars.immediateRender!==!1)&&r.totalProgress(k&&j<-.001&&!te?V.utils.normalize(j,ie,0):te,!0),b.progress=rt||(Ie-j)/ye===te?0:te),d&&g&&(Fe._pinOffset=Math.round(b.progress*Ot)),se&&se.invalidate(),isNaN(Kn)||(Kn-=V.getProperty(M,P.p),jr-=V.getProperty(Ae,P.p),js(M,P,Kn),js(He,P,Kn-(J||0)),js(Ae,P,jr),js(nt,P,jr-(J||0))),rt&&!At&&b.update(),u&&!At&&!mt&&(mt=!0,u(b),mt=!1)}},b.getVelocity=function(){return(q()-Ce)/(xt()-Xi)*1e3||0},b.endAnimation=function(){Fi(b.callbackAnimation),r&&(se?se.progress(1):r.paused()?$||Fi(r,b.direction<0,1):Fi(r,r.reversed()))},b.labelToScroll=function(G){return r&&r.labels&&(j||b.refresh()||j)+r.labels[G]/r.duration()*ye||0},b.getTrailing=function(G){var ee=oe.indexOf(b),Q=b.direction>0?oe.slice(0,ee).reverse():oe.slice(ee+1);return(jt(G)?Q.filter(function(J){return J.vars.preventOverlaps===G}):Q).filter(function(J){return b.direction>0?J.end<=j:J.start>=ie})},b.update=function(G,ee,Q){if(!(k&&!Q&&!G)){var J=At===!0?ft:b.scroll(),Ue=G?0:(J-j)/ye,fe=Ue<0?0:Ue>1?1:Ue||0,$e=b.progress,rt,De,Me,ge,yt,Oe,bt,cn;if(ee&&(Ce=Ie,Ie=k?q():J,w&&(Vt=qt,qt=r&&!$?r.totalProgress():fe)),m&&d&&!vt&&!Ys&&yn&&(!fe&&j<J+(J-Ce)/(xt()-Xi)*m?fe=1e-4:fe===1&&ie>J+(J-Ce)/(xt()-Xi)*m&&(fe=.9999)),fe!==$e&&b.enabled){if(rt=b.isActive=!!fe&&fe<1,De=!!$e&&$e<1,Oe=rt!==De,yt=Oe||!!fe!=!!$e,b.direction=fe>$e?1:-1,b.progress=fe,yt&&!vt&&(Me=fe&&!$e?0:fe===1?1:$e===1?2:3,$&&(ge=!Oe&&F[Me+1]!=="none"&&F[Me+1]||F[Me],cn=r&&(ge==="complete"||ge==="reset"||ge in r))),C&&(Oe||cn)&&(cn||f||!r)&&(St(C)?C(b):b.getTrailing(C).forEach(function(un){return un.endAnimation()})),$||(se&&!vt&&!Ys?(se._dp._time-se._start!==se._time&&se.render(se._dp._time-se._start),se.resetTo?se.resetTo("totalProgress",fe,r._tTime/r._tDur):(se.vars.totalProgress=fe,se.invalidate().restart())):r&&r.totalProgress(fe,!!(vt&&(W||G)))),d){if(G&&g&&(Fe.style[g+P.os2]=Qn),!B)Xt(Vi(Tt+Ot*fe));else if(yt){if(bt=!G&&fe>$e&&ie+1>J&&J+1>=On(_,P),S)if(!G&&(rt||bt)){var Ze=Hn(d,!0),Je=J-j;eu(d,be,Ze.top+(P===tt?Je:0)+et,Ze.left+(P===tt?0:Je)+et)}else eu(d,Fe);_i(rt||bt?Ne:ut),Lt&&fe<1&&rt||Xt(Tt+(fe===1&&!bt?Ot:0))}}w&&!_e.tween&&!vt&&!Ys&&Dt.restart(!0),a&&(Oe||x&&fe&&(fe<1||!sa))&&bs(a.targets).forEach(function(un){return un.classList[rt||x?"add":"remove"](a.className)}),o&&!$&&!G&&o(b),yt&&!vt?($&&(cn&&(ge==="complete"?r.pause().totalProgress(1):ge==="reset"?r.restart(!0).pause():ge==="restart"?r.restart(!0):r[ge]()),o&&o(b)),(Oe||!sa)&&(c&&Oe&&ei(b,c),I[Me]&&ei(b,I[Me]),x&&(fe===1?b.kill(!1,1):I[Me]=0),Oe||(Me=fe===1?1:3,I[Me]&&ei(b,I[Me]))),A&&!rt&&Math.abs(b.getVelocity())>(Wi(A)?A:2500)&&(Fi(b.callbackAnimation),se?se.progress(1):Fi(r,ge==="reverse"?1:!fe,1))):$&&o&&!vt&&o(b)}if(vn){var it=k?J/k.duration()*(k._caScrollDist||0):J;In(it+(M._isFlipped?1:0)),vn(it)}Fn&&Fn(-J/k.duration()*(k._caScrollDist||0))}},b.enable=function(G,ee){b.enabled||(b.enabled=!0,ot(_,"resize",Ui),N||ot(_,"scroll",ni),Y&&ot(i,"refreshInit",Y),G!==!1&&(b.progress=te=0,Ie=Ce=H=q()),ee!==!1&&b.refresh())},b.getTween=function(G){return G&&_e?_e.tween:se},b.setPositions=function(G,ee,Q,J){if(k){var Ue=k.scrollTrigger,fe=k.duration(),$e=Ue.end-Ue.start;G=Ue.start+$e*G/fe,ee=Ue.start+$e*ee/fe}b.refresh(!1,!1,{start:qc(G,Q&&!!b._startClamp),end:qc(ee,Q&&!!b._endClamp)},J),b.update()},b.adjustPinSpacing=function(G){if(Le&&G){var ee=Le.indexOf(P.d)+1;Le[ee]=parseFloat(Le[ee])+G+et,Le[1]=parseFloat(Le[1])+G+et,_i(Le)}},b.disable=function(G,ee){if(G!==!1&&b.revert(!0,!0),b.enabled&&(b.enabled=b.isActive=!1,ee||se&&se.pause(),ft=0,Se&&(Se.uncache=1),Y&&st(i,"refreshInit",Y),Dt&&(Dt.pause(),_e.tween&&_e.tween.kill()&&(_e.tween=0)),!N)){for(var Q=oe.length;Q--;)if(oe[Q].scroller===_&&oe[Q]!==b)return;st(_,"resize",Ui),N||st(_,"scroll",ni)}},b.kill=function(G,ee){b.disable(G,ee),se&&!ee&&se.kill(),l&&delete Va[l];var Q=oe.indexOf(b);Q>=0&&oe.splice(Q,1),Q===Pt&&lo>0&&Pt--,Q=0,oe.forEach(function(J){return J.scroller===b.scroller&&(Q=1)}),Q||At||(b.scroll.rec=0),r&&(r.scrollTrigger=null,G&&r.revert({kill:!1}),ee||r.kill()),He&&[He,nt,M,Ae].forEach(function(J){return J.parentNode&&J.parentNode.removeChild(J)}),ls===b&&(ls=0),d&&(Se&&(Se.uncache=1),Q=0,oe.forEach(function(J){return J.pin===d&&Q++}),Q||(Se.spacer=0)),t.onKill&&t.onKill(b)},oe.push(b),b.enable(!1,!1),dt&&dt(b),r&&r.add&&!ye){var ue=b.update;b.update=function(){b.update=ue,le.cache++,j||ie||b.refresh()},V.delayedCall(.01,b.update),ye=.01,j=ie=0}else b.refresh();d&&Bm()},i.register=function(t){return ri||(V=t||ud(),cd()&&window.document&&i.enable(),ri=qi),ri},i.defaults=function(t){if(t)for(var r in t)Vs[r]=t[r];return Vs},i.disable=function(t,r){qi=0,oe.forEach(function(o){return o[r?"kill":"disable"](t)}),st(ae,"wheel",ni),st(we,"scroll",ni),clearInterval(Bs),st(we,"touchcancel",Pn),st(be,"touchstart",Pn),Xs(st,we,"pointerdown,touchstart,mousedown",Vc),Xs(st,we,"pointerup,touchend,mouseup",Wc),To.kill(),Hs(st);for(var s=0;s<le.length;s+=3)qs(st,le[s],le[s+1]),qs(st,le[s],le[s+2])},i.enable=function(){if(ae=window,we=document,Jt=we.documentElement,be=we.body,V){if(bs=V.utils.toArray,ns=V.utils.clamp,Xa=V.core.context||Pn,ia=V.core.suppressOverwrites||Pn,vl=ae.history.scrollRestoration||"auto",Wa=ae.pageYOffset||0,V.core.globals("ScrollTrigger",i),be){qi=1,mi=document.createElement("div"),mi.style.height="100vh",mi.style.position="absolute",vd(),Dm(),We.register(V),i.isTouch=We.isTouch,Jn=We.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),Ha=We.isTouch===1,ot(ae,"wheel",ni),bl=[ae,we,Jt,be],V.matchMedia?(i.matchMedia=function(u){var f=V.matchMedia(),h;for(h in u)f.add(h,u[h]);return f},V.addEventListener("matchMediaInit",function(){yd(),El()}),V.addEventListener("matchMediaRevert",function(){return _d()}),V.addEventListener("matchMedia",function(){Or(0,1),Vr("matchMedia")}),V.matchMedia().add("(orientation: portrait)",function(){return aa(),aa})):console.warn("Requires GSAP 3.11.0 or later"),aa(),ot(we,"scroll",ni);var t=be.hasAttribute("style"),r=be.style,s=r.borderTopStyle,o=V.core.Animation.prototype,a,l;for(o.revert||Object.defineProperty(o,"revert",{value:function(){return this.time(-.01,!0)}}),r.borderTopStyle="solid",a=Hn(be),tt.m=Math.round(a.top+tt.sc())||0,Rt.m=Math.round(a.left+Rt.sc())||0,s?r.borderTopStyle=s:r.removeProperty("border-top-style"),t||(be.setAttribute("style",""),be.removeAttribute("style")),Bs=setInterval(Qc,250),V.delayedCall(.5,function(){return Ys=0}),ot(we,"touchcancel",Pn),ot(be,"touchstart",Pn),Xs(ot,we,"pointerdown,touchstart,mousedown",Vc),Xs(ot,we,"pointerup,touchend,mouseup",Wc),Ya=V.utils.checkPrefix("transform"),co.push(Ya),ri=xt(),To=V.delayedCall(.2,Or).pause(),ii=[we,"visibilitychange",function(){var u=ae.innerWidth,f=ae.innerHeight;we.hidden?(Yc=u,Hc=f):(Yc!==u||Hc!==f)&&Ui()},we,"DOMContentLoaded",Or,ae,"load",Or,ae,"resize",Ui],Hs(ot),oe.forEach(function(u){return u.enable(0,1)}),l=0;l<le.length;l+=3)qs(st,le[l],le[l+1]),qs(st,le[l],le[l+2])}else if(we){var c=function u(){i.enable(),we.removeEventListener("DOMContentLoaded",u)};we.addEventListener("DOMContentLoaded",c)}}},i.config=function(t){"limitCallbacks"in t&&(sa=!!t.limitCallbacks);var r=t.syncInterval;r&&clearInterval(Bs)||(Bs=r)&&setInterval(Qc,r),"ignoreMobileResize"in t&&(Ha=i.isTouch===1&&t.ignoreMobileResize),"autoRefreshEvents"in t&&(Hs(st)||Hs(ot,t.autoRefreshEvents||"none"),od=(t.autoRefreshEvents+"").indexOf("resize")===-1)},i.scrollerProxy=function(t,r){var s=zt(t),o=le.indexOf(s),a=Xr(s);~o&&le.splice(o,a?6:2),r&&(a?Dn.unshift(ae,r,be,r,Jt,r):Dn.unshift(s,r))},i.clearMatchMedia=function(t){oe.forEach(function(r){return r._ctx&&r._ctx.query===t&&r._ctx.kill(!0,!0)})},i.isInViewport=function(t,r,s){var o=(jt(t)?zt(t):t).getBoundingClientRect(),a=o[s?$r:Gr]*r||0;return s?o.right-a>0&&o.left+a<ae.innerWidth:o.bottom-a>0&&o.top+a<ae.innerHeight},i.positionInViewport=function(t,r,s){jt(t)&&(t=zt(t));var o=t.getBoundingClientRect(),a=o[s?$r:Gr],l=r==null?a/2:r in Co?Co[r]*a:~r.indexOf("%")?parseFloat(r)*a/100:parseFloat(r)||0;return s?(o.left+l)/ae.innerWidth:(o.top+l)/ae.innerHeight},i.killAll=function(t){if(oe.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),t!==!0){var r=qr.killAll||[];qr={},r.forEach(function(s){return s()})}},i}();ce.version="3.15.0";ce.saveStyles=function(i){return i?bs(i).forEach(function(e){if(e&&e.style){var n=Ut.indexOf(e);n>=0&&Ut.splice(n,5),Ut.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),V.core.getCache(e),Xa())}}):Ut};ce.revert=function(i,e){return El(!i,e)};ce.create=function(i,e){return new ce(i,e)};ce.refresh=function(i){return i?Ui(!0):(ri||ce.register())&&Or(!0)};ce.update=function(i){return++le.cache&&Wn(i===!0?2:0)};ce.clearScrollMemory=bd;ce.maxScroll=function(i,e){return On(i,e?Rt:tt)};ce.getScrollFunc=function(i,e){return gr(zt(i),e?Rt:tt)};ce.getById=function(i){return Va[i]};ce.getAll=function(){return oe.filter(function(i){return i.vars.id!=="ScrollSmoother"})};ce.isScrolling=function(){return!!yn};ce.snapDirectional=Tl;ce.addEventListener=function(i,e){var n=qr[i]||(qr[i]=[]);~n.indexOf(e)||n.push(e)};ce.removeEventListener=function(i,e){var n=qr[i],t=n&&n.indexOf(e);t>=0&&n.splice(t,1)};ce.batch=function(i,e){var n=[],t={},r=e.interval||.016,s=e.batchMax||1e9,o=function(c,u){var f=[],h=[],d=V.delayedCall(r,function(){u(f,h),f=[],h=[]}).pause();return function(g){f.length||d.restart(!0),f.push(g.trigger),h.push(g),s<=f.length&&d.progress(1)}},a;for(a in e)t[a]=a.substr(0,2)==="on"&&St(e[a])&&a!=="onRefreshInit"?o(a,e[a]):e[a];return St(s)&&(s=s(),ot(ce,"refresh",function(){return s=e.batchMax()})),bs(i).forEach(function(l){var c={};for(a in t)c[a]=t[a];c.trigger=l,n.push(ce.create(c))}),n};var nu=function(e,n,t,r){return n>r?e(r):n<0&&e(0),t>r?(r-n)/(t-n):t<0?n/(n-t):1},ca=function i(e,n){n===!0?e.style.removeProperty("touch-action"):e.style.touchAction=n===!0?"auto":n?"pan-"+n+(We.isTouch?" pinch-zoom":""):"none",e===Jt&&i(be,n)},Qs={auto:1,scroll:1},Vm=function(e){var n=e.event,t=e.target,r=e.axis,s=(n.changedTouches?n.changedTouches[0]:n).target,o=s._gsap||V.core.getCache(s),a=xt(),l;if(!o._isScrollT||a-o._isScrollT>2e3){for(;s&&s!==be&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(Qs[(l=gn(s)).overflowY]||Qs[l.overflowX]));)s=s.parentNode;o._isScroll=s&&s!==t&&!Xr(s)&&(Qs[(l=gn(s)).overflowY]||Qs[l.overflowX]),o._isScrollT=a}(o._isScroll||r==="x")&&(n.stopPropagation(),n._gsapAllow=!0)},wd=function(e,n,t,r){return We.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:n,onWheel:r=r&&Vm,onPress:r,onDrag:r,onScroll:r,onEnable:function(){return t&&ot(we,We.eventTypes[0],iu,!1,!0)},onDisable:function(){return st(we,We.eventTypes[0],iu,!0)}})},Wm=/(input|label|select|textarea)/i,ru,iu=function(e){var n=Wm.test(e.target.tagName);(n||ru)&&(e._gsapAllow=!0,ru=n)},Um=function(e){Cr(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var n=e,t=n.normalizeScrollX,r=n.momentum,s=n.allowNestedScroll,o=n.onRelease,a,l,c=zt(e.target)||Jt,u=V.core.globals().ScrollSmoother,f=u&&u.get(),h=Jn&&(e.content&&zt(e.content)||f&&e.content!==!1&&!f.smooth()&&f.content()),d=gr(c,tt),g=gr(c,Rt),p=1,m=(We.isTouch&&ae.visualViewport?ae.visualViewport.scale*ae.visualViewport.width:ae.outerWidth)/ae.innerWidth,v=0,y=St(r)?function(){return r(a)}:function(){return r||2.8},x,w,S=wd(c,e.type,!0,s),E=function(){return w=!1},k=Pn,A=Pn,C=function(){l=On(c,tt),A=ns(Jn?1:0,l),t&&(k=ns(0,On(c,Rt))),x=Br},P=function(){h._gsap.y=Vi(parseFloat(h._gsap.y)+d.offset)+"px",h.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(h._gsap.y)+", 0, 1)",d.offset=d.cacheID=0},$=function(){if(w){requestAnimationFrame(E);var R=Vi(a.deltaY/2),L=A(d.v-R);if(h&&L!==d.v+d.offset){d.offset=L-d.v;var b=Vi((parseFloat(h&&h._gsap.y)||0)-d.offset);h.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+b+", 0, 1)",h._gsap.y=b+"px",d.cacheID=le.cache,Wn()}return!0}d.offset&&P(),w=!0},_,z,N,B,I=function(){C(),_.isActive()&&_.vars.scrollY>l&&(d()>l?_.progress(1)&&d(l):_.resetTo("scrollY",l))};return h&&V.set(h,{y:"+=0"}),e.ignoreCheck=function(F){return Jn&&F.type==="touchmove"&&$()||p>1.05&&F.type!=="touchstart"||a.isGesturing||F.touches&&F.touches.length>1},e.onPress=function(){w=!1;var F=p;p=Vi((ae.visualViewport&&ae.visualViewport.scale||1)/m),_.pause(),F!==p&&ca(c,p>1.01?!0:t?!1:"x"),z=g(),N=d(),C(),x=Br},e.onRelease=e.onGestureStart=function(F,R){if(d.offset&&P(),!R)B.restart(!0);else{le.cache++;var L=y(),b,Y;t&&(b=g(),Y=b+L*.05*-F.velocityX/.227,L*=nu(g,b,Y,On(c,Rt)),_.vars.scrollX=k(Y)),b=d(),Y=b+L*.05*-F.velocityY/.227,L*=nu(d,b,Y,On(c,tt)),_.vars.scrollY=A(Y),_.invalidate().duration(L).play(.01),(Jn&&_.vars.scrollY>=l||b>=l-1)&&V.to({},{onUpdate:I,duration:L})}o&&o(F)},e.onWheel=function(){_._ts&&_.pause(),xt()-v>1e3&&(x=0,v=xt())},e.onChange=function(F,R,L,b,Y){if(Br!==x&&C(),R&&t&&g(k(b[2]===R?z+(F.startX-F.x):g()+R-b[1])),L){d.offset&&P();var U=Y[2]===L,D=U?N+F.startY-F.y:d()+L-Y[1],H=A(D);U&&D!==H&&(N+=H-D),d(H)}(L||R)&&Wn()},e.onEnable=function(){ca(c,t?!1:"x"),ce.addEventListener("refresh",I),ot(ae,"resize",I),d.smooth&&(d.target.style.scrollBehavior="auto",d.smooth=g.smooth=!1),S.enable()},e.onDisable=function(){ca(c,!0),st(ae,"resize",I),ce.removeEventListener("refresh",I),S.kill()},e.lockAxis=e.lockAxis!==!1,a=new We(e),a.iOS=Jn,Jn&&!d()&&d(1),Jn&&V.ticker.add(Pn),B=a._dc,_=V.to(a,{ease:"power4",paused:!0,inherit:!1,scrollX:t?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:xd(d,d(),function(){return _.pause()})},onUpdate:Wn,onComplete:B.vars.onComplete}),a};ce.sort=function(i){if(St(i))return oe.sort(i);var e=ae.pageYOffset||0;return ce.getAll().forEach(function(n){return n._sortY=n.trigger?e+n.trigger.getBoundingClientRect().top:n.start+ae.innerHeight}),oe.sort(i||function(n,t){return(n.vars.refreshPriority||0)*-1e6+(n.vars.containerAnimation?1e6:n._sortY)-((t.vars.containerAnimation?1e6:t._sortY)+(t.vars.refreshPriority||0)*-1e6)})};ce.observe=function(i){return new We(i)};ce.normalizeScroll=function(i){if(typeof i>"u")return Mt;if(i===!0&&Mt)return Mt.enable();if(i===!1){Mt&&Mt.kill(),Mt=i;return}var e=i instanceof We?i:Um(i);return Mt&&Mt.target===e.target&&Mt.kill(),Xr(e.target)&&(Mt=e),e};ce.core={_getVelocityProp:Ba,_inputObserver:wd,_scrollers:le,_proxies:Dn,bridge:{ss:function(){yn||Vr("scrollStart"),yn=xt()},ref:function(){return vt}}};ud()&&V.registerPlugin(ce);at.registerPlugin(ce);function su(i){i.querySelectorAll(".chapter-panel h2, .atlas-panel h2").forEach(e=>c0(e))}const ou=Object.assign({"./chapters/ch1.ts":y0,"./chapters/ch2.ts":rg,"./chapters/ch3.ts":mg,"./chapters/ch4.ts":Eg,"./chapters/ch5.ts":sm,"./chapters/ch6.ts":gm,"./chapters/ch7.ts":Sm,"./chapters/ch8.ts":Pm}),jm=Object.keys(ou).map(i=>{const e=i.match(/\/(ch\d+)\.ts$/);return e?{id:e[1],num:parseInt(e[1].slice(2),10),create:ou[i].createChapter}:null}).filter(i=>i!==null).sort((i,e)=>i.num-e.num);function Qm(i,e){const n=[],t=[];return jm.forEach((r,s)=>{const o=document.getElementById(r.id);if(!o)throw new Error(`缺少章节容器 #${r.id}（检查 index.html）`);const a=_g[r.id];if(!a)throw new Error(`COPY 缺少 ${r.id} 文案`);const l=r.create({sky:i,root:o,copy:a,id:r.id});n.push(l),t.push(ce.create({trigger:o,start:"top top",end:"bottom bottom",scrub:!0,onEnter:()=>{l.enter(),su(o)},onEnterBack:()=>{l.enter(),su(o)},onLeave:()=>l.exit(),onLeaveBack:()=>l.exit(),onUpdate:c=>{l.update(c.progress),e(s+c.progress)}}))}),{chapters:n,triggers:t}}const Mo=30,au=.22,Km=`
.app-cursor-ring, .app-cursor-dot {
  position: fixed; top: 0; left: 0; z-index: 60; pointer-events: none;
  border-radius: 50%; transform: translate(-50%, -50%);
  will-change: transform;
}
.app-cursor-ring {
  width: ${Mo}px; height: ${Mo}px;
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
`;function Zm(i){if(window.matchMedia("(pointer: coarse)").matches)return;const e=document.createElement("style");e.textContent=Km,document.head.appendChild(e);const n=document.createElement("div");n.className="app-cursor-ring app-cursor-hidden";const t=document.createElement("div");t.className="app-cursor-dot app-cursor-hidden",document.body.append(n,t);let r=-100,s=-100,o=-100,a=-100,l=!1,c=!1;const u=document.querySelector(".sky-tooltip");window.addEventListener("pointermove",d=>{const g=d.target===i;r=d.clientX,s=d.clientY,g!==l&&(l=g,n.classList.toggle("app-cursor-hidden",!l),t.classList.toggle("app-cursor-hidden",!l))}),window.addEventListener("pointerdown",()=>{c=!0,n.classList.add("is-down")}),window.addEventListener("pointerup",()=>{c=!1,n.classList.remove("is-down")}),document.documentElement.addEventListener("mouseleave",()=>{l=!1,n.classList.add("app-cursor-hidden"),t.classList.add("app-cursor-hidden")});let f=1;const h=()=>{o+=(r-o)*au,a+=(s-a)*au;const d=u!==null&&u.style.display==="block",g=(d?.55:1)*(c?.8:1);f+=(g-f)*.2,n.classList.toggle("is-star",d),n.style.transform=`translate(${o-Mo/2}px, ${a-Mo/2}px) scale(${f.toFixed(3)})`,t.style.transform=`translate(${r-2}px, ${s-2}px)`,requestAnimationFrame(h)};requestAnimationFrame(h)}const Jm=1.015,lu={ra:192.8595,dec:27.1283},cu={ra:266.405,dec:-28.9362},e1=.085,t1=.14,n1=.9,r1=.6,i1=new mu(.96,.9,.78),s1=new mu(1,.88,.68),o1=`
varying vec3 vDir;
void main() {
  // 球心在原点：物体空间坐标即天球方向（随父组岁差旋转，与星点行为一致）
  vDir = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,a1=`
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
`;function l1(i){const e=new re(...Yt(lu.ra,lu.dec)).normalize(),n=new re(...Yt(cu.ra,cu.dec)),t=n.addScaledVector(e,-n.dot(e)).normalize(),r=new re().crossVectors(e,t).normalize(),s=new Wd(i*Jm,96,64),o=new fu({vertexShader:o1,fragmentShader:a1,uniforms:{uPole:{value:e},uE0:{value:t},uE1:{value:r},uPeakAlpha:{value:e1},uWidth:{value:t1},uCenterSigma:{value:n1},uDust:{value:r1},uColorBand:{value:i1},uColorCore:{value:s1}},transparent:!0,depthWrite:!1,blending:Yr,side:Ud}),a=new fo(s,o);a.name="milkyway-shell";const l=new kn;return l.name="milkyway",l.add(a),{group:l,dispose(){s.dispose(),o.dispose()}}}function Sd(){document.fullscreenEnabled&&(document.fullscreenElement?Promise.resolve(document.exitFullscreen()).catch(()=>{}):Promise.resolve(document.documentElement.requestFullscreen()).catch(()=>{}))}const c1=`
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
`;function u1({sections:i,names:e}){const n=document.createElement("style");n.textContent=c1,document.head.appendChild(n);const t=document.createElement("div");t.className="app-pager";const r=document.createElement("button");r.className="app-pager-btn",r.type="button",r.setAttribute("aria-label","上一章"),r.textContent="‹";const s=document.createElement("span");s.className="app-pager-idx";const o=document.createElement("button");if(o.className="app-pager-btn",o.type="button",o.setAttribute("aria-label","下一章"),o.textContent="›",document.fullscreenEnabled){const h=document.createElement("button");h.className="app-pager-btn",h.type="button";const d=()=>{const g=!!document.fullscreenElement;h.textContent=g?"✕":"⛶",h.setAttribute("aria-label",g?"退出全屏（F）":"进入全屏（F）")};h.addEventListener("click",Sd),document.addEventListener("fullscreenchange",d),d(),t.append(r,s,o,h)}else t.append(r,s,o);document.body.appendChild(t);const a=i.length-1;let l=0;function c(){const h=window.innerHeight,d=[];for(const g of i){const p=g.offsetTop,m=Math.max(g.offsetHeight-h,0),v=Math.round(m/h);for(let y=0;y<=v;y++)d.push(p+Math.min(y*h,m))}return d.sort((g,p)=>g-p)}function u(){s.textContent=e[l]?`${e[l]} · ${l+1}/${i.length}`:`${l+1}/${i.length}`;const h=document.documentElement.scrollHeight-window.innerHeight;r.disabled=window.scrollY<=2,o.disabled=window.scrollY>=h-2}function f(h){var x,w,S;const d=c(),g=window.scrollY,p=2,m=h>0?d.find(E=>E>g+p)??d[d.length-1]:[...d].reverse().find(E=>E<g-p)??0;if(m===void 0)return;let v=0;for(let E=0;E<i.length;E++)i[E].offsetTop<=m+p&&(v=E);const y=((S=(w=(x=i[v])==null?void 0:x.querySelector("h1, h2"))==null?void 0:w.textContent)==null?void 0:S.trim())||e[v]||"";a0(y,()=>window.scrollTo({top:m,behavior:"instant"}))}return r.addEventListener("click",()=>f(-1)),o.addEventListener("click",()=>f(1)),window.addEventListener("scroll",u,{passive:!0}),u(),{setCurrent(h){const d=Math.min(Math.max(Math.round(h),0),a);d!==l&&(l=d,u())}}}const f1=3.5;function d1(){try{const i=document.createElement("canvas");return!!(i.getContext("webgl2")||i.getContext("webgl"))}catch{return!1}}function uu(i){var t,r,s;const e=document.getElementById("fallback");e&&(e.hidden=!1);const n=document.getElementById("fallback-diag");n&&(n.textContent=`诊断信息：${i}`),(t=document.getElementById("chapters"))==null||t.setAttribute("hidden",""),(r=document.getElementById("sky-canvas"))==null||r.setAttribute("hidden",""),(s=document.getElementById("loading"))==null||s.remove()}async function h1(){const i=document.getElementById("sky-canvas");if(!i)throw new Error("缺少 #sky-canvas");const e=new Na(i);Zm(i);const n=document.getElementById("loading");try{await e.init()}catch(u){console.error(u),n&&(n.textContent="星空数据加载失败，请检查开发服务器");return}n==null||n.remove(),e.addSkyObject(l1(ve).group),xh(),l0("步天歌");const t=new vo(h0),r=[1,2,3,4,5,6,7,8].map(u=>document.getElementById(`ch${u}`)),s=["序","星野","授时","天人","天球","岁差","对话","尾声"],o=u1({sections:r,names:s});window.addEventListener("keydown",u=>{if(u.key!=="f"&&u.key!=="F"||u.ctrlKey||u.metaKey||u.altKey)return;const f=u.target;f&&(f.tagName==="INPUT"||f.tagName==="TEXTAREA"||f.isContentEditable)||Sd()});let a=0,l=0;const{chapters:c}=Qm(e,u=>{a=u,o.setCurrent(Math.min(Math.floor(u),s.length-1))});e.start(u=>{var h,d;l+=(a-l)*(1-Math.exp(-u*f1)),e.applyCameraState(t.sampleGlobal(l));const f=Math.min(Math.max(Math.floor(l),0),c.length-1);(d=(h=c[f])==null?void 0:h.frame)==null||d.call(h,u)})}d1()?h1().catch(i=>{console.error(i),uu(i instanceof Error?i.message:String(i))}):uu("当前浏览器环境无法创建 WebGL 上下文（webgl2 / webgl 均不可用）");
