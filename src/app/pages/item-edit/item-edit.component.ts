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
  constructor(
    private itemService: ItemService,
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.itensForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      source: ['', Validators.required],
      currentResponsible: [''],
      available: [false],
    });
    this.activeRoute.params.forEach((params: Params) => {
      this.id_item = params['id_item'];
      this.itemService.get(this.id_item).subscribe(resp=>{
        this.itensForm.patchValue({
          name: resp.name,
          source: resp.source,
          currentResponsible: resp.currentResponsible,
          available: resp.available
        })
      })
    })
  }
  registerItem(): void {
    const item = {...this.itensForm.getRawValue()}
    this.itemService.createOrUpdate(item).then(()=>{
      alert('item cadastrado com sucesso!')
    })
    .catch(error=>{
      alert('erro ao cadastrar item')
      console.log('erro ao cadastrar item', error)
    })      
    
  }
}
