export interface Modulo {
  id: string;
  orden: number;
  id_curso: number;
  nombre_modulo: string;
  area: string;
  fecha_creado: Date;
  activo: boolean;
  creado_por: string;
}

export interface SubModulo {
  id: number;
  orden: number;
  id_modulo: number;
  nombre_submodulo: string;
  fecha_creado: Date;
  activo: boolean;
  creado_por: string;
  recursos?: Recurso[];
  nombre_modulo?: string;
}

export interface Recurso {
  id: number;
  tipo: 'video' | 'pdf' | 'imagen' | 'audio' | 'texto';
  contenido: string;
  orden: number;
}
