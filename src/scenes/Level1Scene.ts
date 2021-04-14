import Phaser from 'phaser';
import { WeaponPlugin } from 'phaser3-weapon-plugin';

import createPlayerAnims from '../anims/PlayerAnims';
import createBackgroundAnims from '../anims/BackgroundAnims';
import PlayerSprite from '../sprites/PlayerSprite';

export default class Level1Scene extends Phaser.Scene {
  // player: Phaser.Physics.Arcade.Sprite;
  player: PlayerSprite;
  // Default speed = 120
  playerSpeed: number = 130;
  playerFacingDirection:
    | 'back left'
    | 'back right'
    | 'front left'
    | 'front right';
  playerInvincible = false;
  rt: number = 0;

  rabbit: Phaser.Physics.Arcade.Image;
  // Default speed = 100
  rabbitSpeed = 120;
  rabbitFacingDirection:
    | 'back left'
    | 'back right'
    | 'front left'
    | 'front right';
  // Every time the rabbit touches the player, player's hp decrease by 20
  damage = 20;

  mouse: Phaser.Input.Pointer;
  mouseInput: Phaser.Input.InputPlugin;

  pond: Phaser.Physics.Arcade.Image;
  signs: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  blank_blockers:
    | Phaser.GameObjects.GameObject
    | Phaser.GameObjects.GameObject[]
    | Phaser.GameObjects.Group
    | Phaser.GameObjects.Group[];
  vendingMachine1: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  vendingMachine2: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  vendingMachineBlocker: any;
  truck1: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  truck2: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  truckBlocker: any;
  barrels: Phaser.Physics.Arcade.Image;
  barrelShadow: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  floatWood: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  bullet: any;

  // control firing rate
  shootControl = false;

  // Weapon types
  // 1 = revolver, 2 = hand gun, 3 = shot gun, 4 = machine gun
  weaponType = 1;
  cursors;
  weapon: any;

  // isRevolver = true;
  // isHandGun = false;
  // isShotGun = false;
  // isMachineGun = false;

  // platforms;
  // stars;
  // bombs;
  // gamerOver = false;
  // score = 0;
  // scoreText;

  constructor() {
    super('level-1');
  }

  // level1Scene() {
  //   Phaser.Scene.call(this, { key: 'level1Scene', active: true });
  // }

  preload() {}

