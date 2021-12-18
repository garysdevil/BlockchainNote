const { MerkleTree } = require('merkletreejs')
const keccak256 = require('keccak256')
// const SHA256 = require('crypto-js/sha256')

initTree = (stringArrayVar) =>  {
    const leaves = stringArrayVar.map(v => keccak256(v))
    return new MerkleTree(leaves, keccak256, { sort: true })
}

getData = _ => {
    return ['addrees1', 'addrees2', 'addrees3', 'addrees4']
}

getProof = ( tree, stringVar ) =>  {
    const leaf = keccak256(stringVar)
    return tree.getHexProof(leaf)
}

// 链上验证数据是否属于默克尔树
verifyOnline = async( tree ) =>  {
    const Web3 = require('web3')
    const fs = require('fs')
    const rpcURL = "以太坊节点的RPC地址端口"
    const web3 = new Web3(rpcURL)
    const source = fs.readFileSync("abi文件路径", 'utf8');
    abi = JSON.parse(source).abi
    const contractAddress = '合约地址'
    const contractInstance = new web3.eth.Contract(abi, contractAddress)

    leave = keccak256('addrees1')
    proof = getProof(tree, 'addrees1')
    // 方式一
    await contractInstance.methods.verify(leave, proof).call((err, result) => { 
        console.log('result', result)
        console.log('err', err) 
    })
    // 方式二，链上取调用者地址作为叶子节点
    await contractInstance.methods.verify( proof ).call({from: 'addrees1'},(err, result) => { 
        console.log('result', result)
        console.log('err', err) 
    })

}

(async _ =>{ 
    const tree = initTree(getData())
    const root = tree.getHexRoot()
    // MerkleTree.print(tree)
    // console.log(root)

    // 链下验证数据是否属于默克尔树
    // const data = 'a'
    // console.log(tree.verify(getProof(data), keccak256(data), root)) // false
    

    
})()
