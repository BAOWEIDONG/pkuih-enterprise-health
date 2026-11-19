/* =========================================================
   名医入企 · 企业健康合作平台
   Static H5 demo. Data is persisted in localStorage.
   ========================================================= */
(() => {
  "use strict";

  const STORAGE = {
    appointments: "pkuih_enterprise_appointments_v1",
    smsSettings: "pkuih_enterprise_sms_settings_v1",
    smsLogs: "pkuih_enterprise_sms_logs_v1",
    adminAuth: "pkuih_enterprise_admin_auth_v1"
  };

  const ADMIN_USER = "admin";
  const ADMIN_PASSWORD = "pkuih2026";

  const TIERS = {
    elite: {
      id: "elite",
      order: 1,
      name: "大咖医生",
      shortName: "大咖",
      count: 10,
      priceLabel: "¥100,000",
      priceUnit: "/ 场",
      priceMin: 100000,
      priceRange: "¥100,000 / 场",
      leadDays: 30,
      leadLabel: "提前 30 天申请",
      position: "院士级 · 学科领军 · 院级专家",
      description: "适合高净值客户活动、重要合作伙伴答谢与年度健康峰会。",
      tag: "需提前锁档"
    },
    director: {
      id: "director",
      order: 2,
      name: "主任专家",
      shortName: "主任",
      count: 12,
      priceLabel: "¥20,000–50,000",
      priceUnit: "/ 场",
      priceMin: 20000,
      priceMax: 50000,
      priceRange: "¥20,000–50,000 / 场",
      leadDays: 14,
      leadLabel: "提前 14 天申请",
      position: "科室主任 · 教授 · 主任医师",
      description: "适合专题健康讲座、专家面对面咨询与客户健康管理活动。",
      tag: "支持课题定制"
    },
    specialist: {
      id: "specialist",
      order: 3,
      name: "专业医生",
      shortName: "专业",
      count: 18,
      priceLabel: "¥6,000 起",
      priceUnit: "/ 场",
      priceMin: 6000,
      priceRange: "¥6,000 起 / 场",
      leadDays: 7,
      leadLabel: "提前 7 天申请",
      position: "主任 / 副主任医师",
      description: "适合常态化员工健康课堂、科室主题科普与健康嘉年华。",
      tag: "最快 7 天"
    }
  };

  const TIER_ORDER = ["elite", "director", "specialist"];

  const STATUS = {
    pending: {
      label: "待院方确认",
      tone: "pending",
      title: "预约需求已提交",
      help: "院方项目组正在匹配专家与档期，通常会在 2 小时内联系您。"
    },
    confirmed: {
      label: "已确认",
      tone: "confirmed",
      title: "院方已确认预约",
      help: "专家与课题已确认，请查看院方回复的具体安排。"
    },
    completed: {
      label: "已完成",
      tone: "completed",
      title: "活动已完成",
      help: "感谢您的信任，项目组会跟进活动回访与后续健康服务。"
    },
    needs_info: {
      label: "待补充信息",
      tone: "needs_info",
      title: "院方需要补充信息",
      help: "请留意院方回复，或致电项目组补充活动信息。"
    }
  };

  const TIME_SLOTS = [
    { id: "morning", label: "09:30–11:30", sub: "上午场" },
    { id: "afternoon", label: "14:00–16:00", sub: "下午场" },
    { id: "evening", label: "19:00–21:00", sub: "晚间场" }
  ];

  const DEFAULT_SMS_SETTINGS = {
    enabled: true,
    recipients: "项目组 A：138 0000 0001\n项目组 B：138 0000 0002",
    triggers: {
      created: true,
      confirmed: true,
      before3: true,
      before1: true
    },
    template:
      "【北京大学国际医院】企业健康预约提醒：{org}已提交「{topic}」预约，拟于 {date} {time} 在 {venue} 进行，预约号 {id}。请项目组及时跟进。",
    updatedAt: ""
  };

  const defaultSmsLogs = [
    {
      id: "sms-seed-1",
      appointmentId: "DEMO-2026-001",
      recipient: "项目组 A",
      content: "示例预约提醒 · 演示保险 · 颈腰椎健康",
      status: "示例记录",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
      demo: true
    }
  ];

  const state = {
    doctors: [],
    loaded: false,
    loadError: false,
    expertFilter: "elite",
    expertLimit: 8,
    overlay: null,
    booking: null,
    lastAppointment: null,
    admin: {
      tab: "appointments",
      statusFilter: "all",
      search: "",
      reviewId: null
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

  function nl2br(value) {
    return esc(value).replace(/\n/g, "<br>");
  }

  function safeJSON(value, fallback) {
    try {
      return JSON.parse(value);
    } catch {
      return fallback;
    }
  }

  function readStore(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch {
      return fallback;
    }
  }

  function writeStore(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      showToast("当前浏览器不支持本地存储，演示数据将无法持久保存。");
    }
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function pad(value) {
    return String(value).padStart(2, "0");
  }

  function startOfDay(date = new Date()) {
    const value = new Date(date);
    value.setHours(0, 0, 0, 0);
    return value;
  }

  function addDays(date, amount) {
    const value = new Date(date);
    value.setDate(value.getDate() + amount);
    return value;
  }

  function isoDate(date) {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  }

  function parseIsoDate(value) {
    if (!value) return null;
    const parts = value.split("-").map(Number);
    if (parts.length !== 3 || parts.some(Number.isNaN)) return null;
    const date = new Date(parts[0], parts[1] - 1, parts[2]);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  function formatDate(value, withYear = false) {
    const date = typeof value === "string" ? parseIsoDate(value) : value;
    if (!date) return "待确认";
    const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
    if (withYear) {
      return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 周${weekdays[date.getDay()]}`;
    }
    return `${date.getMonth() + 1}月${date.getDate()}日 周${weekdays[date.getDay()]}`;
  }

  function formatShortDate(value) {
    const date = typeof value === "string" ? parseIsoDate(value) : value;
    if (!date) return "待确认";
    return `${date.getMonth() + 1}.${pad(date.getDate())}`;
  }

  function weekday(date) {
    return `周${["日", "一", "二", "三", "四", "五", "六"][date.getDay()]}`;
  }

  function formatDateTime(value) {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(
      date.getHours()
    )}:${pad(date.getMinutes())}`;
  }

  function formatChineseDate(value) {
    const date = typeof value === "string" ? parseIsoDate(value) : value;
    if (!date) return "待确认";
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  }

  function hashString(value) {
    let hash = 2166136261;
    for (let index = 0; index < value.length; index += 1) {
      hash ^= value.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return Math.abs(hash);
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
    return state.doctors.find((doctor) => String(doctor.id) === String(id)) || null;
  }

  function doctorsForTier(tierId) {
    return state.doctors.filter((doctor) => doctor.tier === tierId);
  }

  function tierOf(doctor) {
    return TIERS[doctor?.tier] || TIERS.specialist;
  }

  function route() {
    const hash = window.location.hash;
    if (hash.startsWith("#/admin")) return "admin";
    if (hash === "#/appointments") return "appointments";
    return "home";
  }

  function isAdminAuthed() {
    try {
      return sessionStorage.getItem(STORAGE.adminAuth) === "1";
    } catch {
      return false;
    }
  }

  function setAdminAuthed(value) {
    try {
      if (value) sessionStorage.setItem(STORAGE.adminAuth, "1");
      else sessionStorage.removeItem(STORAGE.adminAuth);
    } catch {
      /* no-op */
    }
  }

  function getAppointments() {
    return readStore(STORAGE.appointments, []);
  }

  function saveAppointments(items) {
    writeStore(STORAGE.appointments, items);
  }

  function getSmsSettings() {
    const saved = readStore(STORAGE.smsSettings, null);
    const base = clone(DEFAULT_SMS_SETTINGS);
    if (!saved) return base;
    return {
      ...base,
      ...saved,
      triggers: { ...base.triggers, ...(saved.triggers || {}) }
    };
  }

  function saveSmsSettings(settings) {
    writeStore(STORAGE.smsSettings, settings);
  }

  function getSmsLogs() {
    return readStore(STORAGE.smsLogs, defaultSmsLogs);
  }

  function addSmsLog(entry) {
    const logs = getSmsLogs();
    logs.unshift({
      id: `sms-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      createdAt: new Date().toISOString(),
      status: "已发送",
      ...entry
    });
    writeStore(STORAGE.smsLogs, logs.slice(0, 50));
  }

  function generateAppointmentId(date = new Date()) {
    const prefix = `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}`;
    const random = String(Math.floor(Math.random() * 900 + 100));
    return `BD-${prefix}-${random}`;
  }

  function showToast(message) {
    if (!toastEl) return;
    toastEl.innerHTML = `${icon("checkCircle", 17)}<span>${esc(message)}</span>`;
    toastEl.classList.add("is-visible");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => {
      toastEl.classList.remove("is-visible");
    }, 3200);
  }

  function requireDoctors() {
    if (state.loaded) return true;
    showToast("专家资料正在加载，请稍后再试。");
    return false;
  }

  function icon(name, size = 18) {
    const paths = ICONS[name] || ICONS.arrowRight;
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
  }

  const ICONS = {
    arrowRight: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
    arrowUpRight: '<path d="M7 17 17 7"/><path d="M8 7h9v9"/>',
    chevronRight: '<path d="m9 18 6-6-6-6"/>',
    chevronLeft: '<path d="m15 18-6-6 6-6"/>',
    close: '<path d="m18 6-12 12"/><path d="m6 6 12 12"/>',
    menu: '<path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/>',
    calendar:
      '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4"/><path d="M8 3v4"/><path d="M3 10h18"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    users:
      '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    building:
      '<path d="M3 21h18"/><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/><path d="M9 7h1"/><path d="M14 7h1"/><path d="M9 11h1"/><path d="M14 11h1"/><path d="M9 15h1"/><path d="M14 15h1"/>',
    shield:
      '<path d="M12 3 4.5 6v5.2c0 4.6 3.2 8.2 7.5 9.8 4.3-1.6 7.5-5.2 7.5-9.8V6Z"/><path d="m9 12 2 2 4-4"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    checkCircle: '<circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/>',
    phone:
      '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.1.85.3 1.68.57 2.47a2 2 0 0 1-.45 2.11L8 9.5a16 16 0 0 0 6.5 6.5l1.2-1.2a2 2 0 0 1 2.1-.45c.8.27 1.63.47 2.48.57A2 2 0 0 1 22 16.92Z"/>',
    mail:
      '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    pin: '<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    spark:
      '<path d="m12 3 1.4 4.2L18 8.6l-4.6 1.4L12 14.2l-1.4-4.2L6 8.6l4.6-1.4L12 3Z"/><path d="m19 15 .7 2.1 2.1.7-2.1.7L19 21l-.7-2.5-2.1-.7 2.1-.7L19 15Z"/>',
    message:
      '<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"/><path d="M8 9h8"/><path d="M8 13h5"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 8h.01"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    bell:
      '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/>',
    settings:
      '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.34-1.88l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1.1 1.5 1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.1.36.3.7.6 1 .3.3.7.5 1.1.5h.1a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1.1Z"/>',
    list: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 9h8"/><path d="M8 13h8"/><path d="M8 17h5"/>',
    logout:
      '<path d="M10 17l5-5-5-5"/><path d="M15 12H3"/><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>',
    plus: '<path d="M12 5v14"/><path d="M5 12h14"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/>',
    quote:
      '<path d="M10 11H6a1 1 0 0 1-1-1V7a3 3 0 0 1 3-3h1"/><path d="M20 11h-4a1 1 0 0 1-1-1V7a3 3 0 0 1 3-3h1"/><path d="M6 11v3a6 6 0 0 0 6 6"/><path d="M16 11v3a6 6 0 0 0 6 6"/>',
    home:
      '<path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/>',
    stethoscope:
      '<path d="M6 3v5a4 4 0 0 0 8 0V3"/><path d="M4 3h4"/><path d="M12 3h4"/><path d="M10 12v3a5 5 0 0 0 10 0v-2"/><circle cx="20" cy="10" r="2"/>',
    sparkle: '<path d="m12 2 .9 4.1L17 7l-4.1.9L12 12l-.9-4.1L7 7l4.1-.9L12 2Z"/><path d="M5 15v4"/><path d="M3 17h4"/>',
    heart:
      '<path d="M20.8 5.6a5.5 5.5 0 0 0-7.8 0L12 6.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 22l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
    file:
      '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h6"/>',
    arrowDown: '<path d="M12 5v14"/><path d="m6 13 6 6 6-6"/>'
  };

  /* =========================================================
     Seed data
     ========================================================= */
  function makeSeedReply(appointment, doctor) {
    const today = startOfDay(new Date());
    return {
      topic:
        appointment.tier === "elite"
          ? "颈腰椎健康：职场久坐人群的脊柱保养"
          : appointment.topic || "企业人群常见健康风险识别",
      outline:
        "1. 久坐与低头行为对脊柱的长期影响\n2. 颈腰椎常见问题的早期信号\n3. 办公室人群可执行的日常保护方法\n4. 哪些情况需要尽快就医",
      agenda:
        "14:00–14:10  签到与开场\n14:10–15:10  专家主题分享\n15:10–15:40  现场问答\n15:40–16:00  一对一健康咨询",
      schedule: `${formatChineseDate(appointment.date)} ${appointment.time}`,
      format: "主题讲座 + 现场问答",
      speaker: doctor ? `${doctor.name} ${doctor.title.split(" · ")[0]}` : "院方推荐专家",
      contact: "企业健康项目组 · 李老师 010-6900 6666",
      message:
        "感谢贵司的预约与信任。院方项目组已完成专家与课题确认，具体流程与时间安排请见本页回复。如活动人数或场地有变化，请提前 3 个工作日联系项目组。",
      updatedAt: addDays(today, -1).toISOString()
    };
  }

  function seedAppointments() {
    const today = startOfDay(new Date());
    const confirmedDate = addDays(today, 22);
    const pendingDate = addDays(today, 37);

    const first = {
      id: "BD-20261119-108",
      createdAt: addDays(today, -2).toISOString(),
      updatedAt: addDays(today, -1).toISOString(),
      status: "confirmed",
      demo: true,
      tier: "elite",
      doctorId: "9099",
      date: isoDate(confirmedDate),
      slot: "afternoon",
      time: "14:00–16:00",
      topic: "职场久坐人群的脊柱健康",
      customTopic: "",
      format: "主题讲座 + 现场问答",
      audience: "100–300 人",
      city: "北京 · 朝阳",
      venue: "朝阳区企业健康活动中心",
      orgType: "保险公司",
      orgName: "示例保险 · 高客健康服务部",
      contactName: "王女士",
      contactTitle: "客户生态合作负责人",
      phone: "13800000001",
      email: "demo@pkuih-partner.com",
      address: "北京市朝阳区建国路 88 号",
      note: "希望围绕久坐、颈椎不适与办公室拉伸展开，现场约 120 人。",
      sms: { hospital: true, contact: true },
      reply: null
    };
    first.reply = makeSeedReply(first, doctorById("9099"));

    const pending = {
      id: "BD-20261119-221",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      updatedAt: "",
      status: "pending",
      demo: true,
      tier: "director",
      doctorId: "1081",
      date: isoDate(pendingDate),
      slot: "evening",
      time: "19:00–21:00",
      topic: "甲状腺结节与职场人内分泌管理",
      customTopic: "",
      format: "专家健康咨询",
      audience: "50–100 人",
      city: "北京 · 海淀",
      venue: "企业总部多功能厅",
      orgType: "企业",
      orgName: "示例科技 · 员工体验中心",
      contactName: "赵先生",
      contactTitle: "员工福利经理",
      phone: "13800000002",
      email: "demo@example-tech.com",
      address: "北京市海淀区中关村软件园二期",
      note: "员工体检中甲状腺结节检出率较高，希望安排一次专题科普与现场咨询。",
      sms: { hospital: true, contact: true },
      reply: null
    };

    return [pending, first];
  }

  function ensureSeedData() {
    let hasAppointments = true;
    let hasSmsSettings = true;
    let hasSmsLogs = true;
    try {
      hasAppointments = Boolean(localStorage.getItem(STORAGE.appointments));
      hasSmsSettings = Boolean(localStorage.getItem(STORAGE.smsSettings));
      hasSmsLogs = Boolean(localStorage.getItem(STORAGE.smsLogs));
    } catch {
      return;
    }
    if (!hasAppointments) {
      saveAppointments(seedAppointments());
    }
    if (!hasSmsSettings) {
      saveSmsSettings(DEFAULT_SMS_SETTINGS);
    }
    if (!hasSmsLogs) {
      writeStore(STORAGE.smsLogs, defaultSmsLogs);
    }
  }

  /* =========================================================
     Header / footer / mobile nav
     ========================================================= */
  function siteHeader(active = "home") {
    return `
      <header class="site-header">
        <div class="site-header__inner">
          <a class="brand" href="#/" aria-label="北京大学国际医院企业健康合作平台">
            <img class="brand__logo" src="assets/logo.svg" alt="北京大学国际医院">
            <span class="brand__divider"></span>
            <span class="brand__tagline">
              <strong>北京大学国际医院</strong>
              名医入企 · 企业健康合作
            </span>
          </a>
          <nav class="site-nav" aria-label="主导航">
            <button type="button" data-scroll="service-matrix">服务体系</button>
            <button type="button" data-scroll="expert-system">专家体系</button>
            <button type="button" data-scroll="expert-wall">专家矩阵</button>
            <a href="#/appointments">我的预约</a>
            <button type="button" data-scroll="cooperation">合作场景</button>
          </nav>
          <div class="header-actions">
            <a class="header-admin" href="#/admin">院方工作台</a>
            <button class="btn btn--primary btn--sm" type="button" data-action="open-booking">
              预约专家入企 ${icon("arrowRight", 15)}
            </button>
          </div>
        </div>
      </header>
      <nav class="mobile-bottom-nav" aria-label="移动端快捷导航">
        <button type="button" class="${active === "home" ? "is-active" : ""}" data-action="nav-home">
          ${icon("home")}
          <span>首页</span>
        </button>
        <button type="button" data-scroll="expert-wall">
          ${icon("stethoscope")}
          <span>专家</span>
        </button>
        <button type="button" data-action="open-booking">
          ${icon("calendar")}
          <span>预约</span>
        </button>
        <a href="#/appointments" class="${active === "appointments" ? "is-active" : ""}" style="display:flex;flex-direction:column;align-items:center;gap:4px;color:inherit;font-size:9px">
          ${icon("file")}
          <span>我的</span>
        </a>
      </nav>
    `;
  }

  function siteFooter() {
    return `
      <footer class="site-footer">
        <div class="wrap">
          <div class="footer-top">
            <div class="footer-brand">
              <img src="assets/logo.svg" alt="北京大学国际医院">
              <p>
                「名医入企」是北京大学国际医院面向保险公司与企业客户的企业健康合作项目。
                以三级专家资源、标准化活动交付与专属项目组服务，将专业医疗能力带到企业现场。
              </p>
              <span class="footer-hint"><i></i>本页面为交互演示，最终排期与专家以院方确认为准</span>
            </div>
            <div class="footer-links">
              <div class="footer-col">
                <h4>探索服务</h4>
                <button type="button" data-scroll="service-matrix">企业健康服务体系</button>
                <button type="button" data-scroll="expert-system">三级专家资源</button>
                <button type="button" data-scroll="schedule">可预约档期</button>
                <button type="button" data-action="open-booking">提交活动需求</button>
              </div>
              <div class="footer-col">
                <h4>项目入口</h4>
                <a href="#/appointments">我的预约</a>
                <a href="#/admin">院方项目工作台</a>
                <button type="button" data-scroll="faq">常见问题</button>
                <a href="https://www.pkuih.edu.cn/" target="_blank" rel="noopener">医院官方网站</a>
              </div>
            </div>
          </div>
          <div class="footer-bottom">
            <p>
              专家姓名、照片与擅长方向来源于北京大学国际医院官方网站公开信息，仅用于本演示。
              正式项目中的讲者授权、活动报价、差旅安排、场地与流程以双方确认文件为准。
              短信、账号鉴权与企业数据留存需在正式版本接入业务后端后实现。
            </p>
            <div class="footer-bottom__meta">
              © ${new Date().getFullYear()} 北京大学国际医院 · 企业健康合作演示<br>
              本页面为非官方产品原型
            </div>
          </div>
        </div>
      </footer>
    `;
  }

  /* =========================================================
     Home page sections
     ========================================================= */
  function heroTierRows() {
    return TIER_ORDER.map((tierId) => {
      const tier = TIERS[tierId];
      return `
        <div class="mini-pyramid__step">
          <span>${tier.name} · ${tier.count} 位</span>
          <small>${tier.priceRange}</small>
        </div>
      `;
    }).join("");
  }

  function renderHero() {
    const doctors = state.doctors;
    const photo = doctors.find((doctor) => doctor.id === "9100") || doctors[0];
    return `
      <section class="hero-shell">
        <div class="hero">
          <div class="hero__media">
            <img src="assets/hero-campus.webp" alt="北京大学国际医院园区">
          </div>
          <div class="hero__grid"></div>
          <div class="hero__halo"></div>
          <div class="hero__inner">
            <div class="hero__copy">
              <span class="hero__kicker">白大褂到企 · 名医入企计划</span>
              <h1>把医学专家<br>请到<em>企业身边</em></h1>
              <p class="hero__subtitle">
                面向保险公司与企业，将北大医学专家、临床经验与健康洞察带进企业现场。
                从高管私享课到全员健康日，按层级匹配专家，在线锁档，院方专属跟进。
              </p>
              <div class="hero__actions">
                <button class="btn btn--orange" type="button" data-action="open-booking">
                  预约专家入企 ${icon("arrowRight", 17)}
                </button>
                <button class="btn btn--ghost-light" type="button" data-scroll="expert-wall">
                  浏览专家矩阵 ${icon("arrowDown", 17)}
                </button>
              </div>
              <div class="hero__note">
                ${icon("shield", 16)}
                <span>北京大学国际医院 · 企业健康合作项目组全程对接</span>
              </div>
              <div class="hero__metrics">
                <div class="hero-metric">
                  <strong>${state.doctors.length}<span>位</span></strong>
                  <span>精选入企专家</span>
                </div>
                <div class="hero-metric">
                  <strong>3<span>级</span></strong>
                  <span>分层资源体系</span>
                </div>
                <div class="hero-metric">
                  <strong>7<span>天</span></strong>
                  <span>最快响应周期</span>
                </div>
                <div class="hero-metric">
                  <strong>1<span>v1</span></strong>
                  <span>院方项目对接</span>
                </div>
              </div>
            </div>
            <aside class="program-card" aria-label="三级专家资源概览">
              <div class="program-card__top">
                <div>
                  <small>WHITE COAT TO ENTERPRISE</small>
                  <strong>企业健康合作方案</strong>
                </div>
                <span class="program-card__badge"><i></i>2026 档期开放</span>
              </div>
              <div class="mini-pyramid">
                ${heroTierRows()}
              </div>
              <div class="program-card__footer">
                <span>报价与档期以院方最终确认为准</span>
                <button type="button" data-scroll="expert-system">
                  查看体系 ${icon("arrowRight", 15)}
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
      ${
        photo
          ? `<div class="sr-only">${esc(photo.name)}，${esc(photo.dept)}专家，资料来源于北京大学国际医院官网。</div>`
          : ""
      }
    `;
  }

  function renderServiceSection() {
    const featureDoctor =
      state.doctors.find((doctor) => doctor.id === "9100") ||
      state.doctors.find((doctor) => doctor.tier === "elite") ||
      state.doctors[0];
    const portraitDoctor =
      state.doctors.find((doctor) => doctor.id === "1104") ||
      state.doctors.find((doctor) => doctor.tier === "director") ||
      state.doctors[1];
    const avatarDoctors = state.doctors
      .filter((doctor) => ["9099", "1141", "1104", "9100", "1181"].includes(doctor.id))
      .map((doctor) => `<img src="${esc(doctor.photo)}" alt="${esc(doctor.name)}">`)
      .join("");

    return `
      <section class="section section--paper" id="service-matrix">
        <div class="wrap">
          <div class="section-head">
            <div class="section-head__copy">
              <span class="eyebrow">Service Matrix / 服务体系</span>
              <h2 class="section-title">从一场讲座，<br>到一套<em>企业健康方案</em></h2>
            </div>
            <p class="section-desc">
              不只是“请一位医生来讲课”。我们围绕保险客户经营、员工健康福利与管理层健康管理，
              提供主题策划、专家匹配、活动交付与院方跟进的一体化服务。
            </p>
          </div>
          <div class="service-grid">
            <article class="service-card service-card--feature">
              <div class="service-feature__copy">
                <span class="eyebrow">Signature Program</span>
                <h3>名医主题讲座</h3>
                <p>
                  以企业真实健康议题为起点，由院方匹配专家与课题。
                  适合全员健康日、客户答谢会、年度健康峰会与高管私享会。
                </p>
                <div class="service-feature__list">
                  <span class="chip">心血管与急救</span>
                  <span class="chip">肿瘤早筛</span>
                  <span class="chip">颈腰椎健康</span>
                  <span class="chip">睡眠与压力</span>
                </div>
                <a class="text-link" href="#/appointments" style="color:#d9e8ff">
                  查看可预约专家 ${icon("arrowRight", 17)}
                </a>
              </div>
              <div class="service-feature__media">
                ${featureDoctor ? `<img src="${esc(featureDoctor.photo)}" alt="${esc(featureDoctor.name)}">` : ""}
              </div>
            </article>
            <article class="service-card service-card--portrait">
              <div class="service-portrait">
                <div class="service-portrait__copy">
                  <small>${icon("spark", 14)} 一对多 · 深度互动</small>
                  <h3>专家面对面咨询</h3>
                  <p>围绕体检异常、慢病管理、女性健康、骨骼与关节等主题，提供更聚焦的现场咨询。</p>
                </div>
                <div class="service-portrait__media">
                  ${portraitDoctor ? `<img src="${esc(portraitDoctor.photo)}" alt="${esc(portraitDoctor.name)}">` : ""}
                </div>
                <div class="service-portrait__bottom">
                  <span>适合高净值客户沙龙、员工健康周与管理层健康日</span>
                  <button class="btn btn--light btn--sm" type="button" data-action="open-booking">
                    预约咨询 ${icon("arrowRight", 15)}
                  </button>
                </div>
              </div>
            </article>
            <article class="service-card service-card--quote">
              <span class="quote-mark">“</span>
              <blockquote>把健康，做成员工<em>真正能感知</em>的福利。</blockquote>
              <div class="quote-author">企业健康合作理念 · 不是一次活动，而是长期关系</div>
            </article>
            <article class="service-card service-card--stat">
              <span class="eyebrow">Selected Experts</span>
              <div class="service-stat__number">${state.doctors.length}<small>位精选入企专家</small></div>
              <h3>来自 30+ 临床科室</h3>
              <p>覆盖心血管、肿瘤、骨科、神经、妇产、心理、营养等企业高频健康议题。</p>
              <div class="service-stat__line">
                <span>专家资料源自医院官网公开信息</span>
                <div class="service-stat__avatars">${avatarDoctors}</div>
              </div>
            </article>
            <article class="service-card service-card--cta">
              <div>
                <span class="eyebrow" style="color:#bdd3ff">Partner with PKUIH</span>
                <h3>定制一场<br>企业专属健康活动</h3>
                <p>告诉我们企业人群画像、活动目标与预算，院方项目组将提供专家与课题建议。</p>
              </div>
              <button class="btn btn--light btn--sm" type="button" data-action="open-booking">
                开始预约 ${icon("arrowRight", 15)}
              </button>
            </article>
          </div>
        </div>
      </section>
    `;
  }

  function renderPyramidSection() {
    const visual = TIER_ORDER.map((tierId) => {
      const tier = TIERS[tierId];
      return `
        <div class="pyramid-tier">
          <strong>${tier.shortName} · ${tier.count} 位</strong>
          <small>${tier.leadDays} 天前申请</small>
        </div>
      `;
    }).join("");

    const cards = TIER_ORDER.map((tierId) => {
      const tier = TIERS[tierId];
      return `
        <button class="tier-card tier-card--${tier.id}" type="button" data-action="open-booking" data-tier="${tier.id}">
          <span class="tier-card__number">0${tier.order}</span>
          <div class="tier-card__main">
            <div class="tier-card__title">
              <h3>${tier.name}</h3>
              <span class="tier-card__tag ${tier.id === "elite" ? "tier-card__tag--gold" : ""}">${tier.tag}</span>
            </div>
            <div class="tier-card__meta">
              <span>${icon("users", 13)} ${tier.count} 位专家</span>
              <span>${icon("clock", 13)} ${tier.leadLabel}</span>
              <span>${icon("stethoscope", 13)} ${tier.position}</span>
            </div>
          </div>
          <div class="tier-card__price">
            <strong>${tier.priceLabel}</strong>
            <small>${tier.priceUnit} · 最终以方案为准</small>
          </div>
          <span class="tier-card__arrow">${icon("arrowUpRight", 14)}</span>
        </button>
      `;
    }).join("");

    return `
      <section class="section pyramid-section" id="expert-system">
        <div class="wrap pyramid-inner">
          <div class="pyramid-grid">
            <div class="pyramid-copy">
              <span class="eyebrow eyebrow--light">Three-Tier Expert System</span>
              <h2 class="section-title section-title--light">不是一位专家的上限，<br><em>而是三级资源的匹配</em></h2>
              <p class="section-desc section-desc--light">
                企业需求不同，专家层级也应不同。大咖专家适合重要节点与高价值客户活动，
                主任专家兼顾专业深度与互动性，专业医生则更适合常态化健康课堂。
              </p>
              <div class="pyramid-visual">
                <span class="pyramid-visual__line"></span>
                ${visual}
              </div>
              <div class="pyramid-footnote">
                ${icon("info", 15)}
                <span>
                  院士级专家、院级领导及学科带头人需提前 30 天发起申请；
                  具体讲者授权、差旅与活动形式以院方确认为准。
                </span>
              </div>
            </div>
            <div class="tier-stack">
              ${cards}
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function expertCount(tierId) {
    return doctorsForTier(tierId).length;
  }

  function renderExpertCard(doctor) {
    const tier = tierOf(doctor);
    return `
      <button class="expert-card" type="button" data-action="open-doctor" data-doctor-id="${esc(doctor.id)}">
        <div class="expert-card__media">
          <img src="${esc(doctor.photo)}" alt="${esc(doctor.name)}，${esc(doctor.dept)}" loading="lazy">
          <span class="expert-card__tier ${doctor.tier === "elite" ? "expert-card__tier--elite" : ""}">${esc(tier.name)}</span>
        </div>
        <div class="expert-card__body">
          <div class="expert-card__name">
            <h3>${esc(doctor.name)}</h3>
            <small>${esc(doctor.id)}</small>
          </div>
          <div class="expert-card__dept">${icon("stethoscope", 13)} ${esc(doctor.dept)}</div>
          <div class="expert-card__title">${esc(doctor.title)}</div>
          <div class="expert-card__tags">
            ${doctor.tags.slice(0, 2).map((tag) => `<span>${esc(tag)}</span>`).join("")}
          </div>
          <div class="expert-card__cta">
            <span>查看专家详情</span>
            ${icon("arrowUpRight", 15)}
          </div>
        </div>
      </button>
    `;
  }

  function getFilteredDoctors() {
    let list = state.expertFilter === "all" ? state.doctors : doctorsForTier(state.expertFilter);
    if (state.expertFilter === "all") {
      list = list.slice(0, state.expertLimit);
    }
    return list;
  }

  function renderExpertGrid() {
    const list = getFilteredDoctors();
    if (!list.length) {
      return `<div class="appointments-empty"><p>暂时没有匹配的专家。</p></div>`;
    }
    return `
      <div class="expert-grid" id="expert-grid">
        ${list.map(renderExpertCard).join("")}
      </div>
      ${
        state.expertFilter === "all" && state.doctors.length > state.expertLimit
          ? `<div class="expert-more"><button class="btn btn--ghost" type="button" data-action="expert-more">展示更多专家 ${icon("arrowDown", 16)}</button></div>`
          : ""
      }
      <p class="expert-source">专家照片、科室与擅长方向来自北京大学国际医院官网公开资料；实际出讲专家以院方确认为准。</p>
    `;
  }

  function renderExpertSection() {
    const filters = [
      { id: "elite", label: "大咖医生", count: expertCount("elite") },
      { id: "director", label: "主任专家", count: expertCount("director") },
      { id: "specialist", label: "专业医生", count: expertCount("specialist") },
      { id: "all", label: "全部专家", count: state.doctors.length }
    ];

    return `
      <section class="section section--paper" id="expert-wall">
        <div class="wrap">
          <div class="section-head">
            <div class="section-head__copy">
              <span class="eyebrow">Expert Matrix / 专家矩阵</span>
              <h2 class="section-title">让企业需求，匹配<em>对的专家</em></h2>
            </div>
            <p class="section-desc">
              从院士级领军专家到临床一线医生，按活动级别、预算、人群与课题精准匹配。
              点击任意专家查看公开简介、擅长方向与可预约层级。
            </p>
          </div>
          <div class="expert-toolbar">
            <div class="filter-tabs" role="tablist" aria-label="专家层级筛选">
              ${filters
                .map(
                  (filter) => `
                    <button class="filter-tab ${state.expertFilter === filter.id ? "is-active" : ""}" type="button" data-action="expert-filter" data-filter="${filter.id}" role="tab" aria-selected="${state.expertFilter === filter.id}">
                      ${filter.label}<span>${filter.count}</span>
                    </button>
                  `
                )
                .join("")}
            </div>
            <span class="expert-toolbar__hint">共 ${state.doctors.length} 位精选入企专家 · 可预约档期实时展示</span>
          </div>
          <div id="expert-grid-wrap">${renderExpertGrid()}</div>
        </div>
      </section>
    `;
  }

  function buildDateOptions(tierId, count = 7) {
    const tier = TIERS[tierId] || TIERS.elite;
    const firstDate = addDays(startOfDay(new Date()), tier.leadDays);
    const options = [];
    let cursor = firstDate;
    let guard = 0;
    while (options.length < count && guard < 28) {
      const id = isoDate(cursor);
      const slots = buildTimeSlots(tierId, id, tier.leadDays);
      if (slots.some((slot) => !slot.full)) {
        options.push({ date: cursor, iso: id, slots });
      }
      cursor = addDays(cursor, 1);
      guard += 1;
    }
    return options;
  }

  function buildTimeSlots(tierId, dateIso, leadDays = 0) {
    const seed = hashString(`${tierId}-${dateIso}-${leadDays}`);
    return TIME_SLOTS.map((slot, index) => {
      const value = (seed + index * 17) % 13;
      const full = value === 0;
      const tight = !full && value < 3;
      return { ...slot, full, tight };
    });
  }

  function renderAvailabilitySection() {
    const rows = TIER_ORDER.map((tierId) => {
      const tier = TIERS[tierId];
      const dates = buildDateOptions(tierId, 4);
      return `
        <div class="availability-row">
          <div class="availability-tier">
            <span class="availability-tier__mark">0${tier.order}</span>
            <div class="availability-tier__name">
              <strong>${tier.name}</strong>
              <small>${tier.leadLabel} · ${tier.priceRange}</small>
            </div>
          </div>
          <div class="availability-dates">
            ${dates
              .map(
                (option, index) => `
                  <button class="slot-date" type="button" data-action="open-booking" data-tier="${tierId}" data-date="${option.iso}">
                    <i class="${index % 2 ? "is-amber" : ""}"></i>
                    ${formatShortDate(option.iso)} ${weekday(option.date)}
                  </button>
                `
              )
              .join("")}
          </div>
          <button class="btn btn--ghost btn--sm" type="button" data-action="open-booking" data-tier="${tierId}">
            查看档期 ${icon("arrowRight", 15)}
          </button>
        </div>
      `;
    }).join("");

    return `
      <section class="section availability-section" id="schedule">
        <div class="wrap">
          <div class="availability-card">
            <div class="availability-head">
              <div>
                <span class="eyebrow">Live Availability</span>
                <h3>近期可预约档期</h3>
                <p>系统按不同专家层级自动计算最早可申请日期。点击日期即可带着意向档期开始预约。</p>
              </div>
              <div class="availability-legend">
                <span><i class="is-green"></i>可预约</span>
                <span><i class="is-amber"></i>档期紧张</span>
              </div>
            </div>
            <div class="availability-table">
              ${rows}
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderProcessSection() {
    const steps = [
      {
        title: "选择专家层级",
        desc: "按活动目标、预算与人群，选择大咖医生、主任专家或专业医生，并查看可预约日期。",
        time: "约 3 分钟"
      },
      {
        title: "提交企业与课题需求",
        desc: "填写企业信息、活动规模、意向课题和场地安排，必要时可备注期望专家。",
        time: "约 5 分钟"
      },
      {
        title: "院方项目组回复",
        desc: "院方在预约端回复确认课题、内容大纲、流程、时间安排及项目联系人。",
        time: "通常 2 小时内"
      },
      {
        title: "专家入企交付",
        desc: "完成讲者授权、差旅安排与流程对接，项目组在会前发送短信提醒。",
        time: "按活动排期"
      }
    ];

    return `
      <section class="section process-section" id="booking-process">
        <div class="wrap">
          <div class="section-head section-head--center">
            <span class="eyebrow">Booking Flow / 预约流程</span>
            <h2 class="section-title">从提交需求，到<em>专家走进企业</em></h2>
            <p class="section-desc">
              每一条预约都会进入院方项目组工作台。客户在「我的预约」即时查看院方回复，
              无需在电话与邮件之间反复确认。
            </p>
          </div>
          <div class="process-grid">
            ${steps
              .map(
                (step) => `
                  <div class="process-step">
                    <h3>${step.title}</h3>
                    <p>${step.desc}</p>
                    <span class="process-step__time">${icon("clock", 13)} ${step.time}</span>
                  </div>
                `
              )
              .join("")}
          </div>
          <div class="process-note">
            ${icon("shield", 15)}
            <span>院方确认前，预约不锁定最终讲者；如遇院方重要医疗任务，项目组将协调同级替代专家。</span>
          </div>
        </div>
      </section>
    `;
  }

  function renderCooperationSection() {
    return `
      <section class="section" id="cooperation">
        <div class="wrap">
          <div class="section-head">
            <div class="section-head__copy">
              <span class="eyebrow">Who We Serve / 合作场景</span>
              <h2 class="section-title">两类客户，<br>同一套<em>专业医疗能力</em></h2>
            </div>
            <p class="section-desc">
              对保险公司，这是高价值客户经营与健康权益的新触点；对企业，这是员工真正可感知、
              可参与的健康福利。专家与课题均由院方参与匹配。
            </p>
          </div>
          <div class="audience-grid">
            <article class="audience-card audience-card--insurer">
              <span class="audience-card__label">${icon("shield", 13)} 保险公司 · 客户健康权益</span>
              <h3>让健康服务，成为<em>客户经营的长期触点</em></h3>
              <p>面向高净值客户、核心代理人、重点企业客户，打造有专业背书、可持续复用的健康活动 IP。</p>
              <div class="audience-list">
                <span>${icon("check", 15)} 高客答谢会与私享健康沙龙</span>
                <span>${icon("check", 15)} 保险 + 医疗联合品牌健康活动</span>
                <span>${icon("check", 15)} 客户健康权益与体检报告解读服务</span>
              </div>
              <button class="audience-card__cta" type="button" data-action="open-booking" data-tier="elite">
                发起保险客户活动 ${icon("arrowRight", 17)}
              </button>
            </article>
            <article class="audience-card audience-card--enterprise">
              <span class="audience-card__label">${icon("building", 13)} 企业 · 员工健康福利</span>
              <h3>把健康福利，做到<em>员工真正愿意参加</em></h3>
              <p>围绕员工体检、久坐、睡眠、压力、慢病与家庭健康等高频议题，设计更贴近真实需求的健康活动。</p>
              <div class="audience-list">
                <span>${icon("check", 15)} 全员健康日与专家主题讲座</span>
                <span>${icon("check", 15)} 管理者健康力与压力管理私享课</span>
                <span>${icon("check", 15)} 工会、EAP 与员工关怀联合活动</span>
              </div>
              <button class="audience-card__cta" type="button" data-action="open-booking" data-tier="director">
                发起员工健康活动 ${icon("arrowRight", 17)}
              </button>
            </article>
          </div>
        </div>
      </section>
    `;
  }

  function renderAboutSection() {
    return `
      <section class="section about-section" id="about">
        <div class="wrap">
          <div class="about-grid">
            <div class="about-media">
              <div class="about-media__main">
                <img src="assets/hero-campus.webp" alt="北京大学国际医院园区" loading="lazy">
                <div class="about-media__badge">
                  <span>建设国际一流医院<br>领跑医疗体制改革</span>
                  <strong>PKU IH</strong>
                </div>
              </div>
            </div>
            <div>
              <span class="eyebrow">About The Hospital</span>
              <h2 class="section-title">北京大学国际医院<br><em>让专业医疗走近企业</em></h2>
              <p class="section-desc">
                「名医入企」以医院真实临床专家与学科资源为基础，将疾病预防、健康管理与医学人文带进企业现场。
                我们更关注活动之后的持续健康行为改变，而非一次性的知识输出。
              </p>
              <div class="about-points">
                <div class="about-point">
                  <span class="about-point__num">01</span>
                  <div>
                    <h4>从真实临床经验出发</h4>
                    <p>专家课题来自一线诊疗洞察，更贴近企业人群真正关心的健康问题。</p>
                  </div>
                </div>
                <div class="about-point">
                  <span class="about-point__num">02</span>
                  <div>
                    <h4>标准化项目组服务</h4>
                    <p>从课题确认、讲者授权、流程对接，到短信提醒与会后回访，由院方专属项目组跟进。</p>
                  </div>
                </div>
                <div class="about-point">
                  <span class="about-point__num">03</span>
                  <div>
                    <h4>可被企业员工感知</h4>
                    <p>围绕真实生活场景设计课题，让健康福利不只停留在权益手册里。</p>
                  </div>
                </div>
              </div>
              <div class="about-stats">
                <div class="about-stat">
                  <strong>200+</strong>
                  <small>官网可查询专家资源</small>
                </div>
                <div class="about-stat">
                  <strong>30+</strong>
                  <small>临床科室方向</small>
                </div>
                <div class="about-stat">
                  <strong>3</strong>
                  <small>专家资源层级</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderFaqSection() {
    const faqs = [
      {
        q: "专家费用包含哪些内容？",
        a: "演示页展示的是专家讲座/咨询的基础服务报价区间。正式项目中，差旅、场地、物料、直播或翻译等费用会根据活动形式单独核算。院士、院级领导及学科带头人需提前 30 天发起申请，最终价格与讲者授权以院方确认文件为准。"
      },
      {
        q: "可以按企业人群定制课题吗？",
        a: "可以。提交预约时填写企业人群画像、希望解决的问题或体检异常数据方向，院方项目组会在回复中确认课题、内容大纲与互动形式。涉及具体诊疗建议的内容，将严格遵守医疗合规边界。"
      },
      {
        q: "如何知道专家档期是否可预约？",
        a: "预约页会根据专家层级自动展示最早可申请日期，并用「可预约 / 档期紧张」标识展示时段状态。提交后，院方会再次核实讲者排期并反馈确认结果；演示页的档期为模拟数据。"
      },
      {
        q: "预约后在哪里查看院方回复？",
        a: "提交预约后，客户可在「我的预约」查看完整进度。院方项目组在后台回复后，课题、会议内容、流程安排、时间、形式与联系人会同步显示在预约详情中。"
      },
      {
        q: "短信提醒如何工作？",
        a: "演示版支持配置院方项目组接收人、提醒触发节点和短信模板，并在预约提交或院方确认时模拟登记发送记录。正式上线需接入短信服务商网关，并由后端完成发送、回执与失败重试。"
      },
      {
        q: "保险公司可以联合品牌举办吗？",
        a: "可以作为合作方向。需要提前确认活动名称、品牌露出、客户招募方式、场地与宣传物料。涉及医院名称、专家肖像与品牌标识使用时，须取得院方书面授权。"
      }
    ];

    return `
      <section class="section faq-section" id="faq">
        <div class="wrap">
          <div class="faq-layout">
            <div class="faq-copy">
              <span class="eyebrow">FAQ / 常见问题</span>
              <h2 class="section-title">预约之前，<br><em>你可能想知道</em></h2>
              <p class="section-desc">关于价格、档期、课题定制与短信提醒的说明。</p>
              <div class="faq-contact">
                <small>企业健康合作咨询</small>
                <strong>010-6900 6666</strong>
                <span class="text-link" style="margin-top:8px">工作日 09:00–17:30 ${icon("phone", 15)}</span>
              </div>
            </div>
            <div class="faq-list">
              ${faqs
                .map(
                  (faq) => `
                    <details class="faq-item">
                      <summary>${faq.q}</summary>
                      <p>${faq.a}</p>
                    </details>
                  `
                )
                .join("")}
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderHomePage() {
    return `
      <div class="site">
        ${siteHeader("home")}
        <main>
          ${renderHero()}
          ${renderServiceSection()}
          ${renderPyramidSection()}
          ${renderExpertSection()}
          ${renderAvailabilitySection()}
          ${renderProcessSection()}
          ${renderCooperationSection()}
          ${renderAboutSection()}
          ${renderFaqSection()}
        </main>
        ${siteFooter()}
      </div>
    `;
  }

  /* =========================================================
     My appointments page
     ========================================================= */
  function appointmentStatusBadge(status) {
    const meta = STATUS[status] || STATUS.pending;
    return `<span class="status-pill status-pill--${meta.tone}">${meta.label}</span>`;
  }

  function renderAppointmentCard(appointment) {
    const doctor = doctorById(appointment.doctorId);
    const tier = TIERS[appointment.tier] || TIERS.specialist;
    const date = parseIsoDate(appointment.date);
    return `
      <div class="appointment-card" role="button" tabindex="0" data-action="open-appointment" data-appointment-id="${esc(appointment.id)}">
        <div class="appointment-card__date">
          <strong>${date ? pad(date.getMonth() + 1) : "--"}.${date ? pad(date.getDate()) : "--"}</strong>
          <span>${date ? weekday(date) : "待确认"} · ${esc(appointment.time || "时间待定")}</span>
        </div>
        <div class="appointment-card__body">
          <div class="appointment-card__top">
            ${appointmentStatusBadge(appointment.status)}
            <span class="demo-pill">${appointment.demo ? "示例单" : tier.name}</span>
          </div>
          <h3>${esc(appointment.topic || "企业健康活动预约")}</h3>
          <div class="appointment-card__meta">
            <span>${icon("building", 12)} ${esc(appointment.orgName)}</span>
            <span>${icon("stethoscope", 12)} ${esc(doctor ? doctor.name : "院方推荐专家")}</span>
            <span>${icon("users", 12)} ${esc(appointment.audience)}</span>
          </div>
          ${
            appointment.reply
              ? `<div class="appointment-card__reply">${icon("message", 14)} <span>院方已回复：${esc(appointment.reply.topic)} · 查看课题、流程与时间安排</span></div>`
              : `<div class="appointment-card__reply">${icon("clock", 14)} <span>${STATUS[appointment.status]?.help || "等待院方确认"}</span></div>`
          }
        </div>
        <div class="appointment-card__aside">
          <small>预约号</small>
          <strong>${esc(appointment.id)}</strong>
          <span class="appointment-card__link">
            查看详情 ${icon("chevronRight", 15)}
          </span>
        </div>
      </div>
    `;
  }

  function renderAppointmentsPage() {
    const appointments = getAppointments().sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return `
      <div class="site">
        ${siteHeader("appointments")}
        <main>
          <section class="subpage-hero">
            <div class="wrap subpage-hero__inner">
              <div>
                <span class="eyebrow eyebrow--light">My Appointments / 我的预约</span>
                <h1>预约进度与院方回复</h1>
                <p>在这里查看每条预约的确认状态、课题内容、活动流程、时间安排与院方联系人。</p>
              </div>
              <button class="btn btn--orange" type="button" data-action="open-booking">
                新建专家预约 ${icon("plus", 16)}
              </button>
            </div>
          </section>
          <section class="appointments-section">
            <div class="wrap">
              <div class="appointments-note">
                ${icon("info", 16)}
                <span>
                  演示数据保存在当前浏览器。提交一条新预约后，可打开
                  <a href="#/admin" style="color:var(--navy-700);font-weight:600">院方工作台</a>
                  回复预约，再回到本页查看院方回复后的完整效果。
                </span>
              </div>
              ${
                appointments.length
                  ? `<div class="appointment-list">${appointments.map(renderAppointmentCard).join("")}</div>`
                  : `
                    <div class="appointments-empty">
                      <span class="appointments-empty__icon">${icon("calendar", 28)}</span>
                      <h3>还没有预约记录</h3>
                      <p>从一场贴合企业人群的健康讲座开始，选择专家层级与意向档期。</p>
                      <button class="btn btn--primary" type="button" data-action="open-booking">预约专家入企 ${icon("arrowRight", 16)}</button>
                    </div>
                  `
              }
            </div>
          </section>
        </main>
        ${siteFooter()}
      </div>
    `;
  }

  /* =========================================================
     Booking flow
     ========================================================= */
  function defaultTopicForTier(tierId) {
    const doctors = doctorsForTier(tierId);
    return doctors[0]?.tags?.[0] || "企业人群健康风险识别";
  }

  function newBookingState(tierId = "elite", dateIso = "") {
    const booking = {
      step: 1,
      tierId: TIERS[tierId] ? tierId : "elite",
      date: "",
      slot: "",
      doctorId: "recommend",
      topic: "",
      customTopic: "",
      format: "主题讲座",
      audience: "100–300 人",
      city: "北京",
      venue: "",
      orgType: "保险公司",
      orgName: "",
      contactName: "",
      contactTitle: "",
      phone: "",
      email: "",
      address: "",
      note: "",
      smsHospital: true,
      smsContact: true,
      agree: false
    };
    booking.topic = defaultTopicForTier(booking.tierId);
    if (dateIso && parseIsoDate(dateIso)) {
      const options = buildDateOptions(booking.tierId, 14);
      if (options.some((option) => option.iso === dateIso)) {
        booking.date = dateIso;
      }
    }
    return booking;
  }

  function openBooking(tierId = "", dateIso = "") {
    if (!requireDoctors()) return;
    const initialTier = tierId && TIERS[tierId] ? tierId : "elite";
    state.booking = newBookingState(initialTier, dateIso);
    if (!getSmsSettings().enabled) {
      state.booking.smsHospital = false;
      state.booking.smsContact = false;
    }
    state.overlay = { type: "booking" };
    renderOverlay();
  }

  function getBookingTier() {
    return TIERS[state.booking?.tierId] || TIERS.elite;
  }

  function topicSuggestions() {
    const booking = state.booking;
    if (!booking) return [];
    if (booking.doctorId !== "recommend") {
      const doctor = doctorById(booking.doctorId);
      if (doctor) {
        return [
          ...doctor.tags,
          ...doctorsForTier(booking.tierId)
            .filter((item) => item.id !== doctor.id)
            .flatMap((item) => item.tags)
        ].filter((value, index, array) => array.indexOf(value) === index).slice(0, 7);
      }
    }
    return doctorsForTier(booking.tierId)
      .flatMap((doctor) => doctor.tags)
      .filter((value, index, array) => array.indexOf(value) === index)
      .slice(0, 7);
  }

  function bookingDoctor(tierId) {
    return state.doctors.filter((doctor) => doctor.tier === tierId);
  }

  function renderWizardSteps(step) {
    const labels = ["档期", "专家与课题", "企业信息"];
    return `
      <div class="wizard-steps" aria-label="预约步骤">
        ${labels
          .map(
            (label, index) => `
              <span class="wizard-step ${step > index + 1 ? "is-done" : step === index + 1 ? "is-active" : ""}">
                <span class="wizard-step__num">${step > index + 1 ? "✓" : index + 1}</span>
                ${label}
              </span>
            `
          )
          .join("")}
      </div>
    `;
  }

  function renderBookingStep1() {
    const booking = state.booking;
    const tier = getBookingTier();
    const dateOptions = buildDateOptions(booking.tierId, 10);
    if (booking.date && !dateOptions.some((option) => option.iso === booking.date)) {
      booking.date = "";
      booking.slot = "";
    }
    const selectedDateOption = dateOptions.find((option) => option.iso === booking.date);
    const slotOptions = booking.date ? buildTimeSlots(booking.tierId, booking.date, tier.leadDays) : [];

    return `
      <div class="wizard-body">
        <div class="wizard-section-title">
          <h3>选择专家层级</h3>
          <span>价格与申请周期按院方标准展示</span>
        </div>
        <div class="wizard-tier-grid">
          ${TIER_ORDER.map((tierId) => {
            const item = TIERS[tierId];
            return `
              <button class="wizard-tier wizard-tier--${tierId} ${booking.tierId === tierId ? "is-selected" : ""}" type="button" data-action="select-booking-tier" data-tier="${tierId}">
                <small>0${item.order} · ${item.count} 位</small>
                <strong>${item.name}</strong>
                <span class="tier-price">${item.priceLabel}<em>${item.priceUnit} · ${item.leadLabel}</em></span>
              </button>
            `;
          }).join("")}
        </div>

        <div class="wizard-section-title">
          <h3>选择可预约日期</h3>
          <span>${tier.name}最早可于 ${formatShortDate(dateOptions[0]?.iso)} 申请</span>
        </div>
        <div class="date-strip">
          ${dateOptions
            .map(
              (option) => `
                <button class="date-option ${booking.date === option.iso ? "is-selected" : ""}" type="button" data-action="select-booking-date" data-date="${option.iso}">
                  <strong>${formatShortDate(option.iso)}</strong>
                  <span>${weekday(option.date)}</span>
                  <small>${option.slots.every((slot) => slot.full) ? "已约满" : option.slots.some((slot) => slot.tight) ? "余位紧张" : "可预约"}</small>
                </button>
              `
            )
            .join("")}
        </div>

        <div class="wizard-section-title">
          <h3>选择活动时段</h3>
          <span>${booking.date ? formatDate(booking.date, true) : "请先选择日期"}</span>
        </div>
        ${
          booking.date
            ? `<div class="time-slot-grid">
                ${slotOptions
                  .map(
                    (slot) => `
                      <button class="time-slot ${booking.slot === slot.id ? "is-selected" : ""}" type="button" data-action="select-booking-slot" data-slot="${slot.id}" ${slot.full ? "disabled" : ""}>
                        <span>
                          <span class="time-slot__label">${slot.label}</span>
                          <span class="time-slot__sub">${slot.sub}</span>
                        </span>
                        <span class="time-slot__state ${slot.tight ? "is-tight" : ""}">${slot.full ? "已约满" : slot.tight ? "余位紧张" : "可预约"}</span>
                      </button>
                    `
                  )
                  .join("")}
              </div>`
            : `<div class="wizard-empty-hint">选择日期后，将展示上午、下午与晚间可预约时段。</div>`
        }
        <div class="booking-summary-strip">
          <span class="summary-chip">层级 <strong>${tier.name}</strong></span>
          <span class="summary-chip">日期 <strong>${booking.date ? formatDate(booking.date) : "待选择"}</strong></span>
          <span class="summary-chip">时段 <strong>${booking.slot ? slotById(booking.slot).label : "待选择"}</strong></span>
          <span class="summary-chip">参考价 <strong>${tier.priceRange}</strong></span>
        </div>
      </div>
    `;
  }

  function renderBookingStep2() {
    const booking = state.booking;
    const tier = getBookingTier();
    const doctors = bookingDoctor(booking.tierId);
    const suggestions = topicSuggestions();
    const selectedDoctor = doctorById(booking.doctorId);
    return `
      <div class="wizard-body">
        <div class="wizard-section-title">
          <h3>选择意向专家</h3>
          <span>${tier.name} · ${doctors.length} 位可预约</span>
        </div>
        <div class="wizard-doctor-grid">
          <button class="wizard-doctor ${booking.doctorId === "recommend" ? "is-selected" : ""}" type="button" data-action="select-booking-doctor" data-doctor-id="recommend">
            <span class="wizard-doctor__photo wizard-doctor__photo--recommend">${icon("sparkle", 20)}</span>
            <span class="wizard-doctor__copy">
              <strong>由院方推荐</strong>
              <span>根据课题与人群精准匹配</span>
              <small>适合尚未确定具体讲者的活动</small>
            </span>
          </button>
          ${doctors
            .map(
              (doctor) => `
                <button class="wizard-doctor ${booking.doctorId === String(doctor.id) ? "is-selected" : ""}" type="button" data-action="select-booking-doctor" data-doctor-id="${esc(doctor.id)}">
                  <span class="wizard-doctor__photo"><img src="${esc(doctor.photo)}" alt="" loading="lazy"></span>
                  <span class="wizard-doctor__copy">
                    <strong>${esc(doctor.name)}</strong>
                    <span>${esc(doctor.dept)} · ${esc(doctor.title)}</span>
                    <small>${esc(doctor.tags.slice(0, 2).join(" / "))}</small>
                  </span>
                </button>
              `
            )
            .join("")}
        </div>

        <div class="field" style="margin-top:26px">
          <label for="booking-custom-topic">
            意向课题
            <span>${selectedDoctor ? `${selectedDoctor.name} · ${selectedDoctor.dept}` : "院方将根据需求推荐讲者"}</span>
          </label>
          <div class="topic-chips">
            ${suggestions
              .map(
                (topic) => `
                  <button class="topic-chip ${booking.topic === topic ? "is-selected" : ""}" type="button" data-action="select-booking-topic" data-topic="${esc(topic)}">
                    ${esc(topic)}
                  </button>
                `
              )
              .join("")}
          </div>
          <input id="booking-custom-topic" style="margin-top:10px" type="text" placeholder="或填写自定义课题，例如：三高人群的饮食与运动管理" value="${esc(booking.customTopic)}" data-bind="customTopic" maxlength="100">
          <span class="form-caption">可描述希望解决的业务场景、员工体检异常方向或客户关心的问题。</span>
        </div>

        <div class="field-row">
          <div class="field">
            <label for="booking-format">活动形式</label>
            <select id="booking-format" data-bind="format">
              ${["主题讲座", "专家健康咨询", "圆桌对话", "健康嘉年华", "管理层私享课"]
                .map((item) => `<option value="${item}" ${booking.format === item ? "selected" : ""}>${item}</option>`)
                .join("")}
            </select>
          </div>
          <div class="field">
            <label for="booking-audience">预计人数</label>
            <select id="booking-audience" data-bind="audience">
              ${["30–50 人", "50–100 人", "100–300 人", "300–500 人", "500 人以上"]
                .map((item) => `<option value="${item}" ${booking.audience === item ? "selected" : ""}>${item}</option>`)
                .join("")}
            </select>
          </div>
        </div>
        <div class="field">
          <label for="booking-city">活动城市</label>
          <input id="booking-city" type="text" placeholder="例如：北京、上海、深圳" value="${esc(booking.city)}" data-bind="city" maxlength="30">
        </div>
        <div class="form-hint-box">
          ${icon("info", 14)}
          <span>院方项目组会在确认时回复最终课题、内容大纲、流程安排与讲者信息。活动内容不提供个体诊疗建议。</span>
        </div>
      </div>
    `;
  }

  function renderBookingStep3() {
    const booking = state.booking;
    const smsSettings = getSmsSettings();
    const recipientCount = smsSettings.recipients
      .split(/\n|，|,|；|;/)
      .map((item) => item.trim())
      .filter(Boolean).length;
    return `
      <div class="wizard-body">
        <form id="booking-contact-form" autocomplete="off">
          <div class="wizard-section-title">
            <h3>企业与联系人信息</h3>
            <span>院方项目组将据此与您确认活动细节</span>
          </div>
          <div class="field-row">
            <div class="field">
              <label for="booking-org-type">机构类型</label>
              <select id="booking-org-type" name="orgType" data-bind="orgType">
                ${["保险公司", "企业", "银行", "其他机构"]
                  .map((item) => `<option value="${item}" ${booking.orgType === item ? "selected" : ""}>${item}</option>`)
                  .join("")}
              </select>
            </div>
            <div class="field">
              <label for="booking-org-name">机构全称 <em>*</em></label>
              <input id="booking-org-name" name="orgName" type="text" required placeholder="请输入企业或机构全称" value="${esc(booking.orgName)}" data-bind="orgName" maxlength="80">
            </div>
          </div>
          <div class="field-row">
            <div class="field">
              <label for="booking-contact-name">联系人 <em>*</em></label>
              <input id="booking-contact-name" name="contactName" type="text" required placeholder="您的姓名" value="${esc(booking.contactName)}" data-bind="contactName" maxlength="30">
            </div>
            <div class="field">
              <label for="booking-contact-title">职务 / 部门 <span>选填</span></label>
              <input id="booking-contact-title" name="contactTitle" type="text" placeholder="例如：员工福利经理" value="${esc(booking.contactTitle)}" data-bind="contactTitle" maxlength="40">
            </div>
          </div>
          <div class="field-row">
            <div class="field">
              <label for="booking-phone">手机号 <em>*</em></label>
              <input id="booking-phone" name="phone" type="tel" required inputmode="tel" pattern="1[3-9][0-9]{9}" title="请输入 11 位中国大陆手机号" placeholder="用于接收预约与短信提醒" value="${esc(booking.phone)}" data-bind="phone" maxlength="11">
            </div>
            <div class="field">
              <label for="booking-email">邮箱 <span>选填</span></label>
              <input id="booking-email" name="email" type="email" placeholder="用于接收活动资料" value="${esc(booking.email)}" data-bind="email" maxlength="80">
            </div>
          </div>
          <div class="field">
            <label for="booking-address">活动地址 <span>选填，可确认后补充</span></label>
            <input id="booking-address" name="address" type="text" placeholder="详细地址 / 楼宇 / 场地名称" value="${esc(booking.address)}" data-bind="address" maxlength="120">
          </div>
          <div class="field">
            <label for="booking-venue">场地安排 <span>选填</span></label>
            <input id="booking-venue" name="venue" type="text" placeholder="例如：总部多功能厅、会议室 A" value="${esc(booking.venue)}" data-bind="venue" maxlength="80">
          </div>
          <div class="field">
            <label for="booking-note">补充说明 <span>选填</span></label>
            <textarea id="booking-note" name="note" rows="3" placeholder="可补充员工画像、体检异常方向、期望环节、预算范围等" data-bind="note" maxlength="500">${esc(booking.note)}</textarea>
          </div>

          <div class="sms-panel">
            <div class="sms-panel__head">
              <span class="icon-box">${icon("bell", 17)}</span>
              <div>
                <strong>短信提醒</strong>
                <p>预约提交后自动提醒院方项目组，并按节点向联系人发送活动提醒。</p>
              </div>
            </div>
            <label class="check-row">
              <input type="checkbox" name="smsHospital" data-bind="smsHospital" ${booking.smsHospital && smsSettings.enabled ? "checked" : ""} ${smsSettings.enabled ? "" : "disabled"}>
              <span><strong>通知院方项目组</strong> · 当前已配置 ${recipientCount} 个接收人${smsSettings.enabled ? "" : "（短信服务已暂停）"}</span>
            </label>
            <label class="check-row">
              <input type="checkbox" name="smsContact" data-bind="smsContact" ${booking.smsContact && smsSettings.enabled ? "checked" : ""} ${smsSettings.enabled ? "" : "disabled"}>
              <span><strong>向联系人发送短信</strong> · 在院方确认、会前 3 天与会前 1 天提醒</span>
            </label>
          </div>

          <label class="check-row privacy-row">
            <input type="checkbox" name="agree" required data-bind="agree" ${booking.agree ? "checked" : ""}>
            <span>我已阅读并同意，本页面填写的信息将用于院方项目组预约联系与活动安排。演示环境数据仅保存在当前浏览器。</span>
          </label>
        </form>
      </div>
    `;
  }

  function renderBookingSuccess() {
    const appointment = state.lastAppointment;
    if (!appointment) return "";
    const doctor = doctorById(appointment.doctorId);
    const tier = TIERS[appointment.tier] || TIERS.elite;
    const smsSettings = getSmsSettings();
    return `
      <div class="booking-success">
        <span class="success-mark">${icon("check", 30)}</span>
        <h2>预约已提交</h2>
        <p>
          院方项目组已收到您的活动需求，将在 2 小时内与您确认专家、课题与档期。
          短信提醒${smsSettings.enabled ? "已登记" : "暂未开启"}${smsSettings.enabled ? "（演示环境）" : ""}。
        </p>
        <div class="success-ticket">
          <div class="success-ticket__head">
            <div>
              <small>APPOINTMENT NO.</small>
              <strong>${esc(appointment.id)}</strong>
            </div>
            ${appointmentStatusBadge("pending")}
          </div>
          <div class="success-ticket__body">
            <div class="success-ticket__row"><span>预约层级</span><strong>${tier.name} · ${tier.priceRange}</strong></div>
            <div class="success-ticket__row"><span>意向讲者</span><strong>${esc(doctor ? `${doctor.name} · ${doctor.dept}` : "由院方推荐")}</strong></div>
            <div class="success-ticket__row"><span>活动时间</span><strong>${formatDate(appointment.date, true)} · ${esc(appointment.time)}</strong></div>
            <div class="success-ticket__row"><span>意向课题</span><strong>${esc(appointment.customTopic || appointment.topic)}</strong></div>
            <div class="success-ticket__row"><span>活动城市</span><strong>${esc(appointment.city || "待补充")}</strong></div>
            <div class="success-ticket__row"><span>短信提醒</span><strong>${appointment.sms.hospital || appointment.sms.contact ? "已登记（演示环境）" : "未启用"}</strong></div>
          </div>
        </div>
        <div class="success-actions">
          <button class="btn btn--primary" type="button" data-action="view-appointments">查看我的预约 ${icon("arrowRight", 16)}</button>
          <button class="btn btn--ghost" type="button" data-action="open-admin-from-booking">院方工作台回复 ${icon("arrowUpRight", 15)}</button>
        </div>
        <span class="success-demo-note">${icon("info", 13)} 演示版数据保存在当前浏览器，正式版将写入业务后台。</span>
      </div>
    `;
  }

  function renderBookingFooter() {
    const step = state.booking.step;
    if (step === 4) return "";
    if (step === 1) {
      return `
        <div class="sheet__footer">
          <button class="btn btn--ghost btn--sm" type="button" data-action="close-overlay">取消</button>
          <button class="btn btn--primary" type="button" data-action="booking-next">下一步：选择专家 ${icon("arrowRight", 16)}</button>
        </div>
      `;
    }
    if (step === 2) {
      return `
        <div class="sheet__footer">
          <button class="btn btn--ghost btn--sm" type="button" data-action="booking-back">${icon("chevronLeft", 15)} 上一步</button>
          <button class="btn btn--primary" type="button" data-action="booking-next">下一步：填写企业信息 ${icon("arrowRight", 16)}</button>
        </div>
      `;
    }
    return `
      <div class="sheet__footer">
        <button class="btn btn--ghost btn--sm" type="button" data-action="booking-back">${icon("chevronLeft", 15)} 上一步</button>
        <button class="btn btn--orange" type="submit" form="booking-contact-form">提交预约 ${icon("arrowRight", 16)}</button>
      </div>
    `;
  }

  function renderBookingOverlay() {
    const booking = state.booking;
    const titles = {
      1: ["预约专家入企", "选择专家层级、可预约日期与活动时段"],
      2: ["选择专家与课题", "院方可根据企业人群与目标推荐合适讲者"],
      3: ["填写企业与联系人信息", "用于院方确认活动安排与发送短信提醒"],
      4: ["预约已提交", "院方项目组将尽快与您确认"]
    };
    const [title, description] = titles[booking.step];
    return `
      <div class="overlay">
        <button class="overlay__backdrop" type="button" data-action="close-overlay" aria-label="关闭预约窗口"></button>
        <section class="sheet" role="dialog" aria-modal="true" aria-labelledby="booking-title">
          <header class="sheet__header sheet__header--navy">
            <div>
              <small>White Coat to Enterprise · Booking</small>
              <h2 id="booking-title">${title}</h2>
              <p>${description}</p>
              ${booking.step < 4 ? renderWizardSteps(booking.step) : ""}
            </div>
            <button class="sheet__close" type="button" data-action="close-overlay" aria-label="关闭">${icon("close", 16)}</button>
          </header>
          <div class="sheet__body">
            ${booking.step === 1 ? renderBookingStep1() : ""}
            ${booking.step === 2 ? renderBookingStep2() : ""}
            ${booking.step === 3 ? renderBookingStep3() : ""}
            ${booking.step === 4 ? renderBookingSuccess() : ""}
          </div>
          ${renderBookingFooter()}
        </section>
      </div>
    `;
  }

  /* =========================================================
     Shared helpers for the remaining views
     ========================================================= */
  const SMS_TRIGGER_META = [
    { id: "created", label: "预约提交时", help: "立即提醒院方项目组" },
    { id: "confirmed", label: "院方确认时", help: "回复方案后通知联系人" },
    { id: "before3", label: "活动前 3 天", help: "向联系人发送到场提醒" },
    { id: "before1", label: "活动前 1 天", help: "最终时间与场地确认" }
  ];

  const REPLY_FORMATS = [
    "主题讲座",
    "主题讲座 + 现场问答",
    "专家健康咨询",
    "圆桌对话",
    "健康嘉年华",
    "管理层私享课"
  ];

  function topicOf(appointment) {
    return (appointment?.customTopic || "").trim() || appointment?.topic || "企业健康活动";
  }

  function cleanDoctorText(value) {
    const text = String(value || "").trim();
    if (!text) return "";
    const lastStop = Math.max(text.lastIndexOf("。"), text.lastIndexOf("；"), text.lastIndexOf("！"));
    if (text.length > 160 && lastStop > 100) return text.slice(0, lastStop + 1);
    return text;
  }

  function parseRecipients(raw) {
    return String(raw || "")
      .split(/\n|；|;/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const separator = line.match(/[:：]/);
        if (separator) {
          const name = line.slice(0, separator.index).trim();
          const phone = line.slice(separator.index + 1).trim();
          return { name: name || "项目组成员", phone };
        }
        if (/^1[3-9]\d{9}$/.test(line.replace(/\s/g, ""))) {
          return { name: "项目组成员", phone: line };
        }
        return { name: line, phone: "" };
      });
  }

  function sampleSmsData() {
    return {
      org: "示例保险 · 高客健康服务部",
      topic: "职场久坐人群的脊柱健康",
      date: formatChineseDate(addDays(startOfDay(new Date()), 21)),
      time: "14:00–16:00",
      venue: "企业总部多功能厅",
      id: "BD-20261119-108"
    };
  }

  function fillSmsTemplate(template, data = {}) {
    const values = { ...sampleSmsData(), ...data };
    return String(template || "").replace(/\{(\w+)\}/g, (match, key) => {
      return Object.prototype.hasOwnProperty.call(values, key) ? String(values[key]) : match;
    });
  }

  function recipientSummary(raw) {
    const recipients = parseRecipients(raw);
    if (!recipients.length) return "未配置接收人";
    const first = `${recipients[0].name}${recipients[0].phone ? ` ${recipients[0].phone}` : ""}`;
    return recipients.length > 1 ? `${first} 等 ${recipients.length} 人` : first;
  }

  /* =========================================================
     Doctor detail
     ========================================================= */
  function renderDoctorDetail(doctor) {
    if (!doctor) return "";
    const tier = tierOf(doctor);
    return `
      <div class="overlay">
        <button class="overlay__backdrop" type="button" data-action="close-overlay" aria-label="关闭专家详情"></button>
        <section class="sheet sheet--doctor" role="dialog" aria-modal="true" aria-labelledby="doctor-title">
          <header class="sheet__header">
            <div>
              <small>Expert Profile · 官网公开资料</small>
              <h2 id="doctor-title">专家介绍</h2>
              <p>资料来自北京大学国际医院官方网站，实际出讲与档期以院方确认为准。</p>
            </div>
            <button class="sheet__close" type="button" data-action="close-overlay" aria-label="关闭">${icon("close", 16)}</button>
          </header>
          <div class="sheet__body">
            <div class="doctor-detail">
              <div class="doctor-profile">
                <div class="doctor-profile__photo">
                  <img src="${esc(doctor.photo)}" alt="${esc(doctor.name)}，${esc(doctor.dept)}">
                </div>
                <div>
                  <span class="doctor-profile__tag">${esc(tier.name)} · 官网专家编号 ${esc(doctor.id)}</span>
                  <div class="doctor-profile__name">
                    <h3>${esc(doctor.name)}</h3>
                    <small>${esc(doctor.dept)}</small>
                  </div>
                  <div class="doctor-profile__role">${esc(doctor.title)}</div>
                  <span class="doctor-profile__dept">${icon("stethoscope", 12)} ${esc(doctor.dept)}</span>
                  <div class="doctor-profile__tags">
                    ${doctor.tags.map((tag) => `<span>${esc(tag)}</span>`).join("")}
                  </div>
                  <div class="doctor-profile__links">
                    <a class="btn btn--ghost btn--sm" href="${esc(doctor.profileUrl)}" target="_blank" rel="noopener">
                      查看官网资料 ${icon("arrowUpRight", 14)}
                    </a>
                    <span class="doctor-profile__source">来源：北京大学国际医院官网公开信息</span>
                  </div>
                </div>
              </div>

              <div class="doctor-detail__block">
                <h4>擅长方向</h4>
                <p>${esc(cleanDoctorText(doctor.specialty) || "官网暂未提供擅长方向摘要，详情请查看官网专家页。")}</p>
              </div>

              <div class="doctor-detail__block">
                <h4>公开简介</h4>
                <div class="doctor-detail__quote">${esc(cleanDoctorText(doctor.intro) || "官网暂未提供公开简介，详情请查看官网专家页。")}</div>
              </div>

              <div class="doctor-detail__cta">
                <div>
                  <strong>邀请 ${esc(doctor.name)} 走进企业</strong>
                  <p>${esc(tier.name)} · ${esc(tier.priceRange)} · ${esc(tier.leadLabel)}</p>
                </div>
                <button class="btn btn--orange btn--sm" type="button" data-action="book-doctor" data-doctor-id="${esc(doctor.id)}">
                  预约该专家 ${icon("arrowRight", 15)}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  }

  /* =========================================================
     Appointment detail for clients
     ========================================================= */
  function renderAppointmentDetail(appointment) {
    if (!appointment) return "";
    const doctor = doctorById(appointment.doctorId);
    const tier = TIERS[appointment.tier] || TIERS.specialist;
    const status = STATUS[appointment.status] || STATUS.pending;
    const smsSettings = getSmsSettings();
    const reply = appointment.reply;
    return `
      <div class="overlay">
        <button class="overlay__backdrop" type="button" data-action="close-overlay" aria-label="关闭预约详情"></button>
        <section class="sheet sheet--sm" role="dialog" aria-modal="true" aria-labelledby="appointment-title">
          <header class="sheet__header">
            <div>
              <small>Appointment Detail · ${esc(appointment.id)}</small>
              <h2 id="appointment-title">${esc(topicOf(appointment))}</h2>
              <p>${esc(status.help)}</p>
            </div>
            <button class="sheet__close" type="button" data-action="close-overlay" aria-label="关闭">${icon("close", 16)}</button>
          </header>
          <div class="sheet__body">
            <div class="appointment-detail">
              <div class="appointment-detail__status">
                <div class="appointment-detail__status-main">
                  <span class="icon-box">${icon(appointment.reply ? "message" : "clock", 17)}</span>
                  <div>
                    <strong>${esc(status.title)}</strong>
                    <small>${appointment.reply ? "院方已回复活动方案" : "院方项目组将尽快与您确认"}</small>
                  </div>
                </div>
                <div class="appointment-detail__status-right">
                  <small>预约号</small>
                  <strong>${esc(appointment.id)}</strong>
                </div>
              </div>

              <div class="detail-grid">
                <div class="detail-cell"><small>预约层级 / 参考价</small><strong>${esc(tier.name)} · ${esc(tier.priceRange)}</strong></div>
                <div class="detail-cell"><small>意向讲者</small><strong>${esc(doctor ? `${doctor.name} · ${doctor.dept}` : "由院方推荐专家")}</strong></div>
                <div class="detail-cell"><small>活动时间</small><strong>${formatDate(appointment.date, true)}<br>${esc(appointment.time)}</strong></div>
                <div class="detail-cell"><small>活动形式 / 人数</small><strong>${esc(appointment.format)} · ${esc(appointment.audience)}</strong></div>
                <div class="detail-cell"><small>机构</small><strong>${esc(appointment.orgName)}</strong></div>
                <div class="detail-cell"><small>联系人</small><strong>${esc(appointment.contactName)} · ${esc(appointment.phone)}</strong></div>
                <div class="detail-cell"><small>活动城市</small><strong>${esc(appointment.city || "待补充")}</strong></div>
                <div class="detail-cell"><small>场地</small><strong>${esc(appointment.venue || appointment.address || "待确认")}</strong></div>
              </div>

              <div class="appointment-detail__block">
                <div class="appointment-detail__block-head">
                  <h3>院方活动方案</h3>
                  <small>${reply ? `更新于 ${formatDateTime(reply.updatedAt)}` : "等待院方回复"}</small>
                </div>
                ${
                  reply
                    ? `
                      <div class="reply-box">
                        <div class="reply-box__line"><span>确认课题</span><div>${esc(reply.topic)}</div></div>
                        <div class="reply-box__line"><span>讲者</span><div>${esc(reply.speaker)}</div></div>
                        <div class="reply-box__line"><span>活动形式</span><div>${esc(reply.format)}</div></div>
                        <div class="reply-box__line"><span>时间安排</span><div>${esc(reply.schedule)}</div></div>
                        <div class="reply-box__line"><span>内容大纲</span><div>${esc(reply.outline)}</div></div>
                        <div class="reply-box__line"><span>活动流程</span><div>${esc(reply.agenda)}</div></div>
                        <div class="reply-box__line"><span>院方联系人</span><div>${esc(reply.contact)}</div></div>
                      </div>
                      <div class="reply-message">${esc(reply.message)}</div>
                    `
                    : `
                      <div class="reply-empty">
                        <span class="icon-box">${icon("clock", 17)}</span>
                        <div>
                          <strong>院方正在匹配专家与课题</strong>
                          <p>确认后，这里将展示最终课题、内容大纲、活动流程、时间安排与院方联系人。</p>
                        </div>
                      </div>
                    `
                }
              </div>

              <div class="reminder-box">
                ${icon("bell", 17)}
                <div>
                  <strong>短信提醒 · 演示环境</strong>
                  <p>
                    ${
                      smsSettings.enabled
                        ? `预约节点已登记：${SMS_TRIGGER_META.filter((item) => smsSettings.triggers[item.id]).map((item) => item.label).join("、")}。演示版不会实际发送短信，正式版接入短信网关后生效。`
                        : "短信服务当前已暂停。正式版可在院方工作台重新启用并接入短信网关。"
                    }
                  </p>
                </div>
              </div>

              <div class="detail-actions">
                <button class="btn btn--ghost btn--sm" type="button" data-action="close-overlay">关闭</button>
                <a class="btn btn--primary btn--sm" href="tel:01069006666">联系项目组 ${icon("phone", 14)}</a>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  }

  /* =========================================================
     Admin login / shell
     ========================================================= */
  function renderAdminLogin() {
    return `
      <div class="admin-login">
        <div class="admin-login__brand">
          <img src="assets/logo.svg" alt="北京大学国际医院">
          <span>北京大学国际医院<br>院方项目工作台</span>
        </div>
        <section class="login-card">
          <small>PKUIH · ENTERPRISE HEALTH PORTAL</small>
          <h1>院方项目工作台</h1>
          <p>登录后查看企业预约、回复课题与流程安排，并配置短信提醒节点。</p>
          <form id="admin-login-form" autocomplete="off">
            <div class="login-fields">
              <div class="field">
                <label for="admin-username">账号</label>
                <input id="admin-username" name="username" type="text" placeholder="请输入院方账号" autocomplete="username">
              </div>
              <div class="field">
                <label for="admin-password">密码</label>
                <input id="admin-password" name="password" type="password" placeholder="请输入密码" autocomplete="current-password">
              </div>
            </div>
            <p class="login-error" id="admin-login-error">账号或密码不正确，请重试。</p>
            <button class="btn btn--orange btn--block" type="submit">
              进入工作台 ${icon("arrowRight", 16)}
            </button>
          </form>
          <div class="login-demo">
            演示账号：<strong>admin</strong> · 密码：<strong>pkuih2026</strong><br>
            本演示使用浏览器会话登录，正式版需接入统一身份认证。
          </div>
          <a class="login-back" href="#/">${icon("chevronLeft", 14)} 返回官网首页</a>
        </section>
      </div>
    `;
  }

  function renderAdminSidebar() {
    const tab = state.admin.tab;
    return `
      <aside class="admin-sidebar">
        <div class="admin-sidebar__logo">
          <img src="assets/logo.svg" alt="北京大学国际医院">
        </div>
        <div class="admin-sidebar__section">
          <span class="admin-sidebar__label">PROJECT WORKSPACE</span>
          <nav class="admin-nav" aria-label="院方工作台导航">
            <button class="${tab === "appointments" ? "is-active" : ""}" type="button" data-action="admin-tab" data-tab="appointments">
              ${icon("list", 17)} 预约管理
            </button>
            <button class="${tab === "sms" ? "is-active" : ""}" type="button" data-action="admin-tab" data-tab="sms">
              ${icon("bell", 17)} 短信提醒
            </button>
          </nav>
        </div>
        <div class="admin-sidebar__bottom">
          <div class="admin-sidebar__user">
            <span class="admin-sidebar__avatar">北</span>
            <div>
              <strong>企业健康项目组</strong>
              <small>院方管理员 · admin</small>
            </div>
          </div>
          <a class="admin-sidebar__logout" href="#/">${icon("home", 13)} 返回官网</a>
          <button class="admin-sidebar__logout" type="button" data-action="admin-logout">${icon("logout", 13)} 退出登录</button>
        </div>
      </aside>
    `;
  }

  function renderAdminStats() {
    const appointments = getAppointments();
    const pending = appointments.filter((item) => item.status === "pending").length;
    const confirmed = appointments.filter((item) => item.status === "confirmed" || item.status === "completed").length;
    const smsCount = getSmsLogs().length;
    return `
      <div class="admin-stats">
        <div class="admin-stat">
          <small>累计预约需求</small>
          <strong>${appointments.length}<span>条</span></strong>
          <span class="admin-stat__delta">${icon("info", 11)} 演示数据保存在本机</span>
        </div>
        <div class="admin-stat">
          <small>待院方确认</small>
          <strong>${pending}<span>条</span></strong>
          <span class="admin-stat__delta is-amber">${icon("clock", 11)} 需优先跟进</span>
        </div>
        <div class="admin-stat">
          <small>已确认 / 已完成</small>
          <strong>${confirmed}<span>条</span></strong>
          <span class="admin-stat__delta">${icon("checkCircle", 11)} 含已完成活动</span>
        </div>
        <div class="admin-stat">
          <small>短信提醒记录</small>
          <strong>${smsCount}<span>条</span></strong>
          <span class="admin-stat__delta is-amber">${icon("message", 11)} 仅演示记录</span>
        </div>
      </div>
    `;
  }

  function filteredAdminAppointments() {
    const statusFilter = state.admin.statusFilter;
    const query = state.admin.search.trim().toLowerCase();
    return getAppointments()
      .filter((appointment) => statusFilter === "all" || appointment.status === statusFilter)
      .filter((appointment) => {
        if (!query) return true;
        const doctor = doctorById(appointment.doctorId);
        return [
          appointment.id,
          appointment.orgName,
          appointment.orgType,
          appointment.contactName,
          appointment.phone,
          appointment.topic,
          appointment.customTopic,
          appointment.city,
          appointment.venue,
          doctor?.name || ""
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  function renderAdminListBody() {
    const appointments = filteredAdminAppointments();
    if (!appointments.length) {
      return `
        <div class="admin-empty">
          <span class="admin-empty__icon">${icon("search", 21)}</span>
          <h3>没有匹配的预约</h3>
          <p>调整状态筛选或搜索条件后再试。</p>
        </div>
      `;
    }
    return `
      <div class="admin-appt-head">
        <span>状态 / 预约号</span>
        <span>机构 / 联系人</span>
        <span>专家 / 课题</span>
        <span>活动时间</span>
        <span>操作</span>
      </div>
      ${appointments
        .map((appointment) => {
          const doctor = doctorById(appointment.doctorId);
          const tier = TIERS[appointment.tier] || TIERS.specialist;
          const date = parseIsoDate(appointment.date);
          return `
            <button class="admin-appt-row" type="button" data-action="admin-review" data-appointment-id="${esc(appointment.id)}">
              <div class="admin-appt-row__status">
                ${appointmentStatusBadge(appointment.status)}
                <span class="admin-appt-row__id">${esc(appointment.id)}</span>
              </div>
              <div class="admin-appt-row__org">
                <strong>${esc(appointment.orgName)}</strong>
                <small>${esc(appointment.orgType)} · ${esc(appointment.contactName)} ${esc(maskPhone(appointment.phone))}</small>
              </div>
              <div class="admin-appt-row__expert">
                <strong>${esc(doctor ? doctor.name : "待匹配专家")}</strong>
                <small>${esc(tier.name)} · ${esc(topicOf(appointment))}</small>
              </div>
              <div class="admin-appt-row__date">
                <strong>${date ? formatShortDate(date) : "待确认"} ${date ? weekday(date) : ""}</strong>
                <small>${esc(appointment.time || "时间待定")}</small>
              </div>
              <div class="admin-appt-row__action">
                ${appointment.reply ? "继续回复" : "回复方案"} ${icon("chevronRight", 12)}
              </div>
            </button>
          `;
        })
        .join("")}
      <div class="admin-pagination">
        <span>共 ${appointments.length} 条预约记录 · 演示数据</span>
        <div class="admin-pagination__pages">
          <span>1</span>
        </div>
      </div>
    `;
  }

  function renderAdminAppointmentsTab() {
    const filters = [
      { id: "all", label: "全部" },
      { id: "pending", label: "待确认" },
      { id: "confirmed", label: "已确认" },
      { id: "needs_info", label: "待补充" },
      { id: "completed", label: "已完成" }
    ];
    return `
      <section class="admin-panel">
        <div class="admin-panel__head">
          <div>
            <h2>预约与活动需求</h2>
            <p>查看企业需求、回复活动方案并更新预约状态。</p>
          </div>
          <div class="admin-search">
            ${icon("search", 15)}
            <input id="admin-search" type="search" placeholder="搜索机构、预约号、专家或课题" value="${esc(state.admin.search)}" autocomplete="off">
          </div>
        </div>
        <div class="admin-filters">
          ${filters
            .map(
              (filter) => `
                <button class="admin-filter ${state.admin.statusFilter === filter.id ? "is-active" : ""}" type="button" data-action="admin-filter" data-status="${filter.id}">
                  ${filter.label}
                </button>
              `
            )
            .join("")}
        </div>
        <div class="admin-appointments" id="admin-list-body">
          ${renderAdminListBody()}
        </div>
      </section>
    `;
  }

  function renderAdminPage() {
    if (!isAdminAuthed()) return renderAdminLogin();
    const tab = state.admin.tab;
    const title = tab === "sms" ? "短信提醒配置" : "企业预约管理";
    const description =
      tab === "sms"
        ? "配置院方接收人与提醒节点，预约和活动安排可同步通知相关同事。"
        : "管理保险公司与企业提交的专家活动需求，回复课题、流程与时间安排。";
    return `
      <div class="admin">
        ${renderAdminSidebar()}
        <main class="admin-main">
          <div class="admin-top">
            <div class="admin-top__title">
              <h1>${title}</h1>
              <p>${description}</p>
            </div>
            <div class="admin-top__right">
              <span class="admin-top__date">${formatChineseDate(new Date())} · 演示环境</span>
              <span class="admin-top__avatar">北</span>
            </div>
          </div>
          ${renderAdminStats()}
          ${tab === "sms" ? renderSmsSettingsTab() : renderAdminAppointmentsTab()}
        </main>
      </div>
    `;
  }

  /* =========================================================
     Admin review sheet
     ========================================================= */
  function defaultReplyDraft(appointment) {
    if (appointment.reply) {
      return {
        ...appointment.reply,
        sendSms: true
      };
    }
    const doctor = doctorById(appointment.doctorId);
    const topic = topicOf(appointment);
    return {
      topic,
      outline: `1. ${topic}的核心健康风险\n2. 常见误区与早期信号\n3. 企业人群可执行的日常管理\n4. 现场问答与互动`,
      agenda: "签到与开场\n专家主题分享\n现场问答\n健康咨询与总结",
      schedule: `${formatChineseDate(appointment.date)} ${appointment.time}`,
      format: appointment.format || "主题讲座 + 现场问答",
      speaker: doctor ? `${doctor.name} ${doctor.title.split(" · ")[0]}` : "由院方项目组匹配专家",
      contact: "企业健康项目组 · 李老师 010-6900 6666",
      message:
        "感谢贵司的预约与信任。院方项目组已完成专家与课题确认，具体流程与时间安排请见本页回复。如活动人数或场地有变化，请提前 3 个工作日联系项目组。",
      sendSms: true
    };
  }

  function openAdminReview(appointmentId) {
    const appointment = getAppointments().find((item) => item.id === appointmentId);
    if (!appointment) {
      showToast("未找到该预约记录。");
      return;
    }
    state.admin.reviewId = appointment.id;
    state.admin.draft = defaultReplyDraft(appointment);
    state.overlay = { type: "admin-review", appointmentId: appointment.id };
    renderOverlay();
  }

  function renderReplyFormatOptions(current) {
    const formats = REPLY_FORMATS.includes(current) ? REPLY_FORMATS : [...REPLY_FORMATS, current];
    return formats
      .filter(Boolean)
      .map((item) => `<option value="${esc(item)}" ${item === current ? "selected" : ""}>${esc(item)}</option>`)
      .join("");
  }

  function renderAdminReviewOverlay() {
    const appointment = getAppointments().find((item) => item.id === state.admin.reviewId);
    if (!appointment) return "";
    const draft = state.admin.draft || defaultReplyDraft(appointment);
    const doctor = doctorById(appointment.doctorId);
    const tier = TIERS[appointment.tier] || TIERS.specialist;
    const status = STATUS[appointment.status] || STATUS.pending;
    const smsSettings = getSmsSettings();
    const primaryAction =
      appointment.status === "confirmed"
        ? { status: "completed", label: "标记完成" }
        : appointment.status === "completed"
          ? { status: "confirmed", label: "重新确认" }
          : { status: "confirmed", label: "保存并确认" };
    return `
      <div class="overlay">
        <button class="overlay__backdrop" type="button" data-action="close-overlay" aria-label="关闭回复窗口"></button>
        <section class="sheet sheet--admin-review" role="dialog" aria-modal="true" aria-labelledby="review-title">
          <header class="sheet__header">
            <div>
              <small>Appointment Review · ${esc(appointment.id)}</small>
              <h2 id="review-title">回复企业预约</h2>
              <p>填写最终课题、讲者、内容大纲、活动流程与联系人，保存后企业端即可查看。</p>
            </div>
            <button class="sheet__close" type="button" data-action="close-overlay" aria-label="关闭">${icon("close", 16)}</button>
          </header>
          <div class="sheet__body sheet__body--review">
            <div class="review-layout">
              <aside class="review-summary">
                <div class="review-summary__head">
                  ${
                    doctor
                      ? `<img src="${esc(doctor.photo)}" alt="${esc(doctor.name)}">`
                      : `<span class="icon-box">${icon("sparkle", 18)}</span>`
                  }
                  <div>
                    <strong>${esc(doctor ? doctor.name : "待匹配专家")}</strong>
                    <small>${esc(tier.name)} · ${esc(doctor ? doctor.dept : "由院方推荐")}</small>
                  </div>
                </div>
                <div class="review-summary__status">
                  <small>当前状态</small>
                  <strong>${esc(status.label)}</strong>
                </div>
                <div class="review-info">
                  <div class="review-info__row"><span>预约号</span><strong>${esc(appointment.id)}</strong></div>
                  <div class="review-info__row"><span>机构</span><strong>${esc(appointment.orgName)}</strong></div>
                  <div class="review-info__row"><span>联系人</span><strong>${esc(appointment.contactName)} ${esc(appointment.contactTitle || "")}<br>${esc(appointment.phone)}</strong></div>
                  <div class="review-info__row"><span>邮箱</span><strong>${esc(appointment.email || "未填写")}</strong></div>
                  <div class="review-info__row"><span>活动时间</span><strong>${formatChineseDate(appointment.date)} ${esc(appointment.time)}</strong></div>
                  <div class="review-info__row"><span>形式 / 人数</span><strong>${esc(appointment.format)} · ${esc(appointment.audience)}</strong></div>
                  <div class="review-info__row"><span>城市 / 场地</span><strong>${esc(appointment.city || "待补充")}<br>${esc(appointment.venue || appointment.address || "待补充")}</strong></div>
                  <div class="review-info__row"><span>意向课题</span><strong>${esc(topicOf(appointment))}</strong></div>
                  <div class="review-info__row"><span>短信提醒</span><strong>${smsSettings.enabled ? "已启用 · 演示环境" : "已暂停"}</strong></div>
                </div>
                <div class="review-message">${esc(appointment.note || "企业未填写补充说明。")}</div>
              </aside>
              <section class="review-form">
                <form id="admin-review-form" autocomplete="off">
                  <div class="review-form__top">
                    <div>
                      <h3>活动方案与回复</h3>
                      <p>保存后同步展示在企业“我的预约”详情页。</p>
                    </div>
                    <span class="chip chip--blue">${esc(status.label)}</span>
                  </div>
                  <div class="field-row">
                    <div class="field">
                      <label for="review-topic">确认课题 <em>*</em></label>
                      <input id="review-topic" type="text" data-draft="topic" value="${esc(draft.topic)}" maxlength="80">
                    </div>
                    <div class="field">
                      <label for="review-format">活动形式</label>
                      <select id="review-format" data-draft="format">
                        ${renderReplyFormatOptions(draft.format)}
                      </select>
                    </div>
                  </div>
                  <div class="field-row">
                    <div class="field">
                      <label for="review-speaker">讲者 <em>*</em></label>
                      <input id="review-speaker" type="text" data-draft="speaker" value="${esc(draft.speaker)}" maxlength="60">
                    </div>
                    <div class="field">
                      <label for="review-schedule">时间安排 <em>*</em></label>
                      <input id="review-schedule" type="text" data-draft="schedule" value="${esc(draft.schedule)}" maxlength="80">
                    </div>
                  </div>
                  <div class="field">
                    <label for="review-outline">内容大纲</label>
                    <textarea id="review-outline" data-draft="outline" rows="4">${esc(draft.outline)}</textarea>
                  </div>
                  <div class="field">
                    <label for="review-agenda">活动流程</label>
                    <textarea id="review-agenda" data-draft="agenda" rows="4">${esc(draft.agenda)}</textarea>
                  </div>
                  <div class="field-row">
                    <div class="field">
                      <label for="review-contact">院方联系人</label>
                      <input id="review-contact" type="text" data-draft="contact" value="${esc(draft.contact)}" maxlength="80">
                    </div>
                    <div class="field">
                      <label for="review-message">给企业的留言</label>
                      <textarea id="review-message" data-draft="message" rows="3">${esc(draft.message)}</textarea>
                    </div>
                  </div>
                  <div class="review-form__bottom">
                    <label class="review-form__send">
                      <input type="checkbox" data-draft="sendSms" ${draft.sendSms !== false ? "checked" : ""} ${smsSettings.enabled ? "" : "disabled"}>
                      <span>保存并确认后，向联系人发送短信通知（演示环境不实际发送）</span>
                    </label>
                    <div class="review-form__actions">
                      <button class="btn btn--ghost btn--sm" type="button" data-action="admin-save-reply" data-status="keep">保存回复</button>
                      <button class="btn btn--ghost btn--sm" type="button" data-action="admin-save-reply" data-status="needs_info">需补充信息</button>
                      <button class="btn btn--primary btn--sm" type="button" data-action="admin-save-reply" data-status="${primaryAction.status}">${primaryAction.label}</button>
                    </div>
                  </div>
                </form>
              </section>
            </div>
          </div>
        </section>
      </div>
    `;
  }

  /* =========================================================
     Admin SMS settings
     ========================================================= */
  function renderRecipientItems(raw) {
    const recipients = parseRecipients(raw);
    if (!recipients.length) {
      return `<p class="form-caption">尚未配置接收人</p>`;
    }
    return recipients
      .map(
        (item) => `
          <div class="sms-recipient-item">
            <span>${esc(item.name)}</span>
            <strong>${esc(item.phone || "未填写手机号")}</strong>
          </div>
        `
      )
      .join("");
  }

  function renderSmsLogItems() {
    const logs = getSmsLogs();
    if (!logs.length) {
      return `<p class="form-caption">暂无提醒记录</p>`;
    }
    return logs
      .slice(0, 6)
      .map(
        (log) => `
          <div class="sms-log">
            <div>
              <strong>${esc(log.content)}</strong>
              <small>${esc(log.recipient)} · ${formatDateTime(log.createdAt)}</small>
            </div>
            <span>${esc(log.status)}</span>
          </div>
        `
      )
      .join("");
  }

  function renderSmsSettingsTab() {
    const settings = getSmsSettings();
    return `
      <div class="sms-settings">
        <section class="settings-card">
          <div class="settings-card__head">
            <div>
              <h2>短信提醒</h2>
              <p>预约提交、院方确认与活动前节点自动提醒相关同事。</p>
            </div>
            <label class="switch" aria-label="启用短信提醒">
              <input type="checkbox" data-sms-enabled ${settings.enabled ? "checked" : ""}>
              <span></span>
            </label>
          </div>

          <div class="field">
            <label for="sms-recipients">院方接收人 <span>每行一位，可填写姓名与手机号</span></label>
            <textarea id="sms-recipients" class="recipient-list" data-sms-bind="recipients" rows="4">${esc(settings.recipients)}</textarea>
            <span class="form-caption">演示环境不会实际发送短信；正式版需接入短信网关并完成号码报备。</span>
          </div>

          <div class="field">
            <label>触发节点 <span>可多选</span></label>
            <div class="trigger-grid">
              ${SMS_TRIGGER_META.map(
                (trigger) => `
                  <label class="trigger-item">
                    <input type="checkbox" data-sms-trigger="${trigger.id}" ${settings.triggers[trigger.id] ? "checked" : ""}>
                    <span>
                      <strong>${trigger.label}</strong>
                      <small>${trigger.help}</small>
                    </span>
                  </label>
                `
              ).join("")}
            </div>
          </div>

          <div class="field template-field">
            <label for="sms-template">提醒模板 <span>建议 70 字以内</span></label>
            <textarea id="sms-template" data-sms-bind="template" rows="5">${esc(settings.template)}</textarea>
            <div class="template-vars">
              <span>{org}</span><span>{topic}</span><span>{date}</span><span>{time}</span><span>{venue}</span><span>{id}</span>
            </div>
          </div>

          <div class="settings-actions">
            <button class="btn btn--primary btn--sm" type="button" data-action="sms-save">保存配置</button>
            <button class="btn btn--ghost btn--sm" type="button" data-action="sms-test">${icon("message", 15)} 发送测试短信</button>
            <span class="form-caption" id="sms-saved-note">最后保存：${settings.updatedAt ? formatDateTime(settings.updatedAt) : "尚未保存"}</span>
          </div>
        </section>

        <aside class="settings-side">
          <section class="sms-preview">
            <div class="sms-preview__label">
              <span>短信预览 · 演示</span>
              <i></i>
            </div>
            <div class="sms-bubble" id="sms-preview-bubble">${esc(fillSmsTemplate(settings.template))}</div>
            <div class="sms-preview__meta">${icon("info", 11)} 演示环境不会真实发送</div>
          </section>

          <section class="sms-recipient-card">
            <h4>当前接收人</h4>
            <div id="sms-recipient-list">${renderRecipientItems(settings.recipients)}</div>
          </section>

          <div class="settings-tip">
            ${icon("info", 14)}
            <span>正式版本可接入短信服务商，支持发送回执、失败重试与按项目组分组配置。</span>
          </div>

          <section class="settings-card">
            <div class="settings-card__head">
              <div>
                <h2 style="font-size:18px">提醒记录</h2>
                <p>仅记录本演示环境中的操作。</p>
              </div>
            </div>
            <div class="sms-log-list" id="sms-log-list">${renderSmsLogItems()}</div>
          </section>
        </aside>
      </div>
    `;
  }

  function readSmsForm() {
    const enabledEl = document.querySelector("[data-sms-enabled]");
    const recipientsEl = document.querySelector('[data-sms-bind="recipients"]');
    const templateEl = document.querySelector('[data-sms-bind="template"]');
    const triggers = {};
    document.querySelectorAll("[data-sms-trigger]").forEach((el) => {
      triggers[el.dataset.smsTrigger] = el.checked;
    });
    return {
      enabled: enabledEl ? enabledEl.checked : true,
      recipients: recipientsEl ? recipientsEl.value : "",
      template: templateEl ? templateEl.value : "",
      triggers,
      updatedAt: ""
    };
  }

  function updateSmsPreview() {
    const bubble = document.getElementById("sms-preview-bubble");
    if (!bubble) return;
    const templateEl = document.querySelector('[data-sms-bind="template"]');
    bubble.textContent = fillSmsTemplate(templateEl ? templateEl.value : "");
    const recipientsEl = document.querySelector('[data-sms-bind="recipients"]');
    const recipientList = document.getElementById("sms-recipient-list");
    if (recipientsEl && recipientList) {
      recipientList.innerHTML = renderRecipientItems(recipientsEl.value);
    }
  }

  /* =========================================================
     Overlay dispatcher
     ========================================================= */
  function renderOverlay() {
    if (!overlayRoot) return;
    const overlay = state.overlay;
    if (!overlay) {
      overlayRoot.innerHTML = "";
      document.body.style.overflow = "";
      return;
    }
    if (overlay.type === "booking") overlayRoot.innerHTML = renderBookingOverlay();
    else if (overlay.type === "doctor") overlayRoot.innerHTML = renderDoctorDetail(doctorById(overlay.doctorId));
    else if (overlay.type === "appointment") {
      const appointment = getAppointments().find((item) => item.id === overlay.appointmentId);
      overlayRoot.innerHTML = renderAppointmentDetail(appointment);
    } else if (overlay.type === "admin-review") overlayRoot.innerHTML = renderAdminReviewOverlay();
    else overlayRoot.innerHTML = "";
    document.body.style.overflow = overlayRoot.innerHTML ? "hidden" : "";
  }

  /* =========================================================
     Actions
     ========================================================= */
  function closeOverlay() {
    state.overlay = null;
    renderOverlay();
  }

  function navigate(hash) {
    if (window.location.hash === hash) {
      closeOverlay();
      renderApp();
      window.scrollTo(0, 0);
      return;
    }
    window.location.hash = hash;
  }

  function scrollToSection(sectionId) {
    const run = () => {
      const target = document.getElementById(sectionId);
      if (!target) return;
      const top = target.getBoundingClientRect().top + window.scrollY - 78;
      window.scrollTo({ top, behavior: "smooth" });
    };
    if (route() === "home") {
      run();
    } else {
      navigate("#/");
      window.setTimeout(run, 90);
    }
  }

  function openDoctor(doctorId) {
    state.overlay = { type: "doctor", doctorId };
    renderOverlay();
  }

  function openAppointment(appointmentId) {
    state.overlay = { type: "appointment", appointmentId };
    renderOverlay();
  }

  function advanceBooking() {
    const booking = state.booking;
    if (!booking) return;
    if (booking.step === 1) {
      if (!booking.date) {
        showToast("请选择一个可预约日期。");
        return;
      }
      if (!booking.slot) {
        showToast("请选择活动时段。");
        return;
      }
      booking.step = 2;
      renderOverlay();
      return;
    }
    if (booking.step === 2) {
      booking.step = 3;
      renderOverlay();
    }
  }

  function syncBookingForm(form) {
    form.querySelectorAll("[data-bind]").forEach((el) => {
      if (!state.booking) return;
      state.booking[el.dataset.bind] = el.type === "checkbox" ? el.checked : el.value;
    });
  }

  function submitBooking() {
    const form = document.getElementById("booking-contact-form");
    if (!form || !state.booking) return;
    syncBookingForm(form);
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const booking = state.booking;
    if (!booking.agree) {
      showToast("请先勾选信息使用同意项。");
      return;
    }
    if (!booking.date || !booking.slot) {
      showToast("预约档期不完整，请返回上一步选择。");
      booking.step = 1;
      renderOverlay();
      return;
    }

    const doctor = booking.doctorId === "recommend" ? null : doctorById(booking.doctorId);
    const slot = slotById(booking.slot);
    const smsSettings = getSmsSettings();
    const appointment = {
      id: generateAppointmentId(),
      createdAt: new Date().toISOString(),
      updatedAt: "",
      status: "pending",
      demo: false,
      tier: booking.tierId,
      doctorId: doctor ? String(doctor.id) : "",
      date: booking.date,
      slot: booking.slot,
      time: slot.label,
      topic: booking.topic || defaultTopicForTier(booking.tierId),
      customTopic: booking.customTopic.trim(),
      format: booking.format,
      audience: booking.audience,
      city: booking.city,
      venue: booking.venue,
      orgType: booking.orgType,
      orgName: booking.orgName.trim(),
      contactName: booking.contactName.trim(),
      contactTitle: booking.contactTitle.trim(),
      phone: booking.phone.trim(),
      email: booking.email.trim(),
      address: booking.address.trim(),
      note: booking.note.trim(),
      sms: {
        hospital: booking.smsHospital && smsSettings.enabled,
        contact: booking.smsContact && smsSettings.enabled
      },
      reply: null
    };

    const appointments = getAppointments();
    appointments.unshift(appointment);
    saveAppointments(appointments);
    state.lastAppointment = appointment;

    if (booking.smsHospital && smsSettings.enabled && smsSettings.triggers.created) {
      addSmsLog({
        appointmentId: appointment.id,
        recipient: recipientSummary(smsSettings.recipients),
        content: `预约提交提醒 · ${appointment.orgName} · ${topicOf(appointment)}`,
        status: "已登记（演示）",
        demo: true,
        type: "created"
      });
    }

    booking.step = 4;
    renderOverlay();
  }

  function handleAdminLogin(form) {
    const username = form.elements.username.value.trim();
    const password = form.elements.password.value.trim();
    const errorEl = document.getElementById("admin-login-error");
    if (username === ADMIN_USER && password === ADMIN_PASSWORD) {
      setAdminAuthed(true);
      state.admin.tab = "appointments";
      state.admin.statusFilter = "all";
      state.admin.search = "";
      renderApp();
      showToast("已进入院方项目工作台。");
      return;
    }
    if (errorEl) {
      errorEl.classList.add("is-visible");
      errorEl.textContent = "账号或密码不正确，请使用页面下方演示账号。";
    }
  }

  function handleAdminSaveReply(statusArg) {
    const appointment = getAppointments().find((item) => item.id === state.admin.reviewId);
    const draft = state.admin.draft;
    if (!appointment || !draft) return;
    if (!draft.topic.trim()) {
      showToast("请填写确认课题。");
      return;
    }
    if (!draft.speaker.trim()) {
      showToast("请填写讲者信息。");
      return;
    }
    if (!draft.schedule.trim()) {
      showToast("请填写时间安排。");
      return;
    }

    const items = getAppointments();
    const index = items.findIndex((item) => item.id === appointment.id);
    if (index === -1) return;
    const updated = {
      ...items[index],
      reply: {
        topic: draft.topic.trim(),
        outline: draft.outline.trim(),
        agenda: draft.agenda.trim(),
        schedule: draft.schedule.trim(),
        format: draft.format,
        speaker: draft.speaker.trim(),
        contact: draft.contact.trim(),
        message: draft.message.trim(),
        updatedAt: new Date().toISOString()
      },
      updatedAt: new Date().toISOString()
    };
    if (statusArg !== "keep") updated.status = statusArg;
    items[index] = updated;
    saveAppointments(items);

    const smsSettings = getSmsSettings();
    if (
      statusArg === "confirmed" &&
      draft.sendSms !== false &&
      smsSettings.enabled &&
      smsSettings.triggers.confirmed
    ) {
      addSmsLog({
        appointmentId: updated.id,
        recipient: recipientSummary(smsSettings.recipients),
        content: `院方方案回复 · ${updated.orgName} · ${topicOf(updated)}`,
        status: "已登记（演示）",
        demo: true,
        type: "confirmed"
      });
    }

    state.admin.reviewId = null;
    state.admin.draft = null;
    closeOverlay();
    renderApp();
    const messages = {
      keep: "院方回复已保存，企业端预约详情页可查看。",
      confirmed: "预约已确认，企业端已同步活动方案。",
      needs_info: "已标记为待补充信息。",
      completed: "活动已标记完成。"
    };
    showToast(messages[statusArg] || "预约状态已更新。");
  }

  function saveSmsConfig() {
    const settings = readSmsForm();
    if (!settings.recipients.trim()) {
      showToast("请至少配置一个院方接收人。");
      return;
    }
    if (!settings.template.trim()) {
      showToast("请填写短信提醒模板。");
      return;
    }
    if (settings.enabled && !Object.values(settings.triggers).some(Boolean)) {
      showToast("请至少启用一个触发节点。");
      return;
    }
    settings.updatedAt = new Date().toISOString();
    saveSmsSettings(settings);
    const note = document.getElementById("sms-saved-note");
    if (note) note.textContent = `最后保存：${formatDateTime(settings.updatedAt)}`;
    showToast("短信提醒配置已保存（演示环境）。");
  }

  function testSms() {
    const settings = readSmsForm();
    if (!settings.enabled) {
      showToast("短信提醒当前已暂停，请先启用服务。");
      return;
    }
    if (!settings.recipients.trim()) {
      showToast("请先配置院方接收人。");
      return;
    }
    const preview = fillSmsTemplate(settings.template);
    addSmsLog({
      appointmentId: "TEST",
      recipient: recipientSummary(settings.recipients),
      content: `测试短信 · ${preview.slice(0, 36)}${preview.length > 36 ? "…" : ""}`,
      status: "测试（演示）",
      demo: true,
      type: "test"
    });
    const logList = document.getElementById("sms-log-list");
    if (logList) logList.innerHTML = renderSmsLogItems();
    showToast("测试短信已记录，演示环境未实际发送。");
  }

  function handleAction(actionEl) {
    const action = actionEl.dataset.action;
    if (action === "open-booking") {
      openBooking(actionEl.dataset.tier || "", actionEl.dataset.date || "");
      return;
    }
    if (action === "close-overlay") {
      closeOverlay();
      return;
    }
    if (action === "booking-next") {
      advanceBooking();
      return;
    }
    if (action === "booking-back") {
      if (state.booking && state.booking.step > 1) {
        state.booking.step -= 1;
        renderOverlay();
      }
      return;
    }
    if (action === "select-booking-tier") {
      const tierId = actionEl.dataset.tier;
      if (!state.booking || !TIERS[tierId]) return;
      state.booking.tierId = tierId;
      state.booking.date = "";
      state.booking.slot = "";
      state.booking.doctorId = "recommend";
      state.booking.customTopic = "";
      state.booking.topic = defaultTopicForTier(tierId);
      renderOverlay();
      return;
    }
    if (action === "select-booking-date") {
      if (!state.booking) return;
      state.booking.date = actionEl.dataset.date;
      state.booking.slot = "";
      renderOverlay();
      return;
    }
    if (action === "select-booking-slot") {
      if (!state.booking) return;
      state.booking.slot = actionEl.dataset.slot;
      renderOverlay();
      return;
    }
    if (action === "select-booking-doctor") {
      if (!state.booking) return;
      state.booking.doctorId = actionEl.dataset.doctorId || "recommend";
      if (state.booking.doctorId !== "recommend") {
        const doctor = doctorById(state.booking.doctorId);
        if (doctor?.tags?.length) state.booking.topic = doctor.tags[0];
      }
      state.booking.customTopic = "";
      renderOverlay();
      return;
    }
    if (action === "select-booking-topic") {
      if (!state.booking) return;
      state.booking.topic = actionEl.dataset.topic || "";
      state.booking.customTopic = "";
      renderOverlay();
      return;
    }
    if (action === "view-appointments") {
      navigate("#/appointments");
      return;
    }
    if (action === "open-admin-from-booking") {
      navigate("#/admin");
      return;
    }
    if (action === "nav-home") {
      navigate("#/");
      return;
    }
    if (action === "open-doctor") {
      openDoctor(actionEl.dataset.doctorId);
      return;
    }
    if (action === "book-doctor") {
      const doctor = doctorById(actionEl.dataset.doctorId);
      if (!doctor) return;
      state.booking = newBookingState(doctor.tier);
      state.booking.doctorId = String(doctor.id);
      state.booking.topic = doctor.tags[0] || state.booking.topic;
      state.overlay = { type: "booking" };
      renderOverlay();
      return;
    }
    if (action === "open-appointment") {
      openAppointment(actionEl.dataset.appointmentId);
      return;
    }
    if (action === "expert-filter") {
      state.expertFilter = actionEl.dataset.filter || "elite";
      state.expertLimit = 8;
      document.querySelectorAll(".filter-tab").forEach((tab) => {
        const active = tab.dataset.filter === state.expertFilter;
        tab.classList.toggle("is-active", active);
        tab.setAttribute("aria-selected", String(active));
      });
      const grid = document.getElementById("expert-grid-wrap");
      if (grid) grid.innerHTML = renderExpertGrid();
      return;
    }
    if (action === "expert-more") {
      state.expertLimit += 8;
      const grid = document.getElementById("expert-grid-wrap");
      if (grid) grid.innerHTML = renderExpertGrid();
      return;
    }
    if (action === "admin-tab") {
      state.admin.tab = actionEl.dataset.tab === "sms" ? "sms" : "appointments";
      state.admin.search = "";
      renderApp();
      window.scrollTo(0, 0);
      return;
    }
    if (action === "admin-filter") {
      state.admin.statusFilter = actionEl.dataset.status || "all";
      document.querySelectorAll(".admin-filter").forEach((filter) => {
        filter.classList.toggle("is-active", filter.dataset.status === state.admin.statusFilter);
      });
      const list = document.getElementById("admin-list-body");
      if (list) list.innerHTML = renderAdminListBody();
      return;
    }
    if (action === "admin-review") {
      openAdminReview(actionEl.dataset.appointmentId);
      return;
    }
    if (action === "admin-save-reply") {
      handleAdminSaveReply(actionEl.dataset.status || "keep");
      return;
    }
    if (action === "admin-logout") {
      setAdminAuthed(false);
      closeOverlay();
      state.admin.tab = "appointments";
      state.admin.reviewId = null;
      state.admin.draft = null;
      renderApp();
      showToast("已退出院方工作台。");
      return;
    }
    if (action === "sms-save") {
      saveSmsConfig();
      return;
    }
    if (action === "sms-test") {
      testSms();
      return;
    }
    if (action === "reload-data") {
      window.location.reload();
    }
  }

  /* =========================================================
     Events
     ========================================================= */
  function registerEvents() {
    document.addEventListener("click", (event) => {
      const actionEl = event.target.closest("[data-action]");
      if (actionEl) {
        event.preventDefault();
        handleAction(actionEl);
        return;
      }
      const scrollEl = event.target.closest("[data-scroll]");
      if (scrollEl) {
        event.preventDefault();
        scrollToSection(scrollEl.dataset.scroll);
      }
    });

    document.addEventListener("input", (event) => {
      const el = event.target;
      if (el.dataset.bind && state.booking) {
        state.booking[el.dataset.bind] = el.type === "checkbox" ? el.checked : el.value;
      }
      if (el.dataset.draft && state.admin.draft) {
        state.admin.draft[el.dataset.draft] = el.type === "checkbox" ? el.checked : el.value;
      }
      if (el.dataset.smsBind) updateSmsPreview();
      if (el.id === "admin-search") {
        state.admin.search = el.value;
        const list = document.getElementById("admin-list-body");
        if (list) list.innerHTML = renderAdminListBody();
      }
    });

    document.addEventListener("change", (event) => {
      const el = event.target;
      if (el.dataset.bind && state.booking) {
        state.booking[el.dataset.bind] = el.type === "checkbox" ? el.checked : el.value;
      }
      if (el.dataset.draft && state.admin.draft) {
        state.admin.draft[el.dataset.draft] = el.type === "checkbox" ? el.checked : el.value;
      }
      if (el.dataset.smsTrigger || el.dataset.smsEnabled) updateSmsPreview();
    });

    document.addEventListener("submit", (event) => {
      if (event.target.id === "admin-login-form") {
        event.preventDefault();
        handleAdminLogin(event.target);
      }
      if (event.target.id === "booking-contact-form") {
        event.preventDefault();
        submitBooking();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && state.overlay) {
        closeOverlay();
        return;
      }
      if (event.key !== "Enter" && event.key !== " ") return;
      const actionEl = event.target.closest?.('[data-action][role="button"]');
      if (actionEl) {
        event.preventDefault();
        handleAction(actionEl);
      }
    });

    window.addEventListener("hashchange", () => {
      closeOverlay();
      renderApp();
      window.scrollTo(0, 0);
    });
  }

  /* =========================================================
     Boot / render
     ========================================================= */
  function renderLoadingScreen() {
    return `
      <div class="loading-screen">
        <div class="loading-screen__inner">
          <img class="loading-screen__logo" src="assets/logo.svg" alt="北京大学国际医院">
          <div class="loading-bar"></div>
          <span>正在准备专家资料与预约档期…</span>
        </div>
      </div>
    `;
  }

  function renderErrorScreen() {
    return `
      <div class="error-screen">
        <div class="error-screen__card">
          <span class="icon-box">${icon("info", 21)}</span>
          <h2>专家资料加载失败</h2>
          <p>请检查网络连接后重新加载页面。若在本地演示，请确认 assets/doctors.json 与页面在同一目录。</p>
          <button class="btn btn--orange" type="button" data-action="reload-data">重新加载 ${icon("arrowRight", 15)}</button>
        </div>
      </div>
    `;
  }

  function renderApp() {
    if (!app) return;
    if (state.loadError) {
      app.innerHTML = renderErrorScreen();
      return;
    }
    const view = route();
    if (view === "admin") app.innerHTML = renderAdminPage();
    else if (view === "appointments") app.innerHTML = renderAppointmentsPage();
    else app.innerHTML = renderHomePage();
  }

  async function boot() {
    registerEvents();
    if (app) app.innerHTML = renderLoadingScreen();
    try {
      const response = await fetch("assets/doctors.json", { cache: "no-store" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      state.doctors = Array.isArray(data) ? data : data.doctors || [];
      state.loaded = true;
      ensureSeedData();
      renderApp();
    } catch (error) {
      state.loadError = true;
      renderApp();
    }
  }

  boot();
})();

