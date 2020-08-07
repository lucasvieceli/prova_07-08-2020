import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BtnModule } from '../../../components/btn/btn.module';
import { EstoqueComponent } from './estoque/estoque.component';
import { ListarRoutingModule } from './listar-routing.module';
import { ListarComponent } from './listar.component';
import { BtnDeleteComponent } from './btn-delete/btn-delete.component';



@NgModule({
  declarations: [
    ListarComponent,
    EstoqueComponent,
    BtnDeleteComponent
  ],
  imports: [
    CommonModule,
    ListarRoutingModule,
    FormsModule,
    NgbModule,
    BtnModule
  ]
})
export class ListarModule { }
