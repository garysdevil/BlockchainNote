## bitcoin
### windows 编译环境

```powershell
# 安装 wls （Windows Subsystem for Linux）参考 https://learn.microsoft.com/en-us/windows/wsl/basic-commands#install
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
echo "rpcconnect=${IP}" >> ~/.bitcoin/bitcoin.conf
echo "rpcuser=${username}" >> ~/.bitcoin/bitcoin.conf
echo "rpcpassword=${password}" >> ~/.bitcoin/bitcoin.conf
```

## bitcoin-cli 指令

```bash
# 生成一个钱包
bitcoin-cli createwallet $wallet_name

# 获取区块的哈希
bitcoin-cli getblockhash ${block_height}

# 获取区块的详细信息
bitcoin-cli getblock ${block_hash}

# 获取原始交易数据（十六进制格式） 
# true 获取详细的交易信息（JSON 格式）
bitcoin-cli getrawtransaction ${tx} true

# 验证一条签名信息是否来自于指定的签名地址
bitcoin-cli verifymessage $address $signature $message

# 获取有关钱包中的特定输出脚本描述符的信息
bitcoin-cli getdescriptorinfo "wpkh(xpub6DJ2dNUysrn5Vt36jH2KLBT2i1auw1tTSSomg8PhqNiUtx8QX2SvC9nrHu81fT41fvDUnhMjEzQgXnQjKEu3oaqMSzhSrHMxyyoEAmUHQbY)"

bitcoin-cli deriveaddresses "wpkh([d34db33f/84h/0h/0h]xpub6DJ2dNUysrn5Vt36jH2KLBT2i1auw1tTSSomg8PhqNiUtx8QX2SvC9nrHu81fT41fvDUnhMjEzQgXnQjKEu3oaqMSzhSrHMxyyoEAmUHQbY/0/*)#cjjspncu" "[0,2]"
```

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
# 使用4个公钥创建一个1-of-4 P2SH多签地址

required_signatures=1 # 设置所需的签名数量
bitcoin-cli createmultisig $required_signatures  '[ "'$pubkey1'", "'$pubkey2'", "'$pubkey3'", "'$pubkey4'" ]'
```