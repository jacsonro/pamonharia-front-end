import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor() { }
 static getPaymentTypes(): any{
return [
    {type: 'credit', descr: 'Cartão de Crédito'},
    {type: 'debit', descr: 'Cartão de Débito'},
    {type: 'paypal', descr: 'PayPal'}
]
  }
}
