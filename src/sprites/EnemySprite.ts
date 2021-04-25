import Phaser, { GameObjects } from 'phaser';
import PlayerSprite from './PlayerSprite';

export default class EnemySprite extends Phaser.Physics.Arcade.Sprite {
  // Default speed = 100
  speed = 200;
  player: PlayerSprite;
  hp = 50;
  hitBodySound: Phaser.Sound.BaseSound;
  deadRabbit: string;

  constructor(scene: Phaser.Scene, x, y, key) {
    super(scene, x, y, key);

    this.player = this.scene.player;
    // this.bullet = this.scene.bullet;

    scene.add.existing(this);
    scene.physics.add.existing(this);

    // when the rabbit is shot by a bullet
    this.scene.physics.add.overlap(
      this,
      this.scene.weapon.bullets,
      this.shot,
      null,
      this
    );

    let hitBodySounds = Phaser.Math.RND.pick([
      'hit_body_1',
      'hit_body_2',
      'hit_body_3',
    ]);
    this.hitBodySound = this.scene.sound.add(hitBodySounds, { volume: 0.3 });

    // this.deadRabbit = Phaser.Math.RND.pick(['deadRabbit1', 'deadRabbit2']);
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

  shot(enemy: EnemySprite, bullet: Phaser.GameObjects.GameObject) {
    bullet.destroy();

    enemy.hp -= 20;

    this.hitBodySound.play();

    // when rabbit dies
    if (enemy.hp <= 0) {
      this.scene.rabbitDies(this.x, this.y);
      enemy.destroy();
    }
  }
}
