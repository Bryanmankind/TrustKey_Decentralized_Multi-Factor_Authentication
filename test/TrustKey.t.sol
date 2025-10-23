// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {TrustKey} from "../src/TrustKey.sol";

contract TrustKeyTest is Test {
    TrustKey public trustKey;

    function setUp() public {
        trustKey = new TrustKey();
    }

}
