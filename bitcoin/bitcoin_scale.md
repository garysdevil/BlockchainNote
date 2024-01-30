# 比特币网络扩容方案

## RGB 协议
- 内容： RGB 是一个建立在比特币网络上的二层协议，其核心交易数据储存在 BTC 主网上。RGB 利用比特币的安全模型，支持在比特币网络上创建具有定制属性和智能合约功能的代币。
- 时间线
    - 2016 年，RGB 协议最初由 Peter Todd 提出。
    - 2023 年，在比特币上智能合约生态的开发热潮中，RGB 协议再次得到关注。

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

- bolts协议规格的三种实现客户端
    - Lightning Network Daemon (LND)  
        - 官方 Lightning Labs
        - 语言 C
        - https://github.com/lightningnetwork/lnd
        - 市场占用率 91.17%
    - Core Lightning (CLN)
        - 官方 Blockstream
        - 语言 Golang
        - 市场占用率 7.01%
        - 利用插件系统提供了更强的模块化
    - Eclair
        - 官方 ACINQ
        - 语言 Scala
        - 市场占用率 1.82%

## LND
- 部署参考教程 
    - https://www.itwordsweb.com/archives/LND
    - Windows https://mirror.xyz/cyberscavenger.eth/5Z-v2tBGT1UYaDChOcVUy8tlcgbamLZb7Uhc-_p7hZI
    - Ubuntu https://www.jianshu.com/p/da3d215ec57d

### 部署
```bash
wget https://github.com/lightningnetwork/lnd/releases/download/v0.17.3-beta/lnd-linux-amd64-v0.17.3-beta.tar.gz
tar xzvf lnd-linux-amd64-v0.17.3-beta.tar.gz

ln -fs /data2/lnd/lnd-linux-amd64-v0.17.3-beta/lncli /usr/local/bin/lncli

mkdir /root/.lnd
vi /root/.lnd/lnd.conf

vi /etc/systemd/system/lnd.service
systemctl enable lnd.service
service lnd start

tail -n200 -f lnd_data/logs/bitcoin/mainnet/lnd.log
```

```bash
lncli create
lncli unlock

lncli --macaroonpath /data2/lnd/lnd_data/chain/bitcoin/mainnet/admin.macaroon getinfo 
```

### 配置
```conf
# https://github.com/lightningnetwork/lnd/blob/master/sample-lnd.conf
# LND Mainnet: lnd configuration
# /root/.lnd/lnd.conf

[Application Options]
# 闪电网络的数据存储目录 如果不指定这个的话 默认在 /root/.lnd 路径下
datadir=/data2/lnd/lnd_data
# 日志输出目录
logdir=/data2/lnd/lnd_data/logs
; adminmacaroonpath=/data2/lnd/lnd_data/chain/bitcoin/mainnet/admin.macaroon # 默认目录 /root/.lnd/data/chain/bitcoin/mainnet/admin.macaroon

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

#自动驾驶模式 开启之后可以自动连接节点 打开channel
[autopilot]
autopilot.active=1
autopilot.maxchannels=5
autopilot.allocation=0.1
```

### 服务化
```conf
[Unit]
Description=LND Lightning Daemon
After=network.target

[Service]
User=root
Group=root
Type=simple
PIDFile=/root/.lnd/lnd.pid
ExecStart=/data2/lnd/lnd-linux-amd64-v0.17.3-beta/lnd --configfile=~/.lnd/lnd.conf 
restart=on-failure
KillMode=process
TimeoutSec=180
RestartSec=60

[Install]
WantedBy=multi-user.target
```

## Bitcoin全节点
### bitcoind部署
```bash
# 安装 bitcoind
# https://bitcoincore.org/bin/bitcoin-core-26.0/
wget https://bitcoincore.org/bin/bitcoin-core-26.0/bitcoin-26.0-x86_64-linux-gnu.tar.gz
tar xzvf bitcoin-26.0-x86_64-linux-gnu.tar.gz
ln -fs /data2/lnd/bitcoin-26.0/bin/bitcoin-cli /usr/local/bin/bitcoin-cli
ln -sf /data2/lnd/bitcoin-26.0/bin/bitcoind /usr/local/bin/bitcoind

# 创建比特币的数据存储目录
mkdir /data2/lnd/bitcoin_datadir/
# 比特币配置存储目录
mkdir ~/.bitcoin
# 比特币配置文件
vi ~/.bitcoin/bitcoin.conf

# 配置比特币服务
vi /etc/systemd/system/bitcoind.service
systemctl enable bitcoind.service
service bitcoind start

tail -n200 -f ~/.bitcoin/debug.log
```

### bitcoind默认配置
```conf
# 默认配置

# Reduce storage requirements by only storing most recent N MiB of block. This mode is incompatible with -txindex and -coinstatsindex. WARNING: Reverting this setting requires re-downloading the entire blockchain. (default: 0 = disable pruning blocks, 1 = allow manual pruning via RPC, greater than 550 = automatically prune blocks to stay under target size in MiB).
prune=0

# [debug]
# Location of the debug log
debuglogfile=~/.bitcoin/debug.log
```

### bitcoind配置
```conf
# https://github.com/bitcoin/bitcoin/blob/master/doc/bitcoin-conf.md
# Generated by https://jlopp.github.io/bitcoin-core-config-generator/

# [core]
# Specify a non-default location to store blockchain data.
blocksdir=/data2/lnd/bitcoin_datadir/
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
rpcauth=username:auth

# 闪电网络需要下面两行配置的支持
# [zeromq]
# Enable publishing of transaction hashes to <address>.
zmqpubhashtx=tcp://127.0.0.1:28333
# Enable publishing of raw block hex to <address>.
zmqpubrawblock=tcp://127.0.0.1:28332

# Options only for mainnet
[main]
# Options only for testnet
[test]
# Options only for regtest
[regtest]
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
ExecReload=kill -SIGHUP $MAINPID
ExecStop=bitcoin-cli -conf=/root/.bitcoin/bitcoin.conf stop
Restart=on-failure
KillMode=process
Restart=always
TimeoutSec=120
RestartSec=30
 
[Install]
WantedBy=multi-user.target
```

### bitcoin-cli
```bash
bitcoin-cli getblockchaininfo
```