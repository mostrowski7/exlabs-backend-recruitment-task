import { QueryResult } from 'pg';
import { createClient, RedisClientType } from 'redis';
import { Service } from 'typedi';

@Service()
class CacheService {
  private client: RedisClientType;

  constructor() {
    this.client = createClient();
    this.client.connect();
  }

  async getInstance(): Promise<RedisClientType> {
    return this.client;
  }

  createKey(query: string, params?: unknown[]): string {
    return query.replaceAll(/[\r\n\s]+/g, '') + params?.toString();
  }

  async get(key: string): Promise<QueryResult<any> | null> {
    const value = await this.client.get(key);

    if (value) {
      return JSON.parse(value);
    }

    return null;
  }

  async set(key: string, value: unknown): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }
}

export default CacheService;
