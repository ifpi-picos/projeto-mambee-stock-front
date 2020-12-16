import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './pages/home/signin/signin.component';
import { SignupComponent } from './pages/home/signup/signup.component';
import { ItensRegistrationComponent } from './pages/itens-registration/itens-registration.component';
import { ItensComponent } from './pages/itens/itens.component';


const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'itens-registration', component: ItensRegistrationComponent },
  { path: 'itens', component: ItensComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
