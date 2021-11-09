pragma solidity ^0.8.0;

contract MerkleProof {

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
