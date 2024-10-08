import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IStorage } from './storage';
import { FileType } from './storage.dto';
@Injectable()
export class SupabaseStorage implements IStorage {
  private cliente: SupabaseClient;
  private readonly supabase: SupabaseClient;
  constructor() {
    this.cliente = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY,
    );
  }
  getClient(): SupabaseClient {
    return this.supabase;
  }

  async uploadFile(file: FileType, folder: string): Promise<string> {
    const response = await this.cliente.storage
      .from(process.env.SUPABASE_BUCKET ?? '')
      .upload(`${folder}/${file.originalName}`, file.buffer, { upsert: true });

    if (response.error) {
      throw new HttpException(
        {
          success: false,
          message: 'Error uploading file',
          data: null,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const { data } = this.cliente.storage
      .from(process.env.SUPABASE_BUCKET ?? '')
      .getPublicUrl(`${folder}/${file.originalName}`);

    return data.publicUrl;
  }
}
