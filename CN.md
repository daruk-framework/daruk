<p align="center"><img width="90%" src="https://user-images.githubusercontent.com/289225/56637111-66140f00-669d-11e9-8ea9-501a37528e01.png" alt="daruk web framework for nodejs"></p>

<hr>

# Daruk

[Daruk](https://darukjs.github.io/daruk.org) 是一款基于 Koa2，使用 typescript 开发的轻量级 web 框架。使用过 koa2 框架的朋友应该知道，koa2 属于比较原始和基础的 http server 实现，在日常的开发工作中，我们可能需要通过安装很多开源的中间件，自己完成复杂的项目配置，路由管理，以及和业务无关的工作：如日志，监控，性能等基础组件的定制。

有了 Daruk，我们可以轻松地一键初始化你的 web 项目，快速的编写业务代码。Daruk 的目的就是轻量和易扩展，新增的概念少，上手难度低，核心代码也不多，但是可以提供给开发者更多的灵活选择，快速完成业务开发，约束项目规范和代码格式。

Daruk 来源自塞尔达传说旷野之息里的四英杰之一，拥有在周围张开结界保护自己的力量，框架的目的也是为了给 nodejs server 提供健壮的基础管理能力。

Daruk 基于 koa2，包含以下核心功能：

- 一键生成项目，开箱即用
- 合理和克制的分层目录结构
- 自动 loader 与装饰器结合的机制
- 完整的 typescript 开发体验
- 服务启动完整生命周期 hook
- 自定义(性能日志 & 业务日志) 染色功能
- 支持线上实时性能分析
- 轻量级的链路追踪
- 面向对象的 mvc 开发体验
- 配套的一些周边模块

## Installation & Quick start

```bash
# 全局安装 daruk 脚手架
cnpm i -g daruk-cli

# 初始化项目
# --ignore 表示忽略本地模板缓存
daruk init --ignore daruk-example

# 运行项目
cd daruk-example
npm run dev
```

## Demo video

<p align="left"><a href="https://v.youku.com/v_show/id_XNDExMjA5MTI2NA==.html?spm=a2hzp.8244740.0.0" target="_blank">点击开始</a></p>

## Docs

查看 Daruk 文档[快速开始](http://darukjs.com/)吧！
