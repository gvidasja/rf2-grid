# vite-react-electron

[![awesome-vite](https://awesome.re/mentioned-badge.svg)](https://github.com/vitejs/awesome-vite)
![GitHub stars](https://img.shields.io/github/stars/caoxiemeihao/vite-react-electron?color=fa6470&style=flat)
![GitHub issues](https://img.shields.io/github/issues/caoxiemeihao/vite-react-electron?color=d8b22d&style=flat)
![GitHub license](https://img.shields.io/github/license/caoxiemeihao/vite-react-electron?style=flat)
[![Required Node.JS >= v14.17.0](https://img.shields.io/static/v1?label=node&message=%3E=14.17.0&logo=node.js&color=3f893e&style=flat)](https://nodejs.org/about/releases)

[English](README.md) | 简体中文

## 概述

📦 开箱即用  
🎯 基于官方的 [react-ts](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) 模板, 低侵入性  
🌱 结构清晰，可塑性强  
💪 支持在渲染进程中使用 Electron、Node.js API  
🔩 支持 C/C++ 模块  
🖥 很容易实现多窗口  

## 快速开始

```sh
npm create electron-vite
```

![electron-vite-react.gif](https://github.com/electron-vite/electron-vite-react/blob/main/public/electron-vite-react.gif?raw=true)

## 调试

![electron-vite-react-debug.gif](https://github.com/electron-vite/electron-vite-react/blob/main/public/electron-vite-react-debug.gif?raw=true)

## 目录

*🚨 默认情况下, `electron` 文件夹下的文件将会被构建到 `dist/electron`*

```tree
├── electron                  Electron 源码文件夹
│   ├── main                  Main-process 源码
│   ├── preload               Preload-scripts 源码
│   └── resources             应用打包的资源文件夹
│       ├── icon.icns             应用图标(macOS)
│       ├── icon.ico              应用图标
│       ├── installerIcon.ico     安装图标
│       └── uninstallerIcon.ico   卸载图标
│
├── release                   构建后生成程序目录
│   └── {version}
│       ├── {os}-unpacked     未打包的程序(绿色运行版)
│       └── Setup.{ext}       应用安装文件
│
├── public                    同 Vite 模板的 public
└── src                       渲染进程源码、React代码
```


## 🚨 这需要留神

默认情况下，该模板在渲染进程中集成了 Node.js，如果你不需要它，你只需要删除下面的选项. [因为它会修改 Vite 默认的配置](https://github.com/electron-vite/vite-plugin-electron/tree/main/packages/electron-renderer#config-presets-opinionated).

```diff
# vite.config.ts

electron({
- renderer: {}
})
```

## FAQ

- [dependencies vs devDependencies](https://github.com/electron-vite/vite-plugin-electron/tree/main/packages/electron-renderer#dependencies-vs-devdependencies)
- [Using C/C++ native addons in Electron-Renderer](https://github.com/electron-vite/vite-plugin-electron/tree/main/packages/electron-renderer#load-nodejs-cc-native-modules)
- [Node.js ESM packages](https://github.com/electron-vite/vite-plugin-electron/tree/main/packages/electron-renderer#nodejs-esm-packages) (e.g. `execa` `node-fetch`)
