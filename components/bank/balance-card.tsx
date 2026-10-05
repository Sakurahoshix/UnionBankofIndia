'use client'

import { useState } from 'react'
import { ChevronRight, Copy, Eye, EyeOff } from 'lucide-react'
import { ACCOUNT, formatINR } from '@/lib/bank-data'

export function BalanceCard({ balance }: { balance: number }) {
  const [visible, setVisible] = useState(false)

  return (
    <section
      aria-label="Account balance"
      className="mx-5 rounded-2xl bg-card p-5 text-card-foreground shadow-lg shadow-primary/10"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {ACCOUNT.type}
          </p>
          <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <span>{ACCOUNT.number}</span>
            <button
              type="button"
              aria-label="Copy account number"
              className="rounded p-0.5 hover:text-foreground"
              onClick={() => navigator.clipboard?.writeText(ACCOUNT.number)}
            >
              <Copy className="size-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
        <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-secondary-foreground">
          Primary
        </span>
      </div>

      <div className="mt-5">
        <p className="text-xs text-muted-foreground">Available balance</p>
        <div className="mt-1 flex items-center gap-3">
          <p className="text-3xl font-bold tracking-tight tabular-nums" aria-live="polite">
            {visible ? formatINR(balance) : '₹ ••••••'}
          </p>
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? 'Hide balance' : 'Show balance'}
            className="rounded-full p-1.5 text-primary hover:bg-secondary"
          >
            {visible ? <EyeOff className="size-5" aria-hidden="true" /> : <Eye className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t pt-4 text-sm">
        <span className="text-muted-foreground">IFSC: {ACCOUNT.ifsc}</span>
        <button type="button" className="flex items-center gap-0.5 font-semibold text-primary hover:underline">
          Statement
          <ChevronRight className="size-4" aria-hidden="true" />
        </button>
      </div>
    </section>
  )
}
