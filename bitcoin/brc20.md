## 链接
- 项目汇总、市场观测 https://brc-20.io/
- BRC20钱包 https://unisat.io/download
- Ordinals 原生钱包 https://ordinalswallet.com/wallet
- 交易市场 https://unisat.io/market
- 交易市场 https://ordswap.io/
- 游览器 https://ordiscan.com/
- 参考
    - BRC20交易市场注意细节 https://baijiahao.baidu.com/s?id=1764142446910727433&wfr=spider&for=pc&searchword=%E5%A6%82%E4%BD%95%E8%B4%AD%E4%B9%B0brc20
    - Ordinals协议 https://www.defidaonews.com/media/6810516
    - BRC20和unisat讲解 https://twitter.com/CG_BRC20/status/1653803094545932288
    - 讲解 https://twitter.com/BiteyeCN/status/1651821269019668480

## Ordinals协议
- 比特币上面的Ordinals是一种可以在比特币的最小单位（即sats或satoshis）上刻入数据的协议。
- Ordinals 让用户能够将图像、文本、视频和音频等数据写入sats(聪)，利用了比特币网络上隔离见证（SegWit）和 Taproot3 的技术特性，实现了在比特币链上直接铸造、转移和销毁 NFT 。
- Ordinals 协议将每一个比特币中最小单位（聪）编号，并将其与一个元数据链接起来，形成一个独特且可追溯的 NFT ，从而达到NFT的效果。
- 该协议推出于2022年12月，并在2023年2月逐渐被大家所了解。

## brc20
- 比特币上的 BRC-20 代币标准由推特用户@domodata 于2023年3月8日创建，这是一个实验性的可互换代币标准。它利用 Ordinal JSON 数据铸造和转移代币。
- BRC-20 创建者强调这只是一个实验，代币本身并无价值。首个 BRC-20 代币合约部署的是“ordi”代币，每次铸币限制为1000个，总量为2100万个。铸造 BRC-20 代币时要注意选择铸币服务，正确使用转账功能，确保在铸币前仍有剩余代币。


- Ordinal理论关注聪（satoshis），赋予它们独特的身份，使它们可以被跟踪、转移和赋予意义。
- 铭文现在的存储范围是546—20000聪。


## 结构
```json
{
    "p": "brc-20",
    "op": "deploy",
    "tick": "ordi",
    "max": "21000000",
    "lim": "1000"
}
```
```json
{
    "p": "brc-20",
    "op": "mint",
    "tick": "ordi",
    "amt": "1000"
}
```
```json
{
    "p": "brc-20",
    "op": "transfer",
    "tick": "ordi",
    "amt": "100",
    "to": "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
}
```


- 系统运作方式
    - brc20依赖一个前端页面用来检索和查看账户余额，重点是账户余额实时记录，需要一直检索区块，并且标记所有的铸造领取转账行为。
    - 部署： 信息里包含铭文的代号、供应量、领取限制。
    - 领取： 直接从总账户划转余额到领取账户。
    - 转移： 分两个步骤，第一步铸造一个转移函数铭文到发送地址，第二步将该铭文发送到接受账户，然后前端系统进行记录余额。