// SPDX-License-Identifier: GPL-3.0 //指定开源协议
pragma solidity >=0.6.0 <0.9.0; //指定编译版本在0.6.0到0.9.0范围内 // ^0.6.0;指定编译版本为0.6.*系列
 
// 
contract HelloWorld {
    function helloWorld() external pure returns (string memory) {
        return "Hello, World!";
    }
    function double(uint num) public pure returns (uint) {
        return num*2;
    }
}

// 
contract SimpleStorage {
    uint storedData;

    function set(uint x) public {
        storedData = x;
    }

    function get() public view returns (uint) {
        return storedData;
    }
}