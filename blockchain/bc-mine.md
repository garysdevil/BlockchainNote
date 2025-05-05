---
title: 区块链的挖矿
created_date: 2022-03-20
---

[TOC]

## 链接

- 芯片与算力 https://hashrate.no/GPUcalculator?
- 矿池列表 https://miningpoolstats.stream/

## POW

1. 通过对等节点，下载最新的块高（网络资源）
2. 完成下载一个块高后，进行块高的验证（CPU资源）
3. 检查本地块高是否最新，若否，继续同步；若是，评估出块条件。
4. 计算数学题，获取出块资格（CPU资源）
5. 生成一个块高（CPU资源）
6. 将块高进行广播（网络资源）

## 术语

1. Difficulty Target: 当计算出来的值小于等于这个值，则可以将交易封装成块高。

2. weight: 当前block的weight，往往和POW所付出的计算量相关，取决于项目的具体实现细节。

3. Cumulative Weight: 链上所有weight总合。当出现分叉时，最终会选择Cumulative Weight更大的一条链。

4. 比特币的出块时间 `出块时间(单位：秒) ≈ Difficulty_Target * 2^32 / 全网算力（单位：H/s）`

5. coinbase transaction

   - coinbase transaction 是矿工自己构建的，用于把出块奖励和手续费奖励给自己。
   - 区块里的第一个交易就叫做 coinbase transaction。
   - 每个交易都会包含一个 input 和一个 output 。
   - coinbase transaction 的 input 就是 coinbase 。
   - coinbase transaction 的 output 指向矿工的地址，总金额等于 coinbase 加上区块中全部交易的手续费。

6. nTime 区块中nTime表示该区块产生的近似时间。

   - 如果当前区块的时间戳大于前11个区块的的平均时间戳，并且小于“网络调整时间(Network-Adjusted Time)”+2小时，则认为该时间戳是有效的。
   - “网络调整时间”是指与你相连接的所有节点的平均时间。当节点A连接到节点B时，A从B处得到一个UTC标准的时间戳，A先转换成本地UTC标准时间保存起来，”网络调整时间“等于所有节点的本地UTC时间+所有相连节点的偏移量平均值。
   - ”网络调整时间“永远不会调整到超过本地系统时间70分钟以上。

7. nBits 区块中nBits(算法难度目标值)表示区块中的难度目标，该值被存为 系数/指数 16进制格式，前2位为指数，接下来6位为系数。

   1. 难度目标计算的公式： `目标值 = 系数 * 2^(8 * (指数– 3))`
   2. 假如一个难度为0x1903a30c，则`Target=0x03a30c * 2^(0x08 * (0x19 - 0x03))`

8. 全网难度调整

   1. 比特币的全网难度调整公式 `New Difficulty = Old Difficulty * (Actual Time of Last 2016 Blocks / 20160 minutes)`

9. nNonce 区块中nNonce(工作量证明算法的计数器)

   1. Nonce随机数通常不同，但是它以严格的线性方式增长，从0开始，每次HASH时都会增长，当Nonce溢出时(此事经常发生)，生产交易的extraNonce项会增长，将改变Merkle树的根节点。

## 区块整体结构

| 字节 | 字段 | 说明 |
| :--- | :--------- | :----------------------------------------------------------- |
| 4 | 区块大小 | 用字节表示的该字段之后的区块大小 |
| 80 | 区块头 | 组成区块头的几个字段 |
| 1-9 | 交易计数器 | 该区块包含的交易数量，包含coinbase交易 |
| 不定 | 交易 | 记录在区块里的交易信息，使用原生的交易信息格式，并且交易在数据流中的位置必须与Merkle树的叶子节点顺序一致 |

- 块头 Block header
  1. Block version, nbits, hash of previous block in the blockchain and some padding bytes, which are constants.
  2. Nonce and ntime, which miner can modify already.
  3. Merkle root hash, which is created by hashing of bitcoin transactions included in the particular mining job.

## 算力的单位

- 1H/s=每秒1次哈希碰撞
- 1KH/s=1024H/s
- 1MH/s=1024KH/s
- 1GH/s=1024MH/s
- 1TH/s=1024GH/s
- 1PH/s=1024TH/s
- 1EH/s=1024PH/s
