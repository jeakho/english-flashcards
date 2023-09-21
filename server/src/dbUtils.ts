import { Database } from 'sqlite3';

export default class DbUtils {
    static async selectOneFromDb(db: Database, sql: string, params: any[]) {
        return await new Promise((resolve, reject) => {
            db.get(sql, params, function (err, result) {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(result);
            });
        })
    }

    static async selectFromDb(db: Database, sql: string, params: any[]) {
        return await new Promise((resolve, reject) => {
            db.all(sql, params, function (err, result) {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(result);
            });
        })
    }

    static async insertIntoDb(db: Database, sql: string, params: any[] = []) {
        return await new Promise((resolve, reject) => {
            db.run(sql, params, function (err) {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(this.lastID);
            });
        })
    }

    static async deleteFromDb(db: Database, sql: string, params: any[] = []) {
        return await new Promise((resolve, reject) => {
            db.run(sql, params, function (err) {
                if (err) {
                    reject(err);
                    return;
                }

                resolve({ message: 'Deletion completed' });
            });
        })
    }
}