/*
 * @Description: 柯里化函数
 * @Author: Jex
 * @Date: 2020-09-09 08:15:53
 * @Last modefied by: Jex
 * @LastEditTime: 2020-09-09 08:20:12
 */
function currying(fn) {
  var allArgs = [];

  function bindCurry() {
    var args = [].slice.call(arguments);
    allArgs = allArgs.concat(args);
    return bindCurry;
  }
  bindCurry.toString = function () {
    return fn.apply(null, allArgs);
  };

  return bindCurry;
}
