export type TransactionCategory =
  | 'transfer'
  | 'shopping'
  | 'bills'
  | 'salary'
  | 'food'
  | 'recharge'

export type Transaction = {
  id: string
  title: string
  subtitle: string
  amount: number
  type: 'credit' | 'debit'
  category: TransactionCategory
  date: string
}

export type Payee = {
  id: string
  name: string
  handle: string
  initials: string
}

export const ACCOUNT = {
  holder: 'MS JAYANTI DEVI WO SOORAJ BHAN',
  number: 'XXXX XXXX 0676',
  fullNumber: '7145020100000676',
  customerId: '50315533',
  cifNumber: '7351694400',
  ifsc: 'UBIN0571458',
  micr: '243026502',
  branch: 'Fatehganj (Paschimi), Hari Banquet Hall, Near Police Chauki, Rampur Road, Bareilly-243501, Uttar Pradesh',
  type: 'Savings Account',
  occupation: 'Housewife',
  mobile: '-',
  email: '-',
  pan: '-',
  address: 'Village and Post - Madhauli, Fatehganj (W), Teh - Meergangj, Bareilly, Pin: 243501, Uttar Pradesh, India',
  dateOfOpening: '22-01-2014',
  nominationRegistered: true,
  nomineeRelation: 'Wife',
  openingBalance: 222_469,
}

export const PAYEES: Payee[] = [
  { id: 'p1', name: 'Rahul Verma', handle: 'rahul.v@meridian', initials: 'RV' },
  { id: 'p2', name: 'Priya Nair', handle: 'priya.nair@okbank', initials: 'PN' },
  { id: 'p3', name: 'Mom', handle: 'XXXX 7712', initials: 'M' },
  { id: 'p4', name: 'Karan Mehta', handle: 'karanm@upi', initials: 'KM' },
  { id: 'p5', name: 'Landlord', handle: 'XXXX 3390', initials: 'LL' },
]

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    // S52161910 — 05/10/2026 — DR 6400
    id: 'S52161910',
    title: 'Mastro M',
    subtitle: 'UPIAR/21151431444 · sibl/mastro6@sib/UP',
    amount: 6400,
    type: 'debit',
    category: 'transfer',
    date: '2026-10-05T20:10:00+05:30',
  },
  {
    // S48966680 — 05/10/2026 — CR 500
    id: 'S48966680',
    title: 'Avinash (HDFC)',
    subtitle: 'UPIAR/21152105879 · avinashkaranda',
    amount: 500,
    type: 'credit',
    category: 'transfer',
    date: '2026-10-05T10:54:00+05:30',
  },
  {
    // S41139321 — 04/10/2026 — DR 500
    id: 'S41139321',
    title: 'Umesh (CNRB)',
    subtitle: 'UPIAR/21142291957 · umeshsav@okhdf',
    amount: 500,
    type: 'debit',
    category: 'transfer',
    date: '2026-10-04T12:00:00+05:30',
  },
  {
    // S39843637 — 03/10/2026 — CR 1900
    id: 'S39843637',
    title: 'N G Engineering',
    subtitle: 'UPIAB/21144669378 · nishanthneerch',
    amount: 1900,
    type: 'credit',
    category: 'transfer',
    date: '2026-10-03T18:00:00+05:30',
  },
  {
    // S21165895 — 03/10/2026 — CR 3
    id: 'S21165895',
    title: 'Google Pay',
    subtitle: 'UPIAB/21133024539 · goog-payment@io',
    amount: 3,
    type: 'credit',
    category: 'transfer',
    date: '2026-10-03T12:00:00+05:30',
  },
  {
    // S21163541 — 02/10/2026 — DR 1900
    id: 'S21163541',
    title: 'Uday Kumar (CNRB)',
    subtitle: 'UPIAR/21132376955 · udayankumark82',
    amount: 1900,
    type: 'debit',
    category: 'transfer',
    date: '2026-10-02T12:00:00+05:30',
  },
  {
    // S50022337 — 01/10/2026 — DR 1900
    id: 'S50022337',
    title: 'Uday Kumar (CNRB)',
    subtitle: 'UPIAR/21101789998 · udayankumark82',
    amount: 1900,
    type: 'debit',
    category: 'transfer',
    date: '2026-10-01T12:00:00+05:30',
  },
  {
    // S91040795 — 30/09/2026 — DR 6500
    id: 'S91040795',
    title: 'Firos M',
    subtitle: 'UPIAR/21041508141 · firu7487@okici',
    amount: 6500,
    type: 'debit',
    category: 'transfer',
    date: '2026-09-30T12:00:00+05:30',
  },
  {
    // S89587514 — 29/09/2026 — DR 16000
    id: 'S89587514',
    title: 'Uday Kumar (UCBA)',
    subtitle: 'UPIAR/21039898583 · udayakumaranan',
    amount: 16000,
    type: 'debit',
    category: 'transfer',
    date: '2026-09-29T12:00:00+05:30',
  },
].sort((a, b) => +new Date(b.date) - +new Date(a.date)) as Transaction[]

const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 2,
})

export function formatINR(value: number) {
  return inrFormatter.format(value)
}

export function formatTxnDate(iso: string) {
  return new Date(iso).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Kolkata',
  })
}
