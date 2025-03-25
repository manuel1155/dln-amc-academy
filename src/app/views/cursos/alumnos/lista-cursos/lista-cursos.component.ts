import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CursoService } from '../../../../service/cursos/curso.service';
import { AuthService } from '../../../../service/auth.service';

@Component({
  selector: 'app-lista-cursos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-cursos.component.html',
  styleUrl: './lista-cursos.component.scss',
})
export class ListaCursosComponent implements OnInit {
  cursosAsignados: any;

  constructor(
    private router: Router,
    private cursoService: CursoService,
    private auth: AuthService
  ) {}
  ngOnInit(): void {
    let idUser = '';
    if (this.auth.currentUser != null) idUser = this.auth.currentUser.uid;
    console.log(idUser);
    this.cursoService.getCursoAsigAlumno(idUser).subscribe((cursos: any) => {
      this.cursosAsignados = cursos.data;
      console.log(this.cursosAsignados);
    });
  }

  async goToDetallesCurso(idAsignacion: number, cursoEstatus: string) {
    console.log('Ver detalles asignación:', idAsignacion);

    if (cursoEstatus == 'por_iniciar') {
      console.log('se actualizará la fecha de inicio del curso y el estatus');
      let result:any = await this.cursoService.putIniciarAsignacion(idAsignacion);

      if (result?.status == 200)
        this.router.navigate(['cursos/alumnos/mis-cursos', idAsignacion]);
      else
        console.error(
          'Error al registrar el inicio de curso, código: ' + result['status']
        );
    } else {
      this.router.navigate(['cursos/alumnos/mis-cursos', idAsignacion]);
    }
  }
}
