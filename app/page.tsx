import { BankingApp } from '@/components/bank/banking-app'

export default function Page() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-secondary md:py-8">
      <div className="h-dvh w-full md:h-[860px] md:max-w-[400px] md:overflow-hidden md:rounded-[2.5rem] md:border-8 md:border-foreground md:shadow-2xl">
        <BankingApp />
      </div>
    </div>
  )
}
