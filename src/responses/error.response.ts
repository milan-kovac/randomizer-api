import { HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

export class ErrorResponse {
    constructor(res: Response, error, message?: string) {
        const status =
            error instanceof HttpException ? error.getStatus() : typeof error.status === 'number' ? error.status : HttpStatus.INTERNAL_SERVER_ERROR;

        const responseMessage = error.message || message;
        res.status(status).json({
            message: responseMessage,
            status
        });
    }
}
