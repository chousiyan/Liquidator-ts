import Phaser from 'phaser';

export default class PlayerSprite extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'revolver-left');

    this.play('revolver-left-idle');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);
    // this.body.setSize(this.width * 2.1, this.height * 3.1);
    // this.body.offset.x = 0;
    // this.body.offset.y = 2;
  }
}
