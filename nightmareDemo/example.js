const Nigthmare = require('nightmare')
const request = require('request')



/**
 * 使用代理IP去启动nightmare
 * @param {String} proxyIp 代理IP地址
 * ip 地址 测试网站 'http://2017.ip138.com/ic.asp'
 * 
 */
function createProxyBrowser(proxyIp) {

  return Nigthmare({
      show: false,
      width: 375,
      height: 667,
      openDevTools: true,
      switches: {
        'proxy-server': proxyIp
      }
    })
    .useragent('Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1')
    .authentication('yuanshi', 'yuanshi')
    .goto('https://m.maoyan.com/?_v_=yes&city=shanghai')
    .evaluate(() => {
      let body = document.querySelector('body').innerText
      console.log('nigthmare===>', document.querySelector('body'))
      return body
    })
}

async function testProxys() {
  try {
    let proxyIp = '172.32.12.252';
    let ip = await createProxyBrowser(proxyIp);
    console.log(ip)

  } catch (err) {
    // console.error(err);
  }
}

testProxys()