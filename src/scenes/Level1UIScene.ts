import Phaser from 'phaser';

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
  }
}
