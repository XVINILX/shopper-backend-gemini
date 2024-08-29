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
    this.fileManager = new GoogleAIFileManager(process.env.API_KEY);
  }

  async getInfoFromBase64WithGemini(
    prompt: string,
    base64File: string,
  ): Promise<GenerateContentResult> {
    const mimeTypeMatch = base64File.match(/^data:(image\/[a-zA-Z]+);base64,/);
    if (!mimeTypeMatch) {
      throw createHttpException(
        {
          error_description:
            'Invalid file format. Unable to determine MIME type.',
          error_code: 'Some',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const mimeType = mimeTypeMatch[1];
    const extension = mimeType.split('/')[1];

    const buffer = Buffer.from(base64File, 'base64');

    const tempFilePath = path.join('/tmp', `${uuidv4()}.${extension}`);

    await fs.promises.writeFile(tempFilePath, buffer);

    const uploadResponse = await this.fileManager.uploadFile(tempFilePath, {
      mimeType: mimeType,
      displayName: '',
    });

    const result = await this.model.generateContent([
      {
        fileData: {
          mimeType: uploadResponse.file.mimeType,
          fileUri: uploadResponse.file.uri,
        },
      },
      { text: prompt },
    ]);

    return result;
  }
}
