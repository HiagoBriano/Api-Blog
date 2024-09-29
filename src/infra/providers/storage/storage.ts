import { FileType } from './storage.dto';

export abstract class IStorage {
  abstract uploadFile(file: FileType, folder: string): Promise<string>;
}
