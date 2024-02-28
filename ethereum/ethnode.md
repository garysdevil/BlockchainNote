## 链接
- 部署文档 
  - https://docs.blastapi.io/running-a-node/supported-chains/ethereum/sepolia-testnet
  - https://docs.prylabs.network/docs/execution-node/authentication
- 区块链浏览器 https://sepolia.etherscan.io/

## ETH节点客户端介绍
- 执行客户端
  | 客户端     | 语言    | 操作系统：            | 网络                                                         | 同步策略   | 状态缓冲        |
  | ---------- | ------- | --------------------- | ------------------------------------------------------------ | ---------- | --------------- |
  | Geth       | Go      | Linux, Windows, macOS | #M, Sepolia, Görli, Ropsten, Rinkeby                         | 快照、完全 | Archive, Pruned |
  | Nethermind | C#. NET | Linux, Windows, macOS | 主网、Sepolia、Gorli、Ropsten、Rinkeby 快照（不提供服务）、快速、完 等 | 全         | Archive, Pruned |
  | Besu       | Java    | Linux, Windows, macOS | #, Sepolia, Görli, Ropsten, Rinkeby 等                       | 快速、完全 | Archive, Pruned |
  | Erigon     | Go      | Linux, Windows, macOS | 主网、 Sepolia, Görli, Rinkeby, Ropsten 等                   | 完全       | Archive, Pruned |

- 共识客户端
  | 客户端     | 语言       | 操作系统：            | 网络                                                |
  | ---------- | ---------- | --------------------- | --------------------------------------------------- |
  | Lighthouse | Rust       | Linux, Windows, macOS | 信标链、Goerli、Pyrmont、Sepolia、Ropsten 等        |
  | Lodestar   | TypeScript | Linux, Windows, macOS | 信标链、Goerli、Sepolia、Ropsten 等                 |
  | Nimbus     | Nim        | Linux, Windows, macos | 信标链、Goerli、Sepolia、Ropsten 等                 |
  | Prysm      | Go         | Linux, Windows, macOS | 151TtE, Gnosis, Goerli, Pyrmont, Sepolia, Ropsten # |
  | Teku       | Java       | Linux, Windows, macOS | 信标链、 Gnosis, Goerli, Sepolia, Ropsten #         |

## 部署节点 sepolia网络
```bash
mkdir ethereum
cd ethereum
mkdir consensus
mkdir execution
openssl rand -hex 32 | tr -d "\n" > "jwt.hex"
```
```bash
curl https://raw.githubusercontent.com/prysmaticlabs/prysm/master/prysm.sh --output prysm.sh && chmod +x prysm.sh
```
```bash
metrics_addr=127.0.0.1
datadir=/data4/ethereum/data
jwtpath=/opt/ethereum/execution/jwt.hex
nohup /opt/ethereum/execution/geth --sepolia --syncmode full --metrics --metrics.addr=${metrics_addr} --http --http.api net,eth,personal,web3,engine,admin --authrpc.vhosts=localhost --authrpc.jwtsecret=/path/to/jwt.hex --http.addr 0.0.0.0 --http.port 8545 --http.vhosts * --http.corsdomain * --ws --ws.addr 0.0.0.0 --ws.port 8546 --ws.api net,eth,personal,web3 --ws.origins * --datadir ${datadir} --authrpc.jwtsecret=${jwtpath} >> /opt/ethereum/logs/geth.log 2>&1 &
tail -f /opt/ethereum/logs/geth.log

jwtpath=/opt/ethereum/execution/jwt.hex
nohup /opt/ethereum/consensus/beacon-chain --execution-endpoint=http://localhost:8551 --sepolia --jwt-secret=${jwtpath}  --checkpoint-sync-url=https://sepolia.beaconstate.info --genesis-beacon-api-url=https://sepolia.beaconstate.info >> /opt/ethereum/logs/beacon.log 2>&1 &
tail -f /opt/ethereum/logs/beacon.log
```

## 运维节点
### 端口
1. 默认端口
	1. p2p：30303
	2. rpc: 8545
	3. ws: 8546

### API
```bash
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "eth_syncing","params": []}' 127.0.0.1:8545 | jq

# 获取块高的API
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "eth_blockNumber","params": []}' 127.0.0.1:8545 | jq
printf %d `curl -sS  127.0.0.1:8545 -H "Content-Type:application/json" -X POST -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' |  grep -Po 'result[" :]+\K[^"]+'`

