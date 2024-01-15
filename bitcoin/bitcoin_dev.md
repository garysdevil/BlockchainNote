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