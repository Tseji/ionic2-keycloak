import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ProfilePage } from '../profile/profile';

import { KeycloakService} from '../../services/keycloak/keycloak.service';

import { Events } from 'ionic-angular';

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
 */
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(public navCtrl: NavController,
    public keycloak: KeycloakService) {

      
      

  }

  login() {
    this.keycloak.login()
      .then(() => {
        if (this.keycloak.authenticated()) {
          this.navCtrl.push(ProfilePage)
        }
      })
      .catch((error: any) => {
        console.log(error)
      });
  }

  signup() {
    this.keycloak.register()
  }
}