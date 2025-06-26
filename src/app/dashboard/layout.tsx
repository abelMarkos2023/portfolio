import { Providers } from '@/components/SessionProvider'
import React from 'react'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div>
        <Providers>
            {children}
        </Providers>
    </div>
  )
}

export default layout