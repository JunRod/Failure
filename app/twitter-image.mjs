import Image from '@components/image';

export const runtime = 'edge';

export default async function GenImage() {
    return await Image('/large.png', {
        width: 1200,
        height: 630,
    });
}