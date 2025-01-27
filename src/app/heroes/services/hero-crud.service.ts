import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { IHero } from "@heroes/interfaces/hero.interface";

@Injectable({ providedIn: "root" })
export class HeroCrudService {
  public constructor(
    private readonly _router: Router
  ) { }

  public existHero(hero: IHero | undefined, callback: (hero: IHero) => void): void {
    if (!hero) this._router.navigateByUrl("heroes/list");

    callback(hero!);
  }

  public existHeroDelete(wentDeleted: boolean): void {
    if (!wentDeleted) return;

    this._router.navigateByUrl(`heroes/list`);
  }

  public existHeroUpdate(hero: IHero | undefined): void {
    if (!hero) return;

    this._router.navigateByUrl(`heroes/${hero.id}`);
  }
}
