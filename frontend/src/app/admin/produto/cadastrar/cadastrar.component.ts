import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Params, Router } from '@angular/router';  
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.scss']
})
export class CadastrarComponent implements OnInit {
  spinnerBtn: boolean = false
  prodId: string
  product: any
  error: any
  title: string
  form = new FormGroup({
    name: new FormControl('', [ Validators.required, Validators.minLength(3)]),
    minimumStock: new FormControl(1, [ Validators.required]),
    currentStock: new FormControl(1, [ Validators.required]),
    costPrice: new FormControl(0, [ Validators.required ]),
    resalePrice: new FormControl(0, [ Validators.required]),
    image: new FormControl(null, [Validators.required])
  });

  columnsGet = 'id,name,minimumStock,currentStock,resalePrice,costPrice,image'

  constructor(
    public productService: ProductService,
    private route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(async (params: Params) => {
      this.prodId = params['id'];
      this.title = (this.prodId) ? 'Editar Produto' : 'Cadastrar Produto'
      this.getProduct()
   })
  }

  async getProduct(){
    this.product = await this.productService.get(this.prodId, {columns: this.columnsGet}).toPromise()
    this.form.patchValue(this.product);
  }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      image: file
    });
    this.form.get('image').updateValueAndValidity()
  }

  async submit(){
    try{
      this.error = null
      this.spinnerBtn = true
      var formData: any = new FormData();
      const rawForm = this.form.getRawValue(); 

      formData.append("name", rawForm.name);
      formData.append("minimumStock", rawForm.minimumStock);
      formData.append("currentStock", rawForm.currentStock);
      formData.append("costPrice", rawForm.costPrice);
      formData.append("resalePrice", rawForm.resalePrice);
      if(typeof rawForm.image == 'object'){
        formData.append("image", rawForm.image);
      }
      if(this.product){
        const result = await this.productService.edit(this.product.id, formData).toPromise()
        this.getProduct()
      }else{
        const result = await this.productService.insert(formData).toPromise()
        this.router.navigate(['/admin/produto'])
      }
      this.spinnerBtn = false
    }catch(e){
      this.error = (this.product) ? 'Erro ao editar o produto' : 'Erro ao cadastrar o produto'
      this.spinnerBtn = false
    }
  }
  isFieldValid(field: string, validPristine = true) {
    return (!this.form.get(field).valid && !this.form.get(field).pristine) || (!validPristine && !this.form.get(field).valid)
  }

  getImage(){
    return `${environment.urlApi}/uploads/${this.product.image}`
  }
}
