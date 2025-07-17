// 主板详细信息数据
export const boardDetails = {
  'MB-2025-1.0': {
    name: 'MB-2025-1.0',
    version: '1.0',
    year: '2025',
    description: 'M9系列主板，支持人像识别+密码+机械钥匙+蓝牙',
    mainController: {
      model: 'ESP32-C3',
      architecture: 'RISC-V',
      frequency: '160MHz',
      memory: '400KB SRAM'
    },
    communicationModules: [
      { type: 'Cat.1', model: 'EC200U-CN', count: 1 }
    ],
    inputModules: [
      { type: '人像识别器', model: 'FR-2025-V1', count: 1 },
      { type: '触控密码板', model: 'TP-2025-V1', count: 1 }
    ],
    outputModules: [
      { type: 'LED', model: 'LED-RGB-V1', count: 1 },
      { type: '蜂鸣器', model: 'BUZZ-2025-V1', count: 1 }
    ],
    securityModules: [
      { type: '指纹识别器', model: 'FP-2025-V1', count: 1 }
    ],
    extensionModules: [
      { type: 'RGB灯', model: 'RGB-2025-V1', count: 1 }
    ],
    supportedFirmwares: ['FW-2025-1.0', 'FW-2025-1.1'],
    supportedModels: ['M9-CS', 'M9-CS2', 'M9-CL', 'M9-CM', 'M9-CL2'],
    specifications: ['3.3V供电', '工作温度-20~60°C', 'IP54防护'],
    applications: ['家庭智能锁', '办公室门锁'],
    releaseDate: '2024-01-10',
    status: 'production'
  },
  'MB-2025-2.0': {
    name: 'MB-2025-2.0',
    version: '2.0',
    year: '2025',
    description: 'H7系列主板，支持人脸识别+密码+机械钥匙',
    mainController: {
      model: 'ESP32-S3',
      architecture: 'Xtensa LX7',
      frequency: '240MHz',
      memory: '512KB SRAM'
    },
    communicationModules: [
      { type: 'Cat.1', model: 'EC200U-CN', count: 1 }
    ],
    inputModules: [
      { type: '人脸识别器', model: 'FACE-2025-V1', count: 1 },
      { type: '触控密码板', model: 'TP-2025-V1', count: 1 }
    ],
    outputModules: [
      { type: 'LED', model: 'LED-RGB-V1', count: 1 },
      { type: '蜂鸣器', model: 'BUZZ-2025-V1', count: 1 }
    ],
    securityModules: [
      { type: '指纹识别器', model: 'FP-2025-V1', count: 1 },
      { type: '加密芯片', model: 'SEC-2025-V1', count: 1 }
    ],
    extensionModules: [],
    supportedFirmwares: ['FW-2025-2.0'],
    supportedModels: ['H7-CF', 'H7-CL', 'H7-CM', 'H7-CF/R', 'H7-CL/R'],
    specifications: ['3.3V供电', '工作温度-20~60°C', 'IP54防护', '双核处理'],
    applications: ['公租房智能锁', '高端家庭门锁'],
    releaseDate: '2024-02-15',
    status: 'production'
  },
  'MB-2025-3.0': {
    name: 'MB-2025-3.0',
    version: '3.0',
    year: '2025',
    description: 'M8系列主板，支持指纹识别+密码+机械钥匙',
    mainController: {
      model: 'ESP32-C2',
      architecture: 'RISC-V',
      frequency: '120MHz',
      memory: '272KB SRAM'
    },
    communicationModules: [
      { type: 'Cat.1', model: 'EC200U-CN', count: 1 }
    ],
    inputModules: [
      { type: '触控密码板', model: 'TP-2025-V1', count: 1 }
    ],
    outputModules: [
      { type: 'LED', model: 'LED-RGB-V1', count: 1 }
    ],
    securityModules: [
      { type: '指纹识别器', model: 'FP-2025-V1', count: 1 }
    ],
    extensionModules: [],
    supportedFirmwares: ['FW-2025-3.0'],
    supportedModels: ['M8-CL', 'M8-CM'],
    specifications: ['3.3V供电', '工作温度-10~50°C', 'IP44防护'],
    applications: ['经济型家庭门锁'],
    releaseDate: '2024-03-01',
    status: 'production'
  },
  'MB-2025-4.0': {
    name: 'MB-2025-4.0',
    version: '4.0',
    year: '2025',
    description: 'L1系列主板，蓝牙通信，支持密码+指纹',
    mainController: {
      model: 'ESP32-C3',
      architecture: 'RISC-V',
      frequency: '160MHz',
      memory: '400KB SRAM'
    },
    communicationModules: [
      { type: '蓝牙', model: 'ESP32-BLE', count: 1 }
    ],
    inputModules: [
      { type: '触控密码板', model: 'TP-2025-V1', count: 1 }
    ],
    outputModules: [
      { type: 'LED', model: 'LED-RGB-V1', count: 1 }
    ],
    securityModules: [
      { type: '指纹识别器', model: 'FP-2025-V1', count: 1 }
    ],
    extensionModules: [],
    supportedFirmwares: ['FW-2025-4.0'],
    supportedModels: ['L1-BJ', 'L1-CH', 'L1-CJ'],
    specifications: ['3.3V供电', '工作温度-10~50°C', 'IP44防护'],
    applications: ['蓝牙智能锁'],
    releaseDate: '2024-03-15',
    status: 'production'
  }
};

