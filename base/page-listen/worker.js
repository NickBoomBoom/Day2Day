
const SEND_TYPES = {
  START: "start",
  STOP: "stop",
  CONTINUE: 'continue',

}
const RECIVE_TYPES = {
  REPORT: 'report'
}

let timer = null
let timeout = null
let preReportDate = null

let currentData = {
  action: '', // 动作名称

}

function report(duration) {
  preReportDate = Date.now()
  self.postMessage({
    type: RECIVE_TYPES.REPORT,
    data: {
      duration,
      ...currentData,
    }
  })
}
function run() {
  clearTimeout(timer)
  timer = setTimeout(() => {
    report(timeout)
    run()
  }, timeout)
}
function stop(duration) {
  clearTimeout(timer)
  timer = null
  report(duration)
}

self.addEventListener('message', (e) => {
  const { data, type } = e.data

  currentData = data
  switch (type) {
    case SEND_TYPES.START:
      console.log('start', data)
      timeout = data.timeout
      report(0)
      run()
      break;
    case SEND_TYPES.STOP:
      console.error('stop', data, preReportDate)
      stop(data.preActionDate - preReportDate)
      break;
    case SEND_TYPES.CONTINUE:
      // console.warn('continue')
      break;
  }


});
