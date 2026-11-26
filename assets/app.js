/* =========================================================
   名医入企 · 白大褂到企
   北京大学国际医院企业健康服务平台 · H5 Demo
   ========================================================= */
(() => {
  "use strict";

  const STORAGE = {
    users: "pkuih_h6_users",
    session: "pkuih_h6_session",
    appointments: "pkuih_h6_appointments",
    demands: "pkuih_h6_demands",
    institutionAccounts: "pkuih_h6_institution_accounts",
    adminAccounts: "pkuih_h6_admin_accounts",
    adminSession: "pkuih_h6_admin_session",
    doctorConfig: "pkuih_h6_doctor_config",
    themeConfig: "pkuih_h6_theme_config",
    planTemplates: "pkuih_h6_plan_templates",
    slots: "pkuih_h6_slots",
    smsLogs: "pkuih_h6_sms_logs",
    marketingPosters: "pkuih_h6_marketing_posters",
    hospitalConfig: "pkuih_h6_hospital_config",
    hospitalCustom: "pkuih_h6_hospital_custom",
    homeRegion: "pkuih_h6_home_region",
    homeHospital: "pkuih_h6_home_hospital",
    lastPortal: "pkuih_h6_portal",
    operationLogs: "pkuih_h6_operation_logs",
    seed: "pkuih_h6_seed",
    sessionMeta: "pkuih_h6_session_meta",
    bookingLock: "pkuih_h6_booking_lock",
    notifications: "pkuih_h6_notifications"
  };

  const DEMO_CODE = "888888";
  const DATA_VERSION = "20261126-1";
  const DEMO_PHONE = "13800000001";
  const DEMO_PROFILE = {
    phone: DEMO_PHONE,
    contactPhone: DEMO_PHONE,
    name: "王经理",
    orgName: "示例保险有限公司",
    orgType: "保险公司",
    title: "客户健康负责人",
    email: "wangjingli@example.com",
    province: "北京市",
    city: "北京市"
  };
  const DEFAULT_INSTITUTION_ACCOUNTS = [
    {
      phone: DEMO_PHONE,
      name: "王经理",
      orgName: "示例保险有限公司",
      orgType: "保险公司",
      title: "客户健康负责人",
      contactPhone: DEMO_PHONE,
      email: "wangjingli@example.com",
      province: "北京市",
      city: "北京市",
      active: true
    },
    {
      phone: "13800000009",
      name: "全链路验收",
      orgName: "全链路测试集团",
      orgType: "企业",
      title: "员工健康负责人",
      contactPhone: "13800000009",
      email: "qa.fullflow@example.com",
      province: "北京市",
      city: "北京市",
      active: true
    },
    {
      phone: "13800138000",
      name: "王测试",
      orgName: "测试保险有限公司",
      orgType: "保险公司",
      title: "健康服务经理",
      contactPhone: "13800138000",
      email: "qa.client@example.com",
      province: "北京市",
      city: "北京市",
      active: true
    },
    {
      phone: "13911112222",
      name: "李老师",
      orgName: "华北企业健康中心",
      orgType: "企业",
      title: "人力资源负责人",
      contactPhone: "13911112222",
      email: "qa.north@example.com",
      province: "北京市",
      city: "北京市",
      active: true
    },
    {
      phone: "13911113333",
      name: "赵老师",
      orgName: "华东员工关怀中心",
      orgType: "企业",
      title: "员工关怀负责人",
      contactPhone: "13911113333",
      email: "qa.east@example.com",
      province: "上海市",
      city: "上海市",
      active: true
    },
    {
      phone: "13900000001",
      name: "孙老师",
      orgName: "大湾区企业健康服务有限公司",
      orgType: "保险公司",
      title: "客户服务负责人",
      contactPhone: "13900000001",
      email: "qa.south@example.com",
      province: "广东省",
      city: "深圳市",
      active: true
    }
  ];
  const SERVICE_LINK = "https://baoweidong.github.io/pkuih-enterprise-health/";
  const PLAN_ATTACHMENT_MAX_BYTES = 20 * 1024 * 1024;
  const AVATARS = {
    neutral: "assets/avatars/doctor-neutral.svg",
    male: "assets/avatars/doctor-male.svg",
    maleSenior: "assets/avatars/doctor-male-senior.svg",
    female: "assets/avatars/doctor-female.svg",
    femaleSenior: "assets/avatars/doctor-female-senior.svg"
  };
  let hospitalThemesCache = new Map();
  const TIERS = {
    elite: {
      id: "elite",
      name: "第一梯队 · 大咖医生",
      short: "大咖医生",
      tag: "旗舰资源",
      leadDays: 30,
      desc: "国家级学会主委、学科领军与院级专家，适合重要客户答谢与年度健康峰会。"
    },
    director: {
      id: "director",
      name: "第二梯队 · 主任专家",
      short: "主任专家",
      tag: "专题定制",
      leadDays: 14,
      desc: "院长、知名中医、功能医学与全科专家，适合专题讲堂与专家面对面。"
    },
    specialist: {
      id: "specialist",
      name: "第三梯队 · 专业医生",
      short: "专业医生",
      tag: "快速响应",
      leadDays: 7,
      desc: "各科室骨干医生，适合员工健康课堂、科室科普与现场健康咨询。"
    }
  };
  const TIER_ORDER = ["elite", "director", "specialist"];
  const CLIENT_TIER_ORDER = ["specialist", "director", "elite"];

  const SERVICES = {
    讲座: { id: "讲座", label: "讲座", desc: "主题分享 + 现场问答" },
    健康咨询: { id: "健康咨询", label: "健康咨询", desc: "健康筛查 + 现场咨询" },
    "1V1报告解读": {
      id: "1V1报告解读",
      label: "1V1报告解读",
      desc: "报告解读 · 一对一咨询"
    }
  };
  const SERVICE_IDS = ["讲座", "健康咨询", "1V1报告解读"];
  const INSTITUTION_TYPES = [
    "保险公司",
    "银行",
    "证券",
    "基金",
    "信托",
    "企业",
    "事业单位",
    "其他机构"
  ];
  const STATUS = {
    pending: { label: "待接单", cls: "is-pending", help: "已提交，等待院方接单" },
    planning: { label: "方案制作中", cls: "is-planning", help: "院方已接单，正在确认方案" },
    review: { label: "方案待确认", cls: "is-review", help: "院方已提交方案，请确认" },
    revision: { label: "待修改", cls: "is-revision", help: "已提交修改意见，等待院方更新" },
    confirmed: { label: "已确认", cls: "is-confirmed", help: "方案已确认，等待活动执行" },
    completed: { label: "已完成", cls: "is-done", help: "活动已完成" },
    cancelled: { label: "已取消", cls: "is-cancelled", help: "预约已取消" }
  };

  const DEMAND_STATUS = {
    pending: { label: "待联系", cls: "is-pending" },
    contacted: { label: "已联系", cls: "is-planning" },
    matched: { label: "已匹配", cls: "is-confirmed" },
    closed: { label: "已关闭", cls: "is-cancelled" },
    cancelled: { label: "已取消", cls: "is-cancelled" }
  };

  const ROLE = {
    superadmin: { label: "超级管理员", short: "超管", desc: "全部医院、专家、号源与账号权限" },
    operator: { label: "医院运营", short: "运营", desc: "维护本院专家号源，接单并跟进项目" }
  };

  const DEFAULT_ADMIN_ACCOUNTS = [
    {
      username: "admin",
      password: "pkuih2026",
      name: "李老师",
      phone: "13800009999",
      role: "superadmin",
      hospitalId: "",
      active: true
    },
    {
      username: "pkuih",
      password: "pkuih2026",
      name: "周老师",
      phone: "13800001111",
      role: "operator",
      hospitalId: "pkuih",
      active: true
    },
    {
      username: "shenzhen",
      password: "pkuih2026",
      name: "陈老师",
      phone: "13800002222",
      role: "operator",
      hospitalId: "shenzhen",
      active: true
    },
    {
      username: "health",
      password: "pkuih2026",
      name: "赵老师",
      phone: "13800003333",
      role: "operator",
      hospitalId: "health",
      active: true
    },
    {
      username: "rehab",
      password: "pkuih2026",
      name: "孙老师",
      phone: "13800004444",
      role: "operator",
      hospitalId: "rehab",
      active: true
    },
    {
      username: "ocean",
      password: "pkuih2026",
      name: "刘老师",
      phone: "13800005555",
      role: "operator",
      hospitalId: "ocean",
      active: true
    },
    {
      username: "zibo",
      password: "pkuih2026",
      name: "王老师",
      phone: "13800006666",
      role: "operator",
      hospitalId: "zibo",
      active: true
    },
    {
      username: "luzhong",
      password: "pkuih2026",
      name: "张老师",
      phone: "13800007777",
      role: "operator",
      hospitalId: "luzhong",
      active: true
    },
    {
      username: "luan",
      password: "pkuih2026",
      name: "杨老师",
      phone: "13800008888",
      role: "operator",
      hospitalId: "luan",
      active: true
    },
    {
      username: "kaide",
      password: "pkuih2026",
      name: "胡老师",
      phone: "13800001234",
      role: "operator",
      hospitalId: "kaide",
      active: true
    }
  ];

  const state = {
    loaded: false,
    loadError: "",
    experts: [],
    baseExperts: [],
    hospitals: [],
    seasonal: [],
    themeMatches: [],
    chinaCities: {},
    tab: "home",
    screen: "main",
    session: null,
    sessionRevoked: "",
    sessionMeta: null,
    sessionCheckAt: 0,
    adminAuthed: false,
    adminUser: null,
    // client
    homeHospitalId: "",
    homeRegion: null,
    homeRegionDraft: null,
    geoStatus: "idle",
    geoLat: null,
    geoLng: null,
    geoAccuracy: 0,
    geoHospitalId: "",
    geoDistanceKm: null,
    geoError: "",
    expertScope: "nearby",
    expertHospitalId: "",
    expertTier: "all",
    expertService: "all",
    expertMonth: 0,
    expertDept: "all",
    expertAvailability: "bookable",
    expertSearch: "",
    expertSearchOpen: false,
    expertVisited: false,
    appointmentFilter: "all",
    clientRecordTab: "bookings",
    demandFilter: "all",
    booking: null,
    bookingSubmitting: false,
    login: {
      step: 1,
      phone: "",
      code: "",
      agree: false,
      name: "",
      orgName: "",
      orgType: "保险公司",
      title: "",
      contactPhone: "",
      email: "",
      province: "北京市",
      city: "北京市",
      error: ""
    },
    pendingAuth: null,
    codeTimer: null,
    codeCountdown: 0,
    // overlay
    overlay: null,
    overlayStack: [],
    overlayScrollY: null,
    overlayScrollMemory: {},
    paintedOverlayKey: "",
    posterId: "",
    posterViewUrl: "",
    planPdfView: null,
    planPptView: null,
    pptxPreviewer: null,
    profileDraft: null,
    // admin
    adminTab: "appointments",
    adminFilter: "all",
    adminSearch: "",
    adminDoctorSearch: "",
    adminThemeMonth: 0,
    adminThemeDraft: null,
    adminDemandFilter: "all",
    adminHospitalId: "",
    adminReviewId: "",
    adminDraft: null,
    adminNoteEditing: false,
    adminReviewSaved: false,
    reviewSaving: false,
    adminDemandId: "",
    adminDemandDraft: null,
    appointmentLocationDraft: null,
    slotDoctorId: "",
    slotMonth: "",
    slotMonthDoctor: "",
    slotDraft: null,
    slotScope: "one",
    slotBatch: {
      from: "",
      to: "",
      weekdays: [1, 2, 3, 4, 5],
      capacity: 2,
      scope: "one"
    },
    slotDay: "",
    adminAccountDraft: null,
    institutionAccountDraft: null,
    adminDoctorDraft: null,
    hospitalPhoneDraft: null,
    hospitalEditorDraft: null,
    mapPickerDraft: null,
    adminTemplateDraft: null,
    marketingFilter: "all",
    marketingDraft: null,
    // history & scroll
    viewScroll: { main: {}, admin: {} },
    historyDepth: 0,
    overlayHistoryDepth: 0,
    suppressPopCount: 0,
    historyNavToken: 0,
    historyNavTarget: null,
    authHistory: false,
    adminHistory: false,
    reuseHistoryForOverlay: false,
    renderedOnce: false
  };

  const app = document.getElementById("app");
  const overlayRoot = document.getElementById("overlay-root");
  const toastEl = document.getElementById("toast");

  /* =========================================================
     Utilities
     ========================================================= */
  function esc(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => {
      const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
      return map[char];
    });
  }

  function readJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  function writeJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      showToast("浏览器存储不可用，本次操作仅在当前页面有效。");
      return false;
    }
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  const pad = (value) => String(value).padStart(2, "0");

  function startOfDay(date = new Date()) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0, 0);
  }

  function addDays(date, amount) {
    const next = new Date(date);
    next.setDate(next.getDate() + amount);
    return next;
  }

  function isoDate(date) {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  }

  function parseDate(value) {
    if (!value) return null;
    if (value instanceof Date) return value;
    const match = String(value).match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) return null;
    return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]), 12, 0, 0, 0);
  }

  function formatMD(value) {
    const date = parseDate(value);
    return date ? `${pad(date.getMonth() + 1)}.${pad(date.getDate())}` : "--.--";
  }

  function formatDateCN(value, withWeekday = false) {
    const date = parseDate(value);
    if (!date) return "待确认";
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日${
      withWeekday ? ` ${weekday(date)}` : ""
    }`;
  }

  function weekday(date) {
    return date ? `周${["日", "一", "二", "三", "四", "五", "六"][date.getDay()]}` : "待定";
  }

  function weekdayOfIso(value) {
    const date = parseDate(value);
    return date ? date.getDay() : -1;
  }

  function formatDateTime(value) {
    const date = value ? new Date(value) : null;
    if (!date || Number.isNaN(date.getTime())) return "";
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(
      date.getHours()
    )}:${pad(date.getMinutes())}`;
  }

  function formatFileSize(bytes) {
    const size = Number(bytes) || 0;
    if (size <= 0) return "大小未知";
    if (size < 1024 * 1024) return `${Math.max(1, Math.round(size / 1024))} KB`;
    return `${(size / (1024 * 1024)).toFixed(size >= 10 * 1024 * 1024 ? 0 : 1)} MB`;
  }

  function isWeChatBrowser() {
    return /MicroMessenger/i.test(navigator.userAgent || "");
  }

  function maskPhone(phone) {
    const clean = String(phone || "").replace(/\s/g, "");
    if (clean.length < 7) return clean || "未填写";
    return `${clean.slice(0, 3)}****${clean.slice(-3)}`;
  }

  function initialOf(name) {
    return String(name || "企").trim().slice(0, 1) || "企";
  }

  function cleanText(value, max = 260) {
    const text = String(value || "").replace(/\s+/g, " ").trim();
    if (text.length <= max) return text;
    const cut = text.slice(0, max);
    const stop = Math.max(cut.lastIndexOf("。"), cut.lastIndexOf("；"), cut.lastIndexOf("，"));
    return stop > max * 0.55 ? cut.slice(0, stop + 1) : `${cut}…`;
  }

  function phoneHref(value) {
    return `tel:${String(value || "").replace(/[^\d+]/g, "")}`;
  }

  function regionText(province = "", city = "") {
    const p = String(province || "").trim();
    const c = String(city || "").trim();
    if (!p) return c;
    if (!c) return p;
    const normalize = (value) =>
      value.replace(/(壮族自治区|回族自治区|维吾尔自治区|特别行政区|自治区|省|市|地区|盟|自治州)$/g, "");
    if (p === c || normalize(p) === normalize(c) || normalize(p) === c || p === normalize(c)) {
      return p;
    }
    return `${p}${c}`;
  }

  function normalizeRegion(province = "北京市", city = "") {
    const rawProvince = String(province || "北京市").trim() || "北京市";
    const rawCity = String(city || rawProvince).trim() || rawProvince;
    const provinces = Object.keys(state.chinaCities || {});
    let nextProvince = rawProvince;
    if (provinces.length && !provinces.includes(nextProvince)) {
      nextProvince =
        provinces.find(
          (item) => item.startsWith(nextProvince) || nextProvince.startsWith(item)
        ) || provinces[0];
    }
    const cities = state.chinaCities?.[nextProvince] || [nextProvince];
    let nextCity = rawCity;
    if (cities.length && !cities.includes(nextCity)) {
      nextCity =
        cities.find((item) => item.startsWith(nextCity) || nextCity.startsWith(item)) ||
        cities[0] ||
        nextProvince;
    }
    return { province: nextProvince, city: nextCity };
  }

  function formatAddress(province = "", city = "", address = "", venue = "") {
    const region = regionText(province, city);
    let rest = String(address || "").trim();
    const prefixes = [region, province, city]
      .map((item) => String(item || "").trim())
      .filter(Boolean)
      .sort((a, b) => b.length - a.length);
    for (let pass = 0; pass < 3; pass += 1) {
      const before = rest;
      prefixes.forEach((prefix) => {
        if (rest.startsWith(prefix)) {
          rest = rest.slice(prefix.length).replace(/^[\s,，]+/, "");
        }
      });
      if (rest === before) break;
    }
    const parts = [region, rest].filter(Boolean);
    const place = parts.join(" ");
    return `${place}${venue ? ` · ${venue}` : ""}`.trim();
  }

  function phoneLink(value, label = value, cls = "tel-link") {
    if (!value) return "待补充";
    return `<a class="${cls}" href="${esc(phoneHref(value))}">${esc(label || value)}</a>`;
  }

  function idTimestamp(prefix) {
    const now = new Date();
    return `${prefix}-${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${String(
      Math.floor(Math.random() * 9000 + 1000)
    )}`;
  }

  function requestToken(prefix = "req") {
    try {
      if (window.crypto?.randomUUID) return `${prefix}-${window.crypto.randomUUID()}`;
    } catch {
      // Fall through to the timestamp token.
    }
    return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }

  function todayIso() {
    return isoDate(startOfDay());
  }

  function currentMonth() {
    return new Date().getMonth() + 1;
  }

  function debounce(fn, wait = 180) {
    let timer = 0;
    return (...args) => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => fn(...args), wait);
    };
  }

  function showToast(message) {
    if (!toastEl) return;
    toastEl.innerHTML = `${icon("checkCircle", 16)}<span>${esc(message)}</span>`;
    toastEl.classList.add("is-visible");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toastEl.classList.remove("is-visible"), 2800);
  }

  /* =========================================================
     Data stores
     ========================================================= */
  function getUsers() {
    return readJSON(STORAGE.users, []);
  }

  function saveUsers(users) {
    writeJSON(STORAGE.users, users);
  }

  function getUser(phone) {
    return getUsers().find((user) => user.phone === phone) || null;
  }

  function upsertUser(user) {
    const users = getUsers();
    const index = users.findIndex((item) => item.phone === user.phone);
    const next = { ...user, updatedAt: new Date().toISOString() };
    if (index >= 0) users[index] = next;
    else users.push(next);
    saveUsers(users);
    return next;
  }

  function normalizeInstitutionAccount(account = {}) {
    const phone = String(account.phone || "").replace(/\s+/g, "");
    const region = normalizeRegion(
      account.province || "北京市",
      account.city || account.province || "北京市"
    );
    return {
      phone,
      name: String(account.name || "").trim(),
      orgName: String(account.orgName || "").trim(),
      orgType: String(account.orgType || "").trim(),
      title: String(account.title || "").trim(),
      contactPhone: String(account.contactPhone || phone).replace(/\s+/g, ""),
      email: String(account.email || "").trim(),
      province: region.province,
      city: region.city,
      active: account.active !== false,
      source: account.source || "manual",
      createdAt: account.createdAt || new Date().toISOString(),
      updatedAt: account.updatedAt || new Date().toISOString()
    };
  }

  function getInstitutionAccounts() {
    let accounts = readJSON(STORAGE.institutionAccounts, null);
    if (!Array.isArray(accounts)) {
      const legacyUsers = getUsers().map((user) =>
        normalizeInstitutionAccount({
          ...user,
          source: "legacy"
        })
      );
      const merged = [...DEFAULT_INSTITUTION_ACCOUNTS, ...legacyUsers].reduce(
        (list, account) => {
          const normalized = normalizeInstitutionAccount(account);
          if (
            normalized.phone &&
            !list.some((item) => item.phone === normalized.phone)
          ) {
            list.push(normalized);
          }
          return list;
        },
        []
      );
      accounts = merged;
      writeJSON(STORAGE.institutionAccounts, accounts);
    }
    return accounts.map(normalizeInstitutionAccount);
  }

  function saveInstitutionAccounts(accounts) {
    writeJSON(
      STORAGE.institutionAccounts,
      (accounts || []).map(normalizeInstitutionAccount)
    );
  }

  function institutionAccountByPhone(phone) {
    return (
      getInstitutionAccounts().find(
        (account) => account.phone === String(phone || "").replace(/\s+/g, "")
      ) || null
    );
  }

  function upsertInstitutionAccount(account) {
    const normalized = normalizeInstitutionAccount(account);
    const accounts = getInstitutionAccounts();
    const index = accounts.findIndex((item) => item.phone === normalized.phone);
    const next = {
      ...normalized,
      createdAt: index >= 0 ? accounts[index].createdAt : normalized.createdAt,
      updatedAt: new Date().toISOString()
    };
    if (index >= 0) accounts[index] = next;
    else accounts.push(next);
    saveInstitutionAccounts(accounts);
    return next;
  }

  function syncInstitutionProfile(user) {
    const account = institutionAccountByPhone(user?.phone);
    if (!account) return null;
    return upsertInstitutionAccount({
      ...account,
      name: user.name || account.name,
      orgName: user.orgName || account.orgName,
      orgType: user.orgType || account.orgType,
      title: user.title || account.title,
      contactPhone: user.contactPhone || account.contactPhone,
      email: user.email || account.email,
      province: user.province || account.province,
      city: user.city || account.city
    });
  }

  function validProfileEmail(value = "") {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
  }

  function profileValidationErrors(profile = {}) {
    const issues = [];
    if (!String(profile.name || "").trim()) issues.push("请填写姓名");
    if (!String(profile.title || "").trim()) issues.push("请填写职务");
    if (!String(profile.orgName || "").trim()) issues.push("请填写单位名称");
    if (!INSTITUTION_TYPES.includes(profile.orgType)) {
      issues.push("请选择机构类型");
    }
    const contactPhone = String(profile.contactPhone || profile.phone || "").trim();
    if (!contactPhone) issues.push("请填写联系方式");
    else if (!/^1\d{10}$/.test(contactPhone)) issues.push("联系方式格式不正确");
    const email = String(profile.email || "").trim();
    if (!email) issues.push("请填写通知邮箱");
    else if (!validProfileEmail(email)) issues.push("通知邮箱格式不正确");
    return issues;
  }

  function profileIssueMessage(profile) {
    const issues = profileValidationErrors(profile);
    return issues.length ? `${issues.join("、")}。` : "";
  }

  function profileRegionFromContext(profile = state.session) {
    if (state.homeRegion?.province) {
      return normalizeRegion(state.homeRegion.province, state.homeRegion.city);
    }
    if (state.geoStatus === "ready" && state.geoHospitalId) {
      const located = hospitalById(state.geoHospitalId);
      if (located) return normalizeRegion(located.province, located.city);
    }
    if (profile?.province) {
      return normalizeRegion(profile.province, profile.city);
    }
    return currentClientRegion();
  }

  function primeLoginProfile(profile = {}) {
    const region = profileRegionFromContext(profile);
    state.login.name = profile.name || "";
    state.login.orgName = profile.orgName || "";
    state.login.orgType = profile.orgType || "";
    state.login.title = profile.title || "";
    state.login.contactPhone = profile.contactPhone || profile.phone || state.login.phone;
    state.login.email = profile.email || "";
    state.login.province = region.province;
    state.login.city = region.city;
  }

  function syncSessionRegionFromContext() {
    if (!state.session) return;
    const region = profileRegionFromContext(state.session);
    if (
      state.session.province === region.province &&
      state.session.city === region.city
    ) {
      return;
    }
    const saved = upsertUser({
      ...state.session,
      province: region.province,
      city: region.city
    });
    setSession(saved);
    syncInstitutionProfile(saved);
  }

  function setSession(user) {
    state.session = user;
    writeJSON(STORAGE.session, user);
    writeJSON(STORAGE.sessionMeta, {
      phone: user?.phone || "",
      checkedAt: new Date().toISOString(),
      accountUpdatedAt: institutionAccountByPhone(user?.phone)?.updatedAt || ""
    });
  }

  function clearSession() {
    state.session = null;
    localStorage.removeItem(STORAGE.session);
    localStorage.removeItem(STORAGE.sessionMeta);
  }

  function revokeInstitutionSession(message, { silent = false } = {}) {
    const wasLoggedIn = Boolean(state.session);
    clearSession();
    state.sessionRevoked = message;
    state.sessionCheckAt = Date.now();
    state.booking = null;
    if (state.overlay) {
      clearOverlayState();
      releaseOverlayHistory();
    }
    state.screen = "main";
    state.tab = "home";
    if (wasLoggedIn && !silent) {
      showToast(message);
      renderApp({ scrollTo: 0 });
    }
    return false;
  }

  function validateInstitutionSession({ silent = false, resume = false } = {}) {
    if (!state.session) return true;
    const account = institutionAccountByPhone(state.session.phone);
    const message = !account
      ? "该机构账号已不在白名单中，登录状态已失效。"
      : account.active === false
      ? "该机构账号已被院方停用，请联系超级管理员。"
      : "";
    if (message) return revokeInstitutionSession(message, { silent });
    state.sessionRevoked = "";
    state.sessionCheckAt = Date.now();
    writeJSON(STORAGE.sessionMeta, {
      phone: state.session.phone,
      checkedAt: new Date().toISOString(),
      accountUpdatedAt: account.updatedAt || "",
      resume: Boolean(resume)
    });
    return true;
  }

  function getAdminAccounts() {
    let accounts = readJSON(STORAGE.adminAccounts, null);
    if (!Array.isArray(accounts) || !accounts.length) {
      accounts = clone(DEFAULT_ADMIN_ACCOUNTS).map((account) => ({
        ...account,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));
      writeJSON(STORAGE.adminAccounts, accounts);
      return accounts;
    }
    const seeded = readJSON(STORAGE.seed, {});
    if (!seeded.adminOperatorsV2) {
      const usernames = new Set(accounts.map((item) => item.username));
      const missing = DEFAULT_ADMIN_ACCOUNTS.filter(
        (item) => !usernames.has(item.username)
      ).map((account) => ({
        ...account,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));
      if (missing.length) {
        accounts = accounts.concat(missing);
        writeJSON(STORAGE.adminAccounts, accounts);
      }
      writeJSON(STORAGE.seed, { ...seeded, adminOperatorsV2: true });
    }
    return accounts;
  }

  function saveAdminAccounts(accounts) {
    writeJSON(STORAGE.adminAccounts, accounts);
  }

  function setAdminSession(account) {
    state.adminAuthed = true;
    state.adminUser = account;
    writeJSON(STORAGE.adminSession, { username: account.username, at: new Date().toISOString() });
  }

  function clearAdminSession() {
    state.adminAuthed = false;
    state.adminUser = null;
    localStorage.removeItem(STORAGE.adminSession);
  }

  function isSuperadmin() {
    return state.adminUser?.role === "superadmin";
  }

  function adminCanManageHospital(hospitalId) {
    if (!state.adminUser) return false;
    if (isSuperadmin()) return true;
    return Boolean(hospitalId) && state.adminUser.hospitalId === hospitalId;
  }

  function operatorHospital() {
    if (!state.adminUser) return null;
    if (isSuperadmin()) {
      return state.adminHospitalId ? hospitalById(state.adminHospitalId) : null;
    }
    return state.hospitals.find((item) => item.id === state.adminUser.hospitalId) || null;
  }

  function setLastPortal(portal) {
    writeJSON(STORAGE.lastPortal, portal);
  }

  function getDoctorConfig() {
    return readJSON(STORAGE.doctorConfig, { overrides: {}, added: [], removed: [] });
  }

  function saveDoctorConfig(config) {
    writeJSON(STORAGE.doctorConfig, config);
  }

  function mergeExperts() {
    const config = getDoctorConfig();
    const removed = new Set(config.removed || []);
    const merged = state.baseExperts
      .filter((expert) => !removed.has(expert.id))
      .map((expert) => ({
        ...expert,
        ...(config.overrides?.[expert.id] || {})
      }));
    const added = (config.added || []).map((expert) => ({ ...expert, custom: true }));
    state.experts = merged.concat(added).map((expert) => ({
      ...expert,
      services: normalizeServiceList(expert.services)
    }));
    hospitalThemesCache.clear();
  }

  function allExperts() {
    return state.experts;
  }

  function expertById(id) {
    return state.experts.find((expert) => String(expert.id) === String(id)) || null;
  }

  function hospitalById(id) {
    return state.hospitals.find((item) => item.id === id) || null;
  }

  function getHospitalConfigStore() {
    return readJSON(STORAGE.hospitalConfig, {});
  }

  function getHospitalCustomStore() {
    const store = readJSON(STORAGE.hospitalCustom, null);
    if (store && Array.isArray(store.added)) {
      return {
        added: store.added,
        removed: Array.isArray(store.removed) ? store.removed : []
      };
    }
    return { added: [], removed: [] };
  }

  function saveHospitalCustomStore(store) {
    writeJSON(STORAGE.hospitalCustom, {
      added: store.added || [],
      removed: store.removed || []
    });
  }

  function applyHospitalConfig(hospitals) {
    const store = getHospitalConfigStore();
    const custom = getHospitalCustomStore();
    const removed = new Set(custom.removed || []);
    return hospitals
      .filter((hospital) => !removed.has(hospital.id))
      .map((hospital) => ({
        ...hospital,
        ...(store?.[hospital.id] || {})
      }))
      .concat(
        (custom.added || []).map((hospital) => ({
          ...hospital,
          custom: true
        }))
      );
  }

  function saveHospitalConfig(hospitalId, patch) {
    const store = getHospitalConfigStore();
    store[hospitalId] = {
      ...(store[hospitalId] || {}),
      ...patch
    };
    writeJSON(STORAGE.hospitalConfig, store);
  }

  function hospitalConfigFor(id) {
    const hospital = hospitalById(id);
    if (!hospital) return null;
    return clone(hospital);
  }

  function normalizeHospitalRecord(raw = {}) {
    const region = normalizeRegion(
      raw.province || "北京市",
      raw.city || raw.province || "北京市"
    );
    return {
      id: String(raw.id || "").trim(),
      name: String(raw.name || "").trim(),
      short: String(raw.short || "").trim(),
      province: region.province,
      city: region.city,
      region: regionText(region.province, region.city),
      address: String(raw.address || "").trim(),
      phone: String(raw.phone || "").trim(),
      lat: Number(raw.lat),
      lng: Number(raw.lng),
      flagship: Boolean(raw.flagship),
      active: raw.active !== false,
      custom: Boolean(raw.custom)
    };
  }

  function saveHospitalRecord(draft) {
    const record = normalizeHospitalRecord(draft);
    const errors = [];
    if (!record.name) errors.push("医院名称");
    if (!record.short) errors.push("简称");
    if (!record.address) errors.push("详细地址");
    if (!record.phone) errors.push("联系电话");
    if (!Number.isFinite(record.lat) || record.lat < 3 || record.lat > 54) {
      errors.push("纬度（3–54）");
    }
    if (!Number.isFinite(record.lng) || record.lng < 73 || record.lng > 136) {
      errors.push("经度（73–136）");
    }
    if (errors.length) {
      return { error: `请检查：${errors.join("、")}` };
    }
    const custom = getHospitalCustomStore();
    const existing = hospitalById(record.id);
    if (!existing) {
      record.id = `hospital-${Date.now()}`;
      record.custom = true;
      custom.added = [...custom.added, record];
      saveHospitalCustomStore(custom);
      state.hospitals = state.hospitals.concat(record);
      return { hospital: record, created: true };
    }
    if (existing.custom) {
      custom.added = custom.added.map((item) =>
        item.id === record.id ? { ...item, ...record } : item
      );
      saveHospitalCustomStore(custom);
    } else {
      saveHospitalConfig(record.id, {
        name: record.name,
        short: record.short,
        province: record.province,
        city: record.city,
        region: record.region,
        address: record.address,
        phone: record.phone,
        lat: record.lat,
        lng: record.lng,
        flagship: record.flagship
      });
    }
    state.hospitals = state.hospitals.map((item) =>
      item.id === record.id ? { ...item, ...record } : item
    );
    return { hospital: record, created: false };
  }

  function versionedDefaultAvatar(path) {
    return `${path}?v=${DATA_VERSION}`;
  }

  function expertAvatar(expert) {
    if (!expert) return versionedDefaultAvatar(AVATARS.neutral);
    if (expert.photoCard) return expert.photoCard;
    if (expert.photo) return expert.photo;
    if (expert.gender === "female") {
      return versionedDefaultAvatar(
        expert.senior ? AVATARS.femaleSenior : AVATARS.female
      );
    }
    if (expert.gender === "male") {
      return versionedDefaultAvatar(
        expert.senior ? AVATARS.maleSenior : AVATARS.male
      );
    }
    return versionedDefaultAvatar(AVATARS.neutral);
  }

  function derivedCoverageCities(raw = "") {
    const value = String(raw || "").trim();
    if (
      !value ||
      value.includes("全国") ||
      value.includes("省外") ||
      value.includes("京外")
    ) {
      return ["全国"];
    }
    if (value.includes("北京")) return ["北京市"];
    if (value.includes("天津")) return ["天津市"];
    if (value.includes("深圳")) return ["深圳市"];
    if (value.includes("山东")) return ["山东省"];
    if (value.includes("山西")) return ["山西省"];
    if (value.includes("湖南")) return ["湖南省"];
    return [value];
  }

  function coverageCitiesFor(expert) {
    const stored = Array.isArray(expert?.coverageCities) ? expert.coverageCities.filter(Boolean) : [];
    if (stored.length) return stored;
    const label = String(expert?.coverage || "").trim();
    const provinceCoverage = {
      北京: "北京市",
      天津: "天津市",
      深圳: "深圳市",
      山东省: "山东省",
      山东省内: "山东省",
      山西: "山西省",
      湖南: "湖南省"
    };
    if (provinceCoverage[label]) return [provinceCoverage[label]];
    return derivedCoverageCities(expert?.coverage);
  }

  function coverageText(expertOrCities) {
    const cities = Array.isArray(expertOrCities)
      ? expertOrCities.filter(Boolean)
      : coverageCitiesFor(expertOrCities);
    if (!cities.length) return "待配置";
    if (cities.includes("全国")) return "全国";
    if (cities.length <= 3) return cities.join(" / ");
    return `${cities.slice(0, 2).join(" / ")} 等 ${cities.length} 城`;
  }

  function expertCoversRegion(expert, province = "", city = "") {
    const cities = coverageCitiesFor(expert);
    if (cities.includes("全国")) return true;
    const normalize = (value) =>
      String(value || "")
        .trim()
        .replace(/(壮族自治区|回族自治区|维吾尔自治区|特别行政区|自治区|省|市|地区|盟|自治州)$/g, "");
    const provinceKey = normalize(province);
    const cityKey = normalize(city);
    return cities.some((item) => {
      const key = normalize(item);
      return Boolean(key) && (key === cityKey || key === provinceKey);
    });
  }

  function expertThemeCoversRegion(
    expert,
    month,
    province = "",
    city = "",
    hospitalId = ""
  ) {
    if (!expert || !Number(month)) return false;
    const targetHospitalId = hospitalId || expert.hospitalId;
    const theme = hospitalTheme(targetHospitalId, month);
    if (!theme) return false;
    const topics = (theme.topics || []).filter(
      (topic) => String(topic.expertId || "") === String(expert.id)
    );
    if (topics.length) {
      return topics.some((topic) =>
        themeTopicCoversRegion(
          themeTopicCoverage(topic, theme, targetHospitalId),
          province,
          city
        )
      );
    }
    const bound = (theme.expertIds || []).some(
      (id) => String(id || "") === String(expert.id)
    );
    if (!bound) return false;
    return themeTopicCoversRegion(
      { cities: themeCoverageCities(theme, targetHospitalId) },
      province,
      city
    );
  }

  function themeCoverageCitiesFromLabel(raw = "") {
    const value = String(raw || "").trim();
    if (!value) return [];
    if (/全国|京外|省外/.test(value)) return ["全国"];
    const cities = [];
    const add = (city) => {
      if (!cities.includes(city)) cities.push(city);
    };
    if (value.includes("北京")) add("北京市");
    if (value.includes("天津")) add("天津市");
    if (value.includes("深圳")) add("深圳市");
    if (value.includes("山东")) add("山东省");
    if (value.includes("山西")) add("山西省");
    if (value.includes("湖南")) add("湖南省");
    return cities.length ? cities : [value];
  }

  function mergeCoverageCities(list = []) {
    const cities = list.flat().filter(Boolean);
    if (cities.some((city) => String(city).includes("全国"))) return ["全国"];
    return [...new Set(cities)];
  }

  function resolveTopicCoverageCities(topic, theme, hospitalId = "") {
    const expert = topic?.expertId ? expertById(topic.expertId) : null;
    let cities = Array.isArray(topic?.coverageCities)
      ? topic.coverageCities.filter(Boolean)
      : [];
    let label = String(topic?.coverage || "").trim();
    if (!cities.length && label) cities = themeCoverageCitiesFromLabel(label);
    if (!cities.length) {
      const hospital = hospitalById(hospitalId);
      const row = state.themeMatches.find((item) => {
        if (Number(item.month) !== Number(theme?.month)) return false;
        if (String(item.topic || "") !== String(topic?.title || "")) return false;
        if (expert && item.doctor !== expert.name) return false;
        if (
          hospital?.name &&
          item.hospital !== hospital.name &&
          !item.hospital?.includes(hospital.name) &&
          !hospital.name.includes(item.hospital)
        ) {
          return false;
        }
        return true;
      });
      label = row?.coverage || "";
      if (label) cities = themeCoverageCitiesFromLabel(label);
    }
    if (!cities.length && expert) cities = coverageCitiesFor(expert);
    if (!cities.length && Array.isArray(theme?.coverageCities)) {
      cities = theme.coverageCities.filter(Boolean);
    }
    return {
      cities: mergeCoverageCities(cities).filter(Boolean),
      label: String(label || "").trim()
    };
  }

  function themeTopicCoverage(topic, theme, hospitalId = "") {
    const resolved = resolveTopicCoverageCities(topic, theme, hospitalId);
    return {
      label: coverageDisplayLabel(
        resolved.cities.length
          ? coverageText(resolved.cities)
          : resolved.label || "待配置"
      ),
      cities: resolved.cities
    };
  }

  function themeCoverageCities(theme, hospitalId = "") {
    const topicCities = (theme?.topics || []).flatMap(
      (topic) => themeTopicCoverage(topic, theme, hospitalId).cities
    );
    return mergeCoverageCities(
      topicCities.length ? topicCities : theme?.coverageCities || []
    );
  }

  function themeCoverageLabels(theme, hospitalId = "") {
    return [
      ...new Set(
        (theme?.topics || [])
          .map((topic) => themeTopicCoverage(topic, theme, hospitalId).label)
          .filter(Boolean)
      )
    ];
  }

  function coverageDisplayLabel(label) {
    const value = String(label || "").trim();
    return /全国|京外|省外/.test(value) ? "全国" : value;
  }

  function themeCoverageSummary(theme, hospitalId = "") {
    const labels = themeCoverageLabels(theme, hospitalId);
    if (labels.length === 1) return labels[0];
    if (labels.length > 1) return `${labels.length} 类`;
    return coverageText(themeCoverageCities(theme, hospitalId));
  }

  function themeTopicCoversRegion(coverage, province = "", city = "") {
    const cities = coverage?.cities || [];
    if (cities.includes("全国")) return true;
    const normalize = (value) =>
      String(value || "")
        .trim()
        .replace(/(壮族自治区|回族自治区|维吾尔自治区|特别行政区|自治区|省|市|地区|盟|自治州)$/g, "");
    const provinceKey = normalize(province);
    const cityKey = normalize(city);
    return cities.some((item) => {
      const key = normalize(item);
      return Boolean(key) && (key === cityKey || key === provinceKey);
    });
  }

  function expertAvatarDetail(expert) {
    if (!expert) return versionedDefaultAvatar(AVATARS.neutral);
    return expert.photoDetail || expertAvatar(expert);
  }

  function tierOf(expert) {
    return TIERS[expert?.tier] || TIERS.specialist;
  }

  function serviceLabel(value) {
    const service = normalizeService(value);
    return SERVICES[service]?.label || value;
  }

  function normalizeService(value) {
    const text = String(value || "").replace(/\s+/g, "").trim();
    const lower = text.toLowerCase();
    if (["讲座", "健康讲座"].includes(text)) return "讲座";
    if (["巡诊", "健康咨询"].includes(text)) return "健康咨询";
    if (
      ["1对1", "1v1", "1v1报告解读", "报告解读", "1v1报告解读"].includes(lower) ||
      ["1对1", "1V1报告解读"].includes(text)
    ) {
      return "1V1报告解读";
    }
    return text;
  }

  function normalizeServiceList(list) {
    return [...new Set((Array.isArray(list) ? list : []).map(normalizeService).filter(Boolean))];
  }

  function fallbackHospital(user = state.session) {
    const province = user?.province || "北京";
    const city = user?.city || "北京";
    const provinceKey = String(province).replace(
      /(壮族自治区|回族自治区|维吾尔自治区|特别行政区|自治区|省|市|地区|盟|自治州)$/g,
      ""
    );
    if (city && city.includes("深圳")) return hospitalById("shenzhen");
    if (city && city.includes("天津")) return hospitalById("ocean");
    if (city && city.includes("淄博")) {
      return hospitalById(provinceKey === "山东" ? "luzhong" : "pkuih");
    }
    if (city && city.includes("长治")) return hospitalById("luan");
    if (city && city.includes("株洲")) return hospitalById("kaide");
    if (provinceKey === "北京") return hospitalById("pkuih");
    if (provinceKey === "天津") return hospitalById("ocean");
    if (provinceKey === "山东") return hospitalById("luzhong");
    if (provinceKey === "山西") return hospitalById("luan");
    if (provinceKey === "湖南") return hospitalById("kaide");
    if (provinceKey === "广东") return hospitalById("shenzhen");
    return hospitalById("pkuih");
  }

  function distanceKm(lat1, lng1, lat2, lng2) {
    const toRad = (value) => (Number(value) * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
    return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  function nearestHospitalByCoords(lat, lng) {
    const candidates = state.hospitals.filter(
      (hospital) => Number.isFinite(Number(hospital.lat)) && Number.isFinite(Number(hospital.lng))
    );
    if (!candidates.length) return null;
    return candidates
      .map((hospital) => ({
        hospital,
        distance: distanceKm(lat, lng, hospital.lat, hospital.lng)
      }))
      .sort((a, b) => a.distance - b.distance)[0];
  }

  function nearestHospital(user = state.session) {
    const manual = state.homeHospitalId ? hospitalById(state.homeHospitalId) : null;
    if (manual) return manual;
    const located = state.geoHospitalId ? hospitalById(state.geoHospitalId) : null;
    if (located) return located;
    return fallbackHospital(user);
  }

  function libraryHospital() {
    return state.expertHospitalId
      ? hospitalById(state.expertHospitalId) || nearestHospital()
      : nearestHospital();
  }

  function currentClientRegion() {
    if (state.homeRegion?.province) {
      return normalizeRegion(state.homeRegion.province, state.homeRegion.city);
    }
    if (state.geoStatus === "ready") {
      const located = state.geoHospitalId ? hospitalById(state.geoHospitalId) : null;
      if (located) return normalizeRegion(located.province, located.city);
    }
    if (state.session?.province) {
      return normalizeRegion(state.session.province, state.session.city);
    }
    const hospital = nearestHospital();
    if (hospital) return normalizeRegion(hospital.province, hospital.city);
    return normalizeRegion(state.session?.province || "北京市", state.session?.city || "北京市");
  }

  function hospitalForRegion(region) {
    const normalized = normalizeRegion(region?.province, region?.city);
    const exact = state.hospitals.find((hospital) =>
      hospitalMatchesRegion(hospital, normalized)
    );
    if (exact) return exact;
    const sameProvince = state.hospitals.find(
      (hospital) =>
        normalizeRegion(hospital.province, hospital.city).province === normalized.province
    );
    return sameProvince || state.hospitals[0] || null;
  }

  function hospitalMatchesRegion(hospital, region) {
    if (!hospital || !region?.province) return false;
    const hospitalRegion = normalizeRegion(hospital.province, hospital.city);
    const targetRegion = normalizeRegion(region.province, region.city);
    return (
      hospitalRegion.province === targetRegion.province &&
      hospitalRegion.city === targetRegion.city
    );
  }

  function persistHomeRegion(region) {
    const normalized = normalizeRegion(region?.province, region?.city);
    state.homeRegion = normalized;
    state.expertHospitalId = "";
    writeJSON(STORAGE.homeRegion, normalized);
    const hospital = hospitalForRegion(normalized);
    state.homeHospitalId = hospital?.id || "";
    persistHomeHospital(state.homeHospitalId);
    state.expertScope = "nearby";
    syncSessionRegionFromContext();
    return hospital;
  }

  function persistHomeHospital(hospitalId) {
    if (hospitalId) writeJSON(STORAGE.homeHospital, hospitalId);
    else localStorage.removeItem(STORAGE.homeHospital);
  }

  function selectHomeHospital(hospitalId, { announce = true } = {}) {
    const hospital = hospitalById(hospitalId);
    state.homeHospitalId = hospital ? hospital.id : "";
    persistHomeHospital(state.homeHospitalId);
    if (hospital) {
      state.homeRegion = normalizeRegion(hospital.province, hospital.city);
      writeJSON(STORAGE.homeRegion, state.homeRegion);
    }
    state.expertHospitalId = "";
    state.expertScope = "nearby";
    syncSessionRegionFromContext();
    refreshHomeLocationViews();
    if (announce && hospital) {
      showToast(
        `已切换到${hospital.name} · ${regionText(hospital.province, hospital.city)}。`
      );
    }
  }

  function clearHomeRegion() {
    state.homeRegion = null;
    localStorage.removeItem(STORAGE.homeRegion);
    localStorage.removeItem(STORAGE.homeHospital);
  }

  function locationDistanceText() {
    const value = Number(state.geoDistanceKm);
    if (!Number.isFinite(value)) return "";
    if (value < 1) return "1 公里内";
    if (value < 10) return `约 ${value.toFixed(1)} 公里`;
    return `约 ${Math.round(value)} 公里`;
  }

  function hospitalDistanceText(hospital) {
    if (!hospital || state.geoStatus !== "ready") return "";
    if (!Number.isFinite(Number(state.geoLat)) || !Number.isFinite(Number(state.geoLng))) return "";
    const value = distanceKm(state.geoLat, state.geoLng, hospital.lat, hospital.lng);
    if (value < 1) return "1 公里内";
    if (value < 10) return `约 ${value.toFixed(1)} 公里`;
    return `约 ${Math.round(value)} 公里`;
  }

  function homeLocationText() {
    const hospital = nearestHospital();
    if (state.homeRegion) {
      return `手动选择 · ${regionText(state.homeRegion.province, state.homeRegion.city)}`;
    }
    if (state.homeHospitalId && hospital) {
      return `已切换 · ${regionText(hospital.province, hospital.city)}`;
    }
    if (state.geoStatus === "loading") return "正在获取当前位置…";
    if (state.geoStatus === "ready" && state.geoHospitalId) {
      return `当前位置附近 · 距${hospital?.short || "推荐医院"}${locationDistanceText()}`;
    }
    if (state.geoStatus === "denied") return "未开启定位 · 可手动切换医院";
    if (state.geoStatus === "error" || state.geoStatus === "unavailable") {
      return "定位不可用 · 可手动切换医院";
    }
    if (state.session) return `当前所在地区 · ${regionText(state.session.province, state.session.city)}`;
    return "定位后将优先推荐最近医院";
  }

  function applyLocationToLogin(hospital) {
    if (state.session || !hospital) return;
    const region = normalizeRegion(hospital.province, hospital.city);
    state.login.province = region.province;
    state.login.city = region.city;
  }

  function requestLocationRecommendation({ manual = false } = {}) {
    if (state.geoStatus === "loading") return;
    if (!navigator.geolocation) {
      state.geoStatus = "unavailable";
      state.geoError = "当前浏览器不支持定位";
      refreshHomeLocationViews();
      if (manual) showToast("当前浏览器不支持定位，请手动切换医院。");
      return;
    }
    state.geoStatus = "loading";
    state.geoError = "";
    refreshHomeLocationViews();
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const nearest = nearestHospitalByCoords(lat, lng);
        state.geoStatus = "ready";
        state.geoLat = lat;
        state.geoLng = lng;
        state.geoAccuracy = Math.round(position.coords.accuracy || 0);
        state.geoHospitalId = nearest?.hospital?.id || "";
        state.geoDistanceKm = nearest?.distance ?? null;
        if (manual) {
          state.homeHospitalId = "";
          persistHomeHospital("");
        }
        syncSessionRegionFromContext();
        applyLocationToLogin(nearest?.hospital);
        refreshHomeLocationViews();
        if (state.screen === "main" && state.tab === "experts" && state.expertScope === "nearby") {
          refreshExpertResults();
          refreshExpertHint();
        }
        if (manual && nearest?.hospital) {
          showToast(`已定位，为你推荐${nearest.hospital.name}，${locationDistanceText()}。`);
        }
      },
      (error) => {
        state.geoStatus = error.code === 1 ? "denied" : "error";
        state.geoError = error.message || "无法获取当前位置";
        refreshHomeLocationViews();
        if (manual) {
          showToast(
            error.code === 1
              ? "未获得定位权限，请在系统设置中允许定位，或手动切换医院。"
              : "暂时无法获取定位，请手动切换医院。"
          );
        }
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
    );
  }

  function doctorExpertise(expert) {
    return cleanText(expert?.specialty || expert?.intro || "以院方最终确认的专家资料为准。", 180);
  }

  function matchesService(expert, service) {
    if (!service || service === "all") return true;
    const target = normalizeService(service);
    return (expert?.services || []).some((item) => normalizeService(item) === target);
  }

  function concreteService(value) {
    const service = normalizeService(value);
    return SERVICE_IDS.includes(service) ? service : "";
  }

  function defaultServiceFor(expert) {
    if (matchesService(expert, "讲座")) return "讲座";
    const first = (expert?.services || [])
      .map((item) => concreteService(item))
      .find(Boolean);
    return first || "讲座";
  }

  function bookingServiceFor(expert, preferred = "") {
    const service = concreteService(preferred);
    return service && matchesService(expert, service) ? service : defaultServiceFor(expert);
  }

  function serviceCount(service, hospitalId = "") {
    return state.experts.filter(
      (expert) =>
        expert.active !== false &&
        (!hospitalId || expert.hospitalId === hospitalId) &&
        matchesService(expert, service)
    ).length;
  }

  function lectureTopicSearchText(expert) {
    if (!expert?.hospitalId || !matchesService(expert, "讲座")) return "";
    return hospitalThemes(expert.hospitalId)
      .flatMap((theme) => theme.topics || [])
      .filter((topic) => String(topic.expertId || "") === String(expert.id))
      .map((topic) => `${topic.title || ""} ${topic.dept || ""}`)
      .join(" ");
  }

  function expertMatchesLibrary(expert, overrides = {}) {
    if (expert?.active === false) return false;
    const scope = overrides.scope ?? state.expertScope;
    const availability = overrides.availability ?? state.expertAvailability;
    const service = overrides.service ?? state.expertService;
    const month = overrides.month ?? state.expertMonth;
    const hospital = overrides.hospital || libraryHospital();
    const region = overrides.region || currentClientRegion();
    if (scope === "nearby" && expert.hospitalId !== hospital?.id) return false;
    if (
      availability === "local" &&
      !hospitalMatchesRegion(hospitalById(expert.hospitalId), region)
    ) {
      return false;
    }
    if (availability !== "all" && !doctorAvailability(expert).bookable) return false;
    if (month > 0) {
      if (!matchesService(expert, "讲座")) return false;
      if (
        !expertThemeCoversRegion(
          expert,
          month,
          region.province,
          region.city,
          expert.hospitalId
        )
      ) {
        return false;
      }
    } else {
      if (!expertCoversRegion(expert, region.province, region.city)) return false;
      if (!matchesService(expert, service)) return false;
    }
    if (state.expertDept !== "all" && expert.dept !== state.expertDept) return false;
    if (state.expertTier !== "all" && expert.tier !== state.expertTier) return false;
    const q = state.expertSearch.trim().toLowerCase();
    if (q) {
      const haystack = [
        expert.name,
        expert.hospital,
        expert.dept,
        expert.deptTitle,
        expert.specialty,
        expert.coverage,
        lectureTopicSearchText(expert),
        ...(expert.coverageCities || []),
        ...(expert.services || [])
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  }

  function filteredLibraryExperts(overrides = {}) {
    const hospital = overrides.hospital || libraryHospital();
    const region = overrides.region || currentClientRegion();
    return state.experts
      .filter((expert) =>
        expertMatchesLibrary(expert, { ...overrides, hospital, region })
      )
      .sort(
        (a, b) =>
          CLIENT_TIER_ORDER.indexOf(a.tier) - CLIENT_TIER_ORDER.indexOf(b.tier) ||
          a.name.localeCompare(b.name, "zh-CN")
      );
  }

  function scopedServiceCount(service, scope = state.expertScope) {
    return filteredLibraryExperts({ service, scope }).length;
  }

  function serviceTagsFor(expert) {
    return normalizeServiceList(expert?.services).map((service) => ({ service }));
  }

  let slotsCache = null;
  let appointmentsCache = null;

  function allSlotsSnapshot() {
    if (!slotsCache) slotsCache = readJSON(STORAGE.slots, {});
    return slotsCache;
  }

  function getSlots(doctorId) {
    const all = allSlotsSnapshot();
    return all[doctorId] && typeof all[doctorId] === "object" ? all[doctorId] : {};
  }

  function getAllSlots() {
    return clone(allSlotsSnapshot());
  }

  function saveAllSlots(all) {
    if (writeJSON(STORAGE.slots, all)) {
      slotsCache = all;
      return true;
    }
    return false;
  }

  function setSlotsForDoctor(doctorId, map) {
    const all = getAllSlots();
    all[doctorId] = map;
    saveAllSlots(all);
  }

  function seedSlots() {
    const seeded = readJSON(STORAGE.seed, {});
    if (seeded.slots) return;
    const all = getAllSlots();
    const today = startOfDay();
    state.experts.forEach((expert, index) => {
      if (all[expert.id]) return;
      const map = {};
      const lead = Math.max(1, Number(expert.leadDays) || tierOf(expert).leadDays);
      for (let offset = lead; offset <= lead + 75; offset += 1) {
        const date = addDays(today, offset);
        const day = date.getDay();
        if (day === 0 || day === 6) continue;
        if (index % 3 === 0 && day === 1) continue;
        if (index % 4 === 0 && day === 5) continue;
        const capacity = expert.tier === "elite" ? 1 : day === 3 || day === 4 ? 2 : 1;
        map[isoDate(date)] = capacity;
      }
      all[expert.id] = map;
    });
    saveAllSlots(all);
    writeJSON(STORAGE.seed, { ...seeded, slots: true, at: new Date().toISOString() });
  }

  function seedDemoRecords() {
    const seeded = readJSON(STORAGE.seed, {});
    if (seeded.records) {
      const pendingDemo = getAppointments().find((item) => item.id === "BD-DEMO-01");
      if (pendingDemo && !pendingDemo.doctorId) {
        const fallbackExpert =
          state.experts.find(
            (item) =>
              item.hospitalId === pendingDemo.hospitalId &&
              item.active !== false &&
              matchesService(item, pendingDemo.serviceType)
          ) || state.experts[0];
        if (fallbackExpert) {
          updateAppointment(pendingDemo.id, {
            doctorId: fallbackExpert.id,
            doctorName: fallbackExpert.name,
            tier: fallbackExpert.tier
          });
        }
      }
      if (pendingDemo && pendingDemo.doctorId) {
        const doctor = expertById(pendingDemo.doctorId);
        const availability = doctor ? doctorAvailability(doctor) : { dates: [] };
        if (
          pendingDemo.status === "pending" &&
          !availability.dates.includes(pendingDemo.date)
        ) {
          const earliest = availability.dates.find(
            (date) => date >= isoDate(addDays(startOfDay(), 7))
          );
          if (earliest) updateAppointment(pendingDemo.id, { date: earliest });
        }
      }
      const legacyConfirmed = getAppointments().find(
        (item) => item.id === "BD-DEMO-03"
      );
      if (legacyConfirmed?.plan?.time === "10:00-12:00") {
        updateAppointment(legacyConfirmed.id, {
          plan: {
            ...legacyConfirmed.plan,
            time: "全天",
            agenda:
              legacyConfirmed.plan.agenda ===
              "10:00-10:20 场地准备\n10:20-11:40 分组咨询\n11:40-12:00 汇总答疑"
                ? "09:00-09:20 场地准备\n09:20-11:30 分组健康咨询\n13:30-16:30 分组健康咨询\n16:30-17:00 汇总答疑"
                : legacyConfirmed.plan.agenda,
            updatedAt: new Date().toISOString()
          }
        });
      }
      ensurePlanningDemoAppointment();
      return;
    }
    if (!getUser(DEMO_PHONE)) {
      upsertUser({
        ...DEMO_PROFILE,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }
    const hospital = hospitalById("pkuih") || state.hospitals[0];
    if (!hospital) return;
    const today = startOfDay();
    const staff = {
      username: "pkuih",
      name: "周老师",
      phone: "13800001111"
    };
    const specialist =
      state.experts.find(
        (item) =>
          item.hospitalId === hospital.id &&
          item.tier === "specialist" &&
          item.active !== false
      ) || state.experts[0];
    const director =
      state.experts.find(
        (item) =>
          item.hospitalId === hospital.id &&
          item.tier === "director" &&
          item.active !== false
      ) || specialist;
    const specialistDates = specialist ? doctorAvailability(specialist).dates : [];
    const directorDates = director ? doctorAvailability(director).dates : [];
    const reviewDate =
      specialistDates[0] || isoDate(addDays(today, Math.max(8, specialist?.leadDays || 7)));
    const confirmedDate =
      directorDates[0] || isoDate(addDays(today, Math.max(16, director?.leadDays || 14)));
    const pendingDate =
      specialistDates.find((date) => date >= isoDate(addDays(today, 8))) ||
      specialistDates[0] ||
      isoDate(addDays(today, 12));
    const now = new Date().toISOString();
    let appointmentChanged = false;
    let demandChanged = false;
    const appointments = getAppointments();
    if (!appointments.some((item) => item.id === "BD-DEMO-01")) {
      appointments.push(
        {
          id: "BD-DEMO-01",
          ownerPhone: DEMO_PHONE,
          orgName: DEMO_PROFILE.orgName,
          orgType: DEMO_PROFILE.orgType,
          contactName: DEMO_PROFILE.name,
          contactTitle: DEMO_PROFILE.title,
          phone: DEMO_PHONE,
          province: "北京市",
          city: "北京市",
          address: "北京市朝阳区建国路 88 号",
          venue: "客户总部 3 层报告厅",
          serviceType: "讲座",
          doctorId: specialist?.id || "",
          doctorName: specialist?.name || "",
          tier: specialist?.tier || "specialist",
          hospitalId: hospital.id,
          date: pendingDate,
          topic: "职场人群睡眠与压力管理",
          audience: "企业员工",
          headcount: "80",
          note: "希望安排现场问答，活动时长约 90 分钟。",
          status: "pending",
          assignedStaff: null,
          plan: null,
          planHistory: [],
          internalNote: "",
          feedback: "",
          createdAt: now,
          updatedAt: now
        },
        {
          id: "BD-DEMO-02",
          ownerPhone: DEMO_PHONE,
          orgName: DEMO_PROFILE.orgName,
          orgType: DEMO_PROFILE.orgType,
          contactName: DEMO_PROFILE.name,
          contactTitle: DEMO_PROFILE.title,
          phone: DEMO_PHONE,
          province: "北京市",
          city: "北京市",
          address: "北京市海淀区中关村软件园 8 号楼",
          venue: "一层多功能厅",
          serviceType: "讲座",
          doctorId: specialist?.id || "",
          doctorName: specialist?.name || "",
          tier: specialist?.tier || "specialist",
          hospitalId: hospital.id,
          date: reviewDate,
          topic: "久坐人群体态与颈腰椎健康管理",
          audience: "研发与管理团队",
          headcount: "60",
          note: "客户希望增加现场体态评估与答疑环节。",
          status: "review",
          assignedStaff: staff,
          plan: {
            topic: "久坐人群体态与颈腰椎健康管理",
            serviceType: "讲座",
            speakerId: specialist?.id || "",
            speaker: specialist ? `${specialist.name} · ${specialist.deptTitle}` : "院方安排",
            date: reviewDate,
            time: "全天",
            province: "北京市",
            city: "北京市",
            venue: "一层多功能厅",
            address: "北京市海淀区中关村软件园 8 号楼",
            outline:
              "1. 久坐与常见颈腰椎问题\n2. 办公场景中的风险识别\n3. 日常拉伸与运动处方\n4. 现场问答与健康咨询",
            agenda:
              "14:00-14:10 签到与开场\n14:10-15:10 专家主题分享\n15:10-15:40 现场问答\n15:40-16:00 健康咨询",
            team: "周老师（项目负责人）",
            message: "院方已完成专家与课题匹配，请确认活动时间、地点与流程。如人数或场地有变化，请提前联系项目对接人。",
            contact: "周老师 · 13800001111",
            updatedAt: now
          },
          planHistory: [],
          internalNote: "场地投影与电源待客户确认；建议专家提前 40 分钟到场。",
          feedback: "",
          acceptedAt: now,
          planSentAt: now,
          createdAt: now,
          updatedAt: now
        },
        {
          id: "BD-DEMO-03",
          ownerPhone: DEMO_PHONE,
          orgName: DEMO_PROFILE.orgName,
          orgType: DEMO_PROFILE.orgType,
          contactName: DEMO_PROFILE.name,
          contactTitle: DEMO_PROFILE.title,
          phone: DEMO_PHONE,
          province: "北京市",
          city: "北京市",
          address: "北京市朝阳区望京 SOHO T1",
          venue: "B1 员工活动中心",
          serviceType: "健康咨询",
          doctorId: director?.id || "",
          doctorName: director?.name || "",
          tier: director?.tier || "director",
          hospitalId: hospital.id,
          date: confirmedDate,
          topic: "企业员工代谢健康与体重管理咨询",
          audience: "全体职工",
          headcount: "120",
          note: "需要分时段到场，现场提供血压与体脂测量。",
          status: "confirmed",
          assignedStaff: staff,
          plan: {
            topic: "企业员工代谢健康与体重管理咨询",
            serviceType: "健康咨询",
            speakerId: director?.id || "",
            speaker: director ? `${director.name} · ${director.deptTitle}` : "院方安排",
            date: confirmedDate,
            time: "全天",
            province: "北京市",
            city: "北京市",
            venue: "B1 员工活动中心",
            address: "北京市朝阳区望京 SOHO T1",
            outline: "血压、体脂与腰围测量；代谢风险分层；个体化饮食与运动建议。",
            agenda:
              "09:00-09:20 场地准备\n09:20-11:30 分组健康咨询\n13:30-16:30 分组健康咨询\n16:30-17:00 汇总答疑",
            team: "周老师（项目负责人）、张老师（现场执行）",
            message: "方案已确认，院方将按流程到场执行。",
            contact: "周老师 · 13800001111",
            updatedAt: now
          },
          planHistory: [],
          internalNote: "已确认场地与设备。",
          feedback: "",
          acceptedAt: now,
          planSentAt: now,
          confirmedAt: now,
          createdAt: now,
          updatedAt: now
        }
      );
      appointmentChanged = true;
    }
    const demands = getDemands();
    if (!demands.some((item) => item.id === "XQ-DEMO-01")) {
      demands.push(
        {
          id: "XQ-DEMO-01",
          ownerPhone: DEMO_PHONE,
          orgName: DEMO_PROFILE.orgName,
          orgType: DEMO_PROFILE.orgType,
          contactName: DEMO_PROFILE.name,
          contactTitle: DEMO_PROFILE.title,
          phone: DEMO_PHONE,
          province: "北京市",
          city: "北京市",
          hospitalId: hospital.id,
          serviceType: "健康咨询",
          topic: "企业园区颈肩腰腿痛健康咨询",
          audience: "一线员工与司机班组",
          headcount: "120",
          preferredDate: isoDate(addDays(today, 20)),
          note: "希望安排康复或骨科方向医生，现场可分两组咨询。",
          status: "pending",
          assignedStaff: null,
          followUps: [],
          createdAt: now,
          updatedAt: now
        },
        {
          id: "XQ-DEMO-02",
          ownerPhone: DEMO_PHONE,
          orgName: DEMO_PROFILE.orgName,
          orgType: DEMO_PROFILE.orgType,
          contactName: DEMO_PROFILE.name,
          contactTitle: DEMO_PROFILE.title,
          phone: DEMO_PHONE,
          province: "北京市",
          city: "北京市",
          hospitalId: hospital.id,
          serviceType: "1V1报告解读",
          topic: "管理层一对一健康咨询",
          audience: "管理层 12 人",
          headcount: "12",
          preferredDate: isoDate(addDays(today, 26)),
          note: "希望安排全科或心血管方向专家。",
          status: "contacted",
          assignedStaff: staff,
          followUps: [
            {
              note: "已电话沟通，建议采用全科 + 心血管方向专家分组咨询。",
              by: staff,
              at: now
            }
          ],
          createdAt: now,
          updatedAt: now
        }
      );
      demandChanged = true;
    }
    if (appointmentChanged) saveAppointments(appointments);
    ensurePlanningDemoAppointment();
    if (demandChanged) saveDemands(demands);
    writeJSON(STORAGE.seed, {
      ...seeded,
      records: true,
      recordsAt: new Date().toISOString()
    });
  }

  function ensurePlanningDemoAppointment() {
    const appointments = getAppointments();
    if (appointments.some((item) => item.id === "BD-DEMO-04")) return;
    const hospital = hospitalById("pkuih") || state.hospitals[0];
    if (!hospital) return;
    const staff = {
      username: "pkuih",
      name: "周老师",
      phone: "13800001111"
    };
    const expert =
      state.experts.find(
        (item) =>
          item.hospitalId === hospital.id &&
          item.active !== false &&
          matchesService(item, "讲座")
      ) || null;
    if (!expert) return;
    const available = doctorAvailability(expert).dates;
    const fallbackDate = isoDate(
      addDays(startOfDay(), Math.max(10, Number(expert.leadDays) || 7) + 2)
    );
    const date =
      available.find(
        (item) => item >= isoDate(addDays(startOfDay(), Math.max(7, Number(expert.leadDays) || 7)))
      ) ||
      available[0] ||
      fallbackDate;
    const now = new Date().toISOString();
    appointments.push({
      id: "BD-DEMO-04",
      ownerPhone: DEMO_PHONE,
      orgName: DEMO_PROFILE.orgName,
      orgType: DEMO_PROFILE.orgType,
      contactName: DEMO_PROFILE.name,
      contactTitle: DEMO_PROFILE.title,
      phone: DEMO_PHONE,
      province: "北京市",
      city: "北京市",
      address: "北京市朝阳区望京国际商务区 A 座",
      venue: "12 层客户活动厅",
      serviceType: "讲座",
      doctorId: expert.id,
      doctorName: expert.name,
      tier: expert.tier,
      hospitalId: hospital.id,
      date,
      topic: "高压职场人群的睡眠与精力管理",
      audience: "核心业务团队",
      headcount: "70",
      note: "希望加入现场互动答疑，活动对象以业务骨干为主。",
      status: "planning",
      assignedStaff: staff,
      plan: null,
      planHistory: [],
      internalNote: "已接单，等待与机构确认最终课题和现场流程。",
      feedback: "",
      acceptedAt: now,
      createdAt: now,
      updatedAt: now
    });
    saveAppointments(appointments);
  }

  function getAppointments() {
    if (!appointmentsCache) appointmentsCache = readJSON(STORAGE.appointments, []);
    return Array.isArray(appointmentsCache) ? appointmentsCache : [];
  }

  function saveAppointments(items) {
    if (writeJSON(STORAGE.appointments, items)) {
      appointmentsCache = items;
      return true;
    }
    return false;
  }

  function appointmentsForUser(phone) {
    return getAppointments()
      .filter((item) => item.ownerPhone === phone)
      .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  }

  function appointmentById(id) {
    return getAppointments().find((item) => item.id === id) || null;
  }

  function clientOwnsAppointment(appointment) {
    return Boolean(
      appointment &&
        state.session?.phone &&
        appointment.ownerPhone === state.session.phone
    );
  }

  function clientOwnsDemand(demand) {
    return Boolean(
      demand && state.session?.phone && demand.ownerPhone === state.session.phone
    );
  }

  function appointmentOrgSnapshot(appointment) {
    if (!appointment) return null;
    if (appointment.orgProfileSnapshot) return appointment.orgProfileSnapshot;
    return {
      name: appointment.contactName || "",
      orgName: appointment.orgName || "",
      orgType: appointment.orgType || "",
      title: appointment.contactTitle || "",
      contactPhone: appointment.phone || "",
      email: appointment.email || "",
      province: "",
      city: "",
      capturedAt: appointment.createdAt || "",
      source: "legacy"
    };
  }

  function currentOrgProfile(user = state.session) {
    if (!user) return null;
    return {
      name: user.name || "",
      orgName: user.orgName || "",
      orgType: user.orgType || "",
      title: user.title || "",
      contactPhone: user.contactPhone || user.phone || "",
      email: user.email || "",
      province: user.province || "",
      city: user.city || "",
      capturedAt: new Date().toISOString(),
      source: "profile-sync"
    };
  }

  function appointmentProfileDiff(appointment) {
    const snapshot = appointmentOrgSnapshot(appointment);
    const current = currentOrgProfile();
    if (!snapshot || !current) return [];
    const fields = [
      ["orgName", "单位名称"],
      ["name", "联系人"],
      ["title", "职务"],
      ["orgType", "机构类型"],
      ["contactPhone", "联系电话"],
      ["email", "通知邮箱"]
    ];
    return fields
      .filter(([key]) => String(current[key] || "").trim() !== String(snapshot[key] || "").trim())
      .map(([key, label]) => ({
        key,
        label,
        from: String(snapshot[key] || "未填写"),
        to: String(current[key] || "未填写")
      }));
  }

  function syncAppointmentProfile(appointmentId) {
    const appointment = appointmentById(appointmentId);
    if (!appointment) return showToast("预约记录不存在。");
    if (!clientOwnsAppointment(appointment)) return showToast("无权同步该预约资料。");
    if (["completed", "cancelled"].includes(appointment.status)) {
      return showToast("已结束的预约保留历史资料快照，不能再同步。");
    }
    const current = currentOrgProfile();
    if (!current) return showToast("登录状态已失效，请重新登录。");
    const diff = appointmentProfileDiff(appointment);
    if (!diff.length) return showToast("当前资料与预约快照一致，无需同步。");
    const now = new Date().toISOString();
    updateAppointment(appointment.id, {
      orgName: current.orgName,
      orgType: current.orgType,
      contactName: current.name,
      contactTitle: current.title,
      phone: current.contactPhone,
      email: current.email,
      orgProfileSnapshot: current,
      profileSyncedAt: now,
      hospitalNotice: {
        type: "profile",
        message: "机构同步了预约联系人/企业资料，请使用最新信息发送推送。",
        at: now,
        readAt: ""
      }
    });
    logOperation("机构同步预约客户资料", appointment.id, {
      entityType: "appointment",
      entityId: appointment.id,
      hospitalId: appointment.hospitalId
    });
    renderOverlay();
    refreshRecordPanel();
    showToast("已同步最新企业资料；院方推送将使用新联系人信息。");
  }

  function updateAppointment(id, patch) {
    let updated = null;
    const items = getAppointments().map((item) => {
      if (item.id !== id) return item;
      updated = { ...item, ...patch, updatedAt: new Date().toISOString() };
      return updated;
    });
    saveAppointments(items);
    return updated;
  }

  function bookedCount(doctorId, dateIso, ignoreId = "") {
    return getAppointments().filter(
      (item) =>
        item.doctorId === doctorId &&
        item.date === dateIso &&
        item.status !== "cancelled" &&
        item.id !== ignoreId
    ).length;
  }

  function bookedCountMap(doctorId, ignoreId = "") {
    const counts = {};
    getAppointments().forEach((item) => {
      if (
        item.doctorId !== doctorId ||
        item.status === "cancelled" ||
        item.id === ignoreId
      ) {
        return;
      }
      counts[item.date] = (counts[item.date] || 0) + 1;
    });
    return counts;
  }

  function dayCapacity(doctorId, dateIso) {
    const map = getSlots(doctorId);
    return Number(map[dateIso] || 0);
  }

  function dayRemaining(doctorId, dateIso, ignoreId = "") {
    return Math.max(0, dayCapacity(doctorId, dateIso) - bookedCount(doctorId, dateIso, ignoreId));
  }

  function doctorAvailability(expert, ignoreId = "") {
    if (!expert) return { bookable: false, next: "", remaining: 0, dates: [] };
    const map = getSlots(expert.id);
    const booked = bookedCountMap(expert.id, ignoreId);
    const lead = Math.max(0, Number(expert.leadDays) || tierOf(expert).leadDays);
    const minDate = isoDate(addDays(startOfDay(), lead));
    const today = todayIso();
    let next = "";
    let remaining = 0;
    const dates = [];
    Object.keys(map)
      .sort()
      .forEach((date) => {
        if (date < minDate || date < today) return;
        const left = Math.max(0, Number(map[date] || 0) - (booked[date] || 0));
        if (left > 0) {
          if (!next) next = date;
          remaining += left;
          dates.push(date);
        }
      });
    return { bookable: remaining > 0, next, remaining, dates };
  }

  function adminAppointments() {
    const hospital = isSuperadmin()
      ? state.adminHospitalId
        ? hospitalById(state.adminHospitalId)
        : null
      : operatorHospital();
    return getAppointments().filter((item) => {
      if (!hospital) return true;
      return item.hospitalId === hospital.id;
    });
  }

  function getDemands() {
    return readJSON(STORAGE.demands, []);
  }

  function saveDemands(items) {
    writeJSON(STORAGE.demands, items);
  }

  function demandsForUser(phone) {
    return getDemands()
      .filter((item) => item.ownerPhone === phone)
      .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  }

  function demandById(id) {
    return getDemands().find((item) => item.id === id) || null;
  }

  function demandTargetName(demand) {
    if (!demand) return "";
    if (demand.targetType === "group") return "集团企康办";
    return hospitalById(demand.hospitalId)?.name || "医院待分配";
  }

  function adminCanManageDemand(demand) {
    if (!demand || !state.adminUser) return false;
    if (demand.targetType === "group" || !demand.hospitalId) return isSuperadmin();
    return adminCanManageHospital(demand.hospitalId);
  }

  function updateDemand(id, patch) {
    let updated = null;
    const items = getDemands().map((item) => {
      if (item.id !== id) return item;
      updated = { ...item, ...patch, updatedAt: new Date().toISOString() };
      return updated;
    });
    saveDemands(items);
    return updated;
  }

  function adminDemands() {
    const hospital = isSuperadmin()
      ? state.adminHospitalId
        ? hospitalById(state.adminHospitalId)
        : null
      : operatorHospital();
    return getDemands()
      .filter((item) => {
        if (item.targetType === "group" || !item.hospitalId) {
          return isSuperadmin();
        }
        if (!hospital) return true;
        return item.hospitalId === hospital.id;
      })
      .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  }

  function getSmsLogs() {
    return readJSON(STORAGE.smsLogs, {});
  }

  function smsLogIsCurrent(appointment, log) {
    if (!log?.copiedAt) return false;
    const copiedAt = new Date(log.copiedAt).getTime();
    if (!Number.isFinite(copiedAt)) return false;
    const changeTimes = [
      appointment?.plan?.updatedAt,
      appointment?.planSentAt,
      appointment?.profileSyncedAt
    ]
      .map((value) => (value ? new Date(value).getTime() : NaN))
      .filter(Number.isFinite);
    if (!changeTimes.length) return true;
    return copiedAt >= Math.max(...changeTimes);
  }

  function saveSmsLog(id, payload) {
    const logs = getSmsLogs();
    logs[id] = payload;
    writeJSON(STORAGE.smsLogs, logs);
  }

  function getOperationLogs() {
    const logs = readJSON(STORAGE.operationLogs, []);
    return Array.isArray(logs) ? logs : [];
  }

  function logOperation(action, detail, meta = {}) {
    const actor = state.adminUser
      ? {
          username: state.adminUser.username,
          name: state.adminUser.name,
          role: state.adminUser.role,
          hospitalId: state.adminUser.hospitalId || ""
        }
      : null;
    const logs = getOperationLogs();
    logs.unshift({
      id: `LOG-${Date.now()}-${Math.floor(Math.random() * 900 + 100)}`,
      action,
      detail: String(detail || ""),
      actor,
      entityType: meta.entityType || "",
      entityId: meta.entityId || "",
      hospitalId: meta.hospitalId || actor?.hospitalId || "",
      at: new Date().toISOString()
    });
    writeJSON(STORAGE.operationLogs, logs.slice(0, 300));
  }

  /* =========================================================
     Seasonal themes
     ========================================================= */
  function seasonalOf(month = currentMonth()) {
    return state.seasonal.find((item) => item.month === Number(month)) || state.seasonal[0] || null;
  }

  function seasonalTerm(value) {
    const match = String(value || "").match(/^[（(]([^）)]+)[）)]/);
    return match?.[1] || "";
  }

  function seasonalHeadline(value) {
    const text = String(value || "").replace(/^[（(][^）)]+[）)]\s*/, "").trim();
    return text || String(value || "");
  }

  function seasonKeyOf(month = currentMonth()) {
    const value = Number(month) || currentMonth();
    if ([12, 1, 2].includes(value)) return "winter";
    if ([3, 4, 5].includes(value)) return "spring";
    if ([6, 7, 8].includes(value)) return "summer";
    return "autumn";
  }

  function seasonGlyphOf(month = currentMonth()) {
    return {
      winter: "snow",
      spring: "flower",
      summer: "sun",
      autumn: "leaf"
    }[seasonKeyOf(month)];
  }

  const DEPT_ALIASES = {
    心血管: ["心血管"],
    呼吸科: ["呼吸"],
    肿瘤: ["肿瘤"],
    肾病: ["肾病"],
    内分泌: ["内分泌代谢", "内分泌"],
    儿科: ["儿科", "儿童", "呼吸"],
    全科: ["全科/健管", "全科"],
    神经内科: ["神经内科", "神经"],
    骨科: ["骨科"],
    康复科: ["康复"],
    中医科: ["中医"],
    心理: ["心理"],
    睡眠: ["睡眠"],
    急诊急救: ["急救应急"],
    皮肤医美: ["皮肤医美"],
    感染肝病: ["感染肝病"],
    临床营养: ["临床营养"],
    妇科: ["妇科", "女性"],
    其他: []
  };

  function themesForExpert(expert, month) {
    const theme = hospitalTheme(expert?.hospitalId, month);
    if (!theme) return [];
    return (theme.topics || [])
      .filter((topic) => String(topic.expertId || "") === String(expert.id))
      .map((topic) => ({
        id: topic.id,
        dept: topic.dept || "综合",
        title: topic.title,
        month: Number(month),
        hospital: expert.hospital,
        professionalTitle: expert.deptTitle,
        coverage: themeTopicCoverage(topic, theme, expert.hospitalId).label,
        season: theme.season,
        matched: true
      }))
      .slice(0, 8);
  }

  function monthsForExpert(expert) {
    if (!expert) return new Set();
    return new Set(
      hospitalThemes(expert.hospitalId)
        .filter((theme) =>
          (theme.topics || []).some(
            (topic) => String(topic.expertId || "") === String(expert.id)
          )
        )
        .map((theme) => Number(theme.month))
    );
  }

  function seasonSummary(month) {
    const season = seasonalOf(month);
    if (!season) return "";
    return `${season.season} · ${season.focus}`;
  }

  function themeImageFor(month) {
    return `assets/themes/theme-${String(Number(month) || 1).padStart(2, "0")}.jpg`;
  }

  function defaultThemeCoverage(hospital) {
    if (!hospital) return ["全国"];
    const region = normalizeRegion(hospital.province, hospital.city);
    return [region.city || region.province];
  }

  function defaultThemeConfig(hospitalId, month) {
    const hospital = hospitalById(hospitalId);
    const season = seasonalOf(month);
    if (!hospital || !season) return null;
    const hospitalExperts = state.experts.filter(
      (expert) =>
        expert.hospitalId === hospital.id &&
        expert.active !== false &&
        matchesService(expert, "讲座")
    );
    const byName = new Map(hospitalExperts.map((expert) => [expert.name, expert]));
    const exact = state.themeMatches
      .filter(
        (row) =>
          row.month === Number(month) &&
          byName.has(row.doctor) &&
          (!row.hospital ||
            row.hospital === hospital.name ||
            row.hospital.includes(hospital.name) ||
            hospital.name.includes(row.hospital))
      )
      .map((row) => {
        const expert = byName.get(row.doctor);
        const coverageCities = themeCoverageCitiesFromLabel(row.coverage);
        return {
          id: `${month}-${row.doctor}-${row.topic}`,
          dept: row.dept,
          title: row.topic,
          expertId: expert?.id || "",
          coverage: row.coverage || "",
          coverageCities
        };
      });
    const seen = new Set();
    const topics = exact
      .filter((topic) => {
        if (seen.has(topic.title)) return false;
        seen.add(topic.title);
        return true;
      })
      .slice(0, 8);
    if (!topics.length) {
      season.topics.forEach((topic) => {
        if (topics.length >= 6) return;
        const expert = hospitalExperts.find((item) => {
          const deptAliases = DEPT_ALIASES[item.dept] || [item.dept];
          return [...new Set([item.dept, ...deptAliases].filter(Boolean))].some(
            (keyword) => topic.dept.includes(keyword) || keyword.includes(topic.dept)
          );
        });
        if (expert) {
          const coverageCities = defaultThemeCoverage(hospital);
          topics.push({
            id: `${month}-fallback-${topics.length}`,
            dept: topic.dept,
            title: topic.title,
            expertId: expert.id,
            coverage: coverageText(coverageCities),
            coverageCities
          });
        }
      });
    }
    const expertIds = [...new Set(topics.map((topic) => topic.expertId).filter(Boolean))];
    const topicCoverageCities = mergeCoverageCities(
      topics.flatMap(
        (topic) =>
          resolveTopicCoverageCities(topic, { month: Number(month) }, hospital.id)
            .cities
      )
    );
    return {
      month: Number(month),
      season: season.season,
      focus: season.focus,
      intro: `本月时令聚焦「${season.season.replace(/^（.*?）\s*/, "")}」。由${hospital.name}专家团队围绕${season.focus}开展企业讲座，重点关注${season.diseases}。`,
      diseases: season.diseases,
      industries: season.industries,
      image: themeImageFor(month),
      coverageCities: topicCoverageCities.length
        ? topicCoverageCities
        : defaultThemeCoverage(hospital),
      expertIds,
      topics
    };
  }

  function clientThemeTopics(
    theme,
    hospitalId = "",
    province = "",
    city = "",
    include = {}
  ) {
    if (!theme) return [];
    const includeId = String(include?.topicId || "");
    const includeTitle = String(include?.title || "").trim();
    return (theme.topics || []).filter((topic) => {
      const expert = topic?.expertId ? expertById(topic.expertId) : null;
      const valid = Boolean(
        expert &&
          expert.active !== false &&
          matchesService(expert, "讲座") &&
          (!hospitalId || expert.hospitalId === hospitalId)
      );
      if (!valid) return false;
      if (!province && !city) return true;
      const selected =
        (includeId &&
          String(topic.id || "") === includeId) ||
        (includeTitle &&
          String(topic.title || "").trim() === includeTitle);
      return (
        selected ||
        themeTopicCoversRegion(
          themeTopicCoverage(topic, theme, hospitalId),
          province,
          city
        )
      );
    });
  }

  function getThemeConfigStore() {
    return readJSON(STORAGE.themeConfig, {});
  }

  function saveThemeConfigStore(store) {
    writeJSON(STORAGE.themeConfig, store);
  }

  function hospitalThemes(hospitalId) {
    const hospital = hospitalById(hospitalId);
    if (!hospital) return [];
    if (hospitalThemesCache.has(hospital.id)) return hospitalThemesCache.get(hospital.id);
    const store = getThemeConfigStore();
    const saved = store?.[hospital.id] || {};
    const themes = Array.from({ length: 12 }, (_, index) => {
      const month = index + 1;
      const base = defaultThemeConfig(hospital.id, month);
      const rawTopics =
        saved[month]?.topics !== undefined ? saved[month].topics : base?.topics || [];
      const themeLike = {
        ...(base || {}),
        ...(saved[month] || {}),
        month
      };
      const topics = rawTopics.map((topic) => {
        const resolved = resolveTopicCoverageCities(topic, themeLike, hospital.id);
        return {
          ...topic,
          coverageCities: resolved.cities,
          coverage: resolved.cities.length
            ? coverageText(resolved.cities)
            : topic.coverage || ""
        };
      });
      return {
        ...base,
        ...(saved[month] || {}),
        month,
        coverageCities:
          saved[month]?.coverageCities !== undefined
            ? saved[month].coverageCities
            : base?.coverageCities || [],
        expertIds:
          [
            ...new Set(
              saved[month]?.expertIds !== undefined
                ? saved[month].expertIds
                : base?.expertIds || []
            )
          ],
        topics,
        image: saved[month]?.image || base?.image || themeImageFor(month)
      };
    });
    hospitalThemesCache.set(hospital.id, themes);
    return themes;
  }

  function hospitalTheme(hospitalId, month) {
    return hospitalThemes(hospitalId).find((theme) => theme.month === Number(month)) || null;
  }

  function saveHospitalTheme(hospitalId, draft) {
    if (!hospitalId || !draft?.month) return;
    const store = getThemeConfigStore();
    store[hospitalId] = store[hospitalId] || {};
    const topics = (draft.topics || []).map((topic, index) => {
      const resolved = resolveTopicCoverageCities(topic, draft, hospitalId);
      return {
        ...topic,
        id: topic.id || `${draft.month}-custom-${index}-${Date.now()}`,
        coverage: resolved.cities.length
          ? coverageText(resolved.cities)
          : String(topic.coverage || "").trim(),
        coverageCities: resolved.cities
      };
    });
    store[hospitalId][draft.month] = {
      ...draft,
      month: Number(draft.month),
      coverageCities: mergeCoverageCities(
        topics.flatMap((topic) => topic.coverageCities || [])
      ),
      expertIds: [...new Set(topics.map((topic) => topic.expertId).filter(Boolean))],
      topics
    };
    saveThemeConfigStore(store);
    hospitalThemesCache.clear();
  }

  /* =========================================================
     Icons
     ========================================================= */
  function icon(name, size = 18) {
    const paths = ICONS[name] || ICONS.dot;
    return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
  }

  const ICONS = {
    dot: '<circle cx="12" cy="12" r="2.4" fill="currentColor" stroke="none"/>',
    home: '<path d="M4 10.2 12 3l8 7.2V21a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z"/>',
    experts:
      '<path d="M8.5 11a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z"/><path d="M2.8 20.2c.4-3.6 2.6-5.6 5.7-5.6s5.3 2 5.7 5.6"/><path d="M16.2 10.4a2.6 2.6 0 1 0 0-5.2"/><path d="M16.4 14.8c2.8.1 4.6 2 5 5.4"/>',
    calendar:
      '<rect x="3.5" y="5" width="17" height="16" rx="3"/><path d="M8 3v4M16 3v4M3.5 10h17"/><path d="M8 14h2.5M13.5 14H16M8 17.5h2.5"/>',
    user: '<circle cx="12" cy="8" r="3.6"/><path d="M4.5 21c.5-4 3-6.2 7.5-6.2s7 2.2 7.5 6.2"/>',
    search: '<circle cx="10.8" cy="10.8" r="6.6"/><path d="m20 20-4.4-4.4"/>',
    chevronRight: '<path d="m9 5 7 7-7 7"/>',
    chevronLeft: '<path d="m15 5-7 7 7 7"/>',
    chevronDown: '<path d="m5 9 7 7 7-7"/>',
    crosshair:
      '<circle cx="12" cy="12" r="6.8"/><path d="M12 2.5v3.2M12 18.3v3.2M2.5 12h3.2M18.3 12h3.2"/><circle cx="12" cy="12" r="2.2"/>',
    close: '<path d="M5.5 5.5 18.5 18.5M18.5 5.5 5.5 18.5"/>',
    check: '<path d="m4.5 12.5 5 5 10-11"/>',
    checkCircle: '<circle cx="12" cy="12" r="9"/><path d="m7.6 12.2 3 3 5.8-6.2"/>',
    clock: '<circle cx="12" cy="12" r="8.6"/><path d="M12 7v5.6l3.6 2.1"/>',
    building:
      '<path d="M4 21V6.5L12 3v18M12 21h8V10l-8-3.5"/><path d="M7.5 8.5h1M7.5 12h1M7.5 15.5h1M15.5 12h1M15.5 15.5h1M2.5 21h19"/>',
    phone:
      '<path d="M7.2 3.6 9.8 4c.5.1.8.5.9 1l.7 3.1c.1.5-.1 1-.5 1.3L9 10.8a13 13 0 0 0 4.2 4.2l1.4-1.9c.3-.4.8-.6 1.3-.5l3.1.7c.5.1.9.4 1 1l.4 2.6c.1.7-.4 1.3-1.1 1.4-8 1-15.2-6.2-14.2-14.2.1-.7.7-1.2 1.4-1.1Z"/>',
    message: '<path d="M20.5 11.5a8.5 8.5 0 0 1-12.3 7.6L3.5 20.5l1.4-4.6A8.5 8.5 0 1 1 20.5 11.5Z"/><path d="M8.5 10h7M8.5 13.5h4.5"/>',
    send: '<path d="m21 3-7.2 18-3.6-7.2L3 10.2Z"/><path d="M21 3 10.2 13.8"/>',
    shield: '<path d="M12 3 4.5 6v5.2c0 4.6 3 8.2 7.5 9.8 4.5-1.6 7.5-5.2 7.5-9.8V6Z"/><path d="m9 12 2.2 2.2L15.5 10"/>',
    arrowRight: '<path d="M4 12h16M14 6l6 6-6 6"/>',
    arrowUpRight: '<path d="M7 17 17 7M8 7h9v9"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    edit: '<path d="M4 20h4L20 8l-4-4L4 16Z"/><path d="m14 6 4 4"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14M10 11v6M14 11v6"/>',
    logout: '<path d="M10 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h5"/><path d="M14 8l4 4-4 4M8 12h10"/>',
    mapPin: '<path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/>',
    sparkles:
      '<path d="M12 3.5 13.8 9l5.5 1.8-5.5 1.8L12 18l-1.8-5.4L4.7 10.8 10.2 9Z"/><path d="M19 16.5 19.8 19l2.5.8-2.5.8L19 23l-.8-2.4-2.5-.8 2.5-.8Z"/>',
    leaf: '<path d="M20 4C11 4 4.5 8.5 4.5 15.5c0 2 .7 3.5 1.8 4.5C8 13 12 10 18 8c-4.6 2.6-7.7 6.2-9.2 11.4 2.2.7 4.3.4 6.2-.8C20 15.8 20 9.2 20 4Z"/>',
    snow: '<path d="M12 2.5v19M4 7l16 10M20 7 4 17"/><path d="m9 4 3 2 3-2M9 20l3-2 3 2M2.9 9.3l3.2 1.4.5 3.5M21.1 14.7l-3.2-1.4-.5-3.5M4.1 16.6l1.4-3.2 3.5-.5M19.9 7.4l-1.4 3.2-3.5.5"/>',
    flower:
      '<circle cx="12" cy="12" r="2.1"/><path d="M12 9.9C10.5 6 12.5 3.5 14.8 3.8 17 4.2 17 7.8 14 9.9M14.1 12c3.9-1.5 6.4.5 6.1 2.8-.4 2.2-4 2.2-6.1-.8M12 14.1c1.5 3.9-.5 6.4-2.8 6.1-2.2-.4-2.2-4 .8-6.1M9.9 12C6 13.5 3.5 11.5 3.8 9.2 4.2 7 7.8 7 9.9 10"/>',
    sun: '<circle cx="12" cy="12" r="4.1"/><path d="M12 2.5v3M12 18.5v3M2.6 12h3M18.4 12h3M5.4 5.4l2.1 2.1M16.5 16.5l2.1 2.1M18.6 5.4l-2.1 2.1M7.5 16.5l-2.1 2.1"/>',
    stethoscope:
      '<path d="M5 3v5a4 4 0 0 0 8 0V3"/><path d="M5 3h2M11 3h2"/><path d="M9 12v3a5 5 0 0 0 10 0v-2"/><circle cx="19" cy="10" r="2.2"/>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M9 7V4.8c0-.5.4-.8.8-.8h4.4c.4 0 .8.3.8.8V7M3 12.5h18"/>',
    users:
      '<circle cx="9" cy="8.5" r="3.2"/><path d="M3 20c.4-3.4 2.5-5.3 6-5.3s5.6 1.9 6 5.3"/><path d="M15.5 5.6a3 3 0 0 1 0 5.8M16.2 14.9c3 .3 4.6 2 5 5.1"/>',
    clipboard:
      '<rect x="5" y="4.5" width="14" height="17" rx="2.5"/><path d="M9 4.5V3h6v1.5M8.5 9h7M8.5 12.5h7M8.5 16h4.5"/>',
    download: '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M4 20h16"/>',
    history: '<path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1L3.5 8"/><path d="M3.5 4v4.5H8"/><path d="M12 8v4.5l3 1.8"/>',
    alert: '<circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5v.1"/>',
    star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.5l6.1-.9Z"/>'
  };

  /* =========================================================
     Scroll, history & overlays
     ========================================================= */
  function currentViewScrollKey() {
    if (state.screen === "admin") return `admin:${state.adminTab}`;
    if (state.screen === "main") return `main:${state.tab}`;
    return state.screen || "main:home";
  }

  function storeCurrentScroll() {
    const key = currentViewScrollKey();
    const bucket = key.startsWith("admin:") ? state.viewScroll.admin : state.viewScroll.main;
    bucket[key] = currentWindowScroll();
    return key;
  }

  function currentWindowScroll() {
    return state.overlay
      ? state.overlayScrollY ?? window.scrollY ?? 0
      : window.scrollY ?? 0;
  }

  function storedScrollForView(key) {
    const bucket = key.startsWith("admin:") ? state.viewScroll.admin : state.viewScroll.main;
    return bucket[key] ?? 0;
  }

  function restoreWindowScroll(top) {
    const target = Math.max(0, Number(top) || 0);
    window.requestAnimationFrame(() => {
      window.scrollTo(0, target);
      window.requestAnimationFrame(() => window.scrollTo(0, target));
    });
  }

  function replaceCurrentHistoryEntry(extra = {}) {
    try {
      window.history.replaceState(
        {
          ...(window.history.state || {}),
          ...extra
        },
        "",
        window.location.href
      );
    } catch {
      // History updates are best effort; navigation remains usable.
    }
  }

  function pushAppHistory(layer = "overlay", overlayDepth = null, extra = {}) {
    if (state.screen === "auth" && layer !== "auth") return false;
    try {
      const nextState = {
        ...(window.history.state || {}),
        pkuihLayer: layer,
        pkuihTab: extra.tab || state.tab,
        pkuihScroll:
          extra.scroll !== undefined
            ? Math.max(0, Number(extra.scroll) || 0)
            : Math.max(0, currentWindowScroll())
      };
      if (overlayDepth == null) delete nextState.pkuihOverlayDepth;
      else nextState.pkuihOverlayDepth = overlayDepth;
      window.history.pushState(
        nextState,
        "",
        window.location.href
      );
      state.historyDepth += 1;
      return true;
    } catch {
      return false;
    }
  }

  function popAppHistory(levels = null) {
    const depth = state.historyDepth;
    if (depth <= 0) return 0;
    const count = levels === null ? depth : Math.min(Math.max(1, levels), depth);
    state.historyDepth = depth - count;
    state.suppressPopCount += 1;
    try {
      window.history.go(-count);
      return count;
    } catch {
      state.historyDepth += count;
      state.suppressPopCount = Math.max(0, state.suppressPopCount - 1);
      return 0;
    }
  }

  function pushOverlayHistory() {
    const nextDepth = state.overlayHistoryDepth + 1;
    if (pushAppHistory("overlay", nextDepth)) state.overlayHistoryDepth = nextDepth;
  }

  function releaseOverlayHistory(levels = null) {
    const depth = state.overlayHistoryDepth;
    if (depth <= 0) return 0;
    const count = levels === null ? depth : Math.min(Math.max(1, levels), depth);
    const targetDepth = depth - count;
    state.overlayHistoryDepth = targetDepth;
    state.historyDepth = Math.max(0, state.historyDepth - count);
    const token = state.historyNavToken + 1;
    state.historyNavToken = token;
    state.historyNavTarget = { depth: targetDepth, token };
    window.setTimeout(() => {
      if (state.historyNavTarget?.token === token) state.historyNavTarget = null;
    }, 900);
    try {
      window.history.go(-count);
      return count;
    } catch {
      state.overlayHistoryDepth = depth;
      state.historyDepth += count;
      state.historyNavTarget = null;
      return 0;
    }
  }

  function syncOverlayToHistoryDepth(targetDepth) {
    const target = Math.max(0, Number(targetDepth) || 0);
    const currentDepth = state.overlay ? state.overlayStack.length + 1 : 0;
    if (!state.overlay) return;
    if (target <= 0) {
      const restoreTop = state.overlayScrollY;
      state.overlayHistoryDepth = 0;
      clearOverlayState();
      if (state.screen === "admin" || state.screen === "admin-login") {
        renderApp({ scrollTo: restoreTop });
      } else {
        renderOverlay();
      }
      document.body.classList.remove("is-locked");
      return;
    }
    if (target >= currentDepth) {
      state.overlayHistoryDepth = currentDepth;
      return;
    }
    if (state.overlay?.type === "plan-pdf") releasePlanPdfView();
    while (state.overlayStack.length && state.overlayStack.length + 1 > target) {
      state.overlay = state.overlayStack.pop();
    }
    state.overlayHistoryDepth = target;
    renderOverlay();
    document.body.classList.add("is-locked");
  }

  function openOverlayLayer(nextOverlay) {
    if (state.overlay && state.overlay.type !== nextOverlay.type) {
      state.overlayStack.push(state.overlay);
      pushOverlayHistory();
    }
    state.overlay = nextOverlay;
    renderOverlay();
  }

  function popOverlayLayer() {
    const previous = state.overlayStack.pop();
    if (!previous) return false;
    if (state.overlay?.type === "plan-pdf") releasePlanPdfView();
    releaseOverlayHistory(1);
    state.overlay = previous;
    renderOverlay();
    document.body.classList.add("is-locked");
    return true;
  }

  function returnToOverlayType(type, beforeRender = null) {
    let index = -1;
    for (let i = state.overlayStack.length - 1; i >= 0; i -= 1) {
      if (state.overlayStack[i]?.type === type) {
        index = i;
        break;
      }
    }
    if (index < 0) return false;
    const levels = state.overlayStack.length - index;
    releaseOverlayHistory(levels);
    const target = state.overlayStack[index];
    state.overlayStack = state.overlayStack.slice(0, index);
    if (beforeRender) beforeRender();
    state.overlay = target;
    renderOverlay();
    document.body.classList.add("is-locked");
    return true;
  }

  function clearOverlayState() {
    releasePlanPdfView();
    releasePosterImage();
    releaseMarketingDraft();
    state.overlay = null;
    state.overlayStack = [];
    state.booking = null;
    state.posterId = "";
    state.posterViewUrl = "";
    state.profileDraft = null;
    state.adminReviewId = "";
    state.adminDraft = null;
    state.adminNoteEditing = false;
    state.adminReviewSaved = false;
    state.adminDemandId = "";
    state.adminDemandDraft = null;
    state.adminAccountDraft = null;
    state.institutionAccountDraft = null;
    state.adminDoctorDraft = null;
    state.hospitalPhoneDraft = null;
    state.adminTemplateDraft = null;
    state.adminThemeDraft = null;
    state.appointmentLocationDraft = null;
    state.homeRegionDraft = null;
    state.adminThemeMonth = 0;
    state.slotDay = "";
  }

  function dismissOverlay({ fromHistory = false } = {}) {
    if (state.overlay?.type === "plan-pdf") releasePlanPdfView();
    if (!fromHistory && popOverlayLayer()) return;
    if (!fromHistory) releaseOverlayHistory();
    clearOverlayState();
    if (state.screen === "admin" || state.screen === "admin-login") renderApp();
    else renderOverlay();
    document.body.classList.remove("is-locked");
  }

  function overlayScrollKey(overlay) {
    if (!overlay) return "";
    if (overlay.type === "doctor") return `doctor:${overlay.doctorId || ""}`;
    if (overlay.type === "theme") {
      return `theme:${overlay.hospitalId || ""}:${overlay.month || ""}`;
    }
    if (overlay.type === "booking") return "booking";
    return `${overlay.type}:${overlay.appointmentId || overlay.demandId || overlay.posterId || ""}`;
  }

  function scrollDoctorMonthIntoView(month) {
    const tabs = overlayRoot?.querySelector(".month-tabs");
    const active = tabs?.querySelector(".is-active");
    if (!tabs || !active) return;
    const tabsRect = tabs.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    const maxScroll = Math.max(0, tabs.scrollWidth - tabs.clientWidth);
    const target =
      tabs.scrollLeft +
      activeRect.left -
      tabsRect.left -
      (tabs.clientWidth - activeRect.width) / 2;
    tabs.scrollTo({
      left: Math.max(0, Math.min(maxScroll, target)),
      behavior: "auto"
    });
  }

  function scrollActiveAdminTabIntoView() {
    const tabs = document.querySelector(".admin-tabs");
    const active = tabs?.querySelector("button.is-active");
    if (!tabs || !active) return;
    const tabsRect = tabs.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    const maxScroll = Math.max(0, tabs.scrollWidth - tabs.clientWidth);
    const target =
      tabs.scrollLeft +
      activeRect.left -
      tabsRect.left -
      (tabs.clientWidth - activeRect.width) / 2;
    tabs.scrollTo({
      left: Math.max(0, Math.min(maxScroll, target)),
      behavior: "auto"
    });
  }

  function renderOverlay() {
    if (!overlayRoot) return;
    const hadOverlay = Boolean(overlayRoot.querySelector(".sheet, .flow"));
    const previousBody = overlayRoot.querySelector(".sheet__body, .flow__body");
    if (hadOverlay && previousBody) {
      state.overlayScrollMemory[state.paintedOverlayKey] = previousBody.scrollTop || 0;
    }
    const nextScrollKey = overlayScrollKey(state.overlay);
    if (state.overlay && !hadOverlay) {
      state.overlayScrollY = Math.max(0, window.scrollY || 0);
      pushOverlayHistory();
    }
    const paint = (content) => {
      overlayRoot.innerHTML = content;
      document.body.classList.add("is-locked");
      if (hadOverlay) {
        overlayRoot
          .querySelectorAll(".sheet, .sheet-backdrop, .flow")
          .forEach((element) => element.classList.add("is-instant"));
      }
      const restoreScroll = state.overlayScrollMemory[nextScrollKey] || 0;
      if (hadOverlay && restoreScroll) {
        const nextBody = overlayRoot.querySelector(".sheet__body, .flow__body");
        if (nextBody) {
          window.requestAnimationFrame(() => {
            nextBody.scrollTop = restoreScroll;
          });
        }
      }
      if (state.overlay?.type === "doctor") {
        window.requestAnimationFrame(() =>
          scrollDoctorMonthIntoView(state.overlay?.month)
        );
      }
      state.paintedOverlayKey = nextScrollKey;
    };
    const type = state.overlay?.type;
    if (type === "booking") return paint(renderBookingFlow());
    if (type === "doctor") return paint(renderDoctorSheet());
    if (type === "appointment") return paint(renderAppointmentSheet());
    if (type === "appointment-action") return paint(renderAppointmentActionDialog());
    if (type === "plan-pdf") {
      paint(renderPlanPdfSheet());
      window.requestAnimationFrame(mountPptxPreview);
      return;
    }
    if (type === "appointment-location") return paint(renderAppointmentLocationSheet());
    if (type === "home-city") return paint(renderHomeCitySheet());
    if (type === "demand-create") return paint(renderDemandCreateSheet());
    if (type === "demand") return paint(renderDemandSheet());
    if (type === "profile") return paint(renderProfileSheet());
    if (type === "theme") return paint(renderThemeSheet());
    if (type === "poster") return paint(renderPosterSheet());
    if (type === "poster-upload") return paint(renderPosterUploadSheet());
    if (type === "admin-review") return paint(renderAdminReviewSheet());
    if (type === "admin-demand") return paint(renderAdminDemandSheet());
    if (type === "hospital-phone") return paint(renderHospitalPhoneSheet());
    if (type === "hospital-editor") return paint(renderHospitalEditorSheet());
    if (type === "admin-account") return paint(renderAdminAccountSheet());
    if (type === "admin-institution") return paint(renderInstitutionAccountSheet());
    if (type === "admin-doctor") return paint(renderAdminDoctorSheet());
    if (type === "admin-theme") return paint(renderAdminThemeSheet());
    if (type === "admin-template") return paint(renderAdminTemplateSheet());
    if (type === "slot-day") return paint(renderSlotDaySheet());
    if (!state.overlay) {
      overlayRoot.innerHTML = "";
      state.paintedOverlayKey = "";
      document.body.classList.remove("is-locked");
      const restoreTop = state.overlayScrollY;
      state.overlayScrollY = null;
      if (restoreTop != null) restoreWindowScroll(restoreTop);
    }
  }

  function openDoctorSheet(id, month = 0, themeMonth = 0) {
    const expert = expertById(id);
    if (!expert) return;
    openOverlayLayer({
      type: "doctor",
      doctorId: expert.id,
      month: Number(month) > 0 ? Number(month) : currentMonth(),
      themeMonth: Number(themeMonth) > 0 ? Number(themeMonth) : 0
    });
  }

  /* =========================================================
     Auth
     ========================================================= */
  function renderAuthScreen() {
    const { step } = state.login;
    const existing = /^1\d{10}$/.test(state.login.phone) ? getUser(state.login.phone) : null;
    const configured =
      /^1\d{10}$/.test(state.login.phone)
        ? institutionAccountByPhone(state.login.phone)
        : null;
    return `
      <div class="auth-screen">
        <div class="auth-top">
          <button class="icon-button" type="button" data-action="auth-close" aria-label="返回">
            ${icon("chevronLeft", 18)}
          </button>
          <img src="assets/logo.svg" alt="北京大学国际医院">
          <span></span>
        </div>
        <div class="auth-visual">
          <span class="auth-visual__badge">${icon("shield", 13)} 企业健康服务</span>
          <h1>登录后，<br>把专家请到企业身边</h1>
          <p>手机号登录即可预约讲座、健康咨询与 1V1 报告解读，院方项目组全程跟进。</p>
        </div>
        ${
          state.sessionRevoked
            ? `<div class="session-revoked-card">${icon("shield", 17)}<div><strong>登录状态已失效</strong><p>${esc(
                state.sessionRevoked
              )}</p></div></div>`
            : ""
        }
        <div class="auth-card">
          <div class="auth-steps">
            <span class="${step >= 1 ? "is-active" : ""}">1 手机号</span>
            <i></i>
            <span class="${step >= 2 ? "is-active" : ""}">2 完善资料</span>
          </div>
          ${
            step === 1
              ? `
                <div class="field">
                  <label for="login-phone">手机号 <em>*</em></label>
                  <div class="input-shell">
                    <span class="input-shell__prefix">+86</span>
                    <input id="login-phone" type="tel" inputmode="numeric" maxlength="11"
                      placeholder="请输入手机号" value="${esc(state.login.phone)}" data-login-field="phone"
                      autocomplete="tel">
                  </div>
                </div>
                ${
                  state.login.error
                    ? `<p class="auth-inline-error">${icon("alert", 13)} ${esc(
                        state.login.error
                      )}</p>`
                    : ""
                }
                <div class="field">
                  <label for="login-code">验证码 <em>*</em></label>
                  <div class="input-shell">
                    <input id="login-code" type="tel" inputmode="numeric" maxlength="6"
                      placeholder="请输入 6 位验证码" value="${esc(state.login.code)}" data-login-field="code"
                      autocomplete="one-time-code">
                    <button class="input-shell__action" type="button" data-action="send-code"
                      ${state.codeCountdown > 0 ? "disabled" : ""}>
                      ${state.codeCountdown > 0 ? `${state.codeCountdown}s` : "获取验证码"}
                    </button>
                  </div>
                  <span class="field-help">演示环境验证码固定为 888888。</span>
                </div>
                <label class="check-row">
                  <input type="checkbox" data-login-field="agree" ${state.login.agree ? "checked" : ""}>
                  <span>我已阅读并同意《企业健康服务预约须知》</span>
                </label>
                <button class="btn btn--primary btn--block auth-submit" type="button" data-action="login-next">
                  ${existing ? "登录" : "下一步"} ${icon("arrowRight", 15)}
                </button>
                <button class="demo-login" type="button" data-action="demo-login">
                  <span>
                    <small>机构演示账号 · 仅限已开通手机号</small>
                    <strong>13800000001 · 验证码 888888</strong>
                  </span>
                  <i>一键进入 ${icon("arrowRight", 13)}</i>
                </button>
                ${
                  configured
                    ? `<div class="auth-account-preview">${icon(
                        "building",
                        14
                      )}<span><strong>${esc(
                        configured.orgName || "已开通机构"
                      )}</strong><small>${esc(configured.name || "")} · ${esc(
                        configured.city || configured.province || ""
                      )}</small></span></div>`
                    : ""
                }
                <p class="auth-tip">${icon("shield", 12)} 机构手机号由集团超级管理员开通，未配置的手机号无法登录。演示验证码固定为 888888。</p>
              `
              : `
                <div class="auth-profile-head">
                  <span>${initialOf(state.login.name || state.login.phone)}</span>
                  <div>
                    <strong>${esc(state.login.phone)}</strong>
                    <small>${
                      existing
                        ? "请补全企业与联系资料后登录"
                        : "院方已开通登录权限，请补充企业资料后进入"
                    }</small>
                  </div>
                </div>
                <p class="auth-form-note">${icon(
                  "alert",
                  13
                )} 白名单开通时仅登记手机号与姓名，单位、职务、联系方式和通知邮箱需由你补充完整后才能预约。</p>
                ${
                  state.login.error
                    ? `<p class="auth-inline-error">${icon("alert", 13)} ${esc(
                        state.login.error
                      )}</p>`
                    : ""
                }
                <div class="field-row">
                  <div class="field">
                    <label for="login-name">姓名 <em>*</em></label>
                    <input id="login-name" type="text" placeholder="请输入姓名" value="${esc(
                      state.login.name
                    )}" data-login-field="name">
                  </div>
                  <div class="field">
                    <label for="login-title">职务 <em>*</em></label>
                    <input id="login-title" type="text" placeholder="如：客户健康负责人" value="${esc(
                      state.login.title
                    )}" data-login-field="title">
                  </div>
                </div>
                <div class="field">
                  <label for="login-org">单位名称 <em>*</em></label>
                  <input id="login-org" type="text" placeholder="请输入机构全称" value="${esc(
                    state.login.orgName
                  )}" data-login-field="orgName">
                </div>
                <div class="field">
                  <label for="login-org-type">机构类型 <em>*</em></label>
                  <select id="login-org-type" data-login-field="orgType">
                    <option value="" ${
                      state.login.orgType ? "" : "selected"
                    }>请选择机构类型</option>
                    ${INSTITUTION_TYPES
                      .map(
                        (type) =>
                          `<option value="${esc(type)}" ${
                            state.login.orgType === type ? "selected" : ""
                          }>${esc(type)}</option>`
                      )
                      .join("")}
                  </select>
                </div>
                <div class="field">
                  <label for="login-contact">联系方式 <em>*</em> <span>默认使用登录手机号，可修改</span></label>
                  <input id="login-contact" type="tel" inputmode="numeric" maxlength="11"
                    placeholder="请输入联系电话" value="${esc(
                      state.login.contactPhone || state.login.phone
                    )}" data-login-field="contactPhone">
                </div>
                <div class="field">
                  <label for="login-email">通知邮箱 <em>*</em> <span>用于接收方案与确认提醒</span></label>
                  <input id="login-email" type="email" inputmode="email"
                    placeholder="name@company.com" value="${esc(
                      state.login.email || ""
                    )}" data-login-field="email">
                </div>
                <div class="field">
                  <label>所在省市 <span>无需填写，自动同步</span></label>
                  <div class="field-static">
                    ${icon("mapPin", 14)} ${esc(
                      regionText(state.login.province, state.login.city)
                    )}
                  </div>
                  <span class="field-help">根据当前定位或首页选择的城市自动确定，后续会随城市切换同步更新。</span>
                </div>
                <button class="btn btn--primary btn--block auth-submit" type="button" data-action="login-submit">
                  ${existing ? "进入平台" : "完善资料并进入"} ${icon("arrowRight", 15)}
                </button>
                <button class="auth-back" type="button" data-action="login-back">返回修改手机号</button>
              `
          }
        </div>
      </div>
    `;
  }

  function startLogin(pending = null) {
    if (state.session) return;
    const returnTab = pending?.returnTab || state.tab || "home";
    const returnScroll =
      pending?.returnScroll !== undefined
        ? Number(pending.returnScroll) || 0
        : currentWindowScroll();
    const nextPending = pending
      ? { ...pending, returnTab, returnScroll }
      : { type: "restore", returnTab, returnScroll };
    const hadOverlay = Boolean(
      state.overlay || overlayRoot?.querySelector(".sheet, .sheet-backdrop, .flow")
    );
    const hadOverlayHistory = hadOverlay && state.overlayHistoryDepth > 0;
    if (hadOverlay) {
      clearOverlayState();
      if (overlayRoot) overlayRoot.innerHTML = "";
      document.body.classList.remove("is-locked");
      state.overlayHistoryDepth = 0;
      if (hadOverlayHistory) {
        try {
          window.history.replaceState(
            {
              ...(window.history.state || {}),
              pkuihLayer: "auth",
              pkuihOverlayDepth: 0
            },
            "",
            window.location.href
          );
        } catch {
          state.overlayHistoryDepth = 0;
        }
      }
    }
    applyLocationToLogin(nearestHospital());
    state.pendingAuth = nextPending;
    state.screen = "auth";
    state.login.step = 1;
    state.login.phone = "";
    state.login.name = "";
    state.login.orgName = "";
    state.login.orgType = "保险公司";
    state.login.title = "";
    state.login.contactPhone = "";
    state.login.email = "";
    state.login.code = "";
    state.login.agree = false;
    state.login.error = "";
    state.adminAuthed = false;
    state.reuseHistoryForOverlay = false;
    if (!state.authHistory) {
      state.authHistory = true;
      if (!hadOverlayHistory) pushAppHistory("auth", 0);
    }
    renderApp();
  }

  function loginDemoUser() {
    const account = institutionAccountByPhone(DEMO_PHONE);
    if (!account || !account.active) {
      state.login.error = "演示机构账号尚未开通，请联系院方超级管理员。";
      renderApp();
      return showToast(state.login.error);
    }
    const existing = getUser(DEMO_PHONE);
    const region = profileRegionFromContext(existing || DEMO_PROFILE);
    const user = upsertUser({
      ...(existing || {}),
      ...DEMO_PROFILE,
      province: region.province,
      city: region.city,
      createdAt: existing?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    syncInstitutionProfile(user);
    finishLogin(user);
  }

  function startCodeCountdown() {
    window.clearInterval(state.codeTimer);
    state.codeCountdown = 60;
    state.codeTimer = window.setInterval(() => {
      state.codeCountdown -= 1;
      if (state.codeCountdown <= 0) {
        window.clearInterval(state.codeTimer);
        state.codeCountdown = 0;
      }
      const button = document.querySelector('[data-action="send-code"]');
      if (button) {
        button.disabled = state.codeCountdown > 0;
        button.textContent = state.codeCountdown > 0 ? `${state.codeCountdown}s` : "获取验证码";
      }
    }, 1000);
  }

  function loginNext() {
    const { phone, code, agree } = state.login;
    state.login.error = "";
    if (!/^1\d{10}$/.test(phone)) {
      state.login.error = "请输入正确的 11 位手机号。";
      renderApp();
      showToast(state.login.error);
      return;
    }
    if (code !== DEMO_CODE) {
      state.login.error = "验证码不正确，演示环境请输入 888888。";
      renderApp();
      showToast(state.login.error);
      return;
    }
    if (!agree) {
      state.login.error = "请先阅读并同意预约须知。";
      renderApp();
      showToast(state.login.error);
      return;
    }
    const account = institutionAccountByPhone(phone);
    if (!account) {
      state.login.error =
        "该手机号尚未开通机构预约权限，请联系院方超级管理员配置后再登录。";
      renderApp();
      showToast(state.login.error);
      return;
    }
    if (!account.active) {
      state.login.error = "该机构账号已停用，请联系院方超级管理员。";
      renderApp();
      showToast(state.login.error);
      return;
    }
    const existing = getUser(phone);
    if (existing) {
      const region = profileRegionFromContext({ ...existing, ...account });
      const normalized = upsertUser({
        ...existing,
        name: account.name || existing.name,
        orgName: account.orgName || existing.orgName,
        orgType: account.orgType || existing.orgType,
        title: account.title || existing.title,
        contactPhone: account.contactPhone || existing.contactPhone || phone,
        email: account.email || existing.email || "",
        province: region.province,
        city: region.city
      });
      const incompleteMessage = profileIssueMessage(normalized);
      if (incompleteMessage) {
        primeLoginProfile(normalized);
        state.login.step = 2;
        state.login.error = incompleteMessage;
        renderApp();
        showToast("请先补全企业资料后再登录。");
        window.scrollTo(0, 0);
        return;
      }
      syncInstitutionProfile(normalized);
      finishLogin(normalized);
      return;
    }
    primeLoginProfile({ ...account, phone });
    state.login.step = 2;
    renderApp();
    window.scrollTo(0, 0);
  }

  function finishLogin(user) {
    const pending = state.pendingAuth;
    setSession(user);
    state.sessionRevoked = "";
    state.adminAuthed = false;
    state.expertVisited = false;
    state.expertHospitalId = "";
    clearAdminSession();
    setLastPortal("client");
    if (state.authHistory) {
      state.authHistory = false;
      state.reuseHistoryForOverlay = false;
      state.historyDepth = Math.max(0, state.historyDepth - 1);
      try {
        window.history.replaceState(
          {
            ...(window.history.state || {}),
            pkuihLayer: "main",
            pkuihTab: pending?.returnTab || state.tab || "home",
            pkuihScroll: pending?.returnScroll || 0,
            pkuihOverlayDepth: 0
          },
          "",
          window.location.href
        );
      } catch {
        // History replacement is best effort; navigation still remains usable.
      }
    }
    state.pendingAuth = null;
    state.screen = "main";
    state.login.step = 1;
    state.login.code = "";
    if (pending?.type === "booking") {
      state.tab = pending.returnTab || "experts";
      renderApp({ scrollTo: pending.returnScroll || 0 });
      openBooking(
        pending.doctorId || "",
        pending.tier || "",
        pending.service || "",
        pending.topic || "",
        pending.theme || null
      );
    } else if (pending?.type === "tab") {
      state.tab = pending.tab || "me";
      renderApp({
        scrollTo:
          pending.returnScroll ??
          storedScrollForView(`main:${pending.tab || "me"}`)
      });
    } else if (pending?.type === "demand") {
      state.tab = pending.returnTab || "home";
      renderApp({ scrollTo: pending.returnScroll || 0 });
      openDemandCreate();
    } else if (pending?.type === "restore") {
      state.tab = pending.returnTab || state.tab || "home";
      renderApp({ scrollTo: pending.returnScroll || 0 });
    } else {
      state.tab = pending?.returnTab || state.tab || "home";
      renderApp({ scrollTo: pending?.returnScroll || 0 });
    }
    showToast(`欢迎回来，${user.name}。`);
  }

  function submitProfileLogin() {
    const {
      phone,
      name,
      orgName,
      orgType,
      title,
      contactPhone,
      email
    } = state.login;
    const account = institutionAccountByPhone(phone);
    if (!account || !account.active) {
      state.login.step = 1;
      state.login.error = "机构账号状态已变更，请联系院方超级管理员。";
      renderApp();
      return showToast(state.login.error);
    }
    const issueMessage = profileIssueMessage({
      phone,
      name,
      orgName,
      orgType,
      title,
      contactPhone,
      email
    });
    if (issueMessage) {
      state.login.error = issueMessage;
      renderApp();
      showToast(issueMessage);
      return;
    }
    const now = new Date().toISOString();
    const region = profileRegionFromContext(state.login);
    const user = {
      phone,
      name: name.trim(),
      orgName: orgName.trim(),
      orgType,
      title: title.trim(),
      contactPhone: contactPhone || phone,
      email: email.trim(),
      province: region.province,
      city: region.city,
      createdAt: getUser(phone)?.createdAt || now,
      updatedAt: now
    };
    const saved = upsertUser(user);
    syncInstitutionProfile(saved);
    finishLogin(saved);
  }

  function renderProvinceOptions(selected = "") {
    const provinces = Object.keys(state.chinaCities || {}).sort((a, b) => a.localeCompare(b, "zh-CN"));
    const list = provinces.length ? provinces : ["北京", "天津", "山东", "山西", "湖南", "广东"];
    return list
      .map(
        (province) =>
          `<option value="${esc(province)}" ${province === selected ? "selected" : ""}>${esc(
            province
          )}</option>`
      )
      .join("");
  }

  function renderCityOptions(province, selected = "") {
    const cities = state.chinaCities?.[province] || (province === "北京" ? ["北京"] : []);
    const list = cities.length ? cities : [province];
    return list
      .map(
        (city) =>
          `<option value="${esc(city)}" ${city === selected ? "selected" : ""}>${esc(city)}</option>`
      )
      .join("");
  }

  function renderCoverageCityOptions() {
    const provinces = Object.keys(state.chinaCities || {}).sort((a, b) =>
      a.localeCompare(b, "zh-CN")
    );
    return `
      <option value="">选择城市…</option>
      <option value="全国">全国（不限城市）</option>
      ${provinces
        .map(
          (province) => `
            <optgroup label="${esc(province)}">
              ${(state.chinaCities[province] || [])
                .map((city) => `<option value="${esc(city)}">${esc(city)}</option>`)
                .join("")}
            </optgroup>
          `
        )
        .join("")}
    `;
  }

  function coverageProvinceForCities(cities = [], fallbackProvince = "") {
    const provinces = Object.keys(state.chinaCities || {});
    const selected = (cities || []).filter((city) => city && city !== "全国");
    const matched = provinces.find(
      (province) =>
        selected.includes(province) ||
        selected.some((city) => (state.chinaCities?.[province] || []).includes(city))
    );
    if (matched) return matched;
    const fallback = normalizeRegion(fallbackProvince || "北京市", "");
    return fallback.province || "北京市";
  }

  function renderCoverageCitySelectOptions(province = "", selected = "") {
    const cities = state.chinaCities?.[province] || (province ? [province] : []);
    return cities
      .map(
        (city) =>
          `<option value="${esc(city)}" ${city === selected ? "selected" : ""}>${esc(city)}</option>`
      )
      .join("");
  }

  function coverageChipsMarkup(cities = [], removeAction = "doctor-city-remove") {
    return (cities || [])
      .map(
        (city) => `
          <span>${icon("mapPin", 11)} ${esc(city)}
            <button type="button" data-action="${esc(removeAction)}" data-city="${esc(
              city
            )}" aria-label="移除${esc(city)}">${icon("close", 10)}</button>
          </span>
        `
      )
      .join("");
  }

  function refreshDoctorCoverageChips() {
    if (!state.adminDoctorDraft) return;
    const chips = document.getElementById("doctor-coverage-chips");
    if (chips) {
      chips.innerHTML =
        coverageChipsMarkup(state.adminDoctorDraft.coverageCities || []) ||
        "<small>尚未选择履约城市</small>";
    }
    const national = document.querySelector('[data-action="doctor-coverage-national"]');
    if (national) {
      national.classList.toggle(
        "is-active",
        Boolean(state.adminDoctorDraft.coverageCities?.includes("全国"))
      );
    }
  }

  function addCoverageCity(list, city) {
    const next = Array.isArray(list) ? [...list] : [];
    if (!city) return next;
    if (city === "全国") return ["全国"];
    const filtered = next.filter((item) => item !== "全国");
    if (!filtered.includes(city)) filtered.push(city);
    return filtered;
  }

  function setLoginCity(province, city) {
    if (!state.login.province) {
      state.login.province = province || "北京";
      state.login.city = city || "北京";
    }
  }

  /* =========================================================
     Shell
     ========================================================= */
  function renderTopbar(active) {
    const session = state.session;
    return `
      <header class="topbar">
        <button class="topbar__brand" type="button" data-action="tab" data-tab="home" aria-label="返回首页">
          <img src="assets/logo.svg" alt="北京大学国际医院">
          <span>
            <strong>名医入企</strong>
            <small>白大褂到企 · 企业健康服务</small>
          </span>
        </button>
        <div class="topbar__actions">
          ${
            session
              ? `<button class="avatar-button" type="button" data-action="tab" data-tab="me" aria-label="个人中心">${esc(
                  initialOf(session.name)
                )}</button>`
              : `<button class="topbar__login" type="button" data-action="start-login">机构登录 ${icon(
                  "arrowRight",
                  14
                )}</button>`
          }
        </div>
      </header>
    `;
  }

  function reviewBadgeCount() {
    if (!state.session) return 0;
    return appointmentsForUser(state.session.phone).filter((item) => item.status === "review").length;
  }

  function renderTabbar(active) {
    const badge = reviewBadgeCount();
    const tabs = [
      { id: "home", label: "首页", icon: "home" },
      { id: "experts", label: "专家", icon: "experts" },
      { id: "appointments", label: "预约", icon: "calendar", badge },
      { id: "me", label: "我的", icon: "user" }
    ];
    return `
      <nav class="tabbar" aria-label="主导航">
        ${tabs
          .map(
            (tab) => `
              <button class="tabbar__item ${active === tab.id ? "is-active" : ""}" type="button"
                data-action="tab" data-tab="${tab.id}">
                <span class="tabbar__icon">${icon(tab.icon, 21)}${
                  tab.badge ? `<i class="tabbar__badge">${tab.badge}</i>` : ""
                }</span>
                <span>${tab.label}</span>
              </button>
            `
          )
          .join("")}
      </nav>
    `;
  }

  function renderShell(active, content) {
    return `
      <div class="app-frame">
        <div class="app-content">
          ${renderTopbar(active)}
          ${content}
        </div>
        ${renderTabbar(active)}
      </div>
    `;
  }

  /* =========================================================
     Home
     ========================================================= */
  function nearbyExperts({ bookableOnly = false } = {}) {
    const hospital = nearestHospital();
    const region = currentClientRegion();
    return state.experts
      .filter((expert) => {
        if (expert.active === false) return false;
        if (expert.hospitalId !== hospital?.id) return false;
        if (!expertCoversRegion(expert, region.province, region.city)) return false;
        if (bookableOnly && !doctorAvailability(expert).bookable) return false;
        return true;
      })
      .sort((a, b) => {
        return (
          CLIENT_TIER_ORDER.indexOf(a.tier) - CLIENT_TIER_ORDER.indexOf(b.tier) ||
          a.name.localeCompare(b.name, "zh-CN")
        );
      });
  }

  function bookableScopeExperts(
    scope = state.expertScope,
    availability = state.expertAvailability
  ) {
    return filteredLibraryExperts({ scope, availability });
  }

  function renderExpertMini(expert) {
    const availability = doctorAvailability(expert);
    const tier = tierOf(expert);
    return `
      <button class="expert-mini" type="button" data-action="open-doctor" data-doctor-id="${esc(expert.id)}">
        <span class="expert-mini__media">
          <img src="${esc(expertAvatar(expert))}" alt="${esc(expert.name)}" loading="lazy" decoding="async">
          <span class="tier-dot tier-dot--${expert.tier}">${esc(tier.short.replace("医生", "").replace("专家", ""))}</span>
        </span>
        <span class="expert-mini__body">
          <span class="expert-mini__name">${esc(expert.name)}<i>${esc(expert.deptTitle)}</i></span>
          <span class="expert-mini__hospital"><strong class="hospital-name">${esc(
            expert.hospital
          )}</strong></span>
          <span class="expert-mini__services">${(expert.services || [])
            .map((service) => `<span>${esc(serviceLabel(service))}</span>`)
            .join("")}</span>
          <span class="expert-mini__avail ${availability.bookable ? "is-open" : "is-full"}">
            ${availability.bookable ? `最近可约 ${formatMD(availability.next)}` : "暂无可约档期"}
          </span>
        </span>
      </button>
    `;
  }

  function homeHospitalsByDistance() {
    const current = nearestHospital();
    const reference =
      state.geoStatus === "ready" &&
      Number.isFinite(Number(state.geoLat)) &&
      Number.isFinite(Number(state.geoLng))
        ? { lat: Number(state.geoLat), lng: Number(state.geoLng) }
        : null;
    return [...state.hospitals].sort((a, b) => {
      if (
        reference &&
        Number.isFinite(Number(a.lat)) &&
        Number.isFinite(Number(a.lng)) &&
        Number.isFinite(Number(b.lat)) &&
        Number.isFinite(Number(b.lng))
      ) {
        return (
          distanceKm(reference.lat, reference.lng, a.lat, a.lng) -
          distanceKm(reference.lat, reference.lng, b.lat, b.lng)
        );
      }
      if (a.id === current?.id) return -1;
      if (b.id === current?.id) return 1;
      const aLocal = a.province === current?.province ? 0 : 1;
      const bLocal = b.province === current?.province ? 0 : 1;
      return aLocal - bLocal || a.name.localeCompare(b.name, "zh-CN");
    });
  }

  function renderHomeHospitalPicker() {
    const current = nearestHospital();
    const hospitals = homeHospitalsByDistance();
    const locationFailed =
      !state.homeRegion &&
      ["denied", "error", "unavailable"].includes(state.geoStatus);
    const cityMismatch =
      Boolean(state.homeRegion) && !hospitalMatchesRegion(current, state.homeRegion);
    const meta =
      state.homeRegion
        ? cityMismatch
          ? `手动城市 · ${regionText(
              state.homeRegion.province,
              state.homeRegion.city
            )} · 本地暂无履约医院`
          : `手动城市 · ${regionText(state.homeRegion.province, state.homeRegion.city)}`
        : state.geoStatus === "loading"
        ? "定位中…"
        : locationFailed
        ? "未获取定位 · 选择城市"
        : state.homeHospitalId
        ? `已手动切换 · ${regionText(current?.province, current?.city)}`
        : state.geoStatus === "ready"
        ? "按当前位置推荐"
        : state.session
        ? `按${regionText(state.session.province, state.session.city)}推荐`
        : "定位后推荐最近医院";
    const sortHint =
      !locationFailed &&
      state.geoStatus === "ready" &&
      Number.isFinite(Number(state.geoLat))
        ? " · 按距离排序"
        : "";
    const currentName = current?.name || "请选择医院";
    return `
      <div class="hero-hospital">
        <span class="hero-hospital__pin">${icon("mapPin", 15)}</span>
        <span class="hero-hospital__body">
          <span class="hero-hospital__meta">
            <small>${esc(meta)}${sortHint}</small>
          </span>
          <span class="hero-hospital__select-wrap">
            <span class="hero-hospital__selected-name" title="${esc(
              currentName
            )}">${esc(currentName)}</span>
            <select data-home-hospital-picker aria-label="切换履约医院">
              ${hospitals
                .map(
                  (hospital) =>
                    `<option value="${esc(hospital.id)}" ${
                      hospital.id === current?.id ? "selected" : ""
                    }>${esc(hospital.name)}</option>`
                )
                .join("")}
            </select>
            <span class="hero-hospital__chevron">${icon("chevronDown", 13)}</span>
          </span>
        </span>
        <button class="hero-hospital__city ${
          locationFailed ? "is-needed" : ""
        }" type="button" data-action="home-city-open">${
          state.homeRegion ? "改城市" : "选择城市"
        }</button>
        <button class="hero-hospital__locate" type="button" data-action="home-use-location"
          aria-label="重新定位" title="重新定位">
          ${icon("crosshair", 15)}
        </button>
      </div>
    `;
  }

  function renderHomeNearbySection() {
    const hospital = nearestHospital();
    const near = nearbyExperts({ bookableOnly: true });
    return `
      <section class="section">
        <div class="section-head">
          <div>
            <h2>${state.homeHospitalId ? "该院可预约专家" : "就近可预约专家"}</h2>
            <p id="home-nearby-summary">${esc(hospital?.name || "")} · ${near.length} 位近期可约 · 专业医生优先</p>
          </div>
          <button class="text-link" type="button" data-action="home-hospital-experts">
            全部专家 ${icon("chevronRight", 14)}
          </button>
        </div>
        <div class="expert-mini-list" id="home-nearby-experts">
          ${
            near.length
              ? near.slice(0, 4).map(renderExpertMini).join("")
              : `<div class="inline-empty">该院近期暂无号源，可切换医院查看，或发起提需由院方协调。</div>`
          }
        </div>
      </section>
    `;
  }

  function homeMetricsMarkup() {
    const hospital = nearestHospital() || state.hospitals[0];
    const hospitalExperts = hospital
      ? state.experts.filter(
          (expert) => expert.hospitalId === hospital.id && expert.active !== false
        )
      : [];
    const departments = new Set(
      hospitalExperts.map((expert) => String(expert.dept || "").trim()).filter(Boolean)
    );
    const theme = hospital ? hospitalTheme(hospital.id, currentMonth()) : null;
    const region = currentClientRegion();
    const topicCount = hospital
      ? clientThemeTopics(
          theme,
          hospital.id,
          region.province,
          region.city
        ).length
      : 0;
    return `
      <div><strong>${hospitalExperts.length}<span>位</span></strong><small>本院专家</small></div>
      <div><strong>${departments.size}<span>个</span></strong><small>覆盖科室</small></div>
      <div><strong>${topicCount}<span>个</span></strong><small>本月课题</small></div>
    `;
  }

  function refreshHomeLocationViews() {
    if (state.screen !== "main" || state.tab !== "home") return;
    const picker = document.getElementById("home-hospital-picker");
    const nearby = document.getElementById("home-nearby-section");
    const metrics = document.getElementById("home-metrics");
    const season = document.getElementById("home-season-banner");
    const tiers = document.getElementById("home-tiers");
    const services = document.getElementById("home-services");
    if (picker) picker.innerHTML = renderHomeHospitalPicker();
    if (nearby) nearby.innerHTML = renderHomeNearbySection();
    if (metrics) metrics.innerHTML = homeMetricsMarkup();
    if (season) season.innerHTML = renderHomeSeasonBanner();
    if (tiers) tiers.innerHTML = renderHomeTierSection();
    if (services) services.innerHTML = renderHomeServiceSection();
  }

  function openHomeCityPicker() {
    const region = currentClientRegion();
    state.homeRegionDraft = {
      province: region.province,
      city: region.city
    };
    openOverlayLayer({ type: "home-city" });
  }

  function renderHomeCitySheet() {
    const draft = state.homeRegionDraft;
    if (!draft) return "";
    return `
      <div class="sheet-backdrop" data-action="close-overlay"></div>
      <section class="sheet home-city-sheet" role="dialog" aria-modal="true" aria-label="选择所在城市">
        <div class="sheet__grabber"></div>
        <div class="sheet__bar">
          <div><h2>选择所在城市</h2><p>用于推荐附近医院与筛选可履约专家</p></div>
          <button class="sheet__close" type="button" data-action="close-overlay" aria-label="关闭">
            ${icon("close", 15)}
          </button>
        </div>
        <div class="sheet__body">
          <div class="sheet-pad">
            <div class="template-form-note">${icon(
              "mapPin",
              13
            )} 定位未开启或不准确时，可手动选择城市。保存后首页按该城市推荐医院，专家库“全部医院”只展示可服务该城市的专家。</div>
            <div class="field-row">
              <div class="field"><label>省份</label>
                <select data-home-region-province>${renderProvinceOptions(
                  draft.province
                )}</select>
              </div>
              <div class="field"><label>城市</label>
                <select data-home-region-city>${renderCityOptions(
                  draft.province,
                  draft.city
                )}</select>
              </div>
            </div>
          </div>
        </div>
        <div class="sheet__footer">
          <button class="btn btn--ghost" type="button" data-action="close-overlay">取消</button>
          <button class="btn btn--primary" type="button" data-action="home-city-save">
            使用该城市 ${icon("check", 14)}
          </button>
        </div>
      </section>
    `;
  }

  function saveHomeCity() {
    const draft = state.homeRegionDraft;
    if (!draft?.province || !draft?.city) return showToast("请选择省份和城市。");
    const localHospital = state.hospitals.find((hospital) =>
      hospitalMatchesRegion(hospital, draft)
    );
    const hospital = persistHomeRegion(draft);
    state.homeRegionDraft = null;
    if (!popOverlayLayer()) {
      clearOverlayState();
      releaseOverlayHistory();
    }
    renderApp({ scrollTo: currentWindowScroll() });
    showToast(
      localHospital
        ? `已切换到${regionText(draft.province, draft.city)}，优先推荐${localHospital.name}。`
        : hospital
        ? `已切换到${regionText(
            draft.province,
            draft.city
          )}，本地暂无履约医院，已推荐最近的${hospital.name}。`
        : `已切换到${regionText(draft.province, draft.city)}。`
    );
  }

  function renderHomeSeasonBanner() {
    const month = currentMonth();
    const hospital = nearestHospital() || state.hospitals[0];
    const currentTheme = hospital ? hospitalTheme(hospital.id, month) : null;
    const season = seasonalOf(month);
    const region = currentClientRegion();
    const topics = (
      currentTheme
        ? clientThemeTopics(
            currentTheme,
            hospital?.id,
            region.province,
            region.city
          )
        : []
    ).slice(0, 2);
    if (!topics.length) return "";
    return `
        <section class="season-banner season-banner--media season-banner--art season-tone--${seasonKeyOf(
          month
        )}" data-action="theme-open"
          data-month="${month}" data-hospital-id="${esc(hospital?.id || "")}">
          <span class="season-banner__art" aria-hidden="true">
            <i class="season-banner__glow"></i>
            <i class="season-banner__ring season-banner__ring--outer"></i>
            <i class="season-banner__ring season-banner__ring--inner"></i>
            <i class="season-banner__spark season-banner__spark--one"></i>
            <i class="season-banner__spark season-banner__spark--two"></i>
            <span class="season-banner__glyph">${icon(seasonGlyphOf(month), 108)}</span>
          </span>
          <div class="season-banner__shade"></div>
          <div class="season-banner__content">
            <div class="season-banner__head">
              <span class="season-banner__month">${month}月</span>
              <div>
                <small>${esc(hospital?.short || "本院")} · 本月时令主题</small>
                <strong>${esc(
                  seasonalHeadline(currentTheme?.season || season?.season || "")
                )}</strong>
              </div>
              <button class="season-banner__cta" type="button" data-action="theme-open"
                data-month="${month}" data-hospital-id="${esc(
                  hospital?.id || ""
                )}">查看主题 ${icon("arrowRight", 13)}</button>
            </div>
            <p>${esc(currentTheme?.focus || season?.focus || "")}</p>
            <div class="season-banner__topics">
              ${
                topics.length
                  ? topics
                      .map(
                        (topic, index) => `
                    <button type="button" data-action="theme-topic" data-month="${month}"
                      data-hospital-id="${esc(hospital?.id || "")}"
                      data-topic-index="${index}">
                      <i>${esc(topic.dept)}</i><span>${esc(topic.title)}</span>
                    </button>
                  `
                      )
                      .join("")
                  : `<span class="season-banner__empty">本月暂无已绑定专家的时令课题</span>`
              }
            </div>
          </div>
        </section>
    `;
  }

  function renderHomeTierSection() {
    const hospital = nearestHospital() || state.hospitals[0];
    return `
        <section class="section">
          <div class="section-head">
            <div><h2>三级专家资源</h2><p>按活动规格与预约周期匹配</p></div>
          </div>
          <div class="tier-row">
            ${TIER_ORDER.map((tierId) => {
              const tier = TIERS[tierId];
              const list = state.experts.filter(
                (expert) =>
                  expert.tier === tierId &&
                  expert.active !== false &&
                  expert.hospitalId === hospital?.id
              );
              const open = list.filter((expert) => doctorAvailability(expert).bookable).length;
              return `
                <button class="tier-card tier-card--${tierId}" type="button" data-action="tier-open" data-value="${tierId}">
                  <span class="tier-card__tag">${esc(tier.tag)}</span>
                  <strong>${esc(tier.short)}</strong>
                  <span class="tier-card__count">${list.length} 位专家</span>
                  <small>${open} 位近期可约 · ${tier.leadDays} 天预约周期</small>
                  <span class="tier-card__arrow">${icon("chevronRight", 14)}</span>
                </button>
              `;
            }).join("")}
          </div>
        </section>
    `;
  }

  function renderHomeServiceSection() {
    const hospital = nearestHospital() || state.hospitals[0];
    return `
        <section class="section">
          <div class="section-head">
            <div><h2>到企服务类型</h2><p>讲座、健康咨询与 1V1 报告解读</p></div>
          </div>
          <div class="service-grid">
            ${SERVICE_IDS.map((id, index) => {
              const service = SERVICES[id];
              const count = serviceCount(id, hospital?.id);
              const countText = `${count} 位本院专家可服务`;
              return `
                <button class="service-card" type="button" data-action="service-open" data-value="${esc(id)}">
                  <span class="service-card__num">0${index + 1}</span>
                  <span class="service-card__icon">${icon(
                    id === "讲座" ? "message" : id === "健康咨询" ? "stethoscope" : "users",
                    19
                  )}</span>
                  <strong>${esc(service.label)}</strong>
                  <p>${esc(service.desc)}</p>
                  <span class="service-card__count">${countText}</span>
                </button>
              `;
            }).join("")}
          </div>
        </section>
    `;
  }

  function renderHomePage() {
    return `
      <div class="screen">
        <section class="hero">
          <div class="hero__media">
            <img src="assets/hero-campus-960.jpg" alt="北京大学国际医院" width="960" height="411"
              fetchpriority="high" decoding="async">
          </div>
          <div class="hero__content">
            <div id="home-hospital-picker">${renderHomeHospitalPicker()}</div>
            <span class="hero__kicker"><i></i> 白大褂到企 · 名医入企计划</span>
            <h1>把医学专家<br><em>请到企业身边</em></h1>
            <p>面向保险公司与企业，提供讲座、健康咨询与 1V1 报告解读。按医院、科室与时令主题匹配专家，院方项目组全程跟进。</p>
            <div class="hero__actions">
              <button class="btn btn--accent" type="button" data-action="open-booking">
                发起活动预约 ${icon("arrowRight", 15)}
              </button>
              <button class="btn btn--glass" type="button" data-action="tab" data-tab="experts">
                浏览专家库
              </button>
            </div>
            <div class="hero__metrics" id="home-metrics">
              ${homeMetricsMarkup()}
            </div>
          </div>
        </section>

        <div id="home-season-banner">${renderHomeSeasonBanner()}</div>

        <div id="home-nearby-section">${renderHomeNearbySection()}</div>

        <div id="home-tiers">${renderHomeTierSection()}</div>

        <div id="home-services">${renderHomeServiceSection()}</div>

        <section class="section">
          <div class="section-head">
            <div><h2>从预约到到企</h2><p>机构与院方双向确认，过程可追踪</p></div>
          </div>
          <div class="flow-card">
            ${[
              ["提交预约", "选择服务、专家与日期，填写活动地址与需求。"],
              ["院方接单", "医院运营接单后，页面显示具体项目对接人。"],
              ["院方方案", "院方填写课题、时间、地点、大纲与项目组。"],
              ["机构确认", "机构查看方案，确认无误或提出修改意见。"],
              ["活动执行", "双方按最终方案执行，完成后归档。"]
            ]
              .map(
                ([title, desc], index) => `
                  <div class="flow-card__step">
                    <span>0${index + 1}</span>
                    <div><strong>${title}</strong><p>${desc}</p></div>
                  </div>
                `
              )
              .join("")}
          </div>
        </section>

        <section class="demand-cta">
          <span class="demand-cta__icon">${icon("sparkles", 20)}</span>
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
            <span class="hospital-entry__icon">${icon("shield", 19)}</span>
            <span class="hospital-entry__copy">
              <strong>院方工作台</strong>
              <small>超级管理员 · 医院运营人员登录</small>
            </span>
            ${icon("arrowRight", 16)}
          </button>
        </section>
      </div>
    `;
  }

  /* =========================================================
     Seasonal theme detail
     ========================================================= */
  function themeExpertList(theme, hospitalId) {
    const ids = new Set([
      ...(theme?.expertIds || []).map(String),
      ...(theme?.topics || []).map((topic) => String(topic.expertId || "")).filter(Boolean)
    ]);
    const hospitalExperts = [
      ...new Map(
        state.experts
          .filter(
            (expert) =>
              expert.hospitalId === hospitalId &&
              expert.active !== false &&
              matchesService(expert, "讲座")
          )
          .map((expert) => [String(expert.id), expert])
      ).values()
    ];
    return hospitalExperts.filter((expert) => ids.has(String(expert.id)));
  }

  function openTheme(month = currentMonth(), topicIndex = -1, hospitalId = "") {
    const hospital =
      hospitalById(hospitalId) || nearestHospital() || state.hospitals[0];
    if (!hospital) return;
    openOverlayLayer({
      type: "theme",
      month: Number(month) || currentMonth(),
      hospitalId: hospital.id,
      topicIndex: Number(topicIndex)
    });
  }

  function openThemeBooking(month, topicIndex = -1) {
    if (Number(month) !== currentMonth()) {
      showToast("非本月时令主题仅可浏览，预约请选择本月主题。");
      return;
    }
    const hospital =
      hospitalById(state.overlay?.hospitalId) || nearestHospital() || state.hospitals[0];
    const theme = hospitalTheme(hospital?.id, month);
    const fromBooking =
      state.overlayStack.some((item) => item.type === "booking") &&
      Boolean(state.booking);
    const region = fromBooking
      ? { province: state.booking.province, city: state.booking.city }
      : currentClientRegion();
    const topics = clientThemeTopics(
      theme,
      hospital?.id,
      region.province,
      region.city
    );
    const topic = topicIndex >= 0 ? topics[topicIndex] : null;
    const coverage = topic
      ? themeTopicCoverage(topic, theme, hospital?.id)
      : null;
    const topicExpert = topic?.expertId ? expertById(topic.expertId) : null;
    const doctorId =
      topicExpert && doctorAvailability(topicExpert).bookable
        ? topicExpert.id
        : "";
    openBooking(
      doctorId,
      "",
      "讲座",
      topic?.title || "",
      {
        month: Number(month),
        topicId: topic?.id || "",
        coverageLabel: coverage?.label || "",
        coverageCities: coverage?.cities || [],
        hospitalId: hospital?.id || ""
      }
    );
  }

  function renderThemeSheet() {
    const month = Number(state.overlay?.month) || currentMonth();
    const hospital =
      hospitalById(state.overlay?.hospitalId) || nearestHospital() || state.hospitals[0];
    const theme = hospitalTheme(hospital?.id, month) || defaultThemeConfig(hospital?.id, month);
    if (!theme) return "";
    const isCurrent = month === currentMonth();
    const fromBooking = state.overlayStack.some((item) => item.type === "booking");
    const boundExperts = themeExpertList(theme, hospital?.id);
    const topicIndex = Number(state.overlay?.topicIndex);
    const selectedTopic = Number.isInteger(topicIndex) && topicIndex >= 0 ? topicIndex : -1;
    const rawLocation =
      fromBooking && state.booking
        ? {
            province: state.booking.province,
            city: state.booking.city,
            label: "本次活动履约地"
          }
        : (() => {
            const region = currentClientRegion();
            return {
              province: region.province || hospital?.province || "",
              city: region.city || hospital?.city || "",
              label: state.homeRegion
                ? "当前选择城市"
                : state.geoStatus === "ready"
                ? "当前定位城市"
                : "当前登录城市"
            };
          })();
    const location = normalizeRegion(rawLocation.province, rawLocation.city);
    const topics = clientThemeTopics(
      theme,
      hospital?.id,
      location.province,
      location.city,
      fromBooking && state.booking
        ? {
            topicId: state.booking.themeTopicId,
            title: state.booking.customTopic
          }
        : {}
    );
    const experts = boundExperts.filter((expert) =>
      expertThemeCoversRegion(
        expert,
        month,
        location.province,
        location.city,
        hospital?.id
      )
    );
    const topicRows = topics.map((topic) => {
      const coverage = themeTopicCoverage(topic, theme, hospital?.id);
      const linkedExpert = topic.expertId ? expertById(topic.expertId) : null;
      const expert =
        linkedExpert &&
        linkedExpert.hospitalId === hospital?.id &&
        linkedExpert.active !== false &&
        matchesService(linkedExpert, "讲座")
          ? linkedExpert
          : null;
      const availability = expert
        ? doctorAvailability(expert)
        : { bookable: false, next: "", remaining: 0, dates: [] };
      const available = themeTopicCoversRegion(
        coverage,
        location.province,
        location.city
      );
      return {
        topic,
        coverage,
        expert,
        availability,
        available,
        bookable: available && Boolean(expert) && availability.bookable
      };
    });
    const availableCount = topicRows.filter((row) => row.available).length;
    const bookableCount = topicRows.filter((row) => row.bookable).length;
    const selectedRow = selectedTopic >= 0 ? topicRows[selectedTopic] : null;
    const selectedAvailable = !selectedRow || selectedRow.available;
    const coverageLabels = [
      ...new Set(topicRows.map((row) => row.coverage.label).filter(Boolean))
    ];
    const coverageSummary =
      coverageLabels.length <= 1
        ? coverageLabels[0] || "待院方配置"
        : `${coverageLabels.length} 类`;
    return `
      <div class="sheet-backdrop" data-action="close-overlay"></div>
      <section class="sheet theme-sheet" role="dialog" aria-modal="true" aria-label="${
        theme.month
      }月时令主题">
        <div class="sheet__grabber theme-sheet__grabber"></div>
        <div class="theme-hero">
          <img src="${esc(theme.image || themeImageFor(month))}" alt="${esc(
            theme.season
          )}" width="900" height="560" decoding="async">
          <div class="theme-hero__shade"></div>
          <div class="theme-hero__top">
            <span>${icon("leaf", 13)} 时令主题 · 讲座</span>
            <div class="theme-hero__top-actions">
              ${
                isCurrent
                  ? ""
                  : `<em class="theme-readonly-badge">${icon("history", 11)} 往期主题 · 仅供浏览</em>`
              }
              <button type="button" data-action="close-overlay" aria-label="关闭">
                ${icon("close", 15)}
              </button>
            </div>
          </div>
          <div class="theme-hero__copy">
            <span class="theme-hero__month">${month}月${
              seasonalTerm(theme.season) ? ` · ${esc(seasonalTerm(theme.season))}` : ""
            }</span>
            <h2>${esc(seasonalHeadline(theme.season))}</h2>
            <p>${esc(theme.focus)}</p>
          </div>
        </div>
        <div class="sheet__body">
          <div class="theme-sheet__content">
            <div class="theme-intro">
              <span class="theme-kicker">THEME BRIEF</span>
              <p>${esc(theme.intro)}</p>
            </div>
            <div class="theme-city-check ${availableCount ? "is-available" : "is-warning"}">
              <span class="theme-city-check__icon">${icon("mapPin", 15)}</span>
              <span class="theme-city-check__copy">
                <small>${esc(rawLocation.label)}</small>
                <strong>${esc(regionText(location.province, location.city))}</strong>
              </span>
              <em>${
                isCurrent
                  ? `${bookableCount}/${topics.length} 个课题可约`
                  : `${availableCount}/${topics.length} 个课题覆盖本地`
              }</em>
            </div>
            <div class="theme-stats">
              <div><strong>${experts.length}</strong><span>位本院专家</span></div>
              <div><strong>${topics.length}</strong><span>个讲座课题</span></div>
              <div><strong>${esc(coverageSummary)}</strong><span>主题履约范围</span></div>
            </div>
            <section class="theme-section">
              <div class="theme-section__head">
                <div><small>本月关注</small><h3>时令健康重点</h3></div>
                <span>${esc(hospital?.short || "")}</span>
              </div>
              <div class="theme-focus-grid">
                <div><span>重点关注</span><p>${esc(theme.diseases)}</p></div>
                <div><span>适合行业</span><p>${esc(theme.industries)}</p></div>
              </div>
            </section>
            <section class="theme-section">
              <div class="theme-section__head">
                <div><small>Lecture topics</small><h3>${
                  isCurrent ? "本月推荐讲座" : "往期讲座课题"
                }</h3></div>
                <span>${
                  isCurrent
                    ? fromBooking
                      ? "点选后返回预约确认"
                      : "点选后统一预约"
                    : "仅作浏览，不可预约"
                }</span>
              </div>
              <div class="theme-topic-list">
                ${
                  topics.length
                    ? topics
                        .map((topic, index) => {
                    const row = topicRows[index];
                    const expert = row.expert;
                    const statusText = isCurrent
                      ? !row.available
                        ? "当前城市不可约"
                        : !expert
                        ? "主讲专家待确认"
                        : !row.availability.bookable
                        ? "专家暂无号源"
                        : `当前城市可约 · 最近 ${formatMD(row.availability.next)}`
                      : row.available
                      ? "覆盖当前城市"
                      : "不在当前城市履约";
                    const blocked = isCurrent
                      ? !row.bookable
                      : !row.available;
                    const content = `
                        <span class="theme-topic-card__dept">${esc(topic.dept || "综合")}</span>
                        <strong>${esc(topic.title)}</strong>
                        <small>${expert ? `${esc(expert.name)} · ${esc(expert.deptTitle)}` : "主讲专家待确认"}</small>
                        <em class="theme-topic-card__coverage ${
                          blocked ? "is-unavailable" : ""
                        }">${icon("mapPin", 10)} ${esc(row.coverage.label)} · ${esc(
                          statusText
                        )}</em>
                        <i>${icon(isCurrent ? "arrowRight" : "history", 13)}</i>
                    `;
                    return isCurrent
                      ? `<button class="theme-topic-card ${
                          index === selectedTopic ? "is-focus" : ""
                        } ${blocked ? "is-unavailable" : ""}" type="button"
                          data-action="theme-topic-focus" data-month="${month}"
                          data-topic-index="${index}">${content}</button>`
                      : `<div class="theme-topic-card is-readonly">${content}</div>`;
                        })
                        .join("")
                    : `<div class="theme-topic-empty">${icon(
                        "leaf",
                        18
                      )}<strong>本月暂无已绑定专家的时令课题</strong><p>医院运营配置课题并绑定本院讲座专家后，会在这里展示。</p></div>`
                }
              </div>
            </section>
            <section class="theme-section">
              <div class="theme-section__head">
                <div><small>Expert team</small><h3>本月绑定专家</h3></div>
                <button class="theme-text-btn" type="button" data-action="theme-experts"
                  data-month="${month}" data-hospital-id="${esc(hospital?.id || "")}">查看全部 ${icon(
                    "chevronRight",
                    12
                  )}</button>
              </div>
              <div class="theme-expert-row">
                ${
                  experts.length
                    ? experts
                        .slice(0, 4)
                        .map(
                          (expert) => `
                            <button class="theme-expert" type="button" data-action="open-doctor"
                              data-doctor-id="${esc(expert.id)}" data-month="${month}"
                              data-theme-month="${month === currentMonth() ? month : 0}">
                              <img src="${esc(expertAvatar(expert))}" alt="${esc(
                                expert.name
                              )}" loading="lazy" decoding="async">
                              <strong>${esc(expert.name)}</strong>
                              <small>${esc(expert.dept)} · ${esc(expert.deptTitle)}</small>
                            </button>
                          `
                        )
                        .join("")
                    : `<div class="theme-expert-empty">当前城市暂无可履约的本月绑定专家</div>`
                }
              </div>
            </section>
            <section class="theme-section">
              <div class="theme-section__head">
                <div><small>Service cities</small><h3>课题履约城市</h3></div>
                <span>按课题独立匹配</span>
              </div>
              <div class="theme-city-chips">
                ${
                  coverageLabels.length
                    ? coverageLabels
                        .map((label) => `<span>${icon("mapPin", 11)} ${esc(label)}</span>`)
                        .join("")
                    : "<span>待院方配置</span>"
                }
              </div>
            </section>
            <p class="theme-sheet__note">本月课题、绑定专家与覆盖城市由${esc(
              hospital?.name || "院方"
            )}配置；每个课题的履约地独立于专家日常服务范围，最终出讲安排以院方确认为准。</p>
          </div>
        </div>
        <div class="theme-sheet__footer ${isCurrent ? "" : "is-readonly"}">
          <button class="theme-filter-btn" type="button" data-action="theme-experts"
            data-month="${month}" data-hospital-id="${esc(hospital?.id || "")}">按月筛专家</button>
          ${
            !isCurrent
              ? `<span class="theme-sheet__readonly-note">${icon("history", 15)}
                  <span><strong>往期主题仅供浏览</strong><small>预约请选择 ${currentMonth()} 月时令主题</small></span>
                </span>`
              : fromBooking
              ? `<button class="btn btn--primary" type="button" data-action="theme-topic-confirm"
                  data-month="${month}" data-topic-index="${selectedTopic}" ${
                    selectedTopic < 0 || !selectedAvailable ? "disabled" : ""
                  }>
                  ${
                    selectedTopic < 0
                      ? "先点选一个课题"
                      : !selectedAvailable
                      ? `当前城市不可约 · ${esc(location.city)}`
                      : selectedRow?.bookable
                      ? "选择该主题"
                      : selectedRow?.expert
                      ? "专家暂无号源 · 进入预约协调"
                      : "主讲待确认 · 进入预约协调"
                  } ${icon(
                    selectedTopic >= 0 &&
                      selectedAvailable &&
                      selectedRow?.bookable
                      ? "check"
                      : "chevronRight",
                    15
                  )}
                </button>`
              : `<button class="btn btn--primary" type="button" data-action="theme-book"
                  data-month="${month}" data-topic-index="${selectedTopic >= 0 ? selectedTopic : -1}"
                  ${selectedTopic >= 0 && !selectedAvailable ? "disabled" : ""}>
                  ${
                    selectedTopic < 0
                      ? "预约本月主题"
                      : !selectedAvailable
                      ? `当前城市不可约 · ${esc(location.city)}`
                      : selectedRow?.bookable
                      ? "预约该主题"
                      : selectedRow?.expert
                      ? "专家暂无号源 · 进入预约协调"
                      : "主讲待确认 · 进入预约协调"
                  } ${icon("arrowRight", 15)}
                </button>`
          }
        </div>
      </section>
    `;
  }

  /* =========================================================
     Experts
     ========================================================= */
  function renderExpertCard(expert) {
    const tier = tierOf(expert);
    const availability = doctorAvailability(expert);
    const serviceTags =
      state.expertMonth > 0
        ? [{ service: "讲座" }]
        : serviceTagsFor(expert);
    return `
      <button class="expert-card" type="button" data-action="open-doctor" data-doctor-id="${esc(
        expert.id
      )}" data-month="${state.expertMonth || 0}" data-theme-month="${
        state.expertMonth === currentMonth() ? currentMonth() : 0
      }">
        <span class="expert-card__media">
          <img src="${esc(expertAvatar(expert))}" alt="${esc(expert.name)}" loading="lazy" decoding="async">
          <span class="expert-card__tier tier-tag tier-tag--${expert.tier}">${esc(tier.short)}</span>
        </span>
        <span class="expert-card__body">
          <span class="expert-card__head">
            <span><strong>${esc(expert.name)}</strong><i>${esc(expert.deptTitle)}</i></span>
            <span class="expert-card__avail ${availability.bookable ? "is-open" : "is-full"}">
              ${availability.bookable ? `可约 ${formatMD(availability.next)}` : "暂无号源"}
            </span>
          </span>
          <span class="expert-card__hospital">${icon("building", 12)} <strong class="hospital-name">${esc(
            expert.hospital
          )}</strong> · ${esc(expert.dept)}</span>
          <span class="expert-card__intro">${esc(doctorExpertise(expert))}</span>
          <span class="expert-card__foot">
            <span class="expert-card__services">${serviceTags
              .map(
                ({ service }) =>
                  `<span>${esc(serviceLabel(service))}</span>`
              )
              .join("")}</span>
            <span class="expert-card__more">详情 ${icon("chevronRight", 11)}</span>
          </span>
        </span>
      </button>
    `;
  }

  function renderExpertResults() {
    const list = bookableScopeExperts();
    const hospital = libraryHospital();
    const region = currentClientRegion();
    const availabilityText =
      state.expertAvailability === "bookable"
        ? " · 当前可约"
        : state.expertAvailability === "local"
        ? " · 当地医院可约"
        : "";
    return `
      <div class="expert-result-meta">
        <span><b>${list.length}</b> 位专家${availabilityText}</span>
        <span>${
          state.expertScope === "nearby"
            ? esc(hospital?.name || "就近医院")
            : `${
                state.expertAvailability === "local" ? "当地医院" : "全部医院"
              } · ${esc(regionText(region.province, region.city))}${
                state.expertMonth > 0 ? "时令课题可履约" : "可履约"
              }`
        }</span>
      </div>
      ${
        list.length
          ? `<div class="expert-list">${list.map(renderExpertCard).join("")}</div>`
          : state.expertService === "1V1报告解读"
          ? `<div class="empty-state">
              <span class="empty-state__icon">${icon("users", 26)}</span>
              <h3>当前范围暂无可提供 1V1 报告解读的专家</h3>
              <p>专家为预约必选项。可切换到全部地区查看，或发起提需由医院运营人员电话沟通匹配。</p>
              <button class="btn btn--primary btn--sm" type="button" data-action="open-demand">
                发起提需
              </button>
            </div>`
          : `<div class="empty-state">
              <span class="empty-state__icon">${icon("search", 26)}</span>
              <h3>没有匹配的可预约专家</h3>
              <p>可以切换“全部地区”，或发起提需由院方协助匹配。</p>
              <button class="btn btn--primary btn--sm" type="button" data-action="open-demand">发起提需</button>
            </div>`
      }
    `;
  }

  function expertServiceFilterMarkup(scopeHospitalId = "") {
    if (state.expertMonth > 0) {
      return `
        <div class="filter-scroll filter-scroll--services" id="expert-service-filter"
          data-filter-mode="month">
          <span class="filter-label">服务类型</span>
          <button class="chip is-active" type="button" data-action="expert-service"
            data-value="讲座">${esc(serviceLabel("讲座"))}<span class="chip__count">${
              bookableScopeExperts().length
            }</span></button>
          <span class="filter-month-note">${icon("leaf", 10)} 月令主题仅对应讲座，按课题履约地筛选</span>
          <button class="filter-reset-link" type="button" data-action="expert-month-clear">
            清除月令筛选
          </button>
        </div>
      `;
    }
    return `
      <div class="filter-scroll filter-scroll--services" id="expert-service-filter"
        data-filter-mode="all">
        <span class="filter-label">服务类型</span>
        <button class="chip ${state.expertService === "all" ? "is-active" : ""}" type="button"
          data-action="expert-service" data-value="all">全部服务</button>
        ${SERVICE_IDS.map(
          (id) =>
            `<button class="chip ${state.expertService === id ? "is-active" : ""}" type="button"
              data-action="expert-service" data-value="${esc(id)}">${esc(
                serviceLabel(id)
              )}<span class="chip__count">${
                scopedServiceCount(id)
              }</span></button>`
        ).join("")}
      </div>
    `;
  }

  function renderExpertsPage() {
    const hospital = libraryHospital();
    const scopeLabel = state.expertHospitalId ? "当前医院" : "就近医院";
    const nearCount = bookableScopeExperts("nearby").length;
    const allScopeCount = bookableScopeExperts("all").length;
    const bookableCount = bookableScopeExperts(state.expertScope, "bookable").length;
    const localCount = bookableScopeExperts(state.expertScope, "local").length;
    const allCount = bookableScopeExperts(state.expertScope, "all").length;
    const serviceScopeHospitalId = state.expertScope === "nearby" ? hospital?.id || "" : "";
    return `
      <div class="screen experts-screen">
        <header class="page-head page-head--tight">
          <span class="eyebrow"><i></i> Expert Network</span>
          <h1>专家库</h1>
          <p>${
            state.expertService === "all"
              ? "按医院、梯队、科室、服务类型与时令主题匹配专家。"
              : `当前展示「${esc(serviceLabel(state.expertService))}」对应专家。`
          }</p>
        </header>
        <div class="expert-toolbar" id="expert-toolbar">
          <div class="expert-toolbar__row">
            <div class="segmented segmented--scope">
              <button class="${state.expertScope === "nearby" ? "is-active" : ""}" type="button"
                data-action="expert-scope" data-value="nearby">${scopeLabel} <span>${nearCount}</span></button>
              <button class="${state.expertScope === "all" ? "is-active" : ""}" type="button"
                data-action="expert-scope" data-value="all">全部医院 <span>${allScopeCount}</span></button>
            </div>
            <button class="icon-button ${state.expertSearchOpen ? "is-active" : ""}" type="button"
              data-action="expert-search-toggle" aria-label="搜索专家">${icon("search", 17)}</button>
          </div>
          ${expertSearchMarkup()}
          <div class="filter-scroll filter-scroll--tier">
            ${[
              ["all", "全部梯队"],
              ["elite", "大咖"],
              ["director", "主任"],
              ["specialist", "专业"]
            ]
              .map(
                ([id, label]) =>
                  `<button class="chip ${state.expertTier === id ? "is-active" : ""}" type="button"
                    data-action="expert-tier" data-value="${id}">${label}</button>`
              )
              .join("")}
            <i class="filter-divider"></i>
            <button class="chip ${state.expertAvailability === "bookable" ? "is-active" : ""}" type="button"
              data-action="expert-availability" data-value="bookable">当前可约<span class="chip__count">${bookableCount}</span></button>
            <button class="chip ${state.expertAvailability === "local" ? "is-active" : ""}" type="button"
              data-action="expert-availability" data-value="local">只看当地可约<span class="chip__count">${localCount}</span></button>
            <button class="chip ${state.expertAvailability === "all" ? "is-active" : ""}" type="button"
              data-action="expert-availability" data-value="all">全部专家<span class="chip__count">${allCount}</span></button>
          </div>
          ${expertServiceFilterMarkup(serviceScopeHospitalId)}
          <div class="expert-select-filters">
            <label>
              <span>${icon("leaf", 11)} 月份时令 <em>可选</em></span>
              <select data-expert-month>
                <option value="0" ${state.expertMonth === 0 ? "selected" : ""}>不筛选月令</option>
                ${Array.from({ length: 12 }, (_, index) => index + 1)
                  .map(
                    (month) =>
                      `<option value="${month}" ${
                        state.expertMonth === month ? "selected" : ""
                      }>${month}月 · ${esc(seasonalOf(month)?.season || "")}</option>`
                  )
                  .join("")}
              </select>
            </label>
            <label>
              <span>${icon("experts", 11)} 科室方向</span>
              <select data-expert-dept>
                <option value="all">全部科室</option>
                ${DEPT_OPTIONS.map(
                  (dept) =>
                    `<option value="${esc(dept)}" ${
                      state.expertDept === dept ? "selected" : ""
                    }>${esc(dept)}</option>`
                ).join("")}
              </select>
            </label>
          </div>
          <p class="expert-toolbar__hint" id="expert-scope-hint">${icon("mapPin", 11)} ${
            state.expertScope === "nearby"
              ? `优先展示 ${esc(hospital?.name || "就近医院")}${
                  state.expertAvailability === "all"
                    ? " · 含暂无号源专家"
                    : state.expertAvailability === "local"
                    ? " · 仅显示本院可约专家"
                    : " · 仅显示当前可约专家"
                }`
              : `${
                  state.expertAvailability === "local" ? "当地医院" : "全部医院"
                }中，展示可服务${esc(
                  regionText(currentClientRegion().province, currentClientRegion().city)
                )}的专家${
                  state.expertAvailability === "all"
                    ? " · 含暂无号源"
                    : " · 当前可约"
                }`
          }</p>
        </div>
        <div id="expert-results">${renderExpertResults()}</div>
        <div class="expert-bottom-cta">
          <div><strong>没有合适的专家？</strong><span>提交提需，院方电话沟通匹配</span></div>
          <button class="btn btn--primary btn--sm" type="button" data-action="open-demand">发起提需</button>
        </div>
      </div>
    `;
  }

  function expertSearchMarkup() {
    return state.expertSearchOpen
      ? `<div class="expert-search">
          ${icon("search", 16)}
          <input id="expert-search" type="search" placeholder="搜索姓名、医院、科室或主题"
            value="${esc(state.expertSearch)}" data-expert-search autocomplete="off">
          <button type="button" data-action="expert-search-clear" aria-label="清空">${icon(
            "close",
            12
          )}</button>
        </div>`
      : "";
  }

  function syncExpertSearchBox() {
    const toolbar = document.getElementById("expert-toolbar");
    if (!toolbar) return;
    const existing = toolbar.querySelector(".expert-search");
    const toggle = toolbar.querySelector('[data-action="expert-search-toggle"]');
    if (toggle) toggle.classList.toggle("is-active", state.expertSearchOpen);
    if (state.expertSearchOpen && !existing) {
      const row = toolbar.querySelector(".expert-toolbar__row");
      if (row) row.insertAdjacentHTML("afterend", expertSearchMarkup());
    } else if (!state.expertSearchOpen && existing) {
      existing.remove();
    }
  }

  function refreshExpertResults() {
    const wrap = document.getElementById("expert-results");
    if (wrap) wrap.innerHTML = renderExpertResults();
    document.querySelectorAll('[data-action="expert-scope"]').forEach((button) => {
      button.classList.toggle("is-active", button.dataset.value === state.expertScope);
    });
    document.querySelectorAll('[data-action="expert-tier"]').forEach((button) => {
      button.classList.toggle("is-active", button.dataset.value === state.expertTier);
    });
    document.querySelectorAll('[data-action="expert-service"]').forEach((button) => {
      button.classList.toggle("is-active", button.dataset.value === state.expertService);
    });
    document.querySelectorAll('[data-action="expert-availability"]').forEach((button) => {
      button.classList.toggle("is-active", button.dataset.value === state.expertAvailability);
    });
    refreshExpertAvailabilityCounts();
    refreshExpertScopeCount();
    refreshExpertServiceCounts();
  }

  function refreshExpertScopeCount() {
    const near = document.querySelector(
      '[data-action="expert-scope"][data-value="nearby"] span'
    );
    if (near) near.textContent = String(bookableScopeExperts("nearby").length);
    const all = document.querySelector(
      '[data-action="expert-scope"][data-value="all"] span'
    );
    if (all) all.textContent = String(bookableScopeExperts("all").length);
  }

  function refreshExpertServiceCounts() {
    const filter = document.getElementById("expert-service-filter");
    if (!filter) return;
    if (state.expertMonth > 0) {
      const monthCount = filter.querySelector(
        '[data-action="expert-service"][data-value="讲座"] .chip__count'
      );
      if (monthCount) monthCount.textContent = String(bookableScopeExperts().length);
      return;
    }
    filter
      .querySelectorAll('[data-action="expert-service"][data-value]')
      .forEach((button) => {
        button.classList.toggle(
          "is-active",
          button.dataset.value === state.expertService
        );
        if (button.dataset.value === "all") return;
        const count = button.querySelector(".chip__count");
        if (count) count.textContent = String(scopedServiceCount(button.dataset.value));
      });
  }

  function refreshExpertAvailabilityCounts() {
    const bookable = bookableScopeExperts(state.expertScope, "bookable").length;
    const local = bookableScopeExperts(state.expertScope, "local").length;
    const all = bookableScopeExperts(state.expertScope, "all").length;
    const bookableCount = document.querySelector(
      '[data-action="expert-availability"][data-value="bookable"] .chip__count'
    );
    const localCount = document.querySelector(
      '[data-action="expert-availability"][data-value="local"] .chip__count'
    );
    const allCount = document.querySelector(
      '[data-action="expert-availability"][data-value="all"] .chip__count'
    );
    if (bookableCount) bookableCount.textContent = String(bookable);
    if (localCount) localCount.textContent = String(local);
    if (allCount) allCount.textContent = String(all);
  }

  function resetExpertFilters(overrides = {}) {
    state.expertScope = overrides.scope || "nearby";
    state.expertHospitalId = overrides.hospitalId || "";
    state.expertTier = overrides.tier || "all";
    state.expertService = overrides.service || "all";
    state.expertMonth = Number(overrides.month) || 0;
    state.expertDept = overrides.dept || "all";
    state.expertAvailability = overrides.availability || "bookable";
    state.expertSearch = overrides.search || "";
    state.expertSearchOpen = Boolean(overrides.searchOpen);
  }

  function refreshExpertFilterChrome() {
    const hospital = libraryHospital();
    const scopeHospitalId = state.expertScope === "nearby" ? hospital?.id || "" : "";
    const serviceFilter = document.getElementById("expert-service-filter");
    const mode = state.expertMonth > 0 ? "month" : "all";
    if (serviceFilter && serviceFilter.dataset.filterMode !== mode) {
      serviceFilter.outerHTML = expertServiceFilterMarkup(scopeHospitalId);
    }
    document.querySelectorAll('[data-action="expert-scope"]').forEach((button) => {
      button.classList.toggle("is-active", button.dataset.value === state.expertScope);
    });
    document.querySelectorAll('[data-action="expert-tier"]').forEach((button) => {
      button.classList.toggle("is-active", button.dataset.value === state.expertTier);
    });
    document.querySelectorAll('[data-action="expert-availability"]').forEach((button) => {
      button.classList.toggle("is-active", button.dataset.value === state.expertAvailability);
    });
    refreshExpertAvailabilityCounts();
    refreshExpertServiceCounts();
    refreshExpertHint();
  }

  function renderDoctorSheet() {
    const expert = expertById(state.overlay?.doctorId);
    if (!expert) return "";
    const tier = tierOf(expert);
    const availability = doctorAvailability(expert);
    const month = Number(state.overlay?.month) || currentMonth();
    const monthTheme = hospitalTheme(expert.hospitalId, month);
    const season = monthTheme || seasonalOf(month);
    const themes = themesForExpert(expert, month);
    const matchedMonths = monthsForExpert(expert);
    const fromBooking = state.overlayStack.some((item) => item.type === "booking");
    const selected = fromBooking && state.booking?.doctorId === expert.id;
    const nextService = bookingServiceFor(expert, state.expertService);
    return `
      <div class="sheet-backdrop" data-action="close-overlay"></div>
      <section class="sheet doctor-sheet" role="dialog" aria-modal="true" aria-label="${esc(
        expert.name
      )}专家详情">
        <div class="sheet__grabber doctor-hero__grabber"></div>
        <div class="doctor-hero">
          <div class="doctor-hero__bg"></div>
          <div class="doctor-hero__top">
            <span class="tier-tag tier-tag--${expert.tier}">${esc(tier.short)}</span>
            <button class="doctor-hero__close" type="button" data-action="close-overlay" aria-label="关闭">
              ${icon("close", 15)}
            </button>
          </div>
          <div class="doctor-hero__person">
            <img src="${esc(expertAvatarDetail(expert))}" alt="${esc(expert.name)}" decoding="async">
            <div>
              <h1>${esc(expert.name)}</h1>
              <p>${esc(expert.deptTitle)}</p>
              <span>${esc(expert.hospital)}</span>
            </div>
          </div>
          <div class="doctor-hero__meta">
            <span>${icon("clock", 12)} ${esc(expert.leadLabel || tier.leadDays + " 天预约周期")}</span>
            <span>${icon("mapPin", 12)} ${esc(coverageText(expert))}</span>
            <span class="doctor-hero__avail ${availability.bookable ? "is-open" : "is-full"}">
              ${availability.bookable ? `最近可约 ${formatMD(availability.next)}` : "暂无可约档期"}
            </span>
          </div>
        </div>
        <div class="sheet__body">
          <div class="doctor-sheet__content">
            <span class="doctor-services__label">可服务类型</span>
            <div class="doctor-services">
              ${serviceTagsFor(expert)
                .map(
                  ({ service }) =>
                    `<span>${icon(
                      service === "讲座" ? "message" : service === "健康咨询" ? "stethoscope" : "users",
                      13
                    )} ${esc(serviceLabel(service))}</span>`
                )
                .join("")}
            </div>
            <p class="doctor-services__note">仅展示该专家实际可提供的服务类型；发起预约时必须选择对应专家，暂无合适专家可发起提需。</p>
            <div class="fact-grid">
              <div><small>履约机构</small><strong>${esc(expert.hospital)}</strong></div>
              <div><small>科室 / 任职</small><strong>${esc(expert.deptTitle)}</strong></div>
              <div><small>科室方向</small><strong>${esc(expert.dept)}</strong></div>
              <div><small>履约城市</small><strong>${esc(coverageText(expert))}</strong></div>
            </div>
            <section class="detail-section">
              <h3>${icon("star", 14)} 擅长方向</h3>
              <p>${esc(expert.specialty || "以院方最终确认的专家资料为准。")}</p>
            </section>
            <section class="detail-section">
              <h3>${icon("user", 14)} 专家简介</h3>
              <div class="doctor-intro">${esc(expert.intro || "专家简介请以院方最终确认资料为准。")}</div>
            </section>
            <section class="detail-section season-detail">
              <div class="season-detail__head">
                <h3>${icon("leaf", 14)} 时令主题讲座</h3>
                <span>${month}月 · ${themes.length ? "院方配置课题" : "本月暂无课题"}</span>
              </div>
              <div class="month-tabs">
                ${Array.from({ length: 12 }, (_, index) => index + 1)
                  .map(
                    (item) =>
                      `<button class="${item === month ? "is-active" : ""} ${
                        matchedMonths.has(item) ? "has-match" : ""
                      }" type="button"
                        data-action="doctor-month" data-value="${item}">${item}月</button>`
                  )
                  .join("")}
              </div>
              <div class="season-detail__summary">
                <strong>${esc(seasonalHeadline(season?.season || ""))}</strong>
                <p>${esc(season?.focus || "")}</p>
              </div>
              <div class="theme-list">
                ${
                  themes.length
                    ? themes
                        .map(
                          (theme) => `
                            <button class="theme-item is-matched" type="button" data-action="theme-open"
                              data-month="${theme.month}" data-hospital-id="${esc(expert.hospitalId)}">
                              <span>${esc(theme.dept)}${theme.month ? ` · ${theme.month}月` : ""}</span>
                              <strong>${esc(theme.title)}</strong>
                              <small>${esc(theme.hospital)} · ${esc(
                                theme.professionalTitle
                              )} · ${esc(coverageDisplayLabel(theme.coverage))}</small><i>查看主题</i>
                            </button>
                          `
                        )
                        .join("")
                    : `<div class="theme-empty">${icon(
                        "leaf",
                        15
                      )} 本月未给该专家绑定讲座课题，可切换月份查看。</div>`
                }
              </div>
              <p class="season-detail__note">仅展示本院月度主题中绑定到该专家的课题；课题、时令内容与覆盖城市均由医院运营维护。</p>
            </section>
            ${
              expert.profileUrl
                ? `<a class="source-row source-row--link" href="${esc(
                    expert.profileUrl
                  )}" target="_blank" rel="noopener noreferrer">查看医院官网资料 ${icon(
                    "arrowUpRight",
                    12
                  )}</a>`
                : `<p class="source-row">该专家为院方内部配置资源，官网暂未收录公开页面。</p>`
            }
          </div>
        </div>
        <div class="sheet__footer">
          <button class="btn btn--ghost" type="button" data-action="close-overlay">${
            fromBooking ? "返回预约" : "返回"
          }</button>
          ${
            fromBooking
              ? `<button class="btn btn--primary" type="button" data-action="booking-use-doctor"
                  data-doctor-id="${esc(expert.id)}" ${availability.bookable ? "" : "disabled"}>
                  ${selected ? "已选择该专家" : "选择该专家"} ${icon("check", 15)}
                </button>`
              : `<button class="btn btn--primary" type="button" data-action="book-doctor" data-doctor-id="${esc(
                  expert.id
                )}" data-service="${esc(nextService)}" data-month="${
                  state.overlay?.themeMonth || 0
                }" ${
                  availability.bookable ? "" : "disabled"
                }>
                  ${availability.bookable ? "预约该专家" : "暂无可约档期"} ${icon("arrowRight", 15)}
                </button>`
          }
        </div>
      </section>
    `;
  }

  /* =========================================================
     Booking flow
     ========================================================= */
  function bookingDateOptions(booking) {
    if (!booking) return [];
    if (booking.doctorId) {
      const expert = expertById(booking.doctorId);
      if (!expert) return [];
      return doctorAvailability(expert).dates.slice(0, 30);
    }
    const list = [];
    const today = startOfDay();
    for (let offset = 1; offset <= 45; offset += 1) {
      const date = addDays(today, offset);
      if (date.getDay() === 0 || date.getDay() === 6) continue;
      list.push(isoDate(date));
      if (list.length >= 21) break;
    }
    return list;
  }

  function createBookingDraft(
    doctorId = "",
    tier = "",
    preferredService = "",
    preferredTopic = "",
    preferredTheme = null
  ) {
    const expert = doctorId ? expertById(doctorId) : null;
    const session = state.session || {};
    const hospital =
      hospitalById(preferredTheme?.hospitalId) ||
      (expert ? hospitalById(expert.hospitalId) : null) ||
      nearestHospital() ||
      state.hospitals[0] ||
      null;
    const region = currentClientRegion();
    const serviceType = bookingServiceFor(expert, preferredService);
    let themeMonth = Number(preferredTheme?.month) || 0;
    let themeTopicId = preferredTheme?.topicId || "";
    let themeCoverage = preferredTheme?.coverageLabel || "";
    if (preferredTopic && (!themeTopicId || !themeMonth)) {
      const hospitalId = preferredTheme?.hospitalId || expert?.hospitalId || hospital?.id || "";
      const month = themeMonth || currentMonth();
      const theme = hospitalTheme(hospitalId, month);
      const topic = (theme?.topics || []).find(
        (item) => String(item.title || "").trim() === String(preferredTopic).trim()
      );
      if (topic) {
        themeMonth = month;
        themeTopicId = topic.id || "";
        themeCoverage = themeTopicCoverage(topic, theme, hospitalId).label;
      }
    }
    return {
      requestId: requestToken("booking"),
      step: 1,
      serviceType,
      doctorId: expert?.id || "",
      tier: expert?.tier || tier || "specialist",
      hospitalId: hospital?.id || "",
      date: "",
      province: region.province,
      city: region.city,
      address: "",
      venue: "",
      topic: "",
      customTopic: preferredTopic || "",
      themeMonth,
      themeTopicId,
      themeCoverage,
      audience: "",
      headcount: "",
      note: "",
      contactName: session.name || "",
      contactPhone: session.contactPhone || session.phone || "",
      agree: false
    };
  }

  function openBooking(
    doctorId = "",
    tier = "",
    preferredService = "",
    preferredTopic = "",
    preferredTheme = null
  ) {
    if (!state.session) {
      startLogin({
        type: "booking",
        doctorId,
        tier,
        service: preferredService,
        topic: preferredTopic,
        theme: preferredTheme,
        returnTab: state.tab || "home"
      });
      return;
    }
    state.overlayStack = [];
    state.booking = createBookingDraft(
      doctorId,
      tier,
      preferredService,
      preferredTopic,
      preferredTheme
    );
    syncBookingDoctor(state.booking);
    state.booking.doctorPinned = Boolean(state.booking.doctorId);
    state.booking.doctorPickerOpen = false;
    state.overlay = { type: "booking" };
    renderOverlay();
  }

  function openBookingFromDemand(demandId) {
    const demand = demandById(demandId || state.overlay?.demandId);
    if (!demand) return showToast("提需记录不存在。");
    if (!state.session) {
      startLogin({ type: "booking", returnTab: "appointments" });
      return;
    }
    if (!clientOwnsDemand(demand)) return showToast("无权操作该提需。");
    if (demand.convertedAppointmentId) {
      const converted = appointmentById(demand.convertedAppointmentId);
      if (converted) {
        state.overlay = { type: "appointment", appointmentId: converted.id };
        renderOverlay();
        return;
      }
    }
    if (demand.status !== "matched") {
      return showToast("院方确认匹配专家后，可直接基于提需发起预约。");
    }
    const matchedExpert = demand.matchedExpertId
      ? expertById(demand.matchedExpertId)
      : null;
    const hospital =
      (matchedExpert ? hospitalById(matchedExpert.hospitalId) : null) ||
      hospitalById(demand.hospitalId) ||
      nearestHospital();
    state.overlayStack = [];
    state.booking = createBookingDraft(
      matchedExpert?.id || "",
      matchedExpert?.tier || "",
      demand.serviceType,
      demand.topic,
      null
    );
    state.booking.hospitalId = hospital?.id || state.booking.hospitalId;
    state.booking.province = demand.province || state.booking.province;
    state.booking.city = demand.city || state.booking.city;
    state.booking.audience = demand.audience || "";
    state.booking.headcount = demand.headcount || "";
    state.booking.contactName =
      demand.contactName || state.booking.contactName || state.session.name || "";
    state.booking.contactPhone =
      demand.phone || state.booking.contactPhone || state.session.phone || "";
    state.booking.note = [
      demand.note,
      `由需求单 ${demand.id} 转入，院方已确认资源匹配。`
    ]
      .filter(Boolean)
      .join("\n");
    state.booking.demandId = demand.id;
    state.booking.demandContext = {
      id: demand.id,
      topic: demand.topic,
      audience: demand.audience,
      headcount: demand.headcount
    };
    if (
      demand.preferredDate &&
      (!matchedExpert ||
        doctorAvailability(matchedExpert).dates.includes(demand.preferredDate))
    ) {
      state.booking.date = demand.preferredDate;
    }
    syncBookingDoctor(state.booking);
    state.booking.doctorPinned = Boolean(state.booking.doctorId);
    state.booking.doctorPickerOpen = false;
    state.overlay = { type: "booking" };
    renderOverlay();
  }

  function bookingSelectedDoctor(booking) {
    return booking?.doctorId ? expertById(booking.doctorId) : null;
  }

  function bookingHospital(booking) {
    return (
      hospitalById(booking?.hospitalId) ||
      hospitalById(bookingSelectedDoctor(booking)?.hospitalId) ||
      nearestHospital() ||
      state.hospitals[0] ||
      null
    );
  }

  function themeBoundExpertIds(theme) {
    return [
      ...new Set(
        [
          ...(theme?.expertIds || []),
          ...(theme?.topics || []).map((topic) => topic.expertId || "")
        ]
          .map(String)
          .filter(Boolean)
      )
    ];
  }

  function bookingTopicContext(booking) {
    const month = Number(booking?.themeMonth) || currentMonth();
    const expert = bookingSelectedDoctor(booking);
    const hospital = bookingHospital(booking);
    const hospitalId = hospital?.id || expert?.hospitalId || "";
    const theme = hospitalTheme(hospitalId, month);
    return { month, expert, hospital, hospitalId, theme };
  }

  function bookingSelectedTopic(booking) {
    if (
      booking?.serviceType !== "讲座" ||
      !Number(booking?.themeMonth) ||
      !booking?.customTopic
    ) {
      return null;
    }
    const { theme } = bookingTopicContext(booking);
    return (
      (theme?.topics || []).find((topic) =>
        booking.themeTopicId
          ? String(topic.id || "") === String(booking.themeTopicId)
          : String(topic.title || "").trim() === String(booking.customTopic).trim()
      ) || null
    );
  }

  function bookingThemeContext(booking) {
    const hospital = bookingHospital(booking);
    const month = Number(booking?.themeMonth) || 0;
    const base = {
      active: false,
      month,
      hospital,
      hospitalId: hospital?.id || "",
      theme: null,
      topic: null,
      expertIds: []
    };
    if (!hospital || booking?.serviceType !== "讲座" || !month) return base;
    const theme = hospitalTheme(hospital.id, month);
    if (!theme) return base;
    const topic = bookingSelectedTopic(booking);
    const boundIds = themeBoundExpertIds(theme);
    return {
      ...base,
      active: true,
      theme,
      topic,
      expertIds: topic?.expertId ? [String(topic.expertId)] : boundIds
    };
  }

  function bookingSelectedTopicCoverage(booking) {
    const topic = bookingSelectedTopic(booking);
    if (!topic) return null;
    const { month, hospitalId, theme, hospital } = bookingTopicContext(booking);
    const coverage = themeTopicCoverage(topic, theme, hospitalId);
    return {
      topic,
      month,
      hospital,
      hospitalId,
      theme,
      coverage,
      available: themeTopicCoversRegion(coverage, booking.province, booking.city)
    };
  }

  function bookingTopicChoices(booking) {
    if (booking?.serviceType !== "讲座") return [];
    const { expert, theme, hospitalId } = bookingTopicContext(booking);
    const hospitalTopics = clientThemeTopics(
      theme,
      hospitalId,
      booking?.province || "",
      booking?.city || "",
      {
        topicId: booking?.themeTopicId || "",
        title: booking?.customTopic || ""
      }
    );
    const expertTopics = expert
      ? hospitalTopics.filter((topic) => String(topic.expertId || "") === String(expert.id))
      : [];
    const source = expert ? expertTopics : hospitalTopics;
    const seen = new Set();
    return source
      .filter((topic) => {
        const title = String(topic.title || "").trim();
        if (!title || seen.has(title)) return false;
        seen.add(title);
        return true;
      })
      .slice(0, 8);
  }

  function renderBookingProgress(step) {
    return `
      <div class="booking-progress">
        <div class="${step >= 1 ? "is-active" : ""}"><span>1</span><small>活动需求</small></div>
        <i></i>
        <div class="${step >= 2 ? "is-active" : ""}"><span>2</span><small>确认提交</small></div>
      </div>
    `;
  }

  function renderBookingServiceSection(booking) {
    return `
      <div class="choice-row choice-row--three">
        ${SERVICE_IDS.map((id) => {
          const service = SERVICES[id];
          return `
            <button class="choice-card ${booking.serviceType === id ? "is-active" : ""}" type="button"
              data-action="booking-service" data-value="${esc(id)}">
              <span>${icon(
                id === "讲座" ? "message" : id === "健康咨询" ? "stethoscope" : "users",
                17
              )}</span>
              <strong>${esc(service.label)}</strong>
              <small>${esc(service.desc)}</small>
            </button>
          `;
        }).join("")}
      </div>
    `;
  }

  function bookingDoctorEntry(expert, booking, context = null) {
    if (!expert || expert.active === false || !booking) return null;
    const hospital = context?.hospital || bookingHospital(booking);
    const themeCtx = context?.theme || bookingThemeContext(booking);
    if (!hospital || expert.hospitalId !== hospital.id) return null;
    if (!matchesService(expert, booking.serviceType)) return null;
    if (themeCtx.active && !themeCtx.expertIds.includes(String(expert.id))) return null;

    const availability = doctorAvailability(expert);
    const covers = themeCtx.active
      ? themeCtx.topic
        ? themeTopicCoversRegion(
            themeTopicCoverage(
              themeCtx.topic,
              themeCtx.theme,
              themeCtx.hospitalId
            ),
            booking.province,
            booking.city
          )
        : expertThemeCoversRegion(
            expert,
            themeCtx.month,
            booking.province,
            booking.city,
            themeCtx.hospitalId
          )
      : expertCoversRegion(expert, booking.province, booking.city);
    if (!covers) {
      return {
        expert,
        availability,
        bookable: false,
        status: "city",
        label: `不含${booking.city || "当前城市"}`,
        actionLabel: "不可履约"
      };
    }
    if (!availability.bookable) {
      return {
        expert,
        availability,
        bookable: false,
        status: "full",
        label: "暂无号源",
        actionLabel: "暂无号源"
      };
    }
    return {
      expert,
      availability,
      bookable: true,
      status: "open",
      label: `可约 ${formatMD(availability.next)}`,
      actionLabel: "选择"
    };
  }

  function bookingDoctorCandidates(booking) {
    if (!booking) return [];
    const hospital = bookingHospital(booking);
    const theme = bookingThemeContext(booking);
    const context = { hospital, theme };
    return state.experts
      .map((expert) => bookingDoctorEntry(expert, booking, context))
      .filter(Boolean)
      .sort(
        (a, b) =>
          Number(b.bookable) - Number(a.bookable) ||
          CLIENT_TIER_ORDER.indexOf(a.expert.tier) -
            CLIENT_TIER_ORDER.indexOf(b.expert.tier) ||
          a.expert.name.localeCompare(b.expert.name, "zh-CN")
      );
  }

  function syncBookingDoctor(booking) {
    if (!booking?.doctorId) return false;
    const expert = expertById(booking.doctorId);
    const entry = bookingDoctorEntry(expert, booking);
    if (entry?.bookable) return false;
    booking.doctorId = "";
    booking.date = "";
    booking.doctorPinned = false;
    booking.doctorPickerOpen = true;
    return true;
  }

  function renderBookingDoctorSection(booking) {
    const options = bookingDoctorCandidates(booking);
    const doctor = bookingSelectedDoctor(booking);
    const themeCtx = bookingThemeContext(booking);
    const bookableCount = options.filter((item) => item.bookable).length;
    const selectedEntry = doctor
      ? options.find((entry) => entry.expert.id === doctor.id) || null
      : null;
    const pinned = Boolean(
      doctor && selectedEntry && booking.doctorPinned && !booking.doctorPickerOpen
    );
    const visibleOptions = pinned ? [selectedEntry] : options;
    const topicExpert = themeCtx.topic?.expertId
      ? expertById(themeCtx.topic.expertId)
      : null;
    const filterText = pinned
      ? `已带入 ${doctor.name}，可直接继续填写；同条件共 ${options.length} 位相关专家、${bookableCount} 位可约，点击“更换专家”查看。`
      : themeCtx.topic
      ? `已按课题「${themeCtx.topic.title}」筛选${
          topicExpert ? `，仅展示主讲专家 ${topicExpert.name}` : ""
        }；${options.length} 位相关，${bookableCount} 位可约。`
      : themeCtx.active
      ? `已按 ${themeCtx.month} 月时令主题筛选，仅展示本月绑定专家；${options.length} 位相关，${bookableCount} 位可约。`
      : `当前共 ${options.length} 位可提供「${serviceLabel(
          booking.serviceType
        )}」的专家，${bookableCount} 位可约。`;
    return `
      <div class="booking-doctor-list">
        <p class="booking-doctor__note">${icon("sparkles", 12)}
          专家为必选项。${esc(filterText)}
        </p>
        ${
          themeCtx.active
            ? `<div class="booking-doctor__filter">
                <span>${icon("leaf", 13)}</span>
                <span><strong>${
                  themeCtx.topic ? "课题已限定专家" : "本月时令主题已筛选"
                }</strong><small>${
                  themeCtx.topic
                    ? doctor
                      ? "如需更换主讲专家，请先取消当前专家，再切换其他课题。"
                      : "切换课题或清除课题后，候选专家会同步更新。"
                    : "选择具体课题后，候选专家会进一步收敛。"
                }</small></span>
              </div>`
            : ""
        }
        <div class="booking-doctor__status ${doctor ? "has-doctor" : ""}">
          <span>${doctor ? `已选专家 · ${esc(doctor.name)}` : "尚未选择专家"}</span>
          ${
            pinned
              ? `<button type="button" data-action="booking-doctor-change">更换专家</button>`
              : ""
          }
        </div>
        ${visibleOptions
          .map((entry) => {
            const expert = entry.expert;
            const active = booking.doctorId === expert.id;
            return `
              <div class="booking-doctor ${active ? "is-active" : ""} ${
                entry.bookable ? "" : "is-unavailable"
              }" data-action="booking-doctor-preview" data-value="${esc(expert.id)}">
                <button class="booking-doctor__profile" type="button"
                  data-action="booking-doctor-preview" data-value="${esc(expert.id)}">
                  <img src="${esc(expertAvatar(expert))}" alt="${esc(expert.name)}" loading="lazy">
                  <span><strong>${esc(expert.name)}<i>${esc(expert.deptTitle)}</i></strong>
                    <small><strong class="hospital-name">${esc(
                      expert.hospital
                    )}</strong> · <b class="booking-doctor__availability booking-doctor__availability--${esc(
                      entry.status
                    )}">${esc(entry.label)}</b> · <em>查看简介</em></small></span>
                </button>
                <button class="booking-doctor__select ${active ? "is-active" : ""}" type="button"
                  data-action="booking-doctor" data-value="${esc(expert.id)}"
                  aria-pressed="${active ? "true" : "false"}" ${
                    entry.bookable ? "" : "disabled"
                  }>
                  <i class="booking-doctor__check">${icon("check", 12)}</i>
                  <span>${active ? "已选" : entry.actionLabel}</span>
                </button>
              </div>
            `;
          })
          .join("")}
        ${
          !options.length
            ? `<div class="inline-empty booking-demand-empty">
                <strong>${themeCtx.active ? "当前主题暂无可承接专家" : "当前医院暂无可选专家"}</strong>
                <span>${
                  themeCtx.active
                    ? "本院本月时令主题未绑定符合当前服务类型与活动城市的专家。可切换课题、调整活动城市，或发起提需由医院运营人员协调。"
                    : `暂无同时满足「${esc(
                        serviceLabel(booking.serviceType)
                      )}」服务类型、履约城市和可预约号源的专家。专家为必选项，请切换服务类型或发起提需。`
                }</span>
                <button class="btn btn--soft btn--sm" type="button" data-action="booking-open-demand">
                  ${icon("send", 13)} 发起提需
                </button>
              </div>`
            : ""
        }
        ${
          options.length && !bookableCount
            ? `<div class="inline-empty booking-demand-empty">
                <strong>${themeCtx.topic ? "该课题主讲专家暂无号源" : "当前没有可预约的专家"}</strong>
                <span>仍可查看专家资料，但不能直接提交预约。可更换专家、调整活动城市或日期，或发起提需由院方协调号源。</span>
                <button class="btn btn--soft btn--sm" type="button" data-action="booking-open-demand">
                  ${icon("send", 13)} 发起提需
                </button>
              </div>`
            : ""
        }
        ${
          doctor
            ? `<p class="booking-hint">${icon("clock", 12)} ${esc(
                doctor.leadLabel
              )}；仅展示符合预约周期的可约日期。</p>`
            : ""
        }
      </div>
    `;
  }

  function renderBookingDates(booking) {
    if (!booking?.doctorId) {
      return `
        <div class="date-chip-list" id="booking-dates">
          <div class="inline-empty booking-date-locked">
            <strong>请先选择专家</strong>
            <span>选择专家后，这里只展示该专家实际配置且可预约的日期。</span>
          </div>
        </div>
      `;
    }
    const options = bookingDateOptions(booking);
    return `
      <div class="date-chip-list" id="booking-dates">
        ${
          options.length
            ? options
                .map((date) => {
                  const parsed = parseDate(date);
                  return `
                    <button class="date-chip ${booking.date === date ? "is-active" : ""}" type="button"
                      data-action="booking-date" data-value="${esc(date)}">
                      <strong>${formatMD(date)}</strong>
                      <span>${weekday(parsed)}</span>
                    </button>
                  `;
                })
                .join("")
            : `<div class="inline-empty booking-demand-empty">
                <strong>该专家暂无可约日期</strong>
                <span>请选择其他专家，或发起提需由医院运营人员电话沟通。</span>
                <button class="btn btn--soft btn--sm" type="button" data-action="booking-open-demand">
                  ${icon("send", 13)} 发起提需
                </button>
              </div>`
        }
      </div>
    `;
  }

  function renderBookingTopics(booking) {
    const list = bookingTopicChoices(booking);
    const { month, hospitalId, theme } = bookingTopicContext(booking);
    const selected = bookingSelectedTopicCoverage(booking);
    const monthBookable = month === currentMonth();
    const coverageCallout = selected
      ? `<div class="booking-topic-coverage ${
          selected.available ? "is-available" : "is-unavailable"
        }">
          ${icon("mapPin", 13)}
          <span>
            <strong>${selected.available ? "当前城市可预约" : "当前城市不可预约"}</strong>
            <small>「${esc(selected.topic.title)}」履约地：${esc(
              selected.coverage.label
            )}；${selected.available ? "与本次活动城市匹配" : `不含${esc(
              regionText(booking.province, booking.city)
            )}，请更换课题`}</small>
          </span>
        </div>`
      : "";
    return `
      <div id="booking-topics">
      ${coverageCallout}
      <div class="topic-chip-list">
        ${
          list.length
            ? list
                .map((topic) => {
                  const coverage = themeTopicCoverage(topic, theme, hospitalId);
                  const available = themeTopicCoversRegion(
                    coverage,
                    booking.province,
                    booking.city
                  );
                  const active =
                    booking.customTopic === topic.title &&
                    (!booking.themeTopicId ||
                      !topic.id ||
                      String(booking.themeTopicId) === String(topic.id));
                  const selectable = available && monthBookable;
                  return `
                    <div class="topic-chip ${active ? "is-active" : ""} ${
                      available ? "" : "is-unavailable"
                    }">
                      <button class="topic-chip__preview" type="button"
                        data-action="booking-topic-preview" data-value="${esc(topic.title)}"
                        title="履约地：${esc(coverage.label)}${
                          available ? "" : " · 当前城市不可预约"
                        }">
                        <span class="topic-chip__main"><i>${esc(topic.dept)}</i>${esc(
                          topic.title
                        )}</span>
                        <small>${icon("mapPin", 9)} ${esc(coverage.label)}${
                          available ? "" : " · 当前城市不可约"
                        }</small>
                      </button>
                      <button class="topic-chip__select ${active ? "is-active" : ""}" type="button"
                        data-action="booking-topic" data-value="${esc(topic.title)}"
                        ${selectable ? "" : "disabled"}>
                        ${active ? "已选" : available ? (monthBookable ? "选择" : "仅浏览") : "不可约"}
                      </button>
                    </div>
                  `;
                })
                .join("")
            : `<div class="inline-empty">${
                normalizeService(booking.serviceType) === "1V1报告解读"
                  ? "1V1 报告解读不关联讲座课题，可直接填写报告解读方向。"
                  : normalizeService(booking.serviceType) === "健康咨询"
                  ? "健康咨询不展示讲座课题，请直接填写咨询方向或人群健康需求。"
                  : booking.doctorId
                  ? "该专家本月暂未绑定讲座课题，可在下方填写自定义主题，或取消选择其他专家。"
                  : "本月主题暂无可选课题，可在下方填写自定义主题。"
              }</div>`
        }
      </div>
      </div>
    `;
  }

  function bookingDemandHint(serviceType) {
    if (normalizeService(serviceType) === "健康咨询") {
      return "填写咨询方向与人群需求";
    }
    if (normalizeService(serviceType) === "1V1报告解读") {
      return "填写报告解读关注方向";
    }
    return "时令主题可选，点击已选主题可取消";
  }

  function bookingTopicFieldHint(serviceType) {
    if (normalizeService(serviceType) === "健康咨询") {
      return "填写咨询方向";
    }
    if (normalizeService(serviceType) === "1V1报告解读") {
      return "填写报告解读方向";
    }
    return "可选本月主题，也可自定义";
  }

  function bookingThemeTopicLocked(booking) {
    return Boolean(booking?.themeMonth && booking?.themeTopicId);
  }

  function syncBookingTopicField() {
    const booking = state.booking;
    const input = document.querySelector('[data-booking-field="customTopic"]');
    if (!booking || !input) return;
    const locked = bookingThemeTopicLocked(booking);
    input.readOnly = locked;
    input.classList.toggle("is-locked", locked);
    input.setAttribute("aria-readonly", locked ? "true" : "false");
    if (locked) input.value = booking.customTopic || "";
    const hint = document.getElementById("booking-topic-field-hint");
    if (hint) {
      hint.textContent = locked
        ? "已选时令主题 · 不可修改"
        : bookingTopicFieldHint(booking.serviceType);
    }
    let lockHelp = document.getElementById("booking-topic-lock-help");
    if (locked && !lockHelp) {
      lockHelp = document.createElement("span");
      lockHelp.id = "booking-topic-lock-help";
      lockHelp.className = "field-help booking-topic-lock-help";
      lockHelp.innerHTML = `${icon(
        "lock",
        10
      )} 课题名称由院方统一配置，取消时令主题后可自定义。`;
      input.insertAdjacentElement("afterend", lockHelp);
    } else if (!locked && lockHelp) {
      lockHelp.remove();
    }
  }

  function renderBookingStepOne() {
    const booking = state.booking;
    if (!booking) return "";
    const topicLocked = bookingThemeTopicLocked(booking);
    return `
      <div class="flow-section ${bookingErrorClass("service")}">
        <div class="flow-section__head"><h2>服务类型</h2><span>选择到企服务形式</span></div>
        ${renderBookingServiceSection(booking)}
        ${bookingFieldErrorMarkup("service")}
      </div>
      <div class="flow-section ${bookingErrorClass("doctor")}" data-booking-error="doctor">
        <div class="flow-section__head"><h2>专家 <em>*</em></h2><span>必选 · 已选专家可直接继续</span></div>
        <div id="booking-doctors">${renderBookingDoctorSection(booking)}</div>
        ${bookingFieldErrorMarkup("doctor")}
      </div>
      <div class="flow-section ${bookingErrorClass("date")}">
        <div class="flow-section__head"><h2>期望日期</h2><span>号源按整天配置，不区分时段</span></div>
        ${renderBookingDates(booking)}
        ${bookingFieldErrorMarkup("date")}
      </div>
      <div class="flow-section ${bookingErrorClass("address")}">
        <div class="flow-section__head"><h2>活动地点</h2><span>地址为必填</span></div>
        <div class="field-row">
          <div class="field"><label>省份</label>
            <select data-booking-province>${renderProvinceOptions(booking.province)}</select>
          </div>
          <div class="field"><label>城市</label>
            <select data-booking-city>${renderCityOptions(booking.province, booking.city)}</select>
          </div>
        </div>
        <div class="field">
          <label>详细地址 <em>*</em></label>
          <input class="${bookingInputErrorClass(
            "address"
          )}" type="text" data-booking-field="address" data-booking-error="address" value="${esc(
            booking.address
          )}" placeholder="请输入企业详细地址，如：XX路XX号XX大厦">
          ${bookingFieldErrorMarkup("address")}
        </div>
        <div class="field">
          <label>场地名称 <span>选填</span></label>
          <input type="text" data-booking-field="venue" value="${esc(
            booking.venue
          )}" placeholder="如：总部大楼 3 层报告厅">
        </div>
      </div>
      <div class="flow-section ${bookingErrorClass("topics")}">
        <div class="flow-section__head"><h2>活动需求</h2><span id="booking-demand-hint">${esc(
          bookingDemandHint(booking.serviceType)
        )}</span></div>
        ${renderBookingTopics(booking)}
        ${bookingFieldErrorMarkup("topics")}
        <div class="field">
          <label>活动主题 <em>*</em> <span id="booking-topic-field-hint">${esc(
            topicLocked ? "已选时令主题 · 不可修改" : bookingTopicFieldHint(booking.serviceType)
          )}</span></label>
          <input class="${[topicLocked ? "is-locked" : "", bookingInputErrorClass("topic")]
            .filter(Boolean)
            .join(" ")}" type="text"
            data-booking-field="customTopic" data-booking-error="topic" value="${esc(
              booking.customTopic
            )}"
            placeholder="如：职场人群心血管风险识别"
            ${topicLocked ? 'readonly aria-readonly="true"' : ""}>
          ${bookingFieldErrorMarkup("topic")}
          ${
            topicLocked
              ? `<span id="booking-topic-lock-help" class="field-help booking-topic-lock-help">${icon(
                  "lock",
                  10
                )} 课题名称由院方统一配置，取消时令主题后可自定义。</span>`
              : ""
          }
        </div>
        <div class="field-row">
          <div class="field"><label>参与人群 <em>*</em></label>
            <input class="${bookingInputErrorClass(
              "audience"
            )}" type="text" data-booking-field="audience" data-booking-error="audience" value="${esc(
              booking.audience
            )}" placeholder="如：企业员工 / 高客">
            ${bookingFieldErrorMarkup("audience")}
          </div>
          <div class="field"><label>预计人数 <em>*</em></label>
            <input class="${bookingInputErrorClass(
              "headcount"
            )}" type="number" inputmode="numeric" data-booking-field="headcount" data-booking-error="headcount" value="${esc(
              booking.headcount
            )}" placeholder="如：80">
            ${bookingFieldErrorMarkup("headcount")}
          </div>
        </div>
        <div class="field">
          <label>补充说明 <span>选填</span></label>
          <textarea data-booking-field="note" placeholder="可填写人群特点、场地条件、期望时段或其他要求">${esc(
            booking.note
          )}</textarea>
        </div>
      </div>
      <div class="flow-section ${bookingErrorClass("contact")}">
        <div class="flow-section__head"><h2>联系人</h2><span>默认带入登录信息</span></div>
        <div class="field-row">
          <div class="field"><label>联系人</label>
            <input class="${bookingInputErrorClass(
              "contactName"
            )}" type="text" data-booking-field="contactName" data-booking-error="contactName" value="${esc(
              booking.contactName
            )}">
            ${bookingFieldErrorMarkup("contactName")}
          </div>
          <div class="field"><label>联系电话</label>
            <input class="${bookingInputErrorClass(
              "contactPhone"
            )}" type="tel" inputmode="numeric" maxlength="11" data-booking-field="contactPhone" data-booking-error="contactPhone" value="${esc(
              booking.contactPhone
            )}">
            ${bookingFieldErrorMarkup("contactPhone")}
          </div>
        </div>
      </div>
    `;
  }

  function renderBookingSummary() {
    const booking = state.booking;
    const expert = bookingSelectedDoctor(booking);
    const hospital = bookingHospital(booking);
    const topicCoverage = bookingSelectedTopicCoverage(booking);
    return `
      <div class="summary-card summary-card--hero">
        <span class="summary-card__label">${icon("calendar", 14)} 活动预约</span>
        <h2>${esc(booking.customTopic || "由院方结合时令主题推荐")}</h2>
        <div class="summary-card__pills">
          <span>${esc(serviceLabel(booking.serviceType))}</span>
          <span>${esc(formatDateCN(booking.date, true))}</span>
          <span>${esc(hospital?.name || "")}</span>
        </div>
      </div>
      <div class="summary-list">
        <div><span>专家</span><strong>${esc(
          expert ? `${expert.name} · ${expert.deptTitle}` : "请选择专家"
        )}</strong></div>
        <div><span>活动地点</span><strong>${esc(
          formatAddress(booking.province, booking.city, booking.address, booking.venue)
        )}</strong></div>
        ${
          topicCoverage
            ? `<div><span>主题履约地</span><strong>${esc(
                topicCoverage.coverage.label
              )} · ${topicCoverage.available ? "当前城市可预约" : "当前城市不可预约"}</strong></div>`
            : ""
        }
        <div><span>参与人群</span><strong>${esc(booking.audience || "待院方沟通确认")}</strong></div>
        <div><span>预计人数</span><strong>${esc(booking.headcount ? booking.headcount + " 人" : "待确认")}</strong></div>
        <div><span>联系人</span><strong>${esc(booking.contactName)} · ${phoneLink(
          booking.contactPhone,
          booking.contactPhone
        )}</strong></div>
        ${
          booking.note
            ? `<div><span>补充说明</span><strong>${esc(booking.note)}</strong></div>`
            : ""
        }
      </div>
      <div class="process-note">
        <strong>${icon("alert", 14)} 提交后流程</strong>
        <p>提交后进入“待接单”。医院运营接单后显示具体项目对接人，并填写活动主题、时间、地点、课题大纲与项目组成员；机构确认方案后预约正式生效。</p>
      </div>
      <label class="check-row check-row--block ${
        booking.validationErrors?.some((issue) => issue.key === "agree")
          ? "is-invalid"
          : ""
      }" data-booking-error="agree">
        <input type="checkbox" data-booking-agree ${booking.agree ? "checked" : ""}>
        <span>我已确认以上信息，并同意由院方项目组联系确认活动细节。</span>
      </label>
      ${bookingFieldErrorMarkup("agree")}
    `;
  }

  function renderBookingFlow() {
    const booking = state.booking;
    if (!booking) return "";
    return `
      <div class="flow booking-flow">
        <header class="flow__bar">
          <button class="icon-button" type="button" data-action="close-overlay" aria-label="关闭">
            ${icon("close", 17)}
          </button>
          <div><strong>${booking.step === 1 ? "发起预约" : "确认预约"}</strong><small>企业健康活动</small></div>
          <span class="flow__step">${booking.step}/2</span>
        </header>
        <div class="flow__body">
          ${renderBookingProgress(booking.step)}
          ${
            booking.demandContext
              ? `<div class="booking-demand-banner">${icon("sparkles", 15)}
                  <div>
                    <strong>由提需 ${esc(booking.demandContext.id)} 转入</strong>
                    <p>${esc(booking.demandContext.topic)}${
                    booking.demandContext.headcount
                      ? ` · 预计 ${esc(booking.demandContext.headcount)} 人`
                      : ""
                  } · 院方已确认资源匹配，请补充活动地点与日期后提交。</p>
                  </div>
                </div>`
              : ""
          }
          ${
            booking.validationErrors?.length
              ? `<div class="booking-validation-summary" role="alert">
                  <div class="booking-validation-summary__head">
                    ${icon("alert", 16)}
                    <div><strong>还有 ${booking.validationErrors.length} 项需要补充</strong><small>已为你定位到第一个问题</small></div>
                  </div>
                  <ul>
                    ${booking.validationErrors
                      .map(
                        (issue) =>
                          `<li><button type="button" data-action="booking-error-focus" data-target="${esc(
                            issue.focus
                          )}">${esc(issue.message)}</button></li>`
                      )
                      .join("")}
                  </ul>
                </div>`
              : ""
          }
          ${booking.step === 1 ? renderBookingStepOne() : renderBookingSummary()}
        </div>
        <footer class="flow__footer">
          ${
            booking.step === 1
              ? `<button class="btn btn--primary btn--block" type="button" data-action="booking-next">下一步，确认信息 ${icon(
                  "arrowRight",
                  15
                )}</button>`
              : `<button class="btn btn--ghost" type="button" data-action="booking-back">上一步</button>
                 <button class="btn btn--primary" type="button" data-action="booking-submit"
                   ${state.bookingSubmitting ? "disabled" : ""}>${
                   state.bookingSubmitting
                     ? "正在锁定号源…"
                     : `提交预约 ${icon("check", 15)}`
                 }</button>`
          }
        </footer>
      </div>
    `;
  }

  function refreshBookingDates() {
    const wrap = document.getElementById("booking-dates");
    if (wrap && state.booking) wrap.outerHTML = renderBookingDates(state.booking);
  }

  function refreshBookingTopics() {
    const wrap = document.getElementById("booking-topics");
    if (wrap && state.booking) wrap.outerHTML = renderBookingTopics(state.booking);
  }

  function refreshBookingDoctors() {
    const wrap = document.getElementById("booking-doctors");
    if (wrap && state.booking) wrap.innerHTML = renderBookingDoctorSection(state.booking);
  }

  function setBookingService(value) {
    if (!state.booking) return;
    clearBookingValidation();
    const service = concreteService(value);
    if (!service) return;
    state.booking.serviceType = service;
    if (service !== "讲座") {
      state.booking.themeMonth = 0;
      state.booking.themeTopicId = "";
      state.booking.themeCoverage = "";
    }
    document.querySelectorAll('[data-action="booking-service"]').forEach((button) => {
      button.classList.toggle("is-active", button.dataset.value === service);
    });
    const doctor = bookingSelectedDoctor(state.booking);
    if (doctor && !matchesService(doctor, service)) {
      state.booking.doctorId = "";
      state.booking.date = "";
      state.booking.doctorPinned = false;
      state.booking.doctorPickerOpen = false;
    }
    syncBookingDoctor(state.booking);
    const wrap = document.getElementById("booking-doctors");
    if (wrap) wrap.innerHTML = renderBookingDoctorSection(state.booking);
    refreshBookingDates();
    refreshBookingTopics();
    const demandHint = document.getElementById("booking-demand-hint");
    if (demandHint) demandHint.textContent = bookingDemandHint(service);
    syncBookingTopicField();
    const topicCoverage = bookingSelectedTopicCoverage(state.booking);
    if (topicCoverage && !topicCoverage.available) {
      showToast(
        `「${topicCoverage.topic.title}」履约地不含${regionText(
          state.booking.province,
          state.booking.city
        )}，请更换课题。`
      );
    }
  }

  function setBookingDoctor(value) {
    if (!state.booking) return;
    clearBookingValidation();
    const booking = state.booking;
    const currentDoctorId = booking.doctorId || "";
    const nextDoctorId = value && value !== currentDoctorId ? value : "";
    if (nextDoctorId) {
      const entry = bookingDoctorEntry(expertById(nextDoctorId), booking);
      if (!entry) {
        return showToast("该专家不符合当前医院、服务类型或时令课题，请重新选择。");
      }
      if (!entry.bookable) {
        return showToast(
          entry.status === "city"
            ? "该专家不覆盖当前活动城市，请更换专家或调整活动地点。"
            : "该专家当前暂无可约号源，请选择其他专家或发起提需。"
        );
      }
    }
    booking.doctorId = nextDoctorId;
    booking.date = "";
    booking.doctorPinned = Boolean(nextDoctorId);
    booking.doctorPickerOpen = !nextDoctorId;
    const expert = nextDoctorId ? expertById(nextDoctorId) : null;
    if (expert) {
      booking.tier = expert.tier;
      if (!matchesService(expert, booking.serviceType)) {
        booking.serviceType = expert.services[0] || "讲座";
        document.querySelectorAll('[data-action="booking-service"]').forEach((button) => {
          button.classList.toggle("is-active", button.dataset.value === booking.serviceType);
        });
      }
    }
    const wrap = document.getElementById("booking-doctors");
    if (wrap) wrap.innerHTML = renderBookingDoctorSection(booking);
    refreshBookingDates();
    refreshBookingTopics();
    if (currentDoctorId && !nextDoctorId) {
      showToast("已取消专家选择，请重新选择专家。");
    }
  }

  function chooseBookingDoctor(doctorId) {
    const booking = state.booking;
    clearBookingValidation();
    const expert = doctorId ? expertById(doctorId) : null;
    if (!booking || !expert) return;
    const entry = bookingDoctorEntry(expert, booking);
    if (!entry) {
      return showToast("该专家不符合当前医院、服务类型或时令课题，请重新选择。");
    }
    if (!entry.bookable) {
      return showToast(
        entry.status === "city"
          ? "该专家不覆盖当前活动城市，请更换专家或调整活动地点。"
          : "该专家当前暂无可约号源，请选择其他专家或发起提需。"
      );
    }
    const applied = () => {
      booking.doctorId = expert.id;
      booking.tier = expert.tier;
      booking.doctorPinned = true;
      booking.doctorPickerOpen = false;
      if (booking.date && !doctorAvailability(expert).dates.includes(booking.date)) {
        booking.date = "";
      }
    };
    if (!returnToOverlayType("booking", applied)) {
      applied();
      state.overlayStack = [];
      state.overlay = { type: "booking" };
      renderOverlay();
    }
    showToast(`已选择 ${expert.name}，可继续填写预约信息。`);
  }

  function previewBookingTopic(title) {
    const booking = state.booking;
    if (!booking) return;
    const { month, hospitalId, theme } = bookingTopicContext(booking);
    const topics = clientThemeTopics(
      theme,
      hospitalId,
      booking.province,
      booking.city,
      {
        topicId: booking.themeTopicId,
        title: booking.customTopic
      }
    );
    const index = topics.findIndex(
      (topic) => String(topic.title || "").trim() === String(title || "").trim()
    );
    if (index < 0) return showToast("该主题详情暂不可用。");
    openTheme(month, index, hospitalId);
  }

  function clearBookingTopicSelection() {
    const booking = state.booking;
    if (!booking) return;
    booking.customTopic = "";
    booking.themeMonth = 0;
    booking.themeTopicId = "";
    booking.themeCoverage = "";
    const input = document.querySelector('[data-booking-field="customTopic"]');
    if (input) input.value = "";
    syncBookingTopicField();
  }

  function chooseBookingTopic(month, topicIndex) {
    const booking = state.booking;
    const hospitalId =
      bookingHospital(booking)?.id ||
      state.overlay?.hospitalId ||
      bookingSelectedDoctor(booking)?.hospitalId ||
      "";
    const theme = hospitalTheme(hospitalId, Number(month));
    const topic = clientThemeTopics(
      theme,
      hospitalId,
      booking?.province || "",
      booking?.city || "",
      {
        topicId: booking?.themeTopicId || "",
        title: booking?.customTopic || ""
      }
    )[Number(topicIndex)];
    if (!booking || !topic) return showToast("该主题暂不可用。");
    if (Number(month) !== currentMonth()) {
      return showToast("非本月时令主题仅可浏览，不能预约。");
    }
    const coverage = themeTopicCoverage(topic, theme, hospitalId);
    if (!themeTopicCoversRegion(coverage, booking.province, booking.city)) {
      return showToast(
        `「${topic.title}」履约地不含${regionText(
          booking.province,
          booking.city
        )}，请更换课题或活动城市。`
      );
    }
    let doctorCleared = false;
    const applied = () => {
      booking.customTopic = topic.title;
      booking.themeMonth = Number(month);
      booking.themeTopicId = topic.id || "";
      booking.themeCoverage = coverage.label;
      doctorCleared = syncBookingDoctor(booking);
    };
    if (!returnToOverlayType("booking", applied)) {
      applied();
      state.overlayStack = [];
      state.overlay = { type: "booking" };
      renderOverlay();
    }
    showToast(
      `已选择主题「${topic.title}」${
        doctorCleared ? "，原专家不承接该课题，已取消专家选择" : ""
      }。`
    );
  }

  function selectBookingTopicByTitle(title) {
    const booking = state.booking;
    if (!booking || !title) return;
    clearBookingValidation();
    const active =
      Boolean(booking.themeMonth && booking.themeTopicId) &&
      String(booking.customTopic || "").trim() === String(title).trim() &&
      Number(booking.themeMonth) === currentMonth();
    if (active) {
      clearBookingTopicSelection();
      syncBookingDoctor(booking);
      refreshBookingDoctors();
      refreshBookingDates();
      refreshBookingTopics();
      syncBookingTopicField();
      showToast(`已取消主题「${title}」，时令主题为可选项。`);
      return;
    }
    const { month, hospitalId, theme } = bookingTopicContext(booking);
    const source = theme?.topics || [];
    const topic = source.find(
      (item) => String(item.title || "").trim() === String(title).trim()
    );
    if (!topic) return showToast("该主题暂不可用。");
    if (month !== currentMonth()) {
      return showToast("非本月时令主题仅可浏览，不能预约。");
    }
    const coverage = themeTopicCoverage(topic, theme, hospitalId);
    if (!themeTopicCoversRegion(coverage, booking.province, booking.city)) {
      return showToast(
        `「${topic.title}」履约地不含${regionText(
          booking.province,
          booking.city
        )}，请更换课题或活动城市。`
      );
    }
    booking.customTopic = topic.title;
    booking.themeMonth = month;
    booking.themeTopicId = topic.id || "";
    booking.themeCoverage = coverage.label;
    const input = document.querySelector('[data-booking-field="customTopic"]');
    if (input) input.value = topic.title;
    syncBookingTopicField();
    const doctorCleared = syncBookingDoctor(booking);
    refreshBookingDoctors();
    refreshBookingDates();
    refreshBookingTopics();
    showToast(
      `已选择主题「${topic.title}」${
        doctorCleared ? "，原专家不承接该课题，已取消专家选择" : ""
      }。`
    );
  }

  function setBookingDate(value) {
    if (!state.booking) return;
    clearBookingValidation();
    state.booking.date = value;
    document.querySelectorAll('[data-action="booking-date"]').forEach((button) => {
      button.classList.toggle("is-active", button.dataset.value === value);
    });
    refreshBookingTopics();
  }

  function refreshBookingForLocation() {
    if (!state.booking) return;
    syncBookingDoctor(state.booking);
    const wrap = document.getElementById("booking-doctors");
    if (wrap) wrap.innerHTML = renderBookingDoctorSection(state.booking);
    refreshBookingDates();
    refreshBookingTopics();
  }

  function setBookingProvince(value) {
    if (!state.booking) return;
    clearBookingValidation();
    state.booking.province = value;
    state.booking.city = (state.chinaCities?.[value] || [value])[0];
    const citySelect = document.querySelector("[data-booking-city]");
    if (citySelect) citySelect.innerHTML = renderCityOptions(value, state.booking.city);
    refreshBookingForLocation();
  }

  function bookingIssue(key) {
    return (
      state.booking?.validationErrors?.find((issue) => issue.key === key) || null
    );
  }

  function bookingErrorClass(key) {
    return bookingIssue(key) ? "is-invalid" : "";
  }

  function bookingInputErrorClass(key) {
    return bookingIssue(key) ? "is-invalid" : "";
  }

  function bookingFieldErrorMarkup(key) {
    const issue = bookingIssue(key);
    return issue
      ? `<span class="field-error-text">${icon("alert", 11)} ${esc(
          issue.message
        )}</span>`
      : "";
  }

  function clearBookingValidation() {
    if (state.booking) state.booking.validationErrors = [];
    document.querySelector(".booking-validation-summary")?.remove();
    document
      .querySelectorAll(".booking-flow .is-invalid")
      .forEach((element) => element.classList.remove("is-invalid"));
    document
      .querySelectorAll(".booking-flow .field-error-text")
      .forEach((element) => element.remove());
  }

  function bookingValidationIssues() {
    const booking = state.booking;
    if (!booking) {
      return [{ key: "expired", message: "预约信息已失效，请重新发起。", focus: "service" }];
    }
    const issues = [];
    const add = (key, message, focus = key) =>
      issues.push({ key, message, focus });
    if (!booking.serviceType) add("service", "请选择服务类型。");
    if (!booking.doctorId) {
      add(
        "doctor",
        "请选择专家：需选择一位当前可预约专家；没有合适专家时，请点击下方“发起提需”。"
      );
    } else {
      const expert = expertById(booking.doctorId);
      if (!expert) {
        add("doctor", "所选专家信息已失效，请重新选择。");
      } else {
        const doctorEntry = bookingDoctorEntry(expert, booking);
        if (!doctorEntry) {
          add(
            "doctor",
            bookingThemeContext(booking).active
              ? "所选专家不符合当前时令主题或课题，请重新选择专家。"
              : "所选专家不提供当前服务类型或不在当前医院，请重新选择。"
          );
        } else if (!doctorEntry.bookable) {
          add(
            "doctor",
            doctorEntry.status === "city"
              ? "所选专家不覆盖当前活动城市，请更换专家或调整活动地点。"
              : "所选专家当前暂无可约号源，请选择其他专家或发起提需。"
          );
        }
        if (!booking.date) {
          add("date", "请选择期望日期。");
        } else if (!doctorAvailability(expert).dates.includes(booking.date)) {
          add("date", "该日期不在专家当前可约范围内，请重新选择。");
        } else if (dayRemaining(expert.id, booking.date) <= 0) {
          add("date", "该日期号源已约满，请选择其他日期。");
        }
      }
    }
    if (!booking.province || !booking.city) {
      add("address", "请选择活动省市。");
    }
    if (!booking.address.trim()) {
      add("address", "请填写活动详细地址。");
    }
    if (!booking.customTopic.trim()) {
      add("topic", "请选择时令主题或填写活动主题。");
    }
    if (!booking.audience.trim()) {
      add("audience", "请填写参与人群。");
    }
    if (!String(booking.headcount || "").trim()) {
      add("headcount", "请填写预计人数。");
    }
    if (!booking.contactName.trim()) {
      add("contactName", "请填写联系人姓名。");
    }
    if (!/^1\d{10}$/.test(booking.contactPhone || "")) {
      add("contactPhone", "请填写正确的 11 位联系电话。");
    }
    if (
      String(booking.headcount || "").trim() &&
      (!Number.isInteger(Number(booking.headcount)) || Number(booking.headcount) <= 0)
    ) {
      add("headcount", "预计人数需填写大于 0 的整数。");
    }
    const selectedTopic = bookingSelectedTopicCoverage(booking);
    if (selectedTopic && !selectedTopic.available) {
      add(
        "topics",
        `所选时令主题「${selectedTopic.topic.title}」履约地不含${regionText(
          booking.province,
          booking.city
        )}，请更换课题或活动城市。`
      );
    }
    if (
      selectedTopic?.topic?.expertId &&
      booking.doctorId &&
      String(selectedTopic.topic.expertId) !== String(booking.doctorId)
    ) {
      add("topics", "所选时令主题不属于当前专家，请重新选择主题或专家。");
    }
    return issues;
  }

  function bookingErrorFocusSelector(focus) {
    const map = {
      service: '[data-action="booking-service"]',
      doctor: '[data-booking-error="doctor"]',
      date: "#booking-dates",
      address: '[data-booking-field="address"]',
      topic: '[data-booking-field="customTopic"]',
      audience: '[data-booking-field="audience"]',
      contactName: '[data-booking-field="contactName"]',
      contactPhone: '[data-booking-field="contactPhone"]',
      headcount: '[data-booking-field="headcount"]',
      topics: "#booking-topics",
      agree: '[data-booking-agree]'
    };
    return map[focus] || ".booking-validation-summary";
  }

  function scrollToBookingIssue(focus, { focusField = false } = {}) {
    window.requestAnimationFrame(() => {
      const target = overlayRoot.querySelector(bookingErrorFocusSelector(focus));
      target?.scrollIntoView({ block: "center", behavior: "smooth" });
      if (
        focusField &&
        target &&
        /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName) &&
        !target.disabled
      ) {
        target.focus({ preventScroll: true });
      }
    });
  }

  function presentBookingIssues(issues, { step = 1 } = {}) {
    if (!state.booking) return;
    state.booking.step = step;
    state.booking.validationErrors = issues;
    renderOverlay();
    const first = issues[0];
    scrollToBookingIssue(first?.focus || "service");
    showToast(
      issues.length > 1
        ? `请先完善 ${issues.length} 项信息：${first?.message || "请检查标红字段"}`
        : first?.message || "请完善预约信息。"
    );
  }

  function validateBookingStepOne() {
    return bookingValidationIssues()[0]?.message || "";
  }

  function bookingNext() {
    const issues = bookingValidationIssues();
    if (issues.length) return presentBookingIssues(issues, { step: 1 });
    state.booking.step = 2;
    state.booking.validationErrors = [];
    renderOverlay();
    overlayRoot.querySelector(".flow__body")?.scrollTo(0, 0);
  }

  async function withBookingLock(task) {
    if (navigator.locks?.request) {
      return navigator.locks.request("pkuih_h6_booking", { mode: "exclusive" }, task);
    }
    const key = STORAGE.bookingLock;
    const token = requestToken("lock");
    const startedAt = Date.now();
    while (Date.now() - startedAt < 4000) {
      let current = null;
      try {
        current = JSON.parse(localStorage.getItem(key) || "null");
      } catch {
        current = null;
      }
      if (!current || Date.now() - Number(current.at || 0) > 5000) {
        try {
          localStorage.setItem(
            key,
            JSON.stringify({ token, at: Date.now(), tab: requestToken("tab") })
          );
        } catch {
          return task();
        }
        let verified = null;
        try {
          verified = JSON.parse(localStorage.getItem(key) || "null");
        } catch {
          verified = null;
        }
        if (verified?.token === token) {
          try {
            return await task();
          } finally {
            try {
              const latest = JSON.parse(localStorage.getItem(key) || "null");
              if (latest?.token === token) localStorage.removeItem(key);
            } catch {
              localStorage.removeItem(key);
            }
          }
        }
      }
      await new Promise((resolve) =>
        window.setTimeout(resolve, 45 + Math.random() * 55)
      );
    }
    throw new Error("号源正在被其他终端更新，请稍后重试。");
  }

  async function commitBookingTransaction(appointment) {
    return withBookingLock(async () => {
      appointmentsCache = null;
      slotsCache = null;
      const items = readJSON(STORAGE.appointments, []);
      const slots = readJSON(STORAGE.slots, {});
      const capacity = Number(slots?.[appointment.doctorId]?.[appointment.date] || 0);
      const booked = items.filter(
        (item) =>
          item.doctorId === appointment.doctorId &&
          item.date === appointment.date &&
          item.status !== "cancelled"
      ).length;
      const duplicate = items.find(
        (item) =>
          appointment.clientRequestId &&
          item.clientRequestId === appointment.clientRequestId
      );
      if (duplicate) {
        return { duplicate: true, appointment: duplicate };
      }
      if (items.some((item) => item.id === appointment.id)) {
        return { error: "id-collision" };
      }
      if (!capacity || booked >= capacity) {
        return { error: "slot-full", booked, capacity };
      }
      const nextAppointment = {
        ...appointment,
        slotKey: `${appointment.doctorId}|${appointment.date}`,
        slotSequence: booked + 1,
        slotCapacityAtBooking: capacity,
        inventoryCheckedAt: new Date().toISOString()
      };
      const next = [...items, nextAppointment];
      if (!writeJSON(STORAGE.appointments, next)) {
        return { error: "storage" };
      }
      appointmentsCache = next;
      slotsCache = slots;
      return { appointment: nextAppointment };
    });
  }

  async function submitBooking() {
    const booking = state.booking;
    if (!booking) return;
    if (state.bookingSubmitting) return;
    if (!state.session) {
      showToast("请先登录后再提交预约。");
      startLogin({ type: "booking" });
      return;
    }
    const issues = bookingValidationIssues();
    if (issues.length) {
      presentBookingIssues(issues, { step: 1 });
      return;
    }
    if (!booking.agree) {
      presentBookingIssues(
        [
          {
            key: "agree",
            message: "请勾选“已确认以上信息”后再提交。",
            focus: "agree"
          }
        ],
        { step: 2 }
      );
      return;
    }
    const expert = bookingSelectedDoctor(booking);
    const hospital = bookingHospital(booking);
    const now = new Date().toISOString();
    const id = idTimestamp("BD");
    const appointment = {
      id,
      ownerPhone: state.session.phone,
      orgName: state.session.orgName,
      orgType: state.session.orgType,
      contactName: booking.contactName || state.session.name,
      contactTitle: state.session.title || "",
      phone: booking.contactPhone || state.session.phone,
      province: booking.province,
      city: booking.city,
      address: booking.address.trim(),
      venue: booking.venue.trim(),
      serviceType: booking.serviceType,
      doctorId: expert?.id || "",
      doctorName: expert?.name || "",
      tier: expert?.tier || booking.tier,
      hospitalId: hospital?.id || "pkuih",
      date: booking.date,
      topic: booking.customTopic.trim(),
      themeMonth: booking.themeMonth || "",
      themeTopicId: booking.themeTopicId || "",
      themeCoverage: booking.themeCoverage || "",
      audience: booking.audience.trim(),
      headcount: booking.headcount,
      note: booking.note.trim(),
      status: "pending",
      assignedStaff: null,
      plan: null,
      planHistory: [],
      internalNote: "",
      feedback: "",
      email: state.session.email || "",
      orgProfileSnapshot: {
        name: state.session.name || "",
        orgName: state.session.orgName || "",
        orgType: state.session.orgType || "",
        title: state.session.title || "",
        contactPhone: state.session.contactPhone || state.session.phone || "",
        email: state.session.email || "",
        province: state.session.province || "",
        city: state.session.city || "",
        capturedAt: now,
        source: "booking"
      },
      demandId: booking.demandId || "",
      clientRequestId: booking.requestId || requestToken("booking"),
      createdAt: now,
      updatedAt: now
    };
    state.bookingSubmitting = true;
    renderOverlay();
    let result;
    try {
      result = await commitBookingTransaction(appointment);
    } catch (error) {
      state.bookingSubmitting = false;
      renderOverlay();
      return showToast(error.message || "提交失败，请稍后重试。");
    }
    state.bookingSubmitting = false;
    if (result.error) {
      const messages = {
        "slot-full": "该日期号源刚被其他终端约满，请重新选择日期或专家。",
        "id-collision": "预约编号冲突，请重新提交。",
        storage: "浏览器存储空间不足，预约未写入，请清理后重试。"
      };
      if (result.error === "slot-full" && state.booking) {
        presentBookingIssues(
          [
            {
              key: "date",
              message: messages[result.error],
              focus: "date"
            }
          ],
          { step: 1 }
        );
      } else {
        renderOverlay();
        showToast(messages[result.error] || "提交失败，请稍后重试。");
      }
      return;
    }
    const saved = result.appointment || appointment;
    if (booking.demandId) {
      const demand = demandById(booking.demandId);
      if (demand) {
        updateDemand(demand.id, {
          status: demand.status === "pending" ? "contacted" : demand.status,
          convertedAppointmentId: saved.id,
          convertedAt: new Date().toISOString()
        });
      }
    }
    state.booking = null;
    state.overlayStack = [];
    state.overlay = { type: "appointment", appointmentId: saved.id, action: "success" };
    renderOverlay();
    renderApp();
  }

  /* =========================================================
     Appointments (client)
     ========================================================= */
  function appointmentStatus(appointment) {
    return STATUS[appointment?.status] || STATUS.pending;
  }

  function appointmentServiceDate(appointment) {
    return appointment?.plan?.date || appointment?.date || "";
  }

  function appointmentDaysUntil(appointment) {
    const date = parseDate(appointmentServiceDate(appointment));
    if (!date) return null;
    return Math.ceil(
      (date.getTime() - startOfDay().getTime()) / (24 * 60 * 60 * 1000)
    );
  }

  function appointmentChangePolicy(appointment) {
    if (!appointment) {
      return {
        canModify: false,
        canCancel: false,
        canEditLocation: false,
        days: null,
        remainingDays: null,
        cycleDays: 0,
        cancelLeadDays: 7,
        usedChanges: 0,
        modifyReason: "预约记录不存在。",
        cancelReason: "预约记录不存在。",
        locationReason: "预约记录不存在。",
        reason: "预约记录不存在。"
      };
    }
    const expert = appointment.doctorId ? expertById(appointment.doctorId) : null;
    const cycleDays = Math.max(
      7,
      Number(expert?.leadDays) || TIERS[appointment.tier]?.leadDays || 7
    );
    const days = appointmentDaysUntil(appointment);
    const usedChanges = Number(appointment.clientChangeCount) || 0;
    const accepted = Boolean(appointment.assignedStaff || appointment.acceptedAt);
    const terminal = ["completed", "cancelled"].includes(appointment.status);
    const past = days !== null && days < 0;
    const changeLimit = cycleDays >= 30 ? 0 : 1;
    const cancelLeadDays = appointment.tier === "elite" ? 30 : 7;
    let baseReason = "";
    if (terminal) {
      baseReason =
        appointment.status === "cancelled"
          ? "预约已取消，不能再修改。"
          : "活动已完成归档，不能再修改或取消。";
    } else if (past) {
      baseReason = "活动日期已过，不能再修改或取消。";
    }
    let modifyReason = baseReason;
    let cancelReason = baseReason;
    if (!baseReason && days !== null && days < 7) {
      modifyReason = `距活动不足 7 天（剩余 ${Math.max(0, days)} 天），已锁定修改。`;
    }
    if (!baseReason && days !== null && days < cancelLeadDays) {
      cancelReason =
        appointment.tier === "elite"
          ? `大咖医生预约需提前至少 30 天取消，当前剩余 ${Math.max(
              0,
              days
            )} 天，已锁定取消。`
          : `主任专家和专业医生预约需提前至少 7 天取消，当前剩余 ${Math.max(
              0,
              days
            )} 天，已锁定取消。`;
    }
    if (!modifyReason && cycleDays >= 30 && accepted) {
      modifyReason =
        "该预约属于 30 天预约周期，院方接单后机构侧不可修改；如需调整请联系项目对接人。";
    }
    if (!modifyReason && changeLimit && usedChanges >= changeLimit) {
      modifyReason =
        "该预约属于 14 天预约周期，机构侧已使用 1 次修改机会，不能再次修改。";
    }
    const modifiableStatuses = ["review", "revision", "confirmed"];
    const canModify =
      !modifyReason && modifiableStatuses.includes(appointment.status);
    const canCancel = !cancelReason && !terminal;
    const locationStatuses = ["pending", "planning", "review", "revision", "confirmed"];
    let locationReason = baseReason;
    if (
      !locationReason &&
      ["review", "revision", "confirmed"].includes(appointment.status) &&
      days !== null &&
      days < 7
    ) {
      locationReason =
        modifyReason ||
        `距活动不足 7 天（剩余 ${Math.max(0, days)} 天），活动地点已锁定。`;
    }
    if (
      !locationReason &&
      appointment.status === "confirmed" &&
      !canModify
    ) {
      locationReason = modifyReason || "当前阶段不可修改活动地点。";
    }
    const canEditLocation =
      !locationReason &&
      locationStatuses.includes(appointment.status) &&
      (appointment.status !== "confirmed" || canModify);
    return {
      canModify,
      canCancel,
      canEditLocation,
      days,
      remainingDays: days,
      cycleDays,
      cancelLeadDays,
      usedChanges,
      changeLimit,
      accepted,
      modifyReason,
      cancelReason,
      locationReason,
      reason: canModify ? cancelReason : modifyReason
    };
  }

  function statusPill(status) {
    const meta = STATUS[status] || STATUS.pending;
    return `<span class="status-pill ${meta.cls}">${esc(meta.label)}</span>`;
  }

  function appointmentAssignee(appointment) {
    return appointment?.assignedStaff || null;
  }

  function assigneeMarkup(staff) {
    if (!staff) return '<span class="muted">院方接单后显示项目对接人</span>';
    return `<strong>${esc(staff.name)}</strong> · ${phoneLink(staff.phone, staff.phone)}`;
  }

  function appointmentLocationText(appointment) {
    if (!appointment) return "";
    return formatAddress(
      appointment.province,
      appointment.city,
      appointment.address,
      appointment.venue
    );
  }

  function appointmentThemeTopicFor(appointment, serviceType = "") {
    const service = normalizeService(
      serviceType || appointment?.plan?.serviceType || appointment?.serviceType
    );
    const month = Number(appointment?.themeMonth || appointment?.plan?.themeMonth || 0);
    if (service !== "讲座" || !month || !appointment?.hospitalId) return null;
    const theme = hospitalTheme(appointment.hospitalId, month);
    if (!theme) return null;
    const topicId = appointment.themeTopicId || appointment.plan?.themeTopicId || "";
    return (
      (theme.topics || []).find((topic) =>
        topicId
          ? String(topic.id || "") === String(topicId)
          : String(topic.title || "").trim() ===
            String(appointment.plan?.topic || appointment.topic || "").trim()
      ) || null
    );
  }

  function appointmentAssignmentError({
    appointment,
    expert,
    serviceType,
    date,
    province,
    city,
    ignoreId = ""
  }) {
    if (!appointment) return "预约信息已失效。";
    if (!expert) return "专家为必选项，请选择出讲专家。";
    if (expert.active === false) return "所选专家已停止展示，请重新选择。";
    if (expert.hospitalId !== appointment.hospitalId) {
      return "出讲专家必须属于本次履约医院。";
    }
    if (!matchesService(expert, serviceType)) {
      return `所选专家不提供「${serviceLabel(serviceType)}」服务，请重新选择。`;
    }
    const topic = appointmentThemeTopicFor(appointment, serviceType);
    if (topic) {
      if (topic.expertId && String(topic.expertId) !== String(expert.id)) {
        return "出讲专家与机构已选的时令课题主讲人不一致，请重新选择。";
      }
      const theme = hospitalTheme(appointment.hospitalId, Number(topic.month || appointment.themeMonth));
      const coverage = themeTopicCoverage(topic, theme, appointment.hospitalId);
      if (!themeTopicCoversRegion(coverage, province, city)) {
        return `该时令课题履约地不含${regionText(province, city)}，请先与机构确认调整。`;
      }
    } else if (!expertCoversRegion(expert, province, city)) {
      return `${expert.name} 的日常履约范围不含${regionText(province, city)}。`;
    }
    if (!date) return "请选择活动日期。";
    if (date < todayIso()) return "活动日期不能早于今天。";
    const availability = doctorAvailability(expert, ignoreId);
    if (!availability.dates.includes(date)) {
      return `${expert.name} 在 ${formatDateCN(date, true)} 不在可预约周期或没有可用号源。`;
    }
    if (dayRemaining(expert.id, date, ignoreId) <= 0) {
      return `${expert.name} 在 ${formatDateCN(date, true)} 已无可约号源，请调整日期或专家。`;
    }
    return "";
  }

  function finalPlanError(appointment) {
    if (!appointment) return "预约信息已失效。";
    const plan = appointment.plan;
    if (!plan) return "院方尚未提交活动方案。";
    const expertId = plan.speakerId || appointment.doctorId;
    const expert = expertId ? expertById(expertId) : null;
    const serviceType = plan.serviceType || appointment.serviceType;
    const date = plan.date || appointment.date;
    if (!plan.topic?.trim()) return "方案缺少活动主题，请联系项目对接人。";
    if (!(appointment.address || "").trim()) return "预约缺少活动详细地址，请先补充活动地点。";
    if (normalizeService(serviceType) !== normalizeService(appointment.serviceType)) {
      return "方案服务类型与预约记录不一致，请联系项目对接人更新。";
    }
    if (date !== appointment.date) {
      return "方案日期与预约记录不一致，请联系项目对接人更新。";
    }
    return appointmentAssignmentError({
      appointment,
      expert,
      serviceType,
      date,
      province: appointment.province,
      city: appointment.city,
      ignoreId: appointment.id
    });
  }

  function topicOf(appointment) {
    const month = parseDate(appointment?.date)?.getMonth() + 1;
    const theme = hospitalTheme(appointment?.hospitalId, month);
    return (
      appointment?.plan?.topic ||
      appointment?.topic ||
      theme?.topics?.[0]?.title ||
      seasonalOf(month)?.topics?.[0]?.title ||
      "企业健康活动"
    );
  }

  function appointmentFilterList() {
    return [
      { id: "all", label: "全部" },
      { id: "pending", label: "待接单" },
      { id: "planning", label: "方案制作" },
      { id: "review", label: "待确认" },
      { id: "revision", label: "待修改" },
      { id: "confirmed", label: "已确认" },
      { id: "completed", label: "已完成" }
    ];
  }

  function renderAppointmentCard(appointment) {
    const expert = appointment.doctorId ? expertById(appointment.doctorId) : null;
    const hospital = hospitalById(appointment.hospitalId);
    const assignee = appointmentAssignee(appointment);
    return `
      <article class="record-card" role="button" tabindex="0" data-action="open-appointment"
        data-appointment-id="${esc(appointment.id)}">
        <div class="record-card__top">
          ${statusPill(appointment.status)}
          <span class="record-card__date">${esc(formatDateCN(appointment.date, true))}</span>
        </div>
        <h3>${esc(topicOf(appointment))}</h3>
        <div class="record-card__meta">
          <span>${icon("briefcase", 12)} ${esc(serviceLabel(appointment.serviceType))}</span>
          <span>${icon("experts", 12)} ${esc(
            expert ? expert.name : appointment.doctorName || "专家待确认"
          )}</span>
          <span>${icon("building", 12)} <strong class="hospital-name">${esc(
            hospital?.short || hospital?.name || ""
          )}</strong></span>
        </div>
        <div class="record-card__assignee">
          ${icon("user", 12)}
          ${
            assignee
              ? `项目对接人 <strong>${esc(assignee.name)}</strong> · ${phoneLink(assignee.phone, assignee.phone)}`
              : appointmentStatus(appointment).help
          }
        </div>
        ${
          appointment.status === "review"
            ? `<div class="record-card__alert">${icon("alert", 13)} 院方方案待确认，请查看并确认</div>`
            : appointment.status === "revision"
            ? `<div class="record-card__waiting">${icon("clock", 13)} 已提交修改意见，等待院方更新方案</div>`
            : appointment.plan
            ? `<div class="record-card__plan">${icon("clipboard", 13)} 院方已填写活动方案</div>`
            : `<div class="record-card__waiting">${icon("clock", 13)} ${esc(
                appointmentStatus(appointment).help
              )}</div>`
        }
        <div class="record-card__foot">
          <span>${esc(appointment.id)}</span>
          <span>查看详情 ${icon("chevronRight", 12)}</span>
        </div>
      </article>
    `;
  }

  function renderAppointmentList() {
    const all = appointmentsForUser(state.session.phone);
    const list =
      state.appointmentFilter === "all"
        ? all
        : all.filter((item) => item.status === state.appointmentFilter);
    if (!list.length) {
      return `
        <div class="empty-state">
          <span class="empty-state__icon">${icon("calendar", 26)}</span>
          <h3>${all.length ? "当前筛选下没有预约" : "还没有活动预约"}</h3>
          <p>${all.length ? "切换状态查看其他预约。" : "从一场贴合企业人群的健康活动开始。"}</p>
          ${
            all.length
              ? ""
              : `<button class="btn btn--primary btn--sm" type="button" data-action="open-booking">发起活动预约</button>`
          }
        </div>
      `;
    }
    return `<div class="record-list">${list.map(renderAppointmentCard).join("")}</div>`;
  }

  function renderDemandCard(demand) {
    const targetName = demandTargetName(demand);
    const isGroup = demand.targetType === "group";
    const meta = DEMAND_STATUS[demand.status] || DEMAND_STATUS.pending;
    return `
      <article class="record-card" role="button" tabindex="0" data-action="open-demand-detail"
        data-demand-id="${esc(demand.id)}">
        <div class="record-card__top">
          <span class="status-pill ${meta.cls}">${esc(meta.label)}</span>
          <span class="record-card__date">${esc(formatDateCN(demand.createdAt.slice(0, 10)))}</span>
        </div>
        <h3>${esc(demand.topic || "专家资源提需")}</h3>
        <div class="record-card__meta">
          <span>${icon("briefcase", 12)} ${esc(serviceLabel(demand.serviceType))}</span>
          <span>${icon("building", 12)} ${esc(targetName)}</span>
          <span>${icon("users", 12)} ${esc(demand.audience || "待沟通")}</span>
        </div>
        <div class="record-card__assignee">
          ${icon("phone", 12)}
          ${
            demand.assignedStaff
              ? `${isGroup ? "集团对接人" : "院方对接人"} <strong>${esc(
                  demand.assignedStaff.name
                )}</strong> · ${phoneLink(
                  demand.assignedStaff.phone,
                  demand.assignedStaff.phone
                )}`
              : `提交后由${isGroup ? "集团企康办管理员" : "医院运营"}电话联系`
          }
        </div>
        <div class="record-card__foot">
          <span>${esc(demand.id)}</span>
          <span>查看详情 ${icon("chevronRight", 12)}</span>
        </div>
      </article>
    `;
  }

  function renderDemandList() {
    const all = demandsForUser(state.session.phone);
    const list =
      state.demandFilter === "all"
        ? all
        : all.filter((item) => item.status === state.demandFilter);
    if (!list.length) {
      return `
        <div class="empty-state">
          <span class="empty-state__icon">${icon("sparkles", 26)}</span>
          <h3>${all.length ? "当前筛选下没有提需" : "还没有专家提需"}</h3>
          <p>找不到合适的专家时，提交活动需求，由医院运营电话沟通匹配。</p>
          <button class="btn btn--primary btn--sm" type="button" data-action="open-demand">发起提需</button>
        </div>
      `;
    }
    return `<div class="record-list">${list.map(renderDemandCard).join("")}</div>`;
  }

  function renderAppointmentsPage() {
    if (!state.session) {
      return `
        <div class="screen">
          <header class="page-head">
            <span class="eyebrow"><i></i> My Activities</span>
            <h1>我的预约</h1>
            <p>登录后查看预约进度、院方方案与项目对接人。</p>
          </header>
          <div class="login-required">
            <span class="login-required__icon">${icon("lock", 28)}</span>
            <h2>登录企业账号</h2>
            <p>登录后可提交预约与提需、确认院方方案，并在下次打开时保持登录状态。</p>
            <button class="btn btn--primary btn--block" type="button" data-action="start-login" data-pending="appointments">
              登录 / 注册 ${icon("arrowRight", 15)}
            </button>
          </div>
        </div>
      `;
    }
    const appointments = appointmentsForUser(state.session.phone);
    const demands = demandsForUser(state.session.phone);
    return `
      <div class="screen">
        <header class="page-head page-head--row">
          <div>
            <span class="eyebrow"><i></i> My Activities</span>
            <h1>预约与提需</h1>
            <p>${appointments.length} 条预约 · ${demands.length} 条提需</p>
          </div>
          <button class="btn btn--primary btn--sm" type="button" data-action="open-booking">
            ${icon("plus", 14)} 新建
          </button>
        </header>
        <div class="segmented segmented--records">
          <button class="${state.clientRecordTab === "bookings" ? "is-active" : ""}" type="button"
            data-action="record-tab" data-value="bookings">活动预约 <span>${appointments.length}</span></button>
          <button class="${state.clientRecordTab === "demands" ? "is-active" : ""}" type="button"
            data-action="record-tab" data-value="demands">专家提需 <span>${demands.length}</span></button>
        </div>
        <div id="record-panel">${renderRecordPanel()}</div>
      </div>
    `;
  }

  function renderRecordPanel() {
    if (state.clientRecordTab === "bookings") {
      return `<div class="filter-scroll filter-scroll--page">
          ${appointmentFilterList()
            .map(
              (filter) =>
                `<button class="chip ${
                  state.appointmentFilter === filter.id ? "is-active" : ""
                }" type="button" data-action="appointment-filter" data-value="${filter.id}">${filter.label}</button>`
            )
            .join("")}
        </div>
        <div id="appointment-list">${renderAppointmentList()}</div>`;
    }
    return `<div id="demand-list">${renderDemandList()}</div>`;
  }

  function refreshRecordPanel() {
    const panel = document.getElementById("record-panel");
    if (panel) panel.innerHTML = renderRecordPanel();
    const appointments = appointmentsForUser(state.session?.phone || "");
    const demands = demandsForUser(state.session?.phone || "");
    document.querySelectorAll('[data-action="record-tab"]').forEach((button) => {
      button.classList.toggle("is-active", button.dataset.value === state.clientRecordTab);
      const count = button.querySelector("span");
      if (count) {
        count.textContent = String(
          button.dataset.value === "bookings" ? appointments.length : demands.length
        );
      }
    });
  }

  function refreshAppointmentList() {
    const wrap = document.getElementById("appointment-list");
    if (wrap) wrap.innerHTML = renderAppointmentList();
    document.querySelectorAll('[data-action="appointment-filter"]').forEach((button) => {
      button.classList.toggle("is-active", button.dataset.value === state.appointmentFilter);
    });
  }

  function refreshDemandList() {
    const wrap = document.getElementById("demand-list");
    if (wrap) wrap.innerHTML = renderDemandList();
  }

  function appointmentTimeline(appointment) {
    const status = appointment.status;
    const rank = {
      pending: 1,
      planning: 3,
      review: 4,
      revision: 4,
      confirmed: 5,
      completed: 6,
      cancelled: 0
    }[status] || 1;
    const steps = [
      ["提交预约", "已提交活动需求"],
      ["院方接单", appointment.assignedStaff ? `${appointment.assignedStaff.name} 已接单` : "等待医院运营接单"],
      ["院方方案", appointment.plan ? "院方已填写活动方案" : "等待院方填写"],
      ["机构确认", status === "confirmed" || status === "completed" ? "已确认最终预约" : "待机构确认"],
      ["活动完成", status === "completed" ? "活动已归档" : "待活动执行"]
    ];
    if (status === "cancelled") {
      return `<div class="cancel-banner">${icon("alert", 15)} 该预约已取消</div>`;
    }
    return `
      <div class="timeline">
        ${steps
          .map(
            ([title, desc], index) => `
              <div class="timeline__item ${
                index + 1 < rank ? "is-done" : index + 1 === rank ? "is-current" : ""
              }">
                <span class="timeline__dot">${index + 1 < rank ? icon("check", 10) : index + 1}</span>
                <div><strong>${title}</strong><small>${esc(desc)}</small></div>
              </div>
            `
          )
          .join("")}
      </div>
    `;
  }

  function renderPlanCard(appointment) {
    const plan = appointment.plan;
    if (!plan) {
      return `
        <section class="plan-card plan-card--empty">
          <h3>${icon("clipboard", 15)} 活动方案</h3>
          <p>${
            appointment.assignedStaff
              ? "院方已接单，正在填写活动主题、时间、地点、课题大纲与项目组成员。"
              : "院方接单后，将在这里填写完整活动方案并发送给机构确认。"
          }</p>
        </section>
      `;
    }
    return `
      <section class="plan-card">
        <div class="plan-card__head">
          <h3>${icon("clipboard", 15)} 院方活动方案</h3>
          <span>${esc(formatDateTime(plan.updatedAt))} 更新</span>
        </div>
        <div class="plan-row"><span>活动主题</span><strong>${esc(plan.topic || "待确认")}</strong></div>
        <div class="plan-row"><span>出讲专家</span><strong>${esc(plan.speaker || "待确认")}</strong></div>
        <div class="plan-row"><span>服务类型</span><strong>${esc(
          serviceLabel(plan.serviceType || appointment.serviceType)
        )}</strong></div>
        <div class="plan-row"><span>活动时间</span><strong>${esc(
          `${formatDateCN(plan.date || appointment.date, true)} ${plan.time || ""}`
        )}</strong></div>
        <div class="plan-row"><span>活动地点</span><strong>${esc(
          formatAddress(
            appointment.province || plan.province,
            appointment.city || plan.city,
            appointment.address || plan.address,
            appointment.venue || plan.venue
          )
        )}</strong></div>
        ${
          plan.outline
            ? `<div class="plan-block"><span>课题大纲</span><p>${esc(plan.outline)}</p></div>`
            : ""
        }
        ${
          plan.agenda
            ? `<div class="plan-block"><span>活动流程</span><p>${esc(plan.agenda)}</p></div>`
            : ""
        }
        ${
          plan.team
            ? `<div class="plan-block"><span>项目组成员</span><p>${esc(plan.team)}</p></div>`
            : ""
        }
        ${
          plan.message
            ? `<div class="plan-message">${esc(plan.message)}</div>`
            : ""
        }
        ${
          plan.pdf
            ? `<button class="plan-pdf-link" type="button" data-action="open-plan-pdf"
                data-appointment-id="${esc(appointment.id)}">
                <span class="plan-pdf-link__icon">${icon("clipboard", 16)}</span>
                <span class="plan-pdf-link__meta">
                  <strong>方案附件 · ${esc(plan.pdf.name || "活动方案.pdf")}</strong>
                  <small>${esc(formatFileSize(plan.pdf.size))} · ${
                    planAttachmentKind(plan.pdf) === "pdf"
                      ? "点击在线预览"
                      : "点击查看或下载"
                  }</small>
                </span>
                ${icon("chevronRight", 14)}
              </button>`
            : ""
        }
      </section>
    `;
  }

  function renderAppointmentSheet() {
    const appointment = appointmentById(state.overlay?.appointmentId);
    if (!appointment) return "";
    const expert = appointment.doctorId ? expertById(appointment.doctorId) : null;
    const hospital = hospitalById(appointment.hospitalId);
    const assignee = appointmentAssignee(appointment);
    const status = appointmentStatus(appointment);
    const action = state.overlay?.action || "";
    const policy = appointmentChangePolicy(appointment);
    const profileDiff = appointmentProfileDiff(appointment);
    const profileSnapshot = appointmentOrgSnapshot(appointment);
    return `
      <div class="sheet-backdrop" data-action="close-overlay"></div>
      <section class="sheet record-sheet" role="dialog" aria-modal="true" aria-label="预约详情">
        <div class="sheet__grabber"></div>
        <div class="sheet__bar">
          <div><h2>预约详情</h2><p>${esc(appointment.id)}</p></div>
          <button class="sheet__close" type="button" data-action="close-overlay" aria-label="关闭">
            ${icon("close", 15)}
          </button>
        </div>
        <div class="sheet__body">
          <div class="record-sheet__body">
            ${
              action === "success"
                ? `<div class="success-banner">${icon("checkCircle", 22)}<div><strong>预约已提交</strong><p>院方接单后会显示项目对接人，请留意方案状态。</p></div></div>`
                : ""
            }
            <div class="record-head">
              <div>
                <span class="record-head__tag">${esc(serviceLabel(appointment.serviceType))} · ${esc(
                  hospital?.name || ""
                )}</span>
                <h1>${esc(topicOf(appointment))}</h1>
                <p>${esc(formatDateCN(appointment.date, true))} · ${esc(
                  expert ? expert.name : appointment.doctorName || "专家待确认"
                )}</p>
              </div>
              ${statusPill(appointment.status)}
            </div>
            ${appointmentTimeline(appointment)}
            <section class="info-card">
              <div class="info-row"><span>预约编号</span><strong>${esc(appointment.id)}</strong></div>
              <div class="info-row"><span>机构</span><strong>${esc(appointment.orgName)}</strong></div>
              <div class="info-row"><span>联系人</span><strong>${esc(
                appointment.contactName
              )} · ${phoneLink(appointment.phone, appointment.phone)}</strong></div>
              ${
                appointment.contactTitle || appointment.email
                  ? `<div class="info-row"><span>通知资料</span><strong>${esc(
                      appointment.contactTitle || "职务未填写"
                    )}${appointment.email ? ` · ${esc(appointment.email)}` : ""}</strong></div>`
                  : ""
              }
              <div class="info-row"><span>活动地址</span><strong>${esc(
                appointmentLocationText(appointment)
              )}</strong></div>
              ${
                policy.canEditLocation
                  ? `<button class="location-edit-link" type="button"
                      data-action="appointment-location-edit" data-appointment-id="${esc(
                        appointment.id
                      )}">
                      ${icon("edit", 12)} 修改活动地点
                    </button>`
                  : !["completed", "cancelled"].includes(appointment.status)
                  ? `<p class="policy-lock-note">${icon("lock", 12)} ${esc(
                      policy.locationReason || "当前阶段暂不可修改活动地点"
                    )}</p>`
                  : ""
              }
              <div class="info-row"><span>参与人群</span><strong>${esc(
                appointment.audience || "待沟通"
              )}${appointment.headcount ? ` · ${esc(appointment.headcount)} 人` : ""}</strong></div>
              <div class="info-row"><span>项目对接人</span><strong>${assigneeMarkup(assignee)}</strong></div>
              ${
                appointment.note
                  ? `<div class="info-row info-row--block"><span>活动备注</span><strong>${esc(
                      appointment.note
                    )}</strong></div>`
                  : ""
              }
            </section>
            ${
              profileDiff.length &&
              !["completed", "cancelled"].includes(appointment.status)
                ? `<section class="profile-sync-card">
                    ${icon("users", 16)}
                    <div>
                      <strong>企业资料已更新</strong>
                      <p>预约保存的是下单时资料快照。院方将按快照联系人发送通知，确认后可同步最新资料。</p>
                      <ul>${profileDiff
                        .map(
                          (item) =>
                            `<li><span>${esc(item.label)}</span><b>${esc(
                              item.from
                            )}</b>${icon("arrowRight", 11)}<em>${esc(
                              item.to
                            )}</em></li>`
                        )
                        .join("")}</ul>
                      <button class="btn btn--primary btn--sm" type="button"
                        data-action="appointment-profile-sync" data-appointment-id="${esc(
                          appointment.id
                        )}">同步最新资料</button>
                    </div>
                  </section>`
                : `<p class="snapshot-note">${icon(
                    "lock",
                    11
                  )} 客户资料快照：${esc(
                    profileSnapshot?.capturedAt
                      ? formatDateTime(profileSnapshot.capturedAt)
                      : formatDateTime(appointment.createdAt)
                  )}${appointment.profileSyncedAt ? " · 已同步最新资料" : ""}</p>`
            }
            ${renderPlanCard(appointment)}
            ${
              appointment.feedback
                ? `<section class="feedback-card"><span>${
                    appointment.changeRequest?.type === "location"
                      ? "活动地点更新记录"
                      : "机构修改意见"
                  }</span><p>${esc(
                    appointment.feedback
                  )}</p><small>${esc(formatDateTime(appointment.feedbackAt))}</small></section>`
                : ""
            }
            ${
              appointment.status === "review"
                ? policy.canModify
                  ? `<div class="review-actions">
                      <button class="btn btn--primary" type="button" data-action="appointment-action" data-value="confirm">确认最终预约</button>
                      <button class="btn btn--ghost" type="button" data-action="appointment-action" data-value="revise">提出修改</button>
                    </div>`
                  : `<div class="policy-lock-card">${icon("lock", 16)}<div><strong>修改窗口已锁定</strong><p>${esc(
                      policy.modifyReason
                    )}</p><span>仍可确认最终方案；如需协调，请联系项目对接人。</span></div></div>`
                : ""
            }
            ${
              appointment.status === "confirmed"
                ? `<div class="confirmed-banner">${icon("checkCircle", 18)}<div><strong>预约已确认</strong><p>院方将按最终方案执行。${
                    assignee
                      ? `如需协调，请联系项目对接人 ${phoneLink(
                          assignee.phone,
                          assignee.phone
                        )}。`
                      : ""
                  }</p></div></div>
                  ${
                    policy.canModify || policy.canCancel
                      ? `<div class="appointment-change-policy">
                          <span>${icon("shield", 13)} 剩余 ${
                            policy.remainingDays == null
                              ? "--"
                              : policy.remainingDays
                          } 天 · 取消需提前 ${policy.cancelLeadDays} 天 · ${
                            policy.cycleDays >= 30
                              ? "30 天预约周期"
                              : "14 天预约周期"
                          } · 已修改 ${policy.usedChanges}/${
                            policy.cycleDays >= 30 ? "0" : "1"
                          } 次</span>
                          <div>
                            ${
                              policy.canModify
                                ? `<button class="btn btn--ghost btn--sm" type="button" data-action="appointment-action" data-value="change">申请修改</button>`
                                : ""
                            }
                            ${
                              policy.canCancel
                                ? `<button class="btn btn--danger-soft btn--sm" type="button" data-action="appointment-action" data-value="cancel">取消预约</button>`
                                : ""
                            }
                          </div>
                        </div>`
                      : `<div class="policy-lock-card">${icon("lock", 16)}<div><strong>修改与取消已锁定</strong>${
                          policy.modifyReason
                            ? `<p>修改：${esc(policy.modifyReason)}</p>`
                            : ""
                        }${
                          policy.cancelReason &&
                          policy.cancelReason !== policy.modifyReason
                            ? `<p>取消：${esc(policy.cancelReason)}</p>`
                            : ""
                        }${
                          !policy.modifyReason && !policy.cancelReason
                            ? "<p>当前阶段不可修改或取消。</p>"
                            : ""
                        }</div></div>`
                  }`
                : ""
            }
            ${
              ["pending", "planning", "review", "revision"].includes(
                appointment.status
              ) && policy.canCancel
                ? `<button class="text-link text-link--danger record-cancel" type="button"
                    data-action="appointment-action" data-value="cancel">取消本次预约</button>`
                : ""
            }
          </div>
        </div>
        <div class="sheet__footer">
          ${
            assignee
              ? `<a class="btn btn--ghost" href="${esc(phoneHref(assignee.phone))}">${icon(
                  "phone",
                  15
                )} 联系项目对接人</a>`
              : `<button class="btn btn--ghost" type="button" data-action="close-overlay">返回</button>`
          }
          <button class="btn btn--primary" type="button" data-action="close-overlay">关闭</button>
        </div>
      </section>
    `;
  }

  function renderAppointmentActionDialog() {
    const appointment = appointmentById(state.overlay?.appointmentId);
    if (!appointment) return "";
    const mode = state.overlay?.mode || "";
    const policy = appointmentChangePolicy(appointment);
    const hospital = hospitalById(appointment.hospitalId);
    const isNoteMode = mode === "change" || mode === "revise";
    const config = {
      confirm: {
        iconName: "checkCircle",
        tone: "is-confirm",
        title: "确认最终预约？",
        desc: "确认后预约正式生效，院方将按当前方案执行。如需调整，请先提出修改。",
        cancelText: "再看看",
        submitText: "确认最终预约",
        action: "appointment-confirm",
        submitClass: "btn--primary"
      },
      revise: {
        iconName: "edit",
        tone: "is-modify",
        title: "提出修改意见",
        desc: "说明需要调整的主题、时间、地点或流程，院方更新方案后会再次发送确认。",
        cancelText: "返回方案",
        submitText: "提交修改意见",
        action: "appointment-revise-submit",
        submitClass: "btn--primary"
      },
      change: {
        iconName: "edit",
        tone: "is-modify",
        title: "申请修改已确认方案",
        desc: `提交后院方会更新方案并重新发送确认。${
          policy.cycleDays < 30
            ? "本次会占用 14 天周期内 1 次修改机会。"
            : ""
        }`,
        cancelText: "暂不修改",
        submitText: "提交修改申请",
        action: "appointment-change-submit",
        submitClass: "btn--primary"
      },
      cancel: {
        iconName: "alert",
        tone: "is-cancel",
        title: "取消本次预约？",
        desc: `取消后号源会释放，如需重新预约请再次提交。当前预约需提前 ${
          policy.cancelLeadDays
        } 天取消${
          policy.remainingDays == null ? "" : `，距活动还有 ${policy.remainingDays} 天`
        }。`,
        cancelText: "保留预约",
        submitText: "确认取消",
        action: "appointment-cancel-submit",
        submitClass: "btn--danger"
      }
    }[mode];
    if (!config) return "";
    return `
      <div class="sheet-backdrop appointment-dialog-backdrop" data-action="close-overlay"></div>
      <section class="appointment-action-dialog ${config.tone}" role="dialog" aria-modal="true"
        aria-label="${esc(config.title)}">
        <div class="appointment-action-dialog__head">
          <span class="appointment-action-dialog__icon">${icon(config.iconName, 20)}</span>
          <button class="appointment-action-dialog__close" type="button"
            data-action="close-overlay" aria-label="关闭">
            ${icon("close", 14)}
          </button>
        </div>
        <div class="appointment-action-dialog__context">
          <small>${esc(serviceLabel(appointment.serviceType))} · ${esc(
            hospital?.short || hospital?.name || ""
          )}</small>
          <strong>${esc(topicOf(appointment))}</strong>
          <span>${esc(formatDateCN(appointment.date, true))}</span>
        </div>
        <h2>${esc(config.title)}</h2>
        <p>${esc(config.desc)}</p>
        ${
          isNoteMode
            ? `<label class="appointment-action-dialog__field">
                <span>修改内容</span>
                <textarea ${
                  mode === "revise" ? "data-revise-note" : "data-change-note"
                } rows="4" placeholder="请写清楚需要调整的内容，方便院方一次更新到位"></textarea>
              </label>`
            : ""
        }
        ${
          mode === "cancel" && appointment.plan
            ? `<div class="appointment-action-dialog__hint">${icon("shield", 13)} 取消后，院方将收到状态变更；已上传的方案附件会保留在历史记录中。</div>`
            : ""
        }
        <div class="appointment-action-dialog__actions">
          <button class="btn btn--ghost" type="button" data-action="close-overlay">${esc(
            config.cancelText
          )}</button>
          <button class="btn ${config.submitClass}" type="button"
            data-action="${config.action}">${esc(config.submitText)}</button>
        </div>
      </section>
    `;
  }

  function returnFromAppointmentAction(action = "") {
    if (!popOverlayLayer()) return false;
    if (state.overlay?.type === "appointment") state.overlay.action = action;
    renderApp({ scrollTo: currentWindowScroll() });
    return true;
  }

  function openAppointmentLocationEdit(appointmentId) {
    const appointment = appointmentById(appointmentId);
    if (!appointment) return;
    if (!clientOwnsAppointment(appointment)) {
      return showToast(state.session ? "无权修改该预约。" : "请先登录。");
    }
    const policy = appointmentChangePolicy(appointment);
    if (!policy.canEditLocation) {
      return showToast(policy.locationReason || "当前阶段不可修改活动地点。");
    }
    state.appointmentLocationDraft = {
      appointmentId: appointment.id,
      province: appointment.province || "北京市",
      city: appointment.city || "北京市",
      address: appointment.address || "",
      venue: appointment.venue || ""
    };
    openOverlayLayer({
      type: "appointment-location",
      appointmentId: appointment.id
    });
  }

  function renderAppointmentLocationSheet() {
    const draft = state.appointmentLocationDraft;
    const appointment = appointmentById(
      draft?.appointmentId || state.overlay?.appointmentId
    );
    if (!draft || !appointment) return "";
    return `
      <div class="sheet-backdrop" data-action="close-overlay"></div>
      <section class="sheet" role="dialog" aria-modal="true" aria-label="修改活动地点">
        <div class="sheet__grabber"></div>
        <div class="sheet__bar">
          <div><h2>修改活动地点</h2><p>${esc(appointment.id)} · 由机构填写</p></div>
          <button class="sheet__close" type="button" data-action="close-overlay" aria-label="关闭">
            ${icon("close", 15)}
          </button>
        </div>
        <div class="sheet__body">
          <div class="sheet-pad">
            <div class="template-form-note">${icon(
              "building",
              13
            )} 活动地点由机构维护。保存后会同步到预约详情与院方方案，院方运营人员不覆盖此信息。</div>
            <div class="field-row">
              <div class="field"><label>省份</label>
                <select data-location-province>${renderProvinceOptions(draft.province)}</select>
              </div>
              <div class="field"><label>城市</label>
                <select data-location-city>${renderCityOptions(draft.province, draft.city)}</select>
              </div>
            </div>
            <div class="field">
              <label>详细地址 <em>*</em></label>
              <input type="text" data-location-field="address" value="${esc(
                draft.address
              )}" placeholder="如：XX路XX号XX大厦">
            </div>
            <div class="field">
              <label>场地名称 <span>选填</span></label>
              <input type="text" data-location-field="venue" value="${esc(
                draft.venue
              )}" placeholder="如：总部大楼 3 层报告厅">
            </div>
          </div>
        </div>
        <div class="sheet__footer">
          <button class="btn btn--ghost" type="button" data-action="close-overlay">取消</button>
          <button class="btn btn--primary" type="button" data-action="appointment-location-save">
            保存活动地点 ${icon("check", 14)}
          </button>
        </div>
      </section>
    `;
  }

  function saveAppointmentLocation() {
    const draft = state.appointmentLocationDraft;
    const appointment = appointmentById(draft?.appointmentId);
    if (!draft || !appointment) return;
    if (!clientOwnsAppointment(appointment)) {
      return showToast(state.session ? "无权修改该预约。" : "请先登录。");
    }
    const policy = appointmentChangePolicy(appointment);
    if (!policy.canEditLocation) {
      return showToast(policy.locationReason || "当前阶段不可修改活动地点。");
    }
    if (!draft.address.trim()) return showToast("请填写活动详细地址。");
    const expert = appointment.doctorId ? expertById(appointment.doctorId) : null;
    const assignmentError = appointmentAssignmentError({
      appointment,
      expert,
      serviceType: appointment.serviceType,
      date: appointment.plan?.date || appointment.date,
      province: draft.province,
      city: draft.city,
      ignoreId: appointment.id
    });
    if (assignmentError) return showToast(assignmentError);
    const now = new Date().toISOString();
    const locationText = formatAddress(
      draft.province,
      draft.city,
      draft.address,
      draft.venue
    );
    const patch = {
      province: draft.province,
      city: draft.city,
      address: draft.address.trim(),
      venue: draft.venue.trim(),
      locationUpdatedAt: now,
      locationUpdatedBy: "institution"
    };
    const requiresPlanResend = ["review", "confirmed"].includes(
      appointment.status
    );
    if (appointment.status === "confirmed") {
      patch.status = "revision";
      patch.confirmedAt = "";
      patch.feedback = `机构申请修改活动地点：${locationText}`;
      patch.feedbackAt = now;
      patch.changeRequest = {
        type: "location",
        note: patch.feedback,
        at: patch.feedbackAt,
        by: state.session?.name || ""
      };
      patch.clientChangeCount = (Number(appointment.clientChangeCount) || 0) + 1;
    } else if (appointment.status === "review") {
      patch.status = "revision";
      patch.feedback = `机构在待确认阶段修改活动地点：${locationText}`;
      patch.feedbackAt = now;
      patch.changeRequest = {
        type: "location",
        note: patch.feedback,
        at: now,
        by: state.session?.name || ""
      };
      patch.hospitalNotice = {
        type: "location",
        message: "机构在待确认阶段修改了活动地点，请更新方案后重新发送。",
        at: now,
        readAt: ""
      };
    } else {
      patch.feedback = `机构更新活动地点：${locationText}`;
      patch.feedbackAt = now;
      patch.changeRequest = {
        type: "location",
        note: patch.feedback,
        at: now,
        by: state.session?.name || "",
        acknowledgedAt: ""
      };
      patch.hospitalNotice = {
        type: "location",
        message: `机构更新了活动地点，请核对方案与现场安排。`,
        at: now,
        readAt: ""
      };
    }
    if (appointment.plan) {
      patch.plan = {
        ...appointment.plan,
        province: patch.province,
        city: patch.city,
        address: patch.address,
        venue: patch.venue,
        updatedAt: now
      };
      if (
        appointment.status === "revision" ||
        requiresPlanResend ||
        ["pending", "planning"].includes(appointment.status)
      ) {
        patch.planNeedsResend = true;
        patch.planSentAt = "";
      }
    }
    updateAppointment(appointment.id, patch);
    logOperation("机构更新活动地点", `${appointment.id} · ${locationText}`, {
      entityType: "appointment",
      entityId: appointment.id,
      hospitalId: appointment.hospitalId
    });
    state.appointmentLocationDraft = null;
    if (!popOverlayLayer()) {
      clearOverlayState();
      releaseOverlayHistory();
      renderApp({ scrollTo: currentWindowScroll() });
    } else if (state.screen === "admin") {
      refreshAdminRecordList();
    } else {
      refreshRecordPanel();
    }
    showToast(
      patch.status === "revision"
        ? "活动地点已更新，院方会重新发送方案后再次确认。"
        : appointment.status === "pending"
        ? "活动地点已更新，院方接单时会带入最新地点。"
        : appointment.status === "planning"
        ? "活动地点已更新并通知院方，方案需重新确认后发送。"
        : appointment.plan
        ? "活动地点已更新并通知院方，方案内容已同步。"
        : "活动地点已更新并通知院方。"
    );
  }

  function openDemandCreate() {
    if (!state.session) {
      startLogin({ type: "demand" });
      return;
    }
    const hospital = nearestHospital();
    const region = currentClientRegion();
    state.overlay = {
      type: "demand-create",
      draft: {
        targetType: "group",
        hospitalId: "",
        serviceType: "讲座",
        topic: "",
        audience: "",
        headcount: "",
        preferredDate: "",
        province: region.province,
        city: region.city,
        note: "",
        contactName: state.session.name || "",
        contactPhone: state.session.contactPhone || state.session.phone || ""
      }
    };
    renderOverlay();
  }

  function openBookingDemand() {
    const booking = state.booking;
    if (!booking) {
      openDemandCreate();
      return;
    }
    const hospital = bookingHospital(booking);
    const expert = bookingSelectedDoctor(booking);
    openOverlayLayer({
      type: "demand-create",
      draft: {
        targetType: "group",
        hospitalId: "",
        serviceType: booking.serviceType || "讲座",
        topic: booking.customTopic || "",
        audience: booking.audience || "",
        headcount: booking.headcount || "",
        preferredDate: booking.date || "",
        province: booking.province,
        city: booking.city,
        note: [
          booking.note,
          expert ? `意向专家：${expert.name} · ${expert.deptTitle}` : "",
          booking.address
            ? `活动地址：${formatAddress(
                booking.province,
                booking.city,
                booking.address,
                booking.venue
              )}`
            : ""
        ]
          .filter(Boolean)
          .join("\n"),
        contactName: booking.contactName || state.session.name || "",
        contactPhone: booking.contactPhone || state.session.phone || ""
      }
    });
  }

  function renderDemandCreateSheet() {
    const draft = state.overlay?.draft;
    if (!draft) return "";
    return `
      <div class="sheet-backdrop" data-action="close-overlay"></div>
      <section class="sheet" role="dialog" aria-modal="true" aria-label="发起提需">
        <div class="sheet__grabber"></div>
        <div class="sheet__bar">
          <div><h2>发起提需</h2><p>没有合适的专家？由院方协助匹配</p></div>
          <button class="sheet__close" type="button" data-action="close-overlay" aria-label="关闭">
            ${icon("close", 15)}
          </button>
        </div>
        <div class="sheet__body">
          <div class="sheet-pad">
            <div class="field demand-target-field">
              <label>目标机构</label>
              <select data-demand-target>
                <option value="group" ${
                  draft.targetType === "group" ? "selected" : ""
                }>集团企康办 · 由集团统筹匹配</option>
                ${state.hospitals
                  .map(
                    (hospital) =>
                      `<option value="${esc(hospital.id)}" ${
                        draft.targetType === "hospital" &&
                        draft.hospitalId === hospital.id
                          ? "selected"
                          : ""
                      }>${esc(hospital.name)}</option>`
                  )
                  .join("")}
              </select>
              <span class="field-help">默认提交至集团企康办，也可指定具体履约医院。</span>
            </div>
            <div class="field">
              <label>服务类型</label>
              <div class="choice-grid choice-grid--three">
                ${SERVICE_IDS.map(
                  (id) =>
                    `<button class="choice-tile ${
                      draft.serviceType === id ? "is-active" : ""
                    }" type="button" data-action="demand-service" data-value="${esc(id)}">${esc(
                      serviceLabel(id)
                    )}</button>`
                ).join("")}
              </div>
            </div>
            <div class="field">
              <label>需求主题</label>
              <input type="text" data-demand-field="topic" value="${esc(
                draft.topic
              )}" placeholder="如：职场人群睡眠与压力管理">
            </div>
            <div class="field-row">
              <div class="field"><label>参与人群</label>
                <input type="text" data-demand-field="audience" value="${esc(
                  draft.audience
                )}" placeholder="如：企业员工">
              </div>
              <div class="field"><label>预计人数</label>
                <input type="number" inputmode="numeric" data-demand-field="headcount" value="${esc(
                  draft.headcount
                )}" placeholder="如：60">
              </div>
            </div>
            <div class="field">
              <label>期望日期 <span>选填</span></label>
              <input type="date" data-demand-field="preferredDate" value="${esc(
                draft.preferredDate
              )}" min="${todayIso()}">
            </div>
            <div class="field-row">
              <div class="field">
                <label>活动省份</label>
                <select data-demand-province>${renderProvinceOptions(draft.province)}</select>
              </div>
              <div class="field">
                <label>活动城市</label>
                <select data-demand-city>${renderCityOptions(draft.province, draft.city)}</select>
              </div>
            </div>
            <div class="field">
              <label>需求说明</label>
              <textarea data-demand-field="note" placeholder="请描述活动背景、人群特点、场地条件或期望的专家方向">${esc(
                draft.note
              )}</textarea>
            </div>
            <div class="field-row">
              <div class="field"><label>联系人</label>
                <input type="text" data-demand-field="contactName" value="${esc(draft.contactName)}">
              </div>
              <div class="field"><label>联系电话</label>
                <input type="tel" inputmode="numeric" maxlength="11" data-demand-field="contactPhone" value="${esc(
                  draft.contactPhone
                )}">
              </div>
            </div>
          </div>
        </div>
        <div class="sheet__footer">
          <button class="btn btn--ghost" type="button" data-action="close-overlay">取消</button>
          <button class="btn btn--primary" type="button" data-action="demand-submit">提交提需 ${icon(
            "arrowRight",
            15
          )}</button>
        </div>
      </section>
    `;
  }

  function submitDemand() {
    const draft = state.overlay?.draft;
    if (!draft) return;
    if (!state.session) {
      showToast("请先登录后再提交提需。");
      startLogin({ type: "demand" });
      return;
    }
    if (!draft.topic.trim()) return showToast("请填写需求主题。");
    if (!draft.contactName.trim()) return showToast("请填写联系人。");
    if (draft.contactPhone && !/^1\d{10}$/.test(draft.contactPhone)) {
      return showToast("联系电话格式不正确。");
    }
    if (!draft.province || !draft.city) return showToast("请选择活动省市。");
    if (draft.targetType === "hospital" && !draft.hospitalId) {
      return showToast("请选择具体目标医院。");
    }
    if (draft.preferredDate && draft.preferredDate < todayIso()) {
      return showToast("期望日期不能早于今天。");
    }
    if (
      String(draft.headcount || "").trim() &&
      (!Number.isInteger(Number(draft.headcount)) || Number(draft.headcount) <= 0)
    ) {
      return showToast("预计人数需填写大于 0 的整数。");
    }
    const now = new Date().toISOString();
    const demand = {
      id: idTimestamp("XQ"),
      ownerPhone: state.session.phone,
      orgName: state.session.orgName,
      orgType: state.session.orgType,
      contactName: draft.contactName.trim(),
      contactTitle: state.session.title || "",
      phone: draft.contactPhone || state.session.phone,
      province: draft.province,
      city: draft.city,
      targetType: draft.targetType === "hospital" ? "hospital" : "group",
      hospitalId:
        draft.targetType === "hospital" ? draft.hospitalId || "" : "",
      serviceType: draft.serviceType,
      topic: draft.topic.trim(),
      audience: draft.audience.trim(),
      headcount: draft.headcount,
      preferredDate: draft.preferredDate,
      note: draft.note.trim(),
      status: "pending",
      assignedStaff: null,
      followUps: [],
      createdAt: now,
      updatedAt: now
    };
    const items = getDemands();
    items.push(demand);
    saveDemands(items);
    clearOverlayState();
    releaseOverlayHistory();
    state.clientRecordTab = "demands";
    state.tab = "appointments";
    renderApp({ scrollTo: 0 });
    showToast(
      demand.targetType === "group"
        ? "提需已提交，集团企康办将由超级管理员跟进。"
        : "提需已提交，医院运营会尽快电话联系。"
    );
  }

  function renderDemandSheet() {
    const demand = demandById(state.overlay?.demandId);
    if (!demand) return "";
    const targetName = demandTargetName(demand);
    const isGroup = demand.targetType === "group";
    const meta = DEMAND_STATUS[demand.status] || DEMAND_STATUS.pending;
    const matchedExpert = demand.matchedExpertId
      ? expertById(demand.matchedExpertId)
      : null;
    return `
      <div class="sheet-backdrop" data-action="close-overlay"></div>
      <section class="sheet record-sheet" role="dialog" aria-modal="true" aria-label="提需详情">
        <div class="sheet__grabber"></div>
        <div class="sheet__bar">
          <div><h2>提需详情</h2><p>${esc(demand.id)}</p></div>
          <button class="sheet__close" type="button" data-action="close-overlay" aria-label="关闭">
            ${icon("close", 15)}
          </button>
        </div>
        <div class="sheet__body">
          <div class="record-sheet__body">
            <div class="record-head">
              <div>
                <span class="record-head__tag">${esc(serviceLabel(demand.serviceType))} · ${esc(
                  targetName
                )}</span>
                <h1>${esc(demand.topic)}</h1>
                <p>${esc(demand.audience || "参与人群待沟通")} · ${esc(
                  demand.headcount ? demand.headcount + " 人" : "人数待确认"
                )}</p>
              </div>
              <span class="status-pill ${meta.cls}">${esc(meta.label)}</span>
            </div>
            ${
              isGroup
                ? `<section class="demand-route-note">
                    ${icon("shield", 15)}
                    <div>
                      <strong>集团企康办 · 超级管理员跟进</strong>
                      <p>该需求不会进入具体医院需求池，由超级管理员统一联系、分配并跟进落地。</p>
                    </div>
                  </section>`
                : ""
            }
            <section class="info-card">
              <div class="info-row"><span>目标机构</span><strong>${esc(
                targetName
              )}</strong></div>
              ${
                matchedExpert
                  ? `<div class="info-row"><span>匹配专家</span><strong>${esc(
                      matchedExpert.name
                    )} · ${esc(matchedExpert.deptTitle)}</strong></div>`
                  : ""
              }
              <div class="info-row"><span>期望日期</span><strong>${esc(
                demand.preferredDate ? formatDateCN(demand.preferredDate, true) : "待沟通"
              )}</strong></div>
              <div class="info-row"><span>活动地区</span><strong>${esc(
                regionText(demand.province, demand.city)
              )}</strong></div>
              <div class="info-row"><span>联系人</span><strong>${esc(
                demand.contactName
              )} · ${phoneLink(demand.phone, demand.phone)}</strong></div>
              <div class="info-row"><span>${isGroup ? "集团对接人" : "院方对接人"}</span><strong>${assigneeMarkup(
                demand.assignedStaff
              )}</strong></div>
              ${
                demand.note
                  ? `<div class="info-row info-row--block"><span>需求说明</span><strong>${esc(
                      demand.note
                    )}</strong></div>`
                  : ""
              }
            </section>
            ${
              demand.followUps?.length
                ? `<section class="feedback-card"><span>${
                    isGroup ? "集团沟通记录" : "院方沟通记录"
                  }</span>${demand.followUps
                    .map(
                      (item) =>
                        `<p>${esc(item.note)}<small>${esc(
                          item.by?.name || "院方"
                        )} · ${esc(formatDateTime(item.at))}</small></p>`
                    )
                    .join("")}</section>`
                : ""
            }
            ${
              demand.status === "pending"
                ? `<button class="text-link text-link--danger record-cancel" type="button"
                    data-action="demand-cancel">取消本次提需</button>`
                : ""
            }
          </div>
        </div>
        <div class="sheet__footer">
          ${
            demand.convertedAppointmentId
              ? `<button class="btn btn--ghost" type="button" data-action="demand-open-appointment"
                  data-appointment-id="${esc(demand.convertedAppointmentId)}">查看已转预约</button>
                 <button class="btn btn--primary" type="button" data-action="close-overlay">关闭</button>`
              : demand.status === "matched"
              ? `<button class="btn btn--ghost" type="button" data-action="close-overlay">关闭</button>
                 <button class="btn btn--primary" type="button" data-action="demand-convert">
                   基于提需发起预约 ${icon("arrowRight", 15)}</button>`
              : `${
                  demand.assignedStaff
                    ? `<a class="btn btn--ghost" href="${esc(
                        phoneHref(demand.assignedStaff.phone)
                      )}">${icon("phone", 15)} 联系${isGroup ? "集团" : "院方"}</a>`
                    : `<button class="btn btn--ghost" type="button" data-action="close-overlay">返回</button>`
                }
                <button class="btn btn--primary" type="button" data-action="close-overlay">关闭</button>`
          }
        </div>
      </section>
    `;
  }

  /* =========================================================
     Me & profile
     ========================================================= */
  function renderMePage() {
    const session = state.session;
    if (!session) {
      return `
        <div class="screen">
          <header class="page-head">
            <span class="eyebrow"><i></i> My Account</span>
            <h1>我的</h1>
            <p>登录企业账号，管理预约、提需与企业信息。</p>
          </header>
          <div class="login-required">
            <span class="login-required__icon">${icon("user", 28)}</span>
            <h2>登录企业账号</h2>
            <p>手机号登录，保持登录状态，下次打开自动进入。</p>
            <button class="btn btn--primary btn--block" type="button" data-action="start-login">
              登录 / 注册 ${icon("arrowRight", 15)}
            </button>
          </div>
        </div>
      `;
    }
    const appointments = appointmentsForUser(session.phone);
    const demands = demandsForUser(session.phone);
    const profileIssues = profileValidationErrors(session);
    const hospital = nearestHospital(session);
    const hospitalPhone = hospital?.phone || "";
    return `
      <div class="screen me-screen">
        <header class="page-head page-head--tight">
          <span class="eyebrow"><i></i> My Account</span>
          <h1>我的</h1>
        </header>
        ${
          profileIssues.length
            ? `<section class="profile-completion-card">
                ${icon("alert", 17)}
                <div>
                  <strong>企业资料待完善</strong>
                  <p>${esc(profileIssues.join("、"))}，完善后便于院方确认方案和发送通知。</p>
                </div>
                <button type="button" data-action="open-profile">去完善</button>
              </section>`
            : ""
        }
        <section class="profile-hero">
          <div class="profile-hero__top">
            <span class="profile-hero__avatar">${esc(initialOf(session.name))}</span>
            <div class="profile-hero__person">
              <strong>${esc(session.name)}</strong>
              <span>${esc(session.orgName)}</span>
              <small>${esc(session.orgType)}${session.title ? " · " + esc(session.title) : ""}</small>
            </div>
            <button class="profile-hero__edit" type="button" data-action="open-profile">${icon(
              "edit",
              14
            )} ${profileIssues.length ? "完善" : "编辑"}</button>
          </div>
          <div class="profile-hero__phone">
            ${icon("phone", 15)}
            <strong>${esc(session.contactPhone || session.phone)}</strong>
            <span>联系手机</span>
          </div>
        </section>
        <div class="me-stats">
          <button type="button" data-action="tab" data-tab="appointments">
            <strong>${appointments.length}</strong><span>活动预约</span>
          </button>
          <button type="button" data-action="me-demands">
            <strong>${demands.length}</strong><span>专家提需</span>
          </button>
          <button type="button" data-action="me-confirmed">
            <strong>${appointments.filter((item) => item.status === "confirmed").length}</strong>
            <span>已确认</span>
          </button>
        </div>
        <section class="me-menu">
          <button type="button" data-action="tab" data-tab="appointments">
            <span class="me-menu__icon">${icon("calendar", 17)}</span>
            <span><strong>我的预约</strong><small>查看方案、确认预约与对接人</small></span>
            ${icon("chevronRight", 15)}
          </button>
          <button type="button" data-action="open-demand">
            <span class="me-menu__icon">${icon("sparkles", 17)}</span>
            <span><strong>专家提需</strong><small>没有合适专家时由院方协助匹配</small></span>
            ${icon("chevronRight", 15)}
          </button>
          <button type="button" data-action="open-profile">
            <span class="me-menu__icon">${icon("user", 17)}</span>
            <span><strong>企业资料</strong><small>姓名、职务、单位与通知邮箱</small></span>
            ${icon("chevronRight", 15)}
          </button>
          <a href="${hospitalPhone ? esc(phoneHref(hospitalPhone)) : "#"}">
            <span class="me-menu__icon">${icon("phone", 17)}</span>
            <span><strong>医院服务咨询</strong><small>${esc(
              hospital?.short || hospital?.name || "当前医院"
            )} · ${esc(hospitalPhone || "电话待补充")}</small></span>
            ${icon("chevronRight", 15)}
          </a>
        </section>
        <button class="btn btn--ghost btn--block me-logout" type="button" data-action="logout">
          ${icon("logout", 15)} 退出登录
        </button>
        <p class="source-note">登录状态会保存在当前浏览器，下次打开自动进入。演示环境仅生成可复制的推送内容，不会真实发送。</p>
      </div>
    `;
  }

  function renderProfileSheet() {
    const draft = state.profileDraft || { ...state.session };
    const region = profileRegionFromContext(state.session);
    return `
      <div class="sheet-backdrop" data-action="close-overlay"></div>
      <section class="sheet" role="dialog" aria-modal="true" aria-label="编辑企业资料">
        <div class="sheet__grabber"></div>
        <div class="sheet__bar">
          <div><h2>企业资料</h2><p>用于预约联系与就近医院匹配</p></div>
          <button class="sheet__close" type="button" data-action="close-overlay" aria-label="关闭">
            ${icon("close", 15)}
          </button>
        </div>
        <div class="sheet__body">
          <div class="sheet-pad">
            <p class="profile-form-note">${icon("shield", 13)} 姓名、职务、单位、联系方式和通知邮箱用于预约确认与方案通知，请完整填写。</p>
            <div class="field-row">
              <div class="field"><label>姓名 <em>*</em></label>
                <input type="text" data-profile-field="name" value="${esc(draft.name)}">
              </div>
              <div class="field"><label>职务 <em>*</em></label>
                <input type="text" data-profile-field="title" value="${esc(draft.title || "")}">
              </div>
            </div>
            <div class="field"><label>单位名称 <em>*</em></label>
              <input type="text" data-profile-field="orgName" value="${esc(draft.orgName)}">
            </div>
            <div class="field"><label>机构类型 <em>*</em></label>
              <select data-profile-field="orgType">
                ${INSTITUTION_TYPES
                  .map(
                    (type) =>
                      `<option value="${type}" ${
                        draft.orgType === type ? "selected" : ""
                      }>${type}</option>`
                  )
                  .join("")}
              </select>
            </div>
            <div class="field"><label>联系方式 <em>*</em> <span>默认手机号，可修改</span></label>
              <input type="tel" inputmode="numeric" maxlength="11" data-profile-field="contactPhone" value="${esc(
                draft.contactPhone || draft.phone
              )}">
            </div>
            <div class="field"><label>通知邮箱 <em>*</em> <span>用于接收方案与确认提醒</span></label>
              <input type="email" inputmode="email" data-profile-field="email" value="${esc(
                draft.email || ""
              )}" placeholder="name@company.com">
            </div>
            <div class="field">
              <label>所在省市 <span>无需填写，自动同步</span></label>
              <div class="field-static">
                ${icon("mapPin", 14)} ${esc(regionText(region.province, region.city))}
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
    `;
  }

  function openProfileSheet() {
    if (!state.session) return;
    state.profileDraft = { ...state.session };
    state.overlay = { type: "profile" };
    renderOverlay();
  }

  function saveProfile() {
    const draft = state.profileDraft;
    if (!draft) return;
    const issueMessage = profileIssueMessage({
      ...draft,
      phone: state.session.phone
    });
    if (issueMessage) {
      return showToast(issueMessage);
    }
    const region = profileRegionFromContext(state.session);
    const saved = upsertUser({
      ...state.session,
      ...draft,
      phone: state.session.phone,
      name: draft.name.trim(),
      orgName: draft.orgName.trim(),
      contactPhone: String(draft.contactPhone || state.session.phone).trim(),
      title: draft.title.trim(),
      email: draft.email.trim(),
      province: region.province,
      city: region.city
    });
    setSession(saved);
    syncInstitutionProfile(saved);
    state.overlay = null;
    releaseOverlayHistory();
    renderApp();
    showToast("企业资料已保存。");
  }

  /* =========================================================
     Admin shell
     ========================================================= */
  function openAdmin() {
    if (state.adminAuthed) {
      state.screen = "admin";
      state.tab = "home";
      state.adminTab = "appointments";
      setLastPortal("admin");
      if (!state.adminHistory) {
        state.adminHistory = true;
        pushAppHistory("admin");
      }
      renderApp({ scrollTo: 0 });
      return;
    }
    state.screen = "admin-login";
    state.adminLogin = { username: "", password: "", error: "" };
    if (!state.adminHistory) {
      state.adminHistory = true;
      pushAppHistory("admin");
    }
    renderApp();
  }

  function renderAdminLogin() {
    const draft = state.adminLogin || { username: "", password: "", error: "" };
    return `
      <div class="admin-login">
        <div class="admin-login__top">
          <button class="icon-button" type="button" data-action="admin-close" aria-label="返回客户端">
            ${icon("chevronLeft", 18)}
          </button>
          <img src="assets/logo.svg" alt="北京大学国际医院">
          <span></span>
        </div>
        <div class="admin-login__hero">
          <span>${icon("shield", 14)} 院方工作台</span>
          <h1>医院运营与<br>项目管理登录</h1>
          <p>超级管理员可分配医院运营人员；医院运营仅能维护本院专家、号源与预约。</p>
        </div>
        <div class="admin-login__card">
          <div class="field">
            <label for="admin-username">账号</label>
            <input id="admin-username" type="text" placeholder="请输入院方账号"
              value="${esc(draft.username)}" data-admin-login="username" autocomplete="username">
          </div>
          <div class="field">
            <label for="admin-password">密码</label>
            <input id="admin-password" type="password" placeholder="请输入密码"
              value="${esc(draft.password)}" data-admin-login="password" autocomplete="current-password">
          </div>
          ${draft.error ? `<p class="admin-login__error">${icon("alert", 13)} ${esc(draft.error)}</p>` : ""}
          <button class="btn btn--primary btn--block" type="button" data-action="admin-login">
            登录工作台 ${icon("arrowRight", 15)}
          </button>
          <div class="admin-login__demo">
            <strong>演示账号</strong>
            <span>超级管理员 admin / pkuih2026</span>
            <span>医院运营 pkuih / pkuih2026</span>
            <span>其他医院：医院 ID / pkuih2026（如 zibo、luan、kaide）</span>
          </div>
        </div>
      </div>
    `;
  }

  function submitAdminLogin() {
    const draft = state.adminLogin || {};
    const account = getAdminAccounts().find(
      (item) => item.username === draft.username.trim() && item.active
    );
    if (!account || account.password !== draft.password) {
      state.adminLogin.error = "账号或密码不正确，请重试。";
      renderApp();
      return;
    }
    setAdminSession(account);
    state.adminAuthed = true;
    state.adminUser = account;
    state.screen = "admin";
    state.adminTab = "appointments";
    state.adminHospitalId = account.role === "operator" ? account.hospitalId : "";
    setLastPortal("admin");
    renderApp({ scrollTo: 0 });
  }

  function adminRoleMeta(account) {
    return ROLE[account?.role] || ROLE.operator;
  }

  function adminHospitalName(account = state.adminUser) {
    if (!account) return "";
    if (account.role === "superadmin") {
      return state.adminHospitalId
        ? hospitalById(state.adminHospitalId)?.name || "全部医院"
        : "全部医院";
    }
    return hospitalById(account.hospitalId)?.name || "未绑定医院";
  }

  function adminPendingCount() {
    return adminAppointments().filter((item) =>
      ["pending", "planning", "review", "revision"].includes(item.status)
    ).length;
  }

  function adminDemandPendingCount() {
    return adminDemands().filter((item) => item.status === "pending").length;
  }

  function adminTabs() {
    const tabs = [
      { id: "appointments", label: "预约", icon: "calendar", badge: adminPendingCount() },
      { id: "demands", label: "需求池", icon: "sparkles", badge: adminDemandPendingCount() },
      { id: "slots", label: "号源", icon: "clock" },
      { id: "doctors", label: "专家", icon: "experts" },
      { id: "themes", label: "时令", icon: "leaf" },
      { id: "templates", label: "方案模版", icon: "clipboard" },
      { id: "marketing", label: "展业", icon: "send" }
    ];
    if (isSuperadmin()) {
      tabs.splice(4, 0, { id: "hospitals", label: "医院账号", icon: "building" });
      tabs.push(
        { id: "institutions", label: "机构账号", icon: "users" },
        { id: "logs", label: "操作日志", icon: "history" }
      );
    }
    return tabs;
  }

  function renderAdminTabs() {
    return `
      <div class="admin-tabs" role="tablist">
        ${adminTabs()
          .map(
            (tab) => `
              <button class="${state.adminTab === tab.id ? "is-active" : ""}" type="button"
                data-action="admin-tab" data-value="${tab.id}">
                ${tab.label}
                ${tab.badge ? `<i>${tab.badge}</i>` : ""}
              </button>
            `
          )
          .join("")}
      </div>
    `;
  }

  function renderAdminScreen() {
    const account = state.adminUser;
    if (!account) return renderAdminLogin();
    return `
      <div class="admin-screen">
        <header class="admin-topbar">
          <div class="admin-topbar__brand">
            <img src="assets/logo.svg" alt="北京大学国际医院">
            <div>
              <strong>${esc(account.name)} · ${esc(adminRoleMeta(account).label)}</strong>
              <span>${esc(adminHospitalName(account))} · ${phoneLink(account.phone, account.phone)}</span>
            </div>
          </div>
          <div class="admin-topbar__actions">
            <button class="icon-button" type="button" data-action="admin-close" aria-label="返回客户端">
              ${icon("close", 16)}
            </button>
            <button class="icon-button" type="button" data-action="admin-logout" aria-label="退出登录">
              ${icon("logout", 16)}
            </button>
          </div>
        </header>
        <main class="admin-content">
          ${
            state.adminTab === "demands"
              ? renderAdminDemandsPage()
              : state.adminTab === "slots"
              ? renderSlotConfigPage()
              : state.adminTab === "doctors"
              ? renderDoctorAdminPage()
              : state.adminTab === "themes"
              ? renderAdminThemesPage()
              : state.adminTab === "templates"
              ? renderAdminTemplatesPage()
              : state.adminTab === "hospitals"
              ? renderAdminHospitalsPage()
              : state.adminTab === "institutions"
              ? renderInstitutionAccountsPage()
              : state.adminTab === "logs"
              ? renderAdminLogsPage()
              : state.adminTab === "marketing"
              ? renderMarketingPage()
              : renderAdminAppointmentsPage()
          }
        </main>
      </div>
    `;
  }

  function renderAdminHospitalFilter() {
    if (!isSuperadmin()) return "";
    return `
      <div class="admin-scope">
        <label>${icon("building", 13)} 医院范围</label>
        <select data-admin-hospital>
          <option value="">全部医院</option>
          ${state.hospitals
            .map(
              (hospital) =>
                `<option value="${esc(hospital.id)}" ${
                  state.adminHospitalId === hospital.id ? "selected" : ""
                }>${esc(hospital.name)}</option>`
            )
            .join("")}
        </select>
      </div>
    `;
  }

  /* =========================================================
     Admin appointments
     ========================================================= */
  function adminStats() {
    const list = adminAppointments();
    return {
      pending: list.filter((item) => item.status === "pending").length,
      review: list.filter((item) => item.status === "review").length,
      confirmed: list.filter((item) => item.status === "confirmed").length,
      completed: list.filter((item) => item.status === "completed").length
    };
  }

  function filteredAdminAppointments() {
    const q = state.adminSearch.trim().toLowerCase();
    return adminAppointments()
      .filter((item) => {
        if (state.adminFilter !== "all" && item.status !== state.adminFilter) return false;
        if (!q) return true;
        return [
          item.id,
          item.orgName,
          item.contactName,
          item.phone,
          item.topic,
          item.doctorName,
          item.serviceType
        ]
          .join(" ")
          .toLowerCase()
          .includes(q);
      })
      .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  }

  function renderAdminAppointmentCard(appointment) {
    const hospital = hospitalById(appointment.hospitalId);
    const expert = appointment.doctorId ? expertById(appointment.doctorId) : null;
    const assignee = appointmentAssignee(appointment);
    const pushPending =
      Boolean(appointment.plan) &&
      ["review", "revision", "confirmed"].includes(appointment.status) &&
      !smsLogIsCurrent(appointment, getSmsLogs()[appointment.id]);
    return `
      <article class="admin-record" role="button" tabindex="0" data-action="open-admin-appointment"
        data-appointment-id="${esc(appointment.id)}">
        <div class="admin-record__top">
          ${statusPill(appointment.status)}
          <span>${esc(formatDateCN(appointment.date, true))}</span>
        </div>
        <h3>${esc(topicOf(appointment))}</h3>
        <div class="admin-record__tags">
          <span>${esc(serviceLabel(appointment.serviceType))}</span>
          <span class="is-hospital">${esc(hospital?.short || "")}</span>
          <span>${esc(expert ? expert.name : appointment.doctorName || "待匹配专家")}</span>
          ${pushPending ? '<span class="is-push">推送待发送</span>' : ""}
          ${
            appointment.changeRequest?.type === "location"
              ? '<span class="is-notice">机构改地点</span>'
              : ""
          }
          ${
            appointment.profileSyncedAt
              ? '<span class="is-notice">资料已更新</span>'
              : ""
          }
        </div>
        <div class="admin-record__info">
          <span>${icon("building", 12)} ${esc(appointment.orgName)}</span>
          <span>${icon("phone", 12)} ${phoneLink(appointment.phone, appointment.phone)}</span>
        </div>
        <div class="admin-record__foot">
          <span>${icon("user", 12)} ${
            assignee ? `对接人 ${esc(assignee.name)}` : "尚未接单"
          }</span>
          <span>${esc(appointment.id)} ${icon("chevronRight", 12)}</span>
        </div>
      </article>
    `;
  }

  function renderAdminAppointmentsPage() {
    const stats = adminStats();
    const list = filteredAdminAppointments();
    const filters = [
      ["all", "全部"],
      ["pending", "待接单"],
      ["planning", "方案制作"],
      ["review", "待确认"],
      ["revision", "待修改"],
      ["confirmed", "已确认"],
      ["completed", "已完成"]
    ];
    return `
      <div class="admin-page-head">
        <div><h1>预约管理</h1><p>接单、填写方案并与机构确认</p></div>
        <span class="admin-page-head__date">${esc(adminHospitalName())}</span>
      </div>
      ${renderAdminTabs()}
      ${renderAdminHospitalFilter()}
      <div class="admin-stats">
        <div class="admin-stat"><small>待接单</small><strong>${stats.pending}</strong><span>需尽快响应</span></div>
        <div class="admin-stat"><small>待机构确认</small><strong>${stats.review}</strong><span>方案已发送</span></div>
        <div class="admin-stat"><small>已确认</small><strong>${stats.confirmed}</strong><span>等待执行</span></div>
        <div class="admin-stat"><small>已完成</small><strong>${stats.completed}</strong><span>历史活动</span></div>
      </div>
      <div class="admin-search">
        ${icon("search", 15)}
        <input type="search" placeholder="搜索机构、联系人、编号" value="${esc(
          state.adminSearch
        )}" data-admin-search>
      </div>
      <div class="filter-scroll filter-scroll--admin">
        ${filters
          .map(
            ([id, label]) =>
              `<button class="chip ${state.adminFilter === id ? "is-active" : ""}" type="button"
                data-action="admin-filter" data-value="${id}">${label}</button>`
          )
          .join("")}
      </div>
      <div id="admin-record-list" class="admin-record-list">
        ${
          list.length
            ? list.map(renderAdminAppointmentCard).join("")
            : `<div class="empty-state"><span class="empty-state__icon">${icon(
                "calendar",
                26
              )}</span><h3>暂无预约</h3><p>机构提交预约后会出现在这里。</p></div>`
        }
      </div>
    `;
  }

  function hospitalOperators(hospitalId) {
    return getAdminAccounts()
      .filter(
        (account) =>
          account.active && account.role === "operator" && account.hospitalId === hospitalId
      )
      .sort((a, b) => a.name.localeCompare(b.name, "zh-CN"));
  }

  function staffSnapshot(account) {
    return account
      ? { username: account.username, name: account.name, phone: account.phone }
      : null;
  }

  function acceptAppointment() {
    const appointment = appointmentById(state.adminReviewId);
    if (!appointment) return;
    if (["completed", "cancelled"].includes(appointment.status)) {
      return showToast("该预约已结束，不能重新接单。");
    }
    if (appointment.assignedStaff) {
      showToast("该预约已有项目对接人。");
      return;
    }
    const account = state.adminUser;
    if (!account) return showToast("登录状态已失效，请重新登录。");
    if (!adminCanManageHospital(appointment.hospitalId)) {
      return showToast("只能接本院预约。");
    }
    const now = new Date().toISOString();
    const updated = updateAppointment(appointment.id, {
      status: appointment.status === "pending" ? "planning" : appointment.status,
      assignedStaff: staffSnapshot(account),
      acceptedAt: appointment.acceptedAt || now
    });
    logOperation("接单并指定项目负责人", `${appointment.id} · ${appointment.orgName}`, {
      entityType: "appointment",
      entityId: appointment.id,
      hospitalId: appointment.hospitalId
    });
    state.adminDraft = buildReviewDraft(updated);
    state.adminReviewSaved = false;
    renderOverlay();
    showToast(`已接单，项目对接人为 ${account.name}。`);
  }

  function buildReviewDraft(appointment) {
    const expert = appointment.doctorId ? expertById(appointment.doctorId) : null;
    const staff = appointmentAssignee(appointment);
    const plan = appointment.plan || {};
    const region = normalizeRegion(
      appointment.province || "北京市",
      appointment.city || "北京市"
    );
    return {
      topic: plan.topic || topicOf(appointment),
      serviceType: plan.serviceType || appointment.serviceType || "讲座",
      speakerId: plan.speakerId || expert?.id || "",
      speaker: plan.speaker || (expert ? `${expert.name} · ${expert.deptTitle}` : ""),
      date: plan.date || appointment.date || "",
      time: "全天",
      province: region.province,
      city: region.city,
      venue: appointment.venue || "",
      address: appointment.address || "",
      outline:
        plan.outline ||
        "1. 企业人群健康风险概览\n2. 专家主题分享\n3. 常见问题与误区\n4. 现场问答与健康咨询",
      agenda:
        plan.agenda ||
        "14:00-14:10 签到与开场\n14:10-15:10 专家主题分享\n15:10-15:40 现场问答\n15:40-16:00 健康咨询",
      team: plan.team || (staff ? `${staff.name}（项目负责人）` : ""),
      message:
        plan.message ||
        "院方已完成专家与课题匹配，请确认活动时间、地点与流程。如人数或场地有变化，请提前联系项目对接人。",
      planPdf: plan.pdf || null,
      internalNote: appointment.internalNote || ""
    };
  }

  function reviewSpeakerOptions(draft, hospitalId) {
    const service = normalizeService(draft?.serviceType || "讲座");
    return state.experts
      .filter(
        (item) =>
          item.hospitalId === hospitalId &&
          item.active !== false &&
          matchesService(item, service)
      )
      .map(
        (item) =>
          `<option value="${esc(item.id)}" ${
            draft?.speakerId === item.id ? "selected" : ""
          }>${esc(item.name)} · ${esc(item.deptTitle)} · ${esc(coverageText(item))}</option>`
      )
      .join("");
  }

  function collectReviewFields() {
    const fields = {};
    document.querySelectorAll("[data-review-field]").forEach((input) => {
      fields[input.dataset.reviewField] = input.value.trim();
    });
    return fields;
  }

  function collectInternalNotePatch() {
    const input = document.querySelector("[data-internal-note]");
    if (!input) return null;
    return {
      internalNote: input.value.trim(),
      internalNoteAt: new Date().toISOString(),
      internalNoteBy: state.adminUser?.name || ""
    };
  }

  async function saveReview() {
    const appointment = appointmentById(state.adminReviewId);
    if (!appointment) return;
    if (state.reviewSaving) return;
    if (["completed", "cancelled"].includes(appointment.status)) {
      return showToast("该预约已结束，方案仅供查看。");
    }
    if (!adminCanManageHospital(appointment.hospitalId)) {
      return showToast("只能处理本院预约。");
    }
    if (!appointment.assignedStaff) return showToast("请先接单并确定项目对接人。");
    const fields = collectReviewFields();
    if (!fields.topic) return showToast("请填写活动主题。");
    if (!fields.date) return showToast("请选择活动日期。");
    if (fields.date < todayIso()) return showToast("活动日期不能早于今天。");
    const staff = appointmentAssignee(appointment);
    if (!(appointment.address || "").trim()) {
      return showToast("机构尚未填写活动详细地址，请先联系机构补充。");
    }
    const planService = fields.serviceType || appointment.serviceType || "讲座";
    const finalSpeaker = fields.speakerId ? expertById(fields.speakerId) : null;
    const themeTopic = appointmentThemeTopicFor(appointment, planService);
    const planMonth = Number(String(fields.date || "").slice(5, 7)) || 0;
    const themeMonthValue = Number(appointment.themeMonth) || 0;
    const keepsTheme = Boolean(
      normalizeService(planService) === "讲座" &&
        themeTopic &&
        themeMonthValue &&
        planMonth === themeMonthValue &&
        finalSpeaker &&
        String(themeTopic.expertId || "") === String(finalSpeaker.id) &&
        String(fields.topic || "").trim() === String(themeTopic.title || "").trim()
    );
    const validationAppointment = keepsTheme
      ? appointment
      : {
          ...appointment,
          themeMonth: "",
          themeTopicId: "",
          themeCoverage: ""
        };
    const assignmentError = appointmentAssignmentError({
      appointment: validationAppointment,
      expert: finalSpeaker,
      serviceType: planService,
      date: fields.date,
      province: appointment.province,
      city: appointment.city,
      ignoreId: appointment.id
    });
    if (assignmentError) return showToast(assignmentError);
    let pdfSave;
    try {
      state.reviewSaving = true;
      showToast("正在保存活动方案…");
      pdfSave = await preparePlanPdfForSave(appointment);
    } catch (error) {
      state.reviewSaving = false;
      return showToast("方案附件保存失败，请压缩文件或稍后重试。");
    }
    const region = normalizeRegion(
      appointment.province || "北京市",
      appointment.city || "北京市"
    );
    const plan = {
      topic: fields.topic,
      serviceType: planService,
      speakerId: finalSpeaker?.id || "",
      speaker: finalSpeaker
        ? `${finalSpeaker.name} · ${finalSpeaker.deptTitle}`
        : appointment.doctorName || fields.speaker || "",
      date: fields.date,
      time: "全天",
      province: region.province,
      city: region.city,
      venue: appointment.venue || "",
      address: appointment.address || "",
      outline: fields.outline || "",
      agenda: fields.agenda || "",
      team: fields.team || "",
      message: fields.message || "",
      pdf: pdfSave.pdf,
      contact: staff ? `${staff.name} · ${staff.phone}` : "",
      themeMonth: keepsTheme ? appointment.themeMonth || "" : "",
      themeTopicId: keepsTheme ? appointment.themeTopicId || "" : "",
      themeCoverage: keepsTheme ? appointment.themeCoverage || "" : "",
      updatedAt: new Date().toISOString()
    };
    const wasConfirmed = appointment.status === "confirmed" || appointment.status === "completed";
    const appointmentPatch = {
      status: "review",
      plan,
      planHistory: (appointment.planHistory || []).concat(
        appointment.plan ? [{ ...appointment.plan, replacedAt: new Date().toISOString() }] : []
      ),
      feedback: "",
      feedbackAt: "",
      changeRequest: null,
      planNeedsResend: false,
      hospitalNotice: appointment.hospitalNotice
        ? { ...appointment.hospitalNotice, readAt: new Date().toISOString() }
        : appointment.hospitalNotice,
      previousStatus: "",
      planSentAt: new Date().toISOString(),
      requestedDate: appointment.requestedDate || appointment.date,
      date: fields.date,
      serviceType: planService,
      themeMonth: keepsTheme ? appointment.themeMonth || "" : "",
      themeTopicId: keepsTheme ? appointment.themeTopicId || "" : "",
      themeCoverage: keepsTheme ? appointment.themeCoverage || "" : "",
      confirmedAt: "",
      completedAt: ""
    };
    const notePatch = collectInternalNotePatch();
    if (notePatch) Object.assign(appointmentPatch, notePatch);
    appointmentPatch.doctorId = finalSpeaker.id;
    appointmentPatch.doctorName = finalSpeaker.name;
    appointmentPatch.tier = finalSpeaker.tier;
    let updated;
    try {
      updated = updateAppointment(appointment.id, appointmentPatch);
    } catch (error) {
      state.reviewSaving = false;
      if (pdfSave.newKey) deletePlanPdfBlob(pdfSave.newKey);
      return showToast("方案保存失败，请稍后重试。");
    }
    if (pdfSave.oldKey && pdfSave.oldKey !== pdfSave.newKey) {
      deletePlanPdfBlob(pdfSave.oldKey);
    }
    state.reviewSaving = false;
    logOperation("发送或更新活动方案", `${appointment.id} · ${plan.topic}`, {
      entityType: "appointment",
      entityId: appointment.id,
      hospitalId: appointment.hospitalId
    });
    state.adminReviewId = updated.id;
    state.adminDraft = buildReviewDraft(updated);
    state.adminNoteEditing = false;
    state.adminReviewSaved = true;
    renderOverlay();
    refreshAdminRecordList();
    window.requestAnimationFrame(() => {
      overlayRoot.querySelector(".sms-card")?.scrollIntoView({
        block: "center",
        behavior: "auto"
      });
    });
    showToast(
      wasConfirmed
        ? "方案已更新并发送，推送通知已生成；机构需重新确认。"
        : themeTopic && !keepsTheme
        ? "方案已发送；原时令课题关联已解除，推送通知已生成。"
        : "方案已发送，推送通知已生成，可直接复制发送。"
    );
  }

  function completeAppointment() {
    const appointment = appointmentById(state.adminReviewId);
    if (!appointment) return;
    if (!adminCanManageHospital(appointment.hospitalId)) {
      return showToast("只能处理本院预约。");
    }
    if (appointment.status !== "confirmed") {
      return showToast("机构确认方案后才能标记活动完成。");
    }
    const patch = {
      status: "completed",
      completedAt: new Date().toISOString()
    };
    const notePatch = collectInternalNotePatch();
    if (notePatch) Object.assign(patch, notePatch);
    updateAppointment(appointment.id, patch);
    logOperation("标记活动已完成", appointment.id, {
      entityType: "appointment",
      entityId: appointment.id,
      hospitalId: appointment.hospitalId
    });
    state.adminReviewId = "";
    state.adminDraft = null;
    releaseOverlayHistory();
    clearOverlayState();
    renderApp();
    showToast("活动已标记完成。");
  }

  function saveInternalNote() {
    const appointment = appointmentById(state.adminReviewId);
    if (!appointment) return;
    if (!adminCanManageHospital(appointment.hospitalId)) {
      return showToast("只能处理本院预约。");
    }
    if (["completed", "cancelled"].includes(appointment.status)) {
      return showToast("该预约已结束，内部备注仅供查看。");
    }
    const notePatch = collectInternalNotePatch();
    if (!notePatch) return;
    updateAppointment(appointment.id, notePatch);
    logOperation("更新预约内部备注", appointment.id, {
      entityType: "appointment",
      entityId: appointment.id,
      hospitalId: appointment.hospitalId
    });
    state.adminNoteEditing = false;
    renderOverlay();
    showToast("内部备注已保存，机构端不可见。");
  }

  function renderAdminReviewSheet() {
    const appointment = appointmentById(state.adminReviewId);
    if (!appointment) return "";
    const hospital = hospitalById(appointment.hospitalId);
    const expert = appointment.doctorId ? expertById(appointment.doctorId) : null;
    const assignee = appointmentAssignee(appointment);
    const draft = state.adminDraft || buildReviewDraft(appointment);
    const terminal = ["completed", "cancelled"].includes(appointment.status);
    const canView = Boolean(assignee);
    const canEdit = canView && !terminal;
    const saved = canEdit && state.adminReviewSaved && Boolean(appointment.plan);
    const formLocked = canView && (!canEdit || saved);
    const smsLog = getSmsLogs()[appointment.id];
    const smsCurrent = smsLogIsCurrent(appointment, smsLog);
    const mail = buildEmailText(appointment);
    const planTemplates = getPlanTemplates(appointment.hospitalId);
    return `
      <div class="sheet-backdrop" data-action="close-overlay"></div>
      <section class="sheet admin-review-sheet" role="dialog" aria-modal="true" aria-label="处理预约">
        <div class="sheet__grabber"></div>
        <div class="sheet__bar">
          <div><h2>处理预约</h2><p>${esc(appointment.id)} · ${esc(
            hospital?.name || ""
          )}</p></div>
          <button class="sheet__close" type="button" data-action="close-overlay" aria-label="关闭">
            ${icon("close", 15)}
          </button>
        </div>
        <div class="sheet__body">
          <div class="sheet-pad">
            ${
              appointment.changeRequest?.type === "location"
                ? `<div class="review-state-banner is-location">
                    ${icon("pin", 18)}
                    <div>
                      <strong>机构已更新活动地点</strong>
                      <p>${esc(
                        appointment.changeRequest.note ||
                          "请核对下方最新地址，并在方案与现场流程中同步。"
                      )}</p>
                      <small>${esc(
                        formatDateTime(appointment.changeRequest.at)
                      )} · ${esc(appointment.changeRequest.by || "机构联系人")}</small>
                    </div>
                  </div>`
                : ""
            }
            <div class="review-summary">
              <div class="review-summary__top">
                <img src="${esc(expertAvatar(expert))}" alt="${esc(
                  expert ? expert.name : "待匹配"
                )}">
                <div>
                  <strong>${esc(expert ? expert.name : "待匹配专家")}</strong>
                  <small>${esc(
                    appointment.serviceType
                  )} · ${esc(hospital?.short || "")} · ${esc(formatDateCN(appointment.date, true))}</small>
                </div>
                ${statusPill(appointment.status)}
              </div>
              <div class="info-card info-card--flat">
                <div class="info-row"><span>机构</span><strong>${esc(appointment.orgName)}</strong></div>
                <div class="info-row"><span>联系人</span><strong>${esc(
                  appointment.contactName
                )} · ${phoneLink(appointment.phone, appointment.phone)}</strong></div>
                <div class="info-row"><span>通知邮箱</span><strong>${esc(
                  appointment.email || appointmentOrgSnapshot(appointment)?.email || "未填写"
                )}</strong></div>
                <div class="info-row info-row--block"><span>资料口径</span><strong>下单时客户资料快照${
                  appointment.profileSyncedAt
                    ? ` · 机构已于 ${esc(
                        formatDateTime(appointment.profileSyncedAt)
                      )} 同步最新资料`
                    : " · 机构资料变更后需在预约详情手动同步"
                }</strong></div>
                <div class="info-row"><span>期望主题</span><strong>${esc(
                  appointment.topic || "未填写，可结合时令推荐"
                )}</strong></div>
                <div class="info-row"><span>机构期望日期</span><strong>${esc(
                  formatDateCN(appointment.requestedDate || appointment.date, true)
                )}</strong></div>
                <div class="info-row"><span>活动地址</span><strong>${esc(
                  appointmentLocationText(appointment)
                )}</strong></div>
                <div class="info-row"><span>项目对接人</span><strong>${
                  assignee
                    ? `${esc(assignee.name)} · ${phoneLink(assignee.phone, assignee.phone)}`
                    : '<span class="location-pending">尚未接单</span>'
                }</strong></div>
                ${
                  appointment.note
                    ? `<div class="info-row info-row--block"><span>机构备注</span><strong>${esc(
                        appointment.note
                      )}</strong></div>`
                    : ""
                }
              </div>
              ${
                appointment.feedback
                  ? `<div class="feedback-card"><span>${
                      appointment.changeRequest?.type === "confirmed-change"
                        ? "已确认方案 · 机构修改申请"
                        : appointment.status === "revision"
                        ? "机构修改意见 · 待处理"
                        : "机构修改意见"
                    }</span><p>${esc(
                      appointment.feedback
                    )}</p><small>${esc(formatDateTime(appointment.feedbackAt))}</small></div>`
                  : ""
              }
            </div>
            ${
              terminal
                ? `<div class="review-state-banner is-terminal">
                    ${icon("checkCircle", 18)}
                    <div>
                      <strong>${
                        appointment.status === "completed" ? "活动已完成归档" : "预约已取消"
                      }</strong>
                      <p>终态预约仅供查看，方案、活动地点与内部备注不可再编辑。</p>
                    </div>
                  </div>`
                : ""
            }
            ${
              !saved && appointment.status === "revision"
                ? `<div class="review-state-banner is-revision">
                    ${icon("edit", 18)}
                    <div>
                      <strong>机构已提出修改，等待本院更新方案</strong>
                      <p>请根据下方“机构修改意见”调整课题、专家、日期、流程或说明。保存后会重新发送给机构确认，并生成新的推送通知。</p>
                    </div>
                  </div>`
                : ""
            }
            ${
              saved
                ? `<div class="review-state-banner is-success">
                    ${icon("send", 18)}
                    <div>
                      <strong>方案已发送，推送通知已生成</strong>
                      <p>机构端已进入“方案待确认”。请复制下方号码和推送内容提醒客户；复制后系统视为已推送。</p>
                      <button class="text-link" type="button" data-action="review-edit-again">
                        继续修改方案 ${icon("chevronRight", 12)}
                      </button>
                    </div>
                  </div>`
                : ""
            }
            ${
              !assignee && !terminal
                ? `<section class="assignment-card">
                    <span class="assignment-card__eyebrow">下一步 · 接单</span>
                    <h3>确认由你跟进这个项目</h3>
                    <p>当前登录账号 ${esc(state.adminUser?.name || "")} 与手机号 ${phoneLink(
                      state.adminUser?.phone || "",
                      state.adminUser?.phone || ""
                    )} 将自动成为项目对接人，并带入方案与机构联系人。机构端在接单后才会显示具体项目对接人。</p>
                    <button class="btn btn--primary btn--block" type="button" data-action="review-accept">
                      ${icon("user", 15)} 确认接单
                    </button>
                  </section>`
                : `
                  <section class="assignee-panel">
                    <div class="assignee-panel__person">
                      <span>${esc(initialOf(assignee.name))}</span>
                      <div><small>项目对接人</small><strong>${esc(assignee.name)}</strong>
                        <p>${phoneLink(assignee.phone, assignee.phone)}</p></div>
                    </div>
                    <span class="assignee-panel__locked">${icon("lock", 11)} 由接单账号自动带入</span>
                  </section>
                `
            }
            ${
              canView
                ? `<section class="review-form ${formLocked ? "is-locked" : ""}" ${
                    formLocked ? "inert" : ""
                  }>
                    ${
                      canEdit && !saved
                        ? `<div class="plan-template-import">
                      <div class="plan-template-import__head">
                        <span>${icon("clipboard", 14)} 方案模版</span>
                        <small>${planTemplates.length} 个可用</small>
                      </div>
                      ${
                        planTemplates.length
                          ? `<div class="plan-template-import__control">
                              <select data-review-template aria-label="选择方案模版">
                                ${planTemplates
                                  .map(
                                    (template) =>
                                      `<option value="${esc(template.id)}">${esc(
                                        template.name
                                      )} · ${esc(serviceLabel(template.serviceType))}</option>`
                                  )
                                  .join("")}
                              </select>
                              <button class="btn btn--primary btn--sm" type="button"
                                data-action="review-import-template">
                                一键导入
                              </button>
                            </div>
                            <p>导入会覆盖当前课题大纲、活动流程、项目组与确认说明。</p>`
                          : `<p>暂无方案模版，可请院方运营在「方案模版」中配置。</p>`
                      }
                    </div>`
                        : ""
                    }
                    <div class="form-card">
                      <div class="form-card__head">
                        <h3>${icon("clipboard", 15)} 活动方案</h3>
                        <span>机构可见</span>
                      </div>
                      <div class="field">
                        <label>活动主题</label>
                        <input type="text" data-review-field="topic" value="${esc(draft.topic)}">
                      </div>
                      <div class="field-row">
                        <div class="field"><label>服务类型</label>
                          <select data-review-field="serviceType" data-review-service>
                            ${SERVICE_IDS.map(
                              (id) =>
                                `<option value="${esc(id)}" ${
                                  draft.serviceType === id ? "selected" : ""
                                }>${esc(serviceLabel(id))}</option>`
                            ).join("")}
                          </select>
                        </div>
                        <div class="field"><label>出讲专家</label>
                          <select data-review-field="speakerId" data-review-speaker required>
                            <option value="" disabled ${
                              draft.speakerId ? "" : "selected"
                            }>请选择本院出讲专家</option>
                            ${reviewSpeakerOptions(draft, appointment.hospitalId)}
                          </select>
                        </div>
                      </div>
                      <div class="field-row">
                        <div class="field"><label>活动日期</label>
                          <input type="date" data-review-field="date" value="${esc(draft.date)}"
                            min="${todayIso()}">
                        </div>
                        <div class="field"><label>活动时长</label>
                          <div class="field-static">${icon("clock", 14)} 全天（1 天）</div>
                        </div>
                      </div>
                      <div class="location-owned-card">
                        <span>${icon("building", 14)} 活动地点 · 机构填写</span>
                        <strong>${esc(
                          formatAddress(
                            draft.province,
                            draft.city,
                            draft.address,
                            draft.venue
                          ) || "机构尚未补充活动地点"
                        )}</strong>
                        <small>省份、详细地址与场地名称由机构在预约时填写；院方保存方案时会自动带入最新地点，不可在此覆盖。</small>
                      </div>
                      <div class="field"><label>课题大纲</label>
                        <textarea data-review-field="outline">${esc(draft.outline)}</textarea>
                      </div>
                      <div class="field"><label>活动流程</label>
                        <textarea data-review-field="agenda">${esc(draft.agenda)}</textarea>
                      </div>
                      <div class="field"><label>项目组成员</label>
                        <textarea data-review-field="team" placeholder="如：周老师（项目负责人）、张老师（现场执行）">${esc(
                          draft.team
                        )}</textarea>
                      </div>
                      <div class="field"><label>给机构的说明</label>
                        <textarea data-review-field="message">${esc(draft.message)}</textarea>
                      </div>
                      <div class="field">
                        <label>方案附件 PDF / PPT / PPTX <span>选填 · 单个文件不超过 20MB</span></label>
                        <div class="plan-pdf-upload">
                          <label class="btn btn--ghost btn--sm">
                            ${icon("clipboard", 13)} 上传附件
                            <input type="file"
                              accept=".pdf,.ppt,.pptx,application/pdf,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                              data-review-pdf hidden>
                          </label>
                          ${
                            draft.planPdf
                              ? `<span>${icon("checkCircle", 13)} <b>${esc(
                                  draft.planPdf.name
                                )}</b><small>${esc(
                                  formatFileSize(draft.planPdf.size)
                                )}</small>${
                                  canEdit && !saved
                                    ? `<button type="button" data-action="open-plan-pdf"
                                  data-appointment-id="${esc(appointment.id)}">查看</button><button type="button" data-action="review-pdf-clear">移除</button>`
                                    : ""
                                }</span>`
                              : `<small>可上传完整方案、课题提纲或执行手册</small>`
                          }
                        </div>
                      </div>
                    </div>
                    <div class="internal-note">
                      <div class="internal-note__head">
                        <h3>${icon("lock", 13)} 内部备注</h3>
                        <span>仅院方可见</span>
                      </div>
                      ${
                        state.adminNoteEditing && canEdit
                          ? `<textarea data-internal-note>${esc(appointment.internalNote || "")}</textarea>
                             <div class="internal-note__actions">
                               <button class="btn btn--ghost btn--sm" type="button" data-action="review-note-cancel">取消</button>
                               <button class="btn btn--primary btn--sm" type="button" data-action="review-note-save">保存备注</button>
                             </div>`
                          : `<p>${esc(appointment.internalNote || "暂无内部备注，可记录沟通情况、资源协调或风险点。")}</p>
                             ${
                               canEdit && !saved
                                 ? `<button class="text-link" type="button" data-action="review-note-edit">${
                                     appointment.internalNote ? "编辑备注" : "添加备注"
                                   } ${icon("chevronRight", 12)}</button>`
                                 : ""
                             }`
                      }
                    </div>
                    ${
                      canEdit && appointment.status === "confirmed"
                        ? `<div class="admin-action-card">
                            <h3>活动执行完成？</h3>
                            <p>机构已确认方案。活动结束后可标记完成，进入历史归档。</p>
                            <button class="btn btn--soft btn--sm" type="button" data-action="review-complete">标记活动完成</button>
                          </div>`
                        : ""
                    }
                  </section>`
                : ""
            }
            ${
              appointment.plan?.pdf && (saved || terminal)
                ? `<button class="plan-pdf-link" type="button" data-action="open-plan-pdf"
                    data-appointment-id="${esc(appointment.id)}">
                    <span class="plan-pdf-link__icon">${icon("clipboard", 16)}</span>
                    <span class="plan-pdf-link__meta">
                      <strong>方案附件 · ${esc(
                        appointment.plan.pdf.name || "活动方案.pdf"
                      )}</strong>
                      <small>${esc(
                        formatFileSize(appointment.plan.pdf.size)
                      )} · ${
                        planAttachmentKind(appointment.plan.pdf) === "pdf"
                          ? "点击在线预览"
                          : "点击查看或下载"
                      }</small>
                    </span>
                    ${icon("chevronRight", 14)}
                  </button>`
                : ""
            }
            ${
              appointment.plan &&
              ["review", "revision", "confirmed", "completed"].includes(appointment.status)
                ? `<section class="sms-card ${saved ? "is-primary" : ""}">
                    <div class="sms-card__head">
                      <h3>${icon("message", 14)} 推送通知</h3>
                      <span>${
                        smsCurrent
                          ? "已复制，视为已发送"
                          : smsLog
                          ? "方案已更新，需重新复制"
                          : saved
                          ? "当前可发送 · 尚未复制"
                          : "尚未发送"
                      }</span>
                    </div>
                    <div class="push-channel">
                      <div class="push-channel__head">
                        <strong>${icon("phone", 12)} 手机推送</strong>
                        <span>${esc(appointment.phone)}</span>
                      </div>
                      <p>${esc(buildSmsText(appointment))}</p>
                      <button class="btn btn--ghost btn--sm" type="button" data-action="review-sms-copy">
                        ${icon("phone", 13)} 复制号码和推送内容
                      </button>
                    </div>
                    <div class="push-channel push-channel--email">
                      <div class="push-channel__head">
                        <strong>${icon("send", 12)} 邮件推送</strong>
                        <span>${esc(mail.recipient || "机构未配置通知邮箱")}</span>
                      </div>
                      <p>${esc(`主题：${mail.subject}\n\n${mail.body}`)}</p>
                      <button class="btn btn--ghost btn--sm" type="button"
                        data-action="review-email-copy" data-appointment-id="${esc(
                          appointment.id
                        )}">
                        ${icon("send", 13)} 复制邮件内容
                      </button>
                    </div>
                  </section>`
                : ""
            }
          </div>
        </div>
        <div class="sheet__footer">
          <button class="btn btn--ghost" type="button" data-action="close-overlay">${
            saved ? "返回预约列表" : "关闭"
          }</button>
          ${
            saved
              ? `<button class="btn btn--primary" type="button" data-action="review-edit-again">
                  继续修改方案 ${icon("edit", 14)}
                </button>`
              : canEdit
              ? `<button class="btn btn--primary" type="button" data-action="review-save">
                  ${
                    appointment.status === "revision"
                      ? "更新方案并重新发送"
                      : appointment.plan
                      ? "保存并重新发送"
                      : "保存方案并发送"
                  } ${icon("send", 14)}
                </button>`
              : terminal
              ? ""
              : `<span class="sheet__footer-hint">先确认接单，再填写方案</span>`
          }
        </div>
      </section>
    `;
  }

  function appointmentRecipient(appointment) {
    const account = institutionAccountByPhone(appointment.ownerPhone);
    const user = getUser(appointment.ownerPhone);
    const snapshot = appointmentOrgSnapshot(appointment) || {};
    const name =
      appointment.contactName ||
      snapshot.name ||
      account?.name ||
      user?.name ||
      "您好";
    const title =
      appointment.contactTitle ||
      snapshot.title ||
      account?.title ||
      user?.title ||
      "";
    const orgName =
      appointment.orgName ||
      snapshot.orgName ||
      account?.orgName ||
      user?.orgName ||
      "";
    return {
      name: String(name).trim() || "您好",
      title: String(title).trim(),
      orgName: String(orgName).trim()
    };
  }

  function buildSmsText(appointment) {
    const plan = appointment.plan || {};
    const staff = appointment.assignedStaff;
    const hospital = hospitalById(appointment.hospitalId);
    const confirmed = ["confirmed", "completed"].includes(appointment.status);
    const recipient = appointmentRecipient(appointment);
    return `【${hospital?.name || "北大医疗"}】${
      recipient.orgName ? recipient.orgName + " " : ""
    }${recipient.name}${recipient.title ? "（" + recipient.title + "）" : ""}您好，您预约的${formatDateCN(
      plan.date || appointment.date
    )} ${plan.time || ""}「${plan.topic || topicOf(appointment)}」${
      confirmed ? "活动已确认" : "院方已提交活动方案，请登录平台查看并确认"
    }。地点：${formatAddress(
      appointment.province || plan.province,
      appointment.city || plan.city,
      appointment.address || plan.address,
      appointment.venue || plan.venue
    )}。项目对接人：${
      staff ? staff.name + " " + staff.phone : "院方项目组"
    }。请提前安排，如需调整请联系项目对接人。`;
  }

  function buildEmailText(appointment) {
    const account = institutionAccountByPhone(appointment.ownerPhone);
    const user = getUser(appointment.ownerPhone);
    const contact = appointmentRecipient(appointment);
    const snapshot = appointmentOrgSnapshot(appointment) || {};
    const email = appointment.email || snapshot.email || account?.email || user?.email || "";
    const subject = `【${hospitalById(appointment.hospitalId)?.name || "北大医疗"}】活动方案待确认 · ${topicOf(
      appointment
    )}`;
    const body = `${contact.name}：\n\n您预约的「${topicOf(
      appointment
    )}」活动方案已更新，请登录企业健康服务平台查看并确认。\n\n活动日期：${formatDateCN(
      appointment.plan?.date || appointment.date,
      true
    )}\n活动地点：${appointmentLocationText(appointment)}\n项目对接人：${
      appointment.assignedStaff
        ? `${appointment.assignedStaff.name} ${appointment.assignedStaff.phone}`
        : "院方项目组"
    }\n\n如信息有调整，请在平台提交修改申请或联系项目对接人。\n\n北京大学国际医院 · 名医入企`;
    return {
      recipient: email,
      subject,
      body,
      copyText: `收件人：${email || "机构未配置邮箱"}\n主题：${subject}\n\n${body}`
    };
  }

  async function copySmsForAppointment(button) {
    const appointment = appointmentById(button?.dataset.appointmentId || state.adminReviewId);
    if (!appointment) return;
    if (!adminCanManageHospital(appointment.hospitalId)) {
      return showToast("只能推送本院预约的通知。");
    }
    const text = buildSmsText(appointment);
    const payload = `${appointment.phone}\n${text}`;
    const copied = await copyText(payload);
    if (!copied) return showToast("复制失败，请手动复制。");
    saveSmsLog(appointment.id, {
      copiedAt: new Date().toISOString(),
      copiedBy: state.adminUser ? { name: state.adminUser.name, username: state.adminUser.username } : null
    });
    logOperation("复制推送通知", `${appointment.id} · ${appointment.orgName}`, {
      entityType: "appointment",
      entityId: appointment.id,
      hospitalId: appointment.hospitalId
    });
    showToast("号码和推送内容已复制，可粘贴发送给客户。");
    if (state.overlay?.type === "admin-review") renderOverlay();
    else renderApp();
  }

  async function copyEmailForAppointment(button) {
    const appointment = appointmentById(
      button?.dataset.appointmentId || state.adminReviewId
    );
    if (!appointment) return;
    if (!adminCanManageHospital(appointment.hospitalId)) {
      return showToast("只能发送本院预约的邮件提醒。");
    }
    const mail = buildEmailText(appointment);
    const copied = await copyText(mail.copyText);
    if (!copied) return showToast("复制失败，请手动复制。");
    logOperation("复制客户邮件", `${appointment.id} · ${mail.recipient || "未配置邮箱"}`, {
      entityType: "appointment",
      entityId: appointment.id,
      hospitalId: appointment.hospitalId
    });
    showToast(
      mail.recipient
        ? "收件人、主题和正文已复制，可打开邮件应用发送。"
        : "邮件内容已复制；机构尚未配置通知邮箱。"
    );
  }

  async function copyText(text) {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch {
      /* fall through */
    }
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      const ok = document.execCommand("copy");
      textarea.remove();
      return ok;
    } catch {
      return false;
    }
  }

  /* =========================================================
     Admin demands
     ========================================================= */
  function renderAdminDemandCard(demand) {
    const targetName = demandTargetName(demand);
    const meta = DEMAND_STATUS[demand.status] || DEMAND_STATUS.pending;
    return `
      <article class="admin-record" role="button" tabindex="0" data-action="open-admin-demand"
        data-demand-id="${esc(demand.id)}">
        <div class="admin-record__top">
          <span class="status-pill ${meta.cls}">${esc(meta.label)}</span>
          <span>${esc(formatDateTime(demand.createdAt))}</span>
        </div>
        <h3>${esc(demand.topic)}</h3>
        <div class="admin-record__tags">
          <span>${esc(serviceLabel(demand.serviceType))}</span>
          <span>${esc(targetName)}</span>
          <span>${esc(demand.audience || "人群待沟通")}</span>
        </div>
        <div class="admin-record__info">
          <span>${icon("building", 12)} ${esc(demand.orgName)}</span>
          <span>${icon("phone", 12)} ${phoneLink(demand.phone, demand.phone)}</span>
        </div>
        <div class="admin-record__foot">
          <span>${icon("user", 12)} ${
            demand.assignedStaff ? esc(demand.assignedStaff.name) : "尚未联系"
          }</span>
          <span>${esc(demand.id)} ${icon("chevronRight", 12)}</span>
        </div>
      </article>
    `;
  }

  function renderAdminDemandsPage() {
    const all = adminDemands();
    const filters = [
      ["all", "全部"],
      ["pending", "待联系"],
      ["contacted", "已联系"],
      ["matched", "已匹配"],
      ["cancelled", "已取消"],
      ["closed", "已关闭"]
    ];
    const list =
      state.adminDemandFilter === "all"
        ? all
        : all.filter((item) => item.status === state.adminDemandFilter);
    return `
      <div class="admin-page-head">
        <div><h1>需求池</h1><p>机构提需后电话沟通并协助匹配</p></div>
        <span class="admin-page-head__date">${all.filter((item) => item.status === "pending").length} 条待联系</span>
      </div>
      ${renderAdminTabs()}
      ${renderAdminHospitalFilter()}
      <div class="admin-stats admin-stats--three">
        <div class="admin-stat"><small>待联系</small><strong>${all.filter((item) => item.status === "pending").length}</strong><span>需电话跟进</span></div>
        <div class="admin-stat"><small>已联系</small><strong>${all.filter((item) => item.status === "contacted").length}</strong><span>沟通中</span></div>
        <div class="admin-stat"><small>已匹配</small><strong>${all.filter((item) => item.status === "matched").length}</strong><span>已安排资源</span></div>
      </div>
      <div class="filter-scroll filter-scroll--admin">
        ${filters
          .map(
            ([id, label]) =>
              `<button class="chip ${
                state.adminDemandFilter === id ? "is-active" : ""
              }" type="button" data-action="admin-demand-filter" data-value="${id}">${label}</button>`
          )
          .join("")}
      </div>
      <div id="admin-demand-results">${adminDemandResultsMarkup(list)}</div>
    `;
  }

  function adminDemandResultsMarkup(list) {
    return list.length
      ? `<div class="admin-record-list">${list.map(renderAdminDemandCard).join("")}</div>`
      : `<div class="empty-state"><span class="empty-state__icon">${icon(
          "sparkles",
          26
        )}</span><h3>暂无提需</h3><p>机构提交提需后会出现在这里。</p></div>`;
  }

  function refreshAdminDemandList() {
    const wrap = document.getElementById("admin-demand-results");
    if (!wrap) return;
    const all = adminDemands();
    const list =
      state.adminDemandFilter === "all"
        ? all
        : all.filter((item) => item.status === state.adminDemandFilter);
    wrap.innerHTML = adminDemandResultsMarkup(list);
    document.querySelectorAll('[data-action="admin-demand-filter"]').forEach((button) => {
      button.classList.toggle("is-active", button.dataset.value === state.adminDemandFilter);
    });
  }

  function demandMatchDoctorOptions(demand, selectedId = "") {
    const service = normalizeService(demand?.serviceType || "讲座");
    const hospitals = demand?.targetType === "hospital"
      ? state.hospitals.filter((hospital) => hospital.id === demand.hospitalId)
      : state.hospitals;
    return hospitals
      .map((hospital) => {
        const experts = state.experts
          .filter(
            (expert) =>
              expert.hospitalId === hospital.id &&
              expert.active !== false &&
              matchesService(expert, service)
          )
          .sort(
            (a, b) =>
              TIER_ORDER.indexOf(a.tier) - TIER_ORDER.indexOf(b.tier) ||
              a.name.localeCompare(b.name, "zh-CN")
          );
        if (!experts.length) return "";
        return `<optgroup label="${esc(hospital.short || hospital.name)}">
          ${experts
            .map(
              (expert) =>
                `<option value="${esc(expert.id)}" ${
                  selectedId === expert.id ? "selected" : ""
                }>${esc(expert.name)} · ${esc(expert.deptTitle)} · ${esc(
                  TIER_ORDER.includes(expert.tier) ? TIERS[expert.tier].short : ""
                )}</option>`
            )
            .join("")}
        </optgroup>`;
      })
      .join("");
  }

  function renderAdminDemandSheet() {
    const demand = demandById(state.adminDemandId);
    if (!demand) return "";
    const targetName = demandTargetName(demand);
    const isGroup = demand.targetType === "group";
    const meta = DEMAND_STATUS[demand.status] || DEMAND_STATUS.pending;
    return `
      <div class="sheet-backdrop" data-action="close-overlay"></div>
      <section class="sheet" role="dialog" aria-modal="true" aria-label="需求详情">
        <div class="sheet__grabber"></div>
        <div class="sheet__bar">
          <div><h2>需求详情</h2><p>${esc(demand.id)}</p></div>
          <button class="sheet__close" type="button" data-action="close-overlay" aria-label="关闭">
            ${icon("close", 15)}
          </button>
        </div>
        <div class="sheet__body">
          <div class="sheet-pad">
            <div class="record-head">
              <div>
                <span class="record-head__tag">${esc(serviceLabel(demand.serviceType))} · ${esc(
                  targetName
                )}</span>
                <h1>${esc(demand.topic)}</h1>
                <p>${esc(demand.audience || "人群待沟通")} · ${esc(
                  demand.headcount ? demand.headcount + " 人" : "人数待确认"
                )}</p>
              </div>
              <span class="status-pill ${meta.cls}">${esc(meta.label)}</span>
            </div>
            ${
              isGroup
                ? `<section class="demand-route-note">
                    ${icon("shield", 15)}
                    <div>
                      <strong>集团企康办 · 超级管理员需求池</strong>
                      <p>该需求仅超级管理员可见，请直接电话联系机构并统筹匹配，不需要分配具体医院运营。</p>
                    </div>
                  </section>`
                : ""
            }
            <section class="info-card">
              <div class="info-row"><span>机构</span><strong>${esc(demand.orgName)}</strong></div>
              <div class="info-row"><span>目标机构</span><strong>${esc(
                targetName
              )}</strong></div>
              <div class="info-row"><span>联系人</span><strong>${esc(
                demand.contactName
              )} · ${phoneLink(demand.phone, demand.phone)}</strong></div>
              <div class="info-row"><span>期望日期</span><strong>${esc(
                demand.preferredDate ? formatDateCN(demand.preferredDate, true) : "待沟通"
              )}</strong></div>
              <div class="info-row"><span>活动地区</span><strong>${esc(
                regionText(demand.province, demand.city)
              )}</strong></div>
              <div class="info-row"><span>${isGroup ? "集团对接人" : "院方对接人"}</span><strong>${assigneeMarkup(
                demand.assignedStaff
              )}</strong></div>
              ${
                demand.note
                  ? `<div class="info-row info-row--block"><span>需求说明</span><strong>${esc(
                      demand.note
                    )}</strong></div>`
                  : ""
              }
            </section>
            ${
              demand.status !== "closed"
                ? `<section class="demand-match-card">
                    <h3>${icon("experts", 14)} 匹配专家</h3>
                    <p>选择已确认可出讲的专家，机构确认匹配后可直接转成预约单，无需重复填写需求。</p>
                    <select data-demand-match-doctor>
                      <option value="">请选择匹配专家</option>
                      ${demandMatchDoctorOptions(demand, demand.matchedExpertId || "")}
                    </select>
                  </section>`
                : ""
            }
            <section class="followup-card">
              <h3>${icon("message", 14)} 沟通记录</h3>
              ${
                demand.followUps?.length
                  ? demand.followUps
                      .map(
                        (item) =>
                          `<div class="followup-item"><p>${esc(item.note)}</p><small>${esc(
                            item.by?.name || "院方"
                          )} · ${esc(formatDateTime(item.at))}</small></div>`
                      )
                      .join("")
                  : `<p class="muted">暂无沟通记录。建议先电话联系机构确认需求。</p>`
              }
              <textarea data-demand-followup placeholder="记录电话沟通结果、可匹配专家或待确认事项"></textarea>
              <div class="followup-card__actions ${
                ["matched", "closed"].includes(demand.status)
                  ? "is-single"
                  : demand.status === "pending"
                  ? ""
                  : "is-contacted"
              }">
                <button class="btn ${
                  demand.status === "pending" ? "btn--primary" : "btn--ghost"
                } btn--sm" type="button" data-action="admin-demand-followup">${
                  demand.status === "pending" ? "保存并标记已联系" : "保存沟通记录"
                }</button>
                ${
                  ["matched", "closed"].includes(demand.status)
                    ? ""
                    : `<button class="btn ${
                        demand.status === "pending" ? "btn--ghost" : "btn--primary"
                      } btn--sm" type="button" data-action="admin-demand-match">标记已匹配</button>`
                }
              </div>
            </section>
            ${
              demand.status !== "closed"
                ? `<button class="text-link text-link--danger record-cancel" type="button"
                    data-action="admin-demand-close">关闭该需求</button>`
                : ""
            }
          </div>
        </div>
        <div class="sheet__footer">
          <a class="btn btn--primary" href="${esc(phoneHref(demand.phone))}">${icon(
            "phone",
            14
          )} 联系机构</a>
        </div>
      </section>
    `;
  }

  function markDemandContacted(note = "") {
    const demand = demandById(state.adminDemandId);
    if (!demand || !state.adminUser) return;
    if (!adminCanManageDemand(demand)) {
      return showToast(
        demand.targetType === "group"
          ? "集团企康办需求仅超级管理员可跟进。"
          : "只能跟进本院需求。"
      );
    }
    const followUps = (demand.followUps || []).slice();
    if (note) {
      followUps.push({
        note,
        at: new Date().toISOString(),
        by: { name: state.adminUser.name, username: state.adminUser.username }
      });
    }
    const wasPending = demand.status === "pending";
    updateDemand(demand.id, {
      status: wasPending ? "contacted" : demand.status,
      assignedStaff: demand.assignedStaff || staffSnapshot(state.adminUser),
      contactedAt: demand.contactedAt || new Date().toISOString(),
      followUps
    });
    logOperation(note ? "记录提需沟通" : "标记提需已联系", `${demand.id} · ${demand.topic}`, {
      entityType: "demand",
      entityId: demand.id,
      hospitalId: demand.hospitalId
    });
    renderOverlay();
    showToast(
      wasPending
        ? "已标记为已联系，请继续匹配资源。"
        : note
        ? "沟通记录已保存。"
        : "已保存沟通记录。"
    );
  }

  function adminDemandMatch() {
    const demand = demandById(state.adminDemandId);
    if (!demand) return;
    if (!adminCanManageDemand(demand)) {
      return showToast(
        demand.targetType === "group"
          ? "集团企康办需求仅超级管理员可跟进。"
          : "只能跟进本院需求。"
      );
    }
    if (demand.status === "pending") {
      return showToast("请先保存沟通记录并标记「已联系」，再标记已匹配。");
    }
    if (demand.status === "closed") {
      return showToast("该需求已关闭，不能再标记为已匹配。");
    }
    const doctorId = String(
      overlayRoot.querySelector("[data-demand-match-doctor]")?.value || ""
    );
    if (!doctorId) {
      return showToast("请选择一位已确认可出讲的匹配专家。");
    }
    const expert = expertById(doctorId);
    if (!expert || expert.active === false) {
      return showToast("所选专家已失效，请重新选择。");
    }
    if (!matchesService(expert, demand.serviceType)) {
      return showToast(
        `${expert.name} 不提供「${serviceLabel(demand.serviceType)}」服务，请更换专家。`
      );
    }
    if (demand.targetType === "hospital" && demand.hospitalId !== expert.hospitalId) {
      return showToast("匹配专家必须属于机构指定的目标医院。");
    }
    const hospital = hospitalById(expert.hospitalId);
    if (!hospital) return showToast("匹配专家所属医院不存在，请重新选择。");
    updateDemand(demand.id, {
      status: "matched",
      matchedExpertId: expert.id,
      matchedExpertName: expert.name,
      matchedHospitalId: expert.hospitalId,
      matchedAt: new Date().toISOString(),
      assignedStaff: demand.assignedStaff || staffSnapshot(state.adminUser),
      matchNote: `已匹配 ${expert.name} · ${hospital.name}`
    });
    logOperation(
      "提需匹配专家",
      `${demand.id} · ${demand.topic} · ${expert.name} / ${hospital.name}`,
      {
      entityType: "demand",
      entityId: demand.id,
      hospitalId: demand.hospitalId
      }
    );
    renderOverlay();
    showToast(`已匹配 ${expert.name}，机构可基于提需直接发起预约。`);
  }

  function adminDemandClose() {
    const demand = demandById(state.adminDemandId);
    if (!demand) return;
    if (!adminCanManageDemand(demand)) {
      return showToast(
        demand.targetType === "group"
          ? "集团企康办需求仅超级管理员可跟进。"
          : "只能跟进本院需求。"
      );
    }
    updateDemand(demand.id, { status: "closed", closedAt: new Date().toISOString() });
    logOperation("关闭机构提需", `${demand.id} · ${demand.topic}`, {
      entityType: "demand",
      entityId: demand.id,
      hospitalId: demand.hospitalId
    });
    renderOverlay();
    showToast("需求已关闭。");
  }

  /* =========================================================
     Admin slot config (day level)
     ========================================================= */
  function slotHospital() {
    return operatorHospital();
  }

  function slotDoctors() {
    const hospital = slotHospital();
    if (!hospital) return [];
    return state.experts
      .filter((expert) => {
        if (expert.active === false) return false;
        if (expert.hospitalId !== hospital.id) return false;
        return true;
      })
      .sort((a, b) => {
        const order = TIER_ORDER.indexOf(a.tier) - TIER_ORDER.indexOf(b.tier);
        return order || a.name.localeCompare(b.name, "zh-CN");
      });
  }

  function ensureSlotState() {
    const doctors = slotDoctors();
    if (!doctors.length) return null;
    if (!doctors.some((item) => item.id === state.slotDoctorId)) {
      state.slotDoctorId = doctors[0].id;
    }
    const doctor = doctors.find((item) => item.id === state.slotDoctorId) || doctors[0];
    if (state.slotMonthDoctor !== doctor.id) {
      const lead = Math.max(1, Number(doctor.leadDays) || tierOf(doctor).leadDays);
      const leadDate = isoDate(addDays(startOfDay(), lead));
      const firstConfigured = Object.keys(getSlots(doctor.id))
        .filter((date) => date >= leadDate && Number(getSlots(doctor.id)[date]) > 0)
        .sort()[0];
      state.slotMonth = (firstConfigured || leadDate).slice(0, 7);
      state.slotMonthDoctor = doctor.id;
    }
    if (!state.slotDraft) state.slotDraft = {};
    const batch = state.slotBatch || {};
    const lead = Math.max(1, Number(doctor.leadDays) || tierOf(doctor).leadDays);
    if (!batch.from) batch.from = isoDate(addDays(startOfDay(), lead));
    if (!batch.to) batch.to = isoDate(addDays(startOfDay(), lead + 30));
    state.slotBatch = batch;
    return doctor;
  }

  function selectedSlotDoctor() {
    return state.experts.find((item) => item.id === state.slotDoctorId) || null;
  }

  function baseSlot(doctorId, dateIso) {
    return Number(getSlots(doctorId)[dateIso] || 0);
  }

  function draftSlot(doctorId, dateIso) {
    const value = state.slotDraft?.[doctorId]?.[dateIso];
    return value === undefined ? baseSlot(doctorId, dateIso) : Number(value);
  }

  function setDraftSlot(doctorId, dateIso, value) {
    const next = Math.max(0, Math.min(30, Number(value) || 0));
    if (!state.slotDraft) state.slotDraft = {};
    if (!state.slotDraft[doctorId]) state.slotDraft[doctorId] = {};
    state.slotDraft[doctorId][dateIso] = next;
  }

  function slotDraftChangeCount() {
    let count = 0;
    Object.entries(state.slotDraft || {}).forEach(([doctorId, dates]) => {
      Object.entries(dates).forEach(([date, value]) => {
        if (Number(value) !== baseSlot(doctorId, date)) count += 1;
      });
    });
    return count;
  }

  function shiftSlotMonth(delta) {
    const [year, month] = state.slotMonth.split("-").map(Number);
    const next = new Date(year, month - 1 + delta, 1, 12);
    state.slotMonth = `${next.getFullYear()}-${pad(next.getMonth() + 1)}`;
    renderSlotConfigContent();
  }

  function renderSlotMonthNav() {
    const [year, month] = state.slotMonth.split("-").map(Number);
    return `
      <div class="slot-month-nav">
        <button class="icon-button" type="button" data-action="slot-month" data-value="-1" aria-label="上个月">${icon(
          "chevronLeft",
          16
        )}</button>
        <strong>${year} 年 ${month} 月</strong>
        <button class="icon-button" type="button" data-action="slot-month" data-value="1" aria-label="下个月">${icon(
          "chevronRight",
          16
        )}</button>
      </div>
    `;
  }

  function renderSlotDoctorRail(current) {
    const doctors = slotDoctors();
    return `
      <section class="slot-doctor-rail">
        <div class="slot-doctor-rail__head">
          <h3>${icon("users", 15)} 专家排班</h3>
          <span>${doctors.length} 位专家 · 点击快速切换</span>
        </div>
        <div class="slot-doctor-rail__scroller">
          ${doctors
            .map((doctor) => {
              const availability = doctorAvailability(doctor);
              return `
                <button class="slot-doctor-chip ${
                  doctor.id === current.id ? "is-active" : ""
                }" type="button" data-action="slot-doctor-pick" data-doctor-id="${esc(doctor.id)}">
                  <img src="${esc(expertAvatar(doctor))}" alt="${esc(doctor.name)}" loading="lazy">
                  <span>
                    <strong>${esc(doctor.name)}</strong>
                    <small>${esc(tierOf(doctor).short)} · ${availability.dates.length} 个可约日</small>
                  </span>
                  <i>${doctor.id === current.id ? icon("check", 11) : icon("chevronRight", 11)}</i>
                </button>
              `;
            })
            .join("")}
        </div>
      </section>
    `;
  }

  function renderSlotCalendar(doctor) {
    const [year, month] = state.slotMonth.split("-").map(Number);
    const first = new Date(year, month - 1, 1, 12);
    const days = new Date(year, month, 0, 12).getDate();
    const startBlank = first.getDay();
    const today = todayIso();
    const leadDate = isoDate(
      addDays(startOfDay(), Math.max(1, Number(doctor.leadDays) || tierOf(doctor).leadDays))
    );
    const baseMap = getSlots(doctor.id);
    const draftMap = state.slotDraft?.[doctor.id] || {};
    const bookedMap = bookedCountMap(doctor.id);
    const cells = [];
    for (let i = 0; i < startBlank; i += 1) cells.push(`<span class="slot-cell is-blank"></span>`);
    for (let day = 1; day <= days; day += 1) {
      const date = `${year}-${pad(month)}-${pad(day)}`;
      const baseValue = Number(baseMap[date] || 0);
      const value =
        draftMap[date] === undefined ? baseValue : Number(draftMap[date] || 0);
      const booked = bookedMap[date] || 0;
      const isPast = date < today;
      const beforeLead = date < leadDate;
      const changed = value !== baseValue;
      cells.push(`
        <button class="slot-cell ${value ? "has-capacity" : "is-off"} ${
          date === today ? "is-today" : ""
        } ${isPast ? "is-past" : ""} ${beforeLead ? "is-lead" : ""} ${
          changed ? "is-changed" : ""
        }" type="button"
          data-action="slot-day-open" data-value="${date}" ${
            isPast || beforeLead ? "disabled" : ""
          }>
          <span class="slot-cell__day">${day}</span>
          <strong>${value ? value : "—"}</strong>
          <small>${
            beforeLead ? "未到预约期" : booked ? `已约 ${booked}` : "可约"
          }</small>
        </button>
      `);
    }
    return `
      <div class="slot-calendar">
        <div class="slot-weekdays">${["日", "一", "二", "三", "四", "五", "六"]
          .map((day) => `<span>${day}</span>`)
          .join("")}</div>
        <div class="slot-grid">${cells.join("")}</div>
      </div>
      <p class="slot-legend"><i class="is-open"></i> 可配置 <i class="is-full"></i> 已有预约 <i class="is-changed"></i> 本次修改 <i class="is-lead"></i> 未到预约周期</p>
    `;
  }

  function renderSlotBatchCard(doctor) {
    const batch = state.slotBatch;
    const scopeLabel = batch.scope === "hospital" ? "本院全部专家" : `当前专家 · ${doctor.name}`;
    const weekdayText = batch.weekdays.length
      ? batch.weekdays
          .slice()
          .sort((a, b) => a - b)
          .map((day) => ["日", "一", "二", "三", "四", "五", "六"][day])
          .join("、")
      : "未选择";
    return `
      <section class="batch-card slot-batch-card">
        <div class="batch-card__head">
          <h3>${icon("sparkles", 15)} 批量设置可约日</h3>
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
            <input type="date" data-slot-batch="from" value="${esc(batch.from)}">
          </div>
          <div class="field"><label>结束日期</label>
            <input type="date" data-slot-batch="to" value="${esc(batch.to)}">
          </div>
        </div>
        <div class="field">
          <label>每周可约日</label>
          <div class="weekday-chips">
            ${["日", "一", "二", "三", "四", "五", "六"]
              .map(
                (label, index) =>
                  `<button class="${batch.weekdays.includes(index) ? "is-active" : ""}" type="button"
                    data-action="slot-weekday" data-value="${index}">${label}</button>`
              )
              .join("")}
          </div>
        </div>
        <div class="field-row">
          <div class="field"><label>每日号源</label>
            <input type="number" inputmode="numeric" min="0" max="30" data-slot-batch="capacity" value="${esc(
              batch.capacity
            )}">
          </div>
          <div class="field"><label>设置给谁</label>
            <select data-slot-batch="scope">
              <option value="one" ${batch.scope === "one" ? "selected" : ""}>当前专家</option>
              <option value="hospital" ${batch.scope === "hospital" ? "selected" : ""}>本院全部专家</option>
            </select>
          </div>
        </div>
        <div class="slot-batch-summary">
          ${icon("alert", 13)}
          <span>${esc(scopeLabel)} · 每周 ${esc(weekdayText)} · 每日 ${esc(
            batch.capacity
          )} 个 · ${esc(batch.from || "未选")} 至 ${esc(batch.to || "未选")}</span>
        </div>
        <button class="btn btn--soft btn--block" type="button" data-action="slot-batch-apply">
          ${icon("plus", 14)} 加入待保存
        </button>
        <p class="batch-card__hint">号源数不会低于已预约人数；早于专家提前预约周期的日期会自动跳过。批量加入后仍可点日历中的某一天单独微调。</p>
      </section>
    `;
  }

  function refreshSlotBatchSummary() {
    const batch = state.slotBatch;
    const doctor = selectedSlotDoctor();
    if (!batch) return;
    const fromInput = document.querySelector('[data-slot-batch="from"]');
    const toInput = document.querySelector('[data-slot-batch="to"]');
    if (fromInput) fromInput.value = batch.from || "";
    if (toInput) toInput.value = batch.to || "";
    const summary = document.querySelector(".slot-batch-summary span");
    if (!summary) return;
    const scopeLabel =
      batch.scope === "hospital" ? "本院全部专家" : `当前专家 · ${doctor?.name || ""}`;
    const weekdayText = batch.weekdays.length
      ? batch.weekdays
          .slice()
          .sort((a, b) => a - b)
          .map((day) => ["日", "一", "二", "三", "四", "五", "六"][day])
          .join("、")
      : "未选择";
    summary.textContent = `${scopeLabel} · 每周 ${weekdayText} · 每日 ${
      batch.capacity
    } 个 · ${batch.from || "未选"} 至 ${batch.to || "未选"}`;
  }

  function renderSlotConfigContent() {
    const doctor = ensureSlotState();
    const wrap = document.getElementById("slot-content");
    if (!wrap) return;
    if (!doctor) {
      wrap.innerHTML = `<div class="empty-state"><span class="empty-state__icon">${icon(
        "clock",
        26
      )}</span><h3>暂无专家</h3><p>请先在“专家”中新增本院专家。</p></div>`;
      return;
    }
    wrap.innerHTML = `
      ${renderSlotDoctorRail(doctor)}
      <div class="slot-doctor-card">
        <img src="${esc(expertAvatar(doctor))}" alt="${esc(doctor.name)}">
        <div>
          <strong>${esc(doctor.name)} · ${esc(tierOf(doctor).short)}</strong>
          <span><strong class="hospital-name">${esc(doctor.hospital)}</strong> · ${esc(
            doctor.deptTitle
          )}</span>
          <small>${esc(doctor.leadLabel)} · 按整天配置，不区分时段</small>
        </div>
        <select data-slot-doctor>
          ${slotDoctors()
            .map(
              (item) =>
                `<option value="${esc(item.id)}" ${item.id === doctor.id ? "selected" : ""}>${esc(
                  item.name
                )} · ${esc(item.deptTitle)}</option>`
            )
            .join("")}
        </select>
      </div>
      ${renderSlotBatchCard(doctor)}
      ${renderSlotMonthNav()}
      ${renderSlotCalendar(doctor)}
    `;
    refreshSlotSaveBar();
  }

  function refreshSlotSaveBar() {
    const bar = document.getElementById("slot-savebar");
    if (!bar) return;
    const count = slotDraftChangeCount();
    bar.innerHTML = `
      <span>${count ? `${count} 处修改未保存` : "暂无修改"}</span>
      <div>
        <button class="btn btn--ghost btn--sm" type="button" data-action="slot-reset" ${
          count ? "" : "disabled"
        }>重置</button>
        <button class="btn btn--primary btn--sm" type="button" data-action="slot-save" ${
          count ? "" : "disabled"
        }>统一保存</button>
      </div>
    `;
  }

  function renderSlotConfigPage() {
    const hospital = slotHospital();
    return `
      <div class="admin-page-head">
        <div><h1>号源配置</h1><p>按天配置，不划分时间段</p></div>
        <span class="admin-page-head__date">${esc(hospital?.name || "未选择医院")}</span>
      </div>
      ${renderAdminTabs()}
      ${renderAdminHospitalFilter()}
      ${
        !hospital
          ? `<div class="empty-state"><span class="empty-state__icon">${icon(
              "building",
              26
            )}</span><h3>请选择医院</h3><p>超级管理员需先选择医院，再维护该院专家的可预约号源。</p></div>`
          : `<div id="slot-content" class="slot-content"></div>
             <div id="slot-savebar" class="slot-savebar"></div>`
      }
    `;
  }

  function openSlotDay(dateIso) {
    const doctor = selectedSlotDoctor();
    if (!doctor) return;
    const leadDate = isoDate(
      addDays(startOfDay(), Math.max(1, Number(doctor.leadDays) || tierOf(doctor).leadDays))
    );
    if (dateIso < leadDate) {
      return showToast(`${doctor.name} ${formatMD(dateIso)} 尚未进入可预约周期，不能配置号源。`);
    }
    state.slotDay = dateIso;
    state.overlay = { type: "slot-day", doctorId: doctor.id, date: dateIso };
    renderOverlay();
  }

  function renderSlotDaySheet() {
    const doctor = expertById(state.overlay?.doctorId) || selectedSlotDoctor();
    const date = state.overlay?.date || state.slotDay;
    if (!doctor || !date) return "";
    const value = draftSlot(doctor.id, date);
    const booked = bookedCount(doctor.id, date);
    return `
      <div class="sheet-backdrop" data-action="close-overlay"></div>
      <section class="sheet slot-day-sheet" role="dialog" aria-modal="true" aria-label="设置当日号源">
        <div class="sheet__grabber"></div>
        <div class="sheet__bar">
          <div><h2>${esc(formatDateCN(date, true))}</h2><p>${esc(doctor.name)} · 按天设置</p></div>
          <button class="sheet__close" type="button" data-action="close-overlay" aria-label="关闭">
            ${icon("close", 15)}
          </button>
        </div>
        <div class="sheet__body">
          <div class="sheet-pad">
            <div class="slot-day-card">
              <span>当日号源数</span>
              <div class="slot-stepper">
                <button type="button" data-action="slot-day-step" data-value="-1" ${
                  value <= 0 ? "disabled" : ""
                }>${icon("minus", 18)}</button>
                <strong>${value}</strong>
                <button type="button" data-action="slot-day-step" data-value="1">${icon(
                  "plus",
                  18
                )}</button>
              </div>
              <p>已预约 <b>${booked}</b> 人，号源数不能低于已预约数量。</p>
            </div>
            <div class="slot-day-presets">
              ${[0, 1, 2, 3, 4]
                .map(
                  (num) =>
                    `<button class="${value === num ? "is-active" : ""}" type="button"
                      data-action="slot-day-set" data-value="${num}">${
                      num === 0 ? "停诊" : num + " 个"
                    }</button>`
                )
                .join("")}
            </div>
            ${
              value < booked
                ? `<p class="slot-warning">${icon(
                    "alert",
                    13
                  )} 当日已有 ${booked} 个预约，号源数不能低于 ${booked}。</p>`
                : ""
            }
          </div>
        </div>
        <div class="sheet__footer">
          <button class="btn btn--ghost" type="button" data-action="close-overlay">取消</button>
          <button class="btn btn--primary" type="button" data-action="slot-day-save" ${
            value < booked ? "disabled" : ""
          }>加入草稿</button>
        </div>
      </section>
    `;
  }

  function stepSlotDay(delta) {
    const doctor = expertById(state.overlay?.doctorId);
    const date = state.overlay?.date;
    if (!doctor || !date) return;
    const booked = bookedCount(doctor.id, date);
    const next = Math.max(booked, Math.max(0, draftSlot(doctor.id, date) + Number(delta)));
    setDraftSlot(doctor.id, date, next);
    renderOverlay();
  }

  function applySlotBatch({ save = false } = {}) {
    const doctor = selectedSlotDoctor();
    const batch = state.slotBatch;
    if (!doctor || !batch) return;
    if (!batch.from || !batch.to || batch.from > batch.to) {
      return showToast("请选择正确的日期范围。");
    }
    if (!batch.weekdays.length) return showToast("请至少选择一个星期。");
    const capacity = Math.max(0, Number(batch.capacity) || 0);
    const doctors =
      batch.scope === "hospital" ? slotDoctors() : state.experts.filter((item) => item.id === doctor.id);
    let applied = 0;
    let adjusted = 0;
    let skipped = 0;
    doctors.forEach((item) => {
      const leadDate = isoDate(
        addDays(startOfDay(), Math.max(1, Number(item.leadDays) || tierOf(item).leadDays))
      );
      let date = parseDate(batch.from);
      const end = parseDate(batch.to);
      while (date && end && date <= end) {
        if (batch.weekdays.includes(date.getDay())) {
          const iso = isoDate(date);
          if (iso < leadDate) {
            skipped += 1;
            date = addDays(date, 1);
            continue;
          }
          const booked = bookedCount(item.id, iso);
          const value = Math.max(capacity, booked);
          if (value !== capacity) adjusted += 1;
          setDraftSlot(item.id, iso, value);
          applied += 1;
        }
        date = addDays(date, 1);
      }
    });
    const previousMonth = state.slotMonth;
    if (applied && /^\d{4}-\d{2}/.test(batch.from)) {
      state.slotMonth = batch.from.slice(0, 7);
    }
    const monthHint =
      applied && state.slotMonth !== previousMonth
        ? `，已定位到 ${Number(state.slotMonth.slice(5))} 月`
        : "";
    if (save) {
      saveSlotDraft();
      showToast(
        `已快速保存：${doctors.length} 位专家、${applied} 个日期${
          adjusted ? `，${adjusted} 天因已有预约自动抬高` : ""
        }${skipped ? `，跳过 ${skipped} 个早于预约周期的日期` : ""}${monthHint}。`
      );
    } else {
      renderSlotConfigContent();
      showToast(
        `已应用到草稿：${applied} 个日期${
          adjusted ? `，${adjusted} 天因已有预约自动抬高` : ""
        }${skipped ? `，跳过 ${skipped} 个早于预约周期的日期` : ""}${monthHint}。`
      );
    }
  }

  function saveSlotDraft() {
    const entries = Object.entries(state.slotDraft || {});
    let invalid = "";
    entries.forEach(([doctorId, dates]) => {
      Object.entries(dates).forEach(([date, value]) => {
        const booked = bookedCount(doctorId, date);
        if (Number(value) < booked) {
          const doctor = expertById(doctorId);
          invalid = `${doctor?.name || "专家"} ${formatMD(date)} 已约 ${booked} 人，号源不能设为 ${value}。`;
        }
      });
    });
    if (invalid) return showToast(invalid);
    const all = getAllSlots();
    entries.forEach(([doctorId, dates]) => {
      all[doctorId] = all[doctorId] || {};
      Object.entries(dates).forEach(([date, value]) => {
        all[doctorId][date] = Number(value);
      });
    });
    saveAllSlots(all);
    state.slotDraft = {};
    renderSlotConfigContent();
    logOperation(
      "统一保存专家号源",
      `${entries.length} 位专家 · ${entries.reduce(
        (sum, [, dates]) => sum + Object.keys(dates).length,
        0
      )} 个日期`,
      {
        entityType: "slot",
        entityId: slotHospital()?.id || "",
        hospitalId: slotHospital()?.id || ""
      }
    );
    showToast("号源已统一保存。");
  }

  function resetSlotDraft() {
    state.slotDraft = {};
    renderSlotConfigContent();
    showToast("未保存的修改已重置。");
  }

  /* =========================================================
     Admin plan templates
     ========================================================= */
  function defaultPlanTemplateSeeds() {
    return state.hospitals.flatMap((hospital) => [
      {
        id: `tpl-${hospital.id}-lecture`,
        hospitalId: hospital.id,
        name: "标准讲座方案",
        serviceType: "讲座",
        topic: "",
        outline:
          "1. 企业人群健康风险概览\n2. 专家主题分享\n3. 常见问题与误区\n4. 现场问答与健康咨询",
        agenda:
          "09:00-09:20 签到与开场\n09:20-10:20 专家主题分享\n10:20-10:50 现场问答\n10:50-11:30 健康咨询",
        team: "院方项目负责人、现场执行",
        message:
          "院方已完成专家与课题匹配，请确认活动日期、地点与流程。如人数或场地有变化，请提前联系项目对接人。",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: `tpl-${hospital.id}-consult`,
        hospitalId: hospital.id,
        name: "企业健康咨询",
        serviceType: "健康咨询",
        topic: "",
        outline:
          "1. 健康风险筛查\n2. 分组一对一咨询\n3. 重点人群健康建议\n4. 现场问题汇总",
        agenda:
          "09:00-09:20 场地准备与签到\n09:20-11:30 分组健康咨询\n11:30-12:00 汇总答疑",
        team: "院方项目负责人、现场执行",
        message:
          "院方已完成咨询专家与现场安排，请确认活动日期、场地与人员组织方式。如需调整，请提前联系项目对接人。",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]);
  }

  function getPlanTemplateStore() {
    const stored = readJSON(STORAGE.planTemplates, null);
    if (Array.isArray(stored)) return stored;
    const seeded = defaultPlanTemplateSeeds();
    writeJSON(STORAGE.planTemplates, seeded);
    return seeded;
  }

  function savePlanTemplateStore(templates) {
    writeJSON(STORAGE.planTemplates, templates);
  }

  function getPlanTemplates(hospitalId) {
    if (!hospitalId) return [];
    return getPlanTemplateStore()
      .filter((template) => template.hospitalId === hospitalId)
      .sort((a, b) => String(b.updatedAt || "").localeCompare(String(a.updatedAt || "")));
  }

  function activePlanTemplateHospital() {
    if (isSuperadmin()) {
      return state.adminHospitalId ? hospitalById(state.adminHospitalId) : null;
    }
    return operatorHospital();
  }

  function templateServiceOptions(selected = "讲座") {
    return SERVICE_IDS.map(
      (service) =>
        `<option value="${esc(service)}" ${service === selected ? "selected" : ""}>${esc(
          serviceLabel(service)
        )}</option>`
    ).join("");
  }

  function openAdminTemplateEditor(id = "") {
    const hospital = activePlanTemplateHospital();
    if (!hospital) return showToast("请先选择医院。");
    const template = id
      ? getPlanTemplates(hospital.id).find((item) => item.id === id)
      : null;
    state.adminTemplateDraft = template
      ? clone(template)
      : {
          id: "",
          hospitalId: hospital.id,
          name: "",
          serviceType: "讲座",
          topic: "",
          outline: "",
          agenda: "",
          team: "",
          message: ""
        };
    state.overlay = { type: "admin-template" };
    renderOverlay();
  }

  function renderAdminTemplatesPage() {
    const hospital = activePlanTemplateHospital();
    if (!hospital) {
      return `
        <div class="admin-page-head">
          <div><h1>方案模版</h1><p>维护院方标准活动方案内容</p></div>
        </div>
        ${renderAdminTabs()}
        ${renderAdminHospitalFilter()}
        <div class="empty-state"><span class="empty-state__icon">${icon(
          "building",
          26
        )}</span><h3>请选择医院</h3><p>超级管理员需先选择医院，再维护该院方案模版。</p></div>
      `;
    }
    const templates = getPlanTemplates(hospital.id);
    return `
      <div class="admin-page-head">
        <div><h1>方案模版</h1><p>${esc(hospital.short)} · 标准内容可一键导入</p></div>
        <button class="btn btn--primary btn--sm" type="button" data-action="admin-template-add">
          ${icon("plus", 14)} 新增模版
        </button>
      </div>
      ${renderAdminTabs()}
      ${renderAdminHospitalFilter()}
      <p class="admin-hint">${icon(
        "clipboard",
        12
      )} 模版保存活动主题、服务类型、课题大纲、流程、项目组与确认说明；具体日期、地点和项目对接人按每场预约自动带入，场地与详细地址由机构填写。</p>
      <div class="plan-template-list">
        ${
          templates.length
            ? templates
                .map(
                  (template) => `
                    <article class="plan-template-card">
                      <div class="plan-template-card__top">
                        <span>${esc(serviceLabel(template.serviceType))}</span>
                        <strong>${esc(template.name)}</strong>
                        <small>更新于 ${esc(formatDateTime(template.updatedAt))}</small>
                      </div>
                      ${
                        template.topic
                          ? `<p class="plan-template-card__topic">${icon(
                              "sparkles",
                              12
                            )} ${esc(template.topic)}</p>`
                          : ""
                      }
                      <p class="plan-template-card__preview">${esc(
                        cleanText(template.outline || template.agenda || template.message, 110)
                      )}</p>
                      <div class="plan-template-card__meta">
                        <span>${icon("users", 11)} ${esc(
                          template.team || "未设置项目组"
                        )}</span>
                      </div>
                      <div class="plan-template-card__actions">
                        <button class="btn btn--ghost btn--sm" type="button"
                          data-action="admin-template-edit" data-template-id="${esc(template.id)}">
                          ${icon("edit", 12)} 编辑
                        </button>
                        <button class="text-link text-link--danger" type="button"
                          data-action="admin-template-delete" data-template-id="${esc(
                            template.id
                          )}">删除</button>
                      </div>
                    </article>
                  `
                )
                .join("")
            : `<div class="empty-state"><span class="empty-state__icon">${icon(
                "clipboard",
                26
              )}</span><h3>暂未配置方案模版</h3><p>新增后，运营人员在处理预约时可一键导入。</p></div>`
        }
      </div>
    `;
  }

  function renderAdminTemplateSheet() {
    const draft = state.adminTemplateDraft;
    const hospital = draft?.hospitalId ? hospitalById(draft.hospitalId) : activePlanTemplateHospital();
    if (!draft || !hospital) return "";
    return `
      <div class="sheet-backdrop" data-action="close-overlay"></div>
      <section class="sheet plan-template-sheet" role="dialog" aria-modal="true" aria-label="方案模版">
        <div class="sheet__grabber"></div>
        <div class="sheet__bar">
          <div><h2>${draft.id ? "编辑方案模版" : "新增方案模版"}</h2><p>${esc(
            hospital.name
          )}</p></div>
          <button class="sheet__close" type="button" data-action="close-overlay" aria-label="关闭">
            ${icon("close", 15)}
          </button>
        </div>
        <div class="sheet__body">
          <div class="sheet-pad">
            <div class="template-form-note">${icon(
              "clock",
              13
            )} 活动时长统一按 1 天安排；模版不保存具体日期、地点与项目对接人，场地和详细地址由机构填写。</div>
            <div class="field-row">
              <div class="field"><label>模版名称 <em>*</em></label>
                <input type="text" data-template-field="name" value="${esc(
                  draft.name || ""
                )}" placeholder="如：标准讲座方案">
              </div>
              <div class="field"><label>服务类型</label>
                <select data-template-field="serviceType">${templateServiceOptions(
                  draft.serviceType
                )}</select>
              </div>
            </div>
            <div class="field"><label>默认活动主题 <span>可留空，导入后再按预约填写</span></label>
              <input type="text" data-template-field="topic" value="${esc(
                draft.topic || ""
              )}" placeholder="如：企业人群心血管健康管理">
            </div>
            <div class="field"><label>课题大纲</label>
              <textarea class="textarea--tall" data-template-field="outline" placeholder="填写课题章节、重点内容与现场安排">${esc(
                draft.outline || ""
              )}</textarea>
            </div>
            <div class="field"><label>活动流程</label>
              <textarea class="textarea--tall" data-template-field="agenda" placeholder="填写签到、分享、问答、咨询等流程">${esc(
                draft.agenda || ""
              )}</textarea>
            </div>
            <div class="field"><label>项目组成员</label>
              <input type="text" data-template-field="team" value="${esc(
                draft.team || ""
              )}" placeholder="如：院方项目负责人、现场执行">
            </div>
            <div class="field"><label>发给机构的确认说明</label>
              <textarea data-template-field="message" placeholder="填写需要机构确认的时间、场地、人数与注意事项">${esc(
                draft.message || ""
              )}</textarea>
            </div>
          </div>
        </div>
        <div class="sheet__footer">
          <button class="btn btn--ghost" type="button" data-action="close-overlay">取消</button>
          <button class="btn btn--primary" type="button" data-action="admin-template-save">
            保存模版 ${icon("check", 14)}
          </button>
        </div>
      </section>
    `;
  }

  function collectPlanTemplateFields() {
    const fields = {};
    document.querySelectorAll("[data-template-field]").forEach((input) => {
      fields[input.dataset.templateField] = input.value.trim();
    });
    return fields;
  }

  function saveAdminTemplate() {
    const draft = state.adminTemplateDraft;
    if (!draft) return;
    if (!adminCanManageHospital(draft.hospitalId)) {
      return showToast("只能维护本院方案模版。");
    }
    const fields = collectPlanTemplateFields();
    if (!fields.name) return showToast("请填写模版名称。");
    if (!fields.outline && !fields.agenda && !fields.message) {
      return showToast("请至少填写课题大纲、活动流程或确认说明中的一项。");
    }
    const now = new Date().toISOString();
    const store = getPlanTemplateStore();
    const payload = {
      ...draft,
      ...fields,
      hospitalId: draft.hospitalId,
      updatedAt: now
    };
    const isNew = !payload.id;
    if (payload.id) {
      const index = store.findIndex((item) => item.id === payload.id);
      if (index >= 0) store[index] = payload;
      else store.push(payload);
    } else {
      payload.id = `tpl-custom-${Date.now()}`;
      payload.createdAt = now;
      store.push(payload);
    }
    savePlanTemplateStore(store);
    releaseOverlayHistory();
    clearOverlayState();
    renderApp();
    showToast(isNew ? "方案模版已新增。" : "方案模版已保存。");
  }

  function deleteAdminTemplate(id) {
    const template = getPlanTemplateStore().find((item) => item.id === id);
    if (!template) return;
    if (!adminCanManageHospital(template.hospitalId)) {
      return showToast("只能删除本院方案模版。");
    }
    if (!window.confirm(`确定删除「${template.name}」吗？`)) return;
    savePlanTemplateStore(getPlanTemplateStore().filter((item) => item.id !== id));
    renderApp();
    showToast("方案模版已删除。");
  }

  function importReviewTemplate(templateId) {
    const appointment = appointmentById(state.adminReviewId);
    if (!appointment || !state.adminDraft) return;
    const template = getPlanTemplates(appointment.hospitalId).find(
      (item) => item.id === templateId
    );
    if (!template) return showToast("请选择要导入的方案模版。");
    const current = {
      ...state.adminDraft,
      ...collectReviewFields()
    };
    const nextService = template.serviceType || current.serviceType;
    const currentSpeaker = current.speakerId ? expertById(current.speakerId) : null;
    const keepSpeaker = currentSpeaker && matchesService(currentSpeaker, nextService);
    state.adminDraft = {
      ...current,
      topic: template.topic || current.topic,
      serviceType: nextService,
      speakerId: keepSpeaker ? current.speakerId : "",
      speaker: keepSpeaker
        ? `${currentSpeaker.name} · ${currentSpeaker.deptTitle}`
        : "",
      outline: template.outline || "",
      agenda: template.agenda || "",
      team: template.team || "",
      message: template.message || ""
    };
    renderOverlay();
    showToast(`已导入「${template.name}」，可继续修改。`);
  }

  /* =========================================================
     Admin seasonal theme config
     ========================================================= */
  function adminThemeHospital() {
    if (isSuperadmin()) {
      return state.adminHospitalId ? hospitalById(state.adminHospitalId) : null;
    }
    return operatorHospital();
  }

  function renderAdminThemesPage() {
    const hospital = adminThemeHospital();
    return `
      <div class="admin-page-head">
        <div><h1>时令主题</h1><p>按月配置课题、主讲专家与课题履约地</p></div>
      </div>
      ${renderAdminTabs()}
      ${renderAdminHospitalFilter()}
      ${
        hospital
          ? `
            <p class="admin-hint">${icon(
              "leaf",
              12
            )} ${esc(
              hospital.name
            )} 的 12 个月主题独立生效；机构端仅展示当前城市落在课题履约地内的主题。</p>
            <div class="admin-theme-grid">
              ${hospitalThemes(hospital.id)
                .map(
                  (theme) => `
                    <button class="admin-theme-card" type="button" data-action="open-admin-theme"
                      data-month="${theme.month}">
                      <span class="admin-theme-card__media">
                        <img src="${esc(theme.image)}" alt="${theme.month}月时令主题" loading="lazy"
                          decoding="async">
                        <i>${theme.month}月</i>
                      </span>
                      <span class="admin-theme-card__body">
                        <strong>${esc(seasonalHeadline(theme.season))}</strong>
                        <small>${esc(theme.focus)}</small>
                        <span>
                          <em>${(theme.expertIds || []).length} 位专家</em>
                          <em>${esc(themeCoverageSummary(theme, hospital.id))}</em>
                        </span>
                      </span>
                      ${icon("chevronRight", 15)}
                    </button>
                  `
                )
                .join("")}
            </div>
          `
          : `<div class="empty-state"><span class="empty-state__icon">${icon(
              "building",
              26
            )}</span><h3>请选择医院</h3><p>超级管理员需先选择要配置的医院，再进入时令主题。</p></div>`
      }
    `;
  }

  function openAdminThemeEditor(month) {
    const hospital = adminThemeHospital();
    if (!hospital) return showToast("请先选择医院。");
    const theme = hospitalTheme(hospital.id, Number(month));
    if (!theme) return;
    state.adminThemeMonth = Number(month);
    state.adminThemeDraft = clone(theme);
    const draft = state.adminThemeDraft;
    draft.expertIds = [...new Set(draft.expertIds || [])];
    draft.topics = (draft.topics || []).map((topic) => {
      const resolved = resolveTopicCoverageCities(topic, draft, hospital.id);
      const coverageProvince = coverageProvinceForCities(
        resolved.cities,
        hospital.province
      );
      const selectedCity = resolved.cities.find(
        (city) =>
          city !== "全国" &&
          (state.chinaCities?.[coverageProvince] || []).includes(city)
      );
      return {
        ...topic,
        coverageCities: resolved.cities,
        coverage: resolved.cities.length
          ? coverageText(resolved.cities)
          : topic.coverage || "",
        coverageProvince,
        coverageCity:
          selectedCity ||
          state.chinaCities?.[coverageProvince]?.[0] ||
          coverageProvince
      };
    });
    state.overlay = { type: "admin-theme" };
    renderOverlay();
  }

  function refreshThemeTopicCoverageChips(index) {
    const topic = state.adminThemeDraft?.topics?.[Number(index)];
    if (!topic) return;
    const chips = document.getElementById(`theme-topic-coverage-chips-${index}`);
    if (chips) {
      chips.innerHTML =
        coverageChipsMarkup(
          topic.coverageCities || [],
          "theme-topic-coverage-remove"
        ) ||
        "<small>尚未选择课题履约地</small>";
      chips.dataset.index = String(index);
    }
    const national = document.querySelector(
      `[data-action="theme-topic-coverage-national"][data-index="${index}"]`
    );
    if (national) {
      national.classList.toggle(
        "is-active",
        Boolean(topic.coverageCities?.includes("全国"))
      );
      national.setAttribute(
        "aria-pressed",
        topic.coverageCities?.includes("全国") ? "true" : "false"
      );
    }
  }

  function renderAdminThemeSheet() {
    const hospital = adminThemeHospital();
    const draft = state.adminThemeDraft;
    if (!hospital || !draft) return "";
    const hospitalExperts = [
      ...new Map(
        state.experts
          .filter(
            (expert) =>
              expert.hospitalId === hospital.id &&
              expert.active !== false &&
              matchesService(expert, "讲座")
          )
          .map((expert) => [String(expert.id), expert])
      ).values()
    ]
      .sort(
        (a, b) =>
          CLIENT_TIER_ORDER.indexOf(a.tier) - CLIENT_TIER_ORDER.indexOf(b.tier) ||
          a.name.localeCompare(b.name, "zh-CN")
      );
    return `
      <div class="sheet-backdrop" data-action="close-overlay"></div>
      <section class="sheet theme-editor-sheet" role="dialog" aria-modal="true" aria-label="时令主题配置">
        <div class="sheet__grabber"></div>
        <div class="sheet__bar">
          <div><h2>${draft.month}月 · 时令主题</h2><p>${esc(hospital.name)}</p></div>
          <button class="sheet__close" type="button" data-action="close-overlay" aria-label="关闭">
            ${icon("close", 15)}
          </button>
        </div>
        <div class="sheet__body">
          <div class="sheet-pad">
            <div class="theme-editor-cover">
              <img src="${esc(draft.image || themeImageFor(draft.month))}" alt="${draft.month}月主题封面">
              <div><strong>${draft.month}月时令主题</strong><small>月封面由系统统一维护，内容可配置</small></div>
            </div>
            <div class="field-row">
              <div class="field"><label>时令名称</label>
                <input type="text" data-theme-field="season" value="${esc(draft.season || "")}">
              </div>
              <div class="field"><label>关注重点</label>
                <input type="text" data-theme-field="focus" value="${esc(draft.focus || "")}">
              </div>
            </div>
            <div class="field"><label>主题介绍</label>
              <textarea class="textarea--tall" data-theme-field="intro" placeholder="填写主题介绍、活动价值与讲座方向">${esc(
                draft.intro || ""
              )}</textarea>
            </div>
            <div class="field-row">
              <div class="field"><label>本月关注疾病</label>
                <textarea data-theme-field="diseases">${esc(draft.diseases || "")}</textarea>
              </div>
              <div class="field"><label>适合行业</label>
                <textarea data-theme-field="industries">${esc(draft.industries || "")}</textarea>
              </div>
            </div>
            <div class="field">
              <label>讲座课题与履约配置 <span>课题、主讲专家、履约地按课题独立保存</span></label>
              <div class="theme-topic-editor">
                ${(draft.topics || [])
                  .map(
                    (topic, index) => `
                      <div class="theme-topic-edit" data-topic-index="${index}">
                        <div class="theme-topic-edit__top">
                          <span>课题 ${index + 1}</span>
                          <button type="button" data-action="theme-topic-remove" data-index="${index}"
                            aria-label="删除课题">${icon("trash", 12)}</button>
                        </div>
                        <input type="text" data-theme-topic-field="title" data-index="${index}"
                          value="${esc(topic.title || "")}" placeholder="填写讲座主题">
                        <div class="field-row">
                          <select data-theme-topic-field="dept" data-index="${index}">
                            ${DEPT_OPTIONS.map(
                              (dept) =>
                                `<option value="${esc(dept)}" ${
                                  topic.dept === dept ? "selected" : ""
        }>${esc(dept)}</option>`
                            ).join("")}
                          </select>
                          <select data-theme-topic-field="expertId" data-index="${index}">
                            <option value="">请选择主讲专家</option>
                            ${hospitalExperts
                              .map(
                                (expert) =>
                                  `<option value="${esc(expert.id)}" ${
                                    topic.expertId === expert.id ? "selected" : ""
                                  }>${esc(expert.name)} · ${esc(expert.dept)}</option>`
                              )
                              .join("")}
                          </select>
                        </div>
                        <div class="theme-topic-coverage" data-topic-coverage-index="${index}">
                          <div class="theme-topic-coverage__head">
                            <span>课题履约地 <em>*</em></span>
                            <small>省市级联 · 可多选</small>
                          </div>
                          <div class="theme-city-chips theme-topic-city-chips"
                            id="theme-topic-coverage-chips-${index}" data-index="${index}">
                            ${coverageChipsMarkup(
                              topic.coverageCities || [],
                              "theme-topic-coverage-remove"
                            ) || "<small>尚未选择课题履约地</small>"}
                          </div>
                          <div class="theme-topic-city-controls">
                            <div class="field-row">
                              <div class="field">
                                <label>省份</label>
                                <select data-theme-topic-coverage-province data-index="${index}">
                                  ${renderProvinceOptions(topic.coverageProvince)}
                                </select>
                              </div>
                              <div class="field">
                                <label>城市</label>
                                <select data-theme-topic-coverage-city data-index="${index}">
                                  ${renderCoverageCitySelectOptions(
                                    topic.coverageProvince,
                                    topic.coverageCity
                                  )}
                                </select>
                              </div>
                            </div>
                            <div class="theme-topic-city-actions">
                              <button class="btn btn--soft btn--sm" type="button"
                                data-action="theme-topic-coverage-add" data-index="${index}">
                                ${icon("plus", 12)} 添加城市
                              </button>
                              <button class="coverage-national ${
                                topic.coverageCities?.includes("全国")
                                  ? "is-active"
                                  : ""
                              }" type="button" data-action="theme-topic-coverage-national"
                                data-index="${index}" aria-pressed="${
                                  topic.coverageCities?.includes("全国") ? "true" : "false"
                                }">
                                <span class="coverage-national__icon">${icon(
                                  "mapPin",
                                  12
                                )}</span>
                                <span><strong>全国</strong><small>不限城市</small></span>
                                <span class="coverage-national__check">${icon(
                                  "check",
                                  10
                                )}</span>
                              </button>
                              <button class="theme-topic-coverage__from-expert" type="button"
                                data-action="theme-topic-coverage-from-expert" data-index="${index}">
                                ${icon("sparkles", 11)} 使用专家履约地
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    `
                  )
                  .join("")}
              </div>
              <button class="theme-add-topic" type="button" data-action="theme-topic-add">
                ${icon("plus", 12)} 添加讲座课题
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
    `;
  }

  function collectAdminThemeDraft() {
    const draft = state.adminThemeDraft;
    if (!draft) return null;
    document.querySelectorAll("[data-theme-field]").forEach((input) => {
      draft[input.dataset.themeField] = input.value.trim();
    });
    document.querySelectorAll("[data-theme-topic-field]").forEach((input) => {
      const index = Number(input.dataset.index);
      if (!draft.topics?.[index]) return;
      draft.topics[index][input.dataset.themeTopicField] = input.value.trim();
    });
    return draft;
  }

  function saveAdminTheme() {
    const hospital = adminThemeHospital();
    const draft = collectAdminThemeDraft();
    if (!hospital || !draft) return showToast("主题配置已失效。");
    if (!draft.season?.trim()) return showToast("请填写时令名称。");
    if (!draft.topics?.length || draft.topics.some((topic) => !topic.title?.trim())) {
      return showToast("请至少完整填写一个讲座课题。");
    }
    const invalidTopic = draft.topics.find((topic) => {
      const expert = topic.expertId ? expertById(topic.expertId) : null;
      return (
        !topic.dept?.trim() ||
        !expert ||
        expert.active === false ||
        expert.hospitalId !== hospital.id ||
        !matchesService(expert, "讲座")
      );
    });
    if (invalidTopic) {
      return showToast(
        `课题「${invalidTopic.title || "未填写"}」需绑定本院已显示的讲座专家。`
      );
    }
    const invalidCoverage = draft.topics.find(
      (topic) =>
        !resolveTopicCoverageCities(topic, draft, hospital.id).cities.length
    );
    if (invalidCoverage) {
      return showToast(
        `课题「${invalidCoverage.title || "未填写"}」请至少选择一个履约城市，或点击“使用专家履约地”。`
      );
    }
    draft.expertIds = [
      ...new Set(draft.topics.map((topic) => topic.expertId).filter(Boolean))
    ];
    saveHospitalTheme(hospital.id, draft);
    state.overlay = null;
    state.adminThemeDraft = null;
    releaseOverlayHistory();
    renderApp({ scrollTo: currentWindowScroll() });
    showToast(`${draft.month}月时令主题已保存，机构端将同步更新。`);
  }

  /* =========================================================
     Admin doctor config
     ========================================================= */
  const DEPT_OPTIONS = [
    "心血管",
    "呼吸科",
    "内科",
    "内分泌",
    "肾病",
    "感染肝病",
    "肿瘤",
    "临床营养",
    "全科",
    "健康管理",
    "老年科",
    "骨科",
    "康复科",
    "中医科",
    "心理",
    "睡眠",
    "神经内科",
    "急诊急救",
    "皮肤医美",
    "烧伤科",
    "妇科",
    "儿科",
    "其他"
  ];

  function adminDoctorList() {
    const hospital = slotHospital();
    if (!hospital) return [];
    const q = (state.adminDoctorSearch || "").trim().toLowerCase();
    return state.experts
      .filter((expert) => {
        if (hospital && expert.hospitalId !== hospital.id) return false;
        if (!q) return true;
        return [expert.name, expert.hospital, expert.dept, expert.deptTitle, expert.specialty]
          .join(" ")
          .toLowerCase()
          .includes(q);
      })
      .sort((a, b) => {
        const order = TIER_ORDER.indexOf(a.tier) - TIER_ORDER.indexOf(b.tier);
        return order || a.name.localeCompare(b.name, "zh-CN");
      });
  }

  function renderDoctorAdminCard(expert) {
    const themeMonths = [...monthsForExpert(expert)].sort((a, b) => a - b);
    return `
      <button class="doctor-admin-card" type="button" data-action="open-admin-doctor"
        data-doctor-id="${esc(expert.id)}">
        <span class="doctor-admin-card__avatar">
          <img src="${esc(expertAvatar(expert))}" alt="${esc(expert.name)}" loading="lazy">
          <i class="tier-dot tier-dot--${expert.tier}">${esc(tierOf(expert).short.slice(0, 2))}</i>
        </span>
        <span class="doctor-admin-card__body">
          <span class="doctor-admin-card__head">
            <strong>${esc(expert.name)}</strong>
            <span class="${expert.active === false ? "is-off" : "is-on"}">${
              expert.active === false ? "未显示" : "已显示"
            }</span>
          </span>
          <span class="doctor-admin-card__role">${esc(expert.deptTitle)} · ${esc(expert.dept)}</span>
          <span class="doctor-admin-card__hospital"><strong class="hospital-name">${esc(
            expert.hospital
          )}</strong> · ${esc(coverageText(expert))}</span>
          <span class="doctor-admin-card__services">${(expert.services || [])
        .map((service) => `<span>${esc(serviceLabel(service))}</span>`)
            .join("")}<i>${esc(expert.leadLabel)}</i>${
              themeMonths.length
                ? `<i>${themeMonths.length} 个月令课题</i>`
                : ""
            }</span>
        </span>
        <span class="doctor-admin-card__edit">${icon("edit", 13)}</span>
      </button>
    `;
  }

  function renderDoctorAdminPage() {
    const hospital = slotHospital();
    const list = adminDoctorList();
    return `
      <div class="admin-page-head">
        <div><h1>专家配置</h1><p>维护本院专家资料、服务类型与预约周期</p></div>
        <button class="btn btn--primary btn--sm" type="button" data-action="admin-doctor-add" ${
          hospital ? "" : "disabled"
        }>
          ${icon("plus", 14)} 新增专家
        </button>
      </div>
      ${renderAdminTabs()}
      ${renderAdminHospitalFilter()}
      ${
        !hospital
          ? `<div class="empty-state"><span class="empty-state__icon">${icon(
              "building",
              26
            )}</span><h3>请选择医院</h3><p>超级管理员需先选择医院，再查看或维护该院专家。</p></div>`
          : `
      <div class="admin-search">
        ${icon("search", 15)}
        <input type="search" placeholder="搜索姓名、科室或擅长方向" value="${esc(
          state.adminDoctorSearch || ""
        )}" data-admin-doctor-search>
      </div>
      <p class="admin-hint">${icon(
        "alert",
        12
      )} 专家字段参考院方整理表：姓名、履约机构、科室/任职、科室方向、服务类型、履约城市、擅长/专业优势、简介/履历、预约时间。表格未提供性别时使用中性医疗头像。</p>
      <div id="doctor-admin-list" class="doctor-admin-list">
        ${
          list.length
            ? list.map(renderDoctorAdminCard).join("")
            : `<div class="empty-state"><span class="empty-state__icon">${icon(
                "experts",
                26
              )}</span><h3>暂无专家</h3><p>点击右上角新增本院专家。</p></div>`
        }
      </div>
      `
      }
    `;
  }

  function emptyDoctorDraft() {
    const hospital = slotHospital();
    return {
      id: "",
      custom: true,
      name: "",
      gender: "neutral",
      senior: false,
      tier: "specialist",
      hospitalId: hospital?.id || "",
      hospital: hospital?.name || "",
      deptTitle: "",
      dept: "内科",
      services: ["讲座", "健康咨询"],
      coverage: "全国",
      coverageCities: ["全国"],
      leadDays: 7,
      leadLabel: "提前 7 天申请",
      specialty: "",
      intro: "",
      photo: "",
      photoCard: "",
      photoDetail: "",
      active: true
    };
  }

  function openAdminDoctorEditor(id = "") {
    if (isSuperadmin() && !state.adminHospitalId) {
      return showToast("请先选择医院，再维护本院专家。");
    }
    const expert = id ? expertById(id) : null;
    const hospital = slotHospital();
    if (!hospital) return showToast("医院范围无效，请重新选择医院。");
    if (expert && expert.hospitalId !== hospital.id) {
      return showToast("只能维护当前所选医院的专家。");
    }
    state.adminDoctorDraft = expert ? clone(expert) : emptyDoctorDraft();
    if (expert) state.adminDoctorDraft.coverageCities = coverageCitiesFor(expert);
    const draftHospital = hospitalById(state.adminDoctorDraft.hospitalId);
    const province = coverageProvinceForCities(
      state.adminDoctorDraft.coverageCities,
      draftHospital?.province || "北京市"
    );
    const selectedCity = (state.adminDoctorDraft.coverageCities || []).find(
      (city) => city !== "全国" && (state.chinaCities?.[province] || []).includes(city)
    );
    state.adminDoctorDraft.coverageProvince = province;
    state.adminDoctorDraft.coverageCity =
      selectedCity || state.chinaCities?.[province]?.[0] || province || "北京市";
    state.overlay = { type: "admin-doctor" };
    renderOverlay();
  }

  function renderAdminDoctorSheet() {
    const draft = state.adminDoctorDraft;
    if (!draft) return "";
    const isNew = !draft.id;
    const avatar = expertAvatar(draft);
    const draftCoverage = coverageCitiesFor(draft);
    return `
      <div class="sheet-backdrop" data-action="close-overlay"></div>
      <section class="sheet doctor-editor-sheet" role="dialog" aria-modal="true" aria-label="专家资料">
        <div class="sheet__grabber"></div>
        <div class="sheet__bar">
          <div><h2>${isNew ? "新增专家" : "编辑专家"}</h2><p>字段参考院方专家整理表</p></div>
          <button class="sheet__close" type="button" data-action="close-overlay" aria-label="关闭">
            ${icon("close", 15)}
          </button>
        </div>
        <div class="sheet__body">
          <div class="sheet-pad">
            <div class="doctor-photo-editor">
              <img src="${esc(avatar)}" alt="专家头像预览">
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
              ${[
                ["neutral", false, "中性头像"],
                ["male", false, "男医生"],
                ["female", false, "女医生"],
                ["male", true, "资深男医生"],
                ["female", true, "资深女医生"]
              ]
                .map(
                  ([gender, senior, label]) =>
                    `<button class="${
                      !draft.photoCard &&
                      draft.gender === gender &&
                      Boolean(draft.senior) === senior
                        ? "is-active"
                        : ""
                    }" type="button" data-action="doctor-avatar" data-gender="${gender}" data-senior="${
                      senior ? "1" : "0"
                    }">${label}</button>`
                )
                .join("")}
            </div>
            <div class="field-row">
              <div class="field"><label>姓名 <em>*</em></label>
                <input type="text" data-doctor-field="name" value="${esc(draft.name)}" placeholder="专家姓名">
              </div>
              <div class="field"><label>性别</label>
                <select data-doctor-field="gender">
                  <option value="neutral" ${draft.gender === "neutral" ? "selected" : ""}>未设置（中性头像）</option>
                  <option value="male" ${draft.gender === "male" ? "selected" : ""}>男</option>
                  <option value="female" ${draft.gender === "female" ? "selected" : ""}>女</option>
                </select>
              </div>
            </div>
            <div class="field-row">
              <div class="field"><label>履约机构 <em>*</em></label>
                <select data-doctor-field="hospitalId" ${isSuperadmin() ? "" : "disabled"}>
                  ${state.hospitals
                    .map(
                      (hospital) =>
                        `<option value="${esc(hospital.id)}" ${
                          draft.hospitalId === hospital.id ? "selected" : ""
                        }>${esc(hospital.name)}</option>`
                    )
                    .join("")}
                </select>
                ${
                  isSuperadmin()
                    ? ""
                    : `<span class="field-help">医院运营仅可维护本院专家。</span>`
                }
              </div>
              <div class="field"><label>专家层级</label>
                <select data-doctor-field="tier">
                  ${TIER_ORDER.map(
                    (id) =>
                      `<option value="${id}" ${draft.tier === id ? "selected" : ""}>${esc(
                        TIERS[id].short
                      )}</option>`
                  ).join("")}
                </select>
              </div>
            </div>
            <div class="field"><label>科室 / 任职 <em>*</em></label>
              <input type="text" data-doctor-field="deptTitle" value="${esc(
                draft.deptTitle
              )}" placeholder="如：心血管内科主任医师">
            </div>
            <div class="field"><label>科室方向</label>
              <select data-doctor-field="dept">
                ${DEPT_OPTIONS.map(
                  (dept) =>
                    `<option value="${dept}" ${draft.dept === dept ? "selected" : ""}>${dept}</option>`
                ).join("")}
              </select>
            </div>
            <div class="field"><label>服务类型</label>
              <div class="choice-grid choice-grid--three">
                ${SERVICE_IDS.map(
                  (id) =>
                    `<button class="choice-tile ${
                      draft.services?.includes(id) ? "is-active" : ""
                    }" type="button" data-action="doctor-service" data-value="${esc(id)}">${esc(
                      serviceLabel(id)
                    )}</button>`
                ).join("")}
              </div>
              <span class="field-help">月令讲座在「时令主题」中按课题绑定；已绑定讲师的专家不能直接取消讲座服务或停用。</span>
            </div>
            <div class="field">
              <label>履约城市 <em>*</em> <span>可多选</span></label>
              <div class="theme-city-editor doctor-coverage-editor">
                <div class="theme-city-chips" id="doctor-coverage-chips">
                  ${coverageChipsMarkup(draftCoverage)}
                </div>
                <div class="doctor-coverage-controls">
                  <button class="coverage-national ${
                    draftCoverage.includes("全国") ? "is-active" : ""
                  }" type="button" data-action="doctor-coverage-national">
                    <span class="coverage-national__icon">${icon("mapPin", 14)}</span>
                    <span><strong>全国（不限城市）</strong><small>覆盖全国任意履约城市</small></span>
                    <span class="coverage-national__check">${icon("check", 12)}</span>
                  </button>
                  <div class="field-row doctor-coverage-picker">
                    <div class="field">
                      <label>省份</label>
                      <select data-doctor-coverage-province>${renderProvinceOptions(
                        draft.coverageProvince
                      )}</select>
                    </div>
                    <div class="field">
                      <label>城市</label>
                      <select data-doctor-coverage-city>${renderCoverageCitySelectOptions(
                        draft.coverageProvince,
                        draft.coverageCity
                      )}</select>
                    </div>
                  </div>
                  <span class="field-help">先选省份再选城市，选中城市后自动加入。含“京外”或“省外”的履约地按全国覆盖处理。</span>
                </div>
              </div>
            </div>
            <div class="field"><label>擅长 / 专业优势</label>
              <textarea data-doctor-field="specialty" placeholder="填写专家擅长方向">${esc(
                draft.specialty
              )}</textarea>
            </div>
            <div class="field"><label>简介 / 履历</label>
              <textarea data-doctor-field="intro" class="textarea--tall" placeholder="填写学术任职、履历与临床经验">${esc(
                draft.intro
              )}</textarea>
            </div>
            <div class="field"><label>预约提前期（天）</label>
              <input type="number" min="1" max="90" data-doctor-field="leadDays" value="${esc(
                draft.leadDays
              )}">
              <span class="field-help">对应院方表格中的「预约时间 T+N」，用于计算最早可约日期。</span>
            </div>
            <label class="switch-row">
              <span><strong>在机构端显示</strong><small>关闭后机构端不再展示该专家</small></span>
              <input type="checkbox" data-doctor-active ${draft.active !== false ? "checked" : ""}>
            </label>
          </div>
        </div>
        <div class="sheet__footer">
          <button class="btn btn--ghost" type="button" data-action="close-overlay">取消</button>
          <button class="btn btn--primary" type="button" data-action="admin-doctor-save">保存专家</button>
        </div>
      </section>
    `;
  }

  function collectDoctorFields() {
    const draft = state.adminDoctorDraft;
    document.querySelectorAll("[data-doctor-field]").forEach((input) => {
      const key = input.dataset.doctorField;
      if (key === "leadDays") draft.leadDays = Math.max(1, Number(input.value) || 1);
      else if (key === "hospitalId") {
        draft.hospitalId = input.value;
        draft.hospital = hospitalById(input.value)?.name || draft.hospital;
      } else draft[key] = input.value.trim();
    });
    const active = document.querySelector("[data-doctor-active]");
    if (active) draft.active = active.checked;
    draft.coverage = draft.coverageCities?.includes("全国")
      ? "全国"
      : (draft.coverageCities || []).join(" / ");
    draft.leadLabel = `提前 ${draft.leadDays} 天申请`;
    return draft;
  }

  function saveAdminDoctor() {
    const draft = collectDoctorFields();
    if (!state.adminUser) return showToast("登录状态已失效，请重新登录。");
    if (!draft.name) return showToast("请填写专家姓名。");
    if (!draft.hospitalId) return showToast("请选择履约机构。");
    if (isSuperadmin()) {
      if (!state.adminHospitalId || draft.hospitalId !== state.adminHospitalId) {
        return showToast("超级管理员只能维护当前所选医院的专家。");
      }
    } else if (draft.hospitalId !== state.adminUser.hospitalId) {
      return showToast("医院运营只能维护本院专家。");
    }
    if (!draft.deptTitle) return showToast("请填写科室/任职。");
    if (!draft.services?.length) return showToast("请至少选择一个服务类型。");
    if (!draft.coverageCities?.length) return showToast("请至少选择一个履约城市。");
    const previous = draft.id ? expertById(draft.id) : null;
    if (previous) {
      const months = [...monthsForExpert(previous)].sort((a, b) => a - b);
      const losesLecture =
        previous.hospitalId !== draft.hospitalId ||
        draft.active === false ||
        !matchesService(draft, "讲座");
      if (months.length && losesLecture) {
        return showToast(
          `该专家已在 ${months.join("、")} 月时令课题中担任主讲，请先在「时令主题」中更换主讲专家，再取消讲座服务、停用或调整履约机构。`
        );
      }
    }
    const payload = { ...draft };
    delete payload.custom;
    delete payload.coverageProvince;
    delete payload.coverageCity;
    const config = getDoctorConfig();
    if (draft.id && !draft.custom) {
      config.overrides = config.overrides || {};
      config.overrides[draft.id] = payload;
    } else if (draft.id) {
      config.added = (config.added || []).map((item) =>
        item.id === draft.id ? { ...payload } : item
      );
    } else {
      const id = `custom-${Date.now()}`;
      config.added = (config.added || []).concat({
        ...payload,
        id,
        custom: true,
        photo: draft.photo || "",
        profileUrl: ""
      });
    }
    saveDoctorConfig(config);
    mergeExperts();
    logOperation(
      draft.id ? "更新专家资料" : "新增专家",
      `${draft.name} · ${draft.deptTitle}`,
      {
        entityType: "expert",
        entityId: draft.id || draft.name,
        hospitalId: draft.hospitalId
      }
    );
    state.overlay = null;
    releaseOverlayHistory();
    renderApp();
    showToast("专家资料已保存。");
  }

  function handleDoctorPhotoUpload(file) {
    if (!file || !state.adminDoctorDraft) return;
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const width = 540;
        const height = 680;
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        const scale = Math.min(width / image.width, height / image.height);
        const drawW = image.width * scale;
        const drawH = image.height * scale;
        ctx.fillStyle = "#dce6f7";
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(image, (width - drawW) / 2, (height - drawH) / 2, drawW, drawH);
        const data = canvas.toDataURL("image/jpeg", 0.82);
        state.adminDoctorDraft.photo = data;
        state.adminDoctorDraft.photoCard = data;
        state.adminDoctorDraft.photoDetail = data;
        renderOverlay();
        showToast("照片已压缩并载入。");
      };
      image.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  }

  const PLAN_PDF_DB_NAME = "pkuih_h6_file_store";
  const PLAN_PDF_STORE = "plan_pdfs";
  const POSTER_IMAGE_STORE = "poster_images";
  let planPdfDbPromise = null;

  function openPlanPdfDb() {
    if (planPdfDbPromise) return planPdfDbPromise;
    planPdfDbPromise = new Promise((resolve, reject) => {
      if (!window.indexedDB) {
        reject(new Error("当前浏览器不支持附件存储"));
        return;
      }
      const request = window.indexedDB.open(PLAN_PDF_DB_NAME, 2);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(PLAN_PDF_STORE)) {
          db.createObjectStore(PLAN_PDF_STORE);
        }
        if (!db.objectStoreNames.contains(POSTER_IMAGE_STORE)) {
          db.createObjectStore(POSTER_IMAGE_STORE);
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => {
        planPdfDbPromise = null;
        reject(request.error || new Error("附件存储初始化失败"));
      };
    });
    return planPdfDbPromise;
  }

  async function savePlanPdfBlob(key, blob, meta = {}) {
    const db = await openPlanPdfDb();
    await new Promise((resolve, reject) => {
      const transaction = db.transaction(PLAN_PDF_STORE, "readwrite");
      transaction.objectStore(PLAN_PDF_STORE).put(
        {
          ...meta,
          blob,
          savedAt: new Date().toISOString()
        },
        key
      );
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
      transaction.onabort = () => reject(transaction.error);
    });
  }

  async function loadPlanPdfBlob(key) {
    if (!key) return null;
    const db = await openPlanPdfDb();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(PLAN_PDF_STORE, "readonly");
      const request = transaction.objectStore(PLAN_PDF_STORE).get(key);
      request.onsuccess = () => resolve(request.result?.blob || null);
      request.onerror = () => reject(request.error);
    });
  }

  async function deletePlanPdfBlob(key) {
    if (!key) return;
    try {
      const db = await openPlanPdfDb();
      await new Promise((resolve, reject) => {
        const transaction = db.transaction(PLAN_PDF_STORE, "readwrite");
        transaction.objectStore(PLAN_PDF_STORE).delete(key);
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
      });
    } catch (error) {
      console.warn("plan pdf cleanup failed", error);
    }
  }

  async function savePosterImageBlob(key, blob, meta = {}) {
    const db = await openPlanPdfDb();
    await new Promise((resolve, reject) => {
      const transaction = db.transaction(POSTER_IMAGE_STORE, "readwrite");
      transaction.objectStore(POSTER_IMAGE_STORE).put(
        {
          ...meta,
          blob,
          savedAt: new Date().toISOString()
        },
        key
      );
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
      transaction.onabort = () => reject(transaction.error);
    });
  }

  async function loadPosterImageBlob(key) {
    if (!key) return null;
    const db = await openPlanPdfDb();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(POSTER_IMAGE_STORE, "readonly");
      const request = transaction.objectStore(POSTER_IMAGE_STORE).get(key);
      request.onsuccess = () => resolve(request.result?.blob || null);
      request.onerror = () => reject(request.error);
    });
  }

  async function deletePosterImageBlob(key) {
    if (!key) return;
    try {
      const db = await openPlanPdfDb();
      await new Promise((resolve, reject) => {
        const transaction = db.transaction(POSTER_IMAGE_STORE, "readwrite");
        transaction.objectStore(POSTER_IMAGE_STORE).delete(key);
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
      });
    } catch (error) {
      console.warn("poster image cleanup failed", error);
    }
  }

  async function pdfBlobFromDataUrl(dataUrl) {
    const response = await fetch(dataUrl);
    if (!response.ok) throw new Error("附件数据读取失败");
    return response.blob();
  }

  function cleanPlanPdfMeta(pdf) {
    if (!pdf) return null;
    return {
      name: pdf.name || "活动方案.pdf",
      size: Number(pdf.size) || 0,
      type: pdf.type || "application/pdf",
      uploadedAt: pdf.uploadedAt || "",
      storageKey: pdf.storageKey || ""
    };
  }

  function planAttachmentKind(file = {}) {
    const type = String(file.type || "").toLowerCase();
    const name = String(file.name || "").toLowerCase();
    if (type === "application/pdf" || name.endsWith(".pdf")) return "pdf";
    if (
      type.includes("powerpoint") ||
      type.includes("presentationml") ||
      name.endsWith(".ppt") ||
      name.endsWith(".pptx")
    ) {
      return "ppt";
    }
    return "file";
  }

  function planAttachmentKindLabel(kind) {
    if (kind === "pdf") return "PDF";
    if (kind === "ppt") return "PPT";
    return "附件";
  }

  function isAllowedPlanAttachment(file) {
    const type = String(file?.type || "").toLowerCase();
    const name = String(file?.name || "").toLowerCase();
    return (
      type === "application/pdf" ||
      type === "application/vnd.ms-powerpoint" ||
      type ===
        "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
      name.endsWith(".pdf") ||
      name.endsWith(".ppt") ||
      name.endsWith(".pptx")
    );
  }

  async function preparePlanPdfForSave(appointment) {
    const existingKey = appointment.plan?.pdf?.storageKey || "";
    const draftPdf = state.adminDraft?.planPdf || null;
    const draftBlob = state.adminDraft?.planPdfBlob || null;
    if (!draftPdf) {
      return { pdf: null, oldKey: existingKey, newKey: "" };
    }
    let blob = draftBlob;
    if (!blob && draftPdf.dataUrl) {
      blob = await pdfBlobFromDataUrl(draftPdf.dataUrl);
    }
    if (!blob) {
      return { pdf: cleanPlanPdfMeta(draftPdf), oldKey: existingKey, newKey: "" };
    }
    const key = `plan-pdf-${appointment.id}-${Date.now()}`;
    const name = draftPdf.name || "活动方案.pdf";
    const size = Number(draftPdf.size) || blob.size || 0;
    await savePlanPdfBlob(key, blob, {
      name,
      size,
      type: draftPdf.type || blob.type || "application/pdf"
    });
    return {
      pdf: {
        name,
        size,
        type: draftPdf.type || blob.type || "application/pdf",
        uploadedAt: draftPdf.uploadedAt || new Date().toISOString(),
        storageKey: key
      },
      oldKey: existingKey,
      newKey: key
    };
  }

  function releasePlanPdfView() {
    if (state.pptxPreviewer?.destroy) {
      try {
        state.pptxPreviewer.destroy();
      } catch (error) {
        console.warn("pptx preview cleanup failed", error);
      }
    }
    state.pptxPreviewer = null;
    if (state.planPdfView?.url) {
      URL.revokeObjectURL(state.planPdfView.url);
    }
    state.planPdfView = null;
  }

  let pptxPreviewLibraryPromise = null;

  function loadPptxPreviewLibrary() {
    if (window.pptxPreview?.init) {
      return Promise.resolve(window.pptxPreview);
    }
    if (!pptxPreviewLibraryPromise) {
      pptxPreviewLibraryPromise = new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "assets/pptx-preview.umd.js?v=20261126-2";
        script.async = true;
        script.onload = () => {
          if (window.pptxPreview?.init) resolve(window.pptxPreview);
          else reject(new Error("PPTX 预览组件未就绪"));
        };
        script.onerror = () => {
          pptxPreviewLibraryPromise = null;
          reject(new Error("PPTX 预览组件加载失败"));
        };
        document.head.appendChild(script);
      });
    }
    return pptxPreviewLibraryPromise;
  }

  async function mountPptxPreview() {
    const view = state.planPdfView;
    if (
      !view?.isPptx ||
      !view.blob ||
      state.overlay?.type !== "plan-pdf"
    ) {
      return;
    }
    const host = overlayRoot?.querySelector("[data-pptx-viewer]");
    if (!host) return;
    const loading = host.querySelector(".pptx-viewer__loading");
    try {
      const library = await loadPptxPreviewLibrary();
      if (
        state.planPdfView !== view ||
        state.overlay?.type !== "plan-pdf" ||
        !host.isConnected
      ) {
        return;
      }
      const width = Math.max(280, Math.min(920, host.clientWidth || 340));
      const height = Math.round(width * 0.75);
      state.pptxPreviewer?.destroy?.();
      loading?.remove();
      const previewer = library.init(host, {
        width,
        height,
        mode: "slide"
      });
      state.pptxPreviewer = previewer;
      await previewer.preview(await view.blob.arrayBuffer());
      const pagination = host.querySelector(
        ".pptx-preview-wrapper-pagination"
      );
      if (
        pagination &&
        previewer.slideCount &&
        pagination.textContent?.startsWith("0/")
      ) {
        pagination.textContent = `1/${previewer.slideCount}`;
      }
    } catch (error) {
      console.warn("pptx preview failed", error);
      if (loading) {
        loading.innerHTML =
          '<strong>演示文稿暂时无法解析</strong><span>请下载后使用 WPS 或 PowerPoint 打开。</span>';
        loading.classList.add("is-error");
      }
    }
  }

  async function openPlanPdf(appointmentId) {
    const appointment = appointmentById(appointmentId);
    if (!appointment) return showToast("预约记录不存在。");
    const draftPdf =
      state.adminReviewId === appointment.id ? state.adminDraft?.planPdf || null : null;
    const pdf = appointment.plan?.pdf || draftPdf;
    if (!pdf) return showToast("该预约暂无方案附件。");
    const canViewClient =
      Boolean(state.session) && clientOwnsAppointment(appointment);
    const canViewAdmin =
      Boolean(state.adminAuthed) &&
      adminCanManageHospital(appointment.hospitalId);
    if (!canViewClient && !canViewAdmin) {
      return showToast("无权查看该方案附件。");
    }
    let blob = null;
    if (
      state.adminReviewId === appointment.id &&
      state.adminDraft?.planPdfBlob
    ) {
      blob = state.adminDraft.planPdfBlob;
    } else if (pdf.storageKey) {
      try {
        blob = await loadPlanPdfBlob(pdf.storageKey);
      } catch (error) {
        return showToast("方案附件读取失败，请稍后重试。");
      }
    } else if (pdf.dataUrl) {
      try {
        blob = await pdfBlobFromDataUrl(pdf.dataUrl);
      } catch (error) {
        return showToast("方案附件读取失败，请院方重新上传。");
      }
    }
    if (!blob) {
      return showToast("方案附件已失效，请联系院方重新上传。");
    }
    releasePlanPdfView();
    const fallbackType =
      planAttachmentKind(pdf) === "ppt"
        ? "application/vnd.openxmlformats-officedocument.presentationml.presentation"
        : "application/pdf";
    const typedBlob = blob.type
      ? blob
      : new Blob([blob], {
          type: pdf.type || fallbackType
        });
    const url = URL.createObjectURL(typedBlob);
    state.planPdfView = {
      appointmentId: appointment.id,
      name: pdf.name || "活动方案.pdf",
      size: Number(pdf.size) || blob.size || 0,
      type: pdf.type || "application/pdf",
      kind: planAttachmentKind(pdf),
      isPptx:
        planAttachmentKind(pdf) === "ppt" &&
        String(pdf.name || "").toLowerCase().endsWith(".pptx"),
      blob: typedBlob,
      url
    };
    openOverlayLayer({ type: "plan-pdf", appointmentId: appointment.id });
  }

  function openPlanAttachmentInBrowser() {
    const view = state.planPdfView;
    if (!view?.url) return showToast("方案附件已失效，请重新打开。");
    if (view.kind !== "pdf") {
      return showToast("PPT 无法在微信内直接预览，请下载后使用 WPS 或 PowerPoint 打开。");
    }
    if (isWeChatBrowser() && /iPhone|iPad|iPod/i.test(navigator.userAgent || "")) {
      window.location.href = view.url;
      return;
    }
    let popup = null;
    try {
      popup = window.open(view.url, "_blank");
    } catch (error) {
      popup = null;
    }
    if (popup) {
      try {
        popup.opener = null;
      } catch {
        // Cross-window access is best effort.
      }
      return;
    }
    try {
      window.location.href = view.url;
    } catch {
      showToast("当前环境无法直接打开，请使用下方“下载附件”。");
    }
  }

  function renderPlanPdfSheet() {
    const view = state.planPdfView;
    if (!view) return "";
    const isPdf = view.kind === "pdf";
    const isPptx = Boolean(view.isPptx);
    return `
      <div class="sheet-backdrop" data-action="close-overlay"></div>
      <section class="sheet pdf-sheet" role="dialog" aria-modal="true" aria-label="方案附件预览">
        <div class="sheet__grabber"></div>
        <div class="sheet__bar">
          <div><h2>方案附件</h2><p>${esc(view.name)} · ${esc(
            formatFileSize(view.size)
          )}</p></div>
          <button class="sheet__close" type="button" data-action="close-overlay" aria-label="关闭">
            ${icon("close", 15)}
          </button>
        </div>
        <div class="sheet__body pdf-sheet__body">
          ${
            isPdf
              ? `<div class="pdf-sheet__frame">
                  <iframe src="${esc(view.url)}#toolbar=0&navpanes=0" title="${esc(
                    view.name
                  )}" loading="eager"></iframe>
                </div>`
              : isPptx
              ? `<div class="pdf-sheet__frame pptx-sheet__frame">
                  <div class="pptx-viewer" data-pptx-viewer>
                    <div class="pptx-viewer__loading">
                      <span class="pptx-viewer__spinner" aria-hidden="true"></span>
                      <strong>正在加载演示文稿</strong>
                      <span>首次打开需载入预览组件，请稍候…</span>
                    </div>
                  </div>
                </div>`
              : `<div class="pdf-sheet__frame attachment-preview">
                  <span>${icon("clipboard", 30)}</span>
                  <strong>${esc(planAttachmentKindLabel(view.kind))} 材料</strong>
                  <p>${esc(view.name)}</p>
                  <small>${esc(
                    formatFileSize(view.size)
                  )} · 旧版 .ppt 无法在手机内解析，请下载后使用 PowerPoint 或 WPS 查看</small>
                </div>`
          }
          <div class="pdf-sheet__hint">
            ${icon("shield", 13)}
            <span>${
              isPdf
                ? "页面内预览受微信内核限制；如显示空白，可点击“微信内打开”交给微信浏览器查看。"
                : isPptx
                ? "PPTX 在当前手机内直接渲染；字体、动画与复杂图表可能与 PowerPoint 原稿略有差异，最终以源文件为准。"
                : "微信不支持直接预览 PPT，请下载后使用 WPS 或 PowerPoint 打开。"
            }附件支持最大 20MB。</span>
          </div>
        </div>
        <div class="sheet__footer pdf-sheet__footer">
          <button class="btn btn--ghost" type="button" data-action="close-overlay">关闭</button>
          ${
            isPdf
              ? `<a class="btn btn--soft" href="${esc(view.url)}" download="${esc(
                  view.name
                )}">${icon("download", 14)} 下载</a>
                <button class="btn btn--primary" type="button" data-action="plan-attachment-open">
                  ${icon("arrowUpRight", 14)} ${isWeChatBrowser() ? "微信内打开" : "新窗口打开"}
                </button>`
              : isPptx
              ? `<a class="btn btn--primary" href="${esc(view.url)}" download="${esc(
                  view.name
                )}">${icon("download", 15)} 下载原文件</a>`
              : `<a class="btn btn--primary" href="${esc(view.url)}" download="${esc(
                  view.name
                )}">${icon("download", 15)} 下载后用 WPS 打开</a>`
          }
        </div>
      </section>
    `;
  }

  function handleReviewPdfUpload(file) {
    if (!file || !state.adminDraft) return;
    if (!isAllowedPlanAttachment(file)) {
      return showToast("请选择 PDF、PPT 或 PPTX 文件。");
    }
    if (file.size > PLAN_ATTACHMENT_MAX_BYTES) {
      return showToast("单个方案附件请控制在 20MB 以内。");
    }
    state.adminDraft.planPdf = {
      name: file.name || "活动方案.pdf",
      size: file.size,
      type: file.type || "application/pdf",
      uploadedAt: new Date().toISOString()
    };
    state.adminDraft.planPdfBlob = file;
    state.adminDraft.planPdfRemoved = false;
    renderOverlay();
    showToast(
      `${planAttachmentKindLabel(planAttachmentKind(file))} 材料已载入，保存方案后机构可查看。`
    );
  }

  /* =========================================================
     Admin hospitals & accounts
     ========================================================= */
  function openHospitalEditor(hospitalId = "") {
    if (!isSuperadmin()) return showToast("仅超级管理员可维护医院资料。");
    const hospital = hospitalId ? hospitalConfigFor(hospitalId) : null;
    const region = normalizeRegion(
      hospital?.province || state.homeRegion?.province || "北京市",
      hospital?.city || state.homeRegion?.city || "北京市"
    );
    state.hospitalEditorDraft = hospital
      ? { ...hospital, isNew: false }
      : {
          id: "",
          name: "",
          short: "",
          province: region.province,
          city: region.city,
          address: "",
          phone: "",
          lat: Number(state.geoLat) || 39.9042,
          lng: Number(state.geoLng) || 116.4074,
          flagship: false,
          isNew: true
        };
    state.overlay = { type: "hospital-editor", hospitalId: hospitalId || "" };
    renderOverlay();
  }

  function renderHospitalEditorSheet() {
    const draft = state.hospitalEditorDraft;
    if (!draft) return "";
    return `
      <div class="sheet-backdrop" data-action="close-overlay"></div>
      <section class="sheet hospital-editor-sheet" role="dialog" aria-modal="true" aria-label="编辑医院资料">
        <div class="sheet__grabber"></div>
        <div class="sheet__bar">
          <div><h2>${draft.isNew ? "新增医院" : "编辑医院资料"}</h2><p>${
            draft.isNew ? "新增后可分配运营账号与专家资源" : esc(draft.name)
          }</p></div>
          <button class="sheet__close" type="button" data-action="close-overlay" aria-label="关闭">
            ${icon("close", 15)}
          </button>
        </div>
        <div class="sheet__body">
          <div class="sheet-pad">
            <div class="field-row">
              <div class="field"><label>医院名称 <em>*</em></label>
                <input type="text" data-hospital-field="name" value="${esc(
                  draft.name
                )}" placeholder="如：北京大学国际医院">
              </div>
              <div class="field"><label>医院简称 <em>*</em></label>
                <input type="text" data-hospital-field="short" value="${esc(
                  draft.short
                )}" placeholder="如：国际医院">
              </div>
            </div>
            <div class="field-row">
              <div class="field"><label>所在省份 <em>*</em></label>
                <select data-hospital-province>${renderProvinceOptions(draft.province)}</select>
              </div>
              <div class="field"><label>所在城市 <em>*</em></label>
                <select data-hospital-city>${renderCityOptions(
                  draft.province,
                  draft.city
                )}</select>
              </div>
            </div>
            <div class="field">
              <label>详细地址 <em>*</em></label>
              <input type="text" data-hospital-field="address" value="${esc(
                draft.address
              )}" placeholder="如：北京市昌平区中关村生命科学园生命园路1号">
              <span class="field-help">该地址用于机构端就近医院推荐与活动履约展示。</span>
            </div>
            <div class="field">
              <label>对外联系电话 <em>*</em></label>
              <input type="tel" inputmode="tel" maxlength="24" data-hospital-field="phone" value="${esc(
                draft.phone
              )}" placeholder="如：010-69007777">
            </div>
            <div class="field-row">
              <div class="field"><label>纬度（Lat） <em>*</em></label>
                <input type="number" inputmode="decimal" step="0.000001" min="3" max="54" data-hospital-field="lat" value="${esc(
                  draft.lat
                )}" placeholder="39.904200">
              </div>
              <div class="field"><label>经度（Lng） <em>*</em></label>
                <input type="number" inputmode="decimal" step="0.000001" min="73" max="136" data-hospital-field="lng" value="${esc(
                  draft.lng
                )}" placeholder="116.407400">
              </div>
            </div>
            <div class="field-help hospital-coordinate-help">${icon(
              "info",
              12
            )} 经纬度用于就近医院距离排序，请直接填写准确的纬度（3–54）和经度（73–136）。修改后，机构端重新进入首页即可看到新的距离排序。</div>
          </div>
        </div>
        <div class="sheet__footer">
          <button class="btn btn--ghost" type="button" data-action="close-overlay">取消</button>
          <button class="btn btn--primary" type="button" data-action="hospital-editor-save">
            ${draft.isNew ? "新增医院" : "保存医院资料"} ${icon("check", 14)}
          </button>
        </div>
      </section>
    `;
  }

  function saveHospitalEditor() {
    if (!isSuperadmin()) return showToast("仅超级管理员可维护医院。");
    const draft = state.hospitalEditorDraft;
    if (!draft) return;
    overlayRoot.querySelectorAll("[data-hospital-field]").forEach((input) => {
      draft[input.dataset.hospitalField] =
        input.dataset.hospitalField === "lat" || input.dataset.hospitalField === "lng"
          ? Number(input.value)
          : input.value.trim();
    });
    const result = saveHospitalRecord(draft);
    if (result.error) return showToast(result.error);
    logOperation(
      result.created ? "新增履约医院" : "更新医院资料",
      `${result.hospital.name} · ${result.hospital.city} · ${result.hospital.lat},${result.hospital.lng}`,
      {
        entityType: "hospital",
        entityId: result.hospital.id,
        hospitalId: result.hospital.id
      }
    );
    const scroll = currentWindowScroll();
    state.hospitalEditorDraft = null;
    state.overlay = null;
    releaseOverlayHistory();
    renderApp({ scrollTo: scroll });
    document.body.classList.remove("is-locked");
    showToast(
      result.created
        ? "医院已新增，请分配运营账号并维护专家号源。"
        : "医院资料已保存。"
    );
  }

  function openHospitalPhoneEditor(hospitalId) {
    if (!isSuperadmin()) return showToast("仅超级管理员可维护医院电话。");
    const hospital = hospitalById(hospitalId);
    if (!hospital) return;
    state.hospitalPhoneDraft = {
      hospitalId: hospital.id,
      phone: hospital.phone || ""
    };
    state.overlay = { type: "hospital-phone" };
    renderOverlay();
  }

  function renderHospitalPhoneSheet() {
    const draft = state.hospitalPhoneDraft;
    const hospital = hospitalById(draft?.hospitalId);
    if (!draft || !hospital) return "";
    return `
      <div class="sheet-backdrop" data-action="close-overlay"></div>
      <section class="sheet hospital-phone-sheet" role="dialog" aria-modal="true" aria-label="编辑医院电话">
        <div class="sheet__grabber"></div>
        <div class="sheet__bar">
          <div><h2>编辑医院电话</h2><p>${esc(hospital.name)}</p></div>
          <button class="sheet__close" type="button" data-action="close-overlay" aria-label="关闭">
            ${icon("close", 15)}
          </button>
        </div>
        <div class="sheet__body">
          <div class="sheet-pad">
            <div class="info-card">
              <div class="info-row"><span>医院</span><strong>${esc(
                hospital.name
              )}</strong></div>
              <div class="info-row"><span>所在地区</span><strong>${esc(
                regionText(hospital.province, hospital.city)
              )}</strong></div>
            </div>
            <div class="field">
              <label>对外联系电话 <em>*</em></label>
              <input type="tel" inputmode="tel" maxlength="24"
                data-hospital-phone-input value="${esc(draft.phone)}"
                placeholder="如：010-69007777">
              <span class="field-help">${icon(
                "phone",
                11
              )} 保存后同步到机构端「我的 · 医院服务咨询」，支持点击拨号。</span>
            </div>
          </div>
        </div>
        <div class="sheet__footer">
          <button class="btn btn--ghost" type="button" data-action="close-overlay">取消</button>
          <button class="btn btn--primary" type="button" data-action="hospital-phone-save">
            保存电话 ${icon("check", 14)}
          </button>
        </div>
      </section>
    `;
  }

  function saveHospitalPhoneDraft() {
    if (!isSuperadmin()) return showToast("仅超级管理员可维护医院电话。");
    const draft = state.hospitalPhoneDraft;
    const hospital = hospitalById(draft?.hospitalId);
    if (!draft || !hospital) return;
    const phone = String(draft.phone || "").trim();
    if (!/^[\d\s()+-]{6,24}$/.test(phone)) {
      return showToast("请填写正确的医院联系电话。");
    }
    saveHospitalConfig(hospital.id, { phone });
    state.hospitals = state.hospitals.map((item) =>
      item.id === hospital.id ? { ...item, phone } : item
    );
    logOperation("更新医院联系电话", `${hospital.name} · ${phone}`, {
      entityType: "hospital",
      entityId: hospital.id,
      hospitalId: hospital.id
    });
    const scroll = currentWindowScroll();
    state.hospitalPhoneDraft = null;
    state.overlay = null;
    releaseOverlayHistory();
    renderApp({ scrollTo: scroll });
    document.body.classList.remove("is-locked");
    showToast("医院电话已保存。");
  }

  function renderAdminHospitalsPage() {
    if (!isSuperadmin()) {
      state.adminTab = "appointments";
      return renderAdminAppointmentsPage();
    }
    const accounts = getAdminAccounts();
    return `
      <div class="admin-page-head">
        <div><h1>医院与账号</h1><p>超级管理员分配医院运营人员</p></div>
        <div class="admin-page-head__actions">
          <button class="btn btn--ghost btn--sm" type="button" data-action="admin-account-add">
            ${icon("plus", 13)} 新增账号
          </button>
          <button class="btn btn--primary btn--sm" type="button" data-action="hospital-editor-add">
            ${icon("plus", 13)} 新增医院
          </button>
        </div>
      </div>
      ${renderAdminTabs()}
      <div class="hospital-admin-list">
        ${state.hospitals
          .map((hospital) => {
            const operators = hospitalOperators(hospital.id);
            const expertCount = state.experts.filter(
              (item) => item.hospitalId === hospital.id && item.active !== false
            ).length;
            const pending = getAppointments().filter(
              (item) => item.hospitalId === hospital.id && item.status === "pending"
            ).length;
            return `
              <article class="hospital-admin-card">
                <div class="hospital-admin-card__head">
                  <div>
                    <div class="hospital-admin-card__titleline">
                      <strong>${esc(hospital.name)}</strong>
                      <button class="hospital-phone-chip" type="button"
                        data-action="hospital-phone-edit" data-hospital-id="${esc(
                          hospital.id
                        )}" aria-label="编辑${esc(hospital.name)}联系电话">
                        ${icon("phone", 9)}
                        <span>${esc(hospital.phone || "电话待配置")}</span>
                        ${icon("edit", 9)}
                      </button>
                    </div>
                    <span>${esc(regionText(hospital.province, hospital.city))}</span>
                  </div>
                  <span class="${operators.length ? "is-on" : "is-off"}">${
                    operators.length ? "已配置运营" : "待配置运营"
                  }</span>
                </div>
                <div class="hospital-admin-card__stats">
                  <span><b>${expertCount}</b> 位专家</span>
                  <span><b>${pending}</b> 待接单</span>
                </div>
                <div class="hospital-admin-card__operators">
                  ${
                    operators.length
                      ? operators
                          .map(
                            (account) =>
                              `<span>${esc(account.name)} · ${phoneLink(
                                account.phone,
                                account.phone
                              )}</span>`
                          )
                          .join("")
                      : '<span class="location-pending">尚未分配运营人员，机构预约将无人接单</span>'
                  }
                </div>
                <div class="hospital-admin-card__actions">
                  <button class="btn btn--ghost btn--sm" type="button" data-action="hospital-editor-edit"
                    data-hospital-id="${esc(hospital.id)}">
                    ${icon("edit", 12)} 编辑医院资料
                  </button>
                  <button class="btn btn--ghost btn--sm" type="button" data-action="admin-hospital-operator"
                    data-hospital-id="${esc(hospital.id)}">
                    ${icon("plus", 12)} 分配运营人员
                  </button>
                </div>
              </article>
            `;
          })
          .join("")}
      </div>
      <div class="section-head section-head--admin">
        <div><h2>院方账号</h2><p>超级管理员与医院运营</p></div>
        <span>${accounts.length} 个</span>
      </div>
      <div class="account-list">
        ${accounts
          .map((account) => {
            const hospital = hospitalById(account.hospitalId);
            return `
              <button class="account-row" type="button" data-action="open-admin-account"
                data-username="${esc(account.username)}">
                <span class="account-row__avatar">${esc(initialOf(account.name))}</span>
                <span class="account-row__body">
                  <strong>${esc(account.name)}
                    <i class="role-tag role-tag--${account.role}">${esc(
                      adminRoleMeta(account).label
                    )}</i>
                    ${account.active ? "" : '<i class="role-tag is-off">已停用</i>'}
                  </strong>
                  <span>${esc(account.username)} · ${phoneLink(account.phone, account.phone)}</span>
                  <small>${esc(
                    account.role === "superadmin" ? "全部医院" : hospital?.name || "未绑定医院"
                  )}</small>
                </span>
                ${icon("chevronRight", 14)}
              </button>
            `;
          })
          .join("")}
      </div>
    `;
  }

  function renderInstitutionAccountsPage() {
    if (!isSuperadmin()) {
      state.adminTab = "appointments";
      return renderAdminAppointmentsPage();
    }
    const accounts = getInstitutionAccounts().sort((a, b) => {
      const activeOrder = Number(b.active) - Number(a.active);
      return activeOrder || a.orgName.localeCompare(b.orgName, "zh-CN");
    });
    const activeCount = accounts.filter((account) => account.active).length;
    return `
      <div class="admin-page-head">
        <div><h1>机构账号</h1><p>仅已开通手机号可登录机构端</p></div>
        <button class="btn btn--primary btn--sm" type="button" data-action="institution-account-add">
          ${icon("plus", 14)} 开通机构
        </button>
      </div>
      ${renderAdminTabs()}
      <div class="admin-stats admin-stats--three">
        <div class="admin-stat"><small>已开通</small><strong>${activeCount}</strong><span>可登录机构账号</span></div>
        <div class="admin-stat"><small>已停用</small><strong>${accounts.length - activeCount}</strong><span>不可登录</span></div>
        <div class="admin-stat"><small>覆盖机构</small><strong>${new Set(
          accounts
            .filter((item) => item.active && item.orgName)
            .map((item) => item.orgName)
        ).size}</strong><span>集团与分支机构</span></div>
      </div>
      <div class="institution-account-note">
        ${icon("shield", 15)}
        <span>机构手机号是登录白名单。开通时只需填写手机号与姓名，单位、机构类型、职务、联系方式和通知邮箱由机构首次登录后补充完整；未开通手机号将无法获取验证码登录。</span>
      </div>
      <div class="account-list institution-account-list">
        ${
          accounts.length
            ? accounts
                .map(
                  (account) => `
                    <button class="account-row ${account.active ? "" : "is-disabled"}" type="button"
                      data-action="open-institution-account" data-phone="${esc(account.phone)}">
                      <span class="account-row__avatar">${esc(initialOf(account.orgName || account.name))}</span>
                      <span class="account-row__body">
                        <strong>${esc(account.orgName || "未填写单位")}
                          <i class="role-tag role-tag--operator">${esc(
                            account.orgType || "资料待补充"
                          )}</i>
                          ${account.active ? "" : '<i class="role-tag is-off">已停用</i>'}
                        </strong>
                        <span>${esc(account.name || "未填写姓名")} · ${phoneLink(
                          account.phone,
                          account.phone
                        )}</span>
                        <small>${esc(
                          regionText(account.province, account.city) || "地区待补充"
                        )}${account.email ? ` · ${esc(account.email)}` : ""}</small>
                      </span>
                      ${icon("chevronRight", 14)}
                    </button>
                  `
                )
                .join("")
            : `<div class="empty-state"><span class="empty-state__icon">${icon(
                "users",
                26
              )}</span><h3>尚未开通机构账号</h3><p>点击右上角开通后，该手机号才能登录机构端。</p></div>`
        }
      </div>
    `;
  }

  function openInstitutionAccountEditor(phone = "") {
    if (!isSuperadmin()) return showToast("仅超级管理员可配置机构账号。");
    const account = phone ? institutionAccountByPhone(phone) : null;
    state.institutionAccountDraft = account
      ? { ...account, originalPhone: account.phone, isNew: false }
      : {
          phone: "",
          originalPhone: "",
          name: "",
          orgName: "",
          orgType: "",
          title: "",
          contactPhone: "",
          email: "",
          province: "北京市",
          city: "北京市",
          active: true,
          isNew: true
        };
    state.overlay = { type: "admin-institution" };
    renderOverlay();
  }

  function renderInstitutionAccountSheet() {
    const draft = state.institutionAccountDraft;
    if (!draft) return "";
    return `
      <div class="sheet-backdrop" data-action="close-overlay"></div>
      <section class="sheet institution-account-sheet" role="dialog" aria-modal="true" aria-label="机构账号">
        <div class="sheet__grabber"></div>
        <div class="sheet__bar">
          <div><h2>${draft.isNew ? "开通机构账号" : "编辑机构账号"}</h2><p>仅手机号与姓名为必填，其余资料由机构登录后补充</p></div>
          <button class="sheet__close" type="button" data-action="close-overlay" aria-label="关闭">
            ${icon("close", 15)}
          </button>
        </div>
        <div class="sheet__body">
          <div class="sheet-pad">
            <div class="institution-account-banner">
              ${icon("phone", 15)}
              <span><strong>手机号与姓名即可开通白名单</strong><small>其余资料选填，机构人员首次登录后必须补充完整才能预约；停用后该手机号无法登录。</small></span>
            </div>
            <div class="field-row">
              <div class="field"><label>登录手机号 <em>*</em></label>
                <input type="tel" inputmode="numeric" maxlength="11" data-institution-field="phone"
                  value="${esc(draft.phone)}" placeholder="11 位手机号">
              </div>
              <div class="field"><label>姓名 <em>*</em></label>
                <input type="text" data-institution-field="name" value="${esc(
                  draft.name
                )}" placeholder="机构联系人姓名">
              </div>
            </div>
            <div class="field"><label>单位名称 <span>选填，机构登录后补充</span></label>
              <input type="text" data-institution-field="orgName" value="${esc(
                draft.orgName
              )}" placeholder="如已知可填写，否则留空">
            </div>
            <div class="field-row">
              <div class="field"><label>机构类型 <span>选填</span></label>
                <select data-institution-field="orgType">
                  <option value="" ${
                    draft.orgType ? "" : "selected"
                  }>待机构登录后选择</option>
                  ${INSTITUTION_TYPES
                    .map(
                      (type) =>
                        `<option value="${esc(type)}" ${
                          draft.orgType === type ? "selected" : ""
                        }>${esc(type)}</option>`
                    )
                    .join("")}
                </select>
              </div>
              <div class="field"><label>职务 <span>选填</span></label>
                <input type="text" data-institution-field="title" value="${esc(
                  draft.title
                )}" placeholder="机构登录后补充">
              </div>
            </div>
            <div class="field-row">
              <div class="field"><label>联系方式 <span>选填</span></label>
                <input type="tel" inputmode="numeric" maxlength="11" data-institution-field="contactPhone"
                  value="${esc(draft.contactPhone || draft.phone)}" placeholder="默认同登录手机号">
              </div>
              <div class="field"><label>通知邮箱 <span>选填，登录后必填</span></label>
                <input type="email" inputmode="email" data-institution-field="email"
                  value="${esc(draft.email || "")}" placeholder="name@company.com">
              </div>
            </div>
            <div class="field-row">
              <div class="field">
                <label>所在省份 <span>登录后按定位同步</span></label>
                <select data-institution-province>${renderProvinceOptions(
                  draft.province
                )}</select>
              </div>
              <div class="field">
                <label>所在城市</label>
                <select data-institution-city>${renderCityOptions(
                  draft.province,
                  draft.city
                )}</select>
              </div>
            </div>
            <label class="switch-row">
              <span><strong>允许登录机构端</strong><small>停用后手机号无法获取验证码登录</small></span>
              <input type="checkbox" data-institution-active ${draft.active ? "checked" : ""}>
            </label>
          </div>
        </div>
        <div class="sheet__footer">
          <button class="btn btn--ghost" type="button" data-action="close-overlay">取消</button>
          <button class="btn btn--primary" type="button" data-action="institution-account-save">
            保存机构账号 ${icon("check", 14)}
          </button>
        </div>
      </section>
    `;
  }

  function saveInstitutionAccount() {
    if (!isSuperadmin()) return showToast("仅超级管理员可配置机构账号。");
    const draft = state.institutionAccountDraft;
    if (!draft) return;
    const phone = String(draft.phone || "").replace(/\s+/g, "");
    if (!/^1\d{10}$/.test(phone)) return showToast("请填写正确的 11 位登录手机号。");
    if (!draft.name?.trim()) return showToast("请填写机构联系人姓名。");
    if (draft.orgType && !INSTITUTION_TYPES.includes(draft.orgType)) {
      return showToast("请选择机构类型。");
    }
    const contactPhone = String(draft.contactPhone || draft.phone || "").trim();
    if (contactPhone && !/^1\d{10}$/.test(contactPhone)) {
      return showToast("联系方式格式不正确。");
    }
    if (draft.email?.trim() && !validProfileEmail(draft.email)) {
      return showToast("通知邮箱格式不正确。");
    }
    const accounts = getInstitutionAccounts();
    const duplicate = accounts.find(
      (item) =>
        item.phone === phone &&
        (!draft.originalPhone || item.phone !== draft.originalPhone)
    );
    if (duplicate) return showToast("该手机号已经开通机构账号。");
    const region = normalizeRegion(draft.province, draft.city);
    const payload = normalizeInstitutionAccount({
      ...draft,
      phone,
      orgType: draft.orgType || "",
      contactPhone,
      province: region.province,
      city: region.city,
      updatedAt: new Date().toISOString()
    });
    const next = draft.isNew
      ? accounts.concat(payload)
      : accounts.map((item) =>
          item.phone === draft.originalPhone ? { ...item, ...payload } : item
        );
    saveInstitutionAccounts(next);
    const existingUser = getUser(payload.phone);
    if (existingUser) {
      upsertUser({
        ...existingUser,
        name: payload.name,
        orgName: payload.orgName,
        orgType: payload.orgType,
        title: payload.title,
        contactPhone: payload.contactPhone,
        email: payload.email,
        province: payload.province,
        city: payload.city
      });
    }
    logOperation(
      draft.isNew ? "开通机构账号" : "更新机构账号",
      `${payload.orgName || "待补充单位"} · ${payload.name} · ${payload.phone}`,
      { entityType: "institution", entityId: payload.phone }
    );
    state.overlay = null;
    state.institutionAccountDraft = null;
    releaseOverlayHistory();
    renderApp();
    showToast(
      draft.isNew
        ? "机构账号已开通，机构首次登录后需补充企业资料。"
        : "机构账号已更新。"
    );
  }

  function renderAdminLogsPage() {
    if (!isSuperadmin()) {
      state.adminTab = "appointments";
      return renderAdminAppointmentsPage();
    }
    const logs = getOperationLogs().filter((item) => {
      if (!state.adminHospitalId) return true;
      return !item.hospitalId || item.hospitalId === state.adminHospitalId;
    });
    return `
      <div class="admin-page-head">
        <div><h1>操作日志</h1><p>关键配置与履约操作留痕</p></div>
        <span class="admin-page-head__date">最近 ${logs.length} 条</span>
      </div>
      ${renderAdminTabs()}
      ${renderAdminHospitalFilter()}
      <div class="admin-log-list">
        ${
          logs.length
            ? logs
                .slice(0, 120)
                .map(
                  (item) => `
                    <article class="admin-log-item">
                      <div class="admin-log-item__head">
                        <strong>${esc(item.action)}</strong>
                        <span>${esc(formatDateTime(item.at))}</span>
                      </div>
                      <p>${esc(item.detail)}</p>
                      <small>${esc(item.actor?.name || "系统")} · ${esc(
                        item.entityId || item.entityType || ""
                      )}</small>
                    </article>
                  `
                )
                .join("")
            : `<div class="empty-state"><span class="empty-state__icon">${icon(
                "history",
                26
              )}</span><h3>暂无操作日志</h3><p>接单、方案发送、号源与账号变更会自动记录。</p></div>`
        }
      </div>
    `;
  }

  function openAdminAccountEditor(username = "", hospitalId = "", role = "") {
    if (!isSuperadmin()) return showToast("仅超级管理员可分配院方账号。");
    const account = getAdminAccounts().find((item) => item.username === username);
    state.adminAccountDraft = account
      ? { ...account, password: "", isNew: false }
      : {
          username: "",
          password: "",
          name: "",
          phone: "",
          role: role || "operator",
          hospitalId: hospitalId || state.hospitals[0]?.id || "",
          active: true,
          isNew: true
        };
    state.overlay = { type: "admin-account" };
    renderOverlay();
  }

  function renderAdminAccountSheet() {
    const draft = state.adminAccountDraft;
    if (!draft) return "";
    return `
      <div class="sheet-backdrop" data-action="close-overlay"></div>
      <section class="sheet" role="dialog" aria-modal="true" aria-label="院方账号">
        <div class="sheet__grabber"></div>
        <div class="sheet__bar">
          <div><h2>${draft.isNew ? "新增院方账号" : "编辑院方账号"}</h2><p>角色与医院权限</p></div>
          <button class="sheet__close" type="button" data-action="close-overlay" aria-label="关闭">
            ${icon("close", 15)}
          </button>
        </div>
        <div class="sheet__body">
          <div class="sheet-pad">
            <div class="field"><label>角色</label>
              <div class="choice-grid">
                ${Object.entries(ROLE)
                  .map(
                    ([id, role]) =>
                      `<button class="choice-tile ${
                        draft.role === id ? "is-active" : ""
                      }" type="button" data-action="account-role" data-value="${id}">
                        <strong>${esc(role.label)}</strong>
                      </button>`
                  )
                  .join("")}
              </div>
              <span class="field-help">${esc(ROLE[draft.role]?.desc || "")}</span>
            </div>
            ${
              draft.role === "operator"
                ? `<div class="field"><label>所属医院 <em>*</em></label>
                    <select data-account-field="hospitalId">
                      ${state.hospitals
                        .map(
                          (hospital) =>
                            `<option value="${esc(hospital.id)}" ${
                              draft.hospitalId === hospital.id ? "selected" : ""
                            }>${esc(hospital.name)}</option>`
                        )
                        .join("")}
                    </select>
                  </div>`
                : ""
            }
            <div class="field-row">
              <div class="field"><label>姓名 <em>*</em></label>
                <input type="text" data-account-field="name" value="${esc(draft.name)}">
              </div>
              <div class="field"><label>手机号 <em>*</em></label>
                <input type="tel" inputmode="numeric" maxlength="11" data-account-field="phone" value="${esc(
                  draft.phone
                )}">
              </div>
            </div>
            <div class="field-row">
              <div class="field"><label>登录账号 <em>*</em></label>
                <input type="text" data-account-field="username" value="${esc(
                  draft.username
                )}" ${draft.isNew ? "" : "disabled"}>
              </div>
              <div class="field"><label>密码 ${draft.isNew ? "<em>*</em>" : ""}</label>
                <input type="password" data-account-field="password" value="${esc(
                  draft.password
                )}" placeholder="${draft.isNew ? "设置登录密码" : "留空则不修改"}">
              </div>
            </div>
            <label class="switch-row">
              <span><strong>账号启用</strong><small>停用后无法登录院方工作台</small></span>
              <input type="checkbox" data-account-active ${draft.active ? "checked" : ""}>
            </label>
            <p class="field-help">医院运营登录后只能看到并维护所属医院的专家、号源与预约。</p>
          </div>
        </div>
        <div class="sheet__footer">
          <button class="btn btn--ghost" type="button" data-action="close-overlay">取消</button>
          <button class="btn btn--primary" type="button" data-action="admin-account-save">保存账号</button>
        </div>
      </section>
    `;
  }

  function saveAdminAccount() {
    if (!isSuperadmin()) return showToast("仅超级管理员可保存院方账号。");
    const draft = state.adminAccountDraft;
    if (!draft) return;
    if (!draft.name?.trim()) return showToast("请填写姓名。");
    if (!draft.username?.trim()) return showToast("请填写登录账号。");
    if (draft.isNew && !draft.password?.trim()) return showToast("请设置登录密码。");
    if (!/^1\d{10}$/.test(draft.phone || "")) return showToast("请填写正确的手机号。");
    if (draft.role === "operator" && !draft.hospitalId) return showToast("请选择所属医院。");
    const accounts = getAdminAccounts();
    if (draft.isNew && accounts.some((item) => item.username === draft.username.trim())) {
      return showToast("登录账号已存在。");
    }
    if (!draft.active && draft.username === state.adminUser.username) {
      return showToast("不能停用当前登录账号。");
    }
    const payload = {
      username: draft.username.trim(),
      name: draft.name.trim(),
      phone: draft.phone.trim(),
      role: draft.role,
      hospitalId: draft.role === "operator" ? draft.hospitalId : "",
      active: Boolean(draft.active),
      password: draft.password || accounts.find((item) => item.username === draft.username)?.password,
      updatedAt: new Date().toISOString()
    };
    const next = draft.isNew
      ? accounts.concat({ ...payload, createdAt: new Date().toISOString() })
      : accounts.map((item) =>
          item.username === draft.username ? { ...item, ...payload } : item
        );
    if (
      !next.some((item) => item.role === "superadmin" && item.active)
    ) {
      return showToast("至少需要保留一个启用的超级管理员。");
    }
    saveAdminAccounts(next);
    logOperation(
      draft.isNew ? "新增院方账号" : "更新院方账号",
      `${payload.name} · ${payload.username} · ${ROLE[payload.role]?.label || ""}`,
      {
        entityType: "admin-account",
        entityId: payload.username,
        hospitalId: payload.hospitalId
      }
    );
    if (payload.username === state.adminUser.username) {
      state.adminUser = next.find((item) => item.username === payload.username);
      setAdminSession(state.adminUser);
    }
    state.overlay = null;
    releaseOverlayHistory();
    renderApp();
    showToast("院方账号已保存。");
  }

  /* =========================================================
     Marketing posters
     ========================================================= */
  const MARKETING_POSTERS = [
    {
      id: "brand",
      eyebrow: "权威主视觉",
      title: "让权威医疗，走近企业",
      desc: "以医院品牌、名医团队与三级专家资源为核心，适合活动预热和朋友圈传播。",
      tags: ["医院权威", "名医资源", "品牌传播"],
      image: "assets/posters/poster-brand.webp",
      thumb: "assets/posters/thumbs/poster-brand.webp"
    },
    {
      id: "lecture",
      eyebrow: "专家阵容",
      title: "院士级资源，为企业开讲",
      desc: "突出临床专家阵容、重点学科覆盖与分层匹配能力。",
      tags: ["专家阵容", "重点学科", "三级资源"],
      image: "assets/posters/poster-lecture.webp",
      thumb: "assets/posters/thumbs/poster-lecture.webp"
    },
    {
      id: "premium",
      eyebrow: "保险高客答谢",
      title: "把名医，请到客户身边",
      desc: "面向保险高客沙龙与客户答谢会，强调名医面对面与专属策划。",
      tags: ["保险高客", "客户答谢", "专属策划"],
      image: "assets/posters/poster-premium.webp",
      thumb: "assets/posters/thumbs/poster-premium.webp"
    },
    {
      id: "care",
      eyebrow: "企业健康价值",
      title: "一场讲座，四重价值",
      desc: "从员工健康素养、组织活力到雇主品牌与客户连接，说明企业健康活动价值。",
      tags: ["企业价值", "员工关怀", "雇主品牌"],
      image: "assets/posters/poster-care.webp",
      thumb: "assets/posters/thumbs/poster-care.webp"
    }
  ];

  function defaultMarketingPosters() {
    const now = new Date().toISOString();
    return MARKETING_POSTERS.map((poster) => ({
      ...poster,
      source: "official",
      hospitalId: "",
      builtin: true,
      createdAt: now,
      updatedAt: now
    }));
  }

  function getMarketingPosters() {
    const stored = readJSON(STORAGE.marketingPosters, null);
    if (Array.isArray(stored)) return stored;
    const seeded = defaultMarketingPosters();
    writeJSON(STORAGE.marketingPosters, seeded);
    return seeded;
  }

  function saveMarketingPosters(list) {
    writeJSON(STORAGE.marketingPosters, list);
  }

  function marketingPosterById(id) {
    return getMarketingPosters().find((item) => item.id === id) || null;
  }

  function marketingPosterScopeLabel(poster) {
    if (poster?.source === "official") return "官方海报";
    const hospital = hospitalById(poster?.hospitalId);
    return hospital ? `${hospital.short || hospital.name} · 自有海报` : "医院自有海报";
  }

  function marketingPosterManageable(poster) {
    if (!poster) return false;
    if (isSuperadmin()) return true;
    const hospital = operatorHospital();
    return Boolean(
      hospital &&
        poster.source !== "official" &&
        poster.hospitalId === hospital.id
    );
  }

  function visibleMarketingPosters() {
    const all = getMarketingPosters();
    const scopeHospitalId = isSuperadmin()
      ? state.adminHospitalId
      : operatorHospital()?.id || "";
    const official = all.filter((poster) => poster.source === "official");
    const hospitalPosters = all.filter(
      (poster) =>
        poster.source !== "official" &&
        (!scopeHospitalId || poster.hospitalId === scopeHospitalId)
    );
    if (state.marketingFilter === "official") return official;
    if (state.marketingFilter === "hospital") return hospitalPosters;
    return [...official, ...hospitalPosters];
  }

  function renderMarketingPage() {
    const all = getMarketingPosters();
    const posters = visibleMarketingPosters();
    const officialCount = all.filter((poster) => poster.source === "official").length;
    const hospital = operatorHospital();
    const hospitalCount = all.filter(
      (poster) =>
        poster.source !== "official" &&
        (isSuperadmin()
          ? !state.adminHospitalId || poster.hospitalId === state.adminHospitalId
          : poster.hospitalId === (hospital?.id || ""))
    ).length;
    const hospitalFilterLabel = isSuperadmin() ? "医院上传" : "本院海报";
    return `
      <div class="admin-page-head">
        <div><h1>展业海报</h1><p>${
          isSuperadmin()
            ? "统一维护官方海报，医院运营可直接下载分享"
            : "官方海报统一配置，本院海报可自行上传分享"
        }</p></div>
        <span class="admin-page-head__date">${posters.length} 张可分享</span>
      </div>
      ${renderAdminTabs()}
      ${renderAdminHospitalFilter()}
      <div class="marketing-tools">
        <div class="marketing-filter">
          ${[
            ["all", "全部"],
            ["official", "官方海报"],
            ["hospital", hospitalFilterLabel]
          ]
            .map(
              ([value, label]) => `
                <button class="${state.marketingFilter === value ? "is-active" : ""}"
                  type="button" data-action="marketing-filter" data-value="${value}">${label}</button>
              `
            )
            .join("")}
        </div>
        <button class="btn btn--primary btn--sm" type="button" data-action="marketing-poster-add">
          ${icon("plus", 13)} ${isSuperadmin() ? "上传官方海报" : "上传本院海报"}
        </button>
      </div>
      <section class="marketing-hero">
        <span class="marketing-hero__badge">${icon("send", 13)} 统一展业海报库</span>
        <h2>把专业服务，变成可分享的邀请</h2>
        <p>${
          isSuperadmin()
            ? "官方海报由超级管理员统一配置；上传后医院运营可直接保存、下载并分享给客户。"
            : "官方海报由超级管理员统一配置；医院运营也可上传本院自有海报，保存后即可分享或下载。"
        }海报仅保留预约二维码，不展示项目人员姓名与电话。</p>
        <div class="marketing-hero__facts">
          <span><b>${officialCount}</b>张官方</span><span><b>${hospitalCount}</b>张${
            isSuperadmin() ? "医院上传" : "本院自有"
          }</span><span><b>1</b>个预约二维码</span>
        </div>
      </section>
      ${
        posters.length
          ? `<div class="poster-list">
        ${posters.map(
          (poster) => `
            <button class="poster-card" type="button" data-action="open-poster" data-poster-id="${esc(
              poster.id
            )}">
              <span class="poster-card__visual">
                <img src="${esc(posterImageSource(poster))}" alt="${esc(poster.title)}" loading="eager" decoding="async">
                <i>${esc(poster.eyebrow)}</i>
                <em class="poster-card__scope ${
                  poster.source === "official" ? "is-official" : "is-hospital"
                }">${esc(marketingPosterScopeLabel(poster))}</em>
              </span>
              <span class="poster-card__copy">
                <strong>${esc(poster.title)}</strong>
                <span>${esc(poster.desc)}</span>
                <span class="poster-card__tags">${(poster.tags || [])
                  .map((tag) => `<i>${esc(tag)}</i>`)
                  .join("")}</span>
                <b>查看 · 下载 · 分享 ${icon("arrowRight", 12)}</b>
              </span>
            </button>
          `
        ).join("")}</div>`
          : `<div class="empty-state marketing-empty">
              <span class="empty-state__icon">${icon("send", 26)}</span>
              <h3>${state.marketingFilter === "hospital" ? "暂无自有海报" : "暂无海报"}</h3>
              <p>${
                isSuperadmin()
                  ? "上传官方海报后，医院运营即可下载分享。"
                  : "可上传本院自有海报，保存后直接分享给客户。"
              }</p>
              <button class="btn btn--primary btn--sm" type="button" data-action="marketing-poster-add">
                ${icon("plus", 13)} 上传海报
              </button>
              ${
                isSuperadmin()
                  ? `<button class="btn btn--ghost btn--sm" type="button" data-action="marketing-poster-reset">
                      恢复官方海报
                    </button>`
                  : ""
              }
            </div>`
      }
      <div class="marketing-guide">
        <div><span>01</span><strong>官方统一配置</strong><p>超级管理员维护品牌主视觉与标准海报。</p></div>
        <div><span>02</span><strong>本院可上传自有海报</strong><p>医院运营上传本地物料，自动保存到海报库。</p></div>
        <div><span>03</span><strong>下载或分享给客户</strong><p>保存高清图发朋友圈，或复制预约链接。</p></div>
      </div>
    `;
  }

  function releasePosterImage() {
    if (state.posterViewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(state.posterViewUrl);
    }
    state.posterViewUrl = "";
  }

  function releaseMarketingDraft() {
    const draft = state.marketingDraft;
    if (draft?.previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(draft.previewUrl);
    }
    if (
      draft?.imageKey &&
      draft.imageKey !== (draft.originalImageKey || "")
    ) {
      deletePosterImageBlob(draft.imageKey);
    }
    state.marketingDraft = null;
  }

  function posterImageSource(poster) {
    return poster?.thumb || poster?.image || "";
  }

  async function openPosterSheet(id) {
    const poster = marketingPosterById(id);
    if (!poster) return;
    releasePosterImage();
    state.posterId = id;
    state.overlay = { type: "poster", posterId: id };
    renderOverlay();
    if (poster.imageKey) {
      try {
        const blob = await loadPosterImageBlob(poster.imageKey);
        if (!blob || state.posterId !== id) return;
        state.posterViewUrl = URL.createObjectURL(blob);
        renderOverlay();
      } catch {
        showToast("海报原图读取失败，已显示缩略图。");
      }
    }
  }

  function renderPosterSheet() {
    const poster = marketingPosterById(state.posterId);
    if (!poster) return "";
    const manageable = marketingPosterManageable(poster);
    const imageSrc = state.posterViewUrl || posterImageSource(poster);
    return `
      <div class="sheet-backdrop" data-action="close-overlay"></div>
      <section class="sheet poster-sheet" role="dialog" aria-modal="true" aria-label="海报预览">
        <div class="sheet__grabber"></div>
        <div class="sheet__bar">
          <div><h2>${esc(poster.eyebrow || "展业海报")}</h2><p>${esc(
            marketingPosterScopeLabel(poster)
          )} · 高清海报</p></div>
          <button class="sheet__close" type="button" data-action="close-overlay" aria-label="关闭">${icon(
            "close",
            15
          )}</button>
        </div>
        <div class="sheet__body">
          <div class="poster-sheet__frame">
            <img src="${esc(imageSrc)}" alt="${esc(poster.title)}" decoding="async"
              style="background-image:url('${esc(posterImageSource(poster))}')">
          </div>
          <div class="poster-sheet__meta">
            <span>${(poster.tags || [])
              .map((tag) => `<i>${esc(tag)}</i>`)
              .join("")}</span>
            <strong>${esc(poster.title)}</strong>
            <p>${esc(poster.desc)}</p>
            <p>二维码统一指向企业健康服务平台。微信中可直接长按图片保存到相册，再发送朋友圈或客户群。</p>
            ${
              manageable
                ? `<div class="poster-admin-actions">
                    <button class="btn btn--ghost btn--sm" type="button" data-action="marketing-poster-edit">${icon(
                      "edit",
                      13
                    )} 编辑</button>
                    <button class="btn btn--ghost btn--sm poster-delete" type="button" data-action="marketing-poster-delete">${icon(
                      "trash",
                      13
                    )} 删除</button>
                  </div>`
                : ""
            }
          </div>
        </div>
        <div class="sheet__footer">
          <button class="btn btn--primary" type="button" data-action="save-poster">${icon(
            "checkCircle",
            15
          )} 保存高清海报</button>
          <button class="btn btn--ghost" type="button" data-action="marketing-poster-share">${icon(
            "send",
            14
          )} 分享给客户</button>
        </div>
      </section>
    `;
  }

  function openPosterUpload(id = "") {
    const existing = id ? marketingPosterById(id) : null;
    if (existing && !marketingPosterManageable(existing)) {
      return showToast("只能编辑本账号可管理的海报。");
    }
    const hospital = operatorHospital();
    state.marketingDraft = existing
      ? {
          ...existing,
          tagsText: (existing.tags || []).join("、"),
          previewUrl: existing.thumb || existing.image || "",
          originalImageKey: existing.imageKey || ""
        }
      : {
          id: "",
          source: isSuperadmin() ? "official" : "hospital",
          hospitalId: isSuperadmin() ? "" : hospital?.id || "",
          eyebrow: isSuperadmin() ? "官方海报" : `${hospital?.short || "本院"} · 自有海报`,
          title: "",
          desc: "",
          tagsText: "",
          image: "",
          imageKey: "",
          thumb: "",
          previewUrl: "",
          originalImageKey: "",
          builtin: false
        };
    state.overlay = { type: "poster-upload" };
    renderOverlay();
  }

  function renderPosterUploadSheet() {
    const draft = state.marketingDraft;
    if (!draft) return "";
    const editing = Boolean(draft.id);
    const preview = draft.previewUrl || draft.image || draft.thumb;
    return `
      <div class="sheet-backdrop" data-action="close-overlay"></div>
      <section class="sheet poster-upload-sheet" role="dialog" aria-modal="true" aria-label="上传海报">
        <div class="sheet__grabber"></div>
        <div class="sheet__bar">
          <div><h2>${editing ? "编辑海报" : "上传海报"}</h2><p>${
            isSuperadmin() ? "官方海报，统一供医院运营下载分享" : "本院自有海报，仅本院运营可见"
          }</p></div>
          <button class="sheet__close" type="button" data-action="close-overlay" aria-label="关闭">${icon(
            "close",
            15
          )}</button>
        </div>
        <div class="sheet__body">
          <div class="sheet-pad">
            <div class="poster-upload-preview ${
              preview ? "has-image" : ""
            }">
              ${
                preview
                  ? `<img src="${esc(preview)}" alt="海报预览">`
                  : `<span>${icon("send", 22)}<strong>上传海报图片</strong><small>建议竖版 1080×1920，支持 JPG / PNG</small></span>`
              }
              <label class="poster-upload-action">
                ${preview ? "更换图片" : "选择图片"}
                <input type="file" accept="image/*" data-marketing-file hidden>
              </label>
            </div>
            <div class="field"><label>海报标题 <em>*</em></label>
              <input type="text" data-marketing-field="title" value="${esc(
                draft.title || ""
              )}" placeholder="如：让权威医疗，走近企业">
            </div>
            <div class="field-row">
              <div class="field"><label>角标 / 场景</label>
                <input type="text" data-marketing-field="eyebrow" value="${esc(
                  draft.eyebrow || ""
                )}" placeholder="如：权威主视觉">
              </div>
              <div class="field"><label>标签</label>
                <input type="text" data-marketing-field="tagsText" value="${esc(
                  draft.tagsText || ""
                )}" placeholder="用顿号分隔，如：医院权威、名医资源">
              </div>
            </div>
            <div class="field"><label>海报说明</label>
              <textarea data-marketing-field="desc" placeholder="填写这张海报适合的使用场景">${esc(
                draft.desc || ""
              )}</textarea>
            </div>
            <p class="field-help">${icon(
              "shield",
              12
            )} 海报由${
              isSuperadmin() ? "超级管理员统一配置" : "医院运营上传"
            }。保存后可在列表中下载、分享给客户。</p>
          </div>
        </div>
        <div class="sheet__footer">
          <button class="btn btn--ghost" type="button" data-action="close-overlay">取消</button>
          <button class="btn btn--primary" type="button" data-action="marketing-poster-save">
            ${editing ? "保存修改" : "保存海报"} ${icon("check", 14)}
          </button>
        </div>
      </section>
    `;
  }

  function collectMarketingDraft() {
    const draft = state.marketingDraft;
    if (!draft) return null;
    document.querySelectorAll("[data-marketing-field]").forEach((input) => {
      draft[input.dataset.marketingField] = input.value.trim();
    });
    return draft;
  }

  function decodePosterFile(file) {
    return new Promise((resolve, reject) => {
      const objectUrl = URL.createObjectURL(file);
      const image = new Image();
      image.onload = () => {
        resolve({
          image,
          cleanup: () => URL.revokeObjectURL(objectUrl)
        });
      };
      image.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        reject(new Error("图片读取失败"));
      };
      image.src = objectUrl;
    });
  }

  function decodePosterBlob(blob) {
    return new Promise((resolve, reject) => {
      const objectUrl = URL.createObjectURL(blob);
      const image = new Image();
      image.onload = () => {
        resolve({
          image,
          cleanup: () => URL.revokeObjectURL(objectUrl)
        });
      };
      image.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        reject(new Error("图片读取失败"));
      };
      image.src = objectUrl;
    });
  }

  async function canvasJpegBlob(canvas, quality) {
    if (canvas.toBlob) {
      return new Promise((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error("图片压缩失败"));
          },
          "image/jpeg",
          quality
        );
      });
    }
    return pdfBlobFromDataUrl(canvas.toDataURL("image/jpeg", quality));
  }

  async function resizePosterImage(image, maxSide, quality) {
    const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
    const width = Math.max(1, Math.round(image.width * scale));
    const height = Math.max(1, Math.round(image.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(image, 0, 0, width, height);
    return {
      blob: await canvasJpegBlob(canvas, quality),
      width,
      height
    };
  }

  function blobToDataUrl(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = () => reject(reader.error || new Error("缩略图生成失败"));
      reader.readAsDataURL(blob);
    });
  }

  async function persistPosterDraftImage(draft) {
    if (draft.imageKey) return true;
    if (!draft.image) return false;
    if (!String(draft.image).startsWith("data:image")) return true;
    const blob = await pdfBlobFromDataUrl(draft.image);
    const decoded = await decodePosterBlob(blob);
    try {
      const full = await resizePosterImage(decoded.image, 1920, 0.82);
      const thumb = await resizePosterImage(decoded.image, 420, 0.72);
      const key = `poster-image-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}`;
      await savePosterImageBlob(key, full.blob, {
        name: "poster.jpg",
        type: "image/jpeg",
        width: full.width,
        height: full.height
      });
      draft.imageKey = key;
      draft.image = "";
      draft.thumb = await blobToDataUrl(thumb.blob);
      return true;
    } finally {
      decoded.cleanup();
    }
  }

  async function saveMarketingDraft() {
    const draft = collectMarketingDraft();
    if (!draft) return;
    if (!draft.title?.trim()) return showToast("请填写海报标题。");
    try {
      const hasImage = await persistPosterDraftImage(draft);
      if (!hasImage) return showToast("请先上传海报图片。");
    } catch (error) {
      console.warn("poster image persist failed", error);
      return showToast("海报图片保存失败，请换一张图片重试。");
    }
    const tags = String(draft.tagsText || "")
      .split(/[、,，/]/)
      .map((tag) => tag.trim())
      .filter(Boolean);
    const list = getMarketingPosters();
    const now = new Date().toISOString();
    const payload = {
      id: draft.id || `poster-${Date.now()}`,
      source: draft.id ? draft.source || "official" : isSuperadmin() ? "official" : "hospital",
      hospitalId: draft.id
        ? draft.hospitalId || ""
        : isSuperadmin()
        ? ""
        : operatorHospital()?.id || "",
      eyebrow: draft.eyebrow?.trim() || (isSuperadmin() ? "官方海报" : "本院海报"),
      title: draft.title.trim(),
      desc: draft.desc?.trim() || "院方统一展业海报，可直接下载分享。",
      tags,
      image: draft.imageKey ? "" : draft.image,
      imageKey: draft.imageKey || "",
      thumb: draft.thumb || draft.image || "",
      builtin: Boolean(draft.builtin),
      createdAt: draft.createdAt || now,
      updatedAt: now
    };
    const next = draft.id
      ? list.map((item) => (item.id === draft.id ? payload : item))
      : [payload, ...list];
    try {
      saveMarketingPosters(next);
    } catch (error) {
      return showToast("海报资料保存失败，请检查浏览器存储空间。");
    }
    if (
      draft.originalImageKey &&
      draft.originalImageKey !== payload.imageKey
    ) {
      deletePosterImageBlob(draft.originalImageKey);
    }
    if (draft.previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(draft.previewUrl);
    }
    state.marketingDraft = null;
    state.overlay = null;
    releaseOverlayHistory();
    renderApp({ scrollTo: currentWindowScroll() });
    showToast(draft.id ? "海报已更新。" : "海报已保存，可下载或分享。");
  }

  async function handleMarketingImageUpload(file) {
    if (!file || !state.marketingDraft) return;
    if (!/^image\//.test(file.type)) return showToast("请选择图片文件。");
    if (file.size > 25 * 1024 * 1024) {
      return showToast("海报图片请控制在 25MB 以内。");
    }
    const draft = state.marketingDraft;
    showToast("正在压缩海报图片…");
    let decoded = null;
    try {
      decoded = await decodePosterFile(file);
      const full = await resizePosterImage(decoded.image, 1920, 0.86);
      const optimized =
        full.blob.size > 900 * 1024
          ? await resizePosterImage(decoded.image, 1920, 0.68)
          : full;
      const thumb = await resizePosterImage(decoded.image, 420, 0.72);
      const key = `poster-image-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}`;
      await savePosterImageBlob(key, optimized.blob, {
        name: file.name || "poster.jpg",
        type: "image/jpeg",
        width: optimized.width,
        height: optimized.height
      });
      if (state.marketingDraft !== draft) {
        deletePosterImageBlob(key);
        return;
      }
      if (
        draft.imageKey &&
        draft.imageKey !== (draft.originalImageKey || "")
      ) {
        deletePosterImageBlob(draft.imageKey);
      }
      if (draft.previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(draft.previewUrl);
      }
      draft.imageKey = key;
      draft.image = "";
      draft.thumb = await blobToDataUrl(thumb.blob);
      draft.previewUrl = URL.createObjectURL(optimized.blob);
      renderOverlay();
      showToast("海报图片已就绪，保存后即可分享。");
    } catch (error) {
      console.warn("poster upload failed", error);
      showToast("海报图片处理失败，请换一张 JPG / PNG 图片。");
    } finally {
      decoded?.cleanup();
    }
  }

  async function deleteMarketingPoster() {
    const poster = marketingPosterById(state.posterId);
    if (!poster) return;
    if (!marketingPosterManageable(poster)) return showToast("无权删除该海报。");
    if (!window.confirm(`确定删除「${poster.title}」吗？`)) return;
    saveMarketingPosters(getMarketingPosters().filter((item) => item.id !== poster.id));
    await deletePosterImageBlob(poster.imageKey);
    releasePosterImage();
    state.posterId = "";
    state.overlay = null;
    releaseOverlayHistory();
    renderApp({ scrollTo: currentWindowScroll() });
    showToast("海报已删除。");
  }

  async function shareMarketingPoster() {
    const poster = marketingPosterById(state.posterId);
    if (!poster) return;
    const shareText = `【北京大学国际医院 · 名医入企】${poster.title} ${SERVICE_LINK}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: poster.title,
          text: `${poster.desc || poster.title}\n${SERVICE_LINK}`,
          url: SERVICE_LINK
        });
        return;
      } catch (error) {
        if (error?.name === "AbortError") return;
      }
    }
    const copied = await copyText(shareText);
    showToast(
      copied
        ? "分享文案与预约链接已复制，可粘贴发送给客户。"
        : "请手动复制链接分享给客户。"
    );
  }

  async function saveMarketingPoster() {
    const poster = marketingPosterById(state.posterId);
    if (!poster) return;
    let blob = null;
    try {
      if (state.posterViewUrl) {
        blob = await (await fetch(state.posterViewUrl)).blob();
      } else if (poster.imageKey) {
        blob = await loadPosterImageBlob(poster.imageKey);
      }
      if (!blob) {
        const source = poster.image || poster.thumb;
        if (!source) throw new Error("海报原图不存在");
        blob = source.startsWith("data:")
          ? await pdfBlobFromDataUrl(source)
          : await (await fetch(source)).blob();
      }
    } catch (error) {
      console.warn("poster download failed", error);
      return showToast("高清海报读取失败，请稍后重试或长按预览图保存。");
    }
    const ext = (blob.type || "").includes("png") ? "png" : "jpg";
    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = objectUrl;
    anchor.download = `${poster.title || "北大医疗名医入企"}.${ext}`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 4000);
    showToast("高清海报已打开。若微信未自动保存，请长按预览图保存到相册。");
  }
  /* =========================================================
     App render
     ========================================================= */
  function renderLoading() {
    return `
      <div class="loading-screen">
        <img src="assets/logo.svg" alt="北京大学国际医院">
        <span class="loading-spinner"></span>
        <p>正在加载企业健康服务…</p>
      </div>
    `;
  }

  function renderLoadError() {
    return `
      <div class="loading-screen">
        <img src="assets/logo.svg" alt="北京大学国际医院">
        <h2>数据加载失败</h2>
        <p>${esc(state.loadError || "请检查网络后刷新页面。")}</p>
        <button class="btn btn--primary" type="button" onclick="location.reload()">重新加载</button>
      </div>
    `;
  }

  function renderApp({ scrollTo = null, animate = false } = {}) {
    if (!app) return;
    const currentScroll = currentWindowScroll();
    const shouldAnimate = animate || !state.renderedOnce;
    if (!state.loaded) {
      app.innerHTML = renderLoading();
      return;
    }
    if (state.loadError) {
      app.innerHTML = renderLoadError();
      return;
    }
    if (state.screen === "auth") {
      app.innerHTML = renderAuthScreen();
    } else if (state.screen === "admin-login") {
      app.innerHTML = renderAdminLogin();
    } else if (state.screen === "admin") {
      if (!state.adminAuthed) {
        state.screen = "admin-login";
        app.innerHTML = renderAdminLogin();
      } else {
        if (state.adminTab === "hospitals" && !isSuperadmin()) state.adminTab = "appointments";
        app.innerHTML = renderAdminScreen();
        if (state.adminTab === "slots") renderSlotConfigContent();
        window.requestAnimationFrame(scrollActiveAdminTabIntoView);
      }
    } else {
      let content = "";
      if (state.tab === "experts") content = renderExpertsPage();
      else if (state.tab === "appointments") content = renderAppointmentsPage();
      else if (state.tab === "me") content = renderMePage();
      else content = renderHomePage();
      app.innerHTML = renderShell(state.tab, content);
    }
    if (!shouldAnimate) {
      app.querySelector(".app-content, .auth-screen, .admin-screen, .admin-login")?.classList.add("is-instant");
    }
    renderOverlay();
    state.renderedOnce = true;
    restoreWindowScroll(scrollTo === null ? currentScroll : scrollTo);
  }

  function refreshAdminRecordList() {
    const wrap = document.getElementById("admin-record-list");
    if (!wrap) return;
    const list = filteredAdminAppointments();
    wrap.innerHTML = list.length
      ? list.map(renderAdminAppointmentCard).join("")
      : `<div class="empty-state"><span class="empty-state__icon">${icon(
          "calendar",
          26
        )}</span><h3>暂无预约</h3><p>切换筛选或等待机构提交。</p></div>`;
  }

  function refreshAdminDoctorList() {
    const wrap = document.getElementById("doctor-admin-list");
    if (!wrap) return;
    const list = adminDoctorList();
    wrap.innerHTML = list.length
      ? list.map(renderDoctorAdminCard).join("")
      : `<div class="empty-state"><span class="empty-state__icon">${icon(
          "experts",
          26
        )}</span><h3>没有匹配专家</h3><p>请调整搜索条件或新增专家。</p></div>`;
  }

  function refreshExpertHint() {
    const hint = document.getElementById("expert-scope-hint");
    if (!hint) return;
    const hospital = libraryHospital();
    const region = currentClientRegion();
    if (state.expertMonth > 0) {
      hint.innerHTML = `${icon("leaf", 11)} 时令主题按「课题履约地」判断，区别于专家日常服务的履约城市；当前查看 ${esc(
        state.expertScope === "nearby" ? hospital?.name || "就近医院" : "全部医院"
      )} · ${esc(regionText(region.province, region.city))}`;
      return;
    }
    const serviceText =
      state.expertService === "all" ? "全部服务" : serviceLabel(state.expertService);
    hint.innerHTML =
      state.expertScope === "nearby"
        ? `${icon("mapPin", 11)} 优先展示 ${esc(hospital?.name || "就近医院")}的${esc(
            serviceText
          )}专家${
            state.expertAvailability === "all"
              ? " · 含暂无号源专家"
              : state.expertAvailability === "local"
              ? " · 仅显示本院可约专家"
              : " · 仅显示当前可约专家"
          }`
        : `${icon("mapPin", 11)} ${
            state.expertAvailability === "local" ? "当地医院" : "全部医院"
          }中，展示可服务${esc(
            regionText(region.province, region.city)
          )}的${esc(serviceText)}专家${
            state.expertAvailability === "all" ? " · 含暂无号源" : " · 当前可约"
          }`;
  }

  /* =========================================================
     Events
     ========================================================= */
  function handleInput(event) {
    const target = event.target;
    if (target.matches("[data-slot-batch]")) {
      state.slotBatch[target.dataset.slotBatch] = target.value;
      refreshSlotBatchSummary();
      return;
    }
    if (target.matches("[data-marketing-field]") && state.marketingDraft) {
      state.marketingDraft[target.dataset.marketingField] = target.value;
      return;
    }
    if (target.matches("[data-login-field]")) {
      const field = target.dataset.loginField;
      state.login[field] = target.type === "checkbox" ? target.checked : target.value;
      state.login.error = "";
      return;
    }
    if (target.matches("[data-admin-login]")) {
      const field = target.dataset.adminLogin;
      state.adminLogin = state.adminLogin || { username: "", password: "", error: "" };
      state.adminLogin[field] = target.value;
      return;
    }
    if (target.matches("[data-hospital-phone-input]") && state.hospitalPhoneDraft) {
      state.hospitalPhoneDraft.phone = target.value;
      return;
    }
    if (target.matches("[data-hospital-field]") && state.hospitalEditorDraft) {
      const field = target.dataset.hospitalField;
      state.hospitalEditorDraft[field] =
        field === "lat" || field === "lng" ? Number(target.value) : target.value;
      return;
    }
    if (target.matches("[data-expert-search]")) {
      state.expertSearch = target.value;
      debounceRefreshExperts();
      return;
    }
    if (target.matches("[data-booking-field]") && state.booking) {
      clearBookingValidation();
      state.booking[target.dataset.bookingField] = target.value;
      if (target.dataset.bookingField === "customTopic") {
        state.booking.themeMonth = 0;
        state.booking.themeTopicId = "";
        state.booking.themeCoverage = "";
        document.querySelectorAll(".topic-chip").forEach((button) => {
          button.classList.remove("is-active");
          button.querySelector(".topic-chip__select")?.classList.remove("is-active");
        });
        document.querySelector(".booking-topic-coverage")?.remove();
        debounceRefreshBookingDoctors();
      }
      return;
    }
    if (target.matches("[data-booking-agree]") && state.booking) {
      state.booking.agree = target.checked;
      if (target.checked) clearBookingValidation();
      return;
    }
    if (target.matches("[data-location-field]") && state.appointmentLocationDraft) {
      state.appointmentLocationDraft[target.dataset.locationField] = target.value;
      return;
    }
    if (target.matches("[data-demand-field]") && state.overlay?.draft) {
      state.overlay.draft[target.dataset.demandField] = target.value;
      return;
    }
    if (target.matches("[data-profile-field]") && state.profileDraft) {
      state.profileDraft[target.dataset.profileField] = target.value;
      return;
    }
    if (target.matches("[data-admin-search]")) {
      state.adminSearch = target.value;
      debounceRefreshAdminList();
      return;
    }
    if (target.matches("[data-admin-doctor-search]")) {
      state.adminDoctorSearch = target.value;
      debounceRefreshDoctorList();
      return;
    }
    if (target.matches("[data-account-field]") && state.adminAccountDraft) {
      state.adminAccountDraft[target.dataset.accountField] = target.value;
      return;
    }
    if (target.matches("[data-institution-field]") && state.institutionAccountDraft) {
      state.institutionAccountDraft[target.dataset.institutionField] = target.value;
      return;
    }
    if (target.matches("[data-institution-active]") && state.institutionAccountDraft) {
      state.institutionAccountDraft.active = target.checked;
      return;
    }
    if (target.matches("[data-account-active]") && state.adminAccountDraft) {
      state.adminAccountDraft.active = target.checked;
      return;
    }
    if (target.matches("[data-doctor-field]") && state.adminDoctorDraft) {
      state.adminDoctorDraft[target.dataset.doctorField] = target.value;
      return;
    }
    if (target.matches("[data-theme-field]") && state.adminThemeDraft) {
      state.adminThemeDraft[target.dataset.themeField] = target.value;
      return;
    }
    if (target.matches("[data-theme-topic-field]") && state.adminThemeDraft) {
      const topic = state.adminThemeDraft.topics?.[Number(target.dataset.index)];
      if (topic) topic[target.dataset.themeTopicField] = target.value;
      if (target.dataset.themeTopicField === "expertId" && target.value) {
        state.adminThemeDraft.expertIds = [
          ...new Set([...(state.adminThemeDraft.expertIds || []), target.value])
        ];
      }
      return;
    }
    if (target.matches("[data-doctor-active]") && state.adminDoctorDraft) {
      state.adminDoctorDraft.active = target.checked;
    }
  }

  function handleChange(event) {
    const target = event.target;
    if (target.matches("[data-login-field]")) {
      const field = target.dataset.loginField;
      state.login[field] =
        target.type === "checkbox" ? target.checked : target.value;
      state.login.error = "";
      return;
    }
    if (target.matches("[data-expert-month]")) {
      state.expertMonth = Math.max(0, Number(target.value) || 0);
      state.expertService = state.expertMonth > 0 ? "讲座" : "all";
      refreshExpertFilterChrome();
      refreshExpertResults();
      return;
    }
    if (target.matches("[data-expert-dept]")) {
      state.expertDept = target.value || "all";
      refreshExpertResults();
      return;
    }
    if (target.matches("[data-home-hospital-picker]")) {
      selectHomeHospital(target.value || "");
      return;
    }
    if (target.matches("[data-home-region-province]") && state.homeRegionDraft) {
      state.homeRegionDraft.province = target.value;
      state.homeRegionDraft.city =
        (state.chinaCities?.[target.value] || [target.value])[0] || target.value;
      const city = document.querySelector("[data-home-region-city]");
      if (city) {
        city.innerHTML = renderCityOptions(
          state.homeRegionDraft.province,
          state.homeRegionDraft.city
        );
      }
      return;
    }
    if (target.matches("[data-home-region-city]") && state.homeRegionDraft) {
      state.homeRegionDraft.city = target.value;
      return;
    }
    if (target.matches("[data-booking-province]") && state.booking) {
      setBookingProvince(target.value);
      return;
    }
    if (target.matches("[data-booking-city]") && state.booking) {
      state.booking.city = target.value;
      refreshBookingForLocation();
      return;
    }
    if (target.matches("[data-location-province]") && state.appointmentLocationDraft) {
      state.appointmentLocationDraft.province = target.value;
      state.appointmentLocationDraft.city =
        (state.chinaCities?.[target.value] || [target.value])[0];
      const city = document.querySelector("[data-location-city]");
      if (city) {
        city.innerHTML = renderCityOptions(
          state.appointmentLocationDraft.province,
          state.appointmentLocationDraft.city
        );
      }
      return;
    }
    if (target.matches("[data-location-city]") && state.appointmentLocationDraft) {
      state.appointmentLocationDraft.city = target.value;
      return;
    }
    if (target.matches("[data-demand-province]") && state.overlay?.draft) {
      state.overlay.draft.province = target.value;
      state.overlay.draft.city = (state.chinaCities?.[target.value] || [target.value])[0];
      const city = document.querySelector("[data-demand-city]");
      if (city) city.innerHTML = renderCityOptions(state.overlay.draft.province, state.overlay.draft.city);
      return;
    }
    if (target.matches("[data-demand-target]") && state.overlay?.draft) {
      const value = target.value;
      state.overlay.draft.targetType = value === "group" ? "group" : "hospital";
      state.overlay.draft.hospitalId =
        value === "group" ? "" : value || state.hospitals[0]?.id || "";
      return;
    }
    if (target.matches("[data-demand-city]") && state.overlay?.draft) {
      state.overlay.draft.city = target.value;
      return;
    }
    if (target.matches("[data-institution-province]") && state.institutionAccountDraft) {
      state.institutionAccountDraft.province = target.value;
      state.institutionAccountDraft.city =
        (state.chinaCities?.[target.value] || [target.value])[0] || target.value;
      const city = document.querySelector("[data-institution-city]");
      if (city) {
        city.innerHTML = renderCityOptions(
          state.institutionAccountDraft.province,
          state.institutionAccountDraft.city
        );
      }
      return;
    }
    if (target.matches("[data-institution-city]") && state.institutionAccountDraft) {
      state.institutionAccountDraft.city = target.value;
      return;
    }
    if (target.matches("[data-hospital-province]") && state.hospitalEditorDraft) {
      state.hospitalEditorDraft.province = target.value;
      state.hospitalEditorDraft.city =
        (state.chinaCities?.[target.value] || [target.value])[0] || target.value;
      const city = document.querySelector("[data-hospital-city]");
      if (city) {
        city.innerHTML = renderCityOptions(
          state.hospitalEditorDraft.province,
          state.hospitalEditorDraft.city
        );
      }
      return;
    }
    if (target.matches("[data-hospital-city]") && state.hospitalEditorDraft) {
      state.hospitalEditorDraft.city = target.value;
      return;
    }
    if (
      target.matches("[data-theme-topic-coverage-province]") &&
      state.adminThemeDraft
    ) {
      const topic =
        state.adminThemeDraft.topics?.[Number(target.dataset.index)];
      if (!topic) return;
      topic.coverageProvince = target.value;
      topic.coverageCity =
        (state.chinaCities?.[target.value] || [target.value])[0] || target.value;
      const city = document.querySelector(
        `[data-theme-topic-coverage-city][data-index="${target.dataset.index}"]`
      );
      if (city) {
        city.innerHTML = renderCoverageCitySelectOptions(
          topic.coverageProvince,
          topic.coverageCity
        );
      }
      return;
    }
    if (
      target.matches("[data-theme-topic-coverage-city]") &&
      state.adminThemeDraft
    ) {
      const topic =
        state.adminThemeDraft.topics?.[Number(target.dataset.index)];
      if (topic) topic.coverageCity = target.value;
      return;
    }
    if (target.matches("[data-doctor-coverage-province]") && state.adminDoctorDraft) {
      state.adminDoctorDraft.coverageProvince = target.value;
      state.adminDoctorDraft.coverageCity =
        (state.chinaCities?.[target.value] || [target.value])[0] || target.value;
      const city = document.querySelector("[data-doctor-coverage-city]");
      if (city) {
        city.innerHTML = renderCoverageCitySelectOptions(
          state.adminDoctorDraft.coverageProvince,
          state.adminDoctorDraft.coverageCity
        );
      }
      return;
    }
    if (target.matches("[data-doctor-coverage-city]") && state.adminDoctorDraft) {
      state.adminDoctorDraft.coverageCity = target.value;
      state.adminDoctorDraft.coverageCities = addCoverageCity(
        state.adminDoctorDraft.coverageCities,
        target.value
      );
      refreshDoctorCoverageChips();
      return;
    }
    if (target.matches("[data-theme-topic-field]") && state.adminThemeDraft) {
      const index = Number(target.dataset.index);
      const topic = state.adminThemeDraft.topics?.[index];
      if (topic) topic[target.dataset.themeTopicField] = target.value;
      if (
        target.dataset.themeTopicField === "expertId" &&
        target.value &&
        topic
      ) {
        state.adminThemeDraft.expertIds = [
          ...new Set([...(state.adminThemeDraft.expertIds || []), target.value])
        ];
        const expert = expertById(target.value);
        if (expert) {
          if (!topic.coverageCities?.length) {
            topic.coverageCities = coverageCitiesFor(expert);
            topic.coverage = coverageText(topic.coverageCities);
          }
          const province = coverageProvinceForCities(
            topic.coverageCities,
            expert.province || expert.region || ""
          );
          const selectedCity = (topic.coverageCities || []).find(
            (city) =>
              city !== "全国" &&
              (state.chinaCities?.[province] || []).includes(city)
          );
          topic.coverageProvince = province;
          topic.coverageCity =
            selectedCity ||
            state.chinaCities?.[province]?.[0] ||
            province;
          renderOverlay();
        }
      }
      return;
    }
    if (target.matches("[data-review-speaker]") && state.adminDraft) {
      const expert = expertById(target.value);
      state.adminDraft.speakerId = target.value;
      state.adminDraft.speaker = expert ? `${expert.name} · ${expert.deptTitle}` : "";
      return;
    }
    if (target.matches("[data-review-service]") && state.adminDraft) {
      state.adminDraft.serviceType = target.value;
      const speaker = expertById(state.adminDraft.speakerId);
      if (speaker && !matchesService(speaker, target.value)) {
        state.adminDraft.speakerId = "";
        state.adminDraft.speaker = "";
      }
      const appointment = appointmentById(state.adminReviewId);
      const select = document.querySelector("[data-review-speaker]");
      if (select && appointment) {
        select.innerHTML = `<option value="" disabled ${
          state.adminDraft.speakerId ? "" : "selected"
        }>请选择本院出讲专家</option>${reviewSpeakerOptions(
          state.adminDraft,
          appointment.hospitalId
        )}`;
      }
      return;
    }
    if (target.matches("[data-admin-hospital]")) {
      if (slotDraftChangeCount() > 0) {
        target.value = state.adminHospitalId || "";
        return showToast("有未保存的号源修改，请先统一保存或重置后再切换医院。");
      }
      state.adminHospitalId = target.value;
      state.slotDoctorId = "";
      state.slotDraft = {};
      renderApp({ scrollTo: storedScrollForView(currentViewScrollKey()) });
      return;
    }
    if (target.matches("[data-slot-doctor]")) {
      state.slotDoctorId = target.value;
      {
        const doctor = selectedSlotDoctor();
        const lead = Math.max(1, Number(doctor?.leadDays) || tierOf(doctor).leadDays);
        state.slotBatch.from = isoDate(addDays(startOfDay(), lead));
        state.slotBatch.to = isoDate(addDays(startOfDay(), lead + 30));
      }
      renderSlotConfigContent();
      return;
    }
    if (target.matches("[data-slot-batch='scope']")) {
      state.slotBatch.scope = target.value;
      return;
    }
    if (target.matches("[data-doctor-photo]")) {
      handleDoctorPhotoUpload(target.files?.[0]);
      return;
    }
    if (target.matches("[data-marketing-file]")) {
      handleMarketingImageUpload(target.files?.[0]);
      return;
    }
    if (target.matches("[data-review-pdf]")) {
      handleReviewPdfUpload(target.files?.[0]);
    }
  }

  const debounceRefreshExperts = debounce(refreshExpertResults, 140);
  const debounceRefreshBookingDoctors = debounce(refreshBookingDoctors, 140);
  const debounceRefreshAdminList = debounce(refreshAdminRecordList, 140);
  const debounceRefreshDoctorList = debounce(refreshAdminDoctorList, 140);

  async function handleAction(action, el) {
    switch (action) {
      case "tab": {
        const nextTab = el.dataset.tab || "home";
        const previousTab = state.tab;
        const previousScroll = currentWindowScroll();
        const shouldPushTab =
          state.screen === "main" &&
          !state.overlay &&
          nextTab !== previousTab;
        storeCurrentScroll();
        if (shouldPushTab) {
          replaceCurrentHistoryEntry({
            pkuihLayer: "tab",
            pkuihTab: previousTab,
            pkuihScroll: previousScroll
          });
          pushAppHistory("tab", 0, {
            tab: previousTab,
            scroll: previousScroll
          });
        }
        if (state.overlay) {
          releaseOverlayHistory();
          clearOverlayState();
        }
        state.screen = "main";
        state.tab = nextTab;
        if (state.tab === "experts" && !state.expertVisited) {
          resetExpertFilters();
          state.expertVisited = true;
        }
        const targetScroll = storedScrollForView(`main:${state.tab}`);
        if (shouldPushTab) {
          replaceCurrentHistoryEntry({
            pkuihLayer: "tab",
            pkuihTab: state.tab,
            pkuihScroll: targetScroll
          });
        }
        renderApp({ scrollTo: targetScroll });
        if (state.tab === "home" && state.geoStatus === "idle") requestLocationRecommendation();
        break;
      }
      case "start-login": {
        const pending = el.dataset.pending ? { type: "tab", tab: el.dataset.pending } : null;
        startLogin(pending);
        break;
      }
      case "auth-close":
        if (state.authHistory) {
          state.authHistory = false;
          popAppHistory();
        }
        state.screen = "main";
        state.pendingAuth = null;
        state.login.step = 1;
        renderApp({ scrollTo: storedScrollForView(`main:${state.tab}`) });
        break;
      case "login-next":
        loginNext();
        break;
      case "demo-login":
        loginDemoUser();
        break;
      case "login-back":
        state.login.step = 1;
        renderApp({ scrollTo: 0 });
        break;
      case "login-submit":
        submitProfileLogin();
        break;
      case "send-code":
        if (!/^1\d{10}$/.test(state.login.phone)) return showToast("请先输入正确的手机号。");
        startCodeCountdown();
        showToast("验证码已发送（演示环境固定 888888）。");
        break;
      case "open-admin":
        openAdmin();
        break;
      case "admin-close":
        if (state.adminHistory) {
          state.adminHistory = false;
          popAppHistory();
        }
        state.screen = "main";
        state.tab = "home";
        setLastPortal("client");
        renderApp({ scrollTo: storedScrollForView("main:home") });
        break;
      case "admin-logout":
        clearAdminSession();
        state.adminLogin = { username: "", password: "", error: "" };
        state.screen = "admin-login";
        renderApp({ scrollTo: 0 });
        break;
      case "admin-login":
        submitAdminLogin();
        break;
      case "admin-tab":
        storeCurrentScroll();
        state.adminTab = el.dataset.value;
        state.overlay = null;
        state.adminThemeDraft = null;
        state.adminTemplateDraft = null;
        renderApp({ scrollTo: storedScrollForView(`admin:${state.adminTab}`) });
        break;
      case "admin-filter":
        state.adminFilter = el.dataset.value;
        document.querySelectorAll('[data-action="admin-filter"]').forEach((button) => {
          button.classList.toggle("is-active", button.dataset.value === state.adminFilter);
        });
        refreshAdminRecordList();
        break;
      case "admin-demand-filter":
        state.adminDemandFilter = el.dataset.value;
        refreshAdminDemandList();
        break;
      case "open-admin-appointment":
        {
          const appointment = appointmentById(el.dataset.appointmentId);
          if (!appointment) return showToast("预约记录不存在。");
          if (!adminCanManageHospital(appointment.hospitalId)) {
            return showToast("无权查看其他医院的预约。");
          }
          state.adminReviewId = appointment.id;
          state.adminDraft = buildReviewDraft(appointment);
        }
        state.adminNoteEditing = false;
        state.adminReviewSaved = false;
        state.overlay = { type: "admin-review" };
        renderOverlay();
        break;
      case "open-admin-demand":
        {
          const demand = demandById(el.dataset.demandId);
          if (!demand) return showToast("需求记录不存在。");
          if (!adminCanManageDemand(demand)) {
            return showToast(
              demand.targetType === "group"
                ? "集团企康办需求仅超级管理员可查看。"
                : "无权查看其他医院的需求。"
            );
          }
          state.adminDemandId = demand.id;
        }
        state.overlay = { type: "admin-demand" };
        renderOverlay();
        break;
      case "review-accept": {
        acceptAppointment();
        break;
      }
      case "review-save":
        saveReview();
        break;
      case "review-edit-again":
        state.adminReviewSaved = false;
        state.adminNoteEditing = false;
        renderOverlay();
        break;
      case "review-complete":
        completeAppointment();
        break;
      case "review-note-edit":
        state.adminNoteEditing = true;
        renderOverlay();
        break;
      case "review-note-cancel":
        state.adminNoteEditing = false;
        renderOverlay();
        break;
      case "review-note-save":
        saveInternalNote();
        break;
      case "review-sms-copy":
        copySmsForAppointment(el);
        break;
      case "review-email-copy":
        copyEmailForAppointment(el);
        break;
      case "review-pdf-clear":
        if (state.adminDraft) {
          state.adminDraft.planPdf = null;
          state.adminDraft.planPdfBlob = null;
          state.adminDraft.planPdfRemoved = true;
          renderOverlay();
          showToast("已移除方案附件，保存后生效。");
        }
        break;
      case "admin-demand-contact":
        markDemandContacted("");
        break;
      case "admin-demand-followup": {
        const note = document.querySelector("[data-demand-followup]")?.value.trim() || "";
        if (!note) return showToast("请先填写沟通记录。");
        markDemandContacted(note);
        break;
      }
      case "admin-demand-match":
        adminDemandMatch();
        break;
      case "admin-demand-close":
        adminDemandClose();
        break;
      case "slot-month":
        shiftSlotMonth(Number(el.dataset.value));
        break;
      case "slot-doctor-pick":
        state.slotDoctorId = el.dataset.doctorId || "";
        {
          const doctor = selectedSlotDoctor();
          const lead = Math.max(1, Number(doctor?.leadDays) || tierOf(doctor).leadDays);
          state.slotBatch.from = isoDate(addDays(startOfDay(), lead));
          state.slotBatch.to = isoDate(addDays(startOfDay(), lead + 30));
        }
        renderSlotConfigContent();
        break;
      case "slot-day-open":
        openSlotDay(el.dataset.value);
        break;
      case "slot-day-step":
        stepSlotDay(Number(el.dataset.value));
        break;
      case "slot-day-set": {
        const doctor = expertById(state.overlay?.doctorId);
        const date = state.overlay?.date;
        if (!doctor || !date) return;
        const booked = bookedCount(doctor.id, date);
        setDraftSlot(doctor.id, date, Math.max(booked, Number(el.dataset.value)));
        renderOverlay();
        break;
      }
      case "slot-day-save": {
        const doctor = expertById(state.overlay?.doctorId);
        const date = state.overlay?.date;
        if (!doctor || !date) return;
        if (draftSlot(doctor.id, date) < bookedCount(doctor.id, date)) {
          return showToast("号源数不能低于已预约数量。");
        }
        state.overlay = null;
        releaseOverlayHistory();
        renderOverlay();
        renderSlotConfigContent();
        showToast("已加入号源草稿。");
        break;
      }
      case "slot-batch-apply":
        applySlotBatch();
        break;
      case "slot-weekday": {
        const day = Number(el.dataset.value);
        const list = state.slotBatch.weekdays;
        state.slotBatch.weekdays = list.includes(day)
          ? list.filter((item) => item !== day)
          : list.concat(day).sort();
        el.classList.toggle("is-active");
        break;
      }
      case "slot-preset": {
        const days = Number(el.dataset.value);
        const doctor = selectedSlotDoctor();
        const lead = Math.max(1, Number(doctor?.leadDays) || tierOf(doctor).leadDays);
        state.slotBatch.from = isoDate(addDays(startOfDay(), lead));
        state.slotBatch.to = isoDate(addDays(startOfDay(), lead + days - 1));
        refreshSlotBatchSummary();
        break;
      }
      case "slot-save":
        saveSlotDraft();
        break;
      case "slot-reset":
        resetSlotDraft();
        break;
      case "admin-doctor-add":
        openAdminDoctorEditor();
        break;
      case "open-admin-doctor":
        openAdminDoctorEditor(el.dataset.doctorId);
        break;
      case "doctor-service": {
        if (!state.adminDoctorDraft) return;
        const value = el.dataset.value;
        const list = state.adminDoctorDraft.services || [];
        state.adminDoctorDraft.services = list.includes(value)
          ? list.filter((item) => item !== value)
          : list.concat(value);
        el.classList.toggle("is-active");
        break;
      }
      case "doctor-avatar": {
        if (!state.adminDoctorDraft) return;
        state.adminDoctorDraft.gender = el.dataset.gender;
        state.adminDoctorDraft.senior = el.dataset.senior === "1";
        state.adminDoctorDraft.photo = "";
        state.adminDoctorDraft.photoCard = "";
        state.adminDoctorDraft.photoDetail = "";
        renderOverlay();
        break;
      }
      case "doctor-photo-clear":
        if (!state.adminDoctorDraft) return;
        state.adminDoctorDraft.photo = "";
        state.adminDoctorDraft.photoCard = "";
        state.adminDoctorDraft.photoDetail = "";
        renderOverlay();
        break;
      case "doctor-city-remove":
        if (!state.adminDoctorDraft) return;
        state.adminDoctorDraft.coverageCities = (
          state.adminDoctorDraft.coverageCities || []
        ).filter((city) => city !== el.dataset.city);
        refreshDoctorCoverageChips();
        break;
      case "doctor-coverage-national":
        if (!state.adminDoctorDraft) return;
        state.adminDoctorDraft.coverageCities = state.adminDoctorDraft.coverageCities?.includes(
          "全国"
        )
          ? [state.adminDoctorDraft.coverageCity || "北京市"]
          : ["全国"];
        refreshDoctorCoverageChips();
        break;
      case "admin-doctor-save":
        saveAdminDoctor();
        break;
      case "admin-template-add":
        openAdminTemplateEditor();
        break;
      case "admin-template-edit":
        openAdminTemplateEditor(el.dataset.templateId || "");
        break;
      case "admin-template-delete":
        deleteAdminTemplate(el.dataset.templateId || "");
        break;
      case "admin-template-save":
        saveAdminTemplate();
        break;
      case "review-import-template": {
        const select = document.querySelector("[data-review-template]");
        importReviewTemplate(select?.value || "");
        break;
      }
      case "open-admin-theme":
        openAdminThemeEditor(el.dataset.month);
        break;
      case "theme-topic-coverage-remove": {
        if (!state.adminThemeDraft) return;
        const index = Number(
          el.closest("[data-topic-coverage-index]")?.dataset.topicCoverageIndex
        );
        const topic = state.adminThemeDraft.topics?.[index];
        if (!topic) return;
        topic.coverageCities = (topic.coverageCities || []).filter(
          (city) => city !== el.dataset.city
        );
        topic.coverage = coverageText(topic.coverageCities);
        refreshThemeTopicCoverageChips(index);
        break;
      }
      case "theme-topic-coverage-national": {
        if (!state.adminThemeDraft) return;
        const index = Number(el.dataset.index);
        const topic = state.adminThemeDraft.topics?.[index];
        if (!topic) return;
        topic.coverageCities = topic.coverageCities?.includes("全国")
          ? []
          : ["全国"];
        topic.coverage = coverageText(topic.coverageCities);
        refreshThemeTopicCoverageChips(index);
        break;
      }
      case "theme-topic-coverage-add": {
        if (!state.adminThemeDraft) return;
        const index = Number(el.dataset.index);
        const topic = state.adminThemeDraft.topics?.[index];
        if (!topic?.coverageCity) {
          return showToast("请先选择要添加的城市。");
        }
        if (topic.coverageCities?.includes(topic.coverageCity)) {
          return showToast(`「${topic.coverageCity}」已在本课题履约地中。`);
        }
        topic.coverageCities = addCoverageCity(
          topic.coverageCities,
          topic.coverageCity
        );
        topic.coverage = coverageText(topic.coverageCities);
        refreshThemeTopicCoverageChips(index);
        showToast(`已添加课题履约地：${topic.coverageCity}。`);
        break;
      }
      case "theme-topic-coverage-from-expert": {
        if (!state.adminThemeDraft) return;
        const index = Number(el.dataset.index);
        const topic = state.adminThemeDraft.topics?.[index];
        const expert = topic?.expertId ? expertById(topic.expertId) : null;
        if (!topic || !expert) {
          return showToast("请先为本课题选择主讲专家。");
        }
        topic.coverageCities = coverageCitiesFor(expert);
        topic.coverage = coverageText(topic.coverageCities);
        const province = coverageProvinceForCities(
          topic.coverageCities,
          expert.province || expert.region || ""
        );
        const selectedCity = topic.coverageCities.find(
          (city) =>
            city !== "全国" &&
            (state.chinaCities?.[province] || []).includes(city)
        );
        topic.coverageProvince = province;
        topic.coverageCity =
          selectedCity || state.chinaCities?.[province]?.[0] || province;
        renderOverlay();
        showToast(`已套用 ${expert.name} 的履约范围。`);
        break;
      }
      case "theme-topic-add":
        if (!state.adminThemeDraft) return;
        {
          const hospital = adminThemeHospital();
          const province = coverageProvinceForCities([], hospital?.province);
          const city =
            state.chinaCities?.[province]?.[0] || hospital?.city || province;
          state.adminThemeDraft.topics = (state.adminThemeDraft.topics || []).concat({
            id: `${state.adminThemeDraft.month}-custom-${Date.now()}`,
            dept: "内科",
            title: "",
            expertId: "",
            coverage: "",
            coverageCities: [],
            coverageProvince: province,
            coverageCity: city
          });
        }
        renderOverlay();
        break;
      case "theme-topic-remove":
        if (!state.adminThemeDraft) return;
        state.adminThemeDraft.topics = (state.adminThemeDraft.topics || []).filter(
          (_, index) => index !== Number(el.dataset.index)
        );
        renderOverlay();
        break;
      case "admin-theme-save":
        saveAdminTheme();
        break;
      case "admin-theme-default": {
        const hospital = adminThemeHospital();
        const month = state.adminThemeDraft?.month;
        if (hospital && month) {
          state.adminThemeDraft = clone(defaultThemeConfig(hospital.id, month));
          renderOverlay();
          showToast("已恢复系统默认主题，保存后生效。");
        }
        break;
      }
      case "admin-account-add":
        openAdminAccountEditor();
        break;
      case "institution-account-add":
        openInstitutionAccountEditor();
        break;
      case "open-institution-account":
        openInstitutionAccountEditor(el.dataset.phone || "");
        break;
      case "institution-account-save":
        saveInstitutionAccount();
        break;
      case "open-admin-account":
        openAdminAccountEditor(el.dataset.username);
        break;
      case "admin-hospital-operator":
        openAdminAccountEditor("", el.dataset.hospitalId, "operator");
        break;
      case "hospital-phone-edit":
        openHospitalPhoneEditor(el.dataset.hospitalId || "");
        break;
      case "hospital-editor-add":
        openHospitalEditor("");
        break;
      case "hospital-editor-edit":
        openHospitalEditor(el.dataset.hospitalId || "");
        break;
      case "hospital-editor-save":
        saveHospitalEditor();
        break;
      case "hospital-phone-save":
        saveHospitalPhoneDraft();
        break;
      case "account-role":
        if (!state.adminAccountDraft) return;
        state.adminAccountDraft.role = el.dataset.value;
        if (el.dataset.value === "operator" && !state.adminAccountDraft.hospitalId) {
          state.adminAccountDraft.hospitalId = state.hospitals[0]?.id || "";
        }
        renderOverlay();
        break;
      case "admin-account-save":
        saveAdminAccount();
        break;
      case "open-poster":
        openPosterSheet(el.dataset.posterId);
        break;
      case "save-poster":
        saveMarketingPoster();
        break;
      case "copy-poster-link": {
        const copied = await copyText(SERVICE_LINK);
        showToast(copied ? "活动链接已复制。" : "复制失败，请手动复制。");
        break;
      }
      case "marketing-filter":
        state.marketingFilter = el.dataset.value || "all";
        renderApp({ scrollTo: currentWindowScroll() });
        break;
      case "marketing-poster-add":
        openPosterUpload();
        break;
      case "marketing-poster-edit":
        openPosterUpload(state.posterId);
        break;
      case "marketing-poster-delete":
        deleteMarketingPoster();
        break;
      case "marketing-poster-share":
        shareMarketingPoster();
        break;
      case "marketing-poster-save":
        saveMarketingDraft();
        break;
      case "marketing-poster-reset":
        if (!isSuperadmin()) return;
        getMarketingPosters().forEach((poster) => {
          if (poster.imageKey) deletePosterImageBlob(poster.imageKey);
        });
        releasePosterImage();
        saveMarketingPosters(defaultMarketingPosters());
        state.marketingFilter = "all";
        renderApp({ scrollTo: currentWindowScroll() });
        showToast("已恢复 4 套官方海报。");
        break;
      case "close-overlay":
        dismissOverlay();
        break;
      case "open-booking":
        openBooking();
        break;
      case "service-book":
        openBooking("", "", el.dataset.value || "");
        break;
      case "home-hospital":
        selectHomeHospital(el.dataset.value || "");
        break;
      case "home-city-open":
        openHomeCityPicker();
        break;
      case "home-city-save":
        saveHomeCity();
        break;
      case "home-use-location":
        clearHomeRegion();
        state.homeHospitalId = "";
        state.expertHospitalId = "";
        requestLocationRecommendation({ manual: true });
        refreshHomeLocationViews();
        break;
      case "home-hospital-experts":
        resetExpertFilters();
        state.expertVisited = true;
        state.tab = "experts";
        renderApp({ scrollTo: 0 });
        break;
      case "theme-open":
        openTheme(
          Number(el.dataset.month) || currentMonth(),
          -1,
          el.dataset.hospitalId || ""
        );
        break;
      case "theme-topic":
        openTheme(
          Number(el.dataset.month) || currentMonth(),
          Number(el.dataset.topicIndex) >= 0 ? Number(el.dataset.topicIndex) : -1,
          el.dataset.hospitalId || ""
        );
        break;
      case "theme-book":
        openThemeBooking(
          Number(el.dataset.month) || currentMonth(),
          Number(el.dataset.topicIndex) >= 0 ? Number(el.dataset.topicIndex) : -1
        );
        break;
      case "theme-topic-focus":
        if (!state.overlay) return;
        state.overlay.topicIndex = Number(el.dataset.topicIndex);
        renderOverlay();
        break;
      case "theme-topic-confirm":
        chooseBookingTopic(
          Number(el.dataset.month) || currentMonth(),
          Number(el.dataset.topicIndex)
        );
        break;
      case "theme-experts":
        resetExpertFilters({
          month: Number(el.dataset.month) || currentMonth(),
          service: "讲座",
          availability: "bookable",
          hospitalId: el.dataset.hospitalId || ""
        });
        state.expertVisited = true;
        releaseOverlayHistory();
        clearOverlayState();
        state.screen = "main";
        state.tab = "experts";
        renderApp({ scrollTo: 0 });
        break;
      case "book-doctor":
        {
          const expert = expertById(el.dataset.doctorId || "");
          const month = Number(el.dataset.month) || 0;
          openBooking(
            el.dataset.doctorId || "",
            "",
            el.dataset.service || "",
            "",
            month && month === currentMonth() && expert
              ? { month, hospitalId: expert.hospitalId }
              : null
          );
        }
        break;
      case "open-doctor":
        openDoctorSheet(
          el.dataset.doctorId,
          Number(el.dataset.month) || 0,
          Number(el.dataset.themeMonth) || 0
        );
        break;
      case "doctor-month":
        if (state.overlay) {
          state.overlay.month = Number(el.dataset.value);
          renderOverlay();
        }
        break;
      case "tier-open":
        resetExpertFilters({ tier: el.dataset.value });
        state.expertVisited = true;
        state.tab = "experts";
        renderApp({ scrollTo: 0 });
        break;
      case "service-open":
        resetExpertFilters({ service: el.dataset.value, availability: "bookable" });
        state.expertVisited = true;
        state.tab = "experts";
        renderApp({ scrollTo: 0 });
        break;
      case "search-topic":
        resetExpertFilters({
          search: el.dataset.value,
          searchOpen: true
        });
        state.expertVisited = true;
        state.tab = "experts";
        renderApp({ scrollTo: 0 });
        break;
      case "expert-scope":
        state.expertScope = el.dataset.value;
        refreshExpertFilterChrome();
        refreshExpertResults();
        break;
      case "expert-tier":
        state.expertTier = el.dataset.value;
        refreshExpertResults();
        break;
      case "expert-service":
        state.expertService = el.dataset.value;
        if (state.expertMonth > 0 && state.expertService !== "讲座") {
          state.expertMonth = 0;
          showToast("月令主题仅对应讲座，已清除月令筛选。");
        }
        refreshExpertFilterChrome();
        refreshExpertResults();
        break;
      case "expert-month-clear":
        state.expertMonth = 0;
        state.expertService = "all";
        {
          const select = document.querySelector("[data-expert-month]");
          if (select) select.value = "0";
        }
        refreshExpertFilterChrome();
        refreshExpertResults();
        showToast("已清除月令筛选。");
        break;
      case "expert-availability":
        state.expertAvailability = el.dataset.value;
        refreshExpertFilterChrome();
        refreshExpertResults();
        break;
      case "expert-search-toggle":
        state.expertSearchOpen = !state.expertSearchOpen;
        syncExpertSearchBox();
        if (state.expertSearchOpen) {
          window.requestAnimationFrame(() => document.getElementById("expert-search")?.focus());
        }
        break;
      case "expert-search-clear":
        state.expertSearch = "";
        {
          const input = document.getElementById("expert-search");
          if (input) {
            input.value = "";
            input.focus();
          }
          refreshExpertResults();
        }
        break;
      case "open-demand":
        openDemandCreate();
        break;
      case "demand-service":
        if (!state.overlay?.draft) return;
        state.overlay.draft.serviceType = el.dataset.value;
        document.querySelectorAll('[data-action="demand-service"]').forEach((button) => {
          button.classList.toggle("is-active", button.dataset.value === el.dataset.value);
        });
        break;
      case "demand-submit":
        submitDemand();
        break;
      case "open-demand-detail": {
        const demand = demandById(el.dataset.demandId || "");
        if (!clientOwnsDemand(demand)) {
          return showToast(state.session ? "无权查看该提需。" : "请先登录。");
        }
        state.overlay = { type: "demand", demandId: demand.id };
        renderOverlay();
        break;
      }
      case "demand-convert":
        openBookingFromDemand(el.dataset.demandId || state.overlay?.demandId || "");
        break;
      case "demand-open-appointment": {
        const appointment = appointmentById(el.dataset.appointmentId || "");
        if (appointment && clientOwnsAppointment(appointment)) {
          state.overlay = { type: "appointment", appointmentId: appointment.id };
          renderOverlay();
        }
        break;
      }
      case "demand-cancel": {
        const demand = demandById(state.overlay?.demandId || "");
        if (!clientOwnsDemand(demand)) {
          return showToast(state.session ? "无权操作该提需。" : "请先登录。");
        }
        if (demand.status !== "pending") {
          return showToast("院方已开始跟进，请联系项目对接人处理。");
        }
        updateDemand(demand.id, {
          status: "cancelled",
          cancelledAt: new Date().toISOString()
        });
        state.overlay = null;
        releaseOverlayHistory();
        renderApp({ scrollTo: currentWindowScroll() });
        showToast("提需已取消。");
        break;
      }
      case "record-tab":
        state.clientRecordTab = el.dataset.value;
        refreshRecordPanel();
        break;
      case "appointment-filter":
        state.appointmentFilter = el.dataset.value;
        refreshAppointmentList();
        break;
      case "open-appointment": {
        const appointment = appointmentById(el.dataset.appointmentId || "");
        if (!clientOwnsAppointment(appointment)) {
          return showToast(state.session ? "无权查看该预约。" : "请先登录。");
        }
        state.overlay = {
          type: "appointment",
          appointmentId: appointment.id,
          action: ""
        };
        renderOverlay();
        break;
      }
      case "open-plan-pdf":
        openPlanPdf(el.dataset.appointmentId || "");
        break;
      case "plan-attachment-open":
        openPlanAttachmentInBrowser();
        break;
      case "appointment-location-edit":
        openAppointmentLocationEdit(el.dataset.appointmentId || "");
        break;
      case "appointment-location-save":
        saveAppointmentLocation();
        break;
      case "appointment-profile-sync":
        syncAppointmentProfile(el.dataset.appointmentId || "");
        break;
      case "appointment-action":
        if (!state.overlay || state.overlay.type !== "appointment") return;
        {
          const appointment = appointmentById(state.overlay.appointmentId);
          if (!appointment) return;
          const mode = el.dataset.value || "";
          if (!mode) return;
          const policy = appointmentChangePolicy(appointment);
          if (
            (["change", "revise"].includes(mode) &&
              !policy.canModify) ||
            (mode === "cancel" && !policy.canCancel) ||
            (mode === "confirm" && !policy.canModify)
          ) {
            return showToast(
              mode === "cancel"
                ? policy.cancelReason || "当前阶段不可取消。"
                : policy.modifyReason || "当前阶段不可修改。"
            );
          }
          openOverlayLayer({
            type: "appointment-action",
            appointmentId: appointment.id,
            mode
          });
        }
        break;
      case "appointment-confirm": {
        const id = state.overlay?.appointmentId;
        if (!id) return;
        const appointment = appointmentById(id);
        if (!clientOwnsAppointment(appointment)) {
          return showToast(state.session ? "无权操作该预约。" : "请先登录。");
        }
        const planError = finalPlanError(appointment);
        if (planError) return showToast(planError);
        updateAppointment(id, {
          status: "confirmed",
          confirmedAt: new Date().toISOString(),
          feedback: ""
        });
        returnFromAppointmentAction("success");
        showToast("预约已确认，院方将按方案执行。");
        break;
      }
      case "appointment-revise-submit": {
        const id = state.overlay?.appointmentId;
        const appointment = appointmentById(id);
        if (!clientOwnsAppointment(appointment)) {
          return showToast(state.session ? "无权操作该预约。" : "请先登录。");
        }
        const note = document.querySelector("[data-revise-note]")?.value.trim() || "";
        if (!note) return showToast("请填写修改意见。");
        const policy = appointmentChangePolicy(appointment);
        if (!policy.canModify) {
          return showToast(policy.modifyReason || "当前阶段不可提出修改。");
        }
        updateAppointment(appointment.id, {
          status: "revision",
          feedback: note,
          feedbackAt: new Date().toISOString(),
          changeRequest: {
            type: "revise",
            note,
            at: new Date().toISOString()
          },
          clientChangeCount: (Number(appointment.clientChangeCount) || 0) + 1
        });
        returnFromAppointmentAction();
        showToast("修改意见已提交，院方会更新方案。");
        break;
      }
      case "appointment-change-submit": {
        const id = state.overlay?.appointmentId;
        const appointment = appointmentById(id);
        if (!clientOwnsAppointment(appointment)) {
          return showToast(state.session ? "无权操作该预约。" : "请先登录。");
        }
        const policy = appointmentChangePolicy(appointment);
        if (!policy.canModify) {
          return showToast(policy.modifyReason || "当前阶段不可申请修改。");
        }
        const note = document.querySelector("[data-change-note]")?.value.trim() || "";
        if (!note) return showToast("请填写需要修改的内容。");
        updateAppointment(appointment.id, {
          status: "revision",
          feedback: note,
          feedbackAt: new Date().toISOString(),
          changeRequest: {
            type: "confirmed-change",
            note,
            at: new Date().toISOString()
          },
          clientChangeCount: (Number(appointment.clientChangeCount) || 0) + 1,
          previousStatus: appointment.status
        });
        returnFromAppointmentAction();
        showToast("修改申请已提交，院方更新方案后会再次发送确认。");
        break;
      }
      case "appointment-cancel-submit": {
        const id = state.overlay?.appointmentId;
        const appointment = appointmentById(id);
        if (!clientOwnsAppointment(appointment)) {
          return showToast(state.session ? "无权操作该预约。" : "请先登录。");
        }
        const policy = appointmentChangePolicy(appointment);
        if (!policy.canCancel) {
          return showToast(policy.cancelReason || "当前阶段不可取消预约。");
        }
        updateAppointment(appointment.id, {
          status: "cancelled",
          cancelledAt: new Date().toISOString(),
          cancelledBy: "client",
          cancelReason: "机构侧主动取消"
        });
        state.overlay = null;
        state.overlayStack = [];
        releaseOverlayHistory();
        renderApp({ scrollTo: currentWindowScroll() });
        showToast("预约已取消，号源已释放。");
        break;
      }
      case "open-profile":
        openProfileSheet();
        break;
      case "profile-save":
        saveProfile();
        break;
      case "me-demands":
        state.tab = "appointments";
        state.clientRecordTab = "demands";
        renderApp({ scrollTo: 0 });
        break;
      case "me-confirmed":
        state.tab = "appointments";
        state.clientRecordTab = "bookings";
        state.appointmentFilter = "confirmed";
        renderApp({ scrollTo: 0 });
        break;
      case "logout":
        clearSession();
        state.expertVisited = false;
        state.expertHospitalId = "";
        state.tab = "home";
        state.screen = "main";
        renderApp({ scrollTo: 0 });
        showToast("已退出登录。");
        break;
      case "booking-service":
        setBookingService(el.dataset.value);
        break;
      case "booking-doctor":
        setBookingDoctor(el.dataset.value);
        break;
      case "booking-doctor-change":
        if (!state.booking) return;
        state.booking.doctorPickerOpen = true;
        refreshBookingDoctors();
        break;
      case "booking-doctor-preview": {
        const expert = expertById(el.dataset.value || "");
        if (!expert) return;
        openOverlayLayer({
          type: "doctor",
          doctorId: expert.id,
          month: currentMonth()
        });
        break;
      }
      case "booking-use-doctor":
        chooseBookingDoctor(el.dataset.doctorId || "");
        break;
      case "booking-topic-preview":
        previewBookingTopic(el.dataset.value || "");
        break;
      case "booking-date":
        setBookingDate(el.dataset.value);
        break;
      case "booking-topic": {
        selectBookingTopicByTitle(el.dataset.value || "");
        break;
      }
      case "booking-open-demand":
        openBookingDemand();
        break;
      case "booking-error-focus":
        scrollToBookingIssue(el.dataset.target || "service", { focusField: true });
        break;
      case "booking-next":
        bookingNext();
        break;
      case "booking-back":
        if (state.booking) {
          state.booking.step = 1;
          renderOverlay();
        }
        break;
      case "booking-submit":
        submitBooking();
        break;
      default:
        break;
    }
  }

  function bindEvents() {
    document.addEventListener("click", (event) => {
      const nativeLink = event.target.closest("a[href]");
      if (nativeLink && !nativeLink.dataset.action) return;
      const target = event.target.closest("[data-action]");
      if (!target) return;
      event.preventDefault();
      handleAction(target.dataset.action, target);
    });
    document.addEventListener("input", handleInput);
    document.addEventListener("change", handleChange);
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && state.overlay) {
        dismissOverlay();
        return;
      }
      if (event.key === "Enter" || event.key === " ") {
        const roleButton = event.target.closest('[role="button"][data-action]');
        if (roleButton && !event.target.closest("a,button,input,textarea,select")) {
          event.preventDefault();
          handleAction(roleButton.dataset.action, roleButton);
        }
      }
    });

    let sheetDrag = null;
    document.addEventListener(
      "touchstart",
      (event) => {
        const touch = event.touches[0];
        if (!touch) return;
        const sheet = event.target.closest(".sheet");
        if (!sheet) return;
        if (event.target.closest("button, a, input, textarea, select, label")) return;
        const fromHandle = Boolean(
          event.target.closest(".sheet__grabber, .sheet__bar, .doctor-hero__grabber")
        );
        const body = sheet.querySelector(".sheet__body");
        if (!fromHandle && (!body || body.scrollTop > 0)) return;
        sheetDrag = {
          sheet,
          body,
          fromHandle,
          startY: touch.clientY,
          startX: touch.clientX,
          startedAt: performance.now(),
          dy: 0,
          dx: 0,
          dragging: false
        };
      },
      { passive: true }
    );
    document.addEventListener(
      "touchmove",
      (event) => {
        if (!sheetDrag) return;
        const touch = event.touches[0];
        if (!touch) return;
        sheetDrag.dy = Math.max(0, touch.clientY - sheetDrag.startY);
        sheetDrag.dx = touch.clientX - sheetDrag.startX;
        if (!sheetDrag.dragging) {
          if (!sheetDrag.fromHandle && sheetDrag.dy <= 0) {
            sheetDrag = null;
            return;
          }
          if (Math.abs(sheetDrag.dy) < 6 && Math.abs(sheetDrag.dx) < 6) return;
          if (Math.abs(sheetDrag.dx) > Math.abs(sheetDrag.dy)) {
            sheetDrag = null;
            return;
          }
          sheetDrag.dragging = true;
          sheetDrag.sheet.style.transition = "none";
        }
        event.preventDefault();
        const dy = sheetDrag.dy;
        const backdrop = overlayRoot.querySelector(".sheet-backdrop");
        sheetDrag.sheet.style.transform = `translate(-50%, ${dy}px)`;
        if (backdrop) backdrop.style.opacity = String(Math.max(0, 1 - dy / 420));
      },
      { passive: false }
    );
    const finishSheetDrag = () => {
      if (!sheetDrag) return;
      const drag = sheetDrag;
      sheetDrag = null;
      if (!drag.dragging) return;
      const elapsed = Math.max(1, performance.now() - drag.startedAt);
      const velocity = drag.dy / elapsed;
      const backdrop = overlayRoot.querySelector(".sheet-backdrop");
      if (drag.dy >= 90 || (drag.dy >= 32 && velocity >= 0.35)) {
        drag.sheet.style.transition = "transform 0.22s cubic-bezier(0.4, 0, 0.6, 1)";
        drag.sheet.style.transform = "translate(-50%, 105%)";
        if (backdrop) {
          backdrop.style.transition = "opacity 0.18s";
          backdrop.style.opacity = "0";
        }
        window.setTimeout(() => dismissOverlay(), 190);
      } else {
        drag.sheet.style.transition = "transform 0.28s cubic-bezier(0.22, 0.8, 0.24, 1)";
        drag.sheet.style.transform = "translate(-50%, 0)";
        if (backdrop) backdrop.style.opacity = "";
      }
    };
    document.addEventListener("touchend", finishSheetDrag);
    document.addEventListener("touchcancel", finishSheetDrag);

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState !== "visible" || !state.session) return;
      if (Date.now() - state.sessionCheckAt < 20000) return;
      validateInstitutionSession({ resume: true });
    });

    window.addEventListener("pageshow", () => {
      if (!state.session) return;
      if (Date.now() - state.sessionCheckAt < 20000) return;
      validateInstitutionSession({ resume: true });
    });

    window.addEventListener("storage", (event) => {
      if (event.key !== STORAGE.session || !state.session) return;
      if (!event.newValue) {
        state.session = null;
        state.sessionRevoked = "账号已在其他页面退出，请重新登录。";
        clearOverlayState();
        renderApp({ scrollTo: 0 });
      }
    });

    window.addEventListener("popstate", (event) => {
      if (state.suppressPopCount > 0) {
        state.suppressPopCount -= 1;
        return;
      }
      const targetDepth = Math.max(
        0,
        Number(event.state?.pkuihOverlayDepth) || 0
      );
      if (
        state.historyNavTarget &&
        state.historyNavTarget.depth === targetDepth
      ) {
        state.historyNavTarget = null;
        return;
      }
      state.historyNavTarget = null;
      if (state.overlay) {
        const currentDepth = state.overlayStack.length + 1;
        state.historyDepth = Math.max(
          0,
          state.historyDepth - Math.max(0, currentDepth - targetDepth)
        );
        syncOverlayToHistoryDepth(targetDepth);
        return;
      }
      if (state.screen === "auth") {
        state.historyDepth = Math.max(0, state.historyDepth - 1);
        state.authHistory = false;
        state.screen = "main";
        state.pendingAuth = null;
        state.login.step = 1;
        renderApp({ scrollTo: storedScrollForView(`main:${state.tab}`) });
        return;
      }
      if (state.screen === "admin-login" || state.screen === "admin") {
        state.historyDepth = 0;
        state.adminHistory = false;
        setLastPortal("client");
        state.screen = "main";
        state.tab = "home";
        renderApp({ scrollTo: storedScrollForView("main:home") });
        return;
      }
      if (state.screen === "main") {
        if (state.historyDepth > 0) {
          state.historyDepth = Math.max(0, state.historyDepth - 1);
        }
        const targetTab = ["home", "experts", "appointments", "me"].includes(
          event.state?.pkuihTab
        )
          ? event.state.pkuihTab
          : state.tab;
        const targetScroll = Number.isFinite(Number(event.state?.pkuihScroll))
          ? Math.max(0, Number(event.state.pkuihScroll))
          : storedScrollForView(`main:${targetTab}`);
        state.tab = targetTab;
        renderApp({ scrollTo: targetScroll });
        return;
      }
      if (state.historyDepth > 0) state.historyDepth = Math.max(0, state.historyDepth - 1);
    });
  }

  /* =========================================================
     Boot
     ========================================================= */
  async function boot() {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    bindEvents();
    renderApp();
    try {
      const [expertsRes, hospitalsRes, seasonalRes, matchesRes, citiesRes] = await Promise.all([
        fetch(`assets/data/experts.json?v=${DATA_VERSION}`),
        fetch(`assets/data/hospitals.json?v=${DATA_VERSION}`),
        fetch(`assets/data/seasonal.json?v=${DATA_VERSION}`),
        fetch(`assets/data/theme-matches.json?v=${DATA_VERSION}`),
        fetch(`assets/china-cities.json?v=${DATA_VERSION}`).catch(() => null)
      ]);
      if (!expertsRes.ok) throw new Error(`专家数据加载失败 HTTP ${expertsRes.status}`);
      if (!hospitalsRes.ok) throw new Error(`医院数据加载失败 HTTP ${hospitalsRes.status}`);
      const [experts, hospitals, seasonal, matches] = await Promise.all([
        expertsRes.json(),
        hospitalsRes.json(),
        seasonalRes.json(),
        matchesRes.json()
      ]);
      const cities = citiesRes?.ok ? await citiesRes.json().catch(() => null) : null;
      if (!Array.isArray(experts) || !experts.length) throw new Error("专家数据为空");
      state.baseExperts = experts;
      state.hospitals = applyHospitalConfig(hospitals);
      state.seasonal = seasonal;
      state.themeMatches = matches;
      if (cities && typeof cities === "object" && !Array.isArray(cities)) state.chinaCities = cities;
      mergeExperts();
      seedSlots();
      seedDemoRecords();

      const storedSession = readJSON(STORAGE.session, null);
      let user = storedSession?.phone ? getUser(storedSession.phone) || storedSession : null;
      if (user) {
        const region = normalizeRegion(user.province, user.city);
        if (region.province !== user.province || region.city !== user.city) {
          user = { ...user, ...region };
          upsertUser(user);
        }
      }
      state.session = user;
      if (user) {
        const sessionValid = validateInstitutionSession({ silent: true });
        if (sessionValid) {
          writeJSON(STORAGE.session, user);
        } else {
          user = null;
        }
      }

      const storedHomeRegion = readJSON(STORAGE.homeRegion, null);
      if (storedHomeRegion?.province) {
        const region = normalizeRegion(storedHomeRegion.province, storedHomeRegion.city);
        state.homeRegion = region;
        state.homeHospitalId = hospitalForRegion(region)?.id || "";
      }
      const storedHomeHospital = readJSON(STORAGE.homeHospital, "");
      if (storedHomeHospital && hospitalById(storedHomeHospital)) {
        state.homeHospitalId = storedHomeHospital;
      }

      const adminSession = readJSON(STORAGE.adminSession, null);
      const account = adminSession?.username
        ? getAdminAccounts().find((item) => item.username === adminSession.username && item.active)
        : null;
      if (
        account &&
        (account.role === "superadmin" ||
          state.hospitals.some((hospital) => hospital.id === account.hospitalId))
      ) {
        setAdminSession(account);
        state.adminHospitalId = account.role === "operator" ? account.hospitalId : "";
      } else {
        clearAdminSession();
      }
      state.adminLogin = { username: "", password: "", error: "" };
      const lastPortal = readJSON(STORAGE.lastPortal, "client");
      state.loaded = true;
      if (location.hash === "#/admin" || (state.adminAuthed && lastPortal === "admin")) {
        state.screen = state.adminAuthed ? "admin" : "admin-login";
        state.adminHistory = true;
        pushAppHistory("admin");
      } else {
        state.screen = "main";
        replaceCurrentHistoryEntry({
          pkuihLayer: "main",
          pkuihTab: state.tab,
          pkuihScroll: 0,
          pkuihOverlayDepth: 0
        });
      }
      renderApp({ scrollTo: 0 });
      if (state.screen === "main" && state.tab === "home") {
        requestLocationRecommendation();
      }
    } catch (error) {
      console.error("Failed to load application data:", error);
      state.loaded = true;
      state.loadError = error.message || "数据加载失败";
      renderApp();
    }
  }

  boot();
})();
