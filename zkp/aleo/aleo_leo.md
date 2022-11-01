- 基于 Leo 仓库 testnet3分支 2022年10月16日提交的commit版本 3a8e11e278c7cf34d485fe63a1e90dec4b042e45 对以下内容进行介绍。

[TOC]

## 相关资料链接
1. Leo官网  https://leo-lang.org/
2. Leo白皮书  https://eprint.iacr.org/2021/651.pdf
3. Leo源码  https://github.com/AleoHQ/leo
4. Leo文档  https://developer.aleo.org/leo/getting_started/overview
5. Leo包管理中心  https://aleo.pm/
6. Aleo链上的Leo程序 https://www.aleo.network/programs
7. Leo编程语言的语法格式  https://github.com/AleoHQ/grammars
8. Leo编程介绍  https://www.entropy1729.com/leo-development-starter-pack/
9. Leo的ARC提案 https://github.com/AleoHQ/ARCs

- Leo编程案例
    1. ARC20 https://github.com/Entropy1729/ARC20_leo
    2. Bulls and Cows game(公牛和奶牛比赛游戏)  https://github.com/mlsmith/aleo-numbers
    3. ZK coinflip https://github.com/demox-labs/zk-coinflip
    4. battleship游戏  https://github.com/demox-labs/zk-battleship
    5. 隐私NFT  https://github.com/demox-labs/aleo-nft
    6. CTO讲述leo编程案例 https://youtu.be/-FrrylHITvg

## 概览
- Leo编程语言的愿景
    - 让软件开发工程师可以不用关心零知识证明的底层知识、电路的生成，只需要关注业务层，即可以高效地构建零知识证明应用。

- Leo简介
    1. Leo是构建在 Aleo SDK 基础之上的零知识编程语言。
    2. Leo是一种用于编写隐私应用程序的函数式静态类型编程语言。
    3. Leo不同于传统计算机语言，Leo编写的程序会被编译成零知识证明的电路。
    4. Leo通过构建零知识证明的电路，来执行运算操作。

- Leo引进了
  1. 零知识应用
  2. resolver
  3. 通用定理生成器 theorem generator for general-purpose
  4. 测试框架 testing framework
  5. 包管理器 package registry

## Leo 编译器安装
- 方式一 通过Rust cargo宝箱库进行安装。（官方代码在快速迭代中，宝箱库里的代码比较陈旧，推荐通过源码进行安装）
    ```bash
    # 安装Leo编译器
    cargo install leo-lang
    # 验证是否安装成功
    leo --version
    ```

- 方式二 通过源码进行安装。
    ```bash
    # 下载源码
    git clone https://github.com/AleoHQ/leo
    cd leo
    # 安装leo编译器
    cargo install --path .
    # 验证是否安装成功
    leo --version
    ```

## Leo 命令行指令
```bash
# 创建一个项目
project_name="hello_world"
leo new ${project_name}
cd ${project_name}

# 编译一个项目
leo build

# 编译运行一个项目
leo run # 执行transition名字为main的状态转移，从input文件夹内读取参数值。
leo run ${transition_name} # 执行transition名字为${transition_name}的状态转移，从input文件夹内读取参数值。
leo run ${transition_name} 参数1 参数2 # 执行transition名字为${transition_name}的状态转移，从命令行读取参数值。
```

## Leo 的Hello World程序
- 执行``leo new hello_world``指令创建一个名字为 hello_world 的项目。

### 项目目录结构
1. program.json  项目的元文件
2. README.md  项目的介绍
3. build  项目被编译后的文件
4. inputs  项目的输入参数文件夹
    - hello_world.in  hello_world程序的输入参数文件
5. output 新建一个项目时并不会生成此目录，当编译运行时才会生成此文件夹。
6. src  项目的源代码文件夹
    - main.leo  项目的源代码入口

### 项目元文件 program.json 
```json
{
    "program": "hello_world.aleo", // 项目的名字
    "version": "0.0.0", // 项目版本号
    "description": "", // 项目描述
    "development": {
        "private_key": "APrivateKey1zkp2wpbnb7MwfxSn5WHePdtpdd11sPkL39BTHxCZveyiLPK", // 用于运行程序，执行签名的账户私钥
        "address": "aleo1t5w5dh60ftr9svj206sfkm3008l3auxctapr2tw36w6rjd5n2uxqfxv7tt" // 用于运行程序，的账户地址
    },
    "license": "MIT"
}
 ```

### 源代码文件入口 src/main.leo
```rs
// 通过 program 关键字定义一个名字为 'hello_world' 的程序。
program hello_world.aleo {
    // transition 关键字，定义一次状态转移操作，定义名字为main。输入参数既可以从 inputs/hello_world.in 里读取，也可以在运行时从命令行里传入。
    // 运行方式1 leo run main
    // 运行方式2 leo run main 4u32 5u32
    transition main(public a: u32, b: u32) -> u32 {
        let c: u32 = a + b;
        return c;
    }
    // transition 关键字，定义一次状态转移操作，定义名字为main2。输入参数既可以从 inputs/hello_world.in 里读取，也可以在运行时从命令行里传入。
    // 运行方式1 leo run main2
    // 运行方式2 leo run main2 4u32 5u32
    transition main2(public a: u32, b: u32) -> u32 {
        let c: u32 = a * b;
        return c;
    }
}
```

### 输入参数文件 hello_world.in
```toml
[main]
public a: u32 = 1u32;
b: u32 = 2u32;

[main2]
public a: u32 = 1u32;
b: u32 = 2u32;
```

1. main 代表了transition名字为 main 的一次状态转移操作中的输入参数。
   - 输入参数a，可见性为public，类型为u32，值为1
   - 输入参数b，类型为u32，值为2
2. main2 代表了transition名字为 main2 的一次状态转移操作中的输入参数。
   - 输入参数a，可见性为public，类型为u32，值为1
   - 输入参数b，类型为u32，值为2
