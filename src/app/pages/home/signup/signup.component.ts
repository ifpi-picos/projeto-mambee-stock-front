import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  public signupForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  signup(): void {
    this.authService
      .signup(this.signupForm.getRawValue())
      .then(() => {
        Swal.fire(
          'Usuário cadastrado com sucesso',
          'Agora efetue o seu login',
          'success'
        );
        this.router.navigate(['']);
      })
      .catch((error) => {
        let errorMessage: string;
        switch (error.code) {
          case 'auth/email-already-in-use': {
            errorMessage = 'O e-mail já está em uso';
            break;
          }
          case 'auth/invalid-email': {
            errorMessage = 'Formato de e-mail inválido';
            break;
          }
          default: {
            errorMessage = error.message;
          }
        }
        Swal.fire('Erro ao cadastrar o usuário', errorMessage, 'error');
        this.signupForm.reset();
      });
  }
}
