const Web3 = require('web3')
const fs = require('fs')

const wsURL = "ws://127.0.0.1:8544" 

account0="0x3012eb97733fb501890ef16a9f831be4206c26fd"
account1="0x9b35b0fd2cb4e6444d01fe92728b6496cb7a0958"
account2="0x86148d89c025f34812387f280e90feb981058b4c"

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
    coinWatch();
}


const coinWatch = async _ =>{ 
    const source = fs.readFileSync("./mytruffle/build/contracts/Coin.json", 'utf8'); 
    abi = JSON.parse(source).abi
    const contractAddress = '0xdc64ae94db27325cdf53b9c336bbe5484100e177'
    const contractInstance = new web3.eth.Contract(abi, contractAddress)

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

}

