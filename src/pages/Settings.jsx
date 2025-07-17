import React, { useState } from 'react'
import { Card, Form, Input, Select, Switch, Button, Space, message, Divider, InputNumber } from 'antd'
import { SaveOutlined, ReloadOutlined } from '@ant-design/icons'

const { Option } = Select
const { TextArea } = Input

function Settings() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const [settings, setSettings] = useState({
    // 系统设置
    systemName: '智能锁管理系统',
    systemVersion: '1.0.0',
    timezone: 'Asia/Shanghai',
    language: 'zh-CN',
    
    // 安全设置
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    passwordMinLength: 8,
    enableTwoFactor: false,
    
    // 通知设置
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    notificationEmail: 'admin@example.com',
    
    // 设备设置
    autoLockTimeout: 10,
    maxDevices: 100,
    deviceHeartbeat: 60,
    enableRemoteControl: true,
    
    // 日志设置
    logRetentionDays: 90,
    enableDetailedLogging: true,
    logLevel: 'info',
    
    // 备份设置
    autoBackup: true,
    backupInterval: 'daily',
    backupRetention: 30,
    backupLocation: '/backup/smart-lock'
  })

  const handleSave = () => {
    form.validateFields().then((values) => {
      setLoading(true)
      
      // 模拟保存操作
      setTimeout(() => {
        setSettings({ ...settings, ...values })
        setLoading(false)
        message.success('设置保存成功')
      }, 1000)
    }).catch(() => {
      message.error('请检查输入内容')
    })
  }

  const handleReset = () => {
    form.setFieldsValue(settings)
    message.info('已重置为当前保存的设置')
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">系统设置</h1>
        <p className="page-description">配置系统参数和功能选项</p>
      </div>

      <Form
        form={form}
        layout="vertical"
        initialValues={settings}
        style={{ maxWidth: 800 }}
        className="settings-form"
      >
        {/* 系统设置 */}
        <Card 
          title={
            <span style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>
              系统设置
            </span>
          }
          className="linear-card" 
          style={{ marginBottom: 'var(--spacing-md)' }}
        >
          <Form.Item
            label={<span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>系统名称</span>}
            name="systemName"
            rules={[{ required: true, message: '请输入系统名称' }]}
          >
            <Input 
              placeholder="请输入系统名称" 
              style={{
                height: '36px',
                borderRadius: 'var(--border-radius)',
                fontSize: '13px'
              }}
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>系统版本</span>}
            name="systemVersion"
          >
            <Input 
              placeholder="请输入系统版本" 
              disabled 
              style={{
                height: '36px',
                borderRadius: 'var(--border-radius)',
                fontSize: '13px',
                fontFamily: 'var(--font-mono)'
              }}
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>时区</span>}
            name="timezone"
            rules={[{ required: true, message: '请选择时区' }]}
          >
            <Select 
              placeholder="请选择时区"
              style={{
                height: '36px',
                borderRadius: 'var(--border-radius)',
                fontSize: '13px'
              }}
            >
              <Option value="Asia/Shanghai">Asia/Shanghai (UTC+8)</Option>
              <Option value="Asia/Tokyo">Asia/Tokyo (UTC+9)</Option>
              <Option value="America/New_York">America/New_York (UTC-5)</Option>
              <Option value="Europe/London">Europe/London (UTC+0)</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label={<span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>语言</span>}
            name="language"
            rules={[{ required: true, message: '请选择语言' }]}
          >
            <Select 
              placeholder="请选择语言"
              style={{
                height: '36px',
                borderRadius: 'var(--border-radius)',
                fontSize: '13px'
              }}
            >
              <Option value="zh-CN">简体中文</Option>
              <Option value="en-US">English</Option>
              <Option value="ja-JP">日本語</Option>
            </Select>
          </Form.Item>
        </Card>

        {/* 安全设置 */}
        <Card 
          title={
            <span style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>
              安全设置
            </span>
          }
          className="linear-card" 
          style={{ marginBottom: 'var(--spacing-md)' }}
        >
          <Form.Item
            label={<span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>会话超时时间（分钟）</span>}
            name="sessionTimeout"
            rules={[{ required: true, message: '请输入会话超时时间' }]}
          >
            <InputNumber 
              min={5} 
              max={480} 
              style={{ 
                width: '100%',
                height: '36px',
                borderRadius: 'var(--border-radius)',
                fontSize: '13px'
              }} 
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>最大登录尝试次数</span>}
            name="maxLoginAttempts"
            rules={[{ required: true, message: '请输入最大登录尝试次数' }]}
          >
            <InputNumber 
              min={3} 
              max={10} 
              style={{ 
                width: '100%',
                height: '36px',
                borderRadius: 'var(--border-radius)',
                fontSize: '13px'
              }} 
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>密码最小长度</span>}
            name="passwordMinLength"
            rules={[{ required: true, message: '请输入密码最小长度' }]}
          >
            <InputNumber 
              min={6} 
              max={20} 
              style={{ 
                width: '100%',
                height: '36px',
                borderRadius: 'var(--border-radius)',
                fontSize: '13px'
              }} 
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>启用双因素认证</span>}
            name="enableTwoFactor"
            valuePropName="checked"
          >
            <Switch className="linear-switch" />
          </Form.Item>
        </Card>

        {/* 通知设置 */}
        <Card 
          title={
            <span style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>
              通知设置
            </span>
          }
          className="linear-card" 
          style={{ marginBottom: 'var(--spacing-md)' }}
        >
          <Form.Item
            label={<span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>邮件通知</span>}
            name="emailNotifications"
            valuePropName="checked"
          >
            <Switch className="linear-switch" />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>短信通知</span>}
            name="smsNotifications"
            valuePropName="checked"
          >
            <Switch className="linear-switch" />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>推送通知</span>}
            name="pushNotifications"
            valuePropName="checked"
          >
            <Switch className="linear-switch" />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>通知邮箱</span>}
            name="notificationEmail"
            rules={[
              { required: true, message: '请输入通知邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' }
            ]}
          >
            <Input 
              placeholder="请输入通知邮箱" 
              style={{
                height: '36px',
                borderRadius: 'var(--border-radius)',
                fontSize: '13px'
              }}
            />
          </Form.Item>
        </Card>

        {/* 设备设置 */}
        <Card 
          title={
            <span style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>
              设备设置
            </span>
          }
          className="linear-card" 
          style={{ marginBottom: 'var(--spacing-md)' }}
        >
          <Form.Item
            label={<span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>自动锁定超时时间（秒）</span>}
            name="autoLockTimeout"
            rules={[{ required: true, message: '请输入自动锁定超时时间' }]}
          >
            <InputNumber 
              min={5} 
              max={300} 
              style={{ 
                width: '100%',
                height: '36px',
                borderRadius: 'var(--border-radius)',
                fontSize: '13px'
              }} 
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>最大设备数量</span>}
            name="maxDevices"
            rules={[{ required: true, message: '请输入最大设备数量' }]}
          >
            <InputNumber 
              min={1} 
              max={1000} 
              style={{ 
                width: '100%',
                height: '36px',
                borderRadius: 'var(--border-radius)',
                fontSize: '13px'
              }} 
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>设备心跳间隔（秒）</span>}
            name="deviceHeartbeat"
            rules={[{ required: true, message: '请输入设备心跳间隔' }]}
          >
            <InputNumber 
              min={30} 
              max={300} 
              style={{ 
                width: '100%',
                height: '36px',
                borderRadius: 'var(--border-radius)',
                fontSize: '13px'
              }} 
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>启用远程控制</span>}
            name="enableRemoteControl"
            valuePropName="checked"
          >
            <Switch className="linear-switch" />
          </Form.Item>
        </Card>

        {/* 日志设置 */}
        <Card 
          title={
            <span style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>
              日志设置
            </span>
          }
          className="linear-card" 
          style={{ marginBottom: 'var(--spacing-md)' }}
        >
          <Form.Item
            label={<span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>日志保留天数</span>}
            name="logRetentionDays"
            rules={[{ required: true, message: '请输入日志保留天数' }]}
          >
            <InputNumber 
              min={7} 
              max={365} 
              style={{ 
                width: '100%',
                height: '36px',
                borderRadius: 'var(--border-radius)',
                fontSize: '13px'
              }} 
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>启用详细日志</span>}
            name="enableDetailedLogging"
            valuePropName="checked"
          >
            <Switch className="linear-switch" />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>日志级别</span>}
            name="logLevel"
            rules={[{ required: true, message: '请选择日志级别' }]}
          >
            <Select 
              placeholder="请选择日志级别"
              style={{
                height: '36px',
                borderRadius: 'var(--border-radius)',
                fontSize: '13px'
              }}
            >
              <Option value="error">Error</Option>
              <Option value="warn">Warning</Option>
              <Option value="info">Info</Option>
              <Option value="debug">Debug</Option>
            </Select>
          </Form.Item>
        </Card>

        {/* 备份设置 */}
        <Card 
          title={
            <span style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>
              备份设置
            </span>
          }
          className="linear-card" 
          style={{ marginBottom: 'var(--spacing-md)' }}
        >
          <Form.Item
            label={<span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>自动备份</span>}
            name="autoBackup"
            valuePropName="checked"
          >
            <Switch className="linear-switch" />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>备份间隔</span>}
            name="backupInterval"
            rules={[{ required: true, message: '请选择备份间隔' }]}
          >
            <Select 
              placeholder="请选择备份间隔"
              style={{
                height: '36px',
                borderRadius: 'var(--border-radius)',
                fontSize: '13px'
              }}
            >
              <Option value="hourly">每小时</Option>
              <Option value="daily">每天</Option>
              <Option value="weekly">每周</Option>
              <Option value="monthly">每月</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label={<span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>备份保留天数</span>}
            name="backupRetention"
            rules={[{ required: true, message: '请输入备份保留天数' }]}
          >
            <InputNumber 
              min={7} 
              max={365} 
              style={{ 
                width: '100%',
                height: '36px',
                borderRadius: 'var(--border-radius)',
                fontSize: '13px'
              }} 
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>备份位置</span>}
            name="backupLocation"
            rules={[{ required: true, message: '请输入备份位置' }]}
          >
            <Input 
              placeholder="请输入备份位置" 
              style={{
                height: '36px',
                borderRadius: 'var(--border-radius)',
                fontSize: '13px',
                fontFamily: 'var(--font-mono)'
              }}
            />
          </Form.Item>
        </Card>

        <Divider style={{ margin: 'var(--spacing-lg) 0' }} />
        
        <Space>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            loading={loading}
            onClick={handleSave}
            className="linear-button-primary"
            style={{
              height: '36px',
              borderRadius: 'var(--border-radius)',
              fontSize: '13px',
              fontWeight: 500
            }}
          >
            保存设置
          </Button>
          <Button
            icon={<ReloadOutlined />}
            onClick={handleReset}
            className="linear-button-secondary"
            style={{
              height: '36px',
              borderRadius: 'var(--border-radius)',
              fontSize: '13px',
              fontWeight: 500
            }}
          >
            重置
          </Button>
        </Space>
      </Form>
    </div>
  )
}

export default Settings