import "@styles/globals.css"
import {Inter} from 'next/font/google'
import Providers from "@components/providers";
import HocChildrenTransition from "@components/HOC-children-transition.js";
import ToasterJs from "@components/ToasterJS.js";
import {UserProvider} from '@auth0/nextjs-auth0/client';
import ProfileClient from "@components/profileClient.js";
import {Suspense} from "react";
import ButtonGeneradosOrDiario from "@components/buttonGeneradosOrDiario.js";
import TemplateArticle from "@components/templateArticle.js";
import Diary from "@styles/diary.module.css";

const inter = Inter({subsets: ['latin']})

export const metadata = {
    description: 'ToFailure: Diario con IA',
    title: 'ToFailure',
    generator: 'Next.js',
    applicationName: 'ToFailure: Diario con IA',
    referrer: 'origin-when-cross-origin',
    keywords: ['Diary', 'IA', 'ChatGPT'],
    authors: [{name: 'JuRNod'}],
    creator: 'JuNRod',
    publisher: 'JuNRod',
    twitter: {
        card: 'summary_large_image',
        title: 'ToFailure: Diario con IA',
        description: 'Un clic, Infinitas Posibilidades. Tu historia, impulsada por la inteligencia artificial.',
        siteId: '1467726470533754882',
        creator: '@JuNRod_',
        images: ['twitter-image.png'],
    },
    category: 'Artificial Intelligence',
}

export default function RootLayout({children}) {

    return (<Providers>
        <html lang="en" className={inter.className}>
        <UserProvider>
            <body>
            <ToasterJs/>
            <header>
                <Suspense fallback={<div>Loading...</div>}>
                    <ProfileClient/>
                </Suspense>
            </header>
            <HocChildrenTransition>
                <main>
                    {children}
                    <div className={Diary.containerArticle}>
                        <TemplateArticle/>
                    </div>
                </main>
                <footer>
                    <ButtonGeneradosOrDiario/>
                </footer>
            </HocChildrenTransition>
            </body>
        </UserProvider>
        </html>
    </Providers>)
}
