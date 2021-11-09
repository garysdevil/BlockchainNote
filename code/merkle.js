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

const tree = initTree(getData())
// MerkleTree.print(tree)
const root = tree.getHexRoot()
// console.log(root)

getProof = ( stringVar ) =>  {
    const leaf = keccak256(stringVar)
    return tree.getHexProof(leaf)
}

// 链下验证数据是否属于默克尔树
// const data = 'a'
// console.log(tree.verify(getProof(data), keccak256(data), root)) // false

// 链上验证数据是否属于默克尔树
// 传递参数，调用智能合约