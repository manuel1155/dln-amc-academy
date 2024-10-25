export interface Curso {
    id: string;
    titulo: string;
    objetivo_curso?: string;
    dirigido_a: string;
    duracion: number;
    tiempo_prom_clase?: number;
    modalidad?: string[];
    comentarios_duracion?: string;
    importancia?: string;
    comentarios_grales?: string;
    fecha_creado: Date;
    activo: boolean;
    creado_por?: string
}
