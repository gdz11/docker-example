import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { UserType } from '../shared/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  onLogin(){
    if(this.loginForm.valid){
      let value = this.loginForm.value;
      //TODO handle invalid email / password 
      this.authService.login(value.email!, value.password!).subscribe(c => {
        let redirect = c.user.userType == UserType.Admin ? '/admin/dashboard' : '/customer/dashboard';
        this.router.navigate([redirect]);
      });
    }
  }


  constructor(private authService: AuthService, private router: Router){

  }

  ngOnInit(): void {
    
  }
}
