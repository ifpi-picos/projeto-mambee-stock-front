import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItensRegistrationComponent } from './itens-registration.component';
import { DefaultModule } from 'src/app/shared/components/default/default.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskModule} from 'ngx-mask'



@NgModule({
  declarations: [ItensRegistrationComponent],
  imports: [
    CommonModule,
    DefaultModule,
    ReactiveFormsModule,
    RouterModule,
    NgxMaskModule.forRoot({validation: false})
  ]
})
export class ItensRegistrationModule { }
