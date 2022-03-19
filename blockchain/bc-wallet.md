## 钱包的生成过程
- 这套标准最初是由比特币的3个提案生成的
    1. BIP39 定义如何使用助记词生成seed
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