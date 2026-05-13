import { Link, Outlet } from 'react-router-dom'

const navigationItems = [
  { to: '/', label: 'Homepage' },
  { to: '/news-editor', label: 'News Editor' },
  { to: '/student-schedule', label: 'Student Schedule' },
  { to: '/contact', label: 'Contact Us' }
]

export function AppLayout () {
  return (
    <div className='min-h-screen bg-[#062a63] px-[26px] text-white'>
      <header className='sticky top-0 z-50 -mx-[26px] bg-[#faf9f6]'>
        <div className='mx-auto flex min-h-[58px] w-full max-w-[1280px] flex-col px-6 py-4 text-[#293a68] md:flex-row md:items-center md:justify-between md:px-[26px] md:py-0'>
          <Link
            to='/'
            className='text-[14px] font-semibold uppercase tracking-[0.02em] text-[#273b6a]'
          >
            Faculty of Computer Science and Mathematics
          </Link>

          <nav className='mt-4 flex flex-wrap items-center gap-x-7 gap-y-2 md:mt-0'>
            {navigationItems.map((item) => (
              <Link
                key={`${item.label}-${item.to}`}
                to={item.to}
                className='text-[12px] font-medium text-[#44506d] transition-colors duration-200 hover:text-[#102b5c]'
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className='mt-4 flex items-center gap-4 md:mt-0 md:pl-6'>
            <Link
              to='/login'
              className='inline-flex h-[30px] items-center gap-2 rounded-[2px] bg-[#0c2758] px-4 text-[12px] font-medium text-white transition-colors duration-200 hover:bg-[#14397a]'
            >
              <svg viewBox='0 0 20 20' className='h-3.5 w-3.5 fill-none stroke-current stroke-[1.8]'>
                <circle cx='10' cy='10' r='7' />
                <path d='M10 6.7v3.3l2.3 1.45' strokeLinecap='round' strokeLinejoin='round' />
              </svg>
              Portal Login
            </Link>

            <Link
              to='/student-schedule'
              aria-label='Open student schedule'
              className='inline-flex h-8 w-8 items-center justify-center text-[#23376a]'
            >
              <svg viewBox='0 0 20 20' className='h-[18px] w-[18px] fill-none stroke-current stroke-[1.7]'>
                <circle cx='10' cy='10' r='7.25' />
                <path d='M2.9 10h14.2' strokeLinecap='round' />
                <path d='M10 2.75c1.75 1.86 2.71 4.5 2.71 7.25 0 2.76-.96 5.39-2.71 7.25' strokeLinecap='round' />
                <path d='M10 2.75c-1.75 1.86-2.71 4.5-2.71 7.25 0 2.76.96 5.39 2.71 7.25' strokeLinecap='round' />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      <div className='mx-auto w-full max-w-[1280px]'>
        <main className='min-h-[calc(100vh-58px)] bg-[#062a63] pt-8'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
