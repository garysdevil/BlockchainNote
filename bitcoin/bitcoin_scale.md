# 比特币网络扩容方案

## RGB 协议
- 内容： RGB 是一个建立在比特币网络上的二层协议，其核心交易数据储存在 BTC 主网上。RGB 利用比特币的安全模型，支持在比特币网络上创建具有定制属性和智能合约功能的代币。
- 时间线
    - 2016 年，RGB 协议最初由 Peter Todd 提出。
    - 2023 年，在比特币上智能合约生态的开发热潮中，RGB 协议再次得到关注。

## OP_CAT
- OP_CAT是一种操作码，由匿名创建者中本聪在比特币存在的早期引入。
- 比特币脚本语言中的操作码允许基本的数据操作和交易管理，可以被认为是比特币极其基本的编程语言的构建块。

## 增大区块
- 内容： 2017 年 8 月，比特币实施隔离见证（SegWit）升级。
- 优点： 通过交易信息与签名信息的分离，将有效区块大小从 1M 提升到了 4M，一定程度缓解了拥堵问题。
- 缺点： 由于比特币区块本身大小的限制，无法对一个区块的存储信息无限扩容，因而通过对区块存储信息扩容提高效率的方式便到此为止。

## 闪电网络
- 内容： 闪电网络是基于比特币的二层扩容方案，允许在不访问区块链的情况进行下交易。
- 优点： 极大提高了吞吐量。
- 缺点： 较大的中心化风险。
- 现有的闪电网络解决方案有 OmniBOLT，Stacks 等。

## 侧链技术
- 内容： 侧链技术是在比特币网络之外搭建一条侧链，侧链上的资产按 1:1 与 BTC 锚定。
- 优点： 提高了吞吐量。
- 缺点： 永远无法达到 BTC 主网的安全性。

# 闪电网络
- bolts协议规格  https://github.com/lightning/bolts
- LNURL  https://github.com/lnurl/luds
- BOLT 12  无需 web 服务器就可以实现 LNURL 提供的部分核心功能。
- 闪电网络区块链浏览器 
    - https://1ml.com/
    - https://1ml.com/testnet
- 闪电网络通道互助 https://lightningnetwork.plus/
- 视频教程 https://www.youtube.com/watch?v=MFwdzZI5HJg
- 参考 
    - https://hackmd.io/@lnbook-cn/r1I1FkC0s?utm_source=preview-mode&utm_medium=rec#Ch05-%E8%BF%90%E8%A1%8C%E4%B8%80%E4%B8%AA%E9%97%AA%E7%94%B5%E7%BD%91%E7%BB%9C%E8%8A%82%E7%82%B9%EF%BC%88%E8%AF%91%E8%80%85%E5%AE%8C%E6%88%90%EF%BC%89
    - https://hackmd.io/@lnbook-cn/r1I1FkC0s?utm_source=preview-mode&utm_medium=rec#%E5%AE%B9%E9%94%99%E4%B8%8E%E8%87%AA%E5%8A%A8%E5%8C%96
    - 比特币闪电网络上的DeFi研究 https://zhuanlan.zhihu.com/p/572666181
    - https://www.btcstudy.org/2020/09/03/history-lightning-brainstorm-beta/
    - 闪电钱包 https://twitter.com/AurtrianAjian/status/1629039315748806657


- 核心原理
    - RSMC（Revocable Sequence Maturity Contract），序列到期可撤销合约；
    - HTLC（Hashed Timelock Contract），哈希时间锁定合约。


- bolts协议规格的三种实现客户端
    1. Lightning Network Daemon (LND)  
        - 官方 Lightning Labs
        - 语言 Golang
        - https://github.com/lightningnetwork/lnd
        - 市场占有率 91.17%
    2. Core Lightning (CLN)
        - 官方 Blockstream
        - 语言 C
        - 市场占有率 7.01%
        - 利用插件系统提供了更强的模块化
    3. Eclair
        - 官方 ACINQ
        - 语言 Scala
        - 市场占有率 1.82%
    4. Rust Lightning
        - 官方 Square Crypto
        - 语言 Rust

## 闪电网络钱包
- 从用户的角度看，闪电网络的通道（闪电钱包）可以分成三种类型：
    1. 标准支付通道（自主保管钱包）
    2. 完全托管通道（托管式闪电钱包）
    3. 零配置通道（一般搭配有闪电网络服务商）

- 完全托管通道
    1. Zap 钱包是适用于 Android 的较新的闪电兼容比特币钱包之一。 它有一个简单的界面，易于使用。 Zap 还允许您直接从应用程序买卖比特币。
    2. 闪电钱包（Eclair Wallet）是另一种流行的 Android 闪电兼容比特币钱包。 它具有时尚的界面并且易于使用。 Eclair 还允许您直接从应用程序买卖比特币。
    3. 闪电钱包（ightning Wallet）是一款流行的 Android 闪电兼容比特币钱包。 它有一个简单的界面，易于使用。 Lightning Wallet 还允许您直接从应用程序买卖比特币。
    4. 玻尔兹曼钱包（Boltzmann）钱包是一个新的 Android 比特币钱包。 它有一个有吸引力的界面并且易于使用。 Boltzmann 还允许您直接从应用程序买卖比特币。
    5. CashPay
    6. Strike
    7. Tippin.me
    8. OneKey chrome-extension://jnmbobjmhlngoefaiojfljckilhhlhcj/

- 自主保管钱包
    - Phoenix 钱包
    - Bitcoin Lightning Wallet
    - 蓝钱包（BlueWallet）是一款流行的比特币钱包，也支持闪电网络。 它有一个简单的界面，易于使用。 BlueWallet 还允许您直接从应用程序买卖比特币。


## 注意
- 闪电钱包也使用 BIP-39 助记词备份，但仅对链上资金有用。但是，因为通道的构造方式，助记词 不足以 复原出一个闪电节点。必须要有额外的备份方法，叫做 “静态通道备份（SCB）”。没有 SCB ，如果一个闪电节点的运营者弄丢了 TA 的闪电节点数据，TA 可能丢失 所有 放在通道中的资金。

- 为了从一份 SCB 中恢复，你需要跟你的通道对手交互，祈祷他们不会尝试欺诈你，不论是给你一份旧的承诺交易，还是愚弄你的节点、让它广播已经过时的交易从而没收你的余额。虽然 SCB 有这些缺点，它也是有用的，你还是应该这么做。如果你不形成备份，又弄丢了你的节点数据，你会永远损失通道中的资金。无可挽回！但是，如果你 真的 做了 SCB，再弄丢你的节点数据时，你有不小的机率会遇上诚实的对等节点，然后从中恢复一些通道资金。


## LND
- 部署参考教程 
    - Windows https://mirror.xyz/cyberscavenger.eth/5Z-v2tBGT1UYaDChOcVUy8tlcgbamLZb7Uhc-_p7hZI
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
    - 配置文件  https://github.com/bitcoin/bitcoin/blob/master/doc/bitcoin-conf.md
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