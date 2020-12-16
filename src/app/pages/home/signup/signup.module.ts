import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SignupComponent } from './signup.component';
import { RouterModule } from '@angular/router';
import { MessageErrorModule } from 'src/app/shared/components/message-error/message-error.module';

@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    MessageErrorModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class SignupModule {}
