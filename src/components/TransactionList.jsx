const TransactionList = ({ transactions, deleteTransaction }) => {
  return (
    <div className="transaction-list">
      <h3>Transaction History</h3>
      <ul className="list">
        {transactions.map(transaction => (
          <li key={transaction.id} className={transaction.amount < 0 ? 'minus' : 'plus'}>
            {transaction.description} <span>{transaction.amount < 0 ? '-' : '+'}Rs {Math.abs(transaction.amount)}</span>
            {transaction.category && <span className="category"> ({transaction.category})</span>}
            <button onClick={() => deleteTransaction(transaction.id)} className="delete-btn">x</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
