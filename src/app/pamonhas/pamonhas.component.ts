import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabGroup } from '@angular/material/tabs';
import { DialogCardapioComponent } from '../dialog-cardapio/dialog-cardapio.component';

import { Pamonha } from '../templates/pamonha';
import { EventService } from '../servises/events/event.service';


export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-pamonhas',
  templateUrl: './pamonhas.component.html',
  styleUrls: ['./pamonhas.component.css']
})



export class PamonhasComponent implements OnInit {
  @Output() respostaPai = new EventEmitter();
  @Output() pai = new EventEmitter();
  @ViewChild(MatTabGroup) tabGroup: MatTabGroup;


  cart: Array<Pamonha> = [];
  valor = 0.0;
  outrosItems: Pamonha[] = [
    {
      id: 5,
      text: '<strong>Milho Cozido</strong>',
      imgUrl: 'assets/images/pamonha (2).png',
      valor: 5.50
    },
    {
      id: 0,
      text: '',
      imgUrl: '',
      valor: 0
    },
    {
      id: 6,
      text: '<strong>Chica Doida</strong>',
      imgUrl: 'assets/images/pamonha (4).png',
      valor: 18.50
    },
    {
      id: 7,
      text: '<strong>Cural</strong>',
      imgUrl: 'assets/images/pamonha (5).png',
      valor: 8.50
    },
    {
      id: 8,
      text: '<strong>Pamonha Frita</strong>',
      imgUrl: 'assets/images/pamonha (6).png',
      valor: 8.50
    },
    {
      id: 9,
      text: '<strong>Bolo de Milho Verde</strong>',
      imgUrl: 'assets/images/pamonha (7).png',
      valor: 8.50
    }
  ];

  tiles: Tile[] = [
    { text: '', cols: 2, rows: 6, color: 'lightblue' },
    { text: 'Pamonha', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Milho Cozido', cols: 1, rows: 2, color: 'lightgreen' },
    { text: '', cols: 2, rows: 6, color: 'lightpink' },
    { text: 'Chica Doida', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Cural', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Pamonha Frita', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Bolo de Milho Verde', cols: 1, rows: 2, color: 'lightgreen' },

  ];
  constructor(public dialog: MatDialog, private elementRef: ElementRef) { }

  ngOnInit(): void {
  }

  addItems(index: number): void {
    if (index !== 0 && index !== 3) {
      if (index === 1) {
        const dialogRef = this.dialog.open(DialogCardapioComponent, {
          width: '500px'
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result.length > 0) {
            result.forEach(item => {
              if (this.cart.filter(p => p.id === item.id).length === 0) {
                this.cart.push(item);
              }
            });
          }
          this.tabGroup.selectedIndex = 1;
        });
      }
      else {
        if (this.cart.filter(p => this.outrosItems[index - 2].id < 1 || p.id === this.outrosItems[index - 2].id).length === 0) {
          this.cart.push(this.outrosItems[index - 2]);
        }
        this.tabGroup.selectedIndex = 1;
      }
    }
  }
  reciverFeedbackFilho(respostaFilho: number): void {
    this.tabGroup.selectedIndex = 2;
  }
  tabOnClick(tabIndex: any): void {
    EventService.get('tabChange').emit(true);
  }
}


