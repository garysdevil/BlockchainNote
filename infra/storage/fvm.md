---
created_date: 2022-11-26
---

[TOC]

- Filecoin Virtual Machine

## 相关链接

- 官网 https://fvm.filecoin.io/
- 文档 https://github.com/filecoin-project/fvm-docs
- 提案 https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0032.md
- 规格 https://spec.filecoin.io/#section-systems.filecoin_vm
- FVM虚拟机 https://github.com/filecoin-project/ref-fvm
- 主网正式推出FVM前的竞赛 https://spacewarp.fvm.dev/
- 路线图 https://timeline.fvm.dev/
- FVM生态 https://ecosystem.filecoin.io/
- 测试网领水 https://hyperspace.yoga/#faucet
- 测试网区块链游览起 https://explorer.glif.io/?network=hyperspace

## 测试环境

| Name | Type | Reset frequency | Faucet |
| ------------------------------------------------------------ | ----------------------- | ------------------------------------------ | ------------------------------------------------------------ |
| [Mainnet](https://docs.filecoin.io/fvm/reference/networks/#mainnet) | 主网 | Never | None |
| [Builder testnet (buildernet)](https://docs.filecoin.io/fvm/reference/networks/#mainnet) | 测试网 | 只有当发生不可恢复的破坏时 | [`faucet.calibration.fildev.network`](https://faucet.calibration.fildev.network/) |
| [Wallaby testnet](https://docs.filecoin.io/fvm/reference/networks/#wallaby-testnet) | 测试网 | 每周 | [`wallaby.network#faucet`](https://wallaby.network/#faucet) |

- 兼容FVM的区块链游览器

  - https://explorer.filmine.io/
  - https://explorer.glif.io/

- 使用 Wallaby 测试网

  1. 小狐狸添加Filecoin的Wallaby测试网 https://chainlist.org/chain/31415
  2. 小狐狸领取Filecoin的Wallaby测试网测试币 https://wallaby.network/#faucet
  3. 部署EVM智能合约进Wallaby测试网。

- 兼容FVM的测试网络的API服务

  - https://wallaby.node.glif.io/
  - https://docs.zondax.ch/openapi#servers

## FVM

- FVM vs FEVM
  | | FVM | FEVM |
  | -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
  | **Pros** | 最强的执行速度和性能 (每次Actor代码的执行花费更少的gas)。 用任何可以编译成WASM 1的语言编写Actor | 利用当前Solidity和EVM工具快速移植或编写Actor |
  | **Cons** | 相关工具不比EVM工具成熟完善 | 由于FEVM的虚拟化开销，gas费用较高，性能较低。 |
