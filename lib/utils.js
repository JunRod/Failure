export const createUrl = (pathname, params) => {

    return `${pathname}?${new URLSearchParams(params).toString()}`
}

export const collectionsToString = (collections) => {
    let contentMessage = ''

    collections.map(collection => {
        contentMessage += collection.content + '\n'
    })

    return contentMessage
}

export const mesesAbreviadosEnEspanol = [
    "ene", "feb", "mar", "abr", "may", "jun",
    "jul", "ago", "sep", "oct", "nov", "dic"
];

export function obtenerNombreMesEnEspanol() {

    const hoy = new Date();
    return mesesAbreviadosEnEspanol[hoy.getMonth()];
}

