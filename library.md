- 参考 https://github.com/OpenZeppelin/openzeppelin-contracts


## 
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

