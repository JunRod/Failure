import {ImageResponse} from 'next/og';

export default async function Image(ruta, size) {

    return new ImageResponse(
        (
            <div>
                <img src={ruta} alt={ruta}/>
            </div>
        ),
        {...size}
    );
}