// 固件详细信息数据
export const firmwareDetails = {
  'FW-2025-1.0': {
    version: 'FW-2025-1.0',
    fileName: 'smartlock_fw_2025_1_0.bin',
    type: 'release',
    size: '2.1MB',
    releaseDate: '2024-01-10',
    description: 'M9系列基础固件版本，支持人像识别+密码+机械钥匙+蓝牙',
    communicationMethods: ['Cat.1'],
    inputMethods: ['人像识别', '触控密码'],
    outputMethods: ['LED指示', '蜂鸣提示'],
    voiceSupport: false,
    securityFeatures: ['指纹加密', 'AES256'],
    compatibleBoards: ['MB-2025-1.0'],
    supportedModels: ['M9-CS'],
    adaptedScenarios: ['通用场景'],
    compatibility: {
      minBoardVersion: 'MB-2025-1.0',
      maxBoardVersion: 'MB-2025-1.0',
      backwardCompatible: true
    },
    changelog: '• 初始版本发布\n• 支持基础开锁功能\n• 集成人像识别算法',
    status: 'stable'
  },
  'FW-2025-1.1': {
    version: 'FW-2025-1.1',
    fileName: 'smartlock_fw_2025_1_1.bin',
    type: 'release',
    size: '2.3MB',
    releaseDate: '2024-01-25',
    description: 'M9系列功能增强版本，支持硬件迭代',
    communicationMethods: ['Cat.1'],
    inputMethods: ['人像识别', '触控密码'],
    outputMethods: ['LED指示', '蜂鸣提示'],
    voiceSupport: false,
    securityFeatures: ['指纹加密', 'AES256', '防撬报警'],
    compatibleBoards: ['MB-2025-1.0'],
    supportedModels: ['M9-CS2', 'M9-CL', 'M9-CM', 'M9-CL2'],
    adaptedScenarios: ['通用场景'],
    compatibility: {
      minBoardVersion: 'MB-2025-1.0',
      maxBoardVersion: 'MB-2025-1.0',
      backwardCompatible: true
    },
    changelog: '• 新增防撬报警功能\n• 优化人像识别算法\n• 修复已知问题',
    status: 'stable'
  },
  'FW-2025-2.0': {
    version: 'FW-2025-2.0',
    fileName: 'smartlock_fw_2025_2_0.bin',
    type: 'release',
    size: '3.1MB',
    releaseDate: '2024-02-15',
    description: 'H7系列人脸识别固件，支持人脸识别+密码+机械钥匙',
    communicationMethods: ['Cat.1'],
    inputMethods: ['人脸识别', '触控密码'],
    outputMethods: ['LED指示', '蜂鸣提示'],
    voiceSupport: true,
    securityFeatures: ['3D人脸识别', 'AES256', '活体检测'],
    compatibleBoards: ['MB-2025-2.0'],
    supportedModels: ['H7-CF', 'H7-CL', 'H7-CM', 'H7-CF/R', 'H7-CL/R'],
    adaptedScenarios: ['公租房/R', '通用场景'],
    compatibility: {
      minBoardVersion: 'MB-2025-2.0',
      maxBoardVersion: 'MB-2025-2.0',
      backwardCompatible: false
    },
    changelog: '• 新增3D人脸识别\n• 支持语音提示\n• 活体检测防伪',
    status: 'stable'
  },
  'FW-2025-3.0': {
    version: 'FW-2025-3.0',
    fileName: 'smartlock_fw_2025_3_0.bin',
    type: 'release',
    size: '2.8MB',
    releaseDate: '2024-03-01',
    description: 'M8系列多功能固件，支持指纹识别+密码+机械钥匙',
    communicationMethods: ['Cat.1'],
    inputMethods: ['指纹识别', '触控密码'],
    outputMethods: ['LED指示', '蜂鸣提示'],
    voiceSupport: false,
    securityFeatures: ['指纹加密', 'AES256'],
    compatibleBoards: ['MB-2025-3.0'],
    supportedModels: ['M8-CL', 'M8-CM'],
    adaptedScenarios: ['通用场景'],
    compatibility: {
      minBoardVersion: 'MB-2025-3.0',
      maxBoardVersion: 'MB-2025-3.0',
      backwardCompatible: false
    },
    changelog: '• 支持指纹识别\n• 优化通信稳定性\n• 增强安全性',
    status: 'stable'
  },
  'FW-2025-4.0': {
    version: 'FW-2025-4.0',
    fileName: 'smartlock_fw_2025_4_0.bin',
    type: 'release',
    size: '1.9MB',
    releaseDate: '2024-03-15',
    description: 'L1系列蓝牙固件，支持指纹识别+密码+机械钥匙+蓝牙',
    communicationMethods: ['蓝牙'],
    inputMethods: ['指纹识别', '触控密码'],
    outputMethods: ['LED指示'],
    voiceSupport: false,
    securityFeatures: ['指纹加密'],
    compatibleBoards: ['MB-2025-4.0'],
    supportedModels: ['L1-BJ', 'L1-CH', 'L1-CJ'],
    adaptedScenarios: ['通用场景'],
    compatibility: {
      minBoardVersion: 'MB-2025-4.0',
      maxBoardVersion: 'MB-2025-4.0',
      backwardCompatible: false
    },
    changelog: '• 蓝牙连接功能\n• 基础密码验证\n• 低功耗设计',
    status: 'stable'
  }
};

