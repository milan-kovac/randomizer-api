import { Product } from '../product';

export class GetAllProductsResponse {
    products: Product[];
    currentPage: number;
    pageCount: number;
}
