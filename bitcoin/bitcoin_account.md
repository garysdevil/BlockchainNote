---
title: 比特币账户
created_date: 2023-05-15
---

[TOC]

## 四种账户地址类型
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

## 账户的相关提案
- 账户生成标准是由比特币的3个提案组成

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

## 账户的生成过程
- 熵是随机生成的一段二进制数据，通常是 128 到 256 位。常见的熵长度：
    1. 128 位熵 → 12 个助记词
    2. 160 位熵 → 15 个助记词
    3. 192 位熵 → 18 个助记词
    4. 224 位熵 → 21 个助记词
    5. 256 位熵 → 24 个助记词

1. 生成熵：128位熵（16 字节）
    1. 例如 f5 2c 3d 6b 9e 1a 84 cf b2 99 13 54 76 3f 5a 88
2. 计算校验和：对熵进行 SHA-256 哈希，取前 N 位（N = 熵长度 / 32）。
    1. 例如 SHA-256(f52c3d6b9e1a84cfb2991354763f5a88)，取前N位，则为 1001
3. 拼接：将校验和加到熵末尾，加起来共 132 位。
4. 生成助记词：将结果分成每11位一组，总共12组，每组映射到 BIP-39 词表中的一个单词（2048 个单词）。
    1. 例如 vote nephew ring nut ocean voyage obscure mystery resist ripple trouble olive
5. 种子：助记词通过 PBKDF2-HMAC-SHA512（2048 次迭代）转换为 512 位种子：
    1. 例如 seed = PBKDF2("vote nephew ring nut ocean voyage obscure mystery resist ripple trouble olive", "mnemonic", 2048, sha512)
6. 生成主密钥（BIP-32）
    1. 例如 HMAC-SHA512("Bitcoin seed", seed)，计算出 
        1. 主私钥（m）：6a3c1e9d8b7f6e5a4d3c2b1a09182736...
        2. 主链码：f5e2d3c4b7a6d9e8c3b2a1f001234567...
7. 私钥：使用主密钥并且根据BIP-44多币种派生路径标准进行计算，计算出派生私钥
    1. 例如 EVM使用的派生路径是 ECDSA secp256k1 m/44'/60'/0'/0/x
    2. 例如 SUI支持三种派生路径 Ed25519（默认方案） m/44'/784'/0'/0'/x' 、 ECDSA secp256k1 m/44'/60'/0'/0/x 、 ECDSA secp256r1 m/74'/784'/0'/0/x'
8.  公钥：通过 公钥=私钥×G
    1. 例如 EVM使用的G是secp256k1椭圆曲线生成点（即签名方案），计算出公钥
    2. 例如 Sui支持多种签名方案和路径，默认路径是 Ed25519
9.  地址：地址生成基于签名方案和公钥
    1.  例如 EVM地址是公钥，进行Keccak-256哈希算法，取结果最后20个字节作为地址，如 0x7d5F987A3C2e5689b4C7A99D91f2A7B8d9E7fBd3
    2.  例如 Sui地址是将签名方案标识（1 字节）与公钥拼接，进行BLAKE2b哈希算法，取结果（32个字节）作为地址。








