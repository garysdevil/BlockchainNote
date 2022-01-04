## 部署Ethereum私有网

- 参考文档 
    - https://geth.ethereum.org/docs/interface/private-network
    
### 下载
```bash
# 1. 从官网https://geth.ethereum.org/downloads/下载geth，解压即可得到可执行指令
# 2. 
mv geth /usr/local/bin/
```

### 初始化创始区块
- 创始区块信息文件 genesis.json (官方模版)
```conf
{
  "config": {
    "chainId": 1337,
    "homesteadBlock": 0,
    "eip150Block": 0,
    "eip155Block": 0,
    "eip158Block": 0,
    "byzantiumBlock": 0,
    "constantinopleBlock": 0,
    "petersburgBlock": 0,
    "ethash": {},
    "coinbase":"0xfeda2DCb016567DEb02C3b59724cf09Dbc41A64D"
  },
  "difficulty": "1",
  "gasLimit": "8000000",
  "alloc": {
    "0xfeda2DCb016567DEb02C3b59724cf09Dbc41A64D": { "balance": "80000000000000000000000" }
  }
}
```

- 参数
    - NetworkId 是用来标识区块链网络的。主要在节点之间握手并相互检验的时候使用。
    - ChainId 
        - 链标识符，是在EIP155改进方案中实现，用于防止重放攻击。
        - 防止交易在不同的以太坊同构网络进行交易重放的。主要在交易签名和验证的时候使用。
        - 已经被占用的ChainId https://chainlist.org/
        - 默认为 1337
    - difficulty 挖矿难度  6291450 = 1分钟2个左右
    - alloc 创始区块分配给特定地址的余额

- 初始化
```bash
# 创建创始区块
geth --datadir ./ethereumData init genesis.json

```

### 启动
```bash
# 启动以太坊私有网络
./geth --dev --gcmode archive --datadir=./ethereumData/ --networkid 1337 --nodiscover --http --http.addr 127.0.0.1 --http.port  8545 --ws --ws.addr 127.0.0.1 --ws.port 8544 --port 30303 --allow-insecure-unlock --http.corsdomain "*" --http.api "admin debug web3 eth txpool personal clique miner net" --rpc.txfeecap 0 --rpc.gascap 0 console
# --dev # 开发者模式。
# --dev.period 0 # 0 或者 1 # 开发者模式下，0: 默认为被动挖矿模式，即当进行交易时，系统才会挖矿打包。 1: 开发者模式主动挖矿。
# --verbosity 3

# --identity ${name} 给节点自定义名字
# --gcmode archive # 区块的垃圾回收模式 full 和 archive ，默认是 full # archive模式将保留智能合约中的所有值状态以及帐户余额的完整历史记录
# --syncmode full # 同步模式 "light", "fast", "full"

# --http
# --http.api # available="[admin debug web3 eth txpool personal clique miner net]" # 允许通过http方式访问相关的模块
# --http.corsdomain "*"  # 跨域访问

# --ws 
# --ws.addr 127.0.0.1 --ws.port 8544
# --ws.api eth,net,web3
# --ws.origins '*'

# console 进入控制台

# 进入以太坊控制台
geth --datadir=./ethereumData/ attach
geth attach ./ethereumData/geth.ipc
geth attach http://127.0.0.1:8545
geth attach ws://127.0.0.1:8544
```

## Ethereum控制台指令

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
