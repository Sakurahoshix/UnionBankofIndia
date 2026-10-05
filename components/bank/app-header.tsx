import { Bell, LogOut, QrCode } from 'lucide-react'
import { ACCOUNT } from '@/lib/bank-data'

export function AppHeader({ onLogout }: { onLogout: () => void }) {
  const firstName = ACCOUNT.holder.split(' ')[1] ?? ACCOUNT.holder.split(' ')[0]

  return (
    <header className="flex items-center justify-between px-5 pt-6 pb-4 text-primary-foreground">
      <div className="flex items-center gap-3">
        {/* UBI Logo */}
        <div className="rounded-xl overflow-hidden bg-white px-3 py-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/ubi-logo.png" alt="Union ease" className="h-7 w-auto object-contain" />
        </div>
        <p className="text-sm font-semibold text-white">Hello, {firstName}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-primary-foreground/20"
          aria-label="Scan QR code"
        >
          <QrCode className="size-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="relative flex size-10 items-center justify-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-primary-foreground/20"
          aria-label="Notifications"
        >
          <Bell className="size-5" aria-hidden="true" />
          <span className="absolute top-2 right-2.5 size-2 rounded-full bg-brand-red ring-2 ring-primary" />
        </button>
        <button
          type="button"
          onClick={onLogout}
          className="flex size-10 items-center justify-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-primary-foreground/20"
          aria-label="Log out"
        >
          <LogOut className="size-5" aria-hidden="true" />
        </button>
      </div>
    </header>
  )
}
