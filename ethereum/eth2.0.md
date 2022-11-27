## ETH2.0
- 经济模型 https://docs.ethhub.io/ethereum-roadmap/ethereum-2.0/eth-2.0-economics/

- 爆块时间 12s/block

- POS
    1. 一年释放大约 58.4 万枚 ETH 作为质押奖励。
    2. 每天大约释放 1600 枚ETH。
    3. 没小时大约释放 66.66 枚ETH。
    4. 每分钟大约释放 1.111 枚ETH。


- 提出区块和证明提议都需要在一个 slot 内完成，一般是 12s。每 32 个 slot 组成一个 epoch 周期，每个 epoch 将打乱验证者排序并重新选举委员会


## 以太坊2.0的过渡分三个阶段
1. 阶段0： 启动Beacon信标链。
   1. 将ETH资产逐步转移到 Beacon 链上，成为BETH。
   2. 用户可以在 Beacon 链上抵押 32 个 BETH 成为验证者，验证者仅仅管理 Beacon 链。
   3. 以太坊网络存在两条链，信标链 和 Eth1链（之前的PoW主链）。
   4. 所有用户交易和智能合约计算仍在Eth1链上进行。

2. 阶段1：启动Shards分片链。
   1. 将ETH资产逐步转移到分片链上。
3. 阶段2：实现Shards EVM虚拟机，引入执行层。
   1. 这个阶段是以太坊 2.0 各个重要功能汇聚，分片链升级，允许钱包转账，执行合约。
4. 阶段3：Light Clients


## 升级
1. 上海升级
   - 上海升级除了实现Beacon链上BETH质押提取功能外，还纳入了四项即将激活的 EIP。