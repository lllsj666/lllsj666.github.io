---
title: "Claude Code 安装与前置环境配置全流程教程"
date: 2026-05-11
updated: 2026-05-11
author: "覆覆"
categories:
  - 教程
tags:
  - Claude Code
  - AI 编码
  - 开发环境
  - VS Code
  - 新手教程
  - DeepSeek
description: "从零开始搭建 Claude Code AI 编码环境，涵盖 Git、Node.js、VS Code 安装，以及 Claude Code + CC Switch 中转配置的完整流程，适合纯小白跟着一步步操作。"
cover: /img/文章/FG003.webp
toc: 
---

## 前言

首先申明 使用Claude的外接大模型包括官方大模型，只要使用并消耗了token就必定会有花销。

现在越来越多开发者开始使用 AI 编码工具来提升开发效率，**Claude Code** 就是其中佼佼者。它可以帮助我们理解项目、修改代码、生成文件，甚至配合 VS Code 直接完成一部分开发工作。

这篇文章主要面向新手，带你一步步完成 Claude Code 的使用环境搭建。只要跟着步骤走，基本都能将 Claude Code 成功部署到本地。

整体流程分为以下五步：

1. 安装基础开发环境：Git、Node.js / Next.js
2. 安装代码编辑器：VS Code
3. 安装 AI 编码工具：Claude Code
4. 配置 API 中转工具：CC Switch
5. 安装 VS Code 插件：Claude Code for VS Code、Tailwind CSS

> **说明：** 文中括号里的内容是后续可以插入的视频教程链接位置，你可以在对应步骤中找到配套的图文或视频教程。

---

## 一、安装基础环境依赖：Git、Node.js / Next.js

在正式安装 Claude Code 之前，我们需要先准备好一些基础开发环境。

这一步可以理解为"给电脑装上写代码所需的基础工具"。如果没有这些工具，后面很多命令可能无法正常运行。

### 1. 安装 Git

**Git** 是一个分布式版本管理工具。简单来说，它可以帮助我们管理代码版本，也可以从 GitHub 等平台直接克隆项目代码。

很多开发工具默认依赖 Git，所以这是必须安装的基础环境之一。

