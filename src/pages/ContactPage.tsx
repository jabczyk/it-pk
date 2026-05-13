import { Link } from 'react-router-dom'
import { PageShell } from '../components/PageShell'

export function ContactPage () {
  return (
    <PageShell
      eyebrow='Public page'
      title='Contact Us'
      description='Placeholder route for the contact screen from the prototype. The full form and contact blocks can be implemented later without changing the route contract.'
      glow={false}
    >
      <div className='space-y-4 text-sm leading-6 text-slate-600'>
        <p>This page is intentionally lightweight. It exists to reserve the route and page module for the final screen implementation.</p>
        <p>
          Continue to the <Link to='/login' className='font-semibold text-sky-700 hover:text-sky-800'>portal login</Link> or return to the <Link to='/' className='font-semibold text-sky-700 hover:text-sky-800'>homepage</Link>.
        </p>
      </div>
    </PageShell>
  )
}
