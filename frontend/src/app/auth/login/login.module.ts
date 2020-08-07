import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { BtnModule } from 'src/app/components/btn/btn.module';
import { FieldErrorDisplayModule } from 'src/app/components/field-error-display/field-error-display.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    BtnModule,
    ReactiveFormsModule,
    NgbModule,
    FieldErrorDisplayModule
  ]
})
export class LoginModule { }
