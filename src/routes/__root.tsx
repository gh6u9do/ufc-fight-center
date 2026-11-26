import * as React from 'react'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { Users, Shield } from 'lucide-react'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <div className='min-h-screen bg-ufc-bg text-ufc-text flex flex-col items-center'>
        {/* основной контент */}
        <main className='w-full max-w-[480px] flex-1 flex-col p-4 pb-24'>
          <Outlet />
        </main>

        {/* плавающая панель навигации */}
        <nav className='fixed bottom-5 w-full max-w-[320px] bg-ufc-card/80 backdrop-blur-md border border-ufc-border rounded-full p-2 shadow-2xl flex items-center justify-around z-1'>
          <Link
            to={'/'}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-ufc-muted transition-all duration-300"
            activeProps={{
              className: "bg-ufc-red text-white shadow-lg scale-105"
            }}
          >
            <Users className="w-4 h-4" />
            <span>roster</span>
          </Link>

          <Link
            to='/camp'
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-ufc-muted transition-all duration-300"
            activeProps={{
              className: "bg-ufc-red text-white shadow-lg scale-105"
            }}
          >
            <Shield className="w-4 h-4" />
            <span>my camp</span>
          </Link>
        </nav>

      </div>
    </React.Fragment>
  )
}
