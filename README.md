# Pete's Pet Shop DApp

A decentralized pet adoption platform built with Ethereum smart contracts, Truffle, and a Bootstrap frontend.

## Features

- **Adopt a Pet:** Users can adopt pets by paying a fee in Ether.
- **Admin Panel:** The contract owner can add or remove pets and set the adoption fee.
- **Web3 Integration:** Interact with the blockchain using MetaMask or another Ethereum wallet.
- **Unit Tests:** Smart contract logic is tested with Truffle.

## Project Structure

```
contracts/         # Solidity smart contracts
  Adoption.sol
  Migrations.sol
migrations/        # Truffle migration scripts
  1_initial_migration.js
  2_deploy_contracts.js
src/               # Frontend source code
  index.html
  js/
  css/
  images/
  pets.json
test/              # Truffle test scripts
  adoptionAdmin.test.js
  testAdoption.test.js
truffle-config.js  # Truffle configuration
package.json       # Project dependencies
```

## Prerequisites

- [Node.js](https://nodejs.org/)
- [Truffle](https://trufflesuite.com/truffle/)
- [Ganache](https://trufflesuite.com/ganache/) (or another local Ethereum node)
- [MetaMask](https://metamask.io/) (for frontend interaction)

## Setup

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Start Ganache:**
   - Open Ganache and start a workspace (default port: 7545).

3. **Compile and deploy contracts:**
   ```sh
   truffle compile
   truffle migrate --reset
   ```

4. **Run tests:**
   ```sh
   truffle test
   ```

5. **Start the frontend:**
   ```sh
   npm run dev
   ```
   This uses `lite-server` to serve the frontend at [http://localhost:3000](http://localhost:3000).

## Usage

- Open the app in your browser.
- Connect your wallet (MetaMask).
- Adopt a pet by clicking "Adopt" and confirming the transaction.
- If you are the contract owner, use the admin panel to add/remove pets or set the adoption fee.

## Smart Contracts

- [`Adoption.sol`](contracts/Adoption.sol): Main contract for pet adoption logic.
- [`Migrations.sol`](contracts/Migrations.sol): Truffle migration contract.

## Testing

Unit tests are located in the [test/](test/) directory and cover admin and adoption functionality.

## License

MIT
