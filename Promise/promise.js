// 定义状态
const PENDING = "pending";
const FULFILLLED = "fulfilled";
const REJECTED = "rejected";

function Promise(executor) {
  let self = this;// 先缓存当前promise的实例
  self.status = PENDING; // 设置状态
  self.value = undefined; // fulfilled状态时 返回的信息
  self.reason = undefined; // rejected状态时 拒绝的原因
  self.onResolvedCallbacks = []; // 定义存放成功的回调的数组
  self.onRejectedCallbacks = []; // 定义存放失败的回调的数组

  // 成功时候执行的回调
  function resolve(value) {
    if (value instanceof Promise) {
      return value.then(resolve, reject);
    }
    setTimeout(() => {
      if (self.status === PENDING) {
        self.status = FULFILLLED;
        self.value = value;
        self.onResolvedCallbacks.forEach(cb => cb(self.value));
      }
    });
  }

  function reject(reason) {
    setTimeout(() => {
      if (self.status === PENDING) {
        self.status = REJECTED;
        self.reason = reason;
        self.onRejectedCallbacks.forEach(cb => cb(self.reason));
      }
    });
  }

  try {
    // 因为函数执行会出现异常，所以捕获异常并调用reject转为失败态
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

/**
 * resolve中的值几种情况：
 * 1.普通值
 * 2.promise对象
 * 3.thenable对象/函数
 */

/**
 * 对resolve 进行改造增强 针对resolve中不同值情况 进行处理
 * @param  {promise} promise2 promise1.then方法返回的新的promise对象
 * @param  {[type]} x         promise1中onFULFILLLED的返回值
 * @param  {[type]} resolve   promise2的resolve方法
 * @param  {[type]} reject    promise2的reject方法
 */
function resolvePromise(promise2, x, resolve, reject) {
  // 如果从onFULFILLLED中返回的x 就是promise2 就会导致循环引用报错
  if (promise2 === x) {
    return reject(new TypeError("循环引用"));
  }

  let called = false; // 避免多次调用
  // 如果x是一个promise对象 （该判断和下面 判断是不是thenable对象重复 所以可有可无）
  if (x instanceof Promise) { // 获得它的终值 继续resolve
    if (x.status === PENDING) { // 如果为等待态需等待直至 x 被执行或拒绝 并解析y值
      x.then(y => {
        resolvePromise(promise2, y, resolve, reject);
      }, reason => {
        reject(reason);
      });
    } else { // 如果 x 已经处于执行态/拒绝态(值已经被解析为普通值)，用相同的值执行传递下去 promise
      x.then(resolve, reject);
    }
    // 如果 x 为对象或者函数
  } else if (x !== null && ((typeof x === "object") || (typeof x === "function"))) {
    try { // 是否是thenable对象，具有then方法的对象或函数
      let then = x.then;
      if (typeof then === "function") { // 如果还有then则调用then
        then.call(x, function (y) {
          if (called) return;
          called = true;
          // 递归调用到最后为一个没有then的普通对象           
          resolvePromise(promise2, y, resolve, reject);
        }, function (reason) {
          if (called) return;
          called = true;
          reject(reason);
        })
      } else { // 说明是一个普通对象/函数, 则调用resolve来解决它
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else { // 如果返回不是thenable对象，直接解决它！
    resolve(x);
  }
}

/**
 * [注册fulfilled状态/rejected状态对应的回调函数]
 * @param  {function} onFULFILLLED fulfilled状态时 执行的函数
 * @param  {function} onRejected  rejected状态时 执行的函数
 * @return {function} newPromsie  返回一个新的promise对象
 */
Promise.prototype.then = function (onFULFILLLED, onRejected) {
  // 如果没有传参数，表示这个then没有逻辑，把结果往后抛，注意reject就是把错误继续throw
  onFULFILLLED = typeof onFULFILLLED === "function" ? onFULFILLLED : value => value;
  onRejected = typeof onRejected === "function" ? onRejected : reason => { throw reason };
  let self = this;

  let promise2;
  // ------------- executor内部是同步的时候，直接调用
  // 如果当前promise的状态是成功态，onFULFILLLED直接取值
  if (self.status === FULFILLLED) {
    return promise2 = new Promise(function (resolve, reject) {
      setTimeout(() => {
        try {
          let x = onFULFILLLED(self.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });

    })
  }
  // 失败态，直接取值reject
  if (self.status === REJECTED) {
    return promise2 = new Promise(function (resolve, reject) {
      setTimeout(() => {
        try {
          let x = onRejected(self.reason);
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
    })
  }


  if (self.status === PENDING) { //等待态
    return promise2 = new Promise(function (resolve, reject) {
      self.onResolvedCallbacks.push(function (value) {
        try {
          let x = onFULFILLLED(value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
      self.onRejectedCallbacks.push(function (reason) {
        try {
          let x = onRejected(reason);
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
    });
  }
};

/**
 * [Promise.all Promise进行并行处理]
 * @param  {Array} promises promise对象组成的数组作为参数
 * @return {function} 返回一个Promise实例
 */
Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    // let done = gen(promises.lenght, resolve);
    let count = 0;
    let values = []; // 由于promise.all([]) 这里传递的是数组，所以这里保留空数组
    promises.forEach((promise, index) => {
      promise.then(value => { // 调用then表示当他们完成后会传递到这里来
        //done(value,index);
        values[index] = value;  // 保存所有完成的值
        if (++count === promises.length) { // 当所有都完成的时候再解决它们
          resolve(values);
        }
      }, reason => {
        reject(reason);
      })
    })
  });
};


/**
 * [Promise.race Promise比赛，完成则继续走后面的]
 * @param  {Array} promises promise对象组成的数组作为参数
 * @return {function} 返回一个Promise实例
 */
Promise.race = function (promises) {
  return new Promise((reslove, reject) => {
    promises.forEach((promise, index) => {
      // 只要有一个promise对象进入 FULFILLLED 或者 Rejected 状态的话，就会继续进行后面的处理(取决于哪一个更快)
      // 这里只是简单的传递，都给它们用then先绑定好成功或失败的函数，谁先成功或失败就会执行谁，这里就不用管了
      promise.then(reslove, reject);
    })
  });
}


// 用于promise方法链时 捕获前面onFULFILLLED/onRejected抛出的异常
Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
}

// 用promise包装下，等待自动调用
Promise.resolve = function (value) {
  return new Promise(resolve => {
    resolve(value);
  });
}

Promise.reject = function (reason) {
  return new Promise((resolve, reject) => {
    reject(reason);
  });
}

/**
 * 基于Promise实现Deferred的
 * Deferred和Promise的关系
 * - Deferred 拥有 Promise
 * - Deferred 具备对 Promise的状态进行操作的特权方法（resolve reject）
 *
 * 参考jQuery.Deferred
 * url: http://api.jquery.com/category/deferred-object/
 */
Promise.deferred = function () { // 延迟对象
  let defer = {};
  defer.promise = new Promise((resolve, reject) => {
    defer.resolve = resolve;
    defer.reject = reject;
  });
  return defer;
}

try {
  module.exports = Promise
} catch (e) {
}
