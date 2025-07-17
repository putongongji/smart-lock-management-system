# 智能锁管理系统

一个基于 React 和 Arco Design 的智能锁设备管理平台，提供设备型号、主板、固件的统一管理和监控。

## 功能特性

### 🎯 核心功能
- **设备身份管理** - 统一管理智能锁设备信息，实现"一设备一身份一档案"
- **兼容性矩阵** - 管理设备型号、主板、固件之间的兼容关系
- **智能固件分发** - 支持灰度发布、全量发布、紧急发布等多种策略
- **变更管理** - 标准化的变更申请、审批、执行流程
- **实时监控告警** - 全方位监控系统健康状态，智能告警

### 📊 仪表盘
- 设备总数、在线率、固件版本统计
- 设备状态趋势图表
- 系统健康度监控
- 最近设备活动记录

### 🔧 设备管理
- 设备信息查看和编辑
- 多维度搜索和筛选
- 设备详情展示（硬件信息、固件版本、支持功能等）
- 设备同步状态管理

### 🔗 兼容性矩阵
- 型号-主板兼容性管理
- 主板-固件兼容性管理
- 兼容性测试状态跟踪
- 性能表现评估

### 📦 固件管理
- 固件版本上传和管理
- 多种部署策略（灰度、全量、紧急）
- 部署任务监控
- 固件回滚机制

### 📋 变更管理
- 变更请求创建和审批
- 变更流程可视化
- 风险评估和影响分析
- 变更历史追踪

### 🚨 监控告警
- 实时系统指标监控
- 多级别告警管理
- 告警确认和处理流程
- 告警趋势分析

## 技术栈

- **前端框架**: React 18
- **UI 组件库**: Arco Design
- **构建工具**: Vite
- **图表库**: ECharts
- **路由**: React Router
- **HTTP 客户端**: Axios
- **日期处理**: Day.js

## 快速开始

### 环境要求
- Node.js >= 16.0.0
- npm >= 8.0.0 或 yarn >= 1.22.0

### 安装依赖
```bash
npm install
# 或
yarn install
```

### 启动开发服务器
```bash
npm run dev
# 或
yarn dev
```

访问 http://localhost:3000 查看应用

### 构建生产版本
```bash
npm run build
# 或
yarn build
```

### 预览生产版本
```bash
npm run preview
# 或
yarn preview
```

## 项目结构

```
smart-lock-management-system/
├── public/                 # 静态资源
├── src/
│   ├── components/         # 公共组件
│   ├── pages/             # 页面组件
│   │   ├── Dashboard.jsx          # 仪表盘
│   │   ├── DeviceManagement.jsx   # 设备管理
│   │   ├── CompatibilityMatrix.jsx # 兼容性矩阵
│   │   ├── FirmwareManagement.jsx # 固件管理
│   │   ├── ChangeManagement.jsx   # 变更管理
│   │   └── MonitoringAlerts.jsx   # 监控告警
│   ├── utils/             # 工具函数
│   ├── services/          # API 服务
│   ├── App.jsx           # 主应用组件
│   ├── main.jsx          # 应用入口
│   └── index.css         # 全局样式
├── index.html            # HTML 模板
├── package.json          # 项目配置
├── vite.config.js        # Vite 配置
└── README.md            # 项目说明
```

## 核心业务流程

### 设备管理流程
1. 设备信息录入和身份建立
2. 实时状态同步和监控
3. 设备配置管理和更新
4. 故障处理和维护记录

### 固件发布流程
1. 固件上传和版本管理
2. 兼容性验证和测试
3. 发布策略配置
4. 分阶段部署执行
5. 监控和回滚机制

### 变更管理流程
1. 变更请求提交
2. 技术审核和风险评估
3. 变更批准和计划
4. 变更执行和监控
5. 变更验证和关闭

## 系统架构

### 前端架构
- **组件化设计**: 基于 React 函数组件和 Hooks
- **状态管理**: 使用 React 内置状态管理
- **路由管理**: React Router 实现单页应用
- **UI 一致性**: 统一使用 Arco Design 组件库

### 数据流
- **API 调用**: 通过 Axios 与后端服务通信
- **状态同步**: 实时更新设备状态和监控数据
- **缓存策略**: 合理缓存静态数据，减少网络请求

## 开发指南

### 代码规范
- 使用 ES6+ 语法
- 组件采用函数式编程
- 遵循 React Hooks 最佳实践
- 保持代码简洁和可读性

### 组件开发
- 每个页面对应一个独立组件
- 公共逻辑抽取为自定义 Hook
- 合理使用 Arco Design 组件
- 注意组件的可复用性

### 样式管理
- 使用 CSS 模块化
- 遵循 BEM 命名规范
- 响应式设计适配
- 保持视觉一致性

## 部署说明

### GitHub Pages 自动部署
本项目已配置 GitHub Actions 自动部署到 GitHub Pages。

当代码推送到 `main` 分支时，会自动触发构建和部署流程：
1. 安装依赖
2. 构建生产版本
3. 部署到 GitHub Pages

部署后可通过以下地址访问：
`https://[username].github.io/smart-lock-management-system/`

### 开发环境
- 使用 Vite 开发服务器
- 支持热重载和快速刷新
- 开发工具集成

### 生产环境
- 静态文件部署
- CDN 加速优化
- 缓存策略配置
- 监控和日志收集

## 贡献指南

1. Fork 项目仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 联系方式

- 项目维护者: Smart Lock Team
- 邮箱: support@smartlock.com
- 项目地址: https://github.com/smartlock/management-system

## 更新日志

### v1.0.0 (2024-01-15)
- 🎉 初始版本发布
- ✨ 完整的设备管理功能
- ✨ 兼容性矩阵管理
- ✨ 固件分发系统
- ✨ 变更管理流程
- ✨ 监控告警系统
- 🎨 基于 Arco Design 的现代化 UI
- 📱 响应式设计支持