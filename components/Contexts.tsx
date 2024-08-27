'use client'

import { Theme } from '@radix-ui/themes'
import { ReactNode } from 'react'

export default ({ children }: { children: ReactNode }) => {
  return (
    <Theme accentColor="indigo" radius="medium">
      {children}
    </Theme>
  )
}
