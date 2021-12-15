// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyERC721 is ERC721 ('GGWorld', 'GG'){
    string private _name;
    string private _symbol;
    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }

    function mint(address toAddr, uint tokenID) public{
        _safeMint(toAddr, tokenID);
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory baseURI = "base_cid";
        // return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId)) : "";
        return string(abi.encodePacked('ipfs://', baseURI, '/prefix-', Strings.toString(tokenId), '.jpeg'));
    }
}