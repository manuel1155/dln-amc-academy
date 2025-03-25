import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SubModulosService } from '../../../../../service/sub-modulos/sub-modulos.service';
import { Recurso, SubModulo } from '../../../../../interfaces/modulos';
import { SafePipe } from '../../../../../pipe/safe.pipe';
import { ModuloService } from '../../../../../service/modulos/modulo.service';
import { cilList, cilArrowCircleRight, cilArrowCircleLeft } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';

@Component({
  selector: 'app-contenido-submodulo',
  standalone: true,
  imports: [CommonModule, SafePipe, IconDirective],
  templateUrl: './contenido-submodulo.component.html',
  styleUrl: './contenido-submodulo.component.scss',
})
export class ContenidoSubmoduloComponent {
  idModulo: number = 0;
  idSubmodulo: number = 0;
  idCurso: number = 0;
  idAsig: number = 0;
  listaRecursos: Recurso[] = [];
  detModulo: SubModulo[] = [];
  currentSubModulo: any | undefined;
  prevSubModulo: any | undefined;
  nextSubModulo: any | undefined;

  icons = {
    cilList,
    cilArrowCircleRight,
    cilArrowCircleLeft
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private moduloService: ModuloService,
    private SubModService: SubModulosService,
  ) {
    console.log('- Inicializando ContenidoSubmoduloComponent');
    this.listaRecursos = [];
    this.idModulo = 0;
    this.idSubmodulo = 0;
    this.idCurso = 0;
  }

  async ngOnInit(): Promise<void> {
    console.log('- Contenidos de un submodulo');

    this.route.queryParams.subscribe(params => {
      this.idAsig = +params['id_asig'];
      console.log('- idAsig: ', this.idAsig)

      this.route.params.subscribe(async (params) => {
        this.idCurso = params['idCurso'];
        this.idModulo = params['idModulo'];
        this.idSubmodulo = params['idSubmodulo'];
          console.log('- idCurso', this.idCurso);
          console.log('- idModulo', this.idModulo);
          console.log('- idSubmodulo', this.idSubmodulo);
  
        this.detModulo = await new Promise ((resolve) => {
          this.moduloService.getDetalleModulo(this.idModulo,this.idModulo,this.idAsig).subscribe(async (data:any) =>{
            console.log('Recibimos los recursos', data);
            if(data) {
              this.currentSubModulo = data.filter((item: any) => item.id_submodulo == this.idSubmodulo)[0];
              if(this.currentSubModulo.orden_sub == 0){
                this.prevSubModulo = null;
                this.nextSubModulo = data.filter((item: any) => item.orden_sub == this.currentSubModulo.orden_sub+1)[0];
              }else if(this.currentSubModulo.orden_sub+1 == data.length){
                this.prevSubModulo = data.filter((item: any) => item.orden_sub == this.currentSubModulo.orden_sub-1)[0];
                this.nextSubModulo = null;
              }else{
                this.prevSubModulo = data.filter((item: any) => item.orden_sub == this.currentSubModulo.orden_sub-1)[0];
                this.nextSubModulo = data.filter((item: any) => item.orden_sub == this.currentSubModulo.orden_sub+1)[0];
              }
              console.log('Previo', this.prevSubModulo);
              console.log('Actual', this.currentSubModulo);
              console.log('Siguiente', this.nextSubModulo);
              if(this.currentSubModulo.estatus_modulo == null){
                console.log("funcion para crear el estatus del modulo");
                let result:any = await this.moduloService.postIniciarModulo(this.idAsig,this.currentSubModulo.id_modulo);
                if(result.data) {
                  console.log("Se creó el estatus del modulo");
                }
              }
              if(this.currentSubModulo.estatus_submodulo == null){
                console.log("funcion para crear el estatus del submodulo");
                let result:any = await this.moduloService.postIniciarSubmodulo(this.idAsig,this.currentSubModulo.id_submodulo);
                if(result.data) {
                  console.log("Se creó el estatus del submodulo");
                }
              }
              resolve(data)
            }
            else resolve([]);
          });
        })
  
        console.log(this.detModulo);
  
        this.listaRecursos = await new Promise ((resolve) => {
          this.SubModService.getRecursosPorSubmodulo(this.idSubmodulo).subscribe((data:any) =>{
            if(data.data) resolve(data.data)
            else resolve([]);
          });
        }) 
      });

    });
  }

  goToDetallesCurso(idAsignacion: number = 1) {
    console.log('Ver detalles asignación:', idAsignacion);
    this.router.navigate(['cursos/alumnos/mis-cursos', idAsignacion]);
  }

  goToTemaCurso(idModulo: number, idSubtema: number): void {
    console.log('Id Curso:', this.idCurso);
    console.log('Id Modulo:', idModulo);
    console.log('Id Subtema:', idSubtema);
    
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
