let moveUp;                                     //Alustetaan muuttujat
let moveDown;
let touch = false;
let touchY = 135;
let firstTouch = true;

let gameStart = false;
let speed = 24;

let ballMove;
let ballDirectionX;
let ballDirectionY;
let ballAngle = 0;

let hitPoint = 0;

let score = 0;
let counter = 0;
let messageText;

let plip = new Audio("audio/plip.mp3");
let ole = new Audio("audio/ole.mp3");
let oops = new Audio("audio/oops.mp3");
let yeah = new Audio("audio/yeah.mp3");
let cry = new Audio("audio/cry.mp3");

let audioLoadedCount = 0;
let audioTotalCount = 5;

function audioLoadedHandler() {
    audioLoadedCount++;
    if (audioLoadedCount === audioTotalCount) {
        startGame();
    }
}

plip.addEventListener("loadeddata", audioLoadedHandler);
ole.addEventListener("loadeddata", audioLoadedHandler);
oops.addEventListener("loadeddata", audioLoadedHandler);
yeah.addEventListener("loadeddata", audioLoadedHandler);
cry.addEventListener("loadeddata", audioLoadedHandler);


if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    messageText = "Pelin tarkoituksena on saada pallo ohjattua <br> oikeassa yläkulmassa sijaitsevaan maaliin. <br><br> Tavoitepistemäärä on 10. Karanneista palloista sakotetaan. <br><br> Liikuta mailaa ylös tai alas sormellasi.";
} else {
    messageText = "Pelin tarkoituksena on saada pallo ohjattua <br> oikeassa yläkulmassa sijaitsevaan maaliin. <br><br> Tavoitepistemäärä on 10. Karanneista palloista sakotetaan. <br><br> Liikuta mailaa nuolinäppäimillä ylös tai alas aloittaaksesi pelin.";
}

function startGame() {                                      //Pelin aloitusfunktio
    myGameArea.start();
    myGamePiece = new stick(8, 50, "blue", 60, 106);        //Luodaan pelikentän viivat, pallo ja maila
    gameBall = new Ball(10, 78, 132);
    topBorder = new border(0, 0, 458, 0);
    bottomBorder = new border(0, 270, 480, 270);
    rearBorder = new border(480, 34, 480, 270);
    target = new goalDraw();
    display = new scoreDraw();
    lines = new line();
    document.addEventListener("keydown", function(event) {  //Lisätään tapahtumakuuntelu ylös- ja alasnuolille
        if(['ArrowUp', 'ArrowDown'].indexOf(event.key) > -1) {
            event.preventDefault();
        }

        if (event.key === "ArrowUp") {
            moveUp = true;
        } else if (event.key === "ArrowDown") {
            moveDown = true;
        }
    });
    
    document.addEventListener("keyup", function(event) {
        if (event.key === "ArrowUp") {
            moveUp = false;
        } else if (event.key === "ArrowDown") {
            moveDown = false;
        }
    });
}


let myGameArea = {
    canvas: document.createElement("canvas"),
    mouseY: 0,
    start: function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        let gameAreaDiv = document.getElementById("gameArea");
        gameAreaDiv.appendChild(this.canvas);
        this.interval = setInterval(updateGameArea, speed);
        let canvas = this.canvas;
        addTouch(canvas);                                   //Kutsutaan funktiota kosketustoimintojen lisäämiseksi
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function() {
        clearInterval(this.interval);
    }
}


function addTouch(canvas) {                                     
    canvas.addEventListener("touchstart", handleTouchStart, { passive: true });
    canvas.addEventListener("touchend", handleTouchEnd, { passive: true });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
}

function handleTouchStart() {
    touch = true;
    if (firstTouch) {
        touch = false;
        setTimeout(function() {
            touch = true;
            firstTouch = false;
        }, 100);
    }
}

function handleTouchEnd() {                                     //Kosketus päättyy
    touch = false;
    touchY = 135;
}

function handleTouchMove(event) {                               //Sormen liikkuminen näytöllä
    event.preventDefault();                                                 //Estetään sivun vieritys
    touchY = event.touches[0].clientY - myGameArea.canvas.offsetTop;        //Tunnistetaan y-koordinaatti sormen sijainnista
}


