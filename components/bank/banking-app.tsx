'use client'

import { useState } from 'react'
import { ACCOUNT, INITIAL_TRANSACTIONS, type Payee, type Transaction } from '@/lib/bank-data'
import { AccountOverview } from './account-overview'
import { AppHeader } from './app-header'
import { BalanceCard } from './balance-card'
import { BottomNav, type Tab } from './bottom-nav'
import { PinLogin } from './pin-login'
import { ProfileView } from './profile-view'
import { QuickActions } from './quick-actions'
import { TransactionList } from './transaction-list'
import { TransferSheet } from './transfer-sheet'

export function BankingApp() {
  const [pin, setPin] = useState<string | null>(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const [tab, setTab] = useState<Tab>('home')
  const [transferOpen, setTransferOpen] = useState(false)
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS)
  const [balance, setBalance] = useState(ACCOUNT.openingBalance)

  const handleTransfer = (payee: Payee, amount: number, note: string) => {
    setBalance((b) => b - amount)
    setTransactions((prev) => [
      {
        id: crypto.randomUUID(),
        title: payee.name,
        subtitle: note ? `UPI · ${note}` : `UPI · ${payee.handle}`,
        amount,
        type: 'debit',
        category: 'transfer',
        date: new Date().toISOString(),
      },
      ...prev,
    ])
  }

  const handleLogout = () => {
    setLoggedIn(false)
    setTransferOpen(false)
    setTab('home')
  }

  if (!loggedIn) {
    return <PinLogin savedPin="0000" onCreatePin={setPin} onLogin={() => setLoggedIn(true)} />
  }

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-background">
      <main className="flex-1 overflow-y-auto pb-6">
        {tab === 'home' && (
          <div className="flex flex-col gap-6">
            <div className="relative">
              <div className="absolute inset-x-0 top-0 h-48 rounded-b-[2rem] bg-primary" aria-hidden="true" />
              <div className="relative">
                <AppHeader onLogout={handleLogout} />
                <BalanceCard balance={balance} />
              </div>
            </div>
            <QuickActions onTransfer={() => setTransferOpen(true)} />
            <TransactionList transactions={transactions} limit={4} onViewAll={() => setTab('history')} />
          </div>
        )}

        {tab === 'history' && (
          <div className="flex flex-col gap-4 pt-6">
            <h1 className="px-5 text-xl font-semibold">Transaction History</h1>
            <TransactionList transactions={transactions} title="All transactions" />
          </div>
        )}

        {tab === 'overview' && <AccountOverview />}
        {tab === 'profile' && <ProfileView onLogout={handleLogout} />}
      </main>

      <BottomNav active={tab} onChange={setTab} onPay={() => setTransferOpen(true)} />

      <TransferSheet
        open={transferOpen}
        balance={balance}
        onClose={() => setTransferOpen(false)}
        onConfirm={handleTransfer}
      />
    </div>
  )
}
