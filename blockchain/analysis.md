- 链上数据分析
- 参考 https://mp.weixin.qq.com/s/UzeL6y8iKN4am6xgPlj3wA

## 数据类型

- 跳过~

## 指标

1. TVL： 表示在一个协议或整个区块链生态系统中被锁定的加密资产的总价值，包括流动性、抵押贷款和收益聚合中的总资产价值。
2. 活跃地址数： 在一定时间段内至少执行过一次交易的钱包地址数量。
3. 交易数： 是在一定时间段内链上发生的所有交易的数量。
4. 交易量： 是在一定时间段内链上这些交易涉及资产价值的总额。
5. 交易费用

## 链上数据分析流程及工具

1. 数据ETL
   1. 数据抽取 Extract
   2. 清洗转换 Transform
   3. 加载到数据仓库 Load
   4. 依据不同业务线及观测指标分析数据
   5. 输出量化结果
2. 数据源
   1. 数据源提供对原始区块链数据的索引，它们通过节点和API访问不同的区块链网络，提取链上的交易、事件日志、合约信息等原始数据。
   2. 相关产品： The Graph、Alchemy、区块链浏览器API
3. 数据开发工具
   1. 面向开发者，将原始数据进行解析存储，使其可以使用SQL或GraphQL等语言进行查询，自由定制程度高，不提供分析结果。
   2. 相关产品： Dune、Footprint、GeniiData、Flipside
4. 数据应用
   1. 面向普通用户，一般会以数据可视化看板等提供预先分析好的结果。
   2. 相关应用： Nansen、Debank、Defilamma、区块链浏览器

- 目前主流的链上数据分析工具多处于从Web2向Web3过渡的阶段，未来面向DeFi的数据分析服务一定是根植于Web3原生数据特性的。特别是基于智能合约代码逻辑的数据洞察能力，将会成为链上数据分析平台最重要的护城河。
