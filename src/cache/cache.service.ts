import { Cache } from 'cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class CacheService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    async get(key: string): Promise<any> {
        return await this.cacheManager.get(key);
    }

    async set(key: string, value: any, ttl = 0): Promise<void> {
        await this.cacheManager.set(key, value, ttl);
    }
}
