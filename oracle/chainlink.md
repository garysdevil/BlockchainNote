
# Chainlink
- 什么是预言机：将下
- 去中心化预言机
- Github https://github.com/smartcontractkit/
- 文档 https://docs.chain.link/docs/running-a-chainlink-node/

- 部署步骤
    - 部署以太坊节点 或者 获取一个可以被访问的ws连接地址
    - 部署postgresql数据库 或者 获取一个可以被被访问的postgres数据库地址账户密码
    - 部署chanlink节点

- 部署方式
    - docker
- 使用的以太坊网络
    - Rinkeby

## 部署postgres
```bash
docker run --name chainlink_postgres -p 127.0.0.1:5432:5432 -e POSTGRES_PASSWORD=password -d postgres
```

## 部署以太坊节点
- 笔者是通过在第三方平台 https://infura.io/ 注册账户，获取拥有一定以太坊节点访问额度的接口，如下所示。
    - wss://rinkeby.infura.io/ws/v3/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

## 部署chainlink节点
vi .env
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

CHAINLINK_DEV=true
CHAINLINK_TLS_PORT=0
SECURE_COOKIES=false

#TLS_CERT_PATH=/chainlink/tls/server.crt
#TLS_KEY_PATH=/chainlink/tls/server.key

ALLOW_ORIGINS=*
DATABASE_URL=postgresql://postgres:password@127.0.0.1:5432/postgres?sslmode=disable
#DATABASE_URL=postgresql://postgres:password@postgres:5432/postgres?sslmode=disable
DATABASE_TIMEOUT=500 # 数据库连接超时等待时间。默认500ms
```
```bash

docker run --name chainlink_node --network host -v ~/.chainlink-rinkeby:/chainlink -it --env-file=.env smartcontract/chainlink local n
```

## 使用案例

### 在chainlink节点的web界面创建任务
    - http://IP:6688/jobs
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

### 
- 游览器打开链接，部署预言机合约
    - https://remix.ethereum.org/#url=https://docs.chain.link/samples/NodeOperators/Oracle.sol

- 选择部署的合约 @chainlink/contracts/src/v0.6/Oracle.sol
- 填入部署合约时的参数_LINK，此参数为以太坊网络上的ChainLink代币合约的地址 0x01BE23585060835E02B77ef475b0Cc51aA1e0709

- 执行 setFulfillmentPermission 函数
- 输入参数为chainlink节点ACCOUNT_ADDRESS 和 true

###

- 部署业务合约 https://remix.ethereum.org/#url=https://docs.chain.link/samples/APIRequests/ATestnetConsumer.sol

- 执行 requestEthereumPrice 函数
- 输入参数为 
    - 预言机合约 0xe984d276B35f4239F0FD5B9b65C7f2e90f5E682e  
    - chainnode节点创建的job的Id eb03af637d6742ad95a6d84b18db23ea

- 执行成功，则在chainlink节点的web界面上http://39.173.177.198:6688/runs 看到相关的执行情况

- 执行 currentPrice 函数