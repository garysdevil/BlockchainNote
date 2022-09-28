
[TOC]

## 关键字
1. import 导入一个Aleo程序作为函数库来进行调用，所导入的程序文件必须在imports目录下。
2. program  声明一个隐私智能合约程序，隐私智能合约程序程序类似于Rust里的宝箱名字，需要在宝箱仓库里全局唯一。
3. closure 声明一个闭包函数，闭包函数不能直接执行，必须被其它函数调用。
4. function 声明一个函数，可以在在命令行直接执行。
5. input 定义一个函数的输入参数。
6. output 定义一个函数的输出参数。
7. record  声明一个数据结构，用于在链上存储状态，必须包含两个字段 owner 和 gates。
8. interface 声明一个接口，类似于Rust语言里的结构体。
9. cast 创建一个新的指定数据类型的实例。
10. mapping  声明一个KV健值对。
11. increment 给KV健值对的值执行加法操作。
12. decrement 给KV健值对的值执行减法操作。
13. finalize  终局化。将record数据注册进链上，链上原有的record被销毁新的record被创建。

## 数据类型
1. 内置的数据类有 ```boolean field group i8 i16 i32 i64 i128 u8 u16 u32 u64 u128 scalar string```。
2. 可以通过``record``和``interface``关键字自定义数据类型。

## 通过代码解读语法
- 命令行操作
    ```bash
    aleo new myaleo # 创建一个基于Aleo SDK的隐私智能合约程序项目
    cd myaleo
    mkdir imports
    vim imports/myfun.aleo # 输入下面的 代码片段一
    vim main.aleo # 输入下面的 代码片段二

    aleo build
    # imports目录下的函数，默认不会被编译，只有当main.aleo文件使用到imports目录下的函数时，才会被编译。

    aleo account new # 创建一个账户
    
    # 函数的执行方式 aleo run main文件内的函数名 参数...

    # 运行mint_public函数，创建20个Token给地址为aleo14cxpdt6ga4v4aflnd0xkr26leatmhfws0h7pquw8jafg9hu2nsxqky55ua的账户
    aleo run  mint_public  aleo14cxpdt6ga4v4aflnd0xkr26leatmhfws0h7pquw8jafg9hu2nsxqky55ua 20u64 
    # 运行call_sub函数，传入两个类型为u32的参数，执行减法操作
    aleo run  call_sub  10u32 1u32

    aleo node start # 本地运行一个开发节点，并且部署运行程序
    ```
- 代码片段一
    ```rs
    // 声明一个隐私智能合约程序。
    program myfun.aleo;

    // 通过 closure 关键字声明一个闭包，闭包函数不能直接执行必须通过其它函数调用来执行
    closure util_add:
        input r0 as u32;
        input r1 as u32;
        add r0 r1 into r2; // 调用sdk的函数add
        output r2 as u32;

    // 定义一个函数，传入两个u32类型的参数执行相加操作 
    // 运行方式 aleo run fun_add 1u32 22u32
    function fun_add: // 通过 function 关键字定义一个函数
        input r0 as u32.public; // 定义一个输入参数r0，类型为u32，可见性为public
        input r1 as u32.private;
        call util_add r0 r1 into r2; // 通过call关键字，调用自定义的闭包函数
        output r2 as u32.private; // 定义一个输出参数r2，类型为u32，可见性为private

    // 定义一个函数 执行相加操作
    // 运行方式 aleo run fun_sub 10u32 1u32
    function fun_sub:
        input r0 as u32.public;
        input r1 as u32.private;
        sub r0 r1 into r2;
        output r2 as u32.private;

    // 通过 interface 关键字定义一个数据结构
    interface array3:
        a0 as u32;
        a1 as u32;
        a2 as u32;

    // 定义一个函数，给record里的值都执行加1操作，然后输出一个新的record 
    // 运行方式 aleo run sum_one_to_array3 "{a0: 0u32, a1: 1u32, a2: 2u32}"
    function sum_one_to_array3:
        input r0 as array3.private; // 输入一个数据类型为array3的数据
        add r0.a0 1u32 into r1; // 通过r0.a0访问interface变量内部的属性
        add r0.a1 1u32 into r2;
        add r0.a2 1u32 into r3;
        cast r1 r2 r3 into r4 as array3; // 使用cast关键字创建一个新的 interface
        output r4 as array3.private; // 输出
    ```
- 代码片段二
    ```rs
    import myfun.aleo; // 导入 myfun.aleo 程序进当前作用域内 // myfun.aleo 文件需要放在当前目录的imports文件夹内

    // 声明一个隐私智能合约程序。
    program myaleo.aleo;

    // 定义一个函数，传入两个u32类型的参数执行减法操作 
    // 运行方式 aleo run call_sub 10u32 1u32
    function call_sub:
        input r0 as u32.public;
        input r1 as u32.private;
        call myfun.aleo/fun_sub r0 r1 into r2; // 调用myfun.aleo里面的fun_sub函数
        output r2 as u32.private;

    // 通过 record 关键字定义一个record，必须包含 owner 和 gates 字段
    record token:
        // 定义这个名字为token的record拥有者
        owner as address.private;
        // 定义gates的数量。gates为Aleo项目里代币的最小单位，如同以太坊里的Wei。
        gates as u64.private;
        // 定义amount字段
        amount as u64.private;

    // 通过 mapping 关键字定义一个KV健值对
    mapping account:
        // 账户地址作为Key
        key owner as address.public;
        // 数量作为Value
        value amount as u64.public;

    // 终局化mint_public函数的操作，增加account[address]的代币数量
    finalize mint_public:
        // Input the token receiver.
        input r0 as address.public;
        // Input the token amount.
        input r1 as u64.public;

        // 执行增加操作 `account[r0]` + `r1`.
        // 如果 `account[r0]` 不存在，则被自动创建
        // 如果 `account[r0] + r1` 益处, `mint_public` 函数被重置
        increment account[r0] by r1;
    ```