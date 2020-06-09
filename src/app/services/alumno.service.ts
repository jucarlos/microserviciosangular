import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alumno } from '../models/alumno';
import { URL_BASE, API_ALUMNOS } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AlumnoService {


  private endPoint = URL_BASE + API_ALUMNOS;

  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor( private http: HttpClient ) { }


  public listar(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.endPoint);
  }

  public listarPaginas( page: string, size: string): Observable<any>{
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);

    return this.http.get<any>( `${this.endPoint}/pagina`, { params } );
  }

  public ver( id: number ): Observable<Alumno> {
    return this.http.get<Alumno>(`${this.endPoint}/${id}`);
  }

  public crear(alumno: Alumno ): Observable<Alumno>{
    return this.http.post<Alumno>( this.endPoint, alumno, { headers: this.headers } );
  }

  public editar(alumno: Alumno ): Observable<Alumno>{
    return this.http.put<Alumno>(
      `${this.endPoint}/${alumno.id}`,
      alumno,
      { headers: this.headers } );
  }

  public eliminar( id: number ): Observable<void>{
    return this.http.delete<void>(`${this.endPoint}/${id}`);
  }


}
