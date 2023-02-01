import { ScanHelper } from './scan';
import { printHash } from '../global/utils';

export const screenshot = async (
  sh: ScanHelper,
  domain: URL,
  type: string,
): Promise<ScreenshotType[]> => {
  const screenshotArray: ScreenshotType[] = [];
  const page = await sh.browser.newPage();
  page.on('dialog', async (dialog) => {
    await dialog.accept();
  });
  for (const device in sh.devices) {
    if (Object.prototype.hasOwnProperty.call(sh.devices, device)) {
      // eslint-disable-next-line no-await-in-loop
      await page.emulate(sh.devices[device]);
      // eslint-disable-next-line no-await-in-loop
      await page
        .goto(domain.toString(), { waitUntil: 'networkidle2' })
        .catch((error) => {
          console.error('Screenshot error:', error);
        });

      // eslint-disable-next-line no-await-in-loop
      const pageHash = await printHash(domain.toString());
      const name =
        domain.protocol === 'https:'
          ? domain.hostname
          : domain.pathname.split('/')[domain.pathname.split('/').length - 1];
      const imgPath = `${sh.outputDirectory}/${name}_${device}_${pageHash}.png`;
      // eslint-disable-next-line no-await-in-loop
      await page.screenshot({
        path: imgPath,
      });

      screenshotArray.push({
        screenshotType: type,
        domain: domain.hostname,
        url: domain.toString(),
        imgPath: imgPath,
        device: device,
      });
    }
  }

  await page.close();
  return screenshotArray;
};

export type ScreenshotType = {
  screenshotType: string;
  domain: string;
  url: string;
  imgPath: string;
  device: string;
};
