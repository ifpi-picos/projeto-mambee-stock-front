import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItensComponent } from './itens.component';
import { DefaultModule } from 'src/app/shared/components/default/default.module';



@NgModule({
  declarations: [ItensComponent],
  imports: [
    CommonModule,
    DefaultModule
  ]
})
export class ItensModule { }
