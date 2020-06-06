const express = require('express');
const router = express.Router();
const Users = require('../models/user');
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');

/* 
    ✔️ sign in
    METHOD : POST
    URI : /user/signin
    REQUEST BODY : id, password
    RESPONSE STATUS : 200 (OK)
    RESPONSE DATA : User ID
*/

// 로그인
router.post('/signin', async (req, res) => {
    // request body에서 데이터 가져오기
    const {
        id,
        password
    } = req.body;

    // request data확인 없다면 NULL_VALUE
    if (!id || !password) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        return;
    }

    // 존재하는 아이디인지 확인 없으면 NO-USER
    const isUser = await Users.checkUser(id)
    if (!isUser) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
        return;
    }

    // user 정보 데려오기
    const isMatch = await Users.signin(id, password)
    if (isMatch) {
        //성공 - LOGIN_SUCCESS
        res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.LOGIN_SUCCESS, {
                'userId': id
            }));
    } else {
        // 비밀번호 확인 - 일치하지 않으면 MISS_MATCH_PW
        res.status(statusCode.BAD_REQUEST)
            .send((util.fail(statusCode.BAD_REQUEST, resMessage.MISS_MATCH_PW)));
        return;
    }


});

/* 
    ✔️ get rank
    METHOD : GET
    URI : /user/rank
    RESPONSE STATUS : 200 (OK)
    RESPONSE DATA : User 정보
*/

// 메인화면 - 랭킹 정보

router.get('/rank', async (req, res) => {

    //불러오기
    const ranks = await Users.getRanks()

    // 불러오기 성공
    return res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.RANK_SUCCESS, ranks));
});


/* 
    ✔️ get profile
    METHOD : GET
    URI : localhost:3000/user/profile/:id
    RESPONSE STATUS : 200 (OK)
    RESPONSE DATA : User 정보
*/

// 프로필 조회 - 마이페이지 기능 나오면

router.get('/profile/:id', async (req, res) => {

    // request params 에서 데이터 가져오기
    const id = req.params.id;

    // 존재하는 아이디인지 확인 - 없다면 No user 반환
    const isUser = await Users.checkUser(id)
    if (!isUser) {
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
        return;
    }

    const user = await Users.getUserById(id)

    // 성공 - login success와 함께 user Id 반환
    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.READ_PROFILE_SUCCESS, user));

});


module.exports = router;