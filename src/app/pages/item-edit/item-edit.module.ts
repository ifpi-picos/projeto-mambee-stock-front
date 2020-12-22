import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemEditComponent } from './item-edit.component';
import { DefaultModule } from 'src/app/shared/components/default/default.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ItemEditComponent],
  imports: [
    CommonModule,
    DefaultModule,
    ReactiveFormsModule
  ]
})
export class ItemEditModule { }
