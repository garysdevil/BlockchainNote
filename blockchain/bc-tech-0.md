## 密码学
### 哈希
- 哈希（Hash）
    - 定义：也称为散列、哈希。基本原理就是把任意长度的输入，通过Hash算法变成固定长度的输出。
    - 特性：确定性、统一性、不可逆性
    - 比特币里使用到的哈希函数， SHA256(内容)
- 常见的哈希算法
    1. MD5 被用于文件防篡改
    2. SHA256 被用于比特币挖矿
    3. Merkle root 被用于证明数据片段
    4. SimHash 被用于文本去重

### 数字签名
- 签名 
    - Sign(内容 + Private_Key) = Signature
- 验证 
    - Verify(内容 + Signature + Public_Key)

- 在区块链网络中，进行交易时，私钥持有人需要进行一次签名。

- 签名算法
    1. ECDSA：最基础，不支持签名聚合，多签的时候必须依次验证。（使用案例：早期的Bitcoin公链）
    2. Schnorr(Bitcoin Taproot)：支持聚合签名，但有一些不足，主要是signer要进行交互。（使用案例：Bitcoin公链）
    3. BLS：支持聚合签名，解决signer交互问题。（使用案例：ETH2、Filecoin）


## 区块链
- 区块链是分布式数据存储、点对点传输、共识机制、加密算法等计算机技术的新型应用模式。
### 区块链项目的层级结构
1. 数据层
    - 封装了底层数据区块以及相关的数据加密和时间戳等基础数据和基本算法.
    - 区块结构、时间搓、Merkle树、数字签名、哈希函数。

2. 网络层
    - P2P网络、数据传输机制、数据验证机制。

3. 共识层
    - 主要封装网络节点的各类共识算法.
    - PoW、PoS、DPoS、PBFT、dBFT

4. 激励层
    - 将经济因素集成到区块链技术体系中来，主要包括经济激励的发行机制和分配机制等。

5. 合约层
    - 主要封装各类脚本、算法和智能合约，是区块链可编程特性的基础.

6. 应用层
    - 封装了区块链的各种应用场景和案例。


### 分叉
- 分叉的原因：去中心化、区块间隔、数据一致性
    - 去中心化程度越高，网络环境越差，将导致block和tx的全网同步速度变慢和节点难以时刻保持同步。
    - 区块间隔越短，节点越容易在非最新的高度上出块。
- 分叉的结果
    - 孤块(orphant block)
- 分叉的缓解
    - Bitcoin网络里，平均每10分钟产生一个块，所以比较难产生孤块，以此来缓解分叉的产生。
    - Ethereum网络里，平均15秒产生一个块，通过特殊的机制去激励新产生的块去包含孤块，让新块和孤块都可以获得奖励，以此来缓解分叉的产生。

## 树
- Trie树，又经常叫前缀树，字典树
    - 性质
        - 根节点不包含字符，除根节点外每个节点都只包含一个字符
        - 从根节点到某一节点，路径上经过的字符连接起来，为该节点对应的字符串
        - 每个节点的所有子节点包含的字符都不相同

- Radix树，又经常叫基数树，压缩前缀树
    - 它对Trie树进行了空间优化，只有一个子节点的中间节点将被压缩（即这个节点将包含多个字符）。

- Patricia树，又经常叫Patricia trie，crit bit tree，压缩前缀树
    - 它对Radix树进行了空间优化，对于Radix树的每个节点，如果该节点是唯一的儿子的话，就和父节点合并。

- Merkle Tree
    - 存储hash值的一棵树。Merkle树的叶子节点存储数据块，非叶节点是其对应子节点串联字符串的哈希值。

- MPT（Merkle Patricia Tree），又经常叫梅克尔帕特里夏树
    
### 默克尔树
- 链下默克尔树的生成       https://github.com/miguelmota/merkletreejs
- 链上默克尔树的验证/合约   https://github.com/miguelmota/merkletreejs-solidity
- 链上默克尔树的验证/库     https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/cryptography/MerkleProof.sol
- 默克尔树在线工具          https://lab.miguelmota.com/merkletreejs/example/

- keccak256
    - https://www.npmjs.com/package/keccak256

## UTXO和Account模型
- UTXO 
    - 全称为 unspent transaction outputs（未使用的交易输出）。
- UTXO模型：只要全网保留了所有未被花费的交易，链就能运行。
- Account模型：只要全网保留了最新的状态，链就能运行。

### UTXO模型与比特币系统


- 在比特币系统，UTXO是指关联比特币地址的比特币金额的集合，是一个包含数据和可执行代码的数据结构。

- 一个UTXO的基本单位是“聪”，“聪”是比特币的最小计量单位，一个比特币等于10^8聪。

- coinbase交易（创币交易）
    - 比特币的挖矿节点获得新区块的挖矿奖励，比如 12.5 个比特币，这时，它的钱包地址得到的就是一个 UTXO，即这个新区块的币基交易（也称创币交易）的输出。币基交易是一个特殊的交易，它没有输入，只有输出。

