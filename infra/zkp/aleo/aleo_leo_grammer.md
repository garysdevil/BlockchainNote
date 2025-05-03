---
created_date: 2022-10-17
---

[TOC]

## Leo编程
- https://github.com/AleoHQ/ARCs/discussions/17

- 2022.10.04 将来语法的变动 https://discord.com/channels/700454073459015690/722549434520699030/1026672405697024000
    1. interface -> struct
    2. function -> transition
    3. closure -> function

## 关键字
1. import 导入一个Aleo程序作为函数库来进行调用，所导入的程序文件必须在imports目录下。
2. program  声明一个隐私智能合约程序，隐私智能合约程序程序类似于Rust里的宝箱名字，需要在宝箱仓库里全局唯一。
3. function 声明一个函数，函数不能直接执行，必须被其它函数调用。
4. transition 声明一次状态更新操作，可以在在命令行直接执行。
5. input 定义一个函数的输入参数。
6. output 定义一个函数的输出参数。
7. record  声明一个数据结构，数据存储于链上，必须包含两个字段 owner 和 gates。
8. interface 声明一个接口，类似于Rust语言里的impl关键字。
9.  mapping  声明一个KV健值对。
10. increment 给KV健值对的值执行加法操作。
11. decrement 给KV健值对的值执行减法操作。
12. finalize  将record状态的更新，变为对外公开。
13. name.network
