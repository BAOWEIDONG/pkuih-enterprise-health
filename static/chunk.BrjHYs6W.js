(()=>{const y={users:"pkuih_h6_users",session:"pkuih_h6_session",appointments:"pkuih_h6_appointments",demands:"pkuih_h6_demands",institutionAccounts:"pkuih_h6_institution_accounts",adminAccounts:"pkuih_h6_admin_accounts",adminSession:"pkuih_h6_admin_session",doctorConfig:"pkuih_h6_doctor_config",themeConfig:"pkuih_h6_theme_config",planTemplates:"pkuih_h6_plan_templates",slots:"pkuih_h6_slots",pushCopies:"pkuih_h6_sms_logs",marketingPosters:"pkuih_h6_marketing_posters",hospitalConfig:"pkuih_h6_hospital_config",hospitalCustom:"pkuih_h6_hospital_custom",homeRegion:"pkuih_h6_home_region",homeHospital:"pkuih_h6_home_hospital",lastPortal:"pkuih_h6_portal",operationLogs:"pkuih_h6_operation_logs",seed:"pkuih_h6_seed",sessionMeta:"pkuih_h6_session_meta",bookingLock:"pkuih_h6_booking_lock",notifications:"pkuih_h6_notifications"},qo="888888",Pn=window.PKUHI_CONFIG?.clientVersion||"20261126-9",X="13800000001",E={phone:X,contactPhone:X,name:"王经理",orgName:"示例保险有限公司",orgType:"保险公司",title:"客户健康负责人",email:"wangjingli@example.com",province:"北京市",city:"北京市"},Vo=[{phone:X,name:"王经理",orgName:"示例保险有限公司",orgType:"保险公司",title:"客户健康负责人",contactPhone:X,email:"wangjingli@example.com",province:"北京市",city:"北京市",active:!0},{phone:"13800000009",name:"全链路验收",orgName:"全链路测试集团",orgType:"企业",title:"员工健康负责人",contactPhone:"13800000009",email:"qa.fullflow@example.com",province:"北京市",city:"北京市",active:!0},{phone:"13800138000",name:"王测试",orgName:"测试保险有限公司",orgType:"保险公司",title:"健康服务经理",contactPhone:"13800138000",email:"qa.client@example.com",province:"北京市",city:"北京市",active:!0},{phone:"13911112222",name:"李老师",orgName:"华北企业健康中心",orgType:"企业",title:"人力资源负责人",contactPhone:"13911112222",email:"qa.north@example.com",province:"北京市",city:"北京市",active:!0},{phone:"13911113333",name:"赵老师",orgName:"华东员工关怀中心",orgType:"企业",title:"员工关怀负责人",contactPhone:"13911113333",email:"qa.east@example.com",province:"上海市",city:"上海市",active:!0},{phone:"13900000001",name:"孙老师",orgName:"大湾区企业健康服务有限公司",orgType:"保险公司",title:"客户服务负责人",contactPhone:"13900000001",email:"qa.south@example.com",province:"广东省",city:"深圳市",active:!0}],ia="https://baoweidong.github.io/pkuih-enterprise-health/",Ko=20*1024*1024,Ye={neutral:"assets/avatars/doctor-neutral.svg",male:"assets/avatars/doctor-male.svg",maleSenior:"assets/avatars/doctor-male-senior.svg",female:"assets/avatars/doctor-female.svg",femaleSenior:"assets/avatars/doctor-female-senior.svg"};let Pt=new Map;const Ge={elite:{id:"elite",name:"第一梯队 · 大咖医生",short:"大咖医生",tag:"旗舰资源",leadDays:30,desc:"国家级学会主委、学科领军与院级专家，适合重要客户答谢与年度健康峰会。"},director:{id:"director",name:"第二梯队 · 主任专家",short:"主任专家",tag:"专题定制",leadDays:14,desc:"院长、知名中医、功能医学与全科专家，适合专题讲堂与专家面对面。"},specialist:{id:"specialist",name:"第三梯队 · 专业医生",short:"专业医生",tag:"快速响应",leadDays:7,desc:"各科室骨干医生，适合员工健康课堂、科室科普与现场健康咨询。"}},Ie=["elite","director","specialist"],Ce=["specialist","director","elite"],Ha={讲座:{id:"讲座",label:"讲座",desc:"主题分享 + 现场问答"},健康咨询:{id:"健康咨询",label:"健康咨询",desc:"健康筛查 + 现场咨询"},"1V1报告解读":{id:"1V1报告解读",label:"1V1报告解读",desc:"报告解读 · 一对一咨询"}},Pe=["讲座","健康咨询","1V1报告解读"],Lt=["保险公司","银行","证券","基金","信托","企业","事业单位","其他机构"],oa={pending:{label:"待接单",cls:"is-pending",help:"已提交，等待院方接单"},planning:{label:"方案制作中",cls:"is-planning",help:"院方已接单，正在确认方案"},review:{label:"方案待确认",cls:"is-review",help:"院方已提交方案，请确认"},revision:{label:"待修改",cls:"is-revision",help:"已提交修改意见，等待院方更新"},confirmed:{label:"已确认",cls:"is-confirmed",help:"方案已确认，等待活动执行"},completed:{label:"已完成",cls:"is-done",help:"活动已完成"},cancelled:{label:"已取消",cls:"is-cancelled",help:"预约已取消"}},sa={pending:{label:"待联系",cls:"is-pending"},contacted:{label:"已联系",cls:"is-planning"},matched:{label:"已匹配",cls:"is-confirmed"},converted:{label:"已生成预约",cls:"is-confirmed"},closed:{label:"已关闭",cls:"is-cancelled"},cancelled:{label:"已取消",cls:"is-cancelled"}};function ra(e){return e?e.convertedAppointmentId&&e.status==="matched"?sa.converted:sa[e.status]||sa.pending:sa.pending}const Et={superadmin:{label:"超级管理员",short:"超管",desc:"全部医院、专家、号源与账号权限"},operator:{label:"医院运营",short:"运营",desc:"维护本院专家号源，接单并跟进项目"}},Ln=[{username:"admin",password:"pkuih2026",name:"李老师",phone:"13800009999",role:"superadmin",hospitalId:"",active:!0},{username:"pkuih",password:"pkuih2026",name:"周老师",phone:"13800001111",role:"operator",hospitalId:"pkuih",active:!0},{username:"shenzhen",password:"pkuih2026",name:"陈老师",phone:"13800002222",role:"operator",hospitalId:"shenzhen",active:!0},{username:"health",password:"pkuih2026",name:"赵老师",phone:"13800003333",role:"operator",hospitalId:"health",active:!0},{username:"rehab",password:"pkuih2026",name:"孙老师",phone:"13800004444",role:"operator",hospitalId:"rehab",active:!0},{username:"ocean",password:"pkuih2026",name:"刘老师",phone:"13800005555",role:"operator",hospitalId:"ocean",active:!0},{username:"zibo",password:"pkuih2026",name:"王老师",phone:"13800006666",role:"operator",hospitalId:"zibo",active:!0},{username:"luzhong",password:"pkuih2026",name:"张老师",phone:"13800007777",role:"operator",hospitalId:"luzhong",active:!0},{username:"luan",password:"pkuih2026",name:"杨老师",phone:"13800008888",role:"operator",hospitalId:"luan",active:!0},{username:"kaide",password:"pkuih2026",name:"胡老师",phone:"13800001234",role:"operator",hospitalId:"kaide",active:!0}],a={loaded:!1,loadError:"",experts:[],baseExperts:[],hospitals:[],seasonal:[],themeMatches:[],chinaCities:{},tab:"home",screen:"main",session:null,sessionRevoked:"",sessionMeta:null,sessionCheckAt:0,adminAuthed:!1,adminUser:null,homeHospitalId:"",homeRegion:null,homeRegionDraft:null,geoStatus:"idle",geoLat:null,geoLng:null,geoAccuracy:0,geoHospitalId:"",geoDistanceKm:null,geoError:"",expertScope:"nearby",expertHospitalId:"",expertTier:"all",expertService:"all",expertMonth:0,expertDept:"all",expertAvailability:"bookable",expertSearch:"",expertSearchOpen:!1,expertVisited:!1,appointmentFilter:"all",clientRecordTab:"bookings",demandFilter:"all",booking:null,bookingSubmitting:!1,login:{step:1,phone:"",code:"",agree:!1,name:"",orgName:"",orgType:"保险公司",title:"",contactPhone:"",email:"",province:"北京市",city:"北京市",error:""},pendingAuth:null,codeTimer:null,codeCountdown:0,overlay:null,overlayStack:[],overlayScrollY:null,overlayScrollMemory:{},paintedOverlayKey:"",posterId:"",posterViewUrl:"",planPdfView:null,planPptView:null,pptxPreviewer:null,profileDraft:null,adminTab:"appointments",adminFilter:"all",adminOwnerScope:"all",adminSearch:"",adminDoctorSearch:"",adminThemeMonth:0,adminThemeDraft:null,adminDemandFilter:"all",adminHospitalId:"",adminReviewId:"",adminDraft:null,adminNoteEditing:!1,adminReviewSaved:!1,reviewSaving:!1,adminDemandId:"",adminDemandDraft:null,appointmentLocationDraft:null,slotDoctorId:"",slotMonth:"",slotMonthDoctor:"",slotDraft:null,slotScope:"one",slotBatch:{from:"",to:"",weekdays:[1,2,3,4,5],capacity:2,scope:"one"},slotDay:"",adminAccountDraft:null,institutionAccountDraft:null,adminDoctorDraft:null,hospitalPhoneDraft:null,hospitalEditorDraft:null,mapPickerDraft:null,adminTemplateDraft:null,marketingFilter:"all",marketingDraft:null,viewScroll:{main:{},admin:{}},historyDepth:0,overlayHistoryDepth:0,suppressPopCount:0,historyNavToken:0,historyNavTarget:null,authHistory:!1,adminHistory:!1,reuseHistoryForOverlay:!1,renderedOnce:!1},De=document.getElementById("app"),V=document.getElementById("overlay-root"),ca=document.getElementById("toast");function s(e){return String(e??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"})[t])}function R(e,t){return window.PkuihApi?.storage.readJSON(e,t)??t}function T(e,t){const n=window.PkuihApi?.storage.writeJSON(e,t)===!0;return n||d("浏览器存储不可用，本次操作仅在当前页面有效。"),n}function Ze(e){return window.PkuihApi?.storage.remove(e)===!0}function Je(e){return JSON.parse(JSON.stringify(e))}const se=e=>String(e).padStart(2,"0");function O(e=new Date){return new Date(e.getFullYear(),e.getMonth(),e.getDate(),12,0,0,0)}function M(e,t){const n=new Date(e);return n.setDate(n.getDate()+t),n}function N(e){return`${e.getFullYear()}-${se(e.getMonth()+1)}-${se(e.getDate())}`}function he(e){if(!e)return null;if(e instanceof Date)return e;const t=String(e).match(/^(\d{4})-(\d{2})-(\d{2})$/);return t?new Date(Number(t[1]),Number(t[2])-1,Number(t[3]),12,0,0,0):null}function Le(e){const t=he(e);return t?`${se(t.getMonth()+1)}.${se(t.getDate())}`:"--.--"}function P(e,t=!1){const n=he(e);return n?`${n.getFullYear()}年${n.getMonth()+1}月${n.getDate()}日${t?` ${En(n)}`:""}`:"待确认"}function En(e){return e?`周${["日","一","二","三","四","五","六"][e.getDay()]}`:"待定"}function pe(e){const t=e?new Date(e):null;return!t||Number.isNaN(t.getTime())?"":`${t.getFullYear()}-${se(t.getMonth()+1)}-${se(t.getDate())} ${se(t.getHours())}:${se(t.getMinutes())}`}function Rt(e){const t=Number(e)||0;return t<=0?"大小未知":t<1024*1024?`${Math.max(1,Math.round(t/1024))} KB`:`${(t/(1024*1024)).toFixed(t>=10*1024*1024?0:1)} MB`}function Rn(){return/MicroMessenger/i.test(navigator.userAgent||"")}function Qe(e){return String(e||"企").trim().slice(0,1)||"企"}function On(e,t=260){const n=String(e||"").replace(/\s+/g," ").trim();if(n.length<=t)return n;const i=n.slice(0,t),o=Math.max(i.lastIndexOf("。"),i.lastIndexOf("；"),i.lastIndexOf("，"));return o>t*.55?i.slice(0,o+1):`${i}…`}function Ot(e){return`tel:${String(e||"").replace(/[^\d+]/g,"")}`}function C(e="",t=""){const n=String(e||"").trim(),i=String(t||"").trim();if(!n)return i;if(!i)return n;const o=r=>r.replace(/(壮族自治区|回族自治区|维吾尔自治区|特别行政区|自治区|省|市|地区|盟|自治州)$/g,"");return n===i||o(n)===o(i)||o(n)===i||n===o(i)?n:`${n}${i}`}function H(e="北京市",t=""){const n=String(e||"北京市").trim()||"北京市",i=String(t||n).trim()||n,o=Object.keys(a.chinaCities||{});let r=n;o.length&&!o.includes(r)&&(r=o.find(u=>u.startsWith(r)||r.startsWith(u))||o[0]);const c=a.chinaCities?.[r]||[r];let p=i;return c.length&&!c.includes(p)&&(p=c.find(u=>u.startsWith(p)||p.startsWith(u))||c[0]||r),{province:r,city:p}}function et(e="",t="",n="",i=""){const o=C(e,t);let r=String(n||"").trim();const c=[o,e,t].map(h=>String(h||"").trim()).filter(Boolean).sort((h,m)=>m.length-h.length);for(let h=0;h<3;h+=1){const m=r;if(c.forEach(v=>{r.startsWith(v)&&(r=r.slice(v.length).replace(/^[\s,，]+/,""))}),r===m)break}return`${[o,r].filter(Boolean).join(" ")}${i?` · ${i}`:""}`.trim()}function ee(e,t=e,n="tel-link"){return e?`<a class="${n}" href="${s(Ot(e))}">${s(t||e)}</a>`:"待补充"}function Hn(e){const t=new Date;return`${e}-${t.getFullYear()}${se(t.getMonth()+1)}${se(t.getDate())}-${String(Math.floor(Math.random()*9e3+1e3))}`}function la(e="req"){try{if(window.crypto?.randomUUID)return`${e}-${window.crypto.randomUUID()}`}catch{}return`${e}-${Date.now()}-${Math.random().toString(36).slice(2,10)}`}function Te(){return N(O())}function B(){return new Date().getMonth()+1}function da(e,t=180){let n=0;return(...i)=>{window.clearTimeout(n),n=window.setTimeout(()=>e(...i),t)}}function d(e){ca&&(ca.innerHTML=`${l("checkCircle",16)}<span>${s(e)}</span>`,ca.classList.add("is-visible"),window.clearTimeout(d.timer),d.timer=window.setTimeout(()=>ca.classList.remove("is-visible"),2800))}function Ba(){return R(y.users,[])}function zo(e){T(y.users,e)}function xe(e){return Ba().find(t=>t.phone===e)||null}function Ee(e){const t=Ba(),n=t.findIndex(o=>o.phone===e.phone),i={...e,updatedAt:new Date().toISOString()};return n>=0?t[n]=i:t.push(i),zo(t),i}function dt(e={}){const t=String(e.phone||"").replace(/\s+/g,""),n=H(e.province||"北京市",e.city||e.province||"北京市");return{phone:t,name:String(e.name||"").trim(),orgName:String(e.orgName||"").trim(),orgType:String(e.orgType||"").trim(),title:String(e.title||"").trim(),contactPhone:String(e.contactPhone||t).replace(/\s+/g,""),email:String(e.email||"").trim(),province:n.province,city:n.city,active:e.active!==!1,source:e.source||"manual",createdAt:e.createdAt||new Date().toISOString(),updatedAt:e.updatedAt||new Date().toISOString()}}function pa(){let e=R(y.institutionAccounts,null);if(!Array.isArray(e)){const t=Ba().map(i=>dt({...i,source:"legacy"}));e=[...Vo,...t].reduce((i,o)=>{const r=dt(o);return r.phone&&!i.some(c=>c.phone===r.phone)&&i.push(r),i},[]),T(y.institutionAccounts,e)}return e.map(dt)}function Bn(e){T(y.institutionAccounts,(e||[]).map(dt))}function ye(e){return pa().find(t=>t.phone===String(e||"").replace(/\s+/g,""))||null}function Wo(e){const t=dt(e),n=pa(),i=n.findIndex(r=>r.phone===t.phone),o={...t,createdAt:i>=0?n[i].createdAt:t.createdAt,updatedAt:new Date().toISOString()};return i>=0?n[i]=o:n.push(o),Bn(n),o}function Ht(e){const t=ye(e?.phone);return t?Wo({...t,name:e.name||t.name,orgName:e.orgName||t.orgName,orgType:e.orgType||t.orgType,title:e.title||t.title,contactPhone:e.contactPhone||t.contactPhone,email:e.email||t.email,province:e.province||t.province,city:e.city||t.city}):null}function jn(e=""){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(e||"").trim())}function Un(e={}){const t=[];String(e.name||"").trim()||t.push("请填写姓名"),String(e.title||"").trim()||t.push("请填写职务"),String(e.orgName||"").trim()||t.push("请填写单位名称"),Lt.includes(e.orgType)||t.push("请选择机构类型");const n=String(e.contactPhone||e.phone||"").trim();n?/^1\d{10}$/.test(n)||t.push("联系方式格式不正确"):t.push("请填写联系方式");const i=String(e.email||"").trim();return i?jn(i)||t.push("通知邮箱格式不正确"):t.push("请填写通知邮箱"),t}function ja(e){const t=Un(e);return t.length?`${t.join("、")}。`:""}function tt(e=a.session){if(a.homeRegion?.province)return H(a.homeRegion.province,a.homeRegion.city);if(a.geoStatus==="ready"&&a.geoHospitalId){const t=k(a.geoHospitalId);if(t)return H(t.province,t.city)}return e?.province?H(e.province,e.city):ae()}function Fn(e={}){const t=tt(e);a.login.name=e.name||"",a.login.orgName=e.orgName||"",a.login.orgType=e.orgType||"",a.login.title=e.title||"",a.login.contactPhone=e.contactPhone||e.phone||a.login.phone,a.login.email=e.email||"",a.login.province=t.province,a.login.city=t.city}function Ua(){if(!a.session)return;const e=tt(a.session);if(a.session.province===e.province&&a.session.city===e.city)return;const t=Ee({...a.session,province:e.province,city:e.city});Fa(t),Ht(t)}function Fa(e){a.session=e,T(y.session,e),T(y.sessionMeta,{phone:e?.phone||"",checkedAt:new Date().toISOString(),accountUpdatedAt:ye(e?.phone)?.updatedAt||""})}function qn(){a.session=null,Ze(y.session),Ze(y.sessionMeta)}function Xo(e,{silent:t=!1}={}){const n=!!a.session;return qn(),a.sessionRevoked=e,a.sessionCheckAt=Date.now(),a.booking=null,a.overlay&&(ue(),F()),a.screen="main",a.tab="home",n&&!t&&(d(e),g({scrollTo:0})),!1}function qa({silent:e=!1,resume:t=!1}={}){if(!a.session)return!0;const n=ye(a.session.phone),i=n?n.active===!1?"该机构账号已被院方停用，请联系超级管理员。":"":"该机构账号已不在白名单中，登录状态已失效。";return i?Xo(i,{silent:e}):(a.sessionRevoked="",a.sessionCheckAt=Date.now(),T(y.sessionMeta,{phone:a.session.phone,checkedAt:new Date().toISOString(),accountUpdatedAt:n.updatedAt||"",resume:!!t}),!0)}function at(){let e=R(y.adminAccounts,null);if(!Array.isArray(e)||!e.length)return e=Je(Ln).map(n=>({...n,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()})),T(y.adminAccounts,e),e;const t=R(y.seed,{});if(!t.adminOperatorsV2){const n=new Set(e.map(o=>o.username)),i=Ln.filter(o=>!n.has(o.username)).map(o=>({...o,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()}));i.length&&(e=e.concat(i),T(y.adminAccounts,e)),T(y.seed,{...t,adminOperatorsV2:!0})}return e}function Vn(e){return(e||[]).some(t=>t.role==="superadmin"&&t.active)}function Yo(e){return Vn(e)?T(y.adminAccounts,e):!1}function Va(e){a.adminAuthed=!0,a.adminUser=e,T(y.adminSession,{username:e.username,at:new Date().toISOString()})}function Ka(){a.adminAuthed=!1,a.adminUser=null,Ze(y.adminSession)}function w(){return a.adminUser?.role==="superadmin"}function ve(e){return a.adminUser?w()?!0:!!e&&a.adminUser.hospitalId===e:!1}function $e(){return a.adminUser?w()?a.adminHospitalId?k(a.adminHospitalId):null:a.hospitals.find(e=>e.id===a.adminUser.hospitalId)||null:null}function Bt(e){T(y.lastPortal,e)}function Kn(){return R(y.doctorConfig,{overrides:{},added:[],removed:[]})}function Go(e){T(y.doctorConfig,e)}function zn(){const e=Kn(),t=new Set(e.removed||[]),n=a.baseExperts.filter(o=>!t.has(o.id)).map(o=>({...o,...e.overrides?.[o.id]||{}})),i=(e.added||[]).map(o=>({...o,custom:!0}));a.experts=n.concat(i).map(o=>({...o,services:Qn(o.services)})),Pt.clear()}function D(e){return a.experts.find(t=>String(t.id)===String(e))||null}function k(e){return a.hospitals.find(t=>t.id===e)||null}function Wn(){return R(y.hospitalConfig,{})}function Xn(){const e=R(y.hospitalCustom,null);return e&&Array.isArray(e.added)?{added:e.added,removed:Array.isArray(e.removed)?e.removed:[]}:{added:[],removed:[]}}function Yn(e){T(y.hospitalCustom,{added:e.added||[],removed:e.removed||[]})}function Zo(e){const t=Wn(),n=Xn(),i=new Set(n.removed||[]);return e.filter(o=>!i.has(o.id)).map(o=>({...o,...t?.[o.id]||{}})).concat((n.added||[]).map(o=>({...o,custom:!0})))}function Gn(e,t){const n=Wn();n[e]={...n[e]||{},...t},T(y.hospitalConfig,n)}function Jo(e){const t=k(e);return t?Je(t):null}function Qo(e={}){const t=H(e.province||"北京市",e.city||e.province||"北京市");return{id:String(e.id||"").trim(),name:String(e.name||"").trim(),short:String(e.short||"").trim(),province:t.province,city:t.city,region:C(t.province,t.city),address:String(e.address||"").trim(),phone:String(e.phone||"").trim(),lat:Number(e.lat),lng:Number(e.lng),flagship:!!e.flagship,active:e.active!==!1,custom:!!e.custom}}function es(e){const t=Qo(e),n=[];if(t.name||n.push("医院名称"),t.short||n.push("简称"),t.address||n.push("详细地址"),t.phone||n.push("联系电话"),(!Number.isFinite(t.lat)||t.lat<3||t.lat>54)&&n.push("纬度（3–54）"),(!Number.isFinite(t.lng)||t.lng<73||t.lng>136)&&n.push("经度（73–136）"),n.length)return{error:`请检查：${n.join("、")}`};const i=Xn(),o=k(t.id);return o?(o.custom?(i.added=i.added.map(r=>r.id===t.id?{...r,...t}:r),Yn(i)):Gn(t.id,{name:t.name,short:t.short,province:t.province,city:t.city,region:t.region,address:t.address,phone:t.phone,lat:t.lat,lng:t.lng,flagship:t.flagship}),a.hospitals=a.hospitals.map(r=>r.id===t.id?{...r,...t}:r),{hospital:t,created:!1}):(t.id=`hospital-${Date.now()}`,t.custom=!0,i.added=[...i.added,t],Yn(i),a.hospitals=a.hospitals.concat(t),{hospital:t,created:!0})}function jt(e){return`${e}?v=${Pn}`}function ke(e){return e?e.photoCard?e.photoCard:e.photo?e.photo:e.gender==="female"?jt(e.senior?Ye.femaleSenior:Ye.female):e.gender==="male"?jt(e.senior?Ye.maleSenior:Ye.male):jt(Ye.neutral):jt(Ye.neutral)}function ts(e=""){const t=String(e||"").trim();return t?t.includes("全国")||t.includes("省外")||t.includes("京外")?["全国"]:t.includes("北京")?["北京市"]:t.includes("天津")?["天津市"]:t.includes("深圳")?["深圳市"]:t.includes("山东")?["山东省"]:t.includes("山西")?["山西省"]:t.includes("湖南")?["湖南省"]:[t]:[]}function pt(e){const t=Array.isArray(e?.coverageCities)?e.coverageCities.filter(Boolean):[];if(t.length)return t;const n=String(e?.coverage||"").trim(),i={北京:"北京市",天津:"天津市",深圳:"深圳市",山东省:"山东省",山东省内:"山东省",山西:"山西省",湖南:"湖南省"};return i[n]?[i[n]]:ts(e?.coverage)}function te(e){const t=Array.isArray(e)?e.filter(Boolean):pt(e);return t.length?t.includes("全国")?"全国":t.length<=3?t.join(" / "):`${t.slice(0,2).join(" / ")} 等 ${t.length} 城`:"待配置"}function nt(e,t="",n=""){const i=pt(e);if(i.includes("全国"))return!0;const o=p=>String(p||"").trim().replace(/(壮族自治区|回族自治区|维吾尔自治区|特别行政区|自治区|省|市|地区|盟|自治州)$/g,""),r=o(t),c=o(n);return i.some(p=>{const u=o(p);return!!u&&(u===c||u===r)})}function za(e,t,n="",i="",o=""){if(!e||!Number(t))return!1;const r=o||e.hospitalId,c=ne(r,t);if(!c)return!1;const p=(c.topics||[]).filter(h=>String(h.expertId||"")===String(e.id));return p.length?p.some(h=>we(ie(h,c,r),n,i)):(c.expertIds||[]).some(h=>String(h||"")===String(e.id))?we({cities:Zn(c,r)},n,i):!1}function Wa(e=""){const t=String(e||"").trim();if(!t)return[];if(/全国|京外|省外/.test(t))return["全国"];const n=[],i=o=>{n.includes(o)||n.push(o)};return t.includes("北京")&&i("北京市"),t.includes("天津")&&i("天津市"),t.includes("深圳")&&i("深圳市"),t.includes("山东")&&i("山东省"),t.includes("山西")&&i("山西省"),t.includes("湖南")&&i("湖南省"),n.length?n:[t]}function ua(e=[]){const t=e.flat().filter(Boolean);return t.some(n=>String(n).includes("全国"))?["全国"]:[...new Set(t)]}function ut(e,t,n=""){const i=e?.expertId?D(e.expertId):null;let o=Array.isArray(e?.coverageCities)?e.coverageCities.filter(Boolean):[],r=String(e?.coverage||"").trim();if(!o.length&&r&&(o=Wa(r)),!o.length){const c=k(n);r=a.themeMatches.find(u=>!(Number(u.month)!==Number(t?.month)||String(u.topic||"")!==String(e?.title||"")||i&&u.doctor!==i.name||c?.name&&u.hospital!==c.name&&!u.hospital?.includes(c.name)&&!c.name.includes(u.hospital)))?.coverage||"",r&&(o=Wa(r))}return{cities:ua(o).filter(Boolean),label:String(r||"").trim()}}function ie(e,t,n=""){const i=ut(e,t,n);return{label:Jn(i.cities.length?te(i.cities):i.label||"待配置"),cities:i.cities}}function Zn(e,t=""){const n=(e?.topics||[]).flatMap(i=>ie(i,e,t).cities);return ua(n.length?n:e?.coverageCities||[])}function as(e,t=""){return[...new Set((e?.topics||[]).map(n=>ie(n,e,t).label).filter(Boolean))]}function Jn(e){const t=String(e||"").trim();return/全国|京外|省外/.test(t)?"全国":t}function ns(e,t=""){const n=as(e,t);return n.length===1?n[0]:n.length>1?`${n.length} 类`:te(Zn(e,t))}function we(e,t="",n=""){const i=e?.cities||[];if(i.includes("全国"))return!0;const o=p=>String(p||"").trim().replace(/(壮族自治区|回族自治区|维吾尔自治区|特别行政区|自治区|省|市|地区|盟|自治州)$/g,""),r=o(t),c=o(n);return i.some(p=>{const u=o(p);return!!u&&(u===c||u===r)})}function is(e){return e?e.photoDetail||ke(e):jt(Ye.neutral)}function Y(e){return Ge[e?.tier]||Ge.specialist}function L(e){const t=q(e);return Ha[t]?.label||e}function q(e){const t=String(e||"").replace(/\s+/g,"").trim(),n=t.toLowerCase();return["讲座","健康讲座"].includes(t)?"讲座":["巡诊","健康咨询"].includes(t)?"健康咨询":["1对1","1v1","1v1报告解读","报告解读","1v1报告解读"].includes(n)||["1对1","1V1报告解读"].includes(t)?"1V1报告解读":t}function Qn(e){return[...new Set((Array.isArray(e)?e:[]).map(q).filter(Boolean))]}function os(e=a.session){const t=e?.province||"北京",n=e?.city||"北京",i=String(t).replace(/(壮族自治区|回族自治区|维吾尔自治区|特别行政区|自治区|省|市|地区|盟|自治州)$/g,"");return n.includes("深圳")?k("shenzhen"):n.includes("天津")?k("ocean"):n.includes("淄博")?k(i==="山东"?"luzhong":"pkuih"):n.includes("长治")?k("luan"):n.includes("株洲")?k("kaide"):k(i==="北京"?"pkuih":i==="天津"?"ocean":i==="山东"?"luzhong":i==="山西"?"luan":i==="湖南"?"kaide":i==="广东"?"shenzhen":"pkuih")}function Xa(e,t,n,i){const o=u=>Number(u)*Math.PI/180,r=o(n-e),c=o(i-t),p=Math.sin(r/2)**2+Math.cos(o(e))*Math.cos(o(n))*Math.sin(c/2)**2;return 6371*2*Math.atan2(Math.sqrt(p),Math.sqrt(1-p))}function ss(e,t){const n=a.hospitals.filter(i=>Number.isFinite(Number(i.lat))&&Number.isFinite(Number(i.lng)));return n.length?n.map(i=>({hospital:i,distance:Xa(e,t,i.lat,i.lng)})).sort((i,o)=>i.distance-o.distance)[0]:null}function K(e=a.session){const t=a.homeHospitalId?k(a.homeHospitalId):null;if(t)return t;const n=a.geoHospitalId?k(a.geoHospitalId):null;return n||os(e)}function mt(){return a.expertHospitalId&&k(a.expertHospitalId)||K()}function ae(){if(a.homeRegion?.province)return H(a.homeRegion.province,a.homeRegion.city);if(a.geoStatus==="ready"){const t=a.geoHospitalId?k(a.geoHospitalId):null;if(t)return H(t.province,t.city)}if(a.session?.province)return H(a.session.province,a.session.city);const e=K();return e?H(e.province,e.city):H(a.session?.province||"北京市",a.session?.city||"北京市")}function ei(e){const t=H(e?.province,e?.city),n=a.hospitals.find(o=>ma(o,t));return n||a.hospitals.find(o=>H(o.province,o.city).province===t.province)||a.hospitals[0]||null}function ma(e,t){if(!e||!t?.province)return!1;const n=H(e.province,e.city),i=H(t.province,t.city);return n.province===i.province&&n.city===i.city}function rs(e){const t=H(e?.province,e?.city);a.homeRegion=t,a.expertHospitalId="",T(y.homeRegion,t);const n=ei(t);return a.homeHospitalId=n?.id||"",Ya(a.homeHospitalId),a.expertScope="nearby",Ua(),n}function Ya(e){e?T(y.homeHospital,e):Ze(y.homeHospital)}function ti(e,{announce:t=!0}={}){const n=k(e);a.homeHospitalId=n?n.id:"",Ya(a.homeHospitalId),n&&(a.homeRegion=H(n.province,n.city),T(y.homeRegion,a.homeRegion)),a.expertHospitalId="",a.expertScope="nearby",Ua(),yt(),t&&n&&d(`已切换到${n.name} · ${C(n.province,n.city)}。`)}function cs(){a.homeRegion=null,Ze(y.homeRegion),Ze(y.homeHospital)}function ls(){const e=Number(a.geoDistanceKm);return Number.isFinite(e)?e<1?"1 公里内":e<10?`约 ${e.toFixed(1)} 公里`:`约 ${Math.round(e)} 公里`:""}function ai(e){if(a.session||!e)return;const t=H(e.province,e.city);a.login.province=t.province,a.login.city=t.city}function Ga({manual:e=!1}={}){if(a.geoStatus!=="loading"){if(!navigator.geolocation){a.geoStatus="unavailable",a.geoError="当前浏览器不支持定位",yt(),e&&d("当前浏览器不支持定位，请手动切换医院。");return}a.geoStatus="loading",a.geoError="",yt(),navigator.geolocation.getCurrentPosition(t=>{const n=t.coords.latitude,i=t.coords.longitude,o=ss(n,i);a.geoStatus="ready",a.geoLat=n,a.geoLng=i,a.geoAccuracy=Math.round(t.coords.accuracy||0),a.geoHospitalId=o?.hospital?.id||"",a.geoDistanceKm=o?.distance??null,e&&(a.homeHospitalId="",Ya("")),Ua(),ai(o?.hospital),yt(),a.screen==="main"&&a.tab==="experts"&&a.expertScope==="nearby"&&(Se(),Bo()),e&&o?.hospital&&d(`已定位，为你推荐${o.hospital.name}，${ls()}。`)},t=>{a.geoStatus=t.code===1?"denied":"error",a.geoError=t.message||"无法获取当前位置",yt(),e&&d(t.code===1?"未获得定位权限，请在系统设置中允许定位，或手动切换医院。":"暂时无法获取定位，请手动切换医院。")},{enableHighAccuracy:!1,timeout:1e4,maximumAge:3e5})}}function ds(e){return On(e?.specialty||e?.intro||"以院方最终确认的专家资料为准。",180)}function j(e,t){if(!t||t==="all")return!0;const n=q(t);return(e?.services||[]).some(i=>q(i)===n)}function Za(e){const t=q(e);return Pe.includes(t)?t:""}function ps(e){return j(e,"讲座")?"讲座":(e?.services||[]).map(n=>Za(n)).find(Boolean)||"讲座"}function ni(e,t=""){const n=Za(t);return n&&j(e,n)?n:ps(e)}function us(e,t=""){return a.experts.filter(n=>n.active!==!1&&(!t||n.hospitalId===t)&&j(n,e)).length}function ms(e){return!e?.hospitalId||!j(e,"讲座")?"":ya(e.hospitalId).flatMap(t=>t.topics||[]).filter(t=>String(t.expertId||"")===String(e.id)).map(t=>`${t.title||""} ${t.dept||""}`).join(" ")}function hs(e,t={}){if(e?.active===!1)return!1;const n=t.scope??a.expertScope,i=t.availability??a.expertAvailability,o=t.service??a.expertService,r=t.month??a.expertMonth,c=t.hospital||mt(),p=t.region||ae();if(n==="nearby"&&e.hospitalId!==c?.id||i==="local"&&!ma(k(e.hospitalId),p)||i!=="all"&&!(r>0?st(z(e),r):z(e)).bookable)return!1;if(r>0){if(!j(e,"讲座")||!Si(e,r).length||!za(e,r,p.province,p.city,e.hospitalId))return!1}else if(!nt(e,p.province,p.city)||!j(e,o))return!1;if(a.expertDept!=="all"&&e.dept!==a.expertDept||a.expertTier!=="all"&&e.tier!==a.expertTier)return!1;const u=a.expertSearch.trim().toLowerCase();return!(u&&![e.name,e.hospital,e.dept,e.deptTitle,e.specialty,e.coverage,ms(e),...e.coverageCities||[],...e.services||[]].join(" ").toLowerCase().includes(u))}function ii(e={}){const t=e.hospital||mt(),n=e.region||ae();return a.experts.filter(i=>hs(i,{...e,hospital:t,region:n})).sort((i,o)=>Ce.indexOf(i.tier)-Ce.indexOf(o.tier)||i.name.localeCompare(o.name,"zh-CN"))}function oi(e,t=a.expertScope){return ii({service:e,scope:t}).length}function si(e){return Qn(e?.services).map(t=>({service:t}))}let ht=null,it=null;function ri(){return ht||(ht=R(y.slots,{})),ht}function vt(e){const t=ri();return t[e]&&typeof t[e]=="object"?t[e]:{}}function ci(){return Je(ri())}function li(e){return T(y.slots,e)?(ht=e,!0):!1}function vs(){const e=R(y.seed,{});if(e.slots)return;const t=ci(),n=O();a.experts.forEach((i,o)=>{if(t[i.id])return;const r={},c=Math.max(1,Number(i.leadDays)||Y(i).leadDays);for(let p=c;p<=c+75;p+=1){const u=M(n,p),h=u.getDay();if(h===0||h===6||o%3===0&&h===1||o%4===0&&h===5)continue;const m=i.tier==="elite"?1:h===3||h===4?2:1;r[N(u)]=m}t[i.id]=r}),li(t),T(y.seed,{...e,slots:!0,at:new Date().toISOString()})}function fs(){const e=R(y.seed,{});if(e.records){const I=re().find(A=>A.id==="BD-DEMO-01");if(I&&!I.doctorId){const A=a.experts.find(Z=>Z.hospitalId===I.hospitalId&&Z.active!==!1&&j(Z,I.serviceType))||a.experts[0];A&&ce(I.id,{doctorId:A.id,doctorName:A.name,tier:A.tier})}if(I&&I.doctorId){const A=D(I.doctorId),Z=A?z(A):{dates:[]};if(I.status==="pending"&&!Z.dates.includes(I.date)){const be=Z.dates.find(Ct=>Ct>=N(M(O(),7)));be&&ce(I.id,{date:be})}}const W=re().find(A=>A.id==="BD-DEMO-03");W?.plan?.time==="10:00-12:00"&&ce(W.id,{plan:{...W.plan,time:"全天",agenda:W.plan.agenda===`10:00-10:20 场地准备
10:20-11:40 分组咨询
11:40-12:00 汇总答疑`?`09:00-09:20 场地准备
09:20-11:30 分组健康咨询
13:30-16:30 分组健康咨询
16:30-17:00 汇总答疑`:W.plan.agenda,updatedAt:new Date().toISOString()}}),di();return}xe(X)||Ee({...E,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()});const t=k("pkuih")||a.hospitals[0];if(!t)return;const n=O(),i={username:"pkuih",name:"周老师",phone:"13800001111"},o=a.experts.find(I=>I.hospitalId===t.id&&I.tier==="specialist"&&I.active!==!1)||a.experts[0],r=a.experts.find(I=>I.hospitalId===t.id&&I.tier==="director"&&I.active!==!1)||o,c=o?z(o).dates:[],p=r?z(r).dates:[],u=c[0]||N(M(n,Math.max(8,o?.leadDays||7))),h=p[0]||N(M(n,Math.max(16,r?.leadDays||14))),m=c.find(I=>I>=N(M(n,8)))||c[0]||N(M(n,12)),v=new Date().toISOString();let f=!1,_=!1;const S=re();S.some(I=>I.id==="BD-DEMO-01")||(S.push({id:"BD-DEMO-01",ownerPhone:X,orgName:E.orgName,orgType:E.orgType,contactName:E.name,contactTitle:E.title,phone:X,province:"北京市",city:"北京市",address:"北京市朝阳区建国路 88 号",venue:"客户总部 3 层报告厅",serviceType:"讲座",doctorId:o?.id||"",doctorName:o?.name||"",tier:o?.tier||"specialist",hospitalId:t.id,date:m,topic:"职场人群睡眠与压力管理",audience:"企业员工",headcount:"80",note:"希望安排现场问答，活动时长约 90 分钟。",status:"pending",assignedStaff:null,plan:null,planHistory:[],internalNote:"",feedback:"",createdAt:v,updatedAt:v},{id:"BD-DEMO-02",ownerPhone:X,orgName:E.orgName,orgType:E.orgType,contactName:E.name,contactTitle:E.title,phone:X,province:"北京市",city:"北京市",address:"北京市海淀区中关村软件园 8 号楼",venue:"一层多功能厅",serviceType:"讲座",doctorId:o?.id||"",doctorName:o?.name||"",tier:o?.tier||"specialist",hospitalId:t.id,date:u,topic:"久坐人群体态与颈腰椎健康管理",audience:"研发与管理团队",headcount:"60",note:"客户希望增加现场体态评估与答疑环节。",status:"review",assignedStaff:i,plan:{topic:"久坐人群体态与颈腰椎健康管理",serviceType:"讲座",speakerId:o?.id||"",speaker:o?`${o.name} · ${o.deptTitle}`:"院方安排",date:u,time:"全天",province:"北京市",city:"北京市",venue:"一层多功能厅",address:"北京市海淀区中关村软件园 8 号楼",outline:`1. 久坐与常见颈腰椎问题
2. 办公场景中的风险识别
3. 日常拉伸与运动处方
4. 现场问答与健康咨询`,agenda:`14:00-14:10 签到与开场
14:10-15:10 专家主题分享
15:10-15:40 现场问答
15:40-16:00 健康咨询`,team:"周老师（项目负责人）",message:"院方已完成专家与课题匹配，请确认活动时间、地点与流程。如人数或场地有变化，请提前联系项目对接人。",contact:"周老师 · 13800001111",updatedAt:v},planHistory:[],internalNote:"场地投影与电源待客户确认；建议专家提前 40 分钟到场。",feedback:"",acceptedAt:v,planSentAt:v,createdAt:v,updatedAt:v},{id:"BD-DEMO-03",ownerPhone:X,orgName:E.orgName,orgType:E.orgType,contactName:E.name,contactTitle:E.title,phone:X,province:"北京市",city:"北京市",address:"北京市朝阳区望京 SOHO T1",venue:"B1 员工活动中心",serviceType:"健康咨询",doctorId:r?.id||"",doctorName:r?.name||"",tier:r?.tier||"director",hospitalId:t.id,date:h,topic:"企业员工代谢健康与体重管理咨询",audience:"全体职工",headcount:"120",note:"需要分时段到场，现场提供血压与体脂测量。",status:"confirmed",assignedStaff:i,plan:{topic:"企业员工代谢健康与体重管理咨询",serviceType:"健康咨询",speakerId:r?.id||"",speaker:r?`${r.name} · ${r.deptTitle}`:"院方安排",date:h,time:"全天",province:"北京市",city:"北京市",venue:"B1 员工活动中心",address:"北京市朝阳区望京 SOHO T1",outline:"血压、体脂与腰围测量；代谢风险分层；个体化饮食与运动建议。",agenda:`09:00-09:20 场地准备
09:20-11:30 分组健康咨询
13:30-16:30 分组健康咨询
16:30-17:00 汇总答疑`,team:"周老师（项目负责人）、张老师（现场执行）",message:"方案已确认，院方将按流程到场执行。",contact:"周老师 · 13800001111",updatedAt:v},planHistory:[],internalNote:"已确认场地与设备。",feedback:"",acceptedAt:v,planSentAt:v,confirmedAt:v,createdAt:v,updatedAt:v}),f=!0);const $=Ae();$.some(I=>I.id==="XQ-DEMO-01")||($.push({id:"XQ-DEMO-01",ownerPhone:X,orgName:E.orgName,orgType:E.orgType,contactName:E.name,contactTitle:E.title,phone:X,province:"北京市",city:"北京市",hospitalId:t.id,serviceType:"健康咨询",topic:"企业园区颈肩腰腿痛健康咨询",audience:"一线员工与司机班组",headcount:"120",preferredDate:N(M(n,20)),note:"希望安排康复或骨科方向医生，现场可分两组咨询。",status:"pending",assignedStaff:null,followUps:[],createdAt:v,updatedAt:v},{id:"XQ-DEMO-02",ownerPhone:X,orgName:E.orgName,orgType:E.orgType,contactName:E.name,contactTitle:E.title,phone:X,province:"北京市",city:"北京市",hospitalId:t.id,serviceType:"1V1报告解读",topic:"管理层一对一健康咨询",audience:"管理层 12 人",headcount:"12",preferredDate:N(M(n,26)),note:"希望安排全科或心血管方向专家。",status:"contacted",assignedStaff:i,followUps:[{note:"已电话沟通，建议采用全科 + 心血管方向专家分组咨询。",by:i,at:v}],createdAt:v,updatedAt:v}),_=!0),f&&Ja(S),di(),_&&en($),T(y.seed,{...e,records:!0,recordsAt:new Date().toISOString()})}function di(){const e=re();if(e.some(u=>u.id==="BD-DEMO-04"))return;const t=k("pkuih")||a.hospitals[0];if(!t)return;const n={username:"pkuih",name:"周老师",phone:"13800001111"},i=a.experts.find(u=>u.hospitalId===t.id&&u.active!==!1&&j(u,"讲座"))||null;if(!i)return;const o=z(i).dates,r=N(M(O(),Math.max(10,Number(i.leadDays)||7)+2)),c=o.find(u=>u>=N(M(O(),Math.max(7,Number(i.leadDays)||7))))||o[0]||r,p=new Date().toISOString();e.push({id:"BD-DEMO-04",ownerPhone:X,orgName:E.orgName,orgType:E.orgType,contactName:E.name,contactTitle:E.title,phone:X,province:"北京市",city:"北京市",address:"北京市朝阳区望京国际商务区 A 座",venue:"12 层客户活动厅",serviceType:"讲座",doctorId:i.id,doctorName:i.name,tier:i.tier,hospitalId:t.id,date:c,topic:"高压职场人群的睡眠与精力管理",audience:"核心业务团队",headcount:"70",note:"希望加入现场互动答疑，活动对象以业务骨干为主。",status:"planning",assignedStaff:n,plan:null,planHistory:[],internalNote:"已接单，等待与机构确认最终课题和现场流程。",feedback:"",acceptedAt:p,createdAt:p,updatedAt:p}),Ja(e)}function re(){return it||(it=R(y.appointments,[])),Array.isArray(it)?it:[]}function Ja(e){return T(y.appointments,e)?(it=e,!0):!1}function Ut(e){return re().filter(t=>t.ownerPhone===e).sort((t,n)=>String(n.createdAt).localeCompare(String(t.createdAt)))}function U(e){return re().find(t=>t.id===e)||null}function _e(e){return!!(e&&a.session?.phone&&e.ownerPhone===a.session.phone)}function Qa(e){return!!(e&&a.session?.phone&&e.ownerPhone===a.session.phone)}function Ft(e){return e?e.orgProfileSnapshot?e.orgProfileSnapshot:{name:e.contactName||"",orgName:e.orgName||"",orgType:e.orgType||"",title:e.contactTitle||"",contactPhone:e.phone||"",email:e.email||"",province:"",city:"",capturedAt:e.createdAt||"",source:"legacy"}:null}function pi(e=a.session){return e?{name:e.name||"",orgName:e.orgName||"",orgType:e.orgType||"",title:e.title||"",contactPhone:e.contactPhone||e.phone||"",email:e.email||"",province:e.province||"",city:e.city||"",capturedAt:new Date().toISOString(),source:"profile-sync"}:null}function ui(e){const t=Ft(e),n=pi();return!t||!n?[]:[["orgName","单位名称"],["name","联系人"],["title","职务"],["orgType","机构类型"],["contactPhone","联系电话"],["email","通知邮箱"]].filter(([o])=>String(n[o]||"").trim()!==String(t[o]||"").trim()).map(([o,r])=>({key:o,label:r,from:String(t[o]||"未填写"),to:String(n[o]||"未填写")}))}function gs(e){const t=U(e);if(!t)return d("预约记录不存在。");if(!_e(t))return d("无权同步该预约资料。");if(["completed","cancelled"].includes(t.status))return d("已结束的预约保留历史资料快照，不能再同步。");const n=pi();if(!n)return d("登录状态已失效，请重新登录。");if(!ui(t).length)return d("当前资料与预约快照一致，无需同步。");const o=new Date().toISOString();ce(t.id,{orgName:n.orgName,orgType:n.orgType,contactName:n.name,contactTitle:n.title,phone:n.contactPhone,email:n.email,orgProfileSnapshot:n,profileSyncedAt:o,hospitalNotice:{type:"profile",message:"机构同步了预约联系人/企业资料，请使用最新信息重新复制推送内容。",at:o,readAt:""}}),J("机构同步预约客户资料",t.id,{entityType:"appointment",entityId:t.id,hospitalId:t.hospitalId}),b(),bn(),d("已同步最新企业资料；院方推送将使用新联系人信息。")}function ce(e,t){let n=null;const i=re().map(o=>o.id!==e?o:(n={...o,...t,updatedAt:new Date().toISOString()},n));return Ja(i),n}function ot(e,t,n=""){return re().filter(i=>i.doctorId===e&&i.date===t&&i.status!=="cancelled"&&i.manualArrangement!==!0&&i.id!==n).length}function mi(e,t=""){const n={};return re().forEach(i=>{i.doctorId!==e||i.status==="cancelled"||i.manualArrangement===!0||i.id===t||(n[i.date]=(n[i.date]||0)+1)}),n}function hi(e,t=""){const n=new Set;return re().forEach(i=>{i.doctorId!==e||i.date===void 0||i.status==="cancelled"||i.manualArrangement!==!0||i.id===t||n.add(i.date)}),n}function vi(e){const t=new Set;return Ae().forEach(n=>{n.status!=="matched"||n.convertedAppointmentId||String(n.matchedExpertId||"")!==String(e||"")||!n.matchedDate||t.add(n.matchedDate)}),t}function bs(e,t){const n=vt(e);return Number(n[t]||0)}function fi(e,t,n=""){return Math.max(0,bs(e,t)-ot(e,t,n))}function z(e,t=""){if(!e)return{bookable:!1,next:"",remaining:0,dates:[]};const n=vt(e.id),i=mi(e.id,t),o=hi(e.id,t),r=vi(e.id),c=Math.max(0,Number(e.leadDays)||Y(e).leadDays),p=N(M(O(),c)),u=Te();let h="",m=0;const v=[];return Object.keys(n).sort().forEach(f=>{if(f<p||f<u||o.has(f)||r.has(f))return;const _=Math.max(0,Number(n[f]||0)-(i[f]||0));_>0&&(h||(h=f),m+=_,v.push(f))}),{bookable:m>0,next:h,remaining:m,dates:v}}function st(e,t){const n=(e?.dates||[]).filter(i=>{const o=he(i);return o&&o.getMonth()+1===Number(t)});return{...e,bookable:n.length>0,next:n[0]||"",remaining:n.length,dates:n}}function gi(){const e=w()?a.adminHospitalId?k(a.adminHospitalId):null:$e();return re().filter(t=>e?t.hospitalId===e.id:!0)}function ys(e){const t=e?.assignedStaff,n=a.adminUser;return!t||!n?!1:t.username&&n.username?String(t.username)===String(n.username):t.phone&&n.phone?String(t.phone)===String(n.phone):!!t.name&&t.name===n.name}function bi(e=a.adminOwnerScope){const t=gi();return e!=="mine"?t:t.filter(n=>n.status==="pending"||ys(n))}function Ae(){return R(y.demands,[])}function en(e){T(y.demands,e)}function ha(e){return Ae().filter(t=>t.ownerPhone===e).sort((t,n)=>String(n.createdAt).localeCompare(String(t.createdAt)))}function le(e){return Ae().find(t=>t.id===e)||null}function va(e){return e?e.targetType==="group"?"集团企康办":k(e.hospitalId)?.name||"医院待分配":""}function fa(e){return!e||!a.adminUser?!1:e.targetType==="group"||!e.hospitalId?w():ve(e.hospitalId)}function ft(e,t){let n=null;const i=Ae().map(o=>o.id!==e?o:(n={...o,...t,updatedAt:new Date().toISOString()},n));return en(i),n}function tn(){const e=w()?a.adminHospitalId?k(a.adminHospitalId):null:$e();return Ae().filter(t=>t.targetType==="group"||!t.hospitalId?w():e?t.hospitalId===e.id:!0).sort((t,n)=>String(n.createdAt).localeCompare(String(t.createdAt)))}function an(){return R(y.pushCopies,{})}function yi(e,t){if(!t?.copiedAt)return!1;const n=new Date(t.copiedAt).getTime();if(!Number.isFinite(n))return!1;const i=[e?.plan?.updatedAt,e?.planSentAt,e?.profileSyncedAt].map(o=>o?new Date(o).getTime():NaN).filter(Number.isFinite);return i.length?n>=Math.max(...i):!0}function $i(e,t){const n=an();n[e]=t,T(y.pushCopies,n)}function ki(){const e=R(y.operationLogs,[]);return Array.isArray(e)?e:[]}function J(e,t,n={}){const i=a.adminUser?{username:a.adminUser.username,name:a.adminUser.name,role:a.adminUser.role,hospitalId:a.adminUser.hospitalId||""}:null,o=ki();o.unshift({id:`LOG-${Date.now()}-${Math.floor(Math.random()*900+100)}`,action:e,detail:String(t||""),actor:i,entityType:n.entityType||"",entityId:n.entityId||"",hospitalId:n.hospitalId||i?.hospitalId||"",at:new Date().toISOString()}),T(y.operationLogs,o.slice(0,300))}function qt(e=B()){return a.seasonal.find(t=>t.month===Number(e))||a.seasonal[0]||null}function wi(e){return String(e||"").match(/^[（(]([^）)]+)[）)]/)?.[1]||""}function ga(e){return String(e||"").replace(/^[（(][^）)]+[）)]\s*/,"").trim()||String(e||"")}function _i(e=B()){const t=Number(e)||B();return[12,1,2].includes(t)?"winter":[3,4,5].includes(t)?"spring":[6,7,8].includes(t)?"summer":"autumn"}function $s(e=B()){return{winter:"snow",spring:"flower",summer:"sun",autumn:"leaf"}[_i(e)]}const ks={心血管:["心血管"],呼吸科:["呼吸"],肿瘤:["肿瘤"],肾病:["肾病"],内分泌:["内分泌代谢","内分泌"],儿科:["儿科","儿童","呼吸"],全科:["全科/健管","全科"],神经内科:["神经内科","神经"],骨科:["骨科"],康复科:["康复"],中医科:["中医"],心理:["心理"],睡眠:["睡眠"],急诊急救:["急救应急"],皮肤医美:["皮肤医美"],感染肝病:["感染肝病"],临床营养:["临床营养"],妇科:["妇科","女性"],其他:[]};function Si(e,t){const n=ne(e?.hospitalId,t);return n?(n.topics||[]).filter(i=>String(i.expertId||"")===String(e.id)).map(i=>({id:i.id,dept:i.dept||"综合",title:i.title,month:Number(t),hospital:e.hospital,professionalTitle:e.deptTitle,coverage:ie(i,n,e.hospitalId).label,season:n.season,matched:!0})).slice(0,8):[]}function nn(e){return e?new Set(ya(e.hospitalId).filter(t=>(t.topics||[]).some(n=>String(n.expertId||"")===String(e.id))).map(t=>Number(t.month))):new Set}function ba(e){return`assets/themes/theme-${String(Number(e)||1).padStart(2,"0")}.jpg`}function Ii(e){if(!e)return["全国"];const t=H(e.province,e.city);return[t.city||t.province]}function on(e,t){const n=k(e),i=qt(t);if(!n||!i)return null;const o=a.experts.filter(v=>v.hospitalId===n.id&&v.active!==!1&&j(v,"讲座")),r=new Map(o.map(v=>[v.name,v])),c=a.themeMatches.filter(v=>v.month===Number(t)&&r.has(v.doctor)&&(!v.hospital||v.hospital===n.name||v.hospital.includes(n.name)||n.name.includes(v.hospital))).map(v=>{const f=r.get(v.doctor),_=Wa(v.coverage);return{id:`${t}-${v.doctor}-${v.topic}`,dept:v.dept,title:v.topic,expertId:f?.id||"",coverage:v.coverage||"",coverageCities:_}}),p=new Set,u=c.filter(v=>p.has(v.title)?!1:(p.add(v.title),!0)).slice(0,8);u.length||i.topics.forEach(v=>{if(u.length>=6)return;const f=o.find(_=>{const S=ks[_.dept]||[_.dept];return[...new Set([_.dept,...S].filter(Boolean))].some($=>v.dept.includes($)||$.includes(v.dept))});if(f){const _=Ii(n);u.push({id:`${t}-fallback-${u.length}`,dept:v.dept,title:v.title,expertId:f.id,coverage:te(_),coverageCities:_})}});const h=[...new Set(u.map(v=>v.expertId).filter(Boolean))],m=ua(u.flatMap(v=>ut(v,{month:Number(t)},n.id).cities));return{month:Number(t),season:i.season,focus:i.focus,intro:`本月时令聚焦「${i.season.replace(/^（.*?）\s*/,"")}」。由${n.name}专家团队围绕${i.focus}开展企业讲座，重点关注${i.diseases}。`,diseases:i.diseases,industries:i.industries,image:ba(t),coverageCities:m.length?m:Ii(n),expertIds:h,topics:u}}function rt(e,t="",n="",i="",o={}){if(!e)return[];const r=String(o?.topicId||""),c=String(o?.title||"").trim();return(e.topics||[]).filter(p=>{const u=p?.expertId?D(p.expertId):null;return!(u&&u.active!==!1&&j(u,"讲座")&&(!t||u.hospitalId===t))?!1:!n&&!i?!0:r&&String(p.id||"")===r||c&&String(p.title||"").trim()===c||we(ie(p,e,t),n,i)})}function Di(){return R(y.themeConfig,{})}function ws(e){T(y.themeConfig,e)}function ya(e){const t=k(e);if(!t)return[];if(Pt.has(t.id))return Pt.get(t.id);const i=Di()?.[t.id]||{},o=Array.from({length:12},(r,c)=>{const p=c+1,u=on(t.id,p),h=i[p]?.topics!==void 0?i[p].topics:u?.topics||[],m={...u||{},...i[p]||{},month:p},v=h.map(f=>{const _=ut(f,m,t.id);return{...f,coverageCities:_.cities,coverage:_.cities.length?te(_.cities):f.coverage||""}});return{...u,...i[p]||{},month:p,coverageCities:i[p]?.coverageCities!==void 0?i[p].coverageCities:u?.coverageCities||[],expertIds:[...new Set(i[p]?.expertIds!==void 0?i[p].expertIds:u?.expertIds||[])],topics:v,image:i[p]?.image||u?.image||ba(p)}});return Pt.set(t.id,o),o}function ne(e,t){return ya(e).find(n=>n.month===Number(t))||null}function _s(e,t){if(!e||!t?.month)return;const n=Di();n[e]=n[e]||{};const i=(t.topics||[]).map((o,r)=>{const c=ut(o,t,e);return{...o,id:o.id||`${t.month}-custom-${r}-${Date.now()}`,coverage:c.cities.length?te(c.cities):String(o.coverage||"").trim(),coverageCities:c.cities}});n[e][t.month]={...t,month:Number(t.month),coverageCities:ua(i.flatMap(o=>o.coverageCities||[])),expertIds:[...new Set(i.map(o=>o.expertId).filter(Boolean))],topics:i},ws(n),Pt.clear()}function l(e,t=18){const n=Ti[e]||Ti.dot;return`<svg viewBox="0 0 24 24" width="${t}" height="${t}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${n}</svg>`}const Ti={dot:'<circle cx="12" cy="12" r="2.4" fill="currentColor" stroke="none"/>',home:'<path d="M4 10.2 12 3l8 7.2V21a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z"/>',experts:'<path d="M8.5 11a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z"/><path d="M2.8 20.2c.4-3.6 2.6-5.6 5.7-5.6s5.3 2 5.7 5.6"/><path d="M16.2 10.4a2.6 2.6 0 1 0 0-5.2"/><path d="M16.4 14.8c2.8.1 4.6 2 5 5.4"/>',calendar:'<rect x="3.5" y="5" width="17" height="16" rx="3"/><path d="M8 3v4M16 3v4M3.5 10h17"/><path d="M8 14h2.5M13.5 14H16M8 17.5h2.5"/>',user:'<circle cx="12" cy="8" r="3.6"/><path d="M4.5 21c.5-4 3-6.2 7.5-6.2s7 2.2 7.5 6.2"/>',search:'<circle cx="10.8" cy="10.8" r="6.6"/><path d="m20 20-4.4-4.4"/>',chevronRight:'<path d="m9 5 7 7-7 7"/>',chevronLeft:'<path d="m15 5-7 7 7 7"/>',chevronDown:'<path d="m5 9 7 7 7-7"/>',crosshair:'<circle cx="12" cy="12" r="6.8"/><path d="M12 2.5v3.2M12 18.3v3.2M2.5 12h3.2M18.3 12h3.2"/><circle cx="12" cy="12" r="2.2"/>',close:'<path d="M5.5 5.5 18.5 18.5M18.5 5.5 5.5 18.5"/>',check:'<path d="m4.5 12.5 5 5 10-11"/>',checkCircle:'<circle cx="12" cy="12" r="9"/><path d="m7.6 12.2 3 3 5.8-6.2"/>',clock:'<circle cx="12" cy="12" r="8.6"/><path d="M12 7v5.6l3.6 2.1"/>',building:'<path d="M4 21V6.5L12 3v18M12 21h8V10l-8-3.5"/><path d="M7.5 8.5h1M7.5 12h1M7.5 15.5h1M15.5 12h1M15.5 15.5h1M2.5 21h19"/>',phone:'<path d="M7.2 3.6 9.8 4c.5.1.8.5.9 1l.7 3.1c.1.5-.1 1-.5 1.3L9 10.8a13 13 0 0 0 4.2 4.2l1.4-1.9c.3-.4.8-.6 1.3-.5l3.1.7c.5.1.9.4 1 1l.4 2.6c.1.7-.4 1.3-1.1 1.4-8 1-15.2-6.2-14.2-14.2.1-.7.7-1.2 1.4-1.1Z"/>',message:'<path d="M20.5 11.5a8.5 8.5 0 0 1-12.3 7.6L3.5 20.5l1.4-4.6A8.5 8.5 0 1 1 20.5 11.5Z"/><path d="M8.5 10h7M8.5 13.5h4.5"/>',send:'<path d="m21 3-7.2 18-3.6-7.2L3 10.2Z"/><path d="M21 3 10.2 13.8"/>',shield:'<path d="M12 3 4.5 6v5.2c0 4.6 3 8.2 7.5 9.8 4.5-1.6 7.5-5.2 7.5-9.8V6Z"/><path d="m9 12 2.2 2.2L15.5 10"/>',arrowRight:'<path d="M4 12h16M14 6l6 6-6 6"/>',arrowUpRight:'<path d="M7 17 17 7M8 7h9v9"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',edit:'<path d="M4 20h4L20 8l-4-4L4 16Z"/><path d="m14 6 4 4"/>',trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14M10 11v6M14 11v6"/>',lock:'<rect x="5" y="10" width="14" height="10.5" rx="2.6"/><path d="M8.2 10V7.5a3.8 3.8 0 0 1 7.6 0V10"/><path d="M12 14.2v3"/>',logout:'<path d="M10 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h5"/><path d="M14 8l4 4-4 4M8 12h10"/>',mapPin:'<path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/>',pin:'<path d="M12 21s6.8-5.4 6.8-10.8a6.8 6.8 0 1 0-13.6 0C5.2 15.6 12 21 12 21Z"/><circle cx="12" cy="10.2" r="2.4"/>',sparkles:'<path d="M12 3.5 13.8 9l5.5 1.8-5.5 1.8L12 18l-1.8-5.4L4.7 10.8 10.2 9Z"/><path d="M19 16.5 19.8 19l2.5.8-2.5.8L19 23l-.8-2.4-2.5-.8 2.5-.8Z"/>',leaf:'<path d="M20 4C11 4 4.5 8.5 4.5 15.5c0 2 .7 3.5 1.8 4.5C8 13 12 10 18 8c-4.6 2.6-7.7 6.2-9.2 11.4 2.2.7 4.3.4 6.2-.8C20 15.8 20 9.2 20 4Z"/>',snow:'<path d="M12 2.5v19M4 7l16 10M20 7 4 17"/><path d="m9 4 3 2 3-2M9 20l3-2 3 2M2.9 9.3l3.2 1.4.5 3.5M21.1 14.7l-3.2-1.4-.5-3.5M4.1 16.6l1.4-3.2 3.5-.5M19.9 7.4l-1.4 3.2-3.5.5"/>',flower:'<circle cx="12" cy="12" r="2.1"/><path d="M12 9.9C10.5 6 12.5 3.5 14.8 3.8 17 4.2 17 7.8 14 9.9M14.1 12c3.9-1.5 6.4.5 6.1 2.8-.4 2.2-4 2.2-6.1-.8M12 14.1c1.5 3.9-.5 6.4-2.8 6.1-2.2-.4-2.2-4 .8-6.1M9.9 12C6 13.5 3.5 11.5 3.8 9.2 4.2 7 7.8 7 9.9 10"/>',sun:'<circle cx="12" cy="12" r="4.1"/><path d="M12 2.5v3M12 18.5v3M2.6 12h3M18.4 12h3M5.4 5.4l2.1 2.1M16.5 16.5l2.1 2.1M18.6 5.4l-2.1 2.1M7.5 16.5l-2.1 2.1"/>',stethoscope:'<path d="M5 3v5a4 4 0 0 0 8 0V3"/><path d="M5 3h2M11 3h2"/><path d="M9 12v3a5 5 0 0 0 10 0v-2"/><circle cx="19" cy="10" r="2.2"/>',briefcase:'<rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M9 7V4.8c0-.5.4-.8.8-.8h4.4c.4 0 .8.3.8.8V7M3 12.5h18"/>',users:'<circle cx="9" cy="8.5" r="3.2"/><path d="M3 20c.4-3.4 2.5-5.3 6-5.3s5.6 1.9 6 5.3"/><path d="M15.5 5.6a3 3 0 0 1 0 5.8M16.2 14.9c3 .3 4.6 2 5 5.1"/>',clipboard:'<rect x="5" y="4.5" width="14" height="17" rx="2.5"/><path d="M9 4.5V3h6v1.5M8.5 9h7M8.5 12.5h7M8.5 16h4.5"/>',download:'<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M4 20h16"/>',history:'<path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1L3.5 8"/><path d="M3.5 4v4.5H8"/><path d="M12 8v4.5l3 1.8"/>',alert:'<circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5v.1"/>',star:'<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.5l6.1-.9Z"/>'};function xi(){return a.screen==="admin"?`admin:${a.adminTab}`:a.screen==="main"?`main:${a.tab}`:a.screen||"main:home"}function Ai(){const e=xi(),t=e.startsWith("admin:")?a.viewScroll.admin:a.viewScroll.main;return t[e]=Q(),e}function Q(){return a.overlay?a.overlayScrollY??window.scrollY??0:window.scrollY??0}function Me(e){return(e.startsWith("admin:")?a.viewScroll.admin:a.viewScroll.main)[e]??0}function Mi(e){const t=Math.max(0,Number(e)||0);window.requestAnimationFrame(()=>{window.scrollTo(0,t),window.requestAnimationFrame(()=>window.scrollTo(0,t))})}function sn(e={}){try{window.history.replaceState({...window.history.state||{},...e},"",window.location.href)}catch{}}function gt(e="overlay",t=null,n={}){if(a.screen==="auth"&&e!=="auth")return!1;try{const i={...window.history.state||{},pkuihLayer:e,pkuihTab:n.tab||a.tab,pkuihScroll:n.scroll!==void 0?Math.max(0,Number(n.scroll)||0):Math.max(0,Q())};return t==null?delete i.pkuihOverlayDepth:i.pkuihOverlayDepth=t,window.history.pushState(i,"",window.location.href),a.historyDepth+=1,!0}catch{return!1}}function Ni(e=null){const t=a.historyDepth;if(t<=0)return 0;const n=e===null?t:Math.min(Math.max(1,e),t);a.historyDepth=t-n,a.suppressPopCount+=1;try{return window.history.go(-n),n}catch{return a.historyDepth+=n,a.suppressPopCount=Math.max(0,a.suppressPopCount-1),0}}function Ci(){const e=a.overlayHistoryDepth+1;gt("overlay",e)&&(a.overlayHistoryDepth=e)}function F(e=null){const t=a.overlayHistoryDepth;if(t<=0)return 0;const n=e===null?t:Math.min(Math.max(1,e),t),i=t-n;a.overlayHistoryDepth=i,a.historyDepth=Math.max(0,a.historyDepth-n);const o=a.historyNavToken+1;a.historyNavToken=o,a.historyNavTarget={depth:i,token:o},window.setTimeout(()=>{a.historyNavTarget?.token===o&&(a.historyNavTarget=null)},900);try{return window.history.go(-n),n}catch{return a.overlayHistoryDepth=t,a.historyDepth+=n,a.historyNavTarget=null,0}}function Ss(e){const t=Math.max(0,Number(e)||0),n=a.overlay?a.overlayStack.length+1:0;if(a.overlay){if(t<=0){const i=a.overlayScrollY;a.overlayHistoryDepth=0,ue(),a.screen==="admin"||a.screen==="admin-login"?g({scrollTo:i}):b(),document.body.classList.remove("is-locked");return}if(t>=n){a.overlayHistoryDepth=n;return}for(a.overlay?.type==="plan-pdf"&&ea();a.overlayStack.length&&a.overlayStack.length+1>t;)a.overlay=a.overlayStack.pop();a.overlayHistoryDepth=t,b(),document.body.classList.add("is-locked")}}function Re(e){a.overlay&&a.overlay.type!==e.type&&(a.overlayStack.push(a.overlay),Ci()),a.overlay=e,b()}function $a(){const e=a.overlayStack.pop();return e?(a.overlay?.type==="plan-pdf"&&ea(),F(1),a.overlay=e,b(),document.body.classList.add("is-locked"),!0):!1}function Pi(e,t=null){let n=-1;for(let r=a.overlayStack.length-1;r>=0;r-=1)if(a.overlayStack[r]?.type===e){n=r;break}if(n<0)return!1;const i=a.overlayStack.length-n;F(i);const o=a.overlayStack[n];return a.overlayStack=a.overlayStack.slice(0,n),t&&t(),a.overlay=o,b(),document.body.classList.add("is-locked"),!0}function ue(){ea(),Ra(),kl(),a.overlay=null,a.overlayStack=[],a.booking=null,a.posterId="",a.posterViewUrl="",a.profileDraft=null,a.adminReviewId="",a.adminDraft=null,a.adminNoteEditing=!1,a.adminReviewSaved=!1,a.adminDemandId="",a.adminDemandDraft=null,a.adminAccountDraft=null,a.institutionAccountDraft=null,a.adminDoctorDraft=null,a.hospitalPhoneDraft=null,a.adminTemplateDraft=null,a.adminThemeDraft=null,a.appointmentLocationDraft=null,a.homeRegionDraft=null,a.adminThemeMonth=0,a.slotDay=""}function rn({fromHistory:e=!1}={}){a.overlay?.type==="plan-pdf"&&ea(),!(!e&&$a())&&(e||F(),ue(),a.screen==="admin"||a.screen==="admin-login"?g():b(),document.body.classList.remove("is-locked"))}function Is(e){return e?e.type==="doctor"?`doctor:${e.doctorId||""}`:e.type==="theme"?`theme:${e.hospitalId||""}:${e.month||""}`:e.type==="booking"?"booking":`${e.type}:${e.appointmentId||e.demandId||e.posterId||""}`:""}function Ds(e){const t=V?.querySelector(".month-tabs"),n=t?.querySelector(".is-active");if(!t||!n)return;const i=t.getBoundingClientRect(),o=n.getBoundingClientRect(),r=Math.max(0,t.scrollWidth-t.clientWidth),c=t.scrollLeft+o.left-i.left-(t.clientWidth-o.width)/2;t.scrollTo({left:Math.max(0,Math.min(r,c)),behavior:"auto"})}function Ts(){const e=document.querySelector(".admin-tabs"),t=e?.querySelector("button.is-active");if(!e||!t)return;const n=e.getBoundingClientRect(),i=t.getBoundingClientRect(),o=Math.max(0,e.scrollWidth-e.clientWidth),r=e.scrollLeft+i.left-n.left-(e.clientWidth-i.width)/2;e.scrollTo({left:Math.max(0,Math.min(o,r)),behavior:"auto"})}function b(){if(!V)return;const e=!!V.querySelector(".sheet, .flow"),t=V.querySelector(".sheet__body, .flow__body");e&&t&&(a.overlayScrollMemory[a.paintedOverlayKey]=t.scrollTop||0);const n=Is(a.overlay);a.overlay&&!e&&(a.overlayScrollY=Math.max(0,window.scrollY||0),Ci());const i=r=>{V.innerHTML=r,document.body.classList.add("is-locked"),e&&V.querySelectorAll(".sheet, .sheet-backdrop, .flow").forEach(p=>p.classList.add("is-instant"));const c=a.overlayScrollMemory[n]||0;if(e&&c){const p=V.querySelector(".sheet__body, .flow__body");p&&window.requestAnimationFrame(()=>{p.scrollTop=c})}a.overlay?.type==="doctor"&&window.requestAnimationFrame(()=>Ds(a.overlay?.month)),a.paintedOverlayKey=n},o=a.overlay?.type;if(o==="booking")return i(cr());if(o==="doctor")return i(Js());if(o==="appointment")return i(Er());if(o==="appointment-action")return i(Rr());if(o==="plan-pdf"){i(il()),window.requestAnimationFrame(tl);return}if(o==="appointment-location")return i(Hr());if(o==="home-city")return i(Fs());if(o==="demand-create")return i(Ur());if(o==="demand")return i(qr());if(o==="profile")return i(Kr());if(o==="theme")return i(Ws());if(o==="poster")return i(_l());if(o==="poster-upload")return i(Sl());if(o==="admin-review")return i(sc());if(o==="admin-demand")return i(mc());if(o==="hospital-phone")return i(ll());if(o==="hospital-editor")return i(sl());if(o==="admin-account")return i(fl());if(o==="admin-institution")return i(ml());if(o==="admin-doctor")return i(Vc());if(o==="admin-theme")return i(Bc());if(o==="admin-template")return i(Cc());if(o==="slot-day")return i(Ic());if(!a.overlay){V.innerHTML="",a.paintedOverlayKey="",document.body.classList.remove("is-locked");const r=a.overlayScrollY;a.overlayScrollY=null,r!=null&&Mi(r)}}function xs(e,t=0,n=0){const i=D(e);i&&Re({type:"doctor",doctorId:i.id,month:Number(t)>0?Number(t):B(),themeMonth:Number(n)>0?Number(n):0})}function As(){const{step:e}=a.login,t=/^1\d{10}$/.test(a.login.phone)?xe(a.login.phone):null,n=/^1\d{10}$/.test(a.login.phone)?ye(a.login.phone):null;return`
      <div class="auth-screen">
        <div class="auth-top">
          <button class="icon-button" type="button" data-action="auth-close" aria-label="返回">
            ${l("chevronLeft",18)}
          </button>
          <img src="assets/logo.svg" alt="北京大学国际医院">
          <span></span>
        </div>
        <div class="auth-visual">
          <span class="auth-visual__badge">${l("shield",13)} 企业健康服务</span>
          <h1>登录后，<br>把专家请到企业身边</h1>
          <p>手机号登录即可预约讲座、健康咨询与 1V1 报告解读，院方项目组全程跟进。</p>
        </div>
        ${a.sessionRevoked?`<div class="session-revoked-card">${l("shield",17)}<div><strong>登录状态已失效</strong><p>${s(a.sessionRevoked)}</p></div></div>`:""}
        <div class="auth-card">
          <div class="auth-steps">
            <span class="${e>=1?"is-active":""}">1 手机号</span>
            <i></i>
            <span class="${e>=2?"is-active":""}">2 完善资料</span>
          </div>
          ${e===1?`
                <div class="field">
                  <label for="login-phone">手机号 <em>*</em></label>
                  <div class="input-shell">
                    <span class="input-shell__prefix">+86</span>
                    <input id="login-phone" type="tel" inputmode="numeric" maxlength="11"
                      placeholder="请输入手机号" value="${s(a.login.phone)}" data-login-field="phone"
                      autocomplete="tel">
                  </div>
                </div>
                ${a.login.error?`<p class="auth-inline-error">${l("alert",13)} ${s(a.login.error)}</p>`:""}
                <div class="field">
                  <label for="login-code">验证码 <em>*</em></label>
                  <div class="input-shell">
                    <input id="login-code" type="tel" inputmode="numeric" maxlength="6"
                      placeholder="请输入 6 位验证码" value="${s(a.login.code)}" data-login-field="code"
                      autocomplete="one-time-code">
                    <button class="input-shell__action" type="button" data-action="send-code"
                      ${a.codeCountdown>0?"disabled":""}>
                      ${a.codeCountdown>0?`${a.codeCountdown}s`:"获取验证码"}
                    </button>
                  </div>
                  <span class="field-help">演示环境验证码固定为 888888。</span>
                </div>
                <label class="check-row">
                  <input type="checkbox" data-login-field="agree" ${a.login.agree?"checked":""}>
                  <span>我已阅读并同意《企业健康服务预约须知》</span>
                </label>
                <button class="btn btn--primary btn--block auth-submit" type="button" data-action="login-next">
                  ${t?"登录":"下一步"} ${l("arrowRight",15)}
                </button>
                <button class="demo-login" type="button" data-action="demo-login">
                  <span>
                    <small>机构演示账号 · 仅限已开通手机号</small>
                    <strong>13800000001 · 验证码 888888</strong>
                  </span>
                  <i>一键进入 ${l("arrowRight",13)}</i>
                </button>
                ${n?`<div class="auth-account-preview">${l("building",14)}<span><strong>${s(n.orgName||"已开通机构")}</strong><small>${s(n.name||"")} · ${s(n.city||n.province||"")}</small></span></div>`:""}
                <p class="auth-tip">${l("shield",12)} 机构手机号由集团超级管理员开通，未配置的手机号无法登录。演示验证码固定为 888888。</p>
              `:`
                <div class="auth-profile-head">
                  <span>${Qe(a.login.name||a.login.phone)}</span>
                  <div>
                    <strong>${s(a.login.phone)}</strong>
                    <small>${t?"请补全企业与联系资料后登录":"院方已开通登录权限，请补充企业资料后进入"}</small>
                  </div>
                </div>
                <p class="auth-form-note">${l("alert",13)} 白名单开通时仅登记手机号与姓名，单位、职务、联系方式和通知邮箱需由你补充完整后才能预约。</p>
                ${a.login.error?`<p class="auth-inline-error">${l("alert",13)} ${s(a.login.error)}</p>`:""}
                <div class="field-row">
                  <div class="field">
                    <label for="login-name">姓名 <em>*</em></label>
                    <input id="login-name" type="text" placeholder="请输入姓名" value="${s(a.login.name)}" data-login-field="name">
                  </div>
                  <div class="field">
                    <label for="login-title">职务 <em>*</em></label>
                    <input id="login-title" type="text" placeholder="如：客户健康负责人" value="${s(a.login.title)}" data-login-field="title">
                  </div>
                </div>
                <div class="field">
                  <label for="login-org">单位名称 <em>*</em></label>
                  <input id="login-org" type="text" placeholder="请输入机构全称" value="${s(a.login.orgName)}" data-login-field="orgName">
                </div>
                <div class="field">
                  <label for="login-org-type">机构类型 <em>*</em></label>
                  <select id="login-org-type" data-login-field="orgType">
                    <option value="" ${a.login.orgType?"":"selected"}>请选择机构类型</option>
                    ${Lt.map(i=>`<option value="${s(i)}" ${a.login.orgType===i?"selected":""}>${s(i)}</option>`).join("")}
                  </select>
                </div>
                <div class="field">
                  <label for="login-contact">联系方式 <em>*</em> <span>默认使用登录手机号，可修改</span></label>
                  <input id="login-contact" type="tel" inputmode="numeric" maxlength="11"
                    placeholder="请输入联系电话" value="${s(a.login.contactPhone||a.login.phone)}" data-login-field="contactPhone">
                </div>
                <div class="field">
                  <label for="login-email">通知邮箱 <em>*</em> <span>用于接收方案与确认提醒</span></label>
                  <input id="login-email" type="email" inputmode="email"
                    placeholder="name@company.com" value="${s(a.login.email||"")}" data-login-field="email">
                </div>
                <div class="field">
                  <label>所在省市 <span>无需填写，自动同步</span></label>
                  <div class="field-static">
                    ${l("mapPin",14)} ${s(C(a.login.province,a.login.city))}
                  </div>
                  <span class="field-help">根据当前定位或首页选择的城市自动确定，后续会随城市切换同步更新。</span>
                </div>
                <button class="btn btn--primary btn--block auth-submit" type="button" data-action="login-submit">
                  ${t?"进入平台":"完善资料并进入"} ${l("arrowRight",15)}
                </button>
                <button class="auth-back" type="button" data-action="login-back">返回修改手机号</button>
              `}
        </div>
      </div>
    `}function bt(e=null){if(a.session)return;const t=e?.returnTab||a.tab||"home",n=e?.returnScroll!==void 0?Number(e.returnScroll)||0:Q(),i=e?{...e,returnTab:t,returnScroll:n}:{type:"restore",returnTab:t,returnScroll:n},o=!!(a.overlay||V?.querySelector(".sheet, .sheet-backdrop, .flow")),r=o&&a.overlayHistoryDepth>0;if(o&&(ue(),V&&(V.innerHTML=""),document.body.classList.remove("is-locked"),a.overlayHistoryDepth=0,r))try{window.history.replaceState({...window.history.state||{},pkuihLayer:"auth",pkuihOverlayDepth:0},"",window.location.href)}catch{a.overlayHistoryDepth=0}ai(K()),a.pendingAuth=i,a.screen="auth",a.login.step=1,a.login.phone="",a.login.name="",a.login.orgName="",a.login.orgType="保险公司",a.login.title="",a.login.contactPhone="",a.login.email="",a.login.code="",a.login.agree=!1,a.login.error="",a.adminAuthed=!1,a.reuseHistoryForOverlay=!1,a.authHistory||(a.authHistory=!0,r||gt("auth",0)),g()}function Ms(){const e=ye(X);if(!e||!e.active)return a.login.error="演示机构账号尚未开通，请联系院方超级管理员。",g(),d(a.login.error);const t=xe(X),n=tt(t||E),i=Ee({...t||{},...E,province:n.province,city:n.city,createdAt:t?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()});Ht(i),cn(i)}function Ns(){window.clearInterval(a.codeTimer),a.codeCountdown=60,a.codeTimer=window.setInterval(()=>{a.codeCountdown-=1,a.codeCountdown<=0&&(window.clearInterval(a.codeTimer),a.codeCountdown=0);const e=document.querySelector('[data-action="send-code"]');e&&(e.disabled=a.codeCountdown>0,e.textContent=a.codeCountdown>0?`${a.codeCountdown}s`:"获取验证码")},1e3)}function Cs(){const{phone:e,code:t,agree:n}=a.login;if(a.login.error="",!/^1\d{10}$/.test(e)){a.login.error="请输入正确的 11 位手机号。",g(),d(a.login.error);return}if(t!==qo){a.login.error="验证码不正确，演示环境请输入 888888。",g(),d(a.login.error);return}if(!n){a.login.error="请先阅读并同意预约须知。",g(),d(a.login.error);return}const i=ye(e);if(!i){a.login.error="该手机号尚未开通机构预约权限，请联系院方超级管理员配置后再登录。",g(),d(a.login.error);return}if(!i.active){a.login.error="该机构账号已停用，请联系院方超级管理员。",g(),d(a.login.error);return}const o=xe(e);if(o){const r=tt({...o,...i}),c=Ee({...o,name:i.name||o.name,orgName:i.orgName||o.orgName,orgType:i.orgType||o.orgType,title:i.title||o.title,contactPhone:i.contactPhone||o.contactPhone||e,email:i.email||o.email||"",province:r.province,city:r.city}),p=ja(c);if(p){Fn(c),a.login.step=2,a.login.error=p,g(),d("请先补全企业资料后再登录。"),window.scrollTo(0,0);return}Ht(c),cn(c);return}Fn({...i,phone:e}),a.login.step=2,g(),window.scrollTo(0,0)}function cn(e){const t=a.pendingAuth;if(Fa(e),a.sessionRevoked="",a.adminAuthed=!1,a.expertVisited=!1,a.expertHospitalId="",Ka(),Bt("client"),a.authHistory){a.authHistory=!1,a.reuseHistoryForOverlay=!1,a.historyDepth=Math.max(0,a.historyDepth-1);try{window.history.replaceState({...window.history.state||{},pkuihLayer:"main",pkuihTab:t?.returnTab||a.tab||"home",pkuihScroll:t?.returnScroll||0,pkuihOverlayDepth:0},"",window.location.href)}catch{}}a.pendingAuth=null,a.screen="main",a.login.step=1,a.login.code="",t?.type==="booking"?(a.tab=t.returnTab||"experts",g({scrollTo:t.returnScroll||0}),zt(t.doctorId||"",t.tier||"",t.service||"",t.topic||"",t.theme||null)):t?.type==="tab"?(a.tab=t.tab||"me",g({scrollTo:t.returnScroll??Me(`main:${t.tab||"me"}`)})):t?.type==="demand"?(a.tab=t.returnTab||"home",g({scrollTo:t.returnScroll||0}),$n()):t?.type==="restore"?(a.tab=t.returnTab||a.tab||"home",g({scrollTo:t.returnScroll||0})):(a.tab=t?.returnTab||a.tab||"home",g({scrollTo:t?.returnScroll||0})),d(`欢迎回来，${e.name}。`)}function Ps(){const{phone:e,name:t,orgName:n,orgType:i,title:o,contactPhone:r,email:c}=a.login,p=ye(e);if(!p||!p.active)return a.login.step=1,a.login.error="机构账号状态已变更，请联系院方超级管理员。",g(),d(a.login.error);const u=ja({phone:e,name:t,orgName:n,orgType:i,title:o,contactPhone:r,email:c});if(u){a.login.error=u,g(),d(u);return}const h=new Date().toISOString(),m=tt(a.login),v={phone:e,name:t.trim(),orgName:n.trim(),orgType:i,title:o.trim(),contactPhone:r||e,email:c.trim(),province:m.province,city:m.city,createdAt:xe(e)?.createdAt||h,updatedAt:h},f=Ee(v);Ht(f),cn(f)}function Oe(e=""){const t=Object.keys(a.chinaCities||{}).sort((i,o)=>i.localeCompare(o,"zh-CN"));return(t.length?t:["北京","天津","山东","山西","湖南","广东"]).map(i=>`<option value="${s(i)}" ${i===e?"selected":""}>${s(i)}</option>`).join("")}function me(e,t=""){const n=a.chinaCities?.[e]||(e==="北京"?["北京"]:[]);return(n.length?n:[e]).map(o=>`<option value="${s(o)}" ${o===t?"selected":""}>${s(o)}</option>`).join("")}function Vt(e=[],t=""){const n=Object.keys(a.chinaCities||{}),i=(e||[]).filter(c=>c&&c!=="全国"),o=n.find(c=>i.includes(c)||i.some(p=>(a.chinaCities?.[c]||[]).includes(p)));return o||H(t||"北京市","").province||"北京市"}function ka(e="",t=""){return(a.chinaCities?.[e]||(e?[e]:[])).map(i=>`<option value="${s(i)}" ${i===t?"selected":""}>${s(i)}</option>`).join("")}function wa(e=[],t="doctor-city-remove"){return(e||[]).map(n=>`
          <span>${l("mapPin",11)} ${s(n)}
            <button type="button" data-action="${s(t)}" data-city="${s(n)}" aria-label="移除${s(n)}">${l("close",10)}</button>
          </span>
        `).join("")}function ln(){if(!a.adminDoctorDraft)return;const e=document.getElementById("doctor-coverage-chips");e&&(e.innerHTML=wa(a.adminDoctorDraft.coverageCities||[])||"<small>尚未选择履约城市</small>");const t=document.querySelector('[data-action="doctor-coverage-national"]');t&&t.classList.toggle("is-active",!!a.adminDoctorDraft.coverageCities?.includes("全国"))}function Li(e,t){const n=Array.isArray(e)?[...e]:[];if(!t)return n;if(t==="全国")return["全国"];const i=n.filter(o=>o!=="全国");return i.includes(t)||i.push(t),i}function Ls(e){const t=a.session;return`
      <header class="topbar">
        <button class="topbar__brand" type="button" data-action="tab" data-tab="home" aria-label="返回首页">
          <img src="assets/logo.svg" alt="北京大学国际医院">
          <span>
            <strong>名医入企</strong>
            <small>白大褂到企 · 企业健康服务</small>
          </span>
        </button>
        <div class="topbar__actions">
          ${t?`<button class="avatar-button" type="button" data-action="tab" data-tab="me" aria-label="个人中心">${s(Qe(t.name))}</button>`:`<button class="topbar__login" type="button" data-action="start-login">机构登录 ${l("arrowRight",14)}</button>`}
        </div>
      </header>
    `}function Es(){return a.session?Ut(a.session.phone).filter(e=>e.status==="review").length:0}function Rs(e){const t=Es();return`
      <nav class="tabbar" aria-label="主导航">
        ${[{id:"home",label:"首页",icon:"home"},{id:"experts",label:"专家",icon:"experts"},{id:"appointments",label:"预约",icon:"calendar",badge:t},{id:"me",label:"我的",icon:"user"}].map(i=>`
              <button class="tabbar__item ${e===i.id?"is-active":""}" type="button"
                data-action="tab" data-tab="${i.id}">
                <span class="tabbar__icon">${l(i.icon,21)}${i.badge?`<i class="tabbar__badge">${i.badge}</i>`:""}</span>
                <span>${i.label}</span>
              </button>
            `).join("")}
      </nav>
    `}function Os(e,t){return`
      <div class="app-frame">
        <div class="app-content">
          ${Ls()}
          ${t}
        </div>
        ${Rs(e)}
      </div>
    `}function Hs({bookableOnly:e=!1}={}){const t=K(),n=ae();return a.experts.filter(i=>!(i.active===!1||i.hospitalId!==t?.id||!nt(i,n.province,n.city)||e&&!z(i).bookable)).sort((i,o)=>Ce.indexOf(i.tier)-Ce.indexOf(o.tier)||i.name.localeCompare(o.name,"zh-CN"))}function de(e=a.expertScope,t=a.expertAvailability){return ii({scope:e,availability:t})}function Bs(e){const t=z(e),n=Y(e);return`
      <button class="expert-mini" type="button" data-action="open-doctor" data-doctor-id="${s(e.id)}">
        <span class="expert-mini__media">
          <img src="${s(ke(e))}" alt="${s(e.name)}" loading="lazy" decoding="async">
          <span class="tier-dot tier-dot--${e.tier}">${s(n.short.replace("医生","").replace("专家",""))}</span>
        </span>
        <span class="expert-mini__body">
          <span class="expert-mini__name">${s(e.name)}<i>${s(e.deptTitle)}</i></span>
          <span class="expert-mini__hospital"><strong class="hospital-name">${s(e.hospital)}</strong></span>
          <span class="expert-mini__services">${(e.services||[]).map(i=>`<span>${s(L(i))}</span>`).join("")}</span>
          <span class="expert-mini__avail ${t.bookable?"is-open":"is-full"}">
            ${t.bookable?`最近可约 ${Le(t.next)}`:"暂无可约档期"}
          </span>
        </span>
      </button>
    `}function js(){const e=K(),t=a.geoStatus==="ready"&&Number.isFinite(Number(a.geoLat))&&Number.isFinite(Number(a.geoLng))?{lat:Number(a.geoLat),lng:Number(a.geoLng)}:null;return[...a.hospitals].sort((n,i)=>{if(t&&Number.isFinite(Number(n.lat))&&Number.isFinite(Number(n.lng))&&Number.isFinite(Number(i.lat))&&Number.isFinite(Number(i.lng)))return Xa(t.lat,t.lng,n.lat,n.lng)-Xa(t.lat,t.lng,i.lat,i.lng);if(n.id===e?.id)return-1;if(i.id===e?.id)return 1;const o=n.province===e?.province?0:1,r=i.province===e?.province?0:1;return o-r||n.name.localeCompare(i.name,"zh-CN")})}function Ei(){const e=K(),t=js(),n=!a.homeRegion&&["denied","error","unavailable"].includes(a.geoStatus),i=!!a.homeRegion&&!ma(e,a.homeRegion),o=a.homeRegion?i?`手动城市 · ${C(a.homeRegion.province,a.homeRegion.city)} · 本地暂无履约医院`:`手动城市 · ${C(a.homeRegion.province,a.homeRegion.city)}`:a.geoStatus==="loading"?"定位中…":n?"未获取定位 · 选择城市":a.homeHospitalId?`已手动切换 · ${C(e?.province,e?.city)}`:a.geoStatus==="ready"?"按当前位置推荐":a.session?`按${C(a.session.province,a.session.city)}推荐`:"定位后推荐最近医院",r=!n&&a.geoStatus==="ready"&&Number.isFinite(Number(a.geoLat))?" · 按距离排序":"",c=e?.name||"请选择医院";return`
      <div class="hero-hospital">
        <span class="hero-hospital__pin">${l("mapPin",15)}</span>
        <span class="hero-hospital__body">
          <span class="hero-hospital__meta">
            <small>${s(o)}${r}</small>
          </span>
          <span class="hero-hospital__select-wrap">
            <span class="hero-hospital__selected-name" title="${s(c)}">${s(c)}</span>
            <select data-home-hospital-picker aria-label="切换履约医院">
              ${t.map(p=>`<option value="${s(p.id)}" ${p.id===e?.id?"selected":""}>${s(p.name)}</option>`).join("")}
            </select>
            <span class="hero-hospital__chevron">${l("chevronDown",13)}</span>
          </span>
        </span>
        <button class="hero-hospital__city ${n?"is-needed":""}" type="button" data-action="home-city-open">${a.homeRegion?"改城市":"选择城市"}</button>
        <button class="hero-hospital__locate" type="button" data-action="home-use-location"
          aria-label="重新定位" title="重新定位">
          ${l("crosshair",15)}
        </button>
      </div>
    `}function Ri(){const e=K(),t=Hs({bookableOnly:!0});return`
      <section class="section">
        <div class="section-head">
          <div>
            <h2>${a.homeHospitalId?"该院可预约专家":"就近可预约专家"}</h2>
            <p id="home-nearby-summary">${s(e?.name||"")} · ${t.length} 位近期可约 · 专业医生优先</p>
          </div>
          <button class="text-link" type="button" data-action="home-hospital-experts">
            全部专家 ${l("chevronRight",14)}
          </button>
        </div>
        <div class="expert-mini-list" id="home-nearby-experts">
          ${t.length?t.slice(0,4).map(Bs).join(""):'<div class="inline-empty">该院近期暂无号源，可切换医院查看，或发起提需由院方协调。</div>'}
        </div>
      </section>
    `}function Oi(){const e=K()||a.hospitals[0],t=e?a.experts.filter(c=>c.hospitalId===e.id&&c.active!==!1):[],n=new Set(t.map(c=>String(c.dept||"").trim()).filter(Boolean)),i=e?ne(e.id,B()):null,o=ae(),r=e?rt(i,e.id,o.province,o.city).length:0;return`
      <div><strong>${t.length}<span>位</span></strong><small>本院专家</small></div>
      <div><strong>${n.size}<span>个</span></strong><small>覆盖科室</small></div>
      <div><strong>${r}<span>个</span></strong><small>本月课题</small></div>
    `}function yt(){if(a.screen!=="main"||a.tab!=="home")return;const e=document.getElementById("home-hospital-picker"),t=document.getElementById("home-nearby-section"),n=document.getElementById("home-metrics"),i=document.getElementById("home-season-banner"),o=document.getElementById("home-tiers"),r=document.getElementById("home-services");e&&(e.innerHTML=Ei()),t&&(t.innerHTML=Ri()),n&&(n.innerHTML=Oi()),i&&(i.innerHTML=Hi()),o&&(o.innerHTML=Bi()),r&&(r.innerHTML=ji())}function Us(){const e=ae();a.homeRegionDraft={province:e.province,city:e.city},Re({type:"home-city"})}function Fs(){const e=a.homeRegionDraft;return e?`
      <div class="sheet-backdrop" data-action="close-overlay"></div>
      <section class="sheet home-city-sheet" role="dialog" aria-modal="true" aria-label="选择所在城市">
        <div class="sheet__grabber"></div>
        <div class="sheet__bar">
          <div><h2>选择所在城市</h2><p>用于推荐附近医院与筛选可履约专家</p></div>
          <button class="sheet__close" type="button" data-action="close-overlay" aria-label="关闭">
            ${l("close",15)}
          </button>
        </div>
        <div class="sheet__body">
          <div class="sheet-pad">
            <div class="template-form-note">${l("mapPin",13)} 定位未开启或不准确时，可手动选择城市。保存后首页按该城市推荐医院，专家库“全部医院”只展示可服务该城市的专家。</div>
            <div class="field-row">
              <div class="field"><label>省份</label>
                <select data-home-region-province>${Oe(e.province)}</select>
              </div>
              <div class="field"><label>城市</label>
                <select data-home-region-city>${me(e.province,e.city)}</select>
              </div>
            </div>
          </div>
        </div>
        <div class="sheet__footer">
          <button class="btn btn--ghost" type="button" data-action="close-overlay">取消</button>
          <button class="btn btn--primary" type="button" data-action="home-city-save">
            使用该城市 ${l("check",14)}
          </button>
        </div>
      </section>
    `:""}function qs(){const e=a.homeRegionDraft;if(!e?.province||!e?.city)return d("请选择省份和城市。");const t=a.hospitals.find(i=>ma(i,e)),n=rs(e);a.homeRegionDraft=null,$a()||(ue(),F()),g({scrollTo:Q()}),d(t?`已切换到${C(e.province,e.city)}，优先推荐${t.name}。`:n?`已切换到${C(e.province,e.city)}，本地暂无履约医院，已推荐最近的${n.name}。`:`已切换到${C(e.province,e.city)}。`)}function Hi(){const e=B(),t=K()||a.hospitals[0],n=t?ne(t.id,e):null,i=qt(e),o=ae(),r=(n?rt(n,t?.id,o.province,o.city):[]).slice(0,2);return r.length?`
        <section class="season-banner season-banner--media season-banner--art season-tone--${_i(e)}" data-action="theme-open"
          data-month="${e}" data-hospital-id="${s(t?.id||"")}">
          <span class="season-banner__art" aria-hidden="true">
            <i class="season-banner__glow"></i>
            <i class="season-banner__ring season-banner__ring--outer"></i>
            <i class="season-banner__ring season-banner__ring--inner"></i>
            <i class="season-banner__spark season-banner__spark--one"></i>
            <i class="season-banner__spark season-banner__spark--two"></i>
            <span class="season-banner__glyph">${l($s(e),108)}</span>
          </span>
          <div class="season-banner__shade"></div>
          <div class="season-banner__content">
            <div class="season-banner__head">
              <span class="season-banner__month">${e}月</span>
              <div>
                <small>${s(t?.short||"本院")} · 本月时令主题</small>
                <strong>${s(ga(n?.season||i?.season||""))}</strong>
              </div>
              <button class="season-banner__cta" type="button" data-action="theme-open"
                data-month="${e}" data-hospital-id="${s(t?.id||"")}">查看主题 ${l("arrowRight",13)}</button>
            </div>
            <p>${s(n?.focus||i?.focus||"")}</p>
            <div class="season-banner__topics">
              ${r.length?r.map((c,p)=>`
                    <button type="button" data-action="theme-topic" data-month="${e}"
                      data-hospital-id="${s(t?.id||"")}"
                      data-topic-index="${p}">
                      <i>${s(c.dept)}</i><span>${s(c.title)}</span>
                    </button>
                  `).join(""):'<span class="season-banner__empty">本月暂无已绑定专家的时令课题</span>'}
            </div>
          </div>
        </section>
    `:""}function Bi(){const e=K()||a.hospitals[0];return`
        <section class="section">
          <div class="section-head">
            <div><h2>三级专家资源</h2><p>按活动规格与预约周期匹配</p></div>
          </div>
          <div class="tier-row">
            ${Ie.map(t=>{const n=Ge[t],i=a.experts.filter(r=>r.tier===t&&r.active!==!1&&r.hospitalId===e?.id),o=i.filter(r=>z(r).bookable).length;return`
                <button class="tier-card tier-card--${t}" type="button" data-action="tier-open" data-value="${t}">
                  <span class="tier-card__tag">${s(n.tag)}</span>
                  <strong>${s(n.short)}</strong>
                  <span class="tier-card__count">${i.length} 位专家</span>
                  <small>${o} 位近期可约 · ${n.leadDays} 天预约周期</small>
                  <span class="tier-card__arrow">${l("chevronRight",14)}</span>
                </button>
              `}).join("")}
          </div>
        </section>
    `}function ji(){const e=K()||a.hospitals[0];return`
        <section class="section">
          <div class="section-head">
            <div><h2>到企服务类型</h2><p>讲座、健康咨询与 1V1 报告解读</p></div>
          </div>
          <div class="service-grid">
            ${Pe.map((t,n)=>{const i=Ha[t],r=`${us(t,e?.id)} 位本院专家可服务`;return`
                <button class="service-card" type="button" data-action="service-open" data-value="${s(t)}">
                  <span class="service-card__num">0${n+1}</span>
                  <span class="service-card__icon">${l(t==="讲座"?"message":t==="健康咨询"?"stethoscope":"users",19)}</span>
                  <strong>${s(i.label)}</strong>
                  <p>${s(i.desc)}</p>
                  <span class="service-card__count">${r}</span>
                </button>
              `}).join("")}
          </div>
        </section>
    `}function Vs(){return`
      <div class="screen">
        <section class="hero">
          <div class="hero__media">
            <img src="assets/hero-campus-960.jpg" alt="北京大学国际医院" width="960" height="411"
              fetchpriority="high" decoding="async">
          </div>
          <div class="hero__content">
            <div id="home-hospital-picker">${Ei()}</div>
            <span class="hero__kicker"><i></i> 白大褂到企 · 名医入企计划</span>
            <h1>把医学专家<br><em>请到企业身边</em></h1>
            <p>面向保险公司与企业，提供讲座、健康咨询与 1V1 报告解读。按医院、科室与时令主题匹配专家，院方项目组全程跟进。</p>
            <div class="hero__actions">
              <button class="btn btn--accent" type="button" data-action="open-booking">
                发起活动预约 ${l("arrowRight",15)}
              </button>
              <button class="btn btn--glass" type="button" data-action="tab" data-tab="experts">
                浏览专家库
              </button>
            </div>
            <div class="hero__metrics" id="home-metrics">
              ${Oi()}
            </div>
          </div>
        </section>

        <div id="home-season-banner">${Hi()}</div>

        <div id="home-nearby-section">${Ri()}</div>

        <div id="home-tiers">${Bi()}</div>

        <div id="home-services">${ji()}</div>

        <section class="section">
          <div class="section-head">
            <div><h2>从预约到到企</h2><p>机构与院方双向确认，过程可追踪</p></div>
          </div>
          <div class="flow-card">
            ${[["提交预约","选择服务、专家与日期，填写活动地址与需求。"],["院方接单","医院运营接单后，页面显示具体项目对接人。"],["院方方案","院方填写课题、时间、地点、大纲与项目组。"],["机构确认","机构查看方案，确认无误或提出修改意见。"],["活动执行","双方按最终方案执行，完成后归档。"]].map(([e,t],n)=>`
                  <div class="flow-card__step">
                    <span>0${n+1}</span>
                    <div><strong>${e}</strong><p>${t}</p></div>
                  </div>
                `).join("")}
          </div>
        </section>

        <section class="demand-cta">
          <span class="demand-cta__icon">${l("sparkles",20)}</span>
          <div>
            <strong>没有合适的专家？</strong>
            <p>提交提需单，说明活动主题与人群，医院运营会电话沟通并协助匹配。</p>
          </div>
          <button class="btn btn--primary btn--sm" type="button" data-action="open-demand">发起提需</button>
        </section>

        <p class="source-note">
          专家资料、医院与服务信息参考院方整理表（2026-11-24），仅用于本演示。实际出讲专家、号源与排期以院方最终确认为准。
        </p>
        <section class="hospital-entry-section">
          <button class="hospital-entry" type="button" data-action="open-admin">
            <span class="hospital-entry__icon">${l("shield",19)}</span>
            <span class="hospital-entry__copy">
              <strong>院方工作台</strong>
              <small>超级管理员 · 医院运营人员登录</small>
            </span>
            ${l("arrowRight",16)}
          </button>
        </section>
      </div>
    `}function Ks(e,t){const n=new Set([...(e?.expertIds||[]).map(String),...(e?.topics||[]).map(o=>String(o.expertId||"")).filter(Boolean)]);return[...new Map(a.experts.filter(o=>o.hospitalId===t&&o.active!==!1&&j(o,"讲座")).map(o=>[String(o.id),o])).values()].filter(o=>n.has(String(o.id)))}function dn(e=B(),t=-1,n=""){const i=k(n)||K()||a.hospitals[0];i&&Re({type:"theme",month:Number(e)||B(),hospitalId:i.id,topicIndex:Number(t)})}function zs(e,t=-1){if(Number(e)!==B()){d("非本月时令主题仅可浏览，预约请选择本月主题。");return}const n=k(a.overlay?.hospitalId)||K()||a.hospitals[0],i=ne(n?.id,e),r=a.overlayStack.some(v=>v.type==="booking")&&!!a.booking?{province:a.booking.province,city:a.booking.city}:ae(),c=rt(i,n?.id,r.province,r.city),p=t>=0?c[t]:null,u=p?ie(p,i,n?.id):null,h=p?.expertId?D(p.expertId):null,m=h&&st(z(h),Number(e)).bookable?h.id:"";zt(m,"","讲座",p?.title||"",{month:Number(e),topicId:p?.id||"",coverageLabel:u?.label||"",coverageCities:u?.cities||[],hospitalId:n?.id||""})}function Ws(){const e=Number(a.overlay?.month)||B(),t=k(a.overlay?.hospitalId)||K()||a.hospitals[0],n=ne(t?.id,e)||on(t?.id,e);if(!n)return"";const i=e===B(),o=a.overlayStack.some(x=>x.type==="booking"),r=o&&a.booking?pn(a.booking):0,c=!!(o&&r===e),p=i||c,u=Ks(n,t?.id),h=Number(a.overlay?.topicIndex),m=Number.isInteger(h)&&h>=0?h:-1,v=o&&a.booking?{province:a.booking.province,city:a.booking.city,label:"本次活动履约地"}:(()=>{const x=ae();return{province:x.province||t?.province||"",city:x.city||t?.city||"",label:a.homeRegion?"当前选择城市":a.geoStatus==="ready"?"当前定位城市":"当前登录城市"}})(),f=H(v.province,v.city),_=rt(n,t?.id,f.province,f.city,o&&a.booking?{topicId:a.booking.themeTopicId,title:a.booking.customTopic}:{}),S=u.filter(x=>za(x,e,f.province,f.city,t?.id)),$=_.map(x=>{const Xe=ie(x,n,t?.id),oe=x.expertId?D(x.expertId):null,Ne=oe&&oe.hospitalId===t?.id&&oe.active!==!1&&j(oe,"讲座")?oe:null,Oa=Ne?st(z(Ne),e):{bookable:!1,next:"",remaining:0,dates:[]},na=we(Xe,f.province,f.city);return{topic:x,coverage:Xe,expert:Ne,availability:Oa,available:na,bookable:na&&!!Ne&&Oa.bookable}}),I=$.filter(x=>x.available).length,W=$.filter(x=>x.bookable).length,A=m>=0?$[m]:null,Z=!A||A.available,be=[...new Set($.map(x=>x.coverage.label).filter(Boolean))],Ct=be.length<=1?be[0]||"待院方配置":`${be.length} 类`;return`
      <div class="sheet-backdrop" data-action="close-overlay"></div>
      <section class="sheet theme-sheet" role="dialog" aria-modal="true" aria-label="${n.month}月时令主题">
        <div class="sheet__grabber theme-sheet__grabber"></div>
        <div class="theme-hero">
          <img src="${s(n.image||ba(e))}" alt="${s(n.season)}" width="900" height="560" decoding="async">
          <div class="theme-hero__shade"></div>
          <div class="theme-hero__top">
            <span>${l("leaf",13)} 时令主题 · 讲座</span>
            <div class="theme-hero__top-actions">
              ${p?"":`<em class="theme-readonly-badge">${l("history",11)} 往期主题 · 仅供浏览</em>`}
              <button type="button" data-action="close-overlay" aria-label="关闭">
                ${l("close",15)}
              </button>
            </div>
          </div>
          <div class="theme-hero__copy">
            <span class="theme-hero__month">${e}月${wi(n.season)?` · ${s(wi(n.season))}`:""}</span>
            <h2>${s(ga(n.season))}</h2>
            <p>${s(n.focus)}</p>
          </div>
        </div>
        <div class="sheet__body">
          <div class="theme-sheet__content">
            <div class="theme-intro">
              <span class="theme-kicker">THEME BRIEF</span>
              <p>${s(n.intro)}</p>
            </div>
            <div class="theme-city-check ${I?"is-available":"is-warning"}">
              <span class="theme-city-check__icon">${l("mapPin",15)}</span>
              <span class="theme-city-check__copy">
                <small>${s(v.label)}</small>
                <strong>${s(C(f.province,f.city))}</strong>
              </span>
              <em>${p?`${W}/${_.length} 个课题可约`:`${I}/${_.length} 个课题覆盖本地`}</em>
            </div>
            <div class="theme-stats">
              <div><strong>${S.length}</strong><span>位本院专家</span></div>
              <div><strong>${_.length}</strong><span>个讲座课题</span></div>
              <div><strong>${s(Ct)}</strong><span>主题履约范围</span></div>
            </div>
            <section class="theme-section">
              <div class="theme-section__head">
                <div><small>${i?"本月关注":`${e} 月关注`}</small><h3>时令健康重点</h3></div>
                <span>${s(t?.short||"")}</span>
              </div>
              <div class="theme-focus-grid">
                <div><span>重点关注</span><p>${s(n.diseases)}</p></div>
                <div><span>适合行业</span><p>${s(n.industries)}</p></div>
              </div>
            </section>
            <section class="theme-section">
              <div class="theme-section__head">
                <div><small>Lecture topics</small><h3>${i?"本月推荐讲座":c?`${e} 月推荐讲座`:"往期讲座课题"}</h3></div>
                <span>${p?o?"点选后返回预约确认":"点选后统一预约":"仅作浏览，不可预约"}</span>
              </div>
              <div class="theme-topic-list">
                ${_.length?_.map((x,Xe)=>{const oe=$[Xe],Ne=oe.expert,Oa=p?oe.available?Ne?oe.availability.bookable?`当前城市可约 · 最近 ${Le(oe.availability.next)}`:"专家暂无号源":"主讲专家待确认":"当前城市不可约":oe.available?"覆盖当前城市":"不在当前城市履约",na=p?!oe.bookable:!oe.available,Fo=`
                        <span class="theme-topic-card__dept">${s(x.dept||"综合")}</span>
                        <strong>${s(x.title)}</strong>
                        <small>${Ne?`${s(Ne.name)} · ${s(Ne.deptTitle)}`:"主讲专家待确认"}</small>
                        <em class="theme-topic-card__coverage ${na?"is-unavailable":""}">${l("mapPin",10)} ${s(oe.coverage.label)} · ${s(Oa)}</em>
                        <i>${l(p?"arrowRight":"history",13)}</i>
                    `;return p?`<button class="theme-topic-card ${Xe===m?"is-focus":""} ${na?"is-unavailable":""}" type="button"
                          data-action="theme-topic-focus" data-month="${e}"
                          data-topic-index="${Xe}">${Fo}</button>`:`<div class="theme-topic-card is-readonly">${Fo}</div>`}).join(""):`<div class="theme-topic-empty">${l("leaf",18)}<strong>${e} 月暂无已绑定专家的时令课题</strong><p>医院运营配置课题并绑定本院讲座专家后，会在这里展示。</p></div>`}
              </div>
            </section>
            <section class="theme-section">
              <div class="theme-section__head">
                <div><small>Expert team</small><h3>${i?"本月绑定专家":`${e} 月绑定专家`}</h3></div>
                <button class="theme-text-btn" type="button" data-action="theme-experts"
                  data-month="${e}" data-hospital-id="${s(t?.id||"")}">查看全部 ${l("chevronRight",12)}</button>
              </div>
              <div class="theme-expert-row">
                ${S.length?S.slice(0,4).map(x=>`
                            <button class="theme-expert" type="button" data-action="open-doctor"
                              data-doctor-id="${s(x.id)}" data-month="${e}"
                              data-theme-month="${p?e:0}">
                              <img src="${s(ke(x))}" alt="${s(x.name)}" loading="lazy" decoding="async">
                              <strong>${s(x.name)}</strong>
                              <small>${s(x.dept)} · ${s(x.deptTitle)}</small>
                            </button>
                          `).join(""):'<div class="theme-expert-empty">当前城市暂无可履约的本月绑定专家</div>'}
              </div>
            </section>
            <section class="theme-section">
              <div class="theme-section__head">
                <div><small>Service cities</small><h3>课题履约城市</h3></div>
                <span>按课题独立匹配</span>
              </div>
              <div class="theme-city-chips">
                ${be.length?be.map(x=>`<span>${l("mapPin",11)} ${s(x)}</span>`).join(""):"<span>待院方配置</span>"}
              </div>
            </section>
            <p class="theme-sheet__note">${e} 月课题、绑定专家与覆盖城市由${s(t?.name||"院方")}配置；每个课题的履约地独立于专家日常服务范围，最终出讲安排以院方确认为准。</p>
          </div>
        </div>
        <div class="theme-sheet__footer ${p?"":"is-readonly"}">
          <button class="theme-filter-btn" type="button" data-action="theme-experts"
            data-month="${e}" data-hospital-id="${s(t?.id||"")}">按月筛专家</button>
          ${p?o?`<button class="btn btn--primary" type="button" data-action="theme-topic-confirm"
                  data-month="${e}" data-topic-index="${m}" ${m<0||!Z?"disabled":""}>
                  ${m<0?"先点选一个课题":Z?A?.bookable?"选择该主题":A?.expert?"专家暂无号源 · 进入预约协调":"主讲待确认 · 进入预约协调":`当前城市不可约 · ${s(f.city)}`} ${l(m>=0&&Z&&A?.bookable?"check":"chevronRight",15)}
                </button>`:`<button class="btn btn--primary" type="button" data-action="theme-book"
                  data-month="${e}" data-topic-index="${m>=0?m:-1}"
                  ${m>=0&&!Z?"disabled":""}>
                  ${m<0?"预约本月主题":Z?A?.bookable?"预约该主题":A?.expert?"专家暂无号源 · 进入预约协调":"主讲待确认 · 进入预约协调":`当前城市不可约 · ${s(f.city)}`} ${l("arrowRight",15)}
                </button>`:`<span class="theme-sheet__readonly-note">${l("history",15)}
                  <span><strong>往期主题仅供浏览</strong><small>预约请选择 ${B()} 月时令主题</small></span>
                </span>`}
        </div>
      </section>
    `}function Xs(e){const t=Y(e),n=a.expertMonth>0?st(z(e),a.expertMonth):z(e),i=a.expertMonth>0?[{service:"讲座"}]:si(e);return`
      <button class="expert-card" type="button" data-action="open-doctor" data-doctor-id="${s(e.id)}" data-month="${a.expertMonth||0}" data-theme-month="${a.expertMonth===B()?B():0}">
        <span class="expert-card__media">
          <img src="${s(ke(e))}" alt="${s(e.name)}" loading="lazy" decoding="async">
          <span class="expert-card__tier tier-tag tier-tag--${e.tier}">${s(t.short)}</span>
        </span>
        <span class="expert-card__body">
          <span class="expert-card__head">
            <span><strong>${s(e.name)}</strong><i>${s(e.deptTitle)}</i></span>
            <span class="expert-card__avail ${n.bookable?"is-open":"is-full"}">
              ${n.bookable?`${a.expertMonth>0?`${a.expertMonth}月`:""}可约 ${Le(n.next)}`:a.expertMonth>0?`${a.expertMonth}月暂无号源`:"暂无号源"}
            </span>
          </span>
          <span class="expert-card__hospital">${l("building",12)} <strong class="hospital-name">${s(e.hospital)}</strong> · ${s(e.dept)}</span>
          <span class="expert-card__intro">${s(ds(e))}</span>
          <span class="expert-card__foot">
            <span class="expert-card__services">${i.map(({service:o})=>`<span>${s(L(o))}</span>`).join("")}</span>
            <span class="expert-card__more">详情 ${l("chevronRight",11)}</span>
          </span>
        </span>
      </button>
    `}function Ui(){const e=de(),t=mt(),n=ae(),i=a.expertAvailability==="bookable"?" · 当前可约":a.expertAvailability==="local"?" · 当地医院可约":"";return`
      <div class="expert-result-meta">
        <span><b>${e.length}</b> 位专家${i}</span>
        <span>${a.expertScope==="nearby"?s(t?.name||"就近医院"):`${a.expertAvailability==="local"?"当地医院":"全部医院"} · ${s(C(n.province,n.city))}${a.expertMonth>0?"时令课题可履约":"可履约"}`}</span>
      </div>
      ${e.length?`<div class="expert-list">${e.map(Xs).join("")}</div>`:a.expertService==="1V1报告解读"?`<div class="empty-state">
              <span class="empty-state__icon">${l("users",26)}</span>
              <h3>当前范围暂无可提供 1V1 报告解读的专家</h3>
              <p>专家为预约必选项。可切换到全部地区查看，或发起提需由医院运营人员电话沟通匹配。</p>
              <button class="btn btn--primary btn--sm" type="button" data-action="open-demand">
                发起提需
              </button>
            </div>`:`<div class="empty-state">
              <span class="empty-state__icon">${l("search",26)}</span>
              <h3>没有匹配的可预约专家</h3>
              <p>可以切换“全部地区”，或发起提需由院方协助匹配。</p>
              <button class="btn btn--primary btn--sm" type="button" data-action="open-demand">发起提需</button>
            </div>`}
    `}function Fi(e=""){return a.expertMonth>0?`
        <div class="filter-scroll filter-scroll--services" id="expert-service-filter"
          data-filter-mode="month">
          <span class="filter-label">服务类型</span>
          <button class="chip is-active" type="button" data-action="expert-service"
            data-value="讲座">${s(L("讲座"))}<span class="chip__count">${de().length}</span></button>
          <span class="filter-month-note">${l("leaf",10)} 月令主题仅对应讲座，按课题履约地筛选</span>
          <button class="filter-reset-link" type="button" data-action="expert-month-clear">
            清除月令筛选
          </button>
        </div>
      `:`
      <div class="filter-scroll filter-scroll--services" id="expert-service-filter"
        data-filter-mode="all">
        <span class="filter-label">服务类型</span>
        <button class="chip ${a.expertService==="all"?"is-active":""}" type="button"
          data-action="expert-service" data-value="all">全部服务</button>
        ${Pe.map(t=>`<button class="chip ${a.expertService===t?"is-active":""}" type="button"
              data-action="expert-service" data-value="${s(t)}">${s(L(t))}<span class="chip__count">${oi(t)}</span></button>`).join("")}
      </div>
    `}function Ys(){const e=mt(),t=a.expertHospitalId?"当前医院":"就近医院",n=de("nearby").length,i=de("all").length,o=de(a.expertScope,"bookable").length,r=de(a.expertScope,"local").length,c=de(a.expertScope,"all").length,p=a.expertScope==="nearby"&&e?.id||"";return`
      <div class="screen experts-screen">
        <header class="page-head page-head--tight">
          <span class="eyebrow"><i></i> Expert Network</span>
          <h1>专家库</h1>
          <p>${a.expertService==="all"?"按医院、梯队、科室、服务类型与时令主题匹配专家。":`当前展示「${s(L(a.expertService))}」对应专家。`}</p>
        </header>
        <div class="expert-toolbar" id="expert-toolbar">
          <div class="expert-toolbar__row">
            <div class="segmented segmented--scope">
              <button class="${a.expertScope==="nearby"?"is-active":""}" type="button"
                data-action="expert-scope" data-value="nearby">${t} <span>${n}</span></button>
              <button class="${a.expertScope==="all"?"is-active":""}" type="button"
                data-action="expert-scope" data-value="all">全部医院 <span>${i}</span></button>
            </div>
            <button class="icon-button ${a.expertSearchOpen?"is-active":""}" type="button"
              data-action="expert-search-toggle" aria-label="搜索专家">${l("search",17)}</button>
          </div>
          ${qi()}
          <div class="filter-scroll filter-scroll--tier">
            ${[["all","全部梯队"],["elite","大咖"],["director","主任"],["specialist","专业"]].map(([u,h])=>`<button class="chip ${a.expertTier===u?"is-active":""}" type="button"
                    data-action="expert-tier" data-value="${u}">${h}</button>`).join("")}
            <i class="filter-divider"></i>
            <button class="chip ${a.expertAvailability==="bookable"?"is-active":""}" type="button"
              data-action="expert-availability" data-value="bookable">当前可约<span class="chip__count">${o}</span></button>
            <button class="chip ${a.expertAvailability==="local"?"is-active":""}" type="button"
              data-action="expert-availability" data-value="local">只看当地可约<span class="chip__count">${r}</span></button>
            <button class="chip ${a.expertAvailability==="all"?"is-active":""}" type="button"
              data-action="expert-availability" data-value="all">全部专家<span class="chip__count">${c}</span></button>
          </div>
          ${Fi(p)}
          <div class="expert-select-filters">
            <label>
              <span>${l("leaf",11)} 月份时令 <em>可选</em></span>
              <select data-expert-month>
                <option value="0" ${a.expertMonth===0?"selected":""}>不筛选月令</option>
                ${Array.from({length:12},(u,h)=>h+1).map(u=>`<option value="${u}" ${a.expertMonth===u?"selected":""}>${u}月 · ${s(qt(u)?.season||"")}</option>`).join("")}
              </select>
            </label>
            <label>
              <span>${l("experts",11)} 科室方向</span>
              <select data-expert-dept>
                <option value="all">全部科室</option>
                ${xn.map(u=>`<option value="${s(u)}" ${a.expertDept===u?"selected":""}>${s(u)}</option>`).join("")}
              </select>
            </label>
          </div>
          <p class="expert-toolbar__hint" id="expert-scope-hint">${l("mapPin",11)} ${a.expertScope==="nearby"?`优先展示 ${s(e?.name||"就近医院")}${a.expertAvailability==="all"?" · 含暂无号源专家":a.expertAvailability==="local"?" · 仅显示本院可约专家":" · 仅显示当前可约专家"}`:`${a.expertAvailability==="local"?"当地医院":"全部医院"}中，展示可服务${s(C(ae().province,ae().city))}的专家${a.expertAvailability==="all"?" · 含暂无号源":" · 当前可约"}`}</p>
        </div>
        <div id="expert-results">${Ui()}</div>
        <div class="expert-bottom-cta">
          <div><strong>没有合适的专家？</strong><span>提交提需，院方电话沟通匹配</span></div>
          <button class="btn btn--primary btn--sm" type="button" data-action="open-demand">发起提需</button>
        </div>
      </div>
    `}function qi(){return a.expertSearchOpen?`<div class="expert-search">
          ${l("search",16)}
          <input id="expert-search" type="search" placeholder="搜索姓名、医院、科室或主题"
            value="${s(a.expertSearch)}" data-expert-search autocomplete="off">
          <button type="button" data-action="expert-search-clear" aria-label="清空">${l("close",12)}</button>
        </div>`:""}function Gs(){const e=document.getElementById("expert-toolbar");if(!e)return;const t=e.querySelector(".expert-search"),n=e.querySelector('[data-action="expert-search-toggle"]');if(n&&n.classList.toggle("is-active",a.expertSearchOpen),a.expertSearchOpen&&!t){const i=e.querySelector(".expert-toolbar__row");i&&i.insertAdjacentHTML("afterend",qi())}else!a.expertSearchOpen&&t&&t.remove()}function Se(){const e=document.getElementById("expert-results");e&&(e.innerHTML=Ui()),document.querySelectorAll('[data-action="expert-scope"]').forEach(t=>{t.classList.toggle("is-active",t.dataset.value===a.expertScope)}),document.querySelectorAll('[data-action="expert-tier"]').forEach(t=>{t.classList.toggle("is-active",t.dataset.value===a.expertTier)}),document.querySelectorAll('[data-action="expert-service"]').forEach(t=>{t.classList.toggle("is-active",t.dataset.value===a.expertService)}),document.querySelectorAll('[data-action="expert-availability"]').forEach(t=>{t.classList.toggle("is-active",t.dataset.value===a.expertAvailability)}),Ki(),Zs(),Vi()}function Zs(){const e=document.querySelector('[data-action="expert-scope"][data-value="nearby"] span');e&&(e.textContent=String(de("nearby").length));const t=document.querySelector('[data-action="expert-scope"][data-value="all"] span');t&&(t.textContent=String(de("all").length))}function Vi(){const e=document.getElementById("expert-service-filter");if(e){if(a.expertMonth>0){const t=e.querySelector('[data-action="expert-service"][data-value="讲座"] .chip__count');t&&(t.textContent=String(de().length));return}e.querySelectorAll('[data-action="expert-service"][data-value]').forEach(t=>{if(t.classList.toggle("is-active",t.dataset.value===a.expertService),t.dataset.value==="all")return;const n=t.querySelector(".chip__count");n&&(n.textContent=String(oi(t.dataset.value)))})}}function Ki(){const e=de(a.expertScope,"bookable").length,t=de(a.expertScope,"local").length,n=de(a.expertScope,"all").length,i=document.querySelector('[data-action="expert-availability"][data-value="bookable"] .chip__count'),o=document.querySelector('[data-action="expert-availability"][data-value="local"] .chip__count'),r=document.querySelector('[data-action="expert-availability"][data-value="all"] .chip__count');i&&(i.textContent=String(e)),o&&(o.textContent=String(t)),r&&(r.textContent=String(n))}function $t(e={}){a.expertScope=e.scope||"nearby",a.expertHospitalId=e.hospitalId||"",a.expertTier=e.tier||"all",a.expertService=e.service||"all",a.expertMonth=Number(e.month)||0,a.expertDept=e.dept||"all",a.expertAvailability=e.availability||"bookable",a.expertSearch=e.search||"",a.expertSearchOpen=!!e.searchOpen}function Kt(){const e=mt(),t=a.expertScope==="nearby"&&e?.id||"",n=document.getElementById("expert-service-filter"),i=a.expertMonth>0?"month":"all";n&&n.dataset.filterMode!==i&&(n.outerHTML=Fi(t)),document.querySelectorAll('[data-action="expert-scope"]').forEach(o=>{o.classList.toggle("is-active",o.dataset.value===a.expertScope)}),document.querySelectorAll('[data-action="expert-tier"]').forEach(o=>{o.classList.toggle("is-active",o.dataset.value===a.expertTier)}),document.querySelectorAll('[data-action="expert-availability"]').forEach(o=>{o.classList.toggle("is-active",o.dataset.value===a.expertAvailability)}),Ki(),Vi(),Bo()}function Js(){const e=D(a.overlay?.doctorId);if(!e)return"";const t=Y(e),n=Number(a.overlay?.themeMonth)||0,i=n||Number(a.overlay?.month)||B(),o=z(e),r=n?st(o,n):o,p=ne(e.hospitalId,i)||qt(i),u=Si(e,i),h=n>0&&u.length===0,m=r.bookable&&!h,v=nn(e),f=a.overlayStack.some($=>$.type==="booking"),_=f&&a.booking?.doctorId===e.id,S=ni(e,a.expertService);return`
      <div class="sheet-backdrop" data-action="close-overlay"></div>
      <section class="sheet doctor-sheet" role="dialog" aria-modal="true" aria-label="${s(e.name)}专家详情">
        <div class="sheet__grabber doctor-hero__grabber"></div>
        <div class="doctor-hero">
          <div class="doctor-hero__bg"></div>
          <div class="doctor-hero__top">
            <span class="tier-tag tier-tag--${e.tier}">${s(t.short)}</span>
            <button class="doctor-hero__close" type="button" data-action="close-overlay" aria-label="关闭">
              ${l("close",15)}
            </button>
          </div>
          <div class="doctor-hero__person">
            <img src="${s(is(e))}" alt="${s(e.name)}" decoding="async">
            <div>
              <h1>${s(e.name)}</h1>
              <p>${s(e.deptTitle)}</p>
              <span>${s(e.hospital)}</span>
            </div>
          </div>
          <div class="doctor-hero__meta">
            <span>${l("clock",12)} ${s(e.leadLabel||t.leadDays+" 天预约周期")}</span>
            <span>${l("mapPin",12)} ${s(te(e))}</span>
            <span class="doctor-hero__avail ${r.bookable?"is-open":"is-full"}">
              ${r.bookable?`${n?`${n} 月`:"最近"}可约 ${Le(r.next)}`:`${n?`${n} 月`:""}暂无可约档期`}
            </span>
          </div>
        </div>
        <div class="sheet__body">
          <div class="doctor-sheet__content">
            <span class="doctor-services__label">可服务类型</span>
            <div class="doctor-services">
              ${si(e).map(({service:$})=>`<span>${l($==="讲座"?"message":$==="健康咨询"?"stethoscope":"users",13)} ${s(L($))}</span>`).join("")}
            </div>
            <p class="doctor-services__note">仅展示该专家实际可提供的服务类型；发起预约时必须选择对应专家，暂无合适专家可发起提需。</p>
            <div class="fact-grid">
              <div><small>履约机构</small><strong>${s(e.hospital)}</strong></div>
              <div><small>科室 / 任职</small><strong>${s(e.deptTitle)}</strong></div>
              <div><small>科室方向</small><strong>${s(e.dept)}</strong></div>
              <div><small>履约城市</small><strong>${s(te(e))}</strong></div>
            </div>
            <section class="detail-section">
              <h3>${l("star",14)} 擅长方向</h3>
              <p>${s(e.specialty||"以院方最终确认的专家资料为准。")}</p>
            </section>
            <section class="detail-section">
              <h3>${l("user",14)} 专家简介</h3>
              <div class="doctor-intro">${s(e.intro||"专家简介请以院方最终确认资料为准。")}</div>
            </section>
            <section class="detail-section season-detail">
              <div class="season-detail__head">
                <h3>${l("leaf",14)} 时令主题讲座</h3>
                <span>${i}月 · ${u.length?"院方配置课题":"本月暂无课题"}</span>
              </div>
              ${n?`<div class="season-detail__lock">
                      ${l("leaf",12)}
                      <span>当前从 ${n} 月时令主题进入，仅展示该月课题与该月号源</span>
                    </div>`:`<div class="month-tabs">
                      ${Array.from({length:12},($,I)=>I+1).map($=>`<button class="${$===i?"is-active":""} ${v.has($)?"has-match":""}" type="button"
                              data-action="doctor-month" data-value="${$}">${$}月</button>`).join("")}
                    </div>`}
              <div class="season-detail__summary">
                <strong>${s(ga(p?.season||""))}</strong>
                <p>${s(p?.focus||"")}</p>
              </div>
              <div class="theme-list">
                ${u.length?u.map($=>`
                            <button class="theme-item is-matched" type="button" data-action="theme-open"
                              data-month="${$.month}" data-hospital-id="${s(e.hospitalId)}">
                              <span>${s($.dept)}${$.month?` · ${$.month}月`:""}</span>
                              <strong>${s($.title)}</strong>
                              <small>${s($.hospital)} · ${s($.professionalTitle)} · ${s(Jn($.coverage))}</small><i>查看主题</i>
                            </button>
                          `).join(""):`<div class="theme-empty">${l("leaf",15)} ${n?`该专家 ${n} 月未配置时令主题，不能通过本主题预约。`:"本月未给该专家绑定讲座课题，可切换月份查看。"}</div>`}
              </div>
              <p class="season-detail__note">仅展示本院月度主题中绑定到该专家的课题；课题、时令内容与覆盖城市均由医院运营维护。</p>
            </section>
            ${e.profileUrl?`<a class="source-row source-row--link" href="${s(e.profileUrl)}" target="_blank" rel="noopener noreferrer">查看医院官网资料 ${l("arrowUpRight",12)}</a>`:'<p class="source-row">该专家为院方内部配置资源，官网暂未收录公开页面。</p>'}
          </div>
        </div>
        <div class="sheet__footer">
          <button class="btn btn--ghost" type="button" data-action="close-overlay">${f?"返回预约":"返回"}</button>
          ${f?`<button class="btn btn--primary" type="button" data-action="booking-use-doctor"
                  data-doctor-id="${s(e.id)}" ${m?"":"disabled"}>
                  ${_?"已选择该专家":"选择该专家"} ${l("check",15)}
                </button>`:`<button class="btn btn--primary" type="button" data-action="book-doctor" data-doctor-id="${s(e.id)}" data-service="${s(S)}" data-month="${a.overlay?.themeMonth||0}" ${m?"":"disabled"}>
                  ${h?"该月未配置主题":r.bookable?"预约该专家":`${n?`${n} 月`:""}暂无可约档期`} ${l("arrowRight",15)}
                </button>`}
        </div>
      </section>
    `}function Qs(e){if(!e)return[];if(e.doctorId){const i=D(e.doctorId);if(!i)return[];const o=z(i),r=q(e.serviceType)==="讲座"&&Number(e.themeMonth)||0;return(r?st(o,r):o).dates.slice(0,30)}const t=[],n=O();for(let i=1;i<=45;i+=1){const o=M(n,i);if(!(o.getDay()===0||o.getDay()===6)&&(t.push(N(o)),t.length>=21))break}return t}function zi(e="",t="",n="",i="",o=null){const r=e?D(e):null,c=a.session||{},p=k(o?.hospitalId)||(r?k(r.hospitalId):null)||K()||a.hospitals[0]||null,u=ae(),h=ni(r,n);let m=Number(o?.month)||0,v=o?.topicId||"",f=o?.coverageLabel||"";if(i&&(!v||!m)){const _=o?.hospitalId||r?.hospitalId||p?.id||"",S=m||B(),$=ne(_,S),I=($?.topics||[]).find(W=>String(W.title||"").trim()===String(i).trim());I&&(m=S,v=I.id||"",f=ie(I,$,_).label)}return{requestId:la("booking"),step:1,serviceType:h,doctorId:r?.id||"",tier:r?.tier||t||"specialist",hospitalId:p?.id||"",date:"",dateLocked:!1,province:u.province,city:u.city,address:"",venue:"",topic:"",customTopic:i||"",themeMonth:m,themeTopicId:v,themeCoverage:f,audience:"",headcount:"",note:"",contactName:c.name||"",contactPhone:c.contactPhone||c.phone||"",agree:!1}}function zt(e="",t="",n="",i="",o=null){if(!a.session){bt({type:"booking",doctorId:e,tier:t,service:n,topic:i,theme:o,returnTab:a.tab||"home"});return}a.overlayStack=[],a.booking=zi(e,t,n,i,o),ct(a.booking),a.overlay={type:"booking"},b()}function er(e){const t=le(e||a.overlay?.demandId);if(!t)return d("提需记录不存在。");if(!a.session){bt({type:"booking",returnTab:"appointments"});return}if(!Qa(t))return d("无权操作该提需。");if(t.convertedAppointmentId){const r=U(t.convertedAppointmentId);if(r){a.overlay={type:"appointment",appointmentId:r.id},b();return}return d("该提需关联的预约记录不存在，请联系项目人员。")}if(t.status!=="matched")return d("院方匹配专家后，可直接确认信息并生成预约单。");const n=t.matchedExpertId?D(t.matchedExpertId):null;if(!n||n.active===!1||!j(n,t.serviceType)||!nt(n,t.province||"",t.city||""))return d("院方匹配的专家已失效或不再覆盖活动城市，请联系项目人员重新匹配。");if(t.targetType==="hospital"&&t.hospitalId&&n.hospitalId!==t.hospitalId)return d("匹配专家与目标医院不一致，请联系项目人员重新匹配。");const i=(n?k(n.hospitalId):null)||k(t.hospitalId)||K();a.overlayStack=[],a.booking=zi(n?.id||"",n?.tier||"",t.serviceType,"",null),a.booking.hospitalId=i?.id||a.booking.hospitalId,a.booking.province=t.province||a.booking.province,a.booking.city=t.city||a.booking.city,a.booking.customTopic=t.topic||"",a.booking.themeMonth=0,a.booking.themeTopicId="",a.booking.themeCoverage="",a.booking.audience=t.audience||"",a.booking.headcount=t.headcount||"",a.booking.contactName=t.contactName||a.booking.contactName||a.session.name||"",a.booking.contactPhone=t.phone||a.booking.contactPhone||a.session.phone||"",a.booking.note=[t.note,`由需求单 ${t.id} 转入；原提需信息已自动带入，确认后生成预约单。`].filter(Boolean).join(`
`),a.booking.demandId=t.id,a.booking.demandContext={id:t.id,topic:t.topic,audience:t.audience,headcount:t.headcount};const o=t.matchedDate||(t.preferredDate&&t.preferredDate>=Te()?t.preferredDate:"");if(!o)return d("院方尚未确认履约日期，请联系项目人员。");if(o<Te())return d("院方匹配的履约日期已过期，请联系项目人员重新确认。");a.booking.date=o,a.booking.dateLocked=!0,ct(a.booking),a.overlay={type:"booking"},b()}function He(e){return e?.doctorId?D(e.doctorId):null}function Be(e){return k(e?.hospitalId)||k(He(e)?.hospitalId)||K()||a.hospitals[0]||null}function tr(e){return[...new Set([...e?.expertIds||[],...(e?.topics||[]).map(t=>t.expertId||"")].map(String).filter(Boolean))]}function _a(e){const t=he(e?.date||"");return t?t.getMonth()+1:0}function pn(e){return _a(e)||Number(e?.themeMonth)||B()}function kt(e){const t=pn(e),n=He(e),i=Be(e),o=i?.id||n?.hospitalId||"",r=ne(o,t);return{month:t,expert:n,hospital:i,hospitalId:o,theme:r}}function un(e){if(e?.serviceType!=="讲座"||!Number(e?.themeMonth)||!e?.customTopic)return null;const{theme:t}=kt(e);return(t?.topics||[]).find(n=>e.themeTopicId?String(n.id||"")===String(e.themeTopicId):String(n.title||"").trim()===String(e.customTopic).trim())||null}function Sa(e){const t=Be(e),n=Number(e?.themeMonth)||0,i={active:!1,month:n,hospital:t,hospitalId:t?.id||"",theme:null,topic:null,expertIds:[]};if(!t||e?.serviceType!=="讲座"||!n)return i;const o=ne(t.id,n);if(!o)return i;const r=un(e),c=tr(o);return{...i,active:!0,theme:o,topic:r,expertIds:r?.expertId?[String(r.expertId)]:c}}function Ia(e){const t=un(e);if(!t)return null;const{month:n,hospitalId:i,theme:o,hospital:r}=kt(e),c=ie(t,o,i);return{topic:t,month:n,hospital:r,hospitalId:i,theme:o,coverage:c,available:we(c,e.province,e.city)}}function ar(e){if(e?.serviceType!=="讲座")return[];const{expert:t,theme:n,hospitalId:i}=kt(e),o=rt(n,i,e?.province||"",e?.city||"",{topicId:e?.themeTopicId||"",title:e?.customTopic||""}),r=t?o.filter(h=>String(h.expertId||"")===String(t.id)):[],c=t?null:un(e),p=t?r:c?[c]:o,u=new Set;return p.filter(h=>{const m=String(h.title||"").trim();return!m||u.has(m)?!1:(u.add(m),!0)}).slice(0,8)}function nr(e){return`
      <div class="booking-progress">
        <div class="${e>=1?"is-active":""}"><span>1</span><small>活动需求</small></div>
        <i></i>
        <div class="${e>=2?"is-active":""}"><span>2</span><small>确认提交</small></div>
      </div>
    `}function G(e){return!!(e?.demandId&&e?.dateLocked)}function Wi(e){if(!e?.demandId)return"";const t=le(e.demandId);if(!t)return"原提需单已不存在，请联系项目人员重新处理。";if(t.convertedAppointmentId)return"该提需已生成预约，请前往预约详情查看，不能重复提交。";if(t.status!=="matched")return"院方已更新提需状态，当前匹配安排不可再提交，请返回提需详情查看。";if(String(t.matchedExpertId||"")!==String(e.doctorId||""))return"院方已更新匹配专家，请返回提需详情重新确认。";if(String(t.matchedDate||"")!==String(e.date||""))return"院方已更新履约日期，请返回提需详情重新确认。";if(q(t.serviceType)!==q(e.serviceType))return"院方已更新提需服务类型，请返回提需详情重新确认。";const n=e.customTopic||e.topic||"";return String(t.topic||"").trim()!==String(n).trim()?"提需主题已发生变化，请返回提需详情重新确认。":t.matchedHospitalId&&e.hospitalId&&String(t.matchedHospitalId)!==String(e.hospitalId)?"院方已更新匹配医院，请返回提需详情重新确认。":String(t.province||"")!==String(e.province||"")||String(t.city||"")!==String(e.city||"")?"提需活动城市已发生变化，请返回提需详情重新确认。":""}function ir(e){const t=!!e?.demandId;return`
      <div class="choice-row choice-row--three">
        ${Pe.map(n=>{const i=Ha[n];return`
            <button class="choice-card ${e.serviceType===n?"is-active":""}" type="button"
              data-action="booking-service" data-value="${s(n)}"
              ${t?"disabled":""}>
              <span>${l(n==="讲座"?"message":n==="健康咨询"?"stethoscope":"users",17)}</span>
              <strong>${s(i.label)}</strong>
              <small>${t&&e.serviceType!==n?"已由院方按提需锁定":s(i.desc)}</small>
            </button>
          `}).join("")}
      </div>
    `}function Wt(e,t,n=null){if(!e||e.active===!1||!t)return null;const i=n?.hospital||Be(t),o=n?.theme||Sa(t);if(!i||e.hospitalId!==i.id||!j(e,t.serviceType)||o.active&&!o.expertIds.includes(String(e.id)))return null;const r=z(e),c=o.active?st(r,o.month):r;return(o.active?o.topic?we(ie(o.topic,o.theme,o.hospitalId),t.province,t.city):za(e,o.month,t.province,t.city,o.hospitalId):nt(e,t.province,t.city))?G(t)&&String(e.id)===String(t.doctorId)?{expert:e,availability:c,bookable:!0,status:"reserved",label:"院方已协调",actionLabel:"已安排"}:c.bookable?{expert:e,availability:c,bookable:!0,status:"open",label:`可约 ${Le(c.next)}`,actionLabel:"选择"}:{expert:e,availability:c,bookable:!1,status:"full",label:o.active?`${o.month} 月暂无号源`:"暂无号源",actionLabel:"暂无号源"}:{expert:e,availability:c,bookable:!1,status:"city",label:`不含${t.city||"当前城市"}`,actionLabel:"不可履约"}}function or(e){if(!e)return[];const t=Be(e),n=Sa(e),i={hospital:t,theme:n};return a.experts.map(o=>Wt(o,e,i)).filter(Boolean).sort((o,r)=>Number(r.bookable)-Number(o.bookable)||Ce.indexOf(o.expert.tier)-Ce.indexOf(r.expert.tier)||o.expert.name.localeCompare(r.expert.name,"zh-CN"))}function ct(e){if(!e?.doctorId||G(e))return!1;const t=D(e.doctorId);return Wt(t,e)?.bookable?!1:(e.doctorId="",e.date="",!0)}function Xt(e){const t=or(e),n=He(e),i=Sa(e),o=G(e),r=t.filter(h=>h.bookable).length,c=t,p=i.topic?.expertId?D(i.topic.expertId):null,u=o&&n?`院方已匹配 ${n.name} 和履约日期，服务类型、专家与日期均已锁定，确认活动地址即可提交。`:n?`当前已选 ${n.name}，其他符合条件专家仍可直接切换；再次点击当前专家即可取消选择。`:i.topic?`已按课题「${i.topic.title}」筛选${p?`，仅展示主讲专家 ${p.name}`:""}；${t.length} 位相关，${r} 位可约。`:i.active?`已按 ${i.month} 月时令主题筛选，仅展示该月绑定专家；${t.length} 位相关，${r} 位可约。`:`当前共 ${t.length} 位可提供「${L(e.serviceType)}」的专家，${r} 位可约。`;return`
      <div class="booking-doctor-list">
        <p class="booking-doctor__note">${l("sparkles",12)}
          专家为必选项。${s(u)}
        </p>
        ${i.active&&!o?`<div class="booking-doctor__filter">
                <span>${l("leaf",13)}</span>
                <span><strong>${i.topic?"课题已限定专家":`${i.month} 月时令主题已筛选`}</strong><small>${i.topic?n?"如需更换主讲专家，请先取消当前专家，再切换其他课题。":"切换课题或清除课题后，候选专家会同步更新。":"选择具体课题后，候选专家会进一步收敛。"}</small></span>
              </div>`:""}
        <div class="booking-doctor__status ${n?"has-doctor":""}">
          <span>${n?`已选专家 · ${s(n.name)}`:"尚未选择专家"}</span>
        </div>
        ${c.map(h=>{const m=h.expert,v=Y(m),f=e.doctorId===m.id;return`
              <div class="booking-doctor ${f?"is-active":""} ${h.bookable?"":"is-unavailable"}" data-action="booking-doctor-preview" data-value="${s(m.id)}">
                <button class="booking-doctor__profile" type="button"
                  data-action="booking-doctor-preview" data-value="${s(m.id)}">
                  <img src="${s(ke(m))}" alt="${s(m.name)}" loading="lazy">
                  <span><strong>${s(m.name)}<span class="booking-doctor__tier tier-tag tier-tag--${s(m.tier)}">${s(v.short.replace("医生","").replace("专家",""))}</span><i>${s(m.deptTitle)}</i></strong>
                    <small><strong class="hospital-name">${s(m.hospital)}</strong> · <b class="booking-doctor__availability booking-doctor__availability--${s(h.status)}">${s(h.label)}</b> · <em>查看简介</em></small></span>
                </button>
                <button class="booking-doctor__select ${f?"is-active":""}" type="button"
                  data-action="booking-doctor" data-value="${s(m.id)}"
                  aria-pressed="${f?"true":"false"}" ${h.bookable?"":"disabled"}>
                  <i class="booking-doctor__check">${l("check",12)}</i>
                  <span>${f?"已选":h.actionLabel}</span>
                </button>
              </div>
            `}).join("")}
        ${t.length?"":`<div class="inline-empty booking-demand-empty">
                <strong>${i.active?"当前主题暂无可承接专家":"当前医院暂无可选专家"}</strong>
                <span>${i.active?`本院 ${i.month} 月时令主题未绑定符合当前服务类型与活动城市的专家。可切换课题、调整活动城市，或发起提需由医院运营人员协调。`:`暂无同时满足「${s(L(e.serviceType))}」服务类型、履约城市和可预约号源的专家。专家为必选项，请切换服务类型或发起提需。`}</span>
                <button class="btn btn--soft btn--sm" type="button" data-action="booking-open-demand">
                  ${l("send",13)} 发起提需
                </button>
              </div>`}
        ${t.length&&!r?`<div class="inline-empty booking-demand-empty">
                <strong>${i.topic?"该课题主讲专家暂无号源":"当前没有可预约的专家"}</strong>
                <span>仍可查看专家资料，但不能直接提交预约。可更换专家、调整活动城市或日期，或发起提需由院方协调号源。</span>
                <button class="btn btn--soft btn--sm" type="button" data-action="booking-open-demand">
                  ${l("send",13)} 发起提需
                </button>
              </div>`:""}
        ${n?`<p class="booking-hint">${l("clock",12)} ${o?"院方已协调专家与日期，无需重新选择公开号源。":`${s(n.leadLabel)}；仅展示符合预约周期的可约日期。`}</p>`:""}
      </div>
    `}function Xi(e){if(G(e))return`
        <div class="date-chip-list" id="booking-dates">
          <div class="booking-date-reserved">
            <span class="booking-date-reserved__icon">${l("calendar",17)}</span>
            <span class="booking-date-reserved__body">
              <strong>${e.date?P(e.date,!0):"院方尚未确认日期"}</strong>
              <small>${e.date?"该日期由院方项目人员协调安排，不受公开号源限制，无需重新选择。":"提需已匹配，日期仍待院方项目人员协调。"}</small>
            </span>
            <em>${l("lock",11)} 已锁定</em>
          </div>
        </div>
      `;if(!e?.doctorId)return`
        <div class="date-chip-list" id="booking-dates">
          <div class="inline-empty booking-date-locked">
            <strong>请先选择专家</strong>
            <span>选择专家后，这里只展示该专家实际配置且可预约的日期。</span>
          </div>
        </div>
      `;const t=Qs(e);return`
      <div class="date-chip-list" id="booking-dates">
        ${t.length?t.map(n=>{const i=he(n);return`
                    <button class="date-chip ${e.date===n?"is-active":""}" type="button"
                      data-action="booking-date" data-value="${s(n)}">
                      <strong>${Le(n)}</strong>
                      <span>${En(i)}</span>
                    </button>
                  `}).join(""):`<div class="inline-empty booking-demand-empty">
                <strong>${Number(e.themeMonth)?`该专家 ${e.themeMonth} 月暂无可约日期`:"该专家暂无可约日期"}</strong>
                <span>${Number(e.themeMonth)?"时令主题只能选择该主题月份内的号源；请选择其他专家、查看其他月份主题，或发起提需。":"请选择其他专家，或发起提需由医院运营人员电话沟通。"}</span>
                <button class="btn btn--soft btn--sm" type="button" data-action="booking-open-demand">
                  ${l("send",13)} 发起提需
                </button>
              </div>`}
      </div>
    `}function Yi(e){if(G(e))return`
        <div id="booking-topics">
          <div class="booking-date-reserved booking-source-topic">
            <span class="booking-date-reserved__icon">${l("message",17)}</span>
            <span class="booking-date-reserved__body">
              <strong>${s(e.customTopic||"提需主题")}</strong>
              <small>本活动主题来自提需单，已与服务类型、专家和履约日期一并锁定；院方将在方案中补充最终课题与大纲。</small>
            </span>
            <em>${l("lock",11)} 已锁定</em>
          </div>
        </div>
      `;const n=ar(e),{month:i,hospitalId:o,theme:r}=kt(e),c=Ia(e),p=q(e.serviceType)==="讲座",h=_a(e)?`已按预约日期 ${P(e.date,!0)} 匹配`:Number(e.themeMonth)?"已按所选主题月份展示":"尚未选择预约日期，暂展示当前月；选择日期后自动切换",m=p?`<div class="booking-topic-month">
          <span class="booking-topic-month__icon">${l("leaf",15)}</span>
          <span>
            <strong>${i} 月时令主题</strong>
            <small>${s(h)}</small>
          </span>
        </div>`:"",v=c?`<div class="booking-topic-coverage ${c.available?"is-available":"is-unavailable"}">
          ${l("mapPin",13)}
          <span>
            <strong>${c.available?"当前城市可预约":"当前城市不可预约"}</strong>
            <small>「${s(c.topic.title)}」履约地：${s(c.coverage.label)}；${c.available?"与本次活动城市匹配":`不含${s(C(e.province,e.city))}，请更换课题`}</small>
          </span>
        </div>`:"";return`
      <div id="booking-topics">
      ${m}
      ${v}
      <div class="topic-chip-list">
        ${n.length?n.map(f=>{const _=ie(f,r,o),S=we(_,e.province,e.city),$=e.customTopic===f.title&&(!e.themeTopicId||!f.id||String(e.themeTopicId)===String(f.id)),I=S;return`
                    <div class="topic-chip ${$?"is-active":""} ${S?"":"is-unavailable"}">
                      <button class="topic-chip__preview" type="button"
                        data-action="booking-topic-preview" data-value="${s(f.title)}"
                        title="履约地：${s(_.label)}${S?"":" · 当前城市不可预约"}">
                        <span class="topic-chip__main"><i>${s(f.dept)}</i>${s(f.title)}</span>
                        <small>${l("mapPin",9)} ${s(_.label)}${S?"":" · 当前城市不可约"}</small>
                      </button>
                      <button class="topic-chip__select ${$?"is-active":""}" type="button"
                        data-action="booking-topic" data-value="${s(f.title)}"
                        ${I?"":"disabled"}>
                        ${$?"已选":S?"选择":"不可约"}
                      </button>
                    </div>
                  `}).join(""):`<div class="inline-empty">${q(e.serviceType)==="1V1报告解读"?"1V1 报告解读不关联讲座课题，可直接填写报告解读方向。":q(e.serviceType)==="健康咨询"?"健康咨询不展示讲座课题，请直接填写咨询方向或人群健康需求。":e.doctorId?`该专家 ${i} 月暂未绑定讲座课题，可在下方填写自定义主题，或取消选择其他专家。`:`${i} 月主题暂无可选课题，可在下方填写自定义主题。`}</div>`}
      </div>
      </div>
    `}function Gi(e){return q(e)==="健康咨询"?"填写咨询方向与人群需求":q(e)==="1V1报告解读"?"填写报告解读关注方向":"时令主题可选，点击已选主题可取消"}function Zi(e){return q(e)==="健康咨询"?"填写咨询方向":q(e)==="1V1报告解读"?"填写报告解读方向":"可选预约月份主题，也可自定义"}function Ji(e){return!!(G(e)||e?.themeMonth&&e?.themeTopicId)}function Yt(){const e=a.booking,t=document.querySelector('[data-booking-field="customTopic"]');if(!e||!t)return;const n=Ji(e);t.readOnly=n,t.classList.toggle("is-locked",n),t.setAttribute("aria-readonly",n?"true":"false"),n&&(t.value=e.customTopic||"");const i=document.getElementById("booking-topic-field-hint");i&&(i.textContent=G(e)?"提需主题 · 已锁定":n?"已选时令主题 · 不可修改":Zi(e.serviceType));let o=document.getElementById("booking-topic-lock-help");n&&!o?(o=document.createElement("span"),o.id="booking-topic-lock-help",o.className="field-help booking-topic-lock-help",o.innerHTML=G(e)?`${l("lock",10)} 该主题来自提需单，机构端不能修改。`:`${l("lock",10)} 课题名称由院方统一配置，取消时令主题后可自定义。`,t.insertAdjacentElement("afterend",o)):!n&&o&&o.remove()}function sr(){const e=a.booking;if(!e)return"";const t=Ji(e),n=G(e);return`
      <div class="flow-section ${_t("service")}">
        <div class="flow-section__head"><h2>服务类型</h2><span>选择到企服务形式</span></div>
        ${ir(e)}
        ${fe("service")}
      </div>
      <div class="flow-section ${_t("doctor")}" data-booking-error="doctor">
        <div class="flow-section__head"><h2>专家 <em>*</em></h2><span>必选 · 已选专家可直接继续</span></div>
        <div id="booking-doctors">${Xt(e)}</div>
        ${fe("doctor")}
      </div>
      <div class="flow-section ${_t("date")}">
        <div class="flow-section__head"><h2>期望日期</h2><span>${G(e)?"院方协调安排 · 日期锁定":"号源按整天配置，不区分时段"}</span></div>
        ${Xi(e)}
        ${fe("date")}
      </div>
      <div class="flow-section ${_t("address")}">
        <div class="flow-section__head"><h2>活动地点</h2><span>地址为必填</span></div>
        <div class="field-row">
          <div class="field"><label>省份</label>
            <select data-booking-province ${n?"disabled":""}>${Oe(e.province)}</select>
          </div>
          <div class="field"><label>城市</label>
            <select data-booking-city ${n?"disabled":""}>${me(e.province,e.city)}</select>
          </div>
        </div>
        ${n?`<span class="field-help">${l("lock",10)} 活动省市沿用提需单并由院方匹配，机构端不可修改；请补充详细地址与场地名称。</span>`:""}
        <div class="field">
          <label>详细地址 <em>*</em></label>
          <input class="${St("address")}" type="text" data-booking-field="address" data-booking-error="address" value="${s(e.address)}" placeholder="请输入企业详细地址，如：XX路XX号XX大厦">
          ${fe("address")}
        </div>
        <div class="field">
          <label>场地名称 <span>选填</span></label>
          <input type="text" data-booking-field="venue" value="${s(e.venue)}" placeholder="如：总部大楼 3 层报告厅">
        </div>
      </div>
      <div class="flow-section ${_t("topics")}">
        <div class="flow-section__head"><h2>活动需求</h2><span id="booking-demand-hint">${s(Gi(e.serviceType))}</span></div>
        ${Yi(e)}
        ${fe("topics")}
        <div class="field">
          <label>活动主题 <em>*</em> <span id="booking-topic-field-hint">${s(n?"提需主题 · 已锁定":t?"已选时令主题 · 不可修改":Zi(e.serviceType))}</span></label>
          <input class="${[t?"is-locked":"",St("topic")].filter(Boolean).join(" ")}" type="text"
            data-booking-field="customTopic" data-booking-error="topic" value="${s(e.customTopic)}"
            placeholder="如：职场人群心血管风险识别"
            ${t?'readonly aria-readonly="true"':""}>
          ${fe("topic")}
          ${t?`<span id="booking-topic-lock-help" class="field-help booking-topic-lock-help">${l("lock",10)} ${n?"该主题来自提需单，机构端不能修改。":"课题名称由院方统一配置，取消时令主题后可自定义。"}</span>`:""}
        </div>
        <div class="field-row">
          <div class="field"><label>参与人群 <em>*</em></label>
            <input class="${St("audience")}" type="text" data-booking-field="audience" data-booking-error="audience" value="${s(e.audience)}" placeholder="如：企业员工 / 高客">
            ${fe("audience")}
          </div>
          <div class="field"><label>预计人数 <em>*</em></label>
            <input class="${St("headcount")}" type="number" inputmode="numeric" data-booking-field="headcount" data-booking-error="headcount" value="${s(e.headcount)}" placeholder="如：80">
            ${fe("headcount")}
          </div>
        </div>
        <div class="field">
          <label>补充说明 <span>选填</span></label>
          <textarea data-booking-field="note" placeholder="可填写人群特点、场地条件、期望时段或其他要求">${s(e.note)}</textarea>
        </div>
      </div>
      <div class="flow-section ${_t("contact")}">
        <div class="flow-section__head"><h2>联系人</h2><span>默认带入登录信息</span></div>
        <div class="field-row">
          <div class="field"><label>联系人</label>
            <input class="${St("contactName")}" type="text" data-booking-field="contactName" data-booking-error="contactName" value="${s(e.contactName)}">
            ${fe("contactName")}
          </div>
          <div class="field"><label>联系电话</label>
            <input class="${St("contactPhone")}" type="tel" inputmode="numeric" maxlength="11" data-booking-field="contactPhone" data-booking-error="contactPhone" value="${s(e.contactPhone)}">
            ${fe("contactPhone")}
          </div>
        </div>
      </div>
    `}function rr(){const e=a.booking,t=He(e),n=Be(e),i=Ia(e);return`
      <div class="summary-card summary-card--hero">
        <span class="summary-card__label">${l("calendar",14)} 活动预约</span>
        <h2>${s(e.customTopic||"由院方结合时令主题推荐")}</h2>
        <div class="summary-card__pills">
          <span>${s(L(e.serviceType))}</span>
          <span>${s(P(e.date,!0))}</span>
          <span>${s(n?.name||"")}</span>
        </div>
      </div>
      <div class="summary-list">
        <div><span>专家</span><strong>${s(t?`${t.name} · ${t.deptTitle}`:"请选择专家")}</strong></div>
        ${G(e)?"<div><span>日期安排</span><strong>院方人工协调 · 无需公开号源</strong></div>":""}
        <div><span>活动地点</span><strong>${s(et(e.province,e.city,e.address,e.venue))}</strong></div>
        ${i?`<div><span>主题履约地</span><strong>${s(i.coverage.label)} · ${i.available?"当前城市可预约":"当前城市不可预约"}</strong></div>`:""}
        <div><span>参与人群</span><strong>${s(e.audience||"待院方沟通确认")}</strong></div>
        <div><span>预计人数</span><strong>${s(e.headcount?e.headcount+" 人":"待确认")}</strong></div>
        <div><span>联系人</span><strong>${s(e.contactName)} · ${ee(e.contactPhone,e.contactPhone)}</strong></div>
        ${e.note?`<div><span>补充说明</span><strong>${s(e.note)}</strong></div>`:""}
      </div>
      <div class="process-note">
        <strong>${l("alert",14)} 提交后流程</strong>
        <p>提交后进入“待接单”。医院运营接单后显示具体项目对接人，并填写活动主题、时间、地点、课题大纲与项目组成员；机构确认方案后预约正式生效。</p>
      </div>
      <label class="check-row check-row--block ${e.validationErrors?.some(o=>o.key==="agree")?"is-invalid":""}" data-booking-error="agree">
        <input type="checkbox" data-booking-agree ${e.agree?"checked":""}>
        <span>我已确认以上信息，并同意由院方项目组联系确认活动细节。</span>
      </label>
      ${fe("agree")}
    `}function cr(){const e=a.booking;return e?`
      <div class="flow booking-flow">
        <header class="flow__bar">
          <button class="icon-button" type="button" data-action="close-overlay" aria-label="关闭">
            ${l("close",17)}
          </button>
          <div><strong>${e.step===1?"发起预约":"确认预约"}</strong><small>企业健康活动</small></div>
          <span class="flow__step">${e.step}/2</span>
        </header>
        <div class="flow__body">
          ${nr(e.step)}
          ${e.demandContext?`<div class="booking-demand-banner" id="booking-demand-banner">${l("sparkles",15)}
                  <div>
                    <strong>由提需 ${s(e.demandContext.id)} 转入</strong>
                    <p>${s(e.demandContext.topic)}${e.demandContext.headcount?` · 预计 ${s(e.demandContext.headcount)} 人`:""} · 院方已匹配专家并协调履约日期，请补充活动地址后提交。</p>
                  </div>
                </div>`:""}
          ${e.validationErrors?.length?`<div class="booking-validation-summary" role="alert">
                  <div class="booking-validation-summary__head">
                    ${l("alert",16)}
                    <div><strong>还有 ${e.validationErrors.length} 项需要补充</strong><small>已为你定位到第一个问题</small></div>
                  </div>
                  <ul>
                    ${e.validationErrors.map(t=>`<li><button type="button" data-action="booking-error-focus" data-target="${s(t.focus)}">${s(t.message)}</button></li>`).join("")}
                  </ul>
                </div>`:""}
          ${e.step===1?sr():rr()}
        </div>
        <footer class="flow__footer">
          ${e.step===1?`<button class="btn btn--primary btn--block" type="button" data-action="booking-next">下一步，确认信息 ${l("arrowRight",15)}</button>`:`<button class="btn btn--ghost" type="button" data-action="booking-back">上一步</button>
                 <button class="btn btn--primary" type="button" data-action="booking-submit"
                   ${a.bookingSubmitting?"disabled":""}>${a.bookingSubmitting?"正在锁定号源…":`提交预约 ${l("check",15)}`}</button>`}
        </footer>
      </div>
    `:""}function Gt(){const e=document.getElementById("booking-dates");e&&a.booking&&(e.outerHTML=Xi(a.booking))}function wt(){const e=document.getElementById("booking-topics");e&&a.booking&&(e.outerHTML=Yi(a.booking))}function Da(){const e=document.getElementById("booking-doctors");e&&a.booking&&(e.innerHTML=Xt(a.booking))}function lr(e){if(!a.booking)return;if(a.booking.demandId)return d("服务类型已由院方按提需匹配结果锁定，如需调整请联系项目人员。");je();const t=Za(e);if(!t)return;a.booking.serviceType=t,t!=="讲座"&&(a.booking.themeMonth=0,a.booking.themeTopicId="",a.booking.themeCoverage=""),document.querySelectorAll('[data-action="booking-service"]').forEach(c=>{c.classList.toggle("is-active",c.dataset.value===t)});const n=He(a.booking);n&&!j(n,t)&&(a.booking.doctorId="",a.booking.date=""),ct(a.booking);const i=document.getElementById("booking-doctors");i&&(i.innerHTML=Xt(a.booking)),Gt(),wt();const o=document.getElementById("booking-demand-hint");o&&(o.textContent=Gi(t)),Yt();const r=Ia(a.booking);r&&!r.available&&d(`「${r.topic.title}」履约地不含${C(a.booking.province,a.booking.city)}，请更换课题。`)}function dr(e){if(!a.booking)return;if(a.booking.demandId)return d("专家已由院方按提需匹配结果锁定，如需调整请联系项目人员。");je();const t=a.booking,n=t.doctorId||"",i=e&&e!==n?e:"";if(i){const c=Wt(D(i),t);if(!c)return d("该专家不符合当前医院、服务类型或时令课题，请重新选择。");if(!c.bookable)return d(c.status==="city"?"该专家不覆盖当前活动城市，请更换专家或调整活动地点。":"该专家当前暂无可约号源，请选择其他专家或发起提需。")}t.doctorId=i,t.date="";const o=i?D(i):null;o&&(t.tier=o.tier,j(o,t.serviceType)||(t.serviceType=o.services[0]||"讲座",document.querySelectorAll('[data-action="booking-service"]').forEach(c=>{c.classList.toggle("is-active",c.dataset.value===t.serviceType)})));const r=document.getElementById("booking-doctors");r&&(r.innerHTML=Xt(t)),Gt(),wt(),n&&!i&&d("已取消专家选择，请重新选择专家。")}function pr(e){const t=a.booking;je();const n=e?D(e):null;if(!t||!n)return;const i=Wt(n,t);if(!i)return d("该专家不符合当前医院、服务类型或时令课题，请重新选择。");if(!i.bookable)return d(i.status==="city"?"该专家不覆盖当前活动城市，请更换专家或调整活动地点。":"该专家当前暂无可约号源，请选择其他专家或发起提需。");const o=()=>{t.doctorId=n.id,t.tier=n.tier,t.date&&!z(n).dates.includes(t.date)&&(t.date="")};Pi("booking",o)||(o(),a.overlayStack=[],a.overlay={type:"booking"},b()),d(`已选择 ${n.name}，可继续填写预约信息。`)}function ur(e){const t=a.booking;if(!t)return;const{month:n,hospitalId:i,theme:o}=kt(t),c=rt(o,i,t.province,t.city,{topicId:t.themeTopicId,title:t.customTopic}).findIndex(p=>String(p.title||"").trim()===String(e||"").trim());if(c<0)return d("该主题详情暂不可用。");dn(n,c,i)}function mr(){const e=a.booking;if(!e)return;e.customTopic="",e.themeMonth=0,e.themeTopicId="",e.themeCoverage="";const t=document.querySelector('[data-booking-field="customTopic"]');t&&(t.value=""),Yt()}function hr(e,t){const n=a.booking,i=Be(n)?.id||a.overlay?.hospitalId||He(n)?.hospitalId||"",o=ne(i,Number(e)),r=rt(o,i,n?.province||"",n?.city||"",{topicId:n?.themeTopicId||"",title:n?.customTopic||""})[Number(t)];if(!n||!r)return d("该主题暂不可用。");const c=_a(n);if(c&&Number(e)!==c)return d(`所选主题为 ${e} 月，与预约日期所在的 ${c} 月不一致，请重新选择。`);const p=ie(r,o,i);if(!we(p,n.province,n.city))return d(`「${r.title}」履约地不含${C(n.province,n.city)}，请更换课题或活动城市。`);let u=!1;const h=()=>{n.customTopic=r.title,n.themeMonth=Number(e),n.themeTopicId=r.id||"",n.themeCoverage=p.label,u=ct(n)};Pi("booking",h)||(h(),a.overlayStack=[],a.overlay={type:"booking"},b()),d(`已选择主题「${r.title}」${u?"，原专家不承接该课题，已取消专家选择":""}。`)}function vr(e){const t=a.booking;if(!t||!e)return;je();const{month:n,hospitalId:i,theme:o}=kt(t);if(!!(t.themeMonth&&t.themeTopicId)&&String(t.customTopic||"").trim()===String(e).trim()&&Number(t.themeMonth)===Number(n)){mr(),ct(t),Da(),Gt(),wt(),Yt(),d(`已取消主题「${e}」，时令主题为可选项。`);return}const p=(o?.topics||[]).find(f=>String(f.title||"").trim()===String(e).trim());if(!p)return d("该主题暂不可用。");const u=_a(t);if(u&&Number(n)!==u)return d(`所选主题为 ${n} 月，与预约日期所在的 ${u} 月不一致，请重新选择。`);const h=ie(p,o,i);if(!we(h,t.province,t.city))return d(`「${p.title}」履约地不含${C(t.province,t.city)}，请更换课题或活动城市。`);t.customTopic=p.title,t.themeMonth=n,t.themeTopicId=p.id||"",t.themeCoverage=h.label;const m=document.querySelector('[data-booking-field="customTopic"]');m&&(m.value=p.title),Yt();const v=ct(t);Da(),Gt(),wt(),d(`已选择主题「${p.title}」${v?"，原专家不承接该课题，已取消专家选择":""}。`)}function fr(e){if(!a.booking)return;je();const t=a.booking,n=pn(t),i=he(e)?.getMonth()+1||0;t.date=e;let o=!1,r=!1;if(q(t.serviceType)==="讲座"&&i&&i!==n){if(t.themeTopicId){t.customTopic="",t.themeTopicId="",t.themeCoverage="";const c=document.querySelector('[data-booking-field="customTopic"]');c&&(c.value=""),o=!0}Number(t.themeMonth)&&Number(t.themeMonth)!==i&&(t.themeMonth=0,r=!0)}document.querySelectorAll('[data-action="booking-date"]').forEach(c=>{c.classList.toggle("is-active",c.dataset.value===e)}),Yt(),wt(),(o||r)&&Da(),o&&d(`日期已切换至 ${i} 月，原时令主题已清除，请重新选择。`)}function Qi(){if(!a.booking)return;ct(a.booking);const e=document.getElementById("booking-doctors");e&&(e.innerHTML=Xt(a.booking)),Gt(),wt()}function gr(e){if(!a.booking)return;if(G(a.booking))return d("活动省市已由提需单和院方匹配锁定，如需调整请联系项目人员。");je(),a.booking.province=e,a.booking.city=(a.chinaCities?.[e]||[e])[0];const t=document.querySelector("[data-booking-city]");t&&(t.innerHTML=me(e,a.booking.city)),Qi()}function mn(e){return a.booking?.validationErrors?.find(t=>t.key===e)||null}function _t(e){return mn(e)?"is-invalid":""}function St(e){return mn(e)?"is-invalid":""}function fe(e){const t=mn(e);return t?`<span class="field-error-text">${l("alert",11)} ${s(t.message)}</span>`:""}function je(){a.booking&&(a.booking.validationErrors=[]),document.querySelector(".booking-validation-summary")?.remove(),document.querySelectorAll(".booking-flow .is-invalid").forEach(e=>e.classList.remove("is-invalid")),document.querySelectorAll(".booking-flow .field-error-text").forEach(e=>e.remove())}function eo(){const e=a.booking;if(!e)return[{key:"expired",message:"预约信息已失效，请重新发起。",focus:"service"}];const t=[],n=(r,c,p=r)=>t.push({key:r,message:c,focus:p}),i=Wi(e);if(i&&n("demand",i,"demand"),e.serviceType||n("service","请选择服务类型。"),!e.doctorId)n("doctor","请选择专家：需选择一位当前可预约专家；没有合适专家时，请点击下方“发起提需”。");else{const r=D(e.doctorId);if(!r)n("doctor","所选专家信息已失效，请重新选择。");else{const c=Wt(r,e);if(c?c.bookable||(c.status==="city"?n("doctor","所选专家不覆盖当前活动城市，请更换专家或调整活动地点。"):G(e)||n("doctor","所选专家当前暂无可约号源，请选择其他专家或发起提需。")):n("doctor",Sa(e).active?"所选专家不符合当前时令主题或课题，请重新选择专家。":"所选专家不提供当前服务类型或不在当前医院，请重新选择。"),!e.date)n("date",G(e)?"院方尚未确认履约日期，请联系项目人员。":"请选择期望日期。");else if(G(e)){const p=he(e.date);(!p||p<O())&&n("date","院方协调的日期已失效，请联系项目人员重新确认。")}else z(r).dates.includes(e.date)?fi(r.id,e.date)<=0&&n("date","该日期号源已约满，请选择其他日期。"):n("date","该日期不在专家当前可约范围内，请重新选择。")}}(!e.province||!e.city)&&n("address","请选择活动省市。"),e.address.trim()||n("address","请填写活动详细地址。"),e.customTopic.trim()||n("topic","请选择时令主题或填写活动主题。"),e.audience.trim()||n("audience","请填写参与人群。"),String(e.headcount||"").trim()||n("headcount","请填写预计人数。"),e.contactName.trim()||n("contactName","请填写联系人姓名。"),/^1\d{10}$/.test(e.contactPhone||"")||n("contactPhone","请填写正确的 11 位联系电话。"),String(e.headcount||"").trim()&&(!Number.isInteger(Number(e.headcount))||Number(e.headcount)<=0)&&n("headcount","预计人数需填写大于 0 的整数。");const o=Ia(e);return o&&!o.available&&n("topics",`所选时令主题「${o.topic.title}」履约地不含${C(e.province,e.city)}，请更换课题或活动城市。`),o?.topic?.expertId&&e.doctorId&&String(o.topic.expertId)!==String(e.doctorId)&&n("topics","所选时令主题不属于当前专家，请重新选择主题或专家。"),t}function br(e){return{service:'[data-action="booking-service"]',doctor:'[data-booking-error="doctor"]',date:"#booking-dates",address:'[data-booking-field="address"]',topic:'[data-booking-field="customTopic"]',audience:'[data-booking-field="audience"]',contactName:'[data-booking-field="contactName"]',contactPhone:'[data-booking-field="contactPhone"]',headcount:'[data-booking-field="headcount"]',topics:"#booking-topics",demand:"#booking-demand-banner",agree:"[data-booking-agree]"}[e]||".booking-validation-summary"}function to(e,{focusField:t=!1}={}){window.requestAnimationFrame(()=>{const n=V.querySelector(br(e));n?.scrollIntoView({block:"center",behavior:"smooth"}),t&&n&&/^(INPUT|TEXTAREA|SELECT)$/.test(n.tagName)&&!n.disabled&&n.focus({preventScroll:!0})})}function Ta(e,{step:t=1}={}){if(!a.booking)return;a.booking.step=t,a.booking.validationErrors=e,b();const n=e[0];to(n?.focus||"service"),d(e.length>1?`请先完善 ${e.length} 项信息：${n?.message||"请检查标红字段"}`:n?.message||"请完善预约信息。")}function yr(){const e=eo();if(e.length)return Ta(e,{step:1});a.booking.step=2,a.booking.validationErrors=[],b(),V.querySelector(".flow__body")?.scrollTo(0,0)}async function $r(e){if(navigator.locks?.request)return navigator.locks.request("pkuih_h6_booking",{mode:"exclusive"},e);const t=y.bookingLock,n=la("lock"),i=Date.now();for(;Date.now()-i<4e3;){const o=R(t,null);if(!o||Date.now()-Number(o.at||0)>5e3){if(!T(t,{token:n,at:Date.now(),tab:la("tab")}))return e();if(R(t,null)?.token===n)try{return await e()}finally{R(t,null)?.token===n&&Ze(t)}}await new Promise(r=>window.setTimeout(r,45+Math.random()*55))}throw new Error("号源正在被其他终端更新，请稍后重试。")}async function kr(e){return $r(async()=>{it=null,ht=null;const t=R(y.appointments,[]),n=R(y.slots,{}),i=Number(n?.[e.doctorId]?.[e.date]||0),o=t.filter(m=>m.doctorId===e.doctorId&&m.date===e.date&&m.status!=="cancelled"&&m.manualArrangement!==!0).length,r=t.find(m=>e.clientRequestId&&m.clientRequestId===e.clientRequestId);if(r)return{duplicate:!0,appointment:r};if(t.some(m=>m.id===e.id))return{error:"id-collision"};const c=Wi(e);if(c)return{error:"demand-stale",message:c};if(e.demandId&&t.some(m=>m.demandId===e.demandId&&m.status!=="cancelled"))return{error:"demand-stale",message:"该提需已生成预约，请前往预约详情查看，不能重复提交。"};const p=t.find(m=>m.doctorId===e.doctorId&&m.date===e.date&&m.status!=="cancelled");if(e.manualArrangement&&p)return{error:"date-conflict",message:`${e.doctorName||"该专家"} 在 ${P(e.date,!0)} 已有其他活动安排，请更换协调日期。`};if(!e.manualArrangement&&p?.manualArrangement)return{error:"manual-conflict",message:`${e.doctorName||"该专家"} 在 ${P(e.date,!0)} 已有院方人工协调安排，请选择其他日期。`};if(!e.manualArrangement&&Ae().find(v=>v.status==="matched"&&!v.convertedAppointmentId&&String(v.matchedExpertId||"")===String(e.doctorId||"")&&v.matchedDate===e.date))return{error:"manual-conflict",message:`${e.doctorName||"该专家"} 在 ${P(e.date,!0)} 已由院方为其他提需预留，请选择其他日期。`};if(!e.manualArrangement&&(!i||o>=i))return{error:"slot-full",booked:o,capacity:i};const u={...e,slotKey:e.manualArrangement?`manual|${e.demandId}`:`${e.doctorId}|${e.date}`,slotSequence:e.manualArrangement?0:o+1,slotCapacityAtBooking:e.manualArrangement?0:Math.max(i,o+1),inventoryCheckedAt:new Date().toISOString()},h=[...t,u];return T(y.appointments,h)?(it=h,ht=n,{appointment:u}):{error:"storage"}})}async function wr(){const e=a.booking;if(!e||a.bookingSubmitting)return;if(!a.session){d("请先登录后再提交预约。"),bt({type:"booking"});return}const t=eo();if(t.length){Ta(t,{step:1});return}if(!e.agree){Ta([{key:"agree",message:"请勾选“已确认以上信息”后再提交。",focus:"agree"}],{step:2});return}const n=He(e),i=Be(e),o=new Date().toISOString(),c={id:Hn("BD"),ownerPhone:a.session.phone,orgName:a.session.orgName,orgType:a.session.orgType,contactName:e.contactName||a.session.name,contactTitle:a.session.title||"",phone:e.contactPhone||a.session.phone,province:e.province,city:e.city,address:e.address.trim(),venue:e.venue.trim(),serviceType:e.serviceType,doctorId:n?.id||"",doctorName:n?.name||"",tier:n?.tier||e.tier,hospitalId:i?.id||"pkuih",date:e.date,topic:e.customTopic.trim(),themeMonth:e.themeMonth||"",themeTopicId:e.themeTopicId||"",themeCoverage:e.themeCoverage||"",audience:e.audience.trim(),headcount:e.headcount,note:e.note.trim(),status:"pending",assignedStaff:null,plan:null,planHistory:[],internalNote:"",feedback:"",email:a.session.email||"",orgProfileSnapshot:{name:a.session.name||"",orgName:a.session.orgName||"",orgType:a.session.orgType||"",title:a.session.title||"",contactPhone:a.session.contactPhone||a.session.phone||"",email:a.session.email||"",province:a.session.province||"",city:a.session.city||"",capturedAt:o,source:"booking"},demandId:e.demandId||"",manualArrangement:G(e),coordinatedDate:G(e)?e.date:"",clientRequestId:e.requestId||la("booking"),createdAt:o,updatedAt:o};a.bookingSubmitting=!0,b();let p;try{p=await kr(c)}catch(h){return a.bookingSubmitting=!1,b(),d(h.message||"提交失败，请稍后重试。")}if(a.bookingSubmitting=!1,p.error){const h={"slot-full":"该日期号源刚被其他终端约满，请重新选择日期或专家。","demand-stale":"提需匹配安排已更新，请返回提需详情重新确认。","date-conflict":"该专家当日已有其他安排，请更换协调日期。","manual-conflict":"该专家当日已有院方人工协调安排，请选择其他日期。","id-collision":"预约编号冲突，请重新提交。",storage:"浏览器存储空间不足，预约未写入，请清理后重试。"};p.error==="slot-full"&&a.booking?Ta([{key:"date",message:h[p.error],focus:"date"}],{step:1}):(b(),d(p.message||h[p.error]||"提交失败，请稍后重试。"));return}const u=p.appointment||c;if(e.demandId){const h=le(e.demandId);h&&ft(h.id,{status:"converted",convertedAppointmentId:u.id,convertedAt:new Date().toISOString()})}a.booking=null,a.overlayStack=[],a.overlay={type:"appointment",appointmentId:u.id,action:"success"},b(),g()}function hn(e){return oa[e?.status]||oa.pending}function _r(e){return e?.plan?.date||e?.date||""}function Sr(e){const t=he(_r(e));return t?Math.ceil((t.getTime()-O().getTime())/(1440*60*1e3)):null}function Ue(e){if(!e)return{canModify:!1,canConfirm:!1,canCancel:!1,canEditLocation:!1,days:null,remainingDays:null,cycleDays:0,cancelLeadDays:7,usedChanges:0,modifyReason:"预约记录不存在。",cancelReason:"预约记录不存在。",locationReason:"预约记录不存在。",reason:"预约记录不存在。"};const t=e.doctorId?D(e.doctorId):null,n=Math.max(7,Number(t?.leadDays)||Ge[e.tier]?.leadDays||7),i=Sr(e),o=Number(e.clientChangeCount)||0,r=!!(e.assignedStaff||e.acceptedAt),c=["completed","cancelled"].includes(e.status),p=i!==null&&i<0,u=n>=30?0:1,h=e.tier==="elite"?30:7;let m="";c?m=e.status==="cancelled"?"预约已取消，不能再修改。":"活动已完成归档，不能再修改或取消。":p&&(m="活动日期已过，不能再修改或取消。");let v=m,f=m;!m&&i!==null&&i<7&&(v=`距活动不足 7 天（剩余 ${Math.max(0,i)} 天），已锁定修改。`),!m&&i!==null&&i<h&&(f=e.tier==="elite"?`大咖医生预约需提前至少 30 天取消，当前剩余 ${Math.max(0,i)} 天，已锁定取消。`:`主任专家和专业医生预约需提前至少 7 天取消，当前剩余 ${Math.max(0,i)} 天，已锁定取消。`),!v&&n>=30&&r&&(v="该预约属于 30 天预约周期，院方接单后机构侧不可修改；如需调整请联系项目对接人。"),!v&&u&&o>=u&&(v="该预约属于 14 天预约周期，机构侧已使用 1 次修改机会，不能再次修改。");const S=!v&&["review","revision","confirmed"].includes(e.status),$=e.status==="review",I=!f&&!c,W=["pending","planning","review","revision","confirmed"];let A=m;!A&&["review","revision","confirmed"].includes(e.status)&&i!==null&&i<7&&(A=v||`距活动不足 7 天（剩余 ${Math.max(0,i)} 天），活动地点已锁定。`),!A&&e.status==="confirmed"&&!S&&(A=v||"当前阶段不可修改活动地点。");const Z=!A&&W.includes(e.status)&&(e.status!=="confirmed"||S);return{canModify:S,canConfirm:$,canCancel:I,canEditLocation:Z,days:i,remainingDays:i,cycleDays:n,cancelLeadDays:h,usedChanges:o,changeLimit:u,accepted:r,modifyReason:v,cancelReason:f,locationReason:A,reason:S?f:v}}function xa(e){const t=oa[e]||oa.pending;return`<span class="status-pill ${t.cls}">${s(t.label)}</span>`}function It(e){return e?.assignedStaff||null}function vn(e){return e?`<strong>${s(e.name)}</strong> · ${ee(e.phone,e.phone)}`:'<span class="muted">院方接单后显示项目对接人</span>'}function fn(e){return e?et(e.province,e.city,e.address,e.venue):""}function ao(e,t=""){const n=q(t||e?.plan?.serviceType||e?.serviceType),i=Number(e?.themeMonth||e?.plan?.themeMonth||0);if(n!=="讲座"||!i||!e?.hospitalId)return null;const o=ne(e.hospitalId,i);if(!o)return null;const r=e.themeTopicId||e.plan?.themeTopicId||"";return(o.topics||[]).find(c=>r?String(c.id||"")===String(r):String(c.title||"").trim()===String(e.plan?.topic||e.topic||"").trim())||null}function gn({appointment:e,expert:t,serviceType:n,date:i,province:o,city:r,ignoreId:c=""}){if(!e)return"预约信息已失效。";const p=Zt(e);if(!t)return"专家为必选项，请选择出讲专家。";if(t.active===!1)return"所选专家已停止展示，请重新选择。";if(t.hospitalId!==e.hospitalId)return"出讲专家必须属于本次履约医院。";if(!j(t,n))return`所选专家不提供「${L(n)}」服务，请重新选择。`;const u=ao(e,n);if(u){if(u.expertId&&String(u.expertId)!==String(t.id))return"出讲专家与机构已选的时令课题主讲人不一致，请重新选择。";const m=ne(e.hospitalId,Number(u.month||e.themeMonth)),v=ie(u,m,e.hospitalId);if(!we(v,o,r))return`该时令课题履约地不含${C(o,r)}，请先与机构确认调整。`}else if(!nt(t,o,r))return`${t.name} 的日常履约范围不含${C(o,r)}。`;return i?i<Te()?"活动日期不能早于今天。":p?"":z(t,c).dates.includes(i)?fi(t.id,i,c)<=0?`${t.name} 在 ${P(i,!0)} 已无可约号源，请调整日期或专家。`:"":`${t.name} 在 ${P(i,!0)} 不在可预约周期或没有可用号源。`:"请选择活动日期。"}function Zt(e){return!!(e?.manualArrangement&&e?.demandId)}function Ir(e){if(!e)return"预约信息已失效。";const t=e.plan;if(!t)return"院方尚未提交活动方案。";const n=t.speakerId||e.doctorId,i=n?D(n):null,o=t.serviceType||e.serviceType,r=t.date||e.date;return t.topic?.trim()?(e.address||"").trim()?q(o)!==q(e.serviceType)?"方案服务类型与预约记录不一致，请联系项目对接人更新。":r!==e.date?"方案日期与预约记录不一致，请联系项目对接人更新。":gn({appointment:e,expert:i,serviceType:o,date:r,province:e.province,city:e.city,ignoreId:e.id}):"预约缺少活动详细地址，请先补充活动地点。":"方案缺少活动主题，请联系项目对接人。"}function Fe(e){const t=he(e?.date)?.getMonth()+1,n=ne(e?.hospitalId,t);return e?.plan?.topic||e?.topic||n?.topics?.[0]?.title||qt(t)?.topics?.[0]?.title||"企业健康活动"}function Dr(){return[{id:"all",label:"全部"},{id:"pending",label:"待接单"},{id:"planning",label:"方案制作"},{id:"review",label:"待确认"},{id:"revision",label:"待修改"},{id:"confirmed",label:"已确认"},{id:"completed",label:"已完成"}]}function Tr(e){const t=e.doctorId?D(e.doctorId):null,n=k(e.hospitalId),i=It(e);return`
      <article class="record-card" role="button" tabindex="0" data-action="open-appointment"
        data-appointment-id="${s(e.id)}">
        <div class="record-card__top">
          ${xa(e.status)}
          <span class="record-card__date">${s(P(e.date,!0))}</span>
        </div>
        <h3>${s(Fe(e))}</h3>
        <div class="record-card__meta">
          <span>${l("briefcase",12)} ${s(L(e.serviceType))}</span>
          <span>${l("experts",12)} ${s(t?t.name:e.doctorName||"专家待确认")}</span>
          <span>${l("building",12)} <strong class="hospital-name">${s(n?.short||n?.name||"")}</strong></span>
        </div>
        <div class="record-card__assignee">
          ${l("user",12)}
          ${i?`项目对接人 <strong>${s(i.name)}</strong> · ${ee(i.phone,i.phone)}`:hn(e).help}
        </div>
        ${e.status==="review"?`<div class="record-card__alert">${l("alert",13)} 院方方案待确认，请查看并确认</div>`:e.status==="revision"?`<div class="record-card__waiting">${l("clock",13)} 已提交修改意见，等待院方更新方案</div>`:e.plan?`<div class="record-card__plan">${l("clipboard",13)} 院方已填写活动方案</div>`:`<div class="record-card__waiting">${l("clock",13)} ${s(hn(e).help)}</div>`}
        <div class="record-card__foot">
          <span>${s(e.id)}</span>
          <span>查看详情 ${l("chevronRight",12)}</span>
        </div>
      </article>
    `}function no(){const e=Ut(a.session.phone),t=a.appointmentFilter==="all"?e:e.filter(n=>n.status===a.appointmentFilter);return t.length?`<div class="record-list">${t.map(Tr).join("")}</div>`:`
        <div class="empty-state">
          <span class="empty-state__icon">${l("calendar",26)}</span>
          <h3>${e.length?"当前筛选下没有预约":"还没有活动预约"}</h3>
          <p>${e.length?"切换状态查看其他预约。":"从一场贴合企业人群的健康活动开始。"}</p>
          ${e.length?"":'<button class="btn btn--primary btn--sm" type="button" data-action="open-booking">发起活动预约</button>'}
        </div>
      `}function xr(e){const t=va(e),n=e.targetType==="group",i=ra(e);return`
      <article class="record-card" role="button" tabindex="0" data-action="open-demand-detail"
        data-demand-id="${s(e.id)}">
        <div class="record-card__top">
          <span class="status-pill ${i.cls}">${s(i.label)}</span>
          <span class="record-card__date">${s(P(e.createdAt.slice(0,10)))}</span>
        </div>
        <h3>${s(e.topic||"专家资源提需")}</h3>
        <div class="record-card__meta">
          <span>${l("briefcase",12)} ${s(L(e.serviceType))}</span>
          <span>${l("building",12)} ${s(t)}</span>
          <span>${l("users",12)} ${s(e.audience||"待沟通")}</span>
        </div>
        <div class="record-card__assignee">
          ${l("phone",12)}
          ${e.assignedStaff?`${n?"集团对接人":"院方对接人"} <strong>${s(e.assignedStaff.name)}</strong> · ${ee(e.assignedStaff.phone,e.assignedStaff.phone)}`:`提交后由${n?"集团企康办管理员":"医院运营"}电话联系`}
        </div>
        <div class="record-card__foot">
          <span>${s(e.id)}</span>
          <span>查看详情 ${l("chevronRight",12)}</span>
        </div>
      </article>
    `}function Ar(){const e=ha(a.session.phone),t=e;return t.length?`<div class="record-list">${t.map(xr).join("")}</div>`:`
        <div class="empty-state">
          <span class="empty-state__icon">${l("sparkles",26)}</span>
          <h3>${e.length?"当前筛选下没有提需":"还没有专家提需"}</h3>
          <p>找不到合适的专家时，提交活动需求，由医院运营电话沟通匹配。</p>
          <button class="btn btn--primary btn--sm" type="button" data-action="open-demand">发起提需</button>
        </div>
      `}function Mr(){if(!a.session)return`
        <div class="screen">
          <header class="page-head">
            <span class="eyebrow"><i></i> My Activities</span>
            <h1>我的预约</h1>
            <p>登录后查看预约进度、院方方案与项目对接人。</p>
          </header>
          <div class="login-required">
            <span class="login-required__icon">${l("user",28)}</span>
            <h2>登录企业账号</h2>
            <p>登录后可提交预约与提需、确认院方方案，并在下次打开时保持登录状态。</p>
            <button class="btn btn--primary btn--block" type="button" data-action="start-login" data-pending="appointments">
              登录 / 注册 ${l("arrowRight",15)}
            </button>
          </div>
        </div>
      `;const e=Ut(a.session.phone),t=ha(a.session.phone);return`
      <div class="screen">
        <header class="page-head page-head--row">
          <div>
            <span class="eyebrow"><i></i> My Activities</span>
            <h1>预约与提需</h1>
            <p>${e.length} 条预约 · ${t.length} 条提需</p>
          </div>
          <button class="btn btn--primary btn--sm" type="button" data-action="open-booking">
            ${l("plus",14)} 新建
          </button>
        </header>
        <div class="records-sticky">
          <div class="segmented segmented--records">
            <button class="${a.clientRecordTab==="bookings"?"is-active":""}" type="button"
              data-action="record-tab" data-value="bookings">活动预约 <span>${e.length}</span></button>
            <button class="${a.clientRecordTab==="demands"?"is-active":""}" type="button"
              data-action="record-tab" data-value="demands">专家提需 <span>${t.length}</span></button>
          </div>
          <div id="record-filters">${io()}</div>
        </div>
        <div id="record-panel">${oo()}</div>
      </div>
    `}function Nr(){return`<div class="filter-scroll filter-scroll--page">
          ${Dr().map(e=>`<button class="chip ${a.appointmentFilter===e.id?"is-active":""}" type="button" data-action="appointment-filter" data-value="${e.id}">${e.label}</button>`).join("")}
        </div>`}function io(){return a.clientRecordTab==="bookings"?Nr():""}function oo(){return a.clientRecordTab==="bookings"?`<div id="appointment-list">${no()}</div>`:`<div id="demand-list">${Ar()}</div>`}function bn(){const e=document.getElementById("record-filters");e&&(e.innerHTML=io());const t=document.getElementById("record-panel");t&&(t.innerHTML=oo());const n=Ut(a.session?.phone||""),i=ha(a.session?.phone||"");document.querySelectorAll('[data-action="record-tab"]').forEach(o=>{o.classList.toggle("is-active",o.dataset.value===a.clientRecordTab);const r=o.querySelector("span");r&&(r.textContent=String(o.dataset.value==="bookings"?n.length:i.length))})}function Cr(){const e=document.getElementById("appointment-list");e&&(e.innerHTML=no()),document.querySelectorAll('[data-action="appointment-filter"]').forEach(t=>{t.classList.toggle("is-active",t.dataset.value===a.appointmentFilter)})}function Pr(e){const t=e.status,n={pending:1,planning:3,review:4,revision:4,confirmed:5,completed:6,cancelled:0}[t]||1,i=[["提交预约","已提交活动需求"],["院方接单",e.assignedStaff?`${e.assignedStaff.name} 已接单`:"等待医院运营接单"],["院方方案",e.plan?"院方已填写活动方案":"等待院方填写"],["机构确认",t==="confirmed"||t==="completed"?"已确认最终预约":"待机构确认"],["活动完成",t==="completed"?"活动已归档":"待活动执行"]];return t==="cancelled"?`<div class="cancel-banner">${l("alert",15)} 该预约已取消</div>`:`
      <div class="timeline">
        ${i.map(([o,r],c)=>`
              <div class="timeline__item ${c+1<n?"is-done":c+1===n?"is-current":""}">
                <span class="timeline__dot">${c+1<n?l("check",10):c+1}</span>
                <div><strong>${o}</strong><small>${s(r)}</small></div>
              </div>
            `).join("")}
      </div>
    `}function Lr(e){const t=e.plan;return t?`
      <section class="plan-card">
        <div class="plan-card__head">
          <h3>${l("clipboard",15)} 院方活动方案</h3>
          <span>${s(pe(t.updatedAt))} 更新</span>
        </div>
        <div class="plan-row"><span>活动主题</span><strong>${s(t.topic||"待确认")}</strong></div>
        <div class="plan-row"><span>出讲专家</span><strong>${s(t.speaker||"待确认")}</strong></div>
        <div class="plan-row"><span>服务类型</span><strong>${s(L(t.serviceType||e.serviceType))}</strong></div>
        <div class="plan-row"><span>活动时间</span><strong>${s(`${P(t.date||e.date,!0)} ${t.time||""}`)}</strong></div>
        <div class="plan-row"><span>活动地点</span><strong>${s(et(e.province||t.province,e.city||t.city,e.address||t.address,e.venue||t.venue))}</strong></div>
        ${t.outline?`<div class="plan-block"><span>课题大纲</span><p>${s(t.outline)}</p></div>`:""}
        ${t.agenda?`<div class="plan-block"><span>活动流程</span><p>${s(t.agenda)}</p></div>`:""}
        ${t.team?`<div class="plan-block"><span>项目组成员</span><p>${s(t.team)}</p></div>`:""}
        ${t.message?`<div class="plan-message">${s(t.message)}</div>`:""}
        ${t.pdf?`<button class="plan-pdf-link" type="button" data-action="open-plan-pdf"
                data-appointment-id="${s(e.id)}">
                <span class="plan-pdf-link__icon">${l("clipboard",16)}</span>
                <span class="plan-pdf-link__meta">
                  <strong>方案附件 · ${s(t.pdf.name||"活动方案.pdf")}</strong>
                  <small>${s(Rt(t.pdf.size))} · ${At(t.pdf)==="pdf"?"点击在线预览":"点击查看或下载"}</small>
                </span>
                ${l("chevronRight",14)}
              </button>`:""}
      </section>
    `:`
        <section class="plan-card plan-card--empty">
          <h3>${l("clipboard",15)} 活动方案</h3>
          <p>${e.assignedStaff?"院方已接单，正在填写活动主题、时间、地点、课题大纲与项目组成员。":"院方接单后，将在这里填写完整活动方案并提交给机构确认。"}</p>
        </section>
      `}function Er(){const e=U(a.overlay?.appointmentId);if(!e)return"";const t=e.doctorId?D(e.doctorId):null,n=k(e.hospitalId),i=It(e);hn(e);const o=a.overlay?.action||"",r=Ue(e),c=ui(e),p=Ft(e);return`
      <div class="sheet-backdrop" data-action="close-overlay"></div>
      <section class="sheet record-sheet" role="dialog" aria-modal="true" aria-label="预约详情">
        <div class="sheet__grabber"></div>
        <div class="sheet__bar">
          <div><h2>预约详情</h2><p>${s(e.id)}</p></div>
          <button class="sheet__close" type="button" data-action="close-overlay" aria-label="关闭">
            ${l("close",15)}
          </button>
        </div>
        <div class="sheet__body">
          <div class="record-sheet__body">
            ${o==="success"?`<div class="success-banner">${l("checkCircle",22)}<div><strong>预约已提交</strong><p>院方接单后会显示项目对接人，请留意方案状态。</p></div></div>`:""}
            <div class="record-head">
              <div>
                <span class="record-head__tag">${s(L(e.serviceType))} · ${s(n?.name||"")}</span>
                <h1>${s(Fe(e))}</h1>
                <p>${s(P(e.date,!0))} · ${s(t?t.name:e.doctorName||"专家待确认")}</p>
              </div>
              ${xa(e.status)}
            </div>
            ${Pr(e)}
            <section class="info-card">
              <div class="info-row"><span>预约编号</span><strong>${s(e.id)}</strong></div>
              <div class="info-row"><span>机构</span><strong>${s(e.orgName)}</strong></div>
              <div class="info-row"><span>联系人</span><strong>${s(e.contactName)} · ${ee(e.phone,e.phone)}</strong></div>
              ${e.contactTitle||e.email?`<div class="info-row"><span>通知资料</span><strong>${s(e.contactTitle||"职务未填写")}${e.email?` · ${s(e.email)}`:""}</strong></div>`:""}
              <div class="info-row"><span>活动地址</span><strong>${s(fn(e))}</strong></div>
              ${r.canEditLocation?`<button class="location-edit-link" type="button"
                      data-action="appointment-location-edit" data-appointment-id="${s(e.id)}">
                      ${l("edit",12)} 修改活动地点
                    </button>`:["completed","cancelled"].includes(e.status)?"":`<p class="policy-lock-note">${l("lock",12)} ${s(r.locationReason||"当前阶段暂不可修改活动地点")}</p>`}
              <div class="info-row"><span>参与人群</span><strong>${s(e.audience||"待沟通")}${e.headcount?` · ${s(e.headcount)} 人`:""}</strong></div>
              <div class="info-row"><span>项目对接人</span><strong>${vn(i)}</strong></div>
              ${e.note?`<div class="info-row info-row--block"><span>活动备注</span><strong>${s(e.note)}</strong></div>`:""}
            </section>
            ${c.length&&!["completed","cancelled"].includes(e.status)?`<section class="profile-sync-card">
                    ${l("users",16)}
                    <div>
                      <strong>企业资料已更新</strong>
                      <p>预约保存的是下单时资料快照。院方将按快照联系人生成推送文案，确认后可同步最新资料。</p>
                      <ul>${c.map(u=>`<li><span>${s(u.label)}</span><b>${s(u.from)}</b>${l("arrowRight",11)}<em>${s(u.to)}</em></li>`).join("")}</ul>
                      <button class="btn btn--primary btn--sm" type="button"
                        data-action="appointment-profile-sync" data-appointment-id="${s(e.id)}">同步最新资料</button>
                    </div>
                  </section>`:`<p class="snapshot-note">${l("lock",11)} 客户资料快照：${s(p?.capturedAt?pe(p.capturedAt):pe(e.createdAt))}${e.profileSyncedAt?" · 已同步最新资料":""}</p>`}
            ${Lr(e)}
            ${e.feedback?`<section class="feedback-card"><span>${e.changeRequest?.type==="location"?"活动地点更新记录":"机构修改意见"}</span><p>${s(e.feedback)}</p><small>${s(pe(e.feedbackAt))}</small></section>`:""}
            ${e.status==="review"?`<div class="review-actions">
                    <button class="btn btn--primary" type="button" data-action="appointment-action" data-value="confirm">确认最终预约</button>
                    ${r.canModify?'<button class="btn btn--ghost" type="button" data-action="appointment-action" data-value="revise">提出修改</button>':""}
                  </div>
                  ${r.canModify?"":`<div class="policy-lock-card">${l("lock",16)}<div><strong>修改窗口已锁定</strong><p>${s(r.modifyReason)}</p><span>仍可确认院方最新方案；如需协调，请联系项目对接人。</span></div></div>`}`:""}
            ${e.status==="confirmed"?`<div class="confirmed-banner">${l("checkCircle",18)}<div><strong>预约已确认</strong><p>院方将按最终方案执行。${i?`如需协调，请联系项目对接人 ${ee(i.phone,i.phone)}。`:""}</p></div></div>
                  ${r.canModify||r.canCancel?`<div class="appointment-change-policy">
                          <span>${l("shield",13)} 剩余 ${r.remainingDays==null?"--":r.remainingDays} 天 · 取消需提前 ${r.cancelLeadDays} 天 · ${r.cycleDays>=30?"30 天预约周期":"14 天预约周期"} · 已修改 ${r.usedChanges}/${r.cycleDays>=30?"0":"1"} 次</span>
                          <div>
                            ${r.canModify?'<button class="btn btn--ghost btn--sm" type="button" data-action="appointment-action" data-value="change">申请修改</button>':""}
                            ${r.canCancel?'<button class="btn btn--danger-soft btn--sm" type="button" data-action="appointment-action" data-value="cancel">取消预约</button>':""}
                          </div>
                        </div>`:`<div class="policy-lock-card">${l("lock",16)}<div><strong>修改与取消已锁定</strong>${r.modifyReason?`<p>修改：${s(r.modifyReason)}</p>`:""}${r.cancelReason&&r.cancelReason!==r.modifyReason?`<p>取消：${s(r.cancelReason)}</p>`:""}${!r.modifyReason&&!r.cancelReason?"<p>当前阶段不可修改或取消。</p>":""}</div></div>`}`:""}
            ${["pending","planning","review","revision"].includes(e.status)&&r.canCancel?`<button class="text-link text-link--danger record-cancel" type="button"
                    data-action="appointment-action" data-value="cancel">取消本次预约</button>`:""}
          </div>
        </div>
        <div class="sheet__footer">
          ${i?`<a class="btn btn--ghost" href="${s(Ot(i.phone))}">${l("phone",15)} 联系项目对接人</a>`:'<button class="btn btn--ghost" type="button" data-action="close-overlay">返回</button>'}
          <button class="btn btn--primary" type="button" data-action="close-overlay">关闭</button>
        </div>
      </section>
    `}function Rr(){const e=U(a.overlay?.appointmentId);if(!e)return"";const t=a.overlay?.mode||"",n=Ue(e),i=k(e.hospitalId),o=t==="change"||t==="revise",r={confirm:{iconName:"checkCircle",tone:"is-confirm",title:"确认最终预约？",desc:"确认后预约正式生效，院方将按当前方案执行。如需调整，请先提出修改。",cancelText:"再看看",submitText:"确认最终预约",action:"appointment-confirm",submitClass:"btn--primary"},revise:{iconName:"edit",tone:"is-modify",title:"提出修改意见",desc:"说明需要调整的主题、时间、地点或流程，院方更新方案后会再次提交确认。",cancelText:"返回方案",submitText:"提交修改意见",action:"appointment-revise-submit",submitClass:"btn--primary"},change:{iconName:"edit",tone:"is-modify",title:"申请修改已确认方案",desc:`提交后院方会更新方案并重新提交确认。${n.cycleDays<30?"本次会占用 14 天周期内 1 次修改机会。":""}`,cancelText:"暂不修改",submitText:"提交修改申请",action:"appointment-change-submit",submitClass:"btn--primary"},cancel:{iconName:"alert",tone:"is-cancel",title:"取消本次预约？",desc:`${Zt(e)?"该预约由院方人工协调，取消后不占用公开号源，院方会同步释放人工安排。":"取消后公开号源会释放，如需重新预约请再次提交。"}当前预约需提前 ${n.cancelLeadDays} 天取消${n.remainingDays==null?"":`，距活动还有 ${n.remainingDays} 天`}。`,cancelText:"保留预约",submitText:"确认取消",action:"appointment-cancel-submit",submitClass:"btn--danger"}}[t];return r?`
      <div class="sheet-backdrop appointment-dialog-backdrop" data-action="close-overlay"></div>
      <section class="appointment-action-dialog ${r.tone}" role="dialog" aria-modal="true"
        aria-label="${s(r.title)}">
        <div class="appointment-action-dialog__head">
          <span class="appointment-action-dialog__icon">${l(r.iconName,20)}</span>
          <button class="appointment-action-dialog__close" type="button"
            data-action="close-overlay" aria-label="关闭">
            ${l("close",14)}
          </button>
        </div>
        <div class="appointment-action-dialog__context">
          <small>${s(L(e.serviceType))} · ${s(i?.short||i?.name||"")}</small>
          <strong>${s(Fe(e))}</strong>
          <span>${s(P(e.date,!0))}</span>
        </div>
        <h2>${s(r.title)}</h2>
        <p>${s(r.desc)}</p>
        ${o?`<label class="appointment-action-dialog__field">
                <span>修改内容</span>
                <textarea ${t==="revise"?"data-revise-note":"data-change-note"} rows="4" placeholder="请写清楚需要调整的内容，方便院方一次更新到位"></textarea>
              </label>`:""}
        ${t==="cancel"&&e.plan?`<div class="appointment-action-dialog__hint">${l("shield",13)} 取消后，院方将收到状态变更；已上传的方案附件会保留在历史记录中。</div>`:""}
        <div class="appointment-action-dialog__actions">
          <button class="btn btn--ghost" type="button" data-action="close-overlay">${s(r.cancelText)}</button>
          <button class="btn ${r.submitClass}" type="button"
            data-action="${r.action}">${s(r.submitText)}</button>
        </div>
      </section>
    `:""}function yn(e=""){return $a()?(a.overlay?.type==="appointment"&&(a.overlay.action=e),g({scrollTo:Q()}),!0):!1}function Or(e){const t=U(e);if(!t)return;if(!_e(t))return d(a.session?"无权修改该预约。":"请先登录。");const n=Ue(t);if(!n.canEditLocation)return d(n.locationReason||"当前阶段不可修改活动地点。");a.appointmentLocationDraft={appointmentId:t.id,province:t.province||"北京市",city:t.city||"北京市",address:t.address||"",venue:t.venue||""},Re({type:"appointment-location",appointmentId:t.id})}function Hr(){const e=a.appointmentLocationDraft,t=U(e?.appointmentId||a.overlay?.appointmentId);return!e||!t?"":`
      <div class="sheet-backdrop" data-action="close-overlay"></div>
      <section class="sheet" role="dialog" aria-modal="true" aria-label="修改活动地点">
        <div class="sheet__grabber"></div>
        <div class="sheet__bar">
          <div><h2>修改活动地点</h2><p>${s(t.id)} · 由机构填写</p></div>
          <button class="sheet__close" type="button" data-action="close-overlay" aria-label="关闭">
            ${l("close",15)}
          </button>
        </div>
        <div class="sheet__body">
          <div class="sheet-pad">
            <div class="template-form-note">${l("building",13)} 活动地点由机构维护。保存后会同步到预约详情与院方方案，院方运营人员不覆盖此信息。</div>
            <div class="field-row">
              <div class="field"><label>省份</label>
                <select data-location-province>${Oe(e.province)}</select>
              </div>
              <div class="field"><label>城市</label>
                <select data-location-city>${me(e.province,e.city)}</select>
              </div>
            </div>
            <div class="field">
              <label>详细地址 <em>*</em></label>
              <input type="text" data-location-field="address" value="${s(e.address)}" placeholder="如：XX路XX号XX大厦">
            </div>
            <div class="field">
              <label>场地名称 <span>选填</span></label>
              <input type="text" data-location-field="venue" value="${s(e.venue)}" placeholder="如：总部大楼 3 层报告厅">
            </div>
          </div>
        </div>
        <div class="sheet__footer">
          <button class="btn btn--ghost" type="button" data-action="close-overlay">取消</button>
          <button class="btn btn--primary" type="button" data-action="appointment-location-save">
            保存活动地点 ${l("check",14)}
          </button>
        </div>
      </section>
    `}function Br(){const e=a.appointmentLocationDraft,t=U(e?.appointmentId);if(!e||!t)return;if(!_e(t))return d(a.session?"无权修改该预约。":"请先登录。");const n=Ue(t);if(!n.canEditLocation)return d(n.locationReason||"当前阶段不可修改活动地点。");if(!e.address.trim())return d("请填写活动详细地址。");const i=t.doctorId?D(t.doctorId):null,o=gn({appointment:t,expert:i,serviceType:t.serviceType,date:t.plan?.date||t.date,province:e.province,city:e.city,ignoreId:t.id});if(o)return d(o);const r=new Date().toISOString(),c=et(e.province,e.city,e.address,e.venue),p={province:e.province,city:e.city,address:e.address.trim(),venue:e.venue.trim(),locationUpdatedAt:r,locationUpdatedBy:"institution"},u=["review","confirmed"].includes(t.status);t.status==="confirmed"?(p.status="revision",p.confirmedAt="",p.feedback=`机构申请修改活动地点：${c}`,p.feedbackAt=r,p.changeRequest={type:"location",note:p.feedback,at:p.feedbackAt,by:a.session?.name||""},p.clientChangeCount=(Number(t.clientChangeCount)||0)+1):t.status==="review"?(p.status="revision",p.feedback=`机构在待确认阶段修改活动地点：${c}`,p.feedbackAt=r,p.changeRequest={type:"location",note:p.feedback,at:r,by:a.session?.name||""},p.hospitalNotice={type:"location",message:"机构在待确认阶段修改了活动地点，请更新方案后重新提交。",at:r,readAt:""}):(p.feedback=`机构更新活动地点：${c}`,p.feedbackAt=r,p.changeRequest={type:"location",note:p.feedback,at:r,by:a.session?.name||"",acknowledgedAt:""},p.hospitalNotice={type:"location",message:"机构更新了活动地点，请核对方案与现场安排。",at:r,readAt:""}),t.plan&&(p.plan={...t.plan,province:p.province,city:p.city,address:p.address,venue:p.venue,updatedAt:r},(t.status==="revision"||u||["pending","planning"].includes(t.status))&&(p.planNeedsResend=!0,p.planSentAt="")),ce(t.id,p),J("机构更新活动地点",`${t.id} · ${c}`,{entityType:"appointment",entityId:t.id,hospitalId:t.hospitalId}),a.appointmentLocationDraft=null,$a()?a.screen==="admin"?aa():bn():(ue(),F(),g({scrollTo:Q()})),d(p.status==="revision"?"活动地点已更新，院方会重新提交方案后再次确认。":t.status==="pending"?"活动地点已更新，院方接单时会带入最新地点。":t.status==="planning"?"活动地点已更新并通知院方，方案需重新确认后提交。":t.plan?"活动地点已更新并通知院方，方案内容已同步。":"活动地点已更新并通知院方。")}function $n(){if(!a.session){bt({type:"demand"});return}K();const e=ae();a.overlay={type:"demand-create",draft:{targetType:"group",hospitalId:"",serviceType:"讲座",topic:"",audience:"",headcount:"",preferredDate:"",province:e.province,city:e.city,note:"",contactName:a.session.name||"",contactPhone:a.session.contactPhone||a.session.phone||""}},b()}function jr(){const e=a.booking;if(!e){$n();return}Be(e);const t=He(e);Re({type:"demand-create",draft:{targetType:"group",hospitalId:"",serviceType:e.serviceType||"讲座",topic:e.customTopic||"",audience:e.audience||"",headcount:e.headcount||"",preferredDate:e.date||"",province:e.province,city:e.city,note:[e.note,t?`意向专家：${t.name} · ${t.deptTitle}`:"",e.address?`活动地址：${et(e.province,e.city,e.address,e.venue)}`:""].filter(Boolean).join(`
`),contactName:e.contactName||a.session.name||"",contactPhone:e.contactPhone||a.session.phone||""}})}function Ur(){const e=a.overlay?.draft;return e?`
      <div class="sheet-backdrop" data-action="close-overlay"></div>
      <section class="sheet" role="dialog" aria-modal="true" aria-label="发起提需">
        <div class="sheet__grabber"></div>
        <div class="sheet__bar">
          <div><h2>发起提需</h2><p>没有合适的专家？由院方协助匹配</p></div>
          <button class="sheet__close" type="button" data-action="close-overlay" aria-label="关闭">
            ${l("close",15)}
          </button>
        </div>
        <div class="sheet__body">
          <div class="sheet-pad">
            <div class="field demand-target-field">
              <label>目标机构</label>
              <select data-demand-target>
                <option value="group" ${e.targetType==="group"?"selected":""}>集团企康办 · 由集团统筹匹配</option>
                ${a.hospitals.map(t=>`<option value="${s(t.id)}" ${e.targetType==="hospital"&&e.hospitalId===t.id?"selected":""}>${s(t.name)}</option>`).join("")}
              </select>
              <span class="field-help">默认提交至集团企康办，也可指定具体履约医院。</span>
            </div>
            <div class="field">
              <label>服务类型</label>
              <div class="choice-grid choice-grid--three">
                ${Pe.map(t=>`<button class="choice-tile ${e.serviceType===t?"is-active":""}" type="button" data-action="demand-service" data-value="${s(t)}">${s(L(t))}</button>`).join("")}
              </div>
            </div>
            <div class="field">
              <label>需求主题</label>
              <input type="text" data-demand-field="topic" value="${s(e.topic)}" placeholder="如：职场人群睡眠与压力管理">
            </div>
            <div class="field-row">
              <div class="field"><label>参与人群</label>
                <input type="text" data-demand-field="audience" value="${s(e.audience)}" placeholder="如：企业员工">
              </div>
              <div class="field"><label>预计人数</label>
                <input type="number" inputmode="numeric" data-demand-field="headcount" value="${s(e.headcount)}" placeholder="如：60">
              </div>
            </div>
            <div class="field">
              <label>期望日期 <span>选填</span></label>
              <input type="date" data-demand-field="preferredDate" value="${s(e.preferredDate)}" min="${Te()}">
            </div>
            <div class="field-row">
              <div class="field">
                <label>活动省份</label>
                <select data-demand-province>${Oe(e.province)}</select>
              </div>
              <div class="field">
                <label>活动城市</label>
                <select data-demand-city>${me(e.province,e.city)}</select>
              </div>
            </div>
            <div class="field">
              <label>需求说明</label>
              <textarea data-demand-field="note" placeholder="请描述活动背景、人群特点、场地条件或期望的专家方向">${s(e.note)}</textarea>
            </div>
            <div class="field-row">
              <div class="field"><label>联系人</label>
                <input type="text" data-demand-field="contactName" value="${s(e.contactName)}">
              </div>
              <div class="field"><label>联系电话</label>
                <input type="tel" inputmode="numeric" maxlength="11" data-demand-field="contactPhone" value="${s(e.contactPhone)}">
              </div>
            </div>
          </div>
        </div>
        <div class="sheet__footer">
          <button class="btn btn--ghost" type="button" data-action="close-overlay">取消</button>
          <button class="btn btn--primary" type="button" data-action="demand-submit">提交提需 ${l("arrowRight",15)}</button>
        </div>
      </section>
    `:""}function Fr(){const e=a.overlay?.draft;if(!e)return;if(!a.session){d("请先登录后再提交提需。"),bt({type:"demand"});return}if(!e.topic.trim())return d("请填写需求主题。");if(!e.contactName.trim())return d("请填写联系人。");if(e.contactPhone&&!/^1\d{10}$/.test(e.contactPhone))return d("联系电话格式不正确。");if(!e.province||!e.city)return d("请选择活动省市。");if(e.targetType==="hospital"&&!e.hospitalId)return d("请选择具体目标医院。");if(e.preferredDate&&e.preferredDate<Te())return d("期望日期不能早于今天。");if(String(e.headcount||"").trim()&&(!Number.isInteger(Number(e.headcount))||Number(e.headcount)<=0))return d("预计人数需填写大于 0 的整数。");const t=new Date().toISOString(),n={id:Hn("XQ"),ownerPhone:a.session.phone,orgName:a.session.orgName,orgType:a.session.orgType,contactName:e.contactName.trim(),contactTitle:a.session.title||"",phone:e.contactPhone||a.session.phone,province:e.province,city:e.city,targetType:e.targetType==="hospital"?"hospital":"group",hospitalId:e.targetType==="hospital"&&e.hospitalId||"",serviceType:e.serviceType,topic:e.topic.trim(),audience:e.audience.trim(),headcount:e.headcount,preferredDate:e.preferredDate,note:e.note.trim(),status:"pending",assignedStaff:null,followUps:[],createdAt:t,updatedAt:t},i=Ae();i.push(n),en(i),ue(),F(),a.clientRecordTab="demands",a.tab="appointments",g({scrollTo:0}),d(n.targetType==="group"?"提需已提交，集团企康办将由超级管理员跟进。":"提需已提交，医院运营会尽快电话联系。")}function qr(){const e=le(a.overlay?.demandId);if(!e)return"";const t=va(e),n=e.targetType==="group",i=ra(e),o=e.matchedExpertId?D(e.matchedExpertId):null;return`
      <div class="sheet-backdrop" data-action="close-overlay"></div>
      <section class="sheet record-sheet" role="dialog" aria-modal="true" aria-label="提需详情">
        <div class="sheet__grabber"></div>
        <div class="sheet__bar">
          <div><h2>提需详情</h2><p>${s(e.id)}</p></div>
          <button class="sheet__close" type="button" data-action="close-overlay" aria-label="关闭">
            ${l("close",15)}
          </button>
        </div>
        <div class="sheet__body">
          <div class="record-sheet__body">
            <div class="record-head">
              <div>
                <span class="record-head__tag">${s(L(e.serviceType))} · ${s(t)}</span>
                <h1>${s(e.topic)}</h1>
                <p>${s(e.audience||"参与人群待沟通")} · ${s(e.headcount?e.headcount+" 人":"人数待确认")}</p>
              </div>
              <span class="status-pill ${i.cls}">${s(i.label)}</span>
            </div>
            ${e.status==="matched"&&o&&!e.convertedAppointmentId?`<section class="demand-route-note">
                    ${l("checkCircle",15)}
                    <div>
                      <strong>院方已匹配 ${s(o.name)}，履约日期已协调</strong>
                      <p>服务类型、专家、履约日期和联系人已自动带入，日期无需再选公开号源。补充活动地址并确认信息后即可生成预约单，无需重新提交提需。</p>
                    </div>
                  </section>`:""}
            ${n?`<section class="demand-route-note">
                    ${l("shield",15)}
                    <div>
                      <strong>集团企康办 · 超级管理员跟进</strong>
                      <p>该需求不会进入具体医院需求池，由超级管理员统一联系、分配并跟进落地。</p>
                    </div>
                  </section>`:""}
            <section class="info-card">
              <div class="info-row"><span>目标机构</span><strong>${s(t)}</strong></div>
              ${o?`<div class="info-row"><span>匹配专家</span><strong>${s(o.name)} · ${s(o.deptTitle)}</strong></div>`:""}
              <div class="info-row"><span>期望日期</span><strong>${s(e.preferredDate?P(e.preferredDate,!0):"待沟通")}</strong></div>
              ${e.matchedDate?`<div class="info-row"><span>院方履约日期</span><strong>${s(P(e.matchedDate,!0))}</strong></div>`:""}
              <div class="info-row"><span>活动地区</span><strong>${s(C(e.province,e.city))}</strong></div>
              <div class="info-row"><span>联系人</span><strong>${s(e.contactName)} · ${ee(e.phone,e.phone)}</strong></div>
              <div class="info-row"><span>${n?"集团对接人":"院方对接人"}</span><strong>${vn(e.assignedStaff)}</strong></div>
              ${e.note?`<div class="info-row info-row--block"><span>需求说明</span><strong>${s(e.note)}</strong></div>`:""}
            </section>
            ${e.followUps?.length?`<section class="feedback-card"><span>${n?"集团沟通记录":"院方沟通记录"}</span>${e.followUps.map(r=>`<p>${s(r.note)}<small>${s(r.by?.name||"院方")} · ${s(pe(r.at))}</small></p>`).join("")}</section>`:""}
            ${!e.convertedAppointmentId&&["pending","contacted","matched"].includes(e.status)?`<button class="text-link text-link--danger record-cancel" type="button"
                    data-action="demand-cancel">取消本次提需</button>`:""}
          </div>
        </div>
        <div class="sheet__footer">
          ${e.convertedAppointmentId?`<button class="btn btn--ghost" type="button" data-action="demand-open-appointment"
                  data-appointment-id="${s(e.convertedAppointmentId)}">查看已转预约</button>
                 <button class="btn btn--primary" type="button" data-action="close-overlay">关闭</button>`:e.status==="matched"?`<button class="btn btn--ghost" type="button" data-action="close-overlay">关闭</button>
                 <button class="btn btn--primary" type="button" data-action="demand-convert">
                   确认并生成预约 ${l("arrowRight",15)}</button>`:`${e.assignedStaff?`<a class="btn btn--ghost" href="${s(Ot(e.assignedStaff.phone))}">${l("phone",15)} 联系${n?"集团":"院方"}</a>`:'<button class="btn btn--ghost" type="button" data-action="close-overlay">返回</button>'}
                <button class="btn btn--primary" type="button" data-action="close-overlay">关闭</button>`}
        </div>
      </section>
    `}function Vr(){const e=a.session;if(!e)return`
        <div class="screen">
          <header class="page-head">
            <span class="eyebrow"><i></i> My Account</span>
            <h1>我的</h1>
            <p>登录企业账号，管理预约、提需与企业信息。</p>
          </header>
          <div class="login-required">
            <span class="login-required__icon">${l("user",28)}</span>
            <h2>登录企业账号</h2>
            <p>手机号登录，保持登录状态，下次打开自动进入。</p>
            <button class="btn btn--primary btn--block" type="button" data-action="start-login">
              登录 / 注册 ${l("arrowRight",15)}
            </button>
          </div>
        </div>
      `;const t=Ut(e.phone),n=ha(e.phone),i=Un(e),o=K(e),r=o?.phone||"";return`
      <div class="screen me-screen">
        <header class="page-head page-head--tight">
          <span class="eyebrow"><i></i> My Account</span>
          <h1>我的</h1>
        </header>
        ${i.length?`<section class="profile-completion-card">
                ${l("alert",17)}
                <div>
                  <strong>企业资料待完善</strong>
                  <p>${s(i.join("、"))}，完善后便于院方确认方案和生成推送文案。</p>
                </div>
                <button type="button" data-action="open-profile">去完善</button>
              </section>`:""}
        <section class="profile-hero">
          <div class="profile-hero__top">
            <span class="profile-hero__avatar">${s(Qe(e.name))}</span>
            <div class="profile-hero__person">
              <strong>${s(e.name)}</strong>
              <span>${s(e.orgName)}</span>
              <small>${s(e.orgType)}${e.title?" · "+s(e.title):""}</small>
            </div>
            <button class="profile-hero__edit" type="button" data-action="open-profile">${l("edit",14)} ${i.length?"完善":"编辑"}</button>
          </div>
          <div class="profile-hero__phone">
            ${l("phone",15)}
            <strong>${s(e.contactPhone||e.phone)}</strong>
            <span>联系手机</span>
          </div>
        </section>
        <div class="me-stats">
          <button type="button" data-action="tab" data-tab="appointments">
            <strong>${t.length}</strong><span>活动预约</span>
          </button>
          <button type="button" data-action="me-demands">
            <strong>${n.length}</strong><span>专家提需</span>
          </button>
          <button type="button" data-action="me-confirmed">
            <strong>${t.filter(c=>c.status==="confirmed").length}</strong>
            <span>已确认</span>
          </button>
        </div>
        <section class="me-menu">
          <button type="button" data-action="tab" data-tab="appointments">
            <span class="me-menu__icon">${l("calendar",17)}</span>
            <span><strong>我的预约</strong><small>查看方案、确认预约与对接人</small></span>
            ${l("chevronRight",15)}
          </button>
          <button type="button" data-action="open-demand">
            <span class="me-menu__icon">${l("sparkles",17)}</span>
            <span><strong>专家提需</strong><small>没有合适专家时由院方协助匹配</small></span>
            ${l("chevronRight",15)}
          </button>
          <button type="button" data-action="open-profile">
            <span class="me-menu__icon">${l("user",17)}</span>
            <span><strong>企业资料</strong><small>姓名、职务、单位与通知邮箱</small></span>
            ${l("chevronRight",15)}
          </button>
          <a href="${r?s(Ot(r)):"#"}">
            <span class="me-menu__icon">${l("phone",17)}</span>
            <span><strong>医院服务咨询</strong><small>${s(o?.short||o?.name||"当前医院")} · ${s(r||"电话待补充")}</small></span>
            ${l("chevronRight",15)}
          </a>
        </section>
        <button class="btn btn--ghost btn--block me-logout" type="button" data-action="logout">
          ${l("logout",15)} 退出登录
        </button>
        <p class="source-note">登录状态会保存在当前浏览器，下次打开自动进入。演示环境仅生成可复制的推送内容，不会真实发送。</p>
      </div>
    `}function Kr(){const e=a.profileDraft||{...a.session},t=tt(a.session);return`
      <div class="sheet-backdrop" data-action="close-overlay"></div>
      <section class="sheet" role="dialog" aria-modal="true" aria-label="编辑企业资料">
        <div class="sheet__grabber"></div>
        <div class="sheet__bar">
          <div><h2>企业资料</h2><p>用于预约联系与就近医院匹配</p></div>
          <button class="sheet__close" type="button" data-action="close-overlay" aria-label="关闭">
            ${l("close",15)}
          </button>
        </div>
        <div class="sheet__body">
          <div class="sheet-pad">
            <p class="profile-form-note">${l("shield",13)} 姓名、职务、单位、联系方式和通知邮箱用于预约确认与方案通知，请完整填写。</p>
            <div class="field-row">
              <div class="field"><label>姓名 <em>*</em></label>
                <input type="text" data-profile-field="name" value="${s(e.name)}">
              </div>
              <div class="field"><label>职务 <em>*</em></label>
                <input type="text" data-profile-field="title" value="${s(e.title||"")}">
              </div>
            </div>
            <div class="field"><label>单位名称 <em>*</em></label>
              <input type="text" data-profile-field="orgName" value="${s(e.orgName)}">
            </div>
            <div class="field"><label>机构类型 <em>*</em></label>
              <select data-profile-field="orgType">
                ${Lt.map(n=>`<option value="${n}" ${e.orgType===n?"selected":""}>${n}</option>`).join("")}
              </select>
            </div>
            <div class="field"><label>联系方式 <em>*</em> <span>默认手机号，可修改</span></label>
              <input type="tel" inputmode="numeric" maxlength="11" data-profile-field="contactPhone" value="${s(e.contactPhone||e.phone)}">
            </div>
            <div class="field"><label>通知邮箱 <em>*</em> <span>用于接收方案与确认提醒</span></label>
              <input type="email" inputmode="email" data-profile-field="email" value="${s(e.email||"")}" placeholder="name@company.com">
            </div>
            <div class="field">
              <label>所在省市 <span>无需填写，自动同步</span></label>
              <div class="field-static">
                ${l("mapPin",14)} ${s(C(t.province,t.city))}
              </div>
              <span class="field-help">根据当前定位或首页选择的城市自动确定，不能手动修改。</span>
            </div>
          </div>
        </div>
        <div class="sheet__footer">
          <button class="btn btn--ghost" type="button" data-action="close-overlay">取消</button>
          <button class="btn btn--primary" type="button" data-action="profile-save">保存资料</button>
        </div>
      </section>
    `}function zr(){a.session&&(a.profileDraft={...a.session},a.overlay={type:"profile"},b())}function Wr(){const e=a.profileDraft;if(!e)return;const t=ja({...e,phone:a.session.phone});if(t)return d(t);const n=tt(a.session),i=Ee({...a.session,...e,phone:a.session.phone,name:e.name.trim(),orgName:e.orgName.trim(),contactPhone:String(e.contactPhone||a.session.phone).trim(),title:e.title.trim(),email:e.email.trim(),province:n.province,city:n.city});Fa(i),Ht(i),a.overlay=null,F(),g(),d("企业资料已保存。")}function Xr(){if(a.adminAuthed){a.screen="admin",a.tab="home",a.adminTab="appointments",Bt("admin"),a.adminHistory||(a.adminHistory=!0,gt("admin")),g({scrollTo:0});return}a.screen="admin-login",a.adminLogin={username:"",password:"",error:""},a.adminHistory||(a.adminHistory=!0,gt("admin")),g()}function kn(){const e=a.adminLogin||{username:"",password:"",error:""};return`
      <div class="admin-login">
        <div class="admin-login__top">
          <button class="icon-button" type="button" data-action="admin-close" aria-label="返回客户端">
            ${l("chevronLeft",18)}
          </button>
          <img src="assets/logo.svg" alt="北京大学国际医院">
          <span></span>
        </div>
        <div class="admin-login__hero">
          <span>${l("shield",14)} 院方工作台</span>
          <h1>医院运营与<br>项目管理登录</h1>
          <p>超级管理员可分配医院运营人员；医院运营仅能维护本院专家、号源与预约。</p>
        </div>
        <div class="admin-login__card">
          <div class="field">
            <label for="admin-username">账号</label>
            <input id="admin-username" type="text" placeholder="请输入院方账号"
              value="${s(e.username)}" data-admin-login="username" autocomplete="username">
          </div>
          <div class="field">
            <label for="admin-password">密码</label>
            <input id="admin-password" type="password" placeholder="请输入密码"
              value="${s(e.password)}" data-admin-login="password" autocomplete="current-password">
          </div>
          ${e.error?`<p class="admin-login__error">${l("alert",13)} ${s(e.error)}</p>`:""}
          <button class="btn btn--primary btn--block" type="button" data-action="admin-login">
            登录工作台 ${l("arrowRight",15)}
          </button>
          <div class="admin-login__demo">
            <strong>演示账号</strong>
            <span>超级管理员 admin / pkuih2026</span>
            <span>医院运营 pkuih / pkuih2026</span>
            <span>其他医院：医院 ID / pkuih2026（如 zibo、luan、kaide）</span>
          </div>
        </div>
      </div>
    `}function Yr(){const e=a.adminLogin||{},t=at().find(n=>n.username===e.username.trim()&&n.active);if(!t||t.password!==e.password){a.adminLogin.error="账号或密码不正确，请重试。",g();return}Va(t),a.adminAuthed=!0,a.adminUser=t,a.screen="admin",a.adminTab="appointments",a.adminHospitalId=t.role==="operator"?t.hospitalId:"",Bt("admin"),g({scrollTo:0})}function Gr(e){return Et[e?.role]||Et.operator}function so(e=a.adminUser){return e?e.role==="superadmin"?a.adminHospitalId&&k(a.adminHospitalId)?.name||"全部医院":k(e.hospitalId)?.name||"未绑定医院":""}function Zr(){return gi().filter(e=>["pending","planning","review","revision"].includes(e.status)).length}function Jr(){return tn().filter(e=>e.status==="pending").length}function Qr(){const e=[{id:"appointments",label:"预约",icon:"calendar",badge:Zr()},{id:"demands",label:"需求池",icon:"sparkles",badge:Jr()},{id:"slots",label:"号源",icon:"clock"},{id:"doctors",label:"专家",icon:"experts"},{id:"themes",label:"时令",icon:"leaf"},{id:"templates",label:"方案模版",icon:"clipboard"},{id:"marketing",label:"展业",icon:"send"}];return w()&&(e.splice(4,0,{id:"hospitals",label:"医院账号",icon:"building"}),e.push({id:"institutions",label:"机构账号",icon:"users"},{id:"logs",label:"操作日志",icon:"history"})),e}function ge(){return`
      <div class="admin-tabs" role="tablist">
        ${Qr().map(e=>`
              <button class="${a.adminTab===e.id?"is-active":""}" type="button"
                data-action="admin-tab" data-value="${e.id}">
                ${e.label}
                ${e.badge?`<i>${e.badge}</i>`:""}
              </button>
            `).join("")}
      </div>
    `}function ec(){const e=a.adminUser;return e?`
      <div class="admin-screen">
        <header class="admin-topbar">
          <div class="admin-topbar__brand">
            <img src="assets/logo.svg" alt="北京大学国际医院">
            <div>
              <strong>${s(e.name)} · ${s(Gr(e).label)}</strong>
              <span>${s(so(e))} · ${ee(e.phone,e.phone)}</span>
            </div>
          </div>
          <div class="admin-topbar__actions">
            <button class="icon-button" type="button" data-action="admin-close" aria-label="返回客户端">
              ${l("close",16)}
            </button>
            <button class="icon-button" type="button" data-action="admin-logout" aria-label="退出登录">
              ${l("logout",16)}
            </button>
          </div>
        </header>
        <main class="admin-content">
          ${a.adminTab==="demands"?dc():a.adminTab==="slots"?_c():a.adminTab==="doctors"?Fc():a.adminTab==="themes"?Oc():a.adminTab==="templates"?Nc():a.adminTab==="hospitals"?pl():a.adminTab==="institutions"?ul():a.adminTab==="logs"?vl():a.adminTab==="marketing"?$l():Aa()}
        </main>
      </div>
    `:kn()}function qe(){return w()?`
      <div class="admin-scope">
        <label>${l("building",13)} 医院范围</label>
        <select data-admin-hospital>
          <option value="">全部医院</option>
          ${a.hospitals.map(e=>`<option value="${s(e.id)}" ${a.adminHospitalId===e.id?"selected":""}>${s(e.name)}</option>`).join("")}
        </select>
      </div>
    `:""}function ro(){const e=bi();return{pending:e.filter(t=>t.status==="pending").length,review:e.filter(t=>t.status==="review").length,confirmed:e.filter(t=>t.status==="confirmed").length,completed:e.filter(t=>t.status==="completed").length}}function co(){const e=a.adminSearch.trim().toLowerCase();return bi().filter(t=>a.adminFilter!=="all"&&t.status!==a.adminFilter?!1:e?[t.id,t.orgName,t.contactName,t.phone,t.topic,t.doctorName,t.serviceType].join(" ").toLowerCase().includes(e):!0).sort((t,n)=>String(n.createdAt).localeCompare(String(t.createdAt)))}function lo(e){const t=k(e.hospitalId),n=e.doctorId?D(e.doctorId):null,i=It(e),o=!!e.plan&&["review","revision","confirmed"].includes(e.status)&&!yi(e,an()[e.id]);return`
      <article class="admin-record" role="button" tabindex="0" data-action="open-admin-appointment"
        data-appointment-id="${s(e.id)}">
        <div class="admin-record__top">
          ${xa(e.status)}
          <span>${s(P(e.date,!0))}</span>
        </div>
        <h3>${s(Fe(e))}</h3>
        <div class="admin-record__tags">
          <span>${s(L(e.serviceType))}</span>
          <span class="is-hospital">${s(t?.short||"")}</span>
          <span>${s(n?n.name:e.doctorName||"待匹配专家")}</span>
          ${o?'<span class="is-push">推送待复制</span>':""}
          ${e.changeRequest?.type==="location"?'<span class="is-notice">机构改地点</span>':""}
          ${e.profileSyncedAt?'<span class="is-notice">资料已更新</span>':""}
        </div>
        <div class="admin-record__info">
          <span>${l("building",12)} ${s(e.orgName)}</span>
          <span>${l("user",12)} 下单人 ${s(e.contactName||"未填写")}${e.contactTitle?` · ${s(e.contactTitle)}`:""}</span>
          <span>${l("phone",12)} ${ee(e.phone,e.phone)}</span>
        </div>
        <div class="admin-record__foot">
          <span>${l("user",12)} ${i?`对接人 ${s(i.name)}`:"尚未接单"}</span>
          <span>${s(e.id)} ${l("chevronRight",12)}</span>
        </div>
      </article>
    `}function po(){return a.adminOwnerScope==="mine"?`<div class="empty-state"><span class="empty-state__icon">${l("calendar",26)}</span><h3>当前筛选下暂无我负责的预约</h3><p>待接单项目会始终展示；其他项目仅展示当前账号已接单的记录。</p></div>`:`<div class="empty-state"><span class="empty-state__icon">${l("calendar",26)}</span><h3>暂无预约</h3><p>切换筛选或等待机构提交。</p></div>`}function Aa(){const e=ro(),t=co(),n=[["all","全部"],["pending","待接单"],["planning","方案制作"],["review","待确认"],["revision","待修改"],["confirmed","已确认"],["completed","已完成"]];return`
      <div class="admin-page-head">
        <div><h1>预约管理</h1><p>接单、填写方案并与机构确认</p></div>
        <span class="admin-page-head__date">${s(so())}</span>
      </div>
      ${ge()}
      ${qe()}
      <div class="admin-stats" id="admin-appointment-stats">
        <div class="admin-stat"><small>待接单</small><strong data-admin-stat="pending">${e.pending}</strong><span>需尽快响应</span></div>
        <div class="admin-stat"><small>待机构确认</small><strong data-admin-stat="review">${e.review}</strong><span>方案已提交</span></div>
        <div class="admin-stat"><small>已确认</small><strong data-admin-stat="confirmed">${e.confirmed}</strong><span>等待执行</span></div>
        <div class="admin-stat"><small>已完成</small><strong data-admin-stat="completed">${e.completed}</strong><span>历史活动</span></div>
      </div>
      <div class="admin-search">
        ${l("search",15)}
        <input type="search" placeholder="搜索机构、联系人、编号" value="${s(a.adminSearch)}" data-admin-search>
      </div>
      <div class="admin-owner-filter">
        <span class="admin-owner-filter__copy">
          <strong>${l("users",13)} 项目范围</strong>
          <small data-admin-owner-hint>${a.adminOwnerScope==="mine"?"我的项目 + 全部待接单":"本院全部运营项目"}</small>
        </span>
        <div class="segmented segmented--admin-owner" role="group" aria-label="项目范围">
          <button class="${a.adminOwnerScope==="all"?"is-active":""}" type="button"
            data-action="admin-owner-scope" data-value="all">查看所有</button>
          <button class="${a.adminOwnerScope==="mine"?"is-active":""}" type="button"
            data-action="admin-owner-scope" data-value="mine">仅看我的</button>
        </div>
      </div>
      <div class="filter-scroll filter-scroll--admin">
        ${n.map(([i,o])=>`<button class="chip ${a.adminFilter===i?"is-active":""}" type="button"
                data-action="admin-filter" data-value="${i}">${o}</button>`).join("")}
      </div>
      <div id="admin-record-list" class="admin-record-list">
        ${t.length?t.map(lo).join(""):po()}
      </div>
    `}function tc(e,t=!1){return at().filter(n=>(t||n.active)&&n.role==="operator"&&n.hospitalId===e).sort((n,i)=>n.name.localeCompare(i.name,"zh-CN"))}function wn(e){return e?{username:e.username,name:e.name,phone:e.phone}:null}function ac(){const e=U(a.adminReviewId);if(!e)return;if(["completed","cancelled"].includes(e.status))return d("该预约已结束，不能重新接单。");if(e.assignedStaff){d("该预约已有项目对接人。");return}const t=a.adminUser;if(!t)return d("登录状态已失效，请重新登录。");if(!ve(e.hospitalId))return d("只能接本院预约。");const n=new Date().toISOString(),i=ce(e.id,{status:e.status==="pending"?"planning":e.status,assignedStaff:wn(t),acceptedAt:e.acceptedAt||n});J("接单并指定项目负责人",`${e.id} · ${e.orgName}`,{entityType:"appointment",entityId:e.id,hospitalId:e.hospitalId}),a.adminDraft=Ma(i),a.adminReviewSaved=!1,b(),d(`已接单，项目对接人为 ${t.name}。`)}function Ma(e){const t=e.doctorId?D(e.doctorId):null,n=It(e),i=e.plan||{},o=H(e.province||"北京市",e.city||"北京市");return{topic:i.topic||Fe(e),serviceType:i.serviceType||e.serviceType||"讲座",speakerId:i.speakerId||t?.id||"",speaker:i.speaker||(t?`${t.name} · ${t.deptTitle}`:""),date:i.date||e.date||"",time:"全天",province:o.province,city:o.city,venue:e.venue||"",address:e.address||"",outline:i.outline||`1. 企业人群健康风险概览
2. 专家主题分享
3. 常见问题与误区
4. 现场问答与健康咨询`,agenda:i.agenda||`14:00-14:10 签到与开场
14:10-15:10 专家主题分享
15:10-15:40 现场问答
15:40-16:00 健康咨询`,team:i.team||(n?`${n.name}（项目负责人）`:""),message:i.message||"院方已完成专家与课题匹配，请确认活动时间、地点与流程。如人数或场地有变化，请提前联系项目对接人。",planPdf:i.pdf||null,internalNote:e.internalNote||""}}function uo(e,t){const n=q(e?.serviceType||"讲座");return a.experts.filter(i=>i.hospitalId===t&&i.active!==!1&&j(i,n)).map(i=>`<option value="${s(i.id)}" ${e?.speakerId===i.id?"selected":""}>${s(i.name)} · ${s(i.deptTitle)} · ${s(te(i))}</option>`).join("")}function mo(){const e={};return document.querySelectorAll("[data-review-field]").forEach(t=>{e[t.dataset.reviewField]=t.value.trim()}),e}function _n(){const e=document.querySelector("[data-internal-note]");return e?{internalNote:e.value.trim(),internalNoteAt:new Date().toISOString(),internalNoteBy:a.adminUser?.name||""}:null}async function nc(){const e=U(a.adminReviewId);if(!e||a.reviewSaving)return;if(["completed","cancelled"].includes(e.status))return d("该预约已结束，方案仅供查看。");if(!ve(e.hospitalId))return d("只能处理本院预约。");if(!e.assignedStaff)return d("请先接单并确定项目对接人。");const t=mo();if(!t.topic)return d("请填写活动主题。");if(!t.date)return d("请选择活动日期。");if(t.date<Te())return d("活动日期不能早于今天。");const n=It(e);if(!(e.address||"").trim())return d("机构尚未填写活动详细地址，请先联系机构补充。");const i=t.serviceType||e.serviceType||"讲座",o=t.speakerId?D(t.speakerId):null,r=ao(e,i),c=Number(String(t.date||"").slice(5,7))||0,p=Number(e.themeMonth)||0,u=!!(q(i)==="讲座"&&r&&p&&c===p&&o&&String(r.expertId||"")===String(o.id)&&String(t.topic||"").trim()===String(r.title||"").trim()),h=u?e:{...e,themeMonth:"",themeTopicId:""},m=gn({appointment:h,expert:o,serviceType:i,date:t.date,province:e.province,city:e.city,ignoreId:e.id});if(m)return d(m);let v;try{a.reviewSaving=!0,d("正在保存活动方案…"),v=await Qc(e)}catch{return a.reviewSaving=!1,d("方案附件保存失败，请压缩文件或稍后重试。")}const f=H(e.province||"北京市",e.city||"北京市"),_={topic:t.topic,serviceType:i,speakerId:o?.id||"",speaker:o?`${o.name} · ${o.deptTitle}`:e.doctorName||t.speaker||"",date:t.date,time:"全天",province:f.province,city:f.city,venue:e.venue||"",address:e.address||"",outline:t.outline||"",agenda:t.agenda||"",team:t.team||"",message:t.message||"",pdf:v.pdf,contact:n?`${n.name} · ${n.phone}`:"",themeMonth:u&&e.themeMonth||"",themeTopicId:u&&e.themeTopicId||"",themeCoverage:u&&e.themeCoverage||"",updatedAt:new Date().toISOString()},S=e.status==="confirmed"||e.status==="completed",$={status:"review",plan:_,planHistory:(e.planHistory||[]).concat(e.plan?[{...e.plan,replacedAt:new Date().toISOString()}]:[]),feedback:"",feedbackAt:"",changeRequest:null,planNeedsResend:!1,hospitalNotice:e.hospitalNotice?{...e.hospitalNotice,readAt:new Date().toISOString()}:e.hospitalNotice,previousStatus:"",planSentAt:new Date().toISOString(),requestedDate:e.requestedDate||e.date,date:t.date,coordinatedDate:Zt(e)?t.date:e.coordinatedDate||"",coordinatedUpdatedAt:Zt(e)?new Date().toISOString():e.coordinatedUpdatedAt||"",serviceType:i,themeMonth:u&&e.themeMonth||"",themeTopicId:u&&e.themeTopicId||"",themeCoverage:u&&e.themeCoverage||"",confirmedAt:"",completedAt:""},I=_n();I&&Object.assign($,I),$.doctorId=o.id,$.doctorName=o.name,$.tier=o.tier;let W;try{W=ce(e.id,$)}catch{return a.reviewSaving=!1,v.newKey&&Ao(v.newKey),d("方案保存失败，请稍后重试。")}v.oldKey&&v.oldKey!==v.newKey&&Ao(v.oldKey),a.reviewSaving=!1,J("提交或更新活动方案",`${e.id} · ${_.topic}`,{entityType:"appointment",entityId:e.id,hospitalId:e.hospitalId}),a.adminReviewId=W.id,a.adminDraft=Ma(W),a.adminNoteEditing=!1,a.adminReviewSaved=!0,b(),aa(),window.requestAnimationFrame(()=>{V.querySelector(".sms-card")?.scrollIntoView({block:"center",behavior:"auto"})}),d(S?"方案已更新并提交，推送文案已生成；机构需重新确认。":r&&!u?"方案已提交；原时令课题关联已解除，推送文案已生成。":"方案已提交，推送文案已生成，可复制后自行发送。")}function ic(){const e=U(a.adminReviewId);if(!e)return;if(!ve(e.hospitalId))return d("只能处理本院预约。");if(e.status!=="confirmed")return d("机构确认方案后才能标记活动完成。");const t={status:"completed",completedAt:new Date().toISOString()},n=_n();n&&Object.assign(t,n),ce(e.id,t),J("标记活动已完成",e.id,{entityType:"appointment",entityId:e.id,hospitalId:e.hospitalId}),a.adminReviewId="",a.adminDraft=null,F(),ue(),g(),d("活动已标记完成。")}function oc(){const e=U(a.adminReviewId);if(!e)return;if(!ve(e.hospitalId))return d("只能处理本院预约。");if(["completed","cancelled"].includes(e.status))return d("该预约已结束，内部备注仅供查看。");const t=_n();t&&(ce(e.id,t),J("更新预约内部备注",e.id,{entityType:"appointment",entityId:e.id,hospitalId:e.hospitalId}),a.adminNoteEditing=!1,b(),d("内部备注已保存，机构端不可见。"))}function sc(){const e=U(a.adminReviewId);if(!e)return"";const t=k(e.hospitalId),n=e.doctorId?D(e.doctorId):null,i=It(e),o=a.adminDraft||Ma(e),r=["completed","cancelled"].includes(e.status),c=!!i,p=c&&!r,u=p&&a.adminReviewSaved&&!!e.plan,h=c&&(!p||u),m=an()[e.id],v=yi(e,m),f=fo(e),_=La(e.hospitalId);return`
      <div class="sheet-backdrop" data-action="close-overlay"></div>
      <section class="sheet admin-review-sheet" role="dialog" aria-modal="true" aria-label="处理预约">
        <div class="sheet__grabber"></div>
        <div class="sheet__bar">
          <div><h2>处理预约</h2><p>${s(e.id)} · ${s(t?.name||"")}</p></div>
          <button class="sheet__close" type="button" data-action="close-overlay" aria-label="关闭">
            ${l("close",15)}
          </button>
        </div>
        <div class="sheet__body">
          <div class="sheet-pad">
            ${e.changeRequest?.type==="location"?`<div class="review-state-banner is-location">
                    ${l("pin",18)}
                    <div>
                      <strong>机构已更新活动地点</strong>
                      <p>${s(e.changeRequest.note||"请核对下方最新地址，并在方案与现场流程中同步。")}</p>
                      <small>${s(pe(e.changeRequest.at))} · ${s(e.changeRequest.by||"机构联系人")}</small>
                    </div>
                  </div>`:""}
            <div class="review-summary">
              <div class="review-summary__top">
                <img src="${s(ke(n))}" alt="${s(n?n.name:"待匹配")}">
                <div>
                  <strong>${s(n?n.name:"待匹配专家")}</strong>
                  <small>${s(e.serviceType)} · ${s(t?.short||"")} · ${s(P(e.date,!0))}</small>
                </div>
                ${xa(e.status)}
              </div>
              <div class="info-card info-card--flat">
                <div class="info-row"><span>机构</span><strong>${s(e.orgName)}</strong></div>
                <div class="info-row"><span>联系人</span><strong>${s(e.contactName)} · ${ee(e.phone,e.phone)}</strong></div>
                <div class="info-row"><span>通知邮箱</span><strong>${s(e.email||Ft(e)?.email||"未填写")}</strong></div>
                <div class="info-row info-row--block"><span>资料口径</span><strong>下单时客户资料快照${e.profileSyncedAt?` · 机构已于 ${s(pe(e.profileSyncedAt))} 同步最新资料`:" · 机构资料变更后需在预约详情手动同步"}</strong></div>
                <div class="info-row"><span>期望主题</span><strong>${s(e.topic||"未填写，可结合时令推荐")}</strong></div>
                <div class="info-row"><span>机构期望日期</span><strong>${s(P(e.requestedDate||e.date,!0))}</strong></div>
                <div class="info-row"><span>活动地址</span><strong>${s(fn(e))}</strong></div>
                <div class="info-row"><span>项目对接人</span><strong>${i?`${s(i.name)} · ${ee(i.phone,i.phone)}`:'<span class="location-pending">尚未接单</span>'}</strong></div>
                ${e.note?`<div class="info-row info-row--block"><span>机构备注</span><strong>${s(e.note)}</strong></div>`:""}
              </div>
              ${e.feedback?`<div class="feedback-card"><span>${e.changeRequest?.type==="confirmed-change"?"已确认方案 · 机构修改申请":e.status==="revision"?"机构修改意见 · 待处理":"机构修改意见"}</span><p>${s(e.feedback)}</p><small>${s(pe(e.feedbackAt))}</small></div>`:""}
            </div>
            ${r?`<div class="review-state-banner is-terminal">
                    ${l("checkCircle",18)}
                    <div>
                      <strong>${e.status==="completed"?"活动已完成归档":"预约已取消"}</strong>
                      <p>终态预约仅供查看，方案、活动地点与内部备注不可再编辑。</p>
                    </div>
                  </div>`:""}
            ${!u&&e.status==="revision"?`<div class="review-state-banner is-revision">
                    ${l("edit",18)}
                    <div>
                      <strong>机构已提出修改，等待本院更新方案</strong>
                      <p>请根据下方“机构修改意见”调整课题、专家、日期、流程或说明。保存后会重新提交给机构确认，并生成新的推送文案。</p>
                    </div>
                  </div>`:""}
            ${u?`<div class="review-state-banner is-success">
                    ${l("send",18)}
                    <div>
                      <strong>方案已提交，推送文案已生成</strong>
                      <p>机构端已进入“方案待确认”。请复制下方号码和推送内容，自行通过短信或邮件发送；复制后会记录为已复制。</p>
                      <button class="text-link" type="button" data-action="review-edit-again">
                        继续修改方案 ${l("chevronRight",12)}
                      </button>
                    </div>
                  </div>`:""}
            ${!i&&!r?`<section class="assignment-card">
                    <span class="assignment-card__eyebrow">下一步 · 接单</span>
                    <h3>确认由你跟进这个项目</h3>
                    <p>当前登录账号 ${s(a.adminUser?.name||"")} 与手机号 ${ee(a.adminUser?.phone||"",a.adminUser?.phone||"")} 将自动成为项目对接人，并带入方案与机构联系人。机构端在接单后才会显示具体项目对接人。</p>
                    <button class="btn btn--primary btn--block" type="button" data-action="review-accept">
                      ${l("user",15)} 确认接单
                    </button>
                  </section>`:`
                  <section class="assignee-panel">
                    <div class="assignee-panel__person">
                      <span>${s(Qe(i.name))}</span>
                      <div><small>项目对接人</small><strong>${s(i.name)}</strong>
                        <p>${ee(i.phone,i.phone)}</p></div>
                    </div>
                    <span class="assignee-panel__locked">${l("lock",11)} 由接单账号自动带入</span>
                  </section>
                `}
            ${c?`<section class="review-form ${h?"is-locked":""}" ${h?"inert":""}>
                    ${p&&!u?`<div class="plan-template-import">
                      <div class="plan-template-import__head">
                        <span>${l("clipboard",14)} 方案模版</span>
                        <small>${_.length} 个可用</small>
                      </div>
                      ${_.length?`<div class="plan-template-import__control">
                              <select data-review-template aria-label="选择方案模版">
                                ${_.map(S=>`<option value="${s(S.id)}">${s(S.name)} · ${s(L(S.serviceType))}</option>`).join("")}
                              </select>
                              <button class="btn btn--primary btn--sm" type="button"
                                data-action="review-import-template">
                                一键导入
                              </button>
                            </div>
                            <p>导入会覆盖当前课题大纲、活动流程、项目组与确认说明。</p>`:"<p>暂无方案模版，可请院方运营在「方案模版」中配置。</p>"}
                    </div>`:""}
                    <div class="form-card">
                      <div class="form-card__head">
                        <h3>${l("clipboard",15)} 活动方案</h3>
                        <span>机构可见</span>
                      </div>
                      <div class="field">
                        <label>活动主题</label>
                        <input type="text" data-review-field="topic" value="${s(o.topic)}">
                      </div>
                      <div class="field-row">
                        <div class="field"><label>服务类型</label>
                          <select data-review-field="serviceType" data-review-service>
                            ${Pe.map(S=>`<option value="${s(S)}" ${o.serviceType===S?"selected":""}>${s(L(S))}</option>`).join("")}
                          </select>
                        </div>
                        <div class="field"><label>出讲专家</label>
                          <select data-review-field="speakerId" data-review-speaker required>
                            <option value="" disabled ${o.speakerId?"":"selected"}>请选择本院出讲专家</option>
                            ${uo(o,e.hospitalId)}
                          </select>
                        </div>
                      </div>
                      <div class="field-row">
                        <div class="field"><label>活动日期</label>
                          <input type="date" data-review-field="date" value="${s(o.date)}"
                            min="${Te()}">
                        </div>
                        <div class="field"><label>活动时长</label>
                          <div class="field-static">${l("clock",14)} 全天（1 天）</div>
                        </div>
                      </div>
                      <div class="location-owned-card">
                        <span>${l("building",14)} 活动地点 · 机构填写</span>
                        <strong>${s(et(o.province,o.city,o.address,o.venue)||"机构尚未补充活动地点")}</strong>
                        <small>省份、详细地址与场地名称由机构在预约时填写；院方保存方案时会自动带入最新地点，不可在此覆盖。</small>
                      </div>
                      <div class="field"><label>课题大纲</label>
                        <textarea data-review-field="outline">${s(o.outline)}</textarea>
                      </div>
                      <div class="field"><label>活动流程</label>
                        <textarea data-review-field="agenda">${s(o.agenda)}</textarea>
                      </div>
                      <div class="field"><label>项目组成员</label>
                        <textarea data-review-field="team" placeholder="如：周老师（项目负责人）、张老师（现场执行）">${s(o.team)}</textarea>
                      </div>
                      <div class="field"><label>给机构的说明</label>
                        <textarea data-review-field="message">${s(o.message)}</textarea>
                      </div>
                      <div class="field">
                        <label>方案附件 PDF / PPT / PPTX <span>选填 · 单个文件不超过 20MB</span></label>
                        <div class="plan-pdf-upload">
                          <label class="btn btn--ghost btn--sm">
                            ${l("clipboard",13)} 上传附件
                            <input type="file"
                              accept=".pdf,.ppt,.pptx,application/pdf,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                              data-review-pdf hidden>
                          </label>
                          ${o.planPdf?`<span>${l("checkCircle",13)} <b>${s(o.planPdf.name)}</b><small>${s(Rt(o.planPdf.size))}</small>${p&&!u?`<button type="button" data-action="open-plan-pdf"
                                  data-appointment-id="${s(e.id)}">查看</button><button type="button" data-action="review-pdf-clear">移除</button>`:""}</span>`:"<small>可上传完整方案、课题提纲或执行手册</small>"}
                        </div>
                      </div>
                    </div>
                    <div class="internal-note">
                      <div class="internal-note__head">
                        <h3>${l("lock",13)} 内部备注</h3>
                        <span>仅院方可见</span>
                      </div>
                      ${a.adminNoteEditing&&p?`<textarea data-internal-note>${s(e.internalNote||"")}</textarea>
                             <div class="internal-note__actions">
                               <button class="btn btn--ghost btn--sm" type="button" data-action="review-note-cancel">取消</button>
                               <button class="btn btn--primary btn--sm" type="button" data-action="review-note-save">保存备注</button>
                             </div>`:`<p>${s(e.internalNote||"暂无内部备注，可记录沟通情况、资源协调或风险点。")}</p>
                             ${p&&!u?`<button class="text-link" type="button" data-action="review-note-edit">${e.internalNote?"编辑备注":"添加备注"} ${l("chevronRight",12)}</button>`:""}`}
                    </div>
                    ${p&&e.status==="confirmed"?`<div class="admin-action-card">
                            <h3>活动执行完成？</h3>
                            <p>机构已确认方案。活动结束后可标记完成，进入历史归档。</p>
                            <button class="btn btn--soft btn--sm" type="button" data-action="review-complete">标记活动完成</button>
                          </div>`:""}
                  </section>`:""}
            ${e.plan?.pdf&&(u||r)?`<button class="plan-pdf-link" type="button" data-action="open-plan-pdf"
                    data-appointment-id="${s(e.id)}">
                    <span class="plan-pdf-link__icon">${l("clipboard",16)}</span>
                    <span class="plan-pdf-link__meta">
                      <strong>方案附件 · ${s(e.plan.pdf.name||"活动方案.pdf")}</strong>
                      <small>${s(Rt(e.plan.pdf.size))} · ${At(e.plan.pdf)==="pdf"?"点击在线预览":"点击查看或下载"}</small>
                    </span>
                    ${l("chevronRight",14)}
                  </button>`:""}
            ${e.plan&&["review","revision","confirmed","completed"].includes(e.status)?`<section class="sms-card ${u?"is-primary":""}">
                    <div class="sms-card__head">
                      <h3>${l("message",14)} 推送通知</h3>
                      <span>${v?"已复制，可粘贴发送":m?"方案已更新，需重新复制":"待复制"}</span>
                    </div>
                    <div class="push-channel">
                      <div class="push-channel__head">
                        <strong>${l("phone",12)} 手机推送</strong>
                        <span>${s(e.phone)}</span>
                      </div>
                      <p>${s(vo(e))}</p>
                      <button class="btn btn--ghost btn--sm" type="button" data-action="review-sms-copy">
                        ${l("phone",13)} 复制号码和推送内容
                      </button>
                    </div>
                    <div class="push-channel push-channel--email">
                      <div class="push-channel__head">
                        <strong>${l("send",12)} 邮件推送</strong>
                        <span>${s(f.recipient||"机构未配置通知邮箱")}</span>
                      </div>
                      <p>${s(`主题：${f.subject}

${f.body}`)}</p>
                      <button class="btn btn--ghost btn--sm" type="button"
                        data-action="review-email-copy" data-appointment-id="${s(e.id)}">
                        ${l("send",13)} 复制邮件内容
                      </button>
                    </div>
                    <p class="push-copy-rule">
                      ${l("checkCircle",12)}
                      复制手机号和短信，或复制邮件内容，任一方式均视为已完成推送复制。
                    </p>
                  </section>`:""}
          </div>
        </div>
        <div class="sheet__footer">
          <button class="btn btn--ghost" type="button" data-action="close-overlay">${u?"返回预约列表":"关闭"}</button>
          ${u?`<button class="btn btn--primary" type="button" data-action="review-edit-again">
                  继续修改方案 ${l("edit",14)}
                </button>`:p?`<button class="btn btn--primary" type="button" data-action="review-save">
                  ${e.status==="revision"?"更新方案并重新提交":e.plan?"保存并重新提交":"保存方案并提交"} ${l("send",14)}
                </button>`:r?"":'<span class="sheet__footer-hint">先确认接单，再填写方案</span>'}
        </div>
      </section>
    `}function ho(e){const t=ye(e.ownerPhone),n=xe(e.ownerPhone),i=Ft(e)||{},o=e.contactName||i.name||t?.name||n?.name||"您好",r=e.contactTitle||i.title||t?.title||n?.title||"",c=e.orgName||i.orgName||t?.orgName||n?.orgName||"";return{name:String(o).trim()||"您好",title:String(r).trim(),orgName:String(c).trim()}}function vo(e){const t=e.plan||{},n=e.assignedStaff,i=k(e.hospitalId),o=["confirmed","completed"].includes(e.status),r=ho(e);return`【${i?.name||"北大医疗"}】${r.orgName?r.orgName+" ":""}${r.name}${r.title?"（"+r.title+"）":""}您好，您预约的${P(t.date||e.date)} ${t.time||""}「${t.topic||Fe(e)}」${o?"活动已确认":"院方已提交活动方案，请登录平台查看并确认"}。地点：${et(e.province||t.province,e.city||t.city,e.address||t.address,e.venue||t.venue)}。项目对接人：${n?n.name+" "+n.phone:"院方项目组"}。请提前安排，如需调整请联系项目对接人。`}function fo(e){const t=ye(e.ownerPhone),n=xe(e.ownerPhone),i=ho(e),o=Ft(e)||{},r=e.email||o.email||t?.email||n?.email||"",c=`【${k(e.hospitalId)?.name||"北大医疗"}】活动方案待确认 · ${Fe(e)}`,p=`${i.name}：

您预约的「${Fe(e)}」活动方案已更新，请登录企业健康服务平台查看并确认。

活动日期：${P(e.plan?.date||e.date,!0)}
活动地点：${fn(e)}
项目对接人：${e.assignedStaff?`${e.assignedStaff.name} ${e.assignedStaff.phone}`:"院方项目组"}

如信息有调整，请在平台提交修改申请或联系项目对接人。

北京大学国际医院 · 名医入企`;return{recipient:r,subject:c,body:p,copyText:`收件人：${r||"机构未配置邮箱"}
主题：${c}

${p}`}}async function rc(e){const t=U(e?.dataset.appointmentId||a.adminReviewId);if(!t)return;if(!ve(t.hospitalId))return d("只能复制本院预约的推送内容。");const n=vo(t),i=`${t.phone}
${n}`;if(!await Na(i))return d("复制失败，请手动复制。");$i(t.id,{copiedAt:new Date().toISOString(),copiedBy:a.adminUser?{name:a.adminUser.name,username:a.adminUser.username}:null,channel:"sms",recipient:t.phone||""}),J("复制推送通知",`${t.id} · ${t.orgName}`,{entityType:"appointment",entityId:t.id,hospitalId:t.hospitalId}),d("号码和推送内容已复制，可粘贴发送给客户。"),a.overlay?.type==="admin-review"?b():g()}async function cc(e){const t=U(e?.dataset.appointmentId||a.adminReviewId);if(!t)return;if(!ve(t.hospitalId))return d("只能复制本院预约的邮件内容。");const n=fo(t);if(!await Na(n.copyText))return d("复制失败，请手动复制。");$i(t.id,{copiedAt:new Date().toISOString(),copiedBy:a.adminUser?{name:a.adminUser.name,username:a.adminUser.username}:null,channel:"email",recipient:n.recipient||""}),J("复制客户邮件",`${t.id} · ${n.recipient||"未配置邮箱"}`,{entityType:"appointment",entityId:t.id,hospitalId:t.hospitalId}),d(n.recipient?"收件人、主题和正文已复制，可打开邮件应用发送。":"邮件内容已复制；机构尚未配置通知邮箱。"),a.overlay?.type==="admin-review"?b():g()}async function Na(e){try{if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0}catch{}try{const t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.select();const n=document.execCommand("copy");return t.remove(),n}catch{return!1}}function lc(e){const t=va(e),n=ra(e);return`
      <article class="admin-record" role="button" tabindex="0" data-action="open-admin-demand"
        data-demand-id="${s(e.id)}">
        <div class="admin-record__top">
          <span class="status-pill ${n.cls}">${s(n.label)}</span>
          <span>${s(pe(e.createdAt))}</span>
        </div>
        <h3>${s(e.topic)}</h3>
        <div class="admin-record__tags">
          <span>${s(L(e.serviceType))}</span>
          <span>${s(t)}</span>
          <span>${s(e.audience||"人群待沟通")}</span>
        </div>
        <div class="admin-record__info">
          <span>${l("building",12)} ${s(e.orgName)}</span>
          <span>${l("phone",12)} ${ee(e.phone,e.phone)}</span>
        </div>
        <div class="admin-record__foot">
          <span>${l("user",12)} ${e.assignedStaff?s(e.assignedStaff.name):"尚未联系"}</span>
          <span>${s(e.id)} ${l("chevronRight",12)}</span>
        </div>
      </article>
    `}function go(e,t="all"){return t==="all"?!0:t==="converted"?e.status==="converted"||e.status==="matched"&&!!e.convertedAppointmentId:t==="matched"?e.status==="matched"&&!e.convertedAppointmentId:e.status===t}function dc(){const e=tn(),t=[["all","全部"],["pending","待联系"],["contacted","已联系"],["matched","已匹配"],["converted","已生成预约"],["cancelled","已取消"],["closed","已关闭"]],n=a.adminDemandFilter==="all"?e:e.filter(o=>go(o,a.adminDemandFilter)),i=e.filter(o=>["matched","converted"].includes(o.status)).length;return`
      <div class="admin-page-head">
        <div><h1>需求池</h1><p>机构提需后电话沟通并协助匹配</p></div>
        <span class="admin-page-head__date">${e.filter(o=>o.status==="pending").length} 条待联系</span>
      </div>
      ${ge()}
      ${qe()}
      <div class="admin-stats admin-stats--three">
        <div class="admin-stat"><small>待联系</small><strong>${e.filter(o=>o.status==="pending").length}</strong><span>需电话跟进</span></div>
        <div class="admin-stat"><small>已联系</small><strong>${e.filter(o=>o.status==="contacted").length}</strong><span>沟通中</span></div>
        <div class="admin-stat"><small>已匹配</small><strong>${i}</strong><span>含已生成预约</span></div>
      </div>
      <div class="filter-scroll filter-scroll--admin">
        ${t.map(([o,r])=>`<button class="chip ${a.adminDemandFilter===o?"is-active":""}" type="button" data-action="admin-demand-filter" data-value="${o}">${r}</button>`).join("")}
      </div>
      <div id="admin-demand-results">${bo(n)}</div>
    `}function bo(e){return e.length?`<div class="admin-record-list">${e.map(lc).join("")}</div>`:`<div class="empty-state"><span class="empty-state__icon">${l("sparkles",26)}</span><h3>暂无提需</h3><p>机构提交提需后会出现在这里。</p></div>`}function pc(){const e=document.getElementById("admin-demand-results");if(!e)return;const t=tn(),n=a.adminDemandFilter==="all"?t:t.filter(i=>go(i,a.adminDemandFilter));e.innerHTML=bo(n),document.querySelectorAll('[data-action="admin-demand-filter"]').forEach(i=>{i.classList.toggle("is-active",i.dataset.value===a.adminDemandFilter)})}function uc(e,t=""){const n=q(e?.serviceType||"讲座");return(e?.targetType==="hospital"?a.hospitals.filter(o=>o.id===e.hospitalId):a.hospitals).map(o=>{const r=a.experts.filter(c=>c.hospitalId===o.id&&c.active!==!1&&j(c,n)&&nt(c,e.province||"",e.city||"")).sort((c,p)=>Ie.indexOf(c.tier)-Ie.indexOf(p.tier)||c.name.localeCompare(p.name,"zh-CN"));return r.length?`<optgroup label="${s(o.name)}">
          ${r.map(c=>`<option value="${s(c.id)}" ${t===c.id?"selected":""}>${s(c.name)} · ${s(c.deptTitle)} · ${s(Ie.includes(c.tier)?Ge[c.tier].short:"")}</option>`).join("")}
        </optgroup>`:""}).join("")}function mc(){const e=le(a.adminDemandId);if(!e)return"";const t=va(e),n=e.targetType==="group",i=ra(e),o=N(M(O(),1)),r=N(M(O(),365)),c=e.matchedDate||(e.preferredDate&&e.preferredDate>=o?e.preferredDate:""),p=!!e.convertedAppointmentId;e.status==="matched"&&e.convertedAppointmentId;const u=["pending","contacted","matched"].includes(e.status)&&!e.convertedAppointmentId;return`
      <div class="sheet-backdrop" data-action="close-overlay"></div>
      <section class="sheet" role="dialog" aria-modal="true" aria-label="需求详情">
        <div class="sheet__grabber"></div>
        <div class="sheet__bar">
          <div><h2>需求详情</h2><p>${s(e.id)}</p></div>
          <button class="sheet__close" type="button" data-action="close-overlay" aria-label="关闭">
            ${l("close",15)}
          </button>
        </div>
        <div class="sheet__body">
          <div class="sheet-pad">
            <div class="record-head">
              <div>
                <span class="record-head__tag">${s(L(e.serviceType))} · ${s(t)}</span>
                <h1>${s(e.topic)}</h1>
                <p>${s(e.audience||"人群待沟通")} · ${s(e.headcount?e.headcount+" 人":"人数待确认")}</p>
              </div>
              <span class="status-pill ${i.cls}">${s(i.label)}</span>
            </div>
            ${n?`<section class="demand-route-note">
                    ${l("shield",15)}
                    <div>
                      <strong>集团企康办 · 超级管理员需求池</strong>
                      <p>该需求仅超级管理员可见，请直接电话联系机构并统筹匹配，不需要分配具体医院运营。</p>
                    </div>
                  </section>`:""}
            <section class="info-card">
              <div class="info-row"><span>机构</span><strong>${s(e.orgName)}</strong></div>
              <div class="info-row"><span>目标机构</span><strong>${s(t)}</strong></div>
              <div class="info-row"><span>联系人</span><strong>${s(e.contactName)} · ${ee(e.phone,e.phone)}</strong></div>
              <div class="info-row"><span>期望日期</span><strong>${s(e.preferredDate?P(e.preferredDate,!0):"待沟通")}</strong></div>
              ${e.matchedDate?`<div class="info-row"><span>院方履约日期</span><strong>${s(P(e.matchedDate,!0))}</strong></div>`:""}
              <div class="info-row"><span>活动地区</span><strong>${s(C(e.province,e.city))}</strong></div>
              <div class="info-row"><span>${n?"集团对接人":"院方对接人"}</span><strong>${vn(e.assignedStaff)}</strong></div>
              ${e.note?`<div class="info-row info-row--block"><span>需求说明</span><strong>${s(e.note)}</strong></div>`:""}
            </section>
            ${u?`<section class="demand-match-card">
                    <h3>${l("experts",14)} 匹配专家</h3>
                    <p>选择已确认可出讲的专家。机构确认预约信息后即可生成预约单，无需重新提交提需。</p>
                    <select data-demand-match-doctor>
                      <option value="">请选择匹配专家</option>
                      ${uc(e,e.matchedExpertId||"")}
                    </select>
                    <div class="field demand-match-date">
                      <label>可履约日期 <em>*</em></label>
                      <input type="date" data-demand-match-date min="${s(o)}" max="${s(r)}" value="${s(c)}" ${p?"disabled":""}>
                      <span class="field-help">${p?"预约已生成，专家与履约日期不可再修改。":e.status==="matched"?"当前安排已同步，机构尚未生成预约；如日期不合适，可修改后点击“更新匹配安排”。":"提需由院方人工协调，可选择公开号源以外的日期；确认后机构端将锁定该日期。"}</span>
                    </div>
                  </section>`:""}
            <section class="followup-card">
              <h3>${l("message",14)} 沟通记录</h3>
              ${e.followUps?.length?e.followUps.map(h=>`<div class="followup-item"><p>${s(h.note)}</p><small>${s(h.by?.name||"院方")} · ${s(pe(h.at))}</small></div>`).join(""):'<p class="muted">暂无沟通记录。建议先电话联系机构确认需求。</p>'}
              ${u?`<textarea data-demand-followup placeholder="记录电话沟通结果、可匹配专家或待确认事项"></textarea>
              <div class="followup-card__actions ${e.status==="pending"?"":"is-contacted"}">
                <button class="btn ${e.status==="pending"?"btn--primary":"btn--ghost"} btn--sm" type="button" data-action="admin-demand-followup">${e.status==="pending"?"保存并标记已联系":"保存沟通记录"}</button>
                <button class="btn ${e.status==="pending"?"btn--ghost":"btn--primary"} btn--sm" type="button" data-action="admin-demand-match">${e.status==="matched"?"更新匹配安排":"标记已匹配"}</button>
              </div>`:'<p class="muted">需求已结束，沟通记录仅供查看。</p>'}
            </section>
            ${["pending","contacted","matched"].includes(e.status)&&!e.convertedAppointmentId?`<button class="text-link text-link--danger record-cancel" type="button"
                    data-action="admin-demand-close">关闭该需求</button>`:""}
          </div>
        </div>
        <div class="sheet__footer">
          <a class="btn btn--primary" href="${s(Ot(e.phone))}">${l("phone",14)} 联系机构</a>
        </div>
      </section>
    `}function yo(e=""){const t=le(a.adminDemandId);if(!t||!a.adminUser)return;if(!fa(t))return d(t.targetType==="group"?"集团企康办需求仅超级管理员可跟进。":"只能跟进本院需求。");if(t.convertedAppointmentId)return d("该提需已生成预约，不能再修改沟通状态。");if(!["pending","contacted","matched"].includes(t.status))return d("该需求已结束，只能查看沟通记录。");const n=(t.followUps||[]).slice();e&&n.push({note:e,at:new Date().toISOString(),by:{name:a.adminUser.name,username:a.adminUser.username}});const i=t.status==="pending";ft(t.id,{status:i?"contacted":t.status,assignedStaff:t.assignedStaff||wn(a.adminUser),contactedAt:t.contactedAt||new Date().toISOString(),followUps:n}),J(e?"记录提需沟通":"标记提需已联系",`${t.id} · ${t.topic}`,{entityType:"demand",entityId:t.id,hospitalId:t.hospitalId}),b(),d(i?"已标记为已联系，请继续匹配资源。":e?"沟通记录已保存。":"已保存沟通记录。")}function hc(){const e=le(a.adminDemandId);if(!e)return;if(!fa(e))return d(e.targetType==="group"?"集团企康办需求仅超级管理员可跟进。":"只能跟进本院需求。");if(e.status==="pending")return d("请先保存沟通记录并标记「已联系」，再标记已匹配。");if(["converted","closed","cancelled"].includes(e.status))return d("该需求已结束，不能再标记为已匹配。");if(e.convertedAppointmentId)return d("预约已生成，不能再修改匹配专家或履约日期。");const t=String(V.querySelector("[data-demand-match-doctor]")?.value||"");if(!t)return d("请选择一位已确认可出讲的匹配专家。");const n=String(V.querySelector("[data-demand-match-date]")?.value||""),i=N(M(O(),1)),o=N(M(O(),365));if(!n||n<i)return d("请确认明天及以后的可履约日期。");if(n>o)return d("可履约日期请在一年内选择。");const r=D(t);if(!r||r.active===!1)return d("所选专家已失效，请重新选择。");if(!j(r,e.serviceType))return d(`${r.name} 不提供「${L(e.serviceType)}」服务，请更换专家。`);if(!nt(r,e.province||"",e.city||""))return d(`${r.name} 的履约地不覆盖 ${C(e.province,e.city)}，请更换专家。`);if(e.targetType==="hospital"&&e.hospitalId!==r.hospitalId)return d("匹配专家必须属于机构指定的目标医院。");const c=k(r.hospitalId);if(!c)return d("匹配专家所属医院不存在，请重新选择。");if(re().find(m=>m.doctorId===r.id&&m.date===n&&m.status!=="cancelled"))return d(`${r.name} 在 ${P(n,!0)} 已有其他活动安排，请更换协调日期。`);if(Ae().find(m=>m.id!==e.id&&m.status==="matched"&&!m.convertedAppointmentId&&String(m.matchedExpertId||"")===String(r.id)&&m.matchedDate===n))return d(`${r.name} 在 ${P(n,!0)} 已被另一条提需占用，请更换专家或日期。`);const h=e.status==="matched";ft(e.id,{status:"matched",matchedExpertId:r.id,matchedExpertName:r.name,matchedHospitalId:r.hospitalId,matchedDate:n,matchedAt:new Date().toISOString(),assignedStaff:e.assignedStaff||wn(a.adminUser),matchNote:`已匹配 ${r.name} · ${c.name} · ${P(n,!0)}`}),J("提需匹配专家",`${e.id} · ${e.topic} · ${r.name} / ${c.name}`,{entityType:"demand",entityId:e.id,hospitalId:e.hospitalId}),b(),d(h?`匹配安排已更新为 ${r.name} · ${P(n,!0)}。`:`已匹配 ${r.name} · ${P(n,!0)}，机构确认信息后即可生成预约单。`)}function vc(){const e=le(a.adminDemandId);if(e){if(!fa(e))return d(e.targetType==="group"?"集团企康办需求仅超级管理员可跟进。":"只能跟进本院需求。");if(e.convertedAppointmentId)return d("该提需已生成预约，不能关闭；请在预约单中取消或完成。");if(e.status==="converted"||e.status==="cancelled"||e.status==="closed")return d("该需求已结束。");ft(e.id,{status:"closed",closedAt:new Date().toISOString()}),J("关闭机构提需",`${e.id} · ${e.topic}`,{entityType:"demand",entityId:e.id,hospitalId:e.hospitalId}),b(),d("需求已关闭。")}}function Ve(){return $e()}function Ca(){const e=Ve();return e?a.experts.filter(t=>!(t.active===!1||t.hospitalId!==e.id)).sort((t,n)=>Ie.indexOf(t.tier)-Ie.indexOf(n.tier)||t.name.localeCompare(n.name,"zh-CN")):[]}function fc(){const e=Ca();if(!e.length)return null;e.some(o=>o.id===a.slotDoctorId)||(a.slotDoctorId=e[0].id);const t=e.find(o=>o.id===a.slotDoctorId)||e[0];if(a.slotMonthDoctor!==t.id){const o=Math.max(1,Number(t.leadDays)||Y(t).leadDays),r=N(M(O(),o)),c=Object.keys(vt(t.id)).filter(p=>p>=r&&Number(vt(t.id)[p])>0).sort()[0];a.slotMonth=(c||r).slice(0,7),a.slotMonthDoctor=t.id}a.slotDraft||(a.slotDraft={});const n=a.slotBatch||{},i=Math.max(1,Number(t.leadDays)||Y(t).leadDays);return n.from||(n.from=N(M(O(),i))),n.to||(n.to=N(M(O(),i+30))),a.slotBatch=n,t}function lt(){return a.experts.find(e=>e.id===a.slotDoctorId)||null}function $o(e,t){return Number(vt(e)[t]||0)}function Sn(e,t){const n=a.slotDraft?.[e]?.[t];return n===void 0?$o(e,t):Number(n)}function In(e,t,n){const i=Math.max(0,Math.min(30,Number(n)||0));a.slotDraft||(a.slotDraft={}),a.slotDraft[e]||(a.slotDraft[e]={}),a.slotDraft[e][t]=i}function ko(){let e=0;return Object.entries(a.slotDraft||{}).forEach(([t,n])=>{Object.entries(n).forEach(([i,o])=>{Number(o)!==$o(t,i)&&(e+=1)})}),e}function gc(e){const[t,n]=a.slotMonth.split("-").map(Number),i=new Date(t,n-1+e,1,12);a.slotMonth=`${i.getFullYear()}-${se(i.getMonth()+1)}`,Ke()}function bc(){const[e,t]=a.slotMonth.split("-").map(Number);return`
      <div class="slot-month-nav">
        <button class="icon-button" type="button" data-action="slot-month" data-value="-1" aria-label="上个月">${l("chevronLeft",16)}</button>
        <strong>${e} 年 ${t} 月</strong>
        <button class="icon-button" type="button" data-action="slot-month" data-value="1" aria-label="下个月">${l("chevronRight",16)}</button>
      </div>
    `}function yc(e){const t=Ca();return`
      <section class="slot-doctor-rail">
        <div class="slot-doctor-rail__head">
          <h3>${l("users",15)} 专家排班</h3>
          <span>${t.length} 位专家 · 点击快速切换</span>
        </div>
        <div class="slot-doctor-rail__scroller">
          ${t.map(n=>{const i=z(n);return`
                <button class="slot-doctor-chip ${n.id===e.id?"is-active":""}" type="button" data-action="slot-doctor-pick" data-doctor-id="${s(n.id)}">
                  <img src="${s(ke(n))}" alt="${s(n.name)}" loading="lazy">
                  <span>
                    <strong>${s(n.name)}</strong>
                    <small>${s(Y(n).short)} · ${i.dates.length} 个可约日</small>
                  </span>
                  <i>${n.id===e.id?l("check",11):l("chevronRight",11)}</i>
                </button>
              `}).join("")}
        </div>
      </section>
    `}function $c(e){const[t,n]=a.slotMonth.split("-").map(Number),i=new Date(t,n-1,1,12),o=new Date(t,n,0,12).getDate(),r=i.getDay(),c=Te(),p=N(M(O(),Math.max(1,Number(e.leadDays)||Y(e).leadDays))),u=vt(e.id),h=a.slotDraft?.[e.id]||{},m=mi(e.id),v=hi(e.id),f=vi(e.id),_=[];for(let S=0;S<r;S+=1)_.push('<span class="slot-cell is-blank"></span>');for(let S=1;S<=o;S+=1){const $=`${t}-${se(n)}-${se(S)}`,I=Number(u[$]||0),W=h[$]===void 0?I:Number(h[$]||0),A=m[$]||0,Z=v.has($),be=!Z&&f.has($),Ct=$<c,x=$<p,Xe=W!==I;_.push(`
        <button class="slot-cell ${W?"has-capacity":"is-off"} ${$===c?"is-today":""} ${Ct?"is-past":""} ${x?"is-lead":""} ${Xe?"is-changed":""} ${Z?"is-manual":""} ${be?"is-reserved":""}" type="button"
          data-action="slot-day-open" data-value="${$}" ${Ct||x?"disabled":""}>
          <span class="slot-cell__day">${S}</span>
          <strong>${W||"—"}</strong>
          <small>${x?"未到预约期":Z?"人工占用":be?"提需预留":A?`已约 ${A}`:"可约"}</small>
        </button>
      `)}return`
      <div class="slot-calendar">
        <div class="slot-weekdays">${["日","一","二","三","四","五","六"].map(S=>`<span>${S}</span>`).join("")}</div>
        <div class="slot-grid">${_.join("")}</div>
      </div>
      <p class="slot-legend"><i class="is-open"></i> 可配置 <i class="is-full"></i> 已有预约 <i class="is-manual"></i> 人工占用 <i class="is-reserved"></i> 提需预留 <i class="is-changed"></i> 本次修改 <i class="is-lead"></i> 未到预约周期</p>
    `}function kc(e){const t=a.slotBatch,n=t.scope==="hospital"?"本院全部专家":`当前专家 · ${e.name}`,i=t.weekdays.length?t.weekdays.slice().sort((o,r)=>o-r).map(o=>["日","一","二","三","四","五","六"][o]).join("、"):"未选择";return`
      <section class="batch-card slot-batch-card">
        <div class="batch-card__head">
          <h3>${l("sparkles",15)} 批量设置可约日</h3>
          <span>先加入草稿，最后在页面底部统一保存</span>
        </div>
        <div class="slot-batch-steps">
          <span><i>1</i>选专家</span>
          <span><i>2</i>填范围</span>
          <span><i>3</i>点日期微调</span>
          <span><i>4</i>统一保存</span>
        </div>
        <div class="field">
          <label>快捷范围 <span>只调整日期，不会立即保存</span></label>
          <div class="batch-card__presets slot-range-presets">
            <button type="button" data-action="slot-preset" data-value="7">未来 7 天</button>
            <button type="button" data-action="slot-preset" data-value="14">未来 14 天</button>
            <button type="button" data-action="slot-preset" data-value="30">未来 30 天</button>
          </div>
        </div>
        <div class="field-row">
          <div class="field"><label>开始日期</label>
            <input type="date" data-slot-batch="from" value="${s(t.from)}">
          </div>
          <div class="field"><label>结束日期</label>
            <input type="date" data-slot-batch="to" value="${s(t.to)}">
          </div>
        </div>
        <div class="field">
          <label>每周可约日</label>
          <div class="weekday-chips">
            ${["日","一","二","三","四","五","六"].map((o,r)=>`<button class="${t.weekdays.includes(r)?"is-active":""}" type="button"
                    data-action="slot-weekday" data-value="${r}">${o}</button>`).join("")}
          </div>
        </div>
        <div class="field-row">
          <div class="field"><label>每日号源</label>
            <input type="number" inputmode="numeric" min="0" max="30" data-slot-batch="capacity" value="${s(t.capacity)}">
          </div>
          <div class="field"><label>设置给谁</label>
            <select data-slot-batch="scope">
              <option value="one" ${t.scope==="one"?"selected":""}>当前专家</option>
              <option value="hospital" ${t.scope==="hospital"?"selected":""}>本院全部专家</option>
            </select>
          </div>
        </div>
        <div class="slot-batch-summary">
          ${l("alert",13)}
          <span>${s(n)} · 每周 ${s(i)} · 每日 ${s(t.capacity)} 个 · ${s(t.from||"未选")} 至 ${s(t.to||"未选")}</span>
        </div>
        <button class="btn btn--soft btn--block" type="button" data-action="slot-batch-apply">
          ${l("plus",14)} 加入待保存
        </button>
        <p class="batch-card__hint">号源数不会低于已预约人数；早于专家提前预约周期的日期会自动跳过。批量加入后仍可点日历中的某一天单独微调。</p>
      </section>
    `}function wo(){const e=a.slotBatch,t=lt();if(!e)return;const n=document.querySelector('[data-slot-batch="from"]'),i=document.querySelector('[data-slot-batch="to"]');n&&(n.value=e.from||""),i&&(i.value=e.to||"");const o=document.querySelector(".slot-batch-summary span");if(!o)return;const r=e.scope==="hospital"?"本院全部专家":`当前专家 · ${t?.name||""}`,c=e.weekdays.length?e.weekdays.slice().sort((p,u)=>p-u).map(p=>["日","一","二","三","四","五","六"][p]).join("、"):"未选择";o.textContent=`${r} · 每周 ${c} · 每日 ${e.capacity} 个 · ${e.from||"未选"} 至 ${e.to||"未选"}`}function Ke(){const e=fc(),t=document.getElementById("slot-content");if(t){if(!e){t.innerHTML=`<div class="empty-state"><span class="empty-state__icon">${l("clock",26)}</span><h3>暂无专家</h3><p>请先在“专家”中新增本院专家。</p></div>`;return}t.innerHTML=`
      ${yc(e)}
      <div class="slot-doctor-card">
        <img src="${s(ke(e))}" alt="${s(e.name)}">
        <div>
          <strong>${s(e.name)} · ${s(Y(e).short)}</strong>
          <span><strong class="hospital-name">${s(e.hospital)}</strong> · ${s(e.deptTitle)}</span>
          <small>${s(e.leadLabel)} · 按整天配置，不区分时段</small>
        </div>
        <select data-slot-doctor>
          ${Ca().map(n=>`<option value="${s(n.id)}" ${n.id===e.id?"selected":""}>${s(n.name)} · ${s(n.deptTitle)}</option>`).join("")}
        </select>
      </div>
      ${kc(e)}
      ${bc()}
      ${$c(e)}
    `,wc()}}function wc(){const e=document.getElementById("slot-savebar");if(!e)return;const t=ko();e.innerHTML=`
      <span>${t?`${t} 处修改未保存`:"暂无修改"}</span>
      <div>
        <button class="btn btn--ghost btn--sm" type="button" data-action="slot-reset" ${t?"":"disabled"}>重置</button>
        <button class="btn btn--primary btn--sm" type="button" data-action="slot-save" ${t?"":"disabled"}>统一保存</button>
      </div>
    `}function _c(){const e=Ve();return`
      <div class="admin-page-head">
        <div><h1>号源配置</h1><p>按天配置，不划分时间段</p></div>
        <span class="admin-page-head__date">${s(e?.name||"未选择医院")}</span>
      </div>
      ${ge()}
      ${qe()}
      ${e?`<div id="slot-content" class="slot-content"></div>
             <div id="slot-savebar" class="slot-savebar"></div>`:`<div class="empty-state"><span class="empty-state__icon">${l("building",26)}</span><h3>请选择医院</h3><p>超级管理员需先选择医院，再维护该院专家的可预约号源。</p></div>`}
    `}function Sc(e){const t=lt();if(!t)return;const n=N(M(O(),Math.max(1,Number(t.leadDays)||Y(t).leadDays)));if(e<n)return d(`${t.name} ${Le(e)} 尚未进入可预约周期，不能配置号源。`);a.slotDay=e,a.overlay={type:"slot-day",doctorId:t.id,date:e},b()}function Ic(){const e=D(a.overlay?.doctorId)||lt(),t=a.overlay?.date||a.slotDay;if(!e||!t)return"";const n=Sn(e.id,t),i=ot(e.id,t);return`
      <div class="sheet-backdrop" data-action="close-overlay"></div>
      <section class="sheet slot-day-sheet" role="dialog" aria-modal="true" aria-label="设置当日号源">
        <div class="sheet__grabber"></div>
        <div class="sheet__bar">
          <div><h2>${s(P(t,!0))}</h2><p>${s(e.name)} · 按天设置</p></div>
          <button class="sheet__close" type="button" data-action="close-overlay" aria-label="关闭">
            ${l("close",15)}
          </button>
        </div>
        <div class="sheet__body">
          <div class="sheet-pad">
            <div class="slot-day-card">
              <span>当日号源数</span>
              <div class="slot-stepper">
                <button type="button" data-action="slot-day-step" data-value="-1" ${n<=0?"disabled":""}>${l("minus",18)}</button>
                <strong>${n}</strong>
                <button type="button" data-action="slot-day-step" data-value="1">${l("plus",18)}</button>
              </div>
              <p>已预约 <b>${i}</b> 人，号源数不能低于已预约数量。</p>
            </div>
            <div class="slot-day-presets">
              ${[0,1,2,3,4].map(o=>`<button class="${n===o?"is-active":""}" type="button"
                      data-action="slot-day-set" data-value="${o}">${o===0?"停诊":o+" 个"}</button>`).join("")}
            </div>
            ${n<i?`<p class="slot-warning">${l("alert",13)} 当日已有 ${i} 个预约，号源数不能低于 ${i}。</p>`:""}
          </div>
        </div>
        <div class="sheet__footer">
          <button class="btn btn--ghost" type="button" data-action="close-overlay">取消</button>
          <button class="btn btn--primary" type="button" data-action="slot-day-save" ${n<i?"disabled":""}>加入草稿</button>
        </div>
      </section>
    `}function Dc(e){const t=D(a.overlay?.doctorId),n=a.overlay?.date;if(!t||!n)return;const i=ot(t.id,n),o=Math.max(i,Math.max(0,Sn(t.id,n)+Number(e)));In(t.id,n,o),b()}function Tc({save:e=!1}={}){const t=lt(),n=a.slotBatch;if(!t||!n)return;if(!n.from||!n.to||n.from>n.to)return d("请选择正确的日期范围。");if(!n.weekdays.length)return d("请至少选择一个星期。");const i=Math.max(0,Math.min(30,Number(n.capacity)||0)),o=n.scope==="hospital"?Ca():a.experts.filter(m=>m.id===t.id);let r=0,c=0,p=0;o.forEach(m=>{const v=N(M(O(),Math.max(1,Number(m.leadDays)||Y(m).leadDays)));let f=he(n.from);const _=he(n.to);for(;f&&_&&f<=_;){if(n.weekdays.includes(f.getDay())){const S=N(f);if(S<v){p+=1,f=M(f,1);continue}const $=ot(m.id,S),I=Math.max(i,$);I!==i&&(c+=1),In(m.id,S,I),r+=1}f=M(f,1)}});const u=a.slotMonth;r&&/^\d{4}-\d{2}/.test(n.from)&&(a.slotMonth=n.from.slice(0,7));const h=r&&a.slotMonth!==u?`，已定位到 ${Number(a.slotMonth.slice(5))} 月`:"";e?(_o(),d(`已快速保存：${o.length} 位专家、${r} 个日期${c?`，${c} 天因已有预约自动抬高`:""}${p?`，跳过 ${p} 个早于预约周期的日期`:""}${h}。`)):(Ke(),d(`已应用到草稿：${r} 个日期${c?`，${c} 天因已有预约自动抬高`:""}${p?`，跳过 ${p} 个早于预约周期的日期`:""}${h}。`))}function _o(){const e=Object.entries(a.slotDraft||{});let t="";if(e.forEach(([i,o])=>{Object.entries(o).forEach(([r,c])=>{const p=ot(i,r);Number(c)<p&&(t=`${D(i)?.name||"专家"} ${Le(r)} 已约 ${p} 人，号源不能设为 ${c}。`)})}),t)return d(t);const n=ci();e.forEach(([i,o])=>{n[i]=n[i]||{},Object.entries(o).forEach(([r,c])=>{n[i][r]=Number(c)})}),li(n),a.slotDraft={},Ke(),J("统一保存专家号源",`${e.length} 位专家 · ${e.reduce((i,[,o])=>i+Object.keys(o).length,0)} 个日期`,{entityType:"slot",entityId:Ve()?.id||"",hospitalId:Ve()?.id||""}),d("号源已统一保存。")}function xc(){a.slotDraft={},Ke(),d("未保存的修改已重置。")}function Ac(){return a.hospitals.flatMap(e=>[{id:`tpl-${e.id}-lecture`,hospitalId:e.id,name:"标准讲座方案",serviceType:"讲座",topic:"",outline:`1. 企业人群健康风险概览
2. 专家主题分享
3. 常见问题与误区
4. 现场问答与健康咨询`,agenda:`09:00-09:20 签到与开场
09:20-10:20 专家主题分享
10:20-10:50 现场问答
10:50-11:30 健康咨询`,team:"院方项目负责人、现场执行",message:"院方已完成专家与课题匹配，请确认活动日期、地点与流程。如人数或场地有变化，请提前联系项目对接人。",createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()},{id:`tpl-${e.id}-consult`,hospitalId:e.id,name:"企业健康咨询",serviceType:"健康咨询",topic:"",outline:`1. 健康风险筛查
2. 分组一对一咨询
3. 重点人群健康建议
4. 现场问题汇总`,agenda:`09:00-09:20 场地准备与签到
09:20-11:30 分组健康咨询
11:30-12:00 汇总答疑`,team:"院方项目负责人、现场执行",message:"院方已完成咨询专家与现场安排，请确认活动日期、场地与人员组织方式。如需调整，请提前联系项目对接人。",createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()}])}function Pa(){const e=R(y.planTemplates,null);if(Array.isArray(e))return e;const t=Ac();return T(y.planTemplates,t),t}function So(e){T(y.planTemplates,e)}function La(e){return e?Pa().filter(t=>t.hospitalId===e).sort((t,n)=>String(n.updatedAt||"").localeCompare(String(t.updatedAt||""))):[]}function Dn(){return w()?a.adminHospitalId?k(a.adminHospitalId):null:$e()}function Mc(e="讲座"){return Pe.map(t=>`<option value="${s(t)}" ${t===e?"selected":""}>${s(L(t))}</option>`).join("")}function Io(e=""){const t=Dn();if(!t)return d("请先选择医院。");const n=e?La(t.id).find(i=>i.id===e):null;a.adminTemplateDraft=n?Je(n):{id:"",hospitalId:t.id,name:"",serviceType:"讲座",topic:"",outline:"",agenda:"",team:"",message:""},a.overlay={type:"admin-template"},b()}function Nc(){const e=Dn();if(!e)return`
        <div class="admin-page-head">
          <div><h1>方案模版</h1><p>维护院方标准活动方案内容</p></div>
        </div>
        ${ge()}
        ${qe()}
        <div class="empty-state"><span class="empty-state__icon">${l("building",26)}</span><h3>请选择医院</h3><p>超级管理员需先选择医院，再维护该院方案模版。</p></div>
      `;const t=La(e.id);return`
      <div class="admin-page-head">
        <div><h1>方案模版</h1><p>${s(e.short)} · 标准内容可一键导入</p></div>
        <button class="btn btn--primary btn--sm" type="button" data-action="admin-template-add">
          ${l("plus",14)} 新增模版
        </button>
      </div>
      ${ge()}
      ${qe()}
      <p class="admin-hint">${l("clipboard",12)} 模版保存活动主题、服务类型、课题大纲、流程、项目组与确认说明；具体日期、地点和项目对接人按每场预约自动带入，场地与详细地址由机构填写。</p>
      <div class="plan-template-list">
        ${t.length?t.map(n=>`
                    <article class="plan-template-card">
                      <div class="plan-template-card__top">
                        <span>${s(L(n.serviceType))}</span>
                        <strong>${s(n.name)}</strong>
                        <small>更新于 ${s(pe(n.updatedAt))}</small>
                      </div>
                      ${n.topic?`<p class="plan-template-card__topic">${l("sparkles",12)} ${s(n.topic)}</p>`:""}
                      <p class="plan-template-card__preview">${s(On(n.outline||n.agenda||n.message,110))}</p>
                      <div class="plan-template-card__meta">
                        <span>${l("users",11)} ${s(n.team||"未设置项目组")}</span>
                      </div>
                      <div class="plan-template-card__actions">
                        <button class="btn btn--ghost btn--sm" type="button"
                          data-action="admin-template-edit" data-template-id="${s(n.id)}">
                          ${l("edit",12)} 编辑
                        </button>
                        <button class="text-link text-link--danger" type="button"
                          data-action="admin-template-delete" data-template-id="${s(n.id)}">删除</button>
                      </div>
                    </article>
                  `).join(""):`<div class="empty-state"><span class="empty-state__icon">${l("clipboard",26)}</span><h3>暂未配置方案模版</h3><p>新增后，运营人员在处理预约时可一键导入。</p></div>`}
      </div>
    `}function Cc(){const e=a.adminTemplateDraft,t=e?.hospitalId?k(e.hospitalId):Dn();return!e||!t?"":`
      <div class="sheet-backdrop" data-action="close-overlay"></div>
      <section class="sheet plan-template-sheet" role="dialog" aria-modal="true" aria-label="方案模版">
        <div class="sheet__grabber"></div>
        <div class="sheet__bar">
          <div><h2>${e.id?"编辑方案模版":"新增方案模版"}</h2><p>${s(t.name)}</p></div>
          <button class="sheet__close" type="button" data-action="close-overlay" aria-label="关闭">
            ${l("close",15)}
          </button>
        </div>
        <div class="sheet__body">
          <div class="sheet-pad">
            <div class="template-form-note">${l("clock",13)} 活动时长统一按 1 天安排；模版不保存具体日期、地点与项目对接人，场地和详细地址由机构填写。</div>
            <div class="field-row">
              <div class="field"><label>模版名称 <em>*</em></label>
                <input type="text" data-template-field="name" value="${s(e.name||"")}" placeholder="如：标准讲座方案">
              </div>
              <div class="field"><label>服务类型</label>
                <select data-template-field="serviceType">${Mc(e.serviceType)}</select>
              </div>
            </div>
            <div class="field"><label>默认活动主题 <span>可留空，导入后再按预约填写</span></label>
              <input type="text" data-template-field="topic" value="${s(e.topic||"")}" placeholder="如：企业人群心血管健康管理">
            </div>
            <div class="field"><label>课题大纲</label>
              <textarea class="textarea--tall" data-template-field="outline" placeholder="填写课题章节、重点内容与现场安排">${s(e.outline||"")}</textarea>
            </div>
            <div class="field"><label>活动流程</label>
              <textarea class="textarea--tall" data-template-field="agenda" placeholder="填写签到、分享、问答、咨询等流程">${s(e.agenda||"")}</textarea>
            </div>
            <div class="field"><label>项目组成员</label>
              <input type="text" data-template-field="team" value="${s(e.team||"")}" placeholder="如：院方项目负责人、现场执行">
            </div>
            <div class="field"><label>发给机构的确认说明</label>
              <textarea data-template-field="message" placeholder="填写需要机构确认的时间、场地、人数与注意事项">${s(e.message||"")}</textarea>
            </div>
          </div>
        </div>
        <div class="sheet__footer">
          <button class="btn btn--ghost" type="button" data-action="close-overlay">取消</button>
          <button class="btn btn--primary" type="button" data-action="admin-template-save">
            保存模版 ${l("check",14)}
          </button>
        </div>
      </section>
    `}function Pc(){const e={};return document.querySelectorAll("[data-template-field]").forEach(t=>{e[t.dataset.templateField]=t.value.trim()}),e}function Lc(){const e=a.adminTemplateDraft;if(!e)return;if(!ve(e.hospitalId))return d("只能维护本院方案模版。");const t=Pc();if(!t.name)return d("请填写模版名称。");if(!t.outline&&!t.agenda&&!t.message)return d("请至少填写课题大纲、活动流程或确认说明中的一项。");const n=new Date().toISOString(),i=Pa(),o={...e,...t,hospitalId:e.hospitalId,updatedAt:n},r=!o.id;if(o.id){const c=i.findIndex(p=>p.id===o.id);c>=0?i[c]=o:i.push(o)}else o.id=`tpl-custom-${Date.now()}`,o.createdAt=n,i.push(o);So(i),F(),ue(),g(),d(r?"方案模版已新增。":"方案模版已保存。")}function Ec(e){const t=Pa().find(n=>n.id===e);if(t){if(!ve(t.hospitalId))return d("只能删除本院方案模版。");window.confirm(`确定删除「${t.name}」吗？`)&&(So(Pa().filter(n=>n.id!==e)),g(),d("方案模版已删除。"))}}function Rc(e){const t=U(a.adminReviewId);if(!t||!a.adminDraft)return;const n=La(t.hospitalId).find(p=>p.id===e);if(!n)return d("请选择要导入的方案模版。");const i={...a.adminDraft,...mo()},o=n.serviceType||i.serviceType,r=i.speakerId?D(i.speakerId):null,c=r&&j(r,o);a.adminDraft={...i,topic:n.topic||i.topic,serviceType:o,speakerId:c?i.speakerId:"",speaker:c?`${r.name} · ${r.deptTitle}`:"",outline:n.outline||"",agenda:n.agenda||"",team:n.team||"",message:n.message||""},b(),d(`已导入「${n.name}」，可继续修改。`)}function Dt(){return w()?a.adminHospitalId?k(a.adminHospitalId):null:$e()}function Oc(){const e=Dt();return`
      <div class="admin-page-head">
        <div><h1>时令主题</h1><p>按月配置课题、主讲专家与课题履约地</p></div>
      </div>
      ${ge()}
      ${qe()}
      ${e?`
            <p class="admin-hint">${l("leaf",12)} ${s(e.name)} 的 12 个月主题独立生效；机构端仅展示当前城市落在课题履约地内的主题。</p>
            <div class="admin-theme-grid">
              ${ya(e.id).map(t=>`
                    <button class="admin-theme-card" type="button" data-action="open-admin-theme"
                      data-month="${t.month}">
                      <span class="admin-theme-card__media">
                        <img src="${s(t.image)}" alt="${t.month}月时令主题" loading="lazy"
                          decoding="async">
                        <i>${t.month}月</i>
                      </span>
                      <span class="admin-theme-card__body">
                        <strong>${s(ga(t.season))}</strong>
                        <small>${s(t.focus)}</small>
                        <span>
                          <em>${(t.expertIds||[]).length} 位专家</em>
                          <em>${s(ns(t,e.id))}</em>
                        </span>
                      </span>
                      ${l("chevronRight",15)}
                    </button>
                  `).join("")}
            </div>
          `:`<div class="empty-state"><span class="empty-state__icon">${l("building",26)}</span><h3>请选择医院</h3><p>超级管理员需先选择要配置的医院，再进入时令主题。</p></div>`}
    `}function Hc(e){const t=Dt();if(!t)return d("请先选择医院。");const n=ne(t.id,Number(e));if(!n)return;a.adminThemeMonth=Number(e),a.adminThemeDraft=Je(n);const i=a.adminThemeDraft;i.expertIds=[...new Set(i.expertIds||[])],i.topics=(i.topics||[]).map(o=>{const r=ut(o,i,t.id),c=Vt(r.cities,t.province),p=r.cities.find(u=>u!=="全国"&&(a.chinaCities?.[c]||[]).includes(u));return{...o,coverageCities:r.cities,coverage:r.cities.length?te(r.cities):o.coverage||"",coverageProvince:c,coverageCity:p||a.chinaCities?.[c]?.[0]||c}}),a.overlay={type:"admin-theme"},b()}function Tn(e){const t=a.adminThemeDraft?.topics?.[Number(e)];if(!t)return;const n=document.getElementById(`theme-topic-coverage-chips-${e}`);n&&(n.innerHTML=wa(t.coverageCities||[],"theme-topic-coverage-remove")||"<small>尚未选择课题履约地</small>",n.dataset.index=String(e));const i=document.querySelector(`[data-action="theme-topic-coverage-national"][data-index="${e}"]`);i&&(i.classList.toggle("is-active",!!t.coverageCities?.includes("全国")),i.setAttribute("aria-pressed",t.coverageCities?.includes("全国")?"true":"false"))}function Bc(){const e=Dt(),t=a.adminThemeDraft;if(!e||!t)return"";const n=[...new Map(a.experts.filter(i=>i.hospitalId===e.id&&i.active!==!1&&j(i,"讲座")).map(i=>[String(i.id),i])).values()].sort((i,o)=>Ce.indexOf(i.tier)-Ce.indexOf(o.tier)||i.name.localeCompare(o.name,"zh-CN"));return`
      <div class="sheet-backdrop" data-action="close-overlay"></div>
      <section class="sheet theme-editor-sheet" role="dialog" aria-modal="true" aria-label="时令主题配置">
        <div class="sheet__grabber"></div>
        <div class="sheet__bar">
          <div><h2>${t.month}月 · 时令主题</h2><p>${s(e.name)}</p></div>
          <button class="sheet__close" type="button" data-action="close-overlay" aria-label="关闭">
            ${l("close",15)}
          </button>
        </div>
        <div class="sheet__body">
          <div class="sheet-pad">
            <div class="theme-editor-cover">
              <img src="${s(t.image||ba(t.month))}" alt="${t.month}月主题封面">
              <div><strong>${t.month}月时令主题</strong><small>月封面由系统统一维护，内容可配置</small></div>
            </div>
            <div class="field-row">
              <div class="field"><label>时令名称</label>
                <input type="text" data-theme-field="season" value="${s(t.season||"")}">
              </div>
              <div class="field"><label>关注重点</label>
                <input type="text" data-theme-field="focus" value="${s(t.focus||"")}">
              </div>
            </div>
            <div class="field"><label>主题介绍</label>
              <textarea class="textarea--tall" data-theme-field="intro" placeholder="填写主题介绍、活动价值与讲座方向">${s(t.intro||"")}</textarea>
            </div>
            <div class="field-row">
              <div class="field"><label>本月关注疾病</label>
                <textarea data-theme-field="diseases">${s(t.diseases||"")}</textarea>
              </div>
              <div class="field"><label>适合行业</label>
                <textarea data-theme-field="industries">${s(t.industries||"")}</textarea>
              </div>
            </div>
            <div class="field">
              <label>讲座课题与履约配置 <span>课题、主讲专家、履约地按课题独立保存</span></label>
              <div class="theme-topic-editor">
                ${(t.topics||[]).map((i,o)=>`
                      <div class="theme-topic-edit" data-topic-index="${o}">
                        <div class="theme-topic-edit__top">
                          <span>课题 ${o+1}</span>
                          <button type="button" data-action="theme-topic-remove" data-index="${o}"
                            aria-label="删除课题">${l("trash",12)}</button>
                        </div>
                        <input type="text" data-theme-topic-field="title" data-index="${o}"
                          value="${s(i.title||"")}" placeholder="填写讲座主题">
                        <div class="field-row">
                          <select data-theme-topic-field="dept" data-index="${o}">
                            ${xn.map(r=>`<option value="${s(r)}" ${i.dept===r?"selected":""}>${s(r)}</option>`).join("")}
                          </select>
                          <select data-theme-topic-field="expertId" data-index="${o}">
                            <option value="">请选择主讲专家</option>
                            ${n.map(r=>`<option value="${s(r.id)}" ${i.expertId===r.id?"selected":""}>${s(r.name)} · ${s(r.dept)}</option>`).join("")}
                          </select>
                        </div>
                        <div class="theme-topic-coverage" data-topic-coverage-index="${o}">
                          <div class="theme-topic-coverage__head">
                            <span>课题履约地 <em>*</em></span>
                            <small>省市级联 · 可多选</small>
                          </div>
                          <div class="theme-city-chips theme-topic-city-chips"
                            id="theme-topic-coverage-chips-${o}" data-index="${o}">
                            ${wa(i.coverageCities||[],"theme-topic-coverage-remove")||"<small>尚未选择课题履约地</small>"}
                          </div>
                          <div class="theme-topic-city-controls">
                            <div class="field-row">
                              <div class="field">
                                <label>省份</label>
                                <select data-theme-topic-coverage-province data-index="${o}">
                                  ${Oe(i.coverageProvince)}
                                </select>
                              </div>
                              <div class="field">
                                <label>城市</label>
                                <select data-theme-topic-coverage-city data-index="${o}">
                                  ${ka(i.coverageProvince,i.coverageCity)}
                                </select>
                              </div>
                            </div>
                            <div class="theme-topic-city-actions">
                              <button class="btn btn--soft btn--sm" type="button"
                                data-action="theme-topic-coverage-add" data-index="${o}">
                                ${l("plus",12)} 添加城市
                              </button>
                              <button class="coverage-national ${i.coverageCities?.includes("全国")?"is-active":""}" type="button" data-action="theme-topic-coverage-national"
                                data-index="${o}" aria-pressed="${i.coverageCities?.includes("全国")?"true":"false"}">
                                <span class="coverage-national__icon">${l("mapPin",12)}</span>
                                <span><strong>全国</strong><small>不限城市</small></span>
                                <span class="coverage-national__check">${l("check",10)}</span>
                              </button>
                              <button class="theme-topic-coverage__from-expert" type="button"
                                data-action="theme-topic-coverage-from-expert" data-index="${o}">
                                ${l("sparkles",11)} 使用专家履约地
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    `).join("")}
              </div>
              <button class="theme-add-topic" type="button" data-action="theme-topic-add">
                ${l("plus",12)} 添加讲座课题
              </button>
            </div>
            <p class="field-help">每个课题独立配置主讲专家与履约城市；切换专家后可一键套用该专家的履约范围。机构端只展示当前城市在课题履约地内的主题，不在范围内的城市不展示、也不能预约。</p>
          </div>
        </div>
        <div class="sheet__footer">
          <button class="btn btn--ghost" type="button" data-action="admin-theme-default">恢复默认</button>
          <button class="btn btn--primary" type="button" data-action="admin-theme-save">保存主题</button>
        </div>
      </section>
    `}function jc(){const e=a.adminThemeDraft;return e?(document.querySelectorAll("[data-theme-field]").forEach(t=>{e[t.dataset.themeField]=t.value.trim()}),document.querySelectorAll("[data-theme-topic-field]").forEach(t=>{const n=Number(t.dataset.index);e.topics?.[n]&&(e.topics[n][t.dataset.themeTopicField]=t.value.trim())}),e):null}function Uc(){const e=Dt(),t=jc();if(!e||!t)return d("主题配置已失效。");if(!t.season?.trim())return d("请填写时令名称。");if(!t.topics?.length||t.topics.some(o=>!o.title?.trim()))return d("请至少完整填写一个讲座课题。");const n=t.topics.find(o=>{const r=o.expertId?D(o.expertId):null;return!o.dept?.trim()||!r||r.active===!1||r.hospitalId!==e.id||!j(r,"讲座")});if(n)return d(`课题「${n.title||"未填写"}」需绑定本院已显示的讲座专家。`);const i=t.topics.find(o=>!ut(o,t,e.id).cities.length);if(i)return d(`课题「${i.title||"未填写"}」请至少选择一个履约城市，或点击“使用专家履约地”。`);t.expertIds=[...new Set(t.topics.map(o=>o.expertId).filter(Boolean))],_s(e.id,t),a.overlay=null,a.adminThemeDraft=null,F(),g({scrollTo:Q()}),d(`${t.month}月时令主题已保存，机构端将同步更新。`)}const xn=["心血管","呼吸科","内科","内分泌","肾病","感染肝病","肿瘤","临床营养","全科","健康管理","老年科","骨科","康复科","中医科","心理","睡眠","神经内科","急诊急救","皮肤医美","烧伤科","妇科","儿科","其他"];function Do(){const e=Ve();if(!e)return[];const t=(a.adminDoctorSearch||"").trim().toLowerCase();return a.experts.filter(n=>e&&n.hospitalId!==e.id?!1:t?[n.name,n.hospital,n.dept,n.deptTitle,n.specialty].join(" ").toLowerCase().includes(t):!0).sort((n,i)=>Ie.indexOf(n.tier)-Ie.indexOf(i.tier)||n.name.localeCompare(i.name,"zh-CN"))}function To(e){const t=[...nn(e)].sort((n,i)=>n-i);return`
      <button class="doctor-admin-card" type="button" data-action="open-admin-doctor"
        data-doctor-id="${s(e.id)}">
        <span class="doctor-admin-card__avatar">
          <img src="${s(ke(e))}" alt="${s(e.name)}" loading="lazy">
          <i class="tier-dot tier-dot--${e.tier}">${s(Y(e).short.slice(0,2))}</i>
        </span>
        <span class="doctor-admin-card__body">
          <span class="doctor-admin-card__head">
            <strong>${s(e.name)}</strong>
            <span class="${e.active===!1?"is-off":"is-on"}">${e.active===!1?"未显示":"已显示"}</span>
          </span>
          <span class="doctor-admin-card__role">${s(e.deptTitle)} · ${s(e.dept)}</span>
          <span class="doctor-admin-card__hospital"><strong class="hospital-name">${s(e.hospital)}</strong> · ${s(te(e))}</span>
          <span class="doctor-admin-card__services">${(e.services||[]).map(n=>`<span>${s(L(n))}</span>`).join("")}<i>${s(e.leadLabel)}</i>${t.length?`<i>${t.length} 个月令课题</i>`:""}</span>
        </span>
        <span class="doctor-admin-card__edit">${l("edit",13)}</span>
      </button>
    `}function Fc(){const e=Ve(),t=Do();return`
      <div class="admin-page-head">
        <div><h1>专家配置</h1><p>维护本院专家资料、服务类型与预约周期</p></div>
        <button class="btn btn--primary btn--sm" type="button" data-action="admin-doctor-add" ${e?"":"disabled"}>
          ${l("plus",14)} 新增专家
        </button>
      </div>
      ${ge()}
      ${qe()}
      ${e?`
      <div class="admin-search">
        ${l("search",15)}
        <input type="search" placeholder="搜索姓名、科室或擅长方向" value="${s(a.adminDoctorSearch||"")}" data-admin-doctor-search>
      </div>
      <p class="admin-hint">${l("alert",12)} 专家字段参考院方整理表：姓名、履约机构、科室/任职、科室方向、服务类型、履约城市、擅长/专业优势、简介/履历、预约时间。表格未提供性别时使用中性医疗头像。</p>
      <div id="doctor-admin-list" class="doctor-admin-list">
        ${t.length?t.map(To).join(""):`<div class="empty-state"><span class="empty-state__icon">${l("experts",26)}</span><h3>暂无专家</h3><p>点击右上角新增本院专家。</p></div>`}
      </div>
      `:`<div class="empty-state"><span class="empty-state__icon">${l("building",26)}</span><h3>请选择医院</h3><p>超级管理员需先选择医院，再查看或维护该院专家。</p></div>`}
    `}function qc(){const e=Ve();return{id:"",custom:!0,name:"",gender:"neutral",senior:!1,tier:"specialist",hospitalId:e?.id||"",hospital:e?.name||"",deptTitle:"",dept:"内科",services:["讲座","健康咨询"],coverage:"全国",coverageCities:["全国"],leadDays:7,leadLabel:"提前 7 天申请",specialty:"",intro:"",photo:"",photoCard:"",photoDetail:"",active:!0}}function xo(e=""){if(w()&&!a.adminHospitalId)return d("请先选择医院，再维护本院专家。");const t=e?D(e):null,n=Ve();if(!n)return d("医院范围无效，请重新选择医院。");if(t&&t.hospitalId!==n.id)return d("只能维护当前所选医院的专家。");a.adminDoctorDraft=t?Je(t):qc(),t&&(a.adminDoctorDraft.coverageCities=pt(t));const i=k(a.adminDoctorDraft.hospitalId),o=Vt(a.adminDoctorDraft.coverageCities,i?.province||"北京市"),r=(a.adminDoctorDraft.coverageCities||[]).find(c=>c!=="全国"&&(a.chinaCities?.[o]||[]).includes(c));a.adminDoctorDraft.coverageProvince=o,a.adminDoctorDraft.coverageCity=r||a.chinaCities?.[o]?.[0]||o||"北京市",a.overlay={type:"admin-doctor"},b()}function Vc(){const e=a.adminDoctorDraft;if(!e)return"";const t=!e.id,n=ke(e),i=pt(e);return`
      <div class="sheet-backdrop" data-action="close-overlay"></div>
      <section class="sheet doctor-editor-sheet" role="dialog" aria-modal="true" aria-label="专家资料">
        <div class="sheet__grabber"></div>
        <div class="sheet__bar">
          <div><h2>${t?"新增专家":"编辑专家"}</h2><p>字段参考院方专家整理表</p></div>
          <button class="sheet__close" type="button" data-action="close-overlay" aria-label="关闭">
            ${l("close",15)}
          </button>
        </div>
        <div class="sheet__body">
          <div class="sheet-pad">
            <div class="doctor-photo-editor">
              <img src="${s(n)}" alt="专家头像预览">
              <div>
                <strong>专家头像</strong>
                <p>可上传照片；未上传时使用默认医疗头像。</p>
                <div class="doctor-photo-editor__actions">
                  <label class="btn btn--ghost btn--sm">
                    上传照片
                    <input type="file" accept="image/*" data-doctor-photo hidden>
                  </label>
                  <button class="btn btn--ghost btn--sm" type="button" data-action="doctor-photo-clear">使用默认头像</button>
                </div>
              </div>
            </div>
            <div class="avatar-picker">
              ${[["neutral",!1,"中性头像"],["male",!1,"男医生"],["female",!1,"女医生"],["male",!0,"资深男医生"],["female",!0,"资深女医生"]].map(([o,r,c])=>`<button class="${!e.photoCard&&e.gender===o&&!!e.senior===r?"is-active":""}" type="button" data-action="doctor-avatar" data-gender="${o}" data-senior="${r?"1":"0"}">${c}</button>`).join("")}
            </div>
            <div class="field-row">
              <div class="field"><label>姓名 <em>*</em></label>
                <input type="text" data-doctor-field="name" value="${s(e.name)}" placeholder="专家姓名">
              </div>
              <div class="field"><label>性别</label>
                <select data-doctor-field="gender">
                  <option value="neutral" ${e.gender==="neutral"?"selected":""}>未设置（中性头像）</option>
                  <option value="male" ${e.gender==="male"?"selected":""}>男</option>
                  <option value="female" ${e.gender==="female"?"selected":""}>女</option>
                </select>
              </div>
            </div>
            <div class="field-row">
              <div class="field"><label>履约机构 <em>*</em></label>
                <select data-doctor-field="hospitalId" ${w()?"":"disabled"}>
                  ${a.hospitals.map(o=>`<option value="${s(o.id)}" ${e.hospitalId===o.id?"selected":""}>${s(o.name)}</option>`).join("")}
                </select>
                ${w()?"":'<span class="field-help">医院运营仅可维护本院专家。</span>'}
              </div>
              <div class="field"><label>专家层级</label>
                <select data-doctor-field="tier">
                  ${Ie.map(o=>`<option value="${o}" ${e.tier===o?"selected":""}>${s(Ge[o].short)}</option>`).join("")}
                </select>
              </div>
            </div>
            <div class="field"><label>科室 / 任职 <em>*</em></label>
              <input type="text" data-doctor-field="deptTitle" value="${s(e.deptTitle)}" placeholder="如：心血管内科主任医师">
            </div>
            <div class="field"><label>科室方向</label>
              <select data-doctor-field="dept">
                ${xn.map(o=>`<option value="${o}" ${e.dept===o?"selected":""}>${o}</option>`).join("")}
              </select>
            </div>
            <div class="field"><label>服务类型</label>
              <div class="choice-grid choice-grid--three">
                ${Pe.map(o=>`<button class="choice-tile ${e.services?.includes(o)?"is-active":""}" type="button" data-action="doctor-service" data-value="${s(o)}">${s(L(o))}</button>`).join("")}
              </div>
              <span class="field-help">月令讲座在「时令主题」中按课题绑定；已绑定讲师的专家不能直接取消讲座服务或停用。</span>
            </div>
            <div class="field">
              <label>履约城市 <em>*</em> <span>可多选</span></label>
              <div class="theme-city-editor doctor-coverage-editor">
                <div class="theme-city-chips" id="doctor-coverage-chips">
                  ${wa(i)}
                </div>
                <div class="doctor-coverage-controls">
                  <button class="coverage-national ${i.includes("全国")?"is-active":""}" type="button" data-action="doctor-coverage-national">
                    <span class="coverage-national__icon">${l("mapPin",14)}</span>
                    <span><strong>全国（不限城市）</strong><small>覆盖全国任意履约城市</small></span>
                    <span class="coverage-national__check">${l("check",12)}</span>
                  </button>
                  <div class="field-row doctor-coverage-picker">
                    <div class="field">
                      <label>省份</label>
                      <select data-doctor-coverage-province>${Oe(e.coverageProvince)}</select>
                    </div>
                    <div class="field">
                      <label>城市</label>
                      <select data-doctor-coverage-city>${ka(e.coverageProvince,e.coverageCity)}</select>
                    </div>
                  </div>
                  <span class="field-help">先选省份再选城市，选中城市后自动加入。含“京外”或“省外”的履约地按全国覆盖处理。</span>
                </div>
              </div>
            </div>
            <div class="field"><label>擅长 / 专业优势</label>
              <textarea data-doctor-field="specialty" placeholder="填写专家擅长方向">${s(e.specialty)}</textarea>
            </div>
            <div class="field"><label>简介 / 履历</label>
              <textarea data-doctor-field="intro" class="textarea--tall" placeholder="填写学术任职、履历与临床经验">${s(e.intro)}</textarea>
            </div>
            <div class="field"><label>预约提前期（天）</label>
              <input type="number" min="${s(Y(e).leadDays)}" max="90" data-doctor-field="leadDays" value="${s(e.leadDays)}">
              <span class="field-help">对应院方表格中的「预约时间 T+N」。大咖不得少于 30 天、主任不得少于 14 天、专业医生不得少于 7 天。</span>
            </div>
            <label class="switch-row">
              <span><strong>在机构端显示</strong><small>关闭后机构端不再展示该专家</small></span>
              <input type="checkbox" data-doctor-active ${e.active!==!1?"checked":""}>
            </label>
          </div>
        </div>
        <div class="sheet__footer">
          <button class="btn btn--ghost" type="button" data-action="close-overlay">取消</button>
          <button class="btn btn--primary" type="button" data-action="admin-doctor-save">保存专家</button>
        </div>
      </section>
    `}function Kc(){const e=a.adminDoctorDraft;document.querySelectorAll("[data-doctor-field]").forEach(n=>{const i=n.dataset.doctorField;if(i==="leadDays"){const o=Ge[e.tier]?.leadDays||7;e.leadDays=Math.max(o,Number(n.value)||o)}else i==="hospitalId"?(e.hospitalId=n.value,e.hospital=k(n.value)?.name||e.hospital):e[i]=n.value.trim()});const t=document.querySelector("[data-doctor-active]");return t&&(e.active=t.checked),e.coverage=e.coverageCities?.includes("全国")?"全国":(e.coverageCities||[]).join(" / "),e.leadLabel=`提前 ${e.leadDays} 天申请`,e}function zc(){const e=Kc();if(!a.adminUser)return d("登录状态已失效，请重新登录。");if(!e.name)return d("请填写专家姓名。");if(!e.hospitalId)return d("请选择履约机构。");if(w()){if(!a.adminHospitalId||e.hospitalId!==a.adminHospitalId)return d("超级管理员只能维护当前所选医院的专家。")}else if(e.hospitalId!==a.adminUser.hospitalId)return d("医院运营只能维护本院专家。");if(!e.deptTitle)return d("请填写科室/任职。");if(!e.services?.length)return d("请至少选择一个服务类型。");if(!e.coverageCities?.length)return d("请至少选择一个履约城市。");const t=e.id?D(e.id):null;if(t){const o=[...nn(t)].sort((c,p)=>c-p),r=t.hospitalId!==e.hospitalId||e.active===!1||!j(e,"讲座");if(o.length&&r)return d(`该专家已在 ${o.join("、")} 月时令课题中担任主讲，请先在「时令主题」中更换主讲专家，再取消讲座服务、停用或调整履约机构。`)}const n={...e};delete n.custom,delete n.coverageProvince,delete n.coverageCity;const i=Kn();if(e.id&&!e.custom)i.overrides=i.overrides||{},i.overrides[e.id]=n;else if(e.id)i.added=(i.added||[]).map(o=>o.id===e.id?{...n}:o);else{const o=`custom-${Date.now()}`;i.added=(i.added||[]).concat({...n,id:o,custom:!0,photo:e.photo||"",profileUrl:""})}Go(i),zn(),J(e.id?"更新专家资料":"新增专家",`${e.name} · ${e.deptTitle}`,{entityType:"expert",entityId:e.id||e.name,hospitalId:e.hospitalId}),a.overlay=null,F(),g(),d("专家资料已保存。")}function Wc(e){if(!e||!a.adminDoctorDraft)return;const t=new FileReader;t.onload=()=>{const n=new Image;n.onload=()=>{const r=document.createElement("canvas");r.width=540,r.height=680;const c=r.getContext("2d"),p=Math.min(540/n.width,680/n.height),u=n.width*p,h=n.height*p;c.fillStyle="#dce6f7",c.fillRect(0,0,540,680),c.drawImage(n,(540-u)/2,(680-h)/2,u,h);const m=r.toDataURL("image/jpeg",.82);a.adminDoctorDraft.photo=m,a.adminDoctorDraft.photoCard=m,a.adminDoctorDraft.photoDetail=m,b(),d("照片已压缩并载入。")},n.src=String(t.result)},t.readAsDataURL(e)}const Xc="pkuih_h6_file_store",ze="plan_pdfs",We="poster_images";let Jt=null;function Tt(){return Jt||(Jt=new Promise((e,t)=>{if(!window.indexedDB){t(new Error("当前浏览器不支持附件存储"));return}const n=window.indexedDB.open(Xc,2);n.onupgradeneeded=()=>{const i=n.result;i.objectStoreNames.contains(ze)||i.createObjectStore(ze),i.objectStoreNames.contains(We)||i.createObjectStore(We)},n.onsuccess=()=>e(n.result),n.onerror=()=>{Jt=null,t(n.error||new Error("附件存储初始化失败"))}}),Jt)}async function Yc(e,t,n={}){const i=await Tt();await new Promise((o,r)=>{const c=i.transaction(ze,"readwrite");c.objectStore(ze).put({...n,blob:t,savedAt:new Date().toISOString()},e),c.oncomplete=()=>o(),c.onerror=()=>r(c.error),c.onabort=()=>r(c.error)})}async function Gc(e){if(!e)return null;const t=await Tt();return new Promise((n,i)=>{const r=t.transaction(ze,"readonly").objectStore(ze).get(e);r.onsuccess=()=>n(r.result?.blob||null),r.onerror=()=>i(r.error)})}async function Ao(e){if(e)try{const t=await Tt();await new Promise((n,i)=>{const o=t.transaction(ze,"readwrite");o.objectStore(ze).delete(e),o.oncomplete=()=>n(),o.onerror=()=>i(o.error)})}catch(t){console.warn("plan pdf cleanup failed",t)}}async function Mo(e,t,n={}){const i=await Tt();await new Promise((o,r)=>{const c=i.transaction(We,"readwrite");c.objectStore(We).put({...n,blob:t,savedAt:new Date().toISOString()},e),c.oncomplete=()=>o(),c.onerror=()=>r(c.error),c.onabort=()=>r(c.error)})}async function No(e){if(!e)return null;const t=await Tt();return new Promise((n,i)=>{const r=t.transaction(We,"readonly").objectStore(We).get(e);r.onsuccess=()=>n(r.result?.blob||null),r.onerror=()=>i(r.error)})}async function xt(e){if(e)try{const t=await Tt();await new Promise((n,i)=>{const o=t.transaction(We,"readwrite");o.objectStore(We).delete(e),o.oncomplete=()=>n(),o.onerror=()=>i(o.error)})}catch(t){console.warn("poster image cleanup failed",t)}}async function Qt(e){const t=await fetch(e);if(!t.ok)throw new Error("附件数据读取失败");return t.blob()}function Zc(e){return e?{name:e.name||"活动方案.pdf",size:Number(e.size)||0,type:e.type||"application/pdf",uploadedAt:e.uploadedAt||"",storageKey:e.storageKey||""}:null}function At(e={}){const t=String(e.type||"").toLowerCase(),n=String(e.name||"").toLowerCase();return t==="application/pdf"||n.endsWith(".pdf")?"pdf":t.includes("powerpoint")||t.includes("presentationml")||n.endsWith(".ppt")||n.endsWith(".pptx")?"ppt":"file"}function Co(e){return e==="pdf"?"PDF":e==="ppt"?"PPT":"附件"}function Jc(e){const t=String(e?.type||"").toLowerCase(),n=String(e?.name||"").toLowerCase();return t==="application/pdf"||t==="application/vnd.ms-powerpoint"||t==="application/vnd.openxmlformats-officedocument.presentationml.presentation"||n.endsWith(".pdf")||n.endsWith(".ppt")||n.endsWith(".pptx")}async function Qc(e){const t=e.plan?.pdf?.storageKey||"",n=a.adminDraft?.planPdf||null,i=a.adminDraft?.planPdfBlob||null;if(!n)return{pdf:null,oldKey:t,newKey:""};let o=i;if(!o&&n.dataUrl&&(o=await Qt(n.dataUrl)),!o)return{pdf:Zc(n),oldKey:t,newKey:""};const r=`plan-pdf-${e.id}-${Date.now()}`,c=n.name||"活动方案.pdf",p=Number(n.size)||o.size||0;return await Yc(r,o,{name:c,size:p,type:n.type||o.type||"application/pdf"}),{pdf:{name:c,size:p,type:n.type||o.type||"application/pdf",uploadedAt:n.uploadedAt||new Date().toISOString(),storageKey:r},oldKey:t,newKey:r}}function ea(){if(a.pptxPreviewer?.destroy)try{a.pptxPreviewer.destroy()}catch(e){console.warn("pptx preview cleanup failed",e)}a.pptxPreviewer=null,a.planPdfView?.url&&URL.revokeObjectURL(a.planPdfView.url),a.planPdfView=null}let Ea=null;function el(){return window.pptxPreview?.init?Promise.resolve(window.pptxPreview):(Ea||(Ea=new Promise((e,t)=>{const n=document.createElement("script");n.src="assets/pptx-preview.umd.js?v=20261126-2",n.async=!0,n.onload=()=>{window.pptxPreview?.init?e(window.pptxPreview):t(new Error("PPTX 预览组件未就绪"))},n.onerror=()=>{Ea=null,t(new Error("PPTX 预览组件加载失败"))},document.head.appendChild(n)})),Ea)}async function tl(){const e=a.planPdfView;if(!e?.isPptx||!e.blob||a.overlay?.type!=="plan-pdf")return;const t=V?.querySelector("[data-pptx-viewer]");if(!t)return;const n=t.querySelector(".pptx-viewer__loading");try{const i=await el();if(a.planPdfView!==e||a.overlay?.type!=="plan-pdf"||!t.isConnected)return;const o=Math.max(280,Math.min(920,t.clientWidth||340)),r=Math.round(o*.75);a.pptxPreviewer?.destroy?.(),n?.remove();const c=i.init(t,{width:o,height:r,mode:"slide"});a.pptxPreviewer=c,await c.preview(await e.blob.arrayBuffer());const p=t.querySelector(".pptx-preview-wrapper-pagination");p&&c.slideCount&&p.textContent?.startsWith("0/")&&(p.textContent=`1/${c.slideCount}`)}catch(i){console.warn("pptx preview failed",i),n&&(n.innerHTML="<strong>演示文稿暂时无法解析</strong><span>请下载后使用 WPS 或 PowerPoint 打开。</span>",n.classList.add("is-error"))}}async function al(e){const t=U(e);if(!t)return d("预约记录不存在。");const n=a.adminReviewId===t.id&&a.adminDraft?.planPdf||null,i=t.plan?.pdf||n;if(!i)return d("该预约暂无方案附件。");const o=!!a.session&&_e(t),r=!!a.adminAuthed&&ve(t.hospitalId);if(!o&&!r)return d("无权查看该方案附件。");let c=null;if(a.adminReviewId===t.id&&a.adminDraft?.planPdfBlob)c=a.adminDraft.planPdfBlob;else if(i.storageKey)try{c=await Gc(i.storageKey)}catch{return d("方案附件读取失败，请稍后重试。")}else if(i.dataUrl)try{c=await Qt(i.dataUrl)}catch{return d("方案附件读取失败，请院方重新上传。")}if(!c)return d("方案附件已失效，请联系院方重新上传。");ea();const p=At(i)==="ppt"?"application/vnd.openxmlformats-officedocument.presentationml.presentation":"application/pdf",u=c.type?c:new Blob([c],{type:i.type||p}),h=URL.createObjectURL(u);a.planPdfView={appointmentId:t.id,name:i.name||"活动方案.pdf",size:Number(i.size)||c.size||0,type:i.type||"application/pdf",kind:At(i),isPptx:At(i)==="ppt"&&String(i.name||"").toLowerCase().endsWith(".pptx"),blob:u,url:h},Re({type:"plan-pdf",appointmentId:t.id})}function nl(){const e=a.planPdfView;if(!e?.url)return d("方案附件已失效，请重新打开。");if(e.kind!=="pdf")return d("PPT 无法在微信内直接预览，请下载后使用 WPS 或 PowerPoint 打开。");if(Rn()&&/iPhone|iPad|iPod/i.test(navigator.userAgent||"")){window.location.href=e.url;return}let t=null;try{t=window.open(e.url,"_blank")}catch{t=null}if(t){try{t.opener=null}catch{}return}try{window.location.href=e.url}catch{d("当前环境无法直接打开，请使用下方“下载附件”。")}}function il(){const e=a.planPdfView;if(!e)return"";const t=e.kind==="pdf",n=!!e.isPptx;return`
      <div class="sheet-backdrop" data-action="close-overlay"></div>
      <section class="sheet pdf-sheet" role="dialog" aria-modal="true" aria-label="方案附件预览">
        <div class="sheet__grabber"></div>
        <div class="sheet__bar">
          <div><h2>方案附件</h2><p>${s(e.name)} · ${s(Rt(e.size))}</p></div>
          <button class="sheet__close" type="button" data-action="close-overlay" aria-label="关闭">
            ${l("close",15)}
          </button>
        </div>
        <div class="sheet__body pdf-sheet__body">
          ${t?`<div class="pdf-sheet__frame">
                  <iframe src="${s(e.url)}#toolbar=0&navpanes=0" title="${s(e.name)}" loading="eager"></iframe>
                </div>`:n?`<div class="pdf-sheet__frame pptx-sheet__frame">
                  <div class="pptx-viewer" data-pptx-viewer>
                    <div class="pptx-viewer__loading">
                      <span class="pptx-viewer__spinner" aria-hidden="true"></span>
                      <strong>正在加载演示文稿</strong>
                      <span>首次打开需载入预览组件，请稍候…</span>
                    </div>
                  </div>
                </div>`:`<div class="pdf-sheet__frame attachment-preview">
                  <span>${l("clipboard",30)}</span>
                  <strong>${s(Co(e.kind))} 材料</strong>
                  <p>${s(e.name)}</p>
                  <small>${s(Rt(e.size))} · 旧版 .ppt 无法在手机内解析，请下载后使用 PowerPoint 或 WPS 查看</small>
                </div>`}
          <div class="pdf-sheet__hint">
            ${l("shield",13)}
            <span>${t?"页面内预览受微信内核限制；如显示空白，可点击“微信内打开”交给微信浏览器查看。":n?"PPTX 在当前手机内直接渲染；字体、动画与复杂图表可能与 PowerPoint 原稿略有差异，最终以源文件为准。":"微信不支持直接预览 PPT，请下载后使用 WPS 或 PowerPoint 打开。"}附件支持最大 20MB。</span>
          </div>
        </div>
        <div class="sheet__footer pdf-sheet__footer">
          <button class="btn btn--ghost" type="button" data-action="close-overlay">关闭</button>
          ${t?`<a class="btn btn--soft" href="${s(e.url)}" download="${s(e.name)}">${l("download",14)} 下载</a>
                <button class="btn btn--primary" type="button" data-action="plan-attachment-open">
                  ${l("arrowUpRight",14)} ${Rn()?"微信内打开":"新窗口打开"}
                </button>`:n?`<a class="btn btn--primary" href="${s(e.url)}" download="${s(e.name)}">${l("download",15)} 下载原文件</a>`:`<a class="btn btn--primary" href="${s(e.url)}" download="${s(e.name)}">${l("download",15)} 下载后用 WPS 打开</a>`}
        </div>
      </section>
    `}function ol(e){if(!(!e||!a.adminDraft)){if(!Jc(e))return d("请选择 PDF、PPT 或 PPTX 文件。");if(e.size>Ko)return d("单个方案附件请控制在 20MB 以内。");a.adminDraft.planPdf={name:e.name||"活动方案.pdf",size:e.size,type:e.type||"application/pdf",uploadedAt:new Date().toISOString()},a.adminDraft.planPdfBlob=e,a.adminDraft.planPdfRemoved=!1,b(),d(`${Co(At(e))} 材料已载入，保存方案后机构可查看。`)}}function Po(e=""){if(!w())return d("仅超级管理员可维护医院资料。");const t=e?Jo(e):null,n=H(t?.province||a.homeRegion?.province||"北京市",t?.city||a.homeRegion?.city||"北京市");a.hospitalEditorDraft=t?{...t,isNew:!1}:{id:"",name:"",short:"",province:n.province,city:n.city,address:"",phone:"",lat:Number(a.geoLat)||39.9042,lng:Number(a.geoLng)||116.4074,flagship:!1,isNew:!0},a.overlay={type:"hospital-editor",hospitalId:e||""},b()}function sl(){const e=a.hospitalEditorDraft;return e?`
      <div class="sheet-backdrop" data-action="close-overlay"></div>
      <section class="sheet hospital-editor-sheet" role="dialog" aria-modal="true" aria-label="编辑医院资料">
        <div class="sheet__grabber"></div>
        <div class="sheet__bar">
          <div><h2>${e.isNew?"新增医院":"编辑医院资料"}</h2><p>${e.isNew?"新增后可分配运营账号与专家资源":s(e.name)}</p></div>
          <button class="sheet__close" type="button" data-action="close-overlay" aria-label="关闭">
            ${l("close",15)}
          </button>
        </div>
        <div class="sheet__body">
          <div class="sheet-pad">
            <div class="field-row">
              <div class="field"><label>医院名称 <em>*</em></label>
                <input type="text" data-hospital-field="name" value="${s(e.name)}" placeholder="如：北京大学国际医院">
              </div>
              <div class="field"><label>医院简称 <em>*</em></label>
                <input type="text" data-hospital-field="short" value="${s(e.short)}" placeholder="如：国际医院">
              </div>
            </div>
            <div class="field-row">
              <div class="field"><label>所在省份 <em>*</em></label>
                <select data-hospital-province>${Oe(e.province)}</select>
              </div>
              <div class="field"><label>所在城市 <em>*</em></label>
                <select data-hospital-city>${me(e.province,e.city)}</select>
              </div>
            </div>
            <div class="field">
              <label>详细地址 <em>*</em></label>
              <input type="text" data-hospital-field="address" value="${s(e.address)}" placeholder="如：北京市昌平区中关村生命科学园生命园路1号">
              <span class="field-help">该地址用于机构端就近医院推荐与活动履约展示。</span>
            </div>
            <div class="field">
              <label>对外联系电话 <em>*</em></label>
              <input type="tel" inputmode="tel" maxlength="24" data-hospital-field="phone" value="${s(e.phone)}" placeholder="如：010-69007777">
            </div>
            <div class="field-row">
              <div class="field"><label>纬度（Lat） <em>*</em></label>
                <input type="number" inputmode="decimal" step="0.000001" min="3" max="54" data-hospital-field="lat" value="${s(e.lat)}" placeholder="39.904200">
              </div>
              <div class="field"><label>经度（Lng） <em>*</em></label>
                <input type="number" inputmode="decimal" step="0.000001" min="73" max="136" data-hospital-field="lng" value="${s(e.lng)}" placeholder="116.407400">
              </div>
            </div>
            <div class="field-help hospital-coordinate-help">${l("info",12)} 经纬度用于就近医院距离排序，请直接填写准确的纬度（3–54）和经度（73–136）。修改后，机构端重新进入首页即可看到新的距离排序。</div>
          </div>
        </div>
        <div class="sheet__footer">
          <button class="btn btn--ghost" type="button" data-action="close-overlay">取消</button>
          <button class="btn btn--primary" type="button" data-action="hospital-editor-save">
            ${e.isNew?"新增医院":"保存医院资料"} ${l("check",14)}
          </button>
        </div>
      </section>
    `:""}function rl(){if(!w())return d("仅超级管理员可维护医院。");const e=a.hospitalEditorDraft;if(!e)return;V.querySelectorAll("[data-hospital-field]").forEach(i=>{e[i.dataset.hospitalField]=i.dataset.hospitalField==="lat"||i.dataset.hospitalField==="lng"?Number(i.value):i.value.trim()});const t=es(e);if(t.error)return d(t.error);J(t.created?"新增履约医院":"更新医院资料",`${t.hospital.name} · ${t.hospital.city} · ${t.hospital.lat},${t.hospital.lng}`,{entityType:"hospital",entityId:t.hospital.id,hospitalId:t.hospital.id});const n=Q();a.hospitalEditorDraft=null,a.overlay=null,F(),g({scrollTo:n}),document.body.classList.remove("is-locked"),d(t.created?"医院已新增，请分配运营账号并维护专家号源。":"医院资料已保存。")}function cl(e){if(!w())return d("仅超级管理员可维护医院电话。");const t=k(e);t&&(a.hospitalPhoneDraft={hospitalId:t.id,phone:t.phone||""},a.overlay={type:"hospital-phone"},b())}function ll(){const e=a.hospitalPhoneDraft,t=k(e?.hospitalId);return!e||!t?"":`
      <div class="sheet-backdrop" data-action="close-overlay"></div>
      <section class="sheet hospital-phone-sheet" role="dialog" aria-modal="true" aria-label="编辑医院电话">
        <div class="sheet__grabber"></div>
        <div class="sheet__bar">
          <div><h2>编辑医院电话</h2><p>${s(t.name)}</p></div>
          <button class="sheet__close" type="button" data-action="close-overlay" aria-label="关闭">
            ${l("close",15)}
          </button>
        </div>
        <div class="sheet__body">
          <div class="sheet-pad">
            <div class="info-card">
              <div class="info-row"><span>医院</span><strong>${s(t.name)}</strong></div>
              <div class="info-row"><span>所在地区</span><strong>${s(C(t.province,t.city))}</strong></div>
            </div>
            <div class="field">
              <label>对外联系电话 <em>*</em></label>
              <input type="tel" inputmode="tel" maxlength="24"
                data-hospital-phone-input value="${s(e.phone)}"
                placeholder="如：010-69007777">
              <span class="field-help">${l("phone",11)} 保存后同步到机构端「我的 · 医院服务咨询」，支持点击拨号。</span>
            </div>
          </div>
        </div>
        <div class="sheet__footer">
          <button class="btn btn--ghost" type="button" data-action="close-overlay">取消</button>
          <button class="btn btn--primary" type="button" data-action="hospital-phone-save">
            保存电话 ${l("check",14)}
          </button>
        </div>
      </section>
    `}function dl(){if(!w())return d("仅超级管理员可维护医院电话。");const e=a.hospitalPhoneDraft,t=k(e?.hospitalId);if(!e||!t)return;const n=String(e.phone||"").trim();if(!/^[\d\s()+-]{6,24}$/.test(n))return d("请填写正确的医院联系电话。");Gn(t.id,{phone:n}),a.hospitals=a.hospitals.map(o=>o.id===t.id?{...o,phone:n}:o),J("更新医院联系电话",`${t.name} · ${n}`,{entityType:"hospital",entityId:t.id,hospitalId:t.id});const i=Q();a.hospitalPhoneDraft=null,a.overlay=null,F(),g({scrollTo:i}),document.body.classList.remove("is-locked"),d("医院电话已保存。")}function pl(){if(!w())return a.adminTab="appointments",Aa();const t=at().filter(i=>i.role==="superadmin").sort((i,o)=>Number(o.active)-Number(i.active)||i.name.localeCompare(o.name,"zh-CN")),n=t.filter(i=>i.active).length;return`
      <div class="admin-page-head">
        <div><h1>医院与账号</h1><p>统一维护医院、运营账号与平台权限</p></div>
        <div class="admin-page-head__actions">
          <button class="btn btn--primary btn--sm" type="button" data-action="hospital-editor-add">
            ${l("plus",13)} 新增医院
          </button>
        </div>
      </div>
      ${ge()}
      <section class="platform-admin-panel">
        <div class="platform-admin-panel__head">
          <div>
            <span>${l("shield",12)} 平台权限</span>
            <h2>超级管理员</h2>
            <p>至少保留 1 个启用账号；当前 ${n}/${t.length} 个可用</p>
          </div>
          <button class="btn btn--ghost btn--sm" type="button"
            data-action="admin-account-add" data-role="superadmin">
            ${l("plus",12)} 新增超管
          </button>
        </div>
        <div class="platform-admin-list">
          ${t.length?t.map(i=>`
                      <button class="platform-admin-row ${i.active?"":"is-disabled"}"
                        type="button" data-action="open-admin-account"
                        data-username="${s(i.username)}">
                        <span class="platform-admin-row__avatar">${s(Qe(i.name))}</span>
                        <span class="platform-admin-row__body">
                          <strong>${s(i.name)}
                            <i class="role-tag ${i.active?"role-tag--superadmin":"is-off"}">${i.active?"已启用":"已停用"}</i>
                          </strong>
                          <small>${s(i.username)} · ${s(i.phone)}</small>
                        </span>
                        ${l("chevronRight",13)}
                      </button>
                    `).join(""):`<div class="platform-admin-empty">${l("alert",14)} 尚未配置超级管理员，请立即新增。</div>`}
        </div>
      </section>
      <div class="section-head section-head--admin hospital-account-section-head">
        <div><h2>医院与运营账号</h2><p>点击账号直接编辑，账号随医院统一维护</p></div>
        <span>${a.hospitals.length} 家</span>
      </div>
      <div class="hospital-admin-list">
        ${a.hospitals.map(i=>{const o=tc(i.id,!0),r=o.filter(u=>u.active),c=a.experts.filter(u=>u.hospitalId===i.id&&u.active!==!1).length,p=re().filter(u=>u.hospitalId===i.id&&u.status==="pending").length;return`
              <article class="hospital-admin-card">
                <div class="hospital-admin-card__head">
                  <div>
                    <div class="hospital-admin-card__titleline">
                      <strong>${s(i.name)}</strong>
                      <button class="hospital-phone-chip" type="button"
                        data-action="hospital-phone-edit" data-hospital-id="${s(i.id)}" aria-label="编辑${s(i.name)}联系电话">
                        ${l("phone",9)}
                        <span>${s(i.phone||"电话待配置")}</span>
                        ${l("edit",9)}
                      </button>
                    </div>
                    <span>${s(C(i.province,i.city))}</span>
                  </div>
                  <span class="${r.length?"is-on":"is-off"}">${r.length?"已配置运营":o.length?"运营已停用":"待配置运营"}</span>
                </div>
                <div class="hospital-admin-card__stats">
                  <span><b>${c}</b> 位专家</span>
                  <span><b>${p}</b> 待接单</span>
                </div>
                <div class="hospital-operator-list">
                  ${o.length?o.map(u=>`<button class="hospital-operator-row ${u.active?"":"is-disabled"}" type="button" data-action="open-admin-account"
                                data-username="${s(u.username)}">
                                <span class="hospital-operator-row__avatar">${s(Qe(u.name))}</span>
                                <span class="hospital-operator-row__body">
                                  <strong>${s(u.name)}
                                    <i class="role-tag ${u.active?"role-tag--operator":"is-off"}">${u.active?"运营":"已停用"}</i>
                                  </strong>
                                  <small>${s(u.username)} · ${s(u.phone)}</small>
                                </span>
                                ${l("edit",12)}
                              </button>`).join(""):`<div class="hospital-operator-empty">${l("users",14)}<span>尚未分配运营人员，机构预约将无人接单</span></div>`}
                </div>
                <div class="hospital-admin-card__actions">
                  <button class="btn btn--ghost btn--sm" type="button" data-action="hospital-editor-edit"
                    data-hospital-id="${s(i.id)}">
                    ${l("edit",12)} 编辑医院资料
                  </button>
                  <button class="btn btn--ghost btn--sm" type="button" data-action="admin-hospital-operator"
                    data-hospital-id="${s(i.id)}">
                    ${l("plus",12)} 添加运营账号
                  </button>
                </div>
              </article>
            `}).join("")}
      </div>
    `}function ul(){if(!w())return a.adminTab="appointments",Aa();const e=pa().sort((n,i)=>Number(i.active)-Number(n.active)||n.orgName.localeCompare(i.orgName,"zh-CN")),t=e.filter(n=>n.active).length;return`
      <div class="admin-page-head">
        <div><h1>机构账号</h1><p>仅已开通手机号可登录机构端</p></div>
        <button class="btn btn--primary btn--sm" type="button" data-action="institution-account-add">
          ${l("plus",14)} 开通机构
        </button>
      </div>
      ${ge()}
      <div class="admin-stats admin-stats--three">
        <div class="admin-stat"><small>已开通</small><strong>${t}</strong><span>可登录机构账号</span></div>
        <div class="admin-stat"><small>已停用</small><strong>${e.length-t}</strong><span>不可登录</span></div>
        <div class="admin-stat"><small>覆盖机构</small><strong>${new Set(e.filter(n=>n.active&&n.orgName).map(n=>n.orgName)).size}</strong><span>集团与分支机构</span></div>
      </div>
      <div class="institution-account-note">
        ${l("shield",15)}
        <span>机构手机号是登录白名单。开通时只需填写手机号与姓名，单位、机构类型、职务、联系方式和通知邮箱由机构首次登录后补充完整；未开通手机号将无法获取验证码登录。</span>
      </div>
      <div class="account-list institution-account-list">
        ${e.length?e.map(n=>`
                    <button class="account-row ${n.active?"":"is-disabled"}" type="button"
                      data-action="open-institution-account" data-phone="${s(n.phone)}">
                      <span class="account-row__avatar">${s(Qe(n.orgName||n.name))}</span>
                      <span class="account-row__body">
                        <strong>${s(n.orgName||"未填写单位")}
                          <i class="role-tag role-tag--operator">${s(n.orgType||"资料待补充")}</i>
                          ${n.active?"":'<i class="role-tag is-off">已停用</i>'}
                        </strong>
                        <span>${s(n.name||"未填写姓名")} · ${ee(n.phone,n.phone)}</span>
                        <small>${s(C(n.province,n.city)||"地区待补充")}${n.email?` · ${s(n.email)}`:""}</small>
                      </span>
                      ${l("chevronRight",14)}
                    </button>
                  `).join(""):`<div class="empty-state"><span class="empty-state__icon">${l("users",26)}</span><h3>尚未开通机构账号</h3><p>点击右上角开通后，该手机号才能登录机构端。</p></div>`}
      </div>
    `}function Lo(e=""){if(!w())return d("仅超级管理员可配置机构账号。");const t=e?ye(e):null;a.institutionAccountDraft=t?{...t,originalPhone:t.phone,isNew:!1}:{phone:"",originalPhone:"",name:"",orgName:"",orgType:"",title:"",contactPhone:"",email:"",province:"北京市",city:"北京市",active:!0,isNew:!0},a.overlay={type:"admin-institution"},b()}function ml(){const e=a.institutionAccountDraft;return e?`
      <div class="sheet-backdrop" data-action="close-overlay"></div>
      <section class="sheet institution-account-sheet" role="dialog" aria-modal="true" aria-label="机构账号">
        <div class="sheet__grabber"></div>
        <div class="sheet__bar">
          <div><h2>${e.isNew?"开通机构账号":"编辑机构账号"}</h2><p>仅手机号与姓名为必填，其余资料由机构登录后补充</p></div>
          <button class="sheet__close" type="button" data-action="close-overlay" aria-label="关闭">
            ${l("close",15)}
          </button>
        </div>
        <div class="sheet__body">
          <div class="sheet-pad">
            <div class="institution-account-banner">
              ${l("phone",15)}
              <span><strong>手机号与姓名即可开通白名单</strong><small>其余资料选填，机构人员首次登录后必须补充完整才能预约；停用后该手机号无法登录。</small></span>
            </div>
            <div class="field-row">
              <div class="field"><label>登录手机号 <em>*</em></label>
                <input type="tel" inputmode="numeric" maxlength="11" data-institution-field="phone"
                  value="${s(e.phone)}" placeholder="11 位手机号">
              </div>
              <div class="field"><label>姓名 <em>*</em></label>
                <input type="text" data-institution-field="name" value="${s(e.name)}" placeholder="机构联系人姓名">
              </div>
            </div>
            <div class="field"><label>单位名称 <span>选填，机构登录后补充</span></label>
              <input type="text" data-institution-field="orgName" value="${s(e.orgName)}" placeholder="如已知可填写，否则留空">
            </div>
            <div class="field-row">
              <div class="field"><label>机构类型 <span>选填</span></label>
                <select data-institution-field="orgType">
                  <option value="" ${e.orgType?"":"selected"}>待机构登录后选择</option>
                  ${Lt.map(t=>`<option value="${s(t)}" ${e.orgType===t?"selected":""}>${s(t)}</option>`).join("")}
                </select>
              </div>
              <div class="field"><label>职务 <span>选填</span></label>
                <input type="text" data-institution-field="title" value="${s(e.title)}" placeholder="机构登录后补充">
              </div>
            </div>
            <div class="field-row">
              <div class="field"><label>联系方式 <span>选填</span></label>
                <input type="tel" inputmode="numeric" maxlength="11" data-institution-field="contactPhone"
                  value="${s(e.contactPhone||e.phone)}" placeholder="默认同登录手机号">
              </div>
              <div class="field"><label>通知邮箱 <span>选填，登录后必填</span></label>
                <input type="email" inputmode="email" data-institution-field="email"
                  value="${s(e.email||"")}" placeholder="name@company.com">
              </div>
            </div>
            <div class="field-row">
              <div class="field">
                <label>所在省份 <span>登录后按定位同步</span></label>
                <select data-institution-province>${Oe(e.province)}</select>
              </div>
              <div class="field">
                <label>所在城市</label>
                <select data-institution-city>${me(e.province,e.city)}</select>
              </div>
            </div>
            <label class="switch-row">
              <span><strong>允许登录机构端</strong><small>停用后手机号无法获取验证码登录</small></span>
              <input type="checkbox" data-institution-active ${e.active?"checked":""}>
            </label>
          </div>
        </div>
        <div class="sheet__footer">
          <button class="btn btn--ghost" type="button" data-action="close-overlay">取消</button>
          <button class="btn btn--primary" type="button" data-action="institution-account-save">
            保存机构账号 ${l("check",14)}
          </button>
        </div>
      </section>
    `:""}function hl(){if(!w())return d("仅超级管理员可配置机构账号。");const e=a.institutionAccountDraft;if(!e)return;const t=String(e.phone||"").replace(/\s+/g,"");if(!/^1\d{10}$/.test(t))return d("请填写正确的 11 位登录手机号。");if(!e.name?.trim())return d("请填写机构联系人姓名。");if(e.orgType&&!Lt.includes(e.orgType))return d("请选择机构类型。");const n=String(e.contactPhone||e.phone||"").trim();if(n&&!/^1\d{10}$/.test(n))return d("联系方式格式不正确。");if(e.email?.trim()&&!jn(e.email))return d("通知邮箱格式不正确。");const i=pa();if(i.find(h=>h.phone===t&&(!e.originalPhone||h.phone!==e.originalPhone)))return d("该手机号已经开通机构账号。");const r=H(e.province,e.city),c=dt({...e,phone:t,orgType:e.orgType||"",contactPhone:n,province:r.province,city:r.city,updatedAt:new Date().toISOString()}),p=e.isNew?i.concat(c):i.map(h=>h.phone===e.originalPhone?{...h,...c}:h);Bn(p);const u=xe(c.phone);u&&Ee({...u,name:c.name,orgName:c.orgName,orgType:c.orgType,title:c.title,contactPhone:c.contactPhone,email:c.email,province:c.province,city:c.city}),J(e.isNew?"开通机构账号":"更新机构账号",`${c.orgName||"待补充单位"} · ${c.name} · ${c.phone}`,{entityType:"institution",entityId:c.phone}),a.overlay=null,a.institutionAccountDraft=null,F(),g(),d(e.isNew?"机构账号已开通，机构首次登录后需补充企业资料。":"机构账号已更新。")}function vl(){if(!w())return a.adminTab="appointments",Aa();const e=ki().filter(t=>a.adminHospitalId?!t.hospitalId||t.hospitalId===a.adminHospitalId:!0);return`
      <div class="admin-page-head">
        <div><h1>操作日志</h1><p>关键配置与履约操作留痕</p></div>
        <span class="admin-page-head__date">最近 ${e.length} 条</span>
      </div>
      ${ge()}
      ${qe()}
      <div class="admin-log-list">
        ${e.length?e.slice(0,120).map(t=>`
                    <article class="admin-log-item">
                      <div class="admin-log-item__head">
                        <strong>${s(t.action)}</strong>
                        <span>${s(pe(t.at))}</span>
                      </div>
                      <p>${s(t.detail)}</p>
                      <small>${s(t.actor?.name||"系统")} · ${s(t.entityId||t.entityType||"")}</small>
                    </article>
                  `).join(""):`<div class="empty-state"><span class="empty-state__icon">${l("history",26)}</span><h3>暂无操作日志</h3><p>接单、方案提交、号源与账号变更会自动记录。</p></div>`}
      </div>
    `}function An(e="",t="",n=""){if(!w())return d("仅超级管理员可分配院方账号。");const i=at().find(o=>o.username===e);a.adminAccountDraft=i?{...i,password:"",isNew:!1}:{username:"",password:"",name:"",phone:"",role:n||"operator",hospitalId:t||a.hospitals[0]?.id||"",active:!0,isNew:!0},a.overlay={type:"admin-account"},b()}function fl(){const e=a.adminAccountDraft;if(!e)return"";const t=at(),n=t.find(p=>p.username===e.username),i=t.filter(p=>p.role==="superadmin"&&p.active).length,o=!e.isNew&&e.username===a.adminUser?.username,r=!!(n?.role==="superadmin"&&n.active&&i<=1),c=o||r;return`
      <div class="sheet-backdrop" data-action="close-overlay"></div>
      <section class="sheet" role="dialog" aria-modal="true" aria-label="院方账号">
        <div class="sheet__grabber"></div>
        <div class="sheet__bar">
          <div><h2>${e.isNew?"新增院方账号":"编辑院方账号"}</h2><p>角色与医院权限</p></div>
          <button class="sheet__close" type="button" data-action="close-overlay" aria-label="关闭">
            ${l("close",15)}
          </button>
        </div>
        <div class="sheet__body">
          <div class="sheet-pad">
            <div class="field"><label>角色</label>
              <div class="choice-grid">
                ${Object.entries(Et).map(([p,u])=>`<button class="choice-tile ${e.role===p?"is-active":""}" type="button" data-action="account-role" data-value="${p}">
                        <strong>${s(u.label)}</strong>
                      </button>`).join("")}
              </div>
              <span class="field-help">${s(Et[e.role]?.desc||"")}</span>
            </div>
            ${e.role==="operator"?`<div class="field"><label>所属医院 <em>*</em></label>
                    <select data-account-field="hospitalId">
                      ${a.hospitals.map(p=>`<option value="${s(p.id)}" ${e.hospitalId===p.id?"selected":""}>${s(p.name)}</option>`).join("")}
                    </select>
                  </div>`:""}
            <div class="field-row">
              <div class="field"><label>姓名 <em>*</em></label>
                <input type="text" data-account-field="name" value="${s(e.name)}">
              </div>
              <div class="field"><label>手机号 <em>*</em></label>
                <input type="tel" inputmode="numeric" maxlength="11" data-account-field="phone" value="${s(e.phone)}">
              </div>
            </div>
            <div class="field-row">
              <div class="field"><label>登录账号 <em>*</em></label>
                <input type="text" data-account-field="username" value="${s(e.username)}" ${e.isNew?"":"disabled"}>
              </div>
              <div class="field"><label>密码 ${e.isNew?"<em>*</em>":""}</label>
                <input type="password" data-account-field="password" value="${s(e.password)}" placeholder="${e.isNew?"设置登录密码":"留空则不修改"}">
              </div>
            </div>
            <label class="switch-row">
              <span><strong>账号启用</strong><small>停用后无法登录院方工作台</small></span>
              <input type="checkbox" data-account-active ${e.active?"checked":""}
                ${c?"disabled":""}>
            </label>
            ${c?`<p class="account-superadmin-lock">
                    ${l("shield",12)}
                    ${o?"当前登录账号不能停用；如需更换管理员，请先新增并启用另一个超级管理员。":"系统至少保留一个启用的超级管理员，当前账号不能停用。"}
                  </p>`:""}
            <p class="field-help">${e.role==="superadmin"?"超级管理员拥有全部医院与账号权限；保存时系统会校验至少保留一个启用账号。":"医院运营登录后只能看到并维护所属医院的专家、号源与预约。"}</p>
          </div>
        </div>
        <div class="sheet__footer">
          <button class="btn btn--ghost" type="button" data-action="close-overlay">取消</button>
          <button class="btn btn--primary" type="button" data-action="admin-account-save">保存账号</button>
        </div>
      </section>
    `}function gl(){if(!w())return d("仅超级管理员可保存院方账号。");const e=a.adminAccountDraft;if(!e)return;if(!e.name?.trim())return d("请填写姓名。");if(!e.username?.trim())return d("请填写登录账号。");if(e.isNew&&!e.password?.trim())return d("请设置登录密码。");if(!/^1\d{10}$/.test(e.phone||""))return d("请填写正确的手机号。");if(e.role==="operator"&&!e.hospitalId)return d("请选择所属医院。");const t=at();if(e.isNew&&t.some(o=>o.username===e.username.trim()))return d("登录账号已存在。");if(!e.active&&e.username===a.adminUser.username)return d("不能停用当前登录账号。");const n={username:e.username.trim(),name:e.name.trim(),phone:e.phone.trim(),role:e.role,hospitalId:e.role==="operator"?e.hospitalId:"",active:!!e.active,password:e.password||t.find(o=>o.username===e.username)?.password,updatedAt:new Date().toISOString()},i=e.isNew?t.concat({...n,createdAt:new Date().toISOString()}):t.map(o=>o.username===e.username?{...o,...n}:o);if(!Vn(i))return d("至少需要保留一个启用的超级管理员，本次修改未保存。");if(!Yo(i))return d("账号保存失败，请保留至少一个启用的超级管理员后重试。");J(e.isNew?"新增院方账号":"更新院方账号",`${n.name} · ${n.username} · ${Et[n.role]?.label||""}`,{entityType:"admin-account",entityId:n.username,hospitalId:n.hospitalId}),n.username===a.adminUser.username&&(a.adminUser=i.find(o=>o.username===n.username),Va(a.adminUser)),a.overlay=null,F(),g(),d("院方账号已保存。")}const bl=[{id:"brand",eyebrow:"权威主视觉",title:"让权威医疗，走近企业",desc:"以医院品牌、名医团队与三级专家资源为核心，适合活动预热和朋友圈传播。",tags:["医院权威","名医资源","品牌传播"],image:"assets/posters/poster-brand.webp",thumb:"assets/posters/thumbs/poster-brand.webp"},{id:"lecture",eyebrow:"专家阵容",title:"院士级资源，为企业开讲",desc:"突出临床专家阵容、重点学科覆盖与分层匹配能力。",tags:["专家阵容","重点学科","三级资源"],image:"assets/posters/poster-lecture.webp",thumb:"assets/posters/thumbs/poster-lecture.webp"},{id:"premium",eyebrow:"保险高客答谢",title:"把名医，请到客户身边",desc:"面向保险高客沙龙与客户答谢会，强调名医面对面与专属策划。",tags:["保险高客","客户答谢","专属策划"],image:"assets/posters/poster-premium.webp",thumb:"assets/posters/thumbs/poster-premium.webp"},{id:"care",eyebrow:"企业健康价值",title:"一场讲座，四重价值",desc:"从员工健康素养、组织活力到雇主品牌与客户连接，说明企业健康活动价值。",tags:["企业价值","员工关怀","雇主品牌"],image:"assets/posters/poster-care.webp",thumb:"assets/posters/thumbs/poster-care.webp"}];function Eo(){const e=new Date().toISOString();return bl.map(t=>({...t,source:"official",hospitalId:"",builtin:!0,createdAt:e,updatedAt:e}))}function Mt(){const e=R(y.marketingPosters,null);if(Array.isArray(e))return e;const t=Eo();return T(y.marketingPosters,t),t}function Mn(e){T(y.marketingPosters,e)}function Nt(e){return Mt().find(t=>t.id===e)||null}function Ro(e){if(e?.source==="official")return"官方海报";const t=k(e?.hospitalId);return t?`${t.short||t.name} · 自有海报`:"医院自有海报"}function Nn(e){if(!e)return!1;if(w())return e.source==="official";const t=$e();return!!(t&&e.source!=="official"&&e.hospitalId===t.id)}function yl(){const e=Mt();if(w())return e.filter(o=>o.source==="official");const t=$e()?.id||"",n=e.filter(o=>o.source==="official"),i=e.filter(o=>o.source!=="official"&&(!t||o.hospitalId===t));return a.marketingFilter==="official"?n:a.marketingFilter==="hospital"?i:[...n,...i]}function $l(){const e=Mt(),t=yl(),n=e.filter(r=>r.source==="official").length,i=$e(),o=w()?0:e.filter(r=>r.source!=="official"&&r.hospitalId===(i?.id||"")).length;return`
      <div class="admin-page-head">
        <div><h1>展业海报</h1><p>${w()?"统一维护平台官方海报，医院自有物料由本院运营自行上传":"官方海报可直接分享，本院自有海报由你上传维护"}</p></div>
        <span class="admin-page-head__date">${t.length} 张可分享</span>
      </div>
      ${ge()}
      <div class="marketing-tools ${w()?"marketing-tools--single":""}">
        ${w()?'<span class="marketing-scope-label">官方海报</span>':`<div class="marketing-filter">
                ${[["all","全部"],["official","官方海报"],["hospital","本院海报"]].map(([r,c])=>`
                      <button class="${a.marketingFilter===r?"is-active":""}"
                        type="button" data-action="marketing-filter" data-value="${r}">${c}</button>
                    `).join("")}
              </div>`}
        <button class="btn btn--primary btn--sm" type="button" data-action="marketing-poster-add">
          ${l("plus",13)} ${w()?"上传官方海报":"上传本院海报"}
        </button>
      </div>
      <section class="marketing-hero">
        <span class="marketing-hero__badge">${l("send",13)} 统一展业海报库</span>
        <h2>把专业服务，变成可分享的邀请</h2>
        <p>${w()?"平台官方海报由超级管理员维护；医院运营可保存、下载并分享，也可自行上传本院物料。":"官方海报可直接保存分享；本院自有海报由你上传维护，保存后即可分享或下载。"}海报仅保留预约二维码，不展示项目人员姓名与电话。</p>
        <div class="marketing-hero__facts">
          <span><b>${n}</b>张官方</span>
          ${w()?"":`<span><b>${o}</b>张本院自有</span>`}
        </div>
      </section>
      ${t.length?`<div class="poster-list">
        ${t.map(r=>`
            <button class="poster-card" type="button" data-action="open-poster" data-poster-id="${s(r.id)}">
              <span class="poster-card__visual">
                <img src="${s(Cn(r))}" alt="${s(r.title)}" loading="eager" decoding="async">
                <i>${s(r.eyebrow)}</i>
                <em class="poster-card__scope ${r.source==="official"?"is-official":"is-hospital"}">${s(Ro(r))}</em>
              </span>
              <span class="poster-card__copy">
                <strong>${s(r.title)}</strong>
                <span>${s(r.desc)}</span>
                <span class="poster-card__tags">${(r.tags||[]).map(c=>`<i>${s(c)}</i>`).join("")}</span>
                <b>查看 · 下载 · 分享 ${l("arrowRight",12)}</b>
              </span>
            </button>
          `).join("")}</div>`:`<div class="empty-state marketing-empty">
              <span class="empty-state__icon">${l("send",26)}</span>
              <h3>${w()?"暂无官方海报":a.marketingFilter==="hospital"?"暂无本院海报":"暂无海报"}</h3>
              <p>${w()?"上传官方海报后，各医院运营即可下载分享。":"可上传本院自有海报，保存后直接分享给客户。"}</p>
              <button class="btn btn--primary btn--sm" type="button" data-action="marketing-poster-add">
                ${l("plus",13)} ${w()?"上传官方海报":"上传本院海报"}
              </button>
              ${w()?`<button class="btn btn--ghost btn--sm" type="button" data-action="marketing-poster-reset">
                      恢复官方海报
                    </button>`:""}
            </div>`}
      <div class="marketing-guide">
        <div><span>01</span><strong>平台维护官方海报</strong><p>超级管理员维护品牌主视觉与标准海报。</p></div>
        <div><span>02</span><strong>医院维护本院物料</strong><p>各医院运营自行上传、编辑和删除本院海报，平台不代为管理。</p></div>
        <div><span>03</span><strong>下载或分享给客户</strong><p>保存高清图发朋友圈，或复制预约链接。</p></div>
      </div>
    `}function Ra(){a.posterViewUrl?.startsWith("blob:")&&URL.revokeObjectURL(a.posterViewUrl),a.posterViewUrl=""}function kl(){const e=a.marketingDraft;e?.previewUrl?.startsWith("blob:")&&URL.revokeObjectURL(e.previewUrl),e?.imageKey&&e.imageKey!==(e.originalImageKey||"")&&xt(e.imageKey),a.marketingDraft=null}function Cn(e){return e?.thumb||e?.image||""}async function wl(e){const t=Nt(e);if(t&&(Ra(),a.posterId=e,a.overlay={type:"poster",posterId:e},b(),t.imageKey))try{const n=await No(t.imageKey);if(!n||a.posterId!==e)return;a.posterViewUrl=URL.createObjectURL(n),b()}catch{d("海报原图读取失败，已显示缩略图。")}}function _l(){const e=Nt(a.posterId);if(!e)return"";const t=Nn(e),n=a.posterViewUrl||Cn(e);return`
      <div class="sheet-backdrop" data-action="close-overlay"></div>
      <section class="sheet poster-sheet" role="dialog" aria-modal="true" aria-label="海报预览">
        <div class="sheet__grabber"></div>
        <div class="sheet__bar">
          <div><h2>${s(e.eyebrow||"展业海报")}</h2><p>${s(Ro(e))} · 高清海报</p></div>
          <button class="sheet__close" type="button" data-action="close-overlay" aria-label="关闭">${l("close",15)}</button>
        </div>
        <div class="sheet__body">
          <div class="poster-sheet__frame">
            <img src="${s(n)}" alt="${s(e.title)}" decoding="async"
              style="background-image:url('${s(Cn(e))}')">
          </div>
          <div class="poster-sheet__meta">
            <span>${(e.tags||[]).map(i=>`<i>${s(i)}</i>`).join("")}</span>
            <strong>${s(e.title)}</strong>
            <p>${s(e.desc)}</p>
            <p>二维码统一指向企业健康服务平台。微信中可直接长按图片保存到相册，再发送朋友圈或客户群。</p>
            ${t?`<div class="poster-admin-actions">
                    <button class="btn btn--ghost btn--sm" type="button" data-action="marketing-poster-edit">${l("edit",13)} 编辑</button>
                    <button class="btn btn--ghost btn--sm poster-delete" type="button" data-action="marketing-poster-delete">${l("trash",13)} 删除</button>
                  </div>`:""}
          </div>
        </div>
        <div class="sheet__footer">
          <button class="btn btn--primary" type="button" data-action="save-poster">${l("checkCircle",15)} 保存高清海报</button>
          <button class="btn btn--ghost" type="button" data-action="marketing-poster-share">${l("send",14)} 分享给客户</button>
        </div>
      </section>
    `}function Oo(e=""){const t=e?Nt(e):null;if(t&&!Nn(t))return d("只能编辑本账号可管理的海报。");const n=$e();a.marketingDraft=t?{...t,tagsText:(t.tags||[]).join("、"),previewUrl:t.thumb||t.image||"",originalImageKey:t.imageKey||""}:{id:"",source:w()?"official":"hospital",hospitalId:w()?"":n?.id||"",eyebrow:w()?"官方海报":`${n?.short||"本院"} · 自有海报`,title:"",desc:"",tagsText:"",image:"",imageKey:"",thumb:"",previewUrl:"",originalImageKey:"",builtin:!1},a.overlay={type:"poster-upload"},b()}function Sl(){const e=a.marketingDraft;if(!e)return"";const t=!!e.id,n=e.previewUrl||e.image||e.thumb;return`
      <div class="sheet-backdrop" data-action="close-overlay"></div>
      <section class="sheet poster-upload-sheet" role="dialog" aria-modal="true" aria-label="上传海报">
        <div class="sheet__grabber"></div>
        <div class="sheet__bar">
          <div><h2>${t?"编辑海报":"上传海报"}</h2><p>${w()?"官方海报，统一供医院运营下载分享":"本院自有海报，仅本院运营可见"}</p></div>
          <button class="sheet__close" type="button" data-action="close-overlay" aria-label="关闭">${l("close",15)}</button>
        </div>
        <div class="sheet__body">
          <div class="sheet-pad">
            <div class="poster-upload-preview ${n?"has-image":""}">
              ${n?`<img src="${s(n)}" alt="海报预览">`:`<span>${l("send",22)}<strong>上传海报图片</strong><small>建议竖版 1080×1920，支持 JPG / PNG</small></span>`}
              <label class="poster-upload-action">
                ${n?"更换图片":"选择图片"}
                <input type="file" accept="image/*" data-marketing-file hidden>
              </label>
            </div>
            <div class="field"><label>海报标题 <em>*</em></label>
              <input type="text" data-marketing-field="title" value="${s(e.title||"")}" placeholder="如：让权威医疗，走近企业">
            </div>
            <div class="field-row">
              <div class="field"><label>角标 / 场景</label>
                <input type="text" data-marketing-field="eyebrow" value="${s(e.eyebrow||"")}" placeholder="如：权威主视觉">
              </div>
              <div class="field"><label>标签</label>
                <input type="text" data-marketing-field="tagsText" value="${s(e.tagsText||"")}" placeholder="用顿号分隔，如：医院权威、名医资源">
              </div>
            </div>
            <div class="field"><label>海报说明</label>
              <textarea data-marketing-field="desc" placeholder="填写这张海报适合的使用场景">${s(e.desc||"")}</textarea>
            </div>
            <p class="field-help">${l("shield",12)} 海报由${w()?"超级管理员统一配置":"医院运营上传"}。保存后可在列表中下载、分享给客户。</p>
          </div>
        </div>
        <div class="sheet__footer">
          <button class="btn btn--ghost" type="button" data-action="close-overlay">取消</button>
          <button class="btn btn--primary" type="button" data-action="marketing-poster-save">
            ${t?"保存修改":"保存海报"} ${l("check",14)}
          </button>
        </div>
      </section>
    `}function Il(){const e=a.marketingDraft;return e?(document.querySelectorAll("[data-marketing-field]").forEach(t=>{e[t.dataset.marketingField]=t.value.trim()}),e):null}function Dl(e){return new Promise((t,n)=>{const i=URL.createObjectURL(e),o=new Image;o.onload=()=>{t({image:o,cleanup:()=>URL.revokeObjectURL(i)})},o.onerror=()=>{URL.revokeObjectURL(i),n(new Error("图片读取失败"))},o.src=i})}function Tl(e){return new Promise((t,n)=>{const i=URL.createObjectURL(e),o=new Image;o.onload=()=>{t({image:o,cleanup:()=>URL.revokeObjectURL(i)})},o.onerror=()=>{URL.revokeObjectURL(i),n(new Error("图片读取失败"))},o.src=i})}async function xl(e,t){return e.toBlob?new Promise((n,i)=>{e.toBlob(o=>{o?n(o):i(new Error("图片压缩失败"))},"image/jpeg",t)}):Qt(e.toDataURL("image/jpeg",t))}async function ta(e,t,n){const i=Math.min(1,t/Math.max(e.width,e.height)),o=Math.max(1,Math.round(e.width*i)),r=Math.max(1,Math.round(e.height*i)),c=document.createElement("canvas");c.width=o,c.height=r;const p=c.getContext("2d");return p.fillStyle="#ffffff",p.fillRect(0,0,o,r),p.drawImage(e,0,0,o,r),{blob:await xl(c,n),width:o,height:r}}function Ho(e){return new Promise((t,n)=>{const i=new FileReader;i.onload=()=>t(String(i.result||"")),i.onerror=()=>n(i.error||new Error("缩略图生成失败")),i.readAsDataURL(e)})}async function Al(e){if(e.imageKey)return!0;if(!e.image)return!1;if(!String(e.image).startsWith("data:image"))return!0;const t=await Qt(e.image),n=await Tl(t);try{const i=await ta(n.image,1920,.82),o=await ta(n.image,420,.72),r=`poster-image-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;return await Mo(r,i.blob,{name:"poster.jpg",type:"image/jpeg",width:i.width,height:i.height}),e.imageKey=r,e.image="",e.thumb=await Ho(o.blob),!0}finally{n.cleanup()}}async function Ml(){const e=Il();if(!e)return;if(!e.title?.trim())return d("请填写海报标题。");try{if(!await Al(e))return d("请先上传海报图片。")}catch(c){return console.warn("poster image persist failed",c),d("海报图片保存失败，请换一张图片重试。")}const t=String(e.tagsText||"").split(/[、,，/]/).map(c=>c.trim()).filter(Boolean),n=Mt(),i=new Date().toISOString(),o={id:e.id||`poster-${Date.now()}`,source:e.id?e.source||"official":w()?"official":"hospital",hospitalId:e.id?e.hospitalId||"":w()?"":$e()?.id||"",eyebrow:e.eyebrow?.trim()||(w()?"官方海报":"本院海报"),title:e.title.trim(),desc:e.desc?.trim()||(w()?"平台官方展业海报，可直接下载分享。":"本院展业海报，可直接下载分享。"),tags:t,image:e.imageKey?"":e.image,imageKey:e.imageKey||"",thumb:e.thumb||e.image||"",builtin:!!e.builtin,createdAt:e.createdAt||i,updatedAt:i},r=e.id?n.map(c=>c.id===e.id?o:c):[o,...n];try{Mn(r)}catch{return d("海报资料保存失败，请检查浏览器存储空间。")}e.originalImageKey&&e.originalImageKey!==o.imageKey&&xt(e.originalImageKey),e.previewUrl?.startsWith("blob:")&&URL.revokeObjectURL(e.previewUrl),a.marketingDraft=null,a.overlay=null,F(),g({scrollTo:Q()}),d(e.id?"海报已更新。":"海报已保存，可下载或分享。")}async function Nl(e){if(!e||!a.marketingDraft)return;if(!/^image\//.test(e.type))return d("请选择图片文件。");if(e.size>25*1024*1024)return d("海报图片请控制在 25MB 以内。");const t=a.marketingDraft;d("正在压缩海报图片…");let n=null;try{n=await Dl(e);const i=await ta(n.image,1920,.86),o=i.blob.size>900*1024?await ta(n.image,1920,.68):i,r=await ta(n.image,420,.72),c=`poster-image-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;if(await Mo(c,o.blob,{name:e.name||"poster.jpg",type:"image/jpeg",width:o.width,height:o.height}),a.marketingDraft!==t){xt(c);return}t.imageKey&&t.imageKey!==(t.originalImageKey||"")&&xt(t.imageKey),t.previewUrl?.startsWith("blob:")&&URL.revokeObjectURL(t.previewUrl),t.imageKey=c,t.image="",t.thumb=await Ho(r.blob),t.previewUrl=URL.createObjectURL(o.blob),b(),d("海报图片已就绪，保存后即可分享。")}catch(i){console.warn("poster upload failed",i),d("海报图片处理失败，请换一张 JPG / PNG 图片。")}finally{n?.cleanup()}}async function Cl(){const e=Nt(a.posterId);if(e){if(!Nn(e))return d("无权删除该海报。");window.confirm(`确定删除「${e.title}」吗？`)&&(Mn(Mt().filter(t=>t.id!==e.id)),await xt(e.imageKey),Ra(),a.posterId="",a.overlay=null,F(),g({scrollTo:Q()}),d("海报已删除。"))}}async function Pl(){const e=Nt(a.posterId);if(!e)return;const t=`【北京大学国际医院 · 名医入企】${e.title} ${ia}`;if(navigator.share)try{await navigator.share({title:e.title,text:`${e.desc||e.title}
${ia}`,url:ia});return}catch(i){if(i?.name==="AbortError")return}const n=await Na(t);d(n?"分享文案与预约链接已复制，可粘贴发送给客户。":"请手动复制链接分享给客户。")}async function Ll(){const e=Nt(a.posterId);if(!e)return;let t=null;try{if(a.posterViewUrl?t=await(await fetch(a.posterViewUrl)).blob():e.imageKey&&(t=await No(e.imageKey)),!t){const r=e.image||e.thumb;if(!r)throw new Error("海报原图不存在");t=r.startsWith("data:")?await Qt(r):await(await fetch(r)).blob()}}catch(r){return console.warn("poster download failed",r),d("高清海报读取失败，请稍后重试或长按预览图保存。")}const n=(t.type||"").includes("png")?"png":"jpg",i=URL.createObjectURL(t),o=document.createElement("a");o.href=i,o.download=`${e.title||"北大医疗名医入企"}.${n}`,document.body.appendChild(o),o.click(),o.remove(),window.setTimeout(()=>URL.revokeObjectURL(i),4e3),d("高清海报已打开。若微信未自动保存，请长按预览图保存到相册。")}function El(){return`
      <div class="loading-screen">
        <img src="assets/logo.svg" alt="北京大学国际医院">
        <span class="loading-spinner"></span>
        <p>正在加载企业健康服务…</p>
      </div>
    `}function Rl(){return`
      <div class="loading-screen">
        <img src="assets/logo.svg" alt="北京大学国际医院">
        <h2>数据加载失败</h2>
        <p>${s(a.loadError||"请检查网络后刷新页面。")}</p>
        <button class="btn btn--primary" type="button" onclick="location.reload()">重新加载</button>
      </div>
    `}function g({scrollTo:e=null,animate:t=!1}={}){if(!De)return;const n=Q(),i=t||!a.renderedOnce;if(!a.loaded){De.innerHTML=El();return}if(a.loadError){De.innerHTML=Rl();return}if(a.screen==="auth")De.innerHTML=As();else if(a.screen==="admin-login")De.innerHTML=kn();else if(a.screen==="admin")a.adminAuthed?(a.adminTab==="hospitals"&&!w()&&(a.adminTab="appointments"),De.innerHTML=ec(),a.adminTab==="slots"&&Ke(),window.requestAnimationFrame(Ts)):(a.screen="admin-login",De.innerHTML=kn());else{let o="";a.tab==="experts"?o=Ys():a.tab==="appointments"?o=Mr():a.tab==="me"?o=Vr():o=Vs(),De.innerHTML=Os(a.tab,o)}i||De.querySelector(".app-content, .auth-screen, .admin-screen, .admin-login")?.classList.add("is-instant"),b(),a.renderedOnce=!0,Mi(e===null?n:e)}function aa(){const e=document.getElementById("admin-record-list");if(!e)return;const t=co();e.innerHTML=t.length?t.map(lo).join(""):po()}function Ol(){const e=ro();document.querySelectorAll("[data-admin-stat]").forEach(t=>{t.textContent=String(e[t.dataset.adminStat]||0)})}function Hl(){const e=document.getElementById("doctor-admin-list");if(!e)return;const t=Do();e.innerHTML=t.length?t.map(To).join(""):`<div class="empty-state"><span class="empty-state__icon">${l("experts",26)}</span><h3>没有匹配专家</h3><p>请调整搜索条件或新增专家。</p></div>`}function Bo(){const e=document.getElementById("expert-scope-hint");if(!e)return;const t=mt(),n=ae();if(a.expertMonth>0){e.innerHTML=`${l("leaf",11)} 时令主题按「课题履约地」判断，区别于专家日常服务的履约城市；当前查看 ${s(a.expertScope==="nearby"?t?.name||"就近医院":"全部医院")} · ${s(C(n.province,n.city))}`;return}const i=a.expertService==="all"?"全部服务":L(a.expertService);e.innerHTML=a.expertScope==="nearby"?`${l("mapPin",11)} 优先展示 ${s(t?.name||"就近医院")}的${s(i)}专家${a.expertAvailability==="all"?" · 含暂无号源专家":a.expertAvailability==="local"?" · 仅显示本院可约专家":" · 仅显示当前可约专家"}`:`${l("mapPin",11)} ${a.expertAvailability==="local"?"当地医院":"全部医院"}中，展示可服务${s(C(n.province,n.city))}的${s(i)}专家${a.expertAvailability==="all"?" · 含暂无号源":" · 当前可约"}`}function Bl(e){const t=e.target;if(t.matches("[data-slot-batch]")){a.slotBatch[t.dataset.slotBatch]=t.value,wo();return}if(t.matches("[data-marketing-field]")&&a.marketingDraft){a.marketingDraft[t.dataset.marketingField]=t.value;return}if(t.matches("[data-login-field]")){const n=t.dataset.loginField;a.login[n]=t.type==="checkbox"?t.checked:t.value,a.login.error="";return}if(t.matches("[data-admin-login]")){const n=t.dataset.adminLogin;a.adminLogin=a.adminLogin||{username:"",password:"",error:""},a.adminLogin[n]=t.value;return}if(t.matches("[data-hospital-phone-input]")&&a.hospitalPhoneDraft){a.hospitalPhoneDraft.phone=t.value;return}if(t.matches("[data-hospital-field]")&&a.hospitalEditorDraft){const n=t.dataset.hospitalField;a.hospitalEditorDraft[n]=n==="lat"||n==="lng"?Number(t.value):t.value;return}if(t.matches("[data-expert-search]")){a.expertSearch=t.value,Ul();return}if(t.matches("[data-booking-field]")&&a.booking){je(),a.booking[t.dataset.bookingField]=t.value,t.dataset.bookingField==="customTopic"&&(a.booking.themeMonth=0,a.booking.themeTopicId="",a.booking.themeCoverage="",document.querySelectorAll(".topic-chip").forEach(n=>{n.classList.remove("is-active"),n.querySelector(".topic-chip__select")?.classList.remove("is-active")}),document.querySelector(".booking-topic-coverage")?.remove(),Fl());return}if(t.matches("[data-booking-agree]")&&a.booking){a.booking.agree=t.checked,t.checked&&je();return}if(t.matches("[data-location-field]")&&a.appointmentLocationDraft){a.appointmentLocationDraft[t.dataset.locationField]=t.value;return}if(t.matches("[data-demand-field]")&&a.overlay?.draft){a.overlay.draft[t.dataset.demandField]=t.value;return}if(t.matches("[data-profile-field]")&&a.profileDraft){a.profileDraft[t.dataset.profileField]=t.value;return}if(t.matches("[data-admin-search]")){a.adminSearch=t.value,ql();return}if(t.matches("[data-admin-doctor-search]")){a.adminDoctorSearch=t.value,Vl();return}if(t.matches("[data-account-field]")&&a.adminAccountDraft){a.adminAccountDraft[t.dataset.accountField]=t.value;return}if(t.matches("[data-institution-field]")&&a.institutionAccountDraft){a.institutionAccountDraft[t.dataset.institutionField]=t.value;return}if(t.matches("[data-institution-active]")&&a.institutionAccountDraft){a.institutionAccountDraft.active=t.checked;return}if(t.matches("[data-account-active]")&&a.adminAccountDraft){a.adminAccountDraft.active=t.checked;return}if(t.matches("[data-doctor-field]")&&a.adminDoctorDraft){a.adminDoctorDraft[t.dataset.doctorField]=t.value;return}if(t.matches("[data-theme-field]")&&a.adminThemeDraft){a.adminThemeDraft[t.dataset.themeField]=t.value;return}if(t.matches("[data-theme-topic-field]")&&a.adminThemeDraft){const n=a.adminThemeDraft.topics?.[Number(t.dataset.index)];n&&(n[t.dataset.themeTopicField]=t.value),t.dataset.themeTopicField==="expertId"&&t.value&&(a.adminThemeDraft.expertIds=[...new Set([...a.adminThemeDraft.expertIds||[],t.value])]);return}t.matches("[data-doctor-active]")&&a.adminDoctorDraft&&(a.adminDoctorDraft.active=t.checked)}function jl(e){const t=e.target;if(t.matches("[data-login-field]")){const n=t.dataset.loginField;a.login[n]=t.type==="checkbox"?t.checked:t.value,a.login.error="";return}if(t.matches("[data-expert-month]")){a.expertMonth=Math.max(0,Number(t.value)||0),a.expertService=a.expertMonth>0?"讲座":"all",Kt(),Se();return}if(t.matches("[data-expert-dept]")){a.expertDept=t.value||"all",Se();return}if(t.matches("[data-home-hospital-picker]")){ti(t.value||"");return}if(t.matches("[data-home-region-province]")&&a.homeRegionDraft){a.homeRegionDraft.province=t.value,a.homeRegionDraft.city=(a.chinaCities?.[t.value]||[t.value])[0]||t.value;const n=document.querySelector("[data-home-region-city]");n&&(n.innerHTML=me(a.homeRegionDraft.province,a.homeRegionDraft.city));return}if(t.matches("[data-home-region-city]")&&a.homeRegionDraft){a.homeRegionDraft.city=t.value;return}if(t.matches("[data-booking-province]")&&a.booking){gr(t.value);return}if(t.matches("[data-booking-city]")&&a.booking){if(G(a.booking))return d("活动省市已由提需单和院方匹配锁定，如需调整请联系项目人员。");a.booking.city=t.value,Qi();return}if(t.matches("[data-location-province]")&&a.appointmentLocationDraft){a.appointmentLocationDraft.province=t.value,a.appointmentLocationDraft.city=(a.chinaCities?.[t.value]||[t.value])[0];const n=document.querySelector("[data-location-city]");n&&(n.innerHTML=me(a.appointmentLocationDraft.province,a.appointmentLocationDraft.city));return}if(t.matches("[data-location-city]")&&a.appointmentLocationDraft){a.appointmentLocationDraft.city=t.value;return}if(t.matches("[data-demand-province]")&&a.overlay?.draft){a.overlay.draft.province=t.value,a.overlay.draft.city=(a.chinaCities?.[t.value]||[t.value])[0];const n=document.querySelector("[data-demand-city]");n&&(n.innerHTML=me(a.overlay.draft.province,a.overlay.draft.city));return}if(t.matches("[data-demand-target]")&&a.overlay?.draft){const n=t.value;a.overlay.draft.targetType=n==="group"?"group":"hospital",a.overlay.draft.hospitalId=n==="group"?"":n||a.hospitals[0]?.id||"";return}if(t.matches("[data-demand-city]")&&a.overlay?.draft){a.overlay.draft.city=t.value;return}if(t.matches("[data-institution-province]")&&a.institutionAccountDraft){a.institutionAccountDraft.province=t.value,a.institutionAccountDraft.city=(a.chinaCities?.[t.value]||[t.value])[0]||t.value;const n=document.querySelector("[data-institution-city]");n&&(n.innerHTML=me(a.institutionAccountDraft.province,a.institutionAccountDraft.city));return}if(t.matches("[data-institution-city]")&&a.institutionAccountDraft){a.institutionAccountDraft.city=t.value;return}if(t.matches("[data-hospital-province]")&&a.hospitalEditorDraft){a.hospitalEditorDraft.province=t.value,a.hospitalEditorDraft.city=(a.chinaCities?.[t.value]||[t.value])[0]||t.value;const n=document.querySelector("[data-hospital-city]");n&&(n.innerHTML=me(a.hospitalEditorDraft.province,a.hospitalEditorDraft.city));return}if(t.matches("[data-hospital-city]")&&a.hospitalEditorDraft){a.hospitalEditorDraft.city=t.value;return}if(t.matches("[data-theme-topic-coverage-province]")&&a.adminThemeDraft){const n=a.adminThemeDraft.topics?.[Number(t.dataset.index)];if(!n)return;n.coverageProvince=t.value,n.coverageCity=(a.chinaCities?.[t.value]||[t.value])[0]||t.value;const i=document.querySelector(`[data-theme-topic-coverage-city][data-index="${t.dataset.index}"]`);i&&(i.innerHTML=ka(n.coverageProvince,n.coverageCity));return}if(t.matches("[data-theme-topic-coverage-city]")&&a.adminThemeDraft){const n=a.adminThemeDraft.topics?.[Number(t.dataset.index)];n&&(n.coverageCity=t.value);return}if(t.matches("[data-doctor-coverage-province]")&&a.adminDoctorDraft){a.adminDoctorDraft.coverageProvince=t.value,a.adminDoctorDraft.coverageCity=(a.chinaCities?.[t.value]||[t.value])[0]||t.value;const n=document.querySelector("[data-doctor-coverage-city]");n&&(n.innerHTML=ka(a.adminDoctorDraft.coverageProvince,a.adminDoctorDraft.coverageCity));return}if(t.matches("[data-doctor-coverage-city]")&&a.adminDoctorDraft){a.adminDoctorDraft.coverageCity=t.value,a.adminDoctorDraft.coverageCities=Li(a.adminDoctorDraft.coverageCities,t.value),ln();return}if(t.matches("[data-theme-topic-field]")&&a.adminThemeDraft){const n=Number(t.dataset.index),i=a.adminThemeDraft.topics?.[n];if(i&&(i[t.dataset.themeTopicField]=t.value),t.dataset.themeTopicField==="expertId"&&t.value&&i){a.adminThemeDraft.expertIds=[...new Set([...a.adminThemeDraft.expertIds||[],t.value])];const o=D(t.value);if(o){i.coverageCities?.length||(i.coverageCities=pt(o),i.coverage=te(i.coverageCities));const r=Vt(i.coverageCities,o.province||o.region||""),c=(i.coverageCities||[]).find(p=>p!=="全国"&&(a.chinaCities?.[r]||[]).includes(p));i.coverageProvince=r,i.coverageCity=c||a.chinaCities?.[r]?.[0]||r,b()}}return}if(t.matches("[data-review-speaker]")&&a.adminDraft){const n=D(t.value);a.adminDraft.speakerId=t.value,a.adminDraft.speaker=n?`${n.name} · ${n.deptTitle}`:"";return}if(t.matches("[data-review-service]")&&a.adminDraft){a.adminDraft.serviceType=t.value;const n=D(a.adminDraft.speakerId);n&&!j(n,t.value)&&(a.adminDraft.speakerId="",a.adminDraft.speaker="");const i=U(a.adminReviewId),o=document.querySelector("[data-review-speaker]");o&&i&&(o.innerHTML=`<option value="" disabled ${a.adminDraft.speakerId?"":"selected"}>请选择本院出讲专家</option>${uo(a.adminDraft,i.hospitalId)}`);return}if(t.matches("[data-admin-hospital]")){if(ko()>0)return t.value=a.adminHospitalId||"",d("有未保存的号源修改，请先统一保存或重置后再切换医院。");a.adminHospitalId=t.value,a.slotDoctorId="",a.slotDraft={},g({scrollTo:Me(xi())});return}if(t.matches("[data-slot-doctor]")){a.slotDoctorId=t.value;{const n=lt(),i=Math.max(1,Number(n?.leadDays)||Y(n).leadDays);a.slotBatch.from=N(M(O(),i)),a.slotBatch.to=N(M(O(),i+30))}Ke();return}if(t.matches("[data-slot-batch='scope']")){a.slotBatch.scope=t.value;return}if(t.matches("[data-doctor-photo]")){Wc(t.files?.[0]);return}if(t.matches("[data-marketing-file]")){Nl(t.files?.[0]);return}t.matches("[data-review-pdf]")&&ol(t.files?.[0])}const Ul=da(Se,140),Fl=da(Da,140),ql=da(aa,140),Vl=da(Hl,140);async function jo(e,t){switch(e){case"tab":{const i=t.dataset.tab||"home",o=a.tab,r=Q(),c=a.screen==="main"&&!a.overlay&&i!==o;Ai(),c&&(sn({pkuihLayer:"tab",pkuihTab:o,pkuihScroll:r}),gt("tab",0,{tab:o,scroll:r})),a.overlay&&(F(),ue()),a.screen="main",a.tab=i,a.tab==="experts"&&!a.expertVisited&&($t(),a.expertVisited=!0);const p=Me(`main:${a.tab}`);c&&sn({pkuihLayer:"tab",pkuihTab:a.tab,pkuihScroll:p}),g({scrollTo:p}),a.tab==="home"&&a.geoStatus==="idle"&&Ga();break}case"start-login":{const i=t.dataset.pending?{type:"tab",tab:t.dataset.pending}:null;bt(i);break}case"auth-close":a.authHistory&&(a.authHistory=!1,Ni()),a.screen="main",a.pendingAuth=null,a.login.step=1,g({scrollTo:Me(`main:${a.tab}`)});break;case"login-next":Cs();break;case"demo-login":Ms();break;case"login-back":a.login.step=1,g({scrollTo:0});break;case"login-submit":Ps();break;case"send-code":if(!/^1\d{10}$/.test(a.login.phone))return d("请先输入正确的手机号。");Ns(),d("验证码已发送（演示环境固定 888888）。");break;case"open-admin":Xr();break;case"admin-close":a.adminHistory&&(a.adminHistory=!1,Ni()),a.screen="main",a.tab="home",Bt("client"),g({scrollTo:Me("main:home")});break;case"admin-logout":Ka(),a.adminLogin={username:"",password:"",error:""},a.screen="admin-login",g({scrollTo:0});break;case"admin-login":Yr();break;case"admin-tab":Ai(),a.adminTab=t.dataset.value,a.overlay=null,a.adminThemeDraft=null,a.adminTemplateDraft=null,g({scrollTo:Me(`admin:${a.adminTab}`)});break;case"admin-owner-scope":a.adminOwnerScope=t.dataset.value==="mine"?"mine":"all",document.querySelectorAll('[data-action="admin-owner-scope"]').forEach(i=>{i.classList.toggle("is-active",i.dataset.value===a.adminOwnerScope)});const n=document.querySelector("[data-admin-owner-hint]");n&&(n.textContent=a.adminOwnerScope==="mine"?"我的项目 + 全部待接单":"本院全部运营项目"),Ol(),aa();break;case"admin-filter":a.adminFilter=t.dataset.value,document.querySelectorAll('[data-action="admin-filter"]').forEach(i=>{i.classList.toggle("is-active",i.dataset.value===a.adminFilter)}),aa();break;case"admin-demand-filter":a.adminDemandFilter=t.dataset.value,pc();break;case"open-admin-appointment":{const i=U(t.dataset.appointmentId);if(!i)return d("预约记录不存在。");if(!ve(i.hospitalId))return d("无权查看其他医院的预约。");a.adminReviewId=i.id,a.adminDraft=Ma(i)}a.adminNoteEditing=!1,a.adminReviewSaved=!1,a.overlay={type:"admin-review"},b();break;case"open-admin-demand":{const i=le(t.dataset.demandId);if(!i)return d("需求记录不存在。");if(!fa(i))return d(i.targetType==="group"?"集团企康办需求仅超级管理员可查看。":"无权查看其他医院的需求。");a.adminDemandId=i.id}a.overlay={type:"admin-demand"},b();break;case"review-accept":{ac();break}case"review-save":nc();break;case"review-edit-again":a.adminReviewSaved=!1,a.adminNoteEditing=!1,b();break;case"review-complete":ic();break;case"review-note-edit":a.adminNoteEditing=!0,b();break;case"review-note-cancel":a.adminNoteEditing=!1,b();break;case"review-note-save":oc();break;case"review-sms-copy":rc(t);break;case"review-email-copy":cc(t);break;case"review-pdf-clear":a.adminDraft&&(a.adminDraft.planPdf=null,a.adminDraft.planPdfBlob=null,a.adminDraft.planPdfRemoved=!0,b(),d("已移除方案附件，保存后生效。"));break;case"admin-demand-contact":yo("");break;case"admin-demand-followup":{const i=document.querySelector("[data-demand-followup]")?.value.trim()||"",o=le(a.adminDemandId);if(!i&&o?.status!=="pending")return d("请先填写沟通记录。");yo(i);break}case"admin-demand-match":hc();break;case"admin-demand-close":vc();break;case"slot-month":gc(Number(t.dataset.value));break;case"slot-doctor-pick":a.slotDoctorId=t.dataset.doctorId||"";{const i=lt(),o=Math.max(1,Number(i?.leadDays)||Y(i).leadDays);a.slotBatch.from=N(M(O(),o)),a.slotBatch.to=N(M(O(),o+30))}Ke();break;case"slot-day-open":Sc(t.dataset.value);break;case"slot-day-step":Dc(Number(t.dataset.value));break;case"slot-day-set":{const i=D(a.overlay?.doctorId),o=a.overlay?.date;if(!i||!o)return;const r=ot(i.id,o);In(i.id,o,Math.max(r,Number(t.dataset.value))),b();break}case"slot-day-save":{const i=D(a.overlay?.doctorId),o=a.overlay?.date;if(!i||!o)return;if(Sn(i.id,o)<ot(i.id,o))return d("号源数不能低于已预约数量。");a.overlay=null,F(),b(),Ke(),d("已加入号源草稿。");break}case"slot-batch-apply":Tc();break;case"slot-weekday":{const i=Number(t.dataset.value),o=a.slotBatch.weekdays;a.slotBatch.weekdays=o.includes(i)?o.filter(r=>r!==i):o.concat(i).sort(),t.classList.toggle("is-active");break}case"slot-preset":{const i=Number(t.dataset.value),o=lt(),r=Math.max(1,Number(o?.leadDays)||Y(o).leadDays);a.slotBatch.from=N(M(O(),r)),a.slotBatch.to=N(M(O(),r+i-1)),wo();break}case"slot-save":_o();break;case"slot-reset":xc();break;case"admin-doctor-add":xo();break;case"open-admin-doctor":xo(t.dataset.doctorId);break;case"doctor-service":{if(!a.adminDoctorDraft)return;const i=t.dataset.value,o=a.adminDoctorDraft.services||[];a.adminDoctorDraft.services=o.includes(i)?o.filter(r=>r!==i):o.concat(i),t.classList.toggle("is-active");break}case"doctor-avatar":{if(!a.adminDoctorDraft)return;a.adminDoctorDraft.gender=t.dataset.gender,a.adminDoctorDraft.senior=t.dataset.senior==="1",a.adminDoctorDraft.photo="",a.adminDoctorDraft.photoCard="",a.adminDoctorDraft.photoDetail="",b();break}case"doctor-photo-clear":if(!a.adminDoctorDraft)return;a.adminDoctorDraft.photo="",a.adminDoctorDraft.photoCard="",a.adminDoctorDraft.photoDetail="",b();break;case"doctor-city-remove":if(!a.adminDoctorDraft)return;a.adminDoctorDraft.coverageCities=(a.adminDoctorDraft.coverageCities||[]).filter(i=>i!==t.dataset.city),ln();break;case"doctor-coverage-national":if(!a.adminDoctorDraft)return;a.adminDoctorDraft.coverageCities=a.adminDoctorDraft.coverageCities?.includes("全国")?[a.adminDoctorDraft.coverageCity||"北京市"]:["全国"],ln();break;case"admin-doctor-save":zc();break;case"admin-template-add":Io();break;case"admin-template-edit":Io(t.dataset.templateId||"");break;case"admin-template-delete":Ec(t.dataset.templateId||"");break;case"admin-template-save":Lc();break;case"review-import-template":{const i=document.querySelector("[data-review-template]");Rc(i?.value||"");break}case"open-admin-theme":Hc(t.dataset.month);break;case"theme-topic-coverage-remove":{if(!a.adminThemeDraft)return;const i=Number(t.closest("[data-topic-coverage-index]")?.dataset.topicCoverageIndex),o=a.adminThemeDraft.topics?.[i];if(!o)return;o.coverageCities=(o.coverageCities||[]).filter(r=>r!==t.dataset.city),o.coverage=te(o.coverageCities),Tn(i);break}case"theme-topic-coverage-national":{if(!a.adminThemeDraft)return;const i=Number(t.dataset.index),o=a.adminThemeDraft.topics?.[i];if(!o)return;o.coverageCities=o.coverageCities?.includes("全国")?[]:["全国"],o.coverage=te(o.coverageCities),Tn(i);break}case"theme-topic-coverage-add":{if(!a.adminThemeDraft)return;const i=Number(t.dataset.index),o=a.adminThemeDraft.topics?.[i];if(!o?.coverageCity)return d("请先选择要添加的城市。");if(o.coverageCities?.includes(o.coverageCity))return d(`「${o.coverageCity}」已在本课题履约地中。`);o.coverageCities=Li(o.coverageCities,o.coverageCity),o.coverage=te(o.coverageCities),Tn(i),d(`已添加课题履约地：${o.coverageCity}。`);break}case"theme-topic-coverage-from-expert":{if(!a.adminThemeDraft)return;const i=Number(t.dataset.index),o=a.adminThemeDraft.topics?.[i],r=o?.expertId?D(o.expertId):null;if(!o||!r)return d("请先为本课题选择主讲专家。");o.coverageCities=pt(r),o.coverage=te(o.coverageCities);const c=Vt(o.coverageCities,r.province||r.region||""),p=o.coverageCities.find(u=>u!=="全国"&&(a.chinaCities?.[c]||[]).includes(u));o.coverageProvince=c,o.coverageCity=p||a.chinaCities?.[c]?.[0]||c,b(),d(`已套用 ${r.name} 的履约范围。`);break}case"theme-topic-add":if(!a.adminThemeDraft)return;{const i=Dt(),o=Vt([],i?.province),r=a.chinaCities?.[o]?.[0]||i?.city||o;a.adminThemeDraft.topics=(a.adminThemeDraft.topics||[]).concat({id:`${a.adminThemeDraft.month}-custom-${Date.now()}`,dept:"内科",title:"",expertId:"",coverage:"",coverageCities:[],coverageProvince:o,coverageCity:r})}b();break;case"theme-topic-remove":if(!a.adminThemeDraft)return;a.adminThemeDraft.topics=(a.adminThemeDraft.topics||[]).filter((i,o)=>o!==Number(t.dataset.index)),b();break;case"admin-theme-save":Uc();break;case"admin-theme-default":{const i=Dt(),o=a.adminThemeDraft?.month;i&&o&&(a.adminThemeDraft=Je(on(i.id,o)),b(),d("已恢复系统默认主题，保存后生效。"));break}case"admin-account-add":An("","",t.dataset.role||"");break;case"institution-account-add":Lo();break;case"open-institution-account":Lo(t.dataset.phone||"");break;case"institution-account-save":hl();break;case"open-admin-account":An(t.dataset.username);break;case"admin-hospital-operator":An("",t.dataset.hospitalId,"operator");break;case"hospital-phone-edit":cl(t.dataset.hospitalId||"");break;case"hospital-editor-add":Po("");break;case"hospital-editor-edit":Po(t.dataset.hospitalId||"");break;case"hospital-editor-save":rl();break;case"hospital-phone-save":dl();break;case"account-role":if(!a.adminAccountDraft)return;a.adminAccountDraft.role=t.dataset.value,t.dataset.value==="operator"&&!a.adminAccountDraft.hospitalId&&(a.adminAccountDraft.hospitalId=a.hospitals[0]?.id||""),b();break;case"admin-account-save":gl();break;case"open-poster":wl(t.dataset.posterId);break;case"save-poster":Ll();break;case"copy-poster-link":{const i=await Na(ia);d(i?"活动链接已复制。":"复制失败，请手动复制。");break}case"marketing-filter":a.marketingFilter=t.dataset.value||"all",g({scrollTo:Q()});break;case"marketing-poster-add":Oo();break;case"marketing-poster-edit":Oo(a.posterId);break;case"marketing-poster-delete":Cl();break;case"marketing-poster-share":Pl();break;case"marketing-poster-save":Ml();break;case"marketing-poster-reset":if(!w())return;{const i=Mt();i.filter(r=>r.source==="official").forEach(r=>{r.imageKey&&xt(r.imageKey)});const o=i.filter(r=>r.source!=="official");Mn([...Eo(),...o])}Ra(),a.marketingFilter="all",g({scrollTo:Q()}),d("已恢复 4 套官方海报。");break;case"close-overlay":rn();break;case"open-booking":zt();break;case"service-book":zt("","",t.dataset.value||"");break;case"home-hospital":ti(t.dataset.value||"");break;case"home-city-open":Us();break;case"home-city-save":qs();break;case"home-use-location":cs(),a.homeHospitalId="",a.expertHospitalId="",Ga({manual:!0}),yt();break;case"home-hospital-experts":$t(),a.expertVisited=!0,a.tab="experts",g({scrollTo:0});break;case"theme-open":dn(Number(t.dataset.month)||B(),-1,t.dataset.hospitalId||"");break;case"theme-topic":dn(Number(t.dataset.month)||B(),Number(t.dataset.topicIndex)>=0?Number(t.dataset.topicIndex):-1,t.dataset.hospitalId||"");break;case"theme-book":zs(Number(t.dataset.month)||B(),Number(t.dataset.topicIndex)>=0?Number(t.dataset.topicIndex):-1);break;case"theme-topic-focus":if(!a.overlay)return;a.overlay.topicIndex=Number(t.dataset.topicIndex),b();break;case"theme-topic-confirm":hr(Number(t.dataset.month)||B(),Number(t.dataset.topicIndex));break;case"theme-experts":$t({month:Number(t.dataset.month)||B(),service:"讲座",availability:"bookable",hospitalId:t.dataset.hospitalId||""}),a.expertVisited=!0,F(),ue(),a.screen="main",a.tab="experts",g({scrollTo:0});break;case"book-doctor":{const i=D(t.dataset.doctorId||""),o=Number(t.dataset.month)||0;zt(t.dataset.doctorId||"","",t.dataset.service||"","",o&&o===B()&&i?{month:o,hospitalId:i.hospitalId}:null)}break;case"open-doctor":xs(t.dataset.doctorId,Number(t.dataset.month)||0,Number(t.dataset.themeMonth)||0);break;case"doctor-month":a.overlay&&(a.overlay.month=Number(t.dataset.value),b());break;case"tier-open":$t({tier:t.dataset.value}),a.expertVisited=!0,a.tab="experts",g({scrollTo:0});break;case"service-open":$t({service:t.dataset.value,availability:"bookable"}),a.expertVisited=!0,a.tab="experts",g({scrollTo:0});break;case"search-topic":$t({search:t.dataset.value,searchOpen:!0}),a.expertVisited=!0,a.tab="experts",g({scrollTo:0});break;case"expert-scope":a.expertScope=t.dataset.value,Kt(),Se();break;case"expert-tier":a.expertTier=t.dataset.value,Se();break;case"expert-service":a.expertService=t.dataset.value,a.expertMonth>0&&a.expertService!=="讲座"&&(a.expertMonth=0,d("月令主题仅对应讲座，已清除月令筛选。")),Kt(),Se();break;case"expert-month-clear":a.expertMonth=0,a.expertService="all";{const i=document.querySelector("[data-expert-month]");i&&(i.value="0")}Kt(),Se(),d("已清除月令筛选。");break;case"expert-availability":a.expertAvailability=t.dataset.value,Kt(),Se();break;case"expert-search-toggle":a.expertSearchOpen=!a.expertSearchOpen,Gs(),a.expertSearchOpen&&window.requestAnimationFrame(()=>document.getElementById("expert-search")?.focus());break;case"expert-search-clear":a.expertSearch="";{const i=document.getElementById("expert-search");i&&(i.value="",i.focus()),Se()}break;case"open-demand":$n();break;case"demand-service":if(!a.overlay?.draft)return;a.overlay.draft.serviceType=t.dataset.value,document.querySelectorAll('[data-action="demand-service"]').forEach(i=>{i.classList.toggle("is-active",i.dataset.value===t.dataset.value)});break;case"demand-submit":Fr();break;case"open-demand-detail":{const i=le(t.dataset.demandId||"");if(!Qa(i))return d(a.session?"无权查看该提需。":"请先登录。");a.overlay={type:"demand",demandId:i.id},b();break}case"demand-convert":er(t.dataset.demandId||a.overlay?.demandId||"");break;case"demand-open-appointment":{const i=U(t.dataset.appointmentId||"");i&&_e(i)&&(a.overlay={type:"appointment",appointmentId:i.id},b());break}case"demand-cancel":{const i=le(a.overlay?.demandId||"");if(!Qa(i))return d(a.session?"无权操作该提需。":"请先登录。");if(i.convertedAppointmentId)return d("该提需已生成预约，请取消对应的预约单。");if(i.status==="closed"||i.status==="cancelled")return d("该提需已结束。");if(!["pending","contacted","matched"].includes(i.status))return d("当前状态不能取消提需，请联系项目对接人处理。");ft(i.id,{status:"cancelled",cancelledAt:new Date().toISOString()}),a.overlay=null,F(),g({scrollTo:Q()}),d("提需已取消。");break}case"record-tab":a.clientRecordTab=t.dataset.value,bn();break;case"appointment-filter":a.appointmentFilter=t.dataset.value,Cr();break;case"open-appointment":{const i=U(t.dataset.appointmentId||"");if(!_e(i))return d(a.session?"无权查看该预约。":"请先登录。");a.overlay={type:"appointment",appointmentId:i.id,action:""},b();break}case"open-plan-pdf":al(t.dataset.appointmentId||"");break;case"plan-attachment-open":nl();break;case"appointment-location-edit":Or(t.dataset.appointmentId||"");break;case"appointment-location-save":Br();break;case"appointment-profile-sync":gs(t.dataset.appointmentId||"");break;case"appointment-action":if(!a.overlay||a.overlay.type!=="appointment")return;{const i=U(a.overlay.appointmentId);if(!i)return;const o=t.dataset.value||"";if(!o)return;const r=Ue(i);if(["change","revise"].includes(o)&&!r.canModify||o==="cancel"&&!r.canCancel||o==="confirm"&&!r.canConfirm)return d(o==="cancel"?r.cancelReason||"当前阶段不可取消。":o==="confirm"?"当前预约不在待确认状态，请刷新后重试。":r.modifyReason||"当前阶段不可修改。");Re({type:"appointment-action",appointmentId:i.id,mode:o})}break;case"appointment-confirm":{const i=a.overlay?.appointmentId;if(!i)return;const o=U(i);if(!_e(o))return d(a.session?"无权操作该预约。":"请先登录。");const r=Ir(o);if(r)return d(r);ce(i,{status:"confirmed",confirmedAt:new Date().toISOString(),feedback:""}),yn("success"),d("预约已确认，院方将按方案执行。");break}case"appointment-revise-submit":{const i=a.overlay?.appointmentId,o=U(i);if(!_e(o))return d(a.session?"无权操作该预约。":"请先登录。");const r=document.querySelector("[data-revise-note]")?.value.trim()||"";if(!r)return d("请填写修改意见。");const c=Ue(o);if(!c.canModify)return d(c.modifyReason||"当前阶段不可提出修改。");ce(o.id,{status:"revision",feedback:r,feedbackAt:new Date().toISOString(),changeRequest:{type:"revise",note:r,at:new Date().toISOString()},clientChangeCount:(Number(o.clientChangeCount)||0)+1}),yn(),d("修改意见已提交，院方会更新方案。");break}case"appointment-change-submit":{const i=a.overlay?.appointmentId,o=U(i);if(!_e(o))return d(a.session?"无权操作该预约。":"请先登录。");const r=Ue(o);if(!r.canModify)return d(r.modifyReason||"当前阶段不可申请修改。");const c=document.querySelector("[data-change-note]")?.value.trim()||"";if(!c)return d("请填写需要修改的内容。");ce(o.id,{status:"revision",feedback:c,feedbackAt:new Date().toISOString(),changeRequest:{type:"confirmed-change",note:c,at:new Date().toISOString()},clientChangeCount:(Number(o.clientChangeCount)||0)+1,previousStatus:o.status}),yn(),d("修改申请已提交，院方更新方案后会再次提交确认。");break}case"appointment-cancel-submit":{const i=a.overlay?.appointmentId,o=U(i);if(!_e(o))return d(a.session?"无权操作该预约。":"请先登录。");const r=Ue(o);if(!r.canCancel)return d(r.cancelReason||"当前阶段不可取消预约。");if(ce(o.id,{status:"cancelled",cancelledAt:new Date().toISOString(),cancelledBy:"client",cancelReason:"机构侧主动取消"}),o.demandId&&o.manualArrangement){const c=le(o.demandId);c&&ft(c.id,{status:"closed",closedAt:new Date().toISOString(),closedReason:"关联预约已取消"})}a.overlay=null,a.overlayStack=[],F(),g({scrollTo:Q()}),d(Zt(o)?"预约已取消，人工协调安排已释放。":"预约已取消，公开号源已释放。");break}case"open-profile":zr();break;case"profile-save":Wr();break;case"me-demands":a.tab="appointments",a.clientRecordTab="demands",g({scrollTo:0});break;case"me-confirmed":a.tab="appointments",a.clientRecordTab="bookings",a.appointmentFilter="confirmed",g({scrollTo:0});break;case"logout":qn(),a.expertVisited=!1,a.expertHospitalId="",a.tab="home",a.screen="main",g({scrollTo:0}),d("已退出登录。");break;case"booking-service":lr(t.dataset.value);break;case"booking-doctor":dr(t.dataset.value);break;case"booking-doctor-preview":{const i=D(t.dataset.value||"");if(!i)return;Re({type:"doctor",doctorId:i.id,month:B()});break}case"booking-use-doctor":pr(t.dataset.doctorId||"");break;case"booking-topic-preview":ur(t.dataset.value||"");break;case"booking-date":fr(t.dataset.value);break;case"booking-topic":{vr(t.dataset.value||"");break}case"booking-open-demand":jr();break;case"booking-error-focus":to(t.dataset.target||"service",{focusField:!0});break;case"booking-next":yr();break;case"booking-back":a.booking&&(a.booking.step=1,b());break;case"booking-submit":wr();break}}function Kl(){document.addEventListener("click",n=>{const i=n.target.closest("a[href]");if(i&&!i.dataset.action)return;const o=n.target.closest("[data-action]");o&&(n.preventDefault(),jo(o.dataset.action,o))}),document.addEventListener("input",Bl),document.addEventListener("change",jl),document.addEventListener("keydown",n=>{if(n.key==="Escape"&&a.overlay){rn();return}if(n.key==="Enter"||n.key===" "){const i=n.target.closest('[role="button"][data-action]');i&&!n.target.closest("a,button,input,textarea,select")&&(n.preventDefault(),jo(i.dataset.action,i))}});let e=null;document.addEventListener("touchstart",n=>{const i=n.touches[0];if(!i)return;const o=n.target.closest(".sheet");if(!o||n.target.closest("button, a, input, textarea, select, label"))return;const r=!!n.target.closest(".sheet__grabber, .sheet__bar, .doctor-hero__grabber"),c=o.querySelector(".sheet__body");!r&&(!c||c.scrollTop>0)||(e={sheet:o,body:c,fromHandle:r,startY:i.clientY,startX:i.clientX,startedAt:performance.now(),dy:0,dx:0,dragging:!1})},{passive:!0}),document.addEventListener("touchmove",n=>{if(!e)return;const i=n.touches[0];if(!i)return;if(e.dy=Math.max(0,i.clientY-e.startY),e.dx=i.clientX-e.startX,!e.dragging){if(!e.fromHandle&&e.dy<=0){e=null;return}if(Math.abs(e.dy)<6&&Math.abs(e.dx)<6)return;if(Math.abs(e.dx)>Math.abs(e.dy)){e=null;return}e.dragging=!0,e.sheet.style.transition="none"}n.preventDefault();const o=e.dy,r=V.querySelector(".sheet-backdrop");e.sheet.style.transform=`translate(-50%, ${o}px)`,r&&(r.style.opacity=String(Math.max(0,1-o/420)))},{passive:!1});const t=()=>{if(!e)return;const n=e;if(e=null,!n.dragging)return;const i=Math.max(1,performance.now()-n.startedAt),o=n.dy/i,r=V.querySelector(".sheet-backdrop");n.dy>=90||n.dy>=32&&o>=.35?(n.sheet.style.transition="transform 0.22s cubic-bezier(0.4, 0, 0.6, 1)",n.sheet.style.transform="translate(-50%, 105%)",r&&(r.style.transition="opacity 0.18s",r.style.opacity="0"),window.setTimeout(()=>rn(),190)):(n.sheet.style.transition="transform 0.28s cubic-bezier(0.22, 0.8, 0.24, 1)",n.sheet.style.transform="translate(-50%, 0)",r&&(r.style.opacity=""))};document.addEventListener("touchend",t),document.addEventListener("touchcancel",t),document.addEventListener("visibilitychange",()=>{document.visibilityState!=="visible"||!a.session||Date.now()-a.sessionCheckAt<2e4||qa({resume:!0})}),window.addEventListener("pageshow",()=>{a.session&&(Date.now()-a.sessionCheckAt<2e4||qa({resume:!0}))}),window.addEventListener("storage",n=>{n.key!==y.session||!a.session||n.newValue||(a.session=null,a.sessionRevoked="账号已在其他页面退出，请重新登录。",ue(),g({scrollTo:0}))}),window.addEventListener("popstate",n=>{if(a.suppressPopCount>0){a.suppressPopCount-=1;return}const i=Math.max(0,Number(n.state?.pkuihOverlayDepth)||0);if(a.historyNavTarget&&a.historyNavTarget.depth===i){a.historyNavTarget=null;return}if(a.historyNavTarget=null,a.overlay){const o=a.overlayStack.length+1;a.historyDepth=Math.max(0,a.historyDepth-Math.max(0,o-i)),Ss(i);return}if(a.screen==="auth"){a.historyDepth=Math.max(0,a.historyDepth-1),a.authHistory=!1,a.screen="main",a.pendingAuth=null,a.login.step=1,g({scrollTo:Me(`main:${a.tab}`)});return}if(a.screen==="admin-login"||a.screen==="admin"){a.historyDepth=0,a.adminHistory=!1,Bt("client"),a.screen="main",a.tab="home",g({scrollTo:Me("main:home")});return}if(a.screen==="main"){a.historyDepth>0&&(a.historyDepth=Math.max(0,a.historyDepth-1));const o=["home","experts","appointments","me"].includes(n.state?.pkuihTab)?n.state.pkuihTab:a.tab,r=Number.isFinite(Number(n.state?.pkuihScroll))?Math.max(0,Number(n.state.pkuihScroll)):Me(`main:${o}`);a.tab=o,g({scrollTo:r});return}a.historyDepth>0&&(a.historyDepth=Math.max(0,a.historyDepth-1))})}async function Uo(){"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual"),Kl(),g();try{if(!window.PkuihApi)throw new Error("服务层加载失败，请刷新页面后重试。");const e=await window.PkuihApi.data.bootstrap(Pn);a.baseExperts=e.experts,a.hospitals=Zo(e.hospitals),a.seasonal=e.seasonal,a.themeMatches=e.themeMatches,a.chinaCities=e.chinaCities,zn(),vs(),fs();const t=R(y.session,null);let n=t?.phone?xe(t.phone)||t:null;if(n){const u=H(n.province,n.city);(u.province!==n.province||u.city!==n.city)&&(n={...n,...u},Ee(n))}a.session=n,n&&(qa({silent:!0})?T(y.session,n):n=null);const i=R(y.homeRegion,null);if(i?.province){const u=H(i.province,i.city);a.homeRegion=u,a.homeHospitalId=ei(u)?.id||""}const o=R(y.homeHospital,"");o&&k(o)&&(a.homeHospitalId=o);const r=R(y.adminSession,null),c=r?.username?at().find(u=>u.username===r.username&&u.active):null;c&&(c.role==="superadmin"||a.hospitals.some(u=>u.id===c.hospitalId))?(Va(c),a.adminHospitalId=c.role==="operator"?c.hospitalId:""):Ka(),a.adminLogin={username:"",password:"",error:""};const p=R(y.lastPortal,"client");a.loaded=!0,location.hash==="#/admin"||a.adminAuthed&&p==="admin"?(a.screen=a.adminAuthed?"admin":"admin-login",a.adminHistory=!0,gt("admin")):(a.screen="main",sn({pkuihLayer:"main",pkuihTab:a.tab,pkuihScroll:0,pkuihOverlayDepth:0})),g({scrollTo:0}),a.screen==="main"&&a.tab==="home"&&Ga()}catch(e){console.error("Failed to load application data:",e),a.loaded=!0,a.loadError=e.message||"数据加载失败",g()}}window.PkuihLegacy=Object.freeze({boot:Uo}),window.PKUHI_LEGACY_MANUAL_BOOT||Uo()})();
