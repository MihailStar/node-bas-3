import { mouse, Region, screen } from '@nut-tree/nut-js';
import Jimp from 'jimp';
import type { Executor } from '../comand-to-executor.js';

const prntScrn: Executor = async function executor() {
  const mouseCoordinate = await mouse.getPosition();
  const size = 200;
  const region = await screen.highlight(
    new Region(
      mouseCoordinate.x - size / 2,
      mouseCoordinate.y - size / 2,
      size,
      size
    )
  );
  const { data, width, height } = await (
    await screen.grabRegion(region)
  ).toRGB();
  const pngInBase64 = (
    await new Jimp({ data, width, height }).getBufferAsync(Jimp.MIME_PNG)
  ).toString('base64');

  this.write(`prnt_scrn ${pngInBase64}`);
};

export { prntScrn };
