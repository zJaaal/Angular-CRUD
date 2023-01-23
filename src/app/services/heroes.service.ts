import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroModel } from '../models/hero.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private URL = 'https://fir-crud-cf293-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) {}

  createHero(hero: HeroModel) {
    return this.http.post(this.URL + '/heroes.json', hero).pipe(
      map((resp: any) => {
        hero.id = resp.name;
        return hero;
      })
    );
  }

  updateHero(hero: HeroModel) {
    const tempHero = {
      ...hero,
    };
    delete tempHero.id;

    return this.http.put(`${this.URL}/heroes/${hero.id}.json`, tempHero);
  }

  getHeroes() {
    return this.http.get(`${this.URL}/heroes.json`).pipe(
      map((response: any) => {
        if (response == null) return [];

        return Object.keys(response).map((key) => {
          return {
            ...response[key],
            id: key,
          } as HeroModel;
        });
      })
    );
  }
  getHero(id: string) {
    return this.http.get(`${this.URL}/heroes/${id}.json`);
  }
}
