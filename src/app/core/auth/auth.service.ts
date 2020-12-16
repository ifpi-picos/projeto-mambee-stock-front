import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user/user.model';
import { UserService } from '../models/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: Observable<firebase.User>;
  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService
  ) {
    this.user = afAuth.authState;
  }

  async signin(email: string, password: string) {
    return await this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async signup(user: UserModel) {
    const { email, password } = user;
    const createUser = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );

    const currentUser = await this.afAuth.currentUser;
    const uid = await currentUser.uid;
    await this.userService.createOrUpdate(user, uid);
    // Create defaul page from user
    const userEmail = email.substring(0, email.indexOf('@'));
    return createUser;
  }

  async signout() {
    return await this.afAuth.signOut();
  }

  async resetPassword(email: string) {
    return await this.afAuth.sendPasswordResetEmail(email);
  }
  authUser(){
    return this.user
  }
}
