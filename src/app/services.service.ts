import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {


  private CARPETA_IMAGENES = 'img';
  url: any;

  private galleryOptions: CameraOptions = {
    quality: 50,
    allowEdit: true,
    destinationType: this.camera.DestinationType.FILE_URI,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    targetWidth: 800,
    targetHeight: 800,
    correctOrientation: true
  };
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public aut: AngularFireAuth,
    private rout: Router,
    private camera: Camera,
  ) {
    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });


    this.aut.authState
      .subscribe(
        user => {
          if (user) {
            // this.rout.navigateByUrl('tabs/tab1');
          } else {
            this.rout.navigateByUrl('/login');
          }
        },
        () => {
          this.rout.navigateByUrl('/login');
        }
      );
  }

  cargarImagen(data) {
    this.camera.getPicture(this.galleryOptions).then((imagePath) => {
      return this.makeFileIntoBlob(imagePath);
    }).then((imageBlob) => {
      return this.cargarImagenesFirebase(imageBlob);
    }).then((_uploadSnapshot: any) => {
    }, (_error) => {
      alert('entro aqui ' + (_error.message || _error));
    });
  }

  makeFileIntoBlob(_imagePath) {
    return new Promise((resolve, reject) => {
      window.resolveLocalFileSystemURL(_imagePath, (fileEntry) => {

        fileEntry.file((resFile) => {

          const reader = new FileReader();
          reader.onloadend = (evt: any) => {
            const imgBlob: any = new Blob([evt.target.result], { type: 'image/jpeg' });
            imgBlob.name = 'sample.jpg';
            resolve(imgBlob);
          };

          reader.onerror = (e) => {
            console.log('Failed file read: ' + e.toString());
            reject(e);
          };

          reader.readAsArrayBuffer(resFile);
        });
      });
    });
  }

  cargarImagenesFirebase(imgBlob: any) {

    const randomNumber = Math.floor(Math.random() * 256);
    console.log('Random number : ' + randomNumber);
    return new Promise((resolve, reject) => {
      const storageRef = firebase.storage().ref(`${this.CARPETA_IMAGENES}/${randomNumber} + '.jpg'`);

      const metadata: firebase.storage.UploadMetadata = {
        contentType: 'image/jpeg',
      };

      const uploadTask = storageRef.put(imgBlob, metadata);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot: firebase.storage.UploadTaskSnapshot) => {
          // upload in progress
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (error) => {
          // upload failed
          console.log(error);
          reject(error);
        },
        () => {
          // upload success
          alert('imagen cargada correctamente');

          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log('File available at', downloadURL);
            const url = downloadURL;
            alert(url);
            this.url = `${url}`;
            alert(this.url);
            return this.url;
          });
        });
    });
  }
}
