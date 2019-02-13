import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.page.html',
  styleUrls: ['./profile-page.page.scss'],
})
export class ProfilePagePage implements OnInit {

  profiledata = [];
  profiletrayectos = [];

  uid: string;
  uidprofile: string;
  userprofile: boolean;

  ngOnInit() {
  }

  constructor(  private http: HttpClient
    , private aut: AngularFireAuth, private router: Router , public active: ActivatedRoute) {
      this.aut.authState
      .subscribe(
        user => {
          this.uid = user.uid;
          console.log(user.uid);
          this.checkuser(this.uid);
        },
        () => {
         // this.rout.navigateByUrl('/login');
        }
      );
    this.cargaruid();
    this.profileload(this.uidprofile);
    if ( this.profiledata[0] === null) {
      console.log('Usuario vacio');
    } else {
      console.log(this.profiledata[0]);
    }
    }

   async cargaruid() {
    await this.active.params.subscribe((data2: any) => {
      this.uidprofile = data2.id;
    });
   }

   async profileload(uid: string) {

    await this.http.get(`http://uicar.openode.io/users/` + uid + '/info').subscribe((data: any) => {
      this.profiledata = data;
    });

    await this.http.get(`http://uicar.openode.io/users/` + uid + '/trayectos').subscribe((data: any) => {
      this.profiletrayectos = data;
    });
  }
  gotomain() {
    this.router.navigateByUrl('/');
  }
  gotoedit() {
    this.router.navigateByUrl('/edituser/' + this.uid);
  }
  gotocreate() {
    this.router.navigateByUrl('/create');
  }

  checkuser(uid: string) {
    if ( uid === this.uidprofile ) {
      console.log('Este es su perfil') ;
      this.userprofile = true;
    } else {
      console.log('Este no su perfil') ;
    }
  }
  gotowhatsapp( telf: string) {
    console.log(telf);
    const newurl = 'https://api.whatsapp.com/send?phone=' + telf ;
    window.open( newurl , '_system' , '_blank');

  }

}
