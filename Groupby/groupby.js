/*
 * @Description: 
 * @Author: Jex
 * @Date: 2020-08-17 15:19:16
 * @Last modefied by: Jex
 * @LastEditTime: 2020-08-31 14:27:02
 */

// ================================== Function ====================================
const groupBy = function(array, f) {
  const groups = {};
  array.forEach((o) => {
    const group = JSON.stringify(f(o));
    groups[group] = groups[group] || [];
    groups[group].push(o);
  });
  return Object.keys(groups).map(function(group) {
    return groups[group];
  });
}
