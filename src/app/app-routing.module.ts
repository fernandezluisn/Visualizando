import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'botones',
    loadChildren: () => import('./paginas/botones/botones.module').then( m => m.BotonesPageModule)
  },
  {
    path: 'subir-foto',
    loadChildren: () => import('./paginas/subir-foto/subir-foto.module').then( m => m.SubirFotoPageModule)
  },
  {
    path: 'listado-fotos',
    loadChildren: () => import('./paginas/listado-fotos/listado-fotos.module').then( m => m.ListadoFotosPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
