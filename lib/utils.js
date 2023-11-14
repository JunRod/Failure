export const mesesAbreviadosEnEspanol = [
    "ene", "feb", "mar", "abr", "may", "jun",
    "jul", "ago", "sep", "oct", "nov", "dic"
];

export function obtenerNombreMesEnEspanol() {

    const hoy = new Date();
    return mesesAbreviadosEnEspanol[hoy.getMonth()];
}

