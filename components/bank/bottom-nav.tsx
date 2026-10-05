import { FileText, History, Home, Send, User } from 'lucide-react'
import { cn } from '@/lib/utils'

export type Tab = 'home' | 'history' | 'overview' | 'profile'

const TABS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'history', label: 'History', icon: History },
  { id: 'overview', label: 'Overview', icon: FileText },
  { id: 'profile', label: 'Profile', icon: User },
] as const

export function BottomNav({
  active,
  onChange,
  onPay,
}: {
  active: Tab
  onChange: (tab: Tab) => void
  onPay: () => void
}) {
  const renderTab = (t: (typeof TABS)[number]) => {
    const isActive = active === t.id
    return (
      <button
        key={t.id}
        type="button"
        onClick={() => onChange(t.id)}
        aria-current={isActive ? 'page' : undefined}
        className={cn(
          'flex flex-1 flex-col items-center gap-1 py-2 text-[11px] font-medium transition-colors',
          isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
        )}
      >
        <t.icon className="size-5" aria-hidden="true" />
        {t.label}
      </button>
    )
  }

  return (
    <nav aria-label="Main" className="flex items-end border-t bg-card px-2 pb-3 pt-1">
      {TABS.slice(0, 2).map(renderTab)}
      <div className="flex flex-1 justify-center">
        <button
          type="button"
          onClick={onPay}
          className="-mt-7 flex size-14 items-center justify-center rounded-full bg-brand-red text-primary-foreground shadow-lg shadow-brand-red/30 ring-4 ring-background transition-transform hover:scale-105"
          aria-label="Send money"
        >
          <Send className="size-5" aria-hidden="true" />
        </button>
      </div>
      {TABS.slice(2).map(renderTab)}
    </nav>
  )
}
