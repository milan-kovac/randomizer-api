import { Injectable } from '@nestjs/common';
import { User } from './user';
import { DataReaderService } from '../dataReader/dataReader.service';
import { faker } from '@faker-js/faker';
import { Gender } from './enums/gender.enum';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
    constructor(private readonly dataReader: DataReaderService) {}

    async getRandomUser(): Promise<User> {
        const id = uuidv4();
        const gender = this.getRandomGenderValue();
        const firstName = await this.getRandomFirstName();
        const lastName = await this.getRandomLastName(gender);
        const age = faker.number.int({ min: 0, max: 100 });
        return new User(id, firstName, lastName, gender, age);
    }

    private async getRandomFirstName(): Promise<string> {
        const data = await this.dataReader.readStaticData('surnames.json');
        const surnames = JSON.parse(data);
        return surnames[Math.floor(Math.random() * surnames.length)];
    }

    private async getRandomLastName(gender: Gender): Promise<string> {
        const fileName = gender === Gender.Male ? 'firstNamesMale.json' : 'firstNamesFemale.json';
        const data = await this.dataReader.readStaticData(fileName);
        const names = JSON.parse(data);
        return names[Math.floor(Math.random() * names.length)];
    }

    private getRandomGenderValue(): Gender {
        const enumValues = Object.keys(Gender).filter((key) => isNaN(Number(key))) as string[];
        const randomIndex = Math.floor(Math.random() * enumValues.length);
        return Gender[enumValues[randomIndex]];
    }
}
