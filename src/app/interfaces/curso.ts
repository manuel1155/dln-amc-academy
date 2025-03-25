export interface Curso {
    id: string;
    titulo: string;
    objetivo?: string;
    dirigido_a: string;
    duracion: number;
    tiempo_prom_clase?: number;
    modalidad?: string[];
    comentarios_duracion?: string;
    importancia?: string;
    comentarios_generales?: string;
    f_creado: Date;
    activo: boolean;
    creado_por?: string
}
