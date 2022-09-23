[TOC]

## 相关资料链接
1. Aleo SDK https://github.com/AleoHQ/aleo
2. Aleo SDK主要贡献者entropy1729团队官网 https://www.entropy1729.com/
3. Aleo SDK主要贡献者entropy1729团队GIthub https://github.com/Entropy1729
4. 在线Aleo钱包生成工具 https://aleohq.github.io/aleo/
5. Aleo SDK基本概念 https://www.entropy1729.com/aleo-introduction
6. Aleo SDK基本语法 https://www.entropy1729.com/aleo-development-starter-pack/

## Aleo项目的组成
- Aleo 是第一个保护隐私的、可编程自定义隐私智能合约程序、可以链下执行隐私智能合约程序计算的区块链项目。
- SnarkVM 是隐私智能合约程序的执行环境。功能类似于以太坊虚拟机。
- SnarkOS 是隐私智能合约程序的去中心化操作系统。功能类似于以太坊公链。
- Aleo SDK 是一个开发者框架，使零知识应用的开发变得更简单。开发者通过 Aleo SDK 可以快速地创建一个新账户，制作一笔交易，广播交易。
- Aleo Leo 是隐私智能合约程序的高级编程语言，集成了Aleo SDK。

## Aleo SDK 安装
- 通过宝箱仓库安装
    ```bash
    # 官方代码在快速迭代中，更加推荐通过源码进行安装
    cargo install aleo
    ```

- 通过编译源码安装
    ```bash
    # 下载源码 
    git clone https://github.com/AleoHQ/aleo.git
    # 进入源码目录
    cd aleo
    # 安装 aleo sdk 程序 # rust安装教程 https://www.rust-lang.org/tools/install
    cargo install --path .
    # 查看是否安装成功
    aleo -h
    ```

## Aleo SDK 指令
```bash
# 创建一个包
aleo new 包名字
# 自动在${包名字}文件夹下生成两个文件
# main.aleo 代码文件
# program.json 程序配置文件

# 生成一个钱包账户
aleo account new
# Private Key  APrivateKey1zkpDStSQfu6maFgSro5ePXax8xS4MmBj7qA98FBKR8xm1ZU
# View Key  AViewKey1reh7CfNpCyo77UXKx46kjLL7KAPntSDVA2BNjBPwt7of
# Address  aleo1zjnre3esly55gkeqlet5xvklvwqntfpcxkdac5l8wk0sdyp35ygq7ulxk4

# 编译程序生成证明
aleo build
# build 后生成的文件
# 1. AVM虚拟机运行的字节码文件 mian.avm
# 2. 每一个函数都会生成一个证明者文件 函数名.prover
# 3. 每一个函数都会生成一个验证者文件 函数名.verifier

# 远程编译程序生成证明 # 具体如何填写${ENDPOINT}，目前还未知
aleo build --endpoint ${ENDPOINT}

# 运行程序
aleo run ${FUNCTION} ${INPUTS}

# 本地运行一个开发节点，并且部署程序
aleo node start
# 本地运行一个开发节点，不部署程序
aleo node start --nodeploy

# 清除build结果
aleo clean
```

## Aleo SDK 的Hello World程序
- 编写一个函数，从外部输入两个数字，然后进行相加，最后输出结果。
    ```bash
    aleo new aleo_hello
    cd aleo_hello
    vim main.aleo # 输入下面的代码片段
    aleo run add_fun 2021u32 1u32 # 执行add_fun相加函数，传入2021和1两个数字
    aleo node start # 本地运行一个开发节点，并且部署运行程序
    ```
- 代码片段
    ```rs
    program aleo_hello.aleo;

    // 运行方式 aleo run add_fun 2021u32 1u32
    function add_fun: // 通过 function 关键字定义一个函数
        input r0 as u32.public; // 定义一个输入参数r0，类型为u32，可见性为public
        input r1 as u32.private;
        add r0 r1 into r2; // 调用sdk的函数add
        output r2 as u32.private; // 定义一个输出参数r2，类型为u32，可见性为private
    ```

## Aleo SDK 本地开发节点API
```bash
# 查看最新的块高
curl http://localhost:4180/testnet3/latest/block/height

# 通过块高高度查看账本
curl http://localhost:4180/testnet3/block/{height}

# 查看最后一个块高的哈希
curl http://localhost:4180/testnet3/latest/block/hash

# 通过ViewKey查看records
# curl --location --request GET 'localhost:4180/testnet3/records/all' -H 'Content-Type: application/json' -d '"ViewKey"'
curl --location --request GET 'localhost:4180/testnet3/records/all' -H 'Content-Type: application/json' -d '"AViewKey1hU73JxupzRh7uEnynsXgUQL3neSJcJZ2dMBkCPh97zoZ"' | jq
curl --location --request GET 'localhost:4180/testnet3/records/all' -H 'Content-Type: application/json' -d '"AViewKey1eZqsm6igutMTUbnwWw8vPQG5ceJruyYQs8XwTmNQdMJf"' | jq

# This endpoint retrieves only the spent records belonging to a given ViewKey
curl --location --request GET 'localhost:4180/testnet3/records/spent' -H 'Content-Type: application/json' -d '"AViewKey1hU73JxupzRh7uEnynsXgUQL3neSJcJZ2dMBkCPh97zoZ"' | jq

# This endpoint retrieves only the unspent records belonging to a given ViewKey.
curl --location --request GET 'localhost:4180/testnet3/records/unspent' -H 'Content-Type: application/json' -d '"AViewKey1hU73JxupzRh7uEnynsXgUQL3neSJcJZ2dMBkCPh97zoZ"' | jq
```