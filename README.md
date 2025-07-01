# 🚀 Tpay DEX Backend

Tpay is a **decentralized exchange (DEX)** backend built using **NestJS** and **PostgreSQL**, inspired by Uniswap v2/v3 architecture. It enables real-time token swapping, liquidity provision, yield farming, and governance — all integrated with real MetaMask accounts.

> 🔐 **Wallet-based authentication** via MetaMask ensures a secure and passwordless user experience.

---

## ✨ Features

### 🔐 MetaMask Wallet Authentication

* Login using real MetaMask wallet (via ECDSA signature)
* Nonce-based challenge-response flow
* No passwords — only wallet signature required
* Stores real wallet addresses in DB

As this project does **not include a frontend**, I have written a **custom script** called `sign-login.js` to enable login using a **real MetaMask wallet account**.

### ✅ How to Use `sign-login.js`

This script signs a login nonce using your wallet’s private key (similar to how MetaMask signs messages in frontend dApps).

> **Before running the script, please update the following:**

#### 🔧 In `sign-login.js`, change:
1. `walletAddress` → Replace with your own MetaMask wallet address  
2. `privateKey` → Replace with your MetaMask wallet's private key  
   > ⚠️ **Never share your private key publicly**
3. The script will automatically generate a nonce and signature

This signed message is then used by the backend to verify your wallet and issue a JWT token.

---

## 🔗 Fetching Real Token Balance from MetaMask Wallet

To fetch real token balances or account information, I have also created a script called `link-token.js`.

### ✅ How to Use `link-token.js`

This script uses `ethers.js` to connect to the Ethereum blockchain and retrieve token balances from a live MetaMask account.

> **Before running the script, please update the following:**

#### 🔧 In `link-token.js`, change:
1. `tokenAddress` → Replace with the token's contract address from [https://etherscan.io/](https://etherscan.io/)  
2. `walletAddress` → Replace with your own MetaMask wallet address  
3. `RPC_URL` → Replace with your **Infura API URL** or any Ethereum RPC endpoint (e.g., Alchemy)

The script will output the **token name** and your **wallet’s balance** in a readable format.


### 💱 Token Swapping

* AMM model (x \* y = k) based on Uniswap v2
* 0.3% trading fee per swap
* Fully tracked swap history
* Fee distribution to liquidity providers

### 🏦 Liquidity Pool Management

* Create token pairs (tokenA/tokenB)
* Add/remove liquidity
* Earn LP shares and trading fees

### 🧑‍🌾 Yield Farming

* Stake LP tokens to earn TPAY rewards
* Claim time-based token rewards (`rewardRate`)
* Claim swap trading fee rewards (`feeReward`)
* Real-time farming stats

### 🗳️ Governance

* Create governance proposals
* Vote using weighted power (LP/tokens)
* View proposal history and results

---

## 🔗 MetaMask Integration

This backend is connected with **real MetaMask wallets**:

* Authenticate using signature from `window.ethereum`
* Extract wallet address with `ethers.utils.verifyMessage`
* Fetch and store user identity from wallet
* Designed to work seamlessly with any frontend dApp

---

## 🔧 Technologies

* **NestJS** – Progressive Node.js framework
* **PostgreSQL** – Relational database
* **TypeORM** – Database ORM
* **Ethers.js** – MetaMask integration
* **JWT** – Authentication
* **Docker** – Containerization-ready

---

## 🛠 API Documentation

### 🔐 Auth

| Method | Route                  | Description              |
| ------ | ---------------------- | ------------------------ |
| POST   | `/auth/wallet-login`   | Login using signed nonce |

**Payload:**

```json
{
 "walletAddress":""
}
```

### 💱 Swap

| Method | Route             | Description    |
| ------ | ----------------- | -------------- |
| POST   | `/token-swapping` | Swap tokens    |
| GET    | `/token-swapping` | View all swaps |

**Payload:**

```json
{
  "poolId": 1,
  "fromToken": "USDT",
  "amount": 100
}
```

### 🏦 Liquidity Pools

| Method | Route                         | Description                 |
| ------ | ----------------------------- | --------------------------- |
| POST   | `/liquidity-pool`             | Create a new liquidity pool |
| POST   | `liquidity-pool/add`          | Add liquidity to a pool     |
| POST   | `liquidity-pool/remove`       | Remove liquidity from pool  |
| GET    | `/liquidity-pool/all-pools`   | Get all pools               |
| GET    |`liquidity-pool/all-liquidities`| Get all liquidities        |

