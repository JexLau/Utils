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

// ================================== Example ====================================
var arr = [
  {
    a: 1,
    b: 2
  },
  {
    a: 2,
    b: 4,
    Id: "sssssssss"
  },
  {
    a: 3,
    b: 4,
    Id: "sssssssss"
  },
  {
    a: 4,
    b: 4,
    Id: "bbbbbbbbbbb"
  },
  {
    a: 5,
    b: 5
  },
  {
    a: 6,
    b: 4,
    Id: "sssssssss"
  }
];

var test = groupBy(arr, (item) => {
  return [item.Id];
});

console.log(test);
/*
[
  [ { a: 1, b: 2 }, { a: 5, b: 5 } ],
  [
    { a: 2, b: 4, Id: 'sssssssss' },
    { a: 3, b: 4, Id: 'sssssssss' },
    { a: 6, b: 4, Id: 'sssssssss' }
  ],
  [ { a: 4, b: 4, Id: 'bbbbbbbbbbb' } ]
]
*/
