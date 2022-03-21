# the graph
- 链接
    - https://thegraph.com

- 将以太坊日志保存进数据库

## 介绍
- 网络
    - Subgraph Studio - 以太坊主网作为数据源
    - Hosted Service - 其它区块链网络作为数据源（例如Binance, Matic等等）

- 角色
    - 用户（Comsumer）。用户向索引器支付查询费用。他们通常是终端用户，但也可能是集成 The Graph 的网络服务或中间件。
    - 索引器（Indexer）。索引器是 The Graph 的运行节点。其动力是赚取财务奖励。
    - 策展人（Curator）。策展人使用 GRT 代币来指明哪些子图值得索引。他们通常是开发者，也可能是支持他们在使用服务的终端用户，或者纯粹出于经济动机的一种角色。
    - 委托人（Delegator）。委托人向某个 Indexer 质押 GRT 代币，赚取一部分通货膨胀奖励和费用，他们无需亲自运行一个 Graph 节点。这类角色主要出于经济动机。
    - 渔夫（Fisherman）。渔夫们时刻检查查询响应是否正确，以此保护网络。渔夫动机是利他的，因此 The Graph 将率先为网络提供渔夫服务。
    - 仲裁员（Arbitrator）。在争议解决期间，仲裁员决定是否对索引器进行罚没。他们可能出于经济或利他动机。

- 去中心化费用 https://thegraph.com/docs/studio/billing

### 构建Subgraph
- Subgraph的结构
    - Manifest (subgraph.yaml) - 定义Subgraph要进行索引的数据源
        - https://github.com/graphprotocol/graph-node/blob/master/docs/subgraph-manifest.md
    - Schema (schema.graphql) - 定义存储在Subgraph的数据 和 索引数据的格式
    - AssemblyScript Mappings (mapping.ts) - 定义代码流程，将数据源的数据转为Subgraph定义的数据格式

- 参考文档 https://thegraph.com/docs/developer/quick-start
    ```bash
    # 安装 The Graph CLI 
    npm install -g @graphprotocol/graph-cli

    # 初始化Subgraph
    SUBGRAPH_SLUG=定义Subgraph的名字
    graph init --studio ${SUBGRAPH_SLUG}
    # graph init --studio ${SUBGRAPH_SLUG} --product subgraph-studio --index-events --network mainnet --contract-name Loot --from-contract 0xff9c1b15b16263c61d017ee9f65c50e4ae0113d7
    # graph init --studio ${SUBGRAPH_SLUG} --product subgraph-studio --index-events --network rinkeby --contract-name Loot --from-contract 0x117814e91a04067f11b5c16c75e8e21845a506ea
    # --index-events 合约内所有的事件都生成对应的schema
    # 以太坊主网Loot合约部署于 13108877 块高，rinkeby网络 为9243123，为了节省时间设置从特定的块高开始同步 dataSources[0].source.startBlock = 13108877

    # build
    cd ${SUBGRAPH_SLUG}
    # 根据需求，在 schema.graphql 文件内添加schema
    graph codegen # 根据schema.graphql生成了ts文件，默认放进generated文件夹内
    # 根据需求，修改 src/mapping.ts 文件，如果在 src/mapping.ts 内添加了新的事件则需要修改 subgraph.yaml 文件
    graph build # 本地构建wasm文件核实是否有语法错误，结果默认创建并放进build文件夹内

    # 部署进官方的Subgraph Studio
    graph auth --studio $DEPLOY_KEY # 从官网https://thegraph.com/studio/获取DEPLOY_KEY
    graph deploy --studio $SUBGRAPH_SLUG

    # 假如需要部署进去中心化区块链网络里则需要在网页上支付对应的链上代币进行部署
    ```