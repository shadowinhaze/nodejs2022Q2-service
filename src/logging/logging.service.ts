import { ConsoleLogger, Injectable } from '@nestjs/common';
import { getLogLevels } from 'src/utils/get-log-levels';

import { mkdir, createWriteStream, access, WriteStream } from 'fs';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';
import { EOL } from 'os';

@Injectable()
export class LoggingService extends ConsoleLogger {
  private path = '';

  private ws: WriteStream | undefined;

  setLogLvl(lvl: number) {
    super.setLogLevels(getLogLevels(lvl));
  }

  private async writeToFile(
    info: string,
    type: 'def' | 'error',
  ): Promise<void> {
    access('./logs', (err) => {
      if (err)
        mkdir('./logs', (err) => {
          if (err) console.log(err);
        });
    });

    const logFiles = await readdir('./logs');

    const dataSize = Buffer.from(info).length;
    const maxLogFileSize = Number(process.env.NEST_LOG_FILE_MAX_SIZE_KB);

    const getNewPath = () => join('./logs', `${type}-log_${Date.now()}.txt`);

    const filePath =
      logFiles.filter(async (logFile) => {
        if (!logFile.startsWith(type)) return false;

        const fileSize = (await stat(join('./logs', logFile))).size;
        return fileSize + dataSize < maxLogFileSize;
      })[0] || getNewPath();

    console.log(this.path);

    if (filePath !== this.path) {
      this.path = filePath;
      if (this.ws) this.ws.destroy();
      this.ws = createWriteStream(this.path, { flags: 'a+' });
    }

    this.ws.write(info + EOL);
  }

  async error(message: string | object, stack?: string) {
    if (typeof message === 'string') {
      console.log(`\x1b[31m${message}\n${stack}\x1b[0m`);
      await this.writeToFile(message, 'error');
    } else {
      super.error(message, stack);
    }
  }

  async log(message: any, ...rest): Promise<void> {
    // await this.writeToFile(message, 'def');
    super.log(message, ...rest);
  }
}
