
# Chainlink
- 什么是预言机：在区块链领域，预言机被认为是可以为区块链智能合约提供外部数据源的系统。
- Oraclize项目：中心化预言机。
- Chainlink项目：去中心化预言机。

- Github https://github.com/smartcontractkit/
- 文档 https://docs.chain.link/docs/running-a-chainlink-node/
<!-- - 第三方文档
    - 旧版本 https://chainlink-chinese.readme.io/docs/%E8%BF%90%E8%A1%8Cchainlink%E8%8A%82%E7%82%B9
    - https://developer.aliyun.com/article/770252
    - https://segmentfault.com/a/1190000022774144 -->

- 部署步骤
    - 部署以太坊节点 或者 获取一个可以被访问的ws连接地址
    - 部署postgresql数据库 或者 获取一个可以被被访问的postgres数据库地址账户密码
    - 部署chanlink节点

- 部署方式
    - docker

- 使用的以太坊网络
    - Rinkeby

## 一 部署postgres
```bash
docker run --name chainlink_postgres -p 127.0.0.1:5432:5432 -e POSTGRES_PASSWORD=password -d postgres
```

## 二 部署以太坊节点
- 笔者是通过在第三方平台 https://infura.io/ 注册账户，获取拥有一定额度以太坊节点访问频率的接口，如下所示。
    - wss://rinkeby.infura.io/ws/v3/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

## 三 部署chainlink节点
1. 配置 vi /tmp/.env
    ```conf
    # 以太坊Rinkeby网络的配置
    ROOT=/tank1/chainlink
    LOG_LEVEL=debug
    ETH_URL=wss://rinkeby.infura.io/ws/v3/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    ETH_CHAIN_ID=4
    MIN_OUTGOING_CONFIRMATIONS=2 # 节点发出交易所需要的最小确认块数，在达到最小确认块数之前，同一个run不会开始下一个任务。如果不设置，默认值为12。
    MIN_INCOMING_CONFIRMATIONS=0
    LINK_CONTRACT_ADDRESS=0x01BE23585060835E02B77ef475b0Cc51aA1e0709 # LINK token的发行地址，这里有测试网和主网的LINK发行地址，您可以根据自己的网络进行配置。如果不进行配置，默认是主网的LINK发行地址。
    GAS_UPDATER_ENABLED=true # 如果设置为true，节点会在提交事务失败时提高gas费用重新提交。默认为false。

    # CHAINLINK_DEV=true
    CHAINLINK_TLS_PORT=0
    SECURE_COOKIES=false

    #TLS_CERT_PATH=/chainlink/tls/server.crt
    #TLS_KEY_PATH=/chainlink/tls/server.key

    ALLOW_ORIGINS=*
    DATABASE_URL=postgresql://postgres:password@127.0.0.1:5432/postgres?sslmode=disable
    #DATABASE_URL=postgresql://postgres:password@postgres:5432/postgres?sslmode=disable
    DATABASE_TIMEOUT=500 # 数据库连接超时等待时间。默认500ms
    ```

2. 启动
    ```bash
    screen -S chainlink_docker
    docker run --name chainlink_node --network host -v ~/.chainlink-rinkeby:/chainlink -it --env-file=/tmp/.env smartcontract/chainlink local n
    # Ctr+a 按下后再按下d 退出screen前台
    ```

3. 转一些以太坊代币进Chainlink节点的以太坊地址上。Chainlink节点获取外部数据后，调用预言机合约时需要支付一定的以太坊手续费。
    - 笔者部署的Chainlink节点的以太坊地址 0x5Bd3C7bF84B38279Da7b819eBc9f52bdE98fa0A3

## 四 部署预言机合约
1. 游览器打开链接，部署预言机合约
    - https://remix.ethereum.org/#url=https://docs.chain.link/samples/NodeOperators/Oracle.sol

2. 选择部署的合约 @chainlink/contracts/src/v0.6/Oracle.sol
    - 输入参数
        - _LINK: 此参数为以太坊网络上的ChainLink代币合约的地址 0x01BE23585060835E02B77ef475b0Cc51aA1e0709
    - 笔者部署成功得到预言机合约的地址 0xd58531FE83c33633CA7f1dc80506ECD62d93af00

3. 执行 setFulfillmentPermission 函数
    - 输入参数
        - _node: Chainlink节点web界面配置里的ACCOUNT_ADDRESS参数值
        - _allowed: true

## 五 在chainlink节点web界面创建Job
- http://IP:6688/jobs

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

```json
{
  "initiators": [
    {
      "type": "runlog",
      "params": {
        "address": "0x0000000000000000000000000000000000000000"
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

## 六 部署业务合约
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

## 七 报错
- 症状：Chainlinl节点web界面job运行状态的报错
    ```
    Pending Outgoing Confirmations
    ```
- 原因：没有给Chainlink的节点账户充ETH，它没有足够的ETH支付gas费用，预言机节点需要调用Oracle合约的函数，需要支付gas费。

## 八 总结
- 数据流
    1. 用户调用自己编写的业务合约的某个函数，获取指定的网络数据。
    2. 业务合约调用Chainlink节点运营商部署的预言机合约，将必要参数传递过去。
    3. Chainlink节点通过监听以太坊网络的日志，监听到预言机合约被调用，开始获取外部世界指定的数据。
    4. Chainlink节点获取数据后，通过调用预言机合约，返回数据进链上。
    5. 预言机合约调用用户的业务合约，将数据返回给业务合约。
- 数据真实性保障
    - 主网上，每个Chainlink节点都需要进行代币的质押。当从区块链外部世界获取数据的事件被触发时，Chainlink网络系统会让一批Chainlink节点都去请求外部世界指定的数据，通过数据间的对比等机制，来验证数据的真实性，Chainlink节点的可靠性。