function P(excutor) {
  let self = this;
  self.status = "pendding"; // 状态
  self.value = null; //  resolve 数据
  self.reason = null; // reject 数据

  self.onFulfilledCallbacks = []; // 成功回调
  self.onRejectedCallbacks = []; // 失败回调

  self.resolve = function(value) {
    if (self.status === "pendding") {
      self.status = "fulfilled";
      self.value = value;
      // 执行回调函数
      self.onFulfilledCallbacks.forEach(item => item(self.value));
    }
  };
  self.reject = function(reason) {
    if (self.status === "pendding") {
      self.status = "rejected";
      self.reason - reason;
      // 执行回调函数
      self.onRejectedCallbacks.forEach(item => item(self.reason));
    }
  };

  try {
    excutor(self.resolve, self.reject);
  } catch (err) {
    reject(err);
  }
}

P.prototype.then = function(onFulfilled, onRejected) {
  onFulfilled =
    typeof onFulfilled === "function"
      ? onFulfilled
      : function(data) {
          return data;
        };
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : function(err) {
          throw err;
        };

  let self = this;

  if (self.status === "fulfilled") {
    return new P((resolve, reject) => {
      try {
        let x = onFulfilled(self.value);
        if (x instanceof P) {
          x.then(resolve, reject);
        } else {
          resolve(x);
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  if (self.status === "rejected") {
    return new P((resolve, reject) => {
      try {
        let x = onRejected(self.reason);
        if (x instanceof P) {
          x.then(resolve, reject);
        } else {
          resolve(x);
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  if (self.status === "pendding") {
    return new P((resolve, reject) => {
      self.onFulfilledCallbacks.push(() => {
        let x = onFulfilled(self.value);
        if (x instanceof P) {
          x.then(resolve, reject);
        } else {
          resolve(x);
        }
      });

      self.onRejectedCallbacks.push(() => {
        let x = onRejected(self.reason);
        if (x instanceof P) {
          x.then(resolve, reject);
        } else {
          resolve(x);
        }
      });
    });
  }
};

P.prototype.catch = function(fn) {
  return this.then(null, fn);
};

// P.prototype.finally = function(fn) {

//   console.log("====C", ...this);
//   return this.then(
//     value => this.resolve(fn()).then(() => value),
//     reason =>
//       this.resolve(fn()).then(() => {
//         throw reason;
//       })
//   );
// };

new P(function(resolve, reject) {
  setTimeout(() => {
    resolve(1);
  }, 1000);
})
  .then(res => {
    console.log("res ==> ", res);
  })
  .catch(err => console.error(err))
  // .finally(() => console.log("----> finally"));
