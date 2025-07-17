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
  Tabs,
  Alert,
  Tooltip,
} from 'antd'
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import { message } from 'antd'

const { Option } = Select
const { TabPane } = Tabs

function CompatibilityMatrix() {
  const [activeTab, setActiveTab] = useState('model-board')
  const [modalVisible, setModalVisible] = useState(false)
  const [editingItem, setEditingItem] = useState(null)

  // 型号-主板兼容性数据
  const modelBoardMatrix = [
    {
      id: 1,
      model: 'SmartLock Pro X1',
      modelCode: 'SL-PRO-X1',
      board: 'ESP32-S3-V2.1',
      boardVersion: '2.1.0',
      compatible: true,
      tested: true,
      notes: '完全兼容，推荐使用',
      lastTest: '2024-01-10',
    },
    {
      id: 2,
      model: 'SmartLock Pro X1',
      modelCode: 'SL-PRO-X1',
      board: 'ESP32-S3-V2.0',
      boardVersion: '2.0.5',
      compatible: true,
      tested: true,
      notes: '兼容，但建议升级到v2.1',
      lastTest: '2024-01-08',
    },
    {
      id: 3,
      model: 'SmartLock Basic A2',
      modelCode: 'SL-BASIC-A2',
      board: 'ESP32-C3-V1.5',
      boardVersion: '1.5.2',
      compatible: true,
      tested: true,
      notes: '标准配置',
      lastTest: '2024-01-12',
    },
    {
      id: 4,
      model: 'SmartLock Pro X2',
      modelCode: 'SL-PRO-X2',
      board: 'ESP32-S3-V2.2',
      boardVersion: '2.2.0',
      compatible: true,
      tested: false,
      notes: '新版本，待测试',
      lastTest: null,
    },
  ]

  // 主板-固件兼容性数据
  const boardFirmwareMatrix = [
    {
      id: 1,
      board: 'ESP32-S3-V2.1',
      boardVersion: '2.1.0',
      firmware: 'v2.3.1',
      firmwareType: 'stable',
      compatible: true,
      tested: true,
      performance: 'excellent',
      notes: '性能最佳',
      lastTest: '2024-01-10',
    },
    {
      id: 2,
      board: 'ESP32-S3-V2.1',
      boardVersion: '2.1.0',
      firmware: 'v2.4.0-beta',
      firmwareType: 'beta',
      compatible: true,
      tested: true,
      performance: 'good',
      notes: '测试版本，功能增强',
      lastTest: '2024-01-12',
    },
    {
      id: 3,
      board: 'ESP32-C3-V1.5',
      boardVersion: '1.5.2',
      firmware: 'v1.8.3',
      firmwareType: 'stable',
      compatible: true,
      tested: true,
      performance: 'good',
      notes: '稳定版本',
      lastTest: '2024-01-05',
    },
    {
      id: 4,
      board: 'ESP32-S3-V2.0',
      boardVersion: '2.0.5',
      firmware: 'v2.3.1',
      firmwareType: 'stable',
      compatible: false,
      tested: true,
      performance: 'poor',
      notes: '存在兼容性问题，不推荐',
      lastTest: '2024-01-08',
    },
  ]

  const modelBoardColumns = [
    {
      title: '设备型号',
      dataIndex: 'model',
      width: 150,
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: 500 }}>{text}</div>
          <div style={{ fontSize: 12, color: '#86909c' }}>{record.modelCode}</div>
        </div>
      ),
    },
    {
      title: '主板型号',
      dataIndex: 'board',
      width: 150,
      render: (text, record) => (
        <div>
          <div>{text}</div>
          <div style={{ fontSize: 12, color: '#86909c' }}>v{record.boardVersion}</div>
        </div>
      ),
    },
    {
      title: '兼容性',
      dataIndex: 'compatible',
      width: 100,
      render: (compatible, record) => (
        <div>
          <Tag color={compatible ? 'green' : 'red'} icon={compatible ? <CheckOutlined /> : <CloseOutlined />}>
            {compatible ? '兼容' : '不兼容'}
          </Tag>
          {record.tested ? (
            <Tag color='blue' style={{ marginTop: 4 }}>已测试</Tag>
          ) : (
            <Tag color='orange' style={{ marginTop: 4 }}>待测试</Tag>
          )}
        </div>
      ),
    },
    {
      title: '备注',
      dataIndex: 'notes',
      ellipsis: true,
    },
    {
      title: '最后测试',
      dataIndex: 'lastTest',
      width: 120,
      render: (date) => date || '未测试',
    },
    {
      title: '操作',
      width: 120,
      render: (_, record) => (
        <Space>
          <Button type='text' size='small' icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button type='text' size='small' danger icon={<DeleteOutlined />}>
            删除
          </Button>
        </Space>
      ),
    },
  ]

  const boardFirmwareColumns = [
    {
      title: '主板型号',
      dataIndex: 'board',
      width: 150,
      render: (text, record) => (
        <div>
          <div>{text}</div>
          <div style={{ fontSize: 12, color: '#86909c' }}>v{record.boardVersion}</div>
        </div>
      ),
    },
    {
      title: '固件版本',
      dataIndex: 'firmware',
      width: 120,
      render: (text, record) => (
        <div>
          <Tag color={record.firmwareType === 'stable' ? 'blue' : 'orange'}>{text}</Tag>
          <div style={{ fontSize: 12, color: '#86909c', marginTop: 4 }}>
            {record.firmwareType === 'stable' ? '稳定版' : '测试版'}
          </div>
        </div>
      ),
    },
    {
      title: '兼容性',
      dataIndex: 'compatible',
      width: 100,
      render: (compatible, record) => (
        <div>
          <Tag color={compatible ? 'green' : 'red'} icon={compatible ? <CheckOutlined /> : <CloseOutlined />}>
            {compatible ? '兼容' : '不兼容'}
          </Tag>
          {record.tested && (
            <Tag color='blue' style={{ marginTop: 4 }}>已测试</Tag>
          )}
        </div>
      ),
    },
    {
      title: '性能表现',
      dataIndex: 'performance',
      width: 100,
      render: (performance) => {
        const colorMap = {
          excellent: 'green',
          good: 'blue',
          fair: 'orange',
          poor: 'red',
        }
        const textMap = {
          excellent: '优秀',
          good: '良好',
          fair: '一般',
          poor: '较差',
        }
        return <Tag color={colorMap[performance]}>{textMap[performance]}</Tag>
      },
    },
    {
      title: '备注',
      dataIndex: 'notes',
      ellipsis: true,
    },
    {
      title: '最后测试',
      dataIndex: 'lastTest',
      width: 120,
      render: (date) => date || '未测试',
    },
    {
      title: '操作',
      width: 120,
      render: (_, record) => (
        <Space>
          <Button type='text' size='small' icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button type='text' size='small' danger icon={<DeleteOutlined />}>
            删除
          </Button>
        </Space>
      ),
    },
  ]

  const handleEdit = (record) => {
    setEditingItem(record)
    setModalVisible(true)
  }

  const handleAdd = () => {
    setEditingItem(null)
    setModalVisible(true)
  }

  const handleSave = () => {
    message.success('保存成功')
    setModalVisible(false)
    setEditingItem(null)
  }

  const getCompatibilityStats = (data) => {
    const total = data.length
    const compatible = data.filter(item => item.compatible).length
    const tested = data.filter(item => item.tested).length
    return { total, compatible, tested }
  }

  const modelBoardStats = getCompatibilityStats(modelBoardMatrix)
  const boardFirmwareStats = getCompatibilityStats(boardFirmwareMatrix)

  return (
    <div className='page-container'>
      <div className='page-header'>
        <h1 className='page-title'>兼容性矩阵</h1>
        <p className='page-description'>管理设备型号、主板和固件之间的兼容关系</p>
      </div>

      {/* 兼容性概览 */}
      <Alert
        type='info'
        icon={<ExclamationCircleOutlined />}
        title='兼容性概览'
        content={
          <div style={{ marginTop: 8 }}>
            <Space size='large'>
              <span>型号-主板: {modelBoardStats.compatible}/{modelBoardStats.total} 兼容</span>
              <span>主板-固件: {boardFirmwareStats.compatible}/{boardFirmwareStats.total} 兼容</span>
              <span>测试覆盖率: {Math.round(((modelBoardStats.tested + boardFirmwareStats.tested) / (modelBoardStats.total + boardFirmwareStats.total)) * 100)}%</span>
            </Space>
          </div>
        }
        style={{ marginBottom: 16 }}
      />

      <Card>
        <Tabs activeTab={activeTab} onChange={setActiveTab}>
          <TabPane key='model-board' title='型号-主板兼容性'>
            <div style={{ marginBottom: 16 }}>
              <Button type='primary' icon={<PlusOutlined />} onClick={handleAdd}>
                添加兼容性配置
              </Button>
            </div>
            <Table
              columns={modelBoardColumns}
              dataSource={modelBoardMatrix}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
              }}
            />
          </TabPane>
          
          <TabPane key='board-firmware' title='主板-固件兼容性'>
            <div style={{ marginBottom: 16 }}>
              <Button type='primary' icon={<PlusOutlined />} onClick={handleAdd}>
                添加兼容性配置
              </Button>
            </div>
            <Table
              columns={boardFirmwareColumns}
              dataSource={boardFirmwareMatrix}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
              }}
            />
          </TabPane>
        </Tabs>
      </Card>

      {/* 编辑/添加模态框 */}
      <Modal
        title={editingItem ? '编辑兼容性配置' : '添加兼容性配置'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleSave}
        width={600}
      >
        <Form layout='vertical'>
          {activeTab === 'model-board' ? (
            <>
              <Form.Item label='设备型号' name='model' required>
                <Select placeholder='选择设备型号'>
                  <Option value='SL-PRO-X1'>SmartLock Pro X1</Option>
                  <Option value='SL-PRO-X2'>SmartLock Pro X2</Option>
                  <Option value='SL-BASIC-A2'>SmartLock Basic A2</Option>
                </Select>
              </Form.Item>
              <Form.Item label='主板型号' name='board' required>
                <Select placeholder='选择主板型号'>
                  <Option value='ESP32-S3-V2.1'>ESP32-S3-V2.1</Option>
                  <Option value='ESP32-S3-V2.2'>ESP32-S3-V2.2</Option>
                  <Option value='ESP32-C3-V1.5'>ESP32-C3-V1.5</Option>
                </Select>
              </Form.Item>
            </>
          ) : (
            <>
              <Form.Item label='主板型号' name='board' required>
                <Select placeholder='选择主板型号'>
                  <Option value='ESP32-S3-V2.1'>ESP32-S3-V2.1</Option>
                  <Option value='ESP32-S3-V2.2'>ESP32-S3-V2.2</Option>
                  <Option value='ESP32-C3-V1.5'>ESP32-C3-V1.5</Option>
                </Select>
              </Form.Item>
              <Form.Item label='固件版本' name='firmware' required>
                <Select placeholder='选择固件版本'>
                  <Option value='v2.3.1'>v2.3.1 (稳定版)</Option>
                  <Option value='v2.4.0-beta'>v2.4.0-beta (测试版)</Option>
                  <Option value='v1.8.3'>v1.8.3 (稳定版)</Option>
                </Select>
              </Form.Item>
            </>
          )}
          
          <Form.Item label='兼容性状态' name='compatible' required>
            <Select placeholder='选择兼容性状态'>
              <Option value={true}>兼容</Option>
              <Option value={false}>不兼容</Option>
            </Select>
          </Form.Item>
          
          <Form.Item label='测试状态' name='tested'>
            <Select placeholder='选择测试状态'>
              <Option value={true}>已测试</Option>
              <Option value={false}>待测试</Option>
            </Select>
          </Form.Item>
          
          {activeTab === 'board-firmware' && (
            <Form.Item label='性能表现' name='performance'>
              <Select placeholder='选择性能表现'>
                <Option value='excellent'>优秀</Option>
                <Option value='good'>良好</Option>
                <Option value='fair'>一般</Option>
                <Option value='poor'>较差</Option>
              </Select>
            </Form.Item>
          )}
          
          <Form.Item label='备注' name='notes'>
            <Input.TextArea placeholder='请输入备注信息' rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default CompatibilityMatrix