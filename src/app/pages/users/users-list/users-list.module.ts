import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list.component';
import { DefaultModule } from 'src/app/shared/components/default/default.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [UsersListComponent],
  imports: [
    CommonModule,
    DefaultModule,
    ReactiveFormsModule
  ]
})
export class UsersListModule { }
