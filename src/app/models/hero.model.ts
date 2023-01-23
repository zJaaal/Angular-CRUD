export class HeroModel {
  id: string | undefined;
  name: string;
  superPower: string;
  alive: boolean;
  constructor() {
    this.name = '';
    this.superPower = '';
    this.alive = true;
  }
}
