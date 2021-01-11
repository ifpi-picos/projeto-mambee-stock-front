import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ItemService } from 'src/app/core/models/item/item.service';
import { UserService } from 'src/app/core/models/user/user.service';
import  Swal from 'sweetalert2'

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {
  public itensForm: FormGroup;
  public id_item: string;
  public users = [];
  public user_in_possession: string;
  public current_responsible: string;
  constructor(
    private itemService: ItemService,
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
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
      available: true,
      current_responsible: {},
      user_in_possession: {},
      id: '',
      name: ['', [Validators.required]],
      source: ['', Validators.required],
    });
    this.activeRoute.params.forEach((params: Params) => {
      this.id_item = params['id_item'];
    })
    this.itemService.get(this.id_item).subscribe(resp=>{
      this.current_responsible = resp.current_responsible.name+'/'+resp.current_responsible.id_user
      this.user_in_possession = resp.user_in_possession.name+'/'+resp.user_in_possession.id_user
      this.itensForm.patchValue({
        available: resp.available,
        current_responsible: resp.current_responsible,
        user_in_possession: resp.user_in_possession,
        id: this.id_item,
        name: resp.name,
        source: resp.source,
      })
    })
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
  editItem(itemId: string): void {
    const item = {...this.itensForm.getRawValue()}
    this.itemService.createOrUpdate(item, itemId).then(()=>{
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
      Swal.fire('item editado com sucesso!')
    })
    .catch(error=>{
      Swal.fire('erro ao editar item')
      console.log('erro ao editar item', error)
    })       
  }
}
