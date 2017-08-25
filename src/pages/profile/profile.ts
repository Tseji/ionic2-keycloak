import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { WelcomePage } from '../welcome/welcome';

import { KeycloakService} from '../../services/keycloak/keycloak.service'

import { Events } from 'ionic-angular';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  name = '';
  email = '';
  username = '';
  firstname = '';
  lastname = '';
  jwttoken ='';

  constructor(public navCtrl: NavController,
              public keycloak: KeycloakService,
              public events: Events) {


               

     console.log ('ProfilePage Constructor()')

    if (keycloak.authenticated) {
       console.log(this.keycloak.profile);
      keycloak.profile()
        .then((profile: any) => {
          this.name = `${profile.lastName} ${profile.firstName}`;
          this.email = profile.email;
          this.username = profile.username;
          this.firstname = profile.firstName;
          this.lastname = profile.lastName;
        })
        .catch((error: any) => {
          console.log(error)
        });

        keycloak.getToken()
        .then((token: any) => {
          this.jwttoken = token;
        })
        .catch((error: any) => {
          console.log(error)
        });

    }

  }

  account() {
    this.keycloak.account();
  }

  logout() {
    console.log(" Profile Page Logout() ")
    
    this.keycloak.logout()
      .then(() => {
        console.log("logout")
        this.navCtrl.setRoot(WelcomePage);
      })
      .catch((error: any) => {
        console.log(error)
      });
  }


}
