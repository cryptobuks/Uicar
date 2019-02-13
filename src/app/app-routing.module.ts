import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'modal-page', loadChildren: './modal-page/modal-page.module#ModalPagePageModule' },
  { path: 'profile/:id', loadChildren: './profile-page/profile-page.module#ProfilePagePageModule' },
  { path: '', loadChildren: './main/main.module#MainPageModule' },
  { path: 'edituser/:id', loadChildren: './edit-user/edit-user.module#EditUserPageModule' },
  { path: 'create', loadChildren: './create/create.module#CreatePageModule' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
