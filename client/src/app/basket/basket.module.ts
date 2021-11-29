import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './basket.component';
import { BasketRoutingModule } from './basket-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    BasketComponent
  ],
  imports: [
    BasketRoutingModule,
    CommonModule, // if not importing this module - you get async pipe could not be found error,
    SharedModule
  ]
})
export class BasketModule { }
