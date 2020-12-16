import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SigninModule } from './signin/signin.module';
import { SignupModule } from './signup/signup.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, SigninModule, SignupModule],
})
export class HomeModule {}
