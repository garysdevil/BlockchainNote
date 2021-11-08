
# Solidity

- 智能合约概念于1995年由Nick Szabo首次提出
## 相关链接
- Solidity
    - Solidity源码  https://github.com/ethereum/solidity
    - solidity官方文档 https://docs.soliditylang.org
    - solidity中文文档 https://solidity-cn.readthedocs.io
    - solidity中文文档 https://www.qikegu.com/docs/4852
    - 以太坊标准 https://github.com/ethereum/EIPs/tree/master/EIPS
    - 以太坊标准合约/常用库的实现 https://github.com/OpenZeppelin/openzeppelin-contracts 
        - OpenZeppelin代码库包含了经过社区审查的ERC代币标准、安全协议以及很多的辅助工具库，这些代码可以帮助开发者专注业务逻辑的，而无需重新发明轮子。

- web3.js
    - web3.js官方文档 https://web3js.readthedocs.io/en/v1.5.2/
    - web3.js中文文档 https://web3.tryblockchain.org/
    - web3.js中文文档 http://cw.hubwiz.com/card/c/web3.js-1.0/
    - web3.js中文文档 https://learnblockchain.cn/docs/web3.js/index.html

- 开发工具
    - 开发框架truffle https://github.com/trufflesuite/truffle
    - 开发框架hardhat https://github.com/nomiclabs/hardhat
    - remix在线编译器 https://remix.ethereum.org/
    - remix桌面版 https://github.com/ethereum/remix-desktop
    - remix网页版 https://github.com/ethereum/remix-project

- 区块链游览器
    - 自建区块链游览器 https://github.com/blockscout/blockscout 复复杂
    - 自建区块链游览器 https://github.com/etherparty/explorer 简单  nodev8.17.0运行成功 nodev16.9.1运行失败

- 以太坊开发各种工具链接 
    - https://zhuanlan.zhihu.com/p/316741673
    - https://zhuanlan.zhihu.com/p/82411709
    
- 最佳安全开发指南 https://github.com/ConsenSys/smart-contract-best-practices

- 社区交流
    - https://gitter.im/ethereum/remix
    - https://gitter.im/ethereum/solidity#

- 智能合约的升级
    - https://github.com/NoharaHiroshi/upgradability-solidity-demo
    - https://blog.openzeppelin.com/the-state-of-smart-contract-upgrades/
    - https://juejin.cn/post/6844903599407890445
    - https://ethfans.org/posts/flexible-upgradability-for-smart-contracts

## 通过truffle进行合约编译部署
- 安装编译器
```bash
# mac安装truffle。truffle是一套开发智能合约的集成开发框架，它是基于javascript的，它的好处是能够解决从智能合约的编译，单元测试，发布，调试一体系的管理
brew install truffle

# solcjs是一个javascript实现的编译器，更加轻量级
npm install -g solc 
solcjs --bin --base-path . ./MainContract.sol
```

- 安装ganache-cli测试环境
```bash
#  安装测试环境（模拟接入以太坊）ganache
# 命令行版
npm install -g ganache-cli 
# Gui版
truffleframework.com/ganache 下载
```

```bash
# truffle-flattener 将多个相互依赖的合约文件编译为一个文件
npm install truffle-flattener -g
truffle-flattener xxx.sol > ERC20Full.sol

npm install truffle-plugin-verify
```

### 通过truffle编译和ganache-cli部署
- Truffle 规定合约的文件名和合约名称相同
```bash
# 打开测试环境
ganache-cli

# 创建项目
mkdir mytruffle && cd mytruffle
truffle init # 初始化项目框架 https://github.com/trufflesuite/truffle-init-webpack
# truffle unbox metacoin 初始化一个虚拟货币的例子
# ./contracts中存放的是合约
# ./migrations目录里面存放的JS文件，帮助部署合约到以太坊网络中


truffle compile # 编译合约
# 编译编译结果在./build/contracts目录内
# 默认只编译自上次编译后被修改过的文件，以此来减少不必要的编译。想编译全部文件，则使用 --compile-all 参数

truffle migrate --reset # 部署合约
# 仅会部署新创建的合约。想重新部署所有合约，则使用 --reset 参数
# 

truffle test     #执行测试脚本
```

```bash
truffle console # 进入到控制台后

# 查看合约信息
合约名称.deployed()

合约名称.deployed().then(function(instance){contractInstance=instance;});

```

