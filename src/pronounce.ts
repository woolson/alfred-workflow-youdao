import { exec } from 'child_process';
import got from 'got';
import { createWriteStream, unlinkSync } from 'fs';

/** 发音临时文件路径 */
const TMP_PATH = 'tmp.mp3';

(async function() {
  /** 音频链接 */
  const fileLink = process.argv[2];
  if (fileLink) {
    const fileBuffer = await got(fileLink, {
      responseType: 'buffer'
    })
    const playFile = createWriteStream('./tmp.mp3')
    playFile.write(fileBuffer.body)
    exec(`afplay ${TMP_PATH}`, () => unlinkSync(TMP_PATH))
  }
})();

