
import { Component, inject, OnInit } from '@angular/core';
import { ContatosService } from '../contatos.service';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { Contatos } from '../contatos';
@Component({
  selector: 'app-contatos',
  standalone: false,
  templateUrl: './contatos.component.html',
  styleUrl: './contatos.component.css'
})
export class ContatosComponent {
contatos : Contatos[] = [];
  formGroupContatos!: FormGroup;
  isEditing: boolean = false;

  constructor(private service: ContatosService,
    private FormBuilder: FormBuilder
  ) {
    this,this.formGroupContatos = FormBuilder.group(
      {
        id: [''],
        name: [''],
        phonenumber: ['']
      }
    )
  }

  ngOnInit(): void {
    this.loadContatos();
  }
  loadContatos() {
    this.service.getAll().subscribe({
      next: json => this.contatos = json
    })
  }
  onClicksave(){
    this.service.save(this.formGroupContatos.value).subscribe({
      next: json => {
        this.contatos.push(json);
        this.clear();
      }
    })
  }
  onClickdelete(contatos: Contatos){
    this.service.delete(contatos).subscribe({
      next: () => this.loadContatos()
    });
  }
  onClickupdate(contatos:Contatos) {
    this.formGroupContatos.setValue(contatos);
    this.isEditing = true;
  }
  onClickconfirmupdate(){
    this.service.update(this.formGroupContatos.value).subscribe({
      next: () => {
        this.loadContatos();
        this.clear();
        this.isEditing = false;
      }
    });
  }


  onClickclear(){
    this.clear();
  }


  clear() {
    this.formGroupContatos.reset();
  }




}
