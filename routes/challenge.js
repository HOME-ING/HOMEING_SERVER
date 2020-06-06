var express = require('express');
var router = express.Router();

const util = require('../modules/util')
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const ChallengeModel = require('../models/challenge');


/* GET 챌린지 리스트 불러오기 */
router.get('/', async (req, res) => {
  // 불러오기
  const challenges = await ChallengeModel.getAllList();

  // 불러오기 성공
  return res.status(statusCode.OK)
    .send(util.success(statusCode.OK, resMessage.ALL_CHALLENGE_SUCCESS, challenges));
});

/* GET 콘텐츠화면 챌린지 불러오기 */
router.get('/contents', async (req, res) => {
  // 불러오기
  const contents = await ChallengeModel.getChallenges();

  // 불러오기 성공
  return res.status(statusCode.OK)
    .send(util.success(statusCode.OK, resMessage.CONTENTS_SUCCESS, contents));
});

module.exports = router;