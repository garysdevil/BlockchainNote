## 比特币地址类型 四种
- 参考 https://richpool.pro/blog/21/

1. Legacy 旧地址（P2PKH） 
    1. 旧地址是以数字 1 开头的地址。例如 15e15hWo6CShMgbAfo8c2Ykj4C6BLq6Not
    1. 旧地址只是公钥和私钥的散列。早在 2009 年比特币推出时，这是创建地址的唯一方法。今天，这在交易中使用最多的空间，因此交易时gas费很贵。

1. 支付脚本哈希（P2SH）
    1. Pay-to-Script-Hash 是一个以数字 3 开头的地址。例如 35PBEaofpUeH8VnnNSorM1QZsadrZoQp4N
    2. 与传统地址相比，支付脚本哈希地址不是公钥的哈希，而是涉及对发送者隐藏的某些支出条件的脚本的哈希。这些花费条件可以很简单（公钥 A 的拥有者可以花费这个比特币），也可以很复杂（如果公钥 B 的拥有者泄露了一个预定的秘密，他可以在 X 次之后花费这个比特币）。使用此脚本，P2SH 地址甚至可以利用 SegWit 并节省交易费用。
    3. 发送到 P2SH 地址比使用旧地址的钱包便宜约 26% 的gas。

2. 本地隔离见证 (P2WPKH)
    1. Native SegWit 是一个以 bc1q 开头的地址。例如 bc1q42lja79elem0anu8q8s3h2n687re9jax556pcc
    2. 这类地址不在交易中存储签名和脚本，而是在见证中，进一步减少了交易中存储的信息量。
    3. 使用这种类型，您可以比 P2SH 地址额外节省 16% 的gas，比传统地址节省 38% 以上。由于这些节省，这是当今最常用的地址标准。
    4. 因为有些交易所和钱包还不支持 Bech32 地址，所以会提示用户向他们发送 P2SH 地址。这就是为什么大多数钱包仍然包含创建 P2SH 甚至旧地址钱包的选项。

3. Taproot（P2TR） 
    1. 地址以 bc1p 开头。例如 bc1pmzfrwwndsqmk5yh69yjr5lfgfg4ev8c0tsc06e
    2. 未使用的主根地址。2023年11月，比特币网络将进行主根软分叉。这将为比特币地址启用许多新的智能合约功能，并提高花费此类交易的隐私性。
    3. 常规的主根交易比原生 segwit 略大，但比传统地址小。这是因为它们与公钥而不是公钥散列相关联。对于涉及多重签名脚本等复杂交易，主根地址节省了大量空间，成本更低。

## 钱包的生成过程
- 这套标准最初是由比特币的3个提案生成的
    1. BIP-39 定义如何使用助记词生成seed
        - https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki
        - 
    2. BIP-32 定义 HD Wallet（Hierarchical Deterministic Wallet）的规则
        - https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki
        - 如何从一个seed生成多层的私钥
        - 没有私钥的情况下，私钥之间互相不能推导
        
    3. BIP-44 
        - https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki
        1. 定义HD Wallet中生成子私钥的规范
        2. 不同链的生成子私钥规范约定 https://github.com/satoshilabs/slips/blob/master/slip-0044.md

- 生成过程
    1. 随机生成助记词
    2. 通过助记词生成512位的种子
    3. 通过种子生成主私钥、主公钥、子链码
    4. 生成公钥私钥