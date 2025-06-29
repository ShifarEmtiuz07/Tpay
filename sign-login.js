//const { Wallet } = require('ethers');
import { Wallet } from 'ethers';

// ⚠️ Replace with your test MetaMask private key
const privateKey = '1ec725c345371801f811e09f868e98c6c9683dbea15184c9bd71b07bdc8798d4'; 

// Replace with your dev wallet address (corresponding to the private key)
const walletAddress = '0x0650ecDcE71157B9C73ef3eD9d9c7EaDcf8aEb94';

// This nonce must match the one from your backend for this wallet
 const nonce = `Login to Tpay at ${new Date().toISOString()}`; // same as what your backend stores

const wallet = new Wallet(privateKey);

export async function signFunc() {
  const signature = await wallet.signMessage(nonce);
  // console.log('Wallet Address:', walletAddress);
  // console.log('Nonce:', nonce);
  // console.log('Signature:', signature);

  return {
    walletAddress,
    nonce,
    signature
  };
}

//main();
