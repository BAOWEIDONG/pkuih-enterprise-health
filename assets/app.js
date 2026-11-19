/* =========================================================
   名医入企 · 北京大学国际医院
   Mobile-first H5 demo for WeChat
   ========================================================= */
(() => {
  "use strict";

  const STORAGE = {
    users: "pkuih_h5_users_v2",
    session: "pkuih_h5_session_v2",
    appointments: "pkuih_h5_appointments_v2",
    smsSettings: "pkuih_h5_sms_settings_v2",
    smsLogs: "pkuih_h5_sms_logs_v2",
    adminAccounts: "pkuih_h5_admin_accounts_v3",
    adminSession: "pkuih_h5_admin_session_v3",
    slotInventory: "pkuih_h5_slot_inventory_v4",
    doctorSlotInventory: "pkuih_h5_doctor_slot_inventory_v5",
    doctorConfig: "pkuih_h5_doctor_config_v4",
    lastPortal: "pkuih_h5_last_portal_v4"
  };

  const DEMO_CODE = "888888";
  const DEMO_PHONE = "13800000001";
  const DEMO_USER = {
    phone: DEMO_PHONE,
    contactPhone: DEMO_PHONE,
    name: "王女士",
    orgName: "示例保险 · 高客健康服务部",
    orgType: "保险公司",
    title: "客户健康负责人",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  const ADMIN_ROLES = {
    administrator: {
      label: "系统管理员",
      desc: "全部权限，可配置号源、专家与项目账号"
    },
    manager: {
      label: "项目负责人",
      desc: "确认预约、跟进项目并发送客户短信"
    }
  };

  const DEFAULT_ADMIN_ACCOUNTS = [
    {
      username: "admin",
      password: "pkuih2026",
      name: "李老师",
      phone: "13800009999",
      role: "administrator",
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      username: "consultant",
      password: "pkuih2026",
      name: "周老师",
      phone: "13800001111",
      role: "manager",
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  const SEED_PROJECT_STAFF = {
    username: "admin",
    name: "李老师",
    phone: "13800009999"
  };

  const TIERS = {
    elite: {
      id: "elite",
      name: "大咖医生",
      shortName: "大咖",
      count: 10,
      leadDays: 30,
      leadLabel: "提前 30 天申请",
      position: "院士级 · 学科领军 · 院级专家",
      badge: "旗舰资源",
      desc: "适合重要客户答谢、年度健康峰会与管理层私享课。"
    },
    director: {
      id: "director",
      name: "主任专家",
      shortName: "主任",
      count: 12,
      leadDays: 14,
      leadLabel: "提前 14 天申请",
      position: "科室主任 · 教授 · 主任医师",
      badge: "课题定制",
      desc: "适合专题健康讲堂、专家面对面咨询与客户健康活动。"
    },
    specialist: {
      id: "specialist",
      name: "专业医生",
      shortName: "专业",
      count: 18,
      leadDays: 7,
      leadLabel: "提前 7 天申请",
      position: "主任 / 副主任医师",
      badge: "快速响应",
      desc: "适合员工健康课堂、科室主题科普与健康嘉年华。"
    }
  };

  const TIER_ORDER = ["elite", "director", "specialist"];

  const SERVICE_LINK = "https://baoweidong.github.io/pkuih-enterprise-health/";
  const MARKETING_POSTERS = [
    {
      id: "brand",
      eyebrow: "权威主视觉",
      title: "让权威医疗，走近企业",
      desc: "以医院品牌、名医团队与三级专家资源为核心，适合活动预热、朋友圈和公众号传播。",
      tags: ["医院权威", "名医资源", "品牌传播"],
      image: "assets/posters/poster-brand.webp",
      thumb: "assets/posters/thumbs/poster-brand.webp"
    },
    {
      id: "lecture",
      eyebrow: "专家阵容",
      title: "院士级资源，为企业开讲",
      desc: "突出临床专家阵容、重点学科覆盖与分层匹配能力，适合向企业客户介绍服务实力。",
      tags: ["专家阵容", "重点学科", "三级资源"],
      image: "assets/posters/poster-lecture.webp",
      thumb: "assets/posters/thumbs/poster-lecture.webp"
    },
    {
      id: "premium",
      eyebrow: "保险高客答谢",
      title: "把名医，请到客户身边",
      desc: "面向保险高客沙龙与客户答谢会，强调名医面对面、专属策划与高端健康体验。",
      tags: ["保险高客", "客户答谢", "专属策划"],
      image: "assets/posters/poster-premium.webp",
      thumb: "assets/posters/thumbs/poster-premium.webp"
    },
    {
      id: "care",
      eyebrow: "企业健康价值",
      title: "一场讲座，四重价值",
      desc: "从员工健康素养、组织活力到雇主品牌与客户连接，清楚说明企业健康活动的价值。",
      tags: ["企业价值", "员工关怀", "雇主品牌"],
      image: "assets/posters/poster-care.webp",
      thumb: "assets/posters/thumbs/poster-care.webp"
    }
  ];

  const STATUS = {
    pending: {
      label: "待院方接单",
      tone: "pending",
      title: "预约需求已提交",
      help: "等待院方接单并分配项目负责人，接单后将显示具体对接人。"
    },
    accepted: {
      label: "方案确认中",
      tone: "accepted",
      title: "院方已接单",
      help: "项目负责人正在确认专家、课题、活动地点与执行流程。"
    },
    confirmed: {
      label: "已确认",
      tone: "confirmed",
      title: "院方已确认预约",
      help: "活动方案已同步，请查看课题、流程与时间安排。"
    },
    completed: {
      label: "已完成",
      tone: "completed",
      title: "活动已完成",
      help: "感谢您的信任，项目组会跟进活动回访与后续服务。"
    }
  };

  const TIME_SLOTS = [
    { id: "morning", label: "09:30–11:30", sub: "上午场" },
    { id: "afternoon", label: "14:00–16:00", sub: "下午场" },
    { id: "evening", label: "19:00–21:00", sub: "晚间场" }
  ];

  const DEFAULT_SLOT_CAPACITY = {
    elite: 1,
    director: 2,
    specialist: 3
  };

  const state = {
    doctors: [],
    baseDoctors: [],
    chinaCities: {},
    loaded: false,
    loadError: false,
    tab: "home",
    screen: "main",
    lastPortal: "client",
    session: null,
    adminAuthed: false,
    adminUser: null,
    expertFilter: "elite",
    expertSearch: "",
    appointmentFilter: "all",
    overlay: null,
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
      contactPhone: ""
    },
    pendingAuth: null,
    codeTimer: null,
    codeCountdown: 0,
    lastAppointmentId: "",
    adminLogin: {
      username: "",
      password: "",
      error: ""
    },
    adminTab: "appointments",
    adminFilter: "all",
    adminSearch: "",
    adminReviewId: null,
    adminDraft: null,
    adminNoteEditing: false,
    adminAccountDraft: null,
    adminDoctorDraft: null,
    adminSlotTier: "elite",
    adminSlotDoctorId: "",
    adminSlotDate: "",
    adminSlotDraft: null,
    adminSlotBatchScope: "all",
    posterId: "",
    profileDraft: null,
    locationDraft: null,
    viewScroll: {
      main: {},
      admin: {}
    },
    historyDepth: 0,
    overlayHistoryDepth: 0,
    suppressPopCount: 0,
    authHistory: false,
    adminHistory: false,
    reuseHistoryForOverlay: false,
    renderedOnce: false,
    overlaySnapshot: {
      key: "",
      scrollTop: 0
    }
  };

  const app = document.getElementById("app");
  const overlayRoot = document.getElementById("overlay-root");
  const toastEl = document.getElementById("toast");

  /* =========================================================
     Utilities
     ========================================================= */
  function esc(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => {
      const map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      };
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

  function pad(value) {
    return String(value).padStart(2, "0");
  }

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
    if (!date) return "--.--";
    return `${pad(date.getMonth() + 1)}.${pad(date.getDate())}`;
  }

  function weekday(date) {
    if (!date) return "待定";
    return `周${["日", "一", "二", "三", "四", "五", "六"][date.getDay()]}`;
  }

  function formatDateCN(value, withWeekday = false) {
    const date = parseDate(value);
    if (!date) return "待确认";
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日${
      withWeekday ? ` ${weekday(date)}` : ""
    }`;
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

  function slotById(id) {
    return TIME_SLOTS.find((slot) => slot.id === id) || TIME_SLOTS[1];
  }

  function doctorById(id) {
    const active = state.doctors.find((doctor) => String(doctor.id) === String(id));
    if (active) return active;
    return configuredDoctors().find((doctor) => String(doctor.id) === String(id)) || null;
  }

  function doctorPhoto(photoOrDoctor, variant = "card") {
    const photo =
      typeof photoOrDoctor === "string" ? photoOrDoctor : photoOrDoctor?.photo || "";
    if (!photo) return "";
    const match = String(photo).match(/^assets\/doctors\/([^/]+)\.webp$/i);
    if (!match) return photo;
    return `assets/doctors/${variant === "detail" ? "details" : "cards"}/${match[1]}.jpg`;
  }

  function doctorsForTier(tierId) {
    return state.doctors.filter((doctor) => doctor.tier === tierId);
  }

  function tierOf(doctor) {
    return TIERS[doctor?.tier] || TIERS.specialist;
  }

  function topicOf(appointment) {
    return (appointment?.customTopic || "").trim() || appointment?.topic || "企业健康活动";
  }

  function cleanDoctorText(value) {
    const text = String(value || "").trim();
    if (!text) return "";
    const lastStop = Math.max(text.lastIndexOf("。"), text.lastIndexOf("；"), text.lastIndexOf("！"));
    if (text.length > 190 && lastStop > 120) return text.slice(0, lastStop + 1);
    return text;
  }

  function initialOf(name) {
    return String(name || "企").trim().slice(0, 1) || "企";
  }

  function generateAppointmentId() {
    const now = new Date();
    return `BD-${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${String(
      Math.floor(Math.random() * 900 + 100)
    )}`;
  }

  function showToast(message) {
    if (!toastEl) return;
    toastEl.innerHTML = `${icon("checkCircle", 16)}<span>${esc(message)}</span>`;
    toastEl.classList.add("is-visible");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => {
      toastEl.classList.remove("is-visible");
    }, 3000);
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
    if (index === -1) users.push(user);
    else users[index] = { ...users[index], ...user, updatedAt: new Date().toISOString() };
    saveUsers(users);
    return index === -1 ? user : users[index];
  }

  function setSession(user) {
    state.session = user;
    writeJSON(STORAGE.session, user);
  }

  function clearSession() {
    state.session = null;
    try {
      localStorage.removeItem(STORAGE.session);
    } catch {
      /* no-op */
    }
  }

  function getAdminAccounts() {
    return readJSON(STORAGE.adminAccounts, []);
  }

  function saveAdminAccounts(accounts) {
    writeJSON(STORAGE.adminAccounts, accounts);
  }

  function ensureAdminAccounts() {
    const stored = readJSON(STORAGE.adminAccounts, null);
    if (!stored) {
      saveAdminAccounts(clone(DEFAULT_ADMIN_ACCOUNTS));
      return;
    }
    let changed = false;
    const normalized = stored.map((account) => {
      if (ADMIN_ROLES[account.role]) return account;
      changed = true;
      return { ...account, role: "manager", updatedAt: new Date().toISOString() };
    });
    if (changed) {
      saveAdminAccounts(normalized);
    }
  }

  function setAdminSession(account) {
    state.adminUser = account;
    state.adminAuthed = true;
    state.adminSlotDraft = null;
    state.adminSlotBatchScope = "all";
    writeJSON(STORAGE.adminSession, { username: account.username });
  }

  function clearAdminSession() {
    state.adminUser = null;
    state.adminAuthed = false;
    state.adminSlotDraft = null;
    state.adminSlotBatchScope = "all";
    try {
      localStorage.removeItem(STORAGE.adminSession);
    } catch {
      /* no-op */
    }
  }

  function isAdministrator() {
    return state.adminUser?.role === "administrator";
  }

  function setLastPortal(portal) {
    state.lastPortal = portal === "admin" ? "admin" : "client";
    writeJSON(STORAGE.lastPortal, state.lastPortal);
  }

  function getDoctorConfig() {
    const saved = readJSON(STORAGE.doctorConfig, null);
    return {
      overrides: saved?.overrides || {},
      custom: Array.isArray(saved?.custom) ? saved.custom : []
    };
  }

  function saveDoctorConfig(config) {
    writeJSON(STORAGE.doctorConfig, config);
  }

  function mergeDoctorConfig(baseDoctors, includeInactive = false) {
    const config = getDoctorConfig();
    const merged = baseDoctors.map((doctor) => ({
      ...doctor,
      ...(config.overrides[String(doctor.id)] || {})
    }));
    config.custom.forEach((doctor) => {
      const index = merged.findIndex((item) => String(item.id) === String(doctor.id));
      if (index === -1) merged.push(doctor);
      else merged[index] = { ...merged[index], ...doctor };
    });
    return includeInactive ? merged : merged.filter((doctor) => doctor.active !== false);
  }

  function refreshDoctors() {
    state.doctors = mergeDoctorConfig(state.baseDoctors, false);
  }

  function configuredDoctors() {
    return mergeDoctorConfig(state.baseDoctors, true);
  }

  function getSlotInventory() {
    return readJSON(STORAGE.slotInventory, {}) || {};
  }

  function saveSlotInventory(inventory) {
    writeJSON(STORAGE.slotInventory, inventory);
  }

  function getSlotCapacity(tierId, dateIso, slotId) {
    const value = getSlotInventory()?.[dateIso]?.[tierId]?.[slotId];
    const fallback = DEFAULT_SLOT_CAPACITY[tierId] ?? 1;
    if (value === undefined || value === null || value === "") return fallback;
    return Math.max(0, Math.min(9, Number(value) || 0));
  }

  function getDoctorSlotInventory() {
    return readJSON(STORAGE.doctorSlotInventory, {}) || {};
  }

  function saveDoctorSlotInventory(inventory) {
    writeJSON(STORAGE.doctorSlotInventory, inventory);
  }

  function getDoctorSlotCapacity(doctorId, dateIso, slotId) {
    const value = getDoctorSlotInventory()?.[dateIso]?.[String(doctorId)]?.[slotId];
    if (value === undefined || value === null || value === "") return 1;
    return Math.max(0, Math.min(9, Number(value) || 0));
  }

  function bookedTierPoolCount(tierId, dateIso, slotId, appointments = getAppointments()) {
    return appointments.filter(
      (item) =>
        item.tier === tierId &&
        item.date === dateIso &&
        item.slot === slotId &&
        !item.doctorId &&
        item.status !== "cancelled"
    ).length;
  }

  function bookedDoctorSlotCount(doctorId, dateIso, slotId, appointments = getAppointments()) {
    return appointments.filter(
      (item) =>
        String(item.doctorId) === String(doctorId) &&
        item.date === dateIso &&
        item.slot === slotId &&
        item.status !== "cancelled"
    ).length;
  }

  function getAppointments() {
    return readJSON(STORAGE.appointments, []);
  }

  function saveAppointments(items) {
    writeJSON(STORAGE.appointments, items);
  }

  function appointmentsForUser(phone) {
    if (!phone) return [];
    return getAppointments()
      .filter((item) => item.ownerPhone === phone)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  function appointmentNeedsSmsFollowUp(appointment) {
    return (
      Boolean(appointment?.phone) &&
      appointment.status === "confirmed" &&
      !appointment.smsFollowUp?.copiedAt
    );
  }

  function pendingSmsFollowUps() {
    return getAppointments()
      .filter(appointmentNeedsSmsFollowUp)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  function completedSmsFollowUps() {
    return getAppointments()
      .filter((item) => item.smsFollowUp?.copiedAt)
      .sort(
        (a, b) =>
          new Date(b.smsFollowUp.copiedAt).getTime() -
          new Date(a.smsFollowUp.copiedAt).getTime()
      );
  }

  function getSmsLogs() {
    return readJSON(STORAGE.smsLogs, []);
  }

  function addSmsLog(entry) {
    const logs = getSmsLogs();
    logs.unshift({
      id: `sms-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      createdAt: new Date().toISOString(),
      status: "已登记（演示）",
      demo: true,
      ...entry
    });
    writeJSON(STORAGE.smsLogs, logs.slice(0, 50));
  }

  function buildDateOptions(tierId, count = 12) {
    const tier = TIERS[tierId] || TIERS.elite;
    const start = addDays(startOfDay(new Date()), tier.leadDays);
    return Array.from({ length: count }, (_, index) => {
      const date = addDays(start, index);
      const slots = buildTierTimeSlots(tierId, isoDate(date));
      return {
        iso: isoDate(date),
        date,
        slots,
        full: slots.every((slot) => slot.full),
        tight: slots.some((slot) => slot.tight)
      };
    });
  }

  function buildPoolTimeSlots(tierId, dateIso, appointments = getAppointments()) {
    return TIME_SLOTS.map((slot) => {
      const capacity = getSlotCapacity(tierId, dateIso, slot.id);
      const booked = bookedTierPoolCount(tierId, dateIso, slot.id, appointments);
      const remaining = Math.max(0, capacity - booked);
      return {
        ...slot,
        capacity,
        booked,
        remaining,
        full: capacity === 0 || remaining === 0,
        tight:
          capacity > 1 &&
          remaining > 0 &&
          remaining <= Math.max(1, Math.ceil(capacity * 0.34))
      };
    });
  }

  function buildDoctorTimeSlots(doctor, dateIso, appointments = getAppointments()) {
    return TIME_SLOTS.map((slot) => {
      const capacity = getDoctorSlotCapacity(doctor.id, dateIso, slot.id);
      const booked = bookedDoctorSlotCount(doctor.id, dateIso, slot.id, appointments);
      const remaining = Math.max(0, capacity - booked);
      return {
        ...slot,
        capacity,
        booked,
        remaining,
        full: capacity === 0 || remaining === 0,
        tight:
          capacity > 1 &&
          remaining > 0 &&
          remaining <= Math.max(1, Math.ceil(capacity * 0.34))
      };
    });
  }

  function buildTierTimeSlots(tierId, dateIso) {
    const doctors = doctorsForTier(tierId);
    const appointments = getAppointments();
    const poolSlots = buildPoolTimeSlots(tierId, dateIso, appointments);
    const doctorSlots = doctors.map((doctor) =>
      buildDoctorTimeSlots(doctor, dateIso, appointments)
    );
    return TIME_SLOTS.map((slot, index) => {
      const pool = poolSlots[index];
      const capacity =
        pool.capacity +
        doctorSlots.reduce((total, slots) => total + slots[index].capacity, 0);
      const booked =
        pool.booked + doctorSlots.reduce((total, slots) => total + slots[index].booked, 0);
      const remaining = Math.max(0, capacity - booked);
      return {
        ...slot,
        capacity,
        booked,
        remaining,
        full: capacity === 0 || remaining === 0,
        tight:
          capacity > 1 &&
          remaining > 0 &&
          remaining <= Math.max(1, Math.ceil(capacity * 0.34))
      };
    });
  }

  function statusMeta(status) {
    return STATUS[status] || STATUS.pending;
  }

  function statusPill(status) {
    const meta = statusMeta(status);
    return `<span class="pill pill--${meta.tone}">${meta.label}</span>`;
  }

  function phoneHref(value) {
    const cleaned = String(value || "").replace(/[^\d+]/g, "");
    return cleaned.length >= 6 ? `tel:${cleaned}` : "";
  }

  function phoneLink(value, label = value, className = "tel-link") {
    const href = phoneHref(value);
    if (!href) return esc(label || "");
    return `<a class="${esc(className)}" href="${esc(href)}">${esc(label || value)}</a>`;
  }

  function appointmentAssignee(appointment) {
    return appointment?.assignedStaff?.name && appointment.assignedStaff?.phone
      ? appointment.assignedStaff
      : null;
  }

  function assigneeContactMarkup(staff) {
    if (!staff) return "";
    return `${esc(staff.name)} · ${phoneLink(staff.phone, staff.phone)}`;
  }

  function appointmentLocationMarkup(appointment) {
    if (!appointment) return "待确认";
    const hasVenue = Boolean(String(appointment.venue || "").trim());
    const hasAddress = Boolean(String(appointment.address || "").trim());
    if (appointment.locationPending || (!hasVenue && !hasAddress)) {
      return `<span class="location-pending">活动地点待确认</span>`;
    }
    const region = [appointment.province, appointment.city]
      .filter(Boolean)
      .filter((value, index, list) => index === 0 || value !== list[0])
      .join(" · ");
    return [
      region ? esc(region) : "",
      hasVenue ? esc(appointment.venue) : "",
      hasAddress ? esc(appointment.address) : ""
    ]
      .filter(Boolean)
      .join("<br>");
  }

  function appointmentLocationText(appointment) {
    if (!appointment || appointment.locationPending) return "活动地点待确认";
    const region = [appointment.province, appointment.city]
      .filter(Boolean)
      .filter((value, index, list) => index === 0 || value !== list[0])
      .join(" ");
    return [region, appointment.venue, appointment.address]
      .filter((value) => String(value || "").trim())
      .join(" · ") || "活动地点待确认";
  }

  function currentViewScrollKey() {
    if (state.screen === "admin") return `admin:${state.adminTab}`;
    if (state.screen === "main") return `main:${state.tab}`;
    return state.screen || "main:home";
  }

  function storeCurrentScroll() {
    const key = currentViewScrollKey();
    const bucket = key.startsWith("admin:")
      ? state.viewScroll.admin
      : state.viewScroll.main;
    bucket[key] = window.scrollY || 0;
    return key;
  }

  function storedScrollForView(key) {
    const bucket = key.startsWith("admin:")
      ? state.viewScroll.admin
      : state.viewScroll.main;
    return bucket[key] ?? 0;
  }

  function restoreWindowScroll(top, behavior = "auto") {
    const target = Math.max(0, Number(top) || 0);
    window.requestAnimationFrame(() => {
      if (behavior === "smooth") window.scrollTo({ top: target, behavior: "smooth" });
      else window.scrollTo(0, target);
    });
  }

  function pushAppHistory(layer = "overlay") {
    if (state.screen === "auth" && layer !== "auth") return false;
    try {
      window.history.pushState(
        {
          ...(window.history.state || {}),
          pkuihLayer: layer,
          pkuihScroll: window.scrollY
        },
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

  function releaseAuthHistory() {
    if (!state.authHistory) return;
    state.authHistory = false;
    state.overlayHistoryDepth = 0;
    popAppHistory();
  }

  function releaseAdminHistory() {
    if (!state.adminHistory) return;
    state.adminHistory = false;
    state.overlayHistoryDepth = 0;
    popAppHistory();
  }

  function clearOverlayState() {
    state.overlay = null;
    state.adminReviewId = null;
    state.adminDraft = null;
    state.adminNoteEditing = false;
    state.adminAccountDraft = null;
    state.adminDoctorDraft = null;
    state.posterId = "";
    state.profileDraft = null;
    state.locationDraft = null;
  }

  function dismissOverlay({ fromHistory = false } = {}) {
    if (!fromHistory) releaseOverlayHistory();
    clearOverlayState();
    if (state.screen === "admin" || state.screen === "admin-login") renderApp();
    else renderOverlay();
    document.body.classList.remove("is-locked");
  }

  /* =========================================================
     Seed demo data
     ========================================================= */
  const defaultSmsLogs = [
    {
      id: "sms-seed-demo",
      appointmentId: "BD-20261218-108",
      recipient: "项目组 A",
      content: "示例预约提醒 · 演示保险 · 颈腰椎健康",
      status: "示例记录",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
      demo: true
    }
  ];

  function makeSeedReply(appointment, doctor) {
    return {
      topic:
        appointment.tier === "elite"
          ? "颈腰椎健康：职场久坐人群的脊柱保养"
          : appointment.topic,
      outline:
        "1. 久坐与低头行为对脊柱的长期影响\n2. 颈腰椎常见问题的早期信号\n3. 办公室人群可执行的日常保护方法\n4. 现场问答与健康咨询",
      agenda:
        "14:00–14:10 签到与开场\n14:10–15:10 专家主题分享\n15:10–15:40 现场问答\n15:40–16:00 一对一健康咨询",
      schedule: `${formatDateCN(appointment.date)} ${appointment.time}`,
      format: "主题讲座 + 现场问答",
      speaker: doctor ? `${doctor.name} ${doctor.title.split(" · ")[0]}` : "待院方安排",
      contact: "企业健康项目组 · 李老师 010-6900 6666",
      message:
        "感谢贵司的预约与信任。院方项目组已完成专家与课题确认，具体流程与时间安排请见本页回复。如活动人数或场地有变化，请提前 3 个工作日联系项目组。",
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString()
    };
  }

  function seedAppointments() {
    const today = startOfDay(new Date());
    const specialist = doctorsForTier("specialist")[0];
    const confirmed = {
      id: "BD-20261218-108",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 52).toISOString(),
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
      status: "confirmed",
      demo: true,
      ownerPhone: DEMO_PHONE,
      tier: "elite",
      doctorId: "9099",
      date: isoDate(addDays(today, 24)),
      slot: "afternoon",
      time: "14:00–16:00",
      topic: "职场久坐人群的脊柱健康",
      customTopic: "",
      format: "主题讲座 + 现场问答",
      audience: "100–300 人",
      province: "北京市",
      city: "北京市",
      venue: "朝阳区企业健康活动中心",
      orgType: "保险公司",
      orgName: "示例保险 · 高客健康服务部",
      contactName: "王女士",
      contactTitle: "客户健康负责人",
      phone: DEMO_PHONE,
      email: "demo@pkuih-partner.com",
      address: "北京市朝阳区建国路 88 号",
      locationPending: false,
      note: "希望围绕久坐、颈椎不适与办公室拉伸展开，现场约 120 人。",
      sms: { hospital: true, contact: true },
      assignedStaff: SEED_PROJECT_STAFF,
      acceptedAt: new Date(Date.now() - 1000 * 60 * 60 * 27).toISOString(),
      reply: null
    };
    confirmed.reply = makeSeedReply(confirmed, doctorById("9099"));

    const pending = {
      id: "BD-20261226-221",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
      updatedAt: "",
      status: "pending",
      demo: true,
      ownerPhone: DEMO_PHONE,
      tier: "director",
      doctorId: "1081",
      date: isoDate(addDays(today, 36)),
      slot: "evening",
      time: "19:00–21:00",
      topic: "甲状腺结节与职场人内分泌管理",
      customTopic: "",
      format: "专家健康咨询",
      audience: "50–100 人",
      province: "北京市",
      city: "北京市",
      venue: "企业总部多功能厅",
      orgType: "保险公司",
      orgName: "示例保险 · 高客健康服务部",
      contactName: "王女士",
      contactTitle: "客户健康负责人",
      phone: DEMO_PHONE,
      email: "demo@pkuih-partner.com",
      address: "北京市海淀区中关村软件园二期",
      locationPending: false,
      note: "客户体检中甲状腺结节检出率较高，希望安排一次专题科普与现场咨询。",
      sms: { hospital: true, contact: true },
      assignedStaff: null,
      acceptedAt: null,
      reply: null
    };

    const completed = {
      id: "BD-20261220-305",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
      status: "completed",
      demo: true,
      ownerPhone: "13800000002",
      tier: "specialist",
      doctorId: specialist ? String(specialist.id) : "",
      date: isoDate(addDays(today, 14)),
      slot: "morning",
      time: "09:30–11:30",
      topic: "办公室人群的睡眠与压力管理",
      customTopic: "",
      format: "主题讲座",
      audience: "30–50 人",
      province: "北京市",
      city: "北京市",
      venue: "企业培训室",
      orgType: "企业",
      orgName: "示例科技 · 员工体验中心",
      contactName: "赵先生",
      contactTitle: "员工福利经理",
      phone: "13800000002",
      email: "demo@example-tech.com",
      address: "北京市顺义区临空经济区",
      locationPending: false,
      note: "希望增加现场一对一咨询环节。",
      sms: { hospital: true, contact: true },
      assignedStaff: {
        username: "consultant",
        name: "周老师",
        phone: "13800001111"
      },
      acceptedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      reply: {
        topic: "办公室人群的睡眠与压力管理",
        outline: "1. 睡眠节律与压力反应\n2. 常见误区\n3. 可执行的自助方法\n4. 现场问答",
        agenda: "签到与开场\n主题分享\n现场问答",
        schedule: `${formatDateCN(isoDate(addDays(today, 14)))} 09:30–11:30`,
        format: "主题讲座",
        speaker: specialist ? `${specialist.name} ${specialist.title.split(" · ")[0]}` : "待院方安排",
        contact: "企业健康项目组 · 李老师 010-6900 6666",
        message: "请补充现场预计人数和是否需要一对一咨询区，便于项目组完善安排。",
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString()
      }
    };

    return [pending, confirmed, completed];
  }

  function ensureSeedData() {
    ensureAdminAccounts();
    const users = getUsers();
    if (!users.some((user) => user.phone === DEMO_PHONE)) {
      users.push(clone(DEMO_USER));
      saveUsers(users);
    }
    if (!readJSON(STORAGE.appointments, null)) {
      saveAppointments(seedAppointments());
    }
    if (!readJSON(STORAGE.smsLogs, null)) {
      writeJSON(STORAGE.smsLogs, defaultSmsLogs);
    }
  }

  function migrateAppointmentStatuses() {
    const items = getAppointments();
    let changed = false;
    const next = items.map((item) => {
      const city = String(item.city || "");
      const inferredProvince =
        item.province ||
        provinceOptions().find((province) => {
          const short = province.replace(
            /(省|市|壮族自治区|回族自治区|维吾尔自治区|自治区|特别行政区)$/g,
            ""
          );
          return city.includes(short);
        }) ||
        "北京市";
      const normalized = normalizedCity(inferredProvince, city);
      const needsLocationPending =
        item.locationPending ??
        (!String(item.venue || "").trim() && !String(item.address || "").trim());
      const needsStaff =
        item.status === "accepted" ||
        item.status === "confirmed" ||
        item.status === "completed";
      const normalizedStatus =
        item.status === "needs_info" ? "pending" : item.status === "accepted" ? "accepted" : item.status;
      const shouldClearPendingStaff = normalizedStatus === "pending";
      const staff = needsStaff ? item.assignedStaff || SEED_PROJECT_STAFF : null;
      const acceptedAt =
        needsStaff
          ? item.acceptedAt || item.updatedAt || item.createdAt || new Date().toISOString()
          : null;
      const reply = normalizedStatus === "pending" ? null : item.reply || null;
      const patch = {
        ...item,
        status: normalizedStatus,
        province: inferredProvince,
        city: normalized,
        locationPending: needsLocationPending,
        assignedStaff: shouldClearPendingStaff ? null : staff,
        acceptedAt: shouldClearPendingStaff ? null : acceptedAt,
        reply
      };
      if (JSON.stringify(patch) !== JSON.stringify(item)) changed = true;
      return patch;
    });
    if (changed) saveAppointments(next);
  }

  /* =========================================================
     Icons
     ========================================================= */
  function icon(name, size = 18) {
    const paths = ICONS[name] || ICONS.chevronRight;
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
  }

  const ICONS = {
    home: '<path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/>',
    experts:
      '<path d="M6 3v5a4 4 0 0 0 8 0V3"/><path d="M4 3h4"/><path d="M12 3h4"/><path d="M10 12v3a5 5 0 0 0 10 0v-2"/><circle cx="20" cy="10" r="2"/>',
    calendar:
      '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M16 3v4"/><path d="M8 3v4"/><path d="M3 10h18"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    chevronRight: '<path d="m9 18 6-6-6-6"/>',
    chevronLeft: '<path d="m15 18-6-6 6-6"/>',
    chevronDown: '<path d="m6 9 6 6 6-6"/>',
    arrowRight: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
    arrowUpRight: '<path d="M7 17 17 7"/><path d="M8 7h9v9"/>',
    close: '<path d="m18 6-12 12"/><path d="m6 6 12 12"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    checkCircle: '<circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    building:
      '<path d="M3 21h18"/><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/><path d="M9 7h1"/><path d="M14 7h1"/><path d="M9 11h1"/><path d="M14 11h1"/><path d="M9 15h1"/><path d="M14 15h1"/>',
    users:
      '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    bell:
      '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/>',
    message:
      '<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"/><path d="M8 9h8"/><path d="M8 13h5"/>',
    settings:
      '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.34-1.88l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1.1 1.5 1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.1.36.3.7.6 1 .3.3.7.5 1.1.5h.1a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1.1Z"/>',
    logout:
      '<path d="M10 17l5-5-5-5"/><path d="M15 12H3"/><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>',
    shield:
      '<path d="M12 3 4.5 6v5.2c0 4.6 3.2 8.2 7.5 9.8 4.3-1.6 7.5-5.2 7.5-9.8V6Z"/><path d="m9 12 2 2 4-4"/>',
    spark:
      '<path d="m12 3 1.4 4.2L18 8.6l-4.6 1.4L12 14.2l-1.4-4.2L6 8.6l4.6-1.4L12 3Z"/><path d="m19 15 .7 2.1 2.1.7-2.1.7L19 21l-.7-2.5-2.1-.7 2.1-.7L19 15Z"/>',
    plus: '<path d="M12 5v14"/><path d="M5 12h14"/>',
    phone:
      '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.1.85.3 1.68.57 2.47a2 2 0 0 1-.45 2.11L8 9.5a16 16 0 0 0 6.5 6.5l1.2-1.2a2 2 0 0 1 2.1-.45c.8.27 1.63.47 2.48.57A2 2 0 0 1 22 16.92Z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    pin: '<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h6"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 8h.01"/>',
    lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>'
  };

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
            <span>企业健康服务</span>
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

  function renderTabbar(active) {
    const tabs = [
      { id: "home", label: "首页", icon: "home" },
      { id: "experts", label: "专家", icon: "experts" },
      { id: "appointments", label: "预约", icon: "calendar" },
      { id: "me", label: "我的", icon: "user" }
    ];
    return `
      <nav class="tabbar" aria-label="主导航">
        ${tabs
          .map(
            (tab) => `
              <button class="tabbar__item ${active === tab.id ? "is-active" : ""}" type="button" data-action="tab" data-tab="${tab.id}">
                ${icon(tab.icon, 21)}
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
  function renderDatePill(option, options = {}) {
    const stateText = option.full ? "约满" : option.tight ? "紧张" : "可约";
    const statusClass = option.full ? "is-full" : option.tight ? "is-tight" : "";
    const action = options.action || "open-booking";
    const selected = options.selected ? "is-selected" : "";
    const disabled = options.disableFull && option.full ? "disabled" : "";
    return `
      <button class="date-pill ${selected}" type="button"
        data-action="${action}"
        data-date="${esc(option.iso)}"
        ${options.tier ? `data-tier="${esc(options.tier)}"` : ""}
        ${disabled}>
        <strong>${formatMD(option.iso)}</strong>
        <span>${weekday(option.date)}</span>
        <small class="${statusClass}">${stateText}</small>
      </button>
    `;
  }

  function renderHomePage() {
    const session = state.session;
    const railDoctors = state.doctors.slice(0, 8);
    const tiers = TIER_ORDER.map((tierId) => {
      const tier = TIERS[tierId];
      const dates = buildDateOptions(tierId, 3);
      return `
        <article class="availability-card">
          <div class="availability-card__head">
            <div class="availability-card__name">
              <i class="availability-card__dot ${tierId === "elite" ? "is-amber" : tierId === "specialist" ? "is-green" : ""}"></i>
              <div>
                <strong>${tier.name}</strong>
                <small> · ${doctorsForTier(tierId).length} 位</small>
              </div>
            </div>
            <span class="availability-card__lead">${tier.leadLabel}</span>
          </div>
          <div class="date-pills horizontal-scroll">
            ${dates.map((option) => renderDatePill(option, { tier: tierId, disableFull: true })).join("")}
          </div>
        </article>
      `;
    }).join("");

    return `
      <div class="screen">
        <section class="hero-card">
          <div class="hero-card__media">
            <img src="assets/hero-campus-960.jpg" alt="北京大学国际医院园区" width="960" height="411"
              fetchpriority="high" decoding="async">
          </div>
          <div class="hero-card__content">
            <span class="hero-card__kicker"><i></i> 白大褂到企 · 名医入企计划</span>
            <h1>把医学专家<br><em>请到企业身边</em></h1>
            <p class="hero-card__desc">
              面向保险公司与企业，将北大医学专家与临床经验带进企业现场。
              按层级匹配讲者，在线选择档期，院方项目组全程跟进。
            </p>
            <div class="hero-card__actions">
              <button class="btn btn--accent" type="button" data-action="open-booking">
                预约入企活动 ${icon("arrowRight", 15)}
              </button>
              <button class="btn btn--glass" type="button" data-action="tab" data-tab="experts">
                浏览专家
              </button>
            </div>
            <div class="hero-metrics">
              <div class="hero-metric"><strong>${state.doctors.length}<span>位</span></strong><small>精选入企专家</small></div>
              <div class="hero-metric"><strong>3<span>级</span></strong><small>分层专家资源</small></div>
              <div class="hero-metric"><strong>7<span>天</span></strong><small>最快响应周期</small></div>
            </div>
          </div>
        </section>

        ${
          session
            ? `
              <div class="welcome-strip">
                <span>欢迎回来，<strong>${esc(session.name)}</strong> · ${esc(session.orgName)}</span>
                <button type="button" data-action="tab" data-tab="appointments">我的预约</button>
              </div>
            `
            : ""
        }

        <section class="section">
          <div class="section-head">
            <div>
              <h2>三级专家资源</h2>
              <p>按活动级别、人群与课题匹配讲者</p>
            </div>
            <button class="text-link" type="button" data-action="tab" data-tab="experts">全部专家 ${icon("chevronRight", 14)}</button>
          </div>
          <div class="tier-rail horizontal-scroll">
            ${TIER_ORDER.map((tierId) => {
              const tier = TIERS[tierId];
              return `
                <button class="tier-card ${tierId === "elite" ? "tier-card--elite" : ""}" type="button" data-action="open-booking" data-tier="${tierId}">
                  <div class="tier-card__top">
                    <span class="tier-card__index">0${TIER_ORDER.indexOf(tierId) + 1}</span>
                    <span class="tier-card__badge">${tier.badge}</span>
                  </div>
                  <h3>${tier.name}</h3>
                  <div class="tier-card__meta"><span>${doctorsForTier(tierId).length} 位专家</span><span>·</span><span>${tier.leadLabel}</span></div>
                  <p>${tier.desc}</p>
                  <span class="tier-card__cta">查看可预约档期 ${icon("chevronRight", 13)}</span>
                </button>
              `;
            }).join("")}
          </div>
        </section>

        <section class="section">
          <div class="section-head">
            <div>
              <h2>近期可预约</h2>
              <p>档期按专家层级自动计算</p>
            </div>
            <span class="section-head__aside">点击日期开始预约</span>
          </div>
          <div class="availability-list">${tiers}</div>
        </section>

        <section class="section">
          <div class="section-head">
            <div>
              <h2>专家讲堂</h2>
              <p>来自北京大学国际医院官网公开专家资料</p>
            </div>
            <button class="text-link" type="button" data-action="tab" data-tab="experts">专家库 ${icon("chevronRight", 14)}</button>
          </div>
          <div class="doctor-rail horizontal-scroll">
            ${railDoctors
              .map(
                (doctor) => `
                  <button class="doctor-rail-card" type="button" data-action="open-doctor" data-doctor-id="${esc(doctor.id)}">
                    <span class="doctor-rail-card__photo">
                      <img src="${esc(doctorPhoto(doctor))}" alt="${esc(doctor.name)}"
                        loading="lazy" decoding="async">
                    </span>
                    <span class="doctor-rail-card__content">
                      <span class="doctor-rail-card__badge">${tierOf(doctor).name}</span>
                      <h3>${esc(doctor.name)}</h3>
                      <p>${esc(doctor.dept)}</p>
                      <span class="doctor-rail-card__intro">${esc(
                        cleanDoctorText(doctor.specialty)
                      )}</span>
                      <span class="doctor-rail-card__more">查看专家详情 ${icon("chevronRight", 11)}</span>
                    </span>
                  </button>
                `
              )
              .join("")}
          </div>
        </section>

        <section class="section">
          <div class="section-head">
            <div>
              <h2>从预约到入企</h2>
              <p>院方项目组全程对接</p>
            </div>
          </div>
          <div class="process-card">
            <div class="process-step">
              <span class="process-step__num">01</span>
              <div><strong>选择专家与档期</strong><p>按层级浏览专家、可预约日期与活动时段。</p></div>
            </div>
            <div class="process-step">
              <span class="process-step__num">02</span>
              <div><strong>提交企业活动需求</strong><p>填写人群、主题与场地信息，项目组快速响应。</p></div>
            </div>
            <div class="process-step">
              <span class="process-step__num">03</span>
              <div><strong>院方确认活动方案</strong><p>课题、讲者、流程与时间安排在预约详情中同步。</p></div>
            </div>
            <div class="process-step">
              <span class="process-step__num">04</span>
              <div><strong>专家入企交付</strong><p>项目组跟进现场执行与活动回访。</p></div>
            </div>
          </div>
        </section>

        <section class="section">
          <div class="section-head">
            <div><h2>合作场景</h2><p>为两类客户提供同一套专业医疗能力</p></div>
          </div>
          <div class="scenario-list">
            <article class="scenario-card scenario-card--blue">
              <span class="scenario-card__label">${icon("shield", 13)} 保险公司 · 客户健康权益</span>
              <h3>让健康服务成为长期触点</h3>
              <p>面向高价值客户、核心代理人与重点企业客户，打造有专业背书的健康活动。</p>
              <button class="scenario-card__button" type="button" data-action="open-booking" data-tier="elite">
                发起保险客户活动 ${icon("arrowRight", 13)}
              </button>
            </article>
            <article class="scenario-card scenario-card--light">
              <span class="scenario-card__label">${icon("building", 13)} 企业 · 员工健康福利</span>
              <h3>把健康福利做到员工愿意参加</h3>
              <p>围绕久坐、睡眠、压力、慢病与家庭健康等高频议题，设计贴近真实需求的健康课堂。</p>
              <button class="scenario-card__button" type="button" data-action="open-booking" data-tier="director">
                发起员工健康活动 ${icon("arrowRight", 13)}
              </button>
            </article>
          </div>
        </section>

        <p class="source-note">
          专家照片、科室与擅长方向来自北京大学国际医院官网公开资料，仅用于本演示。
          实际出讲专家、活动排期与授权以院方最终确认为准。
        </p>
        <section class="hospital-entry-section">
          <button class="hospital-entry" type="button" data-action="open-admin">
            <span class="hospital-entry__icon">${icon("shield", 19)}</span>
            <span class="hospital-entry__copy">
              <strong>北京大学国际医院 · 院方工作台</strong>
              <small>管理员与项目负责人登录入口</small>
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
  function filteredDoctors() {
    const query = state.expertSearch.trim().toLowerCase();
    let list =
      state.expertFilter === "all" ? state.doctors : doctorsForTier(state.expertFilter);
    if (!query) return list;
    return list.filter((doctor) =>
      [doctor.name, doctor.dept, doctor.title, doctor.specialty, ...(doctor.tags || [])]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }

  function renderExpertResults() {
    const list = filteredDoctors();
    return `
      <div class="expert-result-meta">
        <span>${list.length} 位专家</span>
        <span>资料来自医院官网</span>
      </div>
      ${
        list.length
          ? `<div class="expert-grid">
              ${list
                .map(
                  (doctor) => `
                    <button class="expert-tile" type="button" data-action="open-doctor" data-doctor-id="${esc(doctor.id)}">
                      <span class="expert-tile__media">
                        <img src="${esc(doctorPhoto(doctor))}" alt="${esc(doctor.name)}"
                          loading="lazy" decoding="async">
                        <span class="expert-tile__tier">${tierOf(doctor).name}</span>
                      </span>
                      <span class="expert-tile__body">
                        <span class="expert-tile__heading">
                          <h3>${esc(doctor.name)}</h3>
                          <span class="expert-tile__more">详情 ${icon("chevronRight", 11)}</span>
                        </span>
                        <span class="expert-tile__role">${esc(doctor.dept)} · ${esc(doctor.title)}</span>
                        <span class="expert-tile__intro">${esc(
                          cleanDoctorText(doctor.specialty) || cleanDoctorText(doctor.intro)
                        )}</span>
                        <span class="expert-tile__tags">
                          ${(doctor.tags || [])
                            .slice(0, 2)
                            .map((tag) => `<span class="expert-tile__tag">${esc(tag)}</span>`)
                            .join("")}
                        </span>
                      </span>
                    </button>
                  `
                )
                .join("")}
            </div>`
          : `<div class="empty-state">
              <span class="empty-state__icon">${icon("search", 26)}</span>
              <h3>没有找到匹配专家</h3>
              <p>试试搜索科室、专家姓名或健康主题。</p>
            </div>`
      }
    `;
  }

  function renderExpertsPage() {
    const filters = [
      { id: "elite", label: "大咖", count: doctorsForTier("elite").length },
      { id: "director", label: "主任", count: doctorsForTier("director").length },
      { id: "specialist", label: "专业", count: doctorsForTier("specialist").length },
      { id: "all", label: "全部", count: state.doctors.length }
    ];
    return `
      <div class="screen">
        <header class="page-head">
          <span class="eyebrow"><i></i> Expert Network</span>
          <h1>专家库</h1>
          <p>覆盖骨与关节、心血管、肿瘤、内分泌、妇儿、睡眠与心理等多个学科。</p>
        </header>
        <div class="expert-search">
          ${icon("search", 17)}
          <input id="expert-search" type="search" placeholder="搜索专家、科室或健康主题" value="${esc(
            state.expertSearch
          )}" data-expert-search autocomplete="off">
          <button class="expert-search__clear" type="button" data-action="expert-clear" ${state.expertSearch ? "" : "hidden"} aria-label="清空搜索">
            ${icon("close", 11)}
          </button>
        </div>
        <div class="expert-controls">
          <div class="segmented">
            ${filters
              .map(
                (filter) => `
                  <button class="${state.expertFilter === filter.id ? "is-active" : ""}" type="button" data-action="expert-filter" data-value="${filter.id}">
                    ${filter.label}<span>${filter.count}</span>
                  </button>
                `
              )
              .join("")}
          </div>
        </div>
        <div id="expert-results">${renderExpertResults()}</div>
        <p class="source-note">点击专家可查看公开简介、擅长方向与官网来源。</p>
      </div>
    `;
  }

  function refreshExpertResults() {
    const wrap = document.getElementById("expert-results");
    if (wrap) wrap.innerHTML = renderExpertResults();
    document.querySelectorAll('[data-action="expert-filter"]').forEach((button) => {
      button.classList.toggle("is-active", button.dataset.value === state.expertFilter);
    });
    const clear = document.querySelector('[data-action="expert-clear"]');
    if (clear) clear.hidden = !state.expertSearch;
  }

  /* =========================================================
     Appointments
     ========================================================= */
  function appointmentFilterList() {
    return [
      { id: "all", label: "全部" },
      { id: "pending", label: "待接单" },
      { id: "accepted", label: "方案确认中" },
      { id: "confirmed", label: "已确认" },
      { id: "completed", label: "已完成" }
    ];
  }

  function renderAppointmentCard(appointment) {
    const doctor = doctorById(appointment.doctorId);
    const status = statusMeta(appointment.status);
    const assignee = appointmentAssignee(appointment);
    const date = parseDate(appointment.date);
    return `
      <article class="appointment-card" role="button" tabindex="0" data-action="open-appointment" data-appointment-id="${esc(
        appointment.id
      )}">
        <span class="appointment-card__top">
          ${statusPill(appointment.status)}
          <span class="appointment-card__date">${date ? `${formatMD(appointment.date)} ${weekday(date)}` : "待确认"}</span>
        </span>
        <h3>${esc(topicOf(appointment))}</h3>
        <div class="appointment-card__meta">
          <span>${icon("building", 13)} ${esc(appointment.orgName)}</span>
          <span>${icon("experts", 13)} ${esc(doctor ? doctor.name : "待院方安排")}</span>
        </div>
        ${
          assignee
            ? `<div class="appointment-card__assignee">${icon("user", 13)} 项目负责人 ${assigneeContactMarkup(
                assignee
              )}</div>`
            : ""
        }
        ${
          appointment.reply
            ? `<div class="appointment-card__reply">${icon("message", 14)} 院方已回复活动方案，点击查看课题与流程</div>`
            : `<div class="appointment-card__reply is-waiting">${icon("clock", 14)} ${esc(
                assignee ? "院方已接单，项目负责人正在确认方案" : status.help
              )}</div>`
        }
        <div class="appointment-card__footer">
          <span>${icon("clock", 13)} ${esc(appointment.time)}</span>
          <span>${esc(appointment.id)} ${icon("chevronRight", 13)}</span>
        </div>
      </article>
    `;
  }

  function renderAppointmentListHTML() {
    if (!state.session) return "";
    const all = appointmentsForUser(state.session.phone);
    const list =
      state.appointmentFilter === "all"
        ? all
        : all.filter((item) => item.status === state.appointmentFilter);
    if (!list.length) {
      return `
        <div class="empty-state">
          <span class="empty-state__icon">${icon("calendar", 26)}</span>
          <h3>${all.length ? "当前筛选下没有预约" : "还没有预约记录"}</h3>
          <p>${all.length ? "切换状态查看其他预约。" : "从一场贴合企业人群的健康活动开始。"}</p>
          <button class="btn btn--primary" type="button" data-action="open-booking">预约入企活动 ${icon(
            "arrowRight",
            15
          )}</button>
        </div>
      `;
    }
    return `<div class="appointment-list">${list.map(renderAppointmentCard).join("")}</div>`;
  }

  function renderAppointmentsPage() {
    if (!state.session) {
      return `
        <div class="screen">
          <header class="page-head">
            <span class="eyebrow"><i></i> My Appointments</span>
            <h1>我的预约</h1>
            <p>登录后查看预约进度与院方回复。</p>
          </header>
          <div class="login-required">
            <span class="login-required__icon">${icon("lock", 28)}</span>
            <h2>登录企业账号</h2>
            <p>登录后可提交预约、查看院方确认的课题、流程与时间安排，并在下次打开时继续保持登录状态。</p>
            <button class="btn btn--primary btn--block" type="button" data-action="start-login" data-pending="appointments">
              登录 / 注册 ${icon("arrowRight", 15)}
            </button>
          </div>
          <p class="source-note">演示环境使用手机号与验证码登录，验证码为 888888。</p>
        </div>
      `;
    }
    const all = appointmentsForUser(state.session.phone);
    return `
      <div class="screen">
        <header class="page-head">
          <span class="eyebrow"><i></i> My Appointments</span>
          <h1>我的预约</h1>
          <p id="appointment-count">共 ${all.length} 条预约记录，院方回复会同步显示在详情中。</p>
        </header>
        <div class="appointment-filter horizontal-scroll">
          ${appointmentFilterList()
            .map(
              (filter) => `
                <button class="chip-button ${state.appointmentFilter === filter.id ? "is-active" : ""}" type="button" data-action="appointment-filter" data-value="${filter.id}">
                  ${filter.label}
                </button>
              `
            )
            .join("")}
        </div>
        <div id="appointment-list">${renderAppointmentListHTML()}</div>
      </div>
    `;
  }

  function refreshAppointmentList() {
    const wrap = document.getElementById("appointment-list");
    if (wrap) wrap.innerHTML = renderAppointmentListHTML();
    const all = state.session ? appointmentsForUser(state.session.phone) : [];
    const count = document.getElementById("appointment-count");
    if (count) count.textContent = `共 ${all.length} 条预约记录，院方回复会同步显示在详情中。`;
    document.querySelectorAll('[data-action="appointment-filter"]').forEach((button) => {
      button.classList.toggle("is-active", button.dataset.value === state.appointmentFilter);
    });
  }

  /* =========================================================
     Me
     ========================================================= */
  function renderMePage() {
    const session = state.session;
    if (!session) {
      return `
        <div class="screen">
          <header class="page-head">
            <span class="eyebrow"><i></i> My Account</span>
            <h1>我的</h1>
            <p>登录企业账号，管理预约与企业信息。</p>
          </header>
          <div class="login-required">
            <span class="login-required__icon">${icon("user", 28)}</span>
            <h2>登录企业健康服务</h2>
            <p>登录状态会自动保存在当前浏览器，下次打开无需重复登录。</p>
            <button class="btn btn--primary btn--block" type="button" data-action="start-login" data-pending="me">
              登录 / 注册 ${icon("arrowRight", 15)}
            </button>
          </div>
          <div class="menu-group">
            <a class="menu-row" href="tel:01069006666">
              <span class="menu-row__icon is-orange">${icon("phone", 16)}</span>
              <span class="menu-row__label"><strong>联系项目组</strong><small>010-6900 6666</small></span>
              <span class="menu-row__chevron">${icon("chevronRight", 14)}</span>
            </a>
          </div>
          <p class="me-note">本页面为交互演示，登录、短信与业务数据需在正式版本接入后端。</p>
        </div>
      `;
    }
    const appointments = appointmentsForUser(session.phone);
    const pending = appointments.filter((item) => item.status === "pending").length;
    const inProgress = appointments.filter((item) => item.status === "accepted").length;
    const confirmed = appointments.filter(
      (item) => item.status === "confirmed" || item.status === "completed"
    ).length;
    return `
      <div class="screen">
        <header class="page-head">
          <span class="eyebrow"><i></i> My Account</span>
          <h1>我的</h1>
          <p>管理企业信息、预约记录与院方服务入口。</p>
        </header>
        <section class="profile-card">
          <div class="profile-card__top">
            <span class="profile-avatar">${esc(initialOf(session.name))}</span>
            <div class="profile-card__name">
              <h2>${esc(session.name)}</h2>
              <p>${esc(session.orgName)} · ${esc(session.title || session.orgType)}</p>
            </div>
            <button class="profile-card__edit" type="button" data-action="edit-profile" aria-label="编辑企业信息">
              ${icon("edit", 14)}
            </button>
          </div>
          <div class="profile-card__badges">
            <span class="profile-badge">${icon("building", 11)} ${esc(session.orgType)}</span>
            <span class="profile-badge">${icon("phone", 11)} ${phoneLink(
              session.contactPhone || session.phone,
              maskPhone(session.contactPhone || session.phone)
            )}</span>
            <span class="profile-badge">${icon("shield", 11)} 企业会员</span>
          </div>
          <div class="profile-stats">
            <div class="profile-stat"><strong>${appointments.length}</strong><span>全部预约</span></div>
            <div class="profile-stat"><strong>${pending}</strong><span>待接单</span></div>
            <div class="profile-stat"><strong>${inProgress}</strong><span>方案确认中</span></div>
            <div class="profile-stat"><strong>${confirmed}</strong><span>已确认</span></div>
          </div>
        </section>
        <div class="menu-group">
          <button class="menu-row" type="button" data-action="edit-profile">
            <span class="menu-row__icon is-blue">${icon("building", 16)}</span>
            <span class="menu-row__label"><strong>企业信息</strong><small>名称、联系人与机构类型</small></span>
            <span class="menu-row__chevron">${icon("chevronRight", 14)}</span>
          </button>
          <button class="menu-row" type="button" data-action="tab" data-tab="appointments">
            <span class="menu-row__icon">${icon("calendar", 16)}</span>
            <span class="menu-row__label"><strong>我的预约</strong><small>查看状态与院方回复</small></span>
            <span class="menu-row__value">${appointments.length} 条</span>
            <span class="menu-row__chevron">${icon("chevronRight", 14)}</span>
          </button>
          <button class="menu-row" type="button" data-action="reset-demo">
            <span class="menu-row__icon is-orange">${icon("settings", 16)}</span>
            <span class="menu-row__label"><strong>清除演示数据</strong><small>重置预约与登录状态</small></span>
            <span class="menu-row__chevron">${icon("chevronRight", 14)}</span>
          </button>
        </div>
        <button class="logout-button" type="button" data-action="logout">${icon("logout", 15)} 退出登录</button>
        <p class="me-note">登录状态保存在当前浏览器；正式版本需接入统一身份认证与业务后端。</p>
      </div>
    `;
  }

  /* =========================================================
     Login / profile
     ========================================================= */
  function startLogin(pending = null) {
    storeCurrentScroll();
    state.pendingAuth = pending;
    if (state.overlay) {
      clearOverlayState();
      document.body.classList.remove("is-locked");
    }
    state.overlayHistoryDepth = 0;
    if (state.historyDepth === 0) pushAppHistory("auth");
    state.authHistory = true;
    state.screen = "auth";
    clearOverlayState();
    state.login.step = 1;
    renderApp();
    restoreWindowScroll(0);
  }

  function readLoginFields() {
    const phone = document.getElementById("login-phone");
    const code = document.getElementById("login-code");
    if (phone) state.login.phone = phone.value.replace(/\D/g, "").slice(0, 11);
    if (code) state.login.code = code.value.replace(/\D/g, "").slice(0, 6);
  }

  function startCodeCountdown() {
    window.clearInterval(state.codeTimer);
    state.codeCountdown = 60;
    const paint = () => {
      const button = document.getElementById("send-code-btn");
      if (!button) return;
      button.disabled = state.codeCountdown > 0;
      button.textContent =
        state.codeCountdown > 0 ? `${state.codeCountdown}s 后重发` : "获取验证码";
    };
    paint();
    state.codeTimer = window.setInterval(() => {
      state.codeCountdown = Math.max(0, state.codeCountdown - 1);
      paint();
      if (!state.codeCountdown) window.clearInterval(state.codeTimer);
    }, 1000);
  }

  function renderAuthScreen() {
    const step = state.login.step;
    const bookingPending = state.pendingAuth?.type === "booking";
    const orgTypes = ["保险公司", "企业", "银行 / 财富机构", "其他机构"];
    return `
      <div class="auth-screen">
        <div class="auth-bar">
          <button class="auth-bar__back" type="button" data-action="${
            step === 2 ? "auth-step-back" : "auth-close"
          }" aria-label="${step === 2 ? "返回上一步" : "关闭登录"}">
            ${icon(step === 2 ? "chevronLeft" : "close", 17)}
          </button>
          <span class="auth-bar__label">${step === 2 ? "完善企业信息" : "企业健康服务"}</span>
          <span style="width:36px"></span>
        </div>
        <div class="auth-hero">
          <div class="auth-brand">
            <img src="assets/logo.svg" alt="北京大学国际医院">
            <div>
              <span>PEKING UNIVERSITY INTERNATIONAL HOSPITAL</span>
              <strong>名医入企 · 企业健康服务</strong>
            </div>
          </div>
          <h1>${step === 1 ? "登录后，<br>开始预约专家。" : "补充信息，<br>建立企业档案。"}</h1>
          <p>${
            step === 1
              ? bookingPending
                ? "登录后将继续您刚才选择的专家层级与活动日期。"
                : "一个账号即可管理企业活动需求、预约进度与院方回复。"
              : "信息仅用于院方项目组联络与活动方案沟通，可在「我的」中随时修改。"
          }</p>
        </div>
        ${
          step === 1
            ? `
              <div class="auth-card">
                <h2>手机号登录 / 注册</h2>
                <p class="auth-card__hint">无需关注公众号，直接使用手机号验证登录。未注册手机号验证后将自动创建企业账号，登录状态会保存在当前设备。</p>
                <div class="field">
                  <label for="login-phone">手机号码</label>
                  <div class="input-shell">
                    <span class="input-shell__prefix">+86</span>
                    <input id="login-phone" type="tel" inputmode="numeric" maxlength="11"
                      placeholder="请输入 11 位手机号" value="${esc(state.login.phone)}" autocomplete="tel">
                  </div>
                </div>
                <div class="field">
                  <label for="login-code">短信验证码 <span>演示验证码 888888</span></label>
                  <div class="input-shell">
                    ${icon("lock", 15)}
                    <input id="login-code" type="tel" inputmode="numeric" maxlength="6"
                      placeholder="请输入验证码" value="${esc(state.login.code)}" autocomplete="one-time-code"
                      style="padding-left:10px">
                    <button class="input-shell__action" id="send-code-btn" type="button" data-action="auth-send-code" ${
                      state.codeCountdown ? "disabled" : ""
                    }>${state.codeCountdown ? `${state.codeCountdown}s 后重发` : "获取验证码"}</button>
                  </div>
                </div>
                <label class="auth-agree">
                  <input id="login-agree" type="checkbox" data-login-agree ${state.login.agree ? "checked" : ""}>
                  <span>我已阅读并同意《企业健康服务说明》与《隐私保护条款》，同意院方项目组就预约事项与我联系。</span>
                </label>
                <button class="btn btn--primary auth-submit" type="button" data-action="auth-submit">
                  登录 / 注册 ${icon("arrowRight", 16)}
                </button>
                <button class="btn btn--soft btn--block" type="button" data-action="auth-demo" style="margin-top:9px;min-height:42px">
                  填入演示账号
                </button>
              </div>
              <div class="demo-box">
                <strong>演示账号</strong><br>
                手机号：138 0000 0001 · 验证码：888888
              </div>
            `
            : `
              <div class="auth-card">
                <h2>完善联系人与企业信息</h2>
                <p class="auth-card__hint">${esc(maskPhone(state.login.phone))} 已通过验证，请补充以下信息。</p>
                <div class="field">
                  <label for="profile-name">联系人姓名 <em>*</em></label>
                  <input id="profile-name" type="text" data-login-field="name" value="${esc(
                    state.login.name
                  )}" placeholder="如：王女士">
                </div>
                <div class="field">
                  <label for="profile-org">企业 / 机构名称 <em>*</em></label>
                  <input id="profile-org" type="text" data-login-field="orgName" value="${esc(
                    state.login.orgName
                  )}" placeholder="如：示例保险 · 高客健康服务部">
                </div>
                <div class="field">
                  <label>机构类型</label>
                  <div class="choice-grid">
                    ${orgTypes
                      .map(
                        (type) => `
                          <button class="choice-chip ${
                            state.login.orgType === type ? "is-selected" : ""
                          }" type="button" data-action="auth-org-type" data-value="${esc(type)}">${esc(
                            type
                          )}</button>
                        `
                      )
                      .join("")}
                  </div>
                </div>
                <div class="field">
                  <label for="profile-title">职务 / 部门</label>
                  <input id="profile-title" type="text" data-login-field="title" value="${esc(
                    state.login.title
                  )}" placeholder="如：客户健康负责人">
                </div>
                <div class="field">
                  <label for="profile-contact-phone">联系手机号 <span>默认登录手机号，可修改</span></label>
                  <input id="profile-contact-phone" type="tel" inputmode="numeric" maxlength="11"
                    data-login-field="contactPhone" value="${esc(
                      state.login.contactPhone || state.login.phone
                    )}" placeholder="用于院方项目组联络">
                </div>
                <button class="btn btn--primary auth-submit" type="button" data-action="auth-complete-profile">
                  完成并继续 ${icon("arrowRight", 16)}
                </button>
              </div>
            `
        }
        <p class="auth-foot">
          北京大学国际医院 · 企业健康项目组<br>
          本演示不会实际发送短信，账号与预约数据仅保存在当前浏览器。
        </p>
      </div>
    `;
  }

  function finishLogin(user) {
    const pending = state.pendingAuth;
    setLastPortal("client");
    setSession(user);
    state.pendingAuth = null;
    state.screen = "main";
    state.login.step = 1;
    state.codeCountdown = 0;
    window.clearInterval(state.codeTimer);
    if (pending?.type === "booking" && state.booking) {
      state.authHistory = false;
      state.reuseHistoryForOverlay = true;
      state.overlayHistoryDepth = 0;
      state.booking.orgName = state.booking.orgName || user.orgName || "";
      state.booking.orgType = state.booking.orgType || user.orgType || "保险公司";
      state.booking.contactName = state.booking.contactName || user.name || "";
      state.booking.contactTitle = state.booking.contactTitle || user.title || "";
      state.booking.phone = state.booking.phone || user.contactPhone || user.phone || "";
      state.overlay = { type: "booking" };
      renderApp();
      renderOverlay();
      return;
    }
    releaseAuthHistory();
    const targetTab = pending?.tab || state.tab || "home";
    state.tab = targetTab;
    state.overlay = null;
    renderApp({ scrollTo: storedScrollForView(`main:${targetTab}`) });
  }

  function submitLogin() {
    readLoginFields();
    const { phone, code, agree } = state.login;
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      showToast("请输入正确的 11 位手机号。");
      return;
    }
    if (code !== DEMO_CODE) {
      showToast("验证码不正确，演示验证码为 888888。");
      return;
    }
    if (!agree) {
      showToast("请先阅读并同意服务说明与隐私条款。");
      return;
    }
    const existing = getUser(phone);
    if (existing) {
      finishLogin(existing);
      showToast(`欢迎回来，${existing.name}。`);
      return;
    }
    state.login.step = 2;
    if (!state.login.orgType) state.login.orgType = "保险公司";
    state.login.contactPhone = state.login.contactPhone || phone;
    renderApp();
    window.scrollTo(0, 0);
  }

  function completeProfile() {
    const name = document.getElementById("profile-name");
    const orgName = document.getElementById("profile-org");
    const title = document.getElementById("profile-title");
    const contactPhone = document.getElementById("profile-contact-phone");
    if (name) state.login.name = name.value.trim();
    if (orgName) state.login.orgName = orgName.value.trim();
    if (title) state.login.title = title.value.trim();
    if (contactPhone) {
      state.login.contactPhone = contactPhone.value.replace(/\D/g, "").slice(0, 11);
    }
    if (!state.login.name) {
      showToast("请填写联系人姓名。");
      return;
    }
    if (!state.login.orgName) {
      showToast("请填写企业或机构名称。");
      return;
    }
    if (!state.login.contactPhone) state.login.contactPhone = state.login.phone;
    if (!/^1[3-9]\d{9}$/.test(state.login.contactPhone)) {
      showToast("请填写正确的联系手机号。");
      return;
    }
    const now = new Date().toISOString();
    const user = upsertUser({
      phone: state.login.phone,
      contactPhone: state.login.contactPhone,
      name: state.login.name,
      orgName: state.login.orgName,
      orgType: state.login.orgType,
      title: state.login.title,
      createdAt: now,
      updatedAt: now
    });
    finishLogin(user);
    showToast("企业账号已创建。");
  }

  /* =========================================================
     Booking flow
     ========================================================= */
  function defaultTopicFor(tierId) {
    if (tierId === "elite") return "企业家健康管理与高质量睡眠";
    if (tierId === "director") return "职场人群慢病风险与早期筛查";
    return "办公室人群的颈肩腰腿痛防护";
  }

  function cityData() {
    return state.chinaCities || {};
  }

  function provinceOptions() {
    return Object.keys(cityData());
  }

  function citiesForProvince(province) {
    const key = province && cityData()[province] ? province : provinceOptions()[0] || "北京市";
    return cityData()[key] || [key];
  }

  function normalizedProvince(province) {
    const values = provinceOptions();
    if (province && cityData()[province]) return province;
    return values.includes("北京市") ? "北京市" : values[0] || "北京市";
  }

  function normalizedCity(province, city) {
    const cities = citiesForProvince(province);
    return cities.includes(city) ? city : cities[0];
  }

  function renderProvinceOptions(selectedProvince) {
    const province = normalizedProvince(selectedProvince);
    return provinceOptions()
      .map(
        (item) =>
          `<option value="${esc(item)}" ${item === province ? "selected" : ""}>${esc(item)}</option>`
      )
      .join("");
  }

  function renderCityOptions(province, selectedCity) {
    const cities = citiesForProvince(province);
    return cities
      .map(
        (item) =>
          `<option value="${esc(item)}" ${item === selectedCity ? "selected" : ""}>${esc(
            item
          )}</option>`
      )
      .join("");
  }

  function createBookingDraft(tierId = "elite", date = "", slot = "") {
    const session = state.session || {};
    const tier = TIERS[tierId] ? tierId : "elite";
    const options = buildDateOptions(tier, 12);
    const selected =
      options.find((option) => option.iso === date && !option.full) ||
      options.find((option) => !option.full) ||
      options[0];
    const selectedSlot =
      selected?.slots.find((item) => item.id === slot && !item.full) ||
      selected?.slots.find((item) => !item.full) ||
      null;
    return {
      step: 1,
      tier,
      date: selected?.iso || "",
      slot: selectedSlot?.id || "",
      doctorId: "",
      topic: defaultTopicFor(tier),
      customTopic: "",
      format: "主题讲座 + 现场问答",
      audience: "50–100 人",
      province: normalizedProvince(session.province),
      city: normalizedCity(normalizedProvince(session.province), session.city),
      venue: "",
      orgType: session.orgType || "保险公司",
      orgName: session.orgName || "",
      contactName: session.name || "",
      contactTitle: session.title || "",
      phone: session.contactPhone || session.phone || "",
      email: "",
      address: "",
      locationPending: false,
      note: "",
      agree: false
    };
  }

  function openBooking(tierId, date, slot) {
    if (!state.session) {
      const draft = createBookingDraft(tierId || "elite", date || "", slot || "");
      state.booking = draft;
      startLogin({ type: "booking" });
      return;
    }
    state.booking = createBookingDraft(tierId || "elite", date || "", slot || "");
    state.overlay = { type: "booking" };
    renderOverlay();
  }

  function bookingDateOptions() {
    return buildDateOptions(state.booking?.tier || "elite", 12);
  }

  function bookingSlotOption() {
    return slotById(state.booking?.slot);
  }

  function renderBookingProgress(step) {
    return `
      <div class="flow-progress" aria-label="预约进度">
        ${[1, 2, 3]
          .map(
            (index) =>
              `<span class="${index < step ? "is-done" : index === step ? "is-active" : ""}"></span>`
          )
          .join("")}
      </div>
    `;
  }

  function renderBookingStepOne() {
    const booking = state.booking;
    const options = bookingDateOptions();
    const selectedDate = options.find((option) => option.iso === booking.date) || options[0];
    const slots = selectedDate?.slots || [];
    return `
      <h1 class="flow-title">选择专家层级<br>与活动时间</h1>
      <p class="flow-subtitle">不同层级对应不同的申请周期，可预约日期已按院方规则自动计算。</p>
      <section class="flow-block">
        <div class="flow-block__head"><h2>专家层级</h2><span>按活动规格选择</span></div>
        <div class="tier-options">
          ${TIER_ORDER.map(
            (tierId, index) => {
              const tier = TIERS[tierId];
              return `
                <button class="tier-option ${booking.tier === tierId ? "is-selected" : ""}" type="button"
                  data-action="booking-tier" data-value="${tierId}">
                  <span class="tier-option__num">0${index + 1}</span>
                  <span>
                    <strong>${tier.name}</strong>
                    <small>${doctorsForTier(tierId).length} 位 · ${tier.position} · ${tier.leadLabel}</small>
                  </span>
                  <span class="tier-option__check">${icon("check", 12)}</span>
                </button>
              `;
            }
          ).join("")}
        </div>
      </section>
      <section class="flow-block">
        <div class="flow-block__head"><h2>可预约日期</h2><span data-booking-lead>${TIERS[booking.tier].leadLabel}</span></div>
        <div class="date-scroll horizontal-scroll" id="booking-date-options">
          ${renderBookingDatePills(options, booking)}
        </div>
      </section>
      <section class="flow-block">
        <div class="flow-block__head"><h2>活动时段</h2><span data-booking-time-head>${formatDateCN(booking.date, true)}</span></div>
        <div class="slot-grid" id="booking-slot-grid">
          ${renderBookingSlotButtons(slots, booking)}
        </div>
      </section>
      ${renderBookingStepOneSummary(booking)}
    `;
  }

  function renderBookingDatePills(options, booking) {
    return options
      .map((option) =>
        renderDatePill(option, {
          action: "booking-date",
          selected: booking.date === option.iso
        })
      )
      .join("");
  }

  function renderBookingSlotButtons(slots, booking) {
    return slots
      .map(
        (slot) => `
          <button class="slot-button ${booking.slot === slot.id ? "is-selected" : ""}" type="button"
            data-action="booking-slot" data-value="${slot.id}" ${slot.full ? "disabled" : ""}>
            <span>${slot.label}</span>
            <small>${
              slot.capacity === 0
                ? "未开放"
                : slot.full
                ? "已约满"
                : `余 ${slot.remaining} 席`
            }</small>
          </button>
        `
      )
      .join("");
  }

  function renderBookingStepOneSummary(booking) {
    return `
      <div class="flow-summary" data-booking-step-one-summary>
        <span>已选：<strong>${TIERS[booking.tier].name}</strong></span>
        <span>${formatDateCN(booking.date)}</span>
        <span>${booking.slot ? bookingSlotOption().label : "待选择时段"}</span>
      </div>
    `;
  }

  function refreshBookingStepOneUi({ rebuildDates = false, rebuildSlots = false } = {}) {
    const booking = state.booking;
    if (!booking) return;
    const options = bookingDateOptions();
    const selectedDate = options.find((option) => option.iso === booking.date) || options[0];
    document.querySelectorAll('[data-action="booking-tier"]').forEach((button) => {
      button.classList.toggle("is-selected", button.dataset.value === booking.tier);
    });
    const dateOptions = document.getElementById("booking-date-options");
    if (dateOptions) {
      if (rebuildDates) {
        dateOptions.innerHTML = renderBookingDatePills(options, booking);
      } else {
        dateOptions.querySelectorAll('[data-action="booking-date"]').forEach((button) => {
          button.classList.toggle("is-selected", button.dataset.date === booking.date);
        });
      }
    }
    const slotGrid = document.getElementById("booking-slot-grid");
    if (slotGrid) {
      if (rebuildSlots) {
        slotGrid.innerHTML = renderBookingSlotButtons(selectedDate?.slots || [], booking);
      } else {
        slotGrid.querySelectorAll('[data-action="booking-slot"]').forEach((button) => {
          button.classList.toggle("is-selected", button.dataset.value === booking.slot);
        });
      }
    }
    const lead = document.querySelector("[data-booking-lead]");
    if (lead) lead.textContent = TIERS[booking.tier].leadLabel;
    const timeHead = document.querySelector("[data-booking-time-head]");
    if (timeHead) timeHead.textContent = formatDateCN(booking.date, true);
    const summary = document.querySelector("[data-booking-step-one-summary]");
    if (summary) summary.outerHTML = renderBookingStepOneSummary(booking);
  }

  function currentTopicChoices() {
    const doctor = doctorById(state.booking?.doctorId);
    const base = [
      defaultTopicFor(state.booking?.tier),
      "职场久坐人群的脊柱健康",
      "心血管风险与日常预防",
      "睡眠、压力与情绪管理",
      "体检报告中的常见异常解读"
    ];
    return [...new Set([...(doctor?.tags || []), ...base])].slice(0, 7);
  }

  function renderBookingStepTwo() {
    const booking = state.booking;
    const doctors = doctorsForTier(booking.tier);
    const selectedDoctor = doctorById(booking.doctorId);
    const appointments = getAppointments();
    const poolSlot = buildPoolTimeSlots(booking.tier, booking.date, appointments).find(
      (slot) => slot.id === booking.slot
    );
    const recommendationFull = !poolSlot || poolSlot.full;
    return `
      <h1 class="flow-title">安排专家<br>与活动主题</h1>
      <p class="flow-subtitle">可以不指定专家，提交后由院方项目人员根据课题与档期对接安排；也可以指定有档期的专家。</p>
      <section class="flow-block">
        <div class="flow-block__head"><h2>专家安排</h2><span>可不指定</span></div>
        <div class="doctor-options">
          <button class="doctor-option ${
            !booking.doctorId && !recommendationFull ? "is-selected" : ""
          } ${
            recommendationFull ? "is-unavailable" : ""
          }" type="button" data-action="booking-doctor" data-value="" ${
            recommendationFull ? "disabled" : ""
          }>
            <span class="doctor-option__photo doctor-option__photo--recommend">${icon("spark", 19)}</span>
            <span>
              <strong>不指定专家</strong>
              <small>${
                recommendationFull
                  ? "该时段院方统筹名额已满，可指定有档期专家"
                  : "由院方项目人员对接安排"
              }</small>
              <em class="doctor-option__availability ${
                recommendationFull ? "is-full" : ""
              }">${
                recommendationFull
                  ? "该时段统筹名额已满"
                  : `院方统筹余 ${poolSlot.remaining} 席`
              }</em>
            </span>
            <span class="doctor-option__check">${icon("check", 11)}</span>
          </button>
          <div class="doctor-options__divider">或指定专家</div>
          ${doctors
            .map((doctor) => {
              const slot = buildDoctorTimeSlots(doctor, booking.date, appointments).find(
                (item) => item.id === booking.slot
              );
              const unavailable = !slot || slot.full;
              return `
                <button class="doctor-option ${
                  booking.doctorId === String(doctor.id) ? "is-selected" : ""
                } ${unavailable ? "is-unavailable" : ""}" type="button"
                  data-action="booking-doctor" data-value="${esc(doctor.id)}" ${
                    unavailable ? "disabled" : ""
                  }>
                  <span class="doctor-option__photo"><img src="${esc(doctorPhoto(doctor))}" alt="${esc(
                    doctor.name
                  )}" loading="lazy" decoding="async"></span>
                  <span>
                    <strong>${esc(doctor.name)}</strong>
                    <small>${esc(doctor.dept)} · ${esc(doctor.title)}</small>
                    <em class="doctor-option__availability ${
                      unavailable ? "is-full" : ""
                    }">${unavailable ? "该时段已约满" : `该时段余 ${slot.remaining} 席`}</em>
                  </span>
                  <span class="doctor-option__check">${icon("check", 11)}</span>
                </button>
              `;
            })
            .join("")}
        </div>
      </section>
      <section class="flow-block">
        <div class="flow-block__head"><h2>活动课题</h2><span>可自定义</span></div>
        <div class="topic-chips" id="booking-topic-chips">
          ${renderBookingTopicChips(booking)}
        </div>
        <div class="field" style="margin-top:11px">
          <label for="booking-custom-topic">自定义课题 <span>选填</span></label>
          <input id="booking-custom-topic" type="text" data-booking-field="customTopic"
            value="${esc(booking.customTopic)}" placeholder="如：高净值客户家庭健康风险管理">
        </div>
      </section>
      <section class="flow-block">
        <div class="flow-block__head"><h2>活动形式与规模</h2><span>便于院方匹配方案</span></div>
        <div class="topic-chips" id="booking-format-chips">
          ${renderBookingFormatChips(booking)}
        </div>
        <div class="form-card">
          <div class="field">
            <label for="booking-audience">预计人数</label>
            <select id="booking-audience" data-booking-field="audience">
              ${["30–50 人", "50–100 人", "100–300 人", "300 人以上"].map(
                (value) =>
                  `<option value="${value}" ${booking.audience === value ? "selected" : ""}>${value}</option>`
              ).join("")}
            </select>
          </div>
        </div>
      </section>
      <div class="flow-summary" data-booking-step-two-summary>
        <span>${TIERS[booking.tier].name}</span>
        <span>${selectedDoctor ? esc(selectedDoctor.name) : "不指定专家"}</span>
        <span>${esc(booking.topic || defaultTopicFor(booking.tier))}</span>
      </div>
    `;
  }

  function renderBookingTopicChips(booking) {
    return currentTopicChoices()
      .map(
        (topic) => `
          <button class="topic-chip ${booking.topic === topic ? "is-selected" : ""}" type="button"
            data-action="booking-topic" data-value="${esc(topic)}">${esc(topic)}</button>
        `
      )
      .join("");
  }

  function renderBookingFormatChips(booking) {
    return ["主题讲座 + 现场问答", "专家健康咨询", "圆桌私享会", "员工健康嘉年华"]
      .map(
        (format) => `
          <button class="topic-chip ${booking.format === format ? "is-selected" : ""}" type="button"
            data-action="booking-format" data-value="${esc(format)}">${esc(format)}</button>
        `
      )
      .join("");
  }

  function refreshBookingStepTwoUi({ doctorChanged = false, formatChanged = false } = {}) {
    const booking = state.booking;
    if (!booking) return;
    if (doctorChanged) {
      document.querySelectorAll('[data-action="booking-doctor"]').forEach((button) => {
        button.classList.toggle(
          "is-selected",
          button.dataset.value === String(booking.doctorId || "")
        );
      });
      const topics = document.getElementById("booking-topic-chips");
      if (topics) topics.innerHTML = renderBookingTopicChips(booking);
    }
    if (formatChanged) {
      document.querySelectorAll('[data-action="booking-format"]').forEach((button) => {
        button.classList.toggle("is-selected", button.dataset.value === booking.format);
      });
    }
    const summary = document.querySelector("[data-booking-step-two-summary]");
    if (summary) {
      const doctor = doctorById(booking.doctorId);
      summary.innerHTML = `
        <span>${TIERS[booking.tier].name}</span>
        <span>${doctor ? esc(doctor.name) : "不指定专家"}</span>
        <span>${esc(booking.topic || defaultTopicFor(booking.tier))}</span>
      `;
    }
  }

  function renderBookingStepThree() {
    const booking = state.booking;
    const doctor = doctorById(booking.doctorId);
    const province = normalizedProvince(booking.province);
    const city = normalizedCity(province, booking.city);
    return `
      <h1 class="flow-title">确认活动信息<br>提交预约</h1>
      <p class="flow-subtitle">院方项目组将在收到需求后与您联系，确认专家、课题与最终执行方案。</p>
      <section class="flow-block">
        <div class="flow-block__head"><h2>企业与联系人</h2><span>用于院方项目组联络</span></div>
        <div class="form-card">
          <div class="field">
            <label for="booking-org">企业 / 机构名称 <em>*</em></label>
            <input id="booking-org" type="text" data-booking-field="orgName" value="${esc(
              booking.orgName
            )}" placeholder="请输入企业或机构全称">
          </div>
          <div class="field-row">
            <div class="field">
              <label for="booking-contact">联系人 <em>*</em></label>
              <input id="booking-contact" type="text" data-booking-field="contactName" value="${esc(
                booking.contactName
              )}" placeholder="姓名">
            </div>
            <div class="field">
              <label for="booking-contact-title">职务</label>
              <input id="booking-contact-title" type="text" data-booking-field="contactTitle" value="${esc(
                booking.contactTitle
              )}" placeholder="如：客户健康负责人">
            </div>
          </div>
          <div class="field-row">
            <div class="field">
              <label for="booking-phone">联系手机号 <em>*</em></label>
              <input id="booking-phone" type="tel" inputmode="numeric" maxlength="11"
                data-booking-field="phone" value="${esc(booking.phone)}" placeholder="手机号码">
              <small class="field-help">默认使用登录手机号，可修改</small>
            </div>
            <div class="field">
              <label for="booking-email">电子邮箱</label>
              <input id="booking-email" type="email" data-booking-field="email" value="${esc(
                booking.email
              )}" placeholder="选填">
            </div>
          </div>
        </div>
      </section>
      <section class="flow-block">
        <div class="flow-block__head"><h2>活动场地</h2><span>省市与详细地址用于院方安排</span></div>
        <div class="form-card">
          <div class="field">
            <label for="booking-venue">场地名称</label>
            <input id="booking-venue" type="text" data-booking-field="venue" value="${esc(
              booking.venue
            )}" placeholder="如：企业总部多功能厅">
          </div>
          <div class="field-row">
            <div class="field">
              <label for="booking-province">省份 <em>*</em></label>
              <select id="booking-province" data-booking-field="province">
                ${renderProvinceOptions(province)}
              </select>
            </div>
            <div class="field">
              <label for="booking-city">城市 <em>*</em></label>
              <select id="booking-city" data-booking-field="city">
                ${renderCityOptions(province, city)}
              </select>
            </div>
          </div>
          <div class="field">
            <label for="booking-address">详细地址 <em>*</em></label>
            <input id="booking-address" type="text" data-booking-field="address" value="${esc(
              booking.address
            )}" placeholder="请输入活动场地详细地址" required>
          </div>
          <div class="field">
            <label for="booking-note">活动备注 / 需求说明</label>
            <textarea id="booking-note" data-booking-field="note" placeholder="可填写人群特点、希望重点讲解的内容、现场条件等">${esc(
              booking.note
            )}</textarea>
          </div>
        </div>
      </section>
      <section class="flow-block">
        <div class="flow-block__head"><h2>项目跟进</h2><span>院方项目负责人专属服务</span></div>
        <div class="booking-followup-card">
          <span class="booking-followup-card__icon">${icon("message", 18)}</span>
          <div>
            <strong>院方确认方案后，将由项目负责人短信联系您</strong>
            <p>短信会使用确认后的课题、活动时间、场地和院方联系人信息生成，并由院方项目人员通过手机发送。</p>
          </div>
        </div>
      </section>
      <section class="flow-block">
        <div class="form-card" style="background:#f9fafc">
          <div class="review-info" style="margin-top:0">
            <div class="review-info__row"><span>专家层级</span><strong>${TIERS[booking.tier].name}</strong></div>
            <div class="review-info__row"><span>专家安排</span><strong>${esc(doctor ? `${doctor.name} · ${doctor.dept}` : "不指定专家 · 院方统筹安排")}</strong></div>
            <div class="review-info__row"><span>活动课题</span><strong>${esc(booking.topic)}</strong></div>
            <div class="review-info__row"><span>活动时间</span><strong>${formatDateCN(booking.date, true)} ${esc(
              bookingSlotOption().label
            )}</strong></div>
            <div class="review-info__row"><span>活动形式</span><strong>${esc(booking.format)}</strong></div>
          </div>
          ${booking.customTopic ? `<p class="form-hint">补充课题：${esc(booking.customTopic)}</p>` : ""}
        </div>
        <label class="agree-row">
          <input id="booking-agree" type="checkbox" data-booking-agree ${booking.agree ? "checked" : ""}>
          <span>我确认以上信息真实有效，并同意院方项目组就本次预约与我联系。最终专家与活动安排以院方确认为准。</span>
        </label>
      </section>
    `;
  }

  function renderBookingSuccess() {
    const appointment = getAppointments().find((item) => item.id === state.lastAppointmentId);
    if (!appointment) return "";
    const doctor = doctorById(appointment.doctorId);
    return `
      <div class="success-screen">
        <span class="success-mark">${icon("check", 34)}</span>
        <h1>预约已提交</h1>
        <p>院方项目组已收到活动需求，正在匹配专家与档期。回复内容会同步到「我的预约」。</p>
        <div class="ticket">
          <div class="ticket__head">
            <div><small>APPOINTMENT NO.</small><strong>${esc(appointment.id)}</strong></div>
            ${statusPill(appointment.status)}
          </div>
          <div class="ticket__body">
            <div class="ticket-row"><span>预约层级</span><strong>${TIERS[appointment.tier].name}</strong></div>
            <div class="ticket-row"><span>拟邀专家</span><strong>${esc(
              doctor ? `${doctor.name} · ${doctor.dept}` : "不指定专家 · 院方统筹安排"
            )}</strong></div>
            <div class="ticket-row"><span>活动课题</span><strong>${esc(topicOf(appointment))}</strong></div>
            <div class="ticket-row"><span>活动时间</span><strong>${formatDateCN(
              appointment.date,
              true
            )}<br>${esc(appointment.time)}</strong></div>
            <div class="ticket-row"><span>企业机构</span><strong>${esc(appointment.orgName)}</strong></div>
          </div>
        </div>
        <div class="success-reminder">
          ${icon("bell", 16)}
          <p>院方确认活动方案后，项目负责人会通过手机短信联系您。也可以在「我的预约」查看最新进度。</p>
        </div>
        <div class="success-actions">
          <button class="btn btn--primary" type="button" data-action="success-appointment" data-appointment-id="${esc(
            appointment.id
          )}">查看预约详情 ${icon("arrowRight", 15)}</button>
          <button class="btn btn--ghost" type="button" data-action="booking-close">返回首页</button>
          <button class="btn btn--soft" type="button" data-action="success-appointments">我的预约</button>
        </div>
        <span class="demo-note">本页面为演示环境，短信记录仅保存在当前浏览器。</span>
      </div>
    `;
  }

  function renderBookingFlow() {
    const booking = state.booking;
    if (!booking) return "";
    if (booking.step === "done") {
      return `<div class="flow">${renderBookingSuccess()}</div>`;
    }
    const step = Number(booking.step) || 1;
    return `
      <div class="flow">
        <header class="flow__bar">
          <button class="flow__close" type="button" data-action="booking-close" aria-label="关闭预约">
            ${icon("close", 16)}
          </button>
          <div><h1>预约入企活动</h1><small>第 ${step} 步 / 共 3 步</small></div>
          <span></span>
        </header>
        ${renderBookingProgress(step)}
        <div class="flow__body">
          ${step === 1 ? renderBookingStepOne() : step === 2 ? renderBookingStepTwo() : renderBookingStepThree()}
        </div>
        <footer class="flow__footer">
          <button class="btn btn--ghost btn--back" type="button" data-action="${
            step === 1 ? "booking-close" : "booking-back"
          }">${step === 1 ? "取消" : "上一步"}</button>
          <button class="btn btn--primary" type="button" data-action="${
            step === 3 ? "booking-submit" : "booking-next"
          }">${step === 3 ? "提交预约" : "下一步"} ${icon("arrowRight", 15)}</button>
        </footer>
      </div>
    `;
  }

  function validateBookingStep(step) {
    const booking = state.booking;
    if (step === 1) {
      if (!booking.date) {
        showToast("请选择活动日期。");
        return false;
      }
      if (!booking.slot) {
        showToast("请选择活动时段。");
        return false;
      }
      return true;
    }
    if (step === 2) {
      if (!booking.topic && !booking.customTopic.trim()) {
        showToast("请选择或填写活动课题。");
        return false;
      }
      const doctor = booking.doctorId ? doctorById(booking.doctorId) : null;
      const availability = doctor
        ? buildDoctorTimeSlots(doctor, booking.date).find((slot) => slot.id === booking.slot)
        : buildPoolTimeSlots(booking.tier, booking.date).find(
            (slot) => slot.id === booking.slot
          );
      if (!availability || availability.full) {
        showToast(
          doctor
            ? "该专家在所选时段已约满，请重新选择专家或时段。"
            : "该时段院方统筹名额已满，请指定一位有档期的专家。"
        );
        return false;
      }
      return true;
    }
    if (!booking.orgName.trim()) {
      showToast("请填写企业或机构名称。");
      return false;
    }
    if (!booking.contactName.trim()) {
      showToast("请填写联系人姓名。");
      return false;
    }
    if (!/^1[3-9]\d{9}$/.test(booking.phone)) {
      showToast("请填写正确的联系人手机号。");
      return false;
    }
    if (!booking.province || !booking.city) {
      showToast("请选择活动省份和城市。");
      return false;
    }
    if (!booking.address.trim()) {
      showToast("请填写活动详细地址。");
      return false;
    }
    if (!booking.agree) {
      showToast("请确认预约信息并同意服务说明。");
      return false;
    }
    return true;
  }

  function submitBooking() {
    const booking = state.booking;
    if (!booking || !validateBookingStep(3)) return;
    if (!state.session) {
      startLogin({ type: "booking" });
      return;
    }
    const availableSlot = buildTierTimeSlots(booking.tier, booking.date).find(
      (item) => item.id === booking.slot
    );
    if (!availableSlot || availableSlot.full) {
      showToast("该时段号源刚刚被约满，请重新选择可预约时段。");
      state.booking.slot = "";
      renderOverlay();
      return;
    }
    const selectedDoctor = booking.doctorId ? doctorById(booking.doctorId) : null;
    if (selectedDoctor) {
      const doctorSlot = buildDoctorTimeSlots(selectedDoctor, booking.date).find(
        (item) => item.id === booking.slot
      );
      if (!doctorSlot || doctorSlot.full) {
        showToast("该专家在所选时段已约满，请重新选择专家或时段。");
        state.booking.doctorId = "";
        state.booking.step = 2;
        renderOverlay();
        return;
      }
    } else {
      const poolSlot = buildPoolTimeSlots(booking.tier, booking.date).find(
        (item) => item.id === booking.slot
      );
      if (!poolSlot || poolSlot.full) {
        showToast("该时段院方统筹名额已满，请指定专家后重新提交。");
        state.booking.step = 2;
        renderOverlay();
        return;
      }
    }
    const slot = slotById(booking.slot);
    const appointment = {
      id: generateAppointmentId(),
      createdAt: new Date().toISOString(),
      updatedAt: "",
      status: "pending",
      demo: true,
      ownerPhone: state.session.phone,
      tier: booking.tier,
      doctorId: booking.doctorId,
      date: booking.date,
      slot: booking.slot,
      time: slot.label,
      topic: booking.topic,
      customTopic: booking.customTopic.trim(),
      format: booking.format,
      audience: booking.audience,
      province: normalizedProvince(booking.province),
      city: booking.city,
      venue: booking.venue.trim() || booking.address.trim(),
      orgType: booking.orgType,
      orgName: booking.orgName.trim(),
      contactName: booking.contactName.trim(),
      contactTitle: booking.contactTitle.trim(),
      phone: booking.phone,
      email: booking.email.trim(),
      address: booking.address.trim(),
      locationPending: Boolean(booking.locationPending),
      note: booking.note.trim(),
      internalNote: "",
      smsFollowUp: null,
      assignedStaff: null,
      acceptedAt: null,
      reply: null
    };
    const items = getAppointments();
    items.unshift(appointment);
    saveAppointments(items);
    state.lastAppointmentId = appointment.id;
    state.booking.step = "done";
    renderOverlay();
    window.scrollTo(0, 0);
  }

  /* =========================================================
     Sheets
     ========================================================= */
  function renderOverlay() {
    if (!overlayRoot) return;
    const hadOverlay = Boolean(overlayRoot.querySelector(".sheet, .flow"));
    const previousBody = overlayRoot.querySelector(".sheet__body, .flow__body");
    const previousScroll = previousBody?.scrollTop || 0;
    if (state.overlay && !hadOverlay) pushOverlayHistory();
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
    if (state.overlay?.type === "booking") {
      paint(renderBookingFlow());
      return;
    }
    if (state.overlay?.type === "doctor") {
      paint(renderDoctorSheet());
      return;
    }
    if (state.overlay?.type === "poster") {
      paint(renderPosterSheet());
      return;
    }
    if (state.overlay?.type === "appointment") {
      paint(renderAppointmentSheet());
      return;
    }
    if (state.overlay?.type === "location") {
      paint(renderLocationSheet());
      return;
    }
    if (state.overlay?.type === "profile") {
      paint(renderProfileSheet());
      return;
    }
    if (state.overlay?.type === "review") {
      paint(renderReviewSheet());
      return;
    }
    if (state.overlay?.type === "account") {
      paint(renderAdminAccountSheet());
      return;
    }
    if (state.overlay?.type === "doctor-admin") {
      paint(renderAdminDoctorSheet());
      return;
    }
    if (!state.overlay) {
      overlayRoot.innerHTML = "";
      document.body.classList.remove("is-locked");
    }
  }

  function openDoctorSheet(id) {
    if (!doctorById(id)) return;
    state.overlay = { type: "doctor", doctorId: String(id) };
    renderOverlay();
  }

  function renderDoctorSheet() {
    const doctor = doctorById(state.overlay?.doctorId);
    if (!doctor) return "";
    const tier = tierOf(doctor);
    return `
      <div class="sheet-backdrop" data-action="close-overlay"></div>
      <section class="sheet" role="dialog" aria-modal="true" aria-label="${esc(doctor.name)}专家详情">
        <div class="sheet__grabber doctor-hero__grabber"></div>
        <div class="doctor-hero">
          <img class="doctor-hero__backdrop" src="${esc(doctorPhoto(doctor, "detail"))}" alt=""
            aria-hidden="true" decoding="async">
          <img class="doctor-hero__portrait" src="${esc(doctorPhoto(doctor, "detail"))}" alt="${esc(
            doctor.name
          )}" decoding="async">
          <button class="doctor-hero__close" type="button" data-action="close-overlay" aria-label="关闭">
            ${icon("close", 15)}
          </button>
          <div class="doctor-hero__content">
            <span class="doctor-hero__tier">${esc(tier.name)} · ${esc(tier.leadLabel)}</span>
            <h1>${esc(doctor.name)}</h1>
            <p>${esc(doctor.title)} · ${esc(doctor.dept)}</p>
          </div>
        </div>
        <div class="sheet__body">
          <div class="doctor-sheet-content">
            <div class="doctor-facts">
              ${(doctor.tags || [])
                .map((tag) => `<span class="doctor-fact">${esc(tag)}</span>`)
                .join("")}
            </div>
            <section class="detail-section">
              <h3>擅长方向</h3>
              <p>${esc(cleanDoctorText(doctor.specialty) || "以院方最终确认的专家资料为准。")}</p>
            </section>
            <section class="detail-section">
              <h3>专家简介</h3>
              <div class="doctor-quote">${esc(
                cleanDoctorText(doctor.intro) || "专家简介请以医院官网公开资料为准。"
              )}</div>
            </section>
            <section class="detail-section">
              <h3>入企活动建议</h3>
              <p>可围绕「${esc(
                (doctor.tags || [])[0] || doctor.dept
              )}」设计主题讲座、现场问答或一对一健康咨询。具体课题与流程由院方项目组结合企业人群特点共同确认。</p>
            </section>
            <div class="source-row">
              <span>${
                doctor.profileUrl
                  ? "资料来自北京大学国际医院官网公开信息"
                  : "院方内部配置资料，官网暂未收录"
              }</span>
              ${
                doctor.profileUrl
                  ? `<a href="${esc(
                      doctor.profileUrl
                    )}" target="_blank" rel="noopener noreferrer">查看官网 ${icon(
                      "arrowUpRight",
                      12
                    )}</a>`
                  : ""
              }
            </div>
          </div>
        </div>
        <div class="sheet__footer">
          <button class="btn btn--ghost" type="button" data-action="close-overlay">返回</button>
          <button class="btn btn--primary" type="button" data-action="book-doctor" data-doctor-id="${esc(
            doctor.id
          )}">预约该专家 ${icon("arrowRight", 15)}</button>
        </div>
      </section>
    `;
  }

  function openAppointmentSheet(id) {
    const appointment = getAppointments().find((item) => item.id === id);
    if (!appointment) {
      showToast("未找到该预约记录。");
      return;
    }
    if (state.session && appointment.ownerPhone !== state.session.phone && !state.adminAuthed) {
      showToast("该预约不属于当前账号。");
      return;
    }
    state.overlay = { type: "appointment", appointmentId: id };
    renderOverlay();
  }

  function renderReplyPanel(reply, appointment) {
    if (!reply) return "";
    const assignee = appointmentAssignee(appointment);
    return `
      <section class="reply-panel">
        <h3>${icon("checkCircle", 14)} 院方活动方案</h3>
        <div class="reply-line"><span>活动课题</span><div>${esc(reply.topic || "待确认")}</div></div>
        <div class="reply-line"><span>出讲专家</span><div>${esc(reply.speaker || "待院方安排")}</div></div>
        <div class="reply-line"><span>活动形式</span><div>${esc(reply.format || "待确认")}</div></div>
        <div class="reply-line"><span>活动时间</span><div>${esc(reply.schedule || "待确认")}</div></div>
        ${appointment ? `<div class="reply-line"><span>活动地点</span><div>${appointmentLocationMarkup(appointment)}</div></div>` : ""}
        ${reply.outline ? `<div class="reply-line"><span>课题大纲</span><div>${esc(reply.outline)}</div></div>` : ""}
        ${reply.agenda ? `<div class="reply-line"><span>活动流程</span><div>${esc(reply.agenda)}</div></div>` : ""}
        ${
          assignee
            ? `<div class="reply-line"><span>项目组</span><div>${assigneeContactMarkup(assignee)}</div></div>`
            : ""
        }
        ${reply.message ? `<div class="reply-message">${esc(reply.message)}</div>` : ""}
      </section>
    `;
  }

  function renderAppointmentSheet() {
    const appointment = getAppointments().find(
      (item) => item.id === state.overlay?.appointmentId
    );
    if (!appointment) return "";
    const doctor = doctorById(appointment.doctorId);
    const meta = statusMeta(appointment.status);
    const assignee = appointmentAssignee(appointment);
    return `
      <div class="sheet-backdrop" data-action="close-overlay"></div>
      <section class="sheet" role="dialog" aria-modal="true" aria-label="预约详情">
        <div class="sheet__grabber"></div>
        <div class="sheet__bar">
          <h2>预约详情</h2>
          <button class="sheet__close" type="button" data-action="close-overlay" aria-label="关闭">
            ${icon("close", 15)}
          </button>
        </div>
        <div class="sheet__body">
          <div class="appointment-sheet">
            <div class="appointment-detail-hero">
              ${statusPill(appointment.status)}
              <h1>${esc(topicOf(appointment))}</h1>
              <p>${esc(meta.help)}</p>
            </div>
            <div class="detail-grid">
              <div class="detail-cell"><small>预约编号</small><strong>${esc(appointment.id)}</strong></div>
              <div class="detail-cell"><small>专家层级</small><strong>${esc(
                (TIERS[appointment.tier] || TIERS.specialist).name
              )}</strong></div>
              <div class="detail-cell"><small>拟邀专家</small><strong>${esc(
                doctor ? `${doctor.name} · ${doctor.dept}` : "待院方安排"
              )}</strong></div>
              <div class="detail-cell"><small>活动时间</small><strong>${formatDateCN(
                appointment.date,
                true
              )}<br>${esc(appointment.time)}</strong></div>
              <div class="detail-cell"><small>活动形式</small><strong>${esc(
                appointment.format || "待确认"
              )}</strong></div>
              <div class="detail-cell"><small>预计人数</small><strong>${esc(
                appointment.audience || "待确认"
              )}</strong></div>
              <div class="detail-cell" style="grid-column:1/-1"><small>企业机构</small><strong>${esc(
                appointment.orgName
              )}</strong></div>
              <div class="detail-cell" style="grid-column:1/-1"><small>联系人</small><strong>${esc(
                `${appointment.contactName || "--"} ${appointment.contactTitle || ""}`
              )} · ${phoneLink(appointment.phone, appointment.phone)}</strong></div>
              <div class="detail-cell detail-cell--location" style="grid-column:1/-1">
                <small>活动地点</small>
                <strong>${appointmentLocationMarkup(appointment)}</strong>
                <button type="button" class="detail-cell__edit" data-action="edit-location" data-appointment-id="${esc(
                  appointment.id
                )}">更新地点</button>
              </div>
            </div>
            ${
              assignee
                ? `<section class="project-contact-card">
                    <span class="project-contact-card__avatar">${esc(initialOf(assignee.name))}</span>
                    <div>
                      <small>本次项目负责人</small>
                      <strong>${esc(assignee.name)}</strong>
                      <p>${phoneLink(assignee.phone, assignee.phone)}</p>
                    </div>
                    <a class="project-contact-card__call" href="${esc(
                      phoneHref(assignee.phone)
                    )}">${icon("phone", 14)} 拨打</a>
                  </section>`
                : `<section class="project-contact-card is-pending">
                    <span class="project-contact-card__avatar">${icon("clock", 16)}</span>
                    <div>
                      <small>项目对接人</small>
                      <strong>待院方接单后显示</strong>
                      <p>提交需求后，由院方项目人员接单并负责后续方案沟通。</p>
                    </div>
                  </section>`
            }
            ${
              appointment.note
                ? `<section class="detail-section"><h3>活动需求</h3><p>${esc(
                    appointment.note
                  )}</p></section>`
                : ""
            }
            ${
              appointment.reply
                ? renderReplyPanel(appointment.reply, appointment)
                : `<div class="reply-waiting">
                    <span class="reply-waiting__icon">${icon("clock", 16)}</span>
                    <div><strong>${assignee ? "院方正在确认活动方案" : "等待院方接单"}</strong><p>${esc(
                      meta.help
                    )} 方案回复后将在这里同步显示课题、流程与时间安排。</p></div>
                  </div>`
            }
            <div class="reminder-note">
              ${icon("bell", 14)}
              <p>院方确认活动方案后，项目负责人会通过手机短信或电话与您联系。演示环境不会调用自动短信网关。</p>
            </div>
            <p class="source-note" style="padding:12px 0 0">最后更新：${
              appointment.updatedAt ? formatDateTime(appointment.updatedAt) : formatDateTime(appointment.createdAt)
            }</p>
          </div>
        </div>
        <div class="sheet__footer">
          <a class="btn btn--ghost" href="tel:01069006666">${icon("phone", 15)} 联系项目组</a>
          <button class="btn btn--primary" type="button" data-action="close-overlay">我知道了</button>
        </div>
      </section>
    `;
  }

  function openLocationEditor(appointmentId) {
    const appointment = getAppointments().find((item) => item.id === appointmentId);
    if (!appointment) {
      showToast("未找到该预约记录。");
      return;
    }
    if (state.session && appointment.ownerPhone !== state.session.phone && !state.adminAuthed) {
      showToast("该预约不属于当前账号。");
      return;
    }
    const province = normalizedProvince(appointment.province);
    state.locationDraft = {
      appointmentId,
      province,
      city: normalizedCity(province, appointment.city),
      venue: appointment.venue || "",
      address: appointment.address || "",
      locationPending: Boolean(appointment.locationPending)
    };
    if (state.historyDepth > 0 && pushAppHistory("location")) {
      state.overlayHistoryDepth += 1;
    }
    state.overlay = { type: "location", appointmentId };
    renderOverlay();
  }

  function renderLocationSheet() {
    const draft = state.locationDraft;
    if (!draft) return "";
    return `
      <div class="sheet-backdrop" data-action="close-location"></div>
      <section class="sheet" role="dialog" aria-modal="true" aria-label="更新活动地点">
        <div class="sheet__grabber"></div>
        <div class="sheet__bar">
          <h2>更新活动地点</h2>
          <button class="sheet__close" type="button" data-action="close-location" aria-label="返回预约详情">
            ${icon("close", 15)}
          </button>
        </div>
        <div class="sheet__body">
          <div style="padding:8px 18px 22px">
            <p class="form-hint" style="margin:0 0 12px">活动地点可在接单后继续调整，保存后会同步给院方项目组，并用于最新的方案与短信内容。</p>
            <div class="form-card" style="margin-top:0">
              <label class="switch-row">
                <span class="switch-row__label"><strong>活动地点待确认</strong><small>开启后，省市场地信息暂不作为已确认安排</small></span>
                <span class="switch"><input type="checkbox" data-location-pending ${
                  draft.locationPending ? "checked" : ""
                }><span></span></span>
              </label>
              <div class="field-row">
                <div class="field">
                  <label for="location-province">省份</label>
                  <select id="location-province" data-location-field="province">
                    ${renderProvinceOptions(draft.province)}
                  </select>
                </div>
                <div class="field">
                  <label for="location-city">城市</label>
                  <select id="location-city" data-location-field="city">
                    ${renderCityOptions(draft.province, draft.city)}
                  </select>
                </div>
              </div>
              <div class="field">
                <label for="location-venue">场地名称</label>
                <input id="location-venue" type="text" data-location-field="venue"
                  value="${esc(draft.venue)}" placeholder="如：企业总部多功能厅">
              </div>
              <div class="field">
                <label for="location-address">详细地址 ${draft.locationPending ? "<span>待确认时可暂不填写</span>" : "<em>*</em>"}</label>
                <input id="location-address" type="text" data-location-field="address"
                  value="${esc(draft.address)}" placeholder="请输入活动场地详细地址">
              </div>
            </div>
          </div>
        </div>
        <div class="sheet__footer">
          <button class="btn btn--ghost" type="button" data-action="close-location">取消</button>
          <button class="btn btn--primary" type="button" data-action="save-location">保存地点</button>
        </div>
      </section>
    `;
  }

  function saveLocation() {
    const draft = state.locationDraft;
    if (!draft) return;
    document.querySelectorAll("[data-location-field]").forEach((field) => {
      draft[field.dataset.locationField] = field.value.trim();
    });
    const pending = document.querySelector("[data-location-pending]");
    if (pending) draft.locationPending = pending.checked;
    const province = normalizedProvince(draft.province);
    const city = normalizedCity(province, draft.city);
    if (!draft.locationPending && !draft.address) {
      showToast("请填写活动详细地址，或开启“活动地点待确认”。");
      return;
    }
    const now = new Date().toISOString();
    const items = getAppointments().map((item) =>
      item.id === draft.appointmentId
        ? {
            ...item,
            province,
            city,
            venue: draft.venue || (draft.locationPending ? "" : draft.address),
            address: draft.address,
            locationPending: draft.locationPending,
            updatedAt: now
          }
        : item
    );
    saveAppointments(items);
    const id = draft.appointmentId;
    state.locationDraft = null;
    if (state.overlayHistoryDepth > 1) releaseOverlayHistory(1);
    state.overlay = { type: "appointment", appointmentId: id };
    renderOverlay();
    refreshAppointmentList();
    showToast("活动地点已更新，院方项目组将看到最新信息。");
  }

  function renderProfileSheet() {
    const draft = state.profileDraft || state.session;
    if (!draft) return "";
    return `
      <div class="sheet-backdrop" data-action="close-overlay"></div>
      <section class="sheet" role="dialog" aria-modal="true" aria-label="编辑企业信息">
        <div class="sheet__grabber"></div>
        <div class="sheet__bar">
          <h2>编辑企业信息</h2>
          <button class="sheet__close" type="button" data-action="close-overlay" aria-label="关闭">
            ${icon("close", 15)}
          </button>
        </div>
        <div class="sheet__body">
          <div style="padding:8px 18px 20px">
            <div class="form-card" style="margin-top:0">
              <div class="field">
                <label for="edit-profile-name">联系人姓名</label>
                <input id="edit-profile-name" type="text" data-profile-field="name" value="${esc(
                  draft.name
                )}">
              </div>
              <div class="field">
                <label for="edit-profile-org">企业 / 机构名称</label>
                <input id="edit-profile-org" type="text" data-profile-field="orgName" value="${esc(
                  draft.orgName
                )}">
              </div>
              <div class="field">
                <label for="edit-profile-type">机构类型</label>
                <select id="edit-profile-type" data-profile-field="orgType">
                  ${["保险公司", "企业", "银行 / 财富机构", "其他机构"].map(
                    (type) =>
                      `<option value="${esc(type)}" ${
                        draft.orgType === type ? "selected" : ""
                      }>${esc(type)}</option>`
                  ).join("")}
                </select>
              </div>
              <div class="field">
                <label for="edit-profile-title">职务 / 部门</label>
                <input id="edit-profile-title" type="text" data-profile-field="title" value="${esc(
                  draft.title || ""
                )}">
              </div>
              <div class="field">
                <label for="edit-profile-contact">联系手机号 <span>默认登录手机号，可修改</span></label>
                <input id="edit-profile-contact" type="tel" inputmode="numeric" maxlength="11"
                  data-profile-field="contactPhone" value="${esc(
                    draft.contactPhone || draft.phone || ""
                  )}">
              </div>
              <div class="field">
                <label>登录手机号</label>
                <div class="input-shell" style="opacity:.65">
                  <span class="input-shell__prefix">+86</span>
                  <input type="tel" value="${esc(draft.phone)}" disabled>
                </div>
              </div>
            </div>
            <p class="form-hint">企业信息仅用于院方项目组联络与活动方案沟通。</p>
          </div>
        </div>
        <div class="sheet__footer">
          <button class="btn btn--ghost" type="button" data-action="close-overlay">取消</button>
          <button class="btn btn--primary" type="button" data-action="save-profile">保存信息</button>
        </div>
      </section>
    `;
  }

  function saveProfile() {
    const draft = state.profileDraft;
    if (!draft) return;
    document.querySelectorAll("[data-profile-field]").forEach((input) => {
      draft[input.dataset.profileField] = input.value.trim();
    });
    if (!draft.name) {
      showToast("联系人姓名不能为空。");
      return;
    }
    if (!draft.orgName) {
      showToast("企业或机构名称不能为空。");
      return;
    }
    if (!/^1[3-9]\d{9}$/.test(draft.contactPhone || "")) {
      showToast("请填写正确的联系手机号。");
      return;
    }
    const user = upsertUser({ ...draft, updatedAt: new Date().toISOString() });
    setSession(user);
    state.profileDraft = null;
    releaseOverlayHistory();
    clearOverlayState();
    renderApp();
    showToast("企业信息已更新。");
  }

  /* =========================================================
     Hospital workbench
     ========================================================= */
  function openAdmin() {
    if (state.overlay) {
      clearOverlayState();
      document.body.classList.remove("is-locked");
    }
    state.overlayHistoryDepth = 0;
    if (state.historyDepth === 0) pushAppHistory("admin");
    state.adminHistory = true;
    state.overlay = null;
    state.screen = state.adminAuthed ? "admin" : "admin-login";
    if (state.adminAuthed) setLastPortal("admin");
    state.adminLogin.error = "";
    renderApp();
    window.scrollTo(0, 0);
  }

  function renderAdminLogin() {
    return `
      <div class="auth-screen">
        <div class="auth-bar">
          <button class="auth-bar__back" type="button" data-action="admin-close" aria-label="返回客户端">
            ${icon("chevronLeft", 17)}
          </button>
          <span class="auth-bar__label">院方工作台</span>
          <span style="width:36px"></span>
        </div>
        <div class="admin-login-hero">
          <img src="assets/logo.svg" alt="北京大学国际医院">
          <h1>院方项目组<br>工作台</h1>
          <p>仅限系统管理员已分配并启用的项目账号登录，用于处理预约、回复方案与发送客户提醒。</p>
        </div>
        <div class="auth-card" style="margin-top:26px">
          <h2>内部账号登录</h2>
          <p class="auth-card__hint">账号与角色由院方系统管理员统一分配，未分配账号无法进入工作台。</p>
          <div class="field">
            <label for="admin-username">账号</label>
            <input id="admin-username" type="text" value="${esc(
              state.adminLogin.username
            )}" placeholder="请输入内部账号" autocomplete="username">
          </div>
          <div class="field">
            <label for="admin-password">密码</label>
            <input id="admin-password" type="password" value="${esc(
              state.adminLogin.password
            )}" placeholder="请输入密码" autocomplete="current-password">
          </div>
          ${
            state.adminLogin.error
              ? `<p class="form-hint" style="color:var(--red)">${esc(state.adminLogin.error)}</p>`
              : ""
          }
          <button class="btn btn--primary auth-submit" type="button" data-action="admin-login">
            进入工作台 ${icon("arrowRight", 16)}
          </button>
          <button class="btn btn--soft btn--block" type="button" data-action="admin-demo" style="margin-top:9px;min-height:42px">
            填入演示账号
          </button>
        </div>
        <div class="demo-box">
          <strong>演示账号</strong><br>
          管理员：admin / pkuih2026<br>
          项目负责人：consultant / pkuih2026<br>
          两位演示人员的姓名与手机号会自动带入预约回复。
        </div>
        <p class="auth-foot">本演示的账号鉴权仅用于界面展示，正式版本需接入医院统一身份认证。</p>
      </div>
    `;
  }

  function submitAdminLogin() {
    const username = document.getElementById("admin-username");
    const password = document.getElementById("admin-password");
    state.adminLogin.username = username?.value.trim() || "";
    state.adminLogin.password = password?.value || "";
    const account = getAdminAccounts().find(
      (item) =>
        item.username === state.adminLogin.username &&
        item.password === state.adminLogin.password
    );
    if (!account) {
      state.adminLogin.error = "账号或密码不正确，请确认账号已由管理员分配。";
      renderApp();
      return;
    }
    if (!account.active) {
      state.adminLogin.error = "该账号已停用，请联系院方系统管理员。";
      renderApp();
      return;
    }
    state.adminLogin.error = "";
    setAdminSession(account);
    setLastPortal("admin");
    state.screen = "admin";
    state.adminTab = "appointments";
    renderApp();
    showToast(`欢迎，${account.name}。`);
  }

  function adminDoctorsCount() {
    return state.doctors.length;
  }

  function adminStats() {
    const items = getAppointments();
    return {
      total: items.length,
      pending: items.filter((item) => item.status === "pending").length,
      accepted: items.filter((item) => item.status === "accepted").length,
      confirmed: items.filter((item) => item.status === "confirmed").length,
      completed: items.filter((item) => item.status === "completed").length
    };
  }

  function adminFilterOptions() {
    return [
      { id: "all", label: "全部" },
      { id: "pending", label: "待接单" },
      { id: "accepted", label: "方案确认中" },
      { id: "confirmed", label: "已确认" },
      { id: "completed", label: "已完成" }
    ];
  }

  function renderAdminTabs() {
    const tabs = [
      { id: "appointments", label: "预约管理", count: getAppointments().length },
      { id: "reminders", label: "短信跟进", count: pendingSmsFollowUps().length },
      { id: "marketing", label: "展业物料", count: MARKETING_POSTERS.length }
    ];
    if (isAdministrator()) {
      tabs.push({
        id: "slots",
        label: "号源配置",
        count: state.doctors.length
      });
      tabs.push({
        id: "doctors",
        label: "专家配置",
        count: configuredDoctors().filter((doctor) => doctor.active !== false).length
      });
      tabs.push({
        id: "accounts",
        label: "账号分配",
        count: getAdminAccounts().filter((item) => item.active).length
      });
    }
    return `
      <div class="segmented admin-tabs admin-tabs--scroll admin-tabs--${tabs.length}">
        ${tabs
          .map(
            (tab) => `
              <button class="${state.adminTab === tab.id ? "is-active" : ""}" type="button"
                data-action="admin-tab" data-value="${tab.id}">${tab.label}<span>${tab.count}</span></button>
            `
          )
          .join("")}
      </div>
    `;
  }

  function roleMeta(role) {
    return ADMIN_ROLES[role] || ADMIN_ROLES.manager;
  }

  function renderAdminAccountsPage() {
    if (!isAdministrator()) return renderAdminAppointmentsPage();
    const accounts = getAdminAccounts().sort((a, b) => {
      if (a.role === "administrator" && b.role !== "administrator") return -1;
      if (b.role === "administrator" && a.role !== "administrator") return 1;
      return Number(b.active) - Number(a.active);
    });
    const activeCount = accounts.filter((item) => item.active).length;
    return `
      <div class="admin-page-head">
        <div><h1>账号分配</h1><p>为院方项目人员分配登录账号与角色</p></div>
        <span class="admin-page-head__date">${activeCount} 个启用</span>
      </div>
      ${renderAdminTabs()}
      <div class="account-overview">
        <div>
          <strong>只有已分配并启用的账号才能登录工作台</strong>
          <p>系统只有管理员和项目负责人两种角色。停用账号后，该人员将立即失去工作台访问权限。</p>
        </div>
        <button class="btn btn--primary btn--sm" type="button" data-action="admin-account-new">
          ${icon("plus", 14)} 分配账号
        </button>
      </div>
      <div class="admin-account-list">
        ${accounts
          .map(
            (account) => `
              <article class="admin-account-card ${account.active ? "" : "is-disabled"}" role="button" tabindex="0"
                data-action="admin-account-edit" data-username="${esc(account.username)}">
                <span class="admin-account-card__avatar">${esc(initialOf(account.name))}</span>
                <span class="admin-account-card__main">
                  <span class="admin-account-card__heading">
                    <strong>${esc(account.name)}</strong>
                    ${account.username === state.adminUser?.username ? `<span class="account-current">当前登录</span>` : ""}
                  </span>
                  <span class="admin-account-card__role">${esc(
                    roleMeta(account.role).label
                  )} · ${esc(roleMeta(account.role).desc)}</span>
                  <span class="admin-account-card__meta">${icon("user", 11)} ${esc(
                    account.username
                  )} · ${icon("phone", 11)} ${phoneLink(account.phone, account.phone)}</span>
                </span>
                <span class="admin-account-card__side">
                  <span class="pill ${account.active ? "pill--completed" : "pill--inactive"}">${
                    account.active ? "启用" : "已停用"
                  }</span>
                  <span>编辑 ${icon("chevronRight", 11)}</span>
                </span>
              </article>
            `
          )
          .join("")}
      </div>
      <p class="source-note" style="padding:20px 22px 0">
        当前为演示账号体系，账号与密码保存在浏览器本地。正式版本需接入医院统一身份认证与权限审计。
      </p>
    `;
  }

  function emptyAdminAccountDraft() {
    return {
      isNew: true,
      username: "",
      password: "",
      name: "",
      phone: "",
      role: "manager",
      active: true
    };
  }

  function openAdminAccountEditor(username = "") {
    if (!isAdministrator()) {
      showToast("仅系统管理员可以分配账号。");
      return;
    }
    const account = username
      ? getAdminAccounts().find((item) => item.username === username)
      : null;
    state.adminAccountDraft = account
      ? { ...clone(account), isNew: false, password: "" }
      : emptyAdminAccountDraft();
    state.overlay = { type: "account" };
    renderOverlay();
  }

  function renderAdminAccountSheet() {
    const draft = state.adminAccountDraft || emptyAdminAccountDraft();
    const editingSelf = !draft.isNew && draft.username === state.adminUser?.username;
    return `
      <div class="sheet-backdrop" data-action="close-overlay"></div>
      <section class="sheet" role="dialog" aria-modal="true" aria-label="分配院方账号">
        <div class="sheet__grabber"></div>
        <div class="sheet__bar">
          <h2>${draft.isNew ? "分配项目账号" : "编辑项目账号"}</h2>
          <button class="sheet__close" type="button" data-action="close-overlay" aria-label="关闭">
            ${icon("close", 15)}
          </button>
        </div>
        <div class="sheet__body">
          <div style="padding:8px 18px 22px">
            <div class="form-card" style="margin-top:0">
              <div class="field">
                <label for="account-name">人员姓名 <em>*</em></label>
                <input id="account-name" type="text" data-account-field="name" value="${esc(
                  draft.name
                )}" placeholder="如：周老师">
              </div>
              <div class="field">
                <label for="account-phone">联系手机号 <em>*</em></label>
                <input id="account-phone" type="tel" inputmode="numeric" maxlength="11"
                  data-account-field="phone" value="${esc(draft.phone)}" placeholder="处理预约时自动带入">
              </div>
              <div class="field">
                <label for="account-role">角色权限</label>
                <select id="account-role" data-account-field="role">
                  ${Object.entries(ADMIN_ROLES)
                    .map(
                      ([key, meta]) =>
                        `<option value="${key}" ${draft.role === key ? "selected" : ""}>${meta.label} · ${meta.desc}</option>`
                    )
                    .join("")}
                </select>
              </div>
              <div class="field">
                <label for="account-username">登录账号 <em>*</em> ${
                  draft.isNew ? "" : "<span>账号创建后不可修改</span>"
                }</label>
                <input id="account-username" type="text" data-account-field="username"
                  value="${esc(draft.username)}" placeholder="英文、数字或下划线，至少 4 位"
                  autocomplete="off" ${draft.isNew ? "" : "disabled"}>
              </div>
              <div class="field">
                <label for="account-password">登录密码 <em>${draft.isNew ? "*" : ""}</em> ${
                  draft.isNew ? "" : "<span>留空则保持原密码</span>"
                }</label>
                <input id="account-password" type="password" data-account-field="password"
                  value="" placeholder="${draft.isNew ? "至少 6 位" : "如需修改请输入新密码"}"
                  autocomplete="new-password">
              </div>
              <label class="switch-row" style="margin-top:10px">
                <span class="switch-row__label"><strong>账号启用</strong><small>停用后该人员无法登录院方工作台</small></span>
                <span class="switch"><input type="checkbox" data-account-active ${
                  draft.active ? "checked" : ""
                } ${editingSelf ? "disabled" : ""}><span></span></span>
              </label>
            </div>
            <p class="form-hint">
              分配后，该人员处理预约时，姓名和联系手机号会自动带入院方回复。
              ${editingSelf ? "当前登录的管理员账号不能被停用或降级。" : ""}
            </p>
          </div>
        </div>
        <div class="sheet__footer">
          <button class="btn btn--ghost" type="button" data-action="close-overlay">取消</button>
          <button class="btn btn--primary" type="button" data-action="admin-account-save">
            ${draft.isNew ? "创建并启用账号" : "保存账号信息"}
          </button>
        </div>
      </section>
    `;
  }

  function saveAdminAccount() {
    if (!isAdministrator() || !state.adminAccountDraft) return;
    const draft = { ...state.adminAccountDraft };
    document.querySelectorAll("[data-account-field]").forEach((input) => {
      if (input.disabled) return;
      let value = input.value;
      if (input.dataset.accountField === "phone") {
        value = value.replace(/\D/g, "").slice(0, 11);
      }
      if (input.dataset.accountField === "username") value = value.trim().toLowerCase();
      draft[input.dataset.accountField] = value.trim();
    });
    const activeBox = document.querySelector("[data-account-active]");
    if (activeBox) draft.active = activeBox.checked;
    if (!draft.name) {
      showToast("请填写人员姓名。");
      return;
    }
    if (!/^1[3-9]\d{9}$/.test(draft.phone)) {
      showToast("请填写正确的联系手机号。");
      return;
    }
    if (!ADMIN_ROLES[draft.role]) {
      showToast("请选择有效的角色。");
      return;
    }
    if (!/^[a-z0-9_]{4,20}$/.test(draft.username)) {
      showToast("账号需为 4–20 位英文、数字或下划线。");
      return;
    }
    const accounts = getAdminAccounts();
    if (draft.isNew && accounts.some((item) => item.username === draft.username)) {
      showToast("该登录账号已存在。");
      return;
    }
    if (!draft.isNew && draft.username === state.adminUser?.username && !draft.active) {
      showToast("不能停用当前登录账号。");
      return;
    }
    if (!draft.isNew && draft.username === state.adminUser?.username && draft.role !== "administrator") {
      showToast("管理员不能将当前登录账号降级。");
      return;
    }
    const target = accounts.find((item) => item.username === draft.username);
    if (!draft.isNew && target) {
      const activeAdmins = accounts.filter(
        (item) => item.active && item.role === "administrator"
      ).length;
      if (
        target.active &&
        target.role === "administrator" &&
        (!draft.active || draft.role !== "administrator") &&
        activeAdmins <= 1
      ) {
        showToast("必须至少保留一个已启用的系统管理员。");
        return;
      }
    }
    if (draft.isNew && draft.password.length < 6) {
      showToast("请设置至少 6 位登录密码。");
      return;
    }
    if (!draft.isNew && draft.password && draft.password.length < 6) {
      showToast("新密码至少需要 6 位。");
      return;
    }
    const now = new Date().toISOString();
    if (draft.isNew) {
      const account = {
        username: draft.username,
        password: draft.password,
        name: draft.name,
        phone: draft.phone,
        role: draft.role,
        active: draft.active,
        createdAt: now,
        updatedAt: now
      };
      accounts.push(account);
      saveAdminAccounts(accounts);
    } else {
      const index = accounts.findIndex((item) => item.username === draft.username);
      if (index === -1) return;
      const next = {
        ...accounts[index],
        name: draft.name,
        phone: draft.phone,
        role: draft.role,
        active: draft.active,
        updatedAt: now
      };
      if (draft.password) next.password = draft.password;
      accounts[index] = next;
      saveAdminAccounts(accounts);
      if (draft.username === state.adminUser?.username) {
        setAdminSession(next);
      }
    }
    state.adminAccountDraft = null;
    releaseOverlayHistory();
    clearOverlayState();
    state.adminTab = "accounts";
    renderApp();
    showToast(draft.isNew ? "项目账号已创建并分配。" : "账号信息已更新。");
  }

  function emptyAdminDoctorDraft() {
    return {
      isNew: true,
      id: "",
      name: "",
      tier: "director",
      dept: "",
      title: "主任医师",
      specialty: "",
      intro: "",
      tagsText: "",
      profileUrl: "",
      photo: "",
      active: true
    };
  }

  function openAdminDoctorEditor(id = "") {
    if (!isAdministrator()) {
      showToast("仅系统管理员可以配置专家。");
      return;
    }
    const doctor = id
      ? configuredDoctors().find((item) => String(item.id) === String(id))
      : null;
    state.adminDoctorDraft = doctor
      ? {
          ...clone(doctor),
          isNew: false,
          tier: TIERS[doctor.tier] ? doctor.tier : "specialist",
          tagsText: (doctor.tags || []).join("、")
        }
      : emptyAdminDoctorDraft();
    state.overlay = { type: "doctor-admin" };
    renderOverlay();
  }

  function renderAdminDoctorSheet() {
    const draft = state.adminDoctorDraft || emptyAdminDoctorDraft();
    return `
      <div class="sheet-backdrop" data-action="close-overlay"></div>
      <section class="sheet" role="dialog" aria-modal="true" aria-label="配置专家">
        <div class="sheet__grabber"></div>
        <div class="sheet__bar">
          <h2>${draft.isNew ? "新增专家" : "编辑专家"}</h2>
          <button class="sheet__close" type="button" data-action="close-overlay" aria-label="关闭">
            ${icon("close", 15)}
          </button>
        </div>
        <div class="sheet__body">
          <div style="padding:8px 18px 22px">
            <label class="doctor-photo-upload">
              <span class="doctor-photo-upload__preview" data-doctor-photo-preview>
                ${
                  draft.photo
                    ? `<img src="${esc(doctorPhoto(draft.photo, "detail"))}" alt="专家照片预览" decoding="async">`
                    : `<span>${icon("experts", 26)}<small>上传照片</small></span>`
                }
              </span>
              <span class="doctor-photo-upload__copy">
                <strong>专家照片</strong>
                <small>建议上传正面半身或全身照，系统会自动压缩</small>
                <span>选择图片</span>
              </span>
              <input type="file" accept="image/*" data-doctor-photo hidden>
            </label>
            <div class="form-card" style="margin-top:14px">
              <div class="field-row">
                <div class="field">
                  <label for="doctor-name">专家姓名 <em>*</em></label>
                  <input id="doctor-name" type="text" data-doctor-field="name" value="${esc(
                    draft.name
                  )}" placeholder="如：刘老师">
                </div>
                <div class="field">
                  <label for="doctor-tier">专家层级</label>
                  <select id="doctor-tier" data-doctor-field="tier">
                    ${TIER_ORDER.map(
                      (tierId) =>
                        `<option value="${tierId}" ${
                          draft.tier === tierId ? "selected" : ""
                        }>${TIERS[tierId].name}</option>`
                    ).join("")}
                  </select>
                </div>
              </div>
              <div class="field">
                <label for="doctor-dept">科室 / 中心 <em>*</em></label>
                <input id="doctor-dept" type="text" data-doctor-field="dept" value="${esc(
                  draft.dept
                )}" placeholder="如：骨科 · 骨与关节中心">
              </div>
              <div class="field">
                <label for="doctor-title">职称 / 头衔 <em>*</em></label>
                <input id="doctor-title" type="text" data-doctor-field="title" value="${esc(
                  draft.title
                )}" placeholder="如：主任医师 · 教授">
              </div>
              <div class="field">
                <label for="doctor-specialty">擅长方向 <em>*</em></label>
                <textarea id="doctor-specialty" data-doctor-field="specialty" placeholder="用于专家列表卡片展示">${esc(
                  draft.specialty
                )}</textarea>
              </div>
              <div class="field">
                <label for="doctor-intro">专家简介</label>
                <textarea id="doctor-intro" data-doctor-field="intro" style="min-height:110px" placeholder="介绍从业经历、专业方向与代表性成果">${esc(
                  draft.intro
                )}</textarea>
              </div>
              <div class="field">
                <label for="doctor-tags">健康主题 <span>用顿号或逗号分隔</span></label>
                <input id="doctor-tags" type="text" data-doctor-field="tagsText" value="${esc(
                  draft.tagsText
                )}" placeholder="如：脊柱健康、久坐防护、颈肩腰腿痛">
              </div>
              <div class="field">
                <label for="doctor-profile-url">官网链接 <span>选填</span></label>
                <input id="doctor-profile-url" type="url" data-doctor-field="profileUrl" value="${esc(
                  draft.profileUrl || ""
                )}" placeholder="https://">
              </div>
              <label class="switch-row" style="margin-top:10px">
                <span class="switch-row__label"><strong>在客户端展示</strong><small>关闭后该专家不会出现在专家库与预约选择中</small></span>
                <span class="switch"><input type="checkbox" data-doctor-active ${
                  draft.active !== false ? "checked" : ""
                }><span></span></span>
              </label>
            </div>
            <p class="form-hint">保存后客户端专家库、首页专家讲堂与预约专家列表会立即更新。</p>
          </div>
        </div>
        <div class="sheet__footer">
          <button class="btn btn--ghost" type="button" data-action="close-overlay">取消</button>
          <button class="btn btn--primary" type="button" data-action="admin-doctor-save">
            ${draft.isNew ? "保存并上架" : "保存专家信息"}
          </button>
        </div>
      </section>
    `;
  }

  function handleDoctorPhotoUpload(file) {
    if (!file || !state.adminDoctorDraft) return;
    if (!file.type.startsWith("image/")) {
      showToast("请选择图片文件。");
      return;
    }
    if (file.size > 12 * 1024 * 1024) {
      showToast("图片不能超过 12MB。");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const maxSize = 900;
        const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        const context = canvas.getContext("2d");
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.78);
        state.adminDoctorDraft.photo = dataUrl;
        const preview = document.querySelector("[data-doctor-photo-preview]");
        if (preview) preview.innerHTML = `<img src="${dataUrl}" alt="专家照片预览">`;
        showToast("照片已上传并压缩。");
      };
      image.onerror = () => showToast("图片读取失败，请更换图片重试。");
      image.src = String(reader.result);
    };
    reader.onerror = () => showToast("图片读取失败，请更换图片重试。");
    reader.readAsDataURL(file);
  }

  function saveAdminDoctor() {
    if (!isAdministrator() || !state.adminDoctorDraft) return;
    const draft = { ...state.adminDoctorDraft };
    document.querySelectorAll("[data-doctor-field]").forEach((input) => {
      draft[input.dataset.doctorField] = input.value.trim();
    });
    const activeBox = document.querySelector("[data-doctor-active]");
    if (activeBox) draft.active = activeBox.checked;
    if (!draft.name) {
      showToast("请填写专家姓名。");
      return;
    }
    if (!draft.dept) {
      showToast("请填写科室或中心。");
      return;
    }
    if (!draft.title) {
      showToast("请填写职称或头衔。");
      return;
    }
    if (!draft.specialty) {
      showToast("请填写擅长方向。");
      return;
    }
    if (!draft.photo) {
      showToast("请上传专家照片。");
      return;
    }
    const now = new Date().toISOString();
    const doctor = {
      id: draft.isNew ? `custom-${Date.now()}` : draft.id,
      name: draft.name,
      tier: TIERS[draft.tier] ? draft.tier : "specialist",
      dept: draft.dept,
      title: draft.title,
      specialty: draft.specialty,
      intro: draft.intro,
      tags: String(draft.tagsText || "")
        .split(/[,，、\n]/)
        .map((tag) => tag.trim())
        .filter(Boolean),
      profileUrl: draft.profileUrl || "",
      photo: draft.photo,
      active: draft.active !== false,
      updatedAt: now,
      createdAt: draft.createdAt || now
    };
    const config = getDoctorConfig();
    const customIndex = config.custom.findIndex(
      (item) => String(item.id) === String(doctor.id)
    );
    if (draft.isNew || customIndex >= 0) {
      if (customIndex >= 0) config.custom[customIndex] = doctor;
      else config.custom.push(doctor);
    } else {
      config.overrides[String(doctor.id)] = doctor;
    }
    saveDoctorConfig(config);
    refreshDoctors();
    state.adminDoctorDraft = null;
    releaseOverlayHistory();
    clearOverlayState();
    state.adminTab = "doctors";
    renderApp();
    showToast(draft.isNew ? "专家已新增并上架。" : "专家信息已更新。");
  }

  function filteredAdminAppointments() {
    const query = state.adminSearch.trim().toLowerCase();
    return getAppointments()
      .filter((item) => state.adminFilter === "all" || item.status === state.adminFilter)
      .filter((item) => {
        if (!query) return true;
        const doctor = doctorById(item.doctorId);
        return [
          item.id,
          item.orgName,
          item.contactName,
          item.phone,
          topicOf(item),
          doctor?.name || "",
          item.city
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  function renderAdminAppointmentCard(item) {
    const doctor = doctorById(item.doctorId);
    const assignee = appointmentAssignee(item);
    return `
      <article class="admin-appointment" role="button" tabindex="0" data-action="open-review" data-appointment-id="${esc(
        item.id
      )}">
        <span class="admin-appointment__top">
          ${statusPill(item.status)}
          <span class="admin-appointment__id">${esc(item.id)}</span>
        </span>
        <h3>${esc(topicOf(item))}</h3>
        <div class="admin-appointment__meta">
          <span>${icon("building", 12)} ${esc(item.orgName)}</span>
          <span>${icon("experts", 12)} ${esc(
            doctor ? doctor.name : (TIERS[item.tier] || TIERS.specialist).name + " · 待安排"
          )}</span>
          <span>${icon("calendar", 12)} ${formatMD(item.date)} ${esc(item.time)}</span>
        </div>
        ${
          assignee
            ? `<div class="admin-appointment__assignee">${icon("user", 11)} ${esc(
                assignee.name
              )} 负责 · ${phoneLink(assignee.phone, assignee.phone)}</div>`
            : `<div class="admin-appointment__assignee is-pending">${icon("clock", 11)} 等待接单，暂未分配项目负责人</div>`
        }
        <span class="admin-appointment__foot">
          <span>${esc(item.contactName)} · ${phoneLink(item.phone, maskPhone(item.phone))}</span>
          <strong>${item.reply ? "查看 / 更新方案" : "处理预约"} ${icon("chevronRight", 12)}</strong>
        </span>
      </article>
    `;
  }

  function renderAdminListHTML() {
    const list = filteredAdminAppointments();
    if (!list.length) {
      return `
        <div class="empty-state" style="margin:10px 18px 0">
          <span class="empty-state__icon">${icon("calendar", 25)}</span>
          <h3>没有匹配的预约</h3>
          <p>调整状态筛选或搜索关键词后再试。</p>
        </div>
      `;
    }
    return `<div class="admin-list">${list.map(renderAdminAppointmentCard).join("")}</div>`;
  }

  function renderAdminAppointmentsPage() {
    const stats = adminStats();
    return `
      <div class="admin-page-head">
        <div><h1>预约看板</h1><p>处理企业活动需求与院方方案回复</p></div>
        <span class="admin-page-head__date">${formatDateCN(isoDate(new Date()), true)}</span>
      </div>
      <div class="admin-stats">
        <div class="admin-stat"><small>全部预约</small><strong>${stats.total}<span>条</span></strong><span class="admin-stat__hint">${icon(
          "calendar",
          10
        )} 含历史记录</span></div>
        <div class="admin-stat"><small>待院方接单</small><strong>${stats.pending}<span>条</span></strong><span class="admin-stat__hint is-amber">${icon(
          "clock",
          10
        )} 需要分配项目负责人</span></div>
        <div class="admin-stat"><small>方案确认中</small><strong>${stats.accepted}<span>条</span></strong><span class="admin-stat__hint is-blue">${icon(
          "message",
          10
        )} 已接单待确认</span></div>
        <div class="admin-stat"><small>已确认方案</small><strong>${stats.confirmed}<span>条</span></strong><span class="admin-stat__hint is-blue">${icon(
          "checkCircle",
          10
        )} 方案已同步</span></div>
        <div class="admin-stat"><small>已完成活动</small><strong>${stats.completed}<span>条</span></strong><span class="admin-stat__hint">${icon(
          "checkCircle",
          10
        )} 已归档项目</span></div>
      </div>
      ${renderAdminTabs()}
      <div class="admin-search">
        ${icon("search", 16)}
        <input id="admin-search-input" type="search" value="${esc(
          state.adminSearch
        )}" placeholder="搜索编号、企业、联系人或课题" data-admin-search autocomplete="off">
      </div>
      <div class="admin-filter-row horizontal-scroll">
        ${adminFilterOptions()
          .map(
            (filter) => `
              <button class="chip-button ${state.adminFilter === filter.id ? "is-active" : ""}" type="button"
                data-action="admin-filter" data-value="${filter.id}">${filter.label}</button>
            `
          )
          .join("")}
      </div>
      <div id="admin-list">${renderAdminListHTML()}</div>
      <p class="source-note" style="padding:20px 22px 0">院方回复会立即同步到企业客户的「我的预约」详情中。当前为浏览器本地演示数据。</p>
    `;
  }

  function renderFollowUpPage() {
    const pending = pendingSmsFollowUps();
    const completed = completedSmsFollowUps();
    const renderCard = (appointment, done = false) => `
      <article class="followup-card ${done ? "is-done" : ""}" role="button" tabindex="0"
        data-action="open-review" data-appointment-id="${esc(appointment.id)}">
        <span class="followup-card__top">
          <span class="followup-card__icon">${icon(done ? "checkCircle" : "message", 17)}</span>
          <span class="followup-card__title">
            <strong>${esc(appointment.orgName)}</strong>
            <small>${esc(topicOf(appointment))}</small>
          </span>
          ${statusPill(appointment.status)}
        </span>
        <span class="followup-card__meta">
          <span>${icon("user", 11)} ${esc(appointment.contactName)}</span>
          <span>${icon("phone", 11)} ${phoneLink(appointment.phone, appointment.phone)}</span>
          <span>${icon("calendar", 11)} ${formatMD(appointment.date)} ${esc(appointment.time)}</span>
        </span>
        <span class="followup-card__action">
          ${
            done
              ? `${esc(appointment.smsFollowUp?.copiedBy?.name || "项目人员")} · ${formatDateTime(
                  appointment.smsFollowUp?.copiedAt
                )} 已复制`
              : "去生成并复制客户短信"
          }
          ${icon("chevronRight", 11)}
        </span>
      </article>
    `;
    return `
      <div class="admin-page-head">
        <div><h1>短信跟进</h1><p>不再统一配置模板，项目人员复制客户短信后自动视为已发送</p></div>
        <span class="admin-page-head__date">${pending.length} 条待提醒</span>
      </div>
      ${renderAdminTabs()}
      <section class="followup-summary">
        <span class="followup-summary__icon">${icon("bell", 18)}</span>
        <div>
          <strong>${pending.length ? `${pending.length} 个已确认项目还未复制短信` : "所有已确认项目均已完成短信跟进"}</strong>
          <p>在预约处理页复制“短信内容”或“号码和内容”后，系统会自动记录发送人和发送时间。</p>
        </div>
      </section>
      <div class="followup-section">
        <div class="followup-section__head"><h2>待提醒</h2><span>${pending.length} 条</span></div>
        ${
          pending.length
            ? `<div class="followup-list">${pending.map((item) => renderCard(item)).join("")}</div>`
            : `<div class="followup-empty">${icon("checkCircle", 22)}<strong>暂无待提醒项目</strong><p>院方确认预约后，未复制短信的项目会自动出现在这里。</p></div>`
        }
      </div>
      <div class="followup-section">
        <div class="followup-section__head"><h2>已复制记录</h2><span>${completed.length} 条</span></div>
        ${
          completed.length
            ? `<div class="followup-list">${completed
                .slice(0, 12)
                .map((item) => renderCard(item, true))
                .join("")}</div>`
            : `<p class="settings-note">暂无已复制记录。复制客户短信后会自动留痕。</p>`
        }
      </div>
      <p class="source-note" style="padding:18px 22px 0">
        仅复制客户手机号不会标记为已发送；复制短信内容或号码和内容后才会完成跟进。演示环境不会调用真实短信网关。
      </p>
    `;
  }

  function adminSlotDates() {
    const tier = TIERS[state.adminSlotTier] || TIERS.elite;
    const start = addDays(startOfDay(new Date()), tier.leadDays);
    return Array.from({ length: 21 }, (_, index) => addDays(start, index));
  }

  function selectedAdminSlotDate() {
    const dates = adminSlotDates();
    return dates.find((date) => isoDate(date) === state.adminSlotDate) || dates[0];
  }

  function adminSlotDoctors() {
    return doctorsForTier(state.adminSlotTier);
  }

  function selectedAdminSlotDoctor() {
    return (
      adminSlotDoctors().find(
        (doctor) => String(doctor.id) === String(state.adminSlotDoctorId)
      ) || null
    );
  }

  function ensureSlotDraft() {
    if (
      !state.adminSlotDraft ||
      typeof state.adminSlotDraft !== "object" ||
      !state.adminSlotDraft.tier ||
      !state.adminSlotDraft.doctor
    ) {
      state.adminSlotDraft = { tier: {}, doctor: {} };
    }
    return state.adminSlotDraft;
  }

  function slotDraftRoot(scope, tierId, doctorId, create = false) {
    const draft = ensureSlotDraft();
    const root = scope === "doctor" ? draft.doctor : draft.tier;
    const key = scope === "doctor" ? String(doctorId) : String(tierId);
    if (!root[key] && create) root[key] = {};
    return root[key] || null;
  }

  function getSlotDraftCapacity(scope, tierId, doctorId, dateIso, slotId) {
    const root = slotDraftRoot(scope, tierId, doctorId);
    const value = root?.[dateIso]?.[slotId];
    return value === undefined ? null : Number(value);
  }

  function getSlotConfigCapacity(scope, tierId, doctorId, dateIso, slotId) {
    const draftValue = getSlotDraftCapacity(scope, tierId, doctorId, dateIso, slotId);
    if (draftValue !== null) return draftValue;
    return scope === "doctor"
      ? getDoctorSlotCapacity(doctorId, dateIso, slotId)
      : getSlotCapacity(tierId, dateIso, slotId);
  }

  function bookedSlotForConfig(scope, tierId, doctorId, dateIso, slotId) {
    return scope === "doctor"
      ? bookedDoctorSlotCount(doctorId, dateIso, slotId)
      : bookedTierPoolCount(tierId, dateIso, slotId);
  }

  function setSlotConfigCapacity(scope, tierId, doctorId, dateIso, slotId, requestedValue) {
    const booked = bookedSlotForConfig(scope, tierId, doctorId, dateIso, slotId);
    const requested = Math.max(0, Math.min(9, Number(requestedValue) || 0));
    const capacity = Math.max(requested, booked);
    const root = slotDraftRoot(scope, tierId, doctorId, true);
    if (!root[dateIso]) root[dateIso] = {};
    root[dateIso][slotId] = capacity;
    return { capacity, adjusted: capacity !== requested };
  }

  function slotDraftChangeCount() {
    if (!state.adminSlotDraft) return 0;
    let count = 0;
    Object.entries(state.adminSlotDraft.tier || {}).forEach(([tierId, dates]) => {
      Object.entries(dates || {}).forEach(([dateIso, slots]) => {
        Object.entries(slots || {}).forEach(([slotId, value]) => {
          if (Number(value) !== getSlotCapacity(tierId, dateIso, slotId)) count += 1;
        });
      });
    });
    Object.entries(state.adminSlotDraft.doctor || {}).forEach(([doctorId, dates]) => {
      Object.entries(dates || {}).forEach(([dateIso, slots]) => {
        Object.entries(slots || {}).forEach(([slotId, value]) => {
          if (Number(value) !== getDoctorSlotCapacity(doctorId, dateIso, slotId)) count += 1;
        });
      });
    });
    return count;
  }

  function buildSlotConfigSlots(scope, tierId, doctor, dateIso, appointments) {
    const base = doctor
      ? buildDoctorTimeSlots(doctor, dateIso, appointments)
      : buildPoolTimeSlots(tierId, dateIso, appointments);
    return base.map((slot) => {
      const configuredCapacity = getSlotConfigCapacity(
        scope,
        tierId,
        doctor?.id,
        dateIso,
        slot.id
      );
      const capacity = Math.max(configuredCapacity, slot.booked);
      const draftValue = getSlotDraftCapacity(
        scope,
        tierId,
        doctor?.id,
        dateIso,
        slot.id
      );
      const persistedCapacity = doctor
        ? getDoctorSlotCapacity(doctor.id, dateIso, slot.id)
        : getSlotCapacity(tierId, dateIso, slot.id);
      const remaining = Math.max(0, capacity - slot.booked);
      return {
        ...slot,
        capacity,
        remaining,
        full: capacity === 0 || remaining === 0,
        isDraft: draftValue !== null && draftValue !== persistedCapacity
      };
    });
  }

  function renderSlotSaveBar() {
    const changes = slotDraftChangeCount();
    if (!changes) {
      return `
        <div class="slot-save-bar" id="slot-save-bar">
          <div>
            <strong>号源配置已保存</strong>
            <small>修改号源后，点击保存才会统一生效</small>
          </div>
          <div class="slot-save-bar__actions">
            <button class="btn btn--primary btn--sm" type="button" disabled>
              ${icon("checkCircle", 14)} 保存号源配置
            </button>
          </div>
        </div>
      `;
    }
    return `
      <div class="slot-save-bar is-dirty" id="slot-save-bar">
        <div>
          <strong>未保存 ${changes} 项修改</strong>
          <small>确认后统一保存，客户端立即生效</small>
        </div>
        <div class="slot-save-bar__actions">
          <button class="btn btn--ghost btn--sm" type="button" data-action="slot-draft-reset">放弃</button>
          <button class="btn btn--primary btn--sm" type="button" data-action="slot-draft-save">
            ${icon("checkCircle", 14)} 保存号源配置
          </button>
        </div>
      </div>
      <div class="slot-save-spacer" aria-hidden="true"></div>
    `;
  }

  function saveSlotDraft() {
    const draft = state.adminSlotDraft;
    const changes = slotDraftChangeCount();
    if (!draft || !changes) {
      showToast("当前没有需要保存的号源修改。");
      return;
    }
    const tierInventory = getSlotInventory();
    const doctorInventory = getDoctorSlotInventory();
    let saved = 0;
    let adjusted = 0;
    Object.entries(draft.tier || {}).forEach(([tierId, dates]) => {
      Object.entries(dates || {}).forEach(([dateIso, slots]) => {
        Object.entries(slots || {}).forEach(([slotId, value]) => {
          const requested = Number(value) || 0;
          const booked = bookedTierPoolCount(tierId, dateIso, slotId);
          const capacity = Math.min(9, Math.max(requested, booked));
          if (capacity !== requested) adjusted += 1;
          const current = getSlotCapacity(tierId, dateIso, slotId);
          if (capacity === current) return;
          if (!tierInventory[dateIso]) tierInventory[dateIso] = {};
          if (!tierInventory[dateIso][tierId]) tierInventory[dateIso][tierId] = {};
          tierInventory[dateIso][tierId][slotId] = capacity;
          saved += 1;
        });
      });
    });
    saveSlotInventory(tierInventory);
    Object.entries(draft.doctor || {}).forEach(([doctorId, dates]) => {
      Object.entries(dates || {}).forEach(([dateIso, slots]) => {
        Object.entries(slots || {}).forEach(([slotId, value]) => {
          const requested = Number(value) || 0;
          const booked = bookedDoctorSlotCount(doctorId, dateIso, slotId);
          const capacity = Math.min(9, Math.max(requested, booked));
          if (capacity !== requested) adjusted += 1;
          const current = getDoctorSlotCapacity(doctorId, dateIso, slotId);
          if (capacity === current) return;
          if (!doctorInventory[dateIso]) doctorInventory[dateIso] = {};
          if (!doctorInventory[dateIso][doctorId]) doctorInventory[dateIso][doctorId] = {};
          doctorInventory[dateIso][doctorId][slotId] = capacity;
          saved += 1;
        });
      });
    });
    saveDoctorSlotInventory(doctorInventory);
    state.adminSlotDraft = null;
    refreshSlotConfig();
    showToast(
      saved
        ? `号源配置已保存，共更新 ${saved} 项${
            adjusted ? "；低于已预约数量的设置已自动保留" : "。"
          }`
        : "号源配置与当前已生效设置一致，无需重复保存。"
    );
  }

  function resetSlotDraft() {
    state.adminSlotDraft = null;
    refreshSlotConfig();
    showToast("已放弃本次号源修改。");
  }

  function applySlotBatch(value) {
    const tierId = state.adminSlotTier;
    const doctor = selectedAdminSlotDoctor();
    const dates =
      state.adminSlotBatchScope === "date"
        ? [isoDate(selectedAdminSlotDate())]
        : adminSlotDates().map(isoDate);
    const targets =
      state.adminSlotBatchScope === "tier"
        ? [
            { scope: "tier", tierId, doctorId: "" },
            ...adminSlotDoctors().map((item) => ({
              scope: "doctor",
              tierId,
              doctorId: item.id
            }))
          ]
        : [
            doctor
              ? { scope: "doctor", tierId, doctorId: doctor.id }
              : { scope: "tier", tierId, doctorId: "" }
          ];
    let adjusted = 0;
    let updated = 0;
    targets.forEach((target) => {
      dates.forEach((dateIso) => {
        TIME_SLOTS.forEach((slot) => {
          const result = setSlotConfigCapacity(
            target.scope,
            target.tierId,
            target.doctorId,
            dateIso,
            slot.id,
            value
          );
          if (result.adjusted) adjusted += 1;
          updated += 1;
        });
      });
    });
    refreshSlotConfig();
    const changes = slotDraftChangeCount();
    showToast(
      `${value === 0 ? "已将所选范围加入草稿并批量关闭" : `已将所选范围批量设为 ${value} 席`}，共 ${
        updated
      } 个时段${adjusted ? "；低于已预约数量的时段已自动保留" : ""}${
        changes ? "。点击“保存号源配置”后统一生效。" : "，当前没有新增修改。"
      }`
    );
  }

  function slotBatchScopeDescription() {
    const doctor = selectedAdminSlotDoctor();
    const tier = TIERS[state.adminSlotTier] || TIERS.elite;
    if (state.adminSlotBatchScope === "date") {
      return `${doctor ? doctor.name : "院方统筹池"} · ${formatDateCN(
        isoDate(selectedAdminSlotDate()),
        true
      )} · 3 个时段`;
    }
    if (state.adminSlotBatchScope === "tier") {
      return `${tier.shortName} · 统筹池及 ${adminSlotDoctors().length} 位专家 · 全部 ${
        adminSlotDates().length
      } 天`;
    }
    return `${doctor ? doctor.name : "院方统筹池"} · 全部 ${
      adminSlotDates().length
    } 天 · 每天 3 个时段`;
  }

  function renderSlotConfigContent() {
    const date = selectedAdminSlotDate();
    const dateIso = isoDate(date);
    const tier = TIERS[state.adminSlotTier] || TIERS.elite;
    const doctors = adminSlotDoctors();
    const doctor = selectedAdminSlotDoctor();
    const appointments = getAppointments();
    const scope = doctor ? "doctor" : "tier";
    const slots = buildSlotConfigSlots(
      scope,
      state.adminSlotTier,
      doctor,
      dateIso,
      appointments
    );
    return `
      <div class="slot-config-tier segmented">
        ${TIER_ORDER.map(
          (tierId) => `
            <button class="${state.adminSlotTier === tierId ? "is-active" : ""}" type="button"
              data-action="admin-slot-tier" data-value="${tierId}">
              ${TIERS[tierId].shortName}<span>${TIERS[tierId].leadDays} 天</span>
            </button>
          `
        ).join("")}
      </div>
      <div class="slot-config-subhead">
        <span>配置对象</span>
        <small>每位专家独立号源</small>
      </div>
      <div class="slot-doctor-rail horizontal-scroll">
        <button class="slot-doctor-pill is-pool ${
          doctor ? "" : "is-active"
        }" type="button" data-action="admin-slot-doctor" data-value="">
          <span class="slot-doctor-pill__icon">${icon("spark", 16)}</span>
          <span>
            <strong>院方统筹池</strong>
            <small>不指定专家</small>
          </span>
        </button>
        ${doctors
          .map(
            (item) => `
              <button class="slot-doctor-pill ${
                String(item.id) === String(doctor?.id) ? "is-active" : ""
              }" type="button" data-action="admin-slot-doctor" data-value="${esc(item.id)}">
                <span class="slot-doctor-pill__photo">
                  <img src="${esc(doctorPhoto(item))}" alt="" loading="lazy" decoding="async">
                </span>
                <span>
                  <strong>${esc(item.name)}</strong>
                  <small>${esc(item.dept)}</small>
                </span>
              </button>
            `
          )
          .join("")}
      </div>
      <section class="slot-batch-card">
        <div class="slot-batch-card__head">
          <div><strong>批量快捷设置</strong><small>先修改，确认后统一保存</small></div>
          <span>0 = 关闭时段</span>
        </div>
        <div class="slot-batch-scope segmented">
          <button class="${state.adminSlotBatchScope === "date" ? "is-active" : ""}" type="button"
            data-action="slot-batch-scope" data-value="date">当前日期</button>
          <button class="${state.adminSlotBatchScope === "all" ? "is-active" : ""}" type="button"
            data-action="slot-batch-scope" data-value="all">当前对象全部日期</button>
          <button class="${state.adminSlotBatchScope === "tier" ? "is-active" : ""}" type="button"
            data-action="slot-batch-scope" data-value="tier">本层级全部</button>
        </div>
        <p class="slot-batch-scope__hint">${esc(slotBatchScopeDescription())}</p>
        <div class="slot-batch-card__row">
          <span>统一每个时段设为</span>
          <div class="slot-batch-presets">
            ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
              .map(
                (value) => `
                  <button type="button" data-action="slot-batch-preset" data-value="${value}">${value}</button>
                `
              )
              .join("")}
          </div>
        </div>
        <p>0 表示关闭时段。号源数量不能低于该时段已预约数量，低于下限时自动保留已约数量，确认后统一保存。</p>
      </section>
      ${renderSlotSaveBar()}
      <div class="slot-date-rail horizontal-scroll">
        ${adminSlotDates()
          .map(
            (item) => `
              <button class="slot-date-pill ${isoDate(item) === dateIso ? "is-active" : ""}" type="button"
                data-action="admin-slot-date" data-value="${isoDate(item)}">
                <strong>${formatMD(item)}</strong><span>${weekday(item)}</span>
              </button>
            `
          )
          .join("")}
      </div>
      <div class="slot-config-head">
        <div><strong>${formatDateCN(dateIso, true)}</strong><small>${
          doctor ? `${esc(doctor.name)} · ${tier.name}` : `${tier.name} · 院方统筹池`
        }</small></div>
        <span>0 表示关闭该时段</span>
      </div>
      <div class="slot-config-list">
        ${slots
          .map(
            (slot) => `
              <div class="slot-config-card ${slot.capacity === 0 ? "is-closed" : ""} ${
                slot.isDraft ? "has-draft" : ""
              }"
                data-slot-card data-date="${dateIso}" data-slot="${slot.id}">
                <div class="slot-config-card__main">
                  <strong>${slot.label}${
                    slot.isDraft ? '<span class="slot-draft-badge">未保存</span>' : ""
                  }</strong>
                  <small>${slot.sub} · 已约 ${slot.booked} · 剩余 ${slot.remaining}</small>
                </div>
                <div class="capacity-stepper">
                  <button type="button" data-action="slot-capacity" data-scope="${
                    doctor ? "doctor" : "tier"
                  }" data-tier="${state.adminSlotTier}" ${
                    doctor ? `data-doctor-id="${esc(doctor.id)}"` : ""
                  } data-date="${dateIso}" data-slot="${slot.id}" data-delta="-1"
                    ${slot.capacity <= slot.booked ? "disabled" : ""}
                    aria-label="减少号源">−</button>
                  <strong>${slot.capacity}</strong>
                  <button type="button" data-action="slot-capacity" data-scope="${
                    doctor ? "doctor" : "tier"
                  }" data-tier="${state.adminSlotTier}" ${
                    doctor ? `data-doctor-id="${esc(doctor.id)}"` : ""
                  } data-date="${dateIso}" data-slot="${slot.id}" data-delta="1"
                    ${slot.capacity >= 9 ? "disabled" : ""}
                    aria-label="增加号源">+</button>
                </div>
              </div>
            `
          )
          .join("")}
      </div>
    `;
  }

  function refreshSlotConfig() {
    const content = document.getElementById("slot-config-content");
    if (content) content.innerHTML = renderSlotConfigContent();
  }

  function renderSlotConfigPage() {
    if (!isAdministrator()) return renderAdminAppointmentsPage();
    return `
      <div class="admin-page-head">
        <div><h1>号源配置</h1><p>批量设置后统一保存，预约量与剩余量实时计算</p></div>
        <span class="admin-page-head__date">保存后生效</span>
      </div>
      ${renderAdminTabs()}
      <section class="slot-config-note">
        ${icon("calendar", 16)}
        <p>先按专家、日期或层级批量快捷设置，再点击保存统一生效。选择“院方统筹池”用于客户不指定专家时的通用名额；号源数量不能低于该时段已预约数量，调为 0 可关闭时段。</p>
      </section>
      <div id="slot-config-content">${renderSlotConfigContent()}</div>
    `;
  }

  function renderDoctorAdminPage() {
    if (!isAdministrator()) return renderAdminAppointmentsPage();
    const doctors = configuredDoctors().sort((a, b) => {
      if (a.active === false && b.active !== false) return 1;
      if (b.active === false && a.active !== false) return -1;
      return TIER_ORDER.indexOf(a.tier) - TIER_ORDER.indexOf(b.tier);
    });
    return `
      <div class="admin-page-head">
        <div><h1>专家配置</h1><p>新增专家、维护简介与照片，保存后客户端立即生效</p></div>
        <button class="btn btn--primary btn--sm" type="button" data-action="admin-doctor-new">
          ${icon("plus", 14)} 新增专家
        </button>
      </div>
      ${renderAdminTabs()}
      <section class="doctor-admin-summary">
        <div><strong>可配置大咖医生、主任专家与专业医生</strong><p>照片建议使用正面半身或全身照，上传后会自动压缩保存在浏览器本地。</p></div>
        <span>${doctors.filter((item) => item.active !== false).length} 位启用</span>
      </section>
      <div class="doctor-admin-list">
        ${doctors
          .map(
            (doctor) => `
              <button class="doctor-admin-card ${doctor.active === false ? "is-disabled" : ""}" type="button"
                data-action="admin-doctor-edit" data-doctor-id="${esc(doctor.id)}">
                <span class="doctor-admin-card__photo">
                  ${
                    doctor.photo
                      ? `<img src="${esc(doctorPhoto(doctor))}" alt="${esc(doctor.name)}"
                          loading="lazy" decoding="async">`
                      : `<span>${icon("experts", 20)}</span>`
                  }
                </span>
                <span class="doctor-admin-card__main">
                  <span class="doctor-admin-card__heading">
                    <strong>${esc(doctor.name)}</strong>
                    <span class="pill ${doctor.active === false ? "pill--inactive" : "pill--completed"}">
                      ${doctor.active === false ? "已停用" : tierOf(doctor).name}
                    </span>
                  </span>
                  <span class="doctor-admin-card__role">${esc(doctor.dept)} · ${esc(doctor.title)}</span>
                  <span class="doctor-admin-card__intro">${esc(
                    cleanDoctorText(doctor.specialty) || cleanDoctorText(doctor.intro) || "暂无简介"
                  )}</span>
                </span>
                <span class="doctor-admin-card__edit">编辑 ${icon("chevronRight", 11)}</span>
              </button>
            `
          )
          .join("")}
      </div>
      <p class="source-note" style="padding:18px 22px 0">演示环境的专家配置与上传图片保存在浏览器本地，正式版本需接入对象存储与医院内容审核流程。</p>
    `;
  }

  function marketingPosterById(id) {
    return MARKETING_POSTERS.find((poster) => poster.id === id) || null;
  }

  function renderMarketingPage() {
    if (!state.adminUser) return "";
    return `
      <div class="admin-page-head">
        <div><h1>展业物料</h1><p>院方统一宣传海报，打开即可保存转发</p></div>
        <span class="admin-page-head__date">${MARKETING_POSTERS.length} 套场景</span>
      </div>
      ${renderAdminTabs()}
      <section class="marketing-hero">
        <span class="marketing-hero__badge">${icon("send", 14)} 项目展业物料库</span>
        <h2>把专业服务，变成可分享的邀请</h2>
        <p>四套海报由院方统一设计，突出名医资源、医院权威、服务价值与入企场景。无需生成，打开高清海报即可保存或转发。</p>
        <div class="marketing-hero__facts">
          <span><b>4</b>套场景</span>
          <span><b>1080</b>×1920</span>
          <span><b>1</b>个预约二维码</span>
        </div>
      </section>
      <div class="poster-section-head">
        <h2>宣传海报</h2>
        <span>已做轻量化，打开更快</span>
      </div>
      <div class="poster-list">
        ${MARKETING_POSTERS.map(
          (poster) => `
            <button class="poster-card" type="button" data-action="open-poster" data-poster-id="${esc(
              poster.id
            )}">
              <span class="poster-card__visual">
                <img src="${esc(poster.thumb)}" alt="${esc(poster.title)}宣传海报" loading="lazy" decoding="async">
                <span class="poster-card__badge">${esc(poster.eyebrow)}</span>
              </span>
              <span class="poster-card__copy">
                <strong>${esc(poster.title)}</strong>
                <span class="poster-card__desc">${esc(poster.desc)}</span>
                <span class="poster-card__tags">${poster.tags
                  .map((tag) => `<span>${esc(tag)}</span>`)
                  .join("")}</span>
                <span class="poster-card__cta">查看并保存 ${icon("arrowRight", 13)}</span>
              </span>
            </button>
          `
        ).join("")}
      </div>
      <section class="marketing-guide" aria-label="海报使用步骤">
        <div><span>01</span><strong>按客户场景选择</strong><p>品牌、专家阵容、企业价值与保险高客四套海报。</p></div>
        <div><span>02</span><strong>打开高清海报</strong><p>海报已由院方统一完成设计，无需等待生成。</p></div>
        <div><span>03</span><strong>保存后直接发送</strong><p>长按图片保存到相册，发朋友圈、客户群或私聊即可。</p></div>
      </section>
      <p class="source-note" style="padding:18px 22px 0">海报为 1080×1920 竖版图片，二维码统一指向企业健康服务平台，不展示项目人员姓名与联系方式。</p>
    `;
  }

  function openPosterSheet(id) {
    const poster = marketingPosterById(id);
    if (!poster) return;
    state.posterId = poster.id;
    state.overlay = { type: "poster", posterId: poster.id };
    renderOverlay();
  }

  function renderPosterSheet() {
    const poster = marketingPosterById(state.posterId);
    if (!poster || !state.adminUser) return "";
    return `
      <div class="sheet-backdrop" data-action="close-overlay"></div>
      <section class="sheet poster-sheet" role="dialog" aria-modal="true" aria-label="${esc(
        poster.title
      )}海报预览">
        <div class="sheet__grabber"></div>
        <div class="sheet__bar">
          <div>
            <h2>${esc(poster.eyebrow)}</h2>
            <p>高清宣传海报 · 无需生成 · 打开即可保存</p>
          </div>
          <button class="sheet__close" type="button" data-action="close-overlay" aria-label="关闭">
            ${icon("close", 15)}
          </button>
        </div>
        <div class="sheet__body">
          <div class="poster-sheet__frame">
            <img src="${esc(poster.image)}" alt="${esc(poster.title)}高清宣传海报" decoding="async">
          </div>
          <div class="poster-sheet__meta">
            <span class="poster-sheet__tags">${poster.tags
              .map((tag) => `<span>${esc(tag)}</span>`)
              .join("")}</span>
            <p>海报由院方统一设计，突出医院权威、专家资源与服务价值，客户扫码即可进入企业健康服务平台。</p>
            <p>在微信中可直接长按图片保存到相册，再发送朋友圈、客户群或私聊。</p>
          </div>
        </div>
        <div class="sheet__footer poster-sheet__footer">
          <button class="btn btn--primary" type="button" data-action="save-poster">
            ${icon("checkCircle", 16)} 保存高清海报
          </button>
          <button class="btn btn--ghost" type="button" data-action="copy-poster-link">
            ${icon("send", 15)} 复制活动链接
          </button>
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

  function renderAdminScreen() {
    const account = state.adminUser;
    if (!account) return renderAdminLogin();
    const adminOnlyTabs = ["accounts", "slots", "doctors"];
    const tab =
      adminOnlyTabs.includes(state.adminTab) && !isAdministrator()
        ? "appointments"
        : state.adminTab;
    return `
      <div class="admin-screen">
        <header class="admin-topbar">
          <div class="admin-topbar__brand">
            <img src="assets/logo.svg" alt="北京大学国际医院">
            <div>
              <strong>${esc(account.name)} · ${esc(roleMeta(account.role).label)}</strong>
              <span>${phoneLink(account.phone, account.phone)} · 企业健康项目组</span>
            </div>
          </div>
          <div class="admin-topbar__actions">
            <button class="icon-button" type="button" data-action="admin-close" aria-label="返回客户端">
              ${icon("close", 16)}
            </button>
            <button class="icon-button" type="button" data-action="admin-logout" aria-label="退出院方账号">
              ${icon("logout", 16)}
            </button>
          </div>
        </header>
        <main class="admin-content">
          ${
            tab === "reminders"
              ? renderFollowUpPage()
              : tab === "marketing"
              ? renderMarketingPage()
              : tab === "slots"
              ? renderSlotConfigPage()
              : tab === "doctors"
              ? renderDoctorAdminPage()
              : tab === "accounts"
              ? renderAdminAccountsPage()
              : renderAdminAppointmentsPage()
          }
        </main>
      </div>
    `;
  }

  function refreshAdminList() {
    const wrap = document.getElementById("admin-list");
    if (wrap) wrap.innerHTML = renderAdminListHTML();
  }

  function activeProjectAccounts() {
    return getAdminAccounts()
      .filter((account) => account.active)
      .sort((a, b) => {
        if (a.role === "administrator" && b.role !== "administrator") return -1;
        if (b.role === "administrator" && a.role !== "administrator") return 1;
        return a.name.localeCompare(b.name, "zh-CN");
      });
  }

  function staffSnapshot(account) {
    if (!account) return null;
    return {
      username: account.username,
      name: account.name,
      phone: account.phone
    };
  }

  function acceptAppointment() {
    const appointment = getAppointments().find((item) => item.id === state.adminReviewId);
    if (!appointment || !state.adminUser) return;
    const existing = appointmentAssignee(appointment);
    if (existing && existing.username !== state.adminUser.username && !isAdministrator()) {
      showToast(`该预约已由 ${existing.name} 接单，如需调整请联系系统管理员。`);
      return;
    }
    const now = new Date().toISOString();
    const staff = staffSnapshot(state.adminUser);
    let updated = null;
    const items = getAppointments().map((item) => {
      if (item.id !== appointment.id) return item;
      updated = {
        ...item,
        status: item.status === "pending" ? "accepted" : item.status,
        assignedStaff: staff,
        acceptedAt: item.acceptedAt || now,
        updatedAt: now
      };
      return updated;
    });
    saveAppointments(items);
    if (updated) {
      state.adminDraft = buildReviewDraft(updated);
      state.adminNoteEditing = false;
      renderOverlay();
      showToast(`已接单，项目负责人自动设为 ${staff.name}。`);
    }
  }

  function reassignAppointment(username) {
    if (!isAdministrator()) {
      showToast("仅系统管理员可以调整项目负责人。");
      return;
    }
    const appointment = getAppointments().find((item) => item.id === state.adminReviewId);
    const account = activeProjectAccounts().find((item) => item.username === username);
    if (!appointment || !account) return;
    const now = new Date().toISOString();
    const staff = staffSnapshot(account);
    let updated = null;
    const items = getAppointments().map((item) => {
      if (item.id !== appointment.id) return item;
      updated = {
        ...item,
        status: item.status === "pending" ? "accepted" : item.status,
        assignedStaff: staff,
        acceptedAt: item.acceptedAt || now,
        reply: item.reply
          ? { ...item.reply, contact: `${staff.name} · ${staff.phone}` }
          : null,
        updatedAt: now
      };
      return updated;
    });
    saveAppointments(items);
    if (updated) {
      state.adminDraft = buildReviewDraft(updated);
      renderOverlay();
      showToast(`项目负责人已调整为 ${staff.name}。`);
    }
  }

  function saveAdminReply(status) {
    const appointment = getAppointments().find((item) => item.id === state.adminReviewId);
    if (!appointment) return;
    const assignee = appointmentAssignee(appointment);
    if (!assignee) {
      showToast("请先接单并指定项目负责人，再确认活动方案。");
      return;
    }
    const fields = collectReviewFields();
    const message = fields.message || "";
    if (status === "confirmed" && !fields.topic) {
      showToast("请填写确认后的活动课题。");
      return;
    }
    const locationPending = Boolean(state.adminDraft?.locationPending);
    if (!locationPending && !fields.address) {
      showToast("请填写活动详细地址，或将活动地点标记为待确认。");
      return;
    }
    const reply = {
      topic: fields.topic || "",
      speaker: fields.speaker || "",
      schedule: fields.schedule || "",
      format: fields.format || "",
      outline: fields.outline || "",
      agenda: fields.agenda || "",
      contact: `${assignee.name} · ${assignee.phone}`,
      message,
      updatedAt: new Date().toISOString()
    };
    const now = reply.updatedAt;
    const items = getAppointments().map((item) => {
      if (item.id !== appointment.id) return item;
      const nextStatus =
        item.status === "completed" && status === "confirmed" ? "completed" : status;
      return {
        ...item,
        status: nextStatus,
        reply,
        province: normalizedProvince(fields.province || item.province),
        city: normalizedCity(fields.province || item.province, fields.city || item.city),
        venue: fields.venue || (locationPending ? "" : fields.address || item.venue || ""),
        address: fields.address || "",
        locationPending,
        assignedStaff: assignee,
        confirmedAt: nextStatus === "confirmed" ? item.confirmedAt || now : item.confirmedAt || null,
        completedAt: nextStatus === "completed" ? item.completedAt || now : item.completedAt || null,
        updatedAt: now
      };
    });
    saveAppointments(items);
    state.adminReviewId = null;
    state.adminDraft = null;
    releaseOverlayHistory();
    clearOverlayState();
    renderApp();
    showToast(
      status === "confirmed"
        ? appointment.status === "completed"
          ? "活动方案已更新，项目保持已完成状态。"
          : "活动方案已保存并同步给客户。"
        : status === "completed"
        ? "活动已归档为完成，后续不再进入短信待办。"
        : "预约信息已保存。"
    );
  }

  function buildReviewDraft(appointment) {
    const doctor = doctorById(appointment.doctorId);
    const staff = appointmentAssignee(appointment);
    return {
      topic: appointment.reply?.topic || topicOf(appointment),
      speaker:
        appointment.reply?.speaker ||
        (doctor ? `${doctor.name} ${doctor.title.split(" · ")[0]}` : "待院方安排"),
      schedule: appointment.reply?.schedule || `${formatDateCN(appointment.date)} ${appointment.time}`,
      format: appointment.reply?.format || appointment.format || "主题讲座 + 现场问答",
      outline:
        appointment.reply?.outline ||
        "1. 企业人群健康风险概览\n2. 专家主题分享\n3. 常见问题与误区\n4. 现场问答与健康咨询",
      agenda:
        appointment.reply?.agenda ||
        `${appointment.time.split("–")[0]} 签到与开场\n主题分享\n现场问答\n活动结束`,
      contact: staff ? `${staff.name} · ${staff.phone}` : "",
      province: normalizedProvince(appointment.province),
      city: normalizedCity(
        normalizedProvince(appointment.province),
        appointment.city
      ),
      venue: appointment.venue || "",
      address: appointment.address || "",
      locationPending: Boolean(appointment.locationPending),
      message:
        appointment.reply?.message ||
        "感谢贵司的预约与信任。院方项目组已完成专家与课题匹配，请确认活动流程与时间安排。如活动人数或场地有变化，请提前联系项目组。",
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

  function saveInternalNote() {
    const appointment = getAppointments().find((item) => item.id === state.adminReviewId);
    if (!appointment) return;
    const input = document.querySelector("[data-internal-note-input]");
    const note = input?.value.trim() || "";
    const now = new Date().toISOString();
    const items = getAppointments().map((item) =>
      item.id === appointment.id
        ? {
            ...item,
            internalNote: note,
            internalNoteUpdatedAt: now,
            internalNoteBy: state.adminUser
              ? { username: state.adminUser.username, name: state.adminUser.name }
              : null,
            updatedAt: now
          }
        : item
    );
    saveAppointments(items);
    state.adminNoteEditing = false;
    renderOverlay();
    showToast("院方内部备注已保存，客户端不可见。");
  }

  function smsFollowUpStatusMarkup(appointment) {
    const followUp = appointment.smsFollowUp;
    if (!followUp?.copiedAt) {
      return `
        <span class="sms-followup-state is-pending">
          ${icon("clock", 12)}
          尚未复制短信内容，复制后将自动视为已发送
        </span>
      `;
    }
    return `
      <span class="sms-followup-state is-done">
        ${icon("checkCircle", 12)}
        ${esc(followUp.copiedBy?.name || "项目人员")} 已于 ${formatDateTime(
          followUp.copiedAt
        )} 复制，自动视为已发送
      </span>
    `;
  }

  function refreshManualSmsStatus() {
    const status = document.querySelector("[data-sms-followup-status]");
    const appointment = getAppointments().find((item) => item.id === state.adminReviewId);
    if (status && appointment) status.innerHTML = smsFollowUpStatusMarkup(appointment);
  }

  function markSmsCopied(method, content) {
    const appointment = getAppointments().find((item) => item.id === state.adminReviewId);
    if (!appointment) return;
    const now = new Date().toISOString();
    const followUp = {
      copiedAt: now,
      phone: appointment.phone,
      content,
      method,
      copiedBy: state.adminUser
        ? {
            username: state.adminUser.username,
            name: state.adminUser.name,
            phone: state.adminUser.phone
          }
        : null
    };
    const items = getAppointments().map((item) =>
      item.id === appointment.id
        ? {
            ...item,
            smsFollowUp: followUp,
            assignedStaff: appointmentAssignee(item) || followUp.copiedBy,
            updatedAt: now
          }
        : item
    );
    saveAppointments(items);
    addSmsLog({
      appointmentId: appointment.id,
      recipient: `${appointment.contactName} ${appointment.phone}`,
      content,
      status: "已复制，视为已发送"
    });
  }

  function buildCustomerSmsText(appointment, fields = {}) {
    const staff = appointmentAssignee(appointment);
    const topic = fields.topic || appointment.reply?.topic || topicOf(appointment);
    const schedule =
      fields.schedule ||
      appointment.reply?.schedule ||
      `${formatDateCN(appointment.date)} ${appointment.time}`;
    const speaker = fields.speaker || appointment.reply?.speaker || "院方确认专家";
    const locationAppointment = {
      ...appointment,
      province: fields.province || appointment.province,
      city: fields.city || appointment.city,
      venue: fields.venue ?? appointment.venue,
      address: fields.address ?? appointment.address,
      locationPending: fields.locationPending ?? appointment.locationPending
    };
    const location = appointmentLocationText(locationAppointment);
    const contact = staff ? `${staff.name} ${staff.phone}` : "院方项目组";
    return `【北京大学国际医院】${appointment.contactName}您好，您预约的「${topic}」活动方案如下：时间 ${schedule}；地点 ${location}；出讲专家 ${speaker}。院方联系人：${contact}。如时间地点需要调整，请直接联系我，谢谢。`;
  }

  function manualSmsPayload() {
    const appointment = getAppointments().find((item) => item.id === state.adminReviewId);
    if (!appointment) return null;
    const fields = collectReviewFields();
    fields.locationPending = Boolean(state.adminDraft?.locationPending);
    return {
      phone: appointment.phone,
      text: buildCustomerSmsText(appointment, fields)
    };
  }

  function refreshManualSmsPreview() {
    const content = document.getElementById("manual-sms-content");
    if (!content) return;
    const payload = manualSmsPayload();
    if (payload) content.textContent = payload.text;
  }

  async function copyText(text) {
    const value = String(text || "");
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
        return true;
      }
    } catch {
      /* fall through to legacy copy */
    }
    const field = document.createElement("textarea");
    field.value = value;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    const copied = document.execCommand("copy");
    document.body.removeChild(field);
    return copied;
  }

  function renderInternalNoteCard(appointment) {
    const note = appointment.internalNote || "";
    const editing = state.adminNoteEditing;
    const meta = appointment.internalNoteUpdatedAt
      ? `${appointment.internalNoteBy?.name || "院方人员"} · ${formatDateTime(
          appointment.internalNoteUpdatedAt
        )}`
      : "";
    return `
      <section class="internal-note-card ${note ? "has-note" : ""}">
        <div class="internal-note-card__head">
          <span class="internal-note-card__icon">${icon("lock", 15)}</span>
          <div>
            <strong>院方内部备注</strong>
            <small>仅院方可见，不会同步给客户</small>
          </div>
          ${
            editing
              ? ""
              : `<button type="button" data-action="review-edit-note">${
                  note ? "编辑" : "添加备注"
                }</button>`
          }
        </div>
        ${
          editing
            ? `
              <textarea data-internal-note-input placeholder="记录沟通情况、特殊要求、内部协作事项等">${esc(
                note
              )}</textarea>
              <div class="internal-note-card__actions">
                <button class="btn btn--ghost btn--sm" type="button" data-action="review-cancel-note">取消</button>
                <button class="btn btn--primary btn--sm" type="button" data-action="review-save-note">保存备注</button>
              </div>
            `
            : note
            ? `
              <p class="internal-note-card__content">${esc(note)}</p>
              <small class="internal-note-card__meta">${esc(meta)}</small>
            `
            : `<p class="internal-note-card__empty">暂无内部备注，可记录沟通情况、特殊要求或内部协作事项。</p>`
        }
      </section>
    `;
  }

  function reviewWorkflowMarkup(appointment) {
    const accepted = Boolean(appointment.acceptedAt);
    const confirmed = appointment.status === "confirmed" || appointment.status === "completed";
    const smsDone = Boolean(appointment.smsFollowUp?.copiedAt);
    const completed = appointment.status === "completed";
    const current = completed ? 4 : confirmed ? (smsDone ? 3 : 3) : accepted ? 2 : 1;
    const steps = [
      { step: 1, title: "接单", desc: "分配项目负责人" },
      { step: 2, title: "确认方案", desc: "课题、流程与地点" },
      { step: 3, title: "短信跟进", desc: "复制短信并发送客户" },
      { step: 4, title: "完成归档", desc: "活动结束后收尾" }
    ];
    return `
      <div class="workflow-strip">
        ${steps
          .map((item) => {
            const done =
              (item.step === 1 && accepted) ||
              (item.step === 2 && confirmed) ||
              (item.step === 3 && smsDone) ||
              (item.step === 4 && completed);
            const active = item.step === current && !completed;
            return `
              <div class="workflow-step ${done ? "is-done" : ""} ${active ? "is-active" : ""}">
                <span>${done ? icon("check", 10) : item.step}</span>
                <div><strong>${item.title}</strong><small>${item.desc}</small></div>
              </div>
            `;
          })
          .join("")}
      </div>
    `;
  }

  function renderReviewSheet() {
    const appointment = getAppointments().find((item) => item.id === state.adminReviewId);
    if (!appointment) return "";
    const doctor = doctorById(appointment.doctorId);
    const draft = state.adminDraft || buildReviewDraft(appointment);
    const assignee = appointmentAssignee(appointment);
    const manualSmsText = assignee ? buildCustomerSmsText(appointment, draft) : "";
    const canSendSms = appointment.status === "confirmed" || appointment.status === "completed";
    return `
      <div class="sheet-backdrop" data-action="close-overlay"></div>
      <section class="sheet" role="dialog" aria-modal="true" aria-label="处理预约">
        <div class="sheet__grabber"></div>
        <div class="sheet__bar">
          <h2>处理预约</h2>
          <button class="sheet__close" type="button" data-action="close-overlay" aria-label="关闭">
            ${icon("close", 15)}
          </button>
        </div>
        <div class="sheet__body">
          <div style="padding:4px 18px 20px">
            ${reviewWorkflowMarkup(appointment)}
            <div class="review-summary">
              <div class="review-summary__top">
                ${
                  doctor
                    ? `<img src="${esc(doctorPhoto(doctor))}" alt="${esc(doctor.name)}" decoding="async">`
                    : `<span style="display:inline-flex;width:42px;height:48px;align-items:center;justify-content:center;border-radius:10px;background:var(--blue-soft);color:var(--blue)">${icon(
                        "experts",
                        19
                      )}</span>`
                }
                <div><strong>${esc(doctor ? doctor.name : "未指定专家")}</strong><small>${esc(
                  (TIERS[appointment.tier] || TIERS.specialist).name
                )} · ${esc(doctor?.dept || appointment.orgType)}</small></div>
              </div>
              ${statusPill(appointment.status)}
              <div class="review-info">
                <div class="review-info__row"><span>预约编号</span><strong>${esc(
                  appointment.id
                )}</strong></div>
                <div class="review-info__row"><span>企业机构</span><strong>${esc(
                  appointment.orgName
                )}</strong></div>
                <div class="review-info__row"><span>联系人</span><strong>${esc(
                  appointment.contactName
                )} ${esc(appointment.contactTitle || "")} · ${phoneLink(
                  appointment.phone,
                  appointment.phone
                )}</strong></div>
                <div class="review-info__row"><span>期望时间</span><strong>${formatDateCN(
                  appointment.date,
                  true
                )} ${esc(appointment.time)}</strong></div>
                <div class="review-info__row"><span>期望课题</span><strong>${esc(
                  topicOf(appointment)
                )}</strong></div>
                <div class="review-info__row"><span>活动形式</span><strong>${esc(
                  appointment.format
                )} · ${esc(appointment.audience)}</strong></div>
                <div class="review-info__row"><span>活动地点</span><strong>${appointmentLocationMarkup(
                  appointment
                )}</strong></div>
                <div class="review-info__row"><span>项目负责人</span><strong>${
                  assignee
                    ? assigneeContactMarkup(assignee)
                    : '<span class="location-pending">尚未接单</span>'
                }</strong></div>
              </div>
              ${
                appointment.note
                  ? `<div class="review-note"><strong>企业活动备注</strong><br>${esc(
                      appointment.note
                    )}</div>`
                  : ""
              }
            </div>
            ${
              !assignee
                ? `
                  <section class="assignment-card">
                    <span class="assignment-card__eyebrow">下一步 · 接单</span>
                    <h3>由你负责这个项目吗？</h3>
                    <p>接单后，你的姓名 ${esc(state.adminUser?.name || "")} 和手机号 ${phoneLink(
                      state.adminUser?.phone || "",
                      state.adminUser?.phone || ""
                    )} 会自动带入方案与客户联系人，企业端此时才会显示具体项目对接人。</p>
                    ${
                      isAdministrator()
                        ? `<div class="assignment-card__select">
                            <span>也可直接分配给</span>
                            <select data-assignee-select>
                              <option value="">选择项目负责人</option>
                              ${activeProjectAccounts()
                                .map(
                                  (account) =>
                                    `<option value="${esc(account.username)}">${esc(
                                      account.name
                                    )} · ${esc(account.phone)}</option>`
                                )
                                .join("")}
                            </select>
                          </div>`
                        : ""
                    }
                    <button class="btn btn--primary btn--block" type="button" data-action="review-accept">
                      ${icon("user", 15)} 接单并分配给我
                    </button>
                  </section>
                `
                : `
                  <div class="review-form">
                    <section class="assignee-panel">
                      <div class="assignee-panel__person">
                        <span>${esc(initialOf(assignee.name))}</span>
                        <div>
                          <small>当前项目负责人</small>
                          <strong>${esc(assignee.name)}</strong>
                          <p>${phoneLink(assignee.phone, assignee.phone)}</p>
                        </div>
                      </div>
                      ${
                        isAdministrator()
                          ? `<div class="assignee-panel__select">
                              <span>调整负责人</span>
                              <select data-assignee-select>
                                ${activeProjectAccounts()
                                  .map(
                                    (account) =>
                                      `<option value="${esc(account.username)}" ${
                                        account.username === assignee.username ? "selected" : ""
                                      }>${esc(account.name)} · ${esc(account.phone)}</option>`
                                  )
                                  .join("")}
                              </select>
                            </div>`
                          : `<span class="assignee-panel__locked">${icon("lock", 11)} 由管理员调整</span>`
                      }
                    </section>
                    <div class="form-card">
                      <div class="field">
                        <label for="review-topic">确认课题</label>
                        <input id="review-topic" type="text" data-review-field="topic" value="${esc(
                          draft.topic
                        )}">
                      </div>
                      <div class="field-row">
                        <div class="field">
                          <label for="review-speaker">出讲专家</label>
                          <input id="review-speaker" type="text" data-review-field="speaker" value="${esc(
                            draft.speaker
                          )}">
                        </div>
                        <div class="field">
                          <label for="review-format">活动形式</label>
                          <input id="review-format" type="text" data-review-field="format" value="${esc(
                            draft.format
                          )}">
                        </div>
                      </div>
                      <div class="field">
                        <label for="review-schedule">活动时间</label>
                        <input id="review-schedule" type="text" data-review-field="schedule" value="${esc(
                          draft.schedule
                        )}">
                      </div>
                      <div class="field">
                        <label for="review-outline">课题大纲</label>
                        <textarea id="review-outline" data-review-field="outline">${esc(
                          draft.outline
                        )}</textarea>
                      </div>
                      <div class="field">
                        <label for="review-agenda">活动流程</label>
                        <textarea id="review-agenda" data-review-field="agenda">${esc(
                          draft.agenda
                        )}</textarea>
                      </div>
                      <div class="field-row">
                        <div class="field">
                          <label for="review-province">省份</label>
                          <select id="review-province" data-review-field="province">
                            ${renderProvinceOptions(draft.province)}
                          </select>
                        </div>
                        <div class="field">
                          <label for="review-city">城市</label>
                          <select id="review-city" data-review-field="city">
                            ${renderCityOptions(draft.province, draft.city)}
                          </select>
                        </div>
                      </div>
                      <div class="field">
                        <label for="review-venue">活动场地</label>
                        <input id="review-venue" type="text" data-review-field="venue" value="${esc(
                          draft.venue
                        )}" placeholder="场地名称">
                      </div>
                      <div class="field">
                        <label for="review-address">详细地址 ${draft.locationPending ? "<span>待确认时可暂不填写</span>" : "<em>*</em>"}</label>
                        <input id="review-address" type="text" data-review-field="address" value="${esc(
                          draft.address
                        )}" placeholder="活动场地详细地址">
                      </div>
                      <label class="switch-row">
                        <span class="switch-row__label"><strong>活动地点待确认</strong><small>可先确认方案，地点后续再补充</small></span>
                        <span class="switch"><input type="checkbox" data-review-location-pending ${
                          draft.locationPending ? "checked" : ""
                        }><span></span></span>
                      </label>
                      <div class="field">
                        <label for="review-contact">项目组联系人 <span>接单后自动带入</span></label>
                        <input id="review-contact" type="text" data-review-field="contact" value="${esc(
                          draft.contact
                        )}" readonly>
                      </div>
                      <div class="field">
                        <label for="review-message">给企业的回复</label>
                        <textarea id="review-message" data-review-field="message" placeholder="补充说明、需企业确认的事项等">${esc(
                          draft.message
                        )}</textarea>
                      </div>
                    </div>
                    ${renderInternalNoteCard(appointment)}
                    ${
                      canSendSms
                        ? `
                          <section class="manual-sms-card">
                            <div class="manual-sms-card__head">
                              <span class="manual-sms-card__icon">${icon("message", 16)}</span>
                              <div>
                                <strong>手动发送客户短信</strong>
                                <small>根据已确认课题、地点与流程生成，复制后可用手机发送</small>
                              </div>
                            </div>
                            <div class="manual-sms-phone">
                              <span>客户手机号</span>
                              <strong>${phoneLink(appointment.phone, appointment.phone)}</strong>
                              <button type="button" data-action="copy-customer-phone">复制号码</button>
                            </div>
                            <div class="manual-sms-content" id="manual-sms-content">${esc(
                              manualSmsText
                            )}</div>
                            <div class="manual-sms-actions">
                              <button class="btn btn--ghost btn--sm" type="button" data-action="copy-customer-sms">
                                ${icon("file", 14)} 复制短信内容
                              </button>
                              <button class="btn btn--primary btn--sm" type="button" data-action="copy-customer-both">
                                ${icon("send", 14)} 复制号码和内容
                              </button>
                            </div>
                            <p class="manual-sms-note">
                              只有复制短信内容或“号码和内容”才算完成发送提醒；仅复制手机号不会消除短信待办。
                            </p>
                            <div data-sms-followup-status>${smsFollowUpStatusMarkup(appointment)}</div>
                          </section>
                        `
                        : `
                          <section class="manual-sms-locked">
                            ${icon("message", 16)}
                            <div><strong>客户短信将在方案确认后生成</strong><p>先确认课题、流程与地点，再用当前方案生成短信内容，避免把未确认信息发给客户。</p></div>
                          </section>
                        `
                    }
                    <div class="review-actions ${
                      appointment.status === "confirmed" ? "has-complete" : ""
                    }">
                      ${
                        appointment.status === "confirmed"
                          ? `<button class="btn btn--ghost" type="button" data-action="review-complete">活动结束并归档</button>`
                          : ""
                      }
                      <button class="btn btn--primary" type="button" data-action="review-confirm">${
                        appointment.reply ? "更新活动方案" : "确认方案并同步客户"
                      }</button>
                    </div>
                    <p class="review-action-note">${
                      appointment.status === "completed"
                        ? "该项目已归档为完成。更新方案不会改变完成状态。"
                        : appointment.status === "confirmed"
                        ? "方案已同步。复制客户短信完成提醒后，可在活动结束后归档。"
                        : "确认后会同步课题、流程、时间、地点与项目负责人；随后进入短信跟进。"
                    }</p>
                  </div>
                `
            }
            ${!assignee ? renderInternalNoteCard(appointment) : ""}
          </div>
        </div>
      </section>
    `;
  }

  /* =========================================================
     App render / controllers
     ========================================================= */
  function renderLoading() {
    return `
      <div class="loading-screen">
        <div class="loading-screen__inner">
          <img class="loading-screen__logo" src="assets/logo.svg" alt="北京大学国际医院">
          <div class="loading-bar"></div>
          <span>正在加载企业健康服务</span>
        </div>
      </div>
    `;
  }

  function renderLoadError() {
    return `
      <div class="error-screen">
        <div class="error-card">
          <h2>页面加载失败</h2>
          <p>请检查网络连接后重试。专家资料与预约数据需要正常加载。</p>
          <button class="btn btn--glass" type="button" data-action="reload-page">重新加载</button>
        </div>
      </div>
    `;
  }

  function renderApp({ scrollTo = null, animate = false } = {}) {
    if (!app) return;
    const currentScroll = window.scrollY || 0;
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
        app.innerHTML = renderAdminScreen();
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
      app.querySelector(".app-content, .auth-screen, .admin-screen")?.classList.add("is-instant");
    }
    renderOverlay();
    state.renderedOnce = true;
    restoreWindowScroll(scrollTo === null ? currentScroll : scrollTo);
  }

  function refreshExpertFilters() {
    document.querySelectorAll('[data-action="expert-filter"]').forEach((button) => {
      button.classList.toggle("is-active", button.dataset.value === state.expertFilter);
    });
    refreshExpertResults();
  }

  async function handleAction(action, el) {
    switch (action) {
      case "tab": {
        storeCurrentScroll();
        if (state.overlay) releaseOverlayHistory();
        state.screen = "main";
        state.tab = el.dataset.tab || "home";
        state.overlay = null;
        renderApp({ scrollTo: storedScrollForView(`main:${state.tab}`) });
        break;
      }
      case "start-login": {
        const pendingTab = el.dataset.pending;
        startLogin(pendingTab ? { type: "tab", tab: pendingTab } : { type: "tab", tab: "me" });
        break;
      }
      case "auth-close": {
        releaseAuthHistory();
        state.screen = "main";
        state.pendingAuth = null;
        state.booking = null;
        state.login.step = 1;
        renderApp({ scrollTo: storedScrollForView(`main:${state.tab}`) });
        break;
      }
      case "auth-step-back": {
        state.login.step = 1;
        renderApp();
        break;
      }
      case "auth-send-code": {
        readLoginFields();
        if (!/^1[3-9]\d{9}$/.test(state.login.phone)) {
          showToast("请先输入正确的 11 位手机号。");
          return;
        }
        renderApp();
        startCodeCountdown();
        showToast("验证码已生成，演示验证码为 888888。");
        break;
      }
      case "auth-demo": {
        state.login.phone = DEMO_PHONE;
        state.login.code = DEMO_CODE;
        state.login.agree = true;
        renderApp();
        showToast("已填入演示账号，点击登录即可。");
        break;
      }
      case "auth-submit":
        submitLogin();
        break;
      case "auth-org-type":
        state.login.orgType = el.dataset.value || "保险公司";
        document.querySelectorAll('[data-action="auth-org-type"]').forEach((button) => {
          button.classList.toggle("is-selected", button.dataset.value === state.login.orgType);
        });
        break;
      case "auth-complete-profile":
        completeProfile();
        break;
      case "open-booking": {
        openBooking(el.dataset.tier || "elite", el.dataset.date || "");
        break;
      }
      case "booking-close": {
        state.booking = null;
        dismissOverlay();
        break;
      }
      case "booking-back": {
        state.booking.step = Math.max(1, Number(state.booking.step) - 1);
        renderOverlay();
        break;
      }
      case "booking-next": {
        if (!validateBookingStep(Number(state.booking.step))) return;
        state.booking.step = Math.min(3, Number(state.booking.step) + 1);
        renderOverlay();
        document.querySelector(".flow__body")?.scrollTo(0, 0);
        break;
      }
      case "booking-tier": {
        const tier = el.dataset.value;
        const options = buildDateOptions(tier, 12);
        const first = options.find((option) => !option.full) || options[0];
        const firstSlot = first?.slots.find((slot) => !slot.full);
        state.booking.tier = tier;
        state.booking.date = first?.iso || "";
        state.booking.slot = firstSlot?.id || "";
        state.booking.doctorId = "";
        state.booking.topic = defaultTopicFor(tier);
        state.booking.customTopic = "";
        refreshBookingStepOneUi({ rebuildDates: true, rebuildSlots: true });
        break;
      }
      case "booking-date": {
        const date = el.dataset.date;
        const option = bookingDateOptions().find((item) => item.iso === date);
        if (!option || option.full) {
          showToast("该日期暂无可预约档期。");
          return;
        }
        state.booking.date = date;
        state.booking.slot = option.slots.find((slot) => !slot.full)?.id || "";
        state.booking.doctorId = "";
        refreshBookingStepOneUi({ rebuildSlots: true });
        break;
      }
      case "booking-slot":
        state.booking.slot = el.dataset.value;
        state.booking.doctorId = "";
        refreshBookingStepOneUi();
        break;
      case "booking-doctor": {
        state.booking.doctorId = el.dataset.value || "";
        const doctor = doctorById(state.booking.doctorId);
        if (doctor?.tags?.[0]) state.booking.topic = doctor.tags[0];
        refreshBookingStepTwoUi({ doctorChanged: true });
        break;
      }
      case "booking-topic":
        state.booking.topic = el.dataset.value || defaultTopicFor(state.booking.tier);
        state.booking.customTopic = "";
        refreshBookingStepTwoUi({ doctorChanged: true });
        break;
      case "booking-format":
        state.booking.format = el.dataset.value || "主题讲座 + 现场问答";
        refreshBookingStepTwoUi({ formatChanged: true });
        break;
      case "booking-submit":
        submitBooking();
        break;
      case "success-appointment": {
        const id = el.dataset.appointmentId;
        state.booking = null;
        state.overlay = { type: "appointment", appointmentId: id };
        renderApp();
        break;
      }
      case "success-appointments":
        state.booking = null;
        releaseOverlayHistory();
        state.overlay = null;
        state.tab = "appointments";
        renderApp();
        window.scrollTo(0, 0);
        break;
      case "open-doctor":
        openDoctorSheet(el.dataset.doctorId);
        break;
      case "open-poster":
        openPosterSheet(el.dataset.posterId);
        break;
      case "save-poster":
        saveMarketingPoster();
        break;
      case "copy-poster-link": {
        const copied = await copyText(SERVICE_LINK);
        showToast(copied ? "活动链接已复制，可直接发给客户。" : "复制失败，请手动复制当前页面链接。");
        break;
      }
      case "book-doctor": {
        const doctor = doctorById(el.dataset.doctorId);
        if (!doctor) return;
        openBooking(doctor.tier);
        state.booking.doctorId = String(doctor.id);
        state.booking.topic = doctor.tags?.[0] || defaultTopicFor(doctor.tier);
        renderOverlay();
        break;
      }
      case "open-appointment":
        openAppointmentSheet(el.dataset.appointmentId);
        break;
      case "close-overlay":
        dismissOverlay();
        break;
      case "expert-filter":
        state.expertFilter = el.dataset.value || "elite";
        refreshExpertFilters();
        break;
      case "expert-clear":
        state.expertSearch = "";
        const expertSearch = document.getElementById("expert-search");
        if (expertSearch) expertSearch.value = "";
        refreshExpertResults();
        document.querySelector('[data-action="expert-clear"]')?.setAttribute("hidden", "");
        break;
      case "appointment-filter":
        state.appointmentFilter = el.dataset.value || "all";
        refreshAppointmentList();
        break;
      case "edit-profile":
        if (!state.session) {
          startLogin({ type: "tab", tab: "me" });
          return;
        }
        state.profileDraft = clone(state.session);
        state.overlay = { type: "profile" };
        renderOverlay();
        break;
      case "save-profile":
        saveProfile();
        break;
      case "logout":
        clearSession();
        state.tab = "me";
        state.overlay = null;
        renderApp();
        showToast("已退出登录。");
        break;
      case "reset-demo": {
        releaseOverlayHistory();
        Object.values(STORAGE).forEach((key) => {
          try {
            localStorage.removeItem(key);
          } catch {
            /* no-op */
          }
        });
        ensureSeedData();
        clearSession();
        clearAdminSession();
        setLastPortal("client");
        state.tab = "home";
        state.screen = "main";
        state.overlay = null;
        state.appointmentFilter = "all";
        state.expertFilter = "elite";
        state.expertSearch = "";
        state.booking = null;
        renderApp();
        showToast("演示数据已重置。");
        break;
      }
      case "open-admin":
        openAdmin();
        break;
      case "admin-close":
        releaseAdminHistory();
        setLastPortal("client");
        state.screen = "main";
        state.tab = "home";
        renderApp({ scrollTo: storedScrollForView("main:home") });
        break;
      case "admin-demo":
        state.adminLogin.username = DEFAULT_ADMIN_ACCOUNTS[0].username;
        state.adminLogin.password = DEFAULT_ADMIN_ACCOUNTS[0].password;
        state.adminLogin.error = "";
        renderApp();
        break;
      case "admin-login":
        submitAdminLogin();
        break;
      case "admin-logout":
        releaseAdminHistory();
        clearAdminSession();
        setLastPortal("client");
        state.adminLogin = { username: "", password: "", error: "" };
        state.screen = "main";
        state.tab = "me";
        renderApp();
        showToast("已退出院方工作台。");
        break;
      case "admin-tab":
        if (["accounts", "slots", "doctors"].includes(el.dataset.value) && !isAdministrator()) {
          showToast("仅系统管理员可以访问该配置。");
          return;
        }
        storeCurrentScroll();
        state.adminTab = el.dataset.value || "appointments";
        state.adminSearch = "";
        state.adminFilter = "all";
        renderApp({ scrollTo: storedScrollForView(`admin:${state.adminTab}`) });
        break;
      case "admin-account-new":
        openAdminAccountEditor();
        break;
      case "admin-account-edit":
        openAdminAccountEditor(el.dataset.username || "");
        break;
      case "admin-account-save":
        saveAdminAccount();
        break;
      case "admin-slot-tier":
        if (!isAdministrator()) return;
        state.adminSlotTier = el.dataset.value || "elite";
        state.adminSlotDoctorId = "";
        state.adminSlotDate = "";
        refreshSlotConfig();
        break;
      case "admin-slot-doctor":
        if (!isAdministrator()) return;
        state.adminSlotDoctorId = el.dataset.value || "";
        refreshSlotConfig();
        break;
      case "admin-slot-date":
        if (!isAdministrator()) return;
        state.adminSlotDate = el.dataset.value || "";
        refreshSlotConfig();
        break;
      case "slot-batch-scope":
        if (!isAdministrator()) return;
        if (["date", "all", "tier"].includes(el.dataset.value)) {
          state.adminSlotBatchScope = el.dataset.value;
          refreshSlotConfig();
        }
        break;
      case "slot-batch-preset":
        if (!isAdministrator()) return;
        applySlotBatch(Number(el.dataset.value || 0));
        break;
      case "slot-draft-save":
        if (!isAdministrator()) return;
        saveSlotDraft();
        break;
      case "slot-draft-reset":
        if (!isAdministrator()) return;
        resetSlotDraft();
        break;
      case "slot-capacity": {
        if (!isAdministrator()) return;
        const delta = Number(el.dataset.delta || 0);
        const scope = el.dataset.scope === "doctor" ? "doctor" : "tier";
        const current = getSlotConfigCapacity(
          scope,
          el.dataset.tier,
          el.dataset.doctorId,
          el.dataset.date,
          el.dataset.slot
        );
        const result = setSlotConfigCapacity(
          scope,
          el.dataset.tier,
          el.dataset.doctorId,
          el.dataset.date,
          el.dataset.slot,
          current + delta
        );
        if (result.adjusted) {
          showToast("号源数量不能低于该时段已预约数量，已自动保留已约数量。");
        }
        refreshSlotConfig();
        break;
      }
      case "admin-doctor-new":
        openAdminDoctorEditor();
        break;
      case "admin-doctor-edit":
        openAdminDoctorEditor(el.dataset.doctorId || "");
        break;
      case "admin-doctor-save":
        saveAdminDoctor();
        break;
      case "admin-filter":
        state.adminFilter = el.dataset.value || "all";
        refreshAdminList();
        document.querySelectorAll('[data-action="admin-filter"]').forEach((button) => {
          button.classList.toggle("is-active", button.dataset.value === state.adminFilter);
        });
        break;
      case "open-review": {
        const id = el.dataset.appointmentId;
        const appointment = getAppointments().find((item) => item.id === id);
        if (!appointment) return;
        state.adminReviewId = id;
        state.adminDraft = buildReviewDraft(appointment);
        state.adminNoteEditing = false;
        state.overlay = { type: "review" };
        renderOverlay();
        break;
      }
      case "review-accept":
        acceptAppointment();
        break;
      case "review-confirm": {
        saveAdminReply("confirmed");
        break;
      }
      case "review-save-note":
        saveInternalNote();
        break;
      case "review-edit-note":
        state.adminNoteEditing = true;
        renderOverlay();
        requestAnimationFrame(() => {
          document.querySelector("[data-internal-note-input]")?.focus();
        });
        break;
      case "review-cancel-note":
        state.adminNoteEditing = false;
        renderOverlay();
        break;
      case "review-complete":
        saveAdminReply("completed");
        break;
      case "edit-location":
        openLocationEditor(el.dataset.appointmentId || state.overlay?.appointmentId || "");
        break;
      case "close-location": {
        const id = state.locationDraft?.appointmentId || state.overlay?.appointmentId;
        state.locationDraft = null;
        if (state.overlayHistoryDepth > 1) releaseOverlayHistory(1);
        state.overlay = id ? { type: "appointment", appointmentId: id } : null;
        renderOverlay();
        break;
      }
      case "save-location":
        saveLocation();
        break;
      case "copy-customer-phone": {
        const payload = manualSmsPayload();
        if (!payload) return;
        const copied = await copyText(payload.phone);
        showToast(copied ? "客户手机号已复制。" : "复制失败，请手动选择号码。");
        break;
      }
      case "copy-customer-sms": {
        const payload = manualSmsPayload();
        if (!payload) return;
        const copied = await copyText(payload.text);
        if (copied) {
          markSmsCopied("content", payload.text);
          refreshManualSmsStatus();
        }
        showToast(copied ? "短信内容已复制。" : "复制失败，请手动复制内容。");
        break;
      }
      case "copy-customer-both": {
        const payload = manualSmsPayload();
        if (!payload) return;
        const copied = await copyText(`手机号：${payload.phone}\n\n${payload.text}`);
        if (copied) {
          markSmsCopied("both", payload.text);
          refreshManualSmsStatus();
        }
        showToast(copied ? "客户号码和短信内容已复制。" : "复制失败，请手动复制。");
        break;
      }
      case "reload-page":
        window.location.reload();
        break;
      default:
        break;
    }
  }

  function handleInput(event) {
    const target = event.target;
    if (target.matches("[data-expert-search]")) {
      state.expertSearch = target.value;
      refreshExpertResults();
      return;
    }
    if (target.matches("[data-admin-search]")) {
      state.adminSearch = target.value;
      refreshAdminList();
      return;
    }
    if (target.matches("[data-login-field]")) {
      state.login[target.dataset.loginField] = target.value;
      return;
    }
    if (target.matches("[data-booking-field]")) {
      let value = target.value;
      if (target.dataset.bookingField === "phone") value = value.replace(/\D/g, "").slice(0, 11);
      state.booking[target.dataset.bookingField] = value;
      return;
    }
    if (target.matches("[data-profile-field]") && state.profileDraft) {
      state.profileDraft[target.dataset.profileField] = target.value;
      return;
    }
    if (target.matches("[data-review-field]") && state.adminDraft) {
      state.adminDraft[target.dataset.reviewField] = target.value;
      refreshManualSmsPreview();
      return;
    }
    if (target.matches("[data-account-field]") && state.adminAccountDraft) {
      state.adminAccountDraft[target.dataset.accountField] = target.value;
      return;
    }
    if (target.matches("[data-doctor-field]") && state.adminDoctorDraft) {
      state.adminDoctorDraft[target.dataset.doctorField] = target.value;
      return;
    }
    if (target.id === "admin-username") {
      state.adminLogin.username = target.value;
      return;
    }
    if (target.id === "admin-password") {
      state.adminLogin.password = target.value;
    }
  }

  function handleChange(event) {
    const target = event.target;
    if (target.matches("[data-assignee-select]")) {
      const username = target.value;
      if (username) reassignAppointment(username);
      return;
    }
    if (target.matches("[data-login-agree]")) {
      state.login.agree = target.checked;
      return;
    }
    if (target.matches("[data-booking-agree]")) {
      state.booking.agree = target.checked;
      return;
    }
    if (target.matches("[data-booking-switch]")) {
      state.booking[target.dataset.bookingSwitch] = target.checked;
      return;
    }
    if (target.matches('[data-booking-field="province"]')) {
      state.booking.province = target.value;
      state.booking.city = citiesForProvince(target.value)[0];
      const citySelect = document.getElementById("booking-city");
      if (citySelect) {
        citySelect.innerHTML = renderCityOptions(state.booking.province, state.booking.city);
      }
      return;
    }
    if (target.matches("[data-review-location-pending]") && state.adminDraft) {
      state.adminDraft.locationPending = target.checked;
      renderOverlay();
      return;
    }
    if (
      target.matches('[data-review-field="province"]') &&
      state.adminDraft
    ) {
      state.adminDraft.province = target.value;
      state.adminDraft.city = citiesForProvince(target.value)[0];
      const citySelect = document.getElementById("review-city");
      if (citySelect) {
        citySelect.innerHTML = renderCityOptions(
          state.adminDraft.province,
          state.adminDraft.city
        );
      }
      refreshManualSmsPreview();
      return;
    }
    if (
      target.matches('[data-review-field="city"]') &&
      state.adminDraft
    ) {
      state.adminDraft.city = target.value;
      refreshManualSmsPreview();
      return;
    }
    if (target.matches("[data-location-pending]") && state.locationDraft) {
      state.locationDraft.locationPending = target.checked;
      renderOverlay();
      return;
    }
    if (target.matches('[data-location-field="province"]') && state.locationDraft) {
      state.locationDraft.province = target.value;
      state.locationDraft.city = citiesForProvince(target.value)[0];
      const citySelect = document.getElementById("location-city");
      if (citySelect) {
        citySelect.innerHTML = renderCityOptions(
          state.locationDraft.province,
          state.locationDraft.city
        );
      }
      return;
    }
    if (target.matches('[data-location-field="city"]') && state.locationDraft) {
      state.locationDraft.city = target.value;
      return;
    }
    if (target.matches("[data-account-active]") && state.adminAccountDraft) {
      state.adminAccountDraft.active = target.checked;
      return;
    }
    if (target.matches("[data-doctor-active]") && state.adminDoctorDraft) {
      state.adminDoctorDraft.active = target.checked;
      return;
    }
    if (target.matches("[data-doctor-photo]")) {
      handleDoctorPhotoUpload(target.files?.[0]);
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
          lastY: touch.clientY,
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
        sheetDrag.lastY = touch.clientY;
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
        const sheet = sheetDrag.sheet;
        const dy = sheetDrag.dy;
        const backdrop = overlayRoot.querySelector(".sheet-backdrop");
        sheet.style.transform = `translate(-50%, ${dy}px)`;
        sheet.style.borderRadius = `${28 + Math.min(10, dy / 18)}px ${28 + Math.min(10, dy / 18)}px 0 0`;
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
      const sheet = drag.sheet;
      const backdrop = overlayRoot.querySelector(".sheet-backdrop");
      if (drag.dy >= 90 || (drag.dy >= 32 && velocity >= 0.35)) {
        sheet.style.transition = "transform 0.22s cubic-bezier(0.4, 0, 0.6, 1)";
        sheet.style.transform = "translate(-50%, 105%)";
        if (backdrop) {
          backdrop.style.transition = "opacity 0.18s";
          backdrop.style.opacity = "0";
        }
        window.setTimeout(() => dismissOverlay(), 190);
      } else {
        sheet.style.transition = "transform 0.28s cubic-bezier(0.22, 0.8, 0.24, 1)";
        sheet.style.transform = "translate(-50%, 0)";
        sheet.style.borderRadius = "";
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
        state.overlayHistoryDepth = Math.max(0, state.overlayHistoryDepth - 1);
        if (state.overlay.type === "location" && state.overlayHistoryDepth > 0) {
          const id = state.locationDraft?.appointmentId || state.overlay.appointmentId;
          state.locationDraft = null;
          state.overlay = id ? { type: "appointment", appointmentId: id } : null;
          renderOverlay();
          return;
        }
        state.overlayHistoryDepth = 0;
        clearOverlayState();
        if (state.screen === "admin" || state.screen === "admin-login") renderApp();
        else renderOverlay();
        document.body.classList.remove("is-locked");
        return;
      }
      if (state.screen === "auth") {
        state.historyDepth = Math.max(0, state.historyDepth - 1);
        state.overlayHistoryDepth = 0;
        state.authHistory = false;
        state.screen = "main";
        state.pendingAuth = null;
        state.booking = null;
        state.login.step = 1;
        renderApp({ scrollTo: storedScrollForView(`main:${state.tab}`) });
        return;
      }
      if (state.screen === "admin-login" || state.screen === "admin") {
        state.historyDepth = 0;
        state.overlayHistoryDepth = 0;
        state.adminHistory = false;
        setLastPortal("client");
        state.screen = "main";
        state.tab = "home";
        renderApp({ scrollTo: storedScrollForView("main:home") });
        return;
      }
      if (state.historyDepth > 0) {
        state.historyDepth = Math.max(0, state.historyDepth - 1);
        state.overlayHistoryDepth = Math.max(0, state.overlayHistoryDepth - 1);
      }
    });
  }

  async function boot() {
    bindEvents();
    renderApp();
    try {
      const citiesPromise = fetch("assets/china-cities.json")
        .then((response) => (response.ok ? response.json() : null))
        .catch(() => null);
      const response = await fetch("assets/doctors.json");
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const doctors = await response.json();
      if (!Array.isArray(doctors) || !doctors.length) throw new Error("empty doctors");
      const cities = await citiesPromise;
      if (cities && typeof cities === "object" && !Array.isArray(cities)) {
        state.chinaCities = cities;
      }
      state.baseDoctors = doctors;
      refreshDoctors();
      ensureSeedData();
      migrateAppointmentStatuses();
      state.session = readJSON(STORAGE.session, null);
      state.lastPortal = readJSON(STORAGE.lastPortal, "client");
      const adminSession = readJSON(STORAGE.adminSession, null);
      const assignedAdmin = adminSession?.username
        ? getAdminAccounts().find(
            (account) => account.username === adminSession.username && account.active
          )
        : null;
      if (assignedAdmin) setAdminSession(assignedAdmin);
      else clearAdminSession();
      state.loaded = true;
      state.loadError = false;
      if (location.hash === "#/admin") {
        state.screen = state.adminAuthed ? "admin" : "admin-login";
      } else if (state.adminAuthed && state.lastPortal === "admin") {
        state.screen = "admin";
      } else {
        state.screen = "main";
      }
      if (state.screen === "admin" || state.screen === "admin-login") {
        state.adminHistory = true;
        if (window.history.state?.pkuihLayer === "admin") {
          state.historyDepth = Math.max(1, state.historyDepth);
        } else {
          pushAppHistory("admin");
        }
      }
      renderApp();
    } catch (error) {
      console.error("Failed to load application data:", error);
      state.loaded = true;
      state.loadError = true;
      renderApp();
    }
  }

  boot();
})();
