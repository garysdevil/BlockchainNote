// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC1155/ERC1155.sol';
// import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract MyERC1155 is ERC1155 ('GGWorld'){
    function mint(address to, uint256 id, uint256 amount) internal virtual {
        bytes data;
        _mint(to, id, amount, data);
    }
}