function stick(width, height, color, x, y) {                //Mailan piirtofunktio
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.beginPath();                                    //Piirretään keltainen merkki mailan keskelle
        ctx.strokeStyle = "yellow";
        ctx.lineWidth = 4;
        ctx.moveTo(this.x, this.y + this.height / 2);
        ctx.lineTo(this.x + this.width, this.y + this.height / 2);
        ctx.stroke();
    }
}


function line() {                                           //Takalinjan piirto
    this.update = function() {
        ctx = myGameArea.context;
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.moveTo(60, 0);
        ctx.lineTo(60, 270);
        ctx.stroke();
    }
}


function goalDraw() {                                       //Maalialueen piirto
    this.update = function() {
        ctx = myGameArea.context;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.lineWidth = "6";
        ctx.moveTo(480, 20);
        ctx.lineTo(466, 35);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(464, 0);
        ctx.lineTo(448, 15);
        ctx.stroke();

        ctx.beginPath();
        ctx.lineWidth = "3";
        ctx.arc(464, 19, 40, 0, 2 * Math.PI);
        ctx.stroke();
    }
}


function border(startX, startY, endX, endY) {               //Ulkoreunojen piirto
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.beginPath();
        ctx.rect(startX, startY, endX, endY);
        ctx.lineWidth = "18";
        ctx.strokeStyle = "white";
        ctx.stroke();
    }
}


function Ball(radius, x, y,) {                              //Pallon piirto
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        ballColor = ctx.createRadialGradient(this.x, this.y, 10 * 0.4, this.x, this.y, 10 * 1.0);
        ballColor.addColorStop(0.1, 'rgba(180, 180, 180)');
        ballColor.addColorStop(0.2, 'rgba(128, 128, 128)');
        ballColor.addColorStop(0.6, 'rgba(50, 50, 50)');
        ballColor.addColorStop(1, 'rgba(0, 0, 0)');
        ctx.fillStyle = ballColor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    this.hitWith = function(object) {                       //Tunnistetaan pallon osuminen mailaan
        let myleft = this.x;
        let myright = this.x + this.radius;
        let mytop = this.y;
        let mybottom = this.y + this.radius;
        let objectLeft = object.x;
        let objectRight = object.x + object.width;
        let objectTop = object.y;
        let objectBottom = object.y + object.height;
        let hit = true;
        if ((mybottom < objectTop) ||
        (mytop > objectBottom) ||
        (myright < objectLeft) ||
        (myleft > objectRight)) {
            hit = false;
        }
        if (ballMove && hit) {
            return object.y;
        }
    }
}


