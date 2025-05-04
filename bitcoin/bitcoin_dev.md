---
title: 区块链开发者
created_date: 2022-03-20
---

[TOC]

## 模拟工具
- 区块链模拟工具
```bash
nvm use v8.17.0
npm install blockchain-cli
blockchain help
```

## 测试网
- 比特币测试网钱包生成器 https://www.bitaddress.org/
    - bitcoin address是1开头的，是比特币主网地址
    - 我的测试地址 1MbMM5hNuK6x2BrHKxtMUcoymbRZLQwHR6
    - 我的测试私钥 KyTqqttrE28FPunLS3Cg5E8pFf6WNJirRCdCr9GUYQNFs1LTm3Xr

- 比特币测试网水龙头 
    - https://kuttler.eu/en/bitcoin/btc/faucet/
    - https://coinfaucet.eu/en/btc-testnet/
    - https://testnet-faucet.mempool.co/


- 比特币测试网游览器 
    - https://blockchair.com/zh/bitcoin/testnet
    - https://live.blockcypher.com/btc-testnet/
    - https://bitpay.com/insight/#/BTC/testnet/home


- 比特币谷歌插件钱包（支持测试网）
    - https://chrome.google.com/webstore/detail/pay-with-bitpay/jkjgekcefbkpogohigkgooodolhdgcda/related


## bitcoin
### windows 编译环境

```powershell
# 安装Windows 子系统 wls （Windows Subsystem for Linux）参考 https://learn.microsoft.com/en-us/windows/wsl/basic-commands#install
# wsl --list --onlin
# wsl --list 
# wsl --status
# 安装子系统 # 默认安装Ubuntu子系统
wsl --install
# -d 指定使用的子系统  -u 指定用户
wsl -d Ubuntu -u garysdevil
```
### 编译
```bash
## 配置
```bash
./autogen.sh
# No Wallet or GUI
./configure --without-wallet --with-gui=no

# 编译
make        # use "-j N" here for N parallel jobs
# 运行测试程序
make check  # Run tests if Python 3 is available
```

```bash
# 编译到指定目录
make install DESTDIR=/mnt/c/workspace/bitcoin
make deploy
```

### bitcoin 编译报错
```bash
# Windows 环境编译报错 We could not detect the boost libraries (version 1.73.0 or higher)
# 可能是因为在Windows Subsystem for Linux (WSL)中未安装或未正确配置Boost库的版本
# 解决办法
# 安装Boost
sudo apt install libboost-all-dev
# 查看已安装的Boost版本
dpkg -l | grep libboost
```

## bitcoin-cli 环境
### Linux
```bash
mkdir -p ~/.bitcoin
cd ~/.bitcoin
echo "rpcconnect=${IP}" >> bitcoin.conf
echo "rpcuser=${username}" >> bitcoin.conf
echo "rpcpassword=${password}" >> bitcoin.conf
```

### Mac
```bash
# bitcoin/src/bitcoin-cli
mv bitcoin-cli /usr/local/bin/
mkdir -p "~/Library/Application Support/Bitcoin"
cd "~/Library/Application Support/Bitcoin"
echo "rpcconnect=${IP}" >> bitcoin.conf
echo "rpcuser=${username}" >> bitcoin.conf
echo "rpcpassword=${password}" >> bitcoin.conf
```


## bitcoin-cli 指令
### 基本指令
```bash
# 生成一个钱包
bitcoin-cli createwallet $wallet_name

# 列出所有的钱包
bitcoin-cli listwallets

# 生成一个新的地址
bitcoin-cli -rpcwallet=$wallet_name getnewaddress


# 获取区块的哈希
bitcoin-cli getblockhash ${block_height}

# 获取区块的详细信息
bitcoin-cli getblock ${block_hash}

# 获取原始交易数据（十六进制格式） # true 获取详细的交易信息（JSON 格式）
bitcoin-cli getrawtransaction ${tx} true

# 验证一条签名信息是否来自于指定的签名地址
bitcoin-cli verifymessage $address $signature $message

