import React, { useState } from "react";
import {trustKeyAbi} from "../TrustKeyABI/trustKeyAbi";
import { Contract, ethers } from "ethers";

export default function TrustKeyApp() {
  const [account, setAccount] = useState(null);
  const [status, setStatus] = useState("");
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  async function connectWallet() {
    if (window.ethereum) {
      const [selectedAccount] = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(selectedAccount);
    } else {
      alert("Please install MetaMask!");
    }
  }

  async function registerAttestation() {
    if (!account) return alert("Connect wallet first!");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new Contract("0x8464135c8F25Da09e49BC8782676a84730C318bC", trustKeyAbi, signer);

    
    try {
      setStatus("Transaction pending...");
      const tx = await contract.getExpectedEnclaveHash();
      await tx.wait();
      setStatus("Attestation registered!");
    } catch (error) {
      console.error(error);
      setStatus("Transaction failed!");
    }

    setSigner(signer);
    setContract(contract);
  }

  async function getTransactionDetails(contract){
    if (!account) return alert("Connect wallet first!");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const txSignature = await signer.getAddress();
    const txDetails = await provider.getTransaction(txSignature);

    const enclaveSig = "0x..."; // Replace with actual enclave signature
    const deadline = Math.floor(Date.now() / 1000) + 60 * 2; // 2minutes from now
    try {
      const tx = await contract.verifyTransaction(txSignature, enclaveSig, txDetails, deadline);
      await tx.wait();
      setStatus("Transaction verified!");
    } catch (error) {
      console.error(error);
      setStatus("Invalid transaction: " + error.message);
    }

  }

  return (
    <div className="homePage">
      {!account ? (
          <button onClick={connectWallet}>Connect Wallet</button>
        ) : (
            <p>Connected: {account}</p>
        )}

        <h2>TrustKey Safe App </h2>
        <p>Register your wallet address attestation on the blockchain.</p>

      <button onClick={registerAttestation}>Register Wallet Address Attestation</button>
      <p>{status}</p>
    </div>
  );
}
