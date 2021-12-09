// SPDX-License-Identifier: MIT
// 参考 https://github.com/miguelmota/merkletreejs-solidity

pragma solidity ^0.8.0;

contract MerkleProof_1 {

  function verify( bytes32 leaf, bytes32[] memory proof ) public pure returns (bool){
    // 将默克尔树的根节点存在链上
    bytes32 root = 0x1b404f199ea828ec5771fb30139c222d8417a82175fefad5cd42bc3a189bd8d5;
    bytes32 computedHash = leaf;

    for (uint256 i = 0; i < proof.length; i++) {
      bytes32 proofElement = proof[i];

      if (computedHash < proofElement) {
        // Hash(current computed hash + current element of the proof)
        computedHash = keccak256(abi.encodePacked(computedHash, proofElement));
      } else {
        // Hash(current element of the proof + current computed hash)
        computedHash = keccak256(abi.encodePacked(proofElement, computedHash));
      }
    }

    // Check if the computed hash (root) is equal to the provided root
    return computedHash == root;
  }
}

contract MerkleProof_2 {

  function verify( bytes32[] memory proof ) public view returns (bool){
    // 将默克尔树的根节点存在链上
    bytes32 root = 0x7691f40213397d36faeb13d0980ab0da02cad8647d5b71ba2a66faa0f932a7a3;
    // 取合约调用者作为叶子节点的哈希值
    bytes32 computedHash = keccak256(abi.encodePacked(msg.sender));

    for (uint256 i = 0; i < proof.length; i++) {
      bytes32 proofElement = proof[i];

      if (computedHash < proofElement) {
        // Hash(current computed hash + current element of the proof)
        computedHash = keccak256(abi.encodePacked(computedHash, proofElement));
      } else {
        // Hash(current element of the proof + current computed hash)
        computedHash = keccak256(abi.encodePacked(proofElement, computedHash));
      }
    }

    // Check if the computed hash (root) is equal to the provided root
    return computedHash == root;
  }
}