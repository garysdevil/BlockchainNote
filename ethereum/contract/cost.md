
[TOC]

## Gas
### 矿工费

- 矿工费 =  交易消耗的Gas数量 * Gas的价格

- Gas
    - 是以太坊上的一种操作复杂度成本衡量单位。
    - 以太坊为所有的操作都规定了Gas的消耗数量；即每一笔交易，消耗的Gas数量都是固定的。
    - 进行一次转账需要花费8000个Gas。
    - Gas等于诺干个以太坊代币，根据以太坊链上交易状况拥挤情况，动态变化。

- Gas limit
    - 用户设置Gas Limit
        - 用户愿意为执行某个操作或确认交易支付的最大Gas数量。交易过程中，如果实际消耗的Gas used > Gas Limit，这个交易就无法执行完成，就回滚到执行之前的状态，这个时候矿工会收取Gas Price*Gas Limit的费用。（Gas最小为21000，最大为8000000）
    - 矿工设置的Gas Limit
        - 区块中有一个Gas上限，收纳的交易会出现不同的用户指定的Gas Limit。那么矿工就会根据区块限制的Gas Limit来选择，“合理”选择打包交易。
    - 21000 是以太坊交易中使用的最小燃料数量。

- Gas Price
    - 用户愿意花费于每个 Gas 单位的价格
    - 用户进行一次交易，想大概支付的gas价格，以太坊默认的Gas Price是1Gwei。

### 以太坊代币单位
- 1ETH = 1000Finney
- 1Finney = 1000Szabo
- 1Szabo = 1000Gwei
- 1Gwei = 1000Mwei
- 1Mwei = 1000Kwei
- 1Kwei = 1000Wei
- 一个ETH 等于一千 Finney，一百万 Szabo，十亿Gwei，万亿Mwei，千万亿 Kwei，百万万亿 Wei
- 1 ETH = 1000000000000000000 Wei = 1000000000 Gwei
- 1 Gwei = 0.000000001 ETH
- 1 Gwei = 1000000000 wei (10亿个wei)

## Gas查询网站
### 查询Gas Price的网站 
1. https://etherscan.io/ 
   1. 时时gas价格
2. https://ethgas.watch/  推荐
   1. https://ethgas.watch/stats   https://www.useweb3.xyz/gas?source=ethgas.watch&referrer=ethgas.watch
   2. 时时gas价格 
   3. 历史趋势图 
   4. 邮件通知gas费用
3. https://ethereumprice.org/gas/
   1. 时时gas价格 
   2. 历史趋势图 
4. https://mycointool.com/en/GasNow 推荐
   1. 时时gas价格 
   2. 历史趋势图 
5. 历史趋势图
   1. https://ycharts.com/indicators/ethereum_average_gas_price
   2. https://blockchair.com/ethereum/charts/median-gas-price

### 查询Gas燃烧额度的网站
1. https://ethburned.info/
   1. 过去1小时燃烧额度
   2. 历史总额度

2. https://ultrasound.money/#burn
   1. 过去一定时间内的燃烧额度
   2. 过去一定时间内每分钟燃烧的额度

- POS
    1. 一年释放大约 58.4 万枚 ETH 作为质押奖励。
    2. 每天大约释放 1600 枚。


# 深入Gas

### Gas交易费用

| Transaction                                | Gwei    |
| :----------------------------------------- | :------ |
| ETH Transfer                               | 21,000  |
| ERC20 Approval                             | 45,000  |
| ERC20 Token Transfer                       | 65,000  |
| ERC721 NFT Transfer                        | 85,000  |
| Uniswap V2 Swap                            | 150,000 |
| Uniswap V3 Swap                            | 185,000 |
| OpenSea Sale                               | 205,000 |
| Uniswap V3 Liquidity                       | 215,000 |
| L2 Deposits (Arbitrum, zkSync, Polygon,..) | 250,000 |
| ENS Registration                           | 265,000 |


```python
# 计算某个时刻某种交易需要花费的以太坊代币或USDT
tx_gas_price = 16
tx_gas = 65000
fee_gwei = tx_gas * tx_gas_price
fee_eth = fee_gwei / 1000000000

eth_price = 1300
fee_usdt = fee_eth * 1300

print(fee_eth, "ETH")
print(fee_usdt, "USDT")
```

### Gas开销

- storage
    - 存储由一个个存储槽组成，一个存储槽=32字节=256位。
    - 创建一个插槽的gas成本为 20,000。
    - 修改一个插槽的gas成本为 5,000。
    - 清理一个插槽时(即将非零字节设置为零)，将退还一定量的 gas 。
    - 将数据保存在256位大小(32字节为一个字)的存储字段中。即使未完全占用每个插槽，也会产生成本。

- memory
    - memory是一个字节数组，其插槽大小为256位(32个字节)。数据仅在函数执行期间存储，执行完之后，将其删除。它们不会保存到区块链中。
    - 读或写一个字(256位)需要3 gas 。
    - 为了避免给矿工带来太多工作，在进行22次读写操作后，之后的读写成本开始上升。

1. 内部调用view/pure的fun()      消耗：几十gas 
2. 内部调用写状态变量的fun()       消耗：几百gas 
3. 外部调用view/pure的fun()      消耗：两三千gas 
4. 外部调用写状态变量的fun()       消耗：三四千gas 
5. 写一个uint状态变量             消耗：两万多gas （用uint8代替uint256反而消耗gas更多） 
6. 修改一个定长数组(状态变量)元素    消耗：两万多gas 
7. 插入一个map(状态变量)元素        消耗：两万多gas push一个uint[]变长数组(状态变量)元素   消耗：四万多gas


### Gas优化
- 参考 
  - https://www.bilibili.com/video/BV1Pi4y1U7Cu/?spm_id_from=pageDriver

1. 优先使用calldata
2. 加载状态变量到内存变量
3. 多个条件判断使用短路方式
4. 在循环中使用++i，而不是i+=1,i++
5. 数组长度缓存到内存
6. 缓存多次使用的数组元素到内存