let n = -100;
let m = 100;
let count = 10;
numbers = [];

let range = Math.abs(m-n)
let min = Math.min(m, n)

for (let i = 1; i<=count; ++i) {
    numbers.push(Math.round(Math.random()*range) + min);
}
console.log(numbers)