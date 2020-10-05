import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeoPage } from './feo.page';

const routes: Routes = [
  {
    path: '',
    component: FeoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeoPageRoutingModule {}
