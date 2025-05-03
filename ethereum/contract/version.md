---
created_date: 2022-04-26
---

[TOC]

## Solidity 8.0版本的新特性
1. 数学溢出安全检查
2. 自定义错误
3. 函数可以定义在合约外部（不需要定义函数可见性，函数不可以被合约外部调用）
4. 引入的函数可以起别名
5. Salted contract creation

```js
// SPDX-License-Identifier: GPL-3.0 //指定开源协议
pragma solidity ^0.8.0;
// 引入的函数functionA起别名为funA
import {functionA as funA} from "./Sol.sol"

// 函数可以定义在合约外部
function myLib(uint256 x) pure returns(uint256){
    return x*2;
}

// 自定义错误 // 可以传递参数
error Unautorized(address caller);
contract myCon{
    function test() public {
        if (true) // 触发错误
            // revert("my error")
            revert Unautorized(msg.sender);
    }
}
```