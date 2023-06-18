import { Pool } from 'pg';
import { Service } from 'typedi';

@Service()
class DatabaseService {
  private pool: Pool;

  constructor() {
    this.pool = new Pool();
  }

  async runQuery(query: string, params?: unknown[]) {
    return await this.pool.query(query, params);
  }
}

export default DatabaseService;
