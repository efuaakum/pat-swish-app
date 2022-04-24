import React, {useEffect, useState} from "react";
import { ethers } from "ethers";
import './App.css';
import abi from "./utils/PatSwishPortal.json";

const  App = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [allSwishes, setAllSwishes] = useState([]);
  const [message, setMessage] = useState('');
  const contractAddress = "0xcBe1fE6D6ba4E69f3737595B0B132AC2c89A3D2e";
  const contractABI = abi.abi;

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }

  const swish = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const patSwishPortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        let count = await patSwishPortalContract.getTotalSwishes();
        console.log("Retrieved total swish count...", count.toNumber());

        const swishTxn = await patSwishPortalContract.swish(message);
        console.log("Mining...", swishTxn.hash);

        await swishTxn.wait();
        console.log("Mined -- ", swishTxn.hash);

        count = await patSwishPortalContract.getTotalSwishes();
        console.log("Retrieved total swish count...", count.toNumber());

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const messageUpdate = (event) => {
    setMessage(event.target.value);
  }

  useEffect(() => {

    const checkIfWalletIsConnected = async () => {
      try {
        const { ethereum } = window;
  
        if (!ethereum) {
          console.log("Make sure you have metamask!");
          return;
        } else {
          console.log("We have the ethereum object", ethereum);
        }
  
        const accounts = await ethereum.request({ method: "eth_accounts" });
  
        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log("Found an authorized account:", account);
          setCurrentAccount(account);
          getAllSwishes();
        } else {
          console.log("No authorized account found")
        }
      } catch (error) {
        console.log(error);
      }
    }
    
  const getAllSwishes = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const patSwishPortalContract = new ethers.Contract(contractAddress, contractABI, signer);
  
        const swishes = await patSwishPortalContract.getAllSwishes();
  
        let swishesCleaned = [];
        swishes.forEach(swish => {
          swishesCleaned.push({
            address: swish.swisher,
            timestamp: new Date(swish.timestamp * 1000),
            message: swish.message
          });
        });
  
        setAllSwishes(swishesCleaned);
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error);
    }
  }

    checkIfWalletIsConnected();
  }, [contractABI])
  
  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
        Hola, Bonjour, Hei, Hallo, Ciao, 你好, Akwaaba!
        </div>

        <div className="bio">
        Is there anyone out there? <br/>Connect your Ethereum wallet, say hello and swish at me!
        </div>
     

        <label class="swishText">
          Message:
          <textarea type="text" value={message} onChange={messageUpdate}/>
        </label>

        <button className="swishButton" onClick={swish}>
          Swish Your Hair 👩🏿‍🦱
        </button>

        {!currentAccount && (
          <button className="swishButton" onClick={connectWallet}>
            Connect Wallet 👛
          </button>
        )}

        {allSwishes.map((swish, index) => {
          return (
            <div key={index} style={{ backgroundColor: "OldLace", marginTop: "16px", padding: "8px" }}>
              <div>Address: {swish.address}</div>
              <div>Time: {swish.timestamp.toString()}</div>
              <div>Message: {swish.message}</div>
            </div>)
        })}
      </div>
    </div>
  );
}
export default App;