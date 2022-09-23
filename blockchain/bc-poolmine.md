[TOC]

## 矿池
- 矿池在2010年诞生

- 矿池协议
    1. getwork 
    2. BetterHash
    3. Stratum协议 https://braiins.com/stratum-v2

- 一般矿池协议会带来的问题，矿池可以拥有矿工所没有的权利
    1. 确定哪些交易可被纳入区块，或者不执行这些交易。
    2. 在适当的条件下被贿赂重组区块链。
    3. 积压交易mempool，以提高交易费率。
    4. 未经矿工同意直接使用算力挖取竞争分叉链。
    5. 非诚实挖矿，这样做的动机应该是别有用心的。
    6. 使用矿工的算力为某提案提供信号支持。

## 矿池模式工作流程
1. sync程序负责同步广播块高。（挖矿可优化地方：加速同步与广播块高速度）
2. miner程序负责进行计算挖矿。（挖矿可优化地方：计算速度）
3. pool程序负责接收miner的计算结果(shared)。（挖矿可优化地方：pool和miner间的通讯机制等）
4. pool程序判断miner计算结果是否符合难度值，符合则将其发送给sync程序。
5. sync程序生成块并且广播。

## 矿池奖励分配方式
- 参考  https://en.bitcoin.it/wiki/Comparison_of_mining_pools

1. PPS： 矿池每隔一个固定的时间区间就向矿工发放一笔固定金额的收益(算力占比没有变化的情况下)。
2. FPPS： FPPS与PPS很类似，唯一不同的是，它不仅支付预期的出块奖励，还给与矿工预期的交易手续费。
3. PPLNS 矿池每实际爆块一次，矿工按照算力占比分配收益。
4. PPS+： 是PPS和PPLNS的混合体。出块奖励按PPS模型向矿工发放理论预期值。交易手续费则按照PPLNS方式向矿工分配矿池实际收到的交易手续费。

## Stratum 协议
- https://braiins.com/stratum-v1/docs#/
- stratum协议于2012年被引入来解决比特币行业的挖矿问题，是目前最常用的挖矿程序和矿池之间的TCP通讯协议。
- 改进
    1. vs getwork协议
        - Stratum协议将 miner程序 轮训 pool程序 获取挖矿任务改为 pool程序 广播挖矿任务给 miner程序。
    2. vs 其它协议
        - 之前 miner程序 只能更改区块头的 nonce and ntime，Stratum协议引入 extranonce 字段，让 miner程序 也能创建区块头。
    3. 使用json载体传递数据
- 缺点： 不使用getblocktemplate协议的一个重要缺点是，stratum协议中矿工失去了构建自己 block templates 的能力（即选择哪些交易在他们开采的区块中）。

- 流程
    1. 任务订阅
    2. 登入验证
    3. 任务分配
    4. 提交挖矿结果
    5. 难道调整

- Coinbas e= Coinb1 + Extranonce1 + Extranonce2 + Coinb2
    - Extranonce2 由矿工生成。
    - 其它 矿池生成。

### 任务订阅
1. miner程序 通过 mining.subscribe 方法连接 pool程序，用来订阅工作。
    ```json 
    // param参数可以填写 miner程序的相关信息，例如 矿机类型，版本号等。
    {
        "id":1,
        "method":"mining.subscribe",
        "params":[
            "S9/4.0"
        ]
    }
    ```
2. pool程序 通过 mining.notify 方法返回订阅ID、ExtraNonce1和ExtraNonce2_size给 miner程序 。
    ```json
    // subscription_id 订阅ID： ae6812eb4cd7735a302a8a9dd95cf71f
    // ExtraNonce1 用于构造coinbase交易： 08000002
    // Extranonce2_size miner程序生成ExtraNonce2时的期待长度： 4 字节
    {
        "id":1,
        "result":[
            [
                [
                    "mining.set_difficulty",
                    "b4b6693b72a50c7116db18d6497cac52"
                ],
                [
                    "mining.notify",
                    "ae6812eb4cd7735a302a8a9dd95cf71f"
                ]
            ],
            "08000002",
            4
        ],
        "error":null
    }
    ```
### 登入验证
1. miner程序 通过 mining.authorize 方法传递帐号和密码登录矿池。
    ```json
    {
        "params":[
            "username_1",
            "password"
        ],
        "id":2,
        "method":"mining.authorize"
    }
    ```
2. pool程序 返回true表示登录成功。
    ```json
    {
        "error":null,
        "id":2,
        "result":true
    }
    ```

