import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {ProductService} from '../../../../services/product.service'
@Component({
  selector: 'app-btn-delete',
  templateUrl: './btn-delete.component.html',
  styleUrls: ['./btn-delete.component.scss']
})
export class BtnDeleteComponent  {

  spinner: boolean = false

  constructor(
    public productService: ProductService
  ) { }

  @Input()
  id

  @Output()
  onDelete = new EventEmitter()

  async delete(){
    try{
      this.spinner = true
      await this.productService.delete(this.id).toPromise()
      this.onDelete.emit(this.id)
      this.spinner = false

    }catch(e){
      console.log(e)
      this.spinner = false
    }

  }
}
