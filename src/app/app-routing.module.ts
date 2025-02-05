import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error-404-page/error-404-page.component';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { PrivateAuthGuardService } from '@auth/guards/private-auth.guard';
import { PublicAuthGuardService } from '@auth/guards/public-auth.guard';

const routes: Routes = [
  {
    path: "",
    component: HomePageComponent,
    pathMatch: "full"
  },
  {
    path: "auth",
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [ PublicAuthGuardService ],
    canMatch: [ PublicAuthGuardService ]
  },
  {
    path: "heroes",
    loadChildren: () => import('./heroes/heroes.module').then(m => m.HeroesModule),
    canActivate: [ PrivateAuthGuardService ],
    canMatch: [ PrivateAuthGuardService ]
  },
  {
    path: "**",
    component: Error404PageComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
