import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItensListComponent } from './itens-list.component';
import { DefaultModule } from 'src/app/shared/components/default/default.module';



@NgModule({
  declarations: [ItensListComponent],
  imports: [
    CommonModule,
    DefaultModule
  ]
})
export class ItensListModule { }
