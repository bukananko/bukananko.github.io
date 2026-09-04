(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();/**
* @vue/shared v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function cf(n){const e=Object.create(null);for(const t of n.split(","))e[t]=1;return t=>t in e}const ln={},ko=[],Qi=()=>{},w0=()=>!1,fu=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),uf=n=>n.startsWith("onUpdate:"),Gn=Object.assign,df=(n,e)=>{const t=n.indexOf(e);t>-1&&n.splice(t,1)},Kx=Object.prototype.hasOwnProperty,Kt=(n,e)=>Kx.call(n,e),Tt=Array.isArray,Bo=n=>pu(n)==="[object Map]",E0=n=>pu(n)==="[object Set]",Pt=n=>typeof n=="function",bn=n=>typeof n=="string",nr=n=>typeof n=="symbol",un=n=>n!==null&&typeof n=="object",T0=n=>(un(n)||Pt(n))&&Pt(n.then)&&Pt(n.catch),A0=Object.prototype.toString,pu=n=>A0.call(n),$x=n=>pu(n).slice(8,-1),C0=n=>pu(n)==="[object Object]",hf=n=>bn(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,ol=cf(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),mu=n=>{const e=Object.create(null);return t=>e[t]||(e[t]=n(t))},Zx=/-\w/g,Ai=mu(n=>n.replace(Zx,e=>e.slice(1).toUpperCase())),jx=/\B([A-Z])/g,Gr=mu(n=>n.replace(jx,"-$1").toLowerCase()),gu=mu(n=>n.charAt(0).toUpperCase()+n.slice(1)),Ju=mu(n=>n?`on${gu(n)}`:""),$s=(n,e)=>!Object.is(n,e),Qu=(n,...e)=>{for(let t=0;t<n.length;t++)n[t](...e)},R0=(n,e,t,i=!1)=>{Object.defineProperty(n,e,{configurable:!0,enumerable:!1,writable:i,value:t})},Jx=n=>{const e=parseFloat(n);return isNaN(e)?n:e},Qx=n=>{const e=bn(n)?Number(n):NaN;return isNaN(e)?n:e};let _p;const _u=()=>_p||(_p=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Or(n){if(Tt(n)){const e={};for(let t=0;t<n.length;t++){const i=n[t],s=bn(i)?iv(i):Or(i);if(s)for(const r in s)e[r]=s[r]}return e}else if(bn(n)||un(n))return n}const ev=/;(?![^(]*\))/g,tv=/:([^]+)/,nv=/\/\*[^]*?\*\//g;function iv(n){const e={};return n.replace(nv,"").split(ev).forEach(t=>{if(t){const i=t.split(tv);i.length>1&&(e[i[0].trim()]=i[1].trim())}}),e}function Ko(n){let e="";if(bn(n))e=n;else if(Tt(n))for(let t=0;t<n.length;t++){const i=Ko(n[t]);i&&(e+=i+" ")}else if(un(n))for(const t in n)n[t]&&(e+=t+" ");return e.trim()}const sv="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",rv=cf(sv);function P0(n){return!!n||n===""}const D0=n=>!!(n&&n.__v_isRef===!0),cn=n=>bn(n)?n:n==null?"":Tt(n)||un(n)&&(n.toString===A0||!Pt(n.toString))?D0(n)?cn(n.value):JSON.stringify(n,I0,2):String(n),I0=(n,e)=>D0(e)?I0(n,e.value):Bo(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((t,[i,s],r)=>(t[ed(i,r)+" =>"]=s,t),{})}:E0(e)?{[`Set(${e.size})`]:[...e.values()].map(t=>ed(t))}:nr(e)?ed(e):un(e)&&!Tt(e)&&!C0(e)?String(e):e,ed=(n,e="")=>{var t;return nr(n)?`Symbol(${(t=n.description)!=null?t:e})`:n};/**
* @vue/reactivity v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let ci;class ov{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=ci,!e&&ci&&(this.index=(ci.scopes||(ci.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].pause();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].resume();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].resume()}}run(e){if(this._active){const t=ci;try{return ci=this,e()}finally{ci=t}}}on(){++this._on===1&&(this.prevScope=ci,ci=this)}off(){this._on>0&&--this._on===0&&(ci=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let t,i;for(t=0,i=this.effects.length;t<i;t++)this.effects[t].stop();for(this.effects.length=0,t=0,i=this.cleanups.length;t<i;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){for(t=0,i=this.scopes.length;t<i;t++)this.scopes[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function av(){return ci}let an;const td=new WeakSet;class L0{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,ci&&ci.active&&ci.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,td.has(this)&&(td.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||U0(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,xp(this),F0(this);const e=an,t=Oi;an=this,Oi=!0;try{return this.fn()}finally{O0(this),an=e,Oi=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)mf(e);this.deps=this.depsTail=void 0,xp(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?td.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Qd(this)&&this.run()}get dirty(){return Qd(this)}}let N0=0,al,ll;function U0(n,e=!1){if(n.flags|=8,e){n.next=ll,ll=n;return}n.next=al,al=n}function ff(){N0++}function pf(){if(--N0>0)return;if(ll){let e=ll;for(ll=void 0;e;){const t=e.next;e.next=void 0,e.flags&=-9,e=t}}let n;for(;al;){let e=al;for(al=void 0;e;){const t=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(i){n||(n=i)}e=t}}if(n)throw n}function F0(n){for(let e=n.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function O0(n){let e,t=n.depsTail,i=t;for(;i;){const s=i.prevDep;i.version===-1?(i===t&&(t=s),mf(i),lv(i)):e=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=s}n.deps=e,n.depsTail=t}function Qd(n){for(let e=n.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(k0(e.dep.computed)||e.dep.version!==e.version))return!0;return!!n._dirty}function k0(n){if(n.flags&4&&!(n.flags&16)||(n.flags&=-17,n.globalVersion===pl)||(n.globalVersion=pl,!n.isSSR&&n.flags&128&&(!n.deps&&!n._dirty||!Qd(n))))return;n.flags|=2;const e=n.dep,t=an,i=Oi;an=n,Oi=!0;try{F0(n);const s=n.fn(n._value);(e.version===0||$s(s,n._value))&&(n.flags|=128,n._value=s,e.version++)}catch(s){throw e.version++,s}finally{an=t,Oi=i,O0(n),n.flags&=-3}}function mf(n,e=!1){const{dep:t,prevSub:i,nextSub:s}=n;if(i&&(i.nextSub=s,n.prevSub=void 0),s&&(s.prevSub=i,n.nextSub=void 0),t.subs===n&&(t.subs=i,!i&&t.computed)){t.computed.flags&=-5;for(let r=t.computed.deps;r;r=r.nextDep)mf(r,!0)}!e&&!--t.sc&&t.map&&t.map.delete(t.key)}function lv(n){const{prevDep:e,nextDep:t}=n;e&&(e.nextDep=t,n.prevDep=void 0),t&&(t.prevDep=e,n.nextDep=void 0)}let Oi=!0;const B0=[];function ys(){B0.push(Oi),Oi=!1}function Ms(){const n=B0.pop();Oi=n===void 0?!0:n}function xp(n){const{cleanup:e}=n;if(n.cleanup=void 0,e){const t=an;an=void 0;try{e()}finally{an=t}}}let pl=0;class cv{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class gf{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!an||!Oi||an===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==an)t=this.activeLink=new cv(an,this),an.deps?(t.prevDep=an.depsTail,an.depsTail.nextDep=t,an.depsTail=t):an.deps=an.depsTail=t,G0(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){const i=t.nextDep;i.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=i),t.prevDep=an.depsTail,t.nextDep=void 0,an.depsTail.nextDep=t,an.depsTail=t,an.deps===t&&(an.deps=i)}return t}trigger(e){this.version++,pl++,this.notify(e)}notify(e){ff();try{for(let t=this.subs;t;t=t.prevSub)t.sub.notify()&&t.sub.dep.notify()}finally{pf()}}}function G0(n){if(n.dep.sc++,n.sub.flags&4){const e=n.dep.computed;if(e&&!n.dep.subs){e.flags|=20;for(let i=e.deps;i;i=i.nextDep)G0(i)}const t=n.dep.subs;t!==n&&(n.prevSub=t,t&&(t.nextSub=n)),n.dep.subs=n}}const eh=new WeakMap,Ur=Symbol(""),th=Symbol(""),ml=Symbol("");function $n(n,e,t){if(Oi&&an){let i=eh.get(n);i||eh.set(n,i=new Map);let s=i.get(t);s||(i.set(t,s=new gf),s.map=i,s.key=t),s.track()}}function xs(n,e,t,i,s,r){const o=eh.get(n);if(!o){pl++;return}const a=l=>{l&&l.trigger()};if(ff(),e==="clear")o.forEach(a);else{const l=Tt(n),c=l&&hf(t);if(l&&t==="length"){const u=Number(i);o.forEach((h,d)=>{(d==="length"||d===ml||!nr(d)&&d>=u)&&a(h)})}else switch((t!==void 0||o.has(void 0))&&a(o.get(t)),c&&a(o.get(ml)),e){case"add":l?c&&a(o.get("length")):(a(o.get(Ur)),Bo(n)&&a(o.get(th)));break;case"delete":l||(a(o.get(Ur)),Bo(n)&&a(o.get(th)));break;case"set":Bo(n)&&a(o.get(Ur));break}}pf()}function po(n){const e=Yt(n);return e===n?e:($n(e,"iterate",ml),Ti(n)?e:e.map(Wn))}function xu(n){return $n(n=Yt(n),"iterate",ml),n}const uv={__proto__:null,[Symbol.iterator](){return nd(this,Symbol.iterator,Wn)},concat(...n){return po(this).concat(...n.map(e=>Tt(e)?po(e):e))},entries(){return nd(this,"entries",n=>(n[1]=Wn(n[1]),n))},every(n,e){return as(this,"every",n,e,void 0,arguments)},filter(n,e){return as(this,"filter",n,e,t=>t.map(Wn),arguments)},find(n,e){return as(this,"find",n,e,Wn,arguments)},findIndex(n,e){return as(this,"findIndex",n,e,void 0,arguments)},findLast(n,e){return as(this,"findLast",n,e,Wn,arguments)},findLastIndex(n,e){return as(this,"findLastIndex",n,e,void 0,arguments)},forEach(n,e){return as(this,"forEach",n,e,void 0,arguments)},includes(...n){return id(this,"includes",n)},indexOf(...n){return id(this,"indexOf",n)},join(n){return po(this).join(n)},lastIndexOf(...n){return id(this,"lastIndexOf",n)},map(n,e){return as(this,"map",n,e,void 0,arguments)},pop(){return ka(this,"pop")},push(...n){return ka(this,"push",n)},reduce(n,...e){return vp(this,"reduce",n,e)},reduceRight(n,...e){return vp(this,"reduceRight",n,e)},shift(){return ka(this,"shift")},some(n,e){return as(this,"some",n,e,void 0,arguments)},splice(...n){return ka(this,"splice",n)},toReversed(){return po(this).toReversed()},toSorted(n){return po(this).toSorted(n)},toSpliced(...n){return po(this).toSpliced(...n)},unshift(...n){return ka(this,"unshift",n)},values(){return nd(this,"values",Wn)}};function nd(n,e,t){const i=xu(n),s=i[e]();return i!==n&&!Ti(n)&&(s._next=s.next,s.next=()=>{const r=s._next();return r.value&&(r.value=t(r.value)),r}),s}const dv=Array.prototype;function as(n,e,t,i,s,r){const o=xu(n),a=o!==n&&!Ti(n),l=o[e];if(l!==dv[e]){const h=l.apply(n,r);return a?Wn(h):h}let c=t;o!==n&&(a?c=function(h,d){return t.call(this,Wn(h),d,n)}:t.length>2&&(c=function(h,d){return t.call(this,h,d,n)}));const u=l.call(o,c,i);return a&&s?s(u):u}function vp(n,e,t,i){const s=xu(n);let r=t;return s!==n&&(Ti(n)?t.length>3&&(r=function(o,a,l){return t.call(this,o,a,l,n)}):r=function(o,a,l){return t.call(this,o,Wn(a),l,n)}),s[e](r,...i)}function id(n,e,t){const i=Yt(n);$n(i,"iterate",ml);const s=i[e](...t);return(s===-1||s===!1)&&bf(t[0])?(t[0]=Yt(t[0]),i[e](...t)):s}function ka(n,e,t=[]){ys(),ff();const i=Yt(n)[e].apply(n,t);return pf(),Ms(),i}const hv=cf("__proto__,__v_isRef,__isVue"),z0=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(nr));function fv(n){nr(n)||(n=String(n));const e=Yt(this);return $n(e,"has",n),e.hasOwnProperty(n)}class H0{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,i){if(t==="__v_skip")return e.__v_skip;const s=this._isReadonly,r=this._isShallow;if(t==="__v_isReactive")return!s;if(t==="__v_isReadonly")return s;if(t==="__v_isShallow")return r;if(t==="__v_raw")return i===(s?r?Sv:Y0:r?X0:W0).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(i)?e:void 0;const o=Tt(e);if(!s){let l;if(o&&(l=uv[t]))return l;if(t==="hasOwnProperty")return fv}const a=Reflect.get(e,t,jn(e)?e:i);return(nr(t)?z0.has(t):hv(t))||(s||$n(e,"get",t),r)?a:jn(a)?o&&hf(t)?a:a.value:un(a)?s?q0(a):xf(a):a}}class V0 extends H0{constructor(e=!1){super(!1,e)}set(e,t,i,s){let r=e[t];if(!this._isShallow){const l=js(r);if(!Ti(i)&&!js(i)&&(r=Yt(r),i=Yt(i)),!Tt(e)&&jn(r)&&!jn(i))return l||(r.value=i),!0}const o=Tt(e)&&hf(t)?Number(t)<e.length:Kt(e,t),a=Reflect.set(e,t,i,jn(e)?e:s);return e===Yt(s)&&(o?$s(i,r)&&xs(e,"set",t,i):xs(e,"add",t,i)),a}deleteProperty(e,t){const i=Kt(e,t);e[t];const s=Reflect.deleteProperty(e,t);return s&&i&&xs(e,"delete",t,void 0),s}has(e,t){const i=Reflect.has(e,t);return(!nr(t)||!z0.has(t))&&$n(e,"has",t),i}ownKeys(e){return $n(e,"iterate",Tt(e)?"length":Ur),Reflect.ownKeys(e)}}class pv extends H0{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const mv=new V0,gv=new pv,_v=new V0(!0);const nh=n=>n,Yl=n=>Reflect.getPrototypeOf(n);function xv(n,e,t){return function(...i){const s=this.__v_raw,r=Yt(s),o=Bo(r),a=n==="entries"||n===Symbol.iterator&&o,l=n==="keys"&&o,c=s[n](...i),u=t?nh:e?qc:Wn;return!e&&$n(r,"iterate",l?th:Ur),{next(){const{value:h,done:d}=c.next();return d?{value:h,done:d}:{value:a?[u(h[0]),u(h[1])]:u(h),done:d}},[Symbol.iterator](){return this}}}}function ql(n){return function(...e){return n==="delete"?!1:n==="clear"?void 0:this}}function vv(n,e){const t={get(s){const r=this.__v_raw,o=Yt(r),a=Yt(s);n||($s(s,a)&&$n(o,"get",s),$n(o,"get",a));const{has:l}=Yl(o),c=e?nh:n?qc:Wn;if(l.call(o,s))return c(r.get(s));if(l.call(o,a))return c(r.get(a));r!==o&&r.get(s)},get size(){const s=this.__v_raw;return!n&&$n(Yt(s),"iterate",Ur),s.size},has(s){const r=this.__v_raw,o=Yt(r),a=Yt(s);return n||($s(s,a)&&$n(o,"has",s),$n(o,"has",a)),s===a?r.has(s):r.has(s)||r.has(a)},forEach(s,r){const o=this,a=o.__v_raw,l=Yt(a),c=e?nh:n?qc:Wn;return!n&&$n(l,"iterate",Ur),a.forEach((u,h)=>s.call(r,c(u),c(h),o))}};return Gn(t,n?{add:ql("add"),set:ql("set"),delete:ql("delete"),clear:ql("clear")}:{add(s){!e&&!Ti(s)&&!js(s)&&(s=Yt(s));const r=Yt(this);return Yl(r).has.call(r,s)||(r.add(s),xs(r,"add",s,s)),this},set(s,r){!e&&!Ti(r)&&!js(r)&&(r=Yt(r));const o=Yt(this),{has:a,get:l}=Yl(o);let c=a.call(o,s);c||(s=Yt(s),c=a.call(o,s));const u=l.call(o,s);return o.set(s,r),c?$s(r,u)&&xs(o,"set",s,r):xs(o,"add",s,r),this},delete(s){const r=Yt(this),{has:o,get:a}=Yl(r);let l=o.call(r,s);l||(s=Yt(s),l=o.call(r,s)),a&&a.call(r,s);const c=r.delete(s);return l&&xs(r,"delete",s,void 0),c},clear(){const s=Yt(this),r=s.size!==0,o=s.clear();return r&&xs(s,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(s=>{t[s]=xv(s,n,e)}),t}function _f(n,e){const t=vv(n,e);return(i,s,r)=>s==="__v_isReactive"?!n:s==="__v_isReadonly"?n:s==="__v_raw"?i:Reflect.get(Kt(t,s)&&s in i?t:i,s,r)}const bv={get:_f(!1,!1)},yv={get:_f(!1,!0)},Mv={get:_f(!0,!1)};const W0=new WeakMap,X0=new WeakMap,Y0=new WeakMap,Sv=new WeakMap;function wv(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Ev(n){return n.__v_skip||!Object.isExtensible(n)?0:wv($x(n))}function xf(n){return js(n)?n:vf(n,!1,mv,bv,W0)}function Tv(n){return vf(n,!1,_v,yv,X0)}function q0(n){return vf(n,!0,gv,Mv,Y0)}function vf(n,e,t,i,s){if(!un(n)||n.__v_raw&&!(e&&n.__v_isReactive))return n;const r=Ev(n);if(r===0)return n;const o=s.get(n);if(o)return o;const a=new Proxy(n,r===2?i:t);return s.set(n,a),a}function Go(n){return js(n)?Go(n.__v_raw):!!(n&&n.__v_isReactive)}function js(n){return!!(n&&n.__v_isReadonly)}function Ti(n){return!!(n&&n.__v_isShallow)}function bf(n){return n?!!n.__v_raw:!1}function Yt(n){const e=n&&n.__v_raw;return e?Yt(e):n}function Av(n){return!Kt(n,"__v_skip")&&Object.isExtensible(n)&&R0(n,"__v_skip",!0),n}const Wn=n=>un(n)?xf(n):n,qc=n=>un(n)?q0(n):n;function jn(n){return n?n.__v_isRef===!0:!1}function gi(n){return Cv(n,!1)}function Cv(n,e){return jn(n)?n:new Rv(n,e)}class Rv{constructor(e,t){this.dep=new gf,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:Yt(e),this._value=t?e:Wn(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){const t=this._rawValue,i=this.__v_isShallow||Ti(e)||js(e);e=i?e:Yt(e),$s(e,t)&&(this._rawValue=e,this._value=i?e:Wn(e),this.dep.trigger())}}function pn(n){return jn(n)?n.value:n}const Pv={get:(n,e,t)=>e==="__v_raw"?n:pn(Reflect.get(n,e,t)),set:(n,e,t,i)=>{const s=n[e];return jn(s)&&!jn(t)?(s.value=t,!0):Reflect.set(n,e,t,i)}};function K0(n){return Go(n)?n:new Proxy(n,Pv)}class Dv{constructor(e,t,i){this.fn=e,this.setter=t,this._value=void 0,this.dep=new gf(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=pl-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&an!==this)return U0(this,!0),!0}get value(){const e=this.dep.track();return k0(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function Iv(n,e,t=!1){let i,s;return Pt(n)?i=n:(i=n.get,s=n.set),new Dv(i,s,t)}const Kl={},Kc=new WeakMap;let Cr;function Lv(n,e=!1,t=Cr){if(t){let i=Kc.get(t);i||Kc.set(t,i=[]),i.push(n)}}function Nv(n,e,t=ln){const{immediate:i,deep:s,once:r,scheduler:o,augmentJob:a,call:l}=t,c=M=>s?M:Ti(M)||s===!1||s===0?Ys(M,1):Ys(M);let u,h,d,f,x=!1,S=!1;if(jn(n)?(h=()=>n.value,x=Ti(n)):Go(n)?(h=()=>c(n),x=!0):Tt(n)?(S=!0,x=n.some(M=>Go(M)||Ti(M)),h=()=>n.map(M=>{if(jn(M))return M.value;if(Go(M))return c(M);if(Pt(M))return l?l(M,2):M()})):Pt(n)?e?h=l?()=>l(n,2):n:h=()=>{if(d){ys();try{d()}finally{Ms()}}const M=Cr;Cr=u;try{return l?l(n,3,[f]):n(f)}finally{Cr=M}}:h=Qi,e&&s){const M=h,P=s===!0?1/0:s;h=()=>Ys(M(),P)}const m=av(),p=()=>{u.stop(),m&&m.active&&df(m.effects,u)};if(r&&e){const M=e;e=(...P)=>{M(...P),p()}}let y=S?new Array(n.length).fill(Kl):Kl;const R=M=>{if(!(!(u.flags&1)||!u.dirty&&!M))if(e){const P=u.run();if(s||x||(S?P.some((T,I)=>$s(T,y[I])):$s(P,y))){d&&d();const T=Cr;Cr=u;try{const I=[P,y===Kl?void 0:S&&y[0]===Kl?[]:y,f];y=P,l?l(e,3,I):e(...I)}finally{Cr=T}}}else u.run()};return a&&a(R),u=new L0(h),u.scheduler=o?()=>o(R,!1):R,f=M=>Lv(M,!1,u),d=u.onStop=()=>{const M=Kc.get(u);if(M){if(l)l(M,4);else for(const P of M)P();Kc.delete(u)}},e?i?R(!0):y=u.run():o?o(R.bind(null,!0),!0):u.run(),p.pause=u.pause.bind(u),p.resume=u.resume.bind(u),p.stop=p,p}function Ys(n,e=1/0,t){if(e<=0||!un(n)||n.__v_skip||(t=t||new Map,(t.get(n)||0)>=e))return n;if(t.set(n,e),e--,jn(n))Ys(n.value,e,t);else if(Tt(n))for(let i=0;i<n.length;i++)Ys(n[i],e,t);else if(E0(n)||Bo(n))n.forEach(i=>{Ys(i,e,t)});else if(C0(n)){for(const i in n)Ys(n[i],e,t);for(const i of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,i)&&Ys(n[i],e,t)}return n}/**
* @vue/runtime-core v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function El(n,e,t,i){try{return i?n(...i):n()}catch(s){vu(s,e,t)}}function ki(n,e,t,i){if(Pt(n)){const s=El(n,e,t,i);return s&&T0(s)&&s.catch(r=>{vu(r,e,t)}),s}if(Tt(n)){const s=[];for(let r=0;r<n.length;r++)s.push(ki(n[r],e,t,i));return s}}function vu(n,e,t,i=!0){const s=e?e.vnode:null,{errorHandler:r,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||ln;if(e){let a=e.parent;const l=e.proxy,c=`https://vuejs.org/error-reference/#runtime-${t}`;for(;a;){const u=a.ec;if(u){for(let h=0;h<u.length;h++)if(u[h](n,l,c)===!1)return}a=a.parent}if(r){ys(),El(r,null,10,[n,l,c]),Ms();return}}Uv(n,t,s,i,o)}function Uv(n,e,t,i=!0,s=!1){if(s)throw n;console.error(n)}const si=[];let qi=-1;const zo=[];let zs=null,Uo=0;const $0=Promise.resolve();let $c=null;function Fv(n){const e=$c||$0;return n?e.then(this?n.bind(this):n):e}function Ov(n){let e=qi+1,t=si.length;for(;e<t;){const i=e+t>>>1,s=si[i],r=gl(s);r<n||r===n&&s.flags&2?e=i+1:t=i}return e}function yf(n){if(!(n.flags&1)){const e=gl(n),t=si[si.length-1];!t||!(n.flags&2)&&e>=gl(t)?si.push(n):si.splice(Ov(e),0,n),n.flags|=1,Z0()}}function Z0(){$c||($c=$0.then(J0))}function kv(n){Tt(n)?zo.push(...n):zs&&n.id===-1?zs.splice(Uo+1,0,n):n.flags&1||(zo.push(n),n.flags|=1),Z0()}function bp(n,e,t=qi+1){for(;t<si.length;t++){const i=si[t];if(i&&i.flags&2){if(n&&i.id!==n.uid)continue;si.splice(t,1),t--,i.flags&4&&(i.flags&=-2),i(),i.flags&4||(i.flags&=-2)}}}function j0(n){if(zo.length){const e=[...new Set(zo)].sort((t,i)=>gl(t)-gl(i));if(zo.length=0,zs){zs.push(...e);return}for(zs=e,Uo=0;Uo<zs.length;Uo++){const t=zs[Uo];t.flags&4&&(t.flags&=-2),t.flags&8||t(),t.flags&=-2}zs=null,Uo=0}}const gl=n=>n.id==null?n.flags&2?-1:1/0:n.id;function J0(n){try{for(qi=0;qi<si.length;qi++){const e=si[qi];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),El(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;qi<si.length;qi++){const e=si[qi];e&&(e.flags&=-2)}qi=-1,si.length=0,j0(),$c=null,(si.length||zo.length)&&J0()}}let Ni=null,Q0=null;function Zc(n){const e=Ni;return Ni=n,Q0=n&&n.type.__scopeId||null,e}function bu(n,e=Ni,t){if(!e||n._n)return n;const i=(...s)=>{i._d&&Qc(-1);const r=Zc(e);let o;try{o=n(...s)}finally{Zc(r),i._d&&Qc(1)}return o};return i._n=!0,i._c=!0,i._d=!0,i}function br(n,e,t,i){const s=n.dirs,r=e&&e.dirs;for(let o=0;o<s.length;o++){const a=s[o];r&&(a.oldValue=r[o].value);let l=a.dir[i];l&&(ys(),ki(l,t,8,[n.el,a,n,e]),Ms())}}const Bv=Symbol("_vte"),eg=n=>n.__isTeleport,_s=Symbol("_leaveCb"),$l=Symbol("_enterCb");function Gv(){const n={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return Su(()=>{n.isMounted=!0}),lg(()=>{n.isUnmounting=!0}),n}const Mi=[Function,Array],tg={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:Mi,onEnter:Mi,onAfterEnter:Mi,onEnterCancelled:Mi,onBeforeLeave:Mi,onLeave:Mi,onAfterLeave:Mi,onLeaveCancelled:Mi,onBeforeAppear:Mi,onAppear:Mi,onAfterAppear:Mi,onAppearCancelled:Mi},ng=n=>{const e=n.subTree;return e.component?ng(e.component):e},zv={name:"BaseTransition",props:tg,setup(n,{slots:e}){const t=Rg(),i=Gv();return()=>{const s=e.default&&rg(e.default(),!0);if(!s||!s.length)return;const r=ig(s),o=Yt(n),{mode:a}=o;if(i.isLeaving)return sd(r);const l=yp(r);if(!l)return sd(r);let c=ih(l,o,i,t,h=>c=h);l.type!==ri&&_l(l,c);let u=t.subTree&&yp(t.subTree);if(u&&u.type!==ri&&!Rr(u,l)&&ng(t).type!==ri){let h=ih(u,o,i,t);if(_l(u,h),a==="out-in"&&l.type!==ri)return i.isLeaving=!0,h.afterLeave=()=>{i.isLeaving=!1,t.job.flags&8||t.update(),delete h.afterLeave,u=void 0},sd(r);a==="in-out"&&l.type!==ri?h.delayLeave=(d,f,x)=>{const S=sg(i,u);S[String(u.key)]=u,d[_s]=()=>{f(),d[_s]=void 0,delete c.delayedLeave,u=void 0},c.delayedLeave=()=>{x(),delete c.delayedLeave,u=void 0}}:u=void 0}else u&&(u=void 0);return r}}};function ig(n){let e=n[0];if(n.length>1){for(const t of n)if(t.type!==ri){e=t;break}}return e}const Hv=zv;function sg(n,e){const{leavingVNodes:t}=n;let i=t.get(e.type);return i||(i=Object.create(null),t.set(e.type,i)),i}function ih(n,e,t,i,s){const{appear:r,mode:o,persisted:a=!1,onBeforeEnter:l,onEnter:c,onAfterEnter:u,onEnterCancelled:h,onBeforeLeave:d,onLeave:f,onAfterLeave:x,onLeaveCancelled:S,onBeforeAppear:m,onAppear:p,onAfterAppear:y,onAppearCancelled:R}=e,M=String(n.key),P=sg(t,n),T=(A,F)=>{A&&ki(A,i,9,F)},I=(A,F)=>{const k=F[1];T(A,F),Tt(A)?A.every(U=>U.length<=1)&&k():A.length<=1&&k()},v={mode:o,persisted:a,beforeEnter(A){let F=l;if(!t.isMounted)if(r)F=m||l;else return;A[_s]&&A[_s](!0);const k=P[M];k&&Rr(n,k)&&k.el[_s]&&k.el[_s](),T(F,[A])},enter(A){let F=c,k=u,U=h;if(!t.isMounted)if(r)F=p||c,k=y||u,U=R||h;else return;let ee=!1;const le=A[$l]=$=>{ee||(ee=!0,$?T(U,[A]):T(k,[A]),v.delayedLeave&&v.delayedLeave(),A[$l]=void 0)};F?I(F,[A,le]):le()},leave(A,F){const k=String(n.key);if(A[$l]&&A[$l](!0),t.isUnmounting)return F();T(d,[A]);let U=!1;const ee=A[_s]=le=>{U||(U=!0,F(),le?T(S,[A]):T(x,[A]),A[_s]=void 0,P[k]===n&&delete P[k])};P[k]=n,f?I(f,[A,ee]):ee()},clone(A){const F=ih(A,e,t,i,s);return s&&s(F),F}};return v}function sd(n){if(yu(n))return n=Js(n),n.children=null,n}function yp(n){if(!yu(n))return eg(n.type)&&n.children?ig(n.children):n;if(n.component)return n.component.subTree;const{shapeFlag:e,children:t}=n;if(t){if(e&16)return t[0];if(e&32&&Pt(t.default))return t.default()}}function _l(n,e){n.shapeFlag&6&&n.component?(n.transition=e,_l(n.component.subTree,e)):n.shapeFlag&128?(n.ssContent.transition=e.clone(n.ssContent),n.ssFallback.transition=e.clone(n.ssFallback)):n.transition=e}function rg(n,e=!1,t){let i=[],s=0;for(let r=0;r<n.length;r++){let o=n[r];const a=t==null?o.key:String(t)+String(o.key!=null?o.key:r);o.type===Vn?(o.patchFlag&128&&s++,i=i.concat(rg(o.children,e,a))):(e||o.type!==ri)&&i.push(a!=null?Js(o,{key:a}):o)}if(s>1)for(let r=0;r<i.length;r++)i[r].patchFlag=-2;return i}function zr(n,e){return Pt(n)?Gn({name:n.name},e,{setup:n}):n}function og(n){n.ids=[n.ids[0]+n.ids[2]+++"-",0,0]}const jc=new WeakMap;function cl(n,e,t,i,s=!1){if(Tt(n)){n.forEach((x,S)=>cl(x,e&&(Tt(e)?e[S]:e),t,i,s));return}if(ul(i)&&!s){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&cl(n,e,t,i.component.subTree);return}const r=i.shapeFlag&4?Tf(i.component):i.el,o=s?null:r,{i:a,r:l}=n,c=e&&e.r,u=a.refs===ln?a.refs={}:a.refs,h=a.setupState,d=Yt(h),f=h===ln?w0:x=>Kt(d,x);if(c!=null&&c!==l){if(Mp(e),bn(c))u[c]=null,f(c)&&(h[c]=null);else if(jn(c)){c.value=null;const x=e;x.k&&(u[x.k]=null)}}if(Pt(l))El(l,a,12,[o,u]);else{const x=bn(l),S=jn(l);if(x||S){const m=()=>{if(n.f){const p=x?f(l)?h[l]:u[l]:l.value;if(s)Tt(p)&&df(p,r);else if(Tt(p))p.includes(r)||p.push(r);else if(x)u[l]=[r],f(l)&&(h[l]=u[l]);else{const y=[r];l.value=y,n.k&&(u[n.k]=y)}}else x?(u[l]=o,f(l)&&(h[l]=o)):S&&(l.value=o,n.k&&(u[n.k]=o))};if(o){const p=()=>{m(),jc.delete(n)};p.id=-1,jc.set(n,p),pi(p,t)}else Mp(n),m()}}}function Mp(n){const e=jc.get(n);e&&(e.flags|=8,jc.delete(n))}_u().requestIdleCallback;_u().cancelIdleCallback;const ul=n=>!!n.type.__asyncLoader,yu=n=>n.type.__isKeepAlive;function Vv(n,e){ag(n,"a",e)}function Wv(n,e){ag(n,"da",e)}function ag(n,e,t=Zn){const i=n.__wdc||(n.__wdc=()=>{let s=t;for(;s;){if(s.isDeactivated)return;s=s.parent}return n()});if(Mu(e,i,t),t){let s=t.parent;for(;s&&s.parent;)yu(s.parent.vnode)&&Xv(i,e,t,s),s=s.parent}}function Xv(n,e,t,i){const s=Mu(e,n,i,!0);wu(()=>{df(i[e],s)},t)}function Mu(n,e,t=Zn,i=!1){if(t){const s=t[n]||(t[n]=[]),r=e.__weh||(e.__weh=(...o)=>{ys();const a=Tl(t),l=ki(e,t,n,o);return a(),Ms(),l});return i?s.unshift(r):s.push(r),r}}const Es=n=>(e,t=Zn)=>{(!vl||n==="sp")&&Mu(n,(...i)=>e(...i),t)},Yv=Es("bm"),Su=Es("m"),qv=Es("bu"),Kv=Es("u"),lg=Es("bum"),wu=Es("um"),$v=Es("sp"),Zv=Es("rtg"),jv=Es("rtc");function Jv(n,e=Zn){Mu("ec",n,e)}const Qv="components",cg=Symbol.for("v-ndc");function eb(n){return bn(n)?tb(Qv,n,!1)||n:n||cg}function tb(n,e,t=!0,i=!1){const s=Ni||Zn;if(s){const r=s.type;{const a=Vb(r,!1);if(a&&(a===e||a===Ai(e)||a===gu(Ai(e))))return r}const o=Sp(s[n]||r[n],e)||Sp(s.appContext[n],e);return!o&&i?r:o}}function Sp(n,e){return n&&(n[e]||n[Ai(e)]||n[gu(Ai(e))])}function Ba(n,e,t,i){let s;const r=t,o=Tt(n);if(o||bn(n)){const a=o&&Go(n);let l=!1,c=!1;a&&(l=!Ti(n),c=js(n),n=xu(n)),s=new Array(n.length);for(let u=0,h=n.length;u<h;u++)s[u]=e(l?c?qc(Wn(n[u])):Wn(n[u]):n[u],u,void 0,r)}else if(typeof n=="number"){s=new Array(n);for(let a=0;a<n;a++)s[a]=e(a+1,a,void 0,r)}else if(un(n))if(n[Symbol.iterator])s=Array.from(n,(a,l)=>e(a,l,void 0,r));else{const a=Object.keys(n);s=new Array(a.length);for(let l=0,c=a.length;l<c;l++){const u=a[l];s[l]=e(n[u],u,l,r)}}else s=[];return s}const sh=n=>n?Pg(n)?Tf(n):sh(n.parent):null,dl=Gn(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>sh(n.parent),$root:n=>sh(n.root),$host:n=>n.ce,$emit:n=>n.emit,$options:n=>dg(n),$forceUpdate:n=>n.f||(n.f=()=>{yf(n.update)}),$nextTick:n=>n.n||(n.n=Fv.bind(n.proxy)),$watch:n=>Sb.bind(n)}),rd=(n,e)=>n!==ln&&!n.__isScriptSetup&&Kt(n,e),nb={get({_:n},e){if(e==="__v_skip")return!0;const{ctx:t,setupState:i,data:s,props:r,accessCache:o,type:a,appContext:l}=n;let c;if(e[0]!=="$"){const f=o[e];if(f!==void 0)switch(f){case 1:return i[e];case 2:return s[e];case 4:return t[e];case 3:return r[e]}else{if(rd(i,e))return o[e]=1,i[e];if(s!==ln&&Kt(s,e))return o[e]=2,s[e];if((c=n.propsOptions[0])&&Kt(c,e))return o[e]=3,r[e];if(t!==ln&&Kt(t,e))return o[e]=4,t[e];rh&&(o[e]=0)}}const u=dl[e];let h,d;if(u)return e==="$attrs"&&$n(n.attrs,"get",""),u(n);if((h=a.__cssModules)&&(h=h[e]))return h;if(t!==ln&&Kt(t,e))return o[e]=4,t[e];if(d=l.config.globalProperties,Kt(d,e))return d[e]},set({_:n},e,t){const{data:i,setupState:s,ctx:r}=n;return rd(s,e)?(s[e]=t,!0):i!==ln&&Kt(i,e)?(i[e]=t,!0):Kt(n.props,e)||e[0]==="$"&&e.slice(1)in n?!1:(r[e]=t,!0)},has({_:{data:n,setupState:e,accessCache:t,ctx:i,appContext:s,propsOptions:r,type:o}},a){let l,c;return!!(t[a]||n!==ln&&a[0]!=="$"&&Kt(n,a)||rd(e,a)||(l=r[0])&&Kt(l,a)||Kt(i,a)||Kt(dl,a)||Kt(s.config.globalProperties,a)||(c=o.__cssModules)&&c[a])},defineProperty(n,e,t){return t.get!=null?n._.accessCache[e]=0:Kt(t,"value")&&this.set(n,e,t.value,null),Reflect.defineProperty(n,e,t)}};function wp(n){return Tt(n)?n.reduce((e,t)=>(e[t]=null,e),{}):n}let rh=!0;function ib(n){const e=dg(n),t=n.proxy,i=n.ctx;rh=!1,e.beforeCreate&&Ep(e.beforeCreate,n,"bc");const{data:s,computed:r,methods:o,watch:a,provide:l,inject:c,created:u,beforeMount:h,mounted:d,beforeUpdate:f,updated:x,activated:S,deactivated:m,beforeDestroy:p,beforeUnmount:y,destroyed:R,unmounted:M,render:P,renderTracked:T,renderTriggered:I,errorCaptured:v,serverPrefetch:A,expose:F,inheritAttrs:k,components:U,directives:ee,filters:le}=e;if(c&&sb(c,i,null),o)for(const Z in o){const ae=o[Z];Pt(ae)&&(i[Z]=ae.bind(t))}if(s){const Z=s.call(t,t);un(Z)&&(n.data=xf(Z))}if(rh=!0,r)for(const Z in r){const ae=r[Z],Te=Pt(ae)?ae.bind(t,t):Pt(ae.get)?ae.get.bind(t,t):Qi,He=!Pt(ae)&&Pt(ae.set)?ae.set.bind(t):Qi,Oe=Gs({get:Te,set:He});Object.defineProperty(i,Z,{enumerable:!0,configurable:!0,get:()=>Oe.value,set:J=>Oe.value=J})}if(a)for(const Z in a)ug(a[Z],i,t,Z);if(l){const Z=Pt(l)?l.call(t):l;Reflect.ownKeys(Z).forEach(ae=>{ub(ae,Z[ae])})}u&&Ep(u,n,"c");function se(Z,ae){Tt(ae)?ae.forEach(Te=>Z(Te.bind(t))):ae&&Z(ae.bind(t))}if(se(Yv,h),se(Su,d),se(qv,f),se(Kv,x),se(Vv,S),se(Wv,m),se(Jv,v),se(jv,T),se(Zv,I),se(lg,y),se(wu,M),se($v,A),Tt(F))if(F.length){const Z=n.exposed||(n.exposed={});F.forEach(ae=>{Object.defineProperty(Z,ae,{get:()=>t[ae],set:Te=>t[ae]=Te,enumerable:!0})})}else n.exposed||(n.exposed={});P&&n.render===Qi&&(n.render=P),k!=null&&(n.inheritAttrs=k),U&&(n.components=U),ee&&(n.directives=ee),A&&og(n)}function sb(n,e,t=Qi){Tt(n)&&(n=oh(n));for(const i in n){const s=n[i];let r;un(s)?"default"in s?r=Dc(s.from||i,s.default,!0):r=Dc(s.from||i):r=Dc(s),jn(r)?Object.defineProperty(e,i,{enumerable:!0,configurable:!0,get:()=>r.value,set:o=>r.value=o}):e[i]=r}}function Ep(n,e,t){ki(Tt(n)?n.map(i=>i.bind(e.proxy)):n.bind(e.proxy),e,t)}function ug(n,e,t,i){let s=i.includes(".")?wg(t,i):()=>t[i];if(bn(n)){const r=e[n];Pt(r)&&Ic(s,r)}else if(Pt(n))Ic(s,n.bind(t));else if(un(n))if(Tt(n))n.forEach(r=>ug(r,e,t,i));else{const r=Pt(n.handler)?n.handler.bind(t):e[n.handler];Pt(r)&&Ic(s,r,n)}}function dg(n){const e=n.type,{mixins:t,extends:i}=e,{mixins:s,optionsCache:r,config:{optionMergeStrategies:o}}=n.appContext,a=r.get(e);let l;return a?l=a:!s.length&&!t&&!i?l=e:(l={},s.length&&s.forEach(c=>Jc(l,c,o,!0)),Jc(l,e,o)),un(e)&&r.set(e,l),l}function Jc(n,e,t,i=!1){const{mixins:s,extends:r}=e;r&&Jc(n,r,t,!0),s&&s.forEach(o=>Jc(n,o,t,!0));for(const o in e)if(!(i&&o==="expose")){const a=rb[o]||t&&t[o];n[o]=a?a(n[o],e[o]):e[o]}return n}const rb={data:Tp,props:Ap,emits:Ap,methods:il,computed:il,beforeCreate:ni,created:ni,beforeMount:ni,mounted:ni,beforeUpdate:ni,updated:ni,beforeDestroy:ni,beforeUnmount:ni,destroyed:ni,unmounted:ni,activated:ni,deactivated:ni,errorCaptured:ni,serverPrefetch:ni,components:il,directives:il,watch:ab,provide:Tp,inject:ob};function Tp(n,e){return e?n?function(){return Gn(Pt(n)?n.call(this,this):n,Pt(e)?e.call(this,this):e)}:e:n}function ob(n,e){return il(oh(n),oh(e))}function oh(n){if(Tt(n)){const e={};for(let t=0;t<n.length;t++)e[n[t]]=n[t];return e}return n}function ni(n,e){return n?[...new Set([].concat(n,e))]:e}function il(n,e){return n?Gn(Object.create(null),n,e):e}function Ap(n,e){return n?Tt(n)&&Tt(e)?[...new Set([...n,...e])]:Gn(Object.create(null),wp(n),wp(e??{})):e}function ab(n,e){if(!n)return e;if(!e)return n;const t=Gn(Object.create(null),n);for(const i in e)t[i]=ni(n[i],e[i]);return t}function hg(){return{app:null,config:{isNativeTag:w0,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let lb=0;function cb(n,e){return function(i,s=null){Pt(i)||(i=Gn({},i)),s!=null&&!un(s)&&(s=null);const r=hg(),o=new WeakSet,a=[];let l=!1;const c=r.app={_uid:lb++,_component:i,_props:s,_container:null,_context:r,_instance:null,version:Xb,get config(){return r.config},set config(u){},use(u,...h){return o.has(u)||(u&&Pt(u.install)?(o.add(u),u.install(c,...h)):Pt(u)&&(o.add(u),u(c,...h))),c},mixin(u){return r.mixins.includes(u)||r.mixins.push(u),c},component(u,h){return h?(r.components[u]=h,c):r.components[u]},directive(u,h){return h?(r.directives[u]=h,c):r.directives[u]},mount(u,h,d){if(!l){const f=c._ceVNode||Ft(i,s);return f.appContext=r,d===!0?d="svg":d===!1&&(d=void 0),n(f,u,d),l=!0,c._container=u,u.__vue_app__=c,Tf(f.component)}},onUnmount(u){a.push(u)},unmount(){l&&(ki(a,c._instance,16),n(null,c._container),delete c._container.__vue_app__)},provide(u,h){return r.provides[u]=h,c},runWithContext(u){const h=Ho;Ho=c;try{return u()}finally{Ho=h}}};return c}}let Ho=null;function ub(n,e){if(Zn){let t=Zn.provides;const i=Zn.parent&&Zn.parent.provides;i===t&&(t=Zn.provides=Object.create(i)),t[n]=e}}function Dc(n,e,t=!1){const i=Rg();if(i||Ho){let s=Ho?Ho._context.provides:i?i.parent==null||i.ce?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(s&&n in s)return s[n];if(arguments.length>1)return t&&Pt(e)?e.call(i&&i.proxy):e}}const fg={},pg=()=>Object.create(fg),mg=n=>Object.getPrototypeOf(n)===fg;function db(n,e,t,i=!1){const s={},r=pg();n.propsDefaults=Object.create(null),gg(n,e,s,r);for(const o in n.propsOptions[0])o in s||(s[o]=void 0);t?n.props=i?s:Tv(s):n.type.props?n.props=s:n.props=r,n.attrs=r}function hb(n,e,t,i){const{props:s,attrs:r,vnode:{patchFlag:o}}=n,a=Yt(s),[l]=n.propsOptions;let c=!1;if((i||o>0)&&!(o&16)){if(o&8){const u=n.vnode.dynamicProps;for(let h=0;h<u.length;h++){let d=u[h];if(Eu(n.emitsOptions,d))continue;const f=e[d];if(l)if(Kt(r,d))f!==r[d]&&(r[d]=f,c=!0);else{const x=Ai(d);s[x]=ah(l,a,x,f,n,!1)}else f!==r[d]&&(r[d]=f,c=!0)}}}else{gg(n,e,s,r)&&(c=!0);let u;for(const h in a)(!e||!Kt(e,h)&&((u=Gr(h))===h||!Kt(e,u)))&&(l?t&&(t[h]!==void 0||t[u]!==void 0)&&(s[h]=ah(l,a,h,void 0,n,!0)):delete s[h]);if(r!==a)for(const h in r)(!e||!Kt(e,h))&&(delete r[h],c=!0)}c&&xs(n.attrs,"set","")}function gg(n,e,t,i){const[s,r]=n.propsOptions;let o=!1,a;if(e)for(let l in e){if(ol(l))continue;const c=e[l];let u;s&&Kt(s,u=Ai(l))?!r||!r.includes(u)?t[u]=c:(a||(a={}))[u]=c:Eu(n.emitsOptions,l)||(!(l in i)||c!==i[l])&&(i[l]=c,o=!0)}if(r){const l=Yt(t),c=a||ln;for(let u=0;u<r.length;u++){const h=r[u];t[h]=ah(s,l,h,c[h],n,!Kt(c,h))}}return o}function ah(n,e,t,i,s,r){const o=n[t];if(o!=null){const a=Kt(o,"default");if(a&&i===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&Pt(l)){const{propsDefaults:c}=s;if(t in c)i=c[t];else{const u=Tl(s);i=c[t]=l.call(null,e),u()}}else i=l;s.ce&&s.ce._setProp(t,i)}o[0]&&(r&&!a?i=!1:o[1]&&(i===""||i===Gr(t))&&(i=!0))}return i}const fb=new WeakMap;function _g(n,e,t=!1){const i=t?fb:e.propsCache,s=i.get(n);if(s)return s;const r=n.props,o={},a=[];let l=!1;if(!Pt(n)){const u=h=>{l=!0;const[d,f]=_g(h,e,!0);Gn(o,d),f&&a.push(...f)};!t&&e.mixins.length&&e.mixins.forEach(u),n.extends&&u(n.extends),n.mixins&&n.mixins.forEach(u)}if(!r&&!l)return un(n)&&i.set(n,ko),ko;if(Tt(r))for(let u=0;u<r.length;u++){const h=Ai(r[u]);Cp(h)&&(o[h]=ln)}else if(r)for(const u in r){const h=Ai(u);if(Cp(h)){const d=r[u],f=o[h]=Tt(d)||Pt(d)?{type:d}:Gn({},d),x=f.type;let S=!1,m=!0;if(Tt(x))for(let p=0;p<x.length;++p){const y=x[p],R=Pt(y)&&y.name;if(R==="Boolean"){S=!0;break}else R==="String"&&(m=!1)}else S=Pt(x)&&x.name==="Boolean";f[0]=S,f[1]=m,(S||Kt(f,"default"))&&a.push(h)}}const c=[o,a];return un(n)&&i.set(n,c),c}function Cp(n){return n[0]!=="$"&&!ol(n)}const Mf=n=>n==="_"||n==="_ctx"||n==="$stable",Sf=n=>Tt(n)?n.map(Ki):[Ki(n)],pb=(n,e,t)=>{if(e._n)return e;const i=bu((...s)=>Sf(e(...s)),t);return i._c=!1,i},xg=(n,e,t)=>{const i=n._ctx;for(const s in n){if(Mf(s))continue;const r=n[s];if(Pt(r))e[s]=pb(s,r,i);else if(r!=null){const o=Sf(r);e[s]=()=>o}}},vg=(n,e)=>{const t=Sf(e);n.slots.default=()=>t},bg=(n,e,t)=>{for(const i in e)(t||!Mf(i))&&(n[i]=e[i])},mb=(n,e,t)=>{const i=n.slots=pg();if(n.vnode.shapeFlag&32){const s=e._;s?(bg(i,e,t),t&&R0(i,"_",s,!0)):xg(e,i)}else e&&vg(n,e)},gb=(n,e,t)=>{const{vnode:i,slots:s}=n;let r=!0,o=ln;if(i.shapeFlag&32){const a=e._;a?t&&a===1?r=!1:bg(s,e,t):(r=!e.$stable,xg(e,s)),o=e}else e&&(vg(n,e),o={default:1});if(r)for(const a in s)!Mf(a)&&o[a]==null&&delete s[a]},pi=Db;function _b(n){return xb(n)}function xb(n,e){const t=_u();t.__VUE__=!0;const{insert:i,remove:s,patchProp:r,createElement:o,createText:a,createComment:l,setText:c,setElementText:u,parentNode:h,nextSibling:d,setScopeId:f=Qi,insertStaticContent:x}=n,S=(O,B,ie,he=null,ce=null,_e=null,Pe=void 0,Re=null,Ee=!!B.dynamicChildren)=>{if(O===B)return;O&&!Rr(O,B)&&(he=Fe(O),J(O,ce,_e,!0),O=null),B.patchFlag===-2&&(Ee=!1,B.dynamicChildren=null);const{type:xe,ref:Ke,shapeFlag:N}=B;switch(xe){case Tu:m(O,B,ie,he);break;case ri:p(O,B,ie,he);break;case ad:O==null&&y(B,ie,he,Pe);break;case Vn:U(O,B,ie,he,ce,_e,Pe,Re,Ee);break;default:N&1?P(O,B,ie,he,ce,_e,Pe,Re,Ee):N&6?ee(O,B,ie,he,ce,_e,Pe,Re,Ee):(N&64||N&128)&&xe.process(O,B,ie,he,ce,_e,Pe,Re,Ee,_t)}Ke!=null&&ce?cl(Ke,O&&O.ref,_e,B||O,!B):Ke==null&&O&&O.ref!=null&&cl(O.ref,null,_e,O,!0)},m=(O,B,ie,he)=>{if(O==null)i(B.el=a(B.children),ie,he);else{const ce=B.el=O.el;B.children!==O.children&&c(ce,B.children)}},p=(O,B,ie,he)=>{O==null?i(B.el=l(B.children||""),ie,he):B.el=O.el},y=(O,B,ie,he)=>{[O.el,O.anchor]=x(O.children,B,ie,he,O.el,O.anchor)},R=({el:O,anchor:B},ie,he)=>{let ce;for(;O&&O!==B;)ce=d(O),i(O,ie,he),O=ce;i(B,ie,he)},M=({el:O,anchor:B})=>{let ie;for(;O&&O!==B;)ie=d(O),s(O),O=ie;s(B)},P=(O,B,ie,he,ce,_e,Pe,Re,Ee)=>{B.type==="svg"?Pe="svg":B.type==="math"&&(Pe="mathml"),O==null?T(B,ie,he,ce,_e,Pe,Re,Ee):A(O,B,ce,_e,Pe,Re,Ee)},T=(O,B,ie,he,ce,_e,Pe,Re)=>{let Ee,xe;const{props:Ke,shapeFlag:N,transition:$e,dirs:Xe}=O;if(Ee=O.el=o(O.type,_e,Ke&&Ke.is,Ke),N&8?u(Ee,O.children):N&16&&v(O.children,Ee,null,he,ce,od(O,_e),Pe,Re),Xe&&br(O,null,he,"created"),I(Ee,O,O.scopeId,Pe,he),Ke){for(const _ in Ke)_!=="value"&&!ol(_)&&r(Ee,_,null,Ke[_],_e,he);"value"in Ke&&r(Ee,"value",null,Ke.value,_e),(xe=Ke.onVnodeBeforeMount)&&Wi(xe,he,O)}Xe&&br(O,null,he,"beforeMount");const C=vb(ce,$e);C&&$e.beforeEnter(Ee),i(Ee,B,ie),((xe=Ke&&Ke.onVnodeMounted)||C||Xe)&&pi(()=>{xe&&Wi(xe,he,O),C&&$e.enter(Ee),Xe&&br(O,null,he,"mounted")},ce)},I=(O,B,ie,he,ce)=>{if(ie&&f(O,ie),he)for(let _e=0;_e<he.length;_e++)f(O,he[_e]);if(ce){let _e=ce.subTree;if(B===_e||Tg(_e.type)&&(_e.ssContent===B||_e.ssFallback===B)){const Pe=ce.vnode;I(O,Pe,Pe.scopeId,Pe.slotScopeIds,ce.parent)}}},v=(O,B,ie,he,ce,_e,Pe,Re,Ee=0)=>{for(let xe=Ee;xe<O.length;xe++){const Ke=O[xe]=Re?Vs(O[xe]):Ki(O[xe]);S(null,Ke,B,ie,he,ce,_e,Pe,Re)}},A=(O,B,ie,he,ce,_e,Pe)=>{const Re=B.el=O.el;let{patchFlag:Ee,dynamicChildren:xe,dirs:Ke}=B;Ee|=O.patchFlag&16;const N=O.props||ln,$e=B.props||ln;let Xe;if(ie&&yr(ie,!1),(Xe=$e.onVnodeBeforeUpdate)&&Wi(Xe,ie,B,O),Ke&&br(B,O,ie,"beforeUpdate"),ie&&yr(ie,!0),(N.innerHTML&&$e.innerHTML==null||N.textContent&&$e.textContent==null)&&u(Re,""),xe?F(O.dynamicChildren,xe,Re,ie,he,od(B,ce),_e):Pe||ae(O,B,Re,null,ie,he,od(B,ce),_e,!1),Ee>0){if(Ee&16)k(Re,N,$e,ie,ce);else if(Ee&2&&N.class!==$e.class&&r(Re,"class",null,$e.class,ce),Ee&4&&r(Re,"style",N.style,$e.style,ce),Ee&8){const C=B.dynamicProps;for(let _=0;_<C.length;_++){const W=C[_],j=N[W],re=$e[W];(re!==j||W==="value")&&r(Re,W,j,re,ce,ie)}}Ee&1&&O.children!==B.children&&u(Re,B.children)}else!Pe&&xe==null&&k(Re,N,$e,ie,ce);((Xe=$e.onVnodeUpdated)||Ke)&&pi(()=>{Xe&&Wi(Xe,ie,B,O),Ke&&br(B,O,ie,"updated")},he)},F=(O,B,ie,he,ce,_e,Pe)=>{for(let Re=0;Re<B.length;Re++){const Ee=O[Re],xe=B[Re],Ke=Ee.el&&(Ee.type===Vn||!Rr(Ee,xe)||Ee.shapeFlag&198)?h(Ee.el):ie;S(Ee,xe,Ke,null,he,ce,_e,Pe,!0)}},k=(O,B,ie,he,ce)=>{if(B!==ie){if(B!==ln)for(const _e in B)!ol(_e)&&!(_e in ie)&&r(O,_e,B[_e],null,ce,he);for(const _e in ie){if(ol(_e))continue;const Pe=ie[_e],Re=B[_e];Pe!==Re&&_e!=="value"&&r(O,_e,Re,Pe,ce,he)}"value"in ie&&r(O,"value",B.value,ie.value,ce)}},U=(O,B,ie,he,ce,_e,Pe,Re,Ee)=>{const xe=B.el=O?O.el:a(""),Ke=B.anchor=O?O.anchor:a("");let{patchFlag:N,dynamicChildren:$e,slotScopeIds:Xe}=B;Xe&&(Re=Re?Re.concat(Xe):Xe),O==null?(i(xe,ie,he),i(Ke,ie,he),v(B.children||[],ie,Ke,ce,_e,Pe,Re,Ee)):N>0&&N&64&&$e&&O.dynamicChildren?(F(O.dynamicChildren,$e,ie,ce,_e,Pe,Re),(B.key!=null||ce&&B===ce.subTree)&&yg(O,B,!0)):ae(O,B,ie,Ke,ce,_e,Pe,Re,Ee)},ee=(O,B,ie,he,ce,_e,Pe,Re,Ee)=>{B.slotScopeIds=Re,O==null?B.shapeFlag&512?ce.ctx.activate(B,ie,he,Pe,Ee):le(B,ie,he,ce,_e,Pe,Ee):$(O,B,Ee)},le=(O,B,ie,he,ce,_e,Pe)=>{const Re=O.component=kb(O,he,ce);if(yu(O)&&(Re.ctx.renderer=_t),Bb(Re,!1,Pe),Re.asyncDep){if(ce&&ce.registerDep(Re,se,Pe),!O.el){const Ee=Re.subTree=Ft(ri);p(null,Ee,B,ie),O.placeholder=Ee.el}}else se(Re,O,B,ie,ce,_e,Pe)},$=(O,B,ie)=>{const he=B.component=O.component;if(Rb(O,B,ie))if(he.asyncDep&&!he.asyncResolved){Z(he,B,ie);return}else he.next=B,he.update();else B.el=O.el,he.vnode=B},se=(O,B,ie,he,ce,_e,Pe)=>{const Re=()=>{if(O.isMounted){let{next:N,bu:$e,u:Xe,parent:C,vnode:_}=O;{const Ne=Mg(O);if(Ne){N&&(N.el=_.el,Z(O,N,Pe)),Ne.asyncDep.then(()=>{O.isUnmounted||Re()});return}}let W=N,j;yr(O,!1),N?(N.el=_.el,Z(O,N,Pe)):N=_,$e&&Qu($e),(j=N.props&&N.props.onVnodeBeforeUpdate)&&Wi(j,C,N,_),yr(O,!0);const re=Pp(O),Ce=O.subTree;O.subTree=re,S(Ce,re,h(Ce.el),Fe(Ce),O,ce,_e),N.el=re.el,W===null&&Pb(O,re.el),Xe&&pi(Xe,ce),(j=N.props&&N.props.onVnodeUpdated)&&pi(()=>Wi(j,C,N,_),ce)}else{let N;const{el:$e,props:Xe}=B,{bm:C,m:_,parent:W,root:j,type:re}=O,Ce=ul(B);yr(O,!1),C&&Qu(C),!Ce&&(N=Xe&&Xe.onVnodeBeforeMount)&&Wi(N,W,B),yr(O,!0);{j.ce&&j.ce._def.shadowRoot!==!1&&j.ce._injectChildStyle(re);const Ne=O.subTree=Pp(O);S(null,Ne,ie,he,O,ce,_e),B.el=Ne.el}if(_&&pi(_,ce),!Ce&&(N=Xe&&Xe.onVnodeMounted)){const Ne=B;pi(()=>Wi(N,W,Ne),ce)}(B.shapeFlag&256||W&&ul(W.vnode)&&W.vnode.shapeFlag&256)&&O.a&&pi(O.a,ce),O.isMounted=!0,B=ie=he=null}};O.scope.on();const Ee=O.effect=new L0(Re);O.scope.off();const xe=O.update=Ee.run.bind(Ee),Ke=O.job=Ee.runIfDirty.bind(Ee);Ke.i=O,Ke.id=O.uid,Ee.scheduler=()=>yf(Ke),yr(O,!0),xe()},Z=(O,B,ie)=>{B.component=O;const he=O.vnode.props;O.vnode=B,O.next=null,hb(O,B.props,he,ie),gb(O,B.children,ie),ys(),bp(O),Ms()},ae=(O,B,ie,he,ce,_e,Pe,Re,Ee=!1)=>{const xe=O&&O.children,Ke=O?O.shapeFlag:0,N=B.children,{patchFlag:$e,shapeFlag:Xe}=B;if($e>0){if($e&128){He(xe,N,ie,he,ce,_e,Pe,Re,Ee);return}else if($e&256){Te(xe,N,ie,he,ce,_e,Pe,Re,Ee);return}}Xe&8?(Ke&16&&pe(xe,ce,_e),N!==xe&&u(ie,N)):Ke&16?Xe&16?He(xe,N,ie,he,ce,_e,Pe,Re,Ee):pe(xe,ce,_e,!0):(Ke&8&&u(ie,""),Xe&16&&v(N,ie,he,ce,_e,Pe,Re,Ee))},Te=(O,B,ie,he,ce,_e,Pe,Re,Ee)=>{O=O||ko,B=B||ko;const xe=O.length,Ke=B.length,N=Math.min(xe,Ke);let $e;for($e=0;$e<N;$e++){const Xe=B[$e]=Ee?Vs(B[$e]):Ki(B[$e]);S(O[$e],Xe,ie,null,ce,_e,Pe,Re,Ee)}xe>Ke?pe(O,ce,_e,!0,!1,N):v(B,ie,he,ce,_e,Pe,Re,Ee,N)},He=(O,B,ie,he,ce,_e,Pe,Re,Ee)=>{let xe=0;const Ke=B.length;let N=O.length-1,$e=Ke-1;for(;xe<=N&&xe<=$e;){const Xe=O[xe],C=B[xe]=Ee?Vs(B[xe]):Ki(B[xe]);if(Rr(Xe,C))S(Xe,C,ie,null,ce,_e,Pe,Re,Ee);else break;xe++}for(;xe<=N&&xe<=$e;){const Xe=O[N],C=B[$e]=Ee?Vs(B[$e]):Ki(B[$e]);if(Rr(Xe,C))S(Xe,C,ie,null,ce,_e,Pe,Re,Ee);else break;N--,$e--}if(xe>N){if(xe<=$e){const Xe=$e+1,C=Xe<Ke?B[Xe].el:he;for(;xe<=$e;)S(null,B[xe]=Ee?Vs(B[xe]):Ki(B[xe]),ie,C,ce,_e,Pe,Re,Ee),xe++}}else if(xe>$e)for(;xe<=N;)J(O[xe],ce,_e,!0),xe++;else{const Xe=xe,C=xe,_=new Map;for(xe=C;xe<=$e;xe++){const Le=B[xe]=Ee?Vs(B[xe]):Ki(B[xe]);Le.key!=null&&_.set(Le.key,xe)}let W,j=0;const re=$e-C+1;let Ce=!1,Ne=0;const ue=new Array(re);for(xe=0;xe<re;xe++)ue[xe]=0;for(xe=Xe;xe<=N;xe++){const Le=O[xe];if(j>=re){J(Le,ce,_e,!0);continue}let Je;if(Le.key!=null)Je=_.get(Le.key);else for(W=C;W<=$e;W++)if(ue[W-C]===0&&Rr(Le,B[W])){Je=W;break}Je===void 0?J(Le,ce,_e,!0):(ue[Je-C]=xe+1,Je>=Ne?Ne=Je:Ce=!0,S(Le,B[Je],ie,null,ce,_e,Pe,Re,Ee),j++)}const fe=Ce?bb(ue):ko;for(W=fe.length-1,xe=re-1;xe>=0;xe--){const Le=C+xe,Je=B[Le],Ge=B[Le+1],ke=Le+1<Ke?Ge.el||Ge.placeholder:he;ue[xe]===0?S(null,Je,ie,ke,ce,_e,Pe,Re,Ee):Ce&&(W<0||xe!==fe[W]?Oe(Je,ie,ke,2):W--)}}},Oe=(O,B,ie,he,ce=null)=>{const{el:_e,type:Pe,transition:Re,children:Ee,shapeFlag:xe}=O;if(xe&6){Oe(O.component.subTree,B,ie,he);return}if(xe&128){O.suspense.move(B,ie,he);return}if(xe&64){Pe.move(O,B,ie,_t);return}if(Pe===Vn){i(_e,B,ie);for(let N=0;N<Ee.length;N++)Oe(Ee[N],B,ie,he);i(O.anchor,B,ie);return}if(Pe===ad){R(O,B,ie);return}if(he!==2&&xe&1&&Re)if(he===0)Re.beforeEnter(_e),i(_e,B,ie),pi(()=>Re.enter(_e),ce);else{const{leave:N,delayLeave:$e,afterLeave:Xe}=Re,C=()=>{O.ctx.isUnmounted?s(_e):i(_e,B,ie)},_=()=>{_e._isLeaving&&_e[_s](!0),N(_e,()=>{C(),Xe&&Xe()})};$e?$e(_e,C,_):_()}else i(_e,B,ie)},J=(O,B,ie,he=!1,ce=!1)=>{const{type:_e,props:Pe,ref:Re,children:Ee,dynamicChildren:xe,shapeFlag:Ke,patchFlag:N,dirs:$e,cacheIndex:Xe}=O;if(N===-2&&(ce=!1),Re!=null&&(ys(),cl(Re,null,ie,O,!0),Ms()),Xe!=null&&(B.renderCache[Xe]=void 0),Ke&256){B.ctx.deactivate(O);return}const C=Ke&1&&$e,_=!ul(O);let W;if(_&&(W=Pe&&Pe.onVnodeBeforeUnmount)&&Wi(W,B,O),Ke&6)pt(O.component,ie,he);else{if(Ke&128){O.suspense.unmount(ie,he);return}C&&br(O,null,B,"beforeUnmount"),Ke&64?O.type.remove(O,B,ie,_t,he):xe&&!xe.hasOnce&&(_e!==Vn||N>0&&N&64)?pe(xe,B,ie,!1,!0):(_e===Vn&&N&384||!ce&&Ke&16)&&pe(Ee,B,ie),he&&be(O)}(_&&(W=Pe&&Pe.onVnodeUnmounted)||C)&&pi(()=>{W&&Wi(W,B,O),C&&br(O,null,B,"unmounted")},ie)},be=O=>{const{type:B,el:ie,anchor:he,transition:ce}=O;if(B===Vn){gt(ie,he);return}if(B===ad){M(O);return}const _e=()=>{s(ie),ce&&!ce.persisted&&ce.afterLeave&&ce.afterLeave()};if(O.shapeFlag&1&&ce&&!ce.persisted){const{leave:Pe,delayLeave:Re}=ce,Ee=()=>Pe(ie,_e);Re?Re(O.el,_e,Ee):Ee()}else _e()},gt=(O,B)=>{let ie;for(;O!==B;)ie=d(O),s(O),O=ie;s(B)},pt=(O,B,ie)=>{const{bum:he,scope:ce,job:_e,subTree:Pe,um:Re,m:Ee,a:xe}=O;Rp(Ee),Rp(xe),he&&Qu(he),ce.stop(),_e&&(_e.flags|=8,J(Pe,O,B,ie)),Re&&pi(Re,B),pi(()=>{O.isUnmounted=!0},B)},pe=(O,B,ie,he=!1,ce=!1,_e=0)=>{for(let Pe=_e;Pe<O.length;Pe++)J(O[Pe],B,ie,he,ce)},Fe=O=>{if(O.shapeFlag&6)return Fe(O.component.subTree);if(O.shapeFlag&128)return O.suspense.next();const B=d(O.anchor||O.el),ie=B&&B[Bv];return ie?d(ie):B};let Ie=!1;const ht=(O,B,ie)=>{O==null?B._vnode&&J(B._vnode,null,null,!0):S(B._vnode||null,O,B,null,null,null,ie),B._vnode=O,Ie||(Ie=!0,bp(),j0(),Ie=!1)},_t={p:S,um:J,m:Oe,r:be,mt:le,mc:v,pc:ae,pbc:F,n:Fe,o:n};return{render:ht,hydrate:void 0,createApp:cb(ht)}}function od({type:n,props:e},t){return t==="svg"&&n==="foreignObject"||t==="mathml"&&n==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:t}function yr({effect:n,job:e},t){t?(n.flags|=32,e.flags|=4):(n.flags&=-33,e.flags&=-5)}function vb(n,e){return(!n||n&&!n.pendingBranch)&&e&&!e.persisted}function yg(n,e,t=!1){const i=n.children,s=e.children;if(Tt(i)&&Tt(s))for(let r=0;r<i.length;r++){const o=i[r];let a=s[r];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=s[r]=Vs(s[r]),a.el=o.el),!t&&a.patchFlag!==-2&&yg(o,a)),a.type===Tu&&a.patchFlag!==-1&&(a.el=o.el),a.type===ri&&!a.el&&(a.el=o.el)}}function bb(n){const e=n.slice(),t=[0];let i,s,r,o,a;const l=n.length;for(i=0;i<l;i++){const c=n[i];if(c!==0){if(s=t[t.length-1],n[s]<c){e[i]=s,t.push(i);continue}for(r=0,o=t.length-1;r<o;)a=r+o>>1,n[t[a]]<c?r=a+1:o=a;c<n[t[r]]&&(r>0&&(e[i]=t[r-1]),t[r]=i)}}for(r=t.length,o=t[r-1];r-- >0;)t[r]=o,o=e[o];return t}function Mg(n){const e=n.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:Mg(e)}function Rp(n){if(n)for(let e=0;e<n.length;e++)n[e].flags|=8}const yb=Symbol.for("v-scx"),Mb=()=>Dc(yb);function Ic(n,e,t){return Sg(n,e,t)}function Sg(n,e,t=ln){const{immediate:i,deep:s,flush:r,once:o}=t,a=Gn({},t),l=e&&i||!e&&r!=="post";let c;if(vl){if(r==="sync"){const f=Mb();c=f.__watcherHandles||(f.__watcherHandles=[])}else if(!l){const f=()=>{};return f.stop=Qi,f.resume=Qi,f.pause=Qi,f}}const u=Zn;a.call=(f,x,S)=>ki(f,u,x,S);let h=!1;r==="post"?a.scheduler=f=>{pi(f,u&&u.suspense)}:r!=="sync"&&(h=!0,a.scheduler=(f,x)=>{x?f():yf(f)}),a.augmentJob=f=>{e&&(f.flags|=4),h&&(f.flags|=2,u&&(f.id=u.uid,f.i=u))};const d=Nv(n,e,a);return vl&&(c?c.push(d):l&&d()),d}function Sb(n,e,t){const i=this.proxy,s=bn(n)?n.includes(".")?wg(i,n):()=>i[n]:n.bind(i,i);let r;Pt(e)?r=e:(r=e.handler,t=e);const o=Tl(this),a=Sg(s,r.bind(i),t);return o(),a}function wg(n,e){const t=e.split(".");return()=>{let i=n;for(let s=0;s<t.length&&i;s++)i=i[t[s]];return i}}const wb=(n,e)=>e==="modelValue"||e==="model-value"?n.modelModifiers:n[`${e}Modifiers`]||n[`${Ai(e)}Modifiers`]||n[`${Gr(e)}Modifiers`];function Eb(n,e,...t){if(n.isUnmounted)return;const i=n.vnode.props||ln;let s=t;const r=e.startsWith("update:"),o=r&&wb(i,e.slice(7));o&&(o.trim&&(s=t.map(u=>bn(u)?u.trim():u)),o.number&&(s=t.map(Jx)));let a,l=i[a=Ju(e)]||i[a=Ju(Ai(e))];!l&&r&&(l=i[a=Ju(Gr(e))]),l&&ki(l,n,6,s);const c=i[a+"Once"];if(c){if(!n.emitted)n.emitted={};else if(n.emitted[a])return;n.emitted[a]=!0,ki(c,n,6,s)}}const Tb=new WeakMap;function Eg(n,e,t=!1){const i=t?Tb:e.emitsCache,s=i.get(n);if(s!==void 0)return s;const r=n.emits;let o={},a=!1;if(!Pt(n)){const l=c=>{const u=Eg(c,e,!0);u&&(a=!0,Gn(o,u))};!t&&e.mixins.length&&e.mixins.forEach(l),n.extends&&l(n.extends),n.mixins&&n.mixins.forEach(l)}return!r&&!a?(un(n)&&i.set(n,null),null):(Tt(r)?r.forEach(l=>o[l]=null):Gn(o,r),un(n)&&i.set(n,o),o)}function Eu(n,e){return!n||!fu(e)?!1:(e=e.slice(2).replace(/Once$/,""),Kt(n,e[0].toLowerCase()+e.slice(1))||Kt(n,Gr(e))||Kt(n,e))}function Pp(n){const{type:e,vnode:t,proxy:i,withProxy:s,propsOptions:[r],slots:o,attrs:a,emit:l,render:c,renderCache:u,props:h,data:d,setupState:f,ctx:x,inheritAttrs:S}=n,m=Zc(n);let p,y;try{if(t.shapeFlag&4){const M=s||i,P=M;p=Ki(c.call(P,M,u,h,f,d,x)),y=a}else{const M=e;p=Ki(M.length>1?M(h,{attrs:a,slots:o,emit:l}):M(h,null)),y=e.props?a:Ab(a)}}catch(M){hl.length=0,vu(M,n,1),p=Ft(ri)}let R=p;if(y&&S!==!1){const M=Object.keys(y),{shapeFlag:P}=R;M.length&&P&7&&(r&&M.some(uf)&&(y=Cb(y,r)),R=Js(R,y,!1,!0))}return t.dirs&&(R=Js(R,null,!1,!0),R.dirs=R.dirs?R.dirs.concat(t.dirs):t.dirs),t.transition&&_l(R,t.transition),p=R,Zc(m),p}const Ab=n=>{let e;for(const t in n)(t==="class"||t==="style"||fu(t))&&((e||(e={}))[t]=n[t]);return e},Cb=(n,e)=>{const t={};for(const i in n)(!uf(i)||!(i.slice(9)in e))&&(t[i]=n[i]);return t};function Rb(n,e,t){const{props:i,children:s,component:r}=n,{props:o,children:a,patchFlag:l}=e,c=r.emitsOptions;if(e.dirs||e.transition)return!0;if(t&&l>=0){if(l&1024)return!0;if(l&16)return i?Dp(i,o,c):!!o;if(l&8){const u=e.dynamicProps;for(let h=0;h<u.length;h++){const d=u[h];if(o[d]!==i[d]&&!Eu(c,d))return!0}}}else return(s||a)&&(!a||!a.$stable)?!0:i===o?!1:i?o?Dp(i,o,c):!0:!!o;return!1}function Dp(n,e,t){const i=Object.keys(e);if(i.length!==Object.keys(n).length)return!0;for(let s=0;s<i.length;s++){const r=i[s];if(e[r]!==n[r]&&!Eu(t,r))return!0}return!1}function Pb({vnode:n,parent:e},t){for(;e;){const i=e.subTree;if(i.suspense&&i.suspense.activeBranch===n&&(i.el=n.el),i===n)(n=e.vnode).el=t,e=e.parent;else break}}const Tg=n=>n.__isSuspense;function Db(n,e){e&&e.pendingBranch?Tt(n)?e.effects.push(...n):e.effects.push(n):kv(n)}const Vn=Symbol.for("v-fgt"),Tu=Symbol.for("v-txt"),ri=Symbol.for("v-cmt"),ad=Symbol.for("v-stc"),hl=[];let vi=null;function on(n=!1){hl.push(vi=n?null:[])}function Ib(){hl.pop(),vi=hl[hl.length-1]||null}let xl=1;function Qc(n,e=!1){xl+=n,n<0&&vi&&e&&(vi.hasOnce=!0)}function Ag(n){return n.dynamicChildren=xl>0?vi||ko:null,Ib(),xl>0&&vi&&vi.push(n),n}function fn(n,e,t,i,s,r){return Ag(we(n,e,t,i,s,r,!0))}function wf(n,e,t,i,s){return Ag(Ft(n,e,t,i,s,!0))}function eu(n){return n?n.__v_isVNode===!0:!1}function Rr(n,e){return n.type===e.type&&n.key===e.key}const Cg=({key:n})=>n??null,Lc=({ref:n,ref_key:e,ref_for:t})=>(typeof n=="number"&&(n=""+n),n!=null?bn(n)||jn(n)||Pt(n)?{i:Ni,r:n,k:e,f:!!t}:n:null);function we(n,e=null,t=null,i=0,s=null,r=n===Vn?0:1,o=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:n,props:e,key:e&&Cg(e),ref:e&&Lc(e),scopeId:Q0,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:i,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:Ni};return a?(Ef(l,t),r&128&&n.normalize(l)):t&&(l.shapeFlag|=bn(t)?8:16),xl>0&&!o&&vi&&(l.patchFlag>0||r&6)&&l.patchFlag!==32&&vi.push(l),l}const Ft=Lb;function Lb(n,e=null,t=null,i=0,s=null,r=!1){if((!n||n===cg)&&(n=ri),eu(n)){const a=Js(n,e,!0);return t&&Ef(a,t),xl>0&&!r&&vi&&(a.shapeFlag&6?vi[vi.indexOf(n)]=a:vi.push(a)),a.patchFlag=-2,a}if(Wb(n)&&(n=n.__vccOpts),e){e=Nb(e);let{class:a,style:l}=e;a&&!bn(a)&&(e.class=Ko(a)),un(l)&&(bf(l)&&!Tt(l)&&(l=Gn({},l)),e.style=Or(l))}const o=bn(n)?1:Tg(n)?128:eg(n)?64:un(n)?4:Pt(n)?2:0;return we(n,e,t,i,s,o,r,!0)}function Nb(n){return n?bf(n)||mg(n)?Gn({},n):n:null}function Js(n,e,t=!1,i=!1){const{props:s,ref:r,patchFlag:o,children:a,transition:l}=n,c=e?Ub(s||{},e):s,u={__v_isVNode:!0,__v_skip:!0,type:n.type,props:c,key:c&&Cg(c),ref:e&&e.ref?t&&r?Tt(r)?r.concat(Lc(e)):[r,Lc(e)]:Lc(e):r,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:a,target:n.target,targetStart:n.targetStart,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:e&&n.type!==Vn?o===-1?16:o|16:o,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:l,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&Js(n.ssContent),ssFallback:n.ssFallback&&Js(n.ssFallback),placeholder:n.placeholder,el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce};return l&&i&&_l(u,l.clone(u)),u}function Hs(n=" ",e=0){return Ft(Tu,null,n,e)}function Nc(n="",e=!1){return e?(on(),wf(ri,null,n)):Ft(ri,null,n)}function Ki(n){return n==null||typeof n=="boolean"?Ft(ri):Tt(n)?Ft(Vn,null,n.slice()):eu(n)?Vs(n):Ft(Tu,null,String(n))}function Vs(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:Js(n)}function Ef(n,e){let t=0;const{shapeFlag:i}=n;if(e==null)e=null;else if(Tt(e))t=16;else if(typeof e=="object")if(i&65){const s=e.default;s&&(s._c&&(s._d=!1),Ef(n,s()),s._c&&(s._d=!0));return}else{t=32;const s=e._;!s&&!mg(e)?e._ctx=Ni:s===3&&Ni&&(Ni.slots._===1?e._=1:(e._=2,n.patchFlag|=1024))}else Pt(e)?(e={default:e,_ctx:Ni},t=32):(e=String(e),i&64?(t=16,e=[Hs(e)]):t=8);n.children=e,n.shapeFlag|=t}function Ub(...n){const e={};for(let t=0;t<n.length;t++){const i=n[t];for(const s in i)if(s==="class")e.class!==i.class&&(e.class=Ko([e.class,i.class]));else if(s==="style")e.style=Or([e.style,i.style]);else if(fu(s)){const r=e[s],o=i[s];o&&r!==o&&!(Tt(r)&&r.includes(o))&&(e[s]=r?[].concat(r,o):o)}else s!==""&&(e[s]=i[s])}return e}function Wi(n,e,t,i=null){ki(n,e,7,[t,i])}const Fb=hg();let Ob=0;function kb(n,e,t){const i=n.type,s=(e?e.appContext:n.appContext)||Fb,r={uid:Ob++,vnode:n,type:i,parent:e,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new ov(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(s.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:_g(i,s),emitsOptions:Eg(i,s),emit:null,emitted:null,propsDefaults:ln,inheritAttrs:i.inheritAttrs,ctx:ln,data:ln,props:ln,attrs:ln,slots:ln,refs:ln,setupState:ln,setupContext:null,suspense:t,suspenseId:t?t.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return r.ctx={_:r},r.root=e?e.root:r,r.emit=Eb.bind(null,r),n.ce&&n.ce(r),r}let Zn=null;const Rg=()=>Zn||Ni;let tu,lh;{const n=_u(),e=(t,i)=>{let s;return(s=n[t])||(s=n[t]=[]),s.push(i),r=>{s.length>1?s.forEach(o=>o(r)):s[0](r)}};tu=e("__VUE_INSTANCE_SETTERS__",t=>Zn=t),lh=e("__VUE_SSR_SETTERS__",t=>vl=t)}const Tl=n=>{const e=Zn;return tu(n),n.scope.on(),()=>{n.scope.off(),tu(e)}},Ip=()=>{Zn&&Zn.scope.off(),tu(null)};function Pg(n){return n.vnode.shapeFlag&4}let vl=!1;function Bb(n,e=!1,t=!1){e&&lh(e);const{props:i,children:s}=n.vnode,r=Pg(n);db(n,i,r,e),mb(n,s,t||e);const o=r?Gb(n,e):void 0;return e&&lh(!1),o}function Gb(n,e){const t=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,nb);const{setup:i}=t;if(i){ys();const s=n.setupContext=i.length>1?Hb(n):null,r=Tl(n),o=El(i,n,0,[n.props,s]),a=T0(o);if(Ms(),r(),(a||n.sp)&&!ul(n)&&og(n),a){if(o.then(Ip,Ip),e)return o.then(l=>{Lp(n,l)}).catch(l=>{vu(l,n,0)});n.asyncDep=o}else Lp(n,o)}else Dg(n)}function Lp(n,e,t){Pt(e)?n.type.__ssrInlineRender?n.ssrRender=e:n.render=e:un(e)&&(n.setupState=K0(e)),Dg(n)}function Dg(n,e,t){const i=n.type;n.render||(n.render=i.render||Qi);{const s=Tl(n);ys();try{ib(n)}finally{Ms(),s()}}}const zb={get(n,e){return $n(n,"get",""),n[e]}};function Hb(n){const e=t=>{n.exposed=t||{}};return{attrs:new Proxy(n.attrs,zb),slots:n.slots,emit:n.emit,expose:e}}function Tf(n){return n.exposed?n.exposeProxy||(n.exposeProxy=new Proxy(K0(Av(n.exposed)),{get(e,t){if(t in e)return e[t];if(t in dl)return dl[t](n)},has(e,t){return t in e||t in dl}})):n.proxy}function Vb(n,e=!0){return Pt(n)?n.displayName||n.name:n.name||e&&n.__name}function Wb(n){return Pt(n)&&"__vccOpts"in n}const Gs=(n,e)=>Iv(n,e,vl);function ch(n,e,t){const i=(r,o,a)=>{Qc(-1);try{return Ft(r,o,a)}finally{Qc(1)}},s=arguments.length;return s===2?un(e)&&!Tt(e)?eu(e)?i(n,null,[e]):i(n,e):i(n,null,e):(s>3?t=Array.prototype.slice.call(arguments,2):s===3&&eu(t)&&(t=[t]),i(n,e,t))}const Xb="3.5.21";/**
* @vue/runtime-dom v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let uh;const Np=typeof window<"u"&&window.trustedTypes;if(Np)try{uh=Np.createPolicy("vue",{createHTML:n=>n})}catch{}const Ig=uh?n=>uh.createHTML(n):n=>n,Yb="http://www.w3.org/2000/svg",qb="http://www.w3.org/1998/Math/MathML",gs=typeof document<"u"?document:null,Up=gs&&gs.createElement("template"),Kb={insert:(n,e,t)=>{e.insertBefore(n,t||null)},remove:n=>{const e=n.parentNode;e&&e.removeChild(n)},createElement:(n,e,t,i)=>{const s=e==="svg"?gs.createElementNS(Yb,n):e==="mathml"?gs.createElementNS(qb,n):t?gs.createElement(n,{is:t}):gs.createElement(n);return n==="select"&&i&&i.multiple!=null&&s.setAttribute("multiple",i.multiple),s},createText:n=>gs.createTextNode(n),createComment:n=>gs.createComment(n),setText:(n,e)=>{n.nodeValue=e},setElementText:(n,e)=>{n.textContent=e},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>gs.querySelector(n),setScopeId(n,e){n.setAttribute(e,"")},insertStaticContent(n,e,t,i,s,r){const o=t?t.previousSibling:e.lastChild;if(s&&(s===r||s.nextSibling))for(;e.insertBefore(s.cloneNode(!0),t),!(s===r||!(s=s.nextSibling)););else{Up.innerHTML=Ig(i==="svg"?`<svg>${n}</svg>`:i==="mathml"?`<math>${n}</math>`:n);const a=Up.content;if(i==="svg"||i==="mathml"){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}e.insertBefore(a,t)}return[o?o.nextSibling:e.firstChild,t?t.previousSibling:e.lastChild]}},Ds="transition",Ga="animation",bl=Symbol("_vtc"),Lg={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},$b=Gn({},tg,Lg),Zb=n=>(n.displayName="Transition",n.props=$b,n),Ng=Zb((n,{slots:e})=>ch(Hv,jb(n),e)),Mr=(n,e=[])=>{Tt(n)?n.forEach(t=>t(...e)):n&&n(...e)},Fp=n=>n?Tt(n)?n.some(e=>e.length>1):n.length>1:!1;function jb(n){const e={};for(const U in n)U in Lg||(e[U]=n[U]);if(n.css===!1)return e;const{name:t="v",type:i,duration:s,enterFromClass:r=`${t}-enter-from`,enterActiveClass:o=`${t}-enter-active`,enterToClass:a=`${t}-enter-to`,appearFromClass:l=r,appearActiveClass:c=o,appearToClass:u=a,leaveFromClass:h=`${t}-leave-from`,leaveActiveClass:d=`${t}-leave-active`,leaveToClass:f=`${t}-leave-to`}=n,x=Jb(s),S=x&&x[0],m=x&&x[1],{onBeforeEnter:p,onEnter:y,onEnterCancelled:R,onLeave:M,onLeaveCancelled:P,onBeforeAppear:T=p,onAppear:I=y,onAppearCancelled:v=R}=e,A=(U,ee,le,$)=>{U._enterCancelled=$,Sr(U,ee?u:a),Sr(U,ee?c:o),le&&le()},F=(U,ee)=>{U._isLeaving=!1,Sr(U,h),Sr(U,f),Sr(U,d),ee&&ee()},k=U=>(ee,le)=>{const $=U?I:y,se=()=>A(ee,U,le);Mr($,[ee,se]),Op(()=>{Sr(ee,U?l:r),ls(ee,U?u:a),Fp($)||kp(ee,i,S,se)})};return Gn(e,{onBeforeEnter(U){Mr(p,[U]),ls(U,r),ls(U,o)},onBeforeAppear(U){Mr(T,[U]),ls(U,l),ls(U,c)},onEnter:k(!1),onAppear:k(!0),onLeave(U,ee){U._isLeaving=!0;const le=()=>F(U,ee);ls(U,h),U._enterCancelled?(ls(U,d),zp()):(zp(),ls(U,d)),Op(()=>{U._isLeaving&&(Sr(U,h),ls(U,f),Fp(M)||kp(U,i,m,le))}),Mr(M,[U,le])},onEnterCancelled(U){A(U,!1,void 0,!0),Mr(R,[U])},onAppearCancelled(U){A(U,!0,void 0,!0),Mr(v,[U])},onLeaveCancelled(U){F(U),Mr(P,[U])}})}function Jb(n){if(n==null)return null;if(un(n))return[ld(n.enter),ld(n.leave)];{const e=ld(n);return[e,e]}}function ld(n){return Qx(n)}function ls(n,e){e.split(/\s+/).forEach(t=>t&&n.classList.add(t)),(n[bl]||(n[bl]=new Set)).add(e)}function Sr(n,e){e.split(/\s+/).forEach(i=>i&&n.classList.remove(i));const t=n[bl];t&&(t.delete(e),t.size||(n[bl]=void 0))}function Op(n){requestAnimationFrame(()=>{requestAnimationFrame(n)})}let Qb=0;function kp(n,e,t,i){const s=n._endId=++Qb,r=()=>{s===n._endId&&i()};if(t!=null)return setTimeout(r,t);const{type:o,timeout:a,propCount:l}=ey(n,e);if(!o)return i();const c=o+"end";let u=0;const h=()=>{n.removeEventListener(c,d),r()},d=f=>{f.target===n&&++u>=l&&h()};setTimeout(()=>{u<l&&h()},a+1),n.addEventListener(c,d)}function ey(n,e){const t=window.getComputedStyle(n),i=x=>(t[x]||"").split(", "),s=i(`${Ds}Delay`),r=i(`${Ds}Duration`),o=Bp(s,r),a=i(`${Ga}Delay`),l=i(`${Ga}Duration`),c=Bp(a,l);let u=null,h=0,d=0;e===Ds?o>0&&(u=Ds,h=o,d=r.length):e===Ga?c>0&&(u=Ga,h=c,d=l.length):(h=Math.max(o,c),u=h>0?o>c?Ds:Ga:null,d=u?u===Ds?r.length:l.length:0);const f=u===Ds&&/\b(?:transform|all)(?:,|$)/.test(i(`${Ds}Property`).toString());return{type:u,timeout:h,propCount:d,hasTransform:f}}function Bp(n,e){for(;n.length<e.length;)n=n.concat(n);return Math.max(...e.map((t,i)=>Gp(t)+Gp(n[i])))}function Gp(n){return n==="auto"?0:Number(n.slice(0,-1).replace(",","."))*1e3}function zp(){return document.body.offsetHeight}function ty(n,e,t){const i=n[bl];i&&(e=(e?[e,...i]:[...i]).join(" ")),e==null?n.removeAttribute("class"):t?n.setAttribute("class",e):n.className=e}const Hp=Symbol("_vod"),ny=Symbol("_vsh"),iy=Symbol(""),sy=/(?:^|;)\s*display\s*:/;function ry(n,e,t){const i=n.style,s=bn(t);let r=!1;if(t&&!s){if(e)if(bn(e))for(const o of e.split(";")){const a=o.slice(0,o.indexOf(":")).trim();t[a]==null&&Uc(i,a,"")}else for(const o in e)t[o]==null&&Uc(i,o,"");for(const o in t)o==="display"&&(r=!0),Uc(i,o,t[o])}else if(s){if(e!==t){const o=i[iy];o&&(t+=";"+o),i.cssText=t,r=sy.test(t)}}else e&&n.removeAttribute("style");Hp in n&&(n[Hp]=r?i.display:"",n[ny]&&(i.display="none"))}const Vp=/\s*!important$/;function Uc(n,e,t){if(Tt(t))t.forEach(i=>Uc(n,e,i));else if(t==null&&(t=""),e.startsWith("--"))n.setProperty(e,t);else{const i=oy(n,e);Vp.test(t)?n.setProperty(Gr(i),t.replace(Vp,""),"important"):n[i]=t}}const Wp=["Webkit","Moz","ms"],cd={};function oy(n,e){const t=cd[e];if(t)return t;let i=Ai(e);if(i!=="filter"&&i in n)return cd[e]=i;i=gu(i);for(let s=0;s<Wp.length;s++){const r=Wp[s]+i;if(r in n)return cd[e]=r}return e}const Xp="http://www.w3.org/1999/xlink";function Yp(n,e,t,i,s,r=rv(e)){i&&e.startsWith("xlink:")?t==null?n.removeAttributeNS(Xp,e.slice(6,e.length)):n.setAttributeNS(Xp,e,t):t==null||r&&!P0(t)?n.removeAttribute(e):n.setAttribute(e,r?"":nr(t)?String(t):t)}function qp(n,e,t,i,s){if(e==="innerHTML"||e==="textContent"){t!=null&&(n[e]=e==="innerHTML"?Ig(t):t);return}const r=n.tagName;if(e==="value"&&r!=="PROGRESS"&&!r.includes("-")){const a=r==="OPTION"?n.getAttribute("value")||"":n.value,l=t==null?n.type==="checkbox"?"on":"":String(t);(a!==l||!("_value"in n))&&(n.value=l),t==null&&n.removeAttribute(e),n._value=t;return}let o=!1;if(t===""||t==null){const a=typeof n[e];a==="boolean"?t=P0(t):t==null&&a==="string"?(t="",o=!0):a==="number"&&(t=0,o=!0)}try{n[e]=t}catch{}o&&n.removeAttribute(s||e)}function ay(n,e,t,i){n.addEventListener(e,t,i)}function ly(n,e,t,i){n.removeEventListener(e,t,i)}const Kp=Symbol("_vei");function cy(n,e,t,i,s=null){const r=n[Kp]||(n[Kp]={}),o=r[e];if(i&&o)o.value=i;else{const[a,l]=uy(e);if(i){const c=r[e]=fy(i,s);ay(n,a,c,l)}else o&&(ly(n,a,o,l),r[e]=void 0)}}const $p=/(?:Once|Passive|Capture)$/;function uy(n){let e;if($p.test(n)){e={};let i;for(;i=n.match($p);)n=n.slice(0,n.length-i[0].length),e[i[0].toLowerCase()]=!0}return[n[2]===":"?n.slice(3):Gr(n.slice(2)),e]}let ud=0;const dy=Promise.resolve(),hy=()=>ud||(dy.then(()=>ud=0),ud=Date.now());function fy(n,e){const t=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=t.attached)return;ki(py(i,t.value),e,5,[i])};return t.value=n,t.attached=hy(),t}function py(n,e){if(Tt(e)){const t=n.stopImmediatePropagation;return n.stopImmediatePropagation=()=>{t.call(n),n._stopped=!0},e.map(i=>s=>!s._stopped&&i&&i(s))}else return e}const Zp=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,my=(n,e,t,i,s,r)=>{const o=s==="svg";e==="class"?ty(n,i,o):e==="style"?ry(n,t,i):fu(e)?uf(e)||cy(n,e,t,i,r):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):gy(n,e,i,o))?(qp(n,e,i),!n.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&Yp(n,e,i,o,r,e!=="value")):n._isVueCE&&(/[A-Z]/.test(e)||!bn(i))?qp(n,Ai(e),i,r,e):(e==="true-value"?n._trueValue=i:e==="false-value"&&(n._falseValue=i),Yp(n,e,i,o))};function gy(n,e,t,i){if(i)return!!(e==="innerHTML"||e==="textContent"||e in n&&Zp(e)&&Pt(t));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="form"||e==="list"&&n.tagName==="INPUT"||e==="type"&&n.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const s=n.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return Zp(e)&&bn(t)?!1:e in n}const _y=["ctrl","shift","alt","meta"],xy={stop:n=>n.stopPropagation(),prevent:n=>n.preventDefault(),self:n=>n.target!==n.currentTarget,ctrl:n=>!n.ctrlKey,shift:n=>!n.shiftKey,alt:n=>!n.altKey,meta:n=>!n.metaKey,left:n=>"button"in n&&n.button!==0,middle:n=>"button"in n&&n.button!==1,right:n=>"button"in n&&n.button!==2,exact:(n,e)=>_y.some(t=>n[`${t}Key`]&&!e.includes(t))},ps=(n,e)=>{const t=n._withMods||(n._withMods={}),i=e.join(".");return t[i]||(t[i]=(s,...r)=>{for(let o=0;o<e.length;o++){const a=xy[e[o]];if(a&&a(s,e))return}return n(s,...r)})},vy=Gn({patchProp:my},Kb);let jp;function by(){return jp||(jp=_b(vy))}const yy=(...n)=>{const e=by().createApp(...n),{mount:t}=e;return e.mount=i=>{const s=Sy(i);if(!s)return;const r=e._component;!Pt(r)&&!r.render&&!r.template&&(r.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const o=t(s,!1,My(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),o},e};function My(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function Sy(n){return bn(n)?document.querySelector(n):n}const wy="/assets/logo-DLoO7KZT.webp",Ug=/^[a-z0-9]+(-[a-z0-9]+)*$/,Au=(n,e,t,i="")=>{const s=n.split(":");if(n.slice(0,1)==="@"){if(s.length<2||s.length>3)return null;i=s.shift().slice(1)}if(s.length>3||!s.length)return null;if(s.length>1){const a=s.pop(),l=s.pop(),c={provider:s.length>0?s[0]:i,prefix:l,name:a};return e&&!Fc(c)?null:c}const r=s[0],o=r.split("-");if(o.length>1){const a={provider:i,prefix:o.shift(),name:o.join("-")};return e&&!Fc(a)?null:a}if(t&&i===""){const a={provider:i,prefix:"",name:r};return e&&!Fc(a,t)?null:a}return null},Fc=(n,e)=>n?!!((e&&n.prefix===""||n.prefix)&&n.name):!1,Fg=Object.freeze({left:0,top:0,width:16,height:16}),nu=Object.freeze({rotate:0,vFlip:!1,hFlip:!1}),Cu=Object.freeze({...Fg,...nu}),dh=Object.freeze({...Cu,body:"",hidden:!1});function Ey(n,e){const t={};!n.hFlip!=!e.hFlip&&(t.hFlip=!0),!n.vFlip!=!e.vFlip&&(t.vFlip=!0);const i=((n.rotate||0)+(e.rotate||0))%4;return i&&(t.rotate=i),t}function Jp(n,e){const t=Ey(n,e);for(const i in dh)i in nu?i in n&&!(i in t)&&(t[i]=nu[i]):i in e?t[i]=e[i]:i in n&&(t[i]=n[i]);return t}function Ty(n,e){const t=n.icons,i=n.aliases||Object.create(null),s=Object.create(null);function r(o){if(t[o])return s[o]=[];if(!(o in s)){s[o]=null;const a=i[o]&&i[o].parent,l=a&&r(a);l&&(s[o]=[a].concat(l))}return s[o]}return Object.keys(t).concat(Object.keys(i)).forEach(r),s}function Ay(n,e,t){const i=n.icons,s=n.aliases||Object.create(null);let r={};function o(a){r=Jp(i[a]||s[a],r)}return o(e),t.forEach(o),Jp(n,r)}function Og(n,e){const t=[];if(typeof n!="object"||typeof n.icons!="object")return t;n.not_found instanceof Array&&n.not_found.forEach(s=>{e(s,null),t.push(s)});const i=Ty(n);for(const s in i){const r=i[s];r&&(e(s,Ay(n,s,r)),t.push(s))}return t}const Cy={provider:"",aliases:{},not_found:{},...Fg};function dd(n,e){for(const t in e)if(t in n&&typeof n[t]!=typeof e[t])return!1;return!0}function kg(n){if(typeof n!="object"||n===null)return null;const e=n;if(typeof e.prefix!="string"||!n.icons||typeof n.icons!="object"||!dd(n,Cy))return null;const t=e.icons;for(const s in t){const r=t[s];if(!s||typeof r.body!="string"||!dd(r,dh))return null}const i=e.aliases||Object.create(null);for(const s in i){const r=i[s],o=r.parent;if(!s||typeof o!="string"||!t[o]&&!i[o]||!dd(r,dh))return null}return e}const Qp=Object.create(null);function Ry(n,e){return{provider:n,prefix:e,icons:Object.create(null),missing:new Set}}function $o(n,e){const t=Qp[n]||(Qp[n]=Object.create(null));return t[e]||(t[e]=Ry(n,e))}function Bg(n,e){return kg(e)?Og(e,(t,i)=>{i?n.icons[t]=i:n.missing.add(t)}):[]}function Py(n,e,t){try{if(typeof t.body=="string")return n.icons[e]={...t},!0}catch{}return!1}let yl=!1;function Gg(n){return typeof n=="boolean"&&(yl=n),yl}function Dy(n){const e=typeof n=="string"?Au(n,!0,yl):n;if(e){const t=$o(e.provider,e.prefix),i=e.name;return t.icons[i]||(t.missing.has(i)?null:void 0)}}function Iy(n,e){const t=Au(n,!0,yl);if(!t)return!1;const i=$o(t.provider,t.prefix);return e?Py(i,t.name,e):(i.missing.add(t.name),!0)}function Ly(n,e){if(typeof n!="object")return!1;if(typeof e!="string"&&(e=n.provider||""),yl&&!e&&!n.prefix){let s=!1;return kg(n)&&(n.prefix="",Og(n,(r,o)=>{Iy(r,o)&&(s=!0)})),s}const t=n.prefix;if(!Fc({prefix:t,name:"a"}))return!1;const i=$o(e,t);return!!Bg(i,n)}const zg=Object.freeze({width:null,height:null}),Hg=Object.freeze({...zg,...nu}),Ny=/(-?[0-9.]*[0-9]+[0-9.]*)/g,Uy=/^-?[0-9.]*[0-9]+[0-9.]*$/g;function em(n,e,t){if(e===1)return n;if(t=t||100,typeof n=="number")return Math.ceil(n*e*t)/t;if(typeof n!="string")return n;const i=n.split(Ny);if(i===null||!i.length)return n;const s=[];let r=i.shift(),o=Uy.test(r);for(;;){if(o){const a=parseFloat(r);isNaN(a)?s.push(r):s.push(Math.ceil(a*e*t)/t)}else s.push(r);if(r=i.shift(),r===void 0)return s.join("");o=!o}}function Fy(n,e="defs"){let t="";const i=n.indexOf("<"+e);for(;i>=0;){const s=n.indexOf(">",i),r=n.indexOf("</"+e);if(s===-1||r===-1)break;const o=n.indexOf(">",r);if(o===-1)break;t+=n.slice(s+1,r).trim(),n=n.slice(0,i).trim()+n.slice(o+1)}return{defs:t,content:n}}function Oy(n,e){return n?"<defs>"+n+"</defs>"+e:e}function ky(n,e,t){const i=Fy(n);return Oy(i.defs,e+i.content+t)}const By=n=>n==="unset"||n==="undefined"||n==="none";function Gy(n,e){const t={...Cu,...n},i={...Hg,...e},s={left:t.left,top:t.top,width:t.width,height:t.height};let r=t.body;[t,i].forEach(S=>{const m=[],p=S.hFlip,y=S.vFlip;let R=S.rotate;p?y?R+=2:(m.push("translate("+(s.width+s.left).toString()+" "+(0-s.top).toString()+")"),m.push("scale(-1 1)"),s.top=s.left=0):y&&(m.push("translate("+(0-s.left).toString()+" "+(s.height+s.top).toString()+")"),m.push("scale(1 -1)"),s.top=s.left=0);let M;switch(R<0&&(R-=Math.floor(R/4)*4),R=R%4,R){case 1:M=s.height/2+s.top,m.unshift("rotate(90 "+M.toString()+" "+M.toString()+")");break;case 2:m.unshift("rotate(180 "+(s.width/2+s.left).toString()+" "+(s.height/2+s.top).toString()+")");break;case 3:M=s.width/2+s.left,m.unshift("rotate(-90 "+M.toString()+" "+M.toString()+")");break}R%2===1&&(s.left!==s.top&&(M=s.left,s.left=s.top,s.top=M),s.width!==s.height&&(M=s.width,s.width=s.height,s.height=M)),m.length&&(r=ky(r,'<g transform="'+m.join(" ")+'">',"</g>"))});const o=i.width,a=i.height,l=s.width,c=s.height;let u,h;o===null?(h=a===null?"1em":a==="auto"?c:a,u=em(h,l/c)):(u=o==="auto"?l:o,h=a===null?em(u,c/l):a==="auto"?c:a);const d={},f=(S,m)=>{By(m)||(d[S]=m.toString())};f("width",u),f("height",h);const x=[s.left,s.top,l,c];return d.viewBox=x.join(" "),{attributes:d,viewBox:x,body:r}}const zy=/\sid="(\S+)"/g,Hy="IconifyId"+Date.now().toString(16)+(Math.random()*16777216|0).toString(16);let Vy=0;function Wy(n,e=Hy){const t=[];let i;for(;i=zy.exec(n);)t.push(i[1]);if(!t.length)return n;const s="suffix"+(Math.random()*16777216|Date.now()).toString(16);return t.forEach(r=>{const o=typeof e=="function"?e(r):e+(Vy++).toString(),a=r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");n=n.replace(new RegExp('([#;"])('+a+')([")]|\\.[a-z])',"g"),"$1"+o+s+"$3")}),n=n.replace(new RegExp(s,"g"),""),n}const hh=Object.create(null);function Xy(n,e){hh[n]=e}function fh(n){return hh[n]||hh[""]}function Af(n){let e;if(typeof n.resources=="string")e=[n.resources];else if(e=n.resources,!(e instanceof Array)||!e.length)return null;return{resources:e,path:n.path||"/",maxURL:n.maxURL||500,rotate:n.rotate||750,timeout:n.timeout||5e3,random:n.random===!0,index:n.index||0,dataAfterTimeout:n.dataAfterTimeout!==!1}}const Cf=Object.create(null),za=["https://api.simplesvg.com","https://api.unisvg.com"],Oc=[];for(;za.length>0;)za.length===1||Math.random()>.5?Oc.push(za.shift()):Oc.push(za.pop());Cf[""]=Af({resources:["https://api.iconify.design"].concat(Oc)});function Yy(n,e){const t=Af(e);return t===null?!1:(Cf[n]=t,!0)}function Rf(n){return Cf[n]}const qy=()=>{let n;try{if(n=fetch,typeof n=="function")return n}catch{}};let tm=qy();function Ky(n,e){const t=Rf(n);if(!t)return 0;let i;if(!t.maxURL)i=0;else{let s=0;t.resources.forEach(o=>{s=Math.max(s,o.length)});const r=e+".json?icons=";i=t.maxURL-s-t.path.length-r.length}return i}function $y(n){return n===404}const Zy=(n,e,t)=>{const i=[],s=Ky(n,e),r="icons";let o={type:r,provider:n,prefix:e,icons:[]},a=0;return t.forEach((l,c)=>{a+=l.length+1,a>=s&&c>0&&(i.push(o),o={type:r,provider:n,prefix:e,icons:[]},a=l.length),o.icons.push(l)}),i.push(o),i};function jy(n){if(typeof n=="string"){const e=Rf(n);if(e)return e.path}return"/"}const Jy=(n,e,t)=>{if(!tm){t("abort",424);return}let i=jy(e.provider);switch(e.type){case"icons":{const r=e.prefix,a=e.icons.join(","),l=new URLSearchParams({icons:a});i+=r+".json?"+l.toString();break}case"custom":{const r=e.uri;i+=r.slice(0,1)==="/"?r.slice(1):r;break}default:t("abort",400);return}let s=503;tm(n+i).then(r=>{const o=r.status;if(o!==200){setTimeout(()=>{t($y(o)?"abort":"next",o)});return}return s=501,r.json()}).then(r=>{if(typeof r!="object"||r===null){setTimeout(()=>{r===404?t("abort",r):t("next",s)});return}setTimeout(()=>{t("success",r)})}).catch(()=>{t("next",s)})},Qy={prepare:Zy,send:Jy};function eM(n){const e={loaded:[],missing:[],pending:[]},t=Object.create(null);n.sort((s,r)=>s.provider!==r.provider?s.provider.localeCompare(r.provider):s.prefix!==r.prefix?s.prefix.localeCompare(r.prefix):s.name.localeCompare(r.name));let i={provider:"",prefix:"",name:""};return n.forEach(s=>{if(i.name===s.name&&i.prefix===s.prefix&&i.provider===s.provider)return;i=s;const r=s.provider,o=s.prefix,a=s.name,l=t[r]||(t[r]=Object.create(null)),c=l[o]||(l[o]=$o(r,o));let u;a in c.icons?u=e.loaded:o===""||c.missing.has(a)?u=e.missing:u=e.pending;const h={provider:r,prefix:o,name:a};u.push(h)}),e}function Vg(n,e){n.forEach(t=>{const i=t.loaderCallbacks;i&&(t.loaderCallbacks=i.filter(s=>s.id!==e))})}function tM(n){n.pendingCallbacksFlag||(n.pendingCallbacksFlag=!0,setTimeout(()=>{n.pendingCallbacksFlag=!1;const e=n.loaderCallbacks?n.loaderCallbacks.slice(0):[];if(!e.length)return;let t=!1;const i=n.provider,s=n.prefix;e.forEach(r=>{const o=r.icons,a=o.pending.length;o.pending=o.pending.filter(l=>{if(l.prefix!==s)return!0;const c=l.name;if(n.icons[c])o.loaded.push({provider:i,prefix:s,name:c});else if(n.missing.has(c))o.missing.push({provider:i,prefix:s,name:c});else return t=!0,!0;return!1}),o.pending.length!==a&&(t||Vg([n],r.id),r.callback(o.loaded.slice(0),o.missing.slice(0),o.pending.slice(0),r.abort))})}))}let nM=0;function iM(n,e,t){const i=nM++,s=Vg.bind(null,t,i);if(!e.pending.length)return s;const r={id:i,icons:e,callback:n,abort:s};return t.forEach(o=>{(o.loaderCallbacks||(o.loaderCallbacks=[])).push(r)}),s}function sM(n,e=!0,t=!1){const i=[];return n.forEach(s=>{const r=typeof s=="string"?Au(s,e,t):s;r&&i.push(r)}),i}var rM={resources:[],index:0,timeout:2e3,rotate:750,random:!1,dataAfterTimeout:!1};function oM(n,e,t,i){const s=n.resources.length,r=n.random?Math.floor(Math.random()*s):n.index;let o;if(n.random){let T=n.resources.slice(0);for(o=[];T.length>1;){const I=Math.floor(Math.random()*T.length);o.push(T[I]),T=T.slice(0,I).concat(T.slice(I+1))}o=o.concat(T)}else o=n.resources.slice(r).concat(n.resources.slice(0,r));const a=Date.now();let l="pending",c=0,u,h=null,d=[],f=[];typeof i=="function"&&f.push(i);function x(){h&&(clearTimeout(h),h=null)}function S(){l==="pending"&&(l="aborted"),x(),d.forEach(T=>{T.status==="pending"&&(T.status="aborted")}),d=[]}function m(T,I){I&&(f=[]),typeof T=="function"&&f.push(T)}function p(){return{startTime:a,payload:e,status:l,queriesSent:c,queriesPending:d.length,subscribe:m,abort:S}}function y(){l="failed",f.forEach(T=>{T(void 0,u)})}function R(){d.forEach(T=>{T.status==="pending"&&(T.status="aborted")}),d=[]}function M(T,I,v){const A=I!=="success";switch(d=d.filter(F=>F!==T),l){case"pending":break;case"failed":if(A||!n.dataAfterTimeout)return;break;default:return}if(I==="abort"){u=v,y();return}if(A){u=v,d.length||(o.length?P():y());return}if(x(),R(),!n.random){const F=n.resources.indexOf(T.resource);F!==-1&&F!==n.index&&(n.index=F)}l="completed",f.forEach(F=>{F(v)})}function P(){if(l!=="pending")return;x();const T=o.shift();if(T===void 0){if(d.length){h=setTimeout(()=>{x(),l==="pending"&&(R(),y())},n.timeout);return}y();return}const I={status:"pending",resource:T,callback:(v,A)=>{M(I,v,A)}};d.push(I),c++,h=setTimeout(P,n.rotate),t(T,e,I.callback)}return setTimeout(P),p}function Wg(n){const e={...rM,...n};let t=[];function i(){t=t.filter(a=>a().status==="pending")}function s(a,l,c){const u=oM(e,a,l,(h,d)=>{i(),c&&c(h,d)});return t.push(u),u}function r(a){return t.find(l=>a(l))||null}return{query:s,find:r,setIndex:a=>{e.index=a},getIndex:()=>e.index,cleanup:i}}function nm(){}const hd=Object.create(null);function aM(n){if(!hd[n]){const e=Rf(n);if(!e)return;const t=Wg(e),i={config:e,redundancy:t};hd[n]=i}return hd[n]}function lM(n,e,t){let i,s;if(typeof n=="string"){const r=fh(n);if(!r)return t(void 0,424),nm;s=r.send;const o=aM(n);o&&(i=o.redundancy)}else{const r=Af(n);if(r){i=Wg(r);const o=n.resources?n.resources[0]:"",a=fh(o);a&&(s=a.send)}}return!i||!s?(t(void 0,424),nm):i.query(e,s,t)().abort}function im(){}function cM(n){n.iconsLoaderFlag||(n.iconsLoaderFlag=!0,setTimeout(()=>{n.iconsLoaderFlag=!1,tM(n)}))}function uM(n){const e=[],t=[];return n.forEach(i=>{(i.match(Ug)?e:t).push(i)}),{valid:e,invalid:t}}function Ha(n,e,t){function i(){const s=n.pendingIcons;e.forEach(r=>{s&&s.delete(r),n.icons[r]||n.missing.add(r)})}if(t&&typeof t=="object")try{if(!Bg(n,t).length){i();return}}catch(s){console.error(s)}i(),cM(n)}function sm(n,e){n instanceof Promise?n.then(t=>{e(t)}).catch(()=>{e(null)}):e(n)}function dM(n,e){n.iconsToLoad?n.iconsToLoad=n.iconsToLoad.concat(e).sort():n.iconsToLoad=e,n.iconsQueueFlag||(n.iconsQueueFlag=!0,setTimeout(()=>{n.iconsQueueFlag=!1;const{provider:t,prefix:i}=n,s=n.iconsToLoad;if(delete n.iconsToLoad,!s||!s.length)return;const r=n.loadIcon;if(n.loadIcons&&(s.length>1||!r)){sm(n.loadIcons(s,i,t),u=>{Ha(n,s,u)});return}if(r){s.forEach(u=>{const h=r(u,i,t);sm(h,d=>{const f=d?{prefix:i,icons:{[u]:d}}:null;Ha(n,[u],f)})});return}const{valid:o,invalid:a}=uM(s);if(a.length&&Ha(n,a,null),!o.length)return;const l=i.match(Ug)?fh(t):null;if(!l){Ha(n,o,null);return}l.prepare(t,i,o).forEach(u=>{lM(t,u,h=>{Ha(n,u.icons,h)})})}))}const hM=(n,e)=>{const t=sM(n,!0,Gg()),i=eM(t);if(!i.pending.length){let l=!0;return e&&setTimeout(()=>{l&&e(i.loaded,i.missing,i.pending,im)}),()=>{l=!1}}const s=Object.create(null),r=[];let o,a;return i.pending.forEach(l=>{const{provider:c,prefix:u}=l;if(u===a&&c===o)return;o=c,a=u,r.push($o(c,u));const h=s[c]||(s[c]=Object.create(null));h[u]||(h[u]=[])}),i.pending.forEach(l=>{const{provider:c,prefix:u,name:h}=l,d=$o(c,u),f=d.pendingIcons||(d.pendingIcons=new Set);f.has(h)||(f.add(h),s[c][u].push(h))}),r.forEach(l=>{const c=s[l.provider][l.prefix];c.length&&dM(l,c)}),e?iM(e,i,r):im};function fM(n,e){const t={...n};for(const i in e){const s=e[i],r=typeof s;i in zg?(s===null||s&&(r==="string"||r==="number"))&&(t[i]=s):r===typeof t[i]&&(t[i]=i==="rotate"?s%4:s)}return t}const pM=/[\s,]+/;function mM(n,e){e.split(pM).forEach(t=>{switch(t.trim()){case"horizontal":n.hFlip=!0;break;case"vertical":n.vFlip=!0;break}})}function gM(n,e=0){const t=n.replace(/^-?[0-9.]*/,"");function i(s){for(;s<0;)s+=4;return s%4}if(t===""){const s=parseInt(n);return isNaN(s)?0:i(s)}else if(t!==n){let s=0;switch(t){case"%":s=25;break;case"deg":s=90}if(s){let r=parseFloat(n.slice(0,n.length-t.length));return isNaN(r)?0:(r=r/s,r%1===0?i(r):0)}}return e}function _M(n,e){let t=n.indexOf("xlink:")===-1?"":' xmlns:xlink="http://www.w3.org/1999/xlink"';for(const i in e)t+=" "+i+'="'+e[i]+'"';return'<svg xmlns="http://www.w3.org/2000/svg"'+t+">"+n+"</svg>"}function xM(n){return n.replace(/"/g,"'").replace(/%/g,"%25").replace(/#/g,"%23").replace(/</g,"%3C").replace(/>/g,"%3E").replace(/\s+/g," ")}function vM(n){return"data:image/svg+xml,"+xM(n)}function bM(n){return'url("'+vM(n)+'")'}const rm={...Hg,inline:!1},yM={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","aria-hidden":!0,role:"img"},MM={display:"inline-block"},ph={backgroundColor:"currentColor"},Xg={backgroundColor:"transparent"},om={Image:"var(--svg)",Repeat:"no-repeat",Size:"100% 100%"},am={webkitMask:ph,mask:ph,background:Xg};for(const n in am){const e=am[n];for(const t in om)e[n+t]=om[t]}const kc={};["horizontal","vertical"].forEach(n=>{const e=n.slice(0,1)+"Flip";kc[n+"-flip"]=e,kc[n.slice(0,1)+"-flip"]=e,kc[n+"Flip"]=e});function lm(n){return n+(n.match(/^[-0-9.]+$/)?"px":"")}const cm=(n,e)=>{const t=fM(rm,e),i={...yM},s=e.mode||"svg",r={},o=e.style,a=typeof o=="object"&&!(o instanceof Array)?o:{};for(let S in e){const m=e[S];if(m!==void 0)switch(S){case"icon":case"style":case"onLoad":case"mode":case"ssr":break;case"inline":case"hFlip":case"vFlip":t[S]=m===!0||m==="true"||m===1;break;case"flip":typeof m=="string"&&mM(t,m);break;case"color":r.color=m;break;case"rotate":typeof m=="string"?t[S]=gM(m):typeof m=="number"&&(t[S]=m);break;case"ariaHidden":case"aria-hidden":m!==!0&&m!=="true"&&delete i["aria-hidden"];break;default:{const p=kc[S];p?(m===!0||m==="true"||m===1)&&(t[p]=!0):rm[S]===void 0&&(i[S]=m)}}}const l=Gy(n,t),c=l.attributes;if(t.inline&&(r.verticalAlign="-0.125em"),s==="svg"){i.style={...r,...a},Object.assign(i,c);let S=0,m=e.id;return typeof m=="string"&&(m=m.replace(/-/g,"_")),i.innerHTML=Wy(l.body,m?()=>m+"ID"+S++:"iconifyVue"),ch("svg",i)}const{body:u,width:h,height:d}=n,f=s==="mask"||(s==="bg"?!1:u.indexOf("currentColor")!==-1),x=_M(u,{...c,width:h+"",height:d+""});return i.style={...r,"--svg":bM(x),width:lm(c.width),height:lm(c.height),...MM,...f?ph:Xg,...a},ch("span",i)};Gg(!0);Xy("",Qy);if(typeof document<"u"&&typeof window<"u"){const n=window;if(n.IconifyPreload!==void 0){const e=n.IconifyPreload,t="Invalid IconifyPreload syntax.";typeof e=="object"&&e!==null&&(e instanceof Array?e:[e]).forEach(i=>{try{(typeof i!="object"||i===null||i instanceof Array||typeof i.icons!="object"||typeof i.prefix!="string"||!Ly(i))&&console.error(t)}catch{console.error(t)}})}if(n.IconifyProviders!==void 0){const e=n.IconifyProviders;if(typeof e=="object"&&e!==null)for(let t in e){const i="IconifyProviders["+t+"] is invalid.";try{const s=e[t];if(typeof s!="object"||!s||s.resources===void 0)continue;Yy(t,s)||console.error(i)}catch{console.error(i)}}}}const SM={...Cu,body:""},Pn=zr({inheritAttrs:!1,data(){return{_name:"",_loadingIcon:null,iconMounted:!1,counter:0}},mounted(){this.iconMounted=!0},unmounted(){this.abortLoading()},methods:{abortLoading(){this._loadingIcon&&(this._loadingIcon.abort(),this._loadingIcon=null)},getIcon(n,e,t){if(typeof n=="object"&&n!==null&&typeof n.body=="string")return this._name="",this.abortLoading(),{data:n};let i;if(typeof n!="string"||(i=Au(n,!1,!0))===null)return this.abortLoading(),null;let s=Dy(i);if(!s)return(!this._loadingIcon||this._loadingIcon.name!==n)&&(this.abortLoading(),this._name="",s!==null&&(this._loadingIcon={name:n,abort:hM([i],()=>{this.counter++})})),null;if(this.abortLoading(),this._name!==n&&(this._name=n,e&&e(n)),t){s=Object.assign({},s);const o=t(s.body,i.name,i.prefix,i.provider);typeof o=="string"&&(s.body=o)}const r=["iconify"];return i.prefix!==""&&r.push("iconify--"+i.prefix),i.provider!==""&&r.push("iconify--"+i.provider),{data:s,classes:r}}},render(){this.counter;const n=this.$attrs,e=this.iconMounted||n.ssr?this.getIcon(n.icon,n.onLoad,n.customise):null;if(!e)return cm(SM,n);let t=n;return e.classes&&(t={...n,class:(typeof n.class=="string"?n.class+" ":"")+e.classes.join(" ")}),cm({...Cu,...e.data},t)}}),wM={class:"fixed top-0 left-0 right-0 z-40 px-4 md:px-8 py-3 pointer-events-none"},EM={class:"max-w-7xl mx-auto flex items-center justify-between pointer-events-auto"},TM=["src"],AM={class:"flex items-center gap-2"},CM={class:"flex items-center gap-1.5 px-3 py-1.5 rounded-2xl cosmic-glass border border-white/10 text-[11px] font-mono text-neutral-400 shadow-lg"},RM=zr({__name:"Navbar",emits:["navigate"],setup(n,{emit:e}){const t=e;return(i,s)=>(on(),fn("header",wM,[we("div",EM,[we("a",{href:"#",onClick:s[0]||(s[0]=ps(r=>t("navigate","sun"),["prevent"])),class:"flex items-center gap-3 p-1.5 pr-4 rounded-2xl hover:scale-105 transition-all group"},[we("img",{src:pn(wy),alt:"Anko Logo",width:"36",height:"36",class:"rounded-xl group-hover:rotate-12 transition-transform duration-300"},null,8,TM)]),we("div",AM,[we("div",CM,[Ft(pn(Pn),{icon:"solar:cursor-bold",width:"14",class:"text-cyan-400"}),s[1]||(s[1]=we("span",{class:"hidden sm:inline"},"Drag to pan • Scroll to zoom • Click to scan",-1)),s[2]||(s[2]=we("span",{class:"sm:hidden"},"Explore Orbit",-1))])])])]))}});/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Pf="185",Vo={ROTATE:0,DOLLY:1,PAN:2},Oo={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},PM=0,um=1,DM=2,Bc=1,IM=2,sl=3,Qs=0,vn=1,Nt=2,vs=0,Wo=1,yt=2,dm=3,hm=4,LM=5,Pr=100,NM=101,UM=102,FM=103,OM=104,kM=200,BM=201,GM=202,zM=203,mh=204,gh=205,HM=206,VM=207,WM=208,XM=209,YM=210,qM=211,KM=212,$M=213,ZM=214,_h=0,xh=1,vh=2,Zo=3,bh=4,yh=5,Mh=6,Sh=7,Yg=0,jM=1,JM=2,es=0,qg=1,Kg=2,$g=3,Zg=4,jg=5,Jg=6,Qg=7,e_=300,kr=301,jo=302,fd=303,pd=304,Ru=306,wi=1e3,ji=1001,wh=1002,Xn=1003,QM=1004,Zl=1005,Cn=1006,md=1007,Lr=1008,_i=1009,t_=1010,n_=1011,Ml=1012,Df=1013,ns=1014,Ui=1015,Ss=1016,If=1017,Lf=1018,Sl=1020,i_=35902,s_=35899,r_=1021,o_=1022,Fi=1023,ws=1026,Nr=1027,Nf=1028,Uf=1029,Br=1030,Ff=1031,Of=1033,Gc=33776,zc=33777,Hc=33778,Vc=33779,Eh=35840,Th=35841,Ah=35842,Ch=35843,Rh=36196,Ph=37492,Dh=37496,Ih=37488,Lh=37489,iu=37490,Nh=37491,Uh=37808,Fh=37809,Oh=37810,kh=37811,Bh=37812,Gh=37813,zh=37814,Hh=37815,Vh=37816,Wh=37817,Xh=37818,Yh=37819,qh=37820,Kh=37821,$h=36492,Zh=36494,jh=36495,Jh=36283,Qh=36284,su=36285,ef=36286,e1=3200,tf=0,t1=1,qs="",Ei="srgb",ru="srgb-linear",ou="linear",jt="srgb",mo=7680,fm=519,n1=512,i1=513,s1=514,kf=515,r1=516,o1=517,Bf=518,a1=519,nf=35044,pm="300 es",Ji=2e3,wl=2001;function l1(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function au(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function c1(){const n=au("canvas");return n.style.display="block",n}const mm={};function lu(...n){const e="THREE."+n.shift();console.log(e,...n)}function a_(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function bt(...n){n=a_(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Ot(...n){n=a_(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Xo(...n){const e=n.join(" ");e in mm||(mm[e]=!0,bt(...n))}function u1(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}const d1={[_h]:xh,[vh]:Mh,[bh]:Sh,[Zo]:yh,[xh]:_h,[Mh]:vh,[Sh]:bh,[yh]:Zo};class ir{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const qn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],fl=Math.PI/180,sf=180/Math.PI;function Zs(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(qn[n&255]+qn[n>>8&255]+qn[n>>16&255]+qn[n>>24&255]+"-"+qn[e&255]+qn[e>>8&255]+"-"+qn[e>>16&15|64]+qn[e>>24&255]+"-"+qn[t&63|128]+qn[t>>8&255]+"-"+qn[t>>16&255]+qn[t>>24&255]+qn[i&255]+qn[i>>8&255]+qn[i>>16&255]+qn[i>>24&255]).toLowerCase()}function Ut(n,e,t){return Math.max(e,Math.min(t,n))}function h1(n,e){return(n%e+e)%e}function gd(n,e,t){return(1-t)*n+t*e}function Zi(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function en(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const f1={DEG2RAD:fl},Kf=class Kf{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ut(this.x,e.x,t.x),this.y=Ut(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ut(this.x,e,t),this.y=Ut(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ut(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ut(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*i-o*s+e.x,this.y=r*s+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Kf.prototype.isVector2=!0;let dt=Kf;class er{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,o,a){let l=i[s+0],c=i[s+1],u=i[s+2],h=i[s+3],d=r[o+0],f=r[o+1],x=r[o+2],S=r[o+3];if(h!==S||l!==d||c!==f||u!==x){let m=l*d+c*f+u*x+h*S;m<0&&(d=-d,f=-f,x=-x,S=-S,m=-m);let p=1-a;if(m<.9995){const y=Math.acos(m),R=Math.sin(y);p=Math.sin(p*y)/R,a=Math.sin(a*y)/R,l=l*p+d*a,c=c*p+f*a,u=u*p+x*a,h=h*p+S*a}else{l=l*p+d*a,c=c*p+f*a,u=u*p+x*a,h=h*p+S*a;const y=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=y,c*=y,u*=y,h*=y}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,s,r,o){const a=i[s],l=i[s+1],c=i[s+2],u=i[s+3],h=r[o],d=r[o+1],f=r[o+2],x=r[o+3];return e[t]=a*x+u*h+l*f-c*d,e[t+1]=l*x+u*d+c*h-a*f,e[t+2]=c*x+u*f+a*d-l*h,e[t+3]=u*x-a*h-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(s/2),h=a(r/2),d=l(i/2),f=l(s/2),x=l(r/2);switch(o){case"XYZ":this._x=d*u*h+c*f*x,this._y=c*f*h-d*u*x,this._z=c*u*x+d*f*h,this._w=c*u*h-d*f*x;break;case"YXZ":this._x=d*u*h+c*f*x,this._y=c*f*h-d*u*x,this._z=c*u*x-d*f*h,this._w=c*u*h+d*f*x;break;case"ZXY":this._x=d*u*h-c*f*x,this._y=c*f*h+d*u*x,this._z=c*u*x+d*f*h,this._w=c*u*h-d*f*x;break;case"ZYX":this._x=d*u*h-c*f*x,this._y=c*f*h+d*u*x,this._z=c*u*x-d*f*h,this._w=c*u*h+d*f*x;break;case"YZX":this._x=d*u*h+c*f*x,this._y=c*f*h+d*u*x,this._z=c*u*x-d*f*h,this._w=c*u*h-d*f*x;break;case"XZY":this._x=d*u*h-c*f*x,this._y=c*f*h-d*u*x,this._z=c*u*x+d*f*h,this._w=c*u*h+d*f*x;break;default:bt("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],h=t[10],d=i+a+h;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(i>a&&i>h){const f=2*Math.sqrt(1+i-a-h);this._w=(u-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>h){const f=2*Math.sqrt(1+a-i-h);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+h-i-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ut(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+o*a+s*c-r*l,this._y=s*u+o*l+r*a-i*c,this._z=r*u+o*c+i*l-s*a,this._w=o*u-i*a-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,o=e._w,a=this.dot(e);a<0&&(i=-i,s=-s,r=-r,o=-o,a=-a);let l=1-t;if(a<.9995){const c=Math.acos(a),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const $f=class $f{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(gm.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(gm.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*s-a*i),u=2*(a*t-r*s),h=2*(r*i-o*t);return this.x=t+l*c+o*h-a*u,this.y=i+l*u+a*c-r*h,this.z=s+l*h+r*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ut(this.x,e.x,t.x),this.y=Ut(this.y,e.y,t.y),this.z=Ut(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ut(this.x,e,t),this.y=Ut(this.y,e,t),this.z=Ut(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ut(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-i*l,this.z=i*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return _d.copy(this).projectOnVector(e),this.sub(_d)}reflect(e){return this.sub(_d.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ut(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};$f.prototype.isVector3=!0;let L=$f;const _d=new L,gm=new er,Zf=class Zf{constructor(e,t,i,s,r,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,l,c)}set(e,t,i,s,r,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=s,u[2]=a,u[3]=t,u[4]=r,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],h=i[7],d=i[2],f=i[5],x=i[8],S=s[0],m=s[3],p=s[6],y=s[1],R=s[4],M=s[7],P=s[2],T=s[5],I=s[8];return r[0]=o*S+a*y+l*P,r[3]=o*m+a*R+l*T,r[6]=o*p+a*M+l*I,r[1]=c*S+u*y+h*P,r[4]=c*m+u*R+h*T,r[7]=c*p+u*M+h*I,r[2]=d*S+f*y+x*P,r[5]=d*m+f*R+x*T,r[8]=d*p+f*M+x*I,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-i*r*u+i*a*l+s*r*c-s*o*l}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=u*o-a*c,d=a*l-u*r,f=c*r-o*l,x=t*h+i*d+s*f;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const S=1/x;return e[0]=h*S,e[1]=(s*c-u*i)*S,e[2]=(a*i-s*o)*S,e[3]=d*S,e[4]=(u*t-s*l)*S,e[5]=(s*r-a*t)*S,e[6]=f*S,e[7]=(i*l-c*t)*S,e[8]=(o*t-i*r)*S,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-s*c,s*l,-s*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return Xo("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(xd.makeScale(e,t)),this}rotate(e){return Xo("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(xd.makeRotation(-e)),this}translate(e,t){return Xo("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(xd.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Zf.prototype.isMatrix3=!0;let Ct=Zf;const xd=new Ct,_m=new Ct().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),xm=new Ct().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function p1(){const n={enabled:!0,workingColorSpace:ru,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===jt&&(s.r=bs(s.r),s.g=bs(s.g),s.b=bs(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===jt&&(s.r=Yo(s.r),s.g=Yo(s.g),s.b=Yo(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===qs?ou:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Xo("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Xo("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[ru]:{primaries:e,whitePoint:i,transfer:ou,toXYZ:_m,fromXYZ:xm,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Ei},outputColorSpaceConfig:{drawingBufferColorSpace:Ei}},[Ei]:{primaries:e,whitePoint:i,transfer:jt,toXYZ:_m,fromXYZ:xm,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Ei}}}),n}const kt=p1();function bs(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Yo(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let go;class m1{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{go===void 0&&(go=au("canvas")),go.width=e.width,go.height=e.height;const s=go.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=go}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=au("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=bs(r[o]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(bs(t[i]/255)*255):t[i]=bs(t[i]);return{data:t,width:e.width,height:e.height}}else return bt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let g1=0;class Gf{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:g1++}),this.uuid=Zs(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(vd(s[o].image)):r.push(vd(s[o]))}else r=vd(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function vd(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?m1.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(bt("Texture: Unable to serialize Texture."),{})}let _1=0;const bd=new L;class Jn extends ir{constructor(e=Jn.DEFAULT_IMAGE,t=Jn.DEFAULT_MAPPING,i=ji,s=ji,r=Cn,o=Lr,a=Fi,l=_i,c=Jn.DEFAULT_ANISOTROPY,u=qs){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:_1++}),this.uuid=Zs(),this.name="",this.source=new Gf(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new dt(0,0),this.repeat=new dt(1,1),this.center=new dt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ct,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(bd).x}get height(){return this.source.getSize(bd).y}get depth(){return this.source.getSize(bd).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){bt(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){bt(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==e_)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case wi:e.x=e.x-Math.floor(e.x);break;case ji:e.x=e.x<0?0:1;break;case wh:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case wi:e.y=e.y-Math.floor(e.y);break;case ji:e.y=e.y<0?0:1;break;case wh:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Jn.DEFAULT_IMAGE=null;Jn.DEFAULT_MAPPING=e_;Jn.DEFAULT_ANISOTROPY=1;const jf=class jf{constructor(e=0,t=0,i=0,s=1){this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*i+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const l=e.elements,c=l[0],u=l[4],h=l[8],d=l[1],f=l[5],x=l[9],S=l[2],m=l[6],p=l[10];if(Math.abs(u-d)<.01&&Math.abs(h-S)<.01&&Math.abs(x-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+S)<.1&&Math.abs(x+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const R=(c+1)/2,M=(f+1)/2,P=(p+1)/2,T=(u+d)/4,I=(h+S)/4,v=(x+m)/4;return R>M&&R>P?R<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(R),s=T/i,r=I/i):M>P?M<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),i=T/s,r=v/s):P<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(P),i=I/r,s=v/r),this.set(i,s,r,t),this}let y=Math.sqrt((m-x)*(m-x)+(h-S)*(h-S)+(d-u)*(d-u));return Math.abs(y)<.001&&(y=1),this.x=(m-x)/y,this.y=(h-S)/y,this.z=(d-u)/y,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ut(this.x,e.x,t.x),this.y=Ut(this.y,e.y,t.y),this.z=Ut(this.z,e.z,t.z),this.w=Ut(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ut(this.x,e,t),this.y=Ut(this.y,e,t),this.z=Ut(this.z,e,t),this.w=Ut(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ut(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};jf.prototype.isVector4=!0;let gn=jf;class x1 extends ir{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Cn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new gn(0,0,e,t),this.scissorTest=!1,this.viewport=new gn(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:i.depth},r=new Jn(s),o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Cn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Gf(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ts extends x1{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class l_ extends Jn{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Xn,this.minFilter=Xn,this.wrapR=ji,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class v1 extends Jn{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Xn,this.minFilter=Xn,this.wrapR=ji,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const hu=class hu{constructor(e,t,i,s,r,o,a,l,c,u,h,d,f,x,S,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,l,c,u,h,d,f,x,S,m)}set(e,t,i,s,r,o,a,l,c,u,h,d,f,x,S,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=h,p[14]=d,p[3]=f,p[7]=x,p[11]=S,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new hu().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,s=1/_o.setFromMatrixColumn(e,0).length(),r=1/_o.setFromMatrixColumn(e,1).length(),o=1/_o.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const d=o*u,f=o*h,x=a*u,S=a*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=f+x*c,t[5]=d-S*c,t[9]=-a*l,t[2]=S-d*c,t[6]=x+f*c,t[10]=o*l}else if(e.order==="YXZ"){const d=l*u,f=l*h,x=c*u,S=c*h;t[0]=d+S*a,t[4]=x*a-f,t[8]=o*c,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=f*a-x,t[6]=S+d*a,t[10]=o*l}else if(e.order==="ZXY"){const d=l*u,f=l*h,x=c*u,S=c*h;t[0]=d-S*a,t[4]=-o*h,t[8]=x+f*a,t[1]=f+x*a,t[5]=o*u,t[9]=S-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const d=o*u,f=o*h,x=a*u,S=a*h;t[0]=l*u,t[4]=x*c-f,t[8]=d*c+S,t[1]=l*h,t[5]=S*c+d,t[9]=f*c-x,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const d=o*l,f=o*c,x=a*l,S=a*c;t[0]=l*u,t[4]=S-d*h,t[8]=x*h+f,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=f*h+x,t[10]=d-S*h}else if(e.order==="XZY"){const d=o*l,f=o*c,x=a*l,S=a*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=d*h+S,t[5]=o*u,t[9]=f*h-x,t[2]=x*h-f,t[6]=a*u,t[10]=S*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(b1,e,y1)}lookAt(e,t,i){const s=this.elements;return hi.subVectors(e,t),hi.lengthSq()===0&&(hi.z=1),hi.normalize(),Is.crossVectors(i,hi),Is.lengthSq()===0&&(Math.abs(i.z)===1?hi.x+=1e-4:hi.z+=1e-4,hi.normalize(),Is.crossVectors(i,hi)),Is.normalize(),jl.crossVectors(hi,Is),s[0]=Is.x,s[4]=jl.x,s[8]=hi.x,s[1]=Is.y,s[5]=jl.y,s[9]=hi.y,s[2]=Is.z,s[6]=jl.z,s[10]=hi.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],h=i[5],d=i[9],f=i[13],x=i[2],S=i[6],m=i[10],p=i[14],y=i[3],R=i[7],M=i[11],P=i[15],T=s[0],I=s[4],v=s[8],A=s[12],F=s[1],k=s[5],U=s[9],ee=s[13],le=s[2],$=s[6],se=s[10],Z=s[14],ae=s[3],Te=s[7],He=s[11],Oe=s[15];return r[0]=o*T+a*F+l*le+c*ae,r[4]=o*I+a*k+l*$+c*Te,r[8]=o*v+a*U+l*se+c*He,r[12]=o*A+a*ee+l*Z+c*Oe,r[1]=u*T+h*F+d*le+f*ae,r[5]=u*I+h*k+d*$+f*Te,r[9]=u*v+h*U+d*se+f*He,r[13]=u*A+h*ee+d*Z+f*Oe,r[2]=x*T+S*F+m*le+p*ae,r[6]=x*I+S*k+m*$+p*Te,r[10]=x*v+S*U+m*se+p*He,r[14]=x*A+S*ee+m*Z+p*Oe,r[3]=y*T+R*F+M*le+P*ae,r[7]=y*I+R*k+M*$+P*Te,r[11]=y*v+R*U+M*se+P*He,r[15]=y*A+R*ee+M*Z+P*Oe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],h=e[6],d=e[10],f=e[14],x=e[3],S=e[7],m=e[11],p=e[15],y=l*f-c*d,R=a*f-c*h,M=a*d-l*h,P=o*f-c*u,T=o*d-l*u,I=o*h-a*u;return t*(S*y-m*R+p*M)-i*(x*y-m*P+p*T)+s*(x*R-S*P+p*I)-r*(x*M-S*T+m*I)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[1],o=e[5],a=e[9],l=e[2],c=e[6],u=e[10];return t*(o*u-a*c)-i*(r*u-a*l)+s*(r*c-o*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=e[9],d=e[10],f=e[11],x=e[12],S=e[13],m=e[14],p=e[15],y=t*a-i*o,R=t*l-s*o,M=t*c-r*o,P=i*l-s*a,T=i*c-r*a,I=s*c-r*l,v=u*S-h*x,A=u*m-d*x,F=u*p-f*x,k=h*m-d*S,U=h*p-f*S,ee=d*p-f*m,le=y*ee-R*U+M*k+P*F-T*A+I*v;if(le===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const $=1/le;return e[0]=(a*ee-l*U+c*k)*$,e[1]=(s*U-i*ee-r*k)*$,e[2]=(S*I-m*T+p*P)*$,e[3]=(d*T-h*I-f*P)*$,e[4]=(l*F-o*ee-c*A)*$,e[5]=(t*ee-s*F+r*A)*$,e[6]=(m*M-x*I-p*R)*$,e[7]=(u*I-d*M+f*R)*$,e[8]=(o*U-a*F+c*v)*$,e[9]=(i*F-t*U-r*v)*$,e[10]=(x*T-S*M+p*y)*$,e[11]=(h*M-u*T-f*y)*$,e[12]=(a*A-o*k-l*v)*$,e[13]=(t*k-i*A+s*v)*$,e[14]=(S*R-x*P-m*y)*$,e[15]=(u*P-h*R+d*y)*$,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,o=e.x,a=e.y,l=e.z,c=r*o,u=r*a;return this.set(c*o+i,c*a-s*l,c*l+s*a,0,c*a+s*l,u*a+i,u*l-s*o,0,c*l-s*a,u*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,o){return this.set(1,i,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,u=o+o,h=a+a,d=r*c,f=r*u,x=r*h,S=o*u,m=o*h,p=a*h,y=l*c,R=l*u,M=l*h,P=i.x,T=i.y,I=i.z;return s[0]=(1-(S+p))*P,s[1]=(f+M)*P,s[2]=(x-R)*P,s[3]=0,s[4]=(f-M)*T,s[5]=(1-(d+p))*T,s[6]=(m+y)*T,s[7]=0,s[8]=(x+R)*I,s[9]=(m-y)*I,s[10]=(1-(d+S))*I,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let o=_o.set(s[0],s[1],s[2]).length();const a=_o.set(s[4],s[5],s[6]).length(),l=_o.set(s[8],s[9],s[10]).length();r<0&&(o=-o),Di.copy(this);const c=1/o,u=1/a,h=1/l;return Di.elements[0]*=c,Di.elements[1]*=c,Di.elements[2]*=c,Di.elements[4]*=u,Di.elements[5]*=u,Di.elements[6]*=u,Di.elements[8]*=h,Di.elements[9]*=h,Di.elements[10]*=h,t.setFromRotationMatrix(Di),i.x=o,i.y=a,i.z=l,this}makePerspective(e,t,i,s,r,o,a=Ji,l=!1){const c=this.elements,u=2*r/(t-e),h=2*r/(i-s),d=(t+e)/(t-e),f=(i+s)/(i-s);let x,S;if(l)x=r/(o-r),S=o*r/(o-r);else if(a===Ji)x=-(o+r)/(o-r),S=-2*o*r/(o-r);else if(a===wl)x=-o/(o-r),S=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=x,c[14]=S,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,r,o,a=Ji,l=!1){const c=this.elements,u=2/(t-e),h=2/(i-s),d=-(t+e)/(t-e),f=-(i+s)/(i-s);let x,S;if(l)x=1/(o-r),S=o/(o-r);else if(a===Ji)x=-2/(o-r),S=-(o+r)/(o-r);else if(a===wl)x=-1/(o-r),S=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=h,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=x,c[14]=S,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}};hu.prototype.isMatrix4=!0;let Qt=hu;const _o=new L,Di=new Qt,b1=new L(0,0,0),y1=new L(1,1,1),Is=new L,jl=new L,hi=new L,vm=new Qt,bm=new er;class tr{constructor(e=0,t=0,i=0,s=tr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],u=s[9],h=s[2],d=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(Ut(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ut(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ut(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ut(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ut(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Ut(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:bt("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return vm.makeRotationFromQuaternion(e),this.setFromRotationMatrix(vm,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return bm.setFromEuler(this),this.setFromQuaternion(bm,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}tr.DEFAULT_ORDER="XYZ";class zf{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let M1=0;const ym=new L,xo=new er,cs=new Qt,Jl=new L,Va=new L,S1=new L,w1=new er,Mm=new L(1,0,0),Sm=new L(0,1,0),wm=new L(0,0,1),Em={type:"added"},E1={type:"removed"},vo={type:"childadded",child:null},yd={type:"childremoved",child:null};class wn extends ir{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:M1++}),this.uuid=Zs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=wn.DEFAULT_UP.clone();const e=new L,t=new tr,i=new er,s=new L(1,1,1);function r(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Qt},normalMatrix:{value:new Ct}}),this.matrix=new Qt,this.matrixWorld=new Qt,this.matrixAutoUpdate=wn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=wn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new zf,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return xo.setFromAxisAngle(e,t),this.quaternion.multiply(xo),this}rotateOnWorldAxis(e,t){return xo.setFromAxisAngle(e,t),this.quaternion.premultiply(xo),this}rotateX(e){return this.rotateOnAxis(Mm,e)}rotateY(e){return this.rotateOnAxis(Sm,e)}rotateZ(e){return this.rotateOnAxis(wm,e)}translateOnAxis(e,t){return ym.copy(e).applyQuaternion(this.quaternion),this.position.add(ym.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Mm,e)}translateY(e){return this.translateOnAxis(Sm,e)}translateZ(e){return this.translateOnAxis(wm,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(cs.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Jl.copy(e):Jl.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Va.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?cs.lookAt(Va,Jl,this.up):cs.lookAt(Jl,Va,this.up),this.quaternion.setFromRotationMatrix(cs),s&&(cs.extractRotation(s.matrixWorld),xo.setFromRotationMatrix(cs),this.quaternion.premultiply(xo.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ot("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Em),vo.child=e,this.dispatchEvent(vo),vo.child=null):Ot("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(E1),yd.child=e,this.dispatchEvent(yd),yd.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),cs.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),cs.multiply(e.parent.matrixWorld)),e.applyMatrix4(cs),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Em),vo.child=e,this.dispatchEvent(vo),vo.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Va,e,S1),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Va,w1,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];r(e.shapes,h)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),h=o(e.shapes),d=o(e.skeletons),f=o(e.animations),x=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),d.length>0&&(i.skeletons=d),f.length>0&&(i.animations=f),x.length>0&&(i.nodes=x)}return i.object=s,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}wn.DEFAULT_UP=new L(0,1,0);wn.DEFAULT_MATRIX_AUTO_UPDATE=!0;wn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class mt extends wn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const T1={type:"move"};class Md{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new mt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new mt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new mt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const S of e.hand.values()){const m=t.getJointPose(S,i),p=this._getHandJoint(c,S);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,x=.005;c.inputState.pinching&&d>f+x?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-x&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(T1)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new mt;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const c_={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ls={h:0,s:0,l:0},Ql={h:0,s:0,l:0};function Sd(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Ze{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ei){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,kt.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=kt.workingColorSpace){return this.r=e,this.g=t,this.b=i,kt.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=kt.workingColorSpace){if(e=h1(e,1),t=Ut(t,0,1),i=Ut(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,o=2*i-r;this.r=Sd(o,r,e+1/3),this.g=Sd(o,r,e),this.b=Sd(o,r,e-1/3)}return kt.colorSpaceToWorking(this,s),this}setStyle(e,t=Ei){function i(r){r!==void 0&&parseFloat(r)<1&&bt("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:bt("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);bt("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ei){const i=c_[e.toLowerCase()];return i!==void 0?this.setHex(i,t):bt("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=bs(e.r),this.g=bs(e.g),this.b=bs(e.b),this}copyLinearToSRGB(e){return this.r=Yo(e.r),this.g=Yo(e.g),this.b=Yo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ei){return kt.workingToColorSpace(Kn.copy(this),e),Math.round(Ut(Kn.r*255,0,255))*65536+Math.round(Ut(Kn.g*255,0,255))*256+Math.round(Ut(Kn.b*255,0,255))}getHexString(e=Ei){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=kt.workingColorSpace){kt.workingToColorSpace(Kn.copy(this),t);const i=Kn.r,s=Kn.g,r=Kn.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case i:l=(s-r)/h+(s<r?6:0);break;case s:l=(r-i)/h+2;break;case r:l=(i-s)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=kt.workingColorSpace){return kt.workingToColorSpace(Kn.copy(this),t),e.r=Kn.r,e.g=Kn.g,e.b=Kn.b,e}getStyle(e=Ei){kt.workingToColorSpace(Kn.copy(this),e);const t=Kn.r,i=Kn.g,s=Kn.b;return e!==Ei?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(Ls),this.setHSL(Ls.h+e,Ls.s+t,Ls.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Ls),e.getHSL(Ql);const i=gd(Ls.h,Ql.h,t),s=gd(Ls.s,Ql.s,t),r=gd(Ls.l,Ql.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Kn=new Ze;Ze.NAMES=c_;class A1 extends wn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new tr,this.environmentIntensity=1,this.environmentRotation=new tr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Ii=new L,us=new L,wd=new L,ds=new L,bo=new L,yo=new L,Tm=new L,Ed=new L,Td=new L,Ad=new L,Cd=new gn,Rd=new gn,Pd=new gn;class xi{constructor(e=new L,t=new L,i=new L){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Ii.subVectors(e,t),s.cross(Ii);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){Ii.subVectors(s,t),us.subVectors(i,t),wd.subVectors(e,t);const o=Ii.dot(Ii),a=Ii.dot(us),l=Ii.dot(wd),c=us.dot(us),u=us.dot(wd),h=o*c-a*a;if(h===0)return r.set(0,0,0),null;const d=1/h,f=(c*l-a*u)*d,x=(o*u-a*l)*d;return r.set(1-f-x,x,f)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,ds)===null?!1:ds.x>=0&&ds.y>=0&&ds.x+ds.y<=1}static getInterpolation(e,t,i,s,r,o,a,l){return this.getBarycoord(e,t,i,s,ds)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,ds.x),l.addScaledVector(o,ds.y),l.addScaledVector(a,ds.z),l)}static getInterpolatedAttribute(e,t,i,s,r,o){return Cd.setScalar(0),Rd.setScalar(0),Pd.setScalar(0),Cd.fromBufferAttribute(e,t),Rd.fromBufferAttribute(e,i),Pd.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(Cd,r.x),o.addScaledVector(Rd,r.y),o.addScaledVector(Pd,r.z),o}static isFrontFacing(e,t,i,s){return Ii.subVectors(i,t),us.subVectors(e,t),Ii.cross(us).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ii.subVectors(this.c,this.b),us.subVectors(this.a,this.b),Ii.cross(us).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return xi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return xi.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return xi.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return xi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return xi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let o,a;bo.subVectors(s,i),yo.subVectors(r,i),Ed.subVectors(e,i);const l=bo.dot(Ed),c=yo.dot(Ed);if(l<=0&&c<=0)return t.copy(i);Td.subVectors(e,s);const u=bo.dot(Td),h=yo.dot(Td);if(u>=0&&h<=u)return t.copy(s);const d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(i).addScaledVector(bo,o);Ad.subVectors(e,r);const f=bo.dot(Ad),x=yo.dot(Ad);if(x>=0&&f<=x)return t.copy(r);const S=f*c-l*x;if(S<=0&&c>=0&&x<=0)return a=c/(c-x),t.copy(i).addScaledVector(yo,a);const m=u*x-f*h;if(m<=0&&h-u>=0&&f-x>=0)return Tm.subVectors(r,s),a=(h-u)/(h-u+(f-x)),t.copy(s).addScaledVector(Tm,a);const p=1/(m+S+d);return o=S*p,a=d*p,t.copy(i).addScaledVector(bo,o).addScaledVector(yo,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Hr{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Li.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Li.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Li.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Li):Li.fromBufferAttribute(r,o),Li.applyMatrix4(e.matrixWorld),this.expandByPoint(Li);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ec.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ec.copy(i.boundingBox)),ec.applyMatrix4(e.matrixWorld),this.union(ec)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Li),Li.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Wa),tc.subVectors(this.max,Wa),Mo.subVectors(e.a,Wa),So.subVectors(e.b,Wa),wo.subVectors(e.c,Wa),Ns.subVectors(So,Mo),Us.subVectors(wo,So),wr.subVectors(Mo,wo);let t=[0,-Ns.z,Ns.y,0,-Us.z,Us.y,0,-wr.z,wr.y,Ns.z,0,-Ns.x,Us.z,0,-Us.x,wr.z,0,-wr.x,-Ns.y,Ns.x,0,-Us.y,Us.x,0,-wr.y,wr.x,0];return!Dd(t,Mo,So,wo,tc)||(t=[1,0,0,0,1,0,0,0,1],!Dd(t,Mo,So,wo,tc))?!1:(nc.crossVectors(Ns,Us),t=[nc.x,nc.y,nc.z],Dd(t,Mo,So,wo,tc))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Li).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Li).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(hs[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),hs[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),hs[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),hs[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),hs[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),hs[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),hs[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),hs[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(hs),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const hs=[new L,new L,new L,new L,new L,new L,new L,new L],Li=new L,ec=new Hr,Mo=new L,So=new L,wo=new L,Ns=new L,Us=new L,wr=new L,Wa=new L,tc=new L,nc=new L,Er=new L;function Dd(n,e,t,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){Er.fromArray(n,r);const a=s.x*Math.abs(Er.x)+s.y*Math.abs(Er.y)+s.z*Math.abs(Er.z),l=e.dot(Er),c=t.dot(Er),u=i.dot(Er);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Tn=new L,ic=new dt;let C1=0;class mn extends ir{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:C1++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=nf,this.updateRanges=[],this.gpuType=Ui,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)ic.fromBufferAttribute(this,t),ic.applyMatrix3(e),this.setXY(t,ic.x,ic.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Tn.fromBufferAttribute(this,t),Tn.applyMatrix3(e),this.setXYZ(t,Tn.x,Tn.y,Tn.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Tn.fromBufferAttribute(this,t),Tn.applyMatrix4(e),this.setXYZ(t,Tn.x,Tn.y,Tn.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Tn.fromBufferAttribute(this,t),Tn.applyNormalMatrix(e),this.setXYZ(t,Tn.x,Tn.y,Tn.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Tn.fromBufferAttribute(this,t),Tn.transformDirection(e),this.setXYZ(t,Tn.x,Tn.y,Tn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Zi(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=en(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Zi(t,this.array)),t}setX(e,t){return this.normalized&&(t=en(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Zi(t,this.array)),t}setY(e,t){return this.normalized&&(t=en(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Zi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=en(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Zi(t,this.array)),t}setW(e,t){return this.normalized&&(t=en(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=en(t,this.array),i=en(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=en(t,this.array),i=en(i,this.array),s=en(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=en(t,this.array),i=en(i,this.array),s=en(s,this.array),r=en(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==nf&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class u_ extends mn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class d_ extends mn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class $t extends mn{constructor(e,t,i){super(new Float32Array(e),t,i)}}const R1=new Hr,Xa=new L,Id=new L;class Vr{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):R1.setFromPoints(e).getCenter(i);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Xa.subVectors(e,this.center);const t=Xa.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Xa,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Id.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Xa.copy(e.center).add(Id)),this.expandByPoint(Xa.copy(e.center).sub(Id))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let P1=0;const Si=new Qt,Ld=new wn,Eo=new L,fi=new Hr,Ya=new Hr,On=new L;class Jt extends ir{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:P1++}),this.uuid=Zs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(l1(e)?d_:u_)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Ct().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Si.makeRotationFromQuaternion(e),this.applyMatrix4(Si),this}rotateX(e){return Si.makeRotationX(e),this.applyMatrix4(Si),this}rotateY(e){return Si.makeRotationY(e),this.applyMatrix4(Si),this}rotateZ(e){return Si.makeRotationZ(e),this.applyMatrix4(Si),this}translate(e,t,i){return Si.makeTranslation(e,t,i),this.applyMatrix4(Si),this}scale(e,t,i){return Si.makeScale(e,t,i),this.applyMatrix4(Si),this}lookAt(e){return Ld.lookAt(e),Ld.updateMatrix(),this.applyMatrix4(Ld.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Eo).negate(),this.translate(Eo.x,Eo.y,Eo.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const o=e[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new $t(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&bt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Hr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ot("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];fi.setFromBufferAttribute(r),this.morphTargetsRelative?(On.addVectors(this.boundingBox.min,fi.min),this.boundingBox.expandByPoint(On),On.addVectors(this.boundingBox.max,fi.max),this.boundingBox.expandByPoint(On)):(this.boundingBox.expandByPoint(fi.min),this.boundingBox.expandByPoint(fi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ot('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Vr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ot("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){const i=this.boundingSphere.center;if(fi.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];Ya.setFromBufferAttribute(a),this.morphTargetsRelative?(On.addVectors(fi.min,Ya.min),fi.expandByPoint(On),On.addVectors(fi.max,Ya.max),fi.expandByPoint(On)):(fi.expandByPoint(Ya.min),fi.expandByPoint(Ya.max))}fi.getCenter(i);let s=0;for(let r=0,o=e.count;r<o;r++)On.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(On));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)On.fromBufferAttribute(a,c),l&&(Eo.fromBufferAttribute(e,c),On.add(Eo)),s=Math.max(s,i.distanceToSquared(On))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ot('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ot("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;let o=this.getAttribute("tangent");(o===void 0||o.count!==i.count)&&(o=new mn(new Float32Array(4*i.count),4),this.setAttribute("tangent",o));const a=[],l=[];for(let v=0;v<i.count;v++)a[v]=new L,l[v]=new L;const c=new L,u=new L,h=new L,d=new dt,f=new dt,x=new dt,S=new L,m=new L;function p(v,A,F){c.fromBufferAttribute(i,v),u.fromBufferAttribute(i,A),h.fromBufferAttribute(i,F),d.fromBufferAttribute(r,v),f.fromBufferAttribute(r,A),x.fromBufferAttribute(r,F),u.sub(c),h.sub(c),f.sub(d),x.sub(d);const k=1/(f.x*x.y-x.x*f.y);isFinite(k)&&(S.copy(u).multiplyScalar(x.y).addScaledVector(h,-f.y).multiplyScalar(k),m.copy(h).multiplyScalar(f.x).addScaledVector(u,-x.x).multiplyScalar(k),a[v].add(S),a[A].add(S),a[F].add(S),l[v].add(m),l[A].add(m),l[F].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let v=0,A=y.length;v<A;++v){const F=y[v],k=F.start,U=F.count;for(let ee=k,le=k+U;ee<le;ee+=3)p(e.getX(ee+0),e.getX(ee+1),e.getX(ee+2))}const R=new L,M=new L,P=new L,T=new L;function I(v){P.fromBufferAttribute(s,v),T.copy(P);const A=a[v];R.copy(A),R.sub(P.multiplyScalar(P.dot(A))).normalize(),M.crossVectors(T,A);const k=M.dot(l[v])<0?-1:1;o.setXYZW(v,R.x,R.y,R.z,k)}for(let v=0,A=y.length;v<A;++v){const F=y[v],k=F.start,U=F.count;for(let ee=k,le=k+U;ee<le;ee+=3)I(e.getX(ee+0)),I(e.getX(ee+1)),I(e.getX(ee+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new mn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,f=i.count;d<f;d++)i.setXYZ(d,0,0,0);const s=new L,r=new L,o=new L,a=new L,l=new L,c=new L,u=new L,h=new L;if(e)for(let d=0,f=e.count;d<f;d+=3){const x=e.getX(d+0),S=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,x),r.fromBufferAttribute(t,S),o.fromBufferAttribute(t,m),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),a.fromBufferAttribute(i,x),l.fromBufferAttribute(i,S),c.fromBufferAttribute(i,m),a.add(u),l.add(u),c.add(u),i.setXYZ(x,a.x,a.y,a.z),i.setXYZ(S,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),i.setXYZ(d+0,u.x,u.y,u.z),i.setXYZ(d+1,u.x,u.y,u.z),i.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)On.fromBufferAttribute(e,t),On.normalize(),e.setXYZ(t,On.x,On.y,On.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,h=a.normalized,d=new c.constructor(l.length*u);let f=0,x=0;for(let S=0,m=l.length;S<m;S++){a.isInterleavedBufferAttribute?f=l[S]*a.data.stride+a.offset:f=l[S]*u;for(let p=0;p<u;p++)d[x++]=c[f++]}return new mn(d,u,h)}if(this.index===null)return bt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Jt,i=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=e(l,i);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let u=0,h=c.length;u<h;u++){const d=c[u],f=e(d,i);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){const f=c[h];u.push(f.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(t))}const r=e.morphAttributes;for(const c in r){const u=[],h=r[c];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class D1{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=nf,this.updateRanges=[],this.version=0,this.uuid=Zs()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Zs()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Zs()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const ti=new L;class cu{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)ti.fromBufferAttribute(this,t),ti.applyMatrix4(e),this.setXYZ(t,ti.x,ti.y,ti.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)ti.fromBufferAttribute(this,t),ti.applyNormalMatrix(e),this.setXYZ(t,ti.x,ti.y,ti.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)ti.fromBufferAttribute(this,t),ti.transformDirection(e),this.setXYZ(t,ti.x,ti.y,ti.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=Zi(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=en(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=en(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=en(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=en(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=en(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Zi(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Zi(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Zi(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Zi(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=en(t,this.array),i=en(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=en(t,this.array),i=en(i,this.array),s=en(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=en(t,this.array),i=en(i,this.array),s=en(s,this.array),r=en(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){lu("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new mn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new cu(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){lu("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let I1=0;class sr extends ir{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:I1++}),this.uuid=Zs(),this.name="",this.type="Material",this.blending=Wo,this.side=Qs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=mh,this.blendDst=gh,this.blendEquation=Pr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ze(0,0,0),this.blendAlpha=0,this.depthFunc=Zo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=fm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=mo,this.stencilZFail=mo,this.stencilZPass=mo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){bt(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){bt(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Wo&&(i.blending=this.blending),this.side!==Qs&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==mh&&(i.blendSrc=this.blendSrc),this.blendDst!==gh&&(i.blendDst=this.blendDst),this.blendEquation!==Pr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Zo&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==fm&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==mo&&(i.stencilFail=this.stencilFail),this.stencilZFail!==mo&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==mo&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Ze().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new dt().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new dt().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Wc extends sr{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ze(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let To;const qa=new L,Ao=new L,Co=new L,Ro=new dt,Ka=new dt,h_=new Qt,sc=new L,$a=new L,rc=new L,Am=new dt,Nd=new dt,Cm=new dt;class Ud extends wn{constructor(e=new Wc){if(super(),this.isSprite=!0,this.type="Sprite",To===void 0){To=new Jt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new D1(t,5);To.setIndex([0,1,2,0,2,3]),To.setAttribute("position",new cu(i,3,0,!1)),To.setAttribute("uv",new cu(i,2,3,!1))}this.geometry=To,this.material=e,this.center=new dt(.5,.5),this.count=1}raycast(e,t){e.camera===null&&Ot('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ao.setFromMatrixScale(this.matrixWorld),h_.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Co.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ao.multiplyScalar(-Co.z);const i=this.material.rotation;let s,r;i!==0&&(r=Math.cos(i),s=Math.sin(i));const o=this.center;oc(sc.set(-.5,-.5,0),Co,o,Ao,s,r),oc($a.set(.5,-.5,0),Co,o,Ao,s,r),oc(rc.set(.5,.5,0),Co,o,Ao,s,r),Am.set(0,0),Nd.set(1,0),Cm.set(1,1);let a=e.ray.intersectTriangle(sc,$a,rc,!1,qa);if(a===null&&(oc($a.set(-.5,.5,0),Co,o,Ao,s,r),Nd.set(0,1),a=e.ray.intersectTriangle(sc,rc,$a,!1,qa),a===null))return;const l=e.ray.origin.distanceTo(qa);l<e.near||l>e.far||t.push({distance:l,point:qa.clone(),uv:xi.getInterpolation(qa,sc,$a,rc,Am,Nd,Cm,new dt),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function oc(n,e,t,i,s,r){Ro.subVectors(n,t).addScalar(.5).multiply(i),s!==void 0?(Ka.x=r*Ro.x-s*Ro.y,Ka.y=s*Ro.x+r*Ro.y):Ka.copy(Ro),n.copy(e),n.x+=Ka.x,n.y+=Ka.y,n.applyMatrix4(h_)}const fs=new L,Fd=new L,ac=new L,Fs=new L,Od=new L,lc=new L,kd=new L;class Al{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,fs)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=fs.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(fs.copy(this.origin).addScaledVector(this.direction,t),fs.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){Fd.copy(e).add(t).multiplyScalar(.5),ac.copy(t).sub(e).normalize(),Fs.copy(this.origin).sub(Fd);const r=e.distanceTo(t)*.5,o=-this.direction.dot(ac),a=Fs.dot(this.direction),l=-Fs.dot(ac),c=Fs.lengthSq(),u=Math.abs(1-o*o);let h,d,f,x;if(u>0)if(h=o*l-a,d=o*a-l,x=r*u,h>=0)if(d>=-x)if(d<=x){const S=1/u;h*=S,d*=S,f=h*(h+o*d+2*a)+d*(o*h+d+2*l)+c}else d=r,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*l)+c;else d=-r,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*l)+c;else d<=-x?(h=Math.max(0,-(-o*r+a)),d=h>0?-r:Math.min(Math.max(-r,-l),r),f=-h*h+d*(d+2*l)+c):d<=x?(h=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(h=Math.max(0,-(o*r+a)),d=h>0?r:Math.min(Math.max(-r,-l),r),f=-h*h+d*(d+2*l)+c);else d=o>0?-r:r,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(Fd).addScaledVector(ac,d),f}intersectSphere(e,t){fs.subVectors(e.center,this.origin);const i=fs.dot(this.direction),s=fs.dot(fs)-i*i,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,s=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,s=(e.min.x-d.x)*c),u>=0?(r=(e.min.y-d.y)*u,o=(e.max.y-d.y)*u):(r=(e.max.y-d.y)*u,o=(e.min.y-d.y)*u),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),h>=0?(a=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(a=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,fs)!==null}intersectTriangle(e,t,i,s,r){Od.subVectors(t,e),lc.subVectors(i,e),kd.crossVectors(Od,lc);let o=this.direction.dot(kd),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Fs.subVectors(this.origin,e);const l=a*this.direction.dot(lc.crossVectors(Fs,lc));if(l<0)return null;const c=a*this.direction.dot(Od.cross(Fs));if(c<0||l+c>o)return null;const u=-a*Fs.dot(kd);return u<0?null:this.at(u/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ye extends sr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new tr,this.combine=Yg,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Rm=new Qt,Tr=new Al,cc=new Vr,Pm=new L,uc=new L,dc=new L,hc=new L,Bd=new L,fc=new L,Dm=new L,pc=new L;class D extends wn{constructor(e=new Jt,t=new ye){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){fc.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=a[l],h=r[l];u!==0&&(Bd.fromBufferAttribute(h,e),o?fc.addScaledVector(Bd,u):fc.addScaledVector(Bd.sub(t),u))}t.add(fc)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),cc.copy(i.boundingSphere),cc.applyMatrix4(r),Tr.copy(e.ray).recast(e.near),!(cc.containsPoint(Tr.origin)===!1&&(Tr.intersectSphere(cc,Pm)===null||Tr.origin.distanceToSquared(Pm)>(e.far-e.near)**2))&&(Rm.copy(r).invert(),Tr.copy(e.ray).applyMatrix4(Rm),!(i.boundingBox!==null&&Tr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Tr)))}_computeIntersections(e,t,i){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let x=0,S=d.length;x<S;x++){const m=d[x],p=o[m.materialIndex],y=Math.max(m.start,f.start),R=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let M=y,P=R;M<P;M+=3){const T=a.getX(M),I=a.getX(M+1),v=a.getX(M+2);s=mc(this,p,e,i,c,u,h,T,I,v),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const x=Math.max(0,f.start),S=Math.min(a.count,f.start+f.count);for(let m=x,p=S;m<p;m+=3){const y=a.getX(m),R=a.getX(m+1),M=a.getX(m+2);s=mc(this,o,e,i,c,u,h,y,R,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let x=0,S=d.length;x<S;x++){const m=d[x],p=o[m.materialIndex],y=Math.max(m.start,f.start),R=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let M=y,P=R;M<P;M+=3){const T=M,I=M+1,v=M+2;s=mc(this,p,e,i,c,u,h,T,I,v),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const x=Math.max(0,f.start),S=Math.min(l.count,f.start+f.count);for(let m=x,p=S;m<p;m+=3){const y=m,R=m+1,M=m+2;s=mc(this,o,e,i,c,u,h,y,R,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function L1(n,e,t,i,s,r,o,a){let l;if(e.side===vn?l=i.intersectTriangle(o,r,s,!0,a):l=i.intersectTriangle(s,r,o,e.side===Qs,a),l===null)return null;pc.copy(a),pc.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(pc);return c<t.near||c>t.far?null:{distance:c,point:pc.clone(),object:n}}function mc(n,e,t,i,s,r,o,a,l,c){n.getVertexPosition(a,uc),n.getVertexPosition(l,dc),n.getVertexPosition(c,hc);const u=L1(n,e,t,i,uc,dc,hc,Dm);if(u){const h=new L;xi.getBarycoord(Dm,uc,dc,hc,h),s&&(u.uv=xi.getInterpolatedAttribute(s,a,l,c,h,new dt)),r&&(u.uv1=xi.getInterpolatedAttribute(r,a,l,c,h,new dt)),o&&(u.normal=xi.getInterpolatedAttribute(o,a,l,c,h,new L),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new L,materialIndex:0};xi.getNormal(uc,dc,hc,d.normal),u.face=d,u.barycoord=h}return u}class f_ extends Jn{constructor(e=null,t=1,i=1,s,r,o,a,l,c=Xn,u=Xn,h,d){super(null,o,a,l,c,u,s,r,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Im extends mn{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Po=new Qt,Lm=new Qt,gc=[],Nm=new Hr,N1=new Qt,Za=new D,ja=new Vr;class U1 extends D{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Im(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,N1)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Hr),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Po),Nm.copy(e.boundingBox).applyMatrix4(Po),this.boundingBox.union(Nm)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Vr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Po),ja.copy(e.boundingSphere).applyMatrix4(Po),this.boundingSphere.union(ja)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,o=e*r+1;for(let a=0;a<i.length;a++)i[a]=s[o+a]}raycast(e,t){const i=this.matrixWorld,s=this.count;if(Za.geometry=this.geometry,Za.material=this.material,Za.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ja.copy(this.boundingSphere),ja.applyMatrix4(i),e.ray.intersectsSphere(ja)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Po),Lm.multiplyMatrices(i,Po),Za.matrixWorld=Lm,Za.raycast(e,gc);for(let o=0,a=gc.length;o<a;o++){const l=gc[o];l.instanceId=r,l.object=this,t.push(l)}gc.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Im(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const i=t.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new f_(new Float32Array(s*this.count),s,this.count,Nf,Ui));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<i.length;c++)o+=i[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=s*e;return r[l]=a,r.set(i,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Gd=new L,F1=new L,O1=new Ct;class Ws{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=Gd.subVectors(i,t).cross(F1.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const s=e.delta(Gd),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const o=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(s,o)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||O1.getNormalMatrix(e),s=this.coplanarPoint(Gd).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ar=new Vr,k1=new dt(.5,.5),_c=new L;class Hf{constructor(e=new Ws,t=new Ws,i=new Ws,s=new Ws,r=new Ws,o=new Ws){this.planes=[e,t,i,s,r,o]}set(e,t,i,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Ji,i=!1){const s=this.planes,r=e.elements,o=r[0],a=r[1],l=r[2],c=r[3],u=r[4],h=r[5],d=r[6],f=r[7],x=r[8],S=r[9],m=r[10],p=r[11],y=r[12],R=r[13],M=r[14],P=r[15];if(s[0].setComponents(c-o,f-u,p-x,P-y).normalize(),s[1].setComponents(c+o,f+u,p+x,P+y).normalize(),s[2].setComponents(c+a,f+h,p+S,P+R).normalize(),s[3].setComponents(c-a,f-h,p-S,P-R).normalize(),i)s[4].setComponents(l,d,m,M).normalize(),s[5].setComponents(c-l,f-d,p-m,P-M).normalize();else if(s[4].setComponents(c-l,f-d,p-m,P-M).normalize(),t===Ji)s[5].setComponents(c+l,f+d,p+m,P+M).normalize();else if(t===wl)s[5].setComponents(l,d,m,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ar.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ar.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ar)}intersectsSprite(e){Ar.center.set(0,0,0);const t=k1.distanceTo(e.center);return Ar.radius=.7071067811865476+t,Ar.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ar)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(_c.x=s.normal.x>0?e.max.x:e.min.x,_c.y=s.normal.y>0?e.max.y:e.min.y,_c.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(_c)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class ms extends sr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ze(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const uu=new L,du=new L,Um=new Qt,Ja=new Al,xc=new Vr,zd=new L,Fm=new L;class Xc extends wn{constructor(e=new Jt,t=new ms){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)uu.fromBufferAttribute(t,s-1),du.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=uu.distanceTo(du);e.setAttribute("lineDistance",new $t(i,1))}else bt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),xc.copy(i.boundingSphere),xc.applyMatrix4(s),xc.radius+=r,e.ray.intersectsSphere(xc)===!1)return;Um.copy(s).invert(),Ja.copy(e.ray).applyMatrix4(Um);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=i.index,d=i.attributes.position;if(u!==null){const f=Math.max(0,o.start),x=Math.min(u.count,o.start+o.count);for(let S=f,m=x-1;S<m;S+=c){const p=u.getX(S),y=u.getX(S+1),R=vc(this,e,Ja,l,p,y,S);R&&t.push(R)}if(this.isLineLoop){const S=u.getX(x-1),m=u.getX(f),p=vc(this,e,Ja,l,S,m,x-1);p&&t.push(p)}}else{const f=Math.max(0,o.start),x=Math.min(d.count,o.start+o.count);for(let S=f,m=x-1;S<m;S+=c){const p=vc(this,e,Ja,l,S,S+1,S);p&&t.push(p)}if(this.isLineLoop){const S=vc(this,e,Ja,l,x-1,f,x-1);S&&t.push(S)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function vc(n,e,t,i,s,r,o){const a=n.geometry.attributes.position;if(uu.fromBufferAttribute(a,s),du.fromBufferAttribute(a,r),t.distanceSqToSegment(uu,du,zd,Fm)>i)return;zd.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(zd);if(!(c<e.near||c>e.far))return{distance:c,point:Fm.clone().applyMatrix4(n.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:n}}const Om=new L,km=new L;class bc extends Xc{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let s=0,r=t.count;s<r;s+=2)Om.fromBufferAttribute(t,s),km.fromBufferAttribute(t,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+Om.distanceTo(km);e.setAttribute("lineDistance",new $t(i,1))}else bt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Fo extends sr{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ze(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Bm=new Qt,rf=new Al,yc=new Vr,Mc=new L;class Qa extends wn{constructor(e=new Jt,t=new Fo){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),yc.copy(i.boundingSphere),yc.applyMatrix4(s),yc.radius+=r,e.ray.intersectsSphere(yc)===!1)return;Bm.copy(s).invert(),rf.copy(e.ray).applyMatrix4(Bm);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,h=i.attributes.position;if(c!==null){const d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let x=d,S=f;x<S;x++){const m=c.getX(x);Mc.fromBufferAttribute(h,m),Gm(Mc,m,l,s,e,t,this)}}else{const d=Math.max(0,o.start),f=Math.min(h.count,o.start+o.count);for(let x=d,S=f;x<S;x++)Mc.fromBufferAttribute(h,x),Gm(Mc,x,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Gm(n,e,t,i,s,r,o){const a=rf.distanceSqToPoint(n);if(a<t){const l=new L;rf.closestPointToPoint(n,l),l.applyMatrix4(i);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class p_ extends Jn{constructor(e=[],t=kr,i,s,r,o,a,l,c,u){super(e,t,i,s,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class An extends Jn{constructor(e,t,i,s,r,o,a,l,c){super(e,t,i,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Jo extends Jn{constructor(e,t,i=ns,s,r,o,a=Xn,l=Xn,c,u=ws,h=1){if(u!==ws&&u!==Nr)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:h};super(d,s,r,o,a,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Gf(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class B1 extends Jo{constructor(e,t=ns,i=kr,s,r,o=Xn,a=Xn,l,c=ws){const u={width:e,height:e,depth:1},h=[u,u,u,u,u,u];super(e,e,t,i,s,r,o,a,l,c),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class m_ extends Jn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class vt extends Jt{constructor(e=1,t=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],u=[],h=[];let d=0,f=0;x("z","y","x",-1,-1,i,t,e,o,r,0),x("z","y","x",1,-1,i,t,-e,o,r,1),x("x","z","y",1,1,e,i,t,s,o,2),x("x","z","y",1,-1,e,i,-t,s,o,3),x("x","y","z",1,-1,e,t,i,s,r,4),x("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new $t(c,3)),this.setAttribute("normal",new $t(u,3)),this.setAttribute("uv",new $t(h,2));function x(S,m,p,y,R,M,P,T,I,v,A){const F=M/I,k=P/v,U=M/2,ee=P/2,le=T/2,$=I+1,se=v+1;let Z=0,ae=0;const Te=new L;for(let He=0;He<se;He++){const Oe=He*k-ee;for(let J=0;J<$;J++){const be=J*F-U;Te[S]=be*y,Te[m]=Oe*R,Te[p]=le,c.push(Te.x,Te.y,Te.z),Te[S]=0,Te[m]=0,Te[p]=T>0?1:-1,u.push(Te.x,Te.y,Te.z),h.push(J/I),h.push(1-He/v),Z+=1}}for(let He=0;He<v;He++)for(let Oe=0;Oe<I;Oe++){const J=d+Oe+$*He,be=d+Oe+$*(He+1),gt=d+(Oe+1)+$*(He+1),pt=d+(Oe+1)+$*He;l.push(J,be,pt),l.push(be,gt,pt),ae+=6}a.addGroup(f,ae,A),f+=ae,d+=Z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Vf extends Jt{constructor(e=1,t=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:s},t=Math.max(3,t);const r=[],o=[],a=[],l=[],c=new L,u=new dt;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let h=0,d=3;h<=t;h++,d+=3){const f=i+h/t*s;c.x=e*Math.cos(f),c.y=e*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(o[d]/e+1)/2,u.y=(o[d+1]/e+1)/2,l.push(u.x,u.y)}for(let h=1;h<=t;h++)r.push(h,h+1,0);this.setIndex(r),this.setAttribute("position",new $t(o,3)),this.setAttribute("normal",new $t(a,3)),this.setAttribute("uv",new $t(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vf(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class At extends Jt{constructor(e=1,t=1,i=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const u=[],h=[],d=[],f=[];let x=0;const S=[],m=i/2;let p=0;y(),o===!1&&(e>0&&R(!0),t>0&&R(!1)),this.setIndex(u),this.setAttribute("position",new $t(h,3)),this.setAttribute("normal",new $t(d,3)),this.setAttribute("uv",new $t(f,2));function y(){const M=new L,P=new L;let T=0;const I=(t-e)/i;for(let v=0;v<=r;v++){const A=[],F=v/r,k=F*(t-e)+e;for(let U=0;U<=s;U++){const ee=U/s,le=ee*l+a,$=Math.sin(le),se=Math.cos(le);P.x=k*$,P.y=-F*i+m,P.z=k*se,h.push(P.x,P.y,P.z),M.set($,I,se).normalize(),d.push(M.x,M.y,M.z),f.push(ee,1-F),A.push(x++)}S.push(A)}for(let v=0;v<s;v++)for(let A=0;A<r;A++){const F=S[A][v],k=S[A+1][v],U=S[A+1][v+1],ee=S[A][v+1];(e>0||A!==0)&&(u.push(F,k,ee),T+=3),(t>0||A!==r-1)&&(u.push(k,U,ee),T+=3)}c.addGroup(p,T,0),p+=T}function R(M){const P=x,T=new dt,I=new L;let v=0;const A=M===!0?e:t,F=M===!0?1:-1;for(let U=1;U<=s;U++)h.push(0,m*F,0),d.push(0,F,0),f.push(.5,.5),x++;const k=x;for(let U=0;U<=s;U++){const le=U/s*l+a,$=Math.cos(le),se=Math.sin(le);I.x=A*se,I.y=m*F,I.z=A*$,h.push(I.x,I.y,I.z),d.push(0,F,0),T.x=$*.5+.5,T.y=se*.5*F+.5,f.push(T.x,T.y),x++}for(let U=0;U<s;U++){const ee=P+U,le=k+U;M===!0?u.push(le,le+1,ee):u.push(le+1,le,ee),v+=3}c.addGroup(p,v,M===!0?1:2),p+=v}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new At(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class xn extends At{constructor(e=1,t=1,i=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,i,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new xn(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Cl extends Jt{constructor(e=[],t=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:s};const r=[],o=[];a(s),c(i),u(),this.setAttribute("position",new $t(r,3)),this.setAttribute("normal",new $t(r.slice(),3)),this.setAttribute("uv",new $t(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(y){const R=new L,M=new L,P=new L;for(let T=0;T<t.length;T+=3)f(t[T+0],R),f(t[T+1],M),f(t[T+2],P),l(R,M,P,y)}function l(y,R,M,P){const T=P+1,I=[];for(let v=0;v<=T;v++){I[v]=[];const A=y.clone().lerp(M,v/T),F=R.clone().lerp(M,v/T),k=T-v;for(let U=0;U<=k;U++)U===0&&v===T?I[v][U]=A:I[v][U]=A.clone().lerp(F,U/k)}for(let v=0;v<T;v++)for(let A=0;A<2*(T-v)-1;A++){const F=Math.floor(A/2);A%2===0?(d(I[v][F+1]),d(I[v+1][F]),d(I[v][F])):(d(I[v][F+1]),d(I[v+1][F+1]),d(I[v+1][F]))}}function c(y){const R=new L;for(let M=0;M<r.length;M+=3)R.x=r[M+0],R.y=r[M+1],R.z=r[M+2],R.normalize().multiplyScalar(y),r[M+0]=R.x,r[M+1]=R.y,r[M+2]=R.z}function u(){const y=new L;for(let R=0;R<r.length;R+=3){y.x=r[R+0],y.y=r[R+1],y.z=r[R+2];const M=m(y)/2/Math.PI+.5,P=p(y)/Math.PI+.5;o.push(M,1-P)}x(),h()}function h(){for(let y=0;y<o.length;y+=6){const R=o[y+0],M=o[y+2],P=o[y+4],T=Math.max(R,M,P),I=Math.min(R,M,P);T>.9&&I<.1&&(R<.2&&(o[y+0]+=1),M<.2&&(o[y+2]+=1),P<.2&&(o[y+4]+=1))}}function d(y){r.push(y.x,y.y,y.z)}function f(y,R){const M=y*3;R.x=e[M+0],R.y=e[M+1],R.z=e[M+2]}function x(){const y=new L,R=new L,M=new L,P=new L,T=new dt,I=new dt,v=new dt;for(let A=0,F=0;A<r.length;A+=9,F+=6){y.set(r[A+0],r[A+1],r[A+2]),R.set(r[A+3],r[A+4],r[A+5]),M.set(r[A+6],r[A+7],r[A+8]),T.set(o[F+0],o[F+1]),I.set(o[F+2],o[F+3]),v.set(o[F+4],o[F+5]),P.copy(y).add(R).add(M).divideScalar(3);const k=m(P);S(T,F+0,y,k),S(I,F+2,R,k),S(v,F+4,M,k)}}function S(y,R,M,P){P<0&&y.x===1&&(o[R]=y.x-1),M.x===0&&M.z===0&&(o[R]=P/2/Math.PI+.5)}function m(y){return Math.atan2(y.z,-y.x)}function p(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Cl(e.vertices,e.indices,e.radius,e.detail)}}class Dr extends Cl{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,s=1/i,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-i,0,-s,i,0,s,-i,0,s,i,-s,-i,0,-s,i,0,s,-i,0,s,i,0,-i,0,-s,i,0,-s,-i,0,s,i,0,s],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Dr(e.radius,e.detail)}}const Sc=new L,wc=new L,Hd=new L,Ec=new xi;class zm extends Jt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const s=Math.pow(10,4),r=Math.cos(fl*t),o=e.getIndex(),a=e.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],u=["a","b","c"],h=new Array(3),d={},f=[];for(let x=0;x<l;x+=3){o?(c[0]=o.getX(x),c[1]=o.getX(x+1),c[2]=o.getX(x+2)):(c[0]=x,c[1]=x+1,c[2]=x+2);const{a:S,b:m,c:p}=Ec;if(S.fromBufferAttribute(a,c[0]),m.fromBufferAttribute(a,c[1]),p.fromBufferAttribute(a,c[2]),Ec.getNormal(Hd),h[0]=`${Math.round(S.x*s)},${Math.round(S.y*s)},${Math.round(S.z*s)}`,h[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,h[2]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,!(h[0]===h[1]||h[1]===h[2]||h[2]===h[0]))for(let y=0;y<3;y++){const R=(y+1)%3,M=h[y],P=h[R],T=Ec[u[y]],I=Ec[u[R]],v=`${M}_${P}`,A=`${P}_${M}`;A in d&&d[A]?(Hd.dot(d[A].normal)<=r&&(f.push(T.x,T.y,T.z),f.push(I.x,I.y,I.z)),d[A]=null):v in d||(d[v]={index0:c[y],index1:c[R],normal:Hd.clone()})}}for(const x in d)if(d[x]){const{index0:S,index1:m}=d[x];Sc.fromBufferAttribute(a,S),wc.fromBufferAttribute(a,m),f.push(Sc.x,Sc.y,Sc.z),f.push(wc.x,wc.y,wc.z)}this.setAttribute("position",new $t(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class Wf extends Cl{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Wf(e.radius,e.detail)}}class Xs extends Cl{constructor(e=1,t=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Xs(e.radius,e.detail)}}class Fr extends Jt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(i),l=Math.floor(s),c=a+1,u=l+1,h=e/a,d=t/l,f=[],x=[],S=[],m=[];for(let p=0;p<u;p++){const y=p*d-o;for(let R=0;R<c;R++){const M=R*h-r;x.push(M,-y,0),S.push(0,0,1),m.push(R/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let y=0;y<a;y++){const R=y+c*p,M=y+c*(p+1),P=y+1+c*(p+1),T=y+1+c*p;f.push(R,M,T),f.push(M,P,T)}this.setIndex(f),this.setAttribute("position",new $t(x,3)),this.setAttribute("normal",new $t(S,3)),this.setAttribute("uv",new $t(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Fr(e.width,e.height,e.widthSegments,e.heightSegments)}}class kn extends Jt{constructor(e=.5,t=1,i=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:o},i=Math.max(3,i),s=Math.max(1,s);const a=[],l=[],c=[],u=[];let h=e;const d=(t-e)/s,f=new L,x=new dt;for(let S=0;S<=s;S++){for(let m=0;m<=i;m++){const p=r+m/i*o;f.x=h*Math.cos(p),f.y=h*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),x.x=(f.x/t+1)/2,x.y=(f.y/t+1)/2,u.push(x.x,x.y)}h+=d}for(let S=0;S<s;S++){const m=S*(i+1);for(let p=0;p<i;p++){const y=p+m,R=y,M=y+i+1,P=y+i+2,T=y+1;a.push(R,M,T),a.push(M,P,T)}}this.setIndex(a),this.setAttribute("position",new $t(l,3)),this.setAttribute("normal",new $t(c,3)),this.setAttribute("uv",new $t(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new kn(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Ae extends Jt{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const u=[],h=new L,d=new L,f=[],x=[],S=[],m=[];for(let p=0;p<=i;p++){const y=[],R=p/i,M=o+R*a,P=e*Math.cos(M),T=Math.sqrt(e*e-P*P);let I=0;p===0&&o===0?I=.5/t:p===i&&l===Math.PI&&(I=-.5/t);for(let v=0;v<=t;v++){const A=v/t,F=s+A*r;h.x=-T*Math.cos(F),h.y=P,h.z=T*Math.sin(F),x.push(h.x,h.y,h.z),d.copy(h).normalize(),S.push(d.x,d.y,d.z),m.push(A+I,1-R),y.push(c++)}u.push(y)}for(let p=0;p<i;p++)for(let y=0;y<t;y++){const R=u[p][y+1],M=u[p][y],P=u[p+1][y],T=u[p+1][y+1];(p!==0||o>0)&&f.push(R,M,T),(p!==i-1||l<Math.PI)&&f.push(M,P,T)}this.setIndex(f),this.setAttribute("position",new $t(x,3)),this.setAttribute("normal",new $t(S,3)),this.setAttribute("uv",new $t(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ae(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Bn extends Jt{constructor(e=1,t=.4,i=12,s=48,r=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:s,arc:r,thetaStart:o,thetaLength:a},i=Math.floor(i),s=Math.floor(s);const l=[],c=[],u=[],h=[],d=new L,f=new L,x=new L;for(let S=0;S<=i;S++){const m=o+S/i*a;for(let p=0;p<=s;p++){const y=p/s*r;f.x=(e+t*Math.cos(m))*Math.cos(y),f.y=(e+t*Math.cos(m))*Math.sin(y),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),d.x=e*Math.cos(y),d.y=e*Math.sin(y),x.subVectors(f,d).normalize(),u.push(x.x,x.y,x.z),h.push(p/s),h.push(S/i)}}for(let S=1;S<=i;S++)for(let m=1;m<=s;m++){const p=(s+1)*S+m-1,y=(s+1)*(S-1)+m-1,R=(s+1)*(S-1)+m,M=(s+1)*S+m;l.push(p,y,M),l.push(y,R,M)}this.setIndex(l),this.setAttribute("position",new $t(c,3)),this.setAttribute("normal",new $t(u,3)),this.setAttribute("uv",new $t(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bn(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}function Qo(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];if(Hm(s))s.isRenderTargetTexture?(bt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone();else if(Array.isArray(s))if(Hm(s[0])){const r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();e[t][i]=r}else e[t][i]=s.slice();else e[t][i]=s}}return e}function ii(n){const e={};for(let t=0;t<n.length;t++){const i=Qo(n[t]);for(const s in i)e[s]=i[s]}return e}function Hm(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function G1(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function g_(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:kt.workingColorSpace}const z1={clone:Qo,merge:ii};var H1=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,V1=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class is extends sr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=H1,this.fragmentShader=V1,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Qo(e.uniforms),this.uniformsGroups=G1(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const s=e.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=t[s.value]||null;break;case"c":this.uniforms[i].value=new Ze().setHex(s.value);break;case"v2":this.uniforms[i].value=new dt().fromArray(s.value);break;case"v3":this.uniforms[i].value=new L().fromArray(s.value);break;case"v4":this.uniforms[i].value=new gn().fromArray(s.value);break;case"m3":this.uniforms[i].value=new Ct().fromArray(s.value);break;case"m4":this.uniforms[i].value=new Qt().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class W1 extends is{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Ue extends sr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ze(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=tf,this.normalScale=new dt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new tr,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class X1 extends sr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=e1,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Y1 extends sr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Xf extends wn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ze(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const Vd=new Qt,Vm=new L,Wm=new L;class __{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new dt(512,512),this.mapType=_i,this.map=null,this.mapPass=null,this.matrix=new Qt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Hf,this._frameExtents=new dt(1,1),this._viewportCount=1,this._viewports=[new gn(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Vm.setFromMatrixPosition(e.matrixWorld),t.position.copy(Vm),Wm.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Wm),t.updateMatrixWorld(),Vd.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Vd,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===wl||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Vd)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Tc=new L,Ac=new er,Xi=new L;class x_ extends wn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Qt,this.projectionMatrix=new Qt,this.projectionMatrixInverse=new Qt,this.coordinateSystem=Ji,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Tc,Ac,Xi),Xi.x===1&&Xi.y===1&&Xi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Tc,Ac,Xi.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Tc,Ac,Xi),Xi.x===1&&Xi.y===1&&Xi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Tc,Ac,Xi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Os=new L,Xm=new dt,Ym=new dt;class mi extends x_{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=sf*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(fl*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return sf*2*Math.atan(Math.tan(fl*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Os.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Os.x,Os.y).multiplyScalar(-e/Os.z),Os.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Os.x,Os.y).multiplyScalar(-e/Os.z)}getViewSize(e,t){return this.getViewBounds(e,Xm,Ym),t.subVectors(Ym,Xm)}setViewOffset(e,t,i,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(fl*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*i/c,s*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class q1 extends __{constructor(){super(new mi(90,1,.5,500)),this.isPointLightShadow=!0}}class K1 extends Xf{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new q1}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class Yf extends x_{constructor(e=-1,t=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,o=i+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class $1 extends __{constructor(){super(new Yf(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Z1 extends Xf{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(wn.DEFAULT_UP),this.updateMatrix(),this.target=new wn,this.shadow=new $1}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class j1 extends Xf{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const Do=-90,Io=1;class J1 extends wn{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new mi(Do,Io,e,t);s.layers=this.layers,this.add(s);const r=new mi(Do,Io,e,t);r.layers=this.layers,this.add(r);const o=new mi(Do,Io,e,t);o.layers=this.layers,this.add(o);const a=new mi(Do,Io,e,t);a.layers=this.layers,this.add(a);const l=new mi(Do,Io,e,t);l.layers=this.layers,this.add(l);const c=new mi(Do,Io,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,o,a,l]=t;for(const c of t)this.remove(c);if(e===Ji)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===wl)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;const S=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=S,e.setRenderTarget(i,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(h,d,f),e.xr.enabled=x,i.texture.needsPMREMUpdate=!0}}class Q1 extends mi{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const qm=new Qt;class eS{constructor(e,t,i=0,s=1/0){this.ray=new Al(e,t),this.near=i,this.far=s,this.camera=null,this.layers=new zf,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Ot("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return qm.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(qm),this}intersectObject(e,t=!0,i=[]){return of(e,this,i,t),i.sort(Km),i}intersectObjects(e,t=!0,i=[]){for(let s=0,r=e.length;s<r;s++)of(e[s],this,i,t);return i.sort(Km),i}}function Km(n,e){return n.distance-e.distance}function of(n,e,t,i){let s=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let o=0,a=r.length;o<a;o++)of(r[o],e,t,!0)}}class $m{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Ut(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Ut(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const Jf=class Jf{constructor(e,t,i,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=s,this}};Jf.prototype.isMatrix2=!0;let Zm=Jf;class tS extends ir{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){bt("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function jm(n,e,t,i){const s=nS(i);switch(t){case r_:return n*e;case Nf:return n*e/s.components*s.byteLength;case Uf:return n*e/s.components*s.byteLength;case Br:return n*e*2/s.components*s.byteLength;case Ff:return n*e*2/s.components*s.byteLength;case o_:return n*e*3/s.components*s.byteLength;case Fi:return n*e*4/s.components*s.byteLength;case Of:return n*e*4/s.components*s.byteLength;case Gc:case zc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Hc:case Vc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Th:case Ch:return Math.max(n,16)*Math.max(e,8)/4;case Eh:case Ah:return Math.max(n,8)*Math.max(e,8)/2;case Rh:case Ph:case Ih:case Lh:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Dh:case iu:case Nh:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Uh:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Fh:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Oh:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case kh:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Bh:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Gh:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case zh:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Hh:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Vh:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Wh:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Xh:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Yh:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case qh:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Kh:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case $h:case Zh:case jh:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Jh:case Qh:return Math.ceil(n/4)*Math.ceil(e/4)*8;case su:case ef:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function nS(n){switch(n){case _i:case t_:return{byteLength:1,components:1};case Ml:case n_:case Ss:return{byteLength:2,components:1};case If:case Lf:return{byteLength:2,components:4};case ns:case Df:case Ui:return{byteLength:4,components:1};case i_:case s_:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Pf}}));typeof window<"u"&&(window.__THREE__?bt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Pf);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function v_(){let n=null,e=!1,t=null,i=null;function s(r,o){t(r,o),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function iS(n){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,h=c.byteLength,d=n.createBuffer();n.bindBuffer(l,d),n.bufferData(l,c,u),a.onUploadCallback();let f;if(c instanceof Float32Array)f=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=n.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=n.SHORT;else if(c instanceof Uint32Array)f=n.UNSIGNED_INT;else if(c instanceof Int32Array)f=n.INT;else if(c instanceof Int8Array)f=n.BYTE;else if(c instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function i(a,l,c){const u=l.array,h=l.updateRanges;if(n.bindBuffer(c,a),h.length===0)n.bufferSubData(c,0,u);else{h.sort((f,x)=>f.start-x.start);let d=0;for(let f=1;f<h.length;f++){const x=h[d],S=h[f];S.start<=x.start+x.count+1?x.count=Math.max(x.count,S.start+S.count-x.start):(++d,h[d]=S)}h.length=d+1;for(let f=0,x=h.length;f<x;f++){const S=h[f];n.bufferSubData(c,S.start*u.BYTES_PER_ELEMENT,u,S.start,S.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(n.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var sS=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,rS=`#ifdef USE_ALPHAHASH
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
#endif`,oS=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,aS=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,lS=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,cS=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,uS=`#ifdef USE_AOMAP
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
#endif`,dS=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,hS=`#ifdef USE_BATCHING
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
#endif`,fS=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,pS=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,mS=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,gS=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,_S=`#ifdef USE_IRIDESCENCE
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
#endif`,xS=`#ifdef USE_BUMPMAP
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
#endif`,vS=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,bS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,yS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,MS=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,SS=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,wS=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,ES=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,TS=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,AS=`#define PI 3.141592653589793
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
} // validated`,CS=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,RS=`vec3 transformedNormal = objectNormal;
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
#endif`,PS=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,DS=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,IS=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,LS=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,NS="gl_FragColor = linearToOutputTexel( gl_FragColor );",US=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,FS=`#ifdef USE_ENVMAP
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
#endif`,OS=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,kS=`#ifdef USE_ENVMAP
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
#endif`,BS=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,GS=`#ifdef USE_ENVMAP
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
#endif`,zS=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,HS=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,VS=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,WS=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,XS=`#ifdef USE_GRADIENTMAP
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
}`,YS=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,qS=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,KS=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,$S=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,ZS=`#ifdef USE_ENVMAP
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
#endif`,jS=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,JS=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,QS=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ew=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,tw=`PhysicalMaterial material;
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
#endif`,nw=`uniform sampler2D dfgLUT;
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
}`,iw=`
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
#endif`,sw=`#if defined( RE_IndirectDiffuse )
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
#endif`,rw=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ow=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,aw=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,lw=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,cw=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,uw=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,dw=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,hw=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,fw=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,pw=`#if defined( USE_POINTS_UV )
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
#endif`,mw=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,gw=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,_w=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,xw=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,vw=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,bw=`#ifdef USE_MORPHTARGETS
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
#endif`,yw=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Mw=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Sw=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,ww=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ew=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Tw=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Aw=`#ifdef USE_NORMALMAP
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
#endif`,Cw=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Rw=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Pw=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Dw=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Iw=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Lw=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Nw=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Uw=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Fw=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ow=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,kw=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Bw=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Gw=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,zw=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Hw=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Vw=`float getShadowMask() {
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
}`,Ww=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Xw=`#ifdef USE_SKINNING
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
#endif`,Yw=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,qw=`#ifdef USE_SKINNING
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
#endif`,Kw=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,$w=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Zw=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,jw=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Jw=`#ifdef USE_TRANSMISSION
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
#endif`,Qw=`#ifdef USE_TRANSMISSION
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
#endif`,eE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,tE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,nE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,iE=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const sE=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,rE=`uniform sampler2D t2D;
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
}`,oE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,aE=`#ifdef ENVMAP_TYPE_CUBE
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
}`,lE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cE=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,uE=`#include <common>
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
}`,dE=`#if DEPTH_PACKING == 3200
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
}`,hE=`#define DISTANCE
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
}`,fE=`#define DISTANCE
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
}`,pE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,mE=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gE=`uniform float scale;
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
}`,_E=`uniform vec3 diffuse;
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
}`,xE=`#include <common>
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
}`,vE=`uniform vec3 diffuse;
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
}`,bE=`#define LAMBERT
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
}`,yE=`#define LAMBERT
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
}`,ME=`#define MATCAP
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
}`,SE=`#define MATCAP
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
}`,wE=`#define NORMAL
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
}`,EE=`#define NORMAL
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
}`,TE=`#define PHONG
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
}`,AE=`#define PHONG
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
}`,CE=`#define STANDARD
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
}`,RE=`#define STANDARD
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
}`,PE=`#define TOON
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
}`,DE=`#define TOON
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
}`,IE=`uniform float size;
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
}`,LE=`uniform vec3 diffuse;
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
}`,NE=`#include <common>
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
}`,UE=`uniform vec3 color;
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
}`,FE=`uniform float rotation;
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
}`,OE=`uniform vec3 diffuse;
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
}`,It={alphahash_fragment:sS,alphahash_pars_fragment:rS,alphamap_fragment:oS,alphamap_pars_fragment:aS,alphatest_fragment:lS,alphatest_pars_fragment:cS,aomap_fragment:uS,aomap_pars_fragment:dS,batching_pars_vertex:hS,batching_vertex:fS,begin_vertex:pS,beginnormal_vertex:mS,bsdfs:gS,iridescence_fragment:_S,bumpmap_pars_fragment:xS,clipping_planes_fragment:vS,clipping_planes_pars_fragment:bS,clipping_planes_pars_vertex:yS,clipping_planes_vertex:MS,color_fragment:SS,color_pars_fragment:wS,color_pars_vertex:ES,color_vertex:TS,common:AS,cube_uv_reflection_fragment:CS,defaultnormal_vertex:RS,displacementmap_pars_vertex:PS,displacementmap_vertex:DS,emissivemap_fragment:IS,emissivemap_pars_fragment:LS,colorspace_fragment:NS,colorspace_pars_fragment:US,envmap_fragment:FS,envmap_common_pars_fragment:OS,envmap_pars_fragment:kS,envmap_pars_vertex:BS,envmap_physical_pars_fragment:ZS,envmap_vertex:GS,fog_vertex:zS,fog_pars_vertex:HS,fog_fragment:VS,fog_pars_fragment:WS,gradientmap_pars_fragment:XS,lightmap_pars_fragment:YS,lights_lambert_fragment:qS,lights_lambert_pars_fragment:KS,lights_pars_begin:$S,lights_toon_fragment:jS,lights_toon_pars_fragment:JS,lights_phong_fragment:QS,lights_phong_pars_fragment:ew,lights_physical_fragment:tw,lights_physical_pars_fragment:nw,lights_fragment_begin:iw,lights_fragment_maps:sw,lights_fragment_end:rw,lightprobes_pars_fragment:ow,logdepthbuf_fragment:aw,logdepthbuf_pars_fragment:lw,logdepthbuf_pars_vertex:cw,logdepthbuf_vertex:uw,map_fragment:dw,map_pars_fragment:hw,map_particle_fragment:fw,map_particle_pars_fragment:pw,metalnessmap_fragment:mw,metalnessmap_pars_fragment:gw,morphinstance_vertex:_w,morphcolor_vertex:xw,morphnormal_vertex:vw,morphtarget_pars_vertex:bw,morphtarget_vertex:yw,normal_fragment_begin:Mw,normal_fragment_maps:Sw,normal_pars_fragment:ww,normal_pars_vertex:Ew,normal_vertex:Tw,normalmap_pars_fragment:Aw,clearcoat_normal_fragment_begin:Cw,clearcoat_normal_fragment_maps:Rw,clearcoat_pars_fragment:Pw,iridescence_pars_fragment:Dw,opaque_fragment:Iw,packing:Lw,premultiplied_alpha_fragment:Nw,project_vertex:Uw,dithering_fragment:Fw,dithering_pars_fragment:Ow,roughnessmap_fragment:kw,roughnessmap_pars_fragment:Bw,shadowmap_pars_fragment:Gw,shadowmap_pars_vertex:zw,shadowmap_vertex:Hw,shadowmask_pars_fragment:Vw,skinbase_vertex:Ww,skinning_pars_vertex:Xw,skinning_vertex:Yw,skinnormal_vertex:qw,specularmap_fragment:Kw,specularmap_pars_fragment:$w,tonemapping_fragment:Zw,tonemapping_pars_fragment:jw,transmission_fragment:Jw,transmission_pars_fragment:Qw,uv_pars_fragment:eE,uv_pars_vertex:tE,uv_vertex:nE,worldpos_vertex:iE,background_vert:sE,background_frag:rE,backgroundCube_vert:oE,backgroundCube_frag:aE,cube_vert:lE,cube_frag:cE,depth_vert:uE,depth_frag:dE,distance_vert:hE,distance_frag:fE,equirect_vert:pE,equirect_frag:mE,linedashed_vert:gE,linedashed_frag:_E,meshbasic_vert:xE,meshbasic_frag:vE,meshlambert_vert:bE,meshlambert_frag:yE,meshmatcap_vert:ME,meshmatcap_frag:SE,meshnormal_vert:wE,meshnormal_frag:EE,meshphong_vert:TE,meshphong_frag:AE,meshphysical_vert:CE,meshphysical_frag:RE,meshtoon_vert:PE,meshtoon_frag:DE,points_vert:IE,points_frag:LE,shadow_vert:NE,shadow_frag:UE,sprite_vert:FE,sprite_frag:OE},je={common:{diffuse:{value:new Ze(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ct},alphaMap:{value:null},alphaMapTransform:{value:new Ct},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ct}},envmap:{envMap:{value:null},envMapRotation:{value:new Ct},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ct}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ct}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ct},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ct},normalScale:{value:new dt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ct},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ct}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ct}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ct}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ze(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new L},probesMax:{value:new L},probesResolution:{value:new L}},points:{diffuse:{value:new Ze(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ct},alphaTest:{value:0},uvTransform:{value:new Ct}},sprite:{diffuse:{value:new Ze(16777215)},opacity:{value:1},center:{value:new dt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ct},alphaMap:{value:null},alphaMapTransform:{value:new Ct},alphaTest:{value:0}}},$i={basic:{uniforms:ii([je.common,je.specularmap,je.envmap,je.aomap,je.lightmap,je.fog]),vertexShader:It.meshbasic_vert,fragmentShader:It.meshbasic_frag},lambert:{uniforms:ii([je.common,je.specularmap,je.envmap,je.aomap,je.lightmap,je.emissivemap,je.bumpmap,je.normalmap,je.displacementmap,je.fog,je.lights,{emissive:{value:new Ze(0)},envMapIntensity:{value:1}}]),vertexShader:It.meshlambert_vert,fragmentShader:It.meshlambert_frag},phong:{uniforms:ii([je.common,je.specularmap,je.envmap,je.aomap,je.lightmap,je.emissivemap,je.bumpmap,je.normalmap,je.displacementmap,je.fog,je.lights,{emissive:{value:new Ze(0)},specular:{value:new Ze(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:It.meshphong_vert,fragmentShader:It.meshphong_frag},standard:{uniforms:ii([je.common,je.envmap,je.aomap,je.lightmap,je.emissivemap,je.bumpmap,je.normalmap,je.displacementmap,je.roughnessmap,je.metalnessmap,je.fog,je.lights,{emissive:{value:new Ze(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:It.meshphysical_vert,fragmentShader:It.meshphysical_frag},toon:{uniforms:ii([je.common,je.aomap,je.lightmap,je.emissivemap,je.bumpmap,je.normalmap,je.displacementmap,je.gradientmap,je.fog,je.lights,{emissive:{value:new Ze(0)}}]),vertexShader:It.meshtoon_vert,fragmentShader:It.meshtoon_frag},matcap:{uniforms:ii([je.common,je.bumpmap,je.normalmap,je.displacementmap,je.fog,{matcap:{value:null}}]),vertexShader:It.meshmatcap_vert,fragmentShader:It.meshmatcap_frag},points:{uniforms:ii([je.points,je.fog]),vertexShader:It.points_vert,fragmentShader:It.points_frag},dashed:{uniforms:ii([je.common,je.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:It.linedashed_vert,fragmentShader:It.linedashed_frag},depth:{uniforms:ii([je.common,je.displacementmap]),vertexShader:It.depth_vert,fragmentShader:It.depth_frag},normal:{uniforms:ii([je.common,je.bumpmap,je.normalmap,je.displacementmap,{opacity:{value:1}}]),vertexShader:It.meshnormal_vert,fragmentShader:It.meshnormal_frag},sprite:{uniforms:ii([je.sprite,je.fog]),vertexShader:It.sprite_vert,fragmentShader:It.sprite_frag},background:{uniforms:{uvTransform:{value:new Ct},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:It.background_vert,fragmentShader:It.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ct}},vertexShader:It.backgroundCube_vert,fragmentShader:It.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:It.cube_vert,fragmentShader:It.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:It.equirect_vert,fragmentShader:It.equirect_frag},distance:{uniforms:ii([je.common,je.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:It.distance_vert,fragmentShader:It.distance_frag},shadow:{uniforms:ii([je.lights,je.fog,{color:{value:new Ze(0)},opacity:{value:1}}]),vertexShader:It.shadow_vert,fragmentShader:It.shadow_frag}};$i.physical={uniforms:ii([$i.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ct},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ct},clearcoatNormalScale:{value:new dt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ct},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ct},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ct},sheen:{value:0},sheenColor:{value:new Ze(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ct},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ct},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ct},transmissionSamplerSize:{value:new dt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ct},attenuationDistance:{value:0},attenuationColor:{value:new Ze(0)},specularColor:{value:new Ze(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ct},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ct},anisotropyVector:{value:new dt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ct}}]),vertexShader:It.meshphysical_vert,fragmentShader:It.meshphysical_frag};const Cc={r:0,b:0,g:0},kE=new Qt,b_=new Ct;b_.set(-1,0,0,0,1,0,0,0,1);function BE(n,e,t,i,s,r){const o=new Ze(0);let a=s===!0?0:1,l,c,u=null,h=0,d=null;function f(y){let R=y.isScene===!0?y.background:null;if(R&&R.isTexture){const M=y.backgroundBlurriness>0;R=e.get(R,M)}return R}function x(y){let R=!1;const M=f(y);M===null?m(o,a):M&&M.isColor&&(m(M,1),R=!0);const P=n.xr.getEnvironmentBlendMode();P==="additive"?t.buffers.color.setClear(0,0,0,1,r):P==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||R)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function S(y,R){const M=f(R);M&&(M.isCubeTexture||M.mapping===Ru)?(c===void 0&&(c=new D(new vt(1,1,1),new is({name:"BackgroundCubeMaterial",uniforms:Qo($i.backgroundCube.uniforms),vertexShader:$i.backgroundCube.vertexShader,fragmentShader:$i.backgroundCube.fragmentShader,side:vn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(P,T,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=M,c.material.uniforms.backgroundBlurriness.value=R.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(kE.makeRotationFromEuler(R.backgroundRotation)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(b_),c.material.toneMapped=kt.getTransfer(M.colorSpace)!==jt,(u!==M||h!==M.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,u=M,h=M.version,d=n.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new D(new Fr(2,2),new is({name:"BackgroundMaterial",uniforms:Qo($i.background.uniforms),vertexShader:$i.background.vertexShader,fragmentShader:$i.background.fragmentShader,side:Qs,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,l.material.toneMapped=kt.getTransfer(M.colorSpace)!==jt,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(u!==M||h!==M.version||d!==n.toneMapping)&&(l.material.needsUpdate=!0,u=M,h=M.version,d=n.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function m(y,R){y.getRGB(Cc,g_(n)),t.buffers.color.setClear(Cc.r,Cc.g,Cc.b,R,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(y,R=1){o.set(y),a=R,m(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(y){a=y,m(o,a)},render:x,addToRenderList:S,dispose:p}}function GE(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=d(null);let r=s,o=!1;function a(k,U,ee,le,$){let se=!1;const Z=h(k,le,ee,U);r!==Z&&(r=Z,c(r.object)),se=f(k,le,ee,$),se&&x(k,le,ee,$),$!==null&&e.update($,n.ELEMENT_ARRAY_BUFFER),(se||o)&&(o=!1,M(k,U,ee,le),$!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get($).buffer))}function l(){return n.createVertexArray()}function c(k){return n.bindVertexArray(k)}function u(k){return n.deleteVertexArray(k)}function h(k,U,ee,le){const $=le.wireframe===!0;let se=i[U.id];se===void 0&&(se={},i[U.id]=se);const Z=k.isInstancedMesh===!0?k.id:0;let ae=se[Z];ae===void 0&&(ae={},se[Z]=ae);let Te=ae[ee.id];Te===void 0&&(Te={},ae[ee.id]=Te);let He=Te[$];return He===void 0&&(He=d(l()),Te[$]=He),He}function d(k){const U=[],ee=[],le=[];for(let $=0;$<t;$++)U[$]=0,ee[$]=0,le[$]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:ee,attributeDivisors:le,object:k,attributes:{},index:null}}function f(k,U,ee,le){const $=r.attributes,se=U.attributes;let Z=0;const ae=ee.getAttributes();for(const Te in ae)if(ae[Te].location>=0){const Oe=$[Te];let J=se[Te];if(J===void 0&&(Te==="instanceMatrix"&&k.instanceMatrix&&(J=k.instanceMatrix),Te==="instanceColor"&&k.instanceColor&&(J=k.instanceColor)),Oe===void 0||Oe.attribute!==J||J&&Oe.data!==J.data)return!0;Z++}return r.attributesNum!==Z||r.index!==le}function x(k,U,ee,le){const $={},se=U.attributes;let Z=0;const ae=ee.getAttributes();for(const Te in ae)if(ae[Te].location>=0){let Oe=se[Te];Oe===void 0&&(Te==="instanceMatrix"&&k.instanceMatrix&&(Oe=k.instanceMatrix),Te==="instanceColor"&&k.instanceColor&&(Oe=k.instanceColor));const J={};J.attribute=Oe,Oe&&Oe.data&&(J.data=Oe.data),$[Te]=J,Z++}r.attributes=$,r.attributesNum=Z,r.index=le}function S(){const k=r.newAttributes;for(let U=0,ee=k.length;U<ee;U++)k[U]=0}function m(k){p(k,0)}function p(k,U){const ee=r.newAttributes,le=r.enabledAttributes,$=r.attributeDivisors;ee[k]=1,le[k]===0&&(n.enableVertexAttribArray(k),le[k]=1),$[k]!==U&&(n.vertexAttribDivisor(k,U),$[k]=U)}function y(){const k=r.newAttributes,U=r.enabledAttributes;for(let ee=0,le=U.length;ee<le;ee++)U[ee]!==k[ee]&&(n.disableVertexAttribArray(ee),U[ee]=0)}function R(k,U,ee,le,$,se,Z){Z===!0?n.vertexAttribIPointer(k,U,ee,$,se):n.vertexAttribPointer(k,U,ee,le,$,se)}function M(k,U,ee,le){S();const $=le.attributes,se=ee.getAttributes(),Z=U.defaultAttributeValues;for(const ae in se){const Te=se[ae];if(Te.location>=0){let He=$[ae];if(He===void 0&&(ae==="instanceMatrix"&&k.instanceMatrix&&(He=k.instanceMatrix),ae==="instanceColor"&&k.instanceColor&&(He=k.instanceColor)),He!==void 0){const Oe=He.normalized,J=He.itemSize,be=e.get(He);if(be===void 0)continue;const gt=be.buffer,pt=be.type,pe=be.bytesPerElement,Fe=pt===n.INT||pt===n.UNSIGNED_INT||He.gpuType===Df;if(He.isInterleavedBufferAttribute){const Ie=He.data,ht=Ie.stride,_t=He.offset;if(Ie.isInstancedInterleavedBuffer){for(let ot=0;ot<Te.locationSize;ot++)p(Te.location+ot,Ie.meshPerAttribute);k.isInstancedMesh!==!0&&le._maxInstanceCount===void 0&&(le._maxInstanceCount=Ie.meshPerAttribute*Ie.count)}else for(let ot=0;ot<Te.locationSize;ot++)m(Te.location+ot);n.bindBuffer(n.ARRAY_BUFFER,gt);for(let ot=0;ot<Te.locationSize;ot++)R(Te.location+ot,J/Te.locationSize,pt,Oe,ht*pe,(_t+J/Te.locationSize*ot)*pe,Fe)}else{if(He.isInstancedBufferAttribute){for(let Ie=0;Ie<Te.locationSize;Ie++)p(Te.location+Ie,He.meshPerAttribute);k.isInstancedMesh!==!0&&le._maxInstanceCount===void 0&&(le._maxInstanceCount=He.meshPerAttribute*He.count)}else for(let Ie=0;Ie<Te.locationSize;Ie++)m(Te.location+Ie);n.bindBuffer(n.ARRAY_BUFFER,gt);for(let Ie=0;Ie<Te.locationSize;Ie++)R(Te.location+Ie,J/Te.locationSize,pt,Oe,J*pe,J/Te.locationSize*Ie*pe,Fe)}}else if(Z!==void 0){const Oe=Z[ae];if(Oe!==void 0)switch(Oe.length){case 2:n.vertexAttrib2fv(Te.location,Oe);break;case 3:n.vertexAttrib3fv(Te.location,Oe);break;case 4:n.vertexAttrib4fv(Te.location,Oe);break;default:n.vertexAttrib1fv(Te.location,Oe)}}}}y()}function P(){A();for(const k in i){const U=i[k];for(const ee in U){const le=U[ee];for(const $ in le){const se=le[$];for(const Z in se)u(se[Z].object),delete se[Z];delete le[$]}}delete i[k]}}function T(k){if(i[k.id]===void 0)return;const U=i[k.id];for(const ee in U){const le=U[ee];for(const $ in le){const se=le[$];for(const Z in se)u(se[Z].object),delete se[Z];delete le[$]}}delete i[k.id]}function I(k){for(const U in i){const ee=i[U];for(const le in ee){const $=ee[le];if($[k.id]===void 0)continue;const se=$[k.id];for(const Z in se)u(se[Z].object),delete se[Z];delete $[k.id]}}}function v(k){for(const U in i){const ee=i[U],le=k.isInstancedMesh===!0?k.id:0,$=ee[le];if($!==void 0){for(const se in $){const Z=$[se];for(const ae in Z)u(Z[ae].object),delete Z[ae];delete $[se]}delete ee[le],Object.keys(ee).length===0&&delete i[U]}}}function A(){F(),o=!0,r!==s&&(r=s,c(r.object))}function F(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:A,resetDefaultState:F,dispose:P,releaseStatesOfGeometry:T,releaseStatesOfObject:v,releaseStatesOfProgram:I,initAttributes:S,enableAttribute:m,disableUnusedAttributes:y}}function zE(n,e,t){let i;function s(l){i=l}function r(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function o(l,c,u){u!==0&&(n.drawArraysInstanced(i,l,c,u),t.update(c,i,u))}function a(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,u);let d=0;for(let f=0;f<u;f++)d+=c[f];t.update(d,i,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function HE(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const I=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(I){return!(I!==Fi&&i.convert(I)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(I){const v=I===Ss&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(I!==_i&&i.convert(I)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&I!==Ui&&!v)}function l(I){if(I==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(bt("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&bt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),y=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),R=n.getParameter(n.MAX_VARYING_VECTORS),M=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),P=n.getParameter(n.MAX_SAMPLES),T=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:x,maxTextureSize:S,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:y,maxVaryings:R,maxFragmentUniforms:M,maxSamples:P,samples:T}}function VE(n){const e=this;let t=null,i=0,s=!1,r=!1;const o=new Ws,a=new Ct,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const f=h.length!==0||d||i!==0||s;return s=d,i=h.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,f){const x=h.clippingPlanes,S=h.clipIntersection,m=h.clipShadows,p=n.get(h);if(!s||x===null||x.length===0||r&&!m)r?u(null):c();else{const y=r?0:i,R=y*4;let M=p.clippingState||null;l.value=M,M=u(x,d,R,f);for(let P=0;P!==R;++P)M[P]=t[P];p.clippingState=M,this.numIntersection=S?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(h,d,f,x){const S=h!==null?h.length:0;let m=null;if(S!==0){if(m=l.value,x!==!0||m===null){const p=f+S*4,y=d.matrixWorldInverse;a.getNormalMatrix(y),(m===null||m.length<p)&&(m=new Float32Array(p));for(let R=0,M=f;R!==S;++R,M+=4)o.copy(h[R]).applyMatrix4(y,a),o.normal.toArray(m,M),m[M+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=S,e.numIntersection=0,m}}const Ks=4,Jm=[.125,.215,.35,.446,.526,.582],Ir=20,WE=256,el=new Yf,Qm=new Ze;let Wd=null,Xd=0,Yd=0,qd=!1;const XE=new L;class e0{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){const{size:o=256,position:a=XE}=r;Wd=this._renderer.getRenderTarget(),Xd=this._renderer.getActiveCubeFace(),Yd=this._renderer.getActiveMipmapLevel(),qd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,s,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=i0(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=n0(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Wd,Xd,Yd),this._renderer.xr.enabled=qd,e.scissorTest=!1,Lo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===kr||e.mapping===jo?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Wd=this._renderer.getRenderTarget(),Xd=this._renderer.getActiveCubeFace(),Yd=this._renderer.getActiveMipmapLevel(),qd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Cn,minFilter:Cn,generateMipmaps:!1,type:Ss,format:Fi,colorSpace:ru,depthBuffer:!1},s=t0(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=t0(e,t,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=YE(r)),this._blurMaterial=KE(r,e,t),this._ggxMaterial=qE(r,e,t)}return s}_compileMaterial(e){const t=new D(new Jt,e);this._renderer.compile(t,el)}_sceneToCubeUV(e,t,i,s,r){const l=new mi(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,f=h.toneMapping;h.getClearColor(Qm),h.toneMapping=es,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(s),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new D(new vt,new ye({name:"PMREM.Background",side:vn,depthWrite:!1,depthTest:!1})));const S=this._backgroundBox,m=S.material;let p=!1;const y=e.background;y?y.isColor&&(m.color.copy(y),e.background=null,p=!0):(m.color.copy(Qm),p=!0);for(let R=0;R<6;R++){const M=R%3;M===0?(l.up.set(0,c[R],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[R],r.y,r.z)):M===1?(l.up.set(0,0,c[R]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[R],r.z)):(l.up.set(0,c[R],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[R]));const P=this._cubeSize;Lo(s,M*P,R>2?P:0,P,P),h.setRenderTarget(s),p&&h.render(S,l),h.render(e,l)}h.toneMapping=f,h.autoClear=d,e.background=y}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===kr||e.mapping===jo;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=i0()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=n0());const r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;const a=r.uniforms;a.envMap.value=e;const l=this._cubeSize;Lo(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,el)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){const s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[i];a.material=o;const l=o.uniforms,c=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),h=Math.sqrt(c*c-u*u),d=0+c*1.25,f=h*d,{_lodMax:x}=this,S=this._sizeLods[i],m=3*S*(i>x-Ks?i-x+Ks:0),p=4*(this._cubeSize-S);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=x-t,Lo(r,m,p,3*S,2*S),s.setRenderTarget(r),s.render(a,el),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=x-i,Lo(e,m,p,3*S,2*S),s.setRenderTarget(e),s.render(a,el)}_blur(e,t,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,s,"latitudinal",r),this._halfBlur(o,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&Ot("blur direction must be either latitudinal or longitudinal!");const u=3,h=this._lodMeshes[s];h.material=c;const d=c.uniforms,f=this._sizeLods[i]-1,x=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Ir-1),S=r/x,m=isFinite(r)?1+Math.floor(u*S):Ir;m>Ir&&bt(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ir}`);const p=[];let y=0;for(let I=0;I<Ir;++I){const v=I/S,A=Math.exp(-v*v/2);p.push(A),I===0?y+=A:I<m&&(y+=2*A)}for(let I=0;I<p.length;I++)p[I]=p[I]/y;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:R}=this;d.dTheta.value=x,d.mipInt.value=R-i;const M=this._sizeLods[s],P=3*M*(s>R-Ks?s-R+Ks:0),T=4*(this._cubeSize-M);Lo(t,P,T,3*M,2*M),l.setRenderTarget(t),l.render(h,el)}}function YE(n){const e=[],t=[],i=[];let s=n;const r=n-Ks+1+Jm.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let l=1/a;o>n-Ks?l=Jm[o-n+Ks-1]:o===0&&(l=0),t.push(l);const c=1/(a-2),u=-c,h=1+c,d=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,x=6,S=3,m=2,p=1,y=new Float32Array(S*x*f),R=new Float32Array(m*x*f),M=new Float32Array(p*x*f);for(let T=0;T<f;T++){const I=T%3*2/3-1,v=T>2?0:-1,A=[I,v,0,I+2/3,v,0,I+2/3,v+1,0,I,v,0,I+2/3,v+1,0,I,v+1,0];y.set(A,S*x*T),R.set(d,m*x*T);const F=[T,T,T,T,T,T];M.set(F,p*x*T)}const P=new Jt;P.setAttribute("position",new mn(y,S)),P.setAttribute("uv",new mn(R,m)),P.setAttribute("faceIndex",new mn(M,p)),i.push(new D(P,null)),s>Ks&&s--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function t0(n,e,t){const i=new ts(n,e,t);return i.texture.mapping=Ru,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Lo(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function qE(n,e,t){return new is({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:WE,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Pu(),fragmentShader:`

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
		`,blending:vs,depthTest:!1,depthWrite:!1})}function KE(n,e,t){const i=new Float32Array(Ir),s=new L(0,1,0);return new is({name:"SphericalGaussianBlur",defines:{n:Ir,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Pu(),fragmentShader:`

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
		`,blending:vs,depthTest:!1,depthWrite:!1})}function n0(){return new is({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Pu(),fragmentShader:`

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
		`,blending:vs,depthTest:!1,depthWrite:!1})}function i0(){return new is({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Pu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:vs,depthTest:!1,depthWrite:!1})}function Pu(){return`

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
	`}class y_ extends ts{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new p_(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new vt(5,5,5),r=new is({name:"CubemapFromEquirect",uniforms:Qo(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:vn,blending:vs});r.uniforms.tEquirect.value=t;const o=new D(s,r),a=t.minFilter;return t.minFilter===Lr&&(t.minFilter=Cn),new J1(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,s);e.setRenderTarget(r)}}function $E(n){let e=new WeakMap,t=new WeakMap,i=null;function s(d,f=!1){return d==null?null:f?o(d):r(d)}function r(d){if(d&&d.isTexture){const f=d.mapping;if(f===fd||f===pd)if(e.has(d)){const x=e.get(d).texture;return a(x,d.mapping)}else{const x=d.image;if(x&&x.height>0){const S=new y_(x.height);return S.fromEquirectangularTexture(n,d),e.set(d,S),d.addEventListener("dispose",c),a(S.texture,d.mapping)}else return null}}return d}function o(d){if(d&&d.isTexture){const f=d.mapping,x=f===fd||f===pd,S=f===kr||f===jo;if(x||S){let m=t.get(d);const p=m!==void 0?m.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==p)return i===null&&(i=new e0(n)),m=x?i.fromEquirectangular(d,m):i.fromCubemap(d,m),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),m.texture;if(m!==void 0)return m.texture;{const y=d.image;return x&&y&&y.height>0||S&&y&&l(y)?(i===null&&(i=new e0(n)),m=x?i.fromEquirectangular(d):i.fromCubemap(d),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),d.addEventListener("dispose",u),m.texture):null}}}return d}function a(d,f){return f===fd?d.mapping=kr:f===pd&&(d.mapping=jo),d}function l(d){let f=0;const x=6;for(let S=0;S<x;S++)d[S]!==void 0&&f++;return f===x}function c(d){const f=d.target;f.removeEventListener("dispose",c);const x=e.get(f);x!==void 0&&(e.delete(f),x.dispose())}function u(d){const f=d.target;f.removeEventListener("dispose",u);const x=t.get(f);x!==void 0&&(t.delete(f),x.dispose())}function h(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:h}}function ZE(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&Xo("WebGLRenderer: "+i+" extension not supported."),s}}}function jE(n,e,t,i){const s={},r=new WeakMap;function o(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const x in d.attributes)e.remove(d.attributes[x]);d.removeEventListener("dispose",o),delete s[d.id];const f=r.get(d);f&&(e.remove(f),r.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(h,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,t.memory.geometries++),d}function l(h){const d=h.attributes;for(const f in d)e.update(d[f],n.ARRAY_BUFFER)}function c(h){const d=[],f=h.index,x=h.attributes.position;let S=0;if(x===void 0)return;if(f!==null){const y=f.array;S=f.version;for(let R=0,M=y.length;R<M;R+=3){const P=y[R+0],T=y[R+1],I=y[R+2];d.push(P,T,T,I,I,P)}}else{const y=x.array;S=x.version;for(let R=0,M=y.length/3-1;R<M;R+=3){const P=R+0,T=R+1,I=R+2;d.push(P,T,T,I,I,P)}}const m=new(x.count>=65535?d_:u_)(d,1);m.version=S;const p=r.get(h);p&&e.remove(p),r.set(h,m)}function u(h){const d=r.get(h);if(d){const f=h.index;f!==null&&d.version<f.version&&c(h)}else c(h);return r.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function JE(n,e,t){let i;function s(h){i=h}let r,o;function a(h){r=h.type,o=h.bytesPerElement}function l(h,d){n.drawElements(i,d,r,h*o),t.update(d,i,1)}function c(h,d,f){f!==0&&(n.drawElementsInstanced(i,d,r,h*o,f),t.update(d,i,f))}function u(h,d,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,r,h,0,f);let S=0;for(let m=0;m<f;m++)S+=d[m];t.update(S,i,1)}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function QE(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(r/3);break;case n.LINES:t.lines+=a*(r/2);break;case n.LINE_STRIP:t.lines+=a*(r-1);break;case n.LINE_LOOP:t.lines+=a*r;break;case n.POINTS:t.points+=a*r;break;default:Ot("WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function e2(n,e,t){const i=new WeakMap,s=new gn;function r(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let d=i.get(a);if(d===void 0||d.count!==h){let F=function(){v.dispose(),i.delete(a),a.removeEventListener("dispose",F)};var f=F;d!==void 0&&d.texture.dispose();const x=a.morphAttributes.position!==void 0,S=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],y=a.morphAttributes.normal||[],R=a.morphAttributes.color||[];let M=0;x===!0&&(M=1),S===!0&&(M=2),m===!0&&(M=3);let P=a.attributes.position.count*M,T=1;P>e.maxTextureSize&&(T=Math.ceil(P/e.maxTextureSize),P=e.maxTextureSize);const I=new Float32Array(P*T*4*h),v=new l_(I,P,T,h);v.type=Ui,v.needsUpdate=!0;const A=M*4;for(let k=0;k<h;k++){const U=p[k],ee=y[k],le=R[k],$=P*T*4*k;for(let se=0;se<U.count;se++){const Z=se*A;x===!0&&(s.fromBufferAttribute(U,se),I[$+Z+0]=s.x,I[$+Z+1]=s.y,I[$+Z+2]=s.z,I[$+Z+3]=0),S===!0&&(s.fromBufferAttribute(ee,se),I[$+Z+4]=s.x,I[$+Z+5]=s.y,I[$+Z+6]=s.z,I[$+Z+7]=0),m===!0&&(s.fromBufferAttribute(le,se),I[$+Z+8]=s.x,I[$+Z+9]=s.y,I[$+Z+10]=s.z,I[$+Z+11]=le.itemSize===4?s.w:1)}}d={count:h,texture:v,size:new dt(P,T)},i.set(a,d),a.addEventListener("dispose",F)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let x=0;for(let m=0;m<c.length;m++)x+=c[m];const S=a.morphTargetsRelative?1:1-x;l.getUniforms().setValue(n,"morphTargetBaseInfluence",S),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:r}}function t2(n,e,t,i,s){let r=new WeakMap;function o(c){const u=s.render.frame,h=c.geometry,d=e.get(c,h);if(r.get(d)!==u&&(e.update(d),r.set(d,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==u&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){const f=c.skeleton;r.get(f)!==u&&(f.update(),r.set(f,u))}return d}function a(){r=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:o,dispose:a}}const n2={[qg]:"LINEAR_TONE_MAPPING",[Kg]:"REINHARD_TONE_MAPPING",[$g]:"CINEON_TONE_MAPPING",[Zg]:"ACES_FILMIC_TONE_MAPPING",[Jg]:"AGX_TONE_MAPPING",[Qg]:"NEUTRAL_TONE_MAPPING",[jg]:"CUSTOM_TONE_MAPPING"};function i2(n,e,t,i,s,r){const o=new ts(e,t,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,depthTexture:s?new Jo(e,t):void 0}),a=new ts(e,t,{type:Ss,depthBuffer:!1,stencilBuffer:!1}),l=new Jt;l.setAttribute("position",new $t([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new $t([0,2,0,0,2,0],2));const c=new W1({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),u=new D(l,c),h=new Yf(-1,1,1,-1,0,1);let d=null,f=null,x=!1,S,m=null,p=[],y=!1;this.setSize=function(R,M){o.setSize(R,M),a.setSize(R,M);for(let P=0;P<p.length;P++){const T=p[P];T.setSize&&T.setSize(R,M)}},this.setEffects=function(R){p=R,y=p.length>0&&p[0].isRenderPass===!0;const M=o.width,P=o.height;for(let T=0;T<p.length;T++){const I=p[T];I.setSize&&I.setSize(M,P)}},this.begin=function(R,M){if(x||R.toneMapping===es&&p.length===0)return!1;if(m=M,M!==null){const P=M.width,T=M.height;(o.width!==P||o.height!==T)&&this.setSize(P,T)}return y===!1&&R.setRenderTarget(o),S=R.toneMapping,R.toneMapping=es,!0},this.hasRenderPass=function(){return y},this.end=function(R,M){R.toneMapping=S,x=!0;let P=o,T=a;for(let I=0;I<p.length;I++){const v=p[I];if(v.enabled!==!1&&(v.render(R,T,P,M),v.needsSwap!==!1)){const A=P;P=T,T=A}}if(d!==R.outputColorSpace||f!==R.toneMapping){d=R.outputColorSpace,f=R.toneMapping,c.defines={},kt.getTransfer(d)===jt&&(c.defines.SRGB_TRANSFER="");const I=n2[f];I&&(c.defines[I]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=P.texture,R.setRenderTarget(m),R.render(u,h),m=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){o.depthTexture&&o.depthTexture.dispose(),o.dispose(),a.dispose(),l.dispose(),c.dispose()}}const M_=new Jn,af=new Jo(1,1),S_=new l_,w_=new v1,E_=new p_,s0=[],r0=[],o0=new Float32Array(16),a0=new Float32Array(9),l0=new Float32Array(4);function ea(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=s0[s];if(r===void 0&&(r=new Float32Array(s),s0[s]=r),e!==0){i.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(r,a)}return r}function Dn(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function In(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Du(n,e){let t=r0[e];t===void 0&&(t=new Int32Array(e),r0[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function s2(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function r2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dn(t,e))return;n.uniform2fv(this.addr,e),In(t,e)}}function o2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Dn(t,e))return;n.uniform3fv(this.addr,e),In(t,e)}}function a2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dn(t,e))return;n.uniform4fv(this.addr,e),In(t,e)}}function l2(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Dn(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),In(t,e)}else{if(Dn(t,i))return;l0.set(i),n.uniformMatrix2fv(this.addr,!1,l0),In(t,i)}}function c2(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Dn(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),In(t,e)}else{if(Dn(t,i))return;a0.set(i),n.uniformMatrix3fv(this.addr,!1,a0),In(t,i)}}function u2(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Dn(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),In(t,e)}else{if(Dn(t,i))return;o0.set(i),n.uniformMatrix4fv(this.addr,!1,o0),In(t,i)}}function d2(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function h2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dn(t,e))return;n.uniform2iv(this.addr,e),In(t,e)}}function f2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Dn(t,e))return;n.uniform3iv(this.addr,e),In(t,e)}}function p2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dn(t,e))return;n.uniform4iv(this.addr,e),In(t,e)}}function m2(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function g2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dn(t,e))return;n.uniform2uiv(this.addr,e),In(t,e)}}function _2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Dn(t,e))return;n.uniform3uiv(this.addr,e),In(t,e)}}function x2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dn(t,e))return;n.uniform4uiv(this.addr,e),In(t,e)}}function v2(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(af.compareFunction=t.isReversedDepthBuffer()?Bf:kf,r=af):r=M_,t.setTexture2D(e||r,s)}function b2(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||w_,s)}function y2(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||E_,s)}function M2(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||S_,s)}function S2(n){switch(n){case 5126:return s2;case 35664:return r2;case 35665:return o2;case 35666:return a2;case 35674:return l2;case 35675:return c2;case 35676:return u2;case 5124:case 35670:return d2;case 35667:case 35671:return h2;case 35668:case 35672:return f2;case 35669:case 35673:return p2;case 5125:return m2;case 36294:return g2;case 36295:return _2;case 36296:return x2;case 35678:case 36198:case 36298:case 36306:case 35682:return v2;case 35679:case 36299:case 36307:return b2;case 35680:case 36300:case 36308:case 36293:return y2;case 36289:case 36303:case 36311:case 36292:return M2}}function w2(n,e){n.uniform1fv(this.addr,e)}function E2(n,e){const t=ea(e,this.size,2);n.uniform2fv(this.addr,t)}function T2(n,e){const t=ea(e,this.size,3);n.uniform3fv(this.addr,t)}function A2(n,e){const t=ea(e,this.size,4);n.uniform4fv(this.addr,t)}function C2(n,e){const t=ea(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function R2(n,e){const t=ea(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function P2(n,e){const t=ea(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function D2(n,e){n.uniform1iv(this.addr,e)}function I2(n,e){n.uniform2iv(this.addr,e)}function L2(n,e){n.uniform3iv(this.addr,e)}function N2(n,e){n.uniform4iv(this.addr,e)}function U2(n,e){n.uniform1uiv(this.addr,e)}function F2(n,e){n.uniform2uiv(this.addr,e)}function O2(n,e){n.uniform3uiv(this.addr,e)}function k2(n,e){n.uniform4uiv(this.addr,e)}function B2(n,e,t){const i=this.cache,s=e.length,r=Du(t,s);Dn(i,r)||(n.uniform1iv(this.addr,r),In(i,r));let o;this.type===n.SAMPLER_2D_SHADOW?o=af:o=M_;for(let a=0;a!==s;++a)t.setTexture2D(e[a]||o,r[a])}function G2(n,e,t){const i=this.cache,s=e.length,r=Du(t,s);Dn(i,r)||(n.uniform1iv(this.addr,r),In(i,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||w_,r[o])}function z2(n,e,t){const i=this.cache,s=e.length,r=Du(t,s);Dn(i,r)||(n.uniform1iv(this.addr,r),In(i,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||E_,r[o])}function H2(n,e,t){const i=this.cache,s=e.length,r=Du(t,s);Dn(i,r)||(n.uniform1iv(this.addr,r),In(i,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||S_,r[o])}function V2(n){switch(n){case 5126:return w2;case 35664:return E2;case 35665:return T2;case 35666:return A2;case 35674:return C2;case 35675:return R2;case 35676:return P2;case 5124:case 35670:return D2;case 35667:case 35671:return I2;case 35668:case 35672:return L2;case 35669:case 35673:return N2;case 5125:return U2;case 36294:return F2;case 36295:return O2;case 36296:return k2;case 35678:case 36198:case 36298:case 36306:case 35682:return B2;case 35679:case 36299:case 36307:return G2;case 35680:case 36300:case 36308:case 36293:return z2;case 36289:case 36303:case 36311:case 36292:return H2}}class W2{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=S2(t.type)}}class X2{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=V2(t.type)}}class Y2{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],i)}}}const Kd=/(\w+)(\])?(\[|\.)?/g;function c0(n,e){n.seq.push(e),n.map[e.id]=e}function q2(n,e,t){const i=n.name,s=i.length;for(Kd.lastIndex=0;;){const r=Kd.exec(i),o=Kd.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){c0(t,c===void 0?new W2(a,n,e):new X2(a,n,e));break}else{let h=t.map[a];h===void 0&&(h=new Y2(a),c0(t,h)),t=h}}}class Yc{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const a=e.getActiveUniform(t,o),l=e.getUniformLocation(t,a.name);q2(a,l,this)}const s=[],r=[];for(const o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&i.push(o)}return i}}function u0(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const K2=37297;let $2=0;function Z2(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}const d0=new Ct;function j2(n){kt._getMatrix(d0,kt.workingColorSpace,n);const e=`mat3( ${d0.elements.map(t=>t.toFixed(4))} )`;switch(kt.getTransfer(n)){case ou:return[e,"LinearTransferOETF"];case jt:return[e,"sRGBTransferOETF"];default:return bt("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function h0(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+Z2(n.getShaderSource(e),a)}else return r}function J2(n,e){const t=j2(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const Q2={[qg]:"Linear",[Kg]:"Reinhard",[$g]:"Cineon",[Zg]:"ACESFilmic",[Jg]:"AgX",[Qg]:"Neutral",[jg]:"Custom"};function eT(n,e){const t=Q2[e];return t===void 0?(bt("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Rc=new L;function tT(){kt.getLuminanceCoefficients(Rc);const n=Rc.x.toFixed(4),e=Rc.y.toFixed(4),t=Rc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function nT(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(rl).join(`
`)}function iT(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function sT(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function rl(n){return n!==""}function f0(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function p0(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const rT=/^[ \t]*#include +<([\w\d./]+)>/gm;function lf(n){return n.replace(rT,aT)}const oT=new Map;function aT(n,e){let t=It[e];if(t===void 0){const i=oT.get(e);if(i!==void 0)t=It[i],bt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return lf(t)}const lT=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function m0(n){return n.replace(lT,cT)}function cT(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function g0(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}const uT={[Bc]:"SHADOWMAP_TYPE_PCF",[sl]:"SHADOWMAP_TYPE_VSM"};function dT(n){return uT[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const hT={[kr]:"ENVMAP_TYPE_CUBE",[jo]:"ENVMAP_TYPE_CUBE",[Ru]:"ENVMAP_TYPE_CUBE_UV"};function fT(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":hT[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const pT={[jo]:"ENVMAP_MODE_REFRACTION"};function mT(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":pT[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const gT={[Yg]:"ENVMAP_BLENDING_MULTIPLY",[jM]:"ENVMAP_BLENDING_MIX",[JM]:"ENVMAP_BLENDING_ADD"};function _T(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":gT[n.combine]||"ENVMAP_BLENDING_NONE"}function xT(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function vT(n,e,t,i){const s=n.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=dT(t),c=fT(t),u=mT(t),h=_T(t),d=xT(t),f=nT(t),x=iT(r),S=s.createProgram();let m,p,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(rl).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(rl).join(`
`),p.length>0&&(p+=`
`)):(m=[g0(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(rl).join(`
`),p=[g0(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==es?"#define TONE_MAPPING":"",t.toneMapping!==es?It.tonemapping_pars_fragment:"",t.toneMapping!==es?eT("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",It.colorspace_pars_fragment,J2("linearToOutputTexel",t.outputColorSpace),tT(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(rl).join(`
`)),o=lf(o),o=f0(o,t),o=p0(o,t),a=lf(a),a=f0(a,t),a=p0(a,t),o=m0(o),a=m0(a),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===pm?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===pm?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const R=y+m+o,M=y+p+a,P=u0(s,s.VERTEX_SHADER,R),T=u0(s,s.FRAGMENT_SHADER,M);s.attachShader(S,P),s.attachShader(S,T),t.index0AttributeName!==void 0?s.bindAttribLocation(S,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(S,0,"position"),s.linkProgram(S);function I(k){if(n.debug.checkShaderErrors){const U=s.getProgramInfoLog(S)||"",ee=s.getShaderInfoLog(P)||"",le=s.getShaderInfoLog(T)||"",$=U.trim(),se=ee.trim(),Z=le.trim();let ae=!0,Te=!0;if(s.getProgramParameter(S,s.LINK_STATUS)===!1)if(ae=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,S,P,T);else{const He=h0(s,P,"vertex"),Oe=h0(s,T,"fragment");Ot("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(S,s.VALIDATE_STATUS)+`

Material Name: `+k.name+`
Material Type: `+k.type+`

Program Info Log: `+$+`
`+He+`
`+Oe)}else $!==""?bt("WebGLProgram: Program Info Log:",$):(se===""||Z==="")&&(Te=!1);Te&&(k.diagnostics={runnable:ae,programLog:$,vertexShader:{log:se,prefix:m},fragmentShader:{log:Z,prefix:p}})}s.deleteShader(P),s.deleteShader(T),v=new Yc(s,S),A=sT(s,S)}let v;this.getUniforms=function(){return v===void 0&&I(this),v};let A;this.getAttributes=function(){return A===void 0&&I(this),A};let F=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return F===!1&&(F=s.getProgramParameter(S,K2)),F},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(S),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=$2++,this.cacheKey=e,this.usedTimes=1,this.program=S,this.vertexShader=P,this.fragmentShader=T,this}let bT=0;class yT{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new MT(e),t.set(e,i)),i}}class MT{constructor(e){this.id=bT++,this.code=e,this.usedTimes=0}}function ST(n){return n===Br||n===iu||n===su}function wT(n,e,t,i,s,r){const o=new zf,a=new yT,l=new Set,c=[],u=new Map,h=i.logarithmicDepthBuffer;let d=i.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(v){return l.add(v),v===0?"uv":`uv${v}`}function S(v,A,F,k,U,ee){const le=k.fog,$=U.geometry,se=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?k.environment:null,Z=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,ae=e.get(v.envMap||se,Z),Te=ae&&ae.mapping===Ru?ae.image.height:null,He=f[v.type];v.precision!==null&&(d=i.getMaxPrecision(v.precision),d!==v.precision&&bt("WebGLProgram.getParameters:",v.precision,"not supported, using",d,"instead."));const Oe=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,J=Oe!==void 0?Oe.length:0;let be=0;$.morphAttributes.position!==void 0&&(be=1),$.morphAttributes.normal!==void 0&&(be=2),$.morphAttributes.color!==void 0&&(be=3);let gt,pt,pe,Fe;if(He){const it=$i[He];gt=it.vertexShader,pt=it.fragmentShader}else{gt=v.vertexShader,pt=v.fragmentShader;const it=a.getVertexShaderStage(v),qt=a.getFragmentShaderStage(v);a.update(v,it,qt),pe=it.id,Fe=qt.id}const Ie=n.getRenderTarget(),ht=n.state.buffers.depth.getReversed(),_t=U.isInstancedMesh===!0,ot=U.isBatchedMesh===!0,O=!!v.map,B=!!v.matcap,ie=!!ae,he=!!v.aoMap,ce=!!v.lightMap,_e=!!v.bumpMap&&v.wireframe===!1,Pe=!!v.normalMap,Re=!!v.displacementMap,Ee=!!v.emissiveMap,xe=!!v.metalnessMap,Ke=!!v.roughnessMap,N=v.anisotropy>0,$e=v.clearcoat>0,Xe=v.dispersion>0,C=v.iridescence>0,_=v.sheen>0,W=v.transmission>0,j=N&&!!v.anisotropyMap,re=$e&&!!v.clearcoatMap,Ce=$e&&!!v.clearcoatNormalMap,Ne=$e&&!!v.clearcoatRoughnessMap,ue=C&&!!v.iridescenceMap,fe=C&&!!v.iridescenceThicknessMap,Le=_&&!!v.sheenColorMap,Je=_&&!!v.sheenRoughnessMap,Ge=!!v.specularMap,ke=!!v.specularColorMap,lt=!!v.specularIntensityMap,ft=W&&!!v.transmissionMap,St=W&&!!v.thicknessMap,Y=!!v.gradientMap,Be=!!v.alphaMap,ve=v.alphaTest>0,ze=!!v.alphaHash,qe=!!v.extensions;let Se=es;v.toneMapped&&(Ie===null||Ie.isXRRenderTarget===!0)&&(Se=n.toneMapping);const rt={shaderID:He,shaderType:v.type,shaderName:v.name,vertexShader:gt,fragmentShader:pt,defines:v.defines,customVertexShaderID:pe,customFragmentShaderID:Fe,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:d,batching:ot,batchingColor:ot&&U._colorsTexture!==null,instancing:_t,instancingColor:_t&&U.instanceColor!==null,instancingMorph:_t&&U.morphTexture!==null,outputColorSpace:Ie===null?n.outputColorSpace:Ie.isXRRenderTarget===!0?Ie.texture.colorSpace:kt.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:O,matcap:B,envMap:ie,envMapMode:ie&&ae.mapping,envMapCubeUVHeight:Te,aoMap:he,lightMap:ce,bumpMap:_e,normalMap:Pe,displacementMap:Re,emissiveMap:Ee,normalMapObjectSpace:Pe&&v.normalMapType===t1,normalMapTangentSpace:Pe&&v.normalMapType===tf,packedNormalMap:Pe&&v.normalMapType===tf&&ST(v.normalMap.format),metalnessMap:xe,roughnessMap:Ke,anisotropy:N,anisotropyMap:j,clearcoat:$e,clearcoatMap:re,clearcoatNormalMap:Ce,clearcoatRoughnessMap:Ne,dispersion:Xe,iridescence:C,iridescenceMap:ue,iridescenceThicknessMap:fe,sheen:_,sheenColorMap:Le,sheenRoughnessMap:Je,specularMap:Ge,specularColorMap:ke,specularIntensityMap:lt,transmission:W,transmissionMap:ft,thicknessMap:St,gradientMap:Y,opaque:v.transparent===!1&&v.blending===Wo&&v.alphaToCoverage===!1,alphaMap:Be,alphaTest:ve,alphaHash:ze,combine:v.combine,mapUv:O&&x(v.map.channel),aoMapUv:he&&x(v.aoMap.channel),lightMapUv:ce&&x(v.lightMap.channel),bumpMapUv:_e&&x(v.bumpMap.channel),normalMapUv:Pe&&x(v.normalMap.channel),displacementMapUv:Re&&x(v.displacementMap.channel),emissiveMapUv:Ee&&x(v.emissiveMap.channel),metalnessMapUv:xe&&x(v.metalnessMap.channel),roughnessMapUv:Ke&&x(v.roughnessMap.channel),anisotropyMapUv:j&&x(v.anisotropyMap.channel),clearcoatMapUv:re&&x(v.clearcoatMap.channel),clearcoatNormalMapUv:Ce&&x(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ne&&x(v.clearcoatRoughnessMap.channel),iridescenceMapUv:ue&&x(v.iridescenceMap.channel),iridescenceThicknessMapUv:fe&&x(v.iridescenceThicknessMap.channel),sheenColorMapUv:Le&&x(v.sheenColorMap.channel),sheenRoughnessMapUv:Je&&x(v.sheenRoughnessMap.channel),specularMapUv:Ge&&x(v.specularMap.channel),specularColorMapUv:ke&&x(v.specularColorMap.channel),specularIntensityMapUv:lt&&x(v.specularIntensityMap.channel),transmissionMapUv:ft&&x(v.transmissionMap.channel),thicknessMapUv:St&&x(v.thicknessMap.channel),alphaMapUv:Be&&x(v.alphaMap.channel),vertexTangents:!!$.attributes.tangent&&(Pe||N),vertexNormals:!!$.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!$.attributes.uv&&(O||Be),fog:!!le,useFog:v.fog===!0,fogExp2:!!le&&le.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||$.attributes.normal===void 0&&Pe===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:ht,skinning:U.isSkinnedMesh===!0,hasPositionAttribute:$.attributes.position!==void 0,morphTargets:$.morphAttributes.position!==void 0,morphNormals:$.morphAttributes.normal!==void 0,morphColors:$.morphAttributes.color!==void 0,morphTargetsCount:J,morphTextureStride:be,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:ee.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:n.shadowMap.enabled&&F.length>0,shadowMapType:n.shadowMap.type,toneMapping:Se,decodeVideoTexture:O&&v.map.isVideoTexture===!0&&kt.getTransfer(v.map.colorSpace)===jt,decodeVideoTextureEmissive:Ee&&v.emissiveMap.isVideoTexture===!0&&kt.getTransfer(v.emissiveMap.colorSpace)===jt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Nt,flipSided:v.side===vn,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:qe&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(qe&&v.extensions.multiDraw===!0||ot)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return rt.vertexUv1s=l.has(1),rt.vertexUv2s=l.has(2),rt.vertexUv3s=l.has(3),l.clear(),rt}function m(v){const A=[];if(v.shaderID?A.push(v.shaderID):(A.push(v.customVertexShaderID),A.push(v.customFragmentShaderID)),v.defines!==void 0)for(const F in v.defines)A.push(F),A.push(v.defines[F]);return v.isRawShaderMaterial===!1&&(p(A,v),y(A,v),A.push(n.outputColorSpace)),A.push(v.customProgramCacheKey),A.join()}function p(v,A){v.push(A.precision),v.push(A.outputColorSpace),v.push(A.envMapMode),v.push(A.envMapCubeUVHeight),v.push(A.mapUv),v.push(A.alphaMapUv),v.push(A.lightMapUv),v.push(A.aoMapUv),v.push(A.bumpMapUv),v.push(A.normalMapUv),v.push(A.displacementMapUv),v.push(A.emissiveMapUv),v.push(A.metalnessMapUv),v.push(A.roughnessMapUv),v.push(A.anisotropyMapUv),v.push(A.clearcoatMapUv),v.push(A.clearcoatNormalMapUv),v.push(A.clearcoatRoughnessMapUv),v.push(A.iridescenceMapUv),v.push(A.iridescenceThicknessMapUv),v.push(A.sheenColorMapUv),v.push(A.sheenRoughnessMapUv),v.push(A.specularMapUv),v.push(A.specularColorMapUv),v.push(A.specularIntensityMapUv),v.push(A.transmissionMapUv),v.push(A.thicknessMapUv),v.push(A.combine),v.push(A.fogExp2),v.push(A.sizeAttenuation),v.push(A.morphTargetsCount),v.push(A.morphAttributeCount),v.push(A.numDirLights),v.push(A.numPointLights),v.push(A.numSpotLights),v.push(A.numSpotLightMaps),v.push(A.numHemiLights),v.push(A.numRectAreaLights),v.push(A.numDirLightShadows),v.push(A.numPointLightShadows),v.push(A.numSpotLightShadows),v.push(A.numSpotLightShadowsWithMaps),v.push(A.numLightProbes),v.push(A.shadowMapType),v.push(A.toneMapping),v.push(A.numClippingPlanes),v.push(A.numClipIntersection),v.push(A.depthPacking)}function y(v,A){o.disableAll(),A.instancing&&o.enable(0),A.instancingColor&&o.enable(1),A.instancingMorph&&o.enable(2),A.matcap&&o.enable(3),A.envMap&&o.enable(4),A.normalMapObjectSpace&&o.enable(5),A.normalMapTangentSpace&&o.enable(6),A.clearcoat&&o.enable(7),A.iridescence&&o.enable(8),A.alphaTest&&o.enable(9),A.vertexColors&&o.enable(10),A.vertexAlphas&&o.enable(11),A.vertexUv1s&&o.enable(12),A.vertexUv2s&&o.enable(13),A.vertexUv3s&&o.enable(14),A.vertexTangents&&o.enable(15),A.anisotropy&&o.enable(16),A.alphaHash&&o.enable(17),A.batching&&o.enable(18),A.dispersion&&o.enable(19),A.batchingColor&&o.enable(20),A.gradientMap&&o.enable(21),A.packedNormalMap&&o.enable(22),A.vertexNormals&&o.enable(23),v.push(o.mask),o.disableAll(),A.fog&&o.enable(0),A.useFog&&o.enable(1),A.flatShading&&o.enable(2),A.logarithmicDepthBuffer&&o.enable(3),A.reversedDepthBuffer&&o.enable(4),A.skinning&&o.enable(5),A.morphTargets&&o.enable(6),A.morphNormals&&o.enable(7),A.morphColors&&o.enable(8),A.premultipliedAlpha&&o.enable(9),A.shadowMapEnabled&&o.enable(10),A.doubleSided&&o.enable(11),A.flipSided&&o.enable(12),A.useDepthPacking&&o.enable(13),A.dithering&&o.enable(14),A.transmission&&o.enable(15),A.sheen&&o.enable(16),A.opaque&&o.enable(17),A.pointsUvs&&o.enable(18),A.decodeVideoTexture&&o.enable(19),A.decodeVideoTextureEmissive&&o.enable(20),A.alphaToCoverage&&o.enable(21),A.numLightProbeGrids>0&&o.enable(22),A.hasPositionAttribute&&o.enable(23),v.push(o.mask)}function R(v){const A=f[v.type];let F;if(A){const k=$i[A];F=z1.clone(k.uniforms)}else F=v.uniforms;return F}function M(v,A){let F=u.get(A);return F!==void 0?++F.usedTimes:(F=new vT(n,A,v,s),c.push(F),u.set(A,F)),F}function P(v){if(--v.usedTimes===0){const A=c.indexOf(v);c[A]=c[c.length-1],c.pop(),u.delete(v.cacheKey),v.destroy()}}function T(v){a.remove(v)}function I(){a.dispose()}return{getParameters:S,getProgramCacheKey:m,getUniforms:R,acquireProgram:M,releaseProgram:P,releaseShaderCache:T,programs:c,dispose:I}}function ET(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,l){n.get(o)[a]=l}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function TT(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function _0(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function x0(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function o(d){let f=0;return d.isInstancedMesh&&(f+=2),d.isSkinnedMesh&&(f+=1),f}function a(d,f,x,S,m,p){let y=n[e];return y===void 0?(y={id:d.id,object:d,geometry:f,material:x,materialVariant:o(d),groupOrder:S,renderOrder:d.renderOrder,z:m,group:p},n[e]=y):(y.id=d.id,y.object=d,y.geometry=f,y.material=x,y.materialVariant=o(d),y.groupOrder=S,y.renderOrder=d.renderOrder,y.z=m,y.group=p),e++,y}function l(d,f,x,S,m,p){const y=a(d,f,x,S,m,p);x.transmission>0?i.push(y):x.transparent===!0?s.push(y):t.push(y)}function c(d,f,x,S,m,p){const y=a(d,f,x,S,m,p);x.transmission>0?i.unshift(y):x.transparent===!0?s.unshift(y):t.unshift(y)}function u(d,f,x){t.length>1&&t.sort(d||TT),i.length>1&&i.sort(f||_0),s.length>1&&s.sort(f||_0),x&&(t.reverse(),i.reverse(),s.reverse())}function h(){for(let d=e,f=n.length;d<f;d++){const x=n[d];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:l,unshift:c,finish:h,sort:u}}function AT(){let n=new WeakMap;function e(i,s){const r=n.get(i);let o;return r===void 0?(o=new x0,n.set(i,[o])):s>=r.length?(o=new x0,r.push(o)):o=r[s],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function CT(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new Ze};break;case"SpotLight":t={position:new L,direction:new L,color:new Ze,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new Ze,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new Ze,groundColor:new Ze};break;case"RectAreaLight":t={color:new Ze,position:new L,halfWidth:new L,halfHeight:new L};break}return n[e.id]=t,t}}}function RT(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new dt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new dt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new dt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let PT=0;function DT(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function IT(n){const e=new CT,t=RT(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new L);const s=new L,r=new Qt,o=new Qt;function a(c){let u=0,h=0,d=0;for(let A=0;A<9;A++)i.probe[A].set(0,0,0);let f=0,x=0,S=0,m=0,p=0,y=0,R=0,M=0,P=0,T=0,I=0;c.sort(DT);for(let A=0,F=c.length;A<F;A++){const k=c[A],U=k.color,ee=k.intensity,le=k.distance;let $=null;if(k.shadow&&k.shadow.map&&(k.shadow.map.texture.format===Br?$=k.shadow.map.texture:$=k.shadow.map.depthTexture||k.shadow.map.texture),k.isAmbientLight)u+=U.r*ee,h+=U.g*ee,d+=U.b*ee;else if(k.isLightProbe){for(let se=0;se<9;se++)i.probe[se].addScaledVector(k.sh.coefficients[se],ee);I++}else if(k.isDirectionalLight){const se=e.get(k);if(se.color.copy(k.color).multiplyScalar(k.intensity),k.castShadow){const Z=k.shadow,ae=t.get(k);ae.shadowIntensity=Z.intensity,ae.shadowBias=Z.bias,ae.shadowNormalBias=Z.normalBias,ae.shadowRadius=Z.radius,ae.shadowMapSize=Z.mapSize,i.directionalShadow[f]=ae,i.directionalShadowMap[f]=$,i.directionalShadowMatrix[f]=k.shadow.matrix,y++}i.directional[f]=se,f++}else if(k.isSpotLight){const se=e.get(k);se.position.setFromMatrixPosition(k.matrixWorld),se.color.copy(U).multiplyScalar(ee),se.distance=le,se.coneCos=Math.cos(k.angle),se.penumbraCos=Math.cos(k.angle*(1-k.penumbra)),se.decay=k.decay,i.spot[S]=se;const Z=k.shadow;if(k.map&&(i.spotLightMap[P]=k.map,P++,Z.updateMatrices(k),k.castShadow&&T++),i.spotLightMatrix[S]=Z.matrix,k.castShadow){const ae=t.get(k);ae.shadowIntensity=Z.intensity,ae.shadowBias=Z.bias,ae.shadowNormalBias=Z.normalBias,ae.shadowRadius=Z.radius,ae.shadowMapSize=Z.mapSize,i.spotShadow[S]=ae,i.spotShadowMap[S]=$,M++}S++}else if(k.isRectAreaLight){const se=e.get(k);se.color.copy(U).multiplyScalar(ee),se.halfWidth.set(k.width*.5,0,0),se.halfHeight.set(0,k.height*.5,0),i.rectArea[m]=se,m++}else if(k.isPointLight){const se=e.get(k);if(se.color.copy(k.color).multiplyScalar(k.intensity),se.distance=k.distance,se.decay=k.decay,k.castShadow){const Z=k.shadow,ae=t.get(k);ae.shadowIntensity=Z.intensity,ae.shadowBias=Z.bias,ae.shadowNormalBias=Z.normalBias,ae.shadowRadius=Z.radius,ae.shadowMapSize=Z.mapSize,ae.shadowCameraNear=Z.camera.near,ae.shadowCameraFar=Z.camera.far,i.pointShadow[x]=ae,i.pointShadowMap[x]=$,i.pointShadowMatrix[x]=k.shadow.matrix,R++}i.point[x]=se,x++}else if(k.isHemisphereLight){const se=e.get(k);se.skyColor.copy(k.color).multiplyScalar(ee),se.groundColor.copy(k.groundColor).multiplyScalar(ee),i.hemi[p]=se,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=je.LTC_FLOAT_1,i.rectAreaLTC2=je.LTC_FLOAT_2):(i.rectAreaLTC1=je.LTC_HALF_1,i.rectAreaLTC2=je.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=h,i.ambient[2]=d;const v=i.hash;(v.directionalLength!==f||v.pointLength!==x||v.spotLength!==S||v.rectAreaLength!==m||v.hemiLength!==p||v.numDirectionalShadows!==y||v.numPointShadows!==R||v.numSpotShadows!==M||v.numSpotMaps!==P||v.numLightProbes!==I)&&(i.directional.length=f,i.spot.length=S,i.rectArea.length=m,i.point.length=x,i.hemi.length=p,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=R,i.pointShadowMap.length=R,i.spotShadow.length=M,i.spotShadowMap.length=M,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=R,i.spotLightMatrix.length=M+P-T,i.spotLightMap.length=P,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=I,v.directionalLength=f,v.pointLength=x,v.spotLength=S,v.rectAreaLength=m,v.hemiLength=p,v.numDirectionalShadows=y,v.numPointShadows=R,v.numSpotShadows=M,v.numSpotMaps=P,v.numLightProbes=I,i.version=PT++)}function l(c,u){let h=0,d=0,f=0,x=0,S=0;const m=u.matrixWorldInverse;for(let p=0,y=c.length;p<y;p++){const R=c[p];if(R.isDirectionalLight){const M=i.directional[h];M.direction.setFromMatrixPosition(R.matrixWorld),s.setFromMatrixPosition(R.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),h++}else if(R.isSpotLight){const M=i.spot[f];M.position.setFromMatrixPosition(R.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(R.matrixWorld),s.setFromMatrixPosition(R.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),f++}else if(R.isRectAreaLight){const M=i.rectArea[x];M.position.setFromMatrixPosition(R.matrixWorld),M.position.applyMatrix4(m),o.identity(),r.copy(R.matrixWorld),r.premultiply(m),o.extractRotation(r),M.halfWidth.set(R.width*.5,0,0),M.halfHeight.set(0,R.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),x++}else if(R.isPointLight){const M=i.point[d];M.position.setFromMatrixPosition(R.matrixWorld),M.position.applyMatrix4(m),d++}else if(R.isHemisphereLight){const M=i.hemi[S];M.direction.setFromMatrixPosition(R.matrixWorld),M.direction.transformDirection(m),S++}}}return{setup:a,setupView:l,state:i}}function v0(n){const e=new IT(n),t=[],i=[],s=[];function r(d){h.camera=d,t.length=0,i.length=0,s.length=0}function o(d){t.push(d)}function a(d){i.push(d)}function l(d){s.push(d)}function c(){e.setup(t)}function u(d){e.setupView(t,d)}const h={lightsArray:t,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:c,setupLightsView:u,pushLight:o,pushShadow:a,pushLightProbeGrid:l}}function LT(n){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new v0(n),e.set(s,[a])):r>=o.length?(a=new v0(n),o.push(a)):a=o[r],a}function i(){e=new WeakMap}return{get:t,dispose:i}}const NT=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,UT=`uniform sampler2D shadow_pass;
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
}`,FT=[new L(1,0,0),new L(-1,0,0),new L(0,1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1)],OT=[new L(0,-1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1),new L(0,-1,0),new L(0,-1,0)],b0=new Qt,tl=new L,$d=new L;function kT(n,e,t){let i=new Hf;const s=new dt,r=new dt,o=new gn,a=new X1,l=new Y1,c={},u=t.maxTextureSize,h={[Qs]:vn,[vn]:Qs,[Nt]:Nt},d=new is({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new dt},radius:{value:4}},vertexShader:NT,fragmentShader:UT}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const x=new Jt;x.setAttribute("position",new mn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const S=new D(x,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Bc;let p=this.type;this.render=function(T,I,v){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;this.type===IM&&(bt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Bc);const A=n.getRenderTarget(),F=n.getActiveCubeFace(),k=n.getActiveMipmapLevel(),U=n.state;U.setBlending(vs),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const ee=p!==this.type;ee&&I.traverse(function(le){le.material&&(Array.isArray(le.material)?le.material.forEach($=>$.needsUpdate=!0):le.material.needsUpdate=!0)});for(let le=0,$=T.length;le<$;le++){const se=T[le],Z=se.shadow;if(Z===void 0){bt("WebGLShadowMap:",se,"has no shadow.");continue}if(Z.autoUpdate===!1&&Z.needsUpdate===!1)continue;s.copy(Z.mapSize);const ae=Z.getFrameExtents();s.multiply(ae),r.copy(Z.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/ae.x),s.x=r.x*ae.x,Z.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/ae.y),s.y=r.y*ae.y,Z.mapSize.y=r.y));const Te=n.state.buffers.depth.getReversed();if(Z.camera._reversedDepth=Te,Z.map===null||ee===!0){if(Z.map!==null&&(Z.map.depthTexture!==null&&(Z.map.depthTexture.dispose(),Z.map.depthTexture=null),Z.map.dispose()),this.type===sl){if(se.isPointLight){bt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}Z.map=new ts(s.x,s.y,{format:Br,type:Ss,minFilter:Cn,magFilter:Cn,generateMipmaps:!1}),Z.map.texture.name=se.name+".shadowMap",Z.map.depthTexture=new Jo(s.x,s.y,Ui),Z.map.depthTexture.name=se.name+".shadowMapDepth",Z.map.depthTexture.format=ws,Z.map.depthTexture.compareFunction=null,Z.map.depthTexture.minFilter=Xn,Z.map.depthTexture.magFilter=Xn}else se.isPointLight?(Z.map=new y_(s.x),Z.map.depthTexture=new B1(s.x,ns)):(Z.map=new ts(s.x,s.y),Z.map.depthTexture=new Jo(s.x,s.y,ns)),Z.map.depthTexture.name=se.name+".shadowMap",Z.map.depthTexture.format=ws,this.type===Bc?(Z.map.depthTexture.compareFunction=Te?Bf:kf,Z.map.depthTexture.minFilter=Cn,Z.map.depthTexture.magFilter=Cn):(Z.map.depthTexture.compareFunction=null,Z.map.depthTexture.minFilter=Xn,Z.map.depthTexture.magFilter=Xn);Z.camera.updateProjectionMatrix()}const He=Z.map.isWebGLCubeRenderTarget?6:1;for(let Oe=0;Oe<He;Oe++){if(Z.map.isWebGLCubeRenderTarget)n.setRenderTarget(Z.map,Oe),n.clear();else{Oe===0&&(n.setRenderTarget(Z.map),n.clear());const J=Z.getViewport(Oe);o.set(r.x*J.x,r.y*J.y,r.x*J.z,r.y*J.w),U.viewport(o)}if(se.isPointLight){const J=Z.camera,be=Z.matrix,gt=se.distance||J.far;gt!==J.far&&(J.far=gt,J.updateProjectionMatrix()),tl.setFromMatrixPosition(se.matrixWorld),J.position.copy(tl),$d.copy(J.position),$d.add(FT[Oe]),J.up.copy(OT[Oe]),J.lookAt($d),J.updateMatrixWorld(),be.makeTranslation(-tl.x,-tl.y,-tl.z),b0.multiplyMatrices(J.projectionMatrix,J.matrixWorldInverse),Z._frustum.setFromProjectionMatrix(b0,J.coordinateSystem,J.reversedDepth)}else Z.updateMatrices(se);i=Z.getFrustum(),M(I,v,Z.camera,se,this.type)}Z.isPointLightShadow!==!0&&this.type===sl&&y(Z,v),Z.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(A,F,k)};function y(T,I){const v=e.update(S);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new ts(s.x,s.y,{format:Br,type:Ss})),d.uniforms.shadow_pass.value=T.map.depthTexture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,n.setRenderTarget(T.mapPass),n.clear(),n.renderBufferDirect(I,null,v,d,S,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,n.setRenderTarget(T.map),n.clear(),n.renderBufferDirect(I,null,v,f,S,null)}function R(T,I,v,A){let F=null;const k=v.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(k!==void 0)F=k;else if(F=v.isPointLight===!0?l:a,n.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){const U=F.uuid,ee=I.uuid;let le=c[U];le===void 0&&(le={},c[U]=le);let $=le[ee];$===void 0&&($=F.clone(),le[ee]=$,I.addEventListener("dispose",P)),F=$}if(F.visible=I.visible,F.wireframe=I.wireframe,A===sl?F.side=I.shadowSide!==null?I.shadowSide:I.side:F.side=I.shadowSide!==null?I.shadowSide:h[I.side],F.alphaMap=I.alphaMap,F.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,F.map=I.map,F.clipShadows=I.clipShadows,F.clippingPlanes=I.clippingPlanes,F.clipIntersection=I.clipIntersection,F.displacementMap=I.displacementMap,F.displacementScale=I.displacementScale,F.displacementBias=I.displacementBias,F.wireframeLinewidth=I.wireframeLinewidth,F.linewidth=I.linewidth,v.isPointLight===!0&&F.isMeshDistanceMaterial===!0){const U=n.properties.get(F);U.light=v}return F}function M(T,I,v,A,F){if(T.visible===!1)return;if(T.layers.test(I.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&F===sl)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,T.matrixWorld);const ee=e.update(T),le=T.material;if(Array.isArray(le)){const $=ee.groups;for(let se=0,Z=$.length;se<Z;se++){const ae=$[se],Te=le[ae.materialIndex];if(Te&&Te.visible){const He=R(T,Te,A,F);T.onBeforeShadow(n,T,I,v,ee,He,ae),n.renderBufferDirect(v,null,ee,He,T,ae),T.onAfterShadow(n,T,I,v,ee,He,ae)}}}else if(le.visible){const $=R(T,le,A,F);T.onBeforeShadow(n,T,I,v,ee,$,null),n.renderBufferDirect(v,null,ee,$,T,null),T.onAfterShadow(n,T,I,v,ee,$,null)}}const U=T.children;for(let ee=0,le=U.length;ee<le;ee++)M(U[ee],I,v,A,F)}function P(T){T.target.removeEventListener("dispose",P);for(const v in c){const A=c[v],F=T.target.uuid;F in A&&(A[F].dispose(),delete A[F])}}}function BT(n,e){function t(){let Y=!1;const Be=new gn;let ve=null;const ze=new gn(0,0,0,0);return{setMask:function(qe){ve!==qe&&!Y&&(n.colorMask(qe,qe,qe,qe),ve=qe)},setLocked:function(qe){Y=qe},setClear:function(qe,Se,rt,it,qt){qt===!0&&(qe*=it,Se*=it,rt*=it),Be.set(qe,Se,rt,it),ze.equals(Be)===!1&&(n.clearColor(qe,Se,rt,it),ze.copy(Be))},reset:function(){Y=!1,ve=null,ze.set(-1,0,0,0)}}}function i(){let Y=!1,Be=!1,ve=null,ze=null,qe=null;return{setReversed:function(Se){if(Be!==Se){const rt=e.get("EXT_clip_control");Se?rt.clipControlEXT(rt.LOWER_LEFT_EXT,rt.ZERO_TO_ONE_EXT):rt.clipControlEXT(rt.LOWER_LEFT_EXT,rt.NEGATIVE_ONE_TO_ONE_EXT),Be=Se;const it=qe;qe=null,this.setClear(it)}},getReversed:function(){return Be},setTest:function(Se){Se?Ie(n.DEPTH_TEST):ht(n.DEPTH_TEST)},setMask:function(Se){ve!==Se&&!Y&&(n.depthMask(Se),ve=Se)},setFunc:function(Se){if(Be&&(Se=d1[Se]),ze!==Se){switch(Se){case _h:n.depthFunc(n.NEVER);break;case xh:n.depthFunc(n.ALWAYS);break;case vh:n.depthFunc(n.LESS);break;case Zo:n.depthFunc(n.LEQUAL);break;case bh:n.depthFunc(n.EQUAL);break;case yh:n.depthFunc(n.GEQUAL);break;case Mh:n.depthFunc(n.GREATER);break;case Sh:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ze=Se}},setLocked:function(Se){Y=Se},setClear:function(Se){qe!==Se&&(qe=Se,Be&&(Se=1-Se),n.clearDepth(Se))},reset:function(){Y=!1,ve=null,ze=null,qe=null,Be=!1}}}function s(){let Y=!1,Be=null,ve=null,ze=null,qe=null,Se=null,rt=null,it=null,qt=null;return{setTest:function(Ht){Y||(Ht?Ie(n.STENCIL_TEST):ht(n.STENCIL_TEST))},setMask:function(Ht){Be!==Ht&&!Y&&(n.stencilMask(Ht),Be=Ht)},setFunc:function(Ht,Qn,Ln){(ve!==Ht||ze!==Qn||qe!==Ln)&&(n.stencilFunc(Ht,Qn,Ln),ve=Ht,ze=Qn,qe=Ln)},setOp:function(Ht,Qn,Ln){(Se!==Ht||rt!==Qn||it!==Ln)&&(n.stencilOp(Ht,Qn,Ln),Se=Ht,rt=Qn,it=Ln)},setLocked:function(Ht){Y=Ht},setClear:function(Ht){qt!==Ht&&(n.clearStencil(Ht),qt=Ht)},reset:function(){Y=!1,Be=null,ve=null,ze=null,qe=null,Se=null,rt=null,it=null,qt=null}}}const r=new t,o=new i,a=new s,l=new WeakMap,c=new WeakMap;let u={},h={},d={},f=new WeakMap,x=[],S=null,m=!1,p=null,y=null,R=null,M=null,P=null,T=null,I=null,v=new Ze(0,0,0),A=0,F=!1,k=null,U=null,ee=null,le=null,$=null;const se=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Z=!1,ae=0;const Te=n.getParameter(n.VERSION);Te.indexOf("WebGL")!==-1?(ae=parseFloat(/^WebGL (\d)/.exec(Te)[1]),Z=ae>=1):Te.indexOf("OpenGL ES")!==-1&&(ae=parseFloat(/^OpenGL ES (\d)/.exec(Te)[1]),Z=ae>=2);let He=null,Oe={};const J=n.getParameter(n.SCISSOR_BOX),be=n.getParameter(n.VIEWPORT),gt=new gn().fromArray(J),pt=new gn().fromArray(be);function pe(Y,Be,ve,ze){const qe=new Uint8Array(4),Se=n.createTexture();n.bindTexture(Y,Se),n.texParameteri(Y,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(Y,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let rt=0;rt<ve;rt++)Y===n.TEXTURE_3D||Y===n.TEXTURE_2D_ARRAY?n.texImage3D(Be,0,n.RGBA,1,1,ze,0,n.RGBA,n.UNSIGNED_BYTE,qe):n.texImage2D(Be+rt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,qe);return Se}const Fe={};Fe[n.TEXTURE_2D]=pe(n.TEXTURE_2D,n.TEXTURE_2D,1),Fe[n.TEXTURE_CUBE_MAP]=pe(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Fe[n.TEXTURE_2D_ARRAY]=pe(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Fe[n.TEXTURE_3D]=pe(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),Ie(n.DEPTH_TEST),o.setFunc(Zo),_e(!1),Pe(um),Ie(n.CULL_FACE),he(vs);function Ie(Y){u[Y]!==!0&&(n.enable(Y),u[Y]=!0)}function ht(Y){u[Y]!==!1&&(n.disable(Y),u[Y]=!1)}function _t(Y,Be){return d[Y]!==Be?(n.bindFramebuffer(Y,Be),d[Y]=Be,Y===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=Be),Y===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=Be),!0):!1}function ot(Y,Be){let ve=x,ze=!1;if(Y){ve=f.get(Be),ve===void 0&&(ve=[],f.set(Be,ve));const qe=Y.textures;if(ve.length!==qe.length||ve[0]!==n.COLOR_ATTACHMENT0){for(let Se=0,rt=qe.length;Se<rt;Se++)ve[Se]=n.COLOR_ATTACHMENT0+Se;ve.length=qe.length,ze=!0}}else ve[0]!==n.BACK&&(ve[0]=n.BACK,ze=!0);ze&&n.drawBuffers(ve)}function O(Y){return S!==Y?(n.useProgram(Y),S=Y,!0):!1}const B={[Pr]:n.FUNC_ADD,[NM]:n.FUNC_SUBTRACT,[UM]:n.FUNC_REVERSE_SUBTRACT};B[FM]=n.MIN,B[OM]=n.MAX;const ie={[kM]:n.ZERO,[BM]:n.ONE,[GM]:n.SRC_COLOR,[mh]:n.SRC_ALPHA,[YM]:n.SRC_ALPHA_SATURATE,[WM]:n.DST_COLOR,[HM]:n.DST_ALPHA,[zM]:n.ONE_MINUS_SRC_COLOR,[gh]:n.ONE_MINUS_SRC_ALPHA,[XM]:n.ONE_MINUS_DST_COLOR,[VM]:n.ONE_MINUS_DST_ALPHA,[qM]:n.CONSTANT_COLOR,[KM]:n.ONE_MINUS_CONSTANT_COLOR,[$M]:n.CONSTANT_ALPHA,[ZM]:n.ONE_MINUS_CONSTANT_ALPHA};function he(Y,Be,ve,ze,qe,Se,rt,it,qt,Ht){if(Y===vs){m===!0&&(ht(n.BLEND),m=!1);return}if(m===!1&&(Ie(n.BLEND),m=!0),Y!==LM){if(Y!==p||Ht!==F){if((y!==Pr||P!==Pr)&&(n.blendEquation(n.FUNC_ADD),y=Pr,P=Pr),Ht)switch(Y){case Wo:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case yt:n.blendFunc(n.ONE,n.ONE);break;case dm:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case hm:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Ot("WebGLState: Invalid blending: ",Y);break}else switch(Y){case Wo:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case yt:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case dm:Ot("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case hm:Ot("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ot("WebGLState: Invalid blending: ",Y);break}R=null,M=null,T=null,I=null,v.set(0,0,0),A=0,p=Y,F=Ht}return}qe=qe||Be,Se=Se||ve,rt=rt||ze,(Be!==y||qe!==P)&&(n.blendEquationSeparate(B[Be],B[qe]),y=Be,P=qe),(ve!==R||ze!==M||Se!==T||rt!==I)&&(n.blendFuncSeparate(ie[ve],ie[ze],ie[Se],ie[rt]),R=ve,M=ze,T=Se,I=rt),(it.equals(v)===!1||qt!==A)&&(n.blendColor(it.r,it.g,it.b,qt),v.copy(it),A=qt),p=Y,F=!1}function ce(Y,Be){Y.side===Nt?ht(n.CULL_FACE):Ie(n.CULL_FACE);let ve=Y.side===vn;Be&&(ve=!ve),_e(ve),Y.blending===Wo&&Y.transparent===!1?he(vs):he(Y.blending,Y.blendEquation,Y.blendSrc,Y.blendDst,Y.blendEquationAlpha,Y.blendSrcAlpha,Y.blendDstAlpha,Y.blendColor,Y.blendAlpha,Y.premultipliedAlpha),o.setFunc(Y.depthFunc),o.setTest(Y.depthTest),o.setMask(Y.depthWrite),r.setMask(Y.colorWrite);const ze=Y.stencilWrite;a.setTest(ze),ze&&(a.setMask(Y.stencilWriteMask),a.setFunc(Y.stencilFunc,Y.stencilRef,Y.stencilFuncMask),a.setOp(Y.stencilFail,Y.stencilZFail,Y.stencilZPass)),Ee(Y.polygonOffset,Y.polygonOffsetFactor,Y.polygonOffsetUnits),Y.alphaToCoverage===!0?Ie(n.SAMPLE_ALPHA_TO_COVERAGE):ht(n.SAMPLE_ALPHA_TO_COVERAGE)}function _e(Y){k!==Y&&(Y?n.frontFace(n.CW):n.frontFace(n.CCW),k=Y)}function Pe(Y){Y!==PM?(Ie(n.CULL_FACE),Y!==U&&(Y===um?n.cullFace(n.BACK):Y===DM?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ht(n.CULL_FACE),U=Y}function Re(Y){Y!==ee&&(Z&&n.lineWidth(Y),ee=Y)}function Ee(Y,Be,ve){Y?(Ie(n.POLYGON_OFFSET_FILL),(le!==Be||$!==ve)&&(le=Be,$=ve,o.getReversed()&&(Be=-Be),n.polygonOffset(Be,ve))):ht(n.POLYGON_OFFSET_FILL)}function xe(Y){Y?Ie(n.SCISSOR_TEST):ht(n.SCISSOR_TEST)}function Ke(Y){Y===void 0&&(Y=n.TEXTURE0+se-1),He!==Y&&(n.activeTexture(Y),He=Y)}function N(Y,Be,ve){ve===void 0&&(He===null?ve=n.TEXTURE0+se-1:ve=He);let ze=Oe[ve];ze===void 0&&(ze={type:void 0,texture:void 0},Oe[ve]=ze),(ze.type!==Y||ze.texture!==Be)&&(He!==ve&&(n.activeTexture(ve),He=ve),n.bindTexture(Y,Be||Fe[Y]),ze.type=Y,ze.texture=Be)}function $e(){const Y=Oe[He];Y!==void 0&&Y.type!==void 0&&(n.bindTexture(Y.type,null),Y.type=void 0,Y.texture=void 0)}function Xe(){try{n.compressedTexImage2D(...arguments)}catch(Y){Ot("WebGLState:",Y)}}function C(){try{n.compressedTexImage3D(...arguments)}catch(Y){Ot("WebGLState:",Y)}}function _(){try{n.texSubImage2D(...arguments)}catch(Y){Ot("WebGLState:",Y)}}function W(){try{n.texSubImage3D(...arguments)}catch(Y){Ot("WebGLState:",Y)}}function j(){try{n.compressedTexSubImage2D(...arguments)}catch(Y){Ot("WebGLState:",Y)}}function re(){try{n.compressedTexSubImage3D(...arguments)}catch(Y){Ot("WebGLState:",Y)}}function Ce(){try{n.texStorage2D(...arguments)}catch(Y){Ot("WebGLState:",Y)}}function Ne(){try{n.texStorage3D(...arguments)}catch(Y){Ot("WebGLState:",Y)}}function ue(){try{n.texImage2D(...arguments)}catch(Y){Ot("WebGLState:",Y)}}function fe(){try{n.texImage3D(...arguments)}catch(Y){Ot("WebGLState:",Y)}}function Le(Y){return h[Y]!==void 0?h[Y]:n.getParameter(Y)}function Je(Y,Be){h[Y]!==Be&&(n.pixelStorei(Y,Be),h[Y]=Be)}function Ge(Y){gt.equals(Y)===!1&&(n.scissor(Y.x,Y.y,Y.z,Y.w),gt.copy(Y))}function ke(Y){pt.equals(Y)===!1&&(n.viewport(Y.x,Y.y,Y.z,Y.w),pt.copy(Y))}function lt(Y,Be){let ve=c.get(Be);ve===void 0&&(ve=new WeakMap,c.set(Be,ve));let ze=ve.get(Y);ze===void 0&&(ze=n.getUniformBlockIndex(Be,Y.name),ve.set(Y,ze))}function ft(Y,Be){const ze=c.get(Be).get(Y);l.get(Be)!==ze&&(n.uniformBlockBinding(Be,ze,Y.__bindingPointIndex),l.set(Be,ze))}function St(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},h={},He=null,Oe={},d={},f=new WeakMap,x=[],S=null,m=!1,p=null,y=null,R=null,M=null,P=null,T=null,I=null,v=new Ze(0,0,0),A=0,F=!1,k=null,U=null,ee=null,le=null,$=null,gt.set(0,0,n.canvas.width,n.canvas.height),pt.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:Ie,disable:ht,bindFramebuffer:_t,drawBuffers:ot,useProgram:O,setBlending:he,setMaterial:ce,setFlipSided:_e,setCullFace:Pe,setLineWidth:Re,setPolygonOffset:Ee,setScissorTest:xe,activeTexture:Ke,bindTexture:N,unbindTexture:$e,compressedTexImage2D:Xe,compressedTexImage3D:C,texImage2D:ue,texImage3D:fe,pixelStorei:Je,getParameter:Le,updateUBOMapping:lt,uniformBlockBinding:ft,texStorage2D:Ce,texStorage3D:Ne,texSubImage2D:_,texSubImage3D:W,compressedTexSubImage2D:j,compressedTexSubImage3D:re,scissor:Ge,viewport:ke,reset:St}}function GT(n,e,t,i,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new dt,u=new WeakMap,h=new Set;let d;const f=new WeakMap;let x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function S(C,_){return x?new OffscreenCanvas(C,_):au("canvas")}function m(C,_,W){let j=1;const re=Xe(C);if((re.width>W||re.height>W)&&(j=W/Math.max(re.width,re.height)),j<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const Ce=Math.floor(j*re.width),Ne=Math.floor(j*re.height);d===void 0&&(d=S(Ce,Ne));const ue=_?S(Ce,Ne):d;return ue.width=Ce,ue.height=Ne,ue.getContext("2d").drawImage(C,0,0,Ce,Ne),bt("WebGLRenderer: Texture has been resized from ("+re.width+"x"+re.height+") to ("+Ce+"x"+Ne+")."),ue}else return"data"in C&&bt("WebGLRenderer: Image in DataTexture is too big ("+re.width+"x"+re.height+")."),C;return C}function p(C){return C.generateMipmaps}function y(C){n.generateMipmap(C)}function R(C){return C.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?n.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function M(C,_,W,j,re,Ce=!1){if(C!==null){if(n[C]!==void 0)return n[C];bt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let Ne;j&&(Ne=e.get("EXT_texture_norm16"),Ne||bt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ue=_;if(_===n.RED&&(W===n.FLOAT&&(ue=n.R32F),W===n.HALF_FLOAT&&(ue=n.R16F),W===n.UNSIGNED_BYTE&&(ue=n.R8),W===n.UNSIGNED_SHORT&&Ne&&(ue=Ne.R16_EXT),W===n.SHORT&&Ne&&(ue=Ne.R16_SNORM_EXT)),_===n.RED_INTEGER&&(W===n.UNSIGNED_BYTE&&(ue=n.R8UI),W===n.UNSIGNED_SHORT&&(ue=n.R16UI),W===n.UNSIGNED_INT&&(ue=n.R32UI),W===n.BYTE&&(ue=n.R8I),W===n.SHORT&&(ue=n.R16I),W===n.INT&&(ue=n.R32I)),_===n.RG&&(W===n.FLOAT&&(ue=n.RG32F),W===n.HALF_FLOAT&&(ue=n.RG16F),W===n.UNSIGNED_BYTE&&(ue=n.RG8),W===n.UNSIGNED_SHORT&&Ne&&(ue=Ne.RG16_EXT),W===n.SHORT&&Ne&&(ue=Ne.RG16_SNORM_EXT)),_===n.RG_INTEGER&&(W===n.UNSIGNED_BYTE&&(ue=n.RG8UI),W===n.UNSIGNED_SHORT&&(ue=n.RG16UI),W===n.UNSIGNED_INT&&(ue=n.RG32UI),W===n.BYTE&&(ue=n.RG8I),W===n.SHORT&&(ue=n.RG16I),W===n.INT&&(ue=n.RG32I)),_===n.RGB_INTEGER&&(W===n.UNSIGNED_BYTE&&(ue=n.RGB8UI),W===n.UNSIGNED_SHORT&&(ue=n.RGB16UI),W===n.UNSIGNED_INT&&(ue=n.RGB32UI),W===n.BYTE&&(ue=n.RGB8I),W===n.SHORT&&(ue=n.RGB16I),W===n.INT&&(ue=n.RGB32I)),_===n.RGBA_INTEGER&&(W===n.UNSIGNED_BYTE&&(ue=n.RGBA8UI),W===n.UNSIGNED_SHORT&&(ue=n.RGBA16UI),W===n.UNSIGNED_INT&&(ue=n.RGBA32UI),W===n.BYTE&&(ue=n.RGBA8I),W===n.SHORT&&(ue=n.RGBA16I),W===n.INT&&(ue=n.RGBA32I)),_===n.RGB&&(W===n.UNSIGNED_SHORT&&Ne&&(ue=Ne.RGB16_EXT),W===n.SHORT&&Ne&&(ue=Ne.RGB16_SNORM_EXT),W===n.UNSIGNED_INT_5_9_9_9_REV&&(ue=n.RGB9_E5),W===n.UNSIGNED_INT_10F_11F_11F_REV&&(ue=n.R11F_G11F_B10F)),_===n.RGBA){const fe=Ce?ou:kt.getTransfer(re);W===n.FLOAT&&(ue=n.RGBA32F),W===n.HALF_FLOAT&&(ue=n.RGBA16F),W===n.UNSIGNED_BYTE&&(ue=fe===jt?n.SRGB8_ALPHA8:n.RGBA8),W===n.UNSIGNED_SHORT&&Ne&&(ue=Ne.RGBA16_EXT),W===n.SHORT&&Ne&&(ue=Ne.RGBA16_SNORM_EXT),W===n.UNSIGNED_SHORT_4_4_4_4&&(ue=n.RGBA4),W===n.UNSIGNED_SHORT_5_5_5_1&&(ue=n.RGB5_A1)}return(ue===n.R16F||ue===n.R32F||ue===n.RG16F||ue===n.RG32F||ue===n.RGBA16F||ue===n.RGBA32F)&&e.get("EXT_color_buffer_float"),ue}function P(C,_){let W;return C?_===null||_===ns||_===Sl?W=n.DEPTH24_STENCIL8:_===Ui?W=n.DEPTH32F_STENCIL8:_===Ml&&(W=n.DEPTH24_STENCIL8,bt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===ns||_===Sl?W=n.DEPTH_COMPONENT24:_===Ui?W=n.DEPTH_COMPONENT32F:_===Ml&&(W=n.DEPTH_COMPONENT16),W}function T(C,_){return p(C)===!0||C.isFramebufferTexture&&C.minFilter!==Xn&&C.minFilter!==Cn?Math.log2(Math.max(_.width,_.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?_.mipmaps.length:1}function I(C){const _=C.target;_.removeEventListener("dispose",I),A(_),_.isVideoTexture&&u.delete(_),_.isHTMLTexture&&h.delete(_)}function v(C){const _=C.target;_.removeEventListener("dispose",v),k(_)}function A(C){const _=i.get(C);if(_.__webglInit===void 0)return;const W=C.source,j=f.get(W);if(j){const re=j[_.__cacheKey];re.usedTimes--,re.usedTimes===0&&F(C),Object.keys(j).length===0&&f.delete(W)}i.remove(C)}function F(C){const _=i.get(C);n.deleteTexture(_.__webglTexture);const W=C.source,j=f.get(W);delete j[_.__cacheKey],o.memory.textures--}function k(C){const _=i.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),i.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(_.__webglFramebuffer[j]))for(let re=0;re<_.__webglFramebuffer[j].length;re++)n.deleteFramebuffer(_.__webglFramebuffer[j][re]);else n.deleteFramebuffer(_.__webglFramebuffer[j]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[j])}else{if(Array.isArray(_.__webglFramebuffer))for(let j=0;j<_.__webglFramebuffer.length;j++)n.deleteFramebuffer(_.__webglFramebuffer[j]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let j=0;j<_.__webglColorRenderbuffer.length;j++)_.__webglColorRenderbuffer[j]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[j]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const W=C.textures;for(let j=0,re=W.length;j<re;j++){const Ce=i.get(W[j]);Ce.__webglTexture&&(n.deleteTexture(Ce.__webglTexture),o.memory.textures--),i.remove(W[j])}i.remove(C)}let U=0;function ee(){U=0}function le(){return U}function $(C){U=C}function se(){const C=U;return C>=s.maxTextures&&bt("WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),U+=1,C}function Z(C){const _=[];return _.push(C.wrapS),_.push(C.wrapT),_.push(C.wrapR||0),_.push(C.magFilter),_.push(C.minFilter),_.push(C.anisotropy),_.push(C.internalFormat),_.push(C.format),_.push(C.type),_.push(C.generateMipmaps),_.push(C.premultiplyAlpha),_.push(C.flipY),_.push(C.unpackAlignment),_.push(C.colorSpace),_.join()}function ae(C,_){const W=i.get(C);if(C.isVideoTexture&&N(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&W.__version!==C.version){const j=C.image;if(j===null)bt("WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)bt("WebGLRenderer: Texture marked for update but image is incomplete");else{ht(W,C,_);return}}else C.isExternalTexture&&(W.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,W.__webglTexture,n.TEXTURE0+_)}function Te(C,_){const W=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&W.__version!==C.version){ht(W,C,_);return}else C.isExternalTexture&&(W.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,W.__webglTexture,n.TEXTURE0+_)}function He(C,_){const W=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&W.__version!==C.version){ht(W,C,_);return}t.bindTexture(n.TEXTURE_3D,W.__webglTexture,n.TEXTURE0+_)}function Oe(C,_){const W=i.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&W.__version!==C.version){_t(W,C,_);return}t.bindTexture(n.TEXTURE_CUBE_MAP,W.__webglTexture,n.TEXTURE0+_)}const J={[wi]:n.REPEAT,[ji]:n.CLAMP_TO_EDGE,[wh]:n.MIRRORED_REPEAT},be={[Xn]:n.NEAREST,[QM]:n.NEAREST_MIPMAP_NEAREST,[Zl]:n.NEAREST_MIPMAP_LINEAR,[Cn]:n.LINEAR,[md]:n.LINEAR_MIPMAP_NEAREST,[Lr]:n.LINEAR_MIPMAP_LINEAR},gt={[n1]:n.NEVER,[a1]:n.ALWAYS,[i1]:n.LESS,[kf]:n.LEQUAL,[s1]:n.EQUAL,[Bf]:n.GEQUAL,[r1]:n.GREATER,[o1]:n.NOTEQUAL};function pt(C,_){if(_.type===Ui&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Cn||_.magFilter===md||_.magFilter===Zl||_.magFilter===Lr||_.minFilter===Cn||_.minFilter===md||_.minFilter===Zl||_.minFilter===Lr)&&bt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(C,n.TEXTURE_WRAP_S,J[_.wrapS]),n.texParameteri(C,n.TEXTURE_WRAP_T,J[_.wrapT]),(C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY)&&n.texParameteri(C,n.TEXTURE_WRAP_R,J[_.wrapR]),n.texParameteri(C,n.TEXTURE_MAG_FILTER,be[_.magFilter]),n.texParameteri(C,n.TEXTURE_MIN_FILTER,be[_.minFilter]),_.compareFunction&&(n.texParameteri(C,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(C,n.TEXTURE_COMPARE_FUNC,gt[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Xn||_.minFilter!==Zl&&_.minFilter!==Lr||_.type===Ui&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){const W=e.get("EXT_texture_filter_anisotropic");n.texParameterf(C,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function pe(C,_){let W=!1;C.__webglInit===void 0&&(C.__webglInit=!0,_.addEventListener("dispose",I));const j=_.source;let re=f.get(j);re===void 0&&(re={},f.set(j,re));const Ce=Z(_);if(Ce!==C.__cacheKey){re[Ce]===void 0&&(re[Ce]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,W=!0),re[Ce].usedTimes++;const Ne=re[C.__cacheKey];Ne!==void 0&&(re[C.__cacheKey].usedTimes--,Ne.usedTimes===0&&F(_)),C.__cacheKey=Ce,C.__webglTexture=re[Ce].texture}return W}function Fe(C,_,W){return Math.floor(Math.floor(C/W)/_)}function Ie(C,_,W,j){const Ce=C.updateRanges;if(Ce.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,_.width,_.height,W,j,_.data);else{Ce.sort((Je,Ge)=>Je.start-Ge.start);let Ne=0;for(let Je=1;Je<Ce.length;Je++){const Ge=Ce[Ne],ke=Ce[Je],lt=Ge.start+Ge.count,ft=Fe(ke.start,_.width,4),St=Fe(Ge.start,_.width,4);ke.start<=lt+1&&ft===St&&Fe(ke.start+ke.count-1,_.width,4)===ft?Ge.count=Math.max(Ge.count,ke.start+ke.count-Ge.start):(++Ne,Ce[Ne]=ke)}Ce.length=Ne+1;const ue=t.getParameter(n.UNPACK_ROW_LENGTH),fe=t.getParameter(n.UNPACK_SKIP_PIXELS),Le=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,_.width);for(let Je=0,Ge=Ce.length;Je<Ge;Je++){const ke=Ce[Je],lt=Math.floor(ke.start/4),ft=Math.ceil(ke.count/4),St=lt%_.width,Y=Math.floor(lt/_.width),Be=ft,ve=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,St),t.pixelStorei(n.UNPACK_SKIP_ROWS,Y),t.texSubImage2D(n.TEXTURE_2D,0,St,Y,Be,ve,W,j,_.data)}C.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,ue),t.pixelStorei(n.UNPACK_SKIP_PIXELS,fe),t.pixelStorei(n.UNPACK_SKIP_ROWS,Le)}}function ht(C,_,W){let j=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(j=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(j=n.TEXTURE_3D);const re=pe(C,_),Ce=_.source;t.bindTexture(j,C.__webglTexture,n.TEXTURE0+W);const Ne=i.get(Ce);if(Ce.version!==Ne.__version||re===!0){if(t.activeTexture(n.TEXTURE0+W),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){const ve=kt.getPrimaries(kt.workingColorSpace),ze=_.colorSpace===qs?null:kt.getPrimaries(_.colorSpace),qe=_.colorSpace===qs||ve===ze?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,qe)}t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment);let fe=m(_.image,!1,s.maxTextureSize);fe=$e(_,fe);const Le=r.convert(_.format,_.colorSpace),Je=r.convert(_.type);let Ge=M(_.internalFormat,Le,Je,_.normalized,_.colorSpace,_.isVideoTexture);pt(j,_);let ke;const lt=_.mipmaps,ft=_.isVideoTexture!==!0,St=Ne.__version===void 0||re===!0,Y=Ce.dataReady,Be=T(_,fe);if(_.isDepthTexture)Ge=P(_.format===Nr,_.type),St&&(ft?t.texStorage2D(n.TEXTURE_2D,1,Ge,fe.width,fe.height):t.texImage2D(n.TEXTURE_2D,0,Ge,fe.width,fe.height,0,Le,Je,null));else if(_.isDataTexture)if(lt.length>0){ft&&St&&t.texStorage2D(n.TEXTURE_2D,Be,Ge,lt[0].width,lt[0].height);for(let ve=0,ze=lt.length;ve<ze;ve++)ke=lt[ve],ft?Y&&t.texSubImage2D(n.TEXTURE_2D,ve,0,0,ke.width,ke.height,Le,Je,ke.data):t.texImage2D(n.TEXTURE_2D,ve,Ge,ke.width,ke.height,0,Le,Je,ke.data);_.generateMipmaps=!1}else ft?(St&&t.texStorage2D(n.TEXTURE_2D,Be,Ge,fe.width,fe.height),Y&&Ie(_,fe,Le,Je)):t.texImage2D(n.TEXTURE_2D,0,Ge,fe.width,fe.height,0,Le,Je,fe.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){ft&&St&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Be,Ge,lt[0].width,lt[0].height,fe.depth);for(let ve=0,ze=lt.length;ve<ze;ve++)if(ke=lt[ve],_.format!==Fi)if(Le!==null)if(ft){if(Y)if(_.layerUpdates.size>0){const qe=jm(ke.width,ke.height,_.format,_.type);for(const Se of _.layerUpdates){const rt=ke.data.subarray(Se*qe/ke.data.BYTES_PER_ELEMENT,(Se+1)*qe/ke.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ve,0,0,Se,ke.width,ke.height,1,Le,rt)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ve,0,0,0,ke.width,ke.height,fe.depth,Le,ke.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ve,Ge,ke.width,ke.height,fe.depth,0,ke.data,0,0);else bt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ft?Y&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ve,0,0,0,ke.width,ke.height,fe.depth,Le,Je,ke.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ve,Ge,ke.width,ke.height,fe.depth,0,Le,Je,ke.data)}else{ft&&St&&t.texStorage2D(n.TEXTURE_2D,Be,Ge,lt[0].width,lt[0].height);for(let ve=0,ze=lt.length;ve<ze;ve++)ke=lt[ve],_.format!==Fi?Le!==null?ft?Y&&t.compressedTexSubImage2D(n.TEXTURE_2D,ve,0,0,ke.width,ke.height,Le,ke.data):t.compressedTexImage2D(n.TEXTURE_2D,ve,Ge,ke.width,ke.height,0,ke.data):bt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ft?Y&&t.texSubImage2D(n.TEXTURE_2D,ve,0,0,ke.width,ke.height,Le,Je,ke.data):t.texImage2D(n.TEXTURE_2D,ve,Ge,ke.width,ke.height,0,Le,Je,ke.data)}else if(_.isDataArrayTexture)if(ft){if(St&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Be,Ge,fe.width,fe.height,fe.depth),Y)if(_.layerUpdates.size>0){const ve=jm(fe.width,fe.height,_.format,_.type);for(const ze of _.layerUpdates){const qe=fe.data.subarray(ze*ve/fe.data.BYTES_PER_ELEMENT,(ze+1)*ve/fe.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ze,fe.width,fe.height,1,Le,Je,qe)}_.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,fe.width,fe.height,fe.depth,Le,Je,fe.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ge,fe.width,fe.height,fe.depth,0,Le,Je,fe.data);else if(_.isData3DTexture)ft?(St&&t.texStorage3D(n.TEXTURE_3D,Be,Ge,fe.width,fe.height,fe.depth),Y&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,fe.width,fe.height,fe.depth,Le,Je,fe.data)):t.texImage3D(n.TEXTURE_3D,0,Ge,fe.width,fe.height,fe.depth,0,Le,Je,fe.data);else if(_.isFramebufferTexture){if(St)if(ft)t.texStorage2D(n.TEXTURE_2D,Be,Ge,fe.width,fe.height);else{let ve=fe.width,ze=fe.height;for(let qe=0;qe<Be;qe++)t.texImage2D(n.TEXTURE_2D,qe,Ge,ve,ze,0,Le,Je,null),ve>>=1,ze>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in n){const ve=n.canvas;if(ve.hasAttribute("layoutsubtree")||ve.setAttribute("layoutsubtree","true"),fe.parentNode!==ve){ve.appendChild(fe),h.add(_),ve.onpaint=ze=>{const qe=ze.changedElements;for(const Se of h)qe.includes(Se.image)&&(Se.needsUpdate=!0)},ve.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,fe);else{const qe=n.RGBA,Se=n.RGBA,rt=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,qe,Se,rt,fe)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(lt.length>0){if(ft&&St){const ve=Xe(lt[0]);t.texStorage2D(n.TEXTURE_2D,Be,Ge,ve.width,ve.height)}for(let ve=0,ze=lt.length;ve<ze;ve++)ke=lt[ve],ft?Y&&t.texSubImage2D(n.TEXTURE_2D,ve,0,0,Le,Je,ke):t.texImage2D(n.TEXTURE_2D,ve,Ge,Le,Je,ke);_.generateMipmaps=!1}else if(ft){if(St){const ve=Xe(fe);t.texStorage2D(n.TEXTURE_2D,Be,Ge,ve.width,ve.height)}Y&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,Le,Je,fe)}else t.texImage2D(n.TEXTURE_2D,0,Ge,Le,Je,fe);p(_)&&y(j),Ne.__version=Ce.version,_.onUpdate&&_.onUpdate(_)}C.__version=_.version}function _t(C,_,W){if(_.image.length!==6)return;const j=pe(C,_),re=_.source;t.bindTexture(n.TEXTURE_CUBE_MAP,C.__webglTexture,n.TEXTURE0+W);const Ce=i.get(re);if(re.version!==Ce.__version||j===!0){t.activeTexture(n.TEXTURE0+W);const Ne=kt.getPrimaries(kt.workingColorSpace),ue=_.colorSpace===qs?null:kt.getPrimaries(_.colorSpace),fe=_.colorSpace===qs||Ne===ue?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,fe);const Le=_.isCompressedTexture||_.image[0].isCompressedTexture,Je=_.image[0]&&_.image[0].isDataTexture,Ge=[];for(let Se=0;Se<6;Se++)!Le&&!Je?Ge[Se]=m(_.image[Se],!0,s.maxCubemapSize):Ge[Se]=Je?_.image[Se].image:_.image[Se],Ge[Se]=$e(_,Ge[Se]);const ke=Ge[0],lt=r.convert(_.format,_.colorSpace),ft=r.convert(_.type),St=M(_.internalFormat,lt,ft,_.normalized,_.colorSpace),Y=_.isVideoTexture!==!0,Be=Ce.__version===void 0||j===!0,ve=re.dataReady;let ze=T(_,ke);pt(n.TEXTURE_CUBE_MAP,_);let qe;if(Le){Y&&Be&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ze,St,ke.width,ke.height);for(let Se=0;Se<6;Se++){qe=Ge[Se].mipmaps;for(let rt=0;rt<qe.length;rt++){const it=qe[rt];_.format!==Fi?lt!==null?Y?ve&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Se,rt,0,0,it.width,it.height,lt,it.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Se,rt,St,it.width,it.height,0,it.data):bt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Y?ve&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Se,rt,0,0,it.width,it.height,lt,ft,it.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Se,rt,St,it.width,it.height,0,lt,ft,it.data)}}}else{if(qe=_.mipmaps,Y&&Be){qe.length>0&&ze++;const Se=Xe(Ge[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ze,St,Se.width,Se.height)}for(let Se=0;Se<6;Se++)if(Je){Y?ve&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,0,0,Ge[Se].width,Ge[Se].height,lt,ft,Ge[Se].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,St,Ge[Se].width,Ge[Se].height,0,lt,ft,Ge[Se].data);for(let rt=0;rt<qe.length;rt++){const qt=qe[rt].image[Se].image;Y?ve&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Se,rt+1,0,0,qt.width,qt.height,lt,ft,qt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Se,rt+1,St,qt.width,qt.height,0,lt,ft,qt.data)}}else{Y?ve&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,0,0,lt,ft,Ge[Se]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,St,lt,ft,Ge[Se]);for(let rt=0;rt<qe.length;rt++){const it=qe[rt];Y?ve&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Se,rt+1,0,0,lt,ft,it.image[Se]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Se,rt+1,St,lt,ft,it.image[Se])}}}p(_)&&y(n.TEXTURE_CUBE_MAP),Ce.__version=re.version,_.onUpdate&&_.onUpdate(_)}C.__version=_.version}function ot(C,_,W,j,re,Ce){const Ne=r.convert(W.format,W.colorSpace),ue=r.convert(W.type),fe=M(W.internalFormat,Ne,ue,W.normalized,W.colorSpace),Le=i.get(_),Je=i.get(W);if(Je.__renderTarget=_,!Le.__hasExternalTextures){const Ge=Math.max(1,_.width>>Ce),ke=Math.max(1,_.height>>Ce);re===n.TEXTURE_3D||re===n.TEXTURE_2D_ARRAY?t.texImage3D(re,Ce,fe,Ge,ke,_.depth,0,Ne,ue,null):t.texImage2D(re,Ce,fe,Ge,ke,0,Ne,ue,null)}t.bindFramebuffer(n.FRAMEBUFFER,C),Ke(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,j,re,Je.__webglTexture,0,xe(_)):(re===n.TEXTURE_2D||re>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&re<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,j,re,Je.__webglTexture,Ce),t.bindFramebuffer(n.FRAMEBUFFER,null)}function O(C,_,W){if(n.bindRenderbuffer(n.RENDERBUFFER,C),_.depthBuffer){const j=_.depthTexture,re=j&&j.isDepthTexture?j.type:null,Ce=P(_.stencilBuffer,re),Ne=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Ke(_)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,xe(_),Ce,_.width,_.height):W?n.renderbufferStorageMultisample(n.RENDERBUFFER,xe(_),Ce,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,Ce,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Ne,n.RENDERBUFFER,C)}else{const j=_.textures;for(let re=0;re<j.length;re++){const Ce=j[re],Ne=r.convert(Ce.format,Ce.colorSpace),ue=r.convert(Ce.type),fe=M(Ce.internalFormat,Ne,ue,Ce.normalized,Ce.colorSpace);Ke(_)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,xe(_),fe,_.width,_.height):W?n.renderbufferStorageMultisample(n.RENDERBUFFER,xe(_),fe,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,fe,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function B(C,_,W){const j=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,C),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const re=i.get(_.depthTexture);if(re.__renderTarget=_,(!re.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),j){if(re.__webglInit===void 0&&(re.__webglInit=!0,_.depthTexture.addEventListener("dispose",I)),re.__webglTexture===void 0){re.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,re.__webglTexture),pt(n.TEXTURE_CUBE_MAP,_.depthTexture);const Le=r.convert(_.depthTexture.format),Je=r.convert(_.depthTexture.type);let Ge;_.depthTexture.format===ws?Ge=n.DEPTH_COMPONENT24:_.depthTexture.format===Nr&&(Ge=n.DEPTH24_STENCIL8);for(let ke=0;ke<6;ke++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ke,0,Ge,_.width,_.height,0,Le,Je,null)}}else ae(_.depthTexture,0);const Ce=re.__webglTexture,Ne=xe(_),ue=j?n.TEXTURE_CUBE_MAP_POSITIVE_X+W:n.TEXTURE_2D,fe=_.depthTexture.format===Nr?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(_.depthTexture.format===ws)Ke(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,fe,ue,Ce,0,Ne):n.framebufferTexture2D(n.FRAMEBUFFER,fe,ue,Ce,0);else if(_.depthTexture.format===Nr)Ke(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,fe,ue,Ce,0,Ne):n.framebufferTexture2D(n.FRAMEBUFFER,fe,ue,Ce,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ie(C){const _=i.get(C),W=C.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==C.depthTexture){const j=C.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),j){const re=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,j.removeEventListener("dispose",re)};j.addEventListener("dispose",re),_.__depthDisposeCallback=re}_.__boundDepthTexture=j}if(C.depthTexture&&!_.__autoAllocateDepthBuffer)if(W)for(let j=0;j<6;j++)B(_.__webglFramebuffer[j],C,j);else{const j=C.texture.mipmaps;j&&j.length>0?B(_.__webglFramebuffer[0],C,0):B(_.__webglFramebuffer,C,0)}else if(W){_.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[j]),_.__webglDepthbuffer[j]===void 0)_.__webglDepthbuffer[j]=n.createRenderbuffer(),O(_.__webglDepthbuffer[j],C,!1);else{const re=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Ce=_.__webglDepthbuffer[j];n.bindRenderbuffer(n.RENDERBUFFER,Ce),n.framebufferRenderbuffer(n.FRAMEBUFFER,re,n.RENDERBUFFER,Ce)}}else{const j=C.texture.mipmaps;if(j&&j.length>0?t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),O(_.__webglDepthbuffer,C,!1);else{const re=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Ce=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,Ce),n.framebufferRenderbuffer(n.FRAMEBUFFER,re,n.RENDERBUFFER,Ce)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function he(C,_,W){const j=i.get(C);_!==void 0&&ot(j.__webglFramebuffer,C,C.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),W!==void 0&&ie(C)}function ce(C){const _=C.texture,W=i.get(C),j=i.get(_);C.addEventListener("dispose",v);const re=C.textures,Ce=C.isWebGLCubeRenderTarget===!0,Ne=re.length>1;if(Ne||(j.__webglTexture===void 0&&(j.__webglTexture=n.createTexture()),j.__version=_.version,o.memory.textures++),Ce){W.__webglFramebuffer=[];for(let ue=0;ue<6;ue++)if(_.mipmaps&&_.mipmaps.length>0){W.__webglFramebuffer[ue]=[];for(let fe=0;fe<_.mipmaps.length;fe++)W.__webglFramebuffer[ue][fe]=n.createFramebuffer()}else W.__webglFramebuffer[ue]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){W.__webglFramebuffer=[];for(let ue=0;ue<_.mipmaps.length;ue++)W.__webglFramebuffer[ue]=n.createFramebuffer()}else W.__webglFramebuffer=n.createFramebuffer();if(Ne)for(let ue=0,fe=re.length;ue<fe;ue++){const Le=i.get(re[ue]);Le.__webglTexture===void 0&&(Le.__webglTexture=n.createTexture(),o.memory.textures++)}if(C.samples>0&&Ke(C)===!1){W.__webglMultisampledFramebuffer=n.createFramebuffer(),W.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let ue=0;ue<re.length;ue++){const fe=re[ue];W.__webglColorRenderbuffer[ue]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,W.__webglColorRenderbuffer[ue]);const Le=r.convert(fe.format,fe.colorSpace),Je=r.convert(fe.type),Ge=M(fe.internalFormat,Le,Je,fe.normalized,fe.colorSpace,C.isXRRenderTarget===!0),ke=xe(C);n.renderbufferStorageMultisample(n.RENDERBUFFER,ke,Ge,C.width,C.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ue,n.RENDERBUFFER,W.__webglColorRenderbuffer[ue])}n.bindRenderbuffer(n.RENDERBUFFER,null),C.depthBuffer&&(W.__webglDepthRenderbuffer=n.createRenderbuffer(),O(W.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Ce){t.bindTexture(n.TEXTURE_CUBE_MAP,j.__webglTexture),pt(n.TEXTURE_CUBE_MAP,_);for(let ue=0;ue<6;ue++)if(_.mipmaps&&_.mipmaps.length>0)for(let fe=0;fe<_.mipmaps.length;fe++)ot(W.__webglFramebuffer[ue][fe],C,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,fe);else ot(W.__webglFramebuffer[ue],C,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0);p(_)&&y(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ne){for(let ue=0,fe=re.length;ue<fe;ue++){const Le=re[ue],Je=i.get(Le);let Ge=n.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(Ge=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Ge,Je.__webglTexture),pt(Ge,Le),ot(W.__webglFramebuffer,C,Le,n.COLOR_ATTACHMENT0+ue,Ge,0),p(Le)&&y(Ge)}t.unbindTexture()}else{let ue=n.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ue=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ue,j.__webglTexture),pt(ue,_),_.mipmaps&&_.mipmaps.length>0)for(let fe=0;fe<_.mipmaps.length;fe++)ot(W.__webglFramebuffer[fe],C,_,n.COLOR_ATTACHMENT0,ue,fe);else ot(W.__webglFramebuffer,C,_,n.COLOR_ATTACHMENT0,ue,0);p(_)&&y(ue),t.unbindTexture()}C.depthBuffer&&ie(C)}function _e(C){const _=C.textures;for(let W=0,j=_.length;W<j;W++){const re=_[W];if(p(re)){const Ce=R(C),Ne=i.get(re).__webglTexture;t.bindTexture(Ce,Ne),y(Ce),t.unbindTexture()}}}const Pe=[],Re=[];function Ee(C){if(C.samples>0){if(Ke(C)===!1){const _=C.textures,W=C.width,j=C.height;let re=n.COLOR_BUFFER_BIT;const Ce=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Ne=i.get(C),ue=_.length>1;if(ue)for(let Le=0;Le<_.length;Le++)t.bindFramebuffer(n.FRAMEBUFFER,Ne.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Le,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Ne.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Le,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Ne.__webglMultisampledFramebuffer);const fe=C.texture.mipmaps;fe&&fe.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ne.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ne.__webglFramebuffer);for(let Le=0;Le<_.length;Le++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(re|=n.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(re|=n.STENCIL_BUFFER_BIT)),ue){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Ne.__webglColorRenderbuffer[Le]);const Je=i.get(_[Le]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Je,0)}n.blitFramebuffer(0,0,W,j,0,0,W,j,re,n.NEAREST),l===!0&&(Pe.length=0,Re.length=0,Pe.push(n.COLOR_ATTACHMENT0+Le),C.depthBuffer&&C.resolveDepthBuffer===!1&&(Pe.push(Ce),Re.push(Ce),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Re)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Pe))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ue)for(let Le=0;Le<_.length;Le++){t.bindFramebuffer(n.FRAMEBUFFER,Ne.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Le,n.RENDERBUFFER,Ne.__webglColorRenderbuffer[Le]);const Je=i.get(_[Le]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Ne.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Le,n.TEXTURE_2D,Je,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ne.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){const _=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function xe(C){return Math.min(s.maxSamples,C.samples)}function Ke(C){const _=i.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function N(C){const _=o.render.frame;u.get(C)!==_&&(u.set(C,_),C.update())}function $e(C,_){const W=C.colorSpace,j=C.format,re=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||W!==ru&&W!==qs&&(kt.getTransfer(W)===jt?(j!==Fi||re!==_i)&&bt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ot("WebGLTextures: Unsupported texture color space:",W)),_}function Xe(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=se,this.resetTextureUnits=ee,this.getTextureUnits=le,this.setTextureUnits=$,this.setTexture2D=ae,this.setTexture2DArray=Te,this.setTexture3D=He,this.setTextureCube=Oe,this.rebindTextures=he,this.setupRenderTarget=ce,this.updateRenderTargetMipmap=_e,this.updateMultisampleRenderTarget=Ee,this.setupDepthRenderbuffer=ie,this.setupFrameBufferTexture=ot,this.useMultisampledRTT=Ke,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function zT(n,e){function t(i,s=qs){let r;const o=kt.getTransfer(s);if(i===_i)return n.UNSIGNED_BYTE;if(i===If)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Lf)return n.UNSIGNED_SHORT_5_5_5_1;if(i===i_)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===s_)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===t_)return n.BYTE;if(i===n_)return n.SHORT;if(i===Ml)return n.UNSIGNED_SHORT;if(i===Df)return n.INT;if(i===ns)return n.UNSIGNED_INT;if(i===Ui)return n.FLOAT;if(i===Ss)return n.HALF_FLOAT;if(i===r_)return n.ALPHA;if(i===o_)return n.RGB;if(i===Fi)return n.RGBA;if(i===ws)return n.DEPTH_COMPONENT;if(i===Nr)return n.DEPTH_STENCIL;if(i===Nf)return n.RED;if(i===Uf)return n.RED_INTEGER;if(i===Br)return n.RG;if(i===Ff)return n.RG_INTEGER;if(i===Of)return n.RGBA_INTEGER;if(i===Gc||i===zc||i===Hc||i===Vc)if(o===jt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Gc)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===zc)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Hc)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Vc)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Gc)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===zc)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Hc)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Vc)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Eh||i===Th||i===Ah||i===Ch)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Eh)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Th)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ah)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Ch)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Rh||i===Ph||i===Dh||i===Ih||i===Lh||i===iu||i===Nh)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Rh||i===Ph)return o===jt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Dh)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===Ih)return r.COMPRESSED_R11_EAC;if(i===Lh)return r.COMPRESSED_SIGNED_R11_EAC;if(i===iu)return r.COMPRESSED_RG11_EAC;if(i===Nh)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Uh||i===Fh||i===Oh||i===kh||i===Bh||i===Gh||i===zh||i===Hh||i===Vh||i===Wh||i===Xh||i===Yh||i===qh||i===Kh)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Uh)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Fh)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Oh)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===kh)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Bh)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Gh)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===zh)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Hh)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Vh)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Wh)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Xh)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Yh)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===qh)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Kh)return o===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===$h||i===Zh||i===jh)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===$h)return o===jt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Zh)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===jh)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Jh||i===Qh||i===su||i===ef)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===Jh)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Qh)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===su)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===ef)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Sl?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const HT=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,VT=`
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

}`;class WT{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new m_(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new is({vertexShader:HT,fragmentShader:VT,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new D(new Fr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class XT extends ir{constructor(e,t){super();const i=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,d=null,f=null,x=null;const S=typeof XRWebGLBinding<"u",m=new WT,p={},y=t.getContextAttributes();let R=null,M=null;const P=[],T=[],I=new dt;let v=null;const A=new mi;A.viewport=new gn;const F=new mi;F.viewport=new gn;const k=[A,F],U=new Q1;let ee=null,le=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(pe){let Fe=P[pe];return Fe===void 0&&(Fe=new Md,P[pe]=Fe),Fe.getTargetRaySpace()},this.getControllerGrip=function(pe){let Fe=P[pe];return Fe===void 0&&(Fe=new Md,P[pe]=Fe),Fe.getGripSpace()},this.getHand=function(pe){let Fe=P[pe];return Fe===void 0&&(Fe=new Md,P[pe]=Fe),Fe.getHandSpace()};function $(pe){const Fe=T.indexOf(pe.inputSource);if(Fe===-1)return;const Ie=P[Fe];Ie!==void 0&&(Ie.update(pe.inputSource,pe.frame,c||o),Ie.dispatchEvent({type:pe.type,data:pe.inputSource}))}function se(){s.removeEventListener("select",$),s.removeEventListener("selectstart",$),s.removeEventListener("selectend",$),s.removeEventListener("squeeze",$),s.removeEventListener("squeezestart",$),s.removeEventListener("squeezeend",$),s.removeEventListener("end",se),s.removeEventListener("inputsourceschange",Z);for(let pe=0;pe<P.length;pe++){const Fe=T[pe];Fe!==null&&(T[pe]=null,P[pe].disconnect(Fe))}ee=null,le=null,m.reset();for(const pe in p)delete p[pe];e.setRenderTarget(R),f=null,d=null,h=null,s=null,M=null,pt.stop(),i.isPresenting=!1,e.setPixelRatio(v),e.setSize(I.width,I.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(pe){r=pe,i.isPresenting===!0&&bt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(pe){a=pe,i.isPresenting===!0&&bt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(pe){c=pe},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h===null&&S&&(h=new XRWebGLBinding(s,t)),h},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function(pe){if(s=pe,s!==null){if(R=e.getRenderTarget(),s.addEventListener("select",$),s.addEventListener("selectstart",$),s.addEventListener("selectend",$),s.addEventListener("squeeze",$),s.addEventListener("squeezestart",$),s.addEventListener("squeezeend",$),s.addEventListener("end",se),s.addEventListener("inputsourceschange",Z),y.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(I),S&&"createProjectionLayer"in XRWebGLBinding.prototype){let Ie=null,ht=null,_t=null;y.depth&&(_t=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Ie=y.stencil?Nr:ws,ht=y.stencil?Sl:ns);const ot={colorFormat:t.RGBA8,depthFormat:_t,scaleFactor:r};h=this.getBinding(),d=h.createProjectionLayer(ot),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),M=new ts(d.textureWidth,d.textureHeight,{format:Fi,type:_i,depthTexture:new Jo(d.textureWidth,d.textureHeight,ht,void 0,void 0,void 0,void 0,void 0,void 0,Ie),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const Ie={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,Ie),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new ts(f.framebufferWidth,f.framebufferHeight,{format:Fi,type:_i,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),pt.setContext(s),pt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function Z(pe){for(let Fe=0;Fe<pe.removed.length;Fe++){const Ie=pe.removed[Fe],ht=T.indexOf(Ie);ht>=0&&(T[ht]=null,P[ht].disconnect(Ie))}for(let Fe=0;Fe<pe.added.length;Fe++){const Ie=pe.added[Fe];let ht=T.indexOf(Ie);if(ht===-1){for(let ot=0;ot<P.length;ot++)if(ot>=T.length){T.push(Ie),ht=ot;break}else if(T[ot]===null){T[ot]=Ie,ht=ot;break}if(ht===-1)break}const _t=P[ht];_t&&_t.connect(Ie)}}const ae=new L,Te=new L;function He(pe,Fe,Ie){ae.setFromMatrixPosition(Fe.matrixWorld),Te.setFromMatrixPosition(Ie.matrixWorld);const ht=ae.distanceTo(Te),_t=Fe.projectionMatrix.elements,ot=Ie.projectionMatrix.elements,O=_t[14]/(_t[10]-1),B=_t[14]/(_t[10]+1),ie=(_t[9]+1)/_t[5],he=(_t[9]-1)/_t[5],ce=(_t[8]-1)/_t[0],_e=(ot[8]+1)/ot[0],Pe=O*ce,Re=O*_e,Ee=ht/(-ce+_e),xe=Ee*-ce;if(Fe.matrixWorld.decompose(pe.position,pe.quaternion,pe.scale),pe.translateX(xe),pe.translateZ(Ee),pe.matrixWorld.compose(pe.position,pe.quaternion,pe.scale),pe.matrixWorldInverse.copy(pe.matrixWorld).invert(),_t[10]===-1)pe.projectionMatrix.copy(Fe.projectionMatrix),pe.projectionMatrixInverse.copy(Fe.projectionMatrixInverse);else{const Ke=O+Ee,N=B+Ee,$e=Pe-xe,Xe=Re+(ht-xe),C=ie*B/N*Ke,_=he*B/N*Ke;pe.projectionMatrix.makePerspective($e,Xe,C,_,Ke,N),pe.projectionMatrixInverse.copy(pe.projectionMatrix).invert()}}function Oe(pe,Fe){Fe===null?pe.matrixWorld.copy(pe.matrix):pe.matrixWorld.multiplyMatrices(Fe.matrixWorld,pe.matrix),pe.matrixWorldInverse.copy(pe.matrixWorld).invert()}this.updateCamera=function(pe){if(s===null)return;let Fe=pe.near,Ie=pe.far;m.texture!==null&&(m.depthNear>0&&(Fe=m.depthNear),m.depthFar>0&&(Ie=m.depthFar)),U.near=F.near=A.near=Fe,U.far=F.far=A.far=Ie,(ee!==U.near||le!==U.far)&&(s.updateRenderState({depthNear:U.near,depthFar:U.far}),ee=U.near,le=U.far),U.layers.mask=pe.layers.mask|6,A.layers.mask=U.layers.mask&-5,F.layers.mask=U.layers.mask&-3;const ht=pe.parent,_t=U.cameras;Oe(U,ht);for(let ot=0;ot<_t.length;ot++)Oe(_t[ot],ht);_t.length===2?He(U,A,F):U.projectionMatrix.copy(A.projectionMatrix),J(pe,U,ht)};function J(pe,Fe,Ie){Ie===null?pe.matrix.copy(Fe.matrixWorld):(pe.matrix.copy(Ie.matrixWorld),pe.matrix.invert(),pe.matrix.multiply(Fe.matrixWorld)),pe.matrix.decompose(pe.position,pe.quaternion,pe.scale),pe.updateMatrixWorld(!0),pe.projectionMatrix.copy(Fe.projectionMatrix),pe.projectionMatrixInverse.copy(Fe.projectionMatrixInverse),pe.isPerspectiveCamera&&(pe.fov=sf*2*Math.atan(1/pe.projectionMatrix.elements[5]),pe.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(pe){l=pe,d!==null&&(d.fixedFoveation=pe),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=pe)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(U)},this.getCameraTexture=function(pe){return p[pe]};let be=null;function gt(pe,Fe){if(u=Fe.getViewerPose(c||o),x=Fe,u!==null){const Ie=u.views;f!==null&&(e.setRenderTargetFramebuffer(M,f.framebuffer),e.setRenderTarget(M));let ht=!1;Ie.length!==U.cameras.length&&(U.cameras.length=0,ht=!0);for(let B=0;B<Ie.length;B++){const ie=Ie[B];let he=null;if(f!==null)he=f.getViewport(ie);else{const _e=h.getViewSubImage(d,ie);he=_e.viewport,B===0&&(e.setRenderTargetTextures(M,_e.colorTexture,_e.depthStencilTexture),e.setRenderTarget(M))}let ce=k[B];ce===void 0&&(ce=new mi,ce.layers.enable(B),ce.viewport=new gn,k[B]=ce),ce.matrix.fromArray(ie.transform.matrix),ce.matrix.decompose(ce.position,ce.quaternion,ce.scale),ce.projectionMatrix.fromArray(ie.projectionMatrix),ce.projectionMatrixInverse.copy(ce.projectionMatrix).invert(),ce.viewport.set(he.x,he.y,he.width,he.height),B===0&&(U.matrix.copy(ce.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),ht===!0&&U.cameras.push(ce)}const _t=s.enabledFeatures;if(_t&&_t.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&S){h=i.getBinding();const B=h.getDepthInformation(Ie[0]);B&&B.isValid&&B.texture&&m.init(B,s.renderState)}if(_t&&_t.includes("camera-access")&&S){e.state.unbindTexture(),h=i.getBinding();for(let B=0;B<Ie.length;B++){const ie=Ie[B].camera;if(ie){let he=p[ie];he||(he=new m_,p[ie]=he);const ce=h.getCameraImage(ie);he.sourceTexture=ce}}}}for(let Ie=0;Ie<P.length;Ie++){const ht=T[Ie],_t=P[Ie];ht!==null&&_t!==void 0&&_t.update(ht,Fe,c||o)}be&&be(pe,Fe),Fe.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Fe}),x=null}const pt=new v_;pt.setAnimationLoop(gt),this.setAnimationLoop=function(pe){be=pe},this.dispose=function(){}}}const YT=new Qt,T_=new Ct;T_.set(-1,0,0,0,1,0,0,0,1);function qT(n,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,g_(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,y,R,M){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),h(m,p)):p.isMeshPhongMaterial?(r(m,p),u(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,M)):p.isMeshMatcapMaterial?(r(m,p),x(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),S(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,y,R):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===vn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===vn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const y=e.get(p),R=y.envMap,M=y.envMapRotation;R&&(m.envMap.value=R,m.envMapRotation.value.setFromMatrix4(YT.makeRotationFromEuler(M)).transpose(),R.isCubeTexture&&R.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(T_),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,y,R){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*y,m.scale.value=R*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,y){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===vn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function x(m,p){p.matcap&&(m.matcap.value=p.matcap)}function S(m,p){const y=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function KT(n,e,t,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,P){const T=P.program;i.uniformBlockBinding(M,T)}function c(M,P){let T=s[M.id];T===void 0&&(m(M),T=u(M),s[M.id]=T,M.addEventListener("dispose",y));const I=P.program;i.updateUBOMapping(M,I);const v=e.render.frame;r[M.id]!==v&&(d(M),r[M.id]=v)}function u(M){const P=h();M.__bindingPointIndex=P;const T=n.createBuffer(),I=M.__size,v=M.usage;return n.bindBuffer(n.UNIFORM_BUFFER,T),n.bufferData(n.UNIFORM_BUFFER,I,v),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,P,T),T}function h(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return Ot("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(M){const P=s[M.id],T=M.uniforms,I=M.__cache;n.bindBuffer(n.UNIFORM_BUFFER,P);for(let v=0,A=T.length;v<A;v++){const F=T[v];if(Array.isArray(F))for(let k=0,U=F.length;k<U;k++)f(F[k],v,k,I);else f(F,v,0,I)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(M,P,T,I){if(S(M,P,T,I)===!0){const v=M.__offset,A=M.value;if(Array.isArray(A)){let F=0;for(let k=0;k<A.length;k++){const U=A[k],ee=p(U);x(U,M.__data,F),typeof U!="number"&&typeof U!="boolean"&&!U.isMatrix3&&!ArrayBuffer.isView(U)&&(F+=ee.storage/Float32Array.BYTES_PER_ELEMENT)}}else x(A,M.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,v,M.__data)}}function x(M,P,T){typeof M=="number"||typeof M=="boolean"?P[0]=M:M.isMatrix3?(P[0]=M.elements[0],P[1]=M.elements[1],P[2]=M.elements[2],P[3]=0,P[4]=M.elements[3],P[5]=M.elements[4],P[6]=M.elements[5],P[7]=0,P[8]=M.elements[6],P[9]=M.elements[7],P[10]=M.elements[8],P[11]=0):ArrayBuffer.isView(M)?P.set(new M.constructor(M.buffer,M.byteOffset,P.length)):M.toArray(P,T)}function S(M,P,T,I){const v=M.value,A=P+"_"+T;if(I[A]===void 0)return typeof v=="number"||typeof v=="boolean"?I[A]=v:ArrayBuffer.isView(v)?I[A]=v.slice():I[A]=v.clone(),!0;{const F=I[A];if(typeof v=="number"||typeof v=="boolean"){if(F!==v)return I[A]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(F.equals(v)===!1)return F.copy(v),!0}}return!1}function m(M){const P=M.uniforms;let T=0;const I=16;for(let A=0,F=P.length;A<F;A++){const k=Array.isArray(P[A])?P[A]:[P[A]];for(let U=0,ee=k.length;U<ee;U++){const le=k[U],$=Array.isArray(le.value)?le.value:[le.value];for(let se=0,Z=$.length;se<Z;se++){const ae=$[se],Te=p(ae),He=T%I,Oe=He%Te.boundary,J=He+Oe;T+=Oe,J!==0&&I-J<Te.storage&&(T+=I-J),le.__data=new Float32Array(Te.storage/Float32Array.BYTES_PER_ELEMENT),le.__offset=T,T+=Te.storage}}}const v=T%I;return v>0&&(T+=I-v),M.__size=T,M.__cache={},this}function p(M){const P={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(P.boundary=4,P.storage=4):M.isVector2?(P.boundary=8,P.storage=8):M.isVector3||M.isColor?(P.boundary=16,P.storage=12):M.isVector4?(P.boundary=16,P.storage=16):M.isMatrix3?(P.boundary=48,P.storage=48):M.isMatrix4?(P.boundary=64,P.storage=64):M.isTexture?bt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(P.boundary=16,P.storage=M.byteLength):bt("WebGLRenderer: Unsupported uniform value type.",M),P}function y(M){const P=M.target;P.removeEventListener("dispose",y);const T=o.indexOf(P.__bindingPointIndex);o.splice(T,1),n.deleteBuffer(s[P.id]),delete s[P.id],delete r[P.id]}function R(){for(const M in s)n.deleteBuffer(s[M]);o=[],s={},r={}}return{bind:l,update:c,dispose:R}}const $T=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Yi=null;function ZT(){return Yi===null&&(Yi=new f_($T,16,16,Br,Ss),Yi.name="DFG_LUT",Yi.minFilter=Cn,Yi.magFilter=Cn,Yi.wrapS=ji,Yi.wrapT=ji,Yi.generateMipmaps=!1,Yi.needsUpdate=!0),Yi}class jT{constructor(e={}){const{canvas:t=c1(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:d=!1,outputBufferType:f=_i}=e;this.isWebGLRenderer=!0;let x;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=i.getContextAttributes().alpha}else x=o;const S=f,m=new Set([Of,Ff,Uf]),p=new Set([_i,ns,Ml,Sl,If,Lf]),y=new Uint32Array(4),R=new Int32Array(4),M=new L;let P=null,T=null;const I=[],v=[];let A=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=es,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const F=this;let k=!1,U=null,ee=null,le=null,$=null;this._outputColorSpace=Ei;let se=0,Z=0,ae=null,Te=-1,He=null;const Oe=new gn,J=new gn;let be=null;const gt=new Ze(0);let pt=0,pe=t.width,Fe=t.height,Ie=1,ht=null,_t=null;const ot=new gn(0,0,pe,Fe),O=new gn(0,0,pe,Fe);let B=!1;const ie=new Hf;let he=!1,ce=!1;const _e=new Qt,Pe=new L,Re=new gn,Ee={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let xe=!1;function Ke(){return ae===null?Ie:1}let N=i;function $e(E,q){return t.getContext(E,q)}try{const E={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Pf}`),t.addEventListener("webglcontextlost",qt,!1),t.addEventListener("webglcontextrestored",Ht,!1),t.addEventListener("webglcontextcreationerror",Qn,!1),N===null){const q="webgl2";if(N=$e(q,E),N===null)throw $e(q)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(E){throw Ot("WebGLRenderer: "+E.message),E}let Xe,C,_,W,j,re,Ce,Ne,ue,fe,Le,Je,Ge,ke,lt,ft,St,Y,Be,ve,ze,qe,Se;function rt(){Xe=new ZE(N),Xe.init(),ze=new zT(N,Xe),C=new HE(N,Xe,e,ze),_=new BT(N,Xe),C.reversedDepthBuffer&&d&&_.buffers.depth.setReversed(!0),ee=N.createFramebuffer(),le=N.createFramebuffer(),$=N.createFramebuffer(),W=new QE(N),j=new ET,re=new GT(N,Xe,_,j,C,ze,W),Ce=new $E(F),Ne=new iS(N),qe=new GE(N,Ne),ue=new jE(N,Ne,W,qe),fe=new t2(N,ue,Ne,qe,W),Y=new e2(N,C,re),lt=new VE(j),Le=new wT(F,Ce,Xe,C,qe,lt),Je=new qT(F,j),Ge=new AT,ke=new LT(Xe),St=new BE(F,Ce,_,fe,x,l),ft=new kT(F,fe,C),Se=new KT(N,W,C,_),Be=new zE(N,Xe,W),ve=new JE(N,Xe,W),W.programs=Le.programs,F.capabilities=C,F.extensions=Xe,F.properties=j,F.renderLists=Ge,F.shadowMap=ft,F.state=_,F.info=W}rt(),S!==_i&&(A=new i2(S,t.width,t.height,a,s,r));const it=new XT(F,N);this.xr=it,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const E=Xe.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=Xe.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return Ie},this.setPixelRatio=function(E){E!==void 0&&(Ie=E,this.setSize(pe,Fe,!1))},this.getSize=function(E){return E.set(pe,Fe)},this.setSize=function(E,q,oe=!0){if(it.isPresenting){bt("WebGLRenderer: Can't change size while VR device is presenting.");return}pe=E,Fe=q,t.width=Math.floor(E*Ie),t.height=Math.floor(q*Ie),oe===!0&&(t.style.width=E+"px",t.style.height=q+"px"),A!==null&&A.setSize(t.width,t.height),this.setViewport(0,0,E,q)},this.getDrawingBufferSize=function(E){return E.set(pe*Ie,Fe*Ie).floor()},this.setDrawingBufferSize=function(E,q,oe){pe=E,Fe=q,Ie=oe,t.width=Math.floor(E*oe),t.height=Math.floor(q*oe),this.setViewport(0,0,E,q)},this.setEffects=function(E){if(S===_i){Ot("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(E){for(let q=0;q<E.length;q++)if(E[q].isOutputPass===!0){bt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(E||[])},this.getCurrentViewport=function(E){return E.copy(Oe)},this.getViewport=function(E){return E.copy(ot)},this.setViewport=function(E,q,oe,ne){E.isVector4?ot.set(E.x,E.y,E.z,E.w):ot.set(E,q,oe,ne),_.viewport(Oe.copy(ot).multiplyScalar(Ie).round())},this.getScissor=function(E){return E.copy(O)},this.setScissor=function(E,q,oe,ne){E.isVector4?O.set(E.x,E.y,E.z,E.w):O.set(E,q,oe,ne),_.scissor(J.copy(O).multiplyScalar(Ie).round())},this.getScissorTest=function(){return B},this.setScissorTest=function(E){_.setScissorTest(B=E)},this.setOpaqueSort=function(E){ht=E},this.setTransparentSort=function(E){_t=E},this.getClearColor=function(E){return E.copy(St.getClearColor())},this.setClearColor=function(){St.setClearColor(...arguments)},this.getClearAlpha=function(){return St.getClearAlpha()},this.setClearAlpha=function(){St.setClearAlpha(...arguments)},this.clear=function(E=!0,q=!0,oe=!0){let ne=0;if(E){let te=!1;if(ae!==null){const We=ae.texture.format;te=m.has(We)}if(te){const We=ae.texture.type,et=p.has(We),Ye=St.getClearColor(),nt=St.getClearAlpha(),st=Ye.r,Mt=Ye.g,wt=Ye.b;et?(y[0]=st,y[1]=Mt,y[2]=wt,y[3]=nt,N.clearBufferuiv(N.COLOR,0,y)):(R[0]=st,R[1]=Mt,R[2]=wt,R[3]=nt,N.clearBufferiv(N.COLOR,0,R))}else ne|=N.COLOR_BUFFER_BIT}q&&(ne|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),oe&&(ne|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ne!==0&&N.clear(ne)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(E){E.setRenderer(this),U=E},this.dispose=function(){t.removeEventListener("webglcontextlost",qt,!1),t.removeEventListener("webglcontextrestored",Ht,!1),t.removeEventListener("webglcontextcreationerror",Qn,!1),St.dispose(),Ge.dispose(),ke.dispose(),j.dispose(),Ce.dispose(),fe.dispose(),qe.dispose(),Se.dispose(),Le.dispose(),it.dispose(),it.removeEventListener("sessionstart",Ts),it.removeEventListener("sessionend",Gi),Yn.stop()};function qt(E){E.preventDefault(),lu("WebGLRenderer: Context Lost."),k=!0}function Ht(){lu("WebGLRenderer: Context Restored."),k=!1;const E=W.autoReset,q=ft.enabled,oe=ft.autoUpdate,ne=ft.needsUpdate,te=ft.type;rt(),W.autoReset=E,ft.enabled=q,ft.autoUpdate=oe,ft.needsUpdate=ne,ft.type=te}function Qn(E){Ot("WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Ln(E){const q=E.target;q.removeEventListener("dispose",Ln),Bi(q)}function Bi(E){rr(E),j.remove(E)}function rr(E){const q=j.get(E).programs;q!==void 0&&(q.forEach(function(oe){Le.releaseProgram(oe)}),E.isShaderMaterial&&Le.releaseShaderCache(E))}this.renderBufferDirect=function(E,q,oe,ne,te,We){q===null&&(q=Ee);const et=te.isMesh&&te.matrixWorld.determinantAffine()<0,Ye=cr(E,q,oe,ne,te);_.setMaterial(ne,et);let nt=oe.index,st=1;if(ne.wireframe===!0){if(nt=ue.getWireframeAttribute(oe),nt===void 0)return;st=2}const Mt=oe.drawRange,wt=oe.attributes.position;let at=Mt.start*st,Bt=(Mt.start+Mt.count)*st;We!==null&&(at=Math.max(at,We.start*st),Bt=Math.min(Bt,(We.start+We.count)*st)),nt!==null?(at=Math.max(at,0),Bt=Math.min(Bt,nt.count)):wt!=null&&(at=Math.max(at,0),Bt=Math.min(Bt,wt.count));const nn=Bt-at;if(nn<0||nn===1/0)return;qe.setup(te,ne,Ye,oe,nt);let rn,Gt=Be;if(nt!==null&&(rn=Ne.get(nt),Gt=ve,Gt.setIndex(rn)),te.isMesh)ne.wireframe===!0?(_.setLineWidth(ne.wireframeLinewidth*Ke()),Gt.setMode(N.LINES)):Gt.setMode(N.TRIANGLES);else if(te.isLine){let _n=ne.linewidth;_n===void 0&&(_n=1),_.setLineWidth(_n*Ke()),te.isLineSegments?Gt.setMode(N.LINES):te.isLineLoop?Gt.setMode(N.LINE_LOOP):Gt.setMode(N.LINE_STRIP)}else te.isPoints?Gt.setMode(N.POINTS):te.isSprite&&Gt.setMode(N.TRIANGLES);if(te.isBatchedMesh)if(Xe.get("WEBGL_multi_draw"))Gt.renderMultiDraw(te._multiDrawStarts,te._multiDrawCounts,te._multiDrawCount);else{const _n=te._multiDrawStarts,Qe=te._multiDrawCounts,zn=te._multiDrawCount,Dt=nt?Ne.get(nt).bytesPerElement:1,Nn=j.get(ne).currentProgram.getUniforms();for(let Un=0;Un<zn;Un++)Nn.setValue(N,"_gl_DrawID",Un),Gt.render(_n[Un]/Dt,Qe[Un])}else if(te.isInstancedMesh)Gt.renderInstances(at,nn,te.count);else if(oe.isInstancedBufferGeometry){const _n=oe._maxInstanceCount!==void 0?oe._maxInstanceCount:1/0,Qe=Math.min(oe.instanceCount,_n);Gt.renderInstances(at,nn,Qe)}else Gt.render(at,nn)};function or(E,q,oe){E.transparent===!0&&E.side===Nt&&E.forceSinglePass===!1?(E.side=vn,E.needsUpdate=!0,oi(E,q,oe),E.side=Qs,E.needsUpdate=!0,oi(E,q,oe),E.side=Nt):oi(E,q,oe)}this.compile=function(E,q,oe=null){oe===null&&(oe=E),T=ke.get(oe),T.init(q),v.push(T),oe.traverseVisible(function(te){te.isLight&&te.layers.test(q.layers)&&(T.pushLight(te),te.castShadow&&T.pushShadow(te))}),E!==oe&&E.traverseVisible(function(te){te.isLight&&te.layers.test(q.layers)&&(T.pushLight(te),te.castShadow&&T.pushShadow(te))}),T.setupLights();const ne=new Set;return E.traverse(function(te){if(!(te.isMesh||te.isPoints||te.isLine||te.isSprite))return;const We=te.material;if(We)if(Array.isArray(We))for(let et=0;et<We.length;et++){const Ye=We[et];or(Ye,oe,te),ne.add(Ye)}else or(We,oe,te),ne.add(We)}),T=v.pop(),ne},this.compileAsync=function(E,q,oe=null){const ne=this.compile(E,q,oe);return new Promise(te=>{function We(){if(ne.forEach(function(et){j.get(et).currentProgram.isReady()&&ne.delete(et)}),ne.size===0){te(E);return}setTimeout(We,10)}Xe.get("KHR_parallel_shader_compile")!==null?We():setTimeout(We,10)})};let Ci=null;function Ri(E){Ci&&Ci(E)}function Ts(){Yn.stop()}function Gi(){Yn.start()}const Yn=new v_;Yn.setAnimationLoop(Ri),typeof self<"u"&&Yn.setContext(self),this.setAnimationLoop=function(E){Ci=E,it.setAnimationLoop(E),E===null?Yn.stop():Yn.start()},it.addEventListener("sessionstart",Ts),it.addEventListener("sessionend",Gi),this.render=function(E,q){if(q!==void 0&&q.isCamera!==!0){Ot("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(k===!0)return;U!==null&&U.renderStart(E,q);const oe=it.enabled===!0&&it.isPresenting===!0,ne=A!==null&&(ae===null||oe)&&A.begin(F,ae);if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),q.parent===null&&q.matrixWorldAutoUpdate===!0&&q.updateMatrixWorld(),it.enabled===!0&&it.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(it.cameraAutoUpdate===!0&&it.updateCamera(q),q=it.getCamera()),E.isScene===!0&&E.onBeforeRender(F,E,q,ae),T=ke.get(E,v.length),T.init(q),T.state.textureUnits=re.getTextureUnits(),v.push(T),_e.multiplyMatrices(q.projectionMatrix,q.matrixWorldInverse),ie.setFromProjectionMatrix(_e,Ji,q.reversedDepth),ce=this.localClippingEnabled,he=lt.init(this.clippingPlanes,ce),P=Ge.get(E,I.length),P.init(),I.push(P),it.enabled===!0&&it.isPresenting===!0){const et=F.xr.getDepthSensingMesh();et!==null&&ss(et,q,-1/0,F.sortObjects)}ss(E,q,0,F.sortObjects),P.finish(),F.sortObjects===!0&&P.sort(ht,_t,q.reversedDepth),xe=it.enabled===!1||it.isPresenting===!1||it.hasDepthSensing()===!1,xe&&St.addToRenderList(P,E),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),he===!0&&lt.beginShadows();const te=T.state.shadowsArray;if(ft.render(te,E,q),he===!0&&lt.endShadows(),(ne&&A.hasRenderPass())===!1){const et=P.opaque,Ye=P.transmissive;if(T.setupLights(),q.isArrayCamera){const nt=q.cameras;if(Ye.length>0)for(let st=0,Mt=nt.length;st<Mt;st++){const wt=nt[st];zi(et,Ye,E,wt)}xe&&St.render(E);for(let st=0,Mt=nt.length;st<Mt;st++){const wt=nt[st];ar(P,E,wt,wt.viewport)}}else Ye.length>0&&zi(et,Ye,E,q),xe&&St.render(E),ar(P,E,q)}ae!==null&&Z===0&&(re.updateMultisampleRenderTarget(ae),re.updateRenderTargetMipmap(ae)),ne&&A.end(F),E.isScene===!0&&E.onAfterRender(F,E,q),qe.resetDefaultState(),Te=-1,He=null,v.pop(),v.length>0?(T=v[v.length-1],re.setTextureUnits(T.state.textureUnits),he===!0&&lt.setGlobalState(F.clippingPlanes,T.state.camera)):T=null,I.pop(),I.length>0?P=I[I.length-1]:P=null,U!==null&&U.renderEnd()};function ss(E,q,oe,ne){if(E.visible===!1)return;if(E.layers.test(q.layers)){if(E.isGroup)oe=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(q);else if(E.isLightProbeGrid)T.pushLightProbeGrid(E);else if(E.isLight)T.pushLight(E),E.castShadow&&T.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||ie.intersectsSprite(E)){ne&&Re.setFromMatrixPosition(E.matrixWorld).applyMatrix4(_e);const et=fe.update(E),Ye=E.material;Ye.visible&&P.push(E,et,Ye,oe,Re.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||ie.intersectsObject(E))){const et=fe.update(E),Ye=E.material;if(ne&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Re.copy(E.boundingSphere.center)):(et.boundingSphere===null&&et.computeBoundingSphere(),Re.copy(et.boundingSphere.center)),Re.applyMatrix4(E.matrixWorld).applyMatrix4(_e)),Array.isArray(Ye)){const nt=et.groups;for(let st=0,Mt=nt.length;st<Mt;st++){const wt=nt[st],at=Ye[wt.materialIndex];at&&at.visible&&P.push(E,et,at,oe,Re.z,wt)}}else Ye.visible&&P.push(E,et,Ye,oe,Re.z,null)}}const We=E.children;for(let et=0,Ye=We.length;et<Ye;et++)ss(We[et],q,oe,ne)}function ar(E,q,oe,ne){const{opaque:te,transmissive:We,transparent:et}=E;T.setupLightsView(oe),he===!0&&lt.setGlobalState(F.clippingPlanes,oe),ne&&_.viewport(Oe.copy(ne)),te.length>0&&Hi(te,q,oe),We.length>0&&Hi(We,q,oe),et.length>0&&Hi(et,q,oe),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function zi(E,q,oe,ne){if((oe.isScene===!0?oe.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[ne.id]===void 0){const at=Xe.has("EXT_color_buffer_half_float")||Xe.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[ne.id]=new ts(1,1,{generateMipmaps:!0,type:at?Ss:_i,minFilter:Lr,samples:Math.max(4,C.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:kt.workingColorSpace})}const We=T.state.transmissionRenderTarget[ne.id],et=ne.viewport||Oe;We.setSize(et.z*F.transmissionResolutionScale,et.w*F.transmissionResolutionScale);const Ye=F.getRenderTarget(),nt=F.getActiveCubeFace(),st=F.getActiveMipmapLevel();F.setRenderTarget(We),F.getClearColor(gt),pt=F.getClearAlpha(),pt<1&&F.setClearColor(16777215,.5),F.clear(),xe&&St.render(oe);const Mt=F.toneMapping;F.toneMapping=es;const wt=ne.viewport;if(ne.viewport!==void 0&&(ne.viewport=void 0),T.setupLightsView(ne),he===!0&&lt.setGlobalState(F.clippingPlanes,ne),Hi(E,oe,ne),re.updateMultisampleRenderTarget(We),re.updateRenderTargetMipmap(We),Xe.has("WEBGL_multisampled_render_to_texture")===!1){let at=!1;for(let Bt=0,nn=q.length;Bt<nn;Bt++){const rn=q[Bt],{object:Gt,geometry:_n,material:Qe,group:zn}=rn;if(Qe.side===Nt&&Gt.layers.test(ne.layers)){const Dt=Qe.side;Qe.side=vn,Qe.needsUpdate=!0,As(Gt,oe,ne,_n,Qe,zn),Qe.side=Dt,Qe.needsUpdate=!0,at=!0}}at===!0&&(re.updateMultisampleRenderTarget(We),re.updateRenderTargetMipmap(We))}F.setRenderTarget(Ye,nt,st),F.setClearColor(gt,pt),wt!==void 0&&(ne.viewport=wt),F.toneMapping=Mt}function Hi(E,q,oe){const ne=q.isScene===!0?q.overrideMaterial:null;for(let te=0,We=E.length;te<We;te++){const et=E[te],{object:Ye,geometry:nt,group:st}=et;let Mt=et.material;Mt.allowOverride===!0&&ne!==null&&(Mt=ne),Ye.layers.test(oe.layers)&&As(Ye,q,oe,nt,Mt,st)}}function As(E,q,oe,ne,te,We){E.onBeforeRender(F,q,oe,ne,te,We),E.modelViewMatrix.multiplyMatrices(oe.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),te.onBeforeRender(F,q,oe,ne,E,We),te.transparent===!0&&te.side===Nt&&te.forceSinglePass===!1?(te.side=vn,te.needsUpdate=!0,F.renderBufferDirect(oe,q,ne,te,E,We),te.side=Qs,te.needsUpdate=!0,F.renderBufferDirect(oe,q,ne,te,E,We),te.side=Nt):F.renderBufferDirect(oe,q,ne,te,E,We),E.onAfterRender(F,q,oe,ne,te,We)}function oi(E,q,oe){q.isScene!==!0&&(q=Ee);const ne=j.get(E),te=T.state.lights,We=T.state.shadowsArray,et=te.state.version,Ye=Le.getParameters(E,te.state,We,q,oe,T.state.lightProbeGridArray),nt=Le.getProgramCacheKey(Ye);let st=ne.programs;ne.environment=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?q.environment:null,ne.fog=q.fog;const Mt=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap;ne.envMap=Ce.get(E.envMap||ne.environment,Mt),ne.envMapRotation=ne.environment!==null&&E.envMap===null?q.environmentRotation:E.envMapRotation,st===void 0&&(E.addEventListener("dispose",Ln),st=new Map,ne.programs=st);let wt=st.get(nt);if(wt!==void 0){if(ne.currentProgram===wt&&ne.lightsStateVersion===et)return lr(E,Ye),wt}else Ye.uniforms=Le.getUniforms(E),U!==null&&E.isNodeMaterial&&U.build(E,oe,Ye),E.onBeforeCompile(Ye,F),wt=Le.acquireProgram(Ye,nt),st.set(nt,wt),ne.uniforms=Ye.uniforms;const at=ne.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(at.clippingPlanes=lt.uniform),lr(E,Ye),ne.needsLights=Xr(E),ne.lightsStateVersion=et,ne.needsLights&&(at.ambientLightColor.value=te.state.ambient,at.lightProbe.value=te.state.probe,at.directionalLights.value=te.state.directional,at.directionalLightShadows.value=te.state.directionalShadow,at.spotLights.value=te.state.spot,at.spotLightShadows.value=te.state.spotShadow,at.rectAreaLights.value=te.state.rectArea,at.ltc_1.value=te.state.rectAreaLTC1,at.ltc_2.value=te.state.rectAreaLTC2,at.pointLights.value=te.state.point,at.pointLightShadows.value=te.state.pointShadow,at.hemisphereLights.value=te.state.hemi,at.directionalShadowMatrix.value=te.state.directionalShadowMatrix,at.spotLightMatrix.value=te.state.spotLightMatrix,at.spotLightMap.value=te.state.spotLightMap,at.pointShadowMatrix.value=te.state.pointShadowMatrix),ne.lightProbeGrid=T.state.lightProbeGridArray.length>0,ne.currentProgram=wt,ne.uniformsList=null,wt}function bi(E){if(E.uniformsList===null){const q=E.currentProgram.getUniforms();E.uniformsList=Yc.seqWithValue(q.seq,E.uniforms)}return E.uniformsList}function lr(E,q){const oe=j.get(E);oe.outputColorSpace=q.outputColorSpace,oe.batching=q.batching,oe.batchingColor=q.batchingColor,oe.instancing=q.instancing,oe.instancingColor=q.instancingColor,oe.instancingMorph=q.instancingMorph,oe.skinning=q.skinning,oe.morphTargets=q.morphTargets,oe.morphNormals=q.morphNormals,oe.morphColors=q.morphColors,oe.morphTargetsCount=q.morphTargetsCount,oe.numClippingPlanes=q.numClippingPlanes,oe.numIntersection=q.numClipIntersection,oe.vertexAlphas=q.vertexAlphas,oe.vertexTangents=q.vertexTangents,oe.toneMapping=q.toneMapping}function Wr(E,q){if(E.length===0)return null;if(E.length===1)return E[0].texture!==null?E[0]:null;M.setFromMatrixPosition(q.matrixWorld);for(let oe=0,ne=E.length;oe<ne;oe++){const te=E[oe];if(te.texture!==null&&te.boundingBox.containsPoint(M))return te}return null}function cr(E,q,oe,ne,te){q.isScene!==!0&&(q=Ee),re.resetTextureUnits();const We=q.fog,et=ne.isMeshStandardMaterial||ne.isMeshLambertMaterial||ne.isMeshPhongMaterial?q.environment:null,Ye=ae===null?F.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:kt.workingColorSpace,nt=ne.isMeshStandardMaterial||ne.isMeshLambertMaterial&&!ne.envMap||ne.isMeshPhongMaterial&&!ne.envMap,st=Ce.get(ne.envMap||et,nt),Mt=ne.vertexColors===!0&&!!oe.attributes.color&&oe.attributes.color.itemSize===4,wt=!!oe.attributes.tangent&&(!!ne.normalMap||ne.anisotropy>0),at=!!oe.morphAttributes.position,Bt=!!oe.morphAttributes.normal,nn=!!oe.morphAttributes.color;let rn=es;ne.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(rn=F.toneMapping);const Gt=oe.morphAttributes.position||oe.morphAttributes.normal||oe.morphAttributes.color,_n=Gt!==void 0?Gt.length:0,Qe=j.get(ne),zn=T.state.lights;if(he===!0&&(ce===!0||E!==He)){const Wt=E===He&&ne.id===Te;lt.setState(ne,E,Wt)}let Dt=!1;ne.version===Qe.__version?(Qe.needsLights&&Qe.lightsStateVersion!==zn.state.version||Qe.outputColorSpace!==Ye||te.isBatchedMesh&&Qe.batching===!1||!te.isBatchedMesh&&Qe.batching===!0||te.isBatchedMesh&&Qe.batchingColor===!0&&te.colorTexture===null||te.isBatchedMesh&&Qe.batchingColor===!1&&te.colorTexture!==null||te.isInstancedMesh&&Qe.instancing===!1||!te.isInstancedMesh&&Qe.instancing===!0||te.isSkinnedMesh&&Qe.skinning===!1||!te.isSkinnedMesh&&Qe.skinning===!0||te.isInstancedMesh&&Qe.instancingColor===!0&&te.instanceColor===null||te.isInstancedMesh&&Qe.instancingColor===!1&&te.instanceColor!==null||te.isInstancedMesh&&Qe.instancingMorph===!0&&te.morphTexture===null||te.isInstancedMesh&&Qe.instancingMorph===!1&&te.morphTexture!==null||Qe.envMap!==st||ne.fog===!0&&Qe.fog!==We||Qe.numClippingPlanes!==void 0&&(Qe.numClippingPlanes!==lt.numPlanes||Qe.numIntersection!==lt.numIntersection)||Qe.vertexAlphas!==Mt||Qe.vertexTangents!==wt||Qe.morphTargets!==at||Qe.morphNormals!==Bt||Qe.morphColors!==nn||Qe.toneMapping!==rn||Qe.morphTargetsCount!==_n||!!Qe.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(Dt=!0):(Dt=!0,Qe.__version=ne.version);let Nn=Qe.currentProgram;Dt===!0&&(Nn=oi(ne,q,te),U&&ne.isNodeMaterial&&U.onUpdateProgram(ne,Nn,Qe));let Un=!1,Hn=!1,yi=!1;const Vt=Nn.getUniforms(),Zt=Qe.uniforms;if(_.useProgram(Nn.program)&&(Un=!0,Hn=!0,yi=!0),ne.id!==Te&&(Te=ne.id,Hn=!0),Qe.needsLights){const Wt=Wr(T.state.lightProbeGridArray,te);Qe.lightProbeGrid!==Wt&&(Qe.lightProbeGrid=Wt,Hn=!0)}if(Un||He!==E){_.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),Vt.setValue(N,"projectionMatrix",E.projectionMatrix),Vt.setValue(N,"viewMatrix",E.matrixWorldInverse);const ui=Vt.map.cameraPosition;ui!==void 0&&ui.setValue(N,Pe.setFromMatrixPosition(E.matrixWorld)),C.logarithmicDepthBuffer&&Vt.setValue(N,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(ne.isMeshPhongMaterial||ne.isMeshToonMaterial||ne.isMeshLambertMaterial||ne.isMeshBasicMaterial||ne.isMeshStandardMaterial||ne.isShaderMaterial)&&Vt.setValue(N,"isOrthographic",E.isOrthographicCamera===!0),He!==E&&(He=E,Hn=!0,yi=!0)}if(Qe.needsLights&&(zn.state.directionalShadowMap.length>0&&Vt.setValue(N,"directionalShadowMap",zn.state.directionalShadowMap,re),zn.state.spotShadowMap.length>0&&Vt.setValue(N,"spotShadowMap",zn.state.spotShadowMap,re),zn.state.pointShadowMap.length>0&&Vt.setValue(N,"pointShadowMap",zn.state.pointShadowMap,re)),te.isSkinnedMesh){Vt.setOptional(N,te,"bindMatrix"),Vt.setOptional(N,te,"bindMatrixInverse");const Wt=te.skeleton;Wt&&(Wt.boneTexture===null&&Wt.computeBoneTexture(),Vt.setValue(N,"boneTexture",Wt.boneTexture,re))}te.isBatchedMesh&&(Vt.setOptional(N,te,"batchingTexture"),Vt.setValue(N,"batchingTexture",te._matricesTexture,re),Vt.setOptional(N,te,"batchingIdTexture"),Vt.setValue(N,"batchingIdTexture",te._indirectTexture,re),Vt.setOptional(N,te,"batchingColorTexture"),te._colorsTexture!==null&&Vt.setValue(N,"batchingColorTexture",te._colorsTexture,re));const ei=oe.morphAttributes;if((ei.position!==void 0||ei.normal!==void 0||ei.color!==void 0)&&Y.update(te,oe,Nn),(Hn||Qe.receiveShadow!==te.receiveShadow)&&(Qe.receiveShadow=te.receiveShadow,Vt.setValue(N,"receiveShadow",te.receiveShadow)),(ne.isMeshStandardMaterial||ne.isMeshLambertMaterial||ne.isMeshPhongMaterial)&&ne.envMap===null&&q.environment!==null&&(Zt.envMapIntensity.value=q.environmentIntensity),Zt.dfgLUT!==void 0&&(Zt.dfgLUT.value=ZT()),Hn){if(Vt.setValue(N,"toneMappingExposure",F.toneMappingExposure),Qe.needsLights&&ur(Zt,yi),We&&ne.fog===!0&&Je.refreshFogUniforms(Zt,We),Je.refreshMaterialUniforms(Zt,ne,Ie,Fe,T.state.transmissionRenderTarget[E.id]),Qe.needsLights&&Qe.lightProbeGrid){const Wt=Qe.lightProbeGrid;Zt.probesSH.value=Wt.texture,Zt.probesMin.value.copy(Wt.boundingBox.min),Zt.probesMax.value.copy(Wt.boundingBox.max),Zt.probesResolution.value.copy(Wt.resolution)}Yc.upload(N,bi(Qe),Zt,re)}if(ne.isShaderMaterial&&ne.uniformsNeedUpdate===!0&&(Yc.upload(N,bi(Qe),Zt,re),ne.uniformsNeedUpdate=!1),ne.isSpriteMaterial&&Vt.setValue(N,"center",te.center),Vt.setValue(N,"modelViewMatrix",te.modelViewMatrix),Vt.setValue(N,"normalMatrix",te.normalMatrix),Vt.setValue(N,"modelMatrix",te.matrixWorld),ne.uniformsGroups!==void 0){const Wt=ne.uniformsGroups;for(let ui=0,Vi=Wt.length;ui<Vi;ui++){const Cs=Wt[ui];Se.update(Cs,Nn),Se.bind(Cs,Nn)}}return Nn}function ur(E,q){E.ambientLightColor.needsUpdate=q,E.lightProbe.needsUpdate=q,E.directionalLights.needsUpdate=q,E.directionalLightShadows.needsUpdate=q,E.pointLights.needsUpdate=q,E.pointLightShadows.needsUpdate=q,E.spotLights.needsUpdate=q,E.spotLightShadows.needsUpdate=q,E.rectAreaLights.needsUpdate=q,E.hemisphereLights.needsUpdate=q}function Xr(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return se},this.getActiveMipmapLevel=function(){return Z},this.getRenderTarget=function(){return ae},this.setRenderTargetTextures=function(E,q,oe){const ne=j.get(E);ne.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,ne.__autoAllocateDepthBuffer===!1&&(ne.__useRenderToTexture=!1),j.get(E.texture).__webglTexture=q,j.get(E.depthTexture).__webglTexture=ne.__autoAllocateDepthBuffer?void 0:oe,ne.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,q){const oe=j.get(E);oe.__webglFramebuffer=q,oe.__useDefaultFramebuffer=q===void 0},this.setRenderTarget=function(E,q=0,oe=0){ae=E,se=q,Z=oe;let ne=null,te=!1,We=!1;if(E){const Ye=j.get(E);if(Ye.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(N.FRAMEBUFFER,Ye.__webglFramebuffer),Oe.copy(E.viewport),J.copy(E.scissor),be=E.scissorTest,_.viewport(Oe),_.scissor(J),_.setScissorTest(be),Te=-1;return}else if(Ye.__webglFramebuffer===void 0)re.setupRenderTarget(E);else if(Ye.__hasExternalTextures)re.rebindTextures(E,j.get(E.texture).__webglTexture,j.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const Mt=E.depthTexture;if(Ye.__boundDepthTexture!==Mt){if(Mt!==null&&j.has(Mt)&&(E.width!==Mt.image.width||E.height!==Mt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");re.setupDepthRenderbuffer(E)}}const nt=E.texture;(nt.isData3DTexture||nt.isDataArrayTexture||nt.isCompressedArrayTexture)&&(We=!0);const st=j.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(st[q])?ne=st[q][oe]:ne=st[q],te=!0):E.samples>0&&re.useMultisampledRTT(E)===!1?ne=j.get(E).__webglMultisampledFramebuffer:Array.isArray(st)?ne=st[oe]:ne=st,Oe.copy(E.viewport),J.copy(E.scissor),be=E.scissorTest}else Oe.copy(ot).multiplyScalar(Ie).floor(),J.copy(O).multiplyScalar(Ie).floor(),be=B;if(oe!==0&&(ne=ee),_.bindFramebuffer(N.FRAMEBUFFER,ne)&&_.drawBuffers(E,ne),_.viewport(Oe),_.scissor(J),_.setScissorTest(be),te){const Ye=j.get(E.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+q,Ye.__webglTexture,oe)}else if(We){const Ye=q;for(let nt=0;nt<E.textures.length;nt++){const st=j.get(E.textures[nt]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+nt,st.__webglTexture,oe,Ye)}}else if(E!==null&&oe!==0){const Ye=j.get(E.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Ye.__webglTexture,oe)}Te=-1},this.readRenderTargetPixels=function(E,q,oe,ne,te,We,et,Ye=0){if(!(E&&E.isWebGLRenderTarget)){Ot("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let nt=j.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&et!==void 0&&(nt=nt[et]),nt){_.bindFramebuffer(N.FRAMEBUFFER,nt);try{const st=E.textures[Ye],Mt=st.format,wt=st.type;if(E.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+Ye),!C.textureFormatReadable(Mt)){Ot("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!C.textureTypeReadable(wt)){Ot("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}q>=0&&q<=E.width-ne&&oe>=0&&oe<=E.height-te&&N.readPixels(q,oe,ne,te,ze.convert(Mt),ze.convert(wt),We)}finally{const st=ae!==null?j.get(ae).__webglFramebuffer:null;_.bindFramebuffer(N.FRAMEBUFFER,st)}}},this.readRenderTargetPixelsAsync=async function(E,q,oe,ne,te,We,et,Ye=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let nt=j.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&et!==void 0&&(nt=nt[et]),nt)if(q>=0&&q<=E.width-ne&&oe>=0&&oe<=E.height-te){_.bindFramebuffer(N.FRAMEBUFFER,nt);const st=E.textures[Ye],Mt=st.format,wt=st.type;if(E.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+Ye),!C.textureFormatReadable(Mt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!C.textureTypeReadable(wt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const at=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,at),N.bufferData(N.PIXEL_PACK_BUFFER,We.byteLength,N.STREAM_READ),N.readPixels(q,oe,ne,te,ze.convert(Mt),ze.convert(wt),0);const Bt=ae!==null?j.get(ae).__webglFramebuffer:null;_.bindFramebuffer(N.FRAMEBUFFER,Bt);const nn=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await u1(N,nn,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,at),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,We),N.deleteBuffer(at),N.deleteSync(nn),We}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,q=null,oe=0){const ne=Math.pow(2,-oe),te=Math.floor(E.image.width*ne),We=Math.floor(E.image.height*ne),et=q!==null?q.x:0,Ye=q!==null?q.y:0;re.setTexture2D(E,0),N.copyTexSubImage2D(N.TEXTURE_2D,oe,0,0,et,Ye,te,We),_.unbindTexture()},this.copyTextureToTexture=function(E,q,oe=null,ne=null,te=0,We=0){let et,Ye,nt,st,Mt,wt,at,Bt,nn;const rn=E.isCompressedTexture?E.mipmaps[We]:E.image;if(oe!==null)et=oe.max.x-oe.min.x,Ye=oe.max.y-oe.min.y,nt=oe.isBox3?oe.max.z-oe.min.z:1,st=oe.min.x,Mt=oe.min.y,wt=oe.isBox3?oe.min.z:0;else{const Zt=Math.pow(2,-te);et=Math.floor(rn.width*Zt),Ye=Math.floor(rn.height*Zt),E.isDataArrayTexture?nt=rn.depth:E.isData3DTexture?nt=Math.floor(rn.depth*Zt):nt=1,st=0,Mt=0,wt=0}ne!==null?(at=ne.x,Bt=ne.y,nn=ne.z):(at=0,Bt=0,nn=0);const Gt=ze.convert(q.format),_n=ze.convert(q.type);let Qe;q.isData3DTexture?(re.setTexture3D(q,0),Qe=N.TEXTURE_3D):q.isDataArrayTexture||q.isCompressedArrayTexture?(re.setTexture2DArray(q,0),Qe=N.TEXTURE_2D_ARRAY):(re.setTexture2D(q,0),Qe=N.TEXTURE_2D),_.activeTexture(N.TEXTURE0),_.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,q.flipY),_.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,q.premultiplyAlpha),_.pixelStorei(N.UNPACK_ALIGNMENT,q.unpackAlignment);const zn=_.getParameter(N.UNPACK_ROW_LENGTH),Dt=_.getParameter(N.UNPACK_IMAGE_HEIGHT),Nn=_.getParameter(N.UNPACK_SKIP_PIXELS),Un=_.getParameter(N.UNPACK_SKIP_ROWS),Hn=_.getParameter(N.UNPACK_SKIP_IMAGES);_.pixelStorei(N.UNPACK_ROW_LENGTH,rn.width),_.pixelStorei(N.UNPACK_IMAGE_HEIGHT,rn.height),_.pixelStorei(N.UNPACK_SKIP_PIXELS,st),_.pixelStorei(N.UNPACK_SKIP_ROWS,Mt),_.pixelStorei(N.UNPACK_SKIP_IMAGES,wt);const yi=E.isDataArrayTexture||E.isData3DTexture,Vt=q.isDataArrayTexture||q.isData3DTexture;if(E.isDepthTexture){const Zt=j.get(E),ei=j.get(q),Wt=j.get(Zt.__renderTarget),ui=j.get(ei.__renderTarget);_.bindFramebuffer(N.READ_FRAMEBUFFER,Wt.__webglFramebuffer),_.bindFramebuffer(N.DRAW_FRAMEBUFFER,ui.__webglFramebuffer);for(let Vi=0;Vi<nt;Vi++)yi&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,j.get(E).__webglTexture,te,wt+Vi),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,j.get(q).__webglTexture,We,nn+Vi)),N.blitFramebuffer(st,Mt,et,Ye,at,Bt,et,Ye,N.DEPTH_BUFFER_BIT,N.NEAREST);_.bindFramebuffer(N.READ_FRAMEBUFFER,null),_.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(te!==0||E.isRenderTargetTexture||j.has(E)){const Zt=j.get(E),ei=j.get(q);_.bindFramebuffer(N.READ_FRAMEBUFFER,le),_.bindFramebuffer(N.DRAW_FRAMEBUFFER,$);for(let Wt=0;Wt<nt;Wt++)yi?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Zt.__webglTexture,te,wt+Wt):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Zt.__webglTexture,te),Vt?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,ei.__webglTexture,We,nn+Wt):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,ei.__webglTexture,We),te!==0?N.blitFramebuffer(st,Mt,et,Ye,at,Bt,et,Ye,N.COLOR_BUFFER_BIT,N.NEAREST):Vt?N.copyTexSubImage3D(Qe,We,at,Bt,nn+Wt,st,Mt,et,Ye):N.copyTexSubImage2D(Qe,We,at,Bt,st,Mt,et,Ye);_.bindFramebuffer(N.READ_FRAMEBUFFER,null),_.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else Vt?E.isDataTexture||E.isData3DTexture?N.texSubImage3D(Qe,We,at,Bt,nn,et,Ye,nt,Gt,_n,rn.data):q.isCompressedArrayTexture?N.compressedTexSubImage3D(Qe,We,at,Bt,nn,et,Ye,nt,Gt,rn.data):N.texSubImage3D(Qe,We,at,Bt,nn,et,Ye,nt,Gt,_n,rn):E.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,We,at,Bt,et,Ye,Gt,_n,rn.data):E.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,We,at,Bt,rn.width,rn.height,Gt,rn.data):N.texSubImage2D(N.TEXTURE_2D,We,at,Bt,et,Ye,Gt,_n,rn);_.pixelStorei(N.UNPACK_ROW_LENGTH,zn),_.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Dt),_.pixelStorei(N.UNPACK_SKIP_PIXELS,Nn),_.pixelStorei(N.UNPACK_SKIP_ROWS,Un),_.pixelStorei(N.UNPACK_SKIP_IMAGES,Hn),We===0&&q.generateMipmaps&&N.generateMipmap(Qe),_.unbindTexture()},this.initRenderTarget=function(E){j.get(E).__webglFramebuffer===void 0&&re.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?re.setTextureCube(E,0):E.isData3DTexture?re.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?re.setTexture2DArray(E,0):re.setTexture2D(E,0),_.unbindTexture()},this.resetState=function(){se=0,Z=0,ae=null,_.reset(),qe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ji}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=kt._getDrawingBufferColorSpace(e),t.unpackColorSpace=kt._getUnpackColorSpace()}}const y0={type:"change"},qf={type:"start"},A_={type:"end"},Pc=new Al,M0=new Ws,JT=Math.cos(70*f1.DEG2RAD),Rn=new L,li=2*Math.PI,tn={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Zd=1e-6;class QT extends tS{constructor(e,t=null){super(e,t),this.state=tn.NONE,this.target=new L,this.cursor=new L,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Vo.ROTATE,MIDDLE:Vo.DOLLY,RIGHT:Vo.PAN},this.touches={ONE:Oo.ROTATE,TWO:Oo.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new L,this._lastQuaternion=new er,this._lastTargetPosition=new L,this._quat=new er().setFromUnitVectors(e.up,new L(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new $m,this._sphericalDelta=new $m,this._scale=1,this._panOffset=new L,this._rotateStart=new dt,this._rotateEnd=new dt,this._rotateDelta=new dt,this._panStart=new dt,this._panEnd=new dt,this._panDelta=new dt,this._dollyStart=new dt,this._dollyEnd=new dt,this._dollyDelta=new dt,this._dollyDirection=new L,this._mouse=new dt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=tA.bind(this),this._onPointerDown=eA.bind(this),this._onPointerUp=nA.bind(this),this._onContextMenu=cA.bind(this),this._onMouseWheel=rA.bind(this),this._onKeyDown=oA.bind(this),this._onTouchStart=aA.bind(this),this._onTouchMove=lA.bind(this),this._onMouseDown=iA.bind(this),this._onMouseMove=sA.bind(this),this._interceptControlDown=uA.bind(this),this._interceptControlUp=dA.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(y0),this.update(),this.state=tn.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const t=this.object.position;Rn.copy(t).sub(this.target),Rn.applyQuaternion(this._quat),this._spherical.setFromVector3(Rn),this.autoRotate&&this.state===tn.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=li:i>Math.PI&&(i-=li),s<-Math.PI?s+=li:s>Math.PI&&(s-=li),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Rn.setFromSpherical(this._spherical),Rn.applyQuaternion(this._quatInverse),t.copy(this.target).add(Rn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Rn.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const a=new L(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new L(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Rn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Pc.origin.copy(this.object.position),Pc.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Pc.direction))<JT?this.object.lookAt(this.target):(M0.setFromNormalAndCoplanarPoint(this.object.up,this.target),Pc.intersectPlane(M0,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Zd||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Zd||this._lastTargetPosition.distanceToSquared(this.target)>Zd?(this.dispatchEvent(y0),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?li/60*this.autoRotateSpeed*e:li/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Rn.setFromMatrixColumn(t,0),Rn.multiplyScalar(-e),this._panOffset.add(Rn)}_panUp(e,t){this.screenSpacePanning===!0?Rn.setFromMatrixColumn(t,1):(Rn.setFromMatrixColumn(t,0),Rn.crossVectors(this.object.up,Rn)),Rn.multiplyScalar(e),this._panOffset.add(Rn)}_pan(e,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Rn.copy(s).sub(this.target);let r=Rn.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/i.clientHeight,this.object.matrix),this._panUp(2*t*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=e-i.left,r=t-i.top,o=i.width,a=i.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(li*this._rotateDelta.x/t.clientHeight),this._rotateUp(li*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(li*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-li*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(li*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-li*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(i,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),r=.5*(e.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(li*this._rotateDelta.x/t.clientHeight),this._rotateUp(li*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new dt,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function eA(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function tA(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function nA(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(A_),this.state=tn.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function iA(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Vo.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=tn.DOLLY;break;case Vo.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=tn.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=tn.ROTATE}break;case Vo.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=tn.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=tn.PAN}break;default:this.state=tn.NONE}this.state!==tn.NONE&&this.dispatchEvent(qf)}function sA(n){switch(this.state){case tn.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case tn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case tn.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function rA(n){this.enabled===!1||this.enableZoom===!1||this.state!==tn.NONE||(n.preventDefault(),this.dispatchEvent(qf),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(A_))}function oA(n){this.enabled!==!1&&this._handleKeyDown(n)}function aA(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case Oo.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=tn.TOUCH_ROTATE;break;case Oo.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=tn.TOUCH_PAN;break;default:this.state=tn.NONE}break;case 2:switch(this.touches.TWO){case Oo.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=tn.TOUCH_DOLLY_PAN;break;case Oo.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=tn.TOUCH_DOLLY_ROTATE;break;default:this.state=tn.NONE}break;default:this.state=tn.NONE}this.state!==tn.NONE&&this.dispatchEvent(qf)}function lA(n){switch(this._trackPointer(n),this.state){case tn.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case tn.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case tn.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case tn.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=tn.NONE}}function cA(n){this.enabled!==!1&&n.preventDefault()}function uA(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function dA(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const hA="/assets/aagenone-D95YG_S7.webp",fA="/assets/modfod-BuvaVina.webp",pA="/assets/sosmed-DHW-qk44.webp",mA="/assets/fakestore-BDRx6IS7.webp",gA="/assets/musicplayer-CA2JvlxU.webp",_A="/assets/dekoor-CM-uH_K7.webp",xA="/assets/weddingcard-BMETV7fQ.webp",vA="/assets/spotifylanding-BjsDhqHl.webp",ks=[{title:"Agenone 📊",desc:"Agenone is a digital agency that will make your business grow and succeed in the digital age.",img:hA,github:"https://github.com/bukananko/agenone",web:"https://aagenone.vercel.app/",techs:["vue","tailwind"]},{title:"Modfod 🥗",desc:"Discover nutritious recipes that are as tasty as they are good for you. Explore colorful photos of fresh ingredients and easy-to-follow cooking methods.",img:fA,github:"https://github.com/bukananko/modfod",web:"https://modfod.netlify.app/",techs:["next","tailwind"]},{title:"Netai 📝",desc:"Netai is a social media platform for sharing photos, your feelings, and connecting with friends.",img:pA,github:"https://github.com/bukananko/sosmed",web:"https://netai.vercel.app",techs:["next","tailwind","mongo","express"]},{title:"Fake Store 🛒",desc:"Fake store is an e-commerce web that allows users to buy or sell anything you want and spread it through the internet.",img:mA,github:"https://github.com/bukananko/fake-store",web:"https://afakestore.netlify.app",techs:["react","tailwind"]},{title:"AiMusic 🎵",desc:"AiMusic is a music player based on web that allows users to play music, search for the music you like, and manage your own music library.",img:gA,github:"https://github.com/bukananko/music-player",web:"https://aimusics.netlify.app",techs:["html","tailwind","js"]},{title:"Dekoor 🛋️",desc:"Dekoor is a landing page web that contains information about furniture.",img:_A,github:"https://github.com/bukananko/furniture-landing-page",web:"https://odekoor.netlify.app/",techs:["html","tailwind","js"]},{title:"Wedding Invitation Card 💍",desc:"A web-based wedding invitation card that you can give online to your friends or family.",img:xA,github:"https://github.com/bukananko/wedding-card",web:"https://undangan-nikah-beik.netlify.app/",techs:["react","tailwind"]},{title:"Spotify Landing Page 🎧",desc:"Landing page web from the official spotify website which I cloned to learn slicing ui.",img:vA,github:"https://github.com/bukananko/cloning-spotify",web:"https://bukananko.github.io/cloning-spotify",techs:["html","tailwind","js"]}],jd=[{key:"vue",title:"Vue JS",icon:"devicon:vuejs",category:"frontend"},{key:"react",title:"React JS",icon:"vscode-icons:file-type-reactjs",category:"frontend"},{key:"next",title:"Next JS",icon:"ri:nextjs-fill",category:"frontend"},{key:"svelte",title:"Svelte/Kit",icon:"material-icon-theme:svelte",category:"frontend"},{key:"ts",title:"TypeScript",icon:"devicon:typescript",category:"frontend"},{key:"js",title:"JavaScript",icon:"vscode-icons:file-type-js-official",category:"frontend"},{key:"tailwind",title:"Tailwind CSS",icon:"vscode-icons:file-type-tailwind",category:"frontend"},{key:"html",title:"HTML",icon:"vscode-icons:file-type-html",category:"frontend"},{key:"css",title:"CSS",icon:"vscode-icons:file-type-css",category:"frontend"},{key:"node",title:"Node JS",icon:"vscode-icons:file-type-node",category:"backend"},{key:"express",title:"Express JS",icon:"skill-icons:expressjs-light",category:"backend"},{key:"mongo",title:"MongoDB",icon:"vscode-icons:file-type-mongo",category:"database"},{key:"postgres",title:"PostgreSQL",icon:"devicon:postgresql",category:"database"},{key:"prisma",title:"Prisma",icon:"lineicons:prisma",category:"database"}],bA=[{key:"email",title:"Email",icon:"logos:google-gmail",href:"mailto:ankoo890@gmail.com"},{key:"linkedin",title:"LinkedIn",icon:"devicon:linkedin",href:"https://www.linkedin.com/in/angkomj/"},{key:"github",title:"GitHub",icon:"mdi:github",href:"https://github.com/bukananko"}],qo=[{id:"sun",name:"Anko // Core Star",codeName:"SOL-ANKO",type:"star",planetCategory:"sun",tagline:"Solar Core & Full-Stack Developer",orbitRadius:0,orbitSpeed:0,baseRadius:40,color:"#ffaa00",glowColor:"rgba(255, 170, 0, 0.65)",accentColor:"#ff4400",initialAngle:0},{id:"skills",name:"Tech Matrix",codeName:"ORB-SKILLS",type:"skills",planetCategory:"cyber",tagline:"Planetary Engineering Knowledge Core",orbitRadius:100,orbitSpeed:.42,baseRadius:18,color:"#00f0ff",glowColor:"rgba(0, 240, 255, 0.55)",accentColor:"#1d4ed8",hasRings:!0,ringsColor:"rgba(0, 240, 255, 0.5)",initialAngle:.8},{id:"project-agenone",name:"Agenone",codeName:"PLN-AGENONE",type:"project",planetCategory:"gas-giant",tagline:"Digital Agency Scaling Engine",orbitRadius:155,orbitSpeed:.34,baseRadius:20,color:"#f59e0b",glowColor:"rgba(245, 158, 11, 0.5)",accentColor:"#b45309",hasRings:!0,ringsColor:"rgba(245, 158, 11, 0.45)",initialAngle:2.1,projectData:ks[0]},{id:"project-modfod",name:"Modfod",codeName:"PLN-MODFOD",type:"project",planetCategory:"terrestrial",tagline:"Nutritious Recipe Planetary Biosphere",orbitRadius:210,orbitSpeed:.28,baseRadius:17,color:"#10b981",glowColor:"rgba(16, 185, 129, 0.5)",accentColor:"#047857",initialAngle:4.2,projectData:ks[1]},{id:"project-netai",name:"Netai",codeName:"PLN-NETAI",type:"project",planetCategory:"rings-giant",tagline:"Social Neural Connectome Network",orbitRadius:265,orbitSpeed:.23,baseRadius:21,color:"#a855f7",glowColor:"rgba(168, 85, 247, 0.55)",accentColor:"#6b21a8",hasRings:!0,ringsColor:"rgba(168, 85, 247, 0.45)",initialAngle:1.2,projectData:ks[2]},{id:"project-fakestore",name:"Fake Store",codeName:"PLN-MERCATUS",type:"project",planetCategory:"gas-giant",tagline:"Interstellar E-Commerce Marketplace",orbitRadius:320,orbitSpeed:.18,baseRadius:18,color:"#06b6d4",glowColor:"rgba(6, 182, 212, 0.5)",accentColor:"#0369a1",initialAngle:5.4,projectData:ks[3]},{id:"project-aimusic",name:"AiMusic",codeName:"PLN-MELODIA",type:"project",planetCategory:"rings-giant",tagline:"Acoustic Pulsar & Wave Player",orbitRadius:375,orbitSpeed:.15,baseRadius:19,color:"#ec4899",glowColor:"rgba(236, 72, 153, 0.5)",accentColor:"#9d174d",hasRings:!0,ringsColor:"rgba(236, 72, 153, 0.45)",initialAngle:3.5,projectData:ks[4]},{id:"project-dekoor",name:"Dekoor",codeName:"PLN-ARCHI-9",type:"project",planetCategory:"desert",tagline:"Aesthetic Interior Design & Furniture",orbitRadius:430,orbitSpeed:.12,baseRadius:16,color:"#f97316",glowColor:"rgba(249, 115, 22, 0.5)",accentColor:"#9a3412",initialAngle:.2,projectData:ks[5]},{id:"project-wedding",name:"Wedding Card",codeName:"PLN-AMORE",type:"project",planetCategory:"terrestrial",tagline:"Binary Orbit Invitation Realm",orbitRadius:485,orbitSpeed:.09,baseRadius:15,color:"#f43f5e",glowColor:"rgba(244, 63, 94, 0.5)",accentColor:"#9f1239",initialAngle:2.7,projectData:ks[6]},{id:"project-spotify",name:"Spotify Landing",codeName:"PLN-ECHO",type:"project",planetCategory:"ice",tagline:"Harmonic Audio Streaming Frequency",orbitRadius:540,orbitSpeed:.07,baseRadius:18,color:"#22c55e",glowColor:"rgba(34, 197, 94, 0.5)",accentColor:"#166534",hasRings:!0,ringsColor:"rgba(34, 197, 94, 0.45)",initialAngle:4.8,projectData:ks[7]}],yA={class:"flex items-center gap-2 font-bold text-sm tracking-wide"},MA={class:"font-sans font-semibold text-white"},SA={class:"text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-white/10 text-white/75"},wA={class:"text-[11px] text-cyan-300/90 mt-0.5 font-sans"},S0=750,Bs=7500,nl=80,Jd=380,EA=zr({__name:"SolarSystemCanvas",props:{orbitSpeedMultiplier:{default:1},selectedBodyId:{default:null},isPanelOpen:{type:Boolean,default:!1}},emits:["select","hover","unselect"],setup(n,{expose:e,emit:t}){const i=n,s=t,r=gi(null),o=gi(null),a=gi(null),l=gi(!1),c=gi({x:-1e3,y:-1e3});let u,h,d,f,x,S,m=null,p=0,y=0,R=!0;const M=new L(0,320,520),P=new L(0,0,0);let T=!1,I=null;const v=new L(45,30,45),A=new L;let F=0,k=0,U=0;const ee=new L,le=new L,$=[];let se=null,Z=null,ae=null,Te=null;const He=new Float32Array(Bs),Oe=new Float32Array(Bs),J=new Float32Array(Bs),be=new Float32Array(Bs),gt=[];let pt=null,pe=null;const Fe=[],Ie={id:"comet-halley",name:"Comet Halley",codeName:"CMT-1P/HALLEY",type:"project",planetCategory:"ice",tagline:"Deep Space Periodic Icy Wanderer & Cyan Ion Stream",orbitRadius:720,orbitSpeed:.12,baseRadius:6.5,color:"#38bdf8",glowColor:"rgba(56, 189, 248, 0.65)",accentColor:"#0284c7",initialAngle:.8};let ht=null;const _t=[];let ot=null,O=null,B=null,ie=null;const he={id:"ufo-alpha",name:"UFO-Alpha Scout",codeName:"UAP-09/EXO-VOID",type:"vessel",planetCategory:"ufo",tagline:"Extraterrestrial Hyper-Drive Reconnaissance Vessel & Graviton Field",orbitRadius:630,orbitSpeed:.09,baseRadius:18,color:"#10b981",glowColor:"rgba(16, 185, 129, 0.75)",accentColor:"#059669",initialAngle:1.6,icon:"solar:ufo-bold",lore:"Wahana nir-awak asal peradaban luar surya. Menggunakan sistem propulsi medan graviton yang mendistorsi ruang-waktu di sekitarnya tanpa menghasilkan emisi panas termal.",extraStats:[{label:"Propulsi",value:"Graviton Warp"},{label:"Sinyal Sub-ruang",value:"433.92 GHz Pulse"},{label:"Asal",value:"Deep Oort Cloud"}]};let ce=null,_e=null,Pe=null;const Re=[],Ee={id:"station-aegis",name:"Aegis Outpost-1",codeName:"ISS-AEGIS/ALPHA",type:"station",planetCategory:"station",tagline:"Modular Deep Space Habitat, Gravity Ring & Solar Array Outpost",orbitRadius:560,orbitSpeed:.065,baseRadius:24,color:"#38bdf8",glowColor:"rgba(56, 189, 248, 0.75)",accentColor:"#0284c7",initialAngle:3.5,icon:"solar:station-minimalistic-bold",lore:"Pangkalan stasiun penelitian orbital berawak di pinggiran sabuk asteroid. Cincin habitat berputar menghasilkan gravitasi sentrifugal buatan bagi awak peneliti.",extraStats:[{label:"Kru Aktif",value:"12 Astronaut"},{label:"Gravitasi Tiruan",value:"0.98 G (Spin)"},{label:"Daya Surya",value:"4.2 MegaWatt"}]};let xe=null,Ke=null;const N=[],$e={id:"ship-hermes",name:"Starship Hermes-IV",codeName:"EXP-HERMES/MK4",type:"vessel",planetCategory:"ship",tagline:"Interstellar Deep Space Heavy Cruiser & High-Impulse Ion Drive",orbitRadius:740,orbitSpeed:.11,baseRadius:22,color:"#06b6d4",glowColor:"rgba(6, 182, 212, 0.75)",accentColor:"#0891b2",initialAngle:5.2,icon:"solar:rocket-2-bold",lore:"Kapal penjelajah antariksa generasi ke-4 yang dilengkapi sepasang mesin ion plasma berdensitas tinggi. Bertugas memetakan anomali antarbintang dan menjaga jalur navigasi kosmik.",extraStats:[{label:"Kecepatan Jelajah",value:"0.15 c (Relativistik)"},{label:"Propulsi Reaktor",value:"Fusion-Ion Thruster"},{label:"Armor Lambung",value:"Nanotube Titanium"}]};let Xe=null,C=null,_=null,W=null;const j={id:"singularity-gargantua",name:"Singularity Gargantua-X",codeName:"BH-SINGULARITY/X9",type:"phenomenon",planetCategory:"blackhole",tagline:"Micro-Singularity Anomaly with Swirling Accretion Disk & Gravitational Lensing",orbitRadius:1100,orbitSpeed:0,baseRadius:36,color:"#f59e0b",glowColor:"rgba(245, 158, 11, 0.85)",accentColor:"#d97706",initialAngle:0,icon:"solar:danger-triangle-bold",lore:"Fenomena lubang hitam mikro purba di tepi terluar cakrawala. Menghasilkan tarikan gravitasi masif yang melengkungkan cahaya starlight di sekitarnya dan memanaskan piringan akresi gas plasma hingga jutaan derajat.",extraStats:[{label:"Massa Singularity",value:"4.5 Solar Masses"},{label:"Radius Schwarzchild",value:"22 km"},{label:"Luminositas Akresi",value:"1.2 x 10^38 erg/s"}]};let re=null,Ce=null,Ne=null;const ue={id:"pulsar-0950",name:"Pulsar PSR-0950",codeName:"PSR-B0950+08",type:"phenomenon",planetCategory:"pulsar",tagline:"High-Velocity Magnetized Neutron Star with Relativistic Plasma Jets",orbitRadius:1150,orbitSpeed:0,baseRadius:28,color:"#a855f7",glowColor:"rgba(168, 85, 247, 0.85)",accentColor:"#9333ea",initialAngle:0,icon:"solar:bolt-circle-bold",lore:"Sisa supernova berupa bintang neutron yang berputar sangat cepat. Memancarkan sepasang pancaran radiasi plasma relativistik dari kutub magnetnya yang menyapu ruang hampa.",extraStats:[{label:"Periode Denyut",value:"0.253 Detik"},{label:"Medan Magnet",value:"10^12 Gauss"},{label:"Densitas Inti",value:"10^14 g/cm³"}]};let fe=null,Le=null,Je=null;const Ge={id:"satellite-chronos",name:"Chronos Relay Probe",codeName:"SAT-CHRONOS/07",type:"station",planetCategory:"satellite",tagline:"Autonomous Deep Space Quantum Telemetry & Golden Reflector Array",orbitRadius:490,orbitSpeed:.08,baseRadius:15,color:"#eab308",glowColor:"rgba(234, 179, 8, 0.75)",accentColor:"#ca8a04",initialAngle:4,icon:"solar:satellite-bold",lore:"Wahana pemancar relai berkecepatan tinggi yang ditempatkan di dekat sabuk asteroid untuk menghubungkan komunikasi antara planet-planet bagian dalam dan wahana penjelajah angkasa luar.",extraStats:[{label:"Bandwidth Sinyal",value:"100 Gbps Laser Link"},{label:"Bahan Bakar Nuklir",value:"Plutonium-238 RTG"},{label:"Waktu Misi",value:"25 Tahun Aktif"}]};let ke=null,lt=null,ft=null,St=null;const Y={id:"exoplanet-kepler",name:"Kepler-452b Super-Earth",codeName:"EXO-KEPLER/452B",type:"phenomenon",planetCategory:"exoplanet",tagline:"Distant Habitable Super-Earth with Luminescent Rings & Miniature Moon",orbitRadius:820,orbitSpeed:.072,baseRadius:20,color:"#06b6d4",glowColor:"rgba(6, 182, 212, 0.75)",accentColor:"#0891b2",initialAngle:2.1,icon:"solar:planet-3-bold",lore:"Eksoplanet batuan raksasa di zona layak huni bintang luar. Memiliki atmosfer kaya nitrogen, lautan dalam bercahaya bioluminesens, cincin es ganda tipis, serta satu satelit alami kecil.",extraStats:[{label:"Massa Planet",value:"5.0 Earth Masses"},{label:"Suhu Rata-rata",value:"-8°C s/d +22°C"},{label:"Cincin Es",value:"Dual Ring System"}]};let Be=null,ve=null;const ze={id:"observatory-jwst",name:"JWST-X Observatory",codeName:"TELESCOPE-JWST/X",type:"station",planetCategory:"telescope",tagline:"Deep Space Infrared Observatory with Golden Hexagonal Mirror Array",orbitRadius:690,orbitSpeed:.082,baseRadius:18,color:"#f59e0b",glowColor:"rgba(245, 158, 11, 0.75)",accentColor:"#d97706",initialAngle:.5,icon:"solar:telescope-bold",lore:"Observatorium antariksa inframerah kuantum dengan cermin emas bersegmen heksagonal raksasa dan pelindung panas bertingkat lima. Menyingkap galaksi purba pertama sejak awal mula semesta.",extraStats:[{label:"Diameter Cermin",value:"6.5 Meter Emas"},{label:"Suhu Operasi",value:"40 Kelvin (-233°C)"},{label:"Panjang Gelombang",value:"0.6 - 28.3 μm IR"}]};let qe=null,Se=null,rt=[];const it={id:"nebula-helix",name:"Helix Eye Remnant",codeName:"NGC-7293/HELIX",type:"phenomenon",planetCategory:"nebula-core",tagline:"Stellar Remnant with Multi-Ring Ionized Gas Shells & White Dwarf Core",orbitRadius:1200,orbitSpeed:0,baseRadius:38,color:"#ec4899",glowColor:"rgba(236, 72, 153, 0.85)",accentColor:"#db2777",initialAngle:0,icon:"solar:eye-bold",lore:"Sisa ledakan lapisan gas bintang yang sekarat. Membentuk cincin silinder gas ionik raksasa berdiameter triliunan kilometer yang berpendar merah-zamrud dengan katai putih panas di pusatnya.",extraStats:[{label:"Inti Pusat",value:"Hot White Dwarf"},{label:"Kecepatan Ekspansi",value:"31 km/detik"},{label:"Suhu Inti",value:"120.000 Kelvin"}]};let qt=null,Ht=null,Qn=null;const Ln={id:"mothership-titan",name:"Vanguard Titan Dreadnought",codeName:"CV-TITAN/MOTHERSHIP",type:"vessel",planetCategory:"mothership",tagline:"Colossal Extraterrestrial Flagship with Pulsing Singularity Reactor",orbitRadius:1050,orbitSpeed:.035,baseRadius:35,color:"#c084fc",glowColor:"rgba(192, 132, 252, 0.85)",accentColor:"#9333ea",initialAngle:1.2,icon:"solar:shield-star-bold",lore:"Kapal induk antarbintang alien berukuran gigantis dengan lambung hitam bersudut piramidal. Ditenagai oleh reaktor singularitas terkendali yang memancarkan pendaran ungu antarmatra.",extraStats:[{label:"Panjang Lambung",value:"3.8 Kilometer"},{label:"Sumber Daya",value:"Subspace Singularity"},{label:"Armada Kawal",value:"36 Frigate Drones"}]};let Bi=null,rr=null,or=null;const Ci={id:"monolith-prime",name:"Xenolith Prime Monolith",codeName:"ARTIFACT-1:4:9/VOID",type:"phenomenon",planetCategory:"monolith",tagline:"Mysterious Geometric Obsidian Monolith with Shimmering Quantum Glyphs",orbitRadius:580,orbitSpeed:.062,baseRadius:14,color:"#38bdf8",glowColor:"rgba(56, 189, 248, 0.85)",accentColor:"#0284c7",initialAngle:4.7,icon:"solar:cube-bold",lore:"Monolit obelisk hitam sempurna dengan rasio dimensi matematis presisi 1:4:9. Permukaannya menyerap 99.9% cahaya namun secara berkala memproyeksikan kode glif kuantum bercahaya.",extraStats:[{label:"Proporsi Dimensi",value:"1 : 4 : 9 (Tunggal)"},{label:"Komposisi",value:"Zero-Porosity Obsidian"},{label:"Usia Artefak",value:"> 3 Miliar Tahun"}]};let Ri=null,Ts=null;const Gi={id:"asteroid-oumuamua",name:"'Oumuamua Interstellar Scout",codeName:"1I/2017-U1/OUMUAMUA",type:"phenomenon",planetCategory:"interstellar-asteroid",tagline:"Hyperbolic Cigar-Shaped Interstellar Visitor with Dynamic Tumbling Spin",orbitRadius:650,orbitSpeed:.14,baseRadius:12,color:"#fb7185",glowColor:"rgba(251, 113, 133, 0.75)",accentColor:"#e11d48",initialAngle:3.9,icon:"solar:meteor-bold",lore:"Objek pertama yang terkonfirmasi berasal dari luar tata surya kita. Berbentuk memanjang mirip cerutu dengan rotasi jungkir balik (*tumbling*) dan permukaan merah gelap akibat radiasi kosmik.",extraStats:[{label:"Rasio Panjang",value:"10 : 1 (Memanjang)"},{label:"Lintasan",value:"Hiperbolik Ekstrim"},{label:"Akselerasi Non-Gravitasi",value:"Outgassing / Light"}]};let Yn=null,ss=null,ar=null;const zi={id:"probe-lightsail",name:"LightSail-III Voyager",codeName:"PROBE-SAIL/03",type:"vessel",planetCategory:"solarsail",tagline:"Ultralight Diamond Reflective Photonic Sail Propelled by Pure Sunlight",orbitRadius:460,orbitSpeed:.095,baseRadius:16,color:"#67e8f9",glowColor:"rgba(103, 232, 249, 0.75)",accentColor:"#06b6d4",initialAngle:1,icon:"solar:wind-bold",lore:"Wahana penjelajah berbasis layar fotonik ultra-ringan berbahan Mylar reflektif. Mendorong dirinya melintasi tata surya murni mengandalkan momentum radiasi foton dari cahaya Matahari.",extraStats:[{label:"Luas Layar",value:"32 m² Reflektif"},{label:"Ketebalan Layar",value:"4.5 Mikrometer"},{label:"Konsumsi Bahan Bakar",value:"Nol (Murni Foton)"}]};let Hi=null,As=null,oi=null,bi=null,lr=null;const Wr={id:"binary-sirius",name:"Sirius Gravitational Binary",codeName:"STAR-SYSTEM/SIRIUS-AB",type:"phenomenon",planetCategory:"binary-star",tagline:"Gravitationally Locked Orange Giant & Brilliant Cyan White Dwarf Pair",orbitRadius:1180,orbitSpeed:0,baseRadius:32,color:"#f97316",glowColor:"rgba(249, 115, 22, 0.85)",accentColor:"#ea580c",initialAngle:0,icon:"solar:sun-2-bold",lore:"Sistem bintang ganda yang saling mengunci secara gravitasi dan mengitari pusat massa bersama (*barycenter*). Terdiri dari bintang raksasa jingga hangat dan katai putih biru cemerlang.",extraStats:[{label:"Bintang Utama",value:"Orange Subgiant"},{label:"Bintang Sekunder",value:"Cyan White Dwarf"},{label:"Periode Orbit Sistem",value:"50.1 Tahun"}]};let cr=null,ur=null,Xr=[];const E={id:"wormhole-artemis",name:"Wormhole Artemis-X",codeName:"WORMHOLE-ERB/01",type:"phenomenon",planetCategory:"wormhole",tagline:"Swirling Spacetime Gravitational Funnel & Intergalactic Transit Gateway",orbitRadius:1100,orbitSpeed:0,baseRadius:36,color:"#c084fc",glowColor:"rgba(192, 132, 252, 0.85)",accentColor:"#9333ea",initialAngle:0,icon:"solar:infinity-bold",lore:"Singularitas lorong cacing terowongan ruang-waktu yang menghubungkan sektor tata surya ini dengan galaksi berjarak milyaran tahun cahaya. Memiliki cincin stabilisator plasma kontra-rotasi.",extraStats:[{label:"Metrik Geometri",value:"Traversable Ellis-Bronnikov"},{label:"Fluks Energi Eksotis",value:"-8.4 x 10^22 Joule"},{label:"Destinasi Terhubung",value:"Sektor Triangulum M33"}]};let q=null,oe=null,ne=[];const te={id:"ship-valkyrie",name:"Valkyrie-X Interceptor",codeName:"FIG-VALKYRIE/X",type:"vessel",planetCategory:"starfighter",tagline:"Agile High-G Orbital Patrol Starfighter with Dual Afterburner Plumes",orbitRadius:430,orbitSpeed:.22,baseRadius:14,color:"#f97316",glowColor:"rgba(249, 115, 22, 0.85)",accentColor:"#ea580c",initialAngle:2.8,icon:"solar:plain-bold",lore:"Pesawat tempur interseptor berkecepatan hipersonik dengan bodi putih keramik dan aksen oranye terang. Bertugas melakukan patroli pertahanan cepat di sekitar sabuk dalam tata surya.",extraStats:[{label:"Akselerasi Maks",value:"35 G (Inertial Damped)"},{label:"Mesin Propulsi",value:"Twin Turbo-Fusion Plumes"},{label:"Persenjataan",value:"Dual Plasma Cannons"}]};let We=null,et=null,Ye=null;const nt={id:"crystal-astraea",name:"Astraea Cosmic Diamond",codeName:"CRYSTAL-ASTRAEA/09",type:"phenomenon",planetCategory:"crystal",tagline:"Gigantic Floating Faceted Interstellar Diamond with Refractive Energy Lattice",orbitRadius:610,orbitSpeed:.068,baseRadius:18,color:"#38bdf8",glowColor:"rgba(56, 189, 248, 0.85)",accentColor:"#0284c7",initialAngle:5.8,icon:"solar:diamond-bold",lore:"Pecahan kristal intan kosmik polikristalin raksasa berkilau yang melayang di ruang hampa tanpa bobot. Membiaskan dan memantulkan starlight menjadi prisma spektrum pelangi menyala.",extraStats:[{label:"Karat Kristal",value:"10 Triliun Carat"},{label:"Kekerasan Mohs",value:"10.5 (Hyper-Carbon)"},{label:"Refraksi Indeks",value:"2.42 (Cahaya Spektral)"}]};let st=null,Mt=null;const wt={id:"station-bifrost",name:"Bifrost Skyhook Depot",codeName:"DEPOT-BIFROST/04",type:"station",planetCategory:"cargo-depot",tagline:"Orbital Freight Transfer Platform, Industrial Crane Tower & Multicolored Pods",orbitRadius:520,orbitSpeed:.076,baseRadius:22,color:"#eab308",glowColor:"rgba(234, 179, 8, 0.75)",accentColor:"#ca8a04",initialAngle:2.8,icon:"solar:box-minimalistic-bold",lore:"Pusat logistik antariksa geostasioner yang memfasilitasi bongkar-muat kargo antar-planet. Dilengkapi gantri derek berat dan deretan kontainer bertekanan multi-warna.",extraStats:[{label:"Kapasitas Kargo",value:"250.000 Metrik Ton"},{label:"Dermaga Tambat",value:"8 Pylon Docking Clamps"},{label:"Modul Penanganan",value:"Magnetic Rail Gantry"}]};let at=null,Bt=null,nn=null;const rn={id:"exoplanet-pyro",name:"Pyro-Prime Molten World",codeName:"EXO-PYRO/MAGMA",type:"phenomenon",planetCategory:"magma-planet",tagline:"Tidally Locked Volcanic Super-Earth with Glowing Magma Calderas",orbitRadius:1120,orbitSpeed:0,baseRadius:28,color:"#ef4444",glowColor:"rgba(239, 68, 68, 0.85)",accentColor:"#b91c1c",initialAngle:0,icon:"solar:flame-bold",lore:"Eksoplanet vulkanik ekstrem yang terkunci secara gravitasi ke sumber panasnya. Seluruh permukaannya diselimuti sungai lava cair berpendar merah-oranye dan kepulan debu vulkanik pijar.",extraStats:[{label:"Suhu Permukaan",value:"1.850°C (Lava Basalt)"},{label:"Aktivitas Vulkanik",value:"1.200 Super-Gunung Berapi"},{label:"Komposisi Kerak",value:"Molten Iron & Silicates"}]};let Gt=null,_n=null,Qe=[];const zn={id:"magnetar-sgr",name:"Magnetar SGR-1806",codeName:"MAGNETAR-SGR/1806-20",type:"phenomenon",planetCategory:"magnetar",tagline:"Cosmic Dynamo with Extreme Magnetic Arcs & High-Energy Gamma Pulses",orbitRadius:1140,orbitSpeed:0,baseRadius:30,color:"#06b6d4",glowColor:"rgba(6, 182, 212, 0.85)",accentColor:"#0891b2",initialAngle:0,icon:"solar:bolt-bold",lore:"Bintang neutron dengan kekuatan medan magnet paling dahsyat di alam semesta (triliunan kali lebih kuat daripada medan magnet Bumi). Menghasilkan ledakan radiasi sinar gamma berkala.",extraStats:[{label:"Kekuatan Medan Magnet",value:"10^15 Gauss"},{label:"Energi Gempa Bintang",value:"10^39 Joule Pulse"},{label:"Gravitasi Permukaan",value:"10^11 G"}]};let Dt=null,Nn=null;const Un={id:"drone-sentinel",name:"Sentinel Drone Swarm",codeName:"DRONE-SWARM/TRIAD",type:"vessel",planetCategory:"drone-swarm",tagline:"Autonomous Triangular Fleet of 3 Coordinated Reconnaissance Drones",orbitRadius:710,orbitSpeed:.12,baseRadius:15,color:"#10b981",glowColor:"rgba(16, 185, 129, 0.75)",accentColor:"#059669",initialAngle:1.8,icon:"solar:shield-up-bold",lore:"Tiga wahana pengintai nir-awak otonom yang terbang dalam formasi delta presisi. Menggunakan sensor fotonik inframerah dan radar pemindai untuk memantau keselamatan rute luar angkasa.",extraStats:[{label:"Formasi Terbang",value:"Delta Echelon"},{label:"Koneksi Swarm",value:"Quantum Entangled Mesh"},{label:"Sensor Optik",value:"Wide-Band Lidar"}]};let Hn=null,yi=null,Vt=null;const Zt={id:"asteroid-psyche",name:"Psyche-16 Mining Outpost",codeName:"AST-PSYCHE/16-MINING",type:"station",planetCategory:"mining-outpost",tagline:"Heavy-Metal Asteroid Outpost with Automated Robotic Extraction Rig",orbitRadius:540,orbitSpeed:.088,baseRadius:20,color:"#eab308",glowColor:"rgba(234, 179, 8, 0.75)",accentColor:"#ca8a04",initialAngle:.2,icon:"solar:hammer-bold",lore:"Asteroid inti logam masif kaya emas, nikel, dan platinum bernilai ribuan triliun dollar. Dilengkapi rig penambangan robotik otomatis dengan bor termal dan suar peringatan kuning berkedip.",extraStats:[{label:"Komposisi Logam",value:"85% Besi, Nikel & Emas"},{label:"Status Penambangan",value:"Active Excavation"},{label:"Produksi Harian",value:"450 Ton Ore Refinery"}]};let ei=null,Wt=null,ui=null;const Vi={id:"dyson-hyperion",name:"Hyperion Dyson Sol-Collector",codeName:"MEGASTRUCTURE-DYSON/01",type:"station",planetCategory:"dyson-swarm",tagline:"Type-II Megastructure Solar Ring with Photovoltaic Array & High-Energy Transmitter",orbitRadius:1350,orbitSpeed:0,baseRadius:36,color:"#f59e0b",glowColor:"rgba(245, 158, 11, 0.85)",accentColor:"#d97706",initialAngle:0,icon:"solar:sun-bold",lore:"Megastruktur purwa-rupa Tipe-II yang dirancang untuk memanen energi radiasi bintang secara nirkabel. Dilengkapi piringan fotovoltaik raksasa dan pemancar gelombang mikro terkonsentrasi untuk mentransmisikan daya ke seluruh koloni luar angkasa.",extraStats:[{label:"Daya Panen Foton",value:"3.8 × 10^26 Watts"},{label:"Radius Cincin",value:"72 km Titanium Truss"},{label:"Efisiensi Konversi",value:"99.4% Quantum Lattice"}]};let Cs=null,ta=null,Yr=null,qr=[];const Iu={id:"exoplanet-glacio",name:"Glacio-7 Diamond Crystal World",codeName:"EXO-GLACIO/DIAMOND-7",type:"phenomenon",planetCategory:"ice-planet",tagline:"Sub-Zero Diamond Planet with Hexagonal Crystalline Crust & Iridescent Ice Rings",orbitRadius:1250,orbitSpeed:0,baseRadius:26,color:"#38bdf8",glowColor:"rgba(56, 189, 248, 0.85)",accentColor:"#0284c7",initialAngle:0,icon:"solar:snowflake-bold",lore:"Planet es ekstrem dengan suhu -218°C di mana karbon murni di bawah tekanan tektonik tinggi telah mengkristal menjadi mantel berlian padat. Cincin gandanya terbentuk dari jutaan kristal es metana yang membiaskan cahaya menjadi spektrum pelangi es yang memukau.",extraStats:[{label:"Suhu Permukaan",value:"-218°C Cryogenic"},{label:"Komposisi Mantel",value:"82% Crystalline Diamond"},{label:"Indeks Refraksi",value:"2.42 Diamond Dispersion"}]};let na=null,ia=null,sa=[],Rl=null;const Qf={id:"rift-chronos",name:"Chronos Tachyon Hyper-Gateway",codeName:"GATEWAY-CHRONOS/TACHYON",type:"station",planetCategory:"hyper-gateway",tagline:"Ancient Subspace Stargate with Contra-Rotating Quantum Stabilization Rings",orbitRadius:1380,orbitSpeed:0,baseRadius:38,color:"#a855f7",glowColor:"rgba(168, 85, 247, 0.85)",accentColor:"#7e22ce",initialAngle:0,icon:"solar:infinity-bold",lore:"Gerbang lompatan hiperruang kuno peninggalan peradaban antariksa purba. Memanfaatkan partikel tachyon yang bergerak lebih cepat dari cahaya untuk membuka celah Einstein-Rosen yang menghubungkan galaksi secara instan tanpa distorsi relativitas waktu.",extraStats:[{label:"Stabilitas Metrik",value:"99.98% Warp Metric"},{label:"Frekuensi Tachyon",value:"14.28 Terahertz"},{label:"Batas Jangkauan",value:"Instant Antargalaksi"}]};let ra=null,oa=null,aa=null,Pl=[];const Lu={id:"exoplanet-zephyrus",name:"Zephyrus Monarch Gas Giant",codeName:"EXO-ZEPHYRUS/MONARCH",type:"phenomenon",planetCategory:"gas-giant",tagline:"Colossal Emerald Gas Giant with Supersonic Atmospheric Storm Belts & Shepherd Moons",orbitRadius:1300,orbitSpeed:0,baseRadius:32,color:"#10b981",glowColor:"rgba(16, 185, 129, 0.85)",accentColor:"#047857",initialAngle:0,icon:"solar:planet-bold",lore:"Raksasa gas kolosal berukuran 3 kali lebih besar dari Jupiter. Atmosfernya tersusun dari hidrogen, helium, dan metana terionisasi yang menghasilkan pola sabuk awan zamrud yang megah dengan angin badai supersonik berkecepatan 2.450 km/jam.",extraStats:[{label:"Diameter Khatulistiwa",value:"142.984 km (Super-Jovian)"},{label:"Kecepatan Badai",value:"2.450 km/jam Supersonik"},{label:"Sistem Satelit",value:"42 Bulan & 2 Shepherd Moons"}]};let Kr=null,la=null,ca=[],$r=null;const Dl={id:"leviathan-void",name:"Ancient Void Leviathan Fossil",codeName:"COSMIC-LEVIATHAN/ANCIENT",type:"phenomenon",planetCategory:"cosmic-organism",tagline:"Gigantic Biomechanical Starlight Leviathan Skeleton with Luminous Crystal Bones & Pulsing Heart",orbitRadius:1500,orbitSpeed:0,baseRadius:42,color:"#00f0ff",glowColor:"rgba(0, 240, 255, 0.85)",accentColor:"#0891b2",initialAngle:0,icon:"solar:bone-bold",lore:"Fosil raksasa entitas kosmik purba sepanjang 180 meter yang melayang di kehampaan antarbintang. Tulang-tulang kristal fotoniknya masih memancarkan pendaran bioluminescent cyan-emerald, dengan batu inti jantung tachyon yang terus berdetak pelan.",extraStats:[{label:"Panjang Kerangka",value:"180 Meter Fosil"},{label:"Detak Jantung Inti",value:"12 BPM Tachyon Pulse"},{label:"Resonansi Fotonik",value:"Bioluminescent Cyan"}]};let Zr=null,ua=null,da=null;const Nu={id:"ringworld-elysium",name:"Genesis Elysium Ringworld",codeName:"HABITAT-ELYSIUM/RINGWORLD",type:"station",planetCategory:"ringworld-habitat",tagline:"Artificial Centrifugal Megastructure with Terraformed Biosphere, Oceans & Spire Towers",orbitRadius:1450,orbitSpeed:0,baseRadius:46,color:"#22c55e",glowColor:"rgba(34, 197, 94, 0.85)",accentColor:"#15803d",initialAngle:0,icon:"solar:globus-bold",lore:"Megastruktur cincin orbital buatan berputar sentrifugal yang menampung biosfer terraform mandiri. Permukaan dalamnya dihiasi lautan biru, daratan zamrud berhutan lebat, dan atmosfer bertekanan buatan yang ditahan dinding pembatas setinggi 20 km.",extraStats:[{label:"Keliling Cincin",value:"280 km Diameter"},{label:"Gravitasi Sentrifugal",value:"1.0 G (Earth Equivalent)"},{label:"Kapasitas Populasi",value:"45 Juta Jiwa"}]};let ha=null,fa=null,pa=[],ma=null;const Uu={id:"protostar-phoenix",name:"Phoenix Protostar & Bipolar Jets",codeName:"PROTOSTAR-PHOENIX/EMBRYO",type:"phenomenon",planetCategory:"protostar",tagline:"Hyperactive Newborn Protostar with Relativistic Bipolar Plasma Ejection Jets & Accretion Spiral",orbitRadius:1550,orbitSpeed:0,baseRadius:36,color:"#f97316",glowColor:"rgba(249, 115, 22, 0.85)",accentColor:"#ea580c",initialAngle:0,icon:"solar:flame-bold",lore:"Bintang bayi yang baru lahir di tengah kepompong gas plasma pijar bersuhu jutaan derajat. Dari kedua kutub rotasinya, terpancar dua berkas jet plasma relativistik sepanjang ribuan kilometer yang menyembur ke luar angkasa dengan kecepatan mendekati cahaya.",extraStats:[{label:"Kecepatan Jet Polar",value:"0.85 c (Relativistik)"},{label:"Suhu Inti Konveksi",value:"14.000.000 K"},{label:"Fase Evolusi Bintang",value:"T-Tauri Accretion"}]};let ga=null,_a=null,jr=null,Jr=null;const Fu={id:"artifact-tesseract",name:"Tesseract Prime 4D Hypercube",codeName:"ARTIFACT-TESSERACT/4D",type:"phenomenon",planetCategory:"hyperdimensional",tagline:"4-Dimensional Quantum Hypercube Projection with Nested Tesseract Rotation & Spatial Rift",orbitRadius:1420,orbitSpeed:0,baseRadius:34,color:"#d946ef",glowColor:"rgba(217, 70, 239, 0.85)",accentColor:"#c026d3",initialAngle:0,icon:"solar:box-minimalistic-bold",lore:"Artefak geometris 4-dimensi yang memproyeksikan wujud bayangan hiperkubus (Tesseract) ke dalam ruang 3-dimensi kita. Kubus luar dan kubus dalamnya saling berotasi dalam rotasi non-Euclidean yang membiaskan ruang dan waktu di sekitarnya.",extraStats:[{label:"Dimensi Metrik",value:"4D Spatial Projection"},{label:"Topologi Ruang",value:"Non-Euclidean Manifold"},{label:"Fluks Entropi",value:"-0.999 Quantum Inversion"}]};let Qr=null,xa=null,Il=null,va=[];const Ou={id:"foundry-vulcan",name:"Solaris Vulcan Asteroid Foundry",codeName:"FORGE-VULCAN/HEAVY-INDUSTRIAL",type:"vessel",planetCategory:"industrial-foundry",tagline:"Planetary-Scale Asteroid Smelting Foundry with Magnetic Induction Crucible & Heat Radiators",orbitRadius:1480,orbitSpeed:0,baseRadius:40,color:"#ea580c",glowColor:"rgba(234, 88, 12, 0.85)",accentColor:"#c2410c",initialAngle:0,icon:"solar:fire-bold",lore:"Wahana pabrik peleburan asteroid raksasa berukuran kota. Menggunakan tungku induksi magnetik berkekuatan gigawatt untuk melelehkan asteroid mentah menjadi logam murni superpaduan yang digunakan membangun armada stasiun luar angkasa.",extraStats:[{label:"Suhu Peleburan",value:"3.200°C Plasma Crucible"},{label:"Keluaran Baja Logam",value:"12.000 Ton/Siklus"},{label:"Daya Induksi",value:"8.4 Gigawatt Reaktor"}]};let dr=null,ba=null,eo=[];const ku={id:"crystal-geode",name:"Abyssal Dark Matter Crystal Cluster",codeName:"EXO-GEODE/DARK-CRYSTAL",type:"phenomenon",planetCategory:"dark-crystal",tagline:"Exotic Dark-Matter Crystalline Cluster with Gravitational Microlensing & Prismatic Needles",orbitRadius:1520,orbitSpeed:0,baseRadius:36,color:"#8b5cf6",glowColor:"rgba(139, 92, 246, 0.85)",accentColor:"#7c3aed",initialAngle:0,icon:"solar:magic-stick-3-bold",lore:"Gugusan kristal materi gelap langka yang mencuat keluar dari asteroid obsidian. Jarum-jarum kristal prisma ungunya membelokkan cahaya bintang di sekitarnya dan memancarkan gelombang gravitasi mikro dengan kilatan pendaran ultraviolet.",extraStats:[{label:"Komposisi Kristal",value:"Stabilized Dark Matter"},{label:"Pendaran Spektrum",value:"Deep Ultraviolet 254nm"},{label:"Distorsi Lensa",value:"Microlensing Gravity Field"}]};let hr=null,ya=null,to=[];const Bu={id:"artifact-crown",name:"Crown of the Cosmic King",codeName:"ROYAL-CROWN/IMPERIAL",type:"phenomenon",planetCategory:"royal-artifact",tagline:"Legendary 24K Stellar King Crown with Embedded Rubies, Velvet Dome & Starlight Aura",orbitRadius:1350,orbitSpeed:0,baseRadius:32,color:"#eab308",glowColor:"rgba(234, 179, 8, 0.85)",accentColor:"#ca8a04",initialAngle:0,icon:"solar:crown-bold",lore:"Mahkota Raja Galaksi kuno yang hilang berabad-abad di kehampaan kosmis. Ditempa dari emas 24 karat murni bintang neutron dan bertatahkan batu permata ruby merah delima serta zamrud kosmik. Konon siapapun yang menemukannya dinobatkan sebagai penguasa kode antariksa tertinggi.",extraStats:[{label:"Material Inti",value:"Emas Murni 24K Bintang Neutron"},{label:"Batu Permata",value:"5 Ruby Merah & Zamrud Kosmik"},{label:"Aura Kerajaan",value:"9.999 Royalty Flux"}]};let no=null,Ma=null,Sa=[],io=null;const Gu={id:"vessel-beat",name:"Motor BeAT Karbu Antariksa",codeName:"MOPED-BEAT/WARP-110CC",type:"vessel",planetCategory:"interstellar-scooter",tagline:"Legendary Earth Scooter Modified with eSP Warp Drive & Plasma Exhaust Jet",orbitRadius:1280,orbitSpeed:0,baseRadius:28,color:"#0284c7",glowColor:"rgba(2, 132, 199, 0.85)",accentColor:"#0369a1",initialAngle:0,icon:"solar:wheel-bold",lore:"Motor BeAT Karbu biru legendaris asal Indonesia yang entah bagaimana berhasil menembus atmosfer bumi dan mengembara melintasi tata surya. Dilengkapi bodi Techno Blue Metallic sporty, knalpot racing pendorong plasma biru, dan efisiensi bahan bakar antargalaksi: 1 liter Pertalite cukup untuk menempuh 10.000 tahun cahaya.",extraStats:[{label:"Warna Fairing",value:"Techno Blue Metallic & White"},{label:"Mesin Penggerak",value:"110cc SOHC eSP Warp Core"},{label:"Bahan Bakar",value:"Pertalite Murni Antariksa"},{label:"Kecepatan Puncak",value:"12.000 c (Melebihi Cahaya)"},{label:"Plat Nomor",value:"B 4744 ANK (Cosmic Registry)"},{label:"Pemilik",value:"???????????"}]};let fr=null,wa=null,Ll=null,so=null;const Nl={id:"artifact-laptop",name:"Cyber Matrix Quantum Laptop",codeName:"DEVICE-LAPTOP/QUANTUM-PRO",type:"station",planetCategory:"cybernetic-terminal",tagline:"Zero-Gravity Developer Workstation Running Live Matrix Code & Vite Dev Server",orbitRadius:1320,orbitSpeed:0,baseRadius:26,color:"#06b6d4",glowColor:"rgba(6, 182, 212, 0.85)",accentColor:"#0891b2",initialAngle:0,icon:"solar:laptop-bold",lore:"Laptop kerja portabel milik web engineer antariksa Anko yang melayang bebas di ruang gravitasi nol. Layar Retina holografiknya masih menyala menjalankan kompilasi TypeScript dan Vite Dev Server dengan 0 error di tengah kehampaan kosmis.",extraStats:[{label:"Processor Core",value:"Quantum M-Core 128-Core 8.4 GHz"},{label:"Status Kompilasi",value:"Vite Built in 0.04s (0 Errors)"},{label:"Display",value:"16-inch Holographic Liquid Retina"},{label:"Backlight Keyboard",value:"RGB Cyber Cyan Chroma"}]};let Ea=null,Ta=null,Aa=null,Ul=[];const zu={id:"planet-neptunia",name:"Neptunia Prime Ocean World",codeName:"EXO-NEPTUNIA/SAPPHIRE",type:"phenomenon",planetCategory:"gas-giant",tagline:"Deep Sapphire Oceanic Super-Jovian with Massive Iridescent Irradiated Rings",orbitRadius:1460,orbitSpeed:0,baseRadius:40,color:"#3b82f6",glowColor:"rgba(59, 130, 246, 0.85)",accentColor:"#1d4ed8",initialAngle:0,icon:"solar:planet-bold",lore:"Raksasa samudera biru safir dengan kedalaman laut atmosferik ribuan kilometer. Dikelilingi oleh cincin es raksasa yang membiaskan cahaya bintang menjadi warna pelangi keemasan dan biru laut yang memesona.",extraStats:[{label:"Diameter Cincin",value:"320.000 km Iridescent Ring"},{label:"Kedalaman Samudera",value:"18.400 km Super-Fluid"},{label:"Suhu Atmosfer",value:"-145°C Cryogenic Methane"}]};let ro=null,Ca=null,oo=null,Ra=null;const Hu={id:"probe-voyager",name:"Voyager Prime Interstellar Probe",codeName:"PROBE-VOYAGER/GOLDEN-RECORD",type:"vessel",planetCategory:"deep-space-probe",tagline:"Pioneer Deep-Space Explorer Carrying The Golden Record & Phonograph Message",orbitRadius:1540,orbitSpeed:0,baseRadius:34,color:"#f59e0b",glowColor:"rgba(245, 158, 11, 0.85)",accentColor:"#d97706",initialAngle:0,icon:"solar:satellite-bold",lore:"Wahana penjelajah antarbintang legendaris pembawa pesan perdamaian dari Bumi. Di sisinya terpasang Piringan Emas (Golden Record) berlapis emas murni yang berisi salam dalam 55 bahasa manusia dan suara-suara alam semesta.",extraStats:[{label:"Piringan Emas",value:"The Sounds of Earth Phonograph"},{label:"Sumber Tenaga",value:"Plutonium-238 RTG Generator"},{label:"Jarak Jelajah",value:"24 Miliar Kilometer dari Bumi"}]};let pr=null,Pa=null,Fl=[],Ol=[];const Vu={id:"artifact-coffee",name:"Cangkir Kopi Kosmik Tubruk",codeName:"COFFEE-MUG/INFINITE-CAFFEINE",type:"phenomenon",planetCategory:"cosmic-artifact",tagline:"Legendary Zero-G Astronaut Coffee Mug Radiating Infinite Steam & Caffeine Energy",orbitRadius:1300,orbitSpeed:0,baseRadius:24,color:"#f59e0b",glowColor:"rgba(245, 158, 11, 0.85)",accentColor:"#d97706",initialAngle:0,icon:"solar:cup-bold",lore:"Cangkir kopi tubruk legendaris milik web engineer antariksa Anko yang melayang abadi di ruang gravitasi nol. Cairan kafein kuantumnya tidak pernah dingin dan terus memancarkan aroma kopi segar untuk menyuplai energi lembur coding antargalaksi.",extraStats:[{label:"Suhu Kopi",value:"85°C Abadi (Zero-G Steam)"},{label:"Kadar Kafein",value:"99.9% Quantum Espresso"},{label:"Status Suplai",value:"Unlimited Developer Fuel"}]};let mr=null,Da=null,kl=[];const Wu={id:"artifact-guitar",name:"Cosmic Stratocaster Guitar",codeName:"GUITAR-STRAT/CELESTIAL-ROCK",type:"phenomenon",planetCategory:"musical-artifact",tagline:"Legendary Electric Guitar Drifting in Deep Space Emitting Cosmic Harmonic Rhythms",orbitRadius:1380,orbitSpeed:0,baseRadius:30,color:"#ec4899",glowColor:"rgba(236, 72, 153, 0.85)",accentColor:"#db2777",initialAngle:0,icon:"solar:music-note-2-bold",lore:"Gitar listrik legendaris yang mengembara di ruang hampa antarbintang. Senar-senar fotoniknya memetik sendiri harmoni frekuensi kosmik yang menggetarkan nebula di sekitarnya dengan melodi rock antargalaksi.",extraStats:[{label:"Tipe Senar",value:"6 Harmonic Tachyon Strings"},{label:"Output Frekuensi",value:"440 Hz Stellar Rock Overdrive"},{label:"Body Finish",value:"Nebula Sunburst Lacquer"}]};let ao=null,Ia=null,gr=null,La=[];const Xu={id:"artifact-neko",name:"Cosmic Golden Maneki-Neko",codeName:"STATUE-NEKO/LUCKY-CAT",type:"station",planetCategory:"prosperity-artifact",tagline:"24K Solar Gold Lucky Cat Waving Its Paw to Ward Off Bugs & Bring Good Fortune",orbitRadius:1440,orbitSpeed:0,baseRadius:32,color:"#eab308",glowColor:"rgba(234, 179, 8, 0.85)",accentColor:"#ca8a04",initialAngle:0,icon:"solar:cat-bold",lore:"Patung kucing pembawa keberuntungan (Maneki-Neko) kosmik raksasa yang ditempa dari emas murni surya. Tangannya terus melambai ritmis di gravitasi nol untuk mengusir bug, menarik rezeki proyek freelance, dan menjaga stabilitas ekosistem antariksa.",extraStats:[{label:"Status Lambaian",value:"Paw Waving Active (Fortune +9999)"},{label:"Kutukan Bug",value:"0% Protected (Bug Repellent)"},{label:"Koin Emas",value:"10.000.000 Ryo Starlight Gold"}]};let Bl=!1,Na={x:0,y:0},ep=0,Gl=0;const tp=()=>{const g=document.createElement("canvas");g.width=512,g.height=256;const w=g.getContext("2d"),K=w.createLinearGradient(0,0,0,256);K.addColorStop(0,"#ff4400"),K.addColorStop(.3,"#ffaa00"),K.addColorStop(.5,"#fef08a"),K.addColorStop(.7,"#ffaa00"),K.addColorStop(1,"#ff3300"),w.fillStyle=K,w.fillRect(0,0,512,256);for(let H=0;H<60;H++){const z=Math.random()*512,ge=Math.random()*256,de=Math.random()*30+10,b=w.createRadialGradient(z,ge,0,z,ge,de);b.addColorStop(0,"rgba(255, 255, 255, 0.45)"),b.addColorStop(.5,"rgba(254, 240, 138, 0.25)"),b.addColorStop(1,"transparent"),w.fillStyle=b,w.beginPath(),w.arc(z,ge,de,0,Math.PI*2),w.fill()}const G=new An(g);return G.wrapS=wi,G.wrapT=ji,G},np=(g,w,K)=>{const G=document.createElement("canvas");G.width=512,G.height=256;const H=G.getContext("2d");H.fillStyle=g,H.fillRect(0,0,512,256);const z=14;for(let de=0;de<z;de++){const b=de*256/z,X=256/z;H.fillStyle=de%2===0?w:K,H.beginPath(),H.moveTo(0,b);for(let V=0;V<=512;V+=16){const Q=Math.sin(V/512*Math.PI*6+de)*3;H.lineTo(V,b+Q)}H.lineTo(512,b+X),H.lineTo(0,b+X),H.closePath(),H.fill()}H.fillStyle="rgba(255, 255, 255, 0.5)",H.beginPath(),H.ellipse(320,160,45,22,.1,0,Math.PI*2),H.fill();const ge=new An(G);return ge.wrapS=wi,ge},ip=(g,w)=>{const K=document.createElement("canvas");K.width=512,K.height=256;const G=K.getContext("2d");G.fillStyle=g,G.fillRect(0,0,512,256),G.fillStyle=w;for(let z=0;z<18;z++){const ge=Math.random()*512,de=Math.random()*200+28,b=Math.random()*45+20;G.beginPath(),G.arc(ge,de,b,0,Math.PI*2),G.fill()}G.fillStyle="rgba(255, 255, 255, 0.45)";for(let z=0;z<12;z++){const ge=Math.random()*512,de=Math.random()*256;G.beginPath(),G.ellipse(ge,de,65,14,.2,0,Math.PI*2),G.fill()}const H=new An(K);return H.wrapS=wi,H},C_=()=>{const g=document.createElement("canvas");g.width=512,g.height=256;const w=g.getContext("2d");w.fillStyle="#050c1e",w.fillRect(0,0,512,256),w.strokeStyle="#00f0ff",w.lineWidth=1.5;for(let G=0;G<=512;G+=32)w.beginPath(),w.moveTo(G,0),w.lineTo(G,256),w.stroke();for(let G=0;G<=256;G+=32)w.beginPath(),w.moveTo(0,G),w.lineTo(512,G),w.stroke();w.fillStyle="#ffffff";for(let G=0;G<30;G++){const H=Math.floor(Math.random()*16)*32,z=Math.floor(Math.random()*8)*32;w.beginPath(),w.arc(H,z,3,0,Math.PI*2),w.fill()}const K=new An(g);return K.wrapS=wi,K},R_=(g,w)=>{const K=document.createElement("canvas");K.width=512,K.height=256;const G=K.getContext("2d");G.fillStyle=w,G.fillRect(0,0,512,256),G.fillStyle=g,G.fillRect(0,30,512,196),G.fillStyle="#ffffff",G.fillRect(0,0,512,38),G.fillRect(0,218,512,38),G.strokeStyle="rgba(255, 255, 255, 0.7)",G.lineWidth=1.5;for(let z=0;z<15;z++)G.beginPath(),G.moveTo(Math.random()*512,Math.random()*256),G.lineTo(Math.random()*512,Math.random()*256),G.stroke();const H=new An(K);return H.wrapS=wi,H},P_=(g,w)=>{const K=document.createElement("canvas");K.width=512,K.height=256;const G=K.getContext("2d");G.fillStyle=g,G.fillRect(0,0,512,256),G.fillStyle=w;for(let z=0;z<35;z++){const ge=Math.random()*512,de=Math.random()*256,b=Math.random()*12+4;G.beginPath(),G.arc(ge,de,b,0,Math.PI*2),G.fill()}const H=new An(K);return H.wrapS=wi,H},D_=g=>{const w=document.createElement("canvas");w.width=512,w.height=32;const K=w.getContext("2d"),G=K.createLinearGradient(0,0,512,0);return G.addColorStop(0,"transparent"),G.addColorStop(.15,g),G.addColorStop(.55,g),G.addColorStop(.58,"rgba(0, 0, 0, 0.95)"),G.addColorStop(.62,g),G.addColorStop(.95,g),G.addColorStop(1,"transparent"),K.fillStyle=G,K.fillRect(0,0,512,32),new An(w)},I_=()=>{const g=document.createElement("canvas");g.width=256,g.height=256;const w=g.getContext("2d"),K=w.createRadialGradient(128,128,10,128,128,128);K.addColorStop(0,"rgba(255, 255, 220, 0.95)"),K.addColorStop(.2,"rgba(255, 180, 20, 0.7)"),K.addColorStop(.5,"rgba(255, 90, 0, 0.3)"),K.addColorStop(.8,"rgba(255, 30, 0, 0.08)"),K.addColorStop(1,"rgba(0, 0, 0, 0)"),w.fillStyle=K,w.fillRect(0,0,256,256);const G=new An(g),H=new Wc({map:G,transparent:!0,blending:yt,depthWrite:!1}),z=new Ud(H);return z.scale.set(160,160,1),z},L_=(g,w)=>{const K=document.createElement("canvas");K.width=512,K.height=512;const G=K.getContext("2d");G.clearRect(0,0,512,512);const H=[{ox:0,oy:0,r:180,c:g,a:.28},{ox:-55,oy:40,r:145,c:w,a:.22},{ox:60,oy:-35,r:155,c:g,a:.2},{ox:-45,oy:-55,r:130,c:w,a:.18},{ox:50,oy:55,r:135,c:g,a:.18},{ox:0,oy:75,r:115,c:w,a:.15},{ox:-75,oy:0,r:110,c:g,a:.15},{ox:70,oy:15,r:105,c:w,a:.14},{ox:-25,oy:60,r:100,c:g,a:.14},{ox:30,oy:-65,r:95,c:w,a:.12}];for(const z of H){const ge=256+z.ox,de=256+z.oy,b=G.createRadialGradient(ge,de,4,ge,de,z.r);b.addColorStop(0,z.c.replace(/[\d.]+\)$/,`${z.a})`)),b.addColorStop(.45,z.c.replace(/[\d.]+\)$/,`${(z.a*.38).toFixed(2)})`)),b.addColorStop(1,"rgba(0, 0, 0, 0)"),G.fillStyle=b,G.beginPath(),G.arc(ge,de,z.r,0,Math.PI*2),G.fill()}for(let z=0;z<38;z++){const ge=256+(Math.random()-.5)*260,de=256+(Math.random()-.5)*260,b=Math.random()*1.8+.6;G.fillStyle="rgba(255, 255, 255, 0.55)",G.beginPath(),G.arc(ge,de,b,0,Math.PI*2),G.fill()}return new An(K)},N_=()=>{const g=document.createElement("canvas");g.width=256,g.height=256;const w=g.getContext("2d");w.clearRect(0,0,256,256);const K=w.createLinearGradient(0,128,256,128);K.addColorStop(0,"rgba(255, 255, 255, 0)"),K.addColorStop(.42,"rgba(56, 189, 248, 0.45)"),K.addColorStop(.5,"rgba(255, 255, 255, 1.0)"),K.addColorStop(.58,"rgba(56, 189, 248, 0.45)"),K.addColorStop(1,"rgba(255, 255, 255, 0)"),w.fillStyle=K,w.fillRect(0,126,256,4);const G=w.createLinearGradient(128,0,128,256);G.addColorStop(0,"rgba(255, 255, 255, 0)"),G.addColorStop(.42,"rgba(56, 189, 248, 0.45)"),G.addColorStop(.5,"rgba(255, 255, 255, 1.0)"),G.addColorStop(.58,"rgba(56, 189, 248, 0.45)"),G.addColorStop(1,"rgba(255, 255, 255, 0)"),w.fillStyle=G,w.fillRect(126,0,4,256);const H=w.createRadialGradient(128,128,2,128,128,48);return H.addColorStop(0,"rgba(255, 255, 255, 1.0)"),H.addColorStop(.2,"rgba(165, 243, 252, 0.75)"),H.addColorStop(.6,"rgba(56, 189, 248, 0.25)"),H.addColorStop(1,"rgba(0, 0, 0, 0)"),w.fillStyle=H,w.beginPath(),w.arc(128,128,48,0,Math.PI*2),w.fill(),new An(g)};let lo=null,co=null;const sp=()=>{if(!lo){const g=document.createElement("canvas");g.width=64,g.height=64;const w=g.getContext("2d");w.clearRect(0,0,64,64);const K=w.createRadialGradient(32,32,0,32,32,32);K.addColorStop(0,"rgba(255, 255, 255, 1.0)"),K.addColorStop(.55,"rgba(255, 255, 255, 1.0)"),K.addColorStop(.8,"rgba(255, 255, 255, 0.85)"),K.addColorStop(.96,"rgba(255, 255, 255, 0.25)"),K.addColorStop(1,"rgba(255, 255, 255, 0.0)"),w.fillStyle=K,w.beginPath(),w.arc(32,32,32,0,Math.PI*2),w.fill(),lo=new An(g),lo.generateMipmaps=!1,lo.minFilter=Cn,lo.magFilter=Cn}return lo},Yu=()=>{if(!co){const g=document.createElement("canvas");g.width=64,g.height=64;const w=g.getContext("2d");w.clearRect(0,0,64,64);const K=w.createRadialGradient(32,32,0,32,32,32);K.addColorStop(0,"rgba(255, 255, 255, 1.0)"),K.addColorStop(.65,"rgba(255, 255, 255, 1.0)"),K.addColorStop(.85,"rgba(255, 255, 255, 0.85)"),K.addColorStop(.98,"rgba(255, 255, 255, 0.20)"),K.addColorStop(1,"rgba(255, 255, 255, 0.0)"),w.fillStyle=K,w.beginPath(),w.arc(32,32,32,0,Math.PI*2),w.fill(),co=new An(g),co.generateMipmaps=!1,co.minFilter=Cn,co.magFilter=Cn}return co},rp=(g,w,K,G)=>{const H=new Jt,z=new Float32Array(g*3),ge=new Float32Array(g*3);for(let b=0;b<g;b++){const X=Math.random(),V=K*Math.pow(X,2),Q=Math.random()*Math.PI*2,me=Math.acos(Math.random()*2-1);z[b*3]=w.x+V*Math.sin(me)*Math.cos(Q),z[b*3+1]=w.y+V*Math.sin(me)*Math.sin(Q),z[b*3+2]=w.z+V*Math.cos(me);const Me=G[Math.floor(Math.random()*G.length)];ge[b*3]=Me.r,ge[b*3+1]=Me.g,ge[b*3+2]=Me.b}H.setAttribute("position",new mn(z,3)),H.setAttribute("color",new mn(ge,3));const de=new Fo({size:3.4,map:sp(),vertexColors:!0,transparent:!0,opacity:.95,blending:yt,sizeAttenuation:!0,depthWrite:!1});return new Qa(H,de)},U_=()=>{const g=new mt,w=new Ae(24,16,16),K=new ye({visible:!1});O=new D(w,K),O.userData={body:he},g.add(O);const G=new At(18,5,3.5,32),H=new Ue({color:15857145,metalness:.95,roughness:.15}),z=new D(G,H);z.position.y=-1.5,z.userData={body:he},g.add(z);const ge=new At(12,18,2.5,32),de=new D(ge,H);de.position.y=1.2,de.userData={body:he},g.add(de);const b=new Bn(18.2,.6,16,48),X=new ye({color:1096065}),V=new D(b,X);V.rotation.x=Math.PI/2,g.add(V);const Q=new Ae(7,24,16,0,Math.PI*2,0,Math.PI/2),me=new Ue({color:3462041,emissive:1096065,emissiveIntensity:.85,metalness:.1,roughness:.1,transparent:!0,opacity:.9}),Me=new D(Q,me);Me.position.y=2.4,Me.userData={body:he},g.add(Me),B=new mt;const Ve=new Ae(.9,12,12),tt=new ye({color:61695}),ct=new ye({color:1096065});for(let Et=0;Et<8;Et++){const Lt=new D(Ve,Et%2===0?tt:ct),yn=Et/8*Math.PI*2;Lt.position.set(Math.cos(yn)*17.5,0,Math.sin(yn)*17.5),B.add(Lt)}g.add(B);const ut=new xn(22,50,32,1,!0),Xt=new ye({color:440020,transparent:!0,opacity:.18,side:Nt,depthWrite:!1,blending:yt});return ie=new D(ut,Xt),ie.position.y=-26,g.add(ie),g},F_=()=>{const g=new mt,w=new Ae(34,16,16),K=new ye({visible:!1});_e=new D(w,K),_e.userData={body:Ee},g.add(_e);const G=new Ue({color:9741240,metalness:.75,roughness:.3}),H=new Ue({color:3359061,metalness:.85,roughness:.35}),z=new Ue({color:1920728,emissive:1516884,metalness:.9,roughness:.2}),ge=new At(4.5,4.5,42,16),de=new D(ge,H);de.userData={body:Ee},g.add(de);const b=new Ae(5.2,16,16),X=new D(b,G);X.position.y=21;const V=new D(b,G);V.position.y=-21,g.add(X),g.add(V),Pe=new mt;const Q=new Bn(26,2.6,16,48),me=new D(Q,G);me.rotation.x=Math.PI/2,me.userData={body:Ee},Pe.add(me);const Me=new At(.8,.8,26,8);for(let Mn=0;Mn<4;Mn++){const En=new D(Me,H);En.rotation.z=Math.PI/2,En.rotation.y=Mn*Math.PI/2,En.translateX(13),Pe.add(En)}g.add(Pe);const Ve=new vt(32,.6,8),tt=[{x:26,y:14,z:0},{x:-26,y:14,z:0},{x:26,y:-14,z:0},{x:-26,y:-14,z:0}];for(const Mn of tt){const En=new D(Ve,z);En.position.set(Mn.x,Mn.y,Mn.z),g.add(En)}const ct=new At(7,1.5,3,24,1,!0),ut=new Ue({color:16317180,metalness:.6,roughness:.2}),Xt=new D(ct,ut);Xt.position.set(0,26,6),Xt.rotation.x=Math.PI/4,g.add(Xt),Re.length=0;const Et=new Ae(.8,8,8),Lt=new ye({color:15680580}),yn=new ye({color:2278750});Re.push(Lt,yn);const dn=new D(Et,Lt);dn.position.set(42,14,0);const ai=new D(Et,yn);return ai.position.set(-42,14,0),g.add(dn),g.add(ai),g},O_=()=>{const g=new mt,w=new Ae(32,16,16),K=new ye({visible:!1});Ke=new D(w,K),Ke.userData={body:$e},g.add(Ke);const G=new Ue({color:16317180,metalness:.55,roughness:.25}),H=new Ue({color:165063,metalness:.8,roughness:.2}),z=new ye({color:3718648}),ge=new vt(12,6,36),de=new D(ge,G);de.userData={body:$e},g.add(de);const b=new xn(7,18,4),X=new D(b,G);X.rotation.y=Math.PI/4,X.rotation.x=Math.PI/2,X.position.z=26,X.userData={body:$e},g.add(X);const V=new vt(6,3,10),Q=new D(V,H);Q.position.set(0,4,2),g.add(Q);const me=new vt(5.2,1.2,2),Me=new D(me,z);Me.position.set(0,4.2,6.5),g.add(Me),N.length=0;const Ve=new At(3.2,3.2,28,16),tt=[-10,10];for(const ct of tt){const ut=new D(Ve,H);ut.rotation.x=Math.PI/2,ut.position.set(ct,0,-4),g.add(ut);const Xt=new vt(5,1,12),Et=new D(Xt,G);Et.position.set(ct*.5,0,-2),g.add(Et);const Lt=new xn(2.8,18,16,1,!0),yn=new ye({color:61695,transparent:!0,opacity:.75,side:Nt,depthWrite:!1,blending:yt}),dn=new D(Lt,yn);dn.rotation.x=-Math.PI/2,dn.position.set(ct,0,-26),g.add(dn),N.push(dn)}return g},k_=()=>{const g=new mt;g.position.set(880,240,-820);const w=new Ae(65,16,16),K=new ye({visible:!1});C=new D(w,K),C.userData={body:j},g.add(C);const G=new Ae(22,32,32),H=new ye({color:0}),z=new D(G,H);z.userData={body:j},g.add(z);const ge=new Ae(22.8,32,32),de=new ye({color:16777215,transparent:!0,opacity:.35}),b=new D(ge,de);g.add(b);const X=document.createElement("canvas");X.width=512,X.height=512;const V=X.getContext("2d");V.clearRect(0,0,512,512);const Q=V.createRadialGradient(256,256,80,256,256,250);Q.addColorStop(0,"rgba(255, 255, 255, 0.95)"),Q.addColorStop(.15,"rgba(254, 240, 138, 0.85)"),Q.addColorStop(.4,"rgba(245, 158, 11, 0.65)"),Q.addColorStop(.7,"rgba(217, 70, 239, 0.35)"),Q.addColorStop(1,"rgba(0, 0, 0, 0)"),V.fillStyle=Q,V.beginPath(),V.arc(256,256,250,0,Math.PI*2),V.fill(),V.strokeStyle="rgba(255, 255, 255, 0.4)",V.lineWidth=2;for(let ut=0;ut<36;ut++){const Xt=ut/36*Math.PI*2;V.beginPath(),V.arc(256,256,120+Math.sin(ut)*40,Xt,Xt+.4),V.stroke()}const me=new An(X),Me=new kn(25,78,64),Ve=new ye({map:me,side:Nt,transparent:!0,opacity:.9,depthWrite:!1,blending:yt});_=new D(Me,Ve),_.rotation.x=Math.PI/2.5,_.rotation.y=.25,g.add(_);const tt=new kn(24,72,64),ct=new ye({map:me,side:Nt,transparent:!0,opacity:.6,depthWrite:!1,blending:yt});return W=new D(tt,ct),W.rotation.y=Math.PI/2.2,g.add(W),g},B_=()=>{const g=new mt;g.position.set(-860,320,780);const w=new Ae(50,16,16),K=new ye({visible:!1});Ce=new D(w,K),Ce.userData={body:ue},g.add(Ce);const G=new Ae(12,24,24),H=new ye({color:16777215}),z=new D(G,H);z.userData={body:ue},g.add(z);const ge=new Ae(16,24,24),de=new ye({color:11032055,transparent:!0,opacity:.5,wireframe:!0}),b=new D(ge,de);g.add(b),Ne=new mt;const X=new xn(12,160,24,1,!0),V=new ye({color:3718648,transparent:!0,opacity:.35,side:Nt,depthWrite:!1,blending:yt}),Q=new D(X,V);Q.position.y=86,Ne.add(Q);const me=new D(X,V);return me.rotation.x=Math.PI,me.position.y=-86,Ne.add(me),g.add(Ne),g},G_=()=>{const g=new mt,w=new Ae(22,16,16),K=new ye({visible:!1});Le=new D(w,K),Le.userData={body:Ge},g.add(Le);const G=new At(12,2.5,4.5,24,1,!0),H=new Ue({color:16096779,metalness:.95,roughness:.15,side:Nt}),z=new D(G,H);z.rotation.x=Math.PI/2,z.userData={body:Ge},g.add(z);const ge=new At(.5,.5,9,8),de=new Ue({color:9741240,metalness:.8,roughness:.2}),b=new D(ge,de);b.rotation.x=Math.PI/2,b.position.z=5,g.add(b);const X=new Ae(.9,12,12);Je=new ye({color:61695});const V=new D(X,Je);V.position.z=9.8,g.add(V);const Q=new At(5.5,5.5,8,6),me=new Ue({color:3359061,metalness:.85,roughness:.3}),Me=new D(Q,me);Me.rotation.x=Math.PI/2,Me.position.z=-5.5,g.add(Me);const Ve=new At(.6,.6,18,8),tt=new D(Ve,de);tt.rotation.z=Math.PI/2,tt.position.set(0,0,-6),g.add(tt);const ct=new At(1.5,1.5,4,8),ut=new D(ct,me);return ut.position.set(10,0,-6),g.add(ut),g},z_=()=>{const g=new mt,w=new Ae(36,16,16),K=new ye({visible:!1});lt=new D(w,K),lt.userData={body:Y},g.add(lt);const G=new Ae(18,32,32),H=new Ue({map:ip("#083344","#06b6d4"),roughness:.45,metalness:.15});ft=new D(G,H),ft.userData={body:Y},g.add(ft);const z=new kn(24,34,64),ge=new ye({color:2282478,side:Nt,transparent:!0,opacity:.75,blending:yt,depthWrite:!1}),de=new D(z,ge);de.rotation.x=Math.PI/3,g.add(de);const b=new kn(37,45,64),X=new ye({color:561586,side:Nt,transparent:!0,opacity:.5,blending:yt,depthWrite:!1}),V=new D(b,X);V.rotation.x=Math.PI/3,g.add(V);const Q=new Ae(3.5,16,16),me=new Ue({color:9741240,roughness:.8});return St=new D(Q,me),g.add(St),g},H_=()=>{const g=new mt,w=new Ae(28,16,16),K=new ye({visible:!1});ve=new D(w,K),ve.userData={body:ze},g.add(ve);const G=new vt(32,.4,18),H=new Ue({color:14870768,metalness:.95,roughness:.2}),z=new D(G,H);z.rotation.x=.2,z.userData={body:ze},g.add(z);const ge=new At(11,11,1.2,6),de=new Ue({color:16096779,metalness:.98,roughness:.1}),b=new D(ge,de);b.rotation.x=Math.PI/2+.2,b.position.set(0,4,-2),b.userData={body:ze},g.add(b);const X=new At(.3,.3,14,6),V=new Ue({color:1976635,metalness:.8,roughness:.3}),Q=[0,Math.PI*2/3,Math.PI*4/3];for(const Ve of Q){const tt=new D(X,V);tt.position.set(Math.cos(Ve)*6,7,Math.sin(Ve)*6-2),tt.rotation.x=.45,tt.rotation.z=Math.sin(Ve)*.4,g.add(tt)}const me=new At(2,2,.5,6),Me=new D(me,de);return Me.position.set(0,12,4),g.add(Me),g},V_=()=>{const g=new mt;g.position.set(-920,-260,-720);const w=new Ae(65,16,16),K=new ye({visible:!1});Se=new D(w,K),Se.userData={body:it},g.add(Se);const G=new Ae(8,24,24),H=new ye({color:16777215}),z=new D(G,H);z.userData={body:it},g.add(z);const ge=new Ae(14,16,16),de=new ye({color:3718648,transparent:!0,opacity:.6,side:vn,blending:yt}),b=new D(ge,de);g.add(b),rt.length=0;const X=[{inner:16,outer:34,color:440020,opacity:.55},{inner:32,outer:54,color:1096065,opacity:.45},{inner:52,outer:80,color:15485081,opacity:.4},{inner:76,outer:98,color:9647082,opacity:.3}];for(const V of X){const Q=new kn(V.inner,V.outer,64),me=new ye({color:V.color,side:Nt,transparent:!0,opacity:V.opacity,depthWrite:!1,blending:yt}),Me=new D(Q,me);Me.rotation.x=Math.PI/2.8,Me.rotation.y=.2,g.add(Me),rt.push(Me)}return g},W_=()=>{const g=new mt;g.position.set(450,350,850);const w=new Ae(65,16,16),K=new ye({visible:!1});Ht=new D(w,K),Ht.userData={body:Ln},g.add(Ht);const G=new Ue({color:14870768,metalness:.88,roughness:.2}),H=new xn(24,68,4),z=new D(H,G);z.rotation.x=Math.PI/2,z.scale.set(1.4,1,.4),z.userData={body:Ln},g.add(z);const ge=new Ae(7.5,24,24),de=new ye({color:12616956,transparent:!0,opacity:.9});Qn=new D(ge,de),g.add(Qn);const b=new xn(3,9,3),X=[{x:18,z:8},{x:-18,z:8},{x:14,z:-14},{x:-14,z:-14}];for(const V of X){const Q=new D(b,G);Q.position.set(V.x,3,V.z),Q.rotation.x=Math.PI/2,g.add(Q)}return g},X_=()=>{const g=new mt,w=new Ae(24,16,16),K=new ye({visible:!1});rr=new D(w,K),rr.userData={body:Ci},g.add(rr);const G=new vt(4,16,36),H=new Ue({color:328965,metalness:.98,roughness:.05}),z=new D(G,H);z.userData={body:Ci},g.add(z);const ge=new vt(4.2,16.2,36.2);or=new ye({color:3718648,wireframe:!0,transparent:!0,opacity:.45,blending:yt});const de=new D(ge,or);return g.add(de),g},Y_=()=>{const g=new mt,w=new Ae(22,16,16),K=new ye({visible:!1});Ts=new D(w,K),Ts.userData={body:Gi},g.add(Ts);const G=new At(2.4,4.2,28,8),H=new Ue({color:10424889,roughness:.92,metalness:.1,flatShading:!0}),z=new D(G,H);return z.rotation.z=Math.PI/4,z.userData={body:Gi},g.add(z),g},q_=()=>{const g=new mt,w=new Ae(24,16,16),K=new ye({visible:!1});ss=new D(w,K),ss.userData={body:zi},g.add(ss);const G=new Fr(26,26),H=new Ue({color:10875900,metalness:.96,roughness:.08,side:Nt,transparent:!0,opacity:.8});ar=new D(G,H),ar.rotation.z=Math.PI/4,ar.userData={body:zi},g.add(ar);const z=new At(.35,.35,36,6),ge=new Ue({color:1976635,metalness:.8,roughness:.3}),de=new D(z,ge);g.add(de);const b=new D(z,ge);b.rotation.z=Math.PI/2,g.add(b);const X=new vt(3.5,3.5,3.5),V=new Ue({color:16096779,metalness:.9,roughness:.2}),Q=new D(X,V);return g.add(Q),g},K_=()=>{const g=new mt;g.position.set(-1050,-180,480);const w=new Ae(60,16,16),K=new ye({visible:!1});As=new D(w,K),As.userData={body:Wr},g.add(As);const G=new Ae(18,32,32),H=new ye({map:tp()});oi=new D(G,H),oi.position.set(-24,0,0),oi.userData={body:Wr},g.add(oi);const z=new Ae(7,24,24),ge=new ye({color:14742270});bi=new D(z,ge),bi.position.set(32,0,0),bi.userData={body:Wr},g.add(bi);const de=[new L(-14,0,0),new L(0,4,3),new L(25,0,0)],b=new Jt().setFromPoints(de),X=new ms({color:16638023,transparent:!0,opacity:.7,blending:yt});return lr=new Xc(b,X),g.add(lr),g},$_=()=>{const g=new mt;g.position.set(-680,380,-650);const w=new Ae(65,16,16),K=new ye({visible:!1});ur=new D(w,K),ur.userData={body:E},g.add(ur),Xr.length=0;const G=[{inner:15,outer:26,color:3718648,opacity:.85},{inner:27,outer:42,color:11032055,opacity:.7},{inner:44,outer:65,color:15485081,opacity:.55},{inner:68,outer:90,color:440020,opacity:.35}];for(const de of G){const b=new kn(de.inner,de.outer,64),X=new ye({color:de.color,side:Nt,transparent:!0,opacity:de.opacity,depthWrite:!1,blending:yt}),V=new D(b,X);V.rotation.x=Math.PI/2.6,g.add(V),Xr.push(V)}const H=new Ae(14,24,24),z=new ye({color:0}),ge=new D(H,z);return ge.userData={body:E},g.add(ge),g},Z_=()=>{const g=new mt,w=new Ae(22,16,16),K=new ye({visible:!1});oe=new D(w,K),oe.userData={body:te},g.add(oe);const G=new Ue({color:16777215,metalness:.4,roughness:.2}),H=new Ue({color:16347926,metalness:.7,roughness:.25}),z=new ye({color:61695}),ge=new xn(3.5,22,4),de=new D(ge,G);de.rotation.y=Math.PI/4,de.rotation.x=Math.PI/2,de.userData={body:te},g.add(de);const b=new vt(2.4,1.8,6),X=new D(b,z);X.position.set(0,1.5,3),g.add(X);const V=new vt(22,.4,10),Q=new D(V,H);Q.position.set(0,0,-2),g.add(Q),ne.length=0;const me=new xn(1.8,14,12,1,!0),Me=new ye({color:16347926,transparent:!0,opacity:.85,side:Nt,depthWrite:!1,blending:yt}),Ve=[-3.5,3.5];for(const tt of Ve){const ct=new D(me,Me);ct.rotation.x=-Math.PI/2,ct.position.set(tt,0,-16),g.add(ct),ne.push(ct)}return g},j_=()=>{const g=new mt,w=new Ae(26,16,16),K=new ye({visible:!1});et=new D(w,K),et.userData={body:nt},g.add(et);const G=new Xs(16,1),H=new Ue({color:14742270,metalness:.9,roughness:.05,transparent:!0,opacity:.75}),z=new D(G,H);z.userData={body:nt},g.add(z);const ge=new Xs(16.5,1),de=new ye({color:3718648,wireframe:!0,transparent:!0,opacity:.65,blending:yt}),b=new D(ge,de);g.add(b);const X=new Ae(6,16,16),V=new ye({color:16777215,transparent:!0,opacity:.8});return Ye=new D(X,V),g.add(Ye),g},J_=()=>{const g=new mt,w=new Ae(32,16,16),K=new ye({visible:!1});Mt=new D(w,K),Mt.userData={body:wt},g.add(Mt);const G=new Ue({color:9741240,metalness:.8,roughness:.3}),H=new At(2,2,50,8),z=new D(H,G);z.userData={body:wt},g.add(z);const ge=new vt(36,2,4),de=new D(ge,G);de.position.y=8,g.add(de);const b=[3718648,16096779,15680580,1096065],X=new vt(5,4,7);for(let Ve=0;Ve<4;Ve++){const tt=new Ue({color:b[Ve],roughness:.4}),ct=new D(X,tt);ct.position.set(-12+Ve*8,4,Ve%2===0?3:-3),g.add(ct)}const V=new Ae(.8,8,8),Q=new ye({color:3718648}),me=new D(V,Q);me.position.set(18,9,0);const Me=new D(V,Q);return Me.position.set(-18,9,0),g.add(me),g.add(Me),g},Q_=()=>{const g=new mt;g.position.set(980,-220,620);const w=new Ae(45,16,16),K=new ye({visible:!1});Bt=new D(w,K),Bt.userData={body:rn},g.add(Bt);const G=document.createElement("canvas");G.width=512,G.height=256;const H=G.getContext("2d");H.fillStyle="#1c1917",H.fillRect(0,0,512,256),H.strokeStyle="#ef4444",H.lineWidth=4;for(let Q=0;Q<24;Q++)H.beginPath(),H.moveTo(Math.random()*512,Math.random()*256),H.bezierCurveTo(Math.random()*512,Math.random()*256,Math.random()*512,Math.random()*256,Math.random()*512,Math.random()*256),H.stroke();H.fillStyle="#fde047";for(let Q=0;Q<20;Q++)H.beginPath(),H.arc(Math.random()*512,Math.random()*256,Math.random()*8+3,0,Math.PI*2),H.fill();const z=new An(G);z.wrapS=wi;const ge=new Ae(22,32,32),de=new Ue({map:z,emissive:10033947,emissiveIntensity:.65,roughness:.8});nn=new D(ge,de),nn.userData={body:rn},g.add(nn);const b=new Ae(26,24,24),X=new ye({color:15680580,transparent:!0,opacity:.35,side:vn,blending:yt}),V=new D(b,X);return g.add(V),g},ex=()=>{const g=new mt;g.position.set(-520,-360,920);const w=new Ae(45,16,16),K=new ye({visible:!1});_n=new D(w,K),_n.userData={body:zn},g.add(_n);const G=new Ae(10,24,24),H=new ye({color:16777215}),z=new D(G,H);z.userData={body:zn},g.add(z),Qe.length=0;const ge=[18,28,38],de=[61695,3718648,11032055];for(let b=0;b<3;b++){const X=new Bn(ge[b],.6,12,36),V=new ye({color:de[b],wireframe:!0,transparent:!0,opacity:.65,blending:yt}),Q=new D(X,V);Q.rotation.x=b*Math.PI/3,Q.rotation.y=b*Math.PI/4,g.add(Q),Qe.push(Q)}return g},tx=()=>{const g=new mt,w=new Ae(26,16,16),K=new ye({visible:!1});Nn=new D(w,K),Nn.userData={body:Un},g.add(Nn);const G=new Ue({color:15857145,metalness:.9,roughness:.2}),H=new ye({color:1096065}),z=[{x:0,y:0,z:8},{x:-10,y:3,z:-8},{x:10,y:-3,z:-8}];for(const ge of z){const de=new mt;de.position.set(ge.x,ge.y,ge.z);const b=new xn(3,8,3),X=new D(b,G);X.rotation.x=Math.PI/2,X.userData={body:Un},de.add(X);const V=new Ae(.8,8,8),Q=new D(V,H);Q.position.set(0,0,4.2),de.add(Q),g.add(de)}return g},nx=()=>{const g=new mt,w=new Ae(30,16,16),K=new ye({visible:!1});yi=new D(w,K),yi.userData={body:Zt},g.add(yi);const G=new Dr(15,1),H=new Ue({color:16096779,metalness:.92,roughness:.25,flatShading:!0}),z=new D(G,H);z.userData={body:Zt},g.add(z);const ge=new vt(8,6,8),de=new Ue({color:3359061,metalness:.8,roughness:.3}),b=new D(ge,de);b.position.set(0,14,0),g.add(b);const X=new Ae(1.2,8,8);Vt=new ye({color:16498468});const V=new D(X,Vt);return V.position.set(0,18,0),g.add(V),g},ix=()=>{const g=new mt;g.position.set(-1050,480,-880);const w=new Ae(45,16,16),K=new ye({visible:!1});Wt=new D(w,K),Wt.userData={body:Vi},g.add(Wt);const G=new Bn(36,1.2,16,64),H=new Ue({color:16096779,metalness:.85,roughness:.25}),z=new D(G,H);z.rotation.x=Math.PI/2,g.add(z);const ge=new vt(14,.6,6),de=new Ue({color:14251782,metalness:.9,roughness:.2,emissive:7877903,emissiveIntensity:.4});for(let ct=0;ct<8;ct++){const ut=ct*Math.PI*2/8,Xt=new D(ge,de);Xt.position.set(Math.cos(ut)*36,0,Math.sin(ut)*36),Xt.rotation.y=-ut,g.add(Xt)}const b=new Ae(10,24,24);ui=new ye({color:16776171});const X=new D(b,ui);X.userData={body:Vi},g.add(X);const V=new kn(11,16,32),Q=new ye({color:16498468,transparent:!0,opacity:.6,side:Nt,blending:yt}),me=new D(V,Q);me.rotation.x=Math.PI/2,g.add(me);const Me=new At(.8,.8,90,16),Ve=new ye({color:61695,transparent:!0,opacity:.55,blending:yt}),tt=new D(Me,Ve);return g.add(tt),g},sx=()=>{const g=new mt;g.position.set(-950,-420,680);const w=new Ae(38,16,16),K=new ye({visible:!1});ta=new D(w,K),ta.userData={body:Iu},g.add(ta);const G=new Wf(20,2),H=new Ue({color:3718648,roughness:.1,metalness:.6,flatShading:!0});Yr=new D(G,H),Yr.userData={body:Iu},g.add(Yr);const z=new Ae(23,24,24),ge=new ye({color:61695,transparent:!0,opacity:.28,side:vn,blending:yt}),de=new D(z,ge);g.add(de);const b=new kn(28,38,48),X=new ye({color:8246268,transparent:!0,opacity:.55,side:Nt,blending:yt}),V=new D(b,X);V.rotation.x=Math.PI/3,V.rotation.y=.2,g.add(V);const Q=new kn(41,48,48),me=new ye({color:12616956,transparent:!0,opacity:.45,side:Nt,blending:yt}),Me=new D(Q,me);Me.rotation.x=Math.PI/3,Me.rotation.y=.2,g.add(Me),qr.length=0;const Ve=new Xs(2.5,0),tt=new Ue({color:14742270,metalness:.8,roughness:.1});for(let ct=0;ct<4;ct++){const ut=new D(Ve,tt);g.add(ut),qr.push(ut)}return g},rx=()=>{const g=new mt;g.position.set(1180,-460,880);const w=new Ae(45,16,16),K=new ye({visible:!1});ia=new D(w,K),ia.userData={body:Qf},g.add(ia),sa.length=0;const G=[36,26,16],H=[8141549,440020,15485081];for(let V=0;V<3;V++){const Q=new Bn(G[V],1.2,16,48),me=new Ue({color:1973067,metalness:.9,roughness:.2,emissive:H[V],emissiveIntensity:.6}),Me=new D(Q,me);Me.rotation.x=V*Math.PI/4,Me.rotation.y=V*Math.PI/6,g.add(Me),sa.push(Me)}const z=new Vf(14,32),ge=new ye({color:12616956,transparent:!0,opacity:.75,side:Nt,blending:yt});Rl=new D(z,ge),g.add(Rl);const de=new xn(2.5,16,4),b=new Ue({color:4674921,metalness:.85,roughness:.2}),X=new ye({color:61695});for(let V=0;V<4;V++){const Q=V*Math.PI/2,me=new D(de,b);me.position.set(Math.cos(Q)*42,Math.sin(Q)*42,0),me.rotation.z=Q-Math.PI/2,g.add(me);const Me=new D(new Ae(1.2,8,8),X);Me.position.set(Math.cos(Q)*50,Math.sin(Q)*50,0),g.add(Me)}return g},ox=()=>{const g=new mt;g.position.set(1420,260,180);const w=new Ae(45,16,16),K=new ye({visible:!1});oa=new D(w,K),oa.userData={body:Lu},g.add(oa);const G=document.createElement("canvas");G.width=512,G.height=256;const H=G.getContext("2d"),z=["#064e3b","#047857","#059669","#10b981","#34d399","#0f766e","#14b8a6","#2dd4bf","#0284c7","#0369a1","#065f46","#047857","#10b981","#f59e0b","#064e3b"];for(let tt=0;tt<z.length;tt++)H.fillStyle=z[tt],H.fillRect(0,tt*256/z.length,512,256/z.length+1);H.fillStyle="#6ee7b7",H.beginPath(),H.ellipse(320,175,45,22,.1,0,Math.PI*2),H.fill();const ge=new An(G);ge.wrapS=wi;const de=new Ae(28,36,36),b=new Ue({map:ge,roughness:.75,metalness:.15});aa=new D(de,b),aa.userData={body:Lu},g.add(aa);const X=new kn(38,62,64),V=new ye({color:7268279,transparent:!0,opacity:.45,side:Nt,blending:yt}),Q=new D(X,V);Q.rotation.x=Math.PI/2.6,Q.rotation.y=.15,g.add(Q),Pl.length=0;const me=new Ue({color:13358561,roughness:.8}),Me=new D(new Ae(2,12,12),me),Ve=new D(new Ae(1.5,12,12),me);return g.add(Me),g.add(Ve),Pl.push(Me,Ve),g},ax=()=>{const g=new mt;g.position.set(-1400,520,350);const w=new Ae(50,16,16),K=new ye({visible:!1});la=new D(w,K),la.userData={body:Dl},g.add(la);const G=new Ue({color:6809849,emissive:561586,emissiveIntensity:.5,metalness:.3,roughness:.3});ca.length=0;for(let X=0;X<10;X++){const V=(X-5)*12,Q=new At(2.5,3,8,8),me=new D(Q,G);me.position.set(0,Math.sin(X*.5)*4,V),me.rotation.x=Math.PI/2,me.userData={body:Dl},g.add(me);const Me=new Bn(12-X*.6,.9,8,24,Math.PI*.85),Ve=new D(Me,G);Ve.position.set(-4,Math.sin(X*.5)*4,V),Ve.rotation.y=Math.PI/2,Ve.rotation.z=.3,g.add(Ve),ca.push(Ve);const tt=new D(Me,G);tt.position.set(4,Math.sin(X*.5)*4,V),tt.rotation.y=-Math.PI/2,tt.rotation.z=-.3,g.add(tt),ca.push(tt)}const H=new Dr(7,0),z=new ye({color:15485081});$r=new D(H,z),$r.position.set(0,2,-5),$r.userData={body:Dl},g.add($r);const ge=new Ae(10,16,16),de=new ye({color:15485081,transparent:!0,opacity:.35,side:vn,blending:yt}),b=new D(ge,de);return b.position.set(0,2,-5),g.add(b),g},lx=()=>{const g=new mt;g.position.set(850,480,1150);const w=new Ae(55,16,16),K=new ye({visible:!1});ua=new D(w,K),ua.userData={body:Nu},g.add(ua);const G=document.createElement("canvas");G.width=512,G.height=128;const H=G.getContext("2d");H.fillStyle="#0284c7",H.fillRect(0,0,512,128),H.fillStyle="#16a34a";for(let me=0;me<16;me++)H.beginPath(),H.ellipse(me*32+16,64,18,42,0,0,Math.PI*2),H.fill();H.fillStyle="#22c55e";for(let me=0;me<12;me++)H.beginPath(),H.arc(me*42+20,64,15,0,Math.PI*2),H.fill();H.fillStyle="rgba(255, 255, 255, 0.65)";for(let me=0;me<20;me++)H.beginPath(),H.ellipse(Math.random()*512,Math.random()*128,25,10,.2,0,Math.PI*2),H.fill();const z=new An(G);z.wrapS=wi;const ge=new At(44,44,16,64,1,!0),de=new Ue({map:z,side:Nt,roughness:.5,metalness:.2});da=new D(ge,de),da.userData={body:Nu},g.add(da);const b=new Bn(44.2,1,12,64),X=new Ue({color:3359061,metalness:.9,roughness:.2}),V=new D(b,X);V.rotation.x=Math.PI/2,V.position.y=8,g.add(V);const Q=new D(b,X);Q.rotation.x=Math.PI/2,Q.position.y=-8,g.add(Q);for(let me=0;me<4;me++){const Me=me*Math.PI/2,Ve=new At(.5,1.2,14,8),tt=new Ue({color:6583435,metalness:.8}),ct=new D(Ve,tt);ct.position.set(Math.cos(Me)*44,15,Math.sin(Me)*44),g.add(ct);const ut=new Ae(.9,8,8),Xt=new ye({color:2278750}),Et=new D(ut,Xt);Et.position.set(Math.cos(Me)*44,22,Math.sin(Me)*44),g.add(Et)}return g},cx=()=>{const g=new mt;g.position.set(-1350,-520,-1100);const w=new Ae(45,16,16),K=new ye({visible:!1});fa=new D(w,K),fa.userData={body:Uu},g.add(fa);const G=new Ae(16,32,32),H=new ye({color:16772565}),z=new D(G,H);z.userData={body:Uu},g.add(z);const ge=new Ae(20,24,24),de=new ye({color:16347926,transparent:!0,opacity:.55,side:vn,blending:yt}),b=new D(ge,de);g.add(b);const X=new kn(24,52,48),V=new ye({color:16096779,transparent:!0,opacity:.65,side:Nt,blending:yt});ma=new D(X,V),ma.rotation.x=Math.PI/2.5,g.add(ma),pa.length=0;const Q=new xn(8,120,16,1,!0),me=new ye({color:61695,transparent:!0,opacity:.65,side:Nt,blending:yt,depthWrite:!1}),Me=new D(Q,me);Me.position.y=65,g.add(Me),pa.push(Me);const Ve=new D(Q,me);return Ve.rotation.x=Math.PI,Ve.position.y=-65,g.add(Ve),pa.push(Ve),g},ux=()=>{const g=new mt;g.position.set(-650,580,-1250);const w=new Ae(40,16,16),K=new ye({visible:!1});_a=new D(w,K),_a.userData={body:Fu},g.add(_a);const G=new vt(30,30,30),H=new zm(G),z=new ms({color:14239471,transparent:!0,opacity:.85,linewidth:2});jr=new bc(H,z),jr.userData={body:Fu},g.add(jr);const ge=new vt(16,16,16),de=new zm(ge),b=new ms({color:61695,transparent:!0,opacity:.95});Jr=new bc(de,b),g.add(Jr);const X=[],V=[[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]];for(const ut of V)X.push(new L(ut[0]*15,ut[1]*15,ut[2]*15)),X.push(new L(ut[0]*8,ut[1]*8,ut[2]*8));const Q=new Jt().setFromPoints(X),me=new ms({color:11032055,transparent:!0,opacity:.65}),Me=new bc(Q,me);g.add(Me);const Ve=new Ae(3.5,16,16),tt=new ye({color:16777215}),ct=new D(Ve,tt);return g.add(ct),g},dx=()=>{const g=new mt;g.position.set(450,-420,-1200);const w=new Ae(48,16,16),K=new ye({visible:!1});xa=new D(w,K),xa.userData={body:Ou},g.add(xa);const G=new Ue({color:1976635,metalness:.85,roughness:.25}),H=new D(new vt(40,8,10),G);H.position.z=12,H.userData={body:Ou},g.add(H);const z=new D(new vt(40,8,10),G);z.position.z=-12,g.add(z);const ge=new Ae(11,24,24),de=new Ue({color:15357964,emissive:12730636,emissiveIntensity:.8,roughness:.3});Il=new D(ge,de),g.add(Il),va.length=0;for(let V=0;V<3;V++){const Q=new Bn(14+V*3,.8,12,36),me=new ye({color:16096779,wireframe:!0,transparent:!0,opacity:.7,blending:yt}),Me=new D(Q,me);Me.rotation.x=V*Math.PI/3,Me.rotation.y=V*Math.PI/4,g.add(Me),va.push(Me)}const b=new vt(1.5,20,8),X=new Ue({color:10033947,emissive:8330525,emissiveIntensity:.5,metalness:.7});for(let V=0;V<4;V++){const Q=new D(b,X);Q.position.set((V-1.5)*9,12,0),g.add(Q)}return g},hx=()=>{const g=new mt;g.position.set(1500,-320,-650);const w=new Ae(45,16,16),K=new ye({visible:!1});ba=new D(w,K),ba.userData={body:ku},g.add(ba);const G=new Dr(16,1),H=new Ue({color:988970,metalness:.9,roughness:.2,flatShading:!0}),z=new D(G,H);z.userData={body:ku},g.add(z);const ge=new xn(3.5,26,6),de=new Ue({color:9133302,emissive:5774471,emissiveIntensity:.45,metalness:.8,roughness:.1,flatShading:!0}),b=[[1,.5,.5],[-1,.6,.4],[.3,1,.5],[-.4,-1,.6],[.5,-.4,1],[-.5,.3,-1],[.8,-.8,-.5],[-.7,.7,-.6]];for(const Q of b){const me=new L(Q[0],Q[1],Q[2]).normalize(),Me=new D(ge,de);Me.position.copy(me.clone().multiplyScalar(14)),Me.quaternion.setFromUnitVectors(new L(0,1,0),me),g.add(Me)}eo.length=0;const X=new Xs(1.8,0),V=new ye({color:12891645});for(let Q=0;Q<10;Q++){const me=new D(X,V);g.add(me),eo.push(me)}return g},fx=()=>{const g=document.createElement("canvas");g.width=512,g.height=320;const w=g.getContext("2d");return w.fillStyle="#050c1a",w.fillRect(0,0,512,320),w.fillStyle="#0f172a",w.fillRect(0,0,512,28),w.fillStyle="#ef4444",w.beginPath(),w.arc(16,14,5,0,Math.PI*2),w.fill(),w.fillStyle="#eab308",w.beginPath(),w.arc(32,14,5,0,Math.PI*2),w.fill(),w.fillStyle="#22c55e",w.beginPath(),w.arc(48,14,5,0,Math.PI*2),w.fill(),w.fillStyle="#64748b",w.font="11px monospace",w.fillText("zsh - anko@quantum-macbook: ~/portfolio-vuejs",70,18),w.font="bold 13px monospace",w.fillStyle="#38bdf8",w.fillText("> bun run dev --host",18,56),w.fillStyle="#a855f7",w.fillText("  VITE v5.4.20 ready in 42 ms",18,82),w.fillStyle="#22c55e",w.fillText("  ➜  Local:   http://localhost:5173/",18,108),w.fillText("  ➜  Network: http://192.168.1.10:5173/",18,128),w.fillStyle="#f59e0b",w.fillText("  [SYSTEM] Quantum Core: 128-Core Matrix Active",18,160),w.fillStyle="#06b6d4",w.fillText("  [TS-CHECK] vue-tsc --noEmit: 0 ERRORS FOUND ✓",18,188),w.fillStyle="#ec4899",w.fillText("  [AGENT] Antigravity 2.0 Pair Programming Online",18,216),w.fillStyle="#ffffff",w.fillText('  const dev = { name: "Anko", role: "Full-Stack" };',18,248),w.fillStyle="#00f0ff",w.fillText('  console.log("Welcome to Cosmos Portfolio 🚀");',18,276),w.fillStyle="#22c55e",w.fillRect(18,290,10,14),new An(g)},px=()=>{const g=document.createElement("canvas");g.width=256,g.height=256;const w=g.getContext("2d");w.fillStyle="#ca8a04",w.fillRect(0,0,256,256),w.strokeStyle="#eab308",w.lineWidth=1;for(let K=15;K<120;K+=3)w.beginPath(),w.arc(128,128,K,0,Math.PI*2),w.stroke();return w.fillStyle="#1e293b",w.beginPath(),w.arc(128,128,26,0,Math.PI*2),w.fill(),w.fillStyle="#000000",w.beginPath(),w.arc(128,128,6,0,Math.PI*2),w.fill(),new An(g)},mx=()=>{const g=document.createElement("canvas");g.width=512,g.height=256;const w=g.getContext("2d"),K=w.createLinearGradient(0,0,0,256);K.addColorStop(0,"#0c4a6e"),K.addColorStop(.2,"#0284c7"),K.addColorStop(.4,"#0369a1"),K.addColorStop(.6,"#0ea5e9"),K.addColorStop(.8,"#0369a1"),K.addColorStop(1,"#082f49"),w.fillStyle=K,w.fillRect(0,0,512,256),w.fillStyle="rgba(224, 242, 254, 0.45)";for(let G=0;G<24;G++){const H=Math.random()*256;w.beginPath(),w.ellipse(Math.random()*512,H,Math.random()*90+40,Math.random()*12+4,0,0,Math.PI*2),w.fill()}return new An(g)},gx=()=>{const g=new mt;g.position.set(-350,320,-180);const w=new Ae(32,16,16),K=new ye({visible:!1});ya=new D(w,K),ya.userData={body:Bu},g.add(ya);const G=new Ue({color:16766720,metalness:.95,roughness:.15}),H=new At(18,19,6,32,1,!0),z=new D(H,G);z.userData={body:Bu},g.add(z);const ge=new D(new Bn(19.2,.9,12,48),G);ge.rotation.x=Math.PI/2,ge.position.y=-3,g.add(ge);const de=new D(new Bn(18.2,.9,12,48),G);de.rotation.x=Math.PI/2,de.position.y=3,g.add(de);const b=new Ue({color:7020968,roughness:.9,metalness:.1}),X=new Ae(17,24,16,0,Math.PI*2,0,Math.PI*.45),V=new D(X,b);V.position.y=0,g.add(V);const Q=new Ue({color:15680580,emissive:10033947,emissiveIntensity:.6,roughness:.1,metalness:.2}),me=new Ue({color:1096065,emissive:417606,emissiveIntensity:.6,roughness:.1,metalness:.2});for(let ct=0;ct<5;ct++){const ut=ct*Math.PI*2/5,Xt=new xn(3.2,14,4),Et=new D(Xt,G);Et.position.set(Math.cos(ut)*18,9,Math.sin(ut)*18),Et.rotation.y=-ut,g.add(Et);const Lt=new D(new Ae(1.5,12,12),G);Lt.position.set(Math.cos(ut)*18,16.5,Math.sin(ut)*18),g.add(Lt);const yn=new Dr(1.8,0),dn=new D(yn,ct%2===0?Q:me);dn.position.set(Math.cos(ut)*19.2,3,Math.sin(ut)*19.2),g.add(dn)}const Me=new D(new vt(1.2,6,1.2),G);Me.position.y=17,g.add(Me);const Ve=new D(new vt(4,1.2,1.2),G);Ve.position.y=18,g.add(Ve),to.length=0;const tt=new Ue({color:16777215,emissive:16707722,emissiveIntensity:.7,roughness:.1,metalness:.9});for(let ct=0;ct<6;ct++){const ut=new D(new Xs(1.4,0),tt);g.add(ut),to.push(ut)}return g},_x=()=>{const g=new mt;g.position.set(320,160,360);const w=new Ae(32,16,16),K=new ye({visible:!1});Ma=new D(w,K),Ma.userData={body:Gu},g.add(Ma);const G=new Ue({color:165063,metalness:.85,roughness:.18}),H=new Ue({color:16317180,metalness:.5,roughness:.3}),z=new Ue({color:1579035,metalness:.6,roughness:.5}),ge=new Ue({color:14870768,metalness:.95,roughness:.1}),de=new D(new vt(6,2.5,24),H);de.position.set(0,0,2),de.userData={body:Gu},g.add(de);const b=new D(new vt(10,1.2,12),z);b.position.set(0,1.2,5),g.add(b);const X=new D(new vt(9,14,10),G);X.position.set(0,8,14),X.rotation.x=-.3,g.add(X);const V=new ye({color:6809849}),Q=new D(new vt(7,3.5,2),V);Q.position.set(0,8.5,19.5),Q.rotation.x=-.3,g.add(Q);const me=new xn(8,55,16,1,!0),Me=new ye({color:3718648,transparent:!0,opacity:.25,side:Nt,blending:yt,depthWrite:!1}),Ve=new D(me,Me);Ve.rotation.x=-Math.PI/2,Ve.position.set(0,8,48),g.add(Ve);const tt=new D(new At(.7,.7,16,8),ge);tt.rotation.z=Math.PI/2,tt.position.set(0,15.5,13),g.add(tt);const ct=new D(new At(1,1,4,8),z);ct.rotation.z=Math.PI/2,ct.position.set(-7,15.5,13),g.add(ct);const ut=new D(new At(1,1,4,8),z);ut.rotation.z=Math.PI/2,ut.position.set(7,15.5,13),g.add(ut);const Xt=new At(1.6,1.6,.4,12),Et=new Ue({color:988970,metalness:.9}),Lt=new D(new At(.3,.3,5,6),ge);Lt.position.set(-6,18,12),Lt.rotation.z=-.3,g.add(Lt);const yn=new D(Xt,Et);yn.position.set(-7.5,20.5,12),g.add(yn);const dn=new D(new At(.3,.3,5,6),ge);dn.position.set(6,18,12),dn.rotation.z=.3,g.add(dn);const ai=new D(Xt,Et);ai.position.set(7.5,20.5,12),g.add(ai);const Mn=new D(new vt(8,4,18),z);Mn.position.set(0,6,-3),Mn.rotation.x=-.05,g.add(Mn);const En=new D(new vt(9,7,16),G);En.position.set(0,3,-4),g.add(En);const xt=new D(new vt(6,3,2),new ye({color:15680580}));xt.position.set(0,4.5,-12),g.add(xt);const Rt=document.createElement("canvas");Rt.width=128,Rt.height=64;const Sn=Rt.getContext("2d");Sn.fillStyle="#000000",Sn.fillRect(0,0,128,64),Sn.strokeStyle="#ffffff",Sn.lineWidth=4,Sn.strokeRect(4,4,120,56),Sn.fillStyle="#ffffff",Sn.font="bold 20px monospace",Sn.fillText("B 4744 ANK",12,36),Sn.font="10px monospace",Sn.fillText("09 • 29",42,52);const rs=new An(Rt),di=new D(new Fr(5,2.5),new ye({map:rs}));di.position.set(0,1.5,-13),di.rotation.y=Math.PI,g.add(di),Sa.length=0;const Rs=new Bn(5.5,1.8,12,24),Ps=new Ue({color:1579035,roughness:.9}),Ua=new D(Rs,Ps);Ua.position.set(0,-2,17),g.add(Ua),Sa.push(Ua);const os=new D(Rs,Ps);os.position.set(0,-2,-13),g.add(os),Sa.push(os);const Fa=new D(new At(1.2,1.4,14,12),z);Fa.rotation.x=Math.PI/2.3,Fa.position.set(5.5,-1,-8),g.add(Fa);const qu=new xn(2.5,16,12,1,!0),Ku=new ye({color:61695,transparent:!0,opacity:.85,side:Nt,blending:yt,depthWrite:!1});return io=new D(qu,Ku),io.rotation.x=-Math.PI/2.3,io.position.set(5.5,-3,-20),g.add(io),g},xx=()=>{const g=new mt;g.position.set(-260,180,420);const w=new Ae(26,16,16),K=new ye({visible:!1});wa=new D(w,K),wa.userData={body:Nl},g.add(wa);const G=new Ue({color:12634326,metalness:.85,roughness:.25}),H=new Ue({color:593174,metalness:.6,roughness:.5}),z=new D(new vt(24,1,16),G);z.userData={body:Nl},g.add(z);const ge=new D(new vt(21,.1,8.5),H);ge.position.set(0,.52,-2.5),g.add(ge);const de=new Ue({color:988970,emissive:61695,emissiveIntensity:.45,roughness:.3});for(let Mn=0;Mn<5;Mn++)for(let En=0;En<12;En++){const xt=new D(new vt(1.4,.2,1.3),de);xt.position.set((En-5.5)*1.65,.62,-5.5+Mn*1.55),g.add(xt)}const b=new Ue({color:10530496,metalness:.7,roughness:.2}),X=new D(new vt(7.5,.08,5),b);X.position.set(0,.52,4.2),g.add(X);const V=new D(new At(.5,.5,22,16),G);V.rotation.z=Math.PI/2,V.position.set(0,.5,-8),g.add(V);const Q=new mt;Q.position.set(0,.5,-8),Q.rotation.x=-Math.PI*.62;const me=new D(new vt(24,16,.7),G);me.position.set(0,8,-.35),Q.add(me);const Me=new D(new Ae(1,16,16),new ye({color:61695}));Me.scale.set(1,1,.2),Me.position.set(0,8,-.72),Q.add(Me);const Ve=new Ue({color:329745,roughness:.8}),tt=new D(new vt(23.2,15.2,.05),Ve);tt.position.set(0,8,.02),Q.add(tt);const ct=fx(),ut=new Fr(22,14),Xt=new ye({map:ct});Ll=new D(ut,Xt),Ll.position.set(0,8,.06),Ll.userData={body:Nl},Q.add(Ll),g.add(Q);const Et=new vt(3,1.4,5),Lt=new Ue({color:1976635,metalness:.8,roughness:.3});so=new D(Et,Lt),so.position.set(16,3,4),g.add(so);const yn=new vt(1.2,.5,3.2),dn=new Ue({color:61695,emissive:61695,emissiveIntensity:.4}),ai=new D(yn,dn);return ai.position.set(-16,4,-2),ai.rotation.set(.4,.6,.2),g.add(ai),g},vx=()=>{const g=new mt;g.position.set(-1100,-380,950);const w=new Ae(50,16,16),K=new ye({visible:!1});Ta=new D(w,K),Ta.userData={body:zu},g.add(Ta);const G=new Ae(30,36,36),H=new Ue({map:mx(),roughness:.4,metalness:.1});Aa=new D(G,H),Aa.userData={body:zu},g.add(Aa);const z=new kn(42,86,64),ge=new ye({color:3718648,transparent:!0,opacity:.65,side:Nt,blending:yt}),de=new D(z,ge);de.rotation.x=Math.PI/2.3,de.rotation.y=.2,g.add(de),Ul.length=0;const b=new Ue({color:9684477,roughness:.8}),X=new D(new Ae(2,12,12),b),V=new D(new Ae(1.6,12,12),b);return g.add(X),g.add(V),Ul.push(X,V),g},bx=()=>{const g=new mt;g.position.set(1250,520,-420);const w=new Ae(38,16,16),K=new ye({visible:!1});Ca=new D(w,K),Ca.userData={body:Hu},g.add(Ca);const G=new At(.5,18,5,32,1,!0),H=new Ue({color:16317180,roughness:.4,metalness:.2}),z=new D(G,H);z.rotation.x=Math.PI/2,z.userData={body:Hu},g.add(z);const ge=new xn(1.5,8,8),de=new Ue({color:4674921,metalness:.8}),b=new D(ge,de);b.rotation.x=-Math.PI/2,b.position.z=8,g.add(b);const X=new At(7,7,6,10),V=new Ue({color:1976635,metalness:.85,roughness:.3}),Q=new D(X,V);Q.position.z=-5,g.add(Q);const me=new At(5.5,5.5,.5,24),Me=new Ue({map:px(),metalness:.95,roughness:.15});oo=new D(me,Me),oo.rotation.z=Math.PI/2,oo.position.set(7.5,0,-5),g.add(oo);const Ve=new Ue({color:9741240,metalness:.8}),tt=new D(new At(.4,.4,38,6),Ve);tt.rotation.z=Math.PI/3,tt.position.set(-18,10,-5),g.add(tt);const ct=new D(new At(.5,.5,18,6),Ve);ct.rotation.z=-Math.PI/2.5,ct.position.set(10,-8,-5),g.add(ct);for(let Et=0;Et<3;Et++){const Lt=new D(new At(1.4,1.4,4,10),new Ue({color:3359061}));Lt.position.set(12+Et*3.5,-12,-5),g.add(Lt)}const ut=new Ae(1,8,8),Xt=new ye({color:2278750});return Ra=new D(ut,Xt),Ra.position.set(0,0,12),g.add(Ra),g},yx=()=>{const g=new mt;g.position.set(-180,240,-320);const w=new Ae(22,16,16),K=new ye({visible:!1});Pa=new D(w,K),Pa.userData={body:Vu},g.add(Pa);const G=new Ue({color:16317180,roughness:.15,metalness:.1}),H=new D(new At(8,7,14,32,1,!0),G);H.userData={body:Vu},g.add(H);const z=new D(new At(7,7,1,32),G);z.position.y=-6.5,g.add(z);const ge=new Bn(4.2,1.1,12,24,Math.PI),de=new D(ge,G);de.position.set(7.5,0,0),de.rotation.z=-Math.PI/2,g.add(de);const b=new Ue({color:2824208,roughness:.25,metalness:.1}),X=new D(new At(7.6,7.6,.5,32),b);X.position.y=5.2,g.add(X),Fl.length=0;const V=new Ue({color:7877903,emissive:4528643,emissiveIntensity:.4,roughness:.1});for(let me=0;me<5;me++){const Me=new D(new Ae(.9,12,12),V),Ve=me*Math.PI*2/5;Me.position.set(Math.cos(Ve)*4.5,9+me*1.5,Math.sin(Ve)*4.5),g.add(Me),Fl.push(Me)}Ol.length=0;const Q=new ye({color:16707722,transparent:!0,opacity:.35,blending:yt,side:Nt,depthWrite:!1});for(let me=0;me<3;me++){const Me=new D(new Bn(3.5+me*1.5,.4,8,24),Q);Me.rotation.x=Math.PI/2,Me.position.y=12+me*3.5,g.add(Me),Ol.push(Me)}return g},Mx=()=>{const g=new mt;g.position.set(550,-220,280);const w=new Ae(30,16,16),K=new ye({visible:!1});Da=new D(w,K),Da.userData={body:Wu},g.add(Da);const G=new Ue({color:15485081,emissive:8591427,emissiveIntensity:.4,metalness:.7,roughness:.2}),H=new D(new vt(16,3.2,22),G);H.userData={body:Wu},g.add(H);const z=new D(new xn(2.5,9,8),G);z.rotation.z=.3,z.position.set(-6.5,0,13),g.add(z);const ge=new D(new xn(2.2,7,8),G);ge.rotation.z=-.3,ge.position.set(6.5,0,12),g.add(ge);const de=new Ue({color:15857145,roughness:.3}),b=new D(new vt(11,.2,14),de);b.position.set(-1,1.7,1),g.add(b);const X=new Ue({color:988970,metalness:.8});for(let Et=0;Et<3;Et++){const Lt=new D(new vt(7.5,.4,1.6),X);Lt.position.set(0,1.9,-1+Et*3.5),g.add(Lt)}const V=new D(new vt(6,.6,2.5),new Ue({color:14870768,metalness:.95}));V.position.set(0,1.9,-6),g.add(V);const Q=new Ue({color:16639626,roughness:.4}),me=new D(new vt(2.6,1.4,32),Q);me.position.set(0,.8,20),g.add(me);const Me=new D(new vt(3.8,1.2,8),Q);Me.position.set(.6,.8,38),Me.rotation.y=.15,g.add(Me);const Ve=new ms({color:3718648}),tt=[];for(let Et=0;Et<6;Et++){const Lt=(Et-2.5)*.35;tt.push(new L(Lt,2,-6)),tt.push(new L(Lt,1.6,36))}const ct=new Jt().setFromPoints(tt),ut=new bc(ct,Ve);g.add(ut),kl.length=0;const Xt=new ye({color:15485081,transparent:!0,opacity:.45,wireframe:!0,blending:yt});for(let Et=0;Et<3;Et++){const Lt=new D(new kn(14+Et*6,15+Et*6,32),Xt);Lt.rotation.x=Math.PI/2,g.add(Lt),kl.push(Lt)}return g},Sx=()=>{const g=new mt;g.position.set(-850,360,480);const w=new Ae(32,16,16),K=new ye({visible:!1});Ia=new D(w,K),Ia.userData={body:Xu},g.add(Ia);const G=new Ue({color:16498468,metalness:.95,roughness:.12}),H=new Ue({color:15680580,roughness:.3}),z=new Ue({color:1096065,roughness:.3}),ge=new D(new Ae(12,24,24),G);ge.scale.set(1,1.25,.95),ge.position.y=8,ge.userData={body:Xu},g.add(ge);const de=new D(new Ae(9.5,24,24),G);de.position.set(0,22,1),g.add(de);for(let xt=-1;xt<=1;xt+=2){const Rt=new D(new xn(3,5.5,4),G);Rt.position.set(xt*5.5,30,1),Rt.rotation.z=-xt*.3,g.add(Rt);const Sn=new D(new xn(1.8,4,4),H);Sn.position.set(xt*5.5,29.5,2),Sn.rotation.z=-xt*.3,g.add(Sn)}const b=new mt;b.position.set(0,22,1);const X=new Ue({color:1120295,roughness:.2,metalness:.3}),V=new Ue({color:16777215,roughness:.25}),Q=new Ue({color:16007006,roughness:.4}),me=new Ue({color:14427686,roughness:.2});for(let xt=-1;xt<=1;xt+=2){const Rt=new D(new Ae(2.6,16,16),V);Rt.scale.set(1.15,.85,.6),Rt.position.set(xt*1.8,-1.6,9),Rt.rotation.y=xt*.2,b.add(Rt)}const Me=new D(new Ae(1,16,16),me);Me.scale.set(1.1,.8,.6),Me.position.set(0,-.6,9.8),b.add(Me);for(let xt=-1;xt<=1;xt+=2){const Rt=new D(new Bn(1.2,.2,8,16,Math.PI*.85),X);Rt.rotation.x=Math.PI,Rt.rotation.y=xt*.2,Rt.rotation.z=xt*-.15,Rt.position.set(xt*1.1,-2.2,9.5),b.add(Rt)}const Ve=new D(new Ae(.8,12,12),Q);Ve.scale.set(.9,.6,.4),Ve.position.set(0,-2.6,9.4),b.add(Ve);for(let xt=-1;xt<=1;xt+=2){const Rt=new mt;Rt.position.set(xt*3.8,1.8,8.8),Rt.rotation.y=xt*.35,Rt.rotation.x=-.1;const Sn=new D(new Ae(2,16,16),V);Sn.scale.set(1.05,.9,.3),Rt.add(Sn);const rs=new D(new Ae(1.4,16,16),X);rs.scale.set(.95,1.05,.35),rs.position.set(0,0,.25),Rt.add(rs);const di=new D(new Ae(.42,8,8),new ye({color:16777215}));di.position.set(-xt*.4,.45,.6),Rt.add(di);const Rs=new D(new Ae(.22,8,8),new ye({color:16777215}));Rs.position.set(xt*.4,-.35,.6),Rt.add(Rs);const Ps=new D(new Bn(2,.24,8,16,Math.PI*.75),X);Ps.rotation.z=xt>0?.35:Math.PI-.35,Ps.position.set(0,.4,.4),Rt.add(Ps),b.add(Rt)}for(let xt=-1;xt<=1;xt+=2){const Rt=new D(new Ae(1.6,16,16),Q);Rt.scale.set(1.2,.7,.3),Rt.position.set(xt*6,-.6,7.6),Rt.rotation.y=xt*.65,b.add(Rt)}const tt=new At(.12,.12,6.5,6);for(let xt=-1;xt<=1;xt+=2)[.22,0,-.22].forEach((Sn,rs)=>{const di=new D(tt,X);di.rotation.z=Math.PI/2+xt*Sn,di.rotation.y=xt*.45,di.position.set(xt*6.5,-.8+(rs-1)*1.1,7.8),b.add(di)});const ct=new D(new Xs(1.2,0),me);ct.position.set(0,5.2,8.4),ct.rotation.z=Math.PI/4,b.add(ct),g.add(b);const ut=new D(new Bn(8,.9,12,32),H);ut.rotation.x=Math.PI/2,ut.position.set(0,15,1),g.add(ut);const Xt=new D(new Ae(2,16,16),G);Xt.position.set(0,13.5,8.5),g.add(Xt);const Et=new D(new At(4.5,7,1.5,16,1,!1,0,Math.PI),z);Et.rotation.x=-Math.PI/3,Et.position.set(0,11,7.5),g.add(Et);const Lt=new mt;Lt.position.set(-8.5,10,6.5),Lt.rotation.z=.2;const yn=new vt(6.5,12,1.6),dn=new D(yn,G);Lt.add(dn);const ai=new Ue({color:10033947,roughness:.3});for(let xt=0;xt<3;xt++){const Rt=new D(new vt(3.8,1,1.9),ai);Rt.position.set(0,(xt-1)*3.4,0),Lt.add(Rt)}g.add(Lt),gr=new mt,gr.position.set(9.5,14,3);const Mn=new D(new At(2.4,2.8,10,16),G);Mn.position.set(0,5,0),gr.add(Mn);const En=new D(new Ae(2.6,16,16),G);En.position.set(0,10,0),gr.add(En),g.add(gr),La.length=0;for(let xt=0;xt<6;xt++){const Rt=new D(new At(1.5,1.5,.4,16),G);g.add(Rt),La.push(Rt)}return g},wx=()=>{if(!r.value||!o.value)return;const g=r.value.clientWidth,w=r.value.clientHeight;u=new A1,u.background=new Ze(132106),h=new mi(50,g/w,.1,5500),h.position.set(0,260,420),d=new jT({canvas:o.value,antialias:!0,powerPreference:"high-performance"}),d.setSize(g,w),d.setPixelRatio(Math.min(window.devicePixelRatio,2)),f=new QT(h,d.domElement),f.enableDamping=!0,f.minDistance=20,f.maxDistance=3e3,f.maxPolarAngle=Math.PI*.95,f.addEventListener("start",()=>{T=!1});const K=new j1(16777215,.75);u.add(K);const G=new Z1(16777215,.45);G.position.set(0,300,200),u.add(G);const H=new K1(16774634,5,4500,.35);H.position.set(0,0,0),u.add(H);const z=2e4,ge=new Jt,de=new Float32Array(z*3),b=new Float32Array(z*3),X=[new Ze(16777215),new Ze(14742270),new Ze(16707722),new Ze(10875900),new Ze(14202110),new Ze(16020150),new Ze(3718648),new Ze(16498468),new Ze(16281969)];for(let De=0;De<z;De++){const zt=Math.random()*Math.PI*2,sn=Math.acos(Math.random()*2-1);let hn;De<5e3?hn=Math.random()*800+1e3:De<13e3?hn=Math.random()*1200+1800:hn=Math.random()*1600+3e3,de[De*3]=hn*Math.sin(sn)*Math.cos(zt),de[De*3+1]=hn*Math.sin(sn)*Math.sin(zt),de[De*3+2]=hn*Math.cos(sn);const Fn=X[Math.floor(Math.random()*X.length)];b[De*3]=Fn.r,b[De*3+1]=Fn.g,b[De*3+2]=Fn.b}ge.setAttribute("position",new mn(de,3)),ge.setAttribute("color",new mn(b,3));const V=new Fo({size:3.4,map:sp(),vertexColors:!0,transparent:!0,opacity:.98,sizeAttenuation:!0,depthWrite:!1,blending:yt}),Q=new Qa(ge,V);u.add(Q);const me=[[-1250,750,-1050],[-1700,320,-1350],[-1450,-580,980],[-980,-720,1350],[1350,820,-950],[1800,380,-1450],[1420,-620,1150],[1750,-260,1600],[-720,1050,-1400],[720,-920,1380],[-1550,120,920],[1550,180,-820],[0,1450,-1100],[0,-1350,1100]],Me=N_();for(const De of me){const zt=new Wc({map:Me,transparent:!0,opacity:.88,blending:yt,depthWrite:!1}),sn=new Ud(zt);sn.position.set(De[0],De[1],De[2]);const hn=Math.random()*40+60;sn.scale.set(hn,hn,1),u.add(sn)}const Ve=new Jt,tt=new Float32Array(Bs*3),ct=new Float32Array(Bs*3),ut=[new Ze(61695),new Ze(16758531),new Ze(16007006),new Ze(11032055),new Ze(1096065),new Ze(16777215),new Ze(3718648),new Ze(16569165),new Ze(15485081)];for(let De=0;De<Bs;De++){let zt,sn;De<2500?(zt=Math.random()*680+35,sn=(Math.random()-.5)*100):(zt=Math.random()*1650+680,sn=(Math.random()-.5)*650);const hn=Math.random()*Math.PI*2;tt[De*3]=Math.cos(hn)*zt,tt[De*3+1]=sn,tt[De*3+2]=Math.sin(hn)*zt;const Fn=ut[Math.floor(Math.random()*ut.length)];ct[De*3]=Fn.r,ct[De*3+1]=Fn.g,ct[De*3+2]=Fn.b,He[De]=zt,Oe[De]=hn,be[De]=sn,J[De]=(Math.random()*.08+.02)*(Math.random()>.45?1:-1)}Ve.setAttribute("position",new mn(tt,3)),Ve.setAttribute("color",new mn(ct,3));const Xt=new Fo({size:4.6,map:Yu(),vertexColors:!0,transparent:!0,opacity:.96,blending:yt,sizeAttenuation:!0,depthWrite:!1});ae=new Qa(Ve,Xt),u.add(ae);const Et=new Jt,Lt=9500,yn=new Float32Array(Lt*3),dn=new Float32Array(Lt*3),ai=[new Ze(15485081),new Ze(11032055),new Ze(61695),new Ze(3718648),new Ze(16765286),new Ze(16777215),new Ze(8490232)],Mn=Math.PI*.22,En=Math.cos(Mn),xt=Math.sin(Mn);for(let De=0;De<Lt;De++){const zt=(Math.random()-.5)*5800,sn=(Math.random()-.5)*(Math.random()-.5)*1250,hn=(Math.random()-.5)*(Math.random()-.5)*550,Fn=zt,Oa=hn,Pi=sn,Vl=Fn*En-Pi*xt,Wl=Oa+Math.sin(zt*.0011)*140,Zu=Fn*xt+Pi*En;yn[De*3]=Vl,yn[De*3+1]=Wl,yn[De*3+2]=Zu;const uo=ai[Math.floor(Math.random()*ai.length)];dn[De*3]=uo.r,dn[De*3+1]=uo.g,dn[De*3+2]=uo.b}Et.setAttribute("position",new mn(yn,3)),Et.setAttribute("color",new mn(dn,3));const Rt=new Fo({size:4.2,map:Yu(),vertexColors:!0,transparent:!0,opacity:.92,blending:yt,sizeAttenuation:!0,depthWrite:!1});Te=new Qa(Et,Rt),u.add(Te);const Sn=[{c1:"rgba(147, 51, 234, 1)",c2:"rgba(219, 39, 119, 1)",pos:[-1600,650,-1100],scale:2450,opacity:.44},{c1:"rgba(6, 182, 212, 1)",c2:"rgba(59, 130, 246, 1)",pos:[-1950,-150,-1450],scale:2350,opacity:.4},{c1:"rgba(16, 185, 129, 1)",c2:"rgba(15, 118, 110, 1)",pos:[-1450,-620,1100],scale:2450,opacity:.42},{c1:"rgba(245, 158, 11, 1)",c2:"rgba(239, 68, 68, 1)",pos:[-1750,-320,650],scale:2250,opacity:.38},{c1:"rgba(6, 182, 212, 1)",c2:"rgba(56, 189, 248, 1)",pos:[1550,680,-1200],scale:2500,opacity:.44},{c1:"rgba(168, 85, 247, 1)",c2:"rgba(244, 114, 182, 1)",pos:[1950,220,-1550],scale:2380,opacity:.4},{c1:"rgba(244, 63, 94, 1)",c2:"rgba(251, 146, 60, 1)",pos:[1500,-640,1250],scale:2550,opacity:.42},{c1:"rgba(217, 119, 6, 1)",c2:"rgba(180, 83, 9, 1)",pos:[1850,-180,1650],scale:2300,opacity:.4},{c1:"rgba(99, 102, 241, 1)",c2:"rgba(56, 189, 248, 1)",pos:[0,1650,-450],scale:2650,opacity:.38},{c1:"rgba(126, 34, 206, 1)",c2:"rgba(13, 148, 136, 1)",pos:[0,-1550,450],scale:2650,opacity:.38}];for(const De of Sn){const zt=new Wc({map:L_(De.c1,De.c2),transparent:!0,opacity:De.opacity,blending:yt,depthWrite:!1}),sn=new Ud(zt);sn.position.set(De.pos[0],De.pos[1],De.pos[2]),sn.scale.set(De.scale,De.scale,1),u.add(sn)}const rs=rp(700,new L(1250,420,-1150),220,[new Ze(61695),new Ze(3718648),new Ze(16777215),new Ze(10875900)]);u.add(rs);const di=rp(650,new L(-1300,-380,1e3),200,[new Ze(16096779),new Ze(16498468),new Ze(16707722),new Ze(16777215)]);u.add(di),gt.length=0;const Rs=[61695,16020150,16707722,10875900,14202110,3462041];for(let De=0;De<6;De++){const zt=new Jt,sn=new Float32Array(6);zt.setAttribute("position",new mn(sn,3));const hn=new ms({color:Rs[De%Rs.length],transparent:!0,opacity:0,blending:yt}),Fn=new Xc(zt,hn);u.add(Fn),gt.push({line:Fn,geometry:zt,active:!1,progress:0,speed:1.4+Math.random()*.9,startPos:new L,dir:new L,length:160+Math.random()*90,cooldown:Math.random()*2.2+De*.8,material:hn})}const Ps=new Dr(1.2,1),Ua=new Ue({color:9741240,roughness:.88,metalness:.1,flatShading:!0});ht=new U1(Ps,Ua,Jd),_t.length=0;const os=new wn;for(let De=0;De<Jd;De++){const zt=Math.random()*300+610,sn=Math.random()*Math.PI*2,hn=(Math.random()-.5)*85,Fn=(Math.random()*.04+.02)*(Math.random()>.5?1:.9),Oa=Math.random()*.02+.01,Pi=Math.random()*3.6+1.6;os.position.set(Math.cos(sn)*zt,hn,Math.sin(sn)*zt),os.scale.set(Pi,Pi*(.8+Math.random()*.4),Pi),os.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,0),os.updateMatrix(),ht.setMatrixAt(De,os.matrix),_t.push({radius:zt,angle:sn,speed:Fn,y:hn,rotSpeed:Oa,scale:Pi})}ht.instanceMatrix.needsUpdate=!0,u.add(ht);const Fa=new Ae(6.5,24,24),qu=new Ue({color:9684477,emissive:3718648,emissiveIntensity:.85,roughness:.3});pt=new D(Fa,qu),pt.userData={body:Ie},u.add(pt);const Ku=new Ae(10.5,16,16),Ix=new ye({color:3718648,transparent:!0,opacity:.45,side:vn,blending:yt}),Lx=new D(Ku,Ix);pt.add(Lx);const $u=new Jt,zl=new Float32Array(nl*3),Hl=new Float32Array(nl*3),hp=[new Ze(16777215),new Ze(10875900),new Ze(3718648),new Ze(8490232)];for(let De=0;De<nl;De++){zl[De*3]=0,zl[De*3+1]=0,zl[De*3+2]=0;const zt=hp[De%hp.length];Hl[De*3]=zt.r,Hl[De*3+1]=zt.g,Hl[De*3+2]=zt.b}$u.setAttribute("position",new mn(zl,3)),$u.setAttribute("color",new mn(Hl,3));const Nx=new Fo({size:4.8,map:Yu(),vertexColors:!0,transparent:!0,opacity:.9,blending:yt,sizeAttenuation:!0,depthWrite:!1});pe=new Qa($u,Nx),u.add(pe),ot=U_(),u.add(ot),ce=F_(),u.add(ce),xe=O_(),u.add(xe),Xe=k_(),u.add(Xe),re=B_(),u.add(re),fe=G_(),u.add(fe),ke=z_(),u.add(ke),Be=H_(),u.add(Be),qe=V_(),u.add(qe),qt=W_(),u.add(qt),Bi=X_(),u.add(Bi),Ri=Y_(),u.add(Ri),Yn=q_(),u.add(Yn),Hi=K_(),u.add(Hi),cr=$_(),u.add(cr),q=Z_(),u.add(q),We=j_(),u.add(We),st=J_(),u.add(st),at=Q_(),u.add(at),Gt=ex(),u.add(Gt),Dt=tx(),u.add(Dt),Hn=nx(),u.add(Hn),ei=ix(),u.add(ei),Cs=sx(),u.add(Cs),na=rx(),u.add(na),ra=ox(),u.add(ra),Kr=ax(),u.add(Kr),Zr=lx(),u.add(Zr),ha=cx(),u.add(ha),ga=ux(),u.add(ga),Qr=dx(),u.add(Qr),dr=hx(),u.add(dr),hr=gx(),u.add(hr),no=_x(),u.add(no),fr=xx(),u.add(fr),Ea=vx(),u.add(Ea),ro=bx(),u.add(ro),pr=yx(),u.add(pr),mr=Mx(),u.add(mr),ao=Sx(),u.add(ao);const Ux=new Ae(38,48,48),Fx=new ye({map:tp()});se=new D(Ux,Fx),se.userData={body:qo[0]},u.add(se);const Ox=I_();se.add(Ox);const kx=new Ae(42,32,32),Bx=new ye({color:16755200,transparent:!0,opacity:.45,side:vn,blending:yt});Z=new D(kx,Bx),u.add(Z),$.length=0;for(const De of qo){if(De.orbitRadius===0)continue;const zt=new Ze(De.color),sn=1.2,hn=new kn(De.orbitRadius-sn*.5,De.orbitRadius+sn*.5,128),Fn=new ye({color:9741240,side:Nt,transparent:!0,opacity:.1,blending:yt}),Oa=new ye({color:zt,side:Nt,transparent:!0,opacity:.95,blending:yt}),Pi=new D(hn,Fn);Pi.rotation.x=Math.PI/2,u.add(Pi);const Vl=128,Wl=[];for(let vr=0;vr<=Vl;vr++){const fo=vr/Vl*Math.PI*2;Wl.push(new L(Math.cos(fo)*De.orbitRadius,0,Math.sin(fo)*De.orbitRadius))}const Zu=new Jt().setFromPoints(Wl),uo=new ms({color:13358561,transparent:!0,opacity:.3}),Gx=new ms({color:zt,transparent:!0,opacity:1}),fp=new Xc(Zu,uo);u.add(fp);let _r;De.planetCategory==="gas-giant"?_r=np(De.color,De.accentColor,"#fef08a"):De.planetCategory==="terrestrial"?_r=ip(De.accentColor,De.color):De.planetCategory==="cyber"?_r=C_():De.planetCategory==="ice"?_r=R_(De.color,De.accentColor):De.planetCategory==="desert"?_r=P_(De.color,De.accentColor):_r=np(De.color,De.accentColor,"#ffffff");const ho=De.baseRadius*1.35,zx=new Ae(ho,36,36),Hx=new Ue({map:_r,roughness:.5,metalness:.12,emissive:zt,emissiveIntensity:.26}),xr=new D(zx,Hx);xr.userData={body:De},u.add(xr);const Vx=new Ae(ho*1.14,28,28),Wx=new ye({color:zt,transparent:!0,opacity:.26,side:vn,blending:yt}),Xx=new D(Vx,Wx);xr.add(Xx),xr.rotation.z=.28;let Xl;if(De.hasRings){const vr=new kn(ho*1.35,ho*2.35,64),fo=new Ue({map:D_(De.ringsColor||De.color),side:Nt,transparent:!0,opacity:.88,roughness:.7,emissive:new Ze(De.ringsColor||De.color),emissiveIntensity:.2});Xl=new D(vr,fo),Xl.rotation.x=Math.PI/2,xr.add(Xl)}const pp=[];if(De.type==="skills"){const vr=new Ae(2.8,16,16),fo=new ye({color:61695});for(let mp=0;mp<3;mp++){const gp=new D(vr,fo);u.add(gp),pp.push(gp)}}const Yx=new kn(ho*1.3,ho*1.45,36),qx=new ye({color:zt,side:Nt,transparent:!0,opacity:0}),ju=new D(Yx,qx);ju.rotation.x=Math.PI/2,xr.add(ju),$.push({body:De,mesh:xr,orbitLine:fp,orbitGlowRing:Pi,orbitMaterialNormal:uo,orbitMaterialActive:Gx,orbitGlowNormal:Fn,orbitGlowActive:Oa,orbitRadius:De.orbitRadius,orbitSpeed:De.orbitSpeed,initialAngle:De.initialAngle,axialSpinSpeed:.5+Math.random()*.5,ringsMesh:Xl,moons:pp,selectionRing:ju})}x=new eS,S=new dt(-1e3,-1e3)},op=g=>{var de;p===0&&(p=g);const w=Math.min((g-p)/1e3,.1);if(p=g,R&&(y+=w),se&&Z){se.rotation.y+=.003;const b=1+Math.sin(y*2.5)*.04;Z.scale.set(b,b,b)}if(ae){const b=ae.geometry.attributes.position.array;for(let X=0;X<Bs;X++){Oe[X]+=J[X]*w*.5;const V=He[X],Q=Oe[X];b[X*3]=Math.cos(Q)*V,b[X*3+1]=be[X]+Math.sin(y*1.4+X)*6,b[X*3+2]=Math.sin(Q)*V}ae.geometry.attributes.position.needsUpdate=!0}for(const b of gt)if(b.active){b.progress+=b.speed*w;const V=b.progress*950,Q=Math.max(0,V-b.length),me=b.startPos.clone().addScaledVector(b.dir,V),Me=b.startPos.clone().addScaledVector(b.dir,Q),Ve=b.geometry.attributes.position.array;Ve[0]=Me.x,Ve[1]=Me.y,Ve[2]=Me.z,Ve[3]=me.x,Ve[4]=me.y,Ve[5]=me.z,b.geometry.attributes.position.needsUpdate=!0,b.progress<.25?b.material.opacity=b.progress/.25:b.progress>.7?b.material.opacity=(1-b.progress)/.3:b.material.opacity=.95,b.progress>=1&&(b.active=!1,b.material.opacity=0,b.cooldown=Math.random()*4+1.5)}else if(b.cooldown-=w,b.cooldown<=0){b.active=!0,b.progress=0,b.speed=1.3+Math.random()*.9,b.length=160+Math.random()*100;const X=Math.random()*Math.PI*2,V=Math.random()*Math.PI*.35+.1,Q=900+Math.random()*450;b.startPos.set(Q*Math.sin(V)*Math.cos(X),Math.random()*350+250,Q*Math.cos(V)),b.dir.set((Math.random()-.5)*1.6,-(Math.random()*.8+.4),(Math.random()-.5)*1.6).normalize()}if(ht){const b=new wn;for(let X=0;X<Jd;X++){const V=_t[X];V.angle+=V.speed*w*.2*i.orbitSpeedMultiplier,b.position.set(Math.cos(V.angle)*V.radius,V.y+Math.sin(y*.5+X)*3,Math.sin(V.angle)*V.radius),b.scale.set(V.scale,V.scale,V.scale),b.rotation.y+=V.rotSpeed,b.updateMatrix(),ht.setMatrixAt(X,b.matrix)}ht.instanceMatrix.needsUpdate=!0}if(pt&&pe){const b=y*.12*i.orbitSpeedMultiplier+.8,X=Math.cos(b)*720,V=Math.sin(b)*540,Q=Math.sin(b*1.5)*95;pt.position.set(X,Q,V),pt.rotation.y+=w*.8,Fe.unshift(new L(X,Q,V)),Fe.length>nl&&Fe.pop();const me=pe.geometry.attributes.position.array;for(let Me=0;Me<Fe.length;Me++){const Ve=Fe[Me],tt=Me/nl*10;me[Me*3]=Ve.x+(Math.random()-.5)*tt,me[Me*3+1]=Ve.y+(Math.random()-.5)*tt,me[Me*3+2]=Ve.z+(Math.random()-.5)*tt}pe.geometry.attributes.position.needsUpdate=!0}for(const b of $){const X=b.initialAngle+y*b.orbitSpeed*.32*i.orbitSpeedMultiplier,V=Math.cos(X)*b.orbitRadius,Q=Math.sin(X)*b.orbitRadius;if(b.mesh.position.set(V,0,Q),b.mesh.rotation.y+=b.axialSpinSpeed*w,b.moons&&b.moons.length>0)for(let Me=0;Me<b.moons.length;Me++){const Ve=y*1.8+Me*(Math.PI*2)/b.moons.length,tt=b.body.baseRadius*1.35*1.9;b.moons[Me].position.set(V+Math.cos(Ve)*tt,Math.sin(Ve*.8)*4,Q+Math.sin(Ve)*tt)}const me=i.selectedBodyId===b.body.id||((de=a.value)==null?void 0:de.id)===b.body.id;b.orbitLine.material=me?b.orbitMaterialActive:b.orbitMaterialNormal,b.orbitGlowRing.material=me?b.orbitGlowActive:b.orbitGlowNormal,b.selectionRing&&(b.selectionRing.material.opacity=me?.95:0,me&&(b.selectionRing.rotation.z+=.02))}if(ot){const b=he.initialAngle+y*he.orbitSpeed*.28*i.orbitSpeedMultiplier,X=Math.cos(b)*he.orbitRadius,V=Math.sin(b)*he.orbitRadius,Q=45+Math.sin(y*2.2)*6;ot.position.set(X,Q,V),ot.rotation.y+=w*.5,ot.rotation.z=Math.sin(y*1.6)*.12,ot.rotation.x=Math.cos(y*1.4)*.08,B&&(B.rotation.y+=w*3.5),ie&&(ie.material.opacity=.16+Math.sin(y*3.5)*.07)}if(ce){const b=Ee.initialAngle+y*Ee.orbitSpeed*.25*i.orbitSpeedMultiplier,X=Math.cos(b)*Ee.orbitRadius,V=Math.sin(b)*Ee.orbitRadius;ce.position.set(X,-28,V),ce.rotation.y+=w*.08,Pe&&(Pe.rotation.z+=w*.6);const Q=Math.sin(y*4.5)>.2;for(const me of Re)me.opacity=Q?1:.2}if(xe){const b=$e.initialAngle+y*$e.orbitSpeed*.3*i.orbitSpeedMultiplier,X=Math.cos(b)*$e.orbitRadius,V=Math.sin(b)*$e.orbitRadius;xe.position.set(X,62+Math.sin(y*.8)*8,V),xe.rotation.y=-b+Math.PI/2,xe.rotation.z=Math.sin(y*1.2)*.05;for(let Q=0;Q<N.length;Q++){const me=1+Math.sin(y*10+Q)*.18;N[Q].scale.set(1,me,1)}}if(Xe&&(_&&(_.rotation.z+=w*.22),W&&(W.rotation.z-=w*.12)),re&&(re.rotation.y+=w*4.2,re.rotation.x=Math.sin(y*1.5)*.15,Ne)){const b=1+Math.sin(y*12)*.12;Ne.scale.set(b,1,b)}if(fe){const b=Ge.initialAngle+y*Ge.orbitSpeed*.32*i.orbitSpeedMultiplier,X=Math.cos(b)*Ge.orbitRadius,V=Math.sin(b)*Ge.orbitRadius;fe.position.set(X,-42+Math.sin(y*1.1)*4,V),fe.rotation.y+=w*.15,fe.rotation.x=Math.sin(y*.9)*.08,Je&&(Je.opacity=.3+Math.abs(Math.sin(y*3.8))*.7)}if(ke){const b=Y.initialAngle+y*Y.orbitSpeed*.28*i.orbitSpeedMultiplier,X=Math.cos(b)*Y.orbitRadius,V=Math.sin(b)*Y.orbitRadius;if(ke.position.set(X,75+Math.sin(y*.7)*8,V),ft&&(ft.rotation.y+=w*.4),St){const Q=y*1.8;St.position.set(Math.cos(Q)*32,Math.sin(Q*.6)*6,Math.sin(Q)*32)}}if(Be){const b=ze.initialAngle+y*ze.orbitSpeed*.3*i.orbitSpeedMultiplier,X=Math.cos(b)*ze.orbitRadius,V=Math.sin(b)*ze.orbitRadius;Be.position.set(X,-55+Math.sin(y*.9)*5,V),Be.rotation.y=-b}if(qe)for(let b=0;b<rt.length;b++)rt[b].rotation.z+=w*(.04+b*.02)*(b%2===0?1:-1);if(qt){const b=Ln.initialAngle+y*Ln.orbitSpeed*.2*i.orbitSpeedMultiplier,X=Math.cos(b)*Ln.orbitRadius,V=Math.sin(b)*Ln.orbitRadius;if(qt.position.set(X,320+Math.sin(y*.5)*12,V),qt.rotation.y=-b+Math.PI/2,Qn){const Q=1+Math.sin(y*5)*.15;Qn.scale.set(Q,Q,Q)}}if(Bi){const b=Ci.initialAngle+y*Ci.orbitSpeed*.3*i.orbitSpeedMultiplier,X=Math.cos(b)*Ci.orbitRadius,V=Math.sin(b)*Ci.orbitRadius;Bi.position.set(X,90+Math.sin(y*1.3)*6,V),Bi.rotation.y+=w*.3,Bi.rotation.x=Math.sin(y*.8)*.08,or&&(or.opacity=.35+Math.sin(y*6)*.2)}if(Ri){const b=Gi.initialAngle+y*Gi.orbitSpeed*.35*i.orbitSpeedMultiplier,X=Math.cos(b)*Gi.orbitRadius,V=Math.sin(b)*Gi.orbitRadius;Ri.position.set(X,-65+Math.sin(y*1.5)*10,V),Ri.rotation.x+=w*1.2,Ri.rotation.y+=w*.8,Ri.rotation.z+=w*.5}if(Yn){const b=zi.initialAngle+y*zi.orbitSpeed*.32*i.orbitSpeedMultiplier,X=Math.cos(b)*zi.orbitRadius,V=Math.sin(b)*zi.orbitRadius;Yn.position.set(X,35+Math.sin(y*1.2)*5,V),Yn.rotation.y=-b+Math.PI/4,Yn.rotation.z=Math.sin(y*1.6)*.1}if(Hi){const b=y*.6;if(oi&&(oi.position.set(Math.cos(b)*22,0,Math.sin(b)*22),oi.rotation.y+=w*.5),bi&&(bi.position.set(-Math.cos(b)*30,0,-Math.sin(b)*30),bi.rotation.y+=w*1.2),lr&&oi&&bi){const X=[oi.position.clone(),new L(0,Math.sin(b*2)*4,0),bi.position.clone()];lr.geometry.setFromPoints(X)}}if(cr)for(let b=0;b<Xr.length;b++)Xr[b].rotation.z+=w*(.35+b*.15)*(b%2===0?1:-1);if(q){const b=te.initialAngle+y*te.orbitSpeed*.45*i.orbitSpeedMultiplier,X=Math.cos(b)*te.orbitRadius,V=Math.sin(b)*te.orbitRadius;q.position.set(X,40+Math.sin(y*2.2)*6,V),q.rotation.y=-b+Math.PI/2,q.rotation.z=Math.sin(y*2.8)*.22;for(let Q=0;Q<ne.length;Q++){const me=1+Math.sin(y*18+Q)*.28;ne[Q].scale.set(1,me,1)}}if(We){const b=nt.initialAngle+y*nt.orbitSpeed*.3*i.orbitSpeedMultiplier,X=Math.cos(b)*nt.orbitRadius,V=Math.sin(b)*nt.orbitRadius;if(We.position.set(X,-45+Math.sin(y*1.2)*6,V),We.rotation.y+=w*.45,We.rotation.x+=w*.25,Ye){const Q=1+Math.sin(y*4)*.2;Ye.scale.set(Q,Q,Q)}}if(st){const b=wt.initialAngle+y*wt.orbitSpeed*.28*i.orbitSpeedMultiplier,X=Math.cos(b)*wt.orbitRadius,V=Math.sin(b)*wt.orbitRadius;st.position.set(X,50+Math.sin(y*.9)*4,V),st.rotation.y+=w*.12}if(nn&&(nn.rotation.y+=w*.2),Gt){Gt.rotation.z+=w*.3;for(let b=0;b<Qe.length;b++)Qe[b].rotation.x+=w*(2.2+b*.8),Qe[b].rotation.y+=w*(1.6+b*.5)}if(Dt){const b=Un.initialAngle+y*Un.orbitSpeed*.34*i.orbitSpeedMultiplier,X=Math.cos(b)*Un.orbitRadius,V=Math.sin(b)*Un.orbitRadius;Dt.position.set(X,-30+Math.sin(y*1.5)*5,V),Dt.rotation.y=-b+Math.PI/2,Dt.rotation.z=Math.sin(y*1.8)*.12}if(Hn){const b=Zt.initialAngle+y*Zt.orbitSpeed*.25*i.orbitSpeedMultiplier,X=Math.cos(b)*Zt.orbitRadius,V=Math.sin(b)*Zt.orbitRadius;Hn.position.set(X,-15+Math.sin(y*.8)*4,V),Hn.rotation.y+=w*.18,Hn.rotation.z=Math.sin(y*.6)*.08,Vt&&(Vt.opacity=Math.sin(y*5.5)>0?1:.15)}if(ei&&(ei.rotation.y+=w*.15,ui)){const b=.85+Math.sin(y*4.2)*.25;ui.color.setRGB(1,.95*b,.8*b)}if(Cs){Yr&&(Yr.rotation.y+=w*.25,Yr.rotation.x+=w*.12);for(let b=0;b<qr.length;b++){const X=y*(.6+b*.2)+b*(Math.PI/2),V=34+b*3;qr[b].position.set(Math.cos(X)*V,Math.sin(y*2+b)*4,Math.sin(X)*V),qr[b].rotation.x+=w*1.5,qr[b].rotation.y+=w*2}}if(na){for(let b=0;b<sa.length;b++)sa[b].rotation.z+=w*(.45+b*.25)*(b%2===0?1:-1),sa[b].rotation.x+=w*.15;Rl&&(Rl.rotation.z-=w*1.8)}if(ra){aa&&(aa.rotation.y+=w*.18);for(let b=0;b<Pl.length;b++){const X=y*(.35+b*.15)+b*Math.PI,V=48+b*10;Pl[b].position.set(Math.cos(X)*V,Math.sin(X*.2)*1.5,Math.sin(X)*V)}}if(Kr){Kr.rotation.y+=w*.08;for(let b=0;b<ca.length;b++)ca[b].rotation.x=Math.sin(y*1.6+b*.3)*.14;if($r){const b=1+Math.sin(y*3.8)*.22;$r.scale.set(b,b,b)}}if(Zr&&(Zr.rotation.y+=w*.05,da&&(da.rotation.y+=w*.12)),ha){ma&&(ma.rotation.z+=w*.65);for(let b=0;b<pa.length;b++){const X=1+Math.sin(y*14+b)*.16;pa[b].scale.set(X,1,X)}}if(ga&&(jr&&(jr.rotation.x+=w*.32,jr.rotation.y+=w*.42),Jr)){Jr.rotation.x-=w*.48,Jr.rotation.z+=w*.38;const b=1+Math.sin(y*2.8)*.22;Jr.scale.set(b,b,b)}if(Qr){Qr.rotation.y+=w*.06;for(let b=0;b<va.length;b++)va[b].rotation.x+=w*(1.6+b*.5),va[b].rotation.y+=w*(1.1+b*.3);if(Il){const b=1+Math.sin(y*6)*.08;Il.scale.set(b,b,b)}}if(dr){dr.rotation.y+=w*.15,dr.rotation.z+=w*.08;for(let b=0;b<eo.length;b++){const X=y*(.45+b*.1)+b*(Math.PI/5),V=28+b*1.4;eo[b].position.set(Math.cos(X)*V,Math.sin(y*1.8+b)*5,Math.sin(X)*V),eo[b].rotation.x+=w*1.8,eo[b].rotation.y+=w*2.2}}if(hr){hr.rotation.y+=w*.25,hr.position.y=320+Math.sin(y*1.5)*6;for(let b=0;b<to.length;b++){const X=y*.8+b*Math.PI*2/6;to[b].position.set(Math.cos(X)*26,Math.sin(y*2+b)*4,Math.sin(X)*26),to[b].rotation.x+=w*1.5,to[b].rotation.y+=w*2}}if(no){no.rotation.z=Math.sin(y*2)*.08;for(let b=0;b<Sa.length;b++)Sa[b].rotation.x+=w*8;if(io){const b=1+Math.sin(y*16)*.25;io.scale.set(b,1+Math.cos(y*18)*.3,b)}}if(fr&&(fr.rotation.y+=w*.15,fr.rotation.x=Math.sin(y*.8)*.12,so)){const b=y*.6;so.position.set(Math.cos(b)*20,Math.sin(y*1.2)*5,Math.sin(b)*16),so.rotation.y+=w*.8}if(Ea){Aa&&(Aa.rotation.y+=w*.12);for(let b=0;b<Ul.length;b++){const X=y*(.4+b*.2)+b*Math.PI;Ul[b].position.set(Math.cos(X)*(56+b*14),0,Math.sin(X)*(56+b*14))}}if(ro&&(ro.rotation.y+=w*.05,oo&&(oo.rotation.y+=w*.4),Ra&&(Ra.visible=Math.sin(y*5)>0)),pr){pr.rotation.y+=w*.12,pr.position.y=240+Math.sin(y*1.6)*5;for(let b=0;b<Fl.length;b++)Fl[b].position.y=9+b*1.5+Math.sin(y*3+b*.8)*2;for(let b=0;b<Ol.length;b++)Ol[b].rotation.z+=w*(.4+b*.2)}if(mr){mr.rotation.y+=w*.18,mr.rotation.z=Math.sin(y*1.4)*.15;for(let b=0;b<kl.length;b++){const X=1+(y*2+b*.8)%2.5;kl[b].scale.set(X,X,1)}}if(ao){ao.rotation.y+=w*.08,gr&&(gr.rotation.z=Math.sin(y*5)*.32);for(let b=0;b<La.length;b++){const X=y*.9+b*Math.PI*2/6;La[b].position.set(Math.cos(X)*26,Math.sin(y*2.2+b)*4,Math.sin(X)*26),La[b].rotation.y+=w*2.5}}Te&&(Te.rotation.y+=w*.012);const K=r.value?r.value.clientWidth:window.innerWidth,G=r.value?r.value.clientHeight:window.innerHeight,H=K<768;let z=0,ge=0;if(i.isPanelOpen&&I&&(H?ge=G*.28:z=Math.min(540,K*.34)*.5),F+=(z-F)*.08,k+=(ge-k)*.08,Math.abs(F)>.4||Math.abs(k)>.4?h.setViewOffset(K,G,F,k,K,G):h.view&&h.view.enabled&&h.clearViewOffset(),I){const b=ap(I);if(b){if(T){const X=performance.now()-U,V=Math.min(1,X/S0),Q=1-Math.pow(1-V,3),me=b.clone().add(v);h.position.lerpVectors(ee,me,Q),f.target.lerpVectors(le,b,Q),V>=1&&(T=!1)}else{const X=b.clone().sub(A);f.target.add(X),h.position.add(X)}A.copy(b)}}else if(T){const b=performance.now()-U,X=Math.min(1,b/S0),V=1-Math.pow(1-X,3);h.position.lerpVectors(ee,M,V),f.target.lerpVectors(le,P,V),X>=1&&(T=!1)}f.update(),d.render(u,h),m=requestAnimationFrame(op)},ap=(g,w=new L)=>{if(g==="sun"||!g)return w.set(0,0,0);const K=$.find(G=>G.body.id===g);return K?w.copy(K.mesh.position):g===Ie.id&&pt?w.copy(pt.position):g===he.id&&ot?w.copy(ot.position):g===Ee.id&&ce?w.copy(ce.position):g===$e.id&&xe?w.copy(xe.position):g===j.id&&Xe?w.copy(Xe.position):g===ue.id&&re?w.copy(re.position):g===Ge.id&&fe?w.copy(fe.position):g===Y.id&&ke?w.copy(ke.position):g===ze.id&&Be?w.copy(Be.position):g===it.id&&qe?w.copy(qe.position):g===Ln.id&&qt?w.copy(qt.position):g===Ci.id&&Bi?w.copy(Bi.position):g===Gi.id&&Ri?w.copy(Ri.position):g===zi.id&&Yn?w.copy(Yn.position):g===Wr.id&&Hi?w.copy(Hi.position):g===E.id&&cr?w.copy(cr.position):g===te.id&&q?w.copy(q.position):g===nt.id&&We?w.copy(We.position):g===wt.id&&st?w.copy(st.position):g===rn.id&&at?w.copy(at.position):g===zn.id&&Gt?w.copy(Gt.position):g===Un.id&&Dt?w.copy(Dt.position):g===Zt.id&&Hn?w.copy(Hn.position):g===Vi.id&&ei?w.copy(ei.position):g===Iu.id&&Cs?w.copy(Cs.position):g===Qf.id&&na?w.copy(na.position):g===Lu.id&&ra?w.copy(ra.position):g===Dl.id&&Kr?w.copy(Kr.position):g===Nu.id&&Zr?w.copy(Zr.position):g===Uu.id&&ha?w.copy(ha.position):g===Fu.id&&ga?w.copy(ga.position):g===Ou.id&&Qr?w.copy(Qr.position):g===ku.id&&dr?w.copy(dr.position):g===Bu.id&&hr?w.copy(hr.position):g===Gu.id&&no?w.copy(no.position):g===Nl.id&&fr?w.copy(fr.position):g===zu.id&&Ea?w.copy(Ea.position):g===Hu.id&&ro?w.copy(ro.position):g===Vu.id&&pr?w.copy(pr.position):g===Wu.id&&mr?w.copy(mr.position):g===Xu.id&&ao?w.copy(ao.position):null},Ex=g=>{const K=window.innerWidth<768?2.35:1,G=$.find(z=>z.body.id===g);if(G){const z=G.body.baseRadius*1.35;return new L(z*5.8,z*3.4,z*6.2).multiplyScalar(K)}let H;switch(g){case"comet-halley":H=new L(120,60,130);break;case"ufo-alpha":H=new L(145,75,150);break;case"station-aegis":H=new L(200,100,200);break;case"ship-hermes":H=new L(175,90,175);break;case"black-hole-gargantua":H=new L(320,150,340);break;case"pulsar-0950":H=new L(250,120,260);break;case"satellite-chronos":H=new L(135,70,140);break;case"exoplanet-kepler":H=new L(200,95,210);break;case"observatory-jwst":H=new L(150,75,155);break;case"nebula-helix":H=new L(330,150,350);break;case"mothership-titan":H=new L(300,135,310);break;case"monolith-prime":H=new L(135,70,140);break;case"asteroid-oumuamua":H=new L(125,65,130);break;case"probe-lightsail":H=new L(140,75,145);break;case"binary-sirius":H=new L(310,140,330);break;case"wormhole-artemis":H=new L(290,130,300);break;case"ship-valkyrie":H=new L(130,65,135);break;case"crystal-astraea":H=new L(140,75,150);break;case"station-bifrost":H=new L(200,100,210);break;case"planet-pyro":H=new L(230,110,240);break;case"magnetar-sgr":H=new L(230,110,240);break;case"drones-sentinel":H=new L(145,75,155);break;case"asteroid-psyche":H=new L(170,85,180);break;case"dyson-hyperion":H=new L(260,120,270);break;case"exoplanet-glacio":H=new L(220,105,230);break;case"rift-chronos":H=new L(250,120,260);break;case"exoplanet-zephyrus":H=new L(280,130,290);break;case"leviathan-void":H=new L(280,130,290);break;case"ringworld-elysium":H=new L(320,150,330);break;case"protostar-phoenix":H=new L(270,120,280);break;case"artifact-tesseract":H=new L(220,105,230);break;case"foundry-vulcan":H=new L(260,120,270);break;case"crystal-geode":H=new L(240,115,250);break;case"artifact-crown":H=new L(180,90,190);break;case"vessel-beat":H=new L(190,95,200);break;case"artifact-laptop":H=new L(180,85,190);break;case"planet-neptunia":H=new L(260,120,270);break;case"probe-voyager":H=new L(200,100,210);break;case"artifact-coffee":H=new L(140,70,150);break;case"artifact-guitar":H=new L(190,95,200);break;case"artifact-neko":H=new L(200,100,210);break;default:H=new L(160,80,165);break}return H.multiplyScalar(K)},lp=g=>{if(!g||g==="sun"){I=null,M.set(0,320,520),P.set(0,0,0),ee.copy(h.position),le.copy(f.target),U=performance.now(),T=!0;return}const w=ap(g);w&&(I=g,v.copy(Ex(g)),A.copy(w),P.copy(w),M.copy(w).add(v),ee.copy(h.position),le.copy(f.target),U=performance.now(),T=!0)};e({resetView:()=>{I=null,M.set(0,320,520),P.set(0,0,0),ee.copy(h.position),le.copy(f.target),U=performance.now(),T=!0},focusOnBody:lp,zoomIn:()=>{T=!1;const g=new L;h.getWorldDirection(g),h.position.addScaledVector(g,80)},zoomOut:()=>{T=!1;const g=new L;h.getWorldDirection(g),h.position.addScaledVector(g,-80)}});const cp=(g,w)=>{if(!r.value)return null;const K=r.value.getBoundingClientRect(),G=(g-K.left)/K.width*2-1,H=-((w-K.top)/K.height)*2+1;S.set(G,H),x.setFromCamera(S,h);const z=[];se&&z.push(se),pt&&z.push(pt),O&&z.push(O),_e&&z.push(_e),Ke&&z.push(Ke),C&&z.push(C),Ce&&z.push(Ce),Le&&z.push(Le),lt&&z.push(lt),ve&&z.push(ve),Se&&z.push(Se),Ht&&z.push(Ht),rr&&z.push(rr),Ts&&z.push(Ts),ss&&z.push(ss),As&&z.push(As),ur&&z.push(ur),oe&&z.push(oe),et&&z.push(et),Mt&&z.push(Mt),Bt&&z.push(Bt),_n&&z.push(_n),Nn&&z.push(Nn),yi&&z.push(yi),Wt&&z.push(Wt),ta&&z.push(ta),ia&&z.push(ia),oa&&z.push(oa),la&&z.push(la),ua&&z.push(ua),fa&&z.push(fa),_a&&z.push(_a),xa&&z.push(xa),ba&&z.push(ba),ya&&z.push(ya),Ma&&z.push(Ma),wa&&z.push(wa),Ta&&z.push(Ta),Ca&&z.push(Ca),Pa&&z.push(Pa),Da&&z.push(Da),Ia&&z.push(Ia);for(const de of $)z.push(de.mesh);const ge=x.intersectObjects(z,!1);return ge.length>0&&ge[0].object.userData.body||null},Tx=g=>{const w=Date.now();w-Gl<350||(Gl=w,s("select",g))},Ax=()=>{const g=Date.now();g-Gl<250||(Gl=g,a.value=null,s("select",null),s("unselect"))},Cx=g=>{Bl=!0,Na={x:g.clientX,y:g.clientY},ep=Date.now(),l.value=!1,T=!1},Rx=g=>{var w;if(c.value={x:g.clientX,y:g.clientY},Bl)Math.hypot(g.clientX-Na.x,g.clientY-Na.y)>6&&(l.value=!0,a.value=null);else{l.value=!1;const K=cp(g.clientX,g.clientY);((w=a.value)==null?void 0:w.id)!==(K==null?void 0:K.id)&&(a.value=K,s("hover",K))}},Px=g=>{const w=Math.hypot(g.clientX-Na.x,g.clientY-Na.y),K=Date.now()-ep;if(w<10&&K<550){const G=cp(g.clientX,g.clientY);G?Tx(G):Ax()}Bl=!1,l.value=!1},Dx=()=>{Bl=!1,a.value=null,l.value=!1,s("hover",null)},up=()=>{if(!r.value||!d||!h)return;const g=r.value.clientWidth,w=r.value.clientHeight;h.aspect=g/w,Math.abs(F)>.4||Math.abs(k)>.4?h.setViewOffset(g,w,F,k,g,w):h.updateProjectionMatrix(),d.setSize(g,w)},dp=()=>{R=!document.hidden};return Su(()=>{wx(),window.addEventListener("resize",up),document.addEventListener("visibilitychange",dp),m=requestAnimationFrame(op)}),wu(()=>{m&&cancelAnimationFrame(m),window.removeEventListener("resize",up),document.removeEventListener("visibilitychange",dp),f==null||f.dispose(),d==null||d.dispose()}),Ic(()=>i.selectedBodyId,g=>{g&&lp(g)}),(g,w)=>(on(),fn("div",{ref_key:"containerRef",ref:r,class:Ko(["relative w-full h-full overflow-hidden select-none bg-[#02040a] touch-none",[l.value?"cursor-grabbing":a.value?"!cursor-pointer":"cursor-grab"]]),onPointerdown:Cx,onPointermove:Rx,onPointerup:Px,onPointerleave:Dx},[we("canvas",{ref_key:"canvasRef",ref:o,class:Ko(["block w-full h-full touch-none",a.value?"!cursor-pointer":""])},null,2),Ft(Ng,{name:"fade"},{default:bu(()=>[a.value?(on(),fn("div",{key:0,class:"pointer-events-none fixed z-40 transform -translate-x-1/2 -translate-y-full px-3.5 py-2 rounded-xl backdrop-blur-md border shadow-2xl transition-all duration-75 bg-[#020614]/90 text-white",style:Or({left:`${c.value.x}px`,top:`${c.value.y-14}px`,borderColor:a.value.color,boxShadow:`0 0 24px ${a.value.color}40`})},[we("div",yA,[we("span",{class:"inline-block w-2.5 h-2.5 rounded-full animate-pulse",style:Or({backgroundColor:a.value.color,boxShadow:`0 0 10px ${a.value.color}`})},null,4),we("span",MA,cn(a.value.name),1),we("span",SA,cn(a.value.codeName),1)]),we("div",wA,cn(a.value.tagline),1)],4)):Nc("",!0)]),_:1})],34))}}),TA=(n,e)=>{const t=n.__vccOpts||n;for(const[i,s]of e)t[i]=s;return t},AA=TA(EA,[["__scopeId","data-v-ba355caf"]]),CA=(n,e)=>{const t=n.__vccOpts||n;for(const[i,s]of e)t[i]=s;return t};async function No(n){return new Promise(e=>setTimeout(e,n))}const RA=zr({name:"AutoTyperVue",emits:["finished"],props:{componentTag:{type:String,default:"span",validator(n){return/^(span)|(h\d)|(p)|(a)$/.test(n)}},beginningWord:{type:String,default:""},writtenBeginningWord:{type:String,default:""},text:{type:[String,Array],required:!0,validator(n){return typeof n=="string"?n.length>0:n.every(e=>typeof e=="string"&&e.length>0)}},startDelay:{type:Number,default:500,validator(n){return n>=0}},betweenWordDelay:{type:Number,default:500,validator(n){return n>=0}},typingDelay:{type:Number,default:150,validator(n){return n>=0}},deletingDelay:{type:Number,default:100,validator(n){return n>=0}},waitBeforeDeleteDelay:{type:Number,default:500,validator(n){return n>=0}},startByDefault:{type:Boolean,default:!0},repeat:{type:Boolean,default:!0},removeAfterRepeat:{type:Boolean,default:!1}},data(){return{currentText:"",typedBeginningWord:"",textFeed:[]}},mounted(){this.startByDefault&&this.begin()},methods:{async begin(){typeof this.text=="string"?this.textFeed=[this.text]:this.textFeed=[...this.text],await No(this.startDelay),await this.writeBeginningWord(),this.autoType()},async writeBeginningWord(){if(this.writtenBeginningWord.length)for(let n of[...this.writtenBeginningWord])this.typedBeginningWord+=n,await No(this.typingDelay)},async autoType(){for(let n of this.textFeed){if(await this.writeWord(n),await No(this.waitBeforeDeleteDelay),!this.repeat&&!this.removeAfterRepeat&&this.textFeed.indexOf(n)===this.textFeed.length-1)break;await this.removeWord(n),await No(this.betweenWordDelay)}this.repeat?this.autoType():this.$emit("finished")},async writeWord(n){for(let e of[...n])this.currentText+=e,await No(this.typingDelay)},async removeWord(n){for(let e=0;e<n.length;e++)this.currentText=this.currentText.slice(0,-1),await No(this.deletingDelay)}}});function PA(n,e,t,i,s,r){return on(),wf(eb(n.componentTag),{class:"auto-typer-vue blink"},{default:bu(()=>[Hs(cn(n.beginningWord)+cn(n.typedBeginningWord)+cn(n.currentText),1)]),_:1})}const DA=CA(RA,[["render",PA]]),IA={key:0,class:"pointer-events-none fixed inset-0 z-50 flex flex-col justify-end md:justify-stretch md:items-end"},LA={class:"text-[9px] font-mono tracking-widest text-neutral-400 mt-1 uppercase"},NA={class:"px-4 py-2.5 md:px-6 md:py-3.5 border-b border-white/10 flex flex-col gap-1.5 shrink-0 bg-white/[0.02] select-none"},UA={class:"flex items-center justify-between gap-2"},FA={class:"text-[9px] md:text-[10px] font-mono tracking-widest uppercase text-cyan-400/90 flex items-center gap-1.5 min-w-0 truncate"},OA={class:"truncate"},kA={class:"flex items-center gap-1.5 md:gap-2 shrink-0"},BA=["title"],GA={class:"flex items-center gap-2.5 min-w-0 pt-0.5"},zA={class:"text-base md:text-2xl font-black text-white leading-tight tracking-tight break-words"},HA={key:0,class:"space-y-6"},VA={class:"flex flex-col sm:flex-row items-center gap-6"},WA={class:"text-center sm:text-left space-y-2"},XA={class:"text-sm md:text-base font-bold text-neutral-300"},YA={class:"flex flex-wrap gap-2.5"},qA=["href"],KA={class:"p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between"},$A={class:"flex items-center gap-3"},ZA={key:1,class:"space-y-6"},jA={class:"text-neutral-300 leading-relaxed text-sm md:text-base"},JA={class:"grid grid-cols-2 gap-2.5"},QA={class:"text-neutral-200"},eC={class:"grid grid-cols-2 gap-2.5"},tC={class:"text-neutral-200"},nC={key:2,class:"space-y-6"},iC={class:"relative group overflow-hidden rounded-2xl border border-white/10 shadow-lg"},sC=["src","alt"],rC={class:"text-neutral-300 leading-relaxed text-sm md:text-base"},oC={class:"flex flex-wrap gap-2"},aC={key:0,class:"flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-white/10 border border-white/10 text-neutral-200"},lC={class:"flex flex-col sm:flex-row gap-3 pt-2"},cC=["href"],uC=["href"],dC={key:3,class:"space-y-6"},hC={class:"p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"},fC={class:"flex items-center flex-wrap justify-between mb-3 gap-2"},pC={class:"flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider"},mC={class:"flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-cyan-500/10 border border-cyan-500/30 text-cyan-300"},gC={class:"text-neutral-200 text-sm md:text-base leading-relaxed font-medium"},_C={key:0,class:"text-neutral-300 text-xs md:text-sm mt-3 leading-relaxed border-t border-white/10 pt-3"},xC={class:"grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-mono"},vC={class:"text-neutral-300 text-[10px] uppercase tracking-wider"},bC={class:"text-cyan-300 font-bold text-xs md:text-sm mt-0.5 wrap-anywhere"},yC={class:"p-3 rounded-xl bg-white/5 border border-white/10"},MC={class:"text-cyan-300 font-bold text-xs md:text-sm mt-0.5"},SC={class:"p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/15 flex items-start gap-3"},wC=zr({__name:"TelemetryModal",props:{body:{},isOpen:{type:Boolean}},emits:["close","select"],setup(n,{emit:e}){const t=n,i=e,s=["Front-End Developer","Back-End Developer","Full-Stack Developer","Creative Web Engineer"],r=gi(!1),o=()=>{r.value=!r.value},a=()=>{r.value=!1,i("close")},l=gi(0),c=gi(!1),u=gi(null);let h=0,d=0,f=0;const x=J=>{window.innerWidth>=768||(h=J,d=J,f=Date.now(),c.value=!0)},S=J=>{if(!c.value)return;d=J;const be=J-h;be>0?l.value=be:r.value?l.value=Math.max(-15,be*.1):l.value=Math.max(-50,be*.4)},m=()=>{if(!c.value)return;c.value=!1;const J=l.value,be=Date.now()-f,gt=be>0?(d-h)/be:0;J<-30?(r.value=!0,l.value=0):r.value?((J>60||gt>.35)&&(r.value=!1),l.value=0):J>65||gt>.4&&J>20?(l.value=window.innerHeight*.75,setTimeout(()=>{a(),l.value=0,r.value=!1},180)):l.value=0},p=J=>{const be=J.target;be.closest("button")||be.closest("a")||(J.currentTarget.setPointerCapture(J.pointerId),x(J.clientY))},y=J=>{c.value&&S(J.clientY)},R=J=>{if(c.value){try{J.currentTarget.releasePointerCapture(J.pointerId)}catch{}m()}},M=J=>{if(c.value){try{J.currentTarget.releasePointerCapture(J.pointerId)}catch{}m()}},P=J=>{const be=J.target;be.closest("button")||be.closest("a")||x(J.touches[0].clientY)},T=J=>{c.value&&(J.cancelable&&J.preventDefault(),S(J.touches[0].clientY))},I=()=>{m()},v=J=>{window.innerWidth>=768||u.value&&u.value.scrollTop<=0&&x(J.touches[0].clientY)},A=J=>{if(!c.value)return;const be=J.touches[0].clientY,gt=be-h;gt>0&&u.value&&u.value.scrollTop<=0?(J.cancelable&&J.preventDefault(),S(be)):gt<0&&(c.value=!1,l.value=0)},F=()=>{m()},k=Gs(()=>{var be;const J={borderColor:((be=t.body)==null?void 0:be.color)||"#38bdf8"};return c.value?(J.transform=`translateY(${l.value}px)`,J.transition="none"):l.value!==0&&(J.transform=`translateY(${l.value}px)`,J.transition="transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)"),J}),U=Gs(()=>qo),ee=Gs(()=>t.body?U.value.findIndex(J=>{var be;return J.id===((be=t.body)==null?void 0:be.id)}):-1),le=Gs(()=>ee.value<=0?U.value[U.value.length-1]:U.value[ee.value-1]),$=Gs(()=>ee.value<0||ee.value>=U.value.length-1?U.value[0]:U.value[ee.value+1]),se=()=>{le.value&&i("select",le.value)},Z=()=>{$.value&&i("select",$.value)},ae=J=>{t.isOpen&&(J.key==="Escape"&&a(),J.key==="ArrowLeft"&&se(),J.key==="ArrowRight"&&Z())};Su(()=>{window.addEventListener("keydown",ae)}),wu(()=>{window.removeEventListener("keydown",ae)});const Te=Gs(()=>jd.filter(J=>J.category==="frontend"||!J.category)),He=Gs(()=>jd.filter(J=>J.category==="backend"||J.category==="database")),Oe=J=>jd.find(be=>be.key===J);return(J,be)=>(on(),wf(Ng,{"enter-active-class":"transition duration-300 ease-out","enter-from-class":"translate-y-full md:translate-y-0 md:translate-x-full opacity-0","enter-to-class":"translate-y-0 md:translate-x-0 opacity-100","leave-active-class":"transition duration-200 ease-in","leave-from-class":"translate-y-0 md:translate-x-0 opacity-100","leave-to-class":"translate-y-full md:translate-y-0 md:translate-x-full opacity-0"},{default:bu(()=>[J.isOpen&&J.body?(on(),fn("div",IA,[be[28]||(be[28]=we("div",{class:"pointer-events-none fixed inset-0 bg-transparent transition-opacity -z-10"},null,-1)),we("aside",{"aria-label":"Telemetry HUD Dossier",class:Ko(["pointer-events-auto relative w-full md:w-[480px] lg:w-[520px] xl:w-[560px] flex flex-col bg-[#030712]/95 md:bg-[#030712]/90 backdrop-blur-2xl border-t md:border-t-0 md:border-l border-white/15 rounded-t-3xl md:rounded-none shadow-[0_-20px_60px_rgba(0,0,0,0.85)] md:shadow-[-25px_0_60px_rgba(0,0,0,0.9)] overflow-hidden transition-[height,max-height] duration-300 ease-out",[r.value?"h-[92vh] max-h-[94vh] md:h-full md:max-h-full":"h-[70vh] max-h-[72vh] md:h-full md:max-h-full"]]),style:Or(k.value)},[we("div",{class:"w-full flex flex-col items-center pt-2 pb-1.5 md:hidden cursor-grab active:cursor-grabbing touch-none select-none",onPointerdown:p,onPointermove:y,onPointerup:R,onPointercancel:M,onTouchstart:P,onTouchmove:T,onTouchend:I,onTouchcancel:I,onClick:o},[be[8]||(be[8]=we("div",{class:"w-12 h-1.5 rounded-full bg-white/40 active:bg-cyan-400 transition-colors"},null,-1)),we("span",LA,cn(r.value?"Swipe down to collapse":"Swipe down to close • Tap to expand"),1)],32),we("div",NA,[we("div",UA,[we("div",FA,[be[9]||(be[9]=we("span",{class:"inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping shrink-0"},null,-1)),we("span",OA,cn(J.body.type==="vessel"||J.body.type==="station"||J.body.type==="phenomenon"?"DEEP SPACE":"PLANETARY")+" // "+cn(J.body.codeName),1)]),we("div",kA,[we("button",{onClick:se,onPointerdown:be[0]||(be[0]=ps(()=>{},["stop"])),onTouchstart:be[1]||(be[1]=ps(()=>{},["stop"])),class:"p-1.5 md:p-2 rounded-xl border border-white/10 hover:bg-white/10 active:bg-white/20 text-neutral-300 hover:text-white transition-colors",title:"Previous Celestial Body (Arrow Left)"},[Ft(pn(Pn),{icon:"solar:arrow-left-linear",class:"w-4 h-4 md:w-4.5 md:h-4.5"})],32),we("button",{onClick:Z,onPointerdown:be[2]||(be[2]=ps(()=>{},["stop"])),onTouchstart:be[3]||(be[3]=ps(()=>{},["stop"])),class:"p-1.5 md:p-2 rounded-xl border border-white/10 hover:bg-white/10 active:bg-white/20 text-neutral-300 hover:text-white transition-colors",title:"Next Celestial Body (Arrow Right)"},[Ft(pn(Pn),{icon:"solar:arrow-right-linear",class:"w-4 h-4 md:w-4.5 md:h-4.5"})],32),we("button",{onClick:o,onPointerdown:be[4]||(be[4]=ps(()=>{},["stop"])),onTouchstart:be[5]||(be[5]=ps(()=>{},["stop"])),class:"md:hidden p-1.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 transition-colors",title:r.value?"Collapse to half view":"Expand to full view"},[Ft(pn(Pn),{icon:r.value?"solar:minimize-square-minimalistic-linear":"solar:maximize-square-minimalistic-linear",class:"w-4 h-4"},null,8,["icon"])],40,BA),we("button",{onClick:a,onPointerdown:be[6]||(be[6]=ps(()=>{},["stop"])),onTouchstart:be[7]||(be[7]=ps(()=>{},["stop"])),class:"p-1.5 md:p-2 rounded-xl bg-white/10 hover:bg-white/20 active:bg-red-500/20 text-white hover:text-red-300 transition-colors",title:"Close Telemetry (Esc)"},[Ft(pn(Pn),{icon:"solar:close-circle-bold",class:"w-4 h-4 md:w-5 md:h-5"})],32)])]),we("div",GA,[we("span",{class:"w-3.5 h-3.5 rounded-full animate-pulse shadow-sm shrink-0",style:Or({backgroundColor:J.body.color,boxShadow:`0 0 12px ${J.body.color}`})},null,4),we("h2",zA,cn(J.body.name),1)])]),we("div",{ref_key:"scrollContainerRef",ref:u,class:"flex-1 overflow-y-auto p-4 md:p-6 space-y-5 custom-scrollbar overscroll-contain",onTouchstart:v,onTouchmove:A,onTouchend:F,onTouchcancel:F},[J.body.type==="star"?(on(),fn("div",HA,[we("div",VA,[be[12]||(be[12]=we("div",{class:"relative w-24 h-24 rounded-full p-1 border-2 border-amber-400 shadow-[0_0_25px_rgba(251,191,36,0.5)] flex items-center justify-center bg-gradient-to-tr from-amber-500 via-yellow-400 to-orange-500 shrink-0 animate-pulse"},[we("span",{class:"text-4xl"},"☀️")],-1)),we("div",WA,[be[10]||(be[10]=we("div",{class:"inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30"},[we("span",{class:"w-2 h-2 rounded-full bg-amber-400 animate-ping"}),Hs(" CORE STELLAR NURSERY // SOL-ANKO ")],-1)),be[11]||(be[11]=we("h3",{class:"text-2xl font-bold text-neutral-100"},[Hs(" Hi, I'm "),we("span",{class:"text-amber-400"},"Anko")],-1)),we("div",XA,[Ft(pn(DA),{class:"bg-gradient-to-r from-amber-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent",componentTag:"span",text:s})])])]),be[15]||(be[15]=we("p",{class:"text-neutral-300 leading-relaxed text-sm md:text-base"}," Pusat gravitasi dari seluruh ekosistem proyek dan keahlian digital ini. Menyinari dan menggerakkan setiap karya dengan perpaduan performa tinggi, animasi dinamis, serta estetika visual modern. ",-1)),we("div",null,[be[13]||(be[13]=we("h4",{class:"text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-3"}," Transmission Channels // Direct Comm Link ",-1)),we("div",YA,[(on(!0),fn(Vn,null,Ba(pn(bA),(gt,pt)=>(on(),fn("a",{key:pt,href:gt.href,target:"_blank",class:"flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all hover:scale-105 shadow-sm"},[Ft(pn(Pn),{icon:gt.icon,width:"20"},null,8,["icon"]),we("span",null,cn(gt.title),1),Ft(pn(Pn),{icon:"solar:arrow-right-up-linear",width:"16",class:"text-neutral-400"})],8,qA))),128))])]),we("div",KA,[we("div",$A,[Ft(pn(Pn),{icon:"solar:shield-check-bold",width:"24",class:"text-emerald-400"}),be[14]||(be[14]=we("div",null,[we("div",{class:"text-xs font-mono text-neutral-400"},"STATUS OPERASIONAL"),we("div",{class:"text-sm font-bold text-emerald-400"}," Available for Freelance & Full-Time ")],-1))])])])):J.body.type==="skills"?(on(),fn("div",ZA,[we("p",jA,cn(J.body.tagline),1),we("div",null,[be[16]||(be[16]=we("div",{class:"text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-3"}," Orbital Frontend Systems ",-1)),we("div",JA,[(on(!0),fn(Vn,null,Ba(Te.value,(gt,pt)=>(on(),fn("div",{key:pt,class:"flex items-center gap-2 px-3 py-2 rounded-xl text-xs md:text-sm font-semibold bg-white/5 border border-white/10 hover:border-cyan-400 transition-colors shadow-sm"},[Ft(pn(Pn),{icon:gt.icon,width:"18"},null,8,["icon"]),we("span",QA,cn(gt.title),1)]))),128))])]),we("div",null,[be[17]||(be[17]=we("div",{class:"text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-3"}," Core Backend & Storage Arrays ",-1)),we("div",eC,[(on(!0),fn(Vn,null,Ba(He.value,(gt,pt)=>(on(),fn("div",{key:pt,class:"flex items-center gap-2 px-3 py-2 rounded-xl text-xs md:text-sm font-semibold bg-white/5 border border-white/10 hover:border-purple-400 transition-colors shadow-sm"},[Ft(pn(Pn),{icon:gt.icon,width:"18"},null,8,["icon"]),we("span",tC,cn(gt.title),1)]))),128))])])])):J.body.projectData?(on(),fn("div",nC,[we("div",iC,[we("img",{src:J.body.projectData.img,alt:J.body.projectData.title,class:"w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"},null,8,sC),be[18]||(be[18]=we("div",{class:"absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4"},[we("div",{class:"font-mono text-xs text-white/90"},"STATUS: EXPLORED & OPERATIONAL")],-1))]),we("p",rC,cn(J.body.projectData.desc),1),we("div",null,[be[19]||(be[19]=we("div",{class:"text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-2.5"}," Deployed Propulsion Stacks ",-1)),we("div",oC,[(on(!0),fn(Vn,null,Ba(J.body.projectData.techs,gt=>(on(),fn(Vn,{key:gt},[Oe(gt)?(on(),fn("span",aC,[Ft(pn(Pn),{icon:Oe(gt).icon,width:"16"},null,8,["icon"]),Hs(" "+cn(Oe(gt).title),1)])):Nc("",!0)],64))),128))])]),we("div",lC,[we("a",{href:J.body.projectData.web,target:"_blank",class:"flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02]"},[Ft(pn(Pn),{icon:"solar:rocket-bold",width:"18"}),be[20]||(be[20]=Hs(" Launch Mission (Live Demo) ",-1))],8,cC),we("a",{href:J.body.projectData.github,target:"_blank",class:"flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all hover:scale-[1.02]"},[Ft(pn(Pn),{icon:"solar:code-bold",width:"18"}),be[21]||(be[21]=Hs(" Source Code ",-1))],8,uC)])])):(on(),fn("div",dC,[we("div",hC,[we("div",fC,[we("div",pC,[be[22]||(be[22]=we("span",{class:"inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping"},null,-1)),Hs(" "+cn((J.body.type||"DEEP SPACE").toUpperCase())+" TELEMETRY FEED ",1)]),we("div",mC,[Ft(pn(Pn),{icon:J.body.icon||"solar:telescope-bold",width:"14"},null,8,["icon"]),we("span",null,cn(J.body.codeName),1)])]),we("p",gC,cn(J.body.tagline),1),J.body.lore?(on(),fn("p",_C,cn(J.body.lore),1)):Nc("",!0)]),we("div",xC,[J.body.extraStats&&J.body.extraStats.length>0?(on(!0),fn(Vn,{key:0},Ba(J.body.extraStats,(gt,pt)=>(on(),fn("div",{key:pt,class:"p-3 rounded-xl bg-white/5 border border-white/10"},[we("div",vC,cn(gt.label),1),we("div",bC,cn(gt.value),1)]))),128)):(on(),fn(Vn,{key:1},[we("div",yC,[be[23]||(be[23]=we("div",{class:"text-neutral-500 text-[10px] uppercase tracking-wider"}," Orbital Radius ",-1)),we("div",MC,cn(J.body.orbitRadius)+" AU ",1)]),be[24]||(be[24]=we("div",{class:"p-3 rounded-xl bg-white/5 border border-white/10"},[we("div",{class:"text-neutral-500 text-[10px] uppercase tracking-wider"}," Telemetry Signal "),we("div",{class:"text-emerald-400 font-bold text-xs md:text-sm mt-0.5"}," 1420.405 MHz ")],-1)),be[25]||(be[25]=we("div",{class:"p-3 rounded-xl bg-white/5 border border-white/10"},[we("div",{class:"text-neutral-500 text-[10px] uppercase tracking-wider"},"Status"),we("div",{class:"text-cyan-300 font-bold text-xs md:text-sm mt-0.5"},"Operational")],-1))],64))]),we("div",SC,[Ft(pn(Pn),{icon:"solar:radar-bold",width:"20",class:"text-cyan-400 shrink-0 mt-0.5"}),be[26]||(be[26]=we("p",{class:"text-neutral-300 text-xs leading-relaxed font-mono"}," Sensor navigasi mengonfirmasi posisi stabil di luar bidang orbit tata surya utama. Terhubung dengan jaringan starlight relay. ",-1))])]))],544),be[27]||(be[27]=we("div",{class:"hidden md:flex p-3.5 md:p-4 border-t border-white/10 bg-black/40 items-center justify-between text-xs font-mono text-neutral-400 shrink-0"},[we("div",{class:"flex items-center gap-2"},[we("span",{class:"w-2 h-2 rounded-full bg-cyan-400 animate-ping"}),we("span",{class:"text-cyan-300 font-semibold uppercase tracking-wider text-[11px] md:text-xs"},"3D TARGET LOCK // ACTIVE TRACKING")]),we("div",{class:"text-[10px] md:text-[11px] text-neutral-500"},"ESC / Tap 3D to Unfollow")],-1))],6)])):Nc("",!0)]),_:1}))}}),EC={"aria-label":"Mission Control HUD",class:"fixed bottom-5 left-0 right-0 z-40 px-4 pointer-events-none flex justify-center"},TC={class:"pointer-events-auto flex items-center gap-2.5 text-xs font-mono p-1.5 rounded-2xl cosmic-glass border border-white/10 shadow-2xl backdrop-blur-xl"},AC={class:"flex items-center rounded-xl bg-white/5 border border-white/10 overflow-hidden"},CC=zr({__name:"MissionControlHUD",props:{orbitSpeedMultiplier:{}},emits:["reset-view","toggle-speed","zoom-in","zoom-out"],setup(n,{emit:e}){const t=e;return(i,s)=>(on(),fn("aside",EC,[we("div",TC,[we("button",{onClick:s[0]||(s[0]=r=>t("toggle-speed")),class:"flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-white/10 text-neutral-200 transition-all shadow-sm",title:"Cycle Orbit Speed (1x / 2x / Paused)"},[Ft(pn(Pn),{icon:i.orbitSpeedMultiplier===0?"solar:play-bold":"solar:stopwatch-bold",width:"16",class:"text-amber-400"},null,8,["icon"]),we("span",null,cn(i.orbitSpeedMultiplier===0?"Paused":`${i.orbitSpeedMultiplier}x Orbit`),1)]),s[6]||(s[6]=we("span",{class:"text-white/15"},"|",-1)),we("button",{onClick:s[1]||(s[1]=r=>t("reset-view")),class:"flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-white/10 text-neutral-200 transition-all shadow-sm",title:"Recenter Solar View"},[Ft(pn(Pn),{icon:"fluent-mdl2:focus-view",width:"16",class:"text-cyan-400"}),s[4]||(s[4]=we("span",null,"Recenter",-1))]),s[7]||(s[7]=we("span",{class:"text-white/15"},"|",-1)),we("div",AC,[we("button",{onClick:s[2]||(s[2]=r=>t("zoom-out")),class:"p-1.5 px-2.5 hover:bg-white/10 text-neutral-300 transition-colors",title:"Zoom Out","aria-label":"Zoom Out"},[Ft(pn(Pn),{icon:"solar:magnifer-zoom-out-linear",width:"16"})]),s[5]||(s[5]=we("span",{class:"text-neutral-600 text-[10px]"},"|",-1)),we("button",{onClick:s[3]||(s[3]=r=>t("zoom-in")),class:"p-1.5 px-2.5 hover:bg-white/10 text-neutral-300 transition-colors",title:"Zoom In","aria-label":"Zoom In"},[Ft(pn(Pn),{icon:"solar:magnifer-zoom-in-linear",width:"16"})])])])]))}}),RC={class:"relative w-full h-screen font-mono text-white overflow-hidden bg-[#02040a] select-none"},PC={class:"fixed inset-0 w-screen h-screen z-0 overflow-hidden"},DC=zr({__name:"App",setup(n){const e=gi(null),t=gi(null),i=gi(!1),s=gi(1),r=d=>{t.value=d,d?i.value=!0:i.value=!1},o=()=>{var d;i.value=!1,t.value=null,(d=e.value)==null||d.resetView()},a=()=>{var d;t.value=null,(d=e.value)==null||d.resetView()},l=()=>{var d;(d=e.value)==null||d.zoomIn()},c=()=>{var d;(d=e.value)==null||d.zoomOut()},u=()=>{s.value===1?s.value=2:s.value===2?s.value=0:s.value=1},h=d=>{if(d==="sun"){const f=qo.find(x=>x.id==="sun");f&&r(f)}else if(d==="skills"){const f=qo.find(x=>x.id==="skills");f&&r(f)}else if(d==="projects"){const f=qo.find(x=>x.type==="project");f&&r(f)}};return(d,f)=>{var x;return on(),fn("div",RC,[Ft(RM,{onNavigate:h}),we("main",PC,[Ft(AA,{ref_key:"canvasRef",ref:e,"orbit-speed-multiplier":s.value,"selected-body-id":(x=t.value)==null?void 0:x.id,"is-panel-open":i.value,onSelect:r,onUnselect:o},null,8,["orbit-speed-multiplier","selected-body-id","is-panel-open"])]),Ft(CC,{"orbit-speed-multiplier":s.value,onResetView:a,onToggleSpeed:u,onZoomIn:l,onZoomOut:c},null,8,["orbit-speed-multiplier"]),Ft(wC,{body:t.value,"is-open":i.value,onClose:o,onSelect:r},null,8,["body","is-open"])])}}});yy(DC).mount("#app");
