import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DialogCardapioComponent } from './dialog-cardapio/dialog-cardapio.component';
import { FieldErrorComponent } from './field-error/field-error.component';
import { PamonhasComponent } from './pamonhas/pamonhas.component';
import { PamonhasModule } from './pamonhas/pamonhas.module';
import { EventService } from './servises/events/event.service';


registerLocaleData(localePt);



@NgModule({
  declarations: [
    AppComponent,
    PamonhasComponent,
    DialogCardapioComponent,
    CartComponent,
    CheckoutComponent,
    FieldErrorComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDialogModule,
    MatGridListModule,
    MatListModule,
    MatSnackBarModule,
    MatFormFieldModule,
    PamonhasModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  entryComponents: [DialogCardapioComponent],
  providers: [{provide: LOCALE_ID, useValue: 'pt-BR'}, EventService],
  bootstrap: [AppComponent]
})
export class AppModule {}
