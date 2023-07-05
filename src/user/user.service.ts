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
        const firstName = await this.dataReader.getRandomFirstName();
        const lastName = await this.dataReader.getRandomLastName(gender);
        const age = faker.number.int({ min: 0, max: 100 });
        return new User(id, firstName, lastName, gender, age);
    }

    private getRandomGenderValue(): Gender {
        const enumValues = Object.keys(Gender).filter((key) => isNaN(Number(key))) as string[];
        const randomIndex = Math.floor(Math.random() * enumValues.length);
        return Gender[enumValues[randomIndex]];
    }
}
