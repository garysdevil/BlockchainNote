## 部署Ethereum私有网

- NetworkId 是用来标识区块链网络的。主要在节点之间握手并相互检验的时候使用。

- ChainId 
    - 链标识符，是在EIP155改进方案中实现，用于防止重放攻击。
    - 防止交易在不同的以太坊同构网络进行交易重放的。主要在交易签名和验证的时候使用。
    - 已经被占用的ChainId https://chainlist.org/
    

### 方式一
- 创始区块信息文件 genesis.json
```conf
{
    "config":{
        "chainId":23 # chainId是自己设置的，不要和现有的公开运行的区块链相同。默认为 1337
    },
    "difficulty":"2000",
    "gasLimit":"2100000",
    "alloc":{ # 创始区块分配给特定地址的余额
        "0xfeda2DCb016567DEb02C3b59724cf09Dbc41A64D":{"balance":800000000000000000000} # 分配8个eth给这个地址
    }
}
```
- 初始化和启动
```bash
# 创建创始区块
geth --datadir . init genesis.json
# 启动
geth --datadir . --networkid 23
```

### 方式二
```bash
# 从官网https://geth.ethereum.org/downloads/下载geth，解压即可得到可执行指令
mv geth /usr/local/bin/

# 启动以太坊私有网络
geth --dev --datadir=~/ethereumData/ --networkid 65535 --nodiscover --http --http.addr 127.0.0.1 --http.port 8545 --ws --ws.addr 127.0.0.1 --ws.port 8544 --port 30303 --allow-insecure-unlock console
# --dev 开发者模式。 默认为被动挖矿模式，当进行交易时，系统才会挖矿打包。 开发者模式主动挖矿 --dev --dev.period 1
# --http.corsdomain "*"  # 跨域访问
# --http.api eth,web3,personal,net,db,miner # 允许通过http方式访问相关的模块
# --verbosity
# --ws --ws.addr 127.0.0.1 --ws.port 8544
# --identity 给私有链起个名
# console 进入控制台

# 进入以太坊控制台
geth --datadir=~/ethereumData/ attach
geth attach ~/ethereumData/geth.ipc
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
personal.unlockAccount(eth.accounts[1],'密码',解锁多少秒)

// 矿工相关的操作
miner.setEtherbase(账户地址) // 设置矿工账户
miner.start() // 开启矿工模式
miner.stop()  // 关闭矿工模式，
miner.start(1);admin.sleepBlocks(1);miner.stop() // 开始挖矿,当挖到一个块时就停止

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
