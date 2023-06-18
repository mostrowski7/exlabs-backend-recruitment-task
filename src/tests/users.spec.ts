import 'reflect-metadata';
import { Container } from 'typedi';
import UserService from '../modules/users/users.service';
import DatabaseService from '../infra/database/database.service';
import CreateUserDto from '../interfaces/dtos/create-user.dto';
import DatabaseErrorCode from '../infra/database/database.error';
import HttpException from '../utils/http-exception';
import UserRepository from '../modules/users/users.repository';

jest.mock('../infra/database/database.service');

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;
  let databaseServiceMock: jest.Mocked<DatabaseService>;
  const restQueryResult = { rows: [], oid: 0, command: 'INSERT', fields: [] };
  const createUserDto: CreateUserDto = {
    firstName: 'John',
    lastName: 'Smith',
    email: 'smith@gmail.com',
    role: 'user',
  };

  beforeEach(() => {
    Container.reset();
    jest.resetAllMocks();

    databaseServiceMock = new DatabaseService() as jest.Mocked<DatabaseService>;

    Container.set(DatabaseService, databaseServiceMock);

    userService = Container.get(UserService);
    userRepository = Container.get(UserRepository);
  });

  describe('createUser method', () => {
    it('should pass correct parameters to userRepository.createUser method', async () => {
      databaseServiceMock.runQuery.mockResolvedValueOnce({ rowCount: 1, ...restQueryResult });

      const createUserSpy = jest.spyOn(userRepository, 'createUser');

      await userService.createUser(createUserDto);

      expect(createUserSpy).toHaveBeenCalledWith(createUserDto);
    });

    describe('when successfully create user', () => {
      it('should return resolved promise', async () => {
        databaseServiceMock.runQuery.mockResolvedValueOnce({ rowCount: 1, ...restQueryResult });

        await expect(userService.createUser(createUserDto)).resolves.toBeUndefined();
      });
    });

    describe('when user already exists', () => {
      it('should throws conflict exception', async () => {
        databaseServiceMock.runQuery.mockRejectedValueOnce({ code: DatabaseErrorCode.UniqueViolation });

        await expect(userService.createUser(createUserDto)).rejects.toThrow(new HttpException('User already exists', 409));
      });
    });

    describe('when cannot create user', () => {
      it('should throws internal server error', async () => {
        databaseServiceMock.runQuery.mockResolvedValueOnce({ rowCount: 0, ...restQueryResult });

        await expect(userService.createUser(createUserDto)).rejects.toThrow(new HttpException('Cannot create user', 500));
      });
    });
  });
});
