let objects = [
    { name: 'Василий', surname: 'Васильев' },
    { name: 'Иван', surname: 'Иванов' },
    { name: 'Пётр', surname: 'Петров' }
    ]

function find_obj(objects, param, value) {
    let result = [];
    for (obj of objects) {
        if (obj[param] == value) {
            result.push(obj);
        }
    }
    return result;
}

let result = find_obj(objects, 'name', 'Иван');
console.log(result)

export default find_obj