import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { DataReaderService } from '../dataReader/dataReader.service';
import { DataReaderModule } from '../dataReader/dataReader.module';

@Module({
    imports: [DataReaderModule],
    controllers: [ProductController],
    providers: [ProductService, DataReaderService]
})
export class ProductModule {}
