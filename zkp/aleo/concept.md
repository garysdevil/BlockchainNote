## Accounts
1. 账户由三个元素组成
    1. Account Private Key 私钥
    2. Account View Key 可视密钥
    3. Account Address 地址

2. Account Proving Key 账户证明密钥
    1. 来源： 由私钥生成的，
    2. 功能： 授权prover代表用户去执行特定的交易。
    3. 其它功能： 可以查看用户的所有交易信息。

3.  Account View Key
    1. 来源： 由私钥生成的。
    2. 功能： 以查看用户的所有交易信息。

## Records
1. 功能： 记录用户数据和应用程序状态的基本数据结构，存储在Aleo链上。
2. 特点
    1. Aleo链上的record是被加密过的。
    2. 当一条record在交易中被消费时，旧的record将会被销毁，新的record将会被创建。
    3. 当一条record在交易中被创建时，只有交易的发送者和接受者能使用Account View Key来解密查看record数据。
3. 组成：
    1. owner: address  拥有这条Record的账户地址
    2. gates: u64  这条Record里面存储的Aleo积分
    3. data: Map<Identifier, Entry>  存储了应用数据
    4. nonce: group  