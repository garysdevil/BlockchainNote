---
created_date: 2022-03-21
---

[TOC]

## 智能合约

- 智能合约概念于1995年由Nick Szabo首次提出

- ABI = Application Binary Interface

## 相关链接

- Solidity

  - Solidity源码 https://github.com/ethereum/solidity
  - solidity官方文档 https://docs.soliditylang.org
  - solidity中文文档 https://solidity-cn.readthedocs.io 旧版本/仅参考
  - solidity中文文档 https://www.qikegu.com/docs/4852 旧版本/仅参考
  - 以太坊标准 https://github.com/ethereum/EIPs/tree/master/EIPS
  - 以太坊标准合约/常用库的实现 https://github.com/OpenZeppelin/openzeppelin-contracts
    - OpenZeppelin代码库包含了经过社区审查的ERC代币标准、安全协议以及很多的辅助工具库，这些代码可以帮助开发者专注业务逻辑的，而无需重新发明轮子。

- 调用智能合约的库

  - web3.js
    - Github https://github.com/web3/web3.js
    - 文档 https://web3js.readthedocs.io/en/v1.8.0/web3.html
    - v4版本文档 https://docs.web3js.org/api
  - ethers.js
    - Github https://github.com/ethers-io/ethers.js/
    - 文档 https://docs.ethers.io/v5/
  - EthereumJS
    - Github https://github.com/ethereumjs/ethereumjs-monorepo

- 开发工具

  - 开发框架truffle https://github.com/trufflesuite/truffle
  - 开发框架hardhat https://github.com/nomiclabs/hardhat
  - remix在线编译器 https://remix.ethereum.org/
  - remix桌面版 https://github.com/ethereum/remix-desktop
  - remix网页版 https://github.com/ethereum/remix-project
  - 所有的编译器版本 https://github.com/ethereum/solc-bin

- 区块链游览器 https://etherscan.io/

  - 以太坊网络拥堵情况 https://etherscan.io/chart/pendingtx

- 以太坊开发各种工具链接

  - https://zhuanlan.zhihu.com/p/316741673
  - https://zhuanlan.zhihu.com/p/82411709

- 社区交流

  - https://gitter.im/ethereum/remix
  - https://gitter.im/ethereum/solidity#

- 智能合约的升级

  - https://github.com/NoharaHiroshi/upgradability-solidity-demo
  - https://blog.openzeppelin.com/the-state-of-smart-contract-upgrades/
  - https://juejin.cn/post/6844903599407890445
  - https://ethfans.org/posts/flexible-upgradability-for-smart-contracts

- 区块链节点服务商

  - https://infura.io/
  - https://www.alchemy.com/
  - Infura 免费层每天允许 100,000 个请求，而 Alchemy 允许 3 亿个请求。

- 学习资料

  - cryptozombie
    - cryptozombie https://github.com/loomnetwork/cryptozombie-lessons
    - 官网 https://cryptozombies.io/

- 其它文章

  - Gas优化 https://zhuanlan.zhihu.com/p/54662099

## 编译部署智能合约

### 安装编译部署工具

- solidity编译器

  ```bash
  # 在mac上安装solidity编译器
  brew tap ethereum/ethereum
  brew install solidity
  solc --help
  ```

- truffle 编译测试部署一体化工具包

  ```bash
  # 在Mac操作系统上安装truffle。truffle是一套开发智能合约的集成开发框架，它是基于javascript的，它的好处是能够解决从智能合约的编译，单元测试，发布，调试一体系的管理
  brew install truffle
  # 通过npm安装
  npm install truffle -g
  ```

- solcjs 编译器

  ```bash
  # solcjs是一个javascript实现的编译器，更加轻量级
  npm install -g solc 
  # 编译
  solcjs --bin --base-path . ./MainContract.sol
  ```

- ganache-cli 以太坊模拟环境

  ```bash
  #  安装测试环境（模拟接入以太坊）ganache
  # 命令行版
  npm install -g ganache-cli 
  # Gui版
  truffleframework.com/ganache 下载
  ```

- truffle-flattener

  ```bash
  # truffle-flattener 将多个相互依赖的合约文件编译为一个文件
  npm install truffle-flattener -g
  truffle-flattener xxx.sol > ERC20Full.sol

  npm install truffle-plugin-verify
  ```

### 通过solc进行编译

```bash
# 编译
# --bin 生成字节码
# --abi 生成abi文件
# --optimize 进行优化编译
# -o ./ 输出结果到当前文件夹内
solc --bin --abi --optimize -o ./  代码文件
```

### 通过truffle编译和ganache-cli部署

- Truffle 规定合约的文件名和合约名称相同

```bash
# 启动以太坊模拟环境
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

## 开发工具

### vsCode

- 安装solidity插件
- vscode-solidity插件编译器位置寻找顺序
  1. 本地node_modules (需要更改配置Solidity: Default Compiler， 和在项目下执行指令 npm incall solc）
  2. 本地文件寻找 solidity.compileUsingLocalVersion
  3. 远程寻找 solidity.compileUsingRemoteVersion

### Remix

- 安装

  ```bash
  # 方式一 通过npm进行安装
  npm install remix-ide -g
  npm install -g remixd
  remix-ide

  # 方式二 通过源码安装 https://github.com/ethereum/remix-project
  # (未试过)找出代码里编译器的链接，更改为本地的链接 grep -R  'solc-bin.ethereum.org' ./
  # (失败)更改IP端口 vim ./apps/remix-ide/bin/remix-ide
  # 编译运行
  npm run build:production
  npm run serve:production
  ```

- 当使用本地的编译器时，需要赋予 sol\*.js 文件执行权限。

## nodejs

### ethers.js

Providers，Signers，Contract Interaction，Utilities

- API类型
  1. Providers 匿名连接以太坊网络，查看状态，发送交易。
  2. Signers 以太坊账户的抽象，对交易进行签名。
     - 在Signer中比较常用的方法为Wallet，只有Wallet可以使用私钥对交易和信息进行签名。
     - 示范
       ```js
       // new ethers.Wallet(privateKey[, provider])
       const alice = new ethers.Wallet(privateKeyAlice, provider);
       const bob = new ethers.Wallet(privateKeyBob, provider);

       const txReceipt = await alice.sendTransaction({
           to: bob.address,
           value: ethers.utils.parseEther('1.0')
       });
       await txReceipt.wait();
       ```
  3. Contract Interaction 部署合约与生成合约实例
  4. Utilities 相关工具
