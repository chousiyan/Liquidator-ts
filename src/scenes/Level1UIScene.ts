import Phaser from 'phaser';
import Level1Scene from './Level1Scene';

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

  ammoBar;
  ammoText;
  weaponLevel;

  rt;
  rtBar: Phaser.GameObjects.Graphics;
  rtIcon;
  newRt;

  haveRadiation1 = false;
  haveRadiation2 = false;

  currentLevel;

  constructor() {
    super('UI');
  }

  preload() {}

  create() {
    this.currentLevel = this.scene.get('level-1');

    // get radiation tolerance from level 1 scene
    this.rt = this.currentLevel.rt;

    this.lights = this.physics.add.image(1449, 443, 'lights');
    this.vignetting = this.physics.add.image(0, 0, 'vignetting').setOrigin(0);

    this.input.setDefaultCursor('url(assets/img/UI/aim.png), pointer');

    // Make ammo bar
    this.makeBarBackground(850, 936, 280, 46, 6, 0xb8d1c3, 8);
    this.ammoBar = this.makeBar(850, 936, 280, 46, 6, 0x74a59b, 8);

    let ammoIcon = this.physics.add.image(820, 966, 'ammoIcon');
    ammoIcon.scale = 0.7;

    this.ammoText = this.add.text(880, 886, 'REVOLVER', {
      fontFamily: 'Staatliches',
      fontSize: '40px',
      align: 'center',
    });
    this.weaponLevel = this.add.text(
      880 + 20 + this.ammoText.width,
      886,
      'LV.-',
      {
        fontFamily: 'Staatliches',
        fontSize: '40px',
        align: 'center',
        color: '#b8d1c3',
      }
    );

    // Make rt bar
    this.makeBarBackground(130, 60, 320, 60, 0, 0x3d3c2a, 24);
    this.rtBar = this.makeBar(130, 60, 0, 60, 0, 0xf6da1e, 30);
    this.rtIcon = this.physics.add.image(110, 90, 'rtIcon');
    // ammoIcon.scale = 0.7;
  }

  update() {
    // update ammo bar
    // this.setValue(this.ammoBar, 850, 936, 280, 46, 6, 0x74a59b, 8, 1);

    this.newRt = this.currentLevel.rt;
    if (this.newRt > this.rt && this.newRt <= 100) {
      this.rt = this.currentLevel.rt;
      this.setValue(
        this.rtBar,
        130,
        60,
        320,
        60,
        0,
        0xf6da1e,
        30,
        this.rt / 100
      );
      this.rtIcon.destroy();
      this.rtIcon = this.physics.add.image(110, 90, 'rtIcon');
    }

    // Add radiation vignetting when radiation tolerance is filled
    if (this.newRt >= 30 && this.newRt < 70 && this.haveRadiation1 == false) {
      this.physics.add.image(0, 0, 'radiation_1').setOrigin(0);
      this.haveRadiation1 = true;
    }

    if (this.newRt >= 70 && this.newRt < 100 && this.haveRadiation2 == false) {
      this.physics.add.image(0, 0, 'radiation_2').setOrigin(0);
      this.haveRadiation2 = true;
    }

    // game over
    if (this.newRt >= 100) {
      this.gameOver();
    }
  }

  makeBarBackground(x, y, w, h, padding, color, radius) {
    //draw the bar
    let bar = this.add.graphics();

    //color the bar
    bar.fillStyle(color, 1);

    //fill the background bar
    bar.fillRoundedRect(0, 0, w + padding, h + padding * 2, radius * 1.25);

    //position the bar
    bar.x = x;
    bar.y = y;

    //return the bar
    return bar;
  }

  makeBar(x, y, w, h, padding, color, radius) {
    //draw the bar
    let bar = this.add.graphics();

    //color the bar
    bar.fillStyle(color, 1);

    //fill the bar with a rounded rectangle
    bar.fillRoundedRect(0, padding, w, h, radius);

    //position the bar
    bar.x = x;
    bar.y = y;

    //return the bar
    return bar;
  }

  setValue(bar, x, y, w, h, padding, color, radius, percentage) {
    //scale the bar
    bar.destroy();
    this.makeBar(x, y, w * percentage, h, padding, color, radius);
  }

  gameOver() {
    // display gameOver screen
    // make player invisible
    // go back to start screen after 5 seconds
  }
}
