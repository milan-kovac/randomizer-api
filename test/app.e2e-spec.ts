import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { UserModule } from '../src/user/user.module';
import { ProductModule } from '../src/product/product.module';
import { CustomCacheModule } from '../src/cache/cache.module';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [UserModule, ProductModule, CustomCacheModule]
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('should be defined', () => {
        expect(app).toBeDefined();
    });

    it('should have UserModule', () => {
        const userModule = app.get(UserModule);
        expect(userModule).toBeDefined();
    });

    it('should have ProductModule', () => {
        const productModule = app.get(ProductModule);
        expect(productModule).toBeDefined();
    });

    it('should have CustomCacheModule', () => {
        const customCacheModule = app.get(CustomCacheModule);
        expect(customCacheModule).toBeDefined();
    });
});
