import { Module } from '@nestjs/common';
import { DataReaderService } from './dataReader.service';

@Module({
    imports: [],
    controllers: [],
    providers: [DataReaderService]
})
export class DataReaderModule {}
