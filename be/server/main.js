
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors({
  origin: 'http://127.0.0.1:5501', // 前端页面地址
  methods: ['GET', 'POST'],
  credentials: true // 如果前端带 cookie
})); // 允许所有跨域请求
app.use(bodyParser.json());

app.post('/api/track', (req, res) => {
  console.log('收到', req.body);
  res.json({ status: 'success', received: req.body });
});

app.get('/', (req, res) => {
  // console.log('GET 请求已接收')
  res.send('Express 本地后端运行中...');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
