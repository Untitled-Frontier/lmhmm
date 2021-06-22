const defaultAccounts = require("./scripts/wallet-utils.js");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-web3");
require("hardhat-gas-reporter");
require("@nomiclabs/hardhat-etherscan");

let infuraID = process.env.REACT_APP_INFURA_ID; 
let CMC = process.env.CMC_KEY; // used for gas reporter

const deployAccounts = defaultAccounts();

module.exports = {
  defaultNetwork: 'localhost',
  networks: {
    localhost: {
      url: 'http://localhost:8545',
    },
    hardhat: {
      accounts: defaultAccounts(),
      gas: 9500000,
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${infuraID}`,
      accounts: [deployAccounts[0].privateKey],
      gasPrice: 80e9
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${infuraID}`,
      accounts: [deployAccounts[0].privateKey],
      gasPrice: 10e9
    }
  },
  etherscan: {
    apiKey: ''
  },
  solidity: {
    version : "0.8.4",
  },
  gasReporter: {
    currency: 'USD',
    gasPrice: 34,
    coinmarketcap: CMC
  }
}