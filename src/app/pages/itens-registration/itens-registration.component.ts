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
  public users = [];
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
    this.userService.list().subscribe(resp=>{
      this.users = resp
    })
    this.itensForm = this.formBuilder.group({
      id: `${Date.now()}`,
      name: ['', [Validators.required]],
      source: ['', Validators.required],
      current_responsible: {
        name: '',
        id_user: ''
      },
      user_in_possession: {
        name: '',
        id_user: ''
      },
      available: [true],
    });
  }
  selectUser(e, control){
    let value = e.target.value
    if(value == ''){
      this.itensForm.get(control).setValue({name: '', id_user: ''})
      if(control == 'user_in_possession') this.itensForm.get('available').setValue(true)
    } else {
      let name = value.split('/')[0]
      let id_user = value.split('/')[1]
      this.itensForm.get(control).setValue({name, id_user})
      if(control == 'user_in_possession') this.itensForm.get('available').setValue(false)
    }
  }
  registerItem(): void {
    const item = {...this.itensForm.getRawValue()}
    this.itemService.createOrUpdate(item).then(()=>{
      Swal.fire('item cadastrado com sucesso!', 'success')
      let cr = item.current_responsible
      if(cr.name !== ''){
        this.userService.addOrRemoveInArray(true, cr.id_user, 'itens_responsible', {name: item.name, id_item: item.id})
        this.itemService.updateField(item.id, 'available', false)
      }
      let uip = item.user_in_possession
      if(uip.name !== ''){
        this.userService.addOrRemoveInArray(true, uip.id_user, 'itens_in_possession', {name: item.name, id_item: item.id})
        this.itemService.updateField(item.id, 'available', false)
      }
      this.itensForm.reset()
    })
    .catch(error=>{
      Swal.fire('erro ao cadastrar item', 'error')
      console.log('erro ao cadastrar item', error)
    })      
    
  }
}
