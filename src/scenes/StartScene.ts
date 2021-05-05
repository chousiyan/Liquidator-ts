import Phaser from 'phaser';

import createPlayerAnims from '../anims/PlayerAnims';
import PreloaderScene from './PreloaderScene';
import Level1Scene from './Level1Scene';
import Level1UIScene from './Level1UIScene';

export default class StartScene extends Phaser.Scene {
  vignetting: Phaser.Physics.Arcade.Image;
  title: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  playButton: Phaser.Physics.Arcade.Image;
  player: Phaser.Physics.Arcade.Image;
  weaponUpgrade: Phaser.Physics.Arcade.Image;
  startBgm: Phaser.Sound.BaseSound;

  hoverColor = 0xf8e14b;

  constructor() {
    super('start');
  }

  create() {
    // Animations
    createPlayerAnims(this.anims);

    this.sound.pauseOnBlur = false;
    this.startBgm = this.sound.add('start_bgm', { volume: 1 });
    this.startBgm.play();

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

    this.vignetting = this.physics.add.image(0, 0, 'vignetting').setOrigin(0);

    this.title = this.physics.add.image(527, 168, 'title');

    this.player = this.physics.add.image(1430, 541, 'playerRevolver');

    this.playButton = this.physics.add.image(1475, 925, 'playButton');
    // this.retryButton = this.physics.add.image(1315, 925, 'retryButton');

    this.playButton.setInteractive();
    // this.retryButton.setInteractive();

    // Start the main game.
    this.playButton
      .on('pointerdown', () => {
        this.scene.stop('start');
        this.startBgm.stop();
        this.scene.start('level-1');
        this.scene.start('UI');
      })
      .on('pointerover', () => this.playButtonHoverState())
      .on('pointerout', () => this.playButtonRestState());

    this.weaponUpgrade = this.physics.add.image(523, 645, 'weaponUpgrade');
    // for future weapon upgrade
    // this.weaponSlot_1 = this.add.graphics();
    // this.weaponSlot_1.fillStyle(0xc4c39f, 1);
    // this.weaponSlot_1.fillRoundedRect(65, 298, 916, 210, 20);

    // this.weaponSlot_2 = this.add.graphics();
    // this.weaponSlot_2.fillStyle(0xc4c39f, 1);
    // this.weaponSlot_2.fillRoundedRect(65, 540, 916, 210, 20);

    // this.weaponSlot_2 = this.add.graphics();
    // this.weaponSlot_2.fillStyle(0xc4c39f, 1);
    // this.weaponSlot_2.fillRoundedRect(65, 782, 916, 210, 20);

    // this.weaponUpgrade_1 = this.add.graphics();
    // this.weaponUpgrade_1.fillStyle(0x82876b, 1);
    // this.weaponUpgrade_1.fillRoundedRect(690, 298, 291, 210, {
    //   tl: 0,
    //   tr: 20,
    //   bl: 0,
    //   br: 20,
    // });
  }

  update() {}

  playButtonHoverState() {
    this.playButton.setTint(this.hoverColor);
  }

  playButtonRestState() {
    this.playButton.setTint(0xffffff);
  }
}
