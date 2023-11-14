import Image from '@components/image';

export const runtime = 'edge';

export default async function GenImage() {
    return await Image('@componentes/icons/favicon.png', {
        width: 48,
        height: 48,
    });
}