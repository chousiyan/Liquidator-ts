export default function createBackgroundAnims(anims) {
  // Float wood animation in the pond
  anims.create({
    key: 'float_wood',
    frames: anims.generateFrameNames('float_wood', {
      start: 0,
      end: 69,
      zeroPad: 2,
      prefix: 'floating_wood_',
      suffix: '.png',
    }),
    frameRate: 25,
    repeat: -1,
  });

  anims.create({
    key: 'grass_dark',
    frames: anims.generateFrameNames('grass_dark', {
      start: 0,
      end: 25,
      zeroPad: 2,
      prefix: 'grass_dark_',
      suffix: '.png',
    }),
    frameRate: 25,
    repeat: -1,
  });

  anims.create({
    key: 'grass_light',
    frames: anims.generateFrameNames('grass_light', {
      start: 0,
      end: 25,
      zeroPad: 2,
      prefix: 'grass_light_',
      suffix: '.png',
    }),
    frameRate: 25,
    repeat: -1,
  });
}
