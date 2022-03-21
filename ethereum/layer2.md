# Layer2

- 区块链网络的不可能三角
    - 去中心
    - 安全性
    - 可扩展

- 以太坊扩容方案分为两个基本类别
    - 一类是将以太坊网络的工作任务拆分给节点，也就是ETH2要实现的链上分片。
    - 一类是让用户把大部分交易都放在以太坊链下的Layer2协议里，通过打包汇总交易提交到以太坊网络。

## 相关链接
- 锁仓量排名 https://l2beat.com/

## Layer2
- 状态通道(State Channel)
    - 状态通道是先将一定量的资金存入智能合约里；链外进行签名；需要结算时进行链上的广播。
    - 相关项目：Rainden、Celer。（闪电网络 利用的技术就是 状态通道）

- 侧链(Sidechains)
    - 侧链有自己的验证者、共识计算，通过桥接和主链进行通讯和交易。
    - 优点：实现了Layer2，减轻以太坊的负担。
    - 缺点：侧链是独立运行的，如果侧链上出现问题，比如侧链节点作恶或遭到攻击，会导致侧链执行交易有误，也就导致返回给Layer1的结果也是错误的。侧链的安全性不够。
    - 相关项目：POA

- 侧链(Sidechains) Plasma协议
    - Plasma是一种特殊的侧链。利用智能合约和默克尔树依附主链建立无数的子链。链外进行签名；需要结算时将一笔笔交易生成默克尔树根，将默克尔树根传进 Plasma 链上，...
    - 优点：有验证。Plasma不是完全被托管的，它使用了欺诈性证明的退出机制，当检测到plasma链上出现错误时，用户可以安全的从plasma链上退出，因此plasma具有更高的安全性。
    - 缺点：Plasma返回给Layer1的仅有交易结果、没有交易信息。侧链资产锁定期为7～14天才能提取到以太坊主链上。
    - 相关项目：Matic

- Optimistic Rollup
    - 优点：有验证、交易数据完整性、数据压缩性。返回给Layer1的有交易结果和交易的信息，这些数据被压缩后返回给Layer1。
    - 缺点：提款到链上需要等待一定的周期。
    - 相关项目
        - Optimism（OVM虚拟机）
        - Arbitrum

- ZK Rollup
    - Zero—Knowledge Proof，零知识证明
    - ZK Rollup 是基于零知识证明的二层扩容方案(layer2)， ZK Rollup方案起源于18年下半年，由Barry Whitehat和Vitalik先后提出。Rollup顾名思义有“卷起”和“汇总”的意思，将大量的交易“卷起/汇总”打包成一个交易。原理为链下进行复杂的计算和证明的生成，链上进行证明的校验并存储部分数据保证数据可用性。
    - 优点：有验证、匿名性、数据压缩性。
    - 相关项目
        - zkSync
        - Loopring
        - StarkEx

## ZK Rollup 和 StarkEx
- 参考
    - https://newsletter.banklesshq.com/p/the-best-comparison-on-zkrollups?s=r

- 对比
    - StarkEx has introduced a new system termed validium to offer a cheaper option to apps and users.
    - Validium’s mechanism is very similar to a zkRollup, the only difference being that data-availability in a zkRollup is on-chain, while Validium keeps it off-chain. This permits Validium to achieve considerably higher throughput

