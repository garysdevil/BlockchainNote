---
title: 比特币协议扩展（Protocol Extensions）
tags: [blockchain, bitcoin, ordinals, atomicals, runes, rgb]
created_date: 2023-11-10
---

[TOC]

## Ordinals

### 定义

- Ordinals 是一种比特币协议，通过为每个聪（Satoshi）分配唯一编号并附加铭文（Inscriptions），实现类似 NFT 的功能。铭文可存储文本、图片等数据，依赖 SegWit 和 Taproot 升级。

### 应用

1. BRC721 https://twitter.com/poyo_eth
2. [更多的相关信息](./ordinals)

## Atomical

### 链接

- 官方推特 https://twitter.com/atomicalsxyz
- 官方文档 https://docs.atomicals.xyz/
- 支持 Atomical 协议的钱包 https://atomicalswallet.com/ https://atomicals-1.gitbook.io/atomicals-wallet-1/
- 交易市场 https://atomicalmarket.com

### 定义

- Atomicals Protocol 是另一个在 UTXO 上刻入数据实现 Token 的衍生协议。

- 不同于最初为 NFT 设计的 Ordinals，它从底层重新思考了如何在 BTC 上中心化的、不可篡改、公平地发行 token。

- Atomicals 以比特币的最小单位 sat 作为基本「原子」，每一个 sat 的 UTXO 用来代表这个 Token 本身，1 token = 1 sat。

- 当验证一个 Atomicals 交易时，只需要在 BTC 链上查询对应 sat 的 UTXO 即可。ARC20 Token 的原子性和 BTC 本身的原子性保持一致，ARC20 的转账的计算完全由 BTC 基础网络处理。

### 应用

- ARC20
- Realms

## Runes

### 定义

- Casey 提出了一种专门用于发行 NFT 的铭文实现方式即 Rune。
- Rune 的设计可能也受到了 ARC20 的影响，选择直接在 UTXO 的脚本中写入 Token 数据，这包含了 Token 的 ID、输出与数量。
- Rune 的实现与 ARC20 非常相似，将 token 转账直接交给 BTC 主网处理。区别在于， Rune 在脚本数据中写入了 Token 数量，这让他比 ARC20 具备更高的精度。
- #Trac 的创始人基于此构想编写了第一个标准，并发行了 $pipe

## RGB

### 链接

- https://rgb-org.github.io/
- https://rgb.tech/

### 定义

- RGB（Really Good Bitcoin）

- RGB Protocol 是一种在比特币主链上发行和管理资产（如代币、NFT）的协议，通过在交易中嵌入元数据（通常使用 OP_RETURN 或见证数据）并结合链下客户端验证（Client-Side Validation, CSV）实现复杂逻辑。

- RGB旨在为比特币带来类似以太坊的智能合约功能，同时保持比特币的安全性和去中心化特性。

- 时间线

  - 2016 年，RGB 协议最初由 Peter Todd 提出。
  - 2023 年，在比特币上智能合约生态的开发热潮中，RGB 协议再次得到关注。
