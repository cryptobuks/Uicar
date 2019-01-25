import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  displayName: string;
  url: string;


  constructor(private _auth: AngularFireAuth,
    private router: Router , ) {
      this._auth.authState.subscribe(user => {
        if (!user) {
          this.displayName = null;
          console.log('Name ' + this.displayName);
          return;
        }
        this.displayName = user.displayName;
        this.url = user.photoURL;
        console.log('Name ' + this.url);
      });
     }


  async signOut() {
    const res = await this._auth.auth.signOut();
    console.log(res);
    this.router.navigateByUrl('/login');
  }
}
