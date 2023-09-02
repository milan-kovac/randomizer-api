import { Gender } from './enums/gender.enum';

export class User {
    id: string;
    firstName: string;
    lastName: string;
    gender: Gender;
    age: number;

    constructor(id: string, firstName: string, lastName: string, gender: Gender, age: number) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
    }
}
