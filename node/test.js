var http = require('http');            // 

var server = http.createServer();      // 

server.on('removeListener', function (e, f) {
  console.log("对"+e+"事件取消事件处理函数");
console.log(f);
});
server.on('newListener', function (e, f) {
  console.log("对"+e+"事件添加事件处理函数");
console.log(f);
});
var testFunction = function (req, res) {
  if (req.url !== "/favicon.ico")
    console.log('发送响应完毕。');
};

server.on('request', function (req, res) {
  if (req.url !== "/favicon.ico")
    console.log('接收到客户端请求。');
});
server.on('request', function (req, res) {
  if (req.url !== "/favicon.ico") {
    console.log(req.url);
  }
  res.end();
});
server.on('request', testFunction);
server.removeListener('request', testFunction);
server.listen(1337, "127.0.0.1");
