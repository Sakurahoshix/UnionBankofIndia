'use client'

import { useState } from 'react'
import { ArrowLeft, Check, Copy } from 'lucide-react'
import { ACCOUNT } from '@/lib/bank-data'

const DETAILS = [
  { label: 'Account Holder Name', value: ACCOUNT.holder },
  { label: 'Account Number', value: ACCOUNT.fullNumber, copy: true },
  { label: 'Account Type', value: ACCOUNT.type },
  { label: 'Customer ID', value: ACCOUNT.customerId, copy: true },
  { label: 'IFSC Code', value: ACCOUNT.ifsc, copy: true },
  { label: 'MICR Code', value: ACCOUNT.micr, copy: true },
  { label: 'Branch', value: ACCOUNT.branch },
  { label: 'Registered Mobile', value: ACCOUNT.mobile },
  { label: 'Email', value: ACCOUNT.email },
  { label: 'Communication Address', value: ACCOUNT.address },
]

export function AccountDetails({ onBack }: { onBack: () => void }) {
  const [copied, setCopied] = useState<string | null>(null)

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
    <div className="flex flex-col gap-5 px-5 pt-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex size-9 items-center justify-center rounded-full bg-card shadow-sm hover:bg-muted"
          aria-label="Back to profile"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
        </button>
        <h1 className="text-xl font-semibold">Account Details</h1>
      </div>

      <div className="flex flex-col items-center gap-2 rounded-2xl bg-primary p-5 text-primary-foreground">
        <div className="flex size-16 items-center justify-center rounded-full bg-primary-foreground/15 text-xl font-semibold">
          AS
        </div>
        <p className="text-lg font-semibold">{ACCOUNT.holder}</p>
        <p className="text-xs text-primary-foreground/70">Customer ID {ACCOUNT.customerId}</p>
      </div>

      <dl className="divide-y rounded-2xl bg-card shadow-sm">
        {DETAILS.map(({ label, value, copy }) => (
          <div key={label} className="flex items-start gap-3 px-4 py-3">
            <div className="min-w-0 flex-1">
              <dt className="text-xs text-muted-foreground">{label}</dt>
              <dd className="mt-0.5 text-sm font-medium leading-relaxed text-pretty">{value}</dd>
            </div>
            {copy && (
              <button
                type="button"
                onClick={() => handleCopy(label, value)}
                className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full text-primary hover:bg-secondary"
                aria-label={copied === label ? `${label} copied` : `Copy ${label}`}
              >
                {copied === label ? (
                  <Check className="size-4" aria-hidden="true" />
                ) : (
                  <Copy className="size-4" aria-hidden="true" />
                )}
              </button>
            )}
          </div>
        ))}
      </dl>
    </div>
  )
}
