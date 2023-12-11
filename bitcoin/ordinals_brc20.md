## brc20
- 2023年3月8日，推特用户 @domodata 提出利用 JSON 数据格式的 Ordinals 铭文，来部署代币合约、铸币以及转账，并命名这种格式为 BRC-20 。
- @domodata 强调 BRC-20 只是一个实验，代币本身并无价值。
- 首个 BRC-20 代币合约部署的是“ordi”代币，每次铸币限制为1000个，总量为2100万个，先到先得，每个人都可以免费铸造。


- Ordinal理论关注聪（satoshis），赋予它们独特的身份，使它们可以被跟踪、转移和赋予意义。


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


## 代打平台
- idclub.io
- unisat.io
- https://ordichef.xyz/inscribe
- https://runealpha.xyz/