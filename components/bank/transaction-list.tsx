import { ArrowDownLeft, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatINR, type Transaction } from '@/lib/bank-data'

function formatStmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  })
}

export function TransactionList({
  transactions,
  limit,
  title = 'Recent Transactions',
  onViewAll,
}: {
  transactions: Transaction[]
  limit?: number
  title?: string
  onViewAll?: () => void
}) {
  const items = limit ? transactions.slice(0, limit) : transactions

  // Compute running balance per row (latest first = highest balance shown first)
  // We need a starting balance — use the balance from account (passed via props or computed)
  // For simplicity, we'll show Dr/Cr with arrow icons and no running balance here
  // (balance card shows current balance)

  return (
    <section aria-labelledby="txn-title" className="px-4">
      <div className="mb-2 flex items-center justify-between">
        <h2 id="txn-title" className="text-sm font-semibold">
          {title}
        </h2>
        {onViewAll && (
          <button type="button" onClick={onViewAll} className="text-xs font-semibold text-primary hover:underline">
            View all
          </button>
        )}
      </div>

      {/* Statement-style table */}
      <div className="overflow-hidden rounded-2xl bg-card shadow-sm">
        {/* Header */}
        <div
          className="grid grid-cols-[1fr_auto_auto] items-center px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-white"
          style={{ background: '#003087' }}
        >
          <span>Tran Details</span>
          <span className="pr-3 text-right">Amount</span>
          <span className="text-right">Dr/Cr</span>
        </div>

        <ul className="divide-y divide-border">
          {items.map((t) => {
            const isCredit = t.type === 'credit'
            return (
              <li key={t.id} className="px-3 py-2.5">
                <div className="grid grid-cols-[1fr_auto_auto] items-start gap-1">
                  {/* Left: ID + Remarks + Date */}
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold text-muted-foreground">{t.id}</p>
                    <p className="truncate text-xs font-medium text-foreground leading-tight">{t.title}</p>
                    <p className="truncate text-[10px] text-muted-foreground leading-tight">{t.subtitle}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{formatStmtDate(t.date)}</p>
                  </div>

                  {/* Amount */}
                  <p className="pr-2 text-right text-xs font-semibold tabular-nums">
                    {formatINR(t.amount)}
                  </p>

                  {/* Dr/Cr badge */}
                  <div className="flex items-center gap-0.5">
                    <span
                      className={cn(
                        'flex size-5 items-center justify-center rounded-full',
                        isCredit ? 'bg-success/10 text-success' : 'bg-red-50 text-brand-red',
                      )}
                    >
                      {isCredit
                        ? <ArrowDownLeft className="size-3" />
                        : <ArrowUpRight className="size-3" />
                      }
                    </span>
                    <span
                      className={cn(
                        'text-[10px] font-bold',
                        isCredit ? 'text-success' : 'text-brand-red',
                      )}
                    >
                      {isCredit ? 'Cr' : 'Dr'}
                    </span>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
