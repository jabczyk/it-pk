import { Link } from 'react-router-dom'
import { PageShell } from '../components/PageShell'

const pageSections = [
  {
    title: 'src/pages',
    description: 'Route-level React components live here, following a Next.js-like folder convention without file-based routing.'
  },
  {
    title: 'src/components',
    description: 'Shared UI building blocks stay separate from page modules so reuse remains straightforward.'
  },
  {
    title: 'src/app + src/router',
    description: 'Application bootstrapping and explicit React Router configuration stay isolated from page content.'
  }
]

export function HomePage () {
  return (
    <PageShell
      title='React, Router, Tailwind, TypeScript'
      description='This starter keeps the project small and conventional while matching the structure you requested.'
    >
      <div className='grid gap-4 md:grid-cols-3'>
        {pageSections.map((section) => (
          <article
            key={section.title}
            className='rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-transform duration-200 hover:-translate-y-1 hover:border-sky-300 hover:bg-white'
          >
            <h2 className='text-lg font-semibold text-slate-900'>{section.title}</h2>
            <p className='mt-2 text-sm leading-6 text-slate-600'>{section.description}</p>
          </article>
        ))}
      </div>

      <div className='mt-8 flex items-center gap-4'>
        <Link
          to='/'
          className='inline-flex items-center rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-sky-600'
        >
          Current home route
        </Link>
        <span className='text-sm text-slate-500'>
          Add more routes in <code>src/router</code> and page modules in <code>src/pages</code>.
        </span>
      </div>
    </PageShell>
  )
}
