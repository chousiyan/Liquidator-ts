import Phaser from 'phaser';

export default class PlayerSprite extends Phaser.Physics.Arcade.Sprite {
  // Default speed = 130
  speed: number = 130;
  facingDirection: 'back left' | 'back right' | 'front left' | 'front right';
  isInvincible: boolean = false;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'revolver-left');

    this.play('revolver-left-idle');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);
  }

  checkFacingDirection() {
    // facing back
    if (
      this.scene.input.activePointer.y + this.scene.cameras.main.scrollY <
      this.y
    ) {
      if (
        this.scene.input.activePointer.x + this.scene.cameras.main.scrollX <=
        this.x
      ) {
        this.facingDirection = 'back left';
      } else {
        this.facingDirection = 'back right';
      }
    }

    // facing front
    if (
      this.scene.input.activePointer.y + this.scene.cameras.main.scrollY >=
      this.y
    ) {
      if (
        this.scene.input.activePointer.x + this.scene.cameras.main.scrollX <=
        this.x
      ) {
        this.facingDirection = 'front left';
      } else {
        this.facingDirection = 'front right';
      }
    }
  }

  // revolver idle animation
  revolverIdle() {
    switch (this.facingDirection) {
      case 'back left': {
        this.play('back-left-idle', true);
        this.flipX = false;
        break;
      }
      case 'back right': {
        this.play('back-left-idle', true);
        this.flipX = true;
        break;
      }
      case 'front left': {
        this.play('revolver-left-idle', true);
        this.flipX = false;
        break;
      }
      case 'front right': {
        this.play('revolver-left-idle', true);
        this.flipX = true;
        break;
      }
      default: {
        this.play('revolver-left-idle', true);
        this.flipX = false;
        break;
      }
    }
  }

  // revolver walking animation
  revolverWalk() {
    switch (this.facingDirection) {
      case 'back left': {
        this.play('back-left-walk', true);
        this.flipX = false;
        break;
      }
      case 'back right': {
        this.play('back-left-walk', true);
        this.flipX = true;
        break;
      }
      case 'front left': {
        this.play('revolver-left-walk', true);
        this.flipX = false;
        break;
      }
      case 'front right': {
        this.play('revolver-left-walk', true);
        this.flipX = true;
        break;
      }
      default: {
        this.play('revolver-left-walk', true);
        this.flipX = false;
        break;
      }
    }
  }
}
