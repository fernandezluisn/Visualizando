import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/clases/usuario';
import { map } from 'rxjs/operators';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import { foto } from 'src/clases/foto';

@Injectable({
  providedIn: 'root'
})
export class BdaService {

  listaUsuarios:Observable<Usuario[]>;  
  listaFotosFeas:Observable<foto[]>;
  listaFotosLindas:Observable<foto[]>;

  constructor(private db:AngularFirestore) { 

    this.listaFotosLindas=this.db.collection('imagenesLindas').snapshotChanges().pipe(
      map(actions=>{
        return actions.map(
          a=>{
            const data= a.payload.doc.data();
            const id=a.payload.doc.id;
            return {id, ...(data as any)}
          }
        );
      }
  
      )
  
     
    );

    this.listaFotosFeas=this.db.collection('imagenesFeas').snapshotChanges().pipe(
      map(actions=>{
        return actions.map(
          a=>{
            const data= a.payload.doc.data();
            const id=a.payload.doc.id;
            return {id, ...(data as any)}
          }
        );
      }
  
      )
  
     
    );

  this.listaUsuarios=this.db.collection('usuarios').snapshotChanges().pipe(
    map(actions=>{
      return actions.map(
        a=>{
          const data= a.payload.doc.data();
          const id=a.payload.doc.id;
          return {id, ...(data as any)}
        }
      );
    }

    )

   
  );
  }

  createUsuario(emp:Usuario): Promise<DocumentReference> {
    return this.db.collection('usuarios').add({...emp});
  }

  createObjeto(emp:any): Promise<DocumentReference> {
    return this.db.collection('objetos').add({...emp});
  }

  createFotoFea(emp:foto): Promise<DocumentReference> {
    return this.db.collection('imagenesFeas').add({...emp});
  }

  createFotoLinda(emp:foto): Promise<DocumentReference> {
    return this.db.collection('imagenesLindas').add({...emp});
  }

  devolverListadoUsuarios(){
    return this.listaUsuarios;
  }

  devolverListadoFotosFeas(){
    return this.listaFotosFeas;
  }

  devolverListadoFotosLindas(){
    return this.listaFotosLindas;
  }

  updateUsuario(usuario:Usuario) {        
  this.db.doc('usuarios/' + usuario.id).update({...usuario});    
  }

  updateFotoLinda(foto:foto) {        
    this.db.doc('imagenesLindas/' + foto.id).update({...foto});    
    }

  updateFotoFea(foto:foto) {        
    this.db.doc('imagenesFeas/' + foto.id).update({...foto});    
    }
}
