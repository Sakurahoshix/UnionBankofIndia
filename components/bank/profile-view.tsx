'use client'

import { useState } from 'react'
import { ChevronRight, FileText, HelpCircle, KeyRound, LogOut, ShieldCheck, UserRound, Users } from 'lucide-react'
import { ACCOUNT } from '@/lib/bank-data'
import { AccountDetails } from './account-details'

const ITEMS = [
  { label: 'Manage Beneficiaries', icon: Users },
  { label: 'Change MPIN', icon: KeyRound },
  { label: 'Security Settings', icon: ShieldCheck },
  { label: 'Download Statements', icon: FileText },
  { label: 'Help & Support', icon: HelpCircle },
]

export function ProfileView({ onLogout }: { onLogout: () => void }) {
  const [showDetails, setShowDetails] = useState(false)

  if (showDetails) {
    return <AccountDetails onBack={() => setShowDetails(false)} />
  }

  return (
    <div className="flex flex-col gap-6 px-5 pt-6">
      <h1 className="text-xl font-semibold">Profile</h1>

      <button
        type="button"
        onClick={() => setShowDetails(true)}
        className="flex items-center gap-4 rounded-2xl bg-card p-4 text-left shadow-sm transition-colors hover:bg-muted/60"
        aria-label="View account details"
      >
        <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
          AS
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold">{ACCOUNT.holder}</p>
          <p className="text-xs text-muted-foreground">{ACCOUNT.type} · {ACCOUNT.number}</p>
          <p className="text-xs font-medium text-primary">View account details</p>
        </div>
        <ChevronRight className="size-4 text-muted-foreground" aria-hidden="true" />
      </button>

      <ul className="divide-y rounded-2xl bg-card shadow-sm">
        <li>
          <button
            type="button"
            onClick={() => setShowDetails(true)}
            className="flex w-full items-center gap-3 px-4 py-3.5 text-left hover:bg-muted/60"
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-secondary text-primary">
              <UserRound className="size-4" aria-hidden="true" />
            </span>
            <span className="flex-1 text-sm font-medium">Account Details</span>
            <ChevronRight className="size-4 text-muted-foreground" aria-hidden="true" />
          </button>
        </li>
        {ITEMS.map(({ label, icon: Icon }) => (
          <li key={label}>
            <button type="button" className="flex w-full items-center gap-3 px-4 py-3.5 text-left hover:bg-muted/60">
              <span className="flex size-9 items-center justify-center rounded-full bg-secondary text-primary">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <span className="flex-1 text-sm font-medium">{label}</span>
              <ChevronRight className="size-4 text-muted-foreground" aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onLogout}
        className="mb-6 flex items-center justify-center gap-2 rounded-2xl border border-brand-red/30 py-3 text-sm font-semibold text-brand-red hover:bg-brand-red/5"
      >
        <LogOut className="size-4" aria-hidden="true" />
        Log out
      </button>
    </div>
  )
}
