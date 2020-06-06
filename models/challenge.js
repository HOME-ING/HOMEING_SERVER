const pool = require('../modules/pool');
const challengeTable = 'Challenge';
const challengeImgTable = 'ChallengeImg';


const challenge = {
    // 챌린지 리스트 불러오기
    getAllList: async () => {
        const query = `SELECT challengeIdx, title, description From ${challengeTable}`;
        try {
            const result = await pool.queryParam(query);
            for (let element of result) {
                // 이미지 추가
                element['challengeImgs'] = await challenge.getChallengeImgs(element['challengeIdx'])
            }
            return result

        } catch (err) {
            if (err.errno == 1062) {
                console.log('getAll ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('getAll ERROR : ', err);
            throw err;
        }
    },

    // 콘텐츠 리스트 불러오기
    getChallenges_test: async () => {
        const query = `SELECT * FROM ${challengeTable}`;
        try {
            const result = await pool.queryParam(query);
            // 이미지 추가
            for (let element of result) {
                console.log('el', element)
                element['challengeUrl'] = await challenge.mainChallengeImg(element['challengeIdx'])
            }
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

    // 콘텐츠 챌린지 사진 불러오기
    mainChallengeImg: async (idx) => {
        const query = `SELECT challengeUrl FROM ${challengeImgTable} WHERE challengeIdx="${idx}"`;
        try {
            const result = await pool.queryParam(query);
            console.log(result)
            return result[0].challengeUrl

        } catch (err) {
            if (err.errno == 1062) {
                console.log('getPhotoImgs ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('getPhotoImgs ERROR : ', err);
            throw err;
        }
    },

    // 챌린지 이미지 불러오기
    getChallengeImgs: async (idx) => {
        const query = `SELECT challengeUrl FROM ${challengeImgTable} WHERE challengeIdx="${idx}"`;
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

    // 콘텐츠 리스트 불러오기
    getChallenges: async () => {
        const query = `SELECT challengeUrl, title, description, likes, shared 
        FROM ${challengeTable} INNER JOIN ${challengeImgTable} ON Challenge.challengeIdx = ChallengeImg.challengeIdx`;
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

module.exports = challenge;