import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {

  uidprofile: string;
  uid: string;
  constructor( public router: Router , public active: ActivatedRoute , private aut: AngularFireAuth) {
    this.aut.authState
      .subscribe(
        user => {
          this.uid = user.uid;
          console.log(user.uid);
        },
        () => {
         // this.rout.navigateByUrl('/login');
        }
      );
      this.cargaruid();
   }

  ngOnInit() {
  }
  gotouser() {
    this.router.navigateByUrl('/profile/' + this.uid);
  }
  async cargaruid() {
    await this.active.params.subscribe((data2: any) => {
      this.uidprofile = data2.id;
    });
   }

}
