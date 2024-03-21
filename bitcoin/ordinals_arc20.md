
- 链接
    - Atomicals-JS部署及私有节点搭建 https://mirror.xyz/cyberscavenger.eth/rayhn9RT1VMUMo4Iios3g0A6G6AtZ-EXfQ8F_kj8HhQ

## 本地打铭文
### atomicals-js 打铭文
```bash
# https://github.com/atomicals/atomicals-js

# --satsbyte gas。设置的gas，与实际上链的gas是1.8~2倍的关系，比如这里设置30，实际上链gas是54~60sats/vB。
satsbyte=30
# --bitworkc 算力难度。每个FT币 的难度都可能不同
bitworkc=3165

# 生成钱包
yarn cli wallet-init

# 导入私钥和钱包地址
yarn cli wallet-import ${wif} ${alias}

# 铸造FT币指令
yarn cli mint-dft dmint --satsbyte ${satsbyte}
# --funding <string> 指定alias作为gas地址的钱包

# 铸造Realm域名指令
yarn cli mint-realm "btc" --satsbyte ${satsbyte} --satsoutput 1000 --bitworkc ${bitworkc}

# 铸造图片NFT指令
yarn cli mint-nft "E:\Crypto\NFT\CryptoPunks\punk0000.png" --satsbyte ${satsbyte} --satsoutput 1000 --bitworkc ${bitworkc}

# 查询余额命令
yarn run cli balances

```

## 网页在线打铭文
- https://atomicalmarket.com/inscribe?ticker=electron
- https://satsx.io/inscribe/atomicals

## 资料
1. ARC20 代币总览 https://www.coinglass.com/zh/arc20