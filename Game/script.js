const cards = document.querySelectorAll(".card");
const error = document.getElementById('error');
const resetAll = document.getElementById('resetAll');
const login = document.getElementById('login');
const canvases = document.querySelectorAll('.fireworksCanvas');
let ErrorScore = document.getElementById('ErrorScore');
let TimeScore = document.getElementById('TimeScore');
let vvv = 0;
let minu = document.getElementById('minu');
let tempo = 0;
let cronometroElemento = document.getElementById('cronometro');
let resetScore = document.querySelector('.resetScore');
let counterWin = 0;
let pk = 0;
let cardOne = null;
let cardTwo = null;
let disableDeck = false;
let containerScore = document.querySelector('.containerScore');
containerScore.style.display = "none";
let intervalId; // Dichiara intervalId fuori dalle funzioni per renderlo accessibile in tutto lo script
let realtime = ''; // Definisci la variabile realtime al di fuori delle funzioni

canvases.forEach(canvas => {
    canvas.style.display = "none";
});

function shuffleCard() {
    disableDeck = false;
    cardOne = null;
    cardTwo = null;
    pk = 0;
    error.textContent = pk;

    const arr = [1, 3, 4, 5, 6, 7, 8, 9, 1, 3, 4, 5, 6, 7, 8, 9];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    cards.forEach((card, i) => {
        card.classList.remove("flip");
        const imgTag = card.querySelector(".back-view img");
        imgTag.src = `assets/${arr[i]}.png`;
        card.addEventListener("click", flipCard);
    });

    return arr;
}

let touchcount = 0;
let arri = shuffleCard();
const arrayloging = localStorage.getItem("array");
if (!arrayloging) {
    localStorage.setItem("array", JSON.stringify(arri));
}
const arr = JSON.parse(arrayloging);

function flipCard(event) {
    touchcount++;
    console.log(touchcount);
    if (touchcount == 1) {
        intervalId = setInterval(function() {
            name();
        }, 1000);
    }
    const clickedCard = event.target.closest(".card");
    if (cardOne !== clickedCard && !disableDeck) {
        clickedCard.classList.add("flip");
        if (!cardOne) {
            cardOne = clickedCard;
        } else {
            cardTwo = clickedCard;
            disableDeck = true;
            const cardOneImg = cardOne.querySelector(".back-view img").src;
            const cardTwoImg = cardTwo.querySelector(".back-view img").src;
            matchCards(cardOneImg, cardTwoImg);
        }
    }
}

let polygon2 = document.querySelector('.polygon2');
let polygon1 = document.querySelector('.polygon1');
let polygon3 = document.querySelector('.polygon3');

function matchCards(img1, img2) {
    if (img1 === img2) {
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = null;
        disableDeck = false;
        const flippedImages = Array.from(cards).filter(card => card.classList.contains("flip")).map(card => card.querySelector(".back-view img").src);
        localStorage.setItem("img", flippedImages.join(","));
        counterWin++;
        const flippedImageString = localStorage.getItem("img");
        const flippedImageArray = flippedImageString.split(",");
        const numberOfElements = flippedImageArray.length;
        console.log("numberOfElements " + numberOfElements);
        // clearInterval(intervalId);
        if (numberOfElements === 16) {
            
            setTimeout(() => {
                clearInterval(intervalId);
                containerScore.style.display = "block";
                canvases.forEach(canvas => {
                    canvas.style.display = "block";
                    let ctx = canvas.getContext('2d');
                    let particles = [];
        
                    class Particle {
                        constructor() {
                            this.x = canvas.width / 2;
                            this.y = canvas.height / 2;
                            this.vx = Math.random() * 10 - 5;
                            this.vy = Math.random() * -15 - 2;
                            this.color = `hsla(${Math.random() * 360}, 100%, 50%, 1)`;
                            this.alpha = 1;
                            this.gravity = 0.65;
                        }
        
                        draw() {
                            ctx.beginPath();
                            ctx.arc(this.x, this.y, 3, 0, Math.PI * 5);
                            ctx.fillStyle = this.color;
                            ctx.globalAlpha = this.alpha;
                            ctx.fill();
                            ctx.closePath();
                        }
        
                        update() {
                            this.x += this.vx;
                            this.y += this.vy;
                            this.vy += this.gravity;
                            this.alpha -= 0.01;
                        }
                    }
        
                    function createParticles() {
                        for (let i = 0; i < 1500; i++) {
                            const particle = new Particle();
                            particles.push(particle);
                        }
                    }
        
                    function animate() {
                        requestAnimationFrame(animate);
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
                        particles.forEach((particle, index) => {
                            particle.draw();
                            particle.update();
                            if (particle.alpha <= 0) {
                                particles.splice(index, 1);
                            }
                        });
                    }
        
                    createParticles();
                    animate();
                });
            }, 1050);
        }
    } else {
        pk = error.textContent;
        pk++;
        ErrorScore.textContent = pk;
        error.textContent = pk;
        setTimeout(() => {
            cardOne.classList.remove("flip");
            cardTwo.classList.remove("flip");
            cardOne = cardTwo = null;
            disableDeck = false;
        }, 1200);
        if (pk > 7) {
            polygon2.style.backgroundColor = "grey";
        } else if (pk > 10) {
            polygon2.style.backgroundColor = "grey";
            polygon1.style.backgroundColor = "grey";
        } else if (pk > 13) {
            polygon2.style.backgroundColor = "grey";
            polygon1.style.backgroundColor = "grey";
            polygon3.style.backgroundColor = "grey";
        }
    }
    // return
}

