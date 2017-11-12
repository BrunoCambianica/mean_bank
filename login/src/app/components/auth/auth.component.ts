import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../services/authentification/auth.service';


//import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class LoginComponent implements OnInit {

  username:String;
  password:String;
  response:any;

  constructor(
    public loginService: LoginService,
    //public router : Router 
  ) { }

  ngOnInit() {
  }

  onLoginSubmit() // simple co mongo base 
  {
     console.log(this.username);
     this.loginService.findClient(this.username).subscribe(data => { this.response = data});
     this.comparePassword();
  }

  // login():void  // token authentification 
  // {
  //   this.loginService.auth0.login();
  // }

  comparePassword()
  {
      if(this.response)
      {
          if(this.response['password'] == this.password)
          {
              console.log('OMFG tes authentifier MEC !!!!');
              //this.router.navigate(['/']);
          }
          else
          {
            alert('Access Denied, Unknow password')
          }
      }
      else
      {
        console.log('User unknow');
      }
  }
}
