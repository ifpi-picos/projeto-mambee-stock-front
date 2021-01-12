import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthguardService } from './core/services/authguard.service';
import { Authguard2Service } from './core/services/authguard2.service';
import { SigninComponent } from './pages/home/signin/signin.component';
import { ItemEditComponent } from './pages/itens/item-edit/item-edit.component';
import { ItensListComponent } from './pages/itens/itens-list/itens-list.component';
import { ItensRegistrationComponent } from './pages/itens/itens-registration/itens-registration.component';
import { UserEditComponent } from './pages/users/user-edit/user-edit.component';
import { UserRegistrationComponent } from './pages/users/user-registration/user-registration.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';


const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent, canActivate: [Authguard2Service] },
  { path: 'itens-registration', component: ItensRegistrationComponent, canActivate: [AuthguardService] },
  { path: 'itens', component: ItensListComponent, canActivate: [AuthguardService] },
  { path: 'item-edit', component: ItemEditComponent, canActivate: [AuthguardService] },
  { path: 'user-registration', component: UserRegistrationComponent, canActivate: [AuthguardService] },
  { path: 'users', component: UsersListComponent, canActivate: [AuthguardService] },
  { path: 'user-edit', component: UserEditComponent, canActivate: [AuthguardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
