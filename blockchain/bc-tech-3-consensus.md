---
title: 区块链的共识机制
created_date: 2022-08-03
---

[TOC]

## 共识机制

- 目的：保障分布式系统各个节点的数据一致性

### 传统可信任节点间的共识算法

- Paxos和Raft算法

### 不可信任节点间的共识机制

- 中本聪共识算法

  - 最长链的规则。
  - 当节点看到提议的区块拥有最多的工作量证明，那就接受它，所以它也是一种概率性的规则，确认的区块深度越长，交易就越难被逆转。

- 经典共识算法

  - PBFT共识算法，当系统中的大多数参与者对提议区块投赞成票，系统中参与者将其接受为正确区块，且一旦投票通过，区块具有最终性，不存在回滚的可能。

## 提议区块机制(出块机制)

01. 工作量证明 POW(Proof of Work)

    1. 达到可以打包出块的条件
    2. 节点通过（ 交易记录 + 上一个区块的哈希值 + 时间搓 + ... + Nonce ） 计算Hash值
    3. Hash值满足系统规定的条件，则将数据进行打包出块；否则改变Nonce值，继续计算Hash值
    4. 向一些节点发送区块，向其它节点节点发送区块Hash值
    5. 当节点收到新的区块Hash值后，验证Hash值，诺正确则停止计算Hash值，并且主动去同步此区块
    6. 当节点接收到新区块时，它将依据规则列表对其进行验证，验证成功则接受此区块

    - 安全的前提：不会出现某个节点的算力大于全网算力的50%。

02. 权益证明 PoS(Proof of Stake)

    - 根据节点持有代币的数量和时长决定账户获取出块权的概率。
    - 安全的前提：持币多者不会去篡改账本，破坏系统的信用。

03. 委托权益证明 DPoS(Delegated Proof-of-Stake)

    - 节点投票选出N个候选人，每次出块时，出块权随机分配给某个候选人。
    - 根据节点持有代币的数量和时长决定账户投票时的权重。

04. 权威证明 PoA(Proof of Authority)

05. 容量证明 (Proof-of-space，PoSpace，又称 Proof-of-Capacity，PoC)

06. 存储证明 (Proof-of-Storage, PoS)

    1. 为存储空间提供的证明机制。

07. 数据持有性证明 PDP(Provable Data Possession)

    1. 用户发送数据给矿工进行存储，矿工证明数据已经被自己存储，用户可以重复检查矿工是否还在存储自己的数据。

08. 可检索证明 (Proof-of-Retrievability，PoRet) 和PDP过程比较类似，证明矿工存储的数据是可以用来查询的。

09. 复制证明 (Proof-of-Replication，PoRep) 存储证明PoS的一个实际方案，用以证明数据被矿工独立地保存，可以防止女巫攻击，外源攻击和生成攻击。

10. 空间证明 (Proof-of-Space，PoSpace) 存储量的证明，PoSpace是PoW的一种，不同的是PoW使用的计算资源，而PoSpace使用的是存储资源。

11. 时空证明 (Proof-of-Spacetime，PoSt) 证明在一段时间内，矿工在自己的存储设备上实际的存储了特定的数据。

12. 活跃证明（Proof of Activity，PoA） 是一种PoW+PoS混合共识机制

## 拜占庭将军问题

- 拜占庭将军问题是 Leslie Lamport （2013年的图灵讲得主）在1982年用来为描述分布式系统一致性问题（Distributed Consensus）时在[论文中](http://lamport.azurewebsites.net/pubs/byz.pdf) 抽象出来一个著名的例子。

- 拜占庭容错 BFT (Byzantine Fault Tolerance)

  - 是这解决拜占庭将军问题的所有算法的一个总称。

- 联邦拜占庭协议（FBA，Federated Byzantine Agreement）

- 授权拜占庭容错算法（dBFT，Delegated Byzantine Fault Tolerance）

### 实用拜占庭容错算法

- 名称： 实用拜占庭容错算法 PBFT（Practical Byzantine Fault Tolerance）
- 来源： Miguel Castro和Barbara Liskov在1999年发表的论文中首次提出PBFT算法。
- 功能： 是一种在信道可靠的情况下解决拜占庭将军问题的实用方法。
- 算法要求
  1. 总节点数N > 3F+1（其中F代表作恶节点）
  2. 系统的失效节点数量不得超过全网节点的1/3

## Quorum机制

- 为了保持数据冗余与一致性，需要对应的投票机制进行维持，这就是Quorum机制。

## DAG（Directed Acyclic Graph）有向无环图

- DAG区块链的与传统区块链的区别

  1. 单元：传统区块链组成单元是Block（区块），DAG组成单元是TX（交易）。
  2. 拓扑：传统区块链是由Block区块组成的单链，只能按出块时间同步依次写入，类似于单核单线程CPU；DAG是由交易单元组成的网络，可以异步并发写入交易，类似于多核多线程CPU。
  3. 粒度：区块链每个区块单元记录多个用户的多笔交易，DAG 每个单元记录单个用户交易。

- 最早在区块链中引入DAG概念作为共识算法的是2013年，http://bitcointalik.org 上由ID为avivz78的以色列希伯来大学学者提出，也就是GHOST协议，作为比特币的交易处理能力扩容解决方案；Vitalik在以太坊紫皮书描述的POS共识协议Casper，也是基于GHOST POW协议的POS变种。
