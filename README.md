# Solana Token Launchpad

The **Solana Token Launchpad** is a web-based application that enables users to easily create and manage tokens on the Solana blockchain. The project offers a streamlined interface with smart contract interaction capabilities, leveraging modern web technologies for an efficient user experience.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Token Creation**: Easily create Solana SPL tokens with custom parameters.
- **Wallet Integration**: Connect your Solana wallet via Phantom or Solflare.
- **Token Management**: Mint, transfer, and manage token supply.
- **User-Friendly UI**: Intuitive web interface built with modern frameworks.

## Technologies Used

- **Frontend**: React (Vite), TypeScript, Tailwind CSS
- **Blockchain**: Solana Web3.js
- **Deployment**: Vercel for hosting
- **State Management**: React hooks and context API

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16+ recommended)
- [npm](https://www.npmjs.com/)
- A Solana wallet (e.g., Phantom)

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/IsThisHarsh/Solana-Token-Launchpad.git
   cd Solana-Token-Launchpad
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure environment variables**:

   Rename `.env.example` to `.env` and add your Solana RPC endpoint and wallet details.

## Usage

1. **Run the development server**:

   ```bash
   npm run dev
   ```

2. **Open the application**:

   Navigate to `http://localhost:5173` in your browser.

3. **Connect your wallet** and start creating tokens on the Solana blockchain.

## Screenshots

![Dashboard](screenshots/dashboard.png)  
*Dashboard showcasing token creation form.*

![Wallet Connection](screenshots/wallet.png)  
*Phantom wallet connection interface.*

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`feature/my-feature`).
3. Commit your changes.
4. Push to your branch and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

---

For more details, visit the repository: [Solana Token Launchpad](https://github.com/IsThisHarsh/Solana-Token-Launchpad).
