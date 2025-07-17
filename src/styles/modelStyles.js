// 通用样式常量
export const commonStyles = {
  // 卡片样式
  card: {
    borderRadius: '12px',
    border: '1px solid var(--color-border-light)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
  },

  // 按钮样式
  button: {
    height: '36px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: 500
  },

  primaryButton: {
    height: '36px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: 500,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: 'none'
  },

  // 标题样式
  title: {
    fontSize: '17px',
    fontWeight: 600,
    color: 'var(--color-text-primary)',
    marginBottom: '20px',
    letterSpacing: '-0.01em',
    lineHeight: '1.3'
  },

  sectionTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--color-text-primary)',
    letterSpacing: '-0.01em'
  },

  // 标签样式
  tag: {
    marginBottom: 0,
    borderRadius: '6px',
    fontSize: '12px',
    border: 'none',
    fontWeight: 500,
    padding: '2px 8px',
    height: '24px',
    lineHeight: '20px'
  },

  // 代码样式
  code: {
    background: 'var(--color-background-secondary)',
    padding: '4px 8px',
    borderRadius: '6px',
    fontSize: '13px',
    fontFamily: 'var(--font-mono)',
    color: 'var(--color-text-primary)',
    border: '1px solid var(--color-border-light)'
  },

  // 信息框样式
  infoBox: {
    background: 'var(--color-background-secondary)',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid var(--color-border-light)'
  },

  // 模组卡片样式
  moduleCard: {
    background: 'var(--color-background-secondary)',
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid var(--color-border-light)',
    minWidth: '120px'
  },

  // 分割线样式
  divider: {
    margin: '20px 0',
    borderColor: 'var(--color-border-light)'
  },

  // 容器样式
  container: {
    marginBottom: '20px'
  },

  flexContainer: {
    marginTop: '8px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px'
  },

  tagContainer: {
    marginTop: '8px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px'
  },

  // 表单样式
  formItem: {
    marginBottom: '16px'
  },

  input: {
    height: '36px',
    borderRadius: '8px',
    fontSize: '13px'
  },

  // 侧边栏样式
  sidebar: {
    padding: '4px 0'
  },

  // 描述列表样式
  descriptions: {
    marginBottom: '20px'
  },

  // 文本样式
  secondaryText: {
    fontSize: '13px',
    color: 'var(--color-text-secondary)'
  },

  // 状态指示样式
  statusIndicator: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px'
  },

  // 更新日志样式
  changelog: {
    marginTop: '8px',
    background: 'var(--color-background-secondary)',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid var(--color-border-light)',
    fontSize: '13px',
    whiteSpace: 'pre-line',
    color: 'var(--color-text-secondary)',
    lineHeight: '1.5'
  }
};

// 颜色常量
export const colors = {
  blue: 'blue',
  green: 'green',
  red: 'red',
  orange: 'orange',
  purple: 'purple',
  gray: 'gray'
};

// 状态颜色映射
export const statusColors = {
  active: 'green',
  development: 'orange',
  deprecated: 'red',
  production: 'green',
  testing: 'orange'
};

// 场景颜色映射
export const scenarioColors = {
  '公租房': 'red',
  '网约房': 'orange',
  '家庭': 'green',
  '办公室': 'blue',
  '高端家庭': 'purple'
};