'use client'

import { useState } from 'react'
import { CheckCircle2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { PAYEES, formatINR, type Payee } from '@/lib/bank-data'

type Props = {
  open: boolean
  balance: number
  onClose: () => void
  onConfirm: (payee: Payee, amount: number, note: string) => void
}

export function TransferSheet({ open, balance, onClose, onConfirm }: Props) {
  const [payeeId, setPayeeId] = useState(PAYEES[0].id)
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<{ name: string; amount: number } | null>(null)

  if (!open) return null

  const reset = () => {
    setAmount('')
    setNote('')
    setError(null)
    setSuccess(null)
  }

  const close = () => {
    reset()
    onClose()
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const value = Number(amount)
    if (!Number.isFinite(value) || value <= 0) return setError('Enter a valid amount.')
    if (value > 100000) return setError('UPI limit is ₹1,00,000 per transaction.')
    if (value > balance) return setError('Insufficient balance.')
    const payee = PAYEES.find((p) => p.id === payeeId)!
    onConfirm(payee, Math.round(value * 100) / 100, note.trim())
    setSuccess({ name: payee.name, amount: value })
  }

  return (
    <div className="absolute inset-0 z-50 flex items-end bg-foreground/40 animate-in fade-in" onClick={close}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="transfer-title"
        className="w-full rounded-t-3xl bg-card p-5 pb-8 animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 id="transfer-title" className="text-lg font-semibold">
            {success ? 'Payment Successful' : 'Send Money'}
          </h2>
          <button type="button" onClick={close} aria-label="Close" className="rounded-full p-1.5 hover:bg-muted">
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        {success ? (
          <div className="flex flex-col items-center py-4 text-center">
            <CheckCircle2 className="size-16 text-success" aria-hidden="true" />
            <p className="mt-4 text-3xl font-bold tabular-nums">{formatINR(success.amount)}</p>
            <p className="mt-1 text-sm text-muted-foreground">sent to {success.name}</p>
            <p className="mt-1 text-xs text-muted-foreground">Ref. No. {Date.now().toString().slice(-12)}</p>
            <Button className="mt-6 h-11 w-full" onClick={close}>
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-5">
            <fieldset>
              <legend className="mb-2 text-xs font-medium text-muted-foreground">Select payee</legend>
              <div className="flex gap-3 overflow-x-auto pb-1">
                {PAYEES.map((p) => (
                  <label key={p.id} className="flex w-16 shrink-0 cursor-pointer flex-col items-center gap-1.5">
                    <input
                      type="radio"
                      name="payee"
                      value={p.id}
                      checked={payeeId === p.id}
                      onChange={() => setPayeeId(p.id)}
                      className="peer sr-only"
                    />
                    <span
                      className={cn(
                        'flex size-12 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-primary ring-offset-2 ring-offset-card peer-focus-visible:ring-2 peer-focus-visible:ring-ring',
                        payeeId === p.id && 'bg-primary text-primary-foreground',
                      )}
                    >
                      {p.initials}
                    </span>
                    <span className="w-full truncate text-center text-[11px]">{p.name}</span>
                  </label>
                ))}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {PAYEES.find((p) => p.id === payeeId)?.handle}
              </p>
            </fieldset>

            <div>
              <label htmlFor="amount" className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Amount
              </label>
              <div className="flex items-center rounded-xl border bg-background px-4 focus-within:ring-2 focus-within:ring-ring">
                <span className="text-2xl font-semibold text-muted-foreground">₹</span>
                <input
                  id="amount"
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => {
                    setError(null)
                    setAmount(e.target.value.replace(/[^\d.]/g, ''))
                  }}
                  placeholder="0"
                  className="h-14 w-full bg-transparent px-2 text-2xl font-semibold tabular-nums outline-none"
                  aria-invalid={!!error}
                  aria-describedby="amount-help"
                />
              </div>
              <p id="amount-help" className={cn('mt-1.5 text-xs', error ? 'text-destructive' : 'text-muted-foreground')}>
                {error ?? `Available: ${formatINR(balance)}`}
              </p>
            </div>

            <div>
              <label htmlFor="note" className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Remarks (optional)
              </label>
              <input
                id="note"
                value={note}
                maxLength={50}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g. Dinner split"
                className="h-11 w-full rounded-xl border bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <Button type="submit" className="h-12 w-full text-base">
              Pay {amount && Number(amount) > 0 ? formatINR(Number(amount)) : ''}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
