## Aleo SDK 代码语法

```rs
// 示例代码

// import foo.aleo; // 导入 foo.aleo 程序进当前作用域内 // 测试失败

// 声明一个 ProgramID，链上全局唯一。
program myaleo.aleo;

// 运行方式 aleo run add_fun 1u32 22u32
function add_fun: // 通过 function 关键字定义一个函数
    input r0 as u32.public; // 定义一个输入参数r0，类型为u32，可见性为public
    input r1 as u32.private;
    add r0 r1 into r2; // 调用sdk的函数add
    output r2 as u32.private; // 定义一个输出参数r2，类型为u32，可见性为private


closure add_util: // 通过 closure 关键字声明一个闭包，闭包函数不能直接执行必须被其它函数调用
    input r0 as field;
    input r1 as field;
    add r0 r1 into r2;
    output r2 as field;

interface array3: // 通过 interface 关键字定义一个数据结构
    a0 as u32;
    a1 as u32;
    a2 as u32;

record token: // 通过 record 关键字定义一个record，必须包含 owner 和 gates 字段
    // 定义这个名字为token的record拥有者
    owner as address.private;
    // 定义gates的数量。gates为Aleo项目里代币的最小单位，如同以太坊里的Wei。
    gates as u64.private;
    // 定义amount字段
    amount as u64.private;

mapping account: // 通过 mapping 关键字定义一个KV健值对
    // The token owner.
    key owner as address.public;
    // The token amount.
    value amount as u64.public;
```



## Aleo SDK 语法

### 概念
- 术语
    1. Accounts  钱包账户。由私钥、可视密钥、地址组成，其中可视密钥和地址是由私钥衍生出来的。
       1. 地址用于进行交易时，对用户进行识别。
       2. 可视密钥用于查看钱包账户的所有交易。
       3. 私钥用于签名交易。
    2. Programs 程序。基于Aleo SDK构建的隐私智能合约程序；公链内部内置了credits隐私智能合约程序，用于存储所有aleo的积分状态。 
    3. Transitions 每一次链上状态的改变，都是一次Transition，会涉及到record的销毁和新建。
    4. Transactions 交易。多个Transitions的集合。用户既可以将多个Transitions打包为一个Transaction，也可以每个Transition打包为一个Transaction。
    5. Records  用于在链上存储状态，必须包含两个字段 owner 和 gates。Records数据在Aleo链上是被加密的。
    6. Record Commitments  records的唯一标识符。
    7. Serial Number  当record被销毁时，会通过它的commitment和拥有者私钥生成Serial Number，以此来防止链上的Record被双花。
    8. ProgramID  隐私智能合约程序的ID，类似于Rust里的宝箱名字，需要在宝箱仓库里全局唯一。
    9. Types 数据类型，内置的数据类有 ```boolean field group i8 i16 i32 i64 i128 u8 u16 u32 u64 u128 scalar string```。
    10. Imports 可以导入一个Aleo程序作为函数库来进行调用，类似于Rust里的import导入lib库的概念。
    11. Functions 函数，可以在在命令行直接执行。
    12. Closures 闭包函数，闭包函数不能直接执行，必须被其它函数调用。
    13. Interfaces 接口，类似于Rust语言里的结构体，是自定义的数据类型，也可以被存入 Registers 里。
    14. Mappings  
    15. Finalize

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

