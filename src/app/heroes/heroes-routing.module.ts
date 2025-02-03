import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { NewHeroPageComponent } from './pages/new-hero/new-hero.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';

const routes: Routes = [
  {
    path: "",
    component: LayoutPageComponent,
    children: [
      {
        path: "new-hero",
        component: NewHeroPageComponent
      },
      {
        path: "search-hero",
        component: SearchPageComponent
      },
      {
        path: "edit-hero/:id",
        component: EditPageComponent
      },
      {
        path: "list",
        component: ListPageComponent
      },
      {
        path: ":id",
        component: HeroPageComponent
      },
      {
        path: "**",
        redirectTo: "list"
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class HeroesRoutingModule { }
