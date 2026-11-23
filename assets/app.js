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
    adminAccounts: "pkuih_h6_admin_accounts",
    adminSession: "pkuih_h6_admin_session",
    doctorConfig: "pkuih_h6_doctor_config",
    slots: "pkuih_h6_slots",
    smsLogs: "pkuih_h6_sms_logs",
    lastPortal: "pkuih_h6_portal",
    seed: "pkuih_h6_seed"
  };

  const DEMO_CODE = "888888";
  const SERVICE_LINK = "https://baoweidong.github.io/pkuih-enterprise-health/";
  const AVATARS = {
    male: "assets/avatars/doctor-male.svg",
    maleSenior: "assets/avatars/doctor-male-senior.svg",
    female: "assets/avatars/doctor-female.svg",
    femaleSenior: "assets/avatars/doctor-female-senior.svg"
  };

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
      desc: "各科室骨干医生，适合员工健康课堂、科室科普与现场巡诊。"
    }
  };
  const TIER_ORDER = ["elite", "director", "specialist"];

  const SERVICES = {
    讲座: { id: "讲座", label: "专家讲座", desc: "主题分享 + 现场问答" },
    巡诊: { id: "巡诊", label: "现场巡诊", desc: "健康筛查 + 现场咨询" },
    "1对1": { id: "1对1", label: "1 对 1", desc: "一对一问诊与健康建议" }
  };
  const SERVICE_IDS = ["讲座", "巡诊", "1对1"];

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
    closed: { label: "已关闭", cls: "is-cancelled" }
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
    adminAuthed: false,
    adminUser: null,
    // client
    expertScope: "nearby",
    expertTier: "all",
    expertService: "all",
    expertAvailability: "bookable",
    expertSearch: "",
    expertSearchOpen: false,
    appointmentFilter: "all",
    clientRecordTab: "bookings",
    demandFilter: "all",
    booking: null,
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
      province: "北京市",
      city: "北京市"
    },
    pendingAuth: null,
    codeTimer: null,
    codeCountdown: 0,
    // overlay
    overlay: null,
    overlayScrollY: null,
    posterId: "",
    profileDraft: null,
    // admin
    adminTab: "appointments",
    adminFilter: "all",
    adminSearch: "",
    adminDoctorSearch: "",
    adminDemandFilter: "all",
    adminHospitalId: "",
    adminReviewId: "",
    adminDraft: null,
    adminNoteEditing: false,
    adminDemandId: "",
    adminDemandDraft: null,
    slotDoctorId: "",
    slotMonth: "",
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
    adminDoctorDraft: null,
    // history & scroll
    viewScroll: { main: {}, admin: {} },
    historyDepth: 0,
    overlayHistoryDepth: 0,
    suppressPopCount: 0,
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

  function setSession(user) {
    state.session = user;
    writeJSON(STORAGE.session, user);
  }

  function clearSession() {
    state.session = null;
    localStorage.removeItem(STORAGE.session);
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

  function operatorHospital() {
    if (!state.adminUser) return null;
    if (isSuperadmin()) {
      return (
        state.hospitals.find((item) => item.id === state.adminHospitalId) ||
        state.hospitals[0] ||
        null
      );
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
      .map((expert) => ({ ...expert, ...(config.overrides?.[expert.id] || {}) }));
    const added = (config.added || []).map((expert) => ({ ...expert, custom: true }));
    state.experts = merged.concat(added);
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

  function expertAvatar(expert) {
    if (!expert) return AVATARS.male;
    if (expert.photoCard) return expert.photoCard;
    if (expert.photo) return expert.photo;
    if (expert.gender === "female") {
      return expert.senior ? AVATARS.femaleSenior : AVATARS.female;
    }
    return expert.senior || expert.tier === "elite" ? AVATARS.maleSenior : AVATARS.male;
  }

  function expertAvatarDetail(expert) {
    if (!expert) return AVATARS.male;
    return expert.photoDetail || expertAvatar(expert);
  }

  function tierOf(expert) {
    return TIERS[expert?.tier] || TIERS.specialist;
  }

  function serviceLabel(value) {
    return SERVICES[value]?.label || value;
  }

  function nearestHospital(user = state.session) {
    const province = user?.province || "北京";
    const city = user?.city || "北京";
    if (city && city.includes("深圳")) return hospitalById("shenzhen");
    if (city && city.includes("天津")) return hospitalById("ocean");
    if (city && city.includes("淄博")) {
      return hospitalById(province === "山东" ? "luzhong" : "pkuih");
    }
    if (city && city.includes("长治")) return hospitalById("luan");
    if (city && city.includes("株洲")) return hospitalById("kaide");
    if (province === "北京") return hospitalById("pkuih");
    if (province === "天津") return hospitalById("ocean");
    if (province === "山东") return hospitalById("luzhong");
    if (province === "山西") return hospitalById("luan");
    if (province === "湖南") return hospitalById("kaide");
    if (province === "广东") return hospitalById("shenzhen");
    return hospitalById("pkuih");
  }

  function doctorExpertise(expert) {
    return cleanText(expert?.specialty || expert?.intro || "以院方最终确认的专家资料为准。", 180);
  }

  function matchesService(expert, service) {
    return !service || service === "all" || (expert.services || []).includes(service);
  }

  function getSlots(doctorId) {
    const all = readJSON(STORAGE.slots, {});
    return all[doctorId] && typeof all[doctorId] === "object" ? all[doctorId] : {};
  }

  function getAllSlots() {
    const all = readJSON(STORAGE.slots, {});
    return all && typeof all === "object" ? all : {};
  }

  function saveAllSlots(all) {
    writeJSON(STORAGE.slots, all);
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

  function getAppointments() {
    return readJSON(STORAGE.appointments, []);
  }

  function saveAppointments(items) {
    writeJSON(STORAGE.appointments, items);
  }

  function appointmentsForUser(phone) {
    return getAppointments()
      .filter((item) => item.ownerPhone === phone)
      .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  }

  function appointmentById(id) {
    return getAppointments().find((item) => item.id === id) || null;
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
        const left = Math.max(0, Number(map[date] || 0) - bookedCount(expert.id, date, ignoreId));
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
        if (!hospital) return true;
        return item.hospitalId === hospital.id;
      })
      .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  }

  function getSmsLogs() {
    return readJSON(STORAGE.smsLogs, {});
  }

  function saveSmsLog(id, payload) {
    const logs = getSmsLogs();
    logs[id] = payload;
    writeJSON(STORAGE.smsLogs, logs);
  }

  /* =========================================================
     Seasonal themes
     ========================================================= */
  function seasonalOf(month = currentMonth()) {
    return state.seasonal.find((item) => item.month === Number(month)) || state.seasonal[0] || null;
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
    const season = seasonalOf(month);
    if (!season) return [];
    const exact = state.themeMatches
      .filter((row) => row.doctor === expert.name && row.month === Number(month))
      .map((row) => ({ dept: row.dept, title: row.topic, matched: true }));
    const seen = new Set(exact.map((item) => item.title));
    const aliases = DEPT_ALIASES[expert.dept] || [expert.dept];
    const keywords = [expert.dept].concat(aliases).filter(Boolean);
    const related = [];
    season.topics.forEach((topic) => {
      if (seen.has(topic.title)) return;
      if (keywords.some((keyword) => keyword && topic.dept.includes(keyword))) {
        related.push({ dept: topic.dept, title: topic.title, matched: false });
        seen.add(topic.title);
      }
    });
    const list = exact.concat(related);
    if (!list.length) {
      season.topics.slice(0, 2).forEach((topic) =>
        list.push({ dept: topic.dept, title: topic.title, matched: false })
      );
    }
    return list.slice(0, 6);
  }

  function seasonSummary(month) {
    const season = seasonalOf(month);
    if (!season) return "";
    return `${season.season} · ${season.focus}`;
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
    stethoscope:
      '<path d="M5 3v5a4 4 0 0 0 8 0V3"/><path d="M5 3h2M11 3h2"/><path d="M9 12v3a5 5 0 0 0 10 0v-2"/><circle cx="19" cy="10" r="2.2"/>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M9 7V4.8c0-.5.4-.8.8-.8h4.4c.4 0 .8.3.8.8V7M3 12.5h18"/>',
    users:
      '<circle cx="9" cy="8.5" r="3.2"/><path d="M3 20c.4-3.4 2.5-5.3 6-5.3s5.6 1.9 6 5.3"/><path d="M15.5 5.6a3 3 0 0 1 0 5.8M16.2 14.9c3 .3 4.6 2 5 5.1"/>',
    clipboard:
      '<rect x="5" y="4.5" width="14" height="17" rx="2.5"/><path d="M9 4.5V3h6v1.5M8.5 9h7M8.5 12.5h7M8.5 16h4.5"/>',
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
    return state.overlayScrollY ?? window.scrollY ?? 0;
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

  function pushAppHistory(layer = "overlay") {
    if (state.screen === "auth" && layer !== "auth") return false;
    try {
      window.history.pushState(
        { ...(window.history.state || {}), pkuihLayer: layer },
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
    if (state.reuseHistoryForOverlay) {
      state.reuseHistoryForOverlay = false;
      state.overlayHistoryDepth = Math.max(1, state.overlayHistoryDepth);
      return;
    }
    if (pushAppHistory("overlay")) state.overlayHistoryDepth += 1;
  }

  function releaseOverlayHistory(levels = null) {
    const depth = state.overlayHistoryDepth;
    if (depth <= 0) return 0;
    const count = levels === null ? depth : Math.min(Math.max(1, levels), depth);
    state.overlayHistoryDepth = depth - count;
    return popAppHistory(count);
  }

  function clearOverlayState() {
    state.overlay = null;
    state.booking = null;
    state.posterId = "";
    state.profileDraft = null;
    state.adminReviewId = "";
    state.adminDraft = null;
    state.adminNoteEditing = false;
    state.adminDemandId = "";
    state.adminDemandDraft = null;
    state.adminAccountDraft = null;
    state.adminDoctorDraft = null;
    state.slotDay = "";
  }

  function dismissOverlay({ fromHistory = false } = {}) {
    if (!fromHistory) releaseOverlayHistory();
    clearOverlayState();
    if (state.screen === "admin" || state.screen === "admin-login") renderApp();
    else renderOverlay();
    document.body.classList.remove("is-locked");
  }

  function renderOverlay() {
    if (!overlayRoot) return;
    const hadOverlay = Boolean(overlayRoot.querySelector(".sheet, .flow"));
    const previousBody = overlayRoot.querySelector(".sheet__body, .flow__body");
    const previousScroll = previousBody?.scrollTop || 0;
    if (state.overlay && !hadOverlay) {
      if (state.overlayScrollY == null) state.overlayScrollY = Math.max(0, window.scrollY || 0);
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
      if (hadOverlay && previousScroll) {
        const nextBody = overlayRoot.querySelector(".sheet__body, .flow__body");
        if (nextBody) {
          window.requestAnimationFrame(() => {
            nextBody.scrollTop = previousScroll;
          });
        }
      }
    };
    const type = state.overlay?.type;
    if (type === "booking") return paint(renderBookingFlow());
    if (type === "doctor") return paint(renderDoctorSheet());
    if (type === "appointment") return paint(renderAppointmentSheet());
    if (type === "demand-create") return paint(renderDemandCreateSheet());
    if (type === "demand") return paint(renderDemandSheet());
    if (type === "profile") return paint(renderProfileSheet());
    if (type === "poster") return paint(renderPosterSheet());
    if (type === "admin-review") return paint(renderAdminReviewSheet());
    if (type === "admin-demand") return paint(renderAdminDemandSheet());
    if (type === "admin-account") return paint(renderAdminAccountSheet());
    if (type === "admin-doctor") return paint(renderAdminDoctorSheet());
    if (type === "slot-day") return paint(renderSlotDaySheet());
    if (!state.overlay) {
      overlayRoot.innerHTML = "";
      document.body.classList.remove("is-locked");
      const restoreTop = state.overlayScrollY;
      state.overlayScrollY = null;
      if (restoreTop != null) restoreWindowScroll(restoreTop);
    }
  }

  function openDoctorSheet(id) {
    const expert = expertById(id);
    if (!expert) return;
    state.overlay = { type: "doctor", doctorId: expert.id, month: currentMonth() };
    renderOverlay();
  }

  /* =========================================================
     Auth
     ========================================================= */
  function renderAuthScreen() {
    const { step } = state.login;
    const existing = /^1\d{10}$/.test(state.login.phone) ? getUser(state.login.phone) : null;
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
          <p>手机号登录即可预约专家讲座、巡诊与 1 对 1 健康咨询，院方项目组全程跟进。</p>
        </div>
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
                <p class="auth-tip">${icon("lock", 12)} 未注册手机号验证后将自动创建账号</p>
              `
              : `
                <div class="auth-profile-head">
                  <span>${initialOf(state.login.name || state.login.phone)}</span>
                  <div>
                    <strong>${esc(state.login.phone)}</strong>
                    <small>${existing ? "已创建账号，请确认资料" : "首次登录，请完善联系信息"}</small>
                  </div>
                </div>
                <div class="field-row">
                  <div class="field">
                    <label for="login-name">姓名 <em>*</em></label>
                    <input id="login-name" type="text" placeholder="请输入姓名" value="${esc(
                      state.login.name
                    )}" data-login-field="name">
                  </div>
                  <div class="field">
                    <label for="login-title">职务</label>
                    <input id="login-title" type="text" placeholder="如：客户健康负责人" value="${esc(
                      state.login.title
                    )}" data-login-field="title">
                  </div>
                </div>
                <div class="field">
                  <label for="login-org">单位名称 <em>*</em></label>
                  <input id="login-org" type="text" placeholder="请输入保险公司或企业名称" value="${esc(
                    state.login.orgName
                  )}" data-login-field="orgName">
                </div>
                <div class="field">
                  <label>机构类型</label>
                  <div class="choice-grid">
                    ${["保险公司", "企业", "其他机构"]
                      .map(
                        (type) => `
                          <button class="choice-tile ${
                            state.login.orgType === type ? "is-active" : ""
                          }" type="button" data-action="login-org-type" data-value="${type}">
                            ${esc(type)}
                          </button>
                        `
                      )
                      .join("")}
                  </div>
                </div>
                <div class="field">
                  <label for="login-contact">联系方式 <span>默认使用登录手机号，可修改</span></label>
                  <input id="login-contact" type="tel" inputmode="numeric" maxlength="11"
                    placeholder="请输入联系电话" value="${esc(
                      state.login.contactPhone || state.login.phone
                    )}" data-login-field="contactPhone">
                </div>
                <div class="field">
                  <label>所在省市 <span>用于优先展示就近医院</span></label>
                  <div class="field-row">
                    <select data-login-province>${renderProvinceOptions(state.login.province)}</select>
                    <select data-login-city>${renderCityOptions(
                      state.login.province,
                      state.login.city
                    )}</select>
                  </div>
                </div>
                <button class="btn btn--primary btn--block auth-submit" type="button" data-action="login-submit">
                  ${existing ? "进入平台" : "完成注册并进入"} ${icon("arrowRight", 15)}
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
    state.pendingAuth = pending;
    state.screen = "auth";
    state.login.step = 1;
    state.login.code = "";
    state.login.agree = false;
    state.adminAuthed = false;
    if (!state.authHistory) {
      state.authHistory = true;
      pushAppHistory("auth");
    }
    renderApp();
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
    if (!/^1\d{10}$/.test(phone)) {
      showToast("请输入正确的 11 位手机号。");
      return;
    }
    if (code !== DEMO_CODE) {
      showToast("验证码不正确，演示环境请输入 888888。");
      return;
    }
    if (!agree) {
      showToast("请先阅读并同意预约须知。");
      return;
    }
    const existing = getUser(phone);
    if (existing) {
      finishLogin(existing);
      return;
    }
    state.login.step = 2;
    state.login.contactPhone = state.login.contactPhone || phone;
    renderApp();
    window.scrollTo(0, 0);
  }

  function finishLogin(user) {
    setSession(user);
    state.adminAuthed = false;
    clearAdminSession();
    setLastPortal("client");
    if (state.authHistory) {
      state.authHistory = false;
      state.reuseHistoryForOverlay = true;
    }
    const pending = state.pendingAuth;
    state.pendingAuth = null;
    state.screen = "main";
    state.login.step = 1;
    state.login.code = "";
    if (pending?.type === "booking") {
      state.tab = "experts";
      renderApp({ scrollTo: 0 });
      openBooking(pending.doctorId || "", pending.tier || "");
    } else if (pending?.type === "tab") {
      state.tab = pending.tab || "me";
      renderApp({ scrollTo: 0 });
    } else if (pending?.type === "demand") {
      state.tab = "appointments";
      state.clientRecordTab = "demands";
      renderApp({ scrollTo: 0 });
      openDemandCreate();
    } else {
      state.tab = "home";
      renderApp({ scrollTo: 0 });
    }
    showToast(`欢迎回来，${user.name}。`);
  }

  function submitProfileLogin() {
    const { phone, name, orgName, orgType, title, contactPhone, province, city } = state.login;
    if (!name.trim()) return showToast("请填写姓名。");
    if (!orgName.trim()) return showToast("请填写单位名称。");
    if (contactPhone && !/^1\d{10}$/.test(contactPhone)) {
      return showToast("联系方式格式不正确。");
    }
    const now = new Date().toISOString();
    const region = normalizeRegion(province, city);
    const user = {
      phone,
      name: name.trim(),
      orgName: orgName.trim(),
      orgType,
      title: title.trim(),
      contactPhone: contactPhone || phone,
      province: region.province,
      city: region.city,
      createdAt: getUser(phone)?.createdAt || now,
      updatedAt: now
    };
    const saved = upsertUser(user);
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
              : `<button class="topbar__login" type="button" data-action="start-login">登录 ${icon(
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
    return state.experts.filter((expert) => {
      if (!expert.active) return false;
      if (expert.hospitalId !== hospital?.id) return false;
      if (bookableOnly && !doctorAvailability(expert).bookable) return false;
      return true;
    });
  }

  function bookableScopeExperts(scope = state.expertScope) {
    const hospital = nearestHospital();
    return state.experts.filter((expert) => {
      if (!expert.active) return false;
      if (scope === "nearby" && expert.hospitalId !== hospital?.id) return false;
      if (state.expertAvailability === "bookable" && !doctorAvailability(expert).bookable) return false;
      if (!matchesService(expert, state.expertService)) return false;
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
          ...(expert.services || [])
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
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
          <span class="expert-mini__hospital">${esc(expert.hospital)}</span>
          <span class="expert-mini__services">${(expert.services || [])
            .map((service) => `<span>${esc(service)}</span>`)
            .join("")}</span>
          <span class="expert-mini__avail ${availability.bookable ? "is-open" : "is-full"}">
            ${availability.bookable ? `最近可约 ${formatMD(availability.next)}` : "暂无可约档期"}
          </span>
        </span>
      </button>
    `;
  }

  function renderHomePage() {
    const session = state.session;
    const hospital = nearestHospital();
    const near = nearbyExperts({ bookableOnly: true });
    const season = seasonalOf();
    const nearCount = nearbyExperts().filter((expert) => doctorAvailability(expert).bookable).length;
    return `
      <div class="screen">
        <section class="hero">
          <div class="hero__media">
            <img src="assets/hero-campus-960.jpg" alt="北京大学国际医院" width="960" height="411"
              fetchpriority="high" decoding="async">
          </div>
          <div class="hero__content">
            <span class="hero__kicker"><i></i> 白大褂到企 · 名医入企计划</span>
            <h1>把医学专家<br><em>请到企业身边</em></h1>
            <p>面向保险公司与企业，提供讲座、巡诊与 1 对 1 健康咨询。按医院、科室与时令主题匹配专家，院方项目组全程跟进。</p>
            <div class="hero__actions">
              <button class="btn btn--accent" type="button" data-action="open-booking">
                发起活动预约 ${icon("arrowRight", 15)}
              </button>
              <button class="btn btn--glass" type="button" data-action="tab" data-tab="experts">
                浏览专家库
              </button>
            </div>
            <div class="hero__metrics">
              <div><strong>${state.experts.length}<span>位</span></strong><small>在库专家</small></div>
              <div><strong>${state.hospitals.length}<span>家</span></strong><small>履约医院</small></div>
              <div><strong>3<span>类</span></strong><small>到企服务</small></div>
            </div>
          </div>
        </section>

        ${
          session
            ? `
              <button class="nearby-card" type="button" data-action="tab" data-tab="experts">
                <span class="nearby-card__icon">${icon("mapPin", 17)}</span>
                <span class="nearby-card__copy">
                  <small>当前所在地区 · ${esc(regionText(session.province, session.city) || "北京")}</small>
                  <strong>${esc(hospital?.name || "北京大学国际医院")}</strong>
                  <span>${nearCount} 位专家近期可预约 · 优先展示就近医院</span>
                </span>
                <span class="nearby-card__cta">查看 ${icon("chevronRight", 14)}</span>
              </button>
            `
            : `
              <button class="nearby-card nearby-card--guest" type="button" data-action="start-login">
                <span class="nearby-card__icon">${icon("mapPin", 17)}</span>
                <span class="nearby-card__copy">
                  <small>就近医院优先展示</small>
                  <strong>登录后查看本地可预约专家</strong>
                  <span>按所在省市匹配医院与专家号源</span>
                </span>
                <span class="nearby-card__cta">登录 ${icon("chevronRight", 14)}</span>
              </button>
            `
        }

        <section class="season-banner">
          <div class="season-banner__head">
            <span class="season-banner__month">${currentMonth()}月</span>
            <div>
              <small>本月时令主题</small>
              <strong>${esc(season?.season || "")}</strong>
            </div>
            <button class="text-link" type="button" data-action="tab" data-tab="experts">按主题找专家 ${icon("chevronRight", 13)}</button>
          </div>
          <p>${esc(season?.focus || "")} · ${esc(season?.diseases || "")}</p>
          <div class="season-banner__topics">
            ${(season?.topics || [])
              .slice(0, 4)
              .map(
                (topic) => `
                  <button type="button" data-action="search-topic" data-value="${esc(topic.title)}">
                    <i>${esc(topic.dept)}</i>${esc(topic.title)}
                  </button>
                `
              )
              .join("")}
          </div>
        </section>

        <section class="section">
          <div class="section-head">
            <div>
              <h2>就近可预约专家</h2>
              <p>${esc(hospital?.name || "")} · 与号源实时关联</p>
            </div>
            <button class="text-link" type="button" data-action="tab" data-tab="experts">全部专家 ${icon("chevronRight", 14)}</button>
          </div>
          <div class="expert-mini-list">
            ${
              near.length
                ? near.slice(0, 4).map(renderExpertMini).join("")
                : `<div class="inline-empty">近期暂无号源，可切换查看全部地区专家，或发起提需由院方协调。</div>`
            }
          </div>
        </section>

        <section class="section">
          <div class="section-head">
            <div><h2>三级专家资源</h2><p>按活动规格与预约周期匹配</p></div>
          </div>
          <div class="tier-row">
            ${TIER_ORDER.map((tierId) => {
              const tier = TIERS[tierId];
              const list = state.experts.filter((expert) => expert.tier === tierId && expert.active);
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

        <section class="section">
          <div class="section-head">
            <div><h2>到企服务类型</h2><p>讲座、巡诊与 1 对 1 灵活组合</p></div>
          </div>
          <div class="service-grid">
            ${SERVICE_IDS.map((id, index) => {
              const service = SERVICES[id];
              return `
                <button class="service-card" type="button" data-action="service-open" data-value="${esc(id)}">
                  <span class="service-card__num">0${index + 1}</span>
                  <span class="service-card__icon">${icon(
                    id === "讲座" ? "message" : id === "巡诊" ? "stethoscope" : "users",
                    19
                  )}</span>
                  <strong>${esc(service.label)}</strong>
                  <p>${esc(service.desc)}</p>
                </button>
              `;
            }).join("")}
          </div>
        </section>

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
          专家资料、医院与服务信息来自院方整理表（2026-11-20），仅用于本演示。实际出讲专家、号源与排期以院方最终确认为准。
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
     Experts
     ========================================================= */
  function renderExpertCard(expert) {
    const tier = tierOf(expert);
    const availability = doctorAvailability(expert);
    return `
      <button class="expert-card" type="button" data-action="open-doctor" data-doctor-id="${esc(expert.id)}">
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
          <span class="expert-card__hospital">${icon("building", 12)} ${esc(expert.hospital)} · ${esc(
            expert.dept
          )}</span>
          <span class="expert-card__intro">${esc(doctorExpertise(expert))}</span>
          <span class="expert-card__foot">
            <span class="expert-card__services">${(expert.services || [])
              .map((service) => `<span>${esc(service)}</span>`)
              .join("")}</span>
            <span class="expert-card__more">详情 ${icon("chevronRight", 11)}</span>
          </span>
        </span>
      </button>
    `;
  }

  function renderExpertResults() {
    const list = bookableScopeExperts();
    const hospital = nearestHospital();
    return `
      <div class="expert-result-meta">
        <span><b>${list.length}</b> 位专家</span>
        <span>${state.expertScope === "nearby" ? esc(hospital?.name || "就近医院") : "全国可预约专家"}</span>
      </div>
      ${
        list.length
          ? `<div class="expert-list">${list.map(renderExpertCard).join("")}</div>`
          : `<div class="empty-state">
              <span class="empty-state__icon">${icon("search", 26)}</span>
              <h3>没有匹配的可预约专家</h3>
              <p>可以切换“全部地区”，或发起提需由院方协助匹配。</p>
              <button class="btn btn--primary btn--sm" type="button" data-action="open-demand">发起提需</button>
            </div>`
      }
    `;
  }

  function renderExpertsPage() {
    const hospital = nearestHospital();
    const nearCount = nearbyExperts().length;
    return `
      <div class="screen experts-screen">
        <header class="page-head page-head--tight">
          <span class="eyebrow"><i></i> Expert Network</span>
          <h1>专家库</h1>
          <p>按医院、梯队、科室、服务类型与时令主题匹配专家。</p>
        </header>
        <div class="expert-toolbar" id="expert-toolbar">
          <div class="expert-toolbar__row">
            <div class="segmented segmented--scope">
              <button class="${state.expertScope === "nearby" ? "is-active" : ""}" type="button"
                data-action="expert-scope" data-value="nearby">就近医院 <span>${nearCount}</span></button>
              <button class="${state.expertScope === "all" ? "is-active" : ""}" type="button"
                data-action="expert-scope" data-value="all">全部地区</button>
            </div>
            <button class="icon-button ${state.expertSearchOpen ? "is-active" : ""}" type="button"
              data-action="expert-search-toggle" aria-label="搜索专家">${icon("search", 17)}</button>
          </div>
          ${
            state.expertSearchOpen
              ? `<div class="expert-search">
                  ${icon("search", 16)}
                  <input id="expert-search" type="search" placeholder="搜索姓名、医院、科室或主题"
                    value="${esc(state.expertSearch)}" data-expert-search autocomplete="off">
                  <button type="button" data-action="expert-search-clear" aria-label="清空">${icon(
                    "close",
                    12
                  )}</button>
                </div>`
              : ""
          }
          <div class="filter-scroll">
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
              data-action="expert-availability" data-value="bookable">只看可约</button>
            <button class="chip ${state.expertAvailability === "all" ? "is-active" : ""}" type="button"
              data-action="expert-availability" data-value="all">全部专家</button>
            <i class="filter-divider"></i>
            ${SERVICE_IDS.map(
              (id) =>
                `<button class="chip ${state.expertService === id ? "is-active" : ""}" type="button"
                  data-action="expert-service" data-value="${esc(id)}">${esc(id)}</button>`
            ).join("")}
          </div>
          <p class="expert-toolbar__hint" id="expert-scope-hint">${icon("mapPin", 11)} ${
            state.expertScope === "nearby"
              ? `优先展示 ${esc(hospital?.name || "就近医院")}，可切换到全部地区`
              : "展示全国可预约专家，号源按各医院实时配置"
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
  }

  function renderDoctorSheet() {
    const expert = expertById(state.overlay?.doctorId);
    if (!expert) return "";
    const tier = tierOf(expert);
    const availability = doctorAvailability(expert);
    const month = Number(state.overlay?.month) || currentMonth();
    const season = seasonalOf(month);
    const themes = themesForExpert(expert, month);
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
            <span>${icon("mapPin", 12)} ${esc(expert.coverage)}</span>
            <span class="doctor-hero__avail ${availability.bookable ? "is-open" : "is-full"}">
              ${availability.bookable ? `最近可约 ${formatMD(availability.next)}` : "暂无可约档期"}
            </span>
          </div>
        </div>
        <div class="sheet__body">
          <div class="doctor-sheet__content">
            <div class="doctor-services">
              ${(expert.services || [])
                .map(
                  (service) =>
                    `<span>${icon(
                      service === "讲座" ? "message" : service === "巡诊" ? "stethoscope" : "users",
                      13
                    )} ${esc(service)}</span>`
                )
                .join("")}
            </div>
            <div class="fact-grid">
              <div><small>履约机构</small><strong>${esc(expert.hospital)}</strong></div>
              <div><small>科室 / 任职</small><strong>${esc(expert.deptTitle)}</strong></div>
              <div><small>科室方向</small><strong>${esc(expert.dept)}</strong></div>
              <div><small>履约地</small><strong>${esc(expert.coverage)}</strong></div>
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
                <span>${currentMonth()}月当前</span>
              </div>
              <div class="month-tabs">
                ${Array.from({ length: 12 }, (_, index) => index + 1)
                  .map(
                    (item) =>
                      `<button class="${item === month ? "is-active" : ""}" type="button"
                        data-action="doctor-month" data-value="${item}">${item}月</button>`
                  )
                  .join("")}
              </div>
              <div class="season-detail__summary">
                <strong>${esc(season?.season || "")}</strong>
                <p>${esc(season?.focus || "")}</p>
              </div>
              <div class="theme-list">
                ${themes
                  .map(
                    (theme) => `
                      <div class="theme-item ${theme.matched ? "is-matched" : ""}">
                        <span>${esc(theme.dept)}</span>
                        <strong>${esc(theme.title)}</strong>
                        ${theme.matched ? "<i>本院已排期</i>" : ""}
                      </div>
                    `
                  )
                  .join("")}
              </div>
              <p class="season-detail__note">主题可按企业人群与行业方向调整，具体课题以院方项目组确认为准。</p>
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
          <button class="btn btn--ghost" type="button" data-action="close-overlay">返回</button>
          <button class="btn btn--primary" type="button" data-action="book-doctor" data-doctor-id="${esc(
            expert.id
          )}" ${availability.bookable ? "" : "disabled"}>
            ${availability.bookable ? "预约该专家" : "暂无可约档期"} ${icon("arrowRight", 15)}
          </button>
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

  function createBookingDraft(doctorId = "", tier = "") {
    const expert = doctorId ? expertById(doctorId) : null;
    const session = state.session || {};
    const region = normalizeRegion(session.province || "北京市", session.city || "北京市");
    return {
      step: 1,
      serviceType: expert?.services?.[0] || "讲座",
      doctorId: expert?.id || "",
      tier: expert?.tier || tier || "specialist",
      date: "",
      province: region.province,
      city: region.city,
      address: "",
      venue: "",
      topic: "",
      customTopic: "",
      audience: "",
      headcount: "",
      note: "",
      contactName: session.name || "",
      contactPhone: session.contactPhone || session.phone || "",
      agree: false
    };
  }

  function openBooking(doctorId = "", tier = "") {
    if (!state.session) {
      startLogin({ type: "booking", doctorId, tier });
      return;
    }
    state.booking = createBookingDraft(doctorId, tier);
    state.overlay = { type: "booking" };
    renderOverlay();
  }

  function bookingSelectedDoctor(booking) {
    return booking?.doctorId ? expertById(booking.doctorId) : null;
  }

  function bookingTopicChoices(booking) {
    const date = parseDate(booking?.date);
    const month = date ? date.getMonth() + 1 : currentMonth();
    return (seasonalOf(month)?.topics || []).slice(0, 8);
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
              <span>${icon(id === "讲座" ? "message" : id === "巡诊" ? "stethoscope" : "users", 17)}</span>
              <strong>${esc(service.label)}</strong>
              <small>${esc(service.desc)}</small>
            </button>
          `;
        }).join("")}
      </div>
    `;
  }

  function bookingDoctorOptions(booking) {
    const hospital = nearestHospital();
    const list = state.experts.filter((expert) => {
      if (!expert.active) return false;
      if (expert.hospitalId !== hospital?.id) return false;
      if (!matchesService(expert, booking.serviceType)) return false;
      return doctorAvailability(expert).bookable;
    });
    return list.slice(0, 8);
  }

  function renderBookingDoctorSection(booking) {
    const options = bookingDoctorOptions(booking);
    const doctor = bookingSelectedDoctor(booking);
    return `
      <div class="booking-doctor-list">
        <button class="booking-doctor ${!booking.doctorId ? "is-active" : ""}" type="button"
          data-action="booking-doctor" data-value="">
          <span class="booking-doctor__any">${icon("sparkles", 18)}</span>
          <span><strong>不指定专家，由院方匹配</strong><small>院方接单后根据主题与人群安排</small></span>
          <i class="booking-doctor__check">${icon("check", 12)}</i>
        </button>
        ${options
          .map((expert) => {
            const availability = doctorAvailability(expert);
            return `
              <button class="booking-doctor ${
                booking.doctorId === expert.id ? "is-active" : ""
              }" type="button" data-action="booking-doctor" data-value="${esc(expert.id)}">
                <img src="${esc(expertAvatar(expert))}" alt="${esc(expert.name)}" loading="lazy">
                <span><strong>${esc(expert.name)}<i>${esc(expert.deptTitle)}</i></strong>
                  <small>${esc(expert.hospital)} · 最近可约 ${formatMD(availability.next)}</small></span>
                <i class="booking-doctor__check">${icon("check", 12)}</i>
              </button>
            `;
          })
          .join("")}
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
            : `<div class="inline-empty">该专家暂无可约日期，可切换其他专家或发起提需。</div>`
        }
      </div>
    `;
  }

  function renderBookingTopics(booking) {
    const list = bookingTopicChoices(booking);
    return `
      <div class="topic-chip-list" id="booking-topics">
        ${list
          .map(
            (topic) => `
              <button class="topic-chip ${
                booking.customTopic === topic.title ? "is-active" : ""
              }" type="button" data-action="booking-topic" data-value="${esc(topic.title)}">
                <i>${esc(topic.dept)}</i>${esc(topic.title)}
              </button>
            `
          )
          .join("")}
      </div>
    `;
  }

  function renderBookingStepOne() {
    const booking = state.booking;
    if (!booking) return "";
    return `
      <div class="flow-section">
        <div class="flow-section__head"><h2>服务类型</h2><span>选择到企服务形式</span></div>
        ${renderBookingServiceSection(booking)}
      </div>
      <div class="flow-section">
        <div class="flow-section__head"><h2>专家</h2><span>可不指定，由院方匹配</span></div>
        <div id="booking-doctors">${renderBookingDoctorSection(booking)}</div>
      </div>
      <div class="flow-section">
        <div class="flow-section__head"><h2>期望日期</h2><span>号源按整天配置，不区分时段</span></div>
        ${renderBookingDates(booking)}
      </div>
      <div class="flow-section">
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
          <input type="text" data-booking-field="address" value="${esc(
            booking.address
          )}" placeholder="请输入企业详细地址，如：XX路XX号XX大厦">
        </div>
        <div class="field">
          <label>场地名称 <span>选填</span></label>
          <input type="text" data-booking-field="venue" value="${esc(
            booking.venue
          )}" placeholder="如：总部大楼 3 层报告厅">
        </div>
      </div>
      <div class="flow-section">
        <div class="flow-section__head"><h2>活动需求</h2><span>本月时令主题优先推荐</span></div>
        ${renderBookingTopics(booking)}
        <div class="field">
          <label>活动主题 <span>可选本月主题，也可自定义</span></label>
          <input type="text" data-booking-field="customTopic" value="${esc(
            booking.customTopic
          )}" placeholder="如：职场人群心血管风险识别">
        </div>
        <div class="field-row">
          <div class="field"><label>参与人群</label>
            <input type="text" data-booking-field="audience" value="${esc(
              booking.audience
            )}" placeholder="如：企业员工 / 高客">
          </div>
          <div class="field"><label>预计人数</label>
            <input type="number" inputmode="numeric" data-booking-field="headcount" value="${esc(
              booking.headcount
            )}" placeholder="如：80">
          </div>
        </div>
        <div class="field">
          <label>补充说明 <span>选填</span></label>
          <textarea data-booking-field="note" placeholder="可填写人群特点、场地条件、期望时段或其他要求">${esc(
            booking.note
          )}</textarea>
        </div>
      </div>
      <div class="flow-section">
        <div class="flow-section__head"><h2>联系人</h2><span>默认带入登录信息</span></div>
        <div class="field-row">
          <div class="field"><label>联系人</label>
            <input type="text" data-booking-field="contactName" value="${esc(booking.contactName)}">
          </div>
          <div class="field"><label>联系电话</label>
            <input type="tel" inputmode="numeric" maxlength="11" data-booking-field="contactPhone" value="${esc(
              booking.contactPhone
            )}">
          </div>
        </div>
      </div>
    `;
  }

  function renderBookingSummary() {
    const booking = state.booking;
    const expert = bookingSelectedDoctor(booking);
    const hospital = expert ? hospitalById(expert.hospitalId) : nearestHospital();
    return `
      <div class="summary-card summary-card--hero">
        <span class="summary-card__label">${icon("calendar", 14)} 活动预约</span>
        <h2>${esc(booking.customTopic || "由院方结合时令主题推荐")}</h2>
        <div class="summary-card__pills">
          <span>${esc(booking.serviceType)}</span>
          <span>${esc(formatDateCN(booking.date, true))}</span>
          <span>${esc(hospital?.name || "")}</span>
        </div>
      </div>
      <div class="summary-list">
        <div><span>专家</span><strong>${esc(
          expert ? `${expert.name} · ${expert.deptTitle}` : "不指定专家，由院方匹配"
        )}</strong></div>
        <div><span>活动地点</span><strong>${esc(
          formatAddress(booking.province, booking.city, booking.address, booking.venue)
        )}</strong></div>
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
      <label class="check-row check-row--block">
        <input type="checkbox" data-booking-agree ${booking.agree ? "checked" : ""}>
        <span>我已确认以上信息，并同意由院方项目组联系确认活动细节。</span>
      </label>
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
                 <button class="btn btn--primary" type="button" data-action="booking-submit">提交预约 ${icon(
                   "check",
                   15
                 )}</button>`
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

  function setBookingService(value) {
    if (!state.booking) return;
    state.booking.serviceType = value;
    document.querySelectorAll('[data-action="booking-service"]').forEach((button) => {
      button.classList.toggle("is-active", button.dataset.value === value);
    });
    const doctor = bookingSelectedDoctor(state.booking);
    if (doctor && !doctor.services.includes(value)) {
      state.booking.doctorId = "";
      state.booking.date = "";
    }
    const wrap = document.getElementById("booking-doctors");
    if (wrap) wrap.innerHTML = renderBookingDoctorSection(state.booking);
    refreshBookingDates();
    refreshBookingTopics();
  }

  function setBookingDoctor(value) {
    if (!state.booking) return;
    state.booking.doctorId = value || "";
    const expert = value ? expertById(value) : null;
    if (expert) {
      state.booking.tier = expert.tier;
      if (!expert.services.includes(state.booking.serviceType)) {
        state.booking.serviceType = expert.services[0] || "讲座";
        document.querySelectorAll('[data-action="booking-service"]').forEach((button) => {
          button.classList.toggle("is-active", button.dataset.value === state.booking.serviceType);
        });
      }
      if (state.booking.date && !doctorAvailability(expert).dates.includes(state.booking.date)) {
        state.booking.date = "";
      }
    }
    document.querySelectorAll('[data-action="booking-doctor"]').forEach((button) => {
      button.classList.toggle("is-active", button.dataset.value === state.booking.doctorId);
    });
    refreshBookingDates();
    refreshBookingTopics();
  }

  function setBookingDate(value) {
    if (!state.booking) return;
    state.booking.date = value;
    document.querySelectorAll('[data-action="booking-date"]').forEach((button) => {
      button.classList.toggle("is-active", button.dataset.value === value);
    });
    refreshBookingTopics();
  }

  function setBookingProvince(value) {
    if (!state.booking) return;
    state.booking.province = value;
    state.booking.city = (state.chinaCities?.[value] || [value])[0];
    const citySelect = document.querySelector("[data-booking-city]");
    if (citySelect) citySelect.innerHTML = renderCityOptions(value, state.booking.city);
  }

  function validateBookingStepOne() {
    const booking = state.booking;
    if (!booking) return "预约信息已失效。";
    if (!booking.serviceType) return "请选择服务类型。";
    if (!booking.date) return "请选择期望日期。";
    if (!booking.province || !booking.city) return "请选择活动省市。";
    if (!booking.address.trim()) return "请填写活动详细地址。";
    if (booking.contactPhone && !/^1\d{10}$/.test(booking.contactPhone)) {
      return "联系电话格式不正确。";
    }
    if (booking.doctorId) {
      const expert = expertById(booking.doctorId);
      if (!expert) return "专家信息已失效，请重新选择。";
      if (dayRemaining(expert.id, booking.date) <= 0) return "该日期号源已约满，请选择其他日期。";
    }
    return "";
  }

  function bookingNext() {
    const error = validateBookingStepOne();
    if (error) return showToast(error);
    state.booking.step = 2;
    renderOverlay();
    overlayRoot.querySelector(".flow__body")?.scrollTo(0, 0);
  }

  function submitBooking() {
    const booking = state.booking;
    if (!booking) return;
    const error = validateBookingStepOne();
    if (error) {
      state.booking.step = 1;
      renderOverlay();
      return showToast(error);
    }
    if (!booking.agree) return showToast("请勾选确认信息后再提交。");
    const expert = bookingSelectedDoctor(booking);
    const hospital = expert ? hospitalById(expert.hospitalId) : nearestHospital();
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
      audience: booking.audience.trim(),
      headcount: booking.headcount,
      note: booking.note.trim(),
      status: "pending",
      assignedStaff: null,
      plan: null,
      planHistory: [],
      internalNote: "",
      feedback: "",
      createdAt: now,
      updatedAt: now
    };
    const items = getAppointments();
    items.push(appointment);
    saveAppointments(items);
    state.booking = null;
    state.overlay = { type: "appointment", appointmentId: id, action: "success" };
    renderOverlay();
    renderApp();
  }

  /* =========================================================
     Appointments (client)
     ========================================================= */
  function appointmentStatus(appointment) {
    return STATUS[appointment?.status] || STATUS.pending;
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

  function topicOf(appointment) {
    return (
      appointment?.plan?.topic ||
      appointment?.topic ||
      seasonalOf(parseDate(appointment?.date)?.getMonth() + 1)?.topics?.[0]?.title ||
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
          <span>${icon("briefcase", 12)} ${esc(appointment.serviceType)}</span>
          <span>${icon("experts", 12)} ${esc(
            expert ? expert.name : appointment.doctorName || "由院方匹配"
          )}</span>
          <span>${icon("building", 12)} ${esc(hospital?.short || hospital?.name || "")}</span>
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
    const hospital = hospitalById(demand.hospitalId);
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
          <span>${icon("briefcase", 12)} ${esc(demand.serviceType)}</span>
          <span>${icon("building", 12)} ${esc(hospital?.short || hospital?.name || "")}</span>
          <span>${icon("users", 12)} ${esc(demand.audience || "待沟通")}</span>
        </div>
        <div class="record-card__assignee">
          ${icon("phone", 12)}
          ${
            demand.assignedStaff
              ? `院方对接人 <strong>${esc(demand.assignedStaff.name)}</strong> · ${phoneLink(
                  demand.assignedStaff.phone,
                  demand.assignedStaff.phone
                )}`
              : "提交后由医院运营电话联系"
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
        ${
          state.clientRecordTab === "bookings"
            ? `<div class="filter-scroll filter-scroll--page">
                ${appointmentFilterList()
                  .map(
                    (filter) =>
                      `<button class="chip ${
                        state.appointmentFilter === filter.id ? "is-active" : ""
                      }" type="button" data-action="appointment-filter" data-value="${filter.id}">${filter.label}</button>`
                  )
                  .join("")}
              </div>
              <div id="appointment-list">${renderAppointmentList()}</div>`
            : `<div id="demand-list">${renderDemandList()}</div>`
        }
      </div>
    `;
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
      planning: 2,
      review: 3,
      revision: 3,
      confirmed: 4,
      completed: 5,
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
        <div class="plan-row"><span>服务类型</span><strong>${esc(plan.serviceType || appointment.serviceType)}</strong></div>
        <div class="plan-row"><span>活动时间</span><strong>${esc(
          `${formatDateCN(plan.date || appointment.date, true)} ${plan.time || ""}`
        )}</strong></div>
        <div class="plan-row"><span>活动地点</span><strong>${esc(
          formatAddress(
            plan.province || appointment.province,
            plan.city || appointment.city,
            plan.address || appointment.address,
            plan.venue || appointment.venue
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
                <span class="record-head__tag">${esc(appointment.serviceType)} · ${esc(
                  hospital?.name || ""
                )}</span>
                <h1>${esc(topicOf(appointment))}</h1>
                <p>${esc(formatDateCN(appointment.date, true))} · ${esc(
                  expert ? expert.name : appointment.doctorName || "由院方匹配专家"
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
              <div class="info-row"><span>活动地址</span><strong>${esc(
                appointmentLocationText(appointment)
              )}</strong></div>
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
            ${renderPlanCard(appointment)}
            ${
              appointment.feedback
                ? `<section class="feedback-card"><span>机构修改意见</span><p>${esc(
                    appointment.feedback
                  )}</p><small>${esc(formatDateTime(appointment.feedbackAt))}</small></section>`
                : ""
            }
            ${
              appointment.status === "review"
                ? action === "confirm"
                  ? `<div class="confirm-card">
                      <h3>确认最终预约？</h3>
                      <p>确认后预约正式生效，院方将按方案执行。如需调整，请选择“提出修改”。</p>
                      <div class="confirm-card__actions">
                        <button class="btn btn--ghost btn--sm" type="button" data-action="appointment-action" data-value="">再看看</button>
                        <button class="btn btn--primary btn--sm" type="button" data-action="appointment-confirm">确认最终预约</button>
                      </div>
                    </div>`
                  : action === "revise"
                  ? `<div class="confirm-card">
                      <h3>提出修改意见</h3>
                      <p>请说明需要调整的主题、时间、地点或流程，院方会更新方案后再次发送。</p>
                      <textarea data-revise-note placeholder="请输入修改意见"></textarea>
                      <div class="confirm-card__actions">
                        <button class="btn btn--ghost btn--sm" type="button" data-action="appointment-action" data-value="">取消</button>
                        <button class="btn btn--primary btn--sm" type="button" data-action="appointment-revise-submit">提交修改意见</button>
                      </div>
                    </div>`
                  : `<div class="review-actions">
                      <button class="btn btn--primary" type="button" data-action="appointment-action" data-value="confirm">确认最终预约</button>
                      <button class="btn btn--ghost" type="button" data-action="appointment-action" data-value="revise">提出修改</button>
                    </div>`
                : ""
            }
            ${
              appointment.status === "confirmed"
                ? `<div class="confirmed-banner">${icon("checkCircle", 18)}<div><strong>预约已确认</strong><p>院方将按最终方案执行。如需调整，请联系项目对接人 ${
                    assignee ? phoneLink(assignee.phone, assignee.phone) : ""
                  }。</p></div></div>`
                : ""
            }
            ${
              ["pending", "planning", "review", "revision"].includes(appointment.status)
                ? action === "cancel"
                  ? `<div class="confirm-card">
                      <h3>取消本次预约？</h3>
                      <p>取消后号源会释放，如需重新预约请再次提交。</p>
                      <div class="confirm-card__actions">
                        <button class="btn btn--ghost btn--sm" type="button" data-action="appointment-action" data-value="">保留预约</button>
                        <button class="btn btn--danger btn--sm" type="button" data-action="appointment-cancel-submit">确认取消</button>
                      </div>
                    </div>`
                  : `<button class="text-link text-link--danger record-cancel" type="button"
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

  function openDemandCreate() {
    if (!state.session) {
      startLogin({ type: "demand" });
      return;
    }
    const hospital = nearestHospital();
    const region = normalizeRegion(
      state.session.province || "北京市",
      state.session.city || "北京市"
    );
    state.overlay = {
      type: "demand-create",
      draft: {
        hospitalId: hospital?.id || "pkuih",
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
            <div class="field">
              <label>目标医院</label>
              <select data-demand-field="hospitalId">
                ${state.hospitals
                  .map(
                    (hospital) =>
                      `<option value="${esc(hospital.id)}" ${
                        draft.hospitalId === hospital.id ? "selected" : ""
                      }>${esc(hospital.name)}</option>`
                  )
                  .join("")}
              </select>
            </div>
            <div class="field">
              <label>服务类型</label>
              <div class="choice-grid choice-grid--three">
                ${SERVICE_IDS.map(
                  (id) =>
                    `<button class="choice-tile ${
                      draft.serviceType === id ? "is-active" : ""
                    }" type="button" data-action="demand-service" data-value="${esc(id)}">${esc(id)}</button>`
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
            <div class="field">
              <label>活动省市</label>
              <div class="field-row">
                <select data-demand-province>${renderProvinceOptions(draft.province)}</select>
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
    if (!draft.topic.trim()) return showToast("请填写需求主题。");
    if (!draft.contactName.trim()) return showToast("请填写联系人。");
    if (draft.contactPhone && !/^1\d{10}$/.test(draft.contactPhone)) {
      return showToast("联系电话格式不正确。");
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
      hospitalId: draft.hospitalId,
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
    state.overlay = null;
    releaseOverlayHistory();
    state.clientRecordTab = "demands";
    state.tab = "appointments";
    renderApp({ scrollTo: 0 });
    showToast("提需已提交，医院运营会尽快电话联系。");
  }

  function renderDemandSheet() {
    const demand = demandById(state.overlay?.demandId);
    if (!demand) return "";
    const hospital = hospitalById(demand.hospitalId);
    const meta = DEMAND_STATUS[demand.status] || DEMAND_STATUS.pending;
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
                <span class="record-head__tag">${esc(demand.serviceType)} · ${esc(
                  hospital?.name || ""
                )}</span>
                <h1>${esc(demand.topic)}</h1>
                <p>${esc(demand.audience || "参与人群待沟通")} · ${esc(
                  demand.headcount ? demand.headcount + " 人" : "人数待确认"
                )}</p>
              </div>
              <span class="status-pill ${meta.cls}">${esc(meta.label)}</span>
            </div>
            <section class="info-card">
              <div class="info-row"><span>目标医院</span><strong>${esc(hospital?.name || "")}</strong></div>
              <div class="info-row"><span>期望日期</span><strong>${esc(
                demand.preferredDate ? formatDateCN(demand.preferredDate, true) : "待沟通"
              )}</strong></div>
              <div class="info-row"><span>活动地区</span><strong>${esc(
                regionText(demand.province, demand.city)
              )}</strong></div>
              <div class="info-row"><span>联系人</span><strong>${esc(
                demand.contactName
              )} · ${phoneLink(demand.phone, demand.phone)}</strong></div>
              <div class="info-row"><span>院方对接人</span><strong>${assigneeMarkup(
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
                ? `<section class="feedback-card"><span>院方沟通记录</span>${demand.followUps
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
            demand.assignedStaff
              ? `<a class="btn btn--ghost" href="${esc(
                  phoneHref(demand.assignedStaff.phone)
                )}">${icon("phone", 15)} 联系院方</a>`
              : `<button class="btn btn--ghost" type="button" data-action="close-overlay">返回</button>`
          }
          <button class="btn btn--primary" type="button" data-action="close-overlay">关闭</button>
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
    const hospital = nearestHospital(session);
    return `
      <div class="screen me-screen">
        <header class="page-head page-head--tight">
          <span class="eyebrow"><i></i> My Account</span>
          <h1>我的</h1>
        </header>
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
            )} 编辑</button>
          </div>
          <a class="profile-hero__phone" href="${esc(phoneHref(session.contactPhone || session.phone))}">
            ${icon("phone", 15)}
            <strong>${esc(session.contactPhone || session.phone)}</strong>
            <span>点击拨打</span>
          </a>
          <div class="profile-hero__meta">
            <div><small>所在地区</small><strong>${esc(session.province || "")} ${esc(
              session.city || ""
            )}</strong></div>
            <div><small>就近医院</small><strong>${esc(hospital?.short || "")}</strong></div>
          </div>
        </section>
        <div class="me-stats">
          <button type="button" data-action="tab" data-tab="appointments">
            <strong>${appointments.length}</strong><span>活动预约</span>
          </button>
          <button type="button" data-action="me-demands">
            <strong>${demands.length}</strong><span>专家提需</span>
          </button>
          <button type="button" data-action="open-booking">
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
            <span><strong>企业资料</strong><small>姓名、单位、联系方式与所在城市</small></span>
            ${icon("chevronRight", 15)}
          </button>
          <a href="${esc(phoneHref("400-000-0000"))}">
            <span class="me-menu__icon">${icon("phone", 17)}</span>
            <span><strong>服务咨询</strong><small>工作日 9:00–18:00</small></span>
            ${icon("chevronRight", 15)}
          </a>
        </section>
        <button class="btn btn--ghost btn--block me-logout" type="button" data-action="logout">
          ${icon("logout", 15)} 退出登录
        </button>
        <p class="source-note">登录状态会保存在当前浏览器，下次打开自动进入。演示环境不发送真实短信。</p>
      </div>
    `;
  }

  function renderProfileSheet() {
    const draft = state.profileDraft || { ...state.session };
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
            <div class="field-row">
              <div class="field"><label>姓名</label>
                <input type="text" data-profile-field="name" value="${esc(draft.name)}">
              </div>
              <div class="field"><label>职务</label>
                <input type="text" data-profile-field="title" value="${esc(draft.title || "")}">
              </div>
            </div>
            <div class="field"><label>单位名称</label>
              <input type="text" data-profile-field="orgName" value="${esc(draft.orgName)}">
            </div>
            <div class="field"><label>机构类型</label>
              <select data-profile-field="orgType">
                ${["保险公司", "企业", "其他机构"]
                  .map(
                    (type) =>
                      `<option value="${type}" ${
                        draft.orgType === type ? "selected" : ""
                      }>${type}</option>`
                  )
                  .join("")}
              </select>
            </div>
            <div class="field"><label>联系方式 <span>默认手机号，可修改</span></label>
              <input type="tel" inputmode="numeric" maxlength="11" data-profile-field="contactPhone" value="${esc(
                draft.contactPhone || draft.phone
              )}">
            </div>
            <div class="field"><label>所在省市 <span>用于优先展示就近医院</span></label>
              <div class="field-row">
                <select data-profile-province>${renderProvinceOptions(draft.province)}</select>
                <select data-profile-city>${renderCityOptions(draft.province, draft.city)}</select>
              </div>
            </div>
            <p class="field-help">修改所在城市后，专家库与预约会优先展示对应医院的专家。</p>
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
    if (!draft.name?.trim()) return showToast("请填写姓名。");
    if (!draft.orgName?.trim()) return showToast("请填写单位名称。");
    if (draft.contactPhone && !/^1\d{10}$/.test(draft.contactPhone)) {
      return showToast("联系方式格式不正确。");
    }
    const region = normalizeRegion(draft.province, draft.city);
    const saved = upsertUser({
      ...state.session,
      ...draft,
      phone: state.session.phone,
      contactPhone: draft.contactPhone || state.session.phone,
      province: region.province,
      city: region.city
    });
    setSession(saved);
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
    showToast(`已进入${ROLE[account.role]?.label || "院方"}工作台。`);
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
    return adminAppointments().filter((item) => item.status === "pending").length;
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
      { id: "marketing", label: "展业", icon: "send" },
      { id: "sms", label: "短信", icon: "message" }
    ];
    if (isSuperadmin()) {
      tabs.splice(4, 0, { id: "hospitals", label: "医院账号", icon: "building" });
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
              : state.adminTab === "hospitals"
              ? renderAdminHospitalsPage()
              : state.adminTab === "marketing"
              ? renderMarketingPage()
              : state.adminTab === "sms"
              ? renderAdminSmsPage()
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
    return `
      <article class="admin-record" role="button" tabindex="0" data-action="open-admin-appointment"
        data-appointment-id="${esc(appointment.id)}">
        <div class="admin-record__top">
          ${statusPill(appointment.status)}
          <span>${esc(formatDateCN(appointment.date, true))}</span>
        </div>
        <h3>${esc(topicOf(appointment))}</h3>
        <div class="admin-record__tags">
          <span>${esc(appointment.serviceType)}</span>
          <span>${esc(hospital?.short || "")}</span>
          <span>${esc(expert ? expert.name : appointment.doctorName || "待匹配专家")}</span>
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

  function acceptAppointment(username = "") {
    const appointment = appointmentById(state.adminReviewId);
    if (!appointment) return;
    if (appointment.assignedStaff) {
      showToast("该预约已有项目对接人。");
      return;
    }
    let account = state.adminUser;
    if (username) {
      account = getAdminAccounts().find((item) => item.username === username && item.active);
    }
    if (!account) return showToast("请选择项目对接人。");
    if (
      account.role === "operator" &&
      account.hospitalId !== appointment.hospitalId &&
      !isSuperadmin()
    ) {
      return showToast("只能接本院预约。");
    }
    const now = new Date().toISOString();
    const updated = updateAppointment(appointment.id, {
      status: appointment.status === "pending" ? "planning" : appointment.status,
      assignedStaff: staffSnapshot(account),
      acceptedAt: appointment.acceptedAt || now
    });
    state.adminDraft = buildReviewDraft(updated);
    renderOverlay();
    showToast(`已接单，项目对接人为 ${account.name}。`);
  }

  function reassignAppointment(username) {
    if (!isSuperadmin()) return;
    const appointment = appointmentById(state.adminReviewId);
    const account = getAdminAccounts().find((item) => item.username === username && item.active);
    if (!appointment || !account) return;
    const updated = updateAppointment(appointment.id, {
      assignedStaff: staffSnapshot(account),
      acceptedAt: appointment.acceptedAt || new Date().toISOString()
    });
    state.adminDraft = buildReviewDraft(updated);
    renderOverlay();
    showToast(`项目对接人已调整为 ${account.name}。`);
  }

  function buildReviewDraft(appointment) {
    const expert = appointment.doctorId ? expertById(appointment.doctorId) : null;
    const staff = appointmentAssignee(appointment);
    const plan = appointment.plan || {};
    const region = normalizeRegion(
      plan.province || appointment.province || "北京市",
      plan.city || appointment.city || "北京市"
    );
    return {
      topic: plan.topic || topicOf(appointment),
      serviceType: plan.serviceType || appointment.serviceType || "讲座",
      speakerId: plan.speakerId || expert?.id || "",
      speaker: plan.speaker || (expert ? `${expert.name} · ${expert.deptTitle}` : ""),
      date: plan.date || appointment.date || "",
      time: plan.time || "14:00-16:00",
      province: region.province,
      city: region.city,
      venue: plan.venue || appointment.venue || "",
      address: plan.address || appointment.address || "",
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
      internalNote: appointment.internalNote || ""
    };
  }

  function collectReviewFields() {
    const fields = {};
    document.querySelectorAll("[data-review-field]").forEach((input) => {
      fields[input.dataset.reviewField] = input.value.trim();
    });
    return fields;
  }

  function saveReview() {
    const appointment = appointmentById(state.adminReviewId);
    if (!appointment) return;
    if (!appointment.assignedStaff) return showToast("请先接单并确定项目对接人。");
    const fields = collectReviewFields();
    if (!fields.topic) return showToast("请填写活动主题。");
    if (!fields.date) return showToast("请选择活动日期。");
    if (!fields.address) return showToast("请填写活动详细地址。");
    const staff = appointmentAssignee(appointment);
    const speakerExpert = fields.speakerId ? expertById(fields.speakerId) : null;
    const region = normalizeRegion(fields.province, fields.city);
    const plan = {
      topic: fields.topic,
      serviceType: fields.serviceType || appointment.serviceType,
      speakerId: fields.speakerId || "",
      speaker: speakerExpert
        ? `${speakerExpert.name} · ${speakerExpert.deptTitle}`
        : fields.speaker || "",
      date: fields.date,
      time: fields.time || "",
      province: region.province,
      city: region.city,
      venue: fields.venue || "",
      address: fields.address,
      outline: fields.outline || "",
      agenda: fields.agenda || "",
      team: fields.team || "",
      message: fields.message || "",
      contact: staff ? `${staff.name} · ${staff.phone}` : "",
      updatedAt: new Date().toISOString()
    };
    const wasConfirmed = appointment.status === "confirmed" || appointment.status === "completed";
    updateAppointment(appointment.id, {
      status: "review",
      plan,
      planHistory: (appointment.planHistory || []).concat(
        appointment.plan ? [{ ...appointment.plan, replacedAt: new Date().toISOString() }] : []
      ),
      feedback: "",
      feedbackAt: "",
      province: plan.province,
      city: plan.city,
      venue: plan.venue,
      address: plan.address,
      planSentAt: new Date().toISOString()
    });
    state.adminReviewId = "";
    state.adminDraft = null;
    releaseOverlayHistory();
    clearOverlayState();
    renderApp();
    showToast(
      wasConfirmed
        ? "方案已更新并发送，机构需重新确认。"
        : "方案已发送给机构，等待确认。"
    );
  }

  function completeAppointment() {
    const appointment = appointmentById(state.adminReviewId);
    if (!appointment) return;
    if (appointment.status !== "confirmed") {
      return showToast("机构确认方案后才能标记活动完成。");
    }
    updateAppointment(appointment.id, {
      status: "completed",
      completedAt: new Date().toISOString()
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
    const input = document.querySelector("[data-internal-note]");
    const note = input?.value.trim() || "";
    updateAppointment(appointment.id, {
      internalNote: note,
      internalNoteAt: new Date().toISOString(),
      internalNoteBy: state.adminUser ? state.adminUser.name : ""
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
    const canEdit = Boolean(assignee);
    const operators = isSuperadmin() ? hospitalOperators(appointment.hospitalId) : [];
    const smsLog = getSmsLogs()[appointment.id];
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
                <div class="info-row"><span>期望主题</span><strong>${esc(
                  appointment.topic || "未填写，可结合时令推荐"
                )}</strong></div>
                <div class="info-row"><span>期望日期</span><strong>${esc(
                  formatDateCN(appointment.date, true)
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
                  ? `<div class="feedback-card"><span>机构修改意见</span><p>${esc(
                      appointment.feedback
                    )}</p><small>${esc(formatDateTime(appointment.feedbackAt))}</small></div>`
                  : ""
              }
            </div>
            ${
              !assignee
                ? `<section class="assignment-card">
                    <span class="assignment-card__eyebrow">下一步 · 接单</span>
                    <h3>由谁负责这个项目？</h3>
                    <p>接单后，项目人员姓名 ${esc(state.adminUser?.name || "")} 与手机号 ${phoneLink(
                      state.adminUser?.phone || "",
                      state.adminUser?.phone || ""
                    )} 会自动带入方案与机构联系人。机构端在接单后才会显示具体项目对接人。</p>
                    ${
                      isSuperadmin()
                        ? `<div class="field">
                            <label>指派医院运营</label>
                            <select data-assignee-select>
                              <option value="">选择本院运营人员</option>
                              ${operators
                                .map(
                                  (account) =>
                                    `<option value="${esc(account.username)}">${esc(
                                      account.name
                                    )} · ${esc(account.phone)}</option>`
                                )
                                .join("")}
                            </select>
                            ${
                              operators.length
                                ? ""
                                : `<span class="field-help">该医院尚未分配运营人员，请先在“医院账号”中配置。</span>`
                            }
                          </div>`
                        : ""
                    }
                    <button class="btn btn--primary btn--block" type="button" data-action="review-accept">
                      ${icon("user", 15)} ${
                        isSuperadmin() ? "接单并分配" : "接单并分配给我"
                      }
                    </button>
                  </section>`
                : `
                  <section class="assignee-panel">
                    <div class="assignee-panel__person">
                      <span>${esc(initialOf(assignee.name))}</span>
                      <div><small>项目对接人</small><strong>${esc(assignee.name)}</strong>
                        <p>${phoneLink(assignee.phone, assignee.phone)}</p></div>
                    </div>
                    ${
                      isSuperadmin()
                        ? `<select data-review-reassign>
                            ${operators
                              .map(
                                (account) =>
                                  `<option value="${esc(account.username)}" ${
                                    account.username === assignee.username ? "selected" : ""
                                  }>${esc(account.name)} · ${esc(account.phone)}</option>`
                              )
                              .join("")}
                          </select>`
                        : `<span class="assignee-panel__locked">${icon("lock", 11)} 超管可调整</span>`
                    }
                  </section>
                `
            }
            ${
              canEdit
                ? `<section class="review-form">
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
                          <select data-review-field="serviceType">
                            ${SERVICE_IDS.map(
                              (id) =>
                                `<option value="${esc(id)}" ${
                                  draft.serviceType === id ? "selected" : ""
                                }>${esc(id)}</option>`
                            ).join("")}
                          </select>
                        </div>
                        <div class="field"><label>出讲专家</label>
                          <select data-review-field="speakerId" data-review-speaker>
                            <option value="">院方安排 / 待定</option>
                            ${state.experts
                              .filter((item) => item.hospitalId === appointment.hospitalId && item.active)
                              .map(
                                (item) =>
                                  `<option value="${esc(item.id)}" ${
                                    draft.speakerId === item.id ? "selected" : ""
                                  }>${esc(item.name)} · ${esc(item.deptTitle)}</option>`
                              )
                              .join("")}
                          </select>
                        </div>
                      </div>
                      <div class="field-row">
                        <div class="field"><label>活动日期</label>
                          <input type="date" data-review-field="date" value="${esc(draft.date)}"
                            min="${todayIso()}">
                        </div>
                        <div class="field"><label>活动时间</label>
                          <input type="text" data-review-field="time" value="${esc(
                            draft.time
                          )}" placeholder="如：14:00-16:00">
                        </div>
                      </div>
                      <div class="field-row">
                        <div class="field"><label>省份</label>
                          <select data-review-field="province" data-review-province>${renderProvinceOptions(
                            draft.province
                          )}</select>
                        </div>
                        <div class="field"><label>城市</label>
                          <select data-review-field="city" data-review-city>${renderCityOptions(
                            draft.province,
                            draft.city
                          )}</select>
                        </div>
                      </div>
                      <div class="field"><label>场地名称</label>
                        <input type="text" data-review-field="venue" value="${esc(
                          draft.venue
                        )}" placeholder="如：总部大楼 3 层报告厅">
                      </div>
                      <div class="field"><label>详细地址</label>
                        <input type="text" data-review-field="address" value="${esc(
                          draft.address
                        )}" placeholder="请输入活动详细地址">
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
                    </div>
                    <div class="internal-note">
                      <div class="internal-note__head">
                        <h3>${icon("lock", 13)} 内部备注</h3>
                        <span>仅院方可见</span>
                      </div>
                      ${
                        state.adminNoteEditing
                          ? `<textarea data-internal-note>${esc(appointment.internalNote || "")}</textarea>
                             <div class="internal-note__actions">
                               <button class="btn btn--ghost btn--sm" type="button" data-action="review-note-cancel">取消</button>
                               <button class="btn btn--primary btn--sm" type="button" data-action="review-note-save">保存备注</button>
                             </div>`
                          : `<p>${esc(appointment.internalNote || "暂无内部备注，可记录沟通情况、资源协调或风险点。")}</p>
                             <button class="text-link" type="button" data-action="review-note-edit">${
                               appointment.internalNote ? "编辑备注" : "添加备注"
                             } ${icon("chevronRight", 12)}</button>`
                      }
                    </div>
                    ${
                      appointment.status === "confirmed"
                        ? `<div class="admin-action-card">
                            <h3>活动执行完成？</h3>
                            <p>机构已确认方案。活动结束后可标记完成，进入历史归档。</p>
                            <button class="btn btn--soft btn--sm" type="button" data-action="review-complete">标记活动完成</button>
                          </div>`
                        : ""
                    }
                    ${
                      appointment.status === "confirmed" || appointment.status === "completed"
                        ? `<section class="sms-card">
                            <div class="sms-card__head">
                              <h3>${icon("message", 14)} 客户短信提醒</h3>
                              <span>${smsLog ? "已复制，视为已发送" : "尚未发送"}</span>
                            </div>
                            <p>${esc(buildSmsText(appointment))}</p>
                            <button class="btn btn--ghost btn--sm" type="button" data-action="review-sms-copy">
                              ${icon("phone", 13)} 复制号码和短信内容
                            </button>
                          </section>`
                        : ""
                    }
                  </section>`
                : ""
            }
          </div>
        </div>
        <div class="sheet__footer">
          <button class="btn btn--ghost" type="button" data-action="close-overlay">关闭</button>
          ${
            canEdit
              ? `<button class="btn btn--primary" type="button" data-action="review-save">
                  保存方案并发送 ${icon("send", 14)}
                </button>`
              : `<button class="btn btn--primary" type="button" data-action="review-accept">
                  ${isSuperadmin() ? "接单并分配" : "接单"}
                </button>`
          }
        </div>
      </section>
    `;
  }

  function buildSmsText(appointment) {
    const plan = appointment.plan || {};
    const staff = appointment.assignedStaff;
    return `【北京大学国际医院】${appointment.contactName}您好，您预约的${formatDateCN(
      plan.date || appointment.date
    )} ${plan.time || ""}「${plan.topic || topicOf(appointment)}」活动已确认。地点：${formatAddress(
      plan.province || appointment.province,
      plan.city || appointment.city,
      plan.address || appointment.address,
      plan.venue || appointment.venue
    )}。项目对接人：${
      staff ? staff.name + " " + staff.phone : "院方项目组"
    }。请提前安排，如需调整请联系项目对接人。`;
  }

  async function copySmsForAppointment(button) {
    const appointment = appointmentById(state.adminReviewId || button.dataset.appointmentId);
    if (!appointment) return;
    const text = buildSmsText(appointment);
    const payload = `${appointment.phone}\n${text}`;
    const copied = await copyText(payload);
    if (!copied) return showToast("复制失败，请手动复制。");
    saveSmsLog(appointment.id, {
      copiedAt: new Date().toISOString(),
      copiedBy: state.adminUser ? { name: state.adminUser.name, username: state.adminUser.username } : null
    });
    showToast("号码和短信内容已复制，可打开短信应用发送。");
    if (state.overlay?.type === "admin-review") renderOverlay();
    else renderApp();
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
    const hospital = hospitalById(demand.hospitalId);
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
          <span>${esc(demand.serviceType)}</span>
          <span>${esc(hospital?.short || "")}</span>
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
      ${
        list.length
          ? `<div class="admin-record-list">${list.map(renderAdminDemandCard).join("")}</div>`
          : `<div class="empty-state"><span class="empty-state__icon">${icon(
              "sparkles",
              26
            )}</span><h3>暂无提需</h3><p>机构提交提需后会出现在这里。</p></div>`
      }
    `;
  }

  function renderAdminDemandSheet() {
    const demand = demandById(state.adminDemandId);
    if (!demand) return "";
    const hospital = hospitalById(demand.hospitalId);
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
                <span class="record-head__tag">${esc(demand.serviceType)} · ${esc(
                  hospital?.name || ""
                )}</span>
                <h1>${esc(demand.topic)}</h1>
                <p>${esc(demand.audience || "人群待沟通")} · ${esc(
                  demand.headcount ? demand.headcount + " 人" : "人数待确认"
                )}</p>
              </div>
              <span class="status-pill ${meta.cls}">${esc(meta.label)}</span>
            </div>
            <section class="info-card">
              <div class="info-row"><span>机构</span><strong>${esc(demand.orgName)}</strong></div>
              <div class="info-row"><span>联系人</span><strong>${esc(
                demand.contactName
              )} · ${phoneLink(demand.phone, demand.phone)}</strong></div>
              <div class="info-row"><span>期望日期</span><strong>${esc(
                demand.preferredDate ? formatDateCN(demand.preferredDate, true) : "待沟通"
              )}</strong></div>
              <div class="info-row"><span>活动地区</span><strong>${esc(
                regionText(demand.province, demand.city)
              )}</strong></div>
              <div class="info-row"><span>院方对接人</span><strong>${assigneeMarkup(
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
              <div class="followup-card__actions">
                <button class="btn btn--ghost btn--sm" type="button" data-action="admin-demand-followup">保存沟通记录</button>
                <button class="btn btn--primary btn--sm" type="button" data-action="admin-demand-match">标记已匹配</button>
              </div>
            </section>
            <div class="sheet-actions-row">
              <a class="btn btn--soft" href="${esc(phoneHref(demand.phone))}">${icon(
                "phone",
                14
              )} 拨打电话</a>
              <button class="btn btn--ghost" type="button" data-action="admin-demand-contact">
                标记已联系
              </button>
            </div>
            ${
              demand.status !== "closed"
                ? `<button class="text-link text-link--danger record-cancel" type="button"
                    data-action="admin-demand-close">关闭该需求</button>`
                : ""
            }
          </div>
        </div>
        <div class="sheet__footer">
          <button class="btn btn--ghost" type="button" data-action="close-overlay">关闭</button>
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
    const followUps = (demand.followUps || []).slice();
    if (note) {
      followUps.push({
        note,
        at: new Date().toISOString(),
        by: { name: state.adminUser.name, username: state.adminUser.username }
      });
    }
    updateDemand(demand.id, {
      status: demand.status === "pending" ? "contacted" : demand.status,
      assignedStaff: demand.assignedStaff || staffSnapshot(state.adminUser),
      contactedAt: demand.contactedAt || new Date().toISOString(),
      followUps
    });
    renderOverlay();
    showToast(note ? "沟通记录已保存。" : "已标记为已联系。");
  }

  function adminDemandMatch() {
    const demand = demandById(state.adminDemandId);
    if (!demand) return;
    updateDemand(demand.id, {
      status: "matched",
      assignedStaff: demand.assignedStaff || staffSnapshot(state.adminUser),
      matchedAt: new Date().toISOString()
    });
    renderOverlay();
    showToast("需求已标记为已匹配。");
  }

  function adminDemandClose() {
    const demand = demandById(state.adminDemandId);
    if (!demand) return;
    updateDemand(demand.id, { status: "closed", closedAt: new Date().toISOString() });
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
    return state.experts
      .filter((expert) => {
        if (!expert.active) return false;
        if (hospital && expert.hospitalId !== hospital.id) return false;
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
    if (!state.slotMonth) {
      const now = new Date();
      state.slotMonth = `${now.getFullYear()}-${pad(now.getMonth() + 1)}`;
    }
    if (!state.slotDraft) state.slotDraft = {};
    const batch = state.slotBatch || {};
    if (!batch.from) batch.from = todayIso();
    if (!batch.to) batch.to = isoDate(addDays(startOfDay(), 30));
    state.slotBatch = batch;
    return doctors.find((item) => item.id === state.slotDoctorId) || doctors[0];
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

  function renderSlotCalendar(doctor) {
    const [year, month] = state.slotMonth.split("-").map(Number);
    const first = new Date(year, month - 1, 1, 12);
    const days = new Date(year, month, 0, 12).getDate();
    const startBlank = first.getDay();
    const today = todayIso();
    const cells = [];
    for (let i = 0; i < startBlank; i += 1) cells.push(`<span class="slot-cell is-blank"></span>`);
    for (let day = 1; day <= days; day += 1) {
      const date = `${year}-${pad(month)}-${pad(day)}`;
      const value = draftSlot(doctor.id, date);
      const booked = bookedCount(doctor.id, date);
      const isPast = date < today;
      const changed = value !== baseSlot(doctor.id, date);
      cells.push(`
        <button class="slot-cell ${value ? "has-capacity" : "is-off"} ${
          date === today ? "is-today" : ""
        } ${isPast ? "is-past" : ""} ${changed ? "is-changed" : ""}" type="button"
          data-action="slot-day-open" data-value="${date}" ${isPast ? "disabled" : ""}>
          <span class="slot-cell__day">${day}</span>
          <strong>${value ? value : "—"}</strong>
          <small>${booked ? `已约 ${booked}` : "可约"}</small>
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
      <p class="slot-legend"><i class="is-open"></i> 可配置 <i class="is-full"></i> 已有预约 <i class="is-changed"></i> 本次修改</p>
    `;
  }

  function renderSlotBatchCard(doctor) {
    const batch = state.slotBatch;
    return `
      <section class="batch-card">
        <div class="batch-card__head">
          <h3>${icon("sparkles", 15)} 批量快捷设置</h3>
          <span>按日期范围统一设置每日号源</span>
        </div>
        <div class="batch-card__presets">
          <button type="button" data-action="slot-preset" data-value="14">未来 14 天</button>
          <button type="button" data-action="slot-preset" data-value="30">未来 30 天</button>
          <button type="button" data-action="slot-preset" data-value="60">未来 60 天</button>
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
          <label>应用星期</label>
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
          <div class="field"><label>每日号源数</label>
            <input type="number" inputmode="numeric" min="0" max="30" data-slot-batch="capacity" value="${esc(
              batch.capacity
            )}">
          </div>
          <div class="field"><label>应用范围</label>
            <select data-slot-batch="scope">
              <option value="one" ${batch.scope === "one" ? "selected" : ""}>当前专家</option>
              <option value="hospital" ${batch.scope === "hospital" ? "selected" : ""}>本院全部专家</option>
            </select>
          </div>
        </div>
        <button class="btn btn--soft btn--block" type="button" data-action="slot-batch-apply">
          应用到草稿（不立即保存）
        </button>
        <p class="batch-card__hint">不会低于已预约数量；配置完成后点击底部“统一保存”生效。</p>
      </section>
    `;
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
      <div class="slot-doctor-card">
        <img src="${esc(expertAvatar(doctor))}" alt="${esc(doctor.name)}">
        <div>
          <strong>${esc(doctor.name)} · ${esc(tierOf(doctor).short)}</strong>
          <span>${esc(doctor.hospital)} · ${esc(doctor.deptTitle)}</span>
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
      ${renderSlotMonthNav()}
      ${renderSlotCalendar(doctor)}
      ${renderSlotBatchCard(doctor)}
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
    const staff = state.adminUser;
    return `
      <div class="admin-page-head">
        <div><h1>号源配置</h1><p>按天配置，不划分时间段</p></div>
        <span class="admin-page-head__date">${esc(adminHospitalName())}</span>
      </div>
      ${renderAdminTabs()}
      ${renderAdminHospitalFilter()}
      ${
        isSuperadmin() && !state.adminHospitalId
          ? `<p class="admin-hint">${icon(
              "alert",
              12
            )} 当前为全部医院视图。批量设置会作用于全部医院专家，建议先选择具体医院。</p>`
          : ""
      }
      <div id="slot-content" class="slot-content"></div>
      <div id="slot-savebar" class="slot-savebar"></div>
    `;
  }

  function openSlotDay(dateIso) {
    const doctor = selectedSlotDoctor();
    if (!doctor) return;
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

  function applySlotBatch() {
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
    doctors.forEach((item) => {
      let date = parseDate(batch.from);
      const end = parseDate(batch.to);
      while (date && end && date <= end) {
        if (batch.weekdays.includes(date.getDay())) {
          const iso = isoDate(date);
          const booked = bookedCount(item.id, iso);
          const value = Math.max(capacity, booked);
          if (value !== capacity) adjusted += 1;
          setDraftSlot(item.id, iso, value);
          applied += 1;
        }
        date = addDays(date, 1);
      }
    });
    renderSlotConfigContent();
    showToast(
      `已应用到草稿：${applied} 个日期${adjusted ? `，${adjusted} 天因已有预约自动抬高` : ""}。`
    );
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
    showToast("号源已统一保存。");
  }

  function resetSlotDraft() {
    state.slotDraft = {};
    renderSlotConfigContent();
    showToast("未保存的修改已重置。");
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
    "骨科",
    "康复科",
    "中医科",
    "心理",
    "睡眠",
    "神经内科",
    "急诊急救",
    "皮肤医美",
    "妇科",
    "儿科",
    "其他"
  ];

  function adminDoctorList() {
    const hospital = slotHospital();
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
              expert.active === false ? "已下架" : "已上架"
            }</span>
          </span>
          <span class="doctor-admin-card__role">${esc(expert.deptTitle)} · ${esc(expert.dept)}</span>
          <span class="doctor-admin-card__hospital">${esc(expert.hospital)}</span>
          <span class="doctor-admin-card__services">${(expert.services || [])
            .map((service) => `<span>${esc(service)}</span>`)
            .join("")}<i>${esc(expert.leadLabel)}</i></span>
        </span>
        <span class="doctor-admin-card__edit">${icon("edit", 13)}</span>
      </button>
    `;
  }

  function renderDoctorAdminPage() {
    const list = adminDoctorList();
    return `
      <div class="admin-page-head">
        <div><h1>专家配置</h1><p>维护本院专家资料、服务类型与预约周期</p></div>
        <button class="btn btn--primary btn--sm" type="button" data-action="admin-doctor-add">
          ${icon("plus", 14)} 新增专家
        </button>
      </div>
      ${renderAdminTabs()}
      ${renderAdminHospitalFilter()}
      <div class="admin-search">
        ${icon("search", 15)}
        <input type="search" placeholder="搜索姓名、科室或擅长方向" value="${esc(
          state.adminDoctorSearch || ""
        )}" data-admin-doctor-search>
      </div>
      <p class="admin-hint">${icon(
        "alert",
        12
      )} 专家字段参考院方整理表：姓名、履约机构、科室/任职、科室方向、服务类型、履约地、擅长、简介、预约提前期。没有照片时使用分性别默认医疗头像。</p>
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
    `;
  }

  function emptyDoctorDraft() {
    const hospital = slotHospital() || state.hospitals[0];
    return {
      id: "",
      custom: true,
      name: "",
      gender: "male",
      senior: false,
      tier: "specialist",
      hospitalId: hospital?.id || "pkuih",
      hospital: hospital?.name || "",
      deptTitle: "",
      dept: "内科",
      services: ["讲座", "1对1"],
      coverage: "全国",
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
    const expert = id ? expertById(id) : null;
    state.adminDoctorDraft = expert ? clone(expert) : emptyDoctorDraft();
    state.overlay = { type: "admin-doctor" };
    renderOverlay();
  }

  function renderAdminDoctorSheet() {
    const draft = state.adminDoctorDraft;
    if (!draft) return "";
    const isNew = !draft.id;
    const avatar = draft.photoCard || draft.photo || (draft.gender === "female"
      ? draft.senior
        ? AVATARS.femaleSenior
        : AVATARS.female
      : draft.senior
      ? AVATARS.maleSenior
      : AVATARS.male);
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
                  <option value="male" ${draft.gender === "male" ? "selected" : ""}>男</option>
                  <option value="female" ${draft.gender === "female" ? "selected" : ""}>女</option>
                </select>
              </div>
            </div>
            <div class="field-row">
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
              <div class="field"><label>预约提前期（天）</label>
                <input type="number" min="1" max="90" data-doctor-field="leadDays" value="${esc(
                  draft.leadDays
                )}">
              </div>
            </div>
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
            <div class="field"><label>科室 / 任职 <em>*</em></label>
              <input type="text" data-doctor-field="deptTitle" value="${esc(
                draft.deptTitle
              )}" placeholder="如：心血管内科主任医师">
            </div>
            <div class="field-row">
              <div class="field"><label>科室方向</label>
                <select data-doctor-field="dept">
                  ${DEPT_OPTIONS.map(
                    (dept) =>
                      `<option value="${dept}" ${draft.dept === dept ? "selected" : ""}>${dept}</option>`
                  ).join("")}
                </select>
              </div>
              <div class="field"><label>履约地</label>
                <input type="text" data-doctor-field="coverage" value="${esc(
                  draft.coverage
                )}" placeholder="如：全国 / 北京 / 山东省内">
              </div>
            </div>
            <div class="field"><label>服务类型</label>
              <div class="choice-grid choice-grid--three">
                ${SERVICE_IDS.map(
                  (id) =>
                    `<button class="choice-tile ${
                      draft.services?.includes(id) ? "is-active" : ""
                    }" type="button" data-action="doctor-service" data-value="${esc(id)}">${esc(id)}</button>`
                ).join("")}
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
            <label class="switch-row">
              <span><strong>上架展示</strong><small>关闭后机构端不再展示该专家</small></span>
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
    draft.leadLabel = `提前 ${draft.leadDays} 天申请`;
    return draft;
  }

  function saveAdminDoctor() {
    const draft = collectDoctorFields();
    if (!draft.name) return showToast("请填写专家姓名。");
    if (!draft.hospitalId) return showToast("请选择履约机构。");
    if (!draft.deptTitle) return showToast("请填写科室/任职。");
    if (!draft.services?.length) return showToast("请至少选择一个服务类型。");
    const config = getDoctorConfig();
    if (draft.id && !draft.custom) {
      const payload = { ...draft };
      delete payload.custom;
      config.overrides = config.overrides || {};
      config.overrides[draft.id] = payload;
    } else if (draft.id) {
      config.added = (config.added || []).map((item) =>
        item.id === draft.id ? { ...draft } : item
      );
    } else {
      const id = `custom-${Date.now()}`;
      config.added = (config.added || []).concat({
        ...draft,
        id,
        custom: true,
        photo: draft.photo || "",
        profileUrl: ""
      });
    }
    saveDoctorConfig(config);
    mergeExperts();
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
        const scale = Math.max(width / image.width, height / image.height);
        const drawW = image.width * scale;
        const drawH = image.height * scale;
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

  /* =========================================================
     Admin hospitals & accounts
     ========================================================= */
  function renderAdminHospitalsPage() {
    if (!isSuperadmin()) {
      state.adminTab = "appointments";
      return renderAdminAppointmentsPage();
    }
    const accounts = getAdminAccounts();
    return `
      <div class="admin-page-head">
        <div><h1>医院与账号</h1><p>超级管理员分配医院运营人员</p></div>
        <button class="btn btn--primary btn--sm" type="button" data-action="admin-account-add">
          ${icon("plus", 14)} 新增账号
        </button>
      </div>
      ${renderAdminTabs()}
      <div class="hospital-admin-list">
        ${state.hospitals
          .map((hospital) => {
            const operators = hospitalOperators(hospital.id);
            const expertCount = state.experts.filter(
              (item) => item.hospitalId === hospital.id && item.active
            ).length;
            const pending = getAppointments().filter(
              (item) => item.hospitalId === hospital.id && item.status === "pending"
            ).length;
            return `
              <article class="hospital-admin-card">
                <div class="hospital-admin-card__head">
                  <div><strong>${esc(hospital.name)}</strong><span>${esc(
                    regionText(hospital.province, hospital.city)
                  )}</span></div>
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
                <button class="btn btn--ghost btn--sm" type="button" data-action="admin-hospital-operator"
                  data-hospital-id="${esc(hospital.id)}">
                  ${icon("plus", 13)} 分配运营人员
                </button>
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

  function openAdminAccountEditor(username = "", hospitalId = "", role = "") {
    if (!isSuperadmin()) return;
    const account = getAdminAccounts().find((item) => item.username === username);
    state.adminAccountDraft = account
      ? { ...account, isNew: false }
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
                <input type="text" data-account-field="password" value="${esc(
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

  function marketingPosterById(id) {
    return MARKETING_POSTERS.find((item) => item.id === id) || null;
  }

  function renderMarketingPage() {
    return `
      <div class="admin-page-head">
        <div><h1>展业物料</h1><p>院方统一宣传海报，打开即可保存转发</p></div>
        <span class="admin-page-head__date">${MARKETING_POSTERS.length} 套场景</span>
      </div>
      ${renderAdminTabs()}
      <section class="marketing-hero">
        <span class="marketing-hero__badge">${icon("send", 13)} 项目展业物料库</span>
        <h2>把专业服务，变成可分享的邀请</h2>
        <p>四套海报由院方统一设计，突出名医资源、医院权威与服务价值。海报仅保留预约二维码，不展示项目人员姓名与电话。</p>
        <div class="marketing-hero__facts">
          <span><b>4</b>套场景</span><span><b>1080</b>×1920</span><span><b>1</b>个预约二维码</span>
        </div>
      </section>
      <div class="poster-list">
        ${MARKETING_POSTERS.map(
          (poster) => `
            <button class="poster-card" type="button" data-action="open-poster" data-poster-id="${esc(
              poster.id
            )}">
              <span class="poster-card__visual">
                <img src="${esc(poster.thumb)}" alt="${esc(poster.title)}" loading="eager" decoding="async">
                <i>${esc(poster.eyebrow)}</i>
              </span>
              <span class="poster-card__copy">
                <strong>${esc(poster.title)}</strong>
                <span>${esc(poster.desc)}</span>
                <span class="poster-card__tags">${poster.tags
                  .map((tag) => `<i>${esc(tag)}</i>`)
                  .join("")}</span>
                <b>查看并保存 ${icon("arrowRight", 12)}</b>
              </span>
            </button>
          `
        ).join("")}
      </div>
      <div class="marketing-guide">
        <div><span>01</span><strong>按客户场景选择</strong><p>品牌、专家、保险高客与企业价值四套海报。</p></div>
        <div><span>02</span><strong>打开高清海报</strong><p>预置静态图片，无需等待生成。</p></div>
        <div><span>03</span><strong>保存后直接发送</strong><p>微信中长按图片保存，发朋友圈或客户群。</p></div>
      </div>
    `;
  }

  function openPosterSheet(id) {
    if (!marketingPosterById(id)) return;
    state.posterId = id;
    state.overlay = { type: "poster", posterId: id };
    renderOverlay();
  }

  function renderPosterSheet() {
    const poster = marketingPosterById(state.posterId);
    if (!poster) return "";
    return `
      <div class="sheet-backdrop" data-action="close-overlay"></div>
      <section class="sheet poster-sheet" role="dialog" aria-modal="true" aria-label="海报预览">
        <div class="sheet__grabber"></div>
        <div class="sheet__bar">
          <div><h2>${esc(poster.eyebrow)}</h2><p>高清宣传海报 · 无需生成 · 打开即可保存</p></div>
          <button class="sheet__close" type="button" data-action="close-overlay" aria-label="关闭">${icon(
            "close",
            15
          )}</button>
        </div>
        <div class="sheet__body">
          <div class="poster-sheet__frame">
            <img src="${esc(poster.image)}" alt="${esc(poster.title)}" decoding="async"
              style="background-image:url('${esc(poster.thumb)}')">
          </div>
          <div class="poster-sheet__meta">
            <span>${poster.tags.map((tag) => `<i>${esc(tag)}</i>`).join("")}</span>
            <p>二维码统一指向企业健康服务平台。微信中可直接长按图片保存到相册，再发送朋友圈或客户群。</p>
          </div>
        </div>
        <div class="sheet__footer">
          <button class="btn btn--primary" type="button" data-action="save-poster">${icon(
            "checkCircle",
            15
          )} 保存高清海报</button>
          <button class="btn btn--ghost" type="button" data-action="copy-poster-link">${icon(
            "send",
            14
          )} 复制活动链接</button>
        </div>
      </section>
    `;
  }

  function saveMarketingPoster() {
    const poster = marketingPosterById(state.posterId);
    if (!poster) return;
    const anchor = document.createElement("a");
    anchor.href = poster.image;
    anchor.download = `北大医疗名医入企-${poster.id}.webp`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    showToast("高清海报已打开。若微信未自动保存，请长按预览图保存到相册。");
  }

  /* =========================================================
     Admin SMS follow-ups
     ========================================================= */
  function smsAppointments() {
    const logs = getSmsLogs();
    return adminAppointments()
      .filter((item) => item.status === "confirmed" || item.status === "completed")
      .sort((a, b) => {
        const aCopied = Boolean(logs[a.id]);
        const bCopied = Boolean(logs[b.id]);
        if (aCopied !== bCopied) return aCopied ? 1 : -1;
        return String(a.date).localeCompare(String(b.date));
      });
  }

  function renderAdminSmsPage() {
    const list = smsAppointments();
    const logs = getSmsLogs();
    const pending = list.filter((item) => !logs[item.id]).length;
    return `
      <div class="admin-page-head">
        <div><h1>短信跟进</h1><p>复制号码与模板，院方自行发送</p></div>
        <span class="admin-page-head__date">${pending} 条待发送</span>
      </div>
      ${renderAdminTabs()}
      ${renderAdminHospitalFilter()}
      <p class="admin-hint">${icon(
        "message",
        12
      )} 点击“复制号码和内容”后视为已发送；未复制的预约会持续显示为待发送。</p>
      ${
        list.length
          ? `<div class="sms-list">${list
              .map((appointment) => {
                const log = logs[appointment.id];
                return `
                  <article class="sms-item ${log ? "is-done" : ""}">
                    <div class="sms-item__top">
                      <strong>${esc(appointment.orgName)}</strong>
                      ${log ? '<span class="is-on">已复制</span>' : '<span class="is-off">待发送</span>'}
                    </div>
                    <p>${esc(topicOf(appointment))} · ${esc(
                      formatDateCN(appointment.plan?.date || appointment.date)
                    )}</p>
                    <div class="sms-item__contact">${icon("phone", 12)} ${phoneLink(
                      appointment.phone,
                      appointment.phone
                    )} · ${esc(appointment.contactName)}</div>
                    <pre>${esc(buildSmsText(appointment))}</pre>
                    <div class="sms-item__actions">
                      <button class="btn btn--ghost btn--sm" type="button" data-action="admin-sms-copy"
                        data-appointment-id="${esc(appointment.id)}">复制号码和内容</button>
                      ${
                        log
                          ? `<small>${esc(log.copiedBy?.name || "院方")} · ${esc(
                              formatDateTime(log.copiedAt)
                            )} 已复制</small>`
                          : ""
                      }
                    </div>
                  </article>
                `;
              })
              .join("")}</div>`
          : `<div class="empty-state"><span class="empty-state__icon">${icon(
              "message",
              26
            )}</span><h3>暂无待发送短信</h3><p>机构确认方案后，预约会进入短信跟进。</p></div>`
      }
    `;
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
    const hospital = nearestHospital();
    hint.innerHTML =
      state.expertScope === "nearby"
        ? `${icon("mapPin", 11)} 优先展示 ${esc(hospital?.name || "就近医院")}，可切换到全部地区`
        : `${icon("mapPin", 11)} 展示全国可预约专家，号源按各医院实时配置`;
  }

  /* =========================================================
     Events
     ========================================================= */
  function handleInput(event) {
    const target = event.target;
    if (target.matches("[data-login-field]")) {
      const field = target.dataset.loginField;
      state.login[field] = target.type === "checkbox" ? target.checked : target.value;
      return;
    }
    if (target.matches("[data-admin-login]")) {
      const field = target.dataset.adminLogin;
      state.adminLogin = state.adminLogin || { username: "", password: "", error: "" };
      state.adminLogin[field] = target.value;
      return;
    }
    if (target.matches("[data-expert-search]")) {
      state.expertSearch = target.value;
      debounceRefreshExperts();
      return;
    }
    if (target.matches("[data-booking-field]") && state.booking) {
      state.booking[target.dataset.bookingField] = target.value;
      return;
    }
    if (target.matches("[data-booking-agree]") && state.booking) {
      state.booking.agree = target.checked;
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
    if (target.matches("[data-slot-batch]")) {
      state.slotBatch[target.dataset.slotBatch] = target.value;
      return;
    }
    if (target.matches("[data-account-field]") && state.adminAccountDraft) {
      state.adminAccountDraft[target.dataset.accountField] = target.value;
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
    if (target.matches("[data-doctor-active]") && state.adminDoctorDraft) {
      state.adminDoctorDraft.active = target.checked;
    }
  }

  function handleChange(event) {
    const target = event.target;
    if (target.matches("[data-login-province]")) {
      state.login.province = target.value;
      state.login.city = (state.chinaCities?.[target.value] || [target.value])[0];
      const city = document.querySelector("[data-login-city]");
      if (city) city.innerHTML = renderCityOptions(state.login.province, state.login.city);
      return;
    }
    if (target.matches("[data-login-city]")) {
      state.login.city = target.value;
      return;
    }
    if (target.matches("[data-booking-province]") && state.booking) {
      setBookingProvince(target.value);
      return;
    }
    if (target.matches("[data-booking-city]") && state.booking) {
      state.booking.city = target.value;
      return;
    }
    if (target.matches("[data-demand-province]") && state.overlay?.draft) {
      state.overlay.draft.province = target.value;
      state.overlay.draft.city = (state.chinaCities?.[target.value] || [target.value])[0];
      const city = document.querySelector("[data-demand-city]");
      if (city) city.innerHTML = renderCityOptions(state.overlay.draft.province, state.overlay.draft.city);
      return;
    }
    if (target.matches("[data-demand-city]") && state.overlay?.draft) {
      state.overlay.draft.city = target.value;
      return;
    }
    if (target.matches("[data-profile-province]") && state.profileDraft) {
      state.profileDraft.province = target.value;
      state.profileDraft.city = (state.chinaCities?.[target.value] || [target.value])[0];
      const city = document.querySelector("[data-profile-city]");
      if (city) city.innerHTML = renderCityOptions(state.profileDraft.province, state.profileDraft.city);
      return;
    }
    if (target.matches("[data-profile-city]") && state.profileDraft) {
      state.profileDraft.city = target.value;
      return;
    }
    if (target.matches("[data-review-province]")) {
      const province = target.value;
      const city = document.querySelector("[data-review-city]");
      if (city) city.innerHTML = renderCityOptions(province, "");
      return;
    }
    if (target.matches("[data-review-speaker]") && state.adminDraft) {
      const expert = expertById(target.value);
      state.adminDraft.speakerId = target.value;
      state.adminDraft.speaker = expert ? `${expert.name} · ${expert.deptTitle}` : "";
      return;
    }
    if (target.matches("[data-admin-hospital]")) {
      state.adminHospitalId = target.value;
      state.slotDoctorId = "";
      state.slotDraft = {};
      renderApp({ scrollTo: storedScrollForView(currentViewScrollKey()) });
      return;
    }
    if (target.matches("[data-slot-doctor]")) {
      state.slotDoctorId = target.value;
      renderSlotConfigContent();
      return;
    }
    if (target.matches("[data-slot-batch='scope']")) {
      state.slotBatch.scope = target.value;
      return;
    }
    if (target.matches("[data-review-reassign]")) {
      reassignAppointment(target.value);
      return;
    }
    if (target.matches("[data-doctor-photo]")) {
      handleDoctorPhotoUpload(target.files?.[0]);
    }
  }

  const debounceRefreshExperts = debounce(refreshExpertResults, 140);
  const debounceRefreshAdminList = debounce(refreshAdminRecordList, 140);
  const debounceRefreshDoctorList = debounce(refreshAdminDoctorList, 140);

  async function handleAction(action, el) {
    switch (action) {
      case "tab": {
        storeCurrentScroll();
        if (state.overlay) {
          releaseOverlayHistory();
          clearOverlayState();
        }
        state.screen = "main";
        state.tab = el.dataset.tab || "home";
        renderApp({ scrollTo: storedScrollForView(`main:${state.tab}`) });
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
      case "login-back":
        state.login.step = 1;
        renderApp({ scrollTo: 0 });
        break;
      case "login-org-type":
        state.login.orgType = el.dataset.value;
        document.querySelectorAll('[data-action="login-org-type"]').forEach((button) => {
          button.classList.toggle("is-active", button.dataset.value === el.dataset.value);
        });
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
        renderApp({ scrollTo: 0 });
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
        renderApp({ scrollTo: currentWindowScroll() });
        break;
      case "open-admin-appointment":
        state.adminReviewId = el.dataset.appointmentId;
        state.adminDraft = null;
        state.adminNoteEditing = false;
        state.overlay = { type: "admin-review" };
        renderOverlay();
        break;
      case "open-admin-demand":
        state.adminDemandId = el.dataset.demandId;
        state.overlay = { type: "admin-demand" };
        renderOverlay();
        break;
      case "review-accept": {
        if (isSuperadmin()) {
          const select = document.querySelector("[data-assignee-select]");
          const username = select?.value || "";
          if (!username) {
            showToast(
              hospitalOperators(appointmentById(state.adminReviewId)?.hospitalId).length
                ? "请选择该医院的运营人员。"
                : "该医院尚未配置运营人员，请先在“医院账号”中分配。"
            );
            return;
          }
          acceptAppointment(username);
        } else {
          acceptAppointment();
        }
        break;
      }
      case "review-save":
        saveReview();
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
      case "admin-sms-copy":
        copySmsForAppointment(el);
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
        state.slotBatch.from = todayIso();
        state.slotBatch.to = isoDate(addDays(startOfDay(), days));
        renderSlotConfigContent();
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
      case "admin-doctor-save":
        saveAdminDoctor();
        break;
      case "admin-account-add":
        openAdminAccountEditor();
        break;
      case "open-admin-account":
        openAdminAccountEditor(el.dataset.username);
        break;
      case "admin-hospital-operator":
        openAdminAccountEditor("", el.dataset.hospitalId, "operator");
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
      case "close-overlay":
        dismissOverlay();
        break;
      case "open-booking":
        openBooking();
        break;
      case "book-doctor":
        openBooking(el.dataset.doctorId || "");
        break;
      case "open-doctor":
        openDoctorSheet(el.dataset.doctorId);
        break;
      case "doctor-month":
        if (state.overlay) {
          state.overlay.month = Number(el.dataset.value);
          renderOverlay();
        }
        break;
      case "tier-open":
        state.expertTier = el.dataset.value;
        state.expertScope = "all";
        state.tab = "experts";
        renderApp({ scrollTo: 0 });
        break;
      case "service-open":
        state.expertService = el.dataset.value;
        state.expertTier = "all";
        state.expertScope = "all";
        state.tab = "experts";
        renderApp({ scrollTo: 0 });
        break;
      case "search-topic":
        state.expertSearch = el.dataset.value;
        state.expertSearchOpen = true;
        state.expertTier = "all";
        state.expertService = "all";
        state.expertScope = "all";
        state.tab = "experts";
        renderApp({ scrollTo: 0 });
        break;
      case "expert-scope":
        state.expertScope = el.dataset.value;
        refreshExpertResults();
        refreshExpertHint();
        break;
      case "expert-tier":
        state.expertTier = el.dataset.value;
        refreshExpertResults();
        break;
      case "expert-service":
        state.expertService = el.dataset.value;
        refreshExpertResults();
        break;
      case "expert-availability":
        state.expertAvailability = el.dataset.value;
        refreshExpertResults();
        break;
      case "expert-search-toggle":
        state.expertSearchOpen = !state.expertSearchOpen;
        renderApp({ scrollTo: currentWindowScroll() });
        if (state.expertSearchOpen) {
          window.requestAnimationFrame(() => document.getElementById("expert-search")?.focus());
        }
        break;
      case "expert-search-clear":
        state.expertSearch = "";
        renderApp({ scrollTo: currentWindowScroll() });
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
      case "open-demand-detail":
        state.overlay = { type: "demand", demandId: el.dataset.demandId };
        renderOverlay();
        break;
      case "demand-cancel": {
        const id = state.overlay?.demandId;
        if (!id) return;
        updateDemand(id, { status: "cancelled", cancelledAt: new Date().toISOString() });
        state.overlay = null;
        releaseOverlayHistory();
        renderApp({ scrollTo: currentWindowScroll() });
        showToast("提需已取消。");
        break;
      }
      case "record-tab":
        state.clientRecordTab = el.dataset.value;
        renderApp({ scrollTo: currentWindowScroll() });
        break;
      case "appointment-filter":
        state.appointmentFilter = el.dataset.value;
        refreshAppointmentList();
        break;
      case "open-appointment":
        state.overlay = {
          type: "appointment",
          appointmentId: el.dataset.appointmentId,
          action: ""
        };
        renderOverlay();
        break;
      case "appointment-action":
        if (!state.overlay) return;
        state.overlay.action = el.dataset.value || "";
        renderOverlay();
        break;
      case "appointment-confirm": {
        const id = state.overlay?.appointmentId;
        if (!id) return;
        updateAppointment(id, {
          status: "confirmed",
          confirmedAt: new Date().toISOString(),
          feedback: ""
        });
        state.overlay.action = "success";
        renderOverlay();
        renderApp({ scrollTo: currentWindowScroll() });
        showToast("预约已确认，院方将按方案执行。");
        break;
      }
      case "appointment-revise-submit": {
        const id = state.overlay?.appointmentId;
        const note = document.querySelector("[data-revise-note]")?.value.trim() || "";
        if (!note) return showToast("请填写修改意见。");
        updateAppointment(id, {
          status: "revision",
          feedback: note,
          feedbackAt: new Date().toISOString()
        });
        state.overlay.action = "";
        renderOverlay();
        renderApp({ scrollTo: currentWindowScroll() });
        showToast("修改意见已提交，院方会更新方案。");
        break;
      }
      case "appointment-cancel-submit": {
        const id = state.overlay?.appointmentId;
        if (!id) return;
        updateAppointment(id, { status: "cancelled", cancelledAt: new Date().toISOString() });
        state.overlay = null;
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
      case "logout":
        clearSession();
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
      case "booking-date":
        setBookingDate(el.dataset.value);
        break;
      case "booking-topic": {
        if (!state.booking) return;
        const value = el.dataset.value;
        state.booking.customTopic = state.booking.customTopic === value ? "" : value;
        document.querySelectorAll('[data-action="booking-topic"]').forEach((button) => {
          button.classList.toggle("is-active", button.dataset.value === state.booking.customTopic);
        });
        const input = document.querySelector('[data-booking-field="customTopic"]');
        if (input) input.value = state.booking.customTopic;
        break;
      }
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
        if (!event.target.closest(".sheet__grabber, .sheet__bar, .doctor-hero__grabber")) return;
        if (event.target.closest("button, a, input, textarea, select, label")) return;
        sheetDrag = {
          sheet,
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

    window.addEventListener("popstate", () => {
      if (state.suppressPopCount > 0) {
        state.suppressPopCount -= 1;
        return;
      }
      if (state.overlay) {
        state.historyDepth = Math.max(0, state.historyDepth - 1);
        state.overlayHistoryDepth = 0;
        clearOverlayState();
        if (state.screen === "admin" || state.screen === "admin-login") renderApp();
        else renderOverlay();
        document.body.classList.remove("is-locked");
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
      if (state.historyDepth > 0) state.historyDepth = Math.max(0, state.historyDepth - 1);
    });
  }

  /* =========================================================
     Boot
     ========================================================= */
  async function boot() {
    bindEvents();
    renderApp();
    try {
      const [expertsRes, hospitalsRes, seasonalRes, matchesRes, citiesRes] = await Promise.all([
        fetch("assets/data/experts.json"),
        fetch("assets/data/hospitals.json"),
        fetch("assets/data/seasonal.json"),
        fetch("assets/data/theme-matches.json"),
        fetch("assets/china-cities.json").catch(() => null)
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
      state.hospitals = hospitals;
      state.seasonal = seasonal;
      state.themeMatches = matches;
      if (cities && typeof cities === "object" && !Array.isArray(cities)) state.chinaCities = cities;
      mergeExperts();
      seedSlots();

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
      if (user) writeJSON(STORAGE.session, user);

      const adminSession = readJSON(STORAGE.adminSession, null);
      const account = adminSession?.username
        ? getAdminAccounts().find((item) => item.username === adminSession.username && item.active)
        : null;
      if (account) {
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
      }
      renderApp({ scrollTo: 0 });
    } catch (error) {
      console.error("Failed to load application data:", error);
      state.loaded = true;
      state.loadError = error.message || "数据加载失败";
      renderApp();
    }
  }

  boot();
})();