### 任务分配
1. pool程序 通过 mining.notify 方法定期给 miner程序 委派任务。
    ```json
    // job_id 任务ID： bf
    // prevhash 上一个区块哈希值： 4d16b6f85af6e2198f44ae2a6de67f78487ae5611b77c6c0440b921e00000000
    // Coinb1 coinbase交易初始化部分，包含区块高度： 010000000100000000000000000000000000000000000000000000000000000000000000 00ffffffff20020862062f503253482f04b8864e5008
    // Coinb2 coinbase交易最后的部分，包含矿工的收益地址和收益额等信息： 072f736c7573682f000000000100f2052a010000001976a914d23fcdf86f7e756a64a7a9688ef9903327048ed988ac00000000
    // merkle_branch 部分交易ID哈希列表： ["c5bd77249e27c2d3a3602dd35c3364a7983900b64a34644d03b930bfdb19c0e5", "049b4e78e2d0b24f7c6a2856aa7b41811ed961ee52ae75527df9e80043fd2f12"]
    // version 区块版本号： 00000002
    // nBit 编码后的网络难度： 1c2ac4af
    // ntime 当前时间： 504e86b9
    // clean_jobs 清理任务： 如果为true，则停止miner程序所有任务，马上开始新任务；如果是false则等当前任务结束才开始新任务。
    {
        "params":[
            "bf",
            "4d16b6f85af6e2198f44ae2a6de67f78487ae5611b77c6c0440b921e00000000",
            "01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff20020862062f503253482f04b8864e5008",
            "072f736c7573682f000000000100f2052a010000001976a914d23fcdf86f7e756a64a7a9688ef9903327048ed988ac00000000",
            [
                "c5bd77249e27c2d3a3602dd35c3364a7983900b64a34644d03b930bfdb19c0e5",
                "049b4e78e2d0b24f7c6a2856aa7b41811ed961ee52ae75527df9e80043fd2f12"
            ],
            "00000002",
            "1c2ac4af",
            "504e86b9",
            false
        ],
        "id":null,
        "method":"mining.notify"
    }
    ```

### 提交挖矿结果
1. miner程序 找到符合难度的结果时，通过 mining.submit 方法向 pool程序 提交share。
    ```json
    // 用户名：username_1
    // job_id 任务号：bf
    // ExtraNonce2 交易计数器，包含的交易数量，coinbase交易： 00000001
    // nTime 当前时间： 504e86ed
    // nonce： b2957c02
    {"params":["username_1","bf","00000001","504e86ed","b2957c02"],"id":4,"method":"mining.submit"}
    ```
2. pool程序 返回true表示提交成功，如果失败则error中有具体原因。
    ```json
    {"error":null,"id":4,"result":true}
    ```

### 难度调整
1. pool程序 通过 mining.set_difficulty 方法 调整难度。
     ```json
     // params参数里填写难度值
     {"id":null,"method":"mining.set_difficulty","params":[2]}
     ```

## 挖矿名词
1. nTime  区块中nTime表示该区块产生的近似时间。
    - 如果当前区块的时间戳大于前11个区块的的平均时间戳，并且小于“网络调整时间(Network-Adjusted Time)”+2小时，则认为该时间戳是有效的。
    - “网络调整时间”是指与你相连接的所有节点的平均时间。当节点A连接到节点B时，A从B处得到一个UTC标准的时间戳，A先转换成本地UTC标准时间保存起来，”网络调整时间“等于所有节点的本地UTC时间+所有相连节点的偏移量平均值。
    - ”网络调整时间“永远不会调整到超过本地系统时间70分钟以上。

2. nBits  区块中nBits(算法难度目标值)表示区块中的难度目标，该值被存为 系数/指数 16进制格式，前2位为指数，接下来6位为系数。
   1. 难度目标计算的公式： ``目标值 = 系数 * 2^(8 * (指数– 3))``
   2. 假如一个难度为0x1903a30c，则``Target=0x03a30c * 2^(0x08 * (0x19 - 0x03))``

3. 全网难度调整 
   1. 比特币的全网难度调整公式 ```New Difficulty = Old Difficulty * (Actual Time of Last 2016 Blocks / 20160 minutes)```

4. nNonce  区块中nNonce(工作量证明算法的计数器)
   1. Nonce随机数通常不同，但是它以严格的线性方式增长，从0开始，每次HASH时都会增长，当Nonce溢出时(此事经常发生)，生产交易的extraNonce项会增长，将改变Merkle树的根节点。

5. Block header
    1. Block version, nbits, hash of previous block in the blockchain and some padding bytes, which are constants.
    2. Nonce and ntime, which miner can modify already.
    3. Merkle root hash, which is created by hashing of bitcoin transactions included in the particular mining job.