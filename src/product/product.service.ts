import { Injectable } from '@nestjs/common';
import { DataReaderService } from '../dataReader/dataReader.service';
import { Product } from './product';
import { GetAllProductsDto } from '../user/dtos/getAllProducts.dto.';

@Injectable()
export class ProductService {
    private readonly prdouctsFileName = 'products.json';

    constructor(private readonly dataReader: DataReaderService) {}

    async getRandomProduct(): Promise<Product> {
        const data = await this.dataReader.readStaticData(this.prdouctsFileName);
        const products = JSON.parse(data);
        return products[Math.floor(Math.random() * products.length)];
    }

    async getAllProducts(query: GetAllProductsDto): Promise<Product[]> {
        const { page, take, sortBy, sortDirection } = query;
        const data = await this.dataReader.readStaticData(this.prdouctsFileName);
        const products = JSON.parse(data);

        products.sort((a, b) => {
            if (sortDirection === 'ASC') {
                return a[sortBy] - b[sortBy];
            } else {
                return b[sortBy] - a[sortBy];
            }
        });

        const paginatedProducts = products.slice((page - 1) * take, page * take);
        return paginatedProducts ?? [];
    }
}