# 使用4个公钥创建一个 1-of-4 P2SH多签地址
required_signatures=1 # 设置所需的签名数量
bitcoin-cli createmultisig $required_signatures  '[ "'$pubkey1'", "'$pubkey2'", "'$pubkey3'", "'$pubkey4'" ]'

# 通过扩展公钥（Extended Public Key），获取钱包中的特定输出脚本描述符信息 descriptor
bitcoin-cli getdescriptorinfo "wpkh(xpub6DJ2dNUysrn5Vt36jH2KLBT2i1auw1tTSSomg8PhqNiUtx8QX2SvC9nrHu81fT41fvDUnhMjEzQgXnQjKEu3oaqMSzhSrHMxyyoEAmUHQbY)"

# 通过扩展公钥（Extended Public Key）生成3个派生地址
# [d34db33f/84h/0h/0h]: 这是表示派生地址路径的一部分，指定了从根地址到目标地址的路径。d34db33f可能是一个硬件钱包或其他系统的标识符，84h表示目标地址的路径中使用的币种是Bitcoin（BTC），0h/0h表示BIP32路径的深度。
bitcoin-cli deriveaddresses "wpkh([d34db33f/84h/0h/0h]xpub6DJ2dNUysrn5Vt36jH2KLBT2i1auw1tTSSomg8PhqNiUtx8QX2SvC9nrHu81fT41fvDUnhMjEzQgXnQjKEu3oaqMSzhSrHMxyyoEAmUHQbY/0/*)#cjjspncu" "[0,2]"


```

### 用例
```bash
# 签名与验证签名

# Unlock the wallet for 30 seconds
bitcoin-cli walletpassphrase "mypassphrase" 30
# Create the signature
bitcoin-cli signmessage "1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX" "my message"
# Verify the signature
bitcoin-cli verifymessage "1D1ZrZNe3JUo7ZycKEYQQiQAWd9y54F4XX" "signature" "my message"
```


```bash
# 指定区块，输出未被开销的UTXO所在的钱包地址

block_height=123321
block_hash=$(bitcoin-cli getblockhash $block_height)
block=$(bitcoin-cli getblock $block_hash)
txids=$(echo "${block}" | jq -r '.tx[]')

for txid in $(echo $block | jq -r ".tx[]"); do
    tx_details=$(bitcoin-cli getrawtransaction $txid true)
    vout_len=$(echo $tx_details | jq ".vout | length")
    for ((index=0; index<$vout_len; index++)); do
        utxo=$(bitcoin-cli gettxout $txid $index)
        if [ "$utxo" != "" ]; then
            echo $tx_details | jq ".vout[$index].scriptPubKey.address"
            exit
        fi
    done
done
```

```bash
# Which tx in block 257,343 spends the coinbase output of block 256,128?

# get the coinbase output txid of block 256,128
block_256128hash=$(bitcoin-cli getblockhash 256128)
block_256128=$(bitcoin-cli getblock $block_256128hash)
coinbase_txid=$(echo "${block_256128}" | jq -r ".tx[0]")

# get the details of block 257,343 
block_257343hash=$(bitcoin-cli getblockhash 257343)
block_257343=$(bitcoin-cli getblock $block_257343hash)


for txid in $(echo $block_257343 | jq -r ".tx[]"); do
    tx_details=$(bitcoin-cli getrawtransaction "${txid}" true)
    for vin_txid in $(echo $tx_details | jq -r ".vin[] | .txid"); do
        if [ $vin_txid == $coinbase_txid ]; then
            echo "Transaction $txid in block 257,343 spends the Coinbase output of block 256,128."
            exit
        fi
    done
done
```

## 术语
- 描述符（descriptors）
    - 是一种用于描述如何从密钥派生地址的格式。
    - 基本形式 `wpkh(<xpub>/0/*)`
    - wpkh 是一个函数，表示要生成一个支付到公钥哈希的隔离见证类型（witness public key hash，简称wpkh）的地址。
        - sh（表示统的支付到公钥哈希（P2PKH）地址）
        - wsh（表示隔离见证脚本哈希地址）
        - multi（表示多签名地址）
    - /0/*: 这部分指定了要派生的子地址的索引，/0表示索引为0，/*表示可以生成更多的子地址。