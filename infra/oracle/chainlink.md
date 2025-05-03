---
created_date: 2022-02-21
---

[TOC]

# Chainlink
- 什么是预言机：在区块链领域，预言机被认为是可以为区块链智能合约提供外部数据源的系统。
    - Oraclize项目：中心化预言机。
    - Chainlink项目：去中心化预言机。

- 相关链接
    1. Github [https://github.com/smartcontractkit/](https://github.com/smartcontractkit/)
    2. 文档 [https://docs.chain.link/docs/running-a-chainlink-node/](https://docs.chain.link/docs/running-a-chainlink-node/)
    3. chainlink节点节点服务提供商 https://naas.link/

- chainlink 数据售卖模型
    - The Standard API Model
        - 链下数据提供商运行chainlink节点，对特定的数据进行实时提供，chainlink网络选取中位数传进链上，最后进行利润的分配。
    - The Origin Signed Data Model 
        - 链下数据提供商运行chainlink节点，部署预言机合约，直接将数据传递进预言机合约售卖给用户。

- 官方产品
    1. Market And Data Feeds https://data.chain.link/
    2. VRF 随机数 https://vrf.chain.link/
    3. Keeper 自动化执行合约函数 https://keepers.chain.link
    4. Any API 数据源提供商 https://market.link/overview?searchView=true&searchSection=DATA_PROVIDERS

- 参与提供数据上链赚钱LINK代币的三种方式
    1. 搭建chainlink节点，部署预言机合约，进行数据售卖。（自行寻找客户）
       - 申请成为新的官方新的数据源提供商 https://chain.link/contact
    2. 成为官方Chainlink Price Feeds节点提供商。
        - 参加oracle-olympics竞赛 https://chain.link/oracle-olympics
        - 满足百分之99.9的服务器在线率等要求。

- 总结： Chainlink项目官方节点并不需要大量的服务器进行运行作为节点，而是需要高可用24小时正常运行的服务器，能保证任何时候都可以进行响应。

## 部署Chainlink节点
- 部署步骤
    1. 部署以太坊节点 或者 获取一个可以被访问的以太坊ws连接地址。
    2. 部署postgresql数据库 或者 获取一个可以被被访问的postgres数据库地址账户密码。
    3. 部署chanlink节点。
- 部署方式
    - docker

- 使用的以太坊网络
    - Rinkeby Test Network
    - Goerli Test Network(未实现完整的步骤)
### 一 部署postgres
```bash
docker run --name chainlink_postgres -p 127.0.0.1:5432:5432 -e POSTGRES_PASSWORD=password -d postgres
# 创建数据库和用户
# psql -h 127.0.0.1 -p 5432 -d postgres -U root
# CREATE USER chainlink WITH PASSWORD 'chainlinkpassword';
# CREATE DATABASE chainlink OWNER chainlink;
# GRANT ALL PRIVILEGES ON DATABASE chainlink TO chainlink;
```

### 二 部署以太坊节点
- 笔者是通过在第三方平台 https://infura.io/ 注册账户，获取访问以太坊节点ws接口权限，如下所示。
    - wss://goerli.infura.io/ws/v3/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

### 三 部署chainlink节点
0. ``mkdir ~/.chainlink-goerli/``
1. 配置 vi ~/.chainlink-goerli/.env
    ```toml
    # 以太坊Goerli Test网络的配置
    ROOT=/chainlink
    LOG_LEVEL=debug
    ETH_URL=wss://goerli.infura.io/ws/v3/b9336578f6be46ccae537a90310bf96c
    ETH_CHAIN_ID=5
    MIN_OUTGOING_CONFIRMATIONS=2 # 节点发出交易所需要的最小确认块数，在达到最小确认块数之前，同一个run不会开始下一个任务。如果不设置，默认值为12。
    MIN_INCOMING_CONFIRMATIONS=1
    LINK_CONTRACT_ADDRESS=0x326C977E6efc84E512bB9C30f76E30c160eD06FB # LINK token的发行地址，这里是公链网络上的LINK智能合约发行地址，您可以根据自己的网络进行配置。如果不进行配置，默认是以太坊主网上的LINK智能合约代币发行地址。

    # CHAINLINK_DEV=true
    # CHAINLINK_TLS_PORT=0
    # SECURE_COOKIES=false

    #TLS_CERT_PATH=/chainlink/tls/server.crt
    #TLS_KEY_PATH=/chainlink/tls/server.key

    ALLOW_ORIGINS=*
    DATABASE_URL=postgresql://chainlink:chainlinkpassword@127.0.0.1:5432/chainlink?sslmode=disable
    # DATABASE_URL=postgresql://$USERNAME:$PASSWORD@$SERVER:$PORT/$DATABASE
    DATABASE_TIMEOUT=500 # 数据库连接超时等待时间。默认500ms
    ```

1. 启动
    ```bash
    screem -R chainlink_docker
    # docker run --name chainlink_node --network host -v ~/.chainlink-goerli:/chainlink -it --env-file=~/.chainlink-goerli/.env smartcontract/chainlink local n
    cd ~/.chainlink-goerli && docker run --name chainlink --network host -v ~/.chainlink-goerli:/chainlink -it --env-file=.env smartcontract/chainlink:1.10.0-root local n
    # 输入password密码
    # 输入API密码
    # Ctr+a 按下后再按下d 退出screen前台
    ```

2. chainlink节点web界面 http://IP:6688/jobs

3. 转一些以太坊代币进Chainlink节点的以太坊地址上，笔者转了0.5个。Chainlink节点获取外部数据后，调用预言机合约时需要支付一定的以太坊手续费。
    - 笔者部署的Chainlink节点的以太坊地址 0xF1f5b5c3F6eB977772f4ffdA0a392Ec61836503A

## Any API
### 一 部署预言机合约(Operator Contract)
1. 游览器打开链接，部署预言机合约
    - https://remix.ethereum.org/#url=https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.7/Operator.sol

2. 选择部署的合约 @chainlink/contracts/src/v0.6/Oracle.sol
    - 输入参数
        - _LINK: 此参数为以太坊网络上的ChainLink代币合约的地址 0x01BE23585060835E02B77ef475b0Cc51aA1e0709
    - 笔者部署成功得到预言机合约的地址 

3. 执行 setFulfillmentPermission 函数
    - 输入参数
        - _node: Chainlink节点web界面配置里的ACCOUNT_ADDRESS参数值
        - _allowed: true

- 或者直接使用官方的Ethereum Goerli网络上的预言机合约地址
    - https://docs.chain.link/any-api/testnet-oracles
    - 0xcc79157eb46f5624204f47ab42b3906caa40eab7

### 二 在chainlink节点web界面创建Job

- address为需要监听的预言机合约地址，0为监听链上所有的合约。触发器监听到此预言机合约的事件，来触发tasks的执行。
    - 更改address为预言机的合约地址。

```json
{
    "name": "Get > Bytes32",
    "initiators": [
        {
            "type": "runlog",
            "params": { "address": "0xd58531FE83c33633CA7f1dc80506ECD62d93af00" }
         }
    ],
    "tasks": [
        { "type": "httpget" }, 
        { "type": "jsonparse" }, 
        { "type": "ethbytes32" }, 
        { "type": "ethtx" }
    ]
}
```

```json 模版
{
  "initiators": [
    {
      "type": "runlog",
      "params": {
        "address": "预言机合约"
      }
    }
  ],
  "tasks": [
    {
      "type": "httpget",
      "confirmations": null,
      "params": {
      }
    },
    {
      "type": "jsonparse",
      "confirmations": null,
      "params": {
      }
    },
    {
      "type": "multiply",
      "confirmations": null,
      "params": {
      }
    },
    {
      "type": "ethuint256",
      "confirmations": null,
      "params": {
      }
    },
    {
      "type": "ethtx",
      "confirmations": null,
      "params": {
      }
    }
  ],
  "startAt": null,
  "endAt": null
}
```

### 三 部署业务合约(Consumer Contract)
1. 游览器打开链接，部署业务合约 
    - https://remix.ethereum.org/#url=https://docs.chain.link/samples/APIRequests/ATestnetConsumer.sol

2. 选择部署的合约 ATestnetConsumer.sol
    - 笔者部署成功后得到业务合约地址 0x3aEe4b05C117D48241AdbaEc05b1DA9fC49200B1

3. 转一些LINK代币到业务合约地址上，当执行的函数需要调用预言机合约时，业务合约需要支付一定的LINK代币给预言机合约。

4. 执行 currentPrice 函数

5. 执行 requestEthereumPrice 函数
    - 输入参数
        - _oracle： 预言机合约地址 0xd58531FE83c33633CA7f1dc80506ECD62d93af00  
        - _jobId： chainnode节点web界面创建的Job的Id 9758979aff2c4b7fad1450318f27bc1c

6. 执行成功
    - 在以太坊游览器上https://rinkeby.etherscan.io/address/0x3aEe4b05C117D48241AdbaEc05b1DA9fC49200B1，可以看到业务合约转了一些LINK代币给预言机合约。
    - 在chainlink节点的web界面上http://39.173.177.198:6688/runs 可以看到相关的执行情况。

7. 执行 currentPrice 函数，可以发现返回值发生了变化。

### 报错与解决
- 症状：Chainlinl节点web界面job运行状态的报错
    ```
    Pending Outgoing Confirmations
    ```
- 原因：没有给Chainlink的节点账户充ETH，它没有足够的ETH支付gas费用，预言机节点需要调用Oracle合约的函数，需要支付gas费。

### 总结
- 数据流
    1. 用户：调用自己编写的业务合约的某个函数获取指定的数据。输入 预言机合约地址 和 JobID 。
    2. 业务合约：调用Chainlink节点运营商部署的预言机合约。
    3. 预言机合约：事件被触发，输出日志。
    4. Chainlink节点：监听智能合约公链网络日志。监听到特定的日志后，根据 JobID 执行任务。
    5. Chainlink节点：Job被执行，Job根据编写好的规则去执行指定的Bridge。（Chainlink节点内置了一些Bridge）
    6. Chainlink节点：Bridge根据URL请求数据。
    7. Chainlink节点：Bridge获取数据后，Chainlink节点调用预言机合约，返回数据进链上。
    5. 预言机合约：调用用户的业务合约，将数据返回给业务合约。

## 去中心化
1. Chainlink 目前只是作为一个媒介，Chainlink本身是去中心化的，但并不保证数据提供者是去中心化的。

2. 将来如何保证数据的真实性
    - 每个Chainlink节点都需要进行代币的质押。
    - 代币持有者可以进行委托质押，用户质押的代币越多，代表这个Chainlink节点越有信誉。
    - 当从区块链外部世界获取数据的事件被触发时，Chainlink网络系统会让一批Chainlink节点都去请求外部世界指定的数据，通过数据间的对比等机制，来验证数据的真实性，Chainlink节点的可靠性。 
