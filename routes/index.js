var express = require('express');
var router = express.Router();

// 회원가입, 로그인, 마이페이지 관련
router.use('/user', require('./user'));

// 챌린지 관련
router.use('/challenge', require('./challenge'));


module.exports = router;