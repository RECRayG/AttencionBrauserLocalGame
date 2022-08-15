var global = document.getElementById('count').value; // Глобальная переменная для записи предыдущего значения select
var chain = []; // Массив для проверки правильности кликов
var time = []; // Массив для отображения убывания таймера
let timerId; // Переменная для хранения таймера 1
let timerId2; // Переменная для хранения таймера 2

// Инициализация скрипта
function initialization() {
    //var ch = document.getElementById('count').value; // Переменная для записи текущего значения select
    document.getElementById('stop').disabled = true; // Нажать на остановку игры нельзя
    document.getElementById('count').disabled = false;
    document.querySelector('#board').addEventListener('click', mouseEvent, false); // Слушатель клика мыши по таблице
    document.querySelector('#count').addEventListener('mousedown', saveCountEvent, false); // Слушатель клика мыши по select
    document.querySelector('#count').addEventListener('change', countEvent, false); // Слушатель изменения значения в select
    document.getElementById('new').onclick = newGame; // Привязка клика по кнопке к функции
    document.getElementById('stop').onclick = stopGame; // Привязка клика по кнопке к функции
}

// Генерация классов координат xNyN
function getXY(i,cnt) {
    return 'x' + (((i - 1) % cnt) + 1) + 'y' + Math.ceil((i) / cnt);
}

// Генерация N блоков в зависимости от уровня сложности
function create(cnt) {
    for (var i = 1; i <= Number(document.getElementById('count').value); i++) {
        $('#board').append('<div id = "' + i + '" class="block block- ' + i + ' ' + getXY(i,cnt) + '">' + i + '</div>');
    }
}

// Обработка нажатия мыши внутри таблицы
function mouseEvent(e) {
    // Вызвать функцию перекраски числа и проверки на правильность
    var el = document.querySelector('.active');
    if (!chain[0]) {
        if (Number(e.target.innerText) == 1) {
            chain.push(e.target.innerText);
            e.target.classList.add('active');
            return;
        }
        else
            {
                chain.length = 0;
                time.length = 0;
                timerOut(0); // Сообщение о проигрыше и таймер стоп
                return;
            }
    }

    chain.push(e.target.innerText);
    var i = 1;
    while (i < chain.length)
    {
        if (i >= chain.length) break;

        if (Number(chain[i - 1]) + 1 == Number(chain[i]))
            i++;
        else {
            chain.length = 0;
            time.length = 0;
            timerOut(0); // Сообщение о проигрыше и таймер стоп
            return;
        }
            
    }

    e.target.classList.add('active');
    checkWin();
}

// Обработка выбора уровня сложности
function countEvent() {
    var tmp = Number(document.getElementById('count').value);

    if (document.getElementById('stop').disabled) // Если кнопка остановки игры отключена
    {
        switch (tmp) // Размер таблицы
        {
            case 9:
                document.getElementById('board').style.margin = 120 + "px " + 0 + "px " + 0 + "px " + 500 + "px";
                document.getElementById('board').style.width = 207 + "px";
                document.getElementById('board').style.height = 207 + "px";
                break;
            case 16:
                document.getElementById('board').style.margin = 86 + "px " + 0 + "px " + 0 + "px " + 464 + "px";
                document.getElementById('board').style.width = 277 + "px";
                document.getElementById('board').style.height = 277 + "px";
                break;
            case 25:
                document.getElementById('board').style.margin = 52 + "px " + 0 + "px " + 0 + "px " + 432 + "px";
                document.getElementById('board').style.width = 347 + "px";
                document.getElementById('board').style.height = 347 + "px";
                break;
            case 36:
                document.getElementById('board').style.margin = 18 + "px " + 0 + "px " + 0 + "px " + 398 + "px";
                document.getElementById('board').style.width = 417 + "px";
                document.getElementById('board').style.height = 417 + "px";
                break;
            case 49:
                document.getElementById('board').style.margin = -16 + "px " + 0 + "px " + 0 + "px " + 364 + "px";
                document.getElementById('board').style.width = 487 + "px";
                document.getElementById('board').style.height = 487 + "px";
                break;
        }
    }
}

