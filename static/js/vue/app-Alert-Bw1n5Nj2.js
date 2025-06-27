import{a as O,T as u,c as v,j as m,n as i,m as P,bm as F,i as N,d as V,h as l,bo as q,aW as D,c7 as K,L as G,O as J,bs as Q,br as U,bq as X,bt as Y,q as Z,u as oo,x as E,y as eo,b as $,bW as ro,z as a,A as no,r as so}from"./app.js";const lo={iconMargin:"11px 8px 0 12px",iconMarginRtl:"11px 12px 0 8px",iconSize:"24px",closeIconSize:"16px",closeSize:"20px",closeMargin:"13px 14px 0 0",closeMarginRtl:"13px 0 0 14px",padding:"13px"};function to(r){const{lineHeight:o,borderRadius:d,fontWeightStrong:f,baseColor:t,dividerColor:b,actionColor:T,textColor1:g,textColor2:s,closeColorHover:h,closeColorPressed:C,closeIconColor:p,closeIconColorHover:x,closeIconColorPressed:n,infoColor:e,successColor:I,warningColor:z,errorColor:S,fontSize:y}=r;return Object.assign(Object.assign({},lo),{fontSize:y,lineHeight:o,titleFontWeight:f,borderRadius:d,border:`1px solid ${b}`,color:T,titleTextColor:g,iconColor:s,contentTextColor:s,closeBorderRadius:d,closeColorHover:h,closeColorPressed:C,closeIconColor:p,closeIconColorHover:x,closeIconColorPressed:n,borderInfo:`1px solid ${u(t,v(e,{alpha:.25}))}`,colorInfo:u(t,v(e,{alpha:.08})),titleTextColorInfo:g,iconColorInfo:e,contentTextColorInfo:s,closeColorHoverInfo:h,closeColorPressedInfo:C,closeIconColorInfo:p,closeIconColorHoverInfo:x,closeIconColorPressedInfo:n,borderSuccess:`1px solid ${u(t,v(I,{alpha:.25}))}`,colorSuccess:u(t,v(I,{alpha:.08})),titleTextColorSuccess:g,iconColorSuccess:I,contentTextColorSuccess:s,closeColorHoverSuccess:h,closeColorPressedSuccess:C,closeIconColorSuccess:p,closeIconColorHoverSuccess:x,closeIconColorPressedSuccess:n,borderWarning:`1px solid ${u(t,v(z,{alpha:.33}))}`,colorWarning:u(t,v(z,{alpha:.08})),titleTextColorWarning:g,iconColorWarning:z,contentTextColorWarning:s,closeColorHoverWarning:h,closeColorPressedWarning:C,closeIconColorWarning:p,closeIconColorHoverWarning:x,closeIconColorPressedWarning:n,borderError:`1px solid ${u(t,v(S,{alpha:.25}))}`,colorError:u(t,v(S,{alpha:.08})),titleTextColorError:g,iconColorError:S,contentTextColorError:s,closeColorHoverError:h,closeColorPressedError:C,closeIconColorError:p,closeIconColorHoverError:x,closeIconColorPressedError:n})}const io={common:O,self:to},co=m("alert",`
 line-height: var(--n-line-height);
 border-radius: var(--n-border-radius);
 position: relative;
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-color);
 text-align: start;
 word-break: break-word;
`,[i("border",`
 border-radius: inherit;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 transition: border-color .3s var(--n-bezier);
 border: var(--n-border);
 pointer-events: none;
 `),P("closable",[m("alert-body",[i("title",`
 padding-right: 24px;
 `)])]),i("icon",{color:"var(--n-icon-color)"}),m("alert-body",{padding:"var(--n-padding)"},[i("title",{color:"var(--n-title-text-color)"}),i("content",{color:"var(--n-content-text-color)"})]),F({originalTransition:"transform .3s var(--n-bezier)",enterToProps:{transform:"scale(1)"},leaveToProps:{transform:"scale(0.9)"}}),i("icon",`
 position: absolute;
 left: 0;
 top: 0;
 align-items: center;
 justify-content: center;
 display: flex;
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 font-size: var(--n-icon-size);
 margin: var(--n-icon-margin);
 `),i("close",`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 position: absolute;
 right: 0;
 top: 0;
 margin: var(--n-close-margin);
 `),P("show-icon",[m("alert-body",{paddingLeft:"calc(var(--n-icon-margin-left) + var(--n-icon-size) + var(--n-icon-margin-right))"})]),P("right-adjust",[m("alert-body",{paddingRight:"calc(var(--n-close-size) + var(--n-padding) + 2px)"})]),m("alert-body",`
 border-radius: var(--n-border-radius);
 transition: border-color .3s var(--n-bezier);
 `,[i("title",`
 transition: color .3s var(--n-bezier);
 font-size: 16px;
 line-height: 19px;
 font-weight: var(--n-title-font-weight);
 `,[N("& +",[i("content",{marginTop:"9px"})])]),i("content",{transition:"color .3s var(--n-bezier)",fontSize:"var(--n-font-size)"})]),i("icon",{transition:"color .3s var(--n-bezier)"})]),ao=Object.assign(Object.assign({},E.props),{title:String,showIcon:{type:Boolean,default:!0},type:{type:String,default:"default"},bordered:{type:Boolean,default:!0},closable:Boolean,onClose:Function,onAfterLeave:Function,onAfterHide:Function}),ho=V({name:"Alert",inheritAttrs:!1,props:ao,slots:Object,setup(r){const{mergedClsPrefixRef:o,mergedBorderedRef:d,inlineThemeDisabled:f,mergedRtlRef:t}=oo(r),b=E("Alert","-alert",co,io,r,o),T=eo("Alert",t,o),g=$(()=>{const{common:{cubicBezierEaseInOut:n},self:e}=b.value,{fontSize:I,borderRadius:z,titleFontWeight:S,lineHeight:y,iconSize:H,iconMargin:R,iconMarginRtl:W,closeIconSize:A,closeBorderRadius:w,closeSize:B,closeMargin:_,closeMarginRtl:j,padding:L}=e,{type:c}=r,{left:M,right:k}=ro(R);return{"--n-bezier":n,"--n-color":e[a("color",c)],"--n-close-icon-size":A,"--n-close-border-radius":w,"--n-close-color-hover":e[a("closeColorHover",c)],"--n-close-color-pressed":e[a("closeColorPressed",c)],"--n-close-icon-color":e[a("closeIconColor",c)],"--n-close-icon-color-hover":e[a("closeIconColorHover",c)],"--n-close-icon-color-pressed":e[a("closeIconColorPressed",c)],"--n-icon-color":e[a("iconColor",c)],"--n-border":e[a("border",c)],"--n-title-text-color":e[a("titleTextColor",c)],"--n-content-text-color":e[a("contentTextColor",c)],"--n-line-height":y,"--n-border-radius":z,"--n-font-size":I,"--n-title-font-weight":S,"--n-icon-size":H,"--n-icon-margin":R,"--n-icon-margin-rtl":W,"--n-close-size":B,"--n-close-margin":_,"--n-close-margin-rtl":j,"--n-padding":L,"--n-icon-margin-left":M,"--n-icon-margin-right":k}}),s=f?no("alert",$(()=>r.type[0]),g,r):void 0,h=so(!0),C=()=>{const{onAfterLeave:n,onAfterHide:e}=r;n&&n(),e&&e()};return{rtlEnabled:T,mergedClsPrefix:o,mergedBordered:d,visible:h,handleCloseClick:()=>{var n;Promise.resolve((n=r.onClose)===null||n===void 0?void 0:n.call(r)).then(e=>{e!==!1&&(h.value=!1)})},handleAfterLeave:()=>{C()},mergedTheme:b,cssVars:f?void 0:g,themeClass:s?.themeClass,onRender:s?.onRender}},render(){var r;return(r=this.onRender)===null||r===void 0||r.call(this),l(q,{onAfterLeave:this.handleAfterLeave},{default:()=>{const{mergedClsPrefix:o,$slots:d}=this,f={class:[`${o}-alert`,this.themeClass,this.closable&&`${o}-alert--closable`,this.showIcon&&`${o}-alert--show-icon`,!this.title&&this.closable&&`${o}-alert--right-adjust`,this.rtlEnabled&&`${o}-alert--rtl`],style:this.cssVars,role:"alert"};return this.visible?l("div",Object.assign({},D(this.$attrs,f)),this.closable&&l(K,{clsPrefix:o,class:`${o}-alert__close`,onClick:this.handleCloseClick}),this.bordered&&l("div",{class:`${o}-alert__border`}),this.showIcon&&l("div",{class:`${o}-alert__icon`,"aria-hidden":"true"},G(d.icon,()=>[l(J,{clsPrefix:o},{default:()=>{switch(this.type){case"success":return l(Y,null);case"info":return l(X,null);case"warning":return l(U,null);case"error":return l(Q,null);default:return null}}})])),l("div",{class:[`${o}-alert-body`,this.mergedBordered&&`${o}-alert-body--bordered`]},Z(d.header,t=>{const b=t||this.title;return b?l("div",{class:`${o}-alert-body__title`},b):null}),d.default&&l("div",{class:`${o}-alert-body__content`},d))):null}})}});export{ho as N};
