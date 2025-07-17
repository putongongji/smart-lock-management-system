import React from 'react';
import { Tag, Space, Button, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined, InfoCircleOutlined, HddOutlined, CodeOutlined } from '@ant-design/icons';
import { statusColors, scenarioColors, colors } from '../styles/modelStyles';

// 型号管理表格列
export const getModelColumns = (handlers) => [
  {
    title: '型号',
    dataIndex: 'model',
    key: 'model',
    width: 120,
    render: (text) => (
      <span style={{ fontWeight: 600, fontSize: '14px' }}>
        {text}
      </span>
    ),
  },
  {
    title: '分类',
    dataIndex: 'category',
    key: 'category',
    width: 100,
    render: (category) => (
      <Tag color={category === '高端型' ? colors.purple : colors.blue}>
        {category}
      </Tag>
    ),
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 100,
    render: (status) => (
      <Tag color={statusColors[status]}>
        {status === 'active' ? '启用' : status === 'development' ? '开发中' : '已弃用'}
      </Tag>
    ),
  },
  {
    title: '支持功能',
    dataIndex: 'features',
    key: 'features',
    width: 150,
    render: (features) => (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
        {features?.slice(0, 2).map((feature, index) => (
          <Tag key={index} size="small" color={colors.green}>
            {feature}
          </Tag>
        ))}
        {features?.length > 2 && (
          <Tag size="small" color={colors.gray}>+{features.length - 2}</Tag>
        )}
      </div>
    ),
  },
  {
    title: '支持主板',
    dataIndex: 'supportedBoards',
    key: 'supportedBoards',
    width: 140,
    render: (boards) => (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
        {boards?.slice(0, 2).map((board, index) => (
          <Button
            key={index}
            type="link"
            size="small"
            icon={<HddOutlined />}
            onClick={() => handlers.handleShowBoardDetails(board)}
            style={{ padding: '0 4px', height: '20px', fontSize: '11px' }}
          >
            {board}
          </Button>
        ))}
        {boards?.length > 2 && (
          <Tag size="small" color={colors.gray}>+{boards.length - 2}</Tag>
        )}
      </div>
    ),
  },
  {
    title: '操作',
    key: 'action',
    width: 120,
    render: (_, record) => (
      <Space size="small">
        <Button
          type="text"
          size="small"
          icon={<EyeOutlined />}
          onClick={() => handlers.handleView(record)}
        />
        <Button
          type="text"
          size="small"
          icon={<EditOutlined />}
          onClick={() => handlers.handleEdit(record)}
        />
        <Popconfirm
          title="确定删除这个型号吗？"
          onConfirm={() => handlers.handleDelete(record.id)}
          okText="确定"
          cancelText="取消"
        >
          <Button
            type="text"
            size="small"
            icon={<DeleteOutlined />}
            danger
          />
        </Popconfirm>
      </Space>
    ),
  },
];

// 子型号管理表格列
export const getSubModelColumns = (handlers) => [
  {
    title: '型号',
    dataIndex: 'modelCode',
    key: 'modelCode',
    width: 100,
    render: (text) => (
      <span style={{ fontWeight: 600, fontSize: '13px' }}>{text}</span>
    ),
  },
  {
    title: '通信类型',
    dataIndex: 'communicationType',
    key: 'communicationType',
    width: 100,
    render: (type) => (
      <Tag color={type === 'Cat.1' ? colors.purple : type === 'WiFi' ? colors.green : colors.orange}>
        {type}
      </Tag>
    ),
  },
  {
    title: '开锁方式',
    dataIndex: 'unlockMethods',
    key: 'unlockMethods',
    width: 160,
    render: (methods) => (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
        {methods?.slice(0, 2).map((method, index) => (
          <Tag key={index} size="small" color={colors.green}>
            {method}
          </Tag>
        ))}
        {methods?.length > 2 && (
          <Tag size="small" color={colors.gray}>+{methods.length - 2}</Tag>
        )}
      </div>
    ),
  },
  {
    title: '主板版本',
    dataIndex: 'boardVersion',
    key: 'boardVersion',
    width: 120,
    render: (version) => (
      <Button
        type="link"
        size="small"
        icon={<HddOutlined />}
        onClick={() => handlers.handleShowBoardDetails(version)}
        style={{ padding: 0, height: 'auto', fontSize: '12px' }}
      >
        {version}
      </Button>
    ),
  },
  {
    title: '适配场景',
    dataIndex: 'scenario',
    key: 'scenario',
    width: 100,
    render: (scenario) => (
      <Tag color={scenarioColors[scenario] || colors.green}>
        {scenario}
      </Tag>
    ),
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 80,
    render: (status) => (
      <Tag color={statusColors[status]}>
        {status === 'active' ? '启用' : '禁用'}
      </Tag>
    ),
  },
  {
    title: '操作',
    key: 'action',
    width: 100,
    render: (_, record) => (
      <Space size="small">
        <Button
          type="text"
          size="small"
          icon={<EyeOutlined />}
          onClick={() => handlers.handleViewSubModel(record)}
        />
        <Button
          type="text"
          size="small"
          icon={<EditOutlined />}
          onClick={() => handlers.handleEditSubModel(record)}
        />
      </Space>
    ),
  },
];