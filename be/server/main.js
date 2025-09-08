
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto');
const app = express();
const PORT = 3000;

app.use(cors({
  origin: 'http://localhost:9876', // 前端页面地址
  methods: ['GET', 'POST'],
  credentials: true // 如果前端带 cookie
})); // 允许所有跨域请求
app.use(bodyParser.json());

app.post('/api/track', (req, res) => {
  console.log('收到', req.body.data);

  const result = decryptWithPrivateKey(req.body.data)
  console.log(111, result)
  res.json({ status: 'success', received: req.body });
});

app.get('/', (req, res) => {
  // console.log('GET 请求已接收')
  res.send('Express 本地后端运行中...');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

const PRAVITE = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDsQjNZSru0oKFu
IghgD9Ibw3BvawbmFDVVMRZ26Fs+lZC8Df+1e5GDJV6KgVXyU5Zh2VtIp8sAQYI2
vkh+l7qB7fP3pVVrcVOUfYurWeWDkGCPmhEUoiJcoA7uxywsVJelC657HOzVbaWz
GlY5C4skWDeOwxv8K0CzGAPIKERGjT1OiVrg4DHOOfBLsz15XbZsyoY+cTqfO+N3
wUpRlz/upYa6oqG22eCyD0SnFmH7cPrJTNWnhuJDP9UONxFgVHnit9TKEG0Ftp9Q
xUnRKndf0pQcejHFPqgTOb8wA/SFlHZmTqEFBnpCcnVqDGTnOrfeh0hAIsuE1Pdo
f/VoRCu3AgMBAAECggEAEmvfARlYpW7Y53Nz37mcEloczDM2KH5u4iOfssnPQ4P5
8w/MXmQyJl2lj3siLnDiCuMdwP6ET5LMCmSv1l8SRcs9+JNFo8kEUVGwsD2kLav2
O3wx1MAHmd1JDMku4o39/Pp6MlNBDCsuflaRXoVN5hmSy2jfJ7xfoRdARD0Phcib
Iij8wxOOeYfT3VxC5u+hq3QEHSdwcPh0smZFkCLf/58KHJ91zeI+WNlzgp6Ili5F
uqKO1NZXVjJRA1vsqHzjWcOqWHxpHshetYW8uO92OrxbPCoO9qFJe8TtZqACtyuh
7DyvWCeWtvEe8H5sY2djcRpA9ygj9k1l+JRsIKS4YQKBgQD5Wf/2zDGCh0qlboer
/qIpB5/JcQyuDYWowgU6Yk+DK1baWYgIQjLgqVqnIKxHWgZz19ueCPKDAqVsqUU3
Eq+gNxtNfkTkBnuhQELVg2ojtQ6tOh4EJ1AGcioNEptWySyNE74HTVL2U0y37hkd
DN6QgRh1RJtdp4XdWTEJjCKHrwKBgQDyjtT+FBCy1GVab1lx25hacQF6g6vO+ni5
0L0qkPlgqIDI2g/BxGfdgw34zL/pTGg6JdSJtcQoHic46vWoyTU9iGRQLky1BfgW
UTaxsKKcTI1L9KGOrAwVTWCYYxL7XBm0Oa+U92ECwV3BaT7iXQa+osiYmRTZc9XA
SRn7iYcWeQKBgCZf6Xqr9jqmY6COICciKwaxe6/ezBrFTfqo0XEozB/dvaIhAUR0
G6xjo+Xwq1LX0gJmCBCMQ/ZRo+/TJSnSoGDB2lvUwPlu3fv1DdQaQ213Yeja9t+g
xToYu8wDPxDeKRMVJLuu9MOgEkCETi0gW+hVVdRGWLrTG1Dzdw6HGJFVAoGAMYn8
dFwSwQNiI+NECF4KMsaLv8Lurxo21/SK/guX8ybXDq6Cs1dywyoGC3993p8tVlrt
mqaWBn+KETTjsXJOvl+B5WJfZkVu0tgJbKcfvv5fiVjQOjxnR16DUPxDHzVDRqzV
cH5JwO9PP7ZIEqFfREYo5Am32WWwDVKgzN/cyDkCgYEAwxBtnFBAPiJ0XtRFhvQ/
OaKR0nhfulhNzn5f88QiEkD5KgoVhZIS8jCsF309aamARp8jsOEyDzwBvs6rQ/K+
yrQxJn77R7q3dYhJabnxM2hxDVkI9D+23tAUVwvkUOH6CbR6VfPH5GypDZhchYYu
RMRmJbJXGRcyNpV6eV1ApO8=
-----END PRIVATE KEY-----`
function decryptWithPrivateKey(encryptedBase64, privateKeyPem = PRAVITE) {
  const buffer = Buffer.from(encryptedBase64, 'base64');
  const decrypted = crypto.privateDecrypt(
    {
      key: privateKeyPem,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256',
    },
    buffer
  );
  return JSON.parse(decrypted.toString('utf8'));
}