import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {

  uidprofile: string;
  uid: string;
  zones: any;
  telefono: any;
  nombre: any;
  zona: any;
  img = 'assets/icons/user.svg';

  url: any;

  constructor( public router: Router , public active: ActivatedRoute , private aut: AngularFireAuth
    , private http: HttpClient , private cargaImagen: ServicesService) {
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
      this.zonasload();
   }

  ngOnInit() {
  }
  gotouser() {
    this.router.navigateByUrl('/profile/' + this.uid);
  }
  gotocreate() {
    this.router.navigateByUrl('/create/');
  }
  async cargaruid() {
    await this.active.params.subscribe((data2: any) => {
      this.uidprofile = data2.id;
    });
   }

   async zonasload() {

    await this.http.get(`http://uicar.openode.io/zonas/`).subscribe((data: any) => {
      this.zones = data;
      console.log(this.zones);
    });
  }

  async makepost() {
    const { nombre, telefono , zona  , url , img} = this;
    console.log(nombre, telefono , zona) ;
    await this.http.post('http://uicar.openode.io/edituser/', {
      nombre: nombre,
      uid: this.uid,
      img: img,
      ubication: zona,
      whatsapp: telefono
      }).subscribe((response) => {
      console.log(response);
  });
  this.router.navigateByUrl('/');
  }

  mostrarImagen() {
    this.url = this.cargaImagen.url;
  }

  agregarImagenUrl(url) {
    if (this.cargaImagen.url === undefined) {
      this.cargaImagen.url = '../../assets/prueba.jpg';
    }
  }


  cargarImagen(data) {
    this.cargaImagen.cargarImagen(this.url);
  }

}
