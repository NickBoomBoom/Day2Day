// const { io }  = require('socket.io-client')

// // const socket = io('http://localhost:3000', {
// // const socket = io('https://admin-test.betterparenting.online', {
// const socket = io('https://api2.betterparenting.online', {
//   path: '/admin2/socket.io',
//   query: {
//     userId: 1,
//     tag: 'admin'
//   }
// })
// socket.on('connect', () => {
//   console.log('连接成功')
// })

// socket.on('connect_error', (error ) => {
//   console.error('连接报错', error.message)
// })

// socket.on('disconnect', () => {
//   console.log('断开')
// })


import axios from "axios";

async function run() {

  const res = await axios.get("http://lklkasdfsadfaasd.com/")
  console.log(111, res)
}

run()