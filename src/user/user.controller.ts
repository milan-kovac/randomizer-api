import { Controller, Get, Logger, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { ErrorResponse } from '../responses/error.response';
import { SuccessfulResponse } from '../responses/successful.response';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/random')
    async getRandomUser(@Res() response: Response): Promise<void> {
        try {
            const user = await this.userService.getRandomUser();
            new SuccessfulResponse(response, user, 'OK');
        } catch (error) {
            new ErrorResponse(response, error, 'Error');
            Logger.log('getRandomUser', error);
        }
    }
}
