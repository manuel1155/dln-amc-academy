import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BadgeComponent, ColComponent, RowComponent } from '@coreui/angular';
import { Curso } from './../../../../interfaces/curso';
import { ModuloService } from './../../../../service/modulos/modulo.service';
import { CursoService } from '../../../../service/cursos/curso.service';

@Component({
  selector: 'app-detalles-curso',
  standalone: true,
  imports: [BadgeComponent, CommonModule, RowComponent, ColComponent],
  templateUrl: './detalles-curso.component.html',
  styleUrl: './detalles-curso.component.scss',
})
export class DetallesCursoComponent implements OnInit {
  idCurso: number = 0;
  currentCurso: Curso | null = null;
  modulosCurso: any;
  error: boolean = false;
  done: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private moduloService: ModuloService,
    private cursoService: CursoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('- detalles-curso ver oninit');

    this.route.params.subscribe((params) => {
      this.error = false;
      this.done = false;
      this.idCurso = +params['id'];
      console.log(this.idCurso);

      this.cursoService.getCursoById(this.idCurso).subscribe((data: any) => {
        console.log(data);
        if (data.success) {
          this.currentCurso = data.data[0];
          console.log(this.currentCurso);
          this.moduloService
            .getModulosCurso(this.idCurso)
            .subscribe((params: any) => {
              console.log(params);
              this.modulosCurso = params.data;
              this.done = true;
            });
        } else {
          console.log('Error al obtener el curso');
          this.error = true;
          this.done = true;
        }
      });
    });
  }

  goToListaCursos() {
    this.router.navigate(['/cursos/lista']);
  }
}