// 型号分组数据
export const initialModelGroups = {
  M9: {
    productModel: 'M9',
    fullModel: 'SmartLock M9 Series',
    description: 'M9系列智能锁，支持人像识别+密码+机械钥匙',
    scenario: '通用场景',
    communicationType: 'Cat.1',
    unlockMethods: ['人像识别', '密码', '机械钥匙'],
    status: 'active',
    createdAt: '2024-01-10',
    subModels: [
      {
        modelCode: 'M9-CS',
        fullModel: 'SmartLock M9-CS',
        productModel: 'M9',
        description: 'M9系列基础版，支持人像识别+密码+机械钥匙',
        communicationType: 'Cat.1',
        unlockMethods: ['人像识别', '密码', '机械钥匙'],
        boardVersion: 'MB-2025-1.0',
        scenario: '通用场景',
        status: 'active',
        createdAt: '2024-01-10'
      },
      {
        modelCode: 'M9-CS2',
        fullModel: 'SmartLock M9-CS2',
        productModel: 'M9',
        description: 'M9系列增强版，支持人像识别+密码+机械钥匙',
        communicationType: 'Cat.1',
        unlockMethods: ['人像识别', '密码', '机械钥匙'],
        boardVersion: 'MB-2025-1.0',
        scenario: '通用场景',
        status: 'active',
        createdAt: '2024-01-15'
      },
      {
        modelCode: 'M9-CL',
        fullModel: 'SmartLock M9-CL',
        productModel: 'M9',
        description: 'M9系列标准版，支持人像识别+密码+机械钥匙',
        communicationType: 'Cat.1',
        unlockMethods: ['人像识别', '密码', '机械钥匙'],
        boardVersion: 'MB-2025-1.0',
        scenario: '通用场景',
        status: 'active',
        createdAt: '2024-01-20'
      },
      {
        modelCode: 'M9-CM',
        fullModel: 'SmartLock M9-CM',
        productModel: 'M9',
        description: 'M9系列高级版，支持人像识别+密码+机械钥匙',
        communicationType: 'Cat.1',
        unlockMethods: ['人像识别', '密码', '机械钥匙'],
        boardVersion: 'MB-2025-1.0',
        scenario: '通用场景',
        status: 'active',
        createdAt: '2024-01-25'
      },
      {
        modelCode: 'M9-CL2',
        fullModel: 'SmartLock M9-CL2',
        productModel: 'M9',
        description: 'M9系列升级版，支持人像识别+密码+机械钥匙',
        communicationType: 'Cat.1',
        unlockMethods: ['人像识别', '密码', '机械钥匙'],
        boardVersion: 'MB-2025-1.0',
        scenario: '通用场景',
        status: 'active',
        createdAt: '2024-01-30'
      }
    ]
  },
  H7: {
    productModel: 'H7',
    fullModel: 'SmartLock H7 Series',
    description: 'H7系列智能锁，支持人脸识别+密码+机械钥匙',
    scenario: '公租房/R、通用场景',
    communicationType: 'Cat.1',
    unlockMethods: ['人脸识别', '密码', '机械钥匙'],
    status: 'active',
    createdAt: '2024-02-01',
    subModels: [
      {
        modelCode: 'H7-CF',
        fullModel: 'SmartLock H7-CF',
        productModel: 'H7',
        description: 'H7系列人脸识别版，支持人脸识别+密码+机械钥匙',
        communicationType: 'Cat.1',
        unlockMethods: ['人脸识别', '密码', '机械钥匙'],
        boardVersion: 'MB-2025-2.0',
        scenario: '通用场景',
        status: 'active',
        createdAt: '2024-02-01'
      },
      {
        modelCode: 'H7-CL',
        fullModel: 'SmartLock H7-CL',
        productModel: 'H7',
        description: 'H7系列标准版，支持人脸识别+密码+机械钥匙',
        communicationType: 'Cat.1',
        unlockMethods: ['人脸识别', '密码', '机械钥匙'],
        boardVersion: 'MB-2025-2.0',
        scenario: '通用场景',
        status: 'active',
        createdAt: '2024-02-05'
      },
      {
        modelCode: 'H7-CM',
        fullModel: 'SmartLock H7-CM',
        productModel: 'H7',
        description: 'H7系列高级版，支持人脸识别+密码+机械钥匙',
        communicationType: 'Cat.1',
        unlockMethods: ['人脸识别', '密码', '机械钥匙'],
        boardVersion: 'MB-2025-2.0',
        scenario: '通用场景',
        status: 'active',
        createdAt: '2024-02-10'
      },
      {
        modelCode: 'H7-CF/R',
        fullModel: 'SmartLock H7-CF/R',
        productModel: 'H7',
        description: 'H7系列公租房版，支持人脸识别+密码+机械钥匙',
        communicationType: 'Cat.1',
        unlockMethods: ['人脸识别', '密码', '机械钥匙'],
        boardVersion: 'MB-2025-2.0',
        scenario: '公租房/R',
        status: 'active',
        createdAt: '2024-02-15'
      },
      {
        modelCode: 'H7-CL/R',
        fullModel: 'SmartLock H7-CL/R',
        productModel: 'H7',
        description: 'H7系列公租房标准版，支持人脸识别+密码+机械钥匙',
        communicationType: 'Cat.1',
        unlockMethods: ['人脸识别', '密码', '机械钥匙'],
        boardVersion: 'MB-2025-2.0',
        scenario: '公租房/R',
        status: 'active',
        createdAt: '2024-02-20'
      }
    ]
  },
  M8: {
    productModel: 'M8',
    fullModel: 'SmartLock M8 Series',
    description: 'M8系列智能锁，支持指纹识别+密码+机械钥匙',
    scenario: '通用场景',
    communicationType: 'Cat.1',
    unlockMethods: ['指纹识别', '密码', '机械钥匙'],
    status: 'active',
    createdAt: '2024-03-01',
    subModels: [
      {
        modelCode: 'M8-CL',
        fullModel: 'SmartLock M8-CL',
        productModel: 'M8',
        description: 'M8系列标准版，支持指纹识别+密码+机械钥匙',
        communicationType: 'Cat.1',
        unlockMethods: ['指纹识别', '密码', '机械钥匙'],
        boardVersion: 'MB-2025-3.0',
        scenario: '通用场景',
        status: 'active',
        createdAt: '2024-03-01'
      },
      {
        modelCode: 'M8-CM',
        fullModel: 'SmartLock M8-CM',
        productModel: 'M8',
        description: 'M8系列高级版，支持指纹识别+密码+机械钥匙',
        communicationType: 'Cat.1',
        unlockMethods: ['指纹识别', '密码', '机械钥匙'],
        boardVersion: 'MB-2025-3.0',
        scenario: '通用场景',
        status: 'active',
        createdAt: '2024-03-05'
      }
    ]
  },
  L1: {
    productModel: 'L1',
    fullModel: 'SmartLock L1 Series',
    description: 'L1系列智能锁，支持指纹识别+密码+机械钥匙+蓝牙',
    scenario: '通用场景',
    communicationType: '蓝牙',
    unlockMethods: ['指纹识别', '密码', '机械钥匙', '蓝牙'],
    status: 'active',
    createdAt: '2024-03-10',
    subModels: [
      {
        modelCode: 'L1-BJ',
        fullModel: 'SmartLock L1-BJ',
        productModel: 'L1',
        description: 'L1系列蓝牙版，支持指纹识别+密码+机械钥匙+蓝牙',
        communicationType: '蓝牙',
        unlockMethods: ['指纹识别', '密码', '机械钥匙', '蓝牙'],
        boardVersion: 'MB-2025-4.0',
        scenario: '通用场景',
        status: 'active',
        createdAt: '2024-03-10'
      },
      {
        modelCode: 'L1-CH',
        fullModel: 'SmartLock L1-CH',
        productModel: 'L1',
        description: 'L1系列混合版，支持指纹识别+密码+机械钥匙+蓝牙',
        communicationType: '蓝牙',
        unlockMethods: ['指纹识别', '密码', '机械钥匙', '蓝牙'],
        boardVersion: 'MB-2025-4.0',
        scenario: '通用场景',
        status: 'active',
        createdAt: '2024-03-12'
      },
      {
        modelCode: 'L1-CJ',
        fullModel: 'SmartLock L1-CJ',
        productModel: 'L1',
        description: 'L1系列基础版，支持指纹识别+密码+机械钥匙+蓝牙',
        communicationType: '蓝牙',
        unlockMethods: ['指纹识别', '密码', '机械钥匙', '蓝牙'],
        boardVersion: 'MB-2025-4.0',
        scenario: '通用场景',
        status: 'active',
        createdAt: '2024-03-15'
      }
    ]
  }
};

// 初始型号数据 - 基于最新需求说明的型号数据
export const initialModels = [];