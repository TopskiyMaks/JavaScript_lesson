(function() {
    function createCard(index) {
        let block = document.createElement('div');
        block.className = 'card';
        block.id = `card_${index}`;
        let numb = document.createElement('h3');
        numb.className = 'number_card';
        block.append(numb);
        return {
            block,
            numb,
        };
    }

    function createNumList(count) {
        let numbers = [];
        for (let i = 1; i < count; ++i) {
            if (i > count / 2) {
                numbers.push(count-i)
            }
            else if (i === count / 2) {
                numbers.push(i)
                numbers.push(i)
            }
            else {
                numbers.push(i)
            }
        }
        numbers = shuffle(numbers)
        return numbers   
    }

    function createGame(container, count) {
        check_time()
        numbers = createNumList(count)
        for (let i = 0; i < count; ++i) {
            const card = createCard(i);
            container.append(card.block);
            card.block.addEventListener('click', function() {
                if (card.block.className != 'open_card'){
                    if (document.getElementsByClassName('check_card').length != 2){
                        flipCard(card, numbers[i]);
                        card.block.classList.toggle('check_card');
                        check_pair(card, numbers[i])
                    }
                }
            });
        }


    }

    function create_Button(container) {
        let reset_butt = document.createElement('button');
        reset_butt.className = 'reset_button';
        reset_butt.innerText = 'Начать заного';
        container.append(reset_butt);
        reset_butt.addEventListener('click', function() {
            location.reload();
        });
    }
    function check_time() {
        let items = JSON.parse(localStorage.getItem('Game_Time'))
        if (items == null) {
            items = [new Date().getTime()];
        }
        else {
            items.push(new Date().getTime());
        }
        let serialObj = JSON.stringify(items);
        localStorage.setItem('Game_Time', serialObj);
        if (items.length === 2) {
            setTimeout(() => alert(`Поздравляем, вы победили: ${(Math.round((items[1] - items[0])/1000))} секунд`), 1000);
        }
    }

    async function check_pair(card, number) {
        let items = JSON.parse(localStorage.getItem('Game'))
        if (items == null) {
            items = [{'card': card.block.id, 'number': number}];
        }
        else{
            items.push({'card': card.block.id, 'number': number});
        }
        let serialObj = JSON.stringify(items);
        localStorage.setItem('Game', serialObj);

        if (items.length === 2) {
            let card_1 = items[0];
            let card_2 = items[1];
            if (card_1.number != card_2.number) {
                await sleep(1000)
                flipFailCard(card_1.card);
                flipFailCard(card_2.card);
            }
            card_1 = document.getElementById(card_1.card);
            card_2 = document.getElementById(card_2.card);
            card_1.classList.toggle('check_card');
            card_2.classList.toggle('check_card');
            delete localStorage.Game;
        }
        if (document.getElementsByClassName('open_card').length == 16) {
            check_time()
        }
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
      
    function flipCard(card, number) {
        card.numb.innerHTML = number;
        card.block.classList.toggle('open_card');
        sleep(1000)
    }

    function flipFailCard(card_id) {
        card = document.getElementById(card_id);
        card.classList.toggle('open_card');
        card.getElementsByClassName('number_card')[0].innerHTML = '';
    }

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    window.createGame = createGame;
    window.create_Button = create_Button;

})();