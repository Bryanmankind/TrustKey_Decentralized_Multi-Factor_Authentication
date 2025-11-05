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


  async function trackTransactionsHash(account) {
    const wsProvider = new ethers.WebSocketProvider("ws://127.0.0.1:8545");

    wsProvider.on("pending", async (txHash) => {
      try {
        const tx = await wsProvider.getTransaction(txHash);
        if (!tx || !tx.from) return;

        // Only verify if transaction is from target account
        if (tx.from.toLowerCase() !== account.toLowerCase()) return;

        // Rebuild signature if needed
        const userSignature = tx.signature
          ? tx.signature
          : ethers.Signature.from({ v: tx.v, r: tx.r, s: tx.s }).serialized;

        // Compute message hash (digest that was actually signed)
        const unsignedTx = ethers.Transaction.from(tx).unsignedSerialized;
        const messageHash = ethers.keccak256(unsignedTx);

        const deadline = Math.floor(Date.now() / 1000) + 60 * 2;

        await contract.verifyTransaction(userSignature, enclaveSIG, messageHash, deadline);
        setStatus("Transaction verified!");
      } catch (error) {
        console.log("Transaction verification failed");
      }
    });
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
