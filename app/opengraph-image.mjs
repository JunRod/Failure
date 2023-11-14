import OpengraphImage from "@components/opengraph-image.js";

export const runtime = 'edge';

export default async function Image() {
    return await OpengraphImage();
}