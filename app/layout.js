import "@styles/globals.css"
import {Inter} from 'next/font/google'
import "@db"
import Providers from "@components/providers";

const inter = Inter({subsets: ['latin']})

export const metadata = {
    title: 'ModoGuerra',
    description: 'Diario con IA',
}

export default function RootLayout({children}) {
    return (
        <Providers>
            <html lang="en">
            <body>
            {children}
            </body>
            </html>
        </Providers>
    )
}
