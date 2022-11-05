import classNames from 'classnames'
import Link from 'next/link'
import { inter } from '../utils/fonts'

import '../styles/globals.css'

const navigation = [
  { name: 'Start', href: '/' },
  { name: 'OpenAPI', href: '/swagger' },
  { name: 'GitHub', href: 'https://github.com/jens-ox/bundesdatenkrake' }
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="bg-stone-50 text-stone-900 dark:bg-stone-900 dark:text-stone-50">
        <div className={classNames(inter.className, 'relative min-h-screen flex flex-col')}>
          <div className="container mx-auto px-4 sm:px-6 py-4">
            <nav className="relative flex items-center justify-between sm:h-10 md:justify-center" aria-label="Global">
              <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
                <div className="flex items-center justify-between w-full md:w-auto">
                  <Link href="/">
                    <h1 className="cursor-pointer font-medium text-lg">Bundesdatenkrake</h1>
                  </Link>
                </div>
              </div>
              <div className="hidden md:flex md:space-x-10">
                {navigation.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <span className="font-medium text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 cursor-pointer">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            </nav>
          </div>

          <main className="mx-auto container px-4 sm:px-6 sm:mt-6 flex-grow overflow-x-auto">{children}</main>

          <footer className="container mx-auto mt-12 px-4 sm:px-6 border-t border-stone-300 dark:border-opacity-50 py-4 text-stone-500 flex justify-between">
            <span>2022, Jens Ochsenmeier</span>
            <a href="https://github.com/jens-ox/bundesdatenkrake" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </footer>
        </div>
      </body>
    </html>
  )
}
