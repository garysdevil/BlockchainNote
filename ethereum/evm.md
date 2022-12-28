# EVM
- 参考 https://ethereum.org/zh/developers/docs/

## 以太坊机制
- 以太坊所状态存储结构采用MPT树。

- 外部账户的创建过程
    - 生成一个随机的64个十六进制字符组成的私钥
    - 使用私钥生成公钥
    - 帐户地址= 0x + 公钥的最后20字节

- 合约账户=42个字符组成的十六进制地址


## 交易
- 视频演示 https://youtu.be/er-0ihqFQB0

- 交易的数据格式
    ```json
    {
    "from": "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
    "to": "0xac03bb73b6a9e108530aff4df5077c2b3d481e5a",
    "gasLimit": "21000",
    "gasPrice": "200",
    "nonce": "0",
    "value": "10000000000",
    }
    ```
- 交易生命周期
    1. 一旦用户发送交易，加密算法生成交易哈希。
    2. 然后将该交易转播到网络，并且与大量其他交易一起包含在一个集合中。
    3. 矿工选择您的交易并将它包含在一个区块中，以便验证交易并认为它“成功”。矿工会总是优先处理 gasPrice 更高的交易。

## keccak哈希算法
- 在以太坊中，用keccak哈希算法来计算公钥的256位哈希，再截取这256位哈希的后160位哈希作为地址值。
- keccak和sha3的区别
    - sha3由keccak标准化而来，在很多场合下Keccak和SHA3是同义词，但在2015年8月SHA3最终完成标准化时，NIST调整了填充算法：SHA3-256(M) = KECCAK [512] (M || 01, 256)。所以标准的NIST-SHA3就和keccak计算的结果不一样。
    - 以太坊在开发的时候sha3还在标准化中，所以采用了keccak，所以Ethereum和Solidity智能合约代码中的SHA3是指Keccak256，而不是标准的NIST-SHA3，为了避免混淆，直接在合约代码中写成Keccak256是最清晰的。