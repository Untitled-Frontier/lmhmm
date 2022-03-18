
## Little Martians

Little Martians NFTs for the short story: Little Martians and The Human Memorial Monument. All metadata + art is on-chain.

### Technicals

- This repo is forked from the excellent https://github.com/austintgriffith/scaffold-eth.
- hardhat + waffle smart contract development.
- ethers.js.
- Custom deploy function.
- Uses modified ERC721.
- Blocknative for monitoring transactions.
- web3modal for connecting to wallets.
  
### Development & Testing

Running Locally:

### 1. Start Node + Deploy Contracts   

In primary folder:  
```yarn install```  
```yarn run chain```   
It will use the default mnemonic in ```./scripts/wallet-utils.js``` and start a local EVM.   
If you need a custom mnemonic, just:   
```export MNEMONIC="<insert_your_own_mnemonic_here>```   
```yarn run deploy_contracts_local```  
Optionally, you can modify "set_testnet_balance" to give other address some test ETH.   
Save the address manually and copy-paste it to address in react-app/src/App.js.   
```yarn run publish_contracts```  
This copies the build files to the react-app.

### 2. Start Server
Back in this repo:   
```yarn run start```

### 3. Merkle Tree

In order to use the merkle tree, you can need to edit leaves.js with the addresses that can redeem an NFT. It's in both packages and thus needs to be copied to both, such that contract gets the root and the front-end can also verify it before sending a transaction.

### License

Code License:
MIT

