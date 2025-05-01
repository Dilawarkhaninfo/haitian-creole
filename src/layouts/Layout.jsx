import Aurora from '@/components/Aurora'
import Header from '@/components/common/Header'
import { Outlet } from 'react-router-dom'


const Layout = () => {
    return (
        <>
            <header className='fixed top-0 z-50 bg-primary/20 w-full backdrop-blur-3xl'>
                <Header />
            </header>
            <main className='flex flex-col min-h-[calc(100vh-3.5rem-1px)]'>
                <div className='h-full'>
                    <Outlet />
                </div>
            </main>
            <footer className="p-4 text-center text-muted-foreground border-t mt-20">
                © {new Date().getFullYear()} <span className='capitalize'>{import.meta.env.VITE_APP_NAME}</span>. All rights reserved.
            </footer>
        </>
    )
}

export default Layout