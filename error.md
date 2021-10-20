- 参考 
    - https://medium.com/linum-labs/error-vm-exception-while-processing-transaction-revert-8cd856633793

1. err="stack underflow"
    1. A number wrapped under and is now at its max value. The minimum value of a uint8 is of course 0, and the max is 255. So if we take a uint8 number that is 0 and we minus 1, it will underflow to the max value. I.e:
    ```js
    uint8 goingToUnderflow = 0;
    goingToUnderflow - 1;
    goingToUnderflow is now equal to 255.
    ```
    2. 可能是编译好的字节码被改动而导致

2. err="execution reverted"
    1. 可能是部署合约时未传入参数导致
    2. 可能是外部调用函数，函数返回数组

3. err="authentication needed: password or unlock"
    1. 可能是账户未解锁导致

4. err="the method personal_unlockAccount does not exist/is not available"
    1. 节点启动时没有开启personal模块访问权限 --http.api eth,web3,personal,net,db

