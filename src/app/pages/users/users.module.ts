import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { DefaultModule } from 'src/app/shared/components/default/default.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    DefaultModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
