import{n as _e,V as jt,b5 as Ft,b6 as fn,b7 as hn,D as Kt,R as vt,$ as uo,b8 as Dt,aE as fo,h as I,g as ee,l as y,m as ho,N as vo,Y as it,aA as vn,K as st,d as mt,u as xt,p as ze,a1 as Xt,s as me,t as wt,w as Zt,A as po,aL as rt,b9 as Jt,k as re,F as De,_ as pn,r as lt,J as gn,S as bn,q as Qt,ba as go,bb as at,T as gt,bc as bo,z as mo,c as Me,bd as xo,af as Wt,O as wo,be as en,a as yo,bf as Co,bg as So,e as Ut,b as mn,o as tn,f as Q,P as nn,bh as zo,bi as Ro,bj as Fo,as as Gt,bk as on,aN as To,a0 as Po,bl as Oo,bm as Io,a6 as qe}from"./app.js";import{r as P,f as $,p as Tt,d as he,i as Ot,h as r,H as ko,l as dt,t as Mo,v as _o,z as ue,n as bt,A as $o,w as Se,m as xn,E as wn,F as yn,D as qt,k as Ao,y as Eo,I as Bo}from"./app-vue-Chj5ZsMy.js";import{l as Lo}from"./app-LinksHelper-CkUh4jxH.js";function rn(e){return e&-e}class Cn{constructor(o,n){this.l=o,this.min=n;const i=new Array(o+1);for(let d=0;d<o+1;++d)i[d]=0;this.ft=i}add(o,n){if(n===0)return;const{l:i,ft:d}=this;for(o+=1;o<=i;)d[o]+=n,o+=rn(o)}get(o){return this.sum(o+1)-this.sum(o)}sum(o){if(o===void 0&&(o=this.l),o<=0)return 0;const{ft:n,min:i,l:d}=this;if(o>d)throw new Error("[FinweckTree.sum]: `i` is larger than length.");let u=o*i;for(;o>0;)u+=n[o],o-=rn(o);return u}getBound(o){let n=0,i=this.l;for(;i>n;){const d=Math.floor((n+i)/2),u=this.sum(d);if(u>o){i=d;continue}else if(u<o){if(n===d)return this.sum(n+1)<=o?n+1:d;n=d}else return d}return n}}let St;function Do(){return typeof document>"u"?!1:(St===void 0&&("matchMedia"in window?St=window.matchMedia("(pointer:coarse)").matches:St=!1),St)}let Vt;function ln(){return typeof document>"u"?1:(Vt===void 0&&(Vt="chrome"in window?window.devicePixelRatio:1),Vt)}const Sn="VVirtualListXScroll";function Wo({columnsRef:e,renderColRef:o,renderItemWithColsRef:n}){const i=P(0),d=P(0),u=$(()=>{const v=e.value;if(v.length===0)return null;const s=new Cn(v.length,0);return v.forEach((m,x)=>{s.add(x,m.width)}),s}),f=_e(()=>{const v=u.value;return v!==null?Math.max(v.getBound(d.value)-1,0):0}),a=v=>{const s=u.value;return s!==null?s.sum(v):0},h=_e(()=>{const v=u.value;return v!==null?Math.min(v.getBound(d.value+i.value)+1,e.value.length-1):0});return Tt(Sn,{startIndexRef:f,endIndexRef:h,columnsRef:e,renderColRef:o,renderItemWithColsRef:n,getLeft:a}),{listWidthRef:i,scrollLeftRef:d}}const an=he({name:"VirtualListRow",props:{index:{type:Number,required:!0},item:{type:Object,required:!0}},setup(){const{startIndexRef:e,endIndexRef:o,columnsRef:n,getLeft:i,renderColRef:d,renderItemWithColsRef:u}=Ot(Sn);return{startIndex:e,endIndex:o,columns:n,renderCol:d,renderItemWithCols:u,getLeft:i}},render(){const{startIndex:e,endIndex:o,columns:n,renderCol:i,renderItemWithCols:d,getLeft:u,item:f}=this;if(d!=null)return d({itemIndex:this.index,startColIndex:e,endColIndex:o,allColumns:n,item:f,getLeft:u});if(i!=null){const a=[];for(let h=e;h<=o;++h){const v=n[h];a.push(i({column:v,left:u(h),item:f}))}return a}return null}}),Vo=Ft(".v-vl",{maxHeight:"inherit",height:"100%",overflow:"auto",minWidth:"1px"},[Ft("&:not(.v-vl--show-scrollbar)",{scrollbarWidth:"none"},[Ft("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb",{width:0,height:0,display:"none"})])]),Ho=he({name:"VirtualList",inheritAttrs:!1,props:{showScrollbar:{type:Boolean,default:!0},columns:{type:Array,default:()=>[]},renderCol:Function,renderItemWithCols:Function,items:{type:Array,default:()=>[]},itemSize:{type:Number,required:!0},itemResizable:Boolean,itemsStyle:[String,Object],visibleItemsTag:{type:[String,Object],default:"div"},visibleItemsProps:Object,ignoreItemResize:Boolean,onScroll:Function,onWheel:Function,onResize:Function,defaultScrollKey:[Number,String],defaultScrollIndex:Number,keyField:{type:String,default:"key"},paddingTop:{type:[Number,String],default:0},paddingBottom:{type:[Number,String],default:0}},setup(e){const o=fn();Vo.mount({id:"vueuc/virtual-list",head:!0,anchorMetaName:hn,ssr:o}),dt(()=>{const{defaultScrollIndex:g,defaultScrollKey:R}=e;g!=null?W({index:g}):R!=null&&W({key:R})});let n=!1,i=!1;Mo(()=>{if(n=!1,!i){i=!0;return}W({top:F.value,left:f.value})}),_o(()=>{n=!0,i||(i=!0)});const d=_e(()=>{if(e.renderCol==null&&e.renderItemWithCols==null||e.columns.length===0)return;let g=0;return e.columns.forEach(R=>{g+=R.width}),g}),u=$(()=>{const g=new Map,{keyField:R}=e;return e.items.forEach((B,q)=>{g.set(B[R],q)}),g}),{scrollLeftRef:f,listWidthRef:a}=Wo({columnsRef:ue(e,"columns"),renderColRef:ue(e,"renderCol"),renderItemWithColsRef:ue(e,"renderItemWithCols")}),h=P(null),v=P(void 0),s=new Map,m=$(()=>{const{items:g,itemSize:R,keyField:B}=e,q=new Cn(g.length,R);return g.forEach((X,G)=>{const J=X[B],U=s.get(J);U!==void 0&&q.add(G,U)}),q}),x=P(0),F=P(0),S=_e(()=>Math.max(m.value.getBound(F.value-Kt(e.paddingTop))-1,0)),E=$(()=>{const{value:g}=v;if(g===void 0)return[];const{items:R,itemSize:B}=e,q=S.value,X=Math.min(q+Math.ceil(g/B+1),R.length-1),G=[];for(let J=q;J<=X;++J)G.push(R[J]);return G}),W=(g,R)=>{if(typeof g=="number"){A(g,R,"auto");return}const{left:B,top:q,index:X,key:G,position:J,behavior:U,debounce:de=!0}=g;if(B!==void 0||q!==void 0)A(B,q,U);else if(X!==void 0)k(X,U,de);else if(G!==void 0){const b=u.value.get(G);b!==void 0&&k(b,U,de)}else J==="bottom"?A(0,Number.MAX_SAFE_INTEGER,U):J==="top"&&A(0,0,U)};let _,T=null;function k(g,R,B){const{value:q}=m,X=q.sum(g)+Kt(e.paddingTop);if(!B)h.value.scrollTo({left:0,top:X,behavior:R});else{_=g,T!==null&&window.clearTimeout(T),T=window.setTimeout(()=>{_=void 0,T=null},16);const{scrollTop:G,offsetHeight:J}=h.value;if(X>G){const U=q.get(g);X+U<=G+J||h.value.scrollTo({left:0,top:X+U-J,behavior:R})}else h.value.scrollTo({left:0,top:X,behavior:R})}}function A(g,R,B){h.value.scrollTo({left:g,top:R,behavior:B})}function L(g,R){var B,q,X;if(n||e.ignoreItemResize||fe(R.target))return;const{value:G}=m,J=u.value.get(g),U=G.get(J),de=(X=(q=(B=R.borderBoxSize)===null||B===void 0?void 0:B[0])===null||q===void 0?void 0:q.blockSize)!==null&&X!==void 0?X:R.contentRect.height;if(de===U)return;de-e.itemSize===0?s.delete(g):s.set(g,de-e.itemSize);const C=de-U;if(C===0)return;G.add(J,C);const j=h.value;if(j!=null){if(_===void 0){const ve=G.sum(J);j.scrollTop>ve&&j.scrollBy(0,C)}else if(J<_)j.scrollBy(0,C);else if(J===_){const ve=G.sum(J);de+ve>j.scrollTop+j.offsetHeight&&j.scrollBy(0,C)}ae()}x.value++}const le=!Do();let N=!1;function ie(g){var R;(R=e.onScroll)===null||R===void 0||R.call(e,g),(!le||!N)&&ae()}function te(g){var R;if((R=e.onWheel)===null||R===void 0||R.call(e,g),le){const B=h.value;if(B!=null){if(g.deltaX===0&&(B.scrollTop===0&&g.deltaY<=0||B.scrollTop+B.offsetHeight>=B.scrollHeight&&g.deltaY>=0))return;g.preventDefault(),B.scrollTop+=g.deltaY/ln(),B.scrollLeft+=g.deltaX/ln(),ae(),N=!0,uo(()=>{N=!1})}}}function ne(g){if(n||fe(g.target))return;if(e.renderCol==null&&e.renderItemWithCols==null){if(g.contentRect.height===v.value)return}else if(g.contentRect.height===v.value&&g.contentRect.width===a.value)return;v.value=g.contentRect.height,a.value=g.contentRect.width;const{onResize:R}=e;R!==void 0&&R(g)}function ae(){const{value:g}=h;g!=null&&(F.value=g.scrollTop,f.value=g.scrollLeft)}function fe(g){let R=g;for(;R!==null;){if(R.style.display==="none")return!0;R=R.parentElement}return!1}return{listHeight:v,listStyle:{overflow:"auto"},keyToIndex:u,itemsStyle:$(()=>{const{itemResizable:g}=e,R=vt(m.value.sum());return x.value,[e.itemsStyle,{boxSizing:"content-box",width:vt(d.value),height:g?"":R,minHeight:g?R:"",paddingTop:vt(e.paddingTop),paddingBottom:vt(e.paddingBottom)}]}),visibleItemsStyle:$(()=>(x.value,{transform:`translateY(${vt(m.value.sum(S.value))})`})),viewportItems:E,listElRef:h,itemsElRef:P(null),scrollTo:W,handleListResize:ne,handleListScroll:ie,handleListWheel:te,handleItemResize:L}},render(){const{itemResizable:e,keyField:o,keyToIndex:n,visibleItemsTag:i}=this;return r(jt,{onResize:this.handleListResize},{default:()=>{var d,u;return r("div",ko(this.$attrs,{class:["v-vl",this.showScrollbar&&"v-vl--show-scrollbar"],onScroll:this.handleListScroll,onWheel:this.handleListWheel,ref:"listElRef"}),[this.items.length!==0?r("div",{ref:"itemsElRef",class:"v-vl-items",style:this.itemsStyle},[r(i,Object.assign({class:"v-vl-visible-items",style:this.visibleItemsStyle},this.visibleItemsProps),{default:()=>{const{renderCol:f,renderItemWithCols:a}=this;return this.viewportItems.map(h=>{const v=h[o],s=n.get(v),m=f!=null?r(an,{index:s,item:h}):void 0,x=a!=null?r(an,{index:s,item:h}):void 0,F=this.$slots.default({item:h,renderedCols:m,renderedItemWithCols:x,index:s})[0];return e?r(jt,{key:v,onResize:S=>this.handleItemResize(v,S)},{default:()=>F}):(F.key=v,F)})}})]):(u=(d=this.$slots).empty)===null||u===void 0?void 0:u.call(d)])}})}}),ke="v-hidden",No=Ft("[v-hidden]",{display:"none!important"}),sn=he({name:"Overflow",props:{getCounter:Function,getTail:Function,updateCounter:Function,onUpdateCount:Function,onUpdateOverflow:Function},setup(e,{slots:o}){const n=P(null),i=P(null);function d(f){const{value:a}=n,{getCounter:h,getTail:v}=e;let s;if(h!==void 0?s=h():s=i.value,!a||!s)return;s.hasAttribute(ke)&&s.removeAttribute(ke);const{children:m}=a;if(f.showAllItemsBeforeCalculate)for(const k of m)k.hasAttribute(ke)&&k.removeAttribute(ke);const x=a.offsetWidth,F=[],S=o.tail?v?.():null;let E=S?S.offsetWidth:0,W=!1;const _=a.children.length-(o.tail?1:0);for(let k=0;k<_-1;++k){if(k<0)continue;const A=m[k];if(W){A.hasAttribute(ke)||A.setAttribute(ke,"");continue}else A.hasAttribute(ke)&&A.removeAttribute(ke);const L=A.offsetWidth;if(E+=L,F[k]=L,E>x){const{updateCounter:le}=e;for(let N=k;N>=0;--N){const ie=_-1-N;le!==void 0?le(ie):s.textContent=`${ie}`;const te=s.offsetWidth;if(E-=F[N],E+te<=x||N===0){W=!0,k=N-1,S&&(k===-1?(S.style.maxWidth=`${x-te}px`,S.style.boxSizing="border-box"):S.style.maxWidth="");const{onUpdateCount:ne}=e;ne&&ne(ie);break}}}}const{onUpdateOverflow:T}=e;W?T!==void 0&&T(!0):(T!==void 0&&T(!1),s.setAttribute(ke,""))}const u=fn();return No.mount({id:"vueuc/overflow",head:!0,anchorMetaName:hn,ssr:u}),dt(()=>d({showAllItemsBeforeCalculate:!1})),{selfRef:n,counterRef:i,sync:d}},render(){const{$slots:e}=this;return bt(()=>this.sync({showAllItemsBeforeCalculate:!1})),r("div",{class:"v-overflow",ref:"selfRef"},[$o(e,"default"),e.counter?e.counter():r("span",{style:{display:"inline-block"},ref:"counterRef"}),e.tail?e.tail():null])}});function zn(e,o){o&&(dt(()=>{const{value:n}=e;n&&Dt.registerHandler(n,o)}),Se(e,(n,i)=>{i&&Dt.unregisterHandler(i)},{deep:!1}),xn(()=>{const{value:n}=e;n&&Dt.unregisterHandler(n)}))}const jo=new WeakSet;function Ko(e){jo.add(e)}function Lr(e){return Object.keys(e)}function Ht(e){const o=e.filter(n=>n!==void 0);if(o.length!==0)return o.length===1?o[0]:n=>{e.forEach(i=>{i&&i(n)})}}const Uo=he({name:"Checkmark",render(){return r("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16"},r("g",{fill:"none"},r("path",{d:"M14.046 3.486a.75.75 0 0 1-.032 1.06l-7.93 7.474a.85.85 0 0 1-1.188-.022l-2.68-2.72a.75.75 0 1 1 1.068-1.053l2.234 2.267l7.468-7.038a.75.75 0 0 1 1.06.032z",fill:"currentColor"})))}}),Go=he({name:"ChevronDown",render(){return r("svg",{viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"},r("path",{d:"M3.14645 5.64645C3.34171 5.45118 3.65829 5.45118 3.85355 5.64645L8 9.79289L12.1464 5.64645C12.3417 5.45118 12.6583 5.45118 12.8536 5.64645C13.0488 5.84171 13.0488 6.15829 12.8536 6.35355L8.35355 10.8536C8.15829 11.0488 7.84171 11.0488 7.64645 10.8536L3.14645 6.35355C2.95118 6.15829 2.95118 5.84171 3.14645 5.64645Z",fill:"currentColor"}))}}),qo=fo("clear",()=>r("svg",{viewBox:"0 0 16 16",version:"1.1",xmlns:"http://www.w3.org/2000/svg"},r("g",{stroke:"none","stroke-width":"1",fill:"none","fill-rule":"evenodd"},r("g",{fill:"currentColor","fill-rule":"nonzero"},r("path",{d:"M8,2 C11.3137085,2 14,4.6862915 14,8 C14,11.3137085 11.3137085,14 8,14 C4.6862915,14 2,11.3137085 2,8 C2,4.6862915 4.6862915,2 8,2 Z M6.5343055,5.83859116 C6.33943736,5.70359511 6.07001296,5.72288026 5.89644661,5.89644661 L5.89644661,5.89644661 L5.83859116,5.9656945 C5.70359511,6.16056264 5.72288026,6.42998704 5.89644661,6.60355339 L5.89644661,6.60355339 L7.293,8 L5.89644661,9.39644661 L5.83859116,9.4656945 C5.70359511,9.66056264 5.72288026,9.92998704 5.89644661,10.1035534 L5.89644661,10.1035534 L5.9656945,10.1614088 C6.16056264,10.2964049 6.42998704,10.2771197 6.60355339,10.1035534 L6.60355339,10.1035534 L8,8.707 L9.39644661,10.1035534 L9.4656945,10.1614088 C9.66056264,10.2964049 9.92998704,10.2771197 10.1035534,10.1035534 L10.1035534,10.1035534 L10.1614088,10.0343055 C10.2964049,9.83943736 10.2771197,9.57001296 10.1035534,9.39644661 L10.1035534,9.39644661 L8.707,8 L10.1035534,6.60355339 L10.1614088,6.5343055 C10.2964049,6.33943736 10.2771197,6.07001296 10.1035534,5.89644661 L10.1035534,5.89644661 L10.0343055,5.83859116 C9.83943736,5.70359511 9.57001296,5.72288026 9.39644661,5.89644661 L9.39644661,5.89644661 L8,7.293 L6.60355339,5.89644661 Z"}))))),Yo=he({name:"Empty",render(){return r("svg",{viewBox:"0 0 28 28",fill:"none",xmlns:"http://www.w3.org/2000/svg"},r("path",{d:"M26 7.5C26 11.0899 23.0899 14 19.5 14C15.9101 14 13 11.0899 13 7.5C13 3.91015 15.9101 1 19.5 1C23.0899 1 26 3.91015 26 7.5ZM16.8536 4.14645C16.6583 3.95118 16.3417 3.95118 16.1464 4.14645C15.9512 4.34171 15.9512 4.65829 16.1464 4.85355L18.7929 7.5L16.1464 10.1464C15.9512 10.3417 15.9512 10.6583 16.1464 10.8536C16.3417 11.0488 16.6583 11.0488 16.8536 10.8536L19.5 8.20711L22.1464 10.8536C22.3417 11.0488 22.6583 11.0488 22.8536 10.8536C23.0488 10.6583 23.0488 10.3417 22.8536 10.1464L20.2071 7.5L22.8536 4.85355C23.0488 4.65829 23.0488 4.34171 22.8536 4.14645C22.6583 3.95118 22.3417 3.95118 22.1464 4.14645L19.5 6.79289L16.8536 4.14645Z",fill:"currentColor"}),r("path",{d:"M25 22.75V12.5991C24.5572 13.0765 24.053 13.4961 23.5 13.8454V16H17.5L17.3982 16.0068C17.0322 16.0565 16.75 16.3703 16.75 16.75C16.75 18.2688 15.5188 19.5 14 19.5C12.4812 19.5 11.25 18.2688 11.25 16.75L11.2432 16.6482C11.1935 16.2822 10.8797 16 10.5 16H4.5V7.25C4.5 6.2835 5.2835 5.5 6.25 5.5H12.2696C12.4146 4.97463 12.6153 4.47237 12.865 4H6.25C4.45507 4 3 5.45507 3 7.25V22.75C3 24.5449 4.45507 26 6.25 26H21.75C23.5449 26 25 24.5449 25 22.75ZM4.5 22.75V17.5H9.81597L9.85751 17.7041C10.2905 19.5919 11.9808 21 14 21L14.215 20.9947C16.2095 20.8953 17.842 19.4209 18.184 17.5H23.5V22.75C23.5 23.7165 22.7165 24.5 21.75 24.5H6.25C5.2835 24.5 4.5 23.7165 4.5 22.75Z",fill:"currentColor"}))}}),Xo=he({name:"Eye",render(){return r("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},r("path",{d:"M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 0 0-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 0 0 0-17.47C428.89 172.28 347.8 112 255.66 112z",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"}),r("circle",{cx:"256",cy:"256",r:"80",fill:"none",stroke:"currentColor","stroke-miterlimit":"10","stroke-width":"32"}))}}),Zo=he({name:"EyeOff",render(){return r("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},r("path",{d:"M432 448a15.92 15.92 0 0 1-11.31-4.69l-352-352a16 16 0 0 1 22.62-22.62l352 352A16 16 0 0 1 432 448z",fill:"currentColor"}),r("path",{d:"M255.66 384c-41.49 0-81.5-12.28-118.92-36.5c-34.07-22-64.74-53.51-88.7-91v-.08c19.94-28.57 41.78-52.73 65.24-72.21a2 2 0 0 0 .14-2.94L93.5 161.38a2 2 0 0 0-2.71-.12c-24.92 21-48.05 46.76-69.08 76.92a31.92 31.92 0 0 0-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416a239.13 239.13 0 0 0 75.8-12.58a2 2 0 0 0 .77-3.31l-21.58-21.58a4 4 0 0 0-3.83-1a204.8 204.8 0 0 1-51.16 6.47z",fill:"currentColor"}),r("path",{d:"M490.84 238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96a227.34 227.34 0 0 0-74.89 12.83a2 2 0 0 0-.75 3.31l21.55 21.55a4 4 0 0 0 3.88 1a192.82 192.82 0 0 1 50.21-6.69c40.69 0 80.58 12.43 118.55 37c34.71 22.4 65.74 53.88 89.76 91a.13.13 0 0 1 0 .16a310.72 310.72 0 0 1-64.12 72.73a2 2 0 0 0-.15 2.95l19.9 19.89a2 2 0 0 0 2.7.13a343.49 343.49 0 0 0 68.64-78.48a32.2 32.2 0 0 0-.1-34.78z",fill:"currentColor"}),r("path",{d:"M256 160a95.88 95.88 0 0 0-21.37 2.4a2 2 0 0 0-1 3.38l112.59 112.56a2 2 0 0 0 3.38-1A96 96 0 0 0 256 160z",fill:"currentColor"}),r("path",{d:"M165.78 233.66a2 2 0 0 0-3.38 1a96 96 0 0 0 115 115a2 2 0 0 0 1-3.38z",fill:"currentColor"}))}}),Jo=I("base-clear",`
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
 `,[ho({originalTransform:"translateX(-50%) translateY(-50%)",left:"50%",top:"50%"})])])]),Yt=he({name:"BaseClear",props:{clsPrefix:{type:String,required:!0},show:Boolean,onClear:Function},setup(e){return vn("-base-clear",Jo,ue(e,"clsPrefix")),{handleMouseDown(o){o.preventDefault()}}},render(){const{clsPrefix:e}=this;return r("div",{class:`${e}-base-clear`},r(vo,null,{default:()=>{var o,n;return this.show?r("div",{key:"dismiss",class:`${e}-base-clear__clear`,onClick:this.onClear,onMousedown:this.handleMouseDown,"data-clear":!0},it(this.$slots.icon,()=>[r(st,{clsPrefix:e},{default:()=>r(qo,null)})])):r("div",{key:"icon",class:`${e}-base-clear__placeholder`},(n=(o=this.$slots).placeholder)===null||n===void 0?void 0:n.call(o))}}))}}),Qo=he({props:{onFocus:Function,onBlur:Function},setup(e){return()=>r("div",{style:"width: 0; height: 0",tabindex:0,onFocus:e.onFocus,onBlur:e.onBlur})}}),er={iconSizeTiny:"28px",iconSizeSmall:"34px",iconSizeMedium:"40px",iconSizeLarge:"46px",iconSizeHuge:"52px"};function tr(e){const{textColorDisabled:o,iconColor:n,textColor2:i,fontSizeTiny:d,fontSizeSmall:u,fontSizeMedium:f,fontSizeLarge:a,fontSizeHuge:h}=e;return Object.assign(Object.assign({},er),{fontSizeTiny:d,fontSizeSmall:u,fontSizeMedium:f,fontSizeLarge:a,fontSizeHuge:h,textColor:o,iconColor:n,extraTextColor:i})}const Rn={name:"Empty",common:mt,self:tr},nr=I("empty",`
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
 `)]),or=Object.assign(Object.assign({},ze.props),{description:String,showDescription:{type:Boolean,default:!0},showIcon:{type:Boolean,default:!0},size:{type:String,default:"medium"},renderIcon:Function}),rr=he({name:"Empty",props:or,slots:Object,setup(e){const{mergedClsPrefixRef:o,inlineThemeDisabled:n,mergedComponentPropsRef:i}=xt(e),d=ze("Empty","-empty",nr,Rn,e,o),{localeRef:u}=Xt("Empty"),f=$(()=>{var s,m,x;return(s=e.description)!==null&&s!==void 0?s:(x=(m=i?.value)===null||m===void 0?void 0:m.Empty)===null||x===void 0?void 0:x.description}),a=$(()=>{var s,m;return((m=(s=i?.value)===null||s===void 0?void 0:s.Empty)===null||m===void 0?void 0:m.renderIcon)||(()=>r(Yo,null))}),h=$(()=>{const{size:s}=e,{common:{cubicBezierEaseInOut:m},self:{[me("iconSize",s)]:x,[me("fontSize",s)]:F,textColor:S,iconColor:E,extraTextColor:W}}=d.value;return{"--n-icon-size":x,"--n-font-size":F,"--n-bezier":m,"--n-text-color":S,"--n-icon-color":E,"--n-extra-text-color":W}}),v=n?wt("empty",$(()=>{let s="";const{size:m}=e;return s+=m[0],s}),h,e):void 0;return{mergedClsPrefix:o,mergedRenderIcon:a,localizedDescription:$(()=>f.value||u.value.description),cssVars:n?void 0:h,themeClass:v?.themeClass,onRender:v?.onRender}},render(){const{$slots:e,mergedClsPrefix:o,onRender:n}=this;return n?.(),r("div",{class:[`${o}-empty`,this.themeClass],style:this.cssVars},this.showIcon?r("div",{class:`${o}-empty__icon`},e.icon?e.icon():r(st,{clsPrefix:o},{default:this.mergedRenderIcon})):null,this.showDescription?r("div",{class:`${o}-empty__description`},e.default?e.default():this.localizedDescription):null,e.extra?r("div",{class:`${o}-empty__extra`},e.extra()):null)}}),lr={height:"calc(var(--n-option-height) * 7.6)",paddingTiny:"4px 0",paddingSmall:"4px 0",paddingMedium:"4px 0",paddingLarge:"4px 0",paddingHuge:"4px 0",optionPaddingTiny:"0 12px",optionPaddingSmall:"0 12px",optionPaddingMedium:"0 12px",optionPaddingLarge:"0 12px",optionPaddingHuge:"0 12px",loadingSize:"18px"};function ir(e){const{borderRadius:o,popoverColor:n,textColor3:i,dividerColor:d,textColor2:u,primaryColorPressed:f,textColorDisabled:a,primaryColor:h,opacityDisabled:v,hoverColor:s,fontSizeTiny:m,fontSizeSmall:x,fontSizeMedium:F,fontSizeLarge:S,fontSizeHuge:E,heightTiny:W,heightSmall:_,heightMedium:T,heightLarge:k,heightHuge:A}=e;return Object.assign(Object.assign({},lr),{optionFontSizeTiny:m,optionFontSizeSmall:x,optionFontSizeMedium:F,optionFontSizeLarge:S,optionFontSizeHuge:E,optionHeightTiny:W,optionHeightSmall:_,optionHeightMedium:T,optionHeightLarge:k,optionHeightHuge:A,borderRadius:o,color:n,groupHeaderTextColor:i,actionDividerColor:d,optionTextColor:u,optionTextColorPressed:f,optionTextColorDisabled:a,optionTextColorActive:h,optionOpacityDisabled:v,optionCheckColor:h,optionColorPending:s,optionColorActive:"rgba(0, 0, 0, 0)",optionColorActivePending:s,actionTextColor:u,loadingColor:h})}const Fn=Zt({name:"InternalSelectMenu",common:mt,peers:{Scrollbar:po,Empty:Rn},self:ir}),dn=he({name:"NBaseSelectGroupHeader",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){const{renderLabelRef:e,renderOptionRef:o,labelFieldRef:n,nodePropsRef:i}=Ot(Jt);return{labelField:n,nodeProps:i,renderLabel:e,renderOption:o}},render(){const{clsPrefix:e,renderLabel:o,renderOption:n,nodeProps:i,tmNode:{rawNode:d}}=this,u=i?.(d),f=o?o(d,!1):rt(d[this.labelField],d,!1),a=r("div",Object.assign({},u,{class:[`${e}-base-select-group-header`,u?.class]}),f);return d.render?d.render({node:a,option:d}):n?n({node:a,option:d,selected:!1}):a}});function ar(e,o){return r(wn,{name:"fade-in-scale-up-transition"},{default:()=>e?r(st,{clsPrefix:o,class:`${o}-base-select-option__check`},{default:()=>r(Uo)}):null})}const cn=he({name:"NBaseSelectOption",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(e){const{valueRef:o,pendingTmNodeRef:n,multipleRef:i,valueSetRef:d,renderLabelRef:u,renderOptionRef:f,labelFieldRef:a,valueFieldRef:h,showCheckmarkRef:v,nodePropsRef:s,handleOptionClick:m,handleOptionMouseEnter:x}=Ot(Jt),F=_e(()=>{const{value:_}=n;return _?e.tmNode.key===_.key:!1});function S(_){const{tmNode:T}=e;T.disabled||m(_,T)}function E(_){const{tmNode:T}=e;T.disabled||x(_,T)}function W(_){const{tmNode:T}=e,{value:k}=F;T.disabled||k||x(_,T)}return{multiple:i,isGrouped:_e(()=>{const{tmNode:_}=e,{parent:T}=_;return T&&T.rawNode.type==="group"}),showCheckmark:v,nodeProps:s,isPending:F,isSelected:_e(()=>{const{value:_}=o,{value:T}=i;if(_===null)return!1;const k=e.tmNode.rawNode[h.value];if(T){const{value:A}=d;return A.has(k)}else return _===k}),labelField:a,renderLabel:u,renderOption:f,handleMouseMove:W,handleMouseEnter:E,handleClick:S}},render(){const{clsPrefix:e,tmNode:{rawNode:o},isSelected:n,isPending:i,isGrouped:d,showCheckmark:u,nodeProps:f,renderOption:a,renderLabel:h,handleClick:v,handleMouseEnter:s,handleMouseMove:m}=this,x=ar(n,e),F=h?[h(o,n),u&&x]:[rt(o[this.labelField],o,n),u&&x],S=f?.(o),E=r("div",Object.assign({},S,{class:[`${e}-base-select-option`,o.class,S?.class,{[`${e}-base-select-option--disabled`]:o.disabled,[`${e}-base-select-option--selected`]:n,[`${e}-base-select-option--grouped`]:d,[`${e}-base-select-option--pending`]:i,[`${e}-base-select-option--show-checkmark`]:u}],style:[S?.style||"",o.style||""],onClick:Ht([v,S?.onClick]),onMouseenter:Ht([s,S?.onMouseenter]),onMousemove:Ht([m,S?.onMousemove])}),r("div",{class:`${e}-base-select-option__content`},F));return o.render?o.render({node:E,option:o,selected:n}):a?a({node:E,option:o,selected:n}):E}}),sr=I("base-select-menu",`
 line-height: 1.5;
 outline: none;
 z-index: 0;
 position: relative;
 border-radius: var(--n-border-radius);
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-color);
`,[I("scrollbar",`
 max-height: var(--n-height);
 `),I("virtual-list",`
 max-height: var(--n-height);
 `),I("base-select-option",`
 min-height: var(--n-option-height);
 font-size: var(--n-option-font-size);
 display: flex;
 align-items: center;
 `,[y("content",`
 z-index: 1;
 white-space: nowrap;
 text-overflow: ellipsis;
 overflow: hidden;
 `)]),I("base-select-group-header",`
 min-height: var(--n-option-height);
 font-size: .93em;
 display: flex;
 align-items: center;
 `),I("base-select-menu-option-wrapper",`
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
 `),I("base-select-group-header",`
 position: relative;
 cursor: default;
 padding: var(--n-option-padding);
 color: var(--n-group-header-text-color);
 `),I("base-select-option",`
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
 `,[pn({enterScale:"0.5"})])])]),dr=he({name:"InternalSelectMenu",props:Object.assign(Object.assign({},ze.props),{clsPrefix:{type:String,required:!0},scrollable:{type:Boolean,default:!0},treeMate:{type:Object,required:!0},multiple:Boolean,size:{type:String,default:"medium"},value:{type:[String,Number,Array],default:null},autoPending:Boolean,virtualScroll:{type:Boolean,default:!0},show:{type:Boolean,default:!0},labelField:{type:String,default:"label"},valueField:{type:String,default:"value"},loading:Boolean,focusable:Boolean,renderLabel:Function,renderOption:Function,nodeProps:Function,showCheckmark:{type:Boolean,default:!0},onMousedown:Function,onScroll:Function,onFocus:Function,onBlur:Function,onKeyup:Function,onKeydown:Function,onTabOut:Function,onMouseenter:Function,onMouseleave:Function,onResize:Function,resetMenuOnOptionsChange:{type:Boolean,default:!0},inlineThemeDisabled:Boolean,onToggle:Function}),setup(e){const{mergedClsPrefixRef:o,mergedRtlRef:n}=xt(e),i=Qt("InternalSelectMenu",n,o),d=ze("InternalSelectMenu","-internal-select-menu",sr,Fn,e,ue(e,"clsPrefix")),u=P(null),f=P(null),a=P(null),h=$(()=>e.treeMate.getFlattenedNodes()),v=$(()=>go(h.value)),s=P(null);function m(){const{treeMate:b}=e;let C=null;const{value:j}=e;j===null?C=b.getFirstAvailableNode():(e.multiple?C=b.getNode((j||[])[(j||[]).length-1]):C=b.getNode(j),(!C||C.disabled)&&(C=b.getFirstAvailableNode())),R(C||null)}function x(){const{value:b}=s;b&&!e.treeMate.getNode(b.key)&&(s.value=null)}let F;Se(()=>e.show,b=>{b?F=Se(()=>e.treeMate,()=>{e.resetMenuOnOptionsChange?(e.autoPending?m():x(),bt(B)):x()},{immediate:!0}):F?.()},{immediate:!0}),xn(()=>{F?.()});const S=$(()=>Kt(d.value.self[me("optionHeight",e.size)])),E=$(()=>at(d.value.self[me("padding",e.size)])),W=$(()=>e.multiple&&Array.isArray(e.value)?new Set(e.value):new Set),_=$(()=>{const b=h.value;return b&&b.length===0});function T(b){const{onToggle:C}=e;C&&C(b)}function k(b){const{onScroll:C}=e;C&&C(b)}function A(b){var C;(C=a.value)===null||C===void 0||C.sync(),k(b)}function L(){var b;(b=a.value)===null||b===void 0||b.sync()}function le(){const{value:b}=s;return b||null}function N(b,C){C.disabled||R(C,!1)}function ie(b,C){C.disabled||T(C)}function te(b){var C;gt(b,"action")||(C=e.onKeyup)===null||C===void 0||C.call(e,b)}function ne(b){var C;gt(b,"action")||(C=e.onKeydown)===null||C===void 0||C.call(e,b)}function ae(b){var C;(C=e.onMousedown)===null||C===void 0||C.call(e,b),!e.focusable&&b.preventDefault()}function fe(){const{value:b}=s;b&&R(b.getNext({loop:!0}),!0)}function g(){const{value:b}=s;b&&R(b.getPrev({loop:!0}),!0)}function R(b,C=!1){s.value=b,C&&B()}function B(){var b,C;const j=s.value;if(!j)return;const ve=v.value(j.key);ve!==null&&(e.virtualScroll?(b=f.value)===null||b===void 0||b.scrollTo({index:ve}):(C=a.value)===null||C===void 0||C.scrollTo({index:ve,elSize:S.value}))}function q(b){var C,j;!((C=u.value)===null||C===void 0)&&C.contains(b.target)&&((j=e.onFocus)===null||j===void 0||j.call(e,b))}function X(b){var C,j;!((C=u.value)===null||C===void 0)&&C.contains(b.relatedTarget)||(j=e.onBlur)===null||j===void 0||j.call(e,b)}Tt(Jt,{handleOptionMouseEnter:N,handleOptionClick:ie,valueSetRef:W,pendingTmNodeRef:s,nodePropsRef:ue(e,"nodeProps"),showCheckmarkRef:ue(e,"showCheckmark"),multipleRef:ue(e,"multiple"),valueRef:ue(e,"value"),renderLabelRef:ue(e,"renderLabel"),renderOptionRef:ue(e,"renderOption"),labelFieldRef:ue(e,"labelField"),valueFieldRef:ue(e,"valueField")}),Tt(bo,u),dt(()=>{const{value:b}=a;b&&b.sync()});const G=$(()=>{const{size:b}=e,{common:{cubicBezierEaseInOut:C},self:{height:j,borderRadius:ve,color:$e,groupHeaderTextColor:Ae,actionDividerColor:xe,optionTextColorPressed:ge,optionTextColor:Ee,optionTextColorDisabled:we,optionTextColorActive:We,optionOpacityDisabled:Ve,optionCheckColor:He,actionTextColor:Ne,optionColorPending:Re,optionColorActive:Fe,loadingColor:ye,loadingSize:je,optionColorActivePending:Ke,[me("optionFontSize",b)]:Be,[me("optionHeight",b)]:Te,[me("optionPadding",b)]:pe}}=d.value;return{"--n-height":j,"--n-action-divider-color":xe,"--n-action-text-color":Ne,"--n-bezier":C,"--n-border-radius":ve,"--n-color":$e,"--n-option-font-size":Be,"--n-group-header-text-color":Ae,"--n-option-check-color":He,"--n-option-color-pending":Re,"--n-option-color-active":Fe,"--n-option-color-active-pending":Ke,"--n-option-height":Te,"--n-option-opacity-disabled":Ve,"--n-option-text-color":Ee,"--n-option-text-color-active":We,"--n-option-text-color-disabled":we,"--n-option-text-color-pressed":ge,"--n-option-padding":pe,"--n-option-padding-left":at(pe,"left"),"--n-option-padding-right":at(pe,"right"),"--n-loading-color":ye,"--n-loading-size":je}}),{inlineThemeDisabled:J}=e,U=J?wt("internal-select-menu",$(()=>e.size[0]),G,e):void 0,de={selfRef:u,next:fe,prev:g,getPendingTmNode:le};return zn(u,e.onResize),Object.assign({mergedTheme:d,mergedClsPrefix:o,rtlEnabled:i,virtualListRef:f,scrollbarRef:a,itemSize:S,padding:E,flattenedNodes:h,empty:_,virtualListContainer(){const{value:b}=f;return b?.listElRef},virtualListContent(){const{value:b}=f;return b?.itemsElRef},doScroll:k,handleFocusin:q,handleFocusout:X,handleKeyUp:te,handleKeyDown:ne,handleMouseDown:ae,handleVirtualListResize:L,handleVirtualListScroll:A,cssVars:J?void 0:G,themeClass:U?.themeClass,onRender:U?.onRender},de)},render(){const{$slots:e,virtualScroll:o,clsPrefix:n,mergedTheme:i,themeClass:d,onRender:u}=this;return u?.(),r("div",{ref:"selfRef",tabindex:this.focusable?0:-1,class:[`${n}-base-select-menu`,this.rtlEnabled&&`${n}-base-select-menu--rtl`,d,this.multiple&&`${n}-base-select-menu--multiple`],style:this.cssVars,onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onKeyup:this.handleKeyUp,onKeydown:this.handleKeyDown,onMousedown:this.handleMouseDown,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},lt(e.header,f=>f&&r("div",{class:`${n}-base-select-menu__header`,"data-header":!0,key:"header"},f)),this.loading?r("div",{class:`${n}-base-select-menu__loading`},r(gn,{clsPrefix:n,strokeWidth:20})):this.empty?r("div",{class:`${n}-base-select-menu__empty`,"data-empty":!0},it(e.empty,()=>[r(rr,{theme:i.peers.Empty,themeOverrides:i.peerOverrides.Empty,size:this.size})])):r(bn,{ref:"scrollbarRef",theme:i.peers.Scrollbar,themeOverrides:i.peerOverrides.Scrollbar,scrollable:this.scrollable,container:o?this.virtualListContainer:void 0,content:o?this.virtualListContent:void 0,onScroll:o?void 0:this.doScroll},{default:()=>o?r(Ho,{ref:"virtualListRef",class:`${n}-virtual-list`,items:this.flattenedNodes,itemSize:this.itemSize,showScrollbar:!1,paddingTop:this.padding.top,paddingBottom:this.padding.bottom,onResize:this.handleVirtualListResize,onScroll:this.handleVirtualListScroll,itemResizable:!0},{default:({item:f})=>f.isGroup?r(dn,{key:f.key,clsPrefix:n,tmNode:f}):f.ignored?null:r(cn,{clsPrefix:n,key:f.key,tmNode:f})}):r("div",{class:`${n}-base-select-menu-option-wrapper`,style:{paddingTop:this.padding.top,paddingBottom:this.padding.bottom}},this.flattenedNodes.map(f=>f.isGroup?r(dn,{key:f.key,clsPrefix:n,tmNode:f}):r(cn,{clsPrefix:n,key:f.key,tmNode:f})))}),lt(e.action,f=>f&&[r("div",{class:`${n}-base-select-menu__action`,"data-action":!0,key:"action"},f),r(Qo,{onFocus:this.onTabOut,key:"focus-detector"})]))}}),Tn=he({name:"InternalSelectionSuffix",props:{clsPrefix:{type:String,required:!0},showArrow:{type:Boolean,default:void 0},showClear:{type:Boolean,default:void 0},loading:{type:Boolean,default:!1},onClear:Function},setup(e,{slots:o}){return()=>{const{clsPrefix:n}=e;return r(gn,{clsPrefix:n,class:`${n}-base-suffix`,strokeWidth:24,scale:.85,show:e.loading},{default:()=>e.showArrow?r(Yt,{clsPrefix:n,show:e.showClear,onClear:e.onClear},{placeholder:()=>r(st,{clsPrefix:n,class:`${n}-base-suffix__arrow`},{default:()=>it(o.default,()=>[r(Go,null)])})}):null})}}}),cr={paddingSingle:"0 26px 0 12px",paddingMultiple:"3px 26px 0 12px",clearSize:"16px",arrowSize:"16px"};function ur(e){const{borderRadius:o,textColor2:n,textColorDisabled:i,inputColor:d,inputColorDisabled:u,primaryColor:f,primaryColorHover:a,warningColor:h,warningColorHover:v,errorColor:s,errorColorHover:m,borderColor:x,iconColor:F,iconColorDisabled:S,clearColor:E,clearColorHover:W,clearColorPressed:_,placeholderColor:T,placeholderColorDisabled:k,fontSizeTiny:A,fontSizeSmall:L,fontSizeMedium:le,fontSizeLarge:N,heightTiny:ie,heightSmall:te,heightMedium:ne,heightLarge:ae,fontWeight:fe}=e;return Object.assign(Object.assign({},cr),{fontSizeTiny:A,fontSizeSmall:L,fontSizeMedium:le,fontSizeLarge:N,heightTiny:ie,heightSmall:te,heightMedium:ne,heightLarge:ae,borderRadius:o,fontWeight:fe,textColor:n,textColorDisabled:i,placeholderColor:T,placeholderColorDisabled:k,color:d,colorDisabled:u,colorActive:d,border:`1px solid ${x}`,borderHover:`1px solid ${a}`,borderActive:`1px solid ${f}`,borderFocus:`1px solid ${a}`,boxShadowHover:"none",boxShadowActive:`0 0 0 2px ${Me(f,{alpha:.2})}`,boxShadowFocus:`0 0 0 2px ${Me(f,{alpha:.2})}`,caretColor:f,arrowColor:F,arrowColorDisabled:S,loadingColor:f,borderWarning:`1px solid ${h}`,borderHoverWarning:`1px solid ${v}`,borderActiveWarning:`1px solid ${h}`,borderFocusWarning:`1px solid ${v}`,boxShadowHoverWarning:"none",boxShadowActiveWarning:`0 0 0 2px ${Me(h,{alpha:.2})}`,boxShadowFocusWarning:`0 0 0 2px ${Me(h,{alpha:.2})}`,colorActiveWarning:d,caretColorWarning:h,borderError:`1px solid ${s}`,borderHoverError:`1px solid ${m}`,borderActiveError:`1px solid ${s}`,borderFocusError:`1px solid ${m}`,boxShadowHoverError:"none",boxShadowActiveError:`0 0 0 2px ${Me(s,{alpha:.2})}`,boxShadowFocusError:`0 0 0 2px ${Me(s,{alpha:.2})}`,colorActiveError:d,caretColorError:s,clearColor:E,clearColorHover:W,clearColorPressed:_})}const Pn=Zt({name:"InternalSelection",common:mt,peers:{Popover:mo},self:ur}),fr=ee([I("base-selection",`
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
 `,[I("base-loading",`
 color: var(--n-loading-color);
 `),I("base-selection-tags","min-height: var(--n-height);"),y("border, state-border",`
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
 `),I("base-suffix",`
 cursor: pointer;
 position: absolute;
 top: 50%;
 transform: translateY(-50%);
 right: 10px;
 `,[y("arrow",`
 font-size: var(--n-arrow-size);
 color: var(--n-arrow-color);
 transition: color .3s var(--n-bezier);
 `)]),I("base-selection-overlay",`
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
 `)]),I("base-selection-placeholder",`
 color: var(--n-placeholder-color);
 `,[y("inner",`
 max-width: 100%;
 overflow: hidden;
 `)]),I("base-selection-tags",`
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
 `),I("base-selection-label",`
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
 `,[I("base-selection-input",`
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
 `),I("base-selection-label","background-color: var(--n-color-active);"),I("base-selection-tags","background-color: var(--n-color-active);")])]),re("disabled","cursor: not-allowed;",[y("arrow",`
 color: var(--n-arrow-color-disabled);
 `),I("base-selection-label",`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `,[I("base-selection-input",`
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 `),y("render-label",`
 color: var(--n-text-color-disabled);
 `)]),I("base-selection-tags",`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `),I("base-selection-placeholder",`
 cursor: not-allowed;
 color: var(--n-placeholder-color-disabled);
 `)]),I("base-selection-input-tag",`
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
 `),I("base-selection-label",`background-color: var(--n-color-active-${e});`),I("base-selection-tags",`background-color: var(--n-color-active-${e});`)]),re("focus",[y("state-border",`
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))]),I("base-selection-popover",`
 margin-bottom: -3px;
 display: flex;
 flex-wrap: wrap;
 margin-right: -8px;
 `),I("base-selection-tag-wrapper",`
 max-width: 100%;
 display: inline-flex;
 padding: 0 7px 3px 0;
 `,[ee("&:last-child","padding-right: 0;"),I("tag",`
 font-size: 14px;
 max-width: 100%;
 `,[y("content",`
 line-height: 1.25;
 text-overflow: ellipsis;
 overflow: hidden;
 `)])])]),hr=he({name:"InternalSelection",props:Object.assign(Object.assign({},ze.props),{clsPrefix:{type:String,required:!0},bordered:{type:Boolean,default:void 0},active:Boolean,pattern:{type:String,default:""},placeholder:String,selectedOption:{type:Object,default:null},selectedOptions:{type:Array,default:null},labelField:{type:String,default:"label"},valueField:{type:String,default:"value"},multiple:Boolean,filterable:Boolean,clearable:Boolean,disabled:Boolean,size:{type:String,default:"medium"},loading:Boolean,autofocus:Boolean,showArrow:{type:Boolean,default:!0},inputProps:Object,focused:Boolean,renderTag:Function,onKeydown:Function,onClick:Function,onBlur:Function,onFocus:Function,onDeleteOption:Function,maxTagCount:[String,Number],ellipsisTagPopoverProps:Object,onClear:Function,onPatternInput:Function,onPatternFocus:Function,onPatternBlur:Function,renderLabel:Function,status:String,inlineThemeDisabled:Boolean,ignoreComposition:{type:Boolean,default:!0},onResize:Function}),setup(e){const{mergedClsPrefixRef:o,mergedRtlRef:n}=xt(e),i=Qt("InternalSelection",n,o),d=P(null),u=P(null),f=P(null),a=P(null),h=P(null),v=P(null),s=P(null),m=P(null),x=P(null),F=P(null),S=P(!1),E=P(!1),W=P(!1),_=ze("InternalSelection","-internal-selection",fr,Pn,e,ue(e,"clsPrefix")),T=$(()=>e.clearable&&!e.disabled&&(W.value||e.active)),k=$(()=>e.selectedOption?e.renderTag?e.renderTag({option:e.selectedOption,handleClose:()=>{}}):e.renderLabel?e.renderLabel(e.selectedOption,!0):rt(e.selectedOption[e.labelField],e.selectedOption,!0):e.placeholder),A=$(()=>{const p=e.selectedOption;if(p)return p[e.labelField]}),L=$(()=>e.multiple?!!(Array.isArray(e.selectedOptions)&&e.selectedOptions.length):e.selectedOption!==null);function le(){var p;const{value:z}=d;if(z){const{value:se}=u;se&&(se.style.width=`${z.offsetWidth}px`,e.maxTagCount!=="responsive"&&((p=x.value)===null||p===void 0||p.sync({showAllItemsBeforeCalculate:!1})))}}function N(){const{value:p}=F;p&&(p.style.display="none")}function ie(){const{value:p}=F;p&&(p.style.display="inline-block")}Se(ue(e,"active"),p=>{p||N()}),Se(ue(e,"pattern"),()=>{e.multiple&&bt(le)});function te(p){const{onFocus:z}=e;z&&z(p)}function ne(p){const{onBlur:z}=e;z&&z(p)}function ae(p){const{onDeleteOption:z}=e;z&&z(p)}function fe(p){const{onClear:z}=e;z&&z(p)}function g(p){const{onPatternInput:z}=e;z&&z(p)}function R(p){var z;(!p.relatedTarget||!(!((z=f.value)===null||z===void 0)&&z.contains(p.relatedTarget)))&&te(p)}function B(p){var z;!((z=f.value)===null||z===void 0)&&z.contains(p.relatedTarget)||ne(p)}function q(p){fe(p)}function X(){W.value=!0}function G(){W.value=!1}function J(p){!e.active||!e.filterable||p.target!==u.value&&p.preventDefault()}function U(p){ae(p)}const de=P(!1);function b(p){if(p.key==="Backspace"&&!de.value&&!e.pattern.length){const{selectedOptions:z}=e;z?.length&&U(z[z.length-1])}}let C=null;function j(p){const{value:z}=d;if(z){const se=p.target.value;z.textContent=se,le()}e.ignoreComposition&&de.value?C=p:g(p)}function ve(){de.value=!0}function $e(){de.value=!1,e.ignoreComposition&&g(C),C=null}function Ae(p){var z;E.value=!0,(z=e.onPatternFocus)===null||z===void 0||z.call(e,p)}function xe(p){var z;E.value=!1,(z=e.onPatternBlur)===null||z===void 0||z.call(e,p)}function ge(){var p,z;if(e.filterable)E.value=!1,(p=v.value)===null||p===void 0||p.blur(),(z=u.value)===null||z===void 0||z.blur();else if(e.multiple){const{value:se}=a;se?.blur()}else{const{value:se}=h;se?.blur()}}function Ee(){var p,z,se;e.filterable?(E.value=!1,(p=v.value)===null||p===void 0||p.focus()):e.multiple?(z=a.value)===null||z===void 0||z.focus():(se=h.value)===null||se===void 0||se.focus()}function we(){const{value:p}=u;p&&(ie(),p.focus())}function We(){const{value:p}=u;p&&p.blur()}function Ve(p){const{value:z}=s;z&&z.setTextContent(`+${p}`)}function He(){const{value:p}=m;return p}function Ne(){return u.value}let Re=null;function Fe(){Re!==null&&window.clearTimeout(Re)}function ye(){e.active||(Fe(),Re=window.setTimeout(()=>{L.value&&(S.value=!0)},100))}function je(){Fe()}function Ke(p){p||(Fe(),S.value=!1)}Se(L,p=>{p||(S.value=!1)}),dt(()=>{qt(()=>{const p=v.value;p&&(e.disabled?p.removeAttribute("tabindex"):p.tabIndex=E.value?-1:0)})}),zn(f,e.onResize);const{inlineThemeDisabled:Be}=e,Te=$(()=>{const{size:p}=e,{common:{cubicBezierEaseInOut:z},self:{fontWeight:se,borderRadius:ct,color:Ye,placeholderColor:Xe,textColor:Ze,paddingSingle:Je,paddingMultiple:ut,caretColor:ft,colorDisabled:Qe,textColorDisabled:Ce,placeholderColorDisabled:l,colorActive:w,boxShadowFocus:M,boxShadowActive:K,boxShadowHover:V,border:D,borderFocus:H,borderHover:ce,borderActive:be,arrowColor:It,arrowColorDisabled:yt,loadingColor:kt,colorActiveWarning:et,boxShadowFocusWarning:tt,boxShadowActiveWarning:Mt,boxShadowHoverWarning:_t,borderWarning:Ct,borderFocusWarning:Le,borderHoverWarning:t,borderActiveWarning:c,colorActiveError:O,boxShadowFocusError:Z,boxShadowActiveError:oe,boxShadowHoverError:Y,borderError:Pe,borderFocusError:Oe,borderHoverError:Ie,borderActiveError:Ue,clearColor:Ge,clearColorHover:ht,clearColorPressed:$t,clearSize:At,arrowSize:Et,[me("height",p)]:Bt,[me("fontSize",p)]:Lt}}=_.value,nt=at(Je),ot=at(ut);return{"--n-bezier":z,"--n-border":D,"--n-border-active":be,"--n-border-focus":H,"--n-border-hover":ce,"--n-border-radius":ct,"--n-box-shadow-active":K,"--n-box-shadow-focus":M,"--n-box-shadow-hover":V,"--n-caret-color":ft,"--n-color":Ye,"--n-color-active":w,"--n-color-disabled":Qe,"--n-font-size":Lt,"--n-height":Bt,"--n-padding-single-top":nt.top,"--n-padding-multiple-top":ot.top,"--n-padding-single-right":nt.right,"--n-padding-multiple-right":ot.right,"--n-padding-single-left":nt.left,"--n-padding-multiple-left":ot.left,"--n-padding-single-bottom":nt.bottom,"--n-padding-multiple-bottom":ot.bottom,"--n-placeholder-color":Xe,"--n-placeholder-color-disabled":l,"--n-text-color":Ze,"--n-text-color-disabled":Ce,"--n-arrow-color":It,"--n-arrow-color-disabled":yt,"--n-loading-color":kt,"--n-color-active-warning":et,"--n-box-shadow-focus-warning":tt,"--n-box-shadow-active-warning":Mt,"--n-box-shadow-hover-warning":_t,"--n-border-warning":Ct,"--n-border-focus-warning":Le,"--n-border-hover-warning":t,"--n-border-active-warning":c,"--n-color-active-error":O,"--n-box-shadow-focus-error":Z,"--n-box-shadow-active-error":oe,"--n-box-shadow-hover-error":Y,"--n-border-error":Pe,"--n-border-focus-error":Oe,"--n-border-hover-error":Ie,"--n-border-active-error":Ue,"--n-clear-size":At,"--n-clear-color":Ge,"--n-clear-color-hover":ht,"--n-clear-color-pressed":$t,"--n-arrow-size":Et,"--n-font-weight":se}}),pe=Be?wt("internal-selection",$(()=>e.size[0]),Te,e):void 0;return{mergedTheme:_,mergedClearable:T,mergedClsPrefix:o,rtlEnabled:i,patternInputFocused:E,filterablePlaceholder:k,label:A,selected:L,showTagsPanel:S,isComposing:de,counterRef:s,counterWrapperRef:m,patternInputMirrorRef:d,patternInputRef:u,selfRef:f,multipleElRef:a,singleElRef:h,patternInputWrapperRef:v,overflowRef:x,inputTagElRef:F,handleMouseDown:J,handleFocusin:R,handleClear:q,handleMouseEnter:X,handleMouseLeave:G,handleDeleteOption:U,handlePatternKeyDown:b,handlePatternInputInput:j,handlePatternInputBlur:xe,handlePatternInputFocus:Ae,handleMouseEnterCounter:ye,handleMouseLeaveCounter:je,handleFocusout:B,handleCompositionEnd:$e,handleCompositionStart:ve,onPopoverUpdateShow:Ke,focus:Ee,focusInput:we,blur:ge,blurInput:We,updateCounter:Ve,getCounter:He,getTail:Ne,renderLabel:e.renderLabel,cssVars:Be?void 0:Te,themeClass:pe?.themeClass,onRender:pe?.onRender}},render(){const{status:e,multiple:o,size:n,disabled:i,filterable:d,maxTagCount:u,bordered:f,clsPrefix:a,ellipsisTagPopoverProps:h,onRender:v,renderTag:s,renderLabel:m}=this;v?.();const x=u==="responsive",F=typeof u=="number",S=x||F,E=r(xo,null,{default:()=>r(Tn,{clsPrefix:a,loading:this.loading,showArrow:this.showArrow,showClear:this.mergedClearable&&this.selected,onClear:this.handleClear},{default:()=>{var _,T;return(T=(_=this.$slots).arrow)===null||T===void 0?void 0:T.call(_)}})});let W;if(o){const{labelField:_}=this,T=g=>r("div",{class:`${a}-base-selection-tag-wrapper`,key:g.value},s?s({option:g,handleClose:()=>{this.handleDeleteOption(g)}}):r(Wt,{size:n,closable:!g.disabled,disabled:i,onClose:()=>{this.handleDeleteOption(g)},internalCloseIsButtonTag:!1,internalCloseFocusable:!1},{default:()=>m?m(g,!0):rt(g[_],g,!0)})),k=()=>(F?this.selectedOptions.slice(0,u):this.selectedOptions).map(T),A=d?r("div",{class:`${a}-base-selection-input-tag`,ref:"inputTagElRef",key:"__input-tag__"},r("input",Object.assign({},this.inputProps,{ref:"patternInputRef",tabindex:-1,disabled:i,value:this.pattern,autofocus:this.autofocus,class:`${a}-base-selection-input-tag__input`,onBlur:this.handlePatternInputBlur,onFocus:this.handlePatternInputFocus,onKeydown:this.handlePatternKeyDown,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd})),r("span",{ref:"patternInputMirrorRef",class:`${a}-base-selection-input-tag__mirror`},this.pattern)):null,L=x?()=>r("div",{class:`${a}-base-selection-tag-wrapper`,ref:"counterWrapperRef"},r(Wt,{size:n,ref:"counterRef",onMouseenter:this.handleMouseEnterCounter,onMouseleave:this.handleMouseLeaveCounter,disabled:i})):void 0;let le;if(F){const g=this.selectedOptions.length-u;g>0&&(le=r("div",{class:`${a}-base-selection-tag-wrapper`,key:"__counter__"},r(Wt,{size:n,ref:"counterRef",onMouseenter:this.handleMouseEnterCounter,disabled:i},{default:()=>`+${g}`})))}const N=x?d?r(sn,{ref:"overflowRef",updateCounter:this.updateCounter,getCounter:this.getCounter,getTail:this.getTail,style:{width:"100%",display:"flex",overflow:"hidden"}},{default:k,counter:L,tail:()=>A}):r(sn,{ref:"overflowRef",updateCounter:this.updateCounter,getCounter:this.getCounter,style:{width:"100%",display:"flex",overflow:"hidden"}},{default:k,counter:L}):F&&le?k().concat(le):k(),ie=S?()=>r("div",{class:`${a}-base-selection-popover`},x?k():this.selectedOptions.map(T)):void 0,te=S?Object.assign({show:this.showTagsPanel,trigger:"hover",overlap:!0,placement:"top",width:"trigger",onUpdateShow:this.onPopoverUpdateShow,theme:this.mergedTheme.peers.Popover,themeOverrides:this.mergedTheme.peerOverrides.Popover},h):null,ae=(this.selected?!1:this.active?!this.pattern&&!this.isComposing:!0)?r("div",{class:`${a}-base-selection-placeholder ${a}-base-selection-overlay`},r("div",{class:`${a}-base-selection-placeholder__inner`},this.placeholder)):null,fe=d?r("div",{ref:"patternInputWrapperRef",class:`${a}-base-selection-tags`},N,x?null:A,E):r("div",{ref:"multipleElRef",class:`${a}-base-selection-tags`,tabindex:i?void 0:0},N,E);W=r(yn,null,S?r(wo,Object.assign({},te,{scrollable:!0,style:"max-height: calc(var(--v-target-height) * 6.6);"}),{trigger:()=>fe,default:ie}):fe,ae)}else if(d){const _=this.pattern||this.isComposing,T=this.active?!_:!this.selected,k=this.active?!1:this.selected;W=r("div",{ref:"patternInputWrapperRef",class:`${a}-base-selection-label`,title:this.patternInputFocused?void 0:en(this.label)},r("input",Object.assign({},this.inputProps,{ref:"patternInputRef",class:`${a}-base-selection-input`,value:this.active?this.pattern:"",placeholder:"",readonly:i,disabled:i,tabindex:-1,autofocus:this.autofocus,onFocus:this.handlePatternInputFocus,onBlur:this.handlePatternInputBlur,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd})),k?r("div",{class:`${a}-base-selection-label__render-label ${a}-base-selection-overlay`,key:"input"},r("div",{class:`${a}-base-selection-overlay__wrapper`},s?s({option:this.selectedOption,handleClose:()=>{}}):m?m(this.selectedOption,!0):rt(this.label,this.selectedOption,!0))):null,T?r("div",{class:`${a}-base-selection-placeholder ${a}-base-selection-overlay`,key:"placeholder"},r("div",{class:`${a}-base-selection-overlay__wrapper`},this.filterablePlaceholder)):null,E)}else W=r("div",{ref:"singleElRef",class:`${a}-base-selection-label`,tabindex:this.disabled?void 0:0},this.label!==void 0?r("div",{class:`${a}-base-selection-input`,title:en(this.label),key:"input"},r("div",{class:`${a}-base-selection-input__content`},s?s({option:this.selectedOption,handleClose:()=>{}}):m?m(this.selectedOption,!0):rt(this.label,this.selectedOption,!0))):r("div",{class:`${a}-base-selection-placeholder ${a}-base-selection-overlay`,key:"placeholder"},r("div",{class:`${a}-base-selection-placeholder__inner`},this.placeholder)),E);return r("div",{ref:"selfRef",class:[`${a}-base-selection`,this.rtlEnabled&&`${a}-base-selection--rtl`,this.themeClass,e&&`${a}-base-selection--${e}-status`,{[`${a}-base-selection--active`]:this.active,[`${a}-base-selection--selected`]:this.selected||this.active&&this.pattern,[`${a}-base-selection--disabled`]:this.disabled,[`${a}-base-selection--multiple`]:this.multiple,[`${a}-base-selection--focus`]:this.focused}],style:this.cssVars,onClick:this.onClick,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onKeydown:this.onKeydown,onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onMousedown:this.handleMouseDown},W,f?r("div",{class:`${a}-base-selection__border`}):null,f?r("div",{class:`${a}-base-selection__state-border`}):null)}}),vr={paddingTiny:"0 8px",paddingSmall:"0 10px",paddingMedium:"0 12px",paddingLarge:"0 14px",clearSize:"16px"};function pr(e){const{textColor2:o,textColor3:n,textColorDisabled:i,primaryColor:d,primaryColorHover:u,inputColor:f,inputColorDisabled:a,borderColor:h,warningColor:v,warningColorHover:s,errorColor:m,errorColorHover:x,borderRadius:F,lineHeight:S,fontSizeTiny:E,fontSizeSmall:W,fontSizeMedium:_,fontSizeLarge:T,heightTiny:k,heightSmall:A,heightMedium:L,heightLarge:le,actionColor:N,clearColor:ie,clearColorHover:te,clearColorPressed:ne,placeholderColor:ae,placeholderColorDisabled:fe,iconColor:g,iconColorDisabled:R,iconColorHover:B,iconColorPressed:q,fontWeight:X}=e;return Object.assign(Object.assign({},vr),{fontWeight:X,countTextColorDisabled:i,countTextColor:n,heightTiny:k,heightSmall:A,heightMedium:L,heightLarge:le,fontSizeTiny:E,fontSizeSmall:W,fontSizeMedium:_,fontSizeLarge:T,lineHeight:S,lineHeightTextarea:S,borderRadius:F,iconSize:"16px",groupLabelColor:N,groupLabelTextColor:o,textColor:o,textColorDisabled:i,textDecorationColor:o,caretColor:d,placeholderColor:ae,placeholderColorDisabled:fe,color:f,colorDisabled:a,colorFocus:f,groupLabelBorder:`1px solid ${h}`,border:`1px solid ${h}`,borderHover:`1px solid ${u}`,borderDisabled:`1px solid ${h}`,borderFocus:`1px solid ${u}`,boxShadowFocus:`0 0 0 2px ${Me(d,{alpha:.2})}`,loadingColor:d,loadingColorWarning:v,borderWarning:`1px solid ${v}`,borderHoverWarning:`1px solid ${s}`,colorFocusWarning:f,borderFocusWarning:`1px solid ${s}`,boxShadowFocusWarning:`0 0 0 2px ${Me(v,{alpha:.2})}`,caretColorWarning:v,loadingColorError:m,borderError:`1px solid ${m}`,borderHoverError:`1px solid ${x}`,colorFocusError:f,borderFocusError:`1px solid ${x}`,boxShadowFocusError:`0 0 0 2px ${Me(m,{alpha:.2})}`,caretColorError:m,clearColor:ie,clearColorHover:te,clearColorPressed:ne,iconColor:g,iconColorDisabled:R,iconColorHover:B,iconColorPressed:q,suffixTextColor:o})}const gr={name:"Input",common:mt,self:pr},On=yo("n-input"),br=I("input",`
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
 `)]),I("input-wrapper",`
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
 `),re("textarea","width: 100%;",[I("input-word-count",`
 position: absolute;
 right: var(--n-padding-right);
 bottom: var(--n-padding-vertical);
 `),re("resizable",[I("input-wrapper",`
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
 `,[I("icon",`
 color: var(--n-icon-color);
 `),I("base-icon",`
 color: var(--n-icon-color);
 `)])]),re("disabled",`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `,[y("border","border: var(--n-border-disabled);"),y("input-el, textarea-el",`
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 text-decoration-color: var(--n-text-color-disabled);
 `),y("placeholder","color: var(--n-placeholder-color-disabled);"),y("separator","color: var(--n-text-color-disabled);",[I("icon",`
 color: var(--n-icon-color-disabled);
 `),I("base-icon",`
 color: var(--n-icon-color-disabled);
 `)]),I("input-word-count",`
 color: var(--n-count-text-color-disabled);
 `),y("suffix, prefix","color: var(--n-text-color-disabled);",[I("icon",`
 color: var(--n-icon-color-disabled);
 `),I("internal-icon",`
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
 `,[I("base-loading",`
 font-size: var(--n-icon-size);
 margin: 0 2px;
 color: var(--n-loading-color);
 `),I("base-clear",`
 font-size: var(--n-icon-size);
 `,[y("placeholder",[I("base-icon",`
 transition: color .3s var(--n-bezier);
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 `)])]),ee(">",[I("icon",`
 transition: color .3s var(--n-bezier);
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 `)]),I("base-icon",`
 font-size: var(--n-icon-size);
 `)]),I("input-word-count",`
 pointer-events: none;
 line-height: 1.5;
 font-size: .85em;
 color: var(--n-count-text-color);
 transition: color .3s var(--n-bezier);
 margin-left: 4px;
 font-variant: tabular-nums;
 `),["warning","error"].map(e=>re(`${e}-status`,[De("disabled",[I("base-loading",`
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
 `)])])]))]),mr=I("input",[re("disabled",[y("input-el, textarea-el",`
 -webkit-text-fill-color: var(--n-text-color-disabled);
 `)])]);function xr(e){let o=0;for(const n of e)o++;return o}function zt(e){return e===""||e==null}function wr(e){const o=P(null);function n(){const{value:u}=e;if(!u?.focus){d();return}const{selectionStart:f,selectionEnd:a,value:h}=u;if(f==null||a==null){d();return}o.value={start:f,end:a,beforeText:h.slice(0,f),afterText:h.slice(a)}}function i(){var u;const{value:f}=o,{value:a}=e;if(!f||!a)return;const{value:h}=a,{start:v,beforeText:s,afterText:m}=f;let x=h.length;if(h.endsWith(m))x=h.length-m.length;else if(h.startsWith(s))x=s.length;else{const F=s[v-1],S=h.indexOf(F,v-1);S!==-1&&(x=S+1)}(u=a.setSelectionRange)===null||u===void 0||u.call(a,x,x)}function d(){o.value=null}return Se(e,d),{recordCursor:n,restoreCursor:i}}const un=he({name:"InputWordCount",setup(e,{slots:o}){const{mergedValueRef:n,maxlengthRef:i,mergedClsPrefixRef:d,countGraphemesRef:u}=Ot(On),f=$(()=>{const{value:a}=n;return a===null||Array.isArray(a)?0:(u.value||xr)(a)});return()=>{const{value:a}=i,{value:h}=n;return r("span",{class:`${d.value}-input-word-count`},Co(o.default,{value:h===null||Array.isArray(h)?"":h},()=>[a===void 0?f.value:`${f.value} / ${a}`]))}}}),yr=Object.assign(Object.assign({},ze.props),{bordered:{type:Boolean,default:void 0},type:{type:String,default:"text"},placeholder:[Array,String],defaultValue:{type:[String,Array],default:null},value:[String,Array],disabled:{type:Boolean,default:void 0},size:String,rows:{type:[Number,String],default:3},round:Boolean,minlength:[String,Number],maxlength:[String,Number],clearable:Boolean,autosize:{type:[Boolean,Object],default:!1},pair:Boolean,separator:String,readonly:{type:[String,Boolean],default:!1},passivelyActivated:Boolean,showPasswordOn:String,stateful:{type:Boolean,default:!0},autofocus:Boolean,inputProps:Object,resizable:{type:Boolean,default:!0},showCount:Boolean,loading:{type:Boolean,default:void 0},allowInput:Function,renderCount:Function,onMousedown:Function,onKeydown:Function,onKeyup:[Function,Array],onInput:[Function,Array],onFocus:[Function,Array],onBlur:[Function,Array],onClick:[Function,Array],onChange:[Function,Array],onClear:[Function,Array],countGraphemes:Function,status:String,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],textDecoration:[String,Array],attrSize:{type:Number,default:20},onInputBlur:[Function,Array],onInputFocus:[Function,Array],onDeactivate:[Function,Array],onActivate:[Function,Array],onWrapperFocus:[Function,Array],onWrapperBlur:[Function,Array],internalDeactivateOnEnter:Boolean,internalForceFocus:Boolean,internalLoadingBeforeSuffix:{type:Boolean,default:!0},showPasswordToggle:Boolean}),Dr=he({name:"Input",props:yr,slots:Object,setup(e){const{mergedClsPrefixRef:o,mergedBorderedRef:n,inlineThemeDisabled:i,mergedRtlRef:d}=xt(e),u=ze("Input","-input",br,gr,e,o);So&&vn("-input-safari",mr,o);const f=P(null),a=P(null),h=P(null),v=P(null),s=P(null),m=P(null),x=P(null),F=wr(x),S=P(null),{localeRef:E}=Xt("Input"),W=P(e.defaultValue),_=ue(e,"value"),T=Ut(_,W),k=mn(e),{mergedSizeRef:A,mergedDisabledRef:L,mergedStatusRef:le}=k,N=P(!1),ie=P(!1),te=P(!1),ne=P(!1);let ae=null;const fe=$(()=>{const{placeholder:t,pair:c}=e;return c?Array.isArray(t)?t:t===void 0?["",""]:[t,t]:t===void 0?[E.value.placeholder]:[t]}),g=$(()=>{const{value:t}=te,{value:c}=T,{value:O}=fe;return!t&&(zt(c)||Array.isArray(c)&&zt(c[0]))&&O[0]}),R=$(()=>{const{value:t}=te,{value:c}=T,{value:O}=fe;return!t&&O[1]&&(zt(c)||Array.isArray(c)&&zt(c[1]))}),B=_e(()=>e.internalForceFocus||N.value),q=_e(()=>{if(L.value||e.readonly||!e.clearable||!B.value&&!ie.value)return!1;const{value:t}=T,{value:c}=B;return e.pair?!!(Array.isArray(t)&&(t[0]||t[1]))&&(ie.value||c):!!t&&(ie.value||c)}),X=$(()=>{const{showPasswordOn:t}=e;if(t)return t;if(e.showPasswordToggle)return"click"}),G=P(!1),J=$(()=>{const{textDecoration:t}=e;return t?Array.isArray(t)?t.map(c=>({textDecoration:c})):[{textDecoration:t}]:["",""]}),U=P(void 0),de=()=>{var t,c;if(e.type==="textarea"){const{autosize:O}=e;if(O&&(U.value=(c=(t=S.value)===null||t===void 0?void 0:t.$el)===null||c===void 0?void 0:c.offsetWidth),!a.value||typeof O=="boolean")return;const{paddingTop:Z,paddingBottom:oe,lineHeight:Y}=window.getComputedStyle(a.value),Pe=Number(Z.slice(0,-2)),Oe=Number(oe.slice(0,-2)),Ie=Number(Y.slice(0,-2)),{value:Ue}=h;if(!Ue)return;if(O.minRows){const Ge=Math.max(O.minRows,1),ht=`${Pe+Oe+Ie*Ge}px`;Ue.style.minHeight=ht}if(O.maxRows){const Ge=`${Pe+Oe+Ie*O.maxRows}px`;Ue.style.maxHeight=Ge}}},b=$(()=>{const{maxlength:t}=e;return t===void 0?void 0:Number(t)});dt(()=>{const{value:t}=T;Array.isArray(t)||be(t)});const C=Ao().proxy;function j(t,c){const{onUpdateValue:O,"onUpdate:value":Z,onInput:oe}=e,{nTriggerFormInput:Y}=k;O&&Q(O,t,c),Z&&Q(Z,t,c),oe&&Q(oe,t,c),W.value=t,Y()}function ve(t,c){const{onChange:O}=e,{nTriggerFormChange:Z}=k;O&&Q(O,t,c),W.value=t,Z()}function $e(t){const{onBlur:c}=e,{nTriggerFormBlur:O}=k;c&&Q(c,t),O()}function Ae(t){const{onFocus:c}=e,{nTriggerFormFocus:O}=k;c&&Q(c,t),O()}function xe(t){const{onClear:c}=e;c&&Q(c,t)}function ge(t){const{onInputBlur:c}=e;c&&Q(c,t)}function Ee(t){const{onInputFocus:c}=e;c&&Q(c,t)}function we(){const{onDeactivate:t}=e;t&&Q(t)}function We(){const{onActivate:t}=e;t&&Q(t)}function Ve(t){const{onClick:c}=e;c&&Q(c,t)}function He(t){const{onWrapperFocus:c}=e;c&&Q(c,t)}function Ne(t){const{onWrapperBlur:c}=e;c&&Q(c,t)}function Re(){te.value=!0}function Fe(t){te.value=!1,t.target===m.value?ye(t,1):ye(t,0)}function ye(t,c=0,O="input"){const Z=t.target.value;if(be(Z),t instanceof InputEvent&&!t.isComposing&&(te.value=!1),e.type==="textarea"){const{value:Y}=S;Y&&Y.syncUnifiedContainer()}if(ae=Z,te.value)return;F.recordCursor();const oe=je(Z);if(oe)if(!e.pair)O==="input"?j(Z,{source:c}):ve(Z,{source:c});else{let{value:Y}=T;Array.isArray(Y)?Y=[Y[0],Y[1]]:Y=["",""],Y[c]=Z,O==="input"?j(Y,{source:c}):ve(Y,{source:c})}C.$forceUpdate(),oe||bt(F.restoreCursor)}function je(t){const{countGraphemes:c,maxlength:O,minlength:Z}=e;if(c){let Y;if(O!==void 0&&(Y===void 0&&(Y=c(t)),Y>Number(O))||Z!==void 0&&(Y===void 0&&(Y=c(t)),Y<Number(O)))return!1}const{allowInput:oe}=e;return typeof oe=="function"?oe(t):!0}function Ke(t){ge(t),t.relatedTarget===f.value&&we(),t.relatedTarget!==null&&(t.relatedTarget===s.value||t.relatedTarget===m.value||t.relatedTarget===a.value)||(ne.value=!1),p(t,"blur"),x.value=null}function Be(t,c){Ee(t),N.value=!0,ne.value=!0,We(),p(t,"focus"),c===0?x.value=s.value:c===1?x.value=m.value:c===2&&(x.value=a.value)}function Te(t){e.passivelyActivated&&(Ne(t),p(t,"blur"))}function pe(t){e.passivelyActivated&&(N.value=!0,He(t),p(t,"focus"))}function p(t,c){t.relatedTarget!==null&&(t.relatedTarget===s.value||t.relatedTarget===m.value||t.relatedTarget===a.value||t.relatedTarget===f.value)||(c==="focus"?(Ae(t),N.value=!0):c==="blur"&&($e(t),N.value=!1))}function z(t,c){ye(t,c,"change")}function se(t){Ve(t)}function ct(t){xe(t),Ye()}function Ye(){e.pair?(j(["",""],{source:"clear"}),ve(["",""],{source:"clear"})):(j("",{source:"clear"}),ve("",{source:"clear"}))}function Xe(t){const{onMousedown:c}=e;c&&c(t);const{tagName:O}=t.target;if(O!=="INPUT"&&O!=="TEXTAREA"){if(e.resizable){const{value:Z}=f;if(Z){const{left:oe,top:Y,width:Pe,height:Oe}=Z.getBoundingClientRect(),Ie=14;if(oe+Pe-Ie<t.clientX&&t.clientX<oe+Pe&&Y+Oe-Ie<t.clientY&&t.clientY<Y+Oe)return}}t.preventDefault(),N.value||M()}}function Ze(){var t;ie.value=!0,e.type==="textarea"&&((t=S.value)===null||t===void 0||t.handleMouseEnterWrapper())}function Je(){var t;ie.value=!1,e.type==="textarea"&&((t=S.value)===null||t===void 0||t.handleMouseLeaveWrapper())}function ut(){L.value||X.value==="click"&&(G.value=!G.value)}function ft(t){if(L.value)return;t.preventDefault();const c=Z=>{Z.preventDefault(),nn("mouseup",document,c)};if(tn("mouseup",document,c),X.value!=="mousedown")return;G.value=!0;const O=()=>{G.value=!1,nn("mouseup",document,O)};tn("mouseup",document,O)}function Qe(t){e.onKeyup&&Q(e.onKeyup,t)}function Ce(t){switch(e.onKeydown&&Q(e.onKeydown,t),t.key){case"Escape":w();break;case"Enter":l(t);break}}function l(t){var c,O;if(e.passivelyActivated){const{value:Z}=ne;if(Z){e.internalDeactivateOnEnter&&w();return}t.preventDefault(),e.type==="textarea"?(c=a.value)===null||c===void 0||c.focus():(O=s.value)===null||O===void 0||O.focus()}}function w(){e.passivelyActivated&&(ne.value=!1,bt(()=>{var t;(t=f.value)===null||t===void 0||t.focus()}))}function M(){var t,c,O;L.value||(e.passivelyActivated?(t=f.value)===null||t===void 0||t.focus():((c=a.value)===null||c===void 0||c.focus(),(O=s.value)===null||O===void 0||O.focus()))}function K(){var t;!((t=f.value)===null||t===void 0)&&t.contains(document.activeElement)&&document.activeElement.blur()}function V(){var t,c;(t=a.value)===null||t===void 0||t.select(),(c=s.value)===null||c===void 0||c.select()}function D(){L.value||(a.value?a.value.focus():s.value&&s.value.focus())}function H(){const{value:t}=f;t?.contains(document.activeElement)&&t!==document.activeElement&&w()}function ce(t){if(e.type==="textarea"){const{value:c}=a;c?.scrollTo(t)}else{const{value:c}=s;c?.scrollTo(t)}}function be(t){const{type:c,pair:O,autosize:Z}=e;if(!O&&Z)if(c==="textarea"){const{value:oe}=h;oe&&(oe.textContent=`${t??""}\r
`)}else{const{value:oe}=v;oe&&(t?oe.textContent=t:oe.innerHTML="&nbsp;")}}function It(){de()}const yt=P({top:"0"});function kt(t){var c;const{scrollTop:O}=t.target;yt.value.top=`${-O}px`,(c=S.value)===null||c===void 0||c.syncUnifiedContainer()}let et=null;qt(()=>{const{autosize:t,type:c}=e;t&&c==="textarea"?et=Se(T,O=>{!Array.isArray(O)&&O!==ae&&be(O)}):et?.()});let tt=null;qt(()=>{e.type==="textarea"?tt=Se(T,t=>{var c;!Array.isArray(t)&&t!==ae&&((c=S.value)===null||c===void 0||c.syncUnifiedContainer())}):tt?.()}),Tt(On,{mergedValueRef:T,maxlengthRef:b,mergedClsPrefixRef:o,countGraphemesRef:ue(e,"countGraphemes")});const Mt={wrapperElRef:f,inputElRef:s,textareaElRef:a,isCompositing:te,clear:Ye,focus:M,blur:K,select:V,deactivate:H,activate:D,scrollTo:ce},_t=Qt("Input",d,o),Ct=$(()=>{const{value:t}=A,{common:{cubicBezierEaseInOut:c},self:{color:O,borderRadius:Z,textColor:oe,caretColor:Y,caretColorError:Pe,caretColorWarning:Oe,textDecorationColor:Ie,border:Ue,borderDisabled:Ge,borderHover:ht,borderFocus:$t,placeholderColor:At,placeholderColorDisabled:Et,lineHeightTextarea:Bt,colorDisabled:Lt,colorFocus:nt,textColorDisabled:ot,boxShadowFocus:Mn,iconSize:_n,colorFocusWarning:$n,boxShadowFocusWarning:An,borderWarning:En,borderFocusWarning:Bn,borderHoverWarning:Ln,colorFocusError:Dn,boxShadowFocusError:Wn,borderError:Vn,borderFocusError:Hn,borderHoverError:Nn,clearSize:jn,clearColor:Kn,clearColorHover:Un,clearColorPressed:Gn,iconColor:qn,iconColorDisabled:Yn,suffixTextColor:Xn,countTextColor:Zn,countTextColorDisabled:Jn,iconColorHover:Qn,iconColorPressed:eo,loadingColor:to,loadingColorError:no,loadingColorWarning:oo,fontWeight:ro,[me("padding",t)]:lo,[me("fontSize",t)]:io,[me("height",t)]:ao}}=u.value,{left:so,right:co}=at(lo);return{"--n-bezier":c,"--n-count-text-color":Zn,"--n-count-text-color-disabled":Jn,"--n-color":O,"--n-font-size":io,"--n-font-weight":ro,"--n-border-radius":Z,"--n-height":ao,"--n-padding-left":so,"--n-padding-right":co,"--n-text-color":oe,"--n-caret-color":Y,"--n-text-decoration-color":Ie,"--n-border":Ue,"--n-border-disabled":Ge,"--n-border-hover":ht,"--n-border-focus":$t,"--n-placeholder-color":At,"--n-placeholder-color-disabled":Et,"--n-icon-size":_n,"--n-line-height-textarea":Bt,"--n-color-disabled":Lt,"--n-color-focus":nt,"--n-text-color-disabled":ot,"--n-box-shadow-focus":Mn,"--n-loading-color":to,"--n-caret-color-warning":Oe,"--n-color-focus-warning":$n,"--n-box-shadow-focus-warning":An,"--n-border-warning":En,"--n-border-focus-warning":Bn,"--n-border-hover-warning":Ln,"--n-loading-color-warning":oo,"--n-caret-color-error":Pe,"--n-color-focus-error":Dn,"--n-box-shadow-focus-error":Wn,"--n-border-error":Vn,"--n-border-focus-error":Hn,"--n-border-hover-error":Nn,"--n-loading-color-error":no,"--n-clear-color":Kn,"--n-clear-size":jn,"--n-clear-color-hover":Un,"--n-clear-color-pressed":Gn,"--n-icon-color":qn,"--n-icon-color-hover":Qn,"--n-icon-color-pressed":eo,"--n-icon-color-disabled":Yn,"--n-suffix-text-color":Xn}}),Le=i?wt("input",$(()=>{const{value:t}=A;return t[0]}),Ct,e):void 0;return Object.assign(Object.assign({},Mt),{wrapperElRef:f,inputElRef:s,inputMirrorElRef:v,inputEl2Ref:m,textareaElRef:a,textareaMirrorElRef:h,textareaScrollbarInstRef:S,rtlEnabled:_t,uncontrolledValue:W,mergedValue:T,passwordVisible:G,mergedPlaceholder:fe,showPlaceholder1:g,showPlaceholder2:R,mergedFocus:B,isComposing:te,activated:ne,showClearButton:q,mergedSize:A,mergedDisabled:L,textDecorationStyle:J,mergedClsPrefix:o,mergedBordered:n,mergedShowPasswordOn:X,placeholderStyle:yt,mergedStatus:le,textAreaScrollContainerWidth:U,handleTextAreaScroll:kt,handleCompositionStart:Re,handleCompositionEnd:Fe,handleInput:ye,handleInputBlur:Ke,handleInputFocus:Be,handleWrapperBlur:Te,handleWrapperFocus:pe,handleMouseEnter:Ze,handleMouseLeave:Je,handleMouseDown:Xe,handleChange:z,handleClick:se,handleClear:ct,handlePasswordToggleClick:ut,handlePasswordToggleMousedown:ft,handleWrapperKeydown:Ce,handleWrapperKeyup:Qe,handleTextAreaMirrorResize:It,getTextareaScrollContainer:()=>a.value,mergedTheme:u,cssVars:i?void 0:Ct,themeClass:Le?.themeClass,onRender:Le?.onRender})},render(){var e,o;const{mergedClsPrefix:n,mergedStatus:i,themeClass:d,type:u,countGraphemes:f,onRender:a}=this,h=this.$slots;return a?.(),r("div",{ref:"wrapperElRef",class:[`${n}-input`,d,i&&`${n}-input--${i}-status`,{[`${n}-input--rtl`]:this.rtlEnabled,[`${n}-input--disabled`]:this.mergedDisabled,[`${n}-input--textarea`]:u==="textarea",[`${n}-input--resizable`]:this.resizable&&!this.autosize,[`${n}-input--autosize`]:this.autosize,[`${n}-input--round`]:this.round&&u!=="textarea",[`${n}-input--pair`]:this.pair,[`${n}-input--focus`]:this.mergedFocus,[`${n}-input--stateful`]:this.stateful}],style:this.cssVars,tabindex:!this.mergedDisabled&&this.passivelyActivated&&!this.activated?0:void 0,onFocus:this.handleWrapperFocus,onBlur:this.handleWrapperBlur,onClick:this.handleClick,onMousedown:this.handleMouseDown,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd,onKeyup:this.handleWrapperKeyup,onKeydown:this.handleWrapperKeydown},r("div",{class:`${n}-input-wrapper`},lt(h.prefix,v=>v&&r("div",{class:`${n}-input__prefix`},v)),u==="textarea"?r(bn,{ref:"textareaScrollbarInstRef",class:`${n}-input__textarea`,container:this.getTextareaScrollContainer,triggerDisplayManually:!0,useUnifiedContainer:!0,internalHoistYRail:!0},{default:()=>{var v,s;const{textAreaScrollContainerWidth:m}=this,x={width:this.autosize&&m&&`${m}px`};return r(yn,null,r("textarea",Object.assign({},this.inputProps,{ref:"textareaElRef",class:[`${n}-input__textarea-el`,(v=this.inputProps)===null||v===void 0?void 0:v.class],autofocus:this.autofocus,rows:Number(this.rows),placeholder:this.placeholder,value:this.mergedValue,disabled:this.mergedDisabled,maxlength:f?void 0:this.maxlength,minlength:f?void 0:this.minlength,readonly:this.readonly,tabindex:this.passivelyActivated&&!this.activated?-1:void 0,style:[this.textDecorationStyle[0],(s=this.inputProps)===null||s===void 0?void 0:s.style,x],onBlur:this.handleInputBlur,onFocus:F=>{this.handleInputFocus(F,2)},onInput:this.handleInput,onChange:this.handleChange,onScroll:this.handleTextAreaScroll})),this.showPlaceholder1?r("div",{class:`${n}-input__placeholder`,style:[this.placeholderStyle,x],key:"placeholder"},this.mergedPlaceholder[0]):null,this.autosize?r(jt,{onResize:this.handleTextAreaMirrorResize},{default:()=>r("div",{ref:"textareaMirrorElRef",class:`${n}-input__textarea-mirror`,key:"mirror"})}):null)}}):r("div",{class:`${n}-input__input`},r("input",Object.assign({type:u==="password"&&this.mergedShowPasswordOn&&this.passwordVisible?"text":u},this.inputProps,{ref:"inputElRef",class:[`${n}-input__input-el`,(e=this.inputProps)===null||e===void 0?void 0:e.class],style:[this.textDecorationStyle[0],(o=this.inputProps)===null||o===void 0?void 0:o.style],tabindex:this.passivelyActivated&&!this.activated?-1:void 0,placeholder:this.mergedPlaceholder[0],disabled:this.mergedDisabled,maxlength:f?void 0:this.maxlength,minlength:f?void 0:this.minlength,value:Array.isArray(this.mergedValue)?this.mergedValue[0]:this.mergedValue,readonly:this.readonly,autofocus:this.autofocus,size:this.attrSize,onBlur:this.handleInputBlur,onFocus:v=>{this.handleInputFocus(v,0)},onInput:v=>{this.handleInput(v,0)},onChange:v=>{this.handleChange(v,0)}})),this.showPlaceholder1?r("div",{class:`${n}-input__placeholder`},r("span",null,this.mergedPlaceholder[0])):null,this.autosize?r("div",{class:`${n}-input__input-mirror`,key:"mirror",ref:"inputMirrorElRef"}," "):null),!this.pair&&lt(h.suffix,v=>v||this.clearable||this.showCount||this.mergedShowPasswordOn||this.loading!==void 0?r("div",{class:`${n}-input__suffix`},[lt(h["clear-icon-placeholder"],s=>(this.clearable||s)&&r(Yt,{clsPrefix:n,show:this.showClearButton,onClear:this.handleClear},{placeholder:()=>s,icon:()=>{var m,x;return(x=(m=this.$slots)["clear-icon"])===null||x===void 0?void 0:x.call(m)}})),this.internalLoadingBeforeSuffix?null:v,this.loading!==void 0?r(Tn,{clsPrefix:n,loading:this.loading,showArrow:!1,showClear:!1,style:this.cssVars}):null,this.internalLoadingBeforeSuffix?v:null,this.showCount&&this.type!=="textarea"?r(un,null,{default:s=>{var m;const{renderCount:x}=this;return x?x(s):(m=h.count)===null||m===void 0?void 0:m.call(h,s)}}):null,this.mergedShowPasswordOn&&this.type==="password"?r("div",{class:`${n}-input__eye`,onMousedown:this.handlePasswordToggleMousedown,onClick:this.handlePasswordToggleClick},this.passwordVisible?it(h["password-visible-icon"],()=>[r(st,{clsPrefix:n},{default:()=>r(Xo,null)})]):it(h["password-invisible-icon"],()=>[r(st,{clsPrefix:n},{default:()=>r(Zo,null)})])):null]):null)),this.pair?r("span",{class:`${n}-input__separator`},it(h.separator,()=>[this.separator])):null,this.pair?r("div",{class:`${n}-input-wrapper`},r("div",{class:`${n}-input__input`},r("input",{ref:"inputEl2Ref",type:this.type,class:`${n}-input__input-el`,tabindex:this.passivelyActivated&&!this.activated?-1:void 0,placeholder:this.mergedPlaceholder[1],disabled:this.mergedDisabled,maxlength:f?void 0:this.maxlength,minlength:f?void 0:this.minlength,value:Array.isArray(this.mergedValue)?this.mergedValue[1]:void 0,readonly:this.readonly,style:this.textDecorationStyle[1],onBlur:this.handleInputBlur,onFocus:v=>{this.handleInputFocus(v,1)},onInput:v=>{this.handleInput(v,1)},onChange:v=>{this.handleChange(v,1)}}),this.showPlaceholder2?r("div",{class:`${n}-input__placeholder`},r("span",null,this.mergedPlaceholder[1])):null),lt(h.suffix,v=>(this.clearable||v)&&r("div",{class:`${n}-input__suffix`},[this.clearable&&r(Yt,{clsPrefix:n,show:this.showClearButton,onClear:this.handleClear},{icon:()=>{var s;return(s=h["clear-icon"])===null||s===void 0?void 0:s.call(h)},placeholder:()=>{var s;return(s=h["clear-icon-placeholder"])===null||s===void 0?void 0:s.call(h)}}),v]))):null,this.mergedBordered?r("div",{class:`${n}-input__border`}):null,this.mergedBordered?r("div",{class:`${n}-input__state-border`}):null,this.showCount&&u==="textarea"?r(un,null,{default:v=>{var s;const{renderCount:m}=this;return m?m(v):(s=h.count)===null||s===void 0?void 0:s.call(h,v)}}):null)}});function Pt(e){return e.type==="group"}function In(e){return e.type==="ignored"}function Nt(e,o){try{return!!(1+o.toString().toLowerCase().indexOf(e.trim().toLowerCase()))}catch{return!1}}function Cr(e,o){return{getIsGroup:Pt,getIgnored:In,getKey(i){return Pt(i)?i.name||i.key||"key-required":i[e]},getChildren(i){return i[o]}}}function Sr(e,o,n,i){if(!o)return e;function d(u){if(!Array.isArray(u))return[];const f=[];for(const a of u)if(Pt(a)){const h=d(a[i]);h.length&&f.push(Object.assign({},a,{[i]:h}))}else{if(In(a))continue;o(n,a)&&f.push(a)}return f}return d(e)}function zr(e,o,n){const i=new Map;return e.forEach(d=>{Pt(d)?d[n].forEach(u=>{i.set(u[o],u)}):i.set(d[o],d)}),i}function Rr(e){const{boxShadow2:o}=e;return{menuBoxShadow:o}}const Fr=Zt({name:"Select",common:mt,peers:{InternalSelection:Pn,InternalSelectMenu:Fn},self:Rr}),Tr=ee([I("select",`
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 font-weight: var(--n-font-weight);
 `),I("select-menu",`
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `,[pn({originalTransition:"background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)"})])]),Pr=Object.assign(Object.assign({},ze.props),{to:Gt.propTo,bordered:{type:Boolean,default:void 0},clearable:Boolean,clearFilterAfterSelect:{type:Boolean,default:!0},options:{type:Array,default:()=>[]},defaultValue:{type:[String,Number,Array],default:null},keyboard:{type:Boolean,default:!0},value:[String,Number,Array],placeholder:String,menuProps:Object,multiple:Boolean,size:String,menuSize:{type:String},filterable:Boolean,disabled:{type:Boolean,default:void 0},remote:Boolean,loading:Boolean,filter:Function,placement:{type:String,default:"bottom-start"},widthMode:{type:String,default:"trigger"},tag:Boolean,onCreate:Function,fallbackOption:{type:[Function,Boolean],default:void 0},show:{type:Boolean,default:void 0},showArrow:{type:Boolean,default:!0},maxTagCount:[Number,String],ellipsisTagPopoverProps:Object,consistentMenuWidth:{type:Boolean,default:!0},virtualScroll:{type:Boolean,default:!0},labelField:{type:String,default:"label"},valueField:{type:String,default:"value"},childrenField:{type:String,default:"children"},renderLabel:Function,renderOption:Function,renderTag:Function,"onUpdate:value":[Function,Array],inputProps:Object,nodeProps:Function,ignoreComposition:{type:Boolean,default:!0},showOnFocus:Boolean,onUpdateValue:[Function,Array],onBlur:[Function,Array],onClear:[Function,Array],onFocus:[Function,Array],onScroll:[Function,Array],onSearch:[Function,Array],onUpdateShow:[Function,Array],"onUpdate:show":[Function,Array],displayDirective:{type:String,default:"show"},resetMenuOnOptionsChange:{type:Boolean,default:!0},status:String,showCheckmark:{type:Boolean,default:!0},onChange:[Function,Array],items:Array}),Wr=he({name:"Select",props:Pr,slots:Object,setup(e){const{mergedClsPrefixRef:o,mergedBorderedRef:n,namespaceRef:i,inlineThemeDisabled:d}=xt(e),u=ze("Select","-select",Tr,Fr,e,o),f=P(e.defaultValue),a=ue(e,"value"),h=Ut(a,f),v=P(!1),s=P(""),m=To(e,["items","options"]),x=P([]),F=P([]),S=$(()=>F.value.concat(x.value).concat(m.value)),E=$(()=>{const{filter:l}=e;if(l)return l;const{labelField:w,valueField:M}=e;return(K,V)=>{if(!V)return!1;const D=V[w];if(typeof D=="string")return Nt(K,D);const H=V[M];return typeof H=="string"?Nt(K,H):typeof H=="number"?Nt(K,String(H)):!1}}),W=$(()=>{if(e.remote)return m.value;{const{value:l}=S,{value:w}=s;return!w.length||!e.filterable?l:Sr(l,E.value,w,e.childrenField)}}),_=$(()=>{const{valueField:l,childrenField:w}=e,M=Cr(l,w);return Po(W.value,M)}),T=$(()=>zr(S.value,e.valueField,e.childrenField)),k=P(!1),A=Ut(ue(e,"show"),k),L=P(null),le=P(null),N=P(null),{localeRef:ie}=Xt("Select"),te=$(()=>{var l;return(l=e.placeholder)!==null&&l!==void 0?l:ie.value.placeholder}),ne=[],ae=P(new Map),fe=$(()=>{const{fallbackOption:l}=e;if(l===void 0){const{labelField:w,valueField:M}=e;return K=>({[w]:String(K),[M]:K})}return l===!1?!1:w=>Object.assign(l(w),{value:w})});function g(l){const w=e.remote,{value:M}=ae,{value:K}=T,{value:V}=fe,D=[];return l.forEach(H=>{if(K.has(H))D.push(K.get(H));else if(w&&M.has(H))D.push(M.get(H));else if(V){const ce=V(H);ce&&D.push(ce)}}),D}const R=$(()=>{if(e.multiple){const{value:l}=h;return Array.isArray(l)?g(l):[]}return null}),B=$(()=>{const{value:l}=h;return!e.multiple&&!Array.isArray(l)?l===null?null:g([l])[0]||null:null}),q=mn(e),{mergedSizeRef:X,mergedDisabledRef:G,mergedStatusRef:J}=q;function U(l,w){const{onChange:M,"onUpdate:value":K,onUpdateValue:V}=e,{nTriggerFormChange:D,nTriggerFormInput:H}=q;M&&Q(M,l,w),V&&Q(V,l,w),K&&Q(K,l,w),f.value=l,D(),H()}function de(l){const{onBlur:w}=e,{nTriggerFormBlur:M}=q;w&&Q(w,l),M()}function b(){const{onClear:l}=e;l&&Q(l)}function C(l){const{onFocus:w,showOnFocus:M}=e,{nTriggerFormFocus:K}=q;w&&Q(w,l),K(),M&&xe()}function j(l){const{onSearch:w}=e;w&&Q(w,l)}function ve(l){const{onScroll:w}=e;w&&Q(w,l)}function $e(){var l;const{remote:w,multiple:M}=e;if(w){const{value:K}=ae;if(M){const{valueField:V}=e;(l=R.value)===null||l===void 0||l.forEach(D=>{K.set(D[V],D)})}else{const V=B.value;V&&K.set(V[e.valueField],V)}}}function Ae(l){const{onUpdateShow:w,"onUpdate:show":M}=e;w&&Q(w,l),M&&Q(M,l),k.value=l}function xe(){G.value||(Ae(!0),k.value=!0,e.filterable&&Je())}function ge(){Ae(!1)}function Ee(){s.value="",F.value=ne}const we=P(!1);function We(){e.filterable&&(we.value=!0)}function Ve(){e.filterable&&(we.value=!1,A.value||Ee())}function He(){G.value||(A.value?e.filterable?Je():ge():xe())}function Ne(l){var w,M;!((M=(w=N.value)===null||w===void 0?void 0:w.selfRef)===null||M===void 0)&&M.contains(l.relatedTarget)||(v.value=!1,de(l),ge())}function Re(l){C(l),v.value=!0}function Fe(){v.value=!0}function ye(l){var w;!((w=L.value)===null||w===void 0)&&w.$el.contains(l.relatedTarget)||(v.value=!1,de(l),ge())}function je(){var l;(l=L.value)===null||l===void 0||l.focus(),ge()}function Ke(l){var w;A.value&&(!((w=L.value)===null||w===void 0)&&w.$el.contains(Io(l))||ge())}function Be(l){if(!Array.isArray(l))return[];if(fe.value)return Array.from(l);{const{remote:w}=e,{value:M}=T;if(w){const{value:K}=ae;return l.filter(V=>M.has(V)||K.has(V))}else return l.filter(K=>M.has(K))}}function Te(l){pe(l.rawNode)}function pe(l){if(G.value)return;const{tag:w,remote:M,clearFilterAfterSelect:K,valueField:V}=e;if(w&&!M){const{value:D}=F,H=D[0]||null;if(H){const ce=x.value;ce.length?ce.push(H):x.value=[H],F.value=ne}}if(M&&ae.value.set(l[V],l),e.multiple){const D=Be(h.value),H=D.findIndex(ce=>ce===l[V]);if(~H){if(D.splice(H,1),w&&!M){const ce=p(l[V]);~ce&&(x.value.splice(ce,1),K&&(s.value=""))}}else D.push(l[V]),K&&(s.value="");U(D,g(D))}else{if(w&&!M){const D=p(l[V]);~D?x.value=[x.value[D]]:x.value=ne}Ze(),ge(),U(l[V],l)}}function p(l){return x.value.findIndex(M=>M[e.valueField]===l)}function z(l){A.value||xe();const{value:w}=l.target;s.value=w;const{tag:M,remote:K}=e;if(j(w),M&&!K){if(!w){F.value=ne;return}const{onCreate:V}=e,D=V?V(w):{[e.labelField]:w,[e.valueField]:w},{valueField:H,labelField:ce}=e;m.value.some(be=>be[H]===D[H]||be[ce]===D[ce])||x.value.some(be=>be[H]===D[H]||be[ce]===D[ce])?F.value=ne:F.value=[D]}}function se(l){l.stopPropagation();const{multiple:w}=e;!w&&e.filterable&&ge(),b(),w?U([],[]):U(null,null)}function ct(l){!gt(l,"action")&&!gt(l,"empty")&&!gt(l,"header")&&l.preventDefault()}function Ye(l){ve(l)}function Xe(l){var w,M,K,V,D;if(!e.keyboard){l.preventDefault();return}switch(l.key){case" ":if(e.filterable)break;l.preventDefault();case"Enter":if(!(!((w=L.value)===null||w===void 0)&&w.isComposing)){if(A.value){const H=(M=N.value)===null||M===void 0?void 0:M.getPendingTmNode();H?Te(H):e.filterable||(ge(),Ze())}else if(xe(),e.tag&&we.value){const H=F.value[0];if(H){const ce=H[e.valueField],{value:be}=h;e.multiple&&Array.isArray(be)&&be.includes(ce)||pe(H)}}}l.preventDefault();break;case"ArrowUp":if(l.preventDefault(),e.loading)return;A.value&&((K=N.value)===null||K===void 0||K.prev());break;case"ArrowDown":if(l.preventDefault(),e.loading)return;A.value?(V=N.value)===null||V===void 0||V.next():xe();break;case"Escape":A.value&&(Ko(l),ge()),(D=L.value)===null||D===void 0||D.focus();break}}function Ze(){var l;(l=L.value)===null||l===void 0||l.focus()}function Je(){var l;(l=L.value)===null||l===void 0||l.focusInput()}function ut(){var l;A.value&&((l=le.value)===null||l===void 0||l.syncPosition())}$e(),Se(ue(e,"options"),$e);const ft={focus:()=>{var l;(l=L.value)===null||l===void 0||l.focus()},focusInput:()=>{var l;(l=L.value)===null||l===void 0||l.focusInput()},blur:()=>{var l;(l=L.value)===null||l===void 0||l.blur()},blurInput:()=>{var l;(l=L.value)===null||l===void 0||l.blurInput()}},Qe=$(()=>{const{self:{menuBoxShadow:l}}=u.value;return{"--n-menu-box-shadow":l}}),Ce=d?wt("select",void 0,Qe,e):void 0;return Object.assign(Object.assign({},ft),{mergedStatus:J,mergedClsPrefix:o,mergedBordered:n,namespace:i,treeMate:_,isMounted:Oo(),triggerRef:L,menuRef:N,pattern:s,uncontrolledShow:k,mergedShow:A,adjustedTo:Gt(e),uncontrolledValue:f,mergedValue:h,followerRef:le,localizedPlaceholder:te,selectedOption:B,selectedOptions:R,mergedSize:X,mergedDisabled:G,focused:v,activeWithoutMenuOpen:we,inlineThemeDisabled:d,onTriggerInputFocus:We,onTriggerInputBlur:Ve,handleTriggerOrMenuResize:ut,handleMenuFocus:Fe,handleMenuBlur:ye,handleMenuTabOut:je,handleTriggerClick:He,handleToggle:Te,handleDeleteOption:pe,handlePatternInput:z,handleClear:se,handleTriggerBlur:Ne,handleTriggerFocus:Re,handleKeydown:Xe,handleMenuAfterLeave:Ee,handleMenuClickOutside:Ke,handleMenuScroll:Ye,handleMenuKeydown:Xe,handleMenuMousedown:ct,mergedTheme:u,cssVars:d?void 0:Qe,themeClass:Ce?.themeClass,onRender:Ce?.onRender})},render(){return r("div",{class:`${this.mergedClsPrefix}-select`},r(zo,null,{default:()=>[r(Ro,null,{default:()=>r(hr,{ref:"triggerRef",inlineThemeDisabled:this.inlineThemeDisabled,status:this.mergedStatus,inputProps:this.inputProps,clsPrefix:this.mergedClsPrefix,showArrow:this.showArrow,maxTagCount:this.maxTagCount,ellipsisTagPopoverProps:this.ellipsisTagPopoverProps,bordered:this.mergedBordered,active:this.activeWithoutMenuOpen||this.mergedShow,pattern:this.pattern,placeholder:this.localizedPlaceholder,selectedOption:this.selectedOption,selectedOptions:this.selectedOptions,multiple:this.multiple,renderTag:this.renderTag,renderLabel:this.renderLabel,filterable:this.filterable,clearable:this.clearable,disabled:this.mergedDisabled,size:this.mergedSize,theme:this.mergedTheme.peers.InternalSelection,labelField:this.labelField,valueField:this.valueField,themeOverrides:this.mergedTheme.peerOverrides.InternalSelection,loading:this.loading,focused:this.focused,onClick:this.handleTriggerClick,onDeleteOption:this.handleDeleteOption,onPatternInput:this.handlePatternInput,onClear:this.handleClear,onBlur:this.handleTriggerBlur,onFocus:this.handleTriggerFocus,onKeydown:this.handleKeydown,onPatternBlur:this.onTriggerInputBlur,onPatternFocus:this.onTriggerInputFocus,onResize:this.handleTriggerOrMenuResize,ignoreComposition:this.ignoreComposition},{arrow:()=>{var e,o;return[(o=(e=this.$slots).arrow)===null||o===void 0?void 0:o.call(e)]}})}),r(Fo,{ref:"followerRef",show:this.mergedShow,to:this.adjustedTo,teleportDisabled:this.adjustedTo===Gt.tdkey,containerClass:this.namespace,width:this.consistentMenuWidth?"target":void 0,minWidth:"target",placement:this.placement},{default:()=>r(wn,{name:"fade-in-scale-up-transition",appear:this.isMounted,onAfterLeave:this.handleMenuAfterLeave},{default:()=>{var e,o,n;return this.mergedShow||this.displayDirective==="show"?((e=this.onRender)===null||e===void 0||e.call(this),Eo(r(dr,Object.assign({},this.menuProps,{ref:"menuRef",onResize:this.handleTriggerOrMenuResize,inlineThemeDisabled:this.inlineThemeDisabled,virtualScroll:this.consistentMenuWidth&&this.virtualScroll,class:[`${this.mergedClsPrefix}-select-menu`,this.themeClass,(o=this.menuProps)===null||o===void 0?void 0:o.class],clsPrefix:this.mergedClsPrefix,focusable:!0,labelField:this.labelField,valueField:this.valueField,autoPending:!0,nodeProps:this.nodeProps,theme:this.mergedTheme.peers.InternalSelectMenu,themeOverrides:this.mergedTheme.peerOverrides.InternalSelectMenu,treeMate:this.treeMate,multiple:this.multiple,size:this.menuSize,renderOption:this.renderOption,renderLabel:this.renderLabel,value:this.mergedValue,style:[(n=this.menuProps)===null||n===void 0?void 0:n.style,this.cssVars],onToggle:this.handleToggle,onScroll:this.handleMenuScroll,onFocus:this.handleMenuFocus,onBlur:this.handleMenuBlur,onKeydown:this.handleMenuKeydown,onTabOut:this.handleMenuTabOut,onMousedown:this.handleMenuMousedown,show:this.mergedShow,showCheckmark:this.showCheckmark,resetMenuOnOptionsChange:this.resetMenuOnOptionsChange}),{empty:()=>{var i,d;return[(d=(i=this.$slots).empty)===null||d===void 0?void 0:d.call(i)]},header:()=>{var i,d;return[(d=(i=this.$slots).header)===null||d===void 0?void 0:d.call(i)]},action:()=>{var i,d;return[(d=(i=this.$slots).action)===null||d===void 0?void 0:d.call(i)]}}),this.displayDirective==="show"?[[Bo,this.mergedShow],[on,this.handleMenuClickOutside,void 0,{capture:!0}]]:[[on,this.handleMenuClickOutside,void 0,{capture:!0}]])):null}})})]}))}}),Vr=e=>({state:()=>({list:{},selectedSection:Rt[0],selectedConnection:pt[0],sections:Rt,socialOptions:pt,loading:!1,pager:{page:0,size:10}}),actions:{async setSection(o,n){this.selectedSection=Rt.find(i=>i.key==o)??Rt[0],this.selectedConnection=n?pt.find(i=>i.key==n)??pt[0]:pt[0]},async getData(o){o&&(this.pager=o,this.selectedSection.key=="list"?await this.getList(!0):this.selectedSection.key=="connections"&&await this.getConnections(!0))},async getList(o=!1){if(!(this.list.list&&!o)){this.loading=!0;try{this.list.list=await Mr(Ir[e],this.pager)}catch{this.fetched=!1}finally{this.loading=!1}}},async getConnections(o=!1){if(!(this.list.connections&&!o)){this.loading=!0;try{const n=await $r(e,this.selectedConnection.key,this.pager);n.items.forEach(i=>{i.profileLink=`/${e}/${i.slug}`,i.key=e}),this.list.connections=n}catch(n){console.log(n)}finally{this.loading=!1}}}}}),Or="withoutEnlargement=true&fit=inside&height=120&quality=90&format=png",Ir={business:qe.GET_COMPANIES+"?fields=*&sort=name&meta=filter_count",edu:qe.GET_EDUS+"?fields=*&sort=name&meta=filter_count",people:qe.GET_USERS+"?fields=*&sort=username&meta=filter_count"},kr={people:{url:`${qe.GET_USERS}?fields=username,related.social.{SOCIAL}&filter[related][social][{SOCIAL}][_nempty]=true&sort=username&meta=filter_count`,itemPath:["related","social"]},business:{url:`${qe.GET_COMPANIES}?fields=name,slug,tagline,social.{SOCIAL}&filter[social][{SOCIAL}][_nempty]=true&sort=name&meta=filter_count`,itemPath:"social"},edu:{url:`${qe.GET_EDUS}?fields=name,slug,social.{SOCIAL}&filter[social][{SOCIAL}][_nempty]=true&sort=name&meta=filter_count`,itemPath:"social"}},Rt=[{label:"List",key:"list",content:"List"},{label:"Connections",key:"connections",content:"Social"}],pt=[{label:"GitHub",key:"github"},{label:"NuGet",key:"nuget"},{label:"Mastodon",key:"mastodon"},{label:"Pixelfed",key:"pixelfed"},{label:"LinkedIn",key:"linkedin"},{label:"YouTube",key:"youtube"},{label:"PeerTube",key:"peertube"}];function kn(e){return`&limit=${e.size}&page=${e.page}`}async function Mr(e,o){const n=await fetch(e+kn(o));if(n.ok){const i=await n.json(),d=i.data;return d.forEach(u=>{u.logo=_r(u.logo)}),{items:d,total:i.meta?.filter_count??0}}else throw Error("Connection Error")}function _r(e){return e?`${qe.ASSETS}${e}?${Or}`:null}async function $r(e,o,n){const i=kr[e],d=i?.url.replaceAll("{SOCIAL}",o);if(!d)throw new Error("Can't fetch Social");const u=await fetch(d+kn(n));if(u.ok){const f=await u.json();return{items:f.data.map(h=>{const v=(Array.isArray(i.itemPath)?h[i.itemPath[0]][0][i.itemPath[1]]:h[i.itemPath])[o],s=Lo(o,v);return{name:h.username||h.name,label:s.text,connectionLink:s.url,slug:h.slug}}),total:f.meta?.filter_count??0}}else throw Error("Connection Error")}export{Go as C,Xo as E,rr as N,Ho as V,Dr as a,dr as b,Cr as c,gr as d,Rn as e,Fr as f,Wr as g,sn as h,Fn as i,Lr as k,Ht as m,Vr as s};
