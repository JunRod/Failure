import {ImageResponse} from 'next/og'

export const runtime = 'edge'
export const alt = 'About Acme'
export const size = {
    width: 1200,
    height: 630,
}

export default async function Image() {

    return new ImageResponse(
        (
            <div>
                <img src={"https://res.cloudinary.com/dabwdkdys/image/upload/v1699988864/new_h4ucvo.jpg"} alt="d"/>
            </div>
        ),
        {
            ...size,
        }
    )
}