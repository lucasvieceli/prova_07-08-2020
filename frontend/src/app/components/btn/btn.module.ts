import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnComponent } from './btn.component';



@NgModule({
  declarations: [BtnComponent],
  exports: [BtnComponent],
  imports: [
    CommonModule
  ]
})
export class BtnModule { }
