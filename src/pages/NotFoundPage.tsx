import { Link } from 'react-router-dom'
import { PageShell } from '../components/PageShell'

export function NotFoundPage () {
  return (
    <PageShell
      eyebrow='Fallback route'
      title='404'
      description='The requested route does not exist. This fallback keeps invalid paths inside the SPA instead of leaving the user on a blank screen.'
    >
      <div className='space-y-4 text-sm leading-6 text-slate-600'>
        <p>No screen is assigned to this path.</p>
        <p>
          Use the navigation above or go back to the <Link to='/' className='font-semibold text-sky-700 hover:text-sky-800'>homepage</Link>.
        </p>
      </div>
    </PageShell>
  )
}