  create() {
    // Install weapon plugin into a scene
    this.plugins.installScenePlugin(
      'WeaponPlugin',
      WeaponPlugin,
      'weapons',
      this
    );

    // Animations
    createPlayerAnims(this.anims);
    createBackgroundAnims(this.anims);

    //  Set the camera and physics bounds to be the size of 4x4 bg images
    this.cameras.main.setBounds(0, 0, 2308, 1478);
    this.physics.world.setBounds(0, 0, 2308, 1478);

    // Gradient Background
    let gradientBackground = this.add.graphics();
    gradientBackground.fillGradientStyle(
      0xbfab78,
      0xbfab78,
      0xa79567,
      0xa79567,
      1
    );
    gradientBackground.fillRect(-200, -200, 2708, 1878);

    //  Background
    // this.add.image(0, 0, 'map-background').setOrigin(0);

    // Pond
    this.pond = this.physics.add.image(1155, 742, 'pond');
    this.pond.setImmovable(true);

    // Background Blockers
    this.blank_blockers = this.physics.add.staticGroup();
    this.vendingMachineBlocker = this.blank_blockers
      .create(1533, 920, 'blank_blockers')
      .setScale(3.18, 1)
      .refreshBody();
    this.truckBlocker = this.blank_blockers
      .create(2076, 273, 'blank_blockers')
      .setScale(5.16, 1)
      .refreshBody();

    // Background Items
    // Grass
    this.createGrass();

    this.signs = this.physics.add.image(673, 571, 'signs');
    this.signs.setImmovable(true);

    this.vendingMachine2 = this.physics.add.image(1533, 920, 'vendingMachine2');
    this.vendingMachine2.setImmovable(true);

    this.truck2 = this.physics.add.image(2076, 299, 'truck2');
    this.truck2.setImmovable(true);

    this.barrelShadow = this.physics.add.image(260, 180, 'barrelShadow');
    this.barrelShadow.setImmovable(true);

    this.barrels = this.physics.add.image(281, 69, 'barrels');
    this.barrels.setImmovable(true);

    this.floatWood = this.physics.add.sprite(1280, 676, 'float-wood');

    // this.grassGroup.create(400, 568, 'ground').setScale(2).refreshBody();

    // Player
    this.player = new PlayerSprite(this, 400, 300);
    // this.physics.add.sprite(400, 300, 'revolver-left');
    // this.player.setCollideWorldBounds(true);
    // this.player.body.setSize(this.player.width * 2.1, this.player.height * 3.1);
    // this.player.body.offset.x = 0;
    // this.player.body.offset.y = 2;

    // Enemy
    this.rabbit = this.physics.add.image(500, 650, 'rabbit');
    this.physics.add.collider(
      this.player,
      this.rabbit,
      this.bitten,
      null,
      this
    );
    this.physics.add.collider(this.rabbit, this.pond);
    this.physics.add.collider(this.rabbit, this.blank_blockers);
    this.physics.add.collider(this.rabbit, this.barrels);

    // this.physics.collide(
    //   this.player,
    //   this.rabbit,
    //   this.bitten(this.damage),
    //   null,
    //   this
    // );

    // this.physics.moveToObject(this.rabbit, this.player, this.rabbitSpeed);

    this.vendingMachine1 = this.physics.add.image(1533, 920, 'vendingMachine1');
    this.vendingMachine1.setImmovable(true);

    this.truck1 = this.physics.add.image(2076, 299, 'truck1');
    this.truck1.setImmovable(true);

    // Player collide with background items
    this.physics.add.collider(this.player, this.pond);
    this.physics.add.collider(this.player, this.blank_blockers);
    this.physics.add.collider(this.player, this.barrels);

    // Set camera to follow the player
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

    // // Player
    // this.player = this.physics.add.sprite(100, 450, 'dude');

    // this.player.setBounce(0.2);
    // this.player.setCollideWorldBounds(true);
    // this.physics.add.collider(this.player, this.platforms);

    // Input Events, replaced arrows with W/A/S/D
    // this.cursors = this.input.keyboard.createCursorKeys();
    this.cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });

    //for mouse position
    this.mouseInput = this.input;

    //for mouse click event
    this.mouse = this.input.mousePointer;

    // // fire bullet
    // this.bullet = this.physics.add.image(960, 540, 'bullet');

    //  Creates 30 bullets, using the 'bullet' graphic
    this.weapon = this.add.weapon(30, 'bullet');

    // Enable physics debugging for the bullets
    this.weapon.debugPhysics = true;

    //  The bullet will be automatically killed when it leaves the world bounds by default
    // this.weapon.bulletKillType = WeaponPlugin.consts.KillType.KILL_WORLD_BOUNDS;

    //  The speed at which the bullet is fired
    // Revolver at 800
    this.weapon.bulletSpeed = 800;

    //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 800ms
    this.weapon.fireRate = 800;

    //  Tell the Weapon to track the 'player' Sprite
    this.weapon.trackSprite(this.player);

    //  Add a variance to the bullet angle by +- this value
    this.weapon.bulletAngleVariance = 2;

    // this.stars.children.iterate(function (child) {
    //   child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    // });

    // this.physics.add.overlap(
    //   this.player,
    //   this.rabbit,
    //   this.bite(this.damage),
    //   null,
    //   this
    // );

    // // Score
    // let scoreText = this.add.text(16, 16, 'Score: 0', {
    //   fontSize: '32px',
    //   fill: '#000',
    //   fontFamily: 'Staatliches',
    // });
  }

  update() {
    // Background animations
    this.floatWood.play('float_wood', true);

    // Player movement
    // Player facing direction based on mouse position
    this.checkFacingDirection();

    // Player movement
    // idle
    if (
      !this.cursors.left.isDown &&
      !this.cursors.right.isDown &&
      !this.cursors.up.isDown &&
      !this.cursors.down.isDown
    ) {
      this.player.setVelocity(0);
      this.revolverIdle();
    }

    // walk
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-this.playerSpeed);
      this.revolverWalk();
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(this.playerSpeed);
      this.revolverWalk();
    }

    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-this.playerSpeed);
      this.revolverWalk();
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(this.playerSpeed);
      this.revolverWalk();
    }

    //mouse clicked
    let shootAngle = Phaser.Math.Angle.Between(
      this.player.x,
      this.player.y,
      this.mouseInput.x,
      this.mouseInput.y
    );

    if (this.mouse.isDown) {
      //  Because our bullet is drawn facing up, we need to offset its rotation:
      this.weapon.bulletAngleOffset = shootAngle + 180;
      this.weapon.fireAtXY(
        this.input.activePointer.x + this.cameras.main.scrollX,
        this.input.activePointer.y + this.cameras.main.scrollY
      );
    }

    // if (this.cursors.up.isDown && this.player.body.touching.down) {
    //   this.player.setVelocityY(-330);
    // }

    // Enemy AI: Always following the player
    this.physics.moveToObject(this.rabbit, this.player, this.rabbitSpeed);
  }

  checkFacingDirection() {
    // facing back
    if (
      this.input.activePointer.y + this.cameras.main.scrollY <
      this.player.y
    ) {
      if (
        this.input.activePointer.x + this.cameras.main.scrollX <=
        this.player.x
      ) {
        this.playerFacingDirection = 'back left';
      } else {
        this.playerFacingDirection = 'back right';
      }
    }

    // facing front
    if (
      this.input.activePointer.y + this.cameras.main.scrollY >=
      this.player.y
    ) {
      if (
        this.input.activePointer.x + this.cameras.main.scrollX <=
        this.player.x
      ) {
        this.playerFacingDirection = 'front left';
      } else {
        this.playerFacingDirection = 'front right';
      }
    }
  }

  // Enemy
  // enemyFacingDirection(enemy, player, facingDirection) {
  //   // facing back
  //   if (player.y < enemy.y) {
  //     if (player.x <= enemy.x) {
  //       facingDirection = 'back left';
  //     } else {
  //       facingDirection = 'back right';
  //     }
  //   }

  //   // facing front
  //   if (player.y >= enemy.y) {
  //     if (player.x <= enemy.x) {
  //       facingDirection = 'front left';
  //     } else {
  //       facingDirection = 'front right';
  //     }
  //   }
  // }

  // revolver idle animation
  revolverIdle() {
    switch (this.playerFacingDirection) {
      case 'back left': {
        this.player.play('back-left-idle', true);
        this.player.flipX = false;
        break;
      }
      case 'back right': {
        this.player.play('back-left-idle', true);
        this.player.flipX = true;
        break;
      }
      case 'front left': {
        this.player.play('revolver-left-idle', true);
        this.player.flipX = false;
        break;
      }
      case 'front right': {
        this.player.play('revolver-left-idle', true);
        this.player.flipX = true;
        break;
      }
      default: {
        this.player.play('revolver-left-idle', true);
        this.player.flipX = false;
        break;
      }
    }
  }

  // revolver walking animation
  revolverWalk() {
    switch (this.playerFacingDirection) {
      case 'back left': {
        this.player.play('back-left-walk', true);
        this.player.flipX = false;
        break;
      }
      case 'back right': {
        this.player.play('back-left-walk', true);
        this.player.flipX = true;
        break;
      }
      case 'front left': {
        this.player.play('revolver-left-walk', true);
        this.player.flipX = false;
        break;
      }
      case 'front right': {
        this.player.play('revolver-left-walk', true);
        this.player.flipX = true;
        break;
      }
      default: {
        this.player.play('revolver-left-walk', true);
        this.player.flipX = false;
        break;
      }
    }
  }

  createGrass() {
    const darkGrass_1 = {
      key: 'grass_dark',
      frame: 'grass_dark_00.png',
      x: { randInt: [0, 700] },
      y: { randInt: [0, 1478] },
      scale: { randFloat: [0.4, 0.8] },
      alpha: { randFloat: [0.4, 1] },
      anims: {
        key: 'grass_dark',
        repeat: -1,
        repeatDelay: { randInt: [500, 2000] },
        delayedPlay: function () {
          return Math.random() * 1000;
        },
      },
    };

    const lightGrass_1 = {
      key: 'grass_light',
      frame: 'grass_light_00.png',
      x: { randInt: [0, 700] },
      y: { randInt: [0, 1478] },
      scale: { randFloat: [0.4, 0.8] },
      alpha: { randFloat: [0.4, 1] },
      anims: {
        key: 'grass_light',
        repeat: -1,
        repeatDelay: { randInt: [500, 2000] },
        delayedPlay: function () {
          return Math.random() * 1000;
        },
      },
    };

    const darkGrass_2 = {
      key: 'grass_dark',
      frame: 'grass_dark_00.png',
      x: { randInt: [700, 1426] },
      y: { randInt: [0, 460] },
      scale: { randFloat: [0.4, 0.8] },
      alpha: { randFloat: [0.4, 1] },
      anims: {
        key: 'grass_dark',
        repeat: -1,
        repeatDelay: { randInt: [500, 2000] },
        delayedPlay: function () {
          return Math.random() * 1000;
        },
      },
    };

    const lightGrass_2 = {
      key: 'grass_light',
      frame: 'grass_light_00.png',
      x: { randInt: [700, 1426] },
      y: { randInt: [0, 460] },
      scale: { randFloat: [0.4, 0.8] },
      alpha: { randFloat: [0.4, 1] },
      anims: {
        key: 'grass_light',
        repeat: -1,
        repeatDelay: { randInt: [500, 2000] },
        delayedPlay: function () {
          return Math.random() * 1000;
        },
      },
    };

    const darkGrass_3 = {
      key: 'grass_dark',
      frame: 'grass_dark_00.png',
      x: { randInt: [700, 1426] },
      y: { randInt: [996, 1478] },
      scale: { randFloat: [0.4, 0.8] },
      alpha: { randFloat: [0.4, 1] },
      anims: {
        key: 'grass_dark',
        repeat: -1,
        repeatDelay: { randInt: [500, 2000] },
        delayedPlay: function () {
          return Math.random() * 1000;
        },
      },
    };

    const lightGrass_3 = {
      key: 'grass_light',
      frame: 'grass_light_00.png',
      x: { randInt: [700, 1426] },
      y: { randInt: [996, 1478] },
      scale: { randFloat: [0.4, 0.8] },
      alpha: { randFloat: [0.4, 1] },
      anims: {
        key: 'grass_light',
        repeat: -1,
        repeatDelay: { randInt: [500, 2000] },
        delayedPlay: function () {
          return Math.random() * 1000;
        },
      },
    };

    const darkGrass_4 = {
      key: 'grass_dark',
      frame: 'grass_dark_00.png',
      x: { randInt: [1600, 2308] },
      y: { randInt: [0, 1478] },
      scale: { randFloat: [0.4, 0.8] },
      alpha: { randFloat: [0.4, 1] },
      anims: {
        key: 'grass_dark',
        repeat: -1,
        repeatDelay: { randInt: [500, 2000] },
        delayedPlay: function () {
          return Math.random() * 1000;
        },
      },
    };

    const lightGrass_4 = {
      key: 'grass_light',
      frame: 'grass_light_00.png',
      x: { randInt: [1600, 2308] },
      y: { randInt: [0, 1478] },
      scale: { randFloat: [0.4, 0.8] },
      alpha: { randFloat: [0.4, 1] },
      anims: {
        key: 'grass_light',
        repeat: -1,
        repeatDelay: { randInt: [500, 2000] },
        delayedPlay: function () {
          return Math.random() * 1000;
        },
      },
    };

    // Make a few sprites using the config above
    for (let i = 0; i < 5; i++) {
      this.make.sprite(darkGrass_1);
      this.make.sprite(lightGrass_1);
      this.make.sprite(darkGrass_4);
      this.make.sprite(lightGrass_4);
    }
    for (let i = 0; i < 3; i++) {
      this.make.sprite(darkGrass_2);
      this.make.sprite(lightGrass_2);
      this.make.sprite(darkGrass_3);
      this.make.sprite(lightGrass_3);
    }
  }

  isNotInvincible() {
    this.playerInvincible = false;
  }

  bitten() {
    if (!this.playerInvincible && this.rt < 100) {
      this.rt += this.damage;
      console.log("I'm bitten!", this.rt);

      this.cameras.main.shake(300, 0.01);

      //We now need to make the player invincible
      this.playerInvincible = true;

      //and then we add a timer to restore the player to a vulnerable state
      this.time.addEvent({
        delay: 2000, // ms
        callback: this.isNotInvincible,
        callbackScope: this,
        loop: false,
      });
    }
  }

  // check overlaps between player and stars
  // collectStar(player, star) {
  //   star.disableBody(true, true);

  //   this.score += 10;
  //   this.scoreText.setText('Score: ' + this.score);

  //   if (this.stars.countActive(true) === 0) {
  //     this.scene.start('level-2');

  //   this.stars.children.iterate(function (child) {
  //     child.enableBody(true, child.x, 0, true, true);
  //   });

  //   var x =
  //     player.x < 400
  //       ? Phaser.Math.Between(400, 800)
  //       : Phaser.Math.Between(0, 400);

  //   var bomb = this.bombs.create(x, 16, 'bomb');
  //   bomb.setBounce(1);
  //   bomb.setCollideWorldBounds(true);
  //   bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
  //   }
  // }

  // hitBomb(player, bomb) {
  //   this.physics.pause();

  //   player.setTint(0xff0000);

  //   player.anims.play('turn');

  //   this.gameOver = true;
  // }
}
