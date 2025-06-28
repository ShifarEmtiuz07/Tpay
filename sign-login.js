const { Wallet } = require('ethers');

// ⚠️ Replace with your test MetaMask private key
const privateKey = '27b823f376179fefdeacff1afe777a59fc4031753f4049de8b52d0356672269c'; 

// Replace with your dev wallet address (corresponding to the private key)
const walletAddress = '0x6C5D1aF464097c88cECb944edB0b83A5D97AdE17';

// This nonce must match the one from your backend for this wallet
 const nonce = `Login to Tpay at ${new Date().toISOString()}`; // same as what your backend stores

const wallet = new Wallet(privateKey);

async function main() {
  const signature = await wallet.signMessage('Login to Tpay at 2025-06-28T10:30:36.713Z');
  console.log('Wallet Address:', walletAddress);
  console.log('Nonce:', nonce);
  console.log('Signature:', signature);
}

main();
