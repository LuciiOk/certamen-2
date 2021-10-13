export interface Region{
    nombre: string,
    comuna: any
}

export let listaRegion:Region[] = [
    {
        nombre : "Valparaiso",
        comuna: [
            {nombre:"Valparaiso"},
            {nombre:"Quillota"},
            {nombre:"Villa Alemana"}
        ]
    },    {
        nombre : "Metropolitana",
        comuna: [
            {nombre:"Providencia"},
            {nombre:"Las condes"},
            {nombre:"Santiago centro"},
        ]
    }
]