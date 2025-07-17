import React, { useState } from 'react';
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
  Row,
  Col,
  Typography,
  Divider,
  Collapse,
  Tabs,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  InfoCircleOutlined,
  HddOutlined,
  CodeOutlined,
} from '@ant-design/icons';

// 导入新创建的组件和配置
import { boardDetails, firmwareDetails, initialModelGroups, initialModels } from '../constants/modelData';
import { commonStyles, colors, statusColors, scenarioColors } from '../styles/modelStyles';
import BoardDetails from '../components/BoardDetails';
import FirmwareDetails from '../components/FirmwareDetails';
import { getModelColumns, getSubModelColumns } from '../config/tableColumns';

const { Option } = Select;
const { TextArea } = Input;
const { Title, Text } = Typography;
const { Panel } = Collapse;
const { TabPane } = Tabs;

function ModelManagement() {
  // 状态管理
  // 将initialModelGroups转换为平铺的模型数组
  const flattenedModels = Object.values(initialModelGroups).flatMap(group => 
    group.subModels ? group.subModels.map(subModel => ({
      id: subModel.modelCode,
      name: subModel.modelCode,
      model: subModel.modelCode,
      category: '智能锁',
      features: subModel.unlockMethods || [],
      supportedBoards: [subModel.boardVersion],
      ...subModel
    })) : []
  );
  const [modelsData, setModelsData] = useState(flattenedModels);
  const [modelGroupsData, setModelGroupsData] = useState(initialModelGroups);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentModel, setCurrentModel] = useState(null);
  const [form] = Form.useForm();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [currentDrawerData, setCurrentDrawerData] = useState(null);
  const [drawerType, setDrawerType] = useState('model'); // 'model', 'board', 'firmware'
  const [boardSidebarVisible, setBoardSidebarVisible] = useState(false);
  const [firmwareSidebarVisible, setFirmwareSidebarVisible] = useState(false);
  const [currentBoardData, setCurrentBoardData] = useState(null);
  const [currentFirmwareData, setCurrentFirmwareData] = useState(null);
  const [activeTab, setActiveTab] = useState('models');

  // 处理函数
  const handleAdd = () => {
    setIsEditMode(false);
    setCurrentModel(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setIsEditMode(true);
    setCurrentModel(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleView = (record) => {
    setCurrentDrawerData(record);
    setDrawerType('model');
    setDrawerVisible(true);
  };

  const handleDelete = (id) => {
    setModelsData(modelsData.filter(item => item.id !== id));
    message.success('删除成功');
  };

  const handleShowBoardDetails = (boardVersion) => {
    const board = boardDetails[boardVersion];
    if (board) {
      setCurrentBoardData(board);
      setBoardSidebarVisible(true);
    }
  };

  const handleShowFirmwareDetails = (firmwareVersion) => {
    const firmware = firmwareDetails[firmwareVersion];
    if (firmware) {
      setCurrentFirmwareData(firmware);
      setFirmwareSidebarVisible(true);
    }
  };

  const handleViewSubModel = (record) => {
    setCurrentDrawerData(record);
    setDrawerType('submodel');
    setDrawerVisible(true);
  };

  const handleEditSubModel = (record) => {
    // 子型号编辑逻辑
    message.info('子型号编辑功能');
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (isEditMode) {
        setModelsData(modelsData.map(item => 
          item.id === currentModel.id ? { ...item, ...values } : item
        ));
        message.success('更新成功');
      } else {
        const newModel = {
          id: Date.now(),
          ...values,
          createdAt: new Date().toISOString().split('T')[0]
        };
        setModelsData([...modelsData, newModel]);
        message.success('添加成功');
      }
      setIsModalVisible(false);
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  // 表格列配置
  const modelHandlers = {
    handleView,
    handleEdit,
    handleDelete,
    handleShowBoardDetails
  };

  const subModelHandlers = {
    handleViewSubModel,
    handleEditSubModel,
    handleShowBoardDetails
  };

  const modelColumns = getModelColumns(modelHandlers);
  const subModelColumns = getSubModelColumns(subModelHandlers);

  // 渲染子型号表格
  const renderSubModelTable = (subModels) => (
    <Table
      columns={subModelColumns}
      dataSource={subModels}
      pagination={false}
      size="small"
      rowKey="fullModel"
    />
  );

  // 渲染型号分组
  const renderModelGroups = () => (
    <Collapse defaultActiveKey={['M9']} style={{ marginTop: 16 }}>
      {Object.entries(modelGroupsData).map(([productModel, group]) => (
        <Panel 
          header={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 600 }}>{productModel} 系列</span>
              <Tag color={colors.blue}>{group.subModels?.length || 0} 个子型号</Tag>
            </div>
          } 
          key={productModel}
        >
          {renderSubModelTable(group.subModels || [])}
        </Panel>
      ))}
    </Collapse>
  );

  return (
    <div style={{ padding: '8px' }}>
      <Card bodyStyle={{ padding: '12px' }}>
        <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Title level={5} style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>型号管理</Title>
          </div>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} size="small">
            添加型号
          </Button>
        </div>

        <Tabs activeKey={activeTab} onChange={setActiveTab} size="small">
          <TabPane tab="智能锁型号" key="models">
            <Table
              columns={modelColumns}
              dataSource={modelsData}
              rowKey="id"
              size="small"
              pagination={{
                pageSize: 15,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total) => `共 ${total} 条记录`,
                size: 'small'
              }}
            />
          </TabPane>
          <TabPane tab="产品型号分组" key="groups">
            {renderModelGroups()}
          </TabPane>
        </Tabs>
      </Card>

      {/* 添加/编辑模态框 */}
      <Modal
        title={isEditMode ? '编辑型号' : '添加型号'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="name" label="型号名称" rules={[{ required: true, message: '请输入型号名称' }]}>
                <Input placeholder="请输入型号名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="model" label="型号代码" rules={[{ required: true, message: '请输入型号代码' }]}>
                <Input placeholder="请输入型号代码" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="category" label="分类" rules={[{ required: true, message: '请选择分类' }]}>
                <Select placeholder="请选择分类">
                  <Option value="高端型">高端型</Option>
                  <Option value="标准型">标准型</Option>
                  <Option value="经济型">经济型</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="status" label="状态" rules={[{ required: true, message: '请选择状态' }]}>
                <Select placeholder="请选择状态">
                  <Option value="active">启用</Option>
                  <Option value="development">开发中</Option>
                  <Option value="deprecated">已弃用</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="description" label="描述">
            <TextArea rows={3} placeholder="请输入描述" />
          </Form.Item>
        </Form>
      </Modal>

      {/* 详情抽屉 */}
      <Drawer
        title={drawerType === 'model' ? '型号详情' : '子型号详情'}
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={600}
      >
        {currentDrawerData && (
          <Descriptions column={1} bordered>
            <Descriptions.Item label="名称">{currentDrawerData.name || currentDrawerData.fullModel}</Descriptions.Item>
            <Descriptions.Item label="型号">{currentDrawerData.model || currentDrawerData.modelCode}</Descriptions.Item>
            {drawerType === 'model' && (
              <>
                <Descriptions.Item label="分类">{currentDrawerData.category}</Descriptions.Item>
                <Descriptions.Item label="功能">
                  {currentDrawerData.features?.map((feature, index) => (
                    <Tag key={index} style={{ marginBottom: 4 }}>{feature}</Tag>
                  ))}
                </Descriptions.Item>
              </>
            )}
            {drawerType === 'submodel' && (
              <>
                <Descriptions.Item label="通信类型">{currentDrawerData.communicationType}</Descriptions.Item>
                <Descriptions.Item label="开锁方式">
                  {currentDrawerData.unlockMethods?.map((method, index) => (
                    <Tag key={index} style={{ marginBottom: 4 }}>{method}</Tag>
                  ))}
                </Descriptions.Item>
                <Descriptions.Item label="主板版本">{currentDrawerData.boardVersion}</Descriptions.Item>
                <Descriptions.Item label="适配场景">{currentDrawerData.scenario}</Descriptions.Item>
              </>
            )}
            <Descriptions.Item label="状态">
              <Tag color={statusColors[currentDrawerData.status]}>
                {currentDrawerData.status === 'active' ? '启用' : currentDrawerData.status === 'development' ? '开发中' : '已弃用'}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="描述">{currentDrawerData.description}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{currentDrawerData.createdAt}</Descriptions.Item>
          </Descriptions>
        )}
      </Drawer>

      {/* 主板详情侧边栏 */}
      <Drawer
        title="主板详情"
        placement="right"
        onClose={() => setBoardSidebarVisible(false)}
        open={boardSidebarVisible}
        width={600}
      >
        <BoardDetails boardData={currentBoardData} />
      </Drawer>

      {/* 固件详情侧边栏 */}
      <Drawer
        title="固件详情"
        placement="right"
        onClose={() => setFirmwareSidebarVisible(false)}
        open={firmwareSidebarVisible}
        width={600}
      >
        <FirmwareDetails firmwareData={currentFirmwareData} />
      </Drawer>
    </div>
  );
}

export default ModelManagement;