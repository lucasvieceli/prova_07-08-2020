import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.scss']
})
export class EstoqueComponent implements OnInit {
  spinnerAdd: boolean = false
  spinnerReduce: boolean = false
  disabledAdd: boolean = false
  disabledReduce: boolean = false

  @Input()
  id: string

  @Input()
  currentStock: number

  @Output()
  onChangeStock = new EventEmitter()


  sleep(){
    return new Promise(resolve => setTimeout(() => resolve(), 2000));
  }

  constructor(
    public productService: ProductService
  ) { }

  ngOnInit(): void {
  }
  async changeValue(value: number){
    try{
      this.disabledReduce = true
      this.disabledAdd = true
      await this.sleep()
      const result = await this.productService.edit(this.id, {currentStock: value}, {columns: "currentStock, "}).toPromise()
      this.currentStock = result.currentStock

      this.onChangeStock.emit(result)
      this.disabledReduce = false
      this.disabledAdd = false
    }catch(e){
      this.disabledReduce = false
      this.disabledAdd = false
      console.log(e)
    }
  }

  async add(){
    this.spinnerAdd = true
    await this.changeValue(this.currentStock + 1)
    this.spinnerAdd = false
  }

  async reduce(){
    this.spinnerReduce = true
    await this.changeValue(this.currentStock - 1)
    this.spinnerReduce = false
  }

}
