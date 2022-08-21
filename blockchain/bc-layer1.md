[TOC]

- 公链

## Substrate
- Substrate 是一个构造区块链的“轮子”。
- 在Substrate之前，如果大家想要快速构造一条链，选择是非常少，而且可定制化程度也很低。基本上公链会fork Bitcoin，联盟链会直接使用Hyperledger。
- Substrate是一个开箱即用的构造区块链的SDK，从简单的智能合约，到中层的链上逻辑，或者底层的p2p网络、数据库、共识，都可以自由定制。

## 智能合约&DApp
- 智能合约是一小段存储在区块链中，能够自动执行合约条款的代码。
- DApp = 前端界面 + 智能合约 + token

- 原生代币：拥有自己的主链，使用链上的交易来维护账本数据
- 代币：依附于现有的区块链，使用智能合约来进行账本的记录

## 公链与联盟链
- 公链上的所有节点属于完全竞争、完全对立状态
- 联盟链上的各节点则是有限竞争并寻求整体利益的最大化

## IPFS（Inter Planetary File System）星际文件系统
- QUIC network transmission protocol is faster than TCP

## 跨链
- 目前的跨链技术，主要有以下几种实现模式：
    1. 公证人机制（Notary Schemes）公证人机制是链与链交互操作最简单的方法，由某个或某组受信任的团体来声明A链对B链上发生了某件事情。比较有代表的项目是Ripple，这种方式更关注金融资产的转移。
    2. 侧链/中继（Sidechains/Relays）是指由侧链或中继链来进行交易，用多中心化的方式来解决信任问题。比较有代表性的项目是Cosmos和Polkadot，它们比较侧重于解决跨链基础设施方面，也是现阶段关注度很高的技术热点。
    3. 哈希锁定（Hash-Locking）是通过智能合约来保障任意两个人之间的转账都可以通过一条“支付”通道来实现，完成“中介”的角色，比较有代表的项目是闪电网络。
    4. 分布式私钥控制（Distributed Private Key Control）是一种相对较新的跨链方式，它引入锁定和解锁的概念，通过这样的一个锁定和解锁的操作，可以对原有链上的Token进行管理权的操作。比较有代表性的项目是FUSION，实现了多Token种类的智能合约。


## 其它
1. 零工经济即采用众包方式来标注数据
2. 共享经济即帮助参与数据贡献的人获取数据变现收

## 区块
1. 比特币的一个区块大小大约是1M左右，可以保存4000笔交易记录。
