import Phaser from 'phaser';
import Level1Scene from './scenes/Level1Scene';

// class AmmoBar {
//   bar: Phaser.GameObjects.Graphics;
//   x: any;
//   y: any;
//   value: number;
//   p: number;
//   constructor(scene, x, y) {
//     this.bar = new Phaser.GameObjects.Graphics(scene);

//     this.x = x;
//     this.y = y;
//     this.value = 100;
//     this.p = 76 / 100;

//     this.draw();

//     scene.add.existing(this.bar);
//   }

//   decrease(amount) {
//     this.value -= amount;

//     if (this.value < 0) {
//       this.value = 0;
//     }

//     this.draw();

//     return this.value === 0;
//   }

//   draw() {
//     this.bar.clear();

//     //  BG
//     this.bar.fillStyle(0x000000);
//     this.bar.fillRect(this.x, this.y, 80, 16);

//     //  Health

//     this.bar.fillStyle(0xffffff);
//     this.bar.fillRect(this.x + 2, this.y + 2, 76, 12);

//     var d = Math.floor(this.p * this.value);

//     this.bar.fillRect(this.x + 2, this.y + 2, d, 12);
//   }
// }

export default class Level1UIScene extends Phaser.Scene {
  lights;
  vignetting;

  constructor() {
    super('UI');
  }

  preload() {}

  create() {
    this.lights = this.physics.add.image(1449, 443, 'lights');
    this.vignetting = this.physics.add.image(0, 0, 'vignetting').setOrigin(0);

    this.input.setDefaultCursor('url(assets/img/UI/aim.png), pointer');

    // Make ammo bar
    let ammoBar = this.makeBar(850, 936, 280, 46, 6, 0xb8d1c3, 0x74a59b);
    this.setValue(ammoBar, 100);
    let ammoIcon = this.physics.add.image(820, 966, 'ammoIcon');
    ammoIcon.scale = 0.7;
  }

  makeBar(x, y, w, h, padding, color1, color2) {
    //draw the bar
    let bar = this.add.graphics();

    //color the bar
    bar.fillStyle(color1, 1);

    //fill the background bar
    bar.fillRoundedRect(0, 0, w + padding, h + padding * 2, 10);

    //color the bar
    bar.fillStyle(color2, 1);

    //fill the bar with a rounded rectangle
    bar.fillRoundedRect(0, padding, w, h, 8);

    //position the bar
    bar.x = x;
    bar.y = y;

    //return the bar
    return bar;
  }

  setValue(bar, percentage) {
    //scale the bar
    bar.scaleX = percentage / 100;
  }
}
