import React from 'react'
import { Card, Row, Col, Statistic, Progress, Table, Tag, Space, Avatar } from 'antd'
import { 
  ArrowUpOutlined, 
  ArrowDownOutlined, 
  WifiOutlined,
  DisconnectOutlined,
  BugOutlined,
  CheckCircleOutlined
} from '@ant-design/icons'
import ReactECharts from 'echarts-for-react'

function Dashboard() {
  // 模拟数据
  const metrics = [
    {
      title: '设备总数',
      value: 1248,
      change: 12,
      trend: 'up',
      color: '#165dff',
    },
    {
      title: '在线设备',
      value: 1156,
      change: -3,
      trend: 'down',
      color: '#00b42a',
    },
    {
      title: '固件版本',
      value: 24,
      change: 2,
      trend: 'up',
      color: '#ff7d00',
    },
    {
      title: '同步错误率',
      value: '2.1%',
      change: -0.5,
      trend: 'down',
      color: '#f53f3f',
    },
  ]

  const recentDevices = [
    {
      id: 'SL-2024-001',
      model: 'SmartLock Pro X1',
      board: 'ESP32-S3-V2.1',
      firmware: 'v2.3.1',
      status: 'online',
      lastSync: '2024-01-15 14:30:25',
    },
    {
      id: 'SL-2024-002',
      model: 'SmartLock Basic A2',
      board: 'ESP32-C3-V1.5',
      firmware: 'v1.8.3',
      status: 'offline',
      lastSync: '2024-01-15 12:15:10',
    },
    {
      id: 'SL-2024-003',
      model: 'SmartLock Pro X2',
      board: 'ESP32-S3-V2.2',
      firmware: 'v2.4.0-beta',
      status: 'online',
      lastSync: '2024-01-15 14:28:45',
    },
  ]

  const columns = [
    {
      title: '设备ID',
      dataIndex: 'id',
      width: 120,
    },
    {
      title: '型号',
      dataIndex: 'model',
      width: 150,
    },
    {
      title: '主板',
      dataIndex: 'board',
      width: 130,
    },
    {
      title: '固件版本',
      dataIndex: 'firmware',
      width: 120,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 80,
      render: (status) => (
        <Tag color={status === 'online' ? 'green' : 'red'}>
          {status === 'online' ? '在线' : '离线'}
        </Tag>
      ),
    },
    {
      title: '最后同步',
      dataIndex: 'lastSync',
      width: 150,
    },
  ]

  const chartOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      borderRadius: 8,
      textStyle: {
        color: '#374151',
        fontSize: 12
      },
      axisPointer: {
        type: 'line',
        lineStyle: {
          color: '#d1d5db',
          width: 1,
          type: 'dashed'
        }
      }
    },
    legend: {
      data: ['在线设备', '离线设备', '同步错误'],
      bottom: 0,
      textStyle: {
        color: '#6b7280',
        fontSize: 12
      },
      itemGap: 20
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
      axisLine: {
        lineStyle: {
          color: '#e5e7eb'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#9ca3af',
        fontSize: 11
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#9ca3af',
        fontSize: 11
      },
      splitLine: {
        lineStyle: {
          color: '#f3f4f6',
          type: 'dashed'
        }
      }
    },
    series: [
      {
        name: '在线设备',
        type: 'line',
        data: [1120, 1132, 1145, 1156, 1148, 1152, 1156],
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: {
          color: '#10b981',
          width: 3
        },
        itemStyle: {
          color: '#10b981',
          borderColor: '#ffffff',
          borderWidth: 2
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(16, 185, 129, 0.2)' },
              { offset: 1, color: 'rgba(16, 185, 129, 0.02)' }
            ]
          }
        }
      },
      {
        name: '离线设备',
        type: 'line',
        data: [128, 116, 103, 92, 100, 96, 92],
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: {
          color: '#ef4444',
          width: 3
        },
        itemStyle: {
          color: '#ef4444',
          borderColor: '#ffffff',
          borderWidth: 2
        }
      },
      {
        name: '同步错误',
        type: 'line',
        data: [32, 28, 25, 26, 24, 22, 21],
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: {
          color: '#f59e0b',
          width: 3
        },
        itemStyle: {
          color: '#f59e0b',
          borderColor: '#ffffff',
          borderWidth: 2
        }
      },
    ],
  }

  return (
    <div className='page-container'>
      <div className='page-header'>
        <h1 className='page-title'>仪表盘</h1>
        <p className='page-description'>智能锁设备管理系统概览</p>
      </div>

      {/* 核心指标 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {metrics.map((metric, index) => {
          const getIcon = () => {
            switch(index) {
              case 0: return <WifiOutlined style={{ fontSize: 20, color: metric.color }} />
              case 1: return <CheckCircleOutlined style={{ fontSize: 20, color: metric.color }} />
              case 2: return <BugOutlined style={{ fontSize: 20, color: metric.color }} />
              case 3: return <DisconnectOutlined style={{ fontSize: 20, color: metric.color }} />
              default: return null
            }
          }
          
          return (
            <Col span={6} key={index}>
              <Card className="metric-card" hoverable>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ 
                      color: '#6b7280', 
                      fontSize: '14px', 
                      fontWeight: 500,
                      marginBottom: '8px'
                    }}>
                      {metric.title}
                    </div>
                    <div style={{ 
                      fontSize: '28px', 
                      fontWeight: 700, 
                      color: '#111827',
                      lineHeight: 1
                    }}>
                      {metric.value}
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      marginTop: '8px',
                      fontSize: '12px'
                    }}>
                      {metric.trend === 'up' ? (
                        <ArrowUpOutlined style={{ color: '#10b981', marginRight: '4px' }} />
                      ) : (
                        <ArrowDownOutlined style={{ color: '#ef4444', marginRight: '4px' }} />
                      )}
                      <span style={{
                        color: metric.trend === 'up' ? '#10b981' : '#ef4444',
                        fontWeight: 600
                      }}>
                        {metric.change > 0 ? '+' : ''}{metric.change}
                      </span>
                      <span style={{ color: '#9ca3af', marginLeft: '4px' }}>vs 上周</span>
                    </div>
                  </div>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    backgroundColor: `${metric.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {getIcon()}
                  </div>
                </div>
              </Card>
            </Col>
          )
        })}
      </Row>

      <Row gutter={[16, 16]}>
        {/* 设备状态趋势图 */}
        <Col span={16}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '6px',
                  height: '20px',
                  backgroundColor: '#5e6ad2',
                  borderRadius: '3px'
                }} />
                <span style={{ fontSize: '16px', fontWeight: 600, color: '#111827' }}>设备状态趋势</span>
              </div>
            }
            style={{ height: 400 }}
            bodyStyle={{ padding: '16px 24px' }}
          >
            <ReactECharts option={chartOption} style={{ height: '320px' }} />
          </Card>
        </Col>

        {/* 系统健康度 */}
        <Col span={8}>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '6px',
                  height: '20px',
                  backgroundColor: '#10b981',
                  borderRadius: '3px'
                }} />
                <span style={{ fontSize: '16px', fontWeight: 600, color: '#111827' }}>系统健康度</span>
              </div>
            }
            style={{ height: 400 }}
            bodyStyle={{ padding: '24px' }}
          >
            <Space direction='vertical' size={20} style={{ width: '100%' }}>
              <div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: 12
                }}>
                  <span style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}>设备在线率</span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#10b981' }}>92.6%</span>
                </div>
                <Progress 
                  percent={92.6} 
                  strokeColor='#10b981'
                  trailColor='#f3f4f6'
                  strokeWidth={8}
                  showInfo={false}
                />
              </div>
              <div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: 12
                }}>
                  <span style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}>固件兼容性</span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#3b82f6' }}>98.2%</span>
                </div>
                <Progress 
                  percent={98.2} 
                  strokeColor='#3b82f6'
                  trailColor='#f3f4f6'
                  strokeWidth={8}
                  showInfo={false}
                />
              </div>
              <div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: 12
                }}>
                  <span style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}>同步成功率</span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#f59e0b' }}>97.9%</span>
                </div>
                <Progress 
                  percent={97.9} 
                  strokeColor='#f59e0b'
                  trailColor='#f3f4f6'
                  strokeWidth={8}
                  showInfo={false}
                />
              </div>
              <div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: 12
                }}>
                  <span style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}>系统稳定性</span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#8b5cf6' }}>99.1%</span>
                </div>
                <Progress 
                  percent={99.1} 
                  strokeColor='#8b5cf6'
                  trailColor='#f3f4f6'
                  strokeWidth={8}
                  showInfo={false}
                />
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      {/* 最近设备活动 */}
      <Card 
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '6px',
              height: '20px',
              backgroundColor: '#f59e0b',
              borderRadius: '3px'
            }} />
            <span style={{ fontSize: '16px', fontWeight: 600, color: '#111827' }}>最近设备活动</span>
          </div>
        }
        style={{ marginTop: 16 }}
        bodyStyle={{ padding: '0' }}
      >
        <Table
          columns={columns}
          dataSource={recentDevices}
          pagination={false}
          size='middle'
          rowKey='id'
          showHeader={true}
        />
      </Card>
    </div>
  )
}

export default Dashboard