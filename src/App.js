import React, {useEffect} from "react";
//import { ethers } from "ethers";
import './App.css';

export default function App() {

  const checkIfWalletIsConnected = () => {
    /*
    * First make sure we have access to window.ethereum
    */
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
    } else {
      console.log("We have the ethereum object", ethereum);
    }
  }

  /*
  * This runs our function when the page loads.
  */
  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  const swish = () => {
    
  }
  
  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
        Hola, Bonjour, Akwaaba!
        </div>

        <div className="bio">
        Is there anyone out there? Connect your Ethereum wallet and swish at me!
        </div>

        <button className="swishButton" onClick={swish}>
          Swish your hair
        </button>
      </div>
    </div>
  );
}