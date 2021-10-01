## 语言对比
- 一个contract看成Java的一个Class类。
- 一个contract的一个实例看成Java的一个对象。
- contract也拥有Java类似的封装、继承、多态的特性。
- contract也拥有golang结构体的数据结构。

## 
```js
// 如何使用库
// 使用using语句将库中的函数附加到uint256数据类型上
using 库名 for uint256;
```

## 全局变量
```js
msg.sender (address) // 消息发送者（当前调用智能合约函数的账户地址） 
msg.value (uint) // 这个消息所附带的以太币，单位为wei。

block.coinbase (address) // 当前块矿工的地址

block.number (uint) // 当前区块的块号
block.difficulty (uint) // 当前块的难度
block.timestamp (uint) // 当前块的Unix时间戳（从1970/1/1 00:00:00 UTC开始所经过的秒数）
now // block.timestamp的简写模式，以及被定义为deprecated
```

## 变量/数据
- 变量的三种存储类型
    - memory 
        - 默认的函数参数，包括返回的参数，都是memory存储类型
        - 存储在内存里；即分配，即使用，越过作用域即不可被访问；等待被回收；
        - memory之间是引用传递，并不会拷贝数据
    - storage 
        - 默认的局部变量是storage
        - 数据将永远存在于区块链上
    - calldata 
        - 一般只有外部函数的参数（不包括返回参数）被强制指定为calldata。
        - 数据位置是只读的，不会持久化到区块链。

- 数据类型
    1. 布尔 bool
    2. 整型
    3. 定长浮点型
    4. 地址
    5. 定长字节数组
    6. 变长字节数组
    7. 枚举 enum
    8. 映射 

```js
pragma solidity >=0.7.0 <0.9.0;
contract Person {
    // 变量的声明
    // 数据类型 变量可见性 变量名称
    uint public varname;
    
    // 映射 基本类型 映射到 基本类型/引用类型
    mapping(基本类型 => 基本类型/引用类型) 可见性 变量名
    mapping(uint256 => address) private varname;

    // 结构体
    struct Gender {
        bool femail;
        address account;
    }
    
    // 枚举
    enum Fruit { Apple, Peach, Watermelon } // 枚举 // 对应着uint8类型的 0 1 2
    Fruit constant favoriteFruit = Fruit.Apple;
}
```

- 状态变量：默认可见性为 internal ，不能设置为 external 。
- 可见性程度 public  > internal > private 
- 三种可见性
    1. public  生成一个自动 getter 函数
    3. internal 只能在内部进行访问
    4. private 仅在当前合约可以被访问，不能被继承

## 合约
### 函数可见性
- 内部调用：又被称为“消息调用”。常见的有对合约内部函数、父合约函数、库函数的调用。
- 外部调用：又被称为“EVM 调用”。一般为跨合约的函数调用。

- 可见性程度 public > external > internal > private 
- 四种可见性
    1. public 同时支持内部和外部调用
    2. external 只支持外部调用
    3. internal 只支持内部调用
    4. private 仅在当前合约可以被使用，不能被继承

- 函数：默认可见性为 public


### 函数修饰器
- 修饰器用于限制函数的行为；类似于 Spring 中的切面功能，作用于一个函数上；

```js
pragma solidity >=0.7.1 <0.9.0;
contract owned {
    constructor() { owner = payable(msg.sender); }
    address payable owner;
    // 自定义一个修饰器
    modifier onlyOwner {
        require(
            msg.sender == owner,
            "Only owner can call this function."
        );
        _; // 修饰器固定格式
    }
}
```
### 函数状态可变性
- view  禁止修改状态
- pure  禁止读取和修改状态
- payable 允许修改状态（允许从消息调用中接收以太币Ether）

### 函数
```js
contract C {
    // 格式
    function 函数名(参数) 函数可见性 状态可变性 函数修饰器... returns (变量类型) {
        函数体
        return 值;
    }
    // 实例
    function double(uint num) public view returns (uint){
        return num*2;
    }
}
```

### 事件Event
- 链下可以对事件进行持续的监听
- 事件主要分为定义事件和触发事件两部分。
```js
contract Coin {
    // 定义一个事件
    event Sent(address from, address to, uint amount);
    
    function send(address receiver, uint amount) public {
        函数体
        emit Sent(msg.sender, receiver, amount); // 触发一个事件
    }
}
```
```js
const Web3 = require('web3')
const fs = require('fs')
const web3 = new Web3(wsURL)
```

### 库
- 库的特征
    - 如果库函数不修改状态，则可以直接调用它们。这意味着纯函数或视图函数只能从库外部调用。
    - 库不能被销毁，因为它被认为是无状态的。
    - 库不能有状态变量。
    - 库不能继承任何其他元素。
    - 库不能被继承。

```js
// 将库的函数附加到指定类型
// 格式：using 库名 for 数据类型  
using Search for uint[]; // 将Search库附加给unit[]类型，之后unit[]类型声明的数据就可以直接使用Search库里的函数

```

### 继承
```js
pragma solidity ^0.5.0;

contract Base {
   uint data;
   constructor(uint _data) public {
      data = _data;   
   }
}
// 继承时直接初始化父合约的构造函数
contract Derived is Base (5) {
   constructor() public {}
}
// 继承时间接初始化父合约的构造函数
contract DerivedA is Base{
    constructor(uint _info) Base(_info * _info) public {}
}

// 抽象合约可以不实现父合约的构造函数
```
### 错误处理
1. assert(bool condition) − 如果不满足条件，此方法调用将导致一个无效的操作码，对状态所做的任何更改将被还原。这个方法是用来处理内部错误的。

2. require(bool condition) − 如果不满足条件，此方法调用将恢复到原始状态。此方法用于检查输入或外部组件的错误。

3. require(bool condition, string memory message) − 如果不满足条件，此方法调用将恢复到原始状态。此方法用于检查输入或外部组件的错误。它提供了一个提供自定义消息的选项。

4. revert() − 此方法将中止执行并将所做的更改还原为执行前状态。

5. revert(string memory reason) − 此方法将中止执行并将所做的更改还原为执行前状态。它提供了一个提供自定义消息的选项

6. try/catch 捕捉错误

### 内联汇编
- 可以在assembly块内直接写solidity的汇编语言
```js
    // 判断账户地址是用户地址还是合约地址，size为0则是用户地址
    uint256 size;
    assembly {
        size := extcodesize(account)
    }
```

## 调用与交易
–

## 高级特性
1. 继承
2. 抽象合约
    ```js
    // SPDX-License-Identifier: GPL-3.0
    pragma solidity >=0.6.0 <0.9.0;
    // 定义一个抽象合约
    abstract contract Feline {
        function utterance() public pure virtual returns (bytes32);
    }
    // 实现抽象合约
    contract Cat is Feline {
        function utterance() public pure override returns (bytes32) { return "miaow"; }
    }
    ```
3. 接口