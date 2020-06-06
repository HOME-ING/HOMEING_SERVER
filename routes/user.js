const crypto = require('crypto');
const express = require('express');
const router = express.Router();
const Users = require('../models/user');
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');

/* 
    ✔️ sign in
    METHOD : POST
    URI : localhost:3000/user/signin
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
    ✔️ get profile
    METHOD : GET
    URI : localhost:3000/user/profile/:id
    RESPONSE STATUS : 200 (OK)
    RESPONSE DATA : User Id, name, email
*/

// 프로필 조회

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