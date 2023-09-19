[TOC]

## 以太坊标准
1. ERC20  Token Standard  https://eips.ethereum.org/EIPS/eip-1155
    - 同质化代币标准
    - token是一个uint256类型的数字
    - Vitalik Buterin于2015年6月提

2. ERC165 
    - 标准接口检测协议；创建一个标准方法以发布和检测智能合约实现了哪些接口

3. ERC223
    - 兼容ERC20，保护投资者以防意外的合约转账

4. ERC721  Non-Fungible Token Standard
    - 非同质化代币标准（Non-Fungible Tokens，简写为NFT），可以作为产权进行交易

5. ERC1155  Multi Token Standard
    - 介于同质化代币与非同质化代币之间可以相互切换的代币标准

6. ERC4626‌
   1. 货币化资金库标准。
   2. ERC-4626 标准的实施，可以有效减少 DeFi 协议之间的摩擦，并增加可组合性 

7. ERC6551  Non-fungible Token Bound Accounts
    1.  

## ERC165
- 兼容 ERC-165的合约应该实现以下接口
    ```js
    interface ERC165 {
        /// @notice 查询一个合约时实现了一个接口
        /// @param interfaceID  参数：接口ID, 参考上面的定义
        /// @return true 如果函数实现了 interfaceID (interfaceID 不为 0xffffffff )返回true, 否则为 false
        function supportsInterface(bytes4 interfaceID) external view returns (bool);
    }
    ```

## ERC20
- 解读ERC20合约的实现 
    - https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol 20210620版本

- 对一些概念进行定义
    - 用户：账户地址
    - 操作员：被授权操作某个账户地址上一定数量Token的账户地址

- 当我们自定义的合约继承ERC20合约时，则需要调用_mint函数来获取自己发行的同质化代币。

### 状态变量
1. mapping(address => uint256) private _balances; 
    - 记录某用户拥有Token的数量
2. mapping(address => mapping(address => uint256)) private _allowances;  
    - 记录某操作员可以操作某用户的Token数量
3. uint256 private _totalSupply; 
    - 记录当前合约Token的总量
4. string private _name;
    - Token的名称
5. string private _symbol;
    - Token名称的简写

### 函数
1. name()
    - 返回Token的名字
2. symbol()
    - 返回Token名字的简称
3. decimals
    - 展示时显示多少位小数
4. totalSupply()
    - 返回Token的总供应量
5. balanceOf
    - 返回用户拥有的Token数量
6. transfer
    - 用户转账给另一个用户
7. allowance
    - 返回被操作员拥有操作指定账户地址的Token数量
8. approve
    - 用户授权操作员可以操作自己的Token数量
9. transferFrom
    - 指定发送方和接收方，进行转账
10. increaseAllowance
    - 用户增加操作员可操作自己Token的数量
11. decreaseAllowance
    - 用户减少操作员可操作自己Token的数量
12. _mint
    - 指定用户获取指定数量的Token
13. _burn
    - 指定用户烧毁掉指定数量的Token


## ERC721
- 对一些角色进行定义
    - 用户：账户地址
    - 操作员：拥有操作指定Token权利的账户地址（一枚Token只能拥有一位操作员）
    - 代理人：拥有操作指定用户所有Token的账户地址（一位用户可以拥有多位代理人）

- 当我们自定义的合约继承ERC721合约时，则需要调用_mint函数来获取自己发行的非同质化代币。

### 状态变量
1. string private _name;
    - 记录Token的名字
2. string private _symbol;
    - 记录Token名字的简称

3. mapping(uint256 => address) private _owners;
    - 记录某个Token归属于哪位用户

4. mapping(address => uint256) private _balances;
    - 记录某个用户拥有Token的数量

5. mapping(uint256 => address) private _tokenApprovals;
    - 记录某个Token被授权给哪位操作员

6. mapping(address => mapping(address => bool)) private _operatorApprovals;
    - 记录某位用户的所有Token授权给了哪位代理人

### 函数
1. balanceOf
    - 返回用户拥有的Token数量
2. ownerOf
    - 判断用户是否持有这枚Token
3. tokenURI
    - 返回这枚Token的内容
4. approve
    - 用户授权某枚Token的操作权利给操作员
5. getApproved
    - 返回Token的操作员
6. setApprovalForAll
    - Token拥有者授权给某个用户使其成为代理人
7. isApprovedForAll
    - 判断一位用户是否是另一位用户的代理人
8. transferFrom
    - 转账
9. safeTransferFrom
    - 转账，并且判断接收方是否是智能合约以及它是否有转出Token的函数。
10. _mint
    - 用户获取一枚Token
11. _burn
    - 用户烧毁一枚Token（用户需要是这枚Token的拥有者）

## ERC1155
- https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1155.md

### 状态变量
1. mapping(uint256 => mapping(address => uint256)) private _balances;
    - 记录一位用户拥有的指定类型Token的数量

2. mapping(address => mapping(address => bool)) private _operatorApprovals;
    - 记录一位用户的所有Token授权给了哪位代理人

3. string private _uri;
    - 记录指定类型的Token的元数据地址

### 函数
#### 公开
1. uri
    - 返回指定类型的Token的元数据，通过id区别不同的类型Token
2. balanceOf
    - 返回用户拥有指定类型的Token的数量
3. balanceOfBatch
    - 返回多个用户拥有所指定类型的Token的数量
4. setApprovalForAll
    - Token拥有者授权给某个用户使其成为代理人
5. isApprovedForAll
    - 判断一位用户是否是另一位用户的代理人
6. safeTransferFrom
    - 将指定用户的指定类型的代币转给指定用户
7. safeBatchTransferFrom
    - 将指定用户的多个指定类型的代币转给指定用户
#### 内部
1. _mint
    - 指定用户获取指定类型指定数量的Token
2. _mintBatch
    - 指定用户获取多个指定类型指定数量的Token
3. _burn
    - 燃烧指定用户指定类型的指定数量的Token
4. _burnBatch
    - 燃烧指定用户多个指定类型的指定数量的Token
5. _setURL
    - 设置指定类型的Token的元数据地址，通过id区别不同的类型Token

## ERC