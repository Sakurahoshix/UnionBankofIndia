import {
  ArrowLeftRight,
  Building2,
  FileText,
  Landmark,
  PiggyBank,
  Receipt,
  Send,
  Smartphone,
  type LucideIcon,
} from 'lucide-react'

type Action = { label: string; icon: LucideIcon; onClick?: () => void }

function ActionTile({ label, icon: Icon, onClick }: Action) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-2 rounded-xl p-2 text-center transition-colors hover:bg-secondary focus-visible:bg-secondary"
    >
      <span className="flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <span className="text-[11px] font-medium leading-tight text-foreground">{label}</span>
    </button>
  )
}

export function QuickActions({ onTransfer }: { onTransfer: () => void }) {
  const primary: Action[] = [
    { label: 'UPI Pay', icon: Send, onClick: onTransfer },
    { label: 'Fund Transfer', icon: ArrowLeftRight, onClick: onTransfer },
    { label: 'Bill Pay', icon: Receipt },
    { label: 'Recharge', icon: Smartphone },
  ]

  const services: Action[] = [
    { label: 'Fixed Deposit', icon: PiggyBank },
    { label: 'Loans', icon: Landmark },
    { label: 'Cheque Book', icon: FileText },
    { label: 'Branch Locator', icon: Building2 },
  ]

  return (
    <>
      <section aria-labelledby="quick-pay" className="px-5">
        <h2 id="quick-pay" className="mb-2 text-sm font-semibold">
          Pay & Transfer
        </h2>
        <div className="grid grid-cols-4 gap-1 rounded-2xl bg-card p-2 shadow-sm">
          {primary.map((a) => (
            <ActionTile key={a.label} {...a} />
          ))}
        </div>
      </section>

      <section aria-labelledby="services" className="px-5">
        <h2 id="services" className="mb-2 text-sm font-semibold">
          Banking Services
        </h2>
        <div className="grid grid-cols-4 gap-1 rounded-2xl bg-card p-2 shadow-sm">
          {services.map((a) => (
            <ActionTile key={a.label} {...a} />
          ))}
        </div>
      </section>
    </>
  )
}