function scoreDraw() {                                      //Pisteluvun piirto
    this.update = function() {
        ctx = myGameArea.context;
        if (score >= 0) {
            ctx.strokeStyle = "blue";
        } else if (score < 0) {
            ctx.strokeStyle = "red";
        }
        ctx.beginPath();
        ctx.lineWidth = "4";
        if (score < 0) {
            ctx.moveTo(230, 235);
            ctx.lineTo(220, 235);
        }
        if (score === 0) {
            ctx.moveTo(240, 250);
            ctx.lineTo(240, 220);
            ctx.lineTo(260, 220);
            ctx.lineTo(260, 250);
            ctx.lineTo(240, 250);
        } else if (score === 1 || score === -1) {
            ctx.moveTo(260, 250)
            ctx.lineTo(260, 220)
        } else if (score === 2 || score === -2) {
            ctx.moveTo(260, 250);
            ctx.lineTo(240, 250);
            ctx.lineTo(240, 235);
            ctx.lineTo(260, 235);
            ctx.lineTo(260, 220);
            ctx.lineTo(240, 220);
        } else if (score === 3 || score === -3) {
            ctx.moveTo(240, 250);
            ctx.lineTo(260, 250);
            ctx.lineTo(260, 220);
            ctx.lineTo(240, 220);
            ctx.moveTo(260, 235);
            ctx.lineTo(245, 235);
        } else if (score === 4 || score === -4) {
            ctx.moveTo(260, 250);
            ctx.lineTo(260, 220);
            ctx.moveTo(260, 235);
            ctx.lineTo(240, 235);
            ctx.lineTo(240, 220);
        } else if (score === 5 || score === -5) {
            ctx.moveTo(240, 250);
            ctx.lineTo(260, 250);
            ctx.lineTo(260, 235);
            ctx.lineTo(240, 235);
            ctx.lineTo(240, 220);
            ctx.lineTo(260, 220);
        } else if (score === 6 || score === -6) {
            ctx.moveTo(260, 220);
            ctx.lineTo(240, 220);
            ctx.lineTo(240, 250);
            ctx.lineTo(260, 250);
            ctx.lineTo(260, 235);
            ctx.lineTo(240, 235);
        } else if (score === 7 || score === -7) {
            ctx.moveTo(260, 250);
            ctx.lineTo(260, 220);
            ctx.lineTo(240, 220);
        } else if (score === 8 || score === -8) {
            ctx.moveTo(240, 250);
            ctx.lineTo(240, 220);
            ctx.lineTo(260, 220);
            ctx.lineTo(260, 250);
            ctx.lineTo(240, 250);
            ctx.moveTo(240, 235);
            ctx.lineTo(260, 235);
        } else if (score === 9 || score === -9) {
            ctx.moveTo(240, 250);
            ctx.lineTo(260, 250);
            ctx.lineTo(260, 220);
            ctx.lineTo(240, 220);
            ctx.lineTo(240, 235);
            ctx.lineTo(260, 235);
        }
        ctx.stroke();
    }
}


function message() {                                        //Viestien vaihto viestikenttään
    document.getElementById("message").innerHTML = messageText;
}



function checkBall() {                                      //Tulkitaan pallon kulkusuunta
    let stickCenter = myGamePiece.y - gameBall.y + (myGamePiece.height /2) -1;

    if (gameBall.y <= 8) {                                  //Vaihdetaan pallon suuntaa ylä- ja alarajoilla
        ballDirectionY = "down";
    }
    if (gameBall.y >= 262) {
        ballDirectionY = "up";
    }

    if (ballDirectionX === "left") {
        if (gameBall.hitWith(myGamePiece)) {
            if (stickCenter < 0) {
                hitPoint = (stickCenter * -1) / 10;
            } else if (stickCenter > 0) {
                hitPoint = stickCenter / 10;
            }

            if (stickCenter === gameBall.y) {
                gameBall.y = 0;
                ballDirectionY = "straight";
            } else if (stickCenter < ballAngle) {
                ballDirectionY = "down";
            } else if (stickCenter > ballAngle) {
                ballDirectionY = "up";
            }
            if (ballDirectionY != "straight") {
                ballAngle = hitPoint / 10;
            }
            plip.play();
            ballDirectionX = "right";
        }
    }

    if (gameBall.x === 468 && gameBall.y > 30) {
        ballDirectionX = "left";
    } else if (gameBall.x > 470 && gameBall.y <= 30) {
        document.getElementById("button").style.display = "none";     
        goal();
    }

    if (gameBall.x > 0) {
        if (!gameStart) {
            moveBall();
        }
    } else if (gameBall.x <= 0) {
        endGame();
    }
}


function moveBall() {                                       //Pallon suuntaa vaihdetaan saatujen koordinaattien perusteella.
    if (ballDirectionY === undefined) {                     //X-akselilla kulkusuunta on vakionopeuksinen, pystysuunnassa
        let randomY = (Math.random() * 2 - 1).toFixed(1);   //pallon nousu- tai laskukulma riippuu pallon osumasta suhteessa
        hitPoint = randomY / 2;                             //mailan keskipisteeseen. Pelin aloituksessa pallon lähtökulma                                      
        if (hitPoint < 0) {                                 //on satunnainen.
            ballDirectionY = "down";
        } else if (hitPoint > 0) {
            ballDirectionY = "up";
        }
    } else if (ballDirectionY === "straight") {
        hitPoint = 0;
    }
    if (ballDirectionX === "left") {                        
        gameBall.x -= 5;                                    
    }                                                       
    if (ballDirectionX === "right") {
        gameBall.x += 5;
    }
    if (ballDirectionY === "up") {
        gameBall.y -= hitPoint;
    }
    if (ballDirectionY === "down") {
        gameBall.y += hitPoint;
    }
}


