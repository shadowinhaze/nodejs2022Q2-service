import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

@Injectable()
export class Encoder {
  private async getCryptKey(): Promise<Buffer> {
    return (await promisify(scrypt)(
      process.env.CRYPT_PASSWORD,
      process.env.CRYPT_SALT,
      Number(process.env.CRYPT_KEY_LENGTH),
    )) as Buffer;
  }

  private async getCryptParamsArr(iv: Buffer) {
    const key = await this.getCryptKey();

    return [process.env.CRYPT_ALGORITHM, key, iv] as const;
  }

  async encrypt(dataToEncrypt: string): Promise<string> {
    const iv = randomBytes(16);
    const params = await this.getCryptParamsArr(iv);

    const cipher = createCipheriv(...params);

    const encryptedData = Buffer.concat([
      cipher.update(dataToEncrypt),
      cipher.final(),
    ]);

    return JSON.stringify({
      iv: iv.toString('hex'),
      content: encryptedData.toString('hex'),
    });
  }

  async decrypt(dataToDecrypt: string): Promise<string> {
    const { iv, content } = JSON.parse(dataToDecrypt);

    const params = await this.getCryptParamsArr(Buffer.from(iv, 'hex'));

    const decipher = createDecipheriv(...params);

    const decryptedData = Buffer.concat([
      decipher.update(Buffer.from(content, 'hex')),
      decipher.final(),
    ]);

    return decryptedData.toString();
  }
}
