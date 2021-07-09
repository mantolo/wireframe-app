import waitPort from "wait-port";
import fs from "fs";
import mysql from "mysql";

const {
    MYSQL_HOST: HOST,
    MYSQL_HOST_FILE: HOST_FILE,
    MYSQL_USER: USER,
    MYSQL_USER_FILE: USER_FILE,
    MYSQL_PASSWORD: PASSWORD,
    MYSQL_PASSWORD_FILE: PASSWORD_FILE,
    MYSQL_DB: DB,
    MYSQL_DB_FILE: DB_FILE,
} = process.env;

let pool;

export async function init() {
    const host = HOST_FILE ? fs.readFileSync(HOST_FILE) : HOST;
    const user = USER_FILE ? fs.readFileSync(USER_FILE) : USER;
    const password = PASSWORD_FILE ? fs.readFileSync(PASSWORD_FILE) : PASSWORD;
    const database = DB_FILE ? fs.readFileSync(DB_FILE) : DB;

    await waitPort({ host, port : 3306});

    pool = mysql.createPool({
        connectionLimit: 5,
        host,
        user,
        password,
        database,
    });

    return new Promise((acc, rej) => {
        pool.query(
            'CREATE TABLE IF NOT EXISTS plan_items (plan_id varchar(36), plan_type varchar(50), plan_name varchar(255), is_general boolean, is_specialist boolean, is_physiotherapy boolean, price decimal(12,2), discount_off tinyint)',
            err => {
                if (err) return rej(err);

                console.log(`Connected to mysql db at host ${HOST}`);
                acc();
            },
        );
    });
}

export async function teardown() {
    return new Promise((acc, rej) => {
        pool.end(err => {
            if (err) rej(err);
            else acc();
        });
    });
}

export async function getItems() {
    return new Promise((acc, rej) => {
        pool.query('SELECT * FROM plan_items', (err, rows) => {
            if (err) return rej(err);
            acc(rows);
        });
    });
}

export const getAllPlans = getItems;

export async function getItem(id) {
    return new Promise((acc, rej) => {
        pool.query('SELECT * FROM plan_items WHERE plan_id=?', [id], (err, rows) => {
            if (err) return rej(err);
            if (rows.length > 1) {
                console.warn(`id ${id} queried more than 1 entry! you could regret if you skip this`)
            }
            acc(rows[0]);
        });
    });
}

export const getPlan = getItem;

export async function storeItem(item) {
    return new Promise((acc, rej) => {
        pool.query(
            'INSERT INTO plan_items (plan_id, name) VALUES (?, ?)',
            [item.id, item.name],
            err => {
                if (err) return rej(err);
                acc();
            },
        );
    });
}

export async function updateItem(id, item) {
    return new Promise((acc, rej) => {
        pool.query(
            'UPDATE plan_items SET plan_name=?, WHERE id=?',
            [item.name, id],
            err => {
                if (err) return rej(err);
                acc();
            },
        );
    });
}

export async function removeItem(id) {
    return new Promise((acc, rej) => {
        pool.query('DELETE FROM plan_items WHERE plan_id = ?', [id], err => {
            if (err) return rej(err);
            acc();
        });
    }, (err) => {
        console.error(err);
    });
}

export async function addSampleData(data = []) {
    return Promise.all(data.map((arr) => new Promise((acc, rej) => {
        pool.query(
            "INSERT INTO plan_items (plan_id, plan_type, plan_name, is_general, is_specialist, is_physiotherapy, price, discount_off) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            arr,
            err => {
                if (err) return rej(err);
                acc();
            }
        );
    }, (err) => {
        console.error(err);
    })));
}