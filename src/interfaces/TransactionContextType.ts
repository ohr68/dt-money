import type { CreateTransactionInput } from './CreateTransactionInput'
import type { Transaction } from './Transaction'

export interface TransactionContextType {
  transactions: Transaction[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
}