### 通过hardhat进行合约编译部署
```bash
npm install --save-dev hardhat 
npx init
npx hardhat # 生成配置文件
npx hardhat compile
npx hardhat test
```
## 部署ethereum私有网
```bash
# 方式一 mac安装编译器
brew tap ethereum/ethereum
brew install solidity


# 安装geth
# 从官网下载geth
mv geth /usr/local/bin/

# 用bash启动以太坊，私有网络
geth --dev --datadir=~/ethereumData/ --networkid 65535 --nodiscover --http --http.addr 127.0.0.1 --http.port  8545 --ws --ws.addr 127.0.0.1 --ws.port 8544 --port 30303 --allow-insecure-unlock console
# --http.corsdomain "*"  # 跨域访问
# --http.api eth,web3,personal,net,db,miner # 允许通过http方式访问相关的模块
# --verbosity
# --ws --ws.addr 127.0.0.1 --ws.port 8544

# 另起一个终端，进入以太坊
geth --datadir=~/ethereumData/ attach
geth attach ~/ethereumData/geth.ipc
geth attach http://127.0.0.1:8545
geth attach ws://127.0.0.1:8546
```

## Ethereum控制台指令

- 基本指令
```bash
web3 # 查看所有的控制台指令

eth     # 主要包含对区块链进行访问和交互相关的方法
net     # 主要包含查看p2p网络状态的方法
admin   # 主要包含与管理节点相关的方法
miner   # 主要包含挖矿相关的一些方法
personal  # 包含账户管理的方法
txpool    # 包含查看交易内存池的方法

# 账户相关的操作
personal.newAccount('密码') # 创建账户 # 输出账户的地址 0xd139feabc9d47f8c95f0c14b6f3d6dcefe549161
personal.listAccounts # 列出所有账户地址
personal.unlockAccount(eth.accounts[1],'密码',解锁多少秒)

# 矿工相关的操作
eth.coinbase # 挖矿所得的代币会进入矿工账户，称呼为coinbase，默认情况下coinbase是本地账户中的第一个账户 
miner.setEtherbase(账户地址) # 设置矿工账户
miner.start() # 开启矿工模式
miner.stop()  # 关闭矿工模式，
miner.start(1);admin.sleepBlocks(1);miner.stop() # 开始挖矿,当挖到一个块时就停止

# eth
eth.blockNumber # 查看区块高度
eth.getBalance(eth.accounts[0]) # 查看账户的 eth
eth.estimateGas({data:binvar}) # 估算需要的 gas
eth.getTransactionReceipt(transactionHash) # 根据交易哈希查询交易信息
eth.defaultAccount = eth.accounts[0]; # 设置调用合约时的默认地址，否则链上交易不指定地址时会报错 Error: invalid address
eth.accounts[0] 

# txpool
txpool.status # 查看交易状态
```

### 部署合约调用合约
```js
abivar=abi内容 // abi内容
binvar="0x"+"bin内容" // 字节码内容
myaddress=eth.accounts[0]
personal.unlockAccount(eth.accounts[1],'123456',10000000)

// 部署合约,记住生成的合约地址
contractObject=eth.contract(abivar) // 生成合约对象
contractInstance=contractObject.new({from:myaddress,data:binvar}) // 部署合约返回合约实例
contractInstance

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
// 如果 合约函数名() 有constant标识，它并不会被编译器执行，web3.js会执行call()的本地操作。相反如果没有constant标识，会执行sendTransaction()操作
contractInstance.合约函数名()
```

### 代币相关
- 1ETH = 1000Finney
- 1Finney = 1000Szabo
- 1Szabo = 1000Gwei
- 1Gwei = 1000Mwei
- 1Mwei = 1000Kwei
- 1Kwei = 1000Wei

- 一个ETH 等于一千 Finney，一百万 Szabo，十亿Gwei，万亿Mwei，千万亿 Kwei，百万万亿 Wei
- 1ETH=1000000000000000000

- Gas由两个部分组成： 限制（Gas limit）和价格（Gas Price）
- Gas Limit 是用户愿意为执行某个操作或确认交易支付的最大Gas量（最少21,000）
- Gas Price 是 Gwei 的数量，用户愿意花费于每个 Gas 单位的价钱。

```js
// wei是以太币的最小单位，一个以太币=10的18次方个wei
web3.toWei() // 将以太币换算为wei
web3.fromWei() // 将wei换算为以太币  

// 转账
eth.sendTransaction({from:eth.accounts[0],to:eth.accounts[1],value:web3.toWei(1,"ether")})


> eth.gasPrice
188293

> eth.maxPriorityFeePerGas
1

> eth.getGasPrice()
undefined

> miner.setGasLimit()
true

> miner.setGasPrice()
true
```


## solc指令
```bash
# 编译
# --bin 生成字节码
# --abi 生成abi文件
# --optimize 进行优化编译
# -o ./ 输出结果到当前文件夹内
solc --bin --abi --optimize -o ./  代码文件 
```

## 区块链游览器
- https://github.com/etherparty/explorer 
```bash
git clone https://github.com/etherparty/explorer 
cd explorer 
npm install -g bower -y 
bower init
bower install --allow-root
bower install angular --save-dev  --allow-root
npm start
```