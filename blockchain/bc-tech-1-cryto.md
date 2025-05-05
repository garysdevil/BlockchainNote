---
title: 区块链的加密算法
created_date: 2022-08-03
---

[TOC]

## 有限域运算
### 域定义 Field
1. 在抽象代数中，域是一种可进行加、减、乘和除运算的代数结构。

2. 域（Field）的定义是有如下特性的集合
    1. 定义了加法和乘法
    2. 集合内的元素经过加法和乘法计算，结果仍然在集合内
    3. 计算符合交换率、结合率、分配率
    4. 加法和乘法有单位元素（所有的集合内的值都有对应的负数，所有集合内非零值都有倒数）

### 有限域 Galois Field
1. 具有有限个元素的域就是有限域 Galois Field。
    1. Galois Field这个名字纪念发明者Evariste Galois。

2. 有限域（Galois Field）的定义是有如下特性的集合
    1. **定义模p加法和模p乘法（加或乘的结果超过p时，模p取余数。p为素数）**
    2. 集合内的元素经过加法和乘法计算，结果仍然在集合内
    3. 计算符合交换率、结合率、分配率
    4. 加法和乘法有单位元素（所有的集合内的值都有对应的负数，所有集合内非零值都有倒数）

3. 一切有限域都有加法和乘法两种运算，并必须满足以下条件
    1. 封闭性：若任意两元素a·b∈GF(q)，则有``a+b∈GF(q) a·b∈GF(q)``
    2. 结合律：若任意a、b、c∈GF(q)，则有``(a+b)+c=a+(b+c)，(a·b)c=a(b·c)``
    3. 交换律，若任意a、b∈GF(q)，则有``a+b=b+a，a·b=b·a``
    4. 有乘法恒等元e和加法恒等元0，使任意元素a->∈GF(q)都有：``a+0=a， a·e=a``
    5. 任意元素a->∈GF(q)都有乘法逆元素 和加法负元素(-a)，使 ``a+(-a)=0``
    6. 乘对加分配律：任意a、b、c∈GF(q)有``a(b+c)=a·b+a·c``


## 椭圆曲线
- 参考 https://andrea.corbellini.name/2015/05/17/elliptic-curve-cryptography-a-gentle-introduction/

- 椭圆曲线是满足如下方程的点
    ```python
    # 该方程称为椭圆曲线的Weierstrass方程
    y**2 = x**3 + a*x + b
    4*a**3 + 27*b**2 != 0
    ```

- 特点
    - x轴上下的点，相互对称。
    - 加法同态。
    - 乘法同态。

- 加法群
    - 加法群的定义： 一根直线穿过椭圆曲线的3个点，P、Q、R，则 P+Q=-R。
    - 椭圆曲线上的加法群属于阿贝尔群。


- 椭圆曲线与密码学
    - 利用椭圆曲线来加密的就叫椭圆曲线密码学 Elliptic Curve Cryptography （ECC）
    - 比特币中使用的椭圆曲线算法是ECDSA，属于ECC范畴。

- 非对称加密
    - 私钥 K 随机生成
    - 公钥 P = K * G （G可以是一个常数）
        1. 如果知道G，也很难求出 K
        2. 通过K和G，很容易求出 P


## 高深数学
- 世界七大数学难题
    - NP完全问题、霍奇猜想、庞加莱猜想、黎曼假设、杨-米尔斯存在性和质量缺口、纳卫尔-斯托可方程、BSD猜想。

- 什么是多项式时间求解
    - 如果1个算法时间复杂度是 O(n) 或 O(n^2)等，n在底数位置那么称之为可以多项式时间内求解。
    - 如果1个算法时间复杂度是 O(n!) 或 O(2^n)等，n在指数位置那么称之为不能在多项式时间内求解。

- P问题和NP问题
    - P问题： 1个问题可以在多项式时间内求解。
    - NP问题： 1个问题可以在多项式时间内通过解进行验证。
    - 既然求解那么一定可以进行验证，P问题属于NP问题。

- NPC问题： 存在这样一个NP问题，所有的NP问题都可以约化成它。换句话说，只要解决了这个问题，那么所有的NP问题都解决了。
    - 电路是1个经常被采用来描述1个NPC问题的方案。而且逻辑电路本身就是1个NPC问题。
    - 画电路不是真正的用绘图方式表达，而是用电路语言进行编写。

- QSP/QAP 问题的思想来源： https://eprint.iacr.org/2012/215.pdf

- SP - Span Program ，采用多项式形式实现计算的验证。

