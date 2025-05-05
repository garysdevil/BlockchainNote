---
created_date: 2022-11-01
---

[TOC]

## 相关链接

- Aleo

  1. 项目官网 https://aleo.org/
  2. 官方博客 https://www.aleo.org/blog
  3. Twitter https://twitter.com/AleoHQ
  4. Discord https://discord.gg/QHmyeHCMQn
  5. Github https://github.com/AleoHQ
  6. 区块链游览器 https://www.aleo.network/

- Aleo隐私智能合约平台 SDK

  1. Aleo SDK https://github.com/AleoHQ/aleo
  2. Aleo SDK主要贡献者entropy1729团队官网 https://www.entropy1729.com/
  3. Aleo SDK主要贡献者entropy1729团队GIthub https://github.com/Entropy1729
  4. 在线Aleo钱包生成工具 https://aleohq.github.io/aleo/
  5. Aleo SDK基本概念 https://www.entropy1729.com/aleo-introduction
  6. Aleo SDK基本语法 https://www.entropy1729.com/aleo-development-starter-pack/

- Leo隐私智能合约编程(内嵌Aleo SDK)

  01. Leo白皮书 https://eprint.iacr.org/2021/651.pdf
  02. Leo源码 https://github.com/AleoHQ/leo
  03. Leo的ARC提案 https://github.com/AleoHQ/ARCs
  04. Leo官网 https://leo-lang.org/
  05. Leo的IDE https://aleo.studio/
  06. Leo在线IDE https://play.leo-lang.org/
  07. Leo文档 https://developer.aleo.org/leo/getting_started/overview
  08. Leo包管理中心 https://aleo.pm/
  09. Aleo链上的Leo程序 https://www.aleo.network/programs
  10. Leo编程语言的语法格式 https://github.com/AleoHQ/grammars
  11. Leo编程介绍 https://www.entropy1729.com/leo-development-starter-pack/

- Aleo SDK编程案例

  - https://github.com/zkprivacy/aleo-vote

- Leo编程案例

  1. ARC20 https://github.com/Entropy1729/ARC20_leo
  2. Bulls and Cows game(公牛和奶牛比赛游戏) https://github.com/mlsmith/aleo-numbers
  3. ZK coinflip https://github.com/demox-labs/zk-coinflip
  4. battleship游戏 https://github.com/demox-labs/zk-battleship
  5. 隐私NFT https://github.com/demox-labs/aleo-nft
  6. CTO讲述leo编程案例 https://youtu.be/-FrrylHITvg

## 愿景

1. 比特币: 去中心化
2. 以太坊: 去中心化 + 可编程性
3. Zcash: 去中心化 + 隐私性
4. Aleo: 去中心化 + 可编程性 + 隐私性

## 原理

### 技术原理

1. 核心论文

   1. Aleo 项目介绍视频 https://www.youtube.com/watch?v=Bz2KN_h3VKM&t=1903s
   2. Aleo POSW文档 https://developer.aleo.org/advanced/posw/posw/
   3. Aleo的实现是基于Zexe论文 https://eprint.iacr.org/2018/962
   4. Aleo项目使用的zkp算法Marlin算法论文 https://eprint.iacr.org/2019/1047.pdf
   5. Leo应用编程语言论文 https://eprint.iacr.org/2021/651.pdf
   6. AleoBFT共识机制论文 https://arxiv.org/abs/1803.05069

2. POSW (Proof of Succinct Work ) 共识机制

   1. POSW是一种基于SNARK(Succinct Non-interactive ARgument of Knowledge) 的POW算法，用于激励开发SNARK加速的硬件。
   2. PoSW为比特币SHA-based difficulty adjusting算法的变种，最关键的不同之处是 底层计算不是hash运算，而是proof of knowledge计算，使得PoSW作为PoW来保证系统共识。

3. ZKP

   1. Aleo主要针对四种电路进行了四次零知识证明: PosW Ciruit/Inner Circuit/Outer Circuit/Program Circuit。
   2. 零知识证明涉及到的算法 Groth16、 Marlin、 KZG10
      1. KZG10 https://www.iacr.org/archive/asiacrypt2010/6477178/6477178.pdf

-

1. 去中心化账本模型

   1. 比特币系列的项目用的是 UTXO Model
   2. 以太坊系列的项目用的是 Account Model
   3. Aleo使用 Record Model

2. DPC

   1. Aleo使用零知识机制创建了一个新的密码学原语：decentralized private computation (DPC)。
   2. 在DPC中，用户链下进行计算和生成交易，证明计算的正确性。
   3. DPC的特点
      1. 交易隐藏了所有的链下计算信息。
      2. 交易能被在固定时间内进行验证，和链下的计算时间无关。
      3. 交易数据只有968个字节，和计算时间无关。
      4. 生成交易并不会产生gas费用，因此应用可以运行无限长的时间。

### 技术亮点（同系列项目中的突出点创新点）

- 以太坊系列去中心化账本，交易都是链上执行，最终状态保存在链上。
  - 浪费资源，每一个挖矿节点都需要执行一次交易里的计算内容。
  - 没有隐私，交易数据被永久的公开的保存在链上。
- Aleo去中心化账本，交易在链下执行，最终状态保存在链上。（链下完成交易计算生成零知识证明，链上只需要对零知识证明的验证）
  - 可扩展性，每个块中可以有几千个交易被验证。
  - 保护隐私，链下计算的数据不会被上传到链上，数据不会被暴露。
  - 简洁性，计算结果很小并且能很快被验证（几千字节的数据在50毫秒内可以被验证）
  - 可编程性。
