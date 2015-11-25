let SERVER_URL = '';
let NODE_ENV = __ENV__ || 'development';

if (NODE_ENV === 'development') {
  // 当前环境为「开发环境」，是由命令行工具启动的
  SERVER_URL = 'http://localhost:3000';
} else if(NODE_ENV === 'production') {
  // 当前环境为「生产环境」，是线上正式运行的环境
  SERVER_URL = 'http://barrage.avosapps.com';
} else {
  // 当前环境为「测试环境」
  SERVER_URL = 'http://dev.barrage.avosapps.com';
}

let API_URL = `${SERVER_URL}/api`;

export {SERVER_URL, API_URL};
