import Phaser from 'phaser';

import PreloaderScene from './scenes/PreloaderScene';
import Level1Scene from './scenes/Level1Scene';
import Level1UIScene from './scenes/Level1UIScene';
import StartScene from './scenes/StartScene';

const config = {
  // type: Phaser.AUTO,
  // width: 800,
  // height: 600,
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: 'phaser-example',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1920,
    height: 1080,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [PreloaderScene, StartScene, Level1Scene, Level1UIScene],
};

export default new Phaser.Game(config);
