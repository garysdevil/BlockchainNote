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

## Layer2发展
1. 状态通道(State Channel)
    - 状态通道是先将一定量的资金存入智能合约里；链外进行签名；需要结算时进行链上的广播。
    - 相关项目：Rainden、Celer。（闪电网络 利用的技术就是 状态通道）

2. 侧链(Sidechains)
    - 侧链有自己的验证者、共识计算，通过桥接和主链进行通讯和交易。
    - 优点：实现了Layer2，减轻以太坊的负担。
    - 缺点：侧链是独立运行的，如果侧链上出现问题，比如侧链节点作恶或遭到攻击，会导致侧链执行交易有误，也就导致返回给Layer1的结果也是错误的。侧链的安全性不够。
    - 相关项目：POA

3. 侧链(Sidechains) Plasma协议
    - Plasma是一种特殊的侧链。利用智能合约和默克尔树依附主链建立无数的子链。链外进行签名；需要结算时将一笔笔交易生成默克尔树根，将默克尔树根传进 Plasma 链上，...
    - 优点：有验证。Plasma不是完全被托管的，它使用了欺诈性证明的退出机制，当检测到plasma链上出现错误时，用户可以安全的从plasma链上退出，因此plasma具有更高的安全性。
    - 缺点：Plasma返回给Layer1的仅有交易结果、没有交易信息。侧链资产锁定期为7～14天才能提取到以太坊主链上。
    - 相关项目：Matic

4. Optimistic Rollup
    - 优点：有验证、交易数据完整性、数据压缩性。返回给Layer1的有交易结果和交易的信息，这些数据被压缩后返回给Layer1。
    - 缺点：提款到链上需要等待一定的周期。
    - 相关项目
        1. Arbitrum
        2. Optimism
           1. 代币 OP
           2. 与以太坊虚拟机（EVM）等效的Optimism虚拟机（OVM）.
           3. 2021年12月，Optimism主网正式上线。
        3. Metis Andromeda
           1. 分叉自Optimism
        4. Metis Andromeda
           1. 分叉自Optimism
        5. Boba Network
           1. 分叉自Optimism，支持快速提款
           2. 2021年9月，Boba主网公开上线。
           3. Boba的特点是，借由一部分用户通过质押代币提供的流动性池，允许用户快速提款，而不必等待7天左右的反欺诈期结束。相应地，选择快速提款的用户需要向提供流动性的用户缴纳一定的费用

5. ZK Rollup
    - Zero—Knowledge Proof，零知识证明
    - ZK Rollup 是基于零知识证明的二层扩容方案(layer2)， ZK Rollup方案起源于18年下半年，由Barry Whitehat和Vitalik先后提出。Rollup顾名思义有“卷起”和“汇总”的意思，将大量的交易“卷起/汇总”打包成一个交易。原理为链下进行复杂的计算和证明的生成，链上进行证明的校验并存储部分数据保证数据可用性。
    - 优点：有验证、匿名性、数据压缩性。
    - 相关项目
        - zkSync
        - Loopring
        - StarkEx

- Rollups 就是一种可以允许在链外进行以太坊交易的方法，通过仅仅在链上存储交易数据，就可以减少目前存在的网络拥堵问题，提升速度，尽可能的降低Gas费用。


## ZK Rollup
- 主流的 ZK Rollup 如StarkWare等，主要包含两大核心角色
    1. Sequencer 排序器
        1. 负责执行 Layer2 网络内的交易，将这些交易事件排序，打包成Batch（交易批次）。
        2. 定期将 Batch 发布到Layer1上的指定智能合约（App State Smart Contract）.
        3. 耗时短，一台家用电脑，每秒可以生成4000笔交易。
    2. Prover（Aggregator） 证明者
        1. 监听读取 Batch ，为其生成一个 ZK Proof，发布到Layer1上的指定智能合约进行验证（Varifier Smart Contract）。
        2. 耗时长，一台家用电脑，生成一个 Proof 需要1.5～2s。

- 安全： 链下的每一次交易都需要提供零知识证明。
    1. Sequencer 每次将很多个交易打包成一个 Batch ，存储进 App State Smart Contract 。
    2. Prover 读取 Batch ，生成一个 ZK Proof ， 给予 Varifier Smart Contract 进行验证。
    3. 验证通过，链下的交易执行成功。

## 其它
1. Scroll提出了名为PipeZK的ZK加速解决方案，该方案可以在普通消费级硬件上将ZK Proof的生成过程提高接近200倍。如果未来再结合FPGA和ASIC等专用硬件，加速效果或将进一步提升。

2. Polygon的Hermez项目组提出了一个新的构想，Proof Of Efficiency（POE），主要思想为允许多个Prover无需许可的参与到ZK Proof生成过程，并让这些Prover节点展开竞争，最终的Proof奖励只会分配给第一个成功的节点。