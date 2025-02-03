import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { MaterialModule } from 'app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LayoutPageComponent,
    LoginPageComponent,
    RegisterPageComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,

    // routes
    AuthRoutingModule
  ]
})
export class AuthModule { }
