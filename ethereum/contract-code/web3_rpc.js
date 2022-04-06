// - web3.js库是一个javascript库，可以执行很多与区块链进行交互的任务
// - 下载web3.js库 npm install web3 -g


const Web3 = require('web3')
const fs = require('fs')
const rpcURL = "http://127.0.0.1:8545" // 连接节点的地址
const web3 = new Web3(rpcURL) // 创建Web3连接

const accountArr = ["0x03118E2c88676d31ee397E1eEf7789fECfbC40b9",
    ""]

// 创建账户/解锁账户  
// 非私链上，请务必不要进行解锁操作，否则任何第三方都可以直接通过你的账户地址进行相关操作
const createAccount = _ =>{
    // 方式一
    // var newAccount = web3.eth.accounts.create();
    // var address = newAccount.address
    // var privateKey = newAccount.privateKey
    // // console.log("address=" + address,"\nprivateKey=" + privateKey)
    // web3.eth.accounts.privateKeyToAccount(privateKey) // 解锁账户
    // return address

    // 方式二
    password="123456"
    web3.eth.personal.newAccount(password,(err, address)=>{
        console.log(address)
        web3.eth.personal.unlockAccount(address, password, 14400).then(console.log('Account unlocked!'));
    });
    // 返回账户列表；web3.eth.accounts.create() 创建的账户不会被添加到这个列表中
    web3.eth.personal.getAccounts().then(console.log);
}

// 获取账户余额
const getBalance = async address =>{
    await web3.eth.getBalance(address, (err, wei) => {
        if (err){
            throw new Error('Function getBalance:' + err)
            // exit(1)
        }
        // 余额单位从wei转换为eth
        balance = web3.utils.fromWei(wei, 'ether')
        console.log("balance: " + balance)
        // return balance
    })
}

// 私链转账以太坊
const sendTransaction = async (addressFrom, addressTo) =>{
    await web3.eth.sendTransaction({
        from: addressFrom,
        to: addressTo,
        value: "1000000000000000000" //1 eth
    })
    .then(function(receipt){
        console.log(receipt);
    });
}

// 查看当前块高
const getBlockNumber = _ =>{
    web3.eth.getBlockNumber().then(console.log);
}

const keystore = _ =>{
    // 通过keystore解密出私钥
    keystoreJsonV3 = {"address":"907cc33c0b606f75836b6818beff2a926645b9ba","crypto":{"cipher":"aes-128-ctr","ciphertext":"704ac767d5e8eee15719095941ce81f16a7bca11e500e5b44ba9044f08fcc8d4","cipherparams":{"iv":"3986def9537641a6e39f13cfe95a9ecd"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":4096,"p":6,"r":8,"salt":"74f2d73f157386f0623d6dd957b4f777d08a608ec8e854bb04549520bc6deb96"},"mac":"a049bec1d55115b830233f4861428c9c7874dbde575e8944b6d0892de8fd5040"},"id":"91a56a11-6259-4a2c-b77e-06f57ba81381","version":3}
    console.log( web3.eth.accounts.decrypt(keystoreJsonV3, '密码') );

    // 通过私钥生成keystore
    privateKey='0x3ecd8ed343b61c028e612eb9f7149e2d88df51719c4ef7acf787b68a4f2bd44e'
    password='123456'
    console.log( web3.eth.accounts.encrypt(privateKey, password) );
}


const contract = _ =>{
    // 获取合约实例
    const source = fs.readFileSync("./Coin.json", 'utf8'); 
    abi = JSON.parse(source).abi
    const contractAddress = '0xdc64ae94db27325cdf53b9c336bbe5484100e177'
    const contractInstance = new web3.eth.Contract(abi, contractAddress)

    // 查看abi接口
    console.log(contractInstance.options.jsonInterface)

    // 合约函数gas费评估
    // contractInstance.methods.方法名(参数).estimateGas({value: 如果合约函数需要收取一定的以太坊费用,则需要填写})
    contractInstance.methods.buy(1,["0x"]).estimateGas({value: 100000000000000000})
    .then(function(gasAmount){
        console.log("Function estimateGas", gasAmount);
    })
    .catch(function(error){
        console.log("Function estimateGas", error);
    });

    // 执行一次调用，并不会改变链上的状态
    contractInstance.methods.方法名(参数).call((err, result) => { console.log("error="+err+"\n"+"result="+result) })
    
    // 发送一次交易，会改变链上的状态
    contractInstance.methods.方法名(参数).send({from: 账户地址},(err, result) => { console.log("error="+err+"\n"+"result="+result) })
    contractInstance.methods.方法名(参数).send(
        {   from: accountArr[0],
            gasLimit: 3000000, 
            gas: 400000,
            gasPrice: 21000,
            value: 1000000000000000000
        },
        (err, result) => { 
            console.log("result=", result) 
            console.log("error=", err)
        }
    )

    // 查看合约之前的所有事件
    contractInstance.getPastEvents(
        'AllEvents', // 过滤事件参数，这里获取全部事件
        {
            fromBlock: 0, // 起始块
            toBlock: 'latest' // 终止块
        },
        (err, events) => { console.log(events) } // 回调函数
    )
}


// web3.js 获取metamask签名进行交易 https://www.cxyzjd.com/article/xilibi2003/82700542
// const tx = {
//     // nonce: 账户地址的第n笔交易, // nonce值必须=（此账户已完成的交易数+1）
//     // 合约地址 或 账户地址
//     to: contractAddress,
//     // gasLimit，指定gas的限制；以太坊程序内部设置了矿工打包块交易的gas费不能超过8百万，因此可以设置的最大值为8000000
//     gas: 8000000,
//     // optional if you are invoking say a payable function 
//     value: 100000000000000000,
//     // this encodes the ABI of the method and the arguements；如果进行转账操作则设置data为空字符串
//     data: contractInstance.methods.buy(1, ["0x"]).encodeABI() 
// };
const signTransaction = async (tx, privateKey) =>{
    const signPromise = web3.eth.accounts.signTransaction(tx, privateKey); // 对交易进行签名
    await signPromise.then(async (signedTx) => {
        // 对交易进行广播
        return await web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
    }).then(async (receipt,err) => {
        if (err){
            console.log("Function signTransaction:", err)
        }else{
            console.log("Function signTransaction:", receipt)
        }
    }).catch((err) => {
        console.log("Function signTransaction:", err)
    });
}

module.exports = {
    sendTransaction
};