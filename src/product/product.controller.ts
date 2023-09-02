import { ProductService } from './product.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Logger, Query, Res, ValidationPipe } from '@nestjs/common';
import { Response } from 'express';
import { SuccessfulResponse } from '../responses/successful.response';
import { ErrorResponse } from '../responses/error.response';
import { GetRandomProductResponse } from './responseTypes/getRandomProduct.response';
import { GetAllProductsDto } from './dtos/getAllProducts.dto.';
import { GetAllProductsResponse } from './responseTypes/getAllProducts.response';
import { ControllerName } from 'src/swagger/swagger.types';

@ApiTags(ControllerName.PRODUCT)
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get('/random')
    @ApiResponse({ status: 200, description: 'OK', type: GetRandomProductResponse })
    async getRandomProduct(@Res() response: Response): Promise<void> {
        try {
            const product = await this.productService.getRandomProduct();
            new SuccessfulResponse(response, product, 'OK');
        } catch (error) {
            new ErrorResponse(response, error, 'Error');
            Logger.error('getRandomProduct', error);
        }
    }

    @Get('/all')
    @ApiResponse({ status: 200, description: 'OK', type: GetAllProductsResponse })
    async getAllProducts(
        @Res() response: Response,
        @Query(
            new ValidationPipe({
                transform: true,
                forbidNonWhitelisted: true
            })
        )
        query: GetAllProductsDto
    ): Promise<void> {
        try {
            const products = await this.productService.getAllProducts(query);
            new SuccessfulResponse(response, products, 'OK');
        } catch (error) {
            new ErrorResponse(response, error, 'Error');
            Logger.error('getAllProducts', error);
        }
    }
}
