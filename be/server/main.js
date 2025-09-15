
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors({
  origin: 'http://localhost:9876', // 前端页面地址
  methods: ['GET', 'POST'],
  credentials: true // 如果前端带 cookie
})); // 允许所有跨域请求
app.use(bodyParser.json());

app.post('/api/track', async (req, res) => {
  // console.log('收到', req.body);

  const { encryptedKey, iv, data } = req.body
  const result = await decryptWithPrivateKey(encryptedKey, iv, data)
  res.json({ status: 'success', received: req.body });
  console.log('解析:', result.action, result.duration, result.createdAt)
});

app.get('/', (req, res) => {
  // console.log('GET 请求已接收')
  res.send('Express 本地后端运行中...');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});






function base64ToBuf(b64) {
  const bin = Buffer.from(b64, "base64");
  return new Uint8Array(bin).buffer;
}

function bufToBase64(buf) {
  return Buffer.from(new Uint8Array(buf)).toString("base64");
}


const { webcrypto } = require('crypto');
const { subtle } = webcrypto;

// 私钥 PEM
const PRIVATE_KEY = `-----BEGIN PRIVATE KEY-----
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

function pemToArrayBuffer(pem) {
  const b64 = pem.replace(/-----(BEGIN|END) PRIVATE KEY-----/g, "").replace(/\s+/g, "");
  const bin = Buffer.from(b64, "base64");
  return new Uint8Array(bin).buffer;
}

async function decryptWithPrivateKey(encryptedKey, iv, encryptedData, pem = PRIVATE_KEY) {
  // 导入私钥
  const privateKey = await subtle.importKey(
    "pkcs8",
    pemToArrayBuffer(pem),
    { name: "RSA-OAEP", hash: "SHA-256" },
    false,
    ["decrypt"]
  );

  // 用私钥解密 AES key
  const rawAesKey = await subtle.decrypt(
    { name: "RSA-OAEP" },
    privateKey,
    base64ToBuf(encryptedKey)
  );

  // 还原 AES 密钥对象
  const aesKey = await subtle.importKey(
    "raw",
    rawAesKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  );

  // 用 AES-GCM 解密数据
  const decrypted = await subtle.decrypt(
    { name: "AES-GCM", iv: new Uint8Array(base64ToBuf(iv)) },
    aesKey,
    base64ToBuf(encryptedData)
  );

  return JSON.parse(new TextDecoder().decode(decrypted))
}
