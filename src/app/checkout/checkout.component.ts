// import { Http } from '@angular/http';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { DropdownService } from '../servises/dropdown/dropdown.service';
import { EventService } from '../servises/events/event.service';
import { ValidatorService } from '../servises/validators/validator.service';



@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  private sub: any;
  subtotal: number;
  paymentTypes: any[];
  formCheckout: FormGroup;
  private formSumitAttempt: boolean;
  get produtoQuantFormArray(): FormArray {
    return this.formCheckout.get('sale').get('productQuantity') as FormArray;
  }
  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.formCheckout = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: [''],
      address: ['', Validators.required],
      address2: [''],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', [Validators.required, ValidatorService.cepValidator]],
      sameAddress: ['', Validators.required],
      saveInfo: ['', Validators.required],
      paymentType: ['', Validators.required],
      ccName: ['', Validators.required],
      ccNumber: ['', Validators.required],
      ccExpiration: ['', Validators.required],
      ccCvv: ['', Validators.required],
      sale: this.fb.group({
        productQuantity: [],
        productId: [],
        total: new FormControl(0)
      })
    });

  }
  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  ngOnInit(): void {
    console.log(this.formCheckout.get('sale').get('total'));
    this.paymentTypes = DropdownService.getPaymentTypes();
    console.log(this.paymentTypes);
    this.sub = EventService.get('valueChange').subscribe(sale => {
      this.subtotal = sale.total;
      this.formCheckout.get('sale').get('total').setValue(sale.total);
      this.formCheckout.get('sale').get('productQuantity').setValue(sale.productQuantity);
      this.formCheckout.get('sale').get('productId').setValue(sale.productId);
    });
  }

  submit(): void {
    this.formSumitAttempt = true;
    if (this.formCheckout.valid) {
      console.log('form valid');
      this.httpClient.post('http://127.0.0.1:8085/v1/checkout/',
        this.formCheckout.value, this.httpOptions).toPromise().then(data => {
          console.log(data);
        });
    }
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  isFieldValid(field: string): any {
    return (
      (!this.formCheckout.get(field).valid && this.formCheckout.get(field).touched) ||
      (this.formCheckout.get(field).untouched && this.formSumitAttempt)
    );
  }

  displayFieldCss(field: string): any {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }
  reset(): void {
    this.formCheckout.reset();
    this.formSumitAttempt = false;
  }
}



