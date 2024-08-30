import {
  GenerateContentResult,
  GenerativeModel,
  GoogleGenerativeAI,
} from '@google/generative-ai';
import { GoogleAIFileManager } from '@google/generative-ai/server';
import { HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { createHttpException } from 'src/utils/exception.utils';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GeminiService {
  private readonly genAI: GoogleGenerativeAI;
  private readonly model: GenerativeModel;
  private readonly fileManager: GoogleAIFileManager;

  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    this.fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY);
  }

  async getInfoFromBase64WithGemini(
    prompt: string,
    base64File: string,
  ): Promise<{ result: GenerateContentResult; url: string }> {
    // const mimeTypeMatch = base64File.match(/^data:(image\/[a-zA-Z]+);base64,/);
    // if (!mimeTypeMatch) {
    //   throw createHttpException(
    //     {
    //       error_description:
    //         'Invalid file format. Unable to determine MIME type.',
    //       error_code: 'Some',
    //     },
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }

    // const mimeType = mimeTypeMatch[1];
    // const extension = mimeType.split('/')[1];

    const buffer = Buffer.from(base64File, 'base64');

    try {
      const tempFileName = `${uuidv4()}.jpeg`;
      const tempFilePath = path.join(`public/tmp/${tempFileName}`);
      console.log(tempFilePath);
      await fs.promises.writeFile(tempFilePath, buffer);

      const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY);
      const uploadResponse = await fileManager.uploadFile(tempFilePath, {
        mimeType: 'image/jpeg',
        displayName: 'Some Name',
      });

      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const result = await model.generateContent([
        {
          fileData: {
            mimeType: uploadResponse.file.mimeType,
            fileUri: uploadResponse.file.uri,
          },
        },
        { text: prompt },
      ]);
      return {
        result: result,
        url: `localhost:3000/public/tmp/${tempFileName}`,
      };
    } catch (error) {
      throw createHttpException(
        {
          error_code: error.status,
          error_description: error.statusText,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
