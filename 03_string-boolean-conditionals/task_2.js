let name = 'maKsIM';
let surname = 'aMIrOv';
let first_letter = name.substr(0, 1);
let correct_name = first_letter.toUpperCase() + name.substr(1).toLowerCase();
first_letter = surname.substr(0, 1);
let correct_surname = first_letter.toUpperCase() + surname.substr(1).toLowerCase();
console.log(correct_name, correct_surname);