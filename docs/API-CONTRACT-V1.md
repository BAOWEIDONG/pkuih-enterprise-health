# 名医入企平台前端/后端接口契约 V1

版本基线：`20261126-9`

适用范围：企业机构 H5、医院运营工作台、超级管理员后台

接口前缀：`/api/v1`

## 1. 通用规范

### 1.1 传输与编码

- 请求和响应统一使用 `application/json; charset=utf-8`。
- 日期使用 `YYYY-MM-DD`，时间戳使用带时区的 ISO 8601 字符串。
- 业务时区固定为 `Asia/Shanghai`。
- 资源 ID 统一使用字符串，前端不得依赖数字自增结构。
- 城市与省份使用平台标准化名称，不使用行政区划自由文本。

### 1.2 请求头

| 请求头 | 必填 | 说明 |
|---|---:|---|
| `Authorization` | Bearer 模式必填 | `Bearer <token>`；Cookie 模式由 HttpOnly Cookie 携带 |
| `X-Request-Id` | 是 | 前端每次请求生成，用于链路追踪 |
| `X-Client-Version` | 是 | 前端构建版本，例如 `20261126-9` |
| `Idempotency-Key` | 写操作建议必填 | 防止重复提交、重复生成预约 |
| `X-XSRF-TOKEN` | Cookie 模式写操作必填 | 从 `XSRF-TOKEN` Cookie 或 `/auth/csrf` 获取 |
| `Content-Type` | JSON/表单上传时必填 | JSON 或 `multipart/form-data` |

### 1.2.1 Cookie 模式 CSRF

前后端同域部署时，所有请求必须携带 `credentials: "include"`。首次写操作前调用：

| 方法 | 路径 | 说明 |
|---|---|---|
| GET | `/auth/csrf` | 返回 `{ "token": "..." }`，同时下发 `XSRF-TOKEN` Cookie |

客户端把 token 放入 `X-XSRF-TOKEN` 请求头。服务端返回 403 时，客户端只允许清空 token、重新获取并重试一次，禁止无限重试。登录、退出、预约、号源、专家、提需等所有 `POST/PUT/PATCH/DELETE` 均适用。

跨域部署时必须使用 HTTPS，并设置 Cookie `SameSite=None; Secure`；更推荐通过同域反向代理提供 `/api`，避免第三方 Cookie 被微信或浏览器拦截。

### 1.3 统一响应包

成功：

```json
{
  "code": 0,
  "message": "ok",
  "data": {},
  "requestId": "8f4c2f16-..."
}
```

失败：

```json
{
  "code": "SLOT_CAPACITY_EXCEEDED",
  "message": "该专家当日号源已满。",
  "details": {
    "doctorId": "expert-001",
    "date": "2027-09-22"
  },
  "requestId": "8f4c2f16-..."
}
```

约定：

- `code` 为 `0` 或字符串错误码；错误码一旦发布不得随意改名。
- `message` 面向用户，可直接展示；技术细节放 `details`。
- HTTP 401 表示登录失效；HTTP 403 表示已登录但无权限。
- 列表接口返回 `{ items, total, page, pageSize }`。
- 写接口必须返回服务端最终资源和最新版本号，前端不得只依赖本地乐观结果。

### 1.4 标准错误码

| 错误码 | HTTP | 场景 |
|---|---:|---|
| `AUTH_REQUIRED` | 401 | 未登录或 token 失效 |
| `ACCOUNT_DISABLED` | 403 | 机构白名单停用或院方账号停用 |
| `FORBIDDEN` | 403 | 越权访问其他医院数据 |
| `PROFILE_INCOMPLETE` | 422 | 机构资料未补全，通知邮箱缺失等 |
| `VALIDATION_ERROR` | 422 | 字段校验失败 |
| `EXPERT_NOT_FOUND` | 404 | 专家不存在或已下架 |
| `SLOT_NOT_AVAILABLE` | 409 | 专家当日号源不足 |
| `SLOT_CAPACITY_BELOW_BOOKED` | 409 | 批量号源低于已预约数量 |
| `APPOINTMENT_STATE_CONFLICT` | 409 | 预约状态不允许当前操作 |
| `DEMAND_STATE_CONFLICT` | 409 | 提需状态不允许当前操作 |
| `DEMAND_ALREADY_CONVERTED` | 409 | 提需已生成预约，不能重复提交 |
| `DEMAND_MATCH_STALE` | 409 | 提需匹配信息已被院方更新 |
| `DUPLICATE_REQUEST` | 409 | 幂等键重复且请求内容不一致 |
| `FILE_TOO_LARGE` | 413 | 附件超过 20MB |
| `FILE_TYPE_UNSUPPORTED` | 422 | 非 PDF/PPT/PPTX 或图片格式 |
| `REQUEST_CANCELLED` | 0 | 调用方主动取消请求 |
| `REQUEST_TIMEOUT` | 504 | 网关超时 |
| `NETWORK_ERROR` | 0 | 前端网络层错误，无 HTTP 响应 |

