let str = 'Привет, мир!';
let revers = '';
for (i = str.length - 1; i >= 0; i--) {
    revers += str[i];
}
console.log(revers);