import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Config } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ProfilePage } from '../pages/profile/profile';
import { WelcomePage } from '../pages/welcome/welcome';

import { TranslateService } from '@ngx-translate/core'

import { KeycloakService } from '../services/keycloak/keycloak.service';

import { Events } from 'ionic-angular';

@Component({
  template: `<ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp  {
  rootPage = WelcomePage;

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: 'Welcome', component: WelcomePage },
    { title: 'Profile', component: ProfilePage }
  ];

  constructor(private translate: TranslateService,
    platform: Platform,
    private config: Config,
    statusBar: StatusBar,
    splashScreen: SplashScreen, 
    private keycloak:KeycloakService,
    public events: Events) {


      events.subscribe('KEYCLOAK:INIT', (data) => {
        // user and time are the same arguments passed in `events.publish(user, time)`
        alert('KEYCLOAK EVENT Initialized !');
      });

      
      events.subscribe("KEYCLOAK:LOGIN", (data) => {
        // user and time are the same arguments passed in `events.publish(user, time)`
        alert('KEYCLOAK EVENT Login !');
      });

      events.subscribe("KEYCLOAK:LOGOUT", (data) => {
        // user and time are the same arguments passed in `events.publish(user, time)`
        alert('KEYCLOAK EVENT Logout !');
      });
      
    this.initTranslate();

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

     console.log("init Keycloak");
  
      KeycloakService.init({ onLoad: 'check-sso', checkLoginIframe: false }).then(() => {
            if (this.keycloak.authenticated()) {
              console.log("--- app componet authenticated ---")
               this.nav.setRoot(ProfilePage);
            } 
        
      });


     });
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');

    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  //openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
   // this.nav.setRoot(page.component);
  //////}
}
