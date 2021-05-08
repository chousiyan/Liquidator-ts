export default function createPlayerAnims(anims) {
  // Our player animation, idle and walking left and right
  anims.create({
    key: 'revolver-left-idle',
    frames: anims.generateFrameNames('revolver-front-left-idle', {
      start: 0,
      end: 17,
      zeroPad: 2,
      prefix: 'revolver_front_left_idle_',
      suffix: '.png',
    }),
    frameRate: 25,
    repeat: -1,
  });

  anims.create({
    key: 'back-left-idle',
    frames: anims.generateFrameNames('back-left-idle', {
      start: 0,
      end: 17,
      zeroPad: 2,
      prefix: 'back_left_idle_',
      suffix: '.png',
    }),
    frameRate: 25,
    repeat: -1,
  });

  anims.create({
    key: 'back-left-walk',
    frames: anims.generateFrameNames('back-left-walk', {
      start: 0,
      end: 11,
      zeroPad: 2,
      prefix: 'back_left_walk_',
      suffix: '.png',
    }),
    frameRate: 25,
    repeat: -1,
  });

  anims.create({
    key: 'revolver-left-walk',
    frames: anims.generateFrameNames('revolver-front-left-walk', {
      start: 0,
      end: 9,
      zeroPad: 2,
      prefix: 'revolver_left_walk_',
      suffix: '.png',
    }),
    frameRate: 25,
    repeat: -1,
  });
}
