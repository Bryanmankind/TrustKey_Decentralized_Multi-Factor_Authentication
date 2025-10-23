# TrustKey — Decentralized Multi-Factor Authentication for Web3

### **Overview**

**TrustKey** is a decentralized security layer that brings **multi-factor authentication (MFA)** to blockchain applications.
It ensures that every transaction or login is verified not only by a user’s **wallet signature** but also by a **secure enclave attestation**, creating a **trustless authentication system** with no central servers or passwords.

---

### **🚨 The Problem**

In Web3, if your private key is stolen, your assets are gone.
Phishing, malware, and fake dApps make it easy for attackers to trick users into signing malicious transactions.
There’s currently **no native way** to prove that a signature came from a *trusted device* or *secure environment*.

---

### ** The Solution**

TrustKey adds a **TEE-backed second signature** to all critical actions.

* Users register their device, which generates a **secondary key pair inside a Trusted Execution Environment (TEE)**.
* A **proof of attestation** is recorded onchain.
* When signing a transaction, the system requires:

  1. The user’s wallet signature, and
  2. The enclave signature tied to the onchain attestation.

This combination provides **verifiable assurance** that the action came from a secure, authorized device.

---

### **⚙️ Architecture**

* **Smart Contracts:** Solidity (verification + attestation registry)
* **TEE Simulation / Backend:** Python or Rust
* **Frontend:** React + ethers.js
* **Privacy Layer (optional):** Oasis ROFL for real TEE key generation and remote attestation

---

### **🧩 Features**

* Decentralized 2FA with cryptographic proofs
* Onchain attestation verification
* Works across any EVM-compatible chain
* No bridges, no custodial servers
* Fully open-source and modular

---

### **🚀 Quick Start**

```bash
# Clone the repo
git clone https://github.com/Bryanmankind/TrustKey_Decentralized_Multi-Factor_Authentication.git
cd TrustKey_Decentralized_Multi-Factor_Authentication

forge build

forge test
```


### **🧠 Inspiration**

Built for the **Halloween ChaincKathon** to “Stop the Boogeyman” — securing the blockchain world with **hardware-backed cryptographic trust**.

---

### **👥 Team**

Built by **${Makinde Oluwasegun}** — Security builder passionate about decentralized trust systems.
