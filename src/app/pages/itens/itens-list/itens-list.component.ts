import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ItemService } from 'src/app/core/models/item/item.service';
import { UserService } from 'src/app/core/models/user/user.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-itens',
  templateUrl: './itens-list.component.html',
  styleUrls: ['./itens-list.component.css']
})
export class ItensListComponent implements OnInit {
  userRole: string;
  itens$: any[] = [];
  imgItem: string;
  constructor(
    private auth: AuthService,
    private userService: UserService,
    private itemService: ItemService,
    private afStorage: AngularFireStorage,
    public router: Router
    ) { }

  ngOnInit(): void {
    this.getItens()
    this.auth.authUser().subscribe(user=>{
      this.userService.get(user.uid).subscribe(doc=>{
        this.userRole = doc.role
      })
    })
  }
  getItens(){
    this.itens$ = []
    this.itemService.list().subscribe(itens=>{
      this.itens$ = itens
    })
  }
  deleteItem(id, urlImg){
    Swal.fire({
      title: 'Deseja realmente apagar este item?',
      showCancelButton: true,
      confirmButtonText: `Continuar`,
      cancelButtonText: `Cancelar`
    }).then((resp) => {
      if (resp.isConfirmed) {
        this.afStorage.storage
          .refFromURL(urlImg)
          .delete()
          .then(()=>{
              alert('imagem do item deletada')
          })
        this.itemService.delete(id).then(()=>{
          alert('item deletado')
        })
      }
    })
  }
  editItem(id: string){
    this.router.navigate(['/item-edit', {id_item: id}]);
  }
}
