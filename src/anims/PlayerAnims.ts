export default function createPlayerAnims(anims) {
  // Our player animation, turning and walking left and right
  anims.create({
    key: 'left',
    frames: anims.generateFrameNames('revolver-left', {
      start: 0,
      end: 11,
      zeroPad: 2,
      prefix: 'revolver_left_walk_',
      suffix: '',
    }),
    frameRate: 25,
    repeat: -1,
  });

  // anims.create({
  //   key: 'turn',
  //   frames: [{ key: 'revolver-left', frame: 1 }],
  //   frameRate: 25,
  // });

  anims.create({
    key: 'turn',
    frames: anims.generateFrameNames('revolver-left', {
      start: 0,
      end: 0,
      zeroPad: 2,
      prefix: 'revolver_left_walk_',
      suffix: '',
    }),
    frameRate: 25,
    repeat: -1,
  });


  anims.create({
    key: 'right',
    frames: anims.generateFrameNames('revolver-left', {
      start: 0,
      end: 11,
      zeroPad: 2,
      prefix: 'revolver_left_walk_',
      suffix: '',
    }),
    frameRate: 25,
    repeat: -1,
  });

   anims.create({
     key: 'up',
     frames: anims.generateFrameNames('revolver-left', {
       start: 0,
       end: 11,
       zeroPad: 2,
       prefix: 'revolver_left_walk_',
       suffix: '',
     }),
     frameRate: 25,
     repeat: -1,
   });

    anims.create({
      key: 'down',
      frames: anims.generateFrameNames('revolver-left', {
        start: 0,
        end: 11,
        zeroPad: 2,
        prefix: 'revolver_left_walk_',
        suffix: '',
      }),
      frameRate: 25,
      repeat: -1,
    });

  // anims.create({
  //   key: 'right',
  //   frames: anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
  //   frameRate: 10,
  //   repeat: -1,
  // });
}
