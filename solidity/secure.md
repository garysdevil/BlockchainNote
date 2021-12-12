# 安全
- 参考
    - https://ethereum.org/zh/developers/docs/security/
    - 最佳安全开发指南 https://github.com/ConsenSys/smart-contract-best-practices
    - 以太坊官方博客，带有Security标签的博客 https://blog.ethereum.org/category/security/
## 常见的 Solidity 的漏洞类型
- Reentrancy - 重入
- Access Control - 访问控制
- Arithmetic Issues - 算术问题（整数上下溢出）
- Unchecked Return Values For Low Level Calls - 未严格判断不安全函数调用返回值
- Denial of Service - 拒绝服务
- Bad Randomness - 可预测的随机处理
- Front Running
- Time manipulation
- Short Address Attack - 短地址攻击
- Unknown Unknowns - 其他未知

### 可重入攻击
- 重入漏洞存在于合约之间的交互过程
可重入攻击也就是攻击方发送一笔交易，导致合约一致重复执行直到将合约账户的资源消耗完。这有点类似于C语言的递归函数。攻击方能成功进行可重入攻击，主要依赖于Soildity为智能合约提供的fallback和call函数

## 审计
- slither
    - 用 Python 3 编写的 Solidity 静态分析框架
    - https://github.com/crytic/slither

## 反编译
- 参考
    - https://github.com/comaeio/porosity
    - https://www.pnfsoftware.com/blog/ethereum-smart-contract-decompiler/