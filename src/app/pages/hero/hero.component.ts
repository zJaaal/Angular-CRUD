import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HeroModel } from 'src/app/models/hero.model';
import { HeroesService } from 'src/app/services/heroes.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
})
export class HeroComponent implements OnInit {
  hero = new HeroModel();

  constructor(
    private heroService: HeroesService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id == 'new') return;

    this.heroService.getHero(id as string).subscribe((response: any) => {
      this.hero = { ...response, id };
    });
  }

  save(form: NgForm) {
    if (!form.valid) return console.log('Some fields are not valid');

    Swal.fire({
      title: 'Saving changes',
      icon: 'info',
      text: 'Please wait...',
      allowOutsideClick: false,
    });
    Swal.showLoading(Swal.getConfirmButton());

    let currentRequest: Observable<any>;

    if (this.hero.id) {
      currentRequest = this.heroService.updateHero(this.hero);
    } else {
      currentRequest = this.heroService.createHero(this.hero);
    }

    currentRequest.subscribe((response) => {
      Swal.fire({
        title: this.hero.name,
        text: 'Has been updated successfully',
        icon: 'success',
      });
    });
  }
}
