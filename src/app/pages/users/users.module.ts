import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListModule } from './users-list/users-list.module'
import { UserEditModule } from './user-edit/user-edit.module';
import { UserRegistrationModule } from './user-registration/user-registration.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UsersListModule,
    UserEditModule,
    UserRegistrationModule,
  ]
})
export class UsersModule { }