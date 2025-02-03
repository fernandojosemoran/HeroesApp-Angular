import { Component } from '@angular/core';

interface ISidebarItem {
  label: string;
  icon: string;
  url: string;
}

@Component({
  selector: 'heroes-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css'
})
export class LayoutPageComponent {
  public sidebarItem: ISidebarItem[] = [
    {
      label: "List",
      icon: "label",
      url: "/heroes/list"
    },
    {
      label: "Add",
      icon: "add",
      url: "/heroes/new-hero"
    },
    {
      label: "Search",
      icon: "search",
      url: "/heroes/search-hero"
    }
  ];
}
