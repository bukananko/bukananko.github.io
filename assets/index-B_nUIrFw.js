(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();/**
* @vue/shared v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function af(n){const e=Object.create(null);for(const t of n.split(","))e[t]=1;return t=>t in e}const ln={},Na=[],ji=()=>{},b0=()=>!1,uu=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),of=n=>n.startsWith("onUpdate:"),Bn=Object.assign,lf=(n,e)=>{const t=n.indexOf(e);t>-1&&n.splice(t,1)},Wx=Object.prototype.hasOwnProperty,Kt=(n,e)=>Wx.call(n,e),wt=Array.isArray,Ua=n=>du(n)==="[object Map]",y0=n=>du(n)==="[object Set]",Pt=n=>typeof n=="function",bn=n=>typeof n=="string",rr=n=>typeof n=="symbol",dn=n=>n!==null&&typeof n=="object",M0=n=>(dn(n)||Pt(n))&&Pt(n.then)&&Pt(n.catch),S0=Object.prototype.toString,du=n=>S0.call(n),Xx=n=>du(n).slice(8,-1),w0=n=>du(n)==="[object Object]",cf=n=>bn(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,il=af(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),hu=n=>{const e=Object.create(null);return t=>e[t]||(e[t]=n(t))},Yx=/-\w/g,Ci=hu(n=>n.replace(Yx,e=>e.slice(1).toUpperCase())),qx=/\B([A-Z])/g,Gr=hu(n=>n.replace(qx,"-$1").toLowerCase()),fu=hu(n=>n.charAt(0).toUpperCase()+n.slice(1)),$u=hu(n=>n?`on${fu(n)}`:""),Js=(n,e)=>!Object.is(n,e),Zu=(n,...e)=>{for(let t=0;t<n.length;t++)n[t](...e)},E0=(n,e,t,i=!1)=>{Object.defineProperty(n,e,{configurable:!0,enumerable:!1,writable:i,value:t})},Kx=n=>{const e=parseFloat(n);return isNaN(e)?n:e},$x=n=>{const e=bn(n)?Number(n):NaN;return isNaN(e)?n:e};let pp;const pu=()=>pp||(pp=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Or(n){if(wt(n)){const e={};for(let t=0;t<n.length;t++){const i=n[t],s=bn(i)?Qx(i):Or(i);if(s)for(const r in s)e[r]=s[r]}return e}else if(bn(n)||dn(n))return n}const Zx=/;(?![^(]*\))/g,jx=/:([^]+)/,Jx=/\/\*[^]*?\*\//g;function Qx(n){const e={};return n.replace(Jx,"").split(Zx).forEach(t=>{if(t){const i=t.split(jx);i.length>1&&(e[i[0].trim()]=i[1].trim())}}),e}function Wa(n){let e="";if(bn(n))e=n;else if(wt(n))for(let t=0;t<n.length;t++){const i=Wa(n[t]);i&&(e+=i+" ")}else if(dn(n))for(const t in n)n[t]&&(e+=t+" ");return e.trim()}const ev="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",tv=af(ev);function T0(n){return!!n||n===""}const A0=n=>!!(n&&n.__v_isRef===!0),un=n=>bn(n)?n:n==null?"":wt(n)||dn(n)&&(n.toString===S0||!Pt(n.toString))?A0(n)?un(n.value):JSON.stringify(n,C0,2):String(n),C0=(n,e)=>A0(e)?C0(n,e.value):Ua(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((t,[i,s],r)=>(t[ju(i,r)+" =>"]=s,t),{})}:y0(e)?{[`Set(${e.size})`]:[...e.values()].map(t=>ju(t))}:rr(e)?ju(e):dn(e)&&!wt(e)&&!w0(e)?String(e):e,ju=(n,e="")=>{var t;return rr(n)?`Symbol(${(t=n.description)!=null?t:e})`:n};/**
* @vue/reactivity v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let ci;class nv{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=ci,!e&&ci&&(this.index=(ci.scopes||(ci.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].pause();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].resume();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].resume()}}run(e){if(this._active){const t=ci;try{return ci=this,e()}finally{ci=t}}}on(){++this._on===1&&(this.prevScope=ci,ci=this)}off(){this._on>0&&--this._on===0&&(ci=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let t,i;for(t=0,i=this.effects.length;t<i;t++)this.effects[t].stop();for(this.effects.length=0,t=0,i=this.cleanups.length;t<i;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){for(t=0,i=this.scopes.length;t<i;t++)this.scopes[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function iv(){return ci}let on;const Ju=new WeakSet;class R0{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,ci&&ci.active&&ci.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Ju.has(this)&&(Ju.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||D0(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,mp(this),I0(this);const e=on,t=ki;on=this,ki=!0;try{return this.fn()}finally{L0(this),on=e,ki=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)hf(e);this.deps=this.depsTail=void 0,mp(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Ju.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Zd(this)&&this.run()}get dirty(){return Zd(this)}}let P0=0,sl,rl;function D0(n,e=!1){if(n.flags|=8,e){n.next=rl,rl=n;return}n.next=sl,sl=n}function uf(){P0++}function df(){if(--P0>0)return;if(rl){let e=rl;for(rl=void 0;e;){const t=e.next;e.next=void 0,e.flags&=-9,e=t}}let n;for(;sl;){let e=sl;for(sl=void 0;e;){const t=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(i){n||(n=i)}e=t}}if(n)throw n}function I0(n){for(let e=n.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function L0(n){let e,t=n.depsTail,i=t;for(;i;){const s=i.prevDep;i.version===-1?(i===t&&(t=s),hf(i),sv(i)):e=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=s}n.deps=e,n.depsTail=t}function Zd(n){for(let e=n.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(N0(e.dep.computed)||e.dep.version!==e.version))return!0;return!!n._dirty}function N0(n){if(n.flags&4&&!(n.flags&16)||(n.flags&=-17,n.globalVersion===dl)||(n.globalVersion=dl,!n.isSSR&&n.flags&128&&(!n.deps&&!n._dirty||!Zd(n))))return;n.flags|=2;const e=n.dep,t=on,i=ki;on=n,ki=!0;try{I0(n);const s=n.fn(n._value);(e.version===0||Js(s,n._value))&&(n.flags|=128,n._value=s,e.version++)}catch(s){throw e.version++,s}finally{on=t,ki=i,L0(n),n.flags&=-3}}function hf(n,e=!1){const{dep:t,prevSub:i,nextSub:s}=n;if(i&&(i.nextSub=s,n.prevSub=void 0),s&&(s.prevSub=i,n.nextSub=void 0),t.subs===n&&(t.subs=i,!i&&t.computed)){t.computed.flags&=-5;for(let r=t.computed.deps;r;r=r.nextDep)hf(r,!0)}!e&&!--t.sc&&t.map&&t.map.delete(t.key)}function sv(n){const{prevDep:e,nextDep:t}=n;e&&(e.nextDep=t,n.prevDep=void 0),t&&(t.prevDep=e,n.nextDep=void 0)}let ki=!0;const U0=[];function Ms(){U0.push(ki),ki=!1}function Ss(){const n=U0.pop();ki=n===void 0?!0:n}function mp(n){const{cleanup:e}=n;if(n.cleanup=void 0,e){const t=on;on=void 0;try{e()}finally{on=t}}}let dl=0;class rv{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class ff{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!on||!ki||on===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==on)t=this.activeLink=new rv(on,this),on.deps?(t.prevDep=on.depsTail,on.depsTail.nextDep=t,on.depsTail=t):on.deps=on.depsTail=t,F0(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){const i=t.nextDep;i.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=i),t.prevDep=on.depsTail,t.nextDep=void 0,on.depsTail.nextDep=t,on.depsTail=t,on.deps===t&&(on.deps=i)}return t}trigger(e){this.version++,dl++,this.notify(e)}notify(e){uf();try{for(let t=this.subs;t;t=t.prevSub)t.sub.notify()&&t.sub.dep.notify()}finally{df()}}}function F0(n){if(n.dep.sc++,n.sub.flags&4){const e=n.dep.computed;if(e&&!n.dep.subs){e.flags|=20;for(let i=e.deps;i;i=i.nextDep)F0(i)}const t=n.dep.subs;t!==n&&(n.prevSub=t,t&&(t.nextSub=n)),n.dep.subs=n}}const jd=new WeakMap,Ur=Symbol(""),Jd=Symbol(""),hl=Symbol("");function qn(n,e,t){if(ki&&on){let i=jd.get(n);i||jd.set(n,i=new Map);let s=i.get(t);s||(i.set(t,s=new ff),s.map=i,s.key=t),s.track()}}function vs(n,e,t,i,s,r){const a=jd.get(n);if(!a){dl++;return}const o=l=>{l&&l.trigger()};if(uf(),e==="clear")a.forEach(o);else{const l=wt(n),c=l&&cf(t);if(l&&t==="length"){const u=Number(i);a.forEach((h,d)=>{(d==="length"||d===hl||!rr(d)&&d>=u)&&o(h)})}else switch((t!==void 0||a.has(void 0))&&o(a.get(t)),c&&o(a.get(hl)),e){case"add":l?c&&o(a.get("length")):(o(a.get(Ur)),Ua(n)&&o(a.get(Jd)));break;case"delete":l||(o(a.get(Ur)),Ua(n)&&o(a.get(Jd)));break;case"set":Ua(n)&&o(a.get(Ur));break}}df()}function ua(n){const e=Yt(n);return e===n?e:(qn(e,"iterate",hl),Ai(n)?e:e.map(zn))}function mu(n){return qn(n=Yt(n),"iterate",hl),n}const av={__proto__:null,[Symbol.iterator](){return Qu(this,Symbol.iterator,zn)},concat(...n){return ua(this).concat(...n.map(e=>wt(e)?ua(e):e))},entries(){return Qu(this,"entries",n=>(n[1]=zn(n[1]),n))},every(n,e){return ls(this,"every",n,e,void 0,arguments)},filter(n,e){return ls(this,"filter",n,e,t=>t.map(zn),arguments)},find(n,e){return ls(this,"find",n,e,zn,arguments)},findIndex(n,e){return ls(this,"findIndex",n,e,void 0,arguments)},findLast(n,e){return ls(this,"findLast",n,e,zn,arguments)},findLastIndex(n,e){return ls(this,"findLastIndex",n,e,void 0,arguments)},forEach(n,e){return ls(this,"forEach",n,e,void 0,arguments)},includes(...n){return ed(this,"includes",n)},indexOf(...n){return ed(this,"indexOf",n)},join(n){return ua(this).join(n)},lastIndexOf(...n){return ed(this,"lastIndexOf",n)},map(n,e){return ls(this,"map",n,e,void 0,arguments)},pop(){return Uo(this,"pop")},push(...n){return Uo(this,"push",n)},reduce(n,...e){return gp(this,"reduce",n,e)},reduceRight(n,...e){return gp(this,"reduceRight",n,e)},shift(){return Uo(this,"shift")},some(n,e){return ls(this,"some",n,e,void 0,arguments)},splice(...n){return Uo(this,"splice",n)},toReversed(){return ua(this).toReversed()},toSorted(n){return ua(this).toSorted(n)},toSpliced(...n){return ua(this).toSpliced(...n)},unshift(...n){return Uo(this,"unshift",n)},values(){return Qu(this,"values",zn)}};function Qu(n,e,t){const i=mu(n),s=i[e]();return i!==n&&!Ai(n)&&(s._next=s.next,s.next=()=>{const r=s._next();return r.value&&(r.value=t(r.value)),r}),s}const ov=Array.prototype;function ls(n,e,t,i,s,r){const a=mu(n),o=a!==n&&!Ai(n),l=a[e];if(l!==ov[e]){const h=l.apply(n,r);return o?zn(h):h}let c=t;a!==n&&(o?c=function(h,d){return t.call(this,zn(h),d,n)}:t.length>2&&(c=function(h,d){return t.call(this,h,d,n)}));const u=l.call(a,c,i);return o&&s?s(u):u}function gp(n,e,t,i){const s=mu(n);let r=t;return s!==n&&(Ai(n)?t.length>3&&(r=function(a,o,l){return t.call(this,a,o,l,n)}):r=function(a,o,l){return t.call(this,a,zn(o),l,n)}),s[e](r,...i)}function ed(n,e,t){const i=Yt(n);qn(i,"iterate",hl);const s=i[e](...t);return(s===-1||s===!1)&&_f(t[0])?(t[0]=Yt(t[0]),i[e](...t)):s}function Uo(n,e,t=[]){Ms(),uf();const i=Yt(n)[e].apply(n,t);return df(),Ss(),i}const lv=af("__proto__,__v_isRef,__isVue"),O0=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(rr));function cv(n){rr(n)||(n=String(n));const e=Yt(this);return qn(e,"has",n),e.hasOwnProperty(n)}class k0{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,i){if(t==="__v_skip")return e.__v_skip;const s=this._isReadonly,r=this._isShallow;if(t==="__v_isReactive")return!s;if(t==="__v_isReadonly")return s;if(t==="__v_isShallow")return r;if(t==="__v_raw")return i===(s?r?vv:H0:r?z0:G0).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(i)?e:void 0;const a=wt(e);if(!s){let l;if(a&&(l=av[t]))return l;if(t==="hasOwnProperty")return cv}const o=Reflect.get(e,t,$n(e)?e:i);return(rr(t)?O0.has(t):lv(t))||(s||qn(e,"get",t),r)?o:$n(o)?a&&cf(t)?o:o.value:dn(o)?s?V0(o):mf(o):o}}class B0 extends k0{constructor(e=!1){super(!1,e)}set(e,t,i,s){let r=e[t];if(!this._isShallow){const l=er(r);if(!Ai(i)&&!er(i)&&(r=Yt(r),i=Yt(i)),!wt(e)&&$n(r)&&!$n(i))return l||(r.value=i),!0}const a=wt(e)&&cf(t)?Number(t)<e.length:Kt(e,t),o=Reflect.set(e,t,i,$n(e)?e:s);return e===Yt(s)&&(a?Js(i,r)&&vs(e,"set",t,i):vs(e,"add",t,i)),o}deleteProperty(e,t){const i=Kt(e,t);e[t];const s=Reflect.deleteProperty(e,t);return s&&i&&vs(e,"delete",t,void 0),s}has(e,t){const i=Reflect.has(e,t);return(!rr(t)||!O0.has(t))&&qn(e,"has",t),i}ownKeys(e){return qn(e,"iterate",wt(e)?"length":Ur),Reflect.ownKeys(e)}}class uv extends k0{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const dv=new B0,hv=new uv,fv=new B0(!0);const Qd=n=>n,Vl=n=>Reflect.getPrototypeOf(n);function pv(n,e,t){return function(...i){const s=this.__v_raw,r=Yt(s),a=Ua(r),o=n==="entries"||n===Symbol.iterator&&a,l=n==="keys"&&a,c=s[n](...i),u=t?Qd:e?Wc:zn;return!e&&qn(r,"iterate",l?Jd:Ur),{next(){const{value:h,done:d}=c.next();return d?{value:h,done:d}:{value:o?[u(h[0]),u(h[1])]:u(h),done:d}},[Symbol.iterator](){return this}}}}function Wl(n){return function(...e){return n==="delete"?!1:n==="clear"?void 0:this}}function mv(n,e){const t={get(s){const r=this.__v_raw,a=Yt(r),o=Yt(s);n||(Js(s,o)&&qn(a,"get",s),qn(a,"get",o));const{has:l}=Vl(a),c=e?Qd:n?Wc:zn;if(l.call(a,s))return c(r.get(s));if(l.call(a,o))return c(r.get(o));r!==a&&r.get(s)},get size(){const s=this.__v_raw;return!n&&qn(Yt(s),"iterate",Ur),s.size},has(s){const r=this.__v_raw,a=Yt(r),o=Yt(s);return n||(Js(s,o)&&qn(a,"has",s),qn(a,"has",o)),s===o?r.has(s):r.has(s)||r.has(o)},forEach(s,r){const a=this,o=a.__v_raw,l=Yt(o),c=e?Qd:n?Wc:zn;return!n&&qn(l,"iterate",Ur),o.forEach((u,h)=>s.call(r,c(u),c(h),a))}};return Bn(t,n?{add:Wl("add"),set:Wl("set"),delete:Wl("delete"),clear:Wl("clear")}:{add(s){!e&&!Ai(s)&&!er(s)&&(s=Yt(s));const r=Yt(this);return Vl(r).has.call(r,s)||(r.add(s),vs(r,"add",s,s)),this},set(s,r){!e&&!Ai(r)&&!er(r)&&(r=Yt(r));const a=Yt(this),{has:o,get:l}=Vl(a);let c=o.call(a,s);c||(s=Yt(s),c=o.call(a,s));const u=l.call(a,s);return a.set(s,r),c?Js(r,u)&&vs(a,"set",s,r):vs(a,"add",s,r),this},delete(s){const r=Yt(this),{has:a,get:o}=Vl(r);let l=a.call(r,s);l||(s=Yt(s),l=a.call(r,s)),o&&o.call(r,s);const c=r.delete(s);return l&&vs(r,"delete",s,void 0),c},clear(){const s=Yt(this),r=s.size!==0,a=s.clear();return r&&vs(s,"clear",void 0,void 0),a}}),["keys","values","entries",Symbol.iterator].forEach(s=>{t[s]=pv(s,n,e)}),t}function pf(n,e){const t=mv(n,e);return(i,s,r)=>s==="__v_isReactive"?!n:s==="__v_isReadonly"?n:s==="__v_raw"?i:Reflect.get(Kt(t,s)&&s in i?t:i,s,r)}const gv={get:pf(!1,!1)},_v={get:pf(!1,!0)},xv={get:pf(!0,!1)};const G0=new WeakMap,z0=new WeakMap,H0=new WeakMap,vv=new WeakMap;function bv(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function yv(n){return n.__v_skip||!Object.isExtensible(n)?0:bv(Xx(n))}function mf(n){return er(n)?n:gf(n,!1,dv,gv,G0)}function Mv(n){return gf(n,!1,fv,_v,z0)}function V0(n){return gf(n,!0,hv,xv,H0)}function gf(n,e,t,i,s){if(!dn(n)||n.__v_raw&&!(e&&n.__v_isReactive))return n;const r=yv(n);if(r===0)return n;const a=s.get(n);if(a)return a;const o=new Proxy(n,r===2?i:t);return s.set(n,o),o}function Fa(n){return er(n)?Fa(n.__v_raw):!!(n&&n.__v_isReactive)}function er(n){return!!(n&&n.__v_isReadonly)}function Ai(n){return!!(n&&n.__v_isShallow)}function _f(n){return n?!!n.__v_raw:!1}function Yt(n){const e=n&&n.__v_raw;return e?Yt(e):n}function Sv(n){return!Kt(n,"__v_skip")&&Object.isExtensible(n)&&E0(n,"__v_skip",!0),n}const zn=n=>dn(n)?mf(n):n,Wc=n=>dn(n)?V0(n):n;function $n(n){return n?n.__v_isRef===!0:!1}function _i(n){return wv(n,!1)}function wv(n,e){return $n(n)?n:new Ev(n,e)}class Ev{constructor(e,t){this.dep=new ff,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:Yt(e),this._value=t?e:zn(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){const t=this._rawValue,i=this.__v_isShallow||Ai(e)||er(e);e=i?e:Yt(e),Js(e,t)&&(this._rawValue=e,this._value=i?e:zn(e),this.dep.trigger())}}function mn(n){return $n(n)?n.value:n}const Tv={get:(n,e,t)=>e==="__v_raw"?n:mn(Reflect.get(n,e,t)),set:(n,e,t,i)=>{const s=n[e];return $n(s)&&!$n(t)?(s.value=t,!0):Reflect.set(n,e,t,i)}};function W0(n){return Fa(n)?n:new Proxy(n,Tv)}class Av{constructor(e,t,i){this.fn=e,this.setter=t,this._value=void 0,this.dep=new ff(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=dl-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&on!==this)return D0(this,!0),!0}get value(){const e=this.dep.track();return N0(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function Cv(n,e,t=!1){let i,s;return Pt(n)?i=n:(i=n.get,s=n.set),new Av(i,s,t)}const Xl={},Xc=new WeakMap;let Cr;function Rv(n,e=!1,t=Cr){if(t){let i=Xc.get(t);i||Xc.set(t,i=[]),i.push(n)}}function Pv(n,e,t=ln){const{immediate:i,deep:s,once:r,scheduler:a,augmentJob:o,call:l}=t,c=M=>s?M:Ai(M)||s===!1||s===0?$s(M,1):$s(M);let u,h,d,f,x=!1,S=!1;if($n(n)?(h=()=>n.value,x=Ai(n)):Fa(n)?(h=()=>c(n),x=!0):wt(n)?(S=!0,x=n.some(M=>Fa(M)||Ai(M)),h=()=>n.map(M=>{if($n(M))return M.value;if(Fa(M))return c(M);if(Pt(M))return l?l(M,2):M()})):Pt(n)?e?h=l?()=>l(n,2):n:h=()=>{if(d){Ms();try{d()}finally{Ss()}}const M=Cr;Cr=u;try{return l?l(n,3,[f]):n(f)}finally{Cr=M}}:h=ji,e&&s){const M=h,P=s===!0?1/0:s;h=()=>$s(M(),P)}const m=iv(),p=()=>{u.stop(),m&&m.active&&lf(m.effects,u)};if(r&&e){const M=e;e=(...P)=>{M(...P),p()}}let y=S?new Array(n.length).fill(Xl):Xl;const R=M=>{if(!(!(u.flags&1)||!u.dirty&&!M))if(e){const P=u.run();if(s||x||(S?P.some((T,I)=>Js(T,y[I])):Js(P,y))){d&&d();const T=Cr;Cr=u;try{const I=[P,y===Xl?void 0:S&&y[0]===Xl?[]:y,f];y=P,l?l(e,3,I):e(...I)}finally{Cr=T}}}else u.run()};return o&&o(R),u=new R0(h),u.scheduler=a?()=>a(R,!1):R,f=M=>Rv(M,!1,u),d=u.onStop=()=>{const M=Xc.get(u);if(M){if(l)l(M,4);else for(const P of M)P();Xc.delete(u)}},e?i?R(!0):y=u.run():a?a(R.bind(null,!0),!0):u.run(),p.pause=u.pause.bind(u),p.resume=u.resume.bind(u),p.stop=p,p}function $s(n,e=1/0,t){if(e<=0||!dn(n)||n.__v_skip||(t=t||new Map,(t.get(n)||0)>=e))return n;if(t.set(n,e),e--,$n(n))$s(n.value,e,t);else if(wt(n))for(let i=0;i<n.length;i++)$s(n[i],e,t);else if(y0(n)||Ua(n))n.forEach(i=>{$s(i,e,t)});else if(w0(n)){for(const i in n)$s(n[i],e,t);for(const i of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,i)&&$s(n[i],e,t)}return n}/**
* @vue/runtime-core v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Ml(n,e,t,i){try{return i?n(...i):n()}catch(s){gu(s,e,t)}}function Bi(n,e,t,i){if(Pt(n)){const s=Ml(n,e,t,i);return s&&M0(s)&&s.catch(r=>{gu(r,e,t)}),s}if(wt(n)){const s=[];for(let r=0;r<n.length;r++)s.push(Bi(n[r],e,t,i));return s}}function gu(n,e,t,i=!0){const s=e?e.vnode:null,{errorHandler:r,throwUnhandledErrorInProduction:a}=e&&e.appContext.config||ln;if(e){let o=e.parent;const l=e.proxy,c=`https://vuejs.org/error-reference/#runtime-${t}`;for(;o;){const u=o.ec;if(u){for(let h=0;h<u.length;h++)if(u[h](n,l,c)===!1)return}o=o.parent}if(r){Ms(),Ml(r,null,10,[n,l,c]),Ss();return}}Dv(n,t,s,i,a)}function Dv(n,e,t,i=!0,s=!1){if(s)throw n;console.error(n)}const ii=[];let Xi=-1;const Oa=[];let Ws=null,Da=0;const X0=Promise.resolve();let Yc=null;function Iv(n){const e=Yc||X0;return n?e.then(this?n.bind(this):n):e}function Lv(n){let e=Xi+1,t=ii.length;for(;e<t;){const i=e+t>>>1,s=ii[i],r=fl(s);r<n||r===n&&s.flags&2?e=i+1:t=i}return e}function xf(n){if(!(n.flags&1)){const e=fl(n),t=ii[ii.length-1];!t||!(n.flags&2)&&e>=fl(t)?ii.push(n):ii.splice(Lv(e),0,n),n.flags|=1,Y0()}}function Y0(){Yc||(Yc=X0.then(K0))}function Nv(n){wt(n)?Oa.push(...n):Ws&&n.id===-1?Ws.splice(Da+1,0,n):n.flags&1||(Oa.push(n),n.flags|=1),Y0()}function _p(n,e,t=Xi+1){for(;t<ii.length;t++){const i=ii[t];if(i&&i.flags&2){if(n&&i.id!==n.uid)continue;ii.splice(t,1),t--,i.flags&4&&(i.flags&=-2),i(),i.flags&4||(i.flags&=-2)}}}function q0(n){if(Oa.length){const e=[...new Set(Oa)].sort((t,i)=>fl(t)-fl(i));if(Oa.length=0,Ws){Ws.push(...e);return}for(Ws=e,Da=0;Da<Ws.length;Da++){const t=Ws[Da];t.flags&4&&(t.flags&=-2),t.flags&8||t(),t.flags&=-2}Ws=null,Da=0}}const fl=n=>n.id==null?n.flags&2?-1:1/0:n.id;function K0(n){try{for(Xi=0;Xi<ii.length;Xi++){const e=ii[Xi];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),Ml(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;Xi<ii.length;Xi++){const e=ii[Xi];e&&(e.flags&=-2)}Xi=-1,ii.length=0,q0(),Yc=null,(ii.length||Oa.length)&&K0()}}let Ui=null,$0=null;function qc(n){const e=Ui;return Ui=n,$0=n&&n.type.__scopeId||null,e}function _u(n,e=Ui,t){if(!e||n._n)return n;const i=(...s)=>{i._d&&Zc(-1);const r=qc(e);let a;try{a=n(...s)}finally{qc(r),i._d&&Zc(1)}return a};return i._n=!0,i._c=!0,i._d=!0,i}function br(n,e,t,i){const s=n.dirs,r=e&&e.dirs;for(let a=0;a<s.length;a++){const o=s[a];r&&(o.oldValue=r[a].value);let l=o.dir[i];l&&(Ms(),Bi(l,t,8,[n.el,o,n,e]),Ss())}}const Uv=Symbol("_vte"),Z0=n=>n.__isTeleport,xs=Symbol("_leaveCb"),Yl=Symbol("_enterCb");function Fv(){const n={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return bu(()=>{n.isMounted=!0}),sg(()=>{n.isUnmounting=!0}),n}const Si=[Function,Array],j0={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:Si,onEnter:Si,onAfterEnter:Si,onEnterCancelled:Si,onBeforeLeave:Si,onLeave:Si,onAfterLeave:Si,onLeaveCancelled:Si,onBeforeAppear:Si,onAppear:Si,onAfterAppear:Si,onAppearCancelled:Si},J0=n=>{const e=n.subTree;return e.component?J0(e.component):e},Ov={name:"BaseTransition",props:j0,setup(n,{slots:e}){const t=Eg(),i=Fv();return()=>{const s=e.default&&tg(e.default(),!0);if(!s||!s.length)return;const r=Q0(s),a=Yt(n),{mode:o}=a;if(i.isLeaving)return td(r);const l=xp(r);if(!l)return td(r);let c=eh(l,a,i,t,h=>c=h);l.type!==si&&pl(l,c);let u=t.subTree&&xp(t.subTree);if(u&&u.type!==si&&!Rr(u,l)&&J0(t).type!==si){let h=eh(u,a,i,t);if(pl(u,h),o==="out-in"&&l.type!==si)return i.isLeaving=!0,h.afterLeave=()=>{i.isLeaving=!1,t.job.flags&8||t.update(),delete h.afterLeave,u=void 0},td(r);o==="in-out"&&l.type!==si?h.delayLeave=(d,f,x)=>{const S=eg(i,u);S[String(u.key)]=u,d[xs]=()=>{f(),d[xs]=void 0,delete c.delayedLeave,u=void 0},c.delayedLeave=()=>{x(),delete c.delayedLeave,u=void 0}}:u=void 0}else u&&(u=void 0);return r}}};function Q0(n){let e=n[0];if(n.length>1){for(const t of n)if(t.type!==si){e=t;break}}return e}const kv=Ov;function eg(n,e){const{leavingVNodes:t}=n;let i=t.get(e.type);return i||(i=Object.create(null),t.set(e.type,i)),i}function eh(n,e,t,i,s){const{appear:r,mode:a,persisted:o=!1,onBeforeEnter:l,onEnter:c,onAfterEnter:u,onEnterCancelled:h,onBeforeLeave:d,onLeave:f,onAfterLeave:x,onLeaveCancelled:S,onBeforeAppear:m,onAppear:p,onAfterAppear:y,onAppearCancelled:R}=e,M=String(n.key),P=eg(t,n),T=(A,F)=>{A&&Bi(A,i,9,F)},I=(A,F)=>{const k=F[1];T(A,F),wt(A)?A.every(U=>U.length<=1)&&k():A.length<=1&&k()},v={mode:a,persisted:o,beforeEnter(A){let F=l;if(!t.isMounted)if(r)F=m||l;else return;A[xs]&&A[xs](!0);const k=P[M];k&&Rr(n,k)&&k.el[xs]&&k.el[xs](),T(F,[A])},enter(A){let F=c,k=u,U=h;if(!t.isMounted)if(r)F=p||c,k=y||u,U=R||h;else return;let Q=!1;const le=A[Yl]=$=>{Q||(Q=!0,$?T(U,[A]):T(k,[A]),v.delayedLeave&&v.delayedLeave(),A[Yl]=void 0)};F?I(F,[A,le]):le()},leave(A,F){const k=String(n.key);if(A[Yl]&&A[Yl](!0),t.isUnmounting)return F();T(d,[A]);let U=!1;const Q=A[xs]=le=>{U||(U=!0,F(),le?T(S,[A]):T(x,[A]),A[xs]=void 0,P[k]===n&&delete P[k])};P[k]=n,f?I(f,[A,Q]):Q()},clone(A){const F=eh(A,e,t,i,s);return s&&s(F),F}};return v}function td(n){if(xu(n))return n=tr(n),n.children=null,n}function xp(n){if(!xu(n))return Z0(n.type)&&n.children?Q0(n.children):n;if(n.component)return n.component.subTree;const{shapeFlag:e,children:t}=n;if(t){if(e&16)return t[0];if(e&32&&Pt(t.default))return t.default()}}function pl(n,e){n.shapeFlag&6&&n.component?(n.transition=e,pl(n.component.subTree,e)):n.shapeFlag&128?(n.ssContent.transition=e.clone(n.ssContent),n.ssFallback.transition=e.clone(n.ssFallback)):n.transition=e}function tg(n,e=!1,t){let i=[],s=0;for(let r=0;r<n.length;r++){let a=n[r];const o=t==null?a.key:String(t)+String(a.key!=null?a.key:r);a.type===Gn?(a.patchFlag&128&&s++,i=i.concat(tg(a.children,e,o))):(e||a.type!==si)&&i.push(o!=null?tr(a,{key:o}):a)}if(s>1)for(let r=0;r<i.length;r++)i[r].patchFlag=-2;return i}function zr(n,e){return Pt(n)?Bn({name:n.name},e,{setup:n}):n}function ng(n){n.ids=[n.ids[0]+n.ids[2]+++"-",0,0]}const Kc=new WeakMap;function al(n,e,t,i,s=!1){if(wt(n)){n.forEach((x,S)=>al(x,e&&(wt(e)?e[S]:e),t,i,s));return}if(ol(i)&&!s){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&al(n,e,t,i.component.subTree);return}const r=i.shapeFlag&4?Sf(i.component):i.el,a=s?null:r,{i:o,r:l}=n,c=e&&e.r,u=o.refs===ln?o.refs={}:o.refs,h=o.setupState,d=Yt(h),f=h===ln?b0:x=>Kt(d,x);if(c!=null&&c!==l){if(vp(e),bn(c))u[c]=null,f(c)&&(h[c]=null);else if($n(c)){c.value=null;const x=e;x.k&&(u[x.k]=null)}}if(Pt(l))Ml(l,o,12,[a,u]);else{const x=bn(l),S=$n(l);if(x||S){const m=()=>{if(n.f){const p=x?f(l)?h[l]:u[l]:l.value;if(s)wt(p)&&lf(p,r);else if(wt(p))p.includes(r)||p.push(r);else if(x)u[l]=[r],f(l)&&(h[l]=u[l]);else{const y=[r];l.value=y,n.k&&(u[n.k]=y)}}else x?(u[l]=a,f(l)&&(h[l]=a)):S&&(l.value=a,n.k&&(u[n.k]=a))};if(a){const p=()=>{m(),Kc.delete(n)};p.id=-1,Kc.set(n,p),mi(p,t)}else vp(n),m()}}}function vp(n){const e=Kc.get(n);e&&(e.flags|=8,Kc.delete(n))}pu().requestIdleCallback;pu().cancelIdleCallback;const ol=n=>!!n.type.__asyncLoader,xu=n=>n.type.__isKeepAlive;function Bv(n,e){ig(n,"a",e)}function Gv(n,e){ig(n,"da",e)}function ig(n,e,t=Kn){const i=n.__wdc||(n.__wdc=()=>{let s=t;for(;s;){if(s.isDeactivated)return;s=s.parent}return n()});if(vu(e,i,t),t){let s=t.parent;for(;s&&s.parent;)xu(s.parent.vnode)&&zv(i,e,t,s),s=s.parent}}function zv(n,e,t,i){const s=vu(e,n,i,!0);yu(()=>{lf(i[e],s)},t)}function vu(n,e,t=Kn,i=!1){if(t){const s=t[n]||(t[n]=[]),r=e.__weh||(e.__weh=(...a)=>{Ms();const o=Sl(t),l=Bi(e,t,n,a);return o(),Ss(),l});return i?s.unshift(r):s.push(r),r}}const Ts=n=>(e,t=Kn)=>{(!gl||n==="sp")&&vu(n,(...i)=>e(...i),t)},Hv=Ts("bm"),bu=Ts("m"),Vv=Ts("bu"),Wv=Ts("u"),sg=Ts("bum"),yu=Ts("um"),Xv=Ts("sp"),Yv=Ts("rtg"),qv=Ts("rtc");function Kv(n,e=Kn){vu("ec",n,e)}const $v="components",rg=Symbol.for("v-ndc");function Zv(n){return bn(n)?jv($v,n,!1)||n:n||rg}function jv(n,e,t=!0,i=!1){const s=Ui||Kn;if(s){const r=s.type;{const o=Bb(r,!1);if(o&&(o===e||o===Ci(e)||o===fu(Ci(e))))return r}const a=bp(s[n]||r[n],e)||bp(s.appContext[n],e);return!a&&i?r:a}}function bp(n,e){return n&&(n[e]||n[Ci(e)]||n[fu(Ci(e))])}function Fo(n,e,t,i){let s;const r=t,a=wt(n);if(a||bn(n)){const o=a&&Fa(n);let l=!1,c=!1;o&&(l=!Ai(n),c=er(n),n=mu(n)),s=new Array(n.length);for(let u=0,h=n.length;u<h;u++)s[u]=e(l?c?Wc(zn(n[u])):zn(n[u]):n[u],u,void 0,r)}else if(typeof n=="number"){s=new Array(n);for(let o=0;o<n;o++)s[o]=e(o+1,o,void 0,r)}else if(dn(n))if(n[Symbol.iterator])s=Array.from(n,(o,l)=>e(o,l,void 0,r));else{const o=Object.keys(n);s=new Array(o.length);for(let l=0,c=o.length;l<c;l++){const u=o[l];s[l]=e(n[u],u,l,r)}}else s=[];return s}const th=n=>n?Tg(n)?Sf(n):th(n.parent):null,ll=Bn(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>th(n.parent),$root:n=>th(n.root),$host:n=>n.ce,$emit:n=>n.emit,$options:n=>og(n),$forceUpdate:n=>n.f||(n.f=()=>{xf(n.update)}),$nextTick:n=>n.n||(n.n=Iv.bind(n.proxy)),$watch:n=>vb.bind(n)}),nd=(n,e)=>n!==ln&&!n.__isScriptSetup&&Kt(n,e),Jv={get({_:n},e){if(e==="__v_skip")return!0;const{ctx:t,setupState:i,data:s,props:r,accessCache:a,type:o,appContext:l}=n;let c;if(e[0]!=="$"){const f=a[e];if(f!==void 0)switch(f){case 1:return i[e];case 2:return s[e];case 4:return t[e];case 3:return r[e]}else{if(nd(i,e))return a[e]=1,i[e];if(s!==ln&&Kt(s,e))return a[e]=2,s[e];if((c=n.propsOptions[0])&&Kt(c,e))return a[e]=3,r[e];if(t!==ln&&Kt(t,e))return a[e]=4,t[e];nh&&(a[e]=0)}}const u=ll[e];let h,d;if(u)return e==="$attrs"&&qn(n.attrs,"get",""),u(n);if((h=o.__cssModules)&&(h=h[e]))return h;if(t!==ln&&Kt(t,e))return a[e]=4,t[e];if(d=l.config.globalProperties,Kt(d,e))return d[e]},set({_:n},e,t){const{data:i,setupState:s,ctx:r}=n;return nd(s,e)?(s[e]=t,!0):i!==ln&&Kt(i,e)?(i[e]=t,!0):Kt(n.props,e)||e[0]==="$"&&e.slice(1)in n?!1:(r[e]=t,!0)},has({_:{data:n,setupState:e,accessCache:t,ctx:i,appContext:s,propsOptions:r,type:a}},o){let l,c;return!!(t[o]||n!==ln&&o[0]!=="$"&&Kt(n,o)||nd(e,o)||(l=r[0])&&Kt(l,o)||Kt(i,o)||Kt(ll,o)||Kt(s.config.globalProperties,o)||(c=a.__cssModules)&&c[o])},defineProperty(n,e,t){return t.get!=null?n._.accessCache[e]=0:Kt(t,"value")&&this.set(n,e,t.value,null),Reflect.defineProperty(n,e,t)}};function yp(n){return wt(n)?n.reduce((e,t)=>(e[t]=null,e),{}):n}let nh=!0;function Qv(n){const e=og(n),t=n.proxy,i=n.ctx;nh=!1,e.beforeCreate&&Mp(e.beforeCreate,n,"bc");const{data:s,computed:r,methods:a,watch:o,provide:l,inject:c,created:u,beforeMount:h,mounted:d,beforeUpdate:f,updated:x,activated:S,deactivated:m,beforeDestroy:p,beforeUnmount:y,destroyed:R,unmounted:M,render:P,renderTracked:T,renderTriggered:I,errorCaptured:v,serverPrefetch:A,expose:F,inheritAttrs:k,components:U,directives:Q,filters:le}=e;if(c&&eb(c,i,null),a)for(const Z in a){const oe=a[Z];Pt(oe)&&(i[Z]=oe.bind(t))}if(s){const Z=s.call(t,t);dn(Z)&&(n.data=mf(Z))}if(nh=!0,r)for(const Z in r){const oe=r[Z],Ae=Pt(oe)?oe.bind(t,t):Pt(oe.get)?oe.get.bind(t,t):ji,Ge=!Pt(oe)&&Pt(oe.set)?oe.set.bind(t):ji,Fe=Vs({get:Ae,set:Ge});Object.defineProperty(i,Z,{enumerable:!0,configurable:!0,get:()=>Fe.value,set:j=>Fe.value=j})}if(o)for(const Z in o)ag(o[Z],i,t,Z);if(l){const Z=Pt(l)?l.call(t):l;Reflect.ownKeys(Z).forEach(oe=>{ab(oe,Z[oe])})}u&&Mp(u,n,"c");function re(Z,oe){wt(oe)?oe.forEach(Ae=>Z(Ae.bind(t))):oe&&Z(oe.bind(t))}if(re(Hv,h),re(bu,d),re(Vv,f),re(Wv,x),re(Bv,S),re(Gv,m),re(Kv,v),re(qv,T),re(Yv,I),re(sg,y),re(yu,M),re(Xv,A),wt(F))if(F.length){const Z=n.exposed||(n.exposed={});F.forEach(oe=>{Object.defineProperty(Z,oe,{get:()=>t[oe],set:Ae=>t[oe]=Ae,enumerable:!0})})}else n.exposed||(n.exposed={});P&&n.render===ji&&(n.render=P),k!=null&&(n.inheritAttrs=k),U&&(n.components=U),Q&&(n.directives=Q),A&&ng(n)}function eb(n,e,t=ji){wt(n)&&(n=ih(n));for(const i in n){const s=n[i];let r;dn(s)?"default"in s?r=Cc(s.from||i,s.default,!0):r=Cc(s.from||i):r=Cc(s),$n(r)?Object.defineProperty(e,i,{enumerable:!0,configurable:!0,get:()=>r.value,set:a=>r.value=a}):e[i]=r}}function Mp(n,e,t){Bi(wt(n)?n.map(i=>i.bind(e.proxy)):n.bind(e.proxy),e,t)}function ag(n,e,t,i){let s=i.includes(".")?bg(t,i):()=>t[i];if(bn(n)){const r=e[n];Pt(r)&&Rc(s,r)}else if(Pt(n))Rc(s,n.bind(t));else if(dn(n))if(wt(n))n.forEach(r=>ag(r,e,t,i));else{const r=Pt(n.handler)?n.handler.bind(t):e[n.handler];Pt(r)&&Rc(s,r,n)}}function og(n){const e=n.type,{mixins:t,extends:i}=e,{mixins:s,optionsCache:r,config:{optionMergeStrategies:a}}=n.appContext,o=r.get(e);let l;return o?l=o:!s.length&&!t&&!i?l=e:(l={},s.length&&s.forEach(c=>$c(l,c,a,!0)),$c(l,e,a)),dn(e)&&r.set(e,l),l}function $c(n,e,t,i=!1){const{mixins:s,extends:r}=e;r&&$c(n,r,t,!0),s&&s.forEach(a=>$c(n,a,t,!0));for(const a in e)if(!(i&&a==="expose")){const o=tb[a]||t&&t[a];n[a]=o?o(n[a],e[a]):e[a]}return n}const tb={data:Sp,props:wp,emits:wp,methods:el,computed:el,beforeCreate:ti,created:ti,beforeMount:ti,mounted:ti,beforeUpdate:ti,updated:ti,beforeDestroy:ti,beforeUnmount:ti,destroyed:ti,unmounted:ti,activated:ti,deactivated:ti,errorCaptured:ti,serverPrefetch:ti,components:el,directives:el,watch:ib,provide:Sp,inject:nb};function Sp(n,e){return e?n?function(){return Bn(Pt(n)?n.call(this,this):n,Pt(e)?e.call(this,this):e)}:e:n}function nb(n,e){return el(ih(n),ih(e))}function ih(n){if(wt(n)){const e={};for(let t=0;t<n.length;t++)e[n[t]]=n[t];return e}return n}function ti(n,e){return n?[...new Set([].concat(n,e))]:e}function el(n,e){return n?Bn(Object.create(null),n,e):e}function wp(n,e){return n?wt(n)&&wt(e)?[...new Set([...n,...e])]:Bn(Object.create(null),yp(n),yp(e??{})):e}function ib(n,e){if(!n)return e;if(!e)return n;const t=Bn(Object.create(null),n);for(const i in e)t[i]=ti(n[i],e[i]);return t}function lg(){return{app:null,config:{isNativeTag:b0,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let sb=0;function rb(n,e){return function(i,s=null){Pt(i)||(i=Bn({},i)),s!=null&&!dn(s)&&(s=null);const r=lg(),a=new WeakSet,o=[];let l=!1;const c=r.app={_uid:sb++,_component:i,_props:s,_container:null,_context:r,_instance:null,version:zb,get config(){return r.config},set config(u){},use(u,...h){return a.has(u)||(u&&Pt(u.install)?(a.add(u),u.install(c,...h)):Pt(u)&&(a.add(u),u(c,...h))),c},mixin(u){return r.mixins.includes(u)||r.mixins.push(u),c},component(u,h){return h?(r.components[u]=h,c):r.components[u]},directive(u,h){return h?(r.directives[u]=h,c):r.directives[u]},mount(u,h,d){if(!l){const f=c._ceVNode||kt(i,s);return f.appContext=r,d===!0?d="svg":d===!1&&(d=void 0),n(f,u,d),l=!0,c._container=u,u.__vue_app__=c,Sf(f.component)}},onUnmount(u){o.push(u)},unmount(){l&&(Bi(o,c._instance,16),n(null,c._container),delete c._container.__vue_app__)},provide(u,h){return r.provides[u]=h,c},runWithContext(u){const h=ka;ka=c;try{return u()}finally{ka=h}}};return c}}let ka=null;function ab(n,e){if(Kn){let t=Kn.provides;const i=Kn.parent&&Kn.parent.provides;i===t&&(t=Kn.provides=Object.create(i)),t[n]=e}}function Cc(n,e,t=!1){const i=Eg();if(i||ka){let s=ka?ka._context.provides:i?i.parent==null||i.ce?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(s&&n in s)return s[n];if(arguments.length>1)return t&&Pt(e)?e.call(i&&i.proxy):e}}const cg={},ug=()=>Object.create(cg),dg=n=>Object.getPrototypeOf(n)===cg;function ob(n,e,t,i=!1){const s={},r=ug();n.propsDefaults=Object.create(null),hg(n,e,s,r);for(const a in n.propsOptions[0])a in s||(s[a]=void 0);t?n.props=i?s:Mv(s):n.type.props?n.props=s:n.props=r,n.attrs=r}function lb(n,e,t,i){const{props:s,attrs:r,vnode:{patchFlag:a}}=n,o=Yt(s),[l]=n.propsOptions;let c=!1;if((i||a>0)&&!(a&16)){if(a&8){const u=n.vnode.dynamicProps;for(let h=0;h<u.length;h++){let d=u[h];if(Mu(n.emitsOptions,d))continue;const f=e[d];if(l)if(Kt(r,d))f!==r[d]&&(r[d]=f,c=!0);else{const x=Ci(d);s[x]=sh(l,o,x,f,n,!1)}else f!==r[d]&&(r[d]=f,c=!0)}}}else{hg(n,e,s,r)&&(c=!0);let u;for(const h in o)(!e||!Kt(e,h)&&((u=Gr(h))===h||!Kt(e,u)))&&(l?t&&(t[h]!==void 0||t[u]!==void 0)&&(s[h]=sh(l,o,h,void 0,n,!0)):delete s[h]);if(r!==o)for(const h in r)(!e||!Kt(e,h))&&(delete r[h],c=!0)}c&&vs(n.attrs,"set","")}function hg(n,e,t,i){const[s,r]=n.propsOptions;let a=!1,o;if(e)for(let l in e){if(il(l))continue;const c=e[l];let u;s&&Kt(s,u=Ci(l))?!r||!r.includes(u)?t[u]=c:(o||(o={}))[u]=c:Mu(n.emitsOptions,l)||(!(l in i)||c!==i[l])&&(i[l]=c,a=!0)}if(r){const l=Yt(t),c=o||ln;for(let u=0;u<r.length;u++){const h=r[u];t[h]=sh(s,l,h,c[h],n,!Kt(c,h))}}return a}function sh(n,e,t,i,s,r){const a=n[t];if(a!=null){const o=Kt(a,"default");if(o&&i===void 0){const l=a.default;if(a.type!==Function&&!a.skipFactory&&Pt(l)){const{propsDefaults:c}=s;if(t in c)i=c[t];else{const u=Sl(s);i=c[t]=l.call(null,e),u()}}else i=l;s.ce&&s.ce._setProp(t,i)}a[0]&&(r&&!o?i=!1:a[1]&&(i===""||i===Gr(t))&&(i=!0))}return i}const cb=new WeakMap;function fg(n,e,t=!1){const i=t?cb:e.propsCache,s=i.get(n);if(s)return s;const r=n.props,a={},o=[];let l=!1;if(!Pt(n)){const u=h=>{l=!0;const[d,f]=fg(h,e,!0);Bn(a,d),f&&o.push(...f)};!t&&e.mixins.length&&e.mixins.forEach(u),n.extends&&u(n.extends),n.mixins&&n.mixins.forEach(u)}if(!r&&!l)return dn(n)&&i.set(n,Na),Na;if(wt(r))for(let u=0;u<r.length;u++){const h=Ci(r[u]);Ep(h)&&(a[h]=ln)}else if(r)for(const u in r){const h=Ci(u);if(Ep(h)){const d=r[u],f=a[h]=wt(d)||Pt(d)?{type:d}:Bn({},d),x=f.type;let S=!1,m=!0;if(wt(x))for(let p=0;p<x.length;++p){const y=x[p],R=Pt(y)&&y.name;if(R==="Boolean"){S=!0;break}else R==="String"&&(m=!1)}else S=Pt(x)&&x.name==="Boolean";f[0]=S,f[1]=m,(S||Kt(f,"default"))&&o.push(h)}}const c=[a,o];return dn(n)&&i.set(n,c),c}function Ep(n){return n[0]!=="$"&&!il(n)}const vf=n=>n==="_"||n==="_ctx"||n==="$stable",bf=n=>wt(n)?n.map(Yi):[Yi(n)],ub=(n,e,t)=>{if(e._n)return e;const i=_u((...s)=>bf(e(...s)),t);return i._c=!1,i},pg=(n,e,t)=>{const i=n._ctx;for(const s in n){if(vf(s))continue;const r=n[s];if(Pt(r))e[s]=ub(s,r,i);else if(r!=null){const a=bf(r);e[s]=()=>a}}},mg=(n,e)=>{const t=bf(e);n.slots.default=()=>t},gg=(n,e,t)=>{for(const i in e)(t||!vf(i))&&(n[i]=e[i])},db=(n,e,t)=>{const i=n.slots=ug();if(n.vnode.shapeFlag&32){const s=e._;s?(gg(i,e,t),t&&E0(i,"_",s,!0)):pg(e,i)}else e&&mg(n,e)},hb=(n,e,t)=>{const{vnode:i,slots:s}=n;let r=!0,a=ln;if(i.shapeFlag&32){const o=e._;o?t&&o===1?r=!1:gg(s,e,t):(r=!e.$stable,pg(e,s)),a=e}else e&&(mg(n,e),a={default:1});if(r)for(const o in s)!vf(o)&&a[o]==null&&delete s[o]},mi=Ab;function fb(n){return pb(n)}function pb(n,e){const t=pu();t.__VUE__=!0;const{insert:i,remove:s,patchProp:r,createElement:a,createText:o,createComment:l,setText:c,setElementText:u,parentNode:h,nextSibling:d,setScopeId:f=ji,insertStaticContent:x}=n,S=(O,B,ne,he=null,ue=null,pe=null,De=void 0,Pe=null,Re=!!B.dynamicChildren)=>{if(O===B)return;O&&!Rr(O,B)&&(he=Oe(O),j(O,ue,pe,!0),O=null),B.patchFlag===-2&&(Re=!1,B.dynamicChildren=null);const{type:ve,ref:qe,shapeFlag:N}=B;switch(ve){case Su:m(O,B,ne,he);break;case si:p(O,B,ne,he);break;case sd:O==null&&y(B,ne,he,De);break;case Gn:U(O,B,ne,he,ue,pe,De,Pe,Re);break;default:N&1?P(O,B,ne,he,ue,pe,De,Pe,Re):N&6?Q(O,B,ne,he,ue,pe,De,Pe,Re):(N&64||N&128)&&ve.process(O,B,ne,he,ue,pe,De,Pe,Re,mt)}qe!=null&&ue?al(qe,O&&O.ref,pe,B||O,!B):qe==null&&O&&O.ref!=null&&al(O.ref,null,pe,O,!0)},m=(O,B,ne,he)=>{if(O==null)i(B.el=o(B.children),ne,he);else{const ue=B.el=O.el;B.children!==O.children&&c(ue,B.children)}},p=(O,B,ne,he)=>{O==null?i(B.el=l(B.children||""),ne,he):B.el=O.el},y=(O,B,ne,he)=>{[O.el,O.anchor]=x(O.children,B,ne,he,O.el,O.anchor)},R=({el:O,anchor:B},ne,he)=>{let ue;for(;O&&O!==B;)ue=d(O),i(O,ne,he),O=ue;i(B,ne,he)},M=({el:O,anchor:B})=>{let ne;for(;O&&O!==B;)ne=d(O),s(O),O=ne;s(B)},P=(O,B,ne,he,ue,pe,De,Pe,Re)=>{B.type==="svg"?De="svg":B.type==="math"&&(De="mathml"),O==null?T(B,ne,he,ue,pe,De,Pe,Re):A(O,B,ue,pe,De,Pe,Re)},T=(O,B,ne,he,ue,pe,De,Pe)=>{let Re,ve;const{props:qe,shapeFlag:N,transition:je,dirs:We}=O;if(Re=O.el=a(O.type,pe,qe&&qe.is,qe),N&8?u(Re,O.children):N&16&&v(O.children,Re,null,he,ue,id(O,pe),De,Pe),We&&br(O,null,he,"created"),I(Re,O,O.scopeId,De,he),qe){for(const _ in qe)_!=="value"&&!il(_)&&r(Re,_,null,qe[_],pe,he);"value"in qe&&r(Re,"value",null,qe.value,pe),(ve=qe.onVnodeBeforeMount)&&Hi(ve,he,O)}We&&br(O,null,he,"beforeMount");const C=mb(ue,je);C&&je.beforeEnter(Re),i(Re,B,ne),((ve=qe&&qe.onVnodeMounted)||C||We)&&mi(()=>{ve&&Hi(ve,he,O),C&&je.enter(Re),We&&br(O,null,he,"mounted")},ue)},I=(O,B,ne,he,ue)=>{if(ne&&f(O,ne),he)for(let pe=0;pe<he.length;pe++)f(O,he[pe]);if(ue){let pe=ue.subTree;if(B===pe||Mg(pe.type)&&(pe.ssContent===B||pe.ssFallback===B)){const De=ue.vnode;I(O,De,De.scopeId,De.slotScopeIds,ue.parent)}}},v=(O,B,ne,he,ue,pe,De,Pe,Re=0)=>{for(let ve=Re;ve<O.length;ve++){const qe=O[ve]=Pe?Ys(O[ve]):Yi(O[ve]);S(null,qe,B,ne,he,ue,pe,De,Pe)}},A=(O,B,ne,he,ue,pe,De)=>{const Pe=B.el=O.el;let{patchFlag:Re,dynamicChildren:ve,dirs:qe}=B;Re|=O.patchFlag&16;const N=O.props||ln,je=B.props||ln;let We;if(ne&&yr(ne,!1),(We=je.onVnodeBeforeUpdate)&&Hi(We,ne,B,O),qe&&br(B,O,ne,"beforeUpdate"),ne&&yr(ne,!0),(N.innerHTML&&je.innerHTML==null||N.textContent&&je.textContent==null)&&u(Pe,""),ve?F(O.dynamicChildren,ve,Pe,ne,he,id(B,ue),pe):De||oe(O,B,Pe,null,ne,he,id(B,ue),pe,!1),Re>0){if(Re&16)k(Pe,N,je,ne,ue);else if(Re&2&&N.class!==je.class&&r(Pe,"class",null,je.class,ue),Re&4&&r(Pe,"style",N.style,je.style,ue),Re&8){const C=B.dynamicProps;for(let _=0;_<C.length;_++){const V=C[_],J=N[V],ae=je[V];(ae!==J||V==="value")&&r(Pe,V,J,ae,ue,ne)}}Re&1&&O.children!==B.children&&u(Pe,B.children)}else!De&&ve==null&&k(Pe,N,je,ne,ue);((We=je.onVnodeUpdated)||qe)&&mi(()=>{We&&Hi(We,ne,B,O),qe&&br(B,O,ne,"updated")},he)},F=(O,B,ne,he,ue,pe,De)=>{for(let Pe=0;Pe<B.length;Pe++){const Re=O[Pe],ve=B[Pe],qe=Re.el&&(Re.type===Gn||!Rr(Re,ve)||Re.shapeFlag&198)?h(Re.el):ne;S(Re,ve,qe,null,he,ue,pe,De,!0)}},k=(O,B,ne,he,ue)=>{if(B!==ne){if(B!==ln)for(const pe in B)!il(pe)&&!(pe in ne)&&r(O,pe,B[pe],null,ue,he);for(const pe in ne){if(il(pe))continue;const De=ne[pe],Pe=B[pe];De!==Pe&&pe!=="value"&&r(O,pe,Pe,De,ue,he)}"value"in ne&&r(O,"value",B.value,ne.value,ue)}},U=(O,B,ne,he,ue,pe,De,Pe,Re)=>{const ve=B.el=O?O.el:o(""),qe=B.anchor=O?O.anchor:o("");let{patchFlag:N,dynamicChildren:je,slotScopeIds:We}=B;We&&(Pe=Pe?Pe.concat(We):We),O==null?(i(ve,ne,he),i(qe,ne,he),v(B.children||[],ne,qe,ue,pe,De,Pe,Re)):N>0&&N&64&&je&&O.dynamicChildren?(F(O.dynamicChildren,je,ne,ue,pe,De,Pe),(B.key!=null||ue&&B===ue.subTree)&&_g(O,B,!0)):oe(O,B,ne,qe,ue,pe,De,Pe,Re)},Q=(O,B,ne,he,ue,pe,De,Pe,Re)=>{B.slotScopeIds=Pe,O==null?B.shapeFlag&512?ue.ctx.activate(B,ne,he,De,Re):le(B,ne,he,ue,pe,De,Re):$(O,B,Re)},le=(O,B,ne,he,ue,pe,De)=>{const Pe=O.component=Nb(O,he,ue);if(xu(O)&&(Pe.ctx.renderer=mt),Ub(Pe,!1,De),Pe.asyncDep){if(ue&&ue.registerDep(Pe,re,De),!O.el){const Re=Pe.subTree=kt(si);p(null,Re,B,ne),O.placeholder=Re.el}}else re(Pe,O,B,ne,ue,pe,De)},$=(O,B,ne)=>{const he=B.component=O.component;if(Eb(O,B,ne))if(he.asyncDep&&!he.asyncResolved){Z(he,B,ne);return}else he.next=B,he.update();else B.el=O.el,he.vnode=B},re=(O,B,ne,he,ue,pe,De)=>{const Pe=()=>{if(O.isMounted){let{next:N,bu:je,u:We,parent:C,vnode:_}=O;{const Ne=xg(O);if(Ne){N&&(N.el=_.el,Z(O,N,De)),Ne.asyncDep.then(()=>{O.isUnmounted||Pe()});return}}let V=N,J;yr(O,!1),N?(N.el=_.el,Z(O,N,De)):N=_,je&&Zu(je),(J=N.props&&N.props.onVnodeBeforeUpdate)&&Hi(J,C,N,_),yr(O,!0);const ae=Ap(O),Ee=O.subTree;O.subTree=ae,S(Ee,ae,h(Ee.el),Oe(Ee),O,ue,pe),N.el=ae.el,V===null&&Tb(O,ae.el),We&&mi(We,ue),(J=N.props&&N.props.onVnodeUpdated)&&mi(()=>Hi(J,C,N,_),ue)}else{let N;const{el:je,props:We}=B,{bm:C,m:_,parent:V,root:J,type:ae}=O,Ee=ol(B);yr(O,!1),C&&Zu(C),!Ee&&(N=We&&We.onVnodeBeforeMount)&&Hi(N,V,B),yr(O,!0);{J.ce&&J.ce._def.shadowRoot!==!1&&J.ce._injectChildStyle(ae);const Ne=O.subTree=Ap(O);S(null,Ne,ne,he,O,ue,pe),B.el=Ne.el}if(_&&mi(_,ue),!Ee&&(N=We&&We.onVnodeMounted)){const Ne=B;mi(()=>Hi(N,V,Ne),ue)}(B.shapeFlag&256||V&&ol(V.vnode)&&V.vnode.shapeFlag&256)&&O.a&&mi(O.a,ue),O.isMounted=!0,B=ne=he=null}};O.scope.on();const Re=O.effect=new R0(Pe);O.scope.off();const ve=O.update=Re.run.bind(Re),qe=O.job=Re.runIfDirty.bind(Re);qe.i=O,qe.id=O.uid,Re.scheduler=()=>xf(qe),yr(O,!0),ve()},Z=(O,B,ne)=>{B.component=O;const he=O.vnode.props;O.vnode=B,O.next=null,lb(O,B.props,he,ne),hb(O,B.children,ne),Ms(),_p(O),Ss()},oe=(O,B,ne,he,ue,pe,De,Pe,Re=!1)=>{const ve=O&&O.children,qe=O?O.shapeFlag:0,N=B.children,{patchFlag:je,shapeFlag:We}=B;if(je>0){if(je&128){Ge(ve,N,ne,he,ue,pe,De,Pe,Re);return}else if(je&256){Ae(ve,N,ne,he,ue,pe,De,Pe,Re);return}}We&8?(qe&16&&fe(ve,ue,pe),N!==ve&&u(ne,N)):qe&16?We&16?Ge(ve,N,ne,he,ue,pe,De,Pe,Re):fe(ve,ue,pe,!0):(qe&8&&u(ne,""),We&16&&v(N,ne,he,ue,pe,De,Pe,Re))},Ae=(O,B,ne,he,ue,pe,De,Pe,Re)=>{O=O||Na,B=B||Na;const ve=O.length,qe=B.length,N=Math.min(ve,qe);let je;for(je=0;je<N;je++){const We=B[je]=Re?Ys(B[je]):Yi(B[je]);S(O[je],We,ne,null,ue,pe,De,Pe,Re)}ve>qe?fe(O,ue,pe,!0,!1,N):v(B,ne,he,ue,pe,De,Pe,Re,N)},Ge=(O,B,ne,he,ue,pe,De,Pe,Re)=>{let ve=0;const qe=B.length;let N=O.length-1,je=qe-1;for(;ve<=N&&ve<=je;){const We=O[ve],C=B[ve]=Re?Ys(B[ve]):Yi(B[ve]);if(Rr(We,C))S(We,C,ne,null,ue,pe,De,Pe,Re);else break;ve++}for(;ve<=N&&ve<=je;){const We=O[N],C=B[je]=Re?Ys(B[je]):Yi(B[je]);if(Rr(We,C))S(We,C,ne,null,ue,pe,De,Pe,Re);else break;N--,je--}if(ve>N){if(ve<=je){const We=je+1,C=We<qe?B[We].el:he;for(;ve<=je;)S(null,B[ve]=Re?Ys(B[ve]):Yi(B[ve]),ne,C,ue,pe,De,Pe,Re),ve++}}else if(ve>je)for(;ve<=N;)j(O[ve],ue,pe,!0),ve++;else{const We=ve,C=ve,_=new Map;for(ve=C;ve<=je;ve++){const Le=B[ve]=Re?Ys(B[ve]):Yi(B[ve]);Le.key!=null&&_.set(Le.key,ve)}let V,J=0;const ae=je-C+1;let Ee=!1,Ne=0;const ce=new Array(ae);for(ve=0;ve<ae;ve++)ce[ve]=0;for(ve=We;ve<=N;ve++){const Le=O[ve];if(J>=ae){j(Le,ue,pe,!0);continue}let Je;if(Le.key!=null)Je=_.get(Le.key);else for(V=C;V<=je;V++)if(ce[V-C]===0&&Rr(Le,B[V])){Je=V;break}Je===void 0?j(Le,ue,pe,!0):(ce[Je-C]=ve+1,Je>=Ne?Ne=Je:Ee=!0,S(Le,B[Je],ne,null,ue,pe,De,Pe,Re),J++)}const me=Ee?gb(ce):Na;for(V=me.length-1,ve=ae-1;ve>=0;ve--){const Le=C+ve,Je=B[Le],ze=B[Le+1],ke=Le+1<qe?ze.el||ze.placeholder:he;ce[ve]===0?S(null,Je,ne,ke,ue,pe,De,Pe,Re):Ee&&(V<0||ve!==me[V]?Fe(Je,ne,ke,2):V--)}}},Fe=(O,B,ne,he,ue=null)=>{const{el:pe,type:De,transition:Pe,children:Re,shapeFlag:ve}=O;if(ve&6){Fe(O.component.subTree,B,ne,he);return}if(ve&128){O.suspense.move(B,ne,he);return}if(ve&64){De.move(O,B,ne,mt);return}if(De===Gn){i(pe,B,ne);for(let N=0;N<Re.length;N++)Fe(Re[N],B,ne,he);i(O.anchor,B,ne);return}if(De===sd){R(O,B,ne);return}if(he!==2&&ve&1&&Pe)if(he===0)Pe.beforeEnter(pe),i(pe,B,ne),mi(()=>Pe.enter(pe),ue);else{const{leave:N,delayLeave:je,afterLeave:We}=Pe,C=()=>{O.ctx.isUnmounted?s(pe):i(pe,B,ne)},_=()=>{pe._isLeaving&&pe[xs](!0),N(pe,()=>{C(),We&&We()})};je?je(pe,C,_):_()}else i(pe,B,ne)},j=(O,B,ne,he=!1,ue=!1)=>{const{type:pe,props:De,ref:Pe,children:Re,dynamicChildren:ve,shapeFlag:qe,patchFlag:N,dirs:je,cacheIndex:We}=O;if(N===-2&&(ue=!1),Pe!=null&&(Ms(),al(Pe,null,ne,O,!0),Ss()),We!=null&&(B.renderCache[We]=void 0),qe&256){B.ctx.deactivate(O);return}const C=qe&1&&je,_=!ol(O);let V;if(_&&(V=De&&De.onVnodeBeforeUnmount)&&Hi(V,B,O),qe&6)At(O.component,ne,he);else{if(qe&128){O.suspense.unmount(ne,he);return}C&&br(O,null,B,"beforeUnmount"),qe&64?O.type.remove(O,B,ne,mt,he):ve&&!ve.hasOnce&&(pe!==Gn||N>0&&N&64)?fe(ve,B,ne,!1,!0):(pe===Gn&&N&384||!ue&&qe&16)&&fe(Re,B,ne),he&&xe(O)}(_&&(V=De&&De.onVnodeUnmounted)||C)&&mi(()=>{V&&Hi(V,B,O),C&&br(O,null,B,"unmounted")},ne)},xe=O=>{const{type:B,el:ne,anchor:he,transition:ue}=O;if(B===Gn){pt(ne,he);return}if(B===sd){M(O);return}const pe=()=>{s(ne),ue&&!ue.persisted&&ue.afterLeave&&ue.afterLeave()};if(O.shapeFlag&1&&ue&&!ue.persisted){const{leave:De,delayLeave:Pe}=ue,Re=()=>De(ne,pe);Pe?Pe(O.el,pe,Re):Re()}else pe()},pt=(O,B)=>{let ne;for(;O!==B;)ne=d(O),s(O),O=ne;s(B)},At=(O,B,ne)=>{const{bum:he,scope:ue,job:pe,subTree:De,um:Pe,m:Re,a:ve}=O;Tp(Re),Tp(ve),he&&Zu(he),ue.stop(),pe&&(pe.flags|=8,j(De,O,B,ne)),Pe&&mi(Pe,B),mi(()=>{O.isUnmounted=!0},B)},fe=(O,B,ne,he=!1,ue=!1,pe=0)=>{for(let De=pe;De<O.length;De++)j(O[De],B,ne,he,ue)},Oe=O=>{if(O.shapeFlag&6)return Oe(O.component.subTree);if(O.shapeFlag&128)return O.suspense.next();const B=d(O.anchor||O.el),ne=B&&B[Uv];return ne?d(ne):B};let Ce=!1;const ft=(O,B,ne)=>{O==null?B._vnode&&j(B._vnode,null,null,!0):S(B._vnode||null,O,B,null,null,null,ne),B._vnode=O,Ce||(Ce=!0,_p(),q0(),Ce=!1)},mt={p:S,um:j,m:Fe,r:xe,mt:le,mc:v,pc:oe,pbc:F,n:Oe,o:n};return{render:ft,hydrate:void 0,createApp:rb(ft)}}function id({type:n,props:e},t){return t==="svg"&&n==="foreignObject"||t==="mathml"&&n==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:t}function yr({effect:n,job:e},t){t?(n.flags|=32,e.flags|=4):(n.flags&=-33,e.flags&=-5)}function mb(n,e){return(!n||n&&!n.pendingBranch)&&e&&!e.persisted}function _g(n,e,t=!1){const i=n.children,s=e.children;if(wt(i)&&wt(s))for(let r=0;r<i.length;r++){const a=i[r];let o=s[r];o.shapeFlag&1&&!o.dynamicChildren&&((o.patchFlag<=0||o.patchFlag===32)&&(o=s[r]=Ys(s[r]),o.el=a.el),!t&&o.patchFlag!==-2&&_g(a,o)),o.type===Su&&o.patchFlag!==-1&&(o.el=a.el),o.type===si&&!o.el&&(o.el=a.el)}}function gb(n){const e=n.slice(),t=[0];let i,s,r,a,o;const l=n.length;for(i=0;i<l;i++){const c=n[i];if(c!==0){if(s=t[t.length-1],n[s]<c){e[i]=s,t.push(i);continue}for(r=0,a=t.length-1;r<a;)o=r+a>>1,n[t[o]]<c?r=o+1:a=o;c<n[t[r]]&&(r>0&&(e[i]=t[r-1]),t[r]=i)}}for(r=t.length,a=t[r-1];r-- >0;)t[r]=a,a=e[a];return t}function xg(n){const e=n.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:xg(e)}function Tp(n){if(n)for(let e=0;e<n.length;e++)n[e].flags|=8}const _b=Symbol.for("v-scx"),xb=()=>Cc(_b);function Rc(n,e,t){return vg(n,e,t)}function vg(n,e,t=ln){const{immediate:i,deep:s,flush:r,once:a}=t,o=Bn({},t),l=e&&i||!e&&r!=="post";let c;if(gl){if(r==="sync"){const f=xb();c=f.__watcherHandles||(f.__watcherHandles=[])}else if(!l){const f=()=>{};return f.stop=ji,f.resume=ji,f.pause=ji,f}}const u=Kn;o.call=(f,x,S)=>Bi(f,u,x,S);let h=!1;r==="post"?o.scheduler=f=>{mi(f,u&&u.suspense)}:r!=="sync"&&(h=!0,o.scheduler=(f,x)=>{x?f():xf(f)}),o.augmentJob=f=>{e&&(f.flags|=4),h&&(f.flags|=2,u&&(f.id=u.uid,f.i=u))};const d=Pv(n,e,o);return gl&&(c?c.push(d):l&&d()),d}function vb(n,e,t){const i=this.proxy,s=bn(n)?n.includes(".")?bg(i,n):()=>i[n]:n.bind(i,i);let r;Pt(e)?r=e:(r=e.handler,t=e);const a=Sl(this),o=vg(s,r.bind(i),t);return a(),o}function bg(n,e){const t=e.split(".");return()=>{let i=n;for(let s=0;s<t.length&&i;s++)i=i[t[s]];return i}}const bb=(n,e)=>e==="modelValue"||e==="model-value"?n.modelModifiers:n[`${e}Modifiers`]||n[`${Ci(e)}Modifiers`]||n[`${Gr(e)}Modifiers`];function yb(n,e,...t){if(n.isUnmounted)return;const i=n.vnode.props||ln;let s=t;const r=e.startsWith("update:"),a=r&&bb(i,e.slice(7));a&&(a.trim&&(s=t.map(u=>bn(u)?u.trim():u)),a.number&&(s=t.map(Kx)));let o,l=i[o=$u(e)]||i[o=$u(Ci(e))];!l&&r&&(l=i[o=$u(Gr(e))]),l&&Bi(l,n,6,s);const c=i[o+"Once"];if(c){if(!n.emitted)n.emitted={};else if(n.emitted[o])return;n.emitted[o]=!0,Bi(c,n,6,s)}}const Mb=new WeakMap;function yg(n,e,t=!1){const i=t?Mb:e.emitsCache,s=i.get(n);if(s!==void 0)return s;const r=n.emits;let a={},o=!1;if(!Pt(n)){const l=c=>{const u=yg(c,e,!0);u&&(o=!0,Bn(a,u))};!t&&e.mixins.length&&e.mixins.forEach(l),n.extends&&l(n.extends),n.mixins&&n.mixins.forEach(l)}return!r&&!o?(dn(n)&&i.set(n,null),null):(wt(r)?r.forEach(l=>a[l]=null):Bn(a,r),dn(n)&&i.set(n,a),a)}function Mu(n,e){return!n||!uu(e)?!1:(e=e.slice(2).replace(/Once$/,""),Kt(n,e[0].toLowerCase()+e.slice(1))||Kt(n,Gr(e))||Kt(n,e))}function Ap(n){const{type:e,vnode:t,proxy:i,withProxy:s,propsOptions:[r],slots:a,attrs:o,emit:l,render:c,renderCache:u,props:h,data:d,setupState:f,ctx:x,inheritAttrs:S}=n,m=qc(n);let p,y;try{if(t.shapeFlag&4){const M=s||i,P=M;p=Yi(c.call(P,M,u,h,f,d,x)),y=o}else{const M=e;p=Yi(M.length>1?M(h,{attrs:o,slots:a,emit:l}):M(h,null)),y=e.props?o:Sb(o)}}catch(M){cl.length=0,gu(M,n,1),p=kt(si)}let R=p;if(y&&S!==!1){const M=Object.keys(y),{shapeFlag:P}=R;M.length&&P&7&&(r&&M.some(of)&&(y=wb(y,r)),R=tr(R,y,!1,!0))}return t.dirs&&(R=tr(R,null,!1,!0),R.dirs=R.dirs?R.dirs.concat(t.dirs):t.dirs),t.transition&&pl(R,t.transition),p=R,qc(m),p}const Sb=n=>{let e;for(const t in n)(t==="class"||t==="style"||uu(t))&&((e||(e={}))[t]=n[t]);return e},wb=(n,e)=>{const t={};for(const i in n)(!of(i)||!(i.slice(9)in e))&&(t[i]=n[i]);return t};function Eb(n,e,t){const{props:i,children:s,component:r}=n,{props:a,children:o,patchFlag:l}=e,c=r.emitsOptions;if(e.dirs||e.transition)return!0;if(t&&l>=0){if(l&1024)return!0;if(l&16)return i?Cp(i,a,c):!!a;if(l&8){const u=e.dynamicProps;for(let h=0;h<u.length;h++){const d=u[h];if(a[d]!==i[d]&&!Mu(c,d))return!0}}}else return(s||o)&&(!o||!o.$stable)?!0:i===a?!1:i?a?Cp(i,a,c):!0:!!a;return!1}function Cp(n,e,t){const i=Object.keys(e);if(i.length!==Object.keys(n).length)return!0;for(let s=0;s<i.length;s++){const r=i[s];if(e[r]!==n[r]&&!Mu(t,r))return!0}return!1}function Tb({vnode:n,parent:e},t){for(;e;){const i=e.subTree;if(i.suspense&&i.suspense.activeBranch===n&&(i.el=n.el),i===n)(n=e.vnode).el=t,e=e.parent;else break}}const Mg=n=>n.__isSuspense;function Ab(n,e){e&&e.pendingBranch?wt(n)?e.effects.push(...n):e.effects.push(n):Nv(n)}const Gn=Symbol.for("v-fgt"),Su=Symbol.for("v-txt"),si=Symbol.for("v-cmt"),sd=Symbol.for("v-stc"),cl=[];let bi=null;function an(n=!1){cl.push(bi=n?null:[])}function Cb(){cl.pop(),bi=cl[cl.length-1]||null}let ml=1;function Zc(n,e=!1){ml+=n,n<0&&bi&&e&&(bi.hasOnce=!0)}function Sg(n){return n.dynamicChildren=ml>0?bi||Na:null,Cb(),ml>0&&bi&&bi.push(n),n}function pn(n,e,t,i,s,r){return Sg(we(n,e,t,i,s,r,!0))}function yf(n,e,t,i,s){return Sg(kt(n,e,t,i,s,!0))}function jc(n){return n?n.__v_isVNode===!0:!1}function Rr(n,e){return n.type===e.type&&n.key===e.key}const wg=({key:n})=>n??null,Pc=({ref:n,ref_key:e,ref_for:t})=>(typeof n=="number"&&(n=""+n),n!=null?bn(n)||$n(n)||Pt(n)?{i:Ui,r:n,k:e,f:!!t}:n:null);function we(n,e=null,t=null,i=0,s=null,r=n===Gn?0:1,a=!1,o=!1){const l={__v_isVNode:!0,__v_skip:!0,type:n,props:e,key:e&&wg(e),ref:e&&Pc(e),scopeId:$0,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:i,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:Ui};return o?(Mf(l,t),r&128&&n.normalize(l)):t&&(l.shapeFlag|=bn(t)?8:16),ml>0&&!a&&bi&&(l.patchFlag>0||r&6)&&l.patchFlag!==32&&bi.push(l),l}const kt=Rb;function Rb(n,e=null,t=null,i=0,s=null,r=!1){if((!n||n===rg)&&(n=si),jc(n)){const o=tr(n,e,!0);return t&&Mf(o,t),ml>0&&!r&&bi&&(o.shapeFlag&6?bi[bi.indexOf(n)]=o:bi.push(o)),o.patchFlag=-2,o}if(Gb(n)&&(n=n.__vccOpts),e){e=Pb(e);let{class:o,style:l}=e;o&&!bn(o)&&(e.class=Wa(o)),dn(l)&&(_f(l)&&!wt(l)&&(l=Bn({},l)),e.style=Or(l))}const a=bn(n)?1:Mg(n)?128:Z0(n)?64:dn(n)?4:Pt(n)?2:0;return we(n,e,t,i,s,a,r,!0)}function Pb(n){return n?_f(n)||dg(n)?Bn({},n):n:null}function tr(n,e,t=!1,i=!1){const{props:s,ref:r,patchFlag:a,children:o,transition:l}=n,c=e?Db(s||{},e):s,u={__v_isVNode:!0,__v_skip:!0,type:n.type,props:c,key:c&&wg(c),ref:e&&e.ref?t&&r?wt(r)?r.concat(Pc(e)):[r,Pc(e)]:Pc(e):r,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:o,target:n.target,targetStart:n.targetStart,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:e&&n.type!==Gn?a===-1?16:a|16:a,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:l,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&tr(n.ssContent),ssFallback:n.ssFallback&&tr(n.ssFallback),placeholder:n.placeholder,el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce};return l&&i&&pl(u,l.clone(u)),u}function Xs(n=" ",e=0){return kt(Su,null,n,e)}function Dc(n="",e=!1){return e?(an(),yf(si,null,n)):kt(si,null,n)}function Yi(n){return n==null||typeof n=="boolean"?kt(si):wt(n)?kt(Gn,null,n.slice()):jc(n)?Ys(n):kt(Su,null,String(n))}function Ys(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:tr(n)}function Mf(n,e){let t=0;const{shapeFlag:i}=n;if(e==null)e=null;else if(wt(e))t=16;else if(typeof e=="object")if(i&65){const s=e.default;s&&(s._c&&(s._d=!1),Mf(n,s()),s._c&&(s._d=!0));return}else{t=32;const s=e._;!s&&!dg(e)?e._ctx=Ui:s===3&&Ui&&(Ui.slots._===1?e._=1:(e._=2,n.patchFlag|=1024))}else Pt(e)?(e={default:e,_ctx:Ui},t=32):(e=String(e),i&64?(t=16,e=[Xs(e)]):t=8);n.children=e,n.shapeFlag|=t}function Db(...n){const e={};for(let t=0;t<n.length;t++){const i=n[t];for(const s in i)if(s==="class")e.class!==i.class&&(e.class=Wa([e.class,i.class]));else if(s==="style")e.style=Or([e.style,i.style]);else if(uu(s)){const r=e[s],a=i[s];a&&r!==a&&!(wt(r)&&r.includes(a))&&(e[s]=r?[].concat(r,a):a)}else s!==""&&(e[s]=i[s])}return e}function Hi(n,e,t,i=null){Bi(n,e,7,[t,i])}const Ib=lg();let Lb=0;function Nb(n,e,t){const i=n.type,s=(e?e.appContext:n.appContext)||Ib,r={uid:Lb++,vnode:n,type:i,parent:e,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new nv(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(s.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:fg(i,s),emitsOptions:yg(i,s),emit:null,emitted:null,propsDefaults:ln,inheritAttrs:i.inheritAttrs,ctx:ln,data:ln,props:ln,attrs:ln,slots:ln,refs:ln,setupState:ln,setupContext:null,suspense:t,suspenseId:t?t.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return r.ctx={_:r},r.root=e?e.root:r,r.emit=yb.bind(null,r),n.ce&&n.ce(r),r}let Kn=null;const Eg=()=>Kn||Ui;let Jc,rh;{const n=pu(),e=(t,i)=>{let s;return(s=n[t])||(s=n[t]=[]),s.push(i),r=>{s.length>1?s.forEach(a=>a(r)):s[0](r)}};Jc=e("__VUE_INSTANCE_SETTERS__",t=>Kn=t),rh=e("__VUE_SSR_SETTERS__",t=>gl=t)}const Sl=n=>{const e=Kn;return Jc(n),n.scope.on(),()=>{n.scope.off(),Jc(e)}},Rp=()=>{Kn&&Kn.scope.off(),Jc(null)};function Tg(n){return n.vnode.shapeFlag&4}let gl=!1;function Ub(n,e=!1,t=!1){e&&rh(e);const{props:i,children:s}=n.vnode,r=Tg(n);ob(n,i,r,e),db(n,s,t||e);const a=r?Fb(n,e):void 0;return e&&rh(!1),a}function Fb(n,e){const t=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,Jv);const{setup:i}=t;if(i){Ms();const s=n.setupContext=i.length>1?kb(n):null,r=Sl(n),a=Ml(i,n,0,[n.props,s]),o=M0(a);if(Ss(),r(),(o||n.sp)&&!ol(n)&&ng(n),o){if(a.then(Rp,Rp),e)return a.then(l=>{Pp(n,l)}).catch(l=>{gu(l,n,0)});n.asyncDep=a}else Pp(n,a)}else Ag(n)}function Pp(n,e,t){Pt(e)?n.type.__ssrInlineRender?n.ssrRender=e:n.render=e:dn(e)&&(n.setupState=W0(e)),Ag(n)}function Ag(n,e,t){const i=n.type;n.render||(n.render=i.render||ji);{const s=Sl(n);Ms();try{Qv(n)}finally{Ss(),s()}}}const Ob={get(n,e){return qn(n,"get",""),n[e]}};function kb(n){const e=t=>{n.exposed=t||{}};return{attrs:new Proxy(n.attrs,Ob),slots:n.slots,emit:n.emit,expose:e}}function Sf(n){return n.exposed?n.exposeProxy||(n.exposeProxy=new Proxy(W0(Sv(n.exposed)),{get(e,t){if(t in e)return e[t];if(t in ll)return ll[t](n)},has(e,t){return t in e||t in ll}})):n.proxy}function Bb(n,e=!0){return Pt(n)?n.displayName||n.name:n.name||e&&n.__name}function Gb(n){return Pt(n)&&"__vccOpts"in n}const Vs=(n,e)=>Cv(n,e,gl);function ah(n,e,t){const i=(r,a,o)=>{Zc(-1);try{return kt(r,a,o)}finally{Zc(1)}},s=arguments.length;return s===2?dn(e)&&!wt(e)?jc(e)?i(n,null,[e]):i(n,e):i(n,null,e):(s>3?t=Array.prototype.slice.call(arguments,2):s===3&&jc(t)&&(t=[t]),i(n,e,t))}const zb="3.5.21";/**
* @vue/runtime-dom v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let oh;const Dp=typeof window<"u"&&window.trustedTypes;if(Dp)try{oh=Dp.createPolicy("vue",{createHTML:n=>n})}catch{}const Cg=oh?n=>oh.createHTML(n):n=>n,Hb="http://www.w3.org/2000/svg",Vb="http://www.w3.org/1998/Math/MathML",_s=typeof document<"u"?document:null,Ip=_s&&_s.createElement("template"),Wb={insert:(n,e,t)=>{e.insertBefore(n,t||null)},remove:n=>{const e=n.parentNode;e&&e.removeChild(n)},createElement:(n,e,t,i)=>{const s=e==="svg"?_s.createElementNS(Hb,n):e==="mathml"?_s.createElementNS(Vb,n):t?_s.createElement(n,{is:t}):_s.createElement(n);return n==="select"&&i&&i.multiple!=null&&s.setAttribute("multiple",i.multiple),s},createText:n=>_s.createTextNode(n),createComment:n=>_s.createComment(n),setText:(n,e)=>{n.nodeValue=e},setElementText:(n,e)=>{n.textContent=e},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>_s.querySelector(n),setScopeId(n,e){n.setAttribute(e,"")},insertStaticContent(n,e,t,i,s,r){const a=t?t.previousSibling:e.lastChild;if(s&&(s===r||s.nextSibling))for(;e.insertBefore(s.cloneNode(!0),t),!(s===r||!(s=s.nextSibling)););else{Ip.innerHTML=Cg(i==="svg"?`<svg>${n}</svg>`:i==="mathml"?`<math>${n}</math>`:n);const o=Ip.content;if(i==="svg"||i==="mathml"){const l=o.firstChild;for(;l.firstChild;)o.appendChild(l.firstChild);o.removeChild(l)}e.insertBefore(o,t)}return[a?a.nextSibling:e.firstChild,t?t.previousSibling:e.lastChild]}},Ns="transition",Oo="animation",_l=Symbol("_vtc"),Rg={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},Xb=Bn({},j0,Rg),Yb=n=>(n.displayName="Transition",n.props=Xb,n),Pg=Yb((n,{slots:e})=>ah(kv,qb(n),e)),Mr=(n,e=[])=>{wt(n)?n.forEach(t=>t(...e)):n&&n(...e)},Lp=n=>n?wt(n)?n.some(e=>e.length>1):n.length>1:!1;function qb(n){const e={};for(const U in n)U in Rg||(e[U]=n[U]);if(n.css===!1)return e;const{name:t="v",type:i,duration:s,enterFromClass:r=`${t}-enter-from`,enterActiveClass:a=`${t}-enter-active`,enterToClass:o=`${t}-enter-to`,appearFromClass:l=r,appearActiveClass:c=a,appearToClass:u=o,leaveFromClass:h=`${t}-leave-from`,leaveActiveClass:d=`${t}-leave-active`,leaveToClass:f=`${t}-leave-to`}=n,x=Kb(s),S=x&&x[0],m=x&&x[1],{onBeforeEnter:p,onEnter:y,onEnterCancelled:R,onLeave:M,onLeaveCancelled:P,onBeforeAppear:T=p,onAppear:I=y,onAppearCancelled:v=R}=e,A=(U,Q,le,$)=>{U._enterCancelled=$,Sr(U,Q?u:o),Sr(U,Q?c:a),le&&le()},F=(U,Q)=>{U._isLeaving=!1,Sr(U,h),Sr(U,f),Sr(U,d),Q&&Q()},k=U=>(Q,le)=>{const $=U?I:y,re=()=>A(Q,U,le);Mr($,[Q,re]),Np(()=>{Sr(Q,U?l:r),cs(Q,U?u:o),Lp($)||Up(Q,i,S,re)})};return Bn(e,{onBeforeEnter(U){Mr(p,[U]),cs(U,r),cs(U,a)},onBeforeAppear(U){Mr(T,[U]),cs(U,l),cs(U,c)},onEnter:k(!1),onAppear:k(!0),onLeave(U,Q){U._isLeaving=!0;const le=()=>F(U,Q);cs(U,h),U._enterCancelled?(cs(U,d),kp()):(kp(),cs(U,d)),Np(()=>{U._isLeaving&&(Sr(U,h),cs(U,f),Lp(M)||Up(U,i,m,le))}),Mr(M,[U,le])},onEnterCancelled(U){A(U,!1,void 0,!0),Mr(R,[U])},onAppearCancelled(U){A(U,!0,void 0,!0),Mr(v,[U])},onLeaveCancelled(U){F(U),Mr(P,[U])}})}function Kb(n){if(n==null)return null;if(dn(n))return[rd(n.enter),rd(n.leave)];{const e=rd(n);return[e,e]}}function rd(n){return $x(n)}function cs(n,e){e.split(/\s+/).forEach(t=>t&&n.classList.add(t)),(n[_l]||(n[_l]=new Set)).add(e)}function Sr(n,e){e.split(/\s+/).forEach(i=>i&&n.classList.remove(i));const t=n[_l];t&&(t.delete(e),t.size||(n[_l]=void 0))}function Np(n){requestAnimationFrame(()=>{requestAnimationFrame(n)})}let $b=0;function Up(n,e,t,i){const s=n._endId=++$b,r=()=>{s===n._endId&&i()};if(t!=null)return setTimeout(r,t);const{type:a,timeout:o,propCount:l}=Zb(n,e);if(!a)return i();const c=a+"end";let u=0;const h=()=>{n.removeEventListener(c,d),r()},d=f=>{f.target===n&&++u>=l&&h()};setTimeout(()=>{u<l&&h()},o+1),n.addEventListener(c,d)}function Zb(n,e){const t=window.getComputedStyle(n),i=x=>(t[x]||"").split(", "),s=i(`${Ns}Delay`),r=i(`${Ns}Duration`),a=Fp(s,r),o=i(`${Oo}Delay`),l=i(`${Oo}Duration`),c=Fp(o,l);let u=null,h=0,d=0;e===Ns?a>0&&(u=Ns,h=a,d=r.length):e===Oo?c>0&&(u=Oo,h=c,d=l.length):(h=Math.max(a,c),u=h>0?a>c?Ns:Oo:null,d=u?u===Ns?r.length:l.length:0);const f=u===Ns&&/\b(?:transform|all)(?:,|$)/.test(i(`${Ns}Property`).toString());return{type:u,timeout:h,propCount:d,hasTransform:f}}function Fp(n,e){for(;n.length<e.length;)n=n.concat(n);return Math.max(...e.map((t,i)=>Op(t)+Op(n[i])))}function Op(n){return n==="auto"?0:Number(n.slice(0,-1).replace(",","."))*1e3}function kp(){return document.body.offsetHeight}function jb(n,e,t){const i=n[_l];i&&(e=(e?[e,...i]:[...i]).join(" ")),e==null?n.removeAttribute("class"):t?n.setAttribute("class",e):n.className=e}const Bp=Symbol("_vod"),Jb=Symbol("_vsh"),Qb=Symbol(""),ey=/(?:^|;)\s*display\s*:/;function ty(n,e,t){const i=n.style,s=bn(t);let r=!1;if(t&&!s){if(e)if(bn(e))for(const a of e.split(";")){const o=a.slice(0,a.indexOf(":")).trim();t[o]==null&&Ic(i,o,"")}else for(const a in e)t[a]==null&&Ic(i,a,"");for(const a in t)a==="display"&&(r=!0),Ic(i,a,t[a])}else if(s){if(e!==t){const a=i[Qb];a&&(t+=";"+a),i.cssText=t,r=ey.test(t)}}else e&&n.removeAttribute("style");Bp in n&&(n[Bp]=r?i.display:"",n[Jb]&&(i.display="none"))}const Gp=/\s*!important$/;function Ic(n,e,t){if(wt(t))t.forEach(i=>Ic(n,e,i));else if(t==null&&(t=""),e.startsWith("--"))n.setProperty(e,t);else{const i=ny(n,e);Gp.test(t)?n.setProperty(Gr(i),t.replace(Gp,""),"important"):n[i]=t}}const zp=["Webkit","Moz","ms"],ad={};function ny(n,e){const t=ad[e];if(t)return t;let i=Ci(e);if(i!=="filter"&&i in n)return ad[e]=i;i=fu(i);for(let s=0;s<zp.length;s++){const r=zp[s]+i;if(r in n)return ad[e]=r}return e}const Hp="http://www.w3.org/1999/xlink";function Vp(n,e,t,i,s,r=tv(e)){i&&e.startsWith("xlink:")?t==null?n.removeAttributeNS(Hp,e.slice(6,e.length)):n.setAttributeNS(Hp,e,t):t==null||r&&!T0(t)?n.removeAttribute(e):n.setAttribute(e,r?"":rr(t)?String(t):t)}function Wp(n,e,t,i,s){if(e==="innerHTML"||e==="textContent"){t!=null&&(n[e]=e==="innerHTML"?Cg(t):t);return}const r=n.tagName;if(e==="value"&&r!=="PROGRESS"&&!r.includes("-")){const o=r==="OPTION"?n.getAttribute("value")||"":n.value,l=t==null?n.type==="checkbox"?"on":"":String(t);(o!==l||!("_value"in n))&&(n.value=l),t==null&&n.removeAttribute(e),n._value=t;return}let a=!1;if(t===""||t==null){const o=typeof n[e];o==="boolean"?t=T0(t):t==null&&o==="string"?(t="",a=!0):o==="number"&&(t=0,a=!0)}try{n[e]=t}catch{}a&&n.removeAttribute(s||e)}function iy(n,e,t,i){n.addEventListener(e,t,i)}function sy(n,e,t,i){n.removeEventListener(e,t,i)}const Xp=Symbol("_vei");function ry(n,e,t,i,s=null){const r=n[Xp]||(n[Xp]={}),a=r[e];if(i&&a)a.value=i;else{const[o,l]=ay(e);if(i){const c=r[e]=cy(i,s);iy(n,o,c,l)}else a&&(sy(n,o,a,l),r[e]=void 0)}}const Yp=/(?:Once|Passive|Capture)$/;function ay(n){let e;if(Yp.test(n)){e={};let i;for(;i=n.match(Yp);)n=n.slice(0,n.length-i[0].length),e[i[0].toLowerCase()]=!0}return[n[2]===":"?n.slice(3):Gr(n.slice(2)),e]}let od=0;const oy=Promise.resolve(),ly=()=>od||(oy.then(()=>od=0),od=Date.now());function cy(n,e){const t=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=t.attached)return;Bi(uy(i,t.value),e,5,[i])};return t.value=n,t.attached=ly(),t}function uy(n,e){if(wt(e)){const t=n.stopImmediatePropagation;return n.stopImmediatePropagation=()=>{t.call(n),n._stopped=!0},e.map(i=>s=>!s._stopped&&i&&i(s))}else return e}const qp=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,dy=(n,e,t,i,s,r)=>{const a=s==="svg";e==="class"?jb(n,i,a):e==="style"?ty(n,t,i):uu(e)?of(e)||ry(n,e,t,i,r):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):hy(n,e,i,a))?(Wp(n,e,i),!n.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&Vp(n,e,i,a,r,e!=="value")):n._isVueCE&&(/[A-Z]/.test(e)||!bn(i))?Wp(n,Ci(e),i,r,e):(e==="true-value"?n._trueValue=i:e==="false-value"&&(n._falseValue=i),Vp(n,e,i,a))};function hy(n,e,t,i){if(i)return!!(e==="innerHTML"||e==="textContent"||e in n&&qp(e)&&Pt(t));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="form"||e==="list"&&n.tagName==="INPUT"||e==="type"&&n.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const s=n.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return qp(e)&&bn(t)?!1:e in n}const fy=["ctrl","shift","alt","meta"],py={stop:n=>n.stopPropagation(),prevent:n=>n.preventDefault(),self:n=>n.target!==n.currentTarget,ctrl:n=>!n.ctrlKey,shift:n=>!n.shiftKey,alt:n=>!n.altKey,meta:n=>!n.metaKey,left:n=>"button"in n&&n.button!==0,middle:n=>"button"in n&&n.button!==1,right:n=>"button"in n&&n.button!==2,exact:(n,e)=>fy.some(t=>n[`${t}Key`]&&!e.includes(t))},ms=(n,e)=>{const t=n._withMods||(n._withMods={}),i=e.join(".");return t[i]||(t[i]=(s,...r)=>{for(let a=0;a<e.length;a++){const o=py[e[a]];if(o&&o(s,e))return}return n(s,...r)})},my=Bn({patchProp:dy},Wb);let Kp;function gy(){return Kp||(Kp=fb(my))}const _y=(...n)=>{const e=gy().createApp(...n),{mount:t}=e;return e.mount=i=>{const s=vy(i);if(!s)return;const r=e._component;!Pt(r)&&!r.render&&!r.template&&(r.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const a=t(s,!1,xy(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),a},e};function xy(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function vy(n){return bn(n)?document.querySelector(n):n}const by="/assets/logo-DLoO7KZT.webp",Dg=/^[a-z0-9]+(-[a-z0-9]+)*$/,wu=(n,e,t,i="")=>{const s=n.split(":");if(n.slice(0,1)==="@"){if(s.length<2||s.length>3)return null;i=s.shift().slice(1)}if(s.length>3||!s.length)return null;if(s.length>1){const o=s.pop(),l=s.pop(),c={provider:s.length>0?s[0]:i,prefix:l,name:o};return e&&!Lc(c)?null:c}const r=s[0],a=r.split("-");if(a.length>1){const o={provider:i,prefix:a.shift(),name:a.join("-")};return e&&!Lc(o)?null:o}if(t&&i===""){const o={provider:i,prefix:"",name:r};return e&&!Lc(o,t)?null:o}return null},Lc=(n,e)=>n?!!((e&&n.prefix===""||n.prefix)&&n.name):!1,Ig=Object.freeze({left:0,top:0,width:16,height:16}),Qc=Object.freeze({rotate:0,vFlip:!1,hFlip:!1}),Eu=Object.freeze({...Ig,...Qc}),lh=Object.freeze({...Eu,body:"",hidden:!1});function yy(n,e){const t={};!n.hFlip!=!e.hFlip&&(t.hFlip=!0),!n.vFlip!=!e.vFlip&&(t.vFlip=!0);const i=((n.rotate||0)+(e.rotate||0))%4;return i&&(t.rotate=i),t}function $p(n,e){const t=yy(n,e);for(const i in lh)i in Qc?i in n&&!(i in t)&&(t[i]=Qc[i]):i in e?t[i]=e[i]:i in n&&(t[i]=n[i]);return t}function My(n,e){const t=n.icons,i=n.aliases||Object.create(null),s=Object.create(null);function r(a){if(t[a])return s[a]=[];if(!(a in s)){s[a]=null;const o=i[a]&&i[a].parent,l=o&&r(o);l&&(s[a]=[o].concat(l))}return s[a]}return Object.keys(t).concat(Object.keys(i)).forEach(r),s}function Sy(n,e,t){const i=n.icons,s=n.aliases||Object.create(null);let r={};function a(o){r=$p(i[o]||s[o],r)}return a(e),t.forEach(a),$p(n,r)}function Lg(n,e){const t=[];if(typeof n!="object"||typeof n.icons!="object")return t;n.not_found instanceof Array&&n.not_found.forEach(s=>{e(s,null),t.push(s)});const i=My(n);for(const s in i){const r=i[s];r&&(e(s,Sy(n,s,r)),t.push(s))}return t}const wy={provider:"",aliases:{},not_found:{},...Ig};function ld(n,e){for(const t in e)if(t in n&&typeof n[t]!=typeof e[t])return!1;return!0}function Ng(n){if(typeof n!="object"||n===null)return null;const e=n;if(typeof e.prefix!="string"||!n.icons||typeof n.icons!="object"||!ld(n,wy))return null;const t=e.icons;for(const s in t){const r=t[s];if(!s||typeof r.body!="string"||!ld(r,lh))return null}const i=e.aliases||Object.create(null);for(const s in i){const r=i[s],a=r.parent;if(!s||typeof a!="string"||!t[a]&&!i[a]||!ld(r,lh))return null}return e}const Zp=Object.create(null);function Ey(n,e){return{provider:n,prefix:e,icons:Object.create(null),missing:new Set}}function Xa(n,e){const t=Zp[n]||(Zp[n]=Object.create(null));return t[e]||(t[e]=Ey(n,e))}function Ug(n,e){return Ng(e)?Lg(e,(t,i)=>{i?n.icons[t]=i:n.missing.add(t)}):[]}function Ty(n,e,t){try{if(typeof t.body=="string")return n.icons[e]={...t},!0}catch{}return!1}let xl=!1;function Fg(n){return typeof n=="boolean"&&(xl=n),xl}function Ay(n){const e=typeof n=="string"?wu(n,!0,xl):n;if(e){const t=Xa(e.provider,e.prefix),i=e.name;return t.icons[i]||(t.missing.has(i)?null:void 0)}}function Cy(n,e){const t=wu(n,!0,xl);if(!t)return!1;const i=Xa(t.provider,t.prefix);return e?Ty(i,t.name,e):(i.missing.add(t.name),!0)}function Ry(n,e){if(typeof n!="object")return!1;if(typeof e!="string"&&(e=n.provider||""),xl&&!e&&!n.prefix){let s=!1;return Ng(n)&&(n.prefix="",Lg(n,(r,a)=>{Cy(r,a)&&(s=!0)})),s}const t=n.prefix;if(!Lc({prefix:t,name:"a"}))return!1;const i=Xa(e,t);return!!Ug(i,n)}const Og=Object.freeze({width:null,height:null}),kg=Object.freeze({...Og,...Qc}),Py=/(-?[0-9.]*[0-9]+[0-9.]*)/g,Dy=/^-?[0-9.]*[0-9]+[0-9.]*$/g;function jp(n,e,t){if(e===1)return n;if(t=t||100,typeof n=="number")return Math.ceil(n*e*t)/t;if(typeof n!="string")return n;const i=n.split(Py);if(i===null||!i.length)return n;const s=[];let r=i.shift(),a=Dy.test(r);for(;;){if(a){const o=parseFloat(r);isNaN(o)?s.push(r):s.push(Math.ceil(o*e*t)/t)}else s.push(r);if(r=i.shift(),r===void 0)return s.join("");a=!a}}function Iy(n,e="defs"){let t="";const i=n.indexOf("<"+e);for(;i>=0;){const s=n.indexOf(">",i),r=n.indexOf("</"+e);if(s===-1||r===-1)break;const a=n.indexOf(">",r);if(a===-1)break;t+=n.slice(s+1,r).trim(),n=n.slice(0,i).trim()+n.slice(a+1)}return{defs:t,content:n}}function Ly(n,e){return n?"<defs>"+n+"</defs>"+e:e}function Ny(n,e,t){const i=Iy(n);return Ly(i.defs,e+i.content+t)}const Uy=n=>n==="unset"||n==="undefined"||n==="none";function Fy(n,e){const t={...Eu,...n},i={...kg,...e},s={left:t.left,top:t.top,width:t.width,height:t.height};let r=t.body;[t,i].forEach(S=>{const m=[],p=S.hFlip,y=S.vFlip;let R=S.rotate;p?y?R+=2:(m.push("translate("+(s.width+s.left).toString()+" "+(0-s.top).toString()+")"),m.push("scale(-1 1)"),s.top=s.left=0):y&&(m.push("translate("+(0-s.left).toString()+" "+(s.height+s.top).toString()+")"),m.push("scale(1 -1)"),s.top=s.left=0);let M;switch(R<0&&(R-=Math.floor(R/4)*4),R=R%4,R){case 1:M=s.height/2+s.top,m.unshift("rotate(90 "+M.toString()+" "+M.toString()+")");break;case 2:m.unshift("rotate(180 "+(s.width/2+s.left).toString()+" "+(s.height/2+s.top).toString()+")");break;case 3:M=s.width/2+s.left,m.unshift("rotate(-90 "+M.toString()+" "+M.toString()+")");break}R%2===1&&(s.left!==s.top&&(M=s.left,s.left=s.top,s.top=M),s.width!==s.height&&(M=s.width,s.width=s.height,s.height=M)),m.length&&(r=Ny(r,'<g transform="'+m.join(" ")+'">',"</g>"))});const a=i.width,o=i.height,l=s.width,c=s.height;let u,h;a===null?(h=o===null?"1em":o==="auto"?c:o,u=jp(h,l/c)):(u=a==="auto"?l:a,h=o===null?jp(u,c/l):o==="auto"?c:o);const d={},f=(S,m)=>{Uy(m)||(d[S]=m.toString())};f("width",u),f("height",h);const x=[s.left,s.top,l,c];return d.viewBox=x.join(" "),{attributes:d,viewBox:x,body:r}}const Oy=/\sid="(\S+)"/g,ky="IconifyId"+Date.now().toString(16)+(Math.random()*16777216|0).toString(16);let By=0;function Gy(n,e=ky){const t=[];let i;for(;i=Oy.exec(n);)t.push(i[1]);if(!t.length)return n;const s="suffix"+(Math.random()*16777216|Date.now()).toString(16);return t.forEach(r=>{const a=typeof e=="function"?e(r):e+(By++).toString(),o=r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");n=n.replace(new RegExp('([#;"])('+o+')([")]|\\.[a-z])',"g"),"$1"+a+s+"$3")}),n=n.replace(new RegExp(s,"g"),""),n}const ch=Object.create(null);function zy(n,e){ch[n]=e}function uh(n){return ch[n]||ch[""]}function wf(n){let e;if(typeof n.resources=="string")e=[n.resources];else if(e=n.resources,!(e instanceof Array)||!e.length)return null;return{resources:e,path:n.path||"/",maxURL:n.maxURL||500,rotate:n.rotate||750,timeout:n.timeout||5e3,random:n.random===!0,index:n.index||0,dataAfterTimeout:n.dataAfterTimeout!==!1}}const Ef=Object.create(null),ko=["https://api.simplesvg.com","https://api.unisvg.com"],Nc=[];for(;ko.length>0;)ko.length===1||Math.random()>.5?Nc.push(ko.shift()):Nc.push(ko.pop());Ef[""]=wf({resources:["https://api.iconify.design"].concat(Nc)});function Hy(n,e){const t=wf(e);return t===null?!1:(Ef[n]=t,!0)}function Tf(n){return Ef[n]}const Vy=()=>{let n;try{if(n=fetch,typeof n=="function")return n}catch{}};let Jp=Vy();function Wy(n,e){const t=Tf(n);if(!t)return 0;let i;if(!t.maxURL)i=0;else{let s=0;t.resources.forEach(a=>{s=Math.max(s,a.length)});const r=e+".json?icons=";i=t.maxURL-s-t.path.length-r.length}return i}function Xy(n){return n===404}const Yy=(n,e,t)=>{const i=[],s=Wy(n,e),r="icons";let a={type:r,provider:n,prefix:e,icons:[]},o=0;return t.forEach((l,c)=>{o+=l.length+1,o>=s&&c>0&&(i.push(a),a={type:r,provider:n,prefix:e,icons:[]},o=l.length),a.icons.push(l)}),i.push(a),i};function qy(n){if(typeof n=="string"){const e=Tf(n);if(e)return e.path}return"/"}const Ky=(n,e,t)=>{if(!Jp){t("abort",424);return}let i=qy(e.provider);switch(e.type){case"icons":{const r=e.prefix,o=e.icons.join(","),l=new URLSearchParams({icons:o});i+=r+".json?"+l.toString();break}case"custom":{const r=e.uri;i+=r.slice(0,1)==="/"?r.slice(1):r;break}default:t("abort",400);return}let s=503;Jp(n+i).then(r=>{const a=r.status;if(a!==200){setTimeout(()=>{t(Xy(a)?"abort":"next",a)});return}return s=501,r.json()}).then(r=>{if(typeof r!="object"||r===null){setTimeout(()=>{r===404?t("abort",r):t("next",s)});return}setTimeout(()=>{t("success",r)})}).catch(()=>{t("next",s)})},$y={prepare:Yy,send:Ky};function Zy(n){const e={loaded:[],missing:[],pending:[]},t=Object.create(null);n.sort((s,r)=>s.provider!==r.provider?s.provider.localeCompare(r.provider):s.prefix!==r.prefix?s.prefix.localeCompare(r.prefix):s.name.localeCompare(r.name));let i={provider:"",prefix:"",name:""};return n.forEach(s=>{if(i.name===s.name&&i.prefix===s.prefix&&i.provider===s.provider)return;i=s;const r=s.provider,a=s.prefix,o=s.name,l=t[r]||(t[r]=Object.create(null)),c=l[a]||(l[a]=Xa(r,a));let u;o in c.icons?u=e.loaded:a===""||c.missing.has(o)?u=e.missing:u=e.pending;const h={provider:r,prefix:a,name:o};u.push(h)}),e}function Bg(n,e){n.forEach(t=>{const i=t.loaderCallbacks;i&&(t.loaderCallbacks=i.filter(s=>s.id!==e))})}function jy(n){n.pendingCallbacksFlag||(n.pendingCallbacksFlag=!0,setTimeout(()=>{n.pendingCallbacksFlag=!1;const e=n.loaderCallbacks?n.loaderCallbacks.slice(0):[];if(!e.length)return;let t=!1;const i=n.provider,s=n.prefix;e.forEach(r=>{const a=r.icons,o=a.pending.length;a.pending=a.pending.filter(l=>{if(l.prefix!==s)return!0;const c=l.name;if(n.icons[c])a.loaded.push({provider:i,prefix:s,name:c});else if(n.missing.has(c))a.missing.push({provider:i,prefix:s,name:c});else return t=!0,!0;return!1}),a.pending.length!==o&&(t||Bg([n],r.id),r.callback(a.loaded.slice(0),a.missing.slice(0),a.pending.slice(0),r.abort))})}))}let Jy=0;function Qy(n,e,t){const i=Jy++,s=Bg.bind(null,t,i);if(!e.pending.length)return s;const r={id:i,icons:e,callback:n,abort:s};return t.forEach(a=>{(a.loaderCallbacks||(a.loaderCallbacks=[])).push(r)}),s}function eM(n,e=!0,t=!1){const i=[];return n.forEach(s=>{const r=typeof s=="string"?wu(s,e,t):s;r&&i.push(r)}),i}var tM={resources:[],index:0,timeout:2e3,rotate:750,random:!1,dataAfterTimeout:!1};function nM(n,e,t,i){const s=n.resources.length,r=n.random?Math.floor(Math.random()*s):n.index;let a;if(n.random){let T=n.resources.slice(0);for(a=[];T.length>1;){const I=Math.floor(Math.random()*T.length);a.push(T[I]),T=T.slice(0,I).concat(T.slice(I+1))}a=a.concat(T)}else a=n.resources.slice(r).concat(n.resources.slice(0,r));const o=Date.now();let l="pending",c=0,u,h=null,d=[],f=[];typeof i=="function"&&f.push(i);function x(){h&&(clearTimeout(h),h=null)}function S(){l==="pending"&&(l="aborted"),x(),d.forEach(T=>{T.status==="pending"&&(T.status="aborted")}),d=[]}function m(T,I){I&&(f=[]),typeof T=="function"&&f.push(T)}function p(){return{startTime:o,payload:e,status:l,queriesSent:c,queriesPending:d.length,subscribe:m,abort:S}}function y(){l="failed",f.forEach(T=>{T(void 0,u)})}function R(){d.forEach(T=>{T.status==="pending"&&(T.status="aborted")}),d=[]}function M(T,I,v){const A=I!=="success";switch(d=d.filter(F=>F!==T),l){case"pending":break;case"failed":if(A||!n.dataAfterTimeout)return;break;default:return}if(I==="abort"){u=v,y();return}if(A){u=v,d.length||(a.length?P():y());return}if(x(),R(),!n.random){const F=n.resources.indexOf(T.resource);F!==-1&&F!==n.index&&(n.index=F)}l="completed",f.forEach(F=>{F(v)})}function P(){if(l!=="pending")return;x();const T=a.shift();if(T===void 0){if(d.length){h=setTimeout(()=>{x(),l==="pending"&&(R(),y())},n.timeout);return}y();return}const I={status:"pending",resource:T,callback:(v,A)=>{M(I,v,A)}};d.push(I),c++,h=setTimeout(P,n.rotate),t(T,e,I.callback)}return setTimeout(P),p}function Gg(n){const e={...tM,...n};let t=[];function i(){t=t.filter(o=>o().status==="pending")}function s(o,l,c){const u=nM(e,o,l,(h,d)=>{i(),c&&c(h,d)});return t.push(u),u}function r(o){return t.find(l=>o(l))||null}return{query:s,find:r,setIndex:o=>{e.index=o},getIndex:()=>e.index,cleanup:i}}function Qp(){}const cd=Object.create(null);function iM(n){if(!cd[n]){const e=Tf(n);if(!e)return;const t=Gg(e),i={config:e,redundancy:t};cd[n]=i}return cd[n]}function sM(n,e,t){let i,s;if(typeof n=="string"){const r=uh(n);if(!r)return t(void 0,424),Qp;s=r.send;const a=iM(n);a&&(i=a.redundancy)}else{const r=wf(n);if(r){i=Gg(r);const a=n.resources?n.resources[0]:"",o=uh(a);o&&(s=o.send)}}return!i||!s?(t(void 0,424),Qp):i.query(e,s,t)().abort}function em(){}function rM(n){n.iconsLoaderFlag||(n.iconsLoaderFlag=!0,setTimeout(()=>{n.iconsLoaderFlag=!1,jy(n)}))}function aM(n){const e=[],t=[];return n.forEach(i=>{(i.match(Dg)?e:t).push(i)}),{valid:e,invalid:t}}function Bo(n,e,t){function i(){const s=n.pendingIcons;e.forEach(r=>{s&&s.delete(r),n.icons[r]||n.missing.add(r)})}if(t&&typeof t=="object")try{if(!Ug(n,t).length){i();return}}catch(s){console.error(s)}i(),rM(n)}function tm(n,e){n instanceof Promise?n.then(t=>{e(t)}).catch(()=>{e(null)}):e(n)}function oM(n,e){n.iconsToLoad?n.iconsToLoad=n.iconsToLoad.concat(e).sort():n.iconsToLoad=e,n.iconsQueueFlag||(n.iconsQueueFlag=!0,setTimeout(()=>{n.iconsQueueFlag=!1;const{provider:t,prefix:i}=n,s=n.iconsToLoad;if(delete n.iconsToLoad,!s||!s.length)return;const r=n.loadIcon;if(n.loadIcons&&(s.length>1||!r)){tm(n.loadIcons(s,i,t),u=>{Bo(n,s,u)});return}if(r){s.forEach(u=>{const h=r(u,i,t);tm(h,d=>{const f=d?{prefix:i,icons:{[u]:d}}:null;Bo(n,[u],f)})});return}const{valid:a,invalid:o}=aM(s);if(o.length&&Bo(n,o,null),!a.length)return;const l=i.match(Dg)?uh(t):null;if(!l){Bo(n,a,null);return}l.prepare(t,i,a).forEach(u=>{sM(t,u,h=>{Bo(n,u.icons,h)})})}))}const lM=(n,e)=>{const t=eM(n,!0,Fg()),i=Zy(t);if(!i.pending.length){let l=!0;return e&&setTimeout(()=>{l&&e(i.loaded,i.missing,i.pending,em)}),()=>{l=!1}}const s=Object.create(null),r=[];let a,o;return i.pending.forEach(l=>{const{provider:c,prefix:u}=l;if(u===o&&c===a)return;a=c,o=u,r.push(Xa(c,u));const h=s[c]||(s[c]=Object.create(null));h[u]||(h[u]=[])}),i.pending.forEach(l=>{const{provider:c,prefix:u,name:h}=l,d=Xa(c,u),f=d.pendingIcons||(d.pendingIcons=new Set);f.has(h)||(f.add(h),s[c][u].push(h))}),r.forEach(l=>{const c=s[l.provider][l.prefix];c.length&&oM(l,c)}),e?Qy(e,i,r):em};function cM(n,e){const t={...n};for(const i in e){const s=e[i],r=typeof s;i in Og?(s===null||s&&(r==="string"||r==="number"))&&(t[i]=s):r===typeof t[i]&&(t[i]=i==="rotate"?s%4:s)}return t}const uM=/[\s,]+/;function dM(n,e){e.split(uM).forEach(t=>{switch(t.trim()){case"horizontal":n.hFlip=!0;break;case"vertical":n.vFlip=!0;break}})}function hM(n,e=0){const t=n.replace(/^-?[0-9.]*/,"");function i(s){for(;s<0;)s+=4;return s%4}if(t===""){const s=parseInt(n);return isNaN(s)?0:i(s)}else if(t!==n){let s=0;switch(t){case"%":s=25;break;case"deg":s=90}if(s){let r=parseFloat(n.slice(0,n.length-t.length));return isNaN(r)?0:(r=r/s,r%1===0?i(r):0)}}return e}function fM(n,e){let t=n.indexOf("xlink:")===-1?"":' xmlns:xlink="http://www.w3.org/1999/xlink"';for(const i in e)t+=" "+i+'="'+e[i]+'"';return'<svg xmlns="http://www.w3.org/2000/svg"'+t+">"+n+"</svg>"}function pM(n){return n.replace(/"/g,"'").replace(/%/g,"%25").replace(/#/g,"%23").replace(/</g,"%3C").replace(/>/g,"%3E").replace(/\s+/g," ")}function mM(n){return"data:image/svg+xml,"+pM(n)}function gM(n){return'url("'+mM(n)+'")'}const nm={...kg,inline:!1},_M={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","aria-hidden":!0,role:"img"},xM={display:"inline-block"},dh={backgroundColor:"currentColor"},zg={backgroundColor:"transparent"},im={Image:"var(--svg)",Repeat:"no-repeat",Size:"100% 100%"},sm={webkitMask:dh,mask:dh,background:zg};for(const n in sm){const e=sm[n];for(const t in im)e[n+t]=im[t]}const Uc={};["horizontal","vertical"].forEach(n=>{const e=n.slice(0,1)+"Flip";Uc[n+"-flip"]=e,Uc[n.slice(0,1)+"-flip"]=e,Uc[n+"Flip"]=e});function rm(n){return n+(n.match(/^[-0-9.]+$/)?"px":"")}const am=(n,e)=>{const t=cM(nm,e),i={..._M},s=e.mode||"svg",r={},a=e.style,o=typeof a=="object"&&!(a instanceof Array)?a:{};for(let S in e){const m=e[S];if(m!==void 0)switch(S){case"icon":case"style":case"onLoad":case"mode":case"ssr":break;case"inline":case"hFlip":case"vFlip":t[S]=m===!0||m==="true"||m===1;break;case"flip":typeof m=="string"&&dM(t,m);break;case"color":r.color=m;break;case"rotate":typeof m=="string"?t[S]=hM(m):typeof m=="number"&&(t[S]=m);break;case"ariaHidden":case"aria-hidden":m!==!0&&m!=="true"&&delete i["aria-hidden"];break;default:{const p=Uc[S];p?(m===!0||m==="true"||m===1)&&(t[p]=!0):nm[S]===void 0&&(i[S]=m)}}}const l=Fy(n,t),c=l.attributes;if(t.inline&&(r.verticalAlign="-0.125em"),s==="svg"){i.style={...r,...o},Object.assign(i,c);let S=0,m=e.id;return typeof m=="string"&&(m=m.replace(/-/g,"_")),i.innerHTML=Gy(l.body,m?()=>m+"ID"+S++:"iconifyVue"),ah("svg",i)}const{body:u,width:h,height:d}=n,f=s==="mask"||(s==="bg"?!1:u.indexOf("currentColor")!==-1),x=fM(u,{...c,width:h+"",height:d+""});return i.style={...r,"--svg":gM(x),width:rm(c.width),height:rm(c.height),...xM,...f?dh:zg,...o},ah("span",i)};Fg(!0);zy("",$y);if(typeof document<"u"&&typeof window<"u"){const n=window;if(n.IconifyPreload!==void 0){const e=n.IconifyPreload,t="Invalid IconifyPreload syntax.";typeof e=="object"&&e!==null&&(e instanceof Array?e:[e]).forEach(i=>{try{(typeof i!="object"||i===null||i instanceof Array||typeof i.icons!="object"||typeof i.prefix!="string"||!Ry(i))&&console.error(t)}catch{console.error(t)}})}if(n.IconifyProviders!==void 0){const e=n.IconifyProviders;if(typeof e=="object"&&e!==null)for(let t in e){const i="IconifyProviders["+t+"] is invalid.";try{const s=e[t];if(typeof s!="object"||!s||s.resources===void 0)continue;Hy(t,s)||console.error(i)}catch{console.error(i)}}}}const vM={...Eu,body:""},Dn=zr({inheritAttrs:!1,data(){return{_name:"",_loadingIcon:null,iconMounted:!1,counter:0}},mounted(){this.iconMounted=!0},unmounted(){this.abortLoading()},methods:{abortLoading(){this._loadingIcon&&(this._loadingIcon.abort(),this._loadingIcon=null)},getIcon(n,e,t){if(typeof n=="object"&&n!==null&&typeof n.body=="string")return this._name="",this.abortLoading(),{data:n};let i;if(typeof n!="string"||(i=wu(n,!1,!0))===null)return this.abortLoading(),null;let s=Ay(i);if(!s)return(!this._loadingIcon||this._loadingIcon.name!==n)&&(this.abortLoading(),this._name="",s!==null&&(this._loadingIcon={name:n,abort:lM([i],()=>{this.counter++})})),null;if(this.abortLoading(),this._name!==n&&(this._name=n,e&&e(n)),t){s=Object.assign({},s);const a=t(s.body,i.name,i.prefix,i.provider);typeof a=="string"&&(s.body=a)}const r=["iconify"];return i.prefix!==""&&r.push("iconify--"+i.prefix),i.provider!==""&&r.push("iconify--"+i.provider),{data:s,classes:r}}},render(){this.counter;const n=this.$attrs,e=this.iconMounted||n.ssr?this.getIcon(n.icon,n.onLoad,n.customise):null;if(!e)return am(vM,n);let t=n;return e.classes&&(t={...n,class:(typeof n.class=="string"?n.class+" ":"")+e.classes.join(" ")}),am({...Eu,...e.data},t)}}),bM={class:"fixed top-0 left-0 right-0 z-40 px-4 md:px-8 py-3 pointer-events-none"},yM={class:"max-w-7xl mx-auto flex items-center justify-between pointer-events-auto"},MM=["src"],SM={class:"flex items-center gap-2"},wM={class:"flex items-center gap-1.5 px-3 py-1.5 rounded-2xl cosmic-glass border border-white/10 text-[11px] font-mono text-neutral-400 shadow-lg"},EM=zr({__name:"Navbar",emits:["navigate"],setup(n,{emit:e}){const t=e;return(i,s)=>(an(),pn("header",bM,[we("div",yM,[we("a",{href:"#",onClick:s[0]||(s[0]=ms(r=>t("navigate","sun"),["prevent"])),class:"flex items-center gap-3 p-1.5 pr-4 rounded-2xl hover:scale-105 transition-all group"},[we("img",{src:mn(by),alt:"Anko Logo",width:"36",height:"36",class:"rounded-xl group-hover:rotate-12 transition-transform duration-300"},null,8,MM)]),we("div",SM,[we("div",wM,[kt(mn(Dn),{icon:"solar:cursor-bold",width:"14",class:"text-cyan-400"}),s[1]||(s[1]=we("span",{class:"hidden sm:inline"},"Drag to pan • Scroll to zoom • Click to scan",-1)),s[2]||(s[2]=we("span",{class:"sm:hidden"},"Explore Orbit",-1))])])])]))}});/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Af="185",Ba={ROTATE:0,DOLLY:1,PAN:2},La={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},TM=0,om=1,AM=2,Fc=1,CM=2,tl=3,nr=0,vn=1,Nt=2,bs=0,Ga=1,bt=2,lm=3,cm=4,RM=5,Pr=100,PM=101,DM=102,IM=103,LM=104,NM=200,UM=201,FM=202,OM=203,hh=204,fh=205,kM=206,BM=207,GM=208,zM=209,HM=210,VM=211,WM=212,XM=213,YM=214,ph=0,mh=1,gh=2,Ya=3,_h=4,xh=5,vh=6,bh=7,Hg=0,qM=1,KM=2,Ji=0,Vg=1,Wg=2,Xg=3,Yg=4,qg=5,Kg=6,$g=7,Zg=300,kr=301,qa=302,ud=303,dd=304,Tu=306,Ei=1e3,$i=1001,yh=1002,Hn=1003,$M=1004,ql=1005,Rn=1006,hd=1007,Lr=1008,xi=1009,jg=1010,Jg=1011,vl=1012,Cf=1013,es=1014,Fi=1015,ws=1016,Rf=1017,Pf=1018,bl=1020,Qg=35902,e_=35899,t_=1021,n_=1022,Oi=1023,Es=1026,Nr=1027,Df=1028,If=1029,Br=1030,Lf=1031,Nf=1033,Oc=33776,kc=33777,Bc=33778,Gc=33779,Mh=35840,Sh=35841,wh=35842,Eh=35843,Th=36196,Ah=37492,Ch=37496,Rh=37488,Ph=37489,eu=37490,Dh=37491,Ih=37808,Lh=37809,Nh=37810,Uh=37811,Fh=37812,Oh=37813,kh=37814,Bh=37815,Gh=37816,zh=37817,Hh=37818,Vh=37819,Wh=37820,Xh=37821,Yh=36492,qh=36494,Kh=36495,$h=36283,Zh=36284,tu=36285,jh=36286,ZM=3200,Jh=0,jM=1,Zs="",Ti="srgb",nu="srgb-linear",iu="linear",Zt="srgb",da=7680,um=519,JM=512,QM=513,e1=514,Uf=515,t1=516,n1=517,Ff=518,i1=519,Qh=35044,dm="300 es",Zi=2e3,yl=2001;function s1(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function su(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function r1(){const n=su("canvas");return n.style.display="block",n}const hm={};function ru(...n){const e="THREE."+n.shift();console.log(e,...n)}function i_(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function vt(...n){n=i_(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Bt(...n){n=i_(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function za(...n){const e=n.join(" ");e in hm||(hm[e]=!0,vt(...n))}function a1(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}const o1={[ph]:mh,[gh]:vh,[_h]:bh,[Ya]:xh,[mh]:ph,[vh]:gh,[bh]:_h,[xh]:Ya};class ar{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Xn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ul=Math.PI/180,ef=180/Math.PI;function Qs(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Xn[n&255]+Xn[n>>8&255]+Xn[n>>16&255]+Xn[n>>24&255]+"-"+Xn[e&255]+Xn[e>>8&255]+"-"+Xn[e>>16&15|64]+Xn[e>>24&255]+"-"+Xn[t&63|128]+Xn[t>>8&255]+"-"+Xn[t>>16&255]+Xn[t>>24&255]+Xn[i&255]+Xn[i>>8&255]+Xn[i>>16&255]+Xn[i>>24&255]).toLowerCase()}function Ut(n,e,t){return Math.max(e,Math.min(t,n))}function l1(n,e){return(n%e+e)%e}function fd(n,e,t){return(1-t)*n+t*e}function Ki(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function en(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const c1={DEG2RAD:ul},Xf=class Xf{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ut(this.x,e.x,t.x),this.y=Ut(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ut(this.x,e,t),this.y=Ut(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ut(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ut(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Xf.prototype.isVector2=!0;let ut=Xf;class ir{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let l=i[s+0],c=i[s+1],u=i[s+2],h=i[s+3],d=r[a+0],f=r[a+1],x=r[a+2],S=r[a+3];if(h!==S||l!==d||c!==f||u!==x){let m=l*d+c*f+u*x+h*S;m<0&&(d=-d,f=-f,x=-x,S=-S,m=-m);let p=1-o;if(m<.9995){const y=Math.acos(m),R=Math.sin(y);p=Math.sin(p*y)/R,o=Math.sin(o*y)/R,l=l*p+d*o,c=c*p+f*o,u=u*p+x*o,h=h*p+S*o}else{l=l*p+d*o,c=c*p+f*o,u=u*p+x*o,h=h*p+S*o;const y=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=y,c*=y,u*=y,h*=y}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,s,r,a){const o=i[s],l=i[s+1],c=i[s+2],u=i[s+3],h=r[a],d=r[a+1],f=r[a+2],x=r[a+3];return e[t]=o*x+u*h+l*f-c*d,e[t+1]=l*x+u*d+c*h-o*f,e[t+2]=c*x+u*f+o*d-l*h,e[t+3]=u*x-o*h-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(s/2),h=o(r/2),d=l(i/2),f=l(s/2),x=l(r/2);switch(a){case"XYZ":this._x=d*u*h+c*f*x,this._y=c*f*h-d*u*x,this._z=c*u*x+d*f*h,this._w=c*u*h-d*f*x;break;case"YXZ":this._x=d*u*h+c*f*x,this._y=c*f*h-d*u*x,this._z=c*u*x-d*f*h,this._w=c*u*h+d*f*x;break;case"ZXY":this._x=d*u*h-c*f*x,this._y=c*f*h+d*u*x,this._z=c*u*x+d*f*h,this._w=c*u*h-d*f*x;break;case"ZYX":this._x=d*u*h-c*f*x,this._y=c*f*h+d*u*x,this._z=c*u*x-d*f*h,this._w=c*u*h+d*f*x;break;case"YZX":this._x=d*u*h+c*f*x,this._y=c*f*h+d*u*x,this._z=c*u*x-d*f*h,this._w=c*u*h-d*f*x;break;case"XZY":this._x=d*u*h-c*f*x,this._y=c*f*h-d*u*x,this._z=c*u*x+d*f*h,this._w=c*u*h+d*f*x;break;default:vt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],h=t[10],d=i+o+h;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(i>o&&i>h){const f=2*Math.sqrt(1+i-o-h);this._w=(u-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>h){const f=2*Math.sqrt(1+o-i-h);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+h-i-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ut(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-i*c,this._z=r*u+a*c+i*l-s*o,this._w=a*u-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Yf=class Yf{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(fm.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(fm.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*i),u=2*(o*t-r*s),h=2*(r*i-a*t);return this.x=t+l*c+a*h-o*u,this.y=i+l*u+o*c-r*h,this.z=s+l*h+r*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ut(this.x,e.x,t.x),this.y=Ut(this.y,e.y,t.y),this.z=Ut(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ut(this.x,e,t),this.y=Ut(this.y,e,t),this.z=Ut(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ut(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return pd.copy(this).projectOnVector(e),this.sub(pd)}reflect(e){return this.sub(pd.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ut(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Yf.prototype.isVector3=!0;let L=Yf;const pd=new L,fm=new ir,qf=class qf{constructor(e,t,i,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c)}set(e,t,i,s,r,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],h=i[7],d=i[2],f=i[5],x=i[8],S=s[0],m=s[3],p=s[6],y=s[1],R=s[4],M=s[7],P=s[2],T=s[5],I=s[8];return r[0]=a*S+o*y+l*P,r[3]=a*m+o*R+l*T,r[6]=a*p+o*M+l*I,r[1]=c*S+u*y+h*P,r[4]=c*m+u*R+h*T,r[7]=c*p+u*M+h*I,r[2]=d*S+f*y+x*P,r[5]=d*m+f*R+x*T,r[8]=d*p+f*M+x*I,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-i*r*u+i*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=u*a-o*c,d=o*l-u*r,f=c*r-a*l,x=t*h+i*d+s*f;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const S=1/x;return e[0]=h*S,e[1]=(s*c-u*i)*S,e[2]=(o*i-s*a)*S,e[3]=d*S,e[4]=(u*t-s*l)*S,e[5]=(s*r-o*t)*S,e[6]=f*S,e[7]=(i*l-c*t)*S,e[8]=(a*t-i*r)*S,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return za("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(md.makeScale(e,t)),this}rotate(e){return za("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(md.makeRotation(-e)),this}translate(e,t){return za("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(md.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};qf.prototype.isMatrix3=!0;let Ct=qf;const md=new Ct,pm=new Ct().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),mm=new Ct().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function u1(){const n={enabled:!0,workingColorSpace:nu,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Zt&&(s.r=ys(s.r),s.g=ys(s.g),s.b=ys(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Zt&&(s.r=Ha(s.r),s.g=Ha(s.g),s.b=Ha(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Zs?iu:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return za("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return za("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[nu]:{primaries:e,whitePoint:i,transfer:iu,toXYZ:pm,fromXYZ:mm,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Ti},outputColorSpaceConfig:{drawingBufferColorSpace:Ti}},[Ti]:{primaries:e,whitePoint:i,transfer:Zt,toXYZ:pm,fromXYZ:mm,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Ti}}}),n}const Gt=u1();function ys(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ha(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let ha;class d1{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{ha===void 0&&(ha=su("canvas")),ha.width=e.width,ha.height=e.height;const s=ha.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=ha}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=su("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=ys(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(ys(t[i]/255)*255):t[i]=ys(t[i]);return{data:t,width:e.width,height:e.height}}else return vt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let h1=0;class Of{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:h1++}),this.uuid=Qs(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(gd(s[a].image)):r.push(gd(s[a]))}else r=gd(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function gd(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?d1.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(vt("Texture: Unable to serialize Texture."),{})}let f1=0;const _d=new L;class Zn extends ar{constructor(e=Zn.DEFAULT_IMAGE,t=Zn.DEFAULT_MAPPING,i=$i,s=$i,r=Rn,a=Lr,o=Oi,l=xi,c=Zn.DEFAULT_ANISOTROPY,u=Zs){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:f1++}),this.uuid=Qs(),this.name="",this.source=new Of(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ut(0,0),this.repeat=new ut(1,1),this.center=new ut(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ct,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(_d).x}get height(){return this.source.getSize(_d).y}get depth(){return this.source.getSize(_d).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){vt(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){vt(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Zg)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ei:e.x=e.x-Math.floor(e.x);break;case $i:e.x=e.x<0?0:1;break;case yh:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ei:e.y=e.y-Math.floor(e.y);break;case $i:e.y=e.y<0?0:1;break;case yh:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Zn.DEFAULT_IMAGE=null;Zn.DEFAULT_MAPPING=Zg;Zn.DEFAULT_ANISOTROPY=1;const Kf=class Kf{constructor(e=0,t=0,i=0,s=1){this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const l=e.elements,c=l[0],u=l[4],h=l[8],d=l[1],f=l[5],x=l[9],S=l[2],m=l[6],p=l[10];if(Math.abs(u-d)<.01&&Math.abs(h-S)<.01&&Math.abs(x-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+S)<.1&&Math.abs(x+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const R=(c+1)/2,M=(f+1)/2,P=(p+1)/2,T=(u+d)/4,I=(h+S)/4,v=(x+m)/4;return R>M&&R>P?R<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(R),s=T/i,r=I/i):M>P?M<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),i=T/s,r=v/s):P<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(P),i=I/r,s=v/r),this.set(i,s,r,t),this}let y=Math.sqrt((m-x)*(m-x)+(h-S)*(h-S)+(d-u)*(d-u));return Math.abs(y)<.001&&(y=1),this.x=(m-x)/y,this.y=(h-S)/y,this.z=(d-u)/y,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ut(this.x,e.x,t.x),this.y=Ut(this.y,e.y,t.y),this.z=Ut(this.z,e.z,t.z),this.w=Ut(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ut(this.x,e,t),this.y=Ut(this.y,e,t),this.z=Ut(this.z,e,t),this.w=Ut(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ut(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Kf.prototype.isVector4=!0;let _n=Kf;class p1 extends ar{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Rn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new _n(0,0,e,t),this.scissorTest=!1,this.viewport=new _n(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:i.depth},r=new Zn(s),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Rn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Of(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Qi extends p1{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class s_ extends Zn{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Hn,this.minFilter=Hn,this.wrapR=$i,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class m1 extends Zn{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Hn,this.minFilter=Hn,this.wrapR=$i,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const cu=class cu{constructor(e,t,i,s,r,a,o,l,c,u,h,d,f,x,S,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c,u,h,d,f,x,S,m)}set(e,t,i,s,r,a,o,l,c,u,h,d,f,x,S,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=u,p[10]=h,p[14]=d,p[3]=f,p[7]=x,p[11]=S,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new cu().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,s=1/fa.setFromMatrixColumn(e,0).length(),r=1/fa.setFromMatrixColumn(e,1).length(),a=1/fa.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const d=a*u,f=a*h,x=o*u,S=o*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=f+x*c,t[5]=d-S*c,t[9]=-o*l,t[2]=S-d*c,t[6]=x+f*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*u,f=l*h,x=c*u,S=c*h;t[0]=d+S*o,t[4]=x*o-f,t[8]=a*c,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=f*o-x,t[6]=S+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*u,f=l*h,x=c*u,S=c*h;t[0]=d-S*o,t[4]=-a*h,t[8]=x+f*o,t[1]=f+x*o,t[5]=a*u,t[9]=S-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*u,f=a*h,x=o*u,S=o*h;t[0]=l*u,t[4]=x*c-f,t[8]=d*c+S,t[1]=l*h,t[5]=S*c+d,t[9]=f*c-x,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,f=a*c,x=o*l,S=o*c;t[0]=l*u,t[4]=S-d*h,t[8]=x*h+f,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=f*h+x,t[10]=d-S*h}else if(e.order==="XZY"){const d=a*l,f=a*c,x=o*l,S=o*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=d*h+S,t[5]=a*u,t[9]=f*h-x,t[2]=x*h-f,t[6]=o*u,t[10]=S*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(g1,e,_1)}lookAt(e,t,i){const s=this.elements;return fi.subVectors(e,t),fi.lengthSq()===0&&(fi.z=1),fi.normalize(),Us.crossVectors(i,fi),Us.lengthSq()===0&&(Math.abs(i.z)===1?fi.x+=1e-4:fi.z+=1e-4,fi.normalize(),Us.crossVectors(i,fi)),Us.normalize(),Kl.crossVectors(fi,Us),s[0]=Us.x,s[4]=Kl.x,s[8]=fi.x,s[1]=Us.y,s[5]=Kl.y,s[9]=fi.y,s[2]=Us.z,s[6]=Kl.z,s[10]=fi.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],h=i[5],d=i[9],f=i[13],x=i[2],S=i[6],m=i[10],p=i[14],y=i[3],R=i[7],M=i[11],P=i[15],T=s[0],I=s[4],v=s[8],A=s[12],F=s[1],k=s[5],U=s[9],Q=s[13],le=s[2],$=s[6],re=s[10],Z=s[14],oe=s[3],Ae=s[7],Ge=s[11],Fe=s[15];return r[0]=a*T+o*F+l*le+c*oe,r[4]=a*I+o*k+l*$+c*Ae,r[8]=a*v+o*U+l*re+c*Ge,r[12]=a*A+o*Q+l*Z+c*Fe,r[1]=u*T+h*F+d*le+f*oe,r[5]=u*I+h*k+d*$+f*Ae,r[9]=u*v+h*U+d*re+f*Ge,r[13]=u*A+h*Q+d*Z+f*Fe,r[2]=x*T+S*F+m*le+p*oe,r[6]=x*I+S*k+m*$+p*Ae,r[10]=x*v+S*U+m*re+p*Ge,r[14]=x*A+S*Q+m*Z+p*Fe,r[3]=y*T+R*F+M*le+P*oe,r[7]=y*I+R*k+M*$+P*Ae,r[11]=y*v+R*U+M*re+P*Ge,r[15]=y*A+R*Q+M*Z+P*Fe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],h=e[6],d=e[10],f=e[14],x=e[3],S=e[7],m=e[11],p=e[15],y=l*f-c*d,R=o*f-c*h,M=o*d-l*h,P=a*f-c*u,T=a*d-l*u,I=a*h-o*u;return t*(S*y-m*R+p*M)-i*(x*y-m*P+p*T)+s*(x*R-S*P+p*I)-r*(x*M-S*T+m*I)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],u=e[10];return t*(a*u-o*c)-i*(r*u-o*l)+s*(r*c-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=e[9],d=e[10],f=e[11],x=e[12],S=e[13],m=e[14],p=e[15],y=t*o-i*a,R=t*l-s*a,M=t*c-r*a,P=i*l-s*o,T=i*c-r*o,I=s*c-r*l,v=u*S-h*x,A=u*m-d*x,F=u*p-f*x,k=h*m-d*S,U=h*p-f*S,Q=d*p-f*m,le=y*Q-R*U+M*k+P*F-T*A+I*v;if(le===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const $=1/le;return e[0]=(o*Q-l*U+c*k)*$,e[1]=(s*U-i*Q-r*k)*$,e[2]=(S*I-m*T+p*P)*$,e[3]=(d*T-h*I-f*P)*$,e[4]=(l*F-a*Q-c*A)*$,e[5]=(t*Q-s*F+r*A)*$,e[6]=(m*M-x*I-p*R)*$,e[7]=(u*I-d*M+f*R)*$,e[8]=(a*U-o*F+c*v)*$,e[9]=(i*F-t*U-r*v)*$,e[10]=(x*T-S*M+p*y)*$,e[11]=(h*M-u*T-f*y)*$,e[12]=(o*A-a*k-l*v)*$,e[13]=(t*k-i*A+s*v)*$,e[14]=(S*R-x*P-m*y)*$,e[15]=(u*P-h*R+d*y)*$,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,l=e.z,c=r*a,u=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+i,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,u=a+a,h=o+o,d=r*c,f=r*u,x=r*h,S=a*u,m=a*h,p=o*h,y=l*c,R=l*u,M=l*h,P=i.x,T=i.y,I=i.z;return s[0]=(1-(S+p))*P,s[1]=(f+M)*P,s[2]=(x-R)*P,s[3]=0,s[4]=(f-M)*T,s[5]=(1-(d+p))*T,s[6]=(m+y)*T,s[7]=0,s[8]=(x+R)*I,s[9]=(m-y)*I,s[10]=(1-(d+S))*I,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let a=fa.set(s[0],s[1],s[2]).length();const o=fa.set(s[4],s[5],s[6]).length(),l=fa.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Ii.copy(this);const c=1/a,u=1/o,h=1/l;return Ii.elements[0]*=c,Ii.elements[1]*=c,Ii.elements[2]*=c,Ii.elements[4]*=u,Ii.elements[5]*=u,Ii.elements[6]*=u,Ii.elements[8]*=h,Ii.elements[9]*=h,Ii.elements[10]*=h,t.setFromRotationMatrix(Ii),i.x=a,i.y=o,i.z=l,this}makePerspective(e,t,i,s,r,a,o=Zi,l=!1){const c=this.elements,u=2*r/(t-e),h=2*r/(i-s),d=(t+e)/(t-e),f=(i+s)/(i-s);let x,S;if(l)x=r/(a-r),S=a*r/(a-r);else if(o===Zi)x=-(a+r)/(a-r),S=-2*a*r/(a-r);else if(o===yl)x=-a/(a-r),S=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=x,c[14]=S,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=Zi,l=!1){const c=this.elements,u=2/(t-e),h=2/(i-s),d=-(t+e)/(t-e),f=-(i+s)/(i-s);let x,S;if(l)x=1/(a-r),S=a/(a-r);else if(o===Zi)x=-2/(a-r),S=-(a+r)/(a-r);else if(o===yl)x=-1/(a-r),S=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=h,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=x,c[14]=S,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}};cu.prototype.isMatrix4=!0;let Jt=cu;const fa=new L,Ii=new Jt,g1=new L(0,0,0),_1=new L(1,1,1),Us=new L,Kl=new L,fi=new L,gm=new Jt,_m=new ir;class sr{constructor(e=0,t=0,i=0,s=sr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],h=s[2],d=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(Ut(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ut(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ut(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ut(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ut(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Ut(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:vt("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return gm.makeRotationFromQuaternion(e),this.setFromRotationMatrix(gm,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return _m.setFromEuler(this),this.setFromQuaternion(_m,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}sr.DEFAULT_ORDER="XYZ";class kf{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let x1=0;const xm=new L,pa=new ir,us=new Jt,$l=new L,Go=new L,v1=new L,b1=new ir,vm=new L(1,0,0),bm=new L(0,1,0),ym=new L(0,0,1),Mm={type:"added"},y1={type:"removed"},ma={type:"childadded",child:null},xd={type:"childremoved",child:null};class En extends ar{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:x1++}),this.uuid=Qs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=En.DEFAULT_UP.clone();const e=new L,t=new sr,i=new ir,s=new L(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Jt},normalMatrix:{value:new Ct}}),this.matrix=new Jt,this.matrixWorld=new Jt,this.matrixAutoUpdate=En.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=En.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new kf,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return pa.setFromAxisAngle(e,t),this.quaternion.multiply(pa),this}rotateOnWorldAxis(e,t){return pa.setFromAxisAngle(e,t),this.quaternion.premultiply(pa),this}rotateX(e){return this.rotateOnAxis(vm,e)}rotateY(e){return this.rotateOnAxis(bm,e)}rotateZ(e){return this.rotateOnAxis(ym,e)}translateOnAxis(e,t){return xm.copy(e).applyQuaternion(this.quaternion),this.position.add(xm.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(vm,e)}translateY(e){return this.translateOnAxis(bm,e)}translateZ(e){return this.translateOnAxis(ym,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(us.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?$l.copy(e):$l.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Go.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?us.lookAt(Go,$l,this.up):us.lookAt($l,Go,this.up),this.quaternion.setFromRotationMatrix(us),s&&(us.extractRotation(s.matrixWorld),pa.setFromRotationMatrix(us),this.quaternion.premultiply(pa.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Bt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Mm),ma.child=e,this.dispatchEvent(ma),ma.child=null):Bt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(y1),xd.child=e,this.dispatchEvent(xd),xd.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),us.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),us.multiply(e.parent.matrixWorld)),e.applyMatrix4(us),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Mm),ma.child=e,this.dispatchEvent(ma),ma.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Go,e,v1),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Go,b1,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];r(e.shapes,h)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),h=a(e.shapes),d=a(e.skeletons),f=a(e.animations),x=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),d.length>0&&(i.skeletons=d),f.length>0&&(i.animations=f),x.length>0&&(i.nodes=x)}return i.object=s,i;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}En.DEFAULT_UP=new L(0,1,0);En.DEFAULT_MATRIX_AUTO_UPDATE=!0;En.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class gt extends En{constructor(){super(),this.isGroup=!0,this.type="Group"}}const M1={type:"move"};class vd{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new gt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new gt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new gt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const S of e.hand.values()){const m=t.getJointPose(S,i),p=this._getHandJoint(c,S);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,x=.005;c.inputState.pinching&&d>f+x?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-x&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(M1)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new gt;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const r_={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Fs={h:0,s:0,l:0},Zl={h:0,s:0,l:0};function bd(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class $e{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ti){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Gt.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=Gt.workingColorSpace){return this.r=e,this.g=t,this.b=i,Gt.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=Gt.workingColorSpace){if(e=l1(e,1),t=Ut(t,0,1),i=Ut(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=bd(a,r,e+1/3),this.g=bd(a,r,e),this.b=bd(a,r,e-1/3)}return Gt.colorSpaceToWorking(this,s),this}setStyle(e,t=Ti){function i(r){r!==void 0&&parseFloat(r)<1&&vt("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:vt("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);vt("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ti){const i=r_[e.toLowerCase()];return i!==void 0?this.setHex(i,t):vt("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ys(e.r),this.g=ys(e.g),this.b=ys(e.b),this}copyLinearToSRGB(e){return this.r=Ha(e.r),this.g=Ha(e.g),this.b=Ha(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ti){return Gt.workingToColorSpace(Yn.copy(this),e),Math.round(Ut(Yn.r*255,0,255))*65536+Math.round(Ut(Yn.g*255,0,255))*256+Math.round(Ut(Yn.b*255,0,255))}getHexString(e=Ti){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Gt.workingColorSpace){Gt.workingToColorSpace(Yn.copy(this),t);const i=Yn.r,s=Yn.g,r=Yn.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const h=a-o;switch(c=u<=.5?h/(a+o):h/(2-a-o),a){case i:l=(s-r)/h+(s<r?6:0);break;case s:l=(r-i)/h+2;break;case r:l=(i-s)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Gt.workingColorSpace){return Gt.workingToColorSpace(Yn.copy(this),t),e.r=Yn.r,e.g=Yn.g,e.b=Yn.b,e}getStyle(e=Ti){Gt.workingToColorSpace(Yn.copy(this),e);const t=Yn.r,i=Yn.g,s=Yn.b;return e!==Ti?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(Fs),this.setHSL(Fs.h+e,Fs.s+t,Fs.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Fs),e.getHSL(Zl);const i=fd(Fs.h,Zl.h,t),s=fd(Fs.s,Zl.s,t),r=fd(Fs.l,Zl.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Yn=new $e;$e.NAMES=r_;class S1 extends En{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new sr,this.environmentIntensity=1,this.environmentRotation=new sr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Li=new L,ds=new L,yd=new L,hs=new L,ga=new L,_a=new L,Sm=new L,Md=new L,Sd=new L,wd=new L,Ed=new _n,Td=new _n,Ad=new _n;class vi{constructor(e=new L,t=new L,i=new L){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Li.subVectors(e,t),s.cross(Li);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){Li.subVectors(s,t),ds.subVectors(i,t),yd.subVectors(e,t);const a=Li.dot(Li),o=Li.dot(ds),l=Li.dot(yd),c=ds.dot(ds),u=ds.dot(yd),h=a*c-o*o;if(h===0)return r.set(0,0,0),null;const d=1/h,f=(c*l-o*u)*d,x=(a*u-o*l)*d;return r.set(1-f-x,x,f)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,hs)===null?!1:hs.x>=0&&hs.y>=0&&hs.x+hs.y<=1}static getInterpolation(e,t,i,s,r,a,o,l){return this.getBarycoord(e,t,i,s,hs)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,hs.x),l.addScaledVector(a,hs.y),l.addScaledVector(o,hs.z),l)}static getInterpolatedAttribute(e,t,i,s,r,a){return Ed.setScalar(0),Td.setScalar(0),Ad.setScalar(0),Ed.fromBufferAttribute(e,t),Td.fromBufferAttribute(e,i),Ad.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Ed,r.x),a.addScaledVector(Td,r.y),a.addScaledVector(Ad,r.z),a}static isFrontFacing(e,t,i,s){return Li.subVectors(i,t),ds.subVectors(e,t),Li.cross(ds).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Li.subVectors(this.c,this.b),ds.subVectors(this.a,this.b),Li.cross(ds).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return vi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return vi.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return vi.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return vi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return vi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let a,o;ga.subVectors(s,i),_a.subVectors(r,i),Md.subVectors(e,i);const l=ga.dot(Md),c=_a.dot(Md);if(l<=0&&c<=0)return t.copy(i);Sd.subVectors(e,s);const u=ga.dot(Sd),h=_a.dot(Sd);if(u>=0&&h<=u)return t.copy(s);const d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(i).addScaledVector(ga,a);wd.subVectors(e,r);const f=ga.dot(wd),x=_a.dot(wd);if(x>=0&&f<=x)return t.copy(r);const S=f*c-l*x;if(S<=0&&c>=0&&x<=0)return o=c/(c-x),t.copy(i).addScaledVector(_a,o);const m=u*x-f*h;if(m<=0&&h-u>=0&&f-x>=0)return Sm.subVectors(r,s),o=(h-u)/(h-u+(f-x)),t.copy(s).addScaledVector(Sm,o);const p=1/(m+S+d);return a=S*p,o=d*p,t.copy(i).addScaledVector(ga,a).addScaledVector(_a,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Hr{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Ni.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Ni.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Ni.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Ni):Ni.fromBufferAttribute(r,a),Ni.applyMatrix4(e.matrixWorld),this.expandByPoint(Ni);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),jl.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),jl.copy(i.boundingBox)),jl.applyMatrix4(e.matrixWorld),this.union(jl)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ni),Ni.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(zo),Jl.subVectors(this.max,zo),xa.subVectors(e.a,zo),va.subVectors(e.b,zo),ba.subVectors(e.c,zo),Os.subVectors(va,xa),ks.subVectors(ba,va),wr.subVectors(xa,ba);let t=[0,-Os.z,Os.y,0,-ks.z,ks.y,0,-wr.z,wr.y,Os.z,0,-Os.x,ks.z,0,-ks.x,wr.z,0,-wr.x,-Os.y,Os.x,0,-ks.y,ks.x,0,-wr.y,wr.x,0];return!Cd(t,xa,va,ba,Jl)||(t=[1,0,0,0,1,0,0,0,1],!Cd(t,xa,va,ba,Jl))?!1:(Ql.crossVectors(Os,ks),t=[Ql.x,Ql.y,Ql.z],Cd(t,xa,va,ba,Jl))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ni).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ni).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(fs[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),fs[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),fs[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),fs[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),fs[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),fs[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),fs[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),fs[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(fs),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const fs=[new L,new L,new L,new L,new L,new L,new L,new L],Ni=new L,jl=new Hr,xa=new L,va=new L,ba=new L,Os=new L,ks=new L,wr=new L,zo=new L,Jl=new L,Ql=new L,Er=new L;function Cd(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){Er.fromArray(n,r);const o=s.x*Math.abs(Er.x)+s.y*Math.abs(Er.y)+s.z*Math.abs(Er.z),l=e.dot(Er),c=t.dot(Er),u=i.dot(Er);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const An=new L,ec=new ut;let w1=0;class gn extends ar{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:w1++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Qh,this.updateRanges=[],this.gpuType=Fi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)ec.fromBufferAttribute(this,t),ec.applyMatrix3(e),this.setXY(t,ec.x,ec.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)An.fromBufferAttribute(this,t),An.applyMatrix3(e),this.setXYZ(t,An.x,An.y,An.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)An.fromBufferAttribute(this,t),An.applyMatrix4(e),this.setXYZ(t,An.x,An.y,An.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)An.fromBufferAttribute(this,t),An.applyNormalMatrix(e),this.setXYZ(t,An.x,An.y,An.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)An.fromBufferAttribute(this,t),An.transformDirection(e),this.setXYZ(t,An.x,An.y,An.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Ki(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=en(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ki(t,this.array)),t}setX(e,t){return this.normalized&&(t=en(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ki(t,this.array)),t}setY(e,t){return this.normalized&&(t=en(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ki(t,this.array)),t}setZ(e,t){return this.normalized&&(t=en(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ki(t,this.array)),t}setW(e,t){return this.normalized&&(t=en(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=en(t,this.array),i=en(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=en(t,this.array),i=en(i,this.array),s=en(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=en(t,this.array),i=en(i,this.array),s=en(s,this.array),r=en(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Qh&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class a_ extends gn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class o_ extends gn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class $t extends gn{constructor(e,t,i){super(new Float32Array(e),t,i)}}const E1=new Hr,Ho=new L,Rd=new L;class Vr{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):E1.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ho.subVectors(e,this.center);const t=Ho.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Ho,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Rd.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ho.copy(e.center).add(Rd)),this.expandByPoint(Ho.copy(e.center).sub(Rd))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let T1=0;const wi=new Jt,Pd=new En,ya=new L,pi=new Hr,Vo=new Hr,Fn=new L;class jt extends ar{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:T1++}),this.uuid=Qs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(s1(e)?o_:a_)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Ct().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return wi.makeRotationFromQuaternion(e),this.applyMatrix4(wi),this}rotateX(e){return wi.makeRotationX(e),this.applyMatrix4(wi),this}rotateY(e){return wi.makeRotationY(e),this.applyMatrix4(wi),this}rotateZ(e){return wi.makeRotationZ(e),this.applyMatrix4(wi),this}translate(e,t,i){return wi.makeTranslation(e,t,i),this.applyMatrix4(wi),this}scale(e,t,i){return wi.makeScale(e,t,i),this.applyMatrix4(wi),this}lookAt(e){return Pd.lookAt(e),Pd.updateMatrix(),this.applyMatrix4(Pd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ya).negate(),this.translate(ya.x,ya.y,ya.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new $t(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&vt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Hr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Bt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];pi.setFromBufferAttribute(r),this.morphTargetsRelative?(Fn.addVectors(this.boundingBox.min,pi.min),this.boundingBox.expandByPoint(Fn),Fn.addVectors(this.boundingBox.max,pi.max),this.boundingBox.expandByPoint(Fn)):(this.boundingBox.expandByPoint(pi.min),this.boundingBox.expandByPoint(pi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Bt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Vr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Bt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){const i=this.boundingSphere.center;if(pi.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Vo.setFromBufferAttribute(o),this.morphTargetsRelative?(Fn.addVectors(pi.min,Vo.min),pi.expandByPoint(Fn),Fn.addVectors(pi.max,Vo.max),pi.expandByPoint(Fn)):(pi.expandByPoint(Vo.min),pi.expandByPoint(Vo.max))}pi.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)Fn.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Fn));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Fn.fromBufferAttribute(o,c),l&&(ya.fromBufferAttribute(e,c),Fn.add(ya)),s=Math.max(s,i.distanceToSquared(Fn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Bt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Bt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new gn(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let v=0;v<i.count;v++)o[v]=new L,l[v]=new L;const c=new L,u=new L,h=new L,d=new ut,f=new ut,x=new ut,S=new L,m=new L;function p(v,A,F){c.fromBufferAttribute(i,v),u.fromBufferAttribute(i,A),h.fromBufferAttribute(i,F),d.fromBufferAttribute(r,v),f.fromBufferAttribute(r,A),x.fromBufferAttribute(r,F),u.sub(c),h.sub(c),f.sub(d),x.sub(d);const k=1/(f.x*x.y-x.x*f.y);isFinite(k)&&(S.copy(u).multiplyScalar(x.y).addScaledVector(h,-f.y).multiplyScalar(k),m.copy(h).multiplyScalar(f.x).addScaledVector(u,-x.x).multiplyScalar(k),o[v].add(S),o[A].add(S),o[F].add(S),l[v].add(m),l[A].add(m),l[F].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let v=0,A=y.length;v<A;++v){const F=y[v],k=F.start,U=F.count;for(let Q=k,le=k+U;Q<le;Q+=3)p(e.getX(Q+0),e.getX(Q+1),e.getX(Q+2))}const R=new L,M=new L,P=new L,T=new L;function I(v){P.fromBufferAttribute(s,v),T.copy(P);const A=o[v];R.copy(A),R.sub(P.multiplyScalar(P.dot(A))).normalize(),M.crossVectors(T,A);const k=M.dot(l[v])<0?-1:1;a.setXYZW(v,R.x,R.y,R.z,k)}for(let v=0,A=y.length;v<A;++v){const F=y[v],k=F.start,U=F.count;for(let Q=k,le=k+U;Q<le;Q+=3)I(e.getX(Q+0)),I(e.getX(Q+1)),I(e.getX(Q+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new gn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,f=i.count;d<f;d++)i.setXYZ(d,0,0,0);const s=new L,r=new L,a=new L,o=new L,l=new L,c=new L,u=new L,h=new L;if(e)for(let d=0,f=e.count;d<f;d+=3){const x=e.getX(d+0),S=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,x),r.fromBufferAttribute(t,S),a.fromBufferAttribute(t,m),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),o.fromBufferAttribute(i,x),l.fromBufferAttribute(i,S),c.fromBufferAttribute(i,m),o.add(u),l.add(u),c.add(u),i.setXYZ(x,o.x,o.y,o.z),i.setXYZ(S,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),i.setXYZ(d+0,u.x,u.y,u.z),i.setXYZ(d+1,u.x,u.y,u.z),i.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Fn.fromBufferAttribute(e,t),Fn.normalize(),e.setXYZ(t,Fn.x,Fn.y,Fn.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,h=o.normalized,d=new c.constructor(l.length*u);let f=0,x=0;for(let S=0,m=l.length;S<m;S++){o.isInterleavedBufferAttribute?f=l[S]*o.data.stride+o.offset:f=l[S]*u;for(let p=0;p<u;p++)d[x++]=c[f++]}return new gn(d,u,h)}if(this.index===null)return vt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new jt,i=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,i);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let u=0,h=c.length;u<h;u++){const d=c[u],f=e(d,i);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){const f=c[h];u.push(f.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(t))}const r=e.morphAttributes;for(const c in r){const u=[],h=r[c];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class A1{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Qh,this.updateRanges=[],this.version=0,this.uuid=Qs()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Qs()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Qs()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const ei=new L;class au{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)ei.fromBufferAttribute(this,t),ei.applyMatrix4(e),this.setXYZ(t,ei.x,ei.y,ei.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)ei.fromBufferAttribute(this,t),ei.applyNormalMatrix(e),this.setXYZ(t,ei.x,ei.y,ei.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)ei.fromBufferAttribute(this,t),ei.transformDirection(e),this.setXYZ(t,ei.x,ei.y,ei.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=Ki(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=en(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=en(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=en(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=en(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=en(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Ki(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Ki(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Ki(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Ki(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=en(t,this.array),i=en(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=en(t,this.array),i=en(i,this.array),s=en(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=en(t,this.array),i=en(i,this.array),s=en(s,this.array),r=en(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){ru("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new gn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new au(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){ru("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let C1=0;class or extends ar{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:C1++}),this.uuid=Qs(),this.name="",this.type="Material",this.blending=Ga,this.side=nr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=hh,this.blendDst=fh,this.blendEquation=Pr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new $e(0,0,0),this.blendAlpha=0,this.depthFunc=Ya,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=um,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=da,this.stencilZFail=da,this.stencilZPass=da,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){vt(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){vt(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ga&&(i.blending=this.blending),this.side!==nr&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==hh&&(i.blendSrc=this.blendSrc),this.blendDst!==fh&&(i.blendDst=this.blendDst),this.blendEquation!==Pr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ya&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==um&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==da&&(i.stencilFail=this.stencilFail),this.stencilZFail!==da&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==da&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new $e().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new ut().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ut().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class zc extends or{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new $e(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Ma;const Wo=new L,Sa=new L,wa=new L,Ea=new ut,Xo=new ut,l_=new Jt,tc=new L,Yo=new L,nc=new L,wm=new ut,Dd=new ut,Em=new ut;class Id extends En{constructor(e=new zc){if(super(),this.isSprite=!0,this.type="Sprite",Ma===void 0){Ma=new jt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new A1(t,5);Ma.setIndex([0,1,2,0,2,3]),Ma.setAttribute("position",new au(i,3,0,!1)),Ma.setAttribute("uv",new au(i,2,3,!1))}this.geometry=Ma,this.material=e,this.center=new ut(.5,.5),this.count=1}raycast(e,t){e.camera===null&&Bt('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Sa.setFromMatrixScale(this.matrixWorld),l_.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),wa.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Sa.multiplyScalar(-wa.z);const i=this.material.rotation;let s,r;i!==0&&(r=Math.cos(i),s=Math.sin(i));const a=this.center;ic(tc.set(-.5,-.5,0),wa,a,Sa,s,r),ic(Yo.set(.5,-.5,0),wa,a,Sa,s,r),ic(nc.set(.5,.5,0),wa,a,Sa,s,r),wm.set(0,0),Dd.set(1,0),Em.set(1,1);let o=e.ray.intersectTriangle(tc,Yo,nc,!1,Wo);if(o===null&&(ic(Yo.set(-.5,.5,0),wa,a,Sa,s,r),Dd.set(0,1),o=e.ray.intersectTriangle(tc,nc,Yo,!1,Wo),o===null))return;const l=e.ray.origin.distanceTo(Wo);l<e.near||l>e.far||t.push({distance:l,point:Wo.clone(),uv:vi.getInterpolation(Wo,tc,Yo,nc,wm,Dd,Em,new ut),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function ic(n,e,t,i,s,r){Ea.subVectors(n,t).addScalar(.5).multiply(i),s!==void 0?(Xo.x=r*Ea.x-s*Ea.y,Xo.y=s*Ea.x+r*Ea.y):Xo.copy(Ea),n.copy(e),n.x+=Xo.x,n.y+=Xo.y,n.applyMatrix4(l_)}const ps=new L,Ld=new L,sc=new L,Bs=new L,Nd=new L,rc=new L,Ud=new L;class wl{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ps)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=ps.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ps.copy(this.origin).addScaledVector(this.direction,t),ps.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){Ld.copy(e).add(t).multiplyScalar(.5),sc.copy(t).sub(e).normalize(),Bs.copy(this.origin).sub(Ld);const r=e.distanceTo(t)*.5,a=-this.direction.dot(sc),o=Bs.dot(this.direction),l=-Bs.dot(sc),c=Bs.lengthSq(),u=Math.abs(1-a*a);let h,d,f,x;if(u>0)if(h=a*l-o,d=a*o-l,x=r*u,h>=0)if(d>=-x)if(d<=x){const S=1/u;h*=S,d*=S,f=h*(h+a*d+2*o)+d*(a*h+d+2*l)+c}else d=r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+c;else d=-r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+c;else d<=-x?(h=Math.max(0,-(-a*r+o)),d=h>0?-r:Math.min(Math.max(-r,-l),r),f=-h*h+d*(d+2*l)+c):d<=x?(h=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(h=Math.max(0,-(a*r+o)),d=h>0?r:Math.min(Math.max(-r,-l),r),f=-h*h+d*(d+2*l)+c);else d=a>0?-r:r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(Ld).addScaledVector(sc,d),f}intersectSphere(e,t){ps.subVectors(e.center,this.origin);const i=ps.dot(this.direction),s=ps.dot(ps)-i*i,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,s=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,s=(e.min.x-d.x)*c),u>=0?(r=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(r=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),h>=0?(o=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(o=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,ps)!==null}intersectTriangle(e,t,i,s,r){Nd.subVectors(t,e),rc.subVectors(i,e),Ud.crossVectors(Nd,rc);let a=this.direction.dot(Ud),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Bs.subVectors(this.origin,e);const l=o*this.direction.dot(rc.crossVectors(Bs,rc));if(l<0)return null;const c=o*this.direction.dot(Nd.cross(Bs));if(c<0||l+c>a)return null;const u=-o*Bs.dot(Ud);return u<0?null:this.at(u/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ye extends or{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new $e(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new sr,this.combine=Hg,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Tm=new Jt,Tr=new wl,ac=new Vr,Am=new L,oc=new L,lc=new L,cc=new L,Fd=new L,uc=new L,Cm=new L,dc=new L;class D extends En{constructor(e=new jt,t=new ye){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){uc.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=o[l],h=r[l];u!==0&&(Fd.fromBufferAttribute(h,e),a?uc.addScaledVector(Fd,u):uc.addScaledVector(Fd.sub(t),u))}t.add(uc)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ac.copy(i.boundingSphere),ac.applyMatrix4(r),Tr.copy(e.ray).recast(e.near),!(ac.containsPoint(Tr.origin)===!1&&(Tr.intersectSphere(ac,Am)===null||Tr.origin.distanceToSquared(Am)>(e.far-e.near)**2))&&(Tm.copy(r).invert(),Tr.copy(e.ray).applyMatrix4(Tm),!(i.boundingBox!==null&&Tr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Tr)))}_computeIntersections(e,t,i){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let x=0,S=d.length;x<S;x++){const m=d[x],p=a[m.materialIndex],y=Math.max(m.start,f.start),R=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let M=y,P=R;M<P;M+=3){const T=o.getX(M),I=o.getX(M+1),v=o.getX(M+2);s=hc(this,p,e,i,c,u,h,T,I,v),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const x=Math.max(0,f.start),S=Math.min(o.count,f.start+f.count);for(let m=x,p=S;m<p;m+=3){const y=o.getX(m),R=o.getX(m+1),M=o.getX(m+2);s=hc(this,a,e,i,c,u,h,y,R,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let x=0,S=d.length;x<S;x++){const m=d[x],p=a[m.materialIndex],y=Math.max(m.start,f.start),R=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let M=y,P=R;M<P;M+=3){const T=M,I=M+1,v=M+2;s=hc(this,p,e,i,c,u,h,T,I,v),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const x=Math.max(0,f.start),S=Math.min(l.count,f.start+f.count);for(let m=x,p=S;m<p;m+=3){const y=m,R=m+1,M=m+2;s=hc(this,a,e,i,c,u,h,y,R,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function R1(n,e,t,i,s,r,a,o){let l;if(e.side===vn?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,e.side===nr,o),l===null)return null;dc.copy(o),dc.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(dc);return c<t.near||c>t.far?null:{distance:c,point:dc.clone(),object:n}}function hc(n,e,t,i,s,r,a,o,l,c){n.getVertexPosition(o,oc),n.getVertexPosition(l,lc),n.getVertexPosition(c,cc);const u=R1(n,e,t,i,oc,lc,cc,Cm);if(u){const h=new L;vi.getBarycoord(Cm,oc,lc,cc,h),s&&(u.uv=vi.getInterpolatedAttribute(s,o,l,c,h,new ut)),r&&(u.uv1=vi.getInterpolatedAttribute(r,o,l,c,h,new ut)),a&&(u.normal=vi.getInterpolatedAttribute(a,o,l,c,h,new L),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new L,materialIndex:0};vi.getNormal(oc,lc,cc,d.normal),u.face=d,u.barycoord=h}return u}class c_ extends Zn{constructor(e=null,t=1,i=1,s,r,a,o,l,c=Hn,u=Hn,h,d){super(null,a,o,l,c,u,s,r,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Rm extends gn{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Ta=new Jt,Pm=new Jt,fc=[],Dm=new Hr,P1=new Jt,qo=new D,Ko=new Vr;class D1 extends D{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Rm(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,P1)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Hr),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Ta),Dm.copy(e.boundingBox).applyMatrix4(Ta),this.boundingBox.union(Dm)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Vr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Ta),Ko.copy(e.boundingSphere).applyMatrix4(Ta),this.boundingSphere.union(Ko)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,a=e*r+1;for(let o=0;o<i.length;o++)i[o]=s[a+o]}raycast(e,t){const i=this.matrixWorld,s=this.count;if(qo.geometry=this.geometry,qo.material=this.material,qo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ko.copy(this.boundingSphere),Ko.applyMatrix4(i),e.ray.intersectsSphere(Ko)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ta),Pm.multiplyMatrices(i,Ta),qo.matrixWorld=Pm,qo.raycast(e,fc);for(let a=0,o=fc.length;a<o;a++){const l=fc[a];l.instanceId=r,l.object=this,t.push(l)}fc.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Rm(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const i=t.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new c_(new Float32Array(s*this.count),s,this.count,Df,Fi));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<i.length;c++)a+=i[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;return r[l]=o,r.set(i,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Od=new L,I1=new L,L1=new Ct;class qs{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=Od.subVectors(i,t).cross(I1.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const s=e.delta(Od),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||L1.getNormalMatrix(e),s=this.coplanarPoint(Od).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ar=new Vr,N1=new ut(.5,.5),pc=new L;class Bf{constructor(e=new qs,t=new qs,i=new qs,s=new qs,r=new qs,a=new qs){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Zi,i=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],u=r[4],h=r[5],d=r[6],f=r[7],x=r[8],S=r[9],m=r[10],p=r[11],y=r[12],R=r[13],M=r[14],P=r[15];if(s[0].setComponents(c-a,f-u,p-x,P-y).normalize(),s[1].setComponents(c+a,f+u,p+x,P+y).normalize(),s[2].setComponents(c+o,f+h,p+S,P+R).normalize(),s[3].setComponents(c-o,f-h,p-S,P-R).normalize(),i)s[4].setComponents(l,d,m,M).normalize(),s[5].setComponents(c-l,f-d,p-m,P-M).normalize();else if(s[4].setComponents(c-l,f-d,p-m,P-M).normalize(),t===Zi)s[5].setComponents(c+l,f+d,p+m,P+M).normalize();else if(t===yl)s[5].setComponents(l,d,m,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ar.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ar.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ar)}intersectsSprite(e){Ar.center.set(0,0,0);const t=N1.distanceTo(e.center);return Ar.radius=.7071067811865476+t,Ar.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ar)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(pc.x=s.normal.x>0?e.max.x:e.min.x,pc.y=s.normal.y>0?e.max.y:e.min.y,pc.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(pc)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class gs extends or{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new $e(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const ou=new L,lu=new L,Im=new Jt,$o=new wl,mc=new Vr,kd=new L,Lm=new L;class Hc extends En{constructor(e=new jt,t=new gs){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)ou.fromBufferAttribute(t,s-1),lu.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=ou.distanceTo(lu);e.setAttribute("lineDistance",new $t(i,1))}else vt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),mc.copy(i.boundingSphere),mc.applyMatrix4(s),mc.radius+=r,e.ray.intersectsSphere(mc)===!1)return;Im.copy(s).invert(),$o.copy(e.ray).applyMatrix4(Im);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=i.index,d=i.attributes.position;if(u!==null){const f=Math.max(0,a.start),x=Math.min(u.count,a.start+a.count);for(let S=f,m=x-1;S<m;S+=c){const p=u.getX(S),y=u.getX(S+1),R=gc(this,e,$o,l,p,y,S);R&&t.push(R)}if(this.isLineLoop){const S=u.getX(x-1),m=u.getX(f),p=gc(this,e,$o,l,S,m,x-1);p&&t.push(p)}}else{const f=Math.max(0,a.start),x=Math.min(d.count,a.start+a.count);for(let S=f,m=x-1;S<m;S+=c){const p=gc(this,e,$o,l,S,S+1,S);p&&t.push(p)}if(this.isLineLoop){const S=gc(this,e,$o,l,x-1,f,x-1);S&&t.push(S)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function gc(n,e,t,i,s,r,a){const o=n.geometry.attributes.position;if(ou.fromBufferAttribute(o,s),lu.fromBufferAttribute(o,r),t.distanceSqToSegment(ou,lu,kd,Lm)>i)return;kd.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(kd);if(!(c<e.near||c>e.far))return{distance:c,point:Lm.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}const Nm=new L,Um=new L;class _c extends Hc{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let s=0,r=t.count;s<r;s+=2)Nm.fromBufferAttribute(t,s),Um.fromBufferAttribute(t,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+Nm.distanceTo(Um);e.setAttribute("lineDistance",new $t(i,1))}else vt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Ia extends or{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new $e(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Fm=new Jt,tf=new wl,xc=new Vr,vc=new L;class Zo extends En{constructor(e=new jt,t=new Ia){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),xc.copy(i.boundingSphere),xc.applyMatrix4(s),xc.radius+=r,e.ray.intersectsSphere(xc)===!1)return;Fm.copy(s).invert(),tf.copy(e.ray).applyMatrix4(Fm);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,h=i.attributes.position;if(c!==null){const d=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let x=d,S=f;x<S;x++){const m=c.getX(x);vc.fromBufferAttribute(h,m),Om(vc,m,l,s,e,t,this)}}else{const d=Math.max(0,a.start),f=Math.min(h.count,a.start+a.count);for(let x=d,S=f;x<S;x++)vc.fromBufferAttribute(h,x),Om(vc,x,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Om(n,e,t,i,s,r,a){const o=tf.distanceSqToPoint(n);if(o<t){const l=new L;tf.closestPointToPoint(n,l),l.applyMatrix4(i);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class u_ extends Zn{constructor(e=[],t=kr,i,s,r,a,o,l,c,u){super(e,t,i,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Cn extends Zn{constructor(e,t,i,s,r,a,o,l,c){super(e,t,i,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ka extends Zn{constructor(e,t,i=es,s,r,a,o=Hn,l=Hn,c,u=Es,h=1){if(u!==Es&&u!==Nr)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:h};super(d,s,r,a,o,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Of(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class U1 extends Ka{constructor(e,t=es,i=kr,s,r,a=Hn,o=Hn,l,c=Es){const u={width:e,height:e,depth:1},h=[u,u,u,u,u,u];super(e,e,t,i,s,r,a,o,l,c),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class d_ extends Zn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class xt extends jt{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],u=[],h=[];let d=0,f=0;x("z","y","x",-1,-1,i,t,e,a,r,0),x("z","y","x",1,-1,i,t,-e,a,r,1),x("x","z","y",1,1,e,i,t,s,a,2),x("x","z","y",1,-1,e,i,-t,s,a,3),x("x","y","z",1,-1,e,t,i,s,r,4),x("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new $t(c,3)),this.setAttribute("normal",new $t(u,3)),this.setAttribute("uv",new $t(h,2));function x(S,m,p,y,R,M,P,T,I,v,A){const F=M/I,k=P/v,U=M/2,Q=P/2,le=T/2,$=I+1,re=v+1;let Z=0,oe=0;const Ae=new L;for(let Ge=0;Ge<re;Ge++){const Fe=Ge*k-Q;for(let j=0;j<$;j++){const xe=j*F-U;Ae[S]=xe*y,Ae[m]=Fe*R,Ae[p]=le,c.push(Ae.x,Ae.y,Ae.z),Ae[S]=0,Ae[m]=0,Ae[p]=T>0?1:-1,u.push(Ae.x,Ae.y,Ae.z),h.push(j/I),h.push(1-Ge/v),Z+=1}}for(let Ge=0;Ge<v;Ge++)for(let Fe=0;Fe<I;Fe++){const j=d+Fe+$*Ge,xe=d+Fe+$*(Ge+1),pt=d+(Fe+1)+$*(Ge+1),At=d+(Fe+1)+$*Ge;l.push(j,xe,At),l.push(xe,pt,At),oe+=6}o.addGroup(f,oe,A),f+=oe,d+=Z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Gf extends jt{constructor(e=1,t=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:s},t=Math.max(3,t);const r=[],a=[],o=[],l=[],c=new L,u=new ut;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let h=0,d=3;h<=t;h++,d+=3){const f=i+h/t*s;c.x=e*Math.cos(f),c.y=e*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(a[d]/e+1)/2,u.y=(a[d+1]/e+1)/2,l.push(u.x,u.y)}for(let h=1;h<=t;h++)r.push(h,h+1,0);this.setIndex(r),this.setAttribute("position",new $t(a,3)),this.setAttribute("normal",new $t(o,3)),this.setAttribute("uv",new $t(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gf(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Et extends jt{constructor(e=1,t=1,i=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const u=[],h=[],d=[],f=[];let x=0;const S=[],m=i/2;let p=0;y(),a===!1&&(e>0&&R(!0),t>0&&R(!1)),this.setIndex(u),this.setAttribute("position",new $t(h,3)),this.setAttribute("normal",new $t(d,3)),this.setAttribute("uv",new $t(f,2));function y(){const M=new L,P=new L;let T=0;const I=(t-e)/i;for(let v=0;v<=r;v++){const A=[],F=v/r,k=F*(t-e)+e;for(let U=0;U<=s;U++){const Q=U/s,le=Q*l+o,$=Math.sin(le),re=Math.cos(le);P.x=k*$,P.y=-F*i+m,P.z=k*re,h.push(P.x,P.y,P.z),M.set($,I,re).normalize(),d.push(M.x,M.y,M.z),f.push(Q,1-F),A.push(x++)}S.push(A)}for(let v=0;v<s;v++)for(let A=0;A<r;A++){const F=S[A][v],k=S[A+1][v],U=S[A+1][v+1],Q=S[A][v+1];(e>0||A!==0)&&(u.push(F,k,Q),T+=3),(t>0||A!==r-1)&&(u.push(k,U,Q),T+=3)}c.addGroup(p,T,0),p+=T}function R(M){const P=x,T=new ut,I=new L;let v=0;const A=M===!0?e:t,F=M===!0?1:-1;for(let U=1;U<=s;U++)h.push(0,m*F,0),d.push(0,F,0),f.push(.5,.5),x++;const k=x;for(let U=0;U<=s;U++){const le=U/s*l+o,$=Math.cos(le),re=Math.sin(le);I.x=A*re,I.y=m*F,I.z=A*$,h.push(I.x,I.y,I.z),d.push(0,F,0),T.x=$*.5+.5,T.y=re*.5*F+.5,f.push(T.x,T.y),x++}for(let U=0;U<s;U++){const Q=P+U,le=k+U;M===!0?u.push(le,le+1,Q):u.push(le+1,le,Q),v+=3}c.addGroup(p,v,M===!0?1:2),p+=v}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Et(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class xn extends Et{constructor(e=1,t=1,i=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,i,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new xn(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class El extends jt{constructor(e=[],t=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:s};const r=[],a=[];o(s),c(i),u(),this.setAttribute("position",new $t(r,3)),this.setAttribute("normal",new $t(r.slice(),3)),this.setAttribute("uv",new $t(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(y){const R=new L,M=new L,P=new L;for(let T=0;T<t.length;T+=3)f(t[T+0],R),f(t[T+1],M),f(t[T+2],P),l(R,M,P,y)}function l(y,R,M,P){const T=P+1,I=[];for(let v=0;v<=T;v++){I[v]=[];const A=y.clone().lerp(M,v/T),F=R.clone().lerp(M,v/T),k=T-v;for(let U=0;U<=k;U++)U===0&&v===T?I[v][U]=A:I[v][U]=A.clone().lerp(F,U/k)}for(let v=0;v<T;v++)for(let A=0;A<2*(T-v)-1;A++){const F=Math.floor(A/2);A%2===0?(d(I[v][F+1]),d(I[v+1][F]),d(I[v][F])):(d(I[v][F+1]),d(I[v+1][F+1]),d(I[v+1][F]))}}function c(y){const R=new L;for(let M=0;M<r.length;M+=3)R.x=r[M+0],R.y=r[M+1],R.z=r[M+2],R.normalize().multiplyScalar(y),r[M+0]=R.x,r[M+1]=R.y,r[M+2]=R.z}function u(){const y=new L;for(let R=0;R<r.length;R+=3){y.x=r[R+0],y.y=r[R+1],y.z=r[R+2];const M=m(y)/2/Math.PI+.5,P=p(y)/Math.PI+.5;a.push(M,1-P)}x(),h()}function h(){for(let y=0;y<a.length;y+=6){const R=a[y+0],M=a[y+2],P=a[y+4],T=Math.max(R,M,P),I=Math.min(R,M,P);T>.9&&I<.1&&(R<.2&&(a[y+0]+=1),M<.2&&(a[y+2]+=1),P<.2&&(a[y+4]+=1))}}function d(y){r.push(y.x,y.y,y.z)}function f(y,R){const M=y*3;R.x=e[M+0],R.y=e[M+1],R.z=e[M+2]}function x(){const y=new L,R=new L,M=new L,P=new L,T=new ut,I=new ut,v=new ut;for(let A=0,F=0;A<r.length;A+=9,F+=6){y.set(r[A+0],r[A+1],r[A+2]),R.set(r[A+3],r[A+4],r[A+5]),M.set(r[A+6],r[A+7],r[A+8]),T.set(a[F+0],a[F+1]),I.set(a[F+2],a[F+3]),v.set(a[F+4],a[F+5]),P.copy(y).add(R).add(M).divideScalar(3);const k=m(P);S(T,F+0,y,k),S(I,F+2,R,k),S(v,F+4,M,k)}}function S(y,R,M,P){P<0&&y.x===1&&(a[R]=y.x-1),M.x===0&&M.z===0&&(a[R]=P/2/Math.PI+.5)}function m(y){return Math.atan2(y.z,-y.x)}function p(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new El(e.vertices,e.indices,e.radius,e.detail)}}class Dr extends El{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,s=1/i,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-i,0,-s,i,0,s,-i,0,s,i,-s,-i,0,-s,i,0,s,-i,0,s,i,0,-i,0,-s,i,0,-s,-i,0,s,i,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Dr(e.radius,e.detail)}}const bc=new L,yc=new L,Bd=new L,Mc=new vi;class km extends jt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const s=Math.pow(10,4),r=Math.cos(ul*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],u=["a","b","c"],h=new Array(3),d={},f=[];for(let x=0;x<l;x+=3){a?(c[0]=a.getX(x),c[1]=a.getX(x+1),c[2]=a.getX(x+2)):(c[0]=x,c[1]=x+1,c[2]=x+2);const{a:S,b:m,c:p}=Mc;if(S.fromBufferAttribute(o,c[0]),m.fromBufferAttribute(o,c[1]),p.fromBufferAttribute(o,c[2]),Mc.getNormal(Bd),h[0]=`${Math.round(S.x*s)},${Math.round(S.y*s)},${Math.round(S.z*s)}`,h[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,h[2]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,!(h[0]===h[1]||h[1]===h[2]||h[2]===h[0]))for(let y=0;y<3;y++){const R=(y+1)%3,M=h[y],P=h[R],T=Mc[u[y]],I=Mc[u[R]],v=`${M}_${P}`,A=`${P}_${M}`;A in d&&d[A]?(Bd.dot(d[A].normal)<=r&&(f.push(T.x,T.y,T.z),f.push(I.x,I.y,I.z)),d[A]=null):v in d||(d[v]={index0:c[y],index1:c[R],normal:Bd.clone()})}}for(const x in d)if(d[x]){const{index0:S,index1:m}=d[x];bc.fromBufferAttribute(o,S),yc.fromBufferAttribute(o,m),f.push(bc.x,bc.y,bc.z),f.push(yc.x,yc.y,yc.z)}this.setAttribute("position",new $t(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class zf extends El{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new zf(e.radius,e.detail)}}class Ks extends El{constructor(e=1,t=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Ks(e.radius,e.detail)}}class Fr extends jt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(i),l=Math.floor(s),c=o+1,u=l+1,h=e/o,d=t/l,f=[],x=[],S=[],m=[];for(let p=0;p<u;p++){const y=p*d-a;for(let R=0;R<c;R++){const M=R*h-r;x.push(M,-y,0),S.push(0,0,1),m.push(R/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let y=0;y<o;y++){const R=y+c*p,M=y+c*(p+1),P=y+1+c*(p+1),T=y+1+c*p;f.push(R,M,T),f.push(M,P,T)}this.setIndex(f),this.setAttribute("position",new $t(x,3)),this.setAttribute("normal",new $t(S,3)),this.setAttribute("uv",new $t(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Fr(e.width,e.height,e.widthSegments,e.heightSegments)}}class On extends jt{constructor(e=.5,t=1,i=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:a},i=Math.max(3,i),s=Math.max(1,s);const o=[],l=[],c=[],u=[];let h=e;const d=(t-e)/s,f=new L,x=new ut;for(let S=0;S<=s;S++){for(let m=0;m<=i;m++){const p=r+m/i*a;f.x=h*Math.cos(p),f.y=h*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),x.x=(f.x/t+1)/2,x.y=(f.y/t+1)/2,u.push(x.x,x.y)}h+=d}for(let S=0;S<s;S++){const m=S*(i+1);for(let p=0;p<i;p++){const y=p+m,R=y,M=y+i+1,P=y+i+2,T=y+1;o.push(R,M,T),o.push(M,P,T)}}this.setIndex(o),this.setAttribute("position",new $t(l,3)),this.setAttribute("normal",new $t(c,3)),this.setAttribute("uv",new $t(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new On(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Te extends jt{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const u=[],h=new L,d=new L,f=[],x=[],S=[],m=[];for(let p=0;p<=i;p++){const y=[],R=p/i,M=a+R*o,P=e*Math.cos(M),T=Math.sqrt(e*e-P*P);let I=0;p===0&&a===0?I=.5/t:p===i&&l===Math.PI&&(I=-.5/t);for(let v=0;v<=t;v++){const A=v/t,F=s+A*r;h.x=-T*Math.cos(F),h.y=P,h.z=T*Math.sin(F),x.push(h.x,h.y,h.z),d.copy(h).normalize(),S.push(d.x,d.y,d.z),m.push(A+I,1-R),y.push(c++)}u.push(y)}for(let p=0;p<i;p++)for(let y=0;y<t;y++){const R=u[p][y+1],M=u[p][y],P=u[p+1][y],T=u[p+1][y+1];(p!==0||a>0)&&f.push(R,M,T),(p!==i-1||l<Math.PI)&&f.push(M,P,T)}this.setIndex(f),this.setAttribute("position",new $t(x,3)),this.setAttribute("normal",new $t(S,3)),this.setAttribute("uv",new $t(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Te(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class kn extends jt{constructor(e=1,t=.4,i=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},i=Math.floor(i),s=Math.floor(s);const l=[],c=[],u=[],h=[],d=new L,f=new L,x=new L;for(let S=0;S<=i;S++){const m=a+S/i*o;for(let p=0;p<=s;p++){const y=p/s*r;f.x=(e+t*Math.cos(m))*Math.cos(y),f.y=(e+t*Math.cos(m))*Math.sin(y),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),d.x=e*Math.cos(y),d.y=e*Math.sin(y),x.subVectors(f,d).normalize(),u.push(x.x,x.y,x.z),h.push(p/s),h.push(S/i)}}for(let S=1;S<=i;S++)for(let m=1;m<=s;m++){const p=(s+1)*S+m-1,y=(s+1)*(S-1)+m-1,R=(s+1)*(S-1)+m,M=(s+1)*S+m;l.push(p,y,M),l.push(y,R,M)}this.setIndex(l),this.setAttribute("position",new $t(c,3)),this.setAttribute("normal",new $t(u,3)),this.setAttribute("uv",new $t(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new kn(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}function $a(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];if(Bm(s))s.isRenderTargetTexture?(vt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone();else if(Array.isArray(s))if(Bm(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][i]=r}else e[t][i]=s.slice();else e[t][i]=s}}return e}function ni(n){const e={};for(let t=0;t<n.length;t++){const i=$a(n[t]);for(const s in i)e[s]=i[s]}return e}function Bm(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function F1(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function h_(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Gt.workingColorSpace}const O1={clone:$a,merge:ni};var k1=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,B1=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ts extends or{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=k1,this.fragmentShader=B1,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=$a(e.uniforms),this.uniformsGroups=F1(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const s=e.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=t[s.value]||null;break;case"c":this.uniforms[i].value=new $e().setHex(s.value);break;case"v2":this.uniforms[i].value=new ut().fromArray(s.value);break;case"v3":this.uniforms[i].value=new L().fromArray(s.value);break;case"v4":this.uniforms[i].value=new _n().fromArray(s.value);break;case"m3":this.uniforms[i].value=new Ct().fromArray(s.value);break;case"m4":this.uniforms[i].value=new Jt().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class G1 extends ts{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Ue extends or{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new $e(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new $e(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Jh,this.normalScale=new ut(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new sr,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class z1 extends or{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ZM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class H1 extends or{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Hf extends En{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new $e(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const Gd=new Jt,Gm=new L,zm=new L;class f_{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ut(512,512),this.mapType=xi,this.map=null,this.mapPass=null,this.matrix=new Jt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Bf,this._frameExtents=new ut(1,1),this._viewportCount=1,this._viewports=[new _n(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Gm.setFromMatrixPosition(e.matrixWorld),t.position.copy(Gm),zm.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(zm),t.updateMatrixWorld(),Gd.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Gd,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===yl||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Gd)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Sc=new L,wc=new ir,Vi=new L;class p_ extends En{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Jt,this.projectionMatrix=new Jt,this.projectionMatrixInverse=new Jt,this.coordinateSystem=Zi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Sc,wc,Vi),Vi.x===1&&Vi.y===1&&Vi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Sc,wc,Vi.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Sc,wc,Vi),Vi.x===1&&Vi.y===1&&Vi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Sc,wc,Vi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Gs=new L,Hm=new ut,Vm=new ut;class gi extends p_{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ef*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ul*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ef*2*Math.atan(Math.tan(ul*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Gs.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Gs.x,Gs.y).multiplyScalar(-e/Gs.z),Gs.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Gs.x,Gs.y).multiplyScalar(-e/Gs.z)}getViewSize(e,t){return this.getViewBounds(e,Hm,Vm),t.subVectors(Vm,Hm)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ul*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class V1 extends f_{constructor(){super(new gi(90,1,.5,500)),this.isPointLightShadow=!0}}class W1 extends Hf{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new V1}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class Vf extends p_{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,a=i+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class X1 extends f_{constructor(){super(new Vf(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Y1 extends Hf{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(En.DEFAULT_UP),this.updateMatrix(),this.target=new En,this.shadow=new X1}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class q1 extends Hf{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const Aa=-90,Ca=1;class K1 extends En{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new gi(Aa,Ca,e,t);s.layers=this.layers,this.add(s);const r=new gi(Aa,Ca,e,t);r.layers=this.layers,this.add(r);const a=new gi(Aa,Ca,e,t);a.layers=this.layers,this.add(a);const o=new gi(Aa,Ca,e,t);o.layers=this.layers,this.add(o);const l=new gi(Aa,Ca,e,t);l.layers=this.layers,this.add(l);const c=new gi(Aa,Ca,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===Zi)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===yl)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;const S=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=S,e.setRenderTarget(i,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(h,d,f),e.xr.enabled=x,i.texture.needsPMREMUpdate=!0}}class $1 extends gi{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Wm=new Jt;class Z1{constructor(e,t,i=0,s=1/0){this.ray=new wl(e,t),this.near=i,this.far=s,this.camera=null,this.layers=new kf,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Bt("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Wm.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Wm),this}intersectObject(e,t=!0,i=[]){return nf(e,this,i,t),i.sort(Xm),i}intersectObjects(e,t=!0,i=[]){for(let s=0,r=e.length;s<r;s++)nf(e[s],this,i,t);return i.sort(Xm),i}}function Xm(n,e){return n.distance-e.distance}function nf(n,e,t,i){let s=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let a=0,o=r.length;a<o;a++)nf(r[a],e,t,!0)}}class Ym{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Ut(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Ut(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const $f=class $f{constructor(e,t,i,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=s,this}};$f.prototype.isMatrix2=!0;let qm=$f;class j1 extends ar{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){vt("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function Km(n,e,t,i){const s=J1(i);switch(t){case t_:return n*e;case Df:return n*e/s.components*s.byteLength;case If:return n*e/s.components*s.byteLength;case Br:return n*e*2/s.components*s.byteLength;case Lf:return n*e*2/s.components*s.byteLength;case n_:return n*e*3/s.components*s.byteLength;case Oi:return n*e*4/s.components*s.byteLength;case Nf:return n*e*4/s.components*s.byteLength;case Oc:case kc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Bc:case Gc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Sh:case Eh:return Math.max(n,16)*Math.max(e,8)/4;case Mh:case wh:return Math.max(n,8)*Math.max(e,8)/2;case Th:case Ah:case Rh:case Ph:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ch:case eu:case Dh:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ih:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Lh:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Nh:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Uh:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Fh:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Oh:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case kh:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Bh:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Gh:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case zh:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Hh:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Vh:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Wh:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Xh:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Yh:case qh:case Kh:return Math.ceil(n/4)*Math.ceil(e/4)*16;case $h:case Zh:return Math.ceil(n/4)*Math.ceil(e/4)*8;case tu:case jh:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function J1(n){switch(n){case xi:case jg:return{byteLength:1,components:1};case vl:case Jg:case ws:return{byteLength:2,components:1};case Rf:case Pf:return{byteLength:2,components:4};case es:case Cf:case Fi:return{byteLength:4,components:1};case Qg:case e_:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Af}}));typeof window<"u"&&(window.__THREE__?vt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Af);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function m_(){let n=null,e=!1,t=null,i=null;function s(r,a){t(r,a),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function Q1(n){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,h=c.byteLength,d=n.createBuffer();n.bindBuffer(l,d),n.bufferData(l,c,u),o.onUploadCallback();let f;if(c instanceof Float32Array)f=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=n.SHORT;else if(c instanceof Uint32Array)f=n.UNSIGNED_INT;else if(c instanceof Int32Array)f=n.INT;else if(c instanceof Int8Array)f=n.BYTE;else if(c instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function i(o,l,c){const u=l.array,h=l.updateRanges;if(n.bindBuffer(c,o),h.length===0)n.bufferSubData(c,0,u);else{h.sort((f,x)=>f.start-x.start);let d=0;for(let f=1;f<h.length;f++){const x=h[d],S=h[f];S.start<=x.start+x.count+1?x.count=Math.max(x.count,S.start+S.count-x.start):(++d,h[d]=S)}h.length=d+1;for(let f=0,x=h.length;f<x;f++){const S=h[f];n.bufferSubData(c,S.start*u.BYTES_PER_ELEMENT,u,S.start,S.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var eS=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,tS=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,nS=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,iS=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,sS=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,rS=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aS=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,oS=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,lS=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,cS=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,uS=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,dS=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,hS=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,fS=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,pS=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,mS=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,gS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,_S=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,xS=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,vS=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,bS=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,yS=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,MS=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,SS=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,wS=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,ES=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,TS=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,AS=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,CS=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,RS=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,PS="gl_FragColor = linearToOutputTexel( gl_FragColor );",DS=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,IS=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,LS=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,NS=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,US=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,FS=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,OS=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,kS=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,BS=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,GS=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,zS=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,HS=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,VS=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,WS=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,XS=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,YS=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,qS=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,KS=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,$S=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ZS=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,jS=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,JS=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,QS=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,ew=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,tw=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,nw=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,iw=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,sw=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,rw=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,aw=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ow=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,lw=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,cw=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,uw=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,dw=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,hw=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,fw=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,pw=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,mw=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,gw=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,_w=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,xw=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,vw=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,bw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,yw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Mw=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Sw=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,ww=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ew=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Tw=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Aw=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Cw=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Rw=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Pw=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Dw=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Iw=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Lw=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Nw=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Uw=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Fw=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Ow=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,kw=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Bw=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Gw=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,zw=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Hw=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Vw=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Ww=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Xw=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Yw=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,qw=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Kw=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,$w=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Zw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,jw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Jw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Qw=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const eE=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,tE=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,nE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,iE=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rE=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,aE=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,oE=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,lE=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,cE=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,uE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,dE=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hE=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,fE=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,pE=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,mE=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gE=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_E=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xE=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,vE=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,bE=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,yE=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,ME=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,SE=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wE=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,EE=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,TE=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,AE=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,CE=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,RE=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,PE=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,DE=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,IE=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,LE=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,It={alphahash_fragment:eS,alphahash_pars_fragment:tS,alphamap_fragment:nS,alphamap_pars_fragment:iS,alphatest_fragment:sS,alphatest_pars_fragment:rS,aomap_fragment:aS,aomap_pars_fragment:oS,batching_pars_vertex:lS,batching_vertex:cS,begin_vertex:uS,beginnormal_vertex:dS,bsdfs:hS,iridescence_fragment:fS,bumpmap_pars_fragment:pS,clipping_planes_fragment:mS,clipping_planes_pars_fragment:gS,clipping_planes_pars_vertex:_S,clipping_planes_vertex:xS,color_fragment:vS,color_pars_fragment:bS,color_pars_vertex:yS,color_vertex:MS,common:SS,cube_uv_reflection_fragment:wS,defaultnormal_vertex:ES,displacementmap_pars_vertex:TS,displacementmap_vertex:AS,emissivemap_fragment:CS,emissivemap_pars_fragment:RS,colorspace_fragment:PS,colorspace_pars_fragment:DS,envmap_fragment:IS,envmap_common_pars_fragment:LS,envmap_pars_fragment:NS,envmap_pars_vertex:US,envmap_physical_pars_fragment:YS,envmap_vertex:FS,fog_vertex:OS,fog_pars_vertex:kS,fog_fragment:BS,fog_pars_fragment:GS,gradientmap_pars_fragment:zS,lightmap_pars_fragment:HS,lights_lambert_fragment:VS,lights_lambert_pars_fragment:WS,lights_pars_begin:XS,lights_toon_fragment:qS,lights_toon_pars_fragment:KS,lights_phong_fragment:$S,lights_phong_pars_fragment:ZS,lights_physical_fragment:jS,lights_physical_pars_fragment:JS,lights_fragment_begin:QS,lights_fragment_maps:ew,lights_fragment_end:tw,lightprobes_pars_fragment:nw,logdepthbuf_fragment:iw,logdepthbuf_pars_fragment:sw,logdepthbuf_pars_vertex:rw,logdepthbuf_vertex:aw,map_fragment:ow,map_pars_fragment:lw,map_particle_fragment:cw,map_particle_pars_fragment:uw,metalnessmap_fragment:dw,metalnessmap_pars_fragment:hw,morphinstance_vertex:fw,morphcolor_vertex:pw,morphnormal_vertex:mw,morphtarget_pars_vertex:gw,morphtarget_vertex:_w,normal_fragment_begin:xw,normal_fragment_maps:vw,normal_pars_fragment:bw,normal_pars_vertex:yw,normal_vertex:Mw,normalmap_pars_fragment:Sw,clearcoat_normal_fragment_begin:ww,clearcoat_normal_fragment_maps:Ew,clearcoat_pars_fragment:Tw,iridescence_pars_fragment:Aw,opaque_fragment:Cw,packing:Rw,premultiplied_alpha_fragment:Pw,project_vertex:Dw,dithering_fragment:Iw,dithering_pars_fragment:Lw,roughnessmap_fragment:Nw,roughnessmap_pars_fragment:Uw,shadowmap_pars_fragment:Fw,shadowmap_pars_vertex:Ow,shadowmap_vertex:kw,shadowmask_pars_fragment:Bw,skinbase_vertex:Gw,skinning_pars_vertex:zw,skinning_vertex:Hw,skinnormal_vertex:Vw,specularmap_fragment:Ww,specularmap_pars_fragment:Xw,tonemapping_fragment:Yw,tonemapping_pars_fragment:qw,transmission_fragment:Kw,transmission_pars_fragment:$w,uv_pars_fragment:Zw,uv_pars_vertex:jw,uv_vertex:Jw,worldpos_vertex:Qw,background_vert:eE,background_frag:tE,backgroundCube_vert:nE,backgroundCube_frag:iE,cube_vert:sE,cube_frag:rE,depth_vert:aE,depth_frag:oE,distance_vert:lE,distance_frag:cE,equirect_vert:uE,equirect_frag:dE,linedashed_vert:hE,linedashed_frag:fE,meshbasic_vert:pE,meshbasic_frag:mE,meshlambert_vert:gE,meshlambert_frag:_E,meshmatcap_vert:xE,meshmatcap_frag:vE,meshnormal_vert:bE,meshnormal_frag:yE,meshphong_vert:ME,meshphong_frag:SE,meshphysical_vert:wE,meshphysical_frag:EE,meshtoon_vert:TE,meshtoon_frag:AE,points_vert:CE,points_frag:RE,shadow_vert:PE,shadow_frag:DE,sprite_vert:IE,sprite_frag:LE},Ze={common:{diffuse:{value:new $e(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ct},alphaMap:{value:null},alphaMapTransform:{value:new Ct},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ct}},envmap:{envMap:{value:null},envMapRotation:{value:new Ct},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ct}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ct}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ct},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ct},normalScale:{value:new ut(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ct},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ct}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ct}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ct}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new $e(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new L},probesMax:{value:new L},probesResolution:{value:new L}},points:{diffuse:{value:new $e(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ct},alphaTest:{value:0},uvTransform:{value:new Ct}},sprite:{diffuse:{value:new $e(16777215)},opacity:{value:1},center:{value:new ut(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ct},alphaMap:{value:null},alphaMapTransform:{value:new Ct},alphaTest:{value:0}}},qi={basic:{uniforms:ni([Ze.common,Ze.specularmap,Ze.envmap,Ze.aomap,Ze.lightmap,Ze.fog]),vertexShader:It.meshbasic_vert,fragmentShader:It.meshbasic_frag},lambert:{uniforms:ni([Ze.common,Ze.specularmap,Ze.envmap,Ze.aomap,Ze.lightmap,Ze.emissivemap,Ze.bumpmap,Ze.normalmap,Ze.displacementmap,Ze.fog,Ze.lights,{emissive:{value:new $e(0)},envMapIntensity:{value:1}}]),vertexShader:It.meshlambert_vert,fragmentShader:It.meshlambert_frag},phong:{uniforms:ni([Ze.common,Ze.specularmap,Ze.envmap,Ze.aomap,Ze.lightmap,Ze.emissivemap,Ze.bumpmap,Ze.normalmap,Ze.displacementmap,Ze.fog,Ze.lights,{emissive:{value:new $e(0)},specular:{value:new $e(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:It.meshphong_vert,fragmentShader:It.meshphong_frag},standard:{uniforms:ni([Ze.common,Ze.envmap,Ze.aomap,Ze.lightmap,Ze.emissivemap,Ze.bumpmap,Ze.normalmap,Ze.displacementmap,Ze.roughnessmap,Ze.metalnessmap,Ze.fog,Ze.lights,{emissive:{value:new $e(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:It.meshphysical_vert,fragmentShader:It.meshphysical_frag},toon:{uniforms:ni([Ze.common,Ze.aomap,Ze.lightmap,Ze.emissivemap,Ze.bumpmap,Ze.normalmap,Ze.displacementmap,Ze.gradientmap,Ze.fog,Ze.lights,{emissive:{value:new $e(0)}}]),vertexShader:It.meshtoon_vert,fragmentShader:It.meshtoon_frag},matcap:{uniforms:ni([Ze.common,Ze.bumpmap,Ze.normalmap,Ze.displacementmap,Ze.fog,{matcap:{value:null}}]),vertexShader:It.meshmatcap_vert,fragmentShader:It.meshmatcap_frag},points:{uniforms:ni([Ze.points,Ze.fog]),vertexShader:It.points_vert,fragmentShader:It.points_frag},dashed:{uniforms:ni([Ze.common,Ze.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:It.linedashed_vert,fragmentShader:It.linedashed_frag},depth:{uniforms:ni([Ze.common,Ze.displacementmap]),vertexShader:It.depth_vert,fragmentShader:It.depth_frag},normal:{uniforms:ni([Ze.common,Ze.bumpmap,Ze.normalmap,Ze.displacementmap,{opacity:{value:1}}]),vertexShader:It.meshnormal_vert,fragmentShader:It.meshnormal_frag},sprite:{uniforms:ni([Ze.sprite,Ze.fog]),vertexShader:It.sprite_vert,fragmentShader:It.sprite_frag},background:{uniforms:{uvTransform:{value:new Ct},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:It.background_vert,fragmentShader:It.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ct}},vertexShader:It.backgroundCube_vert,fragmentShader:It.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:It.cube_vert,fragmentShader:It.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:It.equirect_vert,fragmentShader:It.equirect_frag},distance:{uniforms:ni([Ze.common,Ze.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:It.distance_vert,fragmentShader:It.distance_frag},shadow:{uniforms:ni([Ze.lights,Ze.fog,{color:{value:new $e(0)},opacity:{value:1}}]),vertexShader:It.shadow_vert,fragmentShader:It.shadow_frag}};qi.physical={uniforms:ni([qi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ct},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ct},clearcoatNormalScale:{value:new ut(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ct},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ct},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ct},sheen:{value:0},sheenColor:{value:new $e(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ct},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ct},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ct},transmissionSamplerSize:{value:new ut},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ct},attenuationDistance:{value:0},attenuationColor:{value:new $e(0)},specularColor:{value:new $e(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ct},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ct},anisotropyVector:{value:new ut},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ct}}]),vertexShader:It.meshphysical_vert,fragmentShader:It.meshphysical_frag};const Ec={r:0,b:0,g:0},NE=new Jt,g_=new Ct;g_.set(-1,0,0,0,1,0,0,0,1);function UE(n,e,t,i,s,r){const a=new $e(0);let o=s===!0?0:1,l,c,u=null,h=0,d=null;function f(y){let R=y.isScene===!0?y.background:null;if(R&&R.isTexture){const M=y.backgroundBlurriness>0;R=e.get(R,M)}return R}function x(y){let R=!1;const M=f(y);M===null?m(a,o):M&&M.isColor&&(m(M,1),R=!0);const P=n.xr.getEnvironmentBlendMode();P==="additive"?t.buffers.color.setClear(0,0,0,1,r):P==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||R)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function S(y,R){const M=f(R);M&&(M.isCubeTexture||M.mapping===Tu)?(c===void 0&&(c=new D(new xt(1,1,1),new ts({name:"BackgroundCubeMaterial",uniforms:$a(qi.backgroundCube.uniforms),vertexShader:qi.backgroundCube.vertexShader,fragmentShader:qi.backgroundCube.fragmentShader,side:vn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(P,T,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=M,c.material.uniforms.backgroundBlurriness.value=R.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(NE.makeRotationFromEuler(R.backgroundRotation)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(g_),c.material.toneMapped=Gt.getTransfer(M.colorSpace)!==Zt,(u!==M||h!==M.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,u=M,h=M.version,d=n.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new D(new Fr(2,2),new ts({name:"BackgroundMaterial",uniforms:$a(qi.background.uniforms),vertexShader:qi.background.vertexShader,fragmentShader:qi.background.fragmentShader,side:nr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,l.material.toneMapped=Gt.getTransfer(M.colorSpace)!==Zt,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(u!==M||h!==M.version||d!==n.toneMapping)&&(l.material.needsUpdate=!0,u=M,h=M.version,d=n.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function m(y,R){y.getRGB(Ec,h_(n)),t.buffers.color.setClear(Ec.r,Ec.g,Ec.b,R,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,R=1){a.set(y),o=R,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(y){o=y,m(a,o)},render:x,addToRenderList:S,dispose:p}}function FE(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=d(null);let r=s,a=!1;function o(k,U,Q,le,$){let re=!1;const Z=h(k,le,Q,U);r!==Z&&(r=Z,c(r.object)),re=f(k,le,Q,$),re&&x(k,le,Q,$),$!==null&&e.update($,n.ELEMENT_ARRAY_BUFFER),(re||a)&&(a=!1,M(k,U,Q,le),$!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get($).buffer))}function l(){return n.createVertexArray()}function c(k){return n.bindVertexArray(k)}function u(k){return n.deleteVertexArray(k)}function h(k,U,Q,le){const $=le.wireframe===!0;let re=i[U.id];re===void 0&&(re={},i[U.id]=re);const Z=k.isInstancedMesh===!0?k.id:0;let oe=re[Z];oe===void 0&&(oe={},re[Z]=oe);let Ae=oe[Q.id];Ae===void 0&&(Ae={},oe[Q.id]=Ae);let Ge=Ae[$];return Ge===void 0&&(Ge=d(l()),Ae[$]=Ge),Ge}function d(k){const U=[],Q=[],le=[];for(let $=0;$<t;$++)U[$]=0,Q[$]=0,le[$]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:Q,attributeDivisors:le,object:k,attributes:{},index:null}}function f(k,U,Q,le){const $=r.attributes,re=U.attributes;let Z=0;const oe=Q.getAttributes();for(const Ae in oe)if(oe[Ae].location>=0){const Fe=$[Ae];let j=re[Ae];if(j===void 0&&(Ae==="instanceMatrix"&&k.instanceMatrix&&(j=k.instanceMatrix),Ae==="instanceColor"&&k.instanceColor&&(j=k.instanceColor)),Fe===void 0||Fe.attribute!==j||j&&Fe.data!==j.data)return!0;Z++}return r.attributesNum!==Z||r.index!==le}function x(k,U,Q,le){const $={},re=U.attributes;let Z=0;const oe=Q.getAttributes();for(const Ae in oe)if(oe[Ae].location>=0){let Fe=re[Ae];Fe===void 0&&(Ae==="instanceMatrix"&&k.instanceMatrix&&(Fe=k.instanceMatrix),Ae==="instanceColor"&&k.instanceColor&&(Fe=k.instanceColor));const j={};j.attribute=Fe,Fe&&Fe.data&&(j.data=Fe.data),$[Ae]=j,Z++}r.attributes=$,r.attributesNum=Z,r.index=le}function S(){const k=r.newAttributes;for(let U=0,Q=k.length;U<Q;U++)k[U]=0}function m(k){p(k,0)}function p(k,U){const Q=r.newAttributes,le=r.enabledAttributes,$=r.attributeDivisors;Q[k]=1,le[k]===0&&(n.enableVertexAttribArray(k),le[k]=1),$[k]!==U&&(n.vertexAttribDivisor(k,U),$[k]=U)}function y(){const k=r.newAttributes,U=r.enabledAttributes;for(let Q=0,le=U.length;Q<le;Q++)U[Q]!==k[Q]&&(n.disableVertexAttribArray(Q),U[Q]=0)}function R(k,U,Q,le,$,re,Z){Z===!0?n.vertexAttribIPointer(k,U,Q,$,re):n.vertexAttribPointer(k,U,Q,le,$,re)}function M(k,U,Q,le){S();const $=le.attributes,re=Q.getAttributes(),Z=U.defaultAttributeValues;for(const oe in re){const Ae=re[oe];if(Ae.location>=0){let Ge=$[oe];if(Ge===void 0&&(oe==="instanceMatrix"&&k.instanceMatrix&&(Ge=k.instanceMatrix),oe==="instanceColor"&&k.instanceColor&&(Ge=k.instanceColor)),Ge!==void 0){const Fe=Ge.normalized,j=Ge.itemSize,xe=e.get(Ge);if(xe===void 0)continue;const pt=xe.buffer,At=xe.type,fe=xe.bytesPerElement,Oe=At===n.INT||At===n.UNSIGNED_INT||Ge.gpuType===Cf;if(Ge.isInterleavedBufferAttribute){const Ce=Ge.data,ft=Ce.stride,mt=Ge.offset;if(Ce.isInstancedInterleavedBuffer){for(let ht=0;ht<Ae.locationSize;ht++)p(Ae.location+ht,Ce.meshPerAttribute);k.isInstancedMesh!==!0&&le._maxInstanceCount===void 0&&(le._maxInstanceCount=Ce.meshPerAttribute*Ce.count)}else for(let ht=0;ht<Ae.locationSize;ht++)m(Ae.location+ht);n.bindBuffer(n.ARRAY_BUFFER,pt);for(let ht=0;ht<Ae.locationSize;ht++)R(Ae.location+ht,j/Ae.locationSize,At,Fe,ft*fe,(mt+j/Ae.locationSize*ht)*fe,Oe)}else{if(Ge.isInstancedBufferAttribute){for(let Ce=0;Ce<Ae.locationSize;Ce++)p(Ae.location+Ce,Ge.meshPerAttribute);k.isInstancedMesh!==!0&&le._maxInstanceCount===void 0&&(le._maxInstanceCount=Ge.meshPerAttribute*Ge.count)}else for(let Ce=0;Ce<Ae.locationSize;Ce++)m(Ae.location+Ce);n.bindBuffer(n.ARRAY_BUFFER,pt);for(let Ce=0;Ce<Ae.locationSize;Ce++)R(Ae.location+Ce,j/Ae.locationSize,At,Fe,j*fe,j/Ae.locationSize*Ce*fe,Oe)}}else if(Z!==void 0){const Fe=Z[oe];if(Fe!==void 0)switch(Fe.length){case 2:n.vertexAttrib2fv(Ae.location,Fe);break;case 3:n.vertexAttrib3fv(Ae.location,Fe);break;case 4:n.vertexAttrib4fv(Ae.location,Fe);break;default:n.vertexAttrib1fv(Ae.location,Fe)}}}}y()}function P(){A();for(const k in i){const U=i[k];for(const Q in U){const le=U[Q];for(const $ in le){const re=le[$];for(const Z in re)u(re[Z].object),delete re[Z];delete le[$]}}delete i[k]}}function T(k){if(i[k.id]===void 0)return;const U=i[k.id];for(const Q in U){const le=U[Q];for(const $ in le){const re=le[$];for(const Z in re)u(re[Z].object),delete re[Z];delete le[$]}}delete i[k.id]}function I(k){for(const U in i){const Q=i[U];for(const le in Q){const $=Q[le];if($[k.id]===void 0)continue;const re=$[k.id];for(const Z in re)u(re[Z].object),delete re[Z];delete $[k.id]}}}function v(k){for(const U in i){const Q=i[U],le=k.isInstancedMesh===!0?k.id:0,$=Q[le];if($!==void 0){for(const re in $){const Z=$[re];for(const oe in Z)u(Z[oe].object),delete Z[oe];delete $[re]}delete Q[le],Object.keys(Q).length===0&&delete i[U]}}}function A(){F(),a=!0,r!==s&&(r=s,c(r.object))}function F(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:A,resetDefaultState:F,dispose:P,releaseStatesOfGeometry:T,releaseStatesOfObject:v,releaseStatesOfProgram:I,initAttributes:S,enableAttribute:m,disableUnusedAttributes:y}}function OE(n,e,t){let i;function s(l){i=l}function r(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function a(l,c,u){u!==0&&(n.drawArraysInstanced(i,l,c,u),t.update(c,i,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,u);let d=0;for(let f=0;f<u;f++)d+=c[f];t.update(d,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function kE(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const I=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(I){return!(I!==Oi&&i.convert(I)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(I){const v=I===ws&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(I!==xi&&i.convert(I)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&I!==Fi&&!v)}function l(I){if(I==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(vt("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&vt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),y=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),R=n.getParameter(n.MAX_VARYING_VECTORS),M=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),P=n.getParameter(n.MAX_SAMPLES),T=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:x,maxTextureSize:S,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:y,maxVaryings:R,maxFragmentUniforms:M,maxSamples:P,samples:T}}function BE(n){const e=this;let t=null,i=0,s=!1,r=!1;const a=new qs,o=new Ct,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const f=h.length!==0||d||i!==0||s;return s=d,i=h.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,f){const x=h.clippingPlanes,S=h.clipIntersection,m=h.clipShadows,p=n.get(h);if(!s||x===null||x.length===0||r&&!m)r?u(null):c();else{const y=r?0:i,R=y*4;let M=p.clippingState||null;l.value=M,M=u(x,d,R,f);for(let P=0;P!==R;++P)M[P]=t[P];p.clippingState=M,this.numIntersection=S?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(h,d,f,x){const S=h!==null?h.length:0;let m=null;if(S!==0){if(m=l.value,x!==!0||m===null){const p=f+S*4,y=d.matrixWorldInverse;o.getNormalMatrix(y),(m===null||m.length<p)&&(m=new Float32Array(p));for(let R=0,M=f;R!==S;++R,M+=4)a.copy(h[R]).applyMatrix4(y,o),a.normal.toArray(m,M),m[M+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=S,e.numIntersection=0,m}}const js=4,$m=[.125,.215,.35,.446,.526,.582],Ir=20,GE=256,jo=new Vf,Zm=new $e;let zd=null,Hd=0,Vd=0,Wd=!1;const zE=new L;class jm{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){const{size:a=256,position:o=zE}=r;zd=this._renderer.getRenderTarget(),Hd=this._renderer.getActiveCubeFace(),Vd=this._renderer.getActiveMipmapLevel(),Wd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=e0(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Qm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(zd,Hd,Vd),this._renderer.xr.enabled=Wd,e.scissorTest=!1,Ra(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===kr||e.mapping===qa?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),zd=this._renderer.getRenderTarget(),Hd=this._renderer.getActiveCubeFace(),Vd=this._renderer.getActiveMipmapLevel(),Wd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Rn,minFilter:Rn,generateMipmaps:!1,type:ws,format:Oi,colorSpace:nu,depthBuffer:!1},s=Jm(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Jm(e,t,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=HE(r)),this._blurMaterial=WE(r,e,t),this._ggxMaterial=VE(r,e,t)}return s}_compileMaterial(e){const t=new D(new jt,e);this._renderer.compile(t,jo)}_sceneToCubeUV(e,t,i,s,r){const l=new gi(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,f=h.toneMapping;h.getClearColor(Zm),h.toneMapping=Ji,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(s),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new D(new xt,new ye({name:"PMREM.Background",side:vn,depthWrite:!1,depthTest:!1})));const S=this._backgroundBox,m=S.material;let p=!1;const y=e.background;y?y.isColor&&(m.color.copy(y),e.background=null,p=!0):(m.color.copy(Zm),p=!0);for(let R=0;R<6;R++){const M=R%3;M===0?(l.up.set(0,c[R],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[R],r.y,r.z)):M===1?(l.up.set(0,0,c[R]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[R],r.z)):(l.up.set(0,c[R],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[R]));const P=this._cubeSize;Ra(s,M*P,R>2?P:0,P,P),h.setRenderTarget(s),p&&h.render(S,l),h.render(e,l)}h.toneMapping=f,h.autoClear=d,e.background=y}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===kr||e.mapping===qa;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=e0()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Qm());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;Ra(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,jo)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const l=a.uniforms,c=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),h=Math.sqrt(c*c-u*u),d=0+c*1.25,f=h*d,{_lodMax:x}=this,S=this._sizeLods[i],m=3*S*(i>x-js?i-x+js:0),p=4*(this._cubeSize-S);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=x-t,Ra(r,m,p,3*S,2*S),s.setRenderTarget(r),s.render(o,jo),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=x-i,Ra(e,m,p,3*S,2*S),s.setRenderTarget(e),s.render(o,jo)}_blur(e,t,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,s,"latitudinal",r),this._halfBlur(a,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Bt("blur direction must be either latitudinal or longitudinal!");const u=3,h=this._lodMeshes[s];h.material=c;const d=c.uniforms,f=this._sizeLods[i]-1,x=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Ir-1),S=r/x,m=isFinite(r)?1+Math.floor(u*S):Ir;m>Ir&&vt(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ir}`);const p=[];let y=0;for(let I=0;I<Ir;++I){const v=I/S,A=Math.exp(-v*v/2);p.push(A),I===0?y+=A:I<m&&(y+=2*A)}for(let I=0;I<p.length;I++)p[I]=p[I]/y;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:R}=this;d.dTheta.value=x,d.mipInt.value=R-i;const M=this._sizeLods[s],P=3*M*(s>R-js?s-R+js:0),T=4*(this._cubeSize-M);Ra(t,P,T,3*M,2*M),l.setRenderTarget(t),l.render(h,jo)}}function HE(n){const e=[],t=[],i=[];let s=n;const r=n-js+1+$m.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let l=1/o;a>n-js?l=$m[a-n+js-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),u=-c,h=1+c,d=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,x=6,S=3,m=2,p=1,y=new Float32Array(S*x*f),R=new Float32Array(m*x*f),M=new Float32Array(p*x*f);for(let T=0;T<f;T++){const I=T%3*2/3-1,v=T>2?0:-1,A=[I,v,0,I+2/3,v,0,I+2/3,v+1,0,I,v,0,I+2/3,v+1,0,I,v+1,0];y.set(A,S*x*T),R.set(d,m*x*T);const F=[T,T,T,T,T,T];M.set(F,p*x*T)}const P=new jt;P.setAttribute("position",new gn(y,S)),P.setAttribute("uv",new gn(R,m)),P.setAttribute("faceIndex",new gn(M,p)),i.push(new D(P,null)),s>js&&s--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function Jm(n,e,t){const i=new Qi(n,e,t);return i.texture.mapping=Tu,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ra(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function VE(n,e,t){return new ts({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:GE,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Au(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:bs,depthTest:!1,depthWrite:!1})}function WE(n,e,t){const i=new Float32Array(Ir),s=new L(0,1,0);return new ts({name:"SphericalGaussianBlur",defines:{n:Ir,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Au(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:bs,depthTest:!1,depthWrite:!1})}function Qm(){return new ts({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Au(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:bs,depthTest:!1,depthWrite:!1})}function e0(){return new ts({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Au(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:bs,depthTest:!1,depthWrite:!1})}function Au(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class __ extends Qi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new u_(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new xt(5,5,5),r=new ts({name:"CubemapFromEquirect",uniforms:$a(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:vn,blending:bs});r.uniforms.tEquirect.value=t;const a=new D(s,r),o=t.minFilter;return t.minFilter===Lr&&(t.minFilter=Rn),new K1(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}}function XE(n){let e=new WeakMap,t=new WeakMap,i=null;function s(d,f=!1){return d==null?null:f?a(d):r(d)}function r(d){if(d&&d.isTexture){const f=d.mapping;if(f===ud||f===dd)if(e.has(d)){const x=e.get(d).texture;return o(x,d.mapping)}else{const x=d.image;if(x&&x.height>0){const S=new __(x.height);return S.fromEquirectangularTexture(n,d),e.set(d,S),d.addEventListener("dispose",c),o(S.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){const f=d.mapping,x=f===ud||f===dd,S=f===kr||f===qa;if(x||S){let m=t.get(d);const p=m!==void 0?m.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==p)return i===null&&(i=new jm(n)),m=x?i.fromEquirectangular(d,m):i.fromCubemap(d,m),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),m.texture;if(m!==void 0)return m.texture;{const y=d.image;return x&&y&&y.height>0||S&&y&&l(y)?(i===null&&(i=new jm(n)),m=x?i.fromEquirectangular(d):i.fromCubemap(d),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),d.addEventListener("dispose",u),m.texture):null}}}return d}function o(d,f){return f===ud?d.mapping=kr:f===dd&&(d.mapping=qa),d}function l(d){let f=0;const x=6;for(let S=0;S<x;S++)d[S]!==void 0&&f++;return f===x}function c(d){const f=d.target;f.removeEventListener("dispose",c);const x=e.get(f);x!==void 0&&(e.delete(f),x.dispose())}function u(d){const f=d.target;f.removeEventListener("dispose",u);const x=t.get(f);x!==void 0&&(t.delete(f),x.dispose())}function h(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:h}}function YE(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&za("WebGLRenderer: "+i+" extension not supported."),s}}}function qE(n,e,t,i){const s={},r=new WeakMap;function a(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const x in d.attributes)e.remove(d.attributes[x]);d.removeEventListener("dispose",a),delete s[d.id];const f=r.get(d);f&&(e.remove(f),r.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(h,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,t.memory.geometries++),d}function l(h){const d=h.attributes;for(const f in d)e.update(d[f],n.ARRAY_BUFFER)}function c(h){const d=[],f=h.index,x=h.attributes.position;let S=0;if(x===void 0)return;if(f!==null){const y=f.array;S=f.version;for(let R=0,M=y.length;R<M;R+=3){const P=y[R+0],T=y[R+1],I=y[R+2];d.push(P,T,T,I,I,P)}}else{const y=x.array;S=x.version;for(let R=0,M=y.length/3-1;R<M;R+=3){const P=R+0,T=R+1,I=R+2;d.push(P,T,T,I,I,P)}}const m=new(x.count>=65535?o_:a_)(d,1);m.version=S;const p=r.get(h);p&&e.remove(p),r.set(h,m)}function u(h){const d=r.get(h);if(d){const f=h.index;f!==null&&d.version<f.version&&c(h)}else c(h);return r.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function KE(n,e,t){let i;function s(h){i=h}let r,a;function o(h){r=h.type,a=h.bytesPerElement}function l(h,d){n.drawElements(i,d,r,h*a),t.update(d,i,1)}function c(h,d,f){f!==0&&(n.drawElementsInstanced(i,d,r,h*a,f),t.update(d,i,f))}function u(h,d,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,r,h,0,f);let S=0;for(let m=0;m<f;m++)S+=d[m];t.update(S,i,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function $E(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:Bt("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function ZE(n,e,t){const i=new WeakMap,s=new _n;function r(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0;let d=i.get(o);if(d===void 0||d.count!==h){let F=function(){v.dispose(),i.delete(o),o.removeEventListener("dispose",F)};var f=F;d!==void 0&&d.texture.dispose();const x=o.morphAttributes.position!==void 0,S=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],y=o.morphAttributes.normal||[],R=o.morphAttributes.color||[];let M=0;x===!0&&(M=1),S===!0&&(M=2),m===!0&&(M=3);let P=o.attributes.position.count*M,T=1;P>e.maxTextureSize&&(T=Math.ceil(P/e.maxTextureSize),P=e.maxTextureSize);const I=new Float32Array(P*T*4*h),v=new s_(I,P,T,h);v.type=Fi,v.needsUpdate=!0;const A=M*4;for(let k=0;k<h;k++){const U=p[k],Q=y[k],le=R[k],$=P*T*4*k;for(let re=0;re<U.count;re++){const Z=re*A;x===!0&&(s.fromBufferAttribute(U,re),I[$+Z+0]=s.x,I[$+Z+1]=s.y,I[$+Z+2]=s.z,I[$+Z+3]=0),S===!0&&(s.fromBufferAttribute(Q,re),I[$+Z+4]=s.x,I[$+Z+5]=s.y,I[$+Z+6]=s.z,I[$+Z+7]=0),m===!0&&(s.fromBufferAttribute(le,re),I[$+Z+8]=s.x,I[$+Z+9]=s.y,I[$+Z+10]=s.z,I[$+Z+11]=le.itemSize===4?s.w:1)}}d={count:h,texture:v,size:new ut(P,T)},i.set(o,d),o.addEventListener("dispose",F)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let x=0;for(let m=0;m<c.length;m++)x+=c[m];const S=o.morphTargetsRelative?1:1-x;l.getUniforms().setValue(n,"morphTargetBaseInfluence",S),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:r}}function jE(n,e,t,i,s){let r=new WeakMap;function a(c){const u=s.render.frame,h=c.geometry,d=e.get(c,h);if(r.get(d)!==u&&(e.update(d),r.set(d,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==u&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){const f=c.skeleton;r.get(f)!==u&&(f.update(),r.set(f,u))}return d}function o(){r=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const JE={[Vg]:"LINEAR_TONE_MAPPING",[Wg]:"REINHARD_TONE_MAPPING",[Xg]:"CINEON_TONE_MAPPING",[Yg]:"ACES_FILMIC_TONE_MAPPING",[Kg]:"AGX_TONE_MAPPING",[$g]:"NEUTRAL_TONE_MAPPING",[qg]:"CUSTOM_TONE_MAPPING"};function QE(n,e,t,i,s,r){const a=new Qi(e,t,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,depthTexture:s?new Ka(e,t):void 0}),o=new Qi(e,t,{type:ws,depthBuffer:!1,stencilBuffer:!1}),l=new jt;l.setAttribute("position",new $t([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new $t([0,2,0,0,2,0],2));const c=new G1({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new D(l,c),h=new Vf(-1,1,1,-1,0,1);let d=null,f=null,x=!1,S,m=null,p=[],y=!1;this.setSize=function(R,M){a.setSize(R,M),o.setSize(R,M);for(let P=0;P<p.length;P++){const T=p[P];T.setSize&&T.setSize(R,M)}},this.setEffects=function(R){p=R,y=p.length>0&&p[0].isRenderPass===!0;const M=a.width,P=a.height;for(let T=0;T<p.length;T++){const I=p[T];I.setSize&&I.setSize(M,P)}},this.begin=function(R,M){if(x||R.toneMapping===Ji&&p.length===0)return!1;if(m=M,M!==null){const P=M.width,T=M.height;(a.width!==P||a.height!==T)&&this.setSize(P,T)}return y===!1&&R.setRenderTarget(a),S=R.toneMapping,R.toneMapping=Ji,!0},this.hasRenderPass=function(){return y},this.end=function(R,M){R.toneMapping=S,x=!0;let P=a,T=o;for(let I=0;I<p.length;I++){const v=p[I];if(v.enabled!==!1&&(v.render(R,T,P,M),v.needsSwap!==!1)){const A=P;P=T,T=A}}if(d!==R.outputColorSpace||f!==R.toneMapping){d=R.outputColorSpace,f=R.toneMapping,c.defines={},Gt.getTransfer(d)===Zt&&(c.defines.SRGB_TRANSFER="");const I=JE[f];I&&(c.defines[I]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=P.texture,R.setRenderTarget(m),R.render(u,h),m=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),l.dispose(),c.dispose()}}const x_=new Zn,sf=new Ka(1,1),v_=new s_,b_=new m1,y_=new u_,t0=[],n0=[],i0=new Float32Array(16),s0=new Float32Array(9),r0=new Float32Array(4);function Za(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=t0[s];if(r===void 0&&(r=new Float32Array(s),t0[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function In(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Ln(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Cu(n,e){let t=n0[e];t===void 0&&(t=new Int32Array(e),n0[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function e2(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function t2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(In(t,e))return;n.uniform2fv(this.addr,e),Ln(t,e)}}function n2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(In(t,e))return;n.uniform3fv(this.addr,e),Ln(t,e)}}function i2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(In(t,e))return;n.uniform4fv(this.addr,e),Ln(t,e)}}function s2(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(In(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Ln(t,e)}else{if(In(t,i))return;r0.set(i),n.uniformMatrix2fv(this.addr,!1,r0),Ln(t,i)}}function r2(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(In(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Ln(t,e)}else{if(In(t,i))return;s0.set(i),n.uniformMatrix3fv(this.addr,!1,s0),Ln(t,i)}}function a2(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(In(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Ln(t,e)}else{if(In(t,i))return;i0.set(i),n.uniformMatrix4fv(this.addr,!1,i0),Ln(t,i)}}function o2(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function l2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(In(t,e))return;n.uniform2iv(this.addr,e),Ln(t,e)}}function c2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(In(t,e))return;n.uniform3iv(this.addr,e),Ln(t,e)}}function u2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(In(t,e))return;n.uniform4iv(this.addr,e),Ln(t,e)}}function d2(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function h2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(In(t,e))return;n.uniform2uiv(this.addr,e),Ln(t,e)}}function f2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(In(t,e))return;n.uniform3uiv(this.addr,e),Ln(t,e)}}function p2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(In(t,e))return;n.uniform4uiv(this.addr,e),Ln(t,e)}}function m2(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(sf.compareFunction=t.isReversedDepthBuffer()?Ff:Uf,r=sf):r=x_,t.setTexture2D(e||r,s)}function g2(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||b_,s)}function _2(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||y_,s)}function x2(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||v_,s)}function v2(n){switch(n){case 5126:return e2;case 35664:return t2;case 35665:return n2;case 35666:return i2;case 35674:return s2;case 35675:return r2;case 35676:return a2;case 5124:case 35670:return o2;case 35667:case 35671:return l2;case 35668:case 35672:return c2;case 35669:case 35673:return u2;case 5125:return d2;case 36294:return h2;case 36295:return f2;case 36296:return p2;case 35678:case 36198:case 36298:case 36306:case 35682:return m2;case 35679:case 36299:case 36307:return g2;case 35680:case 36300:case 36308:case 36293:return _2;case 36289:case 36303:case 36311:case 36292:return x2}}function b2(n,e){n.uniform1fv(this.addr,e)}function y2(n,e){const t=Za(e,this.size,2);n.uniform2fv(this.addr,t)}function M2(n,e){const t=Za(e,this.size,3);n.uniform3fv(this.addr,t)}function S2(n,e){const t=Za(e,this.size,4);n.uniform4fv(this.addr,t)}function w2(n,e){const t=Za(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function E2(n,e){const t=Za(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function T2(n,e){const t=Za(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function A2(n,e){n.uniform1iv(this.addr,e)}function C2(n,e){n.uniform2iv(this.addr,e)}function R2(n,e){n.uniform3iv(this.addr,e)}function P2(n,e){n.uniform4iv(this.addr,e)}function D2(n,e){n.uniform1uiv(this.addr,e)}function I2(n,e){n.uniform2uiv(this.addr,e)}function L2(n,e){n.uniform3uiv(this.addr,e)}function N2(n,e){n.uniform4uiv(this.addr,e)}function U2(n,e,t){const i=this.cache,s=e.length,r=Cu(t,s);In(i,r)||(n.uniform1iv(this.addr,r),Ln(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=sf:a=x_;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function F2(n,e,t){const i=this.cache,s=e.length,r=Cu(t,s);In(i,r)||(n.uniform1iv(this.addr,r),Ln(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||b_,r[a])}function O2(n,e,t){const i=this.cache,s=e.length,r=Cu(t,s);In(i,r)||(n.uniform1iv(this.addr,r),Ln(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||y_,r[a])}function k2(n,e,t){const i=this.cache,s=e.length,r=Cu(t,s);In(i,r)||(n.uniform1iv(this.addr,r),Ln(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||v_,r[a])}function B2(n){switch(n){case 5126:return b2;case 35664:return y2;case 35665:return M2;case 35666:return S2;case 35674:return w2;case 35675:return E2;case 35676:return T2;case 5124:case 35670:return A2;case 35667:case 35671:return C2;case 35668:case 35672:return R2;case 35669:case 35673:return P2;case 5125:return D2;case 36294:return I2;case 36295:return L2;case 36296:return N2;case 35678:case 36198:case 36298:case 36306:case 35682:return U2;case 35679:case 36299:case 36307:return F2;case 35680:case 36300:case 36308:case 36293:return O2;case 36289:case 36303:case 36311:case 36292:return k2}}class G2{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=v2(t.type)}}class z2{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=B2(t.type)}}class H2{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],i)}}}const Xd=/(\w+)(\])?(\[|\.)?/g;function a0(n,e){n.seq.push(e),n.map[e.id]=e}function V2(n,e,t){const i=n.name,s=i.length;for(Xd.lastIndex=0;;){const r=Xd.exec(i),a=Xd.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){a0(t,c===void 0?new G2(o,n,e):new z2(o,n,e));break}else{let h=t.map[o];h===void 0&&(h=new H2(o),a0(t,h)),t=h}}}class Vc{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);V2(o,l,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&i.push(a)}return i}}function o0(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const W2=37297;let X2=0;function Y2(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const l0=new Ct;function q2(n){Gt._getMatrix(l0,Gt.workingColorSpace,n);const e=`mat3( ${l0.elements.map(t=>t.toFixed(4))} )`;switch(Gt.getTransfer(n)){case iu:return[e,"LinearTransferOETF"];case Zt:return[e,"sRGBTransferOETF"];default:return vt("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function c0(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Y2(n.getShaderSource(e),o)}else return r}function K2(n,e){const t=q2(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const $2={[Vg]:"Linear",[Wg]:"Reinhard",[Xg]:"Cineon",[Yg]:"ACESFilmic",[Kg]:"AgX",[$g]:"Neutral",[qg]:"Custom"};function Z2(n,e){const t=$2[e];return t===void 0?(vt("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Tc=new L;function j2(){Gt.getLuminanceCoefficients(Tc);const n=Tc.x.toFixed(4),e=Tc.y.toFixed(4),t=Tc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function J2(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(nl).join(`
`)}function Q2(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function eT(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function nl(n){return n!==""}function u0(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function d0(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const tT=/^[ \t]*#include +<([\w\d./]+)>/gm;function rf(n){return n.replace(tT,iT)}const nT=new Map;function iT(n,e){let t=It[e];if(t===void 0){const i=nT.get(e);if(i!==void 0)t=It[i],vt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return rf(t)}const sT=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function h0(n){return n.replace(sT,rT)}function rT(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function f0(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const aT={[Fc]:"SHADOWMAP_TYPE_PCF",[tl]:"SHADOWMAP_TYPE_VSM"};function oT(n){return aT[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const lT={[kr]:"ENVMAP_TYPE_CUBE",[qa]:"ENVMAP_TYPE_CUBE",[Tu]:"ENVMAP_TYPE_CUBE_UV"};function cT(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":lT[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const uT={[qa]:"ENVMAP_MODE_REFRACTION"};function dT(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":uT[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const hT={[Hg]:"ENVMAP_BLENDING_MULTIPLY",[qM]:"ENVMAP_BLENDING_MIX",[KM]:"ENVMAP_BLENDING_ADD"};function fT(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":hT[n.combine]||"ENVMAP_BLENDING_NONE"}function pT(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function mT(n,e,t,i){const s=n.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=oT(t),c=cT(t),u=dT(t),h=fT(t),d=pT(t),f=J2(t),x=Q2(r),S=s.createProgram();let m,p,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(nl).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(nl).join(`
`),p.length>0&&(p+=`
`)):(m=[f0(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(nl).join(`
`),p=[f0(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ji?"#define TONE_MAPPING":"",t.toneMapping!==Ji?It.tonemapping_pars_fragment:"",t.toneMapping!==Ji?Z2("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",It.colorspace_pars_fragment,K2("linearToOutputTexel",t.outputColorSpace),j2(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(nl).join(`
`)),a=rf(a),a=u0(a,t),a=d0(a,t),o=rf(o),o=u0(o,t),o=d0(o,t),a=h0(a),o=h0(o),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===dm?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===dm?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const R=y+m+a,M=y+p+o,P=o0(s,s.VERTEX_SHADER,R),T=o0(s,s.FRAGMENT_SHADER,M);s.attachShader(S,P),s.attachShader(S,T),t.index0AttributeName!==void 0?s.bindAttribLocation(S,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(S,0,"position"),s.linkProgram(S);function I(k){if(n.debug.checkShaderErrors){const U=s.getProgramInfoLog(S)||"",Q=s.getShaderInfoLog(P)||"",le=s.getShaderInfoLog(T)||"",$=U.trim(),re=Q.trim(),Z=le.trim();let oe=!0,Ae=!0;if(s.getProgramParameter(S,s.LINK_STATUS)===!1)if(oe=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,S,P,T);else{const Ge=c0(s,P,"vertex"),Fe=c0(s,T,"fragment");Bt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(S,s.VALIDATE_STATUS)+`

Material Name: `+k.name+`
Material Type: `+k.type+`

Program Info Log: `+$+`
`+Ge+`
`+Fe)}else $!==""?vt("WebGLProgram: Program Info Log:",$):(re===""||Z==="")&&(Ae=!1);Ae&&(k.diagnostics={runnable:oe,programLog:$,vertexShader:{log:re,prefix:m},fragmentShader:{log:Z,prefix:p}})}s.deleteShader(P),s.deleteShader(T),v=new Vc(s,S),A=eT(s,S)}let v;this.getUniforms=function(){return v===void 0&&I(this),v};let A;this.getAttributes=function(){return A===void 0&&I(this),A};let F=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return F===!1&&(F=s.getProgramParameter(S,W2)),F},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(S),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=X2++,this.cacheKey=e,this.usedTimes=1,this.program=S,this.vertexShader=P,this.fragmentShader=T,this}let gT=0;class _T{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new xT(e),t.set(e,i)),i}}class xT{constructor(e){this.id=gT++,this.code=e,this.usedTimes=0}}function vT(n){return n===Br||n===eu||n===tu}function bT(n,e,t,i,s,r){const a=new kf,o=new _T,l=new Set,c=[],u=new Map,h=i.logarithmicDepthBuffer;let d=i.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(v){return l.add(v),v===0?"uv":`uv${v}`}function S(v,A,F,k,U,Q){const le=k.fog,$=U.geometry,re=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?k.environment:null,Z=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,oe=e.get(v.envMap||re,Z),Ae=oe&&oe.mapping===Tu?oe.image.height:null,Ge=f[v.type];v.precision!==null&&(d=i.getMaxPrecision(v.precision),d!==v.precision&&vt("WebGLProgram.getParameters:",v.precision,"not supported, using",d,"instead."));const Fe=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,j=Fe!==void 0?Fe.length:0;let xe=0;$.morphAttributes.position!==void 0&&(xe=1),$.morphAttributes.normal!==void 0&&(xe=2),$.morphAttributes.color!==void 0&&(xe=3);let pt,At,fe,Oe;if(Ge){const it=qi[Ge];pt=it.vertexShader,At=it.fragmentShader}else{pt=v.vertexShader,At=v.fragmentShader;const it=o.getVertexShaderStage(v),qt=o.getFragmentShaderStage(v);o.update(v,it,qt),fe=it.id,Oe=qt.id}const Ce=n.getRenderTarget(),ft=n.state.buffers.depth.getReversed(),mt=U.isInstancedMesh===!0,ht=U.isBatchedMesh===!0,O=!!v.map,B=!!v.matcap,ne=!!oe,he=!!v.aoMap,ue=!!v.lightMap,pe=!!v.bumpMap&&v.wireframe===!1,De=!!v.normalMap,Pe=!!v.displacementMap,Re=!!v.emissiveMap,ve=!!v.metalnessMap,qe=!!v.roughnessMap,N=v.anisotropy>0,je=v.clearcoat>0,We=v.dispersion>0,C=v.iridescence>0,_=v.sheen>0,V=v.transmission>0,J=N&&!!v.anisotropyMap,ae=je&&!!v.clearcoatMap,Ee=je&&!!v.clearcoatNormalMap,Ne=je&&!!v.clearcoatRoughnessMap,ce=C&&!!v.iridescenceMap,me=C&&!!v.iridescenceThicknessMap,Le=_&&!!v.sheenColorMap,Je=_&&!!v.sheenRoughnessMap,ze=!!v.specularMap,ke=!!v.specularColorMap,rt=!!v.specularIntensityMap,dt=V&&!!v.transmissionMap,yt=V&&!!v.thicknessMap,Y=!!v.gradientMap,Be=!!v.alphaMap,be=v.alphaTest>0,Ve=!!v.alphaHash,Ke=!!v.extensions;let Se=Ji;v.toneMapped&&(Ce===null||Ce.isXRRenderTarget===!0)&&(Se=n.toneMapping);const st={shaderID:Ge,shaderType:v.type,shaderName:v.name,vertexShader:pt,fragmentShader:At,defines:v.defines,customVertexShaderID:fe,customFragmentShaderID:Oe,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:d,batching:ht,batchingColor:ht&&U._colorsTexture!==null,instancing:mt,instancingColor:mt&&U.instanceColor!==null,instancingMorph:mt&&U.morphTexture!==null,outputColorSpace:Ce===null?n.outputColorSpace:Ce.isXRRenderTarget===!0?Ce.texture.colorSpace:Gt.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:O,matcap:B,envMap:ne,envMapMode:ne&&oe.mapping,envMapCubeUVHeight:Ae,aoMap:he,lightMap:ue,bumpMap:pe,normalMap:De,displacementMap:Pe,emissiveMap:Re,normalMapObjectSpace:De&&v.normalMapType===jM,normalMapTangentSpace:De&&v.normalMapType===Jh,packedNormalMap:De&&v.normalMapType===Jh&&vT(v.normalMap.format),metalnessMap:ve,roughnessMap:qe,anisotropy:N,anisotropyMap:J,clearcoat:je,clearcoatMap:ae,clearcoatNormalMap:Ee,clearcoatRoughnessMap:Ne,dispersion:We,iridescence:C,iridescenceMap:ce,iridescenceThicknessMap:me,sheen:_,sheenColorMap:Le,sheenRoughnessMap:Je,specularMap:ze,specularColorMap:ke,specularIntensityMap:rt,transmission:V,transmissionMap:dt,thicknessMap:yt,gradientMap:Y,opaque:v.transparent===!1&&v.blending===Ga&&v.alphaToCoverage===!1,alphaMap:Be,alphaTest:be,alphaHash:Ve,combine:v.combine,mapUv:O&&x(v.map.channel),aoMapUv:he&&x(v.aoMap.channel),lightMapUv:ue&&x(v.lightMap.channel),bumpMapUv:pe&&x(v.bumpMap.channel),normalMapUv:De&&x(v.normalMap.channel),displacementMapUv:Pe&&x(v.displacementMap.channel),emissiveMapUv:Re&&x(v.emissiveMap.channel),metalnessMapUv:ve&&x(v.metalnessMap.channel),roughnessMapUv:qe&&x(v.roughnessMap.channel),anisotropyMapUv:J&&x(v.anisotropyMap.channel),clearcoatMapUv:ae&&x(v.clearcoatMap.channel),clearcoatNormalMapUv:Ee&&x(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ne&&x(v.clearcoatRoughnessMap.channel),iridescenceMapUv:ce&&x(v.iridescenceMap.channel),iridescenceThicknessMapUv:me&&x(v.iridescenceThicknessMap.channel),sheenColorMapUv:Le&&x(v.sheenColorMap.channel),sheenRoughnessMapUv:Je&&x(v.sheenRoughnessMap.channel),specularMapUv:ze&&x(v.specularMap.channel),specularColorMapUv:ke&&x(v.specularColorMap.channel),specularIntensityMapUv:rt&&x(v.specularIntensityMap.channel),transmissionMapUv:dt&&x(v.transmissionMap.channel),thicknessMapUv:yt&&x(v.thicknessMap.channel),alphaMapUv:Be&&x(v.alphaMap.channel),vertexTangents:!!$.attributes.tangent&&(De||N),vertexNormals:!!$.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!$.attributes.uv&&(O||Be),fog:!!le,useFog:v.fog===!0,fogExp2:!!le&&le.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||$.attributes.normal===void 0&&De===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:ft,skinning:U.isSkinnedMesh===!0,hasPositionAttribute:$.attributes.position!==void 0,morphTargets:$.morphAttributes.position!==void 0,morphNormals:$.morphAttributes.normal!==void 0,morphColors:$.morphAttributes.color!==void 0,morphTargetsCount:j,morphTextureStride:xe,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:Q.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:n.shadowMap.enabled&&F.length>0,shadowMapType:n.shadowMap.type,toneMapping:Se,decodeVideoTexture:O&&v.map.isVideoTexture===!0&&Gt.getTransfer(v.map.colorSpace)===Zt,decodeVideoTextureEmissive:Re&&v.emissiveMap.isVideoTexture===!0&&Gt.getTransfer(v.emissiveMap.colorSpace)===Zt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Nt,flipSided:v.side===vn,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:Ke&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ke&&v.extensions.multiDraw===!0||ht)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return st.vertexUv1s=l.has(1),st.vertexUv2s=l.has(2),st.vertexUv3s=l.has(3),l.clear(),st}function m(v){const A=[];if(v.shaderID?A.push(v.shaderID):(A.push(v.customVertexShaderID),A.push(v.customFragmentShaderID)),v.defines!==void 0)for(const F in v.defines)A.push(F),A.push(v.defines[F]);return v.isRawShaderMaterial===!1&&(p(A,v),y(A,v),A.push(n.outputColorSpace)),A.push(v.customProgramCacheKey),A.join()}function p(v,A){v.push(A.precision),v.push(A.outputColorSpace),v.push(A.envMapMode),v.push(A.envMapCubeUVHeight),v.push(A.mapUv),v.push(A.alphaMapUv),v.push(A.lightMapUv),v.push(A.aoMapUv),v.push(A.bumpMapUv),v.push(A.normalMapUv),v.push(A.displacementMapUv),v.push(A.emissiveMapUv),v.push(A.metalnessMapUv),v.push(A.roughnessMapUv),v.push(A.anisotropyMapUv),v.push(A.clearcoatMapUv),v.push(A.clearcoatNormalMapUv),v.push(A.clearcoatRoughnessMapUv),v.push(A.iridescenceMapUv),v.push(A.iridescenceThicknessMapUv),v.push(A.sheenColorMapUv),v.push(A.sheenRoughnessMapUv),v.push(A.specularMapUv),v.push(A.specularColorMapUv),v.push(A.specularIntensityMapUv),v.push(A.transmissionMapUv),v.push(A.thicknessMapUv),v.push(A.combine),v.push(A.fogExp2),v.push(A.sizeAttenuation),v.push(A.morphTargetsCount),v.push(A.morphAttributeCount),v.push(A.numDirLights),v.push(A.numPointLights),v.push(A.numSpotLights),v.push(A.numSpotLightMaps),v.push(A.numHemiLights),v.push(A.numRectAreaLights),v.push(A.numDirLightShadows),v.push(A.numPointLightShadows),v.push(A.numSpotLightShadows),v.push(A.numSpotLightShadowsWithMaps),v.push(A.numLightProbes),v.push(A.shadowMapType),v.push(A.toneMapping),v.push(A.numClippingPlanes),v.push(A.numClipIntersection),v.push(A.depthPacking)}function y(v,A){a.disableAll(),A.instancing&&a.enable(0),A.instancingColor&&a.enable(1),A.instancingMorph&&a.enable(2),A.matcap&&a.enable(3),A.envMap&&a.enable(4),A.normalMapObjectSpace&&a.enable(5),A.normalMapTangentSpace&&a.enable(6),A.clearcoat&&a.enable(7),A.iridescence&&a.enable(8),A.alphaTest&&a.enable(9),A.vertexColors&&a.enable(10),A.vertexAlphas&&a.enable(11),A.vertexUv1s&&a.enable(12),A.vertexUv2s&&a.enable(13),A.vertexUv3s&&a.enable(14),A.vertexTangents&&a.enable(15),A.anisotropy&&a.enable(16),A.alphaHash&&a.enable(17),A.batching&&a.enable(18),A.dispersion&&a.enable(19),A.batchingColor&&a.enable(20),A.gradientMap&&a.enable(21),A.packedNormalMap&&a.enable(22),A.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),A.fog&&a.enable(0),A.useFog&&a.enable(1),A.flatShading&&a.enable(2),A.logarithmicDepthBuffer&&a.enable(3),A.reversedDepthBuffer&&a.enable(4),A.skinning&&a.enable(5),A.morphTargets&&a.enable(6),A.morphNormals&&a.enable(7),A.morphColors&&a.enable(8),A.premultipliedAlpha&&a.enable(9),A.shadowMapEnabled&&a.enable(10),A.doubleSided&&a.enable(11),A.flipSided&&a.enable(12),A.useDepthPacking&&a.enable(13),A.dithering&&a.enable(14),A.transmission&&a.enable(15),A.sheen&&a.enable(16),A.opaque&&a.enable(17),A.pointsUvs&&a.enable(18),A.decodeVideoTexture&&a.enable(19),A.decodeVideoTextureEmissive&&a.enable(20),A.alphaToCoverage&&a.enable(21),A.numLightProbeGrids>0&&a.enable(22),A.hasPositionAttribute&&a.enable(23),v.push(a.mask)}function R(v){const A=f[v.type];let F;if(A){const k=qi[A];F=O1.clone(k.uniforms)}else F=v.uniforms;return F}function M(v,A){let F=u.get(A);return F!==void 0?++F.usedTimes:(F=new mT(n,A,v,s),c.push(F),u.set(A,F)),F}function P(v){if(--v.usedTimes===0){const A=c.indexOf(v);c[A]=c[c.length-1],c.pop(),u.delete(v.cacheKey),v.destroy()}}function T(v){o.remove(v)}function I(){o.dispose()}return{getParameters:S,getProgramCacheKey:m,getUniforms:R,acquireProgram:M,releaseProgram:P,releaseShaderCache:T,programs:c,dispose:I}}function yT(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,l){n.get(a)[o]=l}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function MT(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function p0(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function m0(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(d){let f=0;return d.isInstancedMesh&&(f+=2),d.isSkinnedMesh&&(f+=1),f}function o(d,f,x,S,m,p){let y=n[e];return y===void 0?(y={id:d.id,object:d,geometry:f,material:x,materialVariant:a(d),groupOrder:S,renderOrder:d.renderOrder,z:m,group:p},n[e]=y):(y.id=d.id,y.object=d,y.geometry=f,y.material=x,y.materialVariant=a(d),y.groupOrder=S,y.renderOrder=d.renderOrder,y.z=m,y.group=p),e++,y}function l(d,f,x,S,m,p){const y=o(d,f,x,S,m,p);x.transmission>0?i.push(y):x.transparent===!0?s.push(y):t.push(y)}function c(d,f,x,S,m,p){const y=o(d,f,x,S,m,p);x.transmission>0?i.unshift(y):x.transparent===!0?s.unshift(y):t.unshift(y)}function u(d,f,x){t.length>1&&t.sort(d||MT),i.length>1&&i.sort(f||p0),s.length>1&&s.sort(f||p0),x&&(t.reverse(),i.reverse(),s.reverse())}function h(){for(let d=e,f=n.length;d<f;d++){const x=n[d];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:l,unshift:c,finish:h,sort:u}}function ST(){let n=new WeakMap;function e(i,s){const r=n.get(i);let a;return r===void 0?(a=new m0,n.set(i,[a])):s>=r.length?(a=new m0,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function wT(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new $e};break;case"SpotLight":t={position:new L,direction:new L,color:new $e,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new $e,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new $e,groundColor:new $e};break;case"RectAreaLight":t={color:new $e,position:new L,halfWidth:new L,halfHeight:new L};break}return n[e.id]=t,t}}}function ET(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ut,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let TT=0;function AT(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function CT(n){const e=new wT,t=ET(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new L);const s=new L,r=new Jt,a=new Jt;function o(c){let u=0,h=0,d=0;for(let A=0;A<9;A++)i.probe[A].set(0,0,0);let f=0,x=0,S=0,m=0,p=0,y=0,R=0,M=0,P=0,T=0,I=0;c.sort(AT);for(let A=0,F=c.length;A<F;A++){const k=c[A],U=k.color,Q=k.intensity,le=k.distance;let $=null;if(k.shadow&&k.shadow.map&&(k.shadow.map.texture.format===Br?$=k.shadow.map.texture:$=k.shadow.map.depthTexture||k.shadow.map.texture),k.isAmbientLight)u+=U.r*Q,h+=U.g*Q,d+=U.b*Q;else if(k.isLightProbe){for(let re=0;re<9;re++)i.probe[re].addScaledVector(k.sh.coefficients[re],Q);I++}else if(k.isDirectionalLight){const re=e.get(k);if(re.color.copy(k.color).multiplyScalar(k.intensity),k.castShadow){const Z=k.shadow,oe=t.get(k);oe.shadowIntensity=Z.intensity,oe.shadowBias=Z.bias,oe.shadowNormalBias=Z.normalBias,oe.shadowRadius=Z.radius,oe.shadowMapSize=Z.mapSize,i.directionalShadow[f]=oe,i.directionalShadowMap[f]=$,i.directionalShadowMatrix[f]=k.shadow.matrix,y++}i.directional[f]=re,f++}else if(k.isSpotLight){const re=e.get(k);re.position.setFromMatrixPosition(k.matrixWorld),re.color.copy(U).multiplyScalar(Q),re.distance=le,re.coneCos=Math.cos(k.angle),re.penumbraCos=Math.cos(k.angle*(1-k.penumbra)),re.decay=k.decay,i.spot[S]=re;const Z=k.shadow;if(k.map&&(i.spotLightMap[P]=k.map,P++,Z.updateMatrices(k),k.castShadow&&T++),i.spotLightMatrix[S]=Z.matrix,k.castShadow){const oe=t.get(k);oe.shadowIntensity=Z.intensity,oe.shadowBias=Z.bias,oe.shadowNormalBias=Z.normalBias,oe.shadowRadius=Z.radius,oe.shadowMapSize=Z.mapSize,i.spotShadow[S]=oe,i.spotShadowMap[S]=$,M++}S++}else if(k.isRectAreaLight){const re=e.get(k);re.color.copy(U).multiplyScalar(Q),re.halfWidth.set(k.width*.5,0,0),re.halfHeight.set(0,k.height*.5,0),i.rectArea[m]=re,m++}else if(k.isPointLight){const re=e.get(k);if(re.color.copy(k.color).multiplyScalar(k.intensity),re.distance=k.distance,re.decay=k.decay,k.castShadow){const Z=k.shadow,oe=t.get(k);oe.shadowIntensity=Z.intensity,oe.shadowBias=Z.bias,oe.shadowNormalBias=Z.normalBias,oe.shadowRadius=Z.radius,oe.shadowMapSize=Z.mapSize,oe.shadowCameraNear=Z.camera.near,oe.shadowCameraFar=Z.camera.far,i.pointShadow[x]=oe,i.pointShadowMap[x]=$,i.pointShadowMatrix[x]=k.shadow.matrix,R++}i.point[x]=re,x++}else if(k.isHemisphereLight){const re=e.get(k);re.skyColor.copy(k.color).multiplyScalar(Q),re.groundColor.copy(k.groundColor).multiplyScalar(Q),i.hemi[p]=re,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Ze.LTC_FLOAT_1,i.rectAreaLTC2=Ze.LTC_FLOAT_2):(i.rectAreaLTC1=Ze.LTC_HALF_1,i.rectAreaLTC2=Ze.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=h,i.ambient[2]=d;const v=i.hash;(v.directionalLength!==f||v.pointLength!==x||v.spotLength!==S||v.rectAreaLength!==m||v.hemiLength!==p||v.numDirectionalShadows!==y||v.numPointShadows!==R||v.numSpotShadows!==M||v.numSpotMaps!==P||v.numLightProbes!==I)&&(i.directional.length=f,i.spot.length=S,i.rectArea.length=m,i.point.length=x,i.hemi.length=p,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=R,i.pointShadowMap.length=R,i.spotShadow.length=M,i.spotShadowMap.length=M,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=R,i.spotLightMatrix.length=M+P-T,i.spotLightMap.length=P,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=I,v.directionalLength=f,v.pointLength=x,v.spotLength=S,v.rectAreaLength=m,v.hemiLength=p,v.numDirectionalShadows=y,v.numPointShadows=R,v.numSpotShadows=M,v.numSpotMaps=P,v.numLightProbes=I,i.version=TT++)}function l(c,u){let h=0,d=0,f=0,x=0,S=0;const m=u.matrixWorldInverse;for(let p=0,y=c.length;p<y;p++){const R=c[p];if(R.isDirectionalLight){const M=i.directional[h];M.direction.setFromMatrixPosition(R.matrixWorld),s.setFromMatrixPosition(R.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),h++}else if(R.isSpotLight){const M=i.spot[f];M.position.setFromMatrixPosition(R.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(R.matrixWorld),s.setFromMatrixPosition(R.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),f++}else if(R.isRectAreaLight){const M=i.rectArea[x];M.position.setFromMatrixPosition(R.matrixWorld),M.position.applyMatrix4(m),a.identity(),r.copy(R.matrixWorld),r.premultiply(m),a.extractRotation(r),M.halfWidth.set(R.width*.5,0,0),M.halfHeight.set(0,R.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),x++}else if(R.isPointLight){const M=i.point[d];M.position.setFromMatrixPosition(R.matrixWorld),M.position.applyMatrix4(m),d++}else if(R.isHemisphereLight){const M=i.hemi[S];M.direction.setFromMatrixPosition(R.matrixWorld),M.direction.transformDirection(m),S++}}}return{setup:o,setupView:l,state:i}}function g0(n){const e=new CT(n),t=[],i=[],s=[];function r(d){h.camera=d,t.length=0,i.length=0,s.length=0}function a(d){t.push(d)}function o(d){i.push(d)}function l(d){s.push(d)}function c(){e.setup(t)}function u(d){e.setupView(t,d)}const h={lightsArray:t,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function RT(n){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new g0(n),e.set(s,[o])):r>=a.length?(o=new g0(n),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const PT=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,DT=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,IT=[new L(1,0,0),new L(-1,0,0),new L(0,1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1)],LT=[new L(0,-1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1),new L(0,-1,0),new L(0,-1,0)],_0=new Jt,Jo=new L,Yd=new L;function NT(n,e,t){let i=new Bf;const s=new ut,r=new ut,a=new _n,o=new z1,l=new H1,c={},u=t.maxTextureSize,h={[nr]:vn,[vn]:nr,[Nt]:Nt},d=new ts({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ut},radius:{value:4}},vertexShader:PT,fragmentShader:DT}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const x=new jt;x.setAttribute("position",new gn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const S=new D(x,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Fc;let p=this.type;this.render=function(T,I,v){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;this.type===CM&&(vt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Fc);const A=n.getRenderTarget(),F=n.getActiveCubeFace(),k=n.getActiveMipmapLevel(),U=n.state;U.setBlending(bs),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const Q=p!==this.type;Q&&I.traverse(function(le){le.material&&(Array.isArray(le.material)?le.material.forEach($=>$.needsUpdate=!0):le.material.needsUpdate=!0)});for(let le=0,$=T.length;le<$;le++){const re=T[le],Z=re.shadow;if(Z===void 0){vt("WebGLShadowMap:",re,"has no shadow.");continue}if(Z.autoUpdate===!1&&Z.needsUpdate===!1)continue;s.copy(Z.mapSize);const oe=Z.getFrameExtents();s.multiply(oe),r.copy(Z.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/oe.x),s.x=r.x*oe.x,Z.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/oe.y),s.y=r.y*oe.y,Z.mapSize.y=r.y));const Ae=n.state.buffers.depth.getReversed();if(Z.camera._reversedDepth=Ae,Z.map===null||Q===!0){if(Z.map!==null&&(Z.map.depthTexture!==null&&(Z.map.depthTexture.dispose(),Z.map.depthTexture=null),Z.map.dispose()),this.type===tl){if(re.isPointLight){vt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}Z.map=new Qi(s.x,s.y,{format:Br,type:ws,minFilter:Rn,magFilter:Rn,generateMipmaps:!1}),Z.map.texture.name=re.name+".shadowMap",Z.map.depthTexture=new Ka(s.x,s.y,Fi),Z.map.depthTexture.name=re.name+".shadowMapDepth",Z.map.depthTexture.format=Es,Z.map.depthTexture.compareFunction=null,Z.map.depthTexture.minFilter=Hn,Z.map.depthTexture.magFilter=Hn}else re.isPointLight?(Z.map=new __(s.x),Z.map.depthTexture=new U1(s.x,es)):(Z.map=new Qi(s.x,s.y),Z.map.depthTexture=new Ka(s.x,s.y,es)),Z.map.depthTexture.name=re.name+".shadowMap",Z.map.depthTexture.format=Es,this.type===Fc?(Z.map.depthTexture.compareFunction=Ae?Ff:Uf,Z.map.depthTexture.minFilter=Rn,Z.map.depthTexture.magFilter=Rn):(Z.map.depthTexture.compareFunction=null,Z.map.depthTexture.minFilter=Hn,Z.map.depthTexture.magFilter=Hn);Z.camera.updateProjectionMatrix()}const Ge=Z.map.isWebGLCubeRenderTarget?6:1;for(let Fe=0;Fe<Ge;Fe++){if(Z.map.isWebGLCubeRenderTarget)n.setRenderTarget(Z.map,Fe),n.clear();else{Fe===0&&(n.setRenderTarget(Z.map),n.clear());const j=Z.getViewport(Fe);a.set(r.x*j.x,r.y*j.y,r.x*j.z,r.y*j.w),U.viewport(a)}if(re.isPointLight){const j=Z.camera,xe=Z.matrix,pt=re.distance||j.far;pt!==j.far&&(j.far=pt,j.updateProjectionMatrix()),Jo.setFromMatrixPosition(re.matrixWorld),j.position.copy(Jo),Yd.copy(j.position),Yd.add(IT[Fe]),j.up.copy(LT[Fe]),j.lookAt(Yd),j.updateMatrixWorld(),xe.makeTranslation(-Jo.x,-Jo.y,-Jo.z),_0.multiplyMatrices(j.projectionMatrix,j.matrixWorldInverse),Z._frustum.setFromProjectionMatrix(_0,j.coordinateSystem,j.reversedDepth)}else Z.updateMatrices(re);i=Z.getFrustum(),M(I,v,Z.camera,re,this.type)}Z.isPointLightShadow!==!0&&this.type===tl&&y(Z,v),Z.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(A,F,k)};function y(T,I){const v=e.update(S);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Qi(s.x,s.y,{format:Br,type:ws})),d.uniforms.shadow_pass.value=T.map.depthTexture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,n.setRenderTarget(T.mapPass),n.clear(),n.renderBufferDirect(I,null,v,d,S,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,n.setRenderTarget(T.map),n.clear(),n.renderBufferDirect(I,null,v,f,S,null)}function R(T,I,v,A){let F=null;const k=v.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(k!==void 0)F=k;else if(F=v.isPointLight===!0?l:o,n.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){const U=F.uuid,Q=I.uuid;let le=c[U];le===void 0&&(le={},c[U]=le);let $=le[Q];$===void 0&&($=F.clone(),le[Q]=$,I.addEventListener("dispose",P)),F=$}if(F.visible=I.visible,F.wireframe=I.wireframe,A===tl?F.side=I.shadowSide!==null?I.shadowSide:I.side:F.side=I.shadowSide!==null?I.shadowSide:h[I.side],F.alphaMap=I.alphaMap,F.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,F.map=I.map,F.clipShadows=I.clipShadows,F.clippingPlanes=I.clippingPlanes,F.clipIntersection=I.clipIntersection,F.displacementMap=I.displacementMap,F.displacementScale=I.displacementScale,F.displacementBias=I.displacementBias,F.wireframeLinewidth=I.wireframeLinewidth,F.linewidth=I.linewidth,v.isPointLight===!0&&F.isMeshDistanceMaterial===!0){const U=n.properties.get(F);U.light=v}return F}function M(T,I,v,A,F){if(T.visible===!1)return;if(T.layers.test(I.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&F===tl)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,T.matrixWorld);const Q=e.update(T),le=T.material;if(Array.isArray(le)){const $=Q.groups;for(let re=0,Z=$.length;re<Z;re++){const oe=$[re],Ae=le[oe.materialIndex];if(Ae&&Ae.visible){const Ge=R(T,Ae,A,F);T.onBeforeShadow(n,T,I,v,Q,Ge,oe),n.renderBufferDirect(v,null,Q,Ge,T,oe),T.onAfterShadow(n,T,I,v,Q,Ge,oe)}}}else if(le.visible){const $=R(T,le,A,F);T.onBeforeShadow(n,T,I,v,Q,$,null),n.renderBufferDirect(v,null,Q,$,T,null),T.onAfterShadow(n,T,I,v,Q,$,null)}}const U=T.children;for(let Q=0,le=U.length;Q<le;Q++)M(U[Q],I,v,A,F)}function P(T){T.target.removeEventListener("dispose",P);for(const v in c){const A=c[v],F=T.target.uuid;F in A&&(A[F].dispose(),delete A[F])}}}function UT(n,e){function t(){let Y=!1;const Be=new _n;let be=null;const Ve=new _n(0,0,0,0);return{setMask:function(Ke){be!==Ke&&!Y&&(n.colorMask(Ke,Ke,Ke,Ke),be=Ke)},setLocked:function(Ke){Y=Ke},setClear:function(Ke,Se,st,it,qt){qt===!0&&(Ke*=it,Se*=it,st*=it),Be.set(Ke,Se,st,it),Ve.equals(Be)===!1&&(n.clearColor(Ke,Se,st,it),Ve.copy(Be))},reset:function(){Y=!1,be=null,Ve.set(-1,0,0,0)}}}function i(){let Y=!1,Be=!1,be=null,Ve=null,Ke=null;return{setReversed:function(Se){if(Be!==Se){const st=e.get("EXT_clip_control");Se?st.clipControlEXT(st.LOWER_LEFT_EXT,st.ZERO_TO_ONE_EXT):st.clipControlEXT(st.LOWER_LEFT_EXT,st.NEGATIVE_ONE_TO_ONE_EXT),Be=Se;const it=Ke;Ke=null,this.setClear(it)}},getReversed:function(){return Be},setTest:function(Se){Se?Ce(n.DEPTH_TEST):ft(n.DEPTH_TEST)},setMask:function(Se){be!==Se&&!Y&&(n.depthMask(Se),be=Se)},setFunc:function(Se){if(Be&&(Se=o1[Se]),Ve!==Se){switch(Se){case ph:n.depthFunc(n.NEVER);break;case mh:n.depthFunc(n.ALWAYS);break;case gh:n.depthFunc(n.LESS);break;case Ya:n.depthFunc(n.LEQUAL);break;case _h:n.depthFunc(n.EQUAL);break;case xh:n.depthFunc(n.GEQUAL);break;case vh:n.depthFunc(n.GREATER);break;case bh:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Ve=Se}},setLocked:function(Se){Y=Se},setClear:function(Se){Ke!==Se&&(Ke=Se,Be&&(Se=1-Se),n.clearDepth(Se))},reset:function(){Y=!1,be=null,Ve=null,Ke=null,Be=!1}}}function s(){let Y=!1,Be=null,be=null,Ve=null,Ke=null,Se=null,st=null,it=null,qt=null;return{setTest:function(Ft){Y||(Ft?Ce(n.STENCIL_TEST):ft(n.STENCIL_TEST))},setMask:function(Ft){Be!==Ft&&!Y&&(n.stencilMask(Ft),Be=Ft)},setFunc:function(Ft,Vn,jn){(be!==Ft||Ve!==Vn||Ke!==jn)&&(n.stencilFunc(Ft,Vn,jn),be=Ft,Ve=Vn,Ke=jn)},setOp:function(Ft,Vn,jn){(Se!==Ft||st!==Vn||it!==jn)&&(n.stencilOp(Ft,Vn,jn),Se=Ft,st=Vn,it=jn)},setLocked:function(Ft){Y=Ft},setClear:function(Ft){qt!==Ft&&(n.clearStencil(Ft),qt=Ft)},reset:function(){Y=!1,Be=null,be=null,Ve=null,Ke=null,Se=null,st=null,it=null,qt=null}}}const r=new t,a=new i,o=new s,l=new WeakMap,c=new WeakMap;let u={},h={},d={},f=new WeakMap,x=[],S=null,m=!1,p=null,y=null,R=null,M=null,P=null,T=null,I=null,v=new $e(0,0,0),A=0,F=!1,k=null,U=null,Q=null,le=null,$=null;const re=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Z=!1,oe=0;const Ae=n.getParameter(n.VERSION);Ae.indexOf("WebGL")!==-1?(oe=parseFloat(/^WebGL (\d)/.exec(Ae)[1]),Z=oe>=1):Ae.indexOf("OpenGL ES")!==-1&&(oe=parseFloat(/^OpenGL ES (\d)/.exec(Ae)[1]),Z=oe>=2);let Ge=null,Fe={};const j=n.getParameter(n.SCISSOR_BOX),xe=n.getParameter(n.VIEWPORT),pt=new _n().fromArray(j),At=new _n().fromArray(xe);function fe(Y,Be,be,Ve){const Ke=new Uint8Array(4),Se=n.createTexture();n.bindTexture(Y,Se),n.texParameteri(Y,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(Y,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let st=0;st<be;st++)Y===n.TEXTURE_3D||Y===n.TEXTURE_2D_ARRAY?n.texImage3D(Be,0,n.RGBA,1,1,Ve,0,n.RGBA,n.UNSIGNED_BYTE,Ke):n.texImage2D(Be+st,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Ke);return Se}const Oe={};Oe[n.TEXTURE_2D]=fe(n.TEXTURE_2D,n.TEXTURE_2D,1),Oe[n.TEXTURE_CUBE_MAP]=fe(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Oe[n.TEXTURE_2D_ARRAY]=fe(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Oe[n.TEXTURE_3D]=fe(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Ce(n.DEPTH_TEST),a.setFunc(Ya),pe(!1),De(om),Ce(n.CULL_FACE),he(bs);function Ce(Y){u[Y]!==!0&&(n.enable(Y),u[Y]=!0)}function ft(Y){u[Y]!==!1&&(n.disable(Y),u[Y]=!1)}function mt(Y,Be){return d[Y]!==Be?(n.bindFramebuffer(Y,Be),d[Y]=Be,Y===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=Be),Y===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=Be),!0):!1}function ht(Y,Be){let be=x,Ve=!1;if(Y){be=f.get(Be),be===void 0&&(be=[],f.set(Be,be));const Ke=Y.textures;if(be.length!==Ke.length||be[0]!==n.COLOR_ATTACHMENT0){for(let Se=0,st=Ke.length;Se<st;Se++)be[Se]=n.COLOR_ATTACHMENT0+Se;be.length=Ke.length,Ve=!0}}else be[0]!==n.BACK&&(be[0]=n.BACK,Ve=!0);Ve&&n.drawBuffers(be)}function O(Y){return S!==Y?(n.useProgram(Y),S=Y,!0):!1}const B={[Pr]:n.FUNC_ADD,[PM]:n.FUNC_SUBTRACT,[DM]:n.FUNC_REVERSE_SUBTRACT};B[IM]=n.MIN,B[LM]=n.MAX;const ne={[NM]:n.ZERO,[UM]:n.ONE,[FM]:n.SRC_COLOR,[hh]:n.SRC_ALPHA,[HM]:n.SRC_ALPHA_SATURATE,[GM]:n.DST_COLOR,[kM]:n.DST_ALPHA,[OM]:n.ONE_MINUS_SRC_COLOR,[fh]:n.ONE_MINUS_SRC_ALPHA,[zM]:n.ONE_MINUS_DST_COLOR,[BM]:n.ONE_MINUS_DST_ALPHA,[VM]:n.CONSTANT_COLOR,[WM]:n.ONE_MINUS_CONSTANT_COLOR,[XM]:n.CONSTANT_ALPHA,[YM]:n.ONE_MINUS_CONSTANT_ALPHA};function he(Y,Be,be,Ve,Ke,Se,st,it,qt,Ft){if(Y===bs){m===!0&&(ft(n.BLEND),m=!1);return}if(m===!1&&(Ce(n.BLEND),m=!0),Y!==RM){if(Y!==p||Ft!==F){if((y!==Pr||P!==Pr)&&(n.blendEquation(n.FUNC_ADD),y=Pr,P=Pr),Ft)switch(Y){case Ga:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case bt:n.blendFunc(n.ONE,n.ONE);break;case lm:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case cm:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Bt("WebGLState: Invalid blending: ",Y);break}else switch(Y){case Ga:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case bt:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case lm:Bt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case cm:Bt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Bt("WebGLState: Invalid blending: ",Y);break}R=null,M=null,T=null,I=null,v.set(0,0,0),A=0,p=Y,F=Ft}return}Ke=Ke||Be,Se=Se||be,st=st||Ve,(Be!==y||Ke!==P)&&(n.blendEquationSeparate(B[Be],B[Ke]),y=Be,P=Ke),(be!==R||Ve!==M||Se!==T||st!==I)&&(n.blendFuncSeparate(ne[be],ne[Ve],ne[Se],ne[st]),R=be,M=Ve,T=Se,I=st),(it.equals(v)===!1||qt!==A)&&(n.blendColor(it.r,it.g,it.b,qt),v.copy(it),A=qt),p=Y,F=!1}function ue(Y,Be){Y.side===Nt?ft(n.CULL_FACE):Ce(n.CULL_FACE);let be=Y.side===vn;Be&&(be=!be),pe(be),Y.blending===Ga&&Y.transparent===!1?he(bs):he(Y.blending,Y.blendEquation,Y.blendSrc,Y.blendDst,Y.blendEquationAlpha,Y.blendSrcAlpha,Y.blendDstAlpha,Y.blendColor,Y.blendAlpha,Y.premultipliedAlpha),a.setFunc(Y.depthFunc),a.setTest(Y.depthTest),a.setMask(Y.depthWrite),r.setMask(Y.colorWrite);const Ve=Y.stencilWrite;o.setTest(Ve),Ve&&(o.setMask(Y.stencilWriteMask),o.setFunc(Y.stencilFunc,Y.stencilRef,Y.stencilFuncMask),o.setOp(Y.stencilFail,Y.stencilZFail,Y.stencilZPass)),Re(Y.polygonOffset,Y.polygonOffsetFactor,Y.polygonOffsetUnits),Y.alphaToCoverage===!0?Ce(n.SAMPLE_ALPHA_TO_COVERAGE):ft(n.SAMPLE_ALPHA_TO_COVERAGE)}function pe(Y){k!==Y&&(Y?n.frontFace(n.CW):n.frontFace(n.CCW),k=Y)}function De(Y){Y!==TM?(Ce(n.CULL_FACE),Y!==U&&(Y===om?n.cullFace(n.BACK):Y===AM?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ft(n.CULL_FACE),U=Y}function Pe(Y){Y!==Q&&(Z&&n.lineWidth(Y),Q=Y)}function Re(Y,Be,be){Y?(Ce(n.POLYGON_OFFSET_FILL),(le!==Be||$!==be)&&(le=Be,$=be,a.getReversed()&&(Be=-Be),n.polygonOffset(Be,be))):ft(n.POLYGON_OFFSET_FILL)}function ve(Y){Y?Ce(n.SCISSOR_TEST):ft(n.SCISSOR_TEST)}function qe(Y){Y===void 0&&(Y=n.TEXTURE0+re-1),Ge!==Y&&(n.activeTexture(Y),Ge=Y)}function N(Y,Be,be){be===void 0&&(Ge===null?be=n.TEXTURE0+re-1:be=Ge);let Ve=Fe[be];Ve===void 0&&(Ve={type:void 0,texture:void 0},Fe[be]=Ve),(Ve.type!==Y||Ve.texture!==Be)&&(Ge!==be&&(n.activeTexture(be),Ge=be),n.bindTexture(Y,Be||Oe[Y]),Ve.type=Y,Ve.texture=Be)}function je(){const Y=Fe[Ge];Y!==void 0&&Y.type!==void 0&&(n.bindTexture(Y.type,null),Y.type=void 0,Y.texture=void 0)}function We(){try{n.compressedTexImage2D(...arguments)}catch(Y){Bt("WebGLState:",Y)}}function C(){try{n.compressedTexImage3D(...arguments)}catch(Y){Bt("WebGLState:",Y)}}function _(){try{n.texSubImage2D(...arguments)}catch(Y){Bt("WebGLState:",Y)}}function V(){try{n.texSubImage3D(...arguments)}catch(Y){Bt("WebGLState:",Y)}}function J(){try{n.compressedTexSubImage2D(...arguments)}catch(Y){Bt("WebGLState:",Y)}}function ae(){try{n.compressedTexSubImage3D(...arguments)}catch(Y){Bt("WebGLState:",Y)}}function Ee(){try{n.texStorage2D(...arguments)}catch(Y){Bt("WebGLState:",Y)}}function Ne(){try{n.texStorage3D(...arguments)}catch(Y){Bt("WebGLState:",Y)}}function ce(){try{n.texImage2D(...arguments)}catch(Y){Bt("WebGLState:",Y)}}function me(){try{n.texImage3D(...arguments)}catch(Y){Bt("WebGLState:",Y)}}function Le(Y){return h[Y]!==void 0?h[Y]:n.getParameter(Y)}function Je(Y,Be){h[Y]!==Be&&(n.pixelStorei(Y,Be),h[Y]=Be)}function ze(Y){pt.equals(Y)===!1&&(n.scissor(Y.x,Y.y,Y.z,Y.w),pt.copy(Y))}function ke(Y){At.equals(Y)===!1&&(n.viewport(Y.x,Y.y,Y.z,Y.w),At.copy(Y))}function rt(Y,Be){let be=c.get(Be);be===void 0&&(be=new WeakMap,c.set(Be,be));let Ve=be.get(Y);Ve===void 0&&(Ve=n.getUniformBlockIndex(Be,Y.name),be.set(Y,Ve))}function dt(Y,Be){const Ve=c.get(Be).get(Y);l.get(Be)!==Ve&&(n.uniformBlockBinding(Be,Ve,Y.__bindingPointIndex),l.set(Be,Ve))}function yt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},h={},Ge=null,Fe={},d={},f=new WeakMap,x=[],S=null,m=!1,p=null,y=null,R=null,M=null,P=null,T=null,I=null,v=new $e(0,0,0),A=0,F=!1,k=null,U=null,Q=null,le=null,$=null,pt.set(0,0,n.canvas.width,n.canvas.height),At.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:Ce,disable:ft,bindFramebuffer:mt,drawBuffers:ht,useProgram:O,setBlending:he,setMaterial:ue,setFlipSided:pe,setCullFace:De,setLineWidth:Pe,setPolygonOffset:Re,setScissorTest:ve,activeTexture:qe,bindTexture:N,unbindTexture:je,compressedTexImage2D:We,compressedTexImage3D:C,texImage2D:ce,texImage3D:me,pixelStorei:Je,getParameter:Le,updateUBOMapping:rt,uniformBlockBinding:dt,texStorage2D:Ee,texStorage3D:Ne,texSubImage2D:_,texSubImage3D:V,compressedTexSubImage2D:J,compressedTexSubImage3D:ae,scissor:ze,viewport:ke,reset:yt}}function FT(n,e,t,i,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ut,u=new WeakMap,h=new Set;let d;const f=new WeakMap;let x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function S(C,_){return x?new OffscreenCanvas(C,_):su("canvas")}function m(C,_,V){let J=1;const ae=We(C);if((ae.width>V||ae.height>V)&&(J=V/Math.max(ae.width,ae.height)),J<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const Ee=Math.floor(J*ae.width),Ne=Math.floor(J*ae.height);d===void 0&&(d=S(Ee,Ne));const ce=_?S(Ee,Ne):d;return ce.width=Ee,ce.height=Ne,ce.getContext("2d").drawImage(C,0,0,Ee,Ne),vt("WebGLRenderer: Texture has been resized from ("+ae.width+"x"+ae.height+") to ("+Ee+"x"+Ne+")."),ce}else return"data"in C&&vt("WebGLRenderer: Image in DataTexture is too big ("+ae.width+"x"+ae.height+")."),C;return C}function p(C){return C.generateMipmaps}function y(C){n.generateMipmap(C)}function R(C){return C.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?n.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function M(C,_,V,J,ae,Ee=!1){if(C!==null){if(n[C]!==void 0)return n[C];vt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let Ne;J&&(Ne=e.get("EXT_texture_norm16"),Ne||vt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ce=_;if(_===n.RED&&(V===n.FLOAT&&(ce=n.R32F),V===n.HALF_FLOAT&&(ce=n.R16F),V===n.UNSIGNED_BYTE&&(ce=n.R8),V===n.UNSIGNED_SHORT&&Ne&&(ce=Ne.R16_EXT),V===n.SHORT&&Ne&&(ce=Ne.R16_SNORM_EXT)),_===n.RED_INTEGER&&(V===n.UNSIGNED_BYTE&&(ce=n.R8UI),V===n.UNSIGNED_SHORT&&(ce=n.R16UI),V===n.UNSIGNED_INT&&(ce=n.R32UI),V===n.BYTE&&(ce=n.R8I),V===n.SHORT&&(ce=n.R16I),V===n.INT&&(ce=n.R32I)),_===n.RG&&(V===n.FLOAT&&(ce=n.RG32F),V===n.HALF_FLOAT&&(ce=n.RG16F),V===n.UNSIGNED_BYTE&&(ce=n.RG8),V===n.UNSIGNED_SHORT&&Ne&&(ce=Ne.RG16_EXT),V===n.SHORT&&Ne&&(ce=Ne.RG16_SNORM_EXT)),_===n.RG_INTEGER&&(V===n.UNSIGNED_BYTE&&(ce=n.RG8UI),V===n.UNSIGNED_SHORT&&(ce=n.RG16UI),V===n.UNSIGNED_INT&&(ce=n.RG32UI),V===n.BYTE&&(ce=n.RG8I),V===n.SHORT&&(ce=n.RG16I),V===n.INT&&(ce=n.RG32I)),_===n.RGB_INTEGER&&(V===n.UNSIGNED_BYTE&&(ce=n.RGB8UI),V===n.UNSIGNED_SHORT&&(ce=n.RGB16UI),V===n.UNSIGNED_INT&&(ce=n.RGB32UI),V===n.BYTE&&(ce=n.RGB8I),V===n.SHORT&&(ce=n.RGB16I),V===n.INT&&(ce=n.RGB32I)),_===n.RGBA_INTEGER&&(V===n.UNSIGNED_BYTE&&(ce=n.RGBA8UI),V===n.UNSIGNED_SHORT&&(ce=n.RGBA16UI),V===n.UNSIGNED_INT&&(ce=n.RGBA32UI),V===n.BYTE&&(ce=n.RGBA8I),V===n.SHORT&&(ce=n.RGBA16I),V===n.INT&&(ce=n.RGBA32I)),_===n.RGB&&(V===n.UNSIGNED_SHORT&&Ne&&(ce=Ne.RGB16_EXT),V===n.SHORT&&Ne&&(ce=Ne.RGB16_SNORM_EXT),V===n.UNSIGNED_INT_5_9_9_9_REV&&(ce=n.RGB9_E5),V===n.UNSIGNED_INT_10F_11F_11F_REV&&(ce=n.R11F_G11F_B10F)),_===n.RGBA){const me=Ee?iu:Gt.getTransfer(ae);V===n.FLOAT&&(ce=n.RGBA32F),V===n.HALF_FLOAT&&(ce=n.RGBA16F),V===n.UNSIGNED_BYTE&&(ce=me===Zt?n.SRGB8_ALPHA8:n.RGBA8),V===n.UNSIGNED_SHORT&&Ne&&(ce=Ne.RGBA16_EXT),V===n.SHORT&&Ne&&(ce=Ne.RGBA16_SNORM_EXT),V===n.UNSIGNED_SHORT_4_4_4_4&&(ce=n.RGBA4),V===n.UNSIGNED_SHORT_5_5_5_1&&(ce=n.RGB5_A1)}return(ce===n.R16F||ce===n.R32F||ce===n.RG16F||ce===n.RG32F||ce===n.RGBA16F||ce===n.RGBA32F)&&e.get("EXT_color_buffer_float"),ce}function P(C,_){let V;return C?_===null||_===es||_===bl?V=n.DEPTH24_STENCIL8:_===Fi?V=n.DEPTH32F_STENCIL8:_===vl&&(V=n.DEPTH24_STENCIL8,vt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===es||_===bl?V=n.DEPTH_COMPONENT24:_===Fi?V=n.DEPTH_COMPONENT32F:_===vl&&(V=n.DEPTH_COMPONENT16),V}function T(C,_){return p(C)===!0||C.isFramebufferTexture&&C.minFilter!==Hn&&C.minFilter!==Rn?Math.log2(Math.max(_.width,_.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?_.mipmaps.length:1}function I(C){const _=C.target;_.removeEventListener("dispose",I),A(_),_.isVideoTexture&&u.delete(_),_.isHTMLTexture&&h.delete(_)}function v(C){const _=C.target;_.removeEventListener("dispose",v),k(_)}function A(C){const _=i.get(C);if(_.__webglInit===void 0)return;const V=C.source,J=f.get(V);if(J){const ae=J[_.__cacheKey];ae.usedTimes--,ae.usedTimes===0&&F(C),Object.keys(J).length===0&&f.delete(V)}i.remove(C)}function F(C){const _=i.get(C);n.deleteTexture(_.__webglTexture);const V=C.source,J=f.get(V);delete J[_.__cacheKey],a.memory.textures--}function k(C){const _=i.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),i.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(_.__webglFramebuffer[J]))for(let ae=0;ae<_.__webglFramebuffer[J].length;ae++)n.deleteFramebuffer(_.__webglFramebuffer[J][ae]);else n.deleteFramebuffer(_.__webglFramebuffer[J]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[J])}else{if(Array.isArray(_.__webglFramebuffer))for(let J=0;J<_.__webglFramebuffer.length;J++)n.deleteFramebuffer(_.__webglFramebuffer[J]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let J=0;J<_.__webglColorRenderbuffer.length;J++)_.__webglColorRenderbuffer[J]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[J]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const V=C.textures;for(let J=0,ae=V.length;J<ae;J++){const Ee=i.get(V[J]);Ee.__webglTexture&&(n.deleteTexture(Ee.__webglTexture),a.memory.textures--),i.remove(V[J])}i.remove(C)}let U=0;function Q(){U=0}function le(){return U}function $(C){U=C}function re(){const C=U;return C>=s.maxTextures&&vt("WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),U+=1,C}function Z(C){const _=[];return _.push(C.wrapS),_.push(C.wrapT),_.push(C.wrapR||0),_.push(C.magFilter),_.push(C.minFilter),_.push(C.anisotropy),_.push(C.internalFormat),_.push(C.format),_.push(C.type),_.push(C.generateMipmaps),_.push(C.premultiplyAlpha),_.push(C.flipY),_.push(C.unpackAlignment),_.push(C.colorSpace),_.join()}function oe(C,_){const V=i.get(C);if(C.isVideoTexture&&N(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&V.__version!==C.version){const J=C.image;if(J===null)vt("WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)vt("WebGLRenderer: Texture marked for update but image is incomplete");else{ft(V,C,_);return}}else C.isExternalTexture&&(V.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,V.__webglTexture,n.TEXTURE0+_)}function Ae(C,_){const V=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&V.__version!==C.version){ft(V,C,_);return}else C.isExternalTexture&&(V.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,V.__webglTexture,n.TEXTURE0+_)}function Ge(C,_){const V=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&V.__version!==C.version){ft(V,C,_);return}t.bindTexture(n.TEXTURE_3D,V.__webglTexture,n.TEXTURE0+_)}function Fe(C,_){const V=i.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&V.__version!==C.version){mt(V,C,_);return}t.bindTexture(n.TEXTURE_CUBE_MAP,V.__webglTexture,n.TEXTURE0+_)}const j={[Ei]:n.REPEAT,[$i]:n.CLAMP_TO_EDGE,[yh]:n.MIRRORED_REPEAT},xe={[Hn]:n.NEAREST,[$M]:n.NEAREST_MIPMAP_NEAREST,[ql]:n.NEAREST_MIPMAP_LINEAR,[Rn]:n.LINEAR,[hd]:n.LINEAR_MIPMAP_NEAREST,[Lr]:n.LINEAR_MIPMAP_LINEAR},pt={[JM]:n.NEVER,[i1]:n.ALWAYS,[QM]:n.LESS,[Uf]:n.LEQUAL,[e1]:n.EQUAL,[Ff]:n.GEQUAL,[t1]:n.GREATER,[n1]:n.NOTEQUAL};function At(C,_){if(_.type===Fi&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Rn||_.magFilter===hd||_.magFilter===ql||_.magFilter===Lr||_.minFilter===Rn||_.minFilter===hd||_.minFilter===ql||_.minFilter===Lr)&&vt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(C,n.TEXTURE_WRAP_S,j[_.wrapS]),n.texParameteri(C,n.TEXTURE_WRAP_T,j[_.wrapT]),(C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY)&&n.texParameteri(C,n.TEXTURE_WRAP_R,j[_.wrapR]),n.texParameteri(C,n.TEXTURE_MAG_FILTER,xe[_.magFilter]),n.texParameteri(C,n.TEXTURE_MIN_FILTER,xe[_.minFilter]),_.compareFunction&&(n.texParameteri(C,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(C,n.TEXTURE_COMPARE_FUNC,pt[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Hn||_.minFilter!==ql&&_.minFilter!==Lr||_.type===Fi&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){const V=e.get("EXT_texture_filter_anisotropic");n.texParameterf(C,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function fe(C,_){let V=!1;C.__webglInit===void 0&&(C.__webglInit=!0,_.addEventListener("dispose",I));const J=_.source;let ae=f.get(J);ae===void 0&&(ae={},f.set(J,ae));const Ee=Z(_);if(Ee!==C.__cacheKey){ae[Ee]===void 0&&(ae[Ee]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,V=!0),ae[Ee].usedTimes++;const Ne=ae[C.__cacheKey];Ne!==void 0&&(ae[C.__cacheKey].usedTimes--,Ne.usedTimes===0&&F(_)),C.__cacheKey=Ee,C.__webglTexture=ae[Ee].texture}return V}function Oe(C,_,V){return Math.floor(Math.floor(C/V)/_)}function Ce(C,_,V,J){const Ee=C.updateRanges;if(Ee.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,_.width,_.height,V,J,_.data);else{Ee.sort((Je,ze)=>Je.start-ze.start);let Ne=0;for(let Je=1;Je<Ee.length;Je++){const ze=Ee[Ne],ke=Ee[Je],rt=ze.start+ze.count,dt=Oe(ke.start,_.width,4),yt=Oe(ze.start,_.width,4);ke.start<=rt+1&&dt===yt&&Oe(ke.start+ke.count-1,_.width,4)===dt?ze.count=Math.max(ze.count,ke.start+ke.count-ze.start):(++Ne,Ee[Ne]=ke)}Ee.length=Ne+1;const ce=t.getParameter(n.UNPACK_ROW_LENGTH),me=t.getParameter(n.UNPACK_SKIP_PIXELS),Le=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,_.width);for(let Je=0,ze=Ee.length;Je<ze;Je++){const ke=Ee[Je],rt=Math.floor(ke.start/4),dt=Math.ceil(ke.count/4),yt=rt%_.width,Y=Math.floor(rt/_.width),Be=dt,be=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,yt),t.pixelStorei(n.UNPACK_SKIP_ROWS,Y),t.texSubImage2D(n.TEXTURE_2D,0,yt,Y,Be,be,V,J,_.data)}C.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,ce),t.pixelStorei(n.UNPACK_SKIP_PIXELS,me),t.pixelStorei(n.UNPACK_SKIP_ROWS,Le)}}function ft(C,_,V){let J=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(J=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(J=n.TEXTURE_3D);const ae=fe(C,_),Ee=_.source;t.bindTexture(J,C.__webglTexture,n.TEXTURE0+V);const Ne=i.get(Ee);if(Ee.version!==Ne.__version||ae===!0){if(t.activeTexture(n.TEXTURE0+V),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){const be=Gt.getPrimaries(Gt.workingColorSpace),Ve=_.colorSpace===Zs?null:Gt.getPrimaries(_.colorSpace),Ke=_.colorSpace===Zs||be===Ve?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ke)}t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment);let me=m(_.image,!1,s.maxTextureSize);me=je(_,me);const Le=r.convert(_.format,_.colorSpace),Je=r.convert(_.type);let ze=M(_.internalFormat,Le,Je,_.normalized,_.colorSpace,_.isVideoTexture);At(J,_);let ke;const rt=_.mipmaps,dt=_.isVideoTexture!==!0,yt=Ne.__version===void 0||ae===!0,Y=Ee.dataReady,Be=T(_,me);if(_.isDepthTexture)ze=P(_.format===Nr,_.type),yt&&(dt?t.texStorage2D(n.TEXTURE_2D,1,ze,me.width,me.height):t.texImage2D(n.TEXTURE_2D,0,ze,me.width,me.height,0,Le,Je,null));else if(_.isDataTexture)if(rt.length>0){dt&&yt&&t.texStorage2D(n.TEXTURE_2D,Be,ze,rt[0].width,rt[0].height);for(let be=0,Ve=rt.length;be<Ve;be++)ke=rt[be],dt?Y&&t.texSubImage2D(n.TEXTURE_2D,be,0,0,ke.width,ke.height,Le,Je,ke.data):t.texImage2D(n.TEXTURE_2D,be,ze,ke.width,ke.height,0,Le,Je,ke.data);_.generateMipmaps=!1}else dt?(yt&&t.texStorage2D(n.TEXTURE_2D,Be,ze,me.width,me.height),Y&&Ce(_,me,Le,Je)):t.texImage2D(n.TEXTURE_2D,0,ze,me.width,me.height,0,Le,Je,me.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){dt&&yt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Be,ze,rt[0].width,rt[0].height,me.depth);for(let be=0,Ve=rt.length;be<Ve;be++)if(ke=rt[be],_.format!==Oi)if(Le!==null)if(dt){if(Y)if(_.layerUpdates.size>0){const Ke=Km(ke.width,ke.height,_.format,_.type);for(const Se of _.layerUpdates){const st=ke.data.subarray(Se*Ke/ke.data.BYTES_PER_ELEMENT,(Se+1)*Ke/ke.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,be,0,0,Se,ke.width,ke.height,1,Le,st)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,be,0,0,0,ke.width,ke.height,me.depth,Le,ke.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,be,ze,ke.width,ke.height,me.depth,0,ke.data,0,0);else vt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else dt?Y&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,be,0,0,0,ke.width,ke.height,me.depth,Le,Je,ke.data):t.texImage3D(n.TEXTURE_2D_ARRAY,be,ze,ke.width,ke.height,me.depth,0,Le,Je,ke.data)}else{dt&&yt&&t.texStorage2D(n.TEXTURE_2D,Be,ze,rt[0].width,rt[0].height);for(let be=0,Ve=rt.length;be<Ve;be++)ke=rt[be],_.format!==Oi?Le!==null?dt?Y&&t.compressedTexSubImage2D(n.TEXTURE_2D,be,0,0,ke.width,ke.height,Le,ke.data):t.compressedTexImage2D(n.TEXTURE_2D,be,ze,ke.width,ke.height,0,ke.data):vt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):dt?Y&&t.texSubImage2D(n.TEXTURE_2D,be,0,0,ke.width,ke.height,Le,Je,ke.data):t.texImage2D(n.TEXTURE_2D,be,ze,ke.width,ke.height,0,Le,Je,ke.data)}else if(_.isDataArrayTexture)if(dt){if(yt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Be,ze,me.width,me.height,me.depth),Y)if(_.layerUpdates.size>0){const be=Km(me.width,me.height,_.format,_.type);for(const Ve of _.layerUpdates){const Ke=me.data.subarray(Ve*be/me.data.BYTES_PER_ELEMENT,(Ve+1)*be/me.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Ve,me.width,me.height,1,Le,Je,Ke)}_.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,me.width,me.height,me.depth,Le,Je,me.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,ze,me.width,me.height,me.depth,0,Le,Je,me.data);else if(_.isData3DTexture)dt?(yt&&t.texStorage3D(n.TEXTURE_3D,Be,ze,me.width,me.height,me.depth),Y&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,me.width,me.height,me.depth,Le,Je,me.data)):t.texImage3D(n.TEXTURE_3D,0,ze,me.width,me.height,me.depth,0,Le,Je,me.data);else if(_.isFramebufferTexture){if(yt)if(dt)t.texStorage2D(n.TEXTURE_2D,Be,ze,me.width,me.height);else{let be=me.width,Ve=me.height;for(let Ke=0;Ke<Be;Ke++)t.texImage2D(n.TEXTURE_2D,Ke,ze,be,Ve,0,Le,Je,null),be>>=1,Ve>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in n){const be=n.canvas;if(be.hasAttribute("layoutsubtree")||be.setAttribute("layoutsubtree","true"),me.parentNode!==be){be.appendChild(me),h.add(_),be.onpaint=Ve=>{const Ke=Ve.changedElements;for(const Se of h)Ke.includes(Se.image)&&(Se.needsUpdate=!0)},be.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,me);else{const Ke=n.RGBA,Se=n.RGBA,st=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Ke,Se,st,me)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(rt.length>0){if(dt&&yt){const be=We(rt[0]);t.texStorage2D(n.TEXTURE_2D,Be,ze,be.width,be.height)}for(let be=0,Ve=rt.length;be<Ve;be++)ke=rt[be],dt?Y&&t.texSubImage2D(n.TEXTURE_2D,be,0,0,Le,Je,ke):t.texImage2D(n.TEXTURE_2D,be,ze,Le,Je,ke);_.generateMipmaps=!1}else if(dt){if(yt){const be=We(me);t.texStorage2D(n.TEXTURE_2D,Be,ze,be.width,be.height)}Y&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,Le,Je,me)}else t.texImage2D(n.TEXTURE_2D,0,ze,Le,Je,me);p(_)&&y(J),Ne.__version=Ee.version,_.onUpdate&&_.onUpdate(_)}C.__version=_.version}function mt(C,_,V){if(_.image.length!==6)return;const J=fe(C,_),ae=_.source;t.bindTexture(n.TEXTURE_CUBE_MAP,C.__webglTexture,n.TEXTURE0+V);const Ee=i.get(ae);if(ae.version!==Ee.__version||J===!0){t.activeTexture(n.TEXTURE0+V);const Ne=Gt.getPrimaries(Gt.workingColorSpace),ce=_.colorSpace===Zs?null:Gt.getPrimaries(_.colorSpace),me=_.colorSpace===Zs||Ne===ce?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);const Le=_.isCompressedTexture||_.image[0].isCompressedTexture,Je=_.image[0]&&_.image[0].isDataTexture,ze=[];for(let Se=0;Se<6;Se++)!Le&&!Je?ze[Se]=m(_.image[Se],!0,s.maxCubemapSize):ze[Se]=Je?_.image[Se].image:_.image[Se],ze[Se]=je(_,ze[Se]);const ke=ze[0],rt=r.convert(_.format,_.colorSpace),dt=r.convert(_.type),yt=M(_.internalFormat,rt,dt,_.normalized,_.colorSpace),Y=_.isVideoTexture!==!0,Be=Ee.__version===void 0||J===!0,be=ae.dataReady;let Ve=T(_,ke);At(n.TEXTURE_CUBE_MAP,_);let Ke;if(Le){Y&&Be&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Ve,yt,ke.width,ke.height);for(let Se=0;Se<6;Se++){Ke=ze[Se].mipmaps;for(let st=0;st<Ke.length;st++){const it=Ke[st];_.format!==Oi?rt!==null?Y?be&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Se,st,0,0,it.width,it.height,rt,it.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Se,st,yt,it.width,it.height,0,it.data):vt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Y?be&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Se,st,0,0,it.width,it.height,rt,dt,it.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Se,st,yt,it.width,it.height,0,rt,dt,it.data)}}}else{if(Ke=_.mipmaps,Y&&Be){Ke.length>0&&Ve++;const Se=We(ze[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Ve,yt,Se.width,Se.height)}for(let Se=0;Se<6;Se++)if(Je){Y?be&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,0,0,ze[Se].width,ze[Se].height,rt,dt,ze[Se].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,yt,ze[Se].width,ze[Se].height,0,rt,dt,ze[Se].data);for(let st=0;st<Ke.length;st++){const qt=Ke[st].image[Se].image;Y?be&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Se,st+1,0,0,qt.width,qt.height,rt,dt,qt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Se,st+1,yt,qt.width,qt.height,0,rt,dt,qt.data)}}else{Y?be&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,0,0,rt,dt,ze[Se]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,yt,rt,dt,ze[Se]);for(let st=0;st<Ke.length;st++){const it=Ke[st];Y?be&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Se,st+1,0,0,rt,dt,it.image[Se]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Se,st+1,yt,rt,dt,it.image[Se])}}}p(_)&&y(n.TEXTURE_CUBE_MAP),Ee.__version=ae.version,_.onUpdate&&_.onUpdate(_)}C.__version=_.version}function ht(C,_,V,J,ae,Ee){const Ne=r.convert(V.format,V.colorSpace),ce=r.convert(V.type),me=M(V.internalFormat,Ne,ce,V.normalized,V.colorSpace),Le=i.get(_),Je=i.get(V);if(Je.__renderTarget=_,!Le.__hasExternalTextures){const ze=Math.max(1,_.width>>Ee),ke=Math.max(1,_.height>>Ee);ae===n.TEXTURE_3D||ae===n.TEXTURE_2D_ARRAY?t.texImage3D(ae,Ee,me,ze,ke,_.depth,0,Ne,ce,null):t.texImage2D(ae,Ee,me,ze,ke,0,Ne,ce,null)}t.bindFramebuffer(n.FRAMEBUFFER,C),qe(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,J,ae,Je.__webglTexture,0,ve(_)):(ae===n.TEXTURE_2D||ae>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ae<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,J,ae,Je.__webglTexture,Ee),t.bindFramebuffer(n.FRAMEBUFFER,null)}function O(C,_,V){if(n.bindRenderbuffer(n.RENDERBUFFER,C),_.depthBuffer){const J=_.depthTexture,ae=J&&J.isDepthTexture?J.type:null,Ee=P(_.stencilBuffer,ae),Ne=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;qe(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ve(_),Ee,_.width,_.height):V?n.renderbufferStorageMultisample(n.RENDERBUFFER,ve(_),Ee,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,Ee,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Ne,n.RENDERBUFFER,C)}else{const J=_.textures;for(let ae=0;ae<J.length;ae++){const Ee=J[ae],Ne=r.convert(Ee.format,Ee.colorSpace),ce=r.convert(Ee.type),me=M(Ee.internalFormat,Ne,ce,Ee.normalized,Ee.colorSpace);qe(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ve(_),me,_.width,_.height):V?n.renderbufferStorageMultisample(n.RENDERBUFFER,ve(_),me,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,me,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function B(C,_,V){const J=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,C),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const ae=i.get(_.depthTexture);if(ae.__renderTarget=_,(!ae.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),J){if(ae.__webglInit===void 0&&(ae.__webglInit=!0,_.depthTexture.addEventListener("dispose",I)),ae.__webglTexture===void 0){ae.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,ae.__webglTexture),At(n.TEXTURE_CUBE_MAP,_.depthTexture);const Le=r.convert(_.depthTexture.format),Je=r.convert(_.depthTexture.type);let ze;_.depthTexture.format===Es?ze=n.DEPTH_COMPONENT24:_.depthTexture.format===Nr&&(ze=n.DEPTH24_STENCIL8);for(let ke=0;ke<6;ke++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ke,0,ze,_.width,_.height,0,Le,Je,null)}}else oe(_.depthTexture,0);const Ee=ae.__webglTexture,Ne=ve(_),ce=J?n.TEXTURE_CUBE_MAP_POSITIVE_X+V:n.TEXTURE_2D,me=_.depthTexture.format===Nr?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(_.depthTexture.format===Es)qe(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,me,ce,Ee,0,Ne):n.framebufferTexture2D(n.FRAMEBUFFER,me,ce,Ee,0);else if(_.depthTexture.format===Nr)qe(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,me,ce,Ee,0,Ne):n.framebufferTexture2D(n.FRAMEBUFFER,me,ce,Ee,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ne(C){const _=i.get(C),V=C.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==C.depthTexture){const J=C.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),J){const ae=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,J.removeEventListener("dispose",ae)};J.addEventListener("dispose",ae),_.__depthDisposeCallback=ae}_.__boundDepthTexture=J}if(C.depthTexture&&!_.__autoAllocateDepthBuffer)if(V)for(let J=0;J<6;J++)B(_.__webglFramebuffer[J],C,J);else{const J=C.texture.mipmaps;J&&J.length>0?B(_.__webglFramebuffer[0],C,0):B(_.__webglFramebuffer,C,0)}else if(V){_.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[J]),_.__webglDepthbuffer[J]===void 0)_.__webglDepthbuffer[J]=n.createRenderbuffer(),O(_.__webglDepthbuffer[J],C,!1);else{const ae=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Ee=_.__webglDepthbuffer[J];n.bindRenderbuffer(n.RENDERBUFFER,Ee),n.framebufferRenderbuffer(n.FRAMEBUFFER,ae,n.RENDERBUFFER,Ee)}}else{const J=C.texture.mipmaps;if(J&&J.length>0?t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),O(_.__webglDepthbuffer,C,!1);else{const ae=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Ee=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,Ee),n.framebufferRenderbuffer(n.FRAMEBUFFER,ae,n.RENDERBUFFER,Ee)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function he(C,_,V){const J=i.get(C);_!==void 0&&ht(J.__webglFramebuffer,C,C.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),V!==void 0&&ne(C)}function ue(C){const _=C.texture,V=i.get(C),J=i.get(_);C.addEventListener("dispose",v);const ae=C.textures,Ee=C.isWebGLCubeRenderTarget===!0,Ne=ae.length>1;if(Ne||(J.__webglTexture===void 0&&(J.__webglTexture=n.createTexture()),J.__version=_.version,a.memory.textures++),Ee){V.__webglFramebuffer=[];for(let ce=0;ce<6;ce++)if(_.mipmaps&&_.mipmaps.length>0){V.__webglFramebuffer[ce]=[];for(let me=0;me<_.mipmaps.length;me++)V.__webglFramebuffer[ce][me]=n.createFramebuffer()}else V.__webglFramebuffer[ce]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){V.__webglFramebuffer=[];for(let ce=0;ce<_.mipmaps.length;ce++)V.__webglFramebuffer[ce]=n.createFramebuffer()}else V.__webglFramebuffer=n.createFramebuffer();if(Ne)for(let ce=0,me=ae.length;ce<me;ce++){const Le=i.get(ae[ce]);Le.__webglTexture===void 0&&(Le.__webglTexture=n.createTexture(),a.memory.textures++)}if(C.samples>0&&qe(C)===!1){V.__webglMultisampledFramebuffer=n.createFramebuffer(),V.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let ce=0;ce<ae.length;ce++){const me=ae[ce];V.__webglColorRenderbuffer[ce]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,V.__webglColorRenderbuffer[ce]);const Le=r.convert(me.format,me.colorSpace),Je=r.convert(me.type),ze=M(me.internalFormat,Le,Je,me.normalized,me.colorSpace,C.isXRRenderTarget===!0),ke=ve(C);n.renderbufferStorageMultisample(n.RENDERBUFFER,ke,ze,C.width,C.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ce,n.RENDERBUFFER,V.__webglColorRenderbuffer[ce])}n.bindRenderbuffer(n.RENDERBUFFER,null),C.depthBuffer&&(V.__webglDepthRenderbuffer=n.createRenderbuffer(),O(V.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Ee){t.bindTexture(n.TEXTURE_CUBE_MAP,J.__webglTexture),At(n.TEXTURE_CUBE_MAP,_);for(let ce=0;ce<6;ce++)if(_.mipmaps&&_.mipmaps.length>0)for(let me=0;me<_.mipmaps.length;me++)ht(V.__webglFramebuffer[ce][me],C,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,me);else ht(V.__webglFramebuffer[ce],C,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0);p(_)&&y(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ne){for(let ce=0,me=ae.length;ce<me;ce++){const Le=ae[ce],Je=i.get(Le);let ze=n.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ze=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ze,Je.__webglTexture),At(ze,Le),ht(V.__webglFramebuffer,C,Le,n.COLOR_ATTACHMENT0+ce,ze,0),p(Le)&&y(ze)}t.unbindTexture()}else{let ce=n.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ce=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ce,J.__webglTexture),At(ce,_),_.mipmaps&&_.mipmaps.length>0)for(let me=0;me<_.mipmaps.length;me++)ht(V.__webglFramebuffer[me],C,_,n.COLOR_ATTACHMENT0,ce,me);else ht(V.__webglFramebuffer,C,_,n.COLOR_ATTACHMENT0,ce,0);p(_)&&y(ce),t.unbindTexture()}C.depthBuffer&&ne(C)}function pe(C){const _=C.textures;for(let V=0,J=_.length;V<J;V++){const ae=_[V];if(p(ae)){const Ee=R(C),Ne=i.get(ae).__webglTexture;t.bindTexture(Ee,Ne),y(Ee),t.unbindTexture()}}}const De=[],Pe=[];function Re(C){if(C.samples>0){if(qe(C)===!1){const _=C.textures,V=C.width,J=C.height;let ae=n.COLOR_BUFFER_BIT;const Ee=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Ne=i.get(C),ce=_.length>1;if(ce)for(let Le=0;Le<_.length;Le++)t.bindFramebuffer(n.FRAMEBUFFER,Ne.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Le,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Ne.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Le,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Ne.__webglMultisampledFramebuffer);const me=C.texture.mipmaps;me&&me.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ne.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ne.__webglFramebuffer);for(let Le=0;Le<_.length;Le++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(ae|=n.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(ae|=n.STENCIL_BUFFER_BIT)),ce){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Ne.__webglColorRenderbuffer[Le]);const Je=i.get(_[Le]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Je,0)}n.blitFramebuffer(0,0,V,J,0,0,V,J,ae,n.NEAREST),l===!0&&(De.length=0,Pe.length=0,De.push(n.COLOR_ATTACHMENT0+Le),C.depthBuffer&&C.resolveDepthBuffer===!1&&(De.push(Ee),Pe.push(Ee),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Pe)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,De))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ce)for(let Le=0;Le<_.length;Le++){t.bindFramebuffer(n.FRAMEBUFFER,Ne.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Le,n.RENDERBUFFER,Ne.__webglColorRenderbuffer[Le]);const Je=i.get(_[Le]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Ne.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Le,n.TEXTURE_2D,Je,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ne.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){const _=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function ve(C){return Math.min(s.maxSamples,C.samples)}function qe(C){const _=i.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function N(C){const _=a.render.frame;u.get(C)!==_&&(u.set(C,_),C.update())}function je(C,_){const V=C.colorSpace,J=C.format,ae=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||V!==nu&&V!==Zs&&(Gt.getTransfer(V)===Zt?(J!==Oi||ae!==xi)&&vt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Bt("WebGLTextures: Unsupported texture color space:",V)),_}function We(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=re,this.resetTextureUnits=Q,this.getTextureUnits=le,this.setTextureUnits=$,this.setTexture2D=oe,this.setTexture2DArray=Ae,this.setTexture3D=Ge,this.setTextureCube=Fe,this.rebindTextures=he,this.setupRenderTarget=ue,this.updateRenderTargetMipmap=pe,this.updateMultisampleRenderTarget=Re,this.setupDepthRenderbuffer=ne,this.setupFrameBufferTexture=ht,this.useMultisampledRTT=qe,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function OT(n,e){function t(i,s=Zs){let r;const a=Gt.getTransfer(s);if(i===xi)return n.UNSIGNED_BYTE;if(i===Rf)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Pf)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Qg)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===e_)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===jg)return n.BYTE;if(i===Jg)return n.SHORT;if(i===vl)return n.UNSIGNED_SHORT;if(i===Cf)return n.INT;if(i===es)return n.UNSIGNED_INT;if(i===Fi)return n.FLOAT;if(i===ws)return n.HALF_FLOAT;if(i===t_)return n.ALPHA;if(i===n_)return n.RGB;if(i===Oi)return n.RGBA;if(i===Es)return n.DEPTH_COMPONENT;if(i===Nr)return n.DEPTH_STENCIL;if(i===Df)return n.RED;if(i===If)return n.RED_INTEGER;if(i===Br)return n.RG;if(i===Lf)return n.RG_INTEGER;if(i===Nf)return n.RGBA_INTEGER;if(i===Oc||i===kc||i===Bc||i===Gc)if(a===Zt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Oc)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===kc)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Bc)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Gc)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Oc)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===kc)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Bc)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Gc)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Mh||i===Sh||i===wh||i===Eh)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Mh)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Sh)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===wh)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Eh)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Th||i===Ah||i===Ch||i===Rh||i===Ph||i===eu||i===Dh)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Th||i===Ah)return a===Zt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Ch)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===Rh)return r.COMPRESSED_R11_EAC;if(i===Ph)return r.COMPRESSED_SIGNED_R11_EAC;if(i===eu)return r.COMPRESSED_RG11_EAC;if(i===Dh)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Ih||i===Lh||i===Nh||i===Uh||i===Fh||i===Oh||i===kh||i===Bh||i===Gh||i===zh||i===Hh||i===Vh||i===Wh||i===Xh)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Ih)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Lh)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Nh)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Uh)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Fh)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Oh)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===kh)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Bh)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Gh)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===zh)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Hh)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Vh)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Wh)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Xh)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Yh||i===qh||i===Kh)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===Yh)return a===Zt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===qh)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Kh)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===$h||i===Zh||i===tu||i===jh)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===$h)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Zh)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===tu)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===jh)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===bl?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const kT=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,BT=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class GT{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new d_(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new ts({vertexShader:kT,fragmentShader:BT,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new D(new Fr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class zT extends ar{constructor(e,t){super();const i=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,h=null,d=null,f=null,x=null;const S=typeof XRWebGLBinding<"u",m=new GT,p={},y=t.getContextAttributes();let R=null,M=null;const P=[],T=[],I=new ut;let v=null;const A=new gi;A.viewport=new _n;const F=new gi;F.viewport=new _n;const k=[A,F],U=new $1;let Q=null,le=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(fe){let Oe=P[fe];return Oe===void 0&&(Oe=new vd,P[fe]=Oe),Oe.getTargetRaySpace()},this.getControllerGrip=function(fe){let Oe=P[fe];return Oe===void 0&&(Oe=new vd,P[fe]=Oe),Oe.getGripSpace()},this.getHand=function(fe){let Oe=P[fe];return Oe===void 0&&(Oe=new vd,P[fe]=Oe),Oe.getHandSpace()};function $(fe){const Oe=T.indexOf(fe.inputSource);if(Oe===-1)return;const Ce=P[Oe];Ce!==void 0&&(Ce.update(fe.inputSource,fe.frame,c||a),Ce.dispatchEvent({type:fe.type,data:fe.inputSource}))}function re(){s.removeEventListener("select",$),s.removeEventListener("selectstart",$),s.removeEventListener("selectend",$),s.removeEventListener("squeeze",$),s.removeEventListener("squeezestart",$),s.removeEventListener("squeezeend",$),s.removeEventListener("end",re),s.removeEventListener("inputsourceschange",Z);for(let fe=0;fe<P.length;fe++){const Oe=T[fe];Oe!==null&&(T[fe]=null,P[fe].disconnect(Oe))}Q=null,le=null,m.reset();for(const fe in p)delete p[fe];e.setRenderTarget(R),f=null,d=null,h=null,s=null,M=null,At.stop(),i.isPresenting=!1,e.setPixelRatio(v),e.setSize(I.width,I.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(fe){r=fe,i.isPresenting===!0&&vt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(fe){o=fe,i.isPresenting===!0&&vt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(fe){c=fe},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h===null&&S&&(h=new XRWebGLBinding(s,t)),h},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function(fe){if(s=fe,s!==null){if(R=e.getRenderTarget(),s.addEventListener("select",$),s.addEventListener("selectstart",$),s.addEventListener("selectend",$),s.addEventListener("squeeze",$),s.addEventListener("squeezestart",$),s.addEventListener("squeezeend",$),s.addEventListener("end",re),s.addEventListener("inputsourceschange",Z),y.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(I),S&&"createProjectionLayer"in XRWebGLBinding.prototype){let Ce=null,ft=null,mt=null;y.depth&&(mt=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Ce=y.stencil?Nr:Es,ft=y.stencil?bl:es);const ht={colorFormat:t.RGBA8,depthFormat:mt,scaleFactor:r};h=this.getBinding(),d=h.createProjectionLayer(ht),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),M=new Qi(d.textureWidth,d.textureHeight,{format:Oi,type:xi,depthTexture:new Ka(d.textureWidth,d.textureHeight,ft,void 0,void 0,void 0,void 0,void 0,void 0,Ce),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const Ce={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,Ce),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new Qi(f.framebufferWidth,f.framebufferHeight,{format:Oi,type:xi,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),At.setContext(s),At.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function Z(fe){for(let Oe=0;Oe<fe.removed.length;Oe++){const Ce=fe.removed[Oe],ft=T.indexOf(Ce);ft>=0&&(T[ft]=null,P[ft].disconnect(Ce))}for(let Oe=0;Oe<fe.added.length;Oe++){const Ce=fe.added[Oe];let ft=T.indexOf(Ce);if(ft===-1){for(let ht=0;ht<P.length;ht++)if(ht>=T.length){T.push(Ce),ft=ht;break}else if(T[ht]===null){T[ht]=Ce,ft=ht;break}if(ft===-1)break}const mt=P[ft];mt&&mt.connect(Ce)}}const oe=new L,Ae=new L;function Ge(fe,Oe,Ce){oe.setFromMatrixPosition(Oe.matrixWorld),Ae.setFromMatrixPosition(Ce.matrixWorld);const ft=oe.distanceTo(Ae),mt=Oe.projectionMatrix.elements,ht=Ce.projectionMatrix.elements,O=mt[14]/(mt[10]-1),B=mt[14]/(mt[10]+1),ne=(mt[9]+1)/mt[5],he=(mt[9]-1)/mt[5],ue=(mt[8]-1)/mt[0],pe=(ht[8]+1)/ht[0],De=O*ue,Pe=O*pe,Re=ft/(-ue+pe),ve=Re*-ue;if(Oe.matrixWorld.decompose(fe.position,fe.quaternion,fe.scale),fe.translateX(ve),fe.translateZ(Re),fe.matrixWorld.compose(fe.position,fe.quaternion,fe.scale),fe.matrixWorldInverse.copy(fe.matrixWorld).invert(),mt[10]===-1)fe.projectionMatrix.copy(Oe.projectionMatrix),fe.projectionMatrixInverse.copy(Oe.projectionMatrixInverse);else{const qe=O+Re,N=B+Re,je=De-ve,We=Pe+(ft-ve),C=ne*B/N*qe,_=he*B/N*qe;fe.projectionMatrix.makePerspective(je,We,C,_,qe,N),fe.projectionMatrixInverse.copy(fe.projectionMatrix).invert()}}function Fe(fe,Oe){Oe===null?fe.matrixWorld.copy(fe.matrix):fe.matrixWorld.multiplyMatrices(Oe.matrixWorld,fe.matrix),fe.matrixWorldInverse.copy(fe.matrixWorld).invert()}this.updateCamera=function(fe){if(s===null)return;let Oe=fe.near,Ce=fe.far;m.texture!==null&&(m.depthNear>0&&(Oe=m.depthNear),m.depthFar>0&&(Ce=m.depthFar)),U.near=F.near=A.near=Oe,U.far=F.far=A.far=Ce,(Q!==U.near||le!==U.far)&&(s.updateRenderState({depthNear:U.near,depthFar:U.far}),Q=U.near,le=U.far),U.layers.mask=fe.layers.mask|6,A.layers.mask=U.layers.mask&-5,F.layers.mask=U.layers.mask&-3;const ft=fe.parent,mt=U.cameras;Fe(U,ft);for(let ht=0;ht<mt.length;ht++)Fe(mt[ht],ft);mt.length===2?Ge(U,A,F):U.projectionMatrix.copy(A.projectionMatrix),j(fe,U,ft)};function j(fe,Oe,Ce){Ce===null?fe.matrix.copy(Oe.matrixWorld):(fe.matrix.copy(Ce.matrixWorld),fe.matrix.invert(),fe.matrix.multiply(Oe.matrixWorld)),fe.matrix.decompose(fe.position,fe.quaternion,fe.scale),fe.updateMatrixWorld(!0),fe.projectionMatrix.copy(Oe.projectionMatrix),fe.projectionMatrixInverse.copy(Oe.projectionMatrixInverse),fe.isPerspectiveCamera&&(fe.fov=ef*2*Math.atan(1/fe.projectionMatrix.elements[5]),fe.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(fe){l=fe,d!==null&&(d.fixedFoveation=fe),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=fe)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(U)},this.getCameraTexture=function(fe){return p[fe]};let xe=null;function pt(fe,Oe){if(u=Oe.getViewerPose(c||a),x=Oe,u!==null){const Ce=u.views;f!==null&&(e.setRenderTargetFramebuffer(M,f.framebuffer),e.setRenderTarget(M));let ft=!1;Ce.length!==U.cameras.length&&(U.cameras.length=0,ft=!0);for(let B=0;B<Ce.length;B++){const ne=Ce[B];let he=null;if(f!==null)he=f.getViewport(ne);else{const pe=h.getViewSubImage(d,ne);he=pe.viewport,B===0&&(e.setRenderTargetTextures(M,pe.colorTexture,pe.depthStencilTexture),e.setRenderTarget(M))}let ue=k[B];ue===void 0&&(ue=new gi,ue.layers.enable(B),ue.viewport=new _n,k[B]=ue),ue.matrix.fromArray(ne.transform.matrix),ue.matrix.decompose(ue.position,ue.quaternion,ue.scale),ue.projectionMatrix.fromArray(ne.projectionMatrix),ue.projectionMatrixInverse.copy(ue.projectionMatrix).invert(),ue.viewport.set(he.x,he.y,he.width,he.height),B===0&&(U.matrix.copy(ue.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),ft===!0&&U.cameras.push(ue)}const mt=s.enabledFeatures;if(mt&&mt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&S){h=i.getBinding();const B=h.getDepthInformation(Ce[0]);B&&B.isValid&&B.texture&&m.init(B,s.renderState)}if(mt&&mt.includes("camera-access")&&S){e.state.unbindTexture(),h=i.getBinding();for(let B=0;B<Ce.length;B++){const ne=Ce[B].camera;if(ne){let he=p[ne];he||(he=new d_,p[ne]=he);const ue=h.getCameraImage(ne);he.sourceTexture=ue}}}}for(let Ce=0;Ce<P.length;Ce++){const ft=T[Ce],mt=P[Ce];ft!==null&&mt!==void 0&&mt.update(ft,Oe,c||a)}xe&&xe(fe,Oe),Oe.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Oe}),x=null}const At=new m_;At.setAnimationLoop(pt),this.setAnimationLoop=function(fe){xe=fe},this.dispose=function(){}}}const HT=new Jt,M_=new Ct;M_.set(-1,0,0,0,1,0,0,0,1);function VT(n,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,h_(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,y,R,M){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),h(m,p)):p.isMeshPhongMaterial?(r(m,p),u(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,M)):p.isMeshMatcapMaterial?(r(m,p),x(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),S(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,y,R):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===vn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===vn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const y=e.get(p),R=y.envMap,M=y.envMapRotation;R&&(m.envMap.value=R,m.envMapRotation.value.setFromMatrix4(HT.makeRotationFromEuler(M)).transpose(),R.isCubeTexture&&R.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(M_),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,y,R){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*y,m.scale.value=R*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,y){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===vn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function x(m,p){p.matcap&&(m.matcap.value=p.matcap)}function S(m,p){const y=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function WT(n,e,t,i){let s={},r={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,P){const T=P.program;i.uniformBlockBinding(M,T)}function c(M,P){let T=s[M.id];T===void 0&&(m(M),T=u(M),s[M.id]=T,M.addEventListener("dispose",y));const I=P.program;i.updateUBOMapping(M,I);const v=e.render.frame;r[M.id]!==v&&(d(M),r[M.id]=v)}function u(M){const P=h();M.__bindingPointIndex=P;const T=n.createBuffer(),I=M.__size,v=M.usage;return n.bindBuffer(n.UNIFORM_BUFFER,T),n.bufferData(n.UNIFORM_BUFFER,I,v),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,P,T),T}function h(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return Bt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(M){const P=s[M.id],T=M.uniforms,I=M.__cache;n.bindBuffer(n.UNIFORM_BUFFER,P);for(let v=0,A=T.length;v<A;v++){const F=T[v];if(Array.isArray(F))for(let k=0,U=F.length;k<U;k++)f(F[k],v,k,I);else f(F,v,0,I)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(M,P,T,I){if(S(M,P,T,I)===!0){const v=M.__offset,A=M.value;if(Array.isArray(A)){let F=0;for(let k=0;k<A.length;k++){const U=A[k],Q=p(U);x(U,M.__data,F),typeof U!="number"&&typeof U!="boolean"&&!U.isMatrix3&&!ArrayBuffer.isView(U)&&(F+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}}else x(A,M.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,v,M.__data)}}function x(M,P,T){typeof M=="number"||typeof M=="boolean"?P[0]=M:M.isMatrix3?(P[0]=M.elements[0],P[1]=M.elements[1],P[2]=M.elements[2],P[3]=0,P[4]=M.elements[3],P[5]=M.elements[4],P[6]=M.elements[5],P[7]=0,P[8]=M.elements[6],P[9]=M.elements[7],P[10]=M.elements[8],P[11]=0):ArrayBuffer.isView(M)?P.set(new M.constructor(M.buffer,M.byteOffset,P.length)):M.toArray(P,T)}function S(M,P,T,I){const v=M.value,A=P+"_"+T;if(I[A]===void 0)return typeof v=="number"||typeof v=="boolean"?I[A]=v:ArrayBuffer.isView(v)?I[A]=v.slice():I[A]=v.clone(),!0;{const F=I[A];if(typeof v=="number"||typeof v=="boolean"){if(F!==v)return I[A]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(F.equals(v)===!1)return F.copy(v),!0}}return!1}function m(M){const P=M.uniforms;let T=0;const I=16;for(let A=0,F=P.length;A<F;A++){const k=Array.isArray(P[A])?P[A]:[P[A]];for(let U=0,Q=k.length;U<Q;U++){const le=k[U],$=Array.isArray(le.value)?le.value:[le.value];for(let re=0,Z=$.length;re<Z;re++){const oe=$[re],Ae=p(oe),Ge=T%I,Fe=Ge%Ae.boundary,j=Ge+Fe;T+=Fe,j!==0&&I-j<Ae.storage&&(T+=I-j),le.__data=new Float32Array(Ae.storage/Float32Array.BYTES_PER_ELEMENT),le.__offset=T,T+=Ae.storage}}}const v=T%I;return v>0&&(T+=I-v),M.__size=T,M.__cache={},this}function p(M){const P={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(P.boundary=4,P.storage=4):M.isVector2?(P.boundary=8,P.storage=8):M.isVector3||M.isColor?(P.boundary=16,P.storage=12):M.isVector4?(P.boundary=16,P.storage=16):M.isMatrix3?(P.boundary=48,P.storage=48):M.isMatrix4?(P.boundary=64,P.storage=64):M.isTexture?vt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(P.boundary=16,P.storage=M.byteLength):vt("WebGLRenderer: Unsupported uniform value type.",M),P}function y(M){const P=M.target;P.removeEventListener("dispose",y);const T=a.indexOf(P.__bindingPointIndex);a.splice(T,1),n.deleteBuffer(s[P.id]),delete s[P.id],delete r[P.id]}function R(){for(const M in s)n.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:l,update:c,dispose:R}}const XT=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Wi=null;function YT(){return Wi===null&&(Wi=new c_(XT,16,16,Br,ws),Wi.name="DFG_LUT",Wi.minFilter=Rn,Wi.magFilter=Rn,Wi.wrapS=$i,Wi.wrapT=$i,Wi.generateMipmaps=!1,Wi.needsUpdate=!0),Wi}class qT{constructor(e={}){const{canvas:t=r1(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:d=!1,outputBufferType:f=xi}=e;this.isWebGLRenderer=!0;let x;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=i.getContextAttributes().alpha}else x=a;const S=f,m=new Set([Nf,Lf,If]),p=new Set([xi,es,vl,bl,Rf,Pf]),y=new Uint32Array(4),R=new Int32Array(4),M=new L;let P=null,T=null;const I=[],v=[];let A=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ji,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const F=this;let k=!1,U=null,Q=null,le=null,$=null;this._outputColorSpace=Ti;let re=0,Z=0,oe=null,Ae=-1,Ge=null;const Fe=new _n,j=new _n;let xe=null;const pt=new $e(0);let At=0,fe=t.width,Oe=t.height,Ce=1,ft=null,mt=null;const ht=new _n(0,0,fe,Oe),O=new _n(0,0,fe,Oe);let B=!1;const ne=new Bf;let he=!1,ue=!1;const pe=new Jt,De=new L,Pe=new _n,Re={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ve=!1;function qe(){return oe===null?Ce:1}let N=i;function je(E,q){return t.getContext(E,q)}try{const E={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Af}`),t.addEventListener("webglcontextlost",qt,!1),t.addEventListener("webglcontextrestored",Ft,!1),t.addEventListener("webglcontextcreationerror",Vn,!1),N===null){const q="webgl2";if(N=je(q,E),N===null)throw je(q)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(E){throw Bt("WebGLRenderer: "+E.message),E}let We,C,_,V,J,ae,Ee,Ne,ce,me,Le,Je,ze,ke,rt,dt,yt,Y,Be,be,Ve,Ke,Se;function st(){We=new YE(N),We.init(),Ve=new OT(N,We),C=new kE(N,We,e,Ve),_=new UT(N,We),C.reversedDepthBuffer&&d&&_.buffers.depth.setReversed(!0),Q=N.createFramebuffer(),le=N.createFramebuffer(),$=N.createFramebuffer(),V=new $E(N),J=new yT,ae=new FT(N,We,_,J,C,Ve,V),Ee=new XE(F),Ne=new Q1(N),Ke=new FE(N,Ne),ce=new qE(N,Ne,V,Ke),me=new jE(N,ce,Ne,Ke,V),Y=new ZE(N,C,ae),rt=new BE(J),Le=new bT(F,Ee,We,C,Ke,rt),Je=new VT(F,J),ze=new ST,ke=new RT(We),yt=new UE(F,Ee,_,me,x,l),dt=new NT(F,me,C),Se=new WT(N,V,C,_),Be=new OE(N,We,V),be=new KE(N,We,V),V.programs=Le.programs,F.capabilities=C,F.extensions=We,F.properties=J,F.renderLists=ze,F.shadowMap=dt,F.state=_,F.info=V}st(),S!==xi&&(A=new QE(S,t.width,t.height,o,s,r));const it=new zT(F,N);this.xr=it,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const E=We.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=We.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return Ce},this.setPixelRatio=function(E){E!==void 0&&(Ce=E,this.setSize(fe,Oe,!1))},this.getSize=function(E){return E.set(fe,Oe)},this.setSize=function(E,q,se=!0){if(it.isPresenting){vt("WebGLRenderer: Can't change size while VR device is presenting.");return}fe=E,Oe=q,t.width=Math.floor(E*Ce),t.height=Math.floor(q*Ce),se===!0&&(t.style.width=E+"px",t.style.height=q+"px"),A!==null&&A.setSize(t.width,t.height),this.setViewport(0,0,E,q)},this.getDrawingBufferSize=function(E){return E.set(fe*Ce,Oe*Ce).floor()},this.setDrawingBufferSize=function(E,q,se){fe=E,Oe=q,Ce=se,t.width=Math.floor(E*se),t.height=Math.floor(q*se),this.setViewport(0,0,E,q)},this.setEffects=function(E){if(S===xi){Bt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(E){for(let q=0;q<E.length;q++)if(E[q].isOutputPass===!0){vt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(E||[])},this.getCurrentViewport=function(E){return E.copy(Fe)},this.getViewport=function(E){return E.copy(ht)},this.setViewport=function(E,q,se,ee){E.isVector4?ht.set(E.x,E.y,E.z,E.w):ht.set(E,q,se,ee),_.viewport(Fe.copy(ht).multiplyScalar(Ce).round())},this.getScissor=function(E){return E.copy(O)},this.setScissor=function(E,q,se,ee){E.isVector4?O.set(E.x,E.y,E.z,E.w):O.set(E,q,se,ee),_.scissor(j.copy(O).multiplyScalar(Ce).round())},this.getScissorTest=function(){return B},this.setScissorTest=function(E){_.setScissorTest(B=E)},this.setOpaqueSort=function(E){ft=E},this.setTransparentSort=function(E){mt=E},this.getClearColor=function(E){return E.copy(yt.getClearColor())},this.setClearColor=function(){yt.setClearColor(...arguments)},this.getClearAlpha=function(){return yt.getClearAlpha()},this.setClearAlpha=function(){yt.setClearAlpha(...arguments)},this.clear=function(E=!0,q=!0,se=!0){let ee=0;if(E){let ie=!1;if(oe!==null){const Xe=oe.texture.format;ie=m.has(Xe)}if(ie){const Xe=oe.texture.type,Qe=p.has(Xe),Ye=yt.getClearColor(),nt=yt.getClearAlpha(),at=Ye.r,Mt=Ye.g,Tt=Ye.b;Qe?(y[0]=at,y[1]=Mt,y[2]=Tt,y[3]=nt,N.clearBufferuiv(N.COLOR,0,y)):(R[0]=at,R[1]=Mt,R[2]=Tt,R[3]=nt,N.clearBufferiv(N.COLOR,0,R))}else ee|=N.COLOR_BUFFER_BIT}q&&(ee|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),se&&(ee|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ee!==0&&N.clear(ee)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(E){E.setRenderer(this),U=E},this.dispose=function(){t.removeEventListener("webglcontextlost",qt,!1),t.removeEventListener("webglcontextrestored",Ft,!1),t.removeEventListener("webglcontextcreationerror",Vn,!1),yt.dispose(),ze.dispose(),ke.dispose(),J.dispose(),Ee.dispose(),me.dispose(),Ke.dispose(),Se.dispose(),Le.dispose(),it.dispose(),it.removeEventListener("sessionstart",Cs),it.removeEventListener("sessionend",lr),Jn.stop()};function qt(E){E.preventDefault(),ru("WebGLRenderer: Context Lost."),k=!0}function Ft(){ru("WebGLRenderer: Context Restored."),k=!1;const E=V.autoReset,q=dt.enabled,se=dt.autoUpdate,ee=dt.needsUpdate,ie=dt.type;st(),V.autoReset=E,dt.enabled=q,dt.autoUpdate=se,dt.needsUpdate=ee,dt.type=ie}function Vn(E){Bt("WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function jn(E){const q=E.target;q.removeEventListener("dispose",jn),ns(q)}function ns(E){Ri(E),J.remove(E)}function Ri(E){const q=J.get(E).programs;q!==void 0&&(q.forEach(function(se){Le.releaseProgram(se)}),E.isShaderMaterial&&Le.releaseShaderCache(E))}this.renderBufferDirect=function(E,q,se,ee,ie,Xe){q===null&&(q=Re);const Qe=ie.isMesh&&ie.matrixWorld.determinantAffine()<0,Ye=ja(E,q,se,ee,ie);_.setMaterial(ee,Qe);let nt=se.index,at=1;if(ee.wireframe===!0){if(nt=ce.getWireframeAttribute(se),nt===void 0)return;at=2}const Mt=se.drawRange,Tt=se.attributes.position;let ot=Mt.start*at,Ot=(Mt.start+Mt.count)*at;Xe!==null&&(ot=Math.max(ot,Xe.start*at),Ot=Math.min(Ot,(Xe.start+Xe.count)*at)),nt!==null?(ot=Math.max(ot,0),Ot=Math.min(Ot,nt.count)):Tt!=null&&(ot=Math.max(ot,0),Ot=Math.min(Ot,Tt.count));const nn=Ot-ot;if(nn<0||nn===1/0)return;Ke.setup(ie,ee,Ye,se,nt);let Qt,Xt=Be;if(nt!==null&&(Qt=Ne.get(nt),Xt=be,Xt.setIndex(Qt)),ie.isMesh)ee.wireframe===!0?(_.setLineWidth(ee.wireframeLinewidth*qe()),Xt.setMode(N.LINES)):Xt.setMode(N.TRIANGLES);else if(ie.isLine){let cn=ee.linewidth;cn===void 0&&(cn=1),_.setLineWidth(cn*qe()),ie.isLineSegments?Xt.setMode(N.LINES):ie.isLineLoop?Xt.setMode(N.LINE_LOOP):Xt.setMode(N.LINE_STRIP)}else ie.isPoints?Xt.setMode(N.POINTS):ie.isSprite&&Xt.setMode(N.TRIANGLES);if(ie.isBatchedMesh)if(We.get("WEBGL_multi_draw"))Xt.renderMultiDraw(ie._multiDrawStarts,ie._multiDrawCounts,ie._multiDrawCount);else{const cn=ie._multiDrawStarts,et=ie._multiDrawCounts,yn=ie._multiDrawCount,Dt=nt?Ne.get(nt).bytesPerElement:1,Nn=J.get(ee).currentProgram.getUniforms();for(let Qn=0;Qn<yn;Qn++)Nn.setValue(N,"_gl_DrawID",Qn),Xt.render(cn[Qn]/Dt,et[Qn])}else if(ie.isInstancedMesh)Xt.renderInstances(ot,nn,ie.count);else if(se.isInstancedBufferGeometry){const cn=se._maxInstanceCount!==void 0?se._maxInstanceCount:1/0,et=Math.min(se.instanceCount,cn);Xt.renderInstances(ot,nn,et)}else Xt.render(ot,nn)};function As(E,q,se){E.transparent===!0&&E.side===Nt&&E.forceSinglePass===!1?(E.side=vn,E.needsUpdate=!0,ss(E,q,se),E.side=nr,E.needsUpdate=!0,ss(E,q,se),E.side=Nt):ss(E,q,se)}this.compile=function(E,q,se=null){se===null&&(se=E),T=ke.get(se),T.init(q),v.push(T),se.traverseVisible(function(ie){ie.isLight&&ie.layers.test(q.layers)&&(T.pushLight(ie),ie.castShadow&&T.pushShadow(ie))}),E!==se&&E.traverseVisible(function(ie){ie.isLight&&ie.layers.test(q.layers)&&(T.pushLight(ie),ie.castShadow&&T.pushShadow(ie))}),T.setupLights();const ee=new Set;return E.traverse(function(ie){if(!(ie.isMesh||ie.isPoints||ie.isLine||ie.isSprite))return;const Xe=ie.material;if(Xe)if(Array.isArray(Xe))for(let Qe=0;Qe<Xe.length;Qe++){const Ye=Xe[Qe];As(Ye,se,ie),ee.add(Ye)}else As(Xe,se,ie),ee.add(Xe)}),T=v.pop(),ee},this.compileAsync=function(E,q,se=null){const ee=this.compile(E,q,se);return new Promise(ie=>{function Xe(){if(ee.forEach(function(Qe){J.get(Qe).currentProgram.isReady()&&ee.delete(Qe)}),ee.size===0){ie(E);return}setTimeout(Xe,10)}We.get("KHR_parallel_shader_compile")!==null?Xe():setTimeout(Xe,10)})};let Pi=null;function Gi(E){Pi&&Pi(E)}function Cs(){Jn.stop()}function lr(){Jn.start()}const Jn=new m_;Jn.setAnimationLoop(Gi),typeof self<"u"&&Jn.setContext(self),this.setAnimationLoop=function(E){Pi=E,it.setAnimationLoop(E),E===null?Jn.stop():Jn.start()},it.addEventListener("sessionstart",Cs),it.addEventListener("sessionend",lr),this.render=function(E,q){if(q!==void 0&&q.isCamera!==!0){Bt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(k===!0)return;U!==null&&U.renderStart(E,q);const se=it.enabled===!0&&it.isPresenting===!0,ee=A!==null&&(oe===null||se)&&A.begin(F,oe);if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),q.parent===null&&q.matrixWorldAutoUpdate===!0&&q.updateMatrixWorld(),it.enabled===!0&&it.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(it.cameraAutoUpdate===!0&&it.updateCamera(q),q=it.getCamera()),E.isScene===!0&&E.onBeforeRender(F,E,q,oe),T=ke.get(E,v.length),T.init(q),T.state.textureUnits=ae.getTextureUnits(),v.push(T),pe.multiplyMatrices(q.projectionMatrix,q.matrixWorldInverse),ne.setFromProjectionMatrix(pe,Zi,q.reversedDepth),ue=this.localClippingEnabled,he=rt.init(this.clippingPlanes,ue),P=ze.get(E,I.length),P.init(),I.push(P),it.enabled===!0&&it.isPresenting===!0){const Qe=F.xr.getDepthSensingMesh();Qe!==null&&is(Qe,q,-1/0,F.sortObjects)}is(E,q,0,F.sortObjects),P.finish(),F.sortObjects===!0&&P.sort(ft,mt,q.reversedDepth),ve=it.enabled===!1||it.isPresenting===!1||it.hasDepthSensing()===!1,ve&&yt.addToRenderList(P,E),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),he===!0&&rt.beginShadows();const ie=T.state.shadowsArray;if(dt.render(ie,E,q),he===!0&&rt.endShadows(),(ee&&A.hasRenderPass())===!1){const Qe=P.opaque,Ye=P.transmissive;if(T.setupLights(),q.isArrayCamera){const nt=q.cameras;if(Ye.length>0)for(let at=0,Mt=nt.length;at<Mt;at++){const Tt=nt[at];yi(Qe,Ye,E,Tt)}ve&&yt.render(E);for(let at=0,Mt=nt.length;at<Mt;at++){const Tt=nt[at];Rs(P,E,Tt,Tt.viewport)}}else Ye.length>0&&yi(Qe,Ye,E,q),ve&&yt.render(E),Rs(P,E,q)}oe!==null&&Z===0&&(ae.updateMultisampleRenderTarget(oe),ae.updateRenderTargetMipmap(oe)),ee&&A.end(F),E.isScene===!0&&E.onAfterRender(F,E,q),Ke.resetDefaultState(),Ae=-1,Ge=null,v.pop(),v.length>0?(T=v[v.length-1],ae.setTextureUnits(T.state.textureUnits),he===!0&&rt.setGlobalState(F.clippingPlanes,T.state.camera)):T=null,I.pop(),I.length>0?P=I[I.length-1]:P=null,U!==null&&U.renderEnd()};function is(E,q,se,ee){if(E.visible===!1)return;if(E.layers.test(q.layers)){if(E.isGroup)se=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(q);else if(E.isLightProbeGrid)T.pushLightProbeGrid(E);else if(E.isLight)T.pushLight(E),E.castShadow&&T.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||ne.intersectsSprite(E)){ee&&Pe.setFromMatrixPosition(E.matrixWorld).applyMatrix4(pe);const Qe=me.update(E),Ye=E.material;Ye.visible&&P.push(E,Qe,Ye,se,Pe.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||ne.intersectsObject(E))){const Qe=me.update(E),Ye=E.material;if(ee&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Pe.copy(E.boundingSphere.center)):(Qe.boundingSphere===null&&Qe.computeBoundingSphere(),Pe.copy(Qe.boundingSphere.center)),Pe.applyMatrix4(E.matrixWorld).applyMatrix4(pe)),Array.isArray(Ye)){const nt=Qe.groups;for(let at=0,Mt=nt.length;at<Mt;at++){const Tt=nt[at],ot=Ye[Tt.materialIndex];ot&&ot.visible&&P.push(E,Qe,ot,se,Pe.z,Tt)}}else Ye.visible&&P.push(E,Qe,Ye,se,Pe.z,null)}}const Xe=E.children;for(let Qe=0,Ye=Xe.length;Qe<Ye;Qe++)is(Xe[Qe],q,se,ee)}function Rs(E,q,se,ee){const{opaque:ie,transmissive:Xe,transparent:Qe}=E;T.setupLightsView(se),he===!0&&rt.setGlobalState(F.clippingPlanes,se),ee&&_.viewport(Fe.copy(ee)),ie.length>0&&ri(ie,q,se),Xe.length>0&&ri(Xe,q,se),Qe.length>0&&ri(Qe,q,se),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function yi(E,q,se,ee){if((se.isScene===!0?se.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[ee.id]===void 0){const ot=We.has("EXT_color_buffer_half_float")||We.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[ee.id]=new Qi(1,1,{generateMipmaps:!0,type:ot?ws:xi,minFilter:Lr,samples:Math.max(4,C.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Gt.workingColorSpace})}const Xe=T.state.transmissionRenderTarget[ee.id],Qe=ee.viewport||Fe;Xe.setSize(Qe.z*F.transmissionResolutionScale,Qe.w*F.transmissionResolutionScale);const Ye=F.getRenderTarget(),nt=F.getActiveCubeFace(),at=F.getActiveMipmapLevel();F.setRenderTarget(Xe),F.getClearColor(pt),At=F.getClearAlpha(),At<1&&F.setClearColor(16777215,.5),F.clear(),ve&&yt.render(se);const Mt=F.toneMapping;F.toneMapping=Ji;const Tt=ee.viewport;if(ee.viewport!==void 0&&(ee.viewport=void 0),T.setupLightsView(ee),he===!0&&rt.setGlobalState(F.clippingPlanes,ee),ri(E,se,ee),ae.updateMultisampleRenderTarget(Xe),ae.updateRenderTargetMipmap(Xe),We.has("WEBGL_multisampled_render_to_texture")===!1){let ot=!1;for(let Ot=0,nn=q.length;Ot<nn;Ot++){const Qt=q[Ot],{object:Xt,geometry:cn,material:et,group:yn}=Qt;if(et.side===Nt&&Xt.layers.test(ee.layers)){const Dt=et.side;et.side=vn,et.needsUpdate=!0,cr(Xt,se,ee,cn,et,yn),et.side=Dt,et.needsUpdate=!0,ot=!0}}ot===!0&&(ae.updateMultisampleRenderTarget(Xe),ae.updateRenderTargetMipmap(Xe))}F.setRenderTarget(Ye,nt,at),F.setClearColor(pt,At),Tt!==void 0&&(ee.viewport=Tt),F.toneMapping=Mt}function ri(E,q,se){const ee=q.isScene===!0?q.overrideMaterial:null;for(let ie=0,Xe=E.length;ie<Xe;ie++){const Qe=E[ie],{object:Ye,geometry:nt,group:at}=Qe;let Mt=Qe.material;Mt.allowOverride===!0&&ee!==null&&(Mt=ee),Ye.layers.test(se.layers)&&cr(Ye,q,se,nt,Mt,at)}}function cr(E,q,se,ee,ie,Xe){E.onBeforeRender(F,q,se,ee,ie,Xe),E.modelViewMatrix.multiplyMatrices(se.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),ie.onBeforeRender(F,q,se,ee,E,Xe),ie.transparent===!0&&ie.side===Nt&&ie.forceSinglePass===!1?(ie.side=vn,ie.needsUpdate=!0,F.renderBufferDirect(se,q,ee,ie,E,Xe),ie.side=nr,ie.needsUpdate=!0,F.renderBufferDirect(se,q,ee,ie,E,Xe),ie.side=Nt):F.renderBufferDirect(se,q,ee,ie,E,Xe),E.onAfterRender(F,q,se,ee,ie,Xe)}function ss(E,q,se){q.isScene!==!0&&(q=Re);const ee=J.get(E),ie=T.state.lights,Xe=T.state.shadowsArray,Qe=ie.state.version,Ye=Le.getParameters(E,ie.state,Xe,q,se,T.state.lightProbeGridArray),nt=Le.getProgramCacheKey(Ye);let at=ee.programs;ee.environment=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?q.environment:null,ee.fog=q.fog;const Mt=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap;ee.envMap=Ee.get(E.envMap||ee.environment,Mt),ee.envMapRotation=ee.environment!==null&&E.envMap===null?q.environmentRotation:E.envMapRotation,at===void 0&&(E.addEventListener("dispose",jn),at=new Map,ee.programs=at);let Tt=at.get(nt);if(Tt!==void 0){if(ee.currentProgram===Tt&&ee.lightsStateVersion===Qe)return Ds(E,Ye),Tt}else Ye.uniforms=Le.getUniforms(E),U!==null&&E.isNodeMaterial&&U.build(E,se,Ye),E.onBeforeCompile(Ye,F),Tt=Le.acquireProgram(Ye,nt),at.set(nt,Tt),ee.uniforms=Ye.uniforms;const ot=ee.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(ot.clippingPlanes=rt.uniform),Ds(E,Ye),ee.needsLights=ur(E),ee.lightsStateVersion=Qe,ee.needsLights&&(ot.ambientLightColor.value=ie.state.ambient,ot.lightProbe.value=ie.state.probe,ot.directionalLights.value=ie.state.directional,ot.directionalLightShadows.value=ie.state.directionalShadow,ot.spotLights.value=ie.state.spot,ot.spotLightShadows.value=ie.state.spotShadow,ot.rectAreaLights.value=ie.state.rectArea,ot.ltc_1.value=ie.state.rectAreaLTC1,ot.ltc_2.value=ie.state.rectAreaLTC2,ot.pointLights.value=ie.state.point,ot.pointLightShadows.value=ie.state.pointShadow,ot.hemisphereLights.value=ie.state.hemi,ot.directionalShadowMatrix.value=ie.state.directionalShadowMatrix,ot.spotLightMatrix.value=ie.state.spotLightMatrix,ot.spotLightMap.value=ie.state.spotLightMap,ot.pointShadowMatrix.value=ie.state.pointShadowMatrix),ee.lightProbeGrid=T.state.lightProbeGridArray.length>0,ee.currentProgram=Tt,ee.uniformsList=null,Tt}function Ps(E){if(E.uniformsList===null){const q=E.currentProgram.getUniforms();E.uniformsList=Vc.seqWithValue(q.seq,E.uniforms)}return E.uniformsList}function Ds(E,q){const se=J.get(E);se.outputColorSpace=q.outputColorSpace,se.batching=q.batching,se.batchingColor=q.batchingColor,se.instancing=q.instancing,se.instancingColor=q.instancingColor,se.instancingMorph=q.instancingMorph,se.skinning=q.skinning,se.morphTargets=q.morphTargets,se.morphNormals=q.morphNormals,se.morphColors=q.morphColors,se.morphTargetsCount=q.morphTargetsCount,se.numClippingPlanes=q.numClippingPlanes,se.numIntersection=q.numClipIntersection,se.vertexAlphas=q.vertexAlphas,se.vertexTangents=q.vertexTangents,se.toneMapping=q.toneMapping}function Wr(E,q){if(E.length===0)return null;if(E.length===1)return E[0].texture!==null?E[0]:null;M.setFromMatrixPosition(q.matrixWorld);for(let se=0,ee=E.length;se<ee;se++){const ie=E[se];if(ie.texture!==null&&ie.boundingBox.containsPoint(M))return ie}return null}function ja(E,q,se,ee,ie){q.isScene!==!0&&(q=Re),ae.resetTextureUnits();const Xe=q.fog,Qe=ee.isMeshStandardMaterial||ee.isMeshLambertMaterial||ee.isMeshPhongMaterial?q.environment:null,Ye=oe===null?F.outputColorSpace:oe.isXRRenderTarget===!0?oe.texture.colorSpace:Gt.workingColorSpace,nt=ee.isMeshStandardMaterial||ee.isMeshLambertMaterial&&!ee.envMap||ee.isMeshPhongMaterial&&!ee.envMap,at=Ee.get(ee.envMap||Qe,nt),Mt=ee.vertexColors===!0&&!!se.attributes.color&&se.attributes.color.itemSize===4,Tt=!!se.attributes.tangent&&(!!ee.normalMap||ee.anisotropy>0),ot=!!se.morphAttributes.position,Ot=!!se.morphAttributes.normal,nn=!!se.morphAttributes.color;let Qt=Ji;ee.toneMapped&&(oe===null||oe.isXRRenderTarget===!0)&&(Qt=F.toneMapping);const Xt=se.morphAttributes.position||se.morphAttributes.normal||se.morphAttributes.color,cn=Xt!==void 0?Xt.length:0,et=J.get(ee),yn=T.state.lights;if(he===!0&&(ue===!0||E!==Ge)){const Vt=E===Ge&&ee.id===Ae;rt.setState(ee,E,Vt)}let Dt=!1;ee.version===et.__version?(et.needsLights&&et.lightsStateVersion!==yn.state.version||et.outputColorSpace!==Ye||ie.isBatchedMesh&&et.batching===!1||!ie.isBatchedMesh&&et.batching===!0||ie.isBatchedMesh&&et.batchingColor===!0&&ie.colorTexture===null||ie.isBatchedMesh&&et.batchingColor===!1&&ie.colorTexture!==null||ie.isInstancedMesh&&et.instancing===!1||!ie.isInstancedMesh&&et.instancing===!0||ie.isSkinnedMesh&&et.skinning===!1||!ie.isSkinnedMesh&&et.skinning===!0||ie.isInstancedMesh&&et.instancingColor===!0&&ie.instanceColor===null||ie.isInstancedMesh&&et.instancingColor===!1&&ie.instanceColor!==null||ie.isInstancedMesh&&et.instancingMorph===!0&&ie.morphTexture===null||ie.isInstancedMesh&&et.instancingMorph===!1&&ie.morphTexture!==null||et.envMap!==at||ee.fog===!0&&et.fog!==Xe||et.numClippingPlanes!==void 0&&(et.numClippingPlanes!==rt.numPlanes||et.numIntersection!==rt.numIntersection)||et.vertexAlphas!==Mt||et.vertexTangents!==Tt||et.morphTargets!==ot||et.morphNormals!==Ot||et.morphColors!==nn||et.toneMapping!==Qt||et.morphTargetsCount!==cn||!!et.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(Dt=!0):(Dt=!0,et.__version=ee.version);let Nn=et.currentProgram;Dt===!0&&(Nn=ss(ee,q,ie),U&&ee.isNodeMaterial&&U.onUpdateProgram(ee,Nn,et));let Qn=!1,Wn=!1,ui=!1;const zt=Nn.getUniforms(),rn=et.uniforms;if(_.useProgram(Nn.program)&&(Qn=!0,Wn=!0,ui=!0),ee.id!==Ae&&(Ae=ee.id,Wn=!0),et.needsLights){const Vt=Wr(T.state.lightProbeGridArray,ie);et.lightProbeGrid!==Vt&&(et.lightProbeGrid=Vt,Wn=!0)}if(Qn||Ge!==E){_.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),zt.setValue(N,"projectionMatrix",E.projectionMatrix),zt.setValue(N,"viewMatrix",E.matrixWorldInverse);const ai=zt.map.cameraPosition;ai!==void 0&&ai.setValue(N,De.setFromMatrixPosition(E.matrixWorld)),C.logarithmicDepthBuffer&&zt.setValue(N,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(ee.isMeshPhongMaterial||ee.isMeshToonMaterial||ee.isMeshLambertMaterial||ee.isMeshBasicMaterial||ee.isMeshStandardMaterial||ee.isShaderMaterial)&&zt.setValue(N,"isOrthographic",E.isOrthographicCamera===!0),Ge!==E&&(Ge=E,Wn=!0,ui=!0)}if(et.needsLights&&(yn.state.directionalShadowMap.length>0&&zt.setValue(N,"directionalShadowMap",yn.state.directionalShadowMap,ae),yn.state.spotShadowMap.length>0&&zt.setValue(N,"spotShadowMap",yn.state.spotShadowMap,ae),yn.state.pointShadowMap.length>0&&zt.setValue(N,"pointShadowMap",yn.state.pointShadowMap,ae)),ie.isSkinnedMesh){zt.setOptional(N,ie,"bindMatrix"),zt.setOptional(N,ie,"bindMatrixInverse");const Vt=ie.skeleton;Vt&&(Vt.boneTexture===null&&Vt.computeBoneTexture(),zt.setValue(N,"boneTexture",Vt.boneTexture,ae))}ie.isBatchedMesh&&(zt.setOptional(N,ie,"batchingTexture"),zt.setValue(N,"batchingTexture",ie._matricesTexture,ae),zt.setOptional(N,ie,"batchingIdTexture"),zt.setValue(N,"batchingIdTexture",ie._indirectTexture,ae),zt.setOptional(N,ie,"batchingColorTexture"),ie._colorsTexture!==null&&zt.setValue(N,"batchingColorTexture",ie._colorsTexture,ae));const Mi=se.morphAttributes;if((Mi.position!==void 0||Mi.normal!==void 0||Mi.color!==void 0)&&Y.update(ie,se,Nn),(Wn||et.receiveShadow!==ie.receiveShadow)&&(et.receiveShadow=ie.receiveShadow,zt.setValue(N,"receiveShadow",ie.receiveShadow)),(ee.isMeshStandardMaterial||ee.isMeshLambertMaterial||ee.isMeshPhongMaterial)&&ee.envMap===null&&q.environment!==null&&(rn.envMapIntensity.value=q.environmentIntensity),rn.dfgLUT!==void 0&&(rn.dfgLUT.value=YT()),Wn){if(zt.setValue(N,"toneMappingExposure",F.toneMappingExposure),et.needsLights&&zi(rn,ui),Xe&&ee.fog===!0&&Je.refreshFogUniforms(rn,Xe),Je.refreshMaterialUniforms(rn,ee,Ce,Oe,T.state.transmissionRenderTarget[E.id]),et.needsLights&&et.lightProbeGrid){const Vt=et.lightProbeGrid;rn.probesSH.value=Vt.texture,rn.probesMin.value.copy(Vt.boundingBox.min),rn.probesMax.value.copy(Vt.boundingBox.max),rn.probesResolution.value.copy(Vt.resolution)}Vc.upload(N,Ps(et),rn,ae)}if(ee.isShaderMaterial&&ee.uniformsNeedUpdate===!0&&(Vc.upload(N,Ps(et),rn,ae),ee.uniformsNeedUpdate=!1),ee.isSpriteMaterial&&zt.setValue(N,"center",ie.center),zt.setValue(N,"modelViewMatrix",ie.modelViewMatrix),zt.setValue(N,"normalMatrix",ie.normalMatrix),zt.setValue(N,"modelMatrix",ie.matrixWorld),ee.uniformsGroups!==void 0){const Vt=ee.uniformsGroups;for(let ai=0,di=Vt.length;ai<di;ai++){const rs=Vt[ai];Se.update(rs,Nn),Se.bind(rs,Nn)}}return Nn}function zi(E,q){E.ambientLightColor.needsUpdate=q,E.lightProbe.needsUpdate=q,E.directionalLights.needsUpdate=q,E.directionalLightShadows.needsUpdate=q,E.pointLights.needsUpdate=q,E.pointLightShadows.needsUpdate=q,E.spotLights.needsUpdate=q,E.spotLightShadows.needsUpdate=q,E.rectAreaLights.needsUpdate=q,E.hemisphereLights.needsUpdate=q}function ur(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return re},this.getActiveMipmapLevel=function(){return Z},this.getRenderTarget=function(){return oe},this.setRenderTargetTextures=function(E,q,se){const ee=J.get(E);ee.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,ee.__autoAllocateDepthBuffer===!1&&(ee.__useRenderToTexture=!1),J.get(E.texture).__webglTexture=q,J.get(E.depthTexture).__webglTexture=ee.__autoAllocateDepthBuffer?void 0:se,ee.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,q){const se=J.get(E);se.__webglFramebuffer=q,se.__useDefaultFramebuffer=q===void 0},this.setRenderTarget=function(E,q=0,se=0){oe=E,re=q,Z=se;let ee=null,ie=!1,Xe=!1;if(E){const Ye=J.get(E);if(Ye.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(N.FRAMEBUFFER,Ye.__webglFramebuffer),Fe.copy(E.viewport),j.copy(E.scissor),xe=E.scissorTest,_.viewport(Fe),_.scissor(j),_.setScissorTest(xe),Ae=-1;return}else if(Ye.__webglFramebuffer===void 0)ae.setupRenderTarget(E);else if(Ye.__hasExternalTextures)ae.rebindTextures(E,J.get(E.texture).__webglTexture,J.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const Mt=E.depthTexture;if(Ye.__boundDepthTexture!==Mt){if(Mt!==null&&J.has(Mt)&&(E.width!==Mt.image.width||E.height!==Mt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");ae.setupDepthRenderbuffer(E)}}const nt=E.texture;(nt.isData3DTexture||nt.isDataArrayTexture||nt.isCompressedArrayTexture)&&(Xe=!0);const at=J.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(at[q])?ee=at[q][se]:ee=at[q],ie=!0):E.samples>0&&ae.useMultisampledRTT(E)===!1?ee=J.get(E).__webglMultisampledFramebuffer:Array.isArray(at)?ee=at[se]:ee=at,Fe.copy(E.viewport),j.copy(E.scissor),xe=E.scissorTest}else Fe.copy(ht).multiplyScalar(Ce).floor(),j.copy(O).multiplyScalar(Ce).floor(),xe=B;if(se!==0&&(ee=Q),_.bindFramebuffer(N.FRAMEBUFFER,ee)&&_.drawBuffers(E,ee),_.viewport(Fe),_.scissor(j),_.setScissorTest(xe),ie){const Ye=J.get(E.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+q,Ye.__webglTexture,se)}else if(Xe){const Ye=q;for(let nt=0;nt<E.textures.length;nt++){const at=J.get(E.textures[nt]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+nt,at.__webglTexture,se,Ye)}}else if(E!==null&&se!==0){const Ye=J.get(E.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Ye.__webglTexture,se)}Ae=-1},this.readRenderTargetPixels=function(E,q,se,ee,ie,Xe,Qe,Ye=0){if(!(E&&E.isWebGLRenderTarget)){Bt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let nt=J.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Qe!==void 0&&(nt=nt[Qe]),nt){_.bindFramebuffer(N.FRAMEBUFFER,nt);try{const at=E.textures[Ye],Mt=at.format,Tt=at.type;if(E.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+Ye),!C.textureFormatReadable(Mt)){Bt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!C.textureTypeReadable(Tt)){Bt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}q>=0&&q<=E.width-ee&&se>=0&&se<=E.height-ie&&N.readPixels(q,se,ee,ie,Ve.convert(Mt),Ve.convert(Tt),Xe)}finally{const at=oe!==null?J.get(oe).__webglFramebuffer:null;_.bindFramebuffer(N.FRAMEBUFFER,at)}}},this.readRenderTargetPixelsAsync=async function(E,q,se,ee,ie,Xe,Qe,Ye=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let nt=J.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Qe!==void 0&&(nt=nt[Qe]),nt)if(q>=0&&q<=E.width-ee&&se>=0&&se<=E.height-ie){_.bindFramebuffer(N.FRAMEBUFFER,nt);const at=E.textures[Ye],Mt=at.format,Tt=at.type;if(E.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+Ye),!C.textureFormatReadable(Mt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!C.textureTypeReadable(Tt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ot=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,ot),N.bufferData(N.PIXEL_PACK_BUFFER,Xe.byteLength,N.STREAM_READ),N.readPixels(q,se,ee,ie,Ve.convert(Mt),Ve.convert(Tt),0);const Ot=oe!==null?J.get(oe).__webglFramebuffer:null;_.bindFramebuffer(N.FRAMEBUFFER,Ot);const nn=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await a1(N,nn,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,ot),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,Xe),N.deleteBuffer(ot),N.deleteSync(nn),Xe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,q=null,se=0){const ee=Math.pow(2,-se),ie=Math.floor(E.image.width*ee),Xe=Math.floor(E.image.height*ee),Qe=q!==null?q.x:0,Ye=q!==null?q.y:0;ae.setTexture2D(E,0),N.copyTexSubImage2D(N.TEXTURE_2D,se,0,0,Qe,Ye,ie,Xe),_.unbindTexture()},this.copyTextureToTexture=function(E,q,se=null,ee=null,ie=0,Xe=0){let Qe,Ye,nt,at,Mt,Tt,ot,Ot,nn;const Qt=E.isCompressedTexture?E.mipmaps[Xe]:E.image;if(se!==null)Qe=se.max.x-se.min.x,Ye=se.max.y-se.min.y,nt=se.isBox3?se.max.z-se.min.z:1,at=se.min.x,Mt=se.min.y,Tt=se.isBox3?se.min.z:0;else{const rn=Math.pow(2,-ie);Qe=Math.floor(Qt.width*rn),Ye=Math.floor(Qt.height*rn),E.isDataArrayTexture?nt=Qt.depth:E.isData3DTexture?nt=Math.floor(Qt.depth*rn):nt=1,at=0,Mt=0,Tt=0}ee!==null?(ot=ee.x,Ot=ee.y,nn=ee.z):(ot=0,Ot=0,nn=0);const Xt=Ve.convert(q.format),cn=Ve.convert(q.type);let et;q.isData3DTexture?(ae.setTexture3D(q,0),et=N.TEXTURE_3D):q.isDataArrayTexture||q.isCompressedArrayTexture?(ae.setTexture2DArray(q,0),et=N.TEXTURE_2D_ARRAY):(ae.setTexture2D(q,0),et=N.TEXTURE_2D),_.activeTexture(N.TEXTURE0),_.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,q.flipY),_.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,q.premultiplyAlpha),_.pixelStorei(N.UNPACK_ALIGNMENT,q.unpackAlignment);const yn=_.getParameter(N.UNPACK_ROW_LENGTH),Dt=_.getParameter(N.UNPACK_IMAGE_HEIGHT),Nn=_.getParameter(N.UNPACK_SKIP_PIXELS),Qn=_.getParameter(N.UNPACK_SKIP_ROWS),Wn=_.getParameter(N.UNPACK_SKIP_IMAGES);_.pixelStorei(N.UNPACK_ROW_LENGTH,Qt.width),_.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Qt.height),_.pixelStorei(N.UNPACK_SKIP_PIXELS,at),_.pixelStorei(N.UNPACK_SKIP_ROWS,Mt),_.pixelStorei(N.UNPACK_SKIP_IMAGES,Tt);const ui=E.isDataArrayTexture||E.isData3DTexture,zt=q.isDataArrayTexture||q.isData3DTexture;if(E.isDepthTexture){const rn=J.get(E),Mi=J.get(q),Vt=J.get(rn.__renderTarget),ai=J.get(Mi.__renderTarget);_.bindFramebuffer(N.READ_FRAMEBUFFER,Vt.__webglFramebuffer),_.bindFramebuffer(N.DRAW_FRAMEBUFFER,ai.__webglFramebuffer);for(let di=0;di<nt;di++)ui&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,J.get(E).__webglTexture,ie,Tt+di),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,J.get(q).__webglTexture,Xe,nn+di)),N.blitFramebuffer(at,Mt,Qe,Ye,ot,Ot,Qe,Ye,N.DEPTH_BUFFER_BIT,N.NEAREST);_.bindFramebuffer(N.READ_FRAMEBUFFER,null),_.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(ie!==0||E.isRenderTargetTexture||J.has(E)){const rn=J.get(E),Mi=J.get(q);_.bindFramebuffer(N.READ_FRAMEBUFFER,le),_.bindFramebuffer(N.DRAW_FRAMEBUFFER,$);for(let Vt=0;Vt<nt;Vt++)ui?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,rn.__webglTexture,ie,Tt+Vt):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,rn.__webglTexture,ie),zt?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Mi.__webglTexture,Xe,nn+Vt):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Mi.__webglTexture,Xe),ie!==0?N.blitFramebuffer(at,Mt,Qe,Ye,ot,Ot,Qe,Ye,N.COLOR_BUFFER_BIT,N.NEAREST):zt?N.copyTexSubImage3D(et,Xe,ot,Ot,nn+Vt,at,Mt,Qe,Ye):N.copyTexSubImage2D(et,Xe,ot,Ot,at,Mt,Qe,Ye);_.bindFramebuffer(N.READ_FRAMEBUFFER,null),_.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else zt?E.isDataTexture||E.isData3DTexture?N.texSubImage3D(et,Xe,ot,Ot,nn,Qe,Ye,nt,Xt,cn,Qt.data):q.isCompressedArrayTexture?N.compressedTexSubImage3D(et,Xe,ot,Ot,nn,Qe,Ye,nt,Xt,Qt.data):N.texSubImage3D(et,Xe,ot,Ot,nn,Qe,Ye,nt,Xt,cn,Qt):E.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,Xe,ot,Ot,Qe,Ye,Xt,cn,Qt.data):E.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,Xe,ot,Ot,Qt.width,Qt.height,Xt,Qt.data):N.texSubImage2D(N.TEXTURE_2D,Xe,ot,Ot,Qe,Ye,Xt,cn,Qt);_.pixelStorei(N.UNPACK_ROW_LENGTH,yn),_.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Dt),_.pixelStorei(N.UNPACK_SKIP_PIXELS,Nn),_.pixelStorei(N.UNPACK_SKIP_ROWS,Qn),_.pixelStorei(N.UNPACK_SKIP_IMAGES,Wn),Xe===0&&q.generateMipmaps&&N.generateMipmap(et),_.unbindTexture()},this.initRenderTarget=function(E){J.get(E).__webglFramebuffer===void 0&&ae.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?ae.setTextureCube(E,0):E.isData3DTexture?ae.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?ae.setTexture2DArray(E,0):ae.setTexture2D(E,0),_.unbindTexture()},this.resetState=function(){re=0,Z=0,oe=null,_.reset(),Ke.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Zi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Gt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Gt._getUnpackColorSpace()}}const x0={type:"change"},Wf={type:"start"},S_={type:"end"},Ac=new wl,v0=new qs,KT=Math.cos(70*c1.DEG2RAD),Pn=new L,li=2*Math.PI,tn={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},qd=1e-6;class $T extends j1{constructor(e,t=null){super(e,t),this.state=tn.NONE,this.target=new L,this.cursor=new L,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ba.ROTATE,MIDDLE:Ba.DOLLY,RIGHT:Ba.PAN},this.touches={ONE:La.ROTATE,TWO:La.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new L,this._lastQuaternion=new ir,this._lastTargetPosition=new L,this._quat=new ir().setFromUnitVectors(e.up,new L(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Ym,this._sphericalDelta=new Ym,this._scale=1,this._panOffset=new L,this._rotateStart=new ut,this._rotateEnd=new ut,this._rotateDelta=new ut,this._panStart=new ut,this._panEnd=new ut,this._panDelta=new ut,this._dollyStart=new ut,this._dollyEnd=new ut,this._dollyDelta=new ut,this._dollyDirection=new L,this._mouse=new ut,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=jT.bind(this),this._onPointerDown=ZT.bind(this),this._onPointerUp=JT.bind(this),this._onContextMenu=rA.bind(this),this._onMouseWheel=tA.bind(this),this._onKeyDown=nA.bind(this),this._onTouchStart=iA.bind(this),this._onTouchMove=sA.bind(this),this._onMouseDown=QT.bind(this),this._onMouseMove=eA.bind(this),this._interceptControlDown=aA.bind(this),this._interceptControlUp=oA.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(x0),this.update(),this.state=tn.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const t=this.object.position;Pn.copy(t).sub(this.target),Pn.applyQuaternion(this._quat),this._spherical.setFromVector3(Pn),this.autoRotate&&this.state===tn.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=li:i>Math.PI&&(i-=li),s<-Math.PI?s+=li:s>Math.PI&&(s-=li),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Pn.setFromSpherical(this._spherical),Pn.applyQuaternion(this._quatInverse),t.copy(this.target).add(Pn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=Pn.length();a=this._clampDistance(o*this._scale);const l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const o=new L(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new L(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=Pn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Ac.origin.copy(this.object.position),Ac.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Ac.direction))<KT?this.object.lookAt(this.target):(v0.setFromNormalAndCoplanarPoint(this.object.up,this.target),Ac.intersectPlane(v0,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>qd||8*(1-this._lastQuaternion.dot(this.object.quaternion))>qd||this._lastTargetPosition.distanceToSquared(this.target)>qd?(this.dispatchEvent(x0),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?li/60*this.autoRotateSpeed*e:li/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Pn.setFromMatrixColumn(t,0),Pn.multiplyScalar(-e),this._panOffset.add(Pn)}_panUp(e,t){this.screenSpacePanning===!0?Pn.setFromMatrixColumn(t,1):(Pn.setFromMatrixColumn(t,0),Pn.crossVectors(this.object.up,Pn)),Pn.multiplyScalar(e),this._panOffset.add(Pn)}_pan(e,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Pn.copy(s).sub(this.target);let r=Pn.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/i.clientHeight,this.object.matrix),this._panUp(2*t*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=e-i.left,r=t-i.top,a=i.width,o=i.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(li*this._rotateDelta.x/t.clientHeight),this._rotateUp(li*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(li*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-li*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(li*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-li*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(i,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),r=.5*(e.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(li*this._rotateDelta.x/t.clientHeight),this._rotateUp(li*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new ut,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function ZT(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function jT(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function JT(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(S_),this.state=tn.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function QT(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Ba.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=tn.DOLLY;break;case Ba.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=tn.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=tn.ROTATE}break;case Ba.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=tn.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=tn.PAN}break;default:this.state=tn.NONE}this.state!==tn.NONE&&this.dispatchEvent(Wf)}function eA(n){switch(this.state){case tn.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case tn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case tn.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function tA(n){this.enabled===!1||this.enableZoom===!1||this.state!==tn.NONE||(n.preventDefault(),this.dispatchEvent(Wf),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(S_))}function nA(n){this.enabled!==!1&&this._handleKeyDown(n)}function iA(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case La.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=tn.TOUCH_ROTATE;break;case La.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=tn.TOUCH_PAN;break;default:this.state=tn.NONE}break;case 2:switch(this.touches.TWO){case La.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=tn.TOUCH_DOLLY_PAN;break;case La.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=tn.TOUCH_DOLLY_ROTATE;break;default:this.state=tn.NONE}break;default:this.state=tn.NONE}this.state!==tn.NONE&&this.dispatchEvent(Wf)}function sA(n){switch(this._trackPointer(n),this.state){case tn.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case tn.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case tn.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case tn.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=tn.NONE}}function rA(n){this.enabled!==!1&&n.preventDefault()}function aA(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function oA(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const lA="/assets/aagenone-D95YG_S7.webp",cA="/assets/modfod-BuvaVina.webp",uA="/assets/sosmed-DHW-qk44.webp",dA="/assets/fakestore-BDRx6IS7.webp",hA="/assets/musicplayer-CA2JvlxU.webp",fA="/assets/dekoor-CM-uH_K7.webp",pA="/assets/weddingcard-BMETV7fQ.webp",mA="/assets/spotifylanding-BjsDhqHl.webp",zs=[{title:"Agenone 📊",desc:"Agenone is a digital agency that will make your business grow and succeed in the digital age.",img:lA,github:"https://github.com/bukananko/agenone",web:"https://aagenone.vercel.app/",techs:["vue","tailwind"]},{title:"Modfod 🥗",desc:"Discover nutritious recipes that are as tasty as they are good for you. Explore colorful photos of fresh ingredients and easy-to-follow cooking methods.",img:cA,github:"https://github.com/bukananko/modfod",web:"https://modfod.netlify.app/",techs:["next","tailwind"]},{title:"Netai 📝",desc:"Netai is a social media platform for sharing photos, your feelings, and connecting with friends.",img:uA,github:"https://github.com/bukananko/sosmed",web:"https://netai.vercel.app",techs:["next","tailwind","mongo","express"]},{title:"Fake Store 🛒",desc:"Fake store is an e-commerce web that allows users to buy or sell anything you want and spread it through the internet.",img:dA,github:"https://github.com/bukananko/fake-store",web:"https://afakestore.netlify.app",techs:["react","tailwind"]},{title:"AiMusic 🎵",desc:"AiMusic is a music player based on web that allows users to play music, search for the music you like, and manage your own music library.",img:hA,github:"https://github.com/bukananko/music-player",web:"https://aimusics.netlify.app",techs:["html","tailwind","js"]},{title:"Dekoor 🛋️",desc:"Dekoor is a landing page web that contains information about furniture.",img:fA,github:"https://github.com/bukananko/furniture-landing-page",web:"https://odekoor.netlify.app/",techs:["html","tailwind","js"]},{title:"Wedding Invitation Card 💍",desc:"A web-based wedding invitation card that you can give online to your friends or family.",img:pA,github:"https://github.com/bukananko/wedding-card",web:"https://undangan-nikah-beik.netlify.app/",techs:["react","tailwind"]},{title:"Spotify Landing Page 🎧",desc:"Landing page web from the official spotify website which I cloned to learn slicing ui.",img:mA,github:"https://github.com/bukananko/cloning-spotify",web:"https://bukananko.github.io/cloning-spotify",techs:["html","tailwind","js"]}],Kd=[{key:"vue",title:"Vue JS",icon:"devicon:vuejs",category:"frontend"},{key:"react",title:"React JS",icon:"vscode-icons:file-type-reactjs",category:"frontend"},{key:"next",title:"Next JS",icon:"ri:nextjs-fill",category:"frontend"},{key:"svelte",title:"Svelte/Kit",icon:"material-icon-theme:svelte",category:"frontend"},{key:"ts",title:"TypeScript",icon:"devicon:typescript",category:"frontend"},{key:"js",title:"JavaScript",icon:"vscode-icons:file-type-js-official",category:"frontend"},{key:"tailwind",title:"Tailwind CSS",icon:"vscode-icons:file-type-tailwind",category:"frontend"},{key:"html",title:"HTML",icon:"vscode-icons:file-type-html",category:"frontend"},{key:"css",title:"CSS",icon:"vscode-icons:file-type-css",category:"frontend"},{key:"node",title:"Node JS",icon:"vscode-icons:file-type-node",category:"backend"},{key:"express",title:"Express JS",icon:"skill-icons:expressjs-light",category:"backend"},{key:"mongo",title:"MongoDB",icon:"vscode-icons:file-type-mongo",category:"database"},{key:"postgres",title:"PostgreSQL",icon:"devicon:postgresql",category:"database"},{key:"prisma",title:"Prisma",icon:"lineicons:prisma",category:"database"}],gA=[{key:"email",title:"Email",icon:"logos:google-gmail",href:"mailto:ankoo890@gmail.com"},{key:"linkedin",title:"LinkedIn",icon:"devicon:linkedin",href:"https://www.linkedin.com/in/angkomj/"},{key:"github",title:"GitHub",icon:"mdi:github",href:"https://github.com/bukananko"}],Va=[{id:"sun",name:"Anko // Core Star",codeName:"SOL-ANKO",type:"star",planetCategory:"sun",tagline:"Solar Core & Full-Stack Developer",orbitRadius:0,orbitSpeed:0,baseRadius:40,color:"#ffaa00",glowColor:"rgba(255, 170, 0, 0.65)",accentColor:"#ff4400",initialAngle:0},{id:"skills",name:"Tech Matrix",codeName:"ORB-SKILLS",type:"skills",planetCategory:"cyber",tagline:"Planetary Engineering Knowledge Core",orbitRadius:100,orbitSpeed:.42,baseRadius:18,color:"#00f0ff",glowColor:"rgba(0, 240, 255, 0.55)",accentColor:"#1d4ed8",hasRings:!0,ringsColor:"rgba(0, 240, 255, 0.5)",initialAngle:.8},{id:"project-agenone",name:"Agenone",codeName:"PLN-AGENONE",type:"project",planetCategory:"gas-giant",tagline:"Digital Agency Scaling Engine",orbitRadius:155,orbitSpeed:.34,baseRadius:20,color:"#f59e0b",glowColor:"rgba(245, 158, 11, 0.5)",accentColor:"#b45309",hasRings:!0,ringsColor:"rgba(245, 158, 11, 0.45)",initialAngle:2.1,projectData:zs[0]},{id:"project-modfod",name:"Modfod",codeName:"PLN-MODFOD",type:"project",planetCategory:"terrestrial",tagline:"Nutritious Recipe Planetary Biosphere",orbitRadius:210,orbitSpeed:.28,baseRadius:17,color:"#10b981",glowColor:"rgba(16, 185, 129, 0.5)",accentColor:"#047857",initialAngle:4.2,projectData:zs[1]},{id:"project-netai",name:"Netai",codeName:"PLN-NETAI",type:"project",planetCategory:"rings-giant",tagline:"Social Neural Connectome Network",orbitRadius:265,orbitSpeed:.23,baseRadius:21,color:"#a855f7",glowColor:"rgba(168, 85, 247, 0.55)",accentColor:"#6b21a8",hasRings:!0,ringsColor:"rgba(168, 85, 247, 0.45)",initialAngle:1.2,projectData:zs[2]},{id:"project-fakestore",name:"Fake Store",codeName:"PLN-MERCATUS",type:"project",planetCategory:"gas-giant",tagline:"Interstellar E-Commerce Marketplace",orbitRadius:320,orbitSpeed:.18,baseRadius:18,color:"#06b6d4",glowColor:"rgba(6, 182, 212, 0.5)",accentColor:"#0369a1",initialAngle:5.4,projectData:zs[3]},{id:"project-aimusic",name:"AiMusic",codeName:"PLN-MELODIA",type:"project",planetCategory:"rings-giant",tagline:"Acoustic Pulsar & Wave Player",orbitRadius:375,orbitSpeed:.15,baseRadius:19,color:"#ec4899",glowColor:"rgba(236, 72, 153, 0.5)",accentColor:"#9d174d",hasRings:!0,ringsColor:"rgba(236, 72, 153, 0.45)",initialAngle:3.5,projectData:zs[4]},{id:"project-dekoor",name:"Dekoor",codeName:"PLN-ARCHI-9",type:"project",planetCategory:"desert",tagline:"Aesthetic Interior Design & Furniture",orbitRadius:430,orbitSpeed:.12,baseRadius:16,color:"#f97316",glowColor:"rgba(249, 115, 22, 0.5)",accentColor:"#9a3412",initialAngle:.2,projectData:zs[5]},{id:"project-wedding",name:"Wedding Card",codeName:"PLN-AMORE",type:"project",planetCategory:"terrestrial",tagline:"Binary Orbit Invitation Realm",orbitRadius:485,orbitSpeed:.09,baseRadius:15,color:"#f43f5e",glowColor:"rgba(244, 63, 94, 0.5)",accentColor:"#9f1239",initialAngle:2.7,projectData:zs[6]},{id:"project-spotify",name:"Spotify Landing",codeName:"PLN-ECHO",type:"project",planetCategory:"ice",tagline:"Harmonic Audio Streaming Frequency",orbitRadius:540,orbitSpeed:.07,baseRadius:18,color:"#22c55e",glowColor:"rgba(34, 197, 94, 0.5)",accentColor:"#166534",hasRings:!0,ringsColor:"rgba(34, 197, 94, 0.45)",initialAngle:4.8,projectData:zs[7]}],_A={class:"flex items-center gap-2 font-bold text-sm tracking-wide"},xA={class:"font-sans font-semibold text-white"},vA={class:"text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-white/10 text-white/75"},bA={class:"text-[11px] text-cyan-300/90 mt-0.5 font-sans"},Hs=7500,Qo=80,$d=380,yA=zr({__name:"SolarSystemCanvas",props:{orbitSpeedMultiplier:{default:1},selectedBodyId:{default:null},isPanelOpen:{type:Boolean,default:!1}},emits:["select","hover","unselect"],setup(n,{expose:e,emit:t}){const i=n,s=t,r=_i(null),a=_i(null),o=_i(null),l=_i(!1),c=_i({x:-1e3,y:-1e3});let u,h,d,f,x,S,m=null,p=0,y=0,R=!0;const M=new L(0,260,420),P=new L(0,0,0);let T=!1,I=null;const v=new L(45,30,45),A=new L;let F=0,k=0;const U=[];let Q=null,le=null,$=null,re=null;const Z=new Float32Array(Hs),oe=new Float32Array(Hs),Ae=new Float32Array(Hs),Ge=new Float32Array(Hs),Fe=[];let j=null,xe=null;const pt=[],At={id:"comet-halley",name:"Comet Halley",codeName:"CMT-1P/HALLEY",type:"project",planetCategory:"ice",tagline:"Deep Space Periodic Icy Wanderer & Cyan Ion Stream",orbitRadius:720,orbitSpeed:.12,baseRadius:6.5,color:"#38bdf8",glowColor:"rgba(56, 189, 248, 0.65)",accentColor:"#0284c7",initialAngle:.8};let fe=null;const Oe=[];let Ce=null,ft=null,mt=null,ht=null;const O={id:"ufo-alpha",name:"UFO-Alpha Scout",codeName:"UAP-09/EXO-VOID",type:"vessel",planetCategory:"ufo",tagline:"Extraterrestrial Hyper-Drive Reconnaissance Vessel & Graviton Field",orbitRadius:630,orbitSpeed:.09,baseRadius:18,color:"#10b981",glowColor:"rgba(16, 185, 129, 0.75)",accentColor:"#059669",initialAngle:1.6,icon:"solar:ufo-bold",lore:"Wahana nir-awak asal peradaban luar surya. Menggunakan sistem propulsi medan graviton yang mendistorsi ruang-waktu di sekitarnya tanpa menghasilkan emisi panas termal.",extraStats:[{label:"Propulsi",value:"Graviton Warp"},{label:"Sinyal Sub-ruang",value:"433.92 GHz Pulse"},{label:"Asal",value:"Deep Oort Cloud"}]};let B=null,ne=null,he=null;const ue=[],pe={id:"station-aegis",name:"Aegis Outpost-1",codeName:"ISS-AEGIS/ALPHA",type:"station",planetCategory:"station",tagline:"Modular Deep Space Habitat, Gravity Ring & Solar Array Outpost",orbitRadius:560,orbitSpeed:.065,baseRadius:24,color:"#38bdf8",glowColor:"rgba(56, 189, 248, 0.75)",accentColor:"#0284c7",initialAngle:3.5,icon:"solar:station-minimalistic-bold",lore:"Pangkalan stasiun penelitian orbital berawak di pinggiran sabuk asteroid. Cincin habitat berputar menghasilkan gravitasi sentrifugal buatan bagi awak peneliti.",extraStats:[{label:"Kru Aktif",value:"12 Astronaut"},{label:"Gravitasi Tiruan",value:"0.98 G (Spin)"},{label:"Daya Surya",value:"4.2 MegaWatt"}]};let De=null,Pe=null;const Re=[],ve={id:"ship-hermes",name:"Starship Hermes-IV",codeName:"EXP-HERMES/MK4",type:"vessel",planetCategory:"ship",tagline:"Interstellar Deep Space Heavy Cruiser & High-Impulse Ion Drive",orbitRadius:740,orbitSpeed:.11,baseRadius:22,color:"#06b6d4",glowColor:"rgba(6, 182, 212, 0.75)",accentColor:"#0891b2",initialAngle:5.2,icon:"solar:rocket-2-bold",lore:"Kapal penjelajah antariksa generasi ke-4 yang dilengkapi sepasang mesin ion plasma berdensitas tinggi. Bertugas memetakan anomali antarbintang dan menjaga jalur navigasi kosmik.",extraStats:[{label:"Kecepatan Jelajah",value:"0.15 c (Relativistik)"},{label:"Propulsi Reaktor",value:"Fusion-Ion Thruster"},{label:"Armor Lambung",value:"Nanotube Titanium"}]};let qe=null,N=null,je=null,We=null;const C={id:"singularity-gargantua",name:"Singularity Gargantua-X",codeName:"BH-SINGULARITY/X9",type:"phenomenon",planetCategory:"blackhole",tagline:"Micro-Singularity Anomaly with Swirling Accretion Disk & Gravitational Lensing",orbitRadius:1100,orbitSpeed:0,baseRadius:36,color:"#f59e0b",glowColor:"rgba(245, 158, 11, 0.85)",accentColor:"#d97706",initialAngle:0,icon:"solar:danger-triangle-bold",lore:"Fenomena lubang hitam mikro purba di tepi terluar cakrawala. Menghasilkan tarikan gravitasi masif yang melengkungkan cahaya starlight di sekitarnya dan memanaskan piringan akresi gas plasma hingga jutaan derajat.",extraStats:[{label:"Massa Singularity",value:"4.5 Solar Masses"},{label:"Radius Schwarzchild",value:"22 km"},{label:"Luminositas Akresi",value:"1.2 x 10^38 erg/s"}]};let _=null,V=null,J=null;const ae={id:"pulsar-0950",name:"Pulsar PSR-0950",codeName:"PSR-B0950+08",type:"phenomenon",planetCategory:"pulsar",tagline:"High-Velocity Magnetized Neutron Star with Relativistic Plasma Jets",orbitRadius:1150,orbitSpeed:0,baseRadius:28,color:"#a855f7",glowColor:"rgba(168, 85, 247, 0.85)",accentColor:"#9333ea",initialAngle:0,icon:"solar:bolt-circle-bold",lore:"Sisa supernova berupa bintang neutron yang berputar sangat cepat. Memancarkan sepasang pancaran radiasi plasma relativistik dari kutub magnetnya yang menyapu ruang hampa.",extraStats:[{label:"Periode Denyut",value:"0.253 Detik"},{label:"Medan Magnet",value:"10^12 Gauss"},{label:"Densitas Inti",value:"10^14 g/cm³"}]};let Ee=null,Ne=null,ce=null;const me={id:"satellite-chronos",name:"Chronos Relay Probe",codeName:"SAT-CHRONOS/07",type:"station",planetCategory:"satellite",tagline:"Autonomous Deep Space Quantum Telemetry & Golden Reflector Array",orbitRadius:490,orbitSpeed:.08,baseRadius:15,color:"#eab308",glowColor:"rgba(234, 179, 8, 0.75)",accentColor:"#ca8a04",initialAngle:4,icon:"solar:satellite-bold",lore:"Wahana pemancar relai berkecepatan tinggi yang ditempatkan di dekat sabuk asteroid untuk menghubungkan komunikasi antara planet-planet bagian dalam dan wahana penjelajah angkasa luar.",extraStats:[{label:"Bandwidth Sinyal",value:"100 Gbps Laser Link"},{label:"Bahan Bakar Nuklir",value:"Plutonium-238 RTG"},{label:"Waktu Misi",value:"25 Tahun Aktif"}]};let Le=null,Je=null,ze=null,ke=null;const rt={id:"exoplanet-kepler",name:"Kepler-452b Super-Earth",codeName:"EXO-KEPLER/452B",type:"phenomenon",planetCategory:"exoplanet",tagline:"Distant Habitable Super-Earth with Luminescent Rings & Miniature Moon",orbitRadius:820,orbitSpeed:.072,baseRadius:20,color:"#06b6d4",glowColor:"rgba(6, 182, 212, 0.75)",accentColor:"#0891b2",initialAngle:2.1,icon:"solar:planet-3-bold",lore:"Eksoplanet batuan raksasa di zona layak huni bintang luar. Memiliki atmosfer kaya nitrogen, lautan dalam bercahaya bioluminesens, cincin es ganda tipis, serta satu satelit alami kecil.",extraStats:[{label:"Massa Planet",value:"5.0 Earth Masses"},{label:"Suhu Rata-rata",value:"-8°C s/d +22°C"},{label:"Cincin Es",value:"Dual Ring System"}]};let dt=null,yt=null;const Y={id:"observatory-jwst",name:"JWST-X Observatory",codeName:"TELESCOPE-JWST/X",type:"station",planetCategory:"telescope",tagline:"Deep Space Infrared Observatory with Golden Hexagonal Mirror Array",orbitRadius:690,orbitSpeed:.082,baseRadius:18,color:"#f59e0b",glowColor:"rgba(245, 158, 11, 0.75)",accentColor:"#d97706",initialAngle:.5,icon:"solar:telescope-bold",lore:"Observatorium antariksa inframerah kuantum dengan cermin emas bersegmen heksagonal raksasa dan pelindung panas bertingkat lima. Menyingkap galaksi purba pertama sejak awal mula semesta.",extraStats:[{label:"Diameter Cermin",value:"6.5 Meter Emas"},{label:"Suhu Operasi",value:"40 Kelvin (-233°C)"},{label:"Panjang Gelombang",value:"0.6 - 28.3 μm IR"}]};let Be=null,be=null,Ve=[];const Ke={id:"nebula-helix",name:"Helix Eye Remnant",codeName:"NGC-7293/HELIX",type:"phenomenon",planetCategory:"nebula-core",tagline:"Stellar Remnant with Multi-Ring Ionized Gas Shells & White Dwarf Core",orbitRadius:1200,orbitSpeed:0,baseRadius:38,color:"#ec4899",glowColor:"rgba(236, 72, 153, 0.85)",accentColor:"#db2777",initialAngle:0,icon:"solar:eye-bold",lore:"Sisa ledakan lapisan gas bintang yang sekarat. Membentuk cincin silinder gas ionik raksasa berdiameter triliunan kilometer yang berpendar merah-zamrud dengan katai putih panas di pusatnya.",extraStats:[{label:"Inti Pusat",value:"Hot White Dwarf"},{label:"Kecepatan Ekspansi",value:"31 km/detik"},{label:"Suhu Inti",value:"120.000 Kelvin"}]};let Se=null,st=null,it=null;const qt={id:"mothership-titan",name:"Vanguard Titan Dreadnought",codeName:"CV-TITAN/MOTHERSHIP",type:"vessel",planetCategory:"mothership",tagline:"Colossal Extraterrestrial Flagship with Pulsing Singularity Reactor",orbitRadius:1050,orbitSpeed:.035,baseRadius:35,color:"#c084fc",glowColor:"rgba(192, 132, 252, 0.85)",accentColor:"#9333ea",initialAngle:1.2,icon:"solar:shield-star-bold",lore:"Kapal induk antarbintang alien berukuran gigantis dengan lambung hitam bersudut piramidal. Ditenagai oleh reaktor singularitas terkendali yang memancarkan pendaran ungu antarmatra.",extraStats:[{label:"Panjang Lambung",value:"3.8 Kilometer"},{label:"Sumber Daya",value:"Subspace Singularity"},{label:"Armada Kawal",value:"36 Frigate Drones"}]};let Ft=null,Vn=null,jn=null;const ns={id:"monolith-prime",name:"Xenolith Prime Monolith",codeName:"ARTIFACT-1:4:9/VOID",type:"phenomenon",planetCategory:"monolith",tagline:"Mysterious Geometric Obsidian Monolith with Shimmering Quantum Glyphs",orbitRadius:580,orbitSpeed:.062,baseRadius:14,color:"#38bdf8",glowColor:"rgba(56, 189, 248, 0.85)",accentColor:"#0284c7",initialAngle:4.7,icon:"solar:cube-bold",lore:"Monolit obelisk hitam sempurna dengan rasio dimensi matematis presisi 1:4:9. Permukaannya menyerap 99.9% cahaya namun secara berkala memproyeksikan kode glif kuantum bercahaya.",extraStats:[{label:"Proporsi Dimensi",value:"1 : 4 : 9 (Tunggal)"},{label:"Komposisi",value:"Zero-Porosity Obsidian"},{label:"Usia Artefak",value:"> 3 Miliar Tahun"}]};let Ri=null,As=null;const Pi={id:"asteroid-oumuamua",name:"'Oumuamua Interstellar Scout",codeName:"1I/2017-U1/OUMUAMUA",type:"phenomenon",planetCategory:"interstellar-asteroid",tagline:"Hyperbolic Cigar-Shaped Interstellar Visitor with Dynamic Tumbling Spin",orbitRadius:650,orbitSpeed:.14,baseRadius:12,color:"#fb7185",glowColor:"rgba(251, 113, 133, 0.75)",accentColor:"#e11d48",initialAngle:3.9,icon:"solar:meteor-bold",lore:"Objek pertama yang terkonfirmasi berasal dari luar tata surya kita. Berbentuk memanjang mirip cerutu dengan rotasi jungkir balik (*tumbling*) dan permukaan merah gelap akibat radiasi kosmik.",extraStats:[{label:"Rasio Panjang",value:"10 : 1 (Memanjang)"},{label:"Lintasan",value:"Hiperbolik Ekstrim"},{label:"Akselerasi Non-Gravitasi",value:"Outgassing / Light"}]};let Gi=null,Cs=null,lr=null;const Jn={id:"probe-lightsail",name:"LightSail-III Voyager",codeName:"PROBE-SAIL/03",type:"vessel",planetCategory:"solarsail",tagline:"Ultralight Diamond Reflective Photonic Sail Propelled by Pure Sunlight",orbitRadius:460,orbitSpeed:.095,baseRadius:16,color:"#67e8f9",glowColor:"rgba(103, 232, 249, 0.75)",accentColor:"#06b6d4",initialAngle:1,icon:"solar:wind-bold",lore:"Wahana penjelajah berbasis layar fotonik ultra-ringan berbahan Mylar reflektif. Mendorong dirinya melintasi tata surya murni mengandalkan momentum radiasi foton dari cahaya Matahari.",extraStats:[{label:"Luas Layar",value:"32 m² Reflektif"},{label:"Ketebalan Layar",value:"4.5 Mikrometer"},{label:"Konsumsi Bahan Bakar",value:"Nol (Murni Foton)"}]};let is=null,Rs=null,yi=null,ri=null,cr=null;const ss={id:"binary-sirius",name:"Sirius Gravitational Binary",codeName:"STAR-SYSTEM/SIRIUS-AB",type:"phenomenon",planetCategory:"binary-star",tagline:"Gravitationally Locked Orange Giant & Brilliant Cyan White Dwarf Pair",orbitRadius:1180,orbitSpeed:0,baseRadius:32,color:"#f97316",glowColor:"rgba(249, 115, 22, 0.85)",accentColor:"#ea580c",initialAngle:0,icon:"solar:sun-2-bold",lore:"Sistem bintang ganda yang saling mengunci secara gravitasi dan mengitari pusat massa bersama (*barycenter*). Terdiri dari bintang raksasa jingga hangat dan katai putih biru cemerlang.",extraStats:[{label:"Bintang Utama",value:"Orange Subgiant"},{label:"Bintang Sekunder",value:"Cyan White Dwarf"},{label:"Periode Orbit Sistem",value:"50.1 Tahun"}]};let Ps=null,Ds=null,Wr=[];const ja={id:"wormhole-artemis",name:"Wormhole Artemis-X",codeName:"WORMHOLE-ERB/01",type:"phenomenon",planetCategory:"wormhole",tagline:"Swirling Spacetime Gravitational Funnel & Intergalactic Transit Gateway",orbitRadius:1100,orbitSpeed:0,baseRadius:36,color:"#c084fc",glowColor:"rgba(192, 132, 252, 0.85)",accentColor:"#9333ea",initialAngle:0,icon:"solar:infinity-bold",lore:"Singularitas lorong cacing terowongan ruang-waktu yang menghubungkan sektor tata surya ini dengan galaksi berjarak milyaran tahun cahaya. Memiliki cincin stabilisator plasma kontra-rotasi.",extraStats:[{label:"Metrik Geometri",value:"Traversable Ellis-Bronnikov"},{label:"Fluks Energi Eksotis",value:"-8.4 x 10^22 Joule"},{label:"Destinasi Terhubung",value:"Sektor Triangulum M33"}]};let zi=null,ur=null,E=[];const q={id:"ship-valkyrie",name:"Valkyrie-X Interceptor",codeName:"FIG-VALKYRIE/X",type:"vessel",planetCategory:"starfighter",tagline:"Agile High-G Orbital Patrol Starfighter with Dual Afterburner Plumes",orbitRadius:430,orbitSpeed:.22,baseRadius:14,color:"#f97316",glowColor:"rgba(249, 115, 22, 0.85)",accentColor:"#ea580c",initialAngle:2.8,icon:"solar:plain-bold",lore:"Pesawat tempur interseptor berkecepatan hipersonik dengan bodi putih keramik dan aksen oranye terang. Bertugas melakukan patroli pertahanan cepat di sekitar sabuk dalam tata surya.",extraStats:[{label:"Akselerasi Maks",value:"35 G (Inertial Damped)"},{label:"Mesin Propulsi",value:"Twin Turbo-Fusion Plumes"},{label:"Persenjataan",value:"Dual Plasma Cannons"}]};let se=null,ee=null,ie=null;const Xe={id:"crystal-astraea",name:"Astraea Cosmic Diamond",codeName:"CRYSTAL-ASTRAEA/09",type:"phenomenon",planetCategory:"crystal",tagline:"Gigantic Floating Faceted Interstellar Diamond with Refractive Energy Lattice",orbitRadius:610,orbitSpeed:.068,baseRadius:18,color:"#38bdf8",glowColor:"rgba(56, 189, 248, 0.85)",accentColor:"#0284c7",initialAngle:5.8,icon:"solar:diamond-bold",lore:"Pecahan kristal intan kosmik polikristalin raksasa berkilau yang melayang di ruang hampa tanpa bobot. Membiaskan dan memantulkan starlight menjadi prisma spektrum pelangi menyala.",extraStats:[{label:"Karat Kristal",value:"10 Triliun Carat"},{label:"Kekerasan Mohs",value:"10.5 (Hyper-Carbon)"},{label:"Refraksi Indeks",value:"2.42 (Cahaya Spektral)"}]};let Qe=null,Ye=null;const nt={id:"station-bifrost",name:"Bifrost Skyhook Depot",codeName:"DEPOT-BIFROST/04",type:"station",planetCategory:"cargo-depot",tagline:"Orbital Freight Transfer Platform, Industrial Crane Tower & Multicolored Pods",orbitRadius:520,orbitSpeed:.076,baseRadius:22,color:"#eab308",glowColor:"rgba(234, 179, 8, 0.75)",accentColor:"#ca8a04",initialAngle:2.8,icon:"solar:box-minimalistic-bold",lore:"Pusat logistik antariksa geostasioner yang memfasilitasi bongkar-muat kargo antar-planet. Dilengkapi gantri derek berat dan deretan kontainer bertekanan multi-warna.",extraStats:[{label:"Kapasitas Kargo",value:"250.000 Metrik Ton"},{label:"Dermaga Tambat",value:"8 Pylon Docking Clamps"},{label:"Modul Penanganan",value:"Magnetic Rail Gantry"}]};let at=null,Mt=null,Tt=null;const ot={id:"exoplanet-pyro",name:"Pyro-Prime Molten World",codeName:"EXO-PYRO/MAGMA",type:"phenomenon",planetCategory:"magma-planet",tagline:"Tidally Locked Volcanic Super-Earth with Glowing Magma Calderas",orbitRadius:1120,orbitSpeed:0,baseRadius:28,color:"#ef4444",glowColor:"rgba(239, 68, 68, 0.85)",accentColor:"#b91c1c",initialAngle:0,icon:"solar:flame-bold",lore:"Eksoplanet vulkanik ekstrem yang terkunci secara gravitasi ke sumber panasnya. Seluruh permukaannya diselimuti sungai lava cair berpendar merah-oranye dan kepulan debu vulkanik pijar.",extraStats:[{label:"Suhu Permukaan",value:"1.850°C (Lava Basalt)"},{label:"Aktivitas Vulkanik",value:"1.200 Super-Gunung Berapi"},{label:"Komposisi Kerak",value:"Molten Iron & Silicates"}]};let Ot=null,nn=null,Qt=[];const Xt={id:"magnetar-sgr",name:"Magnetar SGR-1806",codeName:"MAGNETAR-SGR/1806-20",type:"phenomenon",planetCategory:"magnetar",tagline:"Cosmic Dynamo with Extreme Magnetic Arcs & High-Energy Gamma Pulses",orbitRadius:1140,orbitSpeed:0,baseRadius:30,color:"#06b6d4",glowColor:"rgba(6, 182, 212, 0.85)",accentColor:"#0891b2",initialAngle:0,icon:"solar:bolt-bold",lore:"Bintang neutron dengan kekuatan medan magnet paling dahsyat di alam semesta (triliunan kali lebih kuat daripada medan magnet Bumi). Menghasilkan ledakan radiasi sinar gamma berkala.",extraStats:[{label:"Kekuatan Medan Magnet",value:"10^15 Gauss"},{label:"Energi Gempa Bintang",value:"10^39 Joule Pulse"},{label:"Gravitasi Permukaan",value:"10^11 G"}]};let cn=null,et=null;const yn={id:"drone-sentinel",name:"Sentinel Drone Swarm",codeName:"DRONE-SWARM/TRIAD",type:"vessel",planetCategory:"drone-swarm",tagline:"Autonomous Triangular Fleet of 3 Coordinated Reconnaissance Drones",orbitRadius:710,orbitSpeed:.12,baseRadius:15,color:"#10b981",glowColor:"rgba(16, 185, 129, 0.75)",accentColor:"#059669",initialAngle:1.8,icon:"solar:shield-up-bold",lore:"Tiga wahana pengintai nir-awak otonom yang terbang dalam formasi delta presisi. Menggunakan sensor fotonik inframerah dan radar pemindai untuk memantau keselamatan rute luar angkasa.",extraStats:[{label:"Formasi Terbang",value:"Delta Echelon"},{label:"Koneksi Swarm",value:"Quantum Entangled Mesh"},{label:"Sensor Optik",value:"Wide-Band Lidar"}]};let Dt=null,Nn=null,Qn=null;const Wn={id:"asteroid-psyche",name:"Psyche-16 Mining Outpost",codeName:"AST-PSYCHE/16-MINING",type:"station",planetCategory:"mining-outpost",tagline:"Heavy-Metal Asteroid Outpost with Automated Robotic Extraction Rig",orbitRadius:540,orbitSpeed:.088,baseRadius:20,color:"#eab308",glowColor:"rgba(234, 179, 8, 0.75)",accentColor:"#ca8a04",initialAngle:.2,icon:"solar:hammer-bold",lore:"Asteroid inti logam masif kaya emas, nikel, dan platinum bernilai ribuan triliun dollar. Dilengkapi rig penambangan robotik otomatis dengan bor termal dan suar peringatan kuning berkedip.",extraStats:[{label:"Komposisi Logam",value:"85% Besi, Nikel & Emas"},{label:"Status Penambangan",value:"Active Excavation"},{label:"Produksi Harian",value:"450 Ton Ore Refinery"}]};let ui=null,zt=null,rn=null;const Mi={id:"dyson-hyperion",name:"Hyperion Dyson Sol-Collector",codeName:"MEGASTRUCTURE-DYSON/01",type:"station",planetCategory:"dyson-swarm",tagline:"Type-II Megastructure Solar Ring with Photovoltaic Array & High-Energy Transmitter",orbitRadius:1350,orbitSpeed:0,baseRadius:36,color:"#f59e0b",glowColor:"rgba(245, 158, 11, 0.85)",accentColor:"#d97706",initialAngle:0,icon:"solar:sun-bold",lore:"Megastruktur purwa-rupa Tipe-II yang dirancang untuk memanen energi radiasi bintang secara nirkabel. Dilengkapi piringan fotovoltaik raksasa dan pemancar gelombang mikro terkonsentrasi untuk mentransmisikan daya ke seluruh koloni luar angkasa.",extraStats:[{label:"Daya Panen Foton",value:"3.8 × 10^26 Watts"},{label:"Radius Cincin",value:"72 km Titanium Truss"},{label:"Efisiensi Konversi",value:"99.4% Quantum Lattice"}]};let Vt=null,ai=null,di=null,rs=[];const Ru={id:"exoplanet-glacio",name:"Glacio-7 Diamond Crystal World",codeName:"EXO-GLACIO/DIAMOND-7",type:"phenomenon",planetCategory:"ice-planet",tagline:"Sub-Zero Diamond Planet with Hexagonal Crystalline Crust & Iridescent Ice Rings",orbitRadius:1250,orbitSpeed:0,baseRadius:26,color:"#38bdf8",glowColor:"rgba(56, 189, 248, 0.85)",accentColor:"#0284c7",initialAngle:0,icon:"solar:snowflake-bold",lore:"Planet es ekstrem dengan suhu -218°C di mana karbon murni di bawah tekanan tektonik tinggi telah mengkristal menjadi mantel berlian padat. Cincin gandanya terbentuk dari jutaan kristal es metana yang membiaskan cahaya menjadi spektrum pelangi es yang memukau.",extraStats:[{label:"Suhu Permukaan",value:"-218°C Cryogenic"},{label:"Komposisi Mantel",value:"82% Crystalline Diamond"},{label:"Indeks Refraksi",value:"2.42 Diamond Dispersion"}]};let Ja=null,Qa=null,eo=[],Tl=null;const Zf={id:"rift-chronos",name:"Chronos Tachyon Hyper-Gateway",codeName:"GATEWAY-CHRONOS/TACHYON",type:"station",planetCategory:"hyper-gateway",tagline:"Ancient Subspace Stargate with Contra-Rotating Quantum Stabilization Rings",orbitRadius:1380,orbitSpeed:0,baseRadius:38,color:"#a855f7",glowColor:"rgba(168, 85, 247, 0.85)",accentColor:"#7e22ce",initialAngle:0,icon:"solar:infinity-bold",lore:"Gerbang lompatan hiperruang kuno peninggalan peradaban antariksa purba. Memanfaatkan partikel tachyon yang bergerak lebih cepat dari cahaya untuk membuka celah Einstein-Rosen yang menghubungkan galaksi secara instan tanpa distorsi relativitas waktu.",extraStats:[{label:"Stabilitas Metrik",value:"99.98% Warp Metric"},{label:"Frekuensi Tachyon",value:"14.28 Terahertz"},{label:"Batas Jangkauan",value:"Instant Antargalaksi"}]};let to=null,no=null,io=null,Al=[];const Pu={id:"exoplanet-zephyrus",name:"Zephyrus Monarch Gas Giant",codeName:"EXO-ZEPHYRUS/MONARCH",type:"phenomenon",planetCategory:"gas-giant",tagline:"Colossal Emerald Gas Giant with Supersonic Atmospheric Storm Belts & Shepherd Moons",orbitRadius:1300,orbitSpeed:0,baseRadius:32,color:"#10b981",glowColor:"rgba(16, 185, 129, 0.85)",accentColor:"#047857",initialAngle:0,icon:"solar:planet-bold",lore:"Raksasa gas kolosal berukuran 3 kali lebih besar dari Jupiter. Atmosfernya tersusun dari hidrogen, helium, dan metana terionisasi yang menghasilkan pola sabuk awan zamrud yang megah dengan angin badai supersonik berkecepatan 2.450 km/jam.",extraStats:[{label:"Diameter Khatulistiwa",value:"142.984 km (Super-Jovian)"},{label:"Kecepatan Badai",value:"2.450 km/jam Supersonik"},{label:"Sistem Satelit",value:"42 Bulan & 2 Shepherd Moons"}]};let Xr=null,so=null,ro=[],Yr=null;const Cl={id:"leviathan-void",name:"Ancient Void Leviathan Fossil",codeName:"COSMIC-LEVIATHAN/ANCIENT",type:"phenomenon",planetCategory:"cosmic-organism",tagline:"Gigantic Biomechanical Starlight Leviathan Skeleton with Luminous Crystal Bones & Pulsing Heart",orbitRadius:1500,orbitSpeed:0,baseRadius:42,color:"#00f0ff",glowColor:"rgba(0, 240, 255, 0.85)",accentColor:"#0891b2",initialAngle:0,icon:"solar:bone-bold",lore:"Fosil raksasa entitas kosmik purba sepanjang 180 meter yang melayang di kehampaan antarbintang. Tulang-tulang kristal fotoniknya masih memancarkan pendaran bioluminescent cyan-emerald, dengan batu inti jantung tachyon yang terus berdetak pelan.",extraStats:[{label:"Panjang Kerangka",value:"180 Meter Fosil"},{label:"Detak Jantung Inti",value:"12 BPM Tachyon Pulse"},{label:"Resonansi Fotonik",value:"Bioluminescent Cyan"}]};let qr=null,ao=null,oo=null;const Du={id:"ringworld-elysium",name:"Genesis Elysium Ringworld",codeName:"HABITAT-ELYSIUM/RINGWORLD",type:"station",planetCategory:"ringworld-habitat",tagline:"Artificial Centrifugal Megastructure with Terraformed Biosphere, Oceans & Spire Towers",orbitRadius:1450,orbitSpeed:0,baseRadius:46,color:"#22c55e",glowColor:"rgba(34, 197, 94, 0.85)",accentColor:"#15803d",initialAngle:0,icon:"solar:globus-bold",lore:"Megastruktur cincin orbital buatan berputar sentrifugal yang menampung biosfer terraform mandiri. Permukaan dalamnya dihiasi lautan biru, daratan zamrud berhutan lebat, dan atmosfer bertekanan buatan yang ditahan dinding pembatas setinggi 20 km.",extraStats:[{label:"Keliling Cincin",value:"280 km Diameter"},{label:"Gravitasi Sentrifugal",value:"1.0 G (Earth Equivalent)"},{label:"Kapasitas Populasi",value:"45 Juta Jiwa"}]};let lo=null,co=null,uo=[],ho=null;const Iu={id:"protostar-phoenix",name:"Phoenix Protostar & Bipolar Jets",codeName:"PROTOSTAR-PHOENIX/EMBRYO",type:"phenomenon",planetCategory:"protostar",tagline:"Hyperactive Newborn Protostar with Relativistic Bipolar Plasma Ejection Jets & Accretion Spiral",orbitRadius:1550,orbitSpeed:0,baseRadius:36,color:"#f97316",glowColor:"rgba(249, 115, 22, 0.85)",accentColor:"#ea580c",initialAngle:0,icon:"solar:flame-bold",lore:"Bintang bayi yang baru lahir di tengah kepompong gas plasma pijar bersuhu jutaan derajat. Dari kedua kutub rotasinya, terpancar dua berkas jet plasma relativistik sepanjang ribuan kilometer yang menyembur ke luar angkasa dengan kecepatan mendekati cahaya.",extraStats:[{label:"Kecepatan Jet Polar",value:"0.85 c (Relativistik)"},{label:"Suhu Inti Konveksi",value:"14.000.000 K"},{label:"Fase Evolusi Bintang",value:"T-Tauri Accretion"}]};let fo=null,po=null,Kr=null,$r=null;const Lu={id:"artifact-tesseract",name:"Tesseract Prime 4D Hypercube",codeName:"ARTIFACT-TESSERACT/4D",type:"phenomenon",planetCategory:"hyperdimensional",tagline:"4-Dimensional Quantum Hypercube Projection with Nested Tesseract Rotation & Spatial Rift",orbitRadius:1420,orbitSpeed:0,baseRadius:34,color:"#d946ef",glowColor:"rgba(217, 70, 239, 0.85)",accentColor:"#c026d3",initialAngle:0,icon:"solar:box-minimalistic-bold",lore:"Artefak geometris 4-dimensi yang memproyeksikan wujud bayangan hiperkubus (Tesseract) ke dalam ruang 3-dimensi kita. Kubus luar dan kubus dalamnya saling berotasi dalam rotasi non-Euclidean yang membiaskan ruang dan waktu di sekitarnya.",extraStats:[{label:"Dimensi Metrik",value:"4D Spatial Projection"},{label:"Topologi Ruang",value:"Non-Euclidean Manifold"},{label:"Fluks Entropi",value:"-0.999 Quantum Inversion"}]};let Zr=null,mo=null,Rl=null,go=[];const Nu={id:"foundry-vulcan",name:"Solaris Vulcan Asteroid Foundry",codeName:"FORGE-VULCAN/HEAVY-INDUSTRIAL",type:"vessel",planetCategory:"industrial-foundry",tagline:"Planetary-Scale Asteroid Smelting Foundry with Magnetic Induction Crucible & Heat Radiators",orbitRadius:1480,orbitSpeed:0,baseRadius:40,color:"#ea580c",glowColor:"rgba(234, 88, 12, 0.85)",accentColor:"#c2410c",initialAngle:0,icon:"solar:fire-bold",lore:"Wahana pabrik peleburan asteroid raksasa berukuran kota. Menggunakan tungku induksi magnetik berkekuatan gigawatt untuk melelehkan asteroid mentah menjadi logam murni superpaduan yang digunakan membangun armada stasiun luar angkasa.",extraStats:[{label:"Suhu Peleburan",value:"3.200°C Plasma Crucible"},{label:"Keluaran Baja Logam",value:"12.000 Ton/Siklus"},{label:"Daya Induksi",value:"8.4 Gigawatt Reaktor"}]};let dr=null,_o=null,jr=[];const Uu={id:"crystal-geode",name:"Abyssal Dark Matter Crystal Cluster",codeName:"EXO-GEODE/DARK-CRYSTAL",type:"phenomenon",planetCategory:"dark-crystal",tagline:"Exotic Dark-Matter Crystalline Cluster with Gravitational Microlensing & Prismatic Needles",orbitRadius:1520,orbitSpeed:0,baseRadius:36,color:"#8b5cf6",glowColor:"rgba(139, 92, 246, 0.85)",accentColor:"#7c3aed",initialAngle:0,icon:"solar:magic-stick-3-bold",lore:"Gugusan kristal materi gelap langka yang mencuat keluar dari asteroid obsidian. Jarum-jarum kristal prisma ungunya membelokkan cahaya bintang di sekitarnya dan memancarkan gelombang gravitasi mikro dengan kilatan pendaran ultraviolet.",extraStats:[{label:"Komposisi Kristal",value:"Stabilized Dark Matter"},{label:"Pendaran Spektrum",value:"Deep Ultraviolet 254nm"},{label:"Distorsi Lensa",value:"Microlensing Gravity Field"}]};let hr=null,xo=null,Jr=[];const Fu={id:"artifact-crown",name:"Crown of the Cosmic King",codeName:"ROYAL-CROWN/IMPERIAL",type:"phenomenon",planetCategory:"royal-artifact",tagline:"Legendary 24K Stellar King Crown with Embedded Rubies, Velvet Dome & Starlight Aura",orbitRadius:1350,orbitSpeed:0,baseRadius:32,color:"#eab308",glowColor:"rgba(234, 179, 8, 0.85)",accentColor:"#ca8a04",initialAngle:0,icon:"solar:crown-bold",lore:"Mahkota Raja Galaksi kuno yang hilang berabad-abad di kehampaan kosmis. Ditempa dari emas 24 karat murni bintang neutron dan bertatahkan batu permata ruby merah delima serta zamrud kosmik. Konon siapapun yang menemukannya dinobatkan sebagai penguasa kode antariksa tertinggi.",extraStats:[{label:"Material Inti",value:"Emas Murni 24K Bintang Neutron"},{label:"Batu Permata",value:"5 Ruby Merah & Zamrud Kosmik"},{label:"Aura Kerajaan",value:"9.999 Royalty Flux"}]};let Qr=null,vo=null,bo=[],ea=null;const Ou={id:"vessel-beat",name:"Motor BeAT Karbu Antariksa",codeName:"MOPED-BEAT/WARP-110CC",type:"vessel",planetCategory:"interstellar-scooter",tagline:"Legendary Earth Scooter Modified with eSP Warp Drive & Plasma Exhaust Jet",orbitRadius:1280,orbitSpeed:0,baseRadius:28,color:"#0284c7",glowColor:"rgba(2, 132, 199, 0.85)",accentColor:"#0369a1",initialAngle:0,icon:"solar:wheel-bold",lore:"Motor BeAT Karbu biru legendaris asal Indonesia yang entah bagaimana berhasil menembus atmosfer bumi dan mengembara melintasi tata surya. Dilengkapi bodi Techno Blue Metallic sporty, knalpot racing pendorong plasma biru, dan efisiensi bahan bakar antargalaksi: 1 liter Pertalite cukup untuk menempuh 10.000 tahun cahaya.",extraStats:[{label:"Warna Fairing",value:"Techno Blue Metallic & White"},{label:"Mesin Penggerak",value:"110cc SOHC eSP Warp Core"},{label:"Bahan Bakar",value:"Pertalite Murni Antariksa"},{label:"Kecepatan Puncak",value:"12.000 c (Melebihi Cahaya)"},{label:"Plat Nomor",value:"B 4744 ANK (Cosmic Registry)"}]};let fr=null,yo=null,Pl=null,ta=null;const Dl={id:"artifact-laptop",name:"Cyber Matrix Quantum Laptop",codeName:"DEVICE-LAPTOP/QUANTUM-PRO",type:"station",planetCategory:"cybernetic-terminal",tagline:"Zero-Gravity Developer Workstation Running Live Matrix Code & Vite Dev Server",orbitRadius:1320,orbitSpeed:0,baseRadius:26,color:"#06b6d4",glowColor:"rgba(6, 182, 212, 0.85)",accentColor:"#0891b2",initialAngle:0,icon:"solar:laptop-bold",lore:"Laptop kerja portabel milik web engineer antariksa Anko yang melayang bebas di ruang gravitasi nol. Layar Retina holografiknya masih menyala menjalankan kompilasi TypeScript dan Vite Dev Server dengan 0 error di tengah kehampaan kosmis.",extraStats:[{label:"Processor Core",value:"Quantum M-Core 128-Core 8.4 GHz"},{label:"Status Kompilasi",value:"Vite Built in 0.04s (0 Errors)"},{label:"Display",value:"16-inch Holographic Liquid Retina"},{label:"Backlight Keyboard",value:"RGB Cyber Cyan Chroma"}]};let Mo=null,So=null,wo=null,Il=[];const ku={id:"planet-neptunia",name:"Neptunia Prime Ocean World",codeName:"EXO-NEPTUNIA/SAPPHIRE",type:"phenomenon",planetCategory:"gas-giant",tagline:"Deep Sapphire Oceanic Super-Jovian with Massive Iridescent Irradiated Rings",orbitRadius:1460,orbitSpeed:0,baseRadius:40,color:"#3b82f6",glowColor:"rgba(59, 130, 246, 0.85)",accentColor:"#1d4ed8",initialAngle:0,icon:"solar:planet-bold",lore:"Raksasa samudera biru safir dengan kedalaman laut atmosferik ribuan kilometer. Dikelilingi oleh cincin es raksasa yang membiaskan cahaya bintang menjadi warna pelangi keemasan dan biru laut yang memesona.",extraStats:[{label:"Diameter Cincin",value:"320.000 km Iridescent Ring"},{label:"Kedalaman Samudera",value:"18.400 km Super-Fluid"},{label:"Suhu Atmosfer",value:"-145°C Cryogenic Methane"}]};let na=null,Eo=null,ia=null,To=null;const Bu={id:"probe-voyager",name:"Voyager Prime Interstellar Probe",codeName:"PROBE-VOYAGER/GOLDEN-RECORD",type:"vessel",planetCategory:"deep-space-probe",tagline:"Pioneer Deep-Space Explorer Carrying The Golden Record & Phonograph Message",orbitRadius:1540,orbitSpeed:0,baseRadius:34,color:"#f59e0b",glowColor:"rgba(245, 158, 11, 0.85)",accentColor:"#d97706",initialAngle:0,icon:"solar:satellite-bold",lore:"Wahana penjelajah antarbintang legendaris pembawa pesan perdamaian dari Bumi. Di sisinya terpasang Piringan Emas (Golden Record) berlapis emas murni yang berisi salam dalam 55 bahasa manusia dan suara-suara alam semesta.",extraStats:[{label:"Piringan Emas",value:"The Sounds of Earth Phonograph"},{label:"Sumber Tenaga",value:"Plutonium-238 RTG Generator"},{label:"Jarak Jelajah",value:"24 Miliar Kilometer dari Bumi"}]};let pr=null,Ao=null,Ll=[],Nl=[];const Gu={id:"artifact-coffee",name:"Cangkir Kopi Kosmik Tubruk",codeName:"COFFEE-MUG/INFINITE-CAFFEINE",type:"phenomenon",planetCategory:"cosmic-artifact",tagline:"Legendary Zero-G Astronaut Coffee Mug Radiating Infinite Steam & Caffeine Energy",orbitRadius:1300,orbitSpeed:0,baseRadius:24,color:"#f59e0b",glowColor:"rgba(245, 158, 11, 0.85)",accentColor:"#d97706",initialAngle:0,icon:"solar:cup-bold",lore:"Cangkir kopi tubruk legendaris milik web engineer antariksa Anko yang melayang abadi di ruang gravitasi nol. Cairan kafein kuantumnya tidak pernah dingin dan terus memancarkan aroma kopi segar untuk menyuplai energi lembur coding antargalaksi.",extraStats:[{label:"Suhu Kopi",value:"85°C Abadi (Zero-G Steam)"},{label:"Kadar Kafein",value:"99.9% Quantum Espresso"},{label:"Status Suplai",value:"Unlimited Developer Fuel"}]};let mr=null,Co=null,Ul=[];const zu={id:"artifact-guitar",name:"Cosmic Stratocaster Guitar",codeName:"GUITAR-STRAT/CELESTIAL-ROCK",type:"phenomenon",planetCategory:"musical-artifact",tagline:"Legendary Electric Guitar Drifting in Deep Space Emitting Cosmic Harmonic Rhythms",orbitRadius:1380,orbitSpeed:0,baseRadius:30,color:"#ec4899",glowColor:"rgba(236, 72, 153, 0.85)",accentColor:"#db2777",initialAngle:0,icon:"solar:music-note-2-bold",lore:"Gitar listrik legendaris yang mengembara di ruang hampa antarbintang. Senar-senar fotoniknya memetik sendiri harmoni frekuensi kosmik yang menggetarkan nebula di sekitarnya dengan melodi rock antargalaksi.",extraStats:[{label:"Tipe Senar",value:"6 Harmonic Tachyon Strings"},{label:"Output Frekuensi",value:"440 Hz Stellar Rock Overdrive"},{label:"Body Finish",value:"Nebula Sunburst Lacquer"}]};let sa=null,Ro=null,gr=null,Po=[];const Hu={id:"artifact-neko",name:"Cosmic Golden Maneki-Neko",codeName:"STATUE-NEKO/LUCKY-CAT",type:"station",planetCategory:"prosperity-artifact",tagline:"24K Solar Gold Lucky Cat Waving Its Paw to Ward Off Bugs & Bring Good Fortune",orbitRadius:1440,orbitSpeed:0,baseRadius:32,color:"#eab308",glowColor:"rgba(234, 179, 8, 0.85)",accentColor:"#ca8a04",initialAngle:0,icon:"solar:cat-bold",lore:"Patung kucing pembawa keberuntungan (Maneki-Neko) kosmik raksasa yang ditempa dari emas murni surya. Tangannya terus melambai ritmis di gravitasi nol untuk mengusir bug, menarik rezeki proyek freelance, dan menjaga stabilitas ekosistem antariksa.",extraStats:[{label:"Status Lambaian",value:"Paw Waving Active (Fortune +9999)"},{label:"Kutukan Bug",value:"0% Protected (Bug Repellent)"},{label:"Koin Emas",value:"10.000.000 Ryo Starlight Gold"}]};let Fl=!1,Do={x:0,y:0},jf=0,Ol=0;const Jf=()=>{const g=document.createElement("canvas");g.width=512,g.height=256;const w=g.getContext("2d"),K=w.createLinearGradient(0,0,0,256);K.addColorStop(0,"#ff4400"),K.addColorStop(.3,"#ffaa00"),K.addColorStop(.5,"#fef08a"),K.addColorStop(.7,"#ffaa00"),K.addColorStop(1,"#ff3300"),w.fillStyle=K,w.fillRect(0,0,512,256);for(let H=0;H<60;H++){const z=Math.random()*512,ge=Math.random()*256,de=Math.random()*30+10,b=w.createRadialGradient(z,ge,0,z,ge,de);b.addColorStop(0,"rgba(255, 255, 255, 0.45)"),b.addColorStop(.5,"rgba(254, 240, 138, 0.25)"),b.addColorStop(1,"transparent"),w.fillStyle=b,w.beginPath(),w.arc(z,ge,de,0,Math.PI*2),w.fill()}const G=new Cn(g);return G.wrapS=Ei,G.wrapT=$i,G},Qf=(g,w,K)=>{const G=document.createElement("canvas");G.width=512,G.height=256;const H=G.getContext("2d");H.fillStyle=g,H.fillRect(0,0,512,256);const z=14;for(let de=0;de<z;de++){const b=de*256/z,W=256/z;H.fillStyle=de%2===0?w:K,H.beginPath(),H.moveTo(0,b);for(let X=0;X<=512;X+=16){const te=Math.sin(X/512*Math.PI*6+de)*3;H.lineTo(X,b+te)}H.lineTo(512,b+W),H.lineTo(0,b+W),H.closePath(),H.fill()}H.fillStyle="rgba(255, 255, 255, 0.5)",H.beginPath(),H.ellipse(320,160,45,22,.1,0,Math.PI*2),H.fill();const ge=new Cn(G);return ge.wrapS=Ei,ge},ep=(g,w)=>{const K=document.createElement("canvas");K.width=512,K.height=256;const G=K.getContext("2d");G.fillStyle=g,G.fillRect(0,0,512,256),G.fillStyle=w;for(let z=0;z<18;z++){const ge=Math.random()*512,de=Math.random()*200+28,b=Math.random()*45+20;G.beginPath(),G.arc(ge,de,b,0,Math.PI*2),G.fill()}G.fillStyle="rgba(255, 255, 255, 0.45)";for(let z=0;z<12;z++){const ge=Math.random()*512,de=Math.random()*256;G.beginPath(),G.ellipse(ge,de,65,14,.2,0,Math.PI*2),G.fill()}const H=new Cn(K);return H.wrapS=Ei,H},w_=()=>{const g=document.createElement("canvas");g.width=512,g.height=256;const w=g.getContext("2d");w.fillStyle="#050c1e",w.fillRect(0,0,512,256),w.strokeStyle="#00f0ff",w.lineWidth=1.5;for(let G=0;G<=512;G+=32)w.beginPath(),w.moveTo(G,0),w.lineTo(G,256),w.stroke();for(let G=0;G<=256;G+=32)w.beginPath(),w.moveTo(0,G),w.lineTo(512,G),w.stroke();w.fillStyle="#ffffff";for(let G=0;G<30;G++){const H=Math.floor(Math.random()*16)*32,z=Math.floor(Math.random()*8)*32;w.beginPath(),w.arc(H,z,3,0,Math.PI*2),w.fill()}const K=new Cn(g);return K.wrapS=Ei,K},E_=(g,w)=>{const K=document.createElement("canvas");K.width=512,K.height=256;const G=K.getContext("2d");G.fillStyle=w,G.fillRect(0,0,512,256),G.fillStyle=g,G.fillRect(0,30,512,196),G.fillStyle="#ffffff",G.fillRect(0,0,512,38),G.fillRect(0,218,512,38),G.strokeStyle="rgba(255, 255, 255, 0.7)",G.lineWidth=1.5;for(let z=0;z<15;z++)G.beginPath(),G.moveTo(Math.random()*512,Math.random()*256),G.lineTo(Math.random()*512,Math.random()*256),G.stroke();const H=new Cn(K);return H.wrapS=Ei,H},T_=(g,w)=>{const K=document.createElement("canvas");K.width=512,K.height=256;const G=K.getContext("2d");G.fillStyle=g,G.fillRect(0,0,512,256),G.fillStyle=w;for(let z=0;z<35;z++){const ge=Math.random()*512,de=Math.random()*256,b=Math.random()*12+4;G.beginPath(),G.arc(ge,de,b,0,Math.PI*2),G.fill()}const H=new Cn(K);return H.wrapS=Ei,H},A_=g=>{const w=document.createElement("canvas");w.width=512,w.height=32;const K=w.getContext("2d"),G=K.createLinearGradient(0,0,512,0);return G.addColorStop(0,"transparent"),G.addColorStop(.15,g),G.addColorStop(.55,g),G.addColorStop(.58,"rgba(0, 0, 0, 0.95)"),G.addColorStop(.62,g),G.addColorStop(.95,g),G.addColorStop(1,"transparent"),K.fillStyle=G,K.fillRect(0,0,512,32),new Cn(w)},C_=()=>{const g=document.createElement("canvas");g.width=256,g.height=256;const w=g.getContext("2d"),K=w.createRadialGradient(128,128,10,128,128,128);K.addColorStop(0,"rgba(255, 255, 220, 0.95)"),K.addColorStop(.2,"rgba(255, 180, 20, 0.7)"),K.addColorStop(.5,"rgba(255, 90, 0, 0.3)"),K.addColorStop(.8,"rgba(255, 30, 0, 0.08)"),K.addColorStop(1,"rgba(0, 0, 0, 0)"),w.fillStyle=K,w.fillRect(0,0,256,256);const G=new Cn(g),H=new zc({map:G,transparent:!0,blending:bt,depthWrite:!1}),z=new Id(H);return z.scale.set(160,160,1),z},R_=(g,w)=>{const K=document.createElement("canvas");K.width=512,K.height=512;const G=K.getContext("2d");G.clearRect(0,0,512,512);const H=[{ox:0,oy:0,r:180,c:g,a:.28},{ox:-55,oy:40,r:145,c:w,a:.22},{ox:60,oy:-35,r:155,c:g,a:.2},{ox:-45,oy:-55,r:130,c:w,a:.18},{ox:50,oy:55,r:135,c:g,a:.18},{ox:0,oy:75,r:115,c:w,a:.15},{ox:-75,oy:0,r:110,c:g,a:.15},{ox:70,oy:15,r:105,c:w,a:.14},{ox:-25,oy:60,r:100,c:g,a:.14},{ox:30,oy:-65,r:95,c:w,a:.12}];for(const z of H){const ge=256+z.ox,de=256+z.oy,b=G.createRadialGradient(ge,de,4,ge,de,z.r);b.addColorStop(0,z.c.replace(/[\d.]+\)$/,`${z.a})`)),b.addColorStop(.45,z.c.replace(/[\d.]+\)$/,`${(z.a*.38).toFixed(2)})`)),b.addColorStop(1,"rgba(0, 0, 0, 0)"),G.fillStyle=b,G.beginPath(),G.arc(ge,de,z.r,0,Math.PI*2),G.fill()}for(let z=0;z<38;z++){const ge=256+(Math.random()-.5)*260,de=256+(Math.random()-.5)*260,b=Math.random()*1.8+.6;G.fillStyle="rgba(255, 255, 255, 0.55)",G.beginPath(),G.arc(ge,de,b,0,Math.PI*2),G.fill()}return new Cn(K)},P_=()=>{const g=document.createElement("canvas");g.width=256,g.height=256;const w=g.getContext("2d");w.clearRect(0,0,256,256);const K=w.createLinearGradient(0,128,256,128);K.addColorStop(0,"rgba(255, 255, 255, 0)"),K.addColorStop(.42,"rgba(56, 189, 248, 0.45)"),K.addColorStop(.5,"rgba(255, 255, 255, 1.0)"),K.addColorStop(.58,"rgba(56, 189, 248, 0.45)"),K.addColorStop(1,"rgba(255, 255, 255, 0)"),w.fillStyle=K,w.fillRect(0,126,256,4);const G=w.createLinearGradient(128,0,128,256);G.addColorStop(0,"rgba(255, 255, 255, 0)"),G.addColorStop(.42,"rgba(56, 189, 248, 0.45)"),G.addColorStop(.5,"rgba(255, 255, 255, 1.0)"),G.addColorStop(.58,"rgba(56, 189, 248, 0.45)"),G.addColorStop(1,"rgba(255, 255, 255, 0)"),w.fillStyle=G,w.fillRect(126,0,4,256);const H=w.createRadialGradient(128,128,2,128,128,48);return H.addColorStop(0,"rgba(255, 255, 255, 1.0)"),H.addColorStop(.2,"rgba(165, 243, 252, 0.75)"),H.addColorStop(.6,"rgba(56, 189, 248, 0.25)"),H.addColorStop(1,"rgba(0, 0, 0, 0)"),w.fillStyle=H,w.beginPath(),w.arc(128,128,48,0,Math.PI*2),w.fill(),new Cn(g)};let ra=null,aa=null;const tp=()=>{if(!ra){const g=document.createElement("canvas");g.width=64,g.height=64;const w=g.getContext("2d");w.clearRect(0,0,64,64);const K=w.createRadialGradient(32,32,0,32,32,32);K.addColorStop(0,"rgba(255, 255, 255, 1.0)"),K.addColorStop(.55,"rgba(255, 255, 255, 1.0)"),K.addColorStop(.8,"rgba(255, 255, 255, 0.85)"),K.addColorStop(.96,"rgba(255, 255, 255, 0.25)"),K.addColorStop(1,"rgba(255, 255, 255, 0.0)"),w.fillStyle=K,w.beginPath(),w.arc(32,32,32,0,Math.PI*2),w.fill(),ra=new Cn(g),ra.generateMipmaps=!1,ra.minFilter=Rn,ra.magFilter=Rn}return ra},Vu=()=>{if(!aa){const g=document.createElement("canvas");g.width=64,g.height=64;const w=g.getContext("2d");w.clearRect(0,0,64,64);const K=w.createRadialGradient(32,32,0,32,32,32);K.addColorStop(0,"rgba(255, 255, 255, 1.0)"),K.addColorStop(.65,"rgba(255, 255, 255, 1.0)"),K.addColorStop(.85,"rgba(255, 255, 255, 0.85)"),K.addColorStop(.98,"rgba(255, 255, 255, 0.20)"),K.addColorStop(1,"rgba(255, 255, 255, 0.0)"),w.fillStyle=K,w.beginPath(),w.arc(32,32,32,0,Math.PI*2),w.fill(),aa=new Cn(g),aa.generateMipmaps=!1,aa.minFilter=Rn,aa.magFilter=Rn}return aa},np=(g,w,K,G)=>{const H=new jt,z=new Float32Array(g*3),ge=new Float32Array(g*3);for(let b=0;b<g;b++){const W=Math.random(),X=K*Math.pow(W,2),te=Math.random()*Math.PI*2,_e=Math.acos(Math.random()*2-1);z[b*3]=w.x+X*Math.sin(_e)*Math.cos(te),z[b*3+1]=w.y+X*Math.sin(_e)*Math.sin(te),z[b*3+2]=w.z+X*Math.cos(_e);const Me=G[Math.floor(Math.random()*G.length)];ge[b*3]=Me.r,ge[b*3+1]=Me.g,ge[b*3+2]=Me.b}H.setAttribute("position",new gn(z,3)),H.setAttribute("color",new gn(ge,3));const de=new Ia({size:3.4,map:tp(),vertexColors:!0,transparent:!0,opacity:.95,blending:bt,sizeAttenuation:!0,depthWrite:!1});return new Zo(H,de)},D_=()=>{const g=new gt,w=new Te(24,16,16),K=new ye({visible:!1});ft=new D(w,K),ft.userData={body:O},g.add(ft);const G=new Et(18,5,3.5,32),H=new Ue({color:15857145,metalness:.95,roughness:.15}),z=new D(G,H);z.position.y=-1.5,z.userData={body:O},g.add(z);const ge=new Et(12,18,2.5,32),de=new D(ge,H);de.position.y=1.2,de.userData={body:O},g.add(de);const b=new kn(18.2,.6,16,48),W=new ye({color:1096065}),X=new D(b,W);X.rotation.x=Math.PI/2,g.add(X);const te=new Te(7,24,16,0,Math.PI*2,0,Math.PI/2),_e=new Ue({color:3462041,emissive:1096065,emissiveIntensity:.85,metalness:.1,roughness:.1,transparent:!0,opacity:.9}),Me=new D(te,_e);Me.position.y=2.4,Me.userData={body:O},g.add(Me),mt=new gt;const He=new Te(.9,12,12),tt=new ye({color:61695}),lt=new ye({color:1096065});for(let St=0;St<8;St++){const Lt=new D(He,St%2===0?tt:lt),Mn=St/8*Math.PI*2;Lt.position.set(Math.cos(Mn)*17.5,0,Math.sin(Mn)*17.5),mt.add(Lt)}g.add(mt);const ct=new xn(22,50,32,1,!0),Wt=new ye({color:440020,transparent:!0,opacity:.18,side:Nt,depthWrite:!1,blending:bt});return ht=new D(ct,Wt),ht.position.y=-26,g.add(ht),g},I_=()=>{const g=new gt,w=new Te(34,16,16),K=new ye({visible:!1});ne=new D(w,K),ne.userData={body:pe},g.add(ne);const G=new Ue({color:9741240,metalness:.75,roughness:.3}),H=new Ue({color:3359061,metalness:.85,roughness:.35}),z=new Ue({color:1920728,emissive:1516884,metalness:.9,roughness:.2}),ge=new Et(4.5,4.5,42,16),de=new D(ge,H);de.userData={body:pe},g.add(de);const b=new Te(5.2,16,16),W=new D(b,G);W.position.y=21;const X=new D(b,G);X.position.y=-21,g.add(W),g.add(X),he=new gt;const te=new kn(26,2.6,16,48),_e=new D(te,G);_e.rotation.x=Math.PI/2,_e.userData={body:pe},he.add(_e);const Me=new Et(.8,.8,26,8);for(let Sn=0;Sn<4;Sn++){const Tn=new D(Me,H);Tn.rotation.z=Math.PI/2,Tn.rotation.y=Sn*Math.PI/2,Tn.translateX(13),he.add(Tn)}g.add(he);const He=new xt(32,.6,8),tt=[{x:26,y:14,z:0},{x:-26,y:14,z:0},{x:26,y:-14,z:0},{x:-26,y:-14,z:0}];for(const Sn of tt){const Tn=new D(He,z);Tn.position.set(Sn.x,Sn.y,Sn.z),g.add(Tn)}const lt=new Et(7,1.5,3,24,1,!0),ct=new Ue({color:16317180,metalness:.6,roughness:.2}),Wt=new D(lt,ct);Wt.position.set(0,26,6),Wt.rotation.x=Math.PI/4,g.add(Wt),ue.length=0;const St=new Te(.8,8,8),Lt=new ye({color:15680580}),Mn=new ye({color:2278750});ue.push(Lt,Mn);const hn=new D(St,Lt);hn.position.set(42,14,0);const oi=new D(St,Mn);return oi.position.set(-42,14,0),g.add(hn),g.add(oi),g},L_=()=>{const g=new gt,w=new Te(32,16,16),K=new ye({visible:!1});Pe=new D(w,K),Pe.userData={body:ve},g.add(Pe);const G=new Ue({color:16317180,metalness:.55,roughness:.25}),H=new Ue({color:165063,metalness:.8,roughness:.2}),z=new ye({color:3718648}),ge=new xt(12,6,36),de=new D(ge,G);de.userData={body:ve},g.add(de);const b=new xn(7,18,4),W=new D(b,G);W.rotation.y=Math.PI/4,W.rotation.x=Math.PI/2,W.position.z=26,W.userData={body:ve},g.add(W);const X=new xt(6,3,10),te=new D(X,H);te.position.set(0,4,2),g.add(te);const _e=new xt(5.2,1.2,2),Me=new D(_e,z);Me.position.set(0,4.2,6.5),g.add(Me),Re.length=0;const He=new Et(3.2,3.2,28,16),tt=[-10,10];for(const lt of tt){const ct=new D(He,H);ct.rotation.x=Math.PI/2,ct.position.set(lt,0,-4),g.add(ct);const Wt=new xt(5,1,12),St=new D(Wt,G);St.position.set(lt*.5,0,-2),g.add(St);const Lt=new xn(2.8,18,16,1,!0),Mn=new ye({color:61695,transparent:!0,opacity:.75,side:Nt,depthWrite:!1,blending:bt}),hn=new D(Lt,Mn);hn.rotation.x=-Math.PI/2,hn.position.set(lt,0,-26),g.add(hn),Re.push(hn)}return g},N_=()=>{const g=new gt;g.position.set(880,240,-820);const w=new Te(65,16,16),K=new ye({visible:!1});N=new D(w,K),N.userData={body:C},g.add(N);const G=new Te(22,32,32),H=new ye({color:0}),z=new D(G,H);z.userData={body:C},g.add(z);const ge=new Te(22.8,32,32),de=new ye({color:16777215,transparent:!0,opacity:.35}),b=new D(ge,de);g.add(b);const W=document.createElement("canvas");W.width=512,W.height=512;const X=W.getContext("2d");X.clearRect(0,0,512,512);const te=X.createRadialGradient(256,256,80,256,256,250);te.addColorStop(0,"rgba(255, 255, 255, 0.95)"),te.addColorStop(.15,"rgba(254, 240, 138, 0.85)"),te.addColorStop(.4,"rgba(245, 158, 11, 0.65)"),te.addColorStop(.7,"rgba(217, 70, 239, 0.35)"),te.addColorStop(1,"rgba(0, 0, 0, 0)"),X.fillStyle=te,X.beginPath(),X.arc(256,256,250,0,Math.PI*2),X.fill(),X.strokeStyle="rgba(255, 255, 255, 0.4)",X.lineWidth=2;for(let ct=0;ct<36;ct++){const Wt=ct/36*Math.PI*2;X.beginPath(),X.arc(256,256,120+Math.sin(ct)*40,Wt,Wt+.4),X.stroke()}const _e=new Cn(W),Me=new On(25,78,64),He=new ye({map:_e,side:Nt,transparent:!0,opacity:.9,depthWrite:!1,blending:bt});je=new D(Me,He),je.rotation.x=Math.PI/2.5,je.rotation.y=.25,g.add(je);const tt=new On(24,72,64),lt=new ye({map:_e,side:Nt,transparent:!0,opacity:.6,depthWrite:!1,blending:bt});return We=new D(tt,lt),We.rotation.y=Math.PI/2.2,g.add(We),g},U_=()=>{const g=new gt;g.position.set(-860,320,780);const w=new Te(50,16,16),K=new ye({visible:!1});V=new D(w,K),V.userData={body:ae},g.add(V);const G=new Te(12,24,24),H=new ye({color:16777215}),z=new D(G,H);z.userData={body:ae},g.add(z);const ge=new Te(16,24,24),de=new ye({color:11032055,transparent:!0,opacity:.5,wireframe:!0}),b=new D(ge,de);g.add(b),J=new gt;const W=new xn(12,160,24,1,!0),X=new ye({color:3718648,transparent:!0,opacity:.35,side:Nt,depthWrite:!1,blending:bt}),te=new D(W,X);te.position.y=86,J.add(te);const _e=new D(W,X);return _e.rotation.x=Math.PI,_e.position.y=-86,J.add(_e),g.add(J),g},F_=()=>{const g=new gt,w=new Te(22,16,16),K=new ye({visible:!1});Ne=new D(w,K),Ne.userData={body:me},g.add(Ne);const G=new Et(12,2.5,4.5,24,1,!0),H=new Ue({color:16096779,metalness:.95,roughness:.15,side:Nt}),z=new D(G,H);z.rotation.x=Math.PI/2,z.userData={body:me},g.add(z);const ge=new Et(.5,.5,9,8),de=new Ue({color:9741240,metalness:.8,roughness:.2}),b=new D(ge,de);b.rotation.x=Math.PI/2,b.position.z=5,g.add(b);const W=new Te(.9,12,12);ce=new ye({color:61695});const X=new D(W,ce);X.position.z=9.8,g.add(X);const te=new Et(5.5,5.5,8,6),_e=new Ue({color:3359061,metalness:.85,roughness:.3}),Me=new D(te,_e);Me.rotation.x=Math.PI/2,Me.position.z=-5.5,g.add(Me);const He=new Et(.6,.6,18,8),tt=new D(He,de);tt.rotation.z=Math.PI/2,tt.position.set(0,0,-6),g.add(tt);const lt=new Et(1.5,1.5,4,8),ct=new D(lt,_e);return ct.position.set(10,0,-6),g.add(ct),g},O_=()=>{const g=new gt,w=new Te(36,16,16),K=new ye({visible:!1});Je=new D(w,K),Je.userData={body:rt},g.add(Je);const G=new Te(18,32,32),H=new Ue({map:ep("#083344","#06b6d4"),roughness:.45,metalness:.15});ze=new D(G,H),ze.userData={body:rt},g.add(ze);const z=new On(24,34,64),ge=new ye({color:2282478,side:Nt,transparent:!0,opacity:.75,blending:bt,depthWrite:!1}),de=new D(z,ge);de.rotation.x=Math.PI/3,g.add(de);const b=new On(37,45,64),W=new ye({color:561586,side:Nt,transparent:!0,opacity:.5,blending:bt,depthWrite:!1}),X=new D(b,W);X.rotation.x=Math.PI/3,g.add(X);const te=new Te(3.5,16,16),_e=new Ue({color:9741240,roughness:.8});return ke=new D(te,_e),g.add(ke),g},k_=()=>{const g=new gt,w=new Te(28,16,16),K=new ye({visible:!1});yt=new D(w,K),yt.userData={body:Y},g.add(yt);const G=new xt(32,.4,18),H=new Ue({color:14870768,metalness:.95,roughness:.2}),z=new D(G,H);z.rotation.x=.2,z.userData={body:Y},g.add(z);const ge=new Et(11,11,1.2,6),de=new Ue({color:16096779,metalness:.98,roughness:.1}),b=new D(ge,de);b.rotation.x=Math.PI/2+.2,b.position.set(0,4,-2),b.userData={body:Y},g.add(b);const W=new Et(.3,.3,14,6),X=new Ue({color:1976635,metalness:.8,roughness:.3}),te=[0,Math.PI*2/3,Math.PI*4/3];for(const He of te){const tt=new D(W,X);tt.position.set(Math.cos(He)*6,7,Math.sin(He)*6-2),tt.rotation.x=.45,tt.rotation.z=Math.sin(He)*.4,g.add(tt)}const _e=new Et(2,2,.5,6),Me=new D(_e,de);return Me.position.set(0,12,4),g.add(Me),g},B_=()=>{const g=new gt;g.position.set(-920,-260,-720);const w=new Te(65,16,16),K=new ye({visible:!1});be=new D(w,K),be.userData={body:Ke},g.add(be);const G=new Te(8,24,24),H=new ye({color:16777215}),z=new D(G,H);z.userData={body:Ke},g.add(z);const ge=new Te(14,16,16),de=new ye({color:3718648,transparent:!0,opacity:.6,side:vn,blending:bt}),b=new D(ge,de);g.add(b),Ve.length=0;const W=[{inner:16,outer:34,color:440020,opacity:.55},{inner:32,outer:54,color:1096065,opacity:.45},{inner:52,outer:80,color:15485081,opacity:.4},{inner:76,outer:98,color:9647082,opacity:.3}];for(const X of W){const te=new On(X.inner,X.outer,64),_e=new ye({color:X.color,side:Nt,transparent:!0,opacity:X.opacity,depthWrite:!1,blending:bt}),Me=new D(te,_e);Me.rotation.x=Math.PI/2.8,Me.rotation.y=.2,g.add(Me),Ve.push(Me)}return g},G_=()=>{const g=new gt;g.position.set(450,350,850);const w=new Te(65,16,16),K=new ye({visible:!1});st=new D(w,K),st.userData={body:qt},g.add(st);const G=new Ue({color:14870768,metalness:.88,roughness:.2}),H=new xn(24,68,4),z=new D(H,G);z.rotation.x=Math.PI/2,z.scale.set(1.4,1,.4),z.userData={body:qt},g.add(z);const ge=new Te(7.5,24,24),de=new ye({color:12616956,transparent:!0,opacity:.9});it=new D(ge,de),g.add(it);const b=new xn(3,9,3),W=[{x:18,z:8},{x:-18,z:8},{x:14,z:-14},{x:-14,z:-14}];for(const X of W){const te=new D(b,G);te.position.set(X.x,3,X.z),te.rotation.x=Math.PI/2,g.add(te)}return g},z_=()=>{const g=new gt,w=new Te(24,16,16),K=new ye({visible:!1});Vn=new D(w,K),Vn.userData={body:ns},g.add(Vn);const G=new xt(4,16,36),H=new Ue({color:328965,metalness:.98,roughness:.05}),z=new D(G,H);z.userData={body:ns},g.add(z);const ge=new xt(4.2,16.2,36.2);jn=new ye({color:3718648,wireframe:!0,transparent:!0,opacity:.45,blending:bt});const de=new D(ge,jn);return g.add(de),g},H_=()=>{const g=new gt,w=new Te(22,16,16),K=new ye({visible:!1});As=new D(w,K),As.userData={body:Pi},g.add(As);const G=new Et(2.4,4.2,28,8),H=new Ue({color:10424889,roughness:.92,metalness:.1,flatShading:!0}),z=new D(G,H);return z.rotation.z=Math.PI/4,z.userData={body:Pi},g.add(z),g},V_=()=>{const g=new gt,w=new Te(24,16,16),K=new ye({visible:!1});Cs=new D(w,K),Cs.userData={body:Jn},g.add(Cs);const G=new Fr(26,26),H=new Ue({color:10875900,metalness:.96,roughness:.08,side:Nt,transparent:!0,opacity:.8});lr=new D(G,H),lr.rotation.z=Math.PI/4,lr.userData={body:Jn},g.add(lr);const z=new Et(.35,.35,36,6),ge=new Ue({color:1976635,metalness:.8,roughness:.3}),de=new D(z,ge);g.add(de);const b=new D(z,ge);b.rotation.z=Math.PI/2,g.add(b);const W=new xt(3.5,3.5,3.5),X=new Ue({color:16096779,metalness:.9,roughness:.2}),te=new D(W,X);return g.add(te),g},W_=()=>{const g=new gt;g.position.set(-1050,-180,480);const w=new Te(60,16,16),K=new ye({visible:!1});Rs=new D(w,K),Rs.userData={body:ss},g.add(Rs);const G=new Te(18,32,32),H=new ye({map:Jf()});yi=new D(G,H),yi.position.set(-24,0,0),yi.userData={body:ss},g.add(yi);const z=new Te(7,24,24),ge=new ye({color:14742270});ri=new D(z,ge),ri.position.set(32,0,0),ri.userData={body:ss},g.add(ri);const de=[new L(-14,0,0),new L(0,4,3),new L(25,0,0)],b=new jt().setFromPoints(de),W=new gs({color:16638023,transparent:!0,opacity:.7,blending:bt});return cr=new Hc(b,W),g.add(cr),g},X_=()=>{const g=new gt;g.position.set(-680,380,-650);const w=new Te(65,16,16),K=new ye({visible:!1});Ds=new D(w,K),Ds.userData={body:ja},g.add(Ds),Wr.length=0;const G=[{inner:15,outer:26,color:3718648,opacity:.85},{inner:27,outer:42,color:11032055,opacity:.7},{inner:44,outer:65,color:15485081,opacity:.55},{inner:68,outer:90,color:440020,opacity:.35}];for(const de of G){const b=new On(de.inner,de.outer,64),W=new ye({color:de.color,side:Nt,transparent:!0,opacity:de.opacity,depthWrite:!1,blending:bt}),X=new D(b,W);X.rotation.x=Math.PI/2.6,g.add(X),Wr.push(X)}const H=new Te(14,24,24),z=new ye({color:0}),ge=new D(H,z);return ge.userData={body:ja},g.add(ge),g},Y_=()=>{const g=new gt,w=new Te(22,16,16),K=new ye({visible:!1});ur=new D(w,K),ur.userData={body:q},g.add(ur);const G=new Ue({color:16777215,metalness:.4,roughness:.2}),H=new Ue({color:16347926,metalness:.7,roughness:.25}),z=new ye({color:61695}),ge=new xn(3.5,22,4),de=new D(ge,G);de.rotation.y=Math.PI/4,de.rotation.x=Math.PI/2,de.userData={body:q},g.add(de);const b=new xt(2.4,1.8,6),W=new D(b,z);W.position.set(0,1.5,3),g.add(W);const X=new xt(22,.4,10),te=new D(X,H);te.position.set(0,0,-2),g.add(te),E.length=0;const _e=new xn(1.8,14,12,1,!0),Me=new ye({color:16347926,transparent:!0,opacity:.85,side:Nt,depthWrite:!1,blending:bt}),He=[-3.5,3.5];for(const tt of He){const lt=new D(_e,Me);lt.rotation.x=-Math.PI/2,lt.position.set(tt,0,-16),g.add(lt),E.push(lt)}return g},q_=()=>{const g=new gt,w=new Te(26,16,16),K=new ye({visible:!1});ee=new D(w,K),ee.userData={body:Xe},g.add(ee);const G=new Ks(16,1),H=new Ue({color:14742270,metalness:.9,roughness:.05,transparent:!0,opacity:.75}),z=new D(G,H);z.userData={body:Xe},g.add(z);const ge=new Ks(16.5,1),de=new ye({color:3718648,wireframe:!0,transparent:!0,opacity:.65,blending:bt}),b=new D(ge,de);g.add(b);const W=new Te(6,16,16),X=new ye({color:16777215,transparent:!0,opacity:.8});return ie=new D(W,X),g.add(ie),g},K_=()=>{const g=new gt,w=new Te(32,16,16),K=new ye({visible:!1});Ye=new D(w,K),Ye.userData={body:nt},g.add(Ye);const G=new Ue({color:9741240,metalness:.8,roughness:.3}),H=new Et(2,2,50,8),z=new D(H,G);z.userData={body:nt},g.add(z);const ge=new xt(36,2,4),de=new D(ge,G);de.position.y=8,g.add(de);const b=[3718648,16096779,15680580,1096065],W=new xt(5,4,7);for(let He=0;He<4;He++){const tt=new Ue({color:b[He],roughness:.4}),lt=new D(W,tt);lt.position.set(-12+He*8,4,He%2===0?3:-3),g.add(lt)}const X=new Te(.8,8,8),te=new ye({color:3718648}),_e=new D(X,te);_e.position.set(18,9,0);const Me=new D(X,te);return Me.position.set(-18,9,0),g.add(_e),g.add(Me),g},$_=()=>{const g=new gt;g.position.set(980,-220,620);const w=new Te(45,16,16),K=new ye({visible:!1});Mt=new D(w,K),Mt.userData={body:ot},g.add(Mt);const G=document.createElement("canvas");G.width=512,G.height=256;const H=G.getContext("2d");H.fillStyle="#1c1917",H.fillRect(0,0,512,256),H.strokeStyle="#ef4444",H.lineWidth=4;for(let te=0;te<24;te++)H.beginPath(),H.moveTo(Math.random()*512,Math.random()*256),H.bezierCurveTo(Math.random()*512,Math.random()*256,Math.random()*512,Math.random()*256,Math.random()*512,Math.random()*256),H.stroke();H.fillStyle="#fde047";for(let te=0;te<20;te++)H.beginPath(),H.arc(Math.random()*512,Math.random()*256,Math.random()*8+3,0,Math.PI*2),H.fill();const z=new Cn(G);z.wrapS=Ei;const ge=new Te(22,32,32),de=new Ue({map:z,emissive:10033947,emissiveIntensity:.65,roughness:.8});Tt=new D(ge,de),Tt.userData={body:ot},g.add(Tt);const b=new Te(26,24,24),W=new ye({color:15680580,transparent:!0,opacity:.35,side:vn,blending:bt}),X=new D(b,W);return g.add(X),g},Z_=()=>{const g=new gt;g.position.set(-520,-360,920);const w=new Te(45,16,16),K=new ye({visible:!1});nn=new D(w,K),nn.userData={body:Xt},g.add(nn);const G=new Te(10,24,24),H=new ye({color:16777215}),z=new D(G,H);z.userData={body:Xt},g.add(z),Qt.length=0;const ge=[18,28,38],de=[61695,3718648,11032055];for(let b=0;b<3;b++){const W=new kn(ge[b],.6,12,36),X=new ye({color:de[b],wireframe:!0,transparent:!0,opacity:.65,blending:bt}),te=new D(W,X);te.rotation.x=b*Math.PI/3,te.rotation.y=b*Math.PI/4,g.add(te),Qt.push(te)}return g},j_=()=>{const g=new gt,w=new Te(26,16,16),K=new ye({visible:!1});et=new D(w,K),et.userData={body:yn},g.add(et);const G=new Ue({color:15857145,metalness:.9,roughness:.2}),H=new ye({color:1096065}),z=[{x:0,y:0,z:8},{x:-10,y:3,z:-8},{x:10,y:-3,z:-8}];for(const ge of z){const de=new gt;de.position.set(ge.x,ge.y,ge.z);const b=new xn(3,8,3),W=new D(b,G);W.rotation.x=Math.PI/2,W.userData={body:yn},de.add(W);const X=new Te(.8,8,8),te=new D(X,H);te.position.set(0,0,4.2),de.add(te),g.add(de)}return g},J_=()=>{const g=new gt,w=new Te(30,16,16),K=new ye({visible:!1});Nn=new D(w,K),Nn.userData={body:Wn},g.add(Nn);const G=new Dr(15,1),H=new Ue({color:16096779,metalness:.92,roughness:.25,flatShading:!0}),z=new D(G,H);z.userData={body:Wn},g.add(z);const ge=new xt(8,6,8),de=new Ue({color:3359061,metalness:.8,roughness:.3}),b=new D(ge,de);b.position.set(0,14,0),g.add(b);const W=new Te(1.2,8,8);Qn=new ye({color:16498468});const X=new D(W,Qn);return X.position.set(0,18,0),g.add(X),g},Q_=()=>{const g=new gt;g.position.set(-1050,480,-880);const w=new Te(45,16,16),K=new ye({visible:!1});zt=new D(w,K),zt.userData={body:Mi},g.add(zt);const G=new kn(36,1.2,16,64),H=new Ue({color:16096779,metalness:.85,roughness:.25}),z=new D(G,H);z.rotation.x=Math.PI/2,g.add(z);const ge=new xt(14,.6,6),de=new Ue({color:14251782,metalness:.9,roughness:.2,emissive:7877903,emissiveIntensity:.4});for(let lt=0;lt<8;lt++){const ct=lt*Math.PI*2/8,Wt=new D(ge,de);Wt.position.set(Math.cos(ct)*36,0,Math.sin(ct)*36),Wt.rotation.y=-ct,g.add(Wt)}const b=new Te(10,24,24);rn=new ye({color:16776171});const W=new D(b,rn);W.userData={body:Mi},g.add(W);const X=new On(11,16,32),te=new ye({color:16498468,transparent:!0,opacity:.6,side:Nt,blending:bt}),_e=new D(X,te);_e.rotation.x=Math.PI/2,g.add(_e);const Me=new Et(.8,.8,90,16),He=new ye({color:61695,transparent:!0,opacity:.55,blending:bt}),tt=new D(Me,He);return g.add(tt),g},ex=()=>{const g=new gt;g.position.set(-950,-420,680);const w=new Te(38,16,16),K=new ye({visible:!1});ai=new D(w,K),ai.userData={body:Ru},g.add(ai);const G=new zf(20,2),H=new Ue({color:3718648,roughness:.1,metalness:.6,flatShading:!0});di=new D(G,H),di.userData={body:Ru},g.add(di);const z=new Te(23,24,24),ge=new ye({color:61695,transparent:!0,opacity:.28,side:vn,blending:bt}),de=new D(z,ge);g.add(de);const b=new On(28,38,48),W=new ye({color:8246268,transparent:!0,opacity:.55,side:Nt,blending:bt}),X=new D(b,W);X.rotation.x=Math.PI/3,X.rotation.y=.2,g.add(X);const te=new On(41,48,48),_e=new ye({color:12616956,transparent:!0,opacity:.45,side:Nt,blending:bt}),Me=new D(te,_e);Me.rotation.x=Math.PI/3,Me.rotation.y=.2,g.add(Me),rs.length=0;const He=new Ks(2.5,0),tt=new Ue({color:14742270,metalness:.8,roughness:.1});for(let lt=0;lt<4;lt++){const ct=new D(He,tt);g.add(ct),rs.push(ct)}return g},tx=()=>{const g=new gt;g.position.set(1180,-460,880);const w=new Te(45,16,16),K=new ye({visible:!1});Qa=new D(w,K),Qa.userData={body:Zf},g.add(Qa),eo.length=0;const G=[36,26,16],H=[8141549,440020,15485081];for(let X=0;X<3;X++){const te=new kn(G[X],1.2,16,48),_e=new Ue({color:1973067,metalness:.9,roughness:.2,emissive:H[X],emissiveIntensity:.6}),Me=new D(te,_e);Me.rotation.x=X*Math.PI/4,Me.rotation.y=X*Math.PI/6,g.add(Me),eo.push(Me)}const z=new Gf(14,32),ge=new ye({color:12616956,transparent:!0,opacity:.75,side:Nt,blending:bt});Tl=new D(z,ge),g.add(Tl);const de=new xn(2.5,16,4),b=new Ue({color:4674921,metalness:.85,roughness:.2}),W=new ye({color:61695});for(let X=0;X<4;X++){const te=X*Math.PI/2,_e=new D(de,b);_e.position.set(Math.cos(te)*42,Math.sin(te)*42,0),_e.rotation.z=te-Math.PI/2,g.add(_e);const Me=new D(new Te(1.2,8,8),W);Me.position.set(Math.cos(te)*50,Math.sin(te)*50,0),g.add(Me)}return g},nx=()=>{const g=new gt;g.position.set(1420,260,180);const w=new Te(45,16,16),K=new ye({visible:!1});no=new D(w,K),no.userData={body:Pu},g.add(no);const G=document.createElement("canvas");G.width=512,G.height=256;const H=G.getContext("2d"),z=["#064e3b","#047857","#059669","#10b981","#34d399","#0f766e","#14b8a6","#2dd4bf","#0284c7","#0369a1","#065f46","#047857","#10b981","#f59e0b","#064e3b"];for(let tt=0;tt<z.length;tt++)H.fillStyle=z[tt],H.fillRect(0,tt*256/z.length,512,256/z.length+1);H.fillStyle="#6ee7b7",H.beginPath(),H.ellipse(320,175,45,22,.1,0,Math.PI*2),H.fill();const ge=new Cn(G);ge.wrapS=Ei;const de=new Te(28,36,36),b=new Ue({map:ge,roughness:.75,metalness:.15});io=new D(de,b),io.userData={body:Pu},g.add(io);const W=new On(38,62,64),X=new ye({color:7268279,transparent:!0,opacity:.45,side:Nt,blending:bt}),te=new D(W,X);te.rotation.x=Math.PI/2.6,te.rotation.y=.15,g.add(te),Al.length=0;const _e=new Ue({color:13358561,roughness:.8}),Me=new D(new Te(2,12,12),_e),He=new D(new Te(1.5,12,12),_e);return g.add(Me),g.add(He),Al.push(Me,He),g},ix=()=>{const g=new gt;g.position.set(-1400,520,350);const w=new Te(50,16,16),K=new ye({visible:!1});so=new D(w,K),so.userData={body:Cl},g.add(so);const G=new Ue({color:6809849,emissive:561586,emissiveIntensity:.5,metalness:.3,roughness:.3});ro.length=0;for(let W=0;W<10;W++){const X=(W-5)*12,te=new Et(2.5,3,8,8),_e=new D(te,G);_e.position.set(0,Math.sin(W*.5)*4,X),_e.rotation.x=Math.PI/2,_e.userData={body:Cl},g.add(_e);const Me=new kn(12-W*.6,.9,8,24,Math.PI*.85),He=new D(Me,G);He.position.set(-4,Math.sin(W*.5)*4,X),He.rotation.y=Math.PI/2,He.rotation.z=.3,g.add(He),ro.push(He);const tt=new D(Me,G);tt.position.set(4,Math.sin(W*.5)*4,X),tt.rotation.y=-Math.PI/2,tt.rotation.z=-.3,g.add(tt),ro.push(tt)}const H=new Dr(7,0),z=new ye({color:15485081});Yr=new D(H,z),Yr.position.set(0,2,-5),Yr.userData={body:Cl},g.add(Yr);const ge=new Te(10,16,16),de=new ye({color:15485081,transparent:!0,opacity:.35,side:vn,blending:bt}),b=new D(ge,de);return b.position.set(0,2,-5),g.add(b),g},sx=()=>{const g=new gt;g.position.set(850,480,1150);const w=new Te(55,16,16),K=new ye({visible:!1});ao=new D(w,K),ao.userData={body:Du},g.add(ao);const G=document.createElement("canvas");G.width=512,G.height=128;const H=G.getContext("2d");H.fillStyle="#0284c7",H.fillRect(0,0,512,128),H.fillStyle="#16a34a";for(let _e=0;_e<16;_e++)H.beginPath(),H.ellipse(_e*32+16,64,18,42,0,0,Math.PI*2),H.fill();H.fillStyle="#22c55e";for(let _e=0;_e<12;_e++)H.beginPath(),H.arc(_e*42+20,64,15,0,Math.PI*2),H.fill();H.fillStyle="rgba(255, 255, 255, 0.65)";for(let _e=0;_e<20;_e++)H.beginPath(),H.ellipse(Math.random()*512,Math.random()*128,25,10,.2,0,Math.PI*2),H.fill();const z=new Cn(G);z.wrapS=Ei;const ge=new Et(44,44,16,64,1,!0),de=new Ue({map:z,side:Nt,roughness:.5,metalness:.2});oo=new D(ge,de),oo.userData={body:Du},g.add(oo);const b=new kn(44.2,1,12,64),W=new Ue({color:3359061,metalness:.9,roughness:.2}),X=new D(b,W);X.rotation.x=Math.PI/2,X.position.y=8,g.add(X);const te=new D(b,W);te.rotation.x=Math.PI/2,te.position.y=-8,g.add(te);for(let _e=0;_e<4;_e++){const Me=_e*Math.PI/2,He=new Et(.5,1.2,14,8),tt=new Ue({color:6583435,metalness:.8}),lt=new D(He,tt);lt.position.set(Math.cos(Me)*44,15,Math.sin(Me)*44),g.add(lt);const ct=new Te(.9,8,8),Wt=new ye({color:2278750}),St=new D(ct,Wt);St.position.set(Math.cos(Me)*44,22,Math.sin(Me)*44),g.add(St)}return g},rx=()=>{const g=new gt;g.position.set(-1350,-520,-1100);const w=new Te(45,16,16),K=new ye({visible:!1});co=new D(w,K),co.userData={body:Iu},g.add(co);const G=new Te(16,32,32),H=new ye({color:16772565}),z=new D(G,H);z.userData={body:Iu},g.add(z);const ge=new Te(20,24,24),de=new ye({color:16347926,transparent:!0,opacity:.55,side:vn,blending:bt}),b=new D(ge,de);g.add(b);const W=new On(24,52,48),X=new ye({color:16096779,transparent:!0,opacity:.65,side:Nt,blending:bt});ho=new D(W,X),ho.rotation.x=Math.PI/2.5,g.add(ho),uo.length=0;const te=new xn(8,120,16,1,!0),_e=new ye({color:61695,transparent:!0,opacity:.65,side:Nt,blending:bt,depthWrite:!1}),Me=new D(te,_e);Me.position.y=65,g.add(Me),uo.push(Me);const He=new D(te,_e);return He.rotation.x=Math.PI,He.position.y=-65,g.add(He),uo.push(He),g},ax=()=>{const g=new gt;g.position.set(-650,580,-1250);const w=new Te(40,16,16),K=new ye({visible:!1});po=new D(w,K),po.userData={body:Lu},g.add(po);const G=new xt(30,30,30),H=new km(G),z=new gs({color:14239471,transparent:!0,opacity:.85,linewidth:2});Kr=new _c(H,z),Kr.userData={body:Lu},g.add(Kr);const ge=new xt(16,16,16),de=new km(ge),b=new gs({color:61695,transparent:!0,opacity:.95});$r=new _c(de,b),g.add($r);const W=[],X=[[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]];for(const ct of X)W.push(new L(ct[0]*15,ct[1]*15,ct[2]*15)),W.push(new L(ct[0]*8,ct[1]*8,ct[2]*8));const te=new jt().setFromPoints(W),_e=new gs({color:11032055,transparent:!0,opacity:.65}),Me=new _c(te,_e);g.add(Me);const He=new Te(3.5,16,16),tt=new ye({color:16777215}),lt=new D(He,tt);return g.add(lt),g},ox=()=>{const g=new gt;g.position.set(450,-420,-1200);const w=new Te(48,16,16),K=new ye({visible:!1});mo=new D(w,K),mo.userData={body:Nu},g.add(mo);const G=new Ue({color:1976635,metalness:.85,roughness:.25}),H=new D(new xt(40,8,10),G);H.position.z=12,H.userData={body:Nu},g.add(H);const z=new D(new xt(40,8,10),G);z.position.z=-12,g.add(z);const ge=new Te(11,24,24),de=new Ue({color:15357964,emissive:12730636,emissiveIntensity:.8,roughness:.3});Rl=new D(ge,de),g.add(Rl),go.length=0;for(let X=0;X<3;X++){const te=new kn(14+X*3,.8,12,36),_e=new ye({color:16096779,wireframe:!0,transparent:!0,opacity:.7,blending:bt}),Me=new D(te,_e);Me.rotation.x=X*Math.PI/3,Me.rotation.y=X*Math.PI/4,g.add(Me),go.push(Me)}const b=new xt(1.5,20,8),W=new Ue({color:10033947,emissive:8330525,emissiveIntensity:.5,metalness:.7});for(let X=0;X<4;X++){const te=new D(b,W);te.position.set((X-1.5)*9,12,0),g.add(te)}return g},lx=()=>{const g=new gt;g.position.set(1500,-320,-650);const w=new Te(45,16,16),K=new ye({visible:!1});_o=new D(w,K),_o.userData={body:Uu},g.add(_o);const G=new Dr(16,1),H=new Ue({color:988970,metalness:.9,roughness:.2,flatShading:!0}),z=new D(G,H);z.userData={body:Uu},g.add(z);const ge=new xn(3.5,26,6),de=new Ue({color:9133302,emissive:5774471,emissiveIntensity:.45,metalness:.8,roughness:.1,flatShading:!0}),b=[[1,.5,.5],[-1,.6,.4],[.3,1,.5],[-.4,-1,.6],[.5,-.4,1],[-.5,.3,-1],[.8,-.8,-.5],[-.7,.7,-.6]];for(const te of b){const _e=new L(te[0],te[1],te[2]).normalize(),Me=new D(ge,de);Me.position.copy(_e.clone().multiplyScalar(14)),Me.quaternion.setFromUnitVectors(new L(0,1,0),_e),g.add(Me)}jr.length=0;const W=new Ks(1.8,0),X=new ye({color:12891645});for(let te=0;te<10;te++){const _e=new D(W,X);g.add(_e),jr.push(_e)}return g},cx=()=>{const g=document.createElement("canvas");g.width=512,g.height=320;const w=g.getContext("2d");return w.fillStyle="#050c1a",w.fillRect(0,0,512,320),w.fillStyle="#0f172a",w.fillRect(0,0,512,28),w.fillStyle="#ef4444",w.beginPath(),w.arc(16,14,5,0,Math.PI*2),w.fill(),w.fillStyle="#eab308",w.beginPath(),w.arc(32,14,5,0,Math.PI*2),w.fill(),w.fillStyle="#22c55e",w.beginPath(),w.arc(48,14,5,0,Math.PI*2),w.fill(),w.fillStyle="#64748b",w.font="11px monospace",w.fillText("zsh - anko@quantum-macbook: ~/portfolio-vuejs",70,18),w.font="bold 13px monospace",w.fillStyle="#38bdf8",w.fillText("> bun run dev --host",18,56),w.fillStyle="#a855f7",w.fillText("  VITE v5.4.20 ready in 42 ms",18,82),w.fillStyle="#22c55e",w.fillText("  ➜  Local:   http://localhost:5173/",18,108),w.fillText("  ➜  Network: http://192.168.1.10:5173/",18,128),w.fillStyle="#f59e0b",w.fillText("  [SYSTEM] Quantum Core: 128-Core Matrix Active",18,160),w.fillStyle="#06b6d4",w.fillText("  [TS-CHECK] vue-tsc --noEmit: 0 ERRORS FOUND ✓",18,188),w.fillStyle="#ec4899",w.fillText("  [AGENT] Antigravity 2.0 Pair Programming Online",18,216),w.fillStyle="#ffffff",w.fillText('  const dev = { name: "Anko", role: "Full-Stack" };',18,248),w.fillStyle="#00f0ff",w.fillText('  console.log("Welcome to Cosmos Portfolio 🚀");',18,276),w.fillStyle="#22c55e",w.fillRect(18,290,10,14),new Cn(g)},ux=()=>{const g=document.createElement("canvas");g.width=256,g.height=256;const w=g.getContext("2d");w.fillStyle="#ca8a04",w.fillRect(0,0,256,256),w.strokeStyle="#eab308",w.lineWidth=1;for(let K=15;K<120;K+=3)w.beginPath(),w.arc(128,128,K,0,Math.PI*2),w.stroke();return w.fillStyle="#1e293b",w.beginPath(),w.arc(128,128,26,0,Math.PI*2),w.fill(),w.fillStyle="#000000",w.beginPath(),w.arc(128,128,6,0,Math.PI*2),w.fill(),new Cn(g)},dx=()=>{const g=document.createElement("canvas");g.width=512,g.height=256;const w=g.getContext("2d"),K=w.createLinearGradient(0,0,0,256);K.addColorStop(0,"#0c4a6e"),K.addColorStop(.2,"#0284c7"),K.addColorStop(.4,"#0369a1"),K.addColorStop(.6,"#0ea5e9"),K.addColorStop(.8,"#0369a1"),K.addColorStop(1,"#082f49"),w.fillStyle=K,w.fillRect(0,0,512,256),w.fillStyle="rgba(224, 242, 254, 0.45)";for(let G=0;G<24;G++){const H=Math.random()*256;w.beginPath(),w.ellipse(Math.random()*512,H,Math.random()*90+40,Math.random()*12+4,0,0,Math.PI*2),w.fill()}return new Cn(g)},hx=()=>{const g=new gt;g.position.set(-350,320,-180);const w=new Te(32,16,16),K=new ye({visible:!1});xo=new D(w,K),xo.userData={body:Fu},g.add(xo);const G=new Ue({color:16766720,metalness:.95,roughness:.15}),H=new Et(18,19,6,32,1,!0),z=new D(H,G);z.userData={body:Fu},g.add(z);const ge=new D(new kn(19.2,.9,12,48),G);ge.rotation.x=Math.PI/2,ge.position.y=-3,g.add(ge);const de=new D(new kn(18.2,.9,12,48),G);de.rotation.x=Math.PI/2,de.position.y=3,g.add(de);const b=new Ue({color:7020968,roughness:.9,metalness:.1}),W=new Te(17,24,16,0,Math.PI*2,0,Math.PI*.45),X=new D(W,b);X.position.y=0,g.add(X);const te=new Ue({color:15680580,emissive:10033947,emissiveIntensity:.6,roughness:.1,metalness:.2}),_e=new Ue({color:1096065,emissive:417606,emissiveIntensity:.6,roughness:.1,metalness:.2});for(let lt=0;lt<5;lt++){const ct=lt*Math.PI*2/5,Wt=new xn(3.2,14,4),St=new D(Wt,G);St.position.set(Math.cos(ct)*18,9,Math.sin(ct)*18),St.rotation.y=-ct,g.add(St);const Lt=new D(new Te(1.5,12,12),G);Lt.position.set(Math.cos(ct)*18,16.5,Math.sin(ct)*18),g.add(Lt);const Mn=new Dr(1.8,0),hn=new D(Mn,lt%2===0?te:_e);hn.position.set(Math.cos(ct)*19.2,3,Math.sin(ct)*19.2),g.add(hn)}const Me=new D(new xt(1.2,6,1.2),G);Me.position.y=17,g.add(Me);const He=new D(new xt(4,1.2,1.2),G);He.position.y=18,g.add(He),Jr.length=0;const tt=new Ue({color:16777215,emissive:16707722,emissiveIntensity:.7,roughness:.1,metalness:.9});for(let lt=0;lt<6;lt++){const ct=new D(new Ks(1.4,0),tt);g.add(ct),Jr.push(ct)}return g},fx=()=>{const g=new gt;g.position.set(320,160,360);const w=new Te(32,16,16),K=new ye({visible:!1});vo=new D(w,K),vo.userData={body:Ou},g.add(vo);const G=new Ue({color:165063,metalness:.85,roughness:.18}),H=new Ue({color:16317180,metalness:.5,roughness:.3}),z=new Ue({color:1579035,metalness:.6,roughness:.5}),ge=new Ue({color:14870768,metalness:.95,roughness:.1}),de=new D(new xt(6,2.5,24),H);de.position.set(0,0,2),de.userData={body:Ou},g.add(de);const b=new D(new xt(10,1.2,12),z);b.position.set(0,1.2,5),g.add(b);const W=new D(new xt(9,14,10),G);W.position.set(0,8,14),W.rotation.x=-.3,g.add(W);const X=new ye({color:6809849}),te=new D(new xt(7,3.5,2),X);te.position.set(0,8.5,19.5),te.rotation.x=-.3,g.add(te);const _e=new xn(8,55,16,1,!0),Me=new ye({color:3718648,transparent:!0,opacity:.25,side:Nt,blending:bt,depthWrite:!1}),He=new D(_e,Me);He.rotation.x=-Math.PI/2,He.position.set(0,8,48),g.add(He);const tt=new D(new Et(.7,.7,16,8),ge);tt.rotation.z=Math.PI/2,tt.position.set(0,15.5,13),g.add(tt);const lt=new D(new Et(1,1,4,8),z);lt.rotation.z=Math.PI/2,lt.position.set(-7,15.5,13),g.add(lt);const ct=new D(new Et(1,1,4,8),z);ct.rotation.z=Math.PI/2,ct.position.set(7,15.5,13),g.add(ct);const Wt=new Et(1.6,1.6,.4,12),St=new Ue({color:988970,metalness:.9}),Lt=new D(new Et(.3,.3,5,6),ge);Lt.position.set(-6,18,12),Lt.rotation.z=-.3,g.add(Lt);const Mn=new D(Wt,St);Mn.position.set(-7.5,20.5,12),g.add(Mn);const hn=new D(new Et(.3,.3,5,6),ge);hn.position.set(6,18,12),hn.rotation.z=.3,g.add(hn);const oi=new D(Wt,St);oi.position.set(7.5,20.5,12),g.add(oi);const Sn=new D(new xt(8,4,18),z);Sn.position.set(0,6,-3),Sn.rotation.x=-.05,g.add(Sn);const Tn=new D(new xt(9,7,16),G);Tn.position.set(0,3,-4),g.add(Tn);const _t=new D(new xt(6,3,2),new ye({color:15680580}));_t.position.set(0,4.5,-12),g.add(_t);const Rt=document.createElement("canvas");Rt.width=128,Rt.height=64;const wn=Rt.getContext("2d");wn.fillStyle="#000000",wn.fillRect(0,0,128,64),wn.strokeStyle="#ffffff",wn.lineWidth=4,wn.strokeRect(4,4,120,56),wn.fillStyle="#ffffff",wn.font="bold 20px monospace",wn.fillText("B 4744 ANK",12,36),wn.font="10px monospace",wn.fillText("09 • 29",42,52);const as=new Cn(Rt),hi=new D(new Fr(5,2.5),new ye({map:as}));hi.position.set(0,1.5,-13),hi.rotation.y=Math.PI,g.add(hi),bo.length=0;const Is=new kn(5.5,1.8,12,24),Ls=new Ue({color:1579035,roughness:.9}),Io=new D(Is,Ls);Io.position.set(0,-2,17),g.add(Io),bo.push(Io);const os=new D(Is,Ls);os.position.set(0,-2,-13),g.add(os),bo.push(os);const Lo=new D(new Et(1.2,1.4,14,12),z);Lo.rotation.x=Math.PI/2.3,Lo.position.set(5.5,-1,-8),g.add(Lo);const Wu=new xn(2.5,16,12,1,!0),Xu=new ye({color:61695,transparent:!0,opacity:.85,side:Nt,blending:bt,depthWrite:!1});return ea=new D(Wu,Xu),ea.rotation.x=-Math.PI/2.3,ea.position.set(5.5,-3,-20),g.add(ea),g},px=()=>{const g=new gt;g.position.set(-260,180,420);const w=new Te(26,16,16),K=new ye({visible:!1});yo=new D(w,K),yo.userData={body:Dl},g.add(yo);const G=new Ue({color:12634326,metalness:.85,roughness:.25}),H=new Ue({color:593174,metalness:.6,roughness:.5}),z=new D(new xt(24,1,16),G);z.userData={body:Dl},g.add(z);const ge=new D(new xt(21,.1,8.5),H);ge.position.set(0,.52,-2.5),g.add(ge);const de=new Ue({color:988970,emissive:61695,emissiveIntensity:.45,roughness:.3});for(let Sn=0;Sn<5;Sn++)for(let Tn=0;Tn<12;Tn++){const _t=new D(new xt(1.4,.2,1.3),de);_t.position.set((Tn-5.5)*1.65,.62,-5.5+Sn*1.55),g.add(_t)}const b=new Ue({color:10530496,metalness:.7,roughness:.2}),W=new D(new xt(7.5,.08,5),b);W.position.set(0,.52,4.2),g.add(W);const X=new D(new Et(.5,.5,22,16),G);X.rotation.z=Math.PI/2,X.position.set(0,.5,-8),g.add(X);const te=new gt;te.position.set(0,.5,-8),te.rotation.x=-Math.PI*.62;const _e=new D(new xt(24,16,.7),G);_e.position.set(0,8,-.35),te.add(_e);const Me=new D(new Te(1,16,16),new ye({color:61695}));Me.scale.set(1,1,.2),Me.position.set(0,8,-.72),te.add(Me);const He=new Ue({color:329745,roughness:.8}),tt=new D(new xt(23.2,15.2,.05),He);tt.position.set(0,8,.02),te.add(tt);const lt=cx(),ct=new Fr(22,14),Wt=new ye({map:lt});Pl=new D(ct,Wt),Pl.position.set(0,8,.06),Pl.userData={body:Dl},te.add(Pl),g.add(te);const St=new xt(3,1.4,5),Lt=new Ue({color:1976635,metalness:.8,roughness:.3});ta=new D(St,Lt),ta.position.set(16,3,4),g.add(ta);const Mn=new xt(1.2,.5,3.2),hn=new Ue({color:61695,emissive:61695,emissiveIntensity:.4}),oi=new D(Mn,hn);return oi.position.set(-16,4,-2),oi.rotation.set(.4,.6,.2),g.add(oi),g},mx=()=>{const g=new gt;g.position.set(-1100,-380,950);const w=new Te(50,16,16),K=new ye({visible:!1});So=new D(w,K),So.userData={body:ku},g.add(So);const G=new Te(30,36,36),H=new Ue({map:dx(),roughness:.4,metalness:.1});wo=new D(G,H),wo.userData={body:ku},g.add(wo);const z=new On(42,86,64),ge=new ye({color:3718648,transparent:!0,opacity:.65,side:Nt,blending:bt}),de=new D(z,ge);de.rotation.x=Math.PI/2.3,de.rotation.y=.2,g.add(de),Il.length=0;const b=new Ue({color:9684477,roughness:.8}),W=new D(new Te(2,12,12),b),X=new D(new Te(1.6,12,12),b);return g.add(W),g.add(X),Il.push(W,X),g},gx=()=>{const g=new gt;g.position.set(1250,520,-420);const w=new Te(38,16,16),K=new ye({visible:!1});Eo=new D(w,K),Eo.userData={body:Bu},g.add(Eo);const G=new Et(.5,18,5,32,1,!0),H=new Ue({color:16317180,roughness:.4,metalness:.2}),z=new D(G,H);z.rotation.x=Math.PI/2,z.userData={body:Bu},g.add(z);const ge=new xn(1.5,8,8),de=new Ue({color:4674921,metalness:.8}),b=new D(ge,de);b.rotation.x=-Math.PI/2,b.position.z=8,g.add(b);const W=new Et(7,7,6,10),X=new Ue({color:1976635,metalness:.85,roughness:.3}),te=new D(W,X);te.position.z=-5,g.add(te);const _e=new Et(5.5,5.5,.5,24),Me=new Ue({map:ux(),metalness:.95,roughness:.15});ia=new D(_e,Me),ia.rotation.z=Math.PI/2,ia.position.set(7.5,0,-5),g.add(ia);const He=new Ue({color:9741240,metalness:.8}),tt=new D(new Et(.4,.4,38,6),He);tt.rotation.z=Math.PI/3,tt.position.set(-18,10,-5),g.add(tt);const lt=new D(new Et(.5,.5,18,6),He);lt.rotation.z=-Math.PI/2.5,lt.position.set(10,-8,-5),g.add(lt);for(let St=0;St<3;St++){const Lt=new D(new Et(1.4,1.4,4,10),new Ue({color:3359061}));Lt.position.set(12+St*3.5,-12,-5),g.add(Lt)}const ct=new Te(1,8,8),Wt=new ye({color:2278750});return To=new D(ct,Wt),To.position.set(0,0,12),g.add(To),g},_x=()=>{const g=new gt;g.position.set(-180,240,-320);const w=new Te(22,16,16),K=new ye({visible:!1});Ao=new D(w,K),Ao.userData={body:Gu},g.add(Ao);const G=new Ue({color:16317180,roughness:.15,metalness:.1}),H=new D(new Et(8,7,14,32,1,!0),G);H.userData={body:Gu},g.add(H);const z=new D(new Et(7,7,1,32),G);z.position.y=-6.5,g.add(z);const ge=new kn(4.2,1.1,12,24,Math.PI),de=new D(ge,G);de.position.set(7.5,0,0),de.rotation.z=-Math.PI/2,g.add(de);const b=new Ue({color:2824208,roughness:.25,metalness:.1}),W=new D(new Et(7.6,7.6,.5,32),b);W.position.y=5.2,g.add(W),Ll.length=0;const X=new Ue({color:7877903,emissive:4528643,emissiveIntensity:.4,roughness:.1});for(let _e=0;_e<5;_e++){const Me=new D(new Te(.9,12,12),X),He=_e*Math.PI*2/5;Me.position.set(Math.cos(He)*4.5,9+_e*1.5,Math.sin(He)*4.5),g.add(Me),Ll.push(Me)}Nl.length=0;const te=new ye({color:16707722,transparent:!0,opacity:.35,blending:bt,side:Nt,depthWrite:!1});for(let _e=0;_e<3;_e++){const Me=new D(new kn(3.5+_e*1.5,.4,8,24),te);Me.rotation.x=Math.PI/2,Me.position.y=12+_e*3.5,g.add(Me),Nl.push(Me)}return g},xx=()=>{const g=new gt;g.position.set(550,-220,280);const w=new Te(30,16,16),K=new ye({visible:!1});Co=new D(w,K),Co.userData={body:zu},g.add(Co);const G=new Ue({color:15485081,emissive:8591427,emissiveIntensity:.4,metalness:.7,roughness:.2}),H=new D(new xt(16,3.2,22),G);H.userData={body:zu},g.add(H);const z=new D(new xn(2.5,9,8),G);z.rotation.z=.3,z.position.set(-6.5,0,13),g.add(z);const ge=new D(new xn(2.2,7,8),G);ge.rotation.z=-.3,ge.position.set(6.5,0,12),g.add(ge);const de=new Ue({color:15857145,roughness:.3}),b=new D(new xt(11,.2,14),de);b.position.set(-1,1.7,1),g.add(b);const W=new Ue({color:988970,metalness:.8});for(let St=0;St<3;St++){const Lt=new D(new xt(7.5,.4,1.6),W);Lt.position.set(0,1.9,-1+St*3.5),g.add(Lt)}const X=new D(new xt(6,.6,2.5),new Ue({color:14870768,metalness:.95}));X.position.set(0,1.9,-6),g.add(X);const te=new Ue({color:16639626,roughness:.4}),_e=new D(new xt(2.6,1.4,32),te);_e.position.set(0,.8,20),g.add(_e);const Me=new D(new xt(3.8,1.2,8),te);Me.position.set(.6,.8,38),Me.rotation.y=.15,g.add(Me);const He=new gs({color:3718648}),tt=[];for(let St=0;St<6;St++){const Lt=(St-2.5)*.35;tt.push(new L(Lt,2,-6)),tt.push(new L(Lt,1.6,36))}const lt=new jt().setFromPoints(tt),ct=new _c(lt,He);g.add(ct),Ul.length=0;const Wt=new ye({color:15485081,transparent:!0,opacity:.45,wireframe:!0,blending:bt});for(let St=0;St<3;St++){const Lt=new D(new On(14+St*6,15+St*6,32),Wt);Lt.rotation.x=Math.PI/2,g.add(Lt),Ul.push(Lt)}return g},vx=()=>{const g=new gt;g.position.set(-850,360,480);const w=new Te(32,16,16),K=new ye({visible:!1});Ro=new D(w,K),Ro.userData={body:Hu},g.add(Ro);const G=new Ue({color:16498468,metalness:.95,roughness:.12}),H=new Ue({color:15680580,roughness:.3}),z=new Ue({color:1096065,roughness:.3}),ge=new D(new Te(12,24,24),G);ge.scale.set(1,1.25,.95),ge.position.y=8,ge.userData={body:Hu},g.add(ge);const de=new D(new Te(9.5,24,24),G);de.position.set(0,22,1),g.add(de);for(let _t=-1;_t<=1;_t+=2){const Rt=new D(new xn(3,5.5,4),G);Rt.position.set(_t*5.5,30,1),Rt.rotation.z=-_t*.3,g.add(Rt);const wn=new D(new xn(1.8,4,4),H);wn.position.set(_t*5.5,29.5,2),wn.rotation.z=-_t*.3,g.add(wn)}const b=new gt;b.position.set(0,22,1);const W=new Ue({color:1120295,roughness:.2,metalness:.3}),X=new Ue({color:16777215,roughness:.25}),te=new Ue({color:16007006,roughness:.4}),_e=new Ue({color:14427686,roughness:.2});for(let _t=-1;_t<=1;_t+=2){const Rt=new D(new Te(2.6,16,16),X);Rt.scale.set(1.15,.85,.6),Rt.position.set(_t*1.8,-1.6,9),Rt.rotation.y=_t*.2,b.add(Rt)}const Me=new D(new Te(1,16,16),_e);Me.scale.set(1.1,.8,.6),Me.position.set(0,-.6,9.8),b.add(Me);for(let _t=-1;_t<=1;_t+=2){const Rt=new D(new kn(1.2,.2,8,16,Math.PI*.85),W);Rt.rotation.x=Math.PI,Rt.rotation.y=_t*.2,Rt.rotation.z=_t*-.15,Rt.position.set(_t*1.1,-2.2,9.5),b.add(Rt)}const He=new D(new Te(.8,12,12),te);He.scale.set(.9,.6,.4),He.position.set(0,-2.6,9.4),b.add(He);for(let _t=-1;_t<=1;_t+=2){const Rt=new gt;Rt.position.set(_t*3.8,1.8,8.8),Rt.rotation.y=_t*.35,Rt.rotation.x=-.1;const wn=new D(new Te(2,16,16),X);wn.scale.set(1.05,.9,.3),Rt.add(wn);const as=new D(new Te(1.4,16,16),W);as.scale.set(.95,1.05,.35),as.position.set(0,0,.25),Rt.add(as);const hi=new D(new Te(.42,8,8),new ye({color:16777215}));hi.position.set(-_t*.4,.45,.6),Rt.add(hi);const Is=new D(new Te(.22,8,8),new ye({color:16777215}));Is.position.set(_t*.4,-.35,.6),Rt.add(Is);const Ls=new D(new kn(2,.24,8,16,Math.PI*.75),W);Ls.rotation.z=_t>0?.35:Math.PI-.35,Ls.position.set(0,.4,.4),Rt.add(Ls),b.add(Rt)}for(let _t=-1;_t<=1;_t+=2){const Rt=new D(new Te(1.6,16,16),te);Rt.scale.set(1.2,.7,.3),Rt.position.set(_t*6,-.6,7.6),Rt.rotation.y=_t*.65,b.add(Rt)}const tt=new Et(.12,.12,6.5,6);for(let _t=-1;_t<=1;_t+=2)[.22,0,-.22].forEach((wn,as)=>{const hi=new D(tt,W);hi.rotation.z=Math.PI/2+_t*wn,hi.rotation.y=_t*.45,hi.position.set(_t*6.5,-.8+(as-1)*1.1,7.8),b.add(hi)});const lt=new D(new Ks(1.2,0),_e);lt.position.set(0,5.2,8.4),lt.rotation.z=Math.PI/4,b.add(lt),g.add(b);const ct=new D(new kn(8,.9,12,32),H);ct.rotation.x=Math.PI/2,ct.position.set(0,15,1),g.add(ct);const Wt=new D(new Te(2,16,16),G);Wt.position.set(0,13.5,8.5),g.add(Wt);const St=new D(new Et(4.5,7,1.5,16,1,!1,0,Math.PI),z);St.rotation.x=-Math.PI/3,St.position.set(0,11,7.5),g.add(St);const Lt=new gt;Lt.position.set(-8.5,10,6.5),Lt.rotation.z=.2;const Mn=new xt(6.5,12,1.6),hn=new D(Mn,G);Lt.add(hn);const oi=new Ue({color:10033947,roughness:.3});for(let _t=0;_t<3;_t++){const Rt=new D(new xt(3.8,1,1.9),oi);Rt.position.set(0,(_t-1)*3.4,0),Lt.add(Rt)}g.add(Lt),gr=new gt,gr.position.set(9.5,14,3);const Sn=new D(new Et(2.4,2.8,10,16),G);Sn.position.set(0,5,0),gr.add(Sn);const Tn=new D(new Te(2.6,16,16),G);Tn.position.set(0,10,0),gr.add(Tn),g.add(gr),Po.length=0;for(let _t=0;_t<6;_t++){const Rt=new D(new Et(1.5,1.5,.4,16),G);g.add(Rt),Po.push(Rt)}return g},bx=()=>{if(!r.value||!a.value)return;const g=r.value.clientWidth,w=r.value.clientHeight;u=new S1,u.background=new $e(132106),h=new gi(50,g/w,.1,5500),h.position.set(0,260,420),d=new qT({canvas:a.value,antialias:!0,powerPreference:"high-performance"}),d.setSize(g,w),d.setPixelRatio(Math.min(window.devicePixelRatio,2)),f=new $T(h,d.domElement),f.enableDamping=!0,f.dampingFactor=.06,f.minDistance=35,f.maxDistance=2600,f.minPolarAngle=.05,f.maxPolarAngle=Math.PI*.88;const K=new q1(16777215,.75);u.add(K);const G=new Y1(16777215,.45);G.position.set(0,300,200),u.add(G);const H=new W1(16774634,5,4500,.35);H.position.set(0,0,0),u.add(H);const z=2e4,ge=new jt,de=new Float32Array(z*3),b=new Float32Array(z*3),W=[new $e(16777215),new $e(14742270),new $e(16707722),new $e(10875900),new $e(14202110),new $e(16020150),new $e(3718648),new $e(16498468),new $e(16281969)];for(let Ie=0;Ie<z;Ie++){const Ht=Math.random()*Math.PI*2,sn=Math.acos(Math.random()*2-1);let fn;Ie<5e3?fn=Math.random()*800+1e3:Ie<13e3?fn=Math.random()*1200+1800:fn=Math.random()*1600+3e3,de[Ie*3]=fn*Math.sin(sn)*Math.cos(Ht),de[Ie*3+1]=fn*Math.sin(sn)*Math.sin(Ht),de[Ie*3+2]=fn*Math.cos(sn);const Un=W[Math.floor(Math.random()*W.length)];b[Ie*3]=Un.r,b[Ie*3+1]=Un.g,b[Ie*3+2]=Un.b}ge.setAttribute("position",new gn(de,3)),ge.setAttribute("color",new gn(b,3));const X=new Ia({size:3.4,map:tp(),vertexColors:!0,transparent:!0,opacity:.98,sizeAttenuation:!0,depthWrite:!1,blending:bt}),te=new Zo(ge,X);u.add(te);const _e=[[-1250,750,-1050],[-1700,320,-1350],[-1450,-580,980],[-980,-720,1350],[1350,820,-950],[1800,380,-1450],[1420,-620,1150],[1750,-260,1600],[-720,1050,-1400],[720,-920,1380],[-1550,120,920],[1550,180,-820],[0,1450,-1100],[0,-1350,1100]],Me=P_();for(const Ie of _e){const Ht=new zc({map:Me,transparent:!0,opacity:.88,blending:bt,depthWrite:!1}),sn=new Id(Ht);sn.position.set(Ie[0],Ie[1],Ie[2]);const fn=Math.random()*40+60;sn.scale.set(fn,fn,1),u.add(sn)}const He=new jt,tt=new Float32Array(Hs*3),lt=new Float32Array(Hs*3),ct=[new $e(61695),new $e(16758531),new $e(16007006),new $e(11032055),new $e(1096065),new $e(16777215),new $e(3718648),new $e(16569165),new $e(15485081)];for(let Ie=0;Ie<Hs;Ie++){let Ht,sn;Ie<2500?(Ht=Math.random()*680+35,sn=(Math.random()-.5)*100):(Ht=Math.random()*1650+680,sn=(Math.random()-.5)*650);const fn=Math.random()*Math.PI*2;tt[Ie*3]=Math.cos(fn)*Ht,tt[Ie*3+1]=sn,tt[Ie*3+2]=Math.sin(fn)*Ht;const Un=ct[Math.floor(Math.random()*ct.length)];lt[Ie*3]=Un.r,lt[Ie*3+1]=Un.g,lt[Ie*3+2]=Un.b,Z[Ie]=Ht,oe[Ie]=fn,Ge[Ie]=sn,Ae[Ie]=(Math.random()*.08+.02)*(Math.random()>.45?1:-1)}He.setAttribute("position",new gn(tt,3)),He.setAttribute("color",new gn(lt,3));const Wt=new Ia({size:4.6,map:Vu(),vertexColors:!0,transparent:!0,opacity:.96,blending:bt,sizeAttenuation:!0,depthWrite:!1});$=new Zo(He,Wt),u.add($);const St=new jt,Lt=9500,Mn=new Float32Array(Lt*3),hn=new Float32Array(Lt*3),oi=[new $e(15485081),new $e(11032055),new $e(61695),new $e(3718648),new $e(16765286),new $e(16777215),new $e(8490232)],Sn=Math.PI*.22,Tn=Math.cos(Sn),_t=Math.sin(Sn);for(let Ie=0;Ie<Lt;Ie++){const Ht=(Math.random()-.5)*5800,sn=(Math.random()-.5)*(Math.random()-.5)*1250,fn=(Math.random()-.5)*(Math.random()-.5)*550,Un=Ht,No=fn,Di=sn,Gl=Un*Tn-Di*_t,zl=No+Math.sin(Ht*.0011)*140,qu=Un*_t+Di*Tn;Mn[Ie*3]=Gl,Mn[Ie*3+1]=zl,Mn[Ie*3+2]=qu;const oa=oi[Math.floor(Math.random()*oi.length)];hn[Ie*3]=oa.r,hn[Ie*3+1]=oa.g,hn[Ie*3+2]=oa.b}St.setAttribute("position",new gn(Mn,3)),St.setAttribute("color",new gn(hn,3));const Rt=new Ia({size:4.2,map:Vu(),vertexColors:!0,transparent:!0,opacity:.92,blending:bt,sizeAttenuation:!0,depthWrite:!1});re=new Zo(St,Rt),u.add(re);const wn=[{c1:"rgba(147, 51, 234, 1)",c2:"rgba(219, 39, 119, 1)",pos:[-1600,650,-1100],scale:2450,opacity:.44},{c1:"rgba(6, 182, 212, 1)",c2:"rgba(59, 130, 246, 1)",pos:[-1950,-150,-1450],scale:2350,opacity:.4},{c1:"rgba(16, 185, 129, 1)",c2:"rgba(15, 118, 110, 1)",pos:[-1450,-620,1100],scale:2450,opacity:.42},{c1:"rgba(245, 158, 11, 1)",c2:"rgba(239, 68, 68, 1)",pos:[-1750,-320,650],scale:2250,opacity:.38},{c1:"rgba(6, 182, 212, 1)",c2:"rgba(56, 189, 248, 1)",pos:[1550,680,-1200],scale:2500,opacity:.44},{c1:"rgba(168, 85, 247, 1)",c2:"rgba(244, 114, 182, 1)",pos:[1950,220,-1550],scale:2380,opacity:.4},{c1:"rgba(244, 63, 94, 1)",c2:"rgba(251, 146, 60, 1)",pos:[1500,-640,1250],scale:2550,opacity:.42},{c1:"rgba(217, 119, 6, 1)",c2:"rgba(180, 83, 9, 1)",pos:[1850,-180,1650],scale:2300,opacity:.4},{c1:"rgba(99, 102, 241, 1)",c2:"rgba(56, 189, 248, 1)",pos:[0,1650,-450],scale:2650,opacity:.38},{c1:"rgba(126, 34, 206, 1)",c2:"rgba(13, 148, 136, 1)",pos:[0,-1550,450],scale:2650,opacity:.38}];for(const Ie of wn){const Ht=new zc({map:R_(Ie.c1,Ie.c2),transparent:!0,opacity:Ie.opacity,blending:bt,depthWrite:!1}),sn=new Id(Ht);sn.position.set(Ie.pos[0],Ie.pos[1],Ie.pos[2]),sn.scale.set(Ie.scale,Ie.scale,1),u.add(sn)}const as=np(700,new L(1250,420,-1150),220,[new $e(61695),new $e(3718648),new $e(16777215),new $e(10875900)]);u.add(as);const hi=np(650,new L(-1300,-380,1e3),200,[new $e(16096779),new $e(16498468),new $e(16707722),new $e(16777215)]);u.add(hi),Fe.length=0;const Is=[61695,16020150,16707722,10875900,14202110,3462041];for(let Ie=0;Ie<6;Ie++){const Ht=new jt,sn=new Float32Array(6);Ht.setAttribute("position",new gn(sn,3));const fn=new gs({color:Is[Ie%Is.length],transparent:!0,opacity:0,blending:bt}),Un=new Hc(Ht,fn);u.add(Un),Fe.push({line:Un,geometry:Ht,active:!1,progress:0,speed:1.4+Math.random()*.9,startPos:new L,dir:new L,length:160+Math.random()*90,cooldown:Math.random()*2.2+Ie*.8,material:fn})}const Ls=new Dr(1.2,1),Io=new Ue({color:9741240,roughness:.88,metalness:.1,flatShading:!0});fe=new D1(Ls,Io,$d),Oe.length=0;const os=new En;for(let Ie=0;Ie<$d;Ie++){const Ht=Math.random()*300+610,sn=Math.random()*Math.PI*2,fn=(Math.random()-.5)*85,Un=(Math.random()*.04+.02)*(Math.random()>.5?1:.9),No=Math.random()*.02+.01,Di=Math.random()*3.6+1.6;os.position.set(Math.cos(sn)*Ht,fn,Math.sin(sn)*Ht),os.scale.set(Di,Di*(.8+Math.random()*.4),Di),os.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,0),os.updateMatrix(),fe.setMatrixAt(Ie,os.matrix),Oe.push({radius:Ht,angle:sn,speed:Un,y:fn,rotSpeed:No,scale:Di})}fe.instanceMatrix.needsUpdate=!0,u.add(fe);const Lo=new Te(6.5,24,24),Wu=new Ue({color:9684477,emissive:3718648,emissiveIntensity:.85,roughness:.3});j=new D(Lo,Wu),j.userData={body:At},u.add(j);const Xu=new Te(10.5,16,16),Cx=new ye({color:3718648,transparent:!0,opacity:.45,side:vn,blending:bt}),Rx=new D(Xu,Cx);j.add(Rx);const Yu=new jt,kl=new Float32Array(Qo*3),Bl=new Float32Array(Qo*3),cp=[new $e(16777215),new $e(10875900),new $e(3718648),new $e(8490232)];for(let Ie=0;Ie<Qo;Ie++){kl[Ie*3]=0,kl[Ie*3+1]=0,kl[Ie*3+2]=0;const Ht=cp[Ie%cp.length];Bl[Ie*3]=Ht.r,Bl[Ie*3+1]=Ht.g,Bl[Ie*3+2]=Ht.b}Yu.setAttribute("position",new gn(kl,3)),Yu.setAttribute("color",new gn(Bl,3));const Px=new Ia({size:4.8,map:Vu(),vertexColors:!0,transparent:!0,opacity:.9,blending:bt,sizeAttenuation:!0,depthWrite:!1});xe=new Zo(Yu,Px),u.add(xe),Ce=D_(),u.add(Ce),B=I_(),u.add(B),De=L_(),u.add(De),qe=N_(),u.add(qe),_=U_(),u.add(_),Ee=F_(),u.add(Ee),Le=O_(),u.add(Le),dt=k_(),u.add(dt),Be=B_(),u.add(Be),Se=G_(),u.add(Se),Ft=z_(),u.add(Ft),Ri=H_(),u.add(Ri),Gi=V_(),u.add(Gi),is=W_(),u.add(is),Ps=X_(),u.add(Ps),zi=Y_(),u.add(zi),se=q_(),u.add(se),Qe=K_(),u.add(Qe),at=$_(),u.add(at),Ot=Z_(),u.add(Ot),cn=j_(),u.add(cn),Dt=J_(),u.add(Dt),ui=Q_(),u.add(ui),Vt=ex(),u.add(Vt),Ja=tx(),u.add(Ja),to=nx(),u.add(to),Xr=ix(),u.add(Xr),qr=sx(),u.add(qr),lo=rx(),u.add(lo),fo=ax(),u.add(fo),Zr=ox(),u.add(Zr),dr=lx(),u.add(dr),hr=hx(),u.add(hr),Qr=fx(),u.add(Qr),fr=px(),u.add(fr),Mo=mx(),u.add(Mo),na=gx(),u.add(na),pr=_x(),u.add(pr),mr=xx(),u.add(mr),sa=vx(),u.add(sa);const Dx=new Te(38,48,48),Ix=new ye({map:Jf()});Q=new D(Dx,Ix),Q.userData={body:Va[0]},u.add(Q);const Lx=C_();Q.add(Lx);const Nx=new Te(42,32,32),Ux=new ye({color:16755200,transparent:!0,opacity:.45,side:vn,blending:bt});le=new D(Nx,Ux),u.add(le),U.length=0;for(const Ie of Va){if(Ie.orbitRadius===0)continue;const Ht=new $e(Ie.color),sn=1.3,fn=new On(Ie.orbitRadius-sn*.5,Ie.orbitRadius+sn*.5,128),Un=new ye({color:9741240,side:Nt,transparent:!0,opacity:.35,blending:bt}),No=new ye({color:Ht,side:Nt,transparent:!0,opacity:.95,blending:bt}),Di=new D(fn,Un);Di.rotation.x=Math.PI/2,u.add(Di);const Gl=128,zl=[];for(let vr=0;vr<=Gl;vr++){const ca=vr/Gl*Math.PI*2;zl.push(new L(Math.cos(ca)*Ie.orbitRadius,0,Math.sin(ca)*Ie.orbitRadius))}const qu=new jt().setFromPoints(zl),oa=new gs({color:10530496,transparent:!0,opacity:.55}),Fx=new gs({color:Ht,transparent:!0,opacity:1}),up=new Hc(qu,oa);u.add(up);let _r;Ie.planetCategory==="gas-giant"?_r=Qf(Ie.color,Ie.accentColor,"#fef08a"):Ie.planetCategory==="terrestrial"?_r=ep(Ie.accentColor,Ie.color):Ie.planetCategory==="cyber"?_r=w_():Ie.planetCategory==="ice"?_r=E_(Ie.color,Ie.accentColor):Ie.planetCategory==="desert"?_r=T_(Ie.color,Ie.accentColor):_r=Qf(Ie.color,Ie.accentColor,"#ffffff");const la=Ie.baseRadius*1.35,Ox=new Te(la,36,36),kx=new Ue({map:_r,roughness:.5,metalness:.12,emissive:Ht,emissiveIntensity:.26}),xr=new D(Ox,kx);xr.userData={body:Ie},u.add(xr);const Bx=new Te(la*1.14,28,28),Gx=new ye({color:Ht,transparent:!0,opacity:.26,side:vn,blending:bt}),zx=new D(Bx,Gx);xr.add(zx),xr.rotation.z=.28;let Hl;if(Ie.hasRings){const vr=new On(la*1.35,la*2.35,64),ca=new Ue({map:A_(Ie.ringsColor||Ie.color),side:Nt,transparent:!0,opacity:.88,roughness:.7,emissive:new $e(Ie.ringsColor||Ie.color),emissiveIntensity:.2});Hl=new D(vr,ca),Hl.rotation.x=Math.PI/2,xr.add(Hl)}const dp=[];if(Ie.type==="skills"){const vr=new Te(2.8,16,16),ca=new ye({color:61695});for(let hp=0;hp<3;hp++){const fp=new D(vr,ca);u.add(fp),dp.push(fp)}}const Hx=new On(la*1.3,la*1.45,36),Vx=new ye({color:Ht,side:Nt,transparent:!0,opacity:0}),Ku=new D(Hx,Vx);Ku.rotation.x=Math.PI/2,xr.add(Ku),U.push({body:Ie,mesh:xr,orbitLine:up,orbitGlowRing:Di,orbitMaterialNormal:oa,orbitMaterialActive:Fx,orbitGlowNormal:Un,orbitGlowActive:No,orbitRadius:Ie.orbitRadius,orbitSpeed:Ie.orbitSpeed,initialAngle:Ie.initialAngle,axialSpinSpeed:.5+Math.random()*.5,ringsMesh:Hl,moons:dp,selectionRing:Ku})}x=new Z1,S=new ut(-1e3,-1e3)},ip=g=>{var de;p===0&&(p=g);const w=Math.min((g-p)/1e3,.1);if(p=g,R&&(y+=w),Q&&le){Q.rotation.y+=.003;const b=1+Math.sin(y*2.5)*.04;le.scale.set(b,b,b)}if($){const b=$.geometry.attributes.position.array;for(let W=0;W<Hs;W++){oe[W]+=Ae[W]*w*.5;const X=Z[W],te=oe[W];b[W*3]=Math.cos(te)*X,b[W*3+1]=Ge[W]+Math.sin(y*1.4+W)*6,b[W*3+2]=Math.sin(te)*X}$.geometry.attributes.position.needsUpdate=!0}for(const b of Fe)if(b.active){b.progress+=b.speed*w;const X=b.progress*950,te=Math.max(0,X-b.length),_e=b.startPos.clone().addScaledVector(b.dir,X),Me=b.startPos.clone().addScaledVector(b.dir,te),He=b.geometry.attributes.position.array;He[0]=Me.x,He[1]=Me.y,He[2]=Me.z,He[3]=_e.x,He[4]=_e.y,He[5]=_e.z,b.geometry.attributes.position.needsUpdate=!0,b.progress<.25?b.material.opacity=b.progress/.25:b.progress>.7?b.material.opacity=(1-b.progress)/.3:b.material.opacity=.95,b.progress>=1&&(b.active=!1,b.material.opacity=0,b.cooldown=Math.random()*4+1.5)}else if(b.cooldown-=w,b.cooldown<=0){b.active=!0,b.progress=0,b.speed=1.3+Math.random()*.9,b.length=160+Math.random()*100;const W=Math.random()*Math.PI*2,X=Math.random()*Math.PI*.35+.1,te=900+Math.random()*450;b.startPos.set(te*Math.sin(X)*Math.cos(W),Math.random()*350+250,te*Math.cos(X)),b.dir.set((Math.random()-.5)*1.6,-(Math.random()*.8+.4),(Math.random()-.5)*1.6).normalize()}if(fe){const b=new En;for(let W=0;W<$d;W++){const X=Oe[W];X.angle+=X.speed*w*.2*i.orbitSpeedMultiplier,b.position.set(Math.cos(X.angle)*X.radius,X.y+Math.sin(y*.5+W)*3,Math.sin(X.angle)*X.radius),b.scale.set(X.scale,X.scale,X.scale),b.rotation.y+=X.rotSpeed,b.updateMatrix(),fe.setMatrixAt(W,b.matrix)}fe.instanceMatrix.needsUpdate=!0}if(j&&xe){const b=y*.12*i.orbitSpeedMultiplier+.8,W=Math.cos(b)*720,X=Math.sin(b)*540,te=Math.sin(b*1.5)*95;j.position.set(W,te,X),j.rotation.y+=w*.8,pt.unshift(new L(W,te,X)),pt.length>Qo&&pt.pop();const _e=xe.geometry.attributes.position.array;for(let Me=0;Me<pt.length;Me++){const He=pt[Me],tt=Me/Qo*10;_e[Me*3]=He.x+(Math.random()-.5)*tt,_e[Me*3+1]=He.y+(Math.random()-.5)*tt,_e[Me*3+2]=He.z+(Math.random()-.5)*tt}xe.geometry.attributes.position.needsUpdate=!0}for(const b of U){const W=b.initialAngle+y*b.orbitSpeed*.32*i.orbitSpeedMultiplier,X=Math.cos(W)*b.orbitRadius,te=Math.sin(W)*b.orbitRadius;if(b.mesh.position.set(X,0,te),b.mesh.rotation.y+=b.axialSpinSpeed*w,b.moons&&b.moons.length>0)for(let Me=0;Me<b.moons.length;Me++){const He=y*1.8+Me*(Math.PI*2)/b.moons.length,tt=b.body.baseRadius*1.35*1.9;b.moons[Me].position.set(X+Math.cos(He)*tt,Math.sin(He*.8)*4,te+Math.sin(He)*tt)}const _e=i.selectedBodyId===b.body.id||((de=o.value)==null?void 0:de.id)===b.body.id;b.orbitLine.material=_e?b.orbitMaterialActive:b.orbitMaterialNormal,b.orbitGlowRing.material=_e?b.orbitGlowActive:b.orbitGlowNormal,b.selectionRing&&(b.selectionRing.material.opacity=_e?.95:0,_e&&(b.selectionRing.rotation.z+=.02))}if(Ce){const b=O.initialAngle+y*O.orbitSpeed*.28*i.orbitSpeedMultiplier,W=Math.cos(b)*O.orbitRadius,X=Math.sin(b)*O.orbitRadius,te=45+Math.sin(y*2.2)*6;Ce.position.set(W,te,X),Ce.rotation.y+=w*.5,Ce.rotation.z=Math.sin(y*1.6)*.12,Ce.rotation.x=Math.cos(y*1.4)*.08,mt&&(mt.rotation.y+=w*3.5),ht&&(ht.material.opacity=.16+Math.sin(y*3.5)*.07)}if(B){const b=pe.initialAngle+y*pe.orbitSpeed*.25*i.orbitSpeedMultiplier,W=Math.cos(b)*pe.orbitRadius,X=Math.sin(b)*pe.orbitRadius;B.position.set(W,-28,X),B.rotation.y+=w*.08,he&&(he.rotation.z+=w*.6);const te=Math.sin(y*4.5)>.2;for(const _e of ue)_e.opacity=te?1:.2}if(De){const b=ve.initialAngle+y*ve.orbitSpeed*.3*i.orbitSpeedMultiplier,W=Math.cos(b)*ve.orbitRadius,X=Math.sin(b)*ve.orbitRadius;De.position.set(W,62+Math.sin(y*.8)*8,X),De.rotation.y=-b+Math.PI/2,De.rotation.z=Math.sin(y*1.2)*.05;for(let te=0;te<Re.length;te++){const _e=1+Math.sin(y*10+te)*.18;Re[te].scale.set(1,_e,1)}}if(qe&&(je&&(je.rotation.z+=w*.22),We&&(We.rotation.z-=w*.12)),_&&(_.rotation.y+=w*4.2,_.rotation.x=Math.sin(y*1.5)*.15,J)){const b=1+Math.sin(y*12)*.12;J.scale.set(b,1,b)}if(Ee){const b=me.initialAngle+y*me.orbitSpeed*.32*i.orbitSpeedMultiplier,W=Math.cos(b)*me.orbitRadius,X=Math.sin(b)*me.orbitRadius;Ee.position.set(W,-42+Math.sin(y*1.1)*4,X),Ee.rotation.y+=w*.15,Ee.rotation.x=Math.sin(y*.9)*.08,ce&&(ce.opacity=.3+Math.abs(Math.sin(y*3.8))*.7)}if(Le){const b=rt.initialAngle+y*rt.orbitSpeed*.28*i.orbitSpeedMultiplier,W=Math.cos(b)*rt.orbitRadius,X=Math.sin(b)*rt.orbitRadius;if(Le.position.set(W,75+Math.sin(y*.7)*8,X),ze&&(ze.rotation.y+=w*.4),ke){const te=y*1.8;ke.position.set(Math.cos(te)*32,Math.sin(te*.6)*6,Math.sin(te)*32)}}if(dt){const b=Y.initialAngle+y*Y.orbitSpeed*.3*i.orbitSpeedMultiplier,W=Math.cos(b)*Y.orbitRadius,X=Math.sin(b)*Y.orbitRadius;dt.position.set(W,-55+Math.sin(y*.9)*5,X),dt.rotation.y=-b}if(Be)for(let b=0;b<Ve.length;b++)Ve[b].rotation.z+=w*(.04+b*.02)*(b%2===0?1:-1);if(Se){const b=qt.initialAngle+y*qt.orbitSpeed*.2*i.orbitSpeedMultiplier,W=Math.cos(b)*qt.orbitRadius,X=Math.sin(b)*qt.orbitRadius;if(Se.position.set(W,320+Math.sin(y*.5)*12,X),Se.rotation.y=-b+Math.PI/2,it){const te=1+Math.sin(y*5)*.15;it.scale.set(te,te,te)}}if(Ft){const b=ns.initialAngle+y*ns.orbitSpeed*.3*i.orbitSpeedMultiplier,W=Math.cos(b)*ns.orbitRadius,X=Math.sin(b)*ns.orbitRadius;Ft.position.set(W,90+Math.sin(y*1.3)*6,X),Ft.rotation.y+=w*.3,Ft.rotation.x=Math.sin(y*.8)*.08,jn&&(jn.opacity=.35+Math.sin(y*6)*.2)}if(Ri){const b=Pi.initialAngle+y*Pi.orbitSpeed*.35*i.orbitSpeedMultiplier,W=Math.cos(b)*Pi.orbitRadius,X=Math.sin(b)*Pi.orbitRadius;Ri.position.set(W,-65+Math.sin(y*1.5)*10,X),Ri.rotation.x+=w*1.2,Ri.rotation.y+=w*.8,Ri.rotation.z+=w*.5}if(Gi){const b=Jn.initialAngle+y*Jn.orbitSpeed*.32*i.orbitSpeedMultiplier,W=Math.cos(b)*Jn.orbitRadius,X=Math.sin(b)*Jn.orbitRadius;Gi.position.set(W,35+Math.sin(y*1.2)*5,X),Gi.rotation.y=-b+Math.PI/4,Gi.rotation.z=Math.sin(y*1.6)*.1}if(is){const b=y*.6;if(yi&&(yi.position.set(Math.cos(b)*22,0,Math.sin(b)*22),yi.rotation.y+=w*.5),ri&&(ri.position.set(-Math.cos(b)*30,0,-Math.sin(b)*30),ri.rotation.y+=w*1.2),cr&&yi&&ri){const W=[yi.position.clone(),new L(0,Math.sin(b*2)*4,0),ri.position.clone()];cr.geometry.setFromPoints(W)}}if(Ps)for(let b=0;b<Wr.length;b++)Wr[b].rotation.z+=w*(.35+b*.15)*(b%2===0?1:-1);if(zi){const b=q.initialAngle+y*q.orbitSpeed*.45*i.orbitSpeedMultiplier,W=Math.cos(b)*q.orbitRadius,X=Math.sin(b)*q.orbitRadius;zi.position.set(W,40+Math.sin(y*2.2)*6,X),zi.rotation.y=-b+Math.PI/2,zi.rotation.z=Math.sin(y*2.8)*.22;for(let te=0;te<E.length;te++){const _e=1+Math.sin(y*18+te)*.28;E[te].scale.set(1,_e,1)}}if(se){const b=Xe.initialAngle+y*Xe.orbitSpeed*.3*i.orbitSpeedMultiplier,W=Math.cos(b)*Xe.orbitRadius,X=Math.sin(b)*Xe.orbitRadius;if(se.position.set(W,-45+Math.sin(y*1.2)*6,X),se.rotation.y+=w*.45,se.rotation.x+=w*.25,ie){const te=1+Math.sin(y*4)*.2;ie.scale.set(te,te,te)}}if(Qe){const b=nt.initialAngle+y*nt.orbitSpeed*.28*i.orbitSpeedMultiplier,W=Math.cos(b)*nt.orbitRadius,X=Math.sin(b)*nt.orbitRadius;Qe.position.set(W,50+Math.sin(y*.9)*4,X),Qe.rotation.y+=w*.12}if(Tt&&(Tt.rotation.y+=w*.2),Ot){Ot.rotation.z+=w*.3;for(let b=0;b<Qt.length;b++)Qt[b].rotation.x+=w*(2.2+b*.8),Qt[b].rotation.y+=w*(1.6+b*.5)}if(cn){const b=yn.initialAngle+y*yn.orbitSpeed*.34*i.orbitSpeedMultiplier,W=Math.cos(b)*yn.orbitRadius,X=Math.sin(b)*yn.orbitRadius;cn.position.set(W,-30+Math.sin(y*1.5)*5,X),cn.rotation.y=-b+Math.PI/2,cn.rotation.z=Math.sin(y*1.8)*.12}if(Dt){const b=Wn.initialAngle+y*Wn.orbitSpeed*.25*i.orbitSpeedMultiplier,W=Math.cos(b)*Wn.orbitRadius,X=Math.sin(b)*Wn.orbitRadius;Dt.position.set(W,-15+Math.sin(y*.8)*4,X),Dt.rotation.y+=w*.18,Dt.rotation.z=Math.sin(y*.6)*.08,Qn&&(Qn.opacity=Math.sin(y*5.5)>0?1:.15)}if(ui&&(ui.rotation.y+=w*.15,rn)){const b=.85+Math.sin(y*4.2)*.25;rn.color.setRGB(1,.95*b,.8*b)}if(Vt){di&&(di.rotation.y+=w*.25,di.rotation.x+=w*.12);for(let b=0;b<rs.length;b++){const W=y*(.6+b*.2)+b*(Math.PI/2),X=34+b*3;rs[b].position.set(Math.cos(W)*X,Math.sin(y*2+b)*4,Math.sin(W)*X),rs[b].rotation.x+=w*1.5,rs[b].rotation.y+=w*2}}if(Ja){for(let b=0;b<eo.length;b++)eo[b].rotation.z+=w*(.45+b*.25)*(b%2===0?1:-1),eo[b].rotation.x+=w*.15;Tl&&(Tl.rotation.z-=w*1.8)}if(to){io&&(io.rotation.y+=w*.18);for(let b=0;b<Al.length;b++){const W=y*(.35+b*.15)+b*Math.PI,X=48+b*10;Al[b].position.set(Math.cos(W)*X,Math.sin(W*.2)*1.5,Math.sin(W)*X)}}if(Xr){Xr.rotation.y+=w*.08;for(let b=0;b<ro.length;b++)ro[b].rotation.x=Math.sin(y*1.6+b*.3)*.14;if(Yr){const b=1+Math.sin(y*3.8)*.22;Yr.scale.set(b,b,b)}}if(qr&&(qr.rotation.y+=w*.05,oo&&(oo.rotation.y+=w*.12)),lo){ho&&(ho.rotation.z+=w*.65);for(let b=0;b<uo.length;b++){const W=1+Math.sin(y*14+b)*.16;uo[b].scale.set(W,1,W)}}if(fo&&(Kr&&(Kr.rotation.x+=w*.32,Kr.rotation.y+=w*.42),$r)){$r.rotation.x-=w*.48,$r.rotation.z+=w*.38;const b=1+Math.sin(y*2.8)*.22;$r.scale.set(b,b,b)}if(Zr){Zr.rotation.y+=w*.06;for(let b=0;b<go.length;b++)go[b].rotation.x+=w*(1.6+b*.5),go[b].rotation.y+=w*(1.1+b*.3);if(Rl){const b=1+Math.sin(y*6)*.08;Rl.scale.set(b,b,b)}}if(dr){dr.rotation.y+=w*.15,dr.rotation.z+=w*.08;for(let b=0;b<jr.length;b++){const W=y*(.45+b*.1)+b*(Math.PI/5),X=28+b*1.4;jr[b].position.set(Math.cos(W)*X,Math.sin(y*1.8+b)*5,Math.sin(W)*X),jr[b].rotation.x+=w*1.8,jr[b].rotation.y+=w*2.2}}if(hr){hr.rotation.y+=w*.25,hr.position.y=320+Math.sin(y*1.5)*6;for(let b=0;b<Jr.length;b++){const W=y*.8+b*Math.PI*2/6;Jr[b].position.set(Math.cos(W)*26,Math.sin(y*2+b)*4,Math.sin(W)*26),Jr[b].rotation.x+=w*1.5,Jr[b].rotation.y+=w*2}}if(Qr){Qr.rotation.z=Math.sin(y*2)*.08;for(let b=0;b<bo.length;b++)bo[b].rotation.x+=w*8;if(ea){const b=1+Math.sin(y*16)*.25;ea.scale.set(b,1+Math.cos(y*18)*.3,b)}}if(fr&&(fr.rotation.y+=w*.15,fr.rotation.x=Math.sin(y*.8)*.12,ta)){const b=y*.6;ta.position.set(Math.cos(b)*20,Math.sin(y*1.2)*5,Math.sin(b)*16),ta.rotation.y+=w*.8}if(Mo){wo&&(wo.rotation.y+=w*.12);for(let b=0;b<Il.length;b++){const W=y*(.4+b*.2)+b*Math.PI;Il[b].position.set(Math.cos(W)*(56+b*14),0,Math.sin(W)*(56+b*14))}}if(na&&(na.rotation.y+=w*.05,ia&&(ia.rotation.y+=w*.4),To&&(To.visible=Math.sin(y*5)>0)),pr){pr.rotation.y+=w*.12,pr.position.y=240+Math.sin(y*1.6)*5;for(let b=0;b<Ll.length;b++)Ll[b].position.y=9+b*1.5+Math.sin(y*3+b*.8)*2;for(let b=0;b<Nl.length;b++)Nl[b].rotation.z+=w*(.4+b*.2)}if(mr){mr.rotation.y+=w*.18,mr.rotation.z=Math.sin(y*1.4)*.15;for(let b=0;b<Ul.length;b++){const W=1+(y*2+b*.8)%2.5;Ul[b].scale.set(W,W,1)}}if(sa){sa.rotation.y+=w*.08,gr&&(gr.rotation.z=Math.sin(y*5)*.32);for(let b=0;b<Po.length;b++){const W=y*.9+b*Math.PI*2/6;Po[b].position.set(Math.cos(W)*26,Math.sin(y*2.2+b)*4,Math.sin(W)*26),Po[b].rotation.y+=w*2.5}}re&&(re.rotation.y+=w*.012);const K=r.value?r.value.clientWidth:window.innerWidth,G=r.value?r.value.clientHeight:window.innerHeight,H=K<768;let z=0,ge=0;if(i.isPanelOpen&&I&&(H?ge=G*.28:z=Math.min(540,K*.34)*.5),F+=(z-F)*.08,k+=(ge-k)*.08,Math.abs(F)>.4||Math.abs(k)>.4?h.setViewOffset(K,G,F,k,K,G):h.view&&h.view.enabled&&h.clearViewOffset(),I){const b=sp(I);if(b){if(T){const W=b.clone().add(v);h.position.lerp(W,.065),f.target.lerp(b,.065),h.position.distanceTo(W)<2.5&&f.target.distanceTo(b)<2&&(T=!1)}else{const W=b.clone().sub(A);f.target.add(W),h.position.add(W)}A.copy(b)}}else T&&(h.position.lerp(M,.055),f.target.lerp(P,.055),h.position.distanceTo(M)<1&&f.target.distanceTo(P)<1&&(T=!1));f.update(),d.render(u,h),m=requestAnimationFrame(ip)},sp=(g,w=new L)=>{if(g==="sun"||!g)return w.set(0,0,0);const K=U.find(G=>G.body.id===g);return K?w.copy(K.mesh.position):g===At.id&&j?w.copy(j.position):g===O.id&&Ce?w.copy(Ce.position):g===pe.id&&B?w.copy(B.position):g===ve.id&&De?w.copy(De.position):g===C.id&&qe?w.copy(qe.position):g===ae.id&&_?w.copy(_.position):g===me.id&&Ee?w.copy(Ee.position):g===rt.id&&Le?w.copy(Le.position):g===Y.id&&dt?w.copy(dt.position):g===Ke.id&&Be?w.copy(Be.position):g===qt.id&&Se?w.copy(Se.position):g===ns.id&&Ft?w.copy(Ft.position):g===Pi.id&&Ri?w.copy(Ri.position):g===Jn.id&&Gi?w.copy(Gi.position):g===ss.id&&is?w.copy(is.position):g===ja.id&&Ps?w.copy(Ps.position):g===q.id&&zi?w.copy(zi.position):g===Xe.id&&se?w.copy(se.position):g===nt.id&&Qe?w.copy(Qe.position):g===ot.id&&at?w.copy(at.position):g===Xt.id&&Ot?w.copy(Ot.position):g===yn.id&&cn?w.copy(cn.position):g===Wn.id&&Dt?w.copy(Dt.position):g===Mi.id&&ui?w.copy(ui.position):g===Ru.id&&Vt?w.copy(Vt.position):g===Zf.id&&Ja?w.copy(Ja.position):g===Pu.id&&to?w.copy(to.position):g===Cl.id&&Xr?w.copy(Xr.position):g===Du.id&&qr?w.copy(qr.position):g===Iu.id&&lo?w.copy(lo.position):g===Lu.id&&fo?w.copy(fo.position):g===Nu.id&&Zr?w.copy(Zr.position):g===Uu.id&&dr?w.copy(dr.position):g===Fu.id&&hr?w.copy(hr.position):g===Ou.id&&Qr?w.copy(Qr.position):g===Dl.id&&fr?w.copy(fr.position):g===ku.id&&Mo?w.copy(Mo.position):g===Bu.id&&na?w.copy(na.position):g===Gu.id&&pr?w.copy(pr.position):g===zu.id&&mr?w.copy(mr.position):g===Hu.id&&sa?w.copy(sa.position):null},yx=g=>{const K=window.innerWidth<768?2.35:1,G=U.find(z=>z.body.id===g);if(G){const z=G.body.baseRadius*1.35;return new L(z*5.8,z*3.4,z*6.2).multiplyScalar(K)}let H;switch(g){case"comet-halley":H=new L(120,60,130);break;case"ufo-alpha":H=new L(145,75,150);break;case"station-aegis":H=new L(200,100,200);break;case"ship-hermes":H=new L(175,90,175);break;case"black-hole-gargantua":H=new L(320,150,340);break;case"pulsar-0950":H=new L(250,120,260);break;case"satellite-chronos":H=new L(135,70,140);break;case"exoplanet-kepler":H=new L(200,95,210);break;case"observatory-jwst":H=new L(150,75,155);break;case"nebula-helix":H=new L(330,150,350);break;case"mothership-titan":H=new L(300,135,310);break;case"monolith-prime":H=new L(135,70,140);break;case"asteroid-oumuamua":H=new L(125,65,130);break;case"probe-lightsail":H=new L(140,75,145);break;case"binary-sirius":H=new L(310,140,330);break;case"wormhole-artemis":H=new L(290,130,300);break;case"ship-valkyrie":H=new L(130,65,135);break;case"crystal-astraea":H=new L(140,75,150);break;case"station-bifrost":H=new L(200,100,210);break;case"planet-pyro":H=new L(230,110,240);break;case"magnetar-sgr":H=new L(230,110,240);break;case"drones-sentinel":H=new L(145,75,155);break;case"asteroid-psyche":H=new L(170,85,180);break;case"dyson-hyperion":H=new L(260,120,270);break;case"exoplanet-glacio":H=new L(220,105,230);break;case"rift-chronos":H=new L(250,120,260);break;case"exoplanet-zephyrus":H=new L(280,130,290);break;case"leviathan-void":H=new L(280,130,290);break;case"ringworld-elysium":H=new L(320,150,330);break;case"protostar-phoenix":H=new L(270,120,280);break;case"artifact-tesseract":H=new L(220,105,230);break;case"foundry-vulcan":H=new L(260,120,270);break;case"crystal-geode":H=new L(240,115,250);break;case"artifact-crown":H=new L(180,90,190);break;case"vessel-beat":H=new L(190,95,200);break;case"artifact-laptop":H=new L(180,85,190);break;case"planet-neptunia":H=new L(260,120,270);break;case"probe-voyager":H=new L(200,100,210);break;case"artifact-coffee":H=new L(140,70,150);break;case"artifact-guitar":H=new L(190,95,200);break;case"artifact-neko":H=new L(200,100,210);break;default:H=new L(160,80,165);break}return H.multiplyScalar(K)},rp=g=>{if(!g||g==="sun"){I=null,M.set(0,260,420),P.set(0,0,0),T=!0;return}const w=sp(g);w&&(I=g,v.copy(yx(g)),A.copy(w),P.copy(w),M.copy(w).add(v),T=!0)};e({resetView:()=>{I=null,M.set(0,260,420),P.set(0,0,0),T=!0},focusOnBody:rp,zoomIn:()=>{const g=new L;h.getWorldDirection(g),h.position.addScaledVector(g,60)},zoomOut:()=>{const g=new L;h.getWorldDirection(g),h.position.addScaledVector(g,-60)}});const ap=(g,w)=>{if(!r.value)return null;const K=r.value.getBoundingClientRect(),G=(g-K.left)/K.width*2-1,H=-((w-K.top)/K.height)*2+1;S.set(G,H),x.setFromCamera(S,h);const z=[];Q&&z.push(Q),j&&z.push(j),ft&&z.push(ft),ne&&z.push(ne),Pe&&z.push(Pe),N&&z.push(N),V&&z.push(V),Ne&&z.push(Ne),Je&&z.push(Je),yt&&z.push(yt),be&&z.push(be),st&&z.push(st),Vn&&z.push(Vn),As&&z.push(As),Cs&&z.push(Cs),Rs&&z.push(Rs),Ds&&z.push(Ds),ur&&z.push(ur),ee&&z.push(ee),Ye&&z.push(Ye),Mt&&z.push(Mt),nn&&z.push(nn),et&&z.push(et),Nn&&z.push(Nn),zt&&z.push(zt),ai&&z.push(ai),Qa&&z.push(Qa),no&&z.push(no),so&&z.push(so),ao&&z.push(ao),co&&z.push(co),po&&z.push(po),mo&&z.push(mo),_o&&z.push(_o),xo&&z.push(xo),vo&&z.push(vo),yo&&z.push(yo),So&&z.push(So),Eo&&z.push(Eo),Ao&&z.push(Ao),Co&&z.push(Co),Ro&&z.push(Ro);for(const de of U)z.push(de.mesh);const ge=x.intersectObjects(z,!1);return ge.length>0&&ge[0].object.userData.body||null},Mx=g=>{const w=Date.now();w-Ol<350||(Ol=w,s("select",g))},Sx=()=>{const g=Date.now();g-Ol<250||(Ol=g,o.value=null,s("select",null),s("unselect"))},wx=g=>{Fl=!0,Do={x:g.clientX,y:g.clientY},jf=Date.now(),l.value=!1},Ex=g=>{var w;if(c.value={x:g.clientX,y:g.clientY},Fl)Math.hypot(g.clientX-Do.x,g.clientY-Do.y)>6&&(l.value=!0,o.value=null);else{l.value=!1;const K=ap(g.clientX,g.clientY);((w=o.value)==null?void 0:w.id)!==(K==null?void 0:K.id)&&(o.value=K,s("hover",K))}},Tx=g=>{const w=Math.hypot(g.clientX-Do.x,g.clientY-Do.y),K=Date.now()-jf;if(w<10&&K<550){const G=ap(g.clientX,g.clientY);G?Mx(G):Sx()}Fl=!1,l.value=!1},Ax=()=>{Fl=!1,o.value=null,l.value=!1,s("hover",null)},op=()=>{if(!r.value||!d||!h)return;const g=r.value.clientWidth,w=r.value.clientHeight;h.aspect=g/w,Math.abs(F)>.4||Math.abs(k)>.4?h.setViewOffset(g,w,F,k,g,w):h.updateProjectionMatrix(),d.setSize(g,w)},lp=()=>{R=!document.hidden};return bu(()=>{bx(),window.addEventListener("resize",op),document.addEventListener("visibilitychange",lp),m=requestAnimationFrame(ip)}),yu(()=>{m&&cancelAnimationFrame(m),window.removeEventListener("resize",op),document.removeEventListener("visibilitychange",lp),f==null||f.dispose(),d==null||d.dispose()}),Rc(()=>i.selectedBodyId,g=>{g&&rp(g)}),(g,w)=>(an(),pn("div",{ref_key:"containerRef",ref:r,class:Wa(["relative w-full h-full overflow-hidden select-none bg-[#02040a] touch-none",[l.value?"cursor-grabbing":o.value?"!cursor-pointer":"cursor-grab"]]),onPointerdown:wx,onPointermove:Ex,onPointerup:Tx,onPointerleave:Ax},[we("canvas",{ref_key:"canvasRef",ref:a,class:Wa(["block w-full h-full touch-none",o.value?"!cursor-pointer":""])},null,2),kt(Pg,{name:"fade"},{default:_u(()=>[o.value?(an(),pn("div",{key:0,class:"pointer-events-none fixed z-40 transform -translate-x-1/2 -translate-y-full px-3.5 py-2 rounded-xl backdrop-blur-md border shadow-2xl transition-all duration-75 bg-[#020614]/90 text-white",style:Or({left:`${c.value.x}px`,top:`${c.value.y-14}px`,borderColor:o.value.color,boxShadow:`0 0 24px ${o.value.color}40`})},[we("div",_A,[we("span",{class:"inline-block w-2.5 h-2.5 rounded-full animate-pulse",style:Or({backgroundColor:o.value.color,boxShadow:`0 0 10px ${o.value.color}`})},null,4),we("span",xA,un(o.value.name),1),we("span",vA,un(o.value.codeName),1)]),we("div",bA,un(o.value.tagline),1)],4)):Dc("",!0)]),_:1})],34))}}),MA=(n,e)=>{const t=n.__vccOpts||n;for(const[i,s]of e)t[i]=s;return t},SA=MA(yA,[["__scopeId","data-v-acab8c93"]]),wA=(n,e)=>{const t=n.__vccOpts||n;for(const[i,s]of e)t[i]=s;return t};async function Pa(n){return new Promise(e=>setTimeout(e,n))}const EA=zr({name:"AutoTyperVue",emits:["finished"],props:{componentTag:{type:String,default:"span",validator(n){return/^(span)|(h\d)|(p)|(a)$/.test(n)}},beginningWord:{type:String,default:""},writtenBeginningWord:{type:String,default:""},text:{type:[String,Array],required:!0,validator(n){return typeof n=="string"?n.length>0:n.every(e=>typeof e=="string"&&e.length>0)}},startDelay:{type:Number,default:500,validator(n){return n>=0}},betweenWordDelay:{type:Number,default:500,validator(n){return n>=0}},typingDelay:{type:Number,default:150,validator(n){return n>=0}},deletingDelay:{type:Number,default:100,validator(n){return n>=0}},waitBeforeDeleteDelay:{type:Number,default:500,validator(n){return n>=0}},startByDefault:{type:Boolean,default:!0},repeat:{type:Boolean,default:!0},removeAfterRepeat:{type:Boolean,default:!1}},data(){return{currentText:"",typedBeginningWord:"",textFeed:[]}},mounted(){this.startByDefault&&this.begin()},methods:{async begin(){typeof this.text=="string"?this.textFeed=[this.text]:this.textFeed=[...this.text],await Pa(this.startDelay),await this.writeBeginningWord(),this.autoType()},async writeBeginningWord(){if(this.writtenBeginningWord.length)for(let n of[...this.writtenBeginningWord])this.typedBeginningWord+=n,await Pa(this.typingDelay)},async autoType(){for(let n of this.textFeed){if(await this.writeWord(n),await Pa(this.waitBeforeDeleteDelay),!this.repeat&&!this.removeAfterRepeat&&this.textFeed.indexOf(n)===this.textFeed.length-1)break;await this.removeWord(n),await Pa(this.betweenWordDelay)}this.repeat?this.autoType():this.$emit("finished")},async writeWord(n){for(let e of[...n])this.currentText+=e,await Pa(this.typingDelay)},async removeWord(n){for(let e=0;e<n.length;e++)this.currentText=this.currentText.slice(0,-1),await Pa(this.deletingDelay)}}});function TA(n,e,t,i,s,r){return an(),yf(Zv(n.componentTag),{class:"auto-typer-vue blink"},{default:_u(()=>[Xs(un(n.beginningWord)+un(n.typedBeginningWord)+un(n.currentText),1)]),_:1})}const AA=wA(EA,[["render",TA]]),CA={key:0,class:"pointer-events-none fixed inset-0 z-50 flex flex-col justify-end md:justify-stretch md:items-end"},RA={class:"text-[9px] font-mono tracking-widest text-neutral-400 mt-1 uppercase"},PA={class:"px-4 py-2.5 md:px-6 md:py-3.5 border-b border-white/10 flex flex-col gap-1.5 shrink-0 bg-white/[0.02] select-none"},DA={class:"flex items-center justify-between gap-2"},IA={class:"text-[9px] md:text-[10px] font-mono tracking-widest uppercase text-cyan-400/90 flex items-center gap-1.5 min-w-0 truncate"},LA={class:"truncate"},NA={class:"flex items-center gap-1.5 md:gap-2 shrink-0"},UA=["title"],FA={class:"flex items-center gap-2.5 min-w-0 pt-0.5"},OA={class:"text-base md:text-2xl font-black text-white leading-tight tracking-tight break-words"},kA={key:0,class:"space-y-6"},BA={class:"flex flex-col sm:flex-row items-center gap-6"},GA={class:"text-center sm:text-left space-y-2"},zA={class:"text-sm md:text-base font-bold text-neutral-300"},HA={class:"flex flex-wrap gap-2.5"},VA=["href"],WA={class:"p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between"},XA={class:"flex items-center gap-3"},YA={key:1,class:"space-y-6"},qA={class:"text-neutral-300 leading-relaxed text-sm md:text-base"},KA={class:"grid grid-cols-2 gap-2.5"},$A={class:"text-neutral-200"},ZA={class:"grid grid-cols-2 gap-2.5"},jA={class:"text-neutral-200"},JA={key:2,class:"space-y-6"},QA={class:"relative group overflow-hidden rounded-2xl border border-white/10 shadow-lg"},eC=["src","alt"],tC={class:"text-neutral-300 leading-relaxed text-sm md:text-base"},nC={class:"flex flex-wrap gap-2"},iC={key:0,class:"flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-white/10 border border-white/10 text-neutral-200"},sC={class:"flex flex-col sm:flex-row gap-3 pt-2"},rC=["href"],aC=["href"],oC={key:3,class:"space-y-6"},lC={class:"p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"},cC={class:"flex items-center flex-wrap justify-between mb-3 gap-2"},uC={class:"flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider"},dC={class:"flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-cyan-500/10 border border-cyan-500/30 text-cyan-300"},hC={class:"text-neutral-200 text-sm md:text-base leading-relaxed font-medium"},fC={key:0,class:"text-neutral-300 text-xs md:text-sm mt-3 leading-relaxed border-t border-white/10 pt-3"},pC={class:"grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-mono"},mC={class:"text-neutral-300 text-[10px] uppercase tracking-wider"},gC={class:"text-cyan-300 font-bold text-xs md:text-sm mt-0.5 wrap-anywhere"},_C={class:"p-3 rounded-xl bg-white/5 border border-white/10"},xC={class:"text-cyan-300 font-bold text-xs md:text-sm mt-0.5"},vC={class:"p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/15 flex items-start gap-3"},bC=zr({__name:"TelemetryModal",props:{body:{},isOpen:{type:Boolean}},emits:["close","select"],setup(n,{emit:e}){const t=n,i=e,s=["Front-End Developer","Back-End Developer","Full-Stack Developer","Creative Web Engineer"],r=_i(!1),a=()=>{r.value=!r.value},o=()=>{r.value=!1,i("close")},l=_i(0),c=_i(!1),u=_i(null);let h=0,d=0,f=0;const x=j=>{window.innerWidth>=768||(h=j,d=j,f=Date.now(),c.value=!0)},S=j=>{if(!c.value)return;d=j;const xe=j-h;xe>0?l.value=xe:r.value?l.value=Math.max(-15,xe*.1):l.value=Math.max(-50,xe*.4)},m=()=>{if(!c.value)return;c.value=!1;const j=l.value,xe=Date.now()-f,pt=xe>0?(d-h)/xe:0;j<-30?(r.value=!0,l.value=0):r.value?((j>60||pt>.35)&&(r.value=!1),l.value=0):j>65||pt>.4&&j>20?(l.value=window.innerHeight*.75,setTimeout(()=>{o(),l.value=0,r.value=!1},180)):l.value=0},p=j=>{const xe=j.target;xe.closest("button")||xe.closest("a")||(j.currentTarget.setPointerCapture(j.pointerId),x(j.clientY))},y=j=>{c.value&&S(j.clientY)},R=j=>{if(c.value){try{j.currentTarget.releasePointerCapture(j.pointerId)}catch{}m()}},M=j=>{if(c.value){try{j.currentTarget.releasePointerCapture(j.pointerId)}catch{}m()}},P=j=>{const xe=j.target;xe.closest("button")||xe.closest("a")||x(j.touches[0].clientY)},T=j=>{c.value&&(j.cancelable&&j.preventDefault(),S(j.touches[0].clientY))},I=()=>{m()},v=j=>{window.innerWidth>=768||u.value&&u.value.scrollTop<=0&&x(j.touches[0].clientY)},A=j=>{if(!c.value)return;const xe=j.touches[0].clientY,pt=xe-h;pt>0&&u.value&&u.value.scrollTop<=0?(j.cancelable&&j.preventDefault(),S(xe)):pt<0&&(c.value=!1,l.value=0)},F=()=>{m()},k=Vs(()=>{var xe;const j={borderColor:((xe=t.body)==null?void 0:xe.color)||"#38bdf8"};return c.value?(j.transform=`translateY(${l.value}px)`,j.transition="none"):l.value!==0&&(j.transform=`translateY(${l.value}px)`,j.transition="transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)"),j}),U=Vs(()=>Va),Q=Vs(()=>t.body?U.value.findIndex(j=>{var xe;return j.id===((xe=t.body)==null?void 0:xe.id)}):-1),le=Vs(()=>Q.value<=0?U.value[U.value.length-1]:U.value[Q.value-1]),$=Vs(()=>Q.value<0||Q.value>=U.value.length-1?U.value[0]:U.value[Q.value+1]),re=()=>{le.value&&i("select",le.value)},Z=()=>{$.value&&i("select",$.value)},oe=j=>{t.isOpen&&(j.key==="Escape"&&o(),j.key==="ArrowLeft"&&re(),j.key==="ArrowRight"&&Z())};bu(()=>{window.addEventListener("keydown",oe)}),yu(()=>{window.removeEventListener("keydown",oe)});const Ae=Vs(()=>Kd.filter(j=>j.category==="frontend"||!j.category)),Ge=Vs(()=>Kd.filter(j=>j.category==="backend"||j.category==="database")),Fe=j=>Kd.find(xe=>xe.key===j);return(j,xe)=>(an(),yf(Pg,{"enter-active-class":"transition duration-300 ease-out","enter-from-class":"translate-y-full md:translate-y-0 md:translate-x-full opacity-0","enter-to-class":"translate-y-0 md:translate-x-0 opacity-100","leave-active-class":"transition duration-200 ease-in","leave-from-class":"translate-y-0 md:translate-x-0 opacity-100","leave-to-class":"translate-y-full md:translate-y-0 md:translate-x-full opacity-0"},{default:_u(()=>[j.isOpen&&j.body?(an(),pn("div",CA,[xe[28]||(xe[28]=we("div",{class:"pointer-events-none fixed inset-0 bg-transparent transition-opacity -z-10"},null,-1)),we("aside",{"aria-label":"Telemetry HUD Dossier",class:Wa(["pointer-events-auto relative w-full md:w-[480px] lg:w-[520px] xl:w-[560px] flex flex-col bg-[#030712]/95 md:bg-[#030712]/90 backdrop-blur-2xl border-t md:border-t-0 md:border-l border-white/15 rounded-t-3xl md:rounded-none shadow-[0_-20px_60px_rgba(0,0,0,0.85)] md:shadow-[-25px_0_60px_rgba(0,0,0,0.9)] overflow-hidden transition-[height,max-height] duration-300 ease-out",[r.value?"h-[92vh] max-h-[94vh] md:h-full md:max-h-full":"h-[70vh] max-h-[72vh] md:h-full md:max-h-full"]]),style:Or(k.value)},[we("div",{class:"w-full flex flex-col items-center pt-2 pb-1.5 md:hidden cursor-grab active:cursor-grabbing touch-none select-none",onPointerdown:p,onPointermove:y,onPointerup:R,onPointercancel:M,onTouchstart:P,onTouchmove:T,onTouchend:I,onTouchcancel:I,onClick:a},[xe[8]||(xe[8]=we("div",{class:"w-12 h-1.5 rounded-full bg-white/40 active:bg-cyan-400 transition-colors"},null,-1)),we("span",RA,un(r.value?"Swipe down to collapse":"Swipe down to close • Tap to expand"),1)],32),we("div",PA,[we("div",DA,[we("div",IA,[xe[9]||(xe[9]=we("span",{class:"inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping shrink-0"},null,-1)),we("span",LA,un(j.body.type==="vessel"||j.body.type==="station"||j.body.type==="phenomenon"?"DEEP SPACE":"PLANETARY")+" // "+un(j.body.codeName),1)]),we("div",NA,[we("button",{onClick:re,onPointerdown:xe[0]||(xe[0]=ms(()=>{},["stop"])),onTouchstart:xe[1]||(xe[1]=ms(()=>{},["stop"])),class:"p-1.5 md:p-2 rounded-xl border border-white/10 hover:bg-white/10 active:bg-white/20 text-neutral-300 hover:text-white transition-colors",title:"Previous Celestial Body (Arrow Left)"},[kt(mn(Dn),{icon:"solar:arrow-left-linear",class:"w-4 h-4 md:w-4.5 md:h-4.5"})],32),we("button",{onClick:Z,onPointerdown:xe[2]||(xe[2]=ms(()=>{},["stop"])),onTouchstart:xe[3]||(xe[3]=ms(()=>{},["stop"])),class:"p-1.5 md:p-2 rounded-xl border border-white/10 hover:bg-white/10 active:bg-white/20 text-neutral-300 hover:text-white transition-colors",title:"Next Celestial Body (Arrow Right)"},[kt(mn(Dn),{icon:"solar:arrow-right-linear",class:"w-4 h-4 md:w-4.5 md:h-4.5"})],32),we("button",{onClick:a,onPointerdown:xe[4]||(xe[4]=ms(()=>{},["stop"])),onTouchstart:xe[5]||(xe[5]=ms(()=>{},["stop"])),class:"md:hidden p-1.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 transition-colors",title:r.value?"Collapse to half view":"Expand to full view"},[kt(mn(Dn),{icon:r.value?"solar:minimize-square-minimalistic-linear":"solar:maximize-square-minimalistic-linear",class:"w-4 h-4"},null,8,["icon"])],40,UA),we("button",{onClick:o,onPointerdown:xe[6]||(xe[6]=ms(()=>{},["stop"])),onTouchstart:xe[7]||(xe[7]=ms(()=>{},["stop"])),class:"p-1.5 md:p-2 rounded-xl bg-white/10 hover:bg-white/20 active:bg-red-500/20 text-white hover:text-red-300 transition-colors",title:"Close Telemetry (Esc)"},[kt(mn(Dn),{icon:"solar:close-circle-bold",class:"w-4 h-4 md:w-5 md:h-5"})],32)])]),we("div",FA,[we("span",{class:"w-3.5 h-3.5 rounded-full animate-pulse shadow-sm shrink-0",style:Or({backgroundColor:j.body.color,boxShadow:`0 0 12px ${j.body.color}`})},null,4),we("h2",OA,un(j.body.name),1)])]),we("div",{ref_key:"scrollContainerRef",ref:u,class:"flex-1 overflow-y-auto p-4 md:p-6 space-y-5 custom-scrollbar overscroll-contain",onTouchstart:v,onTouchmove:A,onTouchend:F,onTouchcancel:F},[j.body.type==="star"?(an(),pn("div",kA,[we("div",BA,[xe[12]||(xe[12]=we("div",{class:"relative w-24 h-24 rounded-full p-1 border-2 border-amber-400 shadow-[0_0_25px_rgba(251,191,36,0.5)] flex items-center justify-center bg-gradient-to-tr from-amber-500 via-yellow-400 to-orange-500 shrink-0 animate-pulse"},[we("span",{class:"text-4xl"},"☀️")],-1)),we("div",GA,[xe[10]||(xe[10]=we("div",{class:"inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30"},[we("span",{class:"w-2 h-2 rounded-full bg-amber-400 animate-ping"}),Xs(" CORE STELLAR NURSERY // SOL-ANKO ")],-1)),xe[11]||(xe[11]=we("h3",{class:"text-2xl font-bold text-neutral-100"},[Xs(" Hi, I'm "),we("span",{class:"text-amber-400"},"Anko")],-1)),we("div",zA,[kt(mn(AA),{class:"bg-gradient-to-r from-amber-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent",componentTag:"span",text:s})])])]),xe[15]||(xe[15]=we("p",{class:"text-neutral-300 leading-relaxed text-sm md:text-base"}," Pusat gravitasi dari seluruh ekosistem proyek dan keahlian digital ini. Menyinari dan menggerakkan setiap karya dengan perpaduan performa tinggi, animasi dinamis, serta estetika visual modern. ",-1)),we("div",null,[xe[13]||(xe[13]=we("h4",{class:"text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-3"}," Transmission Channels // Direct Comm Link ",-1)),we("div",HA,[(an(!0),pn(Gn,null,Fo(mn(gA),(pt,At)=>(an(),pn("a",{key:At,href:pt.href,target:"_blank",class:"flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all hover:scale-105 shadow-sm"},[kt(mn(Dn),{icon:pt.icon,width:"20"},null,8,["icon"]),we("span",null,un(pt.title),1),kt(mn(Dn),{icon:"solar:arrow-right-up-linear",width:"16",class:"text-neutral-400"})],8,VA))),128))])]),we("div",WA,[we("div",XA,[kt(mn(Dn),{icon:"solar:shield-check-bold",width:"24",class:"text-emerald-400"}),xe[14]||(xe[14]=we("div",null,[we("div",{class:"text-xs font-mono text-neutral-400"},"STATUS OPERASIONAL"),we("div",{class:"text-sm font-bold text-emerald-400"}," Available for Freelance & Full-Time ")],-1))])])])):j.body.type==="skills"?(an(),pn("div",YA,[we("p",qA,un(j.body.tagline),1),we("div",null,[xe[16]||(xe[16]=we("div",{class:"text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-3"}," Orbital Frontend Systems ",-1)),we("div",KA,[(an(!0),pn(Gn,null,Fo(Ae.value,(pt,At)=>(an(),pn("div",{key:At,class:"flex items-center gap-2 px-3 py-2 rounded-xl text-xs md:text-sm font-semibold bg-white/5 border border-white/10 hover:border-cyan-400 transition-colors shadow-sm"},[kt(mn(Dn),{icon:pt.icon,width:"18"},null,8,["icon"]),we("span",$A,un(pt.title),1)]))),128))])]),we("div",null,[xe[17]||(xe[17]=we("div",{class:"text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-3"}," Core Backend & Storage Arrays ",-1)),we("div",ZA,[(an(!0),pn(Gn,null,Fo(Ge.value,(pt,At)=>(an(),pn("div",{key:At,class:"flex items-center gap-2 px-3 py-2 rounded-xl text-xs md:text-sm font-semibold bg-white/5 border border-white/10 hover:border-purple-400 transition-colors shadow-sm"},[kt(mn(Dn),{icon:pt.icon,width:"18"},null,8,["icon"]),we("span",jA,un(pt.title),1)]))),128))])])])):j.body.projectData?(an(),pn("div",JA,[we("div",QA,[we("img",{src:j.body.projectData.img,alt:j.body.projectData.title,class:"w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"},null,8,eC),xe[18]||(xe[18]=we("div",{class:"absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4"},[we("div",{class:"font-mono text-xs text-white/90"},"STATUS: EXPLORED & OPERATIONAL")],-1))]),we("p",tC,un(j.body.projectData.desc),1),we("div",null,[xe[19]||(xe[19]=we("div",{class:"text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-2.5"}," Deployed Propulsion Stacks ",-1)),we("div",nC,[(an(!0),pn(Gn,null,Fo(j.body.projectData.techs,pt=>(an(),pn(Gn,{key:pt},[Fe(pt)?(an(),pn("span",iC,[kt(mn(Dn),{icon:Fe(pt).icon,width:"16"},null,8,["icon"]),Xs(" "+un(Fe(pt).title),1)])):Dc("",!0)],64))),128))])]),we("div",sC,[we("a",{href:j.body.projectData.web,target:"_blank",class:"flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02]"},[kt(mn(Dn),{icon:"solar:rocket-bold",width:"18"}),xe[20]||(xe[20]=Xs(" Launch Mission (Live Demo) ",-1))],8,rC),we("a",{href:j.body.projectData.github,target:"_blank",class:"flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all hover:scale-[1.02]"},[kt(mn(Dn),{icon:"solar:code-bold",width:"18"}),xe[21]||(xe[21]=Xs(" Source Code ",-1))],8,aC)])])):(an(),pn("div",oC,[we("div",lC,[we("div",cC,[we("div",uC,[xe[22]||(xe[22]=we("span",{class:"inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping"},null,-1)),Xs(" "+un((j.body.type||"DEEP SPACE").toUpperCase())+" TELEMETRY FEED ",1)]),we("div",dC,[kt(mn(Dn),{icon:j.body.icon||"solar:telescope-bold",width:"14"},null,8,["icon"]),we("span",null,un(j.body.codeName),1)])]),we("p",hC,un(j.body.tagline),1),j.body.lore?(an(),pn("p",fC,un(j.body.lore),1)):Dc("",!0)]),we("div",pC,[j.body.extraStats&&j.body.extraStats.length>0?(an(!0),pn(Gn,{key:0},Fo(j.body.extraStats,(pt,At)=>(an(),pn("div",{key:At,class:"p-3 rounded-xl bg-white/5 border border-white/10"},[we("div",mC,un(pt.label),1),we("div",gC,un(pt.value),1)]))),128)):(an(),pn(Gn,{key:1},[we("div",_C,[xe[23]||(xe[23]=we("div",{class:"text-neutral-500 text-[10px] uppercase tracking-wider"}," Orbital Radius ",-1)),we("div",xC,un(j.body.orbitRadius)+" AU ",1)]),xe[24]||(xe[24]=we("div",{class:"p-3 rounded-xl bg-white/5 border border-white/10"},[we("div",{class:"text-neutral-500 text-[10px] uppercase tracking-wider"}," Telemetry Signal "),we("div",{class:"text-emerald-400 font-bold text-xs md:text-sm mt-0.5"}," 1420.405 MHz ")],-1)),xe[25]||(xe[25]=we("div",{class:"p-3 rounded-xl bg-white/5 border border-white/10"},[we("div",{class:"text-neutral-500 text-[10px] uppercase tracking-wider"},"Status"),we("div",{class:"text-cyan-300 font-bold text-xs md:text-sm mt-0.5"},"Operational")],-1))],64))]),we("div",vC,[kt(mn(Dn),{icon:"solar:radar-bold",width:"20",class:"text-cyan-400 shrink-0 mt-0.5"}),xe[26]||(xe[26]=we("p",{class:"text-neutral-300 text-xs leading-relaxed font-mono"}," Sensor navigasi mengonfirmasi posisi stabil di luar bidang orbit tata surya utama. Terhubung dengan jaringan starlight relay. ",-1))])]))],544),xe[27]||(xe[27]=we("div",{class:"hidden md:flex p-3.5 md:p-4 border-t border-white/10 bg-black/40 items-center justify-between text-xs font-mono text-neutral-400 shrink-0"},[we("div",{class:"flex items-center gap-2"},[we("span",{class:"w-2 h-2 rounded-full bg-cyan-400 animate-ping"}),we("span",{class:"text-cyan-300 font-semibold uppercase tracking-wider text-[11px] md:text-xs"},"3D TARGET LOCK // ACTIVE TRACKING")]),we("div",{class:"text-[10px] md:text-[11px] text-neutral-500"},"ESC / Tap 3D to Unfollow")],-1))],6)])):Dc("",!0)]),_:1}))}}),yC={"aria-label":"Mission Control HUD",class:"fixed bottom-5 left-0 right-0 z-40 px-4 pointer-events-none flex justify-center"},MC={class:"pointer-events-auto flex items-center gap-2.5 text-xs font-mono p-1.5 rounded-2xl cosmic-glass border border-white/10 shadow-2xl backdrop-blur-xl"},SC={class:"flex items-center rounded-xl bg-white/5 border border-white/10 overflow-hidden"},wC=zr({__name:"MissionControlHUD",props:{orbitSpeedMultiplier:{}},emits:["reset-view","toggle-speed","zoom-in","zoom-out"],setup(n,{emit:e}){const t=e;return(i,s)=>(an(),pn("aside",yC,[we("div",MC,[we("button",{onClick:s[0]||(s[0]=r=>t("toggle-speed")),class:"flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-white/10 text-neutral-200 transition-all shadow-sm",title:"Cycle Orbit Speed (1x / 2x / Paused)"},[kt(mn(Dn),{icon:i.orbitSpeedMultiplier===0?"solar:play-bold":"solar:stopwatch-bold",width:"16",class:"text-amber-400"},null,8,["icon"]),we("span",null,un(i.orbitSpeedMultiplier===0?"Paused":`${i.orbitSpeedMultiplier}x Orbit`),1)]),s[6]||(s[6]=we("span",{class:"text-white/15"},"|",-1)),we("button",{onClick:s[1]||(s[1]=r=>t("reset-view")),class:"flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-white/10 text-neutral-200 transition-all shadow-sm",title:"Recenter Solar View"},[kt(mn(Dn),{icon:"fluent-mdl2:focus-view",width:"16",class:"text-cyan-400"}),s[4]||(s[4]=we("span",null,"Recenter",-1))]),s[7]||(s[7]=we("span",{class:"text-white/15"},"|",-1)),we("div",SC,[we("button",{onClick:s[2]||(s[2]=r=>t("zoom-out")),class:"p-1.5 px-2.5 hover:bg-white/10 text-neutral-300 transition-colors",title:"Zoom Out","aria-label":"Zoom Out"},[kt(mn(Dn),{icon:"solar:magnifer-zoom-out-linear",width:"16"})]),s[5]||(s[5]=we("span",{class:"text-neutral-600 text-[10px]"},"|",-1)),we("button",{onClick:s[3]||(s[3]=r=>t("zoom-in")),class:"p-1.5 px-2.5 hover:bg-white/10 text-neutral-300 transition-colors",title:"Zoom In","aria-label":"Zoom In"},[kt(mn(Dn),{icon:"solar:magnifer-zoom-in-linear",width:"16"})])])])]))}}),EC={class:"relative w-full h-screen font-mono text-white overflow-hidden bg-[#02040a] select-none"},TC={class:"fixed inset-0 w-screen h-screen z-0 overflow-hidden"},AC=zr({__name:"App",setup(n){const e=_i(null),t=_i(null),i=_i(!1),s=_i(1),r=d=>{t.value=d,d?i.value=!0:i.value=!1},a=()=>{var d;i.value=!1,t.value=null,(d=e.value)==null||d.resetView()},o=()=>{var d;t.value=null,(d=e.value)==null||d.resetView()},l=()=>{var d;(d=e.value)==null||d.zoomIn()},c=()=>{var d;(d=e.value)==null||d.zoomOut()},u=()=>{s.value===1?s.value=2:s.value===2?s.value=0:s.value=1},h=d=>{if(d==="sun"){const f=Va.find(x=>x.id==="sun");f&&r(f)}else if(d==="skills"){const f=Va.find(x=>x.id==="skills");f&&r(f)}else if(d==="projects"){const f=Va.find(x=>x.type==="project");f&&r(f)}};return(d,f)=>{var x;return an(),pn("div",EC,[kt(EM,{onNavigate:h}),we("main",TC,[kt(SA,{ref_key:"canvasRef",ref:e,"orbit-speed-multiplier":s.value,"selected-body-id":(x=t.value)==null?void 0:x.id,"is-panel-open":i.value,onSelect:r,onUnselect:a},null,8,["orbit-speed-multiplier","selected-body-id","is-panel-open"])]),kt(wC,{"orbit-speed-multiplier":s.value,onResetView:o,onToggleSpeed:u,onZoomIn:l,onZoomOut:c},null,8,["orbit-speed-multiplier"]),kt(bC,{body:t.value,"is-open":i.value,onClose:a,onSelect:r},null,8,["body","is-open"])])}}});_y(AC).mount("#app");
