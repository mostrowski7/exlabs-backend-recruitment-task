import 'reflect-metadata';
import { Container } from 'typedi';
import DatabaseService from '../infrastructure/database/database.service';
import AuthService from '../modules/auth/auth.service';
import AuthenticateUserDto from '../interfaces/dtos/authenticate-user.dto';
import HttpException from '../utils/http-exception';
import CacheService from '../infrastructure/cache/cache.service';

jest.mock('../infra/database/database.service');

describe('AuthService', () => {
  let authService: AuthService;
  let databaseServiceMock: jest.Mocked<DatabaseService>;
  const authenticateUserDto: AuthenticateUserDto = { email: 'smith@gmail.com' };
  const restQueryResult = { rows: [], oid: 0, command: 'INSERT', fields: [] };
  const rawUserRow = {
    id: 1,
    first_name: 'John',
    last_name: 'Smith',
    email: 'smith@gmail.com',
    role: 'user',
  };

  beforeEach(() => {
    Container.reset();
    jest.resetAllMocks();

    databaseServiceMock = new DatabaseService(new CacheService()) as jest.Mocked<DatabaseService>;

    Container.set(DatabaseService, databaseServiceMock);

    authService = Container.get(AuthService);
  });

  describe('authenticateUser method', () => {
    describe('when successfully authenticate', () => {
      it('should return access token', async () => {
        databaseServiceMock.runQuery.mockResolvedValueOnce({
          rowCount: 1,
          ...restQueryResult,
          rows: [rawUserRow],
        });

        const result = await authService.authenticateUser(authenticateUserDto);

        expect(result).toEqual(expect.any(String));
      });
    });

    describe('when invalid email', () => {
      it('should return unauthenticated exception', async () => {
        databaseServiceMock.runQuery.mockResolvedValueOnce({
          rowCount: 0,
          ...restQueryResult,
        });

        expect(authService.authenticateUser(authenticateUserDto)).rejects.toThrow(
          new HttpException('Unauthenticated', 401),
        );
      });
    });
  });
});
