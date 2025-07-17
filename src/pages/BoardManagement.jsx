import React, { useState } from 'react'
import {
  Card,
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Select,
  Tag,
  Descriptions,
  Drawer,
  message,
  Popconfirm,
  InputNumber,
} from 'antd'
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons'
import { boardDetails } from '../constants/modelData'

const { Option } = Select
const { TextArea } = Input

function BoardManagement() {
  // 将boardDetails转换为数组格式
  const boardsArray = Object.entries(boardDetails).map(([key, board], index) => ({
    id: index + 1,
    name: board.name,
    version: board.version,
    status: board.status === 'production' ? 'active' : board.status,
    description: board.description,
    // 外设模组信息
    mainController: board.mainController || {},
    communicationModules: board.communicationModules || [],
    inputModules: board.inputModules || [],
    outputModules: board.outputModules || [],
    securityModules: board.securityModules || [],
    extensionModules: board.extensionModules || [],
    supportedModels: board.supportedModels || [],
    supportedFirmwares: board.supportedFirmware || [],
    createdAt: board.releaseDate,
    updatedAt: board.releaseDate,
  }));
  
  const [boards, setBoards] = useState(boardsArray)

  const [modalVisible, setModalVisible] = useState(false)
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [editingBoard, setEditingBoard] = useState(null)
  const [viewingBoard, setViewingBoard] = useState(null)
  const [form] = Form.useForm()

  const statusMap = {
    active: { text: '生产中', color: 'green' },
    development: { text: '开发中', color: 'orange' },
    discontinued: { text: '已停产', color: 'red' },
    testing: { text: '测试中', color: 'blue' },
  }

  const columns = [
    {
      title: '主板信息',
      dataIndex: 'name',
      width: 180,
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: 500 }}>{text}</div>
          <div style={{ fontSize: 12, color: '#666' }}>v{record.version}</div>
        </div>
      ),
    },
    {
      title: '主控芯片',
      dataIndex: 'mainController',
      width: 120,
      render: (controller) => (
        <div>
          <div style={{ fontWeight: 500 }}>{controller.model || 'N/A'}</div>
          <div style={{ fontSize: 12, color: '#666' }}>{controller.frequency || ''}</div>
        </div>
      ),
    },
    {
      title: '通信模组',
      dataIndex: 'communicationModules',
      width: 120,
      render: (modules) => (
        <div>
          {modules?.slice(0, 2).map((module, index) => (
            <Tag key={index} size="small" color="blue" style={{ marginBottom: 2 }}>
              {module.type} x{module.count}
            </Tag>
          ))}
          {modules?.length > 2 && (
            <Tag size="small" color="gray">+{modules.length - 2}</Tag>
          )}
        </div>
      ),
    },
    {
      title: '输入模组',
      dataIndex: 'inputModules',
      width: 150,
      render: (modules) => (
        <div>
          {modules?.slice(0, 2).map((module, index) => (
            <Tag key={index} size="small" color="green" style={{ marginBottom: 2 }}>
              {module.type} x{module.count}
            </Tag>
          ))}
          {modules?.length > 2 && (
            <Tag size="small" color="gray">+{modules.length - 2}</Tag>
          )}
        </div>
      ),
    },
    {
      title: '输出模组',
      dataIndex: 'outputModules',
      width: 120,
      render: (modules) => (
        <div>
          {modules?.slice(0, 2).map((module, index) => (
            <Tag key={index} size="small" color="orange" style={{ marginBottom: 2 }}>
              {module.type} x{module.count}
            </Tag>
          ))}
          {modules?.length > 2 && (
            <Tag size="small" color="gray">+{modules.length - 2}</Tag>
          )}
        </div>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: (status) => {
        const config = statusMap[status]
        return <Tag color={config.color}>{config.text}</Tag>
      },
    },
    {
      title: '支持型号',
      dataIndex: 'supportedModels',
      width: 150,
      render: (models) => (
        <div>
          {models?.slice(0, 2).map((model, index) => (
            <Tag key={index} size="small" color="blue" style={{ marginBottom: 2 }}>
              {model}
            </Tag>
          ))}
          {models?.length > 2 && (
            <Tag size="small" color="gray">+{models.length - 2}</Tag>
          )}
        </div>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      width: 120,
    },
    {
      title: '操作',
      width: 180,
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          >
            详情
          </Button>
          <Button
            type="text"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个主板吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button
              type="text"
              size="small"
              danger
              icon={<DeleteOutlined />}
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const handleAdd = () => {
    setEditingBoard(null)
    form.resetFields()
    setModalVisible(true)
  }

  const handleEdit = (record) => {
    setEditingBoard(record)
    form.setFieldsValue({
      ...record,
      mainControllerModel: record.mainController?.model || '',
      mainControllerArchitecture: record.mainController?.architecture || '',
      mainControllerFrequency: record.mainController?.frequency || '',
      mainControllerMemory: record.mainController?.memory || '',
      communicationTypes: record.communicationModules?.map(m => m.type) || [],
      inputTypes: record.inputModules?.map(m => m.type) || [],
      outputTypes: record.outputModules?.map(m => m.type) || [],
      securityTypes: record.securityModules?.map(m => m.type) || [],
      extensionTypes: record.extensionModules?.map(m => m.type) || [],
    })
    setModalVisible(true)
  }

  const handleView = (record) => {
    setViewingBoard(record)
    setDrawerVisible(true)
  }

  const handleDelete = (id) => {
    setBoards(boards.filter(board => board.id !== id))
    message.success('删除成功')
  }

  const handleSave = async () => {
    try {
      const values = await form.validateFields()
      const boardData = {
        ...values,
        mainController: {
          model: values.mainControllerModel,
          architecture: values.mainControllerArchitecture,
          frequency: values.mainControllerFrequency,
          memory: values.mainControllerMemory,
        },
        communicationModules: values.communicationTypes?.map(type => ({ type, count: 1 })) || [],
        inputModules: values.inputTypes?.map(type => ({ type, count: 1 })) || [],
        outputModules: values.outputTypes?.map(type => ({ type, count: 1 })) || [],
        securityModules: values.securityTypes?.map(type => ({ type, count: 1 })) || [],
        extensionModules: values.extensionTypes?.map(type => ({ type, count: 1 })) || [],
        id: editingBoard ? editingBoard.id : Date.now(),
        createdAt: editingBoard ? editingBoard.createdAt : new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
      }

      // 移除临时字段
      delete boardData.mainControllerModel
      delete boardData.mainControllerArchitecture
      delete boardData.mainControllerFrequency
      delete boardData.mainControllerMemory
      delete boardData.communicationTypes
      delete boardData.inputTypes
      delete boardData.outputTypes
      delete boardData.securityTypes
      delete boardData.extensionTypes

      if (editingBoard) {
        setBoards(boards.map(board => 
          board.id === editingBoard.id ? boardData : board
        ))
        message.success('更新成功')
      } else {
        setBoards([...boards, boardData])
        message.success('添加成功')
      }

      setModalVisible(false)
      form.resetFields()
    } catch (error) {
      console.error('表单验证失败:', error)
    }
  }

  return (
    <div style={{ padding: '8px' }}>
      <Card bodyStyle={{ padding: '12px' }}>
        <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#1f2937' }}>主板管理</h3>
          </div>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} size="small">
            添加主板
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={boards}
          rowKey="id"
          size="small"
          pagination={{
            pageSize: 15,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            showSizeChanger: true,
            showQuickJumper: true,
            size: 'small'
          }}
        />
      </Card>

      {/* 添加/编辑模态框 */}
      <Modal
        title={editingBoard ? '编辑主板' : '添加主板'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleSave}
        width={800}
      >
        <Form form={form} layout="vertical">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Form.Item
              label="主板名称"
              name="name"
              rules={[{ required: true, message: '请输入主板名称' }]}
            >
              <Input placeholder="请输入主板名称" />
            </Form.Item>

            <Form.Item
              label="版本号"
              name="version"
              rules={[{ required: true, message: '请输入版本号' }]}
            >
              <Input placeholder="请输入版本号" />
            </Form.Item>

            <Form.Item
              label="状态"
              name="status"
              rules={[{ required: true, message: '请选择状态' }]}
            >
              <Select placeholder="请选择状态">
                <Option value="active">生产中</Option>
                <Option value="development">开发中</Option>
                <Option value="testing">测试中</Option>
                <Option value="discontinued">已停产</Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item
            label="描述"
            name="description"
          >
            <TextArea rows={2} placeholder="请输入主板描述" />
          </Form.Item>

          <div style={{ marginBottom: 16, fontWeight: 500 }}>主控芯片</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Form.Item
              label="芯片型号"
              name="mainControllerModel"
              rules={[{ required: true, message: '请输入主控芯片型号' }]}
            >
              <Input placeholder="如：ESP32-C3" />
            </Form.Item>

            <Form.Item
              label="架构"
              name="mainControllerArchitecture"
            >
              <Input placeholder="如：RISC-V" />
            </Form.Item>

            <Form.Item
              label="频率"
              name="mainControllerFrequency"
            >
              <Input placeholder="如：160MHz" />
            </Form.Item>

            <Form.Item
              label="内存"
              name="mainControllerMemory"
            >
              <Input placeholder="如：400KB SRAM" />
            </Form.Item>
          </div>

          <div style={{ marginBottom: 16, fontWeight: 500 }}>通信模组</div>
          <Form.Item
            label="通信模组类型"
            name="communicationTypes"
          >
            <Select mode="multiple" placeholder="请选择通信模组类型">
              <Option value="Cat.1">Cat.1</Option>
              <Option value="WiFi">WiFi</Option>
              <Option value="Bluetooth">蓝牙</Option>
              <Option value="LoRa">LoRa</Option>
              <Option value="NB-IoT">NB-IoT</Option>
            </Select>
          </Form.Item>

          <div style={{ marginBottom: 16, fontWeight: 500 }}>输入模组</div>
          <Form.Item
            label="输入模组类型"
            name="inputTypes"
          >
            <Select mode="multiple" placeholder="请选择输入模组类型">
              <Option value="人像识别器">人像识别器</Option>
              <Option value="触控密码板">触控密码板</Option>
              <Option value="指纹识别器">指纹识别器</Option>
              <Option value="刷卡器">刷卡器</Option>
              <Option value="按键">按键</Option>
            </Select>
          </Form.Item>

          <div style={{ marginBottom: 16, fontWeight: 500 }}>输出模组</div>
          <Form.Item
            label="输出模组类型"
            name="outputTypes"
          >
            <Select mode="multiple" placeholder="请选择输出模组类型">
              <Option value="LED">LED</Option>
              <Option value="蜂鸣器">蜂鸣器</Option>
              <Option value="显示屏">显示屏</Option>
              <Option value="语音播报">语音播报</Option>
            </Select>
          </Form.Item>

          <div style={{ marginBottom: 16, fontWeight: 500 }}>安全模组</div>
          <Form.Item
            label="安全模组类型"
            name="securityTypes"
          >
            <Select mode="multiple" placeholder="请选择安全模组类型">
              <Option value="指纹识别器">指纹识别器</Option>
              <Option value="加密芯片">加密芯片</Option>
              <Option value="安全元件">安全元件</Option>
            </Select>
          </Form.Item>

          <div style={{ marginBottom: 16, fontWeight: 500 }}>扩展模组</div>
          <Form.Item
            label="扩展模组类型"
            name="extensionTypes"
          >
            <Select mode="multiple" placeholder="请选择扩展模组类型">
              <Option value="RGB灯">RGB灯</Option>
              <Option value="传感器">传感器</Option>
              <Option value="摄像头">摄像头</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="支持型号"
            name="supportedModels"
            rules={[{ required: true, message: '请选择支持的型号' }]}
          >
            <Select mode="multiple" placeholder="请选择支持的型号">
              <Option value="SmartLock Pro X1">SmartLock Pro X1</Option>
              <Option value="SmartLock Pro X2">SmartLock Pro X2</Option>
              <Option value="SmartLock Basic A2">SmartLock Basic A2</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="支持固件"
            name="supportedFirmwares"
            rules={[{ required: true, message: '请选择支持的固件' }]}
          >
            <Select mode="multiple" placeholder="请选择支持的固件">
              <Option value="v2.3.1">v2.3.1</Option>
              <Option value="v2.4.0-beta">v2.4.0-beta</Option>
              <Option value="v2.5.0-alpha">v2.5.0-alpha</Option>
              <Option value="v1.8.3">v1.8.3</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* 详情抽屉 */}
      <Drawer
        title={
          <span style={{
            fontSize: '17px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            letterSpacing: '-0.01em'
          }}>
            主板详情
          </span>
        }
        open={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        width={600}
        className="linear-sidebar-card"
        headerStyle={{
          borderBottom: '1px solid var(--color-border-light)',
          padding: '16px 24px'
        }}
        bodyStyle={{ padding: '24px' }}
      >
        {viewingBoard && (
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
                <Descriptions.Item label="主板名称">{viewingBoard.name}</Descriptions.Item>
                <Descriptions.Item label="版本号">
                  <code style={{
                    background: 'var(--color-background-secondary)',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-text-primary)',
                    border: '1px solid var(--color-border-light)'
                  }}>
                    v{viewingBoard.version}
                  </code>
                </Descriptions.Item>
                <Descriptions.Item label="状态">
                  <Tag color={statusMap[viewingBoard.status].color} style={{
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 500,
                    padding: '2px 8px',
                    height: '24px',
                    lineHeight: '20px'
                  }}>
                    {statusMap[viewingBoard.status].text}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="描述">{viewingBoard.description}</Descriptions.Item>
              </Descriptions>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '16px',
                letterSpacing: '-0.01em',
                lineHeight: '24px'
              }}>主控芯片</h4>
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
                <Descriptions.Item label="型号">{viewingBoard.mainController?.model || '-'}</Descriptions.Item>
                <Descriptions.Item label="架构">{viewingBoard.mainController?.architecture || '-'}</Descriptions.Item>
                <Descriptions.Item label="频率">{viewingBoard.mainController?.frequency || '-'}</Descriptions.Item>
                <Descriptions.Item label="内存">{viewingBoard.mainController?.memory || '-'}</Descriptions.Item>
              </Descriptions>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '16px',
                letterSpacing: '-0.01em',
                lineHeight: '24px'
              }}>外设模组</h4>
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
                <Descriptions.Item label="通信模组">
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                    {viewingBoard.communicationModules?.map((module, index) => (
                      <Tag key={index} color="blue" style={{
                        marginBottom: 0,
                        borderRadius: '6px',
                        fontSize: '12px',
                        border: 'none',
                        fontWeight: 500,
                        padding: '2px 8px',
                        height: '24px',
                        lineHeight: '20px'
                      }}>{module.type}</Tag>
                    )) || '-'}
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label="输入模组">
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                    {viewingBoard.inputModules?.map((module, index) => (
                      <Tag key={index} color="green" style={{
                        marginBottom: 0,
                        borderRadius: '6px',
                        fontSize: '12px',
                        border: 'none',
                        fontWeight: 500,
                        padding: '2px 8px',
                        height: '24px',
                        lineHeight: '20px'
                      }}>{module.type}</Tag>
                    )) || '-'}
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label="输出模组">
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                    {viewingBoard.outputModules?.map((module, index) => (
                      <Tag key={index} color="orange" style={{
                        marginBottom: 0,
                        borderRadius: '6px',
                        fontSize: '12px',
                        border: 'none',
                        fontWeight: 500,
                        padding: '2px 8px',
                        height: '24px',
                        lineHeight: '20px'
                      }}>{module.type}</Tag>
                    )) || '-'}
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label="安全模组">
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                    {viewingBoard.securityModules?.map((module, index) => (
                      <Tag key={index} color="red" style={{
                        marginBottom: 0,
                        borderRadius: '6px',
                        fontSize: '12px',
                        border: 'none',
                        fontWeight: 500,
                        padding: '2px 8px',
                        height: '24px',
                        lineHeight: '20px'
                      }}>{module.type}</Tag>
                    )) || '-'}
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label="扩展模组">
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                    {viewingBoard.extensionModules?.map((module, index) => (
                      <Tag key={index} color="purple" style={{
                        marginBottom: 0,
                        borderRadius: '6px',
                        fontSize: '12px',
                        border: 'none',
                        fontWeight: 500,
                        padding: '2px 8px',
                        height: '24px',
                        lineHeight: '20px'
                      }}>{module.type}</Tag>
                    )) || '-'}
                  </div>
                </Descriptions.Item>
              </Descriptions>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '16px',
                letterSpacing: '-0.01em',
                lineHeight: '24px'
              }}>兼容性信息</h4>
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
                <Descriptions.Item label="支持型号">
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                    {viewingBoard.supportedModels.map((model, index) => (
                      <Tag key={index} color="blue" style={{
                        marginBottom: 0,
                        borderRadius: '6px',
                        fontSize: '12px',
                        border: 'none',
                        fontWeight: 500,
                        padding: '2px 8px',
                        height: '24px',
                        lineHeight: '20px'
                      }}>{model}</Tag>
                    ))}
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label="支持固件">
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                    {viewingBoard.supportedFirmwares.map((firmware, index) => (
                      <Tag key={index} color="green" style={{
                        marginBottom: 0,
                        borderRadius: '6px',
                        fontSize: '12px',
                        border: 'none',
                        fontWeight: 500,
                        padding: '2px 8px',
                        height: '24px',
                        lineHeight: '20px'
                      }}>{firmware}</Tag>
                    ))}
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label="创建时间">{viewingBoard.createdAt}</Descriptions.Item>
                <Descriptions.Item label="更新时间">{viewingBoard.updatedAt}</Descriptions.Item>
              </Descriptions>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  )
}

export default BoardManagement