import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeoPageRoutingModule } from './feo-routing.module';

import { FeoPage } from './feo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeoPageRoutingModule
  ],
  declarations: [FeoPage]
})
export class FeoPageModule {}
