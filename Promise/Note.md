<!--
 * @Description: 
 * @Author: Jex
 * @Date: 2020-08-31 14:59:27
 * @Last modefied by: Jex
 * @LastEditTime: 2020-08-31 15:14:34
-->

## Promise/A+规范

[官方文档](https://promisesaplus.com/)

Promise 有三种状态: `pending` `fullfiiled` `rejected`三种状态。通俗理解就是等待，完成和失败，等待只能转换为完成或者失败

Promise 返回的对象要有 then 方法，所以我们在promise的原型上面增加then方法，里面传入两个函数，在成功调用resolve会被执行前者，失败调用reject执行后者 promise.then(onFulfilled, onRejected)


## Promise 是什么

Promise 是改善 JavaScript 回调地狱的一种代码结构

## 实现的基本原理

利用函数当作参数传递和委托调用来简化回调方式为链式调用方式



