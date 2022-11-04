import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { CloseIcon, MenuIcon } from '@iconicicons/react'
import Link from 'next/link'
import Head from 'next/head'
import classNames from 'classnames'
import { inter } from '../utils/fonts'

const navigation = [
  { name: 'Start', href: '/' },
  { name: 'OpenAPI', href: '/swagger' },
  { name: 'GitHub', href: 'https://github.com/jens-ox/bundesdatenkrake' }
]

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>Bundesdatenkrake</title>
      <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🦑</text></svg>"
      />
    </Head>
    <div className={classNames(inter.className, 'relative min-h-screen flex flex-col')}>
      <Popover>
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <nav className="relative flex items-center justify-between sm:h-10 md:justify-center" aria-label="Global">
            <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
              <div className="flex items-center justify-between w-full md:w-auto">
                <Link href="/">
                  <h1 className="cursor-pointer font-medium text-lg">Bundesdatenkrake</h1>
                </Link>
                <div className="-mr-2 flex items-center md:hidden">
                  <Popover.Button className="rounded-md p-2 inline-flex items-center justify-center text-stone-400 hover:text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    <MenuIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
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

        <Transition
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
          >
            <div className="bg-white dark:bg-stone-800 rounded-lg shadow-md ring-1 ring-black ring-opacity-5 overflow-hidden">
              <div className="px-5 pt-4 flex items-center justify-between">
                <div>
                  <h1 className="font-medium text-lg">Bundesdatenkrake</h1>
                </div>
                <div className="-mr-2">
                  <Popover.Button className="rounded-md p-2 inline-flex items-center justify-center text-stone-400 hover:text-stone-500 hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <CloseIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="px-2 pt-2 pb-3">
                {navigation.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <span className="block px-3 py-2 rounded-md text-base font-medium text-stone-700 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-700 cursor-pointer">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>

      <main className="mx-auto container px-4 sm:px-6 sm:mt-6 flex-grow overflow-x-auto">
        <Component {...pageProps} />
      </main>

      <footer className="container mx-auto mt-12 px-4 sm:px-6 border-t border-stone-300 dark:border-opacity-50 py-4 text-stone-500 flex justify-between">
        <span>2022, Jens Ochsenmeier</span>
        <a href="https://github.com/jens-ox/bundesdatenkrake" target="_blank" rel="noreferrer">
          GitHub
        </a>
      </footer>
    </div>
  </>
)

export default App
