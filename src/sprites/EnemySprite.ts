import Phaser from 'phaser';
import PlayerSprite from './PlayerSprite';

export default class EnemySprite extends Phaser.Physics.Arcade.Sprite {
  // Default speed = 100
  speed: number = 130;
  player: PlayerSprite;
  hp: number = 50;

  constructor(scene: Phaser.Scene, x, y, key) {
    super(scene, x, y, key);

    this.player = this.scene.player;
    // this.bullet = this.scene.bullet;

    scene.add.existing(this);
    scene.physics.add.existing(this);

    // when the rabbit is shot by a bullet
    // this.scene.physics.add.overlap(
    //   this,
    //   this.scene.weapon.bullets,
    //   this.shot,
    //   null,
    //   this.scene
    // );
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);

    // Enemy AI: Always following the player
    this.scene.physics.moveToObject(this, this.player, this.speed);
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

  shot() {
    // console.log(this.hp);
    // this.hp -= 20;
    // if (this.hp <= 0) {
    //   this.destroy();
    // }
  }
}
