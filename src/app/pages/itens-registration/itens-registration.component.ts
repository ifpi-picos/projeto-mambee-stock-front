import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ItemService } from 'src/app/core/models/item/item.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { UserService } from 'src/app/core/models/user/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-itens-registration',
  templateUrl: './itens-registration.component.html',
  styleUrls: ['./itens-registration.component.css']
})
export class ItensRegistrationComponent implements OnInit {
  public itensForm: FormGroup;
  constructor(
    private itemService: ItemService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auth.authUser().subscribe(user=>{
      this.userService.get(user.uid).subscribe(doc=>{
        if(doc.role !== 'admin'){
          this.router.navigate(['/'])
        }
      })
    })
    this.itensForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      source: ['', Validators.required],
      currentResponsible: {
        name: '',
        idUser: ''
      },
      available: [true],
    });
  }

  registerItem(): void {
    const item = {...this.itensForm.getRawValue()}
    this.itemService.createOrUpdate(item).then(()=>{
      Swal.fire('item cadastrado com sucesso!', 'success')
    })
    .catch(error=>{
      Swal.fire('erro ao cadastrar item', 'error')
      console.log('erro ao cadastrar item', error)
    })      
    
  }
}
