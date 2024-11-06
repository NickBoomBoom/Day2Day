const { io }  = require('socket.io-client')

// const socket = io('http://localhost:3000', {
const socket = io('https://admin-test.betterparenting.online', {
// const socket = io('https://api2.betterparenting.online/admin2', {
  query: {
    userId: 1,
    tag: 'admin'
  }
})
socket.on('connect', () => {
  console.log('连接成功')
})

socket.on('connect_error', (error ) => {
  console.error('连接报错', error.message)
})

socket.on('disconnect', () => {
  console.log('断开')
})
