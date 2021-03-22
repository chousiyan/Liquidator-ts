import Phaser from 'phaser';

import createPlayerAnims from '../anims/PlayerAnims';

export default class Level1Scene extends Phaser.Scene {
  player;
  playerSpeed = 120;
  // Default speed = 120
  pond;
  signs;
  blank_blockers;
  vendingMachine1;
  vendingMachine2;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  // platforms;
  // stars;
  // bombs;
  // gamerOver = false;
  // score = 0;
  // scoreText;

  constructor() {
    super('level-1');
  }

  preload() {}

  create() {
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
    gradientBackground.fillRect(0, 0, 2308, 1478);

    //  Background
    // this.add.image(0, 0, 'map-background').setOrigin(0);

    // Pond
    this.pond = this.physics.add.image(1155, 742, 'pond');
    this.pond.setImmovable(true);

    // Background Blockers
    this.blank_blockers = this.physics.add.staticGroup();
    let vendingMachineBlocker = this.blank_blockers
      .create(1533, 920, 'blank_blockers')
      .setScale(3.18, 1)
      .refreshBody();

    // Background Items
    this.signs = this.physics.add.image(673, 571, 'signs');
    this.signs.setImmovable(true);

    this.vendingMachine2 = this.physics.add.image(1533, 920, 'vendingMachine2');
    this.vendingMachine2.setImmovable(true);

    // Player
    this.player = this.physics.add.sprite(400, 300, 'revolver-left');
    this.player.setCollideWorldBounds(true);

    this.vendingMachine1 = this.physics.add.image(1533, 920, 'vendingMachine1');
    this.vendingMachine1.setImmovable(true);

    // Player collide with background items
    this.physics.add.collider(this.player, this.pond);
    this.physics.add.collider(this.player, this.blank_blockers);

    // // Platforms
    // this.platforms = this.physics.add.staticGroup();

    // this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    // this.platforms.create(600, 400, 'ground');
    // this.platforms.create(50, 250, 'ground');
    // this.platforms.create(750, 220, 'ground');

    // Set camera to follow the player
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

    // // Player
    // this.player = this.physics.add.sprite(100, 450, 'dude');

    // this.player.setBounce(0.2);
    // this.player.setCollideWorldBounds(true);
    // this.physics.add.collider(this.player, this.platforms);

    // Input Events
    this.cursors = this.input.keyboard.createCursorKeys();

    // Animations
    createPlayerAnims(this.anims);

    // // Stars
    // this.stars = this.physics.add.group({
    //   key: 'star',
    //   repeat: 11,
    //   setXY: { x: 12, y: 0, stepX: 70 },
    // });

    // this.stars.children.iterate(function (child) {
    //   child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    // });

    // // let Star collide with platforms
    // this.physics.add.collider(this.stars, this.platforms);

    // this.physics.add.overlap(
    //   this.player,
    //   this.stars,
    //   this.collectStar,
    //   null,
    //   this
    // );

    // // Score
    // this.scoreText = this.add.text(16, 16, 'Score: 0', {
    //   fontSize: '32px',
    //   fill: '#000',
    // });

    // // Bombs
    // this.bombs = this.physics.add.group();

    // this.physics.add.collider(this.bombs, this.platforms);

    // this.physics.add.collider(
    //   this.player,
    //   this.bombs,
    //   this.hitBomb,
    //   null,
    //   this
    // );
  }

  update() {
    // Player movement | default movement speed = 120
    this.player.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-this.playerSpeed);

      this.player.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(this.playerSpeed);

      this.player.play('right', true);
    }

    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-this.playerSpeed);

      this.player.play('up', true);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(this.playerSpeed);

      this.player.play('down', true);
    }

    if (
      !this.cursors.left.isDown &&
      !this.cursors.right.isDown &&
      !this.cursors.up.isDown &&
      !this.cursors.down.isDown
    ) {
      this.player.play('turn');
    }

    // if (this.cursors.up.isDown && this.player.body.touching.down) {
    //   this.player.setVelocityY(-330);
    // }
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
