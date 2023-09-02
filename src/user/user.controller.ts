import { Controller, Get, Post, Logger, Res, Body } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { ErrorResponse } from '../responses/error.response';
import { SuccessfulResponse } from '../responses/successful.response';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetRandomUserResponseType } from './responseTypes/getRandomUser.response.type';
import { ControllerName } from 'src/swagger/swagger.types';
import { CreateUserDto } from './dtos/createUser.dto';

@ApiTags(ControllerName.USER)
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/random')
    @ApiResponse({ status: 200, description: 'OK', type: GetRandomUserResponseType })
    async getRandomUser(@Res() response: Response): Promise<void> {
        try {
            const user = await this.userService.getRandomUser();
            new SuccessfulResponse(response, user, 'OK');
        } catch (error) {
            new ErrorResponse(response, error, 'Error');
            Logger.error('getRandomUser', error);
        }
    }

    @Post()
    @ApiResponse({ status: 200, description: 'OK', type: GetRandomUserResponseType })
    async createUser(@Res() response: Response, @Body() createUserRequest: CreateUserDto): Promise<void> {
        try {
            const user = await this.userService.createUser(createUserRequest);
            new SuccessfulResponse(response, user, 'OK');
        } catch (error) {
            new ErrorResponse(response, error, 'Error');
            Logger.error('getRandomUser', error);
        }
    }
}
