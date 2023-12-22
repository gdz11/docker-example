import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { UserType } from './shared/models/user';
import { Route, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { supportedLanguages } from './shared/models/languages';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  currentLanguage = '';

  suportedLanguages = supportedLanguages;

  isSignedIn = false;

  onLogout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    if(this.authService.isUserSignedIn()){
      this.isSignedIn = true;
      let user = this.authService.getUserInfo();

      let redirect = user.userType == UserType.Admin ? '/admin/dashboard' : '/customer/dashboard';
        this.router.navigate([redirect]);
    }

    if(!this.cookieService.get('lang')){
      this.cookieService.set('lang', 'en');//default language is en
    }
    let language = this.cookieService.get('lang');

    this.currentLanguage = language;
    
    this.translate.use(language);
  }

  onChangeLanguage(lang: string){
    this.cookieService.set('lang', lang);
    this.currentLanguage = lang;
    this.translate.use(lang);
  }

  title = 'lecture11-examples';

  constructor(private authService: AuthService, private router: Router, private translate: TranslateService, private cookieService: CookieService){

  }
}
