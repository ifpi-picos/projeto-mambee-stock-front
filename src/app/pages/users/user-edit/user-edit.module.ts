import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserEditComponent } from './user-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DefaultModule } from 'src/app/shared/components/default/default.module';


@NgModule({
  declarations: [UserEditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DefaultModule
  ]
})
export class UserEditModule { }
