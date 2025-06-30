// link-token.js
import { ethers } from "ethers";

// Replace with your Infura or Alchemy API URL
const RPC_URL = "https://mainnet.infura.io/v3/374f2f5a31ad42e28611101c186b7575";;

// Your test wallet address
const walletAddress = "0x0650ecDcE71157B9C73ef3eD9d9c7EaDcf8aEb94"; // Example wallet

// USDT contract on Ethereum Mainnet
const tokenAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

const provider = new ethers.JsonRpcProvider(RPC_URL);

const abi = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function balanceOf(address) view returns (uint)",
];

const fetchRealTokenBalance = async () => {
  const contract = new ethers.Contract(tokenAddress, abi, provider);

  const name = await contract.name();
  const symbol = await contract.symbol();
  const decimals = await contract.decimals();
  const balance = await contract.balanceOf(walletAddress);

  console.log("Token:", name, `(${symbol})`);
 const divisor = BigInt(10) ** BigInt(decimals);
  const humanBalance = Number(balance) / Number(divisor);
  console.log("Balance:", humanBalance);
};

fetchRealTokenBalance();
