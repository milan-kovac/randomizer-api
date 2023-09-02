import { IsEnum, IsString, Min } from 'class-validator';
import { Gender } from '../enums/gender.enum';

export class CreateUserDto {
    @IsString({ message: 'Please provide valid first name.' })
    firstName: string;

    @IsString({ message: 'Please provide valid last name.' })
    lastName: string;

    @IsEnum(Gender, { message: 'Please provide valid gender value.' })
    gender: Gender;

    @Min(1, { message: ' Please provide valid age value.' })
    age: number;
}
