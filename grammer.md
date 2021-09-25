## 语言对比
- 一个contract看成Java的一个Class类。
- 一个contract的一个实例看成Java的一个对象。
- contract也拥有Java类似的封装、继承的特性。
- contract也拥有golang结构体的数据结构。

## 以太坊标准
- ERC20 
    - 以太坊同质化代币标准
    - Vitalik Buterin于2015年6月提
- ERC165 
    - 标准接口检测协议；创建一个标准方法以发布和检测智能合约实现了哪些接口
- ERC721 
    - 以太坊非同质化代币标准（Non-Fungible Tokens，简写为NFT）
- ERC1155
    - 介于同质化代币与非同质化代币之间可以相互切换的代币标准

- 兼容 ERC-165的合约应该实现以下接口
    ```js
    interface ERC165 {
        /// @notice 查询一个合约时实现了一个接口
        /// @param interfaceID  参数：接口ID, 参考上面的定义
        /// @return true 如果函数实现了 interfaceID (interfaceID 不为 0xffffffff )返回true, 否则为 false
        function supportsInterface(bytes4 interfaceID) external view returns (bool);
    }
    ```
## 全局变量
- msg.sender  消息发送者（当前调用智能合约函数者）

## 数据/变量
- 数据的三种存储类型
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

- 数据的类型
    1. 布尔 bool
    2. 整型
    3. 定长浮点型
    4. 地址
    5. 定长字节数组
    6. 变长字节数组
    7. 枚举 enum

```js
pragma solidity >=0.7.0 <0.9.0;
contract Person {
    // 变量的声明
    // 变量数据类型 变量可见性 变量名称
    uint public varname;

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


## 合约
### 可见性类型
- 内部调用：又被称为“消息调用”。常见的有合约内部函数、父合约的函数以及库函数的调用。
- 外部调用：又被称为“EVM 调用”。一般为跨合约的函数调用。

- 可见性程度 public > external > internal > private 
- 四种可见性类型
    1. public 同时支持内部和外部调用
    2. external 只支持外部调用
    3. internal 只支持内部调用
    4. private 仅在当前合约可以被使用，不能被继承

- 函数：默认可见性类型为 public
- 状态变量：默认可见性类型为 internal ，不能设置为 external 。

### 修饰器
- 修饰器确定了函数状态可变性
    - view  承诺不修改状态
    - pure  保证不读取不修改状态，否则编译通不过
    - payable 允许从消息调用中接收以太币Ether
    - constant 与view相同，一般只修饰状态变量，不允许赋值（除初始化以外）

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
        _;
    }
}
```


### 函数
```js
contract C {
    // 格式
    function 函数名(参数) 函数可见性类型 函数状态可变性类型/函数修饰器名称 returns (变量类型) {
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

## 调用与交易
- 交易(Transaction)具有如下特征：
    1. 需要gas（Ether）
    2. 改变网络的状态
    3. 不会立即执行
    4. 不会暴露返回结果(仅有交易ID)
    
- 调用(Call)具有如下特征：
    1. 免费（不花费gas）
    2. 不改变网络状态
    3. 立即执行
    4. 有返回结果。

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