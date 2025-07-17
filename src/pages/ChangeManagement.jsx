import React, { useState } from 'react'
import {
  Card,
  Table,
  Button,
  Input,
  Select,
  Space,
  Tag,
  Modal,
  Form,
  Steps,
  Timeline,
  Descriptions,
  Alert,
  Avatar,
  Divider,
} from 'antd'
import {
  PlusOutlined,
  EyeOutlined,
  CheckOutlined,
  CloseOutlined,
  ClockCircleOutlined,
  UserOutlined,
  EditOutlined,
} from '@ant-design/icons'

const { Option } = Select
const { Step } = Steps
const { TextArea } = Input

function ChangeManagement() {
  const [createVisible, setCreateVisible] = useState(false)
  const [detailVisible, setDetailVisible] = useState(false)
  const [approvalVisible, setApprovalVisible] = useState(false)
  const [selectedChange, setSelectedChange] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterType, setFilterType] = useState('all')

  // 变更请求数据
  const changeRequests = [
    {
      id: 'CR-2024-001',
      title: '智能锁固件v2.4.0发布',
      type: 'firmware_release',
      priority: 'high',
      status: 'approved',
      requester: '张三',
      requestDate: '2024-01-15 09:00:00',
      plannedDate: '2024-01-16 14:00:00',
      approver: '李四',
      approvalDate: '2024-01-15 11:30:00',
      description: '发布智能锁固件v2.4.0版本，包含新功能和安全修复',
      impact: 'medium',
      rollbackPlan: '如出现问题，可回滚至v2.3.1版本',
      affectedDevices: 156,
      riskLevel: 'medium',
    },
    {
      id: 'CR-2024-002',
      title: '新增ESP32-S3-V2.2主板支持',
      type: 'hardware_config',
      priority: 'medium',
      status: 'pending',
      requester: '王五',
      requestDate: '2024-01-14 16:30:00',
      plannedDate: '2024-01-17 10:00:00',
      approver: null,
      approvalDate: null,
      description: '在系统中新增对ESP32-S3-V2.2主板的支持配置',
      impact: 'low',
      rollbackPlan: '删除相关配置即可回滚',
      affectedDevices: 0,
      riskLevel: 'low',
    },
    {
      id: 'CR-2024-003',
      title: '紧急安全补丁部署',
      type: 'emergency_patch',
      priority: 'critical',
      status: 'in_progress',
      requester: '赵六',
      requestDate: '2024-01-14 20:00:00',
      plannedDate: '2024-01-14 22:00:00',
      approver: '李四',
      approvalDate: '2024-01-14 20:15:00',
      description: '部署紧急安全补丁，修复发现的安全漏洞',
      impact: 'high',
      rollbackPlan: '已准备回滚脚本',
      affectedDevices: 15,
      riskLevel: 'high',
    },
  ]

  // 变更历史数据
  const changeHistory = [
    {
      time: '2024-01-15 11:30:00',
      action: '变更已批准',
      operator: '李四',
      comment: '风险评估通过，可以执行',
    },
    {
      time: '2024-01-15 10:15:00',
      action: '风险评估完成',
      operator: '系统',
      comment: '自动风险评估：中等风险',
    },
    {
      time: '2024-01-15 09:30:00',
      action: '技术审核通过',
      operator: '王五',
      comment: '技术方案可行，建议批准',
    },
    {
      time: '2024-01-15 09:00:00',
      action: '变更请求提交',
      operator: '张三',
      comment: '提交固件发布变更请求',
    },
  ]

  const columns = [
    {
      title: '变更ID',
      dataIndex: 'id',
      width: 120,
      fixed: 'left',
    },
    {
      title: '变更标题',
      dataIndex: 'title',
      width: 200,
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: 500 }}>{text}</div>
          <div style={{ fontSize: 12, color: '#86909c' }}>
            申请人: {record.requester}
          </div>
        </div>
      ),
    },
    {
      title: '类型',
      dataIndex: 'type',
      width: 120,
      render: (type) => {
        const typeMap = {
          firmware_release: { color: 'blue', text: '固件发布' },
          hardware_config: { color: 'green', text: '硬件配置' },
          emergency_patch: { color: 'red', text: '紧急补丁' },
          system_config: { color: 'orange', text: '系统配置' },
        }
        const config = typeMap[type]
        return <Tag color={config.color}>{config.text}</Tag>
      },
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      width: 100,
      render: (priority) => {
        const priorityMap = {
          critical: { color: 'red', text: '紧急' },
          high: { color: 'orange', text: '高' },
          medium: { color: 'blue', text: '中' },
          low: { color: 'gray', text: '低' },
        }
        const config = priorityMap[priority]
        return <Tag color={config.color}>{config.text}</Tag>
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: (status) => {
        const statusMap = {
          pending: { color: 'orange', text: '待审批' },
          approved: { color: 'green', text: '已批准' },
          rejected: { color: 'red', text: '已拒绝' },
          in_progress: { color: 'blue', text: '执行中' },
          completed: { color: 'green', text: '已完成' },
          cancelled: { color: 'gray', text: '已取消' },
        }
        const config = statusMap[status]
        return <Tag color={config.color}>{config.text}</Tag>
      },
    },
    {
      title: '计划执行时间',
      dataIndex: 'plannedDate',
      width: 150,
    },
    {
      title: '影响设备',
      dataIndex: 'affectedDevices',
      width: 100,
      render: (count) => `${count} 台`,
    },
    {
      title: '风险等级',
      dataIndex: 'riskLevel',
      width: 100,
      render: (risk) => {
        const riskMap = {
          high: { color: 'red', text: '高风险' },
          medium: { color: 'orange', text: '中风险' },
          low: { color: 'green', text: '低风险' },
        }
        const config = riskMap[risk]
        return <Tag color={config.color}>{config.text}</Tag>
      },
    },
    {
      title: '操作',
      width: 200,
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Button
            type='text'
            size='small'
            icon={<EyeOutlined />}
            onClick={() => handleViewDetail(record)}
          >
            查看
          </Button>
          {record.status === 'pending' && (
            <>
              <Button
                type='text'
                size='small'
                icon={<CheckOutlined />}
                onClick={() => handleApproval(record, 'approve')}
              >
                批准
              </Button>
              <Button
                type='text'
                size='small'
                status='danger'
                icon={<CloseOutlined />}
                onClick={() => handleApproval(record, 'reject')}
              >
                拒绝
              </Button>
            </>
          )}
          {record.status === 'approved' && (
            <Button type='text' size='small' icon={<EditOutlined />}>
              执行
            </Button>
          )}
        </Space>
      ),
    },
  ]

  const handleViewDetail = (record) => {
    setSelectedChange(record)
    setDetailVisible(true)
  }

  const handleApproval = (record, action) => {
    setSelectedChange(record)
    setApprovalVisible(true)
  }

  const handleCreateChange = () => {
    setCreateVisible(true)
  }

  const filteredChanges = changeRequests.filter(change => {
    const matchesStatus = filterStatus === 'all' || change.status === filterStatus
    const matchesType = filterType === 'all' || change.type === filterType
    return matchesStatus && matchesType
  })

  const getStatusSteps = (status) => {
    const steps = [
      { title: '提交申请', status: 'finish' },
      { title: '技术审核', status: status === 'pending' ? 'process' : 'finish' },
      { title: '风险评估', status: ['pending', 'approved'].includes(status) ? (status === 'pending' ? 'wait' : 'finish') : 'finish' },
      { title: '批准执行', status: status === 'approved' ? 'finish' : status === 'in_progress' ? 'finish' : 'wait' },
      { title: '执行完成', status: status === 'completed' ? 'finish' : status === 'in_progress' ? 'process' : 'wait' },
    ]
    return steps
  }

  return (
    <div className='page-container'>
      <div className='page-header'>
        <h1 className='page-title'>变更管理</h1>
        <p className='page-description'>管理系统变更请求、审批流程和执行状态</p>
      </div>

      {/* 筛选和操作 */}
      <Card style={{ marginBottom: 16 }}>
        <Space size='large'>
          <Select
            style={{ width: 150 }}
            placeholder='变更状态'
            value={filterStatus}
            onChange={setFilterStatus}
          >
            <Option value='all'>全部状态</Option>
            <Option value='pending'>待审批</Option>
            <Option value='approved'>已批准</Option>
            <Option value='in_progress'>执行中</Option>
            <Option value='completed'>已完成</Option>
          </Select>
          <Select
            style={{ width: 150 }}
            placeholder='变更类型'
            value={filterType}
            onChange={setFilterType}
          >
            <Option value='all'>全部类型</Option>
            <Option value='firmware_release'>固件发布</Option>
            <Option value='hardware_config'>硬件配置</Option>
            <Option value='emergency_patch'>紧急补丁</Option>
          </Select>
          <Button type='primary' icon={<PlusOutlined />} onClick={handleCreateChange}>
            创建变更请求
          </Button>
        </Space>
      </Card>

      {/* 变更请求列表 */}
      <Card>
        <Table
          columns={columns}
          data={filteredChanges}
          pagination={{
            pageSize: 10,
            showTotal: true,
          }}
          scroll={{ x: 1400 }}
        />
      </Card>

      {/* 创建变更请求模态框 */}
      <Modal
        title='创建变更请求'
        visible={createVisible}
        onCancel={() => setCreateVisible(false)}
        onOk={() => {
          Message.success('变更请求创建成功')
          setCreateVisible(false)
        }}
        style={{ width: 700 }}
      >
        <Form layout='vertical'>
          <Form.Item label='变更标题' field='title' required>
            <Input placeholder='请输入变更标题' />
          </Form.Item>
          
          <Form.Item label='变更类型' field='type' required>
            <Select placeholder='选择变更类型'>
              <Option value='firmware_release'>固件发布</Option>
              <Option value='hardware_config'>硬件配置</Option>
              <Option value='emergency_patch'>紧急补丁</Option>
              <Option value='system_config'>系统配置</Option>
            </Select>
          </Form.Item>
          
          <Form.Item label='优先级' field='priority' required>
            <Select placeholder='选择优先级'>
              <Option value='critical'>紧急</Option>
              <Option value='high'>高</Option>
              <Option value='medium'>中</Option>
              <Option value='low'>低</Option>
            </Select>
          </Form.Item>
          
          <Form.Item label='计划执行时间' field='plannedDate' required>
            <Input placeholder='YYYY-MM-DD HH:mm:ss' />
          </Form.Item>
          
          <Form.Item label='变更描述' field='description' required>
            <TextArea placeholder='请详细描述变更内容和目的' rows={4} />
          </Form.Item>
          
          <Form.Item label='影响分析' field='impact'>
            <TextArea placeholder='请分析变更可能产生的影响' rows={3} />
          </Form.Item>
          
          <Form.Item label='回滚计划' field='rollbackPlan'>
            <TextArea placeholder='请描述如何回滚此变更' rows={3} />
          </Form.Item>
        </Form>
      </Modal>

      {/* 变更详情模态框 */}
      <Modal
        title='变更详情'
        visible={detailVisible}
        onCancel={() => setDetailVisible(false)}
        footer={null}
        style={{ width: 800 }}
      >
        {selectedChange && (
          <div>
            {/* 变更流程 */}
            <Steps
              current={getStatusSteps(selectedChange.status).findIndex(step => step.status === 'process')}
              style={{ marginBottom: 24 }}
            >
              {getStatusSteps(selectedChange.status).map((step, index) => (
                <Step key={index} title={step.title} status={step.status} />
              ))}
            </Steps>
            
            {/* 基本信息 */}
            <Descriptions
              title='基本信息'
              data={[
                { label: '变更ID', value: selectedChange.id },
                { label: '变更标题', value: selectedChange.title },
                { label: '变更类型', value: selectedChange.type },
                { label: '优先级', value: selectedChange.priority },
                { label: '申请人', value: selectedChange.requester },
                { label: '申请时间', value: selectedChange.requestDate },
                { label: '计划执行时间', value: selectedChange.plannedDate },
                { label: '影响设备数', value: `${selectedChange.affectedDevices} 台` },
                { label: '风险等级', value: selectedChange.riskLevel },
              ]}
              column={2}
              style={{ marginBottom: 24 }}
            />
            
            {/* 详细描述 */}
            <Card title='变更描述' size='small' style={{ marginBottom: 16 }}>
              <p>{selectedChange.description}</p>
            </Card>
            
            <Card title='回滚计划' size='small' style={{ marginBottom: 16 }}>
              <p>{selectedChange.rollbackPlan}</p>
            </Card>
            
            {/* 变更历史 */}
            <Card title='变更历史' size='small'>
              <Timeline>
                {changeHistory.map((item, index) => (
                  <Timeline.Item key={index} dot={<ClockCircleOutlined />}>
                    <div>
                      <div style={{ fontWeight: 500 }}>{item.action}</div>
                      <div style={{ fontSize: 12, color: '#86909c' }}>
                        {item.time} - {item.operator}
                      </div>
                      <div style={{ marginTop: 4 }}>{item.comment}</div>
                    </div>
                  </Timeline.Item>
                ))}
              </Timeline>
            </Card>
          </div>
        )}
      </Modal>

      {/* 审批模态框 */}
      <Modal
        title='变更审批'
        visible={approvalVisible}
        onCancel={() => setApprovalVisible(false)}
        onOk={() => {
          Message.success('审批完成')
          setApprovalVisible(false)
        }}
      >
        {selectedChange && (
          <div>
            <Alert
              type='info'
              content={`正在审批变更请求: ${selectedChange.title}`}
              style={{ marginBottom: 16 }}
            />
            
            <Form layout='vertical'>
              <Form.Item label='审批结果' field='result' required>
                <Select placeholder='选择审批结果'>
                  <Option value='approve'>批准</Option>
                  <Option value='reject'>拒绝</Option>
                  <Option value='defer'>延期</Option>
                </Select>
              </Form.Item>
              
              <Form.Item label='审批意见' field='comment' required>
                <TextArea placeholder='请输入审批意见' rows={4} />
              </Form.Item>
            </Form>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default ChangeManagement