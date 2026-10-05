'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { ACCOUNT, INITIAL_TRANSACTIONS, formatINR, formatTxnDate } from '@/lib/bank-data'
import { cn } from '@/lib/utils'
import { UBILogoText } from './ubi-logo-text'

const ACCOUNT_ROWS = [
  { label: 'Name', value: ACCOUNT.holder },
  { label: 'A/C No.', value: ACCOUNT.fullNumber, copy: true },
  { label: 'Type', value: ACCOUNT.type },
  { label: 'IFSC', value: ACCOUNT.ifsc, copy: true },
  { label: 'MICR', value: ACCOUNT.micr, copy: true },
  { label: 'CIF No.', value: ACCOUNT.cifNumber, copy: true },
  { label: 'Customer ID', value: ACCOUNT.customerId, copy: true },
  { label: 'Branch', value: 'Fatehganj (Paschimi), Bareilly' },
  { label: 'Opening Date', value: ACCOUNT.dateOfOpening },
  { label: 'Occupation', value: ACCOUNT.occupation },
  { label: 'Mobile', value: ACCOUNT.mobile },
  { label: 'Email', value: ACCOUNT.email },
  { label: 'PAN', value: ACCOUNT.pan },
  { label: 'Nomination', value: 'Registered (Wife)' },
  { label: 'Address', value: ACCOUNT.address },
]

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    timeZone: 'Asia/Kolkata',
  })
}

export function AccountOverview() {
  const [copied, setCopied] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'details' | 'statement'>('details')

  const handleCopy = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value.replace(/\s/g, ''))
      setCopied(label)
      setTimeout(() => setCopied((c) => (c === label ? null : c)), 1500)
    } catch {
      setCopied(null)
    }
  }

  return (
    <div className="flex h-full flex-col">
      {/* UBI Header Banner */}
      <div
        className="px-4 pt-6 pb-4"
        style={{ background: 'linear-gradient(135deg, #003087 0%, #00205C 100%)' }}
      >
        <div className="flex items-center gap-3">
          {/* UBI Logo */}
          <div className="rounded-xl overflow-hidden bg-white px-3 py-1.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/ubi-logo.png" alt="Union ease" className="h-9 w-auto object-contain" />
          </div>
          <div>
            <p className="text-[10px] font-semibold tracking-widest text-white/60 uppercase">Union Bank of India</p>
            <p className="text-base font-bold text-white leading-tight">Account Overview</p>
          </div>
        </div>

        {/* Mini balance strip */}
        <div className="mt-3 flex items-center justify-between rounded-xl px-3 py-2"
          style={{ background: 'rgba(255,255,255,0.10)' }}>
          <div>
            <p className="text-[10px] text-white/60">Available Balance</p>
            <p className="text-lg font-bold text-white">{formatINR(222_469)}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-white/60">Account No.</p>
            <p className="text-xs font-semibold text-white">{ACCOUNT.number}</p>
          </div>
        </div>
      </div>

      {/* Tab switcher */}
      <div className="flex border-b border-border bg-card">
        <button
          type="button"
          onClick={() => setActiveTab('details')}
          className={cn(
            'flex-1 py-2.5 text-xs font-bold transition-colors',
            activeTab === 'details'
              ? 'border-b-2 text-primary'
              : 'text-muted-foreground hover:text-foreground',
          )}
          style={activeTab === 'details' ? { borderColor: '#003087' } : {}}
        >
          Account Details
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('statement')}
          className={cn(
            'flex-1 py-2.5 text-xs font-bold transition-colors',
            activeTab === 'statement'
              ? 'border-b-2 text-primary'
              : 'text-muted-foreground hover:text-foreground',
          )}
          style={activeTab === 'statement' ? { borderColor: '#003087' } : {}}
        >
          Statement
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'details' && (
          <dl className="divide-y divide-border">
            {ACCOUNT_ROWS.map(({ label, value, copy }) => (
              <div key={label} className="flex items-start gap-2 px-4 py-2.5">
                <div className="min-w-0 flex-1">
                  <dt className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</dt>
                  <dd className="mt-0.5 text-xs font-medium text-foreground leading-snug">{value}</dd>
                </div>
                {copy && (
                  <button
                    type="button"
                    onClick={() => handleCopy(label, value)}
                    className="mt-1 flex size-7 shrink-0 items-center justify-center rounded-full text-primary hover:bg-secondary"
                    aria-label={copied === label ? `${label} copied` : `Copy ${label}`}
                  >
                    {copied === label
                      ? <Check className="size-3.5" />
                      : <Copy className="size-3.5" />
                    }
                  </button>
                )}
              </div>
            ))}
          </dl>
        )}

        {activeTab === 'statement' && (
          <div>
            {/* Statement header like UBI */}
            <div className="px-4 py-2 bg-muted/50 border-b border-border">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
                Statement Period: 29/09/2026 – 05/10/2026
              </p>
            </div>

            {/* Column headers */}
            <div
              className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-2 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-white"
              style={{ background: '#003087' }}
            >
              <span>Tran ID</span>
              <span>Remarks</span>
              <span className="text-right">Amount</span>
              <span className="text-right">Dr/Cr</span>
            </div>

            <ul className="divide-y divide-border">
              {INITIAL_TRANSACTIONS.map((t) => {
                const isCredit = t.type === 'credit'
                return (
                  <li key={t.id} className="grid grid-cols-[auto_1fr_auto_auto] items-start gap-2 px-3 py-2">
                    <div className="pt-0.5">
                      <p className="text-[9px] font-semibold text-muted-foreground">{t.id}</p>
                      <p className="text-[9px] text-muted-foreground">{formatDate(t.date)}</p>
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-[11px] font-semibold text-foreground">{t.title}</p>
                      <p className="truncate text-[9px] text-muted-foreground">{t.subtitle}</p>
                    </div>
                    <p className="pt-0.5 text-right text-[11px] font-bold tabular-nums text-foreground">
                      {formatINR(t.amount)}
                    </p>
                    <span
                      className={cn(
                        'mt-0.5 rounded px-1.5 py-0.5 text-[9px] font-bold',
                        isCredit
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700',
                      )}
                    >
                      {isCredit ? 'Cr' : 'Dr'}
                    </span>
                  </li>
                )
              })}
            </ul>

            {/* Closing balance */}
            <div
              className="flex items-center justify-between px-4 py-3 border-t border-border"
              style={{ background: '#f0f4ff' }}
            >
              <p className="text-xs font-bold" style={{ color: '#003087' }}>Closing Balance</p>
              <p className="text-sm font-bold" style={{ color: '#003087' }}>{formatINR(222_469)}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
