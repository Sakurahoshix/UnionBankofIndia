'use client'

import { useState } from 'react'
import { Globe, Lock, ShoppingCart, Wifi } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ACCOUNT } from '@/lib/bank-data'

function Toggle({ label, icon: Icon, checked, onChange }: { label: string; icon: typeof Lock; checked: boolean; onChange: () => void }) {
  return (
    <li className="flex items-center gap-3 px-4 py-3.5">
      <span className="flex size-9 items-center justify-center rounded-full bg-secondary text-primary">
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <span className="flex-1 text-sm font-medium">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={onChange}
        className={cn('relative h-6 w-11 rounded-full transition-colors', checked ? 'bg-primary' : 'bg-muted-foreground/30')}
      >
        <span
          className={cn(
            'absolute top-0.5 left-0.5 size-5 rounded-full bg-card shadow transition-transform',
            checked && 'translate-x-5',
          )}
        />
      </button>
    </li>
  )
}

export function CardsView() {
  const [settings, setSettings] = useState({ online: true, intl: false, contactless: true, locked: false })
  const flip = (k: keyof typeof settings) => setSettings((s) => ({ ...s, [k]: !s[k] }))

  return (
    <div className="flex flex-col gap-6 px-5 pt-6">
      <h1 className="text-xl font-semibold">My Cards</h1>

      <div
        className={cn(
          'relative aspect-[1.586] overflow-hidden rounded-2xl bg-primary p-5 text-primary-foreground shadow-xl transition-opacity',
          settings.locked && 'opacity-50 grayscale',
        )}
      >
        <div className="absolute -top-10 -right-10 size-44 rounded-full bg-brand-red/80" aria-hidden="true" />
        <div className="absolute -right-4 -bottom-16 size-40 rounded-full bg-primary-foreground/10" aria-hidden="true" />
        <div className="relative flex h-full flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold tracking-wide">Meridian Bank</span>
            <Wifi className="size-5 rotate-90" aria-hidden="true" />
          </div>
          <div>
            <p className="font-mono text-lg tracking-[0.2em]">4821 •••• •••• 4821</p>
            <div className="mt-3 flex items-end justify-between text-xs">
              <div>
                <p className="text-primary-foreground/60">Card holder</p>
                <p className="font-medium uppercase">{ACCOUNT.holder}</p>
              </div>
              <div>
                <p className="text-primary-foreground/60">Expires</p>
                <p className="font-medium">08/29</p>
              </div>
              <p className="text-base font-bold italic">RuPay</p>
            </div>
          </div>
        </div>
      </div>

      <section aria-labelledby="card-controls">
        <h2 id="card-controls" className="mb-2 text-sm font-semibold">
          Card Controls
        </h2>
        <ul className="divide-y rounded-2xl bg-card shadow-sm">
          <Toggle label="Online transactions" icon={ShoppingCart} checked={settings.online} onChange={() => flip('online')} />
          <Toggle label="International usage" icon={Globe} checked={settings.intl} onChange={() => flip('intl')} />
          <Toggle label="Contactless payments" icon={Wifi} checked={settings.contactless} onChange={() => flip('contactless')} />
          <Toggle label="Temporarily lock card" icon={Lock} checked={settings.locked} onChange={() => flip('locked')} />
        </ul>
      </section>
    </div>
  )
}
