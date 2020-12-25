import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './pages/home/signin/signin.component';
import { SignupComponent } from './pages/home/signup/signup.component';
import { ItemEditComponent } from './pages/item-edit/item-edit.component';
import { ItensRegistrationComponent } from './pages/itens-registration/itens-registration.component';
import { ItensComponent } from './pages/itens/itens.component';
import { UserRegistrationComponent } from './pages/user-registration/user-registration.component';
import { UsersComponent } from './pages/users/users.component';


const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'itens-registration', component: ItensRegistrationComponent },
  { path: 'itens', component: ItensComponent },
  { path: 'item-edit', component: ItemEditComponent },
  { path: 'user-registration', component: UserRegistrationComponent },
  { path: 'users', component: UsersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
