import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Gender } from '../user/enums/gender.enum';

@Injectable()
export class DataReaderService {
    async getRandomFirstName(): Promise<string> {
        const data = await this.readFromData('surnames.json');
        const surnames = JSON.parse(data);
        return surnames[Math.floor(Math.random() * surnames.length)];
    }

    async getRandomLastName(gender: Gender): Promise<string> {
        const fileName = gender === Gender.Male ? 'firstNamesMale.json' : 'firstNamesFemale.json';
        const data = await this.readFromData(fileName);
        const names = JSON.parse(data);
        return names[Math.floor(Math.random() * names.length)];
    }

    private readFromData(fileName: string): Promise<any> {
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
