import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ItemService } from 'src/app/core/models/item/item.service';


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
  ) {}

  ngOnInit(): void {
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
