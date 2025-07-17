import React, { useState } from 'react'

import {
  Card,
  Table,
  Button,
  Select,
  Space,
  Tag,
  Modal,
  Form,
  Input,
  Upload,
  Descriptions,
  Drawer,
  message,
  Popconfirm,
  InputNumber,
  Steps,
  Radio,
  Alert,
} from 'antd'

import { firmwareDetails } from '../constants/modelData'

import {
  PlusOutlined,
  UploadOutlined,
  DownloadOutlined,
  DeleteOutlined,
  EyeOutlined,
  EditOutlined,
  CloudUploadOutlined,
} from '@ant-design/icons'

const { Step } = Steps

const { Option } = Select

const { TextArea } = Input


function FirmwareManagement() {
  const [uploadVisible, setUploadVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false)
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [editingFirmware, setEditingFirmware] = useState(null)
  const [viewingFirmware, setViewingFirmware] = useState(null)
  const [deployVisible, setDeployVisible] = useState(false)
  const [deployStep, setDeployStep] = useState(0)
  const [deployType, setDeployType] = useState('grayscale')
  const [selectedFirmware, setSelectedFirmware] = useState(null)

  const [form] = Form.useForm()

  // 部署步骤配置
  const deploySteps = [
    { title: '选择设备', description: '选择要部署的目标设备' },
    { title: '配置策略', description: '设置部署策略和参数' },
    { title: '确认部署', description: '确认部署信息并开始' },
  ]

  // 固件列表数据 - 将firmwareDetails转换为数组格式
  const firmwareArray = Object.entries(firmwareDetails).map(([key, firmware], index) => ({
    id: index + 1,
    name: firmware.fileName,
    version: firmware.version,
    type: firmware.type === 'release' ? 'stable' : firmware.type,
    size: firmware.size,
    uploadDate: firmware.releaseDate,
    description: firmware.description,
    targetBoards: firmware.compatibleBoards || [],
    supportedModels: firmware.supportedModels || [],
    features: firmware.inputMethods?.concat(firmware.outputMethods || []) || [],
    algorithms: firmware.securityFeatures || [],
    status: firmware.status === 'stable' ? 'active' : firmware.status,
    changelog: firmware.changelog,
    minBoardVersion: firmware.compatibility?.minBoardVersion || '',
    maxBoardVersion: firmware.compatibility?.maxBoardVersion || '',
    buildNumber: firmware.version.replace(/[^0-9]/g, '') + '001',
    releaseNotes: firmware.description,
  }));
  
  const [firmwareList, setFirmwareList] = useState(firmwareArray)

  const typeMap = {
    stable: { text: '稳定版', color: 'green' },
    beta: { text: '测试版', color: 'orange' },
    alpha: { text: '内测版', color: 'red' },
    rc: { text: '候选版', color: 'blue' },
  }

  const statusMap = {
    active: { text: '已发布', color: 'green' },
    testing: { text: '测试中', color: 'orange' },
    deprecated: { text: '已弃用', color: 'red' },
    development: { text: '开发中', color: 'blue' },
  }



  const firmwareColumns = [
    {
      title: '固件信息',
      dataIndex: 'name',
      width: 200,
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: 600, color: '#111827', fontSize: '14px' }}>{record.version}</div>
          <div style={{ fontSize: 12, color: '#9ca3af', marginTop: '2px' }}>{text}</div>
        </div>
      ),
    },
    {
      title: '类型',
      dataIndex: 'type',
      width: 100,
      render: (type) => {
        const config = typeMap[type]
        return (
    
          <Tag 
            color={config.color}
            style={{
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 500,
              border: 'none'
            }}
          >
            {config.text}
          </Tag>
        )
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: (status) => {
        const config = statusMap[status]
        return (
          <Tag 
            color={config.color}
            style={{
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 500,
              border: 'none'
            }}
          >
            {config.text}
          </Tag>
        )
      },
    },
    {
      title: '支持型号',
      dataIndex: 'supportedModels',
      width: 150,
      render: (models) => (
        <div>
          {models.map((model, index) => (
            <Tag 
              key={index} 
              size='small' 
              color='blue' 
              style={{ 
                marginBottom: 2,
                borderRadius: '4px',
                fontSize: '11px',
                border: 'none'
              }}
            >
              {model}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: '目标主板',
      dataIndex: 'targetBoards',
      width: 150,
      render: (boards) => (
        <div>
          {boards.map((board, index) => (
            <Tag 
              key={index} 
              size='small' 
              color='purple' 
              style={{ 
                marginBottom: 2,
                borderRadius: '4px',
                fontSize: '11px',
                border: 'none'
              }}
            >
              {board}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: '功能特性',
      dataIndex: 'features',
      width: 200,
      render: (features) => (
        <div>
          {features.slice(0, 2).map((feature, index) => (
            <Tag 
              key={index} 
              size='small' 
              style={{ 
                marginBottom: 2,
                borderRadius: '4px',
                fontSize: '11px',
                backgroundColor: '#f3f4f6',
                color: '#374151',
                border: 'none'
              }}
            >
              {feature}
            </Tag>
          ))}
          {features.length > 2 && (
            <Tag 
              size='small' 
              style={{
                borderRadius: '4px',
                fontSize: '11px',
                backgroundColor: '#e5e7eb',
                color: '#6b7280',
                border: 'none'
              }}
            >
              +{features.length - 2}
            </Tag>
          )}
        </div>
      ),
    },
    {
      title: '文件大小',
      dataIndex: 'size',
      width: 100,
    },
    {
      title: '上传时间',
      dataIndex: 'uploadDate',
      width: 120,
    },
    {
      title: '操作',
      width: 200,
      render: (_, record) => (
        <Space size={4}>
          <Button
            type='text'
            size='small'
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
            style={{
              color: '#6b7280',
              borderRadius: '6px',
              height: '28px',
              fontSize: '12px'
            }}
          >
            详情
          </Button>
          <Button
            type='text'
            size='small'
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{
              color: '#6b7280',
              borderRadius: '6px',
              height: '28px',
              fontSize: '12px'
            }}
          >
            编辑
          </Button>
          <Button 
            type='text' 
            size='small' 
            icon={<DownloadOutlined />}
            style={{
              color: '#6b7280',
              borderRadius: '6px',
              height: '28px',
              fontSize: '12px'
            }}
          >
            下载
          </Button>
          <Popconfirm
            title='确定要删除这个固件吗？'
            onConfirm={() => handleDelete(record.id)}
            okText='确定'
            cancelText='取消'
          >
            <Button 
              type='text' 
              size='small' 
              danger 
              icon={<DeleteOutlined />}
              style={{
                borderRadius: '6px',
                height: '28px',
                fontSize: '12px'
              }}
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]



  const handleUpload = () => {
    setUploadVisible(true)
  }

  const handleAdd = () => {
    setEditingFirmware(null)
    form.resetFields()
    setModalVisible(true)
  }



  const handleView = (record) => {
    setViewingFirmware(record)
    setDrawerVisible(true)
  }

  const handleEdit = (record) => {
    setEditingFirmware(record)
    form.setFieldsValue({
      ...record,
      targetBoards: record.targetBoards,
      supportedModels: record.supportedModels,
      features: record.features,
      algorithms: record.algorithms
    })
    setModalVisible(true)
  }

  const handleDelete = (id) => {
    setFirmwareList(firmwareList.filter(item => item.id !== id))
    message.success('固件删除成功')
  }

  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (editingFirmware) {
        // 编辑固件
        setFirmwareList(firmwareList.map(item => 
          item.id === editingFirmware.id 
            ? { ...item, ...values, updateDate: new Date().toISOString().split('T')[0] }
            : item
        ))
        message.success('固件更新成功')
      } else {
        // 添加新固件
        const newFirmware = {
          id: Date.now(),
          ...values,
          uploadDate: new Date().toISOString().split('T')[0],
          size: '2.5MB', // 默认值
          buildNumber: `build-${Date.now()}`,
          downloadCount: 0
        }
        setFirmwareList([...firmwareList, newFirmware])
        message.success('固件添加成功')
      }
      setModalVisible(false)
      form.resetFields()
    })
  }

  const handleModalCancel = () => {
    setModalVisible(false)
    form.resetFields()
  }

  const handleDeploy = (record) => {
    setSelectedFirmware(record)
    setDeployStep(0)
    setDeployVisible(true)
  }

  const handleDeployNext = () => {
    if (deployStep < 2) {
      setDeployStep(deployStep + 1)
    } else {
      // 开始部署
      message.success('部署任务已启动')
      setDeployVisible(false)
      setDeployStep(0)
    }
  }



  return (
    <div style={{ padding: '8px' }}>
      <Card bodyStyle={{ padding: '12px' }}>
        <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#1f2937' }}>固件管理</h3>
          </div>
          <Space>
            <Button type='primary' icon={<PlusOutlined />} onClick={handleAdd} size="small">
              添加固件
            </Button>
            <Button icon={<UploadOutlined />} onClick={handleUpload} size="small">
              上传固件
            </Button>
          </Space>
        </div>
        <Table
          columns={firmwareColumns}
          dataSource={firmwareList}
          size="small"
          pagination={{
            pageSize: 15,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
            size: 'small'
          }}
          rowKey='id'
        />
      </Card>

      {/* 添加/编辑固件模态框 */}
      <Modal
        title={editingFirmware ? '编辑固件' : '添加固件'}
        open={modalVisible}
        onCancel={handleModalCancel}
        onOk={handleModalOk}
        width={800}
      >
        <Form form={form} layout='vertical'>
          <Form.Item label='固件名称' name='name' rules={[{ required: true, message: '请输入固件名称' }]}>
            <Input placeholder='请输入固件名称' />
          </Form.Item>
          
          <Form.Item label='版本号' name='version' rules={[{ required: true, message: '请输入版本号' }]}>
            <Input placeholder='请输入版本号，如 v2.5.0' />
          </Form.Item>
          
          <Form.Item label='版本类型' name='type' rules={[{ required: true, message: '请选择版本类型' }]}>
            <Select placeholder='选择版本类型'>
              <Option value='stable'>稳定版</Option>
              <Option value='beta'>测试版</Option>
              <Option value='alpha'>内测版</Option>
              <Option value='rc'>候选版</Option>
            </Select>
          </Form.Item>
          
          <Form.Item label='状态' name='status' rules={[{ required: true, message: '请选择状态' }]}>
            <Select placeholder='选择状态'>
              <Option value='active'>已发布</Option>
              <Option value='testing'>测试中</Option>
              <Option value='development'>开发中</Option>
              <Option value='deprecated'>已弃用</Option>
            </Select>
          </Form.Item>
          
          <Form.Item label='目标主板' name='targetBoards' rules={[{ required: true, message: '请选择目标主板' }]}>
            <Select mode='multiple' placeholder='选择支持的主板型号'>
              <Option value='ESP32-S3-V2.1'>ESP32-S3-V2.1</Option>
              <Option value='ESP32-S3-V2.0'>ESP32-S3-V2.0</Option>
              <Option value='ESP32-C3-V1.5'>ESP32-C3-V1.5</Option>
            </Select>
          </Form.Item>
          
          <Form.Item label='支持型号' name='supportedModels' rules={[{ required: true, message: '请选择支持型号' }]}>
            <Select mode='multiple' placeholder='选择支持的设备型号'>
              <Option value='SmartLock Pro X1'>SmartLock Pro X1</Option>
              <Option value='SmartLock Pro X2'>SmartLock Pro X2</Option>
              <Option value='SmartLock Basic A2'>SmartLock Basic A2</Option>
            </Select>
          </Form.Item>
          
          <Form.Item label='功能特性' name='features'>
            <Select mode='tags' placeholder='输入功能特性'>
              <Option value='指纹识别'>指纹识别</Option>
              <Option value='人脸识别'>人脸识别</Option>
              <Option value='密码开锁'>密码开锁</Option>
              <Option value='刷卡开锁'>刷卡开锁</Option>
              <Option value='远程开锁'>远程开锁</Option>
            </Select>
          </Form.Item>
          
          <Form.Item label='加密算法' name='algorithms'>
            <Select mode='multiple' placeholder='选择加密算法'>
              <Option value='AES-256'>AES-256</Option>
              <Option value='AES-128'>AES-128</Option>
              <Option value='RSA-2048'>RSA-2048</Option>
              <Option value='SHA-256'>SHA-256</Option>
            </Select>
          </Form.Item>
          
          <Form.Item label='描述' name='description'>
            <TextArea placeholder='请输入固件描述' rows={3} />
          </Form.Item>
          
          <Form.Item label='更新日志' name='changelog'>
            <TextArea placeholder='请输入更新日志' rows={4} />
          </Form.Item>
        </Form>
      </Modal>

      {/* 查看固件详情抽屉 */}
      <Drawer
        title={
          <span style={{ 
            fontSize: '18px', 
            fontWeight: 600, 
            color: 'var(--text-primary)',
            letterSpacing: '-0.01em'
          }}>
            固件详情
          </span>
        }
        open={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        width={600}
        className="linear-sidebar-card"
        styles={{
          header: { padding: '20px 24px 16px' },
          body: { padding: '0 24px 24px' }
        }}
      >
        {viewingFirmware && (
          <div>
            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
              <h3 style={{ 
                fontSize: '15px', 
                fontWeight: 600, 
                color: 'var(--text-primary)',
                letterSpacing: '-0.01em',
                lineHeight: 1.4,
                marginBottom: 'var(--spacing-md)'
              }}>基本信息</h3>
              <Descriptions
                bordered
                column={1}
                className="linear-sidebar-descriptions"
                labelStyle={{
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  width: '120px'
                }}
                contentStyle={{
                  fontSize: '13px',
                  color: 'var(--text-primary)'
                }}
              >
              <Descriptions.Item label='固件名称'>
                <span style={{ fontWeight: 500 }}>{viewingFirmware.name}</span>
              </Descriptions.Item>
              <Descriptions.Item label='版本号'>
                <code style={{ 
                  background: 'var(--bg-secondary)', 
                  padding: '4px 8px', 
                  borderRadius: 'var(--border-radius-sm)',
                  fontSize: '12px',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)'
                }}>{viewingFirmware.version}</code>
              </Descriptions.Item>
              <Descriptions.Item label='版本类型'>
                <Tag 
                  color={typeMap[viewingFirmware.type].color}
                  style={{
                    borderRadius: 'var(--border-radius-sm)',
                    fontSize: '11px',
                    border: 'none',
                    fontWeight: 500,
                    padding: '2px 8px',
                    height: '22px',
                    lineHeight: '18px'
                  }}
                >
                  {typeMap[viewingFirmware.type].text}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label='状态'>
                <Tag 
                  color={statusMap[viewingFirmware.status].color}
                  style={{
                    borderRadius: 'var(--border-radius-sm)',
                    fontSize: '11px',
                    border: 'none',
                    fontWeight: 500,
                    padding: '2px 8px',
                    height: '22px',
                    lineHeight: '18px'
                  }}
                >
                  {statusMap[viewingFirmware.status].text}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label='文件大小'>{viewingFirmware.size}</Descriptions.Item>
              <Descriptions.Item label='上传时间'>{viewingFirmware.uploadDate}</Descriptions.Item>
              <Descriptions.Item label='构建号'>
                <code style={{ 
                  background: 'var(--bg-secondary)', 
                  padding: '4px 8px', 
                  borderRadius: 'var(--border-radius-sm)',
                  fontSize: '12px',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)'
                }}>{viewingFirmware.buildNumber}</code>
              </Descriptions.Item>
              </Descriptions>
            </div>
            
            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
              <h3 style={{ 
                fontSize: '15px', 
                fontWeight: 600, 
                color: 'var(--text-primary)',
                letterSpacing: '-0.01em',
                lineHeight: 1.4,
                marginBottom: 'var(--spacing-md)'
              }}>兼容性信息</h3>
              <Descriptions
                bordered
                column={1}
                className="linear-sidebar-descriptions"
                labelStyle={{
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  width: '120px'
                }}
                contentStyle={{
                  fontSize: '13px',
                  color: 'var(--text-primary)'
                }}
              >
              <Descriptions.Item label='目标主板'>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-xs)' }}>
                  {viewingFirmware.targetBoards.map((board, index) => (
                    <Tag 
                      key={index} 
                      color='purple' 
                      style={{ 
                        marginBottom: 0,
                        borderRadius: 'var(--border-radius-sm)',
                        fontSize: '11px',
                        border: 'none',
                        fontWeight: 500,
                        padding: '2px 8px',
                        height: '22px',
                        lineHeight: '18px'
                      }}
                    >
                      {board}
                    </Tag>
                  ))}
                </div>
              </Descriptions.Item>
              <Descriptions.Item label='支持型号'>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-xs)' }}>
                  {viewingFirmware.supportedModels.map((model, index) => (
                    <Tag 
                      key={index} 
                      color='blue' 
                      style={{ 
                        marginBottom: 0,
                        borderRadius: 'var(--border-radius-sm)',
                        fontSize: '11px',
                        border: 'none',
                        fontWeight: 500,
                        padding: '2px 8px',
                        height: '22px',
                        lineHeight: '18px'
                      }}
                    >
                      {model}
                    </Tag>
                  ))}
                </div>
              </Descriptions.Item>
              <Descriptions.Item label='最小主板版本'>
                <code style={{ 
                  background: 'var(--bg-secondary)', 
                  padding: '4px 8px', 
                  borderRadius: 'var(--border-radius-sm)',
                  fontSize: '12px',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)'
                }}>{viewingFirmware.minBoardVersion}</code>
              </Descriptions.Item>
              <Descriptions.Item label='最大主板版本'>
                <code style={{ 
                  background: 'var(--bg-secondary)', 
                  padding: '4px 8px', 
                  borderRadius: 'var(--border-radius-sm)',
                  fontSize: '12px',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)'
                }}>{viewingFirmware.maxBoardVersion}</code>
              </Descriptions.Item>
              </Descriptions>
            </div>
            
            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
              <h3 style={{ 
                fontSize: '15px', 
                fontWeight: 600, 
                color: 'var(--text-primary)',
                letterSpacing: '-0.01em',
                lineHeight: 1.4,
                marginBottom: 'var(--spacing-md)'
              }}>功能特性</h3>
              <Descriptions
                bordered
                column={1}
                className="linear-sidebar-descriptions"
                labelStyle={{
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  width: '120px'
                }}
                contentStyle={{
                  fontSize: '13px',
                  color: 'var(--text-primary)'
                }}
              >
              <Descriptions.Item label='功能列表'>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-xs)' }}>
                  {viewingFirmware.features.map((feature, index) => (
                    <Tag 
                      key={index} 
                      style={{ 
                        marginBottom: 0,
                        borderRadius: 'var(--border-radius-sm)',
                        fontSize: '11px',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-secondary)',
                        color: 'var(--text-primary)',
                        fontWeight: 500,
                        padding: '2px 8px',
                        height: '22px',
                        lineHeight: '18px'
                      }}
                    >
                      {feature}
                    </Tag>
                  ))}
                </div>
              </Descriptions.Item>
              <Descriptions.Item label='加密算法'>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-xs)' }}>
                  {viewingFirmware.algorithms.map((algorithm, index) => (
                    <Tag 
                      key={index} 
                      color='green' 
                      style={{ 
                        marginBottom: 0,
                        borderRadius: 'var(--border-radius-sm)',
                        fontSize: '11px',
                        border: 'none',
                        fontWeight: 500,
                        padding: '2px 8px',
                        height: '22px',
                        lineHeight: '18px'
                      }}
                    >
                      {algorithm}
                    </Tag>
                  ))}
                </div>
              </Descriptions.Item>
              </Descriptions>
            </div>
            
            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
              <h4 style={{ 
                fontSize: '14px', 
                fontWeight: 600, 
                color: 'var(--text-primary)',
                marginBottom: 'var(--spacing-sm)'
              }}>更新日志</h4>
              <div style={{ 
                background: 'var(--bg-secondary)', 
                padding: 'var(--spacing-md)', 
                borderRadius: 'var(--border-radius)',
                border: '1px solid var(--border-color)',
                whiteSpace: 'pre-line',
                fontSize: '13px',
                lineHeight: 1.6,
                color: 'var(--text-secondary)'
              }}>
                {viewingFirmware.changelog}
              </div>
            </div>
            
            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
              <h4 style={{ 
                fontSize: '14px', 
                fontWeight: 600, 
                color: 'var(--text-primary)',
                marginBottom: 'var(--spacing-sm)'
              }}>发布说明</h4>
              <div style={{ 
                background: 'var(--bg-secondary)', 
                padding: 'var(--spacing-md)', 
                borderRadius: 'var(--border-radius)',
                border: '1px solid var(--border-color)',
                fontSize: '13px',
                lineHeight: 1.6,
                color: 'var(--text-secondary)'
              }}>
                {viewingFirmware.releaseNotes}
              </div>
            </div>
            
            <Space size="var(--spacing-sm)">
              <Button 
                type='primary' 
                icon={<DownloadOutlined />}
                style={{
                  height: '32px',
                  borderRadius: 'var(--border-radius)',
                  fontSize: '13px',
                  fontWeight: 500
                }}
              >
                下载固件
              </Button>
              <Button 
                icon={<CloudUploadOutlined />} 
                onClick={() => handleDeploy(viewingFirmware)}
                style={{
                  height: '32px',
                  borderRadius: 'var(--border-radius)',
                  fontSize: '13px',
                  fontWeight: 500
                }}
              >
                部署固件
              </Button>
              <Button 
                icon={<EditOutlined />} 
                onClick={() => {
                  setDrawerVisible(false)
                  handleEdit(viewingFirmware)
                }}
                style={{
                  height: '32px',
                  borderRadius: 'var(--border-radius)',
                  fontSize: '13px',
                  fontWeight: 500
                }}
              >
                编辑固件
              </Button>
            </Space>
          </div>
        )}
      </Drawer>

      {/* 上传固件模态框 */}
      <Modal
        title={<span style={{ fontSize: '16px', fontWeight: 600 }}>上传固件</span>}
        open={uploadVisible}
        onCancel={() => setUploadVisible(false)}
        onOk={() => {
          message.success('固件上传成功')
          setUploadVisible(false)
        }}
        width={600}
        className="linear-modal"
      >
        <Form layout='vertical' className="linear-form">
          <Form.Item 
            label={<span style={{ fontSize: '13px', fontWeight: 500 }}>版本号</span>} 
            field='version' 
            required
          >
            <Input 
              placeholder='请输入版本号，如 v2.5.0' 
              style={{
                height: '36px',
                borderRadius: 'var(--border-radius)',
                fontSize: '13px'
              }}
            />
          </Form.Item>
          
          <Form.Item 
            label={<span style={{ fontSize: '13px', fontWeight: 500 }}>版本类型</span>} 
            field='type' 
            required
          >
            <Select 
              placeholder='选择版本类型'
              style={{
                height: '36px',
                borderRadius: 'var(--border-radius)',
                fontSize: '13px'
              }}
            >
              <Option value='stable'>稳定版</Option>
              <Option value='beta'>测试版</Option>
              <Option value='dev'>开发版</Option>
            </Select>
          </Form.Item>
          
          <Form.Item 
            label={<span style={{ fontSize: '13px', fontWeight: 500 }}>目标主板</span>} 
            field='targetBoards' 
            required
          >
            <Select 
              mode='multiple' 
              placeholder='选择支持的主板型号'
              style={{
                minHeight: '36px',
                borderRadius: 'var(--border-radius)',
                fontSize: '13px'
              }}
            >
              <Option value='ESP32-S3-V2.1'>ESP32-S3-V2.1</Option>
              <Option value='ESP32-S3-V2.2'>ESP32-S3-V2.2</Option>
              <Option value='ESP32-C3-V1.5'>ESP32-C3-V1.5</Option>
            </Select>
          </Form.Item>
          
          <Form.Item 
            label={<span style={{ fontSize: '13px', fontWeight: 500 }}>固件文件</span>} 
            name='file' 
            required
          >
            <Upload.Dragger
              accept='.bin,.hex,.elf'
              beforeUpload={() => false}
              style={{
                borderRadius: 'var(--border-radius)',
                border: '2px dashed var(--border-color)',
                background: 'var(--bg-secondary)'
              }}
            >
              <div style={{ textAlign: 'center', padding: 'var(--spacing-lg)' }}>
                <UploadOutlined style={{ 
                  fontSize: 48, 
                  color: 'var(--text-tertiary)',
                  marginBottom: 'var(--spacing-sm)'
                }} />
                <div style={{ 
                  marginTop: 'var(--spacing-xs)',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'var(--text-primary)'
                }}>点击或拖拽文件到此区域上传</div>
                <div style={{ 
                  fontSize: '12px', 
                  color: 'var(--text-tertiary)', 
                  marginTop: 'var(--spacing-xs)'
                }}>
                  支持 .bin, .hex, .elf 格式，文件大小不超过 10MB
                </div>
              </div>
            </Upload.Dragger>
          </Form.Item>
          
          <Form.Item 
            label={<span style={{ fontSize: '13px', fontWeight: 500 }}>更新说明</span>} 
            field='changelog'
          >
            <Input.TextArea 
              placeholder='请输入本次更新的功能和修复内容' 
              rows={4}
              style={{
                borderRadius: 'var(--border-radius)',
                fontSize: '13px',
                lineHeight: 1.6
              }}
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* 部署固件模态框 */}
      <Modal
        title={<span style={{ fontSize: '16px', fontWeight: 600 }}>部署固件</span>}
        open={deployVisible}
        onCancel={() => setDeployVisible(false)}
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-sm)' }}>
            {deployStep > 0 && (
              <Button 
                onClick={() => setDeployStep(deployStep - 1)}
                style={{
                  height: '32px',
                  borderRadius: 'var(--border-radius)',
                  fontSize: '13px',
                  fontWeight: 500
                }}
              >
                上一步
              </Button>
            )}
            <Button 
              type='primary' 
              onClick={handleDeployNext}
              style={{
                height: '32px',
                borderRadius: 'var(--border-radius)',
                fontSize: '13px',
                fontWeight: 500
              }}
            >
              {deployStep < 2 ? '下一步' : '开始部署'}
            </Button>
          </div>
        }
        width={700}
        className="linear-modal"
      >
        <Steps 
          current={deployStep} 
          style={{ marginBottom: 'var(--spacing-lg)' }}
          className="linear-steps"
        >
          {deploySteps.map((step, index) => (
            <Step 
              key={index} 
              title={<span style={{ fontSize: '13px', fontWeight: 500 }}>{step.title}</span>} 
              description={<span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{step.description}</span>} 
            />
          ))}
        </Steps>

        {deployStep === 0 && (
          <div>
            <h4 style={{ 
              fontSize: '14px', 
              fontWeight: 600, 
              color: 'var(--text-primary)',
              marginBottom: 'var(--spacing-md)'
            }}>选择目标设备</h4>
            <Form layout='vertical' className="linear-form">
              <Form.Item 
                label={<span style={{ fontSize: '13px', fontWeight: 500 }}>设备筛选</span>}
              >
                <Space direction='vertical' style={{ width: '100%' }} size="var(--spacing-sm)">
                  <Select 
                    placeholder='按型号筛选' 
                    style={{ 
                      width: '100%',
                      height: '36px',
                      borderRadius: 'var(--border-radius)',
                      fontSize: '13px'
                    }}
                  >
                    <Option value='all'>全部型号</Option>
                    <Option value='SL-PRO-X1'>SmartLock Pro X1</Option>
                    <Option value='SL-PRO-X2'>SmartLock Pro X2</Option>
                  </Select>
                  <Select 
                    placeholder='按状态筛选' 
                    style={{ 
                      width: '100%',
                      height: '36px',
                      borderRadius: 'var(--border-radius)',
                      fontSize: '13px'
                    }}
                  >
                    <Option value='online'>仅在线设备</Option>
                    <Option value='all'>全部设备</Option>
                  </Select>
                </Space>
              </Form.Item>
              <Alert
                type='info'
                message='已选择 45 台设备，其中 42 台在线，3 台离线'
                style={{
                  borderRadius: 'var(--border-radius)',
                  fontSize: '13px',
                  border: '1px solid var(--primary-color-light)',
                  background: 'var(--primary-bg)'
                }}
              />
            </Form>
          </div>
        )}

        {deployStep === 1 && (
          <div>
            <h4 style={{ 
              fontSize: '14px', 
              fontWeight: 600, 
              color: 'var(--text-primary)',
              marginBottom: 'var(--spacing-md)'
            }}>配置部署策略</h4>
            <Form layout='vertical' className="linear-form">
              <Form.Item 
                label={<span style={{ fontSize: '13px', fontWeight: 500 }}>部署类型</span>}
              >
                <Radio.Group 
                  value={deployType} 
                  onChange={setDeployType}
                  style={{ fontSize: '13px' }}
                >
                  <Radio value='grayscale' style={{ fontSize: '13px' }}>灰度发布（推荐）</Radio>
                  <Radio value='full' style={{ fontSize: '13px' }}>全量发布</Radio>
                  <Radio value='emergency' style={{ fontSize: '13px' }}>紧急发布</Radio>
                </Radio.Group>
              </Form.Item>
              
              {deployType === 'grayscale' && (
                <Form.Item 
                  label={<span style={{ fontSize: '13px', fontWeight: 500 }}>灰度比例</span>}
                >
                  <Select 
                    defaultValue='20'
                    style={{
                      height: '36px',
                      borderRadius: 'var(--border-radius)',
                      fontSize: '13px'
                    }}
                  >
                    <Option value='10'>10% (约 4 台设备)</Option>
                    <Option value='20'>20% (约 9 台设备)</Option>
                    <Option value='50'>50% (约 22 台设备)</Option>
                  </Select>
                </Form.Item>
              )}
              
              <Form.Item 
                label={<span style={{ fontSize: '13px', fontWeight: 500 }}>失败处理</span>}
              >
                <Select 
                  defaultValue='pause'
                  style={{
                    height: '36px',
                    borderRadius: 'var(--border-radius)',
                    fontSize: '13px'
                  }}
                >
                  <Option value='pause'>失败时暂停</Option>
                  <Option value='continue'>失败时继续</Option>
                  <Option value='rollback'>失败时回滚</Option>
                </Select>
              </Form.Item>
            </Form>
          </div>
        )}

        {deployStep === 2 && selectedFirmware && (
          <div>
            <h4 style={{ 
              fontSize: '14px', 
              fontWeight: 600, 
              color: 'var(--text-primary)',
              marginBottom: 'var(--spacing-md)'
            }}>确认部署信息</h4>
            <Descriptions 
              column={1}
              className="linear-descriptions"
              style={{ marginBottom: 'var(--spacing-md)' }}
            >
              <Descriptions.Item label='固件版本'>
                <code style={{ 
                  background: 'var(--bg-secondary)', 
                  padding: '2px 6px', 
                  borderRadius: 'var(--border-radius-sm)',
                  fontSize: '13px',
                  fontFamily: 'var(--font-mono)'
                }}>{selectedFirmware.version}</code>
              </Descriptions.Item>
              <Descriptions.Item label='目标设备'>
                <span style={{ fontWeight: 500 }}>45 台</span>
              </Descriptions.Item>
              <Descriptions.Item label='部署类型'>
                <span style={{ fontWeight: 500 }}>{deployType === 'grayscale' ? '灰度发布' : '全量发布'}</span>
              </Descriptions.Item>
              <Descriptions.Item label='预计时长'>
                <span style={{ color: 'var(--text-secondary)' }}>2-4 小时</span>
              </Descriptions.Item>
            </Descriptions>
            <Alert
              type='warning'
              message='部署开始后将无法撤销，请确认所有配置信息正确'
              style={{ 
                marginTop: 'var(--spacing-md)',
                borderRadius: 'var(--border-radius)',
                fontSize: '13px',
                border: '1px solid var(--warning-color-light)',
                background: 'var(--warning-bg)'
              }}
            />
          </div>
        )}
      </Modal>
    </div>
  );
}

export default FirmwareManagement;