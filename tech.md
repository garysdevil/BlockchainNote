## 
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