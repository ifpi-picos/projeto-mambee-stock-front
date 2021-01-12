import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItensListModule } from './itens-list/itens-list.module';
import { ItemEditModule } from './item-edit/item-edit.module';
import { ItensRegistrationModule } from './itens-registration/itens-registration.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ItensListModule,
    ItemEditModule,
    ItensRegistrationModule
  ]
})
export class ItensModule { }
