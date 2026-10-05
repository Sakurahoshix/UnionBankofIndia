'use client'

import { useEffect, useEffectEvent, useState } from 'react'
import { Delete, ShieldCheck } from 'lucide-react'
import { ACCOUNT } from '@/lib/bank-data'
import { cn } from '@/lib/utils'
import { UBILogoText } from './ubi-logo-text'

const MIN_PIN = 4
const MAX_PIN = 6
const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

type PinLoginProps = {
  savedPin: string | null
  onCreatePin: (pin: string) => void
  onLogin: () => void
}

export function PinLogin({ onLogin }: PinLoginProps) {
  const [pin, setPin] = useState('')

  const firstName = ACCOUNT.holder.split(' ')[1] ?? ACCOUNT.holder.split(' ')[0]
  const canSubmit = pin.length >= MIN_PIN

  const addDigit = (digit: string) => {
    setPin((p) => (p.length < MAX_PIN ? p + digit : p))
  }

  const removeDigit = () => {
    setPin((p) => p.slice(0, -1))
  }

  const submit = () => {
    if (!canSubmit) return
    onLogin()
  }

  // Auto-login जैसे ही 4 digit पूरे हो जाएं
  useEffect(() => {
    if (pin.length === MIN_PIN) {
      const t = setTimeout(() => onLogin(), 120) // हल्की delay ताकि dot fill दिखे
      return () => clearTimeout(t)
    }
  }, [pin, onLogin])

  const handleKey = useEffectEvent((e: KeyboardEvent) => {
    if (/^\d$/.test(e.key)) addDigit(e.key)
    else if (e.key === 'Backspace') removeDigit()
    else if (e.key === 'Enter') submit()
  })

  useEffect(() => {
    const listener = (e: KeyboardEvent) => handleKey(e)
    window.addEventListener('keydown', listener)
    return () => window.removeEventListener('keydown', listener)
  }, [])

  return (
    <div className="flex h-full flex-col" style={{ background: 'linear-gradient(180deg, #003087 0%, #00205C 100%)' }}>
      {/* Header */}
      <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 pt-10">
        {/* UBI Logo */}
        <div className="rounded-2xl overflow-hidden bg-white px-5 py-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/ubi-logo.png" alt="Union ease" className="h-14 w-auto object-contain" />
        </div>

        {/* Red divider */}
        <div className="h-0.5 w-24 rounded-full" style={{ background: '#C8102E' }} />

        <div className="text-center">
          <p className="text-sm text-white/70">Welcome,</p>
          <h1 className="mt-0.5 text-lg font-semibold text-white">{firstName}</h1>
          <p className="mt-3 text-sm text-white/70">Enter your MPIN to login</p>
        </div>

        {/* PIN dots */}
        <div
          className="flex items-center gap-4"
          role="status"
          aria-label={`${pin.length} of ${MAX_PIN} digits entered`}
        >
          {Array.from({ length: MAX_PIN }).map((_, i) => (
            <span
              key={i}
              className={cn(
                'size-3.5 rounded-full border-2 transition-all duration-150',
                i < pin.length
                  ? 'border-white bg-white scale-110'
                  : i >= MIN_PIN
                    ? 'border-dashed border-white/30 bg-transparent'
                    : 'border-white/50 bg-transparent',
              )}
            />
          ))}
        </div>

        <p className="min-h-5 text-xs text-white/50">
          {pin.length > 0 && pin.length < MIN_PIN ? `${MIN_PIN - pin.length} more digit(s) needed` : ''}
        </p>
      </div>

      {/* Keypad */}
      <div
        className="rounded-t-[2rem] px-6 pt-6 pb-8"
        style={{ background: '#F5F7FA' }}
      >
        <div className="grid grid-cols-3 gap-3">
          {KEYS.map((k) => (
            <KeypadButton key={k} label={k} onClick={() => addDigit(k)} />
          ))}
          <div aria-hidden="true" />
          <KeypadButton label="0" onClick={() => addDigit('0')} />
          <button
            type="button"
            onClick={removeDigit}
            aria-label="Delete last digit"
            className="flex h-14 items-center justify-center rounded-2xl text-gray-500 transition-colors hover:bg-gray-200 active:bg-gray-300"
          >
            <Delete className="size-6" aria-hidden="true" />
          </button>
        </div>

        <button
          type="button"
          onClick={submit}
          disabled={!canSubmit}
          className="mt-5 w-full rounded-2xl py-3.5 text-sm font-bold text-white transition-all disabled:opacity-40 active:scale-95"
          style={{ background: canSubmit ? '#003087' : '#003087' }}
        >
          LOGIN
        </button>

        <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-gray-400">
          <ShieldCheck className="size-3.5" aria-hidden="true" />
          Secured with 256-bit encryption
        </p>
      </div>
    </div>
  )
}

function KeypadButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-14 items-center justify-center rounded-2xl bg-white text-xl font-semibold text-gray-800 shadow-sm transition-all hover:bg-gray-100 active:scale-95 active:bg-gray-200"
    >
      {label}
    </button>
  )
}
