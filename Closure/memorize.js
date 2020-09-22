/*
 * @Description: 该方法适合缓存结果不易改变的函数
 * @Author: Jex
 * @Date: 2020-09-09 08:21:57
 * @Last modefied by: Jex
 * @LastEditTime: 2020-09-09 08:22:12
 */

const memorize = fn => {
  let memorized = false;
  let result = undefined;
  return (...args) => {
    if (memorized) {
      return result;
    } else {
      result = fn.apply(null, args);
      memorized = true;
      fn = undefined;
      return result;
    }
  };
};
