import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthServiceService } from 'src/app/servicios/auth-service.service';
import { BdaService } from 'src/app/servicios/bda.service';
import { foto } from 'src/clases/foto';
import { Usuario } from 'src/clases/usuario';
import { DatePipe } from '@angular/common'


@Component({
  selector: 'app-listado-fotos',
  templateUrl: './listado-fotos.page.html',
  styleUrls: ['./listado-fotos.page.scss'],
})
export class ListadoFotosPage implements OnInit {

  lindas:foto[];
  feas:foto[];
  user;
  usuarioLogeado:Usuario;
  listaElegida:foto[];
  eleg;
  loading;

  constructor(private bda:BdaService, private service:AuthServiceService, private router:Router,public alertController: AlertController, 
    private loadingCtrl: LoadingController) { 
    this.service.tomarUsuario().then(res=>{
      this.user=res;
      this.bda.devolverListadoUsuarios().subscribe(listaU=>{
        listaU.filter(usu=>{
          if(usu.correo==this.user.email)
          this.usuarioLogeado=usu;
        })
      })
    })
    this.bda.devolverListadoFotosLindas().subscribe(lista=>this.lindas=lista)
    this.bda.devolverListadoFotosFeas().subscribe(listaF=>this.feas=listaF)
  }

  ngOnInit() {
  }

  elegirLista(lista:string){
    if(lista=="F")
    {
      this.eleg="F";
      this.listaElegida=null;
      this.listaElegida=this.feas;
    }else{
      this.eleg="L";
      this.listaElegida=null;
      this.listaElegida=this.lindas;
    }
    this.listaElegida.sort((a,b) => Number(Date.parse(a.fecha.toString())) - Number(Date.parse(b.fecha.toString())));
  }

  votar(foto:foto){
    if(this.eleg=="F"){
      if(this.usuarioLogeado.votoFeo){
        this.alertar("Usted ya votó en esta sección.");
      }else{
        this.presentLoading("Subiendo el voto");
        foto.votos++;
        this.bda.updateFotoFea(foto);
        this.usuarioLogeado.votoFeo=true;
        this.bda.updateUsuario(this.usuarioLogeado);
      }
      
    }else{
      if(this.usuarioLogeado.votoLindo){
        this.alertar("Usted ya votó en esta sección.");
      }else{
        this.presentLoading("Subiendo el voto");
        foto.votos++;
        this.bda.updateFotoLinda(foto);
        this.usuarioLogeado.votoLindo=true;
        this.bda.updateUsuario(this.usuarioLogeado);
      }
      
    }
  }

  salir(){     
    this.service.logOutUser();    
    this.router.navigate(['login']);
  }

  async alertar(mensaje:string){
    const alert= this.alertController.create({
      cssClass: 'danger-alert-btn',
      header: 'Error',
      subHeader: 'Error',
      message: mensaje,
      buttons: ['OK']
    });

    (await alert).present();
  }

  async presentLoading(message: string) {
    this.loading = await this.loadingCtrl.create({
        message,
        spinner: "crescent",
        duration: 2500
    });
    return this.loading.present();
  }
    
} 