function name() {

    tempo = parseInt(cronometroElemento.textContent);
    tempo++;
    if (tempo < 10) {
        cronometroElemento.textContent = "0" + tempo;
    } else if (tempo == 60) {
        tempo = 0;
        vvv = parseInt(minu.textContent);
        vvv++;
        if (vvv < 10) {
            minu.textContent = "0" + vvv;
        } else if (vvv == 60) {
            vvv = 0;
        } else {
            minu.textContent = vvv;
        }
    }
    cronometroElemento.textContent = (tempo < 10 ? "0" : "") + tempo;
    realtime = minu.textContent + " : " + (tempo < 10 ? "0" : "") + tempo;
    displaytime.textContent = realtime;
    TimeScore.textContent = realtime;
    console.log(realtime);
}




resetScore.addEventListener('click', function() {
    window.location.reload();
    localStorage.removeItem("img");
    localStorage.removeItem("array");
});

let saveButton = document.querySelector('#save');

saveButton.addEventListener('click', function saveButtonClickHandler() {
    localStorage.setItem("error", pk);
    const errorStorage = localStorage.getItem("error");
    const reatime = TimeScore.textContent;
    localStorage.setItem("time", reatime);
    const timeStorage = localStorage.getItem("time");
});

function saveall() {
    localStorage.setItem("error", pk);
    const errorStorage = localStorage.getItem("error");
    const realtime = TimeScore.textContent;
    localStorage.setItem("time", realtime);
    const timeStorage = localStorage.getItem("time");
}

let displaytime = document.querySelector('.display');
login.addEventListener('click', function() {
    function populateCards() {
        if (arrayloging) {
            cards.forEach((card, i) => {
                card.classList.remove("flip");
                const imgTag = card.querySelector(".back-view img");
                imgTag.src = `assets/${arr[i]}.png`;
                card.addEventListener("click", flipCard);
            });
        }
    }
    touchcount = 0;
    const timeStorage = localStorage.getItem("time");
    if (timeStorage) {
        displaytime.textContent = timeStorage;
        let timeParts = timeStorage.split(" : ");
        minu.textContent = timeParts[0];
        cronometroElemento.textContent = timeParts[1];
    }
    const errorStorage = localStorage.getItem("error");
    if (errorStorage) {
        const errorStorageText = errorStorage.split(",");
        error.textContent = errorStorageText;
    }
    populateCards();
    const flippedImages = localStorage.getItem("img");
    if (flippedImages) {
        const flippedImageArray = flippedImages.split(",");
        cards.forEach(card => {
            const imgSrc = card.querySelector(".back-view img").src;
            if (flippedImageArray.includes(imgSrc)) {
                card.classList.add("flip");
                card.removeEventListener("click", flipCard);
            }
        });
    }
    clearInterval(intervalId); 
    intervalId = setInterval(name, 1000); 
});

resetAll.addEventListener('click', function() {
    window.location.reload();
});

let reset = document.querySelector('#reset');

reset.addEventListener('click', function() {
    window.location.reload();
    localStorage.removeItem("img");
    localStorage.removeItem("array");
    localStorage.removeItem("error");
    localStorage.removeItem("time");
});
