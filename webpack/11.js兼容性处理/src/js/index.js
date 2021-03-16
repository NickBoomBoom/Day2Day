new Promise((resolve) => {
  setTimeout(() => {
    resolve(1);
  }, 2000);
}).then((res) => {
  this.a = res;
});
