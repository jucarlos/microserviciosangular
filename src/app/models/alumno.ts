import { Generic } from '../interfaces/generic';

export class Alumno implements Generic{

    id: number;
    nombre: string;
    apellidos: string;
    email: string;
    createAt: string;
    fotoHashCode: number;
}
