import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import TransactionList from './components/TransactionList'

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);



function App() {

  const [blockNumber, setBlockNumber] = useState();
  const [blockDetails, setBlockDetails] = useState({
    hash: '',
    timestamp: '',
  });
  const [txns, setTxns] = useState([]);


  useEffect(() => {
    async function getBlockNumber() {
      const blockNumber = await alchemy.core.getBlockNumber()
      setBlockNumber(blockNumber);

      getBlock(blockNumber);
      getBlockDetails(blockNumber)
    }

    async function getBlock(blockNumber) {
      setBlockDetails(await alchemy.core.getBlock(blockNumber))

    }
    
    async function getBlockDetails(blockNumber) {
      const blockTxns = await alchemy.core.getBlockWithTransactions(blockNumber);
      setTxns(blockTxns.transactions);

    }

    getBlockNumber();


  });

  return (
    <div className="App">
      <h1>Block Number: {blockNumber}</h1>
      <h2>Block Hash: {blockDetails.hash}</h2>
      <h2>Block Timestamp: {blockDetails.timestamp}</h2>
      <div className="transaction-list">
        {txns.slice(0, 21).map((transaction, index) => (
          <TransactionList key={index} transaction={transaction} />
        ))}
      </div>

    </div>
  );
}

export default App;
