// task-1
let x1 = 10;
let y1 = 5;
let x2 = 2;
let y2 = 3;
let a = x2 - x1;
let b = y2 - y1;
let s = a*b;
console.log(s);

// task-2
a = 13.123456789;
b = 2.123;
let n = 5;
let c = Math.floor(a % 1 * Math.pow(10,n));
let d = Math.round(b % 1 * Math.pow(10,n));
console.log("Первое число:",c,
"\nВторое число:", d);
console.log(c>d, c>=d, c<d, c<=d, c===d, c!==d);

// task-3
n = -100
let m = 100
let range = Math.abs(m-n)
let min = Math.min(m, n)
let rnd_number = Math.round(Math.random()*range) + min
let result = rnd_number % 2 + rnd_number - 1
console.log(result)