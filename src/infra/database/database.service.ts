import { Pool, QueryResult } from 'pg';
import { Service } from 'typedi';
import CacheService from '../cache/cache.service';

@Service()
class DatabaseService {
  private pool: Pool;

  constructor(private readonly cacheService: CacheService) {
    this.pool = new Pool();
  }

  async runQuery(query: string, params?: unknown[]): Promise<QueryResult<any>> {
    const redisKey = this.cacheService.createKey(query, params);

    const cacheValue = await this.cacheService.get(redisKey);

    if (cacheValue) return cacheValue;

    const result = await this.pool.query(query, params);

    if (result.command === 'SELECT') {
      await this.cacheService.set(redisKey, JSON.stringify(result));
    }

    return result;
  }
}

export default DatabaseService;
