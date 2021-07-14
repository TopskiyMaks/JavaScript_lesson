roadMines = [false, false, false, false, false, true, true, true, true, true];
healths = 1;
let step = 0;
let allSteps = [];
do {
    if (roadMines[step] === true) {
        healths -= 1;
        console.log(`Танк переместился на ${allSteps}`);
        console.log(`Танк поврежден`);
        if (healths === 0) {
            allSteps = [];
            allSteps.push(step + 1);
            console.log(`Танк переместился на ${allSteps}`);
            break;
        }
    }
    else {
        allSteps.push(step + 1);
    }
    step += 1;
} while (healths > 0);
console.log('Танк уничтожен');
