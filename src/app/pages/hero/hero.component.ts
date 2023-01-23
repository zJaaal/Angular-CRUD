import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  constructor(private heroeService: HeroesService) {}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
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
      currentRequest = this.heroeService.updateHero(this.hero);
    } else {
      currentRequest = this.heroeService.createHero(this.hero);
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
