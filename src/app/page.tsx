//import React from 'react';
"use client";
import React, {useState, useEffect} from "react";
import Web3Modal from 'Web3Modal';
import {ethers} from "ethers";
import { JsonRpcProvider } from "ethers";
import {formatEther} from "ethers";
import Image from "next/image";

//const provider = new JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`);

import imageEth from '../monkey.jpg';
import creator from "../solidity.png";

const home = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [connect, setConnect] = useState(false);
  const[balance, setBalance] = useState('');

  const failMessage = "please install metamask and connect your metamask";
  const successMessage = "your Account Successfully connected to metamask";

  const INFURA_ID = "cebe041e624f4b7c895193243505a496";
  //const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`);
  //const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`);
  // const ethers = require("ethers");
  // const { providers } = require("ethers");
  // const provider = new providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`);
  //import { JsonRpcProvider } from "ethers";
  const provider = new JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`);

//console.log(provider);

  const checkIfWalletConnected = async()=>{
    if(!window.ethereum) return;
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    //console.log(accounts);
    if(accounts.length){
      setCurrentAccount(accounts[0]);
    }else{
      console.log("Fail");
    }
    const address = "0x8B4de256180CFEC54c436A470AF50F9EE2813dbB";
    const balance = await provider.getBalance(address);

    const showBalance = `${formatEther(balance)} ETH\n`;
    //console.log(showBalance);
    setBalance(showBalance);

  };

  const cWallet = async()=>{
    if(!window.ethereum) return console.log(failMessage);

    const accounts = await window.ethereum.request({method: "eth_requestAccounts"});

    setCurrentAccount(accounts[0]);

    window.location.reload();

  }

  useEffect(()=>{
    checkIfWalletConnected();
  });

  useEffect(()=>{
    async function accountChanged(){
      window.ethereum.on('accountsChanged', async function(){
        const accounts = await window.ethereum.request({method:"eth_accounts", });
        if(accounts.length){
          setCurrentAccount(accounts[0])
        }else{
          window.location.reload();
        }
      });
    }
    accountChanged();
  }, []);


  return (
    <div className="card-container">
      {!currentAccount ? "" : <span className="pro">PRO</span>}
      <Image src={"/monkey.jpg"} alt='profile' width={80} height={80}/>
      <h3>Check Ether</h3>

      {!currentAccount ? (
        <div>
        <div className="message">
          <p>{failMessage}</p>
        </div>
        <Image src={"/solidity.png"} alt ='ether' width={100} height={100}/>
        <p>Welcome to Ether account balance checker</p>
        </div>
      ) : (
        <div>
          <h6>Verified <span className="Tick">&#10004;</span></h6>
          <p>Ether account and balance checker <br /> find account details </p>
          <div className="buttons">
            <button className="primary ghost" onClick={()=>{}}>Ether Account Details</button>
          </div>
        </div>  
      )}
      {!currentAccount && !connect ? (
        <div className="buttons">
          <button className="primary" onClick={()=>cWallet()}>Connect Wallet</button>
        </div>
      ) : (
          <div className="skills">
            <h6>Your Ether</h6>
            <ul>
              <li>Account</li>
              <li>{currentAccount}</li>
              <li>Balance</li>
              <li>{balance}</li>
            </ul>
          </div>
      )}
    </div>
  );
};

export default home