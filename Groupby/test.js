/*
 * @Description: 
 * @Author: Jex
 * @Date: 2020-08-31 15:14:00
 * @Last modefied by: Jex
 * @LastEditTime: 2020-08-31 15:14:17
 */
const arr = [
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

const test = groupBy(arr, (item) => {
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