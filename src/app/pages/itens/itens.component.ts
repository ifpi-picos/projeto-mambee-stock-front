import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ItemService } from 'src/app/core/models/item/item.service';
import { UserService } from 'src/app/core/models/user/user.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-itens',
  templateUrl: './itens.component.html',
  styleUrls: ['./itens.component.css']
})
export class ItensComponent implements OnInit {
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
    this.itemService.listDif().subscribe(itens=>{
      itens.forEach(item=>{
        this.itens$.push({...item.data(), id: item.id})
      })
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
  showItem(img){
    this.imgItem = img;
  }
  toggleAvailable(id, value){
    this.userService.updateField(id, 'available', value).then(()=>{
      this.getItens()
    })
  }
  editItem(id: string){
    this.router.navigate(['/editItem', {id_item: id}]);
  }
}
