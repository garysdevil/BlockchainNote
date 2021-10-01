-  调用另一个合约实例的函数时，会执行一个 EVM 函数调用，这个操作会切换执行时的上下文，这样，前一个合约的状态变量就不能访问了。


## 合约之间的调用
- 在 Solidity 中提供了 call、delegatecall、callcode 三个函数来实现合约之间相互调用及交互。
```js
address.call()
```

## gas
- 参考 https://zhuanlan.zhihu.com/p/54662099
1. 内部调用view/pure的fun()      消耗：几十gas 
2. 内部调用写状态变量的fun()       消耗：几百gas 
3. 外部调用view/pure的fun()      消耗：两三千gas 
4. 外部调用写状态变量的fun()       消耗：三四千gas 
5. 写一个uint状态变量             消耗：两万多gas （用uint8代替uint256反而消耗gas更多） 
6. 修改一个定长数组(状态变量)元素    消耗：两万多gas 
7. 插入一个map(状态变量)元素        消耗：两万多gas push一个uint[]变长数组(状态变量)元素   消耗：四万多gas
