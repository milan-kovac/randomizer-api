import { ApiProperty } from '@nestjs/swagger';

export class GetRandomProductResponse {
    @ApiProperty({ description: 'Product ID', type: Number })
    id: number;

    @ApiProperty({ description: 'Product name', type: String })
    name: string;

    @ApiProperty({ description: 'Product price', type: Number })
    price: number;

    @ApiProperty({ description: 'Product color', type: String })
    color: string;

    @ApiProperty({ description: 'Product description', type: String })
    description: string;
}
