import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Cursos'
    },
    children: [
      {
        path: '',
        redirectTo: 'cursos',
        pathMatch: 'full'
      },  
      {
        path: 'lista',
        loadComponent: () => import('./lista-cursos/lista-cursos.component').then(m => m.ListaCursosComponent),
        data: {
          title: 'Lista de cursos'
        }
      },
      {
        path: ':id/ver-detalles',
        loadComponent: () => import('./lista-cursos/detalles-curso/detalles-curso.component').then(m => m.DetallesCursoComponent),
        data: {
          title: 'Detalle de curso'
        }
      },
      {
        path: 'alumnos/mis-cursos',
        loadComponent: () => import('./alumnos/lista-cursos/lista-cursos.component').then(m => m.ListaCursosComponent),
        data: {
          title: 'Mis cursos'
        }
      },
      {
        path: 'alumnos/mis-cursos/:idAsig',
        loadComponent: () => import('./alumnos/lista-cursos/detalles-curso/detalles-curso.component').then(m => m.DetallesCursoComponent),
        data: {
          title: 'Curso asignado'
        }
      },
      {
        path: 'alumnos/mis-cursos/:idCurso/modulo/:idModulo/submodulo/:idSubmodulo/contenido',
        loadComponent: () => import('./alumnos/lista-cursos/contenido-submodulo/contenido-submodulo.component').then(m => m.ContenidoSubmoduloComponent),
        data: {
          title: 'Contenido del curso'
        }
      }
    ]
  }
];
