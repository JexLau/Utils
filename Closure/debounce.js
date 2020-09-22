/*
 * @Description: 函数防抖(debounce)，在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
 * @Author: Jex
 * @Date: 2020-09-09 08:17:36
 * @Last modefied by: Jex
 * @LastEditTime: 2020-09-09 08:19:52
 */
//模拟一段ajax请求
function ajax(content) {
  console.log('ajax request ' + content)
}

function debounce(fun, delay) {
  return function (args) {
    let that = this
    let _args = args
    clearTimeout(fun.id)
    fun.id = setTimeout(function () {
      fun.call(that, _args)
    }, delay)
  }
}

let inputb = document.getElementById('debounce')

let debounceAjax = debounce(ajax, 500)

inputb.addEventListener('keyup', function (e) {
  debounceAjax(e.target.value)
})
