import '../less/index.less';
import '../less/main.css';

const test = () => {
  this.b = 1;
};

test();

new Promise((resolve) => {
  setTimeout(() => {
    resolve(1);
  }, 2000);
}).then((res) => {
  this.a = res;
});