- **Git 下载地址：** [官网链接](https://git-scm.com/install/)
- **视频教程：** [Bilibili 教程（建议使用网页版打开）—— Git 安装教程](https://www.bilibili.com/video/BV15SwJzBEa6/?share_source=copy_web&vd_source=8ca03fb6c926e)

安装完成后，按 `Win + R` 输入 `cmd` 打开终端或命令行工具，输入以下命令检查是否安装成功：

```bash
git --version
```

如果看到类似下面的输出，说明 Git 安装成功了：

```
git version 2.x.x
```

---

### 2. 安装 Node.js

这一步建议重点安装的是 **Node.js**。

很多新手容易把 Node.js 和 Next.js 混淆，简单区分如下：

| 工具 | 定位 |
|------|------|
| **Node.js** | JavaScript 运行环境，支持高并发场景，很多前端工具依赖它 |
| **Next.js** | 基于 React 的前端开发框架，用于开发网站或 Web 应用 |

Claude Code、npm 以及很多前端项目都需要 Node.js 环境，所以在安装 Claude Code 之前，建议先安装 Node.js。

纯小白照着视频一步步操作基本都能正常安装，**建议不要将软件装在 C 盘（系统盘）**。

- **Node.js 官网链接：** [官网链接](https://nodejs.cn/)
- **视频教程：** [Bilibili 教程（建议使用网页版打开）—— Node.js 安装零基础教程 2025](https://www.bilibili.com/video/BV1sbjgzwEBX/?share_source=copy_web&vd_source=8ca03fb6c926efb27cc20b2fdd2ff395)

安装完成后，在命令行中依次输入以下两条命令验证：

```bash
node -v
```

如果能看到版本号，例如：

```
v20.x.x
```

说明 Node.js 安装成功。

再输入：

```bash
npm -v
```

如果也能看到版本号，说明 **npm**（Node.js 自带的包管理工具）也已就绪。后面安装 Claude Code 时会用到它。

---

## 二、安装 VS Code：常用代码编辑器

第二步，我们需要安装一个写代码的软件，这里推荐使用 **Visual Studio Code**，简称 **VS Code**。

VS Code 是目前非常流行的代码编辑器，具有以下优点：

- 完全免费
- 插件生态丰富
- 对新手友好
- 支持前端、后端、Python、Markdown 等多种开发场景
- 能够很好地配合 Claude Code 使用

- **VS Code 下载地址：** [直达官网链接](https://code.visualstudio.com/)
- **视频教程：** [Bilibili 教程 —— VS Code 使用教程【2025 最新】安装、配置、设置中文](https://www.bilibili.com/video/BV1tyAtetEd1/?share_source=copy_web&vd_source=8ca03fb6c926efb27cc20b2fdd2ff395)

安装完成后打开 VS Code，可以先熟悉几个常用区域：

- **左侧资源管理器**：查看项目文件
- **中间编辑区**：编写代码的主要区域
- **底部终端**：输入命令的地方
- **左侧插件栏**：安装扩展插件

后面我们会经常用到 VS Code 的终端功能。

打开终端的方法：

- 英文界面：`顶部菜单栏 → Terminal → New Terminal`
- 中文界面：`终端 → 新建终端`

---

## 三、安装 Claude Code 与 CC Switch

第三步就是安装本文最核心的工具：**Claude Code**。

Claude Code 可以理解为一个运行在命令行里的 AI 编码助手。它可以读取你的项目文件，根据你的需求修改代码、解释代码、生成新功能。

> **前置检查：** 在安装 Claude Code 之前，请确保你已经完成前面的环境准备：
> - ✅ 已安装 Git
> - ✅ 已安装 Node.js
> - ✅ 已安装 npm
> - ✅ 已安装 VS Code

- **全文字教程：** [Claude Code 安装教程](https://daheiai.com/cc-install.html)
- **视频教程：** [Bilibili 教程 —— 9 分钟搞定！Claude Code 与 CC Switch 保姆级安装 + 原理 + 真实用法（国内直连）](https://www.bilibili.com/video/BV1KjoxBoEQJ/?share_source=copy_web&vd_source=8ca03fb6c926efb27cc20b2fdd2ff395)

> **💡 备选方案：** 如果跟着视频安装时命令行始终无法成功下载，可以试试以下方法。我已经将 `claude.exe` 本体安装包打包好了：
>
> - [claude.exe 下载](https://wwbwq.lanzouv.com/ioL3Q3p8p87c)
>
> 下载后将本体放在固态硬盘中，双击 `Claude.exe`，然后再参照视频完成安装后的配置操作即可。

视频后半部分还包含了 **CC Switch** 的下载和配置方案，建议一并看完。

---

## 四、安装 VS Code 插件

最后一步，我们需要在 VS Code 中安装几个常用插件，让 Claude Code 和前端开发体验更流畅。

本篇建议安装以下两个插件：

### 1. Claude Code for VS Code

这个插件主要是为了让 Claude Code 更好地与 VS Code 编辑器配合使用。

安装方法：

1. 打开 VS Code
2. 点击左侧扩展插件图标
3. 搜索 `Claude Code for VS Code`
4. 点击安装

安装完成后，按照插件提示进行登录、配置或连接本地 Claude Code。如果配置成功，你就可以在 VS Code 里更方便地调用 Claude Code 了。

### 2. 外接 DeepSeek 大模型

本博主使用的是外接 **DeepSeek-V4 Pro【1M】** 方案，相关教程视频如下：

> **注意：** 这一步需要在安装好 Claude Code 以及中转工具 CC Switch 之后再进行。

- [Claude 外接 DeepSeek-V4 Pro 完整教程](https://www.bilibili.com/video/BV1ia9UBPESQ/?s)

---

## 后记

这些步骤当时博主真是一个一个翻找摸索出来的，在没有全流程教程的情况下，光是找资源和下载我就花了好几天时间。

可能有人会问：**为什么不直接使用 Claude 官方大模型，而要接 DeepSeek？** 主要有以下几个原因：

### 1. 地区限制

Claude 的官方模型订阅并不是全球开放的，至少目前不对国内开放。所以你访问 Claude 官网就会看到"暂不对该地区开放"的提示。

### 2. 风控严格

目前 Claude 官方模型的封控非常严格。在官方平台订阅会经历极其严格的新账号审核、异常登录检测、设备及设备 IP 风险判断，任何一环出问题都可能导致封号。

### 3. 账号和环境不匹配

常见问题包括：

- 注册邮箱和付款信息不一致
- IP 频繁跳变
- 浏览器环境异常
- 曾经失败次数过多被临时限制

鉴于以上原因，现在基本都采用 CC Switch 外接其他大模型的方案。而 **DeepSeek 的价格优惠程度是其他平台难以比拟的**。对初学者来说，无论是练习提示词功力还是熟悉 Claude Code 的使用，DeepSeek 都极具性价比，所以我非常推荐它（优惠截至时间26.5.31）。

当然，这并不代表你必须使用 DeepSeek。如果经济上没有压力，市面上其他大模型也都可以尝试，这并没有太大关系。

---

## 🎉 结语

**面向超级小白来说，很多人可能会觉得：这玩意儿安装都这么麻烦，那我真正用起来是不是会更麻烦？其实并不是。Claude Code 本身非常简单，你只需要输入提示词，告诉它你想要什么，它就会按照你的要求去执行。哪怕你输入的是中文，它也能直接给出中文的解决方案，所以大家完全可以放心上手，不用顾虑太多，先用起来再说。**

**最后，恭喜已经成功安装的朋友们——现在你们可以正式使用 Claude Code 外接大模型了，尽情发挥自己的创造力吧！**

---

> *El Psy Congroo！*
