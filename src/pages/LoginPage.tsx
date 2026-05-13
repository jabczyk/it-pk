import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../components/AuthContext'
import { PageShell } from '../components/PageShell'

type LoginLocationState = {
  from?: {
    pathname?: string
  }
}

export function LoginPage () {
  const { isAuthenticated, signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as LoginLocationState | null
  const nextPath = state?.from?.pathname ?? '/news-editor'

  async function handleSignIn () {
    signIn()
    await navigate(nextPath, { replace: true })
  }

  return (
    <PageShell
      eyebrow='Public page'
      title='Portal Login'
      description='Temporary login route used to verify routing and protected navigation. The real sign-in UI can replace this placeholder later.'
      glow={false}
    >
      <div className='space-y-6'>
        <div className='rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-6 text-slate-600'>
          <p>Current auth status: <span className='font-semibold text-slate-900'>{isAuthenticated ? 'signed in' : 'signed out'}</span>.</p>
          <p className='mt-2'>Protected routes currently redirect here and then continue to the requested page after sign-in.</p>
        </div>

        <div className='flex flex-wrap items-center gap-4'>
          <button
            type='button'
            onClick={handleSignIn}
            className='inline-flex items-center rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-sky-600'
          >
            Sign in and continue
          </button>
          <Link
            to='/'
            className='inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition-colors duration-200 hover:border-sky-300 hover:text-sky-700'
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </PageShell>
  )
}
