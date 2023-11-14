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
import {Analytics} from '@vercel/analytics/react';

const inter = Inter({subsets: ['latin']})

const {TWITTER_CREATOR, TWITTER_SITE, SITE_NAME} = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000';

export const metadata = {
    description: 'ToFailure: Diario con IA',
    metadataBase: new URL(baseUrl),
    title: {
        default: SITE_NAME,
        template: `%s | ${SITE_NAME}`
    },
    robots: {
        follow: true,
        index: true
    },
    keywords: ['Diary', 'IA', 'ChatGPT'],
    twitter: {
        card: 'summary_large_image',
        title: 'ToFailure: Diario con IA',
        description: 'Un clic, Infinitas Posibilidades. Tu historia, impulsada por la inteligencia artificial.',
        creator: '@JuNRod_',
        creatorId: '1467726470533754880',
        images: {
            url: 'https://res.cloudinary.com/dabwdkdys/image/upload/v1699988864/new_h4ucvo.jpg',
            alt: 'Frame ToFailure',
        },
    },

    icons: {
        icon: 'https://res.cloudinary.com/dabwdkdys/image/upload/v1699986071/favicon_ni6t4i.png',
        shortcut: 'https://res.cloudinary.com/dabwdkdys/image/upload/v1699986071/favicon_ni6t4i.png',
        apple: 'https://res.cloudinary.com/dabwdkdys/image/upload/v1699986071/favicon_ni6t4i.png',
    },

    openGraph: {
        title: 'ToFailure: Diario con IA',
        description: 'Un clic, Infinitas Posibilidades. Tu historia, impulsada por la inteligencia artificial.',
        url: "https://tofailure.vercel.app",
        siteName: 'ToFailure',
        images: [
            {
                url: 'https://res.cloudinary.com/dabwdkdys/image/upload/v1699988864/new_h4ucvo.jpg',
                width: 800,
                height: 600,
            },
            {
                url: 'https://res.cloudinary.com/dabwdkdys/image/upload/v1699988864/new_h4ucvo.jpg',
                width: 1800,
                height: 1600,
                alt: 'Og Image Alt',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
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
                    <Suspense fallback={<div>Loading...</div>}>
                        {children}
                    </Suspense>
                    <div className={Diary.containerArticle}>
                        <TemplateArticle/>
                    </div>
                </main>
                <footer>
                    <ButtonGeneradosOrDiario/>
                </footer>
            </HocChildrenTransition>
            <Analytics/>
            </body>
        </UserProvider>
        </html>
    </Providers>)
}