## 2. 身份认证与权限

### 2.1 机构登录

机构不使用公开注册。超级管理员先维护手机号白名单，机构人员使用手机号验证码登录。

| 方法 | 路径 | 说明 |
|---|---|---|
| POST | `/auth/institution/sms-code` | 发送登录验证码 |
| POST | `/auth/institution/login` | 验证码登录 |
| GET | `/auth/session` | 恢复登录态 |
| GET | `/auth/csrf` | 获取 CSRF Token |
| POST | `/auth/logout` | 退出登录 |

发送验证码请求：

```json
{ "phone": "13800000001" }
```

登录请求：

```json
{
  "phone": "13800000001",
  "code": "123456",
  "profile": {
    "name": "王经理",
    "orgName": "示例保险有限公司",
    "orgType": "保险公司",
    "title": "客户健康负责人",
    "contactPhone": "13800000001",
    "email": "wang@example.com"
  }
}
```

服务端必须执行：

1. 手机号存在、白名单启用。
2. 验证码一次性有效，限制发送频率、错误次数和过期时间。
3. 历史账号不得仅凭本地 token 恢复；每次会话校验账号启用状态。
4. 机构资料不完整时返回 `PROFILE_INCOMPLETE`，不得进入预约页。
5. 通知邮箱为必填项。

### 2.2 院方登录

| 方法 | 路径 | 说明 |
|---|---|---|
| POST | `/auth/admin/login` | 用户名密码登录 |
| GET | `/auth/session` | 恢复院方或机构会话 |
| POST | `/auth/logout` | 退出 |

院方账号只允许两种角色：

| 角色 | 权限 |
|---|---|
| `superadmin` | 全部医院、账号、专家、号源、提需、方案模板、官方海报 |
| `operator` | 仅所属医院的专家、号源、预约、方案、提需 |

后端必须在每次请求中校验资源所属医院，不能只依赖前端隐藏按钮。

登录态默认由服务端通过 `HttpOnly; Secure; SameSite=Lax` Cookie 下发。H5 不把长期 token 写入 `localStorage`。只有明确采用 Bearer 模式时才允许通过配置启用，并应配合短有效期、刷新 token 轮换和退出失效。

## 3. 基础数据

### 3.1 `GET /bootstrap`

返回 H5 首屏需要的公共基础数据：

```json
{
  "experts": [],
  "hospitals": [],
  "seasonal": [],
  "themeMatches": [],
  "chinaCities": {}
}
```

字段要求：

- `experts`、`hospitals` 不得为空。
- `seasonal` 为 12 个月时令主题元数据。
- `themeMatches` 为「科室/病种、讲座主题、医院、医生、职称、时令月份、履约地」的关联数据。
- `chinaCities` 为省市级联数据。
- 接口应支持 ETag 或 `If-None-Match`，减少冷启动流量。

## 4. 医院

### 4.1 `GET /hospitals`

返回医院列表，至少包含：

```json
{
  "id": "pkuih",
  "name": "北京大学国际医院",
  "shortName": "北大国际",
  "province": "北京市",
  "city": "北京市",
  "address": "北京市昌平区中关村生命科学园生命园路1号",
  "latitude": 40.1008,
  "longitude": 116.2639,
  "phone": "010-69007777",
  "active": true
}
```

### 4.2 `PATCH /admin/hospitals/:id`

仅超级管理员。可修改名称、地址、经纬度、联系电话、启用状态。

经纬度必须由管理员直接填写或由受信任地图服务回填，前端不得自行伪造。

## 5. 专家

### 5.1 专家字段契约

