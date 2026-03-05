# Nan-s-Astrology (星运启示录)

一个精美的 React 占卜应用，利用星辰的低语为你带来每日启示。

## 技术栈
- **Vite + React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Lucide React** (图标)
- **Framer Motion** (动画)
- **Google Gemini API** (智囊核心)

## 功能
- 输入生日，查看你的专属星座。
- 获取由 Gemini AI 生成的每日运势解读，包括爱情、事业、财富评分。
- 一键复制并分享你的星象寄语。
- 响应式设计，完美适配移动端。

## 本地开发指南

### 1. 克隆并安装依赖
```bash
npm install
```

### 2. 配置环境变量
在根目录下创建 `.env` 文件，并填入以下内容：
```env
GEMINI_API_KEY=你的_GEMINI_API_KEY
```

### 3. 运行开发服务器
```bash
npm run dev
```

### 4. 构建生产版本
```bash
npm run build
```

## 自动化部署

本项目集成了 **GitHub Actions** 自动部署流程。
1. 当你将代码推送到 `main` 分支时，工作流会自动触发。
2. 它将完成依赖安装、构建并自动发布到 **GitHub Pages**。

> [!NOTE]
> 如果你的 GitHub 仓库不是用户级主站（如 `<username>.github.io`），而是一个项目（如 `<username>.github.io/repo-name/`），请在 `vite.config.ts` 中根据需要配置 `base` 路径。

## 许可证
© 2026 星运启示录 · Cosmic Oracle
