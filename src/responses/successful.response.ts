import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';

export class SuccessfulResponse {
    constructor(res: Response, data, message: string, status?: number) {
        const responseStatus = status || HttpStatus.OK;
        res.status(responseStatus).json({
            status: responseStatus,
            message,
            payload: data
        });
    }
}
