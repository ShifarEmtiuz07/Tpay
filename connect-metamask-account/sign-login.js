
import { Wallet } from 'ethers';

export async function signFunc() {

  const privateKey = '1ec725c345371801f811e09f868e98c6c9683dbea15184c9bd71b07bdc8798d4'; 

  const wallet = new Wallet(privateKey);


const walletAddress = '0x0650ecDcE71157B9C73ef3eD9d9c7EaDcf8aEb94';
  
 const nonce = `Login to Tpay at ${new Date().toISOString()}`; 
 const signature = await wallet.signMessage(nonce);


  return {
    walletAddress,
    nonce,
    signature
  };
}


