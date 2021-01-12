import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ItemService } from 'src/app/core/models/item/item.service';
import { UserService } from 'src/app/core/models/user/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users$: any[] = [];
  formResponsibleItem:  FormGroup; 
  public userToAddOrRemove: any = {
    id : '',
    name: ''
  };
  public itensInPossession: any[] = []
  public itensAvailable: any[] = []
  public space: string = '-'
  constructor(
    private auth: AuthService,
    private userService: UserService,
    public router: Router,
    private itenService: ItemService,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit(): void {
    this.auth.authUser().subscribe(user=>{
      this.userService.get(user.uid).subscribe(doc=>{
        if(doc.role !== 'admin'){
          this.router.navigate(['/'])
        }
      })
    })
    this.formResponsibleItem = this.formBuilder.group({
      item: ''
    });
    this.getUsers()
  }
  getUsers(){
    this.users$ = []
    this.userService.list().subscribe(users=>{
      // this.users$ = users.filter(user=>user.role == 'user')
      this.users$ = users
    })
  }
  editUser(userId: string){
    this.router.navigate(['user-edit', {id_user: userId}])
  }
  showItensTakeds(userId:string, userName:string){
    this.userToAddOrRemove = {id:userId, name: userName}
    this.getItensAvailable()
    this.getItensInPossession(userId)
  }

  getItensAvailable(){
    this.itenService.listByField('itens', 'available', true)
      .subscribe(docs=>{
        this.itensAvailable = docs
      })
  }
  getItensInPossession(userId: string){
    this.itenService.listByField('itens', 'user_in_possession.id_user', userId)
      .subscribe(docs=>{
        this.itensInPossession = docs
      })
  }
  addItemToResponsability(userId: string, userName: string){
    let [name, idItem] = this.formResponsibleItem.get('item').value.split('-')
    this.userService.addOrRemoveInArray(true, userId, 'itens_in_possession', {name, idItem})
    this.itenService.updateField(idItem, 'available', false)
    this.itenService.updateField(idItem, 'user_in_possession', {id_user: userId, name: userName})
  }
  removeItemToResponsability(itemName, itemId, userId){
    this.userService.addOrRemoveInArray(false, userId, 'itens_in_possession', {name: itemName, idItem: itemId})
    this.itenService.updateField(itemId, 'available', true)
    this.itenService.updateField(itemId, 'user_in_possession', {id_user: '', name: ''})
  }
}
