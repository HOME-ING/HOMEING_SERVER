const pool = require('../modules/pool');
const table = 'User';

const user = {

    // 로그인
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
            return user[0].password === password ? true : false

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
    },

    // 랭크 관련
    getRanks: async () => {
        const query = `SELECT ranks, id, profileUrl FROM ${table} ORDER BY ranks`;
        try {
            const result = await pool.queryParam(query);
            return result

        } catch (err) {
            if (err.errno == 1062) {
                console.log('getPhotoImgs ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('getPhotoImgs ERROR : ', err);
            throw err;
        }
    },


}

module.exports = user;