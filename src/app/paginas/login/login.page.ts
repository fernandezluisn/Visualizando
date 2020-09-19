import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from '../../servicios/auth-service.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email:string;
  password:string;
  loading: any;
  

  
  
  constructor(private servicio:AuthServiceService, private router:Router, public alertController: AlertController, 
    private loadingCtrl: LoadingController ) { 
    this.email="";
    this.password="";

  }

  ngOnInit() {
  }

  async alertar(mensaje:string){
    const alert= this.alertController.create({
      cssClass: 'danger-alert-btn',
      header: 'Error',
      subHeader: 'Datos incorrectos',
      message: mensaje,
      buttons: ['OK']
    });

    (await alert).present();
  }

  login(){
    if(this.password.length>5)
    {
      this.presentLoading('Ingresando a la página...');
      this.servicio.loginUser(this.email, this.password).then(res=>{
        
        this.router.navigate(['botones']);
        
      }).catch(error=>{
        this.alertar("Los datos ingresados no son correctos");      
      });
    }else{
      this.alertar("La contraseña debe tener más de 5 carácteres.");
    }
    
  }

  async presentLoading(message: string) {
    this.loading = await this.loadingCtrl.create({
        message,
        spinner: "crescent",
        duration: 2500
    });
    return this.loading.present();

    
}

  carg2(opcion:string){
    switch(opcion){
      case "Invitado":
        this.email="invitado@invitado.com";
        this.password="222222";
        break;
      case "Crear nuevo usuario":
        this.email="";
        this.password="";
        break;
      case "Usuario":
        this.email="usuario@usuario.com";
        this.password="333333";
        break;
      case "Admin":
        this.email="admin@admin.com";
        this.password="111111";
        break;
      case "Tester":
        this.email="tester@tester.com";
        this.password="555555";
        break;
    }
  }


}
