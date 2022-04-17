import * as React from "react";
//import { ethers } from "ethers";
import './App.css';

export default function App() {

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