// Остановка игры
function stopGame() {
    clearTimeout(timerId); // Отмена таймера 1
    clearTimeout(timerId2); // Отмена таймера 2
    timerHide();
    document.getElementById('stop').disabled = true;

    var tmp = document.getElementById('count').value;

    switch (tmp) {
        case '9':
            for (var a = 1; a <= 9; a++) {
                document.getElementById(String(a)).remove();
            }
            break;
        case '16':
            for (var a = 1; a <= 16; a++) {
                document.getElementById(String(a)).remove();
            }
            break;
        case '25':
            for (var a = 1; a <= 25; a++) {
                document.getElementById(String(a)).remove();
            }
            break;
        case '36':
            for (var a = 1; a <= 36; a++) {
                document.getElementById(String(a)).remove();
            }
            break;
        case '49':
            for (var a = 1; a <= 49; a++) {
                document.getElementById(String(a)).remove();
            }
            break;
    }

    document.getElementById('new').disabled = false;
    document.getElementById('count').disabled = false;
}

// Записать в глобальную переменную возможно старое значение select
function saveCountEvent() {
    global = document.getElementById('count').value;
}

function timerOn(hard) {
    switch (hard)
    {
        case 9:
            for (var i = 0; i <= 0; i++) {
                for (var j = 0; j < 6; j++) {
                    if (j >= 0 && j < 10) time.push(i + ":0" + j);
                    else time.push(i + ":" + j);
                }
            }
            timerId = setTimeout(timerOut, 5000); // Иллюстрация setTimeout отличается от setInterval тем что вызвается единожды
            break;
        case 16:
            for (var i = 0; i <= 0; i++) {
                for (var j = 0; j < 16; j++) {
                    if (j >= 0 && j < 10) time.push(i + ":0" + j);
                    else time.push(i + ":" + j);
                }
            }
            timerId = setTimeout(timerOut, 15000); // Иллюстрация setTimeout отличается от setInterval тем что вызвается единожды
            break;
        case 25:
            for (var i = 0; i <= 0; i++) {
                for (var j = 0; j < 35; j++) {
                    if (j >= 0 && j < 10) time.push(i + ":0" + j);
                    else time.push(i + ":" + j);
                }
            }
            timerId = setTimeout(timerOut, 34000); // Иллюстрация setTimeout отличается от setInterval тем что вызвается единожды
            break;
        case 36:
            for (var i = 0; i <= 1; i++) {
                for (var j = 0; j <= 59; j++) {
                    if (i == 1) {
                        time.push("01:00");
                        break;
                    }
                    if (j >= 0 && j < 10) time.push(i + ":0" + j);
                    else time.push(i + ":" + j);
                }
            }
            timerId = setTimeout(timerOut, 60000); // Иллюстрация setTimeout отличается от setInterval тем что вызвается единожды
            break;
        case 49:
            for (var i = 0; i <= 2; i++) {
                for (var j = 0; j <= 59; j++) {
                    if (i == 1 || i == 0) {
                        if (j >= 0 && j < 10) time.push(i + ":0" + j);
                        else time.push(i + ":" + j);
                    } else {
                        time.push("02:00");
                        break;
                    }
                }
            }
            timerId = setTimeout(timerOut, 120000); // Иллюстрация setTimeout отличается от setInterval тем что вызвается единожды
            break;
    }
}

function timerOut(i) {
    chain.length = 0;
    time.length = 0;
    stopGame();
    if (i == 1) return;
    else {
        $('.block').removeClass('active');
        alert('You lose!');
    }
}

function timerAppend() {
    $('.timer').css('color', '#000000');
    $('.timerText').css('color', '#000000');
    timerChange();
}

function timerChange() {
    document.querySelector('.timerText').textContent = time[time.length - 1];
    if (!time[0]) clearTimeout(timerId2); // Отмена таймера 2
    else time.pop();
    timerId2 = setTimeout(timerChange, 1000);
}

function timerHide() {
    $('.timer').css('color', '#DBDBDB');
    $('.timerText').css('color', '#DBDBDB');
}

