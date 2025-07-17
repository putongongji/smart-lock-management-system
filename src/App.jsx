import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from 'antd'
import Sidebar from './components/Sidebar'
import ModelManagement from './pages/ModelManagement'
import BoardManagement from './pages/BoardManagement'
import FirmwareManagement from './pages/FirmwareManagement'
import Settings from './pages/Settings'
import './App.css'

const { Content } = Layout

function App() {
  const [sidebarWidth, setSidebarWidth] = React.useState(220);

  return (
    <div className="app-layout" style={{ display: 'flex', height: '100vh' }}>
      <Sidebar width={sidebarWidth} setWidth={setSidebarWidth} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Content className="app-content" style={{ flex: 1, overflow: 'auto' }}>
          <Routes>
          <Route path="/" element={<ModelManagement />} />
          <Route path="/models" element={<ModelManagement />} />
          <Route path="/boards" element={<BoardManagement />} />
          <Route path="/firmware" element={<FirmwareManagement />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        </Content>
      </div>
    </div>
  )
}

export default App