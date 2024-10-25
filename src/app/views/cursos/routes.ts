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
        path: 'cursos',
        loadComponent: () => import('./lista-cursos/lista-cursos.component').then(m => m.ListaCursosComponent),
        data: {
          title: 'Lista de cursos'
        }
      },
      {
        path: 'cursos/:id/detalles',
        loadComponent: () => import('./lista-cursos/detalles-curso/detalles-curso.component').then(m => m.DetallesCursoComponent),
        data: {
          title: 'Mis cursos'
        }
      },
      {
        path: 'alumnos/mis-cursos',
        loadComponent: () => import('./alumnos/lista-cursos/lista-cursos.component').then(m => m.ListaCursosComponent),
        data: {
          title: 'Mis cursos'
        }
      }
    ]
  }
];
