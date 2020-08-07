import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastrarComponent } from './cadastrar.component';
import { CadastrarRoutingModule } from './cadastrar-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BtnModule } from '../../../components/btn/btn.module';
import { FieldErrorDisplayModule } from '../../../components/field-error-display/field-error-display.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CadastrarComponent],
  imports: [
    CommonModule,
    CadastrarRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    BtnModule,
    FieldErrorDisplayModule
  ]
})
export class CadastrarModule { }
