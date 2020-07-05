const http = require('http');
const fs = require('fs');//引入文件读取模块
const PORT = 8999
const HTML_PATH = __dirname + '/html'  // 测试文件存放位置

const REDIRECT_LIST = ['', '/']

const template = `<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>列表</title>
    <link rel="stylesheet" href="./css/reset.css">
  </head>

  <body>
    <ul>
        aList
    </ul>
  </body>
  
</html>`


const server = http.createServer(function (req, res) {
  const url = req.url;
  let file = __dirname + url
  if (REDIRECT_LIST.includes(url)) {
    // 热更新
    const htmlList = fs.readdirSync(HTML_PATH)
    const aList = htmlList.map(t => {
      return `<li><a href='/html/${t}'> ${t.split('.')[0]} </a></li>`
    })

    const data = template.replace('aList', aList.toString().replace(/,/g, ''))
    res.writeHeader(200, {
      'content-type': 'text/html;charset="utf-8"'
    });
    res.write(data);
    res.end();
    return
  }

  file = decodeURIComponent(file)
  console.log(file)
  fs.readFile(file, function (err, data) {
    /*
        一参为文件路径
        二参为回调函数
            回调函数的一参为读取错误返回的信息，返回空就没有错误
            二参为读取成功返回的文本内容
    */
    if (err) {
      res.writeHeader(404, {
        'content-type': 'text/html;charset="utf-8"'
      });
      res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
      res.end();
    } else {
      res.writeHeader(200, {
        'content-type': 'text/html;charset="utf-8"'
      });
      res.write(data);//将index.html显示在客户端
      res.end();
    }
  });


}).listen(PORT);


console.log('sever start ===> localhost:8999')