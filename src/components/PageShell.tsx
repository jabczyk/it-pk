import type { ReactNode } from 'react'

type PageShellProps = {
  title: string
  description: string
  children: ReactNode
}

export function PageShell ({ title, description, children }: PageShellProps) {
  return (
    <main className='flex min-h-screen items-center justify-center px-6 py-12'>
      <section className='w-full max-w-4xl rounded-3xl border border-slate-200/70 bg-white/80 p-8 shadow-2xl shadow-sky-100 backdrop-blur md:p-12'>
        <div className='max-w-2xl space-y-3'>
          <p className='text-sm font-semibold uppercase tracking-[0.3em] text-sky-600'>
            pk-it
          </p>
          <h1 className='text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl'>
            {title}
          </h1>
          <p className='text-base text-slate-600 md:text-lg'>
            {description}
          </p>
        </div>
        <div className='mt-10'>{children}</div>
      </section>
    </main>
  )
}
