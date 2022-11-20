import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/data/smart-table';
import { UserServices } from '../../../provider/user.services';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';


import * as ɵngcc0 from '@angular/core';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  public user={
    password:'',
    rememberMe:''
  };

  constructor(
    public _userService: UserServices,
    public router: Router,

  ) {


  }

  public loginData: any = { email: '', password: '' };


  redirectDelay: number;
  showMessages: any;
  strategy: string;
  errors: string[];
  messages: string[];
  email:any;
  submitted: boolean;

  rememberMe: boolean;

  login() {
    console.log(this.loginData, "form");
    this._userService.loginAdmin(this.loginData).subscribe(result => {
      console.log("result", result);
      localStorage.setItem("AuthToken", result.authToken)
      // localStorage.setItem("adminId", result.AdminDetails['_id']);
      localStorage.setItem("adminId", "5e67ccb0ee6d50d0930f85e7");
      this.loginData = { email: '', password: '' };
      this.router.navigateByUrl('/pages/tables/smart-table')
      // alert("success")
    });
  }
}



