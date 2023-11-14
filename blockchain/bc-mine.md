[TOC]

## POW
1. 通过对等节点，下载最新的块高（网络资源）
2. 完成下载一个块高后，进行块高的验证（CPU资源）

3. 判断是否？？？？

4. 计算数学题，获取出块资格（CPU资源）
5. 生成一个块高（CPU资源）
6. 将块高进行广播（网络资源）

## 术语
- Difficulty Target: 当计算出来的值小于等于这个值，则可以将交易封装成块高。
- weight: 当前block的weight，往往和POW所付出的计算量相关，取决于项目的具体实现细节。
- Cumulative Weight: 链上所有weight总合。当出现分叉时，最终会选择Cumulative Weight更大的一条链。

- 比特币的出块时间
```python
出块时间(单位：秒) ≈ difficulty_当前 * 2^32 / 全网算力（单位：H/s）
```

- coinbase transaction
    - coinbase transaction 是矿工自己构建的，用于把出块奖励和手续费奖励给自己。
    - 区块里的第一个交易就叫做 coinbase transaction。
    - 每个交易都会包含一个 input 和一个 output 。
    - coinbase transaction 的 input 就是 coinbase 。
    - coinbase transaction 的 output 指向矿工的地址，总金额等于 coinbase 加上区块中全部交易的手续费。



## 算力的单位
- 1H/s=每秒1次哈希碰撞
- 1KH/s=1024H/s
- 1MH/s=1024KH/s
- 1GH/s=1024MH/s
- 1TH/s=1024GH/s
- 1PH/s=1024TH/s
- 1EH/s=1024PH/s

## 区块整体结构

| 字节 | 字段       | 说明                                                         |
| :--- | :--------- | :----------------------------------------------------------- |
| 4    | 区块大小   | 用字节表示的该字段之后的区块大小                             |
| 80   | 区块头     | 组成区块头的几个字段                                         |
| 1-9  | 交易计数器 | 该区块包含的交易数量，包含coinbase交易                       |
| 不定 | 交易       | 记录在区块里的交易信息，使用原生的交易信息格式，并且交易在数据流中的位置必须与Merkle树的叶子节点顺序一致 |

## 芯片与算力
- https://hashrate.no/GPUcalculator?