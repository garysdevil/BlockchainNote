---
created_date: 2022-03-21
---

[TOC]

## 链接

1. 链接
   1. 官网 https://thegraph.com
   2. 文档 https://thegraph.com/docs/developer/quick-start
   3. 去中心化费用 https://thegraph.com/docs/studio/billing

## 介绍

1. The Graph：一个去中心化的索引和查询协议，旨在为区块链数据提供高效、可扩展的访问方式，被称为“区块链的谷歌”。它通过使用 GraphQL 查询语言，允许开发者构建和查询开放的 API（称为 子图，Subgraphs），从而简化去中心化应用（dApp）的数据获取过程。
2. 创始人：Yaniv Tal（项目负责人）、Brandon Ramirez（研究负责人）、Jannis Pohlmann（技术负责人）
3. 原生代币：GRT（ERC-20 代币）

## 架构

1. 子图（Subgraphs）

   1. 子图是 The Graph 的核心概念，类似于开放的 API，定义了如何从区块链（如 Ethereum、IPFS）中提取、转换和存储数据。
   2. 开发者通过 Subgraph Manifest（JSON 文件）定义子图，指定需要索引的智能合约事件、数据结构和查询逻辑。
   3. 子图使用 GraphQL 提供标准化的查询接口，开发者可以通过简单的查询获取复杂区块链数据。

2. Graph Node

   1. Graph Node 是网络中的核心节点，负责扫描区块链数据、解析智能合约事件，并将数据索引到子图中。
   2. 它支持多链数据索引，目前兼容 Ethereum、IPFS、POA 等，未来计划扩展更多网络。

3. 网络参与者

   1. 用户（Comsumer）。用户向索引器支付查询费用。他们通常是终端用户，但也可能是集成 The Graph 的网络服务或中间件。
   2. 索引器（Indexer）。索引器是 The Graph 的运行节点。其动力是赚取财务奖励。
   3. 策展人（Curator）。策展人使用 GRT 代币来指明哪些子图值得索引。他们通常是开发者，也可能是支持他们在使用服务的终端用户，或者纯粹出于经济动机的一种角色。
   4. 委托人（Delegator）。委托人向某个 Indexer 质押 GRT 代币，赚取一部分通货膨胀奖励和费用，他们无需亲自运行一个 Graph 节点。这类角色主要出于经济动机。
   5. 渔夫（Fisherman）。渔夫们时刻检查查询响应是否正确，以此保护网络。渔夫动机是利他的，因此 The Graph 将率先为网络提供渔夫服务。
   6. 仲裁员（Arbitrator）。在争议解决期间，仲裁员决定是否对索引器进行罚没。他们可能出于经济或利他动机。

### 构建Subgraph

- Subgraph 结构

  1. Manifest 子图清单
     1. subgraph.yaml
     2. 定义子图的数据源和索引规则，作为子图的配置文件。
     3. https://github.com/graphprotocol/graph-node/blob/master/docs/subgraph-manifest.md
  2. Schema 数据模型
     1. schema.graphql
     2. 定义子图存储的数据结构和可查询的 GraphQL 接口。
  3. AssemblyScript Mappings 映射逻辑
     1. mapping.ts
     2. 定义从区块链原始数据到子图数据模型的转换逻辑。

- 数据源

  1. Smart contract
  2. Substreams
  3. Subgraph

```bash
# 1. 创建Subgraph https://thegraph.com/studio/

# 2. 安装 The Graph CLI 
npm install -g @graphprotocol/graph-cli

# 3. 初始化Subgraph
SUBGRAPH_SLUG=定义Subgraph的名字
graph init ${SUBGRAPH_SLUG}
# 下面以Loot合约为例，为了节省时间设置从特定的块高开始同步
# 以太坊主网 0xff9c1b15b16263c61d017ee9f65c50e4ae0113d7  从 13108877 块高开始
# rinkeby测试网络 0x117814e91a04067f11b5c16c75e8e21845a506ea  从 9243123 块高开始
# --index-events 合约内所有的事件都生成对应的schema
# subgraph.yaml 内定义了从哪个块高开始同步 dataSources[0].source.startBlock

# 4. 构建
cd ${SUBGRAPH_SLUG}
# 根据需求，在 schema.graphql 文件内添加schema
graph codegen # 根据schema.graphql生成了ts文件，默认放进generated文件夹内
# 根据需求，修改 src/mapping.ts 文件，如果在 src/mapping.ts 内添加了新的事件则需要修改 subgraph.yaml 文件
graph build # 本地构建wasm文件核实是否有语法错误，结果默认创建并放进build文件夹内

# 5. 部署进官方的Subgraph Studio
graph auth --studio $DEPLOY_KEY # 从官网 https://thegraph.com/studio/ 获取 DEPLOY_KEY
graph deploy --studio $SUBGRAPH_SLUG

# 假如需要部署进去中心化区块链网络里则需要在网页上支付对应的链上代币进行部署
```
