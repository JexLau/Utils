/*
 * @Description: 跨浏览器的事件处理程序
 * @Author: Jex
 * @Date: 2020-09-08 20:23:00
 * @Last modefied by: Jex
 * @LastEditTime: 2020-09-08 20:47:44
 */
const EventHandler = {
  // element是当前元素，可以通过getElementById(id)获取
  // type 是事件类型，一般是click ,也有可能是鼠标、焦点、滚轮事件等等
  // handle 事件处理函数
  addHandler: (element, type, handler) => {
    // 先检测是否存在DOM2级方法,再检测IE的方法，最后是DOM0级方法（一般不会到这）
    if (element.addEventListener) {
      // 第三个参数false表示冒泡阶段
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent(`on${type}`, handler)
    } else {
      element[`on${type}`] = handler;
    }
  },

  removeHandler: (element, type, handler) => {
    if (element.removeEventListener) {
      // 第三个参数false表示冒泡阶段
      element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent(`on${type}`, handler)
    } else {
      element[`on${type}`] = null;
    }
  },


  getEvent: function (e) {
    return e ? e : window.event;
  },

  getTarget: function (e) {
    return e.target ? e.target : e.srcElement;
  },

  preventDefault: function (e) {
    if (e.preventDefault) {
      e.preventDefault();
    } else {
      e.returnValue = false;
    }
  },
  
  stopPropagation: function (e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    } else {
      e.cancelBubble = true;
    }
  }
}
