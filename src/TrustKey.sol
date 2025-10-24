// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {MessageHashUtils} from "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

contract TrustKey {

    using ECDSA for bytes32;
    using MessageHashUtils for bytes32;

    struct trustAttestation {
        bytes32 enclaveHash; // Hash of enclave public key or attestation
        bool active;
    }

    // Mapping of user addresses to their trust attestations
    mapping (address => trustAttestation) public attestations;

  
    event AttestationRegistered(address indexed user, bytes32 enclaveHash);

    function registerAttestation(bytes32 enclaveHash) external {
        attestations[msg.sender] = trustAttestation(enclaveHash, true);
        emit AttestationRegistered(msg.sender, enclaveHash);
    }

    function verifyTransaction(
        bytes calldata txSignature,
        bytes calldata enclaveSig,
        bytes calldata messageHash,
        uint256 deadline
    ) external view returns (bool) {
        if (block.timestamp > deadline) return false;

        bytes32 msgHash = keccak256(messageHash).toEthSignedMessageHash();

        address signer = msgHash.recover(txSignature);

        // Verify wallet signature
        if (signer != msg.sender) return false;

        // Verify enclave signature
        address enclaveAddr = msgHash.recover(enclaveSig);
        bytes32 hashed = keccak256(abi.encodePacked(enclaveAddr)); 

        trustAttestation memory a = attestations[msg.sender];
        if (!a.active || a.enclaveHash != hashed) return false;

        return true;
    }

}

