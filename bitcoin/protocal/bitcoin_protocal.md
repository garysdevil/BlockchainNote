---
title: 协议扩展（Protocol Extensions）
created_date: 2023-11-10
---

[TOC]

## Ordinals 
- Ordinals 是一种比特币协议，通过为每个聪（Satoshi）分配唯一编号并附加铭文（Inscriptions），实现类似 NFT 的功能。铭文可存储文本、图片等数据，基于 SegWit 和 Taproot 升级。
- https://domo-2.gitbook.io/brc-20-experiment/

- 应用
    1. BRC 20 ![](./ordinals_brc20.md)
    2. BRC721 https://twitter.com/poyo_eth

## Atomical
- https://twitter.com/atomicalsxyz
- https://docs.atomicals.xyz/
- Atomicals Protocol 是另一个在 UTXO 上刻入数据实现 Token 的衍生协议。
- 不同于最初为 NFT 设计的 Ordinals，它从底层重新思考了如何在 BTC 上中心化的、不可篡改、公平地发行 token。
- Atomicals 以比特币的最小单位 sat 作为基本「原子」，每一个 sat 的 UTXO 用来代表这个 Token 本身，1 token = 1 sat。
- 当验证一个 Atomicals 交易时，只需要在 BTC 链上查询对应 sat 的 UTXO 即可。ARC20 Token 的原子性和 BTC 本身的原子性保持一致，ARC20 的转账的计算完全由 BTC 基础网络处理。
- 支持 Atomical 协议的钱包 https://atomicalswallet.com/  https://atomicals-1.gitbook.io/atomicals-wallet-1/   
- 市场 https://atomicalmarket.com
- 应用
    - ARC20
    - Realms


## Runes
- Casey 提出了一种专门用于发行 NFT 的铭文实现方式即 Rune。
    - Rune 的设计可能也受到了 ARC20 的影响，选择直接在 UTXO 的脚本中写入 Token 数据，这包含了 Token 的 ID、输出与数量。
    - Rune 的实现与 ARC20 非常相似，将 token 转账直接交给 BTC 主网处理。区别在于， Rune 在脚本数据中写入了 Token 数量，这让他比 ARC20 具备更高的精度。
    - #Trac 的创始人基于此构想编写了第一个可用协议，并发行了 $pipe