import type { ReactNode } from 'react'

type PageShellProps = {
  eyebrow?: string
  title: string
  description?: string
  children?: ReactNode
  glow?: boolean
}

export function PageShell ({ eyebrow = 'pk-it', title, description, children, glow = true }: PageShellProps) {
  return (
    <section className={[
      'w-full rounded-3xl border border-slate-200/70 bg-white/85 p-8 backdrop-blur md:p-12',
      glow ? 'shadow-2xl shadow-sky-100' : 'shadow-none'
    ].join(' ')}>
      <div className='max-w-2xl space-y-3'>
        <p className='text-sm font-semibold uppercase tracking-[0.3em] text-sky-600'>
          {eyebrow}
        </p>
        <h1 className='text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl'>
          {title}
        </h1>
        {description !== undefined && description.length > 0 && (
          <p className='text-base text-slate-600 md:text-lg'>
            {description}
          </p>
        )}
      </div>
      {children !== undefined && (
        <div className='mt-10'>{children}</div>
      )}
    </section>
  )
}
