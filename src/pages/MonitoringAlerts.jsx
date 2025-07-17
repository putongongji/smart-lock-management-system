import React, { useState } from 'react'
import {
  Card,
  Row,
  Col,
  Table,
  Button,
  Select,
  Space,
  Tag,
  Alert,
  Statistic,
  Progress,
  Modal,
  Form,
  Input,
  Switch,
  Tabs,
  Badge,
  Timeline,
  message,
} from 'antd'
import {
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  SettingOutlined,
  ReloadOutlined,
  SoundOutlined,
  AudioMutedOutlined,
} from '@ant-design/icons'
import ReactECharts from 'echarts-for-react'

const { Option } = Select
const { TabPane } = Tabs

function MonitoringAlerts() {
  const [activeTab, setActiveTab] = useState('overview')
  const [alertFilter, setAlertFilter] = useState('all')
  const [severityFilter, setSeverityFilter] = useState('all')
  const [configVisible, setConfigVisible] = useState(false)
  const [selectedAlert, setSelectedAlert] = useState(null)

  // 监控指标数据
  const metrics = [
    {
      title: '设备在线率',
      value: 92.6,
      unit: '%',
      trend: 'up',
      change: 1.2,
      status: 'normal',
      threshold: 90,
    },
    {
      title: '同步成功率',
      value: 97.9,
      unit: '%',
      trend: 'down',
      change: -0.3,
      status: 'normal',
      threshold: 95,
    },
    {
      title: '固件兼容性',
      value: 98.2,
      unit: '%',
      trend: 'up',
      change: 0.5,
      status: 'normal',
      threshold: 95,
    },
    {
      title: '平均响应时间',
      value: 245,
      unit: 'ms',
      trend: 'up',
      change: 15,
      status: 'warning',
      threshold: 200,
    },
  ]

  // 告警数据
  const alerts = [
    {
      id: 'ALT-2024-001',
      title: '设备离线率异常',
      severity: 'high',
      status: 'active',
      category: 'device',
      description: '过去1小时内有12台设备离线，超过阈值',
      triggerTime: '2024-01-15 14:30:25',
      acknowledgedBy: null,
      resolvedTime: null,
      affectedDevices: 12,
      source: 'device_monitor',
    },
    {
      id: 'ALT-2024-002',
      title: '固件同步失败',
      severity: 'medium',
      status: 'acknowledged',
      category: 'firmware',
      description: '设备SL-2024-003固件同步连续失败3次',
      triggerTime: '2024-01-15 13:45:10',
      acknowledgedBy: '张三',
      resolvedTime: null,
      affectedDevices: 1,
      source: 'firmware_sync',
    },
    {
      id: 'ALT-2024-003',
      title: '系统响应时间过长',
      severity: 'low',
      status: 'resolved',
      category: 'performance',
      description: 'API响应时间超过500ms持续5分钟',
      triggerTime: '2024-01-15 12:20:00',
      acknowledgedBy: '李四',
      resolvedTime: '2024-01-15 12:35:00',
      affectedDevices: 0,
      source: 'performance_monitor',
    },
    {
      id: 'ALT-2024-004',
      title: '兼容性检查失败',
      severity: 'high',
      status: 'active',
      category: 'compatibility',
      description: '新固件v2.4.0与主板ESP32-S3-V2.0兼容性检查失败',
      triggerTime: '2024-01-15 11:15:30',
      acknowledgedBy: null,
      resolvedTime: null,
      affectedDevices: 25,
      source: 'compatibility_check',
    },
  ]

  // 系统健康度数据
  const systemHealth = {
    overall: 85,
    components: [
      { name: '设备管理', health: 92, status: 'healthy' },
      { name: '固件分发', health: 88, status: 'healthy' },
      { name: '兼容性检查', health: 75, status: 'warning' },
      { name: '数据同步', health: 90, status: 'healthy' },
      { name: '监控告警', health: 95, status: 'healthy' },
    ],
  }

  const alertColumns = [
    {
      title: '告警ID',
      dataIndex: 'id',
      width: 120,
    },
    {
      title: '告警标题',
      dataIndex: 'title',
      width: 200,
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: 500 }}>{text}</div>
          <div style={{ fontSize: 12, color: '#86909c' }}>
            来源: {record.source}
          </div>
        </div>
      ),
    },
    {
      title: '严重程度',
      dataIndex: 'severity',
      width: 100,
      render: (severity) => {
        const severityMap = {
          critical: { color: 'red', text: '严重' },
          high: { color: 'orange', text: '高' },
          medium: { color: 'blue', text: '中' },
          low: { color: 'gray', text: '低' },
        }
        const config = severityMap[severity]
        return <Tag color={config.color}>{config.text}</Tag>
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: (status) => {
        const statusMap = {
          active: { color: 'red', text: '活跃', icon: <ExclamationCircleOutlined /> },
          acknowledged: { color: 'orange', text: '已确认', icon: <ClockCircleOutlined /> },
          resolved: { color: 'green', text: '已解决', icon: <CheckCircleOutlined /> },
        }
        const config = statusMap[status]
        return (
          <Tag color={config.color} icon={config.icon}>
            {config.text}
          </Tag>
        )
      },
    },
    {
      title: '触发时间',
      dataIndex: 'triggerTime',
      width: 150,
    },
    {
      title: '影响设备',
      dataIndex: 'affectedDevices',
      width: 100,
      render: (count) => count > 0 ? `${count} 台` : '-',
    },
    {
      title: '处理人',
      dataIndex: 'acknowledgedBy',
      width: 100,
      render: (person) => person || '-',
    },
    {
      title: '操作',
      width: 200,
      render: (_, record) => (
        <Space>
          {record.status === 'active' && (
            <Button
              type='text'
              size='small'
              onClick={() => handleAcknowledge(record)}
            >
              确认
            </Button>
          )}
          {record.status === 'acknowledged' && (
            <Button
              type='text'
              size='small'
              onClick={() => handleResolve(record)}
            >
              解决
            </Button>
          )}
          <Button
            type='text'
            size='small'
            icon={<AudioMutedOutlined />}
            onClick={() => handleMute(record)}
          >
            静音
          </Button>
          <Button
            type='text'
            size='small'
            onClick={() => handleViewDetail(record)}
          >
            详情
          </Button>
        </Space>
      ),
    },
  ]

  const handleAcknowledge = (alert) => {
    Message.success(`告警 ${alert.id} 已确认`)
  }

  const handleResolve = (alert) => {
    Message.success(`告警 ${alert.id} 已解决`)
  }

  const handleMute = (alert) => {
    Message.success(`告警 ${alert.id} 已静音`)
  }

  const handleViewDetail = (alert) => {
    setSelectedAlert(alert)
  }

  const filteredAlerts = alerts.filter(alert => {
    const matchesStatus = alertFilter === 'all' || alert.status === alertFilter
    const matchesSeverity = severityFilter === 'all' || alert.severity === severityFilter
    return matchesStatus && matchesSeverity
  })

  // 告警趋势图配置
  const alertTrendOption = {
    title: {
      text: '告警趋势',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['严重', '高', '中', '低'],
      bottom: 10,
    },
    xAxis: {
      type: 'category',
      data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '严重',
        type: 'line',
        data: [0, 1, 0, 2, 1, 0, 1],
        itemStyle: { color: '#f53f3f' },
      },
      {
        name: '高',
        type: 'line',
        data: [2, 3, 1, 4, 3, 2, 2],
        itemStyle: { color: '#ff7d00' },
      },
      {
        name: '中',
        type: 'line',
        data: [5, 4, 6, 3, 5, 4, 3],
        itemStyle: { color: '#165dff' },
      },
      {
        name: '低',
        type: 'line',
        data: [8, 6, 7, 5, 6, 7, 5],
        itemStyle: { color: '#86909c' },
      },
    ],
  }

  const getAlertStats = () => {
    const total = alerts.length
    const active = alerts.filter(a => a.status === 'active').length
    const acknowledged = alerts.filter(a => a.status === 'acknowledged').length
    const resolved = alerts.filter(a => a.status === 'resolved').length
    return { total, active, acknowledged, resolved }
  }

  const alertStats = getAlertStats()

  return (
    <div className='page-container'>
      <div className='page-header'>
        <h1 className='page-title'>监控告警</h1>
        <p className='page-description'>实时监控系统状态，管理告警信息</p>
      </div>

      <Card>
        <Tabs activeTab={activeTab} onChange={setActiveTab}>
          <TabPane key='overview' title='监控概览'>
            {/* 告警统计 */}
            <Alert
              type='info'
              icon={<ExclamationCircleOutlined />}
              title='告警统计'
              content={
                <Space size='large'>
                  <span>总计: {alertStats.total}</span>
                  <span style={{ color: '#f53f3f' }}>活跃: {alertStats.active}</span>
                  <span style={{ color: '#ff7d00' }}>已确认: {alertStats.acknowledged}</span>
                  <span style={{ color: '#00b42a' }}>已解决: {alertStats.resolved}</span>
                </Space>
              }
              style={{ marginBottom: 16 }}
            />

            {/* 核心指标 */}
            <Row gutter={16} style={{ marginBottom: 24 }}>
              {metrics.map((metric, index) => (
                <Col span={6} key={index}>
                  <Card>
                    <Statistic
                      title={metric.title}
                      value={metric.value}
                      suffix={metric.unit}
                      valueStyle={{
                        color: metric.status === 'warning' ? '#ff7d00' : '#00b42a',
                      }}
                    />
                    <div style={{ marginTop: 8 }}>
                      <Progress
                        percent={(metric.value / (metric.threshold * 1.2)) * 100}
                        color={metric.status === 'warning' ? '#ff7d00' : '#00b42a'}
                        size='small'
                      />
                      <div style={{ fontSize: 12, color: '#86909c', marginTop: 4 }}>
                        阈值: {metric.threshold}{metric.unit}
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>

            <Row gutter={16}>
              {/* 告警趋势 */}
              <Col span={16}>
                <Card title='告警趋势' style={{ height: 400 }}>
                  <ReactECharts option={alertTrendOption} style={{ height: '320px' }} />
                </Card>
              </Col>

              {/* 系统健康度 */}
              <Col span={8}>
                <Card title='系统健康度' style={{ height: 400 }}>
                  <div style={{ textAlign: 'center', marginBottom: 20 }}>
                    <Progress
                      type='circle'
                      percent={systemHealth.overall}
                      color={systemHealth.overall >= 90 ? '#00b42a' : systemHealth.overall >= 70 ? '#ff7d00' : '#f53f3f'}
                      size='large'
                    />
                    <div style={{ marginTop: 8, fontSize: 16, fontWeight: 500 }}>
                      整体健康度
                    </div>
                  </div>
                  <Space direction='vertical' size='small' style={{ width: '100%' }}>
                    {systemHealth.components.map((component, index) => (
                      <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>{component.name}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <Progress
                            percent={component.health}
                            color={component.status === 'healthy' ? '#00b42a' : '#ff7d00'}
                            size='small'
                            style={{ width: 80 }}
                          />
                          <span style={{ fontSize: 12, width: 30 }}>{component.health}%</span>
                        </div>
                      </div>
                    ))}
                  </Space>
                </Card>
              </Col>
            </Row>
          </TabPane>

          <TabPane key='alerts' title={`告警管理 ${alertStats.active > 0 ? `(${alertStats.active})` : ''}`}>
            {/* 筛选和操作 */}
            <div style={{ marginBottom: 16 }}>
              <Space size='large'>
                <Select
                  style={{ width: 150 }}
                  placeholder='告警状态'
                  value={alertFilter}
                  onChange={setAlertFilter}
                >
                  <Option value='all'>全部状态</Option>
                  <Option value='active'>活跃</Option>
                  <Option value='acknowledged'>已确认</Option>
                  <Option value='resolved'>已解决</Option>
                </Select>
                <Select
                  style={{ width: 150 }}
                  placeholder='严重程度'
                  value={severityFilter}
                  onChange={setSeverityFilter}
                >
                  <Option value='all'>全部级别</Option>
                  <Option value='critical'>严重</Option>
                  <Option value='high'>高</Option>
                  <Option value='medium'>中</Option>
                  <Option value='low'>低</Option>
                </Select>
                <Button icon={<ReloadOutlined />}>
                  刷新
                </Button>
                <Button icon={<SettingOutlined />} onClick={() => setConfigVisible(true)}>
                  告警配置
                </Button>
              </Space>
            </div>

            {/* 告警列表 */}
            <Table
              columns={alertColumns}
              data={filteredAlerts}
              pagination={{
                pageSize: 10,
                showTotal: true,
              }}
            />
          </TabPane>
        </Tabs>
      </Card>

      {/* 告警配置模态框 */}
      <Modal
        title='告警配置'
        visible={configVisible}
        onCancel={() => setConfigVisible(false)}
        onOk={() => {
          Message.success('告警配置保存成功')
          setConfigVisible(false)
        }}
        style={{ width: 600 }}
      >
        <Form layout='vertical'>
          <Form.Item label='设备离线率阈值' field='offlineThreshold'>
            <Input suffix='%' defaultValue='10' />
          </Form.Item>
          
          <Form.Item label='同步失败率阈值' field='syncFailThreshold'>
            <Input suffix='%' defaultValue='5' />
          </Form.Item>
          
          <Form.Item label='响应时间阈值' field='responseTimeThreshold'>
            <Input suffix='ms' defaultValue='500' />
          </Form.Item>
          
          <Form.Item label='邮件通知' field='emailNotification'>
            <Switch defaultChecked />
          </Form.Item>
          
          <Form.Item label='短信通知' field='smsNotification'>
            <Switch />
          </Form.Item>
          
          <Form.Item label='通知接收人' field='recipients'>
            <Select mode='multiple' placeholder='选择通知接收人'>
              <Option value='admin'>管理员</Option>
              <Option value='tech'>技术负责人</Option>
              <Option value='ops'>运维人员</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* 告警详情模态框 */}
      <Modal
        title='告警详情'
        visible={!!selectedAlert}
        onCancel={() => setSelectedAlert(null)}
        footer={null}
        style={{ width: 700 }}
      >
        {selectedAlert && (
          <div>
            <Alert
              type={selectedAlert.severity === 'critical' || selectedAlert.severity === 'high' ? 'error' : 'warning'}
              content={selectedAlert.description}
              style={{ marginBottom: 16 }}
            />
            
            <Card title='基本信息' size='small' style={{ marginBottom: 16 }}>
              <Row gutter={16}>
                <Col span={12}>
                  <div><strong>告警ID:</strong> {selectedAlert.id}</div>
                  <div><strong>严重程度:</strong> {selectedAlert.severity}</div>
                  <div><strong>状态:</strong> {selectedAlert.status}</div>
                </Col>
                <Col span={12}>
                  <div><strong>触发时间:</strong> {selectedAlert.triggerTime}</div>
                  <div><strong>影响设备:</strong> {selectedAlert.affectedDevices} 台</div>
                  <div><strong>来源:</strong> {selectedAlert.source}</div>
                </Col>
              </Row>
            </Card>
            
            <Card title='处理记录' size='small'>
              <Timeline>
                <Timeline.Item>
                  <div>
                    <div style={{ fontWeight: 500 }}>告警触发</div>
                    <div style={{ fontSize: 12, color: '#86909c' }}>
                      {selectedAlert.triggerTime} - 系统
                    </div>
                    <div>{selectedAlert.description}</div>
                  </div>
                </Timeline.Item>
                {selectedAlert.acknowledgedBy && (
                  <Timeline.Item>
                    <div>
                      <div style={{ fontWeight: 500 }}>告警确认</div>
                      <div style={{ fontSize: 12, color: '#86909c' }}>
                        确认人: {selectedAlert.acknowledgedBy}
                      </div>
                    </div>
                  </Timeline.Item>
                )}
                {selectedAlert.resolvedTime && (
                  <Timeline.Item>
                    <div>
                      <div style={{ fontWeight: 500 }}>告警解决</div>
                      <div style={{ fontSize: 12, color: '#86909c' }}>
                        {selectedAlert.resolvedTime}
                      </div>
                    </div>
                  </Timeline.Item>
                )}
              </Timeline>
            </Card>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default MonitoringAlerts