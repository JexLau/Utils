/*
 * @Description: 
 * @Author: Jex
 * @Date: 2020-08-31 17:44:14
 * @Last modefied by: Jex
 * @LastEditTime: 2020-08-31 18:15:19
 */
// 引用类型 array 浅拷贝
let arrA = [1, 2, 3, 4, 5];
let arrB = arrA;
arrB.push(6);
console.log(arrA); // [1, 2, 3, 4, 5, 6]  arrA也发生了变化

// 引用类型 object 浅拷贝
let objA = { name: "zhangsan", age: 30, course: { chinese: 100 } };
let objB = objA;
objB.name = "lisi";
objB.course.chinese = 89;
console.log(JSON.stringify(objA)); // {"name":"lisi","age":30,"course":{"chinese":89}} objA发生了变化
console.log("拷贝前后地址是否一致：", objA === objB); // {"name":"lisi","age":30,"course":{"chinese":89}} objA发生了变化
