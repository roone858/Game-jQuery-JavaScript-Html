var score = document.querySelector('.score');
var highScore = document.querySelector('.highScore');
var startScreen = document.querySelector('.startScreen');
var gameArea = document.querySelector('.gameArea');
var ClickToStart = document.querySelector('.ClickToStart');
ClickToStart.addEventListener('click', Start);
document.addEventListener('keydown', keydown);
document.addEventListener('keyup', keyup);



var keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
};

var player = {
    speed: 5,
    score: 0,
    highScore: 0
};

//----------------------------------------------------------------

function keydown(e) {
    keys[e.key] = true
};

function keyup(e) {
    keys[e.key] = false;
}

//----------------------------------------------------------------

// starting the game
function Start() {
    gameArea.innerHTML = "";
    startScreen.classList.add('hide');
    player.isStart = true;
    player.score = 0;
    window.requestAnimationFrame(Play);


    // creating the road lines
    for (i = 0; i < 5; i++) {
        var roadLines = document.createElement('div');
        roadLines.setAttribute('class', 'roadLines');
        roadLines.y = (i * 140);
        roadLines.style.top = roadLines.y + "px";
        gameArea.appendChild(roadLines);
    }


    // creating the opponents car
    for (i = 0; i < 3; i++) {
        var Opponents = document.createElement('div');
        Opponents.setAttribute('class', 'Opponents');
        Opponents.y = ((i) * -300);
        Opponents.style.top = Opponents.y + "px";
        gameArea.appendChild(Opponents);
        Opponents.style.left = Math.floor(Math.random() * 350) + "px";
        Opponents.style.backgroundColor = randomColor();
    }


    var car = document.createElement('div');
    car.setAttribute('class', 'car');
    gameArea.appendChild(car);
    player.x = car.offsetLeft;
    player.y = car.offsetTop;
}

//----------------------------------------------------------------

function randomColor() {
    function c() {
        var hex = Math.floor(Math.random() * 256).toString(16);
        return ("0" + String(hex)).substr(-2);
    }
    return "#" + c() + c() + c();
}

//----------------------------------------------------------------

// play the game
function Play() {
    var car = document.querySelector('.car');
    var road = gameArea.getBoundingClientRect();
    if (player.isStart) {
        moveLines();
        moveOpponents(car);
        if (keys.ArrowUp && player.y > (road.top + 70)) { player.y -= player.speed }
        if (keys.ArrowDown && player.y < (road.height - 75)) { player.y += player.speed }
        if (keys.ArrowRight && player.x < 350) { player.x += player.speed }
        if (keys.ArrowLeft && player.x > 0) { player.x -= player.speed }
        car.style.top = player.y + "px";
        car.style.left = player.x + "px";
        highScore.innerHTML = "HighScore" + ":" + (player.highScore - 1);
        player.score++;
        player.speed += 0.01;
        if (player.highScore < player.score) {
            player.highScore++;
            highScore.innerHTML = "HighScore" + ":" + (player.highScore - 1);
            highScore.style.top = "80px";
        }
        score.innerHTML = "Score" + ":" + (player.score - 1);
        window.requestAnimationFrame(Play);
    }
}

//----------------------------------------------------------------

function moveLines() {
    let roadLines = document.querySelectorAll('.roadLines');
    roadLines.forEach(function (item) {
        if (item.y >= 700)
            item.y -= 700;
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

//----------------------------------------------------------------

function moveOpponents(car) {
    let Opponents = document.querySelectorAll('.Opponents');
    Opponents.forEach(function (item) {
        if (isCollide(car, item)) {
            endGame();
        }
        if (item.y >= 750) {
            item.y -= 900;
            item.style.left = Math.floor(Math.random() * 350) + "px";
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

//----------------------------------------------------------------

//check whether the cars collide or not
function isCollide(a, b) {
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();
    return !(
        (aRect.top > bRect.bottom)
        || (aRect.bottom < bRect.top)
        || (aRect.right < bRect.left)
        || (aRect.left > bRect.right))
}

//----------------------------------------------------------------

//game is end
function endGame() {
    var gameOver = document.getElementById('gameOver');
    gameOver.innerHTML = '';
    var text = document.createTextNode('Game Over');
    gameOver.appendChild(text);
    player.isStart = false;
    player.speed = 5;
    startScreen.classList.remove('hide');
}

//---------------------------------------------------------------------

// // sound of game

// var isIcon1Visible;
// window.onload = playMusic;
// document.getElementById("soundMb3").addEventListener("click", () => {
//     isIcon1Visible == true ? playMusic() : pauseMusic();
// });
// function playMusic() {
//     var soundMb3 = document.getElementById("soundMb3Id");
//     var icon = document.getElementById("soundMb3");
//     icon.setAttribute("class", "play-icon");
//     isIcon1Visible = false;
//     soundMb3.play();
// }

// function pauseMusic() {
//     var soundMb3 = document.getElementById("soundMb3Id");
//     var icon = document.getElementById("soundMb3");
//     icon.setAttribute("class", "pause-icon");
//     isIcon1Visible = true;
// }

//----------------------------------------------------------------

// sound of Beb
var soundBeb = document.getElementById('soundBeb');
function playSoundBeb() {
    soundBeb.play();
}
window.addEventListener('keydown', function (event) {
    if (event.key === "Shift") {
        playSoundBeb();
    }
});

//----------------------------------------------------------------







