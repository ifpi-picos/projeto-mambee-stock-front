import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { UserService } from 'src/app/core/models/user/user.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  public userForm: FormGroup;
  private id_user: string;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private userService: UserService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.auth.authUser().subscribe(user=>{
      this.userService.get(user.uid).subscribe(doc=>{
        if(doc.role !== 'admin'){
          this.router.navigate(['/'])
        }
      })
    })
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      matriculation: [''],
      email: ['', [Validators.required, Validators.email]],
      phone_number: [''],
      role: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      itens_responsible: [{name: '', idItem: ''}],
      id: ['']
    });
    this.activeRoute.params.forEach((params: Params) => {
      this.id_user = params['id_user'];
    })
    this.userService.get(this.id_user).subscribe(resp=>{
      this.userForm.patchValue({
        name: resp.name,
        matriculation: resp.matriculation,
        email: resp.email,
        phone_number: resp.phone_number,
        role: resp.role,
        password: resp.password,
        itens_responsible: resp.itens_responsible,
        id: resp.id
      })
    })
  }

  edit(): void {
    const user = {...this.userForm.getRawValue()}
    this.userService.createOrUpdate(user, user.id).then(()=>{
      Swal.fire('usuário editado com sucesso!')
    })
    .catch(error=>{
      Swal.fire('erro ao editar usuário')
      console.log('erro ao editar usuário', error)
    })
  }
}
