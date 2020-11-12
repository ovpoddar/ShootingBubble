var bubbls = [],
    colors = ["red", "green", "blue"],
    shootingbubble = [],
    Lines = 3
    chances = 5,
    totalpoient = 0,
    gameover = false;


function setup() {
    createCanvas(683, window.innerHeight);
    for (let i = 0; i < chances; i++) {
        var index = round(random(2));
        shootingbubble.push(new MovingBubble(width / 2, height, colors[index])); 
    }
    var bi = 0;

    for (let j = 16; j < Lines * 32; j += 32) {
        for (let i = 16; i < width; i += 32) {
            var index = round(random(2));
            bubbls.push(new StaticBubble(i, j, colors[index], bi));
            bi++;
        }

    }

    bubbls.forEach(bubble => {
        bubble.initilised(bubbls);
    });
    window.requestAnimationFrame(() => {
        document.getElementById("defaultCanvas0").style.width = window.innerWidth;
        document.getElementById("defaultCanvas0").style.height = window.innerHeight;
    });
}


function draw() {
    if(gameover){
        alert(bubbls.length - totalpoient);
        noLoop();
    }
    background(135);
    bubbls.forEach(bubble => {
        bubble.show();
    });

    if (shootingbubble.length > 0) {
        shootingbubble[0].show();
        shootingbubble[0].edgs();
        shootingbubble[0].update();
        shootingbubble[0].coliding(bubbls);
    } else {
        bubbls.forEach(b => {
            if(typeof(b) == "object"){
                totalpoient++;
            }
        });
        gameover = true
    }
};

function mousePressed() {
    angleMode(DEGREES);
    shootingbubble[0].targeting(atan2(mouseY - height, mouseX - width / 2));
}

function touchStart(){
    angleMode(DEGREES);
    shootingbubble[0].targeting(atan2(mouseY - height, mouseX - width / 2));
}
