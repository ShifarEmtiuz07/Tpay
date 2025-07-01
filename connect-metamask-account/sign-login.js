
import { Wallet } from 'ethers';


const privateKey = '27b823f376179fefdeacff1afe777a59fc4031753f4049de8b52d0356672269c'; 


const walletAddress = '0x6C5D1aF464097c88cECb944edB0b83A5D97AdE17';

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
