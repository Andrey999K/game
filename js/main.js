document.addEventListener("DOMContentLoaded", () => {

    const countdown = document.querySelector(".countdown");
    const input = document.querySelector(".input");
    let health_ = document.querySelector(".health");
    let score = document.querySelector(".score span");
    let score_ = 0;

    let i = 0;

    let request = new XMLHttpRequest();
    request.open('GET', 'words.json');
    let words;
    request.onreadystatechange = function () {
        if ((request.readyState === 4) &&
            (request.status = 200)) {
            words = request.response;
            words = JSON.parse(words);
        }
    }
    request.send();

    let word;
    let word_window = {};
    let prev = -1;
    let timerId;

    const rows = document.querySelectorAll(".row");

    const button = document.querySelector(".button");
    button.addEventListener("click", item => {
        health = 10;
        countdown.style.display = "block";
        countdown.textContent = 3;
        countdown.classList.add("countdown_start");
        setTimeout(() => {
            countdown.classList.remove("countdown_start");
        }, 950);
        setTimeout(() => {
            countdown.textContent = 2;
            countdown.classList.add("countdown_start");
        }, 1000);
        setTimeout(() => {
            countdown.classList.remove("countdown_start");
        }, 1950);
        setTimeout(() => {
            countdown.textContent = 1;
            countdown.classList.remove("countdown_start");
            countdown.classList.add("countdown_start");
        }, 2000);
        setTimeout(() => {
            countdown.classList.remove("countdown_start");
        }, 2950);
        setTimeout(() => {
            countdown.textContent = "GO";
            countdown.classList.remove("countdown_start");
            countdown.classList.add("countdown_start");
            timerId = setInterval(createWord, 1000);
        }, 3000);
        setTimeout(() => {
            countdown.classList.remove("countdown_start");
        }, 3950);
        setTimeout(() => {
            countdown.style.display = "";
            countdown.textContent = "";
            input.focus();
        }, 4000);
        for (let i = 0; i < 10; i++) {
            let heart = document.createElement("img");
            heart.src = "img/heart.svg";
            heart.width = 40;
            heart.height = 40;
            heart.className = "heart";
            health_.insertAdjacentElement("beforeend", heart);
            console.log(health_);
            score.innerHTML = 0;
            score_ = 0;
        }
    });

    //ВВОД В ПОЛЕ КАКОГО-ЛИБО ЗНАЧЕНИЯ
    input.addEventListener("keydown", event => {
        if (event.key != "Shift" && event.key != "Alt") {

            //ПРОВЕРКА ПОДХОДИТ ЛИ ТО, ЧТО МЫ ВВОДИМ КАКОМУ-ТО СЛОВУ НА ЭКРАНЕ
            checkInput(word_window, input, (element) => {
                    element.classList.add("red");
                },
                (element) => {
                    element.classList.remove("red");
                });

            if (event.code == 'Space') {
                checkInput(word_window, input, (element, input) => {

                        if (element.textContent.trim().toLowerCase() == (input.value).toLowerCase().trim()) {
                            event.preventDefault();
                            input.value = "";
                            score_ += 10;
                            console.log(score_);
                            score.innerHTML = score_;
                            console.log(score);
                            element.remove();
                        }
                    },
                    () => {
                        console.log("Неправильно");
                    });
            }

        }

    });

    let health = 10;

    //ПРОВЕРКА ПОДХОДИТ ЛИ ТО, ЧТО МЫ ВВОДИМ КАКОМУ-ТО СЛОВУ НА ЭКРАНЕ
    const checkInput = (word_window, input, callback_first, callback_second) => {
        word_window.forEach(item => {
            if (item.textContent.trim().toLowerCase().startsWith((input.value + event.key).toLowerCase().trim())) {
                callback_first(item, input);
            } else {
                callback_second(item, input);
            }
        });
    }

    const createWord = () => {

        if (document.querySelector(".word")) {
            word = document.querySelectorAll(".word");
            for (let i = 0; i < word.length; i++) {
                if (word[i].style.right == "") {
                    word[i].style.right = "0vw";
                }

                let right = parseInt(word[i].style.right.match(/\d+/));
                right += 7;
                if (right >= 100) {
                    document.querySelector(".heart:last-child").remove();
                    health--;
                    word[i].remove();
                    console.log(health);

                    if (health == 0) {
                        health_.innerHTML = "";
                        clearInterval(timerId);
                        rows.forEach(item => {
                            item.innerHTML = "";
                        });
                        input.blur();
                        input.value = "";
                        alert("Поражение!");
                        return;
                    }
                }

                word[i].style.right = right + "vw";
            }
        }
        word = document.createElement("span");
        word.classList.add("word");
        let rand = Math.floor(Math.random() * 4999);
        word.textContent = words[rand].word.split(' ')[0];
        let div = document.createElement("div");
        div.insertAdjacentElement("beforeend", word);
        do {
            rand = Math.floor(Math.random() * 8);
        } while (rand == prev);
        prev = rand;
        rows[rand].insertAdjacentHTML("beforeend", div.innerHTML);
        word_window = document.querySelectorAll(".word");
    }

});