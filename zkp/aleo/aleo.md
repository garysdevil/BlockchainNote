- aleo sdk

[TOC]
# aleo
## 相关链接
1. entropy1729团队官网 https://www.entropy1729.com/
2. entropy1729团队GIthub https://github.com/Entropy1729
3. 在线Aleo工具 https://aleohq.github.io/aleo/
4. ZK交易SDK https://github.com/AleoHQ/aleo
5. ZK交易SDK教程 https://developer.aleo.org/aleo/tooling/
6. ARC20
   1. ARC20 https://github.com/Entropy1729/ARC20_leo
7. 文章
   1. https://www.entropy1729.com/aleo-development-starter-pack/

## 安装
```bash
# 下载源码
git clone https://github.com/AleoHQ/aleo.git

# 进入源码目录
cd aleo

# 安装aleo程序
cargo install --path .
```

## 指令
```bash
# 创建一个包
aleo new package名字

# 编译和验证程序
aleo build

# 通过线下模式编译程序
aleo build --offline

# 编译并且指定一个终端运行程序
# aleo build --endpoint {$ENDPOINT}

# 运行程序
aleo run {$FUNCTION} {$INPUTS}

# 运行一个开发节点，并且部署程序
aleo node start
# 运行一个开发节点
aleo node start --nodeploy

# 清除build结果
aleo clean
```

## build 生成的文件
1. .avm - 虚拟机运行的字节码
2. .prover - 每一个函数都会生成一个证明者
3. .verifier - 每一个函数都会生成一个验证者


# 语法
## aleo程序
1. ProgramID
2. Imports
3. Functions
4. Closures
5. Interfaces
6. Records
7. Mappings
8. Finalize

```rs
// 示例代码

// import foo.aleo; // 导入 foo.aleo 程序进当前作用域内

// The 'myaleo.aleo' program.
program myaleo.aleo; // 声明一个 ProgramID，链上全局唯一。

function hello: // 通过 function 关键字定义一个函数
    input r0 as u32.public; // 定义一个输入参数r0，类型为u32，可见性为public
    input r1 as u32.private;
    add r0 r1 into r2; // 调用sdk的函数add
    output r2 as u32.private; // 定义一个输出参数r2，类型为u32，可见性为private

closure foo: // 通过 closure 关键字声明一个闭包，闭包函数不能直接执行必须被其它函数调用
    input r0 as field;
    input r1 as field;
    add r0 r1 into r2;
    output r2 as field;

interface array3: // 通过 interface 关键字定义一个数据结构
    a0 as u32;
    a1 as u32;
    a2 as u32;

record token: // 通过 record 关键字定义一个record，必须包含 owner 和 gates 字段
    // The token owner.
    owner as address.private;
    // The Aleo balance (in gates).
    gates as u64.private;
    // The token amount.
    amount as u64.private;

mapping account: // 通过 mapping 关键字定义一个KV健值对
    // The token owner.
    key owner as address.public;
    // The token amount.
    value amount as u64.public;
```

## Types
```
boolean
field
group
i8
i16
i32
i64
i128
u8
u16
u32
u64
u128
scalar
string
```

## Registers
- Registers，是一个存储数据和更改数据的地方。

## Interfaces
- Interfaces，类似于传统语言的结构体。
- 可以将 Interfaces 存进 Registers 里。

```rs
interface array3: // 定义一个Interfaces
    a0 as u32;
    a1 as u32;
    a2 as u32;
```

```rs
function sum_one_to_array3:
    input r0 as array3.private; // 定义输入一个interface类型的参数 array3 // 运行这个函数 aleo run sum_one_to_array3 "{a0: 0u32, a1: 1u32, a2: 2u32}"
    add r0.a0 1u32 into r1; // 通过r0.a0访问interface变量内部的属性
    add r0.a1 1u32 into r2;
    add r0.a2 1u32 into r3;
    cast r1 r2 r3 into r4 as array3; // 使用cast关键字创建一个新的 interface
    output r4 as array3.private;
```

## Records
- Records 和  Interfaces 类似，但比 Interfaces 多两个字段 owner 和 gates。
- Records 在Aleo中是被加密的。
```rs
record token: // 定义一个 record
    owner as address.private // record的拥有者地址
    gates as u64.private // record需要花费的aleo积分
```

#
```bash
# 运行本地开发者节点
aleo node start

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