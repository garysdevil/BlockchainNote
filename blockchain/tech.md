## 密码学
1. 哈希函数（Hash Function）
    - 定义：输入内容，输出内容，没法通过输出内容推断出出入内容
    - 特性：确定性、统一性、不可逆性
    - 比特币里使用到的哈希函数， SHA256(内容)

2. 数字签名
    - 签名 Sign(内容 + Private_Key) = Signature
    - 验证 Verify(内容 + Signature + Public_Key)


## 区块链
## 区块链项目常用的层级结构
1. 数据层
    - 区块结构、时间搓、Merkle树、数字签名、哈希函数

2. 网络层
    - P2P网络、传输机制、验证机制

3. 共识层
    - PoW、PoS、DPoS、PBFT、dBFT

4. 激励层
    - 代币分配机制

5. 合约层

6. 应用层

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

### UTXO模型与比特币系统
- UTXO 
    - 全称为 unspent transaction outputs（未使用的交易输出）。

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
- 定义：零知识证明是指，证明者能够在不向验证者提供任何有用的信息的情况下，使验证者相信某个论断是正确的。

- 零知识证明算法
    - zkSNARK
    - zkSTARKs
    - zkBoo
    - Sonic
    - BulletProofs


- zk-SNARK
    - Zero-Knowledge Succinct Non-Interactive Argument of Knowledge
    - 零知识简洁的非交互知识论证