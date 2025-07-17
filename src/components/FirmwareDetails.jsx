import React from 'react';
import { Typography, Descriptions, Tag, Divider } from 'antd';
import { commonStyles, colors, scenarioColors } from '../styles/modelStyles';

const { Title, Text } = Typography;

const FirmwareDetails = ({ firmwareData }) => {
  if (!firmwareData) return null;

  return (
    <div style={commonStyles.sidebar}>
      <Title level={5} style={commonStyles.title}>
        {firmwareData.version}
      </Title>
      
      <Descriptions 
        size="small" 
        column={1}
        className="linear-sidebar-descriptions"
        style={commonStyles.descriptions}
      >
        <Descriptions.Item label="版本">
          <code style={commonStyles.code}>{firmwareData.version}</code>
        </Descriptions.Item>
        <Descriptions.Item label="类型">
          <Tag color={firmwareData.type === 'release' ? colors.green : colors.orange}>
            {firmwareData.type === 'release' ? '正式版' : '测试版'}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="文件大小">{firmwareData.size}</Descriptions.Item>
        <Descriptions.Item label="发布日期">{firmwareData.releaseDate}</Descriptions.Item>
        <Descriptions.Item label="描述">{firmwareData.description}</Descriptions.Item>
      </Descriptions>
      
      <Divider style={commonStyles.divider} />
      
      {/* 通信方式 */}
      <div style={commonStyles.container}>
        <Text strong style={commonStyles.sectionTitle}>通信方式</Text>
        <div style={commonStyles.tagContainer}>
          {firmwareData.communicationMethods?.map((method, index) => (
            <Tag 
              key={index} 
              color={colors.blue}
              style={commonStyles.tag}
            >
              {method}
            </Tag>
          ))}
        </div>
      </div>
      
      {/* 输入方式 */}
      <div style={commonStyles.container}>
        <Text strong style={commonStyles.sectionTitle}>输入方式</Text>
        <div style={commonStyles.tagContainer}>
          {firmwareData.inputMethods?.map((method, index) => (
            <Tag 
              key={index} 
              color={colors.green}
              style={commonStyles.tag}
            >
              {method}
            </Tag>
          ))}
        </div>
      </div>
      
      {/* 安全特性 */}
      <div style={commonStyles.container}>
        <Text strong style={commonStyles.sectionTitle}>安全特性</Text>
        <div style={commonStyles.tagContainer}>
          {firmwareData.securityFeatures?.map((feature, index) => (
            <Tag 
              key={index} 
              color={colors.red}
              style={commonStyles.tag}
            >
              {feature}
            </Tag>
          ))}
        </div>
      </div>
      
      {/* 兼容主板 */}
      <div style={commonStyles.container}>
        <Text strong style={commonStyles.sectionTitle}>兼容主板</Text>
        <div style={commonStyles.tagContainer}>
          {firmwareData.compatibleBoards?.map((board, index) => (
            <Tag 
              key={index} 
              color={colors.orange}
              style={commonStyles.tag}
            >
              {board}
            </Tag>
          ))}
        </div>
      </div>

      {/* 支持型号 */}
      <div style={commonStyles.container}>
        <Text strong style={commonStyles.sectionTitle}>支持型号</Text>
        <div style={commonStyles.tagContainer}>
          {firmwareData.supportedModels?.map((model, index) => (
            <Tag 
              key={index} 
              color={colors.purple}
              style={commonStyles.tag}
            >
              {model}
            </Tag>
          ))}
        </div>
      </div>

      {/* 适配场景 */}
      <div style={commonStyles.container}>
        <Text strong style={commonStyles.sectionTitle}>适配场景</Text>
        <div style={commonStyles.tagContainer}>
          {firmwareData.adaptedScenarios?.map((scenario, index) => (
            <Tag 
              key={index} 
              color={scenarioColors[scenario] || colors.green}
              style={commonStyles.tag}
            >
              {scenario}
            </Tag>
          ))}
        </div>
      </div>
      
      {/* 兼容信息 */}
      <div style={commonStyles.container}>
        <Text strong style={commonStyles.sectionTitle}>兼容信息</Text>
        <div style={commonStyles.infoBox}>
          <div style={commonStyles.statusIndicator}>
            <span style={commonStyles.secondaryText}>最低主板版本:</span>
            <code style={{ fontSize: '13px', fontFamily: 'var(--font-mono)' }}>
              {firmwareData.compatibility?.minBoardVersion}
            </code>
          </div>
          <div style={commonStyles.statusIndicator}>
            <span style={commonStyles.secondaryText}>最高主板版本:</span>
            <code style={{ fontSize: '13px', fontFamily: 'var(--font-mono)' }}>
              {firmwareData.compatibility?.maxBoardVersion}
            </code>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={commonStyles.secondaryText}>向后兼容:</span>
            <Tag color={firmwareData.compatibility?.backwardCompatible ? colors.green : colors.red} size="small">
              {firmwareData.compatibility?.backwardCompatible ? '是' : '否'}
            </Tag>
          </div>
        </div>
      </div>
      
      {/* 更新日志 */}
      <div>
        <Text strong style={commonStyles.sectionTitle}>更新日志</Text>
        <div style={commonStyles.changelog}>
          {firmwareData.changelog}
        </div>
      </div>
    </div>
  );
};

export default FirmwareDetails;