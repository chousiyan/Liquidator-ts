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
}
