
const dbPool = require('./db'); 

class UnitOfWork {
    constructor() {
        this.client = null;
    }

    async start() {
        this.client = await dbPool.connect(); 
        await this.client.query('BEGIN');
    }

    async commit() {
        if (this.client) {
            await this.client.query('COMMIT');
            this.client.release();
            this.client = null;
        }
    }

    async rollback() {
        if (this.client) {
            await this.client.query('ROLLBACK');
            this.client.release();
            this.client = null;
        }
    }

    getClient() {
        return this.client || dbPool;
    }
}

module.exports = UnitOfWork;