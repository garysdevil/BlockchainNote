---
created_date: 2022-03-21
---

[TOC]

## 常用的自定义库
1. 限制只有合约拥有者拥有访问权限。
```js
pragma solidity ^0.8.0;
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

contract OwnableContract is Ownable {
  function restrictedFunction() public view onlyOwner returns (uint) {
    return 99;
  }
}
```

2. 获取当前合约的余额
```js
pragma solidity ^0.8.0;
contract test{
  function getBalance() public view returns(uint){
      return address(this).balance;
  }
}
```

3. 字符串操作
  - https://github.com/ethereum/dapp-bin/blob/master/library/stringUtils.sol

4. 随机数
  - https://github.com/randao/randao