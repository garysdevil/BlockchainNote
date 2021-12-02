## 智能合约语言
- Solidity和java、golang的类比
    - 一个contract看成Java的一个Class类。
    - 一个contract的一个实例看成Java的一个对象。
    - contract也拥有Java类似的封装、继承、多态的特性。
    - contract也拥有golang结构体的数据结构。

- Solidity、Vyper、Yul 、Yul+
## 代码结构
```js
// SPDX-License-Identifier: GPL-3.0 //指定开源协议
pragma solidity >=0.6.0 <0.9.0; //指定编译版本在0.6.0到0.9.0范围内 // ^0.6.0;指定编译版本为0.6.*系列

// 导入模块
import "./ERC20.sol"; // 直接导入
import * as BaseERC20 from "./ERC20.sol"; // 导入此模块并命名为BaseERC20
```

## 全局变量
```js
blockhash(uint) returns (bytes32) // 取最新的256个区块号对应的hash，但不包括当前区块的

msg.sender returns (address) // 消息发送者（当前调用智能合约函数的账户地址） 
msg.value returns (uint) // 这个消息所附带的以太币，单位为wei。

block.coinbase returns (address) // 当前块矿工的地址
block.number returns (uint) // 当前区块的块号
block.difficulty returns (uint) // 当前块的难度
block.timestamp returns (uint) // 当前块的Unix时间戳（从1970/1/1 00:00:00 UTC开始所经过的秒数）
now // block.timestamp的简写模式，以及被定义为deprecated
block.gaslimit returns (uint) // 当前区块的gaslimit

```

## 数据/变量
- 数据的三种存储形式
    - memory 
        - 数据存储在内存里；即分配，即使用，越过作用域即不可被访问；等待被回收。
        - 函数参数，函数返回的参数，默认都是memory存储类型。
        - memory之间是引用传递，并不会拷贝数据。
    - storage 状态变量
        - 数据永远存在于区块链上。
        - 函数外的变量,存储模式一定是storage。
        - 存储由一个个存储槽组成，一个存储槽=32字节。
    - calldata 
        - 数据位置是只读的，不会持久化到区块链。
        - 一般只有外部函数的参数（不包括返回参数）被强制指定为calldata。
    - stack
        - 堆栈是由EVM (Ethereum虚拟机)维护的非持久性数据。EVM使用堆栈数据位置在执行期间加载变量。堆栈位置最多有1024个级别的限制。
        - 局部变量若是整型、定长字节数组等类型，则存储模式一定是stack。

- 数据类型
    - 基本类型
        1. 布尔 bool
        2. 整型 int/uint
        3. 定长浮点型 fixed/unfixed
        4. 地址 address

    - 引用类型
        1. 数组
            - 当数组是被存储在memory时，可以声明为动态数组
        2. 结构体 struct 
        3. 映射 map
        4. 字符串 string
    - 枚举 enum

- 状态变量三种可见性
    - 状态变量可见性程度 public > internal > private
    - 默认为 internal 类型
    1. public  生成一个自动 getter 函数
    3. internal 只能在内部进行访问
    4. private 仅在当前合约可以被访问，不能被继承
    
- 支持隐式转换和显示转换

- 引用类型变量之间的相互赋值
    - 存储位置为 storage，则是值传递
    - 存储位置为 memory，则是引用传递

- 数组，存储位置为 memory时
    - 必须被初始化后才能使用。
    - 不可以使用push进行动态扩容。

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

## 控制符
```js
// 条件运算符
uint result = (5 > 2? 1: 2);  

// while循环
while (表达式) {
   被执行语句(如果表示为真)
}

// do while循环
do {
   被执行语句(如果表示为真)
} while (表达式);

// for循环
for (初始化; 测试条件; 迭代语句) {
   被执行语句(如果表示为真)
}

// continue – 跳出本次循环，继续执行接下来的循环
// break – 跳出循环(或跳出代码块)

// if else
```
## 函数
- 注意
    - 当函数返回结构体时，外部调用无法返回数据。
    - 只可以将以太币一起发送至拥有 payable 修饰符的函数，不然会抛出异常。

```js
contract C {
    // 格式
    function 函数名(参数) 函数可见性 状态可变性 函数修饰器... returns (变量类型,变量类型) {
        函数体
        return 值,值;
    }


    // 实例
    function double(uint num) public pure returns (uint,uint){
        return (num*2,num*3);
    }
    function test() public pure returns (uint8[2] memory){
        uint8[2] memory data = [1,2];
        uint8[] memory data1 = new uint8[](3); data1[0] = 1;
        return data;
    }
    // 合约函数想要接收以太坊，则必须添加 payable 关键字
    function receivePay() payable public{}

    // 获取合约本身的余额
    function getBalance() external view returns (uint){
        return address(this).balance;
    }
}
```
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

### 重载
同一个作用域内，相同函数名可以定义多个函数。这些函数的参数(参数类型或参数数量)必须不一样。仅仅是返回值不一样不被允许。

