(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[916],{6592:function(e,t,n){Promise.resolve().then(n.bind(n,7691)),Promise.resolve().then(n.bind(n,9710)),Promise.resolve().then(n.bind(n,3027)),Promise.resolve().then(n.bind(n,6596)),Promise.resolve().then(n.t.bind(n,8003,23))},4508:function(e,t,n){"use strict";n.d(t,{cn:function(){return i}});var r=n(1994),l=n(3335);function i(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return(0,l.m6)((0,r.W)(t))}},6741:function(e,t,n){"use strict";function r(e,t,{checkForDefaultPrevented:n=!0}={}){return function(r){if(e?.(r),!1===n||!r.defaultPrevented)return t?.(r)}}n.d(t,{M:function(){return r}})},6818:function(e,t,n){"use strict";n.d(t,{B:function(){return f}});var r=n(2265),l=n(7437),i=n(8575),o=r.forwardRef((e,t)=>{let{children:n,...i}=e,o=r.Children.toArray(n),c=o.find(s);if(c){let e=c.props.children,n=o.map(t=>t!==c?t:r.Children.count(e)>1?r.Children.only(null):r.isValidElement(e)?e.props.children:null);return(0,l.jsx)(u,{...i,ref:t,children:r.isValidElement(e)?r.cloneElement(e,void 0,n):null})}return(0,l.jsx)(u,{...i,ref:t,children:n})});o.displayName="Slot";var u=r.forwardRef((e,t)=>{let{children:n,...l}=e;if(r.isValidElement(n)){let e,o;let u=(e=Object.getOwnPropertyDescriptor(n.props,"ref")?.get)&&"isReactWarning"in e&&e.isReactWarning?n.ref:(e=Object.getOwnPropertyDescriptor(n,"ref")?.get)&&"isReactWarning"in e&&e.isReactWarning?n.props.ref:n.props.ref||n.ref;return r.cloneElement(n,{...function(e,t){let n={...t};for(let r in t){let l=e[r],i=t[r];/^on[A-Z]/.test(r)?l&&i?n[r]=(...e)=>{i(...e),l(...e)}:l&&(n[r]=l):"style"===r?n[r]={...l,...i}:"className"===r&&(n[r]=[l,i].filter(Boolean).join(" "))}return{...e,...n}}(l,n.props),ref:t?(0,i.F)(t,u):u})}return r.Children.count(n)>1?r.Children.only(null):null});u.displayName="SlotClone";var c=({children:e})=>(0,l.jsx)(l.Fragment,{children:e});function s(e){return r.isValidElement(e)&&e.type===c}function f(e){let t=e+"CollectionProvider",[n,u]=function(e,t=[]){let n=[],i=()=>{let t=n.map(e=>r.createContext(e));return function(n){let l=n?.[e]||t;return r.useMemo(()=>({[`__scope${e}`]:{...n,[e]:l}}),[n,l])}};return i.scopeName=e,[function(t,i){let o=r.createContext(i),u=n.length;function c(t){let{scope:n,children:i,...c}=t,s=n?.[e][u]||o,f=r.useMemo(()=>c,Object.values(c));return(0,l.jsx)(s.Provider,{value:f,children:i})}return n=[...n,i],c.displayName=t+"Provider",[c,function(n,l){let c=l?.[e][u]||o,s=r.useContext(c);if(s)return s;if(void 0!==i)return i;throw Error(`\`${n}\` must be used within \`${t}\``)}]},function(...e){let t=e[0];if(1===e.length)return t;let n=()=>{let n=e.map(e=>({useScope:e(),scopeName:e.scopeName}));return function(e){let l=n.reduce((t,{useScope:n,scopeName:r})=>{let l=n(e)[`__scope${r}`];return{...t,...l}},{});return r.useMemo(()=>({[`__scope${t.scopeName}`]:l}),[l])}};return n.scopeName=t.scopeName,n}(i,...t)]}(t),[c,s]=n(t,{collectionRef:{current:null},itemMap:new Map}),f=e=>{let{scope:t,children:n}=e,i=r.useRef(null),o=r.useRef(new Map).current;return(0,l.jsx)(c,{scope:t,itemMap:o,collectionRef:i,children:n})};f.displayName=t;let a=e+"CollectionSlot",d=r.forwardRef((e,t)=>{let{scope:n,children:r}=e,u=s(a,n),c=(0,i.e)(t,u.collectionRef);return(0,l.jsx)(o,{ref:c,children:r})});d.displayName=a;let p=e+"CollectionItemSlot",m="data-radix-collection-item",h=r.forwardRef((e,t)=>{let{scope:n,children:u,...c}=e,f=r.useRef(null),a=(0,i.e)(t,f),d=s(p,n);return r.useEffect(()=>(d.itemMap.set(f,{ref:f,...c}),()=>void d.itemMap.delete(f))),(0,l.jsx)(o,{[m]:"",ref:a,children:u})});return h.displayName=p,[{Provider:f,Slot:d,ItemSlot:h},function(t){let n=s(e+"CollectionConsumer",t);return r.useCallback(()=>{let e=n.collectionRef.current;if(!e)return[];let t=Array.from(e.querySelectorAll("[".concat(m,"]")));return Array.from(n.itemMap.values()).sort((e,n)=>t.indexOf(e.ref.current)-t.indexOf(n.ref.current))},[n.collectionRef,n.itemMap])},u]}},8575:function(e,t,n){"use strict";n.d(t,{F:function(){return l},e:function(){return i}});var r=n(2265);function l(...e){return t=>e.forEach(e=>{"function"==typeof e?e(t):null!=e&&(e.current=t)})}function i(...e){return r.useCallback(l(...e),e)}},9114:function(e,t,n){"use strict";n.d(t,{gm:function(){return i}});var r=n(2265);n(7437);var l=r.createContext(void 0);function i(e){let t=r.useContext(l);return e||t||"ltr"}},9255:function(e,t,n){"use strict";n.d(t,{M:function(){return c}});var r,l=n(2265),i=n(1188),o=(r||(r=n.t(l,2)))["useId".toString()]||(()=>void 0),u=0;function c(e){let[t,n]=l.useState(o());return(0,i.b)(()=>{e||n(e=>e??String(u++))},[e]),e||(t?`radix-${t}`:"")}},2912:function(e,t,n){"use strict";n.d(t,{WV:function(){return a},jH:function(){return d}});var r=n(2265),l=n(4887),i=n(8575),o=n(7437),u=r.forwardRef((e,t)=>{let{children:n,...l}=e,i=r.Children.toArray(n),u=i.find(f);if(u){let e=u.props.children,n=i.map(t=>t!==u?t:r.Children.count(e)>1?r.Children.only(null):r.isValidElement(e)?e.props.children:null);return(0,o.jsx)(c,{...l,ref:t,children:r.isValidElement(e)?r.cloneElement(e,void 0,n):null})}return(0,o.jsx)(c,{...l,ref:t,children:n})});u.displayName="Slot";var c=r.forwardRef((e,t)=>{let{children:n,...l}=e;if(r.isValidElement(n)){let e,o;let u=(e=Object.getOwnPropertyDescriptor(n.props,"ref")?.get)&&"isReactWarning"in e&&e.isReactWarning?n.ref:(e=Object.getOwnPropertyDescriptor(n,"ref")?.get)&&"isReactWarning"in e&&e.isReactWarning?n.props.ref:n.props.ref||n.ref;return r.cloneElement(n,{...function(e,t){let n={...t};for(let r in t){let l=e[r],i=t[r];/^on[A-Z]/.test(r)?l&&i?n[r]=(...e)=>{i(...e),l(...e)}:l&&(n[r]=l):"style"===r?n[r]={...l,...i}:"className"===r&&(n[r]=[l,i].filter(Boolean).join(" "))}return{...e,...n}}(l,n.props),ref:t?(0,i.F)(t,u):u})}return r.Children.count(n)>1?r.Children.only(null):null});c.displayName="SlotClone";var s=({children:e})=>(0,o.jsx)(o.Fragment,{children:e});function f(e){return r.isValidElement(e)&&e.type===s}var a=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","span","svg","ul"].reduce((e,t)=>{let n=r.forwardRef((e,n)=>{let{asChild:r,...l}=e,i=r?u:t;return"undefined"!=typeof window&&(window[Symbol.for("radix-ui")]=!0),(0,o.jsx)(i,{...l,ref:n})});return n.displayName=`Primitive.${t}`,{...e,[t]:n}},{});function d(e,t){e&&l.flushSync(()=>e.dispatchEvent(t))}},886:function(e,t,n){"use strict";n.d(t,{T:function(){return i}});var r=n(2265),l=n(6606);function i({prop:e,defaultProp:t,onChange:n=()=>{}}){let[i,o]=function({defaultProp:e,onChange:t}){let n=r.useState(e),[i]=n,o=r.useRef(i),u=(0,l.W)(t);return r.useEffect(()=>{o.current!==i&&(u(i),o.current=i)},[i,o,u]),n}({defaultProp:t,onChange:n}),u=void 0!==e,c=u?e:i,s=(0,l.W)(n);return[c,r.useCallback(t=>{if(u){let n="function"==typeof t?t(e):t;n!==e&&s(n)}else o(t)},[u,e,o,s])]}},5267:function(e){"use strict";e.exports=JSON.parse('{"Wi":"gary@hyperjump.tech","FV":[{"label":"Services","href":"#services","type":"link"},{"label":"Case Studies","href":"#case-studies","type":"link"},{"label":"Open Source","href":"#open-source","type":"link"},{"label":"FAQ","href":"#faqs","type":"link"},{"label":"Schedule Consultation","href":"mailto:solutions@hyperjump.tech","type":"button","style":"outline"}]}')}},function(e){e.O(0,[310,799,568,613,3,225,971,117,744],function(){return e(e.s=6592)}),_N_E=e.O()}]);