## Starklings
1. 链接
    1. https://starklings.app
2. Starklings 是交互式学习 Cairo 的工具，由 Shramee 创建 @shrameetweets 。
3. Starklings App 由 Damian创建 @dpinoness 。

## starkli
1. 链接
    1. https://github.com/xJonathanLEI/starkli/releases/
2. 一个命令行工具（CLI），用于与 Starknet 网络交互（如声明、部署、调用合约）。

```sh
curl https://get.starkli.sh | sh
```

## scarb
1. 链接
    1. https://docs.swmansion.com/scarb/download.html
2. 一个 Cairo 和 Starknet 的构建工具链和包管理器，专注于编译和管理项目。

```sh
curl --proto '=https' --tlsv1.2 -sSf https://docs.swmansion.com/scarb/install.sh | sh
```

```sh
# 创建一个项目
scarb new hello_scarb
# 编译
scarb build
# 测试
scarb test
```


## Starknet Foundry
1. 一个开源的开发测试框架和 CLI 工具，专注于合约测试、调试和部署。
   1. Scarb
   2. snforge（测试）
   3. sncast（账户/合约交互）

## scaffold-stark
1. 链接
    1. https://github.com/Scaffold-Stark/scaffold-stark-2
2. 一个开源开发测试框架，用于快速搭建 Starknet dApp，集成多种工具。
   1. 提供预配置项目结构（合约 + 前端）
   2. 集成 Scarb、Starknet Foundry、Next.js、Starknet.js、Starknet-React
   3. 支持快速部署和测试
   4. 提供 UI 组件和钱包集成

### 安装环境 -- 失败
- windows环境安装，依赖
    1. Node.js
    2. Yarn
    3. Rust
    4. Scarb
    5. GMP 库 
        1. https://www.msys2.org/
        2. `pacman -S mingw-w64-x86_64-gmp`
```sh
git clone https://github.com/Quantum3-Labs/scaffold-stark-2 --recurse-submodules
cd scaffold-stark-2
yarn install
```

### 通过 Dev Containers
1. Install Docker Desktop
2. Install Dev Containers
```sh
npx create-stark@latest
cd my-dapp-example
```
```sh
# Start the local development node
yarn chain

# In a new terminal window, deploy your contracts
yarn deploy

# In a new terminal window, start the frontend
yarn start
```