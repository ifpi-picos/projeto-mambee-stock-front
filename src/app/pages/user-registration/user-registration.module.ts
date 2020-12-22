import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRegistrationComponent } from './user-registration.component';
import { DefaultModule } from 'src/app/shared/components/default/default.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [UserRegistrationComponent],
  imports: [
    CommonModule,
    DefaultModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class UserRegistrationModule { }
