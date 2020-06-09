import { Component, OnInit } from '@angular/core';
import { Alumno } from '../../models/alumno';
import { AlumnoService } from '../../services/alumno.service';
import { Router, ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-alumnos-form',
  templateUrl: './alumnos-form.component.html',
  styleUrls: ['./alumnos-form.component.css']
})
export class AlumnosFormComponent implements OnInit {

  titulo = 'Crear Alumno';

  alumno: Alumno = new Alumno();

  error: any;


  constructor(
      private alumnoService: AlumnoService,
      private router: Router,
      private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id');
      if ( id ) {
        this.alumnoService.ver(id).subscribe( alumno => this.alumno = alumno );
      }
    });
  }

  crear() {
    this.alumnoService.crear( this.alumno ).subscribe( alumno => {
      // console.log ( alumno );
      Swal.fire(
        'Nuevo!',
        'Alumno Creado',
        'success'
      );
      this.router.navigate(['/alumnos']);
    }, error => {
      if ( error.status === 400 ){
        error = this.error;
      }
    });
  }

  editar(){
    this.alumnoService.editar( this.alumno ).subscribe( alumno => {
      // console.log ( alumno );
      Swal.fire(
        'Actualizado!',
        'Alumno Actualizado',
        'success'
      );
      this.router.navigate(['/alumnos']);
    }, error => {
      if ( error.status === 400 ){
        error = this.error;
      }
    });
  }

}
