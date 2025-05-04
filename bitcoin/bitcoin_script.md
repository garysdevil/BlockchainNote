---
title: 比特币脚本语言
created_date: 2024-09-13
---

[TOC]

## 定义
1. 比特币脚本语言是一种基于堆栈的编程语言，用于定义如何花费特定的交易输出。
2. 比特币脚本语言不是图灵完备的，它没有循环和递归等复杂的编程结构。
3. 比特币脚本语言中的操作码（OP-Codes）是指在脚本中执行特定操作的命令。

- 概念
    1. 堆栈：比特币脚本主要通过堆栈操作来完成各种验证。堆栈是一种后进先出（LIFO）的数据结构。
    2. 锁定脚本（ScriptPubKey）：定义了如何花费一个输出，它被嵌入在交易输出中。
    3. 解锁脚本（ScriptSig）：提供解锁锁定脚本所需的数据，它被嵌入在交易输入中。


## 操作码
1. 基本操作码
    1. OP_0 (0x00) 堆栈作用: 将数值0（false）压入堆栈。 堆栈用途: 通常用于标记或填充空位。
    2. OP_1 (0x51) 到 OP_16 (0x60) 堆栈作用: 将数值 1 到 16 压入堆栈。 堆栈用途: 用于条件语句和多重签名验证。
2. 堆栈操作
    1. OP_DUP (0x76) 堆栈作用: 复制堆栈顶部的项。 堆栈用途: 常用于重复使用堆栈顶部的值。
    2. OP_DROP (0x75) 堆栈作用: 移除堆栈顶部的项。 堆栈用途: 删除不再需要的值。
    3. OP_SWAP (0x7c) 堆栈作用: 交换堆栈顶部的两项。 堆栈用途: 改变堆栈中项的顺序。
3. 算术和逻辑操作
    1. OP_ADD (0x93) 堆栈作用: 将堆栈顶部的两个数相加并将结果压入堆栈。 堆栈用途: 执行简单的加法操作。
    2. OP_EQUAL (0x87) 堆栈作用: 比较堆栈顶部的两个值，如果相等则返回true（压入1），否则返回false（压入0）。 堆栈用途: 比较两个值是否相等。
    3. OP_EQUALVERIFY (0x88) 堆栈作用: 运行OP_EQUAL，然后根据结果决定是否继续执行脚本。如果结果为false，则脚本失败。 堆栈用途: 常用于验证签名等条件。
4. 加密和哈希操作
    1. OP_SHA256 (0xa8) 堆栈作用: 对堆栈顶部的项执行SHA-256哈希运算，并将结果压入堆栈。 堆栈用途: 生成数据的哈希值。
    2. OP_HASH160 (0xa9) 堆栈作用: 对堆栈顶部的项先执行SHA-256哈希运算，再执行RIPEMD-160哈希运算，并将结果压入堆栈。 堆栈用途: 生成比特币地址的哈希值。
    3. OP_CHECKSIG (0xac) 堆栈作用: 验证堆栈顶部的签名是否有效。 堆栈用途: 确认交易的有效性。
    4. OP_CHECKMULTISIG (0xae) 堆栈作用: 验证多个签名是否有效。 堆栈用途: 多重签名验证。
5. 条件操作
    1. OP_IF (0x63) 堆栈作用: 如果堆栈顶部的值为true，则执行接下来的操作码，直到遇到OP_ELSE或OP_ENDIF。 堆栈用途: 用于条件执行。
    2. OP_ELSE (0x67) 堆栈作用: 与OP_IF配合使用，执行OP_IF条件为false时的操作码。 堆栈用途: 用于条件执行。
    3. OP_ENDIF (0x68) 堆栈作用: 结束条件执行块。 堆栈用途: 用于条件执行。

## 操作码实践
```bash
2 3 OP_ADD 6 OP_EQUAL
```
- 代码会从左到右顺序执行
    1. 2 和 3 会先后被 push 进栈，3 处在栈的最顶端。
    2. OP_ADD 会把 2 和 3 从栈里面 pop 出来，然后把 5 push 进栈，现在栈里面只有一个 5 了。
    3. 6 会被 push 进栈，现在栈里面有 5 和 6。
    4. OP_EQUAL 会把 6 和 5 都 pop 出来，然后把比较结果 false push 进栈。


```json
{
  "version": 1,
  "locktime": 0,
  "vin": [
    {
      "txid": "7957a35fe64f80d234d76d83a2a8f1a0d8149a41d81de548f0a65a8a999f6f18",
      "vout": 0,
      "scriptSig" : "3045022100884d142d86652a3f47ba4746ec719bbfbd040a570b1deccbb6498c75c4ae24cb02204b9f039ff08df09cbe9f6addac960298cad530a863ea8f53982c09db8f6e3813[ALL] 0484ecc0d46f1918b30928fa0e4ed99f16a0fb4fde0735e7ade8416ab9fe423cc5412336376789d172787ec3457eee41c04f4938de5cc17b4a10fa336a8d752adf",
      "sequence": 4294967295
    }
  ],
  "vout": [
    {
      "value": 0.01500000,
      "scriptPubKey": "OP_DUP OP_HASH160 ab68025513c3dbd2f7b92a94e0581f5d50f654e7 OP_EQUALVERIFY OP_CHECKSIG"
    },
    {
      "value": 0.08450000,
      "scriptPubKey": "OP_DUP OP_HASH160 7f9b1a7fb68d60c536c2fd8aeaa53a8f3cc025a8 OP_EQUALVERIFY OP_CHECKSIG",
    }
  ]
}
```
- scriptSig  
    - 格式： $signature  $public_key
    - 内容： 一项是数字签名，另一项是公钥（比特币地址）。
    - 功能： 设置解锁条件，接收方满足这个条件，才能花费这个UTXO。
    -
- scriptPubKey  
    - 格式： OP_DUP OP_HASH160 $pubKeyHash OP_EQUALVERIFY OP_CHECKSIG
    - 内容： 包含操作码 和 公钥的哈希(比特币地址)。
    - 功能： 满足 scriptPubKey 中提出的条件，把UTXO花掉。

- 代码执行过程
    1. 解锁脚本和锁定脚本的连接
        1.  $signature $publicKey OP_DUP OP_HASH160 $pubKeyHash OP_EQUALVERIFY OP_CHECKSIG
    2. OP_DUP 把栈最顶端的一项 $publicKey 复制一下，然后把结果 push 回栈。 
        1. $signature $publicKey $publicKey OP_HASH160 $pubKeyHash OP_EQUALVERIFY OP_CHECKSIG
    3. OP_HASH160 把栈最顶端的一项 $publicKey 取出并对其进行双重哈希运算 RIPEMD160(SHA-256($publicKey)) ，然后把结果 push 回栈。
        1. $signature $publicKey $pubKeyHash $pubKeyHash OP_EQUALVERIFY OP_CHECKSIG
    4. OP_EQUALVERIFY 比较堆栈顶部的两项是否相等，并删除它们，如果不相等则脚本失败。
        1. [signature, publicKey] OP_CHECKSIG
    5. OP_CHECKSIG：验证签名是否与提供的公钥匹配。
        1. 如果验证通过，脚本执行成功


## 被禁止的操作码
- OP_CAT是一种操作码，由匿名创建者中本聪在比特币存在的早期引入。
- OP_CAT 堆栈作用: 将堆栈顶部的两项连接成一项。
- OP_CAT 尝试再次使用 https://opcat.wtf/