// Перемешивание чисел up/bottom/left/right
function rand(type)
{
    var _a = Math.sqrt(Number(document.getElementById('count').value));
    var _b = Math.sqrt(Number(document.getElementById('count').value));

    if (getRandomInt(0, 10) > 5) {
        for (var a = 1; a <= _a; a++)
            for (var b = 1; b <= _b; b++) {
                switch (type) {
                    case 'up':
                        var from = 'x' + a + 'y' + (b + 1);
                        var to = 'x' + a + 'y' + b;
                        if ($('.' + to).length && $('.' + from).length) {
                            var test1 = document.querySelector('.' + to).getBoundingClientRect().top;
                            var test2 = document.querySelector('.' + to).getBoundingClientRect().left;
                            var test3 = document.querySelector('.' + from).getBoundingClientRect().top;
                            var test4 = document.querySelector('.' + from).getBoundingClientRect().left;

                            $('.' + from).offset({ top: test1, left: test2 });
                            $('.' + to).offset({ top: test3, left: test4 });

                            $('.' + to).css('color', '#' + getRandomColorId() + getRandomColorId() +
                                getRandomColorId() + getRandomColorId() + getRandomColorId() + getRandomColorId());
                            $('.' + to).css('font-size', getRandomInt(20,48) + 'px');

                            $('.' + from).css('color', '#' + getRandomColorId() + getRandomColorId() +
                                getRandomColorId() + getRandomColorId() + getRandomColorId() + getRandomColorId());
                            $('.' + from).css('font-size', getRandomInt(20, 48) + 'px');
                        }
                        break;
                    case 'bottom':
                        var from = 'x' + a + 'y' + (_a - 1 - b);
                        var to = 'x' + a + 'y' + (_a - b);
                        if ($('.' + to).length && $('.' + from).length) {
                            var test1 = document.querySelector('.' + to).getBoundingClientRect().top;
                            var test2 = document.querySelector('.' + to).getBoundingClientRect().left;
                            var test3 = document.querySelector('.' + from).getBoundingClientRect().top;
                            var test4 = document.querySelector('.' + from).getBoundingClientRect().left;

                            $('.' + from).offset({ top: test1, left: test2 });
                            $('.' + to).offset({ top: test3, left: test4 });

                            $('.' + to).css('color', '#' + getRandomColorId() + getRandomColorId() +
                                getRandomColorId() + getRandomColorId() + getRandomColorId() + getRandomColorId());
                            $('.' + to).css('font-size', getRandomInt(20, 48) + 'px');

                            $('.' + from).css('color', '#' + getRandomColorId() + getRandomColorId() +
                                getRandomColorId() + getRandomColorId() + getRandomColorId() + getRandomColorId());
                            $('.' + from).css('font-size', getRandomInt(20, 48) + 'px');
                        }
                        break;
                    case 'left':
                        var from = 'x' + (b + 1) + 'y' + a;
                        var to = 'x' + b + 'y' + a;
                        if ($('.' + to).length && $('.' + from).length) {
                            var test1 = document.querySelector('.' + to).getBoundingClientRect().top;
                            var test2 = document.querySelector('.' + to).getBoundingClientRect().left;
                            var test3 = document.querySelector('.' + from).getBoundingClientRect().top;
                            var test4 = document.querySelector('.' + from).getBoundingClientRect().left;

                            $('.' + from).offset({ top: test1, left: test2 });
                            $('.' + to).offset({ top: test3, left: test4 });

                            $('.' + to).css('color', '#' + getRandomColorId() + getRandomColorId() +
                                getRandomColorId() + getRandomColorId() + getRandomColorId() + getRandomColorId());
                            $('.' + to).css('font-size', getRandomInt(20, 48) + 'px');

                            $('.' + from).css('color', '#' + getRandomColorId() + getRandomColorId() +
                                getRandomColorId() + getRandomColorId() + getRandomColorId() + getRandomColorId());
                            $('.' + from).css('font-size', getRandomInt(20, 48) + 'px');
                        }
                        break;
                    case 'right':
                        var from = 'x' + (_b - 1 - b) + 'y' + a;
                        var to = 'x' + (_b - b) + 'y' + a;
                        if ($('.' + to).length && $('.' + from).length) {
                            var test1 = document.querySelector('.' + to).getBoundingClientRect().top;
                            var test2 = document.querySelector('.' + to).getBoundingClientRect().left;
                            var test3 = document.querySelector('.' + from).getBoundingClientRect().top;
                            var test4 = document.querySelector('.' + from).getBoundingClientRect().left;

                            $('.' + from).offset({ top: test1, left: test2 });
                            $('.' + to).offset({ top: test3, left: test4 });

                            $('.' + to).css('color', '#' + getRandomColorId() + getRandomColorId() +
                                getRandomColorId() + getRandomColorId() + getRandomColorId() + getRandomColorId());
                            $('.' + to).css('font-size', getRandomInt(20, 48) + 'px');

                            $('.' + from).css('color', '#' + getRandomColorId() + getRandomColorId() +
                                getRandomColorId() + getRandomColorId() + getRandomColorId() + getRandomColorId());
                            $('.' + from).css('font-size', getRandomInt(20, 48) + 'px');
                        }
                        break;
                }
            }
    }
    else {
        for (var a = 1; a <= _a - a; a++)
            for (var b = 1; b <= _b; b++) {
                switch (type) {
                    case 'up':
                        var from = 'x' + a + 'y' + (b + 1);
                        var to = 'x' + a + 'y' + b;
                        if ($('.' + to).length && $('.' + from).length) {
                            var test1 = document.querySelector('.' + to).getBoundingClientRect().top;
                            var test2 = document.querySelector('.' + to).getBoundingClientRect().left;
                            var test3 = document.querySelector('.' + from).getBoundingClientRect().top;
                            var test4 = document.querySelector('.' + from).getBoundingClientRect().left;

                            $('.' + from).offset({ top: test1, left: test2 });
                            $('.' + to).offset({ top: test3, left: test4 });
                        }
                        break;
                    case 'bottom':
                        var from = 'x' + a + 'y' + (_a - 1 - b);
                        var to = 'x' + a + 'y' + (_a - b);
                        if ($('.' + to).length && $('.' + from).length) {
                            var test1 = document.querySelector('.' + to).getBoundingClientRect().top;
                            var test2 = document.querySelector('.' + to).getBoundingClientRect().left;
                            var test3 = document.querySelector('.' + from).getBoundingClientRect().top;
                            var test4 = document.querySelector('.' + from).getBoundingClientRect().left;

                            $('.' + from).offset({ top: test1, left: test2 });
                            $('.' + to).offset({ top: test3, left: test4 });
                        }
                        break;
                    case 'left':
                        var from = 'x' + (b + 1) + 'y' + a;
                        var to = 'x' + b + 'y' + a;
                        if ($('.' + to).length && $('.' + from).length) {
                            var test1 = document.querySelector('.' + to).getBoundingClientRect().top;
                            var test2 = document.querySelector('.' + to).getBoundingClientRect().left;
                            var test3 = document.querySelector('.' + from).getBoundingClientRect().top;
                            var test4 = document.querySelector('.' + from).getBoundingClientRect().left;

                            $('.' + from).offset({ top: test1, left: test2 });
                            $('.' + to).offset({ top: test3, left: test4 });
                        }
                        break;
                    case 'right':
                        var from = 'x' + (_b - 1 - b) + 'y' + a;
                        var to = 'x' + (_b - b) + 'y' + a;
                        if ($('.' + to).length && $('.' + from).length) {
                            var test1 = document.querySelector('.' + to).getBoundingClientRect().top;
                            var test2 = document.querySelector('.' + to).getBoundingClientRect().left;
                            var test3 = document.querySelector('.' + from).getBoundingClientRect().top;
                            var test4 = document.querySelector('.' + from).getBoundingClientRect().left;

                            $('.' + from).offset({ top: test1, left: test2 });
                            $('.' + to).offset({ top: test3, left: test4 });
                        }
                        break;
                }
            }
    }
}

