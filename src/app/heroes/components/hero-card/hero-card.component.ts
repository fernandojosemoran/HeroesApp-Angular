import { Component, Input } from "@angular/core";
import { IHero } from "@heroes/interfaces/hero.interface";

@Component({
  selector: "heroes-card",
  templateUrl: "./hero-card.component.html"
})
export class HeroCardComponent {
  @Input()
  public hero!: IHero;

  @Input()
  public visible = true;
}
