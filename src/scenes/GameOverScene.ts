import Phaser from 'phaser';
import Level1Scene from './Level1Scene';
import Level1UIScene from './Level1UIScene';

export default class GameOverScene extends Phaser.Scene {
  end_screen: Phaser.Physics.Arcade.Image;
  death: Phaser.Physics.Arcade.Image;

  lastScore: number;
  bestScore = 0;
  lastScoreText: Phaser.GameObjects.Text;
  lastScoreNumber: Phaser.GameObjects.Text;
  bestScoreText: Phaser.GameObjects.Text;
  bestScoreNumber: Phaser.GameObjects.Text;

  shopButton: Phaser.Physics.Arcade.Image;
  retryButton: Phaser.Physics.Arcade.Image;

  UIScene: Level1UIScene;
  level1: Level1Scene;

  gameOverBgm: Phaser.Sound.BaseSound;

  constructor() {
    super('game-over');
  }

  preload() {}

  create() {
    this.UIScene = this.scene.get('UI') as Level1UIScene;
    this.level1 = this.scene.get('level-1') as Level1Scene;

    // Game Over Screen
    this.end_screen = this.physics.add.image(0, 0, 'end_screen').setOrigin(0);
    this.death = this.physics.add.image(974, 339, 'death');

    this.gameOverBgm = this.sound.add('gameOver', { volume: 0.3 });
    this.gameOverBgm.play();

    // display score
    this.lastScore = this.UIScene.score;
    if (this.lastScore > this.bestScore) {
      this.bestScore = this.lastScore;
    }

    this.shopButton = this.physics.add.image(800, 840, 'shopButton');
    this.retryButton = this.physics.add.image(1150, 840, 'retryButton');
    this.retryButton.setInteractive();
    this.shopButton.setInteractive();

    this.retryButton.on('pointerdown', () => {
      // reset score
      this.UIScene.rt = 0;
      this.UIScene.newRt = 0;

      this.scene.stop('level-1');
      this.level1.destroyPlugin();
      this.scene.stop('game-over');
      this.scene.start('level-1');
      this.scene.launch('UI');
    });
    this.shopButton.on('pointerdown', () => {
      this.scene.stop('game-over');
      this.scene.stop('level-1');
      this.scene.pause('UI');
      this.scene.setVisible(false, 'UI');
      this.scene.start('start');
    });

    this.lastScoreText = this.add.text(640, 570, 'Last', {
      fontFamily: 'Staatliches',
      fontSize: '84px',
      align: 'center',
      color: '#ffffff',
    });
    this.lastScoreNumber = this.add.text(820, 566, this.lastScore.toString(), {
      fontFamily: 'Impact',
      fontSize: '84px',
      align: 'left',
      color: '#ffffff',
    });
    this.bestScoreText = this.add.text(1070, 570, 'Best', {
      fontFamily: 'Staatliches',
      fontSize: '84px',
      align: 'center',
      color: '#ffffff',
    });
    this.lastScoreNumber = this.add.text(1250, 566, this.bestScore.toString(), {
      fontFamily: 'Impact',
      fontSize: '84px',
      align: 'left',
      color: '#ffffff',
    });
    // go back to start screen after 5 seconds
  }

  update() {}
}
