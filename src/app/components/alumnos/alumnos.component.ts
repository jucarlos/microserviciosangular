import { Component, OnInit, ViewChild } from '@angular/core';
import { Alumno } from '../../models/alumno';
import { AlumnoService } from '../../services/alumno.service';

import Swal from 'sweetalert2';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { URL_BASE, API_ALUMNOS } from '../../../environments/environment';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {

  titulo = 'Listado de Alumnos';

  ruta = URL_BASE + API_ALUMNOS;

  alumnos: Alumno[] = [];

  totalRegistros  = 0;
  totalPorPagina  = 5;
  paginaActual    = 0;
  pageSizeOptions = [3 , 5, 10, 25, 100 ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private alumnoService: AlumnoService) { }

  ngOnInit(): void {
    this.cargaAlumnos();
  }

  paginar( event: PageEvent ){
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    this.cargaAlumnos();
  }

  borrar(id: number) {

    Swal.fire({
      title: '¿Estás seguro',
      text: 'No podrás volver a recuperar este alumno',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, bórralo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {

        this.alumnoService.eliminar(id)
        .subscribe( () => {
          Swal.fire('Eliminar', 'Alumno Eliminado', 'success');
          this.cargaAlumnos();
          // this.alumnos = this.alumnos.filter( alu => {
          //   return alu.id !== id ;
          // });
      });


        Swal.fire(
          'Borrado!',
          'Alumno Borrado',
          'success'
        );
      }
    });


  }

  private cargaAlumnos() {
   
    // this.alumnoService.listar().subscribe( data => {
    //   console.log( data );
    //   this.alumnos = data;
    // });

    this.alumnoService.listarPaginas( this.paginaActual.toString(), this.totalPorPagina.toString() )
      .subscribe( (data: any) => {

        this.alumnos = data.content as Alumno[];
        this.totalRegistros = data.totalElements as number;
        this.paginator._intl.itemsPerPageLabel = 'Registros por página';
      });
  }

}

