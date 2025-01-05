import{B as oe,d as T,r as n,e as l,h as S,w as a,M as A,f as b,j as o,i as P,C as ae,k as p,t as E,F as le,_ as L,v as ne,x as se,c as ue,l as d,m as U,p as ie,z as re}from"./index.f4b8fc03.js";import{d as ce}from"./dayjs.min.6791459c.js";import{c as de,g as pe,t as _e}from"./logistics.e335322a.js";const me={solution:"/common/solution"};function fe(){return oe.get({url:me.solution})}const ve={class:"timeline-custom-content"},ge=T({__name:"TrackDrawer",setup(V,{expose:h}){const f=n(),w=n([]),s=n(!1),r=u=>{s.value=u},v=(u,m)=>{w.value=m,f.value=u,r(!0)},y=()=>{r(!1)},c=async()=>{const u=`https://t.17track.net/#nums=${f.value}`;try{await navigator.clipboard.writeText(u),console.log("Content copied to clipboard"),A.success("\u590D\u5236\u6210\u529F")}catch(m){console.error("Failed to copy: ",m),A.error("\u590D\u5236\u5931\u8D25")}};return h({handleShow:v}),(u,m)=>{const F=l("t-timeline-item"),x=l("t-timeline"),g=l("t-drawer");return b(),S(g,{visible:s.value,onConfirm:c,cancelBtn:"\u5173\u95ED",confirmBtn:"\u590D\u5236\u8F68\u8FF9\u94FE\u63A5",preventScrollThrough:!1,header:f.value,size:"400px",onClose:y},{default:a(()=>[o(x,{mode:"same",theme:"default"},{default:a(()=>[(b(!0),P(le,null,ae(w.value,C=>(b(),S(F,{dotColor:"primary",label:C.time},{default:a(()=>[p("div",null,E(C.desc),1),p("div",ve,E(C.mergeDescription),1)]),_:2},1032,["label"]))),256))]),_:1})]),_:1},8,["visible","header"])}}});var Ce=L(ge,[["__scopeId","data-v-02f5d503"],["__file","C:/code/wp-2024-11-19/admin/fe/src/pages/logistics/components/TrackDrawer.vue"]]);const be={class:"list-common-table"},he={class:"table-action"},ye={class:"right"},De={class:"table-container"},we=["onClick"],Fe=["onClick"],xe="index",Be="top",ke=!0,Se=T({__name:"LogisticsTable",setup(V){const h=ne(),f=[{title:"\u7269\u6D41\u8BA2\u5355\u53F7",fixed:"left",width:180,ellipsis:!0,align:"left",colKey:"orderCode"},{title:"\u672B\u516C\u91CC\u8FD0\u5355\u53F7",width:280,ellipsis:!0,align:"left",colKey:"trackingNumber"},{title:"\u6536\u4EF6\u4EBA",ellipsis:!0,align:"left",colKey:"receiverParam.name",width:130},{title:"\u6536\u4EF6\u5730\u5740",ellipsis:!0,align:"left",colKey:"receiverParam.detailAddress",width:380},{title:"\u521B\u5EFA\u4EBA",width:120,ellipsis:!0,align:"left",colKey:"User.username"},{title:"\u521B\u5EFA\u65F6\u95F4",width:200,ellipsis:!0,align:"left",colKey:"createdAt"},{align:"left",fixed:"right",width:200,colKey:"op",title:"\u64CD\u4F5C"}],s=n({...{orderCode:void 0,solutionCode:void 0}}),r=n({pageSize:20,total:0,current:1}),v=n(!1),y=n([]),c=n(!1),u=async()=>{c.value=!0;try{const{data:t}=await pe({page:r.value.current,pageSize:r.value.pageSize,orderCode:s.value.orderCode,solutionCode:s.value.solutionCode});y.value=t.rows,r.value={current:t.page,pageSize:t.pageSize,total:t.count}}catch(t){console.log(t),c.value=!1}finally{c.value=!1}},m=()=>{g.value=void 0},F=async()=>{try{const t=g.value;(await de({orderCode:t})).code===0&&A.success("Success!")}catch(t){console.log(t)}finally{v.value=!1}m()},x=()=>{m()},g=n(),C=({row:t})=>{g.value=t.orderCode,v.value=!0},R=t=>{console.log(t)},I=t=>{t.validateResult&&u(),console.log(t)},O=t=>{r.value.current=t.current,r.value.pageSize=t.pageSize,u()},Y=se(()=>({offsetTop:h.isUseTabsRouter?48:0,container:`.${re}-layout`})),z=n("all"),G=t=>{z.value=t},W=()=>{window.open(location.origin+"/#/logistics/edit","_blank")},K=n([]),j=()=>{fe().then(t=>{K.value=t.data,s.value.solutionCode="CN_GLO_STD",u()})},M=n(),H=({row:t})=>{c.value=!0;const e=t.orderCode;_e({orderCode:e}).then(_=>{c.value=!1,_.code===0&&M.value.handleShow(e,_.data.traceDetailList)}).catch(()=>{c.value=!1})};return ue(()=>{j()}),(t,e)=>{const _=l("t-tab-panel"),q=l("t-tabs"),J=l("t-input"),Q=l("t-input-adornment"),N=l("t-form-item"),D=l("t-col"),X=l("t-select"),$=l("t-row"),B=l("t-button"),Z=l("t-form"),ee=l("t-table"),te=l("t-dialog");return b(),P("div",null,[o(q,{value:z.value,theme:"normal",style:{padding:"12px 32px"},onChange:G},{default:a(()=>[o(_,{value:"all"},{label:a(()=>e[3]||(e[3]=[d(" \u5168\u90E8 ")])),_:1}),o(_,{value:"pending"},{label:a(()=>e[4]||(e[4]=[d(" \u5F85\u53D1\u8D27 ")])),_:1}),o(_,{value:"transport"},{label:a(()=>e[5]||(e[5]=[d(" \u8FD0\u9001\u4E2D ")])),_:1}),o(_,{value:"finally"},{label:a(()=>e[6]||(e[6]=[d(" \u5DF2\u5B8C\u6210 ")])),_:1}),o(_,{value:"warn"},{label:a(()=>e[7]||(e[7]=[d(" \u5F02\u5E38\u8BA2\u5355 ")])),_:1})]),_:1},8,["value"]),p("div",be,[o(Z,{ref:"form",data:s.value,"label-width":0,colon:"",style:{marginBottom:"8px"},onReset:R,onSubmit:I},{default:a(()=>[o($,null,{default:a(()=>[o(D,{span:10},{default:a(()=>[o($,{gutter:[16,24]},{default:a(()=>[o(D,{span:3},{default:a(()=>[o(N,{name:"orderCode"},{default:a(()=>[o(Q,{prepend:"\u7269\u6D41\u8BA2\u5355\u53F7",class:"form-item-content",style:{minWidth:"134px",width:"100%"}},{default:a(()=>[o(J,{modelValue:s.value.orderCode,"onUpdate:modelValue":e[0]||(e[0]=i=>s.value.orderCode=i),type:"search",clearable:"",placeholder:"\u8BF7\u8F93\u5165\u7269\u6D41\u8BA2\u5355\u53F7"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),o(D,{span:3},{default:a(()=>[o(N,{name:"solutionCode"},{default:a(()=>[o(X,{modelValue:s.value.solutionCode,"onUpdate:modelValue":e[1]||(e[1]=i=>s.value.solutionCode=i),class:"form-item-content",options:K.value,placeholder:"\u7269\u6D41\u65B9\u6848",clearable:""},null,8,["modelValue","options"])]),_:1})]),_:1}),U(` <t-col :span="3">\r
                <t-form-item name="no">\r
                  <t-input\r
                    v-model="formData.no"\r
                    class="form-item-content"\r
                    placeholder="\u7269\u6D41\u72B6\u6001"\r
                    :style="{ minWidth: '134px' }"\r
                  />\r
                </t-form-item>\r
              </t-col> `)]),_:1})]),_:1}),o(D,{span:2,class:"operation-container"},{default:a(()=>[o(B,{theme:"primary",type:"submit",style:{marginLeft:"8px"}},{default:a(()=>e[8]||(e[8]=[d(" \u67E5\u8BE2 ")])),_:1}),o(B,{type:"reset",variant:"base",theme:"default"},{default:a(()=>e[9]||(e[9]=[d(" \u91CD\u7F6E ")])),_:1})]),_:1})]),_:1})]),_:1},8,["data"]),p("div",he,[e[11]||(e[11]=p("div",null,null,-1)),p("div",ye,[o(B,{theme:"primary",onClick:W},{default:a(()=>e[10]||(e[10]=[d("\u521B\u5EFA\u7269\u6D41\u5355")])),_:1})])]),p("div",De,[o(ee,{data:y.value,columns:f,"row-key":xe,"vertical-align":Be,hover:ke,pagination:r.value,loading:c.value,"header-affixed-top":Y.value,onPageChange:O},{createdAt:a(({col:i,row:k})=>[d(E(ie(ce)(k[i.colKey]).format("YYYY-MM-DD HH:mm:ss")),1)]),op:a(i=>[U(' <a class="t-button-link" @click="rehandleClickOp(slotProps)">\u7BA1\u7406</a> '),p("a",{class:"t-button-link",onClick:k=>H(i)},"\u67E5\u770B\u7269\u6D41\u8F68\u8FF9",8,we),p("a",{class:"t-button-link",onClick:k=>C(i)},"\u53D6\u6D88\u8BA2\u5355",8,Fe)]),_:1},8,["data","pagination","loading","header-affixed-top"]),o(te,{visible:v.value,"onUpdate:visible":e[2]||(e[2]=i=>v.value=i),header:"Warn",body:"\u786E\u8BA4\u53D6\u6D88\u5F53\u524D\u6240\u9009\u7269\u6D41\u5355\u5417\uFF1F","on-cancel":x,onConfirm:F},null,8,["visible"])])]),o(Ce,{ref_key:"trackDrawerRef",ref:M},null,512)])}}});var Ae=L(Se,[["__scopeId","data-v-d63b6438"],["__file","C:/code/wp-2024-11-19/admin/fe/src/pages/logistics/components/LogisticsTable.vue"]]);const Ee={name:"LogisticsIndex"},Te=T({...Ee,setup(V){return(h,f)=>(b(),S(Ae))}});var Ke=L(Te,[["__file","C:/code/wp-2024-11-19/admin/fe/src/pages/logistics/index.vue"]]);export{Ke as default};