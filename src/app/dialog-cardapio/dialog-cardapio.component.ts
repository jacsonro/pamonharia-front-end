import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Pamonha } from '../templates/pamonha';

export interface Lista {
  imgUrl: string;
  text: string;
}

@Component({
  selector: 'app-dialog-cardapio',
  templateUrl: './dialog-cardapio.component.html',
  styleUrls: ['./dialog-cardapio.component.css']
})

export class DialogCardapioComponent implements OnDestroy{
  cart: Array<Pamonha> = [];
  formCardapio: FormGroup;
  typesOfPamonhas: Pamonha[] = [
    {
      id: 1,
      text: '<strong>Pamonha a Moda</strong><br>Pamonha a moda da casa com queijo, linguiça de porco, pimenta bode e sal.',
      imgUrl: 'assets/images/pamonha (1).png',
      valor: 10.50
    },
    {
      id: 2,
      text: '<strong>Pamonha de Jiló</strong><br>Pamonha de sal com jiló.',
      imgUrl: 'assets/images/pamonha (1).png',
      valor: 15.50
    },
    {
      id: 3,
      text: '<strong>Pamonha de Guariroba</strong><br>Pamonha de sal com guariroba.',
      imgUrl: 'assets/images/pamonha (1).png',
      valor: 11.50
    },
    {
      id: 4,
      text: '<strong>Pamonha Doce</strong><br>Pamonha com açúcar, creme de leite e canela.',
      imgUrl: 'assets/images/pamonha (1).png',
      valor: 12.50
    }
  ];

  get pamonhaFormArray(): FormArray {
    return this.formCardapio.controls.pamonha as FormArray;
  }

  private addProducts(): void {
    this.typesOfPamonhas.forEach(() => this.pamonhaFormArray.push(new FormControl(0)));
  }

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<DialogCardapioComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.formCardapio = this.fb.group({
      pamonha: new FormArray([])
    });
    this.addProducts();
    this.formCardapio.get('pamonha').valueChanges.subscribe(x => {
      this.cart = [];
      x.forEach((val: boolean, index: number) => {
        if (val === true) {
          this.cart.push(this.typesOfPamonhas[index]);
        }
      });
    });
  }
  submit(): void {
    this.dialogRef.close(this.cart);
  }
  ngOnDestroy(): void {
    this.dialogRef.close(this.cart);
  }
}