| 字段 | 类型 | 必填 | 说明 |
|---|---|---:|---|
| `id` | string | 是 | 专家唯一 ID |
| `name` | string | 是 | 姓名 |
| `hospitalId` | string | 是 | 履约机构 ID |
| `hospitalName` | string | 是 | 履约机构名称快照 |
| `department` | string | 是 | 科室/任职 |
| `departmentDirection` | string | 是 | 科室方向 |
| `title` | string | 是 | 职称 |
| `tier` | enum | 是 | `elite` / `director` / `specialist` |
| `services` | string[] | 是 | `讲座` / `健康咨询` / `1V1报告解读` |
| `coverageCities` | string[] | 是 | 专家日常履约城市 |
| `expertise` | string | 是 | 擅长/专业优势 |
| `biography` | string | 是 | 简介/履历 |
| `leadDays` | number | 是 | 预约提前期，大咖 ≥30、主任 ≥14、专业 ≥7 |
| `avatarUrl` | string | 否 | 无照片时前端使用中性医疗头像 |
| `officialUrl` | string | 否 | 仅官网存在专家详情页时返回 |
| `active` | boolean | 是 | 是否在机构端显示 |
| `createdAt` | datetime | 是 | 创建时间 |
| `updatedAt` | datetime | 是 | 更新时间 |

### 5.2 专家接口

| 方法 | 路径 | 权限 | 说明 |
|---|---|---|---|
| GET | `/experts` | 已登录 | 按医院、服务、城市、月份、科室、可约状态筛选 |
| POST | `/experts` | 院方 | 新增本院专家 |
| PATCH | `/experts/:id` | 院方 | 编辑本院专家 |
| DELETE | `/experts/:id` | 院方 | 下架本院专家 |

约束：

- 医院运营只能维护本院专家。
- 专家服务类型与履约城市由省市级联数据产生。
- `讲座`、`健康咨询`、`1V1报告解读`必须精确匹配，不使用模糊包含关系。
- 时令主题只允许服务类型为 `讲座`。
- 已绑定时令课题的主讲专家不得直接改为不可讲座或变更履约机构。

## 6. 号源

号源按专家、按自然日配置，不设时间段。

### 6.1 `GET /slots?doctorId=&from=&to=`

返回：

```json
{
  "items": [
    {
      "doctorId": "expert-001",
      "date": "2027-09-22",
      "capacity": 3,
      "booked": 1,
      "manualBooked": 1,
      "reserved": 0,
      "remaining": 2,
      "version": 17
    }
  ]
}
```

### 6.2 `PUT /slots/batch`

```json
{
  "doctorIds": ["expert-001", "expert-002"],
  "from": "2027-09-01",
  "to": "2027-09-30",
  "weekdays": [1, 2, 3, 4, 5],
  "capacity": 3,
  "versionByDoctor": {
    "expert-001": 17,
    "expert-002": 12
  }
}
```

服务端要求：

1. 只保存最终值，不接受前端循环逐日覆盖作为唯一实现。
2. `capacity` 不得低于该日已预约数量。
3. 早于专家 `leadDays` 的日期自动跳过。
4. 批量保存必须单事务完成；任意专家版本冲突时整批失败。
5. 预约与号源调整必须对同一专家、同一日期加锁或使用数据库条件更新。
6. 人工协调预约计入 `manualBooked`，不占用公开号源序号。
7. 已匹配但尚未转预约的提需日期计入 `reserved`。

## 7. 预约

### 7.1 状态机

| 状态 | 中文 | 允许操作 |
|---|---|---|
| `pending` | 待接单 | 院方接单、机构取消 |
| `planning` | 方案制作中 | 院方保存方案、机构取消 |
| `review` | 方案待确认 | 机构确认、机构申请修改 |
| `revision` | 待修改 | 院方更新方案 |
| `confirmed` | 已确认 | 院方完成活动、按规则取消 |
| `completed` | 已完成 | 只读归档 |
| `cancelled` | 已取消 | 只读归档 |

服务端必须拒绝跨状态操作，示例：

- `review` 状态不能再次接单。
- `confirmed` 不能重新提交方案。
- `cancelled` 不能确认或完成。
- 预约已确认后，机构侧不可直接改动专家、服务类型和履约日期。

### 7.2 接口

