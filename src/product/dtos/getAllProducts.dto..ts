import { IsIn, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

interface Sort {
    by: (typeof SORTBY)[number];
    direction: (typeof SORTDIRECTION)[number];
}

const SORTDIRECTION = ['ASC', 'DESC'] as const;
const SORTBY = ['price', 'name'] as const;

export class GetAllProductsDto {
    @Type(() => Number)
    @IsNumber({}, { message: 'Please provide valid page number.' })
    page: number;

    @Type(() => Number)
    @IsNumber({}, { message: 'Please provide valid take number.' })
    take: number;

    @IsIn(SORTBY, { message: 'Please provid valid sort by option.' })
    sortBy: Sort['by'];

    @IsIn(SORTDIRECTION, { message: 'Please provid valid sort direction.' })
    sortDirection: Sort['direction'];
}
