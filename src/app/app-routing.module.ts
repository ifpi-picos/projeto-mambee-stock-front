import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthguardService } from './core/services/authguard.service';
import { Authguard2Service } from './core/services/authguard2.service';
import { SigninComponent } from './pages/home/signin/signin.component';
import { ItemEditComponent } from './pages/item-edit/item-edit.component';
import { ItensRegistrationComponent } from './pages/itens-registration/itens-registration.component';
import { ItensComponent } from './pages/itens/itens.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { UserRegistrationComponent } from './pages/user-registration/user-registration.component';
import { UsersComponent } from './pages/users/users.component';


const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent, canActivate: [Authguard2Service] },
  { path: 'itens-registration', component: ItensRegistrationComponent, canActivate: [AuthguardService] },
  { path: 'itens', component: ItensComponent, canActivate: [AuthguardService] },
  { path: 'item-edit', component: ItemEditComponent, canActivate: [AuthguardService] },
  { path: 'user-registration', component: UserRegistrationComponent, canActivate: [AuthguardService] },
  { path: 'users', component: UsersComponent, canActivate: [AuthguardService] },
  { path: 'user-edit', component: UserEditComponent, canActivate: [AuthguardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
