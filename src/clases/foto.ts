import { Usuario } from './usuario';

export class foto{

    ruta:string;
    usuario:Usuario;
    votos:number;
    fecha:string;
    id;

    constructor(ruta:string, usuario:Usuario, fecha:string){
        this.usuario=usuario;
        this.ruta=ruta;
        this.fecha=fecha;
        this.votos=0;
    }

}