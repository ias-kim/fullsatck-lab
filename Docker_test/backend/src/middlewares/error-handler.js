const { StatusCodes } = require('http-status-codes');
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    // 기본 값
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || '나중에 다시 시도하세요',
  };

  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(', ');
    customError.statusCode = 400;
  }
  if (err.code && err.code === 11000) {
    customError.msg = `${Object.keys(err.keyValue)}에 중복값이 입력되었습니다.`;
    customError.statusCode = 400;
  }
  if (err.name === 'CatsError') {
    customError.msg = `ID ${err.value}를 찾을 수 없습니다.`;
    customError.statusCode = 404;
  }

  return res.status(customError.statusCode).json({ msg: customError.msg });
};

const notFound = (req, res) => res.status(404).send(`루트가 맞지 않습니다.`);

module.exports = { errorHandlerMiddleware, notFound };
