function check_valid(full_list, black_list) {
    valid_list = [];
    for (element of full_list) {
        if (!black_list.includes(element)){
            console.log('xui33')
            valid_list.push(element);
        }
        else {
            console.log('xui')
        }
    }
    return valid_list
}

// full_list = ['j@mail.ru','j@gmail.com','j34@mail.de','j123@gmail.ru','j21@mail.ru']
// black_list = ['j@mail.ru']
// console.log(check_valid(full_list, black_list))
export default check_valid;