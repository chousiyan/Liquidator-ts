import Phaser from 'phaser';

export default class Level1UIScene extends Phaser.Scene {
  lights;

  constructor() {
    super('UI');
  }

  preload() {}

  create() {
    this.lights = this.physics.add.image(471, 443, 'lights');
  }
}
