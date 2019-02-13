import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  zones: any;
  inicio: string;
  destino: string;
  hora ;
  rutina: string;
  asientos: string;
  vehiculo = 'car';
  descripcion: string;
  uid: string;

  public form = [
    { val: 'Rutina', isChecked: false },
  ];

  horas = [ '00:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00',
  '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00',  ];




  constructor( private http: HttpClient , public router: Router , private aut: AngularFireAuth) {
    this.zonasload();
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

  ngOnInit() {
  }

  async zonasload() {

    await this.http.get(`http://uicar.openode.io/zonas/`).subscribe((data: any) => {
      this.zones = data;
      console.log(this.zones);
    });
  }
  gotomain() {
    this.router.navigateByUrl('/');
  }

  select(vehicule: any) {
    this.vehiculo = vehicule;
    console.log(vehicule);
  }

  async makepost() {
    const { inicio, destino , hora  , rutina , asientos , vehiculo , descripcion , uid } = this;
    console.log( inicio, destino , hora  , rutina , asientos , vehiculo) ;
    await this.http.post('http://uicar.openode.io/create/', {
      inicio: inicio,
      destino: destino,
      hora: hora,
      rutina: rutina,
      uid: uid,
      asientos: asientos,
      vehiculo: vehiculo,
      zona: inicio,
      info: descripcion,
      }).subscribe((response) => {
      console.log(response);
  });
  this.router.navigateByUrl('/');
  }
}
