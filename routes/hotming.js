var express = require('express');
var router = express.Router();

const util = require('../modules/util')
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const HotmingModel = require('../models/hotming');


/* GET 핫밍이미지 리스트 불러오기 */
router.get('/', async (req, res) => {
  // 불러오기
  const hotmings = await HotmingModel.getAllList();

  // 불러오기 성공
  return res.status(statusCode.OK)
    .send(util.success(statusCode.OK, resMessage.ALL_HOTMING_SUCCESS, hotmings));
});

module.exports = router;