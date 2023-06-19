import 'reflect-metadata';
import { Container } from 'typedi';
import UserService from '../modules/users/users.service';
import DatabaseService from '../infra/database/database.service';
import CreateUserDto from '../interfaces/dtos/create-user.dto';
import DatabaseErrorCode from '../infra/database/database.error';
import HttpException from '../utils/http-exception';
import UserRepository from '../modules/users/users.repository';
import { UpdateUserBodyDto } from '../interfaces/dtos/update-user.dto';

jest.mock('../infra/database/database.service');

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;
  let databaseServiceMock: jest.Mocked<DatabaseService>;
  const restQueryResult = { rows: [], oid: 0, command: 'SELECT', fields: [] };
  const createUserDto: CreateUserDto = { firstName: 'John', lastName: 'Smith', email: 'smith@gmail.com', role: 'user' };
  const rawUserRow = { id: 1, first_name: 'John', last_name: 'Smith', email: 'smith@gmail.com', role: 'user' };
  const userRow = { id: 1, firstName: 'John', lastName: 'Smith', email: 'smith@gmail.com', role: 'user' };

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

  describe('getUsersByRole method', () => {
    describe('when fetch some users', () => {
      it('should return array of users', async () => {
        databaseServiceMock.runQuery.mockResolvedValueOnce({ rowCount: 1, ...restQueryResult, rows: [rawUserRow] });

        const result = await userService.getUsersByRole();

        expect(result).toEqual([userRow]);
      });
    });

    describe('when not found', () => {
      it('should return empty array', async () => {
        databaseServiceMock.runQuery.mockResolvedValueOnce({ rowCount: 0, ...restQueryResult });

        const result = await userService.getUsersByRole();

        expect(result).toEqual([]);
      });
    });

    describe('when role is provided', () => {
      it('should run findUsersByRole method', async () => {
        const role = 'user';

        databaseServiceMock.runQuery.mockResolvedValueOnce({ rowCount: 0, ...restQueryResult });

        const getUsersByRoleSpy = jest.spyOn(userRepository, 'getUsersByRole');

        await userService.getUsersByRole(role);

        expect(getUsersByRoleSpy).toHaveBeenCalledWith(role);
      });
    });

    describe('when role is not provided', () => {
      it('should run getAllUsers method', async () => {
        databaseServiceMock.runQuery.mockResolvedValueOnce({ rowCount: 0, ...restQueryResult });

        const getAllUsersSpy = jest.spyOn(userRepository, 'getAllUsers');

        await userService.getUsersByRole();

        expect(getAllUsersSpy).toHaveBeenCalled();
      });
    });
  });

  describe('findUserById method', () => {
    it('should pass correct parameter to findUserById method', async () => {
      databaseServiceMock.runQuery.mockResolvedValueOnce({ rowCount: 1, ...restQueryResult, rows: [rawUserRow] });

      const getAllUsersSpy = jest.spyOn(userRepository, 'findUserById');

      await userService.findUserById(1);

      expect(getAllUsersSpy).toHaveBeenCalledWith(1);
    });

    describe('when found user', () => {
      it('should return user object', async () => {
        databaseServiceMock.runQuery.mockResolvedValueOnce({ rowCount: 1, ...restQueryResult, rows: [rawUserRow] });

        const result = await userService.findUserById(1);

        expect(result).toEqual(userRow);
      });
    });

    describe('when not found', () => {
      it('should throws not found exception', async () => {
        databaseServiceMock.runQuery.mockResolvedValueOnce({ rowCount: 0, ...restQueryResult });

        await expect(userService.findUserById(1)).rejects.toThrow(new HttpException('User not found', 404));
      });
    });
  });

  describe('updateUserById method', () => {
    const userId = 1;
    const updateUserBodyDto: UpdateUserBodyDto = { firstName: 'Jack' };
    const restUpdateQueryResult = { rows: [], oid: 0, command: 'UPDATE', fields: [] };

    it('should pass correct parameter to updateUserById method', async () => {
      databaseServiceMock.runQuery.mockResolvedValueOnce({ rowCount: 1, ...restUpdateQueryResult });

      const updateUserByIdSpy = jest.spyOn(userRepository, 'updateUserById');

      await userService.updateUserById(userId, updateUserBodyDto);

      expect(updateUserByIdSpy).toHaveBeenCalledWith(userId, updateUserBodyDto);
    });

    describe('when successfully update user', () => {
      it('should return resolved promise', async () => {
        databaseServiceMock.runQuery.mockResolvedValueOnce({ rowCount: 1, ...restUpdateQueryResult });

        const result = await userService.updateUserById(userId, updateUserBodyDto);

        expect(result).toBeUndefined();
      });
    });

    describe('when not found user', () => {
      it('should throws not found exception', async () => {
        databaseServiceMock.runQuery.mockResolvedValueOnce({ rowCount: 0, ...restUpdateQueryResult });

        await expect(userService.updateUserById(userId, updateUserBodyDto)).rejects.toThrow(new HttpException('User not found', 404));
      });
    });
  });
});
