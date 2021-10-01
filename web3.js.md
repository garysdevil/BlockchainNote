## web3.js
- web3.js库是一个javascript库，可以执行很多与区块链进行交互的任务
- npm install web3 -g
```js
const Web3 = require('web3')
const fs = require('fs')
const rpcURL = "http://127.0.0.1:8545" // 连接节点的地址
const web3 = new Web3(rpcURL) // 创建Web3连接


const address = "0x03118E2c88676d31ee397E1eEf7789fECfbC40b9"

// 获取账户余额
web3.eth.getBalance(address, (err, wei) => {
    // 余额单位从wei转换为ether
    balance = web3.utils.fromWei(wei, 'ether')
    console.log("balance: " + balance)
})


// 获取合约实例
const source = fs.readFileSync("./Coin.json", 'utf8'); 
abi = JSON.parse(source).abi
const contractAddress = '0xdc64ae94db27325cdf53b9c336bbe5484100e177'
const contractInstance = new web3.eth.Contract(abi, contractAddress)

// 执行一次交易，会改变链上的状态
contractInstance.methods.send(参数)).send({from: 账户地址},(err, result) => { console.log(result) })

// 执行一次调用，并不会改变链上的状态
contractInstance.methods.get(参数).call((err, result) => { console.log(result) })
contractInstance.methods.get(参数).call({gasPrice:1000,gas:10000},(err, result) => { console.log(result) })

// 查看合约之前的所有事件
contractInstance.getPastEvents(
    'AllEvents', // 过滤事件参数，这里获取全部事件
    {
        fromBlock: 0, // 起始块
        toBlock: 'latest' // 终止块
    },
    (err, events) => { console.log(events) } // 回调函数
)
// 查看abi接口
console.log(contractInstance.options.jsonInterface)
// 查看当前块高
web3.eth.getBlockNumber().then(console.log);

```