import { useState } from 'react';

const AddTransaction = ({ addTransaction }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('Income');
  const [category, setCategory] = useState('Food');

  const onSubmit = (e) => {
    e.preventDefault();

    if (!description || !amount) {
      alert('Please add a description and amount');
      return;
    }

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      description,
      amount: type === 'Expense' ? -parseFloat(amount) : +parseFloat(amount),
      type,
      category: type === 'Expense' ? category : null,
    };

    addTransaction(newTransaction);

    setDescription('');
    setAmount('');
  };

  return (
    <div className="add-transaction">
      <h3>Add New Transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description..."
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
          />
        </div>
        <div className="form-control">
          <label htmlFor="type">Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>
        {type === 'Expense' && (
          <div className="form-control">
            <label htmlFor="category">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Shopping">Shopping</option>
              <option value="Education">Education</option>
              <option value="Entertainment">Entertainment</option>
            </select>
          </div>
        )}
        <button className="btn">Add Transaction</button>
      </form>
    </div>
  );
};

export default AddTransaction;
