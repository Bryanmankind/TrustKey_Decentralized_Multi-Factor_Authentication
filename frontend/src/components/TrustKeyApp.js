import React, { useState } from "react";
import { ethers } from "ethers";

export default function TrustKeyApp() {
  const [account, setAccount] = useState(null);
  const [status, setStatus] = useState("");

  async function connectWallet() {
    if (window.ethereum) {
      const [selectedAccount] = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(selectedAccount);
    } else {
      alert("Please install MetaMask!");
    }
  }

  // async function registerAttestation() {
  //   if (!account) return alert("Connect wallet first!");

  //   const provider = new ethers.BrowserProvider(window.ethereum);
  //   const signer = await provider.getSigner();
  //   const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

  //   const tx = await contract.getExpectedEnclaveHash();
  //   setStatus("Transaction sent...");
  //   await tx.wait();
  //   setStatus("Attestation registered!");
  // }

  return (
    <div className="homePage">
      {!account ? (
          <button onClick={connectWallet}>Connect Wallet</button>
        ) : (
            <p>Connected: {account}</p>
        )}

        <h2>TrustKey Safe App </h2>
        <p>Register your wallet address attestation on the blockchain.</p>

      <button>Register Wallet Address Attestation</button>
      <p>{status}</p>
    </div>
  );
}
