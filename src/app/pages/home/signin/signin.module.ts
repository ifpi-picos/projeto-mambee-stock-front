import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SigninComponent } from './signin.component';
import { MessageErrorModule } from 'src/app/shared/components/message-error/message-error.module';
import { DefaultModule } from 'src/app/shared/components/default/default.module';

@NgModule({
  declarations: [SigninComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MessageErrorModule,
    RouterModule,
    DefaultModule
  ],
})
export class SigninModule {}
