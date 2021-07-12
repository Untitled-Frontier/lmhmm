import React, { useEffect } from 'react';
import { ethers } from "ethers";
import { Link } from 'react-router-dom';
import Web3Modal from "web3modal";
import { Address } from "."
import { usePoller } from "../hooks"
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Button } from 'antd';

const INFURA_ID = process.env.REACT_APP_INFURA_ID;

const web3Modal = new Web3Modal({
  //network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: INFURA_ID
      }
    }
  }
});

export default function Account(props) {

  const loadWeb3Modal = async () => {
    const provider = await web3Modal.connect();
    await props.setInjectedProvider(new ethers.providers.Web3Provider(provider))
  };

  const logoutOfWeb3Modal = async ()=>{
    const clear = await web3Modal.clearCachedProvider();
    setTimeout(()=>{
      window.location.reload()
    },1)
  }

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      loadWeb3Modal();
    }
  }, []); // runs once if cached provider exist

  useEffect(() => {
    pollInjectedProvider();
  }, [props.injectedProvider]);

  const pollInjectedProvider = async () => {
    if(props.injectedProvider){
      let accounts = await props.injectedProvider.listAccounts()
      if(accounts && accounts[0] && accounts[0] != props.account){
        //console.log("ADDRESS: ",accounts[0])
        if(typeof props.setAddress == "function") props.setAddress(accounts[0])
      }
    }
  }

  // turn on address poller for injected provider
  usePoller(()=>{pollInjectedProvider()},props.pollTime?props.pollTime:1999)
  
  let modalButtons = []
  if (web3Modal.cachedProvider) {
    modalButtons.push(
      <Button key="logoutbutton" style={{verticalAlign:"top",marginLeft:8,marginTop:2}} size={"small"} onClick={logoutOfWeb3Modal}>Log Out</Button>
    )
  }else{
    modalButtons.push(
      <Button key="loginbutton" style={{verticalAlign:"top",marginLeft:8,marginTop:2}} size={"small"} onClick={loadWeb3Modal}>Connect Wallet</Button>
    )
  }    
  
  let displayAddress;
  if(props.address) {
    displayAddress = <Address value={props.address} ensProvider={props.mainnetProvider}/>;
  }

  return (
    <div className="account" >
      <span style={{float:"left",marginTop:"4px"}}> <h3><Link to="/">ANCHOR CERTIFICATES</Link> - <Link to="/stats">STATS</Link></h3>
      
      </span>
      {displayAddress}
      {modalButtons}
      <hr />
    </div>
  );
  
}