| 方法 | 路径 | 权限 | 说明 |
|---|---|---|---|
| GET | `/appointments` | 已登录 | 机构看本人；院方看所属医院 |
| POST | `/appointments` | 机构 | 创建预约 |
| GET | `/appointments/:id` | 已登录且有权访问 | 详情 |
| POST | `/appointments/:id/accept` | 院方 | 接单，项目对接人默认为当前账号 |
| PUT | `/appointments/:id/plan` | 院方 | 保存方案 |
| POST | `/appointments/:id/confirm` | 机构 | 最终确认 |
| POST | `/appointments/:id/revisions` | 机构 | 申请修改 |
| POST | `/appointments/:id/cancel` | 双方按规则 | 取消 |
| POST | `/appointments/:id/complete` | 院方 | 完成活动 |
| PATCH | `/appointments/:id/location` | 机构 | 修改活动地点 |
| PATCH | `/appointments/:id/internal-note` | 院方 | 保存内部备注 |

### 7.3 创建预约规则

创建请求必须包含：

- `serviceType`、`doctorId`、`date`、`province`、`city`、`address`
- `topic`、`audience`、`expectedCount`
- `contactName`、`contactPhone`
- `demandId`（提需转预约时）

服务端事务：

1. 校验账号白名单、资料完整性、专家与医院关系。
2. 校验服务类型是否在专家服务类型内。
3. 校验专家日常履约城市，或校验时令课题履约城市。
4. 校验日期满足专家 `leadDays`。
5. 对公开号源做容量原子扣减。
6. 提需转预约时使用人工协调号源，不要求公开号源有余量。
7. 校验提需匹配快照未变更。
8. 校验同一提需未生成其他预约。
9. 校验同一专家同一日期不存在冲突的人工协调或提需预留。
10. 写入预约、更新提需状态、写审计日志必须同事务完成。

### 7.4 幂等与并发

- 创建预约必须使用 `Idempotency-Key`。
- 同一幂等键重复提交且请求一致，返回同一预约。
- 重复提需转换返回 `DEMAND_ALREADY_CONVERTED`。
- 同一专家、同一日期的并发预约由数据库条件更新或行锁保证不超卖。
- 客户端 `localStorage` 锁只能用于演示，不作为正式库存控制手段。

### 7.5 取消与修改

- 大咖医生：活动前至少 30 天可取消或修改专家/日期。
- 主任专家、专业医生：活动前至少 7 天可取消或修改专家/日期。
- 距活动不足 7 天，活动地点锁定。
- 已完成、已取消预约不可再次取消。
- 机构申请修改后，预约进入 `revision`，院方更新方案并重新提交 `review`。

## 8. 提需

### 8.1 状态机

`pending → contacted → matched → converted`

关闭分支：

`pending/contacted/matched → closed/cancelled`

| 状态 | 说明 |
|---|---|
| `pending` | 待联系 |
| `contacted` | 院方已电话或线下联系 |
| `matched` | 已匹配专家和履约日期，日期被预留 |
| `converted` | 机构已基于匹配信息生成预约 |
| `closed` | 需求关闭 |
| `cancelled` | 需求取消 |

### 8.2 接口

| 方法 | 路径 | 权限 | 说明 |
|---|---|---|---|
| GET | `/demands` | 院方 | 本院需求；集团企康办仅超级管理员可见 |
| POST | `/demands` | 机构 | 发起提需 |
| GET | `/demands/:id` | 已登录且有权访问 | 详情 |
| POST | `/demands/:id/contact` | 院方 | 标记已联系 |
| POST | `/demands/:id/match` | 院方 | 匹配专家、日期、服务 |
| POST | `/demands/:id/close` | 院方 | 关闭 |

匹配请求：

```json
{
  "doctorId": "expert-001",
  "date": "2027-09-22",
  "serviceType": "健康咨询",
  "note": "已与客户电话确认人数与场地"
}
```

约束：

- 已匹配日期必须写入号源预留，避免被公开预约占用。
- 匹配时如专家同日已有预约或预留，必须返回 `DEMAND_STATE_CONFLICT`。
- 机构将提需转为预约后，提需进入 `converted` 并关联 `convertedAppointmentId`。
- 匹配后如院方修改医院、专家、日期、服务类型，原机构确认信息失效，需重新确认。
- 集团企康办提需只进入超级管理员需求池，不自动派给具体医院运营。

## 9. 时令主题

| 方法 | 路径 | 权限 | 说明 |
|---|---|---|---|
| GET | `/themes?hospitalId=&month=&city=` | 已登录 | 当月主题和课题 |
| PUT | `/admin/hospitals/:hospitalId/themes/:month` | 院方 | 配置本院月度主题 |

约束：

