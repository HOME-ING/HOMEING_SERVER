const pool = require('../modules/pool');
const table = 'Hotming';

const banner = {
    // 포스트 리스트 불러오기
    getAllList: async () => {
        const query = `SELECT hotmingUrl FROM ${table}`;
        try {
            const result = await pool.queryParam(query);
            return result

        } catch (err) {
            if (err.errno == 1062) {
                console.log('getAll ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('getAll ERROR : ', err);
            throw err;
        }
    }

}

module.exports = banner;