import { Link } from 'react-router-dom'
import { PageShell } from '../components/PageShell'

export function StudentSchedulePage () {
  return (
    <PageShell
      eyebrow='Protected page'
      title='Student Schedule'
      description='Reserved route for the logged-in schedule view. The page component exists now so the screen can be developed independently later.'
    >
      <div className='space-y-4 text-sm leading-6 text-slate-600'>
        <p>This route is nested under the protected section and confirms that authenticated screens can be reached without a full page refresh.</p>
        <p>
          Move back to the <Link to='/news-editor' className='font-semibold text-sky-700 hover:text-sky-800'>news editor</Link> or visit the <Link to='/contact' className='font-semibold text-sky-700 hover:text-sky-800'>contact page</Link>.
        </p>
      </div>
    </PageShell>
  )
}