// Генерация случайного числа от min до max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColorId() {
    var rand = Math.floor(Math.random() * (15 + 1));
    switch (rand)
    {
        case 0:
            return '0';
            break;
        case 1:
            return '1';
            break;
        case 2:
            return '2';
            break;
        case 3:
            return '3';
            break;
        case 4:
            return '4';
            break;
        case 5:
            return '5';
            break;
        case 6:
            return '6';
            break;
        case 7:
            return '7';
            break;
        case 8:
            return '8';
            break;
        case 9:
            return '9';
            break;
        case 10:
            return 'A';
            break;
        case 11:
            return 'B';
            break;
        case 12:
            return 'C';
            break;
        case 13:
            return 'D';
            break;
        case 14:
            return 'E';
            break;
        case 15:
            return 'F';
            break;
    }
}

// Псведослучайное расположение блоков в таблице в начале игры
function newGame() {
    chain.length = 0;
    time.length = 0;
    document.getElementById('new').disabled = true;
    document.getElementById('count').disabled = true;

    create( Math.sqrt(Number(document.getElementById('count').value)) ); // Создать игровое поле

    for (var a = 1; a <= 50; a++) {
        switch (getRandomInt(1, 4)) {
            case 1:
                rand('up');
                break;
            case 2:
                rand('bottom');
                break;
            case 3:
                rand('left');
                break;
            case 4:
                rand('right');
                break;
        }
    }

    $('.block').removeClass('active');
    document.getElementById('stop').disabled = false;
    timerOn(Number(document.getElementById('count').value)); // Запустить таймер в зависимости от сложности
    timerAppend();
}

// Проверка, что подряд нажато на N элементов
function checkWin() {
    if (chain.length == Number(document.getElementById('count').value)) {
        chain.length = 0;
        time.length = 0;
        timerOut(1); // Сообщение о проигрыше и таймер стоп
        alert('You win!');
    }
}

// Инициализируем
initialization(); 
let element = document.getElementById('board');
console.log(element.innerHTML);
console.log(element.innerText);