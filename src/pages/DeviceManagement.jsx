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
  Descriptions,
  Badge,
  Drawer,
  Form,
  message,
} from 'antd'
import { SearchOutlined, PlusOutlined, EditOutlined, EyeOutlined, ReloadOutlined } from '@ant-design/icons'


const { Option } = Select



function DeviceManagement() {
  const [searchText, setSearchText] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [modelFilter, setModelFilter] = useState('all')
  const [selectedDevice, setSelectedDevice] = useState(null)
  const [detailVisible, setDetailVisible] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  // 模拟设备数据
  const devices = [
    {
      id: 'SL-2024-001',
      model: 'SmartLock Pro X1',
      modelCode: 'SL-PRO-X1',
      board: 'ESP32-S3-V2.1',
      boardVersion: '2.1.0',
      firmware: 'v2.3.1',
      firmwareDate: '2024-01-10',
      status: 'online',
      lastSync: '2024-01-15 14:30:25',
      location: '北京市朝阳区办公楼A座',
      features: ['指纹识别', '密码开锁', '蓝牙连接', 'WiFi连接'],
      algorithms: ['AES-256', 'RSA-2048'],
      batteryLevel: 85,
      signalStrength: -45,
    },
    {
      id: 'SL-2024-002',
      model: 'SmartLock Basic A2',
      modelCode: 'SL-BASIC-A2',
      board: 'ESP32-C3-V1.5',
      boardVersion: '1.5.2',
      firmware: 'v1.8.3',
      firmwareDate: '2024-01-05',
      status: 'offline',
      lastSync: '2024-01-15 12:15:10',
      location: '上海市浦东新区住宅小区B栋',
      features: ['密码开锁', '蓝牙连接'],
      algorithms: ['AES-128'],
      batteryLevel: 23,
      signalStrength: -78,
    },
    {
      id: 'SL-2024-003',
      model: 'SmartLock Pro X2',
      modelCode: 'SL-PRO-X2',
      board: 'ESP32-S3-V2.2',
      boardVersion: '2.2.0',
      firmware: 'v2.4.0-beta',
      firmwareDate: '2024-01-12',
      status: 'online',
      lastSync: '2024-01-15 14:28:45',
      location: '深圳市南山区科技园C座',
      features: ['指纹识别', '人脸识别', '密码开锁', 'NFC开锁', 'WiFi连接'],
      algorithms: ['AES-256', 'RSA-4096', 'ECC-P256'],
      batteryLevel: 92,
      signalStrength: -38,
    },
  ]

  const columns = [
    {
      title: '设备ID',
      dataIndex: 'id',
      width: 120,
      fixed: 'left',
    },
    {
      title: '型号',
      dataIndex: 'model',
      width: 150,
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: 600, color: '#111827', fontSize: '14px' }}>{text}</div>
          <div style={{ fontSize: 12, color: '#9ca3af', marginTop: '2px' }}>{record.modelCode}</div>
        </div>
      ),
    },
    {
      title: '主板信息',
      dataIndex: 'board',
      width: 150,
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: 500, color: '#374151' }}>{text}</div>
          <div style={{ fontSize: 12, color: '#9ca3af', marginTop: '2px' }}>v{record.boardVersion}</div>
        </div>
      ),
    },
    {
      title: '固件版本',
      dataIndex: 'firmware',
      width: 120,
      render: (text, record) => (
        <div>
          <Tag 
            color={text.includes('beta') ? 'orange' : 'blue'}
            style={{
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 500,
              border: 'none'
            }}
          >
            {text}
          </Tag>
          <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>
            {record.firmwareDate}
          </div>
        </div>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: (status, record) => (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: status === 'online' ? '#10b981' : '#ef4444'
            }} />
            <span style={{ 
              fontSize: '13px', 
              fontWeight: 500,
              color: status === 'online' ? '#10b981' : '#ef4444'
            }}>
              {status === 'online' ? '在线' : '离线'}
            </span>
          </div>
          <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>
            电量: {record.batteryLevel}%
          </div>
        </div>
      ),
    },
    {
      title: '最后同步',
      dataIndex: 'lastSync',
      width: 150,
    },
    {
      title: '位置',
      dataIndex: 'location',
      width: 200,
      ellipsis: true,
    },
    {
      title: '操作',
      width: 150,
      fixed: 'right',
      render: (_, record) => (
        <Space size={4}>
          <Button
            type='text'
            size='small'
            icon={<EyeOutlined />}
            onClick={() => handleViewDetail(record)}
            style={{
              color: '#6b7280',
              borderRadius: '6px',
              height: '28px',
              fontSize: '12px'
            }}
          >
            查看
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
            icon={<ReloadOutlined />}
            onClick={() => handleSync(record)}
            style={{
              color: '#6b7280',
              borderRadius: '6px',
              height: '28px',
              fontSize: '12px'
            }}
          >
            同步
          </Button>
        </Space>
      ),
    },
  ]

  const handleViewDetail = (device) => {
    setSelectedDevice(device)
    setDetailVisible(true)
  }

  const handleEdit = (device) => {
    setSelectedDevice(device)
    setEditVisible(true)
  }

  const handleSync = async (device) => {
    setLoading(true)
    try {
      // 模拟同步操作
      await new Promise(resolve => setTimeout(resolve, 1000))
      message.success(`设备 ${device.id} 同步成功`)
    } catch (error) {
      message.error('同步失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.id.toLowerCase().includes(searchText.toLowerCase()) ||
                         device.model.toLowerCase().includes(searchText.toLowerCase())
    const matchesStatus = statusFilter === 'all' || device.status === statusFilter
    const matchesModel = modelFilter === 'all' || device.modelCode === modelFilter
    return matchesSearch && matchesStatus && matchesModel
  })

  return (
    <div className='page-container' style={{ padding: '24px' }}>
      <div className='page-header'>
        <h1 className='page-title'>设备管理</h1>
        <p className='page-description'>管理所有智能锁设备的基本信息、状态和配置</p>
      </div>

      {/* 搜索和筛选 */}
      <Card 
        style={{ marginBottom: 16 }}
        bodyStyle={{ padding: '20px 24px' }}
      >
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <Space size={16}>
            <Input
              style={{ 
                width: 320,
                borderRadius: '8px',
                backgroundColor: '#f8fafc'
              }}
              placeholder='搜索设备ID或型号...'
              prefix={<SearchOutlined style={{ color: '#9ca3af' }} />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
            <Select
              style={{ width: 140 }}
              placeholder='设备状态'
              value={statusFilter}
              onChange={setStatusFilter}
              suffixIcon={null}
            >
              <Option value='all'>全部状态</Option>
              <Option value='online'>在线</Option>
              <Option value='offline'>离线</Option>
            </Select>
            <Select
              style={{ width: 180 }}
              placeholder='设备型号'
              value={modelFilter}
              onChange={setModelFilter}
              suffixIcon={null}
            >
              <Option value='all'>全部型号</Option>
              <Option value='SL-PRO-X1'>SmartLock Pro X1</Option>
              <Option value='SL-PRO-X2'>SmartLock Pro X2</Option>
              <Option value='SL-BASIC-A2'>SmartLock Basic A2</Option>
            </Select>
          </Space>
          <Button 
            type='primary' 
            icon={<PlusOutlined />}
            style={{
              borderRadius: '8px',
              height: '36px',
              fontWeight: 500,
              boxShadow: '0 2px 4px rgba(94, 106, 210, 0.2)'
            }}
          >
            添加设备
          </Button>
        </div>
      </Card>

      {/* 设备列表 */}
      <Card
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '6px',
              height: '20px',
              backgroundColor: '#5e6ad2',
              borderRadius: '3px'
            }} />
            <span style={{ fontSize: '16px', fontWeight: 600, color: '#111827' }}>设备列表</span>
            <span style={{ 
              fontSize: '14px', 
              color: '#6b7280',
              fontWeight: 400,
              marginLeft: '8px'
            }}>
              ({filteredDevices.length} 台设备)
            </span>
          </div>
        }
        bodyStyle={{ padding: '0' }}
      >
        <Table
          columns={columns}
          dataSource={filteredDevices}
          loading={loading}
          pagination={{
            total: filteredDevices.length,
            pageSize: 10,
            showTotal: (total, range) => (
              <span style={{ color: '#6b7280', fontSize: '14px' }}>
                显示 {range[0]}-{range[1]} 条，共 {total} 条记录
              </span>
            ),
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50'],
            style: { padding: '16px 24px' }
          }}
          scroll={{ x: 1200 }}
          size='middle'
          rowKey='id'
        />
      </Card>

      {/* 设备详情抽屉 */}
      <Drawer
        width={600}
        title={
          <span style={{
            fontSize: '17px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            letterSpacing: '-0.01em'
          }}>
            设备详情
          </span>
        }
        open={detailVisible}
        onClose={() => setDetailVisible(false)}
        footer={null}
        className="linear-sidebar-card"
        headerStyle={{
          borderBottom: '1px solid var(--color-border-light)',
          padding: '16px 24px'
        }}
        bodyStyle={{ padding: '24px' }}
      >
        {selectedDevice && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '16px',
                letterSpacing: '-0.01em',
                lineHeight: '24px'
              }}>基本信息</h4>
              <Descriptions
                column={1}
                className="linear-sidebar-descriptions"
                style={{ marginBottom: '16px' }}
                labelStyle={{
                  fontSize: '13px',
                  color: 'var(--color-text-secondary)',
                  fontWeight: 500,
                  width: '80px'
                }}
                contentStyle={{
                  fontSize: '13px',
                  color: 'var(--color-text-primary)',
                  fontWeight: 400
                }}
              >
                <Descriptions.Item label='设备ID'>
                  <code style={{
                    background: 'var(--color-background-secondary)',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-text-primary)',
                    border: '1px solid var(--color-border-light)'
                  }}>
                    {selectedDevice.id}
                  </code>
                </Descriptions.Item>
                <Descriptions.Item label='设备型号'>{selectedDevice.model}</Descriptions.Item>
                <Descriptions.Item label='型号代码'>
                  <code style={{
                    background: 'var(--color-background-secondary)',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-text-primary)',
                    border: '1px solid var(--color-border-light)'
                  }}>
                    {selectedDevice.modelCode}
                  </code>
                </Descriptions.Item>
                <Descriptions.Item label='主板型号'>{selectedDevice.board}</Descriptions.Item>
                <Descriptions.Item label='主板版本'>{selectedDevice.boardVersion}</Descriptions.Item>
                <Descriptions.Item label='固件版本'>{selectedDevice.firmware}</Descriptions.Item>
                <Descriptions.Item label='固件日期'>{selectedDevice.firmwareDate}</Descriptions.Item>
                <Descriptions.Item label='设备状态'>
                  <Tag color={selectedDevice.status === 'online' ? 'green' : 'red'} style={{
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 500,
                    padding: '2px 8px',
                    height: '24px',
                    lineHeight: '20px'
                  }}>
                    {selectedDevice.status === 'online' ? '在线' : '离线'}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label='最后同步'>{selectedDevice.lastSync}</Descriptions.Item>
                <Descriptions.Item label='安装位置'>{selectedDevice.location}</Descriptions.Item>
              </Descriptions>
            </div>
            
            <div>
              <h4 style={{
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '16px',
                letterSpacing: '-0.01em',
                lineHeight: '24px'
              }}>技术信息</h4>
              <Descriptions
                column={1}
                className="linear-sidebar-descriptions"
                labelStyle={{
                  fontSize: '13px',
                  color: 'var(--color-text-secondary)',
                  fontWeight: 500,
                  width: '80px'
                }}
                contentStyle={{
                  fontSize: '13px',
                  color: 'var(--color-text-primary)',
                  fontWeight: 400
                }}
              >
                <Descriptions.Item label='电池电量'>{selectedDevice.batteryLevel}%</Descriptions.Item>
                <Descriptions.Item label='信号强度'>{selectedDevice.signalStrength} dBm</Descriptions.Item>
                <Descriptions.Item label='支持功能'>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                    {selectedDevice.features.map(feature => (
                      <Tag key={feature} style={{
                        marginBottom: 0,
                        borderRadius: '6px',
                        fontSize: '12px',
                        border: '1px solid var(--color-border-light)',
                        background: 'var(--color-background-secondary)',
                        color: 'var(--color-text-primary)',
                        fontWeight: 500,
                        padding: '2px 8px',
                        height: '24px',
                        lineHeight: '20px'
                      }}>{feature}</Tag>
                    ))}
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label='加密算法'>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                    {selectedDevice.algorithms.map(algo => (
                      <Tag key={algo} color='blue' style={{
                        marginBottom: 0,
                        borderRadius: '6px',
                        fontSize: '12px',
                        border: 'none',
                        fontWeight: 500,
                        padding: '2px 8px',
                        height: '24px',
                        lineHeight: '20px'
                      }}>{algo}</Tag>
                    ))}
                  </div>
                </Descriptions.Item>
              </Descriptions>
            </div>
          </div>
        )}
      </Drawer>

      {/* 编辑设备模态框 */}
      <Modal
        title='编辑设备信息'
        open={editVisible}
        onCancel={() => setEditVisible(false)}
        onOk={() => {
          message.success('设备信息更新成功')
          setEditVisible(false)
        }}
      >
        {selectedDevice && (
          <Form layout='vertical'>
            <Form.Item label='设备ID' name='id'>
              <Input defaultValue={selectedDevice.id} disabled />
            </Form.Item>
            <Form.Item label='安装位置' name='location'>
              <Input defaultValue={selectedDevice.location} />
            </Form.Item>
            <Form.Item label='备注' name='remark'>
              <Input.TextArea placeholder='请输入备注信息' />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  )
}

export default DeviceManagement;