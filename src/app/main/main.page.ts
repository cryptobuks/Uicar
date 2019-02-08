import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ServicesService } from '../services.service';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { ModalPagePage } from '../modal-page/modal-page.page';
@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  uid: string;

  ngOnInit() {
  }
  constructor(private aut: AngularFireAuth, public modalController: ModalController,
    private router: Router , public _servicie: ServicesService, private http: HttpClient) {
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
    }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalPagePage,
    });
    return await modal.present();
  }
  gotoprofile() {
    this.router.navigateByUrl(`profile/` + this.uid);
  }

}
