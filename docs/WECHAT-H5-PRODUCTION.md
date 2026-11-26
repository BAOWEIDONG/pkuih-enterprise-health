# 微信浏览器生产接入说明

适用范围：企业机构 H5、院方工作台在微信内置浏览器中的正式部署。

本项目不绑定微信公众号，不依赖微信授权，不使用 JS-SDK。分享仅使用微信右上角原生菜单，手机号登录由平台自己的后端完成。

## 1. 部署边界

- H5 与 API 建议使用同一主域，通过反向代理提供 `/api`，例如 `https://health.example.com/` 与 `https://health.example.com/api/v1`。
- 不要依赖第三方 Cookie。微信 iOS 和部分 Android 版本会限制跨站 Cookie，可能导致登录成功但后续请求变成未登录。
- 必须使用 HTTPS。定位、剪贴板和部分文件能力在非 HTTPS 环境会失败。
- Session Cookie 建议配置：

```text
HttpOnly: true
Secure: true
SameSite: Lax
Path: /
```

同域部署使用 `SESSION_COOKIE_SECURE=true`、`SESSION_COOKIE_SAME_SITE=lax`。

## 2. 登录与会话

- 不使用微信 OAuth、OpenID、UnionID 或公众号授权。
- 机构账号使用手机号白名单验证码登录。
- 不把长期 token 写入 `localStorage`；Cookie 模式由服务端 HttpOnly Cookie 保存会话。
- 微信内返回前台时调用 `/auth/session` 恢复登录态；接口返回 401 时清理前端会话并回到登录页。
- 停用账号必须由服务端即时拒绝，不能只依赖前端隐藏入口。

## 3. 分享

没有公众号和 JS-SDK 时：

- 无法自定义微信分享标题、描述、缩略图和分享回调。
- 无法获取分享是否成功、分享人 openid 等数据。
- 只能引导用户点击右上角“…”使用微信原生分享。
- 页面应提供可被微信抓取的 `og:title`、`og:description`、`og:image`，但最终展示由微信决定。

如果未来接入公众号，再由后端提供 JS-SDK 签名接口，不在当前 V1 中预留前端假实现。

## 4. 定位

- 微信定位依赖 HTTPS、系统权限和用户授权。
- 用户拒绝授权或定位超时时，必须回退到手动选择城市。
- 不能因为定位失败阻止预约；就近医院仅作为排序和推荐条件。
- 经纬度只用于距离计算，不能作为权限或机构归属依据。

## 5. 文件与附件

- 上传使用标准 `<input type="file">`，限制 PDF、PPT、PPTX 和图片，大小不超过 20MB。
- PDF 使用后端短时签名 HTTPS 地址打开，便于微信内置浏览器预览。
- PPT/PPTX 微信通常不能直接预览，必须提示下载后使用 WPS 或 PowerPoint 打开。
- 不使用 `blob:` 下载作为生产方案；微信清理 WebView 后 Blob URL 会失效。
- 文件权限必须由后端校验预约归属，签名 URL 设置短有效期。

## 6. 交互兼容

- 保留 Android 微信右滑/系统返回的页面历史层级。
- 弹层支持下滑关闭，并同步更新历史栈。
- 页面返回、筛选切换、关闭弹层后恢复原滚动位置。
- iOS 使用 `env(safe-area-inset-bottom)` 处理底部安全区。
- 底部固定按钮不能遮挡内容；输入框聚焦时要考虑键盘顶起。
- 电话号码使用 `tel:` 链接，由微信交给系统拨号。
- 复制推送内容必须提供 `navigator.clipboard` 失败后的 `execCommand("copy")` 兜底。

## 7. 缓存与发布

- `index.html` 不缓存 HTML 中的旧构建引用；Vite 产物使用内容哈希。
- API 请求使用 `cache: no-store`，避免微信 WebView 缓存登录态和列表数据。
- 发布后让用户重新进入页面即可加载新哈希资源，不依赖强制清缓存。
- 静态资源继续走 HTTPS CDN 或 GitHub Pages；后端接口不要部署在无 HTTPS 的内网地址。

## 8. 验收矩阵

上线前至少覆盖：

| 场景 | iOS 微信 | Android 微信 |
|---|---|---|
| 手机号验证码登录、刷新后保持登录 | 必测 | 必测 |
| 停用账号旧会话失效 | 必测 | 必测 |
| 首页定位成功/拒绝/超时回退 | 必测 | 必测 |
| 专家筛选、返回保留滚动位置 | 必测 | 必测 |
| 预约提交、重复点击、弱网重试 | 必测 | 必测 |
| 方案确认、取消、申请修改 | 必测 | 必测 |
| PDF 打开、PPT 下载提示 | 必测 | 必测 |
| 电话拨打、复制推送内容 | 必测 | 必测 |
| 微信原生分享菜单 | 必测 | 必测 |

## 9. 前端接入约定

`PkuihApi.platform` 提供：

- `isWeChat`
- `wechatVersion`
- `isIOS`
- `isAndroid`

请求自动携带 `X-Client-Platform: wechat|browser`；微信环境额外携带 `X-WeChat-Version`，便于后端日志和问题定位。
