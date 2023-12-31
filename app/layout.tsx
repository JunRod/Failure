import "@styles/globals.css"
import Providers from "@redux/providers";
import ToasterJs from "@components/ToasterJS";
import {UserProvider} from '@auth0/nextjs-auth0/client';
import ProfileClient from "@components/profileClient";
import ButtonChatsOrDiario from "@components/buttonChatsOrDiario";
import {Analytics} from '@vercel/analytics/react';
import {GeistSans} from "geist/font/sans";
import HocChatGptTemplateActive from "@components/HOC-ChatGPT-TemplateActive";

const {SITE_NAME} = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000';

export const metadata = {
    description: 'ToFailure: Diario con IA',
    metadataBase: new URL(baseUrl),
    title: SITE_NAME,
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

export default function RootLayout({children}: { children: React.ReactNode }) {

    return (
        <html lang="en">
        <Providers>
            <UserProvider>
                <body
                    className={`${GeistSans.className}  bg-[#212529] flex flex-col relative max-w-full px-4 lg:h-screen gap-3`}>
                <ToasterJs/>
                <header className='text-white flex flex-row justify-between items-center relative'>
                    <ProfileClient/>
                </header>
                <main
                    className='overflow-hidden max-lg:max-h-auto max-w-full flex flex-col relative gap-3 lg:flex-row lg:max-h-[82%] lg:h-[82%]'>
                    {children}
                    <div className='h-[1px] w-full bg-[#343A40] lg:hidden'></div>
                    <div
                        className=' px-10 py-5 min-h-[300px] max-h-auto lg:max-h-full rounded-[10px] text-white border-[1px] border-[#495057] relative bg-[#343A40] max-w-full lg:w-[50%]'>
                        <HocChatGptTemplateActive/>
                    </div>
                </main>
                <footer className='text-white self-end mb-4'>
                    <ButtonChatsOrDiario/>
                </footer>
                <Analytics/>
                </body>
            </UserProvider>
        </Providers>
        </html>
    )
}
