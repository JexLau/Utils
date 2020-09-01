/*
 * @Description: 
 * @Author: Jex
 * @Date: 2020-08-31 17:44:23
 * @Last modefied by: Jex
 * @LastEditTime: 2020-08-31 22:47:49
 */

// 值类型拷贝都是深拷贝（number, string, boolean, null, undefined, symbol)
let a = "hello";
let b = a;
b = "world";
// console.log(a); // hello

// 深拷贝-单个层级
// 单个层级的对象/数组，使用 ES6 语法块 { ...x} 或者 Object.assign() 即可实现深拷贝。但对于嵌套对象/数组，使用这两个方法就无效了
{
  let objA = { name: "zhangsan", age: 30, course: { chinese: 100 } };
  let objB = { ...objA };
  objB.name = "lisi";
  objB.course.chinese = 89;
  // console.log(objA);  // {"name":"zhangsan","age":30,"course":{"chinese":89}}
}


// 深拷贝-嵌套对象/多维数组
// 比较暴力的深拷贝方法是使用 JSON.parse(JSON.stringify(objA))
{
  let objA = { name: "zhangsan", age: 30, course: { chinese: 100 } };
  let objB = JSON.parse(JSON.stringify(objA));
  objB.name = "lisi";
  objB.course.chinese = 89;
  // console.log(objA); // { name: "zhangsan", age: 30, course: { chinese: 100 } }
}

// 手写实现深拷贝
// 主要思路是利用递归
function deepClone(targetObj) {
  let type = Object.prototype.toString.call(targetObj);
  let newObj;
  if (type === "[object Object]") {
    newObj = {};
  } else if (type === "[object Array]") {
    newObj = [];
  } else {
    return targetObj;
  }
  for (key in targetObj) {
    let value = targetObj[key];
    newObj[key] = deepClone(value);
  }
  console.log("newObj:", newObj);
  return newObj;
}

let objC = { name: "zhangsan", age: 30, course: { chinese: [100, 90] } };
let objD = deepClone(objC);
objD.name = "lisi";
objD.course.chinese = 89;
console.log(objC);
