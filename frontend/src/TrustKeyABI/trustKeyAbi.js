
export const trustKeyAbi = [
  {
    "type": "function",
    "name": "attestations",
    "inputs": [
      { "name": "", "type": "address", "internalType": "address" }
    ],
    "outputs": [
      { "name": "enclaveHash", "type": "bytes32", "internalType": "bytes32" },
      { "name": "active", "type": "bool", "internalType": "bool" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getExpectedEnclaveHash",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "verifyTransaction",
    "inputs": [
      { "name": "txSignature", "type": "bytes", "internalType": "bytes" },
      { "name": "enclaveSig", "type": "bytes", "internalType": "bytes" },
      { "name": "messageHash", "type": "bytes", "internalType": "bytes" },
      { "name": "deadline", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [
      { "name": "", "type": "bool", "internalType": "bool" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "event",
    "name": "AttestationRegistered",
    "inputs": [
      { "name": "user", "type": "address", "indexed": true, "internalType": "address" },
      { "name": "enclaveHash", "type": "bytes32", "indexed": false, "internalType": "bytes32" }
    ],
    "anonymous": false
  },
  {
    "type": "error",
    "name": "ECDSAInvalidSignature",
    "inputs": []
  },
  {
    "type": "error",
    "name": "ECDSAInvalidSignatureLength",
    "inputs": [
      { "name": "length", "type": "uint256", "internalType": "uint256" }
    ]
  },
  {
    "type": "error",
    "name": "ECDSAInvalidSignatureS",
    "inputs": [
      { "name": "s", "type": "bytes32", "internalType": "bytes32" }
    ]
  }
];

const trustKeyContract = (web3Instance) => {
  return new web3Instance.eth.Contract(
    trustKeyAbi,
    "0x8464135c8F25Da09e49BC8782676a84730C318bC" 
  );
};

export default trustKeyContract;
