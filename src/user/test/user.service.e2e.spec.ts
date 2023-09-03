import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { DataReaderService } from '../../dataReader/dataReader.service';
import { CacheService } from '../../cache/cache.service';
import { CreateUserDto } from '../dtos/createUser.dto';
import { NotFoundException } from '@nestjs/common';
import { Gender } from '../enums/gender.enum';

describe('UserService', () => {
    let userService: UserService;
    let dataReaderService: DataReaderService;
    let cacheService: CacheService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: DataReaderService,
                    useValue: {
                        readStaticData: jest.fn() // Mock readStaticData
                    }
                },
                {
                    provide: CacheService,
                    useValue: {
                        set: jest.fn(),
                        get: jest.fn(),
                        delete: jest.fn()
                    }
                }
            ]
        }).compile();

        userService = module.get<UserService>(UserService);
        dataReaderService = module.get<DataReaderService>(DataReaderService);
        cacheService = module.get<CacheService>(CacheService);
    });

    it('should be defined', () => {
        expect(userService).toBeDefined();
    });

    it('should create a user', async () => {
        const createUserRequest: CreateUserDto = {
            firstName: 'John',
            lastName: 'Doe',
            gender: Gender.MALE,
            age: 30
        };
        const mockUser = {
            id: '',
            ...createUserRequest
        };

        dataReaderService.readStaticData = jest.fn().mockResolvedValue(JSON.stringify(['Doe']));
        cacheService.set = jest.fn().mockResolvedValue(mockUser);

        const result = await userService.createUser(createUserRequest);
        mockUser.id = result.id;
        expect(result).toEqual(mockUser);
        expect(cacheService.set).toHaveBeenCalledWith(`user-${mockUser.id}`, mockUser);
    });

    it('should get a user by id', async () => {
        const userId = '1';
        const mockUser = {
            id: userId,
            firstName: 'John',
            lastName: 'Doe',
            gender: 'Male',
            age: 30
        };

        cacheService.get = jest.fn().mockResolvedValue(mockUser);

        const result = await userService.getUser(userId);

        expect(result).toEqual(mockUser);
        expect(cacheService.get).toHaveBeenCalledWith(`user-${userId}`);
    });

    it('should throw NotFoundException when getting a non-existent user', async () => {
        const userId = 'non-existent-id';

        cacheService.get = jest.fn().mockResolvedValue(null);

        try {
            await userService.getUser(userId);
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException);
            expect(error.message).toBe('User not found.');
        }
    });

    it('should delete a user by id', async () => {
        const userId = '1';
        const mockUser = {
            id: userId,
            firstName: 'John',
            lastName: 'Doe',
            gender: 'Male',
            age: 30
        };

        cacheService.get = jest.fn().mockResolvedValue(mockUser);

        await userService.deleteUser(userId);

        expect(cacheService.delete).toHaveBeenCalledWith(`user-${userId}`);
    });

    it('should throw NotFoundException when deleting a non-existent user', async () => {
        const userId = 'non-existent-id';

        cacheService.get = jest.fn().mockResolvedValue(null);

        try {
            await userService.deleteUser(userId);
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException);
            expect(error.message).toBe('User not found.');
        }
    });
});