function goal() {                                          // Tapahtumat maalin syntyessä
    score += 1;
    speed -= 2;
    if (score <= 9) {
        yeah.play();
        messageText = "M A A L I  !!!";
    }
    if (score === 10) {
        ole.play();
        messageText = "Kymmenellä maalilla olet ansainnut arvonimen<br><br>K I N G   P O N G !!!<br><br>";
        document.getElementById("button").style.display = "block";
        document.getElementById("button").innerHTML = '<a class="btn btn-primary mx-1" height="20" alt="painike">Uusi peli</a>';
        document.getElementById("messageBox").style.display = "block";
        setTimeout(function() {
            score = 0;
            counter = 0;
            speed = 24;
            ballMove = false;
            gameStart = false;
            ballAngle = 0;
            myGameArea.stop();
            myGameArea.clear();
            document.getElementById("messageBox").style.display = "none";
            startGame();
        }, 3000);
    } else {
        ballMove = false;
        gameStart = false;
        ballAngle = 0;
        myGameArea.stop();
        myGameArea.clear();
        startGame();
    }
}




function endGame() {                                        //Tapahtumat pallon karatessa
    oops.play();
    score -= 1;
    if (score < 0) {
        speed += 1;
    } else if (score > 0) {
        speed += 2;
    }
    if (score < 0) {
        counter += 1;
    }
    if (score <= -10) {
        document.getElementById("button").style.display = "block";     
        gameOver();
    }
    if (counter === 1) {
        messageText = "Nyt menee jo pakkasen puolelle.<br>Kymmenen pistettä miinuksella lopettaa pelin.";
    }
    ballMove = false;
    gameStart = false;
    ballAngle = 0;
    myGameArea.stop();
    myGameArea.clear();
    startGame();
}


function gameOver() {                                       //Pelin päättyminen
    cry.play();
    ballMove = false;
    gameStart = false;
    ballAngle = 0;
    myGameArea.stop();
    messageText = "Imit kuin Viktor Fasth vuonna 2011 !!!<br><br>";
    document.getElementById("button").innerHTML = '<a class="btn btn-primary mx-1" height="20" alt="painike">Uusi peli</a>';
    score = 0;
    counter = 0;
    return;
}


function updateGameArea() {                                 //Pelialueen päivittäminen
    if (messageText === "") {
        document.getElementById("messageBox").style.display = "none";
    } else {                                                //Viestilaatikko tuodaan tarvittaessa näkyviin
        document.getElementById("messageBox").style.display = "block";
    }

    if (!touch) {                                           //Mailan liikuttaminen nuolinäppäimillä, eli kosketus on false
        if (moveUp && myGamePiece.y >= 12){                 
            myGamePiece.y -= 5;
        }
        if (moveDown && myGamePiece.y < myGameArea.canvas.height - 63) {
            myGamePiece.y += 5;
        }
    }

    if (touch) {
        myGamePiece.y = touchY;                             //Sormen y-koordinaatti määrää suoraan mailan sijainnin
    }

    if (moveUp || moveDown || touch) {                      //Tulkitaan pelin alkaminen, eli mailan liikuttaminen...
        gameStart = true;
    }

    if (gameStart && !ballMove) {                           //...ja annetaan pallolle lupa lähteä liikkeelle.
        ballDirectionX = "right";
        ballDirectionY = undefined
        ballMove = true;
    }

    if (ballMove) {                                         //Kutsutaan pallon sijainnin tarkistusta, kun pallon pitäisi
        messageText = "";                                   //olla liikkeellä.
        gameStart = false;
        checkBall();
    }

    message();                                              //Päivitetään pelitapahtumat
    myGameArea.clear();
    lines.update();
    target.update();
    topBorder.update();
    bottomBorder.update();
    rearBorder.update();
    myGamePiece.update();
    gameBall.update();
    display.update();
}