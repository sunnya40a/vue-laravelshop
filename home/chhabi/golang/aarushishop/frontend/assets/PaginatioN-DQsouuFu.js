import{_ as y,r as R,o as c,c as o,a,F as h,i as P,t as l,h as I,n as r,l as i,p as q,b as x}from"./index-DTfqHd0M.js";const g=e=>(q("data-v-8988fc0a"),e=e(),x(),e),N={class:"navigation-container"},S={class:"results-per-page"},B=g(()=>a("label",{for:"perPage"},"Results per page:",-1)),w=["value"],F=["value"],V={class:"pagination"},z={key:0,class:"pagenumber"},D={class:"Records"},E=g(()=>a("span",{class:"material-symbols-outlined"}," first_page ",-1)),L=[E],M=g(()=>a("span",{class:"material-symbols-outlined"}," chevron_left ",-1)),O=[M],T=["onClick"],$=g(()=>a("span",{class:"material-symbols-outlined"}," chevron_right ",-1)),j=[$],A=g(()=>a("span",{class:"material-symbols-outlined"}," last_page ",-1)),G=[A],H={__name:"PaginatioN",props:{currentPage:{type:Number,required:!0},totalPageCount:{type:Number,required:!0},perPage:{type:Number,required:!0},totalRecords:{type:Number,required:!0}},emits:["page-change","per-page-change"],setup(e,{emit:p}){const s=e,m=R([5,10,20,50]),n=p,v=()=>{s.currentPage<s.totalPageCount&&n("page-change",s.currentPage+1)},f=()=>{n("page-change",1)},C=()=>{n("page-change",s.totalPageCount)},k=()=>{s.currentPage>1&&n("page-change",s.currentPage-1)},_=d=>{n("page-change",d)},b=d=>{const u=parseInt(d.target.value,10);n("per-page-change",u)};return(d,u)=>(c(),o("div",N,[a("div",S,[B,a("select",{id:"perPage",value:e.perPage,onChange:b},[(c(!0),o(h,null,P(m.value,t=>(c(),o("option",{key:t,value:t},l(t),9,F))),128))],40,w)]),a("div",V,[e.totalRecords>0?(c(),o("span",z,"Page "+l(e.currentPage)+" of "+l(e.totalPageCount),1)):I("",!0),a("span",D,"(Total Records:"+l(e.totalRecords)+")",1),a("li",{class:r(["page-item",{disabled:e.currentPage===1||e.totalRecords===0}])},[a("a",{class:"page-link",href:"#",onClick:i(f,["prevent"])},L)],2),a("li",{class:r(["page-item",{disabled:e.currentPage===1||e.totalRecords===0}])},[a("a",{class:"page-link",href:"#",onClick:i(k,["prevent"])},O)],2),(c(!0),o(h,null,P(e.totalPageCount,t=>(c(),o("li",{key:t,class:r(["page-item",{active:t===e.currentPage}])},[a("a",{class:"page-link",href:"#",onClick:i(J=>_(t),["prevent"])},l(t),9,T)],2))),128)),a("li",{class:r(["page-item",{disabled:e.currentPage===e.totalPageCount||e.totalRecords===0}])},[a("a",{class:"page-link",href:"#",onClick:i(v,["prevent"])},j)],2),a("li",{class:r(["page-item",{disabled:e.currentPage===e.totalPageCount||e.totalRecords===0}])},[a("a",{class:"page-link",href:"#",onClick:i(C,["prevent"])},G)],2)])]))}},Q=y(H,[["__scopeId","data-v-8988fc0a"]]);export{Q as P};