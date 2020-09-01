/*
 * @Description: 
 * @Author: Jex
 * @Date: 2020-08-31 15:13:11
 * @Last modefied by: Jex
 * @LastEditTime: 2020-08-31 15:13:47
 */
const EventEmitter = require("./event-emitter");
let emit = new EventEmitter();
let workday = 0;
emit.on("work", function () {
  workday++;
  console.log("work everyday：", workday);
});

emit.once("love", function () {
  console.log("just love you once");
});

function makeMoney() {
  console.log("make $1000");
}
emit.on("money", makeMoney);

let time = setInterval(() => {
  emit.emit("work");
  emit.emit("money");
  if (workday === 5) {
    emit.removeListener("money", makeMoney);
    emit.on("work", function () {
      console.log("work for 8 hours:", workday);
    });
  }
  if (workday === 6) {
    emit.emit("work");
    emit.emit("love");
    clearInterval(time);
  }
}, 1000);
