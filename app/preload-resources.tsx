'use client'

import ReactDOM from 'react-dom'

export function PreloadResources() {
    ReactDOM.preload('https://tofailure.vercel.app/api/auth/login')
    ReactDOM.preconnect('https://tofailure.vercel.app/api/auth/login', {crossOrigin: 'anonymous'})
    ReactDOM.prefetchDNS('https://tofailure.vercel.app/api/auth/login')

    return null
}