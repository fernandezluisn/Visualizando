import { Injectable } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  porc1:Observable<number>;
  constructor(private storage:AngularFireStorage) { }

  subirArchivo(nombreArchivo:string, file:any) { 
    
    return this.storage.upload(nombreArchivo, file);
    /*const task= this.storage.upload(nombreArchivo, file);
    this.porc1=task.percentageChanges();
    return this.porc1;*/
  }

  getReferencia(nombreArchivo:string) {
    return this.storage.ref(nombreArchivo);
  }
}
