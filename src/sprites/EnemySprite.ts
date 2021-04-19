import Phaser from 'phaser';

export default class EnemySprite extends Phaser.Physics.Arcade.Sprite {
  // Default speed = 100
  speed: number = 130;

  constructor(scene: Phaser.Scene, x, y, key) {
    super(scene, x, y, key);

    scene.add.existing(this);
    scene.physics.add.existing(this);
  }

  facingDirection(player, frontKey, backKey) {
    // facing back
    if (this.y > player.y) {
      if (this.x <= player.x) {
        // back right
        this.setTexture(backKey);
        this.flipX = true;
      } else {
        // back left
        this.setTexture(backKey);
        this.flipX = false;
      }
    }

    // facing front
    if (this.y <= player.y) {
      if (this.x <= player.x) {
        // front right
        this.setTexture(frontKey);
        this.flipX = true;
      } else {
        // front left
        this.setTexture(frontKey);
        this.flipX = false;
      }
    }
  }

  movement(player) {
    this.scene.physics.moveToObject(this, player, this.speed);
  }
}
