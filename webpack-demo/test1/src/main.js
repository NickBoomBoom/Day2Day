import './assets/index.css';
import './assets/index.less';

console.log('main');

function test() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(111)
        }, 2000);
    })
}

test()