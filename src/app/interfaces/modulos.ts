export interface Modulo {
    id: string;
    orden: number;
    id_curso: string;
    nombre_modulo: string;
    area: string;
    fecha_creado: Date;
    activo: boolean;
    creado_por: string
}

export interface SubModulo {
    id: string;
    orden: number;
    id_modulo: string;
    nombre_submodulo: string;
    fecha_creado: Date;
    activo: boolean;
    creado_por: string
    recursos?: Recurso []
}

export interface Recurso {
    tipo: 'video'| 'pdf';
    url: string
}