- 月份为 `1-12`。
- 每月的主题、疾病重点、适合行业、课题由医院独立配置。
- 每个课题绑定一个主讲专家，专家必须具备 `讲座` 服务。
- 每个课题单独配置履约城市，使用省市级联和多选。
- 当前月份课题可预约；非当前月份只读预览，不得预约。
- 课题履约城市与专家日常履约城市是两套独立规则。

## 10. 文件上传

### 10.1 上传

`POST /files`，`multipart/form-data`：

| 字段 | 说明 |
|---|---|
| `file` | 文件本体 |
| `purpose` | `appointment-plan` / `official-poster` / `hospital-poster` |
| `appointmentId` | 方案附件时必填 |
| `hospitalId` | 医院海报时必填 |

服务端要求：

1. 方案附件仅允许 PDF、PPT、PPTX，单文件 ≤20MB。
2. 图片仅允许 JPEG、PNG、WebP，上传后生成压缩版本和缩略图。
3. 文件类型按魔数校验，不能只看扩展名。
4. 对象存储私有化，下载使用短时签名 URL。
5. 附件访问必须校验预约归属或医院归属。
6. 正式环境接入病毒扫描、内容审核和上传频率限制。

### 10.2 签名地址

`GET /files/:id/url` 返回：

```json
{
  "url": "https://...",
  "expiresAt": "2026-11-26T17:00:00+08:00",
  "fileName": "方案.pdf",
  "mimeType": "application/pdf"
}
```

微信内置浏览器可直接打开 PDF 签名地址；PPT/PPTX 提供下载入口。

## 11. 方案模板与海报

### 11.1 方案模板

- `GET /plan-templates`
- `POST /plan-templates`
- `PATCH /plan-templates/:id`
- `DELETE /plan-templates/:id`

模板字段由医院自定义，但必须包含名称、适用服务类型、场地信息结构、课题大纲、流程模板和启用状态。机构填写场地名称与详细地址，院方模板不得覆盖机构提交内容。

### 11.2 海报

- 官方海报仅超级管理员维护。
- 医院运营可以上传、下载、分享本院海报。
- 海报展示不包含项目负责人姓名和手机号。
- 二维码携带 `hospitalId`、`source` 等非敏感参数，服务端可记录扫码来源。

## 12. 通知

`GET /notifications?appointmentId=` 返回个性化通知内容：

```json
{
  "channel": "sms",
  "recipientName": "王经理",
  "recipientPhone": "13800000001",
  "content": "王经理您好，您预约的……",
  "status": "draft",
  "copiedAt": null,
  "sentAt": null,
  "sentBy": null
}
```

规则：

- 推送内容必须按机构提需人和预约联系人动态生成，不得使用统一姓名。
- 院方复制内容后才视为已推送；复制人与时间必须记录。
- 邮件通知使用机构资料中的必填通知邮箱。
- 正式短信/邮件发送应通过服务端队列并记录供应商回执。
- 前端不得直接持有短信供应商密钥。

## 13. 审计与数据安全

所有写操作必须记录：

- 操作人 ID、姓名、角色、所属医院
- 操作类型、资源类型、资源 ID
- 操作前后关键字段
- 请求 ID、IP、时间

必须执行的权限原则：

- 医院运营只能访问本院资源。
- 超级管理员可访问全部资源。
- 机构只能访问本账号预约、提需和附件。
- 后端不得信任前端传入的 `role`、`hospitalId`、`operatorName`。
- 密码使用强哈希；验证码、token、短信密钥不得写入前端代码或日志。

## 14. 前端接入约定

前端统一通过 `assets/api.js` 的 `PkuihApi` 访问基础设施：

- `PkuihApi.data.bootstrap()`：基础数据。
- `PkuihApi.storage`：当前演示模式的持久化适配器。
- `PkuihApi.http`：带超时、token、请求 ID 和错误归一化的 HTTP 客户端。
- `PkuihApi.endpoints`：本文件对应的端点清单。
- `PkuihApi.auth`：登录与会话接口。
- `PkuihApi.session`：token 生命周期。

切换正式后端时修改 `assets/config.js`：

```js
window.PKUHI_CONFIG = {
  apiMode: "api",
  apiBaseUrl: "https://api.example.com/api/v1",
  apiTimeoutMs: 15000,
  clientVersion: "20261126-9"
};
```

页面组件不得直接拼接后端 URL，不得直接读写 `localStorage`，不得自行定义响应包格式。
