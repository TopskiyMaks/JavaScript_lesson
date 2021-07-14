let timer_input = document.getElementById("input-timer");
let timer_button = document.querySelector(".btn-start-timer");
let timer_box = document.querySelector(".timer");
var timer;

function start_timer (time_duration) {
    if (timer){
        stop_timer(timer)
    }
    if (time_duration < 0) {
        stop_timer(timer)
    }
    else {
        timer_box.innerHTML = time_duration;
        --time_duration
        timer = setInterval( () => start_timer(time_duration), 1000);
    }
}

function stop_timer (timer) {
    clearInterval(timer)
    timer=null;
}

timer_button.addEventListener('click', () => start_timer(parseInt(timer_input.value)))
