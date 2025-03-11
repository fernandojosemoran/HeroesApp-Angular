import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "@env/environment";
import { IHero, IHeroResponse } from '@heroes/interfaces/hero.interface';
import { catchError, delay, map, Observable, of } from 'rxjs';

export type HeroResponseType = IHero | IHero[] | string | undefined;

@Injectable({ providedIn: 'root' })
export class HeroesService {
  // hidden dependencies
  private readonly BASE_URL: string = environment.base_url_api;

  public constructor(
    private readonly _http: HttpClient
  ) { }

  public existHero(id: string): boolean {

    let exist = false;

    this.getHeroById(id).subscribe(hero => hero ? exist = true : exist = false);

    return exist;
  }

  public getHeroes(): Observable<IHero[] | undefined> {
    const url = `${this.BASE_URL}/hero/heroes-list`;

    return this._http.get<IHeroResponse>(url)
      .pipe(catchError(() => of(undefined)))
      .pipe(map(heroResponse => heroResponse?.response as IHero[]));
  }

  public searchHero(name: string): Observable<IHero[] | undefined> {
    const filter = (heroes: IHero[]): IHero[] => {
      return heroes
        .filter((hero) => hero.superhero
          .toLowerCase()
          .includes(name.toLowerCase())
        );
    };

    return this.getHeroes()
      .pipe(
        map(heroes => filter(heroes!))
      );
  }

  public getHeroById(id: string): Observable<IHero | undefined> {
    return this.getHeroes()
      .pipe(catchError(() => of(undefined)))
      .pipe(
        map((heroes) => heroes!.find((hero) => hero.id === id)),
        delay(1000)
      );
  }

  public addHero(hero: IHero): Observable<HeroResponseType> {
    return this._http.post<IHeroResponse>(`${this.BASE_URL}/hero/create`, hero)
    .pipe(catchError(() => of(undefined)))
    .pipe(map(heroResponse => heroResponse?.response));
  }

  public updateHero(hero: IHero): Observable<string | undefined> {
    return this._http.put<IHeroResponse>(`${this.BASE_URL}/hero/update/${hero.id}`, hero)
    .pipe(catchError(() => of(undefined)))
    .pipe(map(heroResponse => heroResponse?.response as string));
  }
}
