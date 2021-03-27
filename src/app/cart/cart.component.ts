import { Component, ElementRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EventService } from '../servises/events/event.service';



export interface Sale {
  productId: Array<number>;
  productQuantity: Array<number>;
  total: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnDestroy {
  @Input() cart = [];
  @Output() respostaFamilia = new EventEmitter();
  private sub: any;
  total = 0.0;
  sale: Sale = {
    productId: [],
    productQuantity: [],
    total: 0
  };

  form: FormGroup;
  get produtoQuantFormArray(): FormArray {
    return this.form.controls.productQuantity as FormArray;
  }
  get produtoIdFormArray(): FormArray {
    return this.form.controls.productId as FormArray;
  }

  private addProducts(): void {
    this.cart.forEach(item => {
      if (this.produtoIdFormArray.controls.filter(c => c.value === item.id).length === 0) {
        this.produtoIdFormArray.push(new FormControl(item.id));
        this.produtoQuantFormArray.push(new FormControl(1));
      }
    });
  }


  constructor(private fb: FormBuilder, public el: ElementRef) {
    this.form = this.fb.group({
      productQuantity: new FormArray([]),
      productId: new FormArray([]),
      total: new FormControl(0)
    });



    this.form.get('productQuantity').valueChanges.subscribe(x => {
      this.total = 0.0;
      x.forEach((val: number, index: number) => {
        this.total += this.cart[index].valor * val;
      });
      this.form.get('total').setValue(this.total);
      this.sale.productId = this.produtoIdFormArray.value;
      this.sale.productQuantity = this.produtoQuantFormArray.value;
      this.sale.total = this.total;
      EventService.get('valueChange').emit(this.sale);
    });

    this.sub = EventService.get('tabChange').subscribe(() => this.addProducts());
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  submit(): void {
    this.respostaFamilia.emit(2);
  }
}
