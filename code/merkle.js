const { MerkleTree } = require('merkletreejs')
const keccak256 = require('keccak256')
// const SHA256 = require('crypto-js/sha256')

initTree = (stringArrayVar) =>  {
    const leaves = stringArrayVar.map(v => keccak256(v))
    return new MerkleTree(leaves, keccak256, { sort: true })
}

getData = _ => {
    return ['a', 'b', 'c', 'd']
}

getProof = ( stringVar ) =>  {
    const leaf = keccak256(stringVar)
    return tree.getHexProof(leaf)
}

(async _ =>{ 
    const tree = initTree(getData())
    const root = tree.getHexRoot()
    // MerkleTree.print(tree)
    // console.log(root)

    // 链下验证数据是否属于默克尔树
    // const data = 'a'
    // console.log(tree.verify(getProof(data), keccak256(data), root)) // false
    
    // 链上验证数据是否属于默克尔树
    // 传递参数，调用智能合约
    // const Web3 = require('web3')
    // const fs = require('fs')
    // const rpcURL = "以太坊节点的RPC地址端口"
    // const source = fs.readFileSync("abi文件路径", 'utf8');
    // abi = JSON.parse(source).abi
    // const contractAddress = '合约地址'
    // const contractInstance = new web3.eth.Contract(abi, contractAddress)
    // console.log(root)
    // await contractInstance.methods.verify(keccak256('a'),getProof('a')).call((err, result) => { 
    //     console.log(result)
    //     console.log(err) 
    // })
})()
