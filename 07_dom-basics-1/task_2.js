let text_box = document.querySelector(".text");
let input_text = document.getElementById("input-text");
var input;

function input_in_text_box () {
    if (input){
        stop_timeout(input)
    }
    input = setTimeout( () => text_box.innerHTML = input_text.value, 300);
}

function stop_timeout(input) {
    clearTimeout(input)
    return input=null;
}

input_text.addEventListener("change", input_in_text_box)
