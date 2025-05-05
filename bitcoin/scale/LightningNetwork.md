---
title: 比特币闪电网络
created_date: 2025-05-04
---

# 闪电网络

## 相关链接

- **区块链浏览器**：
  - 主网：[1ml.com](https://1ml.com/)
  - 测试网：[1ml.com/testnet](https://1ml.com/testnet)
- **通道互助**：[lightningnetwork.plus](https://lightningnetwork.plus/)
- **视频教程**：[YouTube](https://www.youtube.com/watch?v=MFwdzZI5HJg)
- **参考资料**：
  - 运行闪电网络节点：[HackMD](https://hackmd.io/@lnbook-cn/r1I1FkC0s?utm_source=preview-mode&utm_medium=rec#Ch05-%E8%BF%90%E8%A1%8C%E4%B8%80%E4%B8%AA%E9%97%AA%E7%94%B5%E7%BD%91%E7%BB%9C%E8%8A%82%E7%82%B9%EF%BC%88%E8%AF%91%E8%80%85%E5%AE%8C%E6%88%90%EF%BC%89)
  - 容错与自动化：[HackMD](https://hackmd.io/@lnbook-cn/r1I1FkC0s?utm_source=preview-mode&utm_medium=rec#%E5%AE%B9%E9%94%99%E4%B8%8E%E8%87%AA%E5%8A%A8%E5%8C%96)
  - 闪电网络 DeFi 研究：[Zhihu](https://zhuanlan.zhihu.com/p/572666181)
  - 闪电网络历史：[BTCStudy](https://www.btcstudy.org/2020/09/03/history-lightning-brainstorm-beta/)
  - 闪电钱包推荐：[Twitter](https://twitter.com/AurtrianAjian/status/1629039315748806657)

## 闪电网络

- 闪电网络（Lightning Network）是比特币的第二层扩展解决方案，旨在实现快速、低成本的交易，同时保持去中心化和安全性。其核心通过链下支付通道处理交易，仅在必要时与比特币主链交互。

- 核心原理

  - **RSMC（Revocable Sequence Maturity Contract）**：序列到期可撤销合约，确保交易可撤销并防止作弊。
  - **HTLC（Hashed Timelock Contract）**：哈希时间锁定合约，用于安全地跨通道路由支付，结合时间锁和哈希锁。

## 闪电网络钱包

闪电网络钱包按用户控制程度分为三类：

1. **标准支付通道（自主保管钱包）**：用户完全控制私钥和资金。
   - **Phoenix 钱包**
   - **Bitcoin Lightning Wallet**
   - **蓝钱包（BlueWallet）**：简单易用，支持链上和闪电网络交易，可直接买卖比特币。
2. **完全托管通道（托管式钱包）**：资金由第三方管理，适合新手。
   - **Zap 钱包**：Android 钱包，界面简洁，支持买卖比特币。
   - **Eclair Wallet**：Android 钱包，时尚界面，支持买卖比特币。
   - **Lightning Wallet**：Android 钱包，简单易用，支持买卖比特币。
   - **Boltzmann 钱包**：Android 新钱包，界面吸引，支持买卖比特币。
   - **其他**：CashPay、Strike、Tippin.me、OneKey（Chrome 扩展）。
3. **零配置通道**：搭配闪电网络服务商（LSP），简化设置。

## 闪电网络协议与实现

- **BOLTs 协议规格**：定义闪电网络标准（[GitHub](https://github.com/lightning/bolts)）。
- **LNURL**：简化用户交互的协议（[GitHub](https://github.com/lnurl/luds)）。
- **BOLT 12**：提供 LNURL 部分功能，无需 Web 服务器。
- **主要客户端实现**：
  1. **LND (Lightning Network Daemon)**
     - 开发：Lightning Labs
     - 语言：Golang
     - 市场占有率：91.17%
     - 链接：[GitHub](https://github.com/lightningnetwork/lnd)
  2. **Core Lightning (CLN)**
     - 开发：Blockstream
     - 语言：C
     - 市场占有率：7.01%
     - 特点：插件系统提供模块化
  3. **Eclair**
     - 开发：ACINQ
     - 语言：Scala
     - 市场占有率：1.82%
  4. **Rust Lightning**
     - 开发：Square Crypto
     - 语言：Rust

## 闪电网络数据备份与恢复

- **BIP-39 助记词**：用于备份链上资金，但无法恢复闪电通道状态。
- **静态通道备份（SCB）**：专门备份闪电通道数据，至关重要。
  - **重要性**：无 SCB，丢失节点数据可能导致通道资金永久损失。
  - **恢复流程**：需与通道对手交互，依赖对手诚实性。存在风险（如对手提供旧交易或欺诈），但 SCB 仍能提高资金恢复概率。
  - **建议**：始终启用 SCB，避免因数据丢失导致资金无法挽回。

# 闪电网络节点部署

## LND

- 部署参考教程
  - Windows https://mirror.xyz/cyberscavenger.eth/5Z-v2tBGT1UYaDChOcVUy8tlcgbamLZb7Uhc-\_p7hZI
  - Ubuntu https://www.jianshu.com/p/da3d215ec57d
- 配置文件 https://github.com/lightningnetwork/lnd/blob/master/sample-lnd.conf

### lnd部署

```bash
wget https://github.com/lightningnetwork/lnd/releases/download/v0.17.3-beta/lnd-linux-amd64-v0.17.3-beta.tar.gz
tar xzvf lnd-linux-amd64-v0.17.3-beta.tar.gz

parentpath=/data2/lnd/

ln -fs ${parentpath}lnd-linux-amd64-v0.17.3-beta/lncli /usr/local/bin/lncli

mkdir /root/.lnd
vi /root/.lnd/lnd.conf

vi /etc/systemd/system/lnd.service
systemctl enable lnd.service
service lnd start

lncli create
lncli unlock

tail -n200 -f lnd_data/logs/bitcoin/mainnet/lnd.log
tail -n200 -f lnd_data/logs/bitcoin/testnet/lnd.log
```

### lnd配置

- 默认路径 /root/.lnd/lnd.conf

```conf
[Application Options]
# 闪电网络的数据存储目录 如果不指定这个的话 默认在 /root/.lnd 路径下
datadir=${parentpath}/lnd_data
# 日志输出目录
logdir=${parentpath}/lnd_data/logs
; adminmacaroonpath=${parentpath}/lnd_data/chain/bitcoin/mainnet/admin.macaroon # 默认目录 /root/.lnd/data/chain/bitcoin/mainnet/admin.macaroon

debuglevel=info
maxpendingchannels=20
# 别名 自己节点对外展示的名字 展示在1ml上
alias=garysdevil
color=#68F442
# rpc监听的地址和端口 默认10009
rpclisten=localhost:10009
# 对外暴露的本机的外网ip 其他人可以通过这个ip地址连接我们的节点
; externalip=xx.xx.xx.xx
# 这两个用于其它地方服务器通过rpc访问节点 方便远程调试
#tlsextraip=xx.xx.xx.xx
#tlsextradomain=xxx.com
[Bitcoin]
bitcoin.active=1
# enable either testnet or mainnet
#bitcoin.testnet=1
# 指定bitcoin主网运行
bitcoin.mainnet=1
bitcoin.node=bitcoind

[Bitcoind]
bitcoind.config=~/.bitcoin/bitcoin.conf
bitcoind.zmqpubrawblock=tcp://127.0.0.1:28332
bitcoind.zmqpubrawtx=tcp://127.0.0.1:28333
bitcoind.rpcuser=username
bitcoind.rpcpass=password

# 自动化channel管理，会根据一些启发式规则自动开启通道。
[autopilot]
autopilot.active=1
autopilot.maxchannels=5
autopilot.allocation=0.1 # 支付通道中的资金，所占钱包所有资金的比重小于 10%
; autopilot.minchansize=20000 # 通道的最小容量（聪）
; autopilot.maxchansize=16777215

#  “瞭望塔（Watchtowers）” 是一种机制，将监控和惩罚违反协议的行为外包出去。
# LND 软件既包含了瞭望塔服务端，也包含了瞭望塔客户端。通过在配置文件中写入下列信息来激活瞭望塔服务端：
[watchtower]
watchtower.active=1
watchtower.towerdir=${parentpath}/lnd_data/watchtower_data
# 通过在配置文件中写入下列信息来激活瞭望塔客户端：
[wtclient]
; Activate Watchtower Client. To get more information or configure watchtowers
; run `lncli wtclient -h`.
wtclient.active=1

```

### lnd服务化

```conf
[Unit]
Description=LND Lightning Daemon
After=network.target

[Service]
User=root
Group=root
Type=simple
PIDFile=/root/.lnd/lnd.pid
ExecStart=${parentpath}lnd-linux-amd64-v0.17.3-beta/lnd --configfile=~/.lnd/lnd.conf
ExecStop=lncli stop
restart=on-failure
KillMode=process
TimeoutSec=180
RestartSec=60

[Install]
WantedBy=multi-user.target
```

### lncli客户端

```bash
# --macaroonpath /data2/lnd/lnd_data/chain/bitcoin/mainnet/admin.macaroon
# --macaroonpath /opt/lnd/lnd_data/chain/bitcoin/testnet/admin.macaroon
# -network testnet

lncli create
lncli unlock
lncli getinfo # 获取lnd节点的基本信息
lncli newaddress np2wkh # 创建一个np2wkh类型的钱包地址
lncli walletbalance # 查看钱包余额
lncli channelbalance # 查看通道余额
lncli listunspent # 查看未使用的UTXO
lncli listchaintxns # 列出钱包中的链上交易

# 链上发送比特币
lncli sendcoins --addr 接收地址 --amt 数量聪 --sat_per_vbyte GAS单价聪

# 连接一个通道，在 https://1ml.com/ 网站上寻找通道
channel=02ad3421e1c283be5cc76e66c2785cb802196d6654dc6bdaff63b1ae0de9367edc  #OneKey Testnet
ipport=13.212.162.150:9735
lncli connect ${channel}@${ipport}

lncli listpeers
lncli listchannels

# 打开一个容量为 20000 sats 的 channel，钱包里面需要有足够的余额
lncli openchannel ${channel} 20000



lncli closechannel ${channel}
lncli closedchannels
```

```bash
# 生成一张 1000 sat 的 invoice
lncli addinvoice --amt 1000
# 查看生成的invoice
lncli listinvoices

# 解析一张 invoice ，查看需要付款的金额
lncli decodepayreq ${invoice.payment_request}

# 向 invoice 付款
lncli payinvoice $invoice

lncli listpayments
```

## Bitcoin全节点

- 配置文件
  - 配置文件 https://github.com/bitcoin/bitcoin/blob/master/doc/bitcoin-conf.md
  - 自动配置网站 https://jlopp.github.io/bitcoin-core-config-generator/
- 区块链游览器
  - https://blockstream.info/testnet/
  - https://blockchair.com/bitcoin/testnet 可以查看手续费

### bitcoind部署

```bash
# 安装 bitcoind
# https://bitcoincore.org/bin/bitcoin-core-26.0/
wget https://bitcoincore.org/bin/bitcoin-core-26.0/bitcoin-26.0-x86_64-linux-gnu.tar.gz
tar xzvf bitcoin-26.0-x86_64-linux-gnu.tar.gz

parentpath=/data2/lnd/
ln -fs ${parentpath}bitcoin-26.0/bin/bitcoin-cli /usr/local/bin/bitcoin-cli
ln -sf ${parentpath}bitcoin-26.0/bin/bitcoind /usr/local/bin/bitcoind

# 创建比特币的数据存储目录
mkdir ${parentpath}bitcoin_data/
# 比特币配置存储目录
mkdir ~/.bitcoin
# 比特币配置文件
vi ~/.bitcoin/bitcoin.conf

# 比特币服务化
vi /etc/systemd/system/bitcoind.service
systemctl enable bitcoind.service
service bitcoind start

tail -n200 -f ~/.bitcoin/debug.log
tail -n200 -f ~/.bitcoin/testnet3/debug.log
```

### bitcoind默认配置

```conf
# 默认配置

# 默认启动主网节点
; # [chain]
; # Test Network.
; chain=test
; # Run this node on the Bitcoin Test Network. Equivalent to -chain=test
; testnet=1

# Reduce storage requirements by only storing most recent N MiB of block. This mode is incompatible with -txindex and -coinstatsindex. WARNING: Reverting this setting requires re-downloading the entire blockchain. (default: 0 = disable pruning blocks, 1 = allow manual pruning via RPC, greater than 550 = automatically prune blocks to stay under target size in MiB).
prune=0

# [debug]
# Location of the debug log
debuglogfile=~/.bitcoin/debug.log # 测试网 ~/.bitcoin/testnet3/debug.log

# Options only for mainnet
[main]
# Options only for testnet
[test]
# Options only for regtest
[regtest]
```

### bitcoind配置

```conf
# [core]
# Specify a non-default location to store blockchain data.
blocksdir=${parentpath}/bitcoin_data/
# Run in the background as a daemon and accept commands.
daemon=1
# Set database cache size in megabytes; machines sync faster with a larger cache. Recommend setting as high as possible based upon machine's available RAM.
dbcache=10240

# [rpc]
# Enable Accounts RPC,Enable Add Witness Address RPC,Enable Sign Raw Transaction RPC,Enable Validate Address RPC
deprecatedrpc=accounts
deprecatedrpc=addwitnessaddress
deprecatedrpc=signrawtransaction
deprecatedrpc=validateaddress

# Accept command line and JSON-RPC commands.
server=1
# Accept public REST requests.
rest=1
# Username and hashed password for JSON-RPC connections. The field <userpw> comes in the format: <USERNAME>:<SALT>$<HASH>. RPC clients connect using rpcuser=<USERNAME>/rpcpassword=<PASSWORD> arguments. You can generate this value at https://jlopp.github.io/bitcoin-core-rpc-auth-generator/. This option can be specified multiple times.
rpcauth=$username:$auth

# 闪电网络需要下面两行配置的支持
# [zeromq]
# Enable publishing of raw block hex to <address>.
zmqpubrawblock=tcp://127.0.0.1:28332
# Enable publishing of raw transaction hex to <address>.
zmqpubrawtx=tcp://127.0.0.1:28333
```

### bitcoind服务化

```conf
[Unit]
Description=Bitcoin deamon service
After=network.target
 
[Service]
User=root
Group=root
Type=forking
PIDFile=/root/.bitcoin/bitcoind.pid
ExecStart=bitcoind -daemon -conf=/root/.bitcoin/bitcoin.conf -pid=/root/.bitcoin/bitcoind.pid
ExecStop=bitcoin-cli -conf=/root/.bitcoin/bitcoin.conf stop
Restart=on-failure
KillMode=process
Restart=always
TimeoutSec=120
RestartSec=30
 
[Install]
WantedBy=multi-user.target
```

### bitcoin-cli客户端

```bash
bitcoin-cli getblockchaininfo
```
