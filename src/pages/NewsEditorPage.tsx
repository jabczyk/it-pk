import { Link } from 'react-router-dom'
import { PageShell } from '../components/PageShell'

export function NewsEditorPage () {
  return (
    <PageShell
      eyebrow='Protected page'
      title='News Editor'
      description='Reserved route for the logged-in editorial screen. Route protection is active now; editor content can be added in a later step.'
    >
      <div className='space-y-4 text-sm leading-6 text-slate-600'>
        <p>This page is available only after sign-in and currently serves as a route-level placeholder.</p>
        <p>
          Navigate directly to the <Link to='/student-schedule' className='font-semibold text-sky-700 hover:text-sky-800'>student schedule</Link> to verify protected client-side navigation between authenticated screens.
        </p>
      </div>
    </PageShell>
  )
}
