import { createContext, useEffect, useState } from 'react'
import type { TransactionContextType } from '../interfaces/TransactionContextType'
import type { TransactionProviderProps } from '../interfaces/TransactionProviderProps'
import type { Transaction } from '../interfaces/Transaction'
import { api } from '../lib/axios'
import type { CreateTransactionInput } from '../interfaces/CreateTransactionInput'

export const TransactionsContext = createContext<TransactionContextType>(
  {} as TransactionContextType,
)

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function fetchTransactions(query?: string) {
    const response = await api.get('transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })

    setTransactions(response.data)
  }

  async function createTransaction(data: CreateTransactionInput) {
    const { description, type, price, category } = data

    const response = await api.post('transactions', {
      description,
      price,
      category,
      type,
      createdAt: new Date(),
    })

    setTransactions((state) => [response.data, ...state])
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
