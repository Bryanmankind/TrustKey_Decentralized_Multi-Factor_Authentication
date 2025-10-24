// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

library MockEnclave {
    // Simulate enclave code measurement (in real life, you'd hash enclave code)
    function getEnclaveHash() internal pure returns (bytes32) {
        return keccak256(abi.encodePacked("TEE_v1.0_secure_key_module"));
    }
}
