import { createContext, useEffect, useState } from 'react'
import type { TransactionContextType } from '../interfaces/TransactionContextType'
import type { TransactionProviderProps } from '../interfaces/TransactionProviderProps'
import type { Transaction } from '../interfaces/Transaction'

export const TransactionsContext = createContext<TransactionContextType>(
  {} as TransactionContextType,
)

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function loadTransactions() {
    const response = await fetch('http://localhost:3333/transactions')
    const data = await response.json()

    setTransactions(data)
  }

  useEffect(() => {
    loadTransactions()
  }, [])

  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  )
}
