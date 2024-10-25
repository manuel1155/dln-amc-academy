export interface Usuario {
  id: string;
  nombres: string;
  primer_apellido: string;
  segundo_apellido: string;
  email: string;
  edad?: number;
  permisos?: object;
  activo: boolean;
  rol: string;
}
