import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ItemService } from 'src/app/core/models/item/item.service';
import  Swal from 'sweetalert2'

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {
  public itensForm: FormGroup;
  public id_item: string;
  public users: [];
  constructor(
    private itemService: ItemService,
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.itensForm = this.formBuilder.group({
      available: true,
      currentResponsible: {},
      id: '',
      name: ['', [Validators.required]],
      source: ['', Validators.required],
    });
    this.activeRoute.params.forEach((params: Params) => {
      this.id_item = params['id_item'];
    })
    this.itemService.get(this.id_item).subscribe(resp=>{
      this.itensForm.patchValue({
        available: resp.available,
        currentResponsible: resp.currentResponsible,
        id: this.id_item,
        name: resp.name,
        source: resp.source,
      })
    })
  }
  editItem(itemId: string): void {
    const item = {...this.itensForm.getRawValue()}
    this.itemService.createOrUpdate(item, itemId).then(()=>{
      Swal.fire('item editado com sucesso!')
    })
    .catch(error=>{
      Swal.fire('erro ao editar item')
      console.log('erro ao editar item', error)
    })       
  }
}
