import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs'
import Swal from 'sweetalert2';
import { ItemService } from 'src/app/core/models/item/item.service';


@Component({
  selector: 'app-itens-registration',
  templateUrl: './itens-registration.component.html',
  styleUrls: ['./itens-registration.component.css']
})
export class ItensRegistrationComponent implements OnInit {
  public itensForm: FormGroup;
  @ViewChild('inputFile', { static: true }) inputFile: ElementRef;
  fileImage: File;
  pathImage: string;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  task: AngularFireUploadTask;
  complete: boolean;
  showPassword: string = 'password';
  constructor(
    private itemService: ItemService,
    private formBuilder: FormBuilder,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.itensForm = this.formBuilder.group({
      // photo_url: ['', Validators.required],
      name: ['', [Validators.required]],
      source: ['', Validators.required],
      currentResponsible: [''],
      available: [false],
    });
  }

  // async getImage(event) {
  //   this.fileImage = await event.target.files[0];
  //   this.itensForm.patchValue({photo_url: 'something'})
  //   Swal.fire('foto enviada com sucesso', 'success')
  // }
  // async upload() {
  //   this.pathImage = `fotos_itens/${new Date().getTime().toString()}`;
  //   return this.storage.upload(this.pathImage, this.fileImage);
  // }

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
  // registerItem(): void {
  //   this.upload().then(()=>{
  //     const fileRef = this.storage.ref(this.pathImage);
  //     fileRef.getDownloadURL().subscribe(url => {
  //       this.itensForm.patchValue({photo_url: url})
  //       const item = {...this.itensForm.getRawValue()}
  //       this.itemService.createOrUpdate(item).then(()=>{
  //         alert('item cadastrado com sucesso!')
  //       })
  //       .catch(error=>{
  //         alert('erro ao cadastrar item')
  //         console.log('erro ao cadastrar item', error)
  //       })      
  //     })
  //   })
  // }
}
