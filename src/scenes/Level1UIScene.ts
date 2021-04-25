import Phaser from 'phaser';

export default class Level1UIScene extends Phaser.Scene {
  sunshine: Phaser.Physics.Arcade.Image;
  vignetting: Phaser.Physics.Arcade.Image;

  ammoBar: Phaser.GameObjects.Graphics;
  ammoText: Phaser.GameObjects.Text;
  weaponLevel: Phaser.GameObjects.Text;

  rt: number;
  rtBar: Phaser.GameObjects.Graphics;
  rtIcon: Phaser.Physics.Arcade.Image;
  newRt: number;

  haveRadiation1 = false;
  haveRadiation2 = false;

  end_screen: Phaser.Physics.Arcade.Image;
  death: Phaser.Physics.Arcade.Image;

  currentLevel;

  constructor() {
    super('UI');
  }

  preload() {}

  create() {
    this.currentLevel = this.scene.get('level-1');

    // get radiation tolerance from level 1 scene
    this.rt = this.currentLevel.rt;
    6;
    this.sunshine = this.physics.add.image(1500, 443, 'lights');
    this.sunshine.setAlpha(0.7);
    this.vignetting = this.physics.add.image(0, 0, 'vignetting').setOrigin(0);

    this.input.setDefaultCursor('url(assets/img/UI/aim.png), pointer');

    // Make ammo bar
    this.makeBarBackground(850, 936, 280, 46, 6, 0xb8d1c3, 8);
    // this.ammoBar = this.makeBar(850, 936, 280, 46, 6, 0x74a59b, 8);
    this.ammoBar = this.makeBar(850, 936, 280, 46, 6, 0x93aa9c, 8);

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
    // Because default weapon has infinite ammo
    this.add.text(1080, 936, '∞', {
      fontFamily: 'Staatliches',
      fontSize: '50px',
      align: 'center',
      color: '#b8d1c3',
    });

    // Make rt bar
    this.makeBarBackground(130, 60, 320, 60, 0, 0x3d3c2a, 24);
    this.rtBar = this.makeBar(130, 60, 0, 60, 0, 0xf6da1e, 30);
    this.rtIcon = this.physics.add.image(110, 90, 'rtIcon');
    // ammoIcon.scale = 0.7;

    this.end_screen = this.physics.add.image(0, 0, 'end_screen').setOrigin(0);
    this.end_screen.setAlpha(0);
    this.death = this.physics.add.image(974, 534, 'death');
    this.death.setAlpha(0);
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

  makeBarBackground(
    x: number,
    y: number,
    w: number,
    h: number,
    padding: number,
    color: number,
    radius: number
  ) {
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

  makeBar(
    x: number,
    y: number,
    w: number,
    h: number,
    padding: number,
    color: number,
    radius: number
  ) {
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

  setValue(
    bar: Phaser.GameObjects.Graphics,
    x: number,
    y: number,
    w: number,
    h: number,
    padding: number,
    color: number,
    radius: number,
    percentage: number
  ) {
    //scale the bar
    bar.destroy();
    this.makeBar(x, y, w * percentage, h, padding, color, radius);
  }

  gameOver() {
    // display gameOver screen
    this.end_screen.setAlpha(1);
    this.death.setAlpha(1);
    this.newRt = 100;
    this.rtIcon.destroy();

    // make player invisible
    this.currentLevel.player.setAlpha(0);

    // go back to start screen after 5 seconds
  }
}
