import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrationComponent } from './component/administration/administration.component';
import { AdminLoginComponent } from './component/admin-login/admin-login.component';
import { AuthGuard } from './guards/auth.guard';
import { VendorLoginComponent } from './component/vendor/vendor-login/vendor-login.component';
import { RegisterVendorComponent } from './component/vendor/register-vendor/register-vendor.component';
import { UserLoginComponent } from './component/UserComponents/userLogin/user-login.component';
import { UserRegisterComponent } from './component/UserComponents/user-register/user-register.component';
import { LandingPageComponent } from './component/UserComponents/landing-page/landing-page.component';

const routes: Routes = [
  { path: "admin/login", component: AdminLoginComponent },
  { path: "landing", component: LandingPageComponent },
  {
    path: "admin",
    canActivate: [AuthGuard],
    component: AdministrationComponent,
    loadChildren: () => import('./component/administration/admin/admin.module').then(mod => mod.AdminModule)
  },
  { path: "", component: VendorLoginComponent },
  { path: "register", component: UserRegisterComponent },
  { path: "vendor/login", component: VendorLoginComponent },
  { path: "vendor/signup", component: RegisterVendorComponent },

  // { path: "admin", canActivate: [AuthGuard], component: AdminComponent },
  // {path:"**" , component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
