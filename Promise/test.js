/*
 * @Description: 
 * @Author: Jex
 * @Date: 2020-08-31 15:15:01
 * @Last modefied by: Jex
 * @LastEditTime: 2020-08-31 15:29:59
 */
const Promise = require("./promise")
const p1 = new Promise(function (reslove, reject) {
  setTimeout(function () {
    let num = Math.random();
    console.log(num);
    if (num > 0.5) {
      reslove("成功");
    } else {
      reject("失败")
    }
  }, 1000)
});

p1.then(function (data) {
  console.log("1 resovle", data)
  return data;
}, function (error) {
  console.log("1 reject", error)
}).then(function (data) {
  console.log("2 resolve", data)
}, function (error) {
  console.log("2 reject", error)
})