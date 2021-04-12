import Phaser from 'phaser';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('preloader');
  }

  preload() {
    this.load.image('map-background', 'assets/img/map_background.png');
    this.load.image('pond', 'assets/img/pond.png');
    this.load.image('lights', 'assets/img/lights.png');
    this.load.image('signs', 'assets/img/signs.png');
    this.load.image('blank_blockers', 'assets/img/blank_square.png');
    this.load.image('vendingMachine1', 'assets/img/vendingMachine1.png');
    this.load.image('vendingMachine2', 'assets/img/vendingMachine2.png');
    this.load.image('truck1', 'assets/img/truck1.png');
    this.load.image('truck2', 'assets/img/truck2.png');
    this.load.image('barrels', 'assets/img/barrels.png');
    this.load.image('barrelShadow', 'assets/img/barrelShadow.png');
    this.load.image('bullet', 'assets/img/bullet.png');

    // load UI images
    this.load.image('vignetting', 'assets/img/UI/vignetting.png');
    this.load.image('radiation_1', 'assets/img/UI/radiation_1.png');
    this.load.image('radiation_2', 'assets/img/UI/radiation_2.png');
    this.load.image('ammoIcon', 'assets/img/UI/ammo_icon.png');
    this.load.image('rtIcon', 'assets/img/UI/rt_icon.png');
    this.load.image('death', 'assets/img/UI/death.png');
    this.load.image('end_screen', 'assets/img/UI/end_screen.png');

    // load background animations
    this.load.atlas(
      'float_wood',
      'assets/img/floatWood/float_wood.png',
      'assets/img/floatWood/float_wood.json'
    );

    this.load.atlas(
      'grass_dark',
      'assets/img/grass_dark.png',
      'assets/img/grass_dark.json'
    );

    this.load.atlas(
      'grass_light',
      'assets/img/grass_light.png',
      'assets/img/grass_light.json'
    );

    // load enemy rabbit
    this.load.image('rabbit', 'assets/img/rabbit.png');

    // load Player with default revolver image & animation
    this.load.atlas(
      'back-left-idle',
      'assets/img/player/back_left_idle.png',
      'assets/img/player/back_left_idle.json'
    );

    this.load.atlas(
      'back-left-walk',
      'assets/img/player/back_left_walk.png',
      'assets/img/player/back_left_walk.json'
    );

    // Revolver
    this.load.atlas(
      'revolver-front-left-idle',
      'assets/img/player/revolver/revolver_front_left_idle.png',
      'assets/img/player/revolver/revolver_front_left_idle.json'
    );

    this.load.atlas(
      'revolver-front-left-walk',
      'assets/img/player/revolver/revolver_front_left_walk.png',
      'assets/img/player/revolver/revolver_front_left_walk.json'
    );

    // this.load.image('ground', 'assets/img/platform.png');
    // this.load.image('star', 'assets/img/star.png');
    // this.load.image('bomb', 'assets/img/bomb.png');

    // this.load.spritesheet('dude', 'assets/img/dude.png', {
    //   frameWidth: 32,
    //   frameHeight: 48,
    // });
  }

  create() {
    this.scene.start('level-1');
    this.scene.start('UI');
  }
}
