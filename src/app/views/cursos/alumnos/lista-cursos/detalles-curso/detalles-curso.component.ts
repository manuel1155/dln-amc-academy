import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BadgeComponent,
  ButtonDirective,
  ColComponent,
  RowComponent,
} from '@coreui/angular';
import { CommonModule } from '@angular/common';
import { ModuloService } from '../../../../../service/modulos/modulo.service';
import { CursoService } from '../../../../../service/cursos/curso.service';
import { Curso } from '../../../../../interfaces/curso';

@Component({
  selector: 'app-detalles-curso',
  standalone: true,
  imports: [
    BadgeComponent,
    CommonModule,
    RowComponent,
    ColComponent,
    ButtonDirective,
  ],
  templateUrl: './detalles-curso.component.html',
  styleUrl: './detalles-curso.component.scss',
})
export class DetallesCursoComponent {
  idCurso: number = 0;
  idAsig: number = 0;
  modulosCurso: any;
  currentCurso: Curso | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private moduloService: ModuloService,
    private cursoService: CursoService
  ) {}

  async ngOnInit(): Promise<void> {
    console.log('- detalles-curso oninit');

    this.route.params.subscribe(async (params) => {
      this.idAsig = params['idAsig'];
      console.log('idAsignacion:', params['idAsig']);

      this.idCurso = 1; //faltan funciones para obtener el curso con el dato de la asignación

      this.currentCurso = await new Promise((resolve) => {
        this.cursoService.getCursoById(this.idCurso).subscribe((response: any) => {
          resolve(response.data[0]);
        });
      });

      this.moduloService
        .getModSubDetInfo(this.idAsig,this.idCurso)
        .subscribe((params: any) => {
          console.log(params);
          this.modulosCurso = params.data;
          console.log(this.modulosCurso);
        });
    });
  }

  goToTemaCurso(idModulo: number, idSubtema: number): void {
    console.log('id Asignación: ',this.idAsig);
    this.router.navigate([
      '/cursos/alumnos/mis-cursos/',
      this.idCurso,
      'modulo',
      idModulo,
      'submodulo',
      idSubtema,
      'contenido',
    ],{ queryParams: { id_asig: this.idAsig } });
  }
}
