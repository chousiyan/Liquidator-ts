import Phaser from 'phaser';
import PlayerSprite from './PlayerSprite';

export default class EnemySprite extends Phaser.Physics.Arcade.Sprite {
  // Default speed = 100
  speed: number = 130;
  player: PlayerSprite;

  constructor(scene: Phaser.Scene, x, y, key) {
    super(scene, x, y, key);

    this.player = this.scene.player;

    scene.add.existing(this);
    scene.physics.add.existing(this);
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);

    this.scene.physics.moveToObject(this, this.player, 100);
    this.facePlayer();
  }

  facePlayer() {
    // facing back
    if (this.y > this.player.y) {
      if (this.x <= this.player.x) {
        // back right
        this.setTexture('rabbit-back');
        this.flipX = true;
      } else {
        // back left
        this.setTexture('rabbit-back');
        this.flipX = false;
      }
    }

    // facing front
    if (this.y <= this.player.y) {
      if (this.x <= this.player.x) {
        // front right
        this.setTexture('rabbit');
        this.flipX = true;
      } else {
        // front left
        this.setTexture('rabbit');
        this.flipX = false;
      }
    }
  }
}
