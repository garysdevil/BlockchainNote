- 相关资料链接 
    - 官方部署文档 https://developer.aleo.org/testnet/getting_started/deploy_execute_demo/
    - 查看链上所有的程序 https://explorer.hamp.app/programs
    - 领水方式 https://twitter.com/AleoFaucet
    - Aleo SDK在线工具 https://aleo.tools/
    - snarkOS源码 https://github.com/AleoHQ/snarkOS
    - leo源码 https://github.com/AleoHQ/leo


## 安装软件
- 安装cargo、snarkos、leo

```bash
# 1. 下载安装Rust工具链管理器（内涵Rust编译工具）
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env
# 查看是否安装成功，未输出找不到此命令则表示安装成功
cargo --version
```

```bash
# 2. 下载安装aleo应用部署工具
git clone https://github.com/AleoHQ/snarkOS.git --depth 1
cd snarkOS
cargo install --path . --locked
# 查看是否安装成功，未输出找不到此命令则表示安装成功
```

```bash
# 3. 下载安装aleo应用编译工具
git clone https://github.com/AleoHQ/leo --depth 1
cd leo
cargo install --path . --locked
# 查看是否安装成功，未输出找不到此命令则表示安装成功
leo
```

## 数据准备
1. 生成钱包
    - 通过 https://aleo.tools/ 网站 Account 栏目的 Generate按钮生成，然后将 Private Key、View Key、Address 记录下来。
    - ![image-20230302161620487](/Users/gary/git/note/BlockchainNote/zkp/aleo/picture/aleo_dapp_deploy_1.png)

2. 领水，在自己的推特账户上发表如下信息，从而获得测试代币。
    ```
    @AleoFaucet

    Please send 10 credits to address 钱包地址
    ```
    ![image-20230302163729707](/Users/gary/git/note/BlockchainNote/zkp/aleo/picture/aleo_dapp_deploy_2.png)


2. 验证是否领水成功
    - 等待5分钟后查看自己是否领水成功，领水成功的话，如下图红框内所示会得到 @AleoFaucet 的一个引用，然后点击红框内的 1 Quote Tweet
    - ![aleo_dapp_deploy_3](/Users/gary/git/note/BlockchainNote/zkp/aleo/picture/aleo_dapp_deploy_3.png)

3. 点击上图红框内内容后，就会跳转到下图，然后点击下图红框内的内容

![aleo_dapp_deploy_4](/Users/gary/git/note/BlockchainNote/zkp/aleo/picture/aleo_dapp_deploy_4.png)

4. 点击上图红框内链接后，会返回一个Json字符串，如下图所示。

![aleo_dapp_deploy_5](/Users/gary/git/note/BlockchainNote/zkp/aleo/picture/aleo_dapp_deploy_5.png)

5. 可以复制上图的 Json内容通到  [json.cn](https://json.cn) 网站进行格式化，或者[安装谷歌插件json-beautifier-editor](https://chrome.google.com/webstore/detail/json-beautifier-editor/lpopeocbeepakdnipejhlpcmifheolpl)  后再打开红框内的链接即可得到如下图所示格式化后的数据。 将下图黄色背景的内容复制下来，在这里我们称呼这个内容为 Record_Ciphertext ，是加密后的数据。

![aleo_dapp_deploy_6](/Users/gary/git/note/BlockchainNote/zkp/aleo/picture/aleo_dapp_deploy_6.png)


6. 游览器上打开 [aleo.tools](https://aleo.tools/)  ，选择 Record 栏目，然后将  Record_Ciphertext 数据复制粘贴到 Record (Ciphertext) 方框内，然后在View Key方框里输入自己的 View Key， 网站就会自动解密得到 Record (Plaintext) 方框内的内容。在这里我们将Record (Plaintext) 方框内的内容称为 Record_Plaintext 。

![aleo_dapp_deploy_7](/Users/gary/git/note/BlockchainNote/zkp/aleo/picture/aleo_dapp_deploy_7.png)



3. -

```bash
Wallet_Address="钱包地址YOUR_WALLET_ADDRESS"
Private_Key="钱包私钥YOUR_PRIVATE_KEY"
APP_Name=helloworld_"${Wallet_Address:4:6}" # 设置应用名称，需要在Aleo网络里全网唯一，不能重名
leo new "${APP_Name}"
cd "${APP_Name}" && leo run && cd -
PATHTOAPP=$(realpath -q $APP_Name)
Record_Plaintext={owner: aleo1xvlh6eyf5lgfv2z5za47j6qkh3uv5e0ga6gdzg5l4rssheymxsqqsnkgc4.private,gates: 10000000u64.private,_nonce: 4168988456374340900819129894396865640591303544882206263706656525906532897983group.public}

snarkos developer deploy "${APP_Name}.aleo" --private-key "${Private_Key}" --query "https://vm.aleo.org/api" --path "./${APP_Name}/build/" --broadcast "https://vm.aleo.org/api/testnet3/transaction/broadcast" --fee 600000 --record "${Record_Plaintext}"
```


4. 查看被部署进网络里的应用
5.  https://explorer.hamp.app/programs