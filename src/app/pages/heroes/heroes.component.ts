import { Component, OnInit } from '@angular/core';
import { HeroModel } from 'src/app/models/hero.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
})
export class HeroesComponent implements OnInit {
  heroes: HeroModel[] = [];
  loading: boolean = true;

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.heroesService
      .getHeroes()
      .subscribe(
        (response) => ((this.heroes = [...response]), (this.loading = false))
      );
  }

  deleteHero(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are going to delete a hero',
      showConfirmButton: true,
      showCancelButton: true,
    }).then((action) => {
      if (action.isConfirmed) {
        this.heroesService.deleteHero(id).subscribe((_) => {
          this.heroes = this.heroes.filter((hero) => hero.id != id);
        });
      }
    });
  }
}
