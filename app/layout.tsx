import cx from 'clsx'
import Link from 'next/link'
import { Link as RadixLink } from '@radix-ui/themes'
import { inter, mono } from '@/utils/fonts'

import '@/styles/globals.css'
import Contexts from '@/components/Contexts'
import { Metadata } from 'next'

const navigation = [
  { name: 'Datensätze', href: '/' },
  { name: 'Schemas', href: '/schema' },
  { name: 'API', href: '/swagger' },
  { name: 'GitHub', href: 'https://github.com/jens-ox/oda' }
]

export const metadata: Metadata = {
  title: 'Open Data Aggregator',
  description: 'Aggregationsplattform für öffentliche Daten.',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🦑</text></svg>'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className={cx(inter.variable, mono.variable, 'font-sans')}>
        <Contexts>
          <div className="flex flex-col justify-between min-h-screen bg-slate-1">
            <div className="flex flex-col gap-12">
              <nav className="container mx-auto py-4 flex gap-12">
                <Link href="/">
                  <h1 className="font-medium">Open Data Aggregator</h1>
                </Link>
                <div className="flex gap-8 text-slate-11">
                  {navigation.map((item) => (
                    <RadixLink asChild key={item.name}>
                      <Link key={item.name} href={item.href}>
                        <span>{item.name}</span>
                      </Link>
                    </RadixLink>
                  ))}
                </div>
              </nav>

              <main className="container mx-auto pb-12">{children}</main>
            </div>

            <footer className="container mx-auto border-t border-slate-5 py-4 text-2 text-slate-10 flex gap-4">
              <span>{new Date().getFullYear()}, Jens Ochsenmeier</span>
              <RadixLink href="https://github.com/jens-ox/oda" target="_blank" rel="noreferrer">
                GitHub
              </RadixLink>
            </footer>
          </div>
        </Contexts>
      </body>
    </html>
  )
}
