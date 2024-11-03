const cors_proxy = require('cors-anywhere');
cors_proxy
  .createServer({
    originWhitelist: [], // 모든 도메인에서의 요청 허용
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2'],
  })
  .listen(8080, () => {
    console.log('Running CORS Anywhere on http://localhost:8080');
  });
