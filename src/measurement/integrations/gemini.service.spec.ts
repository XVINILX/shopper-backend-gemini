import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';

import { GeminiService } from './gemini.service';
import {
  GoogleGenerativeAI,
  GenerativeModel,
  EnhancedGenerateContentResponse,
} from '@google/generative-ai';
import { GoogleAIFileManager } from '@google/generative-ai/server';
import { createHttpException } from 'src/utils/exception.utils';

jest.mock('@google/generative-ai');
jest.mock('fs');
jest.mock('path');
jest.mock('uuid', () => ({
  v4: jest.fn(),
}));

describe('GeminiService', () => {
  let service: GeminiService;
  let genAI: GoogleGenerativeAI;
  let model: GenerativeModel;
  let fileManager: GoogleAIFileManager;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeminiService],
    }).compile();

    service = module.get<GeminiService>(GeminiService);
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    fileManager = new GoogleAIFileManager(process.env.API_KEY);

    (uuidv4 as jest.Mock).mockReturnValue('test-uuid');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw an exception for an invalid base64 file', async () => {
    await expect(
      service.getInfoFromBase64WithGemini('test prompt', 'invalidBase64'),
    ).rejects.toThrowError(
      createHttpException(
        {
          error_description:
            'Invalid file format. Unable to determine MIME type.',
          error_code: 'Some',
        },
        HttpStatus.BAD_REQUEST,
      ),
    );
  });

  it('should return GenerateContentResult for a valid base64 file', async () => {
    const mockUploadResponse = {
      file: {
        mimeType: 'image/png',
        uri: 'mock-uri',
      },
    };
    const mockResponse: EnhancedGenerateContentResponse = {
      text: jest.fn().mockReturnValue(JSON.stringify({ value: 0.12 })),
      functionCall: jest.fn(), // Mocking if necessary
      functionCalls: jest.fn(), // Mocking if necessary
    };

    (fileManager.uploadFile as jest.Mock).mockResolvedValue(mockUploadResponse);
    (model.generateContent as jest.Mock).mockResolvedValue(mockResponse);
    (fs.promises.writeFile as jest.Mock).mockResolvedValue(undefined);

    const result = await service.getInfoFromBase64WithGemini(
      'test prompt',
      'data:image/png;base64,mockBase64Data',
    );

    expect(result).toEqual(mockResponse);
    expect(fileManager.uploadFile).toHaveBeenCalledWith('/tmp/test-uuid.png', {
      mimeType: 'image/png',
      displayName: '',
    });
    expect(model.generateContent).toHaveBeenCalledWith([
      {
        fileData: {
          mimeType: 'image/png',
          fileUri: 'mock-uri',
        },
      },
      { text: 'test prompt' },
    ]);
  });

  // Add more tests for error cases and other edge cases
});