- 比特币交易 UTXO
    - wallet_address_A 爆块奖励获取到了12.5枚比特币，则这12.5枚比特币都在一个UTXO里；
    - 现在 wallet_address_A 要把 10 枚比特币转给 wallet_address_B 
        - 转账流程是： wallet_address_A 中转 10 枚比特币给 wallet_address_B ，同时转 2.5 枚比特币给 wallet_address_A 。
        - UTXO机制里执行的流程是：wallet_address_A 原来的拥有12.5枚比特币金额集合的UTXO被销毁， wallet_address_B 获取一个新的拥有10枚比特币金额集合的UTXO， wallet_address_A 获取一个新的拥有2.5枚比特币金额集合的UTX。

- 防止双花
    - 生成新区块的时候，矿工会从以前的区块链中追溯，查看付款地址这次消费的比特币是不是以前没有被消费过。（即查看UTXO是否被销毁过）

- 缺点
    - 但需要计算某个地址中的余额时，需要遍历整个网络中的全部相关区块。

### 账户余额模型与以太坊
- 以太坊账户的数据结构
    - nonce （通过这个关键字防止双花）
    - ether_balance
    - contract_code
    - storage

- 以太坊交易的数据结构
    - nonce（通过这个关键字防止双花）
    - from
    - to
    - input
    - value

- Ethereum 就像一个状态机，它接受一个又一个的 Transaction 并不停改变自己的状态。

## ZK 零知识证明
- 参考
    - https://zhuanlan.zhihu.com/p/293203956

- 诞生：零知识证明，是由S.Goldwasser、S.Micali、C.Rackoff这三个人在20世纪80年代初提出的概念。
- 定义：零知识证明是指，证明者能够在不向验证者提供任何新信息的情况下，使验证者相信某个论断是正确的。

- 零知识证明算法
    - zkSNARKs   零知识简洁非交互式知识论证 | Zero-Knowledge Succinct Non-interactive Argument of Knowledge
    - zkSTARKs  零知识可扩展的透明知识论证 | Zero-Knowledge Scalable Transparent Argument of Knowledge
    - zkBoo
    - Sonic
    - BulletProofs

- 区块链里的ZKP算法 https://github.com/matter-labs/awesome-zero-knowledge-proofs
    1. 最初的Pinocchio（Zcash Sprout）
    2. 更快的Groth16（Zcash Saping、Filecoin）
    3. no trusted setup的ZK-STARKs（StarkWare）
    4. universal trusted setup的PLONK（zkSync），Marlin（Aleo）
    5. no trusted setup、recursive的Halo2（ZCash NU5）

- zkSNARKs
    - 特性
        - 简洁的。Prover提供很小的证明给Verifier，就可以进行证明。
        - 非交互式的。
        - 可编程的。

## 跨链
- 目前的跨链技术，主要有以下几种实现模式：
    1. 公证人机制（Notary Schemes）公证人机制是链与链交互操作最简单的方法，由某个或某组受信任的团体来声明A链对B链上发生了某件事情。比较有代表的项目是Ripple，这种方式更关注金融资产的转移。
    2. 侧链/中继（Sidechains/Relays）是指由侧链或中继链来进行交易，用多中心化的方式来解决信任问题。比较有代表性的项目是Cosmos和Polkadot，它们比较侧重于解决跨链基础设施方面，也是现阶段关注度很高的技术热点。
    3. 哈希锁定（Hash-Locking）是通过智能合约来保障任意两个人之间的转账都可以通过一条“支付”通道来实现，完成“中介”的角色，比较有代表的项目是闪电网络。
    4. 分布式私钥控制（Distributed Private Key Control）是一种相对较新的跨链方式，它引入锁定和解锁的概念，通过这样的一个锁定和解锁的操作，可以对原有链上的Token进行管理权的操作。比较有代表性的项目是FUSION，实现了多Token种类的智能合约。


## P2P
- P2P通信协议
    - DHT(Distributed Hash Table)
    - Gossip Protocol
### DHT
- 用于传统的P2P网络中。例如BT网络。
- 网络中，每个节点并不保存所有的数据。

### Gossip Protocol
- 用于区块链网络中
- 网络中
    - 每个节点保存全量的数据。
    - 每个节点从peer拉取数据达到和peer数据一致。
    - 每个节点收到或产生新数据的时候，会转发给peer，最终经过Multi-hop之后到达全网。

- 优点：
    - 抗单点故障。
    - 抗网络阻隔。

- 问题与解决方案
    1. Multi-hop产生的消息延迟
        - 方式一：增加节点保的Peer数量，减少消息的跳转次数，使消息在更少的跳转次数下进行传递。
        - 方式二：排除恶意的Peer节点，通过打分机制。
    2. 应对网络峰值，并发性引起的问题
        - 方式一：分批有序进行广播；例如先发送给打分机制里获取分数高的节点。
    3. 数据不一致的问题，产生孤块
        - 方式一：通过多轮询问，并以与其中大多数Peer保持一致。（例如Avalance公链网络）
    4. 消息隐私性
        - 方式一：改变消息的起点，消息通过几跳之后才开始广播。（例如Dandelion网络）
        - 方式二：改变消息的终点，消息进入加密池后才广播给其它节点。（例如Nym公链网络）
        - 方式三：改变消息通道。