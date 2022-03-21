const Web3 = require('web3')
const fs = require('fs')

const wsURL = "ws://127.0.0.1:8544" 

const web3 = new Web3();
var eventProvider = new Web3.providers.WebsocketProvider(wsURL);
(() =>  { 
    eventProvider.on('error', e => {
        console.error('WS Infura Error', e);
    });
    eventProvider.on('connect', function () {
            console.log('WS Connected');
            setupListeners();
    });
    eventProvider.on('end', e => {
        console.log('WS closed');
    });
    web3.setProvider(eventProvider); 
})()
// 或者 // const web3 = new Web3(wsURL)

const setupListeners = async _ =>{
    eventWatch();
}


const eventWatch = async _ =>{ 
    const source = fs.readFileSync("./mytruffle/build/contracts/Coin.json", 'utf8'); 
    abi = JSON.parse(source).abi
    const contractAddress = '0xdc64ae94db27325cdf53b9c336bbe5484100e177'
    const contractInstance = new web3.eth.Contract(abi, contractAddress)

    // 监听某个事件
    await contractInstance.events.Sent({}, '',  (error, result) => {
        console.log('------', new Date())
        if  (!error)  {
            amount = result.returnValues.amount
            from = result.returnValues.from
            to = result.returnValues.to
            console.log("Coin transfer: " + amount + " coins were sent from " + from + " to " + to + ".");
            console.log("Balances now:");
            contractInstance.methods.get(from).call( (err, result) => { console.log("Sender: ", result) })
            contractInstance.methods.get(to).call((err, result) => { console.log("Receiver: ", result) })
        }else{
            console.log(error)
        }
    })
    // 监听所有事件
    await contractInstance.events.allEvents({}, '',  (error, result) => {
        console.log('------', new Date())
        if  (!error)  {
            console.log("result", result);
        }else{
            console.log("error", error)
        }
    })

    // 监听一个事件的一次触发
    await contractInstance.once(事件名称, {}, (error, result) => {})
    // 获取所有的历史事件
    await contractInstance.getPastEvents(事件名称, {fromBlock: 0, toBlock: 'latest'}, (error, result) => {})


}

