import { Component, AfterViewInit  } from '@angular/core';
import * as Feather from 'feather-icons';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements AfterViewInit  {

  constructor(
    public authService: AuthService
  ) { }


  ngAfterViewInit() {
    Feather.replace();
  }

  logout(){
    this.authService.logout()
  }

}
