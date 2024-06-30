import React from 'react'

export default function TransactionList({ transaction }) {

    return (
        <div className="transaction-list">
            <div>
                <strong>Transaction {transaction.transactionIndex}</strong> 
            </div>
            <div>
                <strong>Value:</strong> {parseInt(transaction.value._hex, 16)} ETH
            </div>
            <div>
                <strong>Gas Price:</strong> {parseInt(transaction.gasPrice._hex, 16)} Gwei
            </div>
            <div>
                <strong>From:</strong> {transaction.from}
            </div>
            <div>
                <strong>To:</strong> {transaction.to}
            </div>
        </div>
    );

}