# 查看交易信息
curl -sS  127.0.0.1:8545 -H "Content-Type:application/json" -X POST  -d '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0xe82ada99b9c9ab2daffe208035d6f2fba78fea60df6ea9b41c2e99a3054bbe34"],"id":1}' 

# 查看账户余额
curl 127.0.0.1:8545 \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_getBalance","params": ["以太坊账户地址","latest"],"id":1}'

wscat --connect ws://localhost:8546
```

### geth控制台指令

- 基本指令
```js
web3 // 查看所有的控制台指令

eth    // 主要包含对区块链进行访问和交互相关的方法
net    // 主要包含查看p2p网络状态的方法
admin  // 主要包含与管理节点相关的方法
miner  // 主要包含挖矿相关的一些方法
personal  // 包含账户管理的方法
txpool    // 包含查看交易内存池的方法

// 账户相关的操作
personal.newAccount('密码') // 创建账户 # 输出账户的地址 0xd139feabc9d47f8c95f0c14b6f3d6dcefe549161
personal.listAccounts # 列出所有账户地址
personal.unlockAccount(eth.accounts[0],'密码',解锁多少秒)

// 矿工相关的操作
miner.setEtherbase(账户地址) // 设置矿工账户 // 非开发者模式挖矿时需要设置
miner.start() // 开启矿工模式
miner.stop()  // 关闭矿工模式，
miner.start(1);admin.sleepBlocks(1);miner.stop() // 开始挖矿,当挖到一个块时就停止
eth.mining // 查看节点是否在挖矿

// eth
eth.coinbase // 挖矿所得的代币会进入矿工账户，称呼为coinbase，默认情况下coinbase是本地账户中的第一个账户 
eth.blockNumber // 查看区块高度
eth.getBalance(eth.accounts[0]) // 查看账户的 eth
eth.estimateGas({data:binvar}) // 估算需要的 gas
eth.getTransactionReceipt(transactionHash) // 根据交易哈希查询交易信息
eth.defaultAccount = eth.accounts[0]; // 设置调用合约时的默认地址，否则链上交易不指定地址时会报错 Error: invalid address
eth.accounts[0] 
eth.sendTransaction({from:eth.accounts[0],to:eth.accounts[1],value:web3.toWei(1,"ether")}) // 转账

// txpool
txpool.status // 查看交易状态 
// pending状态为已经提交但未处理的交易
// queued状态为存放未来的、当前无法执行的交易

// web3
// wei是以太币的最小单位，一个以太币=10的18次方个wei
web3.toWei(${value}) // 将以太币换算为wei
web3.fromWei(${value}) // 将wei换算为以太币  

```

### 部署合约调用合约
```js
abivar=abi内容 // abi内容
binvar="0x"+"bin内容" // 字节码内容
myaddress=eth.accounts[0]
personal.unlockAccount(eth.accounts[1],'123456',10000000)

// 生成合约对象
contractObject=eth.contract(abivar) 
// 方式一，部署合约返回合约实例，记住生成的合约地址
contractInstance=contractObject.new({from:myaddress,data:binvar})
contractInstance // 输出合约信息
// 方式二，部署合约返回合约实例，记住生成的合约地址
// contractInstance = contractObject.new(参数,参数，{data: binvar,gas: 1000000, from: myaddress}, function(e, contract){
//   if(!e){
//     if(!contract.address){
//       console.log("Gary Contract transaction send: Transaction Hash: " + contract.transactionHash+" waiting to be mined...");
//     }else{
//       console.log("Gary Contract mined! Address: " + contract.address);
//     }
//   }else{
//     console.log(e)
//   }
// })


// 获取合约实例
contractAddress="合约地址"
contractInstance=eth.contract(abivar).at(contractAddress);  

// 调用合约，不写到链上的调用
contractInstance.合约函数名.call(参数);
// 调用合约，写到链上的调用
contractInstance.合约函数名.sendTransaction(参数列表, {from:调用合约账户的地址, value:附送的以太币, gas:10000000});
// 调用合约，如果合约函数名() 有constant标识，它并不会被编译器执行，web3.js会执行call()的本地操作。相反如果没有constant标识，会执行sendTransaction()操作
contractInstance.合约函数名()
```
