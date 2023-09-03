import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { validate } from 'uuid';

@Injectable()
export class UuidValidationPipe implements PipeTransform<string> {
    transform(value: string) {
        if (!validate(value)) {
            throw new BadRequestException('Please provide valid ID format.');
        }
        return value;
    }
}
