import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  spinner: boolean = false
  invalid = null
  form = new FormGroup({
    username: new FormControl('teste@teste.com', [ Validators.required, Validators.email]),
    password: new FormControl('123456', [ Validators.required, Validators.minLength(6)]),
  });

  constructor(
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  public async login(){
      this.spinner= true
      this.invalid= false
      const result = await this.authService.login(this.form.getRawValue())
      if(!result){
        this.invalid = true
      }
      this.spinner= false
  }

  isFieldValid(field: string) {
    return (!this.form.get(field).valid && !this.form.get(field).pristine)
  }
}
