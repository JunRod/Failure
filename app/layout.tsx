import "@styles/globals.css"
import Providers from "@redux/providers";
import HocChildrenTransition from "@components/HOC-children-transition";
import ToasterJs from "@components/ToasterJS";
import {UserProvider} from '@auth0/nextjs-auth0/client';
import ProfileClient from "@components/profileClient";
import {Suspense} from "react";
import ButtonGeneradosOrDiario from "@components/buttonGeneradosOrDiario";
import TemplateArticle from "@components/templateArticle";
import Diary from "@styles/diary.module.css";
import {Analytics} from '@vercel/analytics/react';
import {GeistSans} from "geist/font/sans";
import {Props} from "@ts/types";

const {SITE_NAME} = process.env;
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
            url: 'https://res.cloudinary.com/dabwdkdys/image/upload/v1699986089/large_ni5yrn.png',
            alt: 'Frame ToFailure',
        },
    },

    icons: {
        icon: 'https://res.cloudinary.com/dabwdkdys/image/upload/v1699993735/Frame_14favicon_ve7mbh.png',
        shortcut: 'https://res.cloudinary.com/dabwdkdys/image/upload/v1699993735/Frame_14favicon_ve7mbh.png',
        apple: 'https://res.cloudinary.com/dabwdkdys/image/upload/v1699993735/Frame_14favicon_ve7mbh.png',
    },

    openGraph: {
        title: 'ToFailure: Diario con IA',
        description: 'Un clic, Infinitas Posibilidades. Tu historia, impulsada por la inteligencia artificial.',
        url: "https://tofailure.vercel.app",
        siteName: 'ToFailure',
        images: [
            {
                url: 'https://res.cloudinary.com/dabwdkdys/image/upload/v1699986089/large_ni5yrn.png',
                width: 1800,
                height: 1600,
                alt: 'Og Image Alt',
                secureUrl: 'https://res.cloudinary.com/dabwdkdys/image/upload/v1699986089/large_ni5yrn.png',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
}

export default function RootLayout({children}: Props) {

    return (
        <Providers>
            <html lang="en" className={GeistSans.className}>
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
        </Providers>
    )
}