**Payload (create pool):**

```json
{
  "tokenA": "USDT",
  "tokenB": "ETH",
  "reserveA": 10000,
  "reserveB": 5
}
```

**Payload (add liquidity):**

```json
{
  "poolId":1,
  "amountA": 500,
  "amountB": 0.25
}
```

**Payload (remove liquidity):**

```json
{
   "poolId": 3,
   "share": 10
}
```

### 🧑‍🌾 Yield Farming

| Method | Route                           | Description                              |
| ------ | ------------------------------- | ---------------------------------------- |
| POST   | `/yield-farming/farm`           | Create a new yield farm                  |
| GET    | `/yield-farming/farms`          | List all yield farms                     |
| POST   | `/yield-farming/stake/:farmId`  | Stake LP tokens to earn TPAY             |
| POST   | `/yield-farming/claim/:stakeId` | Claim TPAY rewards + trading fee rewards |

**Payload (create farm):**

```json
{
  "name": "USDT-ETH Farm",
  "lpTokenAddress": "1",   //Pool Id
  "rewardRate": 0.0001
}
```

**Payload (stake):**

```json
{
  "amount": 100
}
```

**Response (claim):**

```json
{
  "tpayReward": 0.024,
  "tradingFeeReward": 0.0037
}
```

### 🗳️ Governance

| Method | Route                          | Description           |
| ------ | ------------------------------ | --------------------- |
| POST   | `/governance/proposal`         | Create a new proposal |
| POST   | `/governance/vote/:proposalId` | Vote on a proposal    |
| GET    | `/governance/proposals`        | Get all proposals     |

**Payload (create proposal):**

```json
{
  "title": "Reduce Swap Fee",
  "description": "Change the swap fee from 0.3% to 0.2%",
  "creatorAddress": "0x1234abcd5678ef901234567890abcdef12345678",
  "deadline": "2025-07-30T23:59:59Z"
}
```

**Payload (vote):**

```json
{
  "voterAddress": "0x1234abcd5678ef901234567890abcdef12345678",
  "vote": "yes",
  "weight": 100
}
```

---

## 📁 Folder Structure

```
src/
├── auth/                         → MetaMask-based login
├── liquidity-pool-management/    → Liquidity pool management
├── token-swapping/               → Token swaps + fee handling
├── yield-farming/                → Staking & reward system
├── governance/                   → Proposal creation & voting
├── users/                        → User info (wallet-based)
├── token-management/             → Manage token

```

---

## 🐳 Docker Support

This project includes **Docker support** to make it easy to run and deploy the backend in a containerized environment.

### ✅ Features:
- Containerized NestJS application
- PostgreSQL database support
- Environment configuration via `.env` file
- Easy setup using `docker-compose`

---

### 🧱 Build and Run the Project with Docker

> Make sure Docker and Docker Compose are installed on your machine.

#### 🔧 Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/tpay-dex-backend.git
cd tpay-dex-backend


---

#### Configure Environment Variables

  > Create a .env file in the project root and add:

      - DB_HOST=postgres
      - DB_PORT=5432
      - DB_USERNAME=postgres
      - DB_PASSWORD=yourpassword
      - DB_NAME=tpay  #  DB_NAME=db for docker
      - JWT_SECRET=your_jwt_secret


## ▶️ How to Run the Project

You can run the Tpay DEX backend either locally (development mode) or using Docker (isolated environment).

---

### 🧪 Local Development Setup

#### 🔹 Prerequisites

- Node.js (v22.17.0 recommended)
- PostgreSQL (installed locally or through a service like Docker)
- Npm
- .env file configured

#### 🔹 Install Dependencies

  ```bash
  npm install
  # or
  yarn install

🔹 Run the App

    npm run start:dev
    # or
    yarn start:dev

🔹 Start with Docker

    docker-compose up --build


## 📦 Future Enhancements

* [ ] Token price oracles (Chainlink)
* [ ] Multi-chain support (e.g., BSC, Polygon)
* [ ] UI frontend for swapping/staking/voting
* [ ] NFT-based LP positions (Uniswap v3 logic)

---

## 🧠 Disclaimer

This project is for educational and prototyping purposes.
**Do not deploy on mainnet without security audits.**

---

## 👨‍💻 Author

Made with ❤️ by \[A. B. M. Shifar Emtiuz]
Contributions & forks are welcome!
