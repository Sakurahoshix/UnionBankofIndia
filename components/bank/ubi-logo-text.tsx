// Reusable Union Bank of India text logo — matches official brand style
export function UBILogoText({
  size = 'md',
  dark = false,
}: {
  size?: 'sm' | 'md' | 'lg'
  dark?: boolean // true = show on dark/blue background (white text), false = coloured text
}) {
  const topSize =
    size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-2xl' : 'text-lg'
  const botSize =
    size === 'sm' ? 'text-[10px]' : size === 'lg' ? 'text-base' : 'text-xs'

  if (dark) {
    // On dark blue background — all white
    return (
      <div className="flex flex-col leading-none">
        <span className={`${topSize} font-extrabold italic tracking-tight text-white`}>
          Union Bank
        </span>
        <span className={`${botSize} font-semibold italic tracking-wide text-white/80 self-end`}>
          of India
        </span>
      </div>
    )
  }

  // On light background — official colours: blue + red
  return (
    <div className="flex flex-col leading-none">
      <span className={`${topSize} font-extrabold italic tracking-tight`}>
        <span style={{ color: '#003087' }}>Union </span>
        <span style={{ color: '#C8102E' }}>Bank</span>
      </span>
      <span
        className={`${botSize} font-semibold italic tracking-wide self-end`}
        style={{ color: '#C8102E' }}
      >
        of India
      </span>
    </div>
  )
}
