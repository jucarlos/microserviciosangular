import { Alumno } from './alumno';
import { Examen } from './examen';
import { Generic } from '../interfaces/generic';

export class Curso implements Generic {
    id: number;
    nombre: string;
    createAt: string;
    alumnos: Alumno[] = [];
    examenes: Examen[] = [];
}
