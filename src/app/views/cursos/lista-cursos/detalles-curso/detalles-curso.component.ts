import { CommonModule, JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccordionButtonDirective, AccordionComponent, AccordionItemComponent, BadgeComponent, ButtonGroupComponent, ColComponent, RowComponent, TableActiveDirective, TableColorDirective, TableDirective, TemplateIdDirective } from '@coreui/angular';
import { Curso } from 'src/app/interfaces/curso';
import { Modulo } from 'src/app/interfaces/modulos';
import { ModuloService } from 'src/app/service/modulos/modulo.service';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef} from 'ag-grid-community';

@Component({
  selector: 'app-detalles-curso',
  standalone: true,
  imports: [JsonPipe, AccordionComponent, BadgeComponent, AccordionItemComponent, TemplateIdDirective, AccordionButtonDirective, CommonModule, RowComponent, ColComponent, TableDirective, TableColorDirective, TableActiveDirective],
  templateUrl: './detalles-curso.component.html',
  styleUrl: './detalles-curso.component.scss'
})
export class DetallesCursoComponent implements OnInit {

  idCurso: string ='';
  currentCurso: Curso | null = null;
  modulosCurso: any;

  columnDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', sortable: true, filter: true, width: 100},
    { field: 'titulo', headerName: 'Titulo', sortable: true, filter: true, width: 250},
    { field: 'objetivo_curso', headerName: 'Objetivo del curso', sortable: true, filter: true },
    { field: 'importancia', headerName: 'Importancia', sortable: true, filter: true },
    {
      headerName: 'Actions',
      field: 'actions',
      cellRenderer: (params: any) => {
        return `
          <button class="btn btn-primary" data-action="show">Ver</button>
          <button class="btn btn-danger" data-action="delete">Borrar</button>
        `;
      },
      onCellClicked: (params: any) => {
        if (params.event.target.dataset.action === 'show') {
          console.log('Click Show');
          this.goToDatails(params.data);
        } else if (params.event.target.dataset.action === 'delete') {
          console.log('Click Delete');
          console.log('Metodo no implementado aun');
        }
      }
    }
  ];
  
  constructor(private route: ActivatedRoute, private moduloService: ModuloService) { }

  ngOnInit(): void {
     this.route.params.subscribe(params => {
      this.idCurso = params['id'];

      this.modulosCurso = this.moduloService.getModulosCurso(this.idCurso);
      this.modulosCurso.subscribe((params: Modulo[]) => {
        console.log(params);
      });
    });

    // Retrieve the query parameters (name, age)
    this.route.queryParams.subscribe(queryParams => {
      let id = queryParams['id'];
      let titulo = queryParams['titulo'];
      let objetivo_curso = queryParams['objetivo_curso'];
      let dirigido_a = queryParams['dirigido_a'];
      let duracion = +queryParams['duracion'];
      let tiempo_prom_clase = +queryParams['tiempo_prom_clase'];
      let modalidad = queryParams['modalidad'];
      let comentarios_duracion = queryParams['comentarios_duracion'];
      let importancia = queryParams['importancia'];
      let comentarios_grales = queryParams['comentarios_grales'];
      let fecha_creado = queryParams['fecha_creado'];
      let activo = queryParams['activo'];
      let creado_por = queryParams['creado_por'];
      
      this.currentCurso = {
        id: id,
        titulo: titulo,
        objetivo_curso: objetivo_curso,
        dirigido_a: dirigido_a,
        duracion: duracion,
        tiempo_prom_clase: tiempo_prom_clase,
        modalidad: modalidad,
        comentarios_duracion: comentarios_duracion,
        importancia: importancia,
        comentarios_grales: comentarios_grales,
        fecha_creado: new Date(fecha_creado),
        activo: activo === 'true',
        creado_por: creado_por
      }
      
      console.log(this.currentCurso)
      
    });
  }

  goToDatails(curso: Curso) {

  }

}
