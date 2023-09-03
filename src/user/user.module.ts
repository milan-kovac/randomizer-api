import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DataReaderModule } from '../dataReader/dataReader.module';
import { DataReaderService } from '../dataReader/dataReader.service';
import { CustomCacheModule } from '../cache/cache.module';

@Module({
    imports: [DataReaderModule, CustomCacheModule],
    controllers: [UserController],
    providers: [UserService, DataReaderService]
})
export class UserModule {}
