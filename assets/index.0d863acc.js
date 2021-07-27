var e=Object.defineProperty,t=Object.defineProperties,n=Object.getOwnPropertyDescriptors,o=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable,s=(t,n,o)=>n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[n]=o,i=(e,t)=>{for(var n in t||(t={}))a.call(t,n)&&s(e,n,t[n]);if(o)for(var n of o(t))l.call(t,n)&&s(e,n,t[n]);return e},r=(e,o)=>t(e,n(o));import{C as c,R as m,F as d,a as h,b as g,c as u,d as E,e as k,f as p,g as C,h as w,i as S}from"./vendor.00aac9aa.js";const f=({done:e,childrenLength:t,showChildren:n,msg:o,toogle:a,toogleShowChildren:l,place:s,changeEditing:i,editing:r,commitMsg:w,commitChildren:S,deleteSelf:f})=>{const[T,v]=c.exports.useState(!1),[N,y]=c.exports.useState(o),D=()=>{i(!1),y(o)};return m.createElement("div",{className:`msg msg-${s}`,onMouseEnter:()=>v(!0),onMouseLeave:()=>v(!1)},e?m.createElement(d,{className:"checkBox",onClick:()=>a()}):m.createElement(h,{className:"checkBox",onClick:()=>a()}),r?m.createElement("input",{type:"text",className:"editing",value:N,onChange:e=>y(e.target.value),onKeyDown:e=>{var t;"Enter"===e.key&&(""===(t=N)?f():w(t)),"Escape"===e.key&&D()},autoFocus:r,onBlur:()=>D()}):"todo"===s?m.createElement("h3",null,o):m.createElement("h6",null,o),m.createElement("div",{className:"item-bar"},T?m.createElement(m.Fragment,null,m.createElement("div",{className:"add-children icon-container",onClick:()=>S()},m.createElement(g,{className:"add-children-icon icon"})),m.createElement("div",{className:"edit-element icon-container",onClick:()=>i(!r)},r?m.createElement(E,{className:"edit-element-icon icon"}):m.createElement(u,{className:"edit-element-icon icon"})),m.createElement("div",{className:"remove-element icon-container danger",onClick:()=>f()},m.createElement(k,{className:"remove-element-icon icon"}))):m.createElement(m.Fragment,null),t>0?m.createElement("div",{className:"show-children icon-container",onClick:()=>l()},n?m.createElement(p,{className:"show-children-icon icon"}):m.createElement(C,{className:"show-children-icon icon"})):m.createElement(m.Fragment,null)))},T=({task:e,isLast:t,commitTask:n})=>{const{done:o,msg:a,childrenTasks:l,manualShowChildren:s,editing:c}=e;return m.createElement("div",{className:"item item-task"+(t?" last-item":"")},m.createElement(f,{done:o,childrenLength:l.length,toogleShowChildren:()=>n(r(i({},e),{manualShowChildren:!s})),toogle:()=>n(r(i({},e),{done:!o})),showChildren:s,msg:a,place:"task",changeEditing:t=>n(r(i({},e),{editing:t})),editing:c,commitMsg:t=>n(r(i({},e),{msg:t,editing:!1})),commitChildren:()=>n(r(i({},e),{childrenTasks:[...l,{msg:"",done:!1,editing:!0,manualShowChildren:!0,autoShowChildren:!0,childrenTasks:[]}]})),deleteSelf:()=>n(null)}),m.createElement(v,{tasks:l,showChildren:s,commitTask:e=>t=>n(e(t)),maker:t=>r(i({},e),{childrenTasks:t})}))};function v({tasks:e,showChildren:t,commitTask:n,maker:o}){return e.length>0&&t?m.createElement("div",{className:"container container-task"},e.map(((t,a)=>m.createElement(T,{key:a,task:t,isLast:a+1===e.length,commitTask:n((t=>o(t?e.map(((e,n)=>a===n?t:e)):e.filter(((e,t)=>a!==t)))))})))):m.createElement(m.Fragment,null)}const N=({todo:e,isLast:t,commitTodo:n})=>{const{tasks:o,done:a,msg:l,manualShowChildren:s,editing:c}=e;return m.createElement("div",{className:"item item-todo"+(t?" last-item":"")},m.createElement(f,{done:a,childrenLength:o.length,toogleShowChildren:()=>n(r(i({},e),{manualShowChildren:!s})),toogle:()=>n(r(i({},e),{done:!a})),showChildren:s,msg:l,place:"todo",changeEditing:t=>n(r(i({},e),{editing:t})),editing:c,commitMsg:t=>n(r(i({},e),{msg:t,editing:!1})),commitChildren:()=>n(r(i({},e),{tasks:[...o,{msg:"",done:!1,editing:!0,manualShowChildren:!0,autoShowChildren:!0,childrenTasks:[]}]})),deleteSelf:()=>n(null)}),m.createElement(v,{tasks:o,showChildren:s,commitTask:e=>t=>n(e(t)),maker:t=>r(i({},e),{tasks:t})}))},y=({state:e,todos:t,commitTodo:n,make:o})=>m.createElement("div",{className:"list-todo "+("todos"===e?"left":"doings"===e?"center":"right")},m.createElement("div",{className:"list-todo-bar"},m.createElement("h1",null,e.toUpperCase()),m.createElement("div",{className:"add-children",onClick:()=>n((e=>o([...t,e])))({done:!1,msg:"",editing:!0,tasks:[],manualShowChildren:!0,autoShowChildren:!0})},m.createElement(g,null))),t.length>0?m.createElement("div",{className:"container container-todo"},t.map(((e,a)=>m.createElement(N,{key:a,todo:e,isLast:a+1===t.length,commitTodo:n((e=>o(e?t.map(((t,n)=>a===n?e:t)):t.filter(((e,t)=>a!==t)))))})))):m.createElement(m.Fragment,null)),D=()=>{const[e,t]=c.exports.useState(JSON.parse(localStorage.getItem("fgTL")||'{"Todos":[],"Doings":[],"Dones":[]}')),n=e=>n=>{t(e(n));const o=(e,t)=>{if(0===e.childrenTasks.length)return e;const n=e.childrenTasks.map(o),a=n.map((e=>e.done)).reduce(((e,t)=>e&&t),!0);return r(i({},e),{childrenTasks:n,done:a,manualShowChildren:e.manualShowChildren===e.autoShowChildren?!a:e.manualShowChildren,autoShowChildren:!a})},a=(e,t)=>{if(0===e.tasks.length)return e;const n=e.tasks.map(o),a=n.map((e=>e.done)).reduce(((e,t)=>e&&t),!0);return r(i({},e),{tasks:n,done:a,manualShowChildren:e.manualShowChildren===e.autoShowChildren?!a:e.manualShowChildren,autoShowChildren:!a})};t((e=>({Todos:e.Todos.map(a),Doings:e.Doings.map(a),Dones:e.Dones.map(a)})));const l=e=>!e.done&&e.childrenTasks.every((e=>l(e)))||!e.done&&0===e.childrenTasks.length,s=e=>!e.done&&e.tasks.every((e=>l(e)))||!e.done&&0===e.tasks.length,c=e=>!e.done&&e.tasks.some((e=>!l(e)));t((e=>({Todos:[...e.Todos.filter(s),...e.Dones.filter(s),...e.Doings.filter(s)],Doings:[...e.Doings.filter(c),...e.Todos.filter(c),...e.Dones.filter(c)],Dones:[...e.Dones.filter((e=>e.done)),...e.Todos.filter((e=>e.done)),...e.Doings.filter((e=>e.done))]})))};c.exports.useEffect((()=>(localStorage.setItem("fgTL",JSON.stringify(e)),()=>{})),[e]);return m.createElement(m.Fragment,null,m.createElement("div",{className:"download"},m.createElement("a",{href:(()=>{const t=JSON.stringify(e),n=new Blob([t],{type:"application/json"});return URL.createObjectURL(n)})(),download:"todo-list.json"},m.createElement(w,null))),m.createElement("div",{className:"App"},m.createElement(y,{state:"todos",todos:e.Todos,commitTodo:n,make:t=>r(i({},e),{Todos:t})}),m.createElement(y,{state:"doings",todos:e.Doings,commitTodo:n,make:t=>r(i({},e),{Doings:t})}),m.createElement(y,{state:"dones",todos:e.Dones,commitTodo:n,make:t=>r(i({},e),{Dones:t})})))};S.render(m.createElement(m.StrictMode,null,m.createElement(D,null)),document.getElementById("root"));