### 常用函数
- 数学函数
    - addmod(uint x, uint y, uint k) returns (uint) 计算(x + y) % k

- 加密函数
    - keccak256(bytes memory) returns (bytes32) 计算输入的Keccak-256散列。

## 合约
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

### 库Library
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

### 继承/构造函数
```js
pragma solidity ^0.8.0;

contract Base1 {
   uint data;
   constructor(uint _data) public {
      data = _data;   
   }
}
// 继承时直接初始化父合约的构造函数
contract Derived is Base1 (5) {
   constructor() public {}
}
// 继承时间接初始化父合约的构造函数
contract DerivedA is Base1{
    constructor() Base1(5) public {}
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
- 可以在assembly代码块内直接写solidity的汇编语言：
```js
    // 判断账户地址是用户地址还是合约地址，size为0则是用户地址
    uint256 size;
    assembly {
        size := extcodesize(account)
    }
```

### 抽象合约/接口
1. 继承
2. 抽象合约
    ```js
    // SPDX-License-Identifier: GPL-3.0
    pragma solidity >=0.6.0 <0.9.0;
    // 定义一个抽象合约
    // 当函数需要被复写（override）时，则定义函数时必须添加virtual关键字
    abstract contract Feline {
        function utterance() public pure virtual returns (bytes32);
    }
    // 实现抽象合约
    contract Cat is Feline {
        function utterance() public pure override returns (bytes32) { return "miaow"; }
    }
    ```
3. 接口

## 合约间的调用

1. 方式一 call
    - 调用后内置变量 msg 的值会修改为调用者的值。
    - 调用后执行环境为被调用者的运行环境(合约的 storage)。

2. 方式二 delegatecall
    - 调用后内置变量 msg 的值任然是外部账户的值，不会被修改为调用者的值。
    - 调用后执行环境为调用者的运行环境(合约的 storage)。

3. 方式三 callcode  ---- 即将被废弃的函数
    - 调用后内置变量 msg 的值会修改为调用者。
    - 调用后执行环境为调用者的运行环境(合约的 storage)。

- 调用格式
    - 合约地址.call(abi.encodeWithSignature("合约函数名()",参数));
- 返回值（0.6.8版本后）
    - 第一个表示是delegatecall是否调用成功的布尔变量。
    - 第二个表示是被调用函数的返回值。

- fallback() external {} // 合约内定义此函数，则当函数未被找到时，默认执行此函数；否则 err="execution reverted"
- receive() payable external {} // 合约内定义此函数，则当函数未被找到时，也能接收转账，否则 err="execution reverted"



```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0; 
contract Test1 {
    address public temp1; uint256 public temp2;
    // call
    function call_test1(address contractAddr) public {
        (bool success,) = contractAddr.call(abi.encodeWithSignature("test1()")); require(success);
    }
    // delegatecall
    function delegatecall_test1(address contractAddr) public {
        (bool success,) = contractAddr.delegatecall(abi.encodeWithSignature("test1()")); require(success);      
    }
    // call
    function call_test2(address contractAddr) public {
        // 对于test2(uint256)，必须写uint256，不能写uint，否则找不到对应的函数
        (bool success,) = contractAddr.call(abi.encodeWithSignature("test2(uint256)",22)); require(success);
    }

    // 触发fallback函数
    function call_3(address contractAddr) public {
        (bool success,) = contractAddr.delegatecall(abi.encodeWithSignature("noExistFunction()")); require(success);      
    }


    // 转账方式一 转账给 _to
    function moneyByTransfer(address payable _to) public payable{
        // msg.value 对应VALUE 这个输入框
        _to.transfer(msg.value); // transfer 转账失败会throw异常
        // _to.transfer(1 ether);
        // _to.send(msg.value); // send 转账失败不会throw异常
    }
    // 转账方式二 转账给  _to  方式一的手续费大约是方式二的三倍
    function moneyByCall(address payable _to, uint256 amount) external payable{
        (bool success, ) = _to.call{value: amount}("");
        require(success, "Transfer failed.");
    }
} 

contract Test2 {
   address public temp1;
   uint256 public temp2;    
   function test1() public  {
      temp1 = msg.sender;        
      temp2 = 100;    
   }
   function test2(uint age) public  {
      temp1 = msg.sender;        
      temp2 = age;    
   }
   receive() payable external {
      temp1 = msg.sender;        
      temp2 = 300;    
   }
   fallback() external {
      temp1 = msg.sender;        
      temp2 = 200;  
   }
}
```


## 设计模式
1. 提款模式 Withdrawal
2. 限制访问 restricted
3. 合约的升级
    - 使用代理合约
        - 代理合约使用delegatecall操作码将函数调用转发到可更新的目标合约。 由于delegatecall保留了函数调用的状态，因此可以更新目标合约的逻辑，并且状态将保留在代理合约中以供更新后的目标合约的逻辑使用。 与delegatecall一样，msg.sender将保持代理合约的调用者身份。
    - 将逻辑和数据分离成不同的合约