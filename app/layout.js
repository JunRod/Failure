import "@styles/globals.css"
import {Inter} from 'next/font/google'
import "@db"
import Providers from "@components/providers";
import HocChildrenTransition from "@components/HOC-children-transition.js";
import ToasterJs from "@components/ToasterJS.js";
import {UserProvider} from '@auth0/nextjs-auth0/client';
import ProfileClient from "@components/profileClient.js";
import React, {Suspense} from "react";
import ButtonGeneradosOrDiario from "@components/buttonGeneradosOrDiario.js";
import TemplateArticle from "@components/templateArticle.js";
import Diary from "@styles/diary.module.css";

const inter = Inter({subsets: ['latin']})

export const metadata = {
    title: 'ToFailure', description: 'ToFailure: Diario con IA',
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
