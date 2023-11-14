import {ImageResponse} from 'next/og';
import imageFrame from "@components/imageFrame.js";


export default async function OpengraphImage() {

    return new ImageResponse(
        (
            <div>
                <imageFrame width="100%" height="100%"/>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}