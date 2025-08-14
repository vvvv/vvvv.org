import{D as _e,V as jt,af as Ft,ag as fn,ah as hn,H as Ut,p as vt,ai as Dt,Z as co,b as O,c as ee,e as y,z as uo,B as fo,r as lt,u as vn,M as st,f as mt,g as xt,h as ze,k as me,l as wt,F as Xt,a1 as rt,d as re,J as De,A as it,L as pn,j as Zt,aj as at,s as Me,t as ho,ak as vo,v as Kt,w as Q,a2 as po,ae as go,C as qe}from"./app.js";import{i as Jt,a as gn,l as bo,h as gt,g as en,m as mo,u as bn,e as xo}from"./app-Dropdown-CjLjgLKH.js";import{r as P,f as $,p as Tt,d as he,i as It,h as r,D as wo,k as dt,aa as yo,a4 as Co,z as ue,n as bt,q as So,w as Se,l as mn,T as xn,F as wn,x as Gt,j as zo,G as Ro,H as Fo}from"./app-vue-BNvXdoBb.js";import{i as To,e as Po,D as Qt,S as yn,E as Io,p as Oo,W as ko,f as Mo,o as tn,h as nn,F as _o,V as $o,G as Ao,u as qt,H as on,I as Eo}from"./app-utils-IjCUxnmS.js";import{N as Wt}from"./app-Tag-411bfkJT.js";import{l as Bo}from"./app-LinksHelper-B_PmFw0I.js";function rn(e){return e&-e}class Cn{constructor(o,n){this.l=o,this.min=n;const l=new Array(o+1);for(let d=0;d<o+1;++d)l[d]=0;this.ft=l}add(o,n){if(n===0)return;const{l,ft:d}=this;for(o+=1;o<=l;)d[o]+=n,o+=rn(o)}get(o){return this.sum(o+1)-this.sum(o)}sum(o){if(o===void 0&&(o=this.l),o<=0)return 0;const{ft:n,min:l,l:d}=this;if(o>d)throw new Error("[FinweckTree.sum]: `i` is larger than length.");let h=o*l;for(;o>0;)h+=n[o],o-=rn(o);return h}getBound(o){let n=0,l=this.l;for(;l>n;){const d=Math.floor((n+l)/2),h=this.sum(d);if(h>o){l=d;continue}else if(h<o){if(n===d)return this.sum(n+1)<=o?n+1:d;n=d}else return d}return n}}let St;function Lo(){return typeof document>"u"?!1:(St===void 0&&("matchMedia"in window?St=window.matchMedia("(pointer:coarse)").matches:St=!1),St)}let Vt;function ln(){return typeof document>"u"?1:(Vt===void 0&&(Vt="chrome"in window?window.devicePixelRatio:1),Vt)}const Sn="VVirtualListXScroll";function Do({columnsRef:e,renderColRef:o,renderItemWithColsRef:n}){const l=P(0),d=P(0),h=$(()=>{const v=e.value;if(v.length===0)return null;const s=new Cn(v.length,0);return v.forEach((m,x)=>{s.add(x,m.width)}),s}),f=_e(()=>{const v=h.value;return v!==null?Math.max(v.getBound(d.value)-1,0):0}),a=v=>{const s=h.value;return s!==null?s.sum(v):0},u=_e(()=>{const v=h.value;return v!==null?Math.min(v.getBound(d.value+l.value)+1,e.value.length-1):0});return Tt(Sn,{startIndexRef:f,endIndexRef:u,columnsRef:e,renderColRef:o,renderItemWithColsRef:n,getLeft:a}),{listWidthRef:l,scrollLeftRef:d}}const an=he({name:"VirtualListRow",props:{index:{type:Number,required:!0},item:{type:Object,required:!0}},setup(){const{startIndexRef:e,endIndexRef:o,columnsRef:n,getLeft:l,renderColRef:d,renderItemWithColsRef:h}=It(Sn);return{startIndex:e,endIndex:o,columns:n,renderCol:d,renderItemWithCols:h,getLeft:l}},render(){const{startIndex:e,endIndex:o,columns:n,renderCol:l,renderItemWithCols:d,getLeft:h,item:f}=this;if(d!=null)return d({itemIndex:this.index,startColIndex:e,endColIndex:o,allColumns:n,item:f,getLeft:h});if(l!=null){const a=[];for(let u=e;u<=o;++u){const v=n[u];a.push(l({column:v,left:h(u),item:f}))}return a}return null}}),Wo=Ft(".v-vl",{maxHeight:"inherit",height:"100%",overflow:"auto",minWidth:"1px"},[Ft("&:not(.v-vl--show-scrollbar)",{scrollbarWidth:"none"},[Ft("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb",{width:0,height:0,display:"none"})])]),Vo=he({name:"VirtualList",inheritAttrs:!1,props:{showScrollbar:{type:Boolean,default:!0},columns:{type:Array,default:()=>[]},renderCol:Function,renderItemWithCols:Function,items:{type:Array,default:()=>[]},itemSize:{type:Number,required:!0},itemResizable:Boolean,itemsStyle:[String,Object],visibleItemsTag:{type:[String,Object],default:"div"},visibleItemsProps:Object,ignoreItemResize:Boolean,onScroll:Function,onWheel:Function,onResize:Function,defaultScrollKey:[Number,String],defaultScrollIndex:Number,keyField:{type:String,default:"key"},paddingTop:{type:[Number,String],default:0},paddingBottom:{type:[Number,String],default:0}},setup(e){const o=fn();Wo.mount({id:"vueuc/virtual-list",head:!0,anchorMetaName:hn,ssr:o}),dt(()=>{const{defaultScrollIndex:g,defaultScrollKey:R}=e;g!=null?W({index:g}):R!=null&&W({key:R})});let n=!1,l=!1;yo(()=>{if(n=!1,!l){l=!0;return}W({top:F.value,left:f.value})}),Co(()=>{n=!0,l||(l=!0)});const d=_e(()=>{if(e.renderCol==null&&e.renderItemWithCols==null||e.columns.length===0)return;let g=0;return e.columns.forEach(R=>{g+=R.width}),g}),h=$(()=>{const g=new Map,{keyField:R}=e;return e.items.forEach((B,q)=>{g.set(B[R],q)}),g}),{scrollLeftRef:f,listWidthRef:a}=Do({columnsRef:ue(e,"columns"),renderColRef:ue(e,"renderCol"),renderItemWithColsRef:ue(e,"renderItemWithCols")}),u=P(null),v=P(void 0),s=new Map,m=$(()=>{const{items:g,itemSize:R,keyField:B}=e,q=new Cn(g.length,R);return g.forEach((X,G)=>{const J=X[B],K=s.get(J);K!==void 0&&q.add(G,K)}),q}),x=P(0),F=P(0),S=_e(()=>Math.max(m.value.getBound(F.value-Ut(e.paddingTop))-1,0)),E=$(()=>{const{value:g}=v;if(g===void 0)return[];const{items:R,itemSize:B}=e,q=S.value,X=Math.min(q+Math.ceil(g/B+1),R.length-1),G=[];for(let J=q;J<=X;++J)G.push(R[J]);return G}),W=(g,R)=>{if(typeof g=="number"){A(g,R,"auto");return}const{left:B,top:q,index:X,key:G,position:J,behavior:K,debounce:de=!0}=g;if(B!==void 0||q!==void 0)A(B,q,K);else if(X!==void 0)k(X,K,de);else if(G!==void 0){const b=h.value.get(G);b!==void 0&&k(b,K,de)}else J==="bottom"?A(0,Number.MAX_SAFE_INTEGER,K):J==="top"&&A(0,0,K)};let _,T=null;function k(g,R,B){const{value:q}=m,X=q.sum(g)+Ut(e.paddingTop);if(!B)u.value.scrollTo({left:0,top:X,behavior:R});else{_=g,T!==null&&window.clearTimeout(T),T=window.setTimeout(()=>{_=void 0,T=null},16);const{scrollTop:G,offsetHeight:J}=u.value;if(X>G){const K=q.get(g);X+K<=G+J||u.value.scrollTo({left:0,top:X+K-J,behavior:R})}else u.value.scrollTo({left:0,top:X,behavior:R})}}function A(g,R,B){u.value.scrollTo({left:g,top:R,behavior:B})}function L(g,R){var B,q,X;if(n||e.ignoreItemResize||fe(R.target))return;const{value:G}=m,J=h.value.get(g),K=G.get(J),de=(X=(q=(B=R.borderBoxSize)===null||B===void 0?void 0:B[0])===null||q===void 0?void 0:q.blockSize)!==null&&X!==void 0?X:R.contentRect.height;if(de===K)return;de-e.itemSize===0?s.delete(g):s.set(g,de-e.itemSize);const C=de-K;if(C===0)return;G.add(J,C);const j=u.value;if(j!=null){if(_===void 0){const ve=G.sum(J);j.scrollTop>ve&&j.scrollBy(0,C)}else if(J<_)j.scrollBy(0,C);else if(J===_){const ve=G.sum(J);de+ve>j.scrollTop+j.offsetHeight&&j.scrollBy(0,C)}ae()}x.value++}const ie=!Lo();let N=!1;function le(g){var R;(R=e.onScroll)===null||R===void 0||R.call(e,g),(!ie||!N)&&ae()}function te(g){var R;if((R=e.onWheel)===null||R===void 0||R.call(e,g),ie){const B=u.value;if(B!=null){if(g.deltaX===0&&(B.scrollTop===0&&g.deltaY<=0||B.scrollTop+B.offsetHeight>=B.scrollHeight&&g.deltaY>=0))return;g.preventDefault(),B.scrollTop+=g.deltaY/ln(),B.scrollLeft+=g.deltaX/ln(),ae(),N=!0,To(()=>{N=!1})}}}function ne(g){if(n||fe(g.target))return;if(e.renderCol==null&&e.renderItemWithCols==null){if(g.contentRect.height===v.value)return}else if(g.contentRect.height===v.value&&g.contentRect.width===a.value)return;v.value=g.contentRect.height,a.value=g.contentRect.width;const{onResize:R}=e;R!==void 0&&R(g)}function ae(){const{value:g}=u;g!=null&&(F.value=g.scrollTop,f.value=g.scrollLeft)}function fe(g){let R=g;for(;R!==null;){if(R.style.display==="none")return!0;R=R.parentElement}return!1}return{listHeight:v,listStyle:{overflow:"auto"},keyToIndex:h,itemsStyle:$(()=>{const{itemResizable:g}=e,R=vt(m.value.sum());return x.value,[e.itemsStyle,{boxSizing:"content-box",width:vt(d.value),height:g?"":R,minHeight:g?R:"",paddingTop:vt(e.paddingTop),paddingBottom:vt(e.paddingBottom)}]}),visibleItemsStyle:$(()=>(x.value,{transform:`translateY(${vt(m.value.sum(S.value))})`})),viewportItems:E,listElRef:u,itemsElRef:P(null),scrollTo:W,handleListResize:ne,handleListScroll:le,handleListWheel:te,handleItemResize:L}},render(){const{itemResizable:e,keyField:o,keyToIndex:n,visibleItemsTag:l}=this;return r(jt,{onResize:this.handleListResize},{default:()=>{var d,h;return r("div",wo(this.$attrs,{class:["v-vl",this.showScrollbar&&"v-vl--show-scrollbar"],onScroll:this.handleListScroll,onWheel:this.handleListWheel,ref:"listElRef"}),[this.items.length!==0?r("div",{ref:"itemsElRef",class:"v-vl-items",style:this.itemsStyle},[r(l,Object.assign({class:"v-vl-visible-items",style:this.visibleItemsStyle},this.visibleItemsProps),{default:()=>{const{renderCol:f,renderItemWithCols:a}=this;return this.viewportItems.map(u=>{const v=u[o],s=n.get(v),m=f!=null?r(an,{index:s,item:u}):void 0,x=a!=null?r(an,{index:s,item:u}):void 0,F=this.$slots.default({item:u,renderedCols:m,renderedItemWithCols:x,index:s})[0];return e?r(jt,{key:v,onResize:S=>this.handleItemResize(v,S)},{default:()=>F}):(F.key=v,F)})}})]):(h=(d=this.$slots).empty)===null||h===void 0?void 0:h.call(d)])}})}}),ke="v-hidden",Ho=Ft("[v-hidden]",{display:"none!important"}),sn=he({name:"Overflow",props:{getCounter:Function,getTail:Function,updateCounter:Function,onUpdateCount:Function,onUpdateOverflow:Function},setup(e,{slots:o}){const n=P(null),l=P(null);function d(f){const{value:a}=n,{getCounter:u,getTail:v}=e;let s;if(u!==void 0?s=u():s=l.value,!a||!s)return;s.hasAttribute(ke)&&s.removeAttribute(ke);const{children:m}=a;if(f.showAllItemsBeforeCalculate)for(const k of m)k.hasAttribute(ke)&&k.removeAttribute(ke);const x=a.offsetWidth,F=[],S=o.tail?v?.():null;let E=S?S.offsetWidth:0,W=!1;const _=a.children.length-(o.tail?1:0);for(let k=0;k<_-1;++k){if(k<0)continue;const A=m[k];if(W){A.hasAttribute(ke)||A.setAttribute(ke,"");continue}else A.hasAttribute(ke)&&A.removeAttribute(ke);const L=A.offsetWidth;if(E+=L,F[k]=L,E>x){const{updateCounter:ie}=e;for(let N=k;N>=0;--N){const le=_-1-N;ie!==void 0?ie(le):s.textContent=`${le}`;const te=s.offsetWidth;if(E-=F[N],E+te<=x||N===0){W=!0,k=N-1,S&&(k===-1?(S.style.maxWidth=`${x-te}px`,S.style.boxSizing="border-box"):S.style.maxWidth="");const{onUpdateCount:ne}=e;ne&&ne(le);break}}}}const{onUpdateOverflow:T}=e;W?T!==void 0&&T(!0):(T!==void 0&&T(!1),s.setAttribute(ke,""))}const h=fn();return Ho.mount({id:"vueuc/overflow",head:!0,anchorMetaName:hn,ssr:h}),dt(()=>d({showAllItemsBeforeCalculate:!1})),{selfRef:n,counterRef:l,sync:d}},render(){const{$slots:e}=this;return bt(()=>this.sync({showAllItemsBeforeCalculate:!1})),r("div",{class:"v-overflow",ref:"selfRef"},[So(e,"default"),e.counter?e.counter():r("span",{style:{display:"inline-block"},ref:"counterRef"}),e.tail?e.tail():null])}});function zn(e,o){o&&(dt(()=>{const{value:n}=e;n&&Dt.registerHandler(n,o)}),Se(e,(n,l)=>{l&&Dt.unregisterHandler(l)},{deep:!1}),mn(()=>{const{value:n}=e;n&&Dt.unregisterHandler(n)}))}const No=new WeakSet;function jo(e){No.add(e)}function Vr(e){return Object.keys(e)}function Ht(e){const o=e.filter(n=>n!==void 0);if(o.length!==0)return o.length===1?o[0]:n=>{e.forEach(l=>{l&&l(n)})}}const Uo=he({name:"Checkmark",render(){return r("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16"},r("g",{fill:"none"},r("path",{d:"M14.046 3.486a.75.75 0 0 1-.032 1.06l-7.93 7.474a.85.85 0 0 1-1.188-.022l-2.68-2.72a.75.75 0 1 1 1.068-1.053l2.234 2.267l7.468-7.038a.75.75 0 0 1 1.06.032z",fill:"currentColor"})))}}),Ko=he({name:"ChevronDown",render(){return r("svg",{viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"},r("path",{d:"M3.14645 5.64645C3.34171 5.45118 3.65829 5.45118 3.85355 5.64645L8 9.79289L12.1464 5.64645C12.3417 5.45118 12.6583 5.45118 12.8536 5.64645C13.0488 5.84171 13.0488 6.15829 12.8536 6.35355L8.35355 10.8536C8.15829 11.0488 7.84171 11.0488 7.64645 10.8536L3.14645 6.35355C2.95118 6.15829 2.95118 5.84171 3.14645 5.64645Z",fill:"currentColor"}))}}),Go=co("clear",()=>r("svg",{viewBox:"0 0 16 16",version:"1.1",xmlns:"http://www.w3.org/2000/svg"},r("g",{stroke:"none","stroke-width":"1",fill:"none","fill-rule":"evenodd"},r("g",{fill:"currentColor","fill-rule":"nonzero"},r("path",{d:"M8,2 C11.3137085,2 14,4.6862915 14,8 C14,11.3137085 11.3137085,14 8,14 C4.6862915,14 2,11.3137085 2,8 C2,4.6862915 4.6862915,2 8,2 Z M6.5343055,5.83859116 C6.33943736,5.70359511 6.07001296,5.72288026 5.89644661,5.89644661 L5.89644661,5.89644661 L5.83859116,5.9656945 C5.70359511,6.16056264 5.72288026,6.42998704 5.89644661,6.60355339 L5.89644661,6.60355339 L7.293,8 L5.89644661,9.39644661 L5.83859116,9.4656945 C5.70359511,9.66056264 5.72288026,9.92998704 5.89644661,10.1035534 L5.89644661,10.1035534 L5.9656945,10.1614088 C6.16056264,10.2964049 6.42998704,10.2771197 6.60355339,10.1035534 L6.60355339,10.1035534 L8,8.707 L9.39644661,10.1035534 L9.4656945,10.1614088 C9.66056264,10.2964049 9.92998704,10.2771197 10.1035534,10.1035534 L10.1035534,10.1035534 L10.1614088,10.0343055 C10.2964049,9.83943736 10.2771197,9.57001296 10.1035534,9.39644661 L10.1035534,9.39644661 L8.707,8 L10.1035534,6.60355339 L10.1614088,6.5343055 C10.2964049,6.33943736 10.2771197,6.07001296 10.1035534,5.89644661 L10.1035534,5.89644661 L10.0343055,5.83859116 C9.83943736,5.70359511 9.57001296,5.72288026 9.39644661,5.89644661 L9.39644661,5.89644661 L8,7.293 L6.60355339,5.89644661 Z"}))))),qo=he({name:"Empty",render(){return r("svg",{viewBox:"0 0 28 28",fill:"none",xmlns:"http://www.w3.org/2000/svg"},r("path",{d:"M26 7.5C26 11.0899 23.0899 14 19.5 14C15.9101 14 13 11.0899 13 7.5C13 3.91015 15.9101 1 19.5 1C23.0899 1 26 3.91015 26 7.5ZM16.8536 4.14645C16.6583 3.95118 16.3417 3.95118 16.1464 4.14645C15.9512 4.34171 15.9512 4.65829 16.1464 4.85355L18.7929 7.5L16.1464 10.1464C15.9512 10.3417 15.9512 10.6583 16.1464 10.8536C16.3417 11.0488 16.6583 11.0488 16.8536 10.8536L19.5 8.20711L22.1464 10.8536C22.3417 11.0488 22.6583 11.0488 22.8536 10.8536C23.0488 10.6583 23.0488 10.3417 22.8536 10.1464L20.2071 7.5L22.8536 4.85355C23.0488 4.65829 23.0488 4.34171 22.8536 4.14645C22.6583 3.95118 22.3417 3.95118 22.1464 4.14645L19.5 6.79289L16.8536 4.14645Z",fill:"currentColor"}),r("path",{d:"M25 22.75V12.5991C24.5572 13.0765 24.053 13.4961 23.5 13.8454V16H17.5L17.3982 16.0068C17.0322 16.0565 16.75 16.3703 16.75 16.75C16.75 18.2688 15.5188 19.5 14 19.5C12.4812 19.5 11.25 18.2688 11.25 16.75L11.2432 16.6482C11.1935 16.2822 10.8797 16 10.5 16H4.5V7.25C4.5 6.2835 5.2835 5.5 6.25 5.5H12.2696C12.4146 4.97463 12.6153 4.47237 12.865 4H6.25C4.45507 4 3 5.45507 3 7.25V22.75C3 24.5449 4.45507 26 6.25 26H21.75C23.5449 26 25 24.5449 25 22.75ZM4.5 22.75V17.5H9.81597L9.85751 17.7041C10.2905 19.5919 11.9808 21 14 21L14.215 20.9947C16.2095 20.8953 17.842 19.4209 18.184 17.5H23.5V22.75C23.5 23.7165 22.7165 24.5 21.75 24.5H6.25C5.2835 24.5 4.5 23.7165 4.5 22.75Z",fill:"currentColor"}))}}),Yo=he({name:"Eye",render(){return r("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},r("path",{d:"M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 0 0-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 0 0 0-17.47C428.89 172.28 347.8 112 255.66 112z",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"}),r("circle",{cx:"256",cy:"256",r:"80",fill:"none",stroke:"currentColor","stroke-miterlimit":"10","stroke-width":"32"}))}}),Xo=he({name:"EyeOff",render(){return r("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},r("path",{d:"M432 448a15.92 15.92 0 0 1-11.31-4.69l-352-352a16 16 0 0 1 22.62-22.62l352 352A16 16 0 0 1 432 448z",fill:"currentColor"}),r("path",{d:"M255.66 384c-41.49 0-81.5-12.28-118.92-36.5c-34.07-22-64.74-53.51-88.7-91v-.08c19.94-28.57 41.78-52.73 65.24-72.21a2 2 0 0 0 .14-2.94L93.5 161.38a2 2 0 0 0-2.71-.12c-24.92 21-48.05 46.76-69.08 76.92a31.92 31.92 0 0 0-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416a239.13 239.13 0 0 0 75.8-12.58a2 2 0 0 0 .77-3.31l-21.58-21.58a4 4 0 0 0-3.83-1a204.8 204.8 0 0 1-51.16 6.47z",fill:"currentColor"}),r("path",{d:"M490.84 238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96a227.34 227.34 0 0 0-74.89 12.83a2 2 0 0 0-.75 3.31l21.55 21.55a4 4 0 0 0 3.88 1a192.82 192.82 0 0 1 50.21-6.69c40.69 0 80.58 12.43 118.55 37c34.71 22.4 65.74 53.88 89.76 91a.13.13 0 0 1 0 .16a310.72 310.72 0 0 1-64.12 72.73a2 2 0 0 0-.15 2.95l19.9 19.89a2 2 0 0 0 2.7.13a343.49 343.49 0 0 0 68.64-78.48a32.2 32.2 0 0 0-.1-34.78z",fill:"currentColor"}),r("path",{d:"M256 160a95.88 95.88 0 0 0-21.37 2.4a2 2 0 0 0-1 3.38l112.59 112.56a2 2 0 0 0 3.38-1A96 96 0 0 0 256 160z",fill:"currentColor"}),r("path",{d:"M165.78 233.66a2 2 0 0 0-3.38 1a96 96 0 0 0 115 115a2 2 0 0 0 1-3.38z",fill:"currentColor"}))}}),Zo=O("base-clear",`
 flex-shrink: 0;
 height: 1em;
 width: 1em;
 position: relative;
`,[ee(">",[y("clear",`
 font-size: var(--n-clear-size);
 height: 1em;
 width: 1em;
 cursor: pointer;
 color: var(--n-clear-color);
 transition: color .3s var(--n-bezier);
 display: flex;
 `,[ee("&:hover",`
 color: var(--n-clear-color-hover)!important;
 `),ee("&:active",`
 color: var(--n-clear-color-pressed)!important;
 `)]),y("placeholder",`
 display: flex;
 `),y("clear, placeholder",`
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 `,[uo({originalTransform:"translateX(-50%) translateY(-50%)",left:"50%",top:"50%"})])])]),Yt=he({name:"BaseClear",props:{clsPrefix:{type:String,required:!0},show:Boolean,onClear:Function},setup(e){return vn("-base-clear",Zo,ue(e,"clsPrefix")),{handleMouseDown(o){o.preventDefault()}}},render(){const{clsPrefix:e}=this;return r("div",{class:`${e}-base-clear`},r(fo,null,{default:()=>{var o,n;return this.show?r("div",{key:"dismiss",class:`${e}-base-clear__clear`,onClick:this.onClear,onMousedown:this.handleMouseDown,"data-clear":!0},lt(this.$slots.icon,()=>[r(st,{clsPrefix:e},{default:()=>r(Go,null)})])):r("div",{key:"icon",class:`${e}-base-clear__placeholder`},(n=(o=this.$slots).placeholder)===null||n===void 0?void 0:n.call(o))}}))}}),Jo=he({props:{onFocus:Function,onBlur:Function},setup(e){return()=>r("div",{style:"width: 0; height: 0",tabindex:0,onFocus:e.onFocus,onBlur:e.onBlur})}}),Qo={iconSizeTiny:"28px",iconSizeSmall:"34px",iconSizeMedium:"40px",iconSizeLarge:"46px",iconSizeHuge:"52px"};function er(e){const{textColorDisabled:o,iconColor:n,textColor2:l,fontSizeTiny:d,fontSizeSmall:h,fontSizeMedium:f,fontSizeLarge:a,fontSizeHuge:u}=e;return Object.assign(Object.assign({},Qo),{fontSizeTiny:d,fontSizeSmall:h,fontSizeMedium:f,fontSizeLarge:a,fontSizeHuge:u,textColor:o,iconColor:n,extraTextColor:l})}const Rn={name:"Empty",common:mt,self:er},tr=O("empty",`
 display: flex;
 flex-direction: column;
 align-items: center;
 font-size: var(--n-font-size);
`,[y("icon",`
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 font-size: var(--n-icon-size);
 line-height: var(--n-icon-size);
 color: var(--n-icon-color);
 transition:
 color .3s var(--n-bezier);
 `,[ee("+",[y("description",`
 margin-top: 8px;
 `)])]),y("description",`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `),y("extra",`
 text-align: center;
 transition: color .3s var(--n-bezier);
 margin-top: 12px;
 color: var(--n-extra-text-color);
 `)]),nr=Object.assign(Object.assign({},ze.props),{description:String,showDescription:{type:Boolean,default:!0},showIcon:{type:Boolean,default:!0},size:{type:String,default:"medium"},renderIcon:Function}),or=he({name:"Empty",props:nr,slots:Object,setup(e){const{mergedClsPrefixRef:o,inlineThemeDisabled:n,mergedComponentPropsRef:l}=xt(e),d=ze("Empty","-empty",tr,Rn,e,o),{localeRef:h}=Jt("Empty"),f=$(()=>{var s,m,x;return(s=e.description)!==null&&s!==void 0?s:(x=(m=l?.value)===null||m===void 0?void 0:m.Empty)===null||x===void 0?void 0:x.description}),a=$(()=>{var s,m;return((m=(s=l?.value)===null||s===void 0?void 0:s.Empty)===null||m===void 0?void 0:m.renderIcon)||(()=>r(qo,null))}),u=$(()=>{const{size:s}=e,{common:{cubicBezierEaseInOut:m},self:{[me("iconSize",s)]:x,[me("fontSize",s)]:F,textColor:S,iconColor:E,extraTextColor:W}}=d.value;return{"--n-icon-size":x,"--n-font-size":F,"--n-bezier":m,"--n-text-color":S,"--n-icon-color":E,"--n-extra-text-color":W}}),v=n?wt("empty",$(()=>{let s="";const{size:m}=e;return s+=m[0],s}),u,e):void 0;return{mergedClsPrefix:o,mergedRenderIcon:a,localizedDescription:$(()=>f.value||h.value.description),cssVars:n?void 0:u,themeClass:v?.themeClass,onRender:v?.onRender}},render(){const{$slots:e,mergedClsPrefix:o,onRender:n}=this;return n?.(),r("div",{class:[`${o}-empty`,this.themeClass],style:this.cssVars},this.showIcon?r("div",{class:`${o}-empty__icon`},e.icon?e.icon():r(st,{clsPrefix:o},{default:this.mergedRenderIcon})):null,this.showDescription?r("div",{class:`${o}-empty__description`},e.default?e.default():this.localizedDescription):null,e.extra?r("div",{class:`${o}-empty__extra`},e.extra()):null)}}),rr={height:"calc(var(--n-option-height) * 7.6)",paddingTiny:"4px 0",paddingSmall:"4px 0",paddingMedium:"4px 0",paddingLarge:"4px 0",paddingHuge:"4px 0",optionPaddingTiny:"0 12px",optionPaddingSmall:"0 12px",optionPaddingMedium:"0 12px",optionPaddingLarge:"0 12px",optionPaddingHuge:"0 12px",loadingSize:"18px"};function ir(e){const{borderRadius:o,popoverColor:n,textColor3:l,dividerColor:d,textColor2:h,primaryColorPressed:f,textColorDisabled:a,primaryColor:u,opacityDisabled:v,hoverColor:s,fontSizeTiny:m,fontSizeSmall:x,fontSizeMedium:F,fontSizeLarge:S,fontSizeHuge:E,heightTiny:W,heightSmall:_,heightMedium:T,heightLarge:k,heightHuge:A}=e;return Object.assign(Object.assign({},rr),{optionFontSizeTiny:m,optionFontSizeSmall:x,optionFontSizeMedium:F,optionFontSizeLarge:S,optionFontSizeHuge:E,optionHeightTiny:W,optionHeightSmall:_,optionHeightMedium:T,optionHeightLarge:k,optionHeightHuge:A,borderRadius:o,color:n,groupHeaderTextColor:l,actionDividerColor:d,optionTextColor:h,optionTextColorPressed:f,optionTextColorDisabled:a,optionTextColorActive:u,optionOpacityDisabled:v,optionCheckColor:u,optionColorPending:s,optionColorActive:"rgba(0, 0, 0, 0)",optionColorActivePending:s,actionTextColor:h,loadingColor:u})}const Fn=Xt({name:"InternalSelectMenu",common:mt,peers:{Scrollbar:Po,Empty:Rn},self:ir}),dn=he({name:"NBaseSelectGroupHeader",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){const{renderLabelRef:e,renderOptionRef:o,labelFieldRef:n,nodePropsRef:l}=It(Qt);return{labelField:n,nodeProps:l,renderLabel:e,renderOption:o}},render(){const{clsPrefix:e,renderLabel:o,renderOption:n,nodeProps:l,tmNode:{rawNode:d}}=this,h=l?.(d),f=o?o(d,!1):rt(d[this.labelField],d,!1),a=r("div",Object.assign({},h,{class:[`${e}-base-select-group-header`,h?.class]}),f);return d.render?d.render({node:a,option:d}):n?n({node:a,option:d,selected:!1}):a}});function lr(e,o){return r(xn,{name:"fade-in-scale-up-transition"},{default:()=>e?r(st,{clsPrefix:o,class:`${o}-base-select-option__check`},{default:()=>r(Uo)}):null})}const cn=he({name:"NBaseSelectOption",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(e){const{valueRef:o,pendingTmNodeRef:n,multipleRef:l,valueSetRef:d,renderLabelRef:h,renderOptionRef:f,labelFieldRef:a,valueFieldRef:u,showCheckmarkRef:v,nodePropsRef:s,handleOptionClick:m,handleOptionMouseEnter:x}=It(Qt),F=_e(()=>{const{value:_}=n;return _?e.tmNode.key===_.key:!1});function S(_){const{tmNode:T}=e;T.disabled||m(_,T)}function E(_){const{tmNode:T}=e;T.disabled||x(_,T)}function W(_){const{tmNode:T}=e,{value:k}=F;T.disabled||k||x(_,T)}return{multiple:l,isGrouped:_e(()=>{const{tmNode:_}=e,{parent:T}=_;return T&&T.rawNode.type==="group"}),showCheckmark:v,nodeProps:s,isPending:F,isSelected:_e(()=>{const{value:_}=o,{value:T}=l;if(_===null)return!1;const k=e.tmNode.rawNode[u.value];if(T){const{value:A}=d;return A.has(k)}else return _===k}),labelField:a,renderLabel:h,renderOption:f,handleMouseMove:W,handleMouseEnter:E,handleClick:S}},render(){const{clsPrefix:e,tmNode:{rawNode:o},isSelected:n,isPending:l,isGrouped:d,showCheckmark:h,nodeProps:f,renderOption:a,renderLabel:u,handleClick:v,handleMouseEnter:s,handleMouseMove:m}=this,x=lr(n,e),F=u?[u(o,n),h&&x]:[rt(o[this.labelField],o,n),h&&x],S=f?.(o),E=r("div",Object.assign({},S,{class:[`${e}-base-select-option`,o.class,S?.class,{[`${e}-base-select-option--disabled`]:o.disabled,[`${e}-base-select-option--selected`]:n,[`${e}-base-select-option--grouped`]:d,[`${e}-base-select-option--pending`]:l,[`${e}-base-select-option--show-checkmark`]:h}],style:[S?.style||"",o.style||""],onClick:Ht([v,S?.onClick]),onMouseenter:Ht([s,S?.onMouseenter]),onMousemove:Ht([m,S?.onMousemove])}),r("div",{class:`${e}-base-select-option__content`},F));return o.render?o.render({node:E,option:o,selected:n}):a?a({node:E,option:o,selected:n}):E}}),ar=O("base-select-menu",`
 line-height: 1.5;
 outline: none;
 z-index: 0;
 position: relative;
 border-radius: var(--n-border-radius);
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-color);
`,[O("scrollbar",`
 max-height: var(--n-height);
 `),O("virtual-list",`
 max-height: var(--n-height);
 `),O("base-select-option",`
 min-height: var(--n-option-height);
 font-size: var(--n-option-font-size);
 display: flex;
 align-items: center;
 `,[y("content",`
 z-index: 1;
 white-space: nowrap;
 text-overflow: ellipsis;
 overflow: hidden;
 `)]),O("base-select-group-header",`
 min-height: var(--n-option-height);
 font-size: .93em;
 display: flex;
 align-items: center;
 `),O("base-select-menu-option-wrapper",`
 position: relative;
 width: 100%;
 `),y("loading, empty",`
 display: flex;
 padding: 12px 32px;
 flex: 1;
 justify-content: center;
 `),y("loading",`
 color: var(--n-loading-color);
 font-size: var(--n-loading-size);
 `),y("header",`
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `),y("action",`
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-top: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `),O("base-select-group-header",`
 position: relative;
 cursor: default;
 padding: var(--n-option-padding);
 color: var(--n-group-header-text-color);
 `),O("base-select-option",`
 cursor: pointer;
 position: relative;
 padding: var(--n-option-padding);
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 box-sizing: border-box;
 color: var(--n-option-text-color);
 opacity: 1;
 `,[re("show-checkmark",`
 padding-right: calc(var(--n-option-padding-right) + 20px);
 `),ee("&::before",`
 content: "";
 position: absolute;
 left: 4px;
 right: 4px;
 top: 0;
 bottom: 0;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `),ee("&:active",`
 color: var(--n-option-text-color-pressed);
 `),re("grouped",`
 padding-left: calc(var(--n-option-padding-left) * 1.5);
 `),re("pending",[ee("&::before",`
 background-color: var(--n-option-color-pending);
 `)]),re("selected",`
 color: var(--n-option-text-color-active);
 `,[ee("&::before",`
 background-color: var(--n-option-color-active);
 `),re("pending",[ee("&::before",`
 background-color: var(--n-option-color-active-pending);
 `)])]),re("disabled",`
 cursor: not-allowed;
 `,[De("selected",`
 color: var(--n-option-text-color-disabled);
 `),re("selected",`
 opacity: var(--n-option-opacity-disabled);
 `)]),y("check",`
 font-size: 16px;
 position: absolute;
 right: calc(var(--n-option-padding-right) - 4px);
 top: calc(50% - 7px);
 color: var(--n-option-check-color);
 transition: color .3s var(--n-bezier);
 `,[gn({enterScale:"0.5"})])])]),sr=he({name:"InternalSelectMenu",props:Object.assign(Object.assign({},ze.props),{clsPrefix:{type:String,required:!0},scrollable:{type:Boolean,default:!0},treeMate:{type:Object,required:!0},multiple:Boolean,size:{type:String,default:"medium"},value:{type:[String,Number,Array],default:null},autoPending:Boolean,virtualScroll:{type:Boolean,default:!0},show:{type:Boolean,default:!0},labelField:{type:String,default:"label"},valueField:{type:String,default:"value"},loading:Boolean,focusable:Boolean,renderLabel:Function,renderOption:Function,nodeProps:Function,showCheckmark:{type:Boolean,default:!0},onMousedown:Function,onScroll:Function,onFocus:Function,onBlur:Function,onKeyup:Function,onKeydown:Function,onTabOut:Function,onMouseenter:Function,onMouseleave:Function,onResize:Function,resetMenuOnOptionsChange:{type:Boolean,default:!0},inlineThemeDisabled:Boolean,onToggle:Function}),setup(e){const{mergedClsPrefixRef:o,mergedRtlRef:n}=xt(e),l=Zt("InternalSelectMenu",n,o),d=ze("InternalSelectMenu","-internal-select-menu",ar,Fn,e,ue(e,"clsPrefix")),h=P(null),f=P(null),a=P(null),u=$(()=>e.treeMate.getFlattenedNodes()),v=$(()=>bo(u.value)),s=P(null);function m(){const{treeMate:b}=e;let C=null;const{value:j}=e;j===null?C=b.getFirstAvailableNode():(e.multiple?C=b.getNode((j||[])[(j||[]).length-1]):C=b.getNode(j),(!C||C.disabled)&&(C=b.getFirstAvailableNode())),R(C||null)}function x(){const{value:b}=s;b&&!e.treeMate.getNode(b.key)&&(s.value=null)}let F;Se(()=>e.show,b=>{b?F=Se(()=>e.treeMate,()=>{e.resetMenuOnOptionsChange?(e.autoPending?m():x(),bt(B)):x()},{immediate:!0}):F?.()},{immediate:!0}),mn(()=>{F?.()});const S=$(()=>Ut(d.value.self[me("optionHeight",e.size)])),E=$(()=>at(d.value.self[me("padding",e.size)])),W=$(()=>e.multiple&&Array.isArray(e.value)?new Set(e.value):new Set),_=$(()=>{const b=u.value;return b&&b.length===0});function T(b){const{onToggle:C}=e;C&&C(b)}function k(b){const{onScroll:C}=e;C&&C(b)}function A(b){var C;(C=a.value)===null||C===void 0||C.sync(),k(b)}function L(){var b;(b=a.value)===null||b===void 0||b.sync()}function ie(){const{value:b}=s;return b||null}function N(b,C){C.disabled||R(C,!1)}function le(b,C){C.disabled||T(C)}function te(b){var C;gt(b,"action")||(C=e.onKeyup)===null||C===void 0||C.call(e,b)}function ne(b){var C;gt(b,"action")||(C=e.onKeydown)===null||C===void 0||C.call(e,b)}function ae(b){var C;(C=e.onMousedown)===null||C===void 0||C.call(e,b),!e.focusable&&b.preventDefault()}function fe(){const{value:b}=s;b&&R(b.getNext({loop:!0}),!0)}function g(){const{value:b}=s;b&&R(b.getPrev({loop:!0}),!0)}function R(b,C=!1){s.value=b,C&&B()}function B(){var b,C;const j=s.value;if(!j)return;const ve=v.value(j.key);ve!==null&&(e.virtualScroll?(b=f.value)===null||b===void 0||b.scrollTo({index:ve}):(C=a.value)===null||C===void 0||C.scrollTo({index:ve,elSize:S.value}))}function q(b){var C,j;!((C=h.value)===null||C===void 0)&&C.contains(b.target)&&((j=e.onFocus)===null||j===void 0||j.call(e,b))}function X(b){var C,j;!((C=h.value)===null||C===void 0)&&C.contains(b.relatedTarget)||(j=e.onBlur)===null||j===void 0||j.call(e,b)}Tt(Qt,{handleOptionMouseEnter:N,handleOptionClick:le,valueSetRef:W,pendingTmNodeRef:s,nodePropsRef:ue(e,"nodeProps"),showCheckmarkRef:ue(e,"showCheckmark"),multipleRef:ue(e,"multiple"),valueRef:ue(e,"value"),renderLabelRef:ue(e,"renderLabel"),renderOptionRef:ue(e,"renderOption"),labelFieldRef:ue(e,"labelField"),valueFieldRef:ue(e,"valueField")}),Tt(Io,h),dt(()=>{const{value:b}=a;b&&b.sync()});const G=$(()=>{const{size:b}=e,{common:{cubicBezierEaseInOut:C},self:{height:j,borderRadius:ve,color:$e,groupHeaderTextColor:Ae,actionDividerColor:xe,optionTextColorPressed:ge,optionTextColor:Ee,optionTextColorDisabled:we,optionTextColorActive:We,optionOpacityDisabled:Ve,optionCheckColor:He,actionTextColor:Ne,optionColorPending:Re,optionColorActive:Fe,loadingColor:ye,loadingSize:je,optionColorActivePending:Ue,[me("optionFontSize",b)]:Be,[me("optionHeight",b)]:Te,[me("optionPadding",b)]:pe}}=d.value;return{"--n-height":j,"--n-action-divider-color":xe,"--n-action-text-color":Ne,"--n-bezier":C,"--n-border-radius":ve,"--n-color":$e,"--n-option-font-size":Be,"--n-group-header-text-color":Ae,"--n-option-check-color":He,"--n-option-color-pending":Re,"--n-option-color-active":Fe,"--n-option-color-active-pending":Ue,"--n-option-height":Te,"--n-option-opacity-disabled":Ve,"--n-option-text-color":Ee,"--n-option-text-color-active":We,"--n-option-text-color-disabled":we,"--n-option-text-color-pressed":ge,"--n-option-padding":pe,"--n-option-padding-left":at(pe,"left"),"--n-option-padding-right":at(pe,"right"),"--n-loading-color":ye,"--n-loading-size":je}}),{inlineThemeDisabled:J}=e,K=J?wt("internal-select-menu",$(()=>e.size[0]),G,e):void 0,de={selfRef:h,next:fe,prev:g,getPendingTmNode:ie};return zn(h,e.onResize),Object.assign({mergedTheme:d,mergedClsPrefix:o,rtlEnabled:l,virtualListRef:f,scrollbarRef:a,itemSize:S,padding:E,flattenedNodes:u,empty:_,virtualListContainer(){const{value:b}=f;return b?.listElRef},virtualListContent(){const{value:b}=f;return b?.itemsElRef},doScroll:k,handleFocusin:q,handleFocusout:X,handleKeyUp:te,handleKeyDown:ne,handleMouseDown:ae,handleVirtualListResize:L,handleVirtualListScroll:A,cssVars:J?void 0:G,themeClass:K?.themeClass,onRender:K?.onRender},de)},render(){const{$slots:e,virtualScroll:o,clsPrefix:n,mergedTheme:l,themeClass:d,onRender:h}=this;return h?.(),r("div",{ref:"selfRef",tabindex:this.focusable?0:-1,class:[`${n}-base-select-menu`,this.rtlEnabled&&`${n}-base-select-menu--rtl`,d,this.multiple&&`${n}-base-select-menu--multiple`],style:this.cssVars,onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onKeyup:this.handleKeyUp,onKeydown:this.handleKeyDown,onMousedown:this.handleMouseDown,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},it(e.header,f=>f&&r("div",{class:`${n}-base-select-menu__header`,"data-header":!0,key:"header"},f)),this.loading?r("div",{class:`${n}-base-select-menu__loading`},r(pn,{clsPrefix:n,strokeWidth:20})):this.empty?r("div",{class:`${n}-base-select-menu__empty`,"data-empty":!0},lt(e.empty,()=>[r(or,{theme:l.peers.Empty,themeOverrides:l.peerOverrides.Empty,size:this.size})])):r(yn,{ref:"scrollbarRef",theme:l.peers.Scrollbar,themeOverrides:l.peerOverrides.Scrollbar,scrollable:this.scrollable,container:o?this.virtualListContainer:void 0,content:o?this.virtualListContent:void 0,onScroll:o?void 0:this.doScroll},{default:()=>o?r(Vo,{ref:"virtualListRef",class:`${n}-virtual-list`,items:this.flattenedNodes,itemSize:this.itemSize,showScrollbar:!1,paddingTop:this.padding.top,paddingBottom:this.padding.bottom,onResize:this.handleVirtualListResize,onScroll:this.handleVirtualListScroll,itemResizable:!0},{default:({item:f})=>f.isGroup?r(dn,{key:f.key,clsPrefix:n,tmNode:f}):f.ignored?null:r(cn,{clsPrefix:n,key:f.key,tmNode:f})}):r("div",{class:`${n}-base-select-menu-option-wrapper`,style:{paddingTop:this.padding.top,paddingBottom:this.padding.bottom}},this.flattenedNodes.map(f=>f.isGroup?r(dn,{key:f.key,clsPrefix:n,tmNode:f}):r(cn,{clsPrefix:n,key:f.key,tmNode:f})))}),it(e.action,f=>f&&[r("div",{class:`${n}-base-select-menu__action`,"data-action":!0,key:"action"},f),r(Jo,{onFocus:this.onTabOut,key:"focus-detector"})]))}}),Tn=he({name:"InternalSelectionSuffix",props:{clsPrefix:{type:String,required:!0},showArrow:{type:Boolean,default:void 0},showClear:{type:Boolean,default:void 0},loading:{type:Boolean,default:!1},onClear:Function},setup(e,{slots:o}){return()=>{const{clsPrefix:n}=e;return r(pn,{clsPrefix:n,class:`${n}-base-suffix`,strokeWidth:24,scale:.85,show:e.loading},{default:()=>e.showArrow?r(Yt,{clsPrefix:n,show:e.showClear,onClear:e.onClear},{placeholder:()=>r(st,{clsPrefix:n,class:`${n}-base-suffix__arrow`},{default:()=>lt(o.default,()=>[r(Ko,null)])})}):null})}}}),dr={paddingSingle:"0 26px 0 12px",paddingMultiple:"3px 26px 0 12px",clearSize:"16px",arrowSize:"16px"};function cr(e){const{borderRadius:o,textColor2:n,textColorDisabled:l,inputColor:d,inputColorDisabled:h,primaryColor:f,primaryColorHover:a,warningColor:u,warningColorHover:v,errorColor:s,errorColorHover:m,borderColor:x,iconColor:F,iconColorDisabled:S,clearColor:E,clearColorHover:W,clearColorPressed:_,placeholderColor:T,placeholderColorDisabled:k,fontSizeTiny:A,fontSizeSmall:L,fontSizeMedium:ie,fontSizeLarge:N,heightTiny:le,heightSmall:te,heightMedium:ne,heightLarge:ae,fontWeight:fe}=e;return Object.assign(Object.assign({},dr),{fontSizeTiny:A,fontSizeSmall:L,fontSizeMedium:ie,fontSizeLarge:N,heightTiny:le,heightSmall:te,heightMedium:ne,heightLarge:ae,borderRadius:o,fontWeight:fe,textColor:n,textColorDisabled:l,placeholderColor:T,placeholderColorDisabled:k,color:d,colorDisabled:h,colorActive:d,border:`1px solid ${x}`,borderHover:`1px solid ${a}`,borderActive:`1px solid ${f}`,borderFocus:`1px solid ${a}`,boxShadowHover:"none",boxShadowActive:`0 0 0 2px ${Me(f,{alpha:.2})}`,boxShadowFocus:`0 0 0 2px ${Me(f,{alpha:.2})}`,caretColor:f,arrowColor:F,arrowColorDisabled:S,loadingColor:f,borderWarning:`1px solid ${u}`,borderHoverWarning:`1px solid ${v}`,borderActiveWarning:`1px solid ${u}`,borderFocusWarning:`1px solid ${v}`,boxShadowHoverWarning:"none",boxShadowActiveWarning:`0 0 0 2px ${Me(u,{alpha:.2})}`,boxShadowFocusWarning:`0 0 0 2px ${Me(u,{alpha:.2})}`,colorActiveWarning:d,caretColorWarning:u,borderError:`1px solid ${s}`,borderHoverError:`1px solid ${m}`,borderActiveError:`1px solid ${s}`,borderFocusError:`1px solid ${m}`,boxShadowHoverError:"none",boxShadowActiveError:`0 0 0 2px ${Me(s,{alpha:.2})}`,boxShadowFocusError:`0 0 0 2px ${Me(s,{alpha:.2})}`,colorActiveError:d,caretColorError:s,clearColor:E,clearColorHover:W,clearColorPressed:_})}const Pn=Xt({name:"InternalSelection",common:mt,peers:{Popover:Oo},self:cr}),ur=ee([O("base-selection",`
 --n-padding-single: var(--n-padding-single-top) var(--n-padding-single-right) var(--n-padding-single-bottom) var(--n-padding-single-left);
 --n-padding-multiple: var(--n-padding-multiple-top) var(--n-padding-multiple-right) var(--n-padding-multiple-bottom) var(--n-padding-multiple-left);
 position: relative;
 z-index: auto;
 box-shadow: none;
 width: 100%;
 max-width: 100%;
 display: inline-block;
 vertical-align: bottom;
 border-radius: var(--n-border-radius);
 min-height: var(--n-height);
 line-height: 1.5;
 font-size: var(--n-font-size);
 `,[O("base-loading",`
 color: var(--n-loading-color);
 `),O("base-selection-tags","min-height: var(--n-height);"),y("border, state-border",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 border: var(--n-border);
 border-radius: inherit;
 transition:
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `),y("state-border",`
 z-index: 1;
 border-color: #0000;
 `),O("base-suffix",`
 cursor: pointer;
 position: absolute;
 top: 50%;
 transform: translateY(-50%);
 right: 10px;
 `,[y("arrow",`
 font-size: var(--n-arrow-size);
 color: var(--n-arrow-color);
 transition: color .3s var(--n-bezier);
 `)]),O("base-selection-overlay",`
 display: flex;
 align-items: center;
 white-space: nowrap;
 pointer-events: none;
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 padding: var(--n-padding-single);
 transition: color .3s var(--n-bezier);
 `,[y("wrapper",`
 flex-basis: 0;
 flex-grow: 1;
 overflow: hidden;
 text-overflow: ellipsis;
 `)]),O("base-selection-placeholder",`
 color: var(--n-placeholder-color);
 `,[y("inner",`
 max-width: 100%;
 overflow: hidden;
 `)]),O("base-selection-tags",`
 cursor: pointer;
 outline: none;
 box-sizing: border-box;
 position: relative;
 z-index: auto;
 display: flex;
 padding: var(--n-padding-multiple);
 flex-wrap: wrap;
 align-items: center;
 width: 100%;
 vertical-align: bottom;
 background-color: var(--n-color);
 border-radius: inherit;
 transition:
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),O("base-selection-label",`
 height: var(--n-height);
 display: inline-flex;
 width: 100%;
 vertical-align: bottom;
 cursor: pointer;
 outline: none;
 z-index: auto;
 box-sizing: border-box;
 position: relative;
 transition:
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 border-radius: inherit;
 background-color: var(--n-color);
 align-items: center;
 `,[O("base-selection-input",`
 font-size: inherit;
 line-height: inherit;
 outline: none;
 cursor: pointer;
 box-sizing: border-box;
 border:none;
 width: 100%;
 padding: var(--n-padding-single);
 background-color: #0000;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 caret-color: var(--n-caret-color);
 `,[y("content",`
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap; 
 `)]),y("render-label",`
 color: var(--n-text-color);
 `)]),De("disabled",[ee("&:hover",[y("state-border",`
 box-shadow: var(--n-box-shadow-hover);
 border: var(--n-border-hover);
 `)]),re("focus",[y("state-border",`
 box-shadow: var(--n-box-shadow-focus);
 border: var(--n-border-focus);
 `)]),re("active",[y("state-border",`
 box-shadow: var(--n-box-shadow-active);
 border: var(--n-border-active);
 `),O("base-selection-label","background-color: var(--n-color-active);"),O("base-selection-tags","background-color: var(--n-color-active);")])]),re("disabled","cursor: not-allowed;",[y("arrow",`
 color: var(--n-arrow-color-disabled);
 `),O("base-selection-label",`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `,[O("base-selection-input",`
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 `),y("render-label",`
 color: var(--n-text-color-disabled);
 `)]),O("base-selection-tags",`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `),O("base-selection-placeholder",`
 cursor: not-allowed;
 color: var(--n-placeholder-color-disabled);
 `)]),O("base-selection-input-tag",`
 height: calc(var(--n-height) - 6px);
 line-height: calc(var(--n-height) - 6px);
 outline: none;
 display: none;
 position: relative;
 margin-bottom: 3px;
 max-width: 100%;
 vertical-align: bottom;
 `,[y("input",`
 font-size: inherit;
 font-family: inherit;
 min-width: 1px;
 padding: 0;
 background-color: #0000;
 outline: none;
 border: none;
 max-width: 100%;
 overflow: hidden;
 width: 1em;
 line-height: inherit;
 cursor: pointer;
 color: var(--n-text-color);
 caret-color: var(--n-caret-color);
 `),y("mirror",`
 position: absolute;
 left: 0;
 top: 0;
 white-space: pre;
 visibility: hidden;
 user-select: none;
 -webkit-user-select: none;
 opacity: 0;
 `)]),["warning","error"].map(e=>re(`${e}-status`,[y("state-border",`border: var(--n-border-${e});`),De("disabled",[ee("&:hover",[y("state-border",`
 box-shadow: var(--n-box-shadow-hover-${e});
 border: var(--n-border-hover-${e});
 `)]),re("active",[y("state-border",`
 box-shadow: var(--n-box-shadow-active-${e});
 border: var(--n-border-active-${e});
 `),O("base-selection-label",`background-color: var(--n-color-active-${e});`),O("base-selection-tags",`background-color: var(--n-color-active-${e});`)]),re("focus",[y("state-border",`
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))]),O("base-selection-popover",`
 margin-bottom: -3px;
 display: flex;
 flex-wrap: wrap;
 margin-right: -8px;
 `),O("base-selection-tag-wrapper",`
 max-width: 100%;
 display: inline-flex;
 padding: 0 7px 3px 0;
 `,[ee("&:last-child","padding-right: 0;"),O("tag",`
 font-size: 14px;
 max-width: 100%;
 `,[y("content",`
 line-height: 1.25;
 text-overflow: ellipsis;
 overflow: hidden;
 `)])])]),fr=he({name:"InternalSelection",props:Object.assign(Object.assign({},ze.props),{clsPrefix:{type:String,required:!0},bordered:{type:Boolean,default:void 0},active:Boolean,pattern:{type:String,default:""},placeholder:String,selectedOption:{type:Object,default:null},selectedOptions:{type:Array,default:null},labelField:{type:String,default:"label"},valueField:{type:String,default:"value"},multiple:Boolean,filterable:Boolean,clearable:Boolean,disabled:Boolean,size:{type:String,default:"medium"},loading:Boolean,autofocus:Boolean,showArrow:{type:Boolean,default:!0},inputProps:Object,focused:Boolean,renderTag:Function,onKeydown:Function,onClick:Function,onBlur:Function,onFocus:Function,onDeleteOption:Function,maxTagCount:[String,Number],ellipsisTagPopoverProps:Object,onClear:Function,onPatternInput:Function,onPatternFocus:Function,onPatternBlur:Function,renderLabel:Function,status:String,inlineThemeDisabled:Boolean,ignoreComposition:{type:Boolean,default:!0},onResize:Function}),setup(e){const{mergedClsPrefixRef:o,mergedRtlRef:n}=xt(e),l=Zt("InternalSelection",n,o),d=P(null),h=P(null),f=P(null),a=P(null),u=P(null),v=P(null),s=P(null),m=P(null),x=P(null),F=P(null),S=P(!1),E=P(!1),W=P(!1),_=ze("InternalSelection","-internal-selection",ur,Pn,e,ue(e,"clsPrefix")),T=$(()=>e.clearable&&!e.disabled&&(W.value||e.active)),k=$(()=>e.selectedOption?e.renderTag?e.renderTag({option:e.selectedOption,handleClose:()=>{}}):e.renderLabel?e.renderLabel(e.selectedOption,!0):rt(e.selectedOption[e.labelField],e.selectedOption,!0):e.placeholder),A=$(()=>{const p=e.selectedOption;if(p)return p[e.labelField]}),L=$(()=>e.multiple?!!(Array.isArray(e.selectedOptions)&&e.selectedOptions.length):e.selectedOption!==null);function ie(){var p;const{value:z}=d;if(z){const{value:se}=h;se&&(se.style.width=`${z.offsetWidth}px`,e.maxTagCount!=="responsive"&&((p=x.value)===null||p===void 0||p.sync({showAllItemsBeforeCalculate:!1})))}}function N(){const{value:p}=F;p&&(p.style.display="none")}function le(){const{value:p}=F;p&&(p.style.display="inline-block")}Se(ue(e,"active"),p=>{p||N()}),Se(ue(e,"pattern"),()=>{e.multiple&&bt(ie)});function te(p){const{onFocus:z}=e;z&&z(p)}function ne(p){const{onBlur:z}=e;z&&z(p)}function ae(p){const{onDeleteOption:z}=e;z&&z(p)}function fe(p){const{onClear:z}=e;z&&z(p)}function g(p){const{onPatternInput:z}=e;z&&z(p)}function R(p){var z;(!p.relatedTarget||!(!((z=f.value)===null||z===void 0)&&z.contains(p.relatedTarget)))&&te(p)}function B(p){var z;!((z=f.value)===null||z===void 0)&&z.contains(p.relatedTarget)||ne(p)}function q(p){fe(p)}function X(){W.value=!0}function G(){W.value=!1}function J(p){!e.active||!e.filterable||p.target!==h.value&&p.preventDefault()}function K(p){ae(p)}const de=P(!1);function b(p){if(p.key==="Backspace"&&!de.value&&!e.pattern.length){const{selectedOptions:z}=e;z?.length&&K(z[z.length-1])}}let C=null;function j(p){const{value:z}=d;if(z){const se=p.target.value;z.textContent=se,ie()}e.ignoreComposition&&de.value?C=p:g(p)}function ve(){de.value=!0}function $e(){de.value=!1,e.ignoreComposition&&g(C),C=null}function Ae(p){var z;E.value=!0,(z=e.onPatternFocus)===null||z===void 0||z.call(e,p)}function xe(p){var z;E.value=!1,(z=e.onPatternBlur)===null||z===void 0||z.call(e,p)}function ge(){var p,z;if(e.filterable)E.value=!1,(p=v.value)===null||p===void 0||p.blur(),(z=h.value)===null||z===void 0||z.blur();else if(e.multiple){const{value:se}=a;se?.blur()}else{const{value:se}=u;se?.blur()}}function Ee(){var p,z,se;e.filterable?(E.value=!1,(p=v.value)===null||p===void 0||p.focus()):e.multiple?(z=a.value)===null||z===void 0||z.focus():(se=u.value)===null||se===void 0||se.focus()}function we(){const{value:p}=h;p&&(le(),p.focus())}function We(){const{value:p}=h;p&&p.blur()}function Ve(p){const{value:z}=s;z&&z.setTextContent(`+${p}`)}function He(){const{value:p}=m;return p}function Ne(){return h.value}let Re=null;function Fe(){Re!==null&&window.clearTimeout(Re)}function ye(){e.active||(Fe(),Re=window.setTimeout(()=>{L.value&&(S.value=!0)},100))}function je(){Fe()}function Ue(p){p||(Fe(),S.value=!1)}Se(L,p=>{p||(S.value=!1)}),dt(()=>{Gt(()=>{const p=v.value;p&&(e.disabled?p.removeAttribute("tabindex"):p.tabIndex=E.value?-1:0)})}),zn(f,e.onResize);const{inlineThemeDisabled:Be}=e,Te=$(()=>{const{size:p}=e,{common:{cubicBezierEaseInOut:z},self:{fontWeight:se,borderRadius:ct,color:Ye,placeholderColor:Xe,textColor:Ze,paddingSingle:Je,paddingMultiple:ut,caretColor:ft,colorDisabled:Qe,textColorDisabled:Ce,placeholderColorDisabled:i,colorActive:w,boxShadowFocus:M,boxShadowActive:U,boxShadowHover:V,border:D,borderFocus:H,borderHover:ce,borderActive:be,arrowColor:Ot,arrowColorDisabled:yt,loadingColor:kt,colorActiveWarning:et,boxShadowFocusWarning:tt,boxShadowActiveWarning:Mt,boxShadowHoverWarning:_t,borderWarning:Ct,borderFocusWarning:Le,borderHoverWarning:t,borderActiveWarning:c,colorActiveError:I,boxShadowFocusError:Z,boxShadowActiveError:oe,boxShadowHoverError:Y,borderError:Pe,borderFocusError:Ie,borderHoverError:Oe,borderActiveError:Ke,clearColor:Ge,clearColorHover:ht,clearColorPressed:$t,clearSize:At,arrowSize:Et,[me("height",p)]:Bt,[me("fontSize",p)]:Lt}}=_.value,nt=at(Je),ot=at(ut);return{"--n-bezier":z,"--n-border":D,"--n-border-active":be,"--n-border-focus":H,"--n-border-hover":ce,"--n-border-radius":ct,"--n-box-shadow-active":U,"--n-box-shadow-focus":M,"--n-box-shadow-hover":V,"--n-caret-color":ft,"--n-color":Ye,"--n-color-active":w,"--n-color-disabled":Qe,"--n-font-size":Lt,"--n-height":Bt,"--n-padding-single-top":nt.top,"--n-padding-multiple-top":ot.top,"--n-padding-single-right":nt.right,"--n-padding-multiple-right":ot.right,"--n-padding-single-left":nt.left,"--n-padding-multiple-left":ot.left,"--n-padding-single-bottom":nt.bottom,"--n-padding-multiple-bottom":ot.bottom,"--n-placeholder-color":Xe,"--n-placeholder-color-disabled":i,"--n-text-color":Ze,"--n-text-color-disabled":Ce,"--n-arrow-color":Ot,"--n-arrow-color-disabled":yt,"--n-loading-color":kt,"--n-color-active-warning":et,"--n-box-shadow-focus-warning":tt,"--n-box-shadow-active-warning":Mt,"--n-box-shadow-hover-warning":_t,"--n-border-warning":Ct,"--n-border-focus-warning":Le,"--n-border-hover-warning":t,"--n-border-active-warning":c,"--n-color-active-error":I,"--n-box-shadow-focus-error":Z,"--n-box-shadow-active-error":oe,"--n-box-shadow-hover-error":Y,"--n-border-error":Pe,"--n-border-focus-error":Ie,"--n-border-hover-error":Oe,"--n-border-active-error":Ke,"--n-clear-size":At,"--n-clear-color":Ge,"--n-clear-color-hover":ht,"--n-clear-color-pressed":$t,"--n-arrow-size":Et,"--n-font-weight":se}}),pe=Be?wt("internal-selection",$(()=>e.size[0]),Te,e):void 0;return{mergedTheme:_,mergedClearable:T,mergedClsPrefix:o,rtlEnabled:l,patternInputFocused:E,filterablePlaceholder:k,label:A,selected:L,showTagsPanel:S,isComposing:de,counterRef:s,counterWrapperRef:m,patternInputMirrorRef:d,patternInputRef:h,selfRef:f,multipleElRef:a,singleElRef:u,patternInputWrapperRef:v,overflowRef:x,inputTagElRef:F,handleMouseDown:J,handleFocusin:R,handleClear:q,handleMouseEnter:X,handleMouseLeave:G,handleDeleteOption:K,handlePatternKeyDown:b,handlePatternInputInput:j,handlePatternInputBlur:xe,handlePatternInputFocus:Ae,handleMouseEnterCounter:ye,handleMouseLeaveCounter:je,handleFocusout:B,handleCompositionEnd:$e,handleCompositionStart:ve,onPopoverUpdateShow:Ue,focus:Ee,focusInput:we,blur:ge,blurInput:We,updateCounter:Ve,getCounter:He,getTail:Ne,renderLabel:e.renderLabel,cssVars:Be?void 0:Te,themeClass:pe?.themeClass,onRender:pe?.onRender}},render(){const{status:e,multiple:o,size:n,disabled:l,filterable:d,maxTagCount:h,bordered:f,clsPrefix:a,ellipsisTagPopoverProps:u,onRender:v,renderTag:s,renderLabel:m}=this;v?.();const x=h==="responsive",F=typeof h=="number",S=x||F,E=r(ko,null,{default:()=>r(Tn,{clsPrefix:a,loading:this.loading,showArrow:this.showArrow,showClear:this.mergedClearable&&this.selected,onClear:this.handleClear},{default:()=>{var _,T;return(T=(_=this.$slots).arrow)===null||T===void 0?void 0:T.call(_)}})});let W;if(o){const{labelField:_}=this,T=g=>r("div",{class:`${a}-base-selection-tag-wrapper`,key:g.value},s?s({option:g,handleClose:()=>{this.handleDeleteOption(g)}}):r(Wt,{size:n,closable:!g.disabled,disabled:l,onClose:()=>{this.handleDeleteOption(g)},internalCloseIsButtonTag:!1,internalCloseFocusable:!1},{default:()=>m?m(g,!0):rt(g[_],g,!0)})),k=()=>(F?this.selectedOptions.slice(0,h):this.selectedOptions).map(T),A=d?r("div",{class:`${a}-base-selection-input-tag`,ref:"inputTagElRef",key:"__input-tag__"},r("input",Object.assign({},this.inputProps,{ref:"patternInputRef",tabindex:-1,disabled:l,value:this.pattern,autofocus:this.autofocus,class:`${a}-base-selection-input-tag__input`,onBlur:this.handlePatternInputBlur,onFocus:this.handlePatternInputFocus,onKeydown:this.handlePatternKeyDown,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd})),r("span",{ref:"patternInputMirrorRef",class:`${a}-base-selection-input-tag__mirror`},this.pattern)):null,L=x?()=>r("div",{class:`${a}-base-selection-tag-wrapper`,ref:"counterWrapperRef"},r(Wt,{size:n,ref:"counterRef",onMouseenter:this.handleMouseEnterCounter,onMouseleave:this.handleMouseLeaveCounter,disabled:l})):void 0;let ie;if(F){const g=this.selectedOptions.length-h;g>0&&(ie=r("div",{class:`${a}-base-selection-tag-wrapper`,key:"__counter__"},r(Wt,{size:n,ref:"counterRef",onMouseenter:this.handleMouseEnterCounter,disabled:l},{default:()=>`+${g}`})))}const N=x?d?r(sn,{ref:"overflowRef",updateCounter:this.updateCounter,getCounter:this.getCounter,getTail:this.getTail,style:{width:"100%",display:"flex",overflow:"hidden"}},{default:k,counter:L,tail:()=>A}):r(sn,{ref:"overflowRef",updateCounter:this.updateCounter,getCounter:this.getCounter,style:{width:"100%",display:"flex",overflow:"hidden"}},{default:k,counter:L}):F&&ie?k().concat(ie):k(),le=S?()=>r("div",{class:`${a}-base-selection-popover`},x?k():this.selectedOptions.map(T)):void 0,te=S?Object.assign({show:this.showTagsPanel,trigger:"hover",overlap:!0,placement:"top",width:"trigger",onUpdateShow:this.onPopoverUpdateShow,theme:this.mergedTheme.peers.Popover,themeOverrides:this.mergedTheme.peerOverrides.Popover},u):null,ae=(this.selected?!1:this.active?!this.pattern&&!this.isComposing:!0)?r("div",{class:`${a}-base-selection-placeholder ${a}-base-selection-overlay`},r("div",{class:`${a}-base-selection-placeholder__inner`},this.placeholder)):null,fe=d?r("div",{ref:"patternInputWrapperRef",class:`${a}-base-selection-tags`},N,x?null:A,E):r("div",{ref:"multipleElRef",class:`${a}-base-selection-tags`,tabindex:l?void 0:0},N,E);W=r(wn,null,S?r(Mo,Object.assign({},te,{scrollable:!0,style:"max-height: calc(var(--v-target-height) * 6.6);"}),{trigger:()=>fe,default:le}):fe,ae)}else if(d){const _=this.pattern||this.isComposing,T=this.active?!_:!this.selected,k=this.active?!1:this.selected;W=r("div",{ref:"patternInputWrapperRef",class:`${a}-base-selection-label`,title:this.patternInputFocused?void 0:en(this.label)},r("input",Object.assign({},this.inputProps,{ref:"patternInputRef",class:`${a}-base-selection-input`,value:this.active?this.pattern:"",placeholder:"",readonly:l,disabled:l,tabindex:-1,autofocus:this.autofocus,onFocus:this.handlePatternInputFocus,onBlur:this.handlePatternInputBlur,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd})),k?r("div",{class:`${a}-base-selection-label__render-label ${a}-base-selection-overlay`,key:"input"},r("div",{class:`${a}-base-selection-overlay__wrapper`},s?s({option:this.selectedOption,handleClose:()=>{}}):m?m(this.selectedOption,!0):rt(this.label,this.selectedOption,!0))):null,T?r("div",{class:`${a}-base-selection-placeholder ${a}-base-selection-overlay`,key:"placeholder"},r("div",{class:`${a}-base-selection-overlay__wrapper`},this.filterablePlaceholder)):null,E)}else W=r("div",{ref:"singleElRef",class:`${a}-base-selection-label`,tabindex:this.disabled?void 0:0},this.label!==void 0?r("div",{class:`${a}-base-selection-input`,title:en(this.label),key:"input"},r("div",{class:`${a}-base-selection-input__content`},s?s({option:this.selectedOption,handleClose:()=>{}}):m?m(this.selectedOption,!0):rt(this.label,this.selectedOption,!0))):r("div",{class:`${a}-base-selection-placeholder ${a}-base-selection-overlay`,key:"placeholder"},r("div",{class:`${a}-base-selection-placeholder__inner`},this.placeholder)),E);return r("div",{ref:"selfRef",class:[`${a}-base-selection`,this.rtlEnabled&&`${a}-base-selection--rtl`,this.themeClass,e&&`${a}-base-selection--${e}-status`,{[`${a}-base-selection--active`]:this.active,[`${a}-base-selection--selected`]:this.selected||this.active&&this.pattern,[`${a}-base-selection--disabled`]:this.disabled,[`${a}-base-selection--multiple`]:this.multiple,[`${a}-base-selection--focus`]:this.focused}],style:this.cssVars,onClick:this.onClick,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onKeydown:this.onKeydown,onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onMousedown:this.handleMouseDown},W,f?r("div",{class:`${a}-base-selection__border`}):null,f?r("div",{class:`${a}-base-selection__state-border`}):null)}}),hr={paddingTiny:"0 8px",paddingSmall:"0 10px",paddingMedium:"0 12px",paddingLarge:"0 14px",clearSize:"16px"};function vr(e){const{textColor2:o,textColor3:n,textColorDisabled:l,primaryColor:d,primaryColorHover:h,inputColor:f,inputColorDisabled:a,borderColor:u,warningColor:v,warningColorHover:s,errorColor:m,errorColorHover:x,borderRadius:F,lineHeight:S,fontSizeTiny:E,fontSizeSmall:W,fontSizeMedium:_,fontSizeLarge:T,heightTiny:k,heightSmall:A,heightMedium:L,heightLarge:ie,actionColor:N,clearColor:le,clearColorHover:te,clearColorPressed:ne,placeholderColor:ae,placeholderColorDisabled:fe,iconColor:g,iconColorDisabled:R,iconColorHover:B,iconColorPressed:q,fontWeight:X}=e;return Object.assign(Object.assign({},hr),{fontWeight:X,countTextColorDisabled:l,countTextColor:n,heightTiny:k,heightSmall:A,heightMedium:L,heightLarge:ie,fontSizeTiny:E,fontSizeSmall:W,fontSizeMedium:_,fontSizeLarge:T,lineHeight:S,lineHeightTextarea:S,borderRadius:F,iconSize:"16px",groupLabelColor:N,groupLabelTextColor:o,textColor:o,textColorDisabled:l,textDecorationColor:o,caretColor:d,placeholderColor:ae,placeholderColorDisabled:fe,color:f,colorDisabled:a,colorFocus:f,groupLabelBorder:`1px solid ${u}`,border:`1px solid ${u}`,borderHover:`1px solid ${h}`,borderDisabled:`1px solid ${u}`,borderFocus:`1px solid ${h}`,boxShadowFocus:`0 0 0 2px ${Me(d,{alpha:.2})}`,loadingColor:d,loadingColorWarning:v,borderWarning:`1px solid ${v}`,borderHoverWarning:`1px solid ${s}`,colorFocusWarning:f,borderFocusWarning:`1px solid ${s}`,boxShadowFocusWarning:`0 0 0 2px ${Me(v,{alpha:.2})}`,caretColorWarning:v,loadingColorError:m,borderError:`1px solid ${m}`,borderHoverError:`1px solid ${x}`,colorFocusError:f,borderFocusError:`1px solid ${x}`,boxShadowFocusError:`0 0 0 2px ${Me(m,{alpha:.2})}`,caretColorError:m,clearColor:le,clearColorHover:te,clearColorPressed:ne,iconColor:g,iconColorDisabled:R,iconColorHover:B,iconColorPressed:q,suffixTextColor:o})}const pr={name:"Input",common:mt,self:vr},In=ho("n-input"),gr=O("input",`
 max-width: 100%;
 cursor: text;
 line-height: 1.5;
 z-index: auto;
 outline: none;
 box-sizing: border-box;
 position: relative;
 display: inline-flex;
 border-radius: var(--n-border-radius);
 background-color: var(--n-color);
 transition: background-color .3s var(--n-bezier);
 font-size: var(--n-font-size);
 font-weight: var(--n-font-weight);
 --n-padding-vertical: calc((var(--n-height) - 1.5 * var(--n-font-size)) / 2);
`,[y("input, textarea",`
 overflow: hidden;
 flex-grow: 1;
 position: relative;
 `),y("input-el, textarea-el, input-mirror, textarea-mirror, separator, placeholder",`
 box-sizing: border-box;
 font-size: inherit;
 line-height: 1.5;
 font-family: inherit;
 border: none;
 outline: none;
 background-color: #0000;
 text-align: inherit;
 transition:
 -webkit-text-fill-color .3s var(--n-bezier),
 caret-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 text-decoration-color .3s var(--n-bezier);
 `),y("input-el, textarea-el",`
 -webkit-appearance: none;
 scrollbar-width: none;
 width: 100%;
 min-width: 0;
 text-decoration-color: var(--n-text-decoration-color);
 color: var(--n-text-color);
 caret-color: var(--n-caret-color);
 background-color: transparent;
 `,[ee("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb",`
 width: 0;
 height: 0;
 display: none;
 `),ee("&::placeholder",`
 color: #0000;
 -webkit-text-fill-color: transparent !important;
 `),ee("&:-webkit-autofill ~",[y("placeholder","display: none;")])]),re("round",[De("textarea","border-radius: calc(var(--n-height) / 2);")]),y("placeholder",`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 overflow: hidden;
 color: var(--n-placeholder-color);
 `,[ee("span",`
 width: 100%;
 display: inline-block;
 `)]),re("textarea",[y("placeholder","overflow: visible;")]),De("autosize","width: 100%;"),re("autosize",[y("textarea-el, input-el",`
 position: absolute;
 top: 0;
 left: 0;
 height: 100%;
 `)]),O("input-wrapper",`
 overflow: hidden;
 display: inline-flex;
 flex-grow: 1;
 position: relative;
 padding-left: var(--n-padding-left);
 padding-right: var(--n-padding-right);
 `),y("input-mirror",`
 padding: 0;
 height: var(--n-height);
 line-height: var(--n-height);
 overflow: hidden;
 visibility: hidden;
 position: static;
 white-space: pre;
 pointer-events: none;
 `),y("input-el",`
 padding: 0;
 height: var(--n-height);
 line-height: var(--n-height);
 `,[ee("&[type=password]::-ms-reveal","display: none;"),ee("+",[y("placeholder",`
 display: flex;
 align-items: center; 
 `)])]),De("textarea",[y("placeholder","white-space: nowrap;")]),y("eye",`
 display: flex;
 align-items: center;
 justify-content: center;
 transition: color .3s var(--n-bezier);
 `),re("textarea","width: 100%;",[O("input-word-count",`
 position: absolute;
 right: var(--n-padding-right);
 bottom: var(--n-padding-vertical);
 `),re("resizable",[O("input-wrapper",`
 resize: vertical;
 min-height: var(--n-height);
 `)]),y("textarea-el, textarea-mirror, placeholder",`
 height: 100%;
 padding-left: 0;
 padding-right: 0;
 padding-top: var(--n-padding-vertical);
 padding-bottom: var(--n-padding-vertical);
 word-break: break-word;
 display: inline-block;
 vertical-align: bottom;
 box-sizing: border-box;
 line-height: var(--n-line-height-textarea);
 margin: 0;
 resize: none;
 white-space: pre-wrap;
 scroll-padding-block-end: var(--n-padding-vertical);
 `),y("textarea-mirror",`
 width: 100%;
 pointer-events: none;
 overflow: hidden;
 visibility: hidden;
 position: static;
 white-space: pre-wrap;
 overflow-wrap: break-word;
 `)]),re("pair",[y("input-el, placeholder","text-align: center;"),y("separator",`
 display: flex;
 align-items: center;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 white-space: nowrap;
 `,[O("icon",`
 color: var(--n-icon-color);
 `),O("base-icon",`
 color: var(--n-icon-color);
 `)])]),re("disabled",`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `,[y("border","border: var(--n-border-disabled);"),y("input-el, textarea-el",`
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 text-decoration-color: var(--n-text-color-disabled);
 `),y("placeholder","color: var(--n-placeholder-color-disabled);"),y("separator","color: var(--n-text-color-disabled);",[O("icon",`
 color: var(--n-icon-color-disabled);
 `),O("base-icon",`
 color: var(--n-icon-color-disabled);
 `)]),O("input-word-count",`
 color: var(--n-count-text-color-disabled);
 `),y("suffix, prefix","color: var(--n-text-color-disabled);",[O("icon",`
 color: var(--n-icon-color-disabled);
 `),O("internal-icon",`
 color: var(--n-icon-color-disabled);
 `)])]),De("disabled",[y("eye",`
 color: var(--n-icon-color);
 cursor: pointer;
 `,[ee("&:hover",`
 color: var(--n-icon-color-hover);
 `),ee("&:active",`
 color: var(--n-icon-color-pressed);
 `)]),ee("&:hover",[y("state-border","border: var(--n-border-hover);")]),re("focus","background-color: var(--n-color-focus);",[y("state-border",`
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),y("border, state-border",`
 box-sizing: border-box;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 border-radius: inherit;
 border: var(--n-border);
 transition:
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `),y("state-border",`
 border-color: #0000;
 z-index: 1;
 `),y("prefix","margin-right: 4px;"),y("suffix",`
 margin-left: 4px;
 `),y("suffix, prefix",`
 transition: color .3s var(--n-bezier);
 flex-wrap: nowrap;
 flex-shrink: 0;
 line-height: var(--n-height);
 white-space: nowrap;
 display: inline-flex;
 align-items: center;
 justify-content: center;
 color: var(--n-suffix-text-color);
 `,[O("base-loading",`
 font-size: var(--n-icon-size);
 margin: 0 2px;
 color: var(--n-loading-color);
 `),O("base-clear",`
 font-size: var(--n-icon-size);
 `,[y("placeholder",[O("base-icon",`
 transition: color .3s var(--n-bezier);
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 `)])]),ee(">",[O("icon",`
 transition: color .3s var(--n-bezier);
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 `)]),O("base-icon",`
 font-size: var(--n-icon-size);
 `)]),O("input-word-count",`
 pointer-events: none;
 line-height: 1.5;
 font-size: .85em;
 color: var(--n-count-text-color);
 transition: color .3s var(--n-bezier);
 margin-left: 4px;
 font-variant: tabular-nums;
 `),["warning","error"].map(e=>re(`${e}-status`,[De("disabled",[O("base-loading",`
 color: var(--n-loading-color-${e})
 `),y("input-el, textarea-el",`
 caret-color: var(--n-caret-color-${e});
 `),y("state-border",`
 border: var(--n-border-${e});
 `),ee("&:hover",[y("state-border",`
 border: var(--n-border-hover-${e});
 `)]),ee("&:focus",`
 background-color: var(--n-color-focus-${e});
 `,[y("state-border",`
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)]),re("focus",`
 background-color: var(--n-color-focus-${e});
 `,[y("state-border",`
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))]),br=O("input",[re("disabled",[y("input-el, textarea-el",`
 -webkit-text-fill-color: var(--n-text-color-disabled);
 `)])]);function mr(e){let o=0;for(const n of e)o++;return o}function zt(e){return e===""||e==null}function xr(e){const o=P(null);function n(){const{value:h}=e;if(!h?.focus){d();return}const{selectionStart:f,selectionEnd:a,value:u}=h;if(f==null||a==null){d();return}o.value={start:f,end:a,beforeText:u.slice(0,f),afterText:u.slice(a)}}function l(){var h;const{value:f}=o,{value:a}=e;if(!f||!a)return;const{value:u}=a,{start:v,beforeText:s,afterText:m}=f;let x=u.length;if(u.endsWith(m))x=u.length-m.length;else if(u.startsWith(s))x=s.length;else{const F=s[v-1],S=u.indexOf(F,v-1);S!==-1&&(x=S+1)}(h=a.setSelectionRange)===null||h===void 0||h.call(a,x,x)}function d(){o.value=null}return Se(e,d),{recordCursor:n,restoreCursor:l}}const un=he({name:"InputWordCount",setup(e,{slots:o}){const{mergedValueRef:n,maxlengthRef:l,mergedClsPrefixRef:d,countGraphemesRef:h}=It(In),f=$(()=>{const{value:a}=n;return a===null||Array.isArray(a)?0:(h.value||mr)(a)});return()=>{const{value:a}=l,{value:u}=n;return r("span",{class:`${d.value}-input-word-count`},vo(o.default,{value:u===null||Array.isArray(u)?"":u},()=>[a===void 0?f.value:`${f.value} / ${a}`]))}}}),wr=Object.assign(Object.assign({},ze.props),{bordered:{type:Boolean,default:void 0},type:{type:String,default:"text"},placeholder:[Array,String],defaultValue:{type:[String,Array],default:null},value:[String,Array],disabled:{type:Boolean,default:void 0},size:String,rows:{type:[Number,String],default:3},round:Boolean,minlength:[String,Number],maxlength:[String,Number],clearable:Boolean,autosize:{type:[Boolean,Object],default:!1},pair:Boolean,separator:String,readonly:{type:[String,Boolean],default:!1},passivelyActivated:Boolean,showPasswordOn:String,stateful:{type:Boolean,default:!0},autofocus:Boolean,inputProps:Object,resizable:{type:Boolean,default:!0},showCount:Boolean,loading:{type:Boolean,default:void 0},allowInput:Function,renderCount:Function,onMousedown:Function,onKeydown:Function,onKeyup:[Function,Array],onInput:[Function,Array],onFocus:[Function,Array],onBlur:[Function,Array],onClick:[Function,Array],onChange:[Function,Array],onClear:[Function,Array],countGraphemes:Function,status:String,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],textDecoration:[String,Array],attrSize:{type:Number,default:20},onInputBlur:[Function,Array],onInputFocus:[Function,Array],onDeactivate:[Function,Array],onActivate:[Function,Array],onWrapperFocus:[Function,Array],onWrapperBlur:[Function,Array],internalDeactivateOnEnter:Boolean,internalForceFocus:Boolean,internalLoadingBeforeSuffix:{type:Boolean,default:!0},showPasswordToggle:Boolean}),Hr=he({name:"Input",props:wr,slots:Object,setup(e){const{mergedClsPrefixRef:o,mergedBorderedRef:n,inlineThemeDisabled:l,mergedRtlRef:d}=xt(e),h=ze("Input","-input",gr,pr,e,o);mo&&vn("-input-safari",br,o);const f=P(null),a=P(null),u=P(null),v=P(null),s=P(null),m=P(null),x=P(null),F=xr(x),S=P(null),{localeRef:E}=Jt("Input"),W=P(e.defaultValue),_=ue(e,"value"),T=Kt(_,W),k=bn(e),{mergedSizeRef:A,mergedDisabledRef:L,mergedStatusRef:ie}=k,N=P(!1),le=P(!1),te=P(!1),ne=P(!1);let ae=null;const fe=$(()=>{const{placeholder:t,pair:c}=e;return c?Array.isArray(t)?t:t===void 0?["",""]:[t,t]:t===void 0?[E.value.placeholder]:[t]}),g=$(()=>{const{value:t}=te,{value:c}=T,{value:I}=fe;return!t&&(zt(c)||Array.isArray(c)&&zt(c[0]))&&I[0]}),R=$(()=>{const{value:t}=te,{value:c}=T,{value:I}=fe;return!t&&I[1]&&(zt(c)||Array.isArray(c)&&zt(c[1]))}),B=_e(()=>e.internalForceFocus||N.value),q=_e(()=>{if(L.value||e.readonly||!e.clearable||!B.value&&!le.value)return!1;const{value:t}=T,{value:c}=B;return e.pair?!!(Array.isArray(t)&&(t[0]||t[1]))&&(le.value||c):!!t&&(le.value||c)}),X=$(()=>{const{showPasswordOn:t}=e;if(t)return t;if(e.showPasswordToggle)return"click"}),G=P(!1),J=$(()=>{const{textDecoration:t}=e;return t?Array.isArray(t)?t.map(c=>({textDecoration:c})):[{textDecoration:t}]:["",""]}),K=P(void 0),de=()=>{var t,c;if(e.type==="textarea"){const{autosize:I}=e;if(I&&(K.value=(c=(t=S.value)===null||t===void 0?void 0:t.$el)===null||c===void 0?void 0:c.offsetWidth),!a.value||typeof I=="boolean")return;const{paddingTop:Z,paddingBottom:oe,lineHeight:Y}=window.getComputedStyle(a.value),Pe=Number(Z.slice(0,-2)),Ie=Number(oe.slice(0,-2)),Oe=Number(Y.slice(0,-2)),{value:Ke}=u;if(!Ke)return;if(I.minRows){const Ge=Math.max(I.minRows,1),ht=`${Pe+Ie+Oe*Ge}px`;Ke.style.minHeight=ht}if(I.maxRows){const Ge=`${Pe+Ie+Oe*I.maxRows}px`;Ke.style.maxHeight=Ge}}},b=$(()=>{const{maxlength:t}=e;return t===void 0?void 0:Number(t)});dt(()=>{const{value:t}=T;Array.isArray(t)||be(t)});const C=zo().proxy;function j(t,c){const{onUpdateValue:I,"onUpdate:value":Z,onInput:oe}=e,{nTriggerFormInput:Y}=k;I&&Q(I,t,c),Z&&Q(Z,t,c),oe&&Q(oe,t,c),W.value=t,Y()}function ve(t,c){const{onChange:I}=e,{nTriggerFormChange:Z}=k;I&&Q(I,t,c),W.value=t,Z()}function $e(t){const{onBlur:c}=e,{nTriggerFormBlur:I}=k;c&&Q(c,t),I()}function Ae(t){const{onFocus:c}=e,{nTriggerFormFocus:I}=k;c&&Q(c,t),I()}function xe(t){const{onClear:c}=e;c&&Q(c,t)}function ge(t){const{onInputBlur:c}=e;c&&Q(c,t)}function Ee(t){const{onInputFocus:c}=e;c&&Q(c,t)}function we(){const{onDeactivate:t}=e;t&&Q(t)}function We(){const{onActivate:t}=e;t&&Q(t)}function Ve(t){const{onClick:c}=e;c&&Q(c,t)}function He(t){const{onWrapperFocus:c}=e;c&&Q(c,t)}function Ne(t){const{onWrapperBlur:c}=e;c&&Q(c,t)}function Re(){te.value=!0}function Fe(t){te.value=!1,t.target===m.value?ye(t,1):ye(t,0)}function ye(t,c=0,I="input"){const Z=t.target.value;if(be(Z),t instanceof InputEvent&&!t.isComposing&&(te.value=!1),e.type==="textarea"){const{value:Y}=S;Y&&Y.syncUnifiedContainer()}if(ae=Z,te.value)return;F.recordCursor();const oe=je(Z);if(oe)if(!e.pair)I==="input"?j(Z,{source:c}):ve(Z,{source:c});else{let{value:Y}=T;Array.isArray(Y)?Y=[Y[0],Y[1]]:Y=["",""],Y[c]=Z,I==="input"?j(Y,{source:c}):ve(Y,{source:c})}C.$forceUpdate(),oe||bt(F.restoreCursor)}function je(t){const{countGraphemes:c,maxlength:I,minlength:Z}=e;if(c){let Y;if(I!==void 0&&(Y===void 0&&(Y=c(t)),Y>Number(I))||Z!==void 0&&(Y===void 0&&(Y=c(t)),Y<Number(I)))return!1}const{allowInput:oe}=e;return typeof oe=="function"?oe(t):!0}function Ue(t){ge(t),t.relatedTarget===f.value&&we(),t.relatedTarget!==null&&(t.relatedTarget===s.value||t.relatedTarget===m.value||t.relatedTarget===a.value)||(ne.value=!1),p(t,"blur"),x.value=null}function Be(t,c){Ee(t),N.value=!0,ne.value=!0,We(),p(t,"focus"),c===0?x.value=s.value:c===1?x.value=m.value:c===2&&(x.value=a.value)}function Te(t){e.passivelyActivated&&(Ne(t),p(t,"blur"))}function pe(t){e.passivelyActivated&&(N.value=!0,He(t),p(t,"focus"))}function p(t,c){t.relatedTarget!==null&&(t.relatedTarget===s.value||t.relatedTarget===m.value||t.relatedTarget===a.value||t.relatedTarget===f.value)||(c==="focus"?(Ae(t),N.value=!0):c==="blur"&&($e(t),N.value=!1))}function z(t,c){ye(t,c,"change")}function se(t){Ve(t)}function ct(t){xe(t),Ye()}function Ye(){e.pair?(j(["",""],{source:"clear"}),ve(["",""],{source:"clear"})):(j("",{source:"clear"}),ve("",{source:"clear"}))}function Xe(t){const{onMousedown:c}=e;c&&c(t);const{tagName:I}=t.target;if(I!=="INPUT"&&I!=="TEXTAREA"){if(e.resizable){const{value:Z}=f;if(Z){const{left:oe,top:Y,width:Pe,height:Ie}=Z.getBoundingClientRect(),Oe=14;if(oe+Pe-Oe<t.clientX&&t.clientX<oe+Pe&&Y+Ie-Oe<t.clientY&&t.clientY<Y+Ie)return}}t.preventDefault(),N.value||M()}}function Ze(){var t;le.value=!0,e.type==="textarea"&&((t=S.value)===null||t===void 0||t.handleMouseEnterWrapper())}function Je(){var t;le.value=!1,e.type==="textarea"&&((t=S.value)===null||t===void 0||t.handleMouseLeaveWrapper())}function ut(){L.value||X.value==="click"&&(G.value=!G.value)}function ft(t){if(L.value)return;t.preventDefault();const c=Z=>{Z.preventDefault(),nn("mouseup",document,c)};if(tn("mouseup",document,c),X.value!=="mousedown")return;G.value=!0;const I=()=>{G.value=!1,nn("mouseup",document,I)};tn("mouseup",document,I)}function Qe(t){e.onKeyup&&Q(e.onKeyup,t)}function Ce(t){switch(e.onKeydown&&Q(e.onKeydown,t),t.key){case"Escape":w();break;case"Enter":i(t);break}}function i(t){var c,I;if(e.passivelyActivated){const{value:Z}=ne;if(Z){e.internalDeactivateOnEnter&&w();return}t.preventDefault(),e.type==="textarea"?(c=a.value)===null||c===void 0||c.focus():(I=s.value)===null||I===void 0||I.focus()}}function w(){e.passivelyActivated&&(ne.value=!1,bt(()=>{var t;(t=f.value)===null||t===void 0||t.focus()}))}function M(){var t,c,I;L.value||(e.passivelyActivated?(t=f.value)===null||t===void 0||t.focus():((c=a.value)===null||c===void 0||c.focus(),(I=s.value)===null||I===void 0||I.focus()))}function U(){var t;!((t=f.value)===null||t===void 0)&&t.contains(document.activeElement)&&document.activeElement.blur()}function V(){var t,c;(t=a.value)===null||t===void 0||t.select(),(c=s.value)===null||c===void 0||c.select()}function D(){L.value||(a.value?a.value.focus():s.value&&s.value.focus())}function H(){const{value:t}=f;t?.contains(document.activeElement)&&t!==document.activeElement&&w()}function ce(t){if(e.type==="textarea"){const{value:c}=a;c?.scrollTo(t)}else{const{value:c}=s;c?.scrollTo(t)}}function be(t){const{type:c,pair:I,autosize:Z}=e;if(!I&&Z)if(c==="textarea"){const{value:oe}=u;oe&&(oe.textContent=`${t??""}\r
`)}else{const{value:oe}=v;oe&&(t?oe.textContent=t:oe.innerHTML="&nbsp;")}}function Ot(){de()}const yt=P({top:"0"});function kt(t){var c;const{scrollTop:I}=t.target;yt.value.top=`${-I}px`,(c=S.value)===null||c===void 0||c.syncUnifiedContainer()}let et=null;Gt(()=>{const{autosize:t,type:c}=e;t&&c==="textarea"?et=Se(T,I=>{!Array.isArray(I)&&I!==ae&&be(I)}):et?.()});let tt=null;Gt(()=>{e.type==="textarea"?tt=Se(T,t=>{var c;!Array.isArray(t)&&t!==ae&&((c=S.value)===null||c===void 0||c.syncUnifiedContainer())}):tt?.()}),Tt(In,{mergedValueRef:T,maxlengthRef:b,mergedClsPrefixRef:o,countGraphemesRef:ue(e,"countGraphemes")});const Mt={wrapperElRef:f,inputElRef:s,textareaElRef:a,isCompositing:te,clear:Ye,focus:M,blur:U,select:V,deactivate:H,activate:D,scrollTo:ce},_t=Zt("Input",d,o),Ct=$(()=>{const{value:t}=A,{common:{cubicBezierEaseInOut:c},self:{color:I,borderRadius:Z,textColor:oe,caretColor:Y,caretColorError:Pe,caretColorWarning:Ie,textDecorationColor:Oe,border:Ke,borderDisabled:Ge,borderHover:ht,borderFocus:$t,placeholderColor:At,placeholderColorDisabled:Et,lineHeightTextarea:Bt,colorDisabled:Lt,colorFocus:nt,textColorDisabled:ot,boxShadowFocus:kn,iconSize:Mn,colorFocusWarning:_n,boxShadowFocusWarning:$n,borderWarning:An,borderFocusWarning:En,borderHoverWarning:Bn,colorFocusError:Ln,boxShadowFocusError:Dn,borderError:Wn,borderFocusError:Vn,borderHoverError:Hn,clearSize:Nn,clearColor:jn,clearColorHover:Un,clearColorPressed:Kn,iconColor:Gn,iconColorDisabled:qn,suffixTextColor:Yn,countTextColor:Xn,countTextColorDisabled:Zn,iconColorHover:Jn,iconColorPressed:Qn,loadingColor:eo,loadingColorError:to,loadingColorWarning:no,fontWeight:oo,[me("padding",t)]:ro,[me("fontSize",t)]:io,[me("height",t)]:lo}}=h.value,{left:ao,right:so}=at(ro);return{"--n-bezier":c,"--n-count-text-color":Xn,"--n-count-text-color-disabled":Zn,"--n-color":I,"--n-font-size":io,"--n-font-weight":oo,"--n-border-radius":Z,"--n-height":lo,"--n-padding-left":ao,"--n-padding-right":so,"--n-text-color":oe,"--n-caret-color":Y,"--n-text-decoration-color":Oe,"--n-border":Ke,"--n-border-disabled":Ge,"--n-border-hover":ht,"--n-border-focus":$t,"--n-placeholder-color":At,"--n-placeholder-color-disabled":Et,"--n-icon-size":Mn,"--n-line-height-textarea":Bt,"--n-color-disabled":Lt,"--n-color-focus":nt,"--n-text-color-disabled":ot,"--n-box-shadow-focus":kn,"--n-loading-color":eo,"--n-caret-color-warning":Ie,"--n-color-focus-warning":_n,"--n-box-shadow-focus-warning":$n,"--n-border-warning":An,"--n-border-focus-warning":En,"--n-border-hover-warning":Bn,"--n-loading-color-warning":no,"--n-caret-color-error":Pe,"--n-color-focus-error":Ln,"--n-box-shadow-focus-error":Dn,"--n-border-error":Wn,"--n-border-focus-error":Vn,"--n-border-hover-error":Hn,"--n-loading-color-error":to,"--n-clear-color":jn,"--n-clear-size":Nn,"--n-clear-color-hover":Un,"--n-clear-color-pressed":Kn,"--n-icon-color":Gn,"--n-icon-color-hover":Jn,"--n-icon-color-pressed":Qn,"--n-icon-color-disabled":qn,"--n-suffix-text-color":Yn}}),Le=l?wt("input",$(()=>{const{value:t}=A;return t[0]}),Ct,e):void 0;return Object.assign(Object.assign({},Mt),{wrapperElRef:f,inputElRef:s,inputMirrorElRef:v,inputEl2Ref:m,textareaElRef:a,textareaMirrorElRef:u,textareaScrollbarInstRef:S,rtlEnabled:_t,uncontrolledValue:W,mergedValue:T,passwordVisible:G,mergedPlaceholder:fe,showPlaceholder1:g,showPlaceholder2:R,mergedFocus:B,isComposing:te,activated:ne,showClearButton:q,mergedSize:A,mergedDisabled:L,textDecorationStyle:J,mergedClsPrefix:o,mergedBordered:n,mergedShowPasswordOn:X,placeholderStyle:yt,mergedStatus:ie,textAreaScrollContainerWidth:K,handleTextAreaScroll:kt,handleCompositionStart:Re,handleCompositionEnd:Fe,handleInput:ye,handleInputBlur:Ue,handleInputFocus:Be,handleWrapperBlur:Te,handleWrapperFocus:pe,handleMouseEnter:Ze,handleMouseLeave:Je,handleMouseDown:Xe,handleChange:z,handleClick:se,handleClear:ct,handlePasswordToggleClick:ut,handlePasswordToggleMousedown:ft,handleWrapperKeydown:Ce,handleWrapperKeyup:Qe,handleTextAreaMirrorResize:Ot,getTextareaScrollContainer:()=>a.value,mergedTheme:h,cssVars:l?void 0:Ct,themeClass:Le?.themeClass,onRender:Le?.onRender})},render(){var e,o;const{mergedClsPrefix:n,mergedStatus:l,themeClass:d,type:h,countGraphemes:f,onRender:a}=this,u=this.$slots;return a?.(),r("div",{ref:"wrapperElRef",class:[`${n}-input`,d,l&&`${n}-input--${l}-status`,{[`${n}-input--rtl`]:this.rtlEnabled,[`${n}-input--disabled`]:this.mergedDisabled,[`${n}-input--textarea`]:h==="textarea",[`${n}-input--resizable`]:this.resizable&&!this.autosize,[`${n}-input--autosize`]:this.autosize,[`${n}-input--round`]:this.round&&h!=="textarea",[`${n}-input--pair`]:this.pair,[`${n}-input--focus`]:this.mergedFocus,[`${n}-input--stateful`]:this.stateful}],style:this.cssVars,tabindex:!this.mergedDisabled&&this.passivelyActivated&&!this.activated?0:void 0,onFocus:this.handleWrapperFocus,onBlur:this.handleWrapperBlur,onClick:this.handleClick,onMousedown:this.handleMouseDown,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd,onKeyup:this.handleWrapperKeyup,onKeydown:this.handleWrapperKeydown},r("div",{class:`${n}-input-wrapper`},it(u.prefix,v=>v&&r("div",{class:`${n}-input__prefix`},v)),h==="textarea"?r(yn,{ref:"textareaScrollbarInstRef",class:`${n}-input__textarea`,container:this.getTextareaScrollContainer,triggerDisplayManually:!0,useUnifiedContainer:!0,internalHoistYRail:!0},{default:()=>{var v,s;const{textAreaScrollContainerWidth:m}=this,x={width:this.autosize&&m&&`${m}px`};return r(wn,null,r("textarea",Object.assign({},this.inputProps,{ref:"textareaElRef",class:[`${n}-input__textarea-el`,(v=this.inputProps)===null||v===void 0?void 0:v.class],autofocus:this.autofocus,rows:Number(this.rows),placeholder:this.placeholder,value:this.mergedValue,disabled:this.mergedDisabled,maxlength:f?void 0:this.maxlength,minlength:f?void 0:this.minlength,readonly:this.readonly,tabindex:this.passivelyActivated&&!this.activated?-1:void 0,style:[this.textDecorationStyle[0],(s=this.inputProps)===null||s===void 0?void 0:s.style,x],onBlur:this.handleInputBlur,onFocus:F=>{this.handleInputFocus(F,2)},onInput:this.handleInput,onChange:this.handleChange,onScroll:this.handleTextAreaScroll})),this.showPlaceholder1?r("div",{class:`${n}-input__placeholder`,style:[this.placeholderStyle,x],key:"placeholder"},this.mergedPlaceholder[0]):null,this.autosize?r(jt,{onResize:this.handleTextAreaMirrorResize},{default:()=>r("div",{ref:"textareaMirrorElRef",class:`${n}-input__textarea-mirror`,key:"mirror"})}):null)}}):r("div",{class:`${n}-input__input`},r("input",Object.assign({type:h==="password"&&this.mergedShowPasswordOn&&this.passwordVisible?"text":h},this.inputProps,{ref:"inputElRef",class:[`${n}-input__input-el`,(e=this.inputProps)===null||e===void 0?void 0:e.class],style:[this.textDecorationStyle[0],(o=this.inputProps)===null||o===void 0?void 0:o.style],tabindex:this.passivelyActivated&&!this.activated?-1:void 0,placeholder:this.mergedPlaceholder[0],disabled:this.mergedDisabled,maxlength:f?void 0:this.maxlength,minlength:f?void 0:this.minlength,value:Array.isArray(this.mergedValue)?this.mergedValue[0]:this.mergedValue,readonly:this.readonly,autofocus:this.autofocus,size:this.attrSize,onBlur:this.handleInputBlur,onFocus:v=>{this.handleInputFocus(v,0)},onInput:v=>{this.handleInput(v,0)},onChange:v=>{this.handleChange(v,0)}})),this.showPlaceholder1?r("div",{class:`${n}-input__placeholder`},r("span",null,this.mergedPlaceholder[0])):null,this.autosize?r("div",{class:`${n}-input__input-mirror`,key:"mirror",ref:"inputMirrorElRef"}," "):null),!this.pair&&it(u.suffix,v=>v||this.clearable||this.showCount||this.mergedShowPasswordOn||this.loading!==void 0?r("div",{class:`${n}-input__suffix`},[it(u["clear-icon-placeholder"],s=>(this.clearable||s)&&r(Yt,{clsPrefix:n,show:this.showClearButton,onClear:this.handleClear},{placeholder:()=>s,icon:()=>{var m,x;return(x=(m=this.$slots)["clear-icon"])===null||x===void 0?void 0:x.call(m)}})),this.internalLoadingBeforeSuffix?null:v,this.loading!==void 0?r(Tn,{clsPrefix:n,loading:this.loading,showArrow:!1,showClear:!1,style:this.cssVars}):null,this.internalLoadingBeforeSuffix?v:null,this.showCount&&this.type!=="textarea"?r(un,null,{default:s=>{var m;const{renderCount:x}=this;return x?x(s):(m=u.count)===null||m===void 0?void 0:m.call(u,s)}}):null,this.mergedShowPasswordOn&&this.type==="password"?r("div",{class:`${n}-input__eye`,onMousedown:this.handlePasswordToggleMousedown,onClick:this.handlePasswordToggleClick},this.passwordVisible?lt(u["password-visible-icon"],()=>[r(st,{clsPrefix:n},{default:()=>r(Yo,null)})]):lt(u["password-invisible-icon"],()=>[r(st,{clsPrefix:n},{default:()=>r(Xo,null)})])):null]):null)),this.pair?r("span",{class:`${n}-input__separator`},lt(u.separator,()=>[this.separator])):null,this.pair?r("div",{class:`${n}-input-wrapper`},r("div",{class:`${n}-input__input`},r("input",{ref:"inputEl2Ref",type:this.type,class:`${n}-input__input-el`,tabindex:this.passivelyActivated&&!this.activated?-1:void 0,placeholder:this.mergedPlaceholder[1],disabled:this.mergedDisabled,maxlength:f?void 0:this.maxlength,minlength:f?void 0:this.minlength,value:Array.isArray(this.mergedValue)?this.mergedValue[1]:void 0,readonly:this.readonly,style:this.textDecorationStyle[1],onBlur:this.handleInputBlur,onFocus:v=>{this.handleInputFocus(v,1)},onInput:v=>{this.handleInput(v,1)},onChange:v=>{this.handleChange(v,1)}}),this.showPlaceholder2?r("div",{class:`${n}-input__placeholder`},r("span",null,this.mergedPlaceholder[1])):null),it(u.suffix,v=>(this.clearable||v)&&r("div",{class:`${n}-input__suffix`},[this.clearable&&r(Yt,{clsPrefix:n,show:this.showClearButton,onClear:this.handleClear},{icon:()=>{var s;return(s=u["clear-icon"])===null||s===void 0?void 0:s.call(u)},placeholder:()=>{var s;return(s=u["clear-icon-placeholder"])===null||s===void 0?void 0:s.call(u)}}),v]))):null,this.mergedBordered?r("div",{class:`${n}-input__border`}):null,this.mergedBordered?r("div",{class:`${n}-input__state-border`}):null,this.showCount&&h==="textarea"?r(un,null,{default:v=>{var s;const{renderCount:m}=this;return m?m(v):(s=u.count)===null||s===void 0?void 0:s.call(u,v)}}):null)}});function Pt(e){return e.type==="group"}function On(e){return e.type==="ignored"}function Nt(e,o){try{return!!(1+o.toString().toLowerCase().indexOf(e.trim().toLowerCase()))}catch{return!1}}function yr(e,o){return{getIsGroup:Pt,getIgnored:On,getKey(l){return Pt(l)?l.name||l.key||"key-required":l[e]},getChildren(l){return l[o]}}}function Cr(e,o,n,l){if(!o)return e;function d(h){if(!Array.isArray(h))return[];const f=[];for(const a of h)if(Pt(a)){const u=d(a[l]);u.length&&f.push(Object.assign({},a,{[l]:u}))}else{if(On(a))continue;o(n,a)&&f.push(a)}return f}return d(e)}function Sr(e,o,n){const l=new Map;return e.forEach(d=>{Pt(d)?d[n].forEach(h=>{l.set(h[o],h)}):l.set(d[o],d)}),l}function zr(e){const{boxShadow2:o}=e;return{menuBoxShadow:o}}const Rr=Xt({name:"Select",common:mt,peers:{InternalSelection:Pn,InternalSelectMenu:Fn},self:zr}),Fr=ee([O("select",`
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 font-weight: var(--n-font-weight);
 `),O("select-menu",`
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `,[gn({originalTransition:"background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)"})])]),Tr=Object.assign(Object.assign({},ze.props),{to:qt.propTo,bordered:{type:Boolean,default:void 0},clearable:Boolean,clearFilterAfterSelect:{type:Boolean,default:!0},options:{type:Array,default:()=>[]},defaultValue:{type:[String,Number,Array],default:null},keyboard:{type:Boolean,default:!0},value:[String,Number,Array],placeholder:String,menuProps:Object,multiple:Boolean,size:String,menuSize:{type:String},filterable:Boolean,disabled:{type:Boolean,default:void 0},remote:Boolean,loading:Boolean,filter:Function,placement:{type:String,default:"bottom-start"},widthMode:{type:String,default:"trigger"},tag:Boolean,onCreate:Function,fallbackOption:{type:[Function,Boolean],default:void 0},show:{type:Boolean,default:void 0},showArrow:{type:Boolean,default:!0},maxTagCount:[Number,String],ellipsisTagPopoverProps:Object,consistentMenuWidth:{type:Boolean,default:!0},virtualScroll:{type:Boolean,default:!0},labelField:{type:String,default:"label"},valueField:{type:String,default:"value"},childrenField:{type:String,default:"children"},renderLabel:Function,renderOption:Function,renderTag:Function,"onUpdate:value":[Function,Array],inputProps:Object,nodeProps:Function,ignoreComposition:{type:Boolean,default:!0},showOnFocus:Boolean,onUpdateValue:[Function,Array],onBlur:[Function,Array],onClear:[Function,Array],onFocus:[Function,Array],onScroll:[Function,Array],onSearch:[Function,Array],onUpdateShow:[Function,Array],"onUpdate:show":[Function,Array],displayDirective:{type:String,default:"show"},resetMenuOnOptionsChange:{type:Boolean,default:!0},status:String,showCheckmark:{type:Boolean,default:!0},onChange:[Function,Array],items:Array}),Nr=he({name:"Select",props:Tr,slots:Object,setup(e){const{mergedClsPrefixRef:o,mergedBorderedRef:n,namespaceRef:l,inlineThemeDisabled:d}=xt(e),h=ze("Select","-select",Fr,Rr,e,o),f=P(e.defaultValue),a=ue(e,"value"),u=Kt(a,f),v=P(!1),s=P(""),m=po(e,["items","options"]),x=P([]),F=P([]),S=$(()=>F.value.concat(x.value).concat(m.value)),E=$(()=>{const{filter:i}=e;if(i)return i;const{labelField:w,valueField:M}=e;return(U,V)=>{if(!V)return!1;const D=V[w];if(typeof D=="string")return Nt(U,D);const H=V[M];return typeof H=="string"?Nt(U,H):typeof H=="number"?Nt(U,String(H)):!1}}),W=$(()=>{if(e.remote)return m.value;{const{value:i}=S,{value:w}=s;return!w.length||!e.filterable?i:Cr(i,E.value,w,e.childrenField)}}),_=$(()=>{const{valueField:i,childrenField:w}=e,M=yr(i,w);return xo(W.value,M)}),T=$(()=>Sr(S.value,e.valueField,e.childrenField)),k=P(!1),A=Kt(ue(e,"show"),k),L=P(null),ie=P(null),N=P(null),{localeRef:le}=Jt("Select"),te=$(()=>{var i;return(i=e.placeholder)!==null&&i!==void 0?i:le.value.placeholder}),ne=[],ae=P(new Map),fe=$(()=>{const{fallbackOption:i}=e;if(i===void 0){const{labelField:w,valueField:M}=e;return U=>({[w]:String(U),[M]:U})}return i===!1?!1:w=>Object.assign(i(w),{value:w})});function g(i){const w=e.remote,{value:M}=ae,{value:U}=T,{value:V}=fe,D=[];return i.forEach(H=>{if(U.has(H))D.push(U.get(H));else if(w&&M.has(H))D.push(M.get(H));else if(V){const ce=V(H);ce&&D.push(ce)}}),D}const R=$(()=>{if(e.multiple){const{value:i}=u;return Array.isArray(i)?g(i):[]}return null}),B=$(()=>{const{value:i}=u;return!e.multiple&&!Array.isArray(i)?i===null?null:g([i])[0]||null:null}),q=bn(e),{mergedSizeRef:X,mergedDisabledRef:G,mergedStatusRef:J}=q;function K(i,w){const{onChange:M,"onUpdate:value":U,onUpdateValue:V}=e,{nTriggerFormChange:D,nTriggerFormInput:H}=q;M&&Q(M,i,w),V&&Q(V,i,w),U&&Q(U,i,w),f.value=i,D(),H()}function de(i){const{onBlur:w}=e,{nTriggerFormBlur:M}=q;w&&Q(w,i),M()}function b(){const{onClear:i}=e;i&&Q(i)}function C(i){const{onFocus:w,showOnFocus:M}=e,{nTriggerFormFocus:U}=q;w&&Q(w,i),U(),M&&xe()}function j(i){const{onSearch:w}=e;w&&Q(w,i)}function ve(i){const{onScroll:w}=e;w&&Q(w,i)}function $e(){var i;const{remote:w,multiple:M}=e;if(w){const{value:U}=ae;if(M){const{valueField:V}=e;(i=R.value)===null||i===void 0||i.forEach(D=>{U.set(D[V],D)})}else{const V=B.value;V&&U.set(V[e.valueField],V)}}}function Ae(i){const{onUpdateShow:w,"onUpdate:show":M}=e;w&&Q(w,i),M&&Q(M,i),k.value=i}function xe(){G.value||(Ae(!0),k.value=!0,e.filterable&&Je())}function ge(){Ae(!1)}function Ee(){s.value="",F.value=ne}const we=P(!1);function We(){e.filterable&&(we.value=!0)}function Ve(){e.filterable&&(we.value=!1,A.value||Ee())}function He(){G.value||(A.value?e.filterable?Je():ge():xe())}function Ne(i){var w,M;!((M=(w=N.value)===null||w===void 0?void 0:w.selfRef)===null||M===void 0)&&M.contains(i.relatedTarget)||(v.value=!1,de(i),ge())}function Re(i){C(i),v.value=!0}function Fe(){v.value=!0}function ye(i){var w;!((w=L.value)===null||w===void 0)&&w.$el.contains(i.relatedTarget)||(v.value=!1,de(i),ge())}function je(){var i;(i=L.value)===null||i===void 0||i.focus(),ge()}function Ue(i){var w;A.value&&(!((w=L.value)===null||w===void 0)&&w.$el.contains(Eo(i))||ge())}function Be(i){if(!Array.isArray(i))return[];if(fe.value)return Array.from(i);{const{remote:w}=e,{value:M}=T;if(w){const{value:U}=ae;return i.filter(V=>M.has(V)||U.has(V))}else return i.filter(U=>M.has(U))}}function Te(i){pe(i.rawNode)}function pe(i){if(G.value)return;const{tag:w,remote:M,clearFilterAfterSelect:U,valueField:V}=e;if(w&&!M){const{value:D}=F,H=D[0]||null;if(H){const ce=x.value;ce.length?ce.push(H):x.value=[H],F.value=ne}}if(M&&ae.value.set(i[V],i),e.multiple){const D=Be(u.value),H=D.findIndex(ce=>ce===i[V]);if(~H){if(D.splice(H,1),w&&!M){const ce=p(i[V]);~ce&&(x.value.splice(ce,1),U&&(s.value=""))}}else D.push(i[V]),U&&(s.value="");K(D,g(D))}else{if(w&&!M){const D=p(i[V]);~D?x.value=[x.value[D]]:x.value=ne}Ze(),ge(),K(i[V],i)}}function p(i){return x.value.findIndex(M=>M[e.valueField]===i)}function z(i){A.value||xe();const{value:w}=i.target;s.value=w;const{tag:M,remote:U}=e;if(j(w),M&&!U){if(!w){F.value=ne;return}const{onCreate:V}=e,D=V?V(w):{[e.labelField]:w,[e.valueField]:w},{valueField:H,labelField:ce}=e;m.value.some(be=>be[H]===D[H]||be[ce]===D[ce])||x.value.some(be=>be[H]===D[H]||be[ce]===D[ce])?F.value=ne:F.value=[D]}}function se(i){i.stopPropagation();const{multiple:w}=e;!w&&e.filterable&&ge(),b(),w?K([],[]):K(null,null)}function ct(i){!gt(i,"action")&&!gt(i,"empty")&&!gt(i,"header")&&i.preventDefault()}function Ye(i){ve(i)}function Xe(i){var w,M,U,V,D;if(!e.keyboard){i.preventDefault();return}switch(i.key){case" ":if(e.filterable)break;i.preventDefault();case"Enter":if(!(!((w=L.value)===null||w===void 0)&&w.isComposing)){if(A.value){const H=(M=N.value)===null||M===void 0?void 0:M.getPendingTmNode();H?Te(H):e.filterable||(ge(),Ze())}else if(xe(),e.tag&&we.value){const H=F.value[0];if(H){const ce=H[e.valueField],{value:be}=u;e.multiple&&Array.isArray(be)&&be.includes(ce)||pe(H)}}}i.preventDefault();break;case"ArrowUp":if(i.preventDefault(),e.loading)return;A.value&&((U=N.value)===null||U===void 0||U.prev());break;case"ArrowDown":if(i.preventDefault(),e.loading)return;A.value?(V=N.value)===null||V===void 0||V.next():xe();break;case"Escape":A.value&&(jo(i),ge()),(D=L.value)===null||D===void 0||D.focus();break}}function Ze(){var i;(i=L.value)===null||i===void 0||i.focus()}function Je(){var i;(i=L.value)===null||i===void 0||i.focusInput()}function ut(){var i;A.value&&((i=ie.value)===null||i===void 0||i.syncPosition())}$e(),Se(ue(e,"options"),$e);const ft={focus:()=>{var i;(i=L.value)===null||i===void 0||i.focus()},focusInput:()=>{var i;(i=L.value)===null||i===void 0||i.focusInput()},blur:()=>{var i;(i=L.value)===null||i===void 0||i.blur()},blurInput:()=>{var i;(i=L.value)===null||i===void 0||i.blurInput()}},Qe=$(()=>{const{self:{menuBoxShadow:i}}=h.value;return{"--n-menu-box-shadow":i}}),Ce=d?wt("select",void 0,Qe,e):void 0;return Object.assign(Object.assign({},ft),{mergedStatus:J,mergedClsPrefix:o,mergedBordered:n,namespace:l,treeMate:_,isMounted:go(),triggerRef:L,menuRef:N,pattern:s,uncontrolledShow:k,mergedShow:A,adjustedTo:qt(e),uncontrolledValue:f,mergedValue:u,followerRef:ie,localizedPlaceholder:te,selectedOption:B,selectedOptions:R,mergedSize:X,mergedDisabled:G,focused:v,activeWithoutMenuOpen:we,inlineThemeDisabled:d,onTriggerInputFocus:We,onTriggerInputBlur:Ve,handleTriggerOrMenuResize:ut,handleMenuFocus:Fe,handleMenuBlur:ye,handleMenuTabOut:je,handleTriggerClick:He,handleToggle:Te,handleDeleteOption:pe,handlePatternInput:z,handleClear:se,handleTriggerBlur:Ne,handleTriggerFocus:Re,handleKeydown:Xe,handleMenuAfterLeave:Ee,handleMenuClickOutside:Ue,handleMenuScroll:Ye,handleMenuKeydown:Xe,handleMenuMousedown:ct,mergedTheme:h,cssVars:d?void 0:Qe,themeClass:Ce?.themeClass,onRender:Ce?.onRender})},render(){return r("div",{class:`${this.mergedClsPrefix}-select`},r(_o,null,{default:()=>[r($o,null,{default:()=>r(fr,{ref:"triggerRef",inlineThemeDisabled:this.inlineThemeDisabled,status:this.mergedStatus,inputProps:this.inputProps,clsPrefix:this.mergedClsPrefix,showArrow:this.showArrow,maxTagCount:this.maxTagCount,ellipsisTagPopoverProps:this.ellipsisTagPopoverProps,bordered:this.mergedBordered,active:this.activeWithoutMenuOpen||this.mergedShow,pattern:this.pattern,placeholder:this.localizedPlaceholder,selectedOption:this.selectedOption,selectedOptions:this.selectedOptions,multiple:this.multiple,renderTag:this.renderTag,renderLabel:this.renderLabel,filterable:this.filterable,clearable:this.clearable,disabled:this.mergedDisabled,size:this.mergedSize,theme:this.mergedTheme.peers.InternalSelection,labelField:this.labelField,valueField:this.valueField,themeOverrides:this.mergedTheme.peerOverrides.InternalSelection,loading:this.loading,focused:this.focused,onClick:this.handleTriggerClick,onDeleteOption:this.handleDeleteOption,onPatternInput:this.handlePatternInput,onClear:this.handleClear,onBlur:this.handleTriggerBlur,onFocus:this.handleTriggerFocus,onKeydown:this.handleKeydown,onPatternBlur:this.onTriggerInputBlur,onPatternFocus:this.onTriggerInputFocus,onResize:this.handleTriggerOrMenuResize,ignoreComposition:this.ignoreComposition},{arrow:()=>{var e,o;return[(o=(e=this.$slots).arrow)===null||o===void 0?void 0:o.call(e)]}})}),r(Ao,{ref:"followerRef",show:this.mergedShow,to:this.adjustedTo,teleportDisabled:this.adjustedTo===qt.tdkey,containerClass:this.namespace,width:this.consistentMenuWidth?"target":void 0,minWidth:"target",placement:this.placement},{default:()=>r(xn,{name:"fade-in-scale-up-transition",appear:this.isMounted,onAfterLeave:this.handleMenuAfterLeave},{default:()=>{var e,o,n;return this.mergedShow||this.displayDirective==="show"?((e=this.onRender)===null||e===void 0||e.call(this),Ro(r(sr,Object.assign({},this.menuProps,{ref:"menuRef",onResize:this.handleTriggerOrMenuResize,inlineThemeDisabled:this.inlineThemeDisabled,virtualScroll:this.consistentMenuWidth&&this.virtualScroll,class:[`${this.mergedClsPrefix}-select-menu`,this.themeClass,(o=this.menuProps)===null||o===void 0?void 0:o.class],clsPrefix:this.mergedClsPrefix,focusable:!0,labelField:this.labelField,valueField:this.valueField,autoPending:!0,nodeProps:this.nodeProps,theme:this.mergedTheme.peers.InternalSelectMenu,themeOverrides:this.mergedTheme.peerOverrides.InternalSelectMenu,treeMate:this.treeMate,multiple:this.multiple,size:this.menuSize,renderOption:this.renderOption,renderLabel:this.renderLabel,value:this.mergedValue,style:[(n=this.menuProps)===null||n===void 0?void 0:n.style,this.cssVars],onToggle:this.handleToggle,onScroll:this.handleMenuScroll,onFocus:this.handleMenuFocus,onBlur:this.handleMenuBlur,onKeydown:this.handleMenuKeydown,onTabOut:this.handleMenuTabOut,onMousedown:this.handleMenuMousedown,show:this.mergedShow,showCheckmark:this.showCheckmark,resetMenuOnOptionsChange:this.resetMenuOnOptionsChange}),{empty:()=>{var l,d;return[(d=(l=this.$slots).empty)===null||d===void 0?void 0:d.call(l)]},header:()=>{var l,d;return[(d=(l=this.$slots).header)===null||d===void 0?void 0:d.call(l)]},action:()=>{var l,d;return[(d=(l=this.$slots).action)===null||d===void 0?void 0:d.call(l)]}}),this.displayDirective==="show"?[[Fo,this.mergedShow],[on,this.handleMenuClickOutside,void 0,{capture:!0}]]:[[on,this.handleMenuClickOutside,void 0,{capture:!0}]])):null}})})]}))}}),jr=e=>({state:()=>({list:{},selectedSection:Rt[0],selectedConnection:pt[0],sections:Rt,socialOptions:pt,loading:!1,pager:{page:0,size:10}}),actions:{async setSection(o,n){this.selectedSection=Rt.find(l=>l.key==o)??Rt[0],this.selectedConnection=n?pt.find(l=>l.key==n)??pt[0]:pt[0]},async getData(o){o&&(this.pager=o,this.selectedSection.key=="list"?await this.getList(!0):this.selectedSection.key=="connections"&&await this.getConnections(!0))},async getList(o=!1){if(!(this.list.list&&!o)){this.loading=!0;try{this.list.list=await Mr(Ir[e])}catch{this.fetched=!1}finally{this.loading=!1}}},async getConnections(o=!1){if(!(this.list.connections&&!o)){this.loading=!0;try{const n=await $r(e,this.selectedConnection.key,this.pager);n.items.forEach(l=>{l.profileLink=`/${e}/${l.slug}`,l.key=e}),this.list.connections=n}catch(n){console.log(n)}finally{this.loading=!1}}}}}),Pr="withoutEnlargement=true&fit=inside&height=120&quality=90&format=png",Ir={business:qe.GET_COMPANIES+"?fields=*&sort=name&meta=filter_count",edu:qe.GET_EDUS+"?fields=*&sort=name&meta=filter_count",people:qe.GET_USERS+"?fields=*&sort=username&meta=filter_count"},Or={people:{url:`${qe.GET_USERS}?fields=username,related.social.{SOCIAL}&filter[related][social][{SOCIAL}][_nempty]=true&sort=username&meta=filter_count`,itemPath:["related","social"]},business:{url:`${qe.GET_COMPANIES}?fields=name,slug,tagline,social.{SOCIAL}&filter[social][{SOCIAL}][_nempty]=true&sort=name&meta=filter_count`,itemPath:"social"},edu:{url:`${qe.GET_EDUS}?fields=name,slug,social.{SOCIAL}&filter[social][{SOCIAL}][_nempty]=true&sort=name&meta=filter_count`,itemPath:"social"}},Rt=[{label:"List",key:"list",content:"List"},{label:"Connections",key:"connections",content:"Social"}],pt=[{label:"GitHub",key:"github"},{label:"NuGet",key:"nuget"},{label:"Mastodon",key:"mastodon"},{label:"Pixelfed",key:"pixelfed"},{label:"LinkedIn",key:"linkedin"},{label:"YouTube",key:"youtube"},{label:"PeerTube",key:"peertube"}];function kr(e){return`&limit=${e.size}&page=${e.page}`}async function Mr(e){const o=await fetch(e);if(o.ok){const n=await o.json(),l=n.data;return l.forEach(d=>{d.logo=_r(d.logo)}),{items:l,total:n.meta?.filter_count??0}}else throw Error("Connection Error")}function _r(e){return e?`${qe.ASSETS}${e}?${Pr}`:null}async function $r(e,o,n){const l=Or[e],d=l?.url.replaceAll("{SOCIAL}",o);if(!d)throw new Error("Can't fetch Social");const h=await fetch(d+kr(n));if(h.ok){const f=await h.json();return{items:f.data.map(u=>{const v=(Array.isArray(l.itemPath)?u[l.itemPath[0]][0][l.itemPath[1]]:u[l.itemPath])[o],s=Bo(o,v);return{name:u.username??u.name,label:s.text,connectionLink:s.url,slug:u.slug??u.username}}),total:f.meta?.filter_count??0}}else throw Error("Connection Error")}export{Ko as C,Yo as E,or as N,Vo as V,Hr as a,sr as b,yr as c,pr as d,Rn as e,Rr as f,Nr as g,sn as h,Fn as i,Vr as k,Ht as m,jr as s};
