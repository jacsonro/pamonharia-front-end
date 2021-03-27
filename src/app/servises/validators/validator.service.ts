import { Injectable } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }
  static cepValidator(control: FormControl): any{
    const cep = control.value;
    if (cep && cep !== ''){
      const validaControl = /^[0-9]{8}$/;
      return validaControl.test(cep) ? null : {cepInvalido : true};
    }
    return null;
  }
}
