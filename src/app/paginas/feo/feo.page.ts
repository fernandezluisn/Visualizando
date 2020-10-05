import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController, LoadingController } from '@ionic/angular';
import { element } from 'protractor';
import { finalize } from 'rxjs/operators';
import { AuthServiceService } from 'src/app/servicios/auth-service.service';
import { BdaService } from 'src/app/servicios/bda.service';
import { foto } from 'src/clases/foto';
import { Usuario } from 'src/clases/usuario';
@Component({
  selector: 'app-feo',
  templateUrl: './feo.page.html',
  styleUrls: ['./feo.page.scss'],
})
export class FeoPage implements OnInit {

  url1: string;
  loading;
  image: string = null;
  user;
  fecha;
  usuarioLog:Usuario;
  constructor(private storage:AngularFireStorage,private camera: Camera, private alertController:AlertController,
    private loadingCtrl:LoadingController, private bda:BdaService, private service:AuthServiceService, private router:Router,
    private datePipe:DatePipe) {
    
      this.service.tomarUsuario().then(res=>{
        this.user=res;
        this.bda.devolverListadoUsuarios().subscribe(lista=>{
          lista.filter(element=>{
            if(element.correo==this.user.email){
              this.usuarioLog=element;              
            }
          })
        })
      })

      let f=new Date();
      this.fecha=this.datePipe.transform(f, "dd-MM-yyyy");
   }

  ngOnInit() {
  }

  async alertar(mensaje:string){
    const alert= this.alertController.create({
      cssClass: 'danger-alert-btn',
      header: 'Error',
      subHeader: 'La cámara no ha podido cargar la imagen',
      message: mensaje,
      buttons: ['OK']
    });

    (await alert).present();
  }

  async presentLoading(message: string) {
    this.loading = await this.loadingCtrl.create({
        message,
        spinner: "crescent",
        duration: 4500
    });
    return this.loading.present();

    
  }

  async sacarFoto(){
    this.presentLoading("Cargando imagen");
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 1000,
      targetHeight: 1000
    }

    await this.camera.getPicture(options).then((imageData) => {
      this.image = `data:image/jpeg;base64,${imageData}`;   
      this.bda.createObjeto(imageData);    
     }, (err) => {
      this.alertar(err);
     });
  }

  async subir(){
    this.presentLoading("Subiendo imagen");

    try{
      const com=this.usuarioLog.apellido+this.fecha+Math.random()*100;
      let img;
      await fetch(this.image)
      .then(res => res.blob().then(r=>{
        img=r
      }))
      
      const file= img;
      const path= com;
      const ref=this.storage.ref(path);    
      const task=this.storage.upload(path, file);     
      task.snapshotChanges().pipe(finalize(()=>ref.getDownloadURL().subscribe(url=>{
        this.url1=url;
        let f=new foto(this.url1, this.usuarioLog, this.fecha);
      this.bda.createFotoFea(f);
      this.router.navigate(["listado-fotos"]);
      } ))).subscribe(); 
      
    }catch(err){
      this.alertar(err);
      this.bda.createObjeto(err);
    }    

  }

  salir(){     
    this.service.logOutUser();    
    this.router.navigate(['login']);
  }


}
