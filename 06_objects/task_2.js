let arr1 = [
    {
       value: "One",
       label: 'One',
    },
    {
        value:"Two",
        label:"Two",
    },
    {
        value:"Three",
        label:"Three",
    }
]

arr_2 = [1,2,3,4,5]

function convert_array(arr) {
    let new_arr = [] 
    arr.forEach(item => {
        new_arr.push({
            value: item,
            label: item, 
        })
    });
    return new_arr;
}

function createSelect(arr, value) {
    let result = document.createElement('select');
    let valueExists = false;
    arr.forEach(item => {
     let option = document.createElement('option');
     option.value = item.value;
     if (option.value === value) {
      valueExists = true;
      option.selected = true;
     }
     option.text = item.label;
     result.appendChild(option);
    });
    if (!valueExists) result.firstChild.selected = true;
   return result;
}

document.body.appendChild(createSelect(arr1, "Two"));
document.body.appendChild(createSelect(arr1, "Three"));
document.body.appendChild(createSelect(arr1));
arr_2 = convert_array(arr_2)
document.body.appendChild(createSelect(arr_2));