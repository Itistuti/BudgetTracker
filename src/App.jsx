import { useEffect, useMemo, useState } from 'react'
import AddTransaction from './components/AddTransaction'
import Balance from './components/Balance'
import Filter from './components/Filter'
import SearchBar from './components/SearchBar'
import TransactionList from './components/TransactionList'
import './App.css'

const STORAGE_KEY = 'budget-tracker-transactions'

function App() {
  const [transactions, setTransactions] = useState(() => {
    if (typeof window === 'undefined') return []

    try {
      const storedTransactions = window.localStorage.getItem(STORAGE_KEY)
      return storedTransactions ? JSON.parse(storedTransactions) : []
    } catch {
      return []
    }
  })

  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
  }, [transactions])

  const addTransaction = (transaction) => {
    setTransactions((current) => [transaction, ...current])
  }

  const deleteTransaction = (id) => {
    setTransactions((current) =>
      current.filter((transaction) => transaction.id !== id)
    )
  }

  const filteredTransactions = useMemo(() => {
    const lowerSearchTerm = searchTerm.toLowerCase().trim()

    return transactions.filter((transaction) => {
      const matchesSearch = transaction.description
        .toLowerCase()
        .includes(lowerSearchTerm)

      const matchesFilter =
        filter === 'All' ||
        transaction.type.toLowerCase() === filter.toLowerCase()

      return matchesSearch && matchesFilter
    })
  }, [transactions, searchTerm, filter])

  const incomeTotal = useMemo(
    () =>
      transactions
        .filter((t) => t.type === 'Income')
        .reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  )

  const expenseTotal = useMemo(
    () =>
      transactions
        .filter((t) => t.type === 'Expense')
        .reduce((sum, t) => sum + Math.abs(t.amount), 0),
    [transactions]
  )

  const balance = incomeTotal - expenseTotal

  return (
    <main className="app-shell">
      <header className="navbar">
        <h1>Budget Tracker</h1>
        <p>
          Track income, expenses, and balance in one place.
          Add transactions, filter by type, search by description,
          and keep everything saved after refresh.
        </p>
      </header>

      <section className="top-dashboard">

        <div className="search-box">
          <SearchBar setSearchTerm={setSearchTerm} />
        </div>

        <div className="mini-card">
          <span>Total Income</span>
          <strong>{incomeTotal.toFixed(2)}</strong>
        </div>

        <div className="mini-card">
          <span>Total Expense</span>
          <strong>{expenseTotal.toFixed(2)}</strong>
        </div>

        <div className="mini-card">
          <span>Total Balance</span>
          <strong>{balance.toFixed(2)}</strong>
        </div>

      </section>

      <section className="dashboard-grid">

        <div className="panel stack">
          <AddTransaction addTransaction={addTransaction} />

          <div className="panel-section">
            <Filter setFilter={setFilter} />
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h2>Transaction History</h2>
            <p className="muted">
              {filteredTransactions.length} item(s)
            </p>
          </div>

          <Balance transactions={transactions} />

          <TransactionList
            transactions={filteredTransactions}
            deleteTransaction={deleteTransaction}
          />
        </div>

      </section>

    </main>
  )
}

export default App