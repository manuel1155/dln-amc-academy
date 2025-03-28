import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursoService } from './../../../service/cursos/curso.service';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef} from 'ag-grid-community';
import { formatDate } from '@angular/common';
import { Curso } from '../../../interfaces/curso';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-cursos',
  standalone: true,
  imports: [CommonModule, AgGridModule],
  templateUrl: './lista-cursos.component.html',
  styleUrl: './lista-cursos.component.scss'
})
export class ListaCursosComponent implements OnInit {

  cursos$:any;

  columnDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', sortable: true, filter: true, width: 100 },
    { field: 'titulo', headerName: 'Titulo', sortable: true, filter: true, width: 350},
    { field: 'objetivo', headerName: 'Objetivo del curso', sortable: true, filter: true, width: 350 },
    { field: 'importancia', headerName: 'Importancia', sortable: true, filter: true },
    {
      field: 'f_creado',
      headerName: 'Creado el',
      sortable: true,
      filter: true,
      valueFormatter: this.dateFormatter, // Add the formatter here
    },
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

  done: boolean=false;

  constructor(private cursoService: CursoService, private router: Router) {}
  
  ngOnInit(): void {
    this.cursoService.getCursos().subscribe((cursos: Curso[]) => {
      this.cursos$= cursos;
      this.done=true;
    });
  }

  deleteCurso(id: string) {
    //this.cursoService.deleteCurso(id).then(() => console.log('Curso deleted'));
    console.log('metodo sin implementar');
  }

  dateFormatter(params: any): string {
    //console.log(params.value.toDate())
    console.log(params.value);
    return formatDate(params.value, 'dd-MMM-yyyy', 'es-MX');;
    //formatDate(params.value.toDate(), 'dd-MMM-yyyy', 'es-MX');
  }

  goToDatails(curso: Curso) {
    this.router.navigate(['/cursos/', curso.id,'ver-detalles']);
  }

}
