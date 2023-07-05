import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../enums/gender.enum';

export class GetRandomUserResponseType {
    @ApiProperty({ description: 'User ID', type: String })
    id: string;

    @ApiProperty({ description: 'User first name', type: String })
    firstName: string;

    @ApiProperty({ description: 'User last name', type: String })
    lastName: string;

    @ApiProperty({ description: 'User gender', enum: Gender })
    gender: Gender;

    @ApiProperty({ description: 'User age', type: Number })
    age: number;
}
