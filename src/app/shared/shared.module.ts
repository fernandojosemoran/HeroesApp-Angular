import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404PageComponent } from './pages/error-404-page/error-404-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MaterialModule } from '@material/material.module';

@NgModule({
  declarations: [
    Error404PageComponent,
    HomePageComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    Error404PageComponent
  ]
})
export class SharedModule { }
