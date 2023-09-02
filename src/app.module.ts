import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CustomCacheModule } from './cache/cache.module';

@Module({
    imports: [UserModule, ProductModule, CustomCacheModule]
})
export class AppModule {}
