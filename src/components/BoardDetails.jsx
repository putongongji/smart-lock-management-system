import React from 'react';
import { Typography, Descriptions, Tag, Divider } from 'antd';
import { commonStyles, colors } from '../styles/modelStyles';

const { Title, Text } = Typography;

const BoardDetails = ({ boardData }) => {
  if (!boardData) return null;

  return (
    <div style={commonStyles.sidebar}>
      <Title level={5} style={commonStyles.title}>
        {boardData.name}
      </Title>
      
      <Descriptions 
        size="small" 
        column={1}
        className="linear-sidebar-descriptions"
        style={commonStyles.descriptions}
      >
        <Descriptions.Item label="版本">
          <code style={commonStyles.code}>{boardData.version}</code>
        </Descriptions.Item>
        <Descriptions.Item label="描述">{boardData.description}</Descriptions.Item>
        <Descriptions.Item label="发布日期">{boardData.releaseDate}</Descriptions.Item>
        <Descriptions.Item label="状态">
          <Tag color={boardData.status === 'production' ? colors.green : colors.orange}>
            {boardData.status === 'production' ? '生产中' : '开发中'}
          </Tag>
        </Descriptions.Item>
      </Descriptions>
      
      <Divider style={commonStyles.divider} />
      
      {/* 主控芯片 */}
      <div style={commonStyles.container}>
        <Text strong style={commonStyles.sectionTitle}>主控芯片</Text>
        <div style={commonStyles.infoBox}>
          <div style={commonStyles.statusIndicator}>
            <span style={commonStyles.secondaryText}>型号:</span>
            <code style={{ fontSize: '13px', fontFamily: 'var(--font-mono)' }}>
              {boardData.mainController?.model}
            </code>
          </div>
          <div style={commonStyles.statusIndicator}>
            <span style={commonStyles.secondaryText}>架构:</span>
            <span style={{ fontSize: '13px' }}>{boardData.mainController?.architecture}</span>
          </div>
          <div style={commonStyles.statusIndicator}>
            <span style={commonStyles.secondaryText}>频率:</span>
            <span style={{ fontSize: '13px' }}>{boardData.mainController?.frequency}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={commonStyles.secondaryText}>内存:</span>
            <span style={{ fontSize: '13px' }}>{boardData.mainController?.memory}</span>
          </div>
        </div>
      </div>
      
      {/* 通信模组 */}
      <div style={commonStyles.container}>
        <Text strong style={commonStyles.sectionTitle}>通信模组</Text>
        <div style={commonStyles.flexContainer}>
          {boardData.communicationModules?.map((module, index) => (
            <div key={index} style={commonStyles.moduleCard}>
              <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                {module.type}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                {module.model}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* 输入模组 */}
      <div style={commonStyles.container}>
        <Text strong style={commonStyles.sectionTitle}>输入模组</Text>
        <div style={commonStyles.flexContainer}>
          {boardData.inputModules?.map((module, index) => (
            <div key={index} style={commonStyles.moduleCard}>
              <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                {module.type}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                {module.model}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* 输出模组 */}
      <div style={commonStyles.container}>
        <Text strong style={commonStyles.sectionTitle}>输出模组</Text>
        <div style={commonStyles.flexContainer}>
          {boardData.outputModules?.map((module, index) => (
            <div key={index} style={commonStyles.moduleCard}>
              <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                {module.type}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                {module.model}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* 安全模组 */}
      <div style={commonStyles.container}>
        <Text strong style={commonStyles.sectionTitle}>安全模组</Text>
        <div style={commonStyles.flexContainer}>
          {boardData.securityModules?.map((module, index) => (
            <div key={index} style={commonStyles.moduleCard}>
              <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                {module.type}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                {module.model}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* 扩展模组 */}
      {boardData.extensionModules && boardData.extensionModules.length > 0 && (
        <div style={commonStyles.container}>
          <Text strong style={commonStyles.sectionTitle}>扩展模组</Text>
          <div style={commonStyles.flexContainer}>
            {boardData.extensionModules.map((module, index) => (
              <div key={index} style={commonStyles.moduleCard}>
                <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                  {module.type}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                  {module.model}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* 技术规格 */}
      <div style={{ marginBottom: '16px' }}>
        <Text strong style={commonStyles.sectionTitle}>技术规格</Text>
        <div style={commonStyles.tagContainer}>
          {boardData.specifications?.map((spec, index) => (
            <Tag 
              key={index} 
              style={{
                ...commonStyles.tag,
                border: '1px solid var(--color-border-light)',
                background: 'var(--color-background-secondary)',
                color: 'var(--color-text-primary)'
              }}
            >
              {spec}
            </Tag>
          ))}
        </div>
      </div>
      
      {/* 应用场景 */}
      <div>
        <Text strong style={commonStyles.sectionTitle}>应用场景</Text>
        <div style={commonStyles.tagContainer}>
          {boardData.applications?.map((app, index) => (
            <Tag 
              key={index} 
              color={colors.green}
              style={commonStyles.tag}
            >
              {app}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoardDetails;