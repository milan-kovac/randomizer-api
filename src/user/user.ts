import { Gender } from './enums/gender.enum';

export class User {
    private id: string;
    private firstName: string;
    private lastName: string;
    private gender: Gender;
    private age: number;

    constructor(id: string, firstName: string, lastName: string, gender: Gender, age: number) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
    }
}
