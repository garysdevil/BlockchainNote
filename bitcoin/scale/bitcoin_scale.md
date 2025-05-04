---
title: "比特币网络扩容方案"
created_date: 2024-01-30
---

[TOC]

## 增大区块
- 内容： 2017 年 8 月，比特币实施隔离见证（SegWit）升级。
- 优点： 通过交易信息与签名信息的分离，将有效区块大小从 1M 提升到了 4M，一定程度缓解了拥堵问题。
- 缺点： 由于比特币区块本身大小的限制，无法对一个区块的存储信息无限扩容，因而通过对区块存储信息扩容提高效率的方式便到此为止。

## 闪电网络
- 闪电网络 Taproot Assets (Taro)
- https://lightning.network/lightning-network-paper.pdf
- 内容： 闪电网络是基于比特币的二层扩容方案，允许在不访问区块链的情况进行下交易。
- 优点： 极大提高了吞吐量。
- 缺点： 较大的中心化风险。
- 现有的闪电网络解决方案有 OmniBOLT，Stacks 等。

- 闪电网络一直在尝试扩展其用例，BRC20 的火热促使了 Lightning Labs 发布了 Taproot Assets，这着也是一个 BTC 上发行 Token 的协议。
- 与 Brc20 等都不相同，Taproot Assets 仅仅在 BTC 主网的 UTXO 输出脚本中写入了 Token 的信息，没有存储这个 Token 的转账、mint 等功能代码。
- Taproot Assets 仅将 BTC 主网看作 Token 的注册表，并不是完全依赖 BTC 主网运行，因此这些资产必须被存入闪电网络中才能进行交易。
- 因此  Taproot Assets 的 Token 必须依赖第三方的存储索引器，离开了存储索引器这些 Token 即将永远地丢失。
- 因此用户要么自己运行一个 BTC 的全节点和 Taproot Assets 客户端，要么完全依赖一个中心化的服务器交易 Taproot Assets Token，这可能是目前 BTC Token 协议中最中心化的方案。

- aproot Assets 的打新方式：用户不能直接在 BTC 主网中发送交易自助地铸造 Token，而是有一个项目方地址一次性发行 ( 或者叫注册 ) 所有的 Token，然后再由项目方转入闪电网络进行分发。

## 侧链技术
- 内容： 侧链技术是在比特币网络之外搭建一条侧链，侧链上的资产按 1:1 与 BTC 锚定。
- 优点： 提高了吞吐量。
- 缺点： 永远无法达到 BTC 主网的安全性。

## L2区块链
- Stacks 是一个比特币 Layer 2 区块链，通过 Proof of Transfer（PoX）机制与比特币主链锚定，支持智能合约和去中心化应用（DApps）。