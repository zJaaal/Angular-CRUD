import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HeroModel } from 'src/app/models/hero.model';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
})
export class HeroComponent implements OnInit {
  hero = new HeroModel();

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  save(form: NgForm) {
    if (form.valid) return console.log('Some fields are not valid');
    console.log(form);
    console.log(this.hero);
  }
}
