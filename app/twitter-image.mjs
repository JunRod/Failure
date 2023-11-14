import {ImageResponse} from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'About Acme'
export const size = {
    width: 1200,
    height: 630,
}

export default async function Image() {

    return new ImageResponse(
        (
            <div>
                <img src={"https://res.cloudinary.com/dabwdkdys/image/upload/v1699986089/large_ni5yrn.png"} alt="d"/>
            </div>
        ),
        {
            ...size,
        }
    )
}