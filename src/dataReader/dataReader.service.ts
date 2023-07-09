import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DataReaderService {
    async readStaticData(fileName: string): Promise<any> {
        try {
            const rootFolderPath = process.cwd();
            const dataFolderPath = path.join(rootFolderPath, 'data');
            const filePath = path.join(dataFolderPath, fileName);
            return fs.promises.readFile(filePath, 'utf-8');
        } catch (erorr) {
            Logger.log('readFromData', erorr);
        }
    }
}
