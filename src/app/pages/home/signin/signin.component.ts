import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  public signinform: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.signinform = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  public signin(): void {
    const { email, password } = this.signinform.getRawValue();
    console.log(email, password);

    this.authService
      .signin(email, password)
      .then(() => {
        Swal.fire('Login efetuado com sucesso', '', 'success');
        this.router.navigate(['itens']);
      })
      .catch((error) => {
        let errorMessage: string;
        switch (error.code) {
          case 'auth/user-not-found': {
            errorMessage = 'Usuário não existe';
            break;
          }
          case 'auth/invalid-email': {
            errorMessage = 'Email inválido';
            break;
          }
          case 'auth/wrong-password': {
            errorMessage = 'Senha inválida';
            break;
          }
          default: {
            errorMessage = error.message;
          }
        }
        Swal.fire('Erro ao efeturar o login', errorMessage, 'error');
      });
  }
}