- QSP - Quadratic Span Program，QSP 问题，实现基于布尔电路的 NP 问题的证明和验证。

- QAP - Quadratic Arithmetic Program，QAP 问题，实现基于算术电路的 NP 问题的证明和验证，相对于 QSP，QAP 有更好的普适性。
    - QAP是一种非常适合于计算机进行表达和运算的形式。一个QAP问题包含一系列的算数表达式，这些算数表达式都是具有最多两个输入和一个输出的形式。例如 y=x+z 。
    - QAP问题可以让验证者在多项式时间内验证一个解是否正确，但在一个有限的时间内，使用有限的资源是很难在多项式时间内推出一个正确的解的。

- PCP - Probabilistically Checkable Proof ，在 QSP 和 QAP 理论之前，学术界主要通过 PCP 理论实现计算验证。PCP 是一种基于交互的，随机抽查的计算验证系统。

- NIZK - Non-Interactive Zero-Knowledge，统称，无交互零知识验证系统。NIZK 需要满足三个条件：1/ 完备性(Completeness)，对于正确的解，肯定存在相应证明。 2/可靠性 (Soundness) ，对于错误的解，能通过验证的概率极低。3/ 零知识。

- SNARG - Succinct Non-interactive ARGuments，简洁的无须交互的证明过程。

- SNARK - Succinct Non-interactive ARgumentss of Knowledge，相比 SNARG，SNARK 多了 Knowledge，也就是说，SNARK 不光能证明计算过程，还能确认证明者“拥有”计算需要的 Knowledge（只要证明者能给出证明就证明证明者拥有相应的解）。

- zkSNARK - zero-knowledge SNARK，在 SNARK 的基础上，证明和验证双方除了能验证计算外，验证者对其他信息一无所知。

- Statement - 对于 QSP/QAP，和电路结构本身（计算函数）相关的参数。比如说，某个计算电路的输入/输出以及电路内部门信息。Statement 对证明者和验证者都是公开的。

- Witness - Witness 只有证明者知道。可以理解成，某个计算电路的正确的解（输入）。

- 同态与加密
    - 同态
        - 抽象代数中，同态是两个代数结构（例如群、环、或者向量空间）之间的保持结构不变的映射。
        - 乘法同态或加法同态可以理解为不同方式的映射。
    - 半同态加密
        - 如果一个密码学算法只满足乘法同态或加法同态，我们就称其为半同态加密。
        - 英文称为SHE（Somewhat Homomorphic Encryption）或PHE（Partially Homomorphic Encryption）。
        - 常见的乘法同态算法有RSA，ElGamal等，常见的加法同态算法有Pallier、Schorr协议等
    - 全同态加密
        - 如果一个密码学算法同时满足乘法同态和加法同态，我们就称其为全同态加密。
        - 英文称为FHE（Fully Homomorphic Encryption, FHE）。

## 密码学
### 术语
1. 密码学中加法或乘法运算的含义不局限于我们熟悉的实数域上加法或乘法运算的含义。

### 密码学的发展
1. 古典密码学
    1. 维吉尼亚密码
2. 近代密码学
    1. DES加密，只能通过穷举法进行破解。
    2. 香农在 20 世纪 40 年代末发表的一系列论文，特别是 1949 年的「Communication Theory of Secrecy Systems （保密系统通信理论）」，把已有数千年历史的密码学推向了基于信息论的科学轨道，密码学终于从艺术转向科学。
3. 现在密码学
    1. 1976年。
    2. 1977年RSA，公钥加密。麻省理工学院的 Ron Rivest、Adi Shamir、Leonard Adleman 提出的非对称加密算法 RSA，有效的解决了密钥传送的问题，标志着密码学进入了百家争鸣的现代阶段。
    3. 1978年HE，同态加密。人物：Rivest、Adleman、Dertouzos。
    4. 1982年MPC，安全多方计算。人物：Yao。
    5. 1989年ZKP，零知识证明。人物：Goldwasser、Micali、Rackoff。


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


## 数据结构-树
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
- 默克尔树（Merkle tree，MT）是一种哈希二叉树，是存储数据的一种数据结构，1979年由Ralph Merkle发明。
- 链下默克尔树的生成       https://github.com/miguelmota/merkletreejs
- 链上默克尔树的验证/合约   https://github.com/miguelmota/merkletreejs-solidity
- 链上默克尔树的验证/库     https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/cryptography/MerkleProof.sol
- 默克尔树在线工具          https://lab.miguelmota.com/merkletreejs/example/

- keccak256
    - https://www.npmjs.com/package/keccak256
