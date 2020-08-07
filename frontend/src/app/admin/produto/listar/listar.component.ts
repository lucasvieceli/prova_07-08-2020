import { Component } from '@angular/core';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent  {
  page = 1;
  limit = 25;
  collectionSize = 0;
  list: any[];
  report

  constructor(
    public productService: ProductService
  ) {
    this.getItems();
    this.getReport()
  }
  

  async getItems() {
    try{
      const result = await this.productService.getAll({
        page: this.page,
        limit: this.limit,
        columns: 'id,name,minimumStock,currentStock'
      }).toPromise()
      this.collectionSize = result.meta.totalItems
      result.items.map(p => this.checkStock(p))
      
      this.list = result.items
    }catch(e){
      console.log(e)
    }
  }
  async getReport(){
    try{
      this.report = await this.productService.getReport().toPromise()
    }catch(e){
      console.log(e)
    }
  }

  checkStock(product){
    if(product.currentStock < product.minimumStock){
      product.stock = true
    }else{
      product.stock = false
    }
  }

  onDelete(){
    this.getItems();
    this.getReport()
  }

  onChangeStock(product){
    const item = this.list.find(i => i.id == product.id)
    item.currentStock = product.currentStock
    this.checkStock(item)
  }

}
