// angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// providers
import { provideHttpClient } from '@angular/common/http';

// app modules
import { MaterialModule } from '@material/material.module';

// routing
import { HeroesRoutingModule } from './heroes-routing.module';

// pages
import { HeroPageComponent } from './pages/hero-page/hero-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';

// components
import { NewHeroPageComponent } from './pages/new-hero/new-hero.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';
import { HeroCardComponent } from './components/hero-card/hero-card.component';
import { ListPipe } from './pipes/list.pipe';
import { HeroImagePipe } from './pipes/hero-image.pipe';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    // components
    HeroPageComponent,
    ListPageComponent,
    HeroCardComponent,

    // pages
    LayoutPageComponent,
    SearchPageComponent,
    NewHeroPageComponent,
    EditPageComponent,

    //pipes
    ListPipe,
    HeroImagePipe,
  ],
  imports: [
    // angular modules
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,

    // routing
    HeroesRoutingModule,

    // routes
    HeroesRoutingModule
  ],
  providers: [
    provideHttpClient()
  ]
})
export class HeroesModule { }
