const pool = require('../modules/pool');
const table = 'User';

const user = {

    checkUser: async (id) => {
        const query = `SELECT * FROM ${table} WHERE id="${id}"`;
        try {
            const result = await pool.queryParam(query);
            return result.length === 0 ? false : true

        } catch (err) {
            if (err.errno == 1062) {
                console.log('checkUser ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('checkUser ERROR : ', err);
            throw err;
        }
    },
    signin: async (id, password) => {
        const query = `SELECT * FROM ${table} where id="${id}"`;

        try {
            const user = await pool.queryParam(query);
            const hashed = crypto.pbkdf2Sync(password, user[0].salt.toString(), 1, 32, 'sha512').toString('hex');
            return user[0].password === hashed ? true : false

        } catch (err) {
            console.log('signin ERROR : ', err);
            throw err;
        }
    },
    getUserById: async (id) => {
        const query = `SELECT * FROM ${table} where id="${id}"`;

        try {
            const user = await pool.queryParam(query);
            // console.log(user) 배열로 나옴
            return user[0];

        } catch (err) {
            console.log('getUser ERROR : ', err);
            throw err;
        }
    }
}

module.exports = user;