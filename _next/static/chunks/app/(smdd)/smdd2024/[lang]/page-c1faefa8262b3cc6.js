(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[916],{6592:function(e,t,r){Promise.resolve().then(r.bind(r,7691)),Promise.resolve().then(r.bind(r,9710)),Promise.resolve().then(r.bind(r,3027)),Promise.resolve().then(r.bind(r,6596)),Promise.resolve().then(r.t.bind(r,8003,23))},4508:function(e,t,r){"use strict";r.d(t,{cn:function(){return i}});var n=r(1994),l=r(3335);function i(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return(0,l.m6)((0,n.W)(t))}},6741:function(e,t,r){"use strict";function n(e,t,{checkForDefaultPrevented:r=!0}={}){return function(n){if(e?.(n),!1===r||!n.defaultPrevented)return t?.(n)}}r.d(t,{M:function(){return n}})},6818:function(e,t,r){"use strict";r.d(t,{B:function(){return f}});var n=r(2265),l=r(7437),i=r(8575),o=n.forwardRef((e,t)=>{let{children:r,...i}=e,o=n.Children.toArray(r),c=o.find(s);if(c){let e=c.props.children,r=o.map(t=>t!==c?t:n.Children.count(e)>1?n.Children.only(null):n.isValidElement(e)?e.props.children:null);return(0,l.jsx)(u,{...i,ref:t,children:n.isValidElement(e)?n.cloneElement(e,void 0,r):null})}return(0,l.jsx)(u,{...i,ref:t,children:r})});o.displayName="Slot";var u=n.forwardRef((e,t)=>{let{children:r,...l}=e;if(n.isValidElement(r)){let e,o;let u=(e=Object.getOwnPropertyDescriptor(r.props,"ref")?.get)&&"isReactWarning"in e&&e.isReactWarning?r.ref:(e=Object.getOwnPropertyDescriptor(r,"ref")?.get)&&"isReactWarning"in e&&e.isReactWarning?r.props.ref:r.props.ref||r.ref;return n.cloneElement(r,{...function(e,t){let r={...t};for(let n in t){let l=e[n],i=t[n];/^on[A-Z]/.test(n)?l&&i?r[n]=(...e)=>{i(...e),l(...e)}:l&&(r[n]=l):"style"===n?r[n]={...l,...i}:"className"===n&&(r[n]=[l,i].filter(Boolean).join(" "))}return{...e,...r}}(l,r.props),ref:t?(0,i.F)(t,u):u})}return n.Children.count(r)>1?n.Children.only(null):null});u.displayName="SlotClone";var c=({children:e})=>(0,l.jsx)(l.Fragment,{children:e});function s(e){return n.isValidElement(e)&&e.type===c}function f(e){let t=e+"CollectionProvider",[r,u]=function(e,t=[]){let r=[],i=()=>{let t=r.map(e=>n.createContext(e));return function(r){let l=r?.[e]||t;return n.useMemo(()=>({[`__scope${e}`]:{...r,[e]:l}}),[r,l])}};return i.scopeName=e,[function(t,i){let o=n.createContext(i),u=r.length;function c(t){let{scope:r,children:i,...c}=t,s=r?.[e][u]||o,f=n.useMemo(()=>c,Object.values(c));return(0,l.jsx)(s.Provider,{value:f,children:i})}return r=[...r,i],c.displayName=t+"Provider",[c,function(r,l){let c=l?.[e][u]||o,s=n.useContext(c);if(s)return s;if(void 0!==i)return i;throw Error(`\`${r}\` must be used within \`${t}\``)}]},function(...e){let t=e[0];if(1===e.length)return t;let r=()=>{let r=e.map(e=>({useScope:e(),scopeName:e.scopeName}));return function(e){let l=r.reduce((t,{useScope:r,scopeName:n})=>{let l=r(e)[`__scope${n}`];return{...t,...l}},{});return n.useMemo(()=>({[`__scope${t.scopeName}`]:l}),[l])}};return r.scopeName=t.scopeName,r}(i,...t)]}(t),[c,s]=r(t,{collectionRef:{current:null},itemMap:new Map}),f=e=>{let{scope:t,children:r}=e,i=n.useRef(null),o=n.useRef(new Map).current;return(0,l.jsx)(c,{scope:t,itemMap:o,collectionRef:i,children:r})};f.displayName=t;let a=e+"CollectionSlot",d=n.forwardRef((e,t)=>{let{scope:r,children:n}=e,u=s(a,r),c=(0,i.e)(t,u.collectionRef);return(0,l.jsx)(o,{ref:c,children:n})});d.displayName=a;let p=e+"CollectionItemSlot",m="data-radix-collection-item",h=n.forwardRef((e,t)=>{let{scope:r,children:u,...c}=e,f=n.useRef(null),a=(0,i.e)(t,f),d=s(p,r);return n.useEffect(()=>(d.itemMap.set(f,{ref:f,...c}),()=>void d.itemMap.delete(f))),(0,l.jsx)(o,{[m]:"",ref:a,children:u})});return h.displayName=p,[{Provider:f,Slot:d,ItemSlot:h},function(t){let r=s(e+"CollectionConsumer",t);return n.useCallback(()=>{let e=r.collectionRef.current;if(!e)return[];let t=Array.from(e.querySelectorAll("[".concat(m,"]")));return Array.from(r.itemMap.values()).sort((e,r)=>t.indexOf(e.ref.current)-t.indexOf(r.ref.current))},[r.collectionRef,r.itemMap])},u]}},8575:function(e,t,r){"use strict";r.d(t,{F:function(){return l},e:function(){return i}});var n=r(2265);function l(...e){return t=>e.forEach(e=>{"function"==typeof e?e(t):null!=e&&(e.current=t)})}function i(...e){return n.useCallback(l(...e),e)}},9114:function(e,t,r){"use strict";r.d(t,{gm:function(){return i}});var n=r(2265);r(7437);var l=n.createContext(void 0);function i(e){let t=n.useContext(l);return e||t||"ltr"}},9255:function(e,t,r){"use strict";r.d(t,{M:function(){return c}});var n,l=r(2265),i=r(1188),o=(n||(n=r.t(l,2)))["useId".toString()]||(()=>void 0),u=0;function c(e){let[t,r]=l.useState(o());return(0,i.b)(()=>{e||r(e=>e??String(u++))},[e]),e||(t?`radix-${t}`:"")}},2912:function(e,t,r){"use strict";r.d(t,{WV:function(){return a},jH:function(){return d}});var n=r(2265),l=r(4887),i=r(8575),o=r(7437),u=n.forwardRef((e,t)=>{let{children:r,...l}=e,i=n.Children.toArray(r),u=i.find(f);if(u){let e=u.props.children,r=i.map(t=>t!==u?t:n.Children.count(e)>1?n.Children.only(null):n.isValidElement(e)?e.props.children:null);return(0,o.jsx)(c,{...l,ref:t,children:n.isValidElement(e)?n.cloneElement(e,void 0,r):null})}return(0,o.jsx)(c,{...l,ref:t,children:r})});u.displayName="Slot";var c=n.forwardRef((e,t)=>{let{children:r,...l}=e;if(n.isValidElement(r)){let e,o;let u=(e=Object.getOwnPropertyDescriptor(r.props,"ref")?.get)&&"isReactWarning"in e&&e.isReactWarning?r.ref:(e=Object.getOwnPropertyDescriptor(r,"ref")?.get)&&"isReactWarning"in e&&e.isReactWarning?r.props.ref:r.props.ref||r.ref;return n.cloneElement(r,{...function(e,t){let r={...t};for(let n in t){let l=e[n],i=t[n];/^on[A-Z]/.test(n)?l&&i?r[n]=(...e)=>{i(...e),l(...e)}:l&&(r[n]=l):"style"===n?r[n]={...l,...i}:"className"===n&&(r[n]=[l,i].filter(Boolean).join(" "))}return{...e,...r}}(l,r.props),ref:t?(0,i.F)(t,u):u})}return n.Children.count(r)>1?n.Children.only(null):null});c.displayName="SlotClone";var s=({children:e})=>(0,o.jsx)(o.Fragment,{children:e});function f(e){return n.isValidElement(e)&&e.type===s}var a=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","span","svg","ul"].reduce((e,t)=>{let r=n.forwardRef((e,r)=>{let{asChild:n,...l}=e,i=n?u:t;return"undefined"!=typeof window&&(window[Symbol.for("radix-ui")]=!0),(0,o.jsx)(i,{...l,ref:r})});return r.displayName=`Primitive.${t}`,{...e,[t]:r}},{});function d(e,t){e&&l.flushSync(()=>e.dispatchEvent(t))}},886:function(e,t,r){"use strict";r.d(t,{T:function(){return i}});var n=r(2265),l=r(6606);function i({prop:e,defaultProp:t,onChange:r=()=>{}}){let[i,o]=function({defaultProp:e,onChange:t}){let r=n.useState(e),[i]=r,o=n.useRef(i),u=(0,l.W)(t);return n.useEffect(()=>{o.current!==i&&(u(i),o.current=i)},[i,o,u]),r}({defaultProp:t,onChange:r}),u=void 0!==e,c=u?e:i,s=(0,l.W)(r);return[c,n.useCallback(t=>{if(u){let r="function"==typeof t?t(e):t;r!==e&&s(r)}else o(t)},[u,e,o,s])]}},5267:function(e){"use strict";e.exports=JSON.parse('{"ar":{"p":"https://forms.office.com/Pages/ResponsePage.aspx?id=YB_vnVvdsku6UOy9eolc4lSE-1zhiHZGuckpAFLZgMNUNzFXVlZCQjA0UFJRR1IyUk9aSjBZVENENS4u","P":"Schedule Consultation"},"Wi":"gary@hyperjump.tech","FV":[{"label":"Services","href":"#services"},{"label":"Case Studies","href":"#case-studies"},{"label":"Open Source","href":"#open-source"},{"label":"FAQ","href":"#faqs"}]}')}},function(e){e.O(0,[310,799,568,686,3,225,971,117,744],function(){return e(e.s=6592)}),_N_E=e.O()}]);