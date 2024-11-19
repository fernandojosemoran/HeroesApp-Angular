import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from "@env/environment";
import { IHero } from '@heroes/interfaces/hero.interface';
import { catchError, debounceTime, delay, map, Observable, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HeroesService {
  // hidden dependencies
  private readonly BASE_URL: string = environment.baseUrl;

  public constructor(
    private readonly _http: Http
  ) { }

  public getHeroes(): Observable<IHero[] | undefined> {
    const url: string = `${this.BASE_URL}/heroes`;

    return this._http.get<IHero[]>(url);
  }

  public searchHero(name: string): Observable<IHero[] | undefined> {
    const filter = (heroes: IHero[]): IHero[] => {
      return heroes
        .filter((hero) => hero.superhero
          .toLowerCase()
          .includes(name.toLowerCase())
        );
    }

    return this.getHeroes()
      .pipe(
        map(heroes => filter(heroes!))
      );
  }

  public getHeroById(id: string): Observable<IHero | undefined> {
    return this.getHeroes()
      .pipe(
        map((heroes) => heroes!.find((hero) => hero.id === id)),
        delay(1000)
      )
  }

  public addHero(hero: IHero): Observable<IHero | undefined> {
    return this._http.post<IHero>(environment.baseUrl, hero);
  }
}

@Injectable({ providedIn: "root" })
class Http {
  public constructor(
    private _http: HttpClient,
  ) { }

  public get<T>(url: string): Observable<T | undefined> {
    return this._http.get<T>(url)
      .pipe(
        catchError(() => of(undefined))
      );
  }

  public post<T>(url: string, hero: IHero): Observable<T | undefined> {
    return this._http.post<T>(url, hero)
      .pipe(
        catchError(() => of(undefined))
      );
  }

}
