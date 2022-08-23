- aleo sdk

[TOC]

## 相关链接
1. SDK https://github.com/garysdevil/myaleo
2. entropy1729团队官网 https://www.entropy1729.com/
3. 在线Aleo工具 https://aleohq.github.io/aleo/
4. ZK交易SDK https://github.com/AleoHQ/aleo
5. ARC
   1. ARC20 https://github.com/Entropy1729/ARC20_leo
6. 文章
   1. https://www.entropy1729.com/aleo-development-starter-pack/

## 代码示例
```rs
// The 'myaleo.aleo' program.
program myaleo.aleo; // 声明一个程序

function hello: // 定义一个函数
    input r0 as u32.public; // 定义一个输入参数r0，类型为u32，可见性为public
    input r1 as u32.private;
    add r0 r1 into r2; // 调用sdk的函数add
    output r2 as u32.private; // 定义一个输出参数r2，类型为u32，可见性为private
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