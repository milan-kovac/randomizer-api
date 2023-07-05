import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DataReaderModule } from '../dataReader/dataReader.module';
import { DataReaderService } from '../dataReader/dataReader.service';

@Module({
    imports: [DataReaderModule],
    controllers: [UserController],
    providers: [UserService, DataReaderService]
})
export class UserModule {}
