import React, { useState, useRef } from 'react';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { Layout, Menu, Button, Tooltip } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  SettingOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AppstoreOutlined,
  HddOutlined,
  CloudServerOutlined
} from '@ant-design/icons'

const { Sider } = Layout

function Sidebar({ width, setWidth }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)

  const sidebarRef = useRef(null)
  const minWidth = 180
  const maxWidth = 400
  const collapsedWidth = 64

  const menuItems = [
    {
      key: '/models',
      icon: <AppstoreOutlined />,
      label: '型号管理'
    },
    {
      key: '/boards',
      icon: <HddOutlined />,
      label: '主板管理'
    },
    {
      key: '/firmware',
      icon: <CloudServerOutlined />,
      label: '固件管理'
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: '系统设置'
    }
  ]

  const handleMenuClick = ({ key }) => {
    navigate(key)
  }

  const toggleCollapse = () => {
    setCollapsed(!collapsed)
  }



  return (
    <ResizableBox
      width={collapsed ? collapsedWidth : width}
      height={Infinity}
      axis='x'
      minConstraints={[minWidth, Infinity]}
      maxConstraints={[maxWidth, Infinity]}
      onResizeStop={(e, data) => {
        if (!collapsed) {
          setWidth(data.size.width);
        }
      }}
      resizeHandles={['e']}
      handle={<span className="react-resizable-handle react-resizable-handle-e" />}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <div
        ref={sidebarRef}
      style={{
        position: 'relative',
        width: collapsed ? collapsedWidth : width,
        backgroundColor: 'var(--color-surface)',
        borderRight: '1px solid var(--color-border-light)',
        transition: collapsed ? 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
        boxShadow: 'var(--shadow-sm)',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* 头部区域 */}
      <div
        style={{
          height: 72,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: collapsed ? '0' : '0 16px',
          borderBottom: '1px solid var(--color-border-light)',
          fontSize: 16,
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          background: 'linear-gradient(135deg, var(--color-surface) 0%, var(--color-background-secondary) 100%)'
        }}
      >
        {!collapsed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '8px',
                background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-hover) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: 16,
                flexShrink: 0
              }}
            >
              <HomeOutlined />
            </div>
            <span style={{ 
              letterSpacing: '-0.01em',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>智能锁管理</span>
          </div>
        )}
        {collapsed && (
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: '8px',
              background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-hover) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 16
            }}
          >
            <HomeOutlined />
          </div>
        )}
      </div>
      
      {/* 菜单区域 */}
      <div style={{ 
        padding: '16px 0',
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden'
      }}>
        <Menu
          selectedKeys={[location.pathname]}
          mode="inline"
          inlineCollapsed={collapsed}
          style={{
            border: 'none',
            backgroundColor: 'transparent',
            fontSize: '14px',
            width: '100%'
          }}
          onClick={handleMenuClick}
          items={menuItems.map(item => ({
            ...item,
            style: {
              margin: collapsed ? '4px 8px' : '4px 12px',
              borderRadius: '8px',
              height: '40px',
              lineHeight: '40px',
              transition: 'all 0.2s ease',
              overflow: 'hidden'
            }
          }))}
        />
      </div>
      
      {/* 展开/收起按钮 */}
      <div style={{
        padding: '16px',
        borderTop: '1px solid var(--color-border-light)',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={toggleCollapse}
          style={{
            border: 'none',
            color: 'var(--color-text-tertiary)',
            fontSize: 16,
            width: 32,
            height: 32,
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'var(--color-surface-hover)'
            e.target.style.color = 'var(--color-text-secondary)'
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent'
            e.target.style.color = 'var(--color-text-tertiary)'
          }}
        />
      </div>
      
      </div>
    </ResizableBox>
  )
}

export default Sidebar