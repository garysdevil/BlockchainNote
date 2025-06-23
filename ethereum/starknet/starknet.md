---
created_date: 2025-05-20
---

[TOC]

## 简介
- 开发者资助

  1. Seed Grants Program
  2. Growth Grants Programshe

- Cairo 特征

  1. 创建可证明的程序
  2. 在 CairoVM 上运行
  3. 类似 Rust 的语法
  4. 类似 Rust 相似的所有权模型
  5. 强类型 traits macros
  6. 不专为智能合约设计
  7. 不需要了解 ZK 底层技术

- 为什么选择 Cairo

  1. 可以在不重新执行程序情况下，验证结果的正确性

- 为什么选择 Starknet

  1. 低 gas fee
  2. 以太坊作作为安全保障
  3. 强大的编程语言 Cairo
  4. 在以太坊上确认时间更短
  5. 不需要信任设置、抗量子计算

- 常用区块链浏览器

  - starkscan.co
  - https://voyager.online/

- 学习教程

  - book.cairo-lang.org

V神的zk-EVM分类

| | | | | |
| ----- | :--------------------------- | ------------- | ----------- | -------------------------------------- |
| | EVM Changes | Compatibility | Performance | Projects |
| Type1 | Nothing | Full | Very Slow | - |
| Type2 | Storage data structure | High | Slow | - |
| Type3 | Storage, hashes, precompiles | Partial | Fast | Kakarot, zkSync, Scroll, Polygon zkEVM |
| Type4 | Completely different VM | None | Very Fast | Starknet, Aztec\*, Polygon Miden |

- Cairo 最初是Starkware创建的一种计算机架构，用于程序执行和生成有效性证明。
- Cairo 名字的由来 CPU AIR Operation
- 由Cairo执行的低级字节码称为“Cairo Assembly” 或 CASM。
- Cairo语言 --> 编译为 Sierra --> 编译为 CASM

## Cairo

- Field elements = felt
- 默认数据类型是 felt252
- felt 可以表示的直 0 < X < p
- Cairo 1.0编译器依赖Rust

## Starklings

- https://starklings.app

1. Starklings 是交互式学习 Cairo 的工具
2. 由 Shramee 创建 @shrameetweets
3. Starklings App 由 Damian创建 @dpinoness

## starkli
1. 命令行工具（CLI），用于与 Starknet 网络交互（如声明、部署、调用合约）。
2. https://github.com/xJonathanLEI/starkli/releases/
3. curl https://get.starkli.sh | sh

## scarb
1. Cairo 和 Starknet 的构建工具链和包管理器，专注于编译和管理项目。
2. https://docs.swmansion.com/scarb/download.html
3. `curl --proto '=https' --tlsv1.2 -sSf https://docs.swmansion.com/scarb/install.sh | sh`

## Starknet Foundry
1. 一个开源的测试框架和 CLI 工具，专注于合约测试、调试和部署
   1. Scarb
   2. snforge（测试）
   3. sncast（账户/合约交互）

## scaffold-stark
1. 一个开源开发框架/模板，用于快速搭建 Starknet dApp，集成多种工具。
   1. 提供预配置项目结构（合约 + 前端）
   2. 集成 Scarb、Starknet Foundry、Next.js、Starknet.js、Starknet-React
   3. 支持快速部署和测试
   4. 提供 UI 组件和钱包集成


2. https://github.com/Scaffold-Stark/scaffold-stark-2