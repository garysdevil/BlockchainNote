## 协议
1. Ordinals -- 比特币NFT协议    https://domo-2.gitbook.io/brc-20-experiment/
2. Stack -- 比特币L2协议
3. 闪电网络 https://lightning.network/lightning-network-paper.pdf

## Ordinals
- 应用
    1. BRC 20 ![](./ordinals_brc20.md)
    2. BRC721 https://twitter.com/poyo_eth

## Atomical
- https://twitter.com/atomicalsxyz
- https://docs.atomicals.xyz/
- Atomicals Protocol 是另一个在 UTXO 上刻入数据实现 Token 的衍生协议。
- 不同于最初为 NFT 设计的 Ordinals，它从底层重新思考了如何在 BTC 上中心化的、不可篡改、公平地发行 token。
- Atomicals 以比特币的最小单位 sat 作为基本「原子」，每一个 sat 的 UTXO 用来代表这个 Token 本身，1 token = 1 sat。
- 当验证一个 Atomicals 交易时，只需要在 BTC 链上查询对应 sat 的 UTXO 即可。ARC20 Token 的原子性和 BTC 本身的原子性保持一致，ARC20 的转账的计算完全由 BTC 基础网络处理。
- 支持 Atomical 协议的钱包 https://atomicalswallet.com/  https://atomicals-1.gitbook.io/atomicals-wallet-1/   
- 市场 https://atomicalmarket.com
- 应用
    - ARC20
    - Realms


## Runes
- Casey 提出了一种专门用于发行 NFT 的铭文实现方式即 Rune。
    - Rune 的设计可能也受到了 ARC20 的影响，选择直接在 UTXO 的脚本中写入 Token 数据，这包含了 Token 的 ID、输出与数量。
    - Rune 的实现与 ARC20 非常相似，将 token 转账直接交给 BTC 主网处理。区别在于， Rune 在脚本数据中写入了 Token 数量，这让他比 ARC20 具备更高的精度。
    - #Trac 的创始人基于此构想编写了第一个可用协议，并发行了 $pipe


## Taproot Assets (Taro)
- 闪电网络一直在尝试扩展其用例，BRC20 的火热促使了 Lightning Labs 发布了 Taproot Assets，这着也是一个 BTC 上发行 Token 的协议。
- 与 Brc20 等都不相同，Taproot Assets 仅仅在 BTC 主网的 UTXO 输出脚本中写入了 Token 的信息，没有存储这个 Token 的转账、mint 等功能代码。
- Taproot Assets 仅将 BTC 主网看作 Token 的注册表，并不是完全依赖 BTC 主网运行，因此这些资产必须被存入闪电网络中才能进行交易。
- 因此  Taproot Assets 的 Token 必须依赖第三方的存储索引器，离开了存储索引器这些 Token 即将永远地丢失。
- 因此用户要么自己运行一个 BTC 的全节点和 Taproot Assets 客户端，要么完全依赖一个中心化的服务器交易 Taproot Assets Token，这可能是目前 BTC Token 协议中最中心化的方案。

- aproot Assets 的打新方式也：用户不能直接在 BTC 主网中发送交易自助地铸造 Token，而是有一个项目方地址一次性发行 ( 或者叫注册 ) 所有的 Token，然后再由项目方转入闪电网络进行分发。