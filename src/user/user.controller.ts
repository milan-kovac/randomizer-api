import { Controller, Get, Post, Logger, Res, Body, Param, UsePipes, Delete } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { ErrorResponse } from '../responses/error.response';
import { SuccessfulResponse } from '../responses/successful.response';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUserResponseType } from './responseTypes/getUser.response.type';
import { ControllerName } from 'src/swagger/swagger.types';
import { CreateUserDto } from './dtos/createUser.dto';
import { UuidValidationPipe } from 'src/common/pipes/uuidValidation.pipe';

@ApiTags(ControllerName.USER)
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/:userId')
    @ApiResponse({ status: 200, description: 'OK', type: GetUserResponseType })
    @UsePipes(UuidValidationPipe)
    async getUser(@Res() response: Response, @Param('userId') userId: string): Promise<void> {
        try {
            const user = await this.userService.getUser(userId);
            new SuccessfulResponse(response, user, 'OK');
        } catch (error) {
            new ErrorResponse(response, error, 'Error');
            Logger.error('getRandomUser', error);
        }
    }

    @Get('/random')
    @ApiResponse({ status: 200, description: 'OK', type: GetUserResponseType })
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
    @ApiResponse({ status: 200, description: 'OK', type: GetUserResponseType })
    async createUser(@Res() response: Response, @Body() createUserRequest: CreateUserDto): Promise<void> {
        try {
            const user = await this.userService.createUser(createUserRequest);
            new SuccessfulResponse(response, user, 'OK');
        } catch (error) {
            new ErrorResponse(response, error, 'Error');
            Logger.error('getRandomUser', error);
        }
    }

    @Delete('/:userId')
    @ApiResponse({ status: 200, description: 'OK', type: GetUserResponseType })
    @UsePipes(UuidValidationPipe)
    async deleteUser(@Res() response: Response, @Param('userId') userId: string): Promise<void> {
        try {
            await this.userService.deleteUser(userId);
            new SuccessfulResponse(response, true, 'OK');
        } catch (error) {
            new ErrorResponse(response, error, 'Error');
            Logger.error('getRandomUser', error);
        }
